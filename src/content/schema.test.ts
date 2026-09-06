import { expect, test } from 'vitest';
import {
  InlineCheckSchema,
  ArrayBuilderWidgetConfigSchema,
  AreaModelMultiplierWidgetConfigSchema,
  ClockElapsedTimeWidgetConfigSchema,
  DataPlotBuilderWidgetConfigSchema,
  FractionModelsWidgetConfigSchema,
  LearnCardSchema,
  LessonSchema,
  ProbabilitySpinnerWidgetConfigSchema,
  NumberLineWidgetConfigSchema,
  QuizReferenceSchema,
  WIDGET_TYPES,
  WidgetRefSchema,
  WidgetCoachSchema,
  StoryElementsMapperWidgetConfigSchema,
  ThemeEvidenceCollectorWidgetConfigSchema,
  CentralIdeaOrganizerWidgetConfigSchema,
  SummaryBuilderWidgetConfigSchema,
  TextStructureSorterWidgetConfigSchema,
  FigurativeLanguageMatcherWidgetConfigSchema,
  SourceCredibilityCheckerWidgetConfigSchema,
  validateLesson,
  type Lesson,
  type Question,
} from './schema';
import { validWidgetRefByType } from '../test/widgetFixtures';

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
test('lesson schema preserves optional cross-cutting expectation codes', () => {
  const lesson = {
    ...makeLesson(),
    crossCuttingExpectationCodes: [
      'ELA.4.OE.1', 'ELA.4.OE.2', 'ELA.4.OE.3',
      'ELA.4.OE.4', 'ELA.4.OE.5', 'ELA.4.OE.6',
    ],
  };

  expect(LessonSchema.parse(lesson).crossCuttingExpectationCodes).toEqual(
    lesson.crossCuttingExpectationCodes,
  );
});
test.each(WIDGET_TYPES)('%s accepts its fixture and rejects unknown config keys', (type) => {
  const valid = validWidgetRefByType[type];
  expect(WidgetRefSchema.safeParse(valid).success).toBe(true);
  expect(WidgetRefSchema.safeParse({
    ...valid,
    config: { ...valid.config, unexpected: true },
  }).success).toBe(false);
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
test('a coached learn card preserves the strict intro and reaction contract', () => {
  const widgetCoach = {
    intro: [
      { speaker: 'guide', text: 'Connect the lesson idea to this model.', pose: 'talk' },
      { speaker: 'kid', text: 'I will change one thing and compare.' },
    ],
    reactions: {
      strategy: { text: 'Change one condition at a time.', pose: 'think' },
      retry: { text: 'Use the visible evidence and revise.', pose: 'oops' },
      milestone: { text: 'That intermediate model is useful.', pose: 'talk' },
      complete: { text: 'You used the model to explain the lesson idea.', pose: 'cheer' },
    },
  };

  expect(LearnCardSchema.parse({
    id: 'math-u01-l01-c1',
    title: 'Card',
    blocks: [{ kind: 'text', text: 'Learn.' }],
    widget: { type: 'place-value-builder', config: { target: 42 } },
    widgetCoach,
  }).widgetCoach).toEqual(widgetCoach);
  expect(WidgetCoachSchema.parse(widgetCoach)).toEqual(widgetCoach);
});

test('widget coaching requires two or three lines and guide-only poses', () => {
  const base = {
    intro: [{ speaker: 'guide', text: 'Try the model.' }, { speaker: 'kid', text: 'Okay!' }],
    reactions: { complete: { text: 'Nice work!' } },
  };

  expect(() => WidgetCoachSchema.parse({ ...base, intro: [{ speaker: 'guide', text: 'Only one.' }] })).toThrow();
  expect(() => WidgetCoachSchema.parse({
    ...base,
    intro: [
      { speaker: 'guide', text: 'One.' },
      { speaker: 'kid', text: 'Two.', pose: 'talk' },
      { speaker: 'guide', text: 'Three.' },
      { speaker: 'kid', text: 'Four.' },
    ],
  })).toThrow();
  expect(() => WidgetCoachSchema.parse({
    ...base,
    intro: [{ speaker: 'kid', text: 'I have a pose.', pose: 'oops' }, { speaker: 'guide', text: 'Try it.' }],
  })).toThrow();
});

test('widget coaching requires a widget and cannot duplicate card dialogue', () => {
  const widgetCoach = {
    intro: [
      { speaker: 'guide', text: 'Connect the lesson idea to this model.', pose: 'talk' },
      { speaker: 'kid', text: 'I will change one thing and compare.' },
    ],
    reactions: { complete: { text: 'You used the model.', pose: 'cheer' } },
  };
  const card = {
    id: 'math-u01-l01-c1',
    title: 'Card',
    blocks: [{ kind: 'text', text: 'Learn.' }],
    widgetCoach,
  };

  const withoutWidget = LearnCardSchema.safeParse(card);
  expect(withoutWidget.success).toBe(false);
  if (withoutWidget.success) throw new Error('expected widgetCoach without widget to fail');
  expect(withoutWidget.error.issues.some((issue) => issue.path.join('.') === 'widgetCoach')).toBe(true);

  const withBoth = LearnCardSchema.safeParse({
    ...card,
    widget: { type: 'place-value-builder', config: { target: 42 } },
    dialogue: [{ speaker: 'nutty', text: 'A separate card dialogue.' }],
  });
  expect(withBoth.success).toBe(false);
  if (withBoth.success) throw new Error('expected dialogue and widgetCoach to fail together');
  expect(withBoth.error.issues.some((issue) => issue.path.join('.') === 'widgetCoach')).toBe(true);
  expect(withBoth.error.issues.some((issue) => issue.path.join('.') === 'dialogue')).toBe(true);
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

test('Math manipulative configs accept lesson prompts and the new task contracts', () => {
  expect(FractionModelsWidgetConfigSchema.parse({
    mode: 'both', denominator: 4, task: 'equivalent', wholeCount: 2,
    comparisonTarget: { numerator: 1, denominator: 2 }, taskPrompt: 'Build an equivalent fraction.',
  })).toMatchObject({ task: 'equivalent', wholeCount: 2 });
  expect(AreaModelMultiplierWidgetConfigSchema.parse({
    a: 23, b: 4, revealMode: 'progressive',
  }).revealMode).toBe('progressive');
  expect(ArrayBuilderWidgetConfigSchema.parse({
    rows: 2, columns: 3, task: 'division', dividend: 12, divisor: 2,
    targetProduct: 6, taskPrompt: 'Make equal groups.',
  })).toMatchObject({ task: 'division', dividend: 12, divisor: 2 });
  expect(ClockElapsedTimeWidgetConfigSchema.parse({
    mode: 'elapsed', startTime: '09:00', elapsedMinutes: 30, jumpMinutes: [5, 10, 15],
  })).toMatchObject({ jumpMinutes: [5, 10, 15] });
  expect(DataPlotBuilderWidgetConfigSchema.parse({
    kind: 'bar', prompt: 'Build it', categories: ['A'], target: { A: 3 },
    sourceData: { A: 3 }, displayChoices: ['bar', 'dot'], taskPrompt: 'Show the data.',
  })).toMatchObject({ sourceData: { A: 3 }, displayChoices: ['bar', 'dot'] });
  expect(ProbabilitySpinnerWidgetConfigSchema.parse({
    segments: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }],
    eventQuestion: { eventLabel: 'a', classification: 'possible' },
  }).eventQuestion?.classification).toBe('possible');
});

test('Math manipulative contracts reject unreachable or contradictory authored tasks', () => {
  expect(FractionModelsWidgetConfigSchema.safeParse({
    mode: 'both', denominator: 3, task: 'equivalent',
    comparisonTarget: { numerator: 2, denominator: 5 },
  }).success).toBe(false);
  expect(ArrayBuilderWidgetConfigSchema.safeParse({
    rows: 2, columns: 3, task: 'division', dividend: 13, divisor: 2,
  }).success).toBe(false);
  expect(AreaModelMultiplierWidgetConfigSchema.safeParse({
    a: 2, b: 3, revealMode: 'instant',
  }).success).toBe(false);
  expect(DataPlotBuilderWidgetConfigSchema.safeParse({
    kind: 'bar', prompt: 'Build it', categories: ['A'], target: { A: 3 }, sourceData: { A: 2 },
  }).success).toBe(false);
  expect(ProbabilitySpinnerWidgetConfigSchema.safeParse({
    segments: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }],
    eventQuestion: { eventLabel: 'missing', classification: 'possible' },
  }).success).toBe(false);
  expect(WidgetRefSchema.safeParse({
    type: 'data-plot-builder',
    config: { kind: 'bar', prompt: 'Build it', categories: ['A'], target: { A: 3 }, sourceData: { A: 2 } },
  }).success).toBe(false);
});

