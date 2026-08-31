import { expect, test } from 'vitest';
import { normalizeAnswerText } from '../content/answer-normalization';
import type { Question } from '../content/schema';
import {
  buildResult,
  gradeAnswer,
  normalizeText,
  sampleQuiz,
  shuffleChoices,
} from './engine';

// --- fixtures ---

function choiceQ(id: string, over: Partial<Question> = {}): Question {
  return {
    id,
    type: 'multiple-choice',
    prompt: `${id}?`,
    choices: [
      { id: 'a', text: 'A' },
      { id: 'b', text: 'B' },
      { id: 'c', text: 'C' },
      { id: 'd', text: 'D' },
    ],
    correctChoiceId: 'a',
    explanation: 'because',
    conceptTag: 'concept-a',
    reviewCardId: `${id}-card`,
    ...over,
  } as Question;
}

function fillQ(id: string, over: Partial<Question> = {}): Question {
  return {
    id,
    type: 'fill-blank',
    prompt: `${id}?`,
    acceptedAnswers: ['1204'],
    explanation: 'because',
    conceptTag: 'concept-b',
    reviewCardId: `${id}-card`,
    ...over,
  } as Question;
}

function sortQ(id: string, over: Partial<Question> = {}): Question {
  return {
    id,
    type: 'sort',
    prompt: `${id}?`,
    items: [
      { id: 'i1', text: 'One' },
      { id: 'i2', text: 'Two' },
      { id: 'i3', text: 'Three' },
    ],
    correctOrder: ['i1', 'i2', 'i3'],
    explanation: 'because',
    conceptTag: 'concept-c',
    reviewCardId: `${id}-card`,
    ...over,
  } as Question;
}

