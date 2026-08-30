# Cram All Plan C: Full-Year Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship and verify the exact 89-lesson South Carolina Grade 4 Math, Reading, and Science catalog across all 31 standards units.

**Architecture:** Generated standards remain the validated metadata source, while `src/content/curriculum.ts` freezes the authored lesson identity/title/allocation contract. Fully literal subject-wave plans own learner-facing modules and their focused tests; this master owns the shared OE contract, manifest, helper, standards parity, registry integration, catalog-wide deterministic audits, documentation, and release gates.

**Tech Stack:** React 18, TypeScript 5, Zod 3, Vitest 2, Vite 5, Node.js 20+; no new dependency.

**Spec:** `docs/superpowers/specs/2026-08-29-cram-all-design.md`

**Saved as:** `docs/superpowers/plans/2026-08-29-plan-c-full-year-content.md`

## Global Constraints

- Do not execute any Plan C source task until the separately authorized Plan A closure remediation in `docs/superpowers/plans/2026-08-29-plan-a-closure-remediation.md` is committed, independently accepted, and green.
- Do not execute any Plan C source task until Plan B and all of its Math, Reading, and Science widget plans are complete, reviewed, committed, and green. Re-read the implemented `WidgetRefSchema`, `WIDGET_TYPES`, `widgetRegistry`, `WidgetEventMap`, and `WidgetFrame` before accepting a subject wave.
- Promote the three tracked curriculum blueprints named in **Required Subject-Wave Artifacts** alongside this master. They freeze subject decisions but are not executable plans; source work begins only from the 13 fully literal wave plans at the exact tracked paths below after their own writing-plans audits pass.
- Preserve React 18, TypeScript 5, Zod 3, Vitest 2, Vite 5, `HashRouter`, `passThreshold: 8`, the `cramall.v1` storage key, and the current normal-versus-single font behavior.
- Ship exactly 89 lessons in runtime order: Math 33 across 12 units, Reading 24 across 11 units, and Science 32 across 8 units.
- Every lesson has exactly 3 learn cards, exactly 13 questions, canonical IDs, at least two pedagogically natural question types, one review card per concept tag, and every card targeted by at least one question.
- Reading lessons alone declare all six generated `ELA.4.OE.1` through `ELA.4.OE.6` values in `crossCuttingExpectationCodes`; OE codes never appear in a lesson's `indicatorCodes`.
- Never hand-edit `src/content/standards/standards.json`. Regenerate it with `node scripts/build-standards.mjs`, then require an empty generated-file diff.
- Subject authors own only their assigned `src/content/<subject>/uNN.ts` and `uNN.test.ts`. The controller alone owns `src/content/curriculum.ts`, `src/content/schema.ts`, shared validation/tests, the three indexes, parity tooling, and `README.md`.
- Math's five literal waves may author, test, review, and commit their isolated `u02.ts` through `u12.ts` modules independently, but none may edit `src/content/math/index.ts`. The controller waits for all five accepted Math wave records, then performs the one and only Math registry integration in Task C3; there is no registry integration after an individual Math wave.
- No task in this plan creates, modifies, stages, or reverts any path under `src/characters/`.
- Every red gate must fail for the stated reason. Every green gate includes the focused tests and `npx tsc -b --pretty false`; do not substitute a production build for a direct test.
- Stage only the paths named by the task's exact `git add` command. Do not use `git add -A`, `git add .`, or a broad directory stage.
- A passing schema is not evidence of instructional accuracy. Per-lesson answer review, source/standards fidelity, original-text review, widget-contract review, and the browser/parent gates remain mandatory.

---

## Required Subject-Wave Artifacts

The master may proceed through Tasks C1–C2 while literal wave plans are reviewed, but Task C3 is a hard stop until the three tracked blueprints and all 13 tracked literal wave plans below exist and have accepted reviews. Only the 13 wave plans are executable; each must contain complete production/test literals and no execution-time learner-content invention.

**Math curriculum blueprint (tracked, non-executable):** `docs/superpowers/plans/2026-08-29-plan-c1-math-curriculum-blueprint.md`

- `docs/superpowers/plans/2026-08-29-plan-c1a-math-u02-u04.md`
- `docs/superpowers/plans/2026-08-29-plan-c1b-math-u05-u06.md`
- `docs/superpowers/plans/2026-08-29-plan-c1c-math-u07-u08.md`
- `docs/superpowers/plans/2026-08-29-plan-c1d-math-u09-u10.md`
- `docs/superpowers/plans/2026-08-29-plan-c1e-math-u11-u12.md`

**Reading curriculum blueprint (tracked, non-executable):** `docs/superpowers/plans/2026-08-29-plan-c2-reading-curriculum-blueprint.md`

- `docs/superpowers/plans/2026-08-29-plan-c2a-reading-u01-u03.md`
- `docs/superpowers/plans/2026-08-29-plan-c2b-reading-u04-u07.md`
- `docs/superpowers/plans/2026-08-29-plan-c2c-reading-u08-u10.md`
- `docs/superpowers/plans/2026-08-29-plan-c2d-reading-u11.md`

**Science curriculum blueprint (tracked, non-executable):** `docs/superpowers/plans/2026-08-29-plan-c3-science-curriculum-blueprint.md`

- `docs/superpowers/plans/2026-08-29-plan-c3a-science-u01-u02.md`
- `docs/superpowers/plans/2026-08-29-plan-c3b-science-u03-u04.md`
- `docs/superpowers/plans/2026-08-29-plan-c3c-science-u05-u06.md`
- `docs/superpowers/plans/2026-08-29-plan-c3d-science-u07-u08.md`

The five Math plans independently produce reviewed `unit02Lessons` through `unit12Lessons` without touching `src/content/math/index.ts`; only after all five are accepted does controller Task C3 register them together in one index change. Reading produces `unit01Lessons` through `unit11Lessons`; Science produces `unit01Lessons` through `unit08Lessons`. Each symbol is a `Lesson[]` exported from its matching `src/content/<subject>/uNN.ts`. Existing Math `unit01Lessons` remains the reviewed two-lesson pilot export.

## Exact Authored Curriculum Contract

Task C1 creates this complete, valid `src/content/curriculum.ts`. Titles are the exact current pilot or tracked curriculum-blueprint titles, not display copy inferred at implementation time.

