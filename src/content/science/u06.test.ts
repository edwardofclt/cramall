import { expect, test } from 'vitest';
import { normalizeAnswerText } from '../answer-normalization';
import { validateLesson, WidgetRefSchema, type Question } from '../schema';
import { buildResult, type Answer } from '../../quiz/engine';
import { unit06Lessons } from './u06';

const specs = [
  {
    "id": "science-u06-l01",
    "title": "Explain Plant Structures as a System",
    "indicatorCodes": [
      "4-LS1-1"
    ],
    "cards": [
      {
        "title": "Identify visible plant structures",
        "tag": "plant-structures",
        "widget": {
          "type": "animal-structure-matcher",
          "config": {
            "pairs": [
              {
                "id": "roots",
                "animal": "blackberry plant",
                "structure": "roots",
                "function": "anchor the plant and take in water"
              },
              {
                "id": "stems",
                "animal": "blackberry plant",
                "structure": "stems",
                "function": "support the plant and move materials"
              },
              {
                "id": "leaves",
                "animal": "blackberry plant",
                "structure": "leaves",
                "function": "capture sunlight"
              },
              {
                "id": "flowers",
                "animal": "blackberry plant",
                "structure": "flowers",
                "function": "support reproduction"
              },
              {
                "id": "thorns",
                "animal": "blackberry plant",
                "structure": "thorns",
                "function": "discourage some animals from feeding"
              }
            ]
          }
        }
      },
      {
        "title": "Connect structures and functions",
        "tag": "plant-structure-functions",
        "widget": null
      },
      {
        "title": "Argue how structures work together",
        "tag": "plant-system-argument",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "The plant's structures work together as one system",
              "One structure does every job for the plant"
            ],
            "details": [
              {
                "id": "roots-water",
                "text": "Roots take in water from the soil.",
                "supports": [
                  "The plant's structures work together as one system"
                ]
              },
              {
                "id": "stems-support",
                "text": "Stems support the leaves and move materials.",
                "supports": [
                  "The plant's structures work together as one system"
                ]
              },
              {
                "id": "leaves-light",
                "text": "Leaves capture sunlight.",
                "supports": [
                  "The plant's structures work together as one system"
                ]
              },
              {
                "id": "only-roots",
                "text": "Roots capture sunlight and support reproduction by themselves.",
                "supports": [
                  "One structure does every job for the plant"
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
        "type": "fill-blank",
        "card": 3
      }
    ]
  },
  {
    "id": "science-u06-l02",
    "title": "Explain Animal Structures as a System",
    "indicatorCodes": [
      "4-LS1-1"
    ],
    "cards": [
      {
        "title": "Identify internal and external structures",
        "tag": "animal-structures",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "Outside the body",
              "Inside the body"
            ],
            "details": [
              {
                "id": "beak",
                "text": "Beak",
                "supports": [
                  "Outside the body"
                ]
              },
              {
                "id": "wings",
                "text": "Wings",
                "supports": [
                  "Outside the body"
                ]
              },
              {
                "id": "feathers",
                "text": "Feathers",
                "supports": [
                  "Outside the body"
                ]
              },
              {
                "id": "heart",
                "text": "Heart",
                "supports": [
                  "Inside the body"
                ]
              },
              {
                "id": "lungs",
                "text": "Lungs",
                "supports": [
                  "Inside the body"
                ]
              }
            ],
            "requiredDetailCount": 2
          }
        }
      },
      {
        "title": "Match structures to functions",
        "tag": "animal-structure-functions",
        "widget": {
          "type": "animal-structure-matcher",
          "config": {
            "pairs": [
              {
                "id": "beak",
                "animal": "wren",
                "structure": "beak",
                "function": "gathers food"
              },
              {
                "id": "wing",
                "animal": "wren",
                "structure": "wing",
                "function": "moves through air"
              },
              {
                "id": "lungs",
                "animal": "wren",
                "structure": "lungs",
                "function": "takes in air"
              },
              {
                "id": "heart",
                "animal": "wren",
                "structure": "heart",
                "function": "moves blood"
              },
              {
                "id": "feathers",
                "animal": "wren",
                "structure": "feathers",
                "function": "protects the body"
              }
            ]
          }
        }
      },
      {
        "title": "Explain a cooperating system",
        "tag": "animal-system-explanation",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "The wren's external and internal structures cooperate",
              "Each of the wren's structures works on its own"
            ],
            "details": [
              {
                "id": "beak-food",
                "text": "The beak gathers food.",
                "supports": [
                  "The wren's external and internal structures cooperate"
                ]
              },
              {
                "id": "lungs-air",
                "text": "The lungs take in air.",
                "supports": [
                  "The wren's external and internal structures cooperate"
                ]
              },
              {
                "id": "heart-blood",
                "text": "The heart moves blood.",
                "supports": [
                  "The wren's external and internal structures cooperate"
                ]
              },
              {
                "id": "alone",
                "text": "The beak breathes, pumps blood, and flies without the other structures.",
                "supports": [
                  "Each of the wren's structures works on its own"
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
        "type": "fill-blank",
        "card": 3
      }
    ]
  },
  {
    "id": "science-u06-l03",
    "title": "Argue How Structures Support Survival",
    "indicatorCodes": [
      "4-LS1-1"
    ],
    "cards": [
      {
        "title": "State a structure-system claim",
        "tag": "structure-claim",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "This is a focused structure-system claim",
              "This is not a focused claim"
            ],
            "details": [
              {
                "id": "plant-claim",
                "text": "The blackberry plant's roots, stems, and leaves work together to support survival during the dry week.",
                "supports": [
                  "This is a focused structure-system claim"
                ]
              },
              {
                "id": "wren-claim",
                "text": "The wren's beak and wings support feeding and movement.",
                "supports": [
                  "This is a focused structure-system claim"
                ]
              },
              {
                "id": "healthy",
                "text": "The plant is healthy.",
                "supports": [
                  "This is not a focused claim"
                ]
              },
              {
                "id": "like",
                "text": "Blackberries taste good.",
                "supports": [
                  "This is not a focused claim"
                ]
              }
            ],
            "requiredDetailCount": 2
          }
        }
      },
      {
        "title": "Select relevant survival evidence",
        "tag": "structure-evidence",
        "widget": {
          "type": "theme-evidence-collector",
          "config": {
            "themeChoices": [
              "The plant's structures supported survival during the dry week",
              "The plant survived because the observer liked its color"
            ],
            "evidence": [
              {
                "id": "roots-damp",
                "text": "Deep roots reached damp soil.",
                "supports": [
                  "The plant's structures supported survival during the dry week"
                ]
              },
              {
                "id": "stem-upright",
                "text": "The upright stem held leaves in sunlight.",
                "supports": [
                  "The plant's structures supported survival during the dry week"
                ]
              },
              {
                "id": "leaves-spread",
                "text": "The leaves remained spread.",
                "supports": [
                  "The plant's structures supported survival during the dry week"
                ]
              },
              {
                "id": "green-card",
                "text": "The observation card was printed on green paper.",
                "supports": [
                  "The plant survived because the observer liked its color"
                ]
              }
            ],
            "requiredEvidenceCount": 3
          }
        }
      },
      {
        "title": "Connect evidence with reasoning",
        "tag": "structure-argument",
        "widget": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "claim",
                "text": "Claim: the plant's roots, stems, and leaves worked together to support survival during the dry week.",
                "role": "main"
              },
              {
                "id": "evidence",
                "text": "Evidence: deep roots reached damp soil and the upright stem held leaves in sunlight.",
                "role": "main"
              },
              {
                "id": "reasoning",
                "text": "Reasoning: water reaching the plant and leaves held in light together support continued growth.",
                "role": "main"
              },
              {
                "id": "limit",
                "text": "The cards do not show what happened after the dry week ended.",
                "role": "detail"
              },
              {
                "id": "paper",
                "text": "The observation card was printed on green paper.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "claim",
              "evidence",
              "reasoning"
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
    "id": "science-u06-l04",
    "title": "Model Sense, Brain, and Response",
    "indicatorCodes": [
      "4-LS1-2"
    ],
    "cards": [
      {
        "title": "Receive information through senses",
        "tag": "sense-input",
        "widget": {
          "type": "animal-structure-matcher",
          "config": {
            "pairs": [
              {
                "id": "ears",
                "animal": "wren",
                "structure": "ears",
                "function": "receives sound information"
              },
              {
                "id": "eyes",
                "animal": "wren",
                "structure": "eyes",
                "function": "receives light information"
              },
              {
                "id": "nose",
                "animal": "wren",
                "structure": "nose",
                "function": "receives odor information"
              },
              {
                "id": "tongue",
                "animal": "wren",
                "structure": "tongue",
                "function": "receives flavor information"
              },
              {
                "id": "skin",
                "animal": "wren",
                "structure": "skin",
                "function": "receives contact information"
              }
            ]
          }
        }
      },
      {
        "title": "Route information through the brain",
        "tag": "brain-processing-model",
        "widget": {
          "type": "energy-transfer-builder",
          "config": {
            "sources": [
              "branch snap",
              "moving shadow",
              "ripe berry scent"
            ],
            "transfers": [
              "hearing",
              "sight",
              "smell"
            ],
            "targets": [
              "brain processes the sound",
              "brain processes the shape",
              "brain processes the odor"
            ],
            "requiredPath": [
              "branch snap",
              "hearing",
              "brain processes the sound"
            ]
          }
        }
      },
      {
        "title": "Connect information to a response",
        "tag": "sense-response-system",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "The same information can lead to more than one response",
              "The same information always forces one response"
            ],
            "details": [
              {
                "id": "turn",
                "text": "After a branch snap, the model bird may turn toward the sound.",
                "supports": [
                  "The same information can lead to more than one response"
                ]
              },
              {
                "id": "pause",
                "text": "After the same snap, it may pause and stay still.",
                "supports": [
                  "The same information can lead to more than one response"
                ]
              },
              {
                "id": "away",
                "text": "After the same snap, it may move away from the sound.",
                "supports": [
                  "The same information can lead to more than one response"
                ]
              },
              {
                "id": "forced",
                "text": "Every branch snap always makes the bird fly away.",
                "supports": [
                  "The same information always forces one response"
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
        "type": "sort",
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

test('Unit 6 is the exact reviewed Science wave', () => {
  expect(unit06Lessons).toHaveLength(specs.length);
  for (const [lessonIndex, lesson] of unit06Lessons.entries()) {
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
  expect(JSON.stringify(unit06Lessons)).not.toMatch(/cellular process|sensory receptor mechanism|memory storage location|retina|alveoli/i);
});

test('every card has an immediate exact missed-result review route', () => {
  for (const lesson of unit06Lessons) {
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

test('sampled structure questions include the complete description or matcher they require', () => {
  const requiredPromptSources = [
    ['science-u06-l01-q03', ['Blackberry description', 'Thorns grow along its stems']],
    ['science-u06-l02-q08', ['On-screen matcher', 'beak with gathering food', 'wings with flight', 'heart with moving blood', 'lungs with taking in air']],
  ] as const;

  const questions = new Map(unit06Lessons.flatMap((lesson) => lesson.quiz.pool).map((question) => [question.id, question]));
  for (const [questionId, requiredSources] of requiredPromptSources) {
    const prompt = questions.get(questionId)?.prompt;
    expect(prompt, `${questionId} should exist`).toBeDefined();
    for (const source of requiredSources) expect(prompt, `${questionId} should include ${source}`).toContain(source);
  }
});
