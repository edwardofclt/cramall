import { expect, test } from 'vitest';
import { normalizeAnswerText } from '../answer-normalization';
import { validateLesson, WidgetRefSchema, type Question } from '../schema';
import { buildResult, type Answer } from '../../quiz/engine';
import { unit04Lessons } from './u04';

const specs = [
  {
    "id": "science-u04-l01",
    "title": "Build Two-Value Message Patterns",
    "indicatorCodes": [
      "4-PS4-3"
    ],
    "cards": [
      {
        "title": "Define two signal values",
        "tag": "two-value-code",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "This is a two-value code",
              "This is not a two-value code"
            ],
            "details": [
              {
                "id": "zero-one",
                "text": "A code that uses only 0 and 1.",
                "supports": [
                  "This is a two-value code"
                ]
              },
              {
                "id": "off-on",
                "text": "A code that uses only off and on.",
                "supports": [
                  "This is a two-value code"
                ]
              },
              {
                "id": "dot-dash",
                "text": "A code that uses only dot and dash.",
                "supports": [
                  "This is a two-value code"
                ]
              },
              {
                "id": "three",
                "text": "A code that uses low, medium, and high.",
                "supports": [
                  "This is not a two-value code"
                ]
              }
            ],
            "requiredDetailCount": 3
          }
        }
      },
      {
        "title": "Encode a short message",
        "tag": "encode-pattern",
        "widget": {
          "type": "message-sender",
          "config": {
            "encoding": "binary",
            "message": "A"
          }
        }
      },
      {
        "title": "Check whether a receiver can decode",
        "tag": "decode-pattern",
        "widget": {
          "type": "message-sender",
          "config": {
            "encoding": "binary",
            "message": "HI"
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
    "id": "science-u04-l02",
    "title": "Design Morse and Drum Codes",
    "indicatorCodes": [
      "4-PS4-3"
    ],
    "cards": [
      {
        "title": "Use dots and dashes",
        "tag": "morse-pattern",
        "widget": {
          "type": "message-sender",
          "config": {
            "encoding": "morse",
            "message": "A"
          }
        }
      },
      {
        "title": "Use two drum sounds",
        "tag": "drum-pattern",
        "widget": {
          "type": "message-sender",
          "config": {
            "encoding": "morse",
            "message": "SOS"
          }
        }
      },
      {
        "title": "Compare code clarity",
        "tag": "code-clarity-comparison",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "A clear code keeps its two values easy to tell apart",
              "A clear code can reuse one value for two meanings"
            ],
            "details": [
              {
                "id": "distinct",
                "text": "Dot and dash look different on a printed card.",
                "supports": [
                  "A clear code keeps its two values easy to tell apart"
                ]
              },
              {
                "id": "order",
                "text": "The receiver reads the values in the agreed order.",
                "supports": [
                  "A clear code keeps its two values easy to tell apart"
                ]
              },
              {
                "id": "boundary",
                "text": "A separator marks where one character ends and the next begins.",
                "supports": [
                  "A clear code keeps its two values easy to tell apart"
                ]
              },
              {
                "id": "reuse",
                "text": "One value stands for both A and B depending on mood.",
                "supports": [
                  "A clear code can reuse one value for two meanings"
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
  },  {
    "id": "science-u04-l03",
    "title": "Send Binary-Grid Picture Messages",
    "indicatorCodes": [
      "4-PS4-3"
    ],
    "cards": [
      {
        "title": "Assign black and white values",
        "tag": "binary-grid-values",
        "widget": {
          "type": "message-sender",
          "config": {
            "encoding": "binary",
            "message": "A"
          }
        }
      },
      {
        "title": "Read rows in a shared order",
        "tag": "binary-grid-order",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "Reading order changes the picture",
              "Reading order does not matter"
            ],
            "details": [
              {
                "id": "top-left",
                "text": "The agreed order begins at the top-left square.",
                "supports": [
                  "Reading order changes the picture"
                ]
              },
              {
                "id": "left-right",
                "text": "Each row is read left to right before the next row begins.",
                "supports": [
                  "Reading order changes the picture"
                ]
              },
              {
                "id": "different",
                "text": "Reading the same four values down the columns produces a different picture.",
                "supports": [
                  "Reading order changes the picture"
                ]
              },
              {
                "id": "any-order",
                "text": "Any order of the same values gives the same picture.",
                "supports": [
                  "Reading order does not matter"
                ]
              }
            ],
            "requiredDetailCount": 3
          }
        }
      },
      {
        "title": "Find and repair a mismatch",
        "tag": "binary-grid-debugging",
        "widget": {
          "type": "message-sender",
          "config": {
            "encoding": "binary",
            "message": "B"
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
  },  {
    "id": "science-u04-l04",
    "title": "Compare Message Solutions",
    "indicatorCodes": [
      "4-PS4-3"
    ],
    "cards": [
      {
        "title": "Name comparison criteria",
        "tag": "message-criteria",
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "Accuracy",
              "Clarity",
              "Efficiency"
            ],
            "details": [
              {
                "id": "decoded",
                "text": "Morse decoded 4 of 4 characters correctly.",
                "supports": [
                  "Accuracy"
                ]
              },
              {
                "id": "errors",
                "text": "The drum code decoded 3 of 4 characters in the noisy condition.",
                "supports": [
                  "Accuracy"
                ]
              },
              {
                "id": "distinguish",
                "text": "Dot and dash stay easy to tell apart on paper.",
                "supports": [
                  "Clarity"
                ]
              },
              {
                "id": "values",
                "text": "The grid strip used 16 values to send the message.",
                "supports": [
                  "Efficiency"
                ]
              },
              {
                "id": "count",
                "text": "Morse used 12 values to send the same message.",
                "supports": [
                  "Efficiency"
                ]
              }
            ],
            "requiredDetailCount": 2
          }
        }
      },
      {
        "title": "Test accuracy and efficiency",
        "tag": "message-solution-evidence",
        "widget": {
          "type": "data-plot-builder",
          "config": {
            "kind": "bar",
            "prompt": "Build the results bar graph from the supplied record: values used by each solution.",
            "categories": [
              "Morse",
              "Drums",
              "Grid strip"
            ],
            "target": {
              "Morse": 12,
              "Drums": 10,
              "Grid strip": 16
            }
          }
        }
      },
      {
        "title": "Choose and justify a solution",
        "tag": "message-solution-choice",
        "widget": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "choice",
                "text": "For an accurate printed card, the Morse solution fits best.",
                "role": "main"
              },
              {
                "id": "accuracy",
                "text": "Morse decoded 4 of 4 characters in the supplied record.",
                "role": "main"
              },
              {
                "id": "efficiency",
                "text": "Morse used 12 values, fewer than the grid strip's 16.",
                "role": "main"
              },
              {
                "id": "limit",
                "text": "The record does not show how Morse performs in a noisy room.",
                "role": "detail"
              },
              {
                "id": "favorite",
                "text": "The drum code sounds the most fun.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "choice",
              "accuracy",
              "efficiency"
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

test('Unit 4 is the exact reviewed Science wave', () => {
  expect(unit04Lessons).toHaveLength(specs.length);
  for (const [lessonIndex, lesson] of unit04Lessons.entries()) {
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
  expect(JSON.stringify(unit04Lessons)).not.toMatch(/live partner|classmate|recording assessment|voice scoring|electronic device required/i);
});

test('every card has an immediate exact missed-result review route', () => {
  for (const lesson of unit04Lessons) {
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
    'science-u04-l01-q08': 'An in-app message activity encodes and decodes A with an authored key; it has no connection to another person. The activity sends information to a live person outside the app.',
    'science-u04-l02-q03': 'A printed Morse reference states A = dot-dash. Which pattern does it assign to A?',
    'science-u04-l02-q11': 'A learner must choose a code for a printed card. Written Morse uses visible dots and dashes; a drum code uses low and high sounds that may be affected by noise. Which evidence favors Morse?',
    'science-u04-l03-q01': 'A picture code assigns every grid square one of two values: black or white. What are the two values in this picture code?',
    'science-u04-l03-q03': 'An intended 2 × 2 grid is read from top-left across each row: black, white | white, black. Which squares are black?',
    'science-u04-l03-q04': 'An intended 2 × 2 grid is read from top-left across each row: black, white | white, black. The top-left square is ___.',
    'science-u04-l03-q05': 'For a 2 × 2 grid, the sender and receiver agree to start at top-left, read left to right, and then continue on the next row. Where does the reading order begin?',
    'science-u04-l03-q07': 'An intended 2 × 2 grid has black top-left and bottom-right squares and white top-right and bottom-left squares. What pattern represents it in row order?',
    'science-u04-l04-q05': 'Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. Which solutions decoded all four characters?',
    'science-u04-l04-q06': 'Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. The drum solution had one decoding error in the noise condition.',
    'science-u04-l04-q07': 'Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. Which accurate solution used fewer values?',
    'science-u04-l04-q08': 'Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. Why is this a fair comparison?',
    'science-u04-l04-q09': 'Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. Which choice is best justified for accurate compact print?',
    'science-u04-l04-q11': 'Example choice: For an accurate printed card, Morse decoded all four characters using 12 values, but readers still need the shared key. What is one Morse limitation in this example?',
    'science-u04-l04-q13': 'Results: Morse decoded 4/4 using 12 values; grid decoded 4/4 using 16 values. Complete the justification: I choose Morse because it decoded 4/4 and used ___ values.',
  } as const;

  const questions = new Map(unit04Lessons.flatMap((lesson) => lesson.quiz.pool).map((question) => [question.id, question]));
  for (const [questionId, expectedPrompt] of Object.entries(expectedPrompts)) {
    expect(questions.get(questionId)?.prompt, questionId).toBe(expectedPrompt);
  }
});