```ts
import standardsData from './standards/standards.json';
import { StandardsDataSchema } from './standards/schema';

const standards = StandardsDataSchema.parse(standardsData);

export const READING_OE_CODES: readonly string[] = Object.freeze(
  standards.reading.crossCuttingExpectations.map(({ code }) => code),
);

export type PlannedLesson = {
  id: string;
  unitId: string;
  title: string;
  indicatorCodes: readonly string[];
};

export const PLANNED_LESSONS = [
  { id: 'math-u01-l01', unitId: 'math-u01', title: 'Numbers to the Millions', indicatorCodes: ['4.NR.1.1'] },
  { id: 'math-u01-l02', unitId: 'math-u01', title: 'Comparing and Ordering Big Numbers', indicatorCodes: ['4.NR.1.3'] },
  { id: 'math-u02-l01', unitId: 'math-u02', title: 'Add and Subtract to 100,000', indicatorCodes: ['4.PAFR.1.1'] },
  { id: 'math-u02-l02', unitId: 'math-u02', title: 'Estimate and Judge Reasonableness', indicatorCodes: ['4.NR.1.2'] },
  { id: 'math-u03-l01', unitId: 'math-u03', title: 'Factor Pairs, Primes, and Composites', indicatorCodes: ['4.PAFR.3.1'] },
  { id: 'math-u03-l02', unitId: 'math-u03', title: 'Rules and Function-Table Patterns', indicatorCodes: ['4.PAFR.3.2'] },
  { id: 'math-u04-l01', unitId: 'math-u04', title: 'Multiply by Multiples of 10 and 100', indicatorCodes: ['4.PAFR.1.2'] },
  { id: 'math-u04-l02', unitId: 'math-u04', title: 'Decompose to Multiply Multi-Digit Numbers', indicatorCodes: ['4.PAFR.1.3'] },
  { id: 'math-u04-l03', unitId: 'math-u04', title: 'Multiplicative Comparisons and Unknowns', indicatorCodes: ['4.PAFR.3.3'] },
  { id: 'math-u05-l01', unitId: 'math-u05', title: 'Divide up to Four Digits by One Digit, Including Remainders', indicatorCodes: ['4.PAFR.1.4'] },
  { id: 'math-u05-l02', unitId: 'math-u05', title: 'Two-Step Equations with an Unknown', indicatorCodes: ['4.PAFR.3.4'] },
  { id: 'math-u06-l01', unitId: 'math-u06', title: 'Equivalent Fractions and Models', indicatorCodes: ['4.NR.2.3'] },
  { id: 'math-u06-l02', unitId: 'math-u06', title: 'Compose and Decompose Like-Denominator Fractions', indicatorCodes: ['4.NR.2.4'] },
  { id: 'math-u06-l03', unitId: 'math-u06', title: 'Mixed Numbers and Fractions Greater Than One', indicatorCodes: ['4.NR.2.5'] },
  { id: 'math-u06-l04', unitId: 'math-u06', title: 'Compare Fractions and Mixed Numbers', indicatorCodes: ['4.NR.2.6'] },
  { id: 'math-u07-l01', unitId: 'math-u07', title: 'Add and Subtract Like-Denominator Fractions', indicatorCodes: ['4.PAFR.2.1'] },
  { id: 'math-u07-l02', unitId: 'math-u07', title: 'Whole Number Times a Unit Fraction', indicatorCodes: ['4.PAFR.2.3'] },
  { id: 'math-u07-l03', unitId: 'math-u07', title: 'Fractions as Equal-Sharing Division', indicatorCodes: ['4.PAFR.2.4'] },
  { id: 'math-u08-l01', unitId: 'math-u08', title: 'Tenths and Hundredths as Fractions and Decimals', indicatorCodes: ['4.NR.2.1'] },
  { id: 'math-u08-l02', unitId: 'math-u08', title: 'Compare Decimals with Benchmarks', indicatorCodes: ['4.NR.2.2'] },
  { id: 'math-u08-l03', unitId: 'math-u08', title: 'Add and Subtract Tenths and Hundredths', indicatorCodes: ['4.PAFR.2.2'] },
  { id: 'math-u09-l01', unitId: 'math-u09', title: 'Money Collections and Purchases', indicatorCodes: ['4.MGSR.2.1'] },
  { id: 'math-u09-l02', unitId: 'math-u09', title: 'Elapsed, Start, and End Time', indicatorCodes: ['4.MGSR.2.2'] },
  { id: 'math-u09-l03', unitId: 'math-u09', title: 'Measure to the Nearest Quarter Inch', indicatorCodes: ['4.MGSR.2.3'] },
  { id: 'math-u09-l04', unitId: 'math-u09', title: 'Measure Customary and Metric Weight', indicatorCodes: ['4.MGSR.2.4'] },
  { id: 'math-u09-l05', unitId: 'math-u09', title: 'Convert Larger Customary Units to Smaller Units', indicatorCodes: ['4.MGSR.2.5'] },
  { id: 'math-u10-l01', unitId: 'math-u10', title: 'Rectangle Perimeter and Unknown Sides', indicatorCodes: ['4.MGSR.1.1'] },
  { id: 'math-u10-l02', unitId: 'math-u10', title: 'Rectangle Area in Square Units', indicatorCodes: ['4.MGSR.1.2'] },
  { id: 'math-u11-l01', unitId: 'math-u11', title: 'Classify Triangles by Sides and Angles', indicatorCodes: ['4.MGSR.3.1'] },
  { id: 'math-u11-l02', unitId: 'math-u11', title: 'The Quadrilateral Hierarchy', indicatorCodes: ['4.MGSR.3.2'] },
  { id: 'math-u12-l01', unitId: 'math-u12', title: 'Collect and Organize Data', indicatorCodes: ['4.DPSR.1.1'] },
  { id: 'math-u12-l02', unitId: 'math-u12', title: 'Solve Problems with Graphs and Tables', indicatorCodes: ['4.DPSR.1.2'] },
  { id: 'math-u12-l03', unitId: 'math-u12', title: 'Certain, Possible, and Impossible', indicatorCodes: ['4.DPSR.2.1'] },

  { id: 'reading-u01-l01', unitId: 'reading-u01', title: 'Read Accurately at a Good Pace', indicatorCodes: ['ELA.4.F.4.2'] },
  { id: 'reading-u01-l02', unitId: 'reading-u01', title: 'Read with Expression and Intonation', indicatorCodes: ['ELA.4.F.4.2'] },
  { id: 'reading-u02-l01', unitId: 'reading-u02', title: 'Build Meaning with Roots, Base Words, and Affixes', indicatorCodes: ['ELA.4.AOR.9.1'] },
  { id: 'reading-u02-l02', unitId: 'reading-u02', title: 'Use Definition, Example, and Restatement Clues', indicatorCodes: ['ELA.4.AOR.7.1'] },
  { id: 'reading-u02-l03', unitId: 'reading-u02', title: 'Use Print and Digital References Precisely', indicatorCodes: ['ELA.4.AOR.7.1'] },
  { id: 'reading-u03-l01', unitId: 'reading-u03', title: 'Connect Setting, Conflict, Character Change, and Plot', indicatorCodes: ['ELA.4.AOR.1.1'] },
  { id: 'reading-u04-l01', unitId: 'reading-u04', title: 'Explain Explicit and Implied Themes', indicatorCodes: ['ELA.4.AOR.2.1'] },
  { id: 'reading-u05-l01', unitId: 'reading-u05', title: 'Explain Stated and Implied Central Ideas', indicatorCodes: ['ELA.4.AOR.2.2'] },
  { id: 'reading-u06-l01', unitId: 'reading-u06', title: 'Summarize Literary Texts', indicatorCodes: ['ELA.4.AOR.6.1'] },
  { id: 'reading-u06-l02', unitId: 'reading-u06', title: 'Summarize Informational Texts', indicatorCodes: ['ELA.4.AOR.6.1'] },
  { id: 'reading-u07-l01', unitId: 'reading-u07', title: 'Use Text Features and Informational Structures', indicatorCodes: ['ELA.4.AOR.5.2'] },
  { id: 'reading-u07-l02', unitId: 'reading-u07', title: 'Explain How Visuals and Multimedia Add Meaning', indicatorCodes: ['ELA.4.AOR.10.1'] },
  { id: 'reading-u08-l01', unitId: 'reading-u08', title: "Connect Author's Purpose and Perspective", indicatorCodes: ['ELA.4.AOR.4.1'] },
  { id: 'reading-u08-l02', unitId: 'reading-u08', title: 'Explain Claims, Reasons, and Evidence', indicatorCodes: ['ELA.4.AOR.5.3'] },
  { id: 'reading-u09-l01', unitId: 'reading-u09', title: 'Compare First- and Third-Person Narration', indicatorCodes: ['ELA.4.AOR.3.1'] },
  { id: 'reading-u09-l02', unitId: 'reading-u09', title: 'Explain How Character Perspectives Shape a Story', indicatorCodes: ['ELA.4.AOR.3.1'] },
  { id: 'reading-u10-l01', unitId: 'reading-u10', title: 'Compare Narratives, Dramas, and Poems', indicatorCodes: ['ELA.4.AOR.5.1'] },
  { id: 'reading-u10-l02', unitId: 'reading-u10', title: 'Interpret Literal and Nonliteral Language', indicatorCodes: ['ELA.4.AOR.8.1'] },
  { id: 'reading-u10-l03', unitId: 'reading-u10', title: "Explain Figurative Language's Effect", indicatorCodes: ['ELA.4.AOR.1.2'] },
  { id: 'reading-u11-l01', unitId: 'reading-u11', title: 'Ask an Inquiry Question and Examine a Source', indicatorCodes: ['ELA.4.R.1.1'] },
  { id: 'reading-u11-l02', unitId: 'reading-u11', title: 'Judge the Credibility of a Provided Source', indicatorCodes: ['ELA.4.R.1.2'] },
  { id: 'reading-u11-l03', unitId: 'reading-u11', title: 'Select Information Relevant to a Topic', indicatorCodes: ['ELA.4.R.1.3'] },
  { id: 'reading-u11-l04', unitId: 'reading-u11', title: 'Group Related Research Findings', indicatorCodes: ['ELA.4.R.1.4'] },
  { id: 'reading-u11-l05', unitId: 'reading-u11', title: 'Cite Sources and Avoid Plagiarism', indicatorCodes: ['ELA.4.R.1.5'] },

  { id: 'science-u01-l01', unitId: 'science-u01', title: "Speed and an Object's Energy", indicatorCodes: ['4-PS3-1'] },
  { id: 'science-u01-l02', unitId: 'science-u01', title: 'Explain Speed and Energy with Evidence', indicatorCodes: ['4-PS3-1'] },
  { id: 'science-u01-l03', unitId: 'science-u01', title: 'Ask Questions About Collisions', indicatorCodes: ['4-PS3-3'] },
  { id: 'science-u01-l04', unitId: 'science-u01', title: 'Predict Collision Energy Outcomes', indicatorCodes: ['4-PS3-3'] },
  { id: 'science-u02-l01', unitId: 'science-u02', title: 'Observe Energy Transfer', indicatorCodes: ['4-PS3-2'] },
  { id: 'science-u02-l02', unitId: 'science-u02', title: 'Use Sound and Light as Evidence', indicatorCodes: ['4-PS3-2'] },
  { id: 'science-u02-l03', unitId: 'science-u02', title: 'Use Heat and Electric Current as Evidence', indicatorCodes: ['4-PS3-2'] },
  { id: 'science-u02-l04', unitId: 'science-u02', title: 'Compare Energy Transfer Observations', indicatorCodes: ['4-PS3-2'] },
  { id: 'science-u03-l01', unitId: 'science-u03', title: 'Model Wave Amplitude Patterns', indicatorCodes: ['4-PS4-1'] },
  { id: 'science-u03-l02', unitId: 'science-u03', title: 'Describe Wavelength Patterns', indicatorCodes: ['4-PS4-1'] },
  { id: 'science-u03-l03', unitId: 'science-u03', title: 'Model Waves Moving Objects', indicatorCodes: ['4-PS4-1'] },
  { id: 'science-u03-l04', unitId: 'science-u03', title: 'Model Reflected Light Entering the Eye', indicatorCodes: ['4-PS4-2'] },
  { id: 'science-u04-l01', unitId: 'science-u04', title: 'Build Two-Value Message Patterns', indicatorCodes: ['4-PS4-3'] },
  { id: 'science-u04-l02', unitId: 'science-u04', title: 'Design Morse and Drum Codes', indicatorCodes: ['4-PS4-3'] },
  { id: 'science-u04-l03', unitId: 'science-u04', title: 'Send Binary-Grid Picture Messages', indicatorCodes: ['4-PS4-3'] },
  { id: 'science-u04-l04', unitId: 'science-u04', title: 'Compare Message Solutions', indicatorCodes: ['4-PS4-3'] },
  { id: 'science-u05-l01', unitId: 'science-u05', title: 'Trace Allowed Energy Conversions', indicatorCodes: ['4-PS3-4'] },
  { id: 'science-u05-l02', unitId: 'science-u05', title: 'Plan a Device with Constraints', indicatorCodes: ['4-PS3-4'] },
  { id: 'science-u05-l03', unitId: 'science-u05', title: 'Test an Energy-Conversion Device', indicatorCodes: ['4-PS3-4'] },
  { id: 'science-u05-l04', unitId: 'science-u05', title: 'Refine a Device Using Test Evidence', indicatorCodes: ['4-PS3-4'] },
  { id: 'science-u06-l01', unitId: 'science-u06', title: 'Explain Plant Structures as a System', indicatorCodes: ['4-LS1-1'] },
  { id: 'science-u06-l02', unitId: 'science-u06', title: 'Explain Animal Structures as a System', indicatorCodes: ['4-LS1-1'] },
  { id: 'science-u06-l03', unitId: 'science-u06', title: 'Argue How Structures Support Survival', indicatorCodes: ['4-LS1-1'] },
  { id: 'science-u06-l04', unitId: 'science-u06', title: 'Model Sense, Brain, and Response', indicatorCodes: ['4-LS1-2'] },
  { id: 'science-u07-l01', unitId: 'science-u07', title: 'Find Earth-Feature Patterns on Maps', indicatorCodes: ['4-ESS2-2'] },
  { id: 'science-u07-l02', unitId: 'science-u07', title: 'Interpret Earth-Feature Map Data', indicatorCodes: ['4-ESS2-2'] },
  { id: 'science-u07-l03', unitId: 'science-u07', title: 'Test a Weathering or Erosion Variable', indicatorCodes: ['4-ESS2-1'] },
  { id: 'science-u07-l04', unitId: 'science-u07', title: 'Use Rock Layers and Fossils as Change Evidence', indicatorCodes: ['4-ESS1-1'] },
  { id: 'science-u08-l01', unitId: 'science-u08', title: 'Trace Energy and Fuels to Natural Resources', indicatorCodes: ['4-ESS3-1'] },
  { id: 'science-u08-l02', unitId: 'science-u08', title: 'Explain Environmental Effects of Resource Use', indicatorCodes: ['4-ESS3-1'] },
  { id: 'science-u08-l03', unitId: 'science-u08', title: 'Describe Natural-Process Hazards', indicatorCodes: ['4-ESS3-2'] },
  { id: 'science-u08-l04', unitId: 'science-u08', title: 'Compare Hazard-Impact Solutions', indicatorCodes: ['4-ESS3-2'] },
] as const satisfies readonly PlannedLesson[];
```

### Task C0: Prove the external dependency gate

**Files:**

