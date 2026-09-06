import { expect, test } from 'vitest';
import { LessonSchema, WidgetRefSchema, validateLesson, type Lesson } from '../schema';
import { unit10Lessons } from './u10';

const expected = [
  { id: 'math-u10-l01', title: 'Rectangle Perimeter and Unknown Sides', indicatorCodes: ['4.MGSR.1.1'] },
  { id: 'math-u10-l02', title: 'Rectangle Area in Square Units', indicatorCodes: ['4.MGSR.1.2'] },
] as const;

const expectedCards = {
  'math-u10-l01': [['math-u10-l01-c1', 'Use the Perimeter Formula', 'perimeter-formula'], ['math-u10-l01-c2', 'Find an Unknown Side Length', 'unknown-side'], ['math-u10-l01-c3', 'Solve a Perimeter Situation', 'perimeter-situation']],
  'math-u10-l02': [['math-u10-l02-c1', 'Use the Area Formula', 'area-formula'], ['math-u10-l02-c2', 'Connect Rows to Square Units', 'square-units'], ['math-u10-l02-c3', 'Solve and Label an Area Situation', 'area-situation']],
} as const;

const expectedRoutes = {
  'math-u10-l01': [
      ['multiple-choice', 'perimeter-formula', 1],
      ['fill-blank', 'perimeter-formula', 1],
      ['true-false', 'perimeter-formula', 1],
      ['multiple-choice', 'perimeter-formula', 1],
      ['multiple-choice', 'unknown-side', 2],
      ['fill-blank', 'unknown-side', 2],
      ['true-false', 'unknown-side', 2],
      ['multiple-choice', 'unknown-side', 2],
      ['multiple-choice', 'perimeter-situation', 3],
      ['fill-blank', 'perimeter-situation', 3],
      ['true-false', 'perimeter-situation', 3],
      ['multiple-choice', 'perimeter-situation', 3],
      ['multiple-choice', 'perimeter-situation', 3]
  ],
  'math-u10-l02': [
      ['multiple-choice', 'area-formula', 1],
      ['fill-blank', 'area-formula', 1],
      ['true-false', 'area-formula', 1],
      ['multiple-choice', 'area-formula', 1],
      ['multiple-choice', 'square-units', 2],
      ['fill-blank', 'square-units', 2],
      ['true-false', 'square-units', 2],
      ['multiple-choice', 'square-units', 2],
      ['multiple-choice', 'area-situation', 3],
      ['fill-blank', 'area-situation', 3],
      ['true-false', 'area-situation', 3],
      ['multiple-choice', 'area-situation', 3],
      ['multiple-choice', 'area-situation', 3]
  ],
} as const;

const expectedWidgets = {
  'math-u10-l02-c2': { type: 'area-model-multiplier', config: { a: 8, b: 5, splitA: [8], splitB: [5], targetProduct: 40, revealMode: 'all' } },
} as const;

test('u10 is the exact validated 2-lesson unit', () => {
  expect(unit10Lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes }))).toEqual(expected);
  for (const lesson of unit10Lessons as Lesson[]) {
    expect(LessonSchema.safeParse(lesson).success).toBe(true);
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.unitId).toBe('math-u10');
    expect(lesson.learnCards).toHaveLength(3);
    expect(lesson.quiz.passThreshold).toBe(8);
    expect(lesson.quiz.pool).toHaveLength(13);
    expect(new Set(lesson.quiz.pool.map(({ type }) => type)).size).toBeGreaterThanOrEqual(2);
    expect(lesson.quiz.pool.map(({ id }) => id)).toEqual(
      Array.from({ length: 13 }, (_, index) => `${lesson.id}-q${String(index + 1).padStart(2, '0')}`),
    );

    const cardSpecs = expectedCards[lesson.id as keyof typeof expectedCards];
    expect(lesson.learnCards.map((card, index) => [
      card.id,
      card.title,
      lesson.quiz.pool.find(({ reviewCardId }) => reviewCardId === `${lesson.id}-c${index + 1}`)?.conceptTag,
    ])).toEqual(cardSpecs);
    expect(lesson.quiz.pool.map(({ type, conceptTag, reviewCardId }) => [
      type, conceptTag, Number(reviewCardId.slice(-1)),
    ])).toEqual(expectedRoutes[lesson.id as keyof typeof expectedRoutes]);
    expect(new Set(lesson.quiz.pool.map(({ reviewCardId }) => reviewCardId))).toEqual(
      new Set(lesson.learnCards.map(({ id }) => id)),
    );

    for (const card of lesson.learnCards) {
      const expectedWidget = expectedWidgets[card.id as keyof typeof expectedWidgets];
      expect(card.widget).toEqual(expectedWidget);
      if (card.widget) expect(WidgetRefSchema.safeParse(card.widget).success).toBe(true);
    }
  }
});
