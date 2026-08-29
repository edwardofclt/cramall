# Cram All Plan C3: Grade 4 Science Curriculum Blueprint

> **Status:** Tracked curriculum blueprint; not an executable implementation plan. Source work is blocked until all four exact tracked literal wave plans in **Promotion Blocker and Literal-Wave Split** exist and pass their own writing-plans reviews.

**Goal:** Freeze the contract that preserves the three accepted Science pilot lessons and adds 29 lessons so all 14 Grade 4 South Carolina Science performance expectations are taught across 8 units and 32 schema-valid lessons.

**Architecture:** Authored Science stays in one typed module and one focused test per unit. Each lesson is a literal `Lesson` object with three review-addressable cards and a 13-question pool; widgets are optional models using only completed Plan B contracts and never stand in for physical evidence. Four fully literal wave plans own lesson source/tests. They do not edit the Science registry or any shared schema, manifest, helper, generated-standard, widget, or catalog file; Plan C master Tasks C5 and C9 own registration, catalog validation, and release.

**Tech Stack:** React 18 content data, TypeScript 5, Zod 3 validation, Vitest 2; no new dependency.

**Spec:** `docs/superpowers/specs/2026-08-29-cram-all-design.md`

## Hard dependency gate

1. The accepted Plan A closure remediation must be committed and independently approved. Verify the legacy backward-date v1 migration, shared grading/ambiguity normalization, and composited Science unit-number contrast fix described by `docs/superpowers/plans/2026-08-29-plan-a-closure-remediation.md`; record the accepted commit in the execution log instead of relying on a stale planning-baseline hash.
2. Plan B master and its Science subject plan must be completely executed and green. Re-read the final `WIDGET_TYPES`, `WidgetRefSchema`, `WidgetEventMap`, `widgetRegistry`, and exhaustive `WidgetFrame` before copying any widget literal below. If the completed implementation differs from this plan's exact literals, stop and reconcile this plan; do not weaken validation or invent a substitute.
3. Plan C master Task C1 must be complete: `src/content/curriculum.ts` contains the exact 89-row manifest, the final `Lesson` contract is settled, and permanent content validation/helpers exist.
4. Run the baseline gate before any content edit:

```bash
npm test && npx tsc -b --pretty false && npm run build
```

Expected: PASS. Stop on any failure or missing dependency.

## Global constraints

- Preserve the research allocation exactly: 8 Science units, 32 lessons, and all 14 Science PEs covered. Lessons `science-u01-l01` through `science-u01-l03` are accepted work from commits `7b7648c` and `5f5c61e`; revalidate them but do not rewrite them. New authoring starts with `science-u01-l04`.
- Every new lesson has guide `sandy`, four short intro lines, exactly three cards, at least one rich block per card, one worked example with at least three steps, exactly 13 questions (`q01` through `q13`), `passThreshold: 8`, and at least two pedagogically natural question types.
- Each lesson uses exactly three concept tags. A tag maps to one card only, every card is targeted, every `reviewCardId` names a card in the same lesson, option IDs/text are unique after normalization, and multiple-choice answer positions are balanced across `a`–`d` with a maximum count difference of one.
- Dialogue, phenomena, examples, distractors, and explanations are original, child-safe, specific, and suitable for independent Grade 4 use. Sandy never claims that an app, animation, model, or widget observed, proved, or generated physical evidence.
- Optional physical investigations use only low-risk household/classroom materials, call for adult help when setup warrants it, and distinguish predicted/model output from observations a learner actually makes. Quiz answers never depend on performing an optional investigation or completing a widget.
- Observable motion and effects may be evidence; energy is inferred from those observations. Energy is never presented as directly visible.
- Preserve every PE boundary. Do not require quantitative energy or acceleration; wave interference, electromagnetic-wave content, non-periodic-wave analysis, retina or cellular mechanisms, microscopic plant/animal structures, specific rock-formation memorization, absolute dating, or hazards outside earthquakes, floods, hurricanes, tornadoes, and coastal erosion.
- `4-PS3-4` devices stay within motion-to-electric conversion or battery-stored energy producing motion, light, or sound. `4-ESS2-1` items vary one form of weathering or erosion at a time.
- Widget narrative says “model,” “try,” or “predict.” Only real observations supplied in a written phenomenon or honestly collected in an optional investigation can be cited as evidence.
- Do not register any new module in `src/content/science/index.ts`; Plan C master performs one atomic final registration after all subject plans are approved.
- Every literal wave must split each lesson into a stated red gate, bounded content edits, answer/widget review, and a green gate containing the focused unit test, permanent schema/content gates, and `npx tsc -b --pretty false`. Every lesson ends in its own exact narrow `git add`/`git commit` command and main-agent curriculum review.

---

## Exact files and interfaces

**Wave ownership:** C3a owns U01–U02 (8 lessons / 104 questions, preserving accepted U01-L01–L03 and supplying 5 new lessons including the complete U02-L01 exemplar); C3b owns U03–U04 (8 new lessons / 104 questions); C3c owns U05–U06 (8 new lessons / 104 questions); C3d owns U07–U08 (8 new lessons / 104 questions). Together they account for 32 lessons / 416 questions, including 3 accepted and 29 new lessons.

**Read only throughout this subject plan:**

- `docs/research/sc-grade4-standards.json`
- `src/content/schema.ts`
- `src/content/curriculum.ts`
- `src/content/content-validation.test.ts`
- `src/content/unit-test-helpers.ts`
- `src/content/science/index.ts`
- `src/widgets/registry.ts`
- `src/widgets/WidgetFrame.tsx`

**Modify:**

- `src/content/science/u01.ts`, `src/content/science/u01.test.ts` for lesson 4 only; preserve accepted lessons 1–3 byte-for-byte.

**Create, then append in lesson order:**

- `src/content/science/u02.ts`, `src/content/science/u02.test.ts`
- `src/content/science/u03.ts`, `src/content/science/u03.test.ts`
- `src/content/science/u04.ts`, `src/content/science/u04.test.ts`
- `src/content/science/u05.ts`, `src/content/science/u05.test.ts`
- `src/content/science/u06.ts`, `src/content/science/u06.test.ts`
- `src/content/science/u07.ts`, `src/content/science/u07.test.ts`
- `src/content/science/u08.ts`, `src/content/science/u08.test.ts`

Every wave produces only its assigned `src/content/science/uNN.ts` exports and matching focused tests. Master Task C1 owns `src/content/curriculum.ts`, `src/content/unit-test-helpers.ts`, and shared schema/validation; master Task C5 alone creates/modifies `src/content/science/index.ts` and `src/content/science/index.test.ts`; master Task C9 owns release. No Science wave creates a helper, index, shared contract, generated file, widget file, or cross-subject file.

Every module produces exactly:

