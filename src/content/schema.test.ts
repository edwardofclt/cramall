import { expect, test } from 'vitest';
import {
  InlineCheckSchema,
  LearnCardSchema,
  LessonSchema,
  NumberLineWidgetConfigSchema,
  QuizReferenceSchema,
  WidgetRefSchema,
  validateLesson,
  type Lesson,
  type Question,
} from './schema';

function q(id: string, over: Partial<Question> = {}): Question {
  return {
    id, type: 'multiple-choice', prompt: '2+2?',
    choices: [{ id: 'a', text: '4' }, { id: 'b', text: '5' }],
    correctChoiceId: 'a', explanation: 'Because 2+2=4.',
    conceptTag: 'adding', reviewCardId: 'math-u01-l01-c1', ...over,
  } as Question;
}
function makeLesson(): Lesson {
  return {
    id: 'math-u01-l01', unitId: 'math-u01', title: 'T', indicatorCodes: ['4.NR.1.1'],
    intro: [{ speaker: 'nutty', text: 'Hi!' }],
    learnCards: [{ id: 'math-u01-l01-c1', title: 'Card', blocks: [{ kind: 'text', text: 'Learn.' }] }],
    workedExample: { title: 'Try it', steps: ['Step one.'] },
    quiz: {
      passThreshold: 8,
      pool: Array.from({ length: 13 }, (_, i) => q(`math-u01-l01-q${String(i + 1).padStart(2, '0')}`)),
    },
  };
}

