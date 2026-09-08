# Complete Guided Activities Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development for scoped implementation and review, and superpowers:dispatching-parallel-agents for the three disjoint subject domains. Parent integrates shared boundaries. Execute all tasks without further user approval; prototypes were accepted.

**Goal:** Implement the remaining29 approved activities so every registered lesson has at least one useful guided activity, preserving the three reviewed prototypes and all existing lessons.

**Architecture:** Three lazy subject entry points select concrete, separately implemented experiences through strict activity-slug schemas. Source/model data and interaction components remain subject-owned. This is shared delivery infrastructure, not a generic sorter. Parent owns all central integration and content registration.

**Tech Stack:** Existing React, TypeScript, Zod, Vitest, CSS, ActivityWorkbench and WidgetCoachFrame; no new dependencies.

**Spec:** docs/superpowers/specs/2026-09-07-missing-guided-activities-design.md and its complete Math, Reading and Science documents.

## Global Constraints

User approval: “looks good” on the actualM7/R1/S6 prototype checkpoint. Preserve existing user-owned changes, separate Social Studies work, protected characters, generated standards, original lesson and quiz identities, HashRouter, passThreshold8, storage keycramall.v1 and normal/single font behavior. New activities are unscored local state and do not write progress. Complete source text precedes questions. No live partner/voice assessment. Science models are not observations and energy is inferred from effects. Stable700px/860px geometry, keyboard44px targets, accessible scrolling sources and reduced-motion parity. No staging/commits from this plan.

The implementation-only staging restriction above was superseded by the user's September 8 instruction: “commit & merge when you're done. don't forget to run `git push`.” Release integration uses an isolated checkout based on local `main`, preserving concurrent work in the original checkout. See [release verification](../../reviews/2026-09-08-guided-activities-release.md).

## Task 1 — Shared contracts and a failing full-coverage gate (parent)

- [x] Inspect status/history/both foundation ledgers and preserve current checkout. Re-run baseline tests/types/build.
- [x] Replace the29-gap expectation in src/content/guided-activity-coverage.test.ts with `expect(uncovered).toEqual([])` for every registered lesson; observe exact29 current failures. Preserve original89 count and add explicit29 placements once wired.
- [x] Add strict subject activity selectors and widget refs in src/content/{math,reading,science}/workshop-schema.ts. Observe selector tests fail before schemas, then reject unknown/prototype IDs and extra fields.
- [x] Add src/widgets/workshop-events.ts and then integrate three new types in schema.ts, registry.ts, WidgetFrame.tsx, widgetSpeechText.ts and test fixtures when subject modules exist. Use native WidgetProps types; no fallback/placeholder renderer counts toward coverage.

```ts
expect(WorkshopConfigSchema.safeParse({activity:'not-an-authored-activity'}).success).toBe(false);
expect(allLessons().filter(lesson=>!lesson.learnCards.some(card=>(card.widget&&card.widgetCoach)||card.demo)).map(lesson=>lesson.id)).toEqual([]);
```

## Task 2 — Complete 9 Math activities

