import { act, render, screen } from '@testing-library/react';
import { beforeEach, expect, test } from 'vitest';
import { ProgressProvider, useProgress, type ProgressContextValue } from './ProgressContext';
import { defaultSave, exportSave, loadSave, persist, recordAttempt, recordReview } from './storage';
import { reviewKey, type ReviewAnswer } from '../review/model';

const answer: ReviewAnswer = {
  lessonId: 'math-u01-l01', conceptTag: 'place-value', questionId: 'math-u01-l01-q01',
  date: '2026-09-08', correct: true,
};
const key = reviewKey(answer.lessonId, answer.conceptTag);
function passed() {
  return recordAttempt(defaultSave(), answer.lessonId, {
    date: '2026-09-07', score: 9, total: 10, missedConceptTags: [],
  }, 8);
}

let context: ProgressContextValue;
function Probe() {
  context = useProgress();
  return <output>{context.save.reviews?.[key]?.level ?? 'no review'} / {context.reviewEpoch}</output>;
}

beforeEach(() => {
  window.localStorage.clear();
  persist(passed());
});

test('provider records and reloads review evidence without changing quiz state or epoch', () => {
  const original = loadSave();
  const view = render(<ProgressProvider><Probe /></ProgressProvider>);
  const action = context.recordReview;
  act(() => context.recordReview(answer));
  expect(screen.getByRole('status')).toHaveTextContent('1 / 0');
  expect(loadSave().reviews?.[key]?.level).toBe(1);
  expect(loadSave().lessons).toEqual(original.lessons);
  expect(loadSave().streak).toEqual(original.streak);
  expect(context.recordReview).toBe(action);
  view.unmount();
  render(<ProgressProvider><Probe /></ProgressProvider>);
  expect(screen.getByRole('status')).toHaveTextContent('1 / 0');
});

test('reset clears review evidence and invalidates a callback retained by a running session', () => {
  persist(recordReview(passed(), answer));
  render(<ProgressProvider><Probe /></ProgressProvider>);
  const stale = context.recordReview;
  act(() => {
    context.reset();
    stale(answer);
  });
  expect(context.reviewEpoch).toBe(1);
  expect(loadSave()).toEqual(defaultSave());
  act(() => stale(answer));
  expect(loadSave()).toEqual(defaultSave());
});

test('valid import rejects a stale same-tick review callback even when imported lesson is passed', () => {
  render(<ProgressProvider><Probe /></ProgressProvider>);
  const stale = context.recordReview;
  const incoming = { ...passed(), parentChecked: { [answer.lessonId]: true } };
  act(() => {
    context.importJson(exportSave(incoming));
    stale(answer);
  });
  expect(context.reviewEpoch).toBe(1);
  expect(loadSave()).toEqual(incoming);
  act(() => stale(answer));
  expect(loadSave()).toEqual(incoming);
  act(() => context.recordReview(answer));
  expect(loadSave().reviews?.[key]?.level).toBe(1);
});

test('invalid imports preserve the current review session and storage', () => {
  render(<ProgressProvider><Probe /></ProgressProvider>);
  const action = context.recordReview;
  expect(() => context.importJson('{"invalid":true}')).toThrow('invalid save file');
  expect(context.reviewEpoch).toBe(0);
  expect(context.recordReview).toBe(action);
  act(() => action(answer));
  expect(loadSave().reviews?.[key]?.level).toBe(1);
});
