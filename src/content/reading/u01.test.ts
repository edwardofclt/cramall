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

const expectedPassages = [
  '“Nia stepped onto the boardwalk. Beyond the reeds, a white egret lifted one wing, balanced, and dipped its beak into the shining water.”',
  '“Is that the harbor light?” Tomas asked. A golden blink answered through the fog. “We found the way!”',
] as const;

const expectedPassageQuestionIds = [
  ['reading-u01-l01-q09', 'reading-u01-l01-q10', 'reading-u01-l01-q11', 'reading-u01-l01-q12'],
  ['reading-u01-l02-q01', 'reading-u01-l02-q02', 'reading-u01-l02-q10', 'reading-u01-l02-q11'],
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

function correctChoiceText(question: Question): string {
  if (!('choices' in question)) throw new Error(`${question.id} must be a choice question`);
  return question.choices.find(({ id }) => id === question.correctChoiceId)?.text ?? '';
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

  test('gives each lesson an original readable passage and four passage-dependent checks', () => {
    const passages = unit01Lessons.map((lesson) => {
      const firstStep = lesson.workedExample.steps[0] ?? '';
      return firstStep.slice(firstStep.indexOf('“'));
    });

    expect(passages).toEqual(expectedPassages);
    expect(new Set(passages).size).toBe(unit01Lessons.length);
    for (const passage of passages) expect(passage.length).toBeGreaterThanOrEqual(90);

    for (const [index, lesson] of unit01Lessons.entries()) {
      const passage = expectedPassages[index];
      const passageQuestions = lesson.quiz.pool.filter(({ prompt }) => prompt.includes(passage));
      expect(passageQuestions.map(({ id }) => id)).toEqual(expectedPassageQuestionIds[index]);
      expect(passageQuestions.every(({ prompt }) => /what|which|true or false/i.test(prompt))).toBe(true);
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

  test('keeps the reviewed prompts, examples, and review targets semantically aligned', () => {
    const [accuracyLesson, expressionLesson] = unit01Lessons;
    const accuracyQuestion = accuracyLesson.quiz.pool[0];
    const intonationQuestion = expressionLesson.quiz.pool[0];
    const practiceQuestion = expressionLesson.quiz.pool[9];
    const accuracyInference = accuracyLesson.workedExample.steps[
      accuracyLesson.workedExample.steps.length - 1
    ] ?? '';

    expect(accuracyQuestion.conceptTag).toBe('reading-accuracy');
    expect(accuracyQuestion.reviewCardId).toBe('reading-u01-l01-c1');
    expect(correctChoiceText(accuracyQuestion)).toMatch(/check.*letter.*reread/i);

    expect(intonationQuestion.conceptTag).toBe('intonation-and-punctuation');
    expect(intonationQuestion.reviewCardId).toBe('reading-u01-l02-c2');

    expect(accuracyInference).not.toMatch(/shallow water/i);
    expect(accuracyInference).toMatch(/may.*(drinking|food)/i);
    expect(correctChoiceText(practiceQuestion)).toMatch(/read.*expression.*intonation/i);
  });

  test('no option id holds more than 60 percent of multiple-choice answer keys', () => {
    for (const lesson of unit01Lessons) {
      const keys = lesson.quiz.pool
        .filter((question) => question.type === 'multiple-choice')
        .map((question) => question.correctChoiceId);
      const counts = new Map<string, number>();
      for (const key of keys) counts.set(key, (counts.get(key) ?? 0) + 1);

      expect(Math.max(...counts.values()) / keys.length).toBeLessThanOrEqual(0.6);
    }
  });
});
