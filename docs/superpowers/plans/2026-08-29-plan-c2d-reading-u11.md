# Plan C2D: Reading Unit 11 Implementation Plan

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
- Every inline check has the complete source or record snippet it needs in the current card's preceding `blocks`; `expectedVisiblePriorSnippets` pins this for all 15 checks.
- The complete source remains visible through `workedExample.passage` and `quiz.reference`. Solo work is sufficient; optional read-aloud is assistance only. No widget state writes scoring, progress, analytics, or storage.

---

### Task 1: Freeze the dependency and workspace gate

**Files:** Read `AGENTS.md`, governing plans/spec, ledgers, `src/content/schema.ts`, `src/content/curriculum.ts`, `src/content/unit-test-helpers.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`; inspect `src/content/reading/u11.ts`, `src/content/reading/u11.test.ts`.

**Consumes:** Accepted Plan A remediation, completed/reviewed Plan B, and master C1 contracts including `READING_OE_CODES`, `crossCuttingExpectationCodes`, and `expectUnitLessons`.

**Produces:** A recorded green baseline and confirmation that only this wave owns the named files.

- [ ] **Step 1 (2–5 minutes): Inspect ownership.** Run `git status --short`, `git diff --stat`, `git log -8 --oneline`, and read both execution ledgers. Stop on overlapping changes to owned paths.
- [ ] **Step 2 (2–5 minutes): Verify interfaces.** Confirm all widget refs in the final modules below parse with the implemented strict `WidgetRefSchema` and the master helper signature matches the imports in the test literals.
- [ ] **Step 3 (2–5 minutes): Run baseline.** Run `npm test && npx tsc -b --pretty false && npm run build`; record the exact commit and result.

## Complete copy-ready final files

### `src/content/reading/u11.ts`

