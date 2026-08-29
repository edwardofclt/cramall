import { describe, expect, test } from 'vitest';
import { validateLesson, type Question } from '../schema';
import { unit01Lessons } from './u01';

const expectedLessons = [
  {
    id: 'reading-u01-l01',
    title: 'Read Accurately at a Good Pace',
  },
  {
    id: 'reading-u01-l02',
    title: 'Read with Expression and Intonation',
  },
] as const;

function normalizedVisibleText(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('en-US')
    .replace(/,/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

function visibleAnswers(question: Question): Array<{ id: string; text: string }> {
  if ('choices' in question) return question.choices;
  if ('items' in question) return question.items;
  return question.acceptedAnswers.map((text, index) => ({ id: `accepted-${index}`, text }));
}

describe('Reading unit 1 fluency lessons', () => {
  test('exports the exact two requested lessons and standards metadata', () => {
    expect(unit01Lessons.map(({ id, title }) => ({ id, title }))).toEqual(expectedLessons);

    for (const lesson of unit01Lessons) {
      expect(lesson.unitId).toBe('reading-u01');
      expect(lesson.indicatorCodes).toEqual(['ELA.4.F.4.2']);
      expect(lesson.intro).toHaveLength(4);
      expect(lesson.intro.every(({ speaker }) => speaker === 'winnie')).toBe(true);
    }
  });

  test('keeps the authored lesson shape schema-valid and widget-free', () => {
    for (const lesson of unit01Lessons) {
      expect(validateLesson(lesson)).toEqual([]);
      expect(lesson.learnCards).toHaveLength(3);
      expect(lesson.learnCards.every((card) => card.blocks.length >= 1)).toBe(true);
      expect(lesson.learnCards.every((card) => !('widget' in card))).toBe(true);
      expect(lesson.quiz.passThreshold).toBe(8);
      expect(lesson.quiz.pool).toHaveLength(13);
      expect(lesson.quiz.pool.map(({ id }) => id)).toEqual(
        Array.from(
          { length: 13 },
          (_, index) => `${lesson.id}-q${String(index + 1).padStart(2, '0')}`,
        ),
      );
    }
  });

  test('maps each concept tag to exactly one card and targets every card', () => {
    for (const lesson of unit01Lessons) {
      const cardByTag = new Map<string, string>();
      for (const question of lesson.quiz.pool) {
        const existing = cardByTag.get(question.conceptTag);
        if (existing === undefined) cardByTag.set(question.conceptTag, question.reviewCardId);
        else expect(question.reviewCardId).toBe(existing);
      }

      expect(new Set(cardByTag.values()).size).toBe(cardByTag.size);
      expect(new Set(cardByTag.values())).toEqual(new Set(lesson.learnCards.map(({ id }) => id)));
    }
  });

  test('uses varied question types with unique visible answer text and ids', () => {
    for (const lesson of unit01Lessons) {
      expect(new Set(lesson.quiz.pool.map(({ type }) => type)).size).toBeGreaterThanOrEqual(2);

      for (const question of lesson.quiz.pool) {
        const answers = visibleAnswers(question);
        expect(new Set(answers.map(({ id }) => id)).size).toBe(answers.length);
        expect(new Set(answers.map(({ text }) => normalizedVisibleText(text))).size).toBe(
          answers.length,
        );
      }
    }
  });
});