```ts
import type { Lesson } from '../schema';

export const unit02Lessons = [
  {
    id: 'science-u02-l01',
    unitId: 'science-u02',
    title: 'Observe Energy Transfer',
    indicatorCodes: ['4-PS3-2'],
    intro: [
      { speaker: 'sandy', pose: 'talk', text: 'A sunlit card becomes warmer while a shaded card stays cooler.' },
      { speaker: 'sandy', pose: 'think', text: 'What observation could show energy moving from one place to another?' },
      { speaker: 'sandy', pose: 'talk', text: 'We will separate what we notice from the energy idea we infer.' },
      { speaker: 'sandy', pose: 'cheer', text: 'Let’s follow the evidence carefully!' },
    ],
    learnCards: [
      {
        id: 'science-u02-l01-c1',
        title: 'Identify a source and receiver',
        blocks: [
          { kind: 'text', text: 'A transfer description names where energy starts and what receives it.' },
          { kind: 'example', text: 'Light travels from the Sun to a paper square.' },
          { kind: 'tip', text: 'Name both places before explaining the evidence.' },
        ],
      },
      {
        id: 'science-u02-l01-c2',
        title: 'Observe a change',
        blocks: [
          { kind: 'text', text: 'A receiver becoming warmer, brighter, moving, or vibrating can be observed.' },
          { kind: 'example', text: 'The sunlit square feels warmer than the shaded comparison square.' },
          { kind: 'tip', text: 'The temperature word describes an effect; energy transfer is the explanation.' },
        ],
        widget: {
          type: 'energy-transfer-builder',
          config: {
            sources: ['Sun'],
            transfers: ['light'],
            targets: ['paper square'],
            requiredPath: ['Sun', 'light', 'paper square'],
          },
        },
      },
      {
        id: 'science-u02-l01-c3',
        title: 'Use the change as evidence',
        blocks: [
          { kind: 'text', text: 'Compare the receiver before and after, or compare it with an unchanged condition.' },
          { kind: 'example', text: 'The warmer sunlit square supports an explanation that light transferred energy to it.' },
          { kind: 'tip', text: 'The written observation is evidence; the path builder is only a model.' },
        ],
      },
    ],
    workedExample: {
      title: 'Explain the sunlit-card phenomenon',
      steps: [
        'Two matching paper squares begin in the same room.',
        'One is placed in sunlight and later feels warmer than the shaded square.',
        'That observed difference supports an inference that energy moved by light from the Sun to the paper.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'science-u02-l01-q01', type: 'multiple-choice', prompt: 'In the example, what is the energy source?', choices: [{ id: 'a', text: 'The Sun' }, { id: 'b', text: 'The label' }, { id: 'c', text: 'The desk' }, { id: 'd', text: 'The clock' }], correctChoiceId: 'a', explanation: 'The light starts at the Sun.', conceptTag: 'transfer-source-receiver', reviewCardId: 'science-u02-l01-c1' },
        { id: 'science-u02-l01-q02', type: 'true-false', prompt: 'A transfer explanation should identify where energy starts and what receives it.', choices: [{ id: 'true', text: 'True — both places matter' }, { id: 'false', text: 'False — places do not matter' }], correctChoiceId: 'true', explanation: 'Source and receiver describe the transfer path.', conceptTag: 'transfer-source-receiver', reviewCardId: 'science-u02-l01-c1' },
        { id: 'science-u02-l01-q03', type: 'multiple-choice', prompt: 'Which path matches the phenomenon?', choices: [{ id: 'a', text: 'paper to label to Sun' }, { id: 'b', text: 'Sun to light to paper' }, { id: 'c', text: 'desk to clock to shade' }, { id: 'd', text: 'shade to paper to Sun' }], correctChoiceId: 'b', explanation: 'Light carries energy from the Sun to the paper.', conceptTag: 'transfer-source-receiver', reviewCardId: 'science-u02-l01-c1' },
        { id: 'science-u02-l01-q04', type: 'multiple-choice', prompt: 'Which is an observable change?', choices: [{ id: 'a', text: 'Energy became visible' }, { id: 'b', text: 'The Sun chose the paper' }, { id: 'c', text: 'The sunlit paper felt warmer' }, { id: 'd', text: 'The model proved the result' }], correctChoiceId: 'c', explanation: 'Warmer paper is an observable effect.', conceptTag: 'observable-transfer-change', reviewCardId: 'science-u02-l01-c2' },
        { id: 'science-u02-l01-q05', type: 'true-false', prompt: 'Energy itself must be directly visible before transfer can be inferred.', choices: [{ id: 'true', text: 'True — inference is not allowed' }, { id: 'false', text: 'False — observable effects can support an inference' }], correctChoiceId: 'false', explanation: 'Scientists use observed changes as evidence.', conceptTag: 'observable-transfer-change', reviewCardId: 'science-u02-l01-c2' },
        { id: 'science-u02-l01-q06', type: 'multiple-choice', prompt: 'Which comparison is most useful?', choices: [{ id: 'a', text: 'A sunlit square and a matching shaded square' }, { id: 'b', text: 'Different papers in different rooms' }, { id: 'c', text: 'One paper with no comparison' }, { id: 'd', text: 'A paper and a metal spoon' }], correctChoiceId: 'a', explanation: 'Matching squares make the light condition the useful difference.', conceptTag: 'observable-transfer-change', reviewCardId: 'science-u02-l01-c2' },
        { id: 'science-u02-l01-q07', type: 'multiple-choice', prompt: 'What does the path builder provide?', choices: [{ id: 'a', text: 'A physical temperature reading' }, { id: 'b', text: 'A model of a possible transfer path' }, { id: 'c', text: 'Proof from a real investigation' }, { id: 'd', text: 'An exact energy amount' }], correctChoiceId: 'b', explanation: 'The widget represents ideas; it does not collect evidence.', conceptTag: 'observable-transfer-change', reviewCardId: 'science-u02-l01-c2' },
        { id: 'science-u02-l01-q08', type: 'multiple-choice', prompt: 'Which statement correctly separates observation and inference?', choices: [{ id: 'a', text: 'Observation: energy is visible; inference: paper exists' }, { id: 'b', text: 'Observation: model finished; inference: the model is evidence' }, { id: 'c', text: 'Observation: paper is square; inference: every square warms' }, { id: 'd', text: 'Observation: paper felt warmer; inference: light transferred energy' }], correctChoiceId: 'd', explanation: 'The warmth is observed and energy transfer is inferred.', conceptTag: 'transfer-evidence', reviewCardId: 'science-u02-l01-c3' },
        { id: 'science-u02-l01-q09', type: 'true-false', prompt: 'A written before-and-after temperature description can provide evidence about transfer by heat or light.', choices: [{ id: 'true', text: 'True — the change can be compared' }, { id: 'false', text: 'False — observations cannot be evidence' }], correctChoiceId: 'true', explanation: 'A described change can support a qualitative transfer explanation.', conceptTag: 'transfer-evidence', reviewCardId: 'science-u02-l01-c3' },
        { id: 'science-u02-l01-q10', type: 'multiple-choice', prompt: 'Which claim is supported by the warmer sunlit square?', choices: [{ id: 'a', text: 'The label created energy' }, { id: 'b', text: 'The shaded paper made sunlight' }, { id: 'c', text: 'Light transferred energy from the Sun to the paper' }, { id: 'd', text: 'The exact energy amount is known' }], correctChoiceId: 'c', explanation: 'The observed warming supports a qualitative transfer claim.', conceptTag: 'transfer-evidence', reviewCardId: 'science-u02-l01-c3' },
        { id: 'science-u02-l01-q11', type: 'fill-blank', prompt: 'Complete the evidence sentence: The sunlit paper felt ___ than the shaded paper.', acceptedAnswers: ['warmer'], explanation: 'Warmer names the observed comparison.', conceptTag: 'transfer-evidence', reviewCardId: 'science-u02-l01-c3' },
        { id: 'science-u02-l01-q12', type: 'multiple-choice', prompt: 'Which detail is not evidence of transfer?', choices: [{ id: 'a', text: 'The sunlit paper became warmer' }, { id: 'b', text: 'The shaded paper stayed cooler' }, { id: 'c', text: 'The two papers began in the same room' }, { id: 'd', text: 'The paper had a blue star printed on it' }], correctChoiceId: 'd', explanation: 'A printed star does not describe a transfer effect.', conceptTag: 'transfer-evidence', reviewCardId: 'science-u02-l01-c3' },
        { id: 'science-u02-l01-q13', type: 'multiple-choice', prompt: 'Why can the model not be cited as physical evidence?', choices: [{ id: 'a', text: 'Models never help thinking' }, { id: 'b', text: 'It represents a path but does not make a real-world observation' }, { id: 'c', text: 'It uses too few colors' }, { id: 'd', text: 'It has no written labels' }], correctChoiceId: 'b', explanation: 'Evidence comes from observations, while the widget represents the explanation.', conceptTag: 'transfer-evidence', reviewCardId: 'science-u02-l01-c3' },
      ],
    },
  },
] satisfies Lesson[];
```

The full exemplar above is the minimum implementation pattern: literal content, no generated question factory, no unfilled fields, and no empty collection. Every later task supplies its exact manifest row and must author the same complete object shape with original lesson-specific prose and answer data.

Each unit test consumes `validateLesson`, `Question`, its unit export, and the Plan C helper. Its complete permanent pattern is:

