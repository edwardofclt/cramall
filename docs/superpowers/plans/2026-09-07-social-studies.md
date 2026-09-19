# Social Studies Implementation Plan

> Use superpowers:subagent-driven-development for independent, narrowly scoped activity and content tasks, with parent-owned integration and independent reviews. Continue through all tasks under the user's approval.

**Goal:** Ship Pip and all 30 Grade 4 Social Studies lessons in five units, with a guided activity in every lesson.

**Architecture:** Extend the existing subject/standards registries and use the existing lesson, quiz, coaching, and workbench components. Four history widgets share strict source and explanation contracts. New authored lesson data is assembled with a small ID/quiz-choice helper; historical prose and questions remain explicitly authored.

**Tech Stack:** Existing React/TypeScript/Zod/Vitest/Vite; no dependency additions.

**Spec:** `docs/superpowers/specs/2026-09-07-social-studies-design.md` (approved).

## Global constraints and ownership

- Preserve `HashRouter`, `cramall.v1`, `passThreshold: 8`, the original 89 lesson identities and existing assets.
- The finished catalog has 119 lessons, 36 units, 357 cards, and 1,547 quiz questions.
- Each new lesson has exactly three cards, exactly 13 explicitly authored questions, at least two natural question types, and at least one coached activity.
- Keep source material visible during questions. No historical impersonation, slavery/war game, fabricated primary source, or simulated proof of history.
- Activity state is local; no storage/progress/scoring writes. Use native keyboard/tap controls, immediate committed-action feedback, retained phase feedback, reset, and reduced motion.
- Existing untracked missing-guided-activities design documents belong to another task. Preserve them. No broad staging, reset, or cleanup. Authoring used the existing `codex/guided-activity-prototypes` checkout with disjoint worker scopes and no concurrent commits. The user subsequently authorized commit, merge to `main`, and push; release integration uses the isolated `codex/social-studies` worktree, containing only this feature.
- Parent owns central schema/registry/frame/speech integration, standards scripts/data, Pip registration, subject/manifest integration, screen adjustments, permanent tests, gates and final docs.
- Activity worker owns only `src/content/social-studies/history-schema.ts` and `src/widgets/social-studies/**`.
- Two content workers own only assigned `src/content/social-studies/uNN.ts`, `uNN.test.ts`, and assigned provenance documents. Parent owns `authoring.ts`, `index.ts`, and cross-unit tests.

## Task 1 — Baseline, standards, identity and authoring boundary

Files: research JSON; standards generator/parity scripts and tests; `src/content/standards/schema.ts`; `src/content/schema.ts`; `src/content/social-studies/authoring.ts`; `src/content/social-studies/integration.test.ts`; `src/characters/Character.tsx`; `src/characters/art/Pip.tsx`; `src/characters/assets/pip.png`; character tests.

- [x] Run focused catalog/standards tests, then baseline suite, TypeScript and build.
- [x] Add a failing test for fourth-subject identity and all 30 standards:

```ts
test('registers a complete Social Studies subject with Pip', () => {
  const social = SUBJECTS.find(subject => subject.id === 'social-studies');
  expect(social?.guide).toBe('pip');
  expect(social?.units).toHaveLength(5);
  expect(social?.units.flatMap(unit => unit.lessons)).toHaveLength(30);
});
```

- [x] Extract exact 30 indicator texts from SCDE; add a separate source verification note. Extend generator/schema/parity for `social-studies`, regenerate derived JSON, and assert all three prior subjects are identical.
- [x] Add subject/guide enum values and canonical ID support. Create Pip from the existing raster art style, inspect alpha and framing, and register all five existing poses.
- [x] Create authoring helpers that only assign canonical IDs, map review cards, distribute correct-choice positions, and assemble already-authored content. The helper never invents historical content or quiz questions.

Authoring interface:

```ts
type HistoryCard = { title: string; text: string; example: string; tip: string };
type HistoryQuestion = {
  card: 1 | 2 | 3; prompt: string; correct: string;
  wrong: string[]; explanation: string;
  type?: 'multiple-choice' | 'true-false';
};
type HistoryLessonDraft = {
  id: string; title: string; indicatorCode: string;
  intro: string; cards: [HistoryCard, HistoryCard, HistoryCard];
  activity: WidgetRef; coach: WidgetCoach;
  worked: { title: string; steps: string[] };
  questions: HistoryQuestion[];
};
// Produces a valid Lesson; unit ID derived from lesson ID.
export function historyLesson(draft: HistoryLessonDraft): Lesson;
```

## Task 2 — Four guided history widgets

Files: `src/content/social-studies/history-schema.ts`; `src/widgets/social-studies/HistoryTimeline.tsx`, `HistoryMap.tsx`, `HistoryEvidenceBoard.tsx`, `HistoryCauseEffect.tsx`, `HistoryActivity.tsx`, `history.css`, and focused component/schema tests. Parent alone registers types in the central union, registry, frame and speech function.

