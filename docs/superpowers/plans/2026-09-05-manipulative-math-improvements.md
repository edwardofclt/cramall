# Math Manipulative Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every lesson-used Math manipulative explicit, reasoning-centered, tactile, and connected to Nutty's in-step coaching.

**Architecture:** Extend strict Math configs additively, preserve old fixtures, then repair widgets in concept-sized groups. Each authored widget card receives a specific two-line bridge and meaningful action reactions.

**Tech Stack:** React 18, TypeScript 5, Zod 3, Vitest 2, React Testing Library, user-event, CSS.

**Spec:** `docs/superpowers/specs/2026-09-05-manipulative-coaching-and-usability-design.md`

## Global Constraints

- Requires the committed coaching foundation plan.
- Only Task M1 edits `src/content/schema.ts` and `src/test/widgetFixtures.ts`.
- Do not modify `src/characters/**`, lesson framework files, or non-Math content.
- Preserve exact-decimal behavior and all currently valid Math configs.
- Emit existing events in their documented order; emit coach cues only at meaningful moments.
- Every widget-bearing Math card gets two intro lines and a completion connection.
- Keep 44px controls, keyboard alternatives, text status, non-color cues, and reduced-motion parity.

---

### Task M1: Stabilize additive Math config contracts

**Files:**
- Modify: `src/content/schema.ts`
- Modify: `src/content/schema.test.ts`
- Modify: `src/test/widgetFixtures.ts`

**Interfaces:**
- Add optional visible `taskPrompt` to fraction, array, money, ruler, balance, data-plot, and probability configs.
- Add elapsed `jumpMinutes: Array<5 | 10 | 15>`, default `[5,10,15]` in the component.
- Add `ArrayBuilder.task: 'editable' | 'factor-hunt' | 'division'`, optional positive `dividend` and `divisor`, with `dividend <= 9999`.
- Add `FractionModels.task: 'build' | 'equivalent' | 'change' | 'groups' | 'share'`, `wholeCount` from 1–4, and optional `comparisonTarget` fraction.
- Add `AreaModelMultiplier.revealMode: 'progressive' | 'all'`.
- Add `DataPlotBuilder.sourceData` whose keys/values exactly equal `target`, plus `displayChoices` containing configured `kind`.
- Add `ProbabilitySpinner.eventQuestion` with `eventLabel` and `classification: 'certain' | 'possible' | 'impossible'` validated against segment IDs.

- [ ] **Step 1: Add failing strict-schema tests**

Parse one valid config per new field and reject unknown modes, invalid division values,
unreachable fractions, source/target mismatches, and event classifications that
contradict the sample space. Include this concrete assertion:

```ts
expect(DataPlotBuilderWidgetConfigSchema.safeParse({
  kind:'bar', prompt:'Build it', categories:['A'], target:{A:3}, sourceData:{A:2}
}).success).toBe(false);
```

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- schema widgetFixtures
```

- [ ] **Step 3: Implement exact additive fields/refinements**

Keep objects strict and component defaults outside Zod transforms. Update one
compile-checked fixture per changed widget type.

- [ ] **Step 4: Verify and commit**

```sh
npm test -- schema widgetFixtures math
npx tsc -b --pretty false
git add src/content/schema.ts src/content/schema.test.ts src/test/widgetFixtures.ts
git diff --cached --check
git commit -m "feat(math): extend manipulative task contracts"
```

### Task M2: Expose simple goals and source data

**Files:**
- Modify: `src/widgets/math/FractionModels.tsx`, `src/widgets/math/FractionModels.test.tsx`
- Modify: `src/widgets/math/MoneyCounter.tsx`, `src/widgets/math/MoneyCounter.test.tsx`
- Modify: `src/widgets/math/QuarterInchRuler.tsx`, `src/widgets/math/QuarterInchRuler.test.tsx`
- Modify: `src/widgets/math/DataPlotBuilder.tsx`, `src/widgets/math/DataPlotBuilder.test.tsx`
- Modify: `src/content/math/u06.ts`, `src/content/math/u06.test.ts`
- Modify: `src/content/math/u07.ts`, `src/content/math/u07.test.ts`
- Modify: `src/content/math/u09.ts`, `src/content/math/u09.test.ts`
- Modify: `src/content/math/u12.ts`, `src/content/math/u12.test.ts`

**Interfaces:** Produces visible `data-testid="widget-task"` regions and exact source/target-aware coaching.

- [ ] **Step 1: Add failing widget tests**

Assert visible `Build 5/8`, `Show $6.35`, an object endpoint at `4¾ inches`, and a semantic
table containing every plot category/count before interaction. Assert first useful partial
state emits `milestone`, committed wrong state emits `retry`, and completion remains latched.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- FractionModels MoneyCounter QuarterInchRuler DataPlotBuilder
```

- [ ] **Step 3: Implement visible/tactile representations**

Render target text beside the model, labeled non-color coin/bill silhouettes and
subtotals, a visible measured object aligned to zero, and a source-data table before plot
controls. Preserve named button alternatives.

- [ ] **Step 4: Author two-line bridges and reactions**

