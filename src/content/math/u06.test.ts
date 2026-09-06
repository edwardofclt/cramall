// src/content/math/u06.test.ts
import { expect, test } from 'vitest';
import { LessonSchema, WidgetRefSchema, validateLesson, type Lesson } from '../schema';
import { unit06Lessons } from './u06';

const expected = [
  { id: 'math-u06-l01', title: 'Equivalent Fractions and Models', indicatorCodes: ['4.NR.2.3'] },
  { id: 'math-u06-l02', title: 'Compose and Decompose Like-Denominator Fractions', indicatorCodes: ['4.NR.2.4'] },
  { id: 'math-u06-l03', title: 'Mixed Numbers and Fractions Greater Than One', indicatorCodes: ['4.NR.2.5'] },
  { id: 'math-u06-l04', title: 'Compare Fractions and Mixed Numbers', indicatorCodes: ['4.NR.2.6'] },
] as const;

const expectedCards = {
  'math-u06-l01': [['math-u06-l01-c1', 'Name Equal Parts', 'equal-parts'], ['math-u06-l01-c2', 'Generate an Equivalent Fraction', 'equivalent-pattern'], ['math-u06-l01-c3', 'Connect Equivalent Representations', 'equivalent-representations']],
  'math-u06-l02': [['math-u06-l02-c1', 'Compose Fraction Parts', 'compose-parts'], ['math-u06-l02-c2', 'Decompose Fraction Parts', 'decompose-parts'], ['math-u06-l02-c3', 'Represent a Mixed Quantity', 'mixed-composition']],
  'math-u06-l03': [['math-u06-l03-c1', 'Read a Fraction Greater Than One', 'greater-than-one'], ['math-u06-l03-c2', 'Write an Equivalent Mixed Number', 'mixed-number'], ['math-u06-l03-c3', 'Explain Why the Forms Are Equal', 'mixed-equivalence']],
  'math-u06-l04': [['math-u06-l04-c1', 'Use Benchmark Fractions', 'benchmark-fractions'], ['math-u06-l04-c2', 'Compare Unlike Denominators', 'unlike-denominators'], ['math-u06-l04-c3', 'Choose and Justify a Comparison Symbol', 'fraction-comparison']],
} as const;

const expectedRoutes = {
  'math-u06-l01': [
      ['multiple-choice', 'equal-parts', 1],
      ['fill-blank', 'equal-parts', 1],
      ['true-false', 'equal-parts', 1],
      ['multiple-choice', 'equal-parts', 1],
      ['multiple-choice', 'equivalent-pattern', 2],
      ['fill-blank', 'equivalent-pattern', 2],
      ['true-false', 'equivalent-pattern', 2],
      ['multiple-choice', 'equivalent-pattern', 2],
      ['multiple-choice', 'equivalent-representations', 3],
      ['fill-blank', 'equivalent-representations', 3],
      ['true-false', 'equivalent-representations', 3],
      ['multiple-choice', 'equivalent-representations', 3],
      ['multiple-choice', 'equivalent-representations', 3]
  ],
  'math-u06-l02': [
      ['multiple-choice', 'compose-parts', 1],
      ['fill-blank', 'compose-parts', 1],
      ['true-false', 'compose-parts', 1],
      ['multiple-choice', 'compose-parts', 1],
      ['multiple-choice', 'decompose-parts', 2],
      ['fill-blank', 'decompose-parts', 2],
      ['multiple-choice', 'decompose-parts', 2],
      ['true-false', 'decompose-parts', 2],
      ['multiple-choice', 'mixed-composition', 3],
      ['fill-blank', 'mixed-composition', 3],
      ['true-false', 'mixed-composition', 3],
      ['multiple-choice', 'mixed-composition', 3],
      ['multiple-choice', 'mixed-composition', 3]
  ],
  'math-u06-l03': [
      ['multiple-choice', 'greater-than-one', 1],
      ['fill-blank', 'greater-than-one', 1],
      ['true-false', 'greater-than-one', 1],
      ['multiple-choice', 'greater-than-one', 1],
      ['multiple-choice', 'mixed-number', 2],
      ['fill-blank', 'mixed-number', 2],
      ['true-false', 'mixed-number', 2],
      ['multiple-choice', 'mixed-number', 2],
      ['multiple-choice', 'mixed-equivalence', 3],
      ['fill-blank', 'mixed-equivalence', 3],
      ['true-false', 'mixed-equivalence', 3],
      ['multiple-choice', 'mixed-equivalence', 3],
      ['multiple-choice', 'mixed-equivalence', 3]
  ],
  'math-u06-l04': [
      ['multiple-choice', 'benchmark-fractions', 1],
      ['fill-blank', 'benchmark-fractions', 1],
      ['true-false', 'benchmark-fractions', 1],
      ['multiple-choice', 'benchmark-fractions', 1],
      ['multiple-choice', 'unlike-denominators', 2],
      ['fill-blank', 'unlike-denominators', 2],
      ['true-false', 'unlike-denominators', 2],
      ['multiple-choice', 'unlike-denominators', 2],
      ['multiple-choice', 'fraction-comparison', 3],
      ['sort', 'fraction-comparison', 3],
      ['true-false', 'fraction-comparison', 3],
      ['multiple-choice', 'fraction-comparison', 3],
      ['fill-blank', 'fraction-comparison', 3]
  ],
} as const;

const expectedWidgets = {
  'math-u06-l01-c2': { type: 'fraction-models', config: { mode: 'both', denominator: 4, numerator: 0, target: { numerator: 1, denominator: 2 }, allowEquivalent: true, taskPrompt: 'Build 1/2 with fourths.' } },
  'math-u06-l04-c1': { type: 'number-line-compare', config: { min: 0, max: 2, a: 0.5, b: 1.5, step: 0.25, display: 'fraction', denominator: 4 } },
} as const;

test('u06 is the exact validated 4-lesson unit', () => {
  expect(unit06Lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes }))).toEqual(expected);
  for (const lesson of unit06Lessons as Lesson[]) {
    expect(LessonSchema.safeParse(lesson).success).toBe(true);
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.unitId).toBe('math-u06');
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
      if (card.id === 'math-u06-l01-c2') {
        expect(card.widgetCoach?.intro).toHaveLength(2);
        expect(card.widgetCoach?.reactions.complete.text).toContain('equivalent');
      }
    }
  }
});

test('u06 scored fractions use only the standard-approved denominators', () => {
  const allowedDenominators = new Set([2, 3, 4, 5, 6, 8, 10, 12, 20, 25, 50, 100]);
  const violations = unit06Lessons.flatMap((lesson) => lesson.quiz.pool.flatMap((question) => {
    const answerText = question.type === 'fill-blank'
      ? question.acceptedAnswers
      : question.type === 'sort'
        ? question.items.map(({ text }) => text)
        : question.choices.map(({ text }) => text);
    const fractionTokens = [question.prompt, question.explanation, ...answerText]
      .flatMap((text) => text.match(/\b\d+\/\d+\b/g) ?? []);
    return fractionTokens
      .filter((token) => !allowedDenominators.has(Number(token.split('/')[1])))
      .map((token) => `${question.id}: ${token}`);
  }));

  expect(violations).toEqual([]);
});