```ts
import { describe, expect, test } from 'vitest';
import { validateLesson, WidgetRefSchema, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit02Lessons } from './u02';

const expected = [
  { id: 'science-u02-l01', title: 'Observe Energy Transfer', indicatorCodes: ['4-PS3-2'] },
] as const;

const visibleText = (question: Question): string[] => {
  if ('choices' in question) return question.choices.map(({ text }) => text);
  if ('items' in question) return question.items.map(({ text }) => text);
  return question.acceptedAnswers;
};

describe('Science unit 2 content', () => {
  test('matches its reviewed manifest and permanent lesson contract', () => {
    expectUnitLessons(unit02Lessons, expected, 'science');
    for (const lesson of unit02Lessons) {
      expect(validateLesson(lesson)).toHaveLength(0);
      expect(lesson.intro).toHaveLength(4);
      expect(lesson.intro.every(({ speaker }) => speaker === 'sandy')).toBe(true);
      expect(lesson.learnCards).toHaveLength(3);
      expect(lesson.quiz.pool).toHaveLength(13);
      expect(new Set(lesson.quiz.pool.map(({ type }) => type)).size).toBeGreaterThanOrEqual(2);
      expect(new Set(lesson.quiz.pool.map(({ reviewCardId }) => reviewCardId))).toEqual(
        new Set(lesson.learnCards.map(({ id }) => id)),
      );
      for (const card of lesson.learnCards) {
        if (card.widget) expect(WidgetRefSchema.safeParse(card.widget).success).toBe(true);
      }
      for (const question of lesson.quiz.pool) {
        const normalized = visibleText(question).map((text) => text.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' '));
        expect(new Set(normalized).size).toBe(normalized.length);
      }
    }
  });
});
```

When a lesson is appended, append its exact row to `expected`; never make the test anticipate a not-yet-authored lesson. Unit 1 retains its stronger accepted regression tests and adds lesson 4 to their expected data.

## Manifest notation

- `MC` = `multiple-choice`; `TF` = `true-false`; `FB` = `fill-blank`; `SORT` = `sort`.
- A question entry such as `q01 MC c1` fixes the exact question ID/type/review card and also fixes the tag to the one exact tag declared for c1 in that row. Thus `q01 MC c1` is fully equivalent to `q01 MC c1/<the row's declared c1 tag>` and leaves no tag choice to the author. The task authors the prompt, unique options/items or accepted answers, answer key/order, and one-sentence explanation around that exact allocation.
- A widget entry is the complete `widget` value on the named card. `none` means omit the property entirely.

## Exact 32-lesson Science manifest

### Unit 1 — Energy and Motion

1. `science-u01-l01` / `science-u01` / **Speed and an Object's Energy** / `['4-PS3-1']`. Cards: c1 **Describe speed with observations** / `qualitative-speed`; c2 **Make a fair speed comparison** / `fair-speed-comparison`; c3 **Relate faster motion to more energy** / `speed-energy-relationship`. Questions: q01 MC c1, q02 MC c1, q03 MC c1, q04 MC c2, q05 MC c2, q06 MC c2, q07 MC c3, q08 MC c3, q09 TF c3, q10 MC c3, q11 TF c2, q12 MC c3, q13 TF c1. Widget: none. Accepted existing work.
2. `science-u01-l02` / `science-u01` / **Explain Speed and Energy with Evidence** / `['4-PS3-1']`. Cards: c1 **Choose relevant evidence** / `relevant-speed-evidence`; c2 **Use reasoning to connect the ideas** / `evidence-energy-reasoning`; c3 **Construct a complete explanation** / `complete-energy-explanation`. Questions: q01 MC c1, q02 MC c1, q03 MC c1, q04 MC c2, q05 MC c2, q06 MC c2, q07 MC c3, q08 MC c3, q09 TF c3, q10 MC c1, q11 TF c1, q12 MC c2, q13 TF c3. Widget: none. Accepted existing work.
3. `science-u01-l03` / `science-u01` / **Ask Questions About Collisions** / `['4-PS3-3']`. Cards: c1 **Notice changes during a collision** / `collision-motion-changes`; c2 **Ask a testable collision question** / `testable-collision-questions`; c3 **Predict a qualitative outcome** / `qualitative-collision-predictions`. Questions: q01 MC c1, q02 MC c1, q03 MC c1, q04 MC c2, q05 MC c2, q06 MC c2, q07 MC c3, q08 MC c3, q09 TF c3, q10 MC c1, q11 TF c2, q12 MC c2, q13 TF c1. Widget: none. Accepted existing work.
4. `science-u01-l04` / `science-u01` / **Predict Collision Energy Outcomes** / `['4-PS3-3']`. Cards: c1 **Read before-and-after motion** / `collision-motion-evidence`; c2 **Make a fair collision prediction** / `collision-outcome-prediction`; c3 **Infer energy change from motion** / `collision-energy-inference`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 MC c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget on c2: `{ type: 'collision-ramp', config: { rampAngle: 5, massA: 2, massB: 8, speedA: 1, target: 'predict-direction' } }`.

### Unit 2 — Energy on the Move: Transfer by Sound, Light, Heat, and Electricity

5. `science-u02-l01` / `science-u02` / **Observe Energy Transfer** / `['4-PS3-2']`. Cards: c1 **Identify a source and receiver** / `transfer-source-receiver`; c2 **Observe a change** / `observable-transfer-change`; c3 **Use the change as evidence** / `transfer-evidence`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 MC c2, q05 TF c2, q06 MC c2, q07 MC c2, q08 MC c3, q09 TF c3, q10 MC c3, q11 FB c3, q12 MC c3, q13 MC c3. Widget on c2: `{ type: 'energy-transfer-builder', config: { sources: ['Sun'], transfers: ['light'], targets: ['paper square'], requiredPath: ['Sun', 'light', 'paper square'] } }`.
6. `science-u02-l02` / `science-u02` / **Use Sound and Light as Evidence** / `['4-PS3-2']`. Cards: c1 **Track sound from a source** / `sound-transfer-path`; c2 **Track light from a source** / `light-transfer-path`; c3 **Compare observable effects** / `sound-light-evidence`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 MC c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 FB c3, q13 MC c3. Widget on c1: `{ type: 'energy-transfer-builder', config: { sources: ['tuning fork'], transfers: ['sound'], targets: ['paper bits'], requiredPath: ['tuning fork', 'sound', 'paper bits'] } }`.
7. `science-u02-l03` / `science-u02` / **Use Heat and Electric Current as Evidence** / `['4-PS3-2']`. Cards: c1 **Notice transfer by heat** / `heat-transfer-evidence`; c2 **Follow an electric-current path** / `electric-transfer-path`; c3 **Separate transfer from effect** / `transfer-effect-reasoning`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 MC c3. Widget on c2: `{ type: 'energy-transfer-builder', config: { sources: ['battery'], transfers: ['electric current'], targets: ['motor'], requiredPath: ['battery', 'electric current', 'motor'] } }`.
8. `science-u02-l04` / `science-u02` / **Compare Energy Transfer Observations** / `['4-PS3-2']`. Cards: c1 **Organize four transfer cases** / `transfer-case-features`; c2 **Choose relevant observations** / `relevant-transfer-observations`; c3 **Build a comparison claim** / `transfer-comparison-claim`. Questions: q01 MC c1, q02 SORT c1, q03 MC c1, q04 TF c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget: none.

### Unit 3 — Waves and Light

9. `science-u03-l01` / `science-u03` / **Model Wave Amplitude Patterns** / `['4-PS4-1']`. Cards: c1 **Recognize a repeating wave** / `repeating-wave-model`; c2 **Compare small and large amplitude** / `amplitude-pattern`; c3 **Explain what the model represents** / `wave-model-limits`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 MC c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 FB c3, q13 MC c3. Widget on c2: `{ type: 'wave-maker', config: { medium: 'rope', amplitude: 2, frequency: 2, target: { amplitude: 4 } } }`.
10. `science-u03-l02` / `science-u03` / **Describe Wavelength Patterns** / `['4-PS4-1']`. Cards: c1 **Find matching points on waves** / `wavelength-reference-points`; c2 **Compare shorter and longer wavelengths** / `wavelength-comparison`; c3 **Use a qualitative wave model** / `wavelength-model-boundary`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 MC c3. Widget: none; Plan B's frequency control is not a wavelength control.
11. `science-u03-l03` / `science-u03` / **Model Waves Moving Objects** / `['4-PS4-1']`. Cards: c1 **Observe an object at the surface** / `wave-object-observation`; c2 **Model motion caused by waves** / `wave-caused-motion`; c3 **Connect patterns without overclaiming** / `wave-motion-model-limits`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 MC c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 FB c3, q13 MC c3. Widget on c2: `{ type: 'wave-maker', config: { medium: 'water', amplitude: 2, frequency: 2, target: { amplitude: 3, frequency: 3 } } }`.
12. `science-u03-l04` / `science-u03` / **Model Reflected Light Entering the Eye** / `['4-PS4-2']`. Cards: c1 **Trace light to an object** / `light-to-object`; c2 **Trace reflected light to the eye** / `reflected-light-path`; c3 **Explain seeing with a model** / `seeing-cause-effect-model`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 MC c1, q05 MC c2, q06 SORT c2, q07 MC c2, q08 TF c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget on c2: `{ type: 'light-reflection-eye', config: { incidentAngle: 25, targetAngle: 30, showEye: true } }`.

