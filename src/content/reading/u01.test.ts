import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { expectUnitLessons } from '../unit-test-helpers';
import { validateLesson, type LearnCard, type Question } from '../schema';
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

const expectedManifest = [
  { id: 'reading-u01-l01', unitId: 'reading-u01', title: 'Read Accurately at a Good Pace', indicatorCodes: ['ELA.4.F.4.2'] },
  { id: 'reading-u01-l02', unitId: 'reading-u01', title: 'Read with Expression and Intonation', indicatorCodes: ['ELA.4.F.4.2'] },
] as const;

const expectedPassageQuestionIds = [
  [
    'reading-u01-l01-q01',
    'reading-u01-l01-q02',
    'reading-u01-l01-q03',
    'reading-u01-l01-q04',
    'reading-u01-l01-q05',
    'reading-u01-l01-q06',
    'reading-u01-l01-q07',
    'reading-u01-l01-q08',
  ],
  [
    'reading-u01-l02-q01',
    'reading-u01-l02-q02',
    'reading-u01-l02-q03',
    'reading-u01-l02-q04',
    'reading-u01-l02-q05',
    'reading-u01-l02-q06',
    'reading-u01-l02-q07',
    'reading-u01-l02-q08',
  ],
] as const;

const passageQuestionDetailExpectations = [
  [
    ['reading-u01-l01-q01', /Pollinator.*accuracy|accuracy.*Pollinator/i],
    ['reading-u01-l01-q02', /towels.*trowels|trowels.*towels/i],
    ['reading-u01-l01-q03', /compost bin.*greenhouse|greenhouse.*compost bin/i],
    ['reading-u01-l01-q04', /traced.*route|route.*map/i],
    ['reading-u01-l01-q05', /basil.*care|care.*basil/i],
    ['reading-u01-l01-q06', /Pollinator Patch.*sign|sign.*Pollinator Patch/i],
    ['reading-u01-l01-q07', /Maya rereads the map.*changes direction/i],
    ['reading-u01-l01-q08', /Maya and Eli.*garden team|garden team.*Maya and Eli/i],
  ],
  [
    ['reading-u01-l02-q01', /lighthouse can still see us|curious.*question/i],
    ['reading-u01-l02-q02', /There it is.*relief|relief.*There it is/i],
    ['reading-u01-l02-q03', /quiet fog.*excited exclamation|excited exclamation.*quiet fog/i],
    ['reading-u01-l02-q04', /^(?=[\s\S]*pale beam)(?=[\s\S]*beam vanish)/i],
    ['reading-u01-l02-q05', /^(?=[\s\S]*Grandfather)(?=[\s\S]*yellow line)/i],
    ['reading-u01-l02-q06', /lighthouse can still see us.*There it is|There it is.*lighthouse can still see us/i],
    ['reading-u01-l02-q07', /Grandfather.*yellow line|yellow line.*safety/i],
    ['reading-u01-l02-q08', /Tomas and Grandfather.*fog|fog.*Tomas and Grandfather/i],
  ],
] as const;

const inlineCheckExpectations = new Map([
  ['reading-u01-l01-c1', { prompt: /crab|accuracy/i, explanation: /letter.*reread/i }],
  ['reading-u01-l01-c2', { prompt: /pace|rain gauge/i, explanation: /smooth.*slow/i }],
  ['reading-u01-l01-c3', { prompt: /meaning|evidence/i, explanation: /paw prints.*evidence/i }],
  ['reading-u01-l02-c1', { prompt: /expression|at last/i, explanation: /lantern|relief/i }],
  ['reading-u01-l02-c2', { prompt: /intonation|question/i, explanation: /rise|question mark/i }],
  ['reading-u01-l02-c3', { prompt: /reflection|text clue/i, explanation: /clue.*voice.*meaning/i }],
]);

type InlineCheckSequenceExpectation = {
  prompt: RegExp;
  correctChoice: RegExp;
  explanation: RegExp;
  future: RegExp;
};