- Read: `docs/superpowers/plans/2026-08-29-plan-a-closure-remediation.md`
- Read: `src/content/schema.ts`
- Read: `src/widgets/registry.ts`
- Read: `src/widgets/WidgetFrame.tsx`
- Read: `package.json`

**Interfaces:**

- Consumes: the execution-ledger record of explicit Plan A remediation authorization and independent acceptance; completed Plan B `WidgetRefSchema`, `WIDGET_TYPES`, `WidgetEventMap`, `widgetRegistry`, and `WidgetFrame` contracts.
- Produces: a written controller checkpoint containing the exact accepted Plan A remediation commit, completed Plan B commit range, final widget-type list, and green baseline output. No repository file changes and no commit.

- [ ] **Step 1: Verify Plan A remediation evidence (2–5 minutes).** Require the controller-supplied execution record to show explicit authorization, all three remediation commits, and an independent accepted review. Record the exact commit hashes; stop if any item is absent.

- [ ] **Step 2: Verify Plan B evidence (2–5 minutes).** Require the controller-supplied Plan B execution record to show completed Math, Reading, and Science widget waves plus accepted registry/schema/frame review. Record the exact commit range; stop if any subject is incomplete.

- [ ] **Step 3: Re-read the implemented contracts (2–5 minutes).** Compare `WidgetRefSchema`, `WIDGET_TYPES`, `WidgetEventMap`, `widgetRegistry`, and `WidgetFrame` against the accepted Plan B record; record the exact final type list.

- [ ] **Step 4: Run the baseline gate (2–5 minutes).** Run:

```bash
npm test && npx tsc -b --pretty false && npm run build
```

Expected: all tests pass, TypeScript emits no diagnostics, and the normal production build succeeds.

- [ ] **Step 5: Record the protected-path baseline without claiming ownership (2–5 minutes).** Run:

```bash
git status --short -- src/characters
git diff -- src/characters | git hash-object --stdin
git diff --cached -- src/characters | git hash-object --stdin
```

Expected: record the exact status plus unstaged/staged diff hashes in the controller checkpoint. Existing output belongs to its external owner and does not block Plan C; every later Plan C commit must keep character paths out of its staged diff. This task makes no commit.

### Task C1: Add the exact curriculum, OE schema field, and unit-test helper

**Files:**

- Create: `src/content/curriculum.ts`
- Create: `src/content/curriculum.test.ts`
- Create: `src/content/unit-test-helpers.ts`
- Create: `src/content/unit-test-helpers.test.ts`
- Modify: `src/content/schema.ts`
- Modify: `src/content/schema.test.ts`
- Read: `src/content/math/u01.ts`
- Read: `src/content/standards/standards.json`
- Read: `src/content/standards/schema.ts`
- Test: `src/content/content-validation.test.ts`
- Read: `docs/superpowers/plans/2026-08-29-plan-c1-math-curriculum-blueprint.md`
- Read: `docs/superpowers/plans/2026-08-29-plan-c2-reading-curriculum-blueprint.md`
- Read: `docs/superpowers/plans/2026-08-29-plan-c3-science-curriculum-blueprint.md`

**Interfaces:**

- Consumes: `StandardsDataSchema.parse(value)`, generated `reading.crossCuttingExpectations`, `LessonSchema`, `validateLesson(lesson: Lesson): string[]`, current `unit01Lessons` from `src/content/math/u01.ts`, and `SubjectId`/`Lesson` from `src/content/schema.ts`.
- Produces: `READING_OE_CODES: readonly string[]`, `PlannedLesson`, `PLANNED_LESSONS`, optional `Lesson.crossCuttingExpectationCodes?: string[]`, `PlannedUnitLesson`, and `expectUnitLessons(lessons: readonly Lesson[], expected: readonly PlannedUnitLesson[], subject: SubjectId): void`.

- [ ] **Step 1: Write the failing curriculum/schema tests (2–5 minutes).** Create `src/content/curriculum.test.ts` and append the schema test exactly:

```ts
// src/content/curriculum.test.ts
import { describe, expect, test } from 'vitest';
import standardsData from './standards/standards.json';
import { PLANNED_LESSONS, READING_OE_CODES } from './curriculum';
import { StandardsDataSchema } from './standards/schema';

describe('full-year curriculum contract', () => {
  test('freezes 89 unique lessons across 31 exact units', () => {
    expect(PLANNED_LESSONS).toHaveLength(89);
    expect(new Set(PLANNED_LESSONS.map(({ id }) => id)).size).toBe(89);
    expect(new Set(PLANNED_LESSONS.map(({ unitId }) => unitId)).size).toBe(31);
    expect(PLANNED_LESSONS.filter(({ id }) => id.startsWith('math-'))).toHaveLength(33);
    expect(PLANNED_LESSONS.filter(({ id }) => id.startsWith('reading-'))).toHaveLength(24);
    expect(PLANNED_LESSONS.filter(({ id }) => id.startsWith('science-'))).toHaveLength(32);
  });

  test('derives the exact Reading OE source of truth from validated standards', () => {
    const standards = StandardsDataSchema.parse(standardsData);
    expect(READING_OE_CODES).toEqual(
      standards.reading.crossCuttingExpectations.map(({ code }) => code),
    );
    expect(READING_OE_CODES).toEqual([
      'ELA.4.OE.1', 'ELA.4.OE.2', 'ELA.4.OE.3',
      'ELA.4.OE.4', 'ELA.4.OE.5', 'ELA.4.OE.6',
    ]);
  });

  test('uses canonical IDs and keeps each lesson inside its unit', () => {
    for (const lesson of PLANNED_LESSONS) {
      expect(lesson.id).toMatch(/^(math|reading|science)-u\d{2}-l\d{2}$/);
      expect(lesson.unitId).toBe(lesson.id.slice(0, lesson.id.lastIndexOf('-l')));
      expect(lesson.title.length).toBeGreaterThan(0);
      expect(lesson.indicatorCodes.length).toBeGreaterThan(0);
      expect(lesson.indicatorCodes.some((code) => code.startsWith('ELA.4.OE.'))).toBe(false);
    }
  });
});
```

```ts
// append to src/content/schema.test.ts
test('lesson schema preserves optional cross-cutting expectation codes', () => {
  const lesson = {
    ...makeLesson(),
    crossCuttingExpectationCodes: [
      'ELA.4.OE.1', 'ELA.4.OE.2', 'ELA.4.OE.3',
      'ELA.4.OE.4', 'ELA.4.OE.5', 'ELA.4.OE.6',
    ],
  };

  expect(LessonSchema.parse(lesson).crossCuttingExpectationCodes).toEqual(
    lesson.crossCuttingExpectationCodes,
  );
});
```

- [ ] **Step 2: Run red (2–5 minutes).** Run:

```bash
npm test -- src/content/curriculum.test.ts src/content/schema.test.ts
```

Expected: FAIL because `src/content/curriculum.ts` is missing and `LessonSchema` strips the not-yet-declared OE field.

- [ ] **Step 3: Add the manifest and schema field (2–5 minutes).** Create `src/content/curriculum.ts` with the complete **Exact Authored Curriculum Contract** above. Replace the existing `LessonSchema` definition with this exact definition:

```ts
export const LessonSchema = z.object({
  id: LessonIdSchema,
  unitId: UnitIdSchema,
  title: z.string().min(1),
  indicatorCodes: z.array(z.string()).min(1),
  crossCuttingExpectationCodes: z.array(z.string().min(1)).optional(),
  intro: z.array(DialogueLineSchema).min(1),
  learnCards: z.array(LearnCardSchema).min(1),
  workedExample: z.object({ title: z.string(), steps: z.array(z.string()).min(1) }),
  quiz: z.object({ passThreshold: z.literal(8), pool: z.array(QuestionSchema) }),
});
```

- [ ] **Step 4: Write the failing helper test (2–5 minutes).** Create `src/content/unit-test-helpers.test.ts` exactly:

```ts
import { test } from 'vitest';
import { unit01Lessons } from './math/u01';
import { expectUnitLessons } from './unit-test-helpers';

test('unit helper accepts the exact reviewed Math pilot contract', () => {
  expectUnitLessons(unit01Lessons, [
    { id: 'math-u01-l01', title: 'Numbers to the Millions', indicatorCodes: ['4.NR.1.1'] },
    { id: 'math-u01-l02', title: 'Comparing and Ordering Big Numbers', indicatorCodes: ['4.NR.1.3'] },
  ], 'math');
});
```

- [ ] **Step 5: Run the helper red gate (2–5 minutes).** Run:

```bash
npm test -- src/content/unit-test-helpers.test.ts
```

Expected: FAIL because `src/content/unit-test-helpers.ts` does not exist.

- [ ] **Step 6: Implement the complete helper (2–5 minutes).** Create `src/content/unit-test-helpers.ts` exactly:

```ts
import { expect } from 'vitest';
import { READING_OE_CODES, type PlannedLesson } from './curriculum';
import { validateLesson, type Lesson, type SubjectId } from './schema';

export type PlannedUnitLesson = Pick<PlannedLesson, 'id' | 'title' | 'indicatorCodes'>;

export function expectUnitLessons(
  lessons: readonly Lesson[],
  expected: readonly PlannedUnitLesson[],
  subject: SubjectId,
): void {
  expect(lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes })))
    .toEqual(expected.map(({ id, title, indicatorCodes }) => ({
      id,
      title,
      indicatorCodes: [...indicatorCodes],
    })));

  for (const lesson of lessons) {
    expect(lesson.id.startsWith(`${subject}-`)).toBe(true);
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.learnCards).toHaveLength(3);
    expect(lesson.quiz.passThreshold).toBe(8);
    expect(lesson.quiz.pool).toHaveLength(13);
    expect(new Set(lesson.quiz.pool.map(({ id }) => id)).size).toBe(13);
    expect(new Set(lesson.quiz.pool.map(({ type }) => type)).size).toBeGreaterThanOrEqual(2);

    const cards = new Set(lesson.learnCards.map(({ id }) => id));
    const reviewCardByTag = new Map<string, string>();
    for (const question of lesson.quiz.pool) {
      expect(cards.has(question.reviewCardId)).toBe(true);
      const existing = reviewCardByTag.get(question.conceptTag);
      if (existing === undefined) reviewCardByTag.set(question.conceptTag, question.reviewCardId);
      else expect(question.reviewCardId).toBe(existing);
    }
    expect(new Set(lesson.quiz.pool.map(({ reviewCardId }) => reviewCardId))).toEqual(cards);

    if (subject === 'reading') {
      expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
      expect(lesson.indicatorCodes.some((code) => code.startsWith('ELA.4.OE.'))).toBe(false);
    } else {
      expect(lesson.crossCuttingExpectationCodes).toBeUndefined();
    }
  }
}
```

- [ ] **Step 7: Run the focused and permanent green gate (2–5 minutes).** Run:

```bash
npm test -- src/content/curriculum.test.ts src/content/unit-test-helpers.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false
```

Expected: PASS; the manifest is 33/24/32, the OE array equals generated metadata, the schema preserves the field, and the existing pilot passes the helper.