### Unit 4 — Sending Messages: Patterns and Information Transfer

13. `science-u04-l01` / `science-u04` / **Build Two-Value Message Patterns** / `['4-PS4-3']`. Cards: c1 **Define two signal values** / `two-value-code`; c2 **Encode a short message** / `encode-pattern`; c3 **Check whether a receiver can decode** / `decode-pattern`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 SORT c2, q07 MC c2, q08 TF c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 MC c3. Widget on c2: `{ type: 'message-sender', config: { encoding: 'binary', message: 'A' } }`.
14. `science-u04-l02` / `science-u04` / **Design Morse and Drum Codes** / `['4-PS4-3']`. Cards: c1 **Use dots and dashes** / `morse-pattern`; c2 **Use two drum sounds** / `drum-pattern`; c3 **Compare code clarity** / `code-clarity-comparison`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget on c1: `{ type: 'message-sender', config: { encoding: 'morse', message: 'A' } }`.
15. `science-u04-l03` / `science-u04` / **Send Binary-Grid Picture Messages** / `['4-PS4-3']`. Cards: c1 **Assign black and white values** / `binary-grid-values`; c2 **Read rows in a shared order** / `binary-grid-order`; c3 **Find and repair a mismatch** / `binary-grid-debugging`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 SORT c2, q07 MC c2, q08 TF c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 MC c3. Widget: none; the Plan B sender encodes text, not picture grids.
16. `science-u04-l04` / `science-u04` / **Compare Message Solutions** / `['4-PS4-3']`. Cards: c1 **Name comparison criteria** / `message-criteria`; c2 **Test accuracy and efficiency** / `message-solution-evidence`; c3 **Choose and justify a solution** / `message-solution-choice`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget: none.

### Unit 5 — Energy Conversion Design Challenge

17. `science-u05-l01` / `science-u05` / **Trace Allowed Energy Conversions** / `['4-PS3-4']`. Cards: c1 **Name input and output forms** / `conversion-input-output`; c2 **Trace a connected conversion chain** / `conversion-chain`; c3 **Stay within device limits** / `conversion-device-boundary`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 SORT c2, q07 MC c2, q08 TF c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 MC c3. Widget on c2: `{ type: 'energy-conversion-designer', config: { components: [{ id: 'crank', label: 'Hand crank', energyIn: 'motion', energyOut: 'electric' }, { id: 'buzzer', label: 'Buzzer', energyIn: 'electric', energyOut: 'sound' }], requiredStart: 'crank', requiredEnd: 'buzzer' } }`.
18. `science-u05-l02` / `science-u05` / **Plan a Device with Constraints** / `['4-PS3-4']`. Cards: c1 **Define the device goal** / `device-goal`; c2 **Choose materials under constraints** / `device-constraints`; c3 **Draw a testable plan** / `device-test-plan`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 SORT c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 MC c3. Widget on c2: `{ type: 'energy-conversion-designer', config: { components: [{ id: 'battery', label: 'Battery', energyIn: 'stored', energyOut: 'electric' }, { id: 'lamp', label: 'Lamp', energyIn: 'electric', energyOut: 'light' }], requiredStart: 'battery', requiredEnd: 'lamp' } }`.
19. `science-u05-l03` / `science-u05` / **Test an Energy-Conversion Device** / `['4-PS3-4']`. Cards: c1 **Write a fair test procedure** / `device-test-procedure`; c2 **Record observable results** / `device-test-observations`; c3 **Judge the device against its goal** / `device-test-judgment`. Questions: q01 MC c1, q02 SORT c1, q03 TF c1, q04 MC c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 FB c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 MC c3. Widget: none; a widget result is not device-test evidence.
20. `science-u05-l04` / `science-u05` / **Refine a Device Using Test Evidence** / `['4-PS3-4']`. Cards: c1 **Find a result that misses the goal** / `refinement-need`; c2 **Change one design feature** / `single-design-change`; c3 **Compare the retest with the first test** / `refinement-evidence`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 SORT c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 MC c3. Widget: none.

### Unit 6 — Structures for Survival: Plants and Animals

21. `science-u06-l01` / `science-u06` / **Explain Plant Structures as a System** / `['4-LS1-1']`. Cards: c1 **Identify visible plant structures** / `plant-structures`; c2 **Connect structures and functions** / `plant-structure-functions`; c3 **Argue how structures work together** / `plant-system-argument`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget: none.
22. `science-u06-l02` / `science-u06` / **Explain Animal Structures as a System** / `['4-LS1-1']`. Cards: c1 **Identify internal and external structures** / `animal-structures`; c2 **Match structures to functions** / `animal-structure-functions`; c3 **Explain a cooperating system** / `animal-system-explanation`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget on c2: `{ type: 'animal-structure-matcher', config: { pairs: [{ id: 'beak', animal: 'wren', structure: 'beak', function: 'gathers food' }, { id: 'wing', animal: 'wren', structure: 'wing', function: 'moves through air' }] } }`.
23. `science-u06-l03` / `science-u06` / **Argue How Structures Support Survival** / `['4-LS1-1']`. Cards: c1 **State a structure-system claim** / `structure-claim`; c2 **Select relevant survival evidence** / `structure-evidence`; c3 **Connect evidence with reasoning** / `structure-argument`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget: none.
24. `science-u06-l04` / `science-u06` / **Model Sense, Brain, and Response** / `['4-LS1-2']`. Cards: c1 **Receive information through senses** / `sense-input`; c2 **Route information through the brain** / `brain-processing-model`; c3 **Connect information to a response** / `sense-response-system`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 SORT c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget: none.

### Unit 7 — Earth's Features and Changing Landscapes

25. `science-u07-l01` / `science-u07` / **Find Earth-Feature Patterns on Maps** / `['4-ESS2-2']`. Cards: c1 **Read a map key and elevation** / `map-data-reading`; c2 **Recognize clustered and linear patterns** / `earth-feature-patterns`; c3 **Describe a pattern from data** / `map-pattern-claim`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget on c1: `{ type: 'topographic-map-explorer', config: { contours: [{ elevation: 100, points: '10,90 50,60 90,90' }, { elevation: 200, points: '25,75 50,45 75,75' }], points: [{ id: 'ridge', label: 'Ridge', elevation: 200 }, { id: 'valley', label: 'Valley', elevation: 100 }], targetPointId: 'ridge' } }`.
26. `science-u07-l02` / `science-u07` / **Interpret Earth-Feature Map Data** / `['4-ESS2-2']`. Cards: c1 **Compare elevations and locations** / `map-data-comparison`; c2 **Connect several data points** / `multi-point-pattern`; c3 **Support an interpretation** / `map-interpretation-evidence`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget on c2: `{ type: 'topographic-map-explorer', config: { contours: [{ elevation: 0, points: '5,80 50,70 95,80' }, { elevation: 50, points: '20,60 50,50 80,60' }], points: [{ id: 'coast', label: 'Coast', elevation: 0 }, { id: 'hill', label: 'Hill', elevation: 50 }], targetPointId: 'coast' } }`.
27. `science-u07-l03` / `science-u07` / **Test a Weathering or Erosion Variable** / `['4-ESS2-1']`. Cards: c1 **Choose one process and variable** / `single-process-variable`; c2 **Plan a fair comparison** / `erosion-fair-test`; c3 **Use observations as evidence** / `erosion-observation-evidence`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 SORT c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget on c2: `{ type: 'erosion-simulator', config: { terrain: 'soil', agents: ['water'], vegetation: false, targetAgent: 'water' } }`.
28. `science-u07-l04` / `science-u07` / **Use Rock Layers and Fossils as Change Evidence** / `['4-ESS1-1']`. Cards: c1 **Read relative layer order** / `relative-layer-order`; c2 **Find patterns in fossils and layers** / `rock-fossil-patterns`; c3 **Explain landscape change over time** / `landscape-change-explanation`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 SORT c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget on c2: `{ type: 'rock-layer-explorer', config: { layers: [{ id: 'upper-shells', label: 'Upper shell layer', age: 1, artifact: 'marine shell fossils' }, { id: 'lower-plants', label: 'Lower plant layer', age: 2, artifact: 'plant fossils without shells' }], prompt: 'Which layer is relatively older?', targetLayerId: 'lower-plants' } }`.