Shared configuration is explicit and serializable:

```ts
type HistorySource = { id: string; title: string; text: string; attribution: string; url: string };
type HistoryExplain = { prompt: string; choices: {id:string; text:string}[]; correctChoiceId:string; explanation:string };
type HistoryBase = { title:string; prompt:string; sources:HistorySource[]; explain:HistoryExplain };
// type: 'history-timeline'
type TimelineConfig = HistoryBase & { events:{id:string; title:string; year:number; detail:string; sourceId:string}[]; correctOrder:string[] };
// type: 'history-evidence-board'
type EvidenceConfig = HistoryBase & { headings:{id:string; label:string}[]; cards:{id:string; text:string; sourceId:string; targetId:string}[] };
// type: 'history-cause-effect'
type CauseConfig = HistoryBase & { causes:{id:string; text:string}[]; effects:{id:string; text:string; sourceId:string; causeId:string}[] };
// type: 'history-map'; schematic maps explicitly labeled, positions checked against geography.
type MapConfig = HistoryBase & { mapKind:'colonial-regions'|'united-states'|'south-carolina'; period:string; locations:{id:string; label:string; x:number; y:number; detail:string; sourceId:string}[]; cards:{id:string; text:string; sourceId:string; locationId:string}[] };
// Every widget shares this event contract; parent maps it under all four keys.
type HistoryEvent =
  | {type:'interaction'; action:'select'|'place'|'explain'|'reset'}
  | {type:'change'; value:{placements:Record<string,string>}}
  | {type:'complete'; value:{explanationId:string}};
```

Export `HistoryTimelineWidgetRefSchema`, `HistoryMapWidgetRefSchema`, `HistoryEvidenceBoardWidgetRefSchema`, `HistoryCauseEffectWidgetRefSchema` as strict plain Zod objects wrapping refined configs. Export their config types for isolated implementation without central union dependency. Components consume `{config, onEvent}` compatible with the registry's event type, plus generic coach events already supported.

- [x] Write focused failing tests for rejected/accepted relationships, chronology, source references and explanation keys; observe the failures.
- [x] Build visible constructions, not decorative answer grids: timeline slots, spatial map markers, evidence columns, and connected cause/effect rows.
- [x] Source material stays accessible; choice feedback occurs on placement/answer, not selection. Require both complete correct construction and a correct explanation.
- [x] Prove a wrong construction recovers, prior feedback persists, construction revision clears dependent explanation, and reset restores focus. Prove local state never writes storage.
- [x] Validate configs reject duplicate IDs, unknown source/target IDs, incompatible chronological answers, unused targets, and leaked completion without explanation.

## Tasks 3 and 4 — Authored curriculum waves

Task 3 files: `src/content/social-studies/u01.ts`–`u03.ts`, corresponding unit tests, `docs/research/social-studies-u01-u03-sources.md`.

Task 4 files: `src/content/social-studies/u04.ts`–`u05.ts`, corresponding unit tests, `docs/research/social-studies-u04-u05-sources.md`.

The approved spec's 30-row table is the literal identity/title/indicator/activity allocation. Export each six-lesson array as `unit01Lessons` through `unit05Lessons`. Use `historyLesson` with the exact interface above; every teaching paragraph and all 13 question prompts/answers/explanations must be explicitly authored. No generic or programmatically paraphrased question banks.

For each unit:

- [x] Add its coverage/quality test before its lesson file:

```ts
test('every authored lesson has three cards, thirteen questions and a coached activity', () => {
  expect(unit01Lessons).toHaveLength(6);
  for (const lesson of unit01Lessons) {
    expect(validateLesson(lesson)).toEqual([]);
    expect(lesson.learnCards).toHaveLength(3);
    expect(lesson.quiz.pool).toHaveLength(13);
    expect(new Set(lesson.quiz.pool.map(q => q.type)).size).toBeGreaterThanOrEqual(2);
    expect(lesson.learnCards.some(card => card.widget && card.widgetCoach)).toBe(true);
  }
});
```

- [x] Author the assigned six lessons per unit using the official indicator and complete 2024 guide context. Research supporting authoritative/primary sources and record provenance per lesson.
- [x] Keep each card's core teaching near 60–100 words; use short sentences, concrete examples, and first-use definitions. Check all quiz questions against the visible lesson field notes.
- [x] Provide lesson-specific guide/kid introduction and meaningful retry/milestone/completion copy. At least two sources are needed for perspective/evidence comparisons.
- [x] Review all answers and source/target mappings manually, then run focused content/widget/schema tests. Report exact file scope and gaps to parent without editing the registry.

## Task 5 — Catalog integration, persistence and screen checks

