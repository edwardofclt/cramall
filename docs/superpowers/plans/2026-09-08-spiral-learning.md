# Spiral Learning Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Independent scoped review follows implementation.

**Goal:** Reinforce passed concepts over time and connect them to new learning.

**Architecture:** Add pure review scheduling/selection and a fixed practice session. Integrate optional URL-driven lesson stages, authored unit applications, and persistent invitations through the existing provider and router.

**Tech Stack:** React 18, TypeScript, Zod, Vitest, existing browser-only storage.

**Spec:** `docs/superpowers/specs/2026-09-08-spiral-learning-design.md`

## Global Constraints

Keep `HashRouter`, `passThreshold: 8`, canonical kebab-case IDs, local-only storage under `cramall.v1`, normal-versus-single Google Font behavior, existing earned scores/stars, full Reading sources, truthful Science models, keyboard/touch accessibility and reduced motion. Do not edit `src/characters/**` or generated standards. Worktree `/private/tmp/cram-all-spiral-learning`, branch `codex/spiral-learning`, base `0f1ecd9`.

### Task 1: Review memory and selection

**Files:** Create `src/review/model.ts`, `src/review/selection.ts`, `src/review/review.test.ts`; modify `src/progress/storage.ts`, `src/progress/ProgressContext.tsx`.

**Interfaces:** `ReviewAnswer = {lessonId, conceptTag, questionId, date, correct}`; `reviewKey(lessonId, conceptTag): string`; `recordReview(save, answer): SaveData`; `selectReview(save, subject, today, beforeLessonId?, limit=3): ReviewItem[]`; `dueConceptCount(save, subject, today): number`. A `ReviewItem` owns its lesson, question, and selection reason.

- [x] Write failing tests for old-save compatibility, invalid dates, interval advancement/reset, same-day/backward dates, no mastery changes, prerequisite selection, no future/cross-subject lessons, due priority, multiple lessons and variant rotation.
```ts
const next = recordReview(passedSave, { lessonId, conceptTag, questionId, date: '2026-09-08', correct: true });
expect(next.lessons).toEqual(passedSave.lessons);
expect(importSave(exportSave(next))).toEqual(next);
```
- [x] Run `npm test -- src/review/review.test.ts` and confirm missing behavior.
- [x] Implement schemas, pure transitions, selection and provider action; run focused and existing progress tests.

### Task 2: Authored connections

**Files:** Create `src/review/connections.ts`, `src/review/connections.test.ts`.

**Interfaces:** `UnitConnection = {unitId, foundation, question, source?}`; `connectionForLesson(subject, lesson): UnitConnection | undefined` returns only the terminal lesson's application.

- [x] Write a failing registered-unit coverage test and a test for terminal lesson attachment and full Reading source presence.
```ts
for (const subject of SUBJECTS) for (const unit of subject.units) {
  expect(connectionForLesson(subject, unit.lessons.slice(-1)[0]!)).toBeDefined();
}
```
- [x] Run the focused test and confirm missing coverage.
- [x] Author 31 original unit applications (12 Math, 11 Reading, 8 Science), with defensible answers, explanation of the knowledge connection, complete Reading snippets and truthful Science wording. Validate using the existing QuestionSchema and semantic checks.

### Task 3: Integrated practice

**Files:** Create `src/review/ReviewSession.tsx`, `ReviewSource.tsx`, `SpiralLesson.tsx`, `ReviewScreen.tsx`, `ReviewInvitation.tsx`, `review.css`, `ReviewFlow.test.tsx`; modify `src/lesson/LessonPlayer.tsx`, `src/quiz/QuestionCard.tsx`, `src/App.tsx`, `src/screens/Home.tsx`, `src/screens/SubjectMap.tsx`.

**Interfaces:** `LessonPlayer` accepts optional recall/connect stage render callbacks `(onDone: () => void) => ReactNode`; `QuestionCard` accepts optional `nextLabel`; `ReviewSession` accepts a fixed array of ReviewItem plus onDone. Connect it has a separate single-question UI using the same source display and feedback.

- [x] Write failing user-flow tests for warmup entry, direct stage preservation, source-before-question, immediate feedback/review link, one advance, persistence, standalone completed-subject review and connection completion.
```ts
expect(screen.getByRole('heading', {name: 'Warm up your memory'})).toBeVisible();
expect(screen.getByRole('region', {name: /Source/})).toBeVisible();
```
- [x] Run focused tests to confirm absent behavior.
- [x] Implement fixed sessions and optional stages, then invitations/routes; retain one forward control at a time. Run adjacent LessonPlayer, QuickCheck, progress and screen tests.

### Task 4: Verify and publish for review

**Files:** Update `README.md` and this plan with observed evidence.

- [x] Run `npm test`, `npx tsc -b --pretty false`, `npm run build`, `npm run build:single`, `git diff --check`.
- [x] Inspect both artifacts and browser-test normal/single builds, memory warmup, missed answer, source panel, refresh/history, saved review state, completed subject, desktop/mobile overflow and reduced motion.
- [x] Request independent scoped review, fix findings with focused evidence, and rerun affected gates.
- [x] Stage exact changed paths, inspect staged names, commit, push `codex/spiral-learning`, open a PR explaining behavior and validation. No merge.

## Completion evidence

Implemented at source commit `b380afb`. Final gates: 1,182 tests, clean TypeScript, standards parity, normal/single builds and artifact checks. Browser checks and independent review are approved; see the verification report. [Pull request #3](https://github.com/edwardofclt/cramall/pull/3) is open against `main`. The worktree is retained for review feedback.
