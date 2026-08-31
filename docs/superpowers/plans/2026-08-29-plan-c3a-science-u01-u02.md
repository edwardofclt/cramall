# Cram All Plan C3a: Science Units 1–2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the accepted Unit 1 protections while completing collision prediction and Energy Transfer Units 1–2 as 8 lessons, 24 cards, and 104 questions.

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

- `4-PS3-1`: compare the same or otherwise fairly controlled object qualitatively; speed alone is not a complete cross-object energy comparison. Preserve gravitational-potential-to-kinetic language in the accepted roller-coaster sequence.
- `4-PS3-2`: support transfer claims with observable receiver effects from sound, light, heat, or electric current. Do not assess transfer-versus-transformation vocabulary or exact energy amounts.
- `4-PS3-3`: ask testable collision questions, change one condition, and predict qualitative motion/energy outcomes. A collision model is a prediction aid, not physical evidence.

## Preflight

- [ ] Run `git status --short`, `git diff --stat`, `git log -8 --oneline`, and read both execution ledgers; preserve every unrelated or concurrent change.
- [ ] Re-read the design spec, Plan C master, Science blueprint, applicable verbatim standards, `src/content/schema.ts`, `src/content/answer-normalization.ts`, `src/quiz/engine.ts`, widget registry/components, and current Unit 1 source/test when this wave touches Unit 1.
- [ ] Run `npm test && npx tsc -b --pretty false && npm run build`; stop and record any failure before editing.

---

## Accepted Unit 1 lock

The following three existing raw `Lesson` objects and their complete accepted focused-test coverage remain byte-for-byte source of truth; do not reconstruct, reformat, or move them:

| Existing lesson | Indicator | Cards/questions | Protected model |
|---|---|---:|---|
| `science-u01-l01` — **Speed and an Object's Energy** | `4-PS3-1` | 3 / 13 | c3 roller-coaster `speed-energy` demo |
| `science-u01-l02` — **Explain Speed and Energy with Evidence** | `4-PS3-1` | 3 / 13 | c3 roller-coaster `evidence` demo |
| `science-u01-l03` — **Ask Questions About Collisions** | `4-PS3-3` | 3 / 13 | c3 roller-coaster `collision` demo |

Before Task 1, run `git diff --exit-code 388b540 -- src/content/science/u01.ts src/content/science/u01.test.ts`. If an intentionally accepted later commit changed either path, record that replacement baseline hash and compare against it. L04 constants are inserted before the export and one reference is appended after the three accepted literals; no accepted learner string, answer, check, demo, route, or assertion is weakened.

## Unit 1 lesson tasks

### Task 1: Author `science-u01-l04` — Predict Collision Energy Outcomes

**Files:** Modify `src/content/science/u01.ts` and `src/content/science/u01.test.ts`.

**Interfaces:** Produces schema-native `scienceU01L04Core`, `scienceU01L04Questions`, and `scienceU01L04Lesson`; appends manifest row 4 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Apply these exact edits to `src/content/science/u01.test.ts` before production:

```ts
import { normalizeAnswerText } from '../answer-normalization';
import { buildResult, gradeAnswer } from '../../quiz/engine';
```

Add the normalizer import, replace the existing grade-only import with the combined engine import above, delete the local `normalizedVisibleText` function, and replace both uses with `normalizeAnswerText`. Append this exact metadata row:

```ts
  {
    id: 'science-u01-l04',
    title: 'Predict Collision Energy Outcomes',
    indicatorCodes: ['4-PS3-3'],
  },
```

Rename the test `keeps every lesson schema-valid, widget-free, and canonically numbered` to `keeps every lesson schema-valid, canonically numbered, and on its exact widget allocation`. In the final MC-balance test, replace the filter/map chain with this union-safe exact line:

```ts
const keys = lesson.quiz.pool.flatMap((question) =>
  question.type === 'multiple-choice' ? [question.correctChoiceId] : [],
);
```

Replace the all-widget-free assertion with this exact assertion:

```ts
expect(lesson.learnCards.flatMap((card, index) => card.widget === undefined ? [] : [{ card: index + 1, value: card.widget }])).toEqual(
  lesson.id === 'science-u01-l04'
    ? [{ card: 2, value: { type: 'collision-ramp', config: { rampAngle: 5, massA: 2, massB: 8, speedA: 1, target: 'predict-direction' } } }]
    : [],
);
```

Append the fourth exact demo row and change the length to four:

```ts
      {
        lessonId: 'science-u01-l04',
        cardId: 'science-u01-l04-c3',
        demo: { type: 'roller-coaster', focus: 'collision' },
      },
// Later assertion:
expect(attached).toHaveLength(4);
expect(attached[3]?.demo?.focus).toBe('collision');
```

Append these exact inline-check expectations and change the total to twelve:

```ts
      ['science-u01-l04-c1', /collision|before.*after/i],
      ['science-u01-l04-c2', /fair|testable|release speed/i],
      ['science-u01-l04-c3', /prediction|energy.*transfer/i],
// Later assertion:
expect(cards).toHaveLength(12);
```

Keep the accepted universal type-set assertion unchanged. L04 satisfies it exactly by using multiple-choice, true-false, and the printed q13 sort question.

Add this exact L04 differentiation, route, and immediate-review test before the final MC-balance test:

```ts
test('pins L04 differentiation, exact routes, and immediate review targets', () => {
  const lesson = unit01Lessons[3]!;
  const tags = ['collision-motion-evidence', 'collision-outcome-prediction', 'collision-energy-inference'] as const;
  const cards = lesson.learnCards.map(({ id }) => id);
  expect(lesson.intro.map(({ speaker, pose }) => ({ speaker, pose }))).toEqual([
    { speaker: 'sandy', pose: 'talk' },
    { speaker: 'sandy', pose: 'think' },
    { speaker: 'sandy', pose: 'talk' },
    { speaker: 'sandy', pose: 'cheer' },
  ]);
  expect(lesson.learnCards.map((card) => card.blocks.map(({ kind }) => kind))).toEqual([
    ['text', 'example', 'tip'], ['text', 'example', 'tip'], ['text', 'example', 'tip'],
  ]);
  expect(lesson.learnCards.map((card) => card.blocks[2]!.text.split(':')[0])).toEqual(['Support', 'Response frame', 'Stretch']);
  expect(lesson.workedExample.steps.length).toBeGreaterThanOrEqual(3);
  for (const question of lesson.quiz.pool) {
    const cardIndex = cards.indexOf(question.reviewCardId);
    expect(cardIndex).toBeGreaterThanOrEqual(0);
    expect(question.conceptTag).toBe(tags[cardIndex]);
  }
  expect(new Set(lesson.quiz.pool.map(({ conceptTag }) => conceptTag))).toEqual(new Set(tags));
  for (const card of lesson.learnCards) {
    const question = lesson.quiz.pool.find(({ reviewCardId }) => reviewCardId === card.id)!;
    const wrong = question.type === 'sort'
      ? [...question.correctOrder].reverse()
      : question.type === 'fill-blank'
        ? '__not_an_accepted_answer__'
        : question.choices.find(({ id }) => id !== question.correctChoiceId)!.id;
    const missed = buildResult([question], [wrong]).missed[0]!;
    expect(missed.reviewCardId).toBe(card.id);
    expect(`/lesson/${lesson.id}?card=${missed.reviewCardId}`).toBe(`/lesson/${lesson.id}?card=${card.id}`);
    expect(`card:${new URLSearchParams(`card=${missed.reviewCardId}`).get('card')}`).toBe(`card:${card.id}`);
  }
});
```

