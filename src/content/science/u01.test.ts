import { describe, expect, test } from 'vitest';
import { validateLesson, type Question } from '../schema';
import { unit01Lessons } from './u01';

const expectedLessons = [
  {
    id: 'science-u01-l01',
    title: "Speed and an Object's Energy",
    indicatorCodes: ['4-PS3-1'],
  },
  {
    id: 'science-u01-l02',
    title: 'Explain Speed and Energy with Evidence',
    indicatorCodes: ['4-PS3-1'],
  },
  {
    id: 'science-u01-l03',
    title: 'Ask Questions About Collisions',
    indicatorCodes: ['4-PS3-3'],
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

function visibleOptions(question: Question): Array<{ id: string; text: string }> {
  if ('choices' in question) return question.choices;
  if ('items' in question) return question.items;
  return question.acceptedAnswers.map((text, index) => ({ id: `accepted-${index}`, text }));
}

function lessonProse(lesson: (typeof unit01Lessons)[number]): string {
  return [
    lesson.title,
    ...lesson.intro.map(({ text }) => text),
    ...lesson.learnCards.flatMap((card) => [
      card.title,
      ...card.blocks.map(({ text }) => text),
    ]),
    lesson.workedExample.title,
    ...lesson.workedExample.steps,
    ...lesson.quiz.pool.flatMap((question) => [
      question.prompt,
      question.explanation,
      ...visibleOptions(question).map(({ text }) => text),
    ]),
  ].join('\n');
}

describe('Science unit 1 energy and motion lessons', () => {
  test('exports the exact requested lessons and standards metadata', () => {
    expect(
      unit01Lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes })),
    ).toEqual(expectedLessons);

    for (const lesson of unit01Lessons) {
      expect(lesson.unitId).toBe('science-u01');
      expect(lesson.intro).toHaveLength(4);
      expect(lesson.intro.every(({ speaker }) => speaker === 'sandy')).toBe(true);
    }
  });

  test('keeps every lesson schema-valid, widget-free, and canonically numbered', () => {
    for (const lesson of unit01Lessons) {
      expect(validateLesson(lesson)).toEqual([]);
      expect(lesson.learnCards).toHaveLength(3);
      expect(lesson.learnCards.map(({ id }) => id)).toEqual(
        Array.from({ length: 3 }, (_, index) => `${lesson.id}-c${index + 1}`),
      );
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

  test('maps one unique concept tag to each card and targets every card', () => {
    for (const lesson of unit01Lessons) {
      const cardByTag = new Map<string, string>();
      for (const question of lesson.quiz.pool) {
        const existing = cardByTag.get(question.conceptTag);
        if (existing === undefined) cardByTag.set(question.conceptTag, question.reviewCardId);
        else expect(question.reviewCardId).toBe(existing);
      }

      expect(cardByTag.size).toBe(3);
      expect(new Set(cardByTag.values()).size).toBe(cardByTag.size);
      expect(new Set(cardByTag.values())).toEqual(new Set(lesson.learnCards.map(({ id }) => id)));
    }
  });

  test('uses varied question types and keeps every visible option unique', () => {
    for (const lesson of unit01Lessons) {
      expect(new Set(lesson.quiz.pool.map(({ type }) => type))).toEqual(
        new Set(['multiple-choice', 'true-false']),
      );

      for (const question of lesson.quiz.pool) {
        const options = visibleOptions(question);
        expect(new Set(options.map(({ id }) => id)).size).toBe(options.length);
        expect(new Set(options.map(({ text }) => normalizedVisibleText(text))).size).toBe(
          options.length,
        );
      }
    }
  });

  test('stays within the qualitative energy and collision assessment boundary', () => {
    const prose = unit01Lessons.map(lessonProse).join('\n');

    expect(prose).not.toMatch(/\b(?:joules?|newtons?|acceleration)\b/i);
    expect(prose).not.toMatch(/\b\d+(?:\.\d+)?\s*(?:m\/s|meters? per second)\b/i);
    expect(prose).not.toMatch(/\b(?:app|simulation)\s+(?:showed|proved|provided evidence)\b/i);
    expect(prose).not.toMatch(/calculate (?:the )?(?:energy|force)/i);
  });

  test('balances multiple-choice correct-option positions within each lesson', () => {
    for (const lesson of unit01Lessons) {
      const keys = lesson.quiz.pool
        .filter((question) => question.type === 'multiple-choice')
        .map((question) => question.correctChoiceId);
      const counts = new Map<string, number>();
      for (const key of keys) counts.set(key, (counts.get(key) ?? 0) + 1);

      expect([...counts.keys()].sort()).toEqual(['a', 'b', 'c', 'd']);
      expect(Math.max(...counts.values()) - Math.min(...counts.values())).toBeLessThanOrEqual(1);
    }
  });
});
