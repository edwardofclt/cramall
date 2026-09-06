import { expect, test } from 'vitest';
import { LessonSchema, WidgetRefSchema, validateLesson, type Lesson } from '../schema';
import { unit12Lessons } from './u12';

const expected = [
  { id: 'math-u12-l01', title: 'Collect and Organize Data', indicatorCodes: ['4.DPSR.1.1'] },
  { id: 'math-u12-l02', title: 'Solve Problems with Graphs and Tables', indicatorCodes: ['4.DPSR.1.2'] },
  { id: 'math-u12-l03', title: 'Certain, Possible, and Impossible', indicatorCodes: ['4.DPSR.2.1'] },
] as const;

const expectedCards = {
  'math-u12-l01': [['math-u12-l01-c1', 'Tell Numerical from Categorical Data', 'data-types'], ['math-u12-l01-c2', 'Choose a Table, Bar Graph, or Dot Plot', 'data-display'], ['math-u12-l01-c3', 'Use an Exact Scale, Title, and Labels', 'graph-conventions']],
  'math-u12-l02': [['math-u12-l02-c1', 'Read a Table or Graph', 'read-data'], ['math-u12-l02-c2', 'Choose the One-Step Operation', 'data-operation'], ['math-u12-l02-c3', 'Solve with Whole or Fractional Data', 'fractional-data']],
  'math-u12-l03': [['math-u12-l03-c1', 'List Every Possible Outcome', 'possible-outcomes'], ['math-u12-l03-c2', 'Connect an Event to Its Outcomes', 'event-outcomes'], ['math-u12-l03-c3', 'Classify the Probability', 'probability-language']],
} as const;

const expectedRoutes = {
  'math-u12-l01': [
      ['multiple-choice', 'data-types', 1],
      ['fill-blank', 'data-types', 1],
      ['true-false', 'data-types', 1],
      ['multiple-choice', 'data-types', 1],
      ['multiple-choice', 'data-display', 2],
      ['fill-blank', 'data-display', 2],
      ['true-false', 'data-display', 2],
      ['multiple-choice', 'data-display', 2],
      ['multiple-choice', 'graph-conventions', 3],
      ['fill-blank', 'graph-conventions', 3],
      ['true-false', 'graph-conventions', 3],
      ['multiple-choice', 'graph-conventions', 3],
      ['multiple-choice', 'graph-conventions', 3]
  ],
  'math-u12-l02': [
      ['multiple-choice', 'read-data', 1],
      ['fill-blank', 'read-data', 1],
      ['true-false', 'read-data', 1],
      ['multiple-choice', 'read-data', 1],
      ['multiple-choice', 'data-operation', 2],
      ['fill-blank', 'data-operation', 2],
      ['true-false', 'data-operation', 2],
      ['multiple-choice', 'data-operation', 2],
      ['multiple-choice', 'fractional-data', 3],
      ['fill-blank', 'fractional-data', 3],
      ['true-false', 'fractional-data', 3],
      ['multiple-choice', 'fractional-data', 3],
      ['multiple-choice', 'fractional-data', 3]
  ],
  'math-u12-l03': [
      ['multiple-choice', 'possible-outcomes', 1],
      ['fill-blank', 'possible-outcomes', 1],
      ['true-false', 'possible-outcomes', 1],
      ['multiple-choice', 'possible-outcomes', 1],
      ['multiple-choice', 'event-outcomes', 2],
      ['fill-blank', 'event-outcomes', 2],
      ['true-false', 'event-outcomes', 2],
      ['multiple-choice', 'event-outcomes', 2],
      ['multiple-choice', 'probability-language', 3],
      ['fill-blank', 'probability-language', 3],
      ['true-false', 'probability-language', 3],
      ['multiple-choice', 'probability-language', 3],
      ['multiple-choice', 'probability-language', 3]
  ],
} as const;

const expectedWidgets = {
  'math-u12-l01-c1': {"type": "data-plot-builder", "config": {"kind": "dot", "prompt": "Plot the five seedling heights in centimeters.", "categories": ["4", "5", "6", "8"], "target": {"4": 1, "5": 2, "6": 1, "8": 1}}},
  'math-u12-l01-c2': {"type": "data-plot-builder", "config": {"kind": "bar", "prompt": "Build the class pet survey bar graph.", "categories": ["dog", "cat", "fish"], "target": {"dog": 8, "cat": 6, "fish": 4}}},
  'math-u12-l01-c3': {"type": "data-plot-builder", "config": {"kind": "bar", "prompt": "Build the reading-minutes graph with an evenly spaced scale.", "categories": ["Monday", "Tuesday", "Wednesday"], "target": {"Monday": 20, "Tuesday": 15, "Wednesday": 10}}},
  'math-u12-l02-c1': {"type": "data-plot-builder", "config": {"kind": "bar", "prompt": "Rebuild the vote graph from the scale: blue 16 votes, green 10 votes.", "categories": ["Blue", "Green"], "target": {"Blue": 16, "Green": 10}}},
  'math-u12-l02-c2': {"type": "number-line-compare", "config": {"min": 0, "max": 20, "a": 16, "b": 10, "step": 2}},
  'math-u12-l02-c3': {"type": "fraction-models", "config": {"mode": "both", "denominator": 4, "numerator": 1, "target": {"numerator": 3, "denominator": 4}, "allowEquivalent": false}},
  'math-u12-l03-c1': {"type": "probability-spinner", "config": {"segments": [{"id": "red", "label": "Red"}, {"id": "blue", "label": "Blue"}, {"id": "green", "label": "Green"}], "trials": 6}},
  'math-u12-l03-c2': {"type": "probability-spinner", "config": {"segments": [{"id": "red", "label": "Red", "weight": 2, "color": "#ef4444"}, {"id": "blue", "label": "Blue", "weight": 1, "color": "#3b82f6"}, {"id": "green", "label": "Green", "weight": 1, "color": "#22c55e"}], "trials": 8, "targetOutcomeId": "red"}},
  'math-u12-l03-c3': {"type": "probability-spinner", "config": {"segments": [{"id": "red", "label": "Red", "weight": 3}, {"id": "blue", "label": "Blue"}], "trials": 8, "targetOutcomeId": "blue"}},
} as const;

test('u12 is the exact validated 3-lesson unit', () => {
  expect(unit12Lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes }))).toEqual(expected);
  for (const lesson of unit12Lessons as Lesson[]) {
    expect(LessonSchema.safeParse(lesson).success).toBe(true);
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.unitId).toBe('math-u12');
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

test('u12 fractional-data fill blank requires an eighths answer', () => {
  const lesson = unit12Lessons.find(({ id }) => id === 'math-u12-l02');
  const question = lesson?.quiz.pool.find(({ id }) => id === 'math-u12-l02-q10');

  expect(question).toMatchObject({
    type: 'fill-blank',
    prompt: 'Give the answer as a fraction with denominator 8: A dot plot includes 7/8 mile and 3/8 mile. Their difference is ___ mile.',
    acceptedAnswers: ['4/8'],
  });
});
