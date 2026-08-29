import { expect, test } from 'vitest';
import { LessonSchema, validateLesson, type Lesson, type Question } from './schema';

function q(id: string, over: Partial<Question> = {}): Question {
  return {
    id, type: 'multiple-choice', prompt: '2+2?',
    choices: [{ id: 'a', text: '4' }, { id: 'b', text: '5' }],
    correctChoiceId: 'a', explanation: 'Because 2+2=4.',
    conceptTag: 'adding', reviewCardId: 'les-c1', ...over,
  } as Question;
}
function makeLesson(): Lesson {
  return {
    id: 'les', unitId: 'math-u01', title: 'T', indicatorCodes: ['4.NR.1.1'],
    intro: [{ speaker: 'nutty', text: 'Hi!' }],
    learnCards: [{ id: 'les-c1', title: 'Card', blocks: [{ kind: 'text', text: 'Learn.' }] }],
    workedExample: { title: 'Try it', steps: ['Step one.'] },
    quiz: { passThreshold: 8, pool: Array.from({ length: 13 }, (_, i) => q(`les-q${i}`)) },
  };
}

test('valid lesson parses and validates clean', () => {
  expect(LessonSchema.parse(makeLesson())).toBeTruthy();
  expect(validateLesson(makeLesson())).toEqual([]);
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
  l.learnCards[0]!.widget = { type: 'made-up', config: {} };
  expect(validateLesson(l).join()).toMatch(/made-up/);
});
test('duplicate question ids are reported', () => {
  const l = makeLesson();
  l.quiz.pool[1]!.id = l.quiz.pool[0]!.id;
  expect(validateLesson(l).join()).toMatch(/duplicate/i);
});
test('sort correctOrder with duplicates is reported', () => {
  const l = makeLesson();
  l.quiz.pool[0] = {
    id: 'les-q0', type: 'sort', prompt: 'Order these',
    items: [{ id: 'a', text: '1' }, { id: 'b', text: '2' }],
    correctOrder: ['a', 'a'],
    explanation: 'x', conceptTag: 'adding', reviewCardId: 'les-c1',
  };
  expect(validateLesson(l).join()).toMatch(/permutation/);
});
