# Cram All Plan C3d: Science Units 7–8 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the frozen Earth Features, Resources, and Hazards wave as 8 lessons, 24 cards, and 104 questions.

**Architecture:** Each lesson is authored as schema-native, paste-ready TypeScript: one typed core constant, one typed question array, and one final `Lesson` value in a manifest-ordered unit export. Colocated focused tests grow by one exact spec row before each lesson and immediately pin schema validity, differentiation, exact tag/card routes, widgets, grading normalization, and missed-result review targets. Plan C master alone owns registry integration.

**Tech Stack:** React 18, TypeScript 5, Zod 3, Vitest 2, Vite 5; no new packages.

**Spec:** `docs/superpowers/specs/2026-08-29-cram-all-design.md`

**Blueprint:** `docs/superpowers/plans/2026-08-29-plan-c3-science-curriculum-blueprint.md`

## Global Constraints

- Execute only after Plan C records accepted Plan A remediation, completed/reviewed Plan B, completed master Task C1, and a green `npm test && npx tsc -b --pretty false && npm run build` baseline.
- Modify only the Science unit source/test paths named by this wave. Do not edit registries, manifests, schemas, shared helpers, generated standards, widgets, other subjects, `.github/**`, or `src/characters/**`.
- Preserve `HashRouter`, canonical IDs, local-only storage, and `passThreshold: 8`. Widgets remain unscored models and never write progress, scoring, analytics, or storage.
- Each new lesson has four Sandy lines with poses `talk, think, talk, cheer`; exactly three cards with block kinds `text, example, tip`; exact `Support:`, `Response frame:`, and `Stretch:` tips; at least three worked steps; q01–q13; and exactly three routed concept tags.
- All questions are self-contained, solo, Grade 4 appropriate, keyboard accessible through existing controls, and meaningful without TTS, animation, dragging, timing, or color. Reduced motion preserves values, labels, controls, and conclusions.
- Energy is inferred from observable motion/effects and never directly seen. Models predict or represent; they do not observe or prove physical evidence. Energy, force, acceleration, amplitude, and wavelength remain qualitative where their PEs require it.
- Use the exact literals below. Do not paraphrase, introduce helper DSLs, weaken assertions, or defer content choices to execution.

### Wave PE boundaries

- `4-ESS2-2`: interpret actual mapped coordinates/elevations to describe spatial patterns. The topographic widget’s named buttons are printed elevation values, not plotted locations; the exact accessible coordinate maps in L01/L02 supply those locations.
- `4-ESS2-1`: use water erosion only in the comparison and change vegetation alone. The widget predicts an authored outcome; supplied tray observations are the evidence.
- `4-ESS1-1`: use fossil/layer patterns and relative order only, with no absolute ages, named-formation memorization, or rock-formation mechanism.
- `4-ESS3-1`: include wind, dammed water, sunlight, fossil fuels, and nuclear fuels; compare supplied benefits and environmental effects without policy advocacy.
- `4-ESS3-2`: use only earthquakes, floods, hurricanes, tornadoes, and coastal erosion. Solutions reduce impact/risk and never guarantee safety or remove every effect.

## Preflight

- [ ] Run `git status --short`, `git diff --stat`, `git log -8 --oneline`, and read both execution ledgers; preserve every unrelated or concurrent change.
- [ ] Re-read the design spec, Plan C master, Science blueprint, applicable verbatim standards, `src/content/schema.ts`, `src/content/answer-normalization.ts`, `src/quiz/engine.ts`, widget registry/components, and current Unit 1 source/test when this wave touches Unit 1.
- [ ] Run `npm test && npx tsc -b --pretty false && npm run build`; stop and record any failure before editing.

---

## Unit 7 lesson tasks

### Task 1: Author `science-u07-l01` — Find Earth-Feature Patterns on Maps

**Files:** Create `src/content/science/u07.ts` and `src/content/science/u07.test.ts`.

**Interfaces:** Produces schema-native `scienceU07L01Core`, `scienceU07L01Questions`, and `scienceU07L01Lesson`; appends manifest row 25 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Create this exact focused test file:

```ts
import { expect, test } from 'vitest';
import { normalizeAnswerText } from '../answer-normalization';
import { validateLesson, WidgetRefSchema, type Question } from '../schema';
import { buildResult, type Answer } from '../../quiz/engine';
import { unit07Lessons } from './u07';

const specs = [
  {
    "id": "science-u07-l01",
    "title": "Find Earth-Feature Patterns on Maps",
    "indicatorCodes": [
      "4-ESS2-2"
    ],
    "cards": [
      {
        "title": "Read a map key and elevation",
        "tag": "map-data-reading",
        "widget": {
          "type": "topographic-map-explorer",
          "config": {
            "contours": [
              {
                "elevation": 100,
                "points": "10,90 50,60 90,90"
              },
              {
                "elevation": 200,
                "points": "25,75 50,45 75,75"
              }
            ],
            "points": [
              {
                "id": "ridge",
                "label": "Ridge",
                "elevation": 200
              },
              {
                "id": "valley",
                "label": "Valley",
                "elevation": 100
              }
            ],
            "targetPointId": "ridge"
          }
        }
      },
      {
        "title": "Recognize clustered and linear patterns",
        "tag": "earth-feature-patterns",
        "widget": null
      },
      {
        "title": "Describe a pattern from data",
        "tag": "map-pattern-claim",
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
  'science-u07-l01-q01': 'Map key: Ridge 200 m; Valley 100 m.',
  'science-u07-l01-q03': 'Map key: Ridge 200 m; Valley 100 m.',
  'science-u07-l01-q04': 'Map key: Ridge 200 m; Valley 100 m.',
  'science-u07-l01-q07': 'Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4.',
  'science-u07-l01-q08': 'Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4.',
  'science-u07-l01-q09': 'Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4.',
  'science-u07-l01-q10': 'Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4.',
  'science-u07-l01-q11': 'Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4.',
  'science-u07-l01-q12': 'Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4.',
  'science-u07-l02-q01': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q03': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q04': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q05': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q06': 'Explorer note: named-point buttons show printed elevations but not plotted locations.',
  'science-u07-l02-q07': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q08': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q09': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q10': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q11': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l02-q12': 'Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m.',
  'science-u07-l03-q01': 'Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs.',
  'science-u07-l03-q02': 'Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs.',
  'science-u07-l03-q03': 'Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs.',
  'science-u07-l03-q04': 'Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs.',
  'science-u07-l03-q06': 'The on-screen erosion activity is an authored prediction model; the supplied tray record is the evidence.',
  'science-u07-l03-q07': 'Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs.',
  'science-u07-l03-q08': 'Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs.',
  'science-u07-l03-q09': 'Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls.',
  'science-u07-l03-q10': 'Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls.',
  'science-u07-l03-q11': 'Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls.',
  'science-u07-l03-q12': 'Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls.',
  'science-u07-l03-q13': 'Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls.',
  'science-u07-l04-q01': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q02': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q03': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q04': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q05': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q06': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q07': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q08': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q10': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q11': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q12': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
  'science-u07-l04-q13': 'Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years.',
} as const;

test('all 44 source-dependent Unit 7 questions embed their complete standalone facts', () => {
  const questions = unit07Lessons.flatMap((lesson) => lesson.quiz.pool);
  expect(Object.keys(selfContainedPromptFacts)).toHaveLength(44);
  for (const [questionId, fact] of Object.entries(selfContainedPromptFacts)) {
    const question = questions.find(({ id }) => id === questionId);
    expect(question, questionId).toBeDefined();
    expect(question!.prompt, questionId).toContain(fact);
  }
});



test('Unit 7 is the exact reviewed Science wave', () => {
  expect(unit07Lessons).toHaveLength(specs.length);
  for (const [lessonIndex, lesson] of unit07Lessons.entries()) {
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
  const prose = JSON.stringify(unit07Lessons);
  expect(prose).not.toMatch(/absolute dating|million years old|specific rock formation memorization/i);
  expect(prose).toMatch(/P1 A1.*P6 A6.*V1 C2.*V3 C4/i);
  expect(prose).toMatch(/H1 B1 50 m.*H3 F1 50 m.*C1 B4 0 m.*C3 F4 0 m/i);
  expect(unit07Lessons[0]!.quiz.pool.filter((question) => /A1|A6|C2|C4|column A|rows 1–6/i.test(JSON.stringify(question))).length).toBeGreaterThanOrEqual(4);
  expect(unit07Lessons[1]!.quiz.pool.filter((question) => /B1|D1|F1|B4|D4|F4|row 1|row 4|column pairs/i.test(JSON.stringify(question))).length).toBeGreaterThanOrEqual(4);
});

test('every card has an immediate exact missed-result review route', () => {
  for (const lesson of unit07Lessons) {
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u07.test.ts`. Expected: FAIL because `./u07` does not exist.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Create the source file with

