import { z } from 'zod';

export type Attempt = { date: string; score: number; total: number; missedConceptTags: string[] };
export type LessonProgress = { status: 'in-progress' | 'passed'; bestScore: number; attempts: Attempt[] };
export type Settings = { soundOn: boolean; ttsOn: boolean };
export type SaveData = {
  version: 1;
  settings: Settings;
  lessons: Record<string, LessonProgress>;
  streak: { lastActiveDate: string; count: number };
  parentChecked: Record<string, boolean>;
};

const STORAGE_KEY = 'cramall.v1';

const AttemptSchema = z.object({
  date: z.string(),
  score: z.number(),
  total: z.number(),
  missedConceptTags: z.array(z.string()),
});

const LessonProgressSchema = z.object({
  status: z.enum(['in-progress', 'passed']),
  bestScore: z.number(),
  attempts: z.array(AttemptSchema),
});

const SettingsSchema = z.object({
  soundOn: z.boolean(),
  ttsOn: z.boolean(),
});

const SaveDataSchema = z.object({
  version: z.literal(1),
  settings: SettingsSchema,
  lessons: z.record(LessonProgressSchema),
  streak: z.object({ lastActiveDate: z.string(), count: z.number() }),
  parentChecked: z.record(z.boolean()),
});

export function defaultSave(): SaveData {
  return {
    version: 1,
    settings: { soundOn: true, ttsOn: true },
    lessons: {},
    streak: { lastActiveDate: '', count: 0 },
    parentChecked: {},
  };
}

/** True when window.localStorage exists and actually accepts writes (not private-mode/quota-blocked). */
export function storageAvailable(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    const probeKey = '__cramall_storage_probe__';
    window.localStorage.setItem(probeKey, '1');
    window.localStorage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}

export function loadSave(): SaveData {
  try {
    if (!storageAvailable()) return defaultSave();
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return defaultSave();
    return SaveDataSchema.parse(JSON.parse(raw));
  } catch {
    return defaultSave();
  }
}

/** Never throws: quota-exceeded and private-mode write failures are swallowed. */
export function persist(save: SaveData): void {
  try {
    if (!storageAvailable()) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
  } catch {
    // Swallow quota/private-mode errors per contract: persist() must never throw.
  }
}

/** Day difference (UTC) between two yyyy-mm-dd strings, from -> to. */
function dayDiff(from: string, to: string): number {
  const [fy, fm, fd] = from.split('-').map(Number);
  const [ty, tm, td] = to.split('-').map(Number);
  const fromUtc = Date.UTC(fy!, fm! - 1, fd!);
  const toUtc = Date.UTC(ty!, tm! - 1, td!);
  return Math.round((toUtc - fromUtc) / 86_400_000);
}

export function recordAttempt(
  save: SaveData,
  lessonId: string,
  attempt: Attempt,
  passThreshold: number,
): SaveData {
  const existing = save.lessons[lessonId];
  const attempts = existing ? [...existing.attempts, attempt] : [attempt];
  const bestScore = existing ? Math.max(existing.bestScore, attempt.score) : attempt.score;
  const everPassed = existing?.status === 'passed' || attempt.score >= passThreshold;

  const lessonProgress: LessonProgress = {
    status: everPassed ? 'passed' : 'in-progress',
    bestScore,
    attempts,
  };

  let streak: SaveData['streak'];
  if (!save.streak.lastActiveDate) {
    streak = { lastActiveDate: attempt.date, count: 1 };
  } else {
    const diff = dayDiff(save.streak.lastActiveDate, attempt.date);
    if (diff === 0) {
      streak = { lastActiveDate: attempt.date, count: save.streak.count };
    } else if (diff === 1) {
      streak = { lastActiveDate: attempt.date, count: save.streak.count + 1 };
    } else {
      streak = { lastActiveDate: attempt.date, count: 1 };
    }
  }

  return {
    ...save,
    lessons: { ...save.lessons, [lessonId]: lessonProgress },
    streak,
  };
}

export function setParentChecked(save: SaveData, lessonId: string, checked: boolean): SaveData {
  return {
    ...save,
    parentChecked: { ...save.parentChecked, [lessonId]: checked },
  };
}

export function exportSave(save: SaveData): string {
  return JSON.stringify(save, null, 2);
}

export function importSave(json: string): SaveData {
  try {
    return SaveDataSchema.parse(JSON.parse(json));
  } catch {
    throw new Error('invalid save file');
  }
}
