import { expect, test } from 'vitest';
import { LessonSchema, WidgetRefSchema, validateLesson, type Lesson } from '../schema';
import { unit09Lessons } from './u09';

const expected = [
  { id: 'math-u09-l01', title: 'Money Collections and Purchases', indicatorCodes: ['4.MGSR.2.1'] },
  { id: 'math-u09-l02', title: 'Elapsed, Start, and End Time', indicatorCodes: ['4.MGSR.2.2'] },
  { id: 'math-u09-l03', title: 'Measure to the Nearest Quarter Inch', indicatorCodes: ['4.MGSR.2.3'] },
  { id: 'math-u09-l04', title: 'Measure Customary and Metric Weight', indicatorCodes: ['4.MGSR.2.4'] },
  { id: 'math-u09-l05', title: 'Convert Larger Customary Units to Smaller Units', indicatorCodes: ['4.MGSR.2.5'] },
] as const;

const expectedCards = {
  'math-u09-l01': [['math-u09-l01-c1', 'Find Coin and Bill Values', 'money-values'], ['math-u09-l01-c2', 'Compare a Total with a Price', 'money-comparison'], ['math-u09-l01-c3', 'Justify a Purchase Decision', 'purchase-decision']],
  'math-u09-l02': [['math-u09-l02-c1', 'Read Start and End Times', 'clock-times'], ['math-u09-l02-c2', 'Find Elapsed Time', 'elapsed-time'], ['math-u09-l02-c3', 'Find a Missing Start or End Time', 'missing-time']],
  'math-u09-l03': [['math-u09-l03-c1', 'Read Quarter-Inch Marks', 'quarter-inch-marks'], ['math-u09-l03-c2', 'Choose the Nearest Quarter Inch', 'nearest-quarter-inch'], ['math-u09-l03-c3', 'Use a Quarter-Inch Measurement', 'measurement-application']],
  'math-u09-l04': [['math-u09-l04-c1', 'Name Customary and Metric Weight Units', 'weight-units'], ['math-u09-l04-c2', 'Choose a Sensible Unit', 'weight-unit-choice'], ['math-u09-l04-c3', 'Record the Nearest Whole Unit', 'whole-unit-weight']],
  'math-u09-l05': [['math-u09-l05-c1', 'Use a Given Unit Equivalence', 'unit-equivalence'], ['math-u09-l05-c2', 'Multiply from Larger to Smaller Units', 'larger-to-smaller'], ['math-u09-l05-c3', 'Apply a Conversion in Context', 'conversion-application']],
} as const;

const expectedRoutes = {
  'math-u09-l01': [
      ['multiple-choice', 'money-values', 1],
      ['fill-blank', 'money-values', 1],
      ['true-false', 'money-values', 1],
      ['multiple-choice', 'money-values', 1],
      ['multiple-choice', 'money-comparison', 2],
      ['fill-blank', 'money-comparison', 2],
      ['true-false', 'money-comparison', 2],
      ['multiple-choice', 'money-comparison', 2],
      ['multiple-choice', 'purchase-decision', 3],
      ['fill-blank', 'purchase-decision', 3],
      ['true-false', 'purchase-decision', 3],
      ['multiple-choice', 'purchase-decision', 3],
      ['multiple-choice', 'purchase-decision', 3]
  ],
  'math-u09-l02': [
      ['multiple-choice', 'clock-times', 1],
      ['fill-blank', 'clock-times', 1],
      ['true-false', 'clock-times', 1],
      ['multiple-choice', 'clock-times', 1],
      ['multiple-choice', 'elapsed-time', 2],
      ['fill-blank', 'elapsed-time', 2],
      ['true-false', 'elapsed-time', 2],
      ['sort', 'elapsed-time', 2],
      ['multiple-choice', 'missing-time', 3],
      ['fill-blank', 'missing-time', 3],
      ['true-false', 'missing-time', 3],
      ['multiple-choice', 'missing-time', 3],
      ['fill-blank', 'missing-time', 3]
  ],
  'math-u09-l03': [
      ['multiple-choice', 'quarter-inch-marks', 1],
      ['fill-blank', 'quarter-inch-marks', 1],
      ['true-false', 'quarter-inch-marks', 1],
      ['sort', 'quarter-inch-marks', 1],
      ['multiple-choice', 'nearest-quarter-inch', 2],
      ['fill-blank', 'nearest-quarter-inch', 2],
      ['true-false', 'nearest-quarter-inch', 2],
      ['multiple-choice', 'nearest-quarter-inch', 2],
      ['multiple-choice', 'measurement-application', 3],
      ['fill-blank', 'measurement-application', 3],
      ['true-false', 'measurement-application', 3],
      ['multiple-choice', 'measurement-application', 3],
      ['multiple-choice', 'measurement-application', 3]
  ],
  'math-u09-l04': [
      ['multiple-choice', 'weight-units', 1],
      ['fill-blank', 'weight-units', 1],
      ['true-false', 'weight-units', 1],
      ['multiple-choice', 'weight-units', 1],
      ['multiple-choice', 'weight-unit-choice', 2],
      ['fill-blank', 'weight-unit-choice', 2],
      ['true-false', 'weight-unit-choice', 2],
      ['multiple-choice', 'weight-unit-choice', 2],
      ['multiple-choice', 'whole-unit-weight', 3],
      ['fill-blank', 'whole-unit-weight', 3],
      ['true-false', 'whole-unit-weight', 3],
      ['multiple-choice', 'whole-unit-weight', 3],
      ['multiple-choice', 'whole-unit-weight', 3]
  ],
  'math-u09-l05': [
      ['multiple-choice', 'unit-equivalence', 1],
      ['fill-blank', 'unit-equivalence', 1],
      ['true-false', 'unit-equivalence', 1],
      ['multiple-choice', 'unit-equivalence', 1],
      ['multiple-choice', 'larger-to-smaller', 2],
      ['fill-blank', 'larger-to-smaller', 2],
      ['sort', 'larger-to-smaller', 2],
      ['multiple-choice', 'larger-to-smaller', 2],
      ['multiple-choice', 'conversion-application', 3],
      ['fill-blank', 'conversion-application', 3],
      ['true-false', 'conversion-application', 3],
      ['multiple-choice', 'conversion-application', 3],
      ['multiple-choice', 'conversion-application', 3]
  ],
} as const;