- [ ] **Step 8: Commit exactly (2–5 minutes).** Run:

```bash
git add src/content/curriculum.ts src/content/curriculum.test.ts src/content/unit-test-helpers.ts src/content/unit-test-helpers.test.ts src/content/schema.ts src/content/schema.test.ts
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat(content): define full-year curriculum contract"
```

### Task C2: Add deterministic source-to-generated standards parity

**Files:**

- Create: `scripts/check-standards-parity.mjs`
- Modify: `package.json`
- Read: `scripts/build-standards.mjs`
- Test: `scripts/build-standards.test.mjs`
- Test: `src/content/standards/schema.test.ts`
- Test: `src/content/curriculum.test.ts`
- Read: `docs/research/sc-grade4-standards.json`
- Read: `src/content/standards/standards.json`

**Interfaces:**

- Consumes: research `bySubject.math`, `bySubject['ela-reading']`, `bySubject.science`, each subject's `indicators` and `suggestedUnitSequence`, plus the generated `math`, `reading`, and `science` standards subjects.
- Produces: `npm run standards:check`, which exits zero only when regular indicator codes, Reading OE metadata, unit number/title/allocation/prerequisites, and 12/11/8 unit counts match exactly.

- [ ] **Step 1: Add the failing package command (2–5 minutes).** Add this exact script entry after `build:single` in `package.json`:

```json
"standards:check": "node scripts/check-standards-parity.mjs",
```

- [ ] **Step 2: Run red (2–5 minutes).** Run:

```bash
npm run standards:check
```

Expected: FAIL with module-not-found for `scripts/check-standards-parity.mjs`.

- [ ] **Step 3: Implement the parity script (2–5 minutes).** Create `scripts/check-standards-parity.mjs` exactly:

```js
#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = JSON.parse(readFileSync('docs/research/sc-grade4-standards.json', 'utf8'));
const generated = JSON.parse(readFileSync('src/content/standards/standards.json', 'utf8'));
const OE_PATTERN = /^ELA\.4\.OE\./;
const sourceKey = {
  math: 'math',
  reading: 'ela-reading',
  science: 'science',
};
const expectedUnitCounts = { math: 12, reading: 11, science: 8 };

for (const subjectId of ['math', 'reading', 'science']) {
  const raw = source.bySubject[sourceKey[subjectId]];
  const built = generated[subjectId];
  const regular = raw.indicators.filter(({ code }) => subjectId !== 'reading' || !OE_PATTERN.test(code));
  const crossCutting = subjectId === 'reading'
    ? raw.indicators.filter(({ code }) => OE_PATTERN.test(code))
    : [];

  assert.deepEqual(
    built.indicators.map(({ code }) => code),
    regular.map(({ code }) => code),
    `${subjectId} regular indicator codes drifted`,
  );
  assert.deepEqual(
    built.crossCuttingExpectations.map(({ code }) => code),
    crossCutting.map(({ code }) => code),
    `${subjectId} cross-cutting codes drifted`,
  );
  assert.deepEqual(
    built.units,
    raw.suggestedUnitSequence.map((unit) => ({
      number: unit.unitNumber,
      title: unit.title,
      indicatorCodes: unit.indicatorCodes.filter(
        (code) => subjectId !== 'reading' || !OE_PATTERN.test(code),
      ),
      prerequisiteUnits: [...unit.prerequisiteUnits],
    })),
    `${subjectId} unit metadata drifted`,
  );
  assert.equal(built.units.length, expectedUnitCounts[subjectId], `${subjectId} unit count drifted`);
}

assert.deepEqual(
  generated.reading.crossCuttingExpectations.map(({ code }) => code),
  ['ELA.4.OE.1', 'ELA.4.OE.2', 'ELA.4.OE.3', 'ELA.4.OE.4', 'ELA.4.OE.5', 'ELA.4.OE.6'],
  'Reading OE codes must remain exact and ordered',
);

console.log('standards parity: math 33/12, reading 20+6 OE/11, science 14/8');
```

- [ ] **Step 4: Run the focused and permanent green gate (2–5 minutes).** Run:

```bash
npm run standards:check && npm test -- scripts/build-standards.test.mjs src/content/standards/schema.test.ts src/content/curriculum.test.ts && npx tsc -b --pretty false
```

Expected: PASS and the script prints `standards parity: math 33/12, reading 20+6 OE/11, science 14/8`.

- [ ] **Step 5: Regenerate and require no drift (2–5 minutes).** Run:

```bash
node scripts/build-standards.mjs && git diff --exit-code -- src/content/standards/standards.json && npm test -- scripts/build-standards.test.mjs src/content/standards/schema.test.ts && npx tsc -b --pretty false
```

Expected: generator reports 33/20/14 regular indicators and 12/11/8 units; the diff command has no output.

- [ ] **Step 6: Commit exactly (2–5 minutes).** Run:

```bash
git add scripts/check-standards-parity.mjs package.json
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "test(content): add standards parity gate"
```

### Task C3: After all five Math waves are accepted, register all 12 Math units once

**Files:**

- Read: `docs/superpowers/plans/2026-08-29-plan-c1a-math-u02-u04.md`
- Read: `docs/superpowers/plans/2026-08-29-plan-c1b-math-u05-u06.md`
- Read: `docs/superpowers/plans/2026-08-29-plan-c1c-math-u07-u08.md`
- Read: `docs/superpowers/plans/2026-08-29-plan-c1d-math-u09-u10.md`
- Read: `docs/superpowers/plans/2026-08-29-plan-c1e-math-u11-u12.md`
- Read: `src/content/math/u01.ts`
- Read: `src/content/math/u02.ts`; Test: `src/content/math/u02.test.ts`
- Read: `src/content/math/u03.ts`; Test: `src/content/math/u03.test.ts`
- Read: `src/content/math/u04.ts`; Test: `src/content/math/u04.test.ts`
- Read: `src/content/math/u05.ts`; Test: `src/content/math/u05.test.ts`
- Read: `src/content/math/u06.ts`; Test: `src/content/math/u06.test.ts`
- Read: `src/content/math/u07.ts`; Test: `src/content/math/u07.test.ts`
- Read: `src/content/math/u08.ts`; Test: `src/content/math/u08.test.ts`
- Read: `src/content/math/u09.ts`; Test: `src/content/math/u09.test.ts`
- Read: `src/content/math/u10.ts`; Test: `src/content/math/u10.test.ts`
- Read: `src/content/math/u11.ts`; Test: `src/content/math/u11.test.ts`
- Read: `src/content/math/u12.ts`; Test: `src/content/math/u12.test.ts`
- Modify: `src/content/math/index.ts`
- Create: `src/content/math/index.test.ts`
- Test: `src/content/schema.test.ts`
- Test: `src/content/curriculum.test.ts`
- Test: `src/content/content-validation.test.ts`

**Interfaces:**

- Consumes: all five accepted Math wave records; reviewed `unit01Lessons`, `unit02Lessons`, `unit03Lessons`, `unit04Lessons`, `unit05Lessons`, `unit06Lessons`, `unit07Lessons`, `unit08Lessons`, `unit09Lessons`, `unit10Lessons`, `unit11Lessons`, and `unit12Lessons`, each typed as `Lesson[]`; plus Math rows from `PLANNED_LESSONS`.
- Produces: the single Math registry integration, `lessonsByUnit: Record<string, Lesson[]>`, with keys `math-u01` through `math-u12` in numeric order and exactly 33 manifest-ordered lessons. No earlier Math wave performs an index integration.

- [ ] **Step 1: Verify the five literal plans (2–5 minutes).** Run:

```bash
! rg -n "T[O]DO|T[B]D|implement l[a]ter|fill in d[e]tails|s[i]milar[[:space:]]+to|=\s*\[\s*\]" docs/superpowers/plans/2026-08-29-plan-c1a-math-u02-u04.md docs/superpowers/plans/2026-08-29-plan-c1b-math-u05-u06.md docs/superpowers/plans/2026-08-29-plan-c1c-math-u07-u08.md docs/superpowers/plans/2026-08-29-plan-c1d-math-u09-u10.md docs/superpowers/plans/2026-08-29-plan-c1e-math-u11-u12.md
```

Expected: no output. Confirm all five execution records show every lesson independently reviewed and committed and no wave touched `src/content/math/index.ts`; do not continue with this controller task until all five records are accepted.

- [ ] **Step 2: Run the unregistered Math handoff gate (2–5 minutes).** Run:

```bash
npm test -- src/content/math/u02.test.ts src/content/math/u03.test.ts src/content/math/u04.test.ts src/content/math/u05.test.ts src/content/math/u06.test.ts src/content/math/u07.test.ts src/content/math/u08.test.ts src/content/math/u09.test.ts src/content/math/u10.test.ts src/content/math/u11.test.ts src/content/math/u12.test.ts src/content/schema.test.ts src/content/curriculum.test.ts && npx tsc -b --pretty false
```

Expected: PASS. Stop on an invalid answer, empty export, invalid widget, or unreviewed wave.

- [ ] **Step 3: Write the failing registry test (2–5 minutes).** Create `src/content/math/index.test.ts` exactly:

```ts
import { expect, test } from 'vitest';
import { PLANNED_LESSONS } from '../curriculum';
import { lessonsByUnit } from './index';

test('Math registry matches all planned rows in unit order', () => {
  const expected = PLANNED_LESSONS.filter(({ id }) => id.startsWith('math-'));
  expect(Object.keys(lessonsByUnit)).toEqual([...new Set(expected.map(({ unitId }) => unitId))]);
  expect(Object.values(lessonsByUnit).flat().map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes,
  }))).toEqual(expected.map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes: [...indicatorCodes],
  })));
});
```

- [ ] **Step 4: Run red (2–5 minutes).** Run:

```bash
npm test -- src/content/math/index.test.ts
```

Expected: FAIL because the current index exposes only `math-u01` and 2 lessons.

- [ ] **Step 5: Replace the Math index with exact imports and keys (2–5 minutes).** Use:

```ts
import type { Lesson } from '../schema';
import { unit01Lessons } from './u01';
import { unit02Lessons } from './u02';
import { unit03Lessons } from './u03';
import { unit04Lessons } from './u04';
import { unit05Lessons } from './u05';
import { unit06Lessons } from './u06';
import { unit07Lessons } from './u07';
import { unit08Lessons } from './u08';
import { unit09Lessons } from './u09';
import { unit10Lessons } from './u10';
import { unit11Lessons } from './u11';
import { unit12Lessons } from './u12';

export const lessonsByUnit: Record<string, Lesson[]> = {
  'math-u01': unit01Lessons,
  'math-u02': unit02Lessons,
  'math-u03': unit03Lessons,
  'math-u04': unit04Lessons,
  'math-u05': unit05Lessons,
  'math-u06': unit06Lessons,
  'math-u07': unit07Lessons,
  'math-u08': unit08Lessons,
  'math-u09': unit09Lessons,
  'math-u10': unit10Lessons,
  'math-u11': unit11Lessons,
  'math-u12': unit12Lessons,
};
```

