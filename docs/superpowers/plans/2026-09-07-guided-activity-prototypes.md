# Guided Activity Prototypes Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development for the three independent widget tasks, with parent-owned integration and independent scoped review. Checkboxes record execution, not authorization for the later 29 activities.

**Goal:** Implement and verify M7, R1, and S6 in their actual lessons for the design's rendered-prototype review checkpoint.

**Architecture:** Three typed lazy widgets use the existing WidgetCoachFrame and ActivityWorkbench. Authored configurations/coaching live beside subject content. New configuration schemas are isolated in `activity-prototype-schema.ts` and incorporated into the existing widget union. Activity state remains local.

**Tech Stack:** Existing React/TypeScript/Zod/Vitest/Vite and CSS; no new dependencies.

**Spec:** `docs/superpowers/specs/2026-09-07-missing-guided-activities-design.md` and its Math M7, Reading R1, Science S6 entries.

## Global constraints

- Scope is three working prototypes, followed by rendered user review. Remaining designs retain their review/rollout status.
- Preserve untracked design documents, social-studies work, character assets, standards, quiz data, lesson IDs, HashRouter, and progress behavior.
- No activity writes storage, scoring, analytics, stars, or lesson progress. No voice recording/scoring. Supplied Science records are not app experiments.
- Stable 700px/860px workbench; sources and feedback retained; keyboard controls and 44px targets; reduced-motion semantic parity.
- Parent owns shared schema/registry/fixtures/lesson registration, browser testing and full gates. Implementers own only their component, local stylesheet, and focused tests. No agent commits or stages files.

## Task 1 — Baseline and shared contracts (parent)

Files: `src/content/activity-prototype-schema.ts`, `src/content/activity-prototype-schema.test.ts`, `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/widgets/widgetSpeechText.ts`, `src/test/widgetFixtures.ts`.

- [x] Inspect status/diff/history/ledgers, preserve existing files, create `codex/guided-activity-prototypes` branch in the established checkout.
- [x] Run focused wrapper/content tests, then baseline `npm test` (1,743 tests including existing nested review-worktree discovery).
- [x] Finish baseline TypeScript and normal build before integration.
- [x] Write schema tests before implementation. Verify missing-module failure, then implement reachable scale ranges, unique source target/valid evidence, and equal-length bounded trial records.

```ts
expect(ScaleReadingConfigSchema.safeParse({...scaleConfig, items: [{...scaleConfig.items[0], valueTenths: 999}]}).success).toBe(false);
expect(PhrasePathfinderConfigSchema.safeParse({...phraseConfig, meaningEvidence: 'Absent quote'}).success).toBe(false);
expect(DeviceRetestConfigSchema.safeParse({...retestConfig, after: [11, 10, 10]}).success).toBe(false);
```

Public widget types: `scale-reading`, `phrase-pathfinder`, `device-retest`.
Exact config shapes are implemented in the isolated schema before subject dispatch; implementers consume `WidgetProps<'their-type'>` and parent-authored subject configurations.

- [x] Add lazy registrations, exhaustive WidgetFrame branches, fixture entries, and read-aloud source text without keyed answers.
- [x] Add optional `WidgetCoach.startLabel` (1–60 characters) preserving `Try it` and tuning-fork defaults. Test authored label and final-action focus.

## Task 2 — M7 Weigh the Field Kit (Math implementer)

Files: create `src/widgets/math/ScaleReading.tsx`, `scale-reading.css`, `ScaleReading.test.tsx`. Read `src/content/math/activityPrototypes.ts`, do not edit it.

- [x] Write failing interaction tests for a wrong marker/rounding choice, recovery, four units including 3.5→4, retained notebook, explicit explanation, and reset/recompletion.
- [x] Run `npm test -- src/widgets/math/ScaleReading.test.tsx` and record the observed failure.
- [x] Implement select object → neutral unit prediction → place → read/align marker → record nearest whole with unit → explain. Use exact integer tenths and proportional SVG scale geometry. Draw recognizable objects. Keep earlier records visible.
- [x] Run focused tests plus adjacent Math workbench tests. Self-review no early rounded-answer leak, nonvisual reading, local state, and four useful rounds.