Name the target and representation in the intro. Strategy/retry identifies the next
useful comparison; completion names the built fraction, amount, measurement, or display.

- [ ] **Step 5: Verify and commit exact files**

```sh
npm test -- FractionModels MoneyCounter QuarterInchRuler DataPlotBuilder u06 u07 u09 u12 content-validation
npx tsc -b --pretty false
git add src/widgets/math/FractionModels.tsx src/widgets/math/FractionModels.test.tsx src/widgets/math/MoneyCounter.tsx src/widgets/math/MoneyCounter.test.tsx src/widgets/math/QuarterInchRuler.tsx src/widgets/math/QuarterInchRuler.test.tsx src/widgets/math/DataPlotBuilder.tsx src/widgets/math/DataPlotBuilder.test.tsx src/content/math/u06.ts src/content/math/u06.test.ts src/content/math/u07.ts src/content/math/u07.test.ts src/content/math/u09.ts src/content/math/u09.test.ts src/content/math/u12.ts src/content/math/u12.test.ts
git diff --cached --check
git commit -m "fix(math): expose manipulative goals and data"
```

### Task M3: Rebuild elapsed time as learner-controlled jumps

**Files:**
- Modify: `src/widgets/math/ClockElapsedTime.tsx`, `src/widgets/math/ClockElapsedTime.test.tsx`
- Modify: `src/content/math/u09.ts`, `src/content/math/u09.test.ts`

**Interfaces:** Produces start/current clocks, retained `{from,minutes,to}` jumps, remaining minutes, and exact-target completion.

- [ ] **Step 1: Add failing elapsed-mode tests**

Render 09:00 + 35 with `[5,10,15]`; assert 09:35 is initially hidden, `Add 15 minutes`
creates `09:00 → 15 → 09:15`, overshoot is prevented with `retry`, hour crossings emit one
`milestone`, reset clears jumps, and totaling 35 emits one completion.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- ClockElapsedTime
```

- [ ] **Step 3: Implement jump controls and clock visualization**

Disable jumps larger than remaining minutes. Update analog hands and exact digital text;
never reveal the target end time before completion. Retain all jumps visibly.

- [ ] **Step 4: Author Nutty coaching and verify**

Bridge from friendly jumps to elapsed-time addition. Retry names the remaining interval;
completion connects the jump total to the resulting time.

```sh
npm test -- ClockElapsedTime u09 content-validation
npx tsc -b --pretty false
git add src/widgets/math/ClockElapsedTime.tsx src/widgets/math/ClockElapsedTime.test.tsx src/content/math/u09.ts src/content/math/u09.test.ts
git diff --cached --check
git commit -m "feat(math): make elapsed time learner controlled"
```

### Task M4: Align arrays and area models with lesson reasoning

**Files:**
- Modify: `src/widgets/math/ArrayBuilder.tsx`, `src/widgets/math/ArrayBuilder.test.tsx`
- Modify: `src/widgets/math/AreaModelMultiplier.tsx`, `src/widgets/math/AreaModelMultiplier.test.tsx`
- Modify: `src/content/math/u03.ts`, `src/content/math/u03.test.ts`
- Modify: `src/content/math/u04.ts`, `src/content/math/u04.test.ts`
- Modify: `src/content/math/u05.ts`, `src/content/math/u05.test.ts`
- Modify: `src/content/math/u10.ts`, `src/content/math/u10.test.ts`

**Interfaces:** Produces factor-pair collection, division grouping, progressive decomposition, and proportional/unit-square area visuals.

- [ ] **Step 1: Add failing mode tests**

Assert factor-hunt retains unique pairs for 24 without reversed duplicates; division
represents 936÷4 with visible partial groups, quotient, and remainder; area partial
products stay hidden until selected; 8×5 renders 40 unit squares.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- ArrayBuilder AreaModelMultiplier
```

- [ ] **Step 3: Implement separate task renderers**

Use separate helpers for editable, factor-hunt, and division. Render proportional split
regions, reveal partial products progressively, and require all regions before the sum.

- [ ] **Step 4: Align four units and coaching**

Use factor-hunt in factor content, division in the 936÷4 card, progressive decomposition
for multiplication, and unit-square area for 8×5. Coaching uses each card's exact values.

- [ ] **Step 5: Verify and commit**

```sh
npm test -- ArrayBuilder AreaModelMultiplier u03 u04 u05 u10 content-validation
npx tsc -b --pretty false
git add src/widgets/math/ArrayBuilder.tsx src/widgets/math/ArrayBuilder.test.tsx src/widgets/math/AreaModelMultiplier.tsx src/widgets/math/AreaModelMultiplier.test.tsx src/content/math/u03.ts src/content/math/u03.test.ts src/content/math/u04.ts src/content/math/u04.test.ts src/content/math/u05.ts src/content/math/u05.test.ts src/content/math/u10.ts src/content/math/u10.test.ts
git diff --cached --check
git commit -m "feat(math): deepen array and area reasoning"
```

### Task M5: Deepen fraction modes and number-line representations

