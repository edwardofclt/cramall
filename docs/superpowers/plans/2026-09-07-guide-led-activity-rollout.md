# Guide-led Activity Rollout Implementation Plan

> Execute with parallel subject agents and parent-owned integration. This plan applies the user-approved tuning fork prototype and subsequent explicit authorization to update all three subjects. Earlier September 5 plans are historical context, not this wave's execution instructions.

**Goal:** Review and update all 54 existing lesson widget placements (34 used families), plus review the four existing Science lesson demos, to the approved guide-led experience contract.

**Architecture:** Keep the typed lazy widget boundary and authored subject coaching. Replace the shared inert intro with an unmounted activity, deliberate first-control focus, and stable guide footprint. Each subject owns its actual visual/action loop; a common ActivityWorkbench owns fixed visual/task panes and local coaching placement. Preserve the already approved tuning fork.

**Tech Stack:** Existing React, TypeScript, CSS, Vitest, Vite; no new dependencies.

**Spec:** `/Users/eherbert/.codex/skills/designing-guide-led-manipulatives/references/experience-contract.md`, approved tuning fork implementation and current user authorization.

## Constraints

- Preserve uncommitted tuning-fork work, all character assets, generated standards, canonical IDs, curriculum/quiz coverage, passThreshold 8, HashRouter and local-only progress.
- No widget or coaching writes scoring, analytics or persistence. No Plan-A residual remediations.
- Science is a model, never physical evidence; energy is inferred. Reading sources stay available before and during their questions. Math visuals encode quantities/relationships.
- Prediction/selection is neutral; incorrect answers explicitly invite retry; only checked correct answers use success cues. Do not reveal keyed answers before commitment.
- Start tests with observed failures; preserve focused regression coverage. Parent alone runs shared browser, full gates and builds.
- No broad staging or commits during concurrent work. Subject agents do not edit shared schema, registry, lesson framework, global theme or other subjects.

## Shared interface and ownership

Parent creates `src/widgets/ActivityWorkbench.tsx`, `src/widgets/ActivityCoach.tsx`, and `src/widgets/activity-workbench.css`.

```tsx
<ActivityWorkbench label="Descriptive activity name" visual={<>{/* header and meaningful scene/source */}</>} revealKey={phase} visualScrollable={false}>
  {/* prediction/setup controls, actions, observation, explanation and reset; phase feedback owns separate regions */}
</ActivityWorkbench>
```

Props: `label: string`, `visual: ReactNode`, `children: ReactNode`, optional `revealKey: string | number`, `visualScrollable: boolean`, `className: string`. Add `activity-shell` to each existing widget root, preserving test IDs and event contracts. The workbench is the root's only layout child. It contains the local coach slot automatically. Reading may enable visual scrolling for full source passages. New phase content scrolls only the task pane. Parent owns provider/focus integration.

## Task 1: Parent — shared dialogue and workbench

Files: `src/lesson/WidgetCoachFrame.tsx`, its tests, `src/lesson/LessonPlayer.test.tsx`, `src/widgets/ActivityWorkbench.tsx`, `src/widgets/ActivityCoach.tsx`, `src/widgets/activity-workbench.css`, shared integration tests.

- [x] Replace legacy inert assertions with failing absence/focus/revisit and lazy-ready focus tests.
- [x] Implement unmounted dialogue replacement, a 360px capped guide, one forward action, fixed bubble space, and focus after lazy widget mount.
- [x] Implement fixed visual/task panes and guide context with a local coach slot; tuning fork retains its approved behavior.
- [x] Run focused shared tests before integrating subjects.

## Task 2: Math — 23 placements, 12 used families

Files: lesson-used components/tests in `src/widgets/math/` (exclude unused `BaseTenBlocks`), authored coaching and applicable tests in `src/content/math/`, new `src/widgets/math/guide-led-math.css` if needed. Parent handles shared changes requested by agent.

- [x] Record concept → meaningful action → visible result → reasoning for each used family.
- [x] Write failing tests for diagnosed leaks, premature grading, interaction and feedback ownership.
- [x] Adapt each family to ActivityWorkbench; preserve quantity/geometry controls and correct mathematics. Repair area/fraction answer leaks, division interaction, and classification label leaks.
- [x] Update each placed activity's two-turn preparation and action-based coaching without revealing answers.
- [x] Run all Math-focused tests and report files, red/green evidence and remaining browser checks.