### Unit 8 — Natural Resources, Natural Hazards, and Human Solutions

29. `science-u08-l01` / `science-u08` / **Trace Energy and Fuels to Natural Resources** / `['4-ESS3-1']`. Cards: c1 **Name resource origins** / `resource-origin`; c2 **Classify renewable and nonrenewable resources** / `resource-kind`; c3 **Combine information from sources** / `resource-information`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget on c2: `{ type: 'resource-sorter', config: { items: [{ id: 'sun', label: 'Sunlight', kind: 'renewable' }, { id: 'coal', label: 'Coal', kind: 'nonrenewable' }], bins: ['renewable', 'nonrenewable'] } }`.
30. `science-u08-l02` / `science-u08` / **Explain Environmental Effects of Resource Use** / `['4-ESS3-1']`. Cards: c1 **Connect a resource to its use** / `resource-use`; c2 **Describe an environmental effect** / `resource-environment-effect`; c3 **Compare choices using evidence** / `resource-choice-comparison`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget on c1: `{ type: 'resource-sorter', config: { items: [{ id: 'wind', label: 'Wind', kind: 'renewable' }, { id: 'oil', label: 'Oil', kind: 'nonrenewable' }, { id: 'save', label: 'Use less electricity', kind: 'conserve' }], bins: ['renewable', 'nonrenewable', 'conserve'] } }`.
31. `science-u08-l03` / `science-u08` / **Describe Natural-Process Hazards** / `['4-ESS3-2']`. Cards: c1 **Connect a process to a hazard** / `hazard-cause-effect`; c2 **Identify impacts on people** / `hazard-human-impact`; c3 **Match a solution to an impact** / `hazard-impact-solution`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget on c3: `{ type: 'hazard-solution-designer', config: { hazard: 'Hurricane', solutions: [{ id: 'shutters', label: 'Storm shutters', effectiveness: 'good' }, { id: 'warnings', label: 'Early warnings', effectiveness: 'good' }, { id: 'ignore', label: 'Ignore forecasts', effectiveness: 'poor' }], requiredIds: ['shutters', 'warnings'] } }`.
32. `science-u08-l04` / `science-u08` / **Compare Hazard-Impact Solutions** / `['4-ESS3-2']`. Cards: c1 **Define criteria for a solution** / `hazard-solution-criteria`; c2 **Compare strengths and limits** / `hazard-solution-comparison`; c3 **Justify a combined plan** / `hazard-solution-justification`. Questions: q01 MC c1, q02 TF c1, q03 MC c1, q04 FB c1, q05 MC c2, q06 TF c2, q07 MC c2, q08 MC c2, q09 MC c3, q10 TF c3, q11 MC c3, q12 MC c3, q13 FB c3. Widget on c2: `{ type: 'hazard-solution-designer', config: { hazard: 'Flood', solutions: [{ id: 'waterway', label: 'Floodwater channel', effectiveness: 'good' }, { id: 'warning', label: 'Flood warning', effectiveness: 'good' }, { id: 'block', label: 'Block every drain', effectiveness: 'poor' }], requiredIds: ['waterway', 'warning'] } }`.

## PE fidelity matrix

| PE | Lessons | Required practice and content | Clarification and assessment boundary carried into cards, examples, and questions |
|---|---|---|---|
| `4-PS3-1` | u01 l01–l02 | Use observations to construct an explanation relating an object's speed to its energy. | Qualitative same-object comparisons only; no precise speed change or quantitative energy definition. |
| `4-PS3-2` | u02 l01–l04 | Make observations that support transfer by sound, light, heat, and electric currents. | Qualitative observations only; do not assess transfer-versus-transformation terminology. |
| `4-PS3-3` | u01 l03–l04 | Ask testable questions and predict collision outcomes from motion changes. | Emphasize energy change due to speed change, not force; no acceleration or quantitative energy. |
| `4-PS3-4` | u05 l01–l04 | Apply ideas to design, test, and refine within material, cost, or time constraints. | Only motion-to-electric or battery-to-motion/light/sound devices. A model supplies design thinking, never test evidence. |
| `4-PS4-1` | u03 l01–l03 | Develop qualitative models for amplitude, wavelength, and object motion caused by waves. | No interference, electromagnetic or non-periodic waves, or quantitative amplitude/wavelength. |
| `4-PS4-2` | u03 l04 | Model light reflecting from objects and entering the eye so objects are seen. | No specific reflected-color knowledge, retina, or cellular vision mechanisms. |
| `4-PS4-3` | u04 l01–l04 | Generate and compare pattern-based information solutions. | Codes use exactly two possible values and need not be electronic or digital. |
| `4-LS1-1` | u06 l01–l03 | Construct an evidence-based argument that internal/external structures function together for survival, growth, behavior, and reproduction. | Use visible/macroscopic structures such as roots, thorns, heart, lungs, skin; exclude microscopic structures. |
| `4-LS1-2` | u06 l04 | Model senses receiving information, brain processing it, and different responses. | Focus on system-level information transfer; exclude memory-storage and sensory-receptor mechanisms. |
| `4-ESS1-1` | u07 l04 | Identify fossil/layer patterns as evidence for landscape change over relative time. | No rock-formation mechanism, named-layer memorization, or absolute ages. |
| `4-ESS2-1` | u07 l03 | Observe or measure effects of one weathering/erosion form and one varied condition. | A question/attempt is limited to a single weathering or erosion form. |
| `4-ESS2-2` | u07 l01–l02 | Analyze and interpret map data to describe Earth-feature patterns. | Use topographic/elevation and feature-location data; do not infer unsupported causal mechanisms from a pattern. |
| `4-ESS3-1` | u08 l01–l02 | Obtain and combine information about natural-resource origins and environmental effects of use. | Renewable examples include wind, dammed water, sunlight; nonrenewable examples include fossil and nuclear fuels. |
| `4-ESS3-2` | u08 l03–l04 | Generate and compare solutions that reduce human impacts of named natural processes. | Only earthquakes, floods, hurricanes, tornadoes, and coastal erosion. |

## Task 0: Revalidate accepted Unit 1 lessons 1–3

**Files:** Read only `src/content/science/u01.ts`, `src/content/science/u01.test.ts`; compare commits `7b7648c` and `5f5c61e`.

**Interfaces:** Consumes accepted `unit01Lessons: Lesson[]`. Produces a recorded main-agent checkpoint that the first three manifest rows still match, all accepted regression tests pass, and lesson 4 can be appended without changing them.

- [ ] **Step 1: Verify exact accepted content and diff boundary**

Run:

```bash
git diff 5f5c61e -- src/content/science/u01.ts src/content/science/u01.test.ts
git show 5f5c61e:src/content/science/u01.ts | rg -c "id: 'science-u01-l0[1-3]'"
```

Expected: no diff and count `3`.

- [ ] **Step 2: Run the accepted and permanent gates**

```bash
npm test -- src/content/science/u01.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false
```

Expected: PASS. Main agent records a checkpoint; no commit is made.

## Per-lesson TDD protocol

Every Task 1–29 below uses these exact five steps; the task row supplies the exact files, interface, manifest data, widget, PE boundary, and commit command.

