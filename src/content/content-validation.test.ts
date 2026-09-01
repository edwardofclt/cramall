import { lessonsByUnit as mathLessons } from './math';
import { lessonsByUnit as readingLessons } from './reading';
import { lessonsByUnit as scienceLessons } from './science';
import { PLANNED_LESSONS, READING_OE_CODES } from './curriculum';
import { allLessons, SUBJECTS, getSubject, standards } from './subjects';
import * as contentSchema from './schema';
import { validateLesson, type Lesson, type Subject, type SubjectId } from './schema';

const REGISTRIES: Record<SubjectId, Record<string, Lesson[]>> = {
  math: mathLessons,
  reading: readingLessons,
  science: scienceLessons,
};

function catalogErrors(
  subjects: Subject[],
  registries: Record<SubjectId, Record<string, Lesson[]>>,
): string[] {
  const validate = (contentSchema as typeof contentSchema & {
    validateContentCatalog?: (
      subjects: Subject[],
      registries: Record<SubjectId, Record<string, Lesson[]>>,
    ) => string[];
  }).validateContentCatalog;
  return validate?.(subjects, registries) ?? ['validateContentCatalog is missing'];
}

type ReviewLinkLesson = {
  quiz: { pool: Array<{ conceptTag: string; reviewCardId: string }> };
};

function expectConsistentReviewCards(lessons: ReviewLinkLesson[]) {
  for (const lesson of lessons) {
    const reviewCardByTag = new Map<string, string>();
    for (const question of lesson.quiz.pool) {
      const firstReviewCardId = reviewCardByTag.get(question.conceptTag);
      if (firstReviewCardId === undefined) reviewCardByTag.set(question.conceptTag, question.reviewCardId);
      else expect(question.reviewCardId).toBe(firstReviewCardId);
    }
  }
}

test('math unit 1 has its two pilot lessons', () => {
  expect(getSubject('math').units.find((unit) => unit.id === 'math-u01')?.lessons.map((lesson) => lesson.id))
    .toEqual(['math-u01-l01', 'math-u01-l02']);
});

test('every authored lesson passes cross-reference validation', () => {
  const errors = allLessons().flatMap(validateLesson);
  expect(errors).toEqual([]);
});

test('the permanent catalog identity and registration gates accept current authored content', () => {
  expect(catalogErrors(SUBJECTS, REGISTRIES)).toEqual([]);
});

test('a lesson registered twice is rejected even if one copy would be consumed', () => {
  const first = allLessons()[0]!;
  const registries = {
    ...REGISTRIES,
    math: { ...REGISTRIES.math, 'math-u02': [first] },
  };

  expect(catalogErrors(SUBJECTS, registries).join('\n')).toMatch(/registered.*exactly once/i);
});

test('an invalid registry key and an unconsumed registered lesson are both rejected', () => {
  const orphan: Lesson = {
    ...allLessons()[0]!,
    id: 'math-u99-l01',
    unitId: 'math-u99',
    learnCards: [],
    quiz: { passThreshold: 8, pool: [] },
  };
  const registries = {
    ...REGISTRIES,
    math: { ...REGISTRIES.math, 'math-u99': [orphan] },
  };

  const errors = catalogErrors(SUBJECTS, registries).join('\n');
  expect(errors).toMatch(/registry key.*real unit/i);
  expect(errors).toMatch(/consumed.*exactly once/i);
});

test('global lesson, card, and question identities cannot collide', () => {
  const subjects = structuredClone(SUBJECTS);
  const source = subjects[0]!.units[0]!.lessons[0]!;
  subjects[0]!.units[1]!.lessons.push({ ...source, unitId: subjects[0]!.units[1]!.id });

  const errors = catalogErrors(subjects, REGISTRIES).join('\n');

  expect(errors).toMatch(/duplicate lesson id/i);
  expect(errors).toMatch(/duplicate learn card id/i);
  expect(errors).toMatch(/duplicate question id/i);
});

