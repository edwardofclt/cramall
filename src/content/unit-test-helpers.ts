import { expect } from 'vitest';
import { READING_OE_CODES, type PlannedLesson } from './curriculum';
import { validateLesson, type Lesson, type SubjectId } from './schema';

export type PlannedUnitLesson = Pick<PlannedLesson, 'id' | 'title' | 'indicatorCodes'>;

export function expectUnitLessons(
  lessons: readonly Lesson[],
  expected: readonly PlannedUnitLesson[],
  subject: SubjectId,
): void {
  expect(lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes })))
    .toEqual(expected.map(({ id, title, indicatorCodes }) => ({
      id,
      title,
      indicatorCodes: [...indicatorCodes],
    })));

  for (const lesson of lessons) {
    expect(lesson.id.startsWith(`${subject}-`)).toBe(true);
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.learnCards).toHaveLength(3);
    expect(lesson.quiz.passThreshold).toBe(8);
    expect(lesson.quiz.pool).toHaveLength(13);
    expect(new Set(lesson.quiz.pool.map(({ id }) => id)).size).toBe(13);
    expect(new Set(lesson.quiz.pool.map(({ type }) => type)).size).toBeGreaterThanOrEqual(2);

    const cards = new Set(lesson.learnCards.map(({ id }) => id));
    const reviewCardByTag = new Map<string, string>();
    for (const question of lesson.quiz.pool) {
      expect(cards.has(question.reviewCardId)).toBe(true);
      const existing = reviewCardByTag.get(question.conceptTag);
      if (existing === undefined) reviewCardByTag.set(question.conceptTag, question.reviewCardId);
      else expect(question.reviewCardId).toBe(existing);
    }
    expect(new Set(lesson.quiz.pool.map(({ reviewCardId }) => reviewCardId))).toEqual(cards);

    if (subject === 'reading') {
      expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
      expect(lesson.indicatorCodes.some((code) => code.startsWith('ELA.4.OE.'))).toBe(false);
    } else {
      expect(lesson.crossCuttingExpectationCodes).toBeUndefined();
    }
  }
}