- [ ] **Step 6: Run the focused and permanent green gate (2–5 minutes).** Run:

```bash
npm test -- src/content/math/index.test.ts src/content/math/u02.test.ts src/content/math/u03.test.ts src/content/math/u04.test.ts src/content/math/u05.test.ts src/content/math/u06.test.ts src/content/math/u07.test.ts src/content/math/u08.test.ts src/content/math/u09.test.ts src/content/math/u10.test.ts src/content/math/u11.test.ts src/content/math/u12.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false
```

Expected: PASS with 12 ordered keys and 33 exact Math lessons.

- [ ] **Step 7: Commit exactly (2–5 minutes).** Run:

```bash
git add src/content/math/index.ts src/content/math/index.test.ts
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat(content): register complete math curriculum"
```

### Task C4: Accept the Reading waves and register all 11 Reading units

**Files:**

- Read: `docs/superpowers/plans/2026-08-29-plan-c2a-reading-u01-u03.md`
- Read: `docs/superpowers/plans/2026-08-29-plan-c2b-reading-u04-u07.md`
- Read: `docs/superpowers/plans/2026-08-29-plan-c2c-reading-u08-u10.md`
- Read: `docs/superpowers/plans/2026-08-29-plan-c2d-reading-u11.md`
- Read: `src/content/reading/u01.ts`; Test: `src/content/reading/u01.test.ts`
- Read: `src/content/reading/u02.ts`; Test: `src/content/reading/u02.test.ts`
- Read: `src/content/reading/u03.ts`; Test: `src/content/reading/u03.test.ts`
- Read: `src/content/reading/u04.ts`; Test: `src/content/reading/u04.test.ts`
- Read: `src/content/reading/u05.ts`; Test: `src/content/reading/u05.test.ts`
- Read: `src/content/reading/u06.ts`; Test: `src/content/reading/u06.test.ts`
- Read: `src/content/reading/u07.ts`; Test: `src/content/reading/u07.test.ts`
- Read: `src/content/reading/u08.ts`; Test: `src/content/reading/u08.test.ts`
- Read: `src/content/reading/u09.ts`; Test: `src/content/reading/u09.test.ts`
- Read: `src/content/reading/u10.ts`; Test: `src/content/reading/u10.test.ts`
- Read: `src/content/reading/u11.ts`; Test: `src/content/reading/u11.test.ts`
- Modify: `src/content/reading/index.ts`
- Create: `src/content/reading/index.test.ts`
- Test: `src/content/schema.test.ts`
- Test: `src/content/curriculum.test.ts`
- Test: `src/content/content-validation.test.ts`

**Interfaces:**

- Consumes: reviewed `unit01Lessons`, `unit02Lessons`, `unit03Lessons`, `unit04Lessons`, `unit05Lessons`, `unit06Lessons`, `unit07Lessons`, `unit08Lessons`, `unit09Lessons`, `unit10Lessons`, and `unit11Lessons`, each typed as `Lesson[]`, plus Reading rows from `PLANNED_LESSONS` and exact `[...READING_OE_CODES]` metadata on every lesson.
- Produces: `lessonsByUnit: Record<string, Lesson[]>` with keys `reading-u01` through `reading-u11` in numeric order and exactly 24 manifest-ordered lessons.

- [ ] **Step 1: Verify the four literal plans (2–5 minutes).** Run:

```bash
! rg -n "T[O]DO|T[B]D|implement l[a]ter|fill in d[e]tails|s[i]milar[[:space:]]+to|=\s*\[\s*\]" docs/superpowers/plans/2026-08-29-plan-c2a-reading-u01-u03.md docs/superpowers/plans/2026-08-29-plan-c2b-reading-u04-u07.md docs/superpowers/plans/2026-08-29-plan-c2c-reading-u08-u10.md docs/superpowers/plans/2026-08-29-plan-c2d-reading-u11.md
```

Expected: no output. Confirm their execution records show 24 accepted lessons, 72 cards, and 312 reviewed answers.

- [ ] **Step 2: Run the partial-registry Reading handoff gate (2–5 minutes).** Run:

```bash
npm test -- src/content/reading/u01.test.ts src/content/reading/u02.test.ts src/content/reading/u03.test.ts src/content/reading/u04.test.ts src/content/reading/u05.test.ts src/content/reading/u06.test.ts src/content/reading/u07.test.ts src/content/reading/u08.test.ts src/content/reading/u09.test.ts src/content/reading/u10.test.ts src/content/reading/u11.test.ts src/content/schema.test.ts src/content/curriculum.test.ts && npx tsc -b --pretty false
```

Expected: PASS for the focused modules present at this stage; any registry/catalog red gate must fail only because later units are missing. Reading Unit 1 is already registered and visible from `05b46b9`.

- [ ] **Step 3: Write the failing registry test (2–5 minutes).** Create `src/content/reading/index.test.ts` exactly:

```ts
import { expect, test } from 'vitest';
import { PLANNED_LESSONS, READING_OE_CODES } from '../curriculum';
import { lessonsByUnit } from './index';

test('Reading registry matches all planned rows and OE metadata in unit order', () => {
  const expected = PLANNED_LESSONS.filter(({ id }) => id.startsWith('reading-'));
  expect(Object.keys(lessonsByUnit)).toEqual([...new Set(expected.map(({ unitId }) => unitId))]);
  const lessons = Object.values(lessonsByUnit).flat();
  expect(lessons.map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes,
  }))).toEqual(expected.map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes: [...indicatorCodes],
  })));
  for (const lesson of lessons) {
    expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
    expect(lesson.indicatorCodes.some((code) => code.startsWith('ELA.4.OE.'))).toBe(false);
  }
});
```

- [ ] **Step 4: Run red (2–5 minutes).** Run:

```bash
npm test -- src/content/reading/index.test.ts
```

Expected: FAIL because the current Reading index is empty.

- [ ] **Step 5: Replace the Reading index with exact imports and keys (2–5 minutes).** Use:

```ts
import type { Lesson } from '../schema';
import { unit01Lessons } from './u01';
import { unit02Lessons } from './u02';
import { unit03Lessons } from './u03';
import { unit04Lessons } from './u04';
import { unit05Lessons } from './u05';
import { unit06Lessons } from './u06';
import { unit07Lessons } from './u07';
import { unit08Lessons } from './u08';
import { unit09Lessons } from './u09';
import { unit10Lessons } from './u10';
import { unit11Lessons } from './u11';

export const lessonsByUnit: Record<string, Lesson[]> = {
  'reading-u01': unit01Lessons,
  'reading-u02': unit02Lessons,
  'reading-u03': unit03Lessons,
  'reading-u04': unit04Lessons,
  'reading-u05': unit05Lessons,
  'reading-u06': unit06Lessons,
  'reading-u07': unit07Lessons,
  'reading-u08': unit08Lessons,
  'reading-u09': unit09Lessons,
  'reading-u10': unit10Lessons,
  'reading-u11': unit11Lessons,
};
```

- [ ] **Step 6: Run the focused and permanent green gate (2–5 minutes).** Run:

```bash
npm test -- src/content/reading/index.test.ts src/content/reading/u01.test.ts src/content/reading/u02.test.ts src/content/reading/u03.test.ts src/content/reading/u04.test.ts src/content/reading/u05.test.ts src/content/reading/u06.test.ts src/content/reading/u07.test.ts src/content/reading/u08.test.ts src/content/reading/u09.test.ts src/content/reading/u10.test.ts src/content/reading/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false
```

Expected: PASS with 11 ordered keys, 24 exact Reading lessons, and six OE values on every Reading lesson only.

- [ ] **Step 7: Commit exactly (2–5 minutes).** Run:

```bash
git add src/content/reading/index.ts src/content/reading/index.test.ts
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat(content): register complete reading curriculum"
```

### Task C5: Accept the Science waves and register all 8 Science units

**Files:**

- Read: `docs/superpowers/plans/2026-08-29-plan-c3a-science-u01-u02.md`
- Read: `docs/superpowers/plans/2026-08-29-plan-c3b-science-u03-u04.md`
- Read: `docs/superpowers/plans/2026-08-29-plan-c3c-science-u05-u06.md`
- Read: `docs/superpowers/plans/2026-08-29-plan-c3d-science-u07-u08.md`
- Read: `src/content/science/u01.ts`; Test: `src/content/science/u01.test.ts`
- Read: `src/content/science/u02.ts`; Test: `src/content/science/u02.test.ts`
- Read: `src/content/science/u03.ts`; Test: `src/content/science/u03.test.ts`
- Read: `src/content/science/u04.ts`; Test: `src/content/science/u04.test.ts`
- Read: `src/content/science/u05.ts`; Test: `src/content/science/u05.test.ts`
- Read: `src/content/science/u06.ts`; Test: `src/content/science/u06.test.ts`
- Read: `src/content/science/u07.ts`; Test: `src/content/science/u07.test.ts`
- Read: `src/content/science/u08.ts`; Test: `src/content/science/u08.test.ts`
- Modify: `src/content/science/index.ts`
- Create: `src/content/science/index.test.ts`
- Test: `src/content/schema.test.ts`
- Test: `src/content/curriculum.test.ts`
- Test: `src/content/content-validation.test.ts`

**Interfaces:**

- Consumes: reviewed `unit01Lessons`, `unit02Lessons`, `unit03Lessons`, `unit04Lessons`, `unit05Lessons`, `unit06Lessons`, `unit07Lessons`, and `unit08Lessons`, each typed as `Lesson[]`, plus Science rows from `PLANNED_LESSONS`.
- Produces: `lessonsByUnit: Record<string, Lesson[]>` with keys `science-u01` through `science-u08` in numeric order and exactly 32 manifest-ordered lessons.

- [ ] **Step 1: Verify the four literal plans (2–5 minutes).** Run:

```bash
! rg -n "T[O]DO|T[B]D|implement l[a]ter|fill in d[e]tails|s[i]milar[[:space:]]+to|=\s*\[\s*\]" docs/superpowers/plans/2026-08-29-plan-c3a-science-u01-u02.md docs/superpowers/plans/2026-08-29-plan-c3b-science-u03-u04.md docs/superpowers/plans/2026-08-29-plan-c3c-science-u05-u06.md docs/superpowers/plans/2026-08-29-plan-c3d-science-u07-u08.md
```

Expected: no output. Confirm their execution records show 32 accepted lessons, 96 cards, 416 reviewed answers, and all PE boundaries signed off.

- [ ] **Step 2: Run the partial-registry Science handoff gate (2–5 minutes).** Run:

```bash
npm test -- src/content/science/u01.test.ts src/content/science/u02.test.ts src/content/science/u03.test.ts src/content/science/u04.test.ts src/content/science/u05.test.ts src/content/science/u06.test.ts src/content/science/u07.test.ts src/content/science/u08.test.ts src/content/schema.test.ts src/content/curriculum.test.ts && npx tsc -b --pretty false
```