Files: `src/content/social-studies/index.ts`, `src/content/curriculum.ts`, `src/content/subjects.ts`; catalog/curriculum/quality/standards tests; `src/screens/Home.test.tsx`, `SubjectMap.test.tsx`, `ProgressScreen.test.tsx`, `ParentCorner.test.tsx`; scoped theme changes if needed; `src/progress/storage.test.ts`.

- [x] Register all five accepted unit exports together and append the exact 30 manifest rows.
- [x] Extend fourth-subject registries and exact counts. Test old three-subject save roundtrip plus new lesson attempt; preserve literal storage key.
- [x] Test fourth-subject Home/map/parent/progress discoverability and official standards link; adjust four-card layout only if needed.
- [x] Add permanent per-lesson activity/coach/source checks. Validate all 30 indicator allocations and deterministic quiz grading/review links.
- [x] Request independent scoped implementation/content review and address reproduced findings.

## Task 6 — Release validation and handoff

Files: README, approved design status, this plan's completion evidence, current AGENTS handoff, consolidated social-studies source index.

- [x] Run focused/adjacent gates, `npm run standards:check`, full tests, TypeScript, both builds, and `git diff --check`.
- [x] Inspect normal/single artifacts and Pip/illustration assets. Verify only the normal build uses external fonts.
- [x] Browser-open all 30 actual lesson activity routes. Test all four families through wrong/recovery/explanation/reset; repeat layout at desktop, short-wide, 390px and 320px, keyboard and source retention. Verify reduced motion in rendered integration tests; record unavailable native zoom/media emulation below.
- [x] Browser-check a Quick Check, its review link, refresh/history, old progress retention and new social progress. Exercise both builds.
- [x] Record true workspace test counts separately from unchanged nested review checkout. Update README and handoff with the actual outcome; do not stage other tasks' work.

## Acceptance evidence — September 7, 2026

- All six tasks implemented, reviewed, and verified. Registry: 119 lessons / 36 units / 357 cards / 1,547 questions; Social Studies: 30 / 5 / 90 / 390, all with coached activities.
- Full accepted gate: 1,852 tests / 229 files, comprising 1,131 workspace tests / 128 files and 721 unchanged nested-review tests / 101 files. Four additional scoped reduced-motion integration tests passed after that gate. TypeScript, standards parity, normal and single-file builds passed.
- All 30 actual activity routes opened in the browser. Each family completed wrong-placement, recovery, wrong-explanation, correct-explanation, and reset flows. Evidence board, map and cause/effect ran in normal production preview; timeline ran in the single-file preview.
- Actual map verification caught and corrected the Columbia River mouth location and a 320px compass-label overlap. Desktop, short-wide and narrow layouts retained readable controls and no document horizontal overflow. The worker additionally checked all four families at 1280×800, 1280×450, 390×844 and 320×760.
- A real Quick Check deliberately missed one answer, scored 9/10, kept field notes available for all 10 questions, and linked to the correct card. Legacy review query canonicalization, refresh, Back/Forward, saved completion, and old/new Parent Corner check retention were verified. Export/import compatibility is covered by the permanent integration test.
- The browser backend exposes viewport controls but no media-preference or native text-zoom emulation. Reduced motion was therefore exercised in four rendered lesson/guide integration tests; responsive reflow was tested down to 320px. Native OS preferences were not changed.
- Independent code/content review covered all 30 lessons and 390 answer keys, source fidelity, strict widget relationships, all standards texts, and both provenance ledgers. Final disposition: APPROVED, no unresolved code/content findings.
- Review fixes: show field notes beside Social Studies worked examples; reuse each lesson’s authored reflection at its closing; teach the First Amendment explicitly with unambiguous references to other amendments; place the Columbia River mouth on the drawn coast.
- Existing lesson-history test synchronized with the visible returning card instead of its earlier URL update, removing an observed animation race.
- Concurrent guided-activity changes were preserved in their original checkout. The September 8 release candidate is isolated from that work and passes its own complete gates; the earlier shared-tree build limitation does not apply to this release.

## Release integration — September 8, 2026

The user explicitly requested commit, merge to `main`, and push. Only Social Studies changes were transferred to `codex/social-studies` from `0f1ecd9`. Five mixed registry/schema/fixture files were reconstructed with only Social Studies additions. No original Math, Reading, or Science lesson files changed. Independent extraction review is APPROVED, with no unresolved imports or prototype/workshop dependencies.

The isolated baseline passed 1,022 tests. The feature candidate passed 1,093 tests in 123 files, TypeScript, standards parity, normal and single builds. Two unsupported Testing Library `exact` options were removed from the reduced-motion test; its four cases passed again. All 30 real activity routes were checked in this release build, plus portable artwork, keyboard placement, 320px map layout, complete evidence-board feedback/reset, and worked-example refresh. See [release verification](../../reviews/2026-09-08-social-studies-release.md) for the exact evidence and limits.
