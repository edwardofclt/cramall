import { expect, test } from 'vitest';
import { LessonSchema, WidgetRefSchema, validateLesson, type Lesson } from '../schema';
import { unit08Lessons } from './u08';

const expected = [
  { id: 'math-u08-l01', title: 'Tenths and Hundredths as Fractions and Decimals', indicatorCodes: ['4.NR.2.1'] },
  { id: 'math-u08-l02', title: 'Compare Decimals with Benchmarks', indicatorCodes: ['4.NR.2.2'] },
  { id: 'math-u08-l03', title: 'Add and Subtract Tenths and Hundredths', indicatorCodes: ['4.PAFR.2.2'] },
] as const;

const expectedCards = {
  'math-u08-l01': [['math-u08-l01-c1', 'Represent Tenths', 'tenths-representation'], ['math-u08-l01-c2', 'Represent Hundredths', 'hundredths-representation'], ['math-u08-l01-c3', 'Connect Fraction Words, Models, and Decimals', 'decimal-notation']],
  'math-u08-l02': [['math-u08-l02-c1', 'Use 0, 0.5, and 1 as Benchmarks', 'decimal-benchmarks'], ['math-u08-l02-c2', 'Read Concrete, Area, and Linear Models', 'decimal-models'], ['math-u08-l02-c3', 'Choose and Justify a Comparison Symbol', 'decimal-comparison']],
  'math-u08-l03': [['math-u08-l03-c1', 'Connect Fraction and Decimal Equivalents', 'fraction-decimal-equivalence'], ['math-u08-l03-c2', 'Add or Subtract Decimal Parts', 'decimal-operation'], ['math-u08-l03-c3', 'Operate with Mixed Quantities', 'decimal-mixed-quantity']],
} as const;

const expectedRoutes = {
  'math-u08-l01': [
      ['multiple-choice', 'tenths-representation', 1],
      ['fill-blank', 'tenths-representation', 1],
      ['true-false', 'tenths-representation', 1],
      ['multiple-choice', 'tenths-representation', 1],
      ['multiple-choice', 'hundredths-representation', 2],
      ['fill-blank', 'hundredths-representation', 2],
      ['true-false', 'hundredths-representation', 2],
      ['multiple-choice', 'hundredths-representation', 2],
      ['multiple-choice', 'decimal-notation', 3],
      ['fill-blank', 'decimal-notation', 3],
      ['true-false', 'decimal-notation', 3],
      ['multiple-choice', 'decimal-notation', 3],
      ['multiple-choice', 'decimal-notation', 3]
  ],
  'math-u08-l02': [
      ['multiple-choice', 'decimal-benchmarks', 1],
      ['fill-blank', 'decimal-benchmarks', 1],
      ['true-false', 'decimal-benchmarks', 1],
      ['multiple-choice', 'decimal-benchmarks', 1],
      ['multiple-choice', 'decimal-models', 2],
      ['fill-blank', 'decimal-models', 2],
      ['true-false', 'decimal-models', 2],
      ['multiple-choice', 'decimal-models', 2],
      ['multiple-choice', 'decimal-comparison', 3],
      ['sort', 'decimal-comparison', 3],
      ['true-false', 'decimal-comparison', 3],
      ['multiple-choice', 'decimal-comparison', 3],
      ['fill-blank', 'decimal-comparison', 3]
  ],
  'math-u08-l03': [
      ['multiple-choice', 'fraction-decimal-equivalence', 1],
      ['fill-blank', 'fraction-decimal-equivalence', 1],
      ['true-false', 'fraction-decimal-equivalence', 1],
      ['multiple-choice', 'fraction-decimal-equivalence', 1],
      ['multiple-choice', 'decimal-operation', 2],
      ['fill-blank', 'decimal-operation', 2],
      ['true-false', 'decimal-operation', 2],
      ['multiple-choice', 'decimal-operation', 2],
      ['multiple-choice', 'decimal-mixed-quantity', 3],
      ['fill-blank', 'decimal-mixed-quantity', 3],
      ['true-false', 'decimal-mixed-quantity', 3],
      ['multiple-choice', 'decimal-mixed-quantity', 3],
      ['multiple-choice', 'decimal-mixed-quantity', 3]
  ],
} as const;

const expectedWidgets = {
  'math-u08-l01-c3': { type: 'number-line-compare', config: { min: 0, max: 1, a: 0.1, b: 0.35, step: 0.01, display: 'fraction', denominator: 100 } },
  'math-u08-l02-c1': { type: 'number-line-compare', config: { min: 0, max: 1, a: 0.48, b: 0.52, step: 0.01, display: 'number' } },
} as const;

test('u08 is the exact validated 3-lesson unit', () => {
  expect(unit08Lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes }))).toEqual(expected);
  for (const lesson of unit08Lessons as Lesson[]) {
    expect(LessonSchema.safeParse(lesson).success).toBe(true);
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.unitId).toBe('math-u08');
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

test('u08 directly teaches concrete decimal models, mixed-number operations, and spoken comparison symbols', () => {
  const comparisonLesson = unit08Lessons[1] as Lesson;
  const operationLesson = unit08Lessons[2] as Lesson;

  expect(comparisonLesson.learnCards[1]?.blocks.some(({ text }) => text.includes('concrete base-ten model'))).toBe(true);
  expect(comparisonLesson.quiz.pool.find(({ id }) => id === 'math-u08-l02-q08')?.prompt).toContain('concrete base-ten model');
  expect(comparisonLesson.learnCards[2]?.blocks.some(({ text }) => text.includes('is less than'))).toBe(true);
  for (const id of ['math-u08-l02-q02', 'math-u08-l02-q09', 'math-u08-l02-q11', 'math-u08-l02-q13']) {
    expect(comparisonLesson.quiz.pool.find((question) => question.id === id)?.prompt).toMatch(/is less than|read as/);
  }
  expect(operationLesson.learnCards[2]?.blocks.some(({ text }) => text.includes('1 3/10 + 7/10 = 2'))).toBe(true);
  expect(operationLesson.quiz.pool.find(({ id }) => id === 'math-u08-l03-q09')?.prompt).toContain('1 3/10 + 7/10');
});
