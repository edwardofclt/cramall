import { allLessons, SUBJECTS, getSubject } from './subjects';
import { validateLesson } from './schema';

test('math unit 1 has its two pilot lessons', () => {
  expect(getSubject('math').units.find((unit) => unit.id === 'math-u01')?.lessons.map((lesson) => lesson.id))
    .toEqual(['math-u01-l01', 'math-u01-l02']);
});

test('every authored lesson passes cross-reference validation', () => {
  const errors = allLessons().flatMap(validateLesson);
  expect(errors).toEqual([]);
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