const inlineCheckSequenceExpectations = new Map<string, InlineCheckSequenceExpectation>([
  ['reading-u01-l01-c1', {
    prompt: /tiny crab|crab.*cap/i,
    correctChoice: /crab/i,
    explanation: /crab/i,
    future: /Maya|trowels|towels|garden|basil|compost|greenhouse|butterfly|Pollinator|Eli/i,
  }],
  ['reading-u01-l01-c2', {
    prompt: /rain gauge/i,
    correctChoice: /rain.?gauge/i,
    explanation: /rain.?gauge/i,
    future: /Maya|trowels|towels|garden|basil|compost|greenhouse|butterfly|Pollinator|Eli/i,
  }],
  ['reading-u01-l01-c3', {
    prompt: /muddy.?paw|dog bed/i,
    correctChoice: /muddy paw|dog bed/i,
    explanation: /muddy paw/i,
    future: /Maya|trowels|towels|garden|basil|compost|greenhouse|butterfly|Pollinator|Eli|map/i,
  }],
  ['reading-u01-l02-c1', {
    prompt: /lantern|at last/i,
    correctChoice: /lantern|at last/i,
    explanation: /lantern|at last/i,
    future: /Tomas|lighthouse|harbor|fog|Grandfather|beam|yellow line|compass|There it is/i,
  }],
  ['reading-u01-l02-c2', {
    prompt: /trail/i,
    correctChoice: /trail/i,
    explanation: /trail/i,
    future: /Tomas|lighthouse|harbor|fog|Grandfather|beam|yellow line|compass|There it is/i,
  }],
  ['reading-u01-l02-c3', {
    prompt: /text clue|voice choice|meaning connection/i,
    correctChoice: /at last|text clue/i,
    explanation: /at last/i,
    future: /Tomas|lighthouse|harbor|fog|Grandfather|beam|yellow line|compass|There it is/i,
  }],
]);

