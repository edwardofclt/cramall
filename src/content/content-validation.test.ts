import { lessonsByUnit as mathLessons } from './math';
import { lessonsByUnit as readingLessons } from './reading';
import { lessonsByUnit as scienceLessons } from './science';
import { lessonsByUnit as socialStudiesLessons } from './social-studies';
import { PLANNED_LESSONS, READING_OE_CODES } from './curriculum';
import { allLessons, SUBJECTS, getSubject, standards } from './subjects';
import * as contentSchema from './schema';
import {
  LearnCardSchema,
  WIDGET_TYPES,
  WidgetCoachSchema,
  validateLesson,
  type LearnCard,
  type Lesson,
  type Subject,
  type SubjectId,
  type WidgetRef,
} from './schema';
import { validWidgetCoach, validWidgetRefByType } from '../test/widgetFixtures';

const REGISTRIES: Record<SubjectId, Record<string, Lesson[]>> = {
  math: mathLessons,
  reading: readingLessons,
  science: scienceLessons,
  'social-studies': socialStudiesLessons,
};

/**
 * Finds coached-widget authoring gaps without making the production catalog
 * gate depend on the migration order. Subject waves can call this helper on
 * their own fixtures or scoped catalog while Integration I1 owns the
 * production-wide zero-error assertion.
 */
export function widgetCoachingErrors(subjects: Subject[]): string[] {
  const errors: string[] = [];

  for (const subject of subjects) {
    for (const unit of subject.units) {
      for (const lesson of unit.lessons) {
        for (const card of lesson.learnCards) {
          if (!card.widget) continue;

          const widgetType = (card.widget as { type?: unknown }).type;
          const context = `${subject.id}/${unit.id}/${lesson.id}/${card.id}`;
          if (typeof widgetType !== 'string' || !(WIDGET_TYPES as readonly string[]).includes(widgetType)) {
            errors.push(`${context}: widget ${String(widgetType)} is not a registered widget type`);
            continue;
          }

          if (!card.widgetCoach) {
            errors.push(`${lesson.id}/${card.id}: widget ${widgetType} is missing widgetCoach`);
            continue;
          }

          const parsed = WidgetCoachSchema.safeParse(card.widgetCoach);
          if (!parsed.success) {
            for (const issue of parsed.error.issues) {
              errors.push(`${context}: widget ${widgetType} has invalid widgetCoach.${issue.path.join('.') || 'root'}: ${issue.message}`);
            }
          }
        }
      }
    }
  }

  return errors;
}

function subjectWithCards(cards: LearnCard[]): Subject {
  const subject = getSubject('math');
  const unit = subject.units[0]!;
  const lesson = unit.lessons[0]!;
  return {
    ...subject,
    units: [{
      ...unit,
      lessons: [{ ...lesson, learnCards: cards }],
    }],
  };
}

