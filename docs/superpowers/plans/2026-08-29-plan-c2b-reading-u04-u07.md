# Plan C2B: Reading Units 4–7 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the exact reviewed Grade 4 Reading content assigned to this wave with no learner-content decisions left to execution.

**Architecture:** Copy the complete TypeScript modules and focused tests in this plan exactly. Each lesson is one red/green/review/commit slice; later slices append their already-supplied object and expected-test rows without changing earlier accepted content.

**Tech Stack:** React 18 content model, TypeScript 5, Zod 3, Vitest 2, Vite 5; no dependency changes.

**Spec:** `docs/superpowers/specs/2026-08-29-cram-all-design.md`

## Global Constraints

- Read `AGENTS.md`, Plan C master, Reading blueprint, final `LessonSchema`, `WidgetRefSchema`, registry, frame, and master C1 helper contracts before editing. Stop unless accepted Plan A remediation, completed Plan B, and the normal baseline are green.
- Modify only the source/test paths named in this plan. Never edit Reading indexes, shared contracts, generated standards, `.github/**`, or `src/characters/**`.
- The code blocks below are complete final-file literals. Copy them exactly; do not design helpers, prose, IDs, options, checks, mappings, or widget fields during execution.
- Every lesson has exactly three cards, three visible-prior-material checks, 13 q01–q13 questions, threshold 8, Winnie intros, exact regular indicators, and `[...READING_OE_CODES]` resolving to all six ordered OE codes.
- The complete source remains visible through `workedExample.passage` and `quiz.reference`. Solo work is sufficient; optional read-aloud is assistance only. No widget state writes scoring, progress, analytics, or storage.

---

### Task 1: Freeze the dependency and workspace gate

**Files:** Read `AGENTS.md`, governing plans/spec, ledgers, `src/content/schema.ts`, `src/content/curriculum.ts`, `src/content/unit-test-helpers.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`; inspect `src/content/reading/u04.ts`, `src/content/reading/u04.test.ts`, `src/content/reading/u05.ts`, `src/content/reading/u05.test.ts`, `src/content/reading/u06.ts`, `src/content/reading/u06.test.ts`, `src/content/reading/u07.ts`, `src/content/reading/u07.test.ts`.

**Consumes:** Accepted Plan A remediation, completed/reviewed Plan B, and master C1 contracts including `READING_OE_CODES`, `crossCuttingExpectationCodes`, and `expectUnitLessons`.

**Produces:** A recorded green baseline and confirmation that only this wave owns the named files.

- [ ] **Step 1 (2–5 minutes): Inspect ownership.** Run `git status --short`, `git diff --stat`, `git log -8 --oneline`, and read both execution ledgers. Stop on overlapping changes to owned paths.
- [ ] **Step 2 (2–5 minutes): Verify interfaces.** Confirm all widget refs in the final modules below parse with the implemented strict `WidgetRefSchema` and the master helper signature matches the imports in the test literals.
- [ ] **Step 3 (2–5 minutes): Run baseline.** Run `npm test && npx tsc -b --pretty false && npm run build`; record the exact commit and result.

## Complete copy-ready final files

### `src/content/reading/u04.ts`

```ts
import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit04Lessons = [
  {
    "id": "reading-u04-l01",
    "unitId": "reading-u04",
    "title": "Explain Explicit and Implied Themes",
    "indicatorCodes": [
      "ELA.4.AOR.2.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "A topic names a subject; a theme states a transferable message."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Some texts state a theme, while others imply it through choices and consequences."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s gather key details and explain how the message grows."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u04-l01-c1",
        "title": "State a Theme as a Message",
        "blocks": [
          {
            "kind": "text",
            "text": "A theme is a complete message that applies beyond one story."
          },
          {
            "kind": "example",
            "text": "“Generosity strengthens a community” is a theme; “gardening” is only a topic."
          },
          {
            "kind": "tip",
            "text": "State the message without using a character’s name."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which choice is a theme?",
          "choices": [
            {
              "id": "a",
              "text": "Generosity strengthens a community"
            },
            {
              "id": "b",
              "text": "Mateo plants peppers"
            },
            {
              "id": "c",
              "text": "Gardening"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It is a complete transferable message."
        }
      },
      {
        "id": "reading-u04-l01-c2",
        "title": "Gather Key Details",
        "blocks": [
          {
            "kind": "text",
            "text": "Strong theme evidence includes repeated choices, turning points, and consequences."
          },
          {
            "kind": "example",
            "text": "Mateo shares the extra row; later Ana’s stakes help his tomatoes."
          },
          {
            "kind": "tip",
            "text": "Choose details that show both the message and its result."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "widget": {
          "type": "theme-evidence-collector",
          "config": {
            "themeChoices": [
              "Generosity strengthens a community",
              "Gardening takes careful planning"
            ],
            "evidence": [
              {
                "id": "shares",
                "text": "Mateo gives his neighbor part of the extra row.",
                "supports": [
                  "Generosity strengthens a community"
                ]
              },
              {
                "id": "replants",
                "text": "They replant the washed-out seedlings together.",
                "supports": [
                  "Generosity strengthens a community"
                ]
              },
              {
                "id": "measures",
                "text": "Mateo measures the garden rows before planting.",
                "supports": [
                  "Gardening takes careful planning"
                ]
              }
            ],
            "requiredEvidenceCount": 2
          }
        },
        "check": {
          "prompt": "Which detail best supports generosity?",
          "choices": [
            {
              "id": "a",
              "text": "Mateo gives Ana part of the extra row"
            },
            {
              "id": "b",
              "text": "Mateo measures rows"
            },
            {
              "id": "c",
              "text": "Rain falls at night"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That action directly shows sharing."
        }
      },
      {
        "id": "reading-u04-l01-c3",
        "title": "Explain How the Theme Develops",
        "blocks": [
          {
            "kind": "text",
            "text": "Explain development as a chain: early attitude → key choice → consequence → message."
          },
          {
            "kind": "example",
            "text": "Mateo guards the row, sees Ana’s loss, shares, and receives cooperation."
          },
          {
            "kind": "tip",
            "text": "An explanation needs evidence and reasoning, not a device label."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "What consequence develops the theme?",
          "choices": [
            {
              "id": "a",
              "text": "The families begin sharing work and vegetables"
            },
            {
              "id": "b",
              "text": "The rows are straight"
            },
            {
              "id": "c",
              "text": "The rain stops"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The community grows more cooperative after Mateo shares."
        }
      }
    ],
    "workedExample": {
      "title": "Infer generosity from choices and consequences",
      "passage": {
        "title": "The Extra Row",
        "text": "The Extra Row\n\nMateo measured straight garden rows for the neighborhood planting day. When Mrs. Green asked whether the new family next door could use the extra row beside his tomatoes, Mateo shook his head. He had planned to fill it with peppers, although he already had more seedlings than his yard could hold.\n\nThat night, hard rain washed the neighbors’ newly planted seedlings from their sloped bed. The next morning, Mateo found Ana gathering broken stems. He looked at his untouched extra row, then carried over a tray of pepper seedlings. “We can plant these together,” he said.\n\nAna and Mateo rebuilt the row, pressed soil around each plant, and shared the watering job. A week later, Ana brought stakes that kept Mateo’s tomato vines upright. Their two families began trading garden tasks and vegetables.\n\nNo narrator states the story’s lesson directly. Mateo’s choice to give up space helps Ana, and that generosity later brings cooperation back to him. The events support the implied theme that generosity strengthens a community."
      },
      "steps": [
        "State the topic as generosity.",
        "Compare Mateo’s refusal with his later decision and its consequences.",
        "Conclude that generosity strengthens a community and cite both the shared row and later cooperation."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “The Extra Row”",
        "text": "The Extra Row\n\nMateo measured straight garden rows for the neighborhood planting day. When Mrs. Green asked whether the new family next door could use the extra row beside his tomatoes, Mateo shook his head. He had planned to fill it with peppers, although he already had more seedlings than his yard could hold.\n\nThat night, hard rain washed the neighbors’ newly planted seedlings from their sloped bed. The next morning, Mateo found Ana gathering broken stems. He looked at his untouched extra row, then carried over a tray of pepper seedlings. “We can plant these together,” he said.\n\nAna and Mateo rebuilt the row, pressed soil around each plant, and shared the watering job. A week later, Ana brought stakes that kept Mateo’s tomato vines upright. Their two families began trading garden tasks and vegetables.\n\nNo narrator states the story’s lesson directly. Mateo’s choice to give up space helps Ana, and that generosity later brings cooperation back to him. The events support the implied theme that generosity strengthens a community."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which is the strongest theme statement?",
          "choices": [
            {
              "id": "a",
              "text": "Generosity strengthens a community"
            },
            {
              "id": "b",
              "text": "Gardens need rain"
            },
            {
              "id": "c",
              "text": "Mateo owns peppers"
            },
            {
              "id": "d",
              "text": "Neighbors live nearby"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Only the first is a transferable message supported by the whole story.",
          "id": "reading-u04-l01-q01",
          "conceptTag": "theme-statement",
          "reviewCardId": "reading-u04-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "“Gardening” is a theme because it names the story’s subject.",
          "choices": [
            {
              "id": "true",
              "text": "True — one word is a full message"
            },
            {
              "id": "false",
              "text": "False — it is a topic, not a message"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "A theme expresses what the text suggests about a topic.",
          "id": "reading-u04-l01-q02",
          "conceptTag": "theme-statement",
          "reviewCardId": "reading-u04-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why is “Sharing can lead to cooperation” a theme?",
          "choices": [
            {
              "id": "a",
              "text": "It names Mateo"
            },
            {
              "id": "b",
              "text": "It retells the storm"
            },
            {
              "id": "c",
              "text": "It expresses a lesson beyond this story"
            },
            {
              "id": "d",
              "text": "It lists garden tools"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It transfers to other situations.",
          "id": "reading-u04-l01-q03",
          "conceptTag": "theme-statement",
          "reviewCardId": "reading-u04-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which statement is unsupported?",
          "choices": [
            {
              "id": "a",
              "text": "Generosity can return through cooperation"
            },
            {
              "id": "b",
              "text": "People can revise a selfish choice"
            },
            {
              "id": "c",
              "text": "Helping neighbors builds connection"
            },
            {
              "id": "d",
              "text": "Every garden must grow peppers"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The story never requires peppers in every garden.",
          "id": "reading-u04-l01-q04",
          "conceptTag": "theme-statement",
          "reviewCardId": "reading-u04-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail most directly shows Mateo changing?",
          "choices": [
            {
              "id": "a",
              "text": "He measures rows"
            },
            {
              "id": "b",
              "text": "He offers the extra row and seedlings"
            },
            {
              "id": "c",
              "text": "Rain washes a bed"
            },
            {
              "id": "d",
              "text": "Ana gathers stems"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "His offer reverses his refusal.",
          "id": "reading-u04-l01-q05",
          "conceptTag": "theme-evidence",
          "reviewCardId": "reading-u04-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "Ana’s later help with tomato stakes supports the community theme.",
          "choices": [
            {
              "id": "true",
              "text": "True — help is returned"
            },
            {
              "id": "false",
              "text": "False — it is unrelated"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The returned help shows reciprocal community care.",
          "id": "reading-u04-l01-q06",
          "conceptTag": "theme-evidence",
          "reviewCardId": "reading-u04-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which pair is strongest evidence?",
          "choices": [
            {
              "id": "a",
              "text": "straight rows and rain"
            },
            {
              "id": "b",
              "text": "tomatoes and peppers"
            },
            {
              "id": "c",
              "text": "Mateo shares; Ana later helps"
            },
            {
              "id": "d",
              "text": "a tray and stakes"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The actions and consequences support the message.",
          "id": "reading-u04-l01-q07",
          "conceptTag": "theme-evidence",
          "reviewCardId": "reading-u04-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail is least useful as theme evidence?",
          "choices": [
            {
              "id": "a",
              "text": "Mateo first refuses"
            },
            {
              "id": "b",
              "text": "Mateo shares after seeing the damage"
            },
            {
              "id": "c",
              "text": "Families trade tasks"
            },
            {
              "id": "d",
              "text": "Mateo measured straight rows"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Measurement does not develop generosity.",
          "id": "reading-u04-l01-q08",
          "conceptTag": "theme-evidence",
          "reviewCardId": "reading-u04-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does the theme begin developing?",
          "choices": [
            {
              "id": "a",
              "text": "Mateo’s refusal establishes a contrast for his later generosity"
            },
            {
              "id": "b",
              "text": "The narrator states the moral"
            },
            {
              "id": "c",
              "text": "Ana teaches a speech"
            },
            {
              "id": "d",
              "text": "The rain solves everything"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The early refusal makes the change meaningful.",
          "id": "reading-u04-l01-q09",
          "conceptTag": "theme-development",
          "reviewCardId": "reading-u04-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "Before the final explanatory paragraph, readers must infer the theme from Mateo’s actions and their consequences.",
          "choices": [
            {
              "id": "true",
              "text": "True — the events imply the message before it is explained"
            },
            {
              "id": "false",
              "text": "False — Mateo announces it"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Mateo never states the message; the final explanatory paragraph names the theme after the narrative events imply it.",
          "id": "reading-u04-l01-q10",
          "conceptTag": "theme-development",
          "reviewCardId": "reading-u04-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "What is the key turning point?",
          "choices": [
            {
              "id": "a",
              "text": "The rows are measured"
            },
            {
              "id": "b",
              "text": "Mateo sees Ana’s damaged seedlings and chooses to share"
            },
            {
              "id": "c",
              "text": "Tomatoes need stakes"
            },
            {
              "id": "d",
              "text": "Families eat vegetables"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "His choice changes the relationship.",
          "id": "reading-u04-l01-q11",
          "conceptTag": "theme-development",
          "reviewCardId": "reading-u04-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation best shows development?",
          "choices": [
            {
              "id": "a",
              "text": "The story is about a garden"
            },
            {
              "id": "b",
              "text": "Mateo has many seedlings"
            },
            {
              "id": "c",
              "text": "Mateo moves from guarding space to sharing it, and the resulting cooperation supports the theme"
            },
            {
              "id": "d",
              "text": "Rain is bad"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It links change, result, and message.",
          "id": "reading-u04-l01-q12",
          "conceptTag": "theme-development",
          "reviewCardId": "reading-u04-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response uses evidence and reasoning?",
          "choices": [
            {
              "id": "a",
              "text": "Theme: kindness"
            },
            {
              "id": "b",
              "text": "Mateo is nice"
            },
            {
              "id": "c",
              "text": "Gardens create themes"
            },
            {
              "id": "d",
              "text": "Mateo gives a row and Ana later helps; these connected acts show generosity strengthening their community"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It cites details and explains their connection.",
          "id": "reading-u04-l01-q13",
          "conceptTag": "theme-development",
          "reviewCardId": "reading-u04-l01-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
```

### `src/content/reading/u04.test.ts`

