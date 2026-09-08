# Guided activities for the 32 uncovered lessons

Date: 2026-09-07\
Status: **All 32 activities implemented; prototypes accepted and the remaining 29 completed. Verification record updated September 8, 2026.**\
Baseline inspected: `0f1ecd9` (`feat(activities): unify guide-led lessons and immediate feedback`).

## Review the activities

| Subject | Original coverage | New designs | Detailed designs |
|---|---:|---:|---|
| Math | 23/33 lessons | 10 | [Math activities](2026-09-07-missing-guided-activities-math.md) |
| Reading | 11/24 lessons | 13 | [Reading activities](2026-09-07-missing-guided-activities-reading.md) |
| Science | 23/32 lessons | 9 | [Science activities](2026-09-07-missing-guided-activities-science.md) |
| Total | **57/89 lessons** | **32** | Verified original-subject coverage: **89/89** |

Coverage means at least one learn card with a rendered guide-coached widget, or an interactive guided Science demo. A worked example, inline check, introductory conversation, or passive illustration alone does not count. This proposal adds one activity to each currently uncovered lesson; some activities contain two short rounds.

The user requested **design all 32 for review first**, then authorized the three real prototypes with “Carry on” and accepted their rendered result with “looks good.” The [completion plan](../plans/2026-09-07-complete-guided-activities.md) implements the remaining 29. All original 89 lessons now include an eligible guided activity. The separate Social Studies rollout adds 30 covered lessons, for **119/119** in the current catalog. See the [full verification record](../../reviews/2026-09-08-complete-guided-activities.md) and the earlier [prototype review](../../reviews/2026-09-07-guided-activity-prototypes.md).

## Recommended approach

Build a small set of subject-specific experiences around the reasoning each lesson needs, sharing the existing guide and workbench. Extend an existing widget only where its model fits. For example, fraction pieces and shape classification are useful foundations; the current binary character sender is not a picture-grid sender, and the current frequency control is not a wavelength tool.

Two alternatives were considered. Configuring only existing widgets would reduce implementation work but cannot adequately cover oral-reading self-reflection, citation repair, controlled device retests, or sense/brain/response models. A single generic sorter could fill the coverage count quickly but would replace measurement, construction, and controlled comparison with repetitive answer selection. Neither is the recommended design.

Each subject document specifies the exact lesson/card placement, standard, practice material, learner action, retained result, reasoning task, two-turn dialogue, coaching triggers, completion, and implementation implications. All materials labeled new or invented are proposed Cram All practice content. Existing lesson titles, standards, worked examples, and Quick Checks remain the instructional context.

## Experience shared by all 32

### Start inside the relevant lesson card

Use the existing subject guide: Nutty for Math, Winnie for Reading, Sandy for Science, with the app's actual character assets. The guide's first line connects the task to the lesson; the learner's second line states a plan. No activity is mounted before this conversation finishes. Each line owns one forward action. The last action uses the activity-specific label in the design and replaces the conversation with the activity, focusing its first meaningful control.

Use the existing 360px guide capped to available width and the reserved dialogue footprint. Do not add another guide overlay, new mascot artwork, or competing forward button.

### Act, retain a result, then explain

Default sequence: prepare → plan/predict → manipulate → check/compare → explain → finish/retry. Prediction is neutral, revisable, and never graded as mastery. For Reading annotation and research, planning replaces an artificial prediction. The concept must be encoded by the work surface: quantity, shape, source words, record, relationship, or sequence.

Selections are drafts until explicitly checked. Structural feedback such as “Choose two points” may occur immediately; correctness and keyed reasoning appear only after commitment. Each submitted phase owns its feedback region. A later explanation or coach bubble never overwrites an earlier measurement, prediction, source selection, or trial record.

When a learner changes an upstream answer, dependent conclusions become drafts needing another check. Retain prior records labeled “Earlier attempt” where comparisons require them; never display stale success for changed work. A new trial appends a record with its setup. Full reset clears all local attempts, feedback, and completion state; ordinary retry preserves useful work. Completion occurs once per completed attempt and never from mounting, moving a decorative object, or merely advancing dialogue.

### Explain honestly

Use constrained evidence links or mathematical inputs for checkable parts. An optional sentence in the learner's own words is a reflection, not automatically scored writing. Fluency activities can confirm that a reading plan and reflection were completed; they cannot confirm accurate speech, pace, expression, or comprehension from a checkbox or audio playback. Interpretive tasks accept all authored, source-supported alternatives identified in their design.

These activities are unscored practice. Finishing one does not pass the lesson, award stars, write progress, or replace its Quick Check. Lesson navigation retains the existing app behavior; an activity completion condition is not a new progression lock.

### Keep the work surface stable

Start from `ActivityWorkbench` and its current geometry: 700px outer height above the 700px breakpoint; 860px on narrow screens, with a 360px upper work area and the remaining space for tasks/coaching. The outer footprint stays constant through dialogue, retry, records, and completion. Illustration/measurement surfaces stay fixed; the task pane scrolls as phases appear. Long source documents use the existing explicit source-scroll option, with a visible title and keyboard-accessible pane.

