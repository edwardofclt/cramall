import { z } from 'zod';
import { findLesson } from '../content/subjects';
import {
  nextReviewRecord, ReviewAnswerSchema, ReviewRecordSchema, reviewEvidenceDate, reviewKey,
  type ReviewAnswer, type ReviewRecord,
} from '../review/model';

export type Attempt = { date: string; score: number; total: number; missedConceptTags: string[] };
export type LessonProgress = { status: 'in-progress' | 'passed'; bestScore: number; attempts: Attempt[] };
export type Settings = { soundOn: boolean; ttsOn: boolean };
export type SaveData = {
  version: 1;
  settings: Settings;
  lessons: Record<string, LessonProgress>;
  streak: { lastActiveDate: string; count: number };
  parentChecked: Record<string, boolean>;
  reviews?: Record<string, ReviewRecord>;
};

const STORAGE_KEY = 'cramall.v1';
const PASS_THRESHOLD = 8;
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const STORAGE_PROBE_KEY = '__cramall_storage_probe__';

/** Strict calendar-date parser shared by storage validation and streak calculations. */
function dateUtc(value: string): number | null {
  const match = ISO_DATE.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 2000 || year > 2100) return null;
  const utc = Date.UTC(year, month - 1, day);
  const parsed = new Date(utc);
  return parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
    ? utc
    : null;
}

const IsoDateSchema = z.string().refine((value) => dateUtc(value) !== null, {
  message: 'expected a real yyyy-mm-dd date from 2000 through 2100',
});

const AttemptSchema = z.object({
  date: IsoDateSchema,
  score: z.number().int().min(0).max(10),
  total: z.literal(10),
  missedConceptTags: z.array(z.string().min(1).max(100)).max(10),
}).strict().superRefine((attempt, context) => {
  if (attempt.score > attempt.total) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['score'],
      message: 'score cannot exceed total',
    });
  }
});

const LessonProgressSchema = z.object({
  status: z.enum(['in-progress', 'passed']),
  bestScore: z.number().int().min(0).max(10),
  attempts: z.array(AttemptSchema).min(1),
}).strict().superRefine((progress, context) => {
  const bestScore = Math.max(...progress.attempts.map((attempt) => attempt.score));
  if (progress.bestScore !== bestScore) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['bestScore'],
      message: `bestScore must equal the highest attempt score (${bestScore})`,
    });
  }
  const derivedStatus = progress.attempts.some((attempt) => attempt.score >= PASS_THRESHOLD)
    ? 'passed'
    : 'in-progress';
  if (progress.status !== derivedStatus) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['status'],
      message: `status must be ${derivedStatus} for these attempts`,
    });
  }
});

const SettingsSchema = z.object({
  soundOn: z.boolean(),
  ttsOn: z.boolean(),
}).strict();

// Validate keys before Zod constructs the object, since it deliberately drops __proto__.
const ReviewsSchema = z.record(z.string().refine((key) => key !== '__proto__', {
  message: 'review key must reference a lesson concept',
}), ReviewRecordSchema);

const LegacyLessonProgressSchema = z.object({
  status: z.enum(['in-progress', 'passed']),
  bestScore: z.number().int().min(0).max(10),
  attempts: z.array(AttemptSchema).min(1),
}).strict();

const LegacyV1SaveSchema = z.object({
  version: z.literal(1),
  settings: SettingsSchema,
  lessons: z.record(LegacyLessonProgressSchema),
  streak: z.object({
    lastActiveDate: z.union([z.literal(''), IsoDateSchema]),
    count: z.number().int().min(0).max(36_600),
  }).strict(),
  parentChecked: z.record(z.boolean()),
  reviews: ReviewsSchema.optional(),
}).strict();

function deriveStreak(lessons: Record<string, LessonProgress>): SaveData['streak'] {
  const dates = [...new Set(
    Object.values(lessons).flatMap((progress) =>
      progress.attempts.map((attempt) => attempt.date),
    ),
  )].sort();
  if (dates.length === 0) return { lastActiveDate: '', count: 0 };

  const lastActiveDate = dates[dates.length - 1]!;
  let count = 1;
  for (let index = dates.length - 1; index > 0; index -= 1) {
    if (dayDiff(dates[index - 1]!, dates[index]!) !== 1) break;
    count += 1;
  }
  return { lastActiveDate, count };
}

