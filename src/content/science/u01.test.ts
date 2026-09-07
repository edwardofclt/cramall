import { describe, expect, test } from 'vitest';
import { normalizeAnswerText } from '../answer-normalization';
import { validateLesson, type LearnCard, type Question } from '../schema';
import { buildResult, gradeAnswer } from '../../quiz/engine';
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
  {
    id: 'science-u01-l04',
    title: 'Predict Collision Energy Outcomes',
    indicatorCodes: ['4-PS3-3'],
  },
] as const;

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

  test('keeps every lesson schema-valid, canonically numbered, and on its exact widget allocation', () => {
    for (const lesson of unit01Lessons) {
      expect(validateLesson(lesson)).toEqual([]);
      expect(lesson.learnCards).toHaveLength(3);
      expect(lesson.learnCards.map(({ id }) => id)).toEqual(
        Array.from({ length: 3 }, (_, index) => `${lesson.id}-c${index + 1}`),
      );
      expect(lesson.learnCards.every((card) => card.blocks.length >= 1)).toBe(true);
      expect(lesson.learnCards.flatMap((card, index) => card.widget === undefined ? [] : [{ card: index + 1, value: card.widget }])).toEqual(
        lesson.id === 'science-u01-l04'
          ? [{ card: 2, value: { type: 'collision-ramp', config: { rampAngle: 5, massA: 2, massB: 8, speedA: 1, speedB: 1, target: 'compare-motion', controlledVariable: 'speed-a', comparisonRuns: 2, taskPrompt: 'Change only Cart A speed, predict each collision, and compare both modeled runs.' } } }]
          : [],
      );
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
      {
        lessonId: 'science-u01-l04',
        cardId: 'science-u01-l04-c3',
        demo: { type: 'roller-coaster', focus: 'collision' },
      },
    ]);

    expect(attached).toHaveLength(4);
    expect(attached[0]?.demo?.focus).toBe('speed-energy');
    expect(attached[1]?.demo?.focus).toBe('evidence');
    expect(attached[2]?.demo?.focus).toBe('collision');
    expect(attached[3]?.demo?.focus).toBe('collision');
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
      ['science-u01-l04-c1', /collision|before.*after/i],
      ['science-u01-l04-c2', /fair|testable|release speed/i],
      ['science-u01-l04-c3', /prediction|energy.*transfer/i],
    ]);
    const cards: LearnCard[] = unit01Lessons.flatMap((lesson) =>
      lesson.learnCards as LearnCard[],
    );

    expect(cards).toHaveLength(12);
    for (const card of cards) {
      const check = card.check;
      expect(check, `${card.id} needs a practice check`).toBeDefined();
      if (check === undefined) continue;

      expect(check.choices).toHaveLength(3);
      expect(new Set(check.choices.map(({ id }) => id)).size).toBe(check.choices.length);
      expect(new Set(check.choices.map(({ text }) => normalizeAnswerText(text))).size).toBe(
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
        expect(new Set(options.map(({ text }) => normalizeAnswerText(text))).size).toBe(
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
    const collisionTip = unit01Lessons[2].learnCards[0].blocks[2]!.text;

    expect(collisionInstruction).toMatch(/transfers to surroundings as sound and thermal \(heat\) energy/i);
    expect(collisionInstruction).not.toMatch(/change into sound or warmth/i);
    expect(collisionTip).toBe(
      'Describe what changed before and after the collision without assigning exact values. Do not say energy was “used up.” First name an observable effect, such as the block moving, the marble slowing, or a sound; then infer that energy transferred.',
    );
    expect(collisionTip).not.toMatch(/observed energy transfer/i);
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

  test('pins L04 differentiation, exact routes, and immediate review targets', () => {
    const lesson = unit01Lessons[3]!;
    const collisionCard = lesson.learnCards[1]!;
    expect(collisionCard.widgetCoach?.intro).toHaveLength(2);
    expect(collisionCard.widgetCoach?.intro.map(({ speaker }) => speaker)).toEqual(['guide', 'kid']);
    expect(collisionCard.widgetCoach?.intro.map(({ text }) => text).join(' ')).toMatch(/modeled bumps.*predict.*compare/i);
    expect(collisionCard.widgetCoach?.reactions.strategy?.text).toMatch(/all but one.*condition.*fixed/i);
    expect(collisionCard.widgetCoach?.reactions.retry?.text).toMatch(/saved runs.*motion/i);
    expect(collisionCard.widgetCoach?.reactions.milestone?.text).toMatch(/modeled comparison.*motion/i);
    expect(collisionCard.widgetCoach?.reactions.complete.text).toMatch(/compared modeled motion.*observations.*energy-transfer/i);
    const tags = ['collision-motion-evidence', 'collision-outcome-prediction', 'collision-energy-inference'] as const;
    const cards = lesson.learnCards.map(({ id }) => id);
    expect(lesson.intro.map(({ speaker, pose }) => ({ speaker, pose }))).toEqual([
      { speaker: 'sandy', pose: 'talk' },
      { speaker: 'sandy', pose: 'think' },
      { speaker: 'sandy', pose: 'talk' },
      { speaker: 'sandy', pose: 'cheer' },
    ]);
    expect(lesson.learnCards.map((card) => card.blocks.map(({ kind }) => kind))).toEqual([
      ['text', 'example', 'tip'], ['text', 'example', 'tip'], ['text', 'example', 'tip'],
    ]);
    expect(lesson.learnCards.map((card) => card.blocks[2]!.text.split(':')[0])).toEqual(['Support', 'Response frame', 'Stretch']);
    expect(lesson.workedExample.steps.length).toBeGreaterThanOrEqual(3);
    for (const question of lesson.quiz.pool) {
      const cardIndex = cards.indexOf(question.reviewCardId);
      expect(cardIndex).toBeGreaterThanOrEqual(0);
      expect(question.conceptTag).toBe(tags[cardIndex]);
    }
    expect(new Set(lesson.quiz.pool.map(({ conceptTag }) => conceptTag))).toEqual(new Set(tags));
    for (const card of lesson.learnCards) {
      const question = lesson.quiz.pool.find(({ reviewCardId }) => reviewCardId === card.id)!;
      const wrong = question.type === 'sort'
        ? [...question.correctOrder].reverse()
        : question.type === 'fill-blank'
          ? '__not_an_accepted_answer__'
          : question.choices.find(({ id }) => id !== question.correctChoiceId)!.id;
      const missed = buildResult([question], [wrong]).missed[0]!;
      expect(missed.reviewCardId).toBe(card.id);
      expect(`/lesson/${lesson.id}?card=${missed.reviewCardId}`).toBe(`/lesson/${lesson.id}?card=${card.id}`);
      expect(`card:${new URLSearchParams(`card=${missed.reviewCardId}`).get('card')}`).toBe(`card:${card.id}`);
    }
  });

  test('balances multiple-choice correct-option positions within each lesson', () => {
    for (const lesson of unit01Lessons) {
      const keys = lesson.quiz.pool.flatMap((question) =>
        question.type === 'multiple-choice' ? [question.correctChoiceId] : [],
      );
      const counts = new Map<string, number>();
      for (const key of keys) counts.set(key, (counts.get(key) ?? 0) + 1);

      expect([...counts.keys()].sort()).toEqual(['a', 'b', 'c', 'd']);
      expect(Math.max(...counts.values()) - Math.min(...counts.values())).toBeLessThanOrEqual(1);
    }
  });
});
