# Cram All Plan C3b: Science Units 3–4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the frozen Waves, Light, and Information Transfer wave as 8 lessons, 24 cards, and 104 questions.

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

- `4-PS4-1`: use qualitative repeating-wave models, amplitude, wavelength, and object motion only. Do not assess wave interference, non-periodic waves, or numerical measurement. A frequency control is never called a wavelength control.
- `4-PS4-2`: trace source light to an object, reflected light into an eye, and the resulting ability to see. Stop at light entering the eye; do not assess color-specific reflection or later eye mechanisms.
- `4-PS4-3`: every code uses exactly two signal values. Solutions may be non-electronic and are compared for accuracy, clarity, and efficiency without a live sender, receiver, partner, recording, or voice scoring.

## Preflight

- [ ] Run `git status --short`, `git diff --stat`, `git log -8 --oneline`, and read both execution ledgers; preserve every unrelated or concurrent change.
- [ ] Re-read the design spec, Plan C master, Science blueprint, applicable verbatim standards, `src/content/schema.ts`, `src/content/answer-normalization.ts`, `src/quiz/engine.ts`, widget registry/components, and current Unit 1 source/test when this wave touches Unit 1.
- [ ] Run `npm test && npx tsc -b --pretty false && npm run build`; stop and record any failure before editing.

---

## Unit 3 lesson tasks

### Task 1: Author `science-u03-l01` — Model Wave Amplitude Patterns

**Files:** Create `src/content/science/u03.ts` and `src/content/science/u03.test.ts`.

**Interfaces:** Produces schema-native `scienceU03L01Core`, `scienceU03L01Questions`, and `scienceU03L01Lesson`; appends manifest row 9 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Create this exact focused test file:

```ts
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
        "widget": null
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u03.test.ts`. Expected: FAIL because `./u03` does not exist.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Create the source file with

