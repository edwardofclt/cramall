import type { Lesson, Question, Subject } from '../content/schema';
import type { SaveData } from '../progress/storage';
import { calendarDay, latestAttempt, reviewDueDay, reviewEvidenceDate, reviewKey } from './model';

export type ReviewItem = { lesson: Lesson; question: Question; reason: string };

type Candidate = {
  key: string;
  lesson: Lesson;
  question: Question;
  lessonIndex: number;
  dueDay: number;
  due: boolean;
  weak: boolean;
};

function candidates(save: SaveData, subject: Subject, today: string, beforeLessonId?: string): Candidate[] {
  const day = calendarDay(today);
  if (day === null) return [];
  const lessons = subject.units.flatMap((unit) => unit.lessons);
  const beforeIndex = beforeLessonId === undefined ? lessons.length : lessons.findIndex((lesson) => lesson.id === beforeLessonId);
  if (beforeIndex < 0) return [];
  return lessons.slice(0, beforeIndex).flatMap((lesson, lessonIndex) => {
    const progress = save.lessons[lesson.id];
    if (progress?.status !== 'passed') return [];
    const quiz = latestAttempt(progress);
    if (!quiz || quiz.date > today) return [];
    const groups = new Map<string, Question[]>();
    for (const question of lesson.quiz.pool) {
      if (!lesson.learnCards.some((card) => card.id === question.reviewCardId)) continue;
      const group = groups.get(question.conceptTag) ?? [];
      group.push(question);
      groups.set(question.conceptTag, group);
    }
    return [...groups].flatMap(([conceptTag, questions]) => {
      const key = reviewKey(lesson.id, conceptTag);
      const review = save.reviews?.[key];
      if (review && reviewEvidenceDate(review) > today) return [];
      const dueDay = reviewDueDay(progress, review);
      if (dueDay === null) return [];
      const previousIndex = questions.findIndex((question) => question.id === review?.questionId);
      const question = questions[(previousIndex + 1) % questions.length]!;
      const weak = review && reviewEvidenceDate(review) >= quiz.date
        ? !review.correct : quiz.missedConceptTags.includes(conceptTag);
      return [{ key, lesson, question, lessonIndex, dueDay, due: dueDay <= day, weak }];
    });
  });
}

function compareDue(a: Candidate, b: Candidate): number {
  return Number(b.weak) - Number(a.weak) || a.dueDay - b.dueDay || a.lessonIndex - b.lessonIndex;
}

/** One relevant foundation, then due weak material with a spread across earlier lessons. */
export function selectReview(save: SaveData, subject: Subject, today: string, beforeLessonId?: string, limit = 3): ReviewItem[] {
  if (!Number.isFinite(limit) || limit < 1) return [];
  const available = candidates(save, subject, today, beforeLessonId);
  const selected: ReviewItem[] = [];
  const selectedKeys = new Set<string>();
  const selectedLessons = new Set<string>();
  const selectedQuestions = new Set<string>();
  const choose = (candidate: Candidate, reason: string) => {
    selected.push({ lesson: candidate.lesson, question: candidate.question, reason });
    selectedKeys.add(candidate.key);
    selectedLessons.add(candidate.lesson.id);
    selectedQuestions.add(candidate.question.id);
  };

  if (beforeLessonId !== undefined) {
    const unit = subject.units.find((item) => item.lessons.some((lesson) => lesson.id === beforeLessonId));
    const lesson = unit?.lessons.find((item) => item.id === beforeLessonId);
    const tags = new Set(lesson?.quiz.pool.map((question) => question.conceptTag));
    const relevance = (item: Candidate) => tags.has(item.question.conceptTag) ? 3
      : item.lesson.unitId === unit?.id ? 2
        : unit?.prerequisiteUnitIds.includes(item.lesson.unitId) ? 1 : 0;
    const relevant = available.filter((item) => relevance(item) > 0).sort((a, b) =>
      relevance(b) - relevance(a) || b.lessonIndex - a.lessonIndex || compareDue(a, b));
    if (relevant[0]) choose(relevant[0], 'Build on an idea from an earlier lesson.');
  }

  while (selected.length < Math.floor(limit)) {
    const remaining = available.filter((item) => !selectedKeys.has(item.key) && !selectedQuestions.has(item.question.id));
    const due = remaining.filter((item) => item.due);
    const pool = due.length > 0 ? due : beforeLessonId !== undefined ? remaining : [];
    pool.sort((a, b) => Number(selectedLessons.has(a.lesson.id)) - Number(selectedLessons.has(b.lesson.id)) || compareDue(a, b));
    const next = pool[0];
    if (!next) break;
    choose(next, next.weak ? 'Revisit an idea you are still practicing.'
      : next.due ? 'Bring an older idea back to mind.' : 'Keep an earlier idea fresh.');
  }
  return selected;
}

export function dueConceptCount(save: SaveData, subject: Subject, today: string): number {
  return candidates(save, subject, today).filter((item) => item.due).length;
}