```ts
import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit04Lessons } from './u04';

const expectedManifest = [
  {
    "id": "reading-u04-l01",
    "unitId": "reading-u04",
    "title": "Explain Explicit and Implied Themes",
    "indicatorCodes": [
      "ELA.4.AOR.2.1"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u04-l01",
    "cards": [
      {
        "id": "reading-u04-l01-c1",
        "title": "State a Theme as a Message",
        "conceptTag": "theme-statement"
      },
      {
        "id": "reading-u04-l01-c2",
        "title": "Gather Key Details",
        "conceptTag": "theme-evidence"
      },
      {
        "id": "reading-u04-l01-c3",
        "title": "Explain How the Theme Develops",
        "conceptTag": "theme-development"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u04-l01",
    "questions": [
      {
        "id": "reading-u04-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "theme-statement",
        "reviewCardId": "reading-u04-l01-c1"
      },
      {
        "id": "reading-u04-l01-q02",
        "type": "true-false",
        "conceptTag": "theme-statement",
        "reviewCardId": "reading-u04-l01-c1"
      },
      {
        "id": "reading-u04-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "theme-statement",
        "reviewCardId": "reading-u04-l01-c1"
      },
      {
        "id": "reading-u04-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "theme-statement",
        "reviewCardId": "reading-u04-l01-c1"
      },
      {
        "id": "reading-u04-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "theme-evidence",
        "reviewCardId": "reading-u04-l01-c2"
      },
      {
        "id": "reading-u04-l01-q06",
        "type": "true-false",
        "conceptTag": "theme-evidence",
        "reviewCardId": "reading-u04-l01-c2"
      },
      {
        "id": "reading-u04-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "theme-evidence",
        "reviewCardId": "reading-u04-l01-c2"
      },
      {
        "id": "reading-u04-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "theme-evidence",
        "reviewCardId": "reading-u04-l01-c2"
      },
      {
        "id": "reading-u04-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "theme-development",
        "reviewCardId": "reading-u04-l01-c3"
      },
      {
        "id": "reading-u04-l01-q10",
        "type": "true-false",
        "conceptTag": "theme-development",
        "reviewCardId": "reading-u04-l01-c3"
      },
      {
        "id": "reading-u04-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "theme-development",
        "reviewCardId": "reading-u04-l01-c3"
      },
      {
        "id": "reading-u04-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "theme-development",
        "reviewCardId": "reading-u04-l01-c3"
      },
      {
        "id": "reading-u04-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "theme-development",
        "reviewCardId": "reading-u04-l01-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u04-l01",
    "checks": [
      {
        "cardId": "reading-u04-l01-c1",
        "check": {
          "prompt": "Which choice is a theme?",
          "choices": [
            {
              "id": "a",
              "text": "Generosity strengthens a community"
            },
            {
              "id": "b",
              "text": "Mateo plants peppers"
            },
            {
              "id": "c",
              "text": "Gardening"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It is a complete transferable message."
        }
      },
      {
        "cardId": "reading-u04-l01-c2",
        "check": {
          "prompt": "Which detail best supports generosity?",
          "choices": [
            {
              "id": "a",
              "text": "Mateo gives Ana part of the extra row"
            },
            {
              "id": "b",
              "text": "Mateo measures rows"
            },
            {
              "id": "c",
              "text": "Rain falls at night"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That action directly shows sharing."
        }
      },
      {
        "cardId": "reading-u04-l01-c3",
        "check": {
          "prompt": "What consequence develops the theme?",
          "choices": [
            {
              "id": "a",
              "text": "The families begin sharing work and vegetables"
            },
            {
              "id": "b",
              "text": "The rows are straight"
            },
            {
              "id": "c",
              "text": "The rain stops"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The community grows more cooperative after Mateo shares."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u04-l01",
    "widgets": [
      {
        "cardId": "reading-u04-l01-c2",
        "ref": {
          "type": "theme-evidence-collector",
          "config": {
            "themeChoices": [
              "Generosity strengthens a community",
              "Gardening takes careful planning"
            ],
            "evidence": [
              {
                "id": "shares",
                "text": "Mateo gives his neighbor part of the extra row.",
                "supports": [
                  "Generosity strengthens a community"
                ]
              },
              {
                "id": "replants",
                "text": "They replant the washed-out seedlings together.",
                "supports": [
                  "Generosity strengthens a community"
                ]
              },
              {
                "id": "measures",
                "text": "Mateo measures the garden rows before planting.",
                "supports": [
                  "Gardening takes careful planning"
                ]
              }
            ],
            "requiredEvidenceCount": 2
          }
        }
      }
    ]
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u04-l01",
    "passage": {
      "title": "The Extra Row",
      "text": "The Extra Row\n\nMateo measured straight garden rows for the neighborhood planting day. When Mrs. Green asked whether the new family next door could use the extra row beside his tomatoes, Mateo shook his head. He had planned to fill it with peppers, although he already had more seedlings than his yard could hold.\n\nThat night, hard rain washed the neighbors’ newly planted seedlings from their sloped bed. The next morning, Mateo found Ana gathering broken stems. He looked at his untouched extra row, then carried over a tray of pepper seedlings. “We can plant these together,” he said.\n\nAna and Mateo rebuilt the row, pressed soil around each plant, and shared the watering job. A week later, Ana brought stakes that kept Mateo’s tomato vines upright. Their two families began trading garden tasks and vegetables.\n\nNo narrator states the story’s lesson directly. Mateo’s choice to give up space helps Ana, and that generosity later brings cooperation back to him. The events support the implied theme that generosity strengthens a community."
    },
    "reference": {
      "title": "Read “The Extra Row”",
      "text": "The Extra Row\n\nMateo measured straight garden rows for the neighborhood planting day. When Mrs. Green asked whether the new family next door could use the extra row beside his tomatoes, Mateo shook his head. He had planned to fill it with peppers, although he already had more seedlings than his yard could hold.\n\nThat night, hard rain washed the neighbors’ newly planted seedlings from their sloped bed. The next morning, Mateo found Ana gathering broken stems. He looked at his untouched extra row, then carried over a tray of pepper seedlings. “We can plant these together,” he said.\n\nAna and Mateo rebuilt the row, pressed soil around each plant, and shared the watering job. A week later, Ana brought stakes that kept Mateo’s tomato vines upright. Their two families began trading garden tasks and vegetables.\n\nNo narrator states the story’s lesson directly. Mateo’s choice to give up space helps Ana, and that generosity later brings cooperation back to him. The events support the implied theme that generosity strengthens a community."
    },
    "evidence": [
      "extra row",
      "generosity",
      "cooperation"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 4 literal content', () => {
  test('describes the theme as inferred before the final explanatory paragraph states it', () => {
    const question = unit04Lessons[0]!.quiz.pool.find(({ id }) => id === 'reading-u04-l01-q10');
    expect(question?.prompt).toBe('Before the final explanatory paragraph, readers must infer the theme from Mateo’s actions and their consequences.');
    expect('choices' in question! && question.choices[0]!.text).toBe('True — the events imply the message before it is explained');
    expect(question?.explanation).toBe('Mateo never states the message; the final explanatory paragraph names the theme after the narrative events imply it.');
  });

  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit04Lessons, expectedManifest, 'reading');
    expect(unit04Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit04Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit04Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit04Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit04Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit04Lessons) {
      expect(validateLesson(lesson)).toEqual([]);
      const source=expectedSources.find(row=>row.id===lesson.id)!;
      expect(lesson.workedExample.passage).toEqual(source.passage);
      expect(lesson.quiz.reference).toEqual(source.reference);
      expect(lesson.workedExample.passage!.text).toBe(lesson.quiz.reference!.text);
      for (const token of source.evidence) expect(source.passage.text).toContain(token);
      for (const card of lesson.learnCards) {
        expect(card.check).toBeDefined();
        expect(card.blocks.some(block=>block.text.startsWith('Support:')||block.text.startsWith('Response frame:')||block.text.startsWith('Stretch:'))).toBe(true);
        if ('widget' in card) expect(WidgetRefSchema.safeParse(card.widget).success).toBe(true);
      }
    }
  });

  test('keeps exact pools, unique visible answers, balanced MC keys, and solo framing', () => {
    for (const lesson of unit04Lessons) {
      expect(lesson.quiz.passThreshold).toBe(8);
      expect(lesson.quiz.pool.map(question=>question.id)).toEqual(Array.from({length:13},(_,index)=>`${lesson.id}-q${String(index+1).padStart(2,'0')}`));
      expect(new Set(lesson.quiz.pool.map(question=>question.conceptTag)).size).toBe(3);
      for (const question of lesson.quiz.pool) {
        const options=visible(question);
        expect(new Set(options.map(option=>option.id)).size).toBe(options.length);
        expect(new Set(options.map(option=>normalize(option.text))).size).toBe(options.length);
      }
      const keys=lesson.quiz.pool.filter(question=>question.type==='multiple-choice').map(question=>question.correctChoiceId);
      const counts=new Map<string,number>(); for(const key of keys) counts.set(key,(counts.get(key)??0)+1);
      expect([...counts.keys()].sort()).toEqual(['a','b','c','d']);
      expect(Math.max(...counts.values())-Math.min(...counts.values())).toBeLessThanOrEqual(1);
      expect(JSON.stringify(lesson)).not.toMatch(/live (partner|classmate|collaboration)|recording score|words per minute score/i);
    }
  });
});
```

### `src/content/reading/u05.ts`

```ts
import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit05Lessons = [
  {
    "id": "reading-u05-l01",
    "unitId": "reading-u05",
    "title": "Explain Stated and Implied Central Ideas",
    "indicatorCodes": [
      "ELA.4.AOR.2.2"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "A central idea is a complete statement about an informational text."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "It may be stated directly or implied by connected details."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s identify it, select support, and explain how each detail develops it."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u05-l01-c1",
        "title": "Find the Central Idea",
        "blocks": [
          {
            "kind": "text",
            "text": "Ask what most of the text explains and say it as a complete sentence."
          },
          {
            "kind": "example",
            "text": "The opening states: “Salt marshes support wildlife and shorelines.”"
          },
          {
            "kind": "tip",
            "text": "Do not choose a fact that covers only one sentence."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which is a central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Salt marshes support wildlife and shorelines"
            },
            {
              "id": "b",
              "text": "Young fish hide"
            },
            {
              "id": "c",
              "text": "Tides rise"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It covers the text’s main explanation."
        }
      },
      {
        "id": "reading-u05-l01-c2",
        "title": "Choose Supporting Details",
        "blocks": [
          {
            "kind": "text",
            "text": "A supporting detail proves, explains, or illustrates the central idea."
          },
          {
            "kind": "example",
            "text": "Young fish shelter among grasses and plants slow waves."
          },
          {
            "kind": "tip",
            "text": "Interesting facts that do not support the idea should be left out."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "Salt marshes support wildlife and shorelines",
              "Every wet place is a salt marsh"
            ],
            "details": [
              {
                "id": "nursery",
                "text": "Young fish find shelter among marsh grasses.",
                "supports": [
                  "Salt marshes support wildlife and shorelines"
                ]
              },
              {
                "id": "buffer",
                "text": "Marsh plants slow waves near the shoreline.",
                "supports": [
                  "Salt marshes support wildlife and shorelines"
                ]
              },
              {
                "id": "definition",
                "text": "Any place with rainwater is a salt marsh.",
                "supports": [
                  "Every wet place is a salt marsh"
                ]
              }
            ],
            "requiredDetailCount": 2
          }
        },
        "check": {
          "prompt": "Which detail supports shoreline protection?",
          "choices": [
            {
              "id": "a",
              "text": "Marsh stems slow waves"
            },
            {
              "id": "b",
              "text": "Birds have feathers"
            },
            {
              "id": "c",
              "text": "Researchers carry pencils"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It explains the shoreline-buffer part of the idea."
        }
      },
      {
        "id": "reading-u05-l01-c3",
        "title": "Explain How Details Develop the Idea",
        "blocks": [
          {
            "kind": "text",
            "text": "Explain the role of each detail: example, reason, evidence, or clarification."
          },
          {
            "kind": "example",
            "text": "Fish shelter develops the wildlife part; roots and stems develop the shoreline part."
          },
          {
            "kind": "tip",
            "text": "Use Detail → Part of idea → Connection."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "How does the fish detail develop the idea?",
          "choices": [
            {
              "id": "a",
              "text": "It gives an example of marsh wildlife support"
            },
            {
              "id": "b",
              "text": "It proves every fish lives there"
            },
            {
              "id": "c",
              "text": "It describes a storm"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Shelter among grasses illustrates habitat support."
        }
      }
    ],
    "workedExample": {
      "title": "Connect marsh details to the central idea",
      "passage": {
        "title": "Why Salt Marshes Matter",
        "text": "Why Salt Marshes Matter\n\nSalt marshes support wildlife and shorelines. Twice each day, tides carry water through winding creeks among salt-tolerant grasses. Young fish and shrimp hide between the stems, where larger animals have trouble reaching them. Wading birds feed in the shallow water.\n\nMarsh plants also slow moving water. Their stems bend as waves pass, and their roots hold muddy soil. This buffering can reduce some wave force near the shoreline. The marsh does not stop every storm, but it can soften ordinary wave action.\n\nIn another marsh, researchers count young fish, map nesting areas, and measure changes along the bank. These separate details point to an idea the paragraph does not state in one sentence: a healthy marsh provides several connected benefits. It serves as nursery habitat, feeding space, and a living shoreline buffer. A puddle after rain is not automatically a salt marsh; tides, salty water, soils, and adapted plants work together in this ecosystem."
      },
      "steps": [
        "Read the stated first sentence.",
        "Sort details under wildlife and shoreline support.",
        "Explain how the two groups together develop the central idea."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Why Salt Marshes Matter”",
        "text": "Why Salt Marshes Matter\n\nSalt marshes support wildlife and shorelines. Twice each day, tides carry water through winding creeks among salt-tolerant grasses. Young fish and shrimp hide between the stems, where larger animals have trouble reaching them. Wading birds feed in the shallow water.\n\nMarsh plants also slow moving water. Their stems bend as waves pass, and their roots hold muddy soil. This buffering can reduce some wave force near the shoreline. The marsh does not stop every storm, but it can soften ordinary wave action.\n\nIn another marsh, researchers count young fish, map nesting areas, and measure changes along the bank. These separate details point to an idea the paragraph does not state in one sentence: a healthy marsh provides several connected benefits. It serves as nursery habitat, feeding space, and a living shoreline buffer. A puddle after rain is not automatically a salt marsh; tides, salty water, soils, and adapted plants work together in this ecosystem."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "What is the stated central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Salt marshes support wildlife and shorelines"
            },
            {
              "id": "b",
              "text": "Every wet place is a marsh"
            },
            {
              "id": "c",
              "text": "Only birds use marshes"
            },
            {
              "id": "d",
              "text": "Marshes stop every storm"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The opening states the idea directly.",
          "id": "reading-u05-l01-q01",
          "conceptTag": "central-idea",
          "reviewCardId": "reading-u05-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "A central idea should cover the whole text, not one small fact.",
          "choices": [
            {
              "id": "true",
              "text": "True — it unifies the details"
            },
            {
              "id": "false",
              "text": "False — choose the smallest fact"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "A central idea explains what the details collectively develop.",
          "id": "reading-u05-l01-q02",
          "conceptTag": "central-idea",
          "reviewCardId": "reading-u05-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which central idea is supported by the research paragraph’s observations?",
          "choices": [
            {
              "id": "a",
              "text": "Researchers only study fish"
            },
            {
              "id": "b",
              "text": "Maps are the main benefit"
            },
            {
              "id": "c",
              "text": "Healthy marshes provide several connected benefits"
            },
            {
              "id": "d",
              "text": "Every bank changes equally"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The grouped observations support several connected benefits.",
          "id": "reading-u05-l01-q03",
          "conceptTag": "central-idea",
          "reviewCardId": "reading-u05-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why is “Wading birds feed” not the whole central idea?",
          "choices": [
            {
              "id": "a",
              "text": "It is false"
            },
            {
              "id": "b",
              "text": "It is an opinion"
            },
            {
              "id": "c",
              "text": "It is a title"
            },
            {
              "id": "d",
              "text": "It covers only one supporting detail"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The text explains more than bird feeding.",
          "id": "reading-u05-l01-q04",
          "conceptTag": "central-idea",
          "reviewCardId": "reading-u05-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail supports the wildlife part?",
          "choices": [
            {
              "id": "a",
              "text": "Roots hold soil"
            },
            {
              "id": "b",
              "text": "Young fish hide among grass stems"
            },
            {
              "id": "c",
              "text": "Waves pass the marsh"
            },
            {
              "id": "d",
              "text": "Tides happen twice daily"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Fish shelter is wildlife support.",
          "id": "reading-u05-l01-q05",
          "conceptTag": "supporting-details",
          "reviewCardId": "reading-u05-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "“Marsh plants slow moving water” supports the shoreline part.",
          "choices": [
            {
              "id": "true",
              "text": "True — it explains buffering"
            },
            {
              "id": "false",
              "text": "False — it only describes fish"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Slower water can reduce wave force.",
          "id": "reading-u05-l01-q06",
          "conceptTag": "supporting-details",
          "reviewCardId": "reading-u05-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail does not support “every wet place is a salt marsh”?",
          "choices": [
            {
              "id": "a",
              "text": "Rain makes puddles"
            },
            {
              "id": "b",
              "text": "Wet places contain water"
            },
            {
              "id": "c",
              "text": "A marsh requires tides, salt, soil, and adapted plants"
            },
            {
              "id": "d",
              "text": "Some ground is muddy"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The clarification directly rejects the false idea.",
          "id": "reading-u05-l01-q07",
          "conceptTag": "supporting-details",
          "reviewCardId": "reading-u05-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which pair best spans both parts of the central idea?",
          "choices": [
            {
              "id": "a",
              "text": "birds and fish"
            },
            {
              "id": "b",
              "text": "tides and researchers"
            },
            {
              "id": "c",
              "text": "mud and maps"
            },
            {
              "id": "d",
              "text": "fish shelter and wave slowing"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The pair covers wildlife and shorelines.",
          "id": "reading-u05-l01-q08",
          "conceptTag": "supporting-details",
          "reviewCardId": "reading-u05-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "How do roots develop the central idea?",
          "choices": [
            {
              "id": "a",
              "text": "They hold muddy soil, explaining one way marshes support shorelines"
            },
            {
              "id": "b",
              "text": "They feed every bird"
            },
            {
              "id": "c",
              "text": "They cause all tides"
            },
            {
              "id": "d",
              "text": "They count fish"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Root action develops shoreline support.",
          "id": "reading-u05-l01-q09",
          "conceptTag": "idea-development",
          "reviewCardId": "reading-u05-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "A detail can develop one part of a two-part central idea.",
          "choices": [
            {
              "id": "true",
              "text": "True — details combine across the text"
            },
            {
              "id": "false",
              "text": "False — every detail must prove every part"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Different details build different parts.",
          "id": "reading-u05-l01-q10",
          "conceptTag": "idea-development",
          "reviewCardId": "reading-u05-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "What role does the final clarification play?",
          "choices": [
            {
              "id": "a",
              "text": "It changes the topic"
            },
            {
              "id": "b",
              "text": "It defines boundaries so readers do not overgeneralize"
            },
            {
              "id": "c",
              "text": "It adds a fictional character"
            },
            {
              "id": "d",
              "text": "It proves puddles are marshes"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "It makes the idea precise.",
          "id": "reading-u05-l01-q11",
          "conceptTag": "idea-development",
          "reviewCardId": "reading-u05-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation is complete?",
          "choices": [
            {
              "id": "a",
              "text": "Fish are there"
            },
            {
              "id": "b",
              "text": "Marshes matter"
            },
            {
              "id": "c",
              "text": "Fish shelter shows wildlife support, while stems slowing waves show shoreline support"
            },
            {
              "id": "d",
              "text": "The text has three paragraphs"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It links two details to the two idea parts.",
          "id": "reading-u05-l01-q12",
          "conceptTag": "idea-development",
          "reviewCardId": "reading-u05-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response uses the required format?",
          "choices": [
            {
              "id": "a",
              "text": "Roots — good"
            },
            {
              "id": "b",
              "text": "Birds are interesting"
            },
            {
              "id": "c",
              "text": "The idea is marshes"
            },
            {
              "id": "d",
              "text": "Roots hold soil → shoreline support → less erosion near ordinary waves"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It states detail, idea part, and connection.",
          "id": "reading-u05-l01-q13",
          "conceptTag": "idea-development",
          "reviewCardId": "reading-u05-l01-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
```