/** Simple deterministic LCG so tests get a reproducible () => number sequence, independent of Math.random. */
function makeLcg(seed: number): () => number {
  let state = seed;
  return () => {
    // Numerical Recipes LCG constants.
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function pool(n: number): Question[] {
  return Array.from({ length: n }, (_, i) => choiceQ(`q${i}`));
}

// --- sampleQuiz ---

test('sampleQuiz: returns 10 unique questions from a larger pool by default', () => {
  const result = sampleQuiz(pool(15));
  expect(result).toHaveLength(10);
  const ids = new Set(result.map((q) => q.id));
  expect(ids.size).toBe(10);
});

test('sampleQuiz: is deterministic given the same seeded rng sequence', () => {
  const source = pool(15);
  const a = sampleQuiz(source, 10, makeLcg(42));
  const b = sampleQuiz(source, 10, makeLcg(42));
  expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
});

test('sampleQuiz: a different seed produces a different order (sanity check on shuffle)', () => {
  const source = pool(15);
  const a = sampleQuiz(source, 10, makeLcg(42));
  const b = sampleQuiz(source, 10, makeLcg(7));
  expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
});

test('sampleQuiz: throws when pool is smaller than n (pool of 9, default n=10)', () => {
  expect(() => sampleQuiz(pool(9))).toThrow(Error);
});

test('sampleQuiz: respects an explicit n', () => {
  const result = sampleQuiz(pool(5), 3, makeLcg(1));
  expect(result).toHaveLength(3);
});

test('sampleQuiz: does not mutate the original pool array', () => {
  const source = pool(12);
  const beforeIds = source.map((q) => q.id);
  sampleQuiz(source, 10, makeLcg(3));
  expect(source.map((q) => q.id)).toEqual(beforeIds);
});

test('sampleQuiz: a retry guarantees one replacement when the pool permits it', () => {
  const source = pool(13);
  const first = sampleQuiz(source, 10, () => 0);
  const retry = sampleQuiz(source, 10, () => 0, first.map(({ id }) => id));
  const firstIds = new Set(first.map(({ id }) => id));

  expect(retry).toHaveLength(10);
  expect(new Set(retry.map(({ id }) => id)).size).toBe(10);
  expect(retry.some(({ id }) => !firstIds.has(id))).toBe(true);
});

test('sampleQuiz: exact-size pools remain valid when no replacement exists', () => {
  const source = pool(10);
  const first = sampleQuiz(source, 10, () => 0);
  expect(sampleQuiz(source, 10, () => 0, first.map(({ id }) => id))).toHaveLength(10);
});

// --- shuffleChoices ---

// Exact orders below are the actual output of the engine's Fisher-Yates shuffle driven by
// makeLcg(9), verified independently against the same algorithm — not just "changed from input".
// This catches a no-op (or otherwise broken) shuffle that a set-equality check would miss.

test('shuffleChoices: choices land in the exact seed-determined order (not a no-op)', () => {
  const original = choiceQ('q1');
  const shuffled = shuffleChoices(original, makeLcg(9));
  expect(shuffled).not.toBe(original);
  expect(shuffled.id).toBe(original.id);
  if (shuffled.type === 'multiple-choice') {
    expect(shuffled.choices.map((c) => c.id)).toEqual(['c', 'b', 'd', 'a']);
    expect(shuffled.correctChoiceId).toBe('a');
  } else {
    throw new Error('expected multiple-choice question');
  }
});

test('shuffleChoices: sort items land in the exact seed-determined order (not a no-op)', () => {
  const original = sortQ('q1');
  const shuffled = shuffleChoices(original, makeLcg(9));
  expect(shuffled).not.toBe(original);
  if (shuffled.type === 'sort') {
    expect(shuffled.items.map((i) => i.id)).toEqual(['i2', 'i3', 'i1']);
    expect(shuffled.correctOrder).toEqual(['i1', 'i2', 'i3']);
  } else {
    throw new Error('expected sort question');
  }
});

test('shuffleChoices: fill-blank question is returned as-is (same reference, untouched)', () => {
  const original = fillQ('q1');
  const shuffled = shuffleChoices(original, makeLcg(9));
  expect(shuffled).toBe(original);
});

// --- gradeAnswer ---

test('gradeAnswer: multiple-choice correct answer', () => {
  expect(gradeAnswer(choiceQ('q1'), 'a')).toBe(true);
});

test('gradeAnswer: multiple-choice wrong answer', () => {
  expect(gradeAnswer(choiceQ('q1'), 'b')).toBe(false);
});

test('gradeAnswer: true-false correct answer', () => {
  const q = choiceQ('q1', {
    type: 'true-false',
    choices: [{ id: 't', text: 'True' }, { id: 'f', text: 'False' }],
    correctChoiceId: 't',
  });
  expect(gradeAnswer(q, 't')).toBe(true);
  expect(gradeAnswer(q, 'f')).toBe(false);
});

test('gradeAnswer: fill-blank accepts " 1,204 " for accepted ["1204"] via normalizeText', () => {
  expect(gradeAnswer(fillQ('q1'), ' 1,204 ')).toBe(true);
});

test('gradeAnswer: expanded-form fill blanks ignore spacing around plus signs', () => {
  const question = fillQ('q1', { acceptedAnswers: ['7,000 + 30'] });
  expect(gradeAnswer(question, '7,000+30')).toBe(true);
});

test('gradeAnswer: fill-blank rejects an unmatched answer', () => {
  expect(gradeAnswer(fillQ('q1'), '1205')).toBe(false);
});

test('gradeAnswer: sort requires exact order, permutations fail', () => {
  const q = sortQ('q1');
  expect(gradeAnswer(q, ['i1', 'i2', 'i3'])).toBe(true);
  expect(gradeAnswer(q, ['i2', 'i1', 'i3'])).toBe(false);
  expect(gradeAnswer(q, ['i1', 'i2'])).toBe(false);
});

test('gradeAnswer: returns false (not throws) for a type-mismatched Answer shape', () => {
  // string[] given to a fill-blank question (expects a string)
  expect(() => gradeAnswer(fillQ('q1'), ['1204'])).not.toThrow();
  expect(gradeAnswer(fillQ('q1'), ['1204'])).toBe(false);
  // string given to a sort question (expects string[])
  expect(() => gradeAnswer(sortQ('q1'), 'i1,i2,i3')).not.toThrow();
  expect(gradeAnswer(sortQ('q1'), 'i1,i2,i3')).toBe(false);
});

// --- normalizeText ---

test('normalizeText: trims, lowercases, collapses whitespace, strips commas', () => {
  expect(normalizeText).toBe(normalizeAnswerText);
  expect(normalizeText(' 1,204 ')).toBe('1204');
  expect(normalizeText('  Hello   World  ')).toBe('hello world');
  expect(normalizeText('A,B,C')).toBe('abc');
});

// --- buildResult ---

test('buildResult: score counts correct answers, total is question count', () => {
  const questions = [choiceQ('q1'), choiceQ('q2'), choiceQ('q3')];
  const answers = ['a', 'a', 'wrong'];
  const result = buildResult(questions, answers);
  expect(result.total).toBe(3);
  expect(result.score).toBe(2);
});

test('buildResult: groups two misses with the same conceptTag into one MissGroup with count 2', () => {
  const q1 = choiceQ('q1', { conceptTag: 'fractions', reviewCardId: 'card-1' });
  const q2 = choiceQ('q2', { conceptTag: 'fractions', reviewCardId: 'card-2' });
  const questions = [q1, q2];
  const answers = ['wrong', 'wrong'];
  const result = buildResult(questions, answers);
  expect(result.missed).toEqual([
    { conceptTag: 'fractions', reviewCardId: 'card-1', count: 2 },
  ]);
});

test('buildResult: missed groups are sorted by count descending', () => {
  const q1 = choiceQ('q1', { conceptTag: 'rare', reviewCardId: 'card-rare' });
  const q2 = choiceQ('q2', { conceptTag: 'common', reviewCardId: 'card-common-1' });
  const q3 = choiceQ('q3', { conceptTag: 'common', reviewCardId: 'card-common-2' });
  const q4 = choiceQ('q4', { conceptTag: 'common', reviewCardId: 'card-common-3' });
  const questions = [q1, q2, q3, q4];
  const answers = ['wrong', 'wrong', 'wrong', 'wrong'];
  const result = buildResult(questions, answers);
  expect(result.missed).toEqual([
    { conceptTag: 'common', reviewCardId: 'card-common-1', count: 3 },
    { conceptTag: 'rare', reviewCardId: 'card-rare', count: 1 },
  ]);
});

test('buildResult: ties are broken by first-encountered order (stable sort)', () => {
  const q1 = choiceQ('q1', { conceptTag: 'first', reviewCardId: 'card-first' });
  const q2 = choiceQ('q2', { conceptTag: 'second', reviewCardId: 'card-second' });
  const questions = [q1, q2];
  const answers = ['wrong', 'wrong'];
  const result = buildResult(questions, answers);
  expect(result.missed.map((m) => m.conceptTag)).toEqual(['first', 'second']);
});

test('buildResult: a missing (undefined) answer counts that question as missed', () => {
  const q1 = choiceQ('q1', { conceptTag: 'fractions', reviewCardId: 'card-1' });
  const q2 = choiceQ('q2', { conceptTag: 'decimals', reviewCardId: 'card-2' });
  const questions = [q1, q2];
  // answers[0] is left unanswered (undefined); q2 is answered correctly.
  const answers: (string | undefined)[] = [undefined, 'a'];
  const result = buildResult(questions, answers as unknown as string[]);
  expect(result.score).toBe(1);
  expect(result.total).toBe(2);
  expect(result.missed).toEqual([
    { conceptTag: 'fractions', reviewCardId: 'card-1', count: 1 },
  ]);
});

test('buildResult: score equals total minus the sum of missed counts', () => {
  const q1 = choiceQ('q1', { conceptTag: 'a' });
  const q2 = choiceQ('q2', { conceptTag: 'a' });
  const q3 = choiceQ('q3', { conceptTag: 'b' });
  const q4 = choiceQ('q4', { conceptTag: 'c' });
  const questions = [q1, q2, q3, q4];
  const answers = ['wrong', 'wrong', 'wrong', 'a']; // q4 correct, rest wrong across 3 concept tags
  const result = buildResult(questions, answers);
  const missedSum = result.missed.reduce((sum, m) => sum + m.count, 0);
  expect(result.score).toBe(result.total - missedSum);
  expect(result.score).toBe(1);
});
