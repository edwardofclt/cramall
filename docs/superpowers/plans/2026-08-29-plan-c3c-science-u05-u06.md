# Cram All Plan C3c: Science Units 5–6 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the frozen Energy Conversion Design and Structures for Survival wave as 8 lessons, 24 cards, and 104 questions.

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

- `4-PS3-4`: stay within motion-to-electric conversion or battery-stored energy producing motion, light, or sound. Designs name goal, materials, constraints, success criteria, fair procedures, observations, and a single-feature refinement. Optional physical work uses covered low-voltage holders and prewired components with adult inspection; scored answers use supplied records.
- A hand-crank generator receives motion when a learner turns its attached crank and converts that motion to electric energy; a bare crank is not taught as the converter.
- `4-LS1-1`: remain at visible whole-organism/organ structure and function—roots, stems, leaves, flowers, thorns, beak, wings, skin, heart, and lungs—with no cellular processes.
- `4-LS1-2`: use sense information → brain processing → response at system level; do not assess receptor mechanisms or memory storage.

## Preflight

- [ ] Run `git status --short`, `git diff --stat`, `git log -8 --oneline`, and read both execution ledgers; preserve every unrelated or concurrent change.
- [ ] Re-read the design spec, Plan C master, Science blueprint, applicable verbatim standards, `src/content/schema.ts`, `src/content/answer-normalization.ts`, `src/quiz/engine.ts`, widget registry/components, and current Unit 1 source/test when this wave touches Unit 1.
- [ ] Run `npm test && npx tsc -b --pretty false && npm run build`; stop and record any failure before editing.

---

## Unit 5 lesson tasks

### Task 1: Author `science-u05-l01` — Trace Allowed Energy Conversions

**Files:** Create `src/content/science/u05.ts` and `src/content/science/u05.test.ts`.

**Interfaces:** Produces schema-native `scienceU05L01Core`, `scienceU05L01Questions`, and `scienceU05L01Lesson`; appends manifest row 17 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Create this exact focused test file:

```ts
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
        "widget": null
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u05.test.ts`. Expected: FAIL because `./u05` does not exist.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Create the source file with