### `src/content/reading/u05.test.ts`

```ts
import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit05Lessons } from './u05';

const expectedManifest = [
  {
    "id": "reading-u05-l01",
    "unitId": "reading-u05",
    "title": "Explain Stated and Implied Central Ideas",
    "indicatorCodes": [
      "ELA.4.AOR.2.2"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u05-l01",
    "cards": [
      {
        "id": "reading-u05-l01-c1",
        "title": "Find the Central Idea",
        "conceptTag": "central-idea"
      },
      {
        "id": "reading-u05-l01-c2",
        "title": "Choose Supporting Details",
        "conceptTag": "supporting-details"
      },
      {
        "id": "reading-u05-l01-c3",
        "title": "Explain How Details Develop the Idea",
        "conceptTag": "idea-development"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u05-l01",
    "questions": [
      {
        "id": "reading-u05-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "central-idea",
        "reviewCardId": "reading-u05-l01-c1"
      },
      {
        "id": "reading-u05-l01-q02",
        "type": "true-false",
        "conceptTag": "central-idea",
        "reviewCardId": "reading-u05-l01-c1"
      },
      {
        "id": "reading-u05-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "central-idea",
        "reviewCardId": "reading-u05-l01-c1"
      },
      {
        "id": "reading-u05-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "central-idea",
        "reviewCardId": "reading-u05-l01-c1"
      },
      {
        "id": "reading-u05-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "supporting-details",
        "reviewCardId": "reading-u05-l01-c2"
      },
      {
        "id": "reading-u05-l01-q06",
        "type": "true-false",
        "conceptTag": "supporting-details",
        "reviewCardId": "reading-u05-l01-c2"
      },
      {
        "id": "reading-u05-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "supporting-details",
        "reviewCardId": "reading-u05-l01-c2"
      },
      {
        "id": "reading-u05-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "supporting-details",
        "reviewCardId": "reading-u05-l01-c2"
      },
      {
        "id": "reading-u05-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "idea-development",
        "reviewCardId": "reading-u05-l01-c3"
      },
      {
        "id": "reading-u05-l01-q10",
        "type": "true-false",
        "conceptTag": "idea-development",
        "reviewCardId": "reading-u05-l01-c3"
      },
      {
        "id": "reading-u05-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "idea-development",
        "reviewCardId": "reading-u05-l01-c3"
      },
      {
        "id": "reading-u05-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "idea-development",
        "reviewCardId": "reading-u05-l01-c3"
      },
      {
        "id": "reading-u05-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "idea-development",
        "reviewCardId": "reading-u05-l01-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u05-l01",
    "checks": [
      {
        "cardId": "reading-u05-l01-c1",
        "check": {
          "prompt": "Which is a central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Salt marshes support wildlife and shorelines"
            },
            {
              "id": "b",
              "text": "Young fish hide"
            },
            {
              "id": "c",
              "text": "Tides rise"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It covers the text’s main explanation."
        }
      },
      {
        "cardId": "reading-u05-l01-c2",
        "check": {
          "prompt": "Which detail supports shoreline protection?",
          "choices": [
            {
              "id": "a",
              "text": "Marsh stems slow waves"
            },
            {
              "id": "b",
              "text": "Birds have feathers"
            },
            {
              "id": "c",
              "text": "Researchers carry pencils"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It explains the shoreline-buffer part of the idea."
        }
      },
      {
        "cardId": "reading-u05-l01-c3",
        "check": {
          "prompt": "How does the fish detail develop the idea?",
          "choices": [
            {
              "id": "a",
              "text": "It gives an example of marsh wildlife support"
            },
            {
              "id": "b",
              "text": "It proves every fish lives there"
            },
            {
              "id": "c",
              "text": "It describes a storm"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Shelter among grasses illustrates habitat support."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u05-l01",
    "widgets": [
      {
        "cardId": "reading-u05-l01-c2",
        "ref": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "Salt marshes support wildlife and shorelines",
              "Every wet place is a salt marsh"
            ],
            "details": [
              {
                "id": "nursery",
                "text": "Young fish find shelter among marsh grasses.",
                "supports": [
                  "Salt marshes support wildlife and shorelines"
                ]
              },
              {
                "id": "buffer",
                "text": "Marsh plants slow waves near the shoreline.",
                "supports": [
                  "Salt marshes support wildlife and shorelines"
                ]
              },
              {
                "id": "definition",
                "text": "Any place with rainwater is a salt marsh.",
                "supports": [
                  "Every wet place is a salt marsh"
                ]
              }
            ],
            "requiredDetailCount": 2
          }
        }
      }
    ]
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u05-l01",
    "passage": {
      "title": "Why Salt Marshes Matter",
      "text": "Why Salt Marshes Matter\n\nSalt marshes support wildlife and shorelines. Twice each day, tides carry water through winding creeks among salt-tolerant grasses. Young fish and shrimp hide between the stems, where larger animals have trouble reaching them. Wading birds feed in the shallow water.\n\nMarsh plants also slow moving water. Their stems bend as waves pass, and their roots hold muddy soil. This buffering can reduce some wave force near the shoreline. The marsh does not stop every storm, but it can soften ordinary wave action.\n\nIn another marsh, researchers count young fish, map nesting areas, and measure changes along the bank. These separate details point to an idea the paragraph does not state in one sentence: a healthy marsh provides several connected benefits. It serves as nursery habitat, feeding space, and a living shoreline buffer. A puddle after rain is not automatically a salt marsh; tides, salty water, soils, and adapted plants work together in this ecosystem."
    },
    "reference": {
      "title": "Read “Why Salt Marshes Matter”",
      "text": "Why Salt Marshes Matter\n\nSalt marshes support wildlife and shorelines. Twice each day, tides carry water through winding creeks among salt-tolerant grasses. Young fish and shrimp hide between the stems, where larger animals have trouble reaching them. Wading birds feed in the shallow water.\n\nMarsh plants also slow moving water. Their stems bend as waves pass, and their roots hold muddy soil. This buffering can reduce some wave force near the shoreline. The marsh does not stop every storm, but it can soften ordinary wave action.\n\nIn another marsh, researchers count young fish, map nesting areas, and measure changes along the bank. These separate details point to an idea the paragraph does not state in one sentence: a healthy marsh provides several connected benefits. It serves as nursery habitat, feeding space, and a living shoreline buffer. A puddle after rain is not automatically a salt marsh; tides, salty water, soils, and adapted plants work together in this ecosystem."
    },
    "evidence": [
      "Young fish",
      "slow moving water",
      "shoreline buffer"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 5 literal content', () => {
  test('asks what the research observations support without calling the stated idea implied', () => {
    const question = unit05Lessons[0]!.quiz.pool.find(({ id }) => id === 'reading-u05-l01-q03');
    expect(question?.prompt).toBe('Which central idea is supported by the research paragraph’s observations?');
    expect(question?.explanation).toBe('The grouped observations support several connected benefits.');
  });

  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit05Lessons, expectedManifest, 'reading');
    expect(unit05Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit05Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit05Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit05Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit05Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit05Lessons) {
      expect(validateLesson(lesson)).toEqual([]);
      const source=expectedSources.find(row=>row.id===lesson.id)!;
      expect(lesson.workedExample.passage).toEqual(source.passage);
      expect(lesson.quiz.reference).toEqual(source.reference);
      expect(lesson.workedExample.passage!.text).toBe(lesson.quiz.reference!.text);
      for (const token of source.evidence) expect(source.passage.text).toContain(token);
      for (const card of lesson.learnCards) {
        expect(card.check).toBeDefined();
        expect(card.blocks.some(block=>block.text.startsWith('Support:')||block.text.startsWith('Response frame:')||block.text.startsWith('Stretch:'))).toBe(true);
        if ('widget' in card) expect(WidgetRefSchema.safeParse(card.widget).success).toBe(true);
      }
    }
  });

  test('keeps exact pools, unique visible answers, balanced MC keys, and solo framing', () => {
    for (const lesson of unit05Lessons) {
      expect(lesson.quiz.passThreshold).toBe(8);
      expect(lesson.quiz.pool.map(question=>question.id)).toEqual(Array.from({length:13},(_,index)=>`${lesson.id}-q${String(index+1).padStart(2,'0')}`));
      expect(new Set(lesson.quiz.pool.map(question=>question.conceptTag)).size).toBe(3);
      for (const question of lesson.quiz.pool) {
        const options=visible(question);
        expect(new Set(options.map(option=>option.id)).size).toBe(options.length);
        expect(new Set(options.map(option=>normalize(option.text))).size).toBe(options.length);
      }
      const keys=lesson.quiz.pool.filter(question=>question.type==='multiple-choice').map(question=>question.correctChoiceId);
      const counts=new Map<string,number>(); for(const key of keys) counts.set(key,(counts.get(key)??0)+1);
      expect([...counts.keys()].sort()).toEqual(['a','b','c','d']);
      expect(Math.max(...counts.values())-Math.min(...counts.values())).toBeLessThanOrEqual(1);
      expect(JSON.stringify(lesson)).not.toMatch(/live (partner|classmate|collaboration)|recording score|words per minute score/i);
    }
  });
});
```

### `src/content/reading/u06.ts`