```ts
import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit11Lessons = [
  {
    "id": "reading-u11-l01",
    "unitId": "reading-u11",
    "title": "Ask an Inquiry Question and Examine a Source",
    "indicatorCodes": [
      "ELA.4.R.1.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Inquiry begins with a focused, answerable question."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Then readers examine a provided source for relevant information."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s record findings that answer only our bounded question."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u11-l01-c1",
        "title": "Focus an Inquiry Question",
        "blocks": [
          {
            "kind": "text",
            "text": "A focused question names a topic and the information needed."
          },
          {
            "kind": "example",
            "text": "“What features help a small schoolyard patch serve pollinators?” is bounded and answerable from the packet."
          },
          {
            "kind": "tip",
            "text": "Avoid questions that are too broad or demand unavailable data."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which question fits this source?",
          "choices": [
            {
              "id": "a",
              "text": "What features help a schoolyard pollinator patch?"
            },
            {
              "id": "b",
              "text": "What is everything about insects?"
            },
            {
              "id": "c",
              "text": "Which exact bees visit next year?"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The packet directly supplies design features."
        }
      },
      {
        "id": "reading-u11-l01-c2",
        "title": "Examine the Provided Source",
        "blocks": [
          {
            "kind": "text",
            "text": "Preview title/headings, identify source scope, and read for exact evidence."
          },
          {
            "kind": "example",
            "text": "The source covers flower timing, plant choice, shelter/water, care, and limits."
          },
          {
            "kind": "tip",
            "text": "Do not claim species counts the source does not provide."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Which heading addresses blooms across months?",
          "choices": [
            {
              "id": "a",
              "text": "Flower timing"
            },
            {
              "id": "b",
              "text": "Care"
            },
            {
              "id": "c",
              "text": "Limits"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That section states spring through early fall."
        }
      },
      {
        "id": "reading-u11-l01-c3",
        "title": "Record Question-Based Findings",
        "blocks": [
          {
            "kind": "text",
            "text": "Write brief findings in your own words and attach the relevant source detail."
          },
          {
            "kind": "example",
            "text": "Staggered blooms, suitable native plants, safe shelter/water, and careful maintenance answer the inquiry."
          },
          {
            "kind": "tip",
            "text": "Mark uncertainty and source limits."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "Which is a supported finding?",
          "choices": [
            {
              "id": "a",
              "text": "Different bloom times can extend food availability"
            },
            {
              "id": "b",
              "text": "Every pollinator species will arrive"
            },
            {
              "id": "c",
              "text": "Dirty standing water is ideal"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The source states the timing benefit and avoids guarantees."
        }
      }
    ],
    "workedExample": {
      "title": "Conduct a bounded inquiry with one provided source",
      "passage": {
        "title": "Schoolyard Pollinator Patch: Planning Notes",
        "text": "Schoolyard Pollinator Patch: Planning Notes — invented Cram All practice source\n\nInquiry question: What features help a small schoolyard patch serve pollinators?\n\nFlower timing: Include several plant kinds so some flowers bloom in spring, summer, and early fall. A longer bloom season can provide nectar or pollen across more months.\n\nPlant choice: Native flowering plants are adapted to local conditions and can support local insects. Choose plants appropriate for the patch’s sunlight and soil.\n\nShelter and water: Leave a few hollow stems or small bare-soil areas where appropriate. A shallow water dish needs stones for landing and regular cleaning; standing dirty water is not helpful.\n\nCare: Avoid spraying broad insect killers in the patch. Remove invasive plants, water new plants as needed, and observe visitors without touching them.\n\nLimits: This source describes design features. It does not count which pollinator species will arrive or guarantee that every feature works equally at every site."
      },
      "steps": [
        "Focus the design-feature question.",
        "Scan the four content headings and the limits.",
        "Record four supported features and one limit in original wording."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Schoolyard Pollinator Patch: Planning Notes”",
        "text": "Schoolyard Pollinator Patch: Planning Notes — invented Cram All practice source\n\nInquiry question: What features help a small schoolyard patch serve pollinators?\n\nFlower timing: Include several plant kinds so some flowers bloom in spring, summer, and early fall. A longer bloom season can provide nectar or pollen across more months.\n\nPlant choice: Native flowering plants are adapted to local conditions and can support local insects. Choose plants appropriate for the patch’s sunlight and soil.\n\nShelter and water: Leave a few hollow stems or small bare-soil areas where appropriate. A shallow water dish needs stones for landing and regular cleaning; standing dirty water is not helpful.\n\nCare: Avoid spraying broad insect killers in the patch. Remove invasive plants, water new plants as needed, and observe visitors without touching them.\n\nLimits: This source describes design features. It does not count which pollinator species will arrive or guarantee that every feature works equally at every site."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which question is focused and answerable from the source?",
          "choices": [
            {
              "id": "a",
              "text": "What features help a small schoolyard patch serve pollinators?"
            },
            {
              "id": "b",
              "text": "Why do all insects exist?"
            },
            {
              "id": "c",
              "text": "Which species will arrive next year?"
            },
            {
              "id": "d",
              "text": "How can every school redesign all land?"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The first matches source scope.",
          "id": "reading-u11-l01-q01",
          "conceptTag": "inquiry-question",
          "reviewCardId": "reading-u11-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "A focused inquiry question should fit the provided source.",
          "choices": [
            {
              "id": "true",
              "text": "True — scope and source must align"
            },
            {
              "id": "false",
              "text": "False — it should require missing data"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Alignment makes inquiry answerable.",
          "id": "reading-u11-l01-q02",
          "conceptTag": "inquiry-question",
          "reviewCardId": "reading-u11-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why is “Which exact species will arrive?” unsuitable here?",
          "choices": [
            {
              "id": "a",
              "text": "It is too short"
            },
            {
              "id": "b",
              "text": "It mentions species"
            },
            {
              "id": "c",
              "text": "The source gives no arrival counts or guarantees"
            },
            {
              "id": "d",
              "text": "It uses a question mark"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The source limit rules it out.",
          "id": "reading-u11-l01-q03",
          "conceptTag": "inquiry-question",
          "reviewCardId": "reading-u11-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which revision narrows “Tell me about pollinators”?",
          "choices": [
            {
              "id": "a",
              "text": "Pollinators?"
            },
            {
              "id": "b",
              "text": "Why everything?"
            },
            {
              "id": "c",
              "text": "List all insects ever"
            },
            {
              "id": "d",
              "text": "What patch features provide food or shelter for pollinators?"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It names setting and needed information.",
          "id": "reading-u11-l01-q04",
          "conceptTag": "inquiry-question",
          "reviewCardId": "reading-u11-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What should a reader examine first?",
          "choices": [
            {
              "id": "a",
              "text": "Only the final word"
            },
            {
              "id": "b",
              "text": "Title, headings, scope, and limits"
            },
            {
              "id": "c",
              "text": "An unrelated website"
            },
            {
              "id": "d",
              "text": "A favorite flower"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Source features guide examination.",
          "id": "reading-u11-l01-q05",
          "conceptTag": "source-examination",
          "reviewCardId": "reading-u11-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "The source says suitable plants depend on sunlight and soil.",
          "choices": [
            {
              "id": "true",
              "text": "True — site conditions are stated"
            },
            {
              "id": "false",
              "text": "False — every plant fits every site"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The plant-choice section qualifies selection.",
          "id": "reading-u11-l01-q06",
          "conceptTag": "source-examination",
          "reviewCardId": "reading-u11-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which feature provides food across more months?",
          "choices": [
            {
              "id": "a",
              "text": "Dirty water"
            },
            {
              "id": "b",
              "text": "one flower kind"
            },
            {
              "id": "c",
              "text": "plants with different bloom times"
            },
            {
              "id": "d",
              "text": "broad insect killer"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Staggered blooms extend nectar/pollen timing.",
          "id": "reading-u11-l01-q07",
          "conceptTag": "source-examination",
          "reviewCardId": "reading-u11-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which claim exceeds the source?",
          "choices": [
            {
              "id": "a",
              "text": "Native plants can support insects"
            },
            {
              "id": "b",
              "text": "A dish needs cleaning"
            },
            {
              "id": "c",
              "text": "Avoid broad insect killers"
            },
            {
              "id": "d",
              "text": "Every listed feature guarantees every pollinator will arrive"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The limits reject guarantees.",
          "id": "reading-u11-l01-q08",
          "conceptTag": "source-examination",
          "reviewCardId": "reading-u11-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which note is a relevant finding?",
          "choices": [
            {
              "id": "a",
              "text": "Leave appropriate hollow stems or bare soil for shelter"
            },
            {
              "id": "b",
              "text": "The page has five headings"
            },
            {
              "id": "c",
              "text": "Pollinators are the best animals"
            },
            {
              "id": "d",
              "text": "Every school has identical soil"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The shelter detail answers the inquiry.",
          "id": "reading-u11-l01-q09",
          "conceptTag": "inquiry-findings",
          "reviewCardId": "reading-u11-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "A finding should be written in the learner’s own words while preserving meaning.",
          "choices": [
            {
              "id": "true",
              "text": "True — accurate paraphrase is appropriate"
            },
            {
              "id": "false",
              "text": "False — copy every sentence"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Research notes can paraphrase with evidence.",
          "id": "reading-u11-l01-q10",
          "conceptTag": "inquiry-findings",
          "reviewCardId": "reading-u11-l01-c3"
        },
        {
          "type": "sort",
          "prompt": "Order the inquiry process.",
          "explanation": "The sequence moves from question to source, evidence, and conclusion.",
          "id": "reading-u11-l01-q11",
          "conceptTag": "inquiry-findings",
          "reviewCardId": "reading-u11-l01-c3",
          "items": [
            {
              "id": "step-3",
              "text": "Record relevant evidence"
            },
            {
              "id": "step-1",
              "text": "Ask a focused question"
            },
            {
              "id": "step-4",
              "text": "State supported findings and limits"
            },
            {
              "id": "step-2",
              "text": "Preview and examine the provided source"
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
          "prompt": "Which finding includes a source limit?",
          "choices": [
            {
              "id": "a",
              "text": "All sites work equally"
            },
            {
              "id": "b",
              "text": "The features may help, but results can vary by site"
            },
            {
              "id": "c",
              "text": "Every species arrives"
            },
            {
              "id": "d",
              "text": "The source proves next year"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "It preserves stated uncertainty.",
          "id": "reading-u11-l01-q12",
          "conceptTag": "inquiry-findings",
          "reviewCardId": "reading-u11-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response best answers the inquiry?",
          "choices": [
            {
              "id": "a",
              "text": "Plant anything"
            },
            {
              "id": "b",
              "text": "Use only water"
            },
            {
              "id": "c",
              "text": "Count species not in the source"
            },
            {
              "id": "d",
              "text": "Use staggered blooms, suitable native plants, safe shelter/water, and careful maintenance"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It synthesizes all relevant sections.",
          "id": "reading-u11-l01-q13",
          "conceptTag": "inquiry-findings",
          "reviewCardId": "reading-u11-l01-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u11-l02",
    "unitId": "reading-u11",
    "title": "Judge the Credibility of a Provided Source",
    "indicatorCodes": [
      "ELA.4.R.1.2"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Credibility is a reasoned judgment, not a single badge."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Check author/publisher, evidence, date context, and purpose."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s judge only the supplied records."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u11-l02-c1",
        "title": "Check Author and Publisher",
        "blocks": [
          {
            "kind": "text",
            "text": "Identify who created and published the source and whether relevant expertise is visible."
          },
          {
            "kind": "example",
            "text": "Source B supplies an author role and publisher; A lacks a publisher; C lacks both."
          },
          {
            "kind": "tip",
            "text": "Authority supports credibility but does not replace evidence."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which record supplies both author and publisher?",
          "choices": [
            {
              "id": "a",
              "text": "Source B"
            },
            {
              "id": "b",
              "text": "Source A"
            },
            {
              "id": "c",
              "text": "Source C"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The record names Dr. Ortiz and Sample County Extension."
        }
      },
      {
        "id": "reading-u11-l02-c2",
        "title": "Check Date, Evidence, and Purpose",
        "blocks": [
          {
            "kind": "text",
            "text": "Look for checkable evidence, an appropriate date, and a purpose aligned with accuracy."
          },
          {
            "kind": "example",
            "text": "B gives checkable prevention actions and explanatory purpose; A entertains without evidence."
          },
          {
            "kind": "tip",
            "text": "Recency alone never proves truth."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Which source gives checkable claims?",
          "choices": [
            {
              "id": "a",
              "text": "Source B"
            },
            {
              "id": "b",
              "text": "Source A"
            },
            {
              "id": "c",
              "text": "Source C"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Its standing-water claims can be examined."
        }
      },
      {
        "id": "reading-u11-l02-c3",
        "title": "Make a Credibility Judgment",
        "blocks": [
          {
            "kind": "text",
            "text": "Weigh all criteria and explain strengths and gaps."
          },
          {
            "kind": "example",
            "text": "Only B meets author, evidence, date, and purpose in the supplied exercise."
          },
          {
            "kind": "tip",
            "text": "Use Criteria → Evidence → Judgment with limits."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "widget": {
          "type": "source-credibility-checker",
          "config": {
            "sources": [
              {
                "id": "blog",
                "title": "Mosquito Myths Blog",
                "author": "Kai Reed",
                "date": "2024",
                "purpose": "entertain with surprising claims",
                "claims": []
              },
              {
                "id": "extension",
                "title": "County Extension Mosquito Guide",
                "author": "Dr. Lena Ortiz",
                "date": "2026",
                "publisher": "Sample County Extension",
                "purpose": "explain mosquito prevention",
                "claims": [
                  "Standing water can become mosquito habitat.",
                  "Empty small containers after rain."
                ]
              },
              {
                "id": "screenshot",
                "title": "Mystery Screenshot",
                "claims": []
              }
            ],
            "criteria": [
              "author",
              "evidence",
              "date",
              "purpose"
            ],
            "credibleIds": [
              "extension"
            ]
          }
        },
        "check": {
          "prompt": "Which is most credible for prevention here?",
          "choices": [
            {
              "id": "a",
              "text": "Source B"
            },
            {
              "id": "b",
              "text": "Source A because it is surprising"
            },
            {
              "id": "c",
              "text": "Source C because it says share"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It alone satisfies all four visible criteria."
        }
      }
    ],
    "workedExample": {
      "title": "Judge supplied credibility signals together",
      "passage": {
        "title": "Three invented Cram All practice source records",
        "text": "Three invented Cram All practice source records\n\nSource A — Mosquito Myths Blog. Author: Kai Reed. Date: 2024. Publisher: not supplied. Purpose: entertain with surprising claims. Evidence notes: none supplied. Excerpt: “My secret leaf trick chases every mosquito forever!”\n\nSource B — County Extension Mosquito Guide. Author: Dr. Lena Ortiz, entomology educator. Date: 2026. Publisher: Sample County Extension. Purpose: explain mosquito prevention. Evidence notes: cites local monitoring guidance and gives checkable actions. Claims: “Standing water can become mosquito habitat. Empty small containers after rain.”\n\nSource C — Mystery Screenshot. Author: not supplied. Date: not supplied. Publisher: not supplied. Purpose: unclear. Evidence notes: none. Excerpt: “Share this now!”\n\nThese records are invented for practice. A credible judgment uses visible authorship/publisher, evidence, date context, and purpose together. A recent date, polished screen, or official-sounding name alone is not proof."
      },
      "steps": [
        "Create four columns: author/publisher, evidence, date, purpose.",
        "Fill each record only from supplied metadata.",
        "Judge B most credible and explain the missing signals in A and C."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Three invented Cram All practice source records”",
        "text": "Three invented Cram All practice source records\n\nSource A — Mosquito Myths Blog. Author: Kai Reed. Date: 2024. Publisher: not supplied. Purpose: entertain with surprising claims. Evidence notes: none supplied. Excerpt: “My secret leaf trick chases every mosquito forever!”\n\nSource B — County Extension Mosquito Guide. Author: Dr. Lena Ortiz, entomology educator. Date: 2026. Publisher: Sample County Extension. Purpose: explain mosquito prevention. Evidence notes: cites local monitoring guidance and gives checkable actions. Claims: “Standing water can become mosquito habitat. Empty small containers after rain.”\n\nSource C — Mystery Screenshot. Author: not supplied. Date: not supplied. Publisher: not supplied. Purpose: unclear. Evidence notes: none. Excerpt: “Share this now!”\n\nThese records are invented for practice. A credible judgment uses visible authorship/publisher, evidence, date context, and purpose together. A recent date, polished screen, or official-sounding name alone is not proof."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which source names relevant author expertise and a publisher?",
          "choices": [
            {
              "id": "a",
              "text": "Source B"
            },
            {
              "id": "b",
              "text": "Source A"
            },
            {
              "id": "c",
              "text": "Source C"
            },
            {
              "id": "d",
              "text": "All equally"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "B supplies both signals.",
          "id": "reading-u11-l02-q01",
          "conceptTag": "source-authority",
          "reviewCardId": "reading-u11-l02-c1"
        },
        {
          "type": "true-false",
          "prompt": "An official-sounding title alone proves credibility.",
          "choices": [
            {
              "id": "true",
              "text": "True — titles are proof"
            },
            {
              "id": "false",
              "text": "False — examine creator, evidence, date, and purpose"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "No one signal is sufficient.",
          "id": "reading-u11-l02-q02",
          "conceptTag": "source-authority",
          "reviewCardId": "reading-u11-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What authority information is missing from Source C?",
          "choices": [
            {
              "id": "a",
              "text": "a claim"
            },
            {
              "id": "b",
              "text": "a screenshot"
            },
            {
              "id": "c",
              "text": "author and publisher"
            },
            {
              "id": "d",
              "text": "a title"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The record explicitly omits both.",
          "id": "reading-u11-l02-q03",
          "conceptTag": "source-authority",
          "reviewCardId": "reading-u11-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which question checks authority?",
          "choices": [
            {
              "id": "a",
              "text": "Is the page colorful?"
            },
            {
              "id": "b",
              "text": "Is it popular?"
            },
            {
              "id": "c",
              "text": "Is it newest?"
            },
            {
              "id": "d",
              "text": "Who created and published it, and what expertise is shown?"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "That question examines visible authority.",
          "id": "reading-u11-l02-q04",
          "conceptTag": "source-authority",
          "reviewCardId": "reading-u11-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which source provides checkable evidence?",
          "choices": [
            {
              "id": "a",
              "text": "Source A"
            },
            {
              "id": "b",
              "text": "Source B"
            },
            {
              "id": "c",
              "text": "Source C"
            },
            {
              "id": "d",
              "text": "None"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "B gives monitorable claims/actions.",
          "id": "reading-u11-l02-q05",
          "conceptTag": "source-evidence",
          "reviewCardId": "reading-u11-l02-c2"
        },
        {
          "type": "true-false",
          "prompt": "Source A’s entertainment purpose may encourage surprising overstatement.",
          "choices": [
            {
              "id": "true",
              "text": "True — purpose affects presentation"
            },
            {
              "id": "false",
              "text": "False — purpose never matters"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Its absolute leaf claim and purpose raise concern.",
          "id": "reading-u11-l02-q06",
          "conceptTag": "source-evidence",
          "reviewCardId": "reading-u11-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why is date not enough by itself?",
          "choices": [
            {
              "id": "a",
              "text": "Dates are never useful"
            },
            {
              "id": "b",
              "text": "Old sources are always false"
            },
            {
              "id": "c",
              "text": "A recent unsupported claim can still be weak"
            },
            {
              "id": "d",
              "text": "Only screenshots have dates"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Credibility combines criteria.",
          "id": "reading-u11-l02-q07",
          "conceptTag": "source-evidence",
          "reviewCardId": "reading-u11-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which claim is an unsupported absolute?",
          "choices": [
            {
              "id": "a",
              "text": "Containers can hold water"
            },
            {
              "id": "b",
              "text": "Empty containers after rain"
            },
            {
              "id": "c",
              "text": "Standing water can be habitat"
            },
            {
              "id": "d",
              "text": "A leaf trick chases every mosquito forever"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "A supplies no evidence for the absolute.",
          "id": "reading-u11-l02-q08",
          "conceptTag": "source-evidence",
          "reviewCardId": "reading-u11-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which is the best overall judgment?",
          "choices": [
            {
              "id": "a",
              "text": "Source B is most credible in this packet"
            },
            {
              "id": "b",
              "text": "A wins because it is exciting"
            },
            {
              "id": "c",
              "text": "C wins because it says share"
            },
            {
              "id": "d",
              "text": "All are equal"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "B meets all supplied criteria.",
          "id": "reading-u11-l02-q09",
          "conceptTag": "credibility-judgment",
          "reviewCardId": "reading-u11-l02-c3"
        },
        {
          "type": "true-false",
          "prompt": "The judgment applies to these records and visible signals, not every source with a similar name.",
          "choices": [
            {
              "id": "true",
              "text": "True — evaluate each source"
            },
            {
              "id": "false",
              "text": "False — one name decides all"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Credibility is source-specific.",
          "id": "reading-u11-l02-q10",
          "conceptTag": "credibility-judgment",
          "reviewCardId": "reading-u11-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why is Source C weak?",
          "choices": [
            {
              "id": "a",
              "text": "It is a screenshot"
            },
            {
              "id": "b",
              "text": "It lacks author, publisher, date, purpose clarity, and evidence"
            },
            {
              "id": "c",
              "text": "It is short"
            },
            {
              "id": "d",
              "text": "It uses punctuation"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The missing criteria block verification.",
          "id": "reading-u11-l02-q11",
          "conceptTag": "credibility-judgment",
          "reviewCardId": "reading-u11-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation uses all criteria?",
          "choices": [
            {
              "id": "a",
              "text": "B is newest"
            },
            {
              "id": "b",
              "text": "B sounds official"
            },
            {
              "id": "c",
              "text": "B names an expert/publisher, gives checkable evidence, has a relevant date, and aims to explain"
            },
            {
              "id": "d",
              "text": "B has two claims"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It explicitly weighs four criteria.",
          "id": "reading-u11-l02-q12",
          "conceptTag": "credibility-judgment",
          "reviewCardId": "reading-u11-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which rule is safest?",
          "choices": [
            {
              "id": "a",
              "text": "Trust every .org"
            },
            {
              "id": "b",
              "text": "Trust visual polish"
            },
            {
              "id": "c",
              "text": "Trust popularity"
            },
            {
              "id": "d",
              "text": "Use multiple visible credibility signals and explain remaining limits"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It avoids unreliable shortcuts.",
          "id": "reading-u11-l02-q13",
          "conceptTag": "credibility-judgment",
          "reviewCardId": "reading-u11-l02-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u11-l03",
    "unitId": "reading-u11",
    "title": "Select Information Relevant to a Topic",
    "indicatorCodes": [
      "ELA.4.R.1.3"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Relevance is a relationship between a detail and a question."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "True, recent, or interesting does not automatically mean relevant."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s select and justify evidence for one exact question."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u11-l03-c1",
        "title": "Define the Relevance Test",
        "blocks": [
          {
            "kind": "text",
            "text": "Restate the topic and ask, “Does this help answer it?”"
          },
          {
            "kind": "example",
            "text": "The question asks for school actions that can reduce food waste."
          },
          {
            "kind": "example",
            "text": "Source snippets — Note 1: Letting students request a smaller first portion can reduce untouched food. Note 5: The school colors are blue and silver. Note 6: Music plays in the lunchroom on Fridays."
          },
          {
            "kind": "tip",
            "text": "Personal preference is not the test."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which detail passes the relevance test?",
          "choices": [
            {
              "id": "a",
              "text": "offer smaller first portions"
            },
            {
              "id": "b",
              "text": "school colors are blue and silver"
            },
            {
              "id": "c",
              "text": "music plays Friday"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It names an action tied to less untouched food."
        }
      },
      {
        "id": "reading-u11-l03-c2",
        "title": "Select Relevant Information",
        "blocks": [
          {
            "kind": "text",
            "text": "Select direct actions, useful measurements, and information explaining impact."
          },
          {
            "kind": "example",
            "text": "Portions, share table, compost, audit, and bin posters qualify."
          },
          {
            "kind": "example",
            "text": "Source snippet — Note 4: A one-week waste audit can identify which foods are discarded most often."
          },
          {
            "kind": "tip",
            "text": "Reject mascot/colors/music for this question."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Why is a waste audit relevant?",
          "choices": [
            {
              "id": "a",
              "text": "It identifies commonly discarded foods for action"
            },
            {
              "id": "b",
              "text": "It changes school colors"
            },
            {
              "id": "c",
              "text": "It selects music"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The measurement informs waste reduction."
        }
      },
      {
        "id": "reading-u11-l03-c3",
        "title": "Explain Why a Detail Belongs",
        "blocks": [
          {
            "kind": "text",
            "text": "Justify with Detail → Question link → Use."
          },
          {
            "kind": "example",
            "text": "Compost posters help students sort scraps, supporting a compost action."
          },
          {
            "kind": "example",
            "text": "Source snippet — Note 2: A supervised share table may allow unopened approved items to be used by another student, following school rules."
          },
          {
            "kind": "tip",
            "text": "Do not say merely “It is important.”"
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "Which explanation is complete?",
          "choices": [
            {
              "id": "a",
              "text": "Share tables may redirect approved unopened food, so they address reducing waste"
            },
            {
              "id": "b",
              "text": "Share tables are nice"
            },
            {
              "id": "c",
              "text": "Lunch is important"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It connects mechanism to question."
        }
      }
    ],
    "workedExample": {
      "title": "Apply relevance to one exact research question",
      "passage": {
        "title": "Reducing Cafeteria Food Waste",
        "text": "Reducing Cafeteria Food Waste — invented research notes\n\nResearch question: Which school actions can reduce cafeteria food waste?\n\nNote 1: Letting students request a smaller first portion can reduce untouched food.\nNote 2: A supervised share table may allow unopened approved items to be used by another student, following school rules.\nNote 3: Separating suitable scraps for a managed compost program can divert some waste from trash.\nNote 4: A one-week waste audit can identify which foods are discarded most often.\nNote 5: The school colors are blue and silver.\nNote 6: Music plays in the lunchroom on Fridays.\nNote 7: The mascot was chosen twenty years ago.\nNote 8: Posters can remind students which bin accepts compostable scraps.\n\nA fact can be true and still irrelevant. Relevance asks whether the information helps answer the exact topic/question, not whether the reader likes it."
      },
      "steps": [
        "Underline “school actions” and “reduce cafeteria food waste.”",
        "Sort each note as relevant or irrelevant.",
        "Explain one accepted and one rejected note using the exact question."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Reducing Cafeteria Food Waste”",
        "text": "Reducing Cafeteria Food Waste — invented research notes\n\nResearch question: Which school actions can reduce cafeteria food waste?\n\nNote 1: Letting students request a smaller first portion can reduce untouched food.\nNote 2: A supervised share table may allow unopened approved items to be used by another student, following school rules.\nNote 3: Separating suitable scraps for a managed compost program can divert some waste from trash.\nNote 4: A one-week waste audit can identify which foods are discarded most often.\nNote 5: The school colors are blue and silver.\nNote 6: Music plays in the lunchroom on Fridays.\nNote 7: The mascot was chosen twenty years ago.\nNote 8: Posters can remind students which bin accepts compostable scraps.\n\nA fact can be true and still irrelevant. Relevance asks whether the information helps answer the exact topic/question, not whether the reader likes it."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "What is the relevance test?",
          "choices": [
            {
              "id": "a",
              "text": "Does this information help answer the exact question?"
            },
            {
              "id": "b",
              "text": "Do I like this fact?"
            },
            {
              "id": "c",
              "text": "Is it the longest note?"
            },
            {
              "id": "d",
              "text": "Is it about school at all?"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Relevance is question-specific.",
          "id": "reading-u11-l03-q01",
          "conceptTag": "relevance-test",
          "reviewCardId": "reading-u11-l03-c1"
        },
        {
          "type": "true-false",
          "prompt": "A true fact about the mascot can be irrelevant to food-waste actions.",
          "choices": [
            {
              "id": "true",
              "text": "True — truth and relevance differ"
            },
            {
              "id": "false",
              "text": "False — all school facts belong"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "It does not answer the question.",
          "id": "reading-u11-l03-q02",
          "conceptTag": "relevance-test",
          "reviewCardId": "reading-u11-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which word in the question narrows the needed information?",
          "choices": [
            {
              "id": "a",
              "text": "Which"
            },
            {
              "id": "b",
              "text": "school"
            },
            {
              "id": "c",
              "text": "actions"
            },
            {
              "id": "d",
              "text": "can"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Actions specify the evidence sought.",
          "id": "reading-u11-l03-q03",
          "conceptTag": "relevance-test",
          "reviewCardId": "reading-u11-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which standard should not decide relevance?",
          "choices": [
            {
              "id": "a",
              "text": "topic connection"
            },
            {
              "id": "b",
              "text": "question usefulness"
            },
            {
              "id": "c",
              "text": "direct support"
            },
            {
              "id": "d",
              "text": "personal preference"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Preference is not evidence of fit.",
          "id": "reading-u11-l03-q04",
          "conceptTag": "relevance-test",
          "reviewCardId": "reading-u11-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which note is relevant?",
          "choices": [
            {
              "id": "a",
              "text": "Friday music"
            },
            {
              "id": "b",
              "text": "smaller first portions"
            },
            {
              "id": "c",
              "text": "school colors"
            },
            {
              "id": "d",
              "text": "mascot history"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Portion choice may reduce untouched food.",
          "id": "reading-u11-l03-q05",
          "conceptTag": "relevance-selection",
          "reviewCardId": "reading-u11-l03-c2"
        },
        {
          "type": "true-false",
          "prompt": "The supervised share-table note is relevant within stated school rules.",
          "choices": [
            {
              "id": "true",
              "text": "True — it may redirect approved food"
            },
            {
              "id": "false",
              "text": "False — rules make it unrelated"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "It names an action/mechanism.",
          "id": "reading-u11-l03-q06",
          "conceptTag": "relevance-selection",
          "reviewCardId": "reading-u11-l03-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which note helps plan by measuring the problem?",
          "choices": [
            {
              "id": "a",
              "text": "posters"
            },
            {
              "id": "b",
              "text": "colors"
            },
            {
              "id": "c",
              "text": "one-week waste audit"
            },
            {
              "id": "d",
              "text": "music"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The audit identifies frequent waste.",
          "id": "reading-u11-l03-q07",
          "conceptTag": "relevance-selection",
          "reviewCardId": "reading-u11-l03-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which set contains only relevant notes?",
          "choices": [
            {
              "id": "a",
              "text": "colors, music, mascot"
            },
            {
              "id": "b",
              "text": "music, audit, colors"
            },
            {
              "id": "c",
              "text": "mascot, compost, music"
            },
            {
              "id": "d",
              "text": "portions, share table, compost, audit, posters"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Every item in the last set answers the question.",
          "id": "reading-u11-l03-q08",
          "conceptTag": "relevance-selection",
          "reviewCardId": "reading-u11-l03-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why does the compost note belong?",
          "choices": [
            {
              "id": "a",
              "text": "It describes diverting suitable scraps from trash"
            },
            {
              "id": "b",
              "text": "It mentions a green bin"
            },
            {
              "id": "c",
              "text": "Compost is popular"
            },
            {
              "id": "d",
              "text": "It is Note 3"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Its mechanism directly addresses waste.",
          "id": "reading-u11-l03-q09",
          "conceptTag": "relevance-reasoning",
          "reviewCardId": "reading-u11-l03-c3"
        },
        {
          "type": "true-false",
          "prompt": "“It is interesting” is enough justification for relevance.",
          "choices": [
            {
              "id": "true",
              "text": "True — interest decides"
            },
            {
              "id": "false",
              "text": "False — explain the link to the question"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "Relevance needs reasoning.",
          "id": "reading-u11-l03-q10",
          "conceptTag": "relevance-reasoning",
          "reviewCardId": "reading-u11-l03-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why does music not belong?",
          "choices": [
            {
              "id": "a",
              "text": "Music is never studied"
            },
            {
              "id": "b",
              "text": "It gives no food-waste action or effect"
            },
            {
              "id": "c",
              "text": "It happens Friday"
            },
            {
              "id": "d",
              "text": "It is enjoyable"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "It lacks a question link.",
          "id": "reading-u11-l03-q11",
          "conceptTag": "relevance-reasoning",
          "reviewCardId": "reading-u11-l03-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation best justifies posters?",
          "choices": [
            {
              "id": "a",
              "text": "Posters are colorful"
            },
            {
              "id": "b",
              "text": "Students read posters"
            },
            {
              "id": "c",
              "text": "They guide correct compost sorting, helping the waste-reduction action work"
            },
            {
              "id": "d",
              "text": "Every cafeteria needs posters"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It links detail to mechanism.",
          "id": "reading-u11-l03-q12",
          "conceptTag": "relevance-reasoning",
          "reviewCardId": "reading-u11-l03-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response demonstrates accurate selection?",
          "choices": [
            {
              "id": "a",
              "text": "Keep all true notes"
            },
            {
              "id": "b",
              "text": "Keep favorite notes"
            },
            {
              "id": "c",
              "text": "Reject measurements"
            },
            {
              "id": "d",
              "text": "Keep actions/measurements tied to waste and reject unrelated school facts"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It applies the exact relevance test.",
          "id": "reading-u11-l03-q13",
          "conceptTag": "relevance-reasoning",
          "reviewCardId": "reading-u11-l03-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u11-l04",
    "unitId": "reading-u11",
    "title": "Group Related Research Findings",
    "indicatorCodes": [
      "ELA.4.R.1.4"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Grouping turns scattered findings into an understandable pattern."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Categories need a defensible shared idea."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s place every note and synthesize each group without inventing an order."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u11-l04-c1",
        "title": "Identify Useful Categories",
        "blocks": [
          {
            "kind": "text",
            "text": "Choose category labels broad enough for several findings and precise enough to distinguish groups."
          },
          {
            "kind": "example",
            "text": "Visibility, crossings, and travel habits each fit three notes."
          },
          {
            "kind": "tip",
            "text": "Do not use one category per note."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which is a useful category?",
          "choices": [
            {
              "id": "a",
              "text": "Crossings"
            },
            {
              "id": "b",
              "text": "Things"
            },
            {
              "id": "c",
              "text": "Repaint one stripe"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It names a shared idea for three findings."
        }
      },
      {
        "id": "reading-u11-l04-c2",
        "title": "Place Findings with Their Group",
        "blocks": [
          {
            "kind": "text",
            "text": "Place a finding by its main relationship to the research topic."
          },
          {
            "kind": "example",
            "text": "Reflective backpacks fit visibility; crossing guard fits crossings; helmet practice fits travel habits."
          },
          {
            "kind": "example",
            "text": "Source snippet — C2: Repaint faded crosswalk stripes. Useful categories: Visibility — V1/V2/V3; Crossings — C1/C2/C3; Travel habits — T1/T2/T3."
          },
          {
            "kind": "tip",
            "text": "A note may connect broadly, but use the strongest supplied grouping."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Where does C2 belong?",
          "choices": [
            {
              "id": "a",
              "text": "Crossings"
            },
            {
              "id": "b",
              "text": "Visibility"
            },
            {
              "id": "c",
              "text": "Travel habits"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Repainting crosswalk stripes improves a crossing."
        }
      },
      {
        "id": "reading-u11-l04-c3",
        "title": "Name the Pattern in Each Group",
        "blocks": [
          {
            "kind": "text",
            "text": "Synthesis explains the pattern: what the grouped findings collectively show."
          },
          {
            "kind": "example",
            "text": "Visibility findings make people/signs easier to see; crossings organize safer crossing points; habits prepare travelers."
          },
          {
            "kind": "example",
            "text": "Source snippets — V1: Trim branches that block drivers’ view of a school-zone sign. V2: Add reflective material to backpacks for low-light visibility. V3: Use bright pavement markings near the school entrance."
          },
          {
            "kind": "tip",
            "text": "Keep claims proportional to the notes."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "What pattern unites V1–V3?",
          "choices": [
            {
              "id": "a",
              "text": "They improve visibility of signs, people, or route markings"
            },
            {
              "id": "b",
              "text": "They change crossing time"
            },
            {
              "id": "c",
              "text": "They teach bike signals only"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The synthesis covers all three."
        }
      }
    ],
    "workedExample": {
      "title": "Group nine findings without inventing an order",
      "passage": {
        "title": "Safer Routes to School",
        "text": "Safer Routes to School — nine invented finding cards\n\nV1: Trim branches that block drivers’ view of a school-zone sign.\nV2: Add reflective material to backpacks for low-light visibility.\nV3: Use bright pavement markings near the school entrance.\nC1: A crossing guard helps students use the busiest intersection.\nC2: Repaint faded crosswalk stripes.\nC3: Adjust a signal to provide enough crossing time after an approved traffic study.\nT1: Practice a consistent walking route with an adult.\nT2: Form a supervised walking group where families choose to participate.\nT3: Review helmet fit and hand signals before biking.\n\nUseful categories: Visibility — V1/V2/V3; Crossings — C1/C2/C3; Travel habits — T1/T2/T3. Categories group shared ideas; they do not have a correct first-to-last order. A synthesis names what each group collectively suggests without erasing differences among findings."
      },
      "steps": [
        "Name the shared idea of each category.",
        "Assign all nine cards once using their main relationship.",
        "Write one proportional synthesis sentence per group."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Safer Routes to School”",
        "text": "Safer Routes to School — nine invented finding cards\n\nV1: Trim branches that block drivers’ view of a school-zone sign.\nV2: Add reflective material to backpacks for low-light visibility.\nV3: Use bright pavement markings near the school entrance.\nC1: A crossing guard helps students use the busiest intersection.\nC2: Repaint faded crosswalk stripes.\nC3: Adjust a signal to provide enough crossing time after an approved traffic study.\nT1: Practice a consistent walking route with an adult.\nT2: Form a supervised walking group where families choose to participate.\nT3: Review helmet fit and hand signals before biking.\n\nUseful categories: Visibility — V1/V2/V3; Crossings — C1/C2/C3; Travel habits — T1/T2/T3. Categories group shared ideas; they do not have a correct first-to-last order. A synthesis names what each group collectively suggests without erasing differences among findings."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which set of categories is most useful?",
          "choices": [
            {
              "id": "a",
              "text": "Visibility, crossings, travel habits"
            },
            {
              "id": "b",
              "text": "Good, better, best"
            },
            {
              "id": "c",
              "text": "Morning, noon, night"
            },
            {
              "id": "d",
              "text": "Red, blue, green"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The labels describe the actual shared ideas.",
          "id": "reading-u11-l04-q01",
          "conceptTag": "finding-categories",
          "reviewCardId": "reading-u11-l04-c1"
        },
        {
          "type": "true-false",
          "prompt": "A useful category should include more than one related finding.",
          "choices": [
            {
              "id": "true",
              "text": "True — it groups shared ideas"
            },
            {
              "id": "false",
              "text": "False — use one label per note"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Grouping requires relationships.",
          "id": "reading-u11-l04-q02",
          "conceptTag": "finding-categories",
          "reviewCardId": "reading-u11-l04-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why is “Things” a weak category?",
          "choices": [
            {
              "id": "a",
              "text": "It is too short"
            },
            {
              "id": "b",
              "text": "It is plural"
            },
            {
              "id": "c",
              "text": "It does not identify a meaningful relationship"
            },
            {
              "id": "d",
              "text": "It comes first alphabetically"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The label lacks explanatory value.",
          "id": "reading-u11-l04-q03",
          "conceptTag": "finding-categories",
          "reviewCardId": "reading-u11-l04-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which category is not an ordered step?",
          "choices": [
            {
              "id": "a",
              "text": "First"
            },
            {
              "id": "b",
              "text": "Next"
            },
            {
              "id": "c",
              "text": "Finally"
            },
            {
              "id": "d",
              "text": "Visibility"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Categories need no sequence.",
          "id": "reading-u11-l04-q04",
          "conceptTag": "finding-categories",
          "reviewCardId": "reading-u11-l04-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Where does reflective backpack material belong?",
          "choices": [
            {
              "id": "a",
              "text": "Crossings"
            },
            {
              "id": "b",
              "text": "Visibility"
            },
            {
              "id": "c",
              "text": "Travel habits"
            },
            {
              "id": "d",
              "text": "Signals"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "It helps a person be seen.",
          "id": "reading-u11-l04-q05",
          "conceptTag": "grouped-findings",
          "reviewCardId": "reading-u11-l04-c2"
        },
        {
          "type": "true-false",
          "prompt": "A crossing guard and repainted crosswalk share the crossings category.",
          "choices": [
            {
              "id": "true",
              "text": "True — both concern crossing points"
            },
            {
              "id": "false",
              "text": "False — one is a person"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Shared concept can span different item kinds.",
          "id": "reading-u11-l04-q06",
          "conceptTag": "grouped-findings",
          "reviewCardId": "reading-u11-l04-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Where does helmet-fit practice belong?",
          "choices": [
            {
              "id": "a",
              "text": "Visibility only"
            },
            {
              "id": "b",
              "text": "Crossings only"
            },
            {
              "id": "c",
              "text": "Travel habits"
            },
            {
              "id": "d",
              "text": "Pavement"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It is a traveler preparation habit.",
          "id": "reading-u11-l04-q07",
          "conceptTag": "grouped-findings",
          "reviewCardId": "reading-u11-l04-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which assignment is accurate?",
          "choices": [
            {
              "id": "a",
              "text": "V1 to crossings"
            },
            {
              "id": "b",
              "text": "C1 to travel habits"
            },
            {
              "id": "c",
              "text": "T2 to visibility"
            },
            {
              "id": "d",
              "text": "C3 to crossings"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Signal crossing time belongs to crossings.",
          "id": "reading-u11-l04-q08",
          "conceptTag": "grouped-findings",
          "reviewCardId": "reading-u11-l04-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What do visibility findings collectively suggest?",
          "choices": [
            {
              "id": "a",
              "text": "Make signs, people, and route markings easier to see"
            },
            {
              "id": "b",
              "text": "Remove all trees"
            },
            {
              "id": "c",
              "text": "Require one backpack"
            },
            {
              "id": "d",
              "text": "Replace crossings"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It accurately synthesizes V1–V3.",
          "id": "reading-u11-l04-q09",
          "conceptTag": "group-synthesis",
          "reviewCardId": "reading-u11-l04-c3"
        },
        {
          "type": "true-false",
          "prompt": "A synthesis should preserve the evidence’s limits.",
          "choices": [
            {
              "id": "true",
              "text": "True — do not promise perfect safety"
            },
            {
              "id": "false",
              "text": "False — make absolute guarantees"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The notes propose supports, not guarantees.",
          "id": "reading-u11-l04-q10",
          "conceptTag": "group-synthesis",
          "reviewCardId": "reading-u11-l04-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which synthesis fits crossings?",
          "choices": [
            {
              "id": "a",
              "text": "Travelers need helmets"
            },
            {
              "id": "b",
              "text": "Staff, markings, and timing can support organized crossing points"
            },
            {
              "id": "c",
              "text": "Everything should be reflective"
            },
            {
              "id": "d",
              "text": "One route fits all"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "It covers C1–C3.",
          "id": "reading-u11-l04-q11",
          "conceptTag": "group-synthesis",
          "reviewCardId": "reading-u11-l04-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which synthesis fits travel habits?",
          "choices": [
            {
              "id": "a",
              "text": "Signals need paint"
            },
            {
              "id": "b",
              "text": "Branches block signs"
            },
            {
              "id": "c",
              "text": "Practice, supervision, and equipment checks can prepare travelers"
            },
            {
              "id": "d",
              "text": "Crosswalks need guards"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It covers T1–T3.",
          "id": "reading-u11-l04-q12",
          "conceptTag": "group-synthesis",
          "reviewCardId": "reading-u11-l04-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation best describes grouping?",
          "choices": [
            {
              "id": "a",
              "text": "Put notes in alphabetical order"
            },
            {
              "id": "b",
              "text": "Rank categories best to worst"
            },
            {
              "id": "c",
              "text": "Use one pile for all notes"
            },
            {
              "id": "d",
              "text": "Place related findings under a shared idea and explain the pattern"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It defines grouping and synthesis.",
          "id": "reading-u11-l04-q13",
          "conceptTag": "group-synthesis",
          "reviewCardId": "reading-u11-l04-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u11-l05",
    "unitId": "reading-u11",
    "title": "Cite Sources and Avoid Plagiarism",
    "indicatorCodes": [
      "ELA.4.R.1.5"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Researchers can quote or paraphrase, but both require credit."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "A citation identifies the source using a taught format."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s preserve meaning, mark exact words, and attribute every use."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u11-l05-c1",
        "title": "Distinguish Quoting and Paraphrasing",
        "blocks": [
          {
            "kind": "text",
            "text": "Quote exact words with quotation marks; paraphrase the idea in new structure and wording."
          },
          {
            "kind": "example",
            "text": "Faithful paraphrase: Chen explains that small boxes can feed bees when suitable flowers bloom at varied times."
          },
          {
            "kind": "example",
            "text": "Source text: “A shallow window box can offer nectar when it holds several locally suitable flowers that bloom at different times.”"
          },
          {
            "kind": "tip",
            "text": "Never present copied or lightly changed wording as your own."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which is a faithful paraphrase?",
          "choices": [
            {
              "id": "a",
              "text": "Chen says small boxes can support bees with suitable flowers blooming at different times"
            },
            {
              "id": "b",
              "text": "A shallow window box can offer nectar when it holds several locally suitable flowers"
            },
            {
              "id": "c",
              "text": "A shallow box can offer nectar when it has several suitable flowers"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It changes structure/wording while preserving meaning."
        }
      },
      {
        "id": "reading-u11-l05-c2",
        "title": "Build a Simple Source Citation",
        "blocks": [
          {
            "kind": "text",
            "text": "Use Author — Title — Publisher — Year for this lesson."
          },
          {
            "kind": "example",
            "text": "Every element is visible in the practice-source metadata."
          },
          {
            "kind": "example",
            "text": "Practice-source metadata — Author: Nia Chen. Title: Window Boxes for Native Bees. Publisher: Cram All Student Science Notes. Year: 2026."
          },
          {
            "kind": "tip",
            "text": "Do not invent a URL, date, or publisher."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "What comes after the title?",
          "choices": [
            {
              "id": "a",
              "text": "Cram All Student Science Notes"
            },
            {
              "id": "b",
              "text": "2026"
            },
            {
              "id": "c",
              "text": "Nia Chen"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The accepted order places publisher third."
        }
      },
      {
        "id": "reading-u11-l05-c3",
        "title": "Give Credit Every Time",
        "blocks": [
          {
            "kind": "text",
            "text": "Credit is required for quotations, paraphrases, and borrowed ideas."
          },
          {
            "kind": "example",
            "text": "Use a lead-in such as “According to Nia Chen” plus the citation."
          },
          {
            "kind": "tip",
            "text": "Self-check: exact words marked? meaning faithful? credit present?"
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "Does a paraphrase still need credit?",
          "choices": [
            {
              "id": "a",
              "text": "Yes, the idea came from the source"
            },
            {
              "id": "b",
              "text": "No, new wording erases the source"
            },
            {
              "id": "c",
              "text": "Only if it rhymes"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Attribution applies to borrowed ideas."
        }
      }
    ],
    "workedExample": {
      "title": "Quote, paraphrase, cite, and attribute",
      "passage": {
        "title": "Window Boxes for Native Bees",
        "text": "Invented practice source — not a real publication\n\nAuthor: Nia Chen\nTitle: Window Boxes for Native Bees\nPublisher: Cram All Student Science Notes\nYear: 2026\n\nSource text: “A shallow window box can offer nectar when it holds several locally suitable flowers that bloom at different times. Gardeners should choose plants for the available sunlight and avoid spraying insect killers on the blooms. Even a small planting needs regular care.”\n\nAccepted simple citation format: Nia Chen — Window Boxes for Native Bees — Cram All Student Science Notes — 2026.\n\nA quotation copies exact words inside quotation marks and names the source. A paraphrase restates the meaning in genuinely new wording and still names the source. Changing only one or two words is patchwriting, not a faithful independent paraphrase. Citation gives readers enough supplied metadata to identify the practice source."
      },
      "steps": [
        "Quote “avoid spraying insect killers on the blooms” with quotation marks.",
        "Paraphrase the bloom-timing idea in new syntax.",
        "Attach the exact four-part citation to either use."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Window Boxes for Native Bees”",
        "text": "Invented practice source — not a real publication\n\nAuthor: Nia Chen\nTitle: Window Boxes for Native Bees\nPublisher: Cram All Student Science Notes\nYear: 2026\n\nSource text: “A shallow window box can offer nectar when it holds several locally suitable flowers that bloom at different times. Gardeners should choose plants for the available sunlight and avoid spraying insect killers on the blooms. Even a small planting needs regular care.”\n\nAccepted simple citation format: Nia Chen — Window Boxes for Native Bees — Cram All Student Science Notes — 2026.\n\nA quotation copies exact words inside quotation marks and names the source. A paraphrase restates the meaning in genuinely new wording and still names the source. Changing only one or two words is patchwriting, not a faithful independent paraphrase. Citation gives readers enough supplied metadata to identify the practice source."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which option is a direct quotation?",
          "choices": [
            {
              "id": "a",
              "text": "“Even a small planting needs regular care.”"
            },
            {
              "id": "b",
              "text": "Chen says small plantings require ongoing care"
            },
            {
              "id": "c",
              "text": "Small gardens take work"
            },
            {
              "id": "d",
              "text": "Care matters"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Exact source words appear in quotation marks.",
          "id": "reading-u11-l05-q01",
          "conceptTag": "source-use",
          "reviewCardId": "reading-u11-l05-c1"
        },
        {
          "type": "true-false",
          "prompt": "A paraphrase must preserve the source meaning.",
          "choices": [
            {
              "id": "true",
              "text": "True — new wording cannot distort"
            },
            {
              "id": "false",
              "text": "False — change the claim freely"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Accuracy remains required.",
          "id": "reading-u11-l05-q02",
          "conceptTag": "source-use",
          "reviewCardId": "reading-u11-l05-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which is patchwriting rather than a strong paraphrase?",
          "choices": [
            {
              "id": "a",
              "text": "Chen explains that varied bloom times can feed bees"
            },
            {
              "id": "b",
              "text": "Small boxes may help when suitable flowers bloom across seasons"
            },
            {
              "id": "c",
              "text": "A shallow box can offer nectar when it has several suitable flowers that bloom at different times"
            },
            {
              "id": "d",
              "text": "According to Chen, plant timing affects nectar availability"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It closely copies structure and wording.",
          "id": "reading-u11-l05-q03",
          "conceptTag": "source-use",
          "reviewCardId": "reading-u11-l05-c1"
        },
        {
          "type": "fill-blank",
          "prompt": "Exact copied words belong inside quotation ___.",
          "acceptedAnswers": [
            "marks",
            "mark"
          ],
          "explanation": "Quotation marks identify exact wording.",
          "id": "reading-u11-l05-q04",
          "conceptTag": "source-use",
          "reviewCardId": "reading-u11-l05-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which citation follows the accepted format?",
          "choices": [
            {
              "id": "a",
              "text": "2026 — Chen — Notes — Window Boxes"
            },
            {
              "id": "b",
              "text": "Nia Chen — Window Boxes for Native Bees — Cram All Student Science Notes — 2026"
            },
            {
              "id": "c",
              "text": "Window Boxes — 2026"
            },
            {
              "id": "d",
              "text": "Cram All — Nia — Bees"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "It uses author, title, publisher, year.",
          "id": "reading-u11-l05-q05",
          "conceptTag": "citation-format",
          "reviewCardId": "reading-u11-l05-c2"
        },
        {
          "type": "true-false",
          "prompt": "The practice source is explicitly invented and must not be presented as a real publication.",
          "choices": [
            {
              "id": "true",
              "text": "True — the source label says so"
            },
            {
              "id": "false",
              "text": "False — the metadata proves it is real"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The lesson states its practice status.",
          "id": "reading-u11-l05-q06",
          "conceptTag": "citation-format",
          "reviewCardId": "reading-u11-l05-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which metadata is the publisher?",
          "choices": [
            {
              "id": "a",
              "text": "Nia Chen"
            },
            {
              "id": "b",
              "text": "Window Boxes for Native Bees"
            },
            {
              "id": "c",
              "text": "Cram All Student Science Notes"
            },
            {
              "id": "d",
              "text": "2026"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The source labels it publisher.",
          "id": "reading-u11-l05-q07",
          "conceptTag": "citation-format",
          "reviewCardId": "reading-u11-l05-c2"
        },
        {
          "type": "fill-blank",
          "prompt": "The final element in the accepted citation is the year ___.",
          "acceptedAnswers": [
            "2026"
          ],
          "explanation": "The supplied year is 2026.",
          "id": "reading-u11-l05-q08",
          "conceptTag": "citation-format",
          "reviewCardId": "reading-u11-l05-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Does a paraphrase need attribution?",
          "choices": [
            {
              "id": "a",
              "text": "Yes, because the idea comes from the source"
            },
            {
              "id": "b",
              "text": "No, because no exact words remain"
            },
            {
              "id": "c",
              "text": "Only if longer than a sentence"
            },
            {
              "id": "d",
              "text": "Only for real publications"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Ideas require credit too.",
          "id": "reading-u11-l05-q09",
          "conceptTag": "attribution-check",
          "reviewCardId": "reading-u11-l05-c3"
        },
        {
          "type": "true-false",
          "prompt": "Changing two words is always enough to avoid plagiarism.",
          "choices": [
            {
              "id": "true",
              "text": "True — two words makes it original"
            },
            {
              "id": "false",
              "text": "False — structure and wording must be genuinely new"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "Patchwriting remains too close.",
          "id": "reading-u11-l05-q10",
          "conceptTag": "attribution-check",
          "reviewCardId": "reading-u11-l05-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which use gives credit clearly?",
          "choices": [
            {
              "id": "a",
              "text": "Suitable flowers bloom at times"
            },
            {
              "id": "b",
              "text": "According to Nia Chen, varied bloom times can help a small box provide nectar, followed by the citation"
            },
            {
              "id": "c",
              "text": "Copy the sentence without marks"
            },
            {
              "id": "d",
              "text": "Write the idea as personal observation"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The lead-in and citation attribute it.",
          "id": "reading-u11-l05-q11",
          "conceptTag": "attribution-check",
          "reviewCardId": "reading-u11-l05-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which checklist is complete?",
          "choices": [
            {
              "id": "a",
              "text": "spelling only"
            },
            {
              "id": "b",
              "text": "title only"
            },
            {
              "id": "c",
              "text": "year guessed"
            },
            {
              "id": "d",
              "text": "exact words marked, paraphrase faithful, source credited"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It addresses ethical source use.",
          "id": "reading-u11-l05-q12",
          "conceptTag": "attribution-check",
          "reviewCardId": "reading-u11-l05-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why cite a source?",
          "choices": [
            {
              "id": "a",
              "text": "To make writing longer"
            },
            {
              "id": "b",
              "text": "To avoid reading"
            },
            {
              "id": "c",
              "text": "To prove every claim"
            },
            {
              "id": "d",
              "text": "To credit the creator and help readers identify the borrowed source"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Citation serves attribution and traceability.",
          "id": "reading-u11-l05-q13",
          "conceptTag": "attribution-check",
          "reviewCardId": "reading-u11-l05-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
```