Ownership: create src/widgets/math/MathWorkshop.tsx and src/widgets/math/workshop/** (concrete components, model/data utilities, scopedCSS and tests); create src/content/math/workshopActivities.ts. Do not edit other paths. Parent owns unit files and schema selectors.

- [x] Read task brief, target cards and exact designs.
- [x] Observe failing interaction tests, implement all listed concrete experiences, and run focused plus adjacent tests.
- [x] Supply source-only read-aloud text, authored coaching/config placement manifest and complete browser walkthroughs.
- [x] Independent subject review approved after findings resolved.

| Design | Activity selector | Exact card |
|---|---|---|
| M1 | `estimate-checkpoint` | `math-u02-l02-c3` |
| M2 | `acorn-rule-machine` | `math-u03-l02-c2` |
| M3 | `pack-use-rebuild` | `math-u05-l02-c2` |
| M4 | `fraction-picnic` | `math-u06-l02-c3` |
| M5 | `bundle-the-fourths` | `math-u06-l03-c2` |
| M6 | `decimal-exchange-mat` | `math-u08-l03-c3` |
| M8 | `fence-the-garden` | `math-u10-l01-c2` |
| M9 | `triangle-inspection-desk` | `math-u11-l01-c3` |
| M10 | `graph-detective` | `math-u12-l02-c3` |

## Task 3 — Complete 12 Reading activities

Ownership: create src/widgets/reading/ReadingWorkshop.tsx and src/widgets/reading/workshop/** (concrete components, model/data utilities, scopedCSS and tests); create src/content/reading/workshopActivities.ts. Do not edit other paths. Parent owns unit files and schema selectors.

- [x] Read task brief, target cards and exact designs.
- [x] Observe failing interaction tests, implement all listed concrete experiences, and run focused plus adjacent tests.
- [x] Supply source-only read-aloud text, authored coaching/config placement manifest and complete browser walkthroughs.
- [x] Independent subject review approved after findings resolved.

| Design | Activity selector | Exact card |
|---|---|---|
| R2 | `direct-the-reading` | `reading-u01-l02-c2` |
| R3 | `word-desk` | `reading-u02-l03-c3` |
| R4 | `connect-weather-report` | `reading-u07-l02-c3` |
| R5 | `authors-lens` | `reading-u08-l01-c3` |
| R6 | `support-chain` | `reading-u08-l02-c3` |
| R7 | `two-views-one-event` | `reading-u09-l02-c3` |
| R8 | `one-moment-three-forms` | `reading-u10-l01-c3` |
| R9 | `literal-and-vivid` | `reading-u10-l03-c3` |
| R10 | `question-compass` | `reading-u11-l01-c3` |
| R11 | `research-folder` | `reading-u11-l03-c3` |
| R12 | `research-clusters` | `reading-u11-l04-c3` |
| R13 | `source-credit` | `reading-u11-l05-c3` |

## Task 4 — Complete 8 Science activities

Ownership: create src/widgets/science/ScienceWorkshop.tsx and src/widgets/science/workshop/** (concrete components, model/data utilities, scopedCSS and tests); create src/content/science/workshopActivities.ts. Do not edit other paths. Parent owns unit files and schema selectors.

- [x] Read task brief, target cards and exact designs.
- [x] Observe failing interaction tests, implement all listed concrete experiences, and run focused plus adjacent tests.
- [x] Supply source-only read-aloud text, authored coaching/config placement manifest and complete browser walkthroughs.
- [x] Independent subject review approved after findings resolved.

| Design | Activity selector | Exact card |
|---|---|---|
| S1 | `receiver-changes` | `science-u02-l04-c3` |
| S2 | `crest-to-crest` | `science-u03-l02-c2` |
| S3 | `pixel-post` | `science-u04-l03-c3` |
| S4 | `message-design-trials` | `science-u04-l04-c3` |
| S5 | `lamp-test-notebook` | `science-u05-l03-c1` |
| S7 | `plant-system` | `science-u06-l01-c3` |
| S8 | `survival-evidence` | `science-u06-l03-c3` |
| S9 | `sense-response` | `science-u06-l04-c3` |

## Task 5 — Register every designed placement and close coverage (parent)

Additional parent-owned files: src/content/{math,reading,science}/workshop-registration.ts and src/content/workshop-placements.test.ts; src/lesson/WorkshopActivities.test.tsx.

- [x] Import subject manifests, add widget+coach only to the29 exact card IDs in corresponding unit files. Preserve all surrounding content and sources.
- [x] Update exact-widget unit assertions for only the new placements and add all-mode real LessonPlayer tests for unmounted dialogue, oneNext, authored start focus, and unchanged storage.
- [x] Extend generic subject GuideLed component maps where they enumerate all authored widgets; preserve their neutral-start and source-feedback assertions.
- [x] Full catalog coverage reaches89/89 original lessons and includes separate30/30 Social Studies:119/119 if that concurrent catalog remains unchanged. Verify lesson IDs at runtime; never rely on planned counts alone.

## Task 6 — Browser acceptance, full gates and independent final review (parent)

- [x] Browser-test every new concrete mode through its actual lesson and final reasoning, using subject walkthroughs. Exercise wrong/revised paths, sources/records, keyboard controls, reset, and unchanged progress. Run desktop1440x900, short1280x600, mobile390x844/320px and2xzoom inspections; reduced-motion parity for animated modes.
- [x] Run focused+adjacent tests, npmtest, npx tsc -b --pretty false, npmrunbuild and npmrunbuild:single. Inspect normal font links and single artifact external resources. Use Vite preview over localhost.
- [x] Independent whole-rollout code/spec review, resolve findings, rerun affected gates and browse changed flows.
- [x] Update design/prototype status, ledger and final coverage review with actual verified results. Present completed scope and any material limitations. Do not request another prototype approval.