## Task 3: Reading — 11 placements, 10 families

Files: `src/widgets/reading/` and corresponding tests, authored coaching/tests in `src/content/reading/`, new `src/widgets/reading/guide-led-reading.css` if needed.

- [x] Record each source/action/evidence/reasoning loop.
- [x] Write failing tests for early answer cues, premature grading, phase feedback, source visibility and reset submission state.
- [x] Adapt all families to ActivityWorkbench with full source in the visual pane; preserve meaningful text manipulation and evidence selection. Grade only committed work; keep automated writing checks honest.
- [x] Update actual Winnie dialogue/reactions to prepare without answering.
- [x] Run Reading-focused tests and report evidence and browser cases.

## Task 4: Science — 19 remaining placements, 12 families including transfer mode

Files: `src/widgets/science/` excluding approved tuning fork files, applicable tests, authored Science coaching/tests in `src/content/science/`. Preserve science-u02-l02-c1 changes. Parent owns `src/lesson/*` demos.

- [x] Record each phenomenon/action/observation/inference loop.
- [x] Write failing tests for pre-commit answer cues, prediction retention, semantic completion and reset.
- [x] Adapt families to ActivityWorkbench; keep physical arrangements recognizable and animations learner-controlled. Repair energy transfer/conversion label-only tasks with visible models and eliminate forced prediction rewriting in erosion.
- [x] Update each placed Sandy conversation and reaction while preserving model/physical-evidence distinction.
- [x] Run Science-focused tests and report browser cases. Report any necessary lesson-demo repairs to parent.

## Task 5: Integration and review

- [x] Review all 54 placements for framework coverage and protect tuning fork state/colors.
- [x] Address scoped independent subject reviews (rotate agents after implementation).
- [x] Run `npm test`, `npx tsc -b --pretty false`, `npm run build`, `npm run build:single`, `git diff --check`. Full tests also discover the existing nested review worktree; use limited workers if concurrent load requires it.
- [x] Browser-test every used family at its real lesson route, including wrong/recovery/reset and keyboard. Audit desktop, short-wide, 390px/320px, reduced motion and retained Reading sources; inspect both build artifacts.
- [x] Hand off only after findings are resolved, with explicit evidence and any remaining limits.


## Completed verification — September 7, 2026

All 54 existing widget placements (23 Math, 11 Reading, 20 Science including the approved tuning fork) and all four Science coaster demos now use the approved guide-led pattern. No new curriculum units, progress behavior, scoring, storage, generated standards, or character assets were introduced. Changes remain uncommitted in the existing checkout.

Subject agents reviewed each other’s work. Findings were reproduced with focused regressions and fixed: answer leaks, stale completion after revision, replay feedback loss, reduced-motion collision recovery, source-text readiness on revisits, CSS scope, and hidden guide feedback. Final independent shared/Science review is **APPROVED**. Math’s reviewed numeric, geometry, reset and disclosure findings are resolved; parent verified the final graph geometry and narrow layout.

Final gates:

- `npm test -- --maxWorkers=4 --minWorkers=1`: **1,728 tests passed in 210 files**. This includes the existing nested review checkout; see counts below.
- `npx tsc -b --pretty false`: passed.
- `npm run build` and `npm run build:single`: passed. Normal build retains its Google Font links; the single HTML has no external scripts or font requests. The existing bundle-size advisory remains informational.
- `git diff --check`: clean.
- Real browser: every one of the 58 placements opened through its actual lesson route at 1280×900, 1280×560, 390×844, and 320×700. Final initial-state panes have no document or task horizontal overflow; full Reading sources scroll within their pane.
- Stateful browser checks covered neutral prediction, wrong/correct recovery, numeric-answer revision, retained Reading sources, unchanged replay, system revision, reduced-motion collision recovery, guide visibility and dismissal, keyboard movement, reset focus and pane scroll. Completed graph and erosion states were rechecked after final layout repairs; all three graph bars fit and tick coordinates align with bar endpoints.
- Single-file browser: Math, Reading and Science activation/focus/layout passed. A complete Science interaction left `cramall.v1` unchanged; refresh restored the intro with the activity unmounted.

Browser-generated screenshots and transient logs were kept outside repository source. No deployment or commit was performed.