- [ ] **Step 1: Write the failing focused expectation.** For the first lesson in Units 2–8, create the unit test from the permanent pattern and import the missing module. For an appended lesson, add exactly its `{ id, title, indicatorCodes }` row to `expected`, assert its three exact titles/tags/type distribution/widget value from the manifest, and leave implementation unchanged.
- [ ] **Step 2: Run red.** Run the task's focused `npm test -- src/content/science/uNN.test.ts`. Expected: first lesson fails with module-not-found; appended lesson fails because the expected row or exact content is absent.
- [ ] **Step 3: Author the minimal complete literal.** Create or append one literal `Lesson` object in manifest order, following the complete exemplar and exact manifest row. Include all four intro lines, three cards and rich blocks, worked example, 13 complete questions with answer data and explanations, and only the exact optional widget. Do not edit previously approved objects.
- [ ] **Step 4: Run green and review.** Run the task's exact green command. Expected: PASS. Main agent compares every prompt/answer/explanation against the verbatim PE and its boundary, checks phenomenon originality and child safety, checks balanced MC keys, checks tag/card mapping, validates the widget literal against final `WidgetRefSchema`, and confirms the diff contains only the task's unit source/test.
- [ ] **Step 5: Commit exactly.** Stage only the two task files and use the exact commit command. Stop if the main-agent checkpoint rejects standard fidelity or answer correctness.

## Lesson tasks

### Task 1: Author science-u01-l04 — Predict Collision Energy Outcomes

**Files:** Modify `src/content/science/u01.ts`, `src/content/science/u01.test.ts`.
**Interfaces:** Consume accepted 3-lesson `unit01Lessons`; produce 4 lessons in manifest order. Preserve rows 1–3 exactly. Use manifest row 4, the collision widget on c2, and the `4-PS3-3` qualitative collision boundary.
**Green:** `npm test -- src/content/science/u01.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u01.ts src/content/science/u01.test.ts && git commit -m "feat(content): complete science unit 1 collisions"`

### Task 2: Author science-u02-l01 — Observe Energy Transfer

**Files:** Create `src/content/science/u02.ts`, `src/content/science/u02.test.ts`.
**Interfaces:** Produce `unit02Lessons: Lesson[]` with manifest row 5, exact c2 energy-transfer widget, and `4-PS3-2` observation-versus-inference boundary. Use the full implementation/test exemplar verbatim only as the starting literal, then main-agent review may improve wording without changing the manifest.
**Green:** `npm test -- src/content/science/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u02.ts src/content/science/u02.test.ts && git commit -m "feat(content): start science energy transfer unit"`

### Task 3: Author science-u02-l02 — Use Sound and Light as Evidence

**Files:** Modify `src/content/science/u02.ts`, `src/content/science/u02.test.ts`.
**Interfaces:** Append manifest row 6. Teach both sound and light evidence; use the exact sound-path widget on c1 as a model only.
**Green:** `npm test -- src/content/science/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u02.ts src/content/science/u02.test.ts && git commit -m "feat(content): teach sound and light transfer evidence"`

### Task 4: Author science-u02-l03 — Use Heat and Electric Current as Evidence

**Files:** Modify `src/content/science/u02.ts`, `src/content/science/u02.test.ts`.
**Interfaces:** Append manifest row 7. Teach qualitative heat and electric-current evidence; use the exact battery-current-motor path on c2 and do not assess transfer-versus-transformation vocabulary.
**Green:** `npm test -- src/content/science/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u02.ts src/content/science/u02.test.ts && git commit -m "feat(content): teach heat and current transfer evidence"`

### Task 5: Author science-u02-l04 — Compare Energy Transfer Observations

**Files:** Modify `src/content/science/u02.ts`, `src/content/science/u02.test.ts`.
**Interfaces:** Append manifest row 8 and complete Unit 2. Compare all four transfer routes from supplied qualitative observations; omit a widget.
**Green:** `npm test -- src/content/science/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u02.ts src/content/science/u02.test.ts && git commit -m "feat(content): complete science energy transfer unit"`

### Task 6: Author science-u03-l01 — Model Wave Amplitude Patterns

**Files:** Create `src/content/science/u03.ts`, `src/content/science/u03.test.ts`.
**Interfaces:** Produce `unit03Lessons: Lesson[]` with manifest row 9 and exact amplitude-target wave widget on c2. The widget is qualitative; no numeric amplitude calculation is assessed.
**Green:** `npm test -- src/content/science/u03.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u03.ts src/content/science/u03.test.ts && git commit -m "feat(content): start science waves unit"`

### Task 7: Author science-u03-l02 — Describe Wavelength Patterns

**Files:** Modify `src/content/science/u03.ts`, `src/content/science/u03.test.ts`.
**Interfaces:** Append manifest row 10. Teach wavelength as spacing between matching points with diagrams described in prose; omit the frequency-only widget and all quantitative measurement.
**Green:** `npm test -- src/content/science/u03.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u03.ts src/content/science/u03.test.ts && git commit -m "feat(content): teach qualitative wavelength patterns"`

### Task 8: Author science-u03-l03 — Model Waves Moving Objects

**Files:** Modify `src/content/science/u03.ts`, `src/content/science/u03.test.ts`.
**Interfaces:** Append manifest row 11 and exact water wave widget on c2. Written phenomena provide observations; the widget represents wave settings and never supplies evidence.
**Green:** `npm test -- src/content/science/u03.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u03.ts src/content/science/u03.test.ts && git commit -m "feat(content): model waves moving objects"`

### Task 9: Author science-u03-l04 — Model Reflected Light Entering the Eye

**Files:** Modify `src/content/science/u03.ts`, `src/content/science/u03.test.ts`.
**Interfaces:** Append manifest row 12 and complete Unit 3. Use exact reflection widget on c2; model the causal path light source → object → eye without colors or internal eye mechanisms.
**Green:** `npm test -- src/content/science/u03.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u03.ts src/content/science/u03.test.ts && git commit -m "feat(content): complete science waves and light unit"`

### Task 10: Author science-u04-l01 — Build Two-Value Message Patterns

**Files:** Create `src/content/science/u04.ts`, `src/content/science/u04.test.ts`.
**Interfaces:** Produce `unit04Lessons: Lesson[]` with manifest row 13 and exact binary sender on c2. Every code uses two possible values and a shared reading order.
**Green:** `npm test -- src/content/science/u04.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u04.ts src/content/science/u04.test.ts && git commit -m "feat(content): start science messages unit"`

### Task 11: Author science-u04-l02 — Design Morse and Drum Codes

**Files:** Modify `src/content/science/u04.ts`, `src/content/science/u04.test.ts`.
**Interfaces:** Append manifest row 14 and exact Morse sender on c1. Compare a dot/dash text code with two drum sounds without claiming either must be digital.
**Green:** `npm test -- src/content/science/u04.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u04.ts src/content/science/u04.test.ts && git commit -m "feat(content): teach Morse and drum codes"`

### Task 12: Author science-u04-l03 — Send Binary-Grid Picture Messages

**Files:** Modify `src/content/science/u04.ts`, `src/content/science/u04.test.ts`.
**Interfaces:** Append manifest row 15. Use black/white as two values and an exact row-reading procedure; omit the text-only sender widget.
**Green:** `npm test -- src/content/science/u04.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u04.ts src/content/science/u04.test.ts && git commit -m "feat(content): teach binary picture messages"`

### Task 13: Author science-u04-l04 — Compare Message Solutions

**Files:** Modify `src/content/science/u04.ts`, `src/content/science/u04.test.ts`.
**Interfaces:** Append manifest row 16 and complete Unit 4. Compare at least two supplied code solutions on accuracy, clarity, and number of signals; omit a widget.
**Green:** `npm test -- src/content/science/u04.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u04.ts src/content/science/u04.test.ts && git commit -m "feat(content): complete science messages unit"`

### Task 14: Author science-u05-l01 — Trace Allowed Energy Conversions

**Files:** Create `src/content/science/u05.ts`, `src/content/science/u05.test.ts`.
**Interfaces:** Produce `unit05Lessons: Lesson[]` with manifest row 17 and exact hand-crank-to-buzzer conversion widget on c2. Stay within motion-to-electric-to-sound.
**Green:** `npm test -- src/content/science/u05.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u05.ts src/content/science/u05.test.ts && git commit -m "feat(content): start science energy conversion unit"`

### Task 15: Author science-u05-l02 — Plan a Device with Constraints

**Files:** Modify `src/content/science/u05.ts`, `src/content/science/u05.test.ts`.
**Interfaces:** Append manifest row 18 and exact battery-to-lamp widget on c2. Provide concrete material, time, and cost constraints and a testable success criterion.
**Green:** `npm test -- src/content/science/u05.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u05.ts src/content/science/u05.test.ts && git commit -m "feat(content): plan constrained energy devices"`

### Task 16: Author science-u05-l03 — Test an Energy-Conversion Device