### `src/content/reading/u11.test.ts`

```ts
import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit11Lessons } from './u11';

const expectedManifest = [
  {
    "id": "reading-u11-l01",
    "unitId": "reading-u11",
    "title": "Ask an Inquiry Question and Examine a Source",
    "indicatorCodes": [
      "ELA.4.R.1.1"
    ]
  },
  {
    "id": "reading-u11-l02",
    "unitId": "reading-u11",
    "title": "Judge the Credibility of a Provided Source",
    "indicatorCodes": [
      "ELA.4.R.1.2"
    ]
  },
  {
    "id": "reading-u11-l03",
    "unitId": "reading-u11",
    "title": "Select Information Relevant to a Topic",
    "indicatorCodes": [
      "ELA.4.R.1.3"
    ]
  },
  {
    "id": "reading-u11-l04",
    "unitId": "reading-u11",
    "title": "Group Related Research Findings",
    "indicatorCodes": [
      "ELA.4.R.1.4"
    ]
  },
  {
    "id": "reading-u11-l05",
    "unitId": "reading-u11",
    "title": "Cite Sources and Avoid Plagiarism",
    "indicatorCodes": [
      "ELA.4.R.1.5"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u11-l01",
    "cards": [
      {
        "id": "reading-u11-l01-c1",
        "title": "Focus an Inquiry Question",
        "conceptTag": "inquiry-question"
      },
      {
        "id": "reading-u11-l01-c2",
        "title": "Examine the Provided Source",
        "conceptTag": "source-examination"
      },
      {
        "id": "reading-u11-l01-c3",
        "title": "Record Question-Based Findings",
        "conceptTag": "inquiry-findings"
      }
    ]
  },
  {
    "id": "reading-u11-l02",
    "cards": [
      {
        "id": "reading-u11-l02-c1",
        "title": "Check Author and Publisher",
        "conceptTag": "source-authority"
      },
      {
        "id": "reading-u11-l02-c2",
        "title": "Check Date, Evidence, and Purpose",
        "conceptTag": "source-evidence"
      },
      {
        "id": "reading-u11-l02-c3",
        "title": "Make a Credibility Judgment",
        "conceptTag": "credibility-judgment"
      }
    ]
  },
  {
    "id": "reading-u11-l03",
    "cards": [
      {
        "id": "reading-u11-l03-c1",
        "title": "Define the Relevance Test",
        "conceptTag": "relevance-test"
      },
      {
        "id": "reading-u11-l03-c2",
        "title": "Select Relevant Information",
        "conceptTag": "relevance-selection"
      },
      {
        "id": "reading-u11-l03-c3",
        "title": "Explain Why a Detail Belongs",
        "conceptTag": "relevance-reasoning"
      }
    ]
  },
  {
    "id": "reading-u11-l04",
    "cards": [
      {
        "id": "reading-u11-l04-c1",
        "title": "Identify Useful Categories",
        "conceptTag": "finding-categories"
      },
      {
        "id": "reading-u11-l04-c2",
        "title": "Place Findings with Their Group",
        "conceptTag": "grouped-findings"
      },
      {
        "id": "reading-u11-l04-c3",
        "title": "Name the Pattern in Each Group",
        "conceptTag": "group-synthesis"
      }
    ]
  },
  {
    "id": "reading-u11-l05",
    "cards": [
      {
        "id": "reading-u11-l05-c1",
        "title": "Distinguish Quoting and Paraphrasing",
        "conceptTag": "source-use"
      },
      {
        "id": "reading-u11-l05-c2",
        "title": "Build a Simple Source Citation",
        "conceptTag": "citation-format"
      },
      {
        "id": "reading-u11-l05-c3",
        "title": "Give Credit Every Time",
        "conceptTag": "attribution-check"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u11-l01",
    "questions": [
      {
        "id": "reading-u11-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "inquiry-question",
        "reviewCardId": "reading-u11-l01-c1"
      },
      {
        "id": "reading-u11-l01-q02",
        "type": "true-false",
        "conceptTag": "inquiry-question",
        "reviewCardId": "reading-u11-l01-c1"
      },
      {
        "id": "reading-u11-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "inquiry-question",
        "reviewCardId": "reading-u11-l01-c1"
      },
      {
        "id": "reading-u11-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "inquiry-question",
        "reviewCardId": "reading-u11-l01-c1"
      },
      {
        "id": "reading-u11-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "source-examination",
        "reviewCardId": "reading-u11-l01-c2"
      },
      {
        "id": "reading-u11-l01-q06",
        "type": "true-false",
        "conceptTag": "source-examination",
        "reviewCardId": "reading-u11-l01-c2"
      },
      {
        "id": "reading-u11-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "source-examination",
        "reviewCardId": "reading-u11-l01-c2"
      },
      {
        "id": "reading-u11-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "source-examination",
        "reviewCardId": "reading-u11-l01-c2"
      },
      {
        "id": "reading-u11-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "inquiry-findings",
        "reviewCardId": "reading-u11-l01-c3"
      },
      {
        "id": "reading-u11-l01-q10",
        "type": "true-false",
        "conceptTag": "inquiry-findings",
        "reviewCardId": "reading-u11-l01-c3"
      },
      {
        "id": "reading-u11-l01-q11",
        "type": "sort",
        "conceptTag": "inquiry-findings",
        "reviewCardId": "reading-u11-l01-c3"
      },
      {
        "id": "reading-u11-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "inquiry-findings",
        "reviewCardId": "reading-u11-l01-c3"
      },
      {
        "id": "reading-u11-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "inquiry-findings",
        "reviewCardId": "reading-u11-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u11-l02",
    "questions": [
      {
        "id": "reading-u11-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "source-authority",
        "reviewCardId": "reading-u11-l02-c1"
      },
      {
        "id": "reading-u11-l02-q02",
        "type": "true-false",
        "conceptTag": "source-authority",
        "reviewCardId": "reading-u11-l02-c1"
      },
      {
        "id": "reading-u11-l02-q03",
        "type": "multiple-choice",
        "conceptTag": "source-authority",
        "reviewCardId": "reading-u11-l02-c1"
      },
      {
        "id": "reading-u11-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "source-authority",
        "reviewCardId": "reading-u11-l02-c1"
      },
      {
        "id": "reading-u11-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "source-evidence",
        "reviewCardId": "reading-u11-l02-c2"
      },
      {
        "id": "reading-u11-l02-q06",
        "type": "true-false",
        "conceptTag": "source-evidence",
        "reviewCardId": "reading-u11-l02-c2"
      },
      {
        "id": "reading-u11-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "source-evidence",
        "reviewCardId": "reading-u11-l02-c2"
      },
      {
        "id": "reading-u11-l02-q08",
        "type": "multiple-choice",
        "conceptTag": "source-evidence",
        "reviewCardId": "reading-u11-l02-c2"
      },
      {
        "id": "reading-u11-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "credibility-judgment",
        "reviewCardId": "reading-u11-l02-c3"
      },
      {
        "id": "reading-u11-l02-q10",
        "type": "true-false",
        "conceptTag": "credibility-judgment",
        "reviewCardId": "reading-u11-l02-c3"
      },
      {
        "id": "reading-u11-l02-q11",
        "type": "multiple-choice",
        "conceptTag": "credibility-judgment",
        "reviewCardId": "reading-u11-l02-c3"
      },
      {
        "id": "reading-u11-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "credibility-judgment",
        "reviewCardId": "reading-u11-l02-c3"
      },
      {
        "id": "reading-u11-l02-q13",
        "type": "multiple-choice",
        "conceptTag": "credibility-judgment",
        "reviewCardId": "reading-u11-l02-c3"
      }
    ]
  },
  {
    "id": "reading-u11-l03",
    "questions": [
      {
        "id": "reading-u11-l03-q01",
        "type": "multiple-choice",
        "conceptTag": "relevance-test",
        "reviewCardId": "reading-u11-l03-c1"
      },
      {
        "id": "reading-u11-l03-q02",
        "type": "true-false",
        "conceptTag": "relevance-test",
        "reviewCardId": "reading-u11-l03-c1"
      },
      {
        "id": "reading-u11-l03-q03",
        "type": "multiple-choice",
        "conceptTag": "relevance-test",
        "reviewCardId": "reading-u11-l03-c1"
      },
      {
        "id": "reading-u11-l03-q04",
        "type": "multiple-choice",
        "conceptTag": "relevance-test",
        "reviewCardId": "reading-u11-l03-c1"
      },
      {
        "id": "reading-u11-l03-q05",
        "type": "multiple-choice",
        "conceptTag": "relevance-selection",
        "reviewCardId": "reading-u11-l03-c2"
      },
      {
        "id": "reading-u11-l03-q06",
        "type": "true-false",
        "conceptTag": "relevance-selection",
        "reviewCardId": "reading-u11-l03-c2"
      },
      {
        "id": "reading-u11-l03-q07",
        "type": "multiple-choice",
        "conceptTag": "relevance-selection",
        "reviewCardId": "reading-u11-l03-c2"
      },
      {
        "id": "reading-u11-l03-q08",
        "type": "multiple-choice",
        "conceptTag": "relevance-selection",
        "reviewCardId": "reading-u11-l03-c2"
      },
      {
        "id": "reading-u11-l03-q09",
        "type": "multiple-choice",
        "conceptTag": "relevance-reasoning",
        "reviewCardId": "reading-u11-l03-c3"
      },
      {
        "id": "reading-u11-l03-q10",
        "type": "true-false",
        "conceptTag": "relevance-reasoning",
        "reviewCardId": "reading-u11-l03-c3"
      },
      {
        "id": "reading-u11-l03-q11",
        "type": "multiple-choice",
        "conceptTag": "relevance-reasoning",
        "reviewCardId": "reading-u11-l03-c3"
      },
      {
        "id": "reading-u11-l03-q12",
        "type": "multiple-choice",
        "conceptTag": "relevance-reasoning",
        "reviewCardId": "reading-u11-l03-c3"
      },
      {
        "id": "reading-u11-l03-q13",
        "type": "multiple-choice",
        "conceptTag": "relevance-reasoning",
        "reviewCardId": "reading-u11-l03-c3"
      }
    ]
  },
  {
    "id": "reading-u11-l04",
    "questions": [
      {
        "id": "reading-u11-l04-q01",
        "type": "multiple-choice",
        "conceptTag": "finding-categories",
        "reviewCardId": "reading-u11-l04-c1"
      },
      {
        "id": "reading-u11-l04-q02",
        "type": "true-false",
        "conceptTag": "finding-categories",
        "reviewCardId": "reading-u11-l04-c1"
      },
      {
        "id": "reading-u11-l04-q03",
        "type": "multiple-choice",
        "conceptTag": "finding-categories",
        "reviewCardId": "reading-u11-l04-c1"
      },
      {
        "id": "reading-u11-l04-q04",
        "type": "multiple-choice",
        "conceptTag": "finding-categories",
        "reviewCardId": "reading-u11-l04-c1"
      },
      {
        "id": "reading-u11-l04-q05",
        "type": "multiple-choice",
        "conceptTag": "grouped-findings",
        "reviewCardId": "reading-u11-l04-c2"
      },
      {
        "id": "reading-u11-l04-q06",
        "type": "true-false",
        "conceptTag": "grouped-findings",
        "reviewCardId": "reading-u11-l04-c2"
      },
      {
        "id": "reading-u11-l04-q07",
        "type": "multiple-choice",
        "conceptTag": "grouped-findings",
        "reviewCardId": "reading-u11-l04-c2"
      },
      {
        "id": "reading-u11-l04-q08",
        "type": "multiple-choice",
        "conceptTag": "grouped-findings",
        "reviewCardId": "reading-u11-l04-c2"
      },
      {
        "id": "reading-u11-l04-q09",
        "type": "multiple-choice",
        "conceptTag": "group-synthesis",
        "reviewCardId": "reading-u11-l04-c3"
      },
      {
        "id": "reading-u11-l04-q10",
        "type": "true-false",
        "conceptTag": "group-synthesis",
        "reviewCardId": "reading-u11-l04-c3"
      },
      {
        "id": "reading-u11-l04-q11",
        "type": "multiple-choice",
        "conceptTag": "group-synthesis",
        "reviewCardId": "reading-u11-l04-c3"
      },
      {
        "id": "reading-u11-l04-q12",
        "type": "multiple-choice",
        "conceptTag": "group-synthesis",
        "reviewCardId": "reading-u11-l04-c3"
      },
      {
        "id": "reading-u11-l04-q13",
        "type": "multiple-choice",
        "conceptTag": "group-synthesis",
        "reviewCardId": "reading-u11-l04-c3"
      }
    ]
  },
  {
    "id": "reading-u11-l05",
    "questions": [
      {
        "id": "reading-u11-l05-q01",
        "type": "multiple-choice",
        "conceptTag": "source-use",
        "reviewCardId": "reading-u11-l05-c1"
      },
      {
        "id": "reading-u11-l05-q02",
        "type": "true-false",
        "conceptTag": "source-use",
        "reviewCardId": "reading-u11-l05-c1"
      },
      {
        "id": "reading-u11-l05-q03",
        "type": "multiple-choice",
        "conceptTag": "source-use",
        "reviewCardId": "reading-u11-l05-c1"
      },
      {
        "id": "reading-u11-l05-q04",
        "type": "fill-blank",
        "conceptTag": "source-use",
        "reviewCardId": "reading-u11-l05-c1"
      },
      {
        "id": "reading-u11-l05-q05",
        "type": "multiple-choice",
        "conceptTag": "citation-format",
        "reviewCardId": "reading-u11-l05-c2"
      },
      {
        "id": "reading-u11-l05-q06",
        "type": "true-false",
        "conceptTag": "citation-format",
        "reviewCardId": "reading-u11-l05-c2"
      },
      {
        "id": "reading-u11-l05-q07",
        "type": "multiple-choice",
        "conceptTag": "citation-format",
        "reviewCardId": "reading-u11-l05-c2"
      },
      {
        "id": "reading-u11-l05-q08",
        "type": "fill-blank",
        "conceptTag": "citation-format",
        "reviewCardId": "reading-u11-l05-c2"
      },
      {
        "id": "reading-u11-l05-q09",
        "type": "multiple-choice",
        "conceptTag": "attribution-check",
        "reviewCardId": "reading-u11-l05-c3"
      },
      {
        "id": "reading-u11-l05-q10",
        "type": "true-false",
        "conceptTag": "attribution-check",
        "reviewCardId": "reading-u11-l05-c3"
      },
      {
        "id": "reading-u11-l05-q11",
        "type": "multiple-choice",
        "conceptTag": "attribution-check",
        "reviewCardId": "reading-u11-l05-c3"
      },
      {
        "id": "reading-u11-l05-q12",
        "type": "multiple-choice",
        "conceptTag": "attribution-check",
        "reviewCardId": "reading-u11-l05-c3"
      },
      {
        "id": "reading-u11-l05-q13",
        "type": "multiple-choice",
        "conceptTag": "attribution-check",
        "reviewCardId": "reading-u11-l05-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u11-l01",
    "checks": [
      {
        "cardId": "reading-u11-l01-c1",
        "check": {
          "prompt": "Which question fits this source?",
          "choices": [
            {
              "id": "a",
              "text": "What features help a schoolyard pollinator patch?"
            },
            {
              "id": "b",
              "text": "What is everything about insects?"
            },
            {
              "id": "c",
              "text": "Which exact bees visit next year?"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The packet directly supplies design features."
        }
      },
      {
        "cardId": "reading-u11-l01-c2",
        "check": {
          "prompt": "Which heading addresses blooms across months?",
          "choices": [
            {
              "id": "a",
              "text": "Flower timing"
            },
            {
              "id": "b",
              "text": "Care"
            },
            {
              "id": "c",
              "text": "Limits"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That section states spring through early fall."
        }
      },
      {
        "cardId": "reading-u11-l01-c3",
        "check": {
          "prompt": "Which is a supported finding?",
          "choices": [
            {
              "id": "a",
              "text": "Different bloom times can extend food availability"
            },
            {
              "id": "b",
              "text": "Every pollinator species will arrive"
            },
            {
              "id": "c",
              "text": "Dirty standing water is ideal"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The source states the timing benefit and avoids guarantees."
        }
      }
    ]
  },
  {
    "id": "reading-u11-l02",
    "checks": [
      {
        "cardId": "reading-u11-l02-c1",
        "check": {
          "prompt": "Which record supplies both author and publisher?",
          "choices": [
            {
              "id": "a",
              "text": "Source B"
            },
            {
              "id": "b",
              "text": "Source A"
            },
            {
              "id": "c",
              "text": "Source C"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The record names Dr. Ortiz and Sample County Extension."
        }
      },
      {
        "cardId": "reading-u11-l02-c2",
        "check": {
          "prompt": "Which source gives checkable claims?",
          "choices": [
            {
              "id": "a",
              "text": "Source B"
            },
            {
              "id": "b",
              "text": "Source A"
            },
            {
              "id": "c",
              "text": "Source C"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Its standing-water claims can be examined."
        }
      },
      {
        "cardId": "reading-u11-l02-c3",
        "check": {
          "prompt": "Which is most credible for prevention here?",
          "choices": [
            {
              "id": "a",
              "text": "Source B"
            },
            {
              "id": "b",
              "text": "Source A because it is surprising"
            },
            {
              "id": "c",
              "text": "Source C because it says share"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It alone satisfies all four visible criteria."
        }
      }
    ]
  },
  {
    "id": "reading-u11-l03",
    "checks": [
      {
        "cardId": "reading-u11-l03-c1",
        "check": {
          "prompt": "Which detail passes the relevance test?",
          "choices": [
            {
              "id": "a",
              "text": "offer smaller first portions"
            },
            {
              "id": "b",
              "text": "school colors are blue and silver"
            },
            {
              "id": "c",
              "text": "music plays Friday"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It names an action tied to less untouched food."
        }
      },
      {
        "cardId": "reading-u11-l03-c2",
        "check": {
          "prompt": "Why is a waste audit relevant?",
          "choices": [
            {
              "id": "a",
              "text": "It identifies commonly discarded foods for action"
            },
            {
              "id": "b",
              "text": "It changes school colors"
            },
            {
              "id": "c",
              "text": "It selects music"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The measurement informs waste reduction."
        }
      },
      {
        "cardId": "reading-u11-l03-c3",
        "check": {
          "prompt": "Which explanation is complete?",
          "choices": [
            {
              "id": "a",
              "text": "Share tables may redirect approved unopened food, so they address reducing waste"
            },
            {
              "id": "b",
              "text": "Share tables are nice"
            },
            {
              "id": "c",
              "text": "Lunch is important"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It connects mechanism to question."
        }
      }
    ]
  },
  {
    "id": "reading-u11-l04",
    "checks": [
      {
        "cardId": "reading-u11-l04-c1",
        "check": {
          "prompt": "Which is a useful category?",
          "choices": [
            {
              "id": "a",
              "text": "Crossings"
            },
            {
              "id": "b",
              "text": "Things"
            },
            {
              "id": "c",
              "text": "Repaint one stripe"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It names a shared idea for three findings."
        }
      },
      {
        "cardId": "reading-u11-l04-c2",
        "check": {
          "prompt": "Where does C2 belong?",
          "choices": [
            {
              "id": "a",
              "text": "Crossings"
            },
            {
              "id": "b",
              "text": "Visibility"
            },
            {
              "id": "c",
              "text": "Travel habits"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Repainting crosswalk stripes improves a crossing."
        }
      },
      {
        "cardId": "reading-u11-l04-c3",
        "check": {
          "prompt": "What pattern unites V1–V3?",
          "choices": [
            {
              "id": "a",
              "text": "They improve visibility of signs, people, or route markings"
            },
            {
              "id": "b",
              "text": "They change crossing time"
            },
            {
              "id": "c",
              "text": "They teach bike signals only"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The synthesis covers all three."
        }
      }
    ]
  },
  {
    "id": "reading-u11-l05",
    "checks": [
      {
        "cardId": "reading-u11-l05-c1",
        "check": {
          "prompt": "Which is a faithful paraphrase?",
          "choices": [
            {
              "id": "a",
              "text": "Chen says small boxes can support bees with suitable flowers blooming at different times"
            },
            {
              "id": "b",
              "text": "A shallow window box can offer nectar when it holds several locally suitable flowers"
            },
            {
              "id": "c",
              "text": "A shallow box can offer nectar when it has several suitable flowers"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It changes structure/wording while preserving meaning."
        }
      },
      {
        "cardId": "reading-u11-l05-c2",
        "check": {
          "prompt": "What comes after the title?",
          "choices": [
            {
              "id": "a",
              "text": "Cram All Student Science Notes"
            },
            {
              "id": "b",
              "text": "2026"
            },
            {
              "id": "c",
              "text": "Nia Chen"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The accepted order places publisher third."
        }
      },
      {
        "cardId": "reading-u11-l05-c3",
        "check": {
          "prompt": "Does a paraphrase still need credit?",
          "choices": [
            {
              "id": "a",
              "text": "Yes, the idea came from the source"
            },
            {
              "id": "b",
              "text": "No, new wording erases the source"
            },
            {
              "id": "c",
              "text": "Only if it rhymes"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Attribution applies to borrowed ideas."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u11-l01",
    "widgets": []
  },
  {
    "id": "reading-u11-l02",
    "widgets": [
      {
        "cardId": "reading-u11-l02-c3",
        "ref": {
          "type": "source-credibility-checker",
          "config": {
            "sources": [
              {
                "id": "blog",
                "title": "Mosquito Myths Blog",
                "author": "Kai Reed",
                "date": "2024",
                "purpose": "entertain with surprising claims",
                "claims": []
              },
              {
                "id": "extension",
                "title": "County Extension Mosquito Guide",
                "author": "Dr. Lena Ortiz",
                "date": "2026",
                "publisher": "Sample County Extension",
                "purpose": "explain mosquito prevention",
                "claims": [
                  "Standing water can become mosquito habitat.",
                  "Empty small containers after rain."
                ]
              },
              {
                "id": "screenshot",
                "title": "Mystery Screenshot",
                "claims": []
              }
            ],
            "criteria": [
              "author",
              "evidence",
              "date",
              "purpose"
            ],
            "credibleIds": [
              "extension"
            ]
          }
        }
      }
    ]
  },
  {
    "id": "reading-u11-l03",
    "widgets": []
  },
  {
    "id": "reading-u11-l04",
    "widgets": []
  },
  {
    "id": "reading-u11-l05",
    "widgets": []
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u11-l01",
    "passage": {
      "title": "Schoolyard Pollinator Patch: Planning Notes",
      "text": "Schoolyard Pollinator Patch: Planning Notes — invented Cram All practice source\n\nInquiry question: What features help a small schoolyard patch serve pollinators?\n\nFlower timing: Include several plant kinds so some flowers bloom in spring, summer, and early fall. A longer bloom season can provide nectar or pollen across more months.\n\nPlant choice: Native flowering plants are adapted to local conditions and can support local insects. Choose plants appropriate for the patch’s sunlight and soil.\n\nShelter and water: Leave a few hollow stems or small bare-soil areas where appropriate. A shallow water dish needs stones for landing and regular cleaning; standing dirty water is not helpful.\n\nCare: Avoid spraying broad insect killers in the patch. Remove invasive plants, water new plants as needed, and observe visitors without touching them.\n\nLimits: This source describes design features. It does not count which pollinator species will arrive or guarantee that every feature works equally at every site."
    },
    "reference": {
      "title": "Read “Schoolyard Pollinator Patch: Planning Notes”",
      "text": "Schoolyard Pollinator Patch: Planning Notes — invented Cram All practice source\n\nInquiry question: What features help a small schoolyard patch serve pollinators?\n\nFlower timing: Include several plant kinds so some flowers bloom in spring, summer, and early fall. A longer bloom season can provide nectar or pollen across more months.\n\nPlant choice: Native flowering plants are adapted to local conditions and can support local insects. Choose plants appropriate for the patch’s sunlight and soil.\n\nShelter and water: Leave a few hollow stems or small bare-soil areas where appropriate. A shallow water dish needs stones for landing and regular cleaning; standing dirty water is not helpful.\n\nCare: Avoid spraying broad insect killers in the patch. Remove invasive plants, water new plants as needed, and observe visitors without touching them.\n\nLimits: This source describes design features. It does not count which pollinator species will arrive or guarantee that every feature works equally at every site."
    },
    "evidence": [
      "Flower timing",
      "Plant choice",
      "Limits"
    ]
  },
  {
    "id": "reading-u11-l02",
    "passage": {
      "title": "Three invented Cram All practice source records",
      "text": "Three invented Cram All practice source records\n\nSource A — Mosquito Myths Blog. Author: Kai Reed. Date: 2024. Publisher: not supplied. Purpose: entertain with surprising claims. Evidence notes: none supplied. Excerpt: “My secret leaf trick chases every mosquito forever!”\n\nSource B — County Extension Mosquito Guide. Author: Dr. Lena Ortiz, entomology educator. Date: 2026. Publisher: Sample County Extension. Purpose: explain mosquito prevention. Evidence notes: cites local monitoring guidance and gives checkable actions. Claims: “Standing water can become mosquito habitat. Empty small containers after rain.”\n\nSource C — Mystery Screenshot. Author: not supplied. Date: not supplied. Publisher: not supplied. Purpose: unclear. Evidence notes: none. Excerpt: “Share this now!”\n\nThese records are invented for practice. A credible judgment uses visible authorship/publisher, evidence, date context, and purpose together. A recent date, polished screen, or official-sounding name alone is not proof."
    },
    "reference": {
      "title": "Read “Three invented Cram All practice source records”",
      "text": "Three invented Cram All practice source records\n\nSource A — Mosquito Myths Blog. Author: Kai Reed. Date: 2024. Publisher: not supplied. Purpose: entertain with surprising claims. Evidence notes: none supplied. Excerpt: “My secret leaf trick chases every mosquito forever!”\n\nSource B — County Extension Mosquito Guide. Author: Dr. Lena Ortiz, entomology educator. Date: 2026. Publisher: Sample County Extension. Purpose: explain mosquito prevention. Evidence notes: cites local monitoring guidance and gives checkable actions. Claims: “Standing water can become mosquito habitat. Empty small containers after rain.”\n\nSource C — Mystery Screenshot. Author: not supplied. Date: not supplied. Publisher: not supplied. Purpose: unclear. Evidence notes: none. Excerpt: “Share this now!”\n\nThese records are invented for practice. A credible judgment uses visible authorship/publisher, evidence, date context, and purpose together. A recent date, polished screen, or official-sounding name alone is not proof."
    },
    "evidence": [
      "Mosquito Myths Blog",
      "County Extension Mosquito Guide",
      "Mystery Screenshot"
    ]
  },
  {
    "id": "reading-u11-l03",
    "passage": {
      "title": "Reducing Cafeteria Food Waste",
      "text": "Reducing Cafeteria Food Waste — invented research notes\n\nResearch question: Which school actions can reduce cafeteria food waste?\n\nNote 1: Letting students request a smaller first portion can reduce untouched food.\nNote 2: A supervised share table may allow unopened approved items to be used by another student, following school rules.\nNote 3: Separating suitable scraps for a managed compost program can divert some waste from trash.\nNote 4: A one-week waste audit can identify which foods are discarded most often.\nNote 5: The school colors are blue and silver.\nNote 6: Music plays in the lunchroom on Fridays.\nNote 7: The mascot was chosen twenty years ago.\nNote 8: Posters can remind students which bin accepts compostable scraps.\n\nA fact can be true and still irrelevant. Relevance asks whether the information helps answer the exact topic/question, not whether the reader likes it."
    },
    "reference": {
      "title": "Read “Reducing Cafeteria Food Waste”",
      "text": "Reducing Cafeteria Food Waste — invented research notes\n\nResearch question: Which school actions can reduce cafeteria food waste?\n\nNote 1: Letting students request a smaller first portion can reduce untouched food.\nNote 2: A supervised share table may allow unopened approved items to be used by another student, following school rules.\nNote 3: Separating suitable scraps for a managed compost program can divert some waste from trash.\nNote 4: A one-week waste audit can identify which foods are discarded most often.\nNote 5: The school colors are blue and silver.\nNote 6: Music plays in the lunchroom on Fridays.\nNote 7: The mascot was chosen twenty years ago.\nNote 8: Posters can remind students which bin accepts compostable scraps.\n\nA fact can be true and still irrelevant. Relevance asks whether the information helps answer the exact topic/question, not whether the reader likes it."
    },
    "evidence": [
      "smaller first portion",
      "school colors",
      "waste audit"
    ]
  },
  {
    "id": "reading-u11-l04",
    "passage": {
      "title": "Safer Routes to School",
      "text": "Safer Routes to School — nine invented finding cards\n\nV1: Trim branches that block drivers’ view of a school-zone sign.\nV2: Add reflective material to backpacks for low-light visibility.\nV3: Use bright pavement markings near the school entrance.\nC1: A crossing guard helps students use the busiest intersection.\nC2: Repaint faded crosswalk stripes.\nC3: Adjust a signal to provide enough crossing time after an approved traffic study.\nT1: Practice a consistent walking route with an adult.\nT2: Form a supervised walking group where families choose to participate.\nT3: Review helmet fit and hand signals before biking.\n\nUseful categories: Visibility — V1/V2/V3; Crossings — C1/C2/C3; Travel habits — T1/T2/T3. Categories group shared ideas; they do not have a correct first-to-last order. A synthesis names what each group collectively suggests without erasing differences among findings."
    },
    "reference": {
      "title": "Read “Safer Routes to School”",
      "text": "Safer Routes to School — nine invented finding cards\n\nV1: Trim branches that block drivers’ view of a school-zone sign.\nV2: Add reflective material to backpacks for low-light visibility.\nV3: Use bright pavement markings near the school entrance.\nC1: A crossing guard helps students use the busiest intersection.\nC2: Repaint faded crosswalk stripes.\nC3: Adjust a signal to provide enough crossing time after an approved traffic study.\nT1: Practice a consistent walking route with an adult.\nT2: Form a supervised walking group where families choose to participate.\nT3: Review helmet fit and hand signals before biking.\n\nUseful categories: Visibility — V1/V2/V3; Crossings — C1/C2/C3; Travel habits — T1/T2/T3. Categories group shared ideas; they do not have a correct first-to-last order. A synthesis names what each group collectively suggests without erasing differences among findings."
    },
    "evidence": [
      "V1:",
      "C1:",
      "T1:"
    ]
  },
  {
    "id": "reading-u11-l05",
    "passage": {
      "title": "Window Boxes for Native Bees",
      "text": "Invented practice source — not a real publication\n\nAuthor: Nia Chen\nTitle: Window Boxes for Native Bees\nPublisher: Cram All Student Science Notes\nYear: 2026\n\nSource text: “A shallow window box can offer nectar when it holds several locally suitable flowers that bloom at different times. Gardeners should choose plants for the available sunlight and avoid spraying insect killers on the blooms. Even a small planting needs regular care.”\n\nAccepted simple citation format: Nia Chen — Window Boxes for Native Bees — Cram All Student Science Notes — 2026.\n\nA quotation copies exact words inside quotation marks and names the source. A paraphrase restates the meaning in genuinely new wording and still names the source. Changing only one or two words is patchwriting, not a faithful independent paraphrase. Citation gives readers enough supplied metadata to identify the practice source."
    },
    "reference": {
      "title": "Read “Window Boxes for Native Bees”",
      "text": "Invented practice source — not a real publication\n\nAuthor: Nia Chen\nTitle: Window Boxes for Native Bees\nPublisher: Cram All Student Science Notes\nYear: 2026\n\nSource text: “A shallow window box can offer nectar when it holds several locally suitable flowers that bloom at different times. Gardeners should choose plants for the available sunlight and avoid spraying insect killers on the blooms. Even a small planting needs regular care.”\n\nAccepted simple citation format: Nia Chen — Window Boxes for Native Bees — Cram All Student Science Notes — 2026.\n\nA quotation copies exact words inside quotation marks and names the source. A paraphrase restates the meaning in genuinely new wording and still names the source. Changing only one or two words is patchwriting, not a faithful independent paraphrase. Citation gives readers enough supplied metadata to identify the practice source."
    },
    "evidence": [
      "Nia Chen",
      "Cram All Student Science Notes",
      "not a real publication"
    ]
  }
] as const;
const expectedVisiblePriorSnippets = [
  { cardId: 'reading-u11-l01-c1', snippets: ['What features help a small schoolyard patch serve pollinators?'] },
  { cardId: 'reading-u11-l01-c2', snippets: ['The source covers flower timing, plant choice, shelter/water, care, and limits.'] },
  { cardId: 'reading-u11-l01-c3', snippets: ['Staggered blooms, suitable native plants, safe shelter/water, and careful maintenance answer the inquiry.'] },
  { cardId: 'reading-u11-l02-c1', snippets: ['Source B supplies an author role and publisher; A lacks a publisher; C lacks both.'] },
  { cardId: 'reading-u11-l02-c2', snippets: ['B gives checkable prevention actions and explanatory purpose; A entertains without evidence.'] },
  { cardId: 'reading-u11-l02-c3', snippets: ['Only B meets author, evidence, date, and purpose in the supplied exercise.'] },
  {
    cardId: 'reading-u11-l03-c1',
    snippets: [
      'Note 1: Letting students request a smaller first portion can reduce untouched food.',
      'Note 5: The school colors are blue and silver.',
      'Note 6: Music plays in the lunchroom on Fridays.',
    ],
  },
  { cardId: 'reading-u11-l03-c2', snippets: ['Note 4: A one-week waste audit can identify which foods are discarded most often.'] },
  { cardId: 'reading-u11-l03-c3', snippets: ['Note 2: A supervised share table may allow unopened approved items to be used by another student, following school rules.'] },
  { cardId: 'reading-u11-l04-c1', snippets: ['Visibility, crossings, and travel habits each fit three notes.'] },
  {
    cardId: 'reading-u11-l04-c2',
    snippets: [
      'C2: Repaint faded crosswalk stripes.',
      'Useful categories: Visibility — V1/V2/V3; Crossings — C1/C2/C3; Travel habits — T1/T2/T3.',
    ],
  },
  {
    cardId: 'reading-u11-l04-c3',
    snippets: [
      'V1: Trim branches that block drivers’ view of a school-zone sign.',
      'V2: Add reflective material to backpacks for low-light visibility.',
      'V3: Use bright pavement markings near the school entrance.',
    ],
  },
  {
    cardId: 'reading-u11-l05-c1',
    snippets: ['Source text: “A shallow window box can offer nectar when it holds several locally suitable flowers that bloom at different times.”'],
  },
  {
    cardId: 'reading-u11-l05-c2',
    snippets: [
      'Author: Nia Chen',
      'Title: Window Boxes for Native Bees',
      'Publisher: Cram All Student Science Notes',
      'Year: 2026',
    ],
  },
  { cardId: 'reading-u11-l05-c3', snippets: ['Credit is required for quotations, paraphrases, and borrowed ideas.'] },
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 11 literal content', () => {
  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit11Lessons, expectedManifest, 'reading');
    expect(unit11Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit11Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit11Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit11Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit11Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit11Lessons) {
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

  test('places every source snippet needed by an inline check in its current card first', () => {
    const cards = new Map(unit11Lessons.flatMap(lesson=>lesson.learnCards.map(card=>[card.id,card] as const)));
    expect(expectedVisiblePriorSnippets).toHaveLength(15);
    for (const { cardId, snippets } of expectedVisiblePriorSnippets) {
      const card = cards.get(cardId);
      expect(card?.check).toBeDefined();
      const visiblePriorMaterial = card?.blocks.map(block=>block.text).join('\n') ?? '';
      for (const snippet of snippets) expect(visiblePriorMaterial).toContain(snippet);
    }
  });

  test('keeps exact pools, unique visible answers, balanced MC keys, and solo framing', () => {
    for (const lesson of unit11Lessons) {
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

### Task 2: reading-u11-l01 — Ask an Inquiry Question and Examine a Source

**Files:** Create `src/content/reading/u11.ts`, `src/content/reading/u11.test.ts`.

**Consumes:** The complete final `u11.ts` and `u11.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u11-l01` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u11.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, `expectedSources`, and `expectedVisiblePriorSnippets`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u11.test.ts`; expect a missing-module failure.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u11-l01` object from the final `u11.ts` literal through the end of `reading-u11-l01-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u11.ts src/content/reading/u11.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u11.ts src/content/reading/u11.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u11-l01 ask an inquiry question and examine a source"`.

