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
        "widget": {
          "type": "energy-transfer-builder",
          "config": {
            "sources": [
              "motion into the crank"
            ],
            "transfers": [
              "hand-crank generator",
              "buzzer",
              "lamp"
            ],
            "targets": [
              "sound from the buzzer",
              "light from a lamp"
            ],
            "requiredPath": [
              "motion into the crank",
              "hand-crank generator",
              "buzzer",
              "sound from the buzzer"
            ]
          }
        }
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
              },
              {
                "id": "lamp",
                "label": "Lamp",
                "energyIn": "electric",
                "energyOut": "light"
              },
              {
                "id": "heater",
                "label": "Heater",
                "energyIn": "electric",
                "energyOut": "heat"
              },
              {
                "id": "spring",
                "label": "Wind-up spring",
                "energyIn": "stored",
                "energyOut": "motion"
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
        "widget": {
          "type": "energy-conversion-designer",
          "config": {
            "components": [
              {
                "id": "battery",
                "label": "Battery",
                "energyIn": "stored",
                "energyOut": "electric"
              },
              {
                "id": "motor",
                "label": "Motor",
                "energyIn": "electric",
                "energyOut": "motion"
              },
              {
                "id": "lamp",
                "label": "Lamp",
                "energyIn": "electric",
                "energyOut": "light"
              },
              {
                "id": "heater",
                "label": "Heater",
                "energyIn": "electric",
                "energyOut": "heat"
              },
              {
                "id": "turbine",
                "label": "Steam turbine",
                "energyIn": "heat",
                "energyOut": "spin"
              }
            ],
            "requiredStart": "battery",
            "requiredEnd": "motor"
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
        "widget": {
          "type": "energy-transfer-builder",
          "config": {
            "sources": [
              "stored energy in the battery"
            ],
            "transfers": [
              "battery holder and switch",
              "lamp",
              "buzzer"
            ],
            "targets": [
              "light you can see for ten seconds",
              "sound you can hear"
            ],
            "requiredPath": [
              "stored energy in the battery",
              "battery holder and switch",
              "lamp",
              "light you can see for ten seconds"
            ]
          }
        }
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
                "energyOut": "electric"
              },
              {
                "id": "lamp",
                "label": "Lamp",
                "energyIn": "electric",
                "energyOut": "light"
              },
              {
                "id": "buzzer",
                "label": "Buzzer",
                "energyIn": "electric",
                "energyOut": "sound"
              },
              {
                "id": "motor",
                "label": "Motor",
                "energyIn": "electric",
                "energyOut": "motion"
              },
              {
                "id": "windup",
                "label": "Wind-up spring",
                "energyIn": "stored",
                "energyOut": "motion"
              }
            ],
            "requiredStart": "battery",
            "requiredEnd": "lamp"
          }
        }
      },
      {
        "title": "Draw a testable plan",
        "tag": "device-test-plan",
        "widget": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "adult",
                "text": "An adult checks the covered setup before the switch is closed.",
                "role": "main"
              },
              {
                "id": "close",
                "text": "Close the switch to start the trial.",
                "role": "main"
              },
              {
                "id": "watch",
                "text": "Watch the lamp for the full ten-second interval.",
                "role": "main"
              },
              {
                "id": "record",
                "text": "Record how long the lamp stayed visibly lit.",
                "role": "detail"
              },
              {
                "id": "color",
                "text": "The lamp housing is red.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "adult",
              "close",
              "watch"
            ],
            "maxSentences": 4
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
        "widget": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "check",
                "text": "An adult checks the covered setup.",
                "role": "main"
              },
              {
                "id": "switch",
                "text": "Close the switch.",
                "role": "main"
              },
              {
                "id": "observe",
                "text": "Observe the lamp for ten seconds.",
                "role": "main"
              },
              {
                "id": "record",
                "text": "Record the lamp result for the trial.",
                "role": "detail"
              },
              {
                "id": "same",
                "text": "The same battery, lamp, and switch are used for every trial.",
                "role": "detail"
              },
              {
                "id": "snack",
                "text": "The tester ate a snack first.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "check",
              "switch",
              "observe"
            ],
            "maxSentences": 5
          }
        }
      },
      {
        "title": "Record observable results",
        "tag": "device-test-observations",
        "widget": {
          "type": "data-plot-builder",
          "config": {
            "kind": "bar",
            "prompt": "Build the bar plot from the supplied test record: seconds the lamp stayed lit in each trial.",
            "categories": [
              "Trial 1",
              "Trial 2",
              "Trial 3"
            ],
            "target": {
              "Trial 1": 6,
              "Trial 2": 7,
              "Trial 3": 6
            }
          }
        }
      },
      {
        "title": "Judge the device against its goal",
        "tag": "device-test-judgment",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "This trial missed the ten-second goal",
              "This trial met the ten-second goal"
            ],
            "details": [
              {
                "id": "t1",
                "text": "Trial 1 stayed lit 6 seconds, then flickered off.",
                "supports": [
                  "This trial missed the ten-second goal"
                ]
              },
              {
                "id": "t2",
                "text": "Trial 2 stayed lit 7 seconds, then flickered off.",
                "supports": [
                  "This trial missed the ten-second goal"
                ]
              },
              {
                "id": "t3",
                "text": "Trial 3 stayed lit 6 seconds, then flickered off.",
                "supports": [
                  "This trial missed the ten-second goal"
                ]
              },
              {
                "id": "met",
                "text": "A trial stayed lit the full 10 seconds with no flicker.",
                "supports": [
                  "This trial met the ten-second goal"
                ]
              }
            ],
            "requiredDetailCount": 3
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
        "widget": {
          "type": "data-plot-builder",
          "config": {
            "kind": "bar",
            "prompt": "Build the goal bar and the three first-test bars from the supplied record, then look at the gap.",
            "categories": [
              "Goal",
              "Trial 1",
              "Trial 2",
              "Trial 3"
            ],
            "target": {
              "Goal": 10,
              "Trial 1": 6,
              "Trial 2": 7,
              "Trial 3": 6
            }
          }
        }
      },
      {
        "title": "Change one design feature",
        "tag": "single-design-change",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "This retest changes exactly one feature",
              "This retest changes more than one feature"
            ],
            "details": [
              {
                "id": "clip",
                "text": "One loose clip is replaced before the retest.",
                "supports": [
                  "This retest changes exactly one feature"
                ]
              },
              {
                "id": "same-battery",
                "text": "The same battery and lamp are kept for the retest.",
                "supports": [
                  "This retest changes exactly one feature"
                ]
              },
              {
                "id": "same-interval",
                "text": "The same ten-second interval and viewing condition are kept.",
                "supports": [
                  "This retest changes exactly one feature"
                ]
              },
              {
                "id": "two",
                "text": "A new battery and a new lamp are both fitted before the retest.",
                "supports": [
                  "This retest changes more than one feature"
                ]
              }
            ],
            "requiredDetailCount": 3
          }
        }
      },
      {
        "title": "Compare the retest with the first test",
        "tag": "refinement-evidence",
        "widget": {
          "type": "data-plot-builder",
          "config": {
            "kind": "bar",
            "prompt": "Build both supplied records side by side: the first test and the retest.",
            "categories": [
              "First 1",
              "First 2",
              "First 3",
              "Retest 1",
              "Retest 2",
              "Retest 3"
            ],
            "target": {
              "First 1": 6,
              "First 2": 7,
              "First 3": 6,
              "Retest 1": 10,
              "Retest 2": 10,
              "Retest 3": 10
            }
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
