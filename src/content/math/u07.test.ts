import { expect, test } from 'vitest';
import { LessonSchema, WidgetRefSchema, validateLesson, type Lesson } from '../schema';
import { unit07Lessons } from './u07';

const expected = [
  { id: 'math-u07-l01', title: 'Add and Subtract Like-Denominator Fractions', indicatorCodes: ['4.PAFR.2.1'] },
  { id: 'math-u07-l02', title: 'Whole Number Times a Unit Fraction', indicatorCodes: ['4.PAFR.2.3'] },
  { id: 'math-u07-l03', title: 'Fractions as Equal-Sharing Division', indicatorCodes: ['4.PAFR.2.4'] },
] as const;

const expectedCards = {
  'math-u07-l01': [['math-u07-l01-c1', 'Model a Fraction Operation', 'fraction-operation-model'], ['math-u07-l01-c2', 'Keep the Denominator', 'like-denominator'], ['math-u07-l01-c3', 'Apply and Justify the Result', 'fraction-reasonableness']],
  'math-u07-l02': [['math-u07-l02-c1', 'See Equal Unit-Fraction Groups', 'unit-fraction-groups'], ['math-u07-l02-c2', 'Compute the Product', 'unit-fraction-product'], ['math-u07-l02-c3', 'Solve a Fraction Product Situation', 'fraction-product-situation']],
  'math-u07-l03': [['math-u07-l03-c1', 'Describe an Equal-Sharing Situation', 'sharing-situation'], ['math-u07-l03-c2', 'Connect Numerator and Quantity', 'numerator-quantity'], ['math-u07-l03-c3', 'Connect Denominator and Shares', 'denominator-shares']],
} as const;

const expectedRoutes = {
  'math-u07-l01': [
      ['multiple-choice', 'like-denominator', 2],
      ['fill-blank', 'like-denominator', 2],
      ['true-false', 'like-denominator', 2],
      ['multiple-choice', 'like-denominator', 2],
      ['multiple-choice', 'fraction-operation-model', 1],
      ['fill-blank', 'fraction-operation-model', 1],
      ['true-false', 'fraction-operation-model', 1],
      ['multiple-choice', 'fraction-operation-model', 1],
      ['multiple-choice', 'fraction-reasonableness', 3],
      ['fill-blank', 'fraction-reasonableness', 3],
      ['true-false', 'fraction-reasonableness', 3],
      ['multiple-choice', 'fraction-reasonableness', 3],
      ['multiple-choice', 'fraction-reasonableness', 3]
  ],
  'math-u07-l02': [
      ['multiple-choice', 'unit-fraction-groups', 1],
      ['fill-blank', 'unit-fraction-groups', 1],
      ['true-false', 'unit-fraction-groups', 1],
      ['multiple-choice', 'unit-fraction-groups', 1],
      ['multiple-choice', 'unit-fraction-product', 2],
      ['fill-blank', 'unit-fraction-product', 2],
      ['true-false', 'unit-fraction-product', 2],
      ['multiple-choice', 'unit-fraction-product', 2],
      ['multiple-choice', 'fraction-product-situation', 3],
      ['fill-blank', 'fraction-product-situation', 3],
      ['true-false', 'fraction-product-situation', 3],
      ['multiple-choice', 'fraction-product-situation', 3],
      ['multiple-choice', 'fraction-product-situation', 3]
  ],
  'math-u07-l03': [
      ['multiple-choice', 'sharing-situation', 1],
      ['fill-blank', 'sharing-situation', 1],
      ['true-false', 'sharing-situation', 1],
      ['multiple-choice', 'sharing-situation', 1],
      ['multiple-choice', 'numerator-quantity', 2],
      ['fill-blank', 'numerator-quantity', 2],
      ['true-false', 'numerator-quantity', 2],
      ['multiple-choice', 'numerator-quantity', 2],
      ['multiple-choice', 'denominator-shares', 3],
      ['fill-blank', 'denominator-shares', 3],
      ['true-false', 'denominator-shares', 3],
      ['multiple-choice', 'denominator-shares', 3],
      ['multiple-choice', 'denominator-shares', 3]
  ],
} as const;

