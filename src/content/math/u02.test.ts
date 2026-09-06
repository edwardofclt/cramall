import { expect, test } from 'vitest';
import { LessonSchema, validateLesson, type Lesson } from '../schema';
import { unit02Lessons } from './u02';

const expected = [
  { id: 'math-u02-l01', title: 'Add and Subtract to 100,000', indicatorCodes: ['4.PAFR.1.1'] },
  { id: 'math-u02-l02', title: 'Estimate and Judge Reasonableness', indicatorCodes: ['4.NR.1.2'] },
] as const;

const expectedCards = {
  'math-u02-l01': [
    ['math-u02-l01-c1', 'Choose an Addition or Subtraction Strategy', 'add-subtract-strategy'],
    ['math-u02-l01-c2', 'Regroup by Place Value', 'regrouping'],
    ['math-u02-l01-c3', 'Justify and Check the Result', 'justify-check'],
  ],
  'math-u02-l02': [
    ['math-u02-l02-c1', 'Choose the Place to Round', 'rounding-choice'],
    ['math-u02-l02-c2', 'Write an Estimate Equation', 'estimate-equation'],
    ['math-u02-l02-c3', 'Judge Whether an Answer Is Reasonable', 'reasonableness'],
  ],
} as const;

const expectedRoutes = {
  'math-u02-l01': [
    ['multiple-choice', 'add-subtract-strategy', 1],
    ['multiple-choice', 'add-subtract-strategy', 1],
    ['fill-blank', 'add-subtract-strategy', 1],
    ['multiple-choice', 'add-subtract-strategy', 1],
    ['multiple-choice', 'regrouping', 2],
    ['fill-blank', 'regrouping', 2],
    ['true-false', 'regrouping', 2],
    ['sort', 'regrouping', 2],
    ['multiple-choice', 'justify-check', 3],
    ['fill-blank', 'justify-check', 3],
    ['true-false', 'justify-check', 3],
    ['multiple-choice', 'justify-check', 3],
    ['multiple-choice', 'justify-check', 3],
  ],
  'math-u02-l02': [
    ['multiple-choice', 'rounding-choice', 1],
    ['fill-blank', 'rounding-choice', 1],
    ['multiple-choice', 'rounding-choice', 1],
    ['true-false', 'rounding-choice', 1],
    ['multiple-choice', 'estimate-equation', 2],
    ['fill-blank', 'estimate-equation', 2],
    ['multiple-choice', 'estimate-equation', 2],
    ['sort', 'estimate-equation', 2],
    ['multiple-choice', 'reasonableness', 3],
    ['true-false', 'reasonableness', 3],
    ['multiple-choice', 'reasonableness', 3],
    ['fill-blank', 'reasonableness', 3],
    ['multiple-choice', 'reasonableness', 3],
  ],
} as const;

test('u02 is the exact validated two-lesson unit', () => {
  expect(unit02Lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes }))).toEqual(expected);
  for (const lesson of unit02Lessons as Lesson[]) {
    expect(LessonSchema.safeParse(lesson).success).toBe(true);
    expect(validateLesson(lesson)).toHaveLength(0);
    expect(lesson.unitId).toBe('math-u02');
    expect(lesson.learnCards).toHaveLength(3);
    expect(lesson.quiz.passThreshold).toBe(8);
    expect(lesson.quiz.pool).toHaveLength(13);
    expect(new Set(lesson.quiz.pool.map(({ type }) => type)).size).toBeGreaterThanOrEqual(2);
    expect(lesson.quiz.pool.map((question) => question.id)).toEqual(
      Array.from({ length: 13 }, (_, index) => `${lesson.id}-q${String(index + 1).padStart(2, '0')}`),
    );
    // Every card now carries a manipulative; see manipulative-coverage.test.ts for the bar
    // and widget-reachability.test.ts for the guarantee that each one is operable.
    expect(lesson.learnCards.every((card) => card.widget !== undefined)).toBe(true);

    const cardSpecs = expectedCards[lesson.id as keyof typeof expectedCards];
    expect(lesson.learnCards.map((card, index) => [
      card.id,
      card.title,
      lesson.quiz.pool.find((question) => question.reviewCardId === `${lesson.id}-c${index + 1}`)?.conceptTag,
    ])).toEqual(cardSpecs);
    expect(lesson.quiz.pool.map(({ type, conceptTag, reviewCardId }) => [
      type, conceptTag, Number(reviewCardId.slice(-1)),
    ])).toEqual(expectedRoutes[lesson.id as keyof typeof expectedRoutes]);
    for (const question of lesson.quiz.pool) {
      const cardIndex = Number(question.reviewCardId.slice(-1)) - 1;
      expect(question.conceptTag).toBe(cardSpecs[cardIndex]?.[2]);
    }
  }
});
