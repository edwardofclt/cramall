# Winnie's conversational tutor prototype

Isolated worktree: `/private/tmp/cram-all-voice-tutor`

Branch: `codex/voice-tutor-prototype`

Base: `0f1ecd9` (the last committed app). Concurrent uncommitted curriculum and activity work in the original checkout is untouched.

## Try it

Open `http://127.0.0.1:4188/#/tutor` while the preview is running. The home page also links to the preview. The theme lesson's three learn cards link to their matching tutor focus.

1. Click **Explain this**. Winnie briefly teaches the concept without reading the story.
2. Try **Say it another way** or **Give me an example**.
3. Select a quotation in **Your evidence**, then ask **Does my evidence fit?**
4. Ask **Why isn't gardening a theme?**, or **I don't understand**.
5. Use **Read the story** only when you want the complete text spoken.

The sample uses prepared, lesson-specific replies and the device's available speech voice. It does not listen to a microphone or call OpenAI. Unsupported questions get an explicit sample-limit explanation. This is an interaction preview, not evidence of live model quality.

The complete source stays available. On desktop it has a labeled scroll pane; on mobile it follows the document, with a **Talk with Winnie** shortcut to reach the conversation. Source selection highlights the corresponding quotation. Changing concept focus resets the conversation and closes voice resources. Focus is URL-driven and works with browser Back/Forward. Conversation and evidence are in memory only; this feature never writes learner progress or grades work.

## Run locally

From this worktree:

```sh
npm install
npm run build
npx vite preview --host 127.0.0.1 --port 4188 --strictPort
```

During this task, dependencies are linked to the original checkout's `node_modules`. A fresh checkout can use `npm install`. Both normal and single-file static builds include sample mode. Live mode requires the local Vite development or preview server; a static file by itself does not provide the session gateway.

## Enable an adult live review

Create an ignored `.env.local` file in this worktree, then restart Vite:

```dotenv
OPENAI_API_KEY=your-server-side-key
TUTOR_ADULT_REVIEW=true
TUTOR_REALTIME_MODEL=gpt-realtime-2.1-mini
```

Never use a `VITE_` variable for the API key. The key is read by the Node middleware only. Select **Live voice · Adult review**, then **Explain this**. The browser asks for microphone permission but starts with audio input muted. Use **Turn microphone on** to ask spoken questions; turn it off to return to typing. **Stop speaking** interrupts a reply; **End session** closes the whole conversation.