test('ProbabilitySpinner reserves event sentinels so they cannot collide with segment ids', () => {
  expect(ProbabilitySpinnerWidgetConfigSchema.safeParse({
    segments: [{ id: 'all', label: 'All' }, { id: 'red', label: 'Red' }],
    eventQuestion: { eventLabel: 'all', classification: 'certain' },
  }).success).toBe(false);
  expect(ProbabilitySpinnerWidgetConfigSchema.safeParse({
    segments: [{ id: 'none', label: 'None' }, { id: 'blue', label: 'Blue' }],
    eventQuestion: { eventLabel: 'none', classification: 'impossible' },
  }).success).toBe(false);
});

test('Reading source-based contracts reject incomplete story choices and unknown fields', () => {
  const production = {
    textTitle: 'Story',
    fields: ['character', 'setting'],
    source: { title: 'Story', text: 'Ava waits.' },
    choices: [{ id: 'ava', text: 'Ava', field: 'character' }, { id: 'park', text: 'Park', field: 'setting' }],
    answerChoiceIds: { character: 'missing', setting: 'park' },
  };

  expect(StoryElementsMapperWidgetConfigSchema.safeParse({ ...production, answerChoiceIds: { character: 'ava', setting: 'park' } }).success).toBe(true);
  expect(StoryElementsMapperWidgetConfigSchema.safeParse({ ...production, source: undefined }).success).toBe(false);
  expect(StoryElementsMapperWidgetConfigSchema.safeParse({ ...production, answerChoiceIds: { character: 'ava', setting: 'park' }, choices: [{ id: 'ava', text: 'Ava', field: 'character' }, { id: 'ava', text: 'Ava again', field: 'character' }] }).success).toBe(false);
  expect(StoryElementsMapperWidgetConfigSchema.safeParse({ ...production, answerChoiceIds: { character: 'ava', setting: 'park' }, unexpected: true }).success).toBe(false);
});