On short wide windows the page may scroll to reach the whole fixed workbench, while the task pane retains its own deliberate scrolling. At narrow widths and high zoom, controls wrap within their pane. If a particular design cannot fit without clipping, its prototype must resolve that layout before rollout rather than shrinking readable text. Selected source excerpts remain next to their answers even if the full source pane is scrolled elsewhere. Sources are never collapsed while a dependent question is active.

Use click/select/place controls with full keyboard equivalents; dragging may be an enhancement only. Touch targets are at least 44px. Avoid tiny fractional pieces, graph marks, or grid cells as the only controls. Inputs have units and labels; selected states use text/icons as well as color. Announce meaningful updates briefly. Reveal a phase by scrolling only its task pane; do not steal focus on every change. Reduced motion shows the same states and retained results with instant transitions. No activity requires audio.

## Subject rules

**Math:** New practice numbers prevent copying an answer printed in an earlier example. Teacher/reviewer answer keys in these documents are not initial learner-facing copy. Show the problem explicitly, conserve quantity when pieces move, use proportional geometry, and keep units attached to values. Respect each lesson's denominator limits and its existing exactly-two-equal-sides convention for isosceles triangles.

**Reading:** Each proposed source is complete for the question it supports and appears before that question. Keep its original wording and line breaks, especially poetry and drama. Editable interpretation/annotation layers never alter the immutable original. Do not expose grouping keys through note IDs, colors, or source labels. Supplied invented publications remain visibly labeled as practice sources. TTS is optional assistance; no recording, voice assessment, live partner, or automated essay grading.

**Science:** Separate a model outcome from a supplied observation record in both headings and feedback. Replaying a supplied record is not conducting a physical experiment. Energy is inferred from effects, never shown as something directly observed. Do not generate invented measurements on demand and then call them evidence. Controlled comparisons retain settings, criteria, and record provenance. No physical equipment is required.

## Implementation boundaries after design review

Use the existing `widget` plus `widgetCoach` boundary and `ActivityWorkbench`. New families need typed configuration, lazy registration, events, read-aloud text, and schema validation. Extensions must preserve existing configurations and interactions. Runtime state stays inside widgets and must not write scoring, analytics, or storage.

The exact target learn-card IDs are in the subject documents. Preserve those IDs and existing source-before-question ordering. A card's new mini-conversation replaces any competing widget introduction on that card. New source snippets are activity data, not changes to standards or quiz answers. Do not edit generated standards, protected character files, unrelated lesson stages, or deferred Plan-A remediation.

Implementation should begin with three real-lesson prototypes: **M7 Weigh the Field Kit**, **R1 Phrase Pathfinder**, and **S6 One-Change Retest**. They expose measurement, honest fluency feedback, and supplied-record comparison risks early. Each needs a rendered user review before the corresponding family expands. The current documents specify the designs; they do not claim these prototypes exist.

Once prototypes are accepted, an executable implementation plan should establish narrow file ownership, shared schema/registry integration, and a staged subject rollout. The older rollout plan covers existing activities; it is not authority to claim this new work complete.

## Acceptance required during implementation

1. Add a catalog test that fails with the exact uncovered lesson IDs and passes only when every registered lesson contains at least one eligible activity. Preserve existing coaching/source/coverage checks. Existence is a minimum gate; the interaction tests below establish that an activity does useful work.
2. For each family, first establish focused failing tests for a meaningful wrong path, recovery, retained earlier feedback, no early answer reveal, final reasoning, reset, and completion emitted once. Check new typed configurations for reachable targets, valid source spans, unique IDs, compatible units, and correct relationships.
3. Test the real lesson wrapper: activity absent during dialogue, one Next owner, actual guide visible, first-control focus after lazy mount, source present before dependent questions, reentry/reset behavior, and optional audio/reduced-motion equivalence. Verify activity events do not change learner progress or storage.
4. Browser-check representative flows at desktop 1440×900, short wide 1280×600, mobile 390×844 and 320px width, keyboard only, and 200% zoom. Verify every new family at least once; do not infer all families work from one prototype. Inspect overflow, retained source/feedback, and unchanged outer height across phases.
5. Run focused plus adjacent tests, then `npm test`, `npx tsc -b --pretty false`, normal and single builds. Serve the real normal build through Vite preview; inspect the single artifact and its offline resource behavior. Obtain the repository's independent scoped review for the completed feature wave and address findings before claiming 89/89 shipped coverage.

## Design verification

The activity placements were checked against the registered catalog at the baseline above: 10 Math, 13 Reading, and 9 Science lessons, each included exactly once, with existing target card IDs and matching indicator codes. The proposed arithmetic, classification, graph, code-grid, and trial-record answer keys were checked separately. This is a documentation check; app tests and browser checks are future implementation gates.

Sources inspected: the live `SUBJECTS` catalog and its lesson files, local canonical standards, the approved product design, both foundation ledgers, current widget schemas/renderers, the September 7 existing-activity rollout, and the [guide-led experience contract](/Users/eherbert/.codex/skills/designing-guide-led-manipulatives/references/experience-contract.md).
