# Inline voice guide implementation plan

> Execute task-by-task in this worktree with executing-plans and test-driven-development. The user approved the inline design and explicitly asked to implement it; no further design or execution-choice approval is needed.

**Goal:** Make the live subject guide available throughout `reading-u04-l01` and `math-u01-l01`, with lesson/activity context and graceful unavailability.

**Architecture:** Mount one live-only guide alongside the lesson stage renderer, outside the keyed stage animation. A shared, allowlisted context module serves the browser and session gateway. Reuse the proven WebRTC transport, adding context updates, availability reporting and shared audio ownership with read-aloud.

**Tech stack:** Existing React, TypeScript, Vite, browser WebRTC, server fetch; no dependencies.

**Spec:** User-approved design in this task: persistent collapsible guide; existing prototype styling; current lesson and meaningful activity state; short explanations and literal reading only on request; disabled AI when unavailable; no AI on scored Quick Checks. First integrate one complete Reading and one interactive Math lesson.

## Global constraints

- Worktree `/private/tmp/cram-all-voice-tutor`, starting at `e787e48`; preserve the original checkout and existing prototype.
- `HashRouter`, `passThreshold: 8`, `cramall.v1`, canonical IDs, curriculum, characters, and quiz scoring are unchanged.
- No transcript or activity persistence, analytics, answer keys, unsolicited speech, automatic progression, or microphone use before user activation.
- Keep source text available when the guide refers to it; preserve one authored forward action and the activity state while opening/collapsing the panel.
- Retain local adult-review gateway restrictions. Hosting and student launch are separate work; this task does not publish or weaken those restrictions.
- A missing backend/key or provider failure disables live controls. Configuration details stay out of the inline student interface.

## 1. Canonical context and actual activity events

Files: create `scripts/build-inline-tutor-context.mjs`, `src/tutor/inline-manifest.mjs`, `src/tutor/inline-context.mjs`, `src/tutor/inline-context.d.mts`, `src/tutor/inline-context.test.ts`.

Interfaces:
```ts
type GuideSelection = { lessonId: string; stageKey: string; activity?: { value?: number; theme?: string | null; evidenceIds?: string[] } };
function buildInlineContext(selection: GuideSelection): InlineContext; // throws for unknown stages or invalid state
function getInlineLesson(lessonId: string): InlineLesson | undefined;
```
The generated manifest contains lesson identity, guide, intro, blocks, worked steps, source and visible activity targets/choices/quotes only. Math state is a bounded integer; Reading state is selected canonical theme and evidence IDs. No quiz, inline-check answers, evidence support maps or scoring feedback is included.

- [x] Write failing parity/context tests: all six stages per lesson; full source; current 300-valued place chart; selected quotation; reject unknown stage, quiz, invented evidence, oversized/nonfinite values and injected fields.
- [x] Run the focused tests, then implement the shared validator and generate the manifest from authored content.
- [x] Verify parity and absence of assessment fields recursively.

## 2. Live context continuity, availability and audio ownership

Files: modify `server/tutor-api.mjs`, `server/tutor-api.test.mjs`, `src/tutor/realtime.ts`, `src/tutor/realtime.test.ts`; create `src/lesson/audio-focus.ts`; modify `src/lesson/ReadAloudButton.tsx`; create `src/lesson/ReadAloudButton.test.tsx`.

Transport additions: optional `selection: GuideSelection`, `onUnavailable(): void`, `setContext(selection): void`. Existing card/evidence options remain compatible with the standalone prototype. Context updates never generate a reply. On stage change, cancel old speech and mute input before installing the new context; retain the connection and transcript. Ignore cancelled reply fragments and prevent a queued old-stage question from resuming.

- [x] Establish failing tests for canonical inline gateway requests, blocked quiz contexts and cached provider unavailability.
- [x] Implement server-selected guide identity/teaching instructions and bounded failure cooldown. Status checks do not create paid sessions.
- [x] Establish failing transport tests for context changes during generation, before connection readiness, and provider unavailability callbacks.
- [x] Add shared audio ownership; test that read-aloud stops a live speaker and that live activation clears read-aloud UI state.
- [x] Run focused gateway, transport and read-aloud tests.

## 3. Inline lesson experience

Files: create `src/tutor/InlineTutor.tsx`, `src/tutor/inline-tutor.css`, `src/tutor/InlineTutor.test.tsx`, `src/tutor/InlineLesson.test.tsx`; modify `src/lesson/LessonPlayer.tsx`, `src/screens/Home.tsx`; update `docs/prototypes/voice-tutor.md`.

The panel supports Explain this, Another way, Example, Read this, text input, microphone, Stop, End and Collapse. Opening alone starts no session. Collapsing closes voice resources but retains the in-memory transcript; navigating steps updates context without remounting the activity or conversation. Leaving the lesson ends the session. The UI names Winnie or Nutty from canonical lesson identity and preserves the prototype's cream/teal/rounded styling.

- [x] Write failing rendered tests for missing service, opening without connection, successful first request, stage continuity, math/evidence state, source retention, failure disablement, and cleanup on collapse/navigation/page exit.
- [x] Wire the existing lesson-level widget event boundary to a visit-scoped activity snapshot. Accept only current-visit change events. Reset snapshot when the stage is revisited because the existing activity resets on remount.
- [x] Mount the shared panel outside stage animation. Add source reference on Reading stages that do not already display it. Keep desktop panels beside the lesson and mobile expansion in document flow with keyboard focus/return controls.
- [x] Replace the one-lesson detour link with the inline launcher; keep the standalone sample available as a prototype route. Add discoverable links for the two integrated lessons.
- [x] Run adjacent lesson, widget and permanent content tests.

## 4. Verification and review

- [x] Full `npm test`, `npx tsc -b --pretty false`, normal build and single build, artifact/font/key checks, `git diff --check`.
- [x] Real browser: both subjects; intro/card/activity/worked/outro; opening and collapsing preserve activity; Back/Forward; selected evidence and number state; desktop/mobile/short window; normal and single builds; unsupported lesson and Quick Check have no AI panel; missing server disables AI.
- [x] Bounded live checks with the configured key: current-stage explanation, activity-aware follow-up, stage update, Stop and End. Keep microphone muted during synthetic review.
- [x] Request independent scoped review while doing browser checks; resolve actionable findings and record limitations.
- [x] Commit only the exact feature files and leave the worktree/preview ready for review.


## Accepted implementation record

All four tasks are implemented in this worktree. Final gate: 1,109 tests / 120 files, TypeScript, normal and single builds, artifact/credential/font checks, and diff checks passed. Independent code and final UI review are approved. Real browser testing covered the two lesson flows and missing-key behavior; live tests exercised typed questions with audio output, contextual number/evidence answers, stage changes, Stop and End. The application integration is complete for this two-lesson prototype. A live Math number-naming error remains a documented model-quality limitation; student rollout needs a teaching-quality pass and human microphone evaluation. Details and review links are in `docs/prototypes/voice-tutor.md`.