function quizPassage(lesson: (typeof unit01Lessons)[number]): string {
  expect(lesson.quiz.reference?.title).toBe('Read this passage');
  return lesson.quiz.reference?.text ?? '';
}

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
    expectUnitLessons(unit01Lessons, expectedManifest, 'reading');

    for (const lesson of unit01Lessons) {
      expect(lesson.unitId).toBe('reading-u01');
      expect(lesson.indicatorCodes).toEqual(['ELA.4.F.4.2']);
      expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
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

  test('gives each lesson an original persistent 150–250-word passage and a passage-dependent quiz majority', () => {
    const passages = unit01Lessons.map(quizPassage);

    expect(new Set(passages).size).toBe(unit01Lessons.length);
    for (const passage of passages) {
      const wordCount = passage.trim().split(/\s+/).length;
      expect(wordCount).toBeGreaterThanOrEqual(150);
      expect(wordCount).toBeLessThanOrEqual(250);
    }

    for (const [index, lesson] of unit01Lessons.entries()) {
      const passage = passages[index]!;
      expect(lesson.workedExample.passage).toEqual({
        title: 'Original passage',
        text: passage,
      });
      expect(lesson.workedExample.steps).not.toContainEqual(expect.stringContaining(passage));
      expect(lesson.workedExample.steps).toHaveLength(3);
      const passageQuestions = lesson.quiz.pool.filter(({ id }) =>
        expectedPassageQuestionIds[index].some((passageQuestionId) => passageQuestionId === id),
      );
      expect(passageQuestions.map(({ id }) => id)).toEqual(expectedPassageQuestionIds[index]);
      expect(passageQuestions).toHaveLength(8);
      expect(lesson.quiz.pool.every(({ prompt }) => !prompt.includes(passage))).toBe(true);
      expect(passageQuestions.every(({ prompt }) => /what|which|true or false|how|why/i.test(prompt))).toBe(true);

      for (const [questionId, detail] of passageQuestionDetailExpectations[index]!) {
        const question = lesson.quiz.pool.find(({ id }) => id === questionId);
        expect(question).toBeDefined();
        if (!question) continue;
        const questionContent = [question.prompt, correctChoiceText(question), question.explanation].join('\n');
        expect(questionContent).toMatch(detail);
      }
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

  test('gives every learn card a substantive, concept-relevant unscored check', () => {
    const cards: LearnCard[] = unit01Lessons.flatMap((lesson) => lesson.learnCards);
    expect(cards.map(({ id }) => id)).toEqual([...inlineCheckExpectations.keys()]);

    for (const card of cards) {
      const expected = inlineCheckExpectations.get(card.id);
      const check = card.check;
      expect(expected).toBeDefined();
      expect(check).toBeDefined();
      if (!check || !expected) continue;

      expect(check.choices.length).toBeGreaterThanOrEqual(3);
      expect(check.choices.some(({ id }) => id === check.correctChoiceId)).toBe(true);
      expect(new Set(check.choices.map(({ id }) => id)).size).toBe(check.choices.length);
      expect(new Set(check.choices.map(({ text }) => normalizedVisibleText(text))).size).toBe(
        check.choices.length,
      );
      expect(check.prompt).toMatch(expected.prompt);
      expect(check.explanation).toMatch(expected.explanation);
    }
  });

  test('keeps each inline check grounded in material presented before that check', () => {
    for (const lesson of unit01Lessons) {
      for (const card of lesson.learnCards) {
        const expected = inlineCheckSequenceExpectations.get(card.id);
        const check = card.check;
        expect(expected).toBeDefined();
        expect(check).toBeDefined();
        if (!expected || !check) continue;

        const cardIndex = lesson.learnCards.indexOf(card);
        const availableMaterial = lesson.learnCards
          .slice(0, cardIndex + 1)
          .flatMap(({ blocks }) => blocks.map(({ text }) => text))
          .join('\n');
        expect(availableMaterial).toMatch(expected.prompt);
        expect(availableMaterial).toMatch(expected.correctChoice);
        expect(availableMaterial).toMatch(expected.explanation);

        const fields = [
          ['prompt', check.prompt],
          ['correct choice', check.choices.find(({ id }) => id === check.correctChoiceId)?.text ?? ''],
          ['explanation', check.explanation],
          ...check.choices.map(({ id, text }) => [`choice ${id}`, text]),
        ] as const;
        for (const [field, text] of fields) {
          expect(text, `${card.id} ${field}`).not.toMatch(expected.future);
        }

        expect(check.prompt).toMatch(expected.prompt);
        expect(check.choices.find(({ id }) => id === check.correctChoiceId)?.text ?? '').toMatch(
          expected.correctChoice,
        );
        expect(check.explanation).toMatch(expected.explanation);

        if (card.id === 'reading-u01-l02-c3') {
          expect(availableMaterial).toMatch(/at last/i);
          expect(check.explanation).toMatch(/at last/i);
        }
      }
    }
  });

  test('frames fluency practice as independent app work that never scores a student voice', () => {
    const learnerFacingText = unit01Lessons.flatMap((lesson) => [
      ...lesson.learnCards.flatMap((card) => [
        card.title,
        ...card.blocks.map(({ text }) => text),
        card.check?.prompt ?? '',
        card.check?.explanation ?? '',
        ...(card.check?.choices.map(({ text }) => text) ?? []),
      ]),
      ...lesson.quiz.pool.flatMap((question) => [
        question.prompt,
        question.explanation,
        ...visibleAnswers(question).map(({ text }) => text),
      ]),
    ]).join('\n');

    expect(learnerFacingText).not.toMatch(/\bpartner\b|take turns|live collaboration|record yourself/i);
    expect(learnerFacingText).toMatch(/Read aloud/i);
    expect(learnerFacingText).toMatch(/app.*does not listen to or score.*voice/i);
    expect(learnerFacingText).toMatch(/self-reflection|reflection/i);
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
    const sequenceQuestion = expressionLesson.quiz.pool[3];
    const practiceQuestion = expressionLesson.quiz.pool[9];
    const accuracyInference = accuracyLesson.workedExample.steps[
      accuracyLesson.workedExample.steps.length - 1
    ] ?? '';

    expect(accuracyQuestion.conceptTag).toBe('reading-accuracy');
    expect(accuracyQuestion.reviewCardId).toBe('reading-u01-l01-c1');
    expect(correctChoiceText(accuracyQuestion)).toMatch(/check.*letter.*reread/i);

    expect(intonationQuestion.conceptTag).toBe('intonation-and-punctuation');
    expect(intonationQuestion.reviewCardId).toBe('reading-u01-l02-c2');

    expect(sequenceQuestion.conceptTag).toBe('expressive-practice');
    expect(sequenceQuestion.reviewCardId).toBe('reading-u01-l02-c3');

    expect(accuracyInference).toMatch(/why Maya rereads the map/i);
    expect(accuracyInference).toMatch(/careful reading helped the team/i);
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