**Files:** Modify `src/content/science/u05.ts`, `src/content/science/u05.test.ts`.
**Interfaces:** Append manifest row 19. Use supplied observations or an optional adult-supervised low-voltage battery device; omit a widget and never portray a model result as test data.
**Green:** `npm test -- src/content/science/u05.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u05.ts src/content/science/u05.test.ts && git commit -m "feat(content): test energy conversion devices"`

### Task 17: Author science-u05-l04 — Refine a Device Using Test Evidence

**Files:** Modify `src/content/science/u05.ts`, `src/content/science/u05.test.ts`.
**Interfaces:** Append manifest row 20 and complete Unit 5. Change one design feature, compare first/retest observations, and stay within allowed conversion endpoints.
**Green:** `npm test -- src/content/science/u05.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u05.ts src/content/science/u05.test.ts && git commit -m "feat(content): complete science energy conversion unit"`

### Task 18: Author science-u06-l01 — Explain Plant Structures as a System

**Files:** Create `src/content/science/u06.ts`, `src/content/science/u06.test.ts`.
**Interfaces:** Produce `unit06Lessons: Lesson[]` with manifest row 21. Use roots, stems, leaves, flowers, and thorns at whole-organism scale; omit a widget.
**Green:** `npm test -- src/content/science/u06.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u06.ts src/content/science/u06.test.ts && git commit -m "feat(content): start science structures unit"`

### Task 19: Author science-u06-l02 — Explain Animal Structures as a System

**Files:** Modify `src/content/science/u06.ts`, `src/content/science/u06.test.ts`.
**Interfaces:** Append manifest row 22 and exact wren structure matcher on c2. Include internal and external structures only at organ/whole-body scale.
**Green:** `npm test -- src/content/science/u06.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u06.ts src/content/science/u06.test.ts && git commit -m "feat(content): teach animal structure systems"`

### Task 20: Author science-u06-l03 — Argue How Structures Support Survival

**Files:** Modify `src/content/science/u06.ts`, `src/content/science/u06.test.ts`.
**Interfaces:** Append manifest row 23. Build claim-evidence-reasoning from supplied plant and animal observations without microscopic explanations.
**Green:** `npm test -- src/content/science/u06.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u06.ts src/content/science/u06.test.ts && git commit -m "feat(content): argue structure survival functions"`

### Task 21: Author science-u06-l04 — Model Sense, Brain, and Response

**Files:** Modify `src/content/science/u06.ts`, `src/content/science/u06.test.ts`.
**Interfaces:** Append manifest row 24 and complete Unit 6. Use a system sequence of sense information → brain processing → response; omit receptor, memory-storage, retina, and cell mechanisms.
**Green:** `npm test -- src/content/science/u06.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u06.ts src/content/science/u06.test.ts && git commit -m "feat(content): complete science structure systems unit"`

### Task 22: Author science-u07-l01 — Find Earth-Feature Patterns on Maps

**Files:** Create `src/content/science/u07.ts`, `src/content/science/u07.test.ts`.
**Interfaces:** Produce `unit07Lessons: Lesson[]` with manifest row 25 and exact topographic widget on c1. Interpret given key/elevation data and describe patterns without inventing causes.
**Green:** `npm test -- src/content/science/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u07.ts src/content/science/u07.test.ts && git commit -m "feat(content): start science changing landscapes unit"`

### Task 23: Author science-u07-l02 — Interpret Earth-Feature Map Data

**Files:** Modify `src/content/science/u07.ts`, `src/content/science/u07.test.ts`.
**Interfaces:** Append manifest row 26 and exact coast/hill topographic widget on c2. Require claims supported by several provided map data points.
**Green:** `npm test -- src/content/science/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u07.ts src/content/science/u07.test.ts && git commit -m "feat(content): interpret Earth feature map data"`

### Task 24: Author science-u07-l03 — Test a Weathering or Erosion Variable

**Files:** Modify `src/content/science/u07.ts`, `src/content/science/u07.test.ts`.
**Interfaces:** Append manifest row 27 and exact single-agent erosion widget on c2. Each scenario varies one factor while holding the rest constant and studies only water erosion.
**Green:** `npm test -- src/content/science/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u07.ts src/content/science/u07.test.ts && git commit -m "feat(content): test a single erosion variable"`

### Task 25: Author science-u07-l04 — Use Rock Layers and Fossils as Change Evidence

**Files:** Modify `src/content/science/u07.ts`, `src/content/science/u07.test.ts`.
**Interfaces:** Append manifest row 28 and complete Unit 7 with the exact relative-layer widget on c2. Reason only from layer/fossil patterns and relative time.
**Green:** `npm test -- src/content/science/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u07.ts src/content/science/u07.test.ts && git commit -m "feat(content): complete science changing landscapes unit"`

### Task 26: Author science-u08-l01 — Trace Energy and Fuels to Natural Resources

**Files:** Create `src/content/science/u08.ts`, `src/content/science/u08.test.ts`.
**Interfaces:** Produce `unit08Lessons: Lesson[]` with manifest row 29 and exact two-bin resource sorter on c2. Include wind, dammed water, sunlight, fossil fuels, and nuclear fuels in prose while the widget uses two unambiguous exemplars.
**Green:** `npm test -- src/content/science/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u08.ts src/content/science/u08.test.ts && git commit -m "feat(content): start science resources and hazards unit"`

### Task 27: Author science-u08-l02 — Explain Environmental Effects of Resource Use

**Files:** Modify `src/content/science/u08.ts`, `src/content/science/u08.test.ts`.
**Interfaces:** Append manifest row 30 and exact three-bin resource sorter on c1. Compare benefits and environmental effects from supplied information without turning the lesson into policy advocacy.
**Green:** `npm test -- src/content/science/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u08.ts src/content/science/u08.test.ts && git commit -m "feat(content): explain environmental effects of resource use"`

### Task 28: Author science-u08-l03 — Describe Natural-Process Hazards

**Files:** Modify `src/content/science/u08.ts`, `src/content/science/u08.test.ts`.
**Interfaces:** Append manifest row 31 and exact hurricane solution widget on c3. Use only the five assessed hazards and avoid frightening disaster imagery or guarantees of safety.
**Green:** `npm test -- src/content/science/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u08.ts src/content/science/u08.test.ts && git commit -m "feat(content): describe assessed natural hazards"`

### Task 29: Author science-u08-l04 — Compare Hazard-Impact Solutions

**Files:** Modify `src/content/science/u08.ts`, `src/content/science/u08.test.ts`.
**Interfaces:** Append manifest row 32 and complete Unit 8 with the exact flood solution widget on c2. Compare multiple solutions by effectiveness, limits, and fit to the named impact; never promise that a solution removes all risk.
**Green:** `npm test -- src/content/science/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`
**Commit:** `git add src/content/science/u08.ts src/content/science/u08.test.ts && git commit -m "feat(content): complete science resources and hazards unit"`

## Task 30: Science-only deterministic verification and handoff

**Files:** Read only all `src/content/science/u01.ts` through `u08.ts` and their tests. Do not modify `src/content/science/index.ts`; master owns registration.

**Interfaces:** Consumes eight independently approved exports. Produces evidence that 32 planned lessons, 96 cards, 416 questions, and all 14 PEs are represented before registration.

- [ ] **Step 1: Run focused, permanent, type, and build gates**

```bash
npm test -- src/content/science src/content/schema.test.ts src/content/content-validation.test.ts src/content/lesson-quality.test.ts && npx tsc -b --pretty false && npm run build
```

Expected: all focused tests/typecheck/build PASS. If the catalog-wide test remains deliberately red because master registration is deferred, run its specific unit-independent assertions separately and record that single expected registration failure; do not weaken or skip it silently.

- [ ] **Step 2: Count exact content and coverage**

```bash
rg -c "id: 'science-u[0-9]{2}-l[0-9]{2}'," src/content/science/u*.ts
rg -c "id: 'science-u[0-9]{2}-l[0-9]{2}-c[1-3]'," src/content/science/u*.ts
rg -c "id: 'science-u[0-9]{2}-l[0-9]{2}-q(0[1-9]|1[0-3])'," src/content/science/u*.ts
rg -o "'4-(PS3|PS4|LS1|ESS1|ESS2|ESS3)-[1-4]'" src/content/science/u*.ts | sort -u
```