Expected: PASS for the focused modules present at this stage; any registry/catalog red gate must fail only because later units are missing. Science Unit 1 is already registered and visible from `05b46b9`.

- [ ] **Step 3: Write the failing registry test (2–5 minutes).** Create `src/content/science/index.test.ts` exactly:

```ts
import { expect, test } from 'vitest';
import { PLANNED_LESSONS } from '../curriculum';
import { lessonsByUnit } from './index';

test('Science registry matches all planned rows in unit order', () => {
  const expected = PLANNED_LESSONS.filter(({ id }) => id.startsWith('science-'));
  expect(Object.keys(lessonsByUnit)).toEqual([...new Set(expected.map(({ unitId }) => unitId))]);
  expect(Object.values(lessonsByUnit).flat().map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes,
  }))).toEqual(expected.map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes: [...indicatorCodes],
  })));
});
```

- [ ] **Step 4: Run red (2–5 minutes).** Run:

```bash
npm test -- src/content/science/index.test.ts
```

Expected: FAIL because the current Science index is empty.

- [ ] **Step 5: Replace the Science index with exact imports and keys (2–5 minutes).** Use:

```ts
import type { Lesson } from '../schema';
import { unit01Lessons } from './u01';
import { unit02Lessons } from './u02';
import { unit03Lessons } from './u03';
import { unit04Lessons } from './u04';
import { unit05Lessons } from './u05';
import { unit06Lessons } from './u06';
import { unit07Lessons } from './u07';
import { unit08Lessons } from './u08';

export const lessonsByUnit: Record<string, Lesson[]> = {
  'science-u01': unit01Lessons,
  'science-u02': unit02Lessons,
  'science-u03': unit03Lessons,
  'science-u04': unit04Lessons,
  'science-u05': unit05Lessons,
  'science-u06': unit06Lessons,
  'science-u07': unit07Lessons,
  'science-u08': unit08Lessons,
};
```

- [ ] **Step 6: Run the focused and permanent green gate (2–5 minutes).** Run:

```bash
npm test -- src/content/science/index.test.ts src/content/science/u01.test.ts src/content/science/u02.test.ts src/content/science/u03.test.ts src/content/science/u04.test.ts src/content/science/u05.test.ts src/content/science/u06.test.ts src/content/science/u07.test.ts src/content/science/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false
```

Expected: PASS with 8 ordered keys and 32 exact Science lessons.

- [ ] **Step 7: Commit exactly (2–5 minutes).** Run:

```bash
git add src/content/science/index.ts src/content/science/index.test.ts
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat(content): register complete science curriculum"
```

### Task C6: Add permanent exact-catalog and OE policy tests

**Files:**

- Modify: `src/content/content-validation.test.ts`
- Test: `src/content/math/index.test.ts`
- Test: `src/content/reading/index.test.ts`
- Test: `src/content/science/index.test.ts`
- Test: `src/content/subjects.test.ts`
- Test: `src/content/curriculum.test.ts`
- Test: `src/content/schema.test.ts`
- Read: `src/content/subjects.ts`
- Read: `src/content/curriculum.ts`
- Read: `src/content/standards/standards.json`

**Interfaces:**

- Consumes: `PLANNED_LESSONS`, `READING_OE_CODES`, `allLessons(): Lesson[]`, `SUBJECTS`, parsed `standards`, and the three completed `lessonsByUnit` registries.
- Produces: permanent assertions for exact 89-row runtime equality, 31 populated units, 33/24/32 subject counts, 267 cards, 1,157 questions, full regular-indicator coverage, and Reading-only OE metadata.

- [ ] **Step 1: Extend imports (2–5 minutes).** Add this import and include `standards` in the existing subjects import:

```ts
import { PLANNED_LESSONS, READING_OE_CODES } from './curriculum';
import { allLessons, SUBJECTS, getSubject, standards } from './subjects';
```

Remove the superseded import line that omitted `standards`; keep every pre-existing test.

- [ ] **Step 2: Add the exact runtime contract tests (2–5 minutes).** Append this code to `src/content/content-validation.test.ts`:

```ts
test('runtime catalog equals the exact 89-row authored manifest', () => {
  expect(allLessons().map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes,
  }))).toEqual(PLANNED_LESSONS.map(({ id, unitId, title, indicatorCodes }) => ({
    id, unitId, title, indicatorCodes: [...indicatorCodes],
  })));
});

test('all 31 units are populated with the exact subject totals', () => {
  expect(SUBJECTS.flatMap(({ units }) => units)).toHaveLength(31);
  expect(SUBJECTS.every(({ units }) => units.every(({ lessons }) => lessons.length > 0))).toBe(true);
  expect(getSubject('math').units.flatMap(({ lessons }) => lessons)).toHaveLength(33);
  expect(getSubject('reading').units.flatMap(({ lessons }) => lessons)).toHaveLength(24);
  expect(getSubject('science').units.flatMap(({ lessons }) => lessons)).toHaveLength(32);
});

test('the full catalog has exact card, question, and threshold totals', () => {
  const lessons = allLessons();
  expect(lessons.flatMap(({ learnCards }) => learnCards)).toHaveLength(267);
  expect(lessons.flatMap(({ quiz }) => quiz.pool)).toHaveLength(1_157);
  for (const lesson of lessons) {
    expect(lesson.learnCards).toHaveLength(3);
    expect(lesson.quiz.pool).toHaveLength(13);
    expect(lesson.quiz.passThreshold).toBe(8);
  }
});

test('every generated regular indicator is covered by its own subject lessons', () => {
  for (const subject of SUBJECTS) {
    const covered = new Set(subject.units.flatMap(({ lessons }) =>
      lessons.flatMap(({ indicatorCodes }) => indicatorCodes)));
    for (const { code } of standards[subject.id].indicators) expect(covered.has(code)).toBe(true);
  }
});

test('Reading alone declares the exact generated OE array', () => {
  for (const subject of SUBJECTS) {
    for (const lesson of subject.units.flatMap(({ lessons }) => lessons)) {
      expect(lesson.indicatorCodes.some((code) => code.startsWith('ELA.4.OE.'))).toBe(false);
      if (subject.id === 'reading') {
        expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
      } else {
        expect(lesson.crossCuttingExpectationCodes).toBeUndefined();
      }
    }
  }
});
```

- [ ] **Step 3: Run the focused contract gate (2–5 minutes).** Run:

```bash
npm test -- src/content/math/index.test.ts src/content/reading/index.test.ts src/content/science/index.test.ts src/content/subjects.test.ts src/content/content-validation.test.ts src/content/curriculum.test.ts src/content/schema.test.ts && npx tsc -b --pretty false
```

Expected: PASS. If a row/count/OE assertion fails, return the defect to its owning subject wave or registry task; do not loosen the expected contract.

- [ ] **Step 4: Check the exact test diff (2–5 minutes).** Run:

```bash
git diff --check -- src/content/content-validation.test.ts
git diff -- src/content/content-validation.test.ts
```

Expected: no whitespace errors; the diff contains the import extension and five tests above only.

- [ ] **Step 5: Commit exactly (2–5 minutes).** Run:

```bash
git add src/content/content-validation.test.ts
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "test(content): enforce exact full-year catalog"
```

### Task C7: Add the deterministic all-lesson grading and review-link audit

**Files:**

- Create: `src/content/lesson-quality.test.ts`
- Read: `src/content/curriculum.ts`
- Read: `src/content/schema.ts`
- Read: `src/content/subjects.ts`
- Read: `src/quiz/engine.ts`
- Test: `src/quiz/engine.test.ts`
- Test: `src/content/schema.test.ts`
- Test: `src/content/content-validation.test.ts`

**Interfaces:**

- Consumes: `Question`, `validateLesson`, `PLANNED_LESSONS`, `allLessons()`, `findLesson(lessonId)`, `Answer`, `sampleQuiz(pool, n, rng)`, `gradeAnswer(question, answer)`, `buildResult(questions, answers)`, and the accepted `normalizeText` alias from the shared Plan A remediation normalizer.
- Produces: seeded 10-of-13 sampling coverage, all correct-form acceptance, rejection of every incorrect visible choice, deterministic adjacent-swap and reversal coverage for every sort question, a normalization-safe wrong fill answer, card reachability, and result deep-link validation for every one of the 89 lessons. Exact positional sort grading remains independently covered by `src/quiz/engine.test.ts`; this catalog audit is linear in authored sort length rather than factorial.

- [ ] **Step 1: Create the permanent deterministic test (2–5 minutes).** Create `src/content/lesson-quality.test.ts` exactly:

```ts
import { describe, expect, test } from 'vitest';
import { PLANNED_LESSONS } from './curriculum';
import { validateLesson, type Question } from './schema';
import { allLessons, findLesson } from './subjects';
import {
  buildResult,
  gradeAnswer,
  normalizeText,
  sampleQuiz,
  type Answer,
} from '../quiz/engine';

function makeLcg(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function representativeWrongSortAnswers(values: readonly string[]): string[][] {
  const candidates: string[][] = [];
  for (let index = 0; index < values.length - 1; index += 1) {
    candidates.push([
      ...values.slice(0, index),
      values[index + 1]!,
      values[index]!,
      ...values.slice(index + 2),
    ]);
  }
  candidates.push([...values].reverse());

  const seen = new Set<string>();
  return candidates.filter((candidate) => {
    if (!candidate.some((id, index) => id !== values[index])) return false;
    const key = JSON.stringify(candidate);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function correctAnswers(question: Question): Answer[] {
  switch (question.type) {
    case 'multiple-choice':
    case 'true-false':
      return [question.correctChoiceId];
    case 'fill-blank':
      return [...question.acceptedAnswers];
    case 'sort':
      return [[...question.correctOrder]];
  }
}

function incorrectAnswers(question: Question): Answer[] {
  switch (question.type) {
    case 'multiple-choice':
    case 'true-false':
      return question.choices
        .filter(({ id }) => id !== question.correctChoiceId)
        .map(({ id }) => id);
    case 'fill-blank': {
      const accepted = new Set(question.acceptedAnswers.map(normalizeText));
      let candidate = '__cramall_wrong__';
      while (accepted.has(normalizeText(candidate))) candidate += '_x';
      return [candidate];
    }
    case 'sort':
      return representativeWrongSortAnswers(question.correctOrder);
  }
}

describe('deterministic full-catalog lesson audit', () => {
  const lessons = allLessons();
  const auditSummary = {
    lessons: lessons.length,
    cards: lessons.reduce((count, lesson) => count + lesson.learnCards.length, 0),
    questions: lessons.reduce((count, lesson) => count + lesson.quiz.pool.length, 0),
    widgets: lessons.reduce(
      (count, lesson) => count + lesson.learnCards.filter(({ widget }) => widget !== undefined).length,
      0,
    ),
  };

  test('audits the complete manifest without snapshots', () => {
    expect(lessons.map(({ id }) => id), JSON.stringify(auditSummary)).toEqual(
      PLANNED_LESSONS.map(({ id }) => id),
    );
    expect(auditSummary, JSON.stringify(auditSummary)).toMatchObject({
      lessons: 89,
      cards: 267,
      questions: 1_157,
    });
  });

  test('samples, grades, and resolves review links for every lesson', () => {
    lessons.forEach((lesson, lessonIndex) => {
      expect(validateLesson(lesson), lesson.id).toEqual([]);
      const sampled = sampleQuiz(lesson.quiz.pool, 10, makeLcg(lessonIndex + 1));
      expect(sampled).toHaveLength(10);
      expect(new Set(sampled.map(({ id }) => id)).size).toBe(10);

      const cardIds = new Set(lesson.learnCards.map(({ id }) => id));
      expect(new Set(lesson.quiz.pool.map(({ reviewCardId }) => reviewCardId))).toEqual(cardIds);

      for (const question of lesson.quiz.pool) {
        for (const answer of correctAnswers(question)) {
          expect(gradeAnswer(question, answer), `${question.id} correct`).toBe(true);
        }

        const wrong = incorrectAnswers(question);
        expect(wrong.length, `${question.id} wrong-answer coverage`).toBeGreaterThan(0);
        for (const answer of wrong) {
          expect(gradeAnswer(question, answer), `${question.id} rejects ${JSON.stringify(answer)}`)
            .toBe(false);
        }

        const result = buildResult([question], [wrong[0]!]);
        expect(result).toEqual({
          score: 0,
          total: 1,
          missed: [{
            conceptTag: question.conceptTag,
            reviewCardId: question.reviewCardId,
            count: 1,
          }],
        });
        expect(cardIds.has(result.missed[0]!.reviewCardId)).toBe(true);
        expect(findLesson(lesson.id)?.lesson.learnCards.some(
          ({ id }) => id === result.missed[0]!.reviewCardId,
        )).toBe(true);
      }
    });
  });
});
```