### Task 3: reading-u11-l02 — Judge the Credibility of a Provided Source

**Files:** Modify `src/content/reading/u11.ts`, `src/content/reading/u11.test.ts`.

**Consumes:** The complete final `u11.ts` and `u11.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u11-l02` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u11.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, `expectedSources`, and `expectedVisiblePriorSnippets`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u11.test.ts`; expect the exact expected lesson count to exceed the current export by one.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u11-l02` object from the final `u11.ts` literal through the end of `reading-u11-l02-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u11.ts src/content/reading/u11.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u11.ts src/content/reading/u11.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u11-l02 judge the credibility of a provided source"`.

### Task 4: reading-u11-l03 — Select Information Relevant to a Topic

**Files:** Modify `src/content/reading/u11.ts`, `src/content/reading/u11.test.ts`.

**Consumes:** The complete final `u11.ts` and `u11.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u11-l03` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u11.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, `expectedSources`, and `expectedVisiblePriorSnippets`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u11.test.ts`; expect the exact expected lesson count to exceed the current export by one.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u11-l03` object from the final `u11.ts` literal through the end of `reading-u11-l03-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u11.ts src/content/reading/u11.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u11.ts src/content/reading/u11.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u11-l03 select information relevant to a topic"`.

### Task 5: reading-u11-l04 — Group Related Research Findings

