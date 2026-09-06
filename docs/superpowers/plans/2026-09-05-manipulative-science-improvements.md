# Science Manipulative Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every lesson-used Science manipulative visibly learner-controlled, curriculum-aligned, entertaining, and truthfully coached by Sandy.

**Architecture:** Extend strict Science configs with prediction/comparison/design data, then repair widgets by phenomenon. Every model distinguishes screen output from physical evidence and preserves an equivalent reduced-motion final state.

**Tech Stack:** React 18, TypeScript 5, Zod 3, Framer Motion 11, Vitest 2, React Testing Library, user-event, CSS.

**Spec:** `docs/superpowers/specs/2026-09-05-manipulative-coaching-and-usability-design.md`

## Global Constraints

- Requires the committed coaching foundation plan.
- Only Task S1 edits `src/content/schema.ts` and `src/test/widgetFixtures.ts`.
- Do not modify `src/characters/**`, lesson framework files, or non-Science content.
- A widget/animation is a model or prediction, never physical evidence or proof.
- Energy is inferred from observable motion/effects; never describe energy as visible.
- Every widget-bearing Science card gets a two-line Sandy bridge and completion connection.
- Meaningful visual motion has an immediate, text-equivalent reduced-motion result.
- Keep 44px controls, keyboard operation, named state/status, and non-color cues.

---

### Task S1: Stabilize Science comparison/design config contracts

**Files:**
- Modify: `src/content/schema.ts`
- Modify: `src/content/schema.test.ts`
- Modify: `src/test/widgetFixtures.ts`

**Interfaces:**
- Add collision `controlledVariable: 'speed-a' | 'speed-b'`, `comparisonRuns: 2`, and visible `taskPrompt`.
- Add wave/light visible `taskPrompt`; add light `task: 'trace-path' | 'match-angle'` and path labels `{source,object,eye}` for trace mode.
- Add erosion `comparison: {variable:'vegetation', values:[false,true]}` requiring both runs.
- Add topographic point records `{id,label,x,y,elevation,group}` with x/y 0–100 and `targetPattern: 'band'|'cluster'`.
- Add energy-conversion `constraints` records `{id,label,kind:'material'|'cost'|'time'|'safety'}` and each component's `satisfiesConstraintIds`.
- Add hazard solution `strengths`, `impacts`, and `limits`, plus `requiredImpactIds`; no hidden exact set alone can complete.
- Add resource `lessonCategory` and `effectChoices` so production tasks connect resource/action to use/effect.
- Add optional energy-transfer distractor tokens, animal `internal`/`external` kind, and rock-layer evidence prompts.

- [ ] **Step 1: Add failing strict-schema tests**

Reject unknown controlled variables, duplicate comparison values, out-of-range points,
unknown constraint/impact IDs, effect answers absent from choices, duplicate animal
structure IDs, and rock prompts without an evidence choice.

```ts
expect(TopographicMapExplorerWidgetConfigSchema.safeParse({
  points:[{id:'p',label:'P',x:120,y:20,elevation:5,group:'coast'}],
  targetPattern:'band'
}).success).toBe(false);
```

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- schema widgetFixtures science
```

- [ ] **Step 3: Implement strict additive contracts**

Keep legacy fixtures parseable where they remain library tests. Production content will
move to the richer branches and the integration gate will enforce those production modes.

- [ ] **Step 4: Verify and commit**

```sh
npm test -- schema widgetFixtures science
npx tsc -b --pretty false
git add src/content/schema.ts src/content/schema.test.ts src/test/widgetFixtures.ts
git diff --cached --check
git commit -m "feat(science): define comparison and design contracts"
```

### Task S2: Make collision a predict-run-observe model

**Files:**
- Modify: `src/widgets/science/CollisionRamp.tsx`, `src/widgets/science/CollisionRamp.test.tsx`
- Modify: `src/content/science/u01.ts`, `src/content/science/u01.test.ts`
- Modify: `src/theme.css`

**Interfaces:** Produces two fair-test runs with locked controls, prediction commitment, visible before/after motion, and comparison.

- [ ] **Step 1: Add failing fair-test tests**

Assert mass, angle, and the non-controlled speed are read-only; prediction precedes Run;
the carts visibly move/latch and settle in normal motion; reduced motion immediately shows
the identical final positions/result; completion requires two controlled-variable runs
and a comparison statement.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- CollisionRamp u01
```

- [ ] **Step 3: Implement explicit phases**

Use `setup → predicted → running → observed → compared`. Retain each run's exact inputs,
predicted direction, and modeled outcome in a visible before/after table. Emit `strategy`
if the learner tries to alter a controlled condition, `retry` for a wrong prediction,
`milestone` after run one, and one completion after comparison.

- [ ] **Step 4: Author Sandy coaching and truthful copy**

Sandy connects one-variable control to the fair-test lesson and states that the animation
models a prediction rather than supplying physical cart evidence.

- [ ] **Step 5: Verify and commit**