- [ ] **Step 2: Run the new audit directly (2–5 minutes).** Run:

```bash
npm test -- src/content/lesson-quality.test.ts
```

Expected: PASS only if all 89 integrated lessons meet the deterministic grading/review contract. Any failure is routed to its owning subject unit; the audit expectations remain unchanged.

- [ ] **Step 3: Run the focused and adjacent permanent green gate (2–5 minutes).** Run:

```bash
npm test -- src/content/lesson-quality.test.ts src/content/content-validation.test.ts src/content/schema.test.ts src/quiz/engine.test.ts && npx tsc -b --pretty false
```

Expected: PASS with no TypeScript diagnostics.

- [ ] **Step 4: Run the audit twice to prove determinism (2–5 minutes).** Run:

```bash
npm test -- src/content/lesson-quality.test.ts && npm test -- src/content/lesson-quality.test.ts && npx tsc -b --pretty false
```

Expected: both runs pass with the same 89/267/1,157 summary and no randomness-dependent failure.

- [ ] **Step 5: Commit exactly (2–5 minutes).** Run:

```bash
git add src/content/lesson-quality.test.ts
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "test(content): audit full-catalog grading and review links"
```

### Task C8: Document the complete catalog and authoring/release contract

**Files:**

- Modify: `README.md`
- Read: `src/content/curriculum.ts`
- Read: `src/content/content-validation.test.ts`
- Read: `src/content/lesson-quality.test.ts`
- Read: `scripts/check-standards-parity.mjs`
- Read: `package.json`

**Interfaces:**

- Consumes: the completed 89-row catalog, six-code OE policy, three subject registries, `standards:check`, content validation, deterministic lesson audit, and normal/single build commands.
- Produces: README copy that states the exact 33/24/32 and 12/11/8 inventory, describes `curriculum.ts`, preserves the generated-file ownership rule, and gives the exact authoring/release commands.

- [ ] **Step 1: Replace the opening catalog paragraph (2–5 minutes).** Replace the current first paragraph after `# Cram All` with exactly:

```markdown
Cram All is a browser-only, fourth-grade learning app with 89 guided lessons, worked examples, tactile experiments, and 10-question Quick Checks. Its complete South Carolina Grade 4 catalog contains 33 Math lessons in 12 units, 24 Reading lessons in 11 units, and 32 Science lessons in 8 units. There is no account, server, or cloud sync: the app and its data stay in the browser.
```

- [ ] **Step 2: Replace the test/build command block (2–5 minutes).** Under `## Test and build`, use exactly:

````markdown
```sh
npm run standards:check  # verify research/generated standards parity
npm test                 # run all behavior and content-validation tests
npx tsc -b --pretty false
npm run build            # create the normal multi-file build in dist/
npm run build:single     # create one self-contained dist-single/index.html
```
````

- [ ] **Step 3: Replace the Content layout bullets (2–5 minutes).** Use exactly these bullets under `## Content layout`:

```markdown
- `src/content/curriculum.ts` is the authored 89-row identity, title, unit, and indicator-allocation contract; its Reading OE array is derived from validated generated metadata.
- `src/content/schema.ts` defines lesson/question/widget schemas and permanent content validation rules.
- `src/content/subjects.ts` combines generated standards units with the registered lessons for Math, Reading, and Science.
- `src/content/math/u01.ts` through `u12.ts`, `src/content/reading/u01.ts` through `u11.ts`, and `src/content/science/u01.ts` through `u08.ts` contain learner-facing authored lessons.
- Each subject's `index.ts` registers one exported `unitNNLessons` array under its canonical unit ID.
- `src/content/standards/standards.json` is generated only by `node scripts/build-standards.mjs` from `docs/research/sc-grade4-standards.json`; never hand-edit it.
- `src/content/content-validation.test.ts` checks exact catalog identity, standards coverage, OE policy, pass thresholds, and review-card relationships.
- `src/content/lesson-quality.test.ts` deterministically samples, grades, and checks result deep links for every lesson.
```

- [ ] **Step 4: Replace Add and validate a lesson (2–5 minutes).** Use this exact seven-step section:

```markdown
### Add and validate a lesson

1. Find the destination unit in `src/content/standards/standards.json` and its authored row in `src/content/curriculum.ts`. Use the exact canonical ID, title, unit ID, and only the indicator codes allocated there.
2. Add one literal `Lesson` object to the matching `src/content/<subject>/uNN.ts` export. Give the lesson, its 3 learn cards, and its 13 questions unique canonical IDs.
3. Keep `passThreshold: 8`, use at least two natural question types, map each concept tag to one same-lesson review card, and make every card reachable from at least one missed question.
4. For Reading only, spread `READING_OE_CODES` into `crossCuttingExpectationCodes`; never put an OE code in `indicatorCodes`.
5. Use a widget only when its exact `{ type, config }` parses `WidgetRefSchema` and the type exists in `widgetRegistry`. The card prose and quiz must remain understandable without the widget.
6. Run the unit test, `src/content/schema.test.ts`, `src/content/content-validation.test.ts`, `src/content/lesson-quality.test.ts`, and `npx tsc -b --pretty false`. Independently review standards fidelity, every answer, original-text provenance, and child-safe wording.
7. Run `npm run standards:check`, the full test suite, both builds, and the browser/review-link smoke path before release.
```

- [ ] **Step 5: Run the focused documentation-adjacent green gate (2–5 minutes).** Run:

```bash
npm run standards:check && npm test -- src/content/curriculum.test.ts src/content/content-validation.test.ts src/content/lesson-quality.test.ts && npx tsc -b --pretty false
```

Expected: PASS; README commands and stated counts match executable gates.

- [ ] **Step 6: Check and commit exactly (2–5 minutes).** Run:

```bash
git diff --check -- README.md
git add README.md
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "docs: document complete Grade 4 content catalog"
```

### Task C9: Run deterministic release, artifact, browser, and parent-review gates

**Files:**

- Read: `README.md`
- Read: `package.json`
- Read: `scripts/build-standards.mjs`
- Read: `scripts/build-standards.test.mjs`
- Read: `scripts/check-standards-parity.mjs`
- Read: `src/content/curriculum.ts`
- Test: `src/content/curriculum.test.ts`
- Read: `src/content/schema.test.ts`
- Test: `src/content/standards/schema.test.ts`
- Read: `src/content/subjects.test.ts`
- Read: `src/content/content-validation.test.ts`
- Read: `src/content/lesson-quality.test.ts`
- Read: `src/content/math/index.test.ts`
- Read: `src/content/reading/index.test.ts`
- Read: `src/content/science/index.test.ts`
- Test: `src/widgets/WidgetFrame.test.tsx`
- Test: `src/quiz/engine.test.ts`
- Verify generated artifact: `dist/index.html`
- Verify generated artifact: `dist-single/index.html`

**Interfaces:**

- Consumes: all accepted Plan C commits, exact 89-row manifest, parity command, complete tests, normal build, single-file build, HashRouter lesson/quiz routes, review-card query links, read-aloud feature detection, reduced-motion behavior, and Parent Corner local review flags.
- Produces: final release evidence for standards parity, 89/267/1,157 content totals, green focused/full suites and TypeScript, two valid build modes, one browser path per Plan B widget type used by Plan C, first/middle/final subject paths, keyboard/read-aloud/reduced-motion checks, and 89 recorded parent spot-checks. No source changes and no commit.

- [ ] **Step 1: Regenerate standards and prove parity/no drift (2–5 minutes).** Run:

```bash
node scripts/build-standards.mjs && git diff --exit-code -- src/content/standards/standards.json && npm run standards:check && npm test -- scripts/build-standards.test.mjs src/content/standards/schema.test.ts && npx tsc -b --pretty false
```

Expected: PASS, the generated diff is empty, and parity prints Math 33/12, Reading 20+6 OE/11, Science 14/8.

- [ ] **Step 2: Run the complete focused content gate (2–5 minutes).** Run:

```bash
npm test -- src/content/curriculum.test.ts src/content/schema.test.ts src/content/math/index.test.ts src/content/reading/index.test.ts src/content/science/index.test.ts src/content/subjects.test.ts src/content/content-validation.test.ts src/content/lesson-quality.test.ts src/widgets/WidgetFrame.test.tsx src/quiz/engine.test.ts && npx tsc -b --pretty false
```

Expected: PASS with exact 89 lessons, 31 nonempty units, 267 cards, 1,157 questions, and 33/24/32 subject totals.

- [ ] **Step 3: Run the full suite and both builds (2–5 minutes).** Run:

```bash
npm test && npx tsc -b --pretty false && npm run build && npm run build:single
```

Expected: every test passes, TypeScript emits no diagnostics, and both builds succeed.

- [ ] **Step 4: Inspect both build artifacts (2–5 minutes).** Run:

```bash
find dist-single -maxdepth 1 -type f -print
rg -n "fonts\.(googleapis|gstatic)\.com" dist/index.html
! rg -n "<(script|link|img)[^>]+(src|href)=[\"']https?://" dist-single/index.html
```

Expected: `find` prints only `dist-single/index.html`; the normal build retains its optional Google Font link; the single file has no external script, stylesheet, image, or font resource.

