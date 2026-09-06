// src/content/math/u05.test.ts
import { expect, test } from 'vitest';
import { LessonSchema, WidgetRefSchema, validateLesson, type Lesson } from '../schema';
import { unit05Lessons } from './u05';

const expected = [
  { id: 'math-u05-l01', title: 'Divide up to Four Digits by One Digit, Including Remainders', indicatorCodes: ['4.PAFR.1.4'] },
  { id: 'math-u05-l02', title: 'Two-Step Equations with an Unknown', indicatorCodes: ['4.PAFR.3.4'] },
] as const;

const expectedCards = {
  'math-u05-l01': [['math-u05-l01-c1', 'Choose a Division Strategy', 'division-strategy'], ['math-u05-l01-c2', 'Interpret a Remainder', 'remainder-meaning'], ['math-u05-l01-c3', 'Justify and Check a Quotient', 'quotient-check']],
  'math-u05-l02': [['math-u05-l02-c1', 'Plan the Two Steps', 'problem-plan'], ['math-u05-l02-c2', 'Write an Equation with a Variable', 'two-step-equation'], ['math-u05-l02-c3', 'Solve and Check the Answer', 'two-step-check']],
} as const;

const expectedRoutes = {
  'math-u05-l01': [
      ['multiple-choice', 'division-strategy', 1],
      ['fill-blank', 'division-strategy', 1],
      ['multiple-choice', 'division-strategy', 1],
      ['true-false', 'division-strategy', 1],
      ['multiple-choice', 'remainder-meaning', 2],
      ['fill-blank', 'remainder-meaning', 2],
      ['multiple-choice', 'remainder-meaning', 2],
      ['true-false', 'remainder-meaning', 2],
      ['multiple-choice', 'quotient-check', 3],
      ['fill-blank', 'quotient-check', 3],
      ['true-false', 'quotient-check', 3],
      ['multiple-choice', 'quotient-check', 3],
      ['multiple-choice', 'quotient-check', 3]
  ],
  'math-u05-l02': [
      ['multiple-choice', 'problem-plan', 1],
      ['sort', 'problem-plan', 1],
      ['fill-blank', 'problem-plan', 1],
      ['multiple-choice', 'problem-plan', 1],
      ['multiple-choice', 'two-step-equation', 2],
      ['fill-blank', 'two-step-equation', 2],
      ['true-false', 'two-step-equation', 2],
      ['multiple-choice', 'two-step-equation', 2],
      ['multiple-choice', 'two-step-check', 3],
      ['fill-blank', 'two-step-check', 3],
      ['true-false', 'two-step-check', 3],
      ['multiple-choice', 'two-step-check', 3],
      ['multiple-choice', 'two-step-check', 3]
  ],
} as const;

const expectedWidgets = {
  'math-u05-l01-c1': {"type": "array-builder", "config": {"rows": 1, "columns": 18, "targetProduct": 72, "editable": true}},
  'math-u05-l01-c2': {"type": "array-builder", "config": {"rows": 4, "columns": 1, "targetProduct": 52, "editable": true}},
  'math-u05-l01-c3': {"type": "balance-scale", "config": {"task": "make-equal", "left": [{"id": "dividend", "label": "Dividend 875", "value": 875}], "right": [{"id": "q1", "label": "Group of 218", "value": 218}, {"id": "q2", "label": "Group of 218", "value": 218}, {"id": "q3", "label": "Group of 218", "value": 218}, {"id": "q4", "label": "Group of 218", "value": 218}, {"id": "rem", "label": "Left over 3", "value": 3}, {"id": "decoy", "label": "Extra 10", "value": 10}]}},
  'math-u05-l02-c1': {"type": "area-model-multiplier", "config": {"a": 3, "b": 24, "splitA": [3], "splitB": [20, 4], "targetProduct": 72}},
  'math-u05-l02-c3': {"type": "balance-scale", "config": {"task": "make-equal", "left": [{"id": "first-step", "label": "3 boxes of 24 = 72", "value": 72}], "right": [{"id": "used", "label": "17 used", "value": 17}, {"id": "left", "label": "55 left", "value": 55}, {"id": "decoy", "label": "Extra 5", "value": 5}]}},
} as const;

test('u05 is the exact validated 2-lesson unit', () => {
  expect(unit05Lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes }))).toEqual(expected);
  for (const lesson of unit05Lessons as Lesson[]) {
    expect(LessonSchema.safeParse(lesson).success).toBe(true);
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.unitId).toBe('math-u05');
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