const SaveDataSchema = z.object({
  version: z.literal(1),
  settings: SettingsSchema,
  lessons: z.record(LessonProgressSchema),
  streak: z.object({
    lastActiveDate: z.union([z.literal(''), IsoDateSchema]),
    count: z.number().int().min(0).max(36_600),
  }).strict(),
  parentChecked: z.record(z.boolean()),
  reviews: ReviewsSchema.optional(),
}).strict().superRefine((save, context) => {
  const maximumPossible = deriveStreak(save.lessons);
  const validEmpty = maximumPossible.count === 0 &&
    save.streak.lastActiveDate === '' &&
    save.streak.count === 0;
  const validActive = maximumPossible.count > 0 &&
    save.streak.lastActiveDate === maximumPossible.lastActiveDate &&
    save.streak.count >= 1 &&
    // A late, older-dated attempt is recorded but deliberately does not retroactively
    // increase the live streak. It can therefore be below the history-derived maximum.
    save.streak.count <= maximumPossible.count;
  if (!validEmpty && !validActive) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['streak'],
      message: `streak must end on the latest attempt date with a consistent count (maximum ${maximumPossible.count})`,
    });
  }
  for (const [key, record] of Object.entries(save.reviews ?? {})) {
    const lessonId = key.slice(0, key.indexOf(':'));
    const lesson = findLesson(lessonId)?.lesson;
    const question = lesson?.quiz.pool.find((item) => item.id === record.questionId);
    if (save.lessons[lessonId]?.status !== 'passed' || !question || reviewKey(lessonId, question.conceptTag) !== key) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['reviews', key],
        message: 'review must reference a question and concept in a passed catalog lesson',
      });
    }
  }
});

function canonicalizeLegacyV1(value: unknown): SaveData {
  const legacy = LegacyV1SaveSchema.parse(value);
  const lessons: Record<string, LessonProgress> = Object.fromEntries(
    Object.entries(legacy.lessons).map(([lessonId, progress]) => {
      const bestScore = Math.max(...progress.attempts.map(({ score }) => score));
      return [lessonId, {
        attempts: progress.attempts,
        bestScore,
        status: progress.attempts.some(({ score }) => score >= PASS_THRESHOLD)
          ? 'passed' as const
          : 'in-progress' as const,
      }];
    }),
  );
  const maximum = deriveStreak(lessons);
  const streak = maximum.count === 0
    ? { lastActiveDate: '', count: 0 }
    : {
        lastActiveDate: maximum.lastActiveDate,
        count: Math.max(1, Math.min(legacy.streak.count, maximum.count)),
      };
  return SaveDataSchema.parse({ ...legacy, lessons, streak });
}

class UnsupportedSaveVersionError extends Error {
  constructor(version: unknown) {
    super(`unsupported save version: ${String(version)}`);
  }
}

/**
 * Version-dispatch boundary for stored/imported data. New migrations belong in this
 * switch; current v1 exports pass through unchanged after strict invariant validation.
 */
export function migrateSave(value: unknown): SaveData {
  if (typeof value !== 'object' || value === null || !('version' in value)) {
    return SaveDataSchema.parse(value);
  }
  const version = (value as { version?: unknown }).version;
  switch (version) {
    case 1:
      return canonicalizeLegacyV1(value);
    default:
      throw new UnsupportedSaveVersionError(version);
  }
}

export type LoadSaveResult = {
  save: SaveData;
  issue: string | null;
  storageReadable: boolean;
};

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
    window.localStorage.setItem(STORAGE_PROBE_KEY, '1');
    window.localStorage.removeItem(STORAGE_PROBE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function loadSaveResult(): LoadSaveResult {
  let raw: string | null;
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return {
        save: defaultSave(),
        issue: 'Browser storage is unavailable, so progress is saved only while this tab is open.',
        storageReadable: false,
      };
    }
    // Reads are intentionally independent of write availability. A full or read-only
    // store can still contain the learner's valid save and must never hide it.
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return {
      save: defaultSave(),
      issue: 'Browser storage could not be read, so progress is saved only while this tab is open.',
      storageReadable: false,
    };
  }

  if (raw === null) return { save: defaultSave(), issue: null, storageReadable: true };

  try {
    return { save: migrateSave(JSON.parse(raw)), issue: null, storageReadable: true };
  } catch (error) {
    return {
      save: defaultSave(),
      issue:
        error instanceof UnsupportedSaveVersionError
          ? 'Stored progress uses an unsupported version and was not loaded.'
          : 'Stored progress is invalid and was not loaded.',
      storageReadable: true,
    };
  }
}