```ts
import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit06Lessons = [
  {
    "id": "reading-u06-l01",
    "unitId": "reading-u06",
    "title": "Summarize Literary Texts",
    "indicatorCodes": [
      "ELA.4.AOR.6.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "A literary summary keeps the plot’s essential arc."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "It also states a supported theme and only relevant details."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s be accurate, concise, and objective."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u06-l01-c1",
        "title": "Retell the Plot Selectively",
        "blocks": [
          {
            "kind": "text",
            "text": "Select the character, conflict, key actions, turning point, and resolution."
          },
          {
            "kind": "example",
            "text": "Amina loses borrowed binoculars, searches, finds them, and returns them honestly."
          },
          {
            "kind": "tip",
            "text": "Leave out decorative details unless they affect the plot."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which belongs in the plot summary?",
          "choices": [
            {
              "id": "a",
              "text": "Amina searches for and returns the binoculars"
            },
            {
              "id": "b",
              "text": "The strap is green"
            },
            {
              "id": "c",
              "text": "Friends plan lunch"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It states the central action and resolution."
        }
      },
      {
        "id": "reading-u06-l01-c2",
        "title": "Include Theme and Relevant Details",
        "blocks": [
          {
            "kind": "text",
            "text": "A theme is supported by what the character chooses and learns."
          },
          {
            "kind": "example",
            "text": "Responsibility is supported by Amina retracing her route and telling the truth."
          },
          {
            "kind": "tip",
            "text": "Include one detail that proves the theme."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Which theme is best supported?",
          "choices": [
            {
              "id": "a",
              "text": "Responsibility includes honest care for borrowed things"
            },
            {
              "id": "b",
              "text": "Green is lucky"
            },
            {
              "id": "c",
              "text": "Lunch solves problems"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Her search and truthful report support responsibility."
        }
      },
      {
        "id": "reading-u06-l01-c3",
        "title": "Write an Objective Literary Summary",
        "blocks": [
          {
            "kind": "text",
            "text": "Combine plot, theme, and a relevant detail in your own words."
          },
          {
            "kind": "example",
            "text": "Avoid opinions such as “This is the best story.”"
          },
          {
            "kind": "tip",
            "text": "Use Somebody → Problem → Key response → Outcome/theme."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "widget": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "plot",
                "text": "Amina loses borrowed binoculars, searches carefully, and returns them.",
                "role": "main"
              },
              {
                "id": "theme",
                "text": "Her honest choices show responsibility.",
                "role": "main"
              },
              {
                "id": "detail",
                "text": "She retraces her route beside the marsh.",
                "role": "detail"
              },
              {
                "id": "extra",
                "text": "The binocular strap is green.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "plot",
              "theme"
            ],
            "maxSentences": 3
          }
        },
        "check": {
          "prompt": "Which sentence is objective?",
          "choices": [
            {
              "id": "a",
              "text": "Amina searches carefully and honestly returns what she borrowed"
            },
            {
              "id": "b",
              "text": "Amina is obviously the coolest character"
            },
            {
              "id": "c",
              "text": "The green strap is beautiful"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It reports supported events without opinion."
        }
      }
    ],
    "workedExample": {
      "title": "Build an objective literary summary",
      "passage": {
        "title": "The Borrowed Binoculars",
        "text": "The Borrowed Binoculars\n\nAmina borrowed her aunt’s binoculars for a marsh walk. At the first overlook, she watched an egret step through shallow water. Later, she reached for the binoculars and found only the green strap’s empty case.\n\nHer friends were ready for lunch, but Amina said she needed to retrace the route. She checked the overlook rail, the map bench, and the sandy path. Near a clump of cordgrass, she spotted the binoculars beside a weathered post. One lens was dusty but not cracked.\n\nAmina wiped the case, told her aunt exactly what had happened, and returned the binoculars. Her aunt thanked her for searching carefully and being honest. Amina decided that borrowing something meant protecting it and reporting problems truthfully.\n\nThe plot moves from loss to a careful search and honest return. A theme of responsibility grows through Amina’s choices. The green strap and lunch plans are minor details; they do not belong in every concise summary."
      },
      "steps": [
        "Name Amina and the lost borrowed binoculars.",
        "Condense the search and honest return.",
        "Connect those choices to responsibility without adding an opinion."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “The Borrowed Binoculars”",
        "text": "The Borrowed Binoculars\n\nAmina borrowed her aunt’s binoculars for a marsh walk. At the first overlook, she watched an egret step through shallow water. Later, she reached for the binoculars and found only the green strap’s empty case.\n\nHer friends were ready for lunch, but Amina said she needed to retrace the route. She checked the overlook rail, the map bench, and the sandy path. Near a clump of cordgrass, she spotted the binoculars beside a weathered post. One lens was dusty but not cracked.\n\nAmina wiped the case, told her aunt exactly what had happened, and returned the binoculars. Her aunt thanked her for searching carefully and being honest. Amina decided that borrowing something meant protecting it and reporting problems truthfully.\n\nThe plot moves from loss to a careful search and honest return. A theme of responsibility grows through Amina’s choices. The green strap and lunch plans are minor details; they do not belong in every concise summary."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which event is essential to the plot?",
          "choices": [
            {
              "id": "a",
              "text": "Amina discovers the borrowed binoculars are missing"
            },
            {
              "id": "b",
              "text": "The strap is green"
            },
            {
              "id": "c",
              "text": "Friends want lunch"
            },
            {
              "id": "d",
              "text": "An egret steps"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The loss creates the main conflict.",
          "id": "reading-u06-l01-q01",
          "conceptTag": "literary-plot-summary",
          "reviewCardId": "reading-u06-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "A literary summary should include every descriptive detail.",
          "choices": [
            {
              "id": "true",
              "text": "True — length proves accuracy"
            },
            {
              "id": "false",
              "text": "False — select only relevant details"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "A summary condenses.",
          "id": "reading-u06-l01-q02",
          "conceptTag": "literary-plot-summary",
          "reviewCardId": "reading-u06-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which sequence captures the plot?",
          "choices": [
            {
              "id": "a",
              "text": "walk, lunch, color"
            },
            {
              "id": "b",
              "text": "egret, post, lens"
            },
            {
              "id": "c",
              "text": "borrow, lose, search, return"
            },
            {
              "id": "d",
              "text": "aunt, friends, marsh"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It preserves the main event chain.",
          "id": "reading-u06-l01-q03",
          "conceptTag": "literary-plot-summary",
          "reviewCardId": "reading-u06-l01-c1"
        },
        {
          "type": "sort",
          "prompt": "Order the main plot events.",
          "explanation": "This is the story’s chronological plot arc.",
          "id": "reading-u06-l01-q04",
          "conceptTag": "literary-plot-summary",
          "reviewCardId": "reading-u06-l01-c1",
          "items": [
            {
              "id": "step-3",
              "text": "She retraces the route and finds them"
            },
            {
              "id": "step-1",
              "text": "Amina borrows binoculars"
            },
            {
              "id": "step-4",
              "text": "She reports honestly and returns them"
            },
            {
              "id": "step-2",
              "text": "She discovers they are missing"
            }
          ],
          "correctOrder": [
            "step-1",
            "step-2",
            "step-3",
            "step-4"
          ]
        },
        {
          "type": "multiple-choice",
          "prompt": "Which theme fits the story?",
          "choices": [
            {
              "id": "a",
              "text": "Nature is always quiet"
            },
            {
              "id": "b",
              "text": "Responsibility includes care and honesty"
            },
            {
              "id": "c",
              "text": "Friends should skip lunch"
            },
            {
              "id": "d",
              "text": "Dust damages everything"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Amina’s choices support responsibility.",
          "id": "reading-u06-l01-q05",
          "conceptTag": "literary-theme-details",
          "reviewCardId": "reading-u06-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "Amina’s truthful report helps develop the theme.",
          "choices": [
            {
              "id": "true",
              "text": "True — honesty is evidence of responsibility"
            },
            {
              "id": "false",
              "text": "False — only the search matters"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The report is a key choice.",
          "id": "reading-u06-l01-q06",
          "conceptTag": "literary-theme-details",
          "reviewCardId": "reading-u06-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail best supports the theme?",
          "choices": [
            {
              "id": "a",
              "text": "The egret walks"
            },
            {
              "id": "b",
              "text": "The strap is green"
            },
            {
              "id": "c",
              "text": "Amina retraces the route instead of ignoring the loss"
            },
            {
              "id": "d",
              "text": "The lens is dusty"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Her response demonstrates responsibility.",
          "id": "reading-u06-l01-q07",
          "conceptTag": "literary-theme-details",
          "reviewCardId": "reading-u06-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail can be omitted?",
          "choices": [
            {
              "id": "a",
              "text": "She borrowed the binoculars"
            },
            {
              "id": "b",
              "text": "They went missing"
            },
            {
              "id": "c",
              "text": "She returned them honestly"
            },
            {
              "id": "d",
              "text": "The strap was green"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Color does not affect plot or theme.",
          "id": "reading-u06-l01-q08",
          "conceptTag": "literary-theme-details",
          "reviewCardId": "reading-u06-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which is the best summary?",
          "choices": [
            {
              "id": "a",
              "text": "After losing borrowed binoculars, Amina retraces her route, finds them, and honestly returns them, showing responsibility"
            },
            {
              "id": "b",
              "text": "Amina sees an egret and a green strap"
            },
            {
              "id": "c",
              "text": "I loved this exciting marsh story"
            },
            {
              "id": "d",
              "text": "Amina goes to lunch after a perfect day"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It is accurate, concise, objective, and thematic.",
          "id": "reading-u06-l01-q09",
          "conceptTag": "literary-summary",
          "reviewCardId": "reading-u06-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "“I think Amina is wonderful” belongs in an objective summary.",
          "choices": [
            {
              "id": "true",
              "text": "True — opinions are required"
            },
            {
              "id": "false",
              "text": "False — summaries avoid personal judgments"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "Objective summaries report the text.",
          "id": "reading-u06-l01-q10",
          "conceptTag": "literary-summary",
          "reviewCardId": "reading-u06-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which revision is most concise?",
          "choices": [
            {
              "id": "a",
              "text": "Amina walked to every named location in every sentence"
            },
            {
              "id": "b",
              "text": "Amina carefully searched her route and found the binoculars"
            },
            {
              "id": "c",
              "text": "Amina had a green strap case beside a post near grass"
            },
            {
              "id": "d",
              "text": "Amina and friends had many plans"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "It condenses repeated search details.",
          "id": "reading-u06-l01-q11",
          "conceptTag": "literary-summary",
          "reviewCardId": "reading-u06-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "What must a strong literary summary include?",
          "choices": [
            {
              "id": "a",
              "text": "Every quotation"
            },
            {
              "id": "b",
              "text": "Only the theme"
            },
            {
              "id": "c",
              "text": "Key plot, supported theme, and relevant details"
            },
            {
              "id": "d",
              "text": "A review score"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Those elements capture literary meaning.",
          "id": "reading-u06-l01-q12",
          "conceptTag": "literary-summary",
          "reviewCardId": "reading-u06-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which wording stays in the writer’s own words?",
          "choices": [
            {
              "id": "a",
              "text": "Copy the entire final paragraph"
            },
            {
              "id": "b",
              "text": "Use the aunt’s exact dialogue without quotation marks"
            },
            {
              "id": "c",
              "text": "Change one copied word"
            },
            {
              "id": "d",
              "text": "Amina admits the loss and returns the found binoculars, showing responsible care"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It paraphrases accurately.",
          "id": "reading-u06-l01-q13",
          "conceptTag": "literary-summary",
          "reviewCardId": "reading-u06-l01-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u06-l02",
    "unitId": "reading-u06",
    "title": "Summarize Informational Texts",
    "indicatorCodes": [
      "ELA.4.AOR.6.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Informational summaries center on a central idea."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Relevant details explain that idea; minor examples stay out."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s condense accurately in original wording."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u06-l02-c1",
        "title": "State the Central Idea",
        "blocks": [
          {
            "kind": "text",
            "text": "State what the whole article explains."
          },
          {
            "kind": "example",
            "text": "The central idea is that martin houses need suitable placement and regular care."
          },
          {
            "kind": "tip",
            "text": "Do not substitute a single detail such as paint color."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which is the central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Purple martin houses need good placement and care"
            },
            {
              "id": "b",
              "text": "One house is white"
            },
            {
              "id": "c",
              "text": "Martins fly"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It unifies the full article."
        }
      },
      {
        "id": "reading-u06-l02-c2",
        "title": "Select Relevant Supporting Details",
        "blocks": [
          {
            "kind": "text",
            "text": "Choose details that directly develop the central idea."
          },
          {
            "kind": "example",
            "text": "Open space supports flight; seasonal cleaning prepares rooms."
          },
          {
            "kind": "tip",
            "text": "Leave out an incidental color unless the question asks about it."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Which detail belongs?",
          "choices": [
            {
              "id": "a",
              "text": "Open space provides a clear flight path"
            },
            {
              "id": "b",
              "text": "One pictured house is white"
            },
            {
              "id": "c",
              "text": "The article has four paragraphs"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It explains suitable placement."
        }
      },
      {
        "id": "reading-u06-l02-c3",
        "title": "Condense in Your Own Words",
        "blocks": [
          {
            "kind": "text",
            "text": "Paraphrase the central idea and combine two useful details."
          },
          {
            "kind": "example",
            "text": "Stay objective and shorter than the source."
          },
          {
            "kind": "tip",
            "text": "Use Central idea → Detail 1 → Detail 2."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "widget": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "central",
                "text": "Purple martin houses work best with suitable placement and regular care.",
                "role": "main"
              },
              {
                "id": "space",
                "text": "Open space gives the birds a clear flight path.",
                "role": "detail"
              },
              {
                "id": "care",
                "text": "Seasonal cleaning keeps the house ready.",
                "role": "detail"
              },
              {
                "id": "extra",
                "text": "One house in the article is painted white.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "central"
            ],
            "maxSentences": 3
          }
        },
        "check": {
          "prompt": "Which sentence is an accurate paraphrase?",
          "choices": [
            {
              "id": "a",
              "text": "Martin houses succeed when placed in open space and cared for seasonally"
            },
            {
              "id": "b",
              "text": "Every bird needs a white city"
            },
            {
              "id": "c",
              "text": "The author loves poles"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It restates the idea without copying."
        }
      }
    ],
    "workedExample": {
      "title": "Build an objective informational summary",
      "passage": {
        "title": "A City for Purple Martins",
        "text": "A City for Purple Martins\n\nPurple martin houses work best with suitable placement and regular care. These tall birdhouses contain several nesting rooms, so a group of birds may use one structure.\n\nOpen space around the house gives martins a clear flight path. A pole placed away from thick trees can also make it harder for some climbing animals to reach the rooms. People should follow safe installation directions and check the pole from the ground.\n\nCare continues after nesting season. An adult can lower a safely designed house, remove old nesting material, and inspect the rooms. Seasonal cleaning helps prepare the house for future birds. Observers can record arrival dates and room use without disturbing nests.\n\nOne pictured house is painted white, but color is not the article’s main point. Placement, a clear flight path, seasonal cleaning, and careful monitoring work together. A concise summary should state that central idea and select a few supporting details rather than copy every sentence."
      },
      "steps": [
        "State the placement-and-care central idea.",
        "Select clear flight path and seasonal cleaning.",
        "Combine them in one objective, original summary."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “A City for Purple Martins”",
        "text": "A City for Purple Martins\n\nPurple martin houses work best with suitable placement and regular care. These tall birdhouses contain several nesting rooms, so a group of birds may use one structure.\n\nOpen space around the house gives martins a clear flight path. A pole placed away from thick trees can also make it harder for some climbing animals to reach the rooms. People should follow safe installation directions and check the pole from the ground.\n\nCare continues after nesting season. An adult can lower a safely designed house, remove old nesting material, and inspect the rooms. Seasonal cleaning helps prepare the house for future birds. Observers can record arrival dates and room use without disturbing nests.\n\nOne pictured house is painted white, but color is not the article’s main point. Placement, a clear flight path, seasonal cleaning, and careful monitoring work together. A concise summary should state that central idea and select a few supporting details rather than copy every sentence."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "What is the central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Martin houses need suitable placement and regular care"
            },
            {
              "id": "b",
              "text": "All houses must be white"
            },
            {
              "id": "c",
              "text": "Birds avoid open space"
            },
            {
              "id": "d",
              "text": "Monitoring disturbs every nest"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The article repeatedly develops placement and care.",
          "id": "reading-u06-l02-q01",
          "conceptTag": "informational-central-idea",
          "reviewCardId": "reading-u06-l02-c1"
        },
        {
          "type": "true-false",
          "prompt": "A central idea can include two connected needs: placement and care.",
          "choices": [
            {
              "id": "true",
              "text": "True — both organize the text"
            },
            {
              "id": "false",
              "text": "False — it must be one word"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The sections explain both.",
          "id": "reading-u06-l02-q02",
          "conceptTag": "informational-central-idea",
          "reviewCardId": "reading-u06-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which is too narrow to be the central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Houses can contain rooms"
            },
            {
              "id": "b",
              "text": "Care happens after nesting"
            },
            {
              "id": "c",
              "text": "One pictured house is white"
            },
            {
              "id": "d",
              "text": "People observe arrivals"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Paint color is a minor detail.",
          "id": "reading-u06-l02-q03",
          "conceptTag": "informational-central-idea",
          "reviewCardId": "reading-u06-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which heading best matches the whole text?",
          "choices": [
            {
              "id": "a",
              "text": "White Paint"
            },
            {
              "id": "b",
              "text": "One Nesting Room"
            },
            {
              "id": "c",
              "text": "Watching One Bird"
            },
            {
              "id": "d",
              "text": "Placing and Caring for a Purple Martin House"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It includes both major parts.",
          "id": "reading-u06-l02-q04",
          "conceptTag": "informational-central-idea",
          "reviewCardId": "reading-u06-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail supports suitable placement?",
          "choices": [
            {
              "id": "a",
              "text": "Old nests are removed"
            },
            {
              "id": "b",
              "text": "Open space gives a clear flight path"
            },
            {
              "id": "c",
              "text": "Observers record dates"
            },
            {
              "id": "d",
              "text": "The house has rooms"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Open space explains placement.",
          "id": "reading-u06-l02-q05",
          "conceptTag": "informational-details",
          "reviewCardId": "reading-u06-l02-c2"
        },
        {
          "type": "true-false",
          "prompt": "Seasonal cleaning supports the care part of the central idea.",
          "choices": [
            {
              "id": "true",
              "text": "True — it prepares rooms"
            },
            {
              "id": "false",
              "text": "False — it changes paint"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Cleaning is regular care.",
          "id": "reading-u06-l02-q06",
          "conceptTag": "informational-details",
          "reviewCardId": "reading-u06-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which pair best supports the whole idea?",
          "choices": [
            {
              "id": "a",
              "text": "white paint and rooms"
            },
            {
              "id": "b",
              "text": "arrival dates and color"
            },
            {
              "id": "c",
              "text": "open flight space and seasonal cleaning"
            },
            {
              "id": "d",
              "text": "birds and poles"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It covers placement and care.",
          "id": "reading-u06-l02-q07",
          "conceptTag": "informational-details",
          "reviewCardId": "reading-u06-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail is least relevant?",
          "choices": [
            {
              "id": "a",
              "text": "Open space"
            },
            {
              "id": "b",
              "text": "Ground-level safety checks"
            },
            {
              "id": "c",
              "text": "Removing old material"
            },
            {
              "id": "d",
              "text": "One pictured house is white"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The color does not develop the idea.",
          "id": "reading-u06-l02-q08",
          "conceptTag": "informational-details",
          "reviewCardId": "reading-u06-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which is the best summary?",
          "choices": [
            {
              "id": "a",
              "text": "Purple martin houses need open placement for safe flight and seasonal care that keeps nesting rooms ready"
            },
            {
              "id": "b",
              "text": "Purple martins live in a white building"
            },
            {
              "id": "c",
              "text": "I think birdhouses are fun"
            },
            {
              "id": "d",
              "text": "Adults lower one house and record every date"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It states the idea and representative details.",
          "id": "reading-u06-l02-q09",
          "conceptTag": "informational-summary",
          "reviewCardId": "reading-u06-l02-c3"
        },
        {
          "type": "true-false",
          "prompt": "A summary should copy the article sentence by sentence.",
          "choices": [
            {
              "id": "true",
              "text": "True — copying is summarizing"
            },
            {
              "id": "false",
              "text": "False — condense in your own words"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "Summaries paraphrase.",
          "id": "reading-u06-l02-q10",
          "conceptTag": "informational-summary",
          "reviewCardId": "reading-u06-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which revision removes an extra detail?",
          "choices": [
            {
              "id": "a",
              "text": "Add the paint color"
            },
            {
              "id": "b",
              "text": "Keep placement and cleaning; remove the pictured color"
            },
            {
              "id": "c",
              "text": "List every nesting room"
            },
            {
              "id": "d",
              "text": "Add an opinion"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The color is not central.",
          "id": "reading-u06-l02-q11",
          "conceptTag": "informational-summary",
          "reviewCardId": "reading-u06-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why include both flight space and cleaning?",
          "choices": [
            {
              "id": "a",
              "text": "They rhyme"
            },
            {
              "id": "b",
              "text": "They are the first sentences"
            },
            {
              "id": "c",
              "text": "They represent the two major idea parts"
            },
            {
              "id": "d",
              "text": "They describe paint"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Together they cover placement and care.",
          "id": "reading-u06-l02-q12",
          "conceptTag": "informational-summary",
          "reviewCardId": "reading-u06-l02-c3"
        },
        {
          "type": "fill-blank",
          "prompt": "Complete the objective summary: Good placement and regular ___ help a martin house serve birds.",
          "acceptedAnswers": [
            "care"
          ],
          "explanation": "Care is the central word used throughout the source.",
          "id": "reading-u06-l02-q13",
          "conceptTag": "informational-summary",
          "reviewCardId": "reading-u06-l02-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
```