**Files:** Modify `src/content/reading/u11.ts`, `src/content/reading/u11.test.ts`.

**Consumes:** The complete final `u11.ts` and `u11.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u11-l04` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u11.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, `expectedSources`, and `expectedVisiblePriorSnippets`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u11.test.ts`; expect the exact expected lesson count to exceed the current export by one.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u11-l04` object from the final `u11.ts` literal through the end of `reading-u11-l04-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u11.ts src/content/reading/u11.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u11.ts src/content/reading/u11.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u11-l04 group related research findings"`.

### Task 6: reading-u11-l05 — Cite Sources and Avoid Plagiarism

**Files:** Modify `src/content/reading/u11.ts`, `src/content/reading/u11.test.ts`.

**Consumes:** The complete final `u11.ts` and `u11.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u11-l05` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u11.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, `expectedSources`, and `expectedVisiblePriorSnippets`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u11.test.ts`; expect the exact expected lesson count to exceed the current export by one.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u11-l05` object from the final `u11.ts` literal through the end of `reading-u11-l05-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u11.ts src/content/reading/u11.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u11.ts src/content/reading/u11.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u11-l05 cite sources and avoid plagiarism"`.

### Task 7: Verify and review the complete C2D wave

**Files:** Read/verify `src/content/reading/u11.ts`, `src/content/reading/u11.test.ts`; do not modify shared or protected files.