```sh
npm test -- CollisionRamp u01 content-validation widget-css
npx tsc -b --pretty false
git add src/widgets/science/CollisionRamp.tsx src/widgets/science/CollisionRamp.test.tsx src/content/science/u01.ts src/content/science/u01.test.ts src/theme.css
git diff --cached --check
git commit -m "feat(science): add fair collision comparisons"
```

### Task S3: Align wave and light models with visible goals

**Files:**
- Modify: `src/widgets/science/WaveMaker.tsx`, `src/widgets/science/WaveMaker.test.tsx`
- Modify: `src/widgets/science/LightReflectionEye.tsx`, `src/widgets/science/LightReflectionEye.test.tsx`
- Modify: `src/content/science/u03.ts`, `src/content/science/u03.test.ts`
- Modify: `src/theme.css`

**Interfaces:** Produces visible wave targets and source→object→eye tracing before optional equal-angle reasoning.

- [ ] **Step 1: Add failing goal/path tests**

Assert wave amplitude/frequency targets are visible before control changes and their
effects remain labeled on the graph. Assert light trace mode asks the learner to connect
source, object, then eye and never requires guessing an undisclosed 30° target.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- WaveMaker LightReflectionEye u03
```

- [ ] **Step 3: Implement tangible model response**

Keep live wave geometry and add benchmark/target lines with text. Make light path nodes
selectable in sequence; animate the ray only after a committed path, with a static ray
and identical text under reduced motion.

- [ ] **Step 4: Author coaching, verify, and commit**

Sandy distinguishes amplitude from frequency and states what the graph represents. Light
coaching connects reflected light entering the eye to seeing without claiming the model
is observed evidence.

```sh
npm test -- WaveMaker LightReflectionEye u03 content-validation widget-css
npx tsc -b --pretty false
git add src/widgets/science/WaveMaker.tsx src/widgets/science/WaveMaker.test.tsx src/widgets/science/LightReflectionEye.tsx src/widgets/science/LightReflectionEye.test.tsx src/content/science/u03.ts src/content/science/u03.test.ts src/theme.css
git diff --cached --check
git commit -m "feat(science): clarify wave and light models"
```

### Task S4: Require erosion comparison and real topographic analysis

**Files:**
- Modify: `src/widgets/science/ErosionSimulator.tsx`, `src/widgets/science/ErosionSimulator.test.tsx`
- Modify: `src/widgets/science/TopographicMapExplorer.tsx`, `src/widgets/science/TopographicMapExplorer.test.tsx`
- Modify: `src/content/science/u07.ts`, `src/content/science/u07.test.ts`
- Modify: `src/theme.css`

**Interfaces:** Produces matched bare/covered run records and plotted point band/cluster analysis.

- [ ] **Step 1: Add failing comparison/map tests**

Assert the default erosion Run cannot complete; learner predicts, runs vegetation false
and true under otherwise identical settings, and compares both visible outcomes. Assert
all six Unit 7 points appear at authored coordinates with symbol/text labels and the
learner selects a band/cluster from the plotted pattern.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- ErosionSimulator TopographicMapExplorer u07
```

- [ ] **Step 3: Implement retained comparisons**

Show particle/channel changes as model output and retain both erosion cards side by side
or stacked. Plot topographic points on the existing contour graphic, provide a legend,
and allow keyboard selection through a named point list linked to plotted IDs.

- [ ] **Step 4: Author coaching, verify, and commit**

Sandy requires matched conditions before concluding. Map coaching separates elevation
from location and asks the learner to name the visible spatial pattern without inferring cause.

```sh
npm test -- ErosionSimulator TopographicMapExplorer u07 content-validation widget-css
npx tsc -b --pretty false
git add src/widgets/science/ErosionSimulator.tsx src/widgets/science/ErosionSimulator.test.tsx src/widgets/science/TopographicMapExplorer.tsx src/widgets/science/TopographicMapExplorer.test.tsx src/content/science/u07.ts src/content/science/u07.test.ts src/theme.css
git diff --cached --check
git commit -m "feat(science): compare erosion and map patterns"
```

### Task S5: Add constraints and observable outcomes to energy models

**Files:**
- Modify: `src/widgets/science/EnergyTransferBuilder.tsx`, `src/widgets/science/EnergyTransferBuilder.test.tsx`
- Modify: `src/widgets/science/EnergyConversionDesigner.tsx`, `src/widgets/science/EnergyConversionDesigner.test.tsx`
- Modify: `src/content/science/u02.ts`, `src/content/science/u02.test.ts`
- Modify: `src/content/science/u05.ts`, `src/content/science/u05.test.ts`
- Modify: `src/theme.css`

**Interfaces:** Produces multi-path transfer reasoning, observable receiver effects, and constraint-aware conversion designs.

- [ ] **Step 1: Add failing depth/constraint tests**

