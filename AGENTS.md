# Cram All: agent context

## Project and sources of truth

Cram All is a browser-only React/Vite/TypeScript Grade 4 learning app. The
approved product and interaction contract is the
[design spec](docs/superpowers/specs/2026-08-29-cram-all-design.md). The
South Carolina standards source of truth is
[docs/research/sc-grade4-standards.json](docs/research/sc-grade4-standards.json);
`src/content/standards/standards.json` is generated from it and must not be
hand-edited.

Use these artifacts in this order when resuming work:

1. [Plan A foundation](docs/superpowers/plans/2026-08-29-plan-a-foundation.md)
   and [Plan A closure remediation](docs/superpowers/plans/2026-08-29-plan-a-closure-remediation.md).
2. The execution ledgers: [.superpowers/sdd/progress.md](.superpowers/sdd/progress.md)
   and [.superpowers/sdd/2026-08-29-plan-a-foundation/progress.md](.superpowers/sdd/2026-08-29-plan-a-foundation/progress.md).
3. [Plan B master](docs/superpowers/plans/2026-08-29-plan-b-widget-library.md)
   and its [Math](docs/superpowers/plans/2026-08-29-plan-b1-math-widgets.md),
   [Science](docs/superpowers/plans/2026-08-29-plan-b2-science-widgets.md),
   and [Reading](docs/superpowers/plans/2026-08-29-plan-b3-reading-widgets.md)
   subject plans.
4. [Plan C master](docs/superpowers/plans/2026-08-29-plan-c-full-year-content.md)
   and the [Math](docs/superpowers/plans/2026-08-29-plan-c1-math-curriculum-blueprint.md),
   [Reading](docs/superpowers/plans/2026-08-29-plan-c2-reading-curriculum-blueprint.md),
   and [Science](docs/superpowers/plans/2026-08-29-plan-c3-science-curriculum-blueprint.md)
   blueprints. Blueprints freeze decisions; only the exact executable wave
   plans named by Plan C may author full-year content.

Repository documentation and quick-start commands are in [README.md](README.md).

## Resume and check-status procedure

Before editing, inspect `git status --short`, `git diff --stat`, the recent
`git log`, and both execution ledgers above. Treat existing worktree changes as
user-owned: understand them, preserve them, and do not clean, reset, rebase, or
stage them broadly. Read the relevant plan's current gate and exact file scope;
the presence of a plan is not evidence that it has been executed.

Run the appropriate focused tests first, then the normal baseline gate:

```sh
npm test
npx tsc -b --pretty false
npm run build
```

For a release or cross-cutting change, also run `npm run build:single`, inspect
the generated artifacts, and browser-test the real app. Serve the normal build
with `npx vite preview --host 127.0.0.1`; do not open `dist/index.html` directly.
Use exact narrow `git add` paths from the active plan, inspect staged names, and
run `git diff --check` before any commit. Never use `git add -A` for plan work.

## Architecture and content locations

- `src/App.tsx`, `src/main.tsx`, `src/app/`: shell, HashRouter routes, theme and
  shared motion/reduced-motion behavior.
- `src/characters/`: guide SVG/art, poses, dialogue, and speech bubbles. This
  is a protected Plan-A boundary; preserve concurrent user/agent changes here.
- `src/lesson/`: generic lesson flow, learn cards, read-aloud, inline checks,
  worked examples, and lesson demos.
- `src/widgets/`: reusable tactile experiments; `registry.ts` and
  `WidgetFrame.tsx` are the typed lazy-loading boundary.
- `src/quiz/`: Quick Check sampling, grading, feedback, results, and review links.
- `src/progress/`: versioned `localStorage` persistence under the literal key
  `cramall.v1`, migration, mastery, readiness, stars, streaks, and Parent Corner
  state.
- `src/content/schema.ts`: Zod content contracts and widget types;
  `src/content/subjects.ts`: subject/unit assembly;
  `src/content/<subject>/`: lesson data and focused tests;
  `src/content/content-validation.test.ts`: permanent
  cross-reference/coverage checks.

Keep `HashRouter`, `passThreshold: 8`, canonical kebab-case IDs, local-only
storage, and normal-versus-single Google Font behavior intact unless an
explicitly authorized plan changes them.

## Durable learner and curriculum constraints

- In Reading, each question or inline check must be preceded by the complete
  source text/snippet it depends on. A self-contained source snippet in the
  current card is valid; an inline check does not have to wait for a later full
  lesson passage. Keep the applicable source visible while its question is
  answered; do not force the learner to reconstruct source text from a collapsed
  card.
- Inline checks are practice feedback, not a substitute for their source text
  or for a Quick Check.
- This is a solo app. Do not claim a live partner, classroom collaborator,
  listening partner, voice scoring, oral-fluency measurement, or recording
  assessment. Read-aloud/TTS is optional assistance only.
