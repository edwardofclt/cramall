import { expect, test } from 'vitest';
import { normalizeAnswerText } from '../answer-normalization';
import { validateLesson, WidgetRefSchema, type Question } from '../schema';
import { buildResult, type Answer } from '../../quiz/engine';
import { unit05Lessons } from './u05';

const specs = [
  {
    "id": "science-u05-l01",
    "title": "Trace Allowed Energy Conversions",
    "indicatorCodes": [
      "4-PS3-4"
    ],
    "cards": [
      {
        "title": "Name input and output forms",
        "tag": "conversion-input-output",
        "widget": null
      },
      {
        "title": "Trace a connected conversion chain",
        "tag": "conversion-chain",
        "widget": {
          "type": "energy-conversion-designer",
          "config": {
            "components": [
              {
                "id": "crank",
                "label": "Hand-crank generator",
                "energyIn": "motion",
                "energyOut": "electric"
              },
              {
                "id": "buzzer",
                "label": "Buzzer",
                "energyIn": "electric",
                "energyOut": "sound"
              }
            ],
            "requiredStart": "crank",
            "requiredEnd": "buzzer"
          }
        }
      },
      {
        "title": "Stay within device limits",
        "tag": "conversion-device-boundary",
        "widget": null
      }
    ],
    "routes": [
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "true-false",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "fill-blank",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "sort",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "true-false",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "true-false",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      }
    ]
  },
  {
    "id": "science-u05-l02",
    "title": "Plan a Device with Constraints",
    "indicatorCodes": [
      "4-PS3-4"
    ],
    "cards": [
      {
        "title": "Define the device goal",
        "tag": "device-goal",
        "widget": null
      },
      {
        "title": "Choose materials under constraints",
        "tag": "device-constraints",
        "widget": {
          "type": "energy-conversion-designer",
          "config": {
            "components": [
            {
              "id": "battery",
              "label": "Battery",
              "energyIn": "stored",
              "energyOut": "electric",
              "satisfiesConstraintIds": [
                "materials",
                "cost"
              ]
            },
            {
              "id": "lamp",
              "label": "Lamp",
              "energyIn": "electric",
              "energyOut": "light",
              "satisfiesConstraintIds": [
                "time",
                "safety"
              ]
            }
          ],
          "requiredStart": "battery",
          "requiredEnd": "lamp",
          "constraints": [
            { "id": "materials", "label": "Available materials", "kind": "material" },
            { "id": "cost", "label": "At most 8 tokens", "kind": "cost" },
            { "id": "time", "label": "Within 10 minutes", "kind": "time" },
            { "id": "safety", "label": "Adult safety check", "kind": "safety" }
          ]
          }
        }
      },
      {
        "title": "Draw a testable plan",
        "tag": "device-test-plan",
        "widget": null
      }
    ],
    "routes": [
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "true-false",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "fill-blank",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "true-false",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "sort",
        "card": 3
      },
      {
        "type": "true-false",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      }
    ]
  },
  {
    "id": "science-u05-l03",
    "title": "Test an Energy-Conversion Device",
    "indicatorCodes": [
      "4-PS3-4"
    ],
    "cards": [
      {
        "title": "Write a fair test procedure",
        "tag": "device-test-procedure",
        "widget": null
      },
      {
        "title": "Record observable results",
        "tag": "device-test-observations",
        "widget": null
      },
      {
        "title": "Judge the device against its goal",
        "tag": "device-test-judgment",
        "widget": null
      }
    ],
    "routes": [
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "sort",
        "card": 1
      },
      {
        "type": "true-false",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "true-false",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "fill-blank",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "true-false",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      }
    ]
  },
  {
    "id": "science-u05-l04",
    "title": "Refine a Device Using Test Evidence",
    "indicatorCodes": [
      "4-PS3-4"
    ],
    "cards": [
      {
        "title": "Find a result that misses the goal",
        "tag": "refinement-need",
        "widget": null
      },
      {
        "title": "Change one design feature",
        "tag": "single-design-change",
        "widget": null
      },
      {
        "title": "Compare the retest with the first test",
        "tag": "refinement-evidence",
        "widget": null
      }
    ],
    "routes": [
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "true-false",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "fill-blank",
        "card": 1
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "true-false",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "multiple-choice",
        "card": 2
      },
      {
        "type": "sort",
        "card": 3
      },
      {
        "type": "true-false",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      }
    ]
  },
] as const;