```ts
import type { Lesson } from '../schema';

const scienceU07L01Core = {
  "id": "science-u07-l01",
  "unitId": "science-u07",
  "title": "Find Earth-Feature Patterns on Maps",
  "indicatorCodes": [
    "4-ESS2-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A topographic map uses contour lines and printed elevations to represent land height."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "An accessible coordinate map locates six peaks in western column A and three valleys through central column C."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will read the key, recognize clustered or linear patterns, and describe only what the data support."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s turn map data into a precise pattern claim!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u07-l01-c1",
      "title": "Read a map key and elevation",
      "blocks": [
        {
          "kind": "text",
          "text": "Contour lines connect places represented at the same elevation. Printed point entries can be compared by their elevation values; they are not necessarily plotted on the contour drawing."
        },
        {
          "kind": "example",
          "text": "In the activity key, Ridge is 200 m and Valley is 100 m. Therefore Ridge has the higher printed elevation."
        },
        {
          "kind": "tip",
          "text": "Support: Read the unit after each number, then compare the printed values before naming the higher entry."
        }
      ],
      "widget": {
        "type": "topographic-map-explorer",
        "config": {
          "contours": [
            {
              "elevation": 100,
              "points": "10,90 50,60 90,90"
            },
            {
              "elevation": 200,
              "points": "25,75 50,45 75,75"
            }
          ],
          "points": [
            {
              "id": "ridge",
              "label": "Ridge",
              "elevation": 200
            },
            {
              "id": "valley",
              "label": "Valley",
              "elevation": 100
            }
          ],
          "targetPointId": "ridge"
        }
      }
    },
    {
      "id": "science-u07-l01-c2",
      "title": "Recognize clustered and linear patterns",
      "blocks": [
        {
          "kind": "text",
          "text": "The accessible map uses columns A–E from west to east and rows 1–6 from north to south. A vertical band keeps one column while row numbers change; a cluster keeps nearby columns and rows."
        },
        {
          "kind": "example",
          "text": `Coordinate map (columns A–E west→east; rows 1–6 north→south):\n       A   B   C   D   E\nRow 1  P1  ·   ·   ·   ·\nRow 2  P2  ·   V1  ·   ·\nRow 3  P3  ·   V2  ·   ·\nRow 4  P4  ·   V3  ·   ·\nRow 5  P5  ·   ·   ·   ·\nRow 6  P6  ·   ·   ·   ·\nEquivalent text table: P1 A1, P2 A2, P3 A3, P4 A4, P5 A5, P6 A6; V1 C2, V2 C3, V3 C4. The six peak symbols form a north–south band in western column A; the valley symbols form a shorter central band in column C.`
        },
        {
          "kind": "tip",
          "text": "Response frame: The ____ features form a ____ pattern because locations ____ are arranged ____."
        }
      ]
    },
    {
      "id": "science-u07-l01-c3",
      "title": "Describe a pattern from data",
      "blocks": [
        {
          "kind": "text",
          "text": "A pattern claim names the feature, spatial arrangement, and several supporting data points. It stops before an unsupported cause."
        },
        {
          "kind": "example",
          "text": "Claim: Six mapped peaks form a north-to-south band in western column A. P1 at A1, P3 at A3, and P6 at A6 show the band’s extent."
        },
        {
          "kind": "tip",
          "text": "Stretch: Cite three named locations and state one conclusion the map cannot support, such as why the features formed."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Find Earth-Feature Patterns on Maps",
    "steps": [
      "Read the coordinate key: A is west, E is east, row 1 is north, and row 6 is south.",
      "Locate P1 at A1, P3 at A3, and P6 at A6; their shared column and changing rows form a vertical western band.",
      "Compare V1 C2, V2 C3, and V3 C4; those mapped valley points form a shorter central band.",
      "Describe only the mapped pattern; do not claim a formation cause because the location/elevation data do not provide process evidence."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Append:

```ts
const scienceU07L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u07-l01-q01",
    "conceptTag": "map-data-reading",
    "reviewCardId": "science-u07-l01-c1",
    "type": "multiple-choice",
    "prompt": "Map key: Ridge 200 m; Valley 100 m. Which printed point has the higher elevation?",
    "choices": [
      {
        "id": "a",
        "text": "Ridge at 200 m"
      },
      {
        "id": "b",
        "text": "Valley at 100 m"
      },
      {
        "id": "c",
        "text": "Both are 0 m"
      },
      {
        "id": "d",
        "text": "The map title"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Two hundred is higher than one hundred."
  },
  {
    "id": "science-u07-l01-q02",
    "conceptTag": "map-data-reading",
    "reviewCardId": "science-u07-l01-c1",
    "type": "true-false",
    "prompt": "A contour line connects places represented at the same elevation.",
    "choices": [
      {
        "id": "true",
        "text": "True — that is the map convention"
      },
      {
        "id": "false",
        "text": "False — it connects random labels"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Contour values represent elevation."
  },
  {
    "id": "science-u07-l01-q03",
    "conceptTag": "map-data-reading",
    "reviewCardId": "science-u07-l01-c1",
    "type": "multiple-choice",
    "prompt": "Map key: Ridge 200 m; Valley 100 m. What is the printed elevation of Valley?",
    "choices": [
      {
        "id": "a",
        "text": "0 m"
      },
      {
        "id": "b",
        "text": "100 m"
      },
      {
        "id": "c",
        "text": "200 m"
      },
      {
        "id": "d",
        "text": "300 m"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The key lists Valley at 100 m."
  },
  {
    "id": "science-u07-l01-q04",
    "conceptTag": "map-data-reading",
    "reviewCardId": "science-u07-l01-c1",
    "type": "fill-blank",
    "prompt": "Map key: Ridge 200 m; Valley 100 m. The Ridge entry is ___ m.",
    "acceptedAnswers": [
      "200",
      "two hundred"
    ],
    "explanation": "The printed Ridge elevation is 200 m."
  },
  {
    "id": "science-u07-l01-q05",
    "conceptTag": "earth-feature-patterns",
    "reviewCardId": "science-u07-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which arrangement is linear?",
    "choices": [
      {
        "id": "a",
        "text": "Features scattered with no band"
      },
      {
        "id": "b",
        "text": "Features grouped in one small spot"
      },
      {
        "id": "c",
        "text": "Features arranged along a north-to-south band"
      },
      {
        "id": "d",
        "text": "One feature with no comparison"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "A band is a linear pattern."
  },
  {
    "id": "science-u07-l01-q06",
    "conceptTag": "earth-feature-patterns",
    "reviewCardId": "science-u07-l01-c2",
    "type": "true-false",
    "prompt": "Do P1 at A1 through P6 at A6 form a western north–south band?",
    "choices": [
      {
        "id": "true",
        "text": "True — they share western column A across rows 1–6"
      },
      {
        "id": "false",
        "text": "False — they are all in eastern column E"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The coordinate map places all six peaks in column A from north to south."
  },
  {
    "id": "science-u07-l01-q07",
    "conceptTag": "earth-feature-patterns",
    "reviewCardId": "science-u07-l01-c2",
    "type": "multiple-choice",
    "prompt": "Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4. Which mapped group spans more north-to-south rows?",
    "choices": [
      {
        "id": "a",
        "text": "Neither group"
      },
      {
        "id": "b",
        "text": "Both span one row"
      },
      {
        "id": "c",
        "text": "V1 C2 through V3 C4"
      },
      {
        "id": "d",
        "text": "P1 A1 through P6 A6"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The peak band spans rows 1–6, more than the valley band’s rows 2–4."
  },
  {
    "id": "science-u07-l01-q08",
    "conceptTag": "earth-feature-patterns",
    "reviewCardId": "science-u07-l01-c2",
    "type": "multiple-choice",
    "prompt": "Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4. Which statement analyzes the mapped coordinates?",
    "choices": [
      {
        "id": "a",
        "text": "P1–P6 share western column A while their row numbers increase north to south"
      },
      {
        "id": "b",
        "text": "One hidden process certainly formed every peak"
      },
      {
        "id": "c",
        "text": "The point labels are decorative only"
      },
      {
        "id": "d",
        "text": "The map predicts future change"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Shared column A and changing row numbers describe the mapped spatial pattern."
  },
  {
    "id": "science-u07-l01-q09",
    "conceptTag": "map-pattern-claim",
    "reviewCardId": "science-u07-l01-c3",
    "type": "multiple-choice",
    "prompt": "Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4. Which is the strongest pattern claim from the coordinate map?",
    "choices": [
      {
        "id": "a",
        "text": "There are features"
      },
      {
        "id": "b",
        "text": "Six peaks form a western north–south band from P1 A1 to P6 A6"
      },
      {
        "id": "c",
        "text": "The map is interesting"
      },
      {
        "id": "d",
        "text": "One cause formed all features identically"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It names the arrangement and its mapped endpoints."
  },
  {
    "id": "science-u07-l01-q10",
    "conceptTag": "map-pattern-claim",
    "reviewCardId": "science-u07-l01-c3",
    "type": "true-false",
    "prompt": "Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4. The provided locations alone prove why the peaks formed.",
    "choices": [
      {
        "id": "true",
        "text": "True — location proves cause"
      },
      {
        "id": "false",
        "text": "False — the data describe pattern, not cause"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Causation needs additional evidence."
  },
  {
    "id": "science-u07-l01-q11",
    "conceptTag": "map-pattern-claim",
    "reviewCardId": "science-u07-l01-c3",
    "type": "multiple-choice",
    "prompt": "Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4. Which mapped evidence supports the western-band claim?",
    "choices": [
      {
        "id": "a",
        "text": "Valley is printed at 100 m"
      },
      {
        "id": "b",
        "text": "The title says map"
      },
      {
        "id": "c",
        "text": "P1 A1, P3 A3, and P6 A6 share column A"
      },
      {
        "id": "d",
        "text": "Ridge is a printed entry"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The three coordinates sample one western column across separated rows."
  },
  {
    "id": "science-u07-l01-q12",
    "conceptTag": "map-pattern-claim",
    "reviewCardId": "science-u07-l01-c3",
    "type": "multiple-choice",
    "prompt": "Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4. Which claim is unsupported?",
    "choices": [
      {
        "id": "a",
        "text": "Ridge has a higher printed elevation than Valley"
      },
      {
        "id": "b",
        "text": "Six peaks are listed along the west"
      },
      {
        "id": "c",
        "text": "Three valleys are listed through the center"
      },
      {
        "id": "d",
        "text": "The location pattern proves one exact formation mechanism"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The map does not provide process evidence."
  },
  {
    "id": "science-u07-l01-q13",
    "conceptTag": "map-pattern-claim",
    "reviewCardId": "science-u07-l01-c3",
    "type": "fill-blank",
    "prompt": "Features arranged along a band form a ___ pattern.",
    "acceptedAnswers": [
      "linear"
    ],
    "explanation": "Linear describes a line-like arrangement."
  }
];

const scienceU07L01Lesson: Lesson = {
  ...scienceU07L01Core,
  quiz: { passThreshold: 8, pool: scienceU07L01Questions },
};

export const unit07Lessons: Lesson[] = [
  scienceU07L01Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u07.test.ts`. Expected: PASS with 1 lesson row, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u07-l01`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u07.ts src/content/science/u07.test.ts`, then `git add src/content/science/u07.ts src/content/science/u07.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): start science changing landscapes unit"`.
### Task 2: Author `science-u07-l02` — Interpret Earth-Feature Map Data

**Files:** Modify `src/content/science/u07.ts` and `src/content/science/u07.test.ts`.

**Interfaces:** Produces schema-native `scienceU07L02Core`, `scienceU07L02Questions`, and `scienceU07L02Lesson`; appends manifest row 26 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
  {
    "id": "science-u07-l02",
    "title": "Interpret Earth-Feature Map Data",
    "indicatorCodes": [
      "4-ESS2-2"
    ],
    "cards": [
      {
        "title": "Compare elevations and locations",
        "tag": "map-data-comparison",
        "widget": null
      },
      {
        "title": "Connect several data points",
        "tag": "multi-point-pattern",
        "widget": {
          "type": "topographic-map-explorer",
          "config": {
            "contours": [
              {
                "elevation": 0,
                "points": "5,80 50,70 95,80"
              },
              {
                "elevation": 50,
                "points": "20,60 50,50 80,60"
              }
            ],
            "points": [
              {
                "id": "coast",
                "label": "Coast",
                "elevation": 0
              },
              {
                "id": "hill",
                "label": "Hill",
                "elevation": 50
              }
            ],
            "targetPointId": "coast"
          }
        }
      },
      {
        "title": "Support an interpretation",
        "tag": "map-interpretation-evidence",
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u07.test.ts`. Expected: FAIL because the test expects 2 lesson rows while production exports 1.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU07L02Core = {
  "id": "science-u07-l02",
  "unitId": "science-u07",
  "title": "Interpret Earth-Feature Map Data",
  "indicatorCodes": [
    "4-ESS2-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A coastal map packet combines contour elevations with a table of named coast and hill locations."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "One point alone cannot establish the larger pattern."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare values, connect several points, and support an interpretation without inventing a cause."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s build the claim from multiple data points!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u07-l02-c1",
      "title": "Compare elevations and locations",
      "blocks": [
        {
          "kind": "text",
          "text": "Compare printed elevations with units and compare named locations using the packet table. Keep value and location evidence separate."
        },
        {
          "kind": "example",
          "text": `Coordinate map (columns A–F west→east; rows 1–4 north→south):\n       A   B   C   D   E   F\nRow 1  ·   H1  ·   H2  ·   H3\nRow 2  ·   ·   ·   ·   ·   ·\nRow 3  ·   ·   ·   ·   ·   ·\nRow 4  ·   C1  ·   C2  ·   C3\nH1–H3 are 50 m; C1–C3 are 0 m. Equivalent text table: H1 B1 50 m, H2 D1 50 m, H3 F1 50 m; C1 B4 0 m, C2 D4 0 m, C3 F4 0 m.`
        },
        {
          "kind": "tip",
          "text": "Support: Make two columns: elevation values and location descriptions. Put each fact in only one column."
        }
      ]
    },
    {
      "id": "science-u07-l02-c2",
      "title": "Connect several data points",
      "blocks": [
        {
          "kind": "text",
          "text": "A reliable pattern uses several points that agree. Three southern coast points and three northern hill points support a coast-to-inland elevation pattern."
        },
        {
          "kind": "example",
          "text": "The plotted points show H1–H3 across northern row 1 and C1–C3 across southern row 4. The activity buttons repeat representative elevations, while this coordinate map supplies the named locations."
        },
        {
          "kind": "tip",
          "text": "Response frame: Points ____, ____, and ____ share ____; points ____, ____, and ____ share ____."
        }
      ],
      "widget": {
        "type": "topographic-map-explorer",
        "config": {
          "contours": [
            {
              "elevation": 0,
              "points": "5,80 50,70 95,80"
            },
            {
              "elevation": 50,
              "points": "20,60 50,50 80,60"
            }
          ],
          "points": [
            {
              "id": "coast",
              "label": "Coast",
              "elevation": 0
            },
            {
              "id": "hill",
              "label": "Hill",
              "elevation": 50
            }
          ],
          "targetPointId": "coast"
        }
      }
    },
    {
      "id": "science-u07-l02-c3",
      "title": "Support an interpretation",
      "blocks": [
        {
          "kind": "text",
          "text": "An interpretation combines the pattern and evidence. It should be no broader than the packet."
        },
        {
          "kind": "example",
          "text": "Interpretation: At columns B, D, and F in this packet, each northern row-1 hill is 50 m and each southern row-4 coast point is 0 m."
        },
        {
          "kind": "tip",
          "text": "Stretch: Cite all six data points, then add “in this packet” and name one cause question the data do not answer."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Interpret Earth-Feature Map Data",
    "steps": [
      "Read the coordinate/elevation table for all six plotted points.",
      "Pair locations by column: H1 B1 with C1 B4, H2 D1 with C2 D4, and H3 F1 with C3 F4.",
      "Notice the repeated pattern in all three columns: northern row 1 is 50 m and southern row 4 is 0 m.",
      "Interpret a north-higher/south-lower pattern in this packet without claiming why it formed."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU07L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u07-l02-q01",
    "conceptTag": "map-data-comparison",
    "reviewCardId": "science-u07-l02-c1",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Which entry has the lower printed elevation?",
    "choices": [
      {
        "id": "a",
        "text": "Coast at 0 m"
      },
      {
        "id": "b",
        "text": "Hill at 50 m"
      },
      {
        "id": "c",
        "text": "Both are 100 m"
      },
      {
        "id": "d",
        "text": "Neither has a value"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Zero is below fifty."
  },
  {
    "id": "science-u07-l02-q02",
    "conceptTag": "map-data-comparison",
    "reviewCardId": "science-u07-l02-c1",
    "type": "true-false",
    "prompt": "Are C1 B4, C2 D4, and C3 F4 all plotted on southern row 4?",
    "choices": [
      {
        "id": "true",
        "text": "True — each coast coordinate ends in row 4"
      },
      {
        "id": "false",
        "text": "False — each is on northern row 1"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The coordinate map locates all three coast points on row 4."
  },
  {
    "id": "science-u07-l02-q03",
    "conceptTag": "map-data-comparison",
    "reviewCardId": "science-u07-l02-c1",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Where are H1 B1, H2 D1, and H3 F1 relative to the coast points?",
    "choices": [
      {
        "id": "a",
        "text": "South in row 4"
      },
      {
        "id": "b",
        "text": "North in row 1"
      },
      {
        "id": "c",
        "text": "At the same coordinates"
      },
      {
        "id": "d",
        "text": "Outside the mapped grid"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "All three hill coordinates use northern row 1."
  },
  {
    "id": "science-u07-l02-q04",
    "conceptTag": "map-data-comparison",
    "reviewCardId": "science-u07-l02-c1",
    "type": "fill-blank",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. The representative Hill entry is ___ m.",
    "acceptedAnswers": [
      "50",
      "fifty"
    ],
    "explanation": "The printed elevation is 50 m."
  },
  {
    "id": "science-u07-l02-q05",
    "conceptTag": "multi-point-pattern",
    "reviewCardId": "science-u07-l02-c2",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Why compare the B, D, and F column pairs?",
    "choices": [
      {
        "id": "a",
        "text": "One point is always wrong"
      },
      {
        "id": "b",
        "text": "Their labels rhyme"
      },
      {
        "id": "c",
        "text": "Three repeated north–south comparisons support a pattern"
      },
      {
        "id": "d",
        "text": "They prove a cause"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The repeated column pairs provide several mapped comparisons."
  },
  {
    "id": "science-u07-l02-q06",
    "conceptTag": "multi-point-pattern",
    "reviewCardId": "science-u07-l02-c2",
    "type": "true-false",
    "prompt": "Explorer note: named-point buttons show printed elevations but not plotted locations. The named point buttons provide printed values, not plotted locations on the contour drawing.",
    "choices": [
      {
        "id": "true",
        "text": "True — the widget states this limit"
      },
      {
        "id": "false",
        "text": "False — every name is plotted"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The implementation keeps the data types separate."
  },
  {
    "id": "science-u07-l02-q07",
    "conceptTag": "multi-point-pattern",
    "reviewCardId": "science-u07-l02-c2",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Which mapped set supports the higher northern group?",
    "choices": [
      {
        "id": "a",
        "text": "C1 B4 only"
      },
      {
        "id": "b",
        "text": "Coast at 0 m only"
      },
      {
        "id": "c",
        "text": "C1 B4, C2 D4, C3 F4"
      },
      {
        "id": "d",
        "text": "H1 B1, H2 D1, H3 F1"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The three row-1 hill points are each printed at 50 m."
  },
  {
    "id": "science-u07-l02-q08",
    "conceptTag": "multi-point-pattern",
    "reviewCardId": "science-u07-l02-c2",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Which comparison analyzes all six mapped points?",
    "choices": [
      {
        "id": "a",
        "text": "At B, D, and F, row-1 hills are 50 m while row-4 coast points are 0 m"
      },
      {
        "id": "b",
        "text": "Coast is one word"
      },
      {
        "id": "c",
        "text": "Hill has four letters"
      },
      {
        "id": "d",
        "text": "The grid caused the elevations"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It compares locations and elevations across every mapped column pair."
  },
  {
    "id": "science-u07-l02-q09",
    "conceptTag": "map-interpretation-evidence",
    "reviewCardId": "science-u07-l02-c3",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Which interpretation is supported by the coordinate map?",
    "choices": [
      {
        "id": "a",
        "text": "Every coast in the world is identical"
      },
      {
        "id": "b",
        "text": "In columns B, D, and F, northern row-1 hills are higher than southern row-4 coast points"
      },
      {
        "id": "c",
        "text": "The hills must have one exact cause"
      },
      {
        "id": "d",
        "text": "Future elevations are known"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It stays within the six plotted locations and elevations."
  },
  {
    "id": "science-u07-l02-q10",
    "conceptTag": "map-interpretation-evidence",
    "reviewCardId": "science-u07-l02-c3",
    "type": "true-false",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. The interpretation should be limited to the supplied packet.",
    "choices": [
      {
        "id": "true",
        "text": "True — the evidence has a defined scope"
      },
      {
        "id": "false",
        "text": "False — it proves all maps"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Scope prevents overgeneralization."
  },
  {
    "id": "science-u07-l02-q11",
    "conceptTag": "map-interpretation-evidence",
    "reviewCardId": "science-u07-l02-c3",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Which evidence best supports the interpretation?",
    "choices": [
      {
        "id": "a",
        "text": "One contour color"
      },
      {
        "id": "b",
        "text": "A favorite point"
      },
      {
        "id": "c",
        "text": "All three row-1 hill coordinates at 50 m and all three row-4 coast coordinates at 0 m"
      },
      {
        "id": "d",
        "text": "The title alone"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It uses every mapped location and elevation."
  },
  {
    "id": "science-u07-l02-q12",
    "conceptTag": "map-interpretation-evidence",
    "reviewCardId": "science-u07-l02-c3",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Which question remains unanswered?",
    "choices": [
      {
        "id": "a",
        "text": "Which representative value is lower?"
      },
      {
        "id": "b",
        "text": "Where are the coast points?"
      },
      {
        "id": "c",
        "text": "Where are the hill points?"
      },
      {
        "id": "d",
        "text": "What exact process formed the pattern?"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The data do not establish a formation cause."
  },
  {
    "id": "science-u07-l02-q13",
    "conceptTag": "map-interpretation-evidence",
    "reviewCardId": "science-u07-l02-c3",
    "type": "fill-blank",
    "prompt": "A claim supported by several map points is a map ___.",
    "acceptedAnswers": [
      "interpretation"
    ],
    "explanation": "The lesson builds an evidence-based interpretation."
  }
];

const scienceU07L02Lesson: Lesson = {
  ...scienceU07L02Core,
  quiz: { passThreshold: 8, pool: scienceU07L02Questions },
};

export const unit07Lessons: Lesson[] = [
  scienceU07L01Lesson,
  scienceU07L02Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u07.test.ts`. Expected: PASS with 2 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u07-l02`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u07.ts src/content/science/u07.test.ts`, then `git add src/content/science/u07.ts src/content/science/u07.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): interpret Earth feature map data"`.
### Task 3: Author `science-u07-l03` — Test a Weathering or Erosion Variable

**Files:** Modify `src/content/science/u07.ts` and `src/content/science/u07.test.ts`.

**Interfaces:** Produces schema-native `scienceU07L03Core`, `scienceU07L03Questions`, and `scienceU07L03Lesson`; appends manifest row 27 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
  {
    "id": "science-u07-l03",
    "title": "Test a Weathering or Erosion Variable",
    "indicatorCodes": [
      "4-ESS2-1"
    ],
    "cards": [
      {
        "title": "Choose one process and variable",
        "tag": "single-process-variable",
        "widget": null
      },
      {
        "title": "Plan a fair comparison",
        "tag": "erosion-fair-test",
        "widget": {
          "type": "erosion-simulator",
          "config": {
            "terrain": "soil",
            "agents": [
              "water"
            ],
            "vegetation": false,
            "targetAgent": "water"
          }
        }
      },
      {
        "title": "Use observations as evidence",
        "tag": "erosion-observation-evidence",
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u07.test.ts`. Expected: FAIL because the test expects 3 lesson rows while production exports 2.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU07L03Core = {
  "id": "science-u07-l03",
  "unitId": "science-u07",
  "title": "Test a Weathering or Erosion Variable",
  "indicatorCodes": [
    "4-ESS2-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Two soil trays receive the same amount of water down the same slope."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "One tray has plant cover and the other is bare, so vegetation is the single changed condition."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will plan a fair water-erosion comparison and use supplied observations as evidence."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s change one condition and watch the soil, not the screen, for evidence!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u07-l03-c1",
      "title": "Choose one process and variable",
      "blocks": [
        {
          "kind": "text",
          "text": "This investigation studies water erosion only: the movement of soil by flowing water. The single varied condition is vegetation cover, on or off."
        },
        {
          "kind": "example",
          "text": "Both trays use the same soil, slope, water amount, pour height, tray size, and observation time."
        },
        {
          "kind": "tip",
          "text": "Support: Circle water erosion as the process and vegetation as the one variable; cross out every second change."
        }
      ]
    },
    {
      "id": "science-u07-l03-c2",
      "title": "Plan a fair comparison",
      "blocks": [
        {
          "kind": "text",
          "text": "A fair comparison changes vegetation cover while holding the other listed conditions constant. Predict before collecting observations."
        },
        {
          "kind": "example",
          "text": "Prediction: the bare tray will lose more loose soil downhill than the covered tray. The activity can model this prediction but is not tray evidence."
        },
        {
          "kind": "tip",
          "text": "Response frame: I change ____. I keep ____ the same. I predict ____."
        }
      ],
      "widget": {
        "type": "erosion-simulator",
        "config": {
          "terrain": "soil",
          "agents": [
            "water"
          ],
          "vegetation": false,
          "targetAgent": "water"
        }
      }
    },
    {
      "id": "science-u07-l03-c3",
      "title": "Use observations as evidence",
      "blocks": [
        {
          "kind": "text",
          "text": "Supplied tray observations: bare soil formed a deeper channel and 14 spoonfuls reached the catch pan; covered soil formed a shallow channel and 5 spoonfuls reached the pan."
        },
        {
          "kind": "example",
          "text": "These observations support that vegetation reduced the rate of water erosion under the tested conditions. They do not show that vegetation stops all erosion."
        },
        {
          "kind": "tip",
          "text": "Stretch: Cite both channel descriptions and both spoon counts, then limit the claim to water erosion in this setup."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Test a Weathering or Erosion Variable",
    "steps": [
      "Choose water erosion and vary only vegetation cover.",
      "Keep soil, slope, water amount, pour height, tray size, and time the same.",
      "Compare the supplied outcomes: bare/deep/14 versus covered/shallow/5.",
      "Conclude that vegetation reduced water-erosion rate in this test; the authored terrain model was only a prediction tool."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU07L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u07-l03-q01",
    "conceptTag": "single-process-variable",
    "reviewCardId": "science-u07-l03-c1",
    "type": "multiple-choice",
    "prompt": "Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs. Which process is tested?",
    "choices": [
      {
        "id": "a",
        "text": "Water erosion"
      },
      {
        "id": "b",
        "text": "Wind erosion"
      },
      {
        "id": "c",
        "text": "Ice weathering"
      },
      {
        "id": "d",
        "text": "Several processes together"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Only water erosion is used."
  },
  {
    "id": "science-u07-l03-q02",
    "conceptTag": "single-process-variable",
    "reviewCardId": "science-u07-l03-c1",
    "type": "true-false",
    "prompt": "Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs. Vegetation cover is the single varied condition.",
    "choices": [
      {
        "id": "true",
        "text": "True — it changes on versus off"
      },
      {
        "id": "false",
        "text": "False — soil type also changes"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The trays otherwise match."
  },
  {
    "id": "science-u07-l03-q03",
    "conceptTag": "single-process-variable",
    "reviewCardId": "science-u07-l03-c1",
    "type": "multiple-choice",
    "prompt": "Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs. Which condition must stay the same?",
    "choices": [
      {
        "id": "a",
        "text": "The conclusion"
      },
      {
        "id": "b",
        "text": "The amount of water"
      },
      {
        "id": "c",
        "text": "The evidence sentence"
      },
      {
        "id": "d",
        "text": "The answer choice order"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Equal water supports fairness."
  },
  {
    "id": "science-u07-l03-q04",
    "conceptTag": "single-process-variable",
    "reviewCardId": "science-u07-l03-c1",
    "type": "fill-blank",
    "prompt": "Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs. The one varied condition is ___ cover.",
    "acceptedAnswers": [
      "vegetation",
      "plant"
    ],
    "explanation": "Vegetation cover differs between trays."
  },
  {
    "id": "science-u07-l03-q05",
    "conceptTag": "erosion-fair-test",
    "reviewCardId": "science-u07-l03-c2",
    "type": "sort",
    "prompt": "Order the fair-test steps.",
    "items": [
      {
        "id": "compare",
        "text": "Compare the soil movement"
      },
      {
        "id": "predict",
        "text": "Predict which tray will lose more soil"
      },
      {
        "id": "setup",
        "text": "Prepare matching trays that differ only in vegetation"
      },
      {
        "id": "pour",
        "text": "Pour the same water in the same way"
      }
    ],
    "correctOrder": [
      "setup",
      "predict",
      "pour",
      "compare"
    ],
    "explanation": "Prepare, predict, run, compare."
  },
  {
    "id": "science-u07-l03-q06",
    "conceptTag": "erosion-fair-test",
    "reviewCardId": "science-u07-l03-c2",
    "type": "true-false",
    "prompt": "The on-screen erosion activity is an authored prediction model; the supplied tray record is the evidence. The erosion activity supplies physical observations from soil trays.",
    "choices": [
      {
        "id": "true",
        "text": "True — its pictures are test evidence"
      },
      {
        "id": "false",
        "text": "False — it is an authored prediction model"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Only the supplied tray record is evidence."
  },
  {
    "id": "science-u07-l03-q07",
    "conceptTag": "erosion-fair-test",
    "reviewCardId": "science-u07-l03-c2",
    "type": "multiple-choice",
    "prompt": "Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs. Which prediction fits the design?",
    "choices": [
      {
        "id": "a",
        "text": "Both trays must be identical afterward"
      },
      {
        "id": "b",
        "text": "The covered tray will have no water"
      },
      {
        "id": "c",
        "text": "The bare tray will lose more loose soil downhill"
      },
      {
        "id": "d",
        "text": "The model will prove the result"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The prediction follows the single-variable comparison."
  },
  {
    "id": "science-u07-l03-q08",
    "conceptTag": "erosion-fair-test",
    "reviewCardId": "science-u07-l03-c2",
    "type": "multiple-choice",
    "prompt": "Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs. Which plan is unfair?",
    "choices": [
      {
        "id": "a",
        "text": "Same soil and slope, vegetation differs"
      },
      {
        "id": "b",
        "text": "Same water and time"
      },
      {
        "id": "c",
        "text": "Same tray size and pour height"
      },
      {
        "id": "d",
        "text": "Vegetation and water amount both differ"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Two changed conditions prevent isolation."
  },
  {
    "id": "science-u07-l03-q09",
    "conceptTag": "erosion-observation-evidence",
    "reviewCardId": "science-u07-l03-c3",
    "type": "multiple-choice",
    "prompt": "Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls. Which result was observed for bare soil?",
    "choices": [
      {
        "id": "a",
        "text": "A deeper channel and 14 spoonfuls in the pan"
      },
      {
        "id": "b",
        "text": "No moved soil"
      },
      {
        "id": "c",
        "text": "A shallow channel and 5 spoonfuls"
      },
      {
        "id": "d",
        "text": "A model completion badge"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "That is the supplied bare-tray record."
  },
  {
    "id": "science-u07-l03-q10",
    "conceptTag": "erosion-observation-evidence",
    "reviewCardId": "science-u07-l03-c3",
    "type": "true-false",
    "prompt": "Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls. The covered tray still showed some water erosion.",
    "choices": [
      {
        "id": "true",
        "text": "True — five spoonfuls moved"
      },
      {
        "id": "false",
        "text": "False — vegetation stopped all erosion"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The record shows reduced, not zero, movement."
  },
  {
    "id": "science-u07-l03-q11",
    "conceptTag": "erosion-observation-evidence",
    "reviewCardId": "science-u07-l03-c3",
    "type": "multiple-choice",
    "prompt": "Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls. Which claim is supported?",
    "choices": [
      {
        "id": "a",
        "text": "Vegetation eliminates every kind of erosion"
      },
      {
        "id": "b",
        "text": "Vegetation reduced water erosion in this setup"
      },
      {
        "id": "c",
        "text": "Wind caused the channels"
      },
      {
        "id": "d",
        "text": "The exact future rate is known"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It matches the one-process observations."
  },
  {
    "id": "science-u07-l03-q12",
    "conceptTag": "erosion-observation-evidence",
    "reviewCardId": "science-u07-l03-c3",
    "type": "multiple-choice",
    "prompt": "Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls. Which evidence uses both trays?",
    "choices": [
      {
        "id": "a",
        "text": "The tray labels"
      },
      {
        "id": "b",
        "text": "The model colors"
      },
      {
        "id": "c",
        "text": "Bare had 14 spoonfuls and covered had 5"
      },
      {
        "id": "d",
        "text": "The observer preferred plants"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The paired counts compare outcomes."
  },
  {
    "id": "science-u07-l03-q13",
    "conceptTag": "erosion-observation-evidence",
    "reviewCardId": "science-u07-l03-c3",
    "type": "fill-blank",
    "prompt": "Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls. The bare tray formed a deeper ___.",
    "acceptedAnswers": [
      "channel"
    ],
    "explanation": "The supplied observation names a deeper channel."
  }
];

const scienceU07L03Lesson: Lesson = {
  ...scienceU07L03Core,
  quiz: { passThreshold: 8, pool: scienceU07L03Questions },
};

export const unit07Lessons: Lesson[] = [
  scienceU07L01Lesson,
  scienceU07L02Lesson,
  scienceU07L03Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u07.test.ts`. Expected: PASS with 3 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u07-l03`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u07.ts src/content/science/u07.test.ts`, then `git add src/content/science/u07.ts src/content/science/u07.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): test a single erosion variable"`.
### Task 4: Author `science-u07-l04` — Use Rock Layers and Fossils as Change Evidence

**Files:** Modify `src/content/science/u07.ts` and `src/content/science/u07.test.ts`.

**Interfaces:** Produces schema-native `scienceU07L04Core`, `scienceU07L04Questions`, and `scienceU07L04Lesson`; appends manifest row 28 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
  {
    "id": "science-u07-l04",
    "title": "Use Rock Layers and Fossils as Change Evidence",
    "indicatorCodes": [
      "4-ESS1-1"
    ],
    "cards": [
      {
        "title": "Read relative layer order",
        "tag": "relative-layer-order",
        "widget": null
      },
      {
        "title": "Find patterns in fossils and layers",
        "tag": "rock-fossil-patterns",
        "widget": {
          "type": "rock-layer-explorer",
          "config": {
            "layers": [
              {
                "id": "upper-shells",
                "label": "Upper shell layer",
                "age": 1,
                "artifact": "marine shell fossils"
              },
              {
                "id": "lower-plants",
                "label": "Lower plant layer",
                "age": 2,
                "artifact": "plant fossils without shells"
              }
            ],
            "prompt": "Which layer is relatively older?",
            "targetLayerId": "lower-plants"
          }
        }
      },
      {
        "title": "Explain landscape change over time",
        "tag": "landscape-change-explanation",
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
        "type": "fill-blank",
        "card": 3
      }
    ]
  },
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u07.test.ts`. Expected: FAIL because the test expects 4 lesson rows while production exports 3.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU07L04Core = {
  "id": "science-u07-l04",
  "unitId": "science-u07",
  "title": "Use Rock Layers and Fossils as Change Evidence",
  "indicatorCodes": [
    "4-ESS1-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A cliff record has a lower layer with plant fossils and no shells, and an upper layer with marine shell fossils."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "The order and fossil pattern can provide evidence that the landscape changed over relative time."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare older and younger layers without assigning years or memorizing formation names."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s reason from the pattern in the record!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u07-l04-c1",
      "title": "Read relative layer order",
      "blocks": [
        {
          "kind": "text",
          "text": "In this undisturbed authored stack, the lower layer has relative-age rank 2 and is older than the upper layer with rank 1. The ranks show order, not years."
        },
        {
          "kind": "example",
          "text": "Lower plant layer is relatively older; upper shell layer is relatively younger."
        },
        {
          "kind": "tip",
          "text": "Support: Write older beside the larger relative-age rank and younger beside the smaller rank."
        }
      ]
    },
    {
      "id": "science-u07-l04-c2",
      "title": "Find patterns in fossils and layers",
      "blocks": [
        {
          "kind": "text",
          "text": "The lower layer contains plant fossils without shells. The upper layer contains marine shell fossils. The change in fossil pattern is the key evidence."
        },
        {
          "kind": "example",
          "text": "Plant fossils without shells occur earlier in the stack; marine shell fossils occur later above them."
        },
        {
          "kind": "tip",
          "text": "Response frame: The relatively older ____ layer contains ____, while the younger ____ layer contains ____."
        }
      ],
      "widget": {
        "type": "rock-layer-explorer",
        "config": {
          "layers": [
            {
              "id": "upper-shells",
              "label": "Upper shell layer",
              "age": 1,
              "artifact": "marine shell fossils"
            },
            {
              "id": "lower-plants",
              "label": "Lower plant layer",
              "age": 2,
              "artifact": "plant fossils without shells"
            }
          ],
          "prompt": "Which layer is relatively older?",
          "targetLayerId": "lower-plants"
        }
      }
    },
    {
      "id": "science-u07-l04-c3",
      "title": "Explain landscape change over time",
      "blocks": [
        {
          "kind": "text",
          "text": "The fossil shift supports an explanation that the place changed from a land setting with plants to a water setting where marine organisms lived."
        },
        {
          "kind": "example",
          "text": "The evidence gives relative sequence only. It does not give calendar years or the detailed process that produced the rock."
        },
        {
          "kind": "tip",
          "text": "Stretch: Build claim-evidence-reasoning from layer order and both fossil groups, then state the relative-time limit."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Use Rock Layers and Fossils as Change Evidence",
    "steps": [
      "Identify the lower plant layer as relatively older than the upper shell layer.",
      "Record plant fossils without shells below and marine shell fossils above.",
      "Explain that the fossil pattern supports a change from land to water over time.",
      "Limit the explanation to relative order; do not assign an age in years or a rock-formation process."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU07L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u07-l04-q01",
    "conceptTag": "relative-layer-order",
    "reviewCardId": "science-u07-l04-c1",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. Which layer is relatively older in the authored stack?",
    "choices": [
      {
        "id": "a",
        "text": "Lower plant layer"
      },
      {
        "id": "b",
        "text": "Upper shell layer"
      },
      {
        "id": "c",
        "text": "Both have the same rank"
      },
      {
        "id": "d",
        "text": "The title"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Rank 2 is defined as older than rank 1 here."
  },
  {
    "id": "science-u07-l04-q02",
    "conceptTag": "relative-layer-order",
    "reviewCardId": "science-u07-l04-c1",
    "type": "true-false",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. Relative-age ranks are not calendar years.",
    "choices": [
      {
        "id": "true",
        "text": "True — they show order only"
      },
      {
        "id": "false",
        "text": "False — rank 2 means two years"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The model explicitly states the convention."
  },
  {
    "id": "science-u07-l04-q03",
    "conceptTag": "relative-layer-order",
    "reviewCardId": "science-u07-l04-c1",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. Which layer is relatively younger?",
    "choices": [
      {
        "id": "a",
        "text": "Lower plant layer"
      },
      {
        "id": "b",
        "text": "Upper shell layer"
      },
      {
        "id": "c",
        "text": "Both are the oldest"
      },
      {
        "id": "d",
        "text": "No layer has an order"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The upper layer has rank 1."
  },
  {
    "id": "science-u07-l04-q04",
    "conceptTag": "relative-layer-order",
    "reviewCardId": "science-u07-l04-c1",
    "type": "fill-blank",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. The relatively older layer is the ___ plant layer.",
    "acceptedAnswers": [
      "lower"
    ],
    "explanation": "The plant layer lies below and has the older rank."
  },
  {
    "id": "science-u07-l04-q05",
    "conceptTag": "rock-fossil-patterns",
    "reviewCardId": "science-u07-l04-c2",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. What fossils are in the upper layer?",
    "choices": [
      {
        "id": "a",
        "text": "Plant fossils only"
      },
      {
        "id": "b",
        "text": "No fossils"
      },
      {
        "id": "c",
        "text": "Marine shell fossils"
      },
      {
        "id": "d",
        "text": "Dinosaur names"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The upper layer contains marine shells."
  },
  {
    "id": "science-u07-l04-q06",
    "conceptTag": "rock-fossil-patterns",
    "reviewCardId": "science-u07-l04-c2",
    "type": "true-false",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. The lower layer has plant fossils without shells.",
    "choices": [
      {
        "id": "true",
        "text": "True — that is the supplied pattern"
      },
      {
        "id": "false",
        "text": "False — it has only shells"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The lower record is plant fossils without shells."
  },
  {
    "id": "science-u07-l04-q07",
    "conceptTag": "rock-fossil-patterns",
    "reviewCardId": "science-u07-l04-c2",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. What pattern matters most?",
    "choices": [
      {
        "id": "a",
        "text": "The labels use different fonts"
      },
      {
        "id": "b",
        "text": "The layers have names"
      },
      {
        "id": "c",
        "text": "One layer is drawn wider"
      },
      {
        "id": "d",
        "text": "Plant fossils occur below marine shell fossils"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The fossil sequence is evidence."
  },
  {
    "id": "science-u07-l04-q08",
    "conceptTag": "rock-fossil-patterns",
    "reviewCardId": "science-u07-l04-c2",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. What does the explorer provide?",
    "choices": [
      {
        "id": "a",
        "text": "A model of relative layer order"
      },
      {
        "id": "b",
        "text": "An exact age measurement"
      },
      {
        "id": "c",
        "text": "A physical fossil observation"
      },
      {
        "id": "d",
        "text": "Proof of one formation process"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It represents the authored stack."
  },
  {
    "id": "science-u07-l04-q09",
    "conceptTag": "landscape-change-explanation",
    "reviewCardId": "science-u07-l04-c3",
    "type": "sort",
    "prompt": "Order the evidence and explanation.",
    "items": [
      {
        "id": "claim",
        "text": "Explain that the landscape changed from land to water"
      },
      {
        "id": "older",
        "text": "Older lower layer has plant fossils without shells"
      },
      {
        "id": "younger",
        "text": "Younger upper layer has marine shell fossils"
      }
    ],
    "correctOrder": [
      "older",
      "younger",
      "claim"
    ],
    "explanation": "The ordered fossil evidence supports the change claim."
  },
  {
    "id": "science-u07-l04-q10",
    "conceptTag": "landscape-change-explanation",
    "reviewCardId": "science-u07-l04-c3",
    "type": "true-false",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. The layers reveal the exact number of years between settings.",
    "choices": [
      {
        "id": "true",
        "text": "True — relative rank gives years"
      },
      {
        "id": "false",
        "text": "False — the record gives relative time only"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "No calendar ages are supplied."
  },
  {
    "id": "science-u07-l04-q11",
    "conceptTag": "landscape-change-explanation",
    "reviewCardId": "science-u07-l04-c3",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. Which explanation is supported?",
    "choices": [
      {
        "id": "a",
        "text": "The place never changed"
      },
      {
        "id": "b",
        "text": "The landscape changed from a land setting to a water setting over time"
      },
      {
        "id": "c",
        "text": "One exact rock-making process is proven"
      },
      {
        "id": "d",
        "text": "Every landscape changes identically"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The fossil shift supports land-to-water change."
  },
  {
    "id": "science-u07-l04-q12",
    "conceptTag": "landscape-change-explanation",
    "reviewCardId": "science-u07-l04-c3",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. Which evidence should be cited?",
    "choices": [
      {
        "id": "a",
        "text": "The model’s completion status"
      },
      {
        "id": "b",
        "text": "The observer’s favorite fossil"
      },
      {
        "id": "c",
        "text": "Plant fossils below and marine shells above"
      },
      {
        "id": "d",
        "text": "An invented calendar date"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The two fossil groups and order are relevant."
  },
  {
    "id": "science-u07-l04-q13",
    "conceptTag": "landscape-change-explanation",
    "reviewCardId": "science-u07-l04-c3",
    "type": "fill-blank",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. The evidence supports change over ___ time.",
    "acceptedAnswers": [
      "relative"
    ],
    "explanation": "The assessment boundary uses relative time."
  }
];

const scienceU07L04Lesson: Lesson = {
  ...scienceU07L04Core,
  quiz: { passThreshold: 8, pool: scienceU07L04Questions },
};

export const unit07Lessons: Lesson[] = [
  scienceU07L01Lesson,
  scienceU07L02Lesson,
  scienceU07L03Lesson,
  scienceU07L04Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u07.test.ts`. Expected: PASS with 4 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u07-l04`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u07.ts src/content/science/u07.test.ts`, then `git add src/content/science/u07.ts src/content/science/u07.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): use rock layers as change evidence"`.

## Unit 8 lesson tasks

### Task 5: Author `science-u08-l01` — Trace Energy and Fuels to Natural Resources

**Files:** Create `src/content/science/u08.ts` and `src/content/science/u08.test.ts`.

**Interfaces:** Produces schema-native `scienceU08L01Core`, `scienceU08L01Questions`, and `scienceU08L01Lesson`; appends manifest row 29 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Create this exact focused test file:

```ts
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u08.test.ts`. Expected: FAIL because `./u08` does not exist.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Create the source file with

```ts
import type { Lesson } from '../schema';

const scienceU08L01Core = {
  "id": "science-u08-l01",
  "unitId": "science-u08",
  "title": "Trace Energy and Fuels to Natural Resources",
  "indicatorCodes": [
    "4-ESS3-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A community energy guide lists sunlight, wind, water behind dams, fossil fuels, and nuclear fuels."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Each energy source or fuel begins with a natural resource."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will name origins, classify renewable and nonrenewable examples, and combine two source notes."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s trace each resource without mixing its category!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u08-l01-c1",
      "title": "Name resource origins",
      "blocks": [
        {
          "kind": "text",
          "text": "Sunlight comes from the Sun; wind is moving air; dammed water is stored water in a managed river system; coal, oil, and natural gas are fossil fuels from Earth; uranium is a nuclear fuel mined from Earth."
        },
        {
          "kind": "example",
          "text": "Resource origin answers where the energy source or fuel comes from, not whether one use is preferred."
        },
        {
          "kind": "tip",
          "text": "Support: Complete ____ comes from ____ for each of the five resource groups."
        }
      ]
    },
    {
      "id": "science-u08-l01-c2",
      "title": "Classify renewable and nonrenewable resources",
      "blocks": [
        {
          "kind": "text",
          "text": "Renewable resources are replenished through ongoing natural processes on human time scales, including sunlight, wind, and flowing/stored water. Fossil and nuclear fuels are nonrenewable because their supplies are limited."
        },
        {
          "kind": "example",
          "text": "In the sorter, sunlight is renewable and coal is nonrenewable. The two examples stand for a larger list explained in the card."
        },
        {
          "kind": "tip",
          "text": "Response frame: ____ is renewable/nonrenewable because ____."
        }
      ],
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
      "id": "science-u08-l01-c3",
      "title": "Combine information from sources",
      "blocks": [
        {
          "kind": "text",
          "text": "Source A says wind, sunlight, and water behind dams can be renewed by ongoing natural processes. Source B says fossil and nuclear fuels come from limited Earth materials."
        },
        {
          "kind": "example",
          "text": "Combining means using relevant information from both sources in one accurate description."
        },
        {
          "kind": "tip",
          "text": "Stretch: Write one sentence with all three renewable examples and both nonrenewable fuel groups, citing Source A and Source B."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Trace Energy and Fuels to Natural Resources",
    "steps": [
      "From Source A, list wind, sunlight, and water behind dams as renewable examples.",
      "From Source B, list fossil fuels and nuclear fuels as nonrenewable examples.",
      "Trace each example to its natural origin.",
      "Combine both sources into one description without claiming that all uses have identical effects."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Append:

```ts
const scienceU08L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u08-l01-q01",
    "conceptTag": "resource-origin",
    "reviewCardId": "science-u08-l01-c1",
    "type": "multiple-choice",
    "prompt": "What natural resource supplies solar energy?",
    "choices": [
      {
        "id": "a",
        "text": "Sunlight"
      },
      {
        "id": "b",
        "text": "Coal"
      },
      {
        "id": "c",
        "text": "Uranium"
      },
      {
        "id": "d",
        "text": "Moving air"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Solar energy comes from sunlight."
  },
  {
    "id": "science-u08-l01-q02",
    "conceptTag": "resource-origin",
    "reviewCardId": "science-u08-l01-c1",
    "type": "true-false",
    "prompt": "Wind is moving air used as a natural energy resource.",
    "choices": [
      {
        "id": "true",
        "text": "True — wind is the resource"
      },
      {
        "id": "false",
        "text": "False — wind is a fossil fuel"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The guide identifies moving air."
  },
  {
    "id": "science-u08-l01-q03",
    "conceptTag": "resource-origin",
    "reviewCardId": "science-u08-l01-c1",
    "type": "multiple-choice",
    "prompt": "Which resource is held behind a dam?",
    "choices": [
      {
        "id": "a",
        "text": "Sunlight"
      },
      {
        "id": "b",
        "text": "Water"
      },
      {
        "id": "c",
        "text": "Coal"
      },
      {
        "id": "d",
        "text": "Uranium"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Dams hold water."
  },
  {
    "id": "science-u08-l01-q04",
    "conceptTag": "resource-origin",
    "reviewCardId": "science-u08-l01-c1",
    "type": "fill-blank",
    "prompt": "Coal, oil, and natural gas are ___ fuels.",
    "acceptedAnswers": [
      "fossil"
    ],
    "explanation": "They are fossil fuels."
  },
  {
    "id": "science-u08-l01-q05",
    "conceptTag": "resource-kind",
    "reviewCardId": "science-u08-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which is renewable?",
    "choices": [
      {
        "id": "a",
        "text": "Coal"
      },
      {
        "id": "b",
        "text": "Oil"
      },
      {
        "id": "c",
        "text": "Sunlight"
      },
      {
        "id": "d",
        "text": "Uranium"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Sunlight is replenished continuously."
  },
  {
    "id": "science-u08-l01-q06",
    "conceptTag": "resource-kind",
    "reviewCardId": "science-u08-l01-c2",
    "type": "true-false",
    "prompt": "Source B: fossil and nuclear fuels are nonrenewable and use limited Earth materials. Nuclear fuels are classified as nonrenewable in the source.",
    "choices": [
      {
        "id": "true",
        "text": "True — their mined supply is limited"
      },
      {
        "id": "false",
        "text": "False — they are listed with wind"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The standard names nuclear fuels as nonrenewable."
  },
  {
    "id": "science-u08-l01-q07",
    "conceptTag": "resource-kind",
    "reviewCardId": "science-u08-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which pair is nonrenewable?",
    "choices": [
      {
        "id": "a",
        "text": "Wind and sunlight"
      },
      {
        "id": "b",
        "text": "Sunlight and water"
      },
      {
        "id": "c",
        "text": "Wind and water"
      },
      {
        "id": "d",
        "text": "Coal and uranium"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Coal is fossil fuel and uranium nuclear fuel."
  },
  {
    "id": "science-u08-l01-q08",
    "conceptTag": "resource-kind",
    "reviewCardId": "science-u08-l01-c2",
    "type": "multiple-choice",
    "prompt": "Sorter setup: sunlight is labeled renewable and coal nonrenewable. What does the sorter do?",
    "choices": [
      {
        "id": "a",
        "text": "Represents authored categories for sunlight and coal"
      },
      {
        "id": "b",
        "text": "Measures resource supplies"
      },
      {
        "id": "c",
        "text": "Observes mining"
      },
      {
        "id": "d",
        "text": "Proves environmental effects"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It is a classification model."
  },
  {
    "id": "science-u08-l01-q09",
    "conceptTag": "resource-information",
    "reviewCardId": "science-u08-l01-c3",
    "type": "multiple-choice",
    "prompt": "Source A: wind, sunlight, and dammed water are renewable. Source B: fossil and nuclear fuels are nonrenewable and use limited Earth materials. Which sentence combines both sources?",
    "choices": [
      {
        "id": "a",
        "text": "Only Source A matters"
      },
      {
        "id": "b",
        "text": "Wind, sunlight, and dammed water are renewable; fossil and nuclear fuels are nonrenewable"
      },
      {
        "id": "c",
        "text": "Every resource is renewable"
      },
      {
        "id": "d",
        "text": "Every resource has the same origin"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It includes both lists accurately."
  },
  {
    "id": "science-u08-l01-q10",
    "conceptTag": "resource-information",
    "reviewCardId": "science-u08-l01-c3",
    "type": "true-false",
    "prompt": "Combining sources means using relevant information from each.",
    "choices": [
      {
        "id": "true",
        "text": "True — both contribute to the description"
      },
      {
        "id": "false",
        "text": "False — copy only one source"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The combined statement uses A and B."
  },
  {
    "id": "science-u08-l01-q11",
    "conceptTag": "resource-information",
    "reviewCardId": "science-u08-l01-c3",
    "type": "multiple-choice",
    "prompt": "Source B: fossil and nuclear fuels are nonrenewable and use limited Earth materials. Which information comes from Source B?",
    "choices": [
      {
        "id": "a",
        "text": "Wind is moving air"
      },
      {
        "id": "b",
        "text": "Sunlight comes from the Sun"
      },
      {
        "id": "c",
        "text": "Fossil and nuclear fuels use limited Earth materials"
      },
      {
        "id": "d",
        "text": "Water can be stored behind dams"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "That is Source B’s statement."
  },
  {
    "id": "science-u08-l01-q12",
    "conceptTag": "resource-information",
    "reviewCardId": "science-u08-l01-c3",
    "type": "multiple-choice",
    "prompt": "Source A: wind, sunlight, and dammed water are renewable. Source B: fossil and nuclear fuels are nonrenewable and use limited Earth materials. Which claim is unsupported?",
    "choices": [
      {
        "id": "a",
        "text": "Sunlight is renewable"
      },
      {
        "id": "b",
        "text": "Coal is nonrenewable"
      },
      {
        "id": "c",
        "text": "Uranium is a nuclear fuel"
      },
      {
        "id": "d",
        "text": "All resource uses have identical effects"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The sources do not say effects are identical."
  },
  {
    "id": "science-u08-l01-q13",
    "conceptTag": "resource-information",
    "reviewCardId": "science-u08-l01-c3",
    "type": "fill-blank",
    "prompt": "Wind, sunlight, and dammed water are ___ resources.",
    "acceptedAnswers": [
      "renewable"
    ],
    "explanation": "Source A classifies these as renewable."
  }
];

const scienceU08L01Lesson: Lesson = {
  ...scienceU08L01Core,
  quiz: { passThreshold: 8, pool: scienceU08L01Questions },
};

export const unit08Lessons: Lesson[] = [
  scienceU08L01Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u08.test.ts`. Expected: PASS with 1 lesson row, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u08-l01`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u08.ts src/content/science/u08.test.ts`, then `git add src/content/science/u08.ts src/content/science/u08.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): start science resources and hazards unit"`.
### Task 6: Author `science-u08-l02` — Explain Environmental Effects of Resource Use

**Files:** Modify `src/content/science/u08.ts` and `src/content/science/u08.test.ts`.

**Interfaces:** Produces schema-native `scienceU08L02Core`, `scienceU08L02Questions`, and `scienceU08L02Lesson`; appends manifest row 30 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u08.test.ts`. Expected: FAIL because the test expects 2 lesson rows while production exports 1.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU08L02Core = {
  "id": "science-u08-l02",
  "unitId": "science-u08",
  "title": "Explain Environmental Effects of Resource Use",
  "indicatorCodes": [
    "4-ESS3-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "An information packet compares electricity from wind, dammed water, sunlight, and fuels."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Every choice can have benefits and environmental effects that depend on location and use."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will connect resources to uses, describe effects, and compare evidence without turning the lesson into a vote."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s weigh the supplied information carefully!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u08-l02-c1",
      "title": "Connect a resource to its use",
      "blocks": [
        {
          "kind": "text",
          "text": "Wind turbines, dams, and solar panels can help produce electricity. Fossil fuels may be burned for electricity or transportation; nuclear fuels can produce electricity at a plant. Conservation means using less electricity for the same need."
        },
        {
          "kind": "example",
          "text": "The sorter classifies wind, oil, and using less electricity; it does not measure their effects."
        },
        {
          "kind": "tip",
          "text": "Support: Match each resource or action to electricity, transportation, or conservation before comparing effects."
        }
      ],
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
      "id": "science-u08-l02-c2",
      "title": "Describe an environmental effect",
      "blocks": [
        {
          "kind": "text",
          "text": "Packet facts: wind turbines produce electricity without burning fuel at the turbine but can affect flying wildlife; dams provide controllable water-powered electricity but change river flow and habitat; solar panels produce electricity from sunlight but require space and materials; burning fossil fuels releases air pollution; fuel extraction can disturb land or water; nuclear plants produce electricity without burning fossil fuel but require mined fuel and careful waste management."
        },
        {
          "kind": "example",
          "text": "An environmental effect is a change to air, water, land, or living things linked to a resource use."
        },
        {
          "kind": "tip",
          "text": "Response frame: Using ____ can benefit ____ and can affect ____ by ____."
        }
      ]
    },
    {
      "id": "science-u08-l02-c3",
      "title": "Compare choices using evidence",
      "blocks": [
        {
          "kind": "text",
          "text": "A fair comparison names the same goal, then cites a benefit and effect for each option. It does not claim one option has no impact."
        },
        {
          "kind": "example",
          "text": "For electricity, wind avoids burning fuel at the turbine but may affect flying wildlife; dammed water is controllable but changes river habitat."
        },
        {
          "kind": "tip",
          "text": "Stretch: Compare two options for the same goal with two packet facts each, and explain what local information would still be needed."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Explain Environmental Effects of Resource Use",
    "steps": [
      "Choose the common goal of producing electricity.",
      "For wind, cite no fuel burning at the turbine and possible effects on flying wildlife.",
      "For dammed water, cite controllable output and changed river flow/habitat.",
      "Conclude that both have benefits and effects; local wildlife, river, land, and energy needs would matter for a decision."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU08L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u08-l02-q01",
    "conceptTag": "resource-use",
    "reviewCardId": "science-u08-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which resource can power turbines to produce electricity?",
    "choices": [
      {
        "id": "a",
        "text": "Wind"
      },
      {
        "id": "b",
        "text": "A conservation label"
      },
      {
        "id": "c",
        "text": "Coal color"
      },
      {
        "id": "d",
        "text": "A map key"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Wind turns turbines."
  },
  {
    "id": "science-u08-l02-q02",
    "conceptTag": "resource-use",
    "reviewCardId": "science-u08-l02-c1",
    "type": "true-false",
    "prompt": "Using less electricity is a conservation action.",
    "choices": [
      {
        "id": "true",
        "text": "True — it reduces use for the same need"
      },
      {
        "id": "false",
        "text": "False — it is a fuel"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The sorter includes conservation."
  },
  {
    "id": "science-u08-l02-q03",
    "conceptTag": "resource-use",
    "reviewCardId": "science-u08-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which resource commonly fuels transportation?",
    "choices": [
      {
        "id": "a",
        "text": "Sunlight directly in every vehicle"
      },
      {
        "id": "b",
        "text": "Oil"
      },
      {
        "id": "c",
        "text": "A dam"
      },
      {
        "id": "d",
        "text": "Wind alone"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Oil is a fossil fuel used for transportation."
  },
  {
    "id": "science-u08-l02-q04",
    "conceptTag": "resource-use",
    "reviewCardId": "science-u08-l02-c1",
    "type": "fill-blank",
    "prompt": "Using less electricity for the same need is called ___.",
    "acceptedAnswers": [
      "conservation",
      "conserving"
    ],
    "explanation": "Conservation reduces resource use."
  },
  {
    "id": "science-u08-l02-q05",
    "conceptTag": "resource-environment-effect",
    "reviewCardId": "science-u08-l02-c2",
    "type": "multiple-choice",
    "prompt": "Packet fact: burning fossil fuels releases air pollution. Which effect is linked to burning fossil fuels in the packet?",
    "choices": [
      {
        "id": "a",
        "text": "No environmental change"
      },
      {
        "id": "b",
        "text": "Only brighter labels"
      },
      {
        "id": "c",
        "text": "Air pollution"
      },
      {
        "id": "d",
        "text": "More river flow"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Burning releases pollution."
  },
  {
    "id": "science-u08-l02-q06",
    "conceptTag": "resource-environment-effect",
    "reviewCardId": "science-u08-l02-c2",
    "type": "true-false",
    "prompt": "Dams can change river flow and habitat.",
    "choices": [
      {
        "id": "true",
        "text": "True — that is a supplied effect"
      },
      {
        "id": "false",
        "text": "False — dams never affect rivers"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The packet names the change."
  },
  {
    "id": "science-u08-l02-q07",
    "conceptTag": "resource-environment-effect",
    "reviewCardId": "science-u08-l02-c2",
    "type": "multiple-choice",
    "prompt": "Packet fact: wind turbines produce electricity without burning fuel at the turbine but may affect flying wildlife. Which statement about wind is accurate?",
    "choices": [
      {
        "id": "a",
        "text": "It requires burning coal at each turbine"
      },
      {
        "id": "b",
        "text": "It has no possible effect"
      },
      {
        "id": "c",
        "text": "It is a nuclear fuel"
      },
      {
        "id": "d",
        "text": "It produces electricity without burning fuel at the turbine but may affect flying wildlife"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It includes both benefit and effect."
  },
  {
    "id": "science-u08-l02-q08",
    "conceptTag": "resource-environment-effect",
    "reviewCardId": "science-u08-l02-c2",
    "type": "multiple-choice",
    "prompt": "Packet fact: solar panels produce electricity from sunlight but require space and materials. What is one solar-panel consideration?",
    "choices": [
      {
        "id": "a",
        "text": "Panels require space and materials"
      },
      {
        "id": "b",
        "text": "Panels are fossil fuels"
      },
      {
        "id": "c",
        "text": "Panels always damage rivers"
      },
      {
        "id": "d",
        "text": "Panels remove all impacts"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The packet names land/material needs."
  },
  {
    "id": "science-u08-l02-q09",
    "conceptTag": "resource-choice-comparison",
    "reviewCardId": "science-u08-l02-c3",
    "type": "multiple-choice",
    "prompt": "Packet facts: wind avoids fuel burning at the turbine but may affect wildlife; dams provide controllable electricity but change river habitat. Which comparison is balanced?",
    "choices": [
      {
        "id": "a",
        "text": "Wind is perfect and dams are harmful"
      },
      {
        "id": "b",
        "text": "Wind avoids turbine fuel burning but may affect wildlife; dams are controllable but change river habitat"
      },
      {
        "id": "c",
        "text": "All options have identical effects"
      },
      {
        "id": "d",
        "text": "Only cost matters"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It cites benefit and effect for both."
  },
  {
    "id": "science-u08-l02-q10",
    "conceptTag": "resource-choice-comparison",
    "reviewCardId": "science-u08-l02-c3",
    "type": "true-false",
    "prompt": "A strong comparison can acknowledge uncertainty and local conditions.",
    "choices": [
      {
        "id": "true",
        "text": "True — effects depend on setting and use"
      },
      {
        "id": "false",
        "text": "False — one answer fits every place"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Local evidence matters."
  },
  {
    "id": "science-u08-l02-q11",
    "conceptTag": "resource-choice-comparison",
    "reviewCardId": "science-u08-l02-c3",
    "type": "multiple-choice",
    "prompt": "Packet: wind may affect wildlife; dams change river habitat; solar needs space and materials; fossil-fuel burning pollutes air; local conditions vary. Which information is still useful for a local decision?",
    "choices": [
      {
        "id": "a",
        "text": "The designer’s favorite color"
      },
      {
        "id": "b",
        "text": "The number of words in the packet"
      },
      {
        "id": "c",
        "text": "Local wildlife, river, land, and energy needs"
      },
      {
        "id": "d",
        "text": "A promise of no impacts"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Those conditions affect fit."
  },
  {
    "id": "science-u08-l02-q12",
    "conceptTag": "resource-choice-comparison",
    "reviewCardId": "science-u08-l02-c3",
    "type": "multiple-choice",
    "prompt": "Packet: wind may affect wildlife; dams change river habitat; solar needs space and materials; fossil-fuel burning pollutes air; local conditions vary. Which claim goes beyond the packet?",
    "choices": [
      {
        "id": "a",
        "text": "Fossil-fuel burning affects air"
      },
      {
        "id": "b",
        "text": "Dams alter river habitat"
      },
      {
        "id": "c",
        "text": "Wind may affect flying wildlife"
      },
      {
        "id": "d",
        "text": "One resource is always best everywhere"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The evidence does not support a universal choice."
  },
  {
    "id": "science-u08-l02-q13",
    "conceptTag": "resource-choice-comparison",
    "reviewCardId": "science-u08-l02-c3",
    "type": "fill-blank",
    "prompt": "A comparison should include a benefit and an environmental ___.",
    "acceptedAnswers": [
      "effect",
      "impact"
    ],
    "explanation": "Both sides are required."
  }
];

const scienceU08L02Lesson: Lesson = {
  ...scienceU08L02Core,
  quiz: { passThreshold: 8, pool: scienceU08L02Questions },
};

export const unit08Lessons: Lesson[] = [
  scienceU08L01Lesson,
  scienceU08L02Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u08.test.ts`. Expected: PASS with 2 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u08-l02`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u08.ts src/content/science/u08.test.ts`, then `git add src/content/science/u08.ts src/content/science/u08.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): compare resource-use effects"`.
### Task 7: Author `science-u08-l03` — Describe Natural-Process Hazards

**Files:** Modify `src/content/science/u08.ts` and `src/content/science/u08.test.ts`.

**Interfaces:** Produces schema-native `scienceU08L03Core`, `scienceU08L03Questions`, and `scienceU08L03Lesson`; appends manifest row 31 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u08.test.ts`. Expected: FAIL because the test expects 3 lesson rows while production exports 2.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU08L03Core = {
  "id": "science-u08-l03",
  "unitId": "science-u08",
  "title": "Describe Natural-Process Hazards",
  "indicatorCodes": [
    "4-ESS3-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Earth processes can create hazards that affect people and communities."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "This lesson uses earthquakes, floods, hurricanes, tornadoes, and coastal erosion only."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will connect each process to an impact and match a practical solution to that impact."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s plan calmly: solutions reduce impact but never promise perfect safety."
    }
  ],
  "learnCards": [
    {
      "id": "science-u08-l03-c1",
      "title": "Connect a process to a hazard",
      "blocks": [
        {
          "kind": "text",
          "text": "Ground shaking creates earthquake hazards; overflowing water creates floods; powerful tropical storms create hurricane hazards; rotating storm columns create tornado hazards; waves and currents removing shoreline material create coastal erosion."
        },
        {
          "kind": "example",
          "text": "Name the process and hazard without frightening imagery or adding hazards outside the assessed set."
        },
        {
          "kind": "tip",
          "text": "Support: Match one process phrase to one of the five hazard names before reading impacts."
        }
      ]
    },
    {
      "id": "science-u08-l03-c2",
      "title": "Identify impacts on people",
      "blocks": [
        {
          "kind": "text",
          "text": "Possible impacts include damaged buildings and roads, water entering homes, wind damaging windows or roofs, warning time needed for shelter, and shoreline loss threatening paths or buildings."
        },
        {
          "kind": "example",
          "text": "An impact is the harm or disruption to reduce. It guides which solution fits."
        },
        {
          "kind": "tip",
          "text": "Response frame: The ____ hazard can affect people by ____."
        }
      ]
    },
    {
      "id": "science-u08-l03-c3",
      "title": "Match a solution to an impact",
      "blocks": [
        {
          "kind": "text",
          "text": "Storm shutters reduce window damage from hurricane winds; early warnings give people time to follow official plans. Neither removes all hurricane risk."
        },
        {
          "kind": "example",
          "text": "The activity pairs these protections and rejects ignoring forecasts. It is a simplified planning model, not emergency advice."
        },
        {
          "kind": "tip",
          "text": "Stretch: Match two different solutions to two different impacts and explain each limit."
        }
      ],
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
  "workedExample": {
    "title": "Apply: Describe Natural-Process Hazards",
    "steps": [
      "Name hurricane winds as a hazard process that can damage windows and roofs.",
      "Identify window damage and need for preparation time as two impacts.",
      "Match shutters to reducing window damage and early warnings to preparation time.",
      "Explain that the combined plan can reduce impacts but cannot guarantee safety or prevent every loss."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU08L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u08-l03-q01",
    "conceptTag": "hazard-cause-effect",
    "reviewCardId": "science-u08-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which process creates a flood hazard?",
    "choices": [
      {
        "id": "a",
        "text": "Water overflowing onto normally dry land"
      },
      {
        "id": "b",
        "text": "Ground shaking"
      },
      {
        "id": "c",
        "text": "A rotating storm column"
      },
      {
        "id": "d",
        "text": "Shoreline material building up only"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Overflowing water creates floods."
  },
  {
    "id": "science-u08-l03-q02",
    "conceptTag": "hazard-cause-effect",
    "reviewCardId": "science-u08-l03-c1",
    "type": "true-false",
    "prompt": "Ground shaking is connected to earthquake hazards.",
    "choices": [
      {
        "id": "true",
        "text": "True — shaking can damage structures"
      },
      {
        "id": "false",
        "text": "False — it is a hurricane process"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Earthquakes involve ground shaking."
  },
  {
    "id": "science-u08-l03-q03",
    "conceptTag": "hazard-cause-effect",
    "reviewCardId": "science-u08-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which hazard involves a rotating storm column?",
    "choices": [
      {
        "id": "a",
        "text": "Flood"
      },
      {
        "id": "b",
        "text": "Tornado"
      },
      {
        "id": "c",
        "text": "Coastal erosion"
      },
      {
        "id": "d",
        "text": "Earthquake"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "That describes a tornado."
  },
  {
    "id": "science-u08-l03-q04",
    "conceptTag": "hazard-cause-effect",
    "reviewCardId": "science-u08-l03-c1",
    "type": "fill-blank",
    "prompt": "Waves and currents removing shoreline material cause coastal ___.",
    "acceptedAnswers": [
      "erosion"
    ],
    "explanation": "The named hazard is coastal erosion."
  },
  {
    "id": "science-u08-l03-q05",
    "conceptTag": "hazard-human-impact",
    "reviewCardId": "science-u08-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which is a possible hurricane impact?",
    "choices": [
      {
        "id": "a",
        "text": "A map gains a title"
      },
      {
        "id": "b",
        "text": "The Sun stops shining"
      },
      {
        "id": "c",
        "text": "Wind damages windows or roofs"
      },
      {
        "id": "d",
        "text": "Every road improves"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Wind damage is a human impact."
  },
  {
    "id": "science-u08-l03-q06",
    "conceptTag": "hazard-human-impact",
    "reviewCardId": "science-u08-l03-c2",
    "type": "true-false",
    "prompt": "A hazard impact can be harm to buildings, roads, or access.",
    "choices": [
      {
        "id": "true",
        "text": "True — these affect communities"
      },
      {
        "id": "false",
        "text": "False — hazards cannot affect structures"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The card lists these impacts."
  },
  {
    "id": "science-u08-l03-q07",
    "conceptTag": "hazard-human-impact",
    "reviewCardId": "science-u08-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which impact fits a flood?",
    "choices": [
      {
        "id": "a",
        "text": "Only ground shaking"
      },
      {
        "id": "b",
        "text": "Only a broken code"
      },
      {
        "id": "c",
        "text": "A longer wavelength"
      },
      {
        "id": "d",
        "text": "Water entering homes and roads"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Floodwater can enter built areas."
  },
  {
    "id": "science-u08-l03-q08",
    "conceptTag": "hazard-human-impact",
    "reviewCardId": "science-u08-l03-c2",
    "type": "multiple-choice",
    "prompt": "Why identify the specific impact?",
    "choices": [
      {
        "id": "a",
        "text": "It helps choose a solution that addresses the need"
      },
      {
        "id": "b",
        "text": "It guarantees safety"
      },
      {
        "id": "c",
        "text": "It replaces evidence"
      },
      {
        "id": "d",
        "text": "It changes the hazard"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Solution fit depends on impact."
  },
  {
    "id": "science-u08-l03-q09",
    "conceptTag": "hazard-impact-solution",
    "reviewCardId": "science-u08-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which solution addresses hurricane window damage?",
    "choices": [
      {
        "id": "a",
        "text": "Ignore forecasts"
      },
      {
        "id": "b",
        "text": "Storm shutters"
      },
      {
        "id": "c",
        "text": "Block every drain"
      },
      {
        "id": "d",
        "text": "Remove map keys"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Shutters protect windows."
  },
  {
    "id": "science-u08-l03-q10",
    "conceptTag": "hazard-impact-solution",
    "reviewCardId": "science-u08-l03-c3",
    "type": "true-false",
    "prompt": "Early warnings can give people time to follow official plans.",
    "choices": [
      {
        "id": "true",
        "text": "True — warning time supports preparation"
      },
      {
        "id": "false",
        "text": "False — warnings cause storms"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Warnings address preparation time."
  },
  {
    "id": "science-u08-l03-q11",
    "conceptTag": "hazard-impact-solution",
    "reviewCardId": "science-u08-l03-c3",
    "type": "multiple-choice",
    "prompt": "Plan facts: storm shutters reduce hurricane window damage; early warnings add preparation time; neither removes all risk. Which pair forms the authored hurricane plan?",
    "choices": [
      {
        "id": "a",
        "text": "Ignore forecasts and open windows"
      },
      {
        "id": "b",
        "text": "Shutters only with a safety guarantee"
      },
      {
        "id": "c",
        "text": "Storm shutters and early warnings"
      },
      {
        "id": "d",
        "text": "Block drains and ignore warnings"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The two solutions address different impacts."
  },
  {
    "id": "science-u08-l03-q12",
    "conceptTag": "hazard-impact-solution",
    "reviewCardId": "science-u08-l03-c3",
    "type": "multiple-choice",
    "prompt": "Plan facts: storm shutters reduce hurricane window damage; early warnings add preparation time; neither removes all risk. Which statement is accurate?",
    "choices": [
      {
        "id": "a",
        "text": "Shutters prevent every hurricane effect"
      },
      {
        "id": "b",
        "text": "Warnings stop wind"
      },
      {
        "id": "c",
        "text": "The model is emergency advice"
      },
      {
        "id": "d",
        "text": "The solutions can reduce impacts but do not eliminate risk"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Mitigation is limited."
  },
  {
    "id": "science-u08-l03-q13",
    "conceptTag": "hazard-impact-solution",
    "reviewCardId": "science-u08-l03-c3",
    "type": "fill-blank",
    "prompt": "A solution should match the named hazard ___.",
    "acceptedAnswers": [
      "impact"
    ],
    "explanation": "Impact-solution fit guides design."
  }
];

const scienceU08L03Lesson: Lesson = {
  ...scienceU08L03Core,
  quiz: { passThreshold: 8, pool: scienceU08L03Questions },
};

export const unit08Lessons: Lesson[] = [
  scienceU08L01Lesson,
  scienceU08L02Lesson,
  scienceU08L03Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u08.test.ts`. Expected: PASS with 3 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u08-l03`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u08.ts src/content/science/u08.test.ts`, then `git add src/content/science/u08.ts src/content/science/u08.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): describe assessed natural hazards"`.
### Task 8: Author `science-u08-l04` — Compare Hazard-Impact Solutions

**Files:** Modify `src/content/science/u08.ts` and `src/content/science/u08.test.ts`.

**Interfaces:** Produces schema-native `scienceU08L04Core`, `scienceU08L04Questions`, and `scienceU08L04Lesson`; appends manifest row 32 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u08.test.ts`. Expected: FAIL because the test expects 4 lesson rows while production exports 3.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU08L04Core = {
  "id": "science-u08-l04",
  "unitId": "science-u08",
  "title": "Compare Hazard-Impact Solutions",
  "indicatorCodes": [
    "4-ESS3-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A riverside community compares ways to reduce flood impacts on homes, roads, and preparation time."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "A floodwater channel and an early warning address different parts of the problem."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will define criteria, compare strengths and limits, and justify a combined plan."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s choose solutions with evidence and honest limits!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u08-l04-c1",
      "title": "Define criteria for a solution",
      "blocks": [
        {
          "kind": "text",
          "text": "Effectiveness asks how well a solution addresses the named impact. Feasibility asks whether it can be built, maintained, or used. Coverage asks which people or places it helps."
        },
        {
          "kind": "example",
          "text": "For this scenario, criteria are reducing water near roads/homes, providing warning time, fitting available land, and remaining maintainable."
        },
        {
          "kind": "tip",
          "text": "Support: Write the impact first, then choose one effectiveness, feasibility, or coverage criterion."
        }
      ]
    },
    {
      "id": "science-u08-l04-c2",
      "title": "Compare strengths and limits",
      "blocks": [
        {
          "kind": "text",
          "text": "A floodwater channel can redirect some water away from built areas but needs land and maintenance. A flood warning can reach many people quickly but does not physically stop water. Blocking every drain is poor because it can trap water."
        },
        {
          "kind": "example",
          "text": "The activity identifies channel plus warning as the authored combination; it does not promise that the plan removes flood risk."
        },
        {
          "kind": "tip",
          "text": "Response frame: ____ helps by ____, but its limit is ____."
        }
      ],
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
      "id": "science-u08-l04-c3",
      "title": "Justify a combined plan",
      "blocks": [
        {
          "kind": "text",
          "text": "A combined plan is justified when its parts address different impacts and their limits are acknowledged."
        },
        {
          "kind": "example",
          "text": "Use the channel to redirect some floodwater and the warning to provide preparation time. Maintain drains rather than blocking them."
        },
        {
          "kind": "tip",
          "text": "Stretch: Cite one strength and one limit for each chosen solution, then explain why the combination still cannot guarantee safety."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Compare Hazard-Impact Solutions",
    "steps": [
      "Define the impacts: water near roads/homes and limited preparation time.",
      "Compare channel strength/land-maintenance limit and warning strength/no-water-blocking limit.",
      "Choose channel plus warning because they address physical water movement and information needs.",
      "State that maintained drainage and official planning remain important and the combination reduces, not eliminates, flood impact."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU08L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u08-l04-q01",
    "conceptTag": "hazard-solution-criteria",
    "reviewCardId": "science-u08-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which criterion asks how well a solution addresses an impact?",
    "choices": [
      {
        "id": "a",
        "text": "Effectiveness"
      },
      {
        "id": "b",
        "text": "Decoration"
      },
      {
        "id": "c",
        "text": "Popularity"
      },
      {
        "id": "d",
        "text": "Length of its name"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Effectiveness concerns impact reduction."
  },
  {
    "id": "science-u08-l04-q02",
    "conceptTag": "hazard-solution-criteria",
    "reviewCardId": "science-u08-l04-c1",
    "type": "true-false",
    "prompt": "Feasibility can include land and maintenance needs.",
    "choices": [
      {
        "id": "true",
        "text": "True — those affect whether a solution can work"
      },
      {
        "id": "false",
        "text": "False — feasibility means color"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The scenario names both constraints."
  },
  {
    "id": "science-u08-l04-q03",
    "conceptTag": "hazard-solution-criteria",
    "reviewCardId": "science-u08-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which is a coverage question?",
    "choices": [
      {
        "id": "a",
        "text": "Is the label blue?"
      },
      {
        "id": "b",
        "text": "Which people or places can the warning reach?"
      },
      {
        "id": "c",
        "text": "Does the river have a name?"
      },
      {
        "id": "d",
        "text": "Is the solution someone’s favorite?"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Coverage concerns who or what benefits."
  },
  {
    "id": "science-u08-l04-q04",
    "conceptTag": "hazard-solution-criteria",
    "reviewCardId": "science-u08-l04-c1",
    "type": "fill-blank",
    "prompt": "The criterion about whether a plan can be built and maintained is ___.",
    "acceptedAnswers": [
      "feasibility"
    ],
    "explanation": "Feasibility concerns practical fit."
  },
  {
    "id": "science-u08-l04-q05",
    "conceptTag": "hazard-solution-comparison",
    "reviewCardId": "science-u08-l04-c2",
    "type": "multiple-choice",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. What is a strength of a floodwater channel?",
    "choices": [
      {
        "id": "a",
        "text": "It guarantees no flood"
      },
      {
        "id": "b",
        "text": "It sends warnings"
      },
      {
        "id": "c",
        "text": "It can redirect some water away from built areas"
      },
      {
        "id": "d",
        "text": "It blocks every drain"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Redirecting water addresses a physical impact."
  },
  {
    "id": "science-u08-l04-q06",
    "conceptTag": "hazard-solution-comparison",
    "reviewCardId": "science-u08-l04-c2",
    "type": "true-false",
    "prompt": "A flood warning physically stops water from rising.",
    "choices": [
      {
        "id": "true",
        "text": "True — messages block water"
      },
      {
        "id": "false",
        "text": "False — it provides information and time"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Warning does not move water."
  },
  {
    "id": "science-u08-l04-q07",
    "conceptTag": "hazard-solution-comparison",
    "reviewCardId": "science-u08-l04-c2",
    "type": "multiple-choice",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. What is a channel limitation?",
    "choices": [
      {
        "id": "a",
        "text": "It provides no physical effect"
      },
      {
        "id": "b",
        "text": "It cannot be maintained"
      },
      {
        "id": "c",
        "text": "It always worsens floods"
      },
      {
        "id": "d",
        "text": "It needs land and maintenance"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Those are supplied constraints."
  },
  {
    "id": "science-u08-l04-q08",
    "conceptTag": "hazard-solution-comparison",
    "reviewCardId": "science-u08-l04-c2",
    "type": "multiple-choice",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. Why is blocking every drain a poor choice?",
    "choices": [
      {
        "id": "a",
        "text": "It can trap water"
      },
      {
        "id": "b",
        "text": "It provides warning time"
      },
      {
        "id": "c",
        "text": "It redirects water safely"
      },
      {
        "id": "d",
        "text": "It improves drainage"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Blocked drains can worsen pooling."
  },
  {
    "id": "science-u08-l04-q09",
    "conceptTag": "hazard-solution-justification",
    "reviewCardId": "science-u08-l04-c3",
    "type": "multiple-choice",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. Which combined plan is best supported?",
    "choices": [
      {
        "id": "a",
        "text": "Block every drain and ignore forecasts"
      },
      {
        "id": "b",
        "text": "Use a floodwater channel and an early warning"
      },
      {
        "id": "c",
        "text": "Use only a map title"
      },
      {
        "id": "d",
        "text": "Promise the flood cannot happen"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The pair addresses water movement and preparation."
  },
  {
    "id": "science-u08-l04-q10",
    "conceptTag": "hazard-solution-justification",
    "reviewCardId": "science-u08-l04-c3",
    "type": "true-false",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. The combined plan still has limits and cannot guarantee safety.",
    "choices": [
      {
        "id": "true",
        "text": "True — mitigation reduces rather than removes risk"
      },
      {
        "id": "false",
        "text": "False — two solutions eliminate all risk"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The boundary requires honest limits."
  },
  {
    "id": "science-u08-l04-q11",
    "conceptTag": "hazard-solution-justification",
    "reviewCardId": "science-u08-l04-c3",
    "type": "multiple-choice",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. Why combine channel and warning?",
    "choices": [
      {
        "id": "a",
        "text": "They have matching names"
      },
      {
        "id": "b",
        "text": "They cost nothing"
      },
      {
        "id": "c",
        "text": "They address different impacts"
      },
      {
        "id": "d",
        "text": "They prove future safety"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Complementary functions support the choice."
  },
  {
    "id": "science-u08-l04-q12",
    "conceptTag": "hazard-solution-justification",
    "reviewCardId": "science-u08-l04-c3",
    "type": "multiple-choice",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. Which justification is complete?",
    "choices": [
      {
        "id": "a",
        "text": "Choose both because more is always better"
      },
      {
        "id": "b",
        "text": "Choose warning because it stops water"
      },
      {
        "id": "c",
        "text": "Choose channel because warnings have no value"
      },
      {
        "id": "d",
        "text": "Channel redirects some water and warning provides time; both have limits"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It cites strengths and limits."
  },
  {
    "id": "science-u08-l04-q13",
    "conceptTag": "hazard-solution-justification",
    "reviewCardId": "science-u08-l04-c3",
    "type": "fill-blank",
    "prompt": "Solutions can reduce flood impacts but cannot remove all ___.",
    "acceptedAnswers": [
      "risk"
    ],
    "explanation": "No plan eliminates all risk."
  }
];

const scienceU08L04Lesson: Lesson = {
  ...scienceU08L04Core,
  quiz: { passThreshold: 8, pool: scienceU08L04Questions },
};

export const unit08Lessons: Lesson[] = [
  scienceU08L01Lesson,
  scienceU08L02Lesson,
  scienceU08L03Lesson,
  scienceU08L04Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u08.test.ts`. Expected: PASS with 4 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u08-l04`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u08.ts src/content/science/u08.test.ts`, then `git add src/content/science/u08.ts src/content/science/u08.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): compare hazard impact solutions"`.

## Wave verification and handoff

- [ ] Run focused tests for both owned units, `src/content/schema.test.ts`, `src/content/content-validation.test.ts`, `src/content/answer-normalization.test.ts`, and the master lesson-quality test when present; then run `npx tsc -b --pretty false`, `npm run build`, and `git diff --check`.
- [ ] Count exactly 8 lessons, 24 cards, 104 questions, 24 exact concept-tag/review targets, and 24 immediate canonical review steps in this wave.
- [ ] Run placeholder, prohibited-boundary, false-evidence, directly-visible-energy, widget-name/config, answer-normalization, and review-mapping scans. Require no finding.
- [ ] Request independent scoped review. Do not register units here; hand accepted exports to Plan C master Task C5.