test('Reading evidence quotes must occur in visible source with case-preserving whitespace matching', () => {
  const source = { title: 'Garden', text: 'Mateo gives a row\n to Ana. Fish shelter.' };
  const evidence = [{ id: 'share', text: 'Mateo shares.', supports: ['Generosity'], sourceQuote: 'gives a   row to Ana' }, { id: 'repair', text: 'Ana helps.', supports: ['Generosity'] }, { id: 'plan', text: 'Rows are measured.', supports: ['Planning'] }];
  expect(ThemeEvidenceCollectorWidgetConfigSchema.safeParse({ themeChoices: ['Generosity', 'Planning'], evidence, source }).success).toBe(true);
  expect(ThemeEvidenceCollectorWidgetConfigSchema.safeParse({ themeChoices: ['Generosity', 'Planning'], evidence: [{ ...evidence[0], sourceQuote: 'Gives a row to Ana' }], source }).success).toBe(false);
  expect(ThemeEvidenceCollectorWidgetConfigSchema.safeParse({ themeChoices: ['Generosity', 'Planning'], evidence: [{ ...evidence[0], sourceQuote: 'not in source' }] }).success).toBe(false);
  expect(CentralIdeaOrganizerWidgetConfigSchema.safeParse({ mainIdeaChoices: ['Marshes help', 'Dogs bark'], details: [{ id: 'd', text: 'Fish shelter.', supports: ['Marshes help'], sourceQuote: 'Fish shelter.' }, { id: 'e', text: 'Plants slow waves.', supports: ['Marshes help'] }], source }).success).toBe(true);
});

test('Summary, structure, and figurative contracts validate authored limits and available answers', () => {
  const summary = {
    sourceSentences: [{ id: 'main', text: 'Bees help plants.', role: 'main' }, { id: 'detail', text: 'They carry pollen.', role: 'detail' }, { id: 'extra', text: 'Blue is a color.', role: 'extra' }],
    requiredMainIds: ['main'], maxSentences: 2, requiredDetailIds: ['detail'], compositionPrompt: 'Explain the big idea.', minCompositionWords: 3, maxCompositionWords: 20,
  };
  expect(SummaryBuilderWidgetConfigSchema.safeParse(summary).success).toBe(true);
  expect(SummaryBuilderWidgetConfigSchema.safeParse({ ...summary, minCompositionWords: 21, maxCompositionWords: 20 }).success).toBe(false);
  expect(SummaryBuilderWidgetConfigSchema.safeParse({ ...summary, minCompositionWords: 2 }).success).toBe(false);
  expect(TextStructureSorterWidgetConfigSchema.safeParse({ availableStructures: ['sequence'], excerpts: [{ id: 'steps', text: 'First mix.', structure: 'sequence' }, { id: 'other', text: 'Rain caused a flood.', structure: 'cause-effect' }] }).success).toBe(false);
  expect(FigurativeLanguageMatcherWidgetConfigSchema.safeParse({ availableKinds: ['simile'], pairs: [{ id: 's', phrase: 'fast as lightning', kind: 'simile', meaning: 'fast' }, { id: 'm', phrase: 'a beehive', kind: 'metaphor', meaning: 'busy' }] }).success).toBe(false);
});

test('Credibility production contracts require unique criteria and enough authored reasons', () => {
  const source = {
    id: 'guide', title: 'County Guide',
    judgments: [
      { criterion: 'expertise', strength: 'supports', reason: 'Written by a specialist.' },
      { criterion: 'publisher', strength: 'supports', reason: 'The publisher is accountable.' },
    ],
  };
  const base = { question: 'Which source should guide prevention?', sources: [source], requiredReasonCount: 2, answers: { guide: 'credible-for-question' } };
  expect(SourceCredibilityCheckerWidgetConfigSchema.safeParse(base).success).toBe(true);
  expect(SourceCredibilityCheckerWidgetConfigSchema.safeParse({ ...base, sources: [{ ...source, judgments: [...source.judgments, source.judgments[0]] }] }).success).toBe(false);
  expect(SourceCredibilityCheckerWidgetConfigSchema.safeParse({ ...base, requiredReasonCount: 3 }).success).toBe(false);
  expect(SourceCredibilityCheckerWidgetConfigSchema.safeParse({ ...base, sources: [{ ...source, judgments: source.judgments.map((judgment) => ({ ...judgment, extra: true })) }] }).success).toBe(false);
});