- [ ] **Step 5: Run the omission gate and advisory formatting-dependent source counts (2–5 minutes).** Run:

```bash
! rg -n "T[O]DO|T[B]D|implement l[a]ter|fill in d[e]tails|s[i]milar[[:space:]]+to|lorem[[:space:]]+ipsum|=\s*\[\s*\]" src/content/math/u*.ts src/content/reading/u*.ts src/content/science/u*.ts
rg -o "id: '(math|reading|science)-u[0-9]{2}-l[0-9]{2}'," src/content/math/u*.ts src/content/reading/u*.ts src/content/science/u*.ts | wc -l | tr -d ' '
rg -o "id: '(math|reading|science)-u[0-9]{2}-l[0-9]{2}-c[1-3]'," src/content/math/u*.ts src/content/reading/u*.ts src/content/science/u*.ts | wc -l | tr -d ' '
rg -o "id: '(math|reading|science)-u[0-9]{2}-l[0-9]{2}-q(0[1-9]|1[0-3])'," src/content/math/u*.ts src/content/reading/u*.ts src/content/science/u*.ts | wc -l | tr -d ' '
rg -o 'crossCuttingExpectationCodes:' src/content/reading/u*.ts | wc -l | tr -d ' '
! rg -n 'crossCuttingExpectationCodes:' src/content/math/u*.ts src/content/science/u*.ts
```

Expected: the blocking omission and non-Reading-OE scans print nothing. With the prescribed literal formatting, the four advisory counts print 89, 267, 1157, and 24; because these `rg` counts depend on source layout, investigate a discrepancy but do not treat it as authoritative. The schema, exact-manifest, catalog, and lesson-quality tests from Steps 2–3 are the release authority for identities, totals, and OE policy.

- [ ] **Step 6: Serve the normal build and smoke first/middle/final routes (2–5 minutes).** Run `npx vite preview --host 127.0.0.1`, open its printed URL, and complete these hash routes:

```text
#/lesson/math-u01-l01
#/lesson/math-u07-l02
#/lesson/math-u12-l03
#/lesson/reading-u01-l01
#/lesson/reading-u07-l02
#/lesson/reading-u11-l05
#/lesson/science-u01-l01
#/lesson/science-u04-l04
#/lesson/science-u08-l04
```

Expected at each route: intro → 3 cards → worked example → 10 unique sampled questions → results. Intentionally miss one question linked to each card; all three `Review this` links return to the exact `?card=<reviewCardId>` stage, and a retake contains at least one replacement question.

- [ ] **Step 7: Smoke Math widget types, batch 1 (2–5 minutes).** Complete the widget card and then finish the lesson for the accepted pilot routes `math-u01-l01` (`place-value-builder`) and `math-u01-l02` (`number-line-compare`), then `math-u03-l01` (`array-builder`) and `math-u04-l02` (`area-model-multiplier`). Expected: config renders, change feedback works, completion latches, and quiz answers do not depend on widget state.

- [ ] **Step 8: Smoke Math widget types, batch 2 (2–5 minutes).** Repeat for `math-u06-l01` (`fraction-models`), `math-u09-l01` (`money-counter`), `math-u09-l02` (`clock-elapsed-time`), and `math-u09-l03` (`quarter-inch-ruler`). Expected: the same render/change/latched-completion/content-independence contract.

- [ ] **Step 9: Smoke Math widget types, batch 3 (2–5 minutes).** Repeat for `math-u09-l05` (`balance-scale`), `math-u11-l02` (`shape-classifier`), `math-u12-l01` (`data-plot-builder`), and `math-u12-l03` (`probability-spinner`). Expected: the same contract.

- [ ] **Step 10: Smoke Reading widget types, batch 1 (2–5 minutes).** Repeat for `reading-u02-l01` (`word-root-builder`), `reading-u02-l02` (`context-clue-detective`), `reading-u03-l01` (`story-elements-mapper`), `reading-u04-l01` (`theme-evidence-collector`), and `reading-u05-l01` (`central-idea-organizer`). Expected: the same contract and all evidence remains available in card/prompt text.

- [ ] **Step 11: Smoke Reading widget types, batch 2 (2–5 minutes).** Repeat for `reading-u06-l01` (`summary-builder`), `reading-u07-l01` (`text-structure-sorter`), `reading-u09-l01` (`pov-switcher`), `reading-u10-l02` (`figurative-language-matcher`), and `reading-u11-l02` (`source-credibility-checker`). Expected: the same contract and no live-collaboration or automated-fluency claim.

- [ ] **Step 12: Smoke Science widget types, batch 1 (2–5 minutes).** Repeat for `science-u01-l04` (`collision-ramp`), `science-u02-l01` (`energy-transfer-builder`), `science-u03-l01` (`wave-maker`), `science-u03-l04` (`light-reflection-eye`), `science-u04-l01` (`message-sender`), and `science-u05-l01` (`energy-conversion-designer`). Expected: each is labeled as a model, not physical evidence.

- [ ] **Step 13: Smoke Science widget types, batch 2 (2–5 minutes).** Repeat for `science-u06-l02` (`animal-structure-matcher`), `science-u07-l01` (`topographic-map-explorer`), `science-u07-l03` (`erosion-simulator`), `science-u07-l04` (`rock-layer-explorer`), `science-u08-l01` (`resource-sorter`), and `science-u08-l03` (`hazard-solution-designer`). Expected: the same model/evidence boundary and no out-of-scope content.

- [ ] **Step 14: Verify keyboard, read-aloud, and reduced-motion behavior (2–5 minutes).** With keyboard only and reduced motion enabled, complete one MC/TF path at `#/lesson/reading-u04-l01`, one fill path at `#/lesson/reading-u10-l02`, and one sort path at `#/lesson/science-u04-l01`. Expected: visible focus, locked answers, announced feedback, functional Next controls, equivalent content with motion reduced, and graceful read-aloud feature detection.

- [ ] **Step 15: Verify the direct `file://` release artifact (2–5 minutes).** Open the absolute `file://` URL for `dist-single/index.html` manually and complete `#/lesson/math-u12-l03`, then reload. Expected: HashRouter navigation, widget/quiz/result/review paths, and local progress all work without an HTTP server; no browser-policy workaround is used.

- [ ] **Step 16: Verify human review records and protected staging (2–5 minutes).** Require the subject-wave records to show all 89 lesson/card/question accuracy reviews and the Parent Corner to show 89 local spot-check flags. Run:

```bash
git diff --cached --name-only -- src/characters
git status --short -- src/characters
```

Expected: the staged-path command has no output. Record the current status beside Task C0's baseline; external-owner differences are preserved and reported, not attributed to Plan C. This verification task makes no commit.

## Controller Self-Review Before Promotion

- [ ] **Step 1: Exact manifest structure (2–5 minutes).** Extract the `PLANNED_LESSONS` code block and parse it as TypeScript. Require 89 rows, 89 unique IDs, 31 unique unit IDs, 33/24/32 subject counts, and no missing `id`, `unitId`, `title`, or `indicatorCodes` property.

- [ ] **Step 2: Mechanical title/allocation parity (2–5 minutes).** Compare every manifest ID, unit ID, and title mechanically against `src/content/math/u01.ts`, `src/content/reading/u01.ts`, `src/content/science/u01.ts`, and the three tracked curriculum blueprints; compare every indicator allocation against `docs/research/sc-grade4-standards.json` and the same blueprints. Resolve the authoritative Math U02-L02 wording as `Estimate and Judge Reasonableness`; require zero remaining ID/unit/title/code mismatches.

- [ ] **Step 3: Mechanical widget-route parity (2–5 minutes).** Extract the 34 exact lesson/type pairs named in Task C9 Steps 7–13. Compare the two pilot pairs against `src/content/math/u01.ts` and every other pair against its tracked Math, Reading, or Science curriculum blueprint; require 34 matches and zero missing or conflicting pairs. Explicitly require `math-u01-l01` / `place-value-builder`, `math-u01-l02` / `number-line-compare`, `math-u09-l05` / `balance-scale`, and `math-u11-l02` / `shape-classifier`.

- [ ] **Step 4: Type/interface consistency (2–5 minutes).** Trace `READING_OE_CODES`, `PlannedLesson`, `PlannedUnitLesson`, `Lesson.crossCuttingExpectationCodes`, every `unitNNLessons` export, `lessonsByUnit`, `allLessons`, `findLesson`, `Question`, `Answer`, and `representativeWrongSortAnswers` through all code blocks. Require exact spelling and compatible readonly/mutable boundaries.

- [ ] **Step 5: No-omission scan (2–5 minutes).** Run:

```bash
! rg -n -e "T[O]DO" -e "T[B]D" -e "implement l[a]ter" -e "fill in d[e]tails" -e "s[i]milar[[:space:]]+to" -e "generate c[o]ntent" -e "/\*" -e "one l[i]teral lesson" -e "remaining q[u]estions" docs/superpowers/plans/2026-08-29-plan-c-full-year-content.md
```

Expected: no output.

- [ ] **Step 6: Files/commands/protected-path scan (2–5 minutes).** Require every task to contain explicit repo-relative `Files` and `Interfaces` (`Consumes`/`Produces`), every source-changing task to include an exact focused green command with `npx tsc -b --pretty false`, and every commit to use exact `git add` paths plus an exact message. Require no Create/Modify/Stage entry under `src/characters/`.

- [ ] **Step 7: Honest promotion ruling (2–5 minutes).** Promote this master only to `docs/superpowers/plans/2026-08-29-plan-c-full-year-content.md`, and only after Steps 1–6 pass and the three tracked non-executable blueprints are promoted beside it. Full Plan C source execution remains blocked until all 13 literal **Required Subject-Wave Artifacts** exist, contain complete learner-facing production/test literals, and have accepted writing-plans reviews.

## Execution Handoff

After the controller review and all external gates are satisfied, execute this master with `superpowers:subagent-driven-development` so C1, C2, each subject integration, catalog tests, deterministic audit, documentation, and release each receive a fresh implementer/reviewer boundary. Run only one registry owner at a time in Math → Reading → Science order. Do not declare the 89-lesson catalog complete until all literal subject-wave plans have executed and Task C9 has recorded clean machine, browser, artifact, and parent-review evidence.

## Current implementation handoff

Commit `d91a1b3`: Reading Unit 1 (2 lessons) and Science Unit 1 (3 lessons) are registered/visible from `05b46b9` and now contain the accepted deepening baseline. It includes persistent Reading passage references, 15 inline checks with source-before-question and solo framing, three replayable Science animations with truthful running/complete states (including reduced-motion preference changes), and stable dialogue/one-Next/360px/no-clipping plus kid/card-race regressions. Verification is 357 passing tests, clean TypeScript, passing normal and self-contained single-file builds (446 modules; standard Vite chunk warning only), and approved browser/review evidence. Plan A's three residual remediations remain authorization-only; Plan B is planned/not implemented; all 13 literal Plan C wave plans remain unwritten. Preserve these registered baselines and have later Plan C tasks extend their registries.
