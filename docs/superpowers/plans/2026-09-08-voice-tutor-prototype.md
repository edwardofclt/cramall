# Conversational voice tutor prototype

> Execute inline with the executing-plans and test-driven-development skills. The user approved the conversational tutor flow, requested an isolated worktree, and explicitly authorized autonomous completion for morning review.

**Goal:** Let an adult try Winnie's concept explanations and lesson-aware follow-ups, with optional literal reading.

**Architecture:** A dedicated `/tutor` HashRouter screen uses one canonical lesson, `reading-u04-l01`. Its complete source remains visible beside a conversation. A clearly labeled local sample mode works without credentials. An opt-in OpenAI Realtime connection uses a loopback-only Vite middleware for server-side credentials and canonical lesson instructions. The prototype does not alter assessment, content, characters, or progress.

**Tech stack:** Existing React/TypeScript/Vite, browser speech synthesis for sample replies, browser WebRTC for live audio, Node fetch for session setup. No added dependencies.

**Design:** Approved conversation in this task: explain briefly in Grade 4 language; use one concrete example; invite one response; simplify or change examples based on the response; read the source only on request. Current source and selected evidence accompany live questions. Sample replies are explicitly described as samples, never as live AI. Prototype live use is adult-only; a server environment flag enables it after the operator acknowledges that restriction. The under-13 ZDR prerequisite remains a deployment condition.

## Boundaries

- Base is `0f1ecd9`; concurrent uncommitted work in the original checkout is not copied, staged, or modified.
- Keep `HashRouter`, `passThreshold: 8`, `cramall.v1`, generated standards and font behavior unchanged.
- No transcript, audio, or activity state persistence. No grading, fluency assessment, or claims of observing the learner.
- Sample mode requires no microphone; live mode clearly identifies OpenAI and asks for microphone permission only after explicit start.
- Stop, route changes, mode changes, errors and session timeout release microphone, audio, connections and timers.
- Source text stays visible while evidence is selected. Tutor actions are independent of lesson navigation and introduce no second Next.
- Local prototype only; no public hosting, auth system, child launch, or production readiness claim.

## Tasks and exact scope

1. **Grounding and local sample behavior** — create `src/tutor/lesson-context.json`, `context.ts`, `demo.ts` and focused tests. Pin the snapshot to the authored lesson in a parity test; include no quiz or inline-check answer keys. Test question routing, changed explanations, evidence-based coaching, explicit reading, and honest unknown-question fallback. Context derives selected evidence from IDs, never arbitrary client text.
2. **Server connection** — create `server/tutor-api.mjs` and tests; modify `vite.config.ts`. Test absent credentials, adult-review flag, origin/host checks, body limits, invalid card/evidence IDs, session limits, canonical upstream requests, sanitized failures and session teardown. Use `/api/tutor/status`, `/api/tutor/session`, `/api/tutor/close`; credentials remain server-side.
3. **Interactive tutor** — create `src/tutor/TutorPage.tsx`, `tutor.css`, `realtime.ts` and tests; add `/tutor` in `src/App.tsx`, add a small preview link in `src/screens/Home.tsx`, and link the three supported learn cards from `src/lesson/LessonPlayer.tsx` to their matching focus. Test visible source, no autoplay on entry, explanation vs reading, typed follow-up, evidence selection, URL-driven focus changes, speech and transport cleanup, live errors, and return to lesson. WebRTC tests replace external browser/network boundaries, not the session state machine.
4. **Review and handoff** — create `docs/prototypes/voice-tutor.md`; run focused tests, full `npm test`, TypeScript, both builds, artifact checks and real-browser desktop/mobile/history checks. Obtain an independent scoped code review while performing browser checks. Address findings, record live verification limitations, and leave the preview open.

## Verification record

- Pre-change focused baseline: 103 tests passed (lesson player + content validation).
- Full baseline and final evidence are recorded in `docs/prototypes/voice-tutor.md`.
- Tasks 1–4 completed. Final gate: 1,071 tests / 116 files, TypeScript, normal and single builds, artifact and real-browser checks. Independent review approved the local adult-review prototype. Actual OpenAI conversation quality remains unverified without credentials.
