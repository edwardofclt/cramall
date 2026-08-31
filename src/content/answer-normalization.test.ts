import { expect, test } from 'vitest';
import { normalizeAnswerText } from './answer-normalization';

test.each([
  ['7,000 + 30', '7000+30'],
  ['7,000+30', '7000+30'],
  ['  THREE   hundred  ', 'three hundred'],
  ['３００＋４０', '300+40'],
])('normalizes %j to %j', (input, expected) => {
  expect(normalizeAnswerText(input)).toBe(expected);
});
