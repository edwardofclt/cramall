import { describe, expect, test } from 'vitest';
import { PLANNED_LESSONS } from './curriculum';
import { validateLesson, type Question } from './schema';
import { allLessons, findLesson } from './subjects';
import {
  buildResult,
  gradeAnswer,
  normalizeText,
  sampleQuiz,
  type Answer,
} from '../quiz/engine';

function makeLcg(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function representativeWrongSortAnswers(values: readonly string[]): string[][] {
  const candidates: string[][] = [];
  for (let index = 0; index < values.length - 1; index += 1) {
    candidates.push([
      ...values.slice(0, index),
      values[index + 1]!,
      values[index]!,
      ...values.slice(index + 2),
    ]);
  }
  candidates.push([...values].reverse());

  const seen = new Set<string>();
  return candidates.filter((candidate) => {
    if (!candidate.some((id, index) => id !== values[index])) return false;
    const key = JSON.stringify(candidate);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function correctAnswers(question: Question): Answer[] {
  switch (question.type) {
    case 'multiple-choice':
    case 'true-false':
      return [question.correctChoiceId];
    case 'fill-blank':
      return [...question.acceptedAnswers];
    case 'sort':
      return [[...question.correctOrder]];
  }
}

function incorrectAnswers(question: Question): Answer[] {
  switch (question.type) {
    case 'multiple-choice':
    case 'true-false':
      return question.choices
        .filter(({ id }) => id !== question.correctChoiceId)
        .map(({ id }) => id);
    case 'fill-blank': {
      const accepted = new Set(question.acceptedAnswers.map(normalizeText));
      let candidate = '__cramall_wrong__';
      while (accepted.has(normalizeText(candidate))) candidate += '_x';
      return [candidate];
    }
    case 'sort':
      return representativeWrongSortAnswers(question.correctOrder);
  }
}

describe('deterministic full-catalog lesson audit', () => {
  const lessons = allLessons();
  const auditSummary = {
    lessons: lessons.length,
    cards: lessons.reduce((count, lesson) => count + lesson.learnCards.length, 0),
    questions: lessons.reduce((count, lesson) => count + lesson.quiz.pool.length, 0),
    widgets: lessons.reduce(
      (count, lesson) => count + lesson.learnCards.filter(({ widget }) => widget !== undefined).length,
      0,
    ),
  };

  test('audits the complete manifest without snapshots', () => {
    expect(lessons.map(({ id }) => id), JSON.stringify(auditSummary)).toEqual(
      PLANNED_LESSONS.map(({ id }) => id),
    );
    expect(auditSummary, JSON.stringify(auditSummary)).toMatchObject({
      lessons: 119,
      cards: 357,
      questions: 1_547,
    });
  });

  test('samples, grades, and resolves review links for every lesson', () => {
    lessons.forEach((lesson, lessonIndex) => {
      expect(validateLesson(lesson), lesson.id).toEqual([]);
      const sampled = sampleQuiz(lesson.quiz.pool, 10, makeLcg(lessonIndex + 1));
      expect(sampled).toHaveLength(10);
      expect(new Set(sampled.map(({ id }) => id)).size).toBe(10);

      const cardIds = new Set(lesson.learnCards.map(({ id }) => id));
      expect(new Set(lesson.quiz.pool.map(({ reviewCardId }) => reviewCardId))).toEqual(cardIds);

      for (const question of lesson.quiz.pool) {
        for (const answer of correctAnswers(question)) {
          expect(gradeAnswer(question, answer), `${question.id} correct`).toBe(true);
        }

        const wrong = incorrectAnswers(question);
        expect(wrong.length, `${question.id} wrong-answer coverage`).toBeGreaterThan(0);
        for (const answer of wrong) {
          expect(gradeAnswer(question, answer), `${question.id} rejects ${JSON.stringify(answer)}`)
            .toBe(false);
        }

        const result = buildResult([question], [wrong[0]!]);
        expect(result).toEqual({
          score: 0,
          total: 1,
          missed: [{
            conceptTag: question.conceptTag,
            reviewCardId: question.reviewCardId,
            count: 1,
          }],
        });
        expect(cardIds.has(result.missed[0]!.reviewCardId)).toBe(true);
        expect(findLesson(lesson.id)?.lesson.learnCards.some(
          ({ id }) => id === result.missed[0]!.reviewCardId,
        )).toBe(true);
      }
    });
  });
});