const coachedWidgetCard: LearnCard = {
  id: 'math-u01-l01-c1',
  title: 'Coached model',
  blocks: [{ kind: 'text', text: 'Use the model to connect the idea.' }],
  widget: validWidgetRefByType['place-value-builder'],
  widgetCoach: validWidgetCoach,
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

type ProductionWidgetCard = {
  subjectId: SubjectId;
  unitId: string;
  lessonId: string;
  card: LearnCard;
  widget: WidgetRef;
};

function productionWidgetCards(): ProductionWidgetCard[] {
  return SUBJECTS.flatMap((subject) => subject.units.flatMap((unit) => unit.lessons.flatMap((lesson) =>
    lesson.learnCards.flatMap((card) => card.widget
      ? [{ subjectId: subject.id, unitId: unit.id, lessonId: lesson.id, card, widget: card.widget }]
      : []),
  )));
}

function productionWidgetContext({ subjectId, unitId, lessonId, card, widget }: ProductionWidgetCard): string {
  return `${subjectId}/${unitId}/${lessonId}/${card.id} (${widget.type})`;
}

test('math unit 1 has its two pilot lessons', () => {
  expect(getSubject('math').units.find((unit) => unit.id === 'math-u01')?.lessons.map((lesson) => lesson.id))
    .toEqual(['math-u01-l01', 'math-u01-l02']);
});

test('every authored lesson passes cross-reference validation', () => {
  const errors = allLessons().flatMap(validateLesson);
  expect(errors).toEqual([]);
});

test.each(WIDGET_TYPES)('%s fixture can be paired with authored widget coaching', (type) => {
  const card = {
    ...coachedWidgetCard,
    widget: validWidgetRefByType[type],
  } satisfies LearnCard;

  expect(LearnCardSchema.safeParse(card).success).toBe(true);
});

test('widgetCoachingErrors reports a missing coach with stable lesson/card context', () => {
  const card = { ...coachedWidgetCard, widgetCoach: undefined };

  expect(widgetCoachingErrors([subjectWithCards([card])])).toEqual([
    'math-u01-l01/math-u01-l01-c1: widget place-value-builder is missing widgetCoach',
  ]);
});

test('widgetCoachingErrors ignores non-widget cards', () => {
  const card: LearnCard = {
    id: 'math-u01-l01-c1',
    title: 'Reading card',
    blocks: [{ kind: 'text', text: 'Read this first.' }],
  };

  expect(widgetCoachingErrors([subjectWithCards([card])])).toEqual([]);
});

test('widgetCoachingErrors reports malformed coach triggers with full author context', () => {
  const card = structuredClone(coachedWidgetCard) as LearnCard & {
    widgetCoach: { reactions: Record<string, unknown> };
  };
  card.widgetCoach.reactions.idle = { text: 'Wait for a while.' };

  const errors = widgetCoachingErrors([subjectWithCards([card])]);

  expect(errors).toHaveLength(1);
  expect(errors[0]).toMatch(
    /^math\/math-u01\/math-u01-l01\/math-u01-l01-c1: widget place-value-builder has invalid widgetCoach\.reactions: /,
  );
});

test('every production widget card has one in-step coaching introduction', () => {
  expect(widgetCoachingErrors(SUBJECTS)).toEqual([]);

  for (const entry of productionWidgetCards()) {
    const context = productionWidgetContext(entry);
    expect(entry.card.widgetCoach, context).toBeDefined();
    expect(entry.card.dialogue ?? [], context).toHaveLength(0);
  }
});

test('representative repaired cards keep source material and meaningful coaching states', () => {
  const repairedCards = [
    { subjectId: 'math' as const, lessonId: 'math-u12-l03', cardId: 'math-u12-l03-c2', source: /sample space/i, widgetType: 'probability-spinner' },
    { subjectId: 'reading' as const, lessonId: 'reading-u02-l01', cardId: 'reading-u02-l01-c2', source: /root port means carry/i, widgetType: 'word-root-builder' },
    { subjectId: 'science' as const, lessonId: 'science-u01-l04', cardId: 'science-u01-l04-c2', source: /changes one condition/i, widgetType: 'collision-ramp' },
  ];

  for (const entry of repairedCards) {
    const context = `${entry.subjectId}/${entry.lessonId}/${entry.cardId}`;
    const lesson = getSubject(entry.subjectId).units
      .flatMap((unit) => unit.lessons)
      .find((candidate) => candidate.id === entry.lessonId);
    const card = lesson?.learnCards.find((candidate) => candidate.id === entry.cardId);

    expect(card, context).toBeDefined();
    expect(card?.widget?.type, context).toBe(entry.widgetType);
    expect(card?.blocks.some((block) => 'text' in block && entry.source.test(block.text)), context).toBe(true);
    expect(card?.widgetCoach?.intro, context).toHaveLength(2);
    expect(card?.widgetCoach?.intro[0]?.speaker, context).toBe('guide');
    expect(card?.widgetCoach?.intro[1]?.speaker, context).toBe('kid');
    expect(Object.keys(card?.widgetCoach?.reactions ?? {}), context).toEqual(
      expect.arrayContaining(['retry', 'complete']),
    );
  }
});

test('production Reading widgets use visible source material instead of legacy answer strings', () => {
  for (const entry of productionWidgetCards().filter(({ subjectId }) => subjectId === 'reading')) {
    const context = productionWidgetContext(entry);

    if (entry.widget.type === 'story-elements-mapper') {
      expect(Object.keys(entry.widget.config.answers ?? {}), context).toHaveLength(0);
      expect(entry.widget.config.source, context).toBeDefined();
      expect(entry.widget.config.choices, context).toBeDefined();
      expect(entry.widget.config.answerChoiceIds, context).toBeDefined();
    }

    if (entry.widget.type === 'context-clue-detective') {
      expect(entry.widget.config.passage, context).toBeTruthy();
      expect(entry.widget.config.clueChoices, context).toHaveLength(2);
      expect(entry.widget.config.correctChoiceId, context).toBeTruthy();
    }

    if (entry.widget.type === 'theme-evidence-collector' || entry.widget.type === 'central-idea-organizer') {
      expect(entry.widget.config.source, context).toBeDefined();
    }

    if (entry.widget.type === 'summary-builder') {
      expect(entry.widget.config.sourceSentences.length, context).toBeGreaterThan(0);
      expect(entry.widget.config.compositionPrompt, context).toBeTruthy();
    }
  }
});

test('production credibility widgets use question-specific criterion judgments', () => {
  const entries = productionWidgetCards().filter(({ widget }) => widget.type === 'source-credibility-checker');

  expect(entries.length).toBeGreaterThan(0);
  for (const entry of entries) {
    if (entry.widget.type !== 'source-credibility-checker') continue;
    const context = productionWidgetContext(entry);

    expect(entry.widget.config.question, context).toBeTruthy();
    expect(entry.widget.config.answers, context).toBeDefined();
    expect(entry.widget.config.requiredReasonCount, context).toBeGreaterThan(0);
    expect(entry.widget.config.criteria, context).toBeUndefined();
    expect(entry.widget.config.credibleIds, context).toBeUndefined();
    for (const source of entry.widget.config.sources) {
      expect(source.judgments?.length, `${context} source ${source.id}`).toBeGreaterThan(0);
      expect(new Set(source.judgments?.map(({ criterion }) => criterion)).size, `${context} source ${source.id}`).toBe(
        source.judgments?.length,
      );
    }
  }
});

test('production target-driven widgets expose learner goals and source data', () => {
  for (const entry of productionWidgetCards()) {
    const context = productionWidgetContext(entry);

    switch (entry.widget.type) {
      case 'fraction-models':
        expect(entry.widget.config.target, context).toBeDefined();
        expect(entry.widget.config.taskPrompt, context).toBeTruthy();
        break;
      case 'array-builder':
        expect(entry.widget.config.targetProduct, context).toBeGreaterThan(0);
        expect(entry.widget.config.taskPrompt, context).toBeTruthy();
        break;
      case 'area-model-multiplier':
        expect(entry.widget.config.targetProduct, context).toBeGreaterThan(0);
        break;
      case 'money-counter':
        expect(entry.widget.config.targetCents, context).toBeGreaterThanOrEqual(0);
        expect(entry.widget.config.taskPrompt, context).toBeTruthy();
        break;
      case 'quarter-inch-ruler':
        expect(entry.widget.config.targetInches, context).toBeGreaterThanOrEqual(0);
        expect(entry.widget.config.taskPrompt, context).toBeTruthy();
        break;
      case 'data-plot-builder':
        expect(entry.widget.config.sourceData, context).toEqual(entry.widget.config.target);
        expect(entry.widget.config.taskPrompt, context).toBeTruthy();
        break;
      case 'probability-spinner':
        expect(entry.widget.config.eventQuestion, context).toBeDefined();
        expect(entry.widget.config.taskPrompt, context).toBeTruthy();
        break;
      case 'energy-transfer-builder':
        expect(entry.widget.config.requiredPath.length, context).toBeGreaterThan(0);
        break;
      case 'wave-maker':
      case 'light-reflection-eye':
        expect(entry.widget.config.taskPrompt, context).toBeTruthy();
        break;
      case 'story-elements-mapper':
        expect(entry.widget.config.source, context).toBeDefined();
        break;
      case 'theme-evidence-collector':
      case 'central-idea-organizer':
        expect(entry.widget.config.source, context).toBeDefined();
        break;
      case 'summary-builder':
        expect(entry.widget.config.sourceSentences.length, context).toBeGreaterThan(0);
        break;
      default:
        break;
    }
  }
});

test('production elapsed and Science comparison widgets use learner-controlled rich modes', () => {
  const entries = productionWidgetCards();
  const elapsed = entries.filter(({ widget }) => widget.type === 'clock-elapsed-time');
  const collisions = entries.filter(({ widget }) => widget.type === 'collision-ramp');
  const erosion = entries.filter(({ widget }) => widget.type === 'erosion-simulator');
  const topo = entries.filter(({ widget }) => widget.type === 'topographic-map-explorer');

  expect(elapsed.length).toBeGreaterThan(0);
  for (const entry of elapsed) {
    const widget = entry.widget;
    if (widget.type !== 'clock-elapsed-time') continue;
    expect(widget.config.mode, productionWidgetContext(entry)).toBe('elapsed');
    if (widget.config.mode !== 'elapsed') continue;
    expect(widget.config.jumpMinutes, productionWidgetContext(entry)).toBeDefined();
    expect(widget.config.jumpMinutes, productionWidgetContext(entry)).toEqual([5, 10, 15]);
  }

  expect(collisions.length).toBeGreaterThan(0);
  for (const entry of collisions) {
    if (entry.widget.type !== 'collision-ramp') continue;
    expect(entry.widget.config.target, productionWidgetContext(entry)).toBe('compare-motion');
    expect(entry.widget.config.controlledVariable, productionWidgetContext(entry)).toMatch(/^speed-[ab]$/);
    expect(entry.widget.config.comparisonRuns, productionWidgetContext(entry)).toBe(2);
    expect(entry.widget.config.taskPrompt, productionWidgetContext(entry)).toBeTruthy();
  }

  expect(erosion.length).toBeGreaterThan(0);
  for (const entry of erosion) {
    if (entry.widget.type !== 'erosion-simulator') continue;
    expect(entry.widget.config.targetAgent, productionWidgetContext(entry)).toBeDefined();
    expect(entry.widget.config.comparison, productionWidgetContext(entry)).toEqual({
      variable: 'vegetation', values: [false, true],
    });
  }

  expect(topo.length).toBeGreaterThan(0);
  for (const entry of topo) {
    if (entry.widget.type !== 'topographic-map-explorer') continue;
    const context = productionWidgetContext(entry);
    expect(entry.widget.config.targetPattern, context).toBeDefined();
    expect(entry.widget.config.targetPattern, context).toMatch(/^(band|cluster)$/);
    expect(entry.widget.config.points.every((point) => 'x' in point && 'y' in point && 'group' in point), context).toBe(true);
  }
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

test('runtime catalog equals the exact 119-row authored manifest', () => {
  expect(allLessons().map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes,
  }))).toEqual(PLANNED_LESSONS.map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes: [...indicatorCodes],
  })));
});

test('all 36 units are populated with the exact subject totals', () => {
  expect(SUBJECTS.flatMap(({ units }) => units)).toHaveLength(36);
  expect(SUBJECTS.every(({ units }) => units.every(({ lessons }) => lessons.length > 0))).toBe(true);
  expect(getSubject('math').units.flatMap(({ lessons }) => lessons)).toHaveLength(33);
  expect(getSubject('reading').units.flatMap(({ lessons }) => lessons)).toHaveLength(24);
  expect(getSubject('science').units.flatMap(({ lessons }) => lessons)).toHaveLength(32);
  expect(getSubject('social-studies').units.flatMap(({ lessons }) => lessons)).toHaveLength(30);
});

test('the full catalog has exact card, question, and threshold totals', () => {
  const lessons = allLessons();
  expect(lessons.flatMap(({ learnCards }) => learnCards)).toHaveLength(357);
  expect(lessons.flatMap(({ quiz }) => quiz.pool)).toHaveLength(1_547);
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