const expectedWidgets = {
  'math-u07-l01-c1': {"type": "fraction-models", "config": {"mode": "bars", "denominator": 8, "numerator": 3, "target": {"numerator": 5, "denominator": 8}, "allowEquivalent": false}},
  'math-u07-l01-c2': {"type": "fraction-models", "config": {"mode": "circles", "denominator": 8, "numerator": 5, "target": {"numerator": 2, "denominator": 8}, "allowEquivalent": false}},
  'math-u07-l01-c3': {"type": "fraction-models", "config": {"mode": "bars", "denominator": 10, "numerator": 8, "target": {"numerator": 5, "denominator": 10}, "allowEquivalent": false}},
  'math-u07-l02-c1': {"type": "fraction-models", "config": {"mode": "bars", "denominator": 4, "numerator": 0, "target": {"numerator": 3, "denominator": 4}, "allowEquivalent": false}},
  'math-u07-l02-c2': {"type": "number-line-compare", "config": {"min": 0, "max": 2.5, "a": 0, "b": 2.25, "step": 0.25, "display": "fraction", "denominator": 4}},
  'math-u07-l02-c3': {"type": "fraction-models", "config": {"mode": "bars", "denominator": 8, "numerator": 0, "target": {"numerator": 6, "denominator": 8}, "allowEquivalent": false}},
  'math-u07-l03-c1': {"type": "fraction-models", "config": {"mode": "circles", "denominator": 6, "numerator": 0, "target": {"numerator": 5, "denominator": 6}, "allowEquivalent": false}},
  'math-u07-l03-c2': {"type": "array-builder", "config": {"rows": 1, "columns": 3, "targetProduct": 12, "editable": true}},
  'math-u07-l03-c3': {"type": "number-line-compare", "config": {"min": 0, "max": 1, "a": 0.5, "b": 0.25, "step": 0.25, "display": "fraction", "denominator": 4}},
} as const;

test('u07 is the exact validated 3-lesson unit', () => {
  expect(unit07Lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes }))).toEqual(expected);
  for (const lesson of unit07Lessons as Lesson[]) {
    expect(LessonSchema.safeParse(lesson).success).toBe(true);
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.unitId).toBe('math-u07');
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

test('u07 uses a model-strategy-context arc and requires unambiguous fraction forms', () => {
  const lesson1 = unit07Lessons[0] as Lesson;
  const lesson2 = unit07Lessons[1] as Lesson;

  expect(lesson1.learnCards[0]?.blocks.some(({ text }) => text.includes('bar model'))).toBe(true);
  expect(lesson1.learnCards[2]?.blocks.some(({ text }) => text.includes('measurement situation'))).toBe(true);
  const denominatorPrompts = [
    [lesson1, 'math-u07-l01-q02', 'Give the answer as a fraction with denominator 10: 9/10 - 4/10 = ___.', ['5/10']],
    [lesson1, 'math-u07-l01-q10', 'Give the answer as a fraction with denominator 8: 13/8 - 4/8 = ___.', ['9/8']],
    [lesson2, 'math-u07-l02-q10', 'Give the answer as a fraction with denominator 3: A recipe uses 1/3 cup of oats in each of 5 batches. It uses ___ cup in all.', ['5/3']],
  ] as const;
  for (const [lesson, id, prompt, acceptedAnswers] of denominatorPrompts) {
    const question = lesson.quiz.pool.find((candidate) => candidate.id === id);
    expect(question?.type).toBe('fill-blank');
    if (question?.type === 'fill-blank') {
      expect(question.prompt).toBe(prompt);
      expect(question.acceptedAnswers).toEqual(acceptedAnswers);
    }
  }
  const ribbonQuestion = lesson1.quiz.pool.find(({ id }) => id === 'math-u07-l01-q08');
  expect(ribbonQuestion?.type).toBe('multiple-choice');
  if (ribbonQuestion?.type === 'multiple-choice') {
    expect(ribbonQuestion.choices.find(({ id }) => id === ribbonQuestion.correctChoiceId)?.text).toContain('A ribbon is 9/10 meter long');
  }
});
