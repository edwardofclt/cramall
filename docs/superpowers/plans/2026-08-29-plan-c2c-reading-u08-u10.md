# Plan C2C: Reading Units 8–10 Implementation Plan

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

**Files:** Read `AGENTS.md`, governing plans/spec, ledgers, `src/content/schema.ts`, `src/content/curriculum.ts`, `src/content/unit-test-helpers.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`; inspect `src/content/reading/u08.ts`, `src/content/reading/u08.test.ts`, `src/content/reading/u09.ts`, `src/content/reading/u09.test.ts`, `src/content/reading/u10.ts`, `src/content/reading/u10.test.ts`.

**Consumes:** Accepted Plan A remediation, completed/reviewed Plan B, and master C1 contracts including `READING_OE_CODES`, `crossCuttingExpectationCodes`, and `expectUnitLessons`.

**Produces:** A recorded green baseline and confirmation that only this wave owns the named files.

- [ ] **Step 1 (2–5 minutes): Inspect ownership.** Run `git status --short`, `git diff --stat`, `git log -8 --oneline`, and read both execution ledgers. Stop on overlapping changes to owned paths.
- [ ] **Step 2 (2–5 minutes): Verify interfaces.** Confirm all widget refs in the final modules below parse with the implemented strict `WidgetRefSchema` and the master helper signature matches the imports in the test literals.
- [ ] **Step 3 (2–5 minutes): Run baseline.** Run `npm test && npx tsc -b --pretty false && npm run build`; record the exact commit and result.

## Complete copy-ready final files

### `src/content/reading/u08.ts`

```ts
import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit08Lessons = [
  {
    "id": "reading-u08-l01",
    "unitId": "reading-u08",
    "title": "Connect Author's Purpose and Perspective",
    "indicatorCodes": [
      "ELA.4.AOR.4.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Purpose is what an author wants a text to accomplish."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Perspective is the author’s attitude or position toward the subject."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s explain how language choices connect perspective to purpose."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u08-l01-c1",
        "title": "Identify the Author's Purpose",
        "blocks": [
          {
            "kind": "text",
            "text": "Purposes include answering, explaining, describing, and advocating; infer the precise purpose from the whole text."
          },
          {
            "kind": "example",
            "text": "Text A asks a committee to consider trees, while Text B explains how canopy shade works."
          },
          {
            "kind": "tip",
            "text": "Name the audience and intended result."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "What is Text A mainly trying to do?",
          "choices": [
            {
              "id": "a",
              "text": "persuade the committee to study planting shade trees"
            },
            {
              "id": "b",
              "text": "explain every tree species"
            },
            {
              "id": "c",
              "text": "entertain with a fantasy"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The writer states a belief and makes a request."
        }
      },
      {
        "id": "reading-u08-l01-c2",
        "title": "Infer the Author's Perspective",
        "blocks": [
          {
            "kind": "text",
            "text": "Perspective appears in judgments, emphasis, tone, and selected details."
          },
          {
            "kind": "example",
            "text": "“I believe” and “would serve students” show support; Text B uses neutral qualifying language."
          },
          {
            "kind": "tip",
            "text": "Perspective is not first/third-person narration."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Which phrase most clearly reveals support?",
          "choices": [
            {
              "id": "a",
              "text": "I believe our school should plant"
            },
            {
              "id": "b",
              "text": "A canopy is a layer"
            },
            {
              "id": "c",
              "text": "Cooling varies"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It directly states the writer’s position."
        }
      },
      {
        "id": "reading-u08-l01-c3",
        "title": "Explain How Perspective Conveys Purpose",
        "blocks": [
          {
            "kind": "text",
            "text": "Connect language to purpose: perspective language shapes how the audience receives the goal."
          },
          {
            "kind": "example",
            "text": "Positive benefits and a respectful request advance advocacy; neutral definitions and qualifications advance explanation."
          },
          {
            "kind": "tip",
            "text": "Use Language → Perspective → Purpose."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "How does “Please ask” serve Text A?",
          "choices": [
            {
              "id": "a",
              "text": "It turns support into a direct advocacy request"
            },
            {
              "id": "b",
              "text": "It defines canopy"
            },
            {
              "id": "c",
              "text": "It proves all sites cool equally"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The phrase asks the audience to act."
        }
      }
    ],
    "workedExample": {
      "title": "Compare purpose and perspective in paired texts",
      "passage": {
        "title": "A Shadier Schoolyard / How Tree Canopies Cool Pavement",
        "text": "Paired Text A — A Shadier Schoolyard\n\nI believe our school should plant two shade trees beside the blacktop. At midday, the pavement feels hot, and students crowd beneath the one small awning. Trees would create another shaded place for reading and recess. Their roots would need protected planting beds, and adults would choose species suited to the site. Planting takes planning, but a cooler gathering space would serve students for years. Please ask the school committee to study safe locations this fall.\n\nPaired Text B — How Tree Canopies Cool Pavement\n\nA tree canopy is the layer formed by branches and leaves. A canopy blocks some sunlight before it reaches pavement. Leaves also release water vapor, a process that can cool nearby air. The amount of cooling varies with tree size, weather, placement, and time of day. Schools considering trees must also plan for roots, water, and long-term care. These facts explain why tree shade can change conditions around paved areas without promising the same result in every location."
      },
      "steps": [
        "Mark Text A’s belief, benefits, and request.",
        "Mark Text B’s definitions, causes, and qualifications.",
        "Explain that supportive perspective advances advocacy while neutral perspective advances explanation."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “A Shadier Schoolyard / How Tree Canopies Cool Pavement”",
        "text": "Paired Text A — A Shadier Schoolyard\n\nI believe our school should plant two shade trees beside the blacktop. At midday, the pavement feels hot, and students crowd beneath the one small awning. Trees would create another shaded place for reading and recess. Their roots would need protected planting beds, and adults would choose species suited to the site. Planting takes planning, but a cooler gathering space would serve students for years. Please ask the school committee to study safe locations this fall.\n\nPaired Text B — How Tree Canopies Cool Pavement\n\nA tree canopy is the layer formed by branches and leaves. A canopy blocks some sunlight before it reaches pavement. Leaves also release water vapor, a process that can cool nearby air. The amount of cooling varies with tree size, weather, placement, and time of day. Schools considering trees must also plan for roots, water, and long-term care. These facts explain why tree shade can change conditions around paved areas without promising the same result in every location."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "What is Text A’s main purpose?",
          "choices": [
            {
              "id": "a",
              "text": "Advocate that the committee study safe tree planting"
            },
            {
              "id": "b",
              "text": "Explain water vapor only"
            },
            {
              "id": "c",
              "text": "Describe one tree species"
            },
            {
              "id": "d",
              "text": "Tell a fictional adventure"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The writer argues for consideration and action.",
          "id": "reading-u08-l01-q01",
          "conceptTag": "author-purpose",
          "reviewCardId": "reading-u08-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "Text B primarily explains rather than asks the reader to act.",
          "choices": [
            {
              "id": "true",
              "text": "True — it defines and explains canopy effects"
            },
            {
              "id": "false",
              "text": "False — it demands a vote"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Its language is informational.",
          "id": "reading-u08-l01-q02",
          "conceptTag": "author-purpose",
          "reviewCardId": "reading-u08-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail most clearly serves Text A’s purpose?",
          "choices": [
            {
              "id": "a",
              "text": "Branches form canopies"
            },
            {
              "id": "b",
              "text": "Cooling varies"
            },
            {
              "id": "c",
              "text": "Please ask the committee to study safe locations"
            },
            {
              "id": "d",
              "text": "Leaves release water vapor"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The request names the desired action.",
          "id": "reading-u08-l01-q03",
          "conceptTag": "author-purpose",
          "reviewCardId": "reading-u08-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which statement best distinguishes the purposes?",
          "choices": [
            {
              "id": "a",
              "text": "Both only entertain"
            },
            {
              "id": "b",
              "text": "Both demand planting"
            },
            {
              "id": "c",
              "text": "A describes and B narrates"
            },
            {
              "id": "d",
              "text": "A advocates a study; B explains how canopy cooling works"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It accurately states each goal.",
          "id": "reading-u08-l01-q04",
          "conceptTag": "author-purpose",
          "reviewCardId": "reading-u08-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What perspective does Text A express?",
          "choices": [
            {
              "id": "a",
              "text": "uncertain that trees exist"
            },
            {
              "id": "b",
              "text": "supportive of carefully planned shade trees"
            },
            {
              "id": "c",
              "text": "opposed to all planting"
            },
            {
              "id": "d",
              "text": "neutral about the school"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Benefits and request show support.",
          "id": "reading-u08-l01-q05",
          "conceptTag": "author-perspective",
          "reviewCardId": "reading-u08-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "Text B’s qualifications create a more neutral perspective.",
          "choices": [
            {
              "id": "true",
              "text": "True — it notes variables and limits"
            },
            {
              "id": "false",
              "text": "False — neutral texts hide limits"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The caveats avoid overstatement.",
          "id": "reading-u08-l01-q06",
          "conceptTag": "author-perspective",
          "reviewCardId": "reading-u08-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which phrase is strongest perspective evidence?",
          "choices": [
            {
              "id": "a",
              "text": "tree canopy"
            },
            {
              "id": "b",
              "text": "water vapor"
            },
            {
              "id": "c",
              "text": "would serve students for years"
            },
            {
              "id": "d",
              "text": "time of day"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It gives a positive judgment.",
          "id": "reading-u08-l01-q07",
          "conceptTag": "author-perspective",
          "reviewCardId": "reading-u08-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which statement avoids confusing perspective with narration?",
          "choices": [
            {
              "id": "a",
              "text": "Perspective means using I"
            },
            {
              "id": "b",
              "text": "Third person is always neutral"
            },
            {
              "id": "c",
              "text": "Purpose and perspective are identical"
            },
            {
              "id": "d",
              "text": "Perspective is the author’s stance, shown by selected language and emphasis"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It defines stance accurately.",
          "id": "reading-u08-l01-q08",
          "conceptTag": "author-perspective",
          "reviewCardId": "reading-u08-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does Text A’s perspective convey purpose?",
          "choices": [
            {
              "id": "a",
              "text": "Positive benefits and a respectful request encourage committee action"
            },
            {
              "id": "b",
              "text": "Definitions prove advocacy"
            },
            {
              "id": "c",
              "text": "Qualifications demand planting"
            },
            {
              "id": "d",
              "text": "First person makes every claim true"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Language and action align.",
          "id": "reading-u08-l01-q09",
          "conceptTag": "purpose-perspective",
          "reviewCardId": "reading-u08-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "An author can explain from a neutral perspective while still selecting useful facts.",
          "choices": [
            {
              "id": "true",
              "text": "True — Text B does so"
            },
            {
              "id": "false",
              "text": "False — explanation requires a strong opinion"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Neutral does not mean fact-free.",
          "id": "reading-u08-l01-q10",
          "conceptTag": "purpose-perspective",
          "reviewCardId": "reading-u08-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does Text B’s perspective serve its purpose?",
          "choices": [
            {
              "id": "a",
              "text": "It praises the school"
            },
            {
              "id": "b",
              "text": "It uses definitions, causes, and limits to explain accurately"
            },
            {
              "id": "c",
              "text": "It tells readers to vote"
            },
            {
              "id": "d",
              "text": "It uses a character conflict"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The neutral evidence supports explanation.",
          "id": "reading-u08-l01-q11",
          "conceptTag": "purpose-perspective",
          "reviewCardId": "reading-u08-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which comparison is supported?",
          "choices": [
            {
              "id": "a",
              "text": "A and B oppose trees"
            },
            {
              "id": "b",
              "text": "A explains roots; B tells a story"
            },
            {
              "id": "c",
              "text": "Both discuss shade, but their stance and intended result differ"
            },
            {
              "id": "d",
              "text": "Their purposes are identical"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Topic can match while purpose differs.",
          "id": "reading-u08-l01-q12",
          "conceptTag": "purpose-perspective",
          "reviewCardId": "reading-u08-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response follows Language → Perspective → Purpose?",
          "choices": [
            {
              "id": "a",
              "text": "Trees → shade → school"
            },
            {
              "id": "b",
              "text": "I appears → first person → true"
            },
            {
              "id": "c",
              "text": "Canopy is defined → trees are good"
            },
            {
              "id": "d",
              "text": "“Would serve students” shows support, which helps persuade the committee to consider planting"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It traces exact language to stance and goal.",
          "id": "reading-u08-l01-q13",
          "conceptTag": "purpose-perspective",
          "reviewCardId": "reading-u08-l01-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u08-l02",
    "unitId": "reading-u08",
    "title": "Explain Claims, Reasons, and Evidence",
    "indicatorCodes": [
      "ELA.4.AOR.5.3"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "A claim is the position an author wants readers to accept."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Reasons tell why; evidence supplies verifiable support."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s trace each evidence link without overstating it."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u08-l02-c1",
        "title": "Locate the Claim",
        "blocks": [
          {
            "kind": "text",
            "text": "Find the broad arguable statement supported by the rest of the text."
          },
          {
            "kind": "example",
            "text": "“Our school should keep the refill station” is the claim."
          },
          {
            "kind": "tip",
            "text": "A fact can support the claim without being the claim."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which sentence is the claim?",
          "choices": [
            {
              "id": "a",
              "text": "The school should keep the refill station"
            },
            {
              "id": "b",
              "text": "The log counted 1,240 refills"
            },
            {
              "id": "c",
              "text": "A bottle has a sticker"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It is the position the argument supports."
        }
      },
      {
        "id": "reading-u08-l02-c2",
        "title": "Evaluate the Reasons",
        "blocks": [
          {
            "kind": "text",
            "text": "A reason is a logical why: convenience and possible waste reduction."
          },
          {
            "kind": "example",
            "text": "A relevant reason connects directly and is not merely a repeated claim."
          },
          {
            "kind": "tip",
            "text": "Check whether the reason would matter if true."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Which is a relevant reason?",
          "choices": [
            {
              "id": "a",
              "text": "Students can refill after activity"
            },
            {
              "id": "b",
              "text": "The station is beside a wall"
            },
            {
              "id": "c",
              "text": "A sticker shows a dolphin"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Convenient access directly supports keeping it."
        }
      },
      {
        "id": "reading-u08-l02-c3",
        "title": "Connect Evidence to the Claim",
        "blocks": [
          {
            "kind": "text",
            "text": "Evidence includes observations, records, measurements, and credible expert information."
          },
          {
            "kind": "example",
            "text": "The refill count supports use; the waste count supports reduced disposable bottles, with stated limits."
          },
          {
            "kind": "tip",
            "text": "Explain Evidence → Reason → Claim."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "What does 1,240 refills support?",
          "choices": [
            {
              "id": "a",
              "text": "The station is frequently used"
            },
            {
              "id": "b",
              "text": "Every refill replaces plastic"
            },
            {
              "id": "c",
              "text": "Filters never need changing"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The log directly measures use."
        }
      }
    ],
    "workedExample": {
      "title": "Trace claim, reasons, evidence, and limits",
      "passage": {
        "title": "Keep the Refill Station",
        "text": "Keep the Refill Station\n\nOur school should keep the water-bottle refill station beside the gym. First, it gives students a convenient place to refill reusable bottles after physical education and recess. A facilities log recorded 1,240 refills during the first eight weeks of school. That count shows frequent use.\n\nSecond, refilling a bottle can reduce the number of single-use bottles placed in trash bins. In a one-day cafeteria check, the green team counted 37 fewer disposable water bottles than on the same event day before the station opened. One student’s bottle has a dolphin sticker; that detail is true but does not support the claim.\n\nThe station needs filter changes and cleaning, so keeping it requires a maintenance plan. The usage log and waste count do not prove every refill replaces a disposable bottle, but they provide relevant evidence for convenience and reduced waste. For those reasons, the school should keep and maintain the station."
      },
      "steps": [
        "State the keep-the-station claim.",
        "Match convenience and reduced waste as reasons.",
        "Connect the refill and waste counts while preserving the source’s limits."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Keep the Refill Station”",
        "text": "Keep the Refill Station\n\nOur school should keep the water-bottle refill station beside the gym. First, it gives students a convenient place to refill reusable bottles after physical education and recess. A facilities log recorded 1,240 refills during the first eight weeks of school. That count shows frequent use.\n\nSecond, refilling a bottle can reduce the number of single-use bottles placed in trash bins. In a one-day cafeteria check, the green team counted 37 fewer disposable water bottles than on the same event day before the station opened. One student’s bottle has a dolphin sticker; that detail is true but does not support the claim.\n\nThe station needs filter changes and cleaning, so keeping it requires a maintenance plan. The usage log and waste count do not prove every refill replaces a disposable bottle, but they provide relevant evidence for convenience and reduced waste. For those reasons, the school should keep and maintain the station."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "What is the central claim?",
          "choices": [
            {
              "id": "a",
              "text": "The school should keep and maintain the refill station"
            },
            {
              "id": "b",
              "text": "Every student owns a bottle"
            },
            {
              "id": "c",
              "text": "The gym should close"
            },
            {
              "id": "d",
              "text": "Filters last forever"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The text argues for keeping the station.",
          "id": "reading-u08-l02-q01",
          "conceptTag": "claim",
          "reviewCardId": "reading-u08-l02-c1"
        },
        {
          "type": "true-false",
          "prompt": "“The log recorded 1,240 refills” is evidence, not the claim.",
          "choices": [
            {
              "id": "true",
              "text": "True — it supports frequent use"
            },
            {
              "id": "false",
              "text": "False — every number is a claim"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The number supports a reason.",
          "id": "reading-u08-l02-q02",
          "conceptTag": "claim",
          "reviewCardId": "reading-u08-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which sentence restates the claim?",
          "choices": [
            {
              "id": "a",
              "text": "The station needs cleaning"
            },
            {
              "id": "b",
              "text": "A bottle has a sticker"
            },
            {
              "id": "c",
              "text": "Continue operating the refill station with maintenance"
            },
            {
              "id": "d",
              "text": "The green team counts trash"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It preserves the author’s position.",
          "id": "reading-u08-l02-q03",
          "conceptTag": "claim",
          "reviewCardId": "reading-u08-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which is not the claim?",
          "choices": [
            {
              "id": "a",
              "text": "Keep the station"
            },
            {
              "id": "b",
              "text": "Maintain the station"
            },
            {
              "id": "c",
              "text": "The station should remain available"
            },
            {
              "id": "d",
              "text": "The station logged 1,240 refills"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The log is evidence.",
          "id": "reading-u08-l02-q04",
          "conceptTag": "claim",
          "reviewCardId": "reading-u08-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which reason supports the claim?",
          "choices": [
            {
              "id": "a",
              "text": "The station has metal parts"
            },
            {
              "id": "b",
              "text": "Students can refill reusable bottles conveniently"
            },
            {
              "id": "c",
              "text": "The gym has a door"
            },
            {
              "id": "d",
              "text": "A student likes dolphins"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Convenience is a direct benefit.",
          "id": "reading-u08-l02-q05",
          "conceptTag": "reasons",
          "reviewCardId": "reading-u08-l02-c2"
        },
        {
          "type": "true-false",
          "prompt": "The need for maintenance automatically destroys the argument.",
          "choices": [
            {
              "id": "true",
              "text": "True — costs end every claim"
            },
            {
              "id": "false",
              "text": "False — the author acknowledges it and proposes a plan"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "A limitation can be addressed.",
          "id": "reading-u08-l02-q06",
          "conceptTag": "reasons",
          "reviewCardId": "reading-u08-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which is the second reason?",
          "choices": [
            {
              "id": "a",
              "text": "The station is beside the gym"
            },
            {
              "id": "b",
              "text": "Filters change"
            },
            {
              "id": "c",
              "text": "Refilling may reduce disposable-bottle waste"
            },
            {
              "id": "d",
              "text": "Logs use numbers"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Waste reduction supports keeping it.",
          "id": "reading-u08-l02-q07",
          "conceptTag": "reasons",
          "reviewCardId": "reading-u08-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why is the dolphin sticker irrelevant?",
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
              "text": "It appears late"
            },
            {
              "id": "d",
              "text": "It does not support convenience, waste reduction, or the claim"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Truth alone does not ensure relevance.",
          "id": "reading-u08-l02-q08",
          "conceptTag": "reasons",
          "reviewCardId": "reading-u08-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which evidence supports frequent use?",
          "choices": [
            {
              "id": "a",
              "text": "1,240 refills in eight weeks"
            },
            {
              "id": "b",
              "text": "37 bottle colors"
            },
            {
              "id": "c",
              "text": "one sticker"
            },
            {
              "id": "d",
              "text": "a filter schedule"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The usage log directly measures refills.",
          "id": "reading-u08-l02-q09",
          "conceptTag": "claim-evidence",
          "reviewCardId": "reading-u08-l02-c3"
        },
        {
          "type": "true-false",
          "prompt": "The source carefully avoids claiming every refill replaces a disposable bottle.",
          "choices": [
            {
              "id": "true",
              "text": "True — it states that limit"
            },
            {
              "id": "false",
              "text": "False — it makes the absolute claim"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The limitation keeps the reasoning accurate.",
          "id": "reading-u08-l02-q10",
          "conceptTag": "claim-evidence",
          "reviewCardId": "reading-u08-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the one-day waste count support?",
          "choices": [
            {
              "id": "a",
              "text": "The station cleans itself"
            },
            {
              "id": "b",
              "text": "Disposable-bottle waste may be lower with refilling"
            },
            {
              "id": "c",
              "text": "Every student drinks equally"
            },
            {
              "id": "d",
              "text": "The log is incorrect"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The comparison is relevant evidence.",
          "id": "reading-u08-l02-q11",
          "conceptTag": "claim-evidence",
          "reviewCardId": "reading-u08-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation is strongest?",
          "choices": [
            {
              "id": "a",
              "text": "Numbers are convincing"
            },
            {
              "id": "b",
              "text": "The station is useful"
            },
            {
              "id": "c",
              "text": "The refill log supports convenience/frequent use, which supports keeping the station"
            },
            {
              "id": "d",
              "text": "Stickers support recycling"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It traces evidence to reason to claim.",
          "id": "reading-u08-l02-q12",
          "conceptTag": "claim-evidence",
          "reviewCardId": "reading-u08-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which evaluation is accurate?",
          "choices": [
            {
              "id": "a",
              "text": "The evidence proves all future behavior"
            },
            {
              "id": "b",
              "text": "No evidence is present"
            },
            {
              "id": "c",
              "text": "The claim is only a fact"
            },
            {
              "id": "d",
              "text": "The records support the reasons, while the author appropriately notes their limits"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It weighs both support and limitation.",
          "id": "reading-u08-l02-q13",
          "conceptTag": "claim-evidence",
          "reviewCardId": "reading-u08-l02-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
```

