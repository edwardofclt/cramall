import { expect, test } from 'vitest';
import { normalizeAnswerText } from '../answer-normalization';
import { validateLesson, WidgetRefSchema, type Question } from '../schema';
import { buildResult, type Answer } from '../../quiz/engine';
import { unit03Lessons } from './u03';

const specs = [
  {
    "id": "science-u03-l01",
    "title": "Model Wave Amplitude Patterns",
    "indicatorCodes": [
      "4-PS4-1"
    ],
    "cards": [
      {
        "title": "Recognize a repeating wave",
        "tag": "repeating-wave-model",
        "widget": {
          "type": "wave-maker",
          "config": {
            "medium": "rope",
            "amplitude": 1,
            "frequency": 2,
            "target": {
              "amplitude": 4,
              "frequency": 2
            }
          }
        }
      },
      {
        "title": "Compare small and large amplitude",
        "tag": "amplitude-pattern",
        "widget": {
          "type": "wave-maker",
          "config": {
            "medium": "rope",
            "amplitude": 2,
            "frequency": 2,
            "target": {
              "amplitude": 4
            }
          }
        }
      },
      {
        "title": "Explain what the model represents",
        "tag": "wave-model-limits",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "The wave model represents a repeating pattern",
              "The wave model measures a real rope"
            ],
            "details": [
              {
                "id": "authored",
                "text": "The curve is an authored drawing of a repeating pattern.",
                "supports": [
                  "The wave model represents a repeating pattern"
                ]
              },
              {
                "id": "control",
                "text": "The amplitude control changes displacement in the drawing.",
                "supports": [
                  "The wave model represents a repeating pattern"
                ]
              },
              {
                "id": "not-photo",
                "text": "The drawing is not a photograph of every wave.",
                "supports": [
                  "The wave model represents a repeating pattern"
                ]
              },
              {
                "id": "measured",
                "text": "The model collected measurements from a physical rope.",
                "supports": [
                  "The wave model measures a real rope"
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
    "id": "science-u03-l02",
    "title": "Describe Wavelength Patterns",
    "indicatorCodes": [
      "4-PS4-1"
    ],
    "cards": [
      {
        "title": "Find matching points on waves",
        "tag": "wavelength-reference-points",
        "widget": {
          "type": "wave-maker",
          "config": {
            "medium": "rope",
            "amplitude": 3,
            "frequency": 2,
            "target": {
              "amplitude": 3,
              "frequency": 4
            }
          }
        }
      },
      {
        "title": "Compare shorter and longer wavelengths",
        "tag": "wavelength-comparison",
        "widget": {
          "type": "wave-maker",
          "config": {
            "medium": "rope",
            "amplitude": 3,
            "frequency": 2,
            "target": {
              "amplitude": 3,
              "frequency": 6
            }
          }
        }
      },
      {
        "title": "Use a qualitative wave model",
        "tag": "wavelength-model-boundary",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "This model supports a shorter-or-longer comparison",
              "This model gives exact wavelength numbers"
            ],
            "details": [
              {
                "id": "closer",
                "text": "Crests drawn closer together represent a shorter wavelength.",
                "supports": [
                  "This model supports a shorter-or-longer comparison"
                ]
              },
              {
                "id": "farther",
                "text": "Crests drawn farther apart represent a longer wavelength.",
                "supports": [
                  "This model supports a shorter-or-longer comparison"
                ]
              },
              {
                "id": "qualitative",
                "text": "Grade 4 comparisons use patterns rather than measured distances.",
                "supports": [
                  "This model supports a shorter-or-longer comparison"
                ]
              },
              {
                "id": "numbers",
                "text": "The diagram prints a wavelength in centimeters.",
                "supports": [
                  "This model gives exact wavelength numbers"
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
  },  {
    "id": "science-u03-l03",
    "title": "Model Waves Moving Objects",
    "indicatorCodes": [
      "4-PS4-1"
    ],
    "cards": [
      {
        "title": "Observe an object at the surface",
        "tag": "wave-object-observation",
        "widget": {
          "type": "energy-transfer-builder",
          "config": {
            "sources": [
              "Tap at the tray edge",
              "Still water surface"
            ],
            "transfers": [
              "Repeating ripple",
              "No ripple"
            ],
            "targets": [
              "Floating cork bobs",
              "Floating cork rests"
            ],
            "requiredPath": [
              "Tap at the tray edge",
              "Repeating ripple",
              "Floating cork bobs"
            ]
          }
        }
      },
      {
        "title": "Model motion caused by waves",
        "tag": "wave-caused-motion",
        "widget": {
          "type": "wave-maker",
          "config": {
            "medium": "water",
            "amplitude": 2,
            "frequency": 2,
            "target": {
              "amplitude": 3
            }
          }
        }
      },
      {
        "title": "Connect patterns without overclaiming",
        "tag": "wave-motion-model-limits",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "The written tray observation is the evidence",
              "The screen result is the evidence"
            ],
            "details": [
              {
                "id": "cork-note",
                "text": "The recorded note says the cork bobbed near its mark as ripples passed.",
                "supports": [
                  "The written tray observation is the evidence"
                ]
              },
              {
                "id": "model-explains",
                "text": "The diagram helps explain or predict the pattern.",
                "supports": [
                  "The written tray observation is the evidence"
                ]
              },
              {
                "id": "no-proof",
                "text": "The app did not observe the cork and cannot prove the tray result.",
                "supports": [
                  "The written tray observation is the evidence"
                ]
              },
              {
                "id": "screen",
                "text": "The taller curve on screen proves what the cork did.",
                "supports": [
                  "The screen result is the evidence"
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
  },  {
    "id": "science-u03-l04",
    "title": "Model Reflected Light Entering the Eye",
    "indicatorCodes": [
      "4-PS4-2"
    ],
    "cards": [
      {
        "title": "Trace light to an object",
        "tag": "light-to-object",
        "widget": {
          "type": "energy-transfer-builder",
          "config": {
            "sources": [
              "Lamp",
              "Closed dark room"
            ],
            "transfers": [
              "Book page",
              "No reflecting surface"
            ],
            "targets": [
              "Eye receiver",
              "Nothing seen"
            ],
            "requiredPath": [
              "Lamp",
              "Book page",
              "Eye receiver"
            ]
          }
        }
      },
      {
        "title": "Trace reflected light to the eye",
        "tag": "reflected-light-path",
        "widget": {
          "type": "light-reflection-eye",
          "config": {
            "incidentAngle": 25,
            "targetAngle": 30,
            "showEye": true
          }
        }
      },
      {
        "title": "Explain seeing with a model",
        "tag": "seeing-cause-effect-model",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "The ray diagram models a possible light path",
              "The ray diagram shows that a person saw the book"
            ],
            "details": [
              {
                "id": "reflects",
                "text": "The model shows light reflecting from the object and entering the eye.",
                "supports": [
                  "The ray diagram models a possible light path"
                ]
              },
              {
                "id": "angles",
                "text": "The authored angles at the surface are equal in this model.",
                "supports": [
                  "The ray diagram models a possible light path"
                ]
              },
              {
                "id": "system",
                "text": "The model stops at a system-level explanation of seeing.",
                "supports": [
                  "The ray diagram models a possible light path"
                ]
              },
              {
                "id": "observed",
                "text": "The app observed a particular person seeing the book.",
                "supports": [
                  "The ray diagram shows that a person saw the book"
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
        "type": "fill-blank",
        "card": 3
      }
    ]
  },] as const;

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

test('Unit 3 is the exact reviewed Science wave', () => {
  expect(unit03Lessons).toHaveLength(specs.length);
  for (const [lessonIndex, lesson] of unit03Lessons.entries()) {
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
  const prose = JSON.stringify(unit03Lessons);
  expect(prose).not.toMatch(/wave interference|non-periodic|calculate (?:amplitude|wavelength)|retina|rod cells?|cone cells?/i);
});

test('every card has an immediate exact missed-result review route', () => {
  for (const lesson of unit03Lessons) {
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

test('every scenario-dependent Quick Check prompt includes its complete usable context', () => {
  const expectedPrompts = {
    'science-u03-l01-q05': 'Wave A has crests and troughs close to the baseline. Wave B has crests and troughs farther from the same baseline. Which wave has larger amplitude?',
    'science-u03-l01-q09': 'An app activity shows an authored wave graph and lets a learner change its amplitude. It does not measure a physical rope. Which statement accurately describes the activity?',
    'science-u03-l02-q05': 'Drawing A has neighboring crests closer together than Drawing B. Which drawing has shorter wavelength?',
    'science-u03-l02-q09': 'The available wave-maker has controls labeled amplitude and frequency, but no control labeled wavelength. Why is it not used to compare wavelength on this card?',
    'science-u03-l02-q12': 'Grade 4 wavelength comparisons are qualitative and do not use exact numerical measurements. Which explanation stays within this boundary?',
    'science-u03-l03-q01': 'A cork was nearly still near a tape mark before repeating ripples. While ripples passed, it bobbed up and down near the same mark. Which is an observable change?',
    'science-u03-l03-q03': 'A cork was nearly still near a tape mark before repeating ripples. While ripples passed, it bobbed up and down near the same mark. Where did the cork remain?',
    'science-u03-l03-q04': 'A learner needs evidence for the claim that waves can cause objects to move. Which note is most relevant?',
    'science-u03-l03-q05': 'An app water-wave activity changes authored amplitude and cycle controls on a graph; it does not observe or measure a physical tray or cork. What does the activity provide?',
    'science-u03-l03-q09': 'A cork was nearly still near a tape mark before repeating ripples. While ripples passed, it bobbed up and down near the same mark. Which claim is supported by this written observation?',
    'science-u03-l03-q11': 'Claim: Waves can cause objects to move. A cork was nearly still before ripples and bobbed as they passed. Which evidence should support the claim?',
    'science-u03-l03-q13': 'A written observation says a cork was nearly still before ripples and bobbed as they passed. An app graph changes authored values but does not observe the cork. Which explanation avoids overclaiming?',
    'science-u03-l04-q08': 'An app reflection activity draws an authored light path from a source to an object to an eye; it does not observe a real person. The activity is a model rather than an observation of someone seeing.',
  } as const;

  const questions = new Map(unit03Lessons.flatMap((lesson) => lesson.quiz.pool).map((question) => [question.id, question]));
  for (const [questionId, expectedPrompt] of Object.entries(expectedPrompts)) {
    expect(questions.get(questionId)?.prompt, questionId).toBe(expectedPrompt);
  }
});