export function loadSave(): SaveData {
  return loadSaveResult().save;
}

/** Returns whether this specific save write succeeded; quota/private-mode failures never throw. */
export function persist(save: SaveData): boolean {
  try {
    const valid = migrateSave(save);
    // This real write is authoritative. A temporary probe could fail under quota even
    // when overwriting the existing save key is still permitted.
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
    return true;
  } catch {
    return false;
  }
}

/** Day difference (UTC) between two yyyy-mm-dd strings, from -> to. */
function dayDiff(from: string, to: string): number {
  const fromUtc = dateUtc(from);
  const toUtc = dateUtc(to);
  if (fromUtc === null || toUtc === null) return Number.NaN;
  return Math.round((toUtc - fromUtc) / 86_400_000);
}

export function recordAttempt(
  save: SaveData,
  lessonId: string,
  attempt: Attempt,
  passThreshold: number,
): SaveData {
  const parsedAttempt = AttemptSchema.parse(attempt);
  if (passThreshold !== PASS_THRESHOLD) {
    throw new Error(`passThreshold must be ${PASS_THRESHOLD}`);
  }
  const existing = save.lessons[lessonId];
  const attempts = existing ? [...existing.attempts, parsedAttempt] : [parsedAttempt];
  const bestScore = Math.max(...attempts.map((item) => item.score));
  const everPassed = attempts.some((item) => item.score >= passThreshold);

  const lessonProgress: LessonProgress = {
    status: everPassed ? 'passed' : 'in-progress',
    bestScore,
    attempts,
  };

  const lessons = { ...save.lessons, [lessonId]: lessonProgress };
  const diff = save.streak.lastActiveDate
    ? dayDiff(save.streak.lastActiveDate, parsedAttempt.date)
    : Number.NaN;
  const streak = !save.streak.lastActiveDate
    ? { lastActiveDate: parsedAttempt.date, count: 1 }
    : diff < 0
      ? save.streak
      : diff === 0
        ? { lastActiveDate: parsedAttempt.date, count: save.streak.count }
        : diff === 1
          ? { lastActiveDate: parsedAttempt.date, count: save.streak.count + 1 }
          : { lastActiveDate: parsedAttempt.date, count: 1 };

  let reviews = save.reviews;
  for (const conceptTag of parsedAttempt.missedConceptTags) {
    const key = reviewKey(lessonId, conceptTag);
    const review = reviews?.[key];
    // A later quiz miss, including one on the review day, is fresh evidence. An older
    // calendar-dated quiz still belongs in attempt history without replacing newer recall.
    if (review && parsedAttempt.date >= reviewEvidenceDate(review)) {
      reviews = { ...reviews, [key]: {
        date: parsedAttempt.date, questionId: review.questionId, correct: false, level: 0,
      } };
    }
  }

  return {
    ...save,
    lessons,
    ...(reviews ? { reviews } : {}),
    // A clock that moves backward records learning without rewinding the live streak.
    streak,
  };
}

export function setParentChecked(save: SaveData, lessonId: string, checked: boolean): SaveData {
  return {
    ...save,
    parentChecked: { ...save.parentChecked, [lessonId]: checked },
  };
}

export function recordReview(save: SaveData, answer: ReviewAnswer): SaveData {
  const parsed = ReviewAnswerSchema.parse(answer);
  const progress = save.lessons[parsed.lessonId];
  // A reset/import may occur while a practice screen still holds an earlier question.
  if (progress?.status !== 'passed') return save;
  const lesson = findLesson(parsed.lessonId)?.lesson;
  if (!lesson?.quiz.pool.some((question) => question.id === parsed.questionId && question.conceptTag === parsed.conceptTag)) {
    throw new Error('review answer must belong to its lesson and concept');
  }
  const key = reviewKey(parsed.lessonId, parsed.conceptTag);
  const previous = save.reviews?.[key];
  const next = nextReviewRecord(progress, previous, parsed);
  return !next || next === previous ? save : { ...save, reviews: { ...save.reviews, [key]: next } };
}

export function exportSave(save: SaveData): string {
  return JSON.stringify(migrateSave(save), null, 2);
}

export function importSave(json: string): SaveData {
  try {
    return migrateSave(JSON.parse(json));
  } catch {
    throw new Error('invalid save file');
  }
}