If the preview says **Live voice needs API credit**, check [OpenAI API billing](https://platform.openai.com/settings/organization/billing/overview). A configured key and model access do not guarantee available API credit. After adding credit, retry **Explain this**; no code change or new key is needed. The gateway recognizes the provider's explicit exhausted-credit error without exposing its raw error body.

Live voice sends microphone audio when enabled, typed questions, the current focus, the complete lesson passage, and selected evidence to OpenAI. This prototype does not save the transcript or audio to Cram All storage and does not enable Realtime tracing. OpenAI's own data handling is separate from application storage.

The gateway accepts loopback clients and same-origin requests only. It uses canonical lesson data rather than arbitrary supplied instructions, limits request sizes, allows two active sessions, and allows twelve starts per hour per server process. Responses are limited to 4,096 output tokens, allowing audio and transcript space for the full story; instructions still request short explanations. Incomplete responses produce an explicit error. Client and server both end sessions after five minutes; provider hangup is a best-effort network operation. These controls are prototype usage guards, not a dollar spending guarantee. Restarting the server resets rate limits.

This is **adult testing only**, not a student deployment. OpenAI's under-18 guidance requires Zero Data Retention before processing personal data of children under 13, and the setting requires OpenAI approval. The environment flag only acknowledges adult review; it does not enable ZDR, parental consent, moderation, or production authentication. Before student use, resolve those requirements and evaluate real lesson relevance, age-appropriate responses, misunderstandings, interruption behavior and accessibility.

Official implementation references, checked September 8, 2026:

- [Realtime with WebRTC](https://developers.openai.com/api/docs/guides/realtime-webrtc)
- [Realtime conversations and events](https://developers.openai.com/api/docs/guides/realtime-conversations)
- [Audio token accounting and costs](https://developers.openai.com/api/docs/guides/realtime-costs)
- [Provider hangup](https://developers.openai.com/api/reference/typescript/resources/realtime/subresources/calls/methods/hangup)
- [Under-18 guidance](https://developers.openai.com/api/docs/guides/safety-checks/under-18-api-guidance)
- [Data controls](https://developers.openai.com/api/docs/guides/your-data)

## Scope and verification

Only `reading-u04-l01` is supported. `src/tutor/lesson-context.json` is a minimal snapshot of its source, concepts and selectable quotations, with a parity test against the authored lesson. It contains no quiz or inline-check answer keys. It must be regenerated deliberately if the lesson changes. Character art, standards, curriculum, assessment and progress rules are unchanged.

Pre-change baseline: **1,022 tests / 110 files passed**, including 103 focused lesson-player/content-validation tests. New focused checks cover the grounded sample, source parity, typed interaction, speech lifecycle, WebRTC resource cleanup, gateway authorization, request validation, creation races and timed hangup.

The initial prototype verification used no OpenAI API key. The later live review below verifies real model responses and voice playback through the browser. Spoken microphone input, acoustic quality, voice-triggered interruption and actual API charges remain unverified. Automated transport tests use controlled browser/network substitutes.

### Final verification — September 8, 2026

- **1,071 tests / 116 files passed**, including 49 new focused checks. TypeScript and `git diff --check` passed.
- Normal and self-contained builds passed. Single HTML: 6,565.71 kB (3,991.39 kB gzip). Artifact inspection confirmed inline script/style delivery, no external scripts or Google Fonts in the single build, preserved Google Fonts in the normal build, and no server credential configuration in client bundles. The existing Vite large-chunk advisory remains.
- Real browser checks in both builds: explanation, alternate explanation, complete reading only when requested, typed questions, explicit non-reading requests, selected-evidence coaching, speech playback and Stop, focus Back/Forward/refresh, and round-trip links to the matching lesson card. The speech check verifies browser playback state and interruption, not acoustic quality.
- Layout checks: desktop 1280×720, short desktop 1280×500, mobile 390×844 and 320×568. No horizontal overflow; source remains available; visible action buttons meet 44px minimum height. Keyboard submission and the mobile focus shortcut worked. Browser logs contained no errors or warnings. Native reduced-motion emulation was unavailable; the new CSS explicitly disables animation/transitions under the preference, and existing Character rendering uses the shared motion contract.
- Independent scoped review: **APPROVED for the local adult-review prototype**. Review findings were resolved with failing-then-passing regressions for pre-acknowledgement Stop/replacement, failed SDP handoff cleanup, incomplete response reporting, and affirmative sample reading intent. Additional checks cover cached-page return, mode-change cleanup and retry after failed setup.
- An earlier full run concurrent with a build encountered two existing lesson-animation timing failures. Both focused rerun and two subsequent full runs passed without changes to those tests or animation behavior.

Morning review: use the five-step walkthrough above in sample mode. To evaluate actual AI behavior, configure the server key and adult-review flag, restart the local preview, then try spoken misunderstandings, rapid interruption, selected-evidence follow-ups and complete-story reading. The implementation is preserved on `codex/voice-tutor-prototype`; it has not been merged or published.

### Live setup follow-up

The configured model's access check succeeded. A real browser session request reached OpenAI; the initial live attempt encountered the provider's exhausted-credit response. The new message was verified in the rendered preview. Focused gateway, transport and live-control tests passed (31 tests), followed by the full suite (1,073 tests / 116 files), TypeScript, normal build and diff checks. This follow-up changes only server error handling and documentation; client artifacts and teaching behavior are unchanged.

### Live conversation review — September 8, 2026

After billing setup, one real OpenAI Realtime session completed the following browser checks using typed requests with audio output. The microphone remained muted throughout.

| Request or action | Observed result |
| --- | --- |
| Explain this | Winnie explained topic versus theme, connected the idea to Mateo's choice, and offered an invented example without reading the source. |
| Stop speaking | Playback status returned to Ready and a follow-up request worked in the same session. |
| “I still don't get it. Can you use a simpler example?” | Winnie rephrased the topic/theme distinction in simpler words and asked one question. |
| Select the straight-garden-rows quote; ask whether it supports reciprocal help | Winnie correctly distinguished planning from helping and directed the learner toward character actions showing cooperation. |
| Read the story | The complete live transcript exactly matched the visible title and all three source paragraphs. Playback finished normally. |
| End session | The app showed Session ended, microphone off, and disabled the microphone control. |

These are initial adult-review observations, not a student-readiness evaluation. The three explanations were 90, 66 and 79 words, so the short-response instruction is a target rather than an enforced limit. The confusion reply mostly rephrased the original concept and introduced an abstract question about generosity; a future teaching-quality pass should push for a more concrete new example. The evidence reply also inferred how the learner was interpreting the quote, which should be made less presumptive. Spoken input and acoustic quality still need a person to test with **Turn microphone on**. The live preview remains available; click **Explain this** to start a fresh session.