test('every authored lesson belongs to a real unit and covers its indicators only', () => {
  for (const subject of SUBJECTS)
    for (const unit of subject.units)
      for (const lesson of unit.lessons) {
        expect(lesson.unitId).toBe(unit.id);
        for (const code of lesson.indicatorCodes) expect(unit.indicatorCodes).toContain(code);
      }
});

test('units with lessons cover all their indicators', () => {
  for (const subject of SUBJECTS)
    for (const unit of subject.units) {
      if (unit.lessons.length === 0) continue;
      const covered = new Set(unit.lessons.flatMap((lesson) => lesson.indicatorCodes));
      for (const code of unit.indicatorCodes) expect(covered).toContain(code);
    }
});

test('every authored lesson uses the shared eight-question pass threshold', () => {
  for (const lesson of allLessons()) expect(lesson.quiz.passThreshold).toBe(8);
});

test('every concept tag links to one consistent review card', () => {
  expectConsistentReviewCards(allLessons());
});

test('a concept tag with different review cards in one lesson is rejected', () => {
  expect(() => expectConsistentReviewCards([
    { quiz: { pool: [
      { conceptTag: 'place-value', reviewCardId: 'math-u99-l01-c1' },
      { conceptTag: 'place-value', reviewCardId: 'math-u99-l01-c2' },
    ] } },
  ])).toThrow();
});

test('a concept tag may use each lesson’s own review card', () => {
  expect(() => expectConsistentReviewCards([
    { quiz: { pool: [{ conceptTag: 'place-value', reviewCardId: 'math-u01-l01-c1' }] } },
    { quiz: { pool: [{ conceptTag: 'place-value', reviewCardId: 'math-u02-l01-c1' }] } },
  ])).not.toThrow();
});

test('runtime catalog equals the exact 89-row authored manifest', () => {
  expect(allLessons().map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes,
  }))).toEqual(PLANNED_LESSONS.map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes: [...indicatorCodes],
  })));
});

test('all 31 units are populated with the exact subject totals', () => {
  expect(SUBJECTS.flatMap(({ units }) => units)).toHaveLength(31);
  expect(SUBJECTS.every(({ units }) => units.every(({ lessons }) => lessons.length > 0))).toBe(true);
  expect(getSubject('math').units.flatMap(({ lessons }) => lessons)).toHaveLength(33);
  expect(getSubject('reading').units.flatMap(({ lessons }) => lessons)).toHaveLength(24);
  expect(getSubject('science').units.flatMap(({ lessons }) => lessons)).toHaveLength(32);
});

test('the full catalog has exact card, question, and threshold totals', () => {
  const lessons = allLessons();
  expect(lessons.flatMap(({ learnCards }) => learnCards)).toHaveLength(267);
  expect(lessons.flatMap(({ quiz }) => quiz.pool)).toHaveLength(1_157);
  for (const lesson of lessons) {
    expect(lesson.learnCards).toHaveLength(3);
    expect(lesson.quiz.pool).toHaveLength(13);
    expect(lesson.quiz.passThreshold).toBe(8);
  }
});

test('every generated regular indicator is covered by its own subject lessons', () => {
  for (const subject of SUBJECTS) {
    const covered = new Set(subject.units.flatMap(({ lessons }) =>
      lessons.flatMap(({ indicatorCodes }) => indicatorCodes)));
    for (const { code } of standards[subject.id].indicators) expect(covered.has(code)).toBe(true);
  }
});

test('Reading alone declares the exact generated OE array', () => {
  for (const subject of SUBJECTS) {
    for (const lesson of subject.units.flatMap(({ lessons }) => lessons)) {
      expect(lesson.indicatorCodes.some((code) => code.startsWith('ELA.4.OE.'))).toBe(false);
      if (subject.id === 'reading') {
        expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
      } else {
        expect(lesson.crossCuttingExpectationCodes).toBeUndefined();
      }
    }
  }
});
