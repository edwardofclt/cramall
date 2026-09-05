import { describe, expect, test } from 'vitest';
import { orderedCheckChoices } from './check-order';
import { allLessons } from '../content/subjects';
import type { InlineCheck } from '../content/schema';

const sample: InlineCheck = {
  prompt: 'Which number is greater?',
  choices: [
    { id: 'ten', text: '10' },
    { id: 'nine', text: '9' },
    { id: 'eight', text: '8' },
  ],
  correctChoiceId: 'ten',
  explanation: 'Ten is one more than nine.',
};

function catalogChecks(): InlineCheck[] {
  return allLessons().flatMap((lesson) =>
    lesson.learnCards.flatMap((card) => (card.check ? [card.check] : [])));
}

describe('orderedCheckChoices', () => {
  test('preserves the exact choice set without adding, dropping, or altering a choice', () => {
    const ordered = orderedCheckChoices(sample);
    expect([...ordered].sort((a, b) => a.id.localeCompare(b.id)))
      .toEqual([...sample.choices].sort((a, b) => a.id.localeCompare(b.id)));
  });

  test('is deterministic, so a review link returns the learner to the same order', () => {
    expect(orderedCheckChoices(sample)).toEqual(orderedCheckChoices({ ...sample }));
  });

  test('depends on the check, so different checks do not share one fixed order', () => {
    const orders = catalogChecks()
      .filter((check) => check.choices.length === 3)
      .map((check) => orderedCheckChoices(check).map(({ id }) => id).join('|'));
    expect(new Set(orders).size).toBeGreaterThan(1);
  });
});

describe('catalog answer-position bias', () => {
  const checks = catalogChecks();

  test('the catalog still authors most correct answers first (the bias being corrected)', () => {
    const authoredFirst = checks
      .filter((check) => check.choices[0]!.id === check.correctChoiceId).length;
    expect(authoredFirst / checks.length).toBeGreaterThan(0.9);
  });

  test('tapping one position no longer clears most checks, and every position is used', () => {
    const byPosition = new Map<number, number>();
    let widest = 0;
    for (const check of checks) {
      const position = orderedCheckChoices(check)
        .findIndex(({ id }) => id === check.correctChoiceId);
      expect(position).toBeGreaterThanOrEqual(0);
      widest = Math.max(widest, check.choices.length);
      byPosition.set(position, (byPosition.get(position) ?? 0) + 1);
    }
    const spread = `rendered correct-answer positions: ${JSON.stringify([...byPosition].sort())}`;

    // Authored order puts the answer first ~96% of the time; a working shuffle lands far below
    // that. This is a bias guard, not a uniformity assertion - the exact split is sampling noise.
    const worst = Math.max(...byPosition.values());
    expect(worst / checks.length, spread).toBeLessThan(0.5);

    // A shuffle that silently collapsed would starve the later positions entirely.
    expect(byPosition.size, spread).toBe(widest);
  });
});