**Files:**
- Modify: `src/widgets/math/FractionModels.tsx`, `src/widgets/math/FractionModels.test.tsx`
- Modify: `src/widgets/math/NumberLineCompare.tsx`, `src/widgets/math/NumberLineCompare.test.tsx`
- Modify: `src/content/math/u01.ts`
- Modify: `src/content/math/u06.ts`, `src/content/math/u06.test.ts`
- Modify: `src/content/math/u07.ts`, `src/content/math/u07.test.ts`
- Modify: `src/content/math/u08.ts`, `src/content/math/u08.test.ts`

**Interfaces:** Produces equivalence/change/groups/share flows and authored-denominator-preserving line labels.

- [ ] **Step 1: Add failing representation tests**

Assert side-by-side 2/4 and 1/2 wholes, multi-whole 5/4, visible start/change/result,
fair-sharing distribution, and add/remove controls. Assert hundredths labels `10/100` and
`35/100`, tenths landmarks, and equality-specific retry text.

- [ ] **Step 2: Run red tests, implement, and align content**

```sh
npm test -- FractionModels NumberLineCompare
```

Keep a common selected-piece model but separate task instructions/rendering. Replace the
25-versus-52 big-number content config with the card's actual magnitude pair. Preserve
exact comparison math and authored denominators. Add coaching to every widget-bearing
Unit 1 card, including the already-strong place-value builder: its bridge names the target
number/place values and its completion connects the built model to expanded form.

- [ ] **Step 3: Verify and commit**

```sh
npm test -- FractionModels NumberLineCompare u01 u06 u07 u08 content-validation
npx tsc -b --pretty false
git add src/widgets/math/FractionModels.tsx src/widgets/math/FractionModels.test.tsx src/widgets/math/NumberLineCompare.tsx src/widgets/math/NumberLineCompare.test.tsx src/content/math/u01.ts src/content/math/u06.ts src/content/math/u06.test.ts src/content/math/u07.ts src/content/math/u07.test.ts src/content/math/u08.ts src/content/math/u08.test.ts
git diff --cached --check
git commit -m "feat(math): align fraction and number-line models"
```

### Task M6: Repair shape hierarchy and balance disclosure

**Files:**
- Modify: `src/widgets/math/ShapeClassifier.tsx`, `src/widgets/math/ShapeClassifier.test.tsx`
- Modify: `src/widgets/math/BalanceScale.tsx`, `src/widgets/math/BalanceScale.test.tsx`
- Modify: `src/content/math/u09.ts`, `src/content/math/u09.test.ts`
- Modify: `src/content/math/u11.ts`, `src/content/math/u11.test.ts`

**Interfaces:** Uses existing canonical classification diagrams; relation text stays hidden until commitment.

- [ ] **Step 1: Add failing hierarchy/disclosure tests**

Assert Unit 11 uses `mode:'classifications'`; square requires all five valid parent
memberships; diagrams have property descriptions. Assert balance initially gives only
tilt/level evidence and reveals the numerical relation only after Check.

- [ ] **Step 2: Implement, coach, verify, and commit**

```sh
npm test -- ShapeClassifier BalanceScale u09 u11
npm test -- ShapeClassifier BalanceScale u09 u11 content-validation
npx tsc -b --pretty false
git add src/widgets/math/ShapeClassifier.tsx src/widgets/math/ShapeClassifier.test.tsx src/widgets/math/BalanceScale.tsx src/widgets/math/BalanceScale.test.tsx src/content/math/u09.ts src/content/math/u09.test.ts src/content/math/u11.ts src/content/math/u11.test.ts
git diff --cached --check
git commit -m "fix(math): teach shape hierarchy and balance reasoning"
```

### Task M7: Add plot and probability decisions

**Files:**
- Modify: `src/widgets/math/DataPlotBuilder.tsx`, `src/widgets/math/DataPlotBuilder.test.tsx`
- Modify: `src/widgets/math/ProbabilitySpinner.tsx`, `src/widgets/math/ProbabilitySpinner.test.tsx`
- Modify: `src/content/math/u12.ts`, `src/content/math/u12.test.ts`
- Modify: `src/theme.css`

**Interfaces:** Produces display/title/label/scale commitment and prediction→trials→event classification.

- [ ] **Step 1: Add failing decision-flow tests**

Require plot display type, title/labels, and scale confirmation before entry. Require a
spinner prediction before spinning and completion only after configured trials plus the
correct certain/possible/impossible classification.

- [ ] **Step 2: Implement one-page progressive flows**

Summarize completed decisions above later controls. Preserve spinner reduced-motion
final-state parity and source data throughout the interaction.

- [ ] **Step 3: Author coaching, add scoped CSS, and run Math gate**

```sh
npm test -- DataPlotBuilder ProbabilitySpinner widgets math schema content-validation widget-css
npx tsc -b --pretty false
npm run build
git add src/widgets/math/DataPlotBuilder.tsx src/widgets/math/DataPlotBuilder.test.tsx src/widgets/math/ProbabilitySpinner.tsx src/widgets/math/ProbabilitySpinner.test.tsx src/content/math/u12.ts src/content/math/u12.test.ts src/theme.css
git diff --cached --check
git commit -m "feat(math): add plot and probability decisions"
```