### `src/content/reading/u06.test.ts`

```ts
import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit06Lessons } from './u06';

const expectedManifest = [
  {
    "id": "reading-u06-l01",
    "unitId": "reading-u06",
    "title": "Summarize Literary Texts",
    "indicatorCodes": [
      "ELA.4.AOR.6.1"
    ]
  },
  {
    "id": "reading-u06-l02",
    "unitId": "reading-u06",
    "title": "Summarize Informational Texts",
    "indicatorCodes": [
      "ELA.4.AOR.6.1"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u06-l01",
    "cards": [
      {
        "id": "reading-u06-l01-c1",
        "title": "Retell the Plot Selectively",
        "conceptTag": "literary-plot-summary"
      },
      {
        "id": "reading-u06-l01-c2",
        "title": "Include Theme and Relevant Details",
        "conceptTag": "literary-theme-details"
      },
      {
        "id": "reading-u06-l01-c3",
        "title": "Write an Objective Literary Summary",
        "conceptTag": "literary-summary"
      }
    ]
  },
  {
    "id": "reading-u06-l02",
    "cards": [
      {
        "id": "reading-u06-l02-c1",
        "title": "State the Central Idea",
        "conceptTag": "informational-central-idea"
      },
      {
        "id": "reading-u06-l02-c2",
        "title": "Select Relevant Supporting Details",
        "conceptTag": "informational-details"
      },
      {
        "id": "reading-u06-l02-c3",
        "title": "Condense in Your Own Words",
        "conceptTag": "informational-summary"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u06-l01",
    "questions": [
      {
        "id": "reading-u06-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "literary-plot-summary",
        "reviewCardId": "reading-u06-l01-c1"
      },
      {
        "id": "reading-u06-l01-q02",
        "type": "true-false",
        "conceptTag": "literary-plot-summary",
        "reviewCardId": "reading-u06-l01-c1"
      },
      {
        "id": "reading-u06-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "literary-plot-summary",
        "reviewCardId": "reading-u06-l01-c1"
      },
      {
        "id": "reading-u06-l01-q04",
        "type": "sort",
        "conceptTag": "literary-plot-summary",
        "reviewCardId": "reading-u06-l01-c1"
      },
      {
        "id": "reading-u06-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "literary-theme-details",
        "reviewCardId": "reading-u06-l01-c2"
      },
      {
        "id": "reading-u06-l01-q06",
        "type": "true-false",
        "conceptTag": "literary-theme-details",
        "reviewCardId": "reading-u06-l01-c2"
      },
      {
        "id": "reading-u06-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "literary-theme-details",
        "reviewCardId": "reading-u06-l01-c2"
      },
      {
        "id": "reading-u06-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "literary-theme-details",
        "reviewCardId": "reading-u06-l01-c2"
      },
      {
        "id": "reading-u06-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "literary-summary",
        "reviewCardId": "reading-u06-l01-c3"
      },
      {
        "id": "reading-u06-l01-q10",
        "type": "true-false",
        "conceptTag": "literary-summary",
        "reviewCardId": "reading-u06-l01-c3"
      },
      {
        "id": "reading-u06-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "literary-summary",
        "reviewCardId": "reading-u06-l01-c3"
      },
      {
        "id": "reading-u06-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "literary-summary",
        "reviewCardId": "reading-u06-l01-c3"
      },
      {
        "id": "reading-u06-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "literary-summary",
        "reviewCardId": "reading-u06-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u06-l02",
    "questions": [
      {
        "id": "reading-u06-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "informational-central-idea",
        "reviewCardId": "reading-u06-l02-c1"
      },
      {
        "id": "reading-u06-l02-q02",
        "type": "true-false",
        "conceptTag": "informational-central-idea",
        "reviewCardId": "reading-u06-l02-c1"
      },
      {
        "id": "reading-u06-l02-q03",
        "type": "multiple-choice",
        "conceptTag": "informational-central-idea",
        "reviewCardId": "reading-u06-l02-c1"
      },
      {
        "id": "reading-u06-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "informational-central-idea",
        "reviewCardId": "reading-u06-l02-c1"
      },
      {
        "id": "reading-u06-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "informational-details",
        "reviewCardId": "reading-u06-l02-c2"
      },
      {
        "id": "reading-u06-l02-q06",
        "type": "true-false",
        "conceptTag": "informational-details",
        "reviewCardId": "reading-u06-l02-c2"
      },
      {
        "id": "reading-u06-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "informational-details",
        "reviewCardId": "reading-u06-l02-c2"
      },
      {
        "id": "reading-u06-l02-q08",
        "type": "multiple-choice",
        "conceptTag": "informational-details",
        "reviewCardId": "reading-u06-l02-c2"
      },
      {
        "id": "reading-u06-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "informational-summary",
        "reviewCardId": "reading-u06-l02-c3"
      },
      {
        "id": "reading-u06-l02-q10",
        "type": "true-false",
        "conceptTag": "informational-summary",
        "reviewCardId": "reading-u06-l02-c3"
      },
      {
        "id": "reading-u06-l02-q11",
        "type": "multiple-choice",
        "conceptTag": "informational-summary",
        "reviewCardId": "reading-u06-l02-c3"
      },
      {
        "id": "reading-u06-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "informational-summary",
        "reviewCardId": "reading-u06-l02-c3"
      },
      {
        "id": "reading-u06-l02-q13",
        "type": "fill-blank",
        "conceptTag": "informational-summary",
        "reviewCardId": "reading-u06-l02-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u06-l01",
    "checks": [
      {
        "cardId": "reading-u06-l01-c1",
        "check": {
          "prompt": "Which belongs in the plot summary?",
          "choices": [
            {
              "id": "a",
              "text": "Amina searches for and returns the binoculars"
            },
            {
              "id": "b",
              "text": "The strap is green"
            },
            {
              "id": "c",
              "text": "Friends plan lunch"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It states the central action and resolution."
        }
      },
      {
        "cardId": "reading-u06-l01-c2",
        "check": {
          "prompt": "Which theme is best supported?",
          "choices": [
            {
              "id": "a",
              "text": "Responsibility includes honest care for borrowed things"
            },
            {
              "id": "b",
              "text": "Green is lucky"
            },
            {
              "id": "c",
              "text": "Lunch solves problems"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Her search and truthful report support responsibility."
        }
      },
      {
        "cardId": "reading-u06-l01-c3",
        "check": {
          "prompt": "Which sentence is objective?",
          "choices": [
            {
              "id": "a",
              "text": "Amina searches carefully and honestly returns what she borrowed"
            },
            {
              "id": "b",
              "text": "Amina is obviously the coolest character"
            },
            {
              "id": "c",
              "text": "The green strap is beautiful"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It reports supported events without opinion."
        }
      }
    ]
  },
  {
    "id": "reading-u06-l02",
    "checks": [
      {
        "cardId": "reading-u06-l02-c1",
        "check": {
          "prompt": "Which is the central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Purple martin houses need good placement and care"
            },
            {
              "id": "b",
              "text": "One house is white"
            },
            {
              "id": "c",
              "text": "Martins fly"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It unifies the full article."
        }
      },
      {
        "cardId": "reading-u06-l02-c2",
        "check": {
          "prompt": "Which detail belongs?",
          "choices": [
            {
              "id": "a",
              "text": "Open space provides a clear flight path"
            },
            {
              "id": "b",
              "text": "One pictured house is white"
            },
            {
              "id": "c",
              "text": "The article has four paragraphs"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It explains suitable placement."
        }
      },
      {
        "cardId": "reading-u06-l02-c3",
        "check": {
          "prompt": "Which sentence is an accurate paraphrase?",
          "choices": [
            {
              "id": "a",
              "text": "Martin houses succeed when placed in open space and cared for seasonally"
            },
            {
              "id": "b",
              "text": "Every bird needs a white city"
            },
            {
              "id": "c",
              "text": "The author loves poles"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It restates the idea without copying."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u06-l01",
    "widgets": [
      {
        "cardId": "reading-u06-l01-c3",
        "ref": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "plot",
                "text": "Amina loses borrowed binoculars, searches carefully, and returns them.",
                "role": "main"
              },
              {
                "id": "theme",
                "text": "Her honest choices show responsibility.",
                "role": "main"
              },
              {
                "id": "detail",
                "text": "She retraces her route beside the marsh.",
                "role": "detail"
              },
              {
                "id": "extra",
                "text": "The binocular strap is green.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "plot",
              "theme"
            ],
            "maxSentences": 3
          }
        }
      }
    ]
  },
  {
    "id": "reading-u06-l02",
    "widgets": [
      {
        "cardId": "reading-u06-l02-c3",
        "ref": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "central",
                "text": "Purple martin houses work best with suitable placement and regular care.",
                "role": "main"
              },
              {
                "id": "space",
                "text": "Open space gives the birds a clear flight path.",
                "role": "detail"
              },
              {
                "id": "care",
                "text": "Seasonal cleaning keeps the house ready.",
                "role": "detail"
              },
              {
                "id": "extra",
                "text": "One house in the article is painted white.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "central"
            ],
            "maxSentences": 3
          }
        }
      }
    ]
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u06-l01",
    "passage": {
      "title": "The Borrowed Binoculars",
      "text": "The Borrowed Binoculars\n\nAmina borrowed her aunt’s binoculars for a marsh walk. At the first overlook, she watched an egret step through shallow water. Later, she reached for the binoculars and found only the green strap’s empty case.\n\nHer friends were ready for lunch, but Amina said she needed to retrace the route. She checked the overlook rail, the map bench, and the sandy path. Near a clump of cordgrass, she spotted the binoculars beside a weathered post. One lens was dusty but not cracked.\n\nAmina wiped the case, told her aunt exactly what had happened, and returned the binoculars. Her aunt thanked her for searching carefully and being honest. Amina decided that borrowing something meant protecting it and reporting problems truthfully.\n\nThe plot moves from loss to a careful search and honest return. A theme of responsibility grows through Amina’s choices. The green strap and lunch plans are minor details; they do not belong in every concise summary."
    },
    "reference": {
      "title": "Read “The Borrowed Binoculars”",
      "text": "The Borrowed Binoculars\n\nAmina borrowed her aunt’s binoculars for a marsh walk. At the first overlook, she watched an egret step through shallow water. Later, she reached for the binoculars and found only the green strap’s empty case.\n\nHer friends were ready for lunch, but Amina said she needed to retrace the route. She checked the overlook rail, the map bench, and the sandy path. Near a clump of cordgrass, she spotted the binoculars beside a weathered post. One lens was dusty but not cracked.\n\nAmina wiped the case, told her aunt exactly what had happened, and returned the binoculars. Her aunt thanked her for searching carefully and being honest. Amina decided that borrowing something meant protecting it and reporting problems truthfully.\n\nThe plot moves from loss to a careful search and honest return. A theme of responsibility grows through Amina’s choices. The green strap and lunch plans are minor details; they do not belong in every concise summary."
    },
    "evidence": [
      "binoculars",
      "responsibility",
      "green strap"
    ]
  },
  {
    "id": "reading-u06-l02",
    "passage": {
      "title": "A City for Purple Martins",
      "text": "A City for Purple Martins\n\nPurple martin houses work best with suitable placement and regular care. These tall birdhouses contain several nesting rooms, so a group of birds may use one structure.\n\nOpen space around the house gives martins a clear flight path. A pole placed away from thick trees can also make it harder for some climbing animals to reach the rooms. People should follow safe installation directions and check the pole from the ground.\n\nCare continues after nesting season. An adult can lower a safely designed house, remove old nesting material, and inspect the rooms. Seasonal cleaning helps prepare the house for future birds. Observers can record arrival dates and room use without disturbing nests.\n\nOne pictured house is painted white, but color is not the article’s main point. Placement, a clear flight path, seasonal cleaning, and careful monitoring work together. A concise summary should state that central idea and select a few supporting details rather than copy every sentence."
    },
    "reference": {
      "title": "Read “A City for Purple Martins”",
      "text": "A City for Purple Martins\n\nPurple martin houses work best with suitable placement and regular care. These tall birdhouses contain several nesting rooms, so a group of birds may use one structure.\n\nOpen space around the house gives martins a clear flight path. A pole placed away from thick trees can also make it harder for some climbing animals to reach the rooms. People should follow safe installation directions and check the pole from the ground.\n\nCare continues after nesting season. An adult can lower a safely designed house, remove old nesting material, and inspect the rooms. Seasonal cleaning helps prepare the house for future birds. Observers can record arrival dates and room use without disturbing nests.\n\nOne pictured house is painted white, but color is not the article’s main point. Placement, a clear flight path, seasonal cleaning, and careful monitoring work together. A concise summary should state that central idea and select a few supporting details rather than copy every sentence."
    },
    "evidence": [
      "clear flight path",
      "seasonal cleaning",
      "painted white"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 6 literal content', () => {
  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit06Lessons, expectedManifest, 'reading');
    expect(unit06Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit06Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit06Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit06Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit06Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit06Lessons) {
      expect(validateLesson(lesson)).toEqual([]);
      const source=expectedSources.find(row=>row.id===lesson.id)!;
      expect(lesson.workedExample.passage).toEqual(source.passage);
      expect(lesson.quiz.reference).toEqual(source.reference);
      expect(lesson.workedExample.passage!.text).toBe(lesson.quiz.reference!.text);
      for (const token of source.evidence) expect(source.passage.text).toContain(token);
      for (const card of lesson.learnCards) {
        expect(card.check).toBeDefined();
        expect(card.blocks.some(block=>block.text.startsWith('Support:')||block.text.startsWith('Response frame:')||block.text.startsWith('Stretch:'))).toBe(true);
        if ('widget' in card) expect(WidgetRefSchema.safeParse(card.widget).success).toBe(true);
      }
    }
  });

  test('keeps exact pools, unique visible answers, balanced MC keys, and solo framing', () => {
    for (const lesson of unit06Lessons) {
      expect(lesson.quiz.passThreshold).toBe(8);
      expect(lesson.quiz.pool.map(question=>question.id)).toEqual(Array.from({length:13},(_,index)=>`${lesson.id}-q${String(index+1).padStart(2,'0')}`));
      expect(new Set(lesson.quiz.pool.map(question=>question.conceptTag)).size).toBe(3);
      for (const question of lesson.quiz.pool) {
        const options=visible(question);
        expect(new Set(options.map(option=>option.id)).size).toBe(options.length);
        expect(new Set(options.map(option=>normalize(option.text))).size).toBe(options.length);
      }
      const keys=lesson.quiz.pool.filter(question=>question.type==='multiple-choice').map(question=>question.correctChoiceId);
      const counts=new Map<string,number>(); for(const key of keys) counts.set(key,(counts.get(key)??0)+1);
      expect([...counts.keys()].sort()).toEqual(['a','b','c','d']);
      expect(Math.max(...counts.values())-Math.min(...counts.values())).toBeLessThanOrEqual(1);
      expect(JSON.stringify(lesson)).not.toMatch(/live (partner|classmate|collaboration)|recording score|words per minute score/i);
    }
  });
});
```