### `src/content/reading/u08.test.ts`

```ts
import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit08Lessons } from './u08';

const expectedManifest = [
  {
    "id": "reading-u08-l01",
    "unitId": "reading-u08",
    "title": "Connect Author's Purpose and Perspective",
    "indicatorCodes": [
      "ELA.4.AOR.4.1"
    ]
  },
  {
    "id": "reading-u08-l02",
    "unitId": "reading-u08",
    "title": "Explain Claims, Reasons, and Evidence",
    "indicatorCodes": [
      "ELA.4.AOR.5.3"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u08-l01",
    "cards": [
      {
        "id": "reading-u08-l01-c1",
        "title": "Identify the Author's Purpose",
        "conceptTag": "author-purpose"
      },
      {
        "id": "reading-u08-l01-c2",
        "title": "Infer the Author's Perspective",
        "conceptTag": "author-perspective"
      },
      {
        "id": "reading-u08-l01-c3",
        "title": "Explain How Perspective Conveys Purpose",
        "conceptTag": "purpose-perspective"
      }
    ]
  },
  {
    "id": "reading-u08-l02",
    "cards": [
      {
        "id": "reading-u08-l02-c1",
        "title": "Locate the Claim",
        "conceptTag": "claim"
      },
      {
        "id": "reading-u08-l02-c2",
        "title": "Evaluate the Reasons",
        "conceptTag": "reasons"
      },
      {
        "id": "reading-u08-l02-c3",
        "title": "Connect Evidence to the Claim",
        "conceptTag": "claim-evidence"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u08-l01",
    "questions": [
      {
        "id": "reading-u08-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "author-purpose",
        "reviewCardId": "reading-u08-l01-c1"
      },
      {
        "id": "reading-u08-l01-q02",
        "type": "true-false",
        "conceptTag": "author-purpose",
        "reviewCardId": "reading-u08-l01-c1"
      },
      {
        "id": "reading-u08-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "author-purpose",
        "reviewCardId": "reading-u08-l01-c1"
      },
      {
        "id": "reading-u08-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "author-purpose",
        "reviewCardId": "reading-u08-l01-c1"
      },
      {
        "id": "reading-u08-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "author-perspective",
        "reviewCardId": "reading-u08-l01-c2"
      },
      {
        "id": "reading-u08-l01-q06",
        "type": "true-false",
        "conceptTag": "author-perspective",
        "reviewCardId": "reading-u08-l01-c2"
      },
      {
        "id": "reading-u08-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "author-perspective",
        "reviewCardId": "reading-u08-l01-c2"
      },
      {
        "id": "reading-u08-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "author-perspective",
        "reviewCardId": "reading-u08-l01-c2"
      },
      {
        "id": "reading-u08-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "purpose-perspective",
        "reviewCardId": "reading-u08-l01-c3"
      },
      {
        "id": "reading-u08-l01-q10",
        "type": "true-false",
        "conceptTag": "purpose-perspective",
        "reviewCardId": "reading-u08-l01-c3"
      },
      {
        "id": "reading-u08-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "purpose-perspective",
        "reviewCardId": "reading-u08-l01-c3"
      },
      {
        "id": "reading-u08-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "purpose-perspective",
        "reviewCardId": "reading-u08-l01-c3"
      },
      {
        "id": "reading-u08-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "purpose-perspective",
        "reviewCardId": "reading-u08-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u08-l02",
    "questions": [
      {
        "id": "reading-u08-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "claim",
        "reviewCardId": "reading-u08-l02-c1"
      },
      {
        "id": "reading-u08-l02-q02",
        "type": "true-false",
        "conceptTag": "claim",
        "reviewCardId": "reading-u08-l02-c1"
      },
      {
        "id": "reading-u08-l02-q03",
        "type": "multiple-choice",
        "conceptTag": "claim",
        "reviewCardId": "reading-u08-l02-c1"
      },
      {
        "id": "reading-u08-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "claim",
        "reviewCardId": "reading-u08-l02-c1"
      },
      {
        "id": "reading-u08-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "reasons",
        "reviewCardId": "reading-u08-l02-c2"
      },
      {
        "id": "reading-u08-l02-q06",
        "type": "true-false",
        "conceptTag": "reasons",
        "reviewCardId": "reading-u08-l02-c2"
      },
      {
        "id": "reading-u08-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "reasons",
        "reviewCardId": "reading-u08-l02-c2"
      },
      {
        "id": "reading-u08-l02-q08",
        "type": "multiple-choice",
        "conceptTag": "reasons",
        "reviewCardId": "reading-u08-l02-c2"
      },
      {
        "id": "reading-u08-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "claim-evidence",
        "reviewCardId": "reading-u08-l02-c3"
      },
      {
        "id": "reading-u08-l02-q10",
        "type": "true-false",
        "conceptTag": "claim-evidence",
        "reviewCardId": "reading-u08-l02-c3"
      },
      {
        "id": "reading-u08-l02-q11",
        "type": "multiple-choice",
        "conceptTag": "claim-evidence",
        "reviewCardId": "reading-u08-l02-c3"
      },
      {
        "id": "reading-u08-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "claim-evidence",
        "reviewCardId": "reading-u08-l02-c3"
      },
      {
        "id": "reading-u08-l02-q13",
        "type": "multiple-choice",
        "conceptTag": "claim-evidence",
        "reviewCardId": "reading-u08-l02-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u08-l01",
    "checks": [
      {
        "cardId": "reading-u08-l01-c1",
        "check": {
          "prompt": "What is Text A mainly trying to do?",
          "choices": [
            {
              "id": "a",
              "text": "persuade the committee to study planting shade trees"
            },
            {
              "id": "b",
              "text": "explain every tree species"
            },
            {
              "id": "c",
              "text": "entertain with a fantasy"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The writer states a belief and makes a request."
        }
      },
      {
        "cardId": "reading-u08-l01-c2",
        "check": {
          "prompt": "Which phrase most clearly reveals support?",
          "choices": [
            {
              "id": "a",
              "text": "I believe our school should plant"
            },
            {
              "id": "b",
              "text": "A canopy is a layer"
            },
            {
              "id": "c",
              "text": "Cooling varies"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It directly states the writer’s position."
        }
      },
      {
        "cardId": "reading-u08-l01-c3",
        "check": {
          "prompt": "How does “Please ask” serve Text A?",
          "choices": [
            {
              "id": "a",
              "text": "It turns support into a direct advocacy request"
            },
            {
              "id": "b",
              "text": "It defines canopy"
            },
            {
              "id": "c",
              "text": "It proves all sites cool equally"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The phrase asks the audience to act."
        }
      }
    ]
  },
  {
    "id": "reading-u08-l02",
    "checks": [
      {
        "cardId": "reading-u08-l02-c1",
        "check": {
          "prompt": "Which sentence is the claim?",
          "choices": [
            {
              "id": "a",
              "text": "The school should keep the refill station"
            },
            {
              "id": "b",
              "text": "The log counted 1,240 refills"
            },
            {
              "id": "c",
              "text": "A bottle has a sticker"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It is the position the argument supports."
        }
      },
      {
        "cardId": "reading-u08-l02-c2",
        "check": {
          "prompt": "Which is a relevant reason?",
          "choices": [
            {
              "id": "a",
              "text": "Students can refill after activity"
            },
            {
              "id": "b",
              "text": "The station is beside a wall"
            },
            {
              "id": "c",
              "text": "A sticker shows a dolphin"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Convenient access directly supports keeping it."
        }
      },
      {
        "cardId": "reading-u08-l02-c3",
        "check": {
          "prompt": "What does 1,240 refills support?",
          "choices": [
            {
              "id": "a",
              "text": "The station is frequently used"
            },
            {
              "id": "b",
              "text": "Every refill replaces plastic"
            },
            {
              "id": "c",
              "text": "Filters never need changing"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The log directly measures use."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u08-l01",
    "widgets": []
  },
  {
    "id": "reading-u08-l02",
    "widgets": []
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u08-l01",
    "passage": {
      "title": "A Shadier Schoolyard / How Tree Canopies Cool Pavement",
      "text": "Paired Text A — A Shadier Schoolyard\n\nI believe our school should plant two shade trees beside the blacktop. At midday, the pavement feels hot, and students crowd beneath the one small awning. Trees would create another shaded place for reading and recess. Their roots would need protected planting beds, and adults would choose species suited to the site. Planting takes planning, but a cooler gathering space would serve students for years. Please ask the school committee to study safe locations this fall.\n\nPaired Text B — How Tree Canopies Cool Pavement\n\nA tree canopy is the layer formed by branches and leaves. A canopy blocks some sunlight before it reaches pavement. Leaves also release water vapor, a process that can cool nearby air. The amount of cooling varies with tree size, weather, placement, and time of day. Schools considering trees must also plan for roots, water, and long-term care. These facts explain why tree shade can change conditions around paved areas without promising the same result in every location."
    },
    "reference": {
      "title": "Read “A Shadier Schoolyard / How Tree Canopies Cool Pavement”",
      "text": "Paired Text A — A Shadier Schoolyard\n\nI believe our school should plant two shade trees beside the blacktop. At midday, the pavement feels hot, and students crowd beneath the one small awning. Trees would create another shaded place for reading and recess. Their roots would need protected planting beds, and adults would choose species suited to the site. Planting takes planning, but a cooler gathering space would serve students for years. Please ask the school committee to study safe locations this fall.\n\nPaired Text B — How Tree Canopies Cool Pavement\n\nA tree canopy is the layer formed by branches and leaves. A canopy blocks some sunlight before it reaches pavement. Leaves also release water vapor, a process that can cool nearby air. The amount of cooling varies with tree size, weather, placement, and time of day. Schools considering trees must also plan for roots, water, and long-term care. These facts explain why tree shade can change conditions around paved areas without promising the same result in every location."
    },
    "evidence": [
      "I believe",
      "tree canopy",
      "Please ask"
    ]
  },
  {
    "id": "reading-u08-l02",
    "passage": {
      "title": "Keep the Refill Station",
      "text": "Keep the Refill Station\n\nOur school should keep the water-bottle refill station beside the gym. First, it gives students a convenient place to refill reusable bottles after physical education and recess. A facilities log recorded 1,240 refills during the first eight weeks of school. That count shows frequent use.\n\nSecond, refilling a bottle can reduce the number of single-use bottles placed in trash bins. In a one-day cafeteria check, the green team counted 37 fewer disposable water bottles than on the same event day before the station opened. One student’s bottle has a dolphin sticker; that detail is true but does not support the claim.\n\nThe station needs filter changes and cleaning, so keeping it requires a maintenance plan. The usage log and waste count do not prove every refill replaces a disposable bottle, but they provide relevant evidence for convenience and reduced waste. For those reasons, the school should keep and maintain the station."
    },
    "reference": {
      "title": "Read “Keep the Refill Station”",
      "text": "Keep the Refill Station\n\nOur school should keep the water-bottle refill station beside the gym. First, it gives students a convenient place to refill reusable bottles after physical education and recess. A facilities log recorded 1,240 refills during the first eight weeks of school. That count shows frequent use.\n\nSecond, refilling a bottle can reduce the number of single-use bottles placed in trash bins. In a one-day cafeteria check, the green team counted 37 fewer disposable water bottles than on the same event day before the station opened. One student’s bottle has a dolphin sticker; that detail is true but does not support the claim.\n\nThe station needs filter changes and cleaning, so keeping it requires a maintenance plan. The usage log and waste count do not prove every refill replaces a disposable bottle, but they provide relevant evidence for convenience and reduced waste. For those reasons, the school should keep and maintain the station."
    },
    "evidence": [
      "1,240 refills",
      "37 fewer",
      "dolphin sticker"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 8 literal content', () => {
  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit08Lessons, expectedManifest, 'reading');
    expect(unit08Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit08Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit08Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit08Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit08Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit08Lessons) {
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
    for (const lesson of unit08Lessons) {
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

### `src/content/reading/u09.ts`

```ts
import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit09Lessons = [
  {
    "id": "reading-u09-l01",
    "unitId": "reading-u09",
    "title": "Compare First- and Third-Person Narration",
    "indicatorCodes": [
      "ELA.4.AOR.3.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Point of view identifies who narrates and what that narrator can reveal."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "First person uses I/we; third person names characters or uses he/she/they."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Third person is not automatically all-knowing."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u09-l01-c1",
        "title": "Recognize First-Person Narration",
        "blocks": [
          {
            "kind": "text",
            "text": "A first-person narrator participates and uses I, me, my, or we."
          },
          {
            "kind": "example",
            "text": "Lila’s first version directly reveals “I felt proud” and what she did not know."
          },
          {
            "kind": "tip",
            "text": "Ask who “I” is."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which pronoun signals first person?",
          "choices": [
            {
              "id": "a",
              "text": "I"
            },
            {
              "id": "b",
              "text": "she"
            },
            {
              "id": "c",
              "text": "Lila"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The narrator refers to herself as I."
        }
      },
      {
        "id": "reading-u09-l01-c2",
        "title": "Recognize Third-Person Narration",
        "blocks": [
          {
            "kind": "text",
            "text": "Third-person narration uses character names and third-person pronouns."
          },
          {
            "kind": "example",
            "text": "The second version reports Lila’s thoughts and then shifts beyond her knowledge to Carlos’s separate discovery."
          },
          {
            "kind": "tip",
            "text": "Knowledge access must be inferred from what the narrator actually reveals."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Which phrase is third person?",
          "choices": [
            {
              "id": "a",
              "text": "she noticed"
            },
            {
              "id": "b",
              "text": "I wondered"
            },
            {
              "id": "c",
              "text": "my marker"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "She refers to a character from outside."
        }
      },
      {
        "id": "reading-u09-l01-c3",
        "title": "Compare What Narrators Reveal",
        "blocks": [
          {
            "kind": "text",
            "text": "Compare pronouns, narrator participation, and revealed information."
          },
          {
            "kind": "example",
            "text": "Both versions show Lila’s discovery; the third-person version explicitly shifts to Carlos farther ahead."
          },
          {
            "kind": "tip",
            "text": "A rewrite must preserve events while changing narrator words."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "widget": {
          "type": "pov-switcher",
          "config": {
            "passage": "Lila carried Lila’s marker to the trail.",
            "from": "third",
            "target": "first",
            "pronounOptions": [
              "I",
              "my",
              "she"
            ],
            "requiredPronouns": [
              "I",
              "my"
            ]
          }
        },
        "check": {
          "prompt": "How should “Lila carried Lila’s marker” begin in first person?",
          "choices": [
            {
              "id": "a",
              "text": "I carried my marker"
            },
            {
              "id": "b",
              "text": "She carried her marker"
            },
            {
              "id": "c",
              "text": "Lila carried my marker"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "I/my correctly shifts the narrator."
        }
      }
    ],
    "workedExample": {
      "title": "Compare first person with third-person omniscient narration",
      "passage": {
        "title": "The Hidden Trail Marker",
        "text": "The Hidden Trail Marker — first-person version\n\nI carried my painted marker toward the school nature trail. Near the first bend, I noticed an older marker half buried under pine needles. I brushed it clean and wondered whether it belonged to the trail’s original route. I felt proud when I recognized the faded owl symbol from a map in the library. I hurried back to tell Ms. Reed, still wondering whether another marker waited farther ahead.\n\nThe Hidden Trail Marker — third-person omniscient version\n\nLila carried Lila’s painted marker toward the school nature trail. Near the first bend, she noticed an older marker half buried under pine needles. She brushed it clean and remembered the faded owl symbol from a library map. Lila felt proud and hurried back to tell Ms. Reed. Farther ahead, Carlos found a matching symbol, but Lila had not seen him yet."
      },
      "steps": [
        "Mark I/my in version one and Lila/she in version two.",
        "List what each reveals about Lila and Carlos.",
        "Explain that the event stays constant while narrator access and wording change."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “The Hidden Trail Marker”",
        "text": "The Hidden Trail Marker — first-person version\n\nI carried my painted marker toward the school nature trail. Near the first bend, I noticed an older marker half buried under pine needles. I brushed it clean and wondered whether it belonged to the trail’s original route. I felt proud when I recognized the faded owl symbol from a map in the library. I hurried back to tell Ms. Reed, still wondering whether another marker waited farther ahead.\n\nThe Hidden Trail Marker — third-person omniscient version\n\nLila carried Lila’s painted marker toward the school nature trail. Near the first bend, she noticed an older marker half buried under pine needles. She brushed it clean and remembered the faded owl symbol from a library map. Lila felt proud and hurried back to tell Ms. Reed. Farther ahead, Carlos found a matching symbol, but Lila had not seen him yet."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which word identifies first-person narration?",
          "choices": [
            {
              "id": "a",
              "text": "I"
            },
            {
              "id": "b",
              "text": "Lila"
            },
            {
              "id": "c",
              "text": "she"
            },
            {
              "id": "d",
              "text": "Carlos"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "I marks the participating narrator.",
          "id": "reading-u09-l01-q01",
          "conceptTag": "first-person",
          "reviewCardId": "reading-u09-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "The first-person narrator is Lila.",
          "choices": [
            {
              "id": "true",
              "text": "True — “I” carries Lila’s role and marker"
            },
            {
              "id": "false",
              "text": "False — Ms. Reed narrates"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The paired details identify Lila.",
          "id": "reading-u09-l01-q02",
          "conceptTag": "first-person",
          "reviewCardId": "reading-u09-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does first person reveal directly?",
          "choices": [
            {
              "id": "a",
              "text": "Carlos’s full thoughts"
            },
            {
              "id": "b",
              "text": "Ms. Reed’s plan"
            },
            {
              "id": "c",
              "text": "Lila’s pride and wondering"
            },
            {
              "id": "d",
              "text": "the map author’s opinion"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The I narrator reports her own internal experience.",
          "id": "reading-u09-l01-q03",
          "conceptTag": "first-person",
          "reviewCardId": "reading-u09-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What is one first-person limitation?",
          "choices": [
            {
              "id": "a",
              "text": "It cannot include events"
            },
            {
              "id": "b",
              "text": "It never uses names"
            },
            {
              "id": "c",
              "text": "It cannot describe settings"
            },
            {
              "id": "d",
              "text": "Lila does not know Carlos already found a match"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Her knowledge is limited.",
          "id": "reading-u09-l01-q04",
          "conceptTag": "first-person",
          "reviewCardId": "reading-u09-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which phrase signals third person?",
          "choices": [
            {
              "id": "a",
              "text": "my marker"
            },
            {
              "id": "b",
              "text": "she noticed"
            },
            {
              "id": "c",
              "text": "I felt"
            },
            {
              "id": "d",
              "text": "we hurried"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "She is third-person language.",
          "id": "reading-u09-l01-q05",
          "conceptTag": "third-person",
          "reviewCardId": "reading-u09-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "Third-person narration always knows every character’s thoughts.",
          "choices": [
            {
              "id": "true",
              "text": "True — third person is always all-knowing"
            },
            {
              "id": "false",
              "text": "False — third-person narration may be limited or omniscient"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "Third person names an outside narrator; its knowledge can be limited or omniscient. This version shifts to Carlos beyond Lila’s view.",
          "id": "reading-u09-l01-q06",
          "conceptTag": "third-person",
          "reviewCardId": "reading-u09-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What extra information does the third-person version provide?",
          "choices": [
            {
              "id": "a",
              "text": "The marker color"
            },
            {
              "id": "b",
              "text": "Lila’s pride"
            },
            {
              "id": "c",
              "text": "Carlos finds a matching symbol farther ahead"
            },
            {
              "id": "d",
              "text": "The trail location"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It shifts briefly to Carlos’s action.",
          "id": "reading-u09-l01-q07",
          "conceptTag": "third-person",
          "reviewCardId": "reading-u09-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which description is accurate?",
          "choices": [
            {
              "id": "a",
              "text": "The narrator joins as I"
            },
            {
              "id": "b",
              "text": "Carlos narrates"
            },
            {
              "id": "c",
              "text": "No feelings are revealed"
            },
            {
              "id": "d",
              "text": "An outside narrator follows Lila and reports one event beyond her view"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It captures pronouns and access.",
          "id": "reading-u09-l01-q08",
          "conceptTag": "third-person",
          "reviewCardId": "reading-u09-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What stays the same across both versions?",
          "choices": [
            {
              "id": "a",
              "text": "Lila finds and cleans an old owl marker"
            },
            {
              "id": "b",
              "text": "Carlos speaks to Lila"
            },
            {
              "id": "c",
              "text": "Ms. Reed finds the marker"
            },
            {
              "id": "d",
              "text": "The marker disappears"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The central event is parallel.",
          "id": "reading-u09-l01-q09",
          "conceptTag": "pov-comparison",
          "reviewCardId": "reading-u09-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "Changing point of view can change what readers learn even when the event stays the same.",
          "choices": [
            {
              "id": "true",
              "text": "True — Carlos’s action is clearer in one version"
            },
            {
              "id": "false",
              "text": "False — wording/access never change"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The pair demonstrates the difference.",
          "id": "reading-u09-l01-q10",
          "conceptTag": "pov-comparison",
          "reviewCardId": "reading-u09-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which rewrite is correct?",
          "choices": [
            {
              "id": "a",
              "text": "She carried my marker"
            },
            {
              "id": "b",
              "text": "I carried my marker"
            },
            {
              "id": "c",
              "text": "I carried Lila’s marker as narrator Lila"
            },
            {
              "id": "d",
              "text": "Lila carried I marker"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "I/my forms create first person.",
          "id": "reading-u09-l01-q11",
          "conceptTag": "pov-comparison",
          "reviewCardId": "reading-u09-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which comparison is strongest?",
          "choices": [
            {
              "id": "a",
              "text": "One is longer"
            },
            {
              "id": "b",
              "text": "Both mention needles"
            },
            {
              "id": "c",
              "text": "First person gives Lila’s direct voice; third person can show Carlos’s separate action"
            },
            {
              "id": "d",
              "text": "Third person has no character"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It compares narrator access.",
          "id": "reading-u09-l01-q12",
          "conceptTag": "pov-comparison",
          "reviewCardId": "reading-u09-l01-c3"
        },
        {
          "type": "fill-blank",
          "prompt": "Complete the first-person rewrite: ___ carried my marker to the trail.",
          "acceptedAnswers": [
            "I"
          ],
          "explanation": "I is the required first-person subject pronoun.",
          "id": "reading-u09-l01-q13",
          "conceptTag": "pov-comparison",
          "reviewCardId": "reading-u09-l01-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u09-l02",
    "unitId": "reading-u09",
    "title": "Explain How Character Perspectives Shape a Story",
    "indicatorCodes": [
      "ELA.4.AOR.3.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Characters can interpret the same event differently."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Those perspectives influence reactions, conflict, mood, and later choices."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s trace impact rather than merely label attitudes."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u09-l02-c1",
        "title": "Identify Character Perspectives",
        "blocks": [
          {
            "kind": "text",
            "text": "A perspective is a character’s attitude or interpretation, supported by thoughts, words, and actions."
          },
          {
            "kind": "example",
            "text": "Jalen sees the move as a loss; Mei sees safety and invention."
          },
          {
            "kind": "tip",
            "text": "State the event and the character’s view."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "How does Jalen view the gym move?",
          "choices": [
            {
              "id": "a",
              "text": "as a disappointing loss of his practiced event"
            },
            {
              "id": "b",
              "text": "as perfect weather"
            },
            {
              "id": "c",
              "text": "as proof Mei is angry"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "His groan and thoughts directly support that view."
        }
      },
      {
        "id": "reading-u09-l02-c2",
        "title": "Compare Reactions to One Event",
        "blocks": [
          {
            "kind": "text",
            "text": "Compare reactions to the same event and explain why they differ."
          },
          {
            "kind": "example",
            "text": "Jalen groans; Mei grins because Mei values safety and new indoor events."
          },
          {
            "kind": "tip",
            "text": "Restate each view accurately before evaluating it."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Why does Mei react positively?",
          "choices": [
            {
              "id": "a",
              "text": "She values safety and new indoor events"
            },
            {
              "id": "b",
              "text": "She wants no field day"
            },
            {
              "id": "c",
              "text": "She practiced long jump"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Her words show those priorities."
        }
      },
      {
        "id": "reading-u09-l02-c3",
        "title": "Explain the Impact on the Text",
        "blocks": [
          {
            "kind": "text",
            "text": "Perspective matters when it changes conflict, mood, events, or reader understanding."
          },
          {
            "kind": "example",
            "text": "Misreading Mei creates tension; mutual restatement allows a shared plan."
          },
          {
            "kind": "tip",
            "text": "Use Perspective → Reaction → Text impact."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "What resolves the perspective conflict?",
          "choices": [
            {
              "id": "a",
              "text": "They restate each other’s views and combine ideas"
            },
            {
              "id": "b",
              "text": "The rain instantly stops"
            },
            {
              "id": "c",
              "text": "The principal restores long jump"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Accurate understanding changes their actions."
        }
      }
    ],
    "workedExample": {
      "title": "Trace perspectives through conflict and resolution",
      "passage": {
        "title": "Rain on Field Day",
        "text": "Rain on Field Day\n\nRain drummed against the classroom windows on field-day morning. Jalen groaned when the principal moved every event into the gym. He had practiced the long jump for weeks and thought an indoor field day would feel cramped and disappointing.\n\nMei grinned. She disliked running on wet grass and imagined relay games winding safely around cones. “We can invent events that fit the space,” she said. Jalen heard her excitement as proof that she did not care about the canceled jump, and his reply sounded sharp.\n\nDuring setup, Mei noticed his silence. She explained that she was relieved about safety but understood why he missed his event. Jalen admitted that he had treated her relief as an insult. Together they designed a standing-jump challenge and a careful cone relay.\n\nTheir contrasting perspectives first create tension and a disappointed mood. Once each character accurately restates the other’s view, the conflict softens. Their combined ideas reshape the events and produce a cooperative resolution."
      },
      "steps": [
        "Name the shared event.",
        "Contrast Jalen’s loss perspective with Mei’s safety/opportunity perspective.",
        "Trace misunderstanding to tension, then restatement to cooperative resolution."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Rain on Field Day”",
        "text": "Rain on Field Day\n\nRain drummed against the classroom windows on field-day morning. Jalen groaned when the principal moved every event into the gym. He had practiced the long jump for weeks and thought an indoor field day would feel cramped and disappointing.\n\nMei grinned. She disliked running on wet grass and imagined relay games winding safely around cones. “We can invent events that fit the space,” she said. Jalen heard her excitement as proof that she did not care about the canceled jump, and his reply sounded sharp.\n\nDuring setup, Mei noticed his silence. She explained that she was relieved about safety but understood why he missed his event. Jalen admitted that he had treated her relief as an insult. Together they designed a standing-jump challenge and a careful cone relay.\n\nTheir contrasting perspectives first create tension and a disappointed mood. Once each character accurately restates the other’s view, the conflict softens. Their combined ideas reshape the events and produce a cooperative resolution."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "What is Jalen’s perspective?",
          "choices": [
            {
              "id": "a",
              "text": "The move is cramped and disappointing because his event is lost"
            },
            {
              "id": "b",
              "text": "Rain makes every event better"
            },
            {
              "id": "c",
              "text": "Mei caused the weather"
            },
            {
              "id": "d",
              "text": "Safety never matters"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "His thoughts and groan support loss.",
          "id": "reading-u09-l02-q01",
          "conceptTag": "character-perspective",
          "reviewCardId": "reading-u09-l02-c1"
        },
        {
          "type": "true-false",
          "prompt": "Mei views the gym as a chance for safe new events.",
          "choices": [
            {
              "id": "true",
              "text": "True — she imagines and proposes them"
            },
            {
              "id": "false",
              "text": "False — she wants cancellation"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Her grin and proposal show optimism.",
          "id": "reading-u09-l02-q02",
          "conceptTag": "character-perspective",
          "reviewCardId": "reading-u09-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail reveals perspective most directly?",
          "choices": [
            {
              "id": "a",
              "text": "Rain hits windows"
            },
            {
              "id": "b",
              "text": "The principal speaks"
            },
            {
              "id": "c",
              "text": "Jalen thinks indoor field day will disappoint"
            },
            {
              "id": "d",
              "text": "Cones are in a gym"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "His thought states his interpretation.",
          "id": "reading-u09-l02-q03",
          "conceptTag": "character-perspective",
          "reviewCardId": "reading-u09-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response accurately restates both views?",
          "choices": [
            {
              "id": "a",
              "text": "Both hate the gym"
            },
            {
              "id": "b",
              "text": "Both only care about winning"
            },
            {
              "id": "c",
              "text": "Jalen values safety; Mei wants long jump"
            },
            {
              "id": "d",
              "text": "Jalen mourns a practiced event; Mei welcomes safety and invention"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It preserves both positions.",
          "id": "reading-u09-l02-q04",
          "conceptTag": "character-perspective",
          "reviewCardId": "reading-u09-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "How do their first reactions contrast?",
          "choices": [
            {
              "id": "a",
              "text": "Both grin"
            },
            {
              "id": "b",
              "text": "Jalen groans while Mei grins"
            },
            {
              "id": "c",
              "text": "Mei leaves while Jalen runs"
            },
            {
              "id": "d",
              "text": "Neither responds"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The actions visibly contrast.",
          "id": "reading-u09-l02-q05",
          "conceptTag": "perspective-contrast",
          "reviewCardId": "reading-u09-l02-c2"
        },
        {
          "type": "true-false",
          "prompt": "Different priorities help explain the contrasting reactions.",
          "choices": [
            {
              "id": "true",
              "text": "True — practice/loss differs from safety/opportunity"
            },
            {
              "id": "false",
              "text": "False — one must be lying"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The story supplies both reasons.",
          "id": "reading-u09-l02-q06",
          "conceptTag": "perspective-contrast",
          "reviewCardId": "reading-u09-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why does Jalen reply sharply?",
          "choices": [
            {
              "id": "a",
              "text": "He dislikes cones"
            },
            {
              "id": "b",
              "text": "He cannot hear rain"
            },
            {
              "id": "c",
              "text": "He interprets Mei’s excitement as not caring about his loss"
            },
            {
              "id": "d",
              "text": "He wants no events"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "His mistaken interpretation creates tension.",
          "id": "reading-u09-l02-q07",
          "conceptTag": "perspective-contrast",
          "reviewCardId": "reading-u09-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does Mei do to reduce the contrast?",
          "choices": [
            {
              "id": "a",
              "text": "She hides her view"
            },
            {
              "id": "b",
              "text": "She blames Jalen"
            },
            {
              "id": "c",
              "text": "She cancels the day"
            },
            {
              "id": "d",
              "text": "She explains her relief and acknowledges his disappointment"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "She clarifies and validates.",
          "id": "reading-u09-l02-q08",
          "conceptTag": "perspective-contrast",
          "reviewCardId": "reading-u09-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What mood do the initial perspectives create?",
          "choices": [
            {
              "id": "a",
              "text": "tense and disappointed"
            },
            {
              "id": "b",
              "text": "peaceful and sleepy"
            },
            {
              "id": "c",
              "text": "mysterious"
            },
            {
              "id": "d",
              "text": "silly without conflict"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Misunderstanding and loss create tension.",
          "id": "reading-u09-l02-q09",
          "conceptTag": "perspective-impact",
          "reviewCardId": "reading-u09-l02-c3"
        },
        {
          "type": "true-false",
          "prompt": "The perspectives change the plot because they lead first to conflict and then a shared design.",
          "choices": [
            {
              "id": "true",
              "text": "True — reactions drive events"
            },
            {
              "id": "false",
              "text": "False — the plot ignores them"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The causal chain is explicit.",
          "id": "reading-u09-l02-q10",
          "conceptTag": "perspective-impact",
          "reviewCardId": "reading-u09-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does the story deepen readers’ understanding?",
          "choices": [
            {
              "id": "a",
              "text": "Readers learn one view is fake"
            },
            {
              "id": "b",
              "text": "Readers see reasonable priorities behind both reactions"
            },
            {
              "id": "c",
              "text": "Readers forget the rain"
            },
            {
              "id": "d",
              "text": "Readers know the final score"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The dual views add complexity.",
          "id": "reading-u09-l02-q11",
          "conceptTag": "perspective-impact",
          "reviewCardId": "reading-u09-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which event results from the repaired understanding?",
          "choices": [
            {
              "id": "a",
              "text": "The gym closes"
            },
            {
              "id": "b",
              "text": "Jalen leaves"
            },
            {
              "id": "c",
              "text": "They design a standing jump and cone relay"
            },
            {
              "id": "d",
              "text": "The rain becomes snow"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Their combined perspectives create the solution.",
          "id": "reading-u09-l02-q12",
          "conceptTag": "perspective-impact",
          "reviewCardId": "reading-u09-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation follows Perspective → Reaction → Impact?",
          "choices": [
            {
              "id": "a",
              "text": "Mei likes gyms"
            },
            {
              "id": "b",
              "text": "Jalen is sad and it rains"
            },
            {
              "id": "c",
              "text": "They have different opinions"
            },
            {
              "id": "d",
              "text": "Jalen sees loss and responds sharply, creating tension; later mutual restatement enables cooperation"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It traces the complete chain.",
          "id": "reading-u09-l02-q13",
          "conceptTag": "perspective-impact",
          "reviewCardId": "reading-u09-l02-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
```

### `src/content/reading/u09.test.ts`

```ts
import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit09Lessons } from './u09';

const expectedManifest = [
  {
    "id": "reading-u09-l01",
    "unitId": "reading-u09",
    "title": "Compare First- and Third-Person Narration",
    "indicatorCodes": [
      "ELA.4.AOR.3.1"
    ]
  },
  {
    "id": "reading-u09-l02",
    "unitId": "reading-u09",
    "title": "Explain How Character Perspectives Shape a Story",
    "indicatorCodes": [
      "ELA.4.AOR.3.1"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u09-l01",
    "cards": [
      {
        "id": "reading-u09-l01-c1",
        "title": "Recognize First-Person Narration",
        "conceptTag": "first-person"
      },
      {
        "id": "reading-u09-l01-c2",
        "title": "Recognize Third-Person Narration",
        "conceptTag": "third-person"
      },
      {
        "id": "reading-u09-l01-c3",
        "title": "Compare What Narrators Reveal",
        "conceptTag": "pov-comparison"
      }
    ]
  },
  {
    "id": "reading-u09-l02",
    "cards": [
      {
        "id": "reading-u09-l02-c1",
        "title": "Identify Character Perspectives",
        "conceptTag": "character-perspective"
      },
      {
        "id": "reading-u09-l02-c2",
        "title": "Compare Reactions to One Event",
        "conceptTag": "perspective-contrast"
      },
      {
        "id": "reading-u09-l02-c3",
        "title": "Explain the Impact on the Text",
        "conceptTag": "perspective-impact"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u09-l01",
    "questions": [
      {
        "id": "reading-u09-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "first-person",
        "reviewCardId": "reading-u09-l01-c1"
      },
      {
        "id": "reading-u09-l01-q02",
        "type": "true-false",
        "conceptTag": "first-person",
        "reviewCardId": "reading-u09-l01-c1"
      },
      {
        "id": "reading-u09-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "first-person",
        "reviewCardId": "reading-u09-l01-c1"
      },
      {
        "id": "reading-u09-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "first-person",
        "reviewCardId": "reading-u09-l01-c1"
      },
      {
        "id": "reading-u09-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "third-person",
        "reviewCardId": "reading-u09-l01-c2"
      },
      {
        "id": "reading-u09-l01-q06",
        "type": "true-false",
        "conceptTag": "third-person",
        "reviewCardId": "reading-u09-l01-c2"
      },
      {
        "id": "reading-u09-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "third-person",
        "reviewCardId": "reading-u09-l01-c2"
      },
      {
        "id": "reading-u09-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "third-person",
        "reviewCardId": "reading-u09-l01-c2"
      },
      {
        "id": "reading-u09-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "pov-comparison",
        "reviewCardId": "reading-u09-l01-c3"
      },
      {
        "id": "reading-u09-l01-q10",
        "type": "true-false",
        "conceptTag": "pov-comparison",
        "reviewCardId": "reading-u09-l01-c3"
      },
      {
        "id": "reading-u09-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "pov-comparison",
        "reviewCardId": "reading-u09-l01-c3"
      },
      {
        "id": "reading-u09-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "pov-comparison",
        "reviewCardId": "reading-u09-l01-c3"
      },
      {
        "id": "reading-u09-l01-q13",
        "type": "fill-blank",
        "conceptTag": "pov-comparison",
        "reviewCardId": "reading-u09-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u09-l02",
    "questions": [
      {
        "id": "reading-u09-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "character-perspective",
        "reviewCardId": "reading-u09-l02-c1"
      },
      {
        "id": "reading-u09-l02-q02",
        "type": "true-false",
        "conceptTag": "character-perspective",
        "reviewCardId": "reading-u09-l02-c1"
      },
      {
        "id": "reading-u09-l02-q03",
        "type": "multiple-choice",
        "conceptTag": "character-perspective",
        "reviewCardId": "reading-u09-l02-c1"
      },
      {
        "id": "reading-u09-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "character-perspective",
        "reviewCardId": "reading-u09-l02-c1"
      },
      {
        "id": "reading-u09-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "perspective-contrast",
        "reviewCardId": "reading-u09-l02-c2"
      },
      {
        "id": "reading-u09-l02-q06",
        "type": "true-false",
        "conceptTag": "perspective-contrast",
        "reviewCardId": "reading-u09-l02-c2"
      },
      {
        "id": "reading-u09-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "perspective-contrast",
        "reviewCardId": "reading-u09-l02-c2"
      },
      {
        "id": "reading-u09-l02-q08",
        "type": "multiple-choice",
        "conceptTag": "perspective-contrast",
        "reviewCardId": "reading-u09-l02-c2"
      },
      {
        "id": "reading-u09-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "perspective-impact",
        "reviewCardId": "reading-u09-l02-c3"
      },
      {
        "id": "reading-u09-l02-q10",
        "type": "true-false",
        "conceptTag": "perspective-impact",
        "reviewCardId": "reading-u09-l02-c3"
      },
      {
        "id": "reading-u09-l02-q11",
        "type": "multiple-choice",
        "conceptTag": "perspective-impact",
        "reviewCardId": "reading-u09-l02-c3"
      },
      {
        "id": "reading-u09-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "perspective-impact",
        "reviewCardId": "reading-u09-l02-c3"
      },
      {
        "id": "reading-u09-l02-q13",
        "type": "multiple-choice",
        "conceptTag": "perspective-impact",
        "reviewCardId": "reading-u09-l02-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u09-l01",
    "checks": [
      {
        "cardId": "reading-u09-l01-c1",
        "check": {
          "prompt": "Which pronoun signals first person?",
          "choices": [
            {
              "id": "a",
              "text": "I"
            },
            {
              "id": "b",
              "text": "she"
            },
            {
              "id": "c",
              "text": "Lila"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The narrator refers to herself as I."
        }
      },
      {
        "cardId": "reading-u09-l01-c2",
        "check": {
          "prompt": "Which phrase is third person?",
          "choices": [
            {
              "id": "a",
              "text": "she noticed"
            },
            {
              "id": "b",
              "text": "I wondered"
            },
            {
              "id": "c",
              "text": "my marker"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "She refers to a character from outside."
        }
      },
      {
        "cardId": "reading-u09-l01-c3",
        "check": {
          "prompt": "How should “Lila carried Lila’s marker” begin in first person?",
          "choices": [
            {
              "id": "a",
              "text": "I carried my marker"
            },
            {
              "id": "b",
              "text": "She carried her marker"
            },
            {
              "id": "c",
              "text": "Lila carried my marker"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "I/my correctly shifts the narrator."
        }
      }
    ]
  },
  {
    "id": "reading-u09-l02",
    "checks": [
      {
        "cardId": "reading-u09-l02-c1",
        "check": {
          "prompt": "How does Jalen view the gym move?",
          "choices": [
            {
              "id": "a",
              "text": "as a disappointing loss of his practiced event"
            },
            {
              "id": "b",
              "text": "as perfect weather"
            },
            {
              "id": "c",
              "text": "as proof Mei is angry"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "His groan and thoughts directly support that view."
        }
      },
      {
        "cardId": "reading-u09-l02-c2",
        "check": {
          "prompt": "Why does Mei react positively?",
          "choices": [
            {
              "id": "a",
              "text": "She values safety and new indoor events"
            },
            {
              "id": "b",
              "text": "She wants no field day"
            },
            {
              "id": "c",
              "text": "She practiced long jump"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Her words show those priorities."
        }
      },
      {
        "cardId": "reading-u09-l02-c3",
        "check": {
          "prompt": "What resolves the perspective conflict?",
          "choices": [
            {
              "id": "a",
              "text": "They restate each other’s views and combine ideas"
            },
            {
              "id": "b",
              "text": "The rain instantly stops"
            },
            {
              "id": "c",
              "text": "The principal restores long jump"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Accurate understanding changes their actions."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u09-l01",
    "widgets": [
      {
        "cardId": "reading-u09-l01-c3",
        "ref": {
          "type": "pov-switcher",
          "config": {
            "passage": "Lila carried Lila’s marker to the trail.",
            "from": "third",
            "target": "first",
            "pronounOptions": [
              "I",
              "my",
              "she"
            ],
            "requiredPronouns": [
              "I",
              "my"
            ]
          }
        }
      }
    ]
  },
  {
    "id": "reading-u09-l02",
    "widgets": []
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u09-l01",
    "passage": {
      "title": "The Hidden Trail Marker",
      "text": "The Hidden Trail Marker — first-person version\n\nI carried my painted marker toward the school nature trail. Near the first bend, I noticed an older marker half buried under pine needles. I brushed it clean and wondered whether it belonged to the trail’s original route. I felt proud when I recognized the faded owl symbol from a map in the library. I hurried back to tell Ms. Reed, still wondering whether another marker waited farther ahead.\n\nThe Hidden Trail Marker — third-person omniscient version\n\nLila carried Lila’s painted marker toward the school nature trail. Near the first bend, she noticed an older marker half buried under pine needles. She brushed it clean and remembered the faded owl symbol from a library map. Lila felt proud and hurried back to tell Ms. Reed. Farther ahead, Carlos found a matching symbol, but Lila had not seen him yet."
    },
    "reference": {
      "title": "Read “The Hidden Trail Marker”",
      "text": "The Hidden Trail Marker — first-person version\n\nI carried my painted marker toward the school nature trail. Near the first bend, I noticed an older marker half buried under pine needles. I brushed it clean and wondered whether it belonged to the trail’s original route. I felt proud when I recognized the faded owl symbol from a map in the library. I hurried back to tell Ms. Reed, still wondering whether another marker waited farther ahead.\n\nThe Hidden Trail Marker — third-person omniscient version\n\nLila carried Lila’s painted marker toward the school nature trail. Near the first bend, she noticed an older marker half buried under pine needles. She brushed it clean and remembered the faded owl symbol from a library map. Lila felt proud and hurried back to tell Ms. Reed. Farther ahead, Carlos found a matching symbol, but Lila had not seen him yet."
    },
    "evidence": [
      "I carried my",
      "Lila carried Lila’s",
      "Carlos found"
    ]
  },
  {
    "id": "reading-u09-l02",
    "passage": {
      "title": "Rain on Field Day",
      "text": "Rain on Field Day\n\nRain drummed against the classroom windows on field-day morning. Jalen groaned when the principal moved every event into the gym. He had practiced the long jump for weeks and thought an indoor field day would feel cramped and disappointing.\n\nMei grinned. She disliked running on wet grass and imagined relay games winding safely around cones. “We can invent events that fit the space,” she said. Jalen heard her excitement as proof that she did not care about the canceled jump, and his reply sounded sharp.\n\nDuring setup, Mei noticed his silence. She explained that she was relieved about safety but understood why he missed his event. Jalen admitted that he had treated her relief as an insult. Together they designed a standing-jump challenge and a careful cone relay.\n\nTheir contrasting perspectives first create tension and a disappointed mood. Once each character accurately restates the other’s view, the conflict softens. Their combined ideas reshape the events and produce a cooperative resolution."
    },
    "reference": {
      "title": "Read “Rain on Field Day”",
      "text": "Rain on Field Day\n\nRain drummed against the classroom windows on field-day morning. Jalen groaned when the principal moved every event into the gym. He had practiced the long jump for weeks and thought an indoor field day would feel cramped and disappointing.\n\nMei grinned. She disliked running on wet grass and imagined relay games winding safely around cones. “We can invent events that fit the space,” she said. Jalen heard her excitement as proof that she did not care about the canceled jump, and his reply sounded sharp.\n\nDuring setup, Mei noticed his silence. She explained that she was relieved about safety but understood why he missed his event. Jalen admitted that he had treated her relief as an insult. Together they designed a standing-jump challenge and a careful cone relay.\n\nTheir contrasting perspectives first create tension and a disappointed mood. Once each character accurately restates the other’s view, the conflict softens. Their combined ideas reshape the events and produce a cooperative resolution."
    },
    "evidence": [
      "Jalen groaned",
      "Mei grinned",
      "accurately restates"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 9 literal content', () => {
  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit09Lessons, expectedManifest, 'reading');
    expect(unit09Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit09Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit09Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit09Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit09Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit09Lessons) {
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

  test('shows Mei’s reason before its inline check', () => {
    const perspectiveLesson = unit09Lessons.find(({ id }) => id === 'reading-u09-l02')!;
    const contrastCard = perspectiveLesson.learnCards.find(({ id }) => id === 'reading-u09-l02-c2')!;
    expect(contrastCard.blocks[1]).toEqual({
      kind: 'example',
      text: 'Jalen groans; Mei grins because Mei values safety and new indoor events.',
    });
  });

  test('uses a grammatical q11 prompt', () => {
    const perspectiveLesson = unit09Lessons.find(({ id }) => id === 'reading-u09-l02')!;
    expect(perspectiveLesson.quiz.pool.find(({ id }) => id === 'reading-u09-l02-q11')!.prompt)
      .toBe('How does the story deepen readers’ understanding?');
  });

  test('keeps exact pools, unique visible answers, balanced MC keys, and solo framing', () => {
    for (const lesson of unit09Lessons) {
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

### `src/content/reading/u10.ts`

```ts
import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit10Lessons = [
  {
    "id": "reading-u10-l01",
    "unitId": "reading-u10",
    "title": "Compare Narratives, Dramas, and Poems",
    "indicatorCodes": [
      "ELA.4.AOR.5.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Genres can share content while organizing it differently."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Structure shapes how readers receive action, speech, pacing, and imagery."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s compare exact elements across three parallel forms."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u10-l01-c1",
        "title": "Notice Narrative Structure",
        "blocks": [
          {
            "kind": "text",
            "text": "Narratives use sentences and paragraphs, a narrator, description, dialogue, and sequenced events."
          },
          {
            "kind": "example",
            "text": "The narrator tells Nora’s actions and explains why Mr. Lee smiles."
          },
          {
            "kind": "tip",
            "text": "Paragraph breaks group the discovery and return."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which element belongs especially to the narrative form here?",
          "choices": [
            {
              "id": "a",
              "text": "a narrator explaining actions"
            },
            {
              "id": "b",
              "text": "speaker labels"
            },
            {
              "id": "c",
              "text": "three stanzas"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The prose narrator reports and connects events."
        }
      },
      {
        "id": "reading-u10-l01-c2",
        "title": "Read Drama Structure",
        "blocks": [
          {
            "kind": "text",
            "text": "Drama uses speaker labels, dialogue, stage directions, acts/scenes, and performance-ready action."
          },
          {
            "kind": "example",
            "text": "Bracketed directions show the stage, lantern, handoff, and exit."
          },
          {
            "kind": "tip",
            "text": "Readers infer tone from dialogue and directions."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "What do brackets contribute?",
          "choices": [
            {
              "id": "a",
              "text": "stage directions for visible action"
            },
            {
              "id": "b",
              "text": "a narrator’s paragraph"
            },
            {
              "id": "c",
              "text": "rhyme"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The bracketed text directs setting and movement."
        }
      },
      {
        "id": "reading-u10-l01-c3",
        "title": "Read Poetry Structure",
        "blocks": [
          {
            "kind": "text",
            "text": "Poems use lines and stanzas; rhythm, repetition, and imagery compress experience."
          },
          {
            "kind": "example",
            "text": "“last small moon” creates a visual comparison for the lantern."
          },
          {
            "kind": "tip",
            "text": "Explain how line/stanza choices affect emphasis or pace."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "What does “last small moon” add?",
          "choices": [
            {
              "id": "a",
              "text": "a compact image of the lantern in darkness"
            },
            {
              "id": "b",
              "text": "a literal moon fact"
            },
            {
              "id": "c",
              "text": "a speaker label"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The metaphor creates imagery."
        }
      }
    ],
    "workedExample": {
      "title": "Compare one event across narrative, drama, and poem",
      "passage": {
        "title": "The Last Lantern",
        "text": "The Last Lantern — narrative\n\nNora checked the tables after the evening festival. Every paper lantern had been collected except one glowing beside the empty stage. She carried it toward the gate, where Mr. Lee was searching the dark path.\n\n“This must be yours,” Nora said. Mr. Lee smiled because the lantern marked the path to his family’s booth. Nora handed it back, and together they watched its warm circle move through the dark.\n\nThe Last Lantern — one-scene drama\n\n[An empty festival stage at night. One lantern glows.]\nNORA: One lantern is still here.\nMR. LEE: I have been searching for it. It marks the path to our booth.\n[Nora lifts the lantern and hands it to him.]\nNORA: Then it can guide you back.\nMR. LEE: Thank you.\n[They exit as the lantern’s light moves along the path.]\n\nThe Last Lantern — free-verse poem\n\nOne lantern waits\nbeside the quiet stage,\na warm circle in the dark.\n\nNora lifts the glow.\nA searching face softens;\nthe lost light finds its hand.\n\nDown the festival path\ntwo figures follow\nthe last small moon."
      },
      "steps": [
        "Hold the shared event constant: Nora returns a lantern.",
        "Name how each form presents action and speech.",
        "Explain how prose develops sequence, drama makes action performable, and poetry compresses the image."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “The Last Lantern”",
        "text": "The Last Lantern — narrative\n\nNora checked the tables after the evening festival. Every paper lantern had been collected except one glowing beside the empty stage. She carried it toward the gate, where Mr. Lee was searching the dark path.\n\n“This must be yours,” Nora said. Mr. Lee smiled because the lantern marked the path to his family’s booth. Nora handed it back, and together they watched its warm circle move through the dark.\n\nThe Last Lantern — one-scene drama\n\n[An empty festival stage at night. One lantern glows.]\nNORA: One lantern is still here.\nMR. LEE: I have been searching for it. It marks the path to our booth.\n[Nora lifts the lantern and hands it to him.]\nNORA: Then it can guide you back.\nMR. LEE: Thank you.\n[They exit as the lantern’s light moves along the path.]\n\nThe Last Lantern — free-verse poem\n\nOne lantern waits\nbeside the quiet stage,\na warm circle in the dark.\n\nNora lifts the glow.\nA searching face softens;\nthe lost light finds its hand.\n\nDown the festival path\ntwo figures follow\nthe last small moon."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which feature organizes the narrative?",
          "choices": [
            {
              "id": "a",
              "text": "paragraphs and a narrator"
            },
            {
              "id": "b",
              "text": "speaker labels only"
            },
            {
              "id": "c",
              "text": "stanzas only"
            },
            {
              "id": "d",
              "text": "a data table"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Narrative prose uses paragraphs and narration.",
          "id": "reading-u10-l01-q01",
          "conceptTag": "narrative-structure",
          "reviewCardId": "reading-u10-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "The narrative includes both narration and dialogue.",
          "choices": [
            {
              "id": "true",
              "text": "True — the narrator reports and Nora speaks"
            },
            {
              "id": "false",
              "text": "False — only stage directions appear"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Both forms are visible.",
          "id": "reading-u10-l01-q02",
          "conceptTag": "narrative-structure",
          "reviewCardId": "reading-u10-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the narrator add?",
          "choices": [
            {
              "id": "a",
              "text": "a rhyme scheme"
            },
            {
              "id": "b",
              "text": "a cast list"
            },
            {
              "id": "c",
              "text": "connections among actions and Mr. Lee’s response"
            },
            {
              "id": "d",
              "text": "lighting instructions only"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The narrator explains sequence and reason.",
          "id": "reading-u10-l01-q03",
          "conceptTag": "narrative-structure",
          "reviewCardId": "reading-u10-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "How are events grouped?",
          "choices": [
            {
              "id": "a",
              "text": "by table rows"
            },
            {
              "id": "b",
              "text": "by acts only"
            },
            {
              "id": "c",
              "text": "by repeated chorus"
            },
            {
              "id": "d",
              "text": "into paragraphs moving from discovery to return"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The paragraph structure organizes the plot.",
          "id": "reading-u10-l01-q04",
          "conceptTag": "narrative-structure",
          "reviewCardId": "reading-u10-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which feature identifies who speaks in the drama?",
          "choices": [
            {
              "id": "a",
              "text": "quotation marks alone"
            },
            {
              "id": "b",
              "text": "speaker labels NORA and MR. LEE"
            },
            {
              "id": "c",
              "text": "stanza breaks"
            },
            {
              "id": "d",
              "text": "narrator comments"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Labels assign lines.",
          "id": "reading-u10-l01-q05",
          "conceptTag": "drama-structure",
          "reviewCardId": "reading-u10-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "Bracketed text gives stage directions.",
          "choices": [
            {
              "id": "true",
              "text": "True — it guides setting and action"
            },
            {
              "id": "false",
              "text": "False — it is spoken dialogue"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The bracketed lines are performance cues.",
          "id": "reading-u10-l01-q06",
          "conceptTag": "drama-structure",
          "reviewCardId": "reading-u10-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What can actors perform directly?",
          "choices": [
            {
              "id": "a",
              "text": "a narrator’s hidden explanation only"
            },
            {
              "id": "b",
              "text": "a glossary"
            },
            {
              "id": "c",
              "text": "dialogue and stage directions"
            },
            {
              "id": "d",
              "text": "a rainfall table"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Drama presents words and actions.",
          "id": "reading-u10-l01-q07",
          "conceptTag": "drama-structure",
          "reviewCardId": "reading-u10-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does the one-scene structure affect pacing?",
          "choices": [
            {
              "id": "a",
              "text": "It adds years of backstory"
            },
            {
              "id": "b",
              "text": "It separates three narrators"
            },
            {
              "id": "c",
              "text": "It repeats every event"
            },
            {
              "id": "d",
              "text": "It presents the discovery and handoff as one continuous moment"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "One scene keeps the action immediate.",
          "id": "reading-u10-l01-q08",
          "conceptTag": "drama-structure",
          "reviewCardId": "reading-u10-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which structure organizes the poem?",
          "choices": [
            {
              "id": "a",
              "text": "lines grouped into three stanzas"
            },
            {
              "id": "b",
              "text": "paragraphs and chapters"
            },
            {
              "id": "c",
              "text": "speaker labels"
            },
            {
              "id": "d",
              "text": "numbered steps"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The poem visibly has lines/stanzas.",
          "id": "reading-u10-l01-q09",
          "conceptTag": "poetry-structure",
          "reviewCardId": "reading-u10-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "The poem uses imagery to compress the lantern event.",
          "choices": [
            {
              "id": "true",
              "text": "True — glow, circle, and moon create images"
            },
            {
              "id": "false",
              "text": "False — it only states facts"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Imagery carries meaning concisely.",
          "id": "reading-u10-l01-q10",
          "conceptTag": "poetry-structure",
          "reviewCardId": "reading-u10-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "What receives emphasis from its own line?",
          "choices": [
            {
              "id": "a",
              "text": "the title only"
            },
            {
              "id": "b",
              "text": "“Nora lifts the glow”"
            },
            {
              "id": "c",
              "text": "a stage label"
            },
            {
              "id": "d",
              "text": "Mr. Lee’s explanation paragraph"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Line placement highlights the action.",
          "id": "reading-u10-l01-q11",
          "conceptTag": "poetry-structure",
          "reviewCardId": "reading-u10-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How do stanza breaks organize meaning?",
          "choices": [
            {
              "id": "a",
              "text": "They assign actors"
            },
            {
              "id": "b",
              "text": "They define words"
            },
            {
              "id": "c",
              "text": "They separate waiting, return, and departure"
            },
            {
              "id": "d",
              "text": "They number paragraphs"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The three moments align to stanzas.",
          "id": "reading-u10-l01-q12",
          "conceptTag": "poetry-structure",
          "reviewCardId": "reading-u10-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which comparison is accurate?",
          "choices": [
            {
              "id": "a",
              "text": "All forms use identical structure"
            },
            {
              "id": "b",
              "text": "Only drama has events"
            },
            {
              "id": "c",
              "text": "Poetry cannot show action"
            },
            {
              "id": "d",
              "text": "Narrative explains through prose, drama stages dialogue/action, and poetry emphasizes images through lines/stanzas"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It compares structural elements.",
          "id": "reading-u10-l01-q13",
          "conceptTag": "poetry-structure",
          "reviewCardId": "reading-u10-l01-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u10-l02",
    "unitId": "reading-u10",
    "title": "Interpret Literal and Nonliteral Language",
    "indicatorCodes": [
      "ELA.4.AOR.8.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Some language states exactly; some creates meaning through comparison or expression."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Word relationships also sharpen meaning."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s paraphrase each phrase precisely."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u10-l02-c1",
        "title": "Distinguish Literal and Nonliteral Meaning",
        "blocks": [
          {
            "kind": "text",
            "text": "Literal words mean what they state; nonliteral phrases need interpretation."
          },
          {
            "kind": "example",
            "text": "Three wooden steps are literal; “piece of cake” means easy."
          },
          {
            "kind": "tip",
            "text": "Check whether the literal reading makes sense in context."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which phrase is literal?",
          "choices": [
            {
              "id": "a",
              "text": "three wooden steps"
            },
            {
              "id": "b",
              "text": "piece of cake"
            },
            {
              "id": "c",
              "text": "market was a beehive"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The passage describes actual boards."
        }
      },
      {
        "id": "reading-u10-l02-c2",
        "title": "Explain Similes, Metaphors, and Idioms",
        "blocks": [
          {
            "kind": "text",
            "text": "Simile uses like/as; metaphor directly compares; idiom has a conventional meaning."
          },
          {
            "kind": "example",
            "text": "busy as bees = very busy; market was a beehive = crowded/active; piece of cake = easy."
          },
          {
            "kind": "tip",
            "text": "Always give the meaning, not just the device."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "widget": {
          "type": "figurative-language-matcher",
          "config": {
            "pairs": [
              {
                "id": "simile",
                "phrase": "busy as a bee",
                "kind": "simile",
                "meaning": "very busy"
              },
              {
                "id": "metaphor",
                "phrase": "the market was a beehive",
                "kind": "metaphor",
                "meaning": "the market was crowded and active"
              },
              {
                "id": "idiom",
                "phrase": "the setup was a piece of cake",
                "kind": "idiom",
                "meaning": "the setup was easy"
              }
            ]
          }
        },
        "check": {
          "prompt": "What does “market was a beehive” mean?",
          "choices": [
            {
              "id": "a",
              "text": "the market was crowded and active"
            },
            {
              "id": "b",
              "text": "bees replaced vendors"
            },
            {
              "id": "c",
              "text": "the market sold only honey"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The source directly paraphrases the metaphor."
        }
      },
      {
        "id": "reading-u10-l02-c3",
        "title": "Use Word Relationships to Clarify Meaning",
        "blocks": [
          {
            "kind": "text",
            "text": "Synonyms are alike, antonyms are opposite, and contrast clues set meanings against each other."
          },
          {
            "kind": "example",
            "text": "Ripe/fully ready are synonyms; ripe/unripe are antonyms; quiet/noisy contrast."
          },
          {
            "kind": "tip",
            "text": "Name the relationship and use it to clarify the target."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "What is an antonym of ripe?",
          "choices": [
            {
              "id": "a",
              "text": "unripe"
            },
            {
              "id": "b",
              "text": "ready"
            },
            {
              "id": "c",
              "text": "peach"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The source identifies the opposite."
        }
      }
    ],
    "workedExample": {
      "title": "Interpret figures and word relationships in context",
      "passage": {
        "title": "Market Morning",
        "text": "Market Morning\n\nBefore customers arrived, Lena climbed the three wooden steps to the produce stand. The steps were literal boards. Setting out baskets was a piece of cake because her checklist was clear. Soon vendors became busy as bees, moving quickly from crate to table.\n\nBy nine o’clock, the market was a beehive. No giant hive replaced the square; the metaphor means the market was crowded and active. Lena’s aunt called the peaches ripe, or fully ready to eat. Unripe is the antonym of ripe. Nearby, a quiet corner contrasted with the noisy main aisle.\n\nLiteral language means exactly what the words ordinarily state. Nonliteral language asks readers to interpret a comparison or familiar expression. A simile compares using like or as; a metaphor says one thing is another; an idiom has a meaning not found by combining each word literally. Synonyms have similar meanings, antonyms have opposite meanings, and contrasts can clarify both."
      },
      "steps": [
        "Decide whether the phrase is literal.",
        "If nonliteral, name the kind and paraphrase it.",
        "Use nearby synonym/antonym/contrast relationships to confirm meaning."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Market Morning”",
        "text": "Market Morning\n\nBefore customers arrived, Lena climbed the three wooden steps to the produce stand. The steps were literal boards. Setting out baskets was a piece of cake because her checklist was clear. Soon vendors became busy as bees, moving quickly from crate to table.\n\nBy nine o’clock, the market was a beehive. No giant hive replaced the square; the metaphor means the market was crowded and active. Lena’s aunt called the peaches ripe, or fully ready to eat. Unripe is the antonym of ripe. Nearby, a quiet corner contrasted with the noisy main aisle.\n\nLiteral language means exactly what the words ordinarily state. Nonliteral language asks readers to interpret a comparison or familiar expression. A simile compares using like or as; a metaphor says one thing is another; an idiom has a meaning not found by combining each word literally. Synonyms have similar meanings, antonyms have opposite meanings, and contrasts can clarify both."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which phrase is literal?",
          "choices": [
            {
              "id": "a",
              "text": "climbed three wooden steps"
            },
            {
              "id": "b",
              "text": "setup was a piece of cake"
            },
            {
              "id": "c",
              "text": "busy as bees"
            },
            {
              "id": "d",
              "text": "market was a beehive"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Actual boards are described.",
          "id": "reading-u10-l02-q01",
          "conceptTag": "literal-nonliteral",
          "reviewCardId": "reading-u10-l02-c1"
        },
        {
          "type": "true-false",
          "prompt": "“Piece of cake” means the setup was easy, not that food was the setup.",
          "choices": [
            {
              "id": "true",
              "text": "True — it is an idiom"
            },
            {
              "id": "false",
              "text": "False — it names dessert literally"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The context and source define it.",
          "id": "reading-u10-l02-q02",
          "conceptTag": "literal-nonliteral",
          "reviewCardId": "reading-u10-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "How can a reader test literal meaning?",
          "choices": [
            {
              "id": "a",
              "text": "Count letters"
            },
            {
              "id": "b",
              "text": "Look only for as"
            },
            {
              "id": "c",
              "text": "Ask whether the ordinary meaning fits the context"
            },
            {
              "id": "d",
              "text": "Assume every phrase is figurative"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Context distinguishes use.",
          "id": "reading-u10-l02-q03",
          "conceptTag": "literal-nonliteral",
          "reviewCardId": "reading-u10-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which statement is accurate?",
          "choices": [
            {
              "id": "a",
              "text": "All comparisons are literal"
            },
            {
              "id": "b",
              "text": "All nouns are metaphors"
            },
            {
              "id": "c",
              "text": "Idioms always use like"
            },
            {
              "id": "d",
              "text": "The same word can be literal in one context and nonliteral in another"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Context controls meaning.",
          "id": "reading-u10-l02-q04",
          "conceptTag": "literal-nonliteral",
          "reviewCardId": "reading-u10-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What kind is “busy as bees”?",
          "choices": [
            {
              "id": "a",
              "text": "metaphor"
            },
            {
              "id": "b",
              "text": "simile"
            },
            {
              "id": "c",
              "text": "idiom"
            },
            {
              "id": "d",
              "text": "literal fact"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "As signals a simile.",
          "id": "reading-u10-l02-q05",
          "conceptTag": "figurative-meaning",
          "reviewCardId": "reading-u10-l02-c2"
        },
        {
          "type": "true-false",
          "prompt": "“The market was a beehive” is a metaphor.",
          "choices": [
            {
              "id": "true",
              "text": "True — it directly compares the market to a hive"
            },
            {
              "id": "false",
              "text": "False — it uses like"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The direct comparison is metaphor.",
          "id": "reading-u10-l02-q06",
          "conceptTag": "figurative-meaning",
          "reviewCardId": "reading-u10-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the metaphor mean?",
          "choices": [
            {
              "id": "a",
              "text": "The square became wax"
            },
            {
              "id": "b",
              "text": "Only bees shopped"
            },
            {
              "id": "c",
              "text": "The market was crowded and active"
            },
            {
              "id": "d",
              "text": "The market was silent"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The text gives that meaning.",
          "id": "reading-u10-l02-q07",
          "conceptTag": "figurative-meaning",
          "reviewCardId": "reading-u10-l02-c2"
        },
        {
          "type": "fill-blank",
          "prompt": "The idiom “a piece of cake” means ___.",
          "acceptedAnswers": [
            "easy",
            "simple"
          ],
          "explanation": "The passage states the setup was easy.",
          "id": "reading-u10-l02-q08",
          "conceptTag": "figurative-meaning",
          "reviewCardId": "reading-u10-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which pair are synonyms in the source?",
          "choices": [
            {
              "id": "a",
              "text": "ripe and fully ready"
            },
            {
              "id": "b",
              "text": "ripe and unripe"
            },
            {
              "id": "c",
              "text": "quiet and noisy"
            },
            {
              "id": "d",
              "text": "market and bee"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "They share meaning.",
          "id": "reading-u10-l02-q09",
          "conceptTag": "word-relationships",
          "reviewCardId": "reading-u10-l02-c3"
        },
        {
          "type": "true-false",
          "prompt": "Ripe and unripe are antonyms.",
          "choices": [
            {
              "id": "true",
              "text": "True — they are opposites"
            },
            {
              "id": "false",
              "text": "False — they mean the same"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The prefix un- creates the opposite.",
          "id": "reading-u10-l02-q10",
          "conceptTag": "word-relationships",
          "reviewCardId": "reading-u10-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does quiet clarify noisy?",
          "choices": [
            {
              "id": "a",
              "text": "They rhyme"
            },
            {
              "id": "b",
              "text": "Their contrast highlights opposite sound levels"
            },
            {
              "id": "c",
              "text": "They are both fruit terms"
            },
            {
              "id": "d",
              "text": "They are identical"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Contrast supplies an opposite.",
          "id": "reading-u10-l02-q11",
          "conceptTag": "word-relationships",
          "reviewCardId": "reading-u10-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response fully explains a phrase?",
          "choices": [
            {
              "id": "a",
              "text": "Simile"
            },
            {
              "id": "b",
              "text": "It has as"
            },
            {
              "id": "c",
              "text": "Bees are insects"
            },
            {
              "id": "d",
              "text": "“Busy as bees” is a simile meaning very busy"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It names and interprets.",
          "id": "reading-u10-l02-q12",
          "conceptTag": "word-relationships",
          "reviewCardId": "reading-u10-l02-c3"
        },
        {
          "type": "fill-blank",
          "prompt": "A word with the opposite meaning is an ___.",
          "acceptedAnswers": [
            "antonym"
          ],
          "explanation": "Antonym names an opposite word relationship.",
          "id": "reading-u10-l02-q13",
          "conceptTag": "word-relationships",
          "reviewCardId": "reading-u10-l02-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u10-l03",
    "unitId": "reading-u10",
    "title": "Explain Figurative Language's Effect",
    "indicatorCodes": [
      "ELA.4.AOR.1.2"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Figurative choices change meaning and shape a reader’s experience."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Device labels are only a first step."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s literalize, interpret, and explain effect."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u10-l03-c1",
        "title": "Spot the Figurative Choice",
        "blocks": [
          {
            "kind": "text",
            "text": "Spot language that cannot be literally true in context."
          },
          {
            "kind": "example",
            "text": "Fog does not fold a blanket; the horn is not a giant."
          },
          {
            "kind": "tip",
            "text": "Quote the exact phrase before analyzing."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which phrase is figurative?",
          "choices": [
            {
              "id": "a",
              "text": "fog folded a gray blanket"
            },
            {
              "id": "b",
              "text": "water tapped against pilings"
            },
            {
              "id": "c",
              "text": "Mara held the rail"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Fog cannot literally fold cloth."
        }
      },
      {
        "id": "reading-u10-l03-c2",
        "title": "Interpret Its Effect on Meaning",
        "blocks": [
          {
            "kind": "text",
            "text": "Paraphrase the figure in literal language, then notice what the original adds."
          },
          {
            "kind": "example",
            "text": "Gray blanket means thick fog covers and limits the view; blanket suggests enclosure."
          },
          {
            "kind": "tip",
            "text": "Avoid stopping at “metaphor.”"
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "What does the gray blanket mean?",
          "choices": [
            {
              "id": "a",
              "text": "thick fog covers the river and limits sight"
            },
            {
              "id": "b",
              "text": "a blanket fell in water"
            },
            {
              "id": "c",
              "text": "the river is warm"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That literal meaning fits the scene."
        }
      },
      {
        "id": "reading-u10-l03-c3",
        "title": "Explain the Reader's Experience",
        "blocks": [
          {
            "kind": "text",
            "text": "Effect may shape mood, imagery, emphasis, pacing, or connection."
          },
          {
            "kind": "example",
            "text": "Giant’s warning makes the horn feel huge and urgent, increasing caution."
          },
          {
            "kind": "tip",
            "text": "Use Phrase → Literal meaning → Reader effect."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "What effect does “giant’s warning” create?",
          "choices": [
            {
              "id": "a",
              "text": "It makes the horn feel enormous and serious"
            },
            {
              "id": "b",
              "text": "It proves a giant is present"
            },
            {
              "id": "c",
              "text": "It makes the scene comic"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The exaggerated image intensifies warning."
        }
      }
    ],
    "workedExample": {
      "title": "Explain figurative meaning and reader effect",
      "passage": {
        "title": "Fog at the Ferry",
        "text": "Fog at the Ferry\n\nAt dawn, the fog folded a gray blanket over the river. Mara could see the ferry dock beneath her shoes, but the opposite bank had vanished. Moist air cooled her cheeks while water tapped softly against the pilings.\n\nThen the ferry horn sounded. The horn was a giant’s warning rolling through the mist. Mara knew no giant stood in the river; the metaphor made the sound feel enormous and serious. She tightened her hand around the rail and listened for the dock worker’s directions.\n\nA small amber light appeared, blurred by the fog. It bobbed closer until the ferry’s square windows came into view. The gray blanket slowly thinned, revealing a silver path of water.\n\nThe figures do more than decorate the scene. The blanket metaphor makes fog feel enclosing and soft-edged. The giant’s-warning metaphor magnifies the horn and builds caution. Together with restrained sound and touch details, they place readers inside Mara’s limited, uncertain view before relief arrives."
      },
      "steps": [
        "Quote “fog folded a gray blanket.”",
        "Paraphrase: thick fog covers the river and blocks distance.",
        "Explain: the enclosing image creates uncertainty before the ferry appears."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Fog at the Ferry”",
        "text": "Fog at the Ferry\n\nAt dawn, the fog folded a gray blanket over the river. Mara could see the ferry dock beneath her shoes, but the opposite bank had vanished. Moist air cooled her cheeks while water tapped softly against the pilings.\n\nThen the ferry horn sounded. The horn was a giant’s warning rolling through the mist. Mara knew no giant stood in the river; the metaphor made the sound feel enormous and serious. She tightened her hand around the rail and listened for the dock worker’s directions.\n\nA small amber light appeared, blurred by the fog. It bobbed closer until the ferry’s square windows came into view. The gray blanket slowly thinned, revealing a silver path of water.\n\nThe figures do more than decorate the scene. The blanket metaphor makes fog feel enclosing and soft-edged. The giant’s-warning metaphor magnifies the horn and builds caution. Together with restrained sound and touch details, they place readers inside Mara’s limited, uncertain view before relief arrives."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which phrase is clearly figurative?",
          "choices": [
            {
              "id": "a",
              "text": "the fog folded a gray blanket"
            },
            {
              "id": "b",
              "text": "water tapped against pilings"
            },
            {
              "id": "c",
              "text": "Mara held the rail"
            },
            {
              "id": "d",
              "text": "the light appeared"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Fog cannot literally fold a blanket.",
          "id": "reading-u10-l03-q01",
          "conceptTag": "figurative-choice",
          "reviewCardId": "reading-u10-l03-c1"
        },
        {
          "type": "true-false",
          "prompt": "The horn is not literally a giant in the story.",
          "choices": [
            {
              "id": "true",
              "text": "True — the phrase is a metaphor"
            },
            {
              "id": "false",
              "text": "False — a giant drives the ferry"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The source explicitly rejects the literal reading.",
          "id": "reading-u10-l03-q02",
          "conceptTag": "figurative-choice",
          "reviewCardId": "reading-u10-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why is “silver path of water” figurative imagery?",
          "choices": [
            {
              "id": "a",
              "text": "The river is solid metal"
            },
            {
              "id": "b",
              "text": "Mara walks on water"
            },
            {
              "id": "c",
              "text": "Light makes the water look like a shining path"
            },
            {
              "id": "d",
              "text": "A road was built"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The image transforms reflected water.",
          "id": "reading-u10-l03-q03",
          "conceptTag": "figurative-choice",
          "reviewCardId": "reading-u10-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What should analysis quote first?",
          "choices": [
            {
              "id": "a",
              "text": "a device definition only"
            },
            {
              "id": "b",
              "text": "the lesson title"
            },
            {
              "id": "c",
              "text": "a reader opinion"
            },
            {
              "id": "d",
              "text": "the exact figurative phrase"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Exact language anchors the explanation.",
          "id": "reading-u10-l03-q04",
          "conceptTag": "figurative-choice",
          "reviewCardId": "reading-u10-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What is the literal meaning of the blanket image?",
          "choices": [
            {
              "id": "a",
              "text": "Someone drops cloth"
            },
            {
              "id": "b",
              "text": "Thick fog covers the river and limits view"
            },
            {
              "id": "c",
              "text": "The river goes to sleep"
            },
            {
              "id": "d",
              "text": "Fog becomes gray wool"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "It accurately paraphrases.",
          "id": "reading-u10-l03-q05",
          "conceptTag": "figurative-effect",
          "reviewCardId": "reading-u10-l03-c2"
        },
        {
          "type": "true-false",
          "prompt": "The blanket image suggests both coverage and enclosure.",
          "choices": [
            {
              "id": "true",
              "text": "True — those associations deepen meaning"
            },
            {
              "id": "false",
              "text": "False — it only names color"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The comparison adds more than thickness.",
          "id": "reading-u10-l03-q06",
          "conceptTag": "figurative-effect",
          "reviewCardId": "reading-u10-l03-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does giant’s warning change the horn’s meaning?",
          "choices": [
            {
              "id": "a",
              "text": "It makes it quiet"
            },
            {
              "id": "b",
              "text": "It makes it musical"
            },
            {
              "id": "c",
              "text": "It emphasizes enormous, serious warning"
            },
            {
              "id": "d",
              "text": "It removes danger"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The metaphor magnifies urgency.",
          "id": "reading-u10-l03-q07",
          "conceptTag": "figurative-effect",
          "reviewCardId": "reading-u10-l03-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which analysis goes beyond naming?",
          "choices": [
            {
              "id": "a",
              "text": "It is metaphor"
            },
            {
              "id": "b",
              "text": "It has a noun"
            },
            {
              "id": "c",
              "text": "It sounds interesting"
            },
            {
              "id": "d",
              "text": "The horn is compared to a giant’s warning, making its caution feel huge and urgent"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It provides meaning and effect.",
          "id": "reading-u10-l03-q08",
          "conceptTag": "figurative-effect",
          "reviewCardId": "reading-u10-l03-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What mood does the blanket image help create?",
          "choices": [
            {
              "id": "a",
              "text": "enclosed uncertainty"
            },
            {
              "id": "b",
              "text": "sunny celebration"
            },
            {
              "id": "c",
              "text": "comic confusion"
            },
            {
              "id": "d",
              "text": "ordinary boredom"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Limited vision and coverage create uncertainty.",
          "id": "reading-u10-l03-q09",
          "conceptTag": "reader-experience",
          "reviewCardId": "reading-u10-l03-c3"
        },
        {
          "type": "true-false",
          "prompt": "The sensory details and figures place readers near Mara’s limited view.",
          "choices": [
            {
              "id": "true",
              "text": "True — sight, sound, and touch narrow experience"
            },
            {
              "id": "false",
              "text": "False — they reveal every location"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The perspective is immersive and limited.",
          "id": "reading-u10-l03-q10",
          "conceptTag": "reader-experience",
          "reviewCardId": "reading-u10-l03-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does the amber light change the reader’s experience?",
          "choices": [
            {
              "id": "a",
              "text": "It makes fog thicker"
            },
            {
              "id": "b",
              "text": "Its approach brings growing clarity and relief"
            },
            {
              "id": "c",
              "text": "It introduces a villain"
            },
            {
              "id": "d",
              "text": "It proves the horn was false"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Visibility grows as ferry arrives.",
          "id": "reading-u10-l03-q11",
          "conceptTag": "reader-experience",
          "reviewCardId": "reading-u10-l03-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "What is the combined effect of both main metaphors?",
          "choices": [
            {
              "id": "a",
              "text": "They explain ferry mechanics"
            },
            {
              "id": "b",
              "text": "They create humor"
            },
            {
              "id": "c",
              "text": "They make fog enclosing and the horn urgent, building caution"
            },
            {
              "id": "d",
              "text": "They remove sensory detail"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Their effects reinforce uncertainty/caution.",
          "id": "reading-u10-l03-q12",
          "conceptTag": "reader-experience",
          "reviewCardId": "reading-u10-l03-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response uses the full format?",
          "choices": [
            {
              "id": "a",
              "text": "Gray blanket is metaphor"
            },
            {
              "id": "b",
              "text": "Fog is gray"
            },
            {
              "id": "c",
              "text": "Readers see a ferry"
            },
            {
              "id": "d",
              "text": "“Gray blanket” means covering fog and makes readers feel enclosed by Mara’s uncertain view"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It joins phrase, meaning, and effect.",
          "id": "reading-u10-l03-q13",
          "conceptTag": "reader-experience",
          "reviewCardId": "reading-u10-l03-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
```

### `src/content/reading/u10.test.ts`

```ts
import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit10Lessons } from './u10';

const expectedManifest = [
  {
    "id": "reading-u10-l01",
    "unitId": "reading-u10",
    "title": "Compare Narratives, Dramas, and Poems",
    "indicatorCodes": [
      "ELA.4.AOR.5.1"
    ]
  },
  {
    "id": "reading-u10-l02",
    "unitId": "reading-u10",
    "title": "Interpret Literal and Nonliteral Language",
    "indicatorCodes": [
      "ELA.4.AOR.8.1"
    ]
  },
  {
    "id": "reading-u10-l03",
    "unitId": "reading-u10",
    "title": "Explain Figurative Language's Effect",
    "indicatorCodes": [
      "ELA.4.AOR.1.2"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u10-l01",
    "cards": [
      {
        "id": "reading-u10-l01-c1",
        "title": "Notice Narrative Structure",
        "conceptTag": "narrative-structure"
      },
      {
        "id": "reading-u10-l01-c2",
        "title": "Read Drama Structure",
        "conceptTag": "drama-structure"
      },
      {
        "id": "reading-u10-l01-c3",
        "title": "Read Poetry Structure",
        "conceptTag": "poetry-structure"
      }
    ]
  },
  {
    "id": "reading-u10-l02",
    "cards": [
      {
        "id": "reading-u10-l02-c1",
        "title": "Distinguish Literal and Nonliteral Meaning",
        "conceptTag": "literal-nonliteral"
      },
      {
        "id": "reading-u10-l02-c2",
        "title": "Explain Similes, Metaphors, and Idioms",
        "conceptTag": "figurative-meaning"
      },
      {
        "id": "reading-u10-l02-c3",
        "title": "Use Word Relationships to Clarify Meaning",
        "conceptTag": "word-relationships"
      }
    ]
  },
  {
    "id": "reading-u10-l03",
    "cards": [
      {
        "id": "reading-u10-l03-c1",
        "title": "Spot the Figurative Choice",
        "conceptTag": "figurative-choice"
      },
      {
        "id": "reading-u10-l03-c2",
        "title": "Interpret Its Effect on Meaning",
        "conceptTag": "figurative-effect"
      },
      {
        "id": "reading-u10-l03-c3",
        "title": "Explain the Reader's Experience",
        "conceptTag": "reader-experience"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u10-l01",
    "questions": [
      {
        "id": "reading-u10-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "narrative-structure",
        "reviewCardId": "reading-u10-l01-c1"
      },
      {
        "id": "reading-u10-l01-q02",
        "type": "true-false",
        "conceptTag": "narrative-structure",
        "reviewCardId": "reading-u10-l01-c1"
      },
      {
        "id": "reading-u10-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "narrative-structure",
        "reviewCardId": "reading-u10-l01-c1"
      },
      {
        "id": "reading-u10-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "narrative-structure",
        "reviewCardId": "reading-u10-l01-c1"
      },
      {
        "id": "reading-u10-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "drama-structure",
        "reviewCardId": "reading-u10-l01-c2"
      },
      {
        "id": "reading-u10-l01-q06",
        "type": "true-false",
        "conceptTag": "drama-structure",
        "reviewCardId": "reading-u10-l01-c2"
      },
      {
        "id": "reading-u10-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "drama-structure",
        "reviewCardId": "reading-u10-l01-c2"
      },
      {
        "id": "reading-u10-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "drama-structure",
        "reviewCardId": "reading-u10-l01-c2"
      },
      {
        "id": "reading-u10-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "poetry-structure",
        "reviewCardId": "reading-u10-l01-c3"
      },
      {
        "id": "reading-u10-l01-q10",
        "type": "true-false",
        "conceptTag": "poetry-structure",
        "reviewCardId": "reading-u10-l01-c3"
      },
      {
        "id": "reading-u10-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "poetry-structure",
        "reviewCardId": "reading-u10-l01-c3"
      },
      {
        "id": "reading-u10-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "poetry-structure",
        "reviewCardId": "reading-u10-l01-c3"
      },
      {
        "id": "reading-u10-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "poetry-structure",
        "reviewCardId": "reading-u10-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u10-l02",
    "questions": [
      {
        "id": "reading-u10-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "literal-nonliteral",
        "reviewCardId": "reading-u10-l02-c1"
      },
      {
        "id": "reading-u10-l02-q02",
        "type": "true-false",
        "conceptTag": "literal-nonliteral",
        "reviewCardId": "reading-u10-l02-c1"
      },
      {
        "id": "reading-u10-l02-q03",
        "type": "multiple-choice",
        "conceptTag": "literal-nonliteral",
        "reviewCardId": "reading-u10-l02-c1"
      },
      {
        "id": "reading-u10-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "literal-nonliteral",
        "reviewCardId": "reading-u10-l02-c1"
      },
      {
        "id": "reading-u10-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "figurative-meaning",
        "reviewCardId": "reading-u10-l02-c2"
      },
      {
        "id": "reading-u10-l02-q06",
        "type": "true-false",
        "conceptTag": "figurative-meaning",
        "reviewCardId": "reading-u10-l02-c2"
      },
      {
        "id": "reading-u10-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "figurative-meaning",
        "reviewCardId": "reading-u10-l02-c2"
      },
      {
        "id": "reading-u10-l02-q08",
        "type": "fill-blank",
        "conceptTag": "figurative-meaning",
        "reviewCardId": "reading-u10-l02-c2"
      },
      {
        "id": "reading-u10-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "word-relationships",
        "reviewCardId": "reading-u10-l02-c3"
      },
      {
        "id": "reading-u10-l02-q10",
        "type": "true-false",
        "conceptTag": "word-relationships",
        "reviewCardId": "reading-u10-l02-c3"
      },
      {
        "id": "reading-u10-l02-q11",
        "type": "multiple-choice",
        "conceptTag": "word-relationships",
        "reviewCardId": "reading-u10-l02-c3"
      },
      {
        "id": "reading-u10-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "word-relationships",
        "reviewCardId": "reading-u10-l02-c3"
      },
      {
        "id": "reading-u10-l02-q13",
        "type": "fill-blank",
        "conceptTag": "word-relationships",
        "reviewCardId": "reading-u10-l02-c3"
      }
    ]
  },
  {
    "id": "reading-u10-l03",
    "questions": [
      {
        "id": "reading-u10-l03-q01",
        "type": "multiple-choice",
        "conceptTag": "figurative-choice",
        "reviewCardId": "reading-u10-l03-c1"
      },
      {
        "id": "reading-u10-l03-q02",
        "type": "true-false",
        "conceptTag": "figurative-choice",
        "reviewCardId": "reading-u10-l03-c1"
      },
      {
        "id": "reading-u10-l03-q03",
        "type": "multiple-choice",
        "conceptTag": "figurative-choice",
        "reviewCardId": "reading-u10-l03-c1"
      },
      {
        "id": "reading-u10-l03-q04",
        "type": "multiple-choice",
        "conceptTag": "figurative-choice",
        "reviewCardId": "reading-u10-l03-c1"
      },
      {
        "id": "reading-u10-l03-q05",
        "type": "multiple-choice",
        "conceptTag": "figurative-effect",
        "reviewCardId": "reading-u10-l03-c2"
      },
      {
        "id": "reading-u10-l03-q06",
        "type": "true-false",
        "conceptTag": "figurative-effect",
        "reviewCardId": "reading-u10-l03-c2"
      },
      {
        "id": "reading-u10-l03-q07",
        "type": "multiple-choice",
        "conceptTag": "figurative-effect",
        "reviewCardId": "reading-u10-l03-c2"
      },
      {
        "id": "reading-u10-l03-q08",
        "type": "multiple-choice",
        "conceptTag": "figurative-effect",
        "reviewCardId": "reading-u10-l03-c2"
      },
      {
        "id": "reading-u10-l03-q09",
        "type": "multiple-choice",
        "conceptTag": "reader-experience",
        "reviewCardId": "reading-u10-l03-c3"
      },
      {
        "id": "reading-u10-l03-q10",
        "type": "true-false",
        "conceptTag": "reader-experience",
        "reviewCardId": "reading-u10-l03-c3"
      },
      {
        "id": "reading-u10-l03-q11",
        "type": "multiple-choice",
        "conceptTag": "reader-experience",
        "reviewCardId": "reading-u10-l03-c3"
      },
      {
        "id": "reading-u10-l03-q12",
        "type": "multiple-choice",
        "conceptTag": "reader-experience",
        "reviewCardId": "reading-u10-l03-c3"
      },
      {
        "id": "reading-u10-l03-q13",
        "type": "multiple-choice",
        "conceptTag": "reader-experience",
        "reviewCardId": "reading-u10-l03-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u10-l01",
    "checks": [
      {
        "cardId": "reading-u10-l01-c1",
        "check": {
          "prompt": "Which element belongs especially to the narrative form here?",
          "choices": [
            {
              "id": "a",
              "text": "a narrator explaining actions"
            },
            {
              "id": "b",
              "text": "speaker labels"
            },
            {
              "id": "c",
              "text": "three stanzas"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The prose narrator reports and connects events."
        }
      },
      {
        "cardId": "reading-u10-l01-c2",
        "check": {
          "prompt": "What do brackets contribute?",
          "choices": [
            {
              "id": "a",
              "text": "stage directions for visible action"
            },
            {
              "id": "b",
              "text": "a narrator’s paragraph"
            },
            {
              "id": "c",
              "text": "rhyme"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The bracketed text directs setting and movement."
        }
      },
      {
        "cardId": "reading-u10-l01-c3",
        "check": {
          "prompt": "What does “last small moon” add?",
          "choices": [
            {
              "id": "a",
              "text": "a compact image of the lantern in darkness"
            },
            {
              "id": "b",
              "text": "a literal moon fact"
            },
            {
              "id": "c",
              "text": "a speaker label"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The metaphor creates imagery."
        }
      }
    ]
  },
  {
    "id": "reading-u10-l02",
    "checks": [
      {
        "cardId": "reading-u10-l02-c1",
        "check": {
          "prompt": "Which phrase is literal?",
          "choices": [
            {
              "id": "a",
              "text": "three wooden steps"
            },
            {
              "id": "b",
              "text": "piece of cake"
            },
            {
              "id": "c",
              "text": "market was a beehive"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The passage describes actual boards."
        }
      },
      {
        "cardId": "reading-u10-l02-c2",
        "check": {
          "prompt": "What does “market was a beehive” mean?",
          "choices": [
            {
              "id": "a",
              "text": "the market was crowded and active"
            },
            {
              "id": "b",
              "text": "bees replaced vendors"
            },
            {
              "id": "c",
              "text": "the market sold only honey"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The source directly paraphrases the metaphor."
        }
      },
      {
        "cardId": "reading-u10-l02-c3",
        "check": {
          "prompt": "What is an antonym of ripe?",
          "choices": [
            {
              "id": "a",
              "text": "unripe"
            },
            {
              "id": "b",
              "text": "ready"
            },
            {
              "id": "c",
              "text": "peach"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The source identifies the opposite."
        }
      }
    ]
  },
  {
    "id": "reading-u10-l03",
    "checks": [
      {
        "cardId": "reading-u10-l03-c1",
        "check": {
          "prompt": "Which phrase is figurative?",
          "choices": [
            {
              "id": "a",
              "text": "fog folded a gray blanket"
            },
            {
              "id": "b",
              "text": "water tapped against pilings"
            },
            {
              "id": "c",
              "text": "Mara held the rail"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Fog cannot literally fold cloth."
        }
      },
      {
        "cardId": "reading-u10-l03-c2",
        "check": {
          "prompt": "What does the gray blanket mean?",
          "choices": [
            {
              "id": "a",
              "text": "thick fog covers the river and limits sight"
            },
            {
              "id": "b",
              "text": "a blanket fell in water"
            },
            {
              "id": "c",
              "text": "the river is warm"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That literal meaning fits the scene."
        }
      },
      {
        "cardId": "reading-u10-l03-c3",
        "check": {
          "prompt": "What effect does “giant’s warning” create?",
          "choices": [
            {
              "id": "a",
              "text": "It makes the horn feel enormous and serious"
            },
            {
              "id": "b",
              "text": "It proves a giant is present"
            },
            {
              "id": "c",
              "text": "It makes the scene comic"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The exaggerated image intensifies warning."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u10-l01",
    "widgets": []
  },
  {
    "id": "reading-u10-l02",
    "widgets": [
      {
        "cardId": "reading-u10-l02-c2",
        "ref": {
          "type": "figurative-language-matcher",
          "config": {
            "pairs": [
              {
                "id": "simile",
                "phrase": "busy as a bee",
                "kind": "simile",
                "meaning": "very busy"
              },
              {
                "id": "metaphor",
                "phrase": "the market was a beehive",
                "kind": "metaphor",
                "meaning": "the market was crowded and active"
              },
              {
                "id": "idiom",
                "phrase": "the setup was a piece of cake",
                "kind": "idiom",
                "meaning": "the setup was easy"
              }
            ]
          }
        }
      }
    ]
  },
  {
    "id": "reading-u10-l03",
    "widgets": []
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u10-l01",
    "passage": {
      "title": "The Last Lantern",
      "text": "The Last Lantern — narrative\n\nNora checked the tables after the evening festival. Every paper lantern had been collected except one glowing beside the empty stage. She carried it toward the gate, where Mr. Lee was searching the dark path.\n\n“This must be yours,” Nora said. Mr. Lee smiled because the lantern marked the path to his family’s booth. Nora handed it back, and together they watched its warm circle move through the dark.\n\nThe Last Lantern — one-scene drama\n\n[An empty festival stage at night. One lantern glows.]\nNORA: One lantern is still here.\nMR. LEE: I have been searching for it. It marks the path to our booth.\n[Nora lifts the lantern and hands it to him.]\nNORA: Then it can guide you back.\nMR. LEE: Thank you.\n[They exit as the lantern’s light moves along the path.]\n\nThe Last Lantern — free-verse poem\n\nOne lantern waits\nbeside the quiet stage,\na warm circle in the dark.\n\nNora lifts the glow.\nA searching face softens;\nthe lost light finds its hand.\n\nDown the festival path\ntwo figures follow\nthe last small moon."
    },
    "reference": {
      "title": "Read “The Last Lantern”",
      "text": "The Last Lantern — narrative\n\nNora checked the tables after the evening festival. Every paper lantern had been collected except one glowing beside the empty stage. She carried it toward the gate, where Mr. Lee was searching the dark path.\n\n“This must be yours,” Nora said. Mr. Lee smiled because the lantern marked the path to his family’s booth. Nora handed it back, and together they watched its warm circle move through the dark.\n\nThe Last Lantern — one-scene drama\n\n[An empty festival stage at night. One lantern glows.]\nNORA: One lantern is still here.\nMR. LEE: I have been searching for it. It marks the path to our booth.\n[Nora lifts the lantern and hands it to him.]\nNORA: Then it can guide you back.\nMR. LEE: Thank you.\n[They exit as the lantern’s light moves along the path.]\n\nThe Last Lantern — free-verse poem\n\nOne lantern waits\nbeside the quiet stage,\na warm circle in the dark.\n\nNora lifts the glow.\nA searching face softens;\nthe lost light finds its hand.\n\nDown the festival path\ntwo figures follow\nthe last small moon."
    },
    "evidence": [
      "one-scene drama",
      "free-verse poem",
      "last small moon"
    ]
  },
  {
    "id": "reading-u10-l02",
    "passage": {
      "title": "Market Morning",
      "text": "Market Morning\n\nBefore customers arrived, Lena climbed the three wooden steps to the produce stand. The steps were literal boards. Setting out baskets was a piece of cake because her checklist was clear. Soon vendors became busy as bees, moving quickly from crate to table.\n\nBy nine o’clock, the market was a beehive. No giant hive replaced the square; the metaphor means the market was crowded and active. Lena’s aunt called the peaches ripe, or fully ready to eat. Unripe is the antonym of ripe. Nearby, a quiet corner contrasted with the noisy main aisle.\n\nLiteral language means exactly what the words ordinarily state. Nonliteral language asks readers to interpret a comparison or familiar expression. A simile compares using like or as; a metaphor says one thing is another; an idiom has a meaning not found by combining each word literally. Synonyms have similar meanings, antonyms have opposite meanings, and contrasts can clarify both."
    },
    "reference": {
      "title": "Read “Market Morning”",
      "text": "Market Morning\n\nBefore customers arrived, Lena climbed the three wooden steps to the produce stand. The steps were literal boards. Setting out baskets was a piece of cake because her checklist was clear. Soon vendors became busy as bees, moving quickly from crate to table.\n\nBy nine o’clock, the market was a beehive. No giant hive replaced the square; the metaphor means the market was crowded and active. Lena’s aunt called the peaches ripe, or fully ready to eat. Unripe is the antonym of ripe. Nearby, a quiet corner contrasted with the noisy main aisle.\n\nLiteral language means exactly what the words ordinarily state. Nonliteral language asks readers to interpret a comparison or familiar expression. A simile compares using like or as; a metaphor says one thing is another; an idiom has a meaning not found by combining each word literally. Synonyms have similar meanings, antonyms have opposite meanings, and contrasts can clarify both."
    },
    "evidence": [
      "piece of cake",
      "market was a beehive",
      "Unripe is the antonym of ripe"
    ]
  },
  {
    "id": "reading-u10-l03",
    "passage": {
      "title": "Fog at the Ferry",
      "text": "Fog at the Ferry\n\nAt dawn, the fog folded a gray blanket over the river. Mara could see the ferry dock beneath her shoes, but the opposite bank had vanished. Moist air cooled her cheeks while water tapped softly against the pilings.\n\nThen the ferry horn sounded. The horn was a giant’s warning rolling through the mist. Mara knew no giant stood in the river; the metaphor made the sound feel enormous and serious. She tightened her hand around the rail and listened for the dock worker’s directions.\n\nA small amber light appeared, blurred by the fog. It bobbed closer until the ferry’s square windows came into view. The gray blanket slowly thinned, revealing a silver path of water.\n\nThe figures do more than decorate the scene. The blanket metaphor makes fog feel enclosing and soft-edged. The giant’s-warning metaphor magnifies the horn and builds caution. Together with restrained sound and touch details, they place readers inside Mara’s limited, uncertain view before relief arrives."
    },
    "reference": {
      "title": "Read “Fog at the Ferry”",
      "text": "Fog at the Ferry\n\nAt dawn, the fog folded a gray blanket over the river. Mara could see the ferry dock beneath her shoes, but the opposite bank had vanished. Moist air cooled her cheeks while water tapped softly against the pilings.\n\nThen the ferry horn sounded. The horn was a giant’s warning rolling through the mist. Mara knew no giant stood in the river; the metaphor made the sound feel enormous and serious. She tightened her hand around the rail and listened for the dock worker’s directions.\n\nA small amber light appeared, blurred by the fog. It bobbed closer until the ferry’s square windows came into view. The gray blanket slowly thinned, revealing a silver path of water.\n\nThe figures do more than decorate the scene. The blanket metaphor makes fog feel enclosing and soft-edged. The giant’s-warning metaphor magnifies the horn and builds caution. Together with restrained sound and touch details, they place readers inside Mara’s limited, uncertain view before relief arrives."
    },
    "evidence": [
      "gray blanket",
      "giant’s warning",
      "amber light"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 10 literal content', () => {
  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit10Lessons, expectedManifest, 'reading');
    expect(unit10Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit10Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit10Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit10Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit10Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit10Lessons) {
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
    for (const lesson of unit10Lessons) {
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

### Task 2: reading-u08-l01 — Connect Author's Purpose and Perspective

**Files:** Create `src/content/reading/u08.ts`, `src/content/reading/u08.test.ts`.

**Consumes:** The complete final `u08.ts` and `u08.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u08-l01` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u08.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u08.test.ts`; expect a missing-module failure.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u08-l01` object from the final `u08.ts` literal through the end of `reading-u08-l01-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u08.ts src/content/reading/u08.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u08.ts src/content/reading/u08.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u08-l01 connect author's purpose and perspective"`.

### Task 3: reading-u08-l02 — Explain Claims, Reasons, and Evidence

**Files:** Modify `src/content/reading/u08.ts`, `src/content/reading/u08.test.ts`.

**Consumes:** The complete final `u08.ts` and `u08.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u08-l02` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u08.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u08.test.ts`; expect the exact expected lesson count to exceed the current export by one.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u08-l02` object from the final `u08.ts` literal through the end of `reading-u08-l02-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u08.ts src/content/reading/u08.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u08.ts src/content/reading/u08.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u08-l02 explain claims, reasons, and evidence"`.

### Task 4: reading-u09-l01 — Compare First- and Third-Person Narration

**Files:** Create `src/content/reading/u09.ts`, `src/content/reading/u09.test.ts`.

**Consumes:** The complete final `u09.ts` and `u09.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u09-l01` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u09.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u09.test.ts`; expect a missing-module failure.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u09-l01` object from the final `u09.ts` literal through the end of `reading-u09-l01-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u09.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u09.ts src/content/reading/u09.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u09.ts src/content/reading/u09.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u09-l01 compare first- and third-person narration"`.

### Task 5: reading-u09-l02 — Explain How Character Perspectives Shape a Story

**Files:** Modify `src/content/reading/u09.ts`, `src/content/reading/u09.test.ts`.

**Consumes:** The complete final `u09.ts` and `u09.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u09-l02` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u09.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u09.test.ts`; expect the exact expected lesson count to exceed the current export by one.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u09-l02` object from the final `u09.ts` literal through the end of `reading-u09-l02-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u09.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u09.ts src/content/reading/u09.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u09.ts src/content/reading/u09.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u09-l02 explain how character perspectives shape a story"`.

### Task 6: reading-u10-l01 — Compare Narratives, Dramas, and Poems

**Files:** Create `src/content/reading/u10.ts`, `src/content/reading/u10.test.ts`.

**Consumes:** The complete final `u10.ts` and `u10.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u10-l01` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u10.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u10.test.ts`; expect a missing-module failure.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u10-l01` object from the final `u10.ts` literal through the end of `reading-u10-l01-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u10.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u10.ts src/content/reading/u10.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u10.ts src/content/reading/u10.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u10-l01 compare narratives, dramas, and poems"`.

### Task 7: reading-u10-l02 — Interpret Literal and Nonliteral Language

**Files:** Modify `src/content/reading/u10.ts`, `src/content/reading/u10.test.ts`.

**Consumes:** The complete final `u10.ts` and `u10.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u10-l02` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u10.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u10.test.ts`; expect the exact expected lesson count to exceed the current export by one.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u10-l02` object from the final `u10.ts` literal through the end of `reading-u10-l02-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u10.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u10.ts src/content/reading/u10.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u10.ts src/content/reading/u10.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u10-l02 interpret literal and nonliteral language"`.

### Task 8: reading-u10-l03 — Explain Figurative Language's Effect

**Files:** Modify `src/content/reading/u10.ts`, `src/content/reading/u10.test.ts`.

**Consumes:** The complete final `u10.ts` and `u10.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u10-l03` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u10.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u10.test.ts`; expect the exact expected lesson count to exceed the current export by one.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u10-l03` object from the final `u10.ts` literal through the end of `reading-u10-l03-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u10.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u10.ts src/content/reading/u10.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u10.ts src/content/reading/u10.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u10-l03 explain figurative language's effect"`.

### Task 9: Verify and review the complete C2C wave

**Files:** Read/verify `src/content/reading/u08.ts`, `src/content/reading/u08.test.ts`, `src/content/reading/u09.ts`, `src/content/reading/u09.test.ts`, `src/content/reading/u10.ts`, `src/content/reading/u10.test.ts`; do not modify shared or protected files.

**Consumes:** Every accepted per-lesson commit in this wave.

**Produces:** Mechanical count evidence, green focused/permanent/type gates, and an independent scoped-review disposition.

- [ ] **Step 1 (2–5 minutes): Run focused tests.** Run `npm test -- src/content/reading/u08.test.ts src/content/reading/u09.test.ts src/content/reading/u10.test.ts src/content/schema.test.ts src/content/content-validation.test.ts`.
- [ ] **Step 2 (2–5 minutes): Run TypeScript.** Run `npx tsc -b --pretty false`.
- [ ] **Step 3 (2–5 minutes): Run mechanical scans.** Verify canonical q01–q13 sequences, exact three-card/13-question counts, threshold 8, ordered six-code OE arrays, one tag/card mapping per card, exact widget counts, no empty lesson/card/pool arrays, and no planning-marker or live-collaboration/oral-scoring prose.
- [ ] **Step 4 (2–5 minutes): Inspect scope.** Run `git diff --check` and verify the wave commit range touches only the owned paths.
- [ ] **Step 5 (2–5 minutes): Request independent review.** Review standard fidelity, source-before-question visibility, answer/distractor correctness, differentiated supports, widget configs, and accessibility/solo framing; return defects to the owning lesson.

## Execution handoff

The wave stops after its owned modules/tests are reviewed. Plan C master Task C4 alone changes the Reading registry and final catalog.