Test discovery detail: 1007 tests in 109 workspace files; 721 tests in 101 unchanged nested review files.

## Missing lesson repair — math-u02-l01

The user correctly identified that the existing-placement rollout did not add activities to lessons that previously had none. Their reported lesson, **Add and Subtract to 100,000**, now has a `regrouping-lab` activity on each of its three existing cards. This repair applies the approved guide-led framework to new arithmetic content; it does not claim that all other activity-free lessons are covered.

- Strategy: combine23,468and17,857 by exchanging equal-value place counters.
- Regrouping: subtract26,718from50,003, including exchanges across empty trays. Exchanges remain reversible after removal, so an extra borrow does not strand the learner.
- Inverse check: rebuild67,421 from38,465and28,956 and explain why this checks the subtraction.

The typed widget boundary, schema fixture and read-aloud entry include the new family. Every column requires learner manipulation and a committed digit; completion also requires an explanation. Three Nutty mini-conversations prepare the activities. Wrong feedback remains retryable; reset restores focus and the task pane’s starting position. Widget state does not write progress.

Evidence: coverage test failed before placements; arithmetic tests failed before implementation; an independent reviewer found an unnecessary-borrow dead end, reproduced in the durable subtraction test and fixed with upward exchanges after removal. Independent scoped review is APPROVED. Focused schema/content/widget gates passed269tests; final full gate passed **1,737tests in211files** (includes unchanged nested review checkout). TypeScript, normal build, single-file build and diff check passed.

Browser verification used the exact localhost:5173 lesson from intro through its first activity, then all three cards at1280×900,1280×560,390×844and320×700. All three complete wrong/recovery/reset paths produced correct totals with no clipping or progress writes. Normal and single-file build previews also passed keyboard activation and exchange checks. New coverage is57widget placements plus4coaster demos; other lessons without activities remain outside this specific repair.

## Activity quality consistency pass — September 7, 2026

The user approved automatic operation checking in the regrouping activity and asked that the rest of the activities meet the same standard. This pass reviewed all **61 existing activity placements**: 26 Math, 11 Reading, and 24 Science (including four coaster demos). It does not add activities to other lessons that currently lack them.

- Math: graph display and scale choices now check immediately; area diagrams preserve actual side proportions with readable partition controls; shape class labels, number-line landmarks, place-value and money controls fit comfortably. The approved regrouping flow remains the benchmark.
- Reading: a word-meaning choice checks immediately after word construction. Selection markers remain neutral until graded. Source quotes, pronouns, summary choices, word-part tiles and story-map controls have clearer spacing and readable phone layouts. Complete source text stays available in its own pane.
- Science: rock-layer selections, collision comparisons and erosion conclusions check on selection. Source/route/receiver controls and message controls fit their panes; resources have recognizable drawings and reveal effect questions after placement. Wave explanation options share the same availability. The four coaster demos use consistent task cards and a persistent comparison board that records only completed model runs.
- Meaningful multipart submissions remain explicit: constructed graphs, words, evidence sets, written plans and paths still require their relevant check. Wrong answers retain retry text and distinct visual feedback.

Behavior changes began with focused failing regressions. Independent subject reviews are **APPROVED**. The Math review found an out-of-range hundredths landmark for an off-step endpoint; a regression reproduced it, bounded tick generation fixed it, and the reviewer approved the final change. Independent Science/coaster and Reading reviews found no outstanding issues.

Browser acceptance: all 61 real lesson routes were activated and captured at 1280×900, 1280×560, 390×844 and 320×700. Final document, visual and task panes have no horizontal overflow; Reading source scrolling remains intentional. Subject reviewers inspected the changed illustrations, controls and text. Stateful checks covered immediate word meaning, graph setup, rock selection, erosion conclusions and collision comparisons, plus coaster wrong/correct/reset feedback and retained observations. The completed coaster board fits at 320px, and both animated and reduced-motion runs produce their records. Normal and single-file previews passed activation, keyboard focus and unchanged local progress checks in all three subjects; normal font links and self-contained single-file behavior were verified.

Final gate after the endpoint fix: **1,743 tests passed in 211 files** (1,022 current-workspace tests plus 721 unchanged nested-review tests); TypeScript, normal build, single-file build and `git diff --check` passed. Final rebuilt normal/single previews both displayed the corrected number-line landmarks. Changes remain uncommitted; screenshots and logs are outside source.