const expectedWidgets = {
  'math-u09-l01-c1': {"type": "money-counter", "config": {"targetCents": 635, "denominations": [1, 5, 10, 25, 100]}},
  'math-u09-l01-c2': {"type": "balance-scale", "config": {"task": "compare", "left": [{"id": "collection", "label": "Collection $6.35", "value": 6.35}], "right": [{"id": "price", "label": "Price tag $6.20", "value": 6.2}]}},
  'math-u09-l01-c3': {"type": "money-counter", "config": {"targetCents": 62, "denominations": [1, 5, 10, 25]}},
  'math-u09-l02-c1': {"type": "clock-elapsed-time", "config": {"mode": "set-time", "targetTime": "09:45", "minuteStep": 5}},
  'math-u09-l02-c2': {"type": "clock-elapsed-time", "config": {"mode": "set-time", "targetTime": "10:05", "minuteStep": 5}},
  'math-u09-l02-c3': {"type": "clock-elapsed-time", "config": {"mode": "set-time", "targetTime": "13:45", "minuteStep": 5}},
  'math-u09-l03-c1': {"type": "quarter-inch-ruler", "config": {"lengthInches": 3, "targetInches": 2.25, "startInches": 0}},
  'math-u09-l03-c2': {"type": "quarter-inch-ruler", "config": {"lengthInches": 5, "targetInches": 4.75, "startInches": 0}},
  'math-u09-l03-c3': {"type": "number-line-compare", "config": {"min": 2, "max": 4, "a": 3.25, "b": 2.75, "step": 0.25, "display": "fraction", "denominator": 4}},
  'math-u09-l04-c1': {"type": "balance-scale", "config": {"task": "make-equal", "left": [{"id": "marker", "label": "Marker (12 grams)", "value": 12}], "right": [{"id": "c1", "label": "1 gram clip", "value": 1}, {"id": "c2", "label": "1 gram clip", "value": 1}, {"id": "c3", "label": "1 gram clip", "value": 1}, {"id": "c4", "label": "1 gram clip", "value": 1}, {"id": "c5", "label": "1 gram clip", "value": 1}, {"id": "c6", "label": "1 gram clip", "value": 1}, {"id": "c7", "label": "1 gram clip", "value": 1}, {"id": "c8", "label": "1 gram clip", "value": 1}, {"id": "c9", "label": "1 gram clip", "value": 1}, {"id": "c10", "label": "1 gram clip", "value": 1}, {"id": "c11", "label": "1 gram clip", "value": 1}, {"id": "c12", "label": "1 gram clip", "value": 1}]}},
  'math-u09-l04-c2': {"type": "data-plot-builder", "config": {"kind": "bar", "prompt": "Set each bar to about how many grams the object weighs.", "categories": ["Paper clip", "Pencil", "Apple"], "target": {"Paper clip": 1, "Pencil": 6, "Apple": 30}}},
  'math-u09-l04-c3': {"type": "number-line-compare", "config": {"min": 2, "max": 4, "a": 2.6, "b": 3, "step": 0.2, "display": "number"}},
  'math-u09-l05-c1': {"type": "balance-scale", "config": {"left": [{"id": "three-feet", "label": "3 feet", "value": 36}], "right": [{"id": "thirty-six-inches", "label": "36 inches", "value": 36}], "task": "compare"}},
  'math-u09-l05-c2': {"type": "array-builder", "config": {"rows": 1, "columns": 3, "targetProduct": 15, "editable": true}},
  'math-u09-l05-c3': {"type": "area-model-multiplier", "config": {"a": 4, "b": 16, "splitA": [4], "splitB": [10, 6], "targetProduct": 64}},
} as const;

test('u09 is the exact validated 5-lesson unit', () => {
  expect(unit09Lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes }))).toEqual(expected);
  for (const lesson of unit09Lessons as Lesson[]) {
    expect(LessonSchema.safeParse(lesson).success).toBe(true);
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.unitId).toBe('math-u09');
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
