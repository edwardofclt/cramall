import { beforeEach, expect, test } from 'vitest';
import {
  defaultSave,
  exportSave,
  importSave,
  loadSave,
  persist,
  recordAttempt,
  setParentChecked,
  storageAvailable,
  type Attempt,
} from './storage';

const KEY = 'cramall.v1';

beforeEach(() => {
  window.localStorage.clear();
});

function attempt(over: Partial<Attempt> = {}): Attempt {
  return { date: '2026-01-01', score: 5, total: 10, missedConceptTags: [], ...over };
}

test('defaultSave() has version 1, default settings, and empty progress', () => {
  const save = defaultSave();
  expect(save).toEqual({
    version: 1,
    settings: { soundOn: true, ttsOn: true },
    lessons: {},
    streak: { lastActiveDate: '', count: 0 },
    parentChecked: {},
  });
});

test('storageAvailable() is true in jsdom test environment', () => {
  expect(storageAvailable()).toBe(true);
});

test('loadSave() returns defaultSave() when nothing is stored', () => {
  expect(loadSave()).toEqual(defaultSave());
});

test('persist() then loadSave() roundtrips a SaveData', () => {
  const save = recordAttempt(defaultSave(), 'les-1', attempt({ score: 9 }), 8);
  persist(save);
  expect(loadSave()).toEqual(save);
});

test('corrupt JSON in localStorage falls back to defaultSave()', () => {
  window.localStorage.setItem(KEY, '{not valid json');
  expect(loadSave()).toEqual(defaultSave());
});

test('JSON that does not match the save shape falls back to defaultSave()', () => {
  window.localStorage.setItem(KEY, JSON.stringify({ hello: 'world' }));
  expect(loadSave()).toEqual(defaultSave());
});

test('persist() never throws even when localStorage.setItem throws (quota/private mode)', () => {
  const original = window.localStorage.setItem;
  window.localStorage.setItem = () => {
    throw new Error('QuotaExceededError');
  };
  try {
    expect(() => persist(defaultSave())).not.toThrow();
  } finally {
    window.localStorage.setItem = original;
  }
});

test('recordAttempt marks lesson passed when score >= passThreshold', () => {
  const save = recordAttempt(defaultSave(), 'les-1', attempt({ score: 8, total: 10 }), 8);
  expect(save.lessons['les-1']!.status).toBe('passed');
  expect(save.lessons['les-1']!.bestScore).toBe(8);
});

test('recordAttempt keeps in-progress status when score < passThreshold', () => {
  const save = recordAttempt(defaultSave(), 'les-1', attempt({ score: 5, total: 10 }), 8);
  expect(save.lessons['les-1']!.status).toBe('in-progress');
  expect(save.lessons['les-1']!.bestScore).toBe(5);
});

test('recordAttempt keeps the best score across multiple attempts', () => {
  let save = defaultSave();
  save = recordAttempt(save, 'les-1', attempt({ date: '2026-01-01', score: 3 }), 8);
  save = recordAttempt(save, 'les-1', attempt({ date: '2026-01-02', score: 7 }), 8);
  save = recordAttempt(save, 'les-1', attempt({ date: '2026-01-03', score: 4 }), 8);
  expect(save.lessons['les-1']!.bestScore).toBe(7);
});

test('a later failed attempt never downgrades a passed lesson, and attempts append in order', () => {
  let save = defaultSave();
  save = recordAttempt(save, 'les-1', attempt({ date: '2026-01-01', score: 9 }), 8);
  expect(save.lessons['les-1']!.status).toBe('passed');
  save = recordAttempt(save, 'les-1', attempt({ date: '2026-01-02', score: 2 }), 8);
  expect(save.lessons['les-1']!.status).toBe('passed');
  expect(save.lessons['les-1']!.bestScore).toBe(9);
  expect(save.lessons['les-1']!.attempts.map((a) => a.score)).toEqual([9, 2]);
});

test('recordAttempt does not mutate the original SaveData (pure)', () => {
  const original = defaultSave();
  const snapshot = JSON.parse(JSON.stringify(original));
  recordAttempt(original, 'les-1', attempt(), 8);
  expect(original).toEqual(snapshot);
});

test('streak: first ever attempt sets count to 1', () => {
  const save = recordAttempt(defaultSave(), 'les-1', attempt({ date: '2026-03-10' }), 8);
  expect(save.streak).toEqual({ lastActiveDate: '2026-03-10', count: 1 });
});

test('streak: a second attempt on the same day leaves count unchanged', () => {
  let save = recordAttempt(defaultSave(), 'les-1', attempt({ date: '2026-03-10' }), 8);
  save = recordAttempt(save, 'les-2', attempt({ date: '2026-03-10' }), 8);
  expect(save.streak).toEqual({ lastActiveDate: '2026-03-10', count: 1 });
});

test('streak: an attempt exactly one day later increments count', () => {
  let save = recordAttempt(defaultSave(), 'les-1', attempt({ date: '2026-03-10' }), 8);
  save = recordAttempt(save, 'les-2', attempt({ date: '2026-03-11' }), 8);
  expect(save.streak).toEqual({ lastActiveDate: '2026-03-11', count: 2 });
});

test('streak: an attempt more than one day later resets count to 1', () => {
  let save = recordAttempt(defaultSave(), 'les-1', attempt({ date: '2026-03-10' }), 8);
  save = recordAttempt(save, 'les-2', attempt({ date: '2026-03-11' }), 8);
  expect(save.streak.count).toBe(2);
  save = recordAttempt(save, 'les-3', attempt({ date: '2026-03-20' }), 8);
  expect(save.streak).toEqual({ lastActiveDate: '2026-03-20', count: 1 });
});

test('streak: day boundary is computed via UTC date parts, not local timezone drift', () => {
  // 2026-03-10 -> 2026-03-11 must be treated as exactly one day regardless of host TZ.
  let save = recordAttempt(defaultSave(), 'les-1', attempt({ date: '2026-03-10' }), 8);
  save = recordAttempt(save, 'les-2', attempt({ date: '2026-03-11' }), 8);
  expect(save.streak.count).toBe(2);
});

test('setParentChecked sets a lesson checked flag without mutating the original', () => {
  const original = defaultSave();
  const updated = setParentChecked(original, 'les-1', true);
  expect(updated.parentChecked).toEqual({ 'les-1': true });
  expect(original.parentChecked).toEqual({});
});

test('exportSave produces pretty JSON that round-trips through importSave', () => {
  const save = recordAttempt(defaultSave(), 'les-1', attempt({ score: 9 }), 8);
  const json = exportSave(save);
  expect(json).toContain('\n');
  expect(importSave(json)).toEqual(save);
});

test('importSave throws Error("invalid save file") on bad shape', () => {
  expect(() => importSave('{}')).toThrow('invalid save file');
});

test('importSave throws Error("invalid save file") on invalid JSON', () => {
  expect(() => importSave('not json at all')).toThrow('invalid save file');
});

test('importSave(exportSave(s)) roundtrips a save built with recordAttempt and setParentChecked', () => {
  let save = defaultSave();
  save = recordAttempt(save, 'les-1', attempt({ date: '2026-01-01', score: 9 }), 8);
  save = recordAttempt(save, 'les-2', attempt({ date: '2026-01-02', score: 3 }), 8);
  save = setParentChecked(save, 'les-1', true);
  const roundtripped = importSave(exportSave(save));
  expect(roundtripped).toEqual(save);
});
