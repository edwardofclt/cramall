import { expect, test } from 'vitest';
import { LessonSchema, WidgetRefSchema, validateLesson, type Lesson } from '../schema';
import { unit04Lessons } from './u04';

const expected = [
  { id: 'math-u04-l01', title: 'Multiply by Multiples of 10 and 100', indicatorCodes: ['4.PAFR.1.2'] },
  { id: 'math-u04-l02', title: 'Decompose to Multiply Multi-Digit Numbers', indicatorCodes: ['4.PAFR.1.3'] },
  { id: 'math-u04-l03', title: 'Multiplicative Comparisons and Unknowns', indicatorCodes: ['4.PAFR.3.3'] },
] as const;

const expectedCards = {
  'math-u04-l01': [['math-u04-l01-c1', 'See the Place-Value Shift', 'place-value-shifts'], ['math-u04-l01-c2', 'Use Properties of Operations', 'operation-properties'], ['math-u04-l01-c3', 'Apply a Multiple-of-Ten Product', 'product-application']],
  'math-u04-l02': [['math-u04-l02-c1', 'Make Partial Products', 'partial-products'], ['math-u04-l02-c2', 'Use an Area Model', 'area-model'], ['math-u04-l02-c3', 'Check a Decomposition', 'decomposition-check']],
  'math-u04-l03': [['math-u04-l03-c1', 'Read Comparison Language', 'comparison-language'], ['math-u04-l03-c2', 'Write a Variable Equation', 'variable-equation'], ['math-u04-l03-c3', 'Solve a Comparison Problem', 'comparison-problem']],
} as const;

const expectedRoutes = {
  'math-u04-l01': [
      ['multiple-choice', 'place-value-shifts', 1],
      ['fill-blank', 'place-value-shifts', 1],
      ['true-false', 'place-value-shifts', 1],
      ['multiple-choice', 'place-value-shifts', 1],
      ['multiple-choice', 'operation-properties', 2],
      ['fill-blank', 'operation-properties', 2],
      ['multiple-choice', 'operation-properties', 2],
      ['sort', 'operation-properties', 2],
      ['multiple-choice', 'product-application', 3],
      ['fill-blank', 'product-application', 3],
      ['true-false', 'product-application', 3],
      ['multiple-choice', 'product-application', 3],
      ['multiple-choice', 'product-application', 3]
  ],
  'math-u04-l02': [
      ['multiple-choice', 'partial-products', 1],
      ['fill-blank', 'partial-products', 1],
      ['multiple-choice', 'partial-products', 1],
      ['true-false', 'partial-products', 1],
      ['multiple-choice', 'area-model', 2],
      ['fill-blank', 'area-model', 2],
      ['multiple-choice', 'area-model', 2],
      ['sort', 'area-model', 2],
      ['multiple-choice', 'decomposition-check', 3],
      ['fill-blank', 'decomposition-check', 3],
      ['true-false', 'decomposition-check', 3],
      ['multiple-choice', 'decomposition-check', 3],
      ['multiple-choice', 'decomposition-check', 3]
  ],
  'math-u04-l03': [
      ['multiple-choice', 'comparison-language', 1],
      ['fill-blank', 'comparison-language', 1],
      ['true-false', 'comparison-language', 1],
      ['multiple-choice', 'comparison-language', 1],
      ['multiple-choice', 'variable-equation', 2],
      ['fill-blank', 'variable-equation', 2],
      ['multiple-choice', 'variable-equation', 2],
      ['true-false', 'variable-equation', 2],
      ['multiple-choice', 'comparison-problem', 3],
      ['fill-blank', 'comparison-problem', 3],
      ['multiple-choice', 'comparison-problem', 3],
      ['true-false', 'comparison-problem', 3],
      ['multiple-choice', 'comparison-problem', 3]
  ],
} as const;

const expectedWidgets = {
  'math-u04-l01-c1': { type: 'area-model-multiplier', config: { a: 30, b: 4, splitA: [30], splitB: [4], targetProduct: 120 } },
  'math-u04-l02-c2': { type: 'area-model-multiplier', config: { a: 23, b: 14, splitA: [20, 3], splitB: [10, 4], targetProduct: 322, revealMode: 'progressive' } },
  'math-u04-l03-c1': { type: 'array-builder', config: { rows: 2, columns: 6, targetProduct: 12, editable: true, taskPrompt: 'Build an array that shows four times as many as 3.' } },
} as const;

test('u04 is the exact validated 3-lesson unit', () => {
  expect(unit04Lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes }))).toEqual(expected);
  for (const lesson of unit04Lessons as Lesson[]) {
    expect(LessonSchema.safeParse(lesson).success).toBe(true);
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.unitId).toBe('math-u04');
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

test('u04 diagnoses the missing tens partial products in the 92 error', () => {
  const question = unit04Lessons
    .find(({ id }) => id === 'math-u04-l02')!
    .quiz.pool.find(({ id }) => id === 'math-u04-l02-q12');

  expect(question && 'choices' in question ? question.choices?.find(({ id }) => id === 'a') : undefined)
    .toEqual({ id: 'a', text: 'The partial products involving 10' });
  expect(question).toMatchObject({
    correctChoiceId: 'a',
    explanation: 'The remaining 80 + 12 equals 92, so both products using 10 were missed.',
  });
});
