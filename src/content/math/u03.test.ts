import { expect, test } from 'vitest';
import { LessonSchema, WidgetRefSchema, validateLesson, type Lesson } from '../schema';
import { unit03Lessons } from './u03';

const expected = [
  { id: 'math-u03-l01', title: 'Factor Pairs, Primes, and Composites', indicatorCodes: ['4.PAFR.3.1'] },
  { id: 'math-u03-l02', title: 'Rules and Function-Table Patterns', indicatorCodes: ['4.PAFR.3.2'] },
] as const;

const expectedCards = {
  'math-u03-l01': [['math-u03-l01-c1', 'Build Every Factor Pair', 'factor-pairs'], ['math-u03-l01-c2', 'Tell Prime from Composite', 'prime-composite'], ['math-u03-l01-c3', 'Classify a Number and Justify', 'number-classification']],
  'math-u03-l02': [['math-u03-l02-c1', 'Find the Input-Output Rule', 'input-output-rule'], ['math-u03-l02-c2', 'Complete a Function Table', 'function-table'], ['math-u03-l02-c3', 'Apply a Pattern to a Situation', 'real-world-pattern']],
} as const;

const expectedRoutes = {
  'math-u03-l01': [
      ['multiple-choice', 'factor-pairs', 1],
      ['fill-blank', 'factor-pairs', 1],
      ['sort', 'factor-pairs', 1],
      ['multiple-choice', 'factor-pairs', 1],
      ['multiple-choice', 'prime-composite', 2],
      ['true-false', 'prime-composite', 2],
      ['fill-blank', 'prime-composite', 2],
      ['multiple-choice', 'prime-composite', 2],
      ['multiple-choice', 'number-classification', 3],
      ['fill-blank', 'number-classification', 3],
      ['true-false', 'number-classification', 3],
      ['multiple-choice', 'number-classification', 3],
      ['multiple-choice', 'number-classification', 3]
  ],
  'math-u03-l02': [
      ['multiple-choice', 'input-output-rule', 1],
      ['fill-blank', 'input-output-rule', 1],
      ['true-false', 'input-output-rule', 1],
      ['multiple-choice', 'input-output-rule', 1],
      ['fill-blank', 'function-table', 2],
      ['multiple-choice', 'function-table', 2],
      ['fill-blank', 'function-table', 2],
      ['multiple-choice', 'function-table', 2],
      ['multiple-choice', 'real-world-pattern', 3],
      ['fill-blank', 'real-world-pattern', 3],
      ['true-false', 'real-world-pattern', 3],
      ['multiple-choice', 'real-world-pattern', 3],
      ['fill-blank', 'real-world-pattern', 3]
  ],
} as const;

const expectedWidgets = {
  'math-u03-l02-c2': { type: 'math-workshop', config: { activity: 'acorn-rule-machine' } },
  'math-u03-l01-c1': { type: 'array-builder', config: { rows: 4, columns: 6, targetProduct: 24, editable: true, task: 'factor-hunt', taskPrompt: 'Find every factor pair for 24.' } },
} as const;

test('u03 is the exact validated 2-lesson unit', () => {
  expect(unit03Lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes }))).toEqual(expected);
  for (const lesson of unit03Lessons as Lesson[]) {
    expect(LessonSchema.safeParse(lesson).success).toBe(true);
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.unitId).toBe('math-u03');
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