```ts
expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
expect(screen.getByRole('table', {name: 'Field notebook'})).toHaveTextContent('4 kilograms');
```

## Task 3 — R1 Phrase Pathfinder (Reading implementer)

Files: create `src/widgets/reading/PhrasePathfinder.tsx`, `phrase-pathfinder.css`, `PhrasePathfinder.test.tsx`. Read `src/content/reading/activityPrototypes.ts`, do not edit it.

- [x] Write failing tests for source-before-practice, wrong word repair/recovery, editable pause placement/manual preview, evidence-linked meaning, three self-reflections, reset and honest completion.
- [x] Run `npm test -- src/widgets/reading/PhrasePathfinder.test.tsx` and record observed failure.
- [x] Implement immutable source + changed practice copy, explicit repair check, keyboard phrase boundaries, manually stepped highlighting, supported meaning/evidence check, and unscored Accuracy/Pace/Meaning reflection. Do not grade phrase segmentation or speech.
- [x] Run focused tests and adjacent Reading workbench tests. Verify annotation never changes original text, sources stay available, and no mandatory audio.

```ts
expect(screen.getByRole('region', {name: 'Original passage'})).toHaveTextContent('winding path');
expect(screen.getByText('Practice and reflection complete.')).toBeVisible();
```

## Task 4 — S6 One-Change Retest (Science implementer)

Files: create `src/widgets/science/DeviceRetest.tsx`, `device-retest.css`, `DeviceRetest.test.tsx`. Read `src/content/science/activityPrototypes.ts`, do not edit it.

- [x] Write failing tests for original-gap reasoning, multiple-change retry, other single-change outcome unavailable, supplied one-clip records, bounded claim/limit, reset/recompletion, and retained initial feedback.
- [x] Run `npm test -- src/widgets/science/DeviceRetest.test.tsx` and record observed failure.
- [x] Implement a visible circuit/setup comparison, selectable changes, before/after trial bars with fixed goal line, and a retained reasoning notebook. Reveal supplied retest only through the recorded one-clip comparison. Do not fabricate outcomes for alternative changes.
- [x] Run focused tests and adjacent Science workbench tests. Verify all records/labels agree and future reliability is never promised.

```ts
expect(screen.getByText(/Needs a new test/)).toBeVisible();
expect(screen.queryByRole('table', {name: 'Supplied retest records'})).not.toBeInTheDocument();
```

## Task 5 — Real-lesson integration and review (parent)

Files: `src/content/{math,reading,science}/activityPrototypes.ts`, exact three unit files `math/u09.ts`, `reading/u01.ts`, `science/u05.ts` and their exact-placement tests; `src/widgets/reading/GuideLedReading.test.tsx`; `src/content/guided-activity-coverage.test.ts`; `src/lesson/ActivityPrototypes.test.tsx`; documentation/evidence for this plan.

- [x] Write a failing coverage assertion for the three exact placements and remaining 29 known gaps. Add no skipped full-coverage test; the current gate names its deliberate rollout scope.
- [x] Register configurations with authored two-turn coaching and activity-specific start labels at `math-u09-l04-c3`, `reading-u01-l01-c2`, `science-u05-l04-c3`.
- [x] Test actual lessons for unmounted intro, actual guide, one Next, start focus, content order, and no new progress on activity completion.
- [x] Run focused and adjacent tests, full `npm test`, `npx tsc -b --pretty false`, normal and single builds, artifact inspection, `git diff --check`.
- [x] Serve real normal build with `npx vite preview --host 127.0.0.1`; browser-test desktop, short wide, mobile, keyboard and reduced motion. Check exact single artifact separately through localhost.
- [x] Request independent scoped code/spec review; address findings and rerun affected gates.
- [x] Record verified coverage as 60/89, remaining 29, and present direct prototype links.
- [x] Obtain the approved design's concrete rendered user review before expanding families. User approved with “looks good”; remaining29 implementation proceeds under the complete-guided-activities plan.

Verification and direct review links: [prototype review record](../../reviews/2026-09-07-guided-activity-prototypes.md).