### `src/content/reading/u07.ts`

```ts
import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit07Lessons = [
  {
    "id": "reading-u07-l01",
    "unitId": "reading-u07",
    "title": "Use Text Features and Informational Structures",
    "indicatorCodes": [
      "ELA.4.AOR.5.2"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Text features help readers locate and interpret information."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Structures organize relationships among ideas."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s name each contribution and explain how it builds meaning."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u07-l01-c1",
        "title": "Navigate with Text Features",
        "blocks": [
          {
            "kind": "text",
            "text": "Headings preview sections; captions explain visuals; glossaries define specialized terms."
          },
          {
            "kind": "example",
            "text": "The caption explains repair marks and detour arrows that the diagram description names."
          },
          {
            "kind": "tip",
            "text": "Name the information a feature adds, not just its label."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "What does the caption contribute?",
          "choices": [
            {
              "id": "a",
              "text": "It explains repair marks and detour arrows"
            },
            {
              "id": "b",
              "text": "It defines composite"
            },
            {
              "id": "c",
              "text": "It orders all repair steps"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That is the caption’s visible information."
        }
      },
      {
        "id": "reading-u07-l01-c2",
        "title": "Recognize Three Text Structures",
        "blocks": [
          {
            "kind": "text",
            "text": "Problem-solution presents an issue and response; sequence orders steps; compare-contrast shows similarities and differences."
          },
          {
            "kind": "example",
            "text": "Loose boards/replacement is problem-solution; First/Next/Then is sequence; wood/composite is compare-contrast."
          },
          {
            "kind": "tip",
            "text": "Signal words help, but verify the relationship."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "widget": {
          "type": "text-structure-sorter",
          "config": {
            "excerpts": [
              {
                "id": "repair",
                "text": "Loose boards created a tripping problem, so volunteers replaced them.",
                "structure": "problem-solution"
              },
              {
                "id": "steps",
                "text": "First inspect the boards, next mark damage, and then make repairs.",
                "structure": "sequence"
              },
              {
                "id": "materials",
                "text": "Recycled boards cost less, while composite boards last longer.",
                "structure": "compare-contrast"
              }
            ]
          }
        },
        "check": {
          "prompt": "Which structure uses First, Next, Then?",
          "choices": [
            {
              "id": "a",
              "text": "sequence"
            },
            {
              "id": "b",
              "text": "compare-contrast"
            },
            {
              "id": "c",
              "text": "problem-solution"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Those words order steps."
        }
      },
      {
        "id": "reading-u07-l01-c3",
        "title": "Explain How Organization Builds Meaning",
        "blocks": [
          {
            "kind": "text",
            "text": "Organization makes relationships easier to follow."
          },
          {
            "kind": "example",
            "text": "The sequence protects safety by preserving the repair order; comparison supports a material decision."
          },
          {
            "kind": "tip",
            "text": "Use Structure → Relationship → Reader benefit."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "How does compare-contrast help?",
          "choices": [
            {
              "id": "a",
              "text": "It shows tradeoffs between two materials"
            },
            {
              "id": "b",
              "text": "It hides differences"
            },
            {
              "id": "c",
              "text": "It gives repair order"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The section compares cost, appearance, and durability."
        }
      }
    ],
    "workedExample": {
      "title": "Explain how features and structure organize the guide",
      "passage": {
        "title": "Boardwalk Repair Guide",
        "text": "Boardwalk Repair Guide\n\nHeading: Why Repairs Matter\nLoose boards created a tripping problem, so volunteers replaced them with secure boards.\n\nHeading: Inspection Steps\nFirst, inspect every board from the marked path. Next, mark loose or cracked boards. Then, have trained adults make repairs. Finally, reopen the safe section.\n\nHeading: Comparing Materials\nRecycled wood boards cost less and match the older walkway, while composite boards last longer and resist water. Both need secure fasteners.\n\nDiagram description: A top-view rectangle labels the closed section, the safe walking route, and three repair marks. Caption: “Repair marks show where adults will replace damaged boards; arrows guide visitors around the closed section.”\n\nGlossary: fastener — a screw or other piece that joins materials; composite — material made by combining substances.\n\nThe headings preview each section. The diagram and caption show locations and movement. The glossary clarifies technical words. Structure helps readers anticipate whether a section will present a problem and response, ordered steps, or similarities and differences."
      },
      "steps": [
        "Use the heading to predict the section purpose.",
        "Identify the relationship among its sentences.",
        "Explain how the feature and structure help a reader act or understand."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Boardwalk Repair Guide”",
        "text": "Boardwalk Repair Guide\n\nHeading: Why Repairs Matter\nLoose boards created a tripping problem, so volunteers replaced them with secure boards.\n\nHeading: Inspection Steps\nFirst, inspect every board from the marked path. Next, mark loose or cracked boards. Then, have trained adults make repairs. Finally, reopen the safe section.\n\nHeading: Comparing Materials\nRecycled wood boards cost less and match the older walkway, while composite boards last longer and resist water. Both need secure fasteners.\n\nDiagram description: A top-view rectangle labels the closed section, the safe walking route, and three repair marks. Caption: “Repair marks show where adults will replace damaged boards; arrows guide visitors around the closed section.”\n\nGlossary: fastener — a screw or other piece that joins materials; composite — material made by combining substances.\n\nThe headings preview each section. The diagram and caption show locations and movement. The glossary clarifies technical words. Structure helps readers anticipate whether a section will present a problem and response, ordered steps, or similarities and differences."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which feature previews “Inspection Steps”?",
          "choices": [
            {
              "id": "a",
              "text": "The heading"
            },
            {
              "id": "b",
              "text": "The glossary"
            },
            {
              "id": "c",
              "text": "The caption"
            },
            {
              "id": "d",
              "text": "The fastener"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The heading names the section.",
          "id": "reading-u07-l01-q01",
          "conceptTag": "text-features",
          "reviewCardId": "reading-u07-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "A glossary helps clarify specialized terms such as composite.",
          "choices": [
            {
              "id": "true",
              "text": "True — it supplies a definition"
            },
            {
              "id": "false",
              "text": "False — it maps the route"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The glossary defines the term.",
          "id": "reading-u07-l01-q02",
          "conceptTag": "text-features",
          "reviewCardId": "reading-u07-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the diagram description add?",
          "choices": [
            {
              "id": "a",
              "text": "material prices"
            },
            {
              "id": "b",
              "text": "word pronunciations"
            },
            {
              "id": "c",
              "text": "locations of closure, route, and repairs"
            },
            {
              "id": "d",
              "text": "repair history"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It spatially locates features.",
          "id": "reading-u07-l01-q03",
          "conceptTag": "text-features",
          "reviewCardId": "reading-u07-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response explains a feature’s contribution?",
          "choices": [
            {
              "id": "a",
              "text": "It has a caption"
            },
            {
              "id": "b",
              "text": "It is bold"
            },
            {
              "id": "c",
              "text": "It comes last"
            },
            {
              "id": "d",
              "text": "The caption connects marks and arrows to repairs and a safe detour"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It states the added information.",
          "id": "reading-u07-l01-q04",
          "conceptTag": "text-features",
          "reviewCardId": "reading-u07-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What structure organizes “Why Repairs Matter”?",
          "choices": [
            {
              "id": "a",
              "text": "sequence"
            },
            {
              "id": "b",
              "text": "problem-solution"
            },
            {
              "id": "c",
              "text": "compare-contrast"
            },
            {
              "id": "d",
              "text": "description only"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Loose boards are the problem; replacement is the solution.",
          "id": "reading-u07-l01-q05",
          "conceptTag": "structure-types",
          "reviewCardId": "reading-u07-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "The material section uses compare-contrast.",
          "choices": [
            {
              "id": "true",
              "text": "True — it weighs cost, match, and durability"
            },
            {
              "id": "false",
              "text": "False — it orders repair steps"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The section compares two choices.",
          "id": "reading-u07-l01-q06",
          "conceptTag": "structure-types",
          "reviewCardId": "reading-u07-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which signal set points to chronology?",
          "choices": [
            {
              "id": "a",
              "text": "because/so"
            },
            {
              "id": "b",
              "text": "while/both"
            },
            {
              "id": "c",
              "text": "first/next/then/finally"
            },
            {
              "id": "d",
              "text": "problem/solution"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Those terms mark sequence.",
          "id": "reading-u07-l01-q07",
          "conceptTag": "structure-types",
          "reviewCardId": "reading-u07-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which sentence is the solution?",
          "choices": [
            {
              "id": "a",
              "text": "Boards are loose"
            },
            {
              "id": "b",
              "text": "Visitors use walkways"
            },
            {
              "id": "c",
              "text": "Damage creates risk"
            },
            {
              "id": "d",
              "text": "Volunteers replace boards securely"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Replacement answers the problem.",
          "id": "reading-u07-l01-q08",
          "conceptTag": "structure-types",
          "reviewCardId": "reading-u07-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does sequence build meaning?",
          "choices": [
            {
              "id": "a",
              "text": "It shows the safe order for inspection and repair"
            },
            {
              "id": "b",
              "text": "It compares costs"
            },
            {
              "id": "c",
              "text": "It defines fastener"
            },
            {
              "id": "d",
              "text": "It labels a route"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Order matters to the procedure.",
          "id": "reading-u07-l01-q09",
          "conceptTag": "structure-meaning",
          "reviewCardId": "reading-u07-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "Structure labels alone explain meaning without examining idea relationships.",
          "choices": [
            {
              "id": "true",
              "text": "True — labels are enough"
            },
            {
              "id": "false",
              "text": "False — readers must explain relationships"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "The standard requires contribution, not naming only.",
          "id": "reading-u07-l01-q10",
          "conceptTag": "structure-meaning",
          "reviewCardId": "reading-u07-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does problem-solution help the reader?",
          "choices": [
            {
              "id": "a",
              "text": "It lists materials randomly"
            },
            {
              "id": "b",
              "text": "It connects a safety issue with the response"
            },
            {
              "id": "c",
              "text": "It describes a bird"
            },
            {
              "id": "d",
              "text": "It hides the repair"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The causal response becomes clear.",
          "id": "reading-u07-l01-q11",
          "conceptTag": "structure-meaning",
          "reviewCardId": "reading-u07-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How do heading and structure work together?",
          "choices": [
            {
              "id": "a",
              "text": "Both define composite"
            },
            {
              "id": "b",
              "text": "Both show the map"
            },
            {
              "id": "c",
              "text": "The heading previews inspection, and sequence organizes its steps"
            },
            {
              "id": "d",
              "text": "The heading solves loose boards"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "They guide navigation and relationship.",
          "id": "reading-u07-l01-q12",
          "conceptTag": "structure-meaning",
          "reviewCardId": "reading-u07-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation is complete?",
          "choices": [
            {
              "id": "a",
              "text": "Compare-contrast is used"
            },
            {
              "id": "b",
              "text": "Two boards exist"
            },
            {
              "id": "c",
              "text": "Composite lasts longer"
            },
            {
              "id": "d",
              "text": "Compare-contrast organizes differences in cost and durability so readers can weigh materials"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It links structure, relationship, and benefit.",
          "id": "reading-u07-l01-q13",
          "conceptTag": "structure-meaning",
          "reviewCardId": "reading-u07-l01-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u07-l02",
    "unitId": "reading-u07",
    "title": "Explain How Visuals and Multimedia Add Meaning",
    "indicatorCodes": [
      "ELA.4.AOR.10.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Visuals and multimedia can add quantities, locations, and experiences."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Accessible descriptions and transcripts let every learner inspect the same evidence."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s explain what each representation adds to the prose."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u07-l02-c1",
        "title": "Read Visuals as Evidence",
        "blocks": [
          {
            "kind": "text",
            "text": "Read labels, units, legends, captions, and trends as evidence."
          },
          {
            "kind": "example",
            "text": "The table shows exact amounts; the map description shows spatial patterns."
          },
          {
            "kind": "example",
            "text": "Rainfall table description: West Station — 8 a.m. 0.4 inch, noon 1.2 inches, 4 p.m. 1.5 inches. Central Station — 8 a.m. 0.1 inch, noon 0.8 inch, 4 p.m. 1.3 inches. East Station — 8 a.m. 0 inch, noon 0.3 inch, 4 p.m. 0.9 inch."
          },
          {
            "kind": "tip",
            "text": "State the exact information, not “the visual helps.”"
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which station has 1.5 inches at 4 p.m.?",
          "choices": [
            {
              "id": "a",
              "text": "West"
            },
            {
              "id": "b",
              "text": "Central"
            },
            {
              "id": "c",
              "text": "East"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible table description lists West at 1.5 inches."
        }
      },
      {
        "id": "reading-u07-l02-c2",
        "title": "Connect Visuals and Words",
        "blocks": [
          {
            "kind": "text",
            "text": "Compare the representation with the prose: confirm, extend, qualify, or contrast."
          },
          {
            "kind": "example",
            "text": "The west-to-east arrows and earlier western totals extend the forecast’s direction claim."
          },
          {
            "kind": "tip",
            "text": "Use Words say → Representation adds → Combined meaning."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "How does the table support the forecast?",
          "choices": [
            {
              "id": "a",
              "text": "Western rain begins earlier and totals more at each time"
            },
            {
              "id": "b",
              "text": "All stations are equal"
            },
            {
              "id": "c",
              "text": "East starts first"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The values match west-to-east movement."
        }
      },
      {
        "id": "reading-u07-l02-c3",
        "title": "Explain a Multimedia Contribution",
        "blocks": [
          {
            "kind": "text",
            "text": "Audio can contribute sound, pacing, or speaker emphasis; a transcript preserves its information."
          },
          {
            "kind": "example",
            "text": "The steady loud roof pattern adds an experience of intensity that amounts alone do not provide."
          },
          {
            "kind": "tip",
            "text": "Do not claim playback when only a transcript is supplied."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "What does the transcript add?",
          "choices": [
            {
              "id": "a",
              "text": "The audible experience of steady, loud rain"
            },
            {
              "id": "b",
              "text": "A new station total"
            },
            {
              "id": "c",
              "text": "A map color"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The words describe sound and intensity."
        }
      }
    ],
    "workedExample": {
      "title": "Combine forecast, table, map, caption, and transcript",
      "passage": {
        "title": "Tracking a Storm’s Rain",
        "text": "Tracking a Storm’s Rain — accessible media packet\n\nForecast prose: A slow storm is expected to cross the county from west to east Tuesday. Forecasters expect the western station to begin receiving rain before the eastern station.\n\nRainfall table description: West Station — 8 a.m. 0.4 inch, noon 1.2 inches, 4 p.m. 1.5 inches. Central Station — 8 a.m. 0.1 inch, noon 0.8 inch, 4 p.m. 1.3 inches. East Station — 8 a.m. 0 inch, noon 0.3 inch, 4 p.m. 0.9 inch.\n\nMap legend description: pale blue means under 0.5 inch; medium blue means 0.5–1.0 inch; dark blue means over 1.0 inch. At 4 p.m., West and Central are dark blue; East is medium blue. Arrows point west to east.\n\nPhoto caption: “Water covers the lowest board of the creek gauge at Central Station at noon.”\n\nAudio transcript: Reporter: “Rain began lightly in the west before sunrise. By noon, drops struck the shelter roof in a steady, loud pattern. The eastern station was still receiving lighter rain.”\n\nTogether, the representations show timing, amount, location, a visible creek effect, and the sound/intensity experience."
      },
      "steps": [
        "Read the forecast’s west-to-east claim.",
        "Compare table times and map arrows with it.",
        "Explain that the transcript adds experienced intensity while the table adds exact quantity."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Tracking a Storm’s Rain”",
        "text": "Tracking a Storm’s Rain — accessible media packet\n\nForecast prose: A slow storm is expected to cross the county from west to east Tuesday. Forecasters expect the western station to begin receiving rain before the eastern station.\n\nRainfall table description: West Station — 8 a.m. 0.4 inch, noon 1.2 inches, 4 p.m. 1.5 inches. Central Station — 8 a.m. 0.1 inch, noon 0.8 inch, 4 p.m. 1.3 inches. East Station — 8 a.m. 0 inch, noon 0.3 inch, 4 p.m. 0.9 inch.\n\nMap legend description: pale blue means under 0.5 inch; medium blue means 0.5–1.0 inch; dark blue means over 1.0 inch. At 4 p.m., West and Central are dark blue; East is medium blue. Arrows point west to east.\n\nPhoto caption: “Water covers the lowest board of the creek gauge at Central Station at noon.”\n\nAudio transcript: Reporter: “Rain began lightly in the west before sunrise. By noon, drops struck the shelter roof in a steady, loud pattern. The eastern station was still receiving lighter rain.”\n\nTogether, the representations show timing, amount, location, a visible creek effect, and the sound/intensity experience."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "What does the table show at Central Station at noon?",
          "choices": [
            {
              "id": "a",
              "text": "0.8 inch"
            },
            {
              "id": "b",
              "text": "1.5 inches"
            },
            {
              "id": "c",
              "text": "0.3 inch"
            },
            {
              "id": "d",
              "text": "no rain"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The table description gives 0.8 inch.",
          "id": "reading-u07-l02-q01",
          "conceptTag": "visual-information",
          "reviewCardId": "reading-u07-l02-c1"
        },
        {
          "type": "true-false",
          "prompt": "The map legend assigns meaning to three shades of blue.",
          "choices": [
            {
              "id": "true",
              "text": "True — each shade names a range"
            },
            {
              "id": "false",
              "text": "False — color has no stated meaning"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The ranges are written in the description.",
          "id": "reading-u07-l02-q02",
          "conceptTag": "visual-information",
          "reviewCardId": "reading-u07-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which station begins with 0 inches at 8 a.m.?",
          "choices": [
            {
              "id": "a",
              "text": "West"
            },
            {
              "id": "b",
              "text": "Central"
            },
            {
              "id": "c",
              "text": "East"
            },
            {
              "id": "d",
              "text": "All three"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "East is listed at zero.",
          "id": "reading-u07-l02-q03",
          "conceptTag": "visual-information",
          "reviewCardId": "reading-u07-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the photo caption contribute?",
          "choices": [
            {
              "id": "a",
              "text": "storm direction"
            },
            {
              "id": "b",
              "text": "all totals"
            },
            {
              "id": "c",
              "text": "roof sounds"
            },
            {
              "id": "d",
              "text": "a visible creek-gauge effect at Central noon"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It describes water reaching the lowest board.",
          "id": "reading-u07-l02-q04",
          "conceptTag": "visual-information",
          "reviewCardId": "reading-u07-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does the table connect to the forecast?",
          "choices": [
            {
              "id": "a",
              "text": "It contradicts every detail"
            },
            {
              "id": "b",
              "text": "It shows earlier and greater rain in the west"
            },
            {
              "id": "c",
              "text": "It omits time"
            },
            {
              "id": "d",
              "text": "It proves no rain moved"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The time series supports movement direction.",
          "id": "reading-u07-l02-q05",
          "conceptTag": "visual-text-connection",
          "reviewCardId": "reading-u07-l02-c2"
        },
        {
          "type": "true-false",
          "prompt": "The dark-blue west and central areas at 4 p.m. agree with totals above one inch.",
          "choices": [
            {
              "id": "true",
              "text": "True — both exceed 1.0"
            },
            {
              "id": "false",
              "text": "False — dark means under 0.5"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Legend and table agree.",
          "id": "reading-u07-l02-q06",
          "conceptTag": "visual-text-connection",
          "reviewCardId": "reading-u07-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which combined conclusion is supported?",
          "choices": [
            {
              "id": "a",
              "text": "East receives most first"
            },
            {
              "id": "b",
              "text": "All rain begins together"
            },
            {
              "id": "c",
              "text": "Rain progresses west to east while totals rise"
            },
            {
              "id": "d",
              "text": "The storm moves east to west"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Multiple representations support the progression.",
          "id": "reading-u07-l02-q07",
          "conceptTag": "visual-text-connection",
          "reviewCardId": "reading-u07-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which sentence best explains the caption/text connection?",
          "choices": [
            {
              "id": "a",
              "text": "The caption repeats the title"
            },
            {
              "id": "b",
              "text": "The caption gives a color"
            },
            {
              "id": "c",
              "text": "The caption supplies a forecast"
            },
            {
              "id": "d",
              "text": "The caption shows one observable creek effect of the noon rain"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It adds local impact.",
          "id": "reading-u07-l02-q08",
          "conceptTag": "visual-text-connection",
          "reviewCardId": "reading-u07-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the transcript add beyond exact totals?",
          "choices": [
            {
              "id": "a",
              "text": "sound and perceived intensity"
            },
            {
              "id": "b",
              "text": "new table units"
            },
            {
              "id": "c",
              "text": "map arrows"
            },
            {
              "id": "d",
              "text": "a fourth station"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It describes how rain sounded.",
          "id": "reading-u07-l02-q09",
          "conceptTag": "multimedia-contribution",
          "reviewCardId": "reading-u07-l02-c3"
        },
        {
          "type": "true-false",
          "prompt": "A transcript can make audio information available without requiring playback.",
          "choices": [
            {
              "id": "true",
              "text": "True — its words preserve the content"
            },
            {
              "id": "false",
              "text": "False — answers require a sound file"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The complete transcript is visible.",
          "id": "reading-u07-l02-q10",
          "conceptTag": "multimedia-contribution",
          "reviewCardId": "reading-u07-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which representation is best for comparing exact amounts?",
          "choices": [
            {
              "id": "a",
              "text": "photo caption"
            },
            {
              "id": "b",
              "text": "rainfall table description"
            },
            {
              "id": "c",
              "text": "audio transcript"
            },
            {
              "id": "d",
              "text": "heading"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Tables support exact comparison.",
          "id": "reading-u07-l02-q11",
          "conceptTag": "multimedia-contribution",
          "reviewCardId": "reading-u07-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which representation is best for location and direction?",
          "choices": [
            {
              "id": "a",
              "text": "audio transcript"
            },
            {
              "id": "b",
              "text": "photo caption"
            },
            {
              "id": "c",
              "text": "map legend description and arrows"
            },
            {
              "id": "d",
              "text": "title"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Map information shows spatial relationships.",
          "id": "reading-u07-l02-q12",
          "conceptTag": "multimedia-contribution",
          "reviewCardId": "reading-u07-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation is complete?",
          "choices": [
            {
              "id": "a",
              "text": "The media are helpful"
            },
            {
              "id": "b",
              "text": "There is rain"
            },
            {
              "id": "c",
              "text": "The table has numbers"
            },
            {
              "id": "d",
              "text": "The table adds exact amounts, the map adds location/direction, and the transcript adds the sound of intensity"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It names distinct contributions.",
          "id": "reading-u07-l02-q13",
          "conceptTag": "multimedia-contribution",
          "reviewCardId": "reading-u07-l02-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
```