test('valid lesson parses and validates clean', () => {
  expect(LessonSchema.parse(makeLesson())).toBeTruthy();
  expect(validateLesson(makeLesson())).toEqual([]);
});
test('a learn card can include a self-check with a valid correct choice', () => {
  const card = LearnCardSchema.parse({
    id: 'math-u01-l01-c1',
    title: 'Card',
    blocks: [{ kind: 'text', text: 'Learn.' }],
    check: {
      prompt: 'Which number is greater?',
      choices: [{ id: 'ten', text: '10' }, { id: 'nine', text: '9' }],
      correctChoiceId: 'ten',
      explanation: 'Ten is one more than nine.',
    },
  });

  expect(card.check).toEqual({
    prompt: 'Which number is greater?',
    choices: [{ id: 'ten', text: '10' }, { id: 'nine', text: '9' }],
    correctChoiceId: 'ten',
    explanation: 'Ten is one more than nine.',
  });
});
test('a learn card preserves only the strict roller-coaster demo contract', () => {
  const base = {
    id: 'science-u01-l01-c1',
    title: 'Card',
    blocks: [{ kind: 'text', text: 'Learn.' }],
  };

  expect(LearnCardSchema.parse({
    ...base,
    demo: { type: 'roller-coaster', focus: 'speed-energy' },
  }).demo).toEqual({ type: 'roller-coaster', focus: 'speed-energy' });
  expect(() => LearnCardSchema.parse({
    ...base,
    demo: { type: 'roller-coaster', focus: 'speed-energy', autoplay: true },
  })).toThrow();
  expect(() => LearnCardSchema.parse({
    ...base,
    demo: { type: 'roller-coaster', focus: 'momentum' },
  })).toThrow();
  expect(() => LearnCardSchema.parse({
    ...base,
    demo: { type: 'collision-ramp', focus: 'collision' },
  })).toThrow();
});
test('an inline check rejects extra fields, invalid correct answers, and duplicate choices', () => {
  const check = {
    prompt: 'Which number is greater?',
    choices: [{ id: 'ten', text: '10' }, { id: 'nine', text: '9' }],
    correctChoiceId: 'ten',
    explanation: 'Ten is one more than nine.',
  };

  expect(() => InlineCheckSchema.parse({ ...check, extra: true })).toThrow();
  expect(() => InlineCheckSchema.parse({ ...check, correctChoiceId: 'eight' })).toThrow();
  expect(() => InlineCheckSchema.parse({
    ...check,
    choices: [{ id: 'ten', text: '10' }, { id: 'ten', text: '10' }],
  })).toThrow();
  expect(() => InlineCheckSchema.parse({ ...check, choices: [check.choices[0]] })).toThrow();
});
test('lesson schema preserves the shared pass threshold of 8', () => {
  const lesson = makeLesson();
  const invalid = { ...lesson, quiz: { ...lesson.quiz, passThreshold: 7 } };

  expect(LessonSchema.safeParse(invalid).success).toBe(false);
});
test('a quiz reference is optional, requires visible text, and rejects authoring typos', () => {
  const lesson = makeLesson();
  lesson.quiz.reference = { title: 'Read this passage', text: 'A complete reference passage.' };

  expect(LessonSchema.parse(lesson).quiz.reference).toEqual(lesson.quiz.reference);
  expect(() => QuizReferenceSchema.parse({
    title: 'Read this passage', text: 'A complete reference passage.', extra: true,
  })).toThrow();
  expect(() => QuizReferenceSchema.parse({ title: 'Read this passage', text: '' })).toThrow();
});
test('keeps an optional worked source passage as distinct authored material', () => {
  const lesson = makeLesson();
  lesson.workedExample.passage = {
    title: 'A short source passage',
    text: 'Readers can refer back to this source while they practice.',
  };

  const parsed = LessonSchema.parse(lesson);

  expect(parsed.workedExample.passage).toEqual({
    title: 'A short source passage',
    text: 'Readers can refer back to this source while they practice.',
  });
});
test('bad reviewCardId is reported', () => {
  const l = makeLesson();
  l.quiz.pool[0]!.reviewCardId = 'nope';
  expect(validateLesson(l).join()).toMatch(/nope/);
});
test('pool under 13 is reported', () => {
  const l = makeLesson();
  l.quiz.pool = l.quiz.pool.slice(0, 12);
  expect(validateLesson(l).join()).toMatch(/13/);
});
test('multiple-choice correctChoiceId must be a real choice', () => {
  const l = makeLesson();
  (l.quiz.pool[0] as any).correctChoiceId = 'zzz';
  expect(validateLesson(l).length).toBeGreaterThan(0);
});
test('unknown widget type is reported', () => {
  const l = makeLesson();
  (l.learnCards[0] as { widget?: unknown }).widget = { type: 'made-up', config: {} };
  expect(validateLesson(l).join()).toMatch(/made-up/);
});
test('duplicate question ids are reported', () => {
  const l = makeLesson();
  l.quiz.pool[1]!.id = l.quiz.pool[0]!.id;
  expect(validateLesson(l).join()).toMatch(/duplicate/i);
});
test('duplicate learn card ids are reported', () => {
  const l = makeLesson();
  l.learnCards.push({ id: 'math-u01-l01-c1', title: 'Copy', blocks: [{ kind: 'text', text: 'Again.' }] });
  expect(validateLesson(l).join()).toMatch(/duplicate learn card/i);
});
test('sort correctOrder with duplicates is reported', () => {
  const l = makeLesson();
  l.quiz.pool[0] = {
    id: 'math-u01-l01-q01', type: 'sort', prompt: 'Order these',
    items: [{ id: 'a', text: '1' }, { id: 'b', text: '2' }],
    correctOrder: ['a', 'a'],
    explanation: 'x', conceptTag: 'adding', reviewCardId: 'math-u01-l01-c1',
  };
  expect(validateLesson(l).join()).toMatch(/permutation/);
});

test.each([
  ['lesson', (lesson: Lesson) => { lesson.id = 'Math U1 Lesson 1'; }],
  ['unit reference', (lesson: Lesson) => { lesson.unitId = 'math-unit-one'; }],
  ['learn card', (lesson: Lesson) => { lesson.learnCards[0]!.id = 'card one'; }],
  ['question', (lesson: Lesson) => { lesson.quiz.pool[0]!.id = 'question one'; }],
])('rejects a non-canonical %s id', (_label, mutate) => {
  const lesson = makeLesson();
  mutate(lesson);
  expect(validateLesson(lesson).join('\n')).toMatch(/id|invalid/i);
});

test('card and question ids must be owned by their lesson id', () => {
  const lesson = makeLesson();
  lesson.learnCards[0]!.id = 'math-u02-l01-c1';
  lesson.quiz.pool[0]!.id = 'math-u02-l01-q01';

  const errors = validateLesson(lesson).join('\n');

  expect(errors).toMatch(/card.*belong/i);
  expect(errors).toMatch(/question.*belong/i);
});

