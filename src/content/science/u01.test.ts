import { describe, expect, test } from 'vitest';
import { validateLesson, type LearnCard, type Question } from '../schema';
import { gradeAnswer } from '../../quiz/engine';
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
      ...(card.check === undefined
        ? []
        : [
            card.check.prompt,
            card.check.explanation,
            ...card.check.choices.map(({ text }) => text),
          ]),
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

function inlineCheckText(card: LearnCard): string {
  if (card.check === undefined) return '';
  return [
    card.check.prompt,
    card.check.explanation,
    ...card.check.choices.map(({ text }) => text),
  ].join('\n');
}

function instructionalText(lesson: (typeof unit01Lessons)[number]): string {
  return [
    ...lesson.intro.map(({ text }) => text),
    ...lesson.learnCards.flatMap((card) => card.blocks.map(({ text }) => text)),
    ...lesson.workedExample.steps,
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

  test('attaches one scientifically accurate roller-coaster demo to each lesson', () => {
    const attached = unit01Lessons.flatMap((lesson) =>
      lesson.learnCards
        .filter((card) => card.demo !== undefined)
        .map((card) => ({ lessonId: lesson.id, cardId: card.id, demo: card.demo })),
    );

    expect(attached).toEqual([
      {
        lessonId: 'science-u01-l01',
        cardId: 'science-u01-l01-c3',
        demo: { type: 'roller-coaster', focus: 'speed-energy' },
      },
      {
        lessonId: 'science-u01-l02',
        cardId: 'science-u01-l02-c3',
        demo: { type: 'roller-coaster', focus: 'evidence' },
      },
      {
        lessonId: 'science-u01-l03',
        cardId: 'science-u01-l03-c3',
        demo: { type: 'roller-coaster', focus: 'collision' },
      },
    ]);

    expect(attached).toHaveLength(3);
    expect(attached[0]?.demo?.focus).toBe('speed-energy');
    expect(attached[1]?.demo?.focus).toBe('evidence');
    expect(attached[2]?.demo?.focus).toBe('collision');
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

  test('adds a valid, roller-coaster practice check for every Science Unit 1 card', () => {
    const expectedConcepts = new Map([
      ['science-u01-l01-c1', /fixed.*markers|speed/i],
      ['science-u01-l01-c2', /same.*car|fair comparison/i],
      ['science-u01-l01-c3', /kinetic|energy of motion/i],
      ['science-u01-l02-c1', /evidence|observation/i],
      ['science-u01-l02-c2', /reasoning/i],
      ['science-u01-l02-c3', /claim.*evidence.*reasoning/i],
      ['science-u01-l03-c1', /collision|before.*after/i],
      ['science-u01-l03-c2', /testable.*question|release height/i],
      ['science-u01-l03-c3', /prediction|predict/i],
    ]);
    const cards: LearnCard[] = unit01Lessons.flatMap((lesson) =>
      lesson.learnCards as LearnCard[],
    );

    expect(cards).toHaveLength(9);
    for (const card of cards) {
      const check = card.check;
      expect(check, `${card.id} needs a practice check`).toBeDefined();
      if (check === undefined) continue;

      expect(check.choices).toHaveLength(3);
      expect(new Set(check.choices.map(({ id }) => id)).size).toBe(check.choices.length);
      expect(new Set(check.choices.map(({ text }) => normalizedVisibleText(text))).size).toBe(
        check.choices.length,
      );
      expect(check.choices.some(({ id }) => id === check.correctChoiceId)).toBe(true);

      const text = inlineCheckText(card);
      expect(text).toMatch(/roller coaster|coaster car|marble|track|foam block/i);
      expect(text).toMatch(expectedConcepts.get(card.id)!);
      expect(text).not.toMatch(/\b(?:joules?|newtons?|acceleration)\b/i);
      expect(text).not.toMatch(/calculate (?:the )?(?:energy|force)/i);
      expect(text).not.toMatch(/reached? (?:the )?(?:bottom|finish).*?(?:first|sooner)/i);
    }
  });

  test('uses varied question types and keeps every visible option unique', () => {
    for (const lesson of unit01Lessons) {
      expect(new Set(lesson.quiz.pool.map(({ type }) => type))).toEqual(
        new Set(['multiple-choice', 'true-false', 'sort']),
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

  test('uses observable motion as evidence instead of treating energy as directly visible', () => {
    const prose = unit01Lessons.map(lessonProse).join('\n');

    expect(prose).not.toMatch(
      /\b(?:visible|observable) changes? in (?:speed and )?energy(?: of motion)?\b/i,
    );
  });

  test('teaches the unit through a detailed, recurring roller-coaster investigation', () => {
    for (const lesson of unit01Lessons) {
      const instruction = instructionalText(lesson);
      const rollerCoasterMentions = instruction.match(/roller coaster|coaster car/gi) ?? [];
      const rollerCoasterQuestions = lesson.quiz.pool.filter(({ prompt }) =>
        /roller coaster|coaster car/i.test(prompt),
      );

      expect(instruction.length).toBeGreaterThan(1_100);
      expect(rollerCoasterMentions.length).toBeGreaterThanOrEqual(3);
      expect(rollerCoasterQuestions.length).toBeGreaterThanOrEqual(3);
    }

    const [speedLesson, explanationLesson, collisionLesson] = unit01Lessons;
    expect(instructionalText(speedLesson)).toMatch(/gravitational potential energy/i);
    expect(instructionalText(speedLesson)).toMatch(/kinetic energy/i);
    expect(instructionalText(explanationLesson)).toMatch(/claim.*evidence.*reasoning/i);
    expect(instructionalText(collisionLesson)).toMatch(/energy.*transfer|transfer.*energy/i);
  });

  test('uses fixed near-bottom markers rather than whole-trip arrival time as speed evidence', () => {
    const prose = unit01Lessons.slice(0, 2).map(lessonProse).join('\n');

    expect(prose).toMatch(/two fixed markers near the bottom/i);
    expect(prose).not.toMatch(/released from the high mark reached the bottom marker first/i);
    expect(prose).not.toMatch(/higher-release trip reaches the finish marker sooner/i);
    expect(prose).not.toMatch(/reaching the same marker sooner/i);
  });

  test('assesses assembled science explanations and a testable collision question', () => {
    const expectedQuestions = [
      {
        id: 'science-u01-l01-q10',
        order: ['claim', 'evidence', 'reasoning'],
        rolePatterns: [/^Claim:/, /^Evidence:.*fixed markers.*paper flag/i, /^Reasoning:.*faster motion/i],
      },
      {
        id: 'science-u01-l02-q08',
        order: ['claim', 'evidence', 'reasoning'],
        rolePatterns: [/^Claim:/, /^Evidence:.*fixed markers.*paper gate/i, /^Reasoning:.*faster/i],
      },
      {
        id: 'science-u01-l03-q05',
        order: ['start', 'middle', 'end'],
        rolePatterns: [/^How does changing/, /^affect how far/, /^after their collision\?$/],
      },
    ];

    for (const expected of expectedQuestions) {
      const question = unit01Lessons
        .flatMap((lesson) => lesson.quiz.pool)
        .find(({ id }) => id === expected.id);
      expect(question?.type).toBe('sort');
      if (question?.type !== 'sort') throw new Error('expected a sort question');
      expect(question.correctOrder).toEqual(expected.order);
      expect(question.items.map(({ id, text }) => ({ id, text }))).toEqual(
        expected.order.map((id, index) => ({ id, text: expect.stringMatching(expected.rolePatterns[index]!) })),
      );
      expect(gradeAnswer(question, expected.order)).toBe(true);
      expect(gradeAnswer(question, [...expected.order].reverse())).toBe(false);
    }
  });

  test('describes collision energy as transfers instead of energy being used up', () => {
    const collisionInstruction = instructionalText(unit01Lessons[2]);

    expect(collisionInstruction).toMatch(/transfers to surroundings as sound and thermal \(heat\) energy/i);
    expect(collisionInstruction).not.toMatch(/change into sound or warmth/i);
  });

  test('names the potential-to-kinetic energy change in the roller-coaster explanation', () => {
    const explanationInstruction = instructionalText(unit01Lessons[1]);

    expect(explanationInstruction).toMatch(
      /gravitational potential energy changes into kinetic energy, the energy of motion/i,
    );
  });

  test('keeps Science Unit 1 learner guidance solo and self-checkable', () => {
    const prose = unit01Lessons.map(lessonProse).join('\n');
    const cerTip = unit01Lessons[1].learnCards[2].blocks.find(({ kind }) => kind === 'tip')?.text;

    expect(prose).not.toMatch(/\b(?:partner|classmate|peer|live collaboration)\b/i);
    expect(cerTip).toMatch(/Priya’s worked example/i);
    expect(cerTip).toMatch(/inline check/i);
    expect(cerTip).not.toMatch(/read aloud|listen|evaluate your speech/i);
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
