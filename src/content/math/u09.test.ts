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
  'math-u09-l01-c1': { type: 'money-counter', config: { targetCents: 635, denominations: [1, 5, 10, 25, 100], taskPrompt: 'Show $6.35 with coins and bills.' } },
  'math-u09-l02-c2': { type: 'clock-elapsed-time', config: { mode: 'elapsed', startTime: '09:00', elapsedMinutes: 35, minuteStep: 5, jumpMinutes: [5, 10, 15] } },
  'math-u09-l03-c2': { type: 'quarter-inch-ruler', config: { lengthInches: 5, targetInches: 4.75, startInches: 0, taskPrompt: 'Place the object endpoint at 4¾ inches.' } },
  'math-u09-l05-c1': { type: 'balance-scale', config: { left: [{ id: 'three-feet', label: '3 feet', value: 36 }], right: [{ id: 'thirty-six-inches', label: '36 inches', value: 36 }], task: 'compare', lengthModel: { feet: 3, inches: 36 } } },
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
      if (card.id === 'math-u09-l01-c1' || card.id === 'math-u09-l02-c2' || card.id === 'math-u09-l03-c2') {
        expect(card.widgetCoach?.reactions.complete.text).toBeTruthy();
      }
      if (card.id === 'math-u09-l05-c1') {
        expect(card.widgetCoach?.intro).toHaveLength(2);
        expect(card.widgetCoach?.intro[0].text).toContain('3 feet');
        expect(card.widgetCoach?.reactions.complete.text).toContain('36');
      }
    }
  }
});
