import { expect, test } from 'vitest';
import { normalizeAnswerText } from '../answer-normalization';
import { validateLesson, WidgetRefSchema, type Question } from '../schema';
import { buildResult, type Answer } from '../../quiz/engine';
import { unit02Lessons } from './u02';

const specs = [
  {
    "id": "science-u02-l01",
    "title": "Observe Energy Transfer",
    "indicatorCodes": [
      "4-PS3-2"
    ],
    "cards": [
      {
        "title": "Identify a source and receiver",
        "tag": "transfer-source-receiver",
        "widget": null
      },
      {
        "title": "Observe a change",
        "tag": "observable-transfer-change",
        "widget": {
          "type": "energy-transfer-builder",
          "config": {
            "sources": [
              "Sun"
            ],
            "transfers": [
              "light"
            ],
            "targets": [
              "paper square"
            ],
            "requiredPath": [
              "Sun",
              "light",
              "paper square"
            ]
          }
        }
      },
      {
        "title": "Use the change as evidence",
        "tag": "transfer-evidence",
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
        "type": "fill-blank",
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
    "id": "science-u02-l02",
    "title": "Use Sound and Light as Evidence",
    "indicatorCodes": [
      "4-PS3-2"
    ],
    "cards": [
      {
        "title": "Track sound from a source",
        "tag": "sound-transfer-path",
        "widget": {
          "type": "energy-transfer-builder",
          "config": {
            "sources": [
              "tuning fork"
            ],
            "transfers": [
              "sound"
            ],
            "targets": [
              "paper bits"
            ],
            "requiredPath": [
              "tuning fork",
              "sound",
              "paper bits"
            ]
          }
        }
      },
      {
        "title": "Track light from a source",
        "tag": "light-transfer-path",
        "widget": null
      },
      {
        "title": "Compare observable effects",
        "tag": "sound-light-evidence",
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
        "type": "fill-blank",
        "card": 3
      },
      {
        "type": "multiple-choice",
        "card": 3
      }
    ]
  },
  {
    "id": "science-u02-l03",
    "title": "Use Heat and Electric Current as Evidence",
    "indicatorCodes": [
      "4-PS3-2"
    ],
    "cards": [
      {
        "title": "Notice transfer by heat",
        "tag": "heat-transfer-evidence",
        "widget": null
      },
      {
        "title": "Follow an electric-current path",
        "tag": "electric-transfer-path",
        "widget": {
          "type": "energy-transfer-builder",
          "config": {
            "sources": [
              "battery"
            ],
            "transfers": [
              "electric current"
            ],
            "targets": [
              "motor"
            ],
            "requiredPath": [
              "battery",
              "electric current",
              "motor"
            ]
          }
        }
      },
      {
        "title": "Separate transfer from effect",
        "tag": "transfer-effect-reasoning",
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
        "type": "multiple-choice",
        "card": 3
      }
    ]
  },
  {
    "id": "science-u02-l04",
    "title": "Compare Energy Transfer Observations",
    "indicatorCodes": [
      "4-PS3-2"
    ],
    "cards": [
      {
        "title": "Organize four transfer cases",
        "tag": "transfer-case-features",
        "widget": null
      },
      {
        "title": "Choose relevant observations",
        "tag": "relevant-transfer-observations",
        "widget": null
      },
      {
        "title": "Build a comparison claim",
        "tag": "transfer-comparison-claim",
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
        "type": "multiple-choice",
        "card": 1
      },
      {
        "type": "true-false",
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

test('Unit 2 is the exact reviewed Science wave', () => {
  expect(unit02Lessons).toHaveLength(specs.length);
  for (const [lessonIndex, lesson] of unit02Lessons.entries()) {
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
  const prose = JSON.stringify(unit02Lessons);
  expect(prose).not.toMatch(/\b(?:joules?|newtons?|acceleration)\b|calculate (?:the )?(?:energy|force)/i);
  expect(prose).not.toMatch(/\b(?:app|widget|simulation|animation|model)\b.{0,28}\b(?:showed|proved|provided evidence|generated evidence)\b/i);
});

test('every card has an immediate exact missed-result review route', () => {
  for (const lesson of unit02Lessons) {
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

test('keeps sampled L01 transfer questions self-contained', () => {
  const questions = unit02Lessons[0]!.quiz.pool;
  expect(questions[0]!.prompt).toBe(
    'Two matching paper squares begin in the same room. One is placed in sunlight and later feels warmer than the shaded square. What is the energy source?',
  );
  expect(questions[2]!.prompt).toBe(
    'Two matching paper squares begin in the same room. One is placed in sunlight and later feels warmer than the shaded square. Which transfer path matches this phenomenon?',
  );
});
