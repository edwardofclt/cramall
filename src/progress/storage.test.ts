import { beforeEach, expect, test } from 'vitest';
import {
  defaultSave,
  exportSave,
  importSave,
  loadSave,
  loadSaveResult,
  migrateSave,
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

function validSave() {
  return recordAttempt(
    defaultSave(),
    'math-u01-l01',
    attempt({ score: 9, missedConceptTags: ['place-value'] }),
    8,
  );
}

function legacyBackwardDateSave() {
  return {
    version: 1 as const,
    settings: { soundOn: true, ttsOn: true },
    lessons: {
      'math-u01-l01': {
        status: 'in-progress' as const,
        bestScore: 7,
        attempts: [
          attempt({ date: '2026-01-29', score: 7 }),
          attempt({ date: '2026-01-28', score: 6 }),
        ],
      },
    },
    // This is exactly the state the pre-abe7f64 producer could emit after clock rollback.
    streak: { lastActiveDate: '2026-01-28', count: 1 },
    parentChecked: { 'math-u01-l01': true },
  };
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
  const save = validSave();
  persist(save);
  expect(loadSave()).toEqual(save);
});

test('the persisted save uses the literal versioned key cramall.v1', () => {
  const save = validSave();

  expect(persist(save)).toBe(true);

  expect(window.localStorage.getItem('cramall.v1')).toBe(JSON.stringify(save));
});

test('loadSave reads a valid save even when all storage writes are blocked', () => {
  const save = validSave();
  window.localStorage.setItem(KEY, JSON.stringify(save));
  const storagePrototype = Object.getPrototypeOf(window.localStorage) as Storage;
  const original = storagePrototype.setItem;
  storagePrototype.setItem = () => {
    throw new Error('QuotaExceededError');
  };
  try {
    expect(storageAvailable()).toBe(false);
    expect(loadSave()).toEqual(save);
  } finally {
    storagePrototype.setItem = original;
  }
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

test('persist() reports false when the real save write fails', () => {
  const storagePrototype = Object.getPrototypeOf(window.localStorage) as Storage;
  const original = storagePrototype.setItem;
  storagePrototype.setItem = function (key, value) {
    if (key === KEY) throw new Error('QuotaExceededError');
    return original.call(this, key, value);
  };
  try {
    expect(storageAvailable()).toBe(true);
    expect(persist(defaultSave())).toBe(false);
  } finally {
    storagePrototype.setItem = original;
  }
});

test('persist() trusts the real save write even when a probe key would be rejected', () => {
  const storagePrototype = Object.getPrototypeOf(window.localStorage) as Storage;
  const original = storagePrototype.setItem;
  const keys: string[] = [];
  storagePrototype.setItem = function (key, value) {
    keys.push(key);
    if (key !== KEY) throw new Error('probe keys are blocked');
    return original.call(this, key, value);
  };
  try {
    const save = validSave();
    expect(persist(save)).toBe(true);
    expect(keys).toEqual([KEY]);
    expect(window.localStorage.getItem(KEY)).toBe(JSON.stringify(save));
  } finally {
    storagePrototype.setItem = original;
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

test('streak: an older attempt never rewinds the last active date or count', () => {
  let save = recordAttempt(defaultSave(), 'les-1', attempt({ date: '2026-03-10' }), 8);
  save = recordAttempt(save, 'les-2', attempt({ date: '2026-03-11' }), 8);

  save = recordAttempt(save, 'les-3', attempt({ date: '2026-03-09' }), 8);

  expect(save.streak).toEqual({ lastActiveDate: '2026-03-11', count: 2 });
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

test('migrateSave explicitly accepts current v1 data and rejects unsupported versions', () => {
  const save = validSave();
  expect(migrateSave(save)).toEqual(save);
  expect(() => migrateSave({ ...save, version: 2 })).toThrow(/unsupported save version/i);
});

test('migrateSave canonicalizes a valid pre-fix backward-date v1 save', () => {
  const migrated = migrateSave(legacyBackwardDateSave());

  expect(migrated.lessons['math-u01-l01']?.attempts.map(({ date }) => date)).toEqual([
    '2026-01-29',
    '2026-01-28',
  ]);
  expect(migrated.streak).toEqual({ lastActiveDate: '2026-01-29', count: 1 });
  expect(migrated.parentChecked['math-u01-l01']).toBe(true);
  expect(importSave(exportSave(migrated))).toEqual(migrated);
});

test('loadSaveResult loads and canonicalizes the prior producer save without deleting it', () => {
  const raw = JSON.stringify(legacyBackwardDateSave());
  window.localStorage.setItem(KEY, raw);

  const loaded = loadSaveResult();

  expect(loaded.issue).toBeNull();
  expect(loaded.save.streak).toEqual({ lastActiveDate: '2026-01-29', count: 1 });
  expect(window.localStorage.getItem(KEY)).toBe(raw);
});

test('legacy migration still rejects malformed core attempt data', () => {
  const legacy = legacyBackwardDateSave();
  legacy.lessons['math-u01-l01'].attempts[0]!.score = 11;
  expect(() => migrateSave(legacy)).toThrow();
});

test.each([
  ['negative score', (save: ReturnType<typeof validSave>) => { save.lessons['math-u01-l01']!.attempts[0]!.score = -1; }],
  ['score over total', (save: ReturnType<typeof validSave>) => { save.lessons['math-u01-l01']!.attempts[0]!.score = 11; }],
  ['zero total', (save: ReturnType<typeof validSave>) => { save.lessons['math-u01-l01']!.attempts[0]!.total = 0; }],
  ['fractional score', (save: ReturnType<typeof validSave>) => { save.lessons['math-u01-l01']!.attempts[0]!.score = 8.5; }],
  ['impossible date', (save: ReturnType<typeof validSave>) => { save.lessons['math-u01-l01']!.attempts[0]!.date = '2026-02-30'; }],
  ['negative streak count', (save: ReturnType<typeof validSave>) => { save.streak.count = -1; }],
])('importSave rejects v1 data with %s', (_label, mutate) => {
  const save = validSave();
  mutate(save);
  expect(() => importSave(JSON.stringify(save))).toThrow('invalid save file');
});

test('loadSaveResult surfaces invalid stored data while leaving it untouched', () => {
  const invalid = '{"version":1,"broken":true}';
  window.localStorage.setItem(KEY, invalid);

  const loaded = loadSaveResult();

  expect(loaded.save).toEqual(defaultSave());
  expect(loaded.issue).toMatch(/invalid/i);
  expect(window.localStorage.getItem(KEY)).toBe(invalid);
});

test('loadSaveResult distinguishes an unsupported stored version', () => {
  window.localStorage.setItem(KEY, JSON.stringify({ ...validSave(), version: 9 }));

  const loaded = loadSaveResult();

  expect(loaded.save).toEqual(defaultSave());
  expect(loaded.issue).toMatch(/unsupported version/i);
});