test('multiple-choice rejects duplicate choice ids and normalized visible answers', () => {
  const lesson = makeLesson();
  const question = lesson.quiz.pool[0];
  if (question?.type !== 'multiple-choice') throw new Error('fixture must be multiple-choice');
  question.choices = [
    { id: 'same', text: '1,000' },
    { id: 'same', text: '1000' },
  ];
  question.correctChoiceId = 'same';

  const errors = validateLesson(lesson).join('\n');

  expect(errors).toMatch(/duplicate choice id/i);
  expect(errors).toMatch(/duplicate choice text/i);
});

test('multiple-choice rejects visible answers that differ only by spacing around plus signs', () => {
  const lesson = makeLesson();
  const question = lesson.quiz.pool[0];
  if (question?.type !== 'multiple-choice') throw new Error('fixture must be multiple-choice');
  question.choices = [
    { id: 'spaced', text: '300 + 40' },
    { id: 'compact', text: '300+40' },
  ];
  question.correctChoiceId = 'spaced';

  expect(validateLesson(lesson).join('\n')).toMatch(/duplicate choice text/i);
});

test('sort rejects duplicate item ids and normalized visible item text', () => {
  const lesson = makeLesson();
  lesson.quiz.pool[0] = {
    id: 'math-u01-l01-q01',
    type: 'sort',
    prompt: 'Order these',
    items: [
      { id: 'same', text: 'Twelve' },
      { id: 'same', text: ' twelve ' },
    ],
    correctOrder: ['same', 'same'],
    explanation: 'Order by value.',
    conceptTag: 'adding',
    reviewCardId: 'math-u01-l01-c1',
  };

  const errors = validateLesson(lesson).join('\n');

  expect(errors).toMatch(/duplicate sort item id/i);
  expect(errors).toMatch(/duplicate sort item text/i);
});

test('sort rejects visible items that differ only by spacing around plus signs', () => {
  const lesson = makeLesson();
  lesson.quiz.pool[0] = {
    id: 'math-u01-l01-q01',
    type: 'sort',
    prompt: 'Order these',
    items: [
      { id: 'spaced', text: '300 + 40' },
      { id: 'compact', text: '300+40' },
    ],
    correctOrder: ['spaced', 'compact'],
    explanation: 'Order by value.',
    conceptTag: 'adding',
    reviewCardId: 'math-u01-l01-c1',
  };

  expect(validateLesson(lesson).join('\n')).toMatch(/duplicate sort item text/i);
});

test('place-value widget config rejects invalid periods and targets outside its columns', () => {
  expect(() => WidgetRefSchema.parse({
    type: 'place-value-builder',
    config: { periods: 4 },
  })).toThrow();
  expect(() => WidgetRefSchema.parse({
    type: 'place-value-builder',
    config: { periods: 2, target: 1_000_000 },
  })).toThrow();
});

test('number-line widget config enforces ascending bounds and marker ranges', () => {
  expect(() => WidgetRefSchema.parse({
    type: 'number-line-compare',
    config: { min: 10, max: 10, a: 10, b: 10 },
  })).toThrow();
  expect(() => WidgetRefSchema.parse({
    type: 'number-line-compare',
    config: { min: 0, max: 10, a: -1, b: 5 },
  })).toThrow();
});

test('number-line fractional step must be positive and align both marker values', () => {
  expect(WidgetRefSchema.parse({
    type: 'number-line-compare',
    config: { min: 0, max: 1, a: 0.25, b: 0.75, step: 0.25 },
  })).toBeTruthy();
  expect(() => WidgetRefSchema.parse({
    type: 'number-line-compare',
    config: { min: 0, max: 1, a: 0.3, b: 0.75, step: 0.25 },
  })).toThrow();
});

test('number-line fraction display requires an aligned denominator grid', () => {
  expect(NumberLineWidgetConfigSchema.safeParse({
    min: 0, max: 1, a: 0.25, b: 0.75, step: 0.25, display: 'fraction', denominator: 4,
  }).success).toBe(true);
  expect(NumberLineWidgetConfigSchema.safeParse({
    min: 0, max: 1, a: 0.3, b: 0.75, step: 0.25, display: 'fraction', denominator: 4,
  }).success).toBe(false);
  expect(NumberLineWidgetConfigSchema.safeParse({
    min: 0, max: 1, a: 0.5, b: 0.75, step: 0.5, display: 'fraction', denominator: 4,
  }).success).toBe(false);
});

test('widget configs reject unknown keys instead of silently accepting author typos', () => {
  expect(() => WidgetRefSchema.parse({
    type: 'place-value-builder',
    config: { periods: 3, start: 482 },
  })).toThrow();
});
