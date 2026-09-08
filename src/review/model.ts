import { z } from 'zod';
import type { Attempt, LessonProgress } from '../progress/storage';

const INTERVAL_DAYS = [1, 3, 7, 14, 30] as const;
const DAY_MS = 86_400_000;

/** Calendar labels are converted to UTC day numbers, never elapsed local hours. */
export function calendarDay(value: string): number | null {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!parts) return null;
  const year = Number(parts[1]);
  const month = Number(parts[2]);
  const day = Number(parts[3]);
  if (year < 2000 || year > 2100) return null;
  const utc = Date.UTC(year, month - 1, day);
  const date = new Date(utc);
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
    ? utc / DAY_MS : null;
}

const ReviewDateSchema = z.string().refine((value) => calendarDay(value) !== null, {
  message: 'expected a real yyyy-mm-dd date from 2000 through 2100',
});
const IdentitySchema = z.string().min(1).max(100);

export const ReviewRecordSchema = z.object({
  date: ReviewDateSchema,
  lastAnsweredDate: ReviewDateSchema.optional(),
  questionId: IdentitySchema,
  correct: z.boolean(),
  level: z.number().int().min(0).max(INTERVAL_DAYS.length - 1),
}).strict().refine((record) => record.correct || record.level === 0, {
  message: 'a missed review must return to the one-day interval',
}).refine((record) => !record.lastAnsweredDate || record.lastAnsweredDate >= record.date, {
  message: 'last answer date cannot precede scheduled evidence',
});

export const ReviewAnswerSchema = z.object({
  lessonId: IdentitySchema,
  conceptTag: IdentitySchema,
  questionId: IdentitySchema,
  date: ReviewDateSchema,
  correct: z.boolean(),
}).strict();

/** Date/outcome/level describe scheduled evidence; early practice also retains its observation date. */
export type ReviewRecord = z.infer<typeof ReviewRecordSchema>;
export type ReviewAnswer = z.infer<typeof ReviewAnswerSchema>;

export function reviewKey(lessonId: string, conceptTag: string): string {
  return `${lessonId}:${conceptTag}`;
}

/** Older records need no extra date until early practice occurs on a later day. */
export function reviewEvidenceDate(record: ReviewRecord): string {
  return record.lastAnsweredDate ?? record.date;
}

/** The latest calendar date wins after clock rollback; the latest appended attempt wins ties. */
export function latestAttempt(progress: LessonProgress): Attempt | undefined {
  return progress.attempts.reduce<Attempt | undefined>((latest, attempt) =>
    !latest || attempt.date >= latest.date ? attempt : latest, undefined);
}

function reviewSchedule(progress: LessonProgress, record?: ReviewRecord): { date: string; level: number } | undefined {
  const quiz = latestAttempt(progress);
  if (record && (!quiz || reviewEvidenceDate(record) >= quiz.date)) return record;
  return quiz ? { date: quiz.date, level: 0 } : undefined;
}

export function reviewDueDay(progress: LessonProgress, record?: ReviewRecord): number | null {
  const schedule = reviewSchedule(progress, record);
  if (!schedule) return null;
  const anchor = calendarDay(schedule.date);
  return anchor === null ? null : anchor + INTERVAL_DAYS[schedule.level]!;
}

export function nextReviewRecord(
  progress: LessonProgress, previous: ReviewRecord | undefined, answer: ReviewAnswer,
): ReviewRecord | undefined {
  const schedule = reviewSchedule(progress, previous);
  if (!schedule || answer.date < schedule.date || (previous && answer.date < reviewEvidenceDate(previous))) return previous;
  const due = reviewDueDay(progress, previous)!;
  const earlySuccess = answer.correct && calendarDay(answer.date)! < due;
  if (earlySuccess && previous && schedule === previous) {
    // Keep the due date and any same-day miss intact, but avoid repeating the same variant.
    if (previous.questionId === answer.questionId && reviewEvidenceDate(previous) === answer.date) return previous;
    return {
      ...previous,
      questionId: answer.questionId,
      ...(answer.date > previous.date ? { lastAnsweredDate: answer.date } : {}),
    };
  }
  // If a newer quiz supplied the baseline, replace the obsolete review anchor even for
  // same-day practice. Otherwise that old interval could become active again.
  return {
    date: answer.date,
    questionId: answer.questionId,
    correct: answer.correct,
    level: answer.correct && !earlySuccess ? Math.min(schedule.level + 1, INTERVAL_DAYS.length - 1) : 0,
  };
}