function visibleAnswers(question: Question): string[] {
  if ('choices' in question) return question.choices.map(({ text }) => text);
  if ('items' in question) return question.items.map(({ text }) => text);
  return question.acceptedAnswers;
}

function incorrectAnswer(question: Question): Answer {
  if (question.type === 'fill-blank') return '__not_an_accepted_answer__';
  if (question.type === 'sort') return [...question.correctOrder].reverse();
  return question.choices.find(({ id }) => id !== question.correctChoiceId)!.id;
}

test('Unit 5 is the exact reviewed Science wave', () => {
  expect(unit05Lessons).toHaveLength(specs.length);
  for (const [lessonIndex, lesson] of unit05Lessons.entries()) {
    const spec = specs[lessonIndex]!;
    expect({ id: lesson.id, title: lesson.title, indicatorCodes: lesson.indicatorCodes }).toEqual({
      id: spec.id,
      title: spec.title,
      indicatorCodes: spec.indicatorCodes,
    });
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.intro.map(({ speaker, pose }) => ({ speaker, pose }))).toEqual([
      { speaker: 'sandy', pose: 'talk' },
      { speaker: 'sandy', pose: 'think' },
      { speaker: 'sandy', pose: 'talk' },
      { speaker: 'sandy', pose: 'cheer' },
    ]);
    expect(lesson.learnCards).toHaveLength(3);
    expect(lesson.learnCards.map(({ id }) => id)).toEqual([1, 2, 3].map((number) => `${lesson.id}-c${number}`));
    for (const [cardIndex, card] of lesson.learnCards.entries()) {
      expect(card.title).toBe(spec.cards[cardIndex]!.title);
      expect(card.blocks.map(({ kind }) => kind)).toEqual(['text', 'example', 'tip']);
      expect(card.blocks[2]!.text.startsWith(['Support:', 'Response frame:', 'Stretch:'][cardIndex]!)).toBe(true);
    }
    expect(lesson.workedExample.steps.length).toBeGreaterThanOrEqual(3);
    expect(lesson.quiz.passThreshold).toBe(8);
    expect(lesson.quiz.pool).toHaveLength(13);
    expect(lesson.quiz.pool.map(({ id }) => id)).toEqual(Array.from({ length: 13 }, (_, index) => `${lesson.id}-q${String(index + 1).padStart(2, '0')}`));
    expect(lesson.quiz.pool.map((question) => ({ type: question.type, card: Number(question.reviewCardId[question.reviewCardId.length - 1]) }))).toEqual(spec.routes);
    for (const [questionIndex, question] of lesson.quiz.pool.entries()) {
      const cardNumber = spec.routes[questionIndex]!.card;
      expect(question.reviewCardId).toBe(`${lesson.id}-c${cardNumber}`);
      expect(question.conceptTag).toBe(spec.cards[cardNumber - 1]!.tag);
      const normalized = visibleAnswers(question).map(normalizeAnswerText);
      expect(new Set(normalized).size).toBe(normalized.length);
    }
    expect(new Set(lesson.quiz.pool.map(({ conceptTag }) => conceptTag))).toEqual(new Set(spec.cards.map(({ tag }) => tag)));
    const expectedWidgets = spec.cards.flatMap((card, index) => card.widget === null ? [] : [{ card: index + 1, value: card.widget }]);
    expect(lesson.learnCards.flatMap((card, index) => card.widget === undefined ? [] : [{ card: index + 1, value: card.widget }])).toEqual(expectedWidgets);
    for (const widget of expectedWidgets) expect(WidgetRefSchema.safeParse(widget.value).success).toBe(true);
    const keys = lesson.quiz.pool.flatMap((question) => question.type === 'multiple-choice' ? [question.correctChoiceId] : []);
    const counts = ['a', 'b', 'c', 'd'].map((key) => keys.filter((value) => value === key).length);
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
  }
  const prose = JSON.stringify(unit05Lessons);
  expect(prose).not.toMatch(/\b(?:joules?|newtons?|acceleration)\b|calculate (?:the )?(?:energy|force)|combustion-engine design|nuclear reaction formula/i);
});