- Science should use deep, tangible Grade 4 phenomena (including roller-coaster
  or collision examples where relevant) and visible, learner-controlled
  animation/model interactions. A widget or animation is a model/prediction,
  not physical evidence; never say that the app observed or proved a result.
  Energy is inferred from observable motion/effects, not directly seen.
- Any visible guide dialogue owns one forward `Next` action at a time. For intro
  dialogue specifically, keep the bubble above a 360px guide that caps itself
  to the available viewport width, reserve stable layout space, and prevent the
  guide, bubble, or controls from shifting or clipping as lines change.
- Preserve accessible text/status feedback, keyboard operation, large touch
  targets, non-color cues, and reduced-motion behavior. Widget state must not
  write progress, scoring, analytics, or storage.

## Engineering/review expectations

Use TDD for behavior changes: establish a focused failing test, implement the
smallest fix, run focused plus adjacent/permanent tests, then run TypeScript and
build gates. Browser-check the real rendered flow for interaction, layout,
responsive behavior, persistence, and both build modes when relevant. Request
an independent scoped review for completed feature waves and address findings
with evidence. When two tasks are genuinely independent, a requested subagent
may handle one with a narrow file scope; the main agent remains responsible for
integration, review, and gates.

Plan B requires its master order and prerequisite gates; it does not create
lesson content. At this handoff, Plan B and its subject plans are tracked
designs, not evidence of an executed widget-library rollout. Plan C requires
accepted Plan-A remediation and completed, reviewed Plan B before full-year
authoring; its C1/C2/C3 documents are tracked curriculum blueprints, not
executable source plans. Reading Unit 1 and Science Unit 1 are registered and
visible since commit `05b46b9`; later subject registration remains Plan C work.
Do not infer completion from filenames or stale plan checkboxes.

## Historical handoff through `388b540`

Reading Unit 1 and Science Unit 1 have been registered and visible since
`05b46b9`. Commit `d91a1b3` deepens those five lessons with persistent Reading
source text, 15 source-before-question inline checks, solo practice framing,
three replayable Science animations, and stable one-Next dialogue layout. The
intro guide is 360px on roomy screens and caps to the available viewport width;
guide/kid line changes retain one reserved footprint without clipping or
control jumps. Commit `6a989cc` further keeps the current guide visible and idle
during kid dialogue (including Math U1 L1), and upgrades the Science model with
a layered track, detailed car and marble, wheel/rolling motion, foam impact, and
poses derived from the exact rendered rail geometry. Animation status remains
truthful through normal, replay, collision, and reduced-motion preference
changes.

Commits `3b8570a` through `388b540` make every top-level lesson stage URL-driven
(`intro`, each card, `worked`, and `outro`), preserving unrelated query
parameters and browser Back/Forward while canonicalizing legacy `?card=` review
links. Reading worked examples now model source passages separately from their
numbered coaching and render a book-style passage/coaching layout: contained
inline scroll panes on adequately tall desktop windows, two-column document
flow on very short wide windows, and stacked document flow on mobile.

Verification at source commit `388b540`: 371/371 tests, clean TypeScript, normal
and self-contained single-file builds, real-browser refresh/history/legacy-link
checks, and desktop/short-window/mobile overflow checks. Independent final
review is APPROVED.
Re-run the relevant gates before relying on this handoff after later changes.
Do not implement the Plan A closure-remediation items without new explicit
authorization, even if their residuals appear in a review ledger.

## Current handoff — Social Studies, September 8, 2026

The user-approved Social Studies feature adds Pip the Carolina wren and five units with 30 lessons. Every new lesson has three cards, 13 authored quiz questions, and a coached timeline, map, evidence board, or cause-and-effect activity. The complete catalog has 119 lessons, 36 units, 357 cards, and 1,547 questions. The original 89 lesson identities and three subject standards records remain intact.

Use [the approved Social Studies plan](docs/superpowers/plans/2026-09-07-social-studies.md), [release verification](docs/reviews/2026-09-08-social-studies-release.md), and [source index](docs/research/sc-grade4-social-studies-sources.md) for this wave. Standards remain generated from the research JSON; the new subject preserves all 30 official 2019 indicators. Worked examples retain field notes and each lesson closes with its authored reflection.

The release candidate was isolated on `codex/social-studies` from `0f1ecd9`, excluding concurrent guided-activity prototypes and workshops. Its baseline passed 1,022 tests; the Social Studies candidate passes 1,093 tests in 123 files, TypeScript, standards parity, and normal/self-contained builds. All 30 activity routes were checked again in the isolated normal build, with additional portable-build, keyboard, 320px layout, retry/completion/reset, and field-note refresh checks. The broader feature browser review covered each activity family, a 9/10 quiz, review links, history, and old/new parent checks. Independent content and release-extraction reviews are APPROVED. Browser media/native zoom emulation was unavailable; four rendered integration tests cover reduced motion.

The user's September 8 instruction authorizes committing this feature, merging it into `main`, and pushing. Concurrent work in the original checkout is preserved and is not part of this release. The old Plan-A closure restriction remains in force.