Expected totals after summing per-file output: 32 lessons, 96 cards, 416 questions, and exactly these 14 unique PE codes: `4-PS3-1`, `4-PS3-2`, `4-PS3-3`, `4-PS3-4`, `4-PS4-1`, `4-PS4-2`, `4-PS4-3`, `4-LS1-1`, `4-LS1-2`, `4-ESS1-1`, `4-ESS2-1`, `4-ESS2-2`, `4-ESS3-1`, `4-ESS3-2`.

- [ ] **Step 3: Run exact static scans**

```bash
! rg -n "T[O]DO|T[B]D|implement l[a]ter|fill in d[e]tails|s[i]milar to|\.\.\.|=\s*\[\s*\]" src/content/science/u*.ts src/content/science/u*.test.ts
! rg -n "fraction-b[a]rs|fraction-c[i]rcles|number-l[i]ne|bar-dot-p[l]ot|collision-s[i]mulator|circuit-b[u]ilder|morse-s[e]nder" src/content/science/u*.ts
! rg -n "\b(joules?|newtons?|acceleration|interference|electromagnetic|retina|cellular|microscopic)\b|\b[0-9]+(?:\.[0-9]+)?\s*(m/s|meters? per second)\b|calculate (the )?(energy|force)|specific rock formations?|absolute dating" src/content/science/u*.ts
! rg -n "\b(tsunami|wildfire|drought|landslide|avalanche)\b" src/content/science/u08.ts
! rg -n "\b(app|widget|simulation|animation|model)\b.{0,28}\b(showed|proved|provided evidence|generated evidence)\b" src/content/science/u*.ts
! rg -n "\b(visible|observable)\b.{0,20}\benergy\b" src/content/science/u*.ts
```

Expected: every command exits successfully with no matching lines. Review apparent false positives manually; change learner prose only when it makes a prohibited claim, not merely to satisfy a weak scan.

- [ ] **Step 4: Validate every literal widget against the completed contract**

```bash
npm test -- src/content/science src/content/schema.test.ts src/widgets/WidgetFrame.test.tsx && npx tsc -b --pretty false
```

Expected: PASS. Manually compare the used set to exactly `collision-ramp`, `energy-transfer-builder`, `wave-maker`, `light-reflection-eye`, `message-sender`, `energy-conversion-designer`, `animal-structure-matcher`, `erosion-simulator`, `rock-layer-explorer`, `topographic-map-explorer`, `hazard-solution-designer`, and `resource-sorter`; unused approved types are acceptable and invented types are not.

- [ ] **Step 5: Main-agent final trace checkpoint**

The main agent reads every authored card and question against the verbatim PE matrix, confirms each answer independently, confirms all optional investigations are low-risk and honest, and records per unit: lesson/card/question counts, PE coverage, widget refs/config parse results, boundary scan output, and unresolved caveats. Do not hand off as ready while any failed test, invalid widget, inaccurate answer, boundary concern, placeholder, empty lesson collection, or unreviewed lesson remains.

No commit is made in this verification task unless a concrete defect is corrected. A correction is committed separately with only its affected unit source/test and message `fix(content): correct science unit NN review findings`.

## Main-agent review checkpoints

1. **Dependency checkpoint:** record the accepted Plan A remediation commit, completed Plan B commit, Plan C master C1 commit, and green baseline command before Task 0.
2. **Accepted-content checkpoint:** independently revalidate Unit 1 lessons 1–3 at `5f5c61e`; no rewrite is permitted in Task 0.
3. **Per-lesson checkpoint:** after every Task 1–29 green run and before its commit, review standard fidelity, every answer, card/tag routing, original phenomena, child safety, MC-key balance, widget validity, and exact diff scope.
4. **Per-unit checkpoint:** after each unit's final lesson, rerun its full focused suite and trace every PE clarification/boundary in that unit.
5. **Subject checkpoint:** Task 30 must prove 32/96/416 counts, 14/14 PE coverage, valid widgets, clean static scans, TypeScript success, and an explicit caveat log.
6. **Master handoff checkpoint:** send eight reviewed exports to Plan C master. Only the master may register them and declare the 89-lesson catalog complete.

## Definition of done

- Accepted Unit 1 lessons 1–3 remain unchanged and independently revalidated; lesson 4 and Units 2–8 add exactly 29 new lessons.
- Eight modules export 32 lessons with 96 cards and 416 questions; each lesson has threshold 8, Sandy, three one-to-one card tags, all cards targeted, and at least two natural question types.
- All 14 PEs are covered with their complete practices, clarifications, and assessment boundaries preserved.
- Every widget is an exact completed Plan B Science literal/config and is described honestly as a model. Lessons without a direct contract omit the widget.
- Focused/permanent tests, `npx tsc -b --pretty false`, and the build pass; placeholder, empty-collection, invalid-widget, prohibited-boundary, out-of-scope-hazard, false-evidence, and directly-visible-energy scans have no output.
- Main-agent lesson, unit, subject, and master-handoff checkpoints are recorded. Registration remains deferred to Plan C master.

### Plan-time widget-contract audit

The 20 static refs were parsed independently against the 12 strict config definitions in `plan-b-science-draft.md`: 20 passed, 0 failed. Exact type allocation is `collision-ramp` ×1, `energy-transfer-builder` ×3, `wave-maker` ×2, `light-reflection-eye` ×1, `message-sender` ×2, `energy-conversion-designer` ×2, `animal-structure-matcher` ×1, `topographic-map-explorer` ×2, `erosion-simulator` ×1, `rock-layer-explorer` ×1, `resource-sorter` ×2, and `hazard-solution-designer` ×2. Execution must repeat the parse against the implemented final `WidgetRefSchema`; this planning result is not a substitute for permanent schema tests.

## Promotion Blocker and Literal-Wave Split

This document is ready to promote as the tracked curriculum blueprint at `docs/superpowers/plans/2026-08-29-plan-c3-science-curriculum-blueprint.md`, but it is **not an implementation-ready Superpowers plan**. It supplies complete production and focused-test code for Unit 2 lesson 1 only. The other 28 new lessons still require exact learner-facing prompts, choices/answers, explanations, dialogue, card prose, and worked examples. Inventing those during a current lesson brief would violate the writing-plans skill's no-omitted-implementation rule and exceed a 2–5 minute action. The blueprint remains non-executable even after promotion.

The hard promotion-to-execution blocker is resolved only by these four exact tracked, fully literal wave plans:

1. `docs/superpowers/plans/2026-08-29-plan-c3a-science-u01-u02.md` — U01–U02: 8 lessons / 104 questions; preserve/revalidate accepted U01-L01–L03 and supply 5 new lessons, including the complete U02-L01 production/test exemplar copied from this blueprint.
2. `docs/superpowers/plans/2026-08-29-plan-c3b-science-u03-u04.md` — U03–U04: 8 new lessons / 104 questions.
3. `docs/superpowers/plans/2026-08-29-plan-c3c-science-u05-u06.md` — U05–U06: 8 new lessons / 104 questions.
4. `docs/superpowers/plans/2026-08-29-plan-c3d-science-u07-u08.md` — U07–U08: 8 new lessons / 104 questions.

Together the four tracked waves account for all 32 lessons / 416 questions, including the 3 accepted lessons and 29 new lessons. Each wave must retain the exact IDs, titles, PE codes, card/title/tag triples, q01–q13 distributions, phenomena/boundaries, and widget refs from this blueprint; spell out every learner-facing string and answer object; divide each lesson into genuine 2–5 minute red/edit/answer-audit/green actions; include focused tests and `npx tsc -b --pretty false` in every green gate; and provide exact narrow `git add` and `git commit` commands. Repeat the placeholder, mapping, widget, PE-boundary, evidence-claim, and answer-correctness audit on every wave. Only after all four plans exist, pass review, and execute successfully may master Tasks C5 and C9 register and release Science.

## Blueprint handoff

Promote this reviewed document verbatim to `docs/superpowers/plans/2026-08-29-plan-c3-science-curriculum-blueprint.md`. Do not execute its lesson briefs. After master Task C1 and Plan B are complete, author and independently review the four tracked literal waves above, one fresh lesson-review boundary at a time. The waves hand eight reviewed unregistered exports to master Task C5; defects return to the owning wave rather than being patched during registration or master Task C9 release.