test('every card has an immediate exact missed-result review route', () => {
  for (const lesson of unit05Lessons) {
    const expectedTargets = lesson.learnCards.map((card) => ({
      legacyHref: `/lesson/${lesson.id}?card=${card.id}`,
      canonicalStep: `card:${card.id}`,
    }));
    const actualTargets = lesson.learnCards.map((card) => {
      const question = lesson.quiz.pool.find(({ reviewCardId }) => reviewCardId === card.id)!;
      const result = buildResult([question], [incorrectAnswer(question)]);
      expect(result.missed).toEqual([{ conceptTag: question.conceptTag, reviewCardId: card.id, count: 1 }]);
      const legacyHref = `/lesson/${lesson.id}?card=${result.missed[0]!.reviewCardId}`;
      const cardParam = new URLSearchParams(legacyHref.split('?')[1]).get('card');
      return { legacyHref, canonicalStep: `card:${cardParam}` };
    });
    expect(actualTargets).toEqual(expectedTargets);
  }
});

test('sampled device questions include the complete goal and test records they require', () => {
  const sourcedPrompt = (questionId: string, requiredSources: readonly string[]) => [questionId, requiredSources] as const;
  const requiredPromptSources = [
    sourcedPrompt('science-u05-l01-q13', ['On-screen model', 'hand-crank generator', 'buzzer', 'motion → electric → sound']),
    sourcedPrompt('science-u05-l02-q03', ['battery-stored energy', 'light a reading space', '10 seconds']),
    sourcedPrompt('science-u05-l02-q04', ['battery-stored energy', 'light a reading space', '10 seconds']),
    sourcedPrompt('science-u05-l02-q08', ['On-screen battery-to-lamp conversion activity', 'stored → electric → light']),
    ...['q05', 'q08', 'q09', 'q11', 'q12'].map((questionId) => sourcedPrompt(
      `science-u05-l03-${questionId}`,
      ['Trial 1 lit for 6 seconds', 'Trial 2 lit for 7 seconds', 'Trial 3 lit for 6 seconds', 'goal was 10 seconds'],
    )),
    ...['q01', 'q03', 'q04'].map((questionId) => sourcedPrompt(
      `science-u05-l04-${questionId}`,
      ['Trials 1–3 stayed lit for 6, 7, and 6 seconds', 'goal was 10 seconds'],
    )),
    ...['q11', 'q12'].map((questionId) => sourcedPrompt(
      `science-u05-l04-${questionId}`,
      ['Trials 1–3 stayed lit for 6, 7, and 6 seconds', 'goal was 10 seconds', 'three retests each stayed lit for 10 seconds without flicker'],
    )),
  ] as const;

  const questions = new Map(unit05Lessons.flatMap((lesson) => lesson.quiz.pool).map((question) => [question.id, question]));
  for (const [questionId, requiredSources] of requiredPromptSources) {
    const prompt = questions.get(questionId)?.prompt;
    expect(prompt, `${questionId} should exist`).toBeDefined();
    for (const source of requiredSources) expect(prompt, `${questionId} should include ${source}`).toContain(source);
  }
});

test('energy conversion cards expose constraint and trade-off coaching', () => {
  const widgetCards = unit05Lessons.flatMap((lesson) => lesson.learnCards.filter((card) => card.widget?.type === 'energy-conversion-designer'));
  expect(widgetCards).toHaveLength(2);
  for (const card of widgetCards) {
    expect(card.widgetCoach?.intro).toHaveLength(2);
    expect(card.widgetCoach?.reactions.strategy?.text).toMatch(/chain|input|constraint/i);
    expect(card.widgetCoach?.reactions.retry?.text).toMatch(/link|constraint|stamp/i);
    expect(card.widgetCoach?.reactions.complete.text).toMatch(/observable|constraint|universally best/i);
  }
  expect(JSON.stringify(unit05Lessons)).toMatch(/universally best|always best/i);
});
