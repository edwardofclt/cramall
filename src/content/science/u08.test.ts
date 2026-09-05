import { expect, test } from 'vitest';
import { normalizeAnswerText } from '../answer-normalization';
import { validateLesson, WidgetRefSchema, type Question } from '../schema';
import { buildResult, type Answer } from '../../quiz/engine';
import { unit08Lessons } from './u08';

const specs = [
  {
    "id": "science-u08-l01",
    "title": "Trace Energy and Fuels to Natural Resources",
    "indicatorCodes": [
      "4-ESS3-1"
    ],
    "cards": [
      {
        "title": "Name resource origins",
        "tag": "resource-origin",
        "widget": null
      },
      {
        "title": "Classify renewable and nonrenewable resources",
        "tag": "resource-kind",
        "widget": {
          "type": "resource-sorter",
          "config": {
            "items": [
              {
                "id": "sun",
                "label": "Sunlight",
                "kind": "renewable"
              },
              {
                "id": "coal",
                "label": "Coal",
                "kind": "nonrenewable"
              },
              {
                "id": "wind",
                "label": "Wind",
                "kind": "renewable"
              },
              {
                "id": "dam-water",
                "label": "Water behind a dam",
                "kind": "renewable"
              },
              {
                "id": "oil",
                "label": "Oil",
                "kind": "nonrenewable"
              },
              {
                "id": "gas",
                "label": "Natural gas",
                "kind": "nonrenewable"
              },
              {
                "id": "uranium",
                "label": "Uranium",
                "kind": "nonrenewable"
              }
            ],
            "bins": [
              "renewable",
              "nonrenewable"
            ]
          }
        }
      },
      {
        "title": "Combine information from sources",
        "tag": "resource-information",
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
        "type": "fill-blank",
        "card": 3
      }
    ]
  },
  {
    "id": "science-u08-l02",
    "title": "Explain Environmental Effects of Resource Use",
    "indicatorCodes": [
      "4-ESS3-1"
    ],
    "cards": [
      {
        "title": "Connect a resource to its use",
        "tag": "resource-use",
        "widget": {
          "type": "resource-sorter",
          "config": {
            "items": [
              {
                "id": "wind",
                "label": "Wind",
                "kind": "renewable"
              },
              {
                "id": "oil",
                "label": "Oil",
                "kind": "nonrenewable"
              },
              {
                "id": "save",
                "label": "Use less electricity",
                "kind": "conserve"
              }
            ],
            "bins": [
              "renewable",
              "nonrenewable",
              "conserve"
            ]
          }
        }
      },
      {
        "title": "Describe an environmental effect",
        "tag": "resource-environment-effect",
        "widget": null
      },
      {
        "title": "Compare choices using evidence",
        "tag": "resource-choice-comparison",
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
        "type": "fill-blank",
        "card": 3
      }
    ]
  },

  {
    "id": "science-u08-l03",
    "title": "Describe Natural-Process Hazards",
    "indicatorCodes": [
      "4-ESS3-2"
    ],
    "cards": [
      {
        "title": "Connect a process to a hazard",
        "tag": "hazard-cause-effect",
        "widget": null
      },
      {
        "title": "Identify impacts on people",
        "tag": "hazard-human-impact",
        "widget": null
      },
      {
        "title": "Match a solution to an impact",
        "tag": "hazard-impact-solution",
        "widget": {
          "type": "hazard-solution-designer",
          "config": {
            "hazard": "Hurricane",
            "solutions": [
              {
                "id": "shutters",
                "label": "Storm shutters",
                "effectiveness": "good"
              },
              {
                "id": "warnings",
                "label": "Early warnings",
                "effectiveness": "good"
              },
              {
                "id": "ignore",
                "label": "Ignore forecasts",
                "effectiveness": "poor"
              }
            ],
            "requiredIds": [
              "shutters",
              "warnings"
            ]
          }
        }
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
        "type": "fill-blank",
        "card": 3
      }
    ]
  },

  {
    "id": "science-u08-l04",
    "title": "Compare Hazard-Impact Solutions",
    "indicatorCodes": [
      "4-ESS3-2"
    ],
    "cards": [
      {
        "title": "Define criteria for a solution",
        "tag": "hazard-solution-criteria",
        "widget": null
      },
      {
        "title": "Compare strengths and limits",
        "tag": "hazard-solution-comparison",
        "widget": {
          "type": "hazard-solution-designer",
          "config": {
            "hazard": "Flood",
            "solutions": [
              {
                "id": "waterway",
                "label": "Floodwater channel",
                "effectiveness": "good"
              },
              {
                "id": "warning",
                "label": "Flood warning",
                "effectiveness": "good"
              },
              {
                "id": "block",
                "label": "Block every drain",
                "effectiveness": "poor"
              }
            ],
            "requiredIds": [
              "waterway",
              "warning"
            ]
          }
        }
      },
      {
        "title": "Justify a combined plan",
        "tag": "hazard-solution-justification",
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
        "type": "fill-blank",
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

const selfContainedPromptFacts = {
  'science-u08-l01-q06': 'Source B: fossil and nuclear fuels are nonrenewable and use limited Earth materials.',
  'science-u08-l01-q08': 'Sorter setup: sunlight is labeled renewable and coal nonrenewable.',
  'science-u08-l01-q09': 'Source A: wind, sunlight, and dammed water are renewable. Source B: fossil and nuclear fuels are nonrenewable and use limited Earth materials.',
  'science-u08-l01-q11': 'Source B: fossil and nuclear fuels are nonrenewable and use limited Earth materials.',
  'science-u08-l01-q12': 'Source A: wind, sunlight, and dammed water are renewable. Source B: fossil and nuclear fuels are nonrenewable and use limited Earth materials.',
  'science-u08-l02-q05': 'Packet fact: burning fossil fuels releases air pollution.',
  'science-u08-l02-q07': 'Packet fact: wind turbines produce electricity without burning fuel at the turbine but may affect flying wildlife.',
  'science-u08-l02-q08': 'Packet fact: solar panels produce electricity from sunlight but require space and materials.',
  'science-u08-l02-q09': 'Packet facts: wind avoids fuel burning at the turbine but may affect wildlife; dams provide controllable electricity but change river habitat.',
  'science-u08-l02-q11': 'Packet: wind may affect wildlife; dams change river habitat; solar needs space and materials; fossil-fuel burning pollutes air; local conditions vary.',
  'science-u08-l02-q12': 'Packet: wind may affect wildlife; dams change river habitat; solar needs space and materials; fossil-fuel burning pollutes air; local conditions vary.',
  'science-u08-l03-q11': 'Plan facts: storm shutters reduce hurricane window damage; early warnings add preparation time; neither removes all risk.',
  'science-u08-l03-q12': 'Plan facts: storm shutters reduce hurricane window damage; early warnings add preparation time; neither removes all risk.',
  'science-u08-l04-q05': 'Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water.',
  'science-u08-l04-q07': 'Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water.',
  'science-u08-l04-q08': 'Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water.',
  'science-u08-l04-q09': 'Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water.',
  'science-u08-l04-q10': 'Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water.',
  'science-u08-l04-q11': 'Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water.',
  'science-u08-l04-q12': 'Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water.',
} as const;

test('all 20 source-dependent Unit 8 questions embed their complete standalone facts', () => {
  const questions = unit08Lessons.flatMap((lesson) => lesson.quiz.pool);
  expect(Object.keys(selfContainedPromptFacts)).toHaveLength(20);
  for (const [questionId, fact] of Object.entries(selfContainedPromptFacts)) {
    const question = questions.find(({ id }) => id === questionId);
    expect(question, questionId).toBeDefined();
    expect(question!.prompt, questionId).toContain(fact);
  }
});

test('Unit 8 is the exact reviewed Science wave', () => {
  expect(unit08Lessons).toHaveLength(specs.length);
  for (const [lessonIndex, lesson] of unit08Lessons.entries()) {
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
  expect(JSON.stringify(unit08Lessons)).not.toMatch(/volcanic eruption|tsunami|wildfire|\b(?:will|does|can) guarantee safety|removes? every effect/i);
});

test('every card has an immediate exact missed-result review route', () => {
  for (const lesson of unit08Lessons) {
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