### `src/content/reading/u07.test.ts`

```ts
import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit07Lessons } from './u07';

const expectedManifest = [
  {
    "id": "reading-u07-l01",
    "unitId": "reading-u07",
    "title": "Use Text Features and Informational Structures",
    "indicatorCodes": [
      "ELA.4.AOR.5.2"
    ]
  },
  {
    "id": "reading-u07-l02",
    "unitId": "reading-u07",
    "title": "Explain How Visuals and Multimedia Add Meaning",
    "indicatorCodes": [
      "ELA.4.AOR.10.1"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u07-l01",
    "cards": [
      {
        "id": "reading-u07-l01-c1",
        "title": "Navigate with Text Features",
        "conceptTag": "text-features"
      },
      {
        "id": "reading-u07-l01-c2",
        "title": "Recognize Three Text Structures",
        "conceptTag": "structure-types"
      },
      {
        "id": "reading-u07-l01-c3",
        "title": "Explain How Organization Builds Meaning",
        "conceptTag": "structure-meaning"
      }
    ]
  },
  {
    "id": "reading-u07-l02",
    "cards": [
      {
        "id": "reading-u07-l02-c1",
        "title": "Read Visuals as Evidence",
        "conceptTag": "visual-information"
      },
      {
        "id": "reading-u07-l02-c2",
        "title": "Connect Visuals and Words",
        "conceptTag": "visual-text-connection"
      },
      {
        "id": "reading-u07-l02-c3",
        "title": "Explain a Multimedia Contribution",
        "conceptTag": "multimedia-contribution"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u07-l01",
    "questions": [
      {
        "id": "reading-u07-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "text-features",
        "reviewCardId": "reading-u07-l01-c1"
      },
      {
        "id": "reading-u07-l01-q02",
        "type": "true-false",
        "conceptTag": "text-features",
        "reviewCardId": "reading-u07-l01-c1"
      },
      {
        "id": "reading-u07-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "text-features",
        "reviewCardId": "reading-u07-l01-c1"
      },
      {
        "id": "reading-u07-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "text-features",
        "reviewCardId": "reading-u07-l01-c1"
      },
      {
        "id": "reading-u07-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "structure-types",
        "reviewCardId": "reading-u07-l01-c2"
      },
      {
        "id": "reading-u07-l01-q06",
        "type": "true-false",
        "conceptTag": "structure-types",
        "reviewCardId": "reading-u07-l01-c2"
      },
      {
        "id": "reading-u07-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "structure-types",
        "reviewCardId": "reading-u07-l01-c2"
      },
      {
        "id": "reading-u07-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "structure-types",
        "reviewCardId": "reading-u07-l01-c2"
      },
      {
        "id": "reading-u07-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "structure-meaning",
        "reviewCardId": "reading-u07-l01-c3"
      },
      {
        "id": "reading-u07-l01-q10",
        "type": "true-false",
        "conceptTag": "structure-meaning",
        "reviewCardId": "reading-u07-l01-c3"
      },
      {
        "id": "reading-u07-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "structure-meaning",
        "reviewCardId": "reading-u07-l01-c3"
      },
      {
        "id": "reading-u07-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "structure-meaning",
        "reviewCardId": "reading-u07-l01-c3"
      },
      {
        "id": "reading-u07-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "structure-meaning",
        "reviewCardId": "reading-u07-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u07-l02",
    "questions": [
      {
        "id": "reading-u07-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "visual-information",
        "reviewCardId": "reading-u07-l02-c1"
      },
      {
        "id": "reading-u07-l02-q02",
        "type": "true-false",
        "conceptTag": "visual-information",
        "reviewCardId": "reading-u07-l02-c1"
      },
      {
        "id": "reading-u07-l02-q03",
        "type": "multiple-choice",
        "conceptTag": "visual-information",
        "reviewCardId": "reading-u07-l02-c1"
      },
      {
        "id": "reading-u07-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "visual-information",
        "reviewCardId": "reading-u07-l02-c1"
      },
      {
        "id": "reading-u07-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "visual-text-connection",
        "reviewCardId": "reading-u07-l02-c2"
      },
      {
        "id": "reading-u07-l02-q06",
        "type": "true-false",
        "conceptTag": "visual-text-connection",
        "reviewCardId": "reading-u07-l02-c2"
      },
      {
        "id": "reading-u07-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "visual-text-connection",
        "reviewCardId": "reading-u07-l02-c2"
      },
      {
        "id": "reading-u07-l02-q08",
        "type": "multiple-choice",
        "conceptTag": "visual-text-connection",
        "reviewCardId": "reading-u07-l02-c2"
      },
      {
        "id": "reading-u07-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "multimedia-contribution",
        "reviewCardId": "reading-u07-l02-c3"
      },
      {
        "id": "reading-u07-l02-q10",
        "type": "true-false",
        "conceptTag": "multimedia-contribution",
        "reviewCardId": "reading-u07-l02-c3"
      },
      {
        "id": "reading-u07-l02-q11",
        "type": "multiple-choice",
        "conceptTag": "multimedia-contribution",
        "reviewCardId": "reading-u07-l02-c3"
      },
      {
        "id": "reading-u07-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "multimedia-contribution",
        "reviewCardId": "reading-u07-l02-c3"
      },
      {
        "id": "reading-u07-l02-q13",
        "type": "multiple-choice",
        "conceptTag": "multimedia-contribution",
        "reviewCardId": "reading-u07-l02-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u07-l01",
    "checks": [
      {
        "cardId": "reading-u07-l01-c1",
        "check": {
          "prompt": "What does the caption contribute?",
          "choices": [
            {
              "id": "a",
              "text": "It explains repair marks and detour arrows"
            },
            {
              "id": "b",
              "text": "It defines composite"
            },
            {
              "id": "c",
              "text": "It orders all repair steps"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That is the caption’s visible information."
        }
      },
      {
        "cardId": "reading-u07-l01-c2",
        "check": {
          "prompt": "Which structure uses First, Next, Then?",
          "choices": [
            {
              "id": "a",
              "text": "sequence"
            },
            {
              "id": "b",
              "text": "compare-contrast"
            },
            {
              "id": "c",
              "text": "problem-solution"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Those words order steps."
        }
      },
      {
        "cardId": "reading-u07-l01-c3",
        "check": {
          "prompt": "How does compare-contrast help?",
          "choices": [
            {
              "id": "a",
              "text": "It shows tradeoffs between two materials"
            },
            {
              "id": "b",
              "text": "It hides differences"
            },
            {
              "id": "c",
              "text": "It gives repair order"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The section compares cost, appearance, and durability."
        }
      }
    ]
  },
  {
    "id": "reading-u07-l02",
    "checks": [
      {
        "cardId": "reading-u07-l02-c1",
        "check": {
          "prompt": "Which station has 1.5 inches at 4 p.m.?",
          "choices": [
            {
              "id": "a",
              "text": "West"
            },
            {
              "id": "b",
              "text": "Central"
            },
            {
              "id": "c",
              "text": "East"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible table description lists West at 1.5 inches."
        }
      },
      {
        "cardId": "reading-u07-l02-c2",
        "check": {
          "prompt": "How does the table support the forecast?",
          "choices": [
            {
              "id": "a",
              "text": "Western rain begins earlier and totals more at each time"
            },
            {
              "id": "b",
              "text": "All stations are equal"
            },
            {
              "id": "c",
              "text": "East starts first"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The values match west-to-east movement."
        }
      },
      {
        "cardId": "reading-u07-l02-c3",
        "check": {
          "prompt": "What does the transcript add?",
          "choices": [
            {
              "id": "a",
              "text": "The audible experience of steady, loud rain"
            },
            {
              "id": "b",
              "text": "A new station total"
            },
            {
              "id": "c",
              "text": "A map color"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The words describe sound and intensity."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u07-l01",
    "widgets": [
      {
        "cardId": "reading-u07-l01-c2",
        "ref": {
          "type": "text-structure-sorter",
          "config": {
            "excerpts": [
              {
                "id": "repair",
                "text": "Loose boards created a tripping problem, so volunteers replaced them.",
                "structure": "problem-solution"
              },
              {
                "id": "steps",
                "text": "First inspect the boards, next mark damage, and then make repairs.",
                "structure": "sequence"
              },
              {
                "id": "materials",
                "text": "Recycled boards cost less, while composite boards last longer.",
                "structure": "compare-contrast"
              }
            ]
          }
        }
      }
    ]
  },
  {
    "id": "reading-u07-l02",
    "widgets": []
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u07-l01",
    "passage": {
      "title": "Boardwalk Repair Guide",
      "text": "Boardwalk Repair Guide\n\nHeading: Why Repairs Matter\nLoose boards created a tripping problem, so volunteers replaced them with secure boards.\n\nHeading: Inspection Steps\nFirst, inspect every board from the marked path. Next, mark loose or cracked boards. Then, have trained adults make repairs. Finally, reopen the safe section.\n\nHeading: Comparing Materials\nRecycled wood boards cost less and match the older walkway, while composite boards last longer and resist water. Both need secure fasteners.\n\nDiagram description: A top-view rectangle labels the closed section, the safe walking route, and three repair marks. Caption: “Repair marks show where adults will replace damaged boards; arrows guide visitors around the closed section.”\n\nGlossary: fastener — a screw or other piece that joins materials; composite — material made by combining substances.\n\nThe headings preview each section. The diagram and caption show locations and movement. The glossary clarifies technical words. Structure helps readers anticipate whether a section will present a problem and response, ordered steps, or similarities and differences."
    },
    "reference": {
      "title": "Read “Boardwalk Repair Guide”",
      "text": "Boardwalk Repair Guide\n\nHeading: Why Repairs Matter\nLoose boards created a tripping problem, so volunteers replaced them with secure boards.\n\nHeading: Inspection Steps\nFirst, inspect every board from the marked path. Next, mark loose or cracked boards. Then, have trained adults make repairs. Finally, reopen the safe section.\n\nHeading: Comparing Materials\nRecycled wood boards cost less and match the older walkway, while composite boards last longer and resist water. Both need secure fasteners.\n\nDiagram description: A top-view rectangle labels the closed section, the safe walking route, and three repair marks. Caption: “Repair marks show where adults will replace damaged boards; arrows guide visitors around the closed section.”\n\nGlossary: fastener — a screw or other piece that joins materials; composite — material made by combining substances.\n\nThe headings preview each section. The diagram and caption show locations and movement. The glossary clarifies technical words. Structure helps readers anticipate whether a section will present a problem and response, ordered steps, or similarities and differences."
    },
    "evidence": [
      "Inspection Steps",
      "Diagram description",
      "Glossary"
    ]
  },
  {
    "id": "reading-u07-l02",
    "passage": {
      "title": "Tracking a Storm’s Rain",
      "text": "Tracking a Storm’s Rain — accessible media packet\n\nForecast prose: A slow storm is expected to cross the county from west to east Tuesday. Forecasters expect the western station to begin receiving rain before the eastern station.\n\nRainfall table description: West Station — 8 a.m. 0.4 inch, noon 1.2 inches, 4 p.m. 1.5 inches. Central Station — 8 a.m. 0.1 inch, noon 0.8 inch, 4 p.m. 1.3 inches. East Station — 8 a.m. 0 inch, noon 0.3 inch, 4 p.m. 0.9 inch.\n\nMap legend description: pale blue means under 0.5 inch; medium blue means 0.5–1.0 inch; dark blue means over 1.0 inch. At 4 p.m., West and Central are dark blue; East is medium blue. Arrows point west to east.\n\nPhoto caption: “Water covers the lowest board of the creek gauge at Central Station at noon.”\n\nAudio transcript: Reporter: “Rain began lightly in the west before sunrise. By noon, drops struck the shelter roof in a steady, loud pattern. The eastern station was still receiving lighter rain.”\n\nTogether, the representations show timing, amount, location, a visible creek effect, and the sound/intensity experience."
    },
    "reference": {
      "title": "Read “Tracking a Storm’s Rain”",
      "text": "Tracking a Storm’s Rain — accessible media packet\n\nForecast prose: A slow storm is expected to cross the county from west to east Tuesday. Forecasters expect the western station to begin receiving rain before the eastern station.\n\nRainfall table description: West Station — 8 a.m. 0.4 inch, noon 1.2 inches, 4 p.m. 1.5 inches. Central Station — 8 a.m. 0.1 inch, noon 0.8 inch, 4 p.m. 1.3 inches. East Station — 8 a.m. 0 inch, noon 0.3 inch, 4 p.m. 0.9 inch.\n\nMap legend description: pale blue means under 0.5 inch; medium blue means 0.5–1.0 inch; dark blue means over 1.0 inch. At 4 p.m., West and Central are dark blue; East is medium blue. Arrows point west to east.\n\nPhoto caption: “Water covers the lowest board of the creek gauge at Central Station at noon.”\n\nAudio transcript: Reporter: “Rain began lightly in the west before sunrise. By noon, drops struck the shelter roof in a steady, loud pattern. The eastern station was still receiving lighter rain.”\n\nTogether, the representations show timing, amount, location, a visible creek effect, and the sound/intensity experience."
    },
    "evidence": [
      "Rainfall table description",
      "Map legend description",
      "Audio transcript"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 7 literal content', () => {
  test('places the complete rainfall table before the card 1 inline check', () => {
    const card = unit07Lessons.find(({ id }) => id === 'reading-u07-l02')!.learnCards[0]!;
    const priorMaterial = card.blocks.map(({ text }) => text).join('\n');
    expect(priorMaterial).toContain('Rainfall table description: West Station — 8 a.m. 0.4 inch, noon 1.2 inches, 4 p.m. 1.5 inches. Central Station — 8 a.m. 0.1 inch, noon 0.8 inch, 4 p.m. 1.3 inches. East Station — 8 a.m. 0 inch, noon 0.3 inch, 4 p.m. 0.9 inch.');
    expect(card.check?.prompt).toBe('Which station has 1.5 inches at 4 p.m.?');
  });

  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit07Lessons, expectedManifest, 'reading');
    expect(unit07Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit07Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit07Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit07Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit07Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit07Lessons) {
      expect(validateLesson(lesson)).toEqual([]);
      const source=expectedSources.find(row=>row.id===lesson.id)!;
      expect(lesson.workedExample.passage).toEqual(source.passage);
      expect(lesson.quiz.reference).toEqual(source.reference);
      expect(lesson.workedExample.passage!.text).toBe(lesson.quiz.reference!.text);
      for (const token of source.evidence) expect(source.passage.text).toContain(token);
      for (const card of lesson.learnCards) {
        expect(card.check).toBeDefined();
        expect(card.blocks.some(block=>block.text.startsWith('Support:')||block.text.startsWith('Response frame:')||block.text.startsWith('Stretch:'))).toBe(true);
        if ('widget' in card) expect(WidgetRefSchema.safeParse(card.widget).success).toBe(true);
      }
    }
  });

  test('keeps exact pools, unique visible answers, balanced MC keys, and solo framing', () => {
    for (const lesson of unit07Lessons) {
      expect(lesson.quiz.passThreshold).toBe(8);
      expect(lesson.quiz.pool.map(question=>question.id)).toEqual(Array.from({length:13},(_,index)=>`${lesson.id}-q${String(index+1).padStart(2,'0')}`));
      expect(new Set(lesson.quiz.pool.map(question=>question.conceptTag)).size).toBe(3);
      for (const question of lesson.quiz.pool) {
        const options=visible(question);
        expect(new Set(options.map(option=>option.id)).size).toBe(options.length);
        expect(new Set(options.map(option=>normalize(option.text))).size).toBe(options.length);
      }
      const keys=lesson.quiz.pool.filter(question=>question.type==='multiple-choice').map(question=>question.correctChoiceId);
      const counts=new Map<string,number>(); for(const key of keys) counts.set(key,(counts.get(key)??0)+1);
      expect([...counts.keys()].sort()).toEqual(['a','b','c','d']);
      expect(Math.max(...counts.values())-Math.min(...counts.values())).toBeLessThanOrEqual(1);
      expect(JSON.stringify(lesson)).not.toMatch(/live (partner|classmate|collaboration)|recording score|words per minute score/i);
    }
  });
});
```