Assert transfer includes valid distractors, requires source→route→receiver, and asks for
an observable receiver effect. Assert conversion components visibly list satisfied
material/cost/time/safety constraints and completion requires a valid chain plus all
required constraints.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- EnergyTransferBuilder EnergyConversionDesigner u02 u05
```

- [ ] **Step 3: Implement connected-token and constraint-board states**

Use selectable tokens that visibly snap into path/chain slots with remove actions. Show
constraint stamps and unmet constraints in text; do not call the device universally
best. Emit strategy for incompatible links and retry for an incomplete constraint set.

- [ ] **Step 4: Re-author content/coaching, verify, and commit**

```sh
npm test -- EnergyTransferBuilder EnergyConversionDesigner u02 u05 content-validation widget-css
npx tsc -b --pretty false
git add src/widgets/science/EnergyTransferBuilder.tsx src/widgets/science/EnergyTransferBuilder.test.tsx src/widgets/science/EnergyConversionDesigner.tsx src/widgets/science/EnergyConversionDesigner.test.tsx src/content/science/u02.ts src/content/science/u02.test.ts src/content/science/u05.ts src/content/science/u05.test.ts src/theme.css
git diff --cached --check
git commit -m "feat(science): deepen energy model decisions"
```

### Task S6: Align hazard and resource decisions with lessons

**Files:**
- Modify: `src/widgets/science/HazardSolutionDesigner.tsx`, `src/widgets/science/HazardSolutionDesigner.test.tsx`
- Modify: `src/widgets/science/ResourceSorter.tsx`, `src/widgets/science/ResourceSorter.test.tsx`
- Modify: `src/content/science/u08.ts`, `src/content/science/u08.test.ts`
- Modify: `src/theme.css`

**Interfaces:** Produces reasoned hazard plans and resource/action→use/effect connections.

- [ ] **Step 1: Add failing reasoning tests**

Assert every hazard solution shows strengths, impacts, and limits; learner selects a plan
and reasons about required impacts rather than matching a hidden exact set. Assert the
resource task uses lesson categories and requires a follow-up use/effect connection.

- [ ] **Step 2: Implement design cards and connection board**

Keep all facts visible, show selected-plan tradeoffs, and state that risk can be reduced
but not eliminated. Resource placements retain their effect choices and can be revised.

- [ ] **Step 3: Author coaching, verify, and commit**

```sh
npm test -- HazardSolutionDesigner ResourceSorter u08 content-validation widget-css
npx tsc -b --pretty false
git add src/widgets/science/HazardSolutionDesigner.tsx src/widgets/science/HazardSolutionDesigner.test.tsx src/widgets/science/ResourceSorter.tsx src/widgets/science/ResourceSorter.test.tsx src/content/science/u08.ts src/content/science/u08.test.ts src/theme.css
git diff --cached --check
git commit -m "feat(science): align hazard and resource decisions"
```

### Task S7: Deepen messages, animal systems, and rock evidence

**Files:**
- Modify: `src/widgets/science/MessageSender.tsx`, `src/widgets/science/MessageSender.test.tsx`
- Modify: `src/widgets/science/AnimalStructureMatcher.tsx`, `src/widgets/science/AnimalStructureMatcher.test.tsx`
- Modify: `src/widgets/science/RockLayerExplorer.tsx`, `src/widgets/science/RockLayerExplorer.test.tsx`
- Modify: `src/content/science/u04.ts`, `src/content/science/u04.test.ts`
- Modify: `src/content/science/u06.ts`, `src/content/science/u06.test.ts`
- Modify: `src/content/science/u07.ts`, `src/content/science/u07.test.ts`
- Modify: `src/theme.css`

**Interfaces:** Produces first-mismatch message repair, internal/external structure systems, and evidence-backed relative-age conclusions.

- [ ] **Step 1: Add failing reasoning tests**

Message retry identifies the first mismatched character group. Animal completion requires
at least one internal/external cooperating-system explanation, not two isolated pairs.
Rock-layer completion requires a rank/fossil evidence choice and never converts relative
rank into years or an unsupported process.

- [ ] **Step 2: Implement deeper visible states**

Retain encoded groups and repair controls; connect matched animal parts in a system map;
show selected rock evidence next to the relative-age conclusion.

- [ ] **Step 3: Author remaining coaching and run Science gate**

```sh
npm test -- MessageSender AnimalStructureMatcher RockLayerExplorer u04 u06 u07
npm test -- widgets science schema content-validation widget-css
npx tsc -b --pretty false
npm run build
git add src/widgets/science/MessageSender.tsx src/widgets/science/MessageSender.test.tsx src/widgets/science/AnimalStructureMatcher.tsx src/widgets/science/AnimalStructureMatcher.test.tsx src/widgets/science/RockLayerExplorer.tsx src/widgets/science/RockLayerExplorer.test.tsx src/content/science/u04.ts src/content/science/u04.test.ts src/content/science/u06.ts src/content/science/u06.test.ts src/content/science/u07.ts src/content/science/u07.test.ts src/theme.css
git diff --cached --check
git commit -m "feat(science): deepen model-based reasoning"
```