```ts
import type { Lesson } from '../schema';

const scienceU03L01Core = {
  "id": "science-u03-l01",
  "unitId": "science-u03",
  "title": "Model Wave Amplitude Patterns",
  "indicatorCodes": [
    "4-PS4-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A rope moved up and down makes a repeating shape that travels along it."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "How can we describe a taller or shorter wave pattern without measuring it?"
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare displacement from a baseline and explain what a wave model can and cannot represent."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s look for a repeating amplitude pattern!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u03-l01-c1",
      "title": "Recognize a repeating wave",
      "blocks": [
        {
          "kind": "text",
          "text": "A repeating wave model has a pattern that returns: crest, baseline, trough, baseline, then repeats."
        },
        {
          "kind": "example",
          "text": "On a rope diagram, each crest is above the baseline and each trough is below it. Matching parts recur in order."
        },
        {
          "kind": "tip",
          "text": "Support: Trace one complete pattern with your finger: crest → baseline → trough → baseline."
        }
      ]
    },
    {
      "id": "science-u03-l01-c2",
      "title": "Compare small and large amplitude",
      "blocks": [
        {
          "kind": "text",
          "text": "Amplitude describes the greatest displacement from the baseline. A larger amplitude wave is drawn with crests and troughs farther from the baseline."
        },
        {
          "kind": "example",
          "text": "Two rope models have the same spacing. Model B has taller crests and deeper troughs, so Model B has larger amplitude."
        },
        {
          "kind": "tip",
          "text": "Response frame: Wave ____ has larger amplitude because its crest and trough are ____ from the baseline."
        }
      ],
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
      "id": "science-u03-l01-c3",
      "title": "Explain what the model represents",
      "blocks": [
        {
          "kind": "text",
          "text": "A graph or rope sketch represents a repeating pattern. It is not a photograph of every wave and does not collect evidence from a physical rope."
        },
        {
          "kind": "example",
          "text": "Changing the amplitude control changes vertical displacement in the authored graph. It does not measure a real rope or show an exact distance."
        },
        {
          "kind": "tip",
          "text": "Stretch: State one pattern the model represents and one limitation, using “represents” and “does not measure.”"
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Model Wave Amplitude Patterns",
    "steps": [
      "Locate the baseline on two repeating rope-wave diagrams.",
      "Compare the greatest upward and downward displacement while keeping the spacing pattern alike.",
      "Identify the diagram with crests and troughs farther from the baseline as the larger-amplitude model.",
      "Explain that this is a qualitative representation, not a measurement or physical observation."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Append:

```ts
const scienceU03L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u03-l01-q01",
    "conceptTag": "repeating-wave-model",
    "reviewCardId": "science-u03-l01-c1",
    "type": "multiple-choice",
    "prompt": "Which sequence shows one repeating wave pattern?",
    "choices": [
      {
        "id": "a",
        "text": "crest, baseline, trough, baseline"
      },
      {
        "id": "b",
        "text": "crest, crest, label, stop"
      },
      {
        "id": "c",
        "text": "baseline, color, number, crest"
      },
      {
        "id": "d",
        "text": "trough, title, title, arrow"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The four parts form one repeating cycle."
  },
  {
    "id": "science-u03-l01-q02",
    "conceptTag": "repeating-wave-model",
    "reviewCardId": "science-u03-l01-c1",
    "type": "true-false",
    "prompt": "Matching crests recur in a repeating wave model.",
    "choices": [
      {
        "id": "true",
        "text": "True — matching parts repeat"
      },
      {
        "id": "false",
        "text": "False — no part repeats"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A repeating pattern returns to matching points."
  },
  {
    "id": "science-u03-l01-q03",
    "conceptTag": "repeating-wave-model",
    "reviewCardId": "science-u03-l01-c1",
    "type": "multiple-choice",
    "prompt": "What is the reference line halfway between crest and trough?",
    "choices": [
      {
        "id": "a",
        "text": "The label"
      },
      {
        "id": "b",
        "text": "The baseline"
      },
      {
        "id": "c",
        "text": "The receiver"
      },
      {
        "id": "d",
        "text": "The code"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Amplitude is compared from the baseline."
  },
  {
    "id": "science-u03-l01-q04",
    "conceptTag": "repeating-wave-model",
    "reviewCardId": "science-u03-l01-c1",
    "type": "multiple-choice",
    "prompt": "Which feature best identifies a repeating pattern?",
    "choices": [
      {
        "id": "a",
        "text": "Its color changes once"
      },
      {
        "id": "b",
        "text": "It has one isolated bump"
      },
      {
        "id": "c",
        "text": "The same sequence of parts returns"
      },
      {
        "id": "d",
        "text": "It contains an exact energy value"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Repeated order defines the pattern."
  },
  {
    "id": "science-u03-l01-q05",
    "conceptTag": "amplitude-pattern",
    "reviewCardId": "science-u03-l01-c2",
    "type": "multiple-choice",
    "prompt": "Wave A has crests and troughs close to the baseline. Wave B has crests and troughs farther from the same baseline. Which wave has larger amplitude?",
    "choices": [
      {
        "id": "a",
        "text": "The one with more labels"
      },
      {
        "id": "b",
        "text": "The one drawn first"
      },
      {
        "id": "c",
        "text": "The one with closer crests only"
      },
      {
        "id": "d",
        "text": "The one with crests and troughs farther from the baseline"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Greater displacement from baseline means larger amplitude."
  },
  {
    "id": "science-u03-l01-q06",
    "conceptTag": "amplitude-pattern",
    "reviewCardId": "science-u03-l01-c2",
    "type": "true-false",
    "prompt": "Amplitude is compared by looking at displacement from the baseline.",
    "choices": [
      {
        "id": "true",
        "text": "True — baseline displacement is the comparison"
      },
      {
        "id": "false",
        "text": "False — count only the labels"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Amplitude concerns displacement."
  },
  {
    "id": "science-u03-l01-q07",
    "conceptTag": "amplitude-pattern",
    "reviewCardId": "science-u03-l01-c2",
    "type": "multiple-choice",
    "prompt": "Two models have the same spacing; Wave A is shorter vertically. Which has smaller amplitude?",
    "choices": [
      {
        "id": "a",
        "text": "Wave A"
      },
      {
        "id": "b",
        "text": "Wave B"
      },
      {
        "id": "c",
        "text": "Both must be exact equals"
      },
      {
        "id": "d",
        "text": "Neither can be compared qualitatively"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Wave A has less displacement."
  },
  {
    "id": "science-u03-l01-q08",
    "conceptTag": "amplitude-pattern",
    "reviewCardId": "science-u03-l01-c2",
    "type": "multiple-choice",
    "prompt": "What does increasing the amplitude control change?",
    "choices": [
      {
        "id": "a",
        "text": "The code alphabet"
      },
      {
        "id": "b",
        "text": "The graph’s vertical displacement"
      },
      {
        "id": "c",
        "text": "The number of receivers"
      },
      {
        "id": "d",
        "text": "The light path"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The widget labels amplitude as vertical displacement."
  },
  {
    "id": "science-u03-l01-q09",
    "conceptTag": "wave-model-limits",
    "reviewCardId": "science-u03-l01-c3",
    "type": "multiple-choice",
    "prompt": "An app activity shows an authored wave graph and lets a learner change its amplitude. It does not measure a physical rope. Which statement accurately describes the activity?",
    "choices": [
      {
        "id": "a",
        "text": "It measured a physical rope"
      },
      {
        "id": "b",
        "text": "It proved every water wave"
      },
      {
        "id": "c",
        "text": "It is an authored model of a qualitative pattern"
      },
      {
        "id": "d",
        "text": "It observed energy directly"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It represents a pattern."
  },
  {
    "id": "science-u03-l01-q10",
    "conceptTag": "wave-model-limits",
    "reviewCardId": "science-u03-l01-c3",
    "type": "true-false",
    "prompt": "A larger drawn amplitude is an exact measurement of a real wave.",
    "choices": [
      {
        "id": "true",
        "text": "True — the graph measures a real wave"
      },
      {
        "id": "false",
        "text": "False — it is a qualitative authored value"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The graph does not collect a physical measurement."
  },
  {
    "id": "science-u03-l01-q11",
    "conceptTag": "wave-model-limits",
    "reviewCardId": "science-u03-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which is a model limitation?",
    "choices": [
      {
        "id": "a",
        "text": "It has a baseline"
      },
      {
        "id": "b",
        "text": "It displays a wave curve"
      },
      {
        "id": "c",
        "text": "It allows amplitude changes"
      },
      {
        "id": "d",
        "text": "It does not observe or measure a real rope"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "That limitation keeps the evidence claim honest."
  },
  {
    "id": "science-u03-l01-q12",
    "conceptTag": "wave-model-limits",
    "reviewCardId": "science-u03-l01-c3",
    "type": "fill-blank",
    "prompt": "The greatest displacement is compared from the ___.",
    "acceptedAnswers": [
      "baseline"
    ],
    "explanation": "Amplitude is described from the baseline."
  },
  {
    "id": "science-u03-l01-q13",
    "conceptTag": "wave-model-limits",
    "reviewCardId": "science-u03-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which explanation is best?",
    "choices": [
      {
        "id": "a",
        "text": "The graph represents a repeating amplitude pattern but does not measure a physical wave"
      },
      {
        "id": "b",
        "text": "The graph proves a rope moved"
      },
      {
        "id": "c",
        "text": "The graph makes energy visible"
      },
      {
        "id": "d",
        "text": "The graph shows every wave exactly"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It states both representation and limit."
  }
];

const scienceU03L01Lesson: Lesson = {
  ...scienceU03L01Core,
  quiz: { passThreshold: 8, pool: scienceU03L01Questions },
};

export const unit03Lessons: Lesson[] = [
  scienceU03L01Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u03.test.ts`. Expected: PASS with 1 lesson row, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u03-l01`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u03.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u03.ts src/content/science/u03.test.ts`, then `git add src/content/science/u03.ts src/content/science/u03.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): start science waves unit"`.
### Task 2: Author `science-u03-l02` — Describe Wavelength Patterns

**Files:** Modify `src/content/science/u03.ts` and `src/content/science/u03.test.ts`.

**Interfaces:** Produces schema-native `scienceU03L02Core`, `scienceU03L02Questions`, and `scienceU03L02Lesson`; appends manifest row 10 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
        "widget": null
      },
      {
        "title": "Compare shorter and longer wavelengths",
        "tag": "wavelength-comparison",
        "widget": null
      },
      {
        "title": "Use a qualitative wave model",
        "tag": "wavelength-model-boundary",
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

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u03.test.ts`. Expected: FAIL because the test expects 2 lesson rows while production exports 1.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU03L02Core = {
  "id": "science-u03-l02",
  "unitId": "science-u03",
  "title": "Describe Wavelength Patterns",
  "indicatorCodes": [
    "4-PS4-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Two repeating rope-wave drawings have crests spaced differently."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Wavelength compares the distance between matching points on neighboring waves."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will use words such as shorter and longer and avoid turning a frequency control into a wavelength tool."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s compare matching points carefully!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u03-l02-c1",
      "title": "Find matching points on waves",
      "blocks": [
        {
          "kind": "text",
          "text": "Wavelength is compared from one point on a wave to the next matching point, such as crest to crest or trough to trough."
        },
        {
          "kind": "example",
          "text": "Measure the pattern conceptually from crest 1 to crest 2, not from a crest to the nearby trough."
        },
        {
          "kind": "tip",
          "text": "Support: Circle two neighboring crests, then draw one horizontal arrow between them."
        }
      ]
    },
    {
      "id": "science-u03-l02-c2",
      "title": "Compare shorter and longer wavelengths",
      "blocks": [
        {
          "kind": "text",
          "text": "When matching crests are closer together, the wavelength is shorter. When matching crests are farther apart, the wavelength is longer."
        },
        {
          "kind": "example",
          "text": "Diagram A fits more complete waves across the same strip than Diagram B. Its neighboring crests are closer, so A has shorter wavelength."
        },
        {
          "kind": "tip",
          "text": "Response frame: Wave ____ has a ____ wavelength because its matching ____ are closer/farther apart."
        }
      ]
    },
    {
      "id": "science-u03-l02-c3",
      "title": "Use a qualitative wave model",
      "blocks": [
        {
          "kind": "text",
          "text": "A wavelength model can be a diagram, rope, wire, or string. Grade 4 comparisons use patterns rather than exact numerical distances."
        },
        {
          "kind": "example",
          "text": "A control labeled frequency changes the number of cycles across a fixed graph; it is not an authored wavelength control and is omitted from this card."
        },
        {
          "kind": "tip",
          "text": "Stretch: Compare two drawings by matching points, then name why the comparison is qualitative rather than numerical."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Describe Wavelength Patterns",
    "steps": [
      "Mark two neighboring crests on each of two wave drawings.",
      "Compare the crest-to-crest spacing across strips of equal width.",
      "Call the closer spacing shorter wavelength and the farther spacing longer wavelength.",
      "State that the diagrams model a pattern and do not supply exact wavelength measurements."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU03L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u03-l02-q01",
    "conceptTag": "wavelength-reference-points",
    "reviewCardId": "science-u03-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which points should be compared for one wavelength?",
    "choices": [
      {
        "id": "a",
        "text": "One crest and the next crest"
      },
      {
        "id": "b",
        "text": "A crest and the nearby trough"
      },
      {
        "id": "c",
        "text": "The title and baseline"
      },
      {
        "id": "d",
        "text": "Two unrelated labels"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Wavelength uses matching neighboring points."
  },
  {
    "id": "science-u03-l02-q02",
    "conceptTag": "wavelength-reference-points",
    "reviewCardId": "science-u03-l02-c1",
    "type": "true-false",
    "prompt": "Trough-to-trough spacing can represent wavelength.",
    "choices": [
      {
        "id": "true",
        "text": "True — troughs are matching points"
      },
      {
        "id": "false",
        "text": "False — only colors can match"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Neighboring troughs are matching points."
  },
  {
    "id": "science-u03-l02-q03",
    "conceptTag": "wavelength-reference-points",
    "reviewCardId": "science-u03-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which comparison is not a wavelength?",
    "choices": [
      {
        "id": "a",
        "text": "crest to next crest"
      },
      {
        "id": "b",
        "text": "crest to nearby trough"
      },
      {
        "id": "c",
        "text": "trough to next trough"
      },
      {
        "id": "d",
        "text": "matching baseline crossing to the next same-direction crossing"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Crest and trough are different parts."
  },
  {
    "id": "science-u03-l02-q04",
    "conceptTag": "wavelength-reference-points",
    "reviewCardId": "science-u03-l02-c1",
    "type": "fill-blank",
    "prompt": "Wavelength can be compared from crest to ___.",
    "acceptedAnswers": [
      "crest",
      "the next crest"
    ],
    "explanation": "Neighboring crests are matching points."
  },
  {
    "id": "science-u03-l02-q05",
    "conceptTag": "wavelength-comparison",
    "reviewCardId": "science-u03-l02-c2",
    "type": "multiple-choice",
    "prompt": "Drawing A has neighboring crests closer together than Drawing B. Which drawing has shorter wavelength?",
    "choices": [
      {
        "id": "a",
        "text": "The one with brighter ink"
      },
      {
        "id": "b",
        "text": "The one with taller crests only"
      },
      {
        "id": "c",
        "text": "The one with neighboring crests closer together"
      },
      {
        "id": "d",
        "text": "The one with fewer labels"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Closer matching points mean shorter wavelength."
  },
  {
    "id": "science-u03-l02-q06",
    "conceptTag": "wavelength-comparison",
    "reviewCardId": "science-u03-l02-c2",
    "type": "true-false",
    "prompt": "Farther-apart neighboring crests indicate a longer wavelength.",
    "choices": [
      {
        "id": "true",
        "text": "True — the matching-point spacing is longer"
      },
      {
        "id": "false",
        "text": "False — farther means shorter"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Wavelength is the spacing between matching points."
  },
  {
    "id": "science-u03-l02-q07",
    "conceptTag": "wavelength-comparison",
    "reviewCardId": "science-u03-l02-c2",
    "type": "multiple-choice",
    "prompt": "Two strips have equal width. Strip B fits fewer complete waves. What is likely true?",
    "choices": [
      {
        "id": "a",
        "text": "B has no pattern"
      },
      {
        "id": "b",
        "text": "B has smaller amplitude for certain"
      },
      {
        "id": "c",
        "text": "B must be sound"
      },
      {
        "id": "d",
        "text": "B has longer wavelength"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Fewer cycles over the same width means matching points are farther apart."
  },
  {
    "id": "science-u03-l02-q08",
    "conceptTag": "wavelength-comparison",
    "reviewCardId": "science-u03-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which statement compares wavelength without a number?",
    "choices": [
      {
        "id": "a",
        "text": "Wave A has a shorter crest-to-crest spacing than Wave B"
      },
      {
        "id": "b",
        "text": "Wave A is exactly 2.4 units"
      },
      {
        "id": "c",
        "text": "Wave B has 9 energy units"
      },
      {
        "id": "d",
        "text": "Wave A proves the rope length"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Shorter is a qualitative comparison."
  },
  {
    "id": "science-u03-l02-q09",
    "conceptTag": "wavelength-model-boundary",
    "reviewCardId": "science-u03-l02-c3",
    "type": "multiple-choice",
    "prompt": "The available wave-maker has controls labeled amplitude and frequency, but no control labeled wavelength. Why is it not used to compare wavelength on this card?",
    "choices": [
      {
        "id": "a",
        "text": "Wave models are forbidden"
      },
      {
        "id": "b",
        "text": "Its control is labeled frequency, not wavelength"
      },
      {
        "id": "c",
        "text": "Wavelength has no pattern"
      },
      {
        "id": "d",
        "text": "Widgets always provide evidence"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The contract does not provide a direct wavelength control."
  },
  {
    "id": "science-u03-l02-q10",
    "conceptTag": "wavelength-model-boundary",
    "reviewCardId": "science-u03-l02-c3",
    "type": "true-false",
    "prompt": "A Grade 4 wavelength model must include an exact measurement.",
    "choices": [
      {
        "id": "true",
        "text": "True — a number is required"
      },
      {
        "id": "false",
        "text": "False — qualitative pattern comparisons are sufficient"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The standard excludes quantitative models."
  },
  {
    "id": "science-u03-l02-q11",
    "conceptTag": "wavelength-model-boundary",
    "reviewCardId": "science-u03-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which material can model wavelength patterns?",
    "choices": [
      {
        "id": "a",
        "text": "A calculator answer only"
      },
      {
        "id": "b",
        "text": "A color name"
      },
      {
        "id": "c",
        "text": "A rope drawing with repeated crests"
      },
      {
        "id": "d",
        "text": "An unrelated battery label"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "A rope diagram can represent matching-point spacing."
  },
  {
    "id": "science-u03-l02-q12",
    "conceptTag": "wavelength-model-boundary",
    "reviewCardId": "science-u03-l02-c3",
    "type": "multiple-choice",
    "prompt": "Grade 4 wavelength comparisons are qualitative and do not use exact numerical measurements. Which explanation stays within this boundary?",
    "choices": [
      {
        "id": "a",
        "text": "The wavelength equals a calculated decimal"
      },
      {
        "id": "b",
        "text": "The graph proves a physical result"
      },
      {
        "id": "c",
        "text": "Every wave has the same spacing"
      },
      {
        "id": "d",
        "text": "The model with farther-apart crests has a longer qualitative wavelength"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It compares a visible pattern without measuring."
  },
  {
    "id": "science-u03-l02-q13",
    "conceptTag": "wavelength-model-boundary",
    "reviewCardId": "science-u03-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which statement names a limitation?",
    "choices": [
      {
        "id": "a",
        "text": "The drawing represents spacing but does not measure a real wave"
      },
      {
        "id": "b",
        "text": "The drawing is direct evidence from the ocean"
      },
      {
        "id": "c",
        "text": "The frequency button is a wavelength meter"
      },
      {
        "id": "d",
        "text": "The wave’s exact size is visible"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The drawing is a representation, not a physical measurement."
  }
];

const scienceU03L02Lesson: Lesson = {
  ...scienceU03L02Core,
  quiz: { passThreshold: 8, pool: scienceU03L02Questions },
};

export const unit03Lessons: Lesson[] = [
  scienceU03L01Lesson,
  scienceU03L02Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u03.test.ts`. Expected: PASS with 2 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u03-l02`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u03.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u03.ts src/content/science/u03.test.ts`, then `git add src/content/science/u03.ts src/content/science/u03.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): teach wavelength patterns"`.
### Task 3: Author `science-u03-l03` — Model Waves Moving Objects

**Files:** Modify `src/content/science/u03.ts` and `src/content/science/u03.test.ts`.

**Interfaces:** Produces schema-native `scienceU03L03Core`, `scienceU03L03Questions`, and `scienceU03L03Lesson`; appends manifest row 11 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
  {
    "id": "science-u03-l03",
    "title": "Model Waves Moving Objects",
    "indicatorCodes": [
      "4-PS4-1"
    ],
    "cards": [
      {
        "title": "Observe an object at the surface",
        "tag": "wave-object-observation",
        "widget": null
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

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u03.test.ts`. Expected: FAIL because the test expects 3 lesson rows while production exports 2.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU03L03Core = {
  "id": "science-u03-l03",
  "unitId": "science-u03",
  "title": "Model Waves Moving Objects",
  "indicatorCodes": [
    "4-PS4-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A floating cork rises and falls as water waves pass."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Its motion is an observable effect that a wave can cause an object to move."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare before-and-during observations with a simplified water-wave model."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s track the cork without claiming the water carries it across the whole tray!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u03-l03-c1",
      "title": "Observe an object at the surface",
      "blocks": [
        {
          "kind": "text",
          "text": "Before waves begin, a cork may rest near one mark. As waves pass, it can bob up and down or move slightly back and forth. Record that motion directly."
        },
        {
          "kind": "example",
          "text": "Written observation: the cork was nearly still before the tray edge was tapped; while repeating ripples passed, it bobbed up and down near the same mark."
        },
        {
          "kind": "tip",
          "text": "Support: Use the frame Before waves, ____. During waves, ____."
        }
      ]
    },
    {
      "id": "science-u03-l03-c2",
      "title": "Model motion caused by waves",
      "blocks": [
        {
          "kind": "text",
          "text": "A water-wave model can change amplitude and cycle pattern while showing a qualitative curve. It predicts patterns; it does not observe a cork."
        },
        {
          "kind": "example",
          "text": "A larger modeled amplitude shows greater vertical displacement, so predict a more noticeable up-and-down response for a floating object, all else kept alike."
        },
        {
          "kind": "tip",
          "text": "Response frame: When modeled amplitude changes from ____ to ____, I predict the object will ____."
        }
      ],
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
      "id": "science-u03-l03-c3",
      "title": "Connect patterns without overclaiming",
      "blocks": [
        {
          "kind": "text",
          "text": "Use the physical written observation as evidence and the diagram as a way to explain or predict. Do not claim that the screen result proves the tray result."
        },
        {
          "kind": "example",
          "text": "The cork’s bobbing supports the claim that waves can cause objects to move. Remaining near one mark shows that the cork need not travel with the wave across the tray."
        },
        {
          "kind": "tip",
          "text": "Stretch: State a claim, cite the before-and-during cork observation, and name one model limitation."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Model Waves Moving Objects",
    "steps": [
      "Before ripples, the cork is nearly still near a tape mark.",
      "During repeating ripples, the cork bobs up and down near that mark.",
      "Use the motion change as evidence that waves can cause an object to move.",
      "Use the graph only to model a possible pattern and acknowledge that it did not observe the cork."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU03L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u03-l03-q01",
    "conceptTag": "wave-object-observation",
    "reviewCardId": "science-u03-l03-c1",
    "type": "multiple-choice",
    "prompt": "A cork was nearly still near a tape mark before repeating ripples. While ripples passed, it bobbed up and down near the same mark. Which is an observable change?",
    "choices": [
      {
        "id": "a",
        "text": "The cork begins bobbing as ripples pass"
      },
      {
        "id": "b",
        "text": "An energy label appears"
      },
      {
        "id": "c",
        "text": "A screen result counts as physical motion evidence"
      },
      {
        "id": "d",
        "text": "The tray chooses a pattern"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Bobbing is an observable motion."
  },
  {
    "id": "science-u03-l03-q02",
    "conceptTag": "wave-object-observation",
    "reviewCardId": "science-u03-l03-c1",
    "type": "true-false",
    "prompt": "A before-and-during comparison helps identify wave-caused motion.",
    "choices": [
      {
        "id": "true",
        "text": "True — it compares the object’s motion"
      },
      {
        "id": "false",
        "text": "False — comparisons hide motion"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The comparison records a change."
  },
  {
    "id": "science-u03-l03-q03",
    "conceptTag": "wave-object-observation",
    "reviewCardId": "science-u03-l03-c1",
    "type": "multiple-choice",
    "prompt": "A cork was nearly still near a tape mark before repeating ripples. While ripples passed, it bobbed up and down near the same mark. Where did the cork remain?",
    "choices": [
      {
        "id": "a",
        "text": "At the tray bottom"
      },
      {
        "id": "b",
        "text": "Near the same tape mark"
      },
      {
        "id": "c",
        "text": "Inside the wave graph"
      },
      {
        "id": "d",
        "text": "At an exact measured speed"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The case says it bobs near the mark."
  },
  {
    "id": "science-u03-l03-q04",
    "conceptTag": "wave-object-observation",
    "reviewCardId": "science-u03-l03-c1",
    "type": "multiple-choice",
    "prompt": "A learner needs evidence for the claim that waves can cause objects to move. Which note is most relevant?",
    "choices": [
      {
        "id": "a",
        "text": "The cork is brown"
      },
      {
        "id": "b",
        "text": "The tray is rectangular"
      },
      {
        "id": "c",
        "text": "The cork was still, then bobbed during ripples"
      },
      {
        "id": "d",
        "text": "The observer likes water"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It describes motion before and during waves."
  },
  {
    "id": "science-u03-l03-q05",
    "conceptTag": "wave-caused-motion",
    "reviewCardId": "science-u03-l03-c2",
    "type": "multiple-choice",
    "prompt": "An app water-wave activity changes authored amplitude and cycle controls on a graph; it does not observe or measure a physical tray or cork. What does the activity provide?",
    "choices": [
      {
        "id": "a",
        "text": "A measurement from a real tray"
      },
      {
        "id": "b",
        "text": "Proof about every cork"
      },
      {
        "id": "c",
        "text": "Physical evidence"
      },
      {
        "id": "d",
        "text": "A simplified model for trying a pattern"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The widget models a possible pattern."
  },
  {
    "id": "science-u03-l03-q06",
    "conceptTag": "wave-caused-motion",
    "reviewCardId": "science-u03-l03-c2",
    "type": "true-false",
    "prompt": "Changing the model does not itself observe a floating object.",
    "choices": [
      {
        "id": "true",
        "text": "True — the screen is not a physical observation"
      },
      {
        "id": "false",
        "text": "False — it measures a cork automatically"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The model contains no real cork measurement."
  },
  {
    "id": "science-u03-l03-q07",
    "conceptTag": "wave-caused-motion",
    "reviewCardId": "science-u03-l03-c2",
    "type": "multiple-choice",
    "prompt": "What prediction fits a larger modeled amplitude, all else alike?",
    "choices": [
      {
        "id": "a",
        "text": "A more noticeable up-and-down object response"
      },
      {
        "id": "b",
        "text": "No object motion is possible"
      },
      {
        "id": "c",
        "text": "The cork must change color"
      },
      {
        "id": "d",
        "text": "An exact motion amount is known"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Larger displacement supports a qualitative prediction."
  },
  {
    "id": "science-u03-l03-q08",
    "conceptTag": "wave-caused-motion",
    "reviewCardId": "science-u03-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which variable should stay the same in a fair amplitude comparison?",
    "choices": [
      {
        "id": "a",
        "text": "The conclusion"
      },
      {
        "id": "b",
        "text": "The floating object and setup"
      },
      {
        "id": "c",
        "text": "The answer key"
      },
      {
        "id": "d",
        "text": "Every wave feature must change"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Holding setup and object constant focuses on amplitude."
  },
  {
    "id": "science-u03-l03-q09",
    "conceptTag": "wave-motion-model-limits",
    "reviewCardId": "science-u03-l03-c3",
    "type": "multiple-choice",
    "prompt": "A cork was nearly still near a tape mark before repeating ripples. While ripples passed, it bobbed up and down near the same mark. Which claim is supported by this written observation?",
    "choices": [
      {
        "id": "a",
        "text": "Waves always carry objects across a tray"
      },
      {
        "id": "b",
        "text": "The graph measured the cork"
      },
      {
        "id": "c",
        "text": "Waves can cause objects to move"
      },
      {
        "id": "d",
        "text": "Energy was directly seen"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The cork’s bobbing supports object motion."
  },
  {
    "id": "science-u03-l03-q10",
    "conceptTag": "wave-motion-model-limits",
    "reviewCardId": "science-u03-l03-c3",
    "type": "true-false",
    "prompt": "The cork must travel across the tray for waves to cause it to move.",
    "choices": [
      {
        "id": "true",
        "text": "True — only travel counts"
      },
      {
        "id": "false",
        "text": "False — bobbing is motion"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Up-and-down motion is still motion."
  },
  {
    "id": "science-u03-l03-q11",
    "conceptTag": "wave-motion-model-limits",
    "reviewCardId": "science-u03-l03-c3",
    "type": "multiple-choice",
    "prompt": "Claim: Waves can cause objects to move. A cork was nearly still before ripples and bobbed as they passed. Which evidence should support the claim?",
    "choices": [
      {
        "id": "a",
        "text": "The model target turned complete"
      },
      {
        "id": "b",
        "text": "The graph has a blue line"
      },
      {
        "id": "c",
        "text": "The word wave appears"
      },
      {
        "id": "d",
        "text": "The cork changed from nearly still to bobbing"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "That physical written observation is relevant evidence."
  },
  {
    "id": "science-u03-l03-q12",
    "conceptTag": "wave-motion-model-limits",
    "reviewCardId": "science-u03-l03-c3",
    "type": "fill-blank",
    "prompt": "The cork moved up and down, or ___.",
    "acceptedAnswers": [
      "bobbed"
    ],
    "explanation": "Bobbing names the observed motion."
  },
  {
    "id": "science-u03-l03-q13",
    "conceptTag": "wave-motion-model-limits",
    "reviewCardId": "science-u03-l03-c3",
    "type": "multiple-choice",
    "prompt": "A written observation says a cork was nearly still before ripples and bobbed as they passed. An app graph changes authored values but does not observe the cork. Which explanation avoids overclaiming?",
    "choices": [
      {
        "id": "a",
        "text": "The cork observation supports motion; the graph only models a possible pattern"
      },
      {
        "id": "b",
        "text": "Finishing the graph guarantees the cork moved"
      },
      {
        "id": "c",
        "text": "The moving screen is physical evidence"
      },
      {
        "id": "d",
        "text": "The cork revealed an exact energy amount"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It separates evidence from representation."
  }
];

const scienceU03L03Lesson: Lesson = {
  ...scienceU03L03Core,
  quiz: { passThreshold: 8, pool: scienceU03L03Questions },
};

export const unit03Lessons: Lesson[] = [
  scienceU03L01Lesson,
  scienceU03L02Lesson,
  scienceU03L03Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u03.test.ts`. Expected: PASS with 3 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u03-l03`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u03.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u03.ts src/content/science/u03.test.ts`, then `git add src/content/science/u03.ts src/content/science/u03.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): model amplitude effects on objects"`.
### Task 4: Author `science-u03-l04` — Model Reflected Light Entering the Eye

**Files:** Modify `src/content/science/u03.ts` and `src/content/science/u03.test.ts`.

**Interfaces:** Produces schema-native `scienceU03L04Core`, `scienceU03L04Questions`, and `scienceU03L04Lesson`; appends manifest row 12 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
  {
    "id": "science-u03-l04",
    "title": "Model Reflected Light Entering the Eye",
    "indicatorCodes": [
      "4-PS4-2"
    ],
    "cards": [
      {
        "title": "Trace light to an object",
        "tag": "light-to-object",
        "widget": null
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
  },
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u03.test.ts`. Expected: FAIL because the test expects 4 lesson rows while production exports 3.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU03L04Core = {
  "id": "science-u03-l04",
  "unitId": "science-u03",
  "title": "Model Reflected Light Entering the Eye",
  "indicatorCodes": [
    "4-PS4-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A book is visible when light reaches it, reflects, and then enters an eye."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "The eye does not send out the light used to see the book."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will trace a cause-and-effect path with arrows and stop at the eye."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s build the complete light path!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u03-l04-c1",
      "title": "Trace light to an object",
      "blocks": [
        {
          "kind": "text",
          "text": "Seeing begins with light from a source traveling to an object. Without light reaching the object, there is no reflected light from it to enter the eye."
        },
        {
          "kind": "example",
          "text": "A lamp shines on a book. First trace lamp → light → book."
        },
        {
          "kind": "tip",
          "text": "Support: Point first to the light source and then to the object it illuminates."
        }
      ]
    },
    {
      "id": "science-u03-l04-c2",
      "title": "Trace reflected light to the eye",
      "blocks": [
        {
          "kind": "text",
          "text": "Some light reaching the object reflects from it and travels into the eye. Arrows must point source → object → eye."
        },
        {
          "kind": "example",
          "text": "For the book: lamp light reaches the page, reflected light leaves the page, and some enters the reader’s eye."
        },
        {
          "kind": "tip",
          "text": "Response frame: Light travels from ____ to ____, reflects, and enters ____."
        }
      ],
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
      "id": "science-u03-l04-c3",
      "title": "Explain seeing with a model",
      "blocks": [
        {
          "kind": "text",
          "text": "Cause: light reflects from the object and enters the eye. Effect: the object can be seen. The model stops at this system-level explanation."
        },
        {
          "kind": "example",
          "text": "The ray diagram represents a possible path and equal authored angles at a surface. It is not evidence that a particular person saw an object."
        },
        {
          "kind": "tip",
          "text": "Stretch: Explain the complete cause-and-effect chain and stop the model when reflected light enters the eye."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Model Reflected Light Entering the Eye",
    "steps": [
      "Name the lamp as source, the book as object, and the eye as receiver.",
      "Trace light from lamp to book.",
      "Trace reflected light from book into the eye.",
      "Explain that entering reflected light allows the book to be seen; the ray activity represents the path."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU03L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u03-l04-q01",
    "conceptTag": "light-to-object",
    "reviewCardId": "science-u03-l04-c1",
    "type": "multiple-choice",
    "prompt": "What must happen first for a lamp-lit book to be seen?",
    "choices": [
      {
        "id": "a",
        "text": "Light from the lamp reaches the book"
      },
      {
        "id": "b",
        "text": "The eye sends light to the book"
      },
      {
        "id": "c",
        "text": "The book measures energy"
      },
      {
        "id": "d",
        "text": "The model finishes"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Light must reach the object first."
  },
  {
    "id": "science-u03-l04-q02",
    "conceptTag": "light-to-object",
    "reviewCardId": "science-u03-l04-c1",
    "type": "true-false",
    "prompt": "The eye is the light source in the seeing model.",
    "choices": [
      {
        "id": "true",
        "text": "True — eyes send seeing rays"
      },
      {
        "id": "false",
        "text": "False — a source such as a lamp supplies light"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The lamp is the source."
  },
  {
    "id": "science-u03-l04-q03",
    "conceptTag": "light-to-object",
    "reviewCardId": "science-u03-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which partial path is correct?",
    "choices": [
      {
        "id": "a",
        "text": "eye → book → lamp"
      },
      {
        "id": "b",
        "text": "lamp → light → book"
      },
      {
        "id": "c",
        "text": "book → eye → lamp"
      },
      {
        "id": "d",
        "text": "lamp → sound → book"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Light travels from lamp to book."
  },
  {
    "id": "science-u03-l04-q04",
    "conceptTag": "light-to-object",
    "reviewCardId": "science-u03-l04-c1",
    "type": "multiple-choice",
    "prompt": "Why can a book in complete darkness not be seen by this model?",
    "choices": [
      {
        "id": "a",
        "text": "The book stops existing"
      },
      {
        "id": "b",
        "text": "The eye closes automatically"
      },
      {
        "id": "c",
        "text": "No light reaches the book to reflect into the eye"
      },
      {
        "id": "d",
        "text": "The page loses its words"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The path needs incoming light."
  },
  {
    "id": "science-u03-l04-q05",
    "conceptTag": "reflected-light-path",
    "reviewCardId": "science-u03-l04-c2",
    "type": "multiple-choice",
    "prompt": "After light reaches the book, where must some reflected light go?",
    "choices": [
      {
        "id": "a",
        "text": "Back into the lamp only"
      },
      {
        "id": "b",
        "text": "Into the table only"
      },
      {
        "id": "c",
        "text": "Into a sound source"
      },
      {
        "id": "d",
        "text": "Into the eye"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Entering the eye completes the modeled path."
  },
  {
    "id": "science-u03-l04-q06",
    "conceptTag": "reflected-light-path",
    "reviewCardId": "science-u03-l04-c2",
    "type": "sort",
    "prompt": "Order the seeing path.",
    "items": [
      {
        "id": "eye",
        "text": "Reflected light enters the eye"
      },
      {
        "id": "source",
        "text": "Light leaves the lamp"
      },
      {
        "id": "object",
        "text": "Light reaches and reflects from the book"
      }
    ],
    "correctOrder": [
      "source",
      "object",
      "eye"
    ],
    "explanation": "The sequence is source, object reflection, eye."
  },
  {
    "id": "science-u03-l04-q07",
    "conceptTag": "reflected-light-path",
    "reviewCardId": "science-u03-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which arrows are correct?",
    "choices": [
      {
        "id": "a",
        "text": "lamp → book → eye"
      },
      {
        "id": "b",
        "text": "eye → book → lamp"
      },
      {
        "id": "c",
        "text": "book → lamp → eye"
      },
      {
        "id": "d",
        "text": "eye → lamp → book"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The arrows follow light travel."
  },
  {
    "id": "science-u03-l04-q08",
    "conceptTag": "reflected-light-path",
    "reviewCardId": "science-u03-l04-c2",
    "type": "true-false",
    "prompt": "An app reflection activity draws an authored light path from a source to an object to an eye; it does not observe a real person. The activity is a model rather than an observation of someone seeing.",
    "choices": [
      {
        "id": "true",
        "text": "True — it represents a light path"
      },
      {
        "id": "false",
        "text": "False — it watches a real eye"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The activity is an authored representation."
  },
  {
    "id": "science-u03-l04-q09",
    "conceptTag": "seeing-cause-effect-model",
    "reviewCardId": "science-u03-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which cause-and-effect statement is correct?",
    "choices": [
      {
        "id": "a",
        "text": "The eye sends light, causing the lamp to glow"
      },
      {
        "id": "b",
        "text": "Reflected light enters the eye, allowing the book to be seen"
      },
      {
        "id": "c",
        "text": "The book creates an exact energy amount"
      },
      {
        "id": "d",
        "text": "Completing a diagram guarantees vision occurred"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The PE links entering reflected light to seeing."
  },
  {
    "id": "science-u03-l04-q10",
    "conceptTag": "seeing-cause-effect-model",
    "reviewCardId": "science-u03-l04-c3",
    "type": "true-false",
    "prompt": "The Grade 4 seeing model must continue past light entering the eye.",
    "choices": [
      {
        "id": "true",
        "text": "True — processes after light enters the eye are required"
      },
      {
        "id": "false",
        "text": "False — the system-level path is the boundary"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The standard stops at light entering the eye."
  },
  {
    "id": "science-u03-l04-q11",
    "conceptTag": "seeing-cause-effect-model",
    "reviewCardId": "science-u03-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which statement names a model limit?",
    "choices": [
      {
        "id": "a",
        "text": "It has arrows"
      },
      {
        "id": "b",
        "text": "It includes a source"
      },
      {
        "id": "c",
        "text": "It does not observe whether a person saw the object"
      },
      {
        "id": "d",
        "text": "It shows a book label"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The diagram cannot supply a real observation of seeing."
  },
  {
    "id": "science-u03-l04-q12",
    "conceptTag": "seeing-cause-effect-model",
    "reviewCardId": "science-u03-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which explanation is complete?",
    "choices": [
      {
        "id": "a",
        "text": "The book is visible because it has words"
      },
      {
        "id": "b",
        "text": "The eye sees because it sends rays"
      },
      {
        "id": "c",
        "text": "The lamp alone causes seeing"
      },
      {
        "id": "d",
        "text": "Lamp light reaches the book, reflects, and enters the eye, allowing the book to be seen"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It includes source, object, reflection, eye, and effect."
  },
  {
    "id": "science-u03-l04-q13",
    "conceptTag": "seeing-cause-effect-model",
    "reviewCardId": "science-u03-l04-c3",
    "type": "fill-blank",
    "prompt": "Light that bounces from an object is called ___ light.",
    "acceptedAnswers": [
      "reflected"
    ],
    "explanation": "Reflected light travels from the object toward the eye."
  }
];

const scienceU03L04Lesson: Lesson = {
  ...scienceU03L04Core,
  quiz: { passThreshold: 8, pool: scienceU03L04Questions },
};

export const unit03Lessons: Lesson[] = [
  scienceU03L01Lesson,
  scienceU03L02Lesson,
  scienceU03L03Lesson,
  scienceU03L04Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u03.test.ts`. Expected: PASS with 4 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u03-l04`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u03.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u03.ts src/content/science/u03.test.ts`, then `git add src/content/science/u03.ts src/content/science/u03.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): model reflected light entering the eye"`.

## Unit 4 lesson tasks

### Task 5: Author `science-u04-l01` — Build Two-Value Message Patterns

**Files:** Create `src/content/science/u04.ts` and `src/content/science/u04.test.ts`.

**Interfaces:** Produces schema-native `scienceU04L01Core`, `scienceU04L01Questions`, and `scienceU04L01Lesson`; appends manifest row 13 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Create this exact focused test file:

```ts
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
        "widget": null
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u04.test.ts`. Expected: FAIL because `./u04` does not exist.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Create the source file with

```ts
import type { Lesson } from '../schema';

const scienceU04L01Core = {
  "id": "science-u04-l01",
  "unitId": "science-u04",
  "title": "Build Two-Value Message Patterns",
  "indicatorCodes": [
    "4-PS4-3"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A code can send information using only two signal values."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "The sender and receiver need the same meanings and reading order."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will encode a short message, then check whether the pattern decodes accurately."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s make every symbol count!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u04-l01-c1",
      "title": "Define two signal values",
      "blocks": [
        {
          "kind": "text",
          "text": "A two-value code uses only two possible values, such as 0/1, off/on, black/white, low/high, or dot/dash."
        },
        {
          "kind": "example",
          "text": "In an eight-place binary character, each place is either 0 or 1. The shared code reference assigns one pattern to each character."
        },
        {
          "kind": "tip",
          "text": "Support: Name the two allowed values and cross out any third value before encoding."
        }
      ]
    },
    {
      "id": "science-u04-l01-c2",
      "title": "Encode a short message",
      "blocks": [
        {
          "kind": "text",
          "text": "Encoding changes information into the shared pattern. Keep every value and separator in the agreed order."
        },
        {
          "kind": "example",
          "text": "For target A, follow the binary reference exactly from left to right; changing one place can change the decoded character."
        },
        {
          "kind": "tip",
          "text": "Response frame: The target is ____. Its two-value pattern is ____."
        }
      ],
      "widget": {
        "type": "message-sender",
        "config": {
          "encoding": "binary",
          "message": "A"
        }
      }
    },
    {
      "id": "science-u04-l01-c3",
      "title": "Check whether a receiver can decode",
      "blocks": [
        {
          "kind": "text",
          "text": "Decoding uses the same reference to turn the pattern back into information. Accuracy means the decoded result matches the intended message."
        },
        {
          "kind": "example",
          "text": "Compare the decoded character with A. If it differs, locate the first mismatched position and revise it."
        },
        {
          "kind": "tip",
          "text": "Stretch: Explain why shared value meanings and shared order are both necessary for accurate decoding."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Build Two-Value Message Patterns",
    "steps": [
      "Agree that each binary place contains only 0 or 1 and that positions are read left to right.",
      "Use the reference to encode the character A.",
      "Decode the pattern with the same reference.",
      "Compare decoded A with intended A and repair any mismatched position."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Append:

```ts
const scienceU04L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u04-l01-q01",
    "conceptTag": "two-value-code",
    "reviewCardId": "science-u04-l01-c1",
    "type": "multiple-choice",
    "prompt": "Which pair can form a two-value code?",
    "choices": [
      {
        "id": "a",
        "text": "0 and 1"
      },
      {
        "id": "b",
        "text": "red, blue, and green"
      },
      {
        "id": "c",
        "text": "short, medium, and long"
      },
      {
        "id": "d",
        "text": "circle, square, triangle, and star"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "A two-value code has exactly two values."
  },
  {
    "id": "science-u04-l01-q02",
    "conceptTag": "two-value-code",
    "reviewCardId": "science-u04-l01-c1",
    "type": "true-false",
    "prompt": "Black and white can be the two possible values in a code.",
    "choices": [
      {
        "id": "true",
        "text": "True — they form a two-value pair"
      },
      {
        "id": "false",
        "text": "False — codes require numbers"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Values need not be numeric."
  },
  {
    "id": "science-u04-l01-q03",
    "conceptTag": "two-value-code",
    "reviewCardId": "science-u04-l01-c1",
    "type": "multiple-choice",
    "prompt": "What must sender and receiver share?",
    "choices": [
      {
        "id": "a",
        "text": "The same handwriting"
      },
      {
        "id": "b",
        "text": "The same code meanings"
      },
      {
        "id": "c",
        "text": "The same room"
      },
      {
        "id": "d",
        "text": "The same favorite message"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Shared meanings allow decoding."
  },
  {
    "id": "science-u04-l01-q04",
    "conceptTag": "two-value-code",
    "reviewCardId": "science-u04-l01-c1",
    "type": "fill-blank",
    "prompt": "A code in which every place is 0 or 1 uses ___ possible values.",
    "acceptedAnswers": [
      "two",
      "2"
    ],
    "explanation": "Only 0 and 1 are allowed values."
  },
  {
    "id": "science-u04-l01-q05",
    "conceptTag": "encode-pattern",
    "reviewCardId": "science-u04-l01-c2",
    "type": "multiple-choice",
    "prompt": "What does encoding do?",
    "choices": [
      {
        "id": "a",
        "text": "Erases a message"
      },
      {
        "id": "b",
        "text": "Measures sound"
      },
      {
        "id": "c",
        "text": "Changes information into a shared pattern"
      },
      {
        "id": "d",
        "text": "Adds a third signal value"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Encoding represents information with the code."
  },
  {
    "id": "science-u04-l01-q06",
    "conceptTag": "encode-pattern",
    "reviewCardId": "science-u04-l01-c2",
    "type": "sort",
    "prompt": "Order the encoding steps.",
    "items": [
      {
        "id": "write",
        "text": "Write the exact pattern in shared order"
      },
      {
        "id": "choose",
        "text": "Choose the target information"
      },
      {
        "id": "reference",
        "text": "Find it in the code reference"
      }
    ],
    "correctOrder": [
      "choose",
      "reference",
      "write"
    ],
    "explanation": "Choose the target, consult the reference, then write the pattern."
  },
  {
    "id": "science-u04-l01-q07",
    "conceptTag": "encode-pattern",
    "reviewCardId": "science-u04-l01-c2",
    "type": "multiple-choice",
    "prompt": "Why does position order matter in a binary character?",
    "choices": [
      {
        "id": "a",
        "text": "Order changes the paper color"
      },
      {
        "id": "b",
        "text": "Order makes the code louder"
      },
      {
        "id": "c",
        "text": "Order proves the message arrived"
      },
      {
        "id": "d",
        "text": "Changing a position can change the decoded character"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Each position is part of the pattern."
  },
  {
    "id": "science-u04-l01-q08",
    "conceptTag": "encode-pattern",
    "reviewCardId": "science-u04-l01-c2",
    "type": "true-false",
    "prompt": "An in-app message activity encodes and decodes A with an authored key; it has no connection to another person. The activity sends information to a live person outside the app.",
    "choices": [
      {
        "id": "true",
        "text": "True — a live receiver is required"
      },
      {
        "id": "false",
        "text": "False — it is an in-app encoding model"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The activity has no live receiver."
  },
  {
    "id": "science-u04-l01-q09",
    "conceptTag": "decode-pattern",
    "reviewCardId": "science-u04-l01-c3",
    "type": "multiple-choice",
    "prompt": "When is the code accurate?",
    "choices": [
      {
        "id": "a",
        "text": "The decoded message matches the intended message"
      },
      {
        "id": "b",
        "text": "The pattern looks attractive"
      },
      {
        "id": "c",
        "text": "The sender uses more than two values"
      },
      {
        "id": "d",
        "text": "The receiver guesses"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Accuracy is a match between intended and decoded information."
  },
  {
    "id": "science-u04-l01-q10",
    "conceptTag": "decode-pattern",
    "reviewCardId": "science-u04-l01-c3",
    "type": "true-false",
    "prompt": "A mismatched decoded character is a reason to inspect the pattern.",
    "choices": [
      {
        "id": "true",
        "text": "True — compare and repair the mismatch"
      },
      {
        "id": "false",
        "text": "False — mismatches should be ignored"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Debugging begins with a mismatch."
  },
  {
    "id": "science-u04-l01-q11",
    "conceptTag": "decode-pattern",
    "reviewCardId": "science-u04-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which action best repairs an error?",
    "choices": [
      {
        "id": "a",
        "text": "Choose a new code without comparing"
      },
      {
        "id": "b",
        "text": "Find the first mismatched position and correct it"
      },
      {
        "id": "c",
        "text": "Add a random third value"
      },
      {
        "id": "d",
        "text": "Change the intended message secretly"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "A targeted correction preserves the shared code."
  },
  {
    "id": "science-u04-l01-q12",
    "conceptTag": "decode-pattern",
    "reviewCardId": "science-u04-l01-c3",
    "type": "multiple-choice",
    "prompt": "Why are separators useful in a longer message?",
    "choices": [
      {
        "id": "a",
        "text": "They add a third value"
      },
      {
        "id": "b",
        "text": "They measure speed"
      },
      {
        "id": "c",
        "text": "They show where one character pattern ends and the next begins"
      },
      {
        "id": "d",
        "text": "They guarantee every answer"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Separators preserve grouping."
  },
  {
    "id": "science-u04-l01-q13",
    "conceptTag": "decode-pattern",
    "reviewCardId": "science-u04-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which explanation is strongest?",
    "choices": [
      {
        "id": "a",
        "text": "Any pattern can mean anything each time"
      },
      {
        "id": "b",
        "text": "Only the sender needs the key"
      },
      {
        "id": "c",
        "text": "Order never affects decoding"
      },
      {
        "id": "d",
        "text": "Shared values, meanings, and order let the receiver decode accurately"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "All three agreements are needed."
  }
];

const scienceU04L01Lesson: Lesson = {
  ...scienceU04L01Core,
  quiz: { passThreshold: 8, pool: scienceU04L01Questions },
};

export const unit04Lessons: Lesson[] = [
  scienceU04L01Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u04.test.ts`. Expected: PASS with 1 lesson row, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u04-l01`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u04.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u04.ts src/content/science/u04.test.ts`, then `git add src/content/science/u04.ts src/content/science/u04.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): start science information transfer unit"`.
### Task 6: Author `science-u04-l02` — Design Morse and Drum Codes

**Files:** Modify `src/content/science/u04.ts` and `src/content/science/u04.test.ts`.

**Interfaces:** Produces schema-native `scienceU04L02Core`, `scienceU04L02Questions`, and `scienceU04L02Lesson`; appends manifest row 14 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
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
        "widget": null
      },
      {
        "title": "Compare code clarity",
        "tag": "code-clarity-comparison",
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

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u04.test.ts`. Expected: FAIL because the test expects 2 lesson rows while production exports 1.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU04L02Core = {
  "id": "science-u04-l02",
  "unitId": "science-u04",
  "title": "Design Morse and Drum Codes",
  "indicatorCodes": [
    "4-PS4-3"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Dots and dashes can encode text, while low and high drum sounds can encode the same information."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Both solutions work only when each uses two values and a shared key."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will design patterns and compare their clarity."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s make a message that can be decoded without guessing!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u04-l02-c1",
      "title": "Use dots and dashes",
      "blocks": [
        {
          "kind": "text",
          "text": "Morse patterns use dot and dash as the two signal values. Character spaces organize values without becoming a third signal value."
        },
        {
          "kind": "example",
          "text": "The shared reference gives A as dot-dash. Copy the order exactly."
        },
        {
          "kind": "tip",
          "text": "Support: Tap each value while saying dot, dash; then compare with the printed A reference."
        }
      ],
      "widget": {
        "type": "message-sender",
        "config": {
          "encoding": "morse",
          "message": "A"
        }
      }
    },
    {
      "id": "science-u04-l02-c2",
      "title": "Use two drum sounds",
      "blocks": [
        {
          "kind": "text",
          "text": "A drum code can use low and high as its two values. The sender chooses a pattern and the receiver uses the same key."
        },
        {
          "kind": "example",
          "text": "A shared key might assign low-high to A. A pause separates characters but does not add a third drum value."
        },
        {
          "kind": "tip",
          "text": "Response frame: Low means ____, high means ____, and the pattern for A is ____."
        }
      ]
    },
    {
      "id": "science-u04-l02-c3",
      "title": "Compare code clarity",
      "blocks": [
        {
          "kind": "text",
          "text": "A clear code keeps its two values easy to distinguish, preserves order, and includes unambiguous character boundaries."
        },
        {
          "kind": "example",
          "text": "Dot/dash may be clear on paper; low/high may work by sound. Background noise or unclear pauses can reduce drum-code accuracy."
        },
        {
          "kind": "tip",
          "text": "Stretch: Choose one code for a named condition and justify it with accuracy and clarity evidence plus one limitation."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Design Morse and Drum Codes",
    "steps": [
      "Define dot/dash for Morse and low/high for drums.",
      "Assign A the ordered pattern first-value then second-value in both keys.",
      "Encode and decode A with each shared key.",
      "Compare: written dots/dashes are easy to inspect visually; low/high sounds can travel without a screen but may be confused in noise."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU04L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u04-l02-q01",
    "conceptTag": "morse-pattern",
    "reviewCardId": "science-u04-l02-c1",
    "type": "multiple-choice",
    "prompt": "What are the two Morse signal values used here?",
    "choices": [
      {
        "id": "a",
        "text": "Dot and dash"
      },
      {
        "id": "b",
        "text": "Low, middle, and high"
      },
      {
        "id": "c",
        "text": "Black, gray, and white"
      },
      {
        "id": "d",
        "text": "Short, medium, and long"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The code uses dot and dash."
  },
  {
    "id": "science-u04-l02-q02",
    "conceptTag": "morse-pattern",
    "reviewCardId": "science-u04-l02-c1",
    "type": "true-false",
    "prompt": "The order dot-dash can represent a different character from dash-dot.",
    "choices": [
      {
        "id": "true",
        "text": "True — order is part of the pattern"
      },
      {
        "id": "false",
        "text": "False — order never matters"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Morse patterns depend on order."
  },
  {
    "id": "science-u04-l02-q03",
    "conceptTag": "morse-pattern",
    "reviewCardId": "science-u04-l02-c1",
    "type": "multiple-choice",
    "prompt": "A printed Morse reference states A = dot-dash. Which pattern does it assign to A?",
    "choices": [
      {
        "id": "a",
        "text": "dash-dash"
      },
      {
        "id": "b",
        "text": "dot-dash"
      },
      {
        "id": "c",
        "text": "dot-dot-dot"
      },
      {
        "id": "d",
        "text": "dash-dot-dot"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "A is dot-dash."
  },
  {
    "id": "science-u04-l02-q04",
    "conceptTag": "morse-pattern",
    "reviewCardId": "science-u04-l02-c1",
    "type": "fill-blank",
    "prompt": "A short Morse value is called a ___.",
    "acceptedAnswers": [
      "dot"
    ],
    "explanation": "Dot is one of the two values."
  },
  {
    "id": "science-u04-l02-q05",
    "conceptTag": "drum-pattern",
    "reviewCardId": "science-u04-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which pair keeps a drum code to two values?",
    "choices": [
      {
        "id": "a",
        "text": "quiet, medium, loud"
      },
      {
        "id": "b",
        "text": "tap, shake, scrape"
      },
      {
        "id": "c",
        "text": "low and high"
      },
      {
        "id": "d",
        "text": "one, two, three"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Low/high is exactly two values."
  },
  {
    "id": "science-u04-l02-q06",
    "conceptTag": "drum-pattern",
    "reviewCardId": "science-u04-l02-c2",
    "type": "true-false",
    "prompt": "A shared pause may separate characters without becoming a third drum value.",
    "choices": [
      {
        "id": "true",
        "text": "True — it marks grouping"
      },
      {
        "id": "false",
        "text": "False — every pause is a signal value"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The pause is a boundary convention."
  },
  {
    "id": "science-u04-l02-q07",
    "conceptTag": "drum-pattern",
    "reviewCardId": "science-u04-l02-c2",
    "type": "multiple-choice",
    "prompt": "What must a drum-code receiver know?",
    "choices": [
      {
        "id": "a",
        "text": "The sender’s favorite rhythm"
      },
      {
        "id": "b",
        "text": "The drum’s color"
      },
      {
        "id": "c",
        "text": "The room size"
      },
      {
        "id": "d",
        "text": "The shared low/high key and reading order"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The receiver needs the code rules."
  },
  {
    "id": "science-u04-l02-q08",
    "conceptTag": "drum-pattern",
    "reviewCardId": "science-u04-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which pattern matches low-high for A?",
    "choices": [
      {
        "id": "a",
        "text": "one low sound followed by one high sound"
      },
      {
        "id": "b",
        "text": "two high sounds followed by low"
      },
      {
        "id": "c",
        "text": "three medium sounds"
      },
      {
        "id": "d",
        "text": "one scrape only"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It copies the assigned order."
  },
  {
    "id": "science-u04-l02-q09",
    "conceptTag": "code-clarity-comparison",
    "reviewCardId": "science-u04-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which criterion asks whether values are easy to tell apart?",
    "choices": [
      {
        "id": "a",
        "text": "Cost"
      },
      {
        "id": "b",
        "text": "Clarity"
      },
      {
        "id": "c",
        "text": "Decoration"
      },
      {
        "id": "d",
        "text": "Length only"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Clarity concerns distinguishability."
  },
  {
    "id": "science-u04-l02-q10",
    "conceptTag": "code-clarity-comparison",
    "reviewCardId": "science-u04-l02-c3",
    "type": "true-false",
    "prompt": "Background noise can be a limitation for a drum-sound code.",
    "choices": [
      {
        "id": "true",
        "text": "True — noise can hide distinctions"
      },
      {
        "id": "false",
        "text": "False — conditions never matter"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Noise can reduce accurate decoding."
  },
  {
    "id": "science-u04-l02-q11",
    "conceptTag": "code-clarity-comparison",
    "reviewCardId": "science-u04-l02-c3",
    "type": "multiple-choice",
    "prompt": "A learner must choose a code for a printed card. Written Morse uses visible dots and dashes; a drum code uses low and high sounds that may be affected by noise. Which evidence favors Morse?",
    "choices": [
      {
        "id": "a",
        "text": "It is always faster"
      },
      {
        "id": "b",
        "text": "It uses three values"
      },
      {
        "id": "c",
        "text": "Dots and dashes can be inspected visually"
      },
      {
        "id": "d",
        "text": "It needs no shared key"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Visual inspection supports clarity."
  },
  {
    "id": "science-u04-l02-q12",
    "conceptTag": "code-clarity-comparison",
    "reviewCardId": "science-u04-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which comparison is justified?",
    "choices": [
      {
        "id": "a",
        "text": "Drums are always best"
      },
      {
        "id": "b",
        "text": "Morse is always best"
      },
      {
        "id": "c",
        "text": "Both codes guarantee success"
      },
      {
        "id": "d",
        "text": "Choose written Morse when visual inspection matters; choose drums when a sound route fits, while considering noise"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It links conditions to strengths and limits."
  },
  {
    "id": "science-u04-l02-q13",
    "conceptTag": "code-clarity-comparison",
    "reviewCardId": "science-u04-l02-c3",
    "type": "fill-blank",
    "prompt": "A code is clear when its two values are easy to tell ___.",
    "acceptedAnswers": [
      "apart"
    ],
    "explanation": "Distinct values support accurate decoding."
  }
];

const scienceU04L02Lesson: Lesson = {
  ...scienceU04L02Core,
  quiz: { passThreshold: 8, pool: scienceU04L02Questions },
};

export const unit04Lessons: Lesson[] = [
  scienceU04L01Lesson,
  scienceU04L02Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u04.test.ts`. Expected: PASS with 2 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u04-l02`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u04.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u04.ts src/content/science/u04.test.ts`, then `git add src/content/science/u04.ts src/content/science/u04.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): compare Morse and drum codes"`.
### Task 7: Author `science-u04-l03` — Send Binary-Grid Picture Messages

**Files:** Modify `src/content/science/u04.ts` and `src/content/science/u04.test.ts`.

**Interfaces:** Produces schema-native `scienceU04L03Core`, `scienceU04L03Questions`, and `scienceU04L03Lesson`; appends manifest row 15 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
  {
    "id": "science-u04-l03",
    "title": "Send Binary-Grid Picture Messages",
    "indicatorCodes": [
      "4-PS4-3"
    ],
    "cards": [
      {
        "title": "Assign black and white values",
        "tag": "binary-grid-values",
        "widget": null
      },
      {
        "title": "Read rows in a shared order",
        "tag": "binary-grid-order",
        "widget": null
      },
      {
        "title": "Find and repair a mismatch",
        "tag": "binary-grid-debugging",
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
```

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u04.test.ts`. Expected: FAIL because the test expects 3 lesson rows while production exports 2.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU04L03Core = {
  "id": "science-u04-l03",
  "unitId": "science-u04",
  "title": "Send Binary-Grid Picture Messages",
  "indicatorCodes": [
    "4-PS4-3"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A small picture can be described one grid square at a time with black and white values."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "The sender and receiver must agree where to start and how to move through the rows."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will encode, decode, and repair one mismatched square."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s turn a picture into an exact two-value pattern!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u04-l03-c1",
      "title": "Assign black and white values",
      "blocks": [
        {
          "kind": "text",
          "text": "A binary picture grid assigns one of two values to every square: black or white. A complete message includes a value for each square."
        },
        {
          "kind": "example",
          "text": "For a 2 × 2 diagonal picture, the top-left and bottom-right squares are black; the other two are white."
        },
        {
          "kind": "tip",
          "text": "Support: Cover all but one square and name only black or white before moving on."
        }
      ]
    },
    {
      "id": "science-u04-l03-c2",
      "title": "Read rows in a shared order",
      "blocks": [
        {
          "kind": "text",
          "text": "Agree to begin at top-left, read left to right, then continue on the next row. A different order can produce a different picture from the same values."
        },
        {
          "kind": "example",
          "text": "The diagonal 2 × 2 grid reads black, white | white, black in row order."
        },
        {
          "kind": "tip",
          "text": "Response frame: Start at ____, move ____, then move to ____."
        }
      ]
    },
    {
      "id": "science-u04-l03-c3",
      "title": "Find and repair a mismatch",
      "blocks": [
        {
          "kind": "text",
          "text": "Compare the decoded grid with the intended grid square by square in the shared order. Change only the first mismatched square, then compare again."
        },
        {
          "kind": "example",
          "text": "If the decoded bottom-right square is white but the intended square is black, revise that value to black."
        },
        {
          "kind": "tip",
          "text": "Stretch: Explain how one value error changes the decoded picture and how a position-by-position check locates it."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Send Binary-Grid Picture Messages",
    "steps": [
      "Assign black/white as the only two grid values.",
      "Read the intended 2 × 2 diagonal from top-left across each row.",
      "Decode black, white | white, white and compare with the target.",
      "Find the bottom-right mismatch, change it to black, and confirm the decoded grid matches."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU04L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u04-l03-q01",
    "conceptTag": "binary-grid-values",
    "reviewCardId": "science-u04-l03-c1",
    "type": "multiple-choice",
    "prompt": "A picture code assigns every grid square one of two values: black or white. What are the two values in this picture code?",
    "choices": [
      {
        "id": "a",
        "text": "Black and white"
      },
      {
        "id": "b",
        "text": "Black, gray, and white"
      },
      {
        "id": "c",
        "text": "0, 1, and 2"
      },
      {
        "id": "d",
        "text": "Small and large squares"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Each square is black or white."
  },
  {
    "id": "science-u04-l03-q02",
    "conceptTag": "binary-grid-values",
    "reviewCardId": "science-u04-l03-c1",
    "type": "true-false",
    "prompt": "Every grid square needs one code value.",
    "choices": [
      {
        "id": "true",
        "text": "True — each position must be represented"
      },
      {
        "id": "false",
        "text": "False — blank positions decode themselves"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A complete grid accounts for every square."
  },
  {
    "id": "science-u04-l03-q03",
    "conceptTag": "binary-grid-values",
    "reviewCardId": "science-u04-l03-c1",
    "type": "multiple-choice",
    "prompt": "An intended 2 × 2 grid is read from top-left across each row: black, white | white, black. Which squares are black?",
    "choices": [
      {
        "id": "a",
        "text": "top-right and bottom-left"
      },
      {
        "id": "b",
        "text": "top-left and bottom-right"
      },
      {
        "id": "c",
        "text": "both top squares"
      },
      {
        "id": "d",
        "text": "both bottom squares"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Those positions form the stated diagonal."
  },
  {
    "id": "science-u04-l03-q04",
    "conceptTag": "binary-grid-values",
    "reviewCardId": "science-u04-l03-c1",
    "type": "fill-blank",
    "prompt": "An intended 2 × 2 grid is read from top-left across each row: black, white | white, black. The top-left square is ___.",
    "acceptedAnswers": [
      "black"
    ],
    "explanation": "The first diagonal square is black."
  },
  {
    "id": "science-u04-l03-q05",
    "conceptTag": "binary-grid-order",
    "reviewCardId": "science-u04-l03-c2",
    "type": "multiple-choice",
    "prompt": "For a 2 × 2 grid, the sender and receiver agree to start at top-left, read left to right, and then continue on the next row. Where does the reading order begin?",
    "choices": [
      {
        "id": "a",
        "text": "Bottom-right"
      },
      {
        "id": "b",
        "text": "Top-right"
      },
      {
        "id": "c",
        "text": "Top-left"
      },
      {
        "id": "d",
        "text": "Any random square"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The shared order begins top-left."
  },
  {
    "id": "science-u04-l03-q06",
    "conceptTag": "binary-grid-order",
    "reviewCardId": "science-u04-l03-c2",
    "type": "sort",
    "prompt": "Order the row-reading steps.",
    "items": [
      {
        "id": "next-row",
        "text": "Move to the next row"
      },
      {
        "id": "start",
        "text": "Start at the top-left square"
      },
      {
        "id": "across",
        "text": "Read left to right across the row"
      }
    ],
    "correctOrder": [
      "start",
      "across",
      "next-row"
    ],
    "explanation": "The order starts top-left, goes across, then moves down."
  },
  {
    "id": "science-u04-l03-q07",
    "conceptTag": "binary-grid-order",
    "reviewCardId": "science-u04-l03-c2",
    "type": "multiple-choice",
    "prompt": "An intended 2 × 2 grid has black top-left and bottom-right squares and white top-right and bottom-left squares. What pattern represents it in row order?",
    "choices": [
      {
        "id": "a",
        "text": "white, black | black, white"
      },
      {
        "id": "b",
        "text": "black, black | white, white"
      },
      {
        "id": "c",
        "text": "white, white | black, black"
      },
      {
        "id": "d",
        "text": "black, white | white, black"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It follows the four stated square values."
  },
  {
    "id": "science-u04-l03-q08",
    "conceptTag": "binary-grid-order",
    "reviewCardId": "science-u04-l03-c2",
    "type": "true-false",
    "prompt": "Changing the agreed reading order can change the decoded picture.",
    "choices": [
      {
        "id": "true",
        "text": "True — position order carries information"
      },
      {
        "id": "false",
        "text": "False — order never matters"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A grid pattern depends on positions."
  },
  {
    "id": "science-u04-l03-q09",
    "conceptTag": "binary-grid-debugging",
    "reviewCardId": "science-u04-l03-c3",
    "type": "multiple-choice",
    "prompt": "The decoded bottom-right square is white instead of black. What should be repaired?",
    "choices": [
      {
        "id": "a",
        "text": "Only the bottom-right value"
      },
      {
        "id": "b",
        "text": "Every square"
      },
      {
        "id": "c",
        "text": "The grid size"
      },
      {
        "id": "d",
        "text": "The black/white meanings"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The comparison identifies one mismatch."
  },
  {
    "id": "science-u04-l03-q10",
    "conceptTag": "binary-grid-debugging",
    "reviewCardId": "science-u04-l03-c3",
    "type": "true-false",
    "prompt": "A position-by-position comparison can locate a grid error.",
    "choices": [
      {
        "id": "true",
        "text": "True — compare corresponding squares"
      },
      {
        "id": "false",
        "text": "False — errors cannot be located"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Corresponding positions reveal mismatches."
  },
  {
    "id": "science-u04-l03-q11",
    "conceptTag": "binary-grid-debugging",
    "reviewCardId": "science-u04-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which action is least useful for debugging?",
    "choices": [
      {
        "id": "a",
        "text": "Compare intended and decoded rows"
      },
      {
        "id": "b",
        "text": "Change several random squares at once"
      },
      {
        "id": "c",
        "text": "Find the first mismatch"
      },
      {
        "id": "d",
        "text": "Decode again after one repair"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Random changes do not isolate the error."
  },
  {
    "id": "science-u04-l03-q12",
    "conceptTag": "binary-grid-debugging",
    "reviewCardId": "science-u04-l03-c3",
    "type": "multiple-choice",
    "prompt": "Why can one wrong value matter?",
    "choices": [
      {
        "id": "a",
        "text": "It adds a third code value"
      },
      {
        "id": "b",
        "text": "It changes the reading direction automatically"
      },
      {
        "id": "c",
        "text": "It changes one square of the decoded picture"
      },
      {
        "id": "d",
        "text": "It proves the code failed everywhere"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Each value controls a square."
  },
  {
    "id": "science-u04-l03-q13",
    "conceptTag": "binary-grid-debugging",
    "reviewCardId": "science-u04-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which debugging explanation is complete?",
    "choices": [
      {
        "id": "a",
        "text": "The picture looks wrong"
      },
      {
        "id": "b",
        "text": "Use a new grid"
      },
      {
        "id": "c",
        "text": "Change all white squares"
      },
      {
        "id": "d",
        "text": "Compare in shared order, repair the first mismatch, and decode again"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It gives a precise repeatable process."
  }
];

const scienceU04L03Lesson: Lesson = {
  ...scienceU04L03Core,
  quiz: { passThreshold: 8, pool: scienceU04L03Questions },
};

export const unit04Lessons: Lesson[] = [
  scienceU04L01Lesson,
  scienceU04L02Lesson,
  scienceU04L03Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u04.test.ts`. Expected: PASS with 3 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u04-l03`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u04.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u04.ts src/content/science/u04.test.ts`, then `git add src/content/science/u04.ts src/content/science/u04.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): teach binary-grid picture messages"`.
### Task 8: Author `science-u04-l04` — Compare Message Solutions

**Files:** Modify `src/content/science/u04.ts` and `src/content/science/u04.test.ts`.

**Interfaces:** Produces schema-native `scienceU04L04Core`, `scienceU04L04Questions`, and `scienceU04L04Lesson`; appends manifest row 16 with exact card/tag/question/widget/review routing.

- [ ] **Step 1: Write the exact failing focused-test edit.**

Insert this exact object immediately before the closing `] as const;` of `specs`:

```ts
  {
    "id": "science-u04-l04",
    "title": "Compare Message Solutions",
    "indicatorCodes": [
      "4-PS4-3"
    ],
    "cards": [
      {
        "title": "Name comparison criteria",
        "tag": "message-criteria",
        "widget": null
      },
      {
        "title": "Test accuracy and efficiency",
        "tag": "message-solution-evidence",
        "widget": null
      },
      {
        "title": "Choose and justify a solution",
        "tag": "message-solution-choice",
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

- [ ] **Step 2: Run the focused test red.** Run `npm test -- src/content/science/u04.test.ts`. Expected: FAIL because the test expects 4 lesson rows while production exports 3.

- [ ] **Step 3: Add only metadata, intro, three differentiated cards, and worked example.** Insert immediately before the unit export:

```ts
const scienceU04L04Core = {
  "id": "science-u04-l04",
  "unitId": "science-u04",
  "title": "Compare Message Solutions",
  "indicatorCodes": [
    "4-PS4-3"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Three teams encode the same four-character message with Morse, low/high drums, and a black/white grid strip."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "A fair comparison sends the same information under the same conditions."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare accuracy, clarity, and efficiency, then justify a choice."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s choose with evidence instead of preference!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u04-l04-c1",
      "title": "Name comparison criteria",
      "blocks": [
        {
          "kind": "text",
          "text": "Accuracy asks whether decoding matches the intended message. Clarity asks whether the two values and boundaries are distinguishable. Efficiency asks how many values or how much time the solution uses."
        },
        {
          "kind": "example",
          "text": "A code can be accurate but slower, or quick but unclear in noise. No single criterion answers every design question."
        },
        {
          "kind": "tip",
          "text": "Support: Make three columns labeled accuracy, clarity, and efficiency before reading results."
        }
      ]
    },
    {
      "id": "science-u04-l04-c2",
      "title": "Test accuracy and efficiency",
      "blocks": [
        {
          "kind": "text",
          "text": "Hold the target message and conditions constant. Record decoded characters, errors, and values used for each solution."
        },
        {
          "kind": "example",
          "text": "Results: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid strip decoded 4/4 using 16 values."
        },
        {
          "kind": "tip",
          "text": "Response frame: ____ was more/less ____ because the result shows ____."
        }
      ]
    },
    {
      "id": "science-u04-l04-c3",
      "title": "Choose and justify a solution",
      "blocks": [
        {
          "kind": "text",
          "text": "Choose the solution that best meets the named need and cite at least two criteria. A limitation makes the justification more honest."
        },
        {
          "kind": "example",
          "text": "For an accurate printed card, Morse may fit because it decoded all characters with fewer values than the grid. Its limitation is that readers still need the shared key."
        },
        {
          "kind": "tip",
          "text": "Stretch: Defend a different solution for a different condition and explain why the chosen criteria changed."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Compare Message Solutions",
    "steps": [
      "Keep the four-character target and test conditions the same.",
      "Compare decoded accuracy: Morse 4/4, drums 3/4, grid 4/4.",
      "Compare efficiency: Morse 12 values, drums 10, grid 16; note that drums had an error in noise.",
      "Choose Morse for accurate compact print, cite both results, and acknowledge the shared-key limitation."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;
```

- [ ] **Step 4: Add q01–q13, assemble the lesson, and update only the manifest-ordered export.** Insert before the unit export and replace that export with the exact array shown:

```ts
const scienceU04L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u04-l04-q01",
    "conceptTag": "message-criteria",
    "reviewCardId": "science-u04-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which criterion asks whether decoded information matches the target?",
    "choices": [
      {
        "id": "a",
        "text": "Accuracy"
      },
      {
        "id": "b",
        "text": "Clarity"
      },
      {
        "id": "c",
        "text": "Decoration"
      },
      {
        "id": "d",
        "text": "Volume"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Accuracy measures the match."
  },
  {
    "id": "science-u04-l04-q02",
    "conceptTag": "message-criteria",
    "reviewCardId": "science-u04-l04-c1",
    "type": "true-false",
    "prompt": "Efficiency and accuracy are different criteria.",
    "choices": [
      {
        "id": "true",
        "text": "True — a shorter code can still contain errors"
      },
      {
        "id": "false",
        "text": "False — they always mean the same thing"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The results can trade one criterion against another."
  },
  {
    "id": "science-u04-l04-q03",
    "conceptTag": "message-criteria",
    "reviewCardId": "science-u04-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which criterion asks whether two values are easy to distinguish?",
    "choices": [
      {
        "id": "a",
        "text": "Speed only"
      },
      {
        "id": "b",
        "text": "Clarity"
      },
      {
        "id": "c",
        "text": "Color preference"
      },
      {
        "id": "d",
        "text": "Cost only"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Clarity concerns distinguishability."
  },
  {
    "id": "science-u04-l04-q04",
    "conceptTag": "message-criteria",
    "reviewCardId": "science-u04-l04-c1",
    "type": "fill-blank",
    "prompt": "The criterion about values or time used is ___.",
    "acceptedAnswers": [
      "efficiency"
    ],
    "explanation": "Efficiency concerns resources used."
  },
  {
    "id": "science-u04-l04-q05",
    "conceptTag": "message-solution-evidence",
    "reviewCardId": "science-u04-l04-c2",
    "type": "multiple-choice",
    "prompt": "Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. Which solutions decoded all four characters?",
    "choices": [
      {
        "id": "a",
        "text": "Drums only"
      },
      {
        "id": "b",
        "text": "Grid only"
      },
      {
        "id": "c",
        "text": "Morse and grid"
      },
      {
        "id": "d",
        "text": "Morse and drums"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The results list 4/4 for Morse and grid."
  },
  {
    "id": "science-u04-l04-q06",
    "conceptTag": "message-solution-evidence",
    "reviewCardId": "science-u04-l04-c2",
    "type": "true-false",
    "prompt": "Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. The drum solution had one decoding error in the noise condition.",
    "choices": [
      {
        "id": "true",
        "text": "True — it decoded 3 of 4"
      },
      {
        "id": "false",
        "text": "False — it decoded all 4"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The written result is 3/4."
  },
  {
    "id": "science-u04-l04-q07",
    "conceptTag": "message-solution-evidence",
    "reviewCardId": "science-u04-l04-c2",
    "type": "multiple-choice",
    "prompt": "Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. Which accurate solution used fewer values?",
    "choices": [
      {
        "id": "a",
        "text": "Drums"
      },
      {
        "id": "b",
        "text": "Both accurate solutions used 16"
      },
      {
        "id": "c",
        "text": "Grid"
      },
      {
        "id": "d",
        "text": "Morse"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Morse used 12 versus grid’s 16."
  },
  {
    "id": "science-u04-l04-q08",
    "conceptTag": "message-solution-evidence",
    "reviewCardId": "science-u04-l04-c2",
    "type": "multiple-choice",
    "prompt": "Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. Why is this a fair comparison?",
    "choices": [
      {
        "id": "a",
        "text": "The same message and conditions were used"
      },
      {
        "id": "b",
        "text": "Each team sent a different message"
      },
      {
        "id": "c",
        "text": "Only favorite codes were recorded"
      },
      {
        "id": "d",
        "text": "The results were guessed"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Shared conditions make results comparable."
  },
  {
    "id": "science-u04-l04-q09",
    "conceptTag": "message-solution-choice",
    "reviewCardId": "science-u04-l04-c3",
    "type": "multiple-choice",
    "prompt": "Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. Which choice is best justified for accurate compact print?",
    "choices": [
      {
        "id": "a",
        "text": "Drums, because 3/4 is perfect"
      },
      {
        "id": "b",
        "text": "Morse, because it decoded 4/4 with fewer values than the grid"
      },
      {
        "id": "c",
        "text": "Grid, because it used the most values"
      },
      {
        "id": "d",
        "text": "Any code, because evidence does not matter"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Morse meets both named criteria."
  },
  {
    "id": "science-u04-l04-q10",
    "conceptTag": "message-solution-choice",
    "reviewCardId": "science-u04-l04-c3",
    "type": "true-false",
    "prompt": "A justified choice should include a limitation.",
    "choices": [
      {
        "id": "true",
        "text": "True — limitations show the tradeoff"
      },
      {
        "id": "false",
        "text": "False — chosen solutions have no limits"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A limitation keeps the comparison honest."
  },
  {
    "id": "science-u04-l04-q11",
    "conceptTag": "message-solution-choice",
    "reviewCardId": "science-u04-l04-c3",
    "type": "multiple-choice",
    "prompt": "Example choice: For an accurate printed card, Morse decoded all four characters using 12 values, but readers still need the shared key. What is one Morse limitation in this example?",
    "choices": [
      {
        "id": "a",
        "text": "It decoded only 3 characters"
      },
      {
        "id": "b",
        "text": "It cannot be written"
      },
      {
        "id": "c",
        "text": "Readers need the shared key"
      },
      {
        "id": "d",
        "text": "It uses three signal values"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The shared reference is necessary."
  },
  {
    "id": "science-u04-l04-q12",
    "conceptTag": "message-solution-choice",
    "reviewCardId": "science-u04-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which claim uses two criteria?",
    "choices": [
      {
        "id": "a",
        "text": "Morse is my favorite"
      },
      {
        "id": "b",
        "text": "Drums sound interesting"
      },
      {
        "id": "c",
        "text": "Grid has squares"
      },
      {
        "id": "d",
        "text": "Morse was accurate and used fewer values than the other accurate solution"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It cites accuracy and efficiency."
  },
  {
    "id": "science-u04-l04-q13",
    "conceptTag": "message-solution-choice",
    "reviewCardId": "science-u04-l04-c3",
    "type": "fill-blank",
    "prompt": "Results: Morse decoded 4/4 using 12 values; grid decoded 4/4 using 16 values. Complete the justification: I choose Morse because it decoded 4/4 and used ___ values.",
    "acceptedAnswers": [
      "12",
      "twelve"
    ],
    "explanation": "The results give Morse 12 values."
  }
];

const scienceU04L04Lesson: Lesson = {
  ...scienceU04L04Core,
  quiz: { passThreshold: 8, pool: scienceU04L04Questions },
};

export const unit04Lessons: Lesson[] = [
  scienceU04L01Lesson,
  scienceU04L02Lesson,
  scienceU04L03Lesson,
  scienceU04L04Lesson,
];
```

- [ ] **Step 5: Run the focused test green.** Run `npm test -- src/content/science/u04.test.ts`. Expected: PASS with 4 lesson rows, exact differentiation, all 13 routes, and all three immediate review targets.

- [ ] **Step 6: Audit the literal independently.** Check every key, distractor, accepted answer, sort order, explanation, exact three-tag set, review card, widget config, model/evidence statement, and PE boundary against this printed object. For `science-u04-l04`, require q01–q13 exactly once and MC keys a–d balanced within one.

- [ ] **Step 7: Run adjacent and type gates.** Run `npm test -- src/content/science/u04.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/content/answer-normalization.test.ts && npx tsc -b --pretty false`. Expected: PASS.

- [ ] **Step 8: Inspect and stage only owned paths.** Run `git diff --check -- src/content/science/u04.ts src/content/science/u04.test.ts`, then `git add src/content/science/u04.ts src/content/science/u04.test.ts`, `git diff --check --cached`, and `git diff --cached --name-only`. Require exactly those two paths.

- [ ] **Step 9: Commit the reviewer-sized lesson.** Run `git commit -m "feat(content): compare message solutions"`.

## Post-review self-contained Quick Check remediation

- [ ] Append the following exact regression to `src/content/science/u03.test.ts`, run it red against the original context-dependent prompts, then make only the prompt replacements already printed in Tasks 1–4:

```ts
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
```

- [ ] Append the following exact regression to `src/content/science/u04.test.ts`, run it red against the original context-dependent prompts, then make only the prompt replacements already printed in Tasks 5–8:

```ts
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
```

- [ ] Run `npm test -- src/content/science/u03.test.ts src/content/science/u04.test.ts`; require both new regressions and the existing exact route/widget tests to pass without changing question IDs, types, routes, answer keys, choices, explanations, or widgets.

## Wave verification and handoff

- [ ] Run focused tests for both owned units, `src/content/schema.test.ts`, `src/content/content-validation.test.ts`, `src/content/answer-normalization.test.ts`, and the master lesson-quality test when present; then run `npx tsc -b --pretty false`, `npm run build`, and `git diff --check`.
- [ ] Count exactly 8 lessons, 24 cards, 104 questions, 24 exact concept-tag/review targets, and 24 immediate canonical review steps in this wave.
- [ ] Run placeholder, prohibited-boundary, false-evidence, directly-visible-energy, widget-name/config, answer-normalization, and review-mapping scans. Require no finding.
- [ ] Request independent scoped review. Do not register units here; hand accepted exports to Plan C master Task C5.