**Consumes:** Every accepted per-lesson commit in this wave.

**Produces:** Mechanical count evidence, green focused/permanent/type gates, and an independent scoped-review disposition.

- [ ] **Step 1 (2–5 minutes): Run focused tests.** Run `npm test -- src/content/reading/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts`.
- [ ] **Step 2 (2–5 minutes): Run TypeScript.** Run `npx tsc -b --pretty false`.
- [ ] **Step 3 (2–5 minutes): Run mechanical scans.** Verify canonical q01–q13 sequences, exact three-card/13-question counts, all 15 `expectedVisiblePriorSnippets` rows against the current cards, threshold 8, ordered six-code OE arrays, one tag/card mapping per card, exact widget counts, no empty lesson/card/pool arrays, and no planning-marker or live-collaboration/oral-scoring prose.
- [ ] **Step 4 (2–5 minutes): Inspect scope.** Run `git diff --check` and verify the wave commit range touches only the owned paths.
- [ ] **Step 5 (2–5 minutes): Request independent review.** Review standard fidelity, source-before-question visibility, answer/distractor correctness, differentiated supports, widget configs, and accessibility/solo framing; return defects to the owning lesson.

## Execution handoff

The wave stops after its owned modules/tests are reviewed. Plan C master Task C4 alone changes the Reading registry and final catalog.