### Task 2: reading-u04-l01 — Explain Explicit and Implied Themes

**Files:** Create `src/content/reading/u04.ts`, `src/content/reading/u04.test.ts`.

**Consumes:** The complete final `u04.ts` and `u04.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u04-l01` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u04.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u04.test.ts`; expect a missing-module failure.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u04-l01` object from the final `u04.ts` literal through the end of `reading-u04-l01-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u04.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u04.ts src/content/reading/u04.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u04.ts src/content/reading/u04.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u04-l01 explain explicit and implied themes"`.

### Task 3: reading-u05-l01 — Explain Stated and Implied Central Ideas

**Files:** Create `src/content/reading/u05.ts`, `src/content/reading/u05.test.ts`.

**Consumes:** The complete final `u05.ts` and `u05.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u05-l01` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u05.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u05.test.ts`; expect a missing-module failure.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u05-l01` object from the final `u05.ts` literal through the end of `reading-u05-l01-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u05.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u05.ts src/content/reading/u05.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u05.ts src/content/reading/u05.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u05-l01 explain stated and implied central ideas"`.

### Task 4: reading-u06-l01 — Summarize Literary Texts

**Files:** Create `src/content/reading/u06.ts`, `src/content/reading/u06.test.ts`.

**Consumes:** The complete final `u06.ts` and `u06.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u06-l01` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u06.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u06.test.ts`; expect a missing-module failure.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u06-l01` object from the final `u06.ts` literal through the end of `reading-u06-l01-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u06.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u06.ts src/content/reading/u06.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u06.ts src/content/reading/u06.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u06-l01 summarize literary texts"`.

### Task 5: reading-u06-l02 — Summarize Informational Texts

**Files:** Modify `src/content/reading/u06.ts`, `src/content/reading/u06.test.ts`.

**Consumes:** The complete final `u06.ts` and `u06.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u06-l02` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u06.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u06.test.ts`; expect the exact expected lesson count to exceed the current export by one.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u06-l02` object from the final `u06.ts` literal through the end of `reading-u06-l02-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u06.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u06.ts src/content/reading/u06.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u06.ts src/content/reading/u06.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u06-l02 summarize informational texts"`.

### Task 6: reading-u07-l01 — Use Text Features and Informational Structures

**Files:** Create `src/content/reading/u07.ts`, `src/content/reading/u07.test.ts`.

**Consumes:** The complete final `u07.ts` and `u07.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u07-l01` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u07.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u07.test.ts`; expect a missing-module failure.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u07-l01` object from the final `u07.ts` literal through the end of `reading-u07-l01-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u07.ts src/content/reading/u07.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u07.ts src/content/reading/u07.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u07-l01 use text features and informational structures"`.

### Task 7: reading-u07-l02 — Explain How Visuals and Multimedia Add Meaning

**Files:** Modify `src/content/reading/u07.ts`, `src/content/reading/u07.test.ts`.

**Consumes:** The complete final `u07.ts` and `u07.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u07-l02` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u07.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u07.test.ts`; expect the exact expected lesson count to exceed the current export by one.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u07-l02` object from the final `u07.ts` literal through the end of `reading-u07-l02-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u07.ts src/content/reading/u07.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u07.ts src/content/reading/u07.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u07-l02 explain how visuals and multimedia add meaning"`.

### Task 8: Verify and review the complete C2B wave

**Files:** Read/verify `src/content/reading/u04.ts`, `src/content/reading/u04.test.ts`, `src/content/reading/u05.ts`, `src/content/reading/u05.test.ts`, `src/content/reading/u06.ts`, `src/content/reading/u06.test.ts`, `src/content/reading/u07.ts`, `src/content/reading/u07.test.ts`; do not modify shared or protected files.

**Consumes:** Every accepted per-lesson commit in this wave.

**Produces:** Mechanical count evidence, green focused/permanent/type gates, and an independent scoped-review disposition.

- [ ] **Step 1 (2–5 minutes): Run focused tests.** Run `npm test -- src/content/reading/u04.test.ts src/content/reading/u05.test.ts src/content/reading/u06.test.ts src/content/reading/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts`.
- [ ] **Step 2 (2–5 minutes): Run TypeScript.** Run `npx tsc -b --pretty false`.
- [ ] **Step 3 (2–5 minutes): Run mechanical scans.** Verify canonical q01–q13 sequences, exact three-card/13-question counts, threshold 8, ordered six-code OE arrays, one tag/card mapping per card, exact widget counts, no empty lesson/card/pool arrays, and no planning-marker or live-collaboration/oral-scoring prose.
- [ ] **Step 4 (2–5 minutes): Inspect scope.** Run `git diff --check` and verify the wave commit range touches only the owned paths.
- [ ] **Step 5 (2–5 minutes): Request independent review.** Review standard fidelity, source-before-question visibility, answer/distractor correctness, differentiated supports, widget configs, and accessibility/solo framing; return defects to the owning lesson.

## Execution handoff

The wave stops after its owned modules/tests are reviewed. Plan C master Task C4 alone changes the Reading registry and final catalog.
