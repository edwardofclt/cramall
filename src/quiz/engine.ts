import { normalizeAnswerText } from '../content/answer-normalization';
import type { Question } from '../content/schema';

export type Answer = string | string[]; // choiceId | typed text | ordered item ids
export type MissGroup = { conceptTag: string; reviewCardId: string; count: number };
export type QuizResult = { score: number; total: number; missed: MissGroup[] };

/** In-place Fisher-Yates shuffle of `arr`, driven by `rng` (expected to return [0, 1)). */
function shuffle<T>(arr: T[], rng: () => number): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

/** Fisher-Yates shuffle a copy of `pool` and take the first `n`. Throws if the pool is too small.
 * When prior ids are supplied, a retry gets at least one replacement whenever one exists. */
export function sampleQuiz(
  pool: Question[],
  n = 10,
  rng: () => number = Math.random,
  previousIds: readonly string[] = [],
): Question[] {
  if (pool.length < n) {
    throw new Error(`quiz pool has ${pool.length} questions, need at least ${n}`);
  }
  const sampled = shuffle([...pool], rng).slice(0, n);
  if (n === 0 || previousIds.length === 0) return sampled;

  const previous = new Set(previousIds);
  if (sampled.some(({ id }) => !previous.has(id))) return sampled;
  const replacements = pool.filter(({ id }) => !previous.has(id));
  if (replacements.length === 0) return sampled;

  sampled[sampled.length - 1] = shuffle(replacements, rng)[0]!;
  return sampled;
}

/** Returns a new question with its choices (or sort items) reordered. Fill-blank is returned as-is. */
export function shuffleChoices<T extends Question>(question: T, rng: () => number = Math.random): T {
  const q = question as Question;
  if (q.type === 'fill-blank') return question;
  if (q.type === 'sort') {
    return { ...q, items: shuffle([...q.items], rng) } as T;
  }
  return { ...q, choices: shuffle([...q.choices], rng) } as T;
}

export const normalizeText = normalizeAnswerText;

export function gradeAnswer(q: Question, answer: Answer): boolean {
  switch (q.type) {
    case 'multiple-choice':
    case 'true-false':
      return answer === q.correctChoiceId;
    case 'fill-blank': {
      if (typeof answer !== 'string') return false;
      const normalized = normalizeText(answer);
      return q.acceptedAnswers.some((accepted) => normalizeText(accepted) === normalized);
    }
    case 'sort': {
      if (!Array.isArray(answer)) return false;
      return (
        answer.length === q.correctOrder.length &&
        answer.every((id, i) => id === q.correctOrder[i])
      );
    }
  }
}

/** Grades `questions` pairwise against `answers`, grouping wrong answers by conceptTag. */
export function buildResult(questions: Question[], answers: Answer[]): QuizResult {
  let score = 0;
  const missed: MissGroup[] = [];
  const groupByTag = new Map<string, MissGroup>();

  questions.forEach((q, i) => {
    const answer = answers[i];
    if (answer !== undefined && gradeAnswer(q, answer)) {
      score += 1;
      return;
    }
    const existing = groupByTag.get(q.conceptTag);
    if (existing) {
      existing.count += 1;
    } else {
      const group: MissGroup = { conceptTag: q.conceptTag, reviewCardId: q.reviewCardId, count: 1 };
      groupByTag.set(q.conceptTag, group);
      missed.push(group);
    }
  });

  missed.sort((a, b) => b.count - a.count);

  return { score, total: questions.length, missed };
}
