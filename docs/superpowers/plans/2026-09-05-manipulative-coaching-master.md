# Manipulative Coaching and Usability Master Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver in-step subject-guide coaching and repair every P0/P1 instructional usability problem in lesson-used manipulatives.

**Architecture:** Stabilize a typed, ephemeral coaching boundary first, then execute Math, Reading, and Science plans with narrow ownership. Finish with cross-subject content validation, browser acceptance, both build modes, and independent Luna reviews.

**Tech Stack:** React 18, TypeScript 5, Zod 3, Framer Motion 11, Vite 5, Vitest 2, React Testing Library, user-event, jsdom.

**Spec:** `docs/superpowers/specs/2026-09-05-manipulative-coaching-and-usability-design.md`

## Global Constraints

- All delegated implementation and review workers use model `gpt-5.6-luna`.
- Do not modify, stage, or revert `src/characters/**`.
- Do not modify generated `src/content/standards/standards.json`.
- Preserve `HashRouter`, `passThreshold: 8`, canonical IDs, and local-only progress.
- Widget/coaching state stays ephemeral and must not write storage, scoring, analytics, readiness, stars, streaks, or unlocks.
- Reactive coaching is action-based only; do not add idle timers.
- Science models never claim to be physical evidence, and energy remains inferred from observable motion/effects.
- Reading source-dependent work keeps the complete applicable source visible.
- Controls remain at least 44×44 CSS pixels, keyboard operable, non-color-dependent, and reduced-motion safe.
- Use exact narrow staging paths; never run `git add -A`.
- Preserve unrelated worktree changes.

## Required execution order

1. `docs/superpowers/plans/2026-09-05-manipulative-coaching-foundation.md`
2. `docs/superpowers/plans/2026-09-05-manipulative-math-improvements.md`
3. `docs/superpowers/plans/2026-09-05-manipulative-reading-improvements.md`
4. `docs/superpowers/plans/2026-09-05-manipulative-science-improvements.md`
5. `docs/superpowers/plans/2026-09-05-manipulative-integration.md`

The three subject plans may dispatch independent component tasks concurrently only after
their schema-contract task is committed. No two active agents may edit
`src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`,
`src/lesson/**`, or the same section of `src/theme.css` concurrently.

## Controller workflow

### Task 1: Baseline and protected-boundary record

**Files:** Read only.

**Interfaces:**
- Consumes: repository and both execution ledgers.
- Produces: recorded clean/understood baseline and character boundary manifest.

- [ ] **Step 1: Inspect repository state**

```sh
git status --short
git diff --stat
git log -6 --oneline
sed -n '1,240p' .superpowers/sdd/progress.md
sed -n '1,240p' .superpowers/sdd/2026-08-29-plan-a-foundation/progress.md
rg --files src/characters | sort
```

- [ ] **Step 2: Run baseline gates**

```sh
npm test
npx tsc -b --pretty false
npm run build
```

Expected: all commands pass before implementation begins. Record unrelated failures and
stop only if they overlap the planned files or invalidate the baseline.

### Task 2: Execute the shared foundation plan

**Files:** Exact files are owned by the foundation plan.

**Interfaces:**
- Consumes: existing `WidgetEventMap`, `LearnCardSchema`, `WidgetFrame`, and lesson stage flow.
- Produces: stable `WidgetCoach`, `WidgetCoachEvent`, and `WidgetCoachFrame` interfaces.

- [ ] **Step 1: Execute every foundation task with a fresh Luna implementer**

Use `gpt-5.6-luna`; require focused red/green evidence and the exact file scope from the
foundation plan.

- [ ] **Step 2: Run two-stage review after each task**

First review spec compliance; only after it passes, review code quality, accessibility,
and test strength. Send concrete findings back to the same implementer for a bounded fix
round, then re-review.

- [ ] **Step 3: Run the foundation gate**

```sh
npm test -- schema WidgetCoach WidgetFrame LessonPlayer content-validation
npx tsc -b --pretty false
npm run build
git diff --check
```

### Task 3: Execute subject repair plans

**Files:** Subject plans own their respective widget/content directories and enumerated
schema/CSS edits.

**Interfaces:**
- Consumes: committed coaching foundation.
- Produces: repaired lesson-used Math, Reading, and Science manipulatives with authored coaching.

- [ ] **Step 1: Execute each subject's schema-contract task serially**

Run Math, then Reading, then Science schema tasks. Each task must leave schema tests and
TypeScript green before the next task edits `src/content/schema.ts`.

- [ ] **Step 2: Dispatch non-overlapping subject component/content tasks**

Use fresh `gpt-5.6-luna` agents. At most three run concurrently, and every prompt repeats
the exact owned files and prohibition on touching shared/other-subject files.

- [ ] **Step 3: Review each subject task twice**

Require spec-compliance approval before code-quality review. Fix and re-review any
Critical or Important finding before accepting the task.

- [ ] **Step 4: Run the subject gate after every accepted task**

```sh
npm test -- widgets content schema
npx tsc -b --pretty false
git diff --check
```

### Task 4: Execute integration and release plan

**Files:** Exact files are owned by the integration plan.

**Interfaces:**
- Consumes: all accepted subject tasks.
- Produces: full production coverage, browser evidence, and release-ready builds.

- [ ] **Step 1: Complete integration tests and CSS reconciliation**

Follow `docs/superpowers/plans/2026-09-05-manipulative-integration.md` with fresh Luna
implementers and two-stage review.

- [ ] **Step 2: Run final automated gates**

```sh
npm test
npx tsc -b --pretty false
npm run build
npm run build:single
git diff --check
```

- [ ] **Step 3: Inspect generated artifacts**

```sh
find dist -maxdepth 2 -type f | sort
find dist-single -maxdepth 2 -type f | sort
```

Expected: normal Vite output is complete; `dist-single/index.html` remains the only
self-contained single-build artifact with no external font/script/style resources.

- [ ] **Step 4: Browser-test the real preview**

```sh
npx vite preview --host 127.0.0.1
```

Exercise the exact flows listed in the integration plan at desktop, narrow mobile, and
short-wide sizes. Verify keyboard-only operation and reduced motion.

- [ ] **Step 5: Dispatch independent final Luna reviews**

One reviewer checks curriculum/spec correctness and one checks accessibility/runtime
quality. Neither edits files. Address every Critical/Important finding with a fresh
bounded Luna fix task, re-run relevant gates, and re-review.

- [ ] **Step 6: Inspect final patch and protected paths**

```sh
git status --short
git diff --stat HEAD~1..HEAD
git diff --name-only HEAD~1..HEAD | rg '^src/characters/' && exit 1 || true
git diff --check
```

Expected: no protected character path changed and no unreviewed/unrelated file is staged.