```ts
import type { Lesson } from '../schema';

const scienceU05L01Core = {
  "id": "science-u05-l01",
  "unitId": "science-u05",
  "title": "Trace Allowed Energy Conversions",
  "indicatorCodes": [
    "4-PS3-4"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A hand-crank generator turns and a connected buzzer makes sound."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "A useful device model names the energy form entering and leaving each component."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will trace only connected forms and stay inside the Grade 4 device boundary."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s build a chain that can work!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u05-l01-c1",
      "title": "Name input and output forms",
      "blocks": [
        {
          "kind": "text",
          "text": "Each component has an input form and an output form. A hand-crank generator receives motion and can produce electric energy; a buzzer receives electric energy and produces sound."
        },
        {
          "kind": "example",
          "text": "Write component labels as motion → hand-crank generator → electric and electric → buzzer → sound."
        },
        {
          "kind": "tip",
          "text": "Support: Underline the outgoing form of the first component and the incoming form of the next."
        }
      ]
    },
    {
      "id": "science-u05-l01-c2",
      "title": "Trace a connected conversion chain",
      "blocks": [
        {
          "kind": "text",
          "text": "A chain connects only when one component’s output form exactly matches the next component’s input form."
        },
        {
          "kind": "example",
          "text": "The hand-crank generator outputs electric energy; the buzzer receives electric energy. Therefore hand-crank generator → buzzer is connected."
        },
        {
          "kind": "tip",
          "text": "Response frame: ____ outputs ____, which matches ____ input, so the chain ____."
        }
      ],
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
            }
          ],
          "requiredStart": "crank",
          "requiredEnd": "buzzer"
        }
      }
    },
    {
      "id": "science-u05-l01-c3",
      "title": "Stay within device limits",
      "blocks": [
        {
          "kind": "text",
          "text": "Allowed designs use motion to produce electric energy or use battery-stored energy to cause motion or produce light or sound."
        },
        {
          "kind": "example",
          "text": "A hand-crank generator connected to a buzzer, or battery-to-lamp, battery-to-motor, and battery-to-buzzer designs, fit this unit."
        },
        {
          "kind": "tip",
          "text": "Stretch: Reject one out-of-boundary design and revise it to an allowed start and output without adding a formula."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Trace Allowed Energy Conversions",
    "steps": [
      "Label the hand-crank generator input motion and output electric.",
      "Label the buzzer input electric and output sound.",
      "Connect the matching electric labels to form motion → electric → sound.",
      "Explain that the model helps plan the chain; a physical test would need separate observations."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Append:

```ts
const scienceU05L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u05-l01-q01",
    "conceptTag": "conversion-input-output",
    "reviewCardId": "science-u05-l01-c1",
    "type": "multiple-choice",
    "prompt": "What enters the hand-crank generator in this model?",
    "choices": [
      {
        "id": "a",
        "text": "Motion"
      },
      {
        "id": "b",
        "text": "Light"
      },
      {
        "id": "c",
        "text": "Sound"
      },
      {
        "id": "d",
        "text": "Heat"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The crank input is motion."
  },
  {
    "id": "science-u05-l01-q02",
    "conceptTag": "conversion-input-output",
    "reviewCardId": "science-u05-l01-c1",
    "type": "true-false",
    "prompt": "The buzzer output is sound.",
    "choices": [
      {
        "id": "true",
        "text": "True — sound is the listed output"
      },
      {
        "id": "false",
        "text": "False — the output is stored energy"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The component label gives sound."
  },
  {
    "id": "science-u05-l01-q03",
    "conceptTag": "conversion-input-output",
    "reviewCardId": "science-u05-l01-c1",
    "type": "multiple-choice",
    "prompt": "What form connects crank to buzzer?",
    "choices": [
      {
        "id": "a",
        "text": "Motion"
      },
      {
        "id": "b",
        "text": "Electric"
      },
      {
        "id": "c",
        "text": "Light"
      },
      {
        "id": "d",
        "text": "Stored"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The generator output and buzzer input are electric."
  },
  {
    "id": "science-u05-l01-q04",
    "conceptTag": "conversion-input-output",
    "reviewCardId": "science-u05-l01-c1",
    "type": "fill-blank",
    "prompt": "The buzzer changes electric energy into ___.",
    "acceptedAnswers": [
      "sound"
    ],
    "explanation": "Sound is the observable output form."
  },
  {
    "id": "science-u05-l01-q05",
    "conceptTag": "conversion-chain",
    "reviewCardId": "science-u05-l01-c2",
    "type": "multiple-choice",
    "prompt": "When can two components connect?",
    "choices": [
      {
        "id": "a",
        "text": "Their colors match"
      },
      {
        "id": "b",
        "text": "Their names rhyme"
      },
      {
        "id": "c",
        "text": "The first output matches the second input"
      },
      {
        "id": "d",
        "text": "They are drawn close together"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Compatible forms make a chain."
  },
  {
    "id": "science-u05-l01-q06",
    "conceptTag": "conversion-chain",
    "reviewCardId": "science-u05-l01-c2",
    "type": "sort",
    "prompt": "Order the conversion chain.",
    "items": [
      {
        "id": "sound",
        "text": "Buzzer produces sound"
      },
      {
        "id": "motion",
        "text": "Hand turns the generator’s crank"
      },
      {
        "id": "electric",
        "text": "Hand-crank generator produces electric energy"
      }
    ],
    "correctOrder": [
      "motion",
      "electric",
      "sound"
    ],
    "explanation": "The chain moves from motion to electric to sound."
  },
  {
    "id": "science-u05-l01-q07",
    "conceptTag": "conversion-chain",
    "reviewCardId": "science-u05-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which pair is compatible?",
    "choices": [
      {
        "id": "a",
        "text": "lamp light output to battery stored input"
      },
      {
        "id": "b",
        "text": "buzzer sound output to motor electric input"
      },
      {
        "id": "c",
        "text": "battery stored output to crank motion input"
      },
      {
        "id": "d",
        "text": "crank electric output to buzzer electric input"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Both connecting labels are electric."
  },
  {
    "id": "science-u05-l01-q08",
    "conceptTag": "conversion-chain",
    "reviewCardId": "science-u05-l01-c2",
    "type": "true-false",
    "prompt": "The on-screen chain is design thinking, not device-test evidence.",
    "choices": [
      {
        "id": "true",
        "text": "True — testing needs physical observations"
      },
      {
        "id": "false",
        "text": "False — completing it proves a device"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A model does not collect device observations."
  },
  {
    "id": "science-u05-l01-q09",
    "conceptTag": "conversion-device-boundary",
    "reviewCardId": "science-u05-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which design fits the assessed boundary?",
    "choices": [
      {
        "id": "a",
        "text": "A battery powers a small lamp"
      },
      {
        "id": "b",
        "text": "A device calculates exact energy"
      },
      {
        "id": "c",
        "text": "A device outside the named conversion set"
      },
      {
        "id": "d",
        "text": "A chemical reaction formula"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Battery-to-light is allowed."
  },
  {
    "id": "science-u05-l01-q10",
    "conceptTag": "conversion-device-boundary",
    "reviewCardId": "science-u05-l01-c3",
    "type": "true-false",
    "prompt": "A battery may be used to produce motion, light, or sound in this unit.",
    "choices": [
      {
        "id": "true",
        "text": "True — those endpoints are allowed"
      },
      {
        "id": "false",
        "text": "False — batteries are excluded"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The boundary names these endpoints."
  },
  {
    "id": "science-u05-l01-q11",
    "conceptTag": "conversion-device-boundary",
    "reviewCardId": "science-u05-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which design begins with motion and produces electric energy?",
    "choices": [
      {
        "id": "a",
        "text": "Battery to buzzer"
      },
      {
        "id": "b",
        "text": "Turn a hand-crank generator"
      },
      {
        "id": "c",
        "text": "Lamp to paper"
      },
      {
        "id": "d",
        "text": "Speaker to battery"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Turning the crank supplies motion to the attached generator, which produces electric energy."
  },
  {
    "id": "science-u05-l01-q12",
    "conceptTag": "conversion-device-boundary",
    "reviewCardId": "science-u05-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which proposal is outside this lesson’s allowed device set?",
    "choices": [
      {
        "id": "a",
        "text": "Battery to motor"
      },
      {
        "id": "b",
        "text": "Battery to lamp"
      },
      {
        "id": "c",
        "text": "A device that calculates nuclear reaction energy"
      },
      {
        "id": "d",
        "text": "Hand-crank generator to buzzer"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The calculation is not an allowed device design."
  },
  {
    "id": "science-u05-l01-q13",
    "conceptTag": "conversion-device-boundary",
    "reviewCardId": "science-u05-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which statement is accurate?",
    "choices": [
      {
        "id": "a",
        "text": "The activity physically tested a buzzer"
      },
      {
        "id": "b",
        "text": "An energy label supplied a physical observation"
      },
      {
        "id": "c",
        "text": "Every device is allowed"
      },
      {
        "id": "d",
        "text": "The model traces an allowed chain but supplies no test observation"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It states both scope and model limit."
  }
];

const scienceU05L01Lesson: Lesson = {
  ...scienceU05L01Core,
  quiz: { passThreshold: 8, pool: scienceU05L01Questions },
};

export const unit05Lessons: Lesson[] = [
  scienceU05L01Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u05.test.ts`. Expected: PASS with 1 lesson row, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u05-l01`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u05.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u05.ts src/content/science/u05.test.ts`, then `git add src/content/science/u05.ts src/content/science/u05.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): start science conversion design unit"`.
### Task 2: Author `science-u05-l02` — Plan a Device with Constraints

**Files:** Modify `src/content/science/u05.ts` and `src/content/science/u05.test.ts`.

**Interfaces:** Produces schema-native `scienceU05L02Core`, `scienceU05L02Questions`, and `scienceU05L02Lesson`; appends manifest row 18 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
        "widget": null
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
        "type": "multiple-choice",
        "card": 3
      }
    ]
  },
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u05.test.ts`. Expected: FAIL because the test expects 2 lesson rows while production exports 1.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU05L02Core = {
  "id": "science-u05-l02",
  "unitId": "science-u05",
  "title": "Plan a Device with Constraints",
  "indicatorCodes": [
    "4-PS3-4"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A reading-light prototype must use a battery to make a small lamp shine."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "The team has a covered battery holder, prewired lamp, switch, two wires, ten minutes, and a cost limit of eight classroom tokens."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will turn the need and constraints into a testable plan."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s make a plan another builder can follow safely!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u05-l02-c1",
      "title": "Define the device goal",
      "blocks": [
        {
          "kind": "text",
          "text": "A design goal names the energy start, desired observable output, and success criterion."
        },
        {
          "kind": "example",
          "text": "Goal: stored energy in the battery produces light; success means the lamp stays visibly lit for ten seconds after the switch closes."
        },
        {
          "kind": "tip",
          "text": "Support: Complete Goal = start ____; output ____; success when ____."
        }
      ]
    },
    {
      "id": "science-u05-l02-c2",
      "title": "Choose materials under constraints",
      "blocks": [
        {
          "kind": "text",
          "text": "Constraints limit materials, cost, and time. Choose only parts that support the conversion and fit every limit."
        },
        {
          "kind": "example",
          "text": "Available: covered holder 3 tokens, prewired lamp 3, switch 1, two wires 1; total 8 tokens and assembly within ten minutes under adult supervision."
        },
        {
          "kind": "tip",
          "text": "Response frame: I choose ____ because it supports ____ and keeps the plan within ____ tokens/minutes."
        }
      ],
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
            }
          ],
          "requiredStart": "battery",
          "requiredEnd": "lamp"
        }
      }
    },
    {
      "id": "science-u05-l02-c3",
      "title": "Draw a testable plan",
      "blocks": [
        {
          "kind": "text",
          "text": "A testable plan shows component order, safe connection steps, what stays the same, and the exact observation used to judge success."
        },
        {
          "kind": "example",
          "text": "Diagram battery holder → switch → prewired lamp → holder. Adult checks connections; tester closes the switch and observes whether the lamp remains lit for ten seconds."
        },
        {
          "kind": "tip",
          "text": "Stretch: Add a labeled fallback that changes no success criterion: reopen the switch, inspect one connection, and retest."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Plan a Device with Constraints",
    "steps": [
      "State the battery-to-light goal and ten-second visible-light criterion.",
      "Select holder, prewired lamp, switch, and two wires for exactly eight tokens and ten minutes.",
      "Draw the closed path and have an adult inspect the low-voltage setup.",
      "Test by closing the switch once and recording whether the lamp remains visibly lit for ten seconds."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU05L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u05-l02-q01",
    "conceptTag": "device-goal",
    "reviewCardId": "science-u05-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which goal is testable?",
    "choices": [
      {
        "id": "a",
        "text": "A battery-powered lamp stays visibly lit for ten seconds"
      },
      {
        "id": "b",
        "text": "Build the coolest device"
      },
      {
        "id": "c",
        "text": "Display an energy label"
      },
      {
        "id": "d",
        "text": "Use every material"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It names input, output, and observable criterion."
  },
  {
    "id": "science-u05-l02-q02",
    "conceptTag": "device-goal",
    "reviewCardId": "science-u05-l02-c1",
    "type": "true-false",
    "prompt": "A success criterion should be observable.",
    "choices": [
      {
        "id": "true",
        "text": "True — it tells how to judge the device"
      },
      {
        "id": "false",
        "text": "False — success should be a preference"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Visible light for a stated time is observable."
  },
  {
    "id": "science-u05-l02-q03",
    "conceptTag": "device-goal",
    "reviewCardId": "science-u05-l02-c1",
    "type": "multiple-choice",
    "prompt": "What is the desired output?",
    "choices": [
      {
        "id": "a",
        "text": "Motion"
      },
      {
        "id": "b",
        "text": "Light"
      },
      {
        "id": "c",
        "text": "Sound"
      },
      {
        "id": "d",
        "text": "A cost label"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The reading-light goal requires light."
  },
  {
    "id": "science-u05-l02-q04",
    "conceptTag": "device-goal",
    "reviewCardId": "science-u05-l02-c1",
    "type": "fill-blank",
    "prompt": "The lamp must stay lit for ___ seconds.",
    "acceptedAnswers": [
      "10",
      "ten"
    ],
    "explanation": "The criterion is ten seconds."
  },
  {
    "id": "science-u05-l02-q05",
    "conceptTag": "device-constraints",
    "reviewCardId": "science-u05-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which set meets the eight-token constraint exactly?",
    "choices": [
      {
        "id": "a",
        "text": "holder and lamp only for 6"
      },
      {
        "id": "b",
        "text": "holder, lamp, and extra decoration for 9"
      },
      {
        "id": "c",
        "text": "holder, lamp, switch, and two wires for 8"
      },
      {
        "id": "d",
        "text": "two lamps and two holders for 12"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The complete planned set totals eight."
  },
  {
    "id": "science-u05-l02-q06",
    "conceptTag": "device-constraints",
    "reviewCardId": "science-u05-l02-c2",
    "type": "true-false",
    "prompt": "A material should support the goal and fit the constraints.",
    "choices": [
      {
        "id": "true",
        "text": "True — both conditions matter"
      },
      {
        "id": "false",
        "text": "False — cost and function do not matter"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Design choices answer the need within limits."
  },
  {
    "id": "science-u05-l02-q07",
    "conceptTag": "device-constraints",
    "reviewCardId": "science-u05-l02-c2",
    "type": "multiple-choice",
    "prompt": "Why choose a prewired lamp?",
    "choices": [
      {
        "id": "a",
        "text": "It proves the device works"
      },
      {
        "id": "b",
        "text": "It removes the need for a battery"
      },
      {
        "id": "c",
        "text": "It changes light into stored energy"
      },
      {
        "id": "d",
        "text": "It supports the battery-to-light path in the safe classroom setup"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It is a suitable planned component."
  },
  {
    "id": "science-u05-l02-q08",
    "conceptTag": "device-constraints",
    "reviewCardId": "science-u05-l02-c2",
    "type": "multiple-choice",
    "prompt": "What does the conversion activity contribute?",
    "choices": [
      {
        "id": "a",
        "text": "A model of battery-to-lamp connections"
      },
      {
        "id": "b",
        "text": "Physical test observations"
      },
      {
        "id": "c",
        "text": "Proof of ten-second lighting"
      },
      {
        "id": "d",
        "text": "A cost measurement"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It helps plan the chain only."
  },
  {
    "id": "science-u05-l02-q09",
    "conceptTag": "device-test-plan",
    "reviewCardId": "science-u05-l02-c3",
    "type": "sort",
    "prompt": "Order the test plan.",
    "items": [
      {
        "id": "record",
        "text": "Record whether the lamp stays lit for ten seconds"
      },
      {
        "id": "inspect",
        "text": "Have an adult inspect the connections"
      },
      {
        "id": "build",
        "text": "Connect the holder, switch, wires, and prewired lamp"
      },
      {
        "id": "close",
        "text": "Close the switch"
      }
    ],
    "correctOrder": [
      "build",
      "inspect",
      "close",
      "record"
    ],
    "explanation": "Build, inspect, operate, then record."
  },
  {
    "id": "science-u05-l02-q10",
    "conceptTag": "device-test-plan",
    "reviewCardId": "science-u05-l02-c3",
    "type": "true-false",
    "prompt": "The test should change the ten-second criterion after seeing the result.",
    "choices": [
      {
        "id": "true",
        "text": "True — move the goal to fit the result"
      },
      {
        "id": "false",
        "text": "False — keep the criterion fixed"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "A fixed criterion supports fair judgment."
  },
  {
    "id": "science-u05-l02-q11",
    "conceptTag": "device-test-plan",
    "reviewCardId": "science-u05-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which diagram is complete?",
    "choices": [
      {
        "id": "a",
        "text": "battery → label"
      },
      {
        "id": "b",
        "text": "battery holder → switch → lamp → holder"
      },
      {
        "id": "c",
        "text": "lamp → decoration"
      },
      {
        "id": "d",
        "text": "wire → timer only"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The closed component path is testable."
  },
  {
    "id": "science-u05-l02-q12",
    "conceptTag": "device-test-plan",
    "reviewCardId": "science-u05-l02-c3",
    "type": "multiple-choice",
    "prompt": "Who should inspect the low-voltage connections before the test?",
    "choices": [
      {
        "id": "a",
        "text": "No one"
      },
      {
        "id": "b",
        "text": "A random online viewer"
      },
      {
        "id": "c",
        "text": "An adult"
      },
      {
        "id": "d",
        "text": "The widget"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Adult supervision supports safe setup."
  },
  {
    "id": "science-u05-l02-q13",
    "conceptTag": "device-test-plan",
    "reviewCardId": "science-u05-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which fallback is appropriate?",
    "choices": [
      {
        "id": "a",
        "text": "Touch bare wire ends"
      },
      {
        "id": "b",
        "text": "Add an unknown battery"
      },
      {
        "id": "c",
        "text": "Change the success goal"
      },
      {
        "id": "d",
        "text": "Open the switch, inspect one connection, and retest"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It is bounded, safe, and preserves the criterion."
  }
];

const scienceU05L02Lesson: Lesson = {
  ...scienceU05L02Core,
  quiz: { passThreshold: 8, pool: scienceU05L02Questions },
};

export const unit05Lessons: Lesson[] = [
  scienceU05L01Lesson,
  scienceU05L02Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u05.test.ts`. Expected: PASS with 2 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u05-l02`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u05.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u05.ts src/content/science/u05.test.ts`, then `git add src/content/science/u05.ts src/content/science/u05.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): plan a constrained conversion device"`.
### Task 3: Author `science-u05-l03` — Test an Energy-Conversion Device

**Files:** Modify `src/content/science/u05.ts` and `src/content/science/u05.test.ts`.

**Interfaces:** Produces schema-native `scienceU05L03Core`, `scienceU05L03Questions`, and `scienceU05L03Lesson`; appends manifest row 19 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
        "widget": null
      },
      {
        "title": "Record observable results",
        "tag": "device-test-observations",
        "widget": null
      },
      {
        "title": "Judge the device against its goal",
        "tag": "device-test-judgment",
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u05.test.ts`. Expected: FAIL because the test expects 3 lesson rows while production exports 2.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU05L03Core = {
  "id": "science-u05-l03",
  "unitId": "science-u05",
  "title": "Test an Energy-Conversion Device",
  "indicatorCodes": [
    "4-PS3-4"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A supplied test record describes three trials of the battery reading-light prototype."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "The observations, not a model, determine whether it met the goal."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will write a fair procedure, record only observable results, and judge the fixed criterion."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s read the evidence like engineers!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u05-l03-c1",
      "title": "Write a fair test procedure",
      "blocks": [
        {
          "kind": "text",
          "text": "A fair procedure repeats the same steps with the same battery, lamp, connections, switch, ten-second interval, and viewing condition."
        },
        {
          "kind": "example",
          "text": "For each trial, adult checks the covered setup, tester closes the switch, observer watches for ten seconds, then records the lamp result."
        },
        {
          "kind": "tip",
          "text": "Support: Number the verbs connect/check, close, observe, record."
        }
      ]
    },
    {
      "id": "science-u05-l03-c2",
      "title": "Record observable results",
      "blocks": [
        {
          "kind": "text",
          "text": "Record what happened without turning an inference into an observation. Supplied record: Trial 1 lit 6 seconds then flickered off; Trial 2 lit 7 seconds then flickered off; Trial 3 lit 6 seconds then flickered off."
        },
        {
          "kind": "example",
          "text": "“Lit for 6 seconds” and “flickered off” are observations. “The device dislikes reading” is not."
        },
        {
          "kind": "tip",
          "text": "Response frame: In Trial ____, the lamp ____. This is an observation because ____."
        }
      ]
    },
    {
      "id": "science-u05-l03-c3",
      "title": "Judge the device against its goal",
      "blocks": [
        {
          "kind": "text",
          "text": "Compare every trial with the same success criterion: visibly lit for ten seconds. A near result is still a miss if it does not reach the criterion."
        },
        {
          "kind": "example",
          "text": "None of 6, 7, and 6 seconds reaches ten seconds, so the prototype did not yet meet its goal."
        },
        {
          "kind": "tip",
          "text": "Stretch: Use all three trials to justify the judgment and identify one pattern without inventing a cause."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Test an Energy-Conversion Device",
    "steps": [
      "Follow the same checked procedure for three supplied trials.",
      "Record 6 seconds, 7 seconds, and 6 seconds before the lamp flickers off.",
      "Compare each result with the fixed ten-second criterion.",
      "Conclude that the current prototype misses the goal in all three trials; no cause is proven by these observations alone."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU05L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u05-l03-q01",
    "conceptTag": "device-test-procedure",
    "reviewCardId": "science-u05-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which procedure is fairest?",
    "choices": [
      {
        "id": "a",
        "text": "Use the same setup, steps, and ten-second interval each trial"
      },
      {
        "id": "b",
        "text": "Change the lamp and battery each trial"
      },
      {
        "id": "c",
        "text": "Stop when a preferred result appears"
      },
      {
        "id": "d",
        "text": "Use different criteria each time"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Keeping conditions alike supports comparison."
  },
  {
    "id": "science-u05-l03-q02",
    "conceptTag": "device-test-procedure",
    "reviewCardId": "science-u05-l03-c1",
    "type": "sort",
    "prompt": "Order the trial steps.",
    "items": [
      {
        "id": "record",
        "text": "Record the lamp result"
      },
      {
        "id": "close",
        "text": "Close the switch"
      },
      {
        "id": "check",
        "text": "Have an adult check the covered setup"
      },
      {
        "id": "observe",
        "text": "Observe for ten seconds"
      }
    ],
    "correctOrder": [
      "check",
      "close",
      "observe",
      "record"
    ],
    "explanation": "Safety check comes before operation and recording."
  },
  {
    "id": "science-u05-l03-q03",
    "conceptTag": "device-test-procedure",
    "reviewCardId": "science-u05-l03-c1",
    "type": "true-false",
    "prompt": "The success criterion should remain ten seconds for every trial.",
    "choices": [
      {
        "id": "true",
        "text": "True — keep the criterion fixed"
      },
      {
        "id": "false",
        "text": "False — adjust it after each result"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A constant criterion allows judgment."
  },
  {
    "id": "science-u05-l03-q04",
    "conceptTag": "device-test-procedure",
    "reviewCardId": "science-u05-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which condition should stay the same?",
    "choices": [
      {
        "id": "a",
        "text": "The conclusion"
      },
      {
        "id": "b",
        "text": "The battery, lamp, and viewing condition"
      },
      {
        "id": "c",
        "text": "The number written in the result"
      },
      {
        "id": "d",
        "text": "The explanation after testing"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "These setup conditions support a fair test."
  },
  {
    "id": "science-u05-l03-q05",
    "conceptTag": "device-test-observations",
    "reviewCardId": "science-u05-l03-c2",
    "type": "multiple-choice",
    "prompt": "What happened in Trial 2?",
    "choices": [
      {
        "id": "a",
        "text": "The lamp never lit"
      },
      {
        "id": "b",
        "text": "The lamp stayed lit ten seconds"
      },
      {
        "id": "c",
        "text": "The lamp lit seven seconds, then flickered off"
      },
      {
        "id": "d",
        "text": "The model predicted success"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "That is the supplied observation."
  },
  {
    "id": "science-u05-l03-q06",
    "conceptTag": "device-test-observations",
    "reviewCardId": "science-u05-l03-c2",
    "type": "true-false",
    "prompt": "“The lamp flickered off” is an observable result.",
    "choices": [
      {
        "id": "true",
        "text": "True — it describes what occurred"
      },
      {
        "id": "false",
        "text": "False — it is an exact energy value"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Flickering off can be observed."
  },
  {
    "id": "science-u05-l03-q07",
    "conceptTag": "device-test-observations",
    "reviewCardId": "science-u05-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which statement is not an observation?",
    "choices": [
      {
        "id": "a",
        "text": "Trial 1 lit for six seconds"
      },
      {
        "id": "b",
        "text": "Trial 2 lit for seven seconds"
      },
      {
        "id": "c",
        "text": "Trial 3 flickered off"
      },
      {
        "id": "d",
        "text": "The lamp dislikes reading"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It gives an unsupported human-like cause."
  },
  {
    "id": "science-u05-l03-q08",
    "conceptTag": "device-test-observations",
    "reviewCardId": "science-u05-l03-c2",
    "type": "fill-blank",
    "prompt": "Trial 1 stayed lit for ___ seconds.",
    "acceptedAnswers": [
      "6",
      "six"
    ],
    "explanation": "The supplied record gives six seconds."
  },
  {
    "id": "science-u05-l03-q09",
    "conceptTag": "device-test-judgment",
    "reviewCardId": "science-u05-l03-c3",
    "type": "multiple-choice",
    "prompt": "Did the prototype meet the ten-second goal?",
    "choices": [
      {
        "id": "a",
        "text": "No; all three trials were shorter than ten seconds"
      },
      {
        "id": "b",
        "text": "Yes; seven is close enough"
      },
      {
        "id": "c",
        "text": "Yes; the model can complete"
      },
      {
        "id": "d",
        "text": "There is no way to compare"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "All results miss the fixed criterion."
  },
  {
    "id": "science-u05-l03-q10",
    "conceptTag": "device-test-judgment",
    "reviewCardId": "science-u05-l03-c3",
    "type": "true-false",
    "prompt": "A seven-second result meets a ten-second success criterion.",
    "choices": [
      {
        "id": "true",
        "text": "True — near means success"
      },
      {
        "id": "false",
        "text": "False — seven is shorter than ten"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The criterion is explicit."
  },
  {
    "id": "science-u05-l03-q11",
    "conceptTag": "device-test-judgment",
    "reviewCardId": "science-u05-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which judgment uses all three trials?",
    "choices": [
      {
        "id": "a",
        "text": "The lamp failed because of a proven wire cause"
      },
      {
        "id": "b",
        "text": "The prototype missed the goal with results of 6, 7, and 6 seconds"
      },
      {
        "id": "c",
        "text": "The model passed, so the device passed"
      },
      {
        "id": "d",
        "text": "One trial can be ignored"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It compares all supplied results."
  },
  {
    "id": "science-u05-l03-q12",
    "conceptTag": "device-test-judgment",
    "reviewCardId": "science-u05-l03-c3",
    "type": "multiple-choice",
    "prompt": "What pattern is supported?",
    "choices": [
      {
        "id": "a",
        "text": "Every trial reached ten seconds"
      },
      {
        "id": "b",
        "text": "The exact cause was loose wiring"
      },
      {
        "id": "c",
        "text": "Each trial ended before ten seconds"
      },
      {
        "id": "d",
        "text": "The lamp will always fail forever"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The repeated early ending is observed."
  },
  {
    "id": "science-u05-l03-q13",
    "conceptTag": "device-test-judgment",
    "reviewCardId": "science-u05-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which claim is too strong?",
    "choices": [
      {
        "id": "a",
        "text": "The current prototype missed the criterion"
      },
      {
        "id": "b",
        "text": "The trials ended before ten seconds"
      },
      {
        "id": "c",
        "text": "The record supports refinement"
      },
      {
        "id": "d",
        "text": "The observations prove exactly which component caused the miss"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The test did not isolate a cause."
  }
];

const scienceU05L03Lesson: Lesson = {
  ...scienceU05L03Core,
  quiz: { passThreshold: 8, pool: scienceU05L03Questions },
};

export const unit05Lessons: Lesson[] = [
  scienceU05L01Lesson,
  scienceU05L02Lesson,
  scienceU05L03Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u05.test.ts`. Expected: PASS with 3 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u05-l03`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u05.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u05.ts src/content/science/u05.test.ts`, then `git add src/content/science/u05.ts src/content/science/u05.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): test a conversion device"`.
### Task 4: Author `science-u05-l04` — Refine a Device Using Test Evidence

**Files:** Modify `src/content/science/u05.ts` and `src/content/science/u05.test.ts`.

**Interfaces:** Produces schema-native `scienceU05L04Core`, `scienceU05L04Questions`, and `scienceU05L04Lesson`; appends manifest row 20 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
        "widget": null
      },
      {
        "title": "Change one design feature",
        "tag": "single-design-change",
        "widget": null
      },
      {
        "title": "Compare the retest with the first test",
        "tag": "refinement-evidence",
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
        "type": "multiple-choice",
        "card": 3
      }
    ]
  },
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u05.test.ts`. Expected: FAIL because the test expects 4 lesson rows while production exports 3.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU05L04Core = {
  "id": "science-u05-l04",
  "unitId": "science-u05",
  "title": "Refine a Device Using Test Evidence",
  "indicatorCodes": [
    "4-PS3-4"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "The first reading-light design missed its ten-second goal in all three trials."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "A useful refinement changes one design feature while preserving the goal and test conditions."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare first-test and retest records before making a claim."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s improve the design with evidence!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u05-l04-c1",
      "title": "Find a result that misses the goal",
      "blocks": [
        {
          "kind": "text",
          "text": "A refinement starts with a specific gap between the result and the criterion."
        },
        {
          "kind": "example",
          "text": "First-test results were 6, 7, and 6 seconds; each missed the ten-second lighting goal."
        },
        {
          "kind": "tip",
          "text": "Support: Write criterion 10 seconds, then subtract only to describe how many seconds short each result was; do not compute an energy amount."
        }
      ]
    },
    {
      "id": "science-u05-l04-c2",
      "title": "Change one design feature",
      "blocks": [
        {
          "kind": "text",
          "text": "Change one feature so the retest can show whether it helped. Keep the battery type, lamp, switch, observation interval, and viewing condition the same."
        },
        {
          "kind": "example",
          "text": "Refinement: replace one loose clip with a firmly fitting clip. Do not also replace the battery or lamp."
        },
        {
          "kind": "tip",
          "text": "Response frame: I will change ____ and keep ____ the same so I can compare ____."
        }
      ]
    },
    {
      "id": "science-u05-l04-c3",
      "title": "Compare the retest with the first test",
      "blocks": [
        {
          "kind": "text",
          "text": "Retest record after the one-clip change: 10, 10, and 10 seconds lit with no flicker during the interval. Compare with 6, 7, and 6."
        },
        {
          "kind": "example",
          "text": "The refined prototype met the goal in all retests. The comparison supports that this version performed better; it does not promise every future trial."
        },
        {
          "kind": "tip",
          "text": "Stretch: Cite both record sets, identify the single change, and state a cautious refinement claim plus one limit."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Refine a Device Using Test Evidence",
    "steps": [
      "Identify the original gap: 6, 7, and 6 seconds versus the ten-second goal.",
      "Change only the loose clip and keep the remaining setup and procedure constant.",
      "Retest and record 10, 10, and 10 seconds without flicker during the interval.",
      "Conclude that the refined version met the criterion in these trials and performed better than the first version."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU05L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u05-l04-q01",
    "conceptTag": "refinement-need",
    "reviewCardId": "science-u05-l04-c1",
    "type": "multiple-choice",
    "prompt": "What evidence shows a refinement is needed?",
    "choices": [
      {
        "id": "a",
        "text": "All first-test results were below ten seconds"
      },
      {
        "id": "b",
        "text": "The lamp has a label"
      },
      {
        "id": "c",
        "text": "The team prefers a new color"
      },
      {
        "id": "d",
        "text": "The model can be reset"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The record shows a repeatable gap."
  },
  {
    "id": "science-u05-l04-q02",
    "conceptTag": "refinement-need",
    "reviewCardId": "science-u05-l04-c1",
    "type": "true-false",
    "prompt": "A result of six seconds misses a ten-second goal.",
    "choices": [
      {
        "id": "true",
        "text": "True — it ends before the criterion"
      },
      {
        "id": "false",
        "text": "False — every lit result passes"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Six is shorter than ten."
  },
  {
    "id": "science-u05-l04-q03",
    "conceptTag": "refinement-need",
    "reviewCardId": "science-u05-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which is the best problem statement?",
    "choices": [
      {
        "id": "a",
        "text": "The device is bad"
      },
      {
        "id": "b",
        "text": "The lamp stopped after 6–7 seconds instead of staying lit for 10"
      },
      {
        "id": "c",
        "text": "The team needs a prettier box"
      },
      {
        "id": "d",
        "text": "An energy label should count as the result"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It names the evidence gap."
  },
  {
    "id": "science-u05-l04-q04",
    "conceptTag": "refinement-need",
    "reviewCardId": "science-u05-l04-c1",
    "type": "fill-blank",
    "prompt": "The highest first-test result was ___ seconds.",
    "acceptedAnswers": [
      "7",
      "seven"
    ],
    "explanation": "Trial 2 reached seven seconds."
  },
  {
    "id": "science-u05-l04-q05",
    "conceptTag": "single-design-change",
    "reviewCardId": "science-u05-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which refinement changes one feature?",
    "choices": [
      {
        "id": "a",
        "text": "Replace clip, battery, and lamp"
      },
      {
        "id": "b",
        "text": "Change the goal to six seconds"
      },
      {
        "id": "c",
        "text": "Replace the loose clip only"
      },
      {
        "id": "d",
        "text": "Use a different viewing room and interval"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Only the clip changes."
  },
  {
    "id": "science-u05-l04-q06",
    "conceptTag": "single-design-change",
    "reviewCardId": "science-u05-l04-c2",
    "type": "true-false",
    "prompt": "Keeping the lamp and battery type the same helps isolate the clip change.",
    "choices": [
      {
        "id": "true",
        "text": "True — other conditions stay controlled"
      },
      {
        "id": "false",
        "text": "False — every feature should change"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A single change supports comparison."
  },
  {
    "id": "science-u05-l04-q07",
    "conceptTag": "single-design-change",
    "reviewCardId": "science-u05-l04-c2",
    "type": "multiple-choice",
    "prompt": "Why not change the battery and clip together?",
    "choices": [
      {
        "id": "a",
        "text": "It costs no tokens"
      },
      {
        "id": "b",
        "text": "It guarantees failure"
      },
      {
        "id": "c",
        "text": "It changes the output to sound"
      },
      {
        "id": "d",
        "text": "The retest could not show which change mattered"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Two changes confound the result."
  },
  {
    "id": "science-u05-l04-q08",
    "conceptTag": "single-design-change",
    "reviewCardId": "science-u05-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which statement is a valid plan?",
    "choices": [
      {
        "id": "a",
        "text": "Change one clip, then repeat the same ten-second test"
      },
      {
        "id": "b",
        "text": "Change the success criterion"
      },
      {
        "id": "c",
        "text": "Skip recording"
      },
      {
        "id": "d",
        "text": "Use the model as test data"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It preserves the comparison."
  },
  {
    "id": "science-u05-l04-q09",
    "conceptTag": "refinement-evidence",
    "reviewCardId": "science-u05-l04-c3",
    "type": "sort",
    "prompt": "Order the refinement reasoning.",
    "items": [
      {
        "id": "claim",
        "text": "Judge whether the refined version met the goal"
      },
      {
        "id": "retest",
        "text": "Retest with the same procedure"
      },
      {
        "id": "gap",
        "text": "Identify the first-test gap"
      },
      {
        "id": "change",
        "text": "Change one design feature"
      }
    ],
    "correctOrder": [
      "gap",
      "change",
      "retest",
      "claim"
    ],
    "explanation": "Refinement moves from gap to change to retest to judgment."
  },
  {
    "id": "science-u05-l04-q10",
    "conceptTag": "refinement-evidence",
    "reviewCardId": "science-u05-l04-c3",
    "type": "true-false",
    "prompt": "The three successful retests guarantee every future trial will succeed.",
    "choices": [
      {
        "id": "true",
        "text": "True — three trials prove all future results"
      },
      {
        "id": "false",
        "text": "False — they support only a cautious claim"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Evidence is limited to the tested conditions."
  },
  {
    "id": "science-u05-l04-q11",
    "conceptTag": "refinement-evidence",
    "reviewCardId": "science-u05-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which comparison is correct?",
    "choices": [
      {
        "id": "a",
        "text": "First 10,10,10; retest 6,7,6"
      },
      {
        "id": "b",
        "text": "First 6,7,6; retest 10,10,10"
      },
      {
        "id": "c",
        "text": "Both sets were 7,7,7"
      },
      {
        "id": "d",
        "text": "No results were recorded"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Those are the two supplied records."
  },
  {
    "id": "science-u05-l04-q12",
    "conceptTag": "refinement-evidence",
    "reviewCardId": "science-u05-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which claim is supported?",
    "choices": [
      {
        "id": "a",
        "text": "The clip is the only possible cause in every device"
      },
      {
        "id": "b",
        "text": "Completing the activity guarantees the refinement worked"
      },
      {
        "id": "c",
        "text": "This refined version met the ten-second goal in all three retests"
      },
      {
        "id": "d",
        "text": "Every lamp will now work forever"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It matches the retest evidence without overclaiming."
  },
  {
    "id": "science-u05-l04-q13",
    "conceptTag": "refinement-evidence",
    "reviewCardId": "science-u05-l04-c3",
    "type": "multiple-choice",
    "prompt": "What stayed within the allowed conversion boundary?",
    "choices": [
      {
        "id": "a",
        "text": "The device changed into an unlisted design"
      },
      {
        "id": "b",
        "text": "The test calculated energy"
      },
      {
        "id": "c",
        "text": "The output changed to a chemical formula"
      },
      {
        "id": "d",
        "text": "Battery-stored energy still produced light"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The refinement preserves battery-to-light."
  }
];

const scienceU05L04Lesson: Lesson = {
  ...scienceU05L04Core,
  quiz: { passThreshold: 8, pool: scienceU05L04Questions },
};

export const unit05Lessons: Lesson[] = [
  scienceU05L01Lesson,
  scienceU05L02Lesson,
  scienceU05L03Lesson,
  scienceU05L04Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u05.test.ts`. Expected: PASS with 4 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u05-l04`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u05.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u05.ts src/content/science/u05.test.ts`, then `git add src/content/science/u05.ts src/content/science/u05.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): refine a conversion device"`.

## Unit 6 lesson tasks

### Task 5: Author `science-u06-l01` — Explain Plant Structures as a System

**Files:** Create `src/content/science/u06.ts` and `src/content/science/u06.test.ts`.

**Interfaces:** Produces schema-native `scienceU06L01Core`, `scienceU06L01Questions`, and `scienceU06L01Lesson`; appends manifest row 21 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Create this exact focused test file:

```ts
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
        "widget": null
      },
      {
        "title": "Connect structures and functions",
        "tag": "plant-structure-functions",
        "widget": null
      },
      {
        "title": "Argue how structures work together",
        "tag": "plant-system-argument",
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u06.test.ts`. Expected: FAIL because `./u06` does not exist.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Create the source file with

```ts
import type { Lesson } from '../schema';

const scienceU06L01Core = {
  "id": "science-u06-l01",
  "unitId": "science-u06",
  "title": "Explain Plant Structures as a System",
  "indicatorCodes": [
    "4-LS1-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A blackberry plant survives because several visible structures do different jobs together."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Roots, stems, leaves, flowers, and thorns contribute to one whole system."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will connect each structure to a function and build a system argument."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s see how the parts support the whole plant!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u06-l01-c1",
      "title": "Identify visible plant structures",
      "blocks": [
        {
          "kind": "text",
          "text": "External plant structures include roots, stems, leaves, flowers, and thorns. Identify the structure before explaining its job."
        },
        {
          "kind": "example",
          "text": "On the blackberry plant, roots extend into soil, stems hold leaves and flowers, leaves spread outward, flowers grow at stem tips, and thorns line stems."
        },
        {
          "kind": "tip",
          "text": "Support: Label the five structures on a whole-plant sketch before adding any function arrows."
        }
      ]
    },
    {
      "id": "science-u06-l01-c2",
      "title": "Connect structures and functions",
      "blocks": [
        {
          "kind": "text",
          "text": "Roots anchor and take in water; stems support and move materials; leaves capture sunlight; flowers support reproduction; thorns can discourage some animals from feeding."
        },
        {
          "kind": "example",
          "text": "A function explains how a structure contributes to survival, growth, behavior, or reproduction."
        },
        {
          "kind": "tip",
          "text": "Response frame: The ____ helps the plant ____ by ____."
        }
      ]
    },
    {
      "id": "science-u06-l01-c3",
      "title": "Argue how structures work together",
      "blocks": [
        {
          "kind": "text",
          "text": "A system argument connects more than one structure. No single part performs every job."
        },
        {
          "kind": "example",
          "text": "Roots supply water, stems support and connect the plant, leaves capture sunlight, and flowers support reproduction. Together they support growth and continuation."
        },
        {
          "kind": "tip",
          "text": "Stretch: Make a claim about the plant system, cite three structure-function pairs, and explain how their jobs connect."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Explain Plant Structures as a System",
    "steps": [
      "Claim that the blackberry plant’s structures function together as a system.",
      "Cite roots taking in water, stems supporting leaves, and leaves capturing sunlight.",
      "Add flowers supporting reproduction and thorns helping protect stems and leaves.",
      "Reason that combined jobs support survival, growth, and reproduction better than any one structure alone."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Append:

```ts
const scienceU06L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u06-l01-q01",
    "conceptTag": "plant-structures",
    "reviewCardId": "science-u06-l01-c1",
    "type": "multiple-choice",
    "prompt": "Which is a visible plant structure?",
    "choices": [
      {
        "id": "a",
        "text": "A root"
      },
      {
        "id": "b",
        "text": "A thought"
      },
      {
        "id": "c",
        "text": "A code value"
      },
      {
        "id": "d",
        "text": "A sound route"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Roots are plant structures."
  },
  {
    "id": "science-u06-l01-q02",
    "conceptTag": "plant-structures",
    "reviewCardId": "science-u06-l01-c1",
    "type": "true-false",
    "prompt": "Leaves and stems are different plant structures.",
    "choices": [
      {
        "id": "true",
        "text": "True — they are distinct parts"
      },
      {
        "id": "false",
        "text": "False — they are the same structure"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "They have different forms and jobs."
  },
  {
    "id": "science-u06-l01-q03",
    "conceptTag": "plant-structures",
    "reviewCardId": "science-u06-l01-c1",
    "type": "multiple-choice",
    "prompt": "Where are blackberry thorns described?",
    "choices": [
      {
        "id": "a",
        "text": "On flowers only"
      },
      {
        "id": "b",
        "text": "Along stems"
      },
      {
        "id": "c",
        "text": "Inside soil as roots"
      },
      {
        "id": "d",
        "text": "On a map key"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The example places thorns on stems."
  },
  {
    "id": "science-u06-l01-q04",
    "conceptTag": "plant-structures",
    "reviewCardId": "science-u06-l01-c1",
    "type": "fill-blank",
    "prompt": "The structures that spread outward and capture sunlight are ___.",
    "acceptedAnswers": [
      "leaves"
    ],
    "explanation": "Leaves are the named structures."
  },
  {
    "id": "science-u06-l01-q05",
    "conceptTag": "plant-structure-functions",
    "reviewCardId": "science-u06-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which pair is correct?",
    "choices": [
      {
        "id": "a",
        "text": "flower—anchors in soil"
      },
      {
        "id": "b",
        "text": "thorn—captures sunlight"
      },
      {
        "id": "c",
        "text": "root—takes in water"
      },
      {
        "id": "d",
        "text": "leaf—moves through air"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Roots take in water."
  },
  {
    "id": "science-u06-l01-q06",
    "conceptTag": "plant-structure-functions",
    "reviewCardId": "science-u06-l01-c2",
    "type": "true-false",
    "prompt": "Flowers can support plant reproduction.",
    "choices": [
      {
        "id": "true",
        "text": "True — reproduction is one system function"
      },
      {
        "id": "false",
        "text": "False — flowers only anchor plants"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Flowers contribute to reproduction."
  },
  {
    "id": "science-u06-l01-q07",
    "conceptTag": "plant-structure-functions",
    "reviewCardId": "science-u06-l01-c2",
    "type": "multiple-choice",
    "prompt": "What is a main stem function?",
    "choices": [
      {
        "id": "a",
        "text": "Produce sound"
      },
      {
        "id": "b",
        "text": "Enter the brain"
      },
      {
        "id": "c",
        "text": "Decode a grid"
      },
      {
        "id": "d",
        "text": "Support plant parts and move materials"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Stems support and connect the plant."
  },
  {
    "id": "science-u06-l01-q08",
    "conceptTag": "plant-structure-functions",
    "reviewCardId": "science-u06-l01-c2",
    "type": "multiple-choice",
    "prompt": "How can thorns support survival?",
    "choices": [
      {
        "id": "a",
        "text": "They can discourage some animals from feeding"
      },
      {
        "id": "b",
        "text": "They pull water from soil"
      },
      {
        "id": "c",
        "text": "They replace all leaves"
      },
      {
        "id": "d",
        "text": "They make exact energy visible"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Thorns can help protect the plant."
  },
  {
    "id": "science-u06-l01-q09",
    "conceptTag": "plant-system-argument",
    "reviewCardId": "science-u06-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which claim describes a system?",
    "choices": [
      {
        "id": "a",
        "text": "Roots do every plant job"
      },
      {
        "id": "b",
        "text": "Several structures with different functions work together"
      },
      {
        "id": "c",
        "text": "Flowers are the only needed structure"
      },
      {
        "id": "d",
        "text": "Structures never affect survival"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "A system combines cooperating parts."
  },
  {
    "id": "science-u06-l01-q10",
    "conceptTag": "plant-system-argument",
    "reviewCardId": "science-u06-l01-c3",
    "type": "true-false",
    "prompt": "One plant structure must perform every function in the system.",
    "choices": [
      {
        "id": "true",
        "text": "True — one part does all jobs"
      },
      {
        "id": "false",
        "text": "False — different parts contribute different functions"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Cooperation defines the system."
  },
  {
    "id": "science-u06-l01-q11",
    "conceptTag": "plant-system-argument",
    "reviewCardId": "science-u06-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which evidence set best supports growth?",
    "choices": [
      {
        "id": "a",
        "text": "Flower color and label style"
      },
      {
        "id": "b",
        "text": "Thorn count only"
      },
      {
        "id": "c",
        "text": "Roots take in water, stems support leaves, and leaves capture sunlight"
      },
      {
        "id": "d",
        "text": "The observer likes berries"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It links multiple functions."
  },
  {
    "id": "science-u06-l01-q12",
    "conceptTag": "plant-system-argument",
    "reviewCardId": "science-u06-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which reasoning connects the evidence?",
    "choices": [
      {
        "id": "a",
        "text": "Every structure is identical"
      },
      {
        "id": "b",
        "text": "Roots are underground, so leaves are unneeded"
      },
      {
        "id": "c",
        "text": "Flowers prove all plants have thorns"
      },
      {
        "id": "d",
        "text": "Water intake, support, and light capture cooperate to support growth"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It explains how the jobs connect."
  },
  {
    "id": "science-u06-l01-q13",
    "conceptTag": "plant-system-argument",
    "reviewCardId": "science-u06-l01-c3",
    "type": "fill-blank",
    "prompt": "Complete the claim: Plant structures function together as a ___.",
    "acceptedAnswers": [
      "system"
    ],
    "explanation": "The lesson’s central idea is a structure system."
  }
];

const scienceU06L01Lesson: Lesson = {
  ...scienceU06L01Core,
  quiz: { passThreshold: 8, pool: scienceU06L01Questions },
};

export const unit06Lessons: Lesson[] = [
  scienceU06L01Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u06.test.ts`. Expected: PASS with 1 lesson row, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u06-l01`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u06.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u06.ts src/content/science/u06.test.ts`, then `git add src/content/science/u06.ts src/content/science/u06.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): start science survival structures unit"`.
### Task 6: Author `science-u06-l02` — Explain Animal Structures as a System

**Files:** Modify `src/content/science/u06.ts` and `src/content/science/u06.test.ts`.

**Interfaces:** Produces schema-native `scienceU06L02Core`, `scienceU06L02Questions`, and `scienceU06L02Lesson`; appends manifest row 22 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
        "widget": null
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
              }
            ]
          }
        }
      },
      {
        "title": "Explain a cooperating system",
        "tag": "animal-system-explanation",
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

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u06.test.ts`. Expected: FAIL because the test expects 2 lesson rows while production exports 1.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU06L02Core = {
  "id": "science-u06-l02",
  "unitId": "science-u06",
  "title": "Explain Animal Structures as a System",
  "indicatorCodes": [
    "4-LS1-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A Carolina wren gathers food, moves, breathes, and stays protected through cooperating structures."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Some structures are external, such as beak, wings, and skin; others, such as heart and lungs, are internal."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will match structures to functions and explain a whole-animal system."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s connect each part to the jobs it supports!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u06-l02-c1",
      "title": "Identify internal and external structures",
      "blocks": [
        {
          "kind": "text",
          "text": "External structures are visible on the outside, including beak, wings, feet, feathers, and skin. Internal structures include heart and lungs."
        },
        {
          "kind": "example",
          "text": "A wren uses its beak and wings outside its body, while heart and lungs work inside."
        },
        {
          "kind": "tip",
          "text": "Support: Sort each named structure into outside or inside before naming its function."
        }
      ]
    },
    {
      "id": "science-u06-l02-c2",
      "title": "Match structures to functions",
      "blocks": [
        {
          "kind": "text",
          "text": "A beak gathers food; wings move the bird through air; lungs take in air; heart moves blood; skin and feathers help protect the body."
        },
        {
          "kind": "example",
          "text": "Match the specific structure to the function it can perform. The activity is a simplified model, not an observation of a living bird."
        },
        {
          "kind": "tip",
          "text": "Response frame: The wren’s ____ helps it ____ ."
        }
      ],
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
            }
          ]
        }
      }
    },
    {
      "id": "science-u06-l02-c3",
      "title": "Explain a cooperating system",
      "blocks": [
        {
          "kind": "text",
          "text": "Structures cooperate: the beak gathers food, lungs support breathing, heart moves blood, wings enable movement, and skin/feathers protect."
        },
        {
          "kind": "example",
          "text": "The system supports survival and behavior because the bird can get food, use air, move, and protect its body."
        },
        {
          "kind": "tip",
          "text": "Stretch: Explain one external and two internal structures in a connected system argument."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Explain Animal Structures as a System",
    "steps": [
      "Classify beak and wings as external, heart and lungs as internal.",
      "Match beak with gathering food, wings with moving through air, lungs with taking in air, and heart with moving blood.",
      "Add skin and feathers as protective external structures.",
      "Explain that these different functions cooperate to support the wren’s survival and behavior."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU06L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u06-l02-q01",
    "conceptTag": "animal-structures",
    "reviewCardId": "science-u06-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which is an external structure?",
    "choices": [
      {
        "id": "a",
        "text": "Beak"
      },
      {
        "id": "b",
        "text": "Heart"
      },
      {
        "id": "c",
        "text": "Lungs"
      },
      {
        "id": "d",
        "text": "Brain"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "A beak is outside the body."
  },
  {
    "id": "science-u06-l02-q02",
    "conceptTag": "animal-structures",
    "reviewCardId": "science-u06-l02-c1",
    "type": "true-false",
    "prompt": "Heart and lungs are internal structures.",
    "choices": [
      {
        "id": "true",
        "text": "True — they are inside the body"
      },
      {
        "id": "false",
        "text": "False — they are external coverings"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "They are internal organs."
  },
  {
    "id": "science-u06-l02-q03",
    "conceptTag": "animal-structures",
    "reviewCardId": "science-u06-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which pair contains one external and one internal structure?",
    "choices": [
      {
        "id": "a",
        "text": "heart and lungs"
      },
      {
        "id": "b",
        "text": "wing and heart"
      },
      {
        "id": "c",
        "text": "beak and skin"
      },
      {
        "id": "d",
        "text": "lungs and brain"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Wing is external and heart internal."
  },
  {
    "id": "science-u06-l02-q04",
    "conceptTag": "animal-structures",
    "reviewCardId": "science-u06-l02-c1",
    "type": "fill-blank",
    "prompt": "The internal structure that takes in air is the ___.",
    "acceptedAnswers": [
      "lungs",
      "lung"
    ],
    "explanation": "Lungs support breathing."
  },
  {
    "id": "science-u06-l02-q05",
    "conceptTag": "animal-structure-functions",
    "reviewCardId": "science-u06-l02-c2",
    "type": "multiple-choice",
    "prompt": "What function matches the wren’s beak?",
    "choices": [
      {
        "id": "a",
        "text": "Moves blood"
      },
      {
        "id": "b",
        "text": "Takes in air"
      },
      {
        "id": "c",
        "text": "Gathers food"
      },
      {
        "id": "d",
        "text": "Moves through air"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The beak gathers food."
  },
  {
    "id": "science-u06-l02-q06",
    "conceptTag": "animal-structure-functions",
    "reviewCardId": "science-u06-l02-c2",
    "type": "true-false",
    "prompt": "Wings can help a wren move through air.",
    "choices": [
      {
        "id": "true",
        "text": "True — that is their matched function"
      },
      {
        "id": "false",
        "text": "False — wings gather food"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Wings support flight."
  },
  {
    "id": "science-u06-l02-q07",
    "conceptTag": "animal-structure-functions",
    "reviewCardId": "science-u06-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which structure moves blood?",
    "choices": [
      {
        "id": "a",
        "text": "Beak"
      },
      {
        "id": "b",
        "text": "Wing"
      },
      {
        "id": "c",
        "text": "Skin"
      },
      {
        "id": "d",
        "text": "Heart"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The heart moves blood."
  },
  {
    "id": "science-u06-l02-q08",
    "conceptTag": "animal-structure-functions",
    "reviewCardId": "science-u06-l02-c2",
    "type": "multiple-choice",
    "prompt": "What does the matcher provide?",
    "choices": [
      {
        "id": "a",
        "text": "A simplified structure-function model"
      },
      {
        "id": "b",
        "text": "An observation of a living wren"
      },
      {
        "id": "c",
        "text": "A medical measurement"
      },
      {
        "id": "d",
        "text": "Proof of survival"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It is an authored matching model."
  },
  {
    "id": "science-u06-l02-q09",
    "conceptTag": "animal-system-explanation",
    "reviewCardId": "science-u06-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which explanation describes cooperation?",
    "choices": [
      {
        "id": "a",
        "text": "The beak performs every job"
      },
      {
        "id": "b",
        "text": "The beak gathers food while lungs and heart support the body and wings enable movement"
      },
      {
        "id": "c",
        "text": "Wings replace lungs"
      },
      {
        "id": "d",
        "text": "Skin gathers all food"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It connects different functions."
  },
  {
    "id": "science-u06-l02-q10",
    "conceptTag": "animal-system-explanation",
    "reviewCardId": "science-u06-l02-c3",
    "type": "true-false",
    "prompt": "Animal survival can depend on internal and external structures working together.",
    "choices": [
      {
        "id": "true",
        "text": "True — both groups contribute"
      },
      {
        "id": "false",
        "text": "False — only external parts matter"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The PE emphasizes a system."
  },
  {
    "id": "science-u06-l02-q11",
    "conceptTag": "animal-system-explanation",
    "reviewCardId": "science-u06-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which evidence supports behavior and survival?",
    "choices": [
      {
        "id": "a",
        "text": "The bird’s name"
      },
      {
        "id": "b",
        "text": "Its feather color only"
      },
      {
        "id": "c",
        "text": "Wings move it and a beak gathers food"
      },
      {
        "id": "d",
        "text": "The model button works"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Movement and feeding are relevant functions."
  },
  {
    "id": "science-u06-l02-q12",
    "conceptTag": "animal-system-explanation",
    "reviewCardId": "science-u06-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which statement stays at the correct scale?",
    "choices": [
      {
        "id": "a",
        "text": "Describe unnamed cell reactions"
      },
      {
        "id": "b",
        "text": "Explain tiny tissue chemistry"
      },
      {
        "id": "c",
        "text": "Calculate blood pressure"
      },
      {
        "id": "d",
        "text": "The heart moves blood and lungs take in air"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It uses organ-level functions."
  },
  {
    "id": "science-u06-l02-q13",
    "conceptTag": "animal-system-explanation",
    "reviewCardId": "science-u06-l02-c3",
    "type": "fill-blank",
    "prompt": "A beak, wings, heart, and lungs can function together in a ___.",
    "acceptedAnswers": [
      "system"
    ],
    "explanation": "These structures cooperate as a system."
  }
];

const scienceU06L02Lesson: Lesson = {
  ...scienceU06L02Core,
  quiz: { passThreshold: 8, pool: scienceU06L02Questions },
};

export const unit06Lessons: Lesson[] = [
  scienceU06L01Lesson,
  scienceU06L02Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u06.test.ts`. Expected: PASS with 2 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u06-l02`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u06.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u06.ts src/content/science/u06.test.ts`, then `git add src/content/science/u06.ts src/content/science/u06.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): connect animal structures and functions"`.
### Task 7: Author `science-u06-l03` — Argue How Structures Support Survival

**Files:** Modify `src/content/science/u06.ts` and `src/content/science/u06.test.ts`.

**Interfaces:** Produces schema-native `scienceU06L03Core`, `scienceU06L03Questions`, and `scienceU06L03Lesson`; appends manifest row 23 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
        "widget": null
      },
      {
        "title": "Select relevant survival evidence",
        "tag": "structure-evidence",
        "widget": null
      },
      {
        "title": "Connect evidence with reasoning",
        "tag": "structure-argument",
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

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u06.test.ts`. Expected: FAIL because the test expects 3 lesson rows while production exports 2.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU06L03Core = {
  "id": "science-u06-l03",
  "unitId": "science-u06",
  "title": "Argue How Structures Support Survival",
  "indicatorCodes": [
    "4-LS1-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Two observation cards describe a blackberry plant during a dry week and a wren feeding and flying."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "An argument needs a claim, relevant evidence, and reasoning that links structures to survival functions."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will choose evidence from the supplied observations and avoid unsupported body details."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s build a claim another reader can check!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u06-l03-c1",
      "title": "State a structure-system claim",
      "blocks": [
        {
          "kind": "text",
          "text": "A focused claim answers how a set of structures supports survival, growth, behavior, or reproduction."
        },
        {
          "kind": "example",
          "text": "Claim: The blackberry plant’s roots, stems, and leaves function together to support survival and growth during the dry week."
        },
        {
          "kind": "tip",
          "text": "Support: Begin with The ____ structures function together to support ____ ."
        }
      ]
    },
    {
      "id": "science-u06-l03-c2",
      "title": "Select relevant survival evidence",
      "blocks": [
        {
          "kind": "text",
          "text": "Plant card: deep roots reached damp soil, the upright stem held leaves in sunlight, and leaves remained spread. Wren card: beak gathered insects, wings carried the bird to cover, and feathers protected its body."
        },
        {
          "kind": "example",
          "text": "Choose observations that name a structure and what it did. Do not use card color or the observer’s preference."
        },
        {
          "kind": "tip",
          "text": "Response frame: The observation ____ is relevant because it shows the ____ performing ____."
        }
      ]
    },
    {
      "id": "science-u06-l03-c3",
      "title": "Connect evidence with reasoning",
      "blocks": [
        {
          "kind": "text",
          "text": "Reasoning explains why the functions in the evidence matter to the claim. It connects parts into a system rather than listing them."
        },
        {
          "kind": "example",
          "text": "Roots supplying water and stems holding leaves in light support plant growth; beak feeding and wing movement support the wren’s survival and behavior."
        },
        {
          "kind": "tip",
          "text": "Stretch: Write claim-evidence-reasoning with two structures and explain how the functions cooperate, then name one evidence limit."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Argue How Structures Support Survival",
    "steps": [
      "Claim that the blackberry plant’s structures cooperate during the dry week.",
      "Cite roots reaching damp soil and stems holding leaves in sunlight.",
      "Reason that water access plus supported leaves helps the plant continue growing.",
      "Limit the argument to the supplied whole-plant observations; do not invent an internal cause."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU06L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u06-l03-q01",
    "conceptTag": "structure-claim",
    "reviewCardId": "science-u06-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which is a focused system claim?",
    "choices": [
      {
        "id": "a",
        "text": "Blackberry roots, stems, and leaves work together to support growth"
      },
      {
        "id": "b",
        "text": "Plants are nice"
      },
      {
        "id": "c",
        "text": "Every plant survives every drought"
      },
      {
        "id": "d",
        "text": "Leaves do every job"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It answers the structure-system question."
  },
  {
    "id": "science-u06-l03-q02",
    "conceptTag": "structure-claim",
    "reviewCardId": "science-u06-l03-c1",
    "type": "true-false",
    "prompt": "A claim should answer the question being argued.",
    "choices": [
      {
        "id": "true",
        "text": "True — it states the position"
      },
      {
        "id": "false",
        "text": "False — claims should be unrelated"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A focused claim guides the evidence."
  },
  {
    "id": "science-u06-l03-q03",
    "conceptTag": "structure-claim",
    "reviewCardId": "science-u06-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which claim concerns wren survival?",
    "choices": [
      {
        "id": "a",
        "text": "Wrens are small"
      },
      {
        "id": "b",
        "text": "Beak, wings, and feathers support feeding, movement, and protection"
      },
      {
        "id": "c",
        "text": "All birds behave identically"
      },
      {
        "id": "d",
        "text": "Feathers replace lungs"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It connects named structures and functions."
  },
  {
    "id": "science-u06-l03-q04",
    "conceptTag": "structure-claim",
    "reviewCardId": "science-u06-l03-c1",
    "type": "fill-blank",
    "prompt": "The first part of a science argument is the ___.",
    "acceptedAnswers": [
      "claim"
    ],
    "explanation": "The claim answers the question."
  },
  {
    "id": "science-u06-l03-q05",
    "conceptTag": "structure-evidence",
    "reviewCardId": "science-u06-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which observation is relevant to the plant claim?",
    "choices": [
      {
        "id": "a",
        "text": "The card has green ink"
      },
      {
        "id": "b",
        "text": "The observer likes berries"
      },
      {
        "id": "c",
        "text": "Deep roots reached damp soil"
      },
      {
        "id": "d",
        "text": "The heading has six words"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It names a structure and action."
  },
  {
    "id": "science-u06-l03-q06",
    "conceptTag": "structure-evidence",
    "reviewCardId": "science-u06-l03-c2",
    "type": "true-false",
    "prompt": "A wren’s beak gathering insects is relevant survival evidence.",
    "choices": [
      {
        "id": "true",
        "text": "True — it shows a feeding function"
      },
      {
        "id": "false",
        "text": "False — feeding is unrelated"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Obtaining food supports survival."
  },
  {
    "id": "science-u06-l03-q07",
    "conceptTag": "structure-evidence",
    "reviewCardId": "science-u06-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which detail should be excluded?",
    "choices": [
      {
        "id": "a",
        "text": "Wings carried the wren to cover"
      },
      {
        "id": "b",
        "text": "Feathers protected the body"
      },
      {
        "id": "c",
        "text": "The stem held leaves upright"
      },
      {
        "id": "d",
        "text": "The evidence card had a blue border"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Border color does not show a function."
  },
  {
    "id": "science-u06-l03-q08",
    "conceptTag": "structure-evidence",
    "reviewCardId": "science-u06-l03-c2",
    "type": "multiple-choice",
    "prompt": "Why are two structure observations useful?",
    "choices": [
      {
        "id": "a",
        "text": "They can show how different functions contribute to a system"
      },
      {
        "id": "b",
        "text": "They prove every future outcome"
      },
      {
        "id": "c",
        "text": "They replace reasoning"
      },
      {
        "id": "d",
        "text": "They make cells visible"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Multiple relevant parts support a system claim."
  },
  {
    "id": "science-u06-l03-q09",
    "conceptTag": "structure-argument",
    "reviewCardId": "science-u06-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which reasoning connects roots and leaves?",
    "choices": [
      {
        "id": "a",
        "text": "Both have letters"
      },
      {
        "id": "b",
        "text": "Roots supply water while supported leaves capture sunlight, so their functions cooperate in growth"
      },
      {
        "id": "c",
        "text": "Leaves are above roots"
      },
      {
        "id": "d",
        "text": "All structures are the same"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It explains the functional link."
  },
  {
    "id": "science-u06-l03-q10",
    "conceptTag": "structure-argument",
    "reviewCardId": "science-u06-l03-c3",
    "type": "true-false",
    "prompt": "A list of structures without function reasoning is a complete argument.",
    "choices": [
      {
        "id": "true",
        "text": "True — names alone are enough"
      },
      {
        "id": "false",
        "text": "False — reasoning must connect evidence to the claim"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "An argument needs the link."
  },
  {
    "id": "science-u06-l03-q11",
    "conceptTag": "structure-argument",
    "reviewCardId": "science-u06-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which sentence is reasoning?",
    "choices": [
      {
        "id": "a",
        "text": "The root was visible"
      },
      {
        "id": "b",
        "text": "The stem was upright"
      },
      {
        "id": "c",
        "text": "Access to water and supported leaves helps the plant continue growing"
      },
      {
        "id": "d",
        "text": "The card was read Tuesday"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It connects functions to growth."
  },
  {
    "id": "science-u06-l03-q12",
    "conceptTag": "structure-argument",
    "reviewCardId": "science-u06-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which limit is honest?",
    "choices": [
      {
        "id": "a",
        "text": "The observations prove all plants behave alike"
      },
      {
        "id": "b",
        "text": "The model observed survival"
      },
      {
        "id": "c",
        "text": "The evidence shows internal cell reactions"
      },
      {
        "id": "d",
        "text": "The claim is limited to the supplied structures and observations"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It avoids unsupported generalization."
  },
  {
    "id": "science-u06-l03-q13",
    "conceptTag": "structure-argument",
    "reviewCardId": "science-u06-l03-c3",
    "type": "fill-blank",
    "prompt": "Evidence plus reasoning should support the ___.",
    "acceptedAnswers": [
      "claim"
    ],
    "explanation": "The argument’s parts connect to its claim."
  }
];

const scienceU06L03Lesson: Lesson = {
  ...scienceU06L03Core,
  quiz: { passThreshold: 8, pool: scienceU06L03Questions },
};

export const unit06Lessons: Lesson[] = [
  scienceU06L01Lesson,
  scienceU06L02Lesson,
  scienceU06L03Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u06.test.ts`. Expected: PASS with 3 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u06-l03`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u06.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u06.ts src/content/science/u06.test.ts`, then `git add src/content/science/u06.ts src/content/science/u06.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): argue how structures support survival"`.
### Task 8: Author `science-u06-l04` — Model Sense, Brain, and Response

**Files:** Modify `src/content/science/u06.ts` and `src/content/science/u06.test.ts`.

**Interfaces:** Produces schema-native `scienceU06L04Core`, `scienceU06L04Questions`, and `scienceU06L04Lesson`; appends manifest row 24 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
        "widget": null
      },
      {
        "title": "Route information through the brain",
        "tag": "brain-processing-model",
        "widget": null
      },
      {
        "title": "Connect information to a response",
        "tag": "sense-response-system",
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

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u06.test.ts`. Expected: FAIL because the test expects 4 lesson rows while production exports 3.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU06L04Core = {
  "id": "science-u06-l04",
  "unitId": "science-u06",
  "title": "Model Sense, Brain, and Response",
  "indicatorCodes": [
    "4-LS1-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A wren hears a sudden branch snap and turns toward the sound."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "This event can be modeled as information received through a sense, processed by the brain, and followed by a response."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare different sense inputs and possible responses at the whole-system level."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s trace information through the animal system!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u06-l04-c1",
      "title": "Receive information through senses",
      "blocks": [
        {
          "kind": "text",
          "text": "Animals receive different information through senses: light through sight, sound through hearing, odors through smell, flavors through taste, and contact through touch."
        },
        {
          "kind": "example",
          "text": "In the branch-snap case, hearing receives sound information. The sound is information about an event, not a command that forces one response."
        },
        {
          "kind": "tip",
          "text": "Support: Name the event, then choose the sense that can receive its information."
        }
      ]
    },
    {
      "id": "science-u06-l04-c2",
      "title": "Route information through the brain",
      "blocks": [
        {
          "kind": "text",
          "text": "A system model routes sense information to the brain for processing. It does not describe tiny structures or how information is stored."
        },
        {
          "kind": "example",
          "text": "Sequence so far: branch sound → hearing information → brain processes the information."
        },
        {
          "kind": "tip",
          "text": "Response frame: The ____ sense receives ____. The information goes to the brain, which ____."
        }
      ]
    },
    {
      "id": "science-u06-l04-c3",
      "title": "Connect information to a response",
      "blocks": [
        {
          "kind": "text",
          "text": "After processing, an animal may respond in different ways. The same kind of information can lead to turn, pause, move away, approach, or continue, depending on conditions."
        },
        {
          "kind": "example",
          "text": "The wren might turn toward the snap, pause, or fly to cover. Each is a response after hearing information is processed."
        },
        {
          "kind": "tip",
          "text": "Stretch: Model two different valid responses to the same sense input and explain why the system does not require one automatic outcome."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Model Sense, Brain, and Response",
    "steps": [
      "Identify the branch snap as sound information received through hearing.",
      "Route that information to the brain for processing.",
      "Choose the observable response “the wren turns toward the sound.”",
      "Write the model as sound → hearing → brain processing → turning response and state that other responses are possible."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU06L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u06-l04-q01",
    "conceptTag": "sense-input",
    "reviewCardId": "science-u06-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which sense receives the branch-snap information?",
    "choices": [
      {
        "id": "a",
        "text": "Hearing"
      },
      {
        "id": "b",
        "text": "Taste"
      },
      {
        "id": "c",
        "text": "Smell"
      },
      {
        "id": "d",
        "text": "Touch"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "A snap is sound information."
  },
  {
    "id": "science-u06-l04-q02",
    "conceptTag": "sense-input",
    "reviewCardId": "science-u06-l04-c1",
    "type": "true-false",
    "prompt": "Sight can receive light information.",
    "choices": [
      {
        "id": "true",
        "text": "True — light is received through sight"
      },
      {
        "id": "false",
        "text": "False — sight receives only sound"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Sight handles light information."
  },
  {
    "id": "science-u06-l04-q03",
    "conceptTag": "sense-input",
    "reviewCardId": "science-u06-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which pair is correct?",
    "choices": [
      {
        "id": "a",
        "text": "odor—hearing"
      },
      {
        "id": "b",
        "text": "odor—smell"
      },
      {
        "id": "c",
        "text": "sound—taste"
      },
      {
        "id": "d",
        "text": "contact—sight"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Smell receives odor information."
  },
  {
    "id": "science-u06-l04-q04",
    "conceptTag": "sense-input",
    "reviewCardId": "science-u06-l04-c1",
    "type": "fill-blank",
    "prompt": "The sense that receives sound information is ___.",
    "acceptedAnswers": [
      "hearing"
    ],
    "explanation": "Hearing receives the snap."
  },
  {
    "id": "science-u06-l04-q05",
    "conceptTag": "brain-processing-model",
    "reviewCardId": "science-u06-l04-c2",
    "type": "sort",
    "prompt": "Order the system model before the response.",
    "items": [
      {
        "id": "brain",
        "text": "Brain processes the information"
      },
      {
        "id": "event",
        "text": "A branch makes a sound"
      },
      {
        "id": "sense",
        "text": "Hearing receives sound information"
      }
    ],
    "correctOrder": [
      "event",
      "sense",
      "brain"
    ],
    "explanation": "The event produces information, a sense receives it, and the brain processes it."
  },
  {
    "id": "science-u06-l04-q06",
    "conceptTag": "brain-processing-model",
    "reviewCardId": "science-u06-l04-c2",
    "type": "true-false",
    "prompt": "The model needs details about how the brain stores memories.",
    "choices": [
      {
        "id": "true",
        "text": "True — storage mechanisms are required"
      },
      {
        "id": "false",
        "text": "False — the lesson stays at system level"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Memory mechanisms are outside the boundary."
  },
  {
    "id": "science-u06-l04-q07",
    "conceptTag": "brain-processing-model",
    "reviewCardId": "science-u06-l04-c2",
    "type": "multiple-choice",
    "prompt": "What happens after a sense receives information in this model?",
    "choices": [
      {
        "id": "a",
        "text": "The animal must sleep"
      },
      {
        "id": "b",
        "text": "The information disappears"
      },
      {
        "id": "c",
        "text": "The information is processed by the brain"
      },
      {
        "id": "d",
        "text": "The eye sends light"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Brain processing is the next system part."
  },
  {
    "id": "science-u06-l04-q08",
    "conceptTag": "brain-processing-model",
    "reviewCardId": "science-u06-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which sequence is correct?",
    "choices": [
      {
        "id": "a",
        "text": "brain → branch → hearing"
      },
      {
        "id": "b",
        "text": "response → sense → event"
      },
      {
        "id": "c",
        "text": "hearing → event → brain"
      },
      {
        "id": "d",
        "text": "sound event → hearing → brain processing"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It follows the information path."
  },
  {
    "id": "science-u06-l04-q09",
    "conceptTag": "sense-response-system",
    "reviewCardId": "science-u06-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which is an observable response?",
    "choices": [
      {
        "id": "a",
        "text": "The wren turns toward the sound"
      },
      {
        "id": "b",
        "text": "An information label appears"
      },
      {
        "id": "c",
        "text": "A screen result establishes fear"
      },
      {
        "id": "d",
        "text": "A memory is stored in a named place"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Turning is observable behavior."
  },
  {
    "id": "science-u06-l04-q10",
    "conceptTag": "sense-response-system",
    "reviewCardId": "science-u06-l04-c3",
    "type": "true-false",
    "prompt": "The same sound information can be followed by more than one possible response.",
    "choices": [
      {
        "id": "true",
        "text": "True — the animal may turn, pause, or move"
      },
      {
        "id": "false",
        "text": "False — one sound forces one action"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Responses can differ."
  },
  {
    "id": "science-u06-l04-q11",
    "conceptTag": "sense-response-system",
    "reviewCardId": "science-u06-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which complete model is correct?",
    "choices": [
      {
        "id": "a",
        "text": "light → ear → exact response"
      },
      {
        "id": "b",
        "text": "sound → hearing → brain processing → turning"
      },
      {
        "id": "c",
        "text": "odor → wing → memory storage"
      },
      {
        "id": "d",
        "text": "touch → lamp → eye"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It includes input, sense, brain, and response."
  },
  {
    "id": "science-u06-l04-q12",
    "conceptTag": "sense-response-system",
    "reviewCardId": "science-u06-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which statement stays within the boundary?",
    "choices": [
      {
        "id": "a",
        "text": "Name a tiny receptor mechanism"
      },
      {
        "id": "b",
        "text": "Explain where memory is stored"
      },
      {
        "id": "c",
        "text": "The brain processes sense information before a response"
      },
      {
        "id": "d",
        "text": "Describe cells in the eye"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It is a system-level explanation."
  },
  {
    "id": "science-u06-l04-q13",
    "conceptTag": "sense-response-system",
    "reviewCardId": "science-u06-l04-c3",
    "type": "fill-blank",
    "prompt": "After information is processed, the animal may make a ___.",
    "acceptedAnswers": [
      "response"
    ],
    "explanation": "A response is the final system part."
  }
];

const scienceU06L04Lesson: Lesson = {
  ...scienceU06L04Core,
  quiz: { passThreshold: 8, pool: scienceU06L04Questions },
};

export const unit06Lessons: Lesson[] = [
  scienceU06L01Lesson,
  scienceU06L02Lesson,
  scienceU06L03Lesson,
  scienceU06L04Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u06.test.ts`. Expected: PASS with 4 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u06-l04`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u06.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u06.ts src/content/science/u06.test.ts`, then `git add src/content/science/u06.ts src/content/science/u06.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): model sense brain and response"`.

## Wave verification and handoff

- [ ] Run focused tests for both owned units, `src/content/schema.test.ts`, `src/content/content-validation.test.ts`, `src/content/answer-normalization.test.ts`, and the master lesson-quality test when present; then run `npx tsc -b --pretty false`, `npm run build`, and `git diff --check`.
- [ ] Count exactly 8 lessons, 24 cards, 104 questions, 24 exact concept-tag/review targets, and 24 immediate canonical review steps in this wave.
- [ ] Run placeholder, prohibited-boundary, false-evidence, directly-visible-energy, widget-name/config, answer-normalization, and review-mapping scans. Require no finding.
- [ ] Request independent scoped review. Do not register units here; hand accepted exports to Plan C master Task C5.