Keep every other accepted assertion, including source depth, fixed near-bottom markers, qualitative/solo boundaries, assembled reasoning, and MC balance.

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u01.test.ts`. Expected: FAIL at the exact four-versus-three metadata/card/demo counts because L04 is not yet exported; the accepted qualitative, solo, source-depth, fixed-marker, and reasoning assertions remain active.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert before the existing `unit01Lessons` export.

```ts
const scienceU01L04Core = {
  "id": "science-u01-l04",
  "unitId": "science-u01",
  "title": "Predict Collision Energy Outcomes",
  "indicatorCodes": [
    "4-PS3-3"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A roller coaster car rolls toward a stopped coaster car on the same level track, and the two cars latch during their collision."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Which before-and-after motion observations can support a prediction about the joined coaster cars?"
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will keep the track and cars alike, change one release condition, and infer energy changes only from observable motion and effects."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s predict, model, and explain a roller coaster collision carefully!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u01-l04-c1",
      "title": "Read before-and-after motion",
      "blocks": [
        {
          "kind": "text",
          "text": "Before a roller coaster collision, record each coaster car as moving, slower, faster, stopped, and traveling left or right. Afterward, record the same motion features. These are observations; energy transfer is an inference from the changes."
        },
        {
          "kind": "example",
          "text": "Before the bump, coaster car A rolls right and coaster car B is stopped. After the latch, the joined roller coaster cars roll right more slowly than A did before. The direction and speed words describe what changed."
        },
        {
          "kind": "tip",
          "text": "Support: Draw a before/after T-chart for both coaster cars. Circle only motion words you could observe."
        }
      ],
      "check": {
        "prompt": "Which note is a useful before-and-after observation for the roller coaster collision?",
        "choices": [
          {
            "id": "motion-note",
            "text": "Before: car B was stopped; after: car B moved right."
          },
          {
            "id": "energy-number",
            "text": "The coaster car had exactly 12 energy units."
          },
          {
            "id": "track-style",
            "text": "The roller coaster track looked exciting."
          }
        ],
        "correctChoiceId": "motion-note",
        "explanation": "The note compares observable coaster car motion before and after the collision."
      }
    },
    {
      "id": "science-u01-l04-c2",
      "title": "Make a fair collision prediction",
      "blocks": [
        {
          "kind": "text",
          "text": "A fair roller coaster prediction changes one condition while keeping the same coaster cars, track, bumper, and release method. The collision-ramp widget is a controllable model for trying the prediction, not physical evidence."
        },
        {
          "kind": "example",
          "text": "Keep both coaster car masses and the track angle fixed. Change only car A from a slower to a faster release and predict the joined cars’ direction after the collision."
        },
        {
          "kind": "tip",
          "text": "Response frame: If coaster car A starts ____, I predict the joined cars will move ____ because ____; the model represents the prediction but does not test a physical track."
        }
      ],
      "widget": {
        "type": "collision-ramp",
        "config": {
          "rampAngle": 5,
          "massA": 2,
          "massB": 8,
          "speedA": 1,
          "target": "predict-direction"
        }
      },
      "check": {
        "prompt": "Which roller coaster plan asks a fair, testable collision question?",
        "choices": [
          {
            "id": "one-change",
            "text": "Keep both cars and the track the same; change only car A’s release speed."
          },
          {
            "id": "many-changes",
            "text": "Change both cars, the track, and the bumper together."
          },
          {
            "id": "model-proof",
            "text": "Press the model button and call its animation physical evidence."
          }
        ],
        "correctChoiceId": "one-change",
        "explanation": "A fair coaster car comparison changes one planned condition and keeps the rest alike."
      }
    },
    {
      "id": "science-u01-l04-c3",
      "title": "Infer energy change from motion",
      "blocks": [
        {
          "kind": "text",
          "text": "When one coaster car slows and another begins moving during a collision, their energy of motion changes. Sound or warmth can be an observable effect of energy transferred to the track, air, or bumpers; energy itself is inferred, not seen."
        },
        {
          "kind": "example",
          "text": "Car A rolls right, car B is stopped, and the cars latch. After the collision, A is slower and B moves right. Those paired roller coaster observations support a qualitative energy-transfer explanation."
        },
        {
          "kind": "tip",
          "text": "Stretch: Explain two coaster car motion changes and one possible surrounding effect without assigning exact energy or claiming that the model supplied evidence."
        }
      ],
      "demo": {
        "type": "roller-coaster",
        "focus": "collision"
      },
      "check": {
        "prompt": "Which roller coaster prediction correctly connects motion observations to energy?",
        "choices": [
          {
            "id": "transfer-inference",
            "text": "If car A slows and car B begins moving, infer that energy of motion transferred during the collision."
          },
          {
            "id": "visible-energy",
            "text": "If a label appears, energy itself became visible."
          },
          {
            "id": "used-up",
            "text": "If the cars slow, all energy was used up and disappeared."
          }
        ],
        "correctChoiceId": "transfer-inference",
        "explanation": "Observable coaster car motion changes can support a qualitative energy-transfer inference."
      }
    }
  ],
  "workedExample": {
    "title": "Apply: Predict Collision Energy Outcomes",
    "steps": [
      "Record that coaster car A rolls right, coaster car B is stopped, and the two roller coaster cars latch after the bump.",
      "Predict that the joined coaster cars will move right because A is the only moving car before the collision.",
      "Compare the after-motion: car A is slower and car B now moves right with it; a bump sound is also observed.",
      "Infer that energy of motion changed and transferred between the cars and surroundings; the observations are evidence, while the widget and roller coaster demo are replayable models."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU01L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u01-l04-q01",
    "conceptTag": "collision-motion-evidence",
    "reviewCardId": "science-u01-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which note is a before-and-after roller coaster motion observation?",
    "choices": [
      {
        "id": "a",
        "text": "Before: Cart A moved right; after: the stuck carts moved right"
      },
      {
        "id": "b",
        "text": "The carts had exactly 12 energy units"
      },
      {
        "id": "c",
        "text": "An on-screen collision counts as physical evidence"
      },
      {
        "id": "d",
        "text": "Cart A was the best-looking cart"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It states observable directions before and after."
  },
  {
    "id": "science-u01-l04-q02",
    "conceptTag": "collision-motion-evidence",
    "reviewCardId": "science-u01-l04-c1",
    "type": "true-false",
    "prompt": "A cart beginning to move after a collision is an observable motion change.",
    "choices": [
      {
        "id": "true",
        "text": "True — starting to move can be observed"
      },
      {
        "id": "false",
        "text": "False — motion cannot be observed"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Beginning to move is an observable change."
  },
  {
    "id": "science-u01-l04-q03",
    "conceptTag": "collision-motion-evidence",
    "reviewCardId": "science-u01-l04-c1",
    "type": "multiple-choice",
    "prompt": "Before a roller coaster bump, car A moves right and car B is stopped. After they latch, both move right. What changed for car B?",
    "choices": [
      {
        "id": "a",
        "text": "Its color changed"
      },
      {
        "id": "b",
        "text": "It began moving right"
      },
      {
        "id": "c",
        "text": "It became lighter"
      },
      {
        "id": "d",
        "text": "Its exact energy appeared"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Cart B changed from still to moving right."
  },
  {
    "id": "science-u01-l04-q04",
    "conceptTag": "collision-motion-evidence",
    "reviewCardId": "science-u01-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which statement is an inference rather than a direct observation?",
    "choices": [
      {
        "id": "a",
        "text": "Cart A moved right before the bump"
      },
      {
        "id": "b",
        "text": "Cart B was still before the bump"
      },
      {
        "id": "c",
        "text": "Energy transferred during the collision"
      },
      {
        "id": "d",
        "text": "The joined carts moved right afterward"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Energy transfer explains observed changes but is not directly seen."
  },
  {
    "id": "science-u01-l04-q05",
    "conceptTag": "collision-outcome-prediction",
    "reviewCardId": "science-u01-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which plan makes a fair roller coaster collision comparison?",
    "choices": [
      {
        "id": "a",
        "text": "Change both carts and the track"
      },
      {
        "id": "b",
        "text": "Change cart mass and speed together"
      },
      {
        "id": "c",
        "text": "Use a different bumper each time"
      },
      {
        "id": "d",
        "text": "Keep both carts and the track the same while changing only Cart A’s speed"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Only one planned condition changes."
  },
  {
    "id": "science-u01-l04-q06",
    "conceptTag": "collision-outcome-prediction",
    "reviewCardId": "science-u01-l04-c2",
    "type": "true-false",
    "prompt": "A useful prediction names an observable outcome before the test.",
    "choices": [
      {
        "id": "true",
        "text": "True — it says what motion is expected"
      },
      {
        "id": "false",
        "text": "False — predictions are written only afterward"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A prediction states an expected observable result."
  },
  {
    "id": "science-u01-l04-q07",
    "conceptTag": "collision-outcome-prediction",
    "reviewCardId": "science-u01-l04-c2",
    "type": "multiple-choice",
    "prompt": "If only Cart A changes from slower to faster, which prediction fits the lesson?",
    "choices": [
      {
        "id": "a",
        "text": "The stuck carts are more likely to move in Cart A’s direction"
      },
      {
        "id": "b",
        "text": "The track must change color"
      },
      {
        "id": "c",
        "text": "No motion can change"
      },
      {
        "id": "d",
        "text": "The exact energy amount becomes visible"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Faster motion gives the same cart more energy of motion, supporting the directional prediction."
  },
  {
    "id": "science-u01-l04-q08",
    "conceptTag": "collision-outcome-prediction",
    "reviewCardId": "science-u01-l04-c2",
    "type": "multiple-choice",
    "prompt": "What does the collision-ramp activity provide?",
    "choices": [
      {
        "id": "a",
        "text": "Physical evidence from real carts"
      },
      {
        "id": "b",
        "text": "A simplified model for trying a prediction"
      },
      {
        "id": "c",
        "text": "A measurement of exact energy"
      },
      {
        "id": "d",
        "text": "Proof that every collision matches"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The activity represents a prediction and does not collect physical observations."
  },
  {
    "id": "science-u01-l04-q09",
    "conceptTag": "collision-energy-inference",
    "reviewCardId": "science-u01-l04-c3",
    "type": "multiple-choice",
    "prompt": "Coaster car A slows while coaster car B begins moving after they collide. Which inference is supported?",
    "choices": [
      {
        "id": "a",
        "text": "No energy changed anywhere"
      },
      {
        "id": "b",
        "text": "An energy label is an observation of energy"
      },
      {
        "id": "c",
        "text": "Energy of motion transferred during the collision"
      },
      {
        "id": "d",
        "text": "Cart B created energy from nothing"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The paired motion changes support a transfer inference."
  },
  {
    "id": "science-u01-l04-q10",
    "conceptTag": "collision-energy-inference",
    "reviewCardId": "science-u01-l04-c3",
    "type": "true-false",
    "prompt": "Energy itself must be visible for motion changes to support an energy inference.",
    "choices": [
      {
        "id": "true",
        "text": "True — only visible energy counts"
      },
      {
        "id": "false",
        "text": "False — observable effects can support an inference"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Scientists infer energy changes from observable motion and effects."
  },
  {
    "id": "science-u01-l04-q11",
    "conceptTag": "collision-energy-inference",
    "reviewCardId": "science-u01-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which observation supports that some energy reached the surroundings?",
    "choices": [
      {
        "id": "a",
        "text": "A label stayed attached"
      },
      {
        "id": "b",
        "text": "The track remained blue"
      },
      {
        "id": "c",
        "text": "The model button was pressed"
      },
      {
        "id": "d",
        "text": "A sound was heard during the bump"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Sound can be an observable effect of transfer to the surroundings."
  },
  {
    "id": "science-u01-l04-q12",
    "conceptTag": "collision-energy-inference",
    "reviewCardId": "science-u01-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which explanation stays qualitative and within the lesson boundary?",
    "choices": [
      {
        "id": "a",
        "text": "Cart A slowed and Cart B moved, so their energy of motion changed during the collision"
      },
      {
        "id": "b",
        "text": "The collision produced exactly 18 units of force"
      },
      {
        "id": "c",
        "text": "The carts accelerated by a measured rate"
      },
      {
        "id": "d",
        "text": "Completing the activity guarantees the real-world result"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It connects motion observations to a qualitative energy inference."
  },
  {
    "id": "science-u01-l04-q13",
    "type": "sort",
    "prompt": "Order the roller coaster explanation from observation to inference.",
    "items": [
      {
        "id": "infer",
        "text": "Infer that energy of motion transferred during the collision."
      },
      {
        "id": "before",
        "text": "Record car A moving right and car B stopped before the collision."
      },
      {
        "id": "after",
        "text": "Record both joined coaster cars moving right afterward."
      }
    ],
    "correctOrder": [
      "before",
      "after",
      "infer"
    ],
    "explanation": "A sound explanation records before and after motion before inferring energy transfer.",
    "conceptTag": "collision-energy-inference",
    "reviewCardId": "science-u01-l04-c3"
  }
];

const scienceU01L04Lesson: Lesson = {
  ...scienceU01L04Core,
  quiz: { passThreshold: 8, pool: scienceU01L04Questions },
};

```

Then make this exact one-line insertion immediately before the existing closing `] satisfies Lesson[];`:

```ts
  scienceU01L04Lesson,
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u01.test.ts`. Expected: PASS with 4 lesson rows, 12 checked cards, 4 demos, exact L04 differentiation, all 13 L04 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u01-l04`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u01.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u01.ts src/content/science/u01.test.ts`, then `git add src/content/science/u01.ts src/content/science/u01.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): complete science collision prediction unit"`.

## Unit 2 lesson tasks

### Task 2: Author `science-u02-l01` — Observe Energy Transfer

**Files:** Create `src/content/science/u02.ts` and `src/content/science/u02.test.ts`.

**Interfaces:** Produces schema-native `scienceU02L01Core`, `scienceU02L01Questions`, and `scienceU02L01Lesson`; appends manifest row 5 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Create this exact focused test file:

```ts
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u02.test.ts`. Expected: FAIL because `./u02` does not exist.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Create the source file with

```ts
import type { Lesson } from '../schema';

const scienceU02L01Core = {
  "id": "science-u02-l01",
  "unitId": "science-u02",
  "title": "Observe Energy Transfer",
  "indicatorCodes": [
    "4-PS3-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A sunlit card becomes warmer while a shaded card stays cooler."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "What observation could show energy moving from one place to another?"
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will separate what we notice from the energy idea we infer."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s follow the evidence carefully!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u02-l01-c1",
      "title": "Identify a source and receiver",
      "blocks": [
        {
          "kind": "text",
          "text": "A transfer description names where energy starts and what receives it."
        },
        {
          "kind": "example",
          "text": "Light travels from the Sun to a paper square."
        },
        {
          "kind": "tip",
          "text": "Support: Point to the source first, trace the route second, and name the receiver last."
        }
      ]
    },
    {
      "id": "science-u02-l01-c2",
      "title": "Observe a change",
      "blocks": [
        {
          "kind": "text",
          "text": "A receiver becoming warmer, brighter, moving, or vibrating can be observed."
        },
        {
          "kind": "example",
          "text": "The sunlit square feels warmer than the shaded comparison square."
        },
        {
          "kind": "tip",
          "text": "Response frame: I observed ____. This change can support the inference that energy moved by ____."
        }
      ],
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
      "id": "science-u02-l01-c3",
      "title": "Use the change as evidence",
      "blocks": [
        {
          "kind": "text",
          "text": "Compare the receiver before and after, or compare it with an unchanged condition."
        },
        {
          "kind": "example",
          "text": "The warmer sunlit square supports an explanation that light transferred energy to it."
        },
        {
          "kind": "tip",
          "text": "Stretch: Compare a changed receiver with an unchanged condition and explain why that comparison strengthens the claim."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Observe Energy Transfer",
    "steps": [
      "Two matching paper squares begin in the same room.",
      "One is placed in sunlight and later feels warmer than the shaded square.",
      "That observed difference supports an inference that energy moved by light from the Sun to the paper."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Append:

```ts
const scienceU02L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u02-l01-q01",
    "conceptTag": "transfer-source-receiver",
    "reviewCardId": "science-u02-l01-c1",
    "type": "multiple-choice",
    "prompt": "In the example, what is the energy source?",
    "choices": [
      {
        "id": "a",
        "text": "The Sun"
      },
      {
        "id": "b",
        "text": "The label"
      },
      {
        "id": "c",
        "text": "The desk"
      },
      {
        "id": "d",
        "text": "The clock"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The light starts at the Sun."
  },
  {
    "id": "science-u02-l01-q02",
    "conceptTag": "transfer-source-receiver",
    "reviewCardId": "science-u02-l01-c1",
    "type": "true-false",
    "prompt": "A transfer explanation should identify where energy starts and what receives it.",
    "choices": [
      {
        "id": "true",
        "text": "True — both places matter"
      },
      {
        "id": "false",
        "text": "False — places do not matter"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Source and receiver describe the transfer path."
  },
  {
    "id": "science-u02-l01-q03",
    "conceptTag": "transfer-source-receiver",
    "reviewCardId": "science-u02-l01-c1",
    "type": "multiple-choice",
    "prompt": "Which path matches the phenomenon?",
    "choices": [
      {
        "id": "a",
        "text": "paper to label to Sun"
      },
      {
        "id": "b",
        "text": "Sun to light to paper"
      },
      {
        "id": "c",
        "text": "desk to clock to shade"
      },
      {
        "id": "d",
        "text": "shade to paper to Sun"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Light carries energy from the Sun to the paper."
  },
  {
    "id": "science-u02-l01-q04",
    "conceptTag": "observable-transfer-change",
    "reviewCardId": "science-u02-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which is an observable change?",
    "choices": [
      {
        "id": "a",
        "text": "An energy label is an observation of energy"
      },
      {
        "id": "b",
        "text": "The Sun chose the paper"
      },
      {
        "id": "c",
        "text": "The sunlit paper felt warmer"
      },
      {
        "id": "d",
        "text": "Completing the activity guarantees the result"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Warmer paper is an observable effect."
  },
  {
    "id": "science-u02-l01-q05",
    "conceptTag": "observable-transfer-change",
    "reviewCardId": "science-u02-l01-c2",
    "type": "true-false",
    "prompt": "Energy itself must be directly visible before transfer can be inferred.",
    "choices": [
      {
        "id": "true",
        "text": "True — inference is not allowed"
      },
      {
        "id": "false",
        "text": "False — observable effects can support an inference"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Scientists use observed changes as evidence."
  },
  {
    "id": "science-u02-l01-q06",
    "conceptTag": "observable-transfer-change",
    "reviewCardId": "science-u02-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which comparison is most useful?",
    "choices": [
      {
        "id": "a",
        "text": "A sunlit square and a matching shaded square"
      },
      {
        "id": "b",
        "text": "Different papers in different rooms"
      },
      {
        "id": "c",
        "text": "One paper with no comparison"
      },
      {
        "id": "d",
        "text": "A paper and a metal spoon"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Matching squares make the light condition the useful difference."
  },
  {
    "id": "science-u02-l01-q07",
    "conceptTag": "observable-transfer-change",
    "reviewCardId": "science-u02-l01-c2",
    "type": "multiple-choice",
    "prompt": "What does the path builder provide?",
    "choices": [
      {
        "id": "a",
        "text": "A physical temperature reading"
      },
      {
        "id": "b",
        "text": "A model of a possible transfer path"
      },
      {
        "id": "c",
        "text": "Proof from a real investigation"
      },
      {
        "id": "d",
        "text": "An exact energy amount"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The activity represents ideas; it does not collect evidence."
  },
  {
    "id": "science-u02-l01-q08",
    "conceptTag": "transfer-evidence",
    "reviewCardId": "science-u02-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which statement correctly separates observation and inference?",
    "choices": [
      {
        "id": "a",
        "text": "Observation: an energy label appeared; inference: paper exists"
      },
      {
        "id": "b",
        "text": "Observation: activity finished; inference: the screen is physical evidence"
      },
      {
        "id": "c",
        "text": "Observation: paper is square; inference: every square warms"
      },
      {
        "id": "d",
        "text": "Observation: paper felt warmer; inference: light transferred energy"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The warmth is observed and energy transfer is inferred."
  },
  {
    "id": "science-u02-l01-q09",
    "conceptTag": "transfer-evidence",
    "reviewCardId": "science-u02-l01-c3",
    "type": "true-false",
    "prompt": "A written before-and-after temperature description can provide evidence about transfer by heat or light.",
    "choices": [
      {
        "id": "true",
        "text": "True — the change can be compared"
      },
      {
        "id": "false",
        "text": "False — observations cannot be evidence"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A described change can support a qualitative transfer explanation."
  },
  {
    "id": "science-u02-l01-q10",
    "conceptTag": "transfer-evidence",
    "reviewCardId": "science-u02-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which claim is supported by the warmer sunlit square?",
    "choices": [
      {
        "id": "a",
        "text": "The label created energy"
      },
      {
        "id": "b",
        "text": "The shaded paper made sunlight"
      },
      {
        "id": "c",
        "text": "Light transferred energy from the Sun to the paper"
      },
      {
        "id": "d",
        "text": "The exact energy amount is known"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The observed warming supports a qualitative transfer claim."
  },
  {
    "id": "science-u02-l01-q11",
    "conceptTag": "transfer-evidence",
    "reviewCardId": "science-u02-l01-c3",
    "type": "fill-blank",
    "prompt": "Complete the evidence sentence: The sunlit paper felt ___ than the shaded paper.",
    "acceptedAnswers": [
      "warmer"
    ],
    "explanation": "Warmer names the observed comparison."
  },
  {
    "id": "science-u02-l01-q12",
    "conceptTag": "transfer-evidence",
    "reviewCardId": "science-u02-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which detail is not evidence of transfer?",
    "choices": [
      {
        "id": "a",
        "text": "The sunlit paper became warmer"
      },
      {
        "id": "b",
        "text": "The shaded paper stayed cooler"
      },
      {
        "id": "c",
        "text": "The two papers began in the same room"
      },
      {
        "id": "d",
        "text": "The paper had a blue star printed on it"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "A printed star does not describe a transfer effect."
  },
  {
    "id": "science-u02-l01-q13",
    "conceptTag": "transfer-evidence",
    "reviewCardId": "science-u02-l01-c3",
    "type": "multiple-choice",
    "prompt": "Why can the model not be cited as physical evidence?",
    "choices": [
      {
        "id": "a",
        "text": "Models never help thinking"
      },
      {
        "id": "b",
        "text": "It represents a path but does not make a real-world observation"
      },
      {
        "id": "c",
        "text": "It uses too few colors"
      },
      {
        "id": "d",
        "text": "It has no written labels"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Evidence comes from observations, while the activity represents the explanation."
  }
];

const scienceU02L01Lesson: Lesson = {
  ...scienceU02L01Core,
  quiz: { passThreshold: 8, pool: scienceU02L01Questions },
};

export const unit02Lessons: Lesson[] = [
  scienceU02L01Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u02.test.ts`. Expected: PASS with 1 lesson row, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u02-l01`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u02.ts src/content/science/u02.test.ts`, then `git add src/content/science/u02.ts src/content/science/u02.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): start science energy transfer unit"`.
### Task 3: Author `science-u02-l02` — Use Sound and Light as Evidence

**Files:** Modify `src/content/science/u02.ts` and `src/content/science/u02.test.ts`.

**Interfaces:** Produces schema-native `scienceU02L02Core`, `scienceU02L02Questions`, and `scienceU02L02Lesson`; appends manifest row 6 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u02.test.ts`. Expected: FAIL because the test expects 2 lesson rows while production exports 1.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU02L02Core = {
  "id": "science-u02-l02",
  "unitId": "science-u02",
  "title": "Use Sound and Light as Evidence",
  "indicatorCodes": [
    "4-PS3-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A struck tuning fork vibrates, nearby paper bits tremble, and a flashlight brightens a card."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Which changes can serve as evidence that energy moved from place to place?"
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will trace sound and light paths while keeping observations separate from explanations."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s compare two transfer routes with careful words!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u02-l02-c1",
      "title": "Track sound from a source",
      "blocks": [
        {
          "kind": "text",
          "text": "A vibrating object can be a sound source. Sound travels through matter to a receiver, where an observable vibration or motion may occur."
        },
        {
          "kind": "example",
          "text": "A struck tuning fork vibrates. Nearby paper bits tremble even though the fork does not touch them. That written observation can support a sound-transfer inference."
        },
        {
          "kind": "tip",
          "text": "Support: Say the path in three parts: tuning fork → sound → paper bits. Then underline the observed effect."
        }
      ],
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
      "id": "science-u02-l02-c2",
      "title": "Track light from a source",
      "blocks": [
        {
          "kind": "text",
          "text": "Light can move energy from a source to a receiver. A brighter surface or a warmer receiver can be an observed effect when the comparison is fair."
        },
        {
          "kind": "example",
          "text": "A flashlight shines on one matching card while another stays covered. The lit card is brighter; that observation supports a light path from flashlight to card."
        },
        {
          "kind": "tip",
          "text": "Response frame: Light traveled from ____ to ____. I observed ____, so I infer ____."
        }
      ]
    },
    {
      "id": "science-u02-l02-c3",
      "title": "Compare observable effects",
      "blocks": [
        {
          "kind": "text",
          "text": "Sound and light are different transfer routes, so their observable effects need not look alike. Compare each source, route, receiver, and effect."
        },
        {
          "kind": "example",
          "text": "The tuning-fork case includes vibration and trembling paper bits. The flashlight case includes a brighter card. Neither case makes energy directly visible."
        },
        {
          "kind": "tip",
          "text": "Stretch: Compare both routes in one claim and name one observation for each without treating the tracing model as evidence."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Use Sound and Light as Evidence",
    "steps": [
      "Case A says a struck tuning fork vibrated and nearby paper bits trembled.",
      "Case B says a flashlight made one matching card brighter than a covered card.",
      "Trace tuning fork → sound → paper bits and flashlight → light → card.",
      "Conclude that the different observed effects support energy transfer by sound and by light; the path builder only represents one route."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU02L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u02-l02-q01",
    "conceptTag": "sound-transfer-path",
    "reviewCardId": "science-u02-l02-c1",
    "type": "multiple-choice",
    "prompt": "What is the sound source in the tuning-fork case?",
    "choices": [
      {
        "id": "a",
        "text": "The vibrating tuning fork"
      },
      {
        "id": "b",
        "text": "The paper label"
      },
      {
        "id": "c",
        "text": "The table color"
      },
      {
        "id": "d",
        "text": "The quiet room"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The tuning fork begins the sound path."
  },
  {
    "id": "science-u02-l02-q02",
    "conceptTag": "sound-transfer-path",
    "reviewCardId": "science-u02-l02-c1",
    "type": "true-false",
    "prompt": "The trembling paper bits are an observable effect at the receiver.",
    "choices": [
      {
        "id": "true",
        "text": "True — their motion can be noticed"
      },
      {
        "id": "false",
        "text": "False — receivers never change"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The paper bits’ motion is an observation."
  },
  {
    "id": "science-u02-l02-q03",
    "conceptTag": "sound-transfer-path",
    "reviewCardId": "science-u02-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which path matches the sound case?",
    "choices": [
      {
        "id": "a",
        "text": "paper bits → light → fork"
      },
      {
        "id": "b",
        "text": "tuning fork → sound → paper bits"
      },
      {
        "id": "c",
        "text": "table → heat → label"
      },
      {
        "id": "d",
        "text": "fork → paper → sunlight"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Sound carries energy from the vibrating fork to the paper bits."
  },
  {
    "id": "science-u02-l02-q04",
    "conceptTag": "sound-transfer-path",
    "reviewCardId": "science-u02-l02-c1",
    "type": "multiple-choice",
    "prompt": "Why is the path builder not physical evidence?",
    "choices": [
      {
        "id": "a",
        "text": "It has words"
      },
      {
        "id": "b",
        "text": "It can be reset"
      },
      {
        "id": "c",
        "text": "It represents a route but makes no real-world observation"
      },
      {
        "id": "d",
        "text": "It uses a tuning-fork label"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The model organizes ideas rather than collecting observations."
  },
  {
    "id": "science-u02-l02-q05",
    "conceptTag": "light-transfer-path",
    "reviewCardId": "science-u02-l02-c2",
    "type": "multiple-choice",
    "prompt": "What is the receiver in the flashlight case?",
    "choices": [
      {
        "id": "a",
        "text": "The switch"
      },
      {
        "id": "b",
        "text": "The room clock"
      },
      {
        "id": "c",
        "text": "The observer"
      },
      {
        "id": "d",
        "text": "The illuminated card"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The card receives the light."
  },
  {
    "id": "science-u02-l02-q06",
    "conceptTag": "light-transfer-path",
    "reviewCardId": "science-u02-l02-c2",
    "type": "true-false",
    "prompt": "A card becoming brighter can be an observable effect of light reaching it.",
    "choices": [
      {
        "id": "true",
        "text": "True — brightness can be compared"
      },
      {
        "id": "false",
        "text": "False — light has no observable effects"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Brightness is an observable effect."
  },
  {
    "id": "science-u02-l02-q07",
    "conceptTag": "light-transfer-path",
    "reviewCardId": "science-u02-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which comparison best supports the light claim?",
    "choices": [
      {
        "id": "a",
        "text": "One matching card lit and one matching card covered"
      },
      {
        "id": "b",
        "text": "A card and a metal pan in different rooms"
      },
      {
        "id": "c",
        "text": "One card with no comparison"
      },
      {
        "id": "d",
        "text": "Two cards of different colors under different lamps"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Matching cards isolate the light condition."
  },
  {
    "id": "science-u02-l02-q08",
    "conceptTag": "light-transfer-path",
    "reviewCardId": "science-u02-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which statement separates observation from inference?",
    "choices": [
      {
        "id": "a",
        "text": "Observation: energy was seen; inference: the card exists"
      },
      {
        "id": "b",
        "text": "Observation: the card looked brighter; inference: light transferred energy"
      },
      {
        "id": "c",
        "text": "Observation: the model ended; inference: the model is evidence"
      },
      {
        "id": "d",
        "text": "Observation: the card is paper; inference: all paper glows"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Brightness is observed and transfer is inferred."
  },
  {
    "id": "science-u02-l02-q09",
    "conceptTag": "sound-light-evidence",
    "reviewCardId": "science-u02-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which pair correctly matches route and effect?",
    "choices": [
      {
        "id": "a",
        "text": "sound—brighter card; light—trembling paper"
      },
      {
        "id": "b",
        "text": "sound—covered card; light—silent fork"
      },
      {
        "id": "c",
        "text": "sound—trembling paper; light—brighter card"
      },
      {
        "id": "d",
        "text": "sound—exact energy; light—proof"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The written cases pair sound with trembling and light with brightness."
  },
  {
    "id": "science-u02-l02-q10",
    "conceptTag": "sound-light-evidence",
    "reviewCardId": "science-u02-l02-c3",
    "type": "true-false",
    "prompt": "Sound and light must cause the same observable effect to transfer energy.",
    "choices": [
      {
        "id": "true",
        "text": "True — every effect must match"
      },
      {
        "id": "false",
        "text": "False — different routes can have different effects"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Different receivers and routes can show different effects."
  },
  {
    "id": "science-u02-l02-q11",
    "conceptTag": "sound-light-evidence",
    "reviewCardId": "science-u02-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which comparison claim is supported?",
    "choices": [
      {
        "id": "a",
        "text": "Only light can move energy"
      },
      {
        "id": "b",
        "text": "Energy labels supplied physical observations in both cases"
      },
      {
        "id": "c",
        "text": "The activity collected physical measurements for both transfers"
      },
      {
        "id": "d",
        "text": "Sound was linked to trembling paper, while light was linked to a brighter card"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It cites one relevant observation from each case."
  },
  {
    "id": "science-u02-l02-q12",
    "conceptTag": "sound-light-evidence",
    "reviewCardId": "science-u02-l02-c3",
    "type": "fill-blank",
    "prompt": "Complete the sound evidence sentence: The nearby paper bits ___.",
    "acceptedAnswers": [
      "trembled",
      "moved"
    ],
    "explanation": "Their trembling or movement is the observable effect."
  },
  {
    "id": "science-u02-l02-q13",
    "conceptTag": "sound-light-evidence",
    "reviewCardId": "science-u02-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which detail is irrelevant to both transfer claims?",
    "choices": [
      {
        "id": "a",
        "text": "The observer wrote with a blue pencil"
      },
      {
        "id": "b",
        "text": "The tuning fork vibrated"
      },
      {
        "id": "c",
        "text": "The paper bits trembled"
      },
      {
        "id": "d",
        "text": "The lit card appeared brighter"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Pencil color does not describe either transfer effect."
  }
];

const scienceU02L02Lesson: Lesson = {
  ...scienceU02L02Core,
  quiz: { passThreshold: 8, pool: scienceU02L02Questions },
};

export const unit02Lessons: Lesson[] = [
  scienceU02L01Lesson,
  scienceU02L02Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u02.test.ts`. Expected: PASS with 2 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u02-l02`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u02.ts src/content/science/u02.test.ts`, then `git add src/content/science/u02.ts src/content/science/u02.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): compare sound and light transfer evidence"`.
### Task 4: Author `science-u02-l03` — Use Heat and Electric Current as Evidence

**Files:** Modify `src/content/science/u02.ts` and `src/content/science/u02.test.ts`.

**Interfaces:** Produces schema-native `scienceU02L03Core`, `scienceU02L03Questions`, and `scienceU02L03Lesson`; appends manifest row 7 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u02.test.ts`. Expected: FAIL because the test expects 3 lesson rows while production exports 2.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU02L03Core = {
  "id": "science-u02-l03",
  "unitId": "science-u02",
  "title": "Use Heat and Electric Current as Evidence",
  "indicatorCodes": [
    "4-PS3-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A metal spoon in warm water becomes warmer, and a battery-connected motor begins turning."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Both changes can help us reason about energy moving from place to place."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will use qualitative observations and trace an electric-current path without calculating energy."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s follow the evidence from source to receiver!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u02-l03-c1",
      "title": "Notice transfer by heat",
      "blocks": [
        {
          "kind": "text",
          "text": "When objects at different temperatures interact, a cooler object may become warmer. That temperature change is an observable effect supporting energy transfer by heat."
        },
        {
          "kind": "example",
          "text": "Two matching metal spoons begin at room temperature. One rests in warm water and later feels warmer than the untouched spoon."
        },
        {
          "kind": "tip",
          "text": "Support: Compare matching objects and complete: The spoon in ____ became ____ than the comparison spoon."
        }
      ]
    },
    {
      "id": "science-u02-l03-c2",
      "title": "Follow an electric-current path",
      "blocks": [
        {
          "kind": "text",
          "text": "A connected battery can supply energy that is transferred by electric current through a closed path to a receiver such as a motor."
        },
        {
          "kind": "example",
          "text": "When the circuit is connected, the motor shaft turns. When the path is open, it stops. The turning is the observation; energy transfer is the inference."
        },
        {
          "kind": "tip",
          "text": "Response frame: The path is battery → electric current → motor. I observed the motor ____."
        }
      ],
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
      "id": "science-u02-l03-c3",
      "title": "Separate transfer from effect",
      "blocks": [
        {
          "kind": "text",
          "text": "Name the transfer route and the receiver’s effect separately. Heat is linked to a warmer spoon; electric current is linked to a turning motor."
        },
        {
          "kind": "example",
          "text": "Do not use “the energy moved” as the only evidence. Cite the warmer spoon or turning shaft first, then explain the transfer."
        },
        {
          "kind": "tip",
          "text": "Stretch: Write one observation-and-inference pair for heat and another for electric current, using a different observable effect in each."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Use Heat and Electric Current as Evidence",
    "steps": [
      "Observe that one matching spoon in warm water became warmer than the untouched spoon.",
      "Observe that a connected battery-and-motor setup had a turning shaft, while the open path did not.",
      "Identify heat as the route in the spoon case and electric current as the route in the motor case.",
      "Use each observed effect as evidence for a qualitative transfer inference; the path model supplies no test data."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU02L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u02-l03-q01",
    "conceptTag": "heat-transfer-evidence",
    "reviewCardId": "science-u02-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which observation supports transfer by heat?",
    "choices": [
      {
        "id": "a",
        "text": "The spoon in warm water became warmer"
      },
      {
        "id": "b",
        "text": "The spoon has a label"
      },
      {
        "id": "c",
        "text": "The cup is round"
      },
      {
        "id": "d",
        "text": "The clock moved forward"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The spoon’s warming is the relevant effect."
  },
  {
    "id": "science-u02-l03-q02",
    "conceptTag": "heat-transfer-evidence",
    "reviewCardId": "science-u02-l03-c1",
    "type": "true-false",
    "prompt": "Comparing matching spoons helps focus on the warm-water condition.",
    "choices": [
      {
        "id": "true",
        "text": "True — the comparison holds the spoon type constant"
      },
      {
        "id": "false",
        "text": "False — matching objects prevent comparison"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Matching spoons make the condition more useful."
  },
  {
    "id": "science-u02-l03-q03",
    "conceptTag": "heat-transfer-evidence",
    "reviewCardId": "science-u02-l03-c1",
    "type": "multiple-choice",
    "prompt": "What is the receiver in the warm-water example?",
    "choices": [
      {
        "id": "a",
        "text": "The room clock"
      },
      {
        "id": "b",
        "text": "The cooler spoon"
      },
      {
        "id": "c",
        "text": "The written label"
      },
      {
        "id": "d",
        "text": "The observer’s pencil"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The cooler spoon receives energy and warms."
  },
  {
    "id": "science-u02-l03-q04",
    "conceptTag": "heat-transfer-evidence",
    "reviewCardId": "science-u02-l03-c1",
    "type": "fill-blank",
    "prompt": "The spoon placed in warm water became ___.",
    "acceptedAnswers": [
      "warmer"
    ],
    "explanation": "Warmer names the observed temperature change."
  },
  {
    "id": "science-u02-l03-q05",
    "conceptTag": "electric-transfer-path",
    "reviewCardId": "science-u02-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which path matches the motor case?",
    "choices": [
      {
        "id": "a",
        "text": "motor → light → battery"
      },
      {
        "id": "b",
        "text": "battery → sound → spoon"
      },
      {
        "id": "c",
        "text": "battery → electric current → motor"
      },
      {
        "id": "d",
        "text": "water → heat → battery"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The connected path runs from battery by current to motor."
  },
  {
    "id": "science-u02-l03-q06",
    "conceptTag": "electric-transfer-path",
    "reviewCardId": "science-u02-l03-c2",
    "type": "true-false",
    "prompt": "The motor turning is an observable effect at the receiver.",
    "choices": [
      {
        "id": "true",
        "text": "True — shaft motion can be observed"
      },
      {
        "id": "false",
        "text": "False — motor motion cannot be observed"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Turning is the visible motion effect."
  },
  {
    "id": "science-u02-l03-q07",
    "conceptTag": "electric-transfer-path",
    "reviewCardId": "science-u02-l03-c2",
    "type": "multiple-choice",
    "prompt": "What should happen in the written case when the electric path is opened?",
    "choices": [
      {
        "id": "a",
        "text": "The spoon warms"
      },
      {
        "id": "b",
        "text": "The battery becomes sunlight"
      },
      {
        "id": "c",
        "text": "Finishing an activity guarantees a test result"
      },
      {
        "id": "d",
        "text": "The motor stops turning"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The case states that breaking the path stops the motor."
  },
  {
    "id": "science-u02-l03-q08",
    "conceptTag": "electric-transfer-path",
    "reviewCardId": "science-u02-l03-c2",
    "type": "multiple-choice",
    "prompt": "What does the path builder do?",
    "choices": [
      {
        "id": "a",
        "text": "Represents the battery-current-motor route"
      },
      {
        "id": "b",
        "text": "Measures the motor’s exact energy"
      },
      {
        "id": "c",
        "text": "Observes a physical circuit"
      },
      {
        "id": "d",
        "text": "Guarantees all motors behave alike"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It is a simplified route model."
  },
  {
    "id": "science-u02-l03-q09",
    "conceptTag": "transfer-effect-reasoning",
    "reviewCardId": "science-u02-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which sentence correctly separates effect and inference?",
    "choices": [
      {
        "id": "a",
        "text": "An energy label appeared, so the spoon exists"
      },
      {
        "id": "b",
        "text": "The spoon became warmer, so heat transfer is inferred"
      },
      {
        "id": "c",
        "text": "The activity finished, so a circuit was tested"
      },
      {
        "id": "d",
        "text": "The motor label moved, so light transferred"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Warming is observed and heat transfer is inferred."
  },
  {
    "id": "science-u02-l03-q10",
    "conceptTag": "transfer-effect-reasoning",
    "reviewCardId": "science-u02-l03-c3",
    "type": "true-false",
    "prompt": "“Energy transferred” alone is a complete observation.",
    "choices": [
      {
        "id": "true",
        "text": "True — no effect is needed"
      },
      {
        "id": "false",
        "text": "False — name the observed change first"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The claim needs an observable effect as evidence."
  },
  {
    "id": "science-u02-l03-q11",
    "conceptTag": "transfer-effect-reasoning",
    "reviewCardId": "science-u02-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which pair matches each case?",
    "choices": [
      {
        "id": "a",
        "text": "heat—turning label; current—warmer water"
      },
      {
        "id": "b",
        "text": "heat—exact amount; current—proof"
      },
      {
        "id": "c",
        "text": "heat—warmer spoon; current—turning motor"
      },
      {
        "id": "d",
        "text": "heat—battery; current—sunlight"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The observations match their written transfer routes."
  },
  {
    "id": "science-u02-l03-q12",
    "conceptTag": "transfer-effect-reasoning",
    "reviewCardId": "science-u02-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which statement remains within the Grade 4 boundary?",
    "choices": [
      {
        "id": "a",
        "text": "The motor received exactly 14 energy units"
      },
      {
        "id": "b",
        "text": "The spoon gained a calculated amount of energy"
      },
      {
        "id": "c",
        "text": "Transfer and transformation must be distinguished by formula"
      },
      {
        "id": "d",
        "text": "The warmer spoon and turning motor qualitatively support transfer claims"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The lesson uses qualitative observations only."
  },
  {
    "id": "science-u02-l03-q13",
    "conceptTag": "transfer-effect-reasoning",
    "reviewCardId": "science-u02-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which detail is irrelevant to the electric-current claim?",
    "choices": [
      {
        "id": "a",
        "text": "The motor casing is the observer’s favorite color"
      },
      {
        "id": "b",
        "text": "The battery and motor are connected"
      },
      {
        "id": "c",
        "text": "The shaft turns when connected"
      },
      {
        "id": "d",
        "text": "The shaft stops when the path opens"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Favorite color does not describe the transfer effect."
  }
];

const scienceU02L03Lesson: Lesson = {
  ...scienceU02L03Core,
  quiz: { passThreshold: 8, pool: scienceU02L03Questions },
};

export const unit02Lessons: Lesson[] = [
  scienceU02L01Lesson,
  scienceU02L02Lesson,
  scienceU02L03Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u02.test.ts`. Expected: PASS with 3 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u02-l03`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u02.ts src/content/science/u02.test.ts`, then `git add src/content/science/u02.ts src/content/science/u02.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): compare heat and current transfer evidence"`.
### Task 5: Author `science-u02-l04` — Compare Energy Transfer Observations

**Files:** Modify `src/content/science/u02.ts` and `src/content/science/u02.test.ts`.

**Interfaces:** Produces schema-native `scienceU02L04Core`, `scienceU02L04Questions`, and `scienceU02L04Lesson`; appends manifest row 8 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u02.test.ts`. Expected: FAIL because the test expects 4 lesson rows while production exports 3.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU02L04Core = {
  "id": "science-u02-l04",
  "unitId": "science-u02",
  "title": "Compare Energy Transfer Observations",
  "indicatorCodes": [
    "4-PS3-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Four evidence cards describe sound, light, heat, and electric-current cases."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "A strong comparison organizes each source, route, receiver, and observable effect."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will choose only relevant observations and build a claim across cases."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s make a careful four-route evidence chart!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u02-l04-c1",
      "title": "Organize four transfer cases",
      "blocks": [
        {
          "kind": "text",
          "text": "Use four headings for every case: source, transfer route, receiver, and observed effect. This common structure makes different cases comparable."
        },
        {
          "kind": "example",
          "text": "Sound: tuning fork, sound, paper bits, trembling. Light: flashlight, light, card, brighter. Heat: warm water, heat, spoon, warmer. Electric current: battery, current, motor, turning."
        },
        {
          "kind": "tip",
          "text": "Support: Read one row at a time and point to source → route → receiver → effect."
        }
      ]
    },
    {
      "id": "science-u02-l04-c2",
      "title": "Choose relevant observations",
      "blocks": [
        {
          "kind": "text",
          "text": "Relevant evidence describes a receiver change tied to the question. Colors, names, and preferences are irrelevant unless they are the measured effect."
        },
        {
          "kind": "example",
          "text": "Useful observations are trembling paper, a brighter card, a warmer spoon, and a turning motor. A blue pencil is unrelated."
        },
        {
          "kind": "tip",
          "text": "Response frame: The observation ____ is relevant because it describes a change in the ____."
        }
      ]
    },
    {
      "id": "science-u02-l04-c3",
      "title": "Build a comparison claim",
      "blocks": [
        {
          "kind": "text",
          "text": "A comparison claim names a pattern and supports it with observations from more than one case. It does not say all routes cause the same effect."
        },
        {
          "kind": "example",
          "text": "Across the four cases, energy transfer is supported by different receiver effects: motion, brightness, warming, and turning."
        },
        {
          "kind": "tip",
          "text": "Stretch: Use evidence from three routes, then state one limit: the observations support transfer qualitatively but do not give exact energy amounts."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Compare Energy Transfer Observations",
    "steps": [
      "Place the four written cases under source, route, receiver, and effect headings.",
      "Remove unrelated details such as object color or the observer’s favorite case.",
      "Notice that every relevant row includes a change at a receiver, although the kinds of change differ.",
      "Claim that sound, light, heat, and electric current can transfer energy from place to place, supported by the listed qualitative observations."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU02L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u02-l04-q01",
    "conceptTag": "transfer-case-features",
    "reviewCardId": "science-u02-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which row is organized correctly?",
    "choices": [
      {
        "id": "a",
        "text": "tuning fork | sound | paper bits | trembling"
      },
      {
        "id": "b",
        "text": "paper bits | heat | tuning fork | blue"
      },
      {
        "id": "c",
        "text": "flashlight | current | spoon | turning"
      },
      {
        "id": "d",
        "text": "battery | light | card | warmer"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The row correctly orders source, route, receiver, and effect."
  },
  {
    "id": "science-u02-l04-q02",
    "conceptTag": "transfer-case-features",
    "reviewCardId": "science-u02-l04-c1",
    "type": "sort",
    "prompt": "Order the four parts of a transfer evidence row.",
    "items": [
      {
        "id": "receiver",
        "text": "Receiver"
      },
      {
        "id": "effect",
        "text": "Observed effect"
      },
      {
        "id": "source",
        "text": "Source"
      },
      {
        "id": "route",
        "text": "Transfer route"
      }
    ],
    "correctOrder": [
      "source",
      "route",
      "receiver",
      "effect"
    ],
    "explanation": "The common comparison order is source, route, receiver, effect."
  },
  {
    "id": "science-u02-l04-q03",
    "conceptTag": "transfer-case-features",
    "reviewCardId": "science-u02-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which receiver belongs to the light case?",
    "choices": [
      {
        "id": "a",
        "text": "Tuning fork"
      },
      {
        "id": "b",
        "text": "Card"
      },
      {
        "id": "c",
        "text": "Warm water"
      },
      {
        "id": "d",
        "text": "Battery"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The card receives the flashlight’s light."
  },
  {
    "id": "science-u02-l04-q04",
    "conceptTag": "transfer-case-features",
    "reviewCardId": "science-u02-l04-c1",
    "type": "true-false",
    "prompt": "The four cases can be compared with the same source-route-receiver-effect headings.",
    "choices": [
      {
        "id": "true",
        "text": "True — common headings organize the cases"
      },
      {
        "id": "false",
        "text": "False — different routes cannot be compared"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The common structure supports comparison."
  },
  {
    "id": "science-u02-l04-q05",
    "conceptTag": "relevant-transfer-observations",
    "reviewCardId": "science-u02-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which detail is relevant evidence in the sound case?",
    "choices": [
      {
        "id": "a",
        "text": "The fork is silver"
      },
      {
        "id": "b",
        "text": "The table is rectangular"
      },
      {
        "id": "c",
        "text": "The paper bits trembled"
      },
      {
        "id": "d",
        "text": "The observer likes music"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Trembling paper describes the receiver effect."
  },
  {
    "id": "science-u02-l04-q06",
    "conceptTag": "relevant-transfer-observations",
    "reviewCardId": "science-u02-l04-c2",
    "type": "true-false",
    "prompt": "A motor’s brand name is relevant evidence that electric current transferred energy.",
    "choices": [
      {
        "id": "true",
        "text": "True — names show transfer"
      },
      {
        "id": "false",
        "text": "False — the turning shaft is the relevant effect"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "A brand name does not describe a receiver change."
  },
  {
    "id": "science-u02-l04-q07",
    "conceptTag": "relevant-transfer-observations",
    "reviewCardId": "science-u02-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which observation belongs to the heat case?",
    "choices": [
      {
        "id": "a",
        "text": "The paper bits trembled"
      },
      {
        "id": "b",
        "text": "The card appeared brighter"
      },
      {
        "id": "c",
        "text": "The motor turned"
      },
      {
        "id": "d",
        "text": "The spoon became warmer"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Warming is the stated effect in the heat case."
  },
  {
    "id": "science-u02-l04-q08",
    "conceptTag": "relevant-transfer-observations",
    "reviewCardId": "science-u02-l04-c2",
    "type": "multiple-choice",
    "prompt": "Why is “the model completed” not transfer evidence?",
    "choices": [
      {
        "id": "a",
        "text": "It reports app state rather than a receiver change in the physical case"
      },
      {
        "id": "b",
        "text": "It is too short"
      },
      {
        "id": "c",
        "text": "It names no color"
      },
      {
        "id": "d",
        "text": "It uses the word model"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Completion does not observe the physical phenomenon."
  },
  {
    "id": "science-u02-l04-q09",
    "conceptTag": "transfer-comparison-claim",
    "reviewCardId": "science-u02-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which comparison claim uses evidence from two routes?",
    "choices": [
      {
        "id": "a",
        "text": "Every route makes objects brighter"
      },
      {
        "id": "b",
        "text": "Paper bits trembled with sound, while a card brightened with light"
      },
      {
        "id": "c",
        "text": "Energy labels were physical observations in all cases"
      },
      {
        "id": "d",
        "text": "Only motors can receive energy"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It cites different effects for sound and light."
  },
  {
    "id": "science-u02-l04-q10",
    "conceptTag": "transfer-comparison-claim",
    "reviewCardId": "science-u02-l04-c3",
    "type": "true-false",
    "prompt": "Different transfer routes may produce different observable effects.",
    "choices": [
      {
        "id": "true",
        "text": "True — effects depend on the route and receiver"
      },
      {
        "id": "false",
        "text": "False — every effect must be identical"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The cases include motion, brightness, warming, and turning."
  },
  {
    "id": "science-u02-l04-q11",
    "conceptTag": "transfer-comparison-claim",
    "reviewCardId": "science-u02-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which conclusion is supported by all four cases?",
    "choices": [
      {
        "id": "a",
        "text": "Every receiver moved"
      },
      {
        "id": "b",
        "text": "Every source was a battery"
      },
      {
        "id": "c",
        "text": "Each case described a receiver change linked to a transfer route"
      },
      {
        "id": "d",
        "text": "Exact energy amounts were measured"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Each written case includes a relevant qualitative change."
  },
  {
    "id": "science-u02-l04-q12",
    "conceptTag": "transfer-comparison-claim",
    "reviewCardId": "science-u02-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which limitation should be included?",
    "choices": [
      {
        "id": "a",
        "text": "The observations prove every future result"
      },
      {
        "id": "b",
        "text": "The activity supplied an exact energy measurement"
      },
      {
        "id": "c",
        "text": "The cases directly recorded energy itself"
      },
      {
        "id": "d",
        "text": "The observations support qualitative transfer claims, not exact energy amounts"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The PE excludes quantitative energy measurement."
  },
  {
    "id": "science-u02-l04-q13",
    "conceptTag": "transfer-comparison-claim",
    "reviewCardId": "science-u02-l04-c3",
    "type": "fill-blank",
    "prompt": "Complete the claim: Each case includes an observed change at the ___.",
    "acceptedAnswers": [
      "receiver"
    ],
    "explanation": "The receiver is where the compared effect occurs."
  }
];

const scienceU02L04Lesson: Lesson = {
  ...scienceU02L04Core,
  quiz: { passThreshold: 8, pool: scienceU02L04Questions },
};

export const unit02Lessons: Lesson[] = [
  scienceU02L01Lesson,
  scienceU02L02Lesson,
  scienceU02L03Lesson,
  scienceU02L04Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u02.test.ts`. Expected: PASS with 4 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u02-l04`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u02.ts src/content/science/u02.test.ts`, then `git add src/content/science/u02.ts src/content/science/u02.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): complete science energy transfer unit"`.

## Wave verification and handoff

- [ ] Run focused tests for both owned units, `src/content/schema.test.ts`, `src/content/content-validation.test.ts`, `src/content/answer-normalization.test.ts`, and the master lesson-quality test when present; then run `npx tsc -b --pretty false`, `npm run build`, and `git diff --check`.
- [ ] Count exactly 8 lessons, 24 cards, 104 questions, 24 exact concept-tag/review targets, and 24 immediate canonical review steps in this wave.
- [ ] Run placeholder, prohibited-boundary, false-evidence, directly-visible-energy, widget-name/config, answer-normalization, and review-mapping scans. Require no finding.
- [ ] Request independent scoped review. Do not register units here; hand accepted exports to Plan C master Task C5.
