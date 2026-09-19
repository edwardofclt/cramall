# Inline lesson guide rollout

The user approved the inline guide design and requested implementation. Extend the reviewed two-lesson prototype onto released curriculum commit `15ab273`, in `codex/inline-lesson-guides`.

## Behavior

- Keep the existing cream/teal guide panel, on-demand explanations, typed questions, optional microphone, and explicit reading action. Offer Nutty, Winnie, Sandy, or Pip throughout every lesson's intro, cards, worked example, and reflection.
- Derive context from the registered curriculum and the existing safe widget speech projection. Include complete current source material; exclude quizzes, inline-check answers, grading relationships, and feedback keys.
- Preserve the prototype's real place-value and theme selections. Add canonical Social Studies placements. Other activities supply their teaching materials without claiming to see unreported learner state.
- Keep one session across steps; stop speech/microphone on navigation, close on leaving the lesson, and retain conversation only in memory. Quick Checks have no guide.
- Keep keys on the local Node gateway, retain explicit adult configuration, and disable the student feature quietly when configuration or service is unavailable. Static builds continue working without a voice backend.

## Implementation and validation

1. Recover the committed prototype into a clean managed worktree based on the released app. Baseline: 1,319 tests passed before merging.
2. Establish failing curriculum-wide context and integration tests. Add a typed safe projection and regenerate the server/browser manifest from all registered lessons. Wire source and supported activity updates into the lesson player.
3. Remove pilot-only Home links; document optional configuration and generated-context maintenance. Add Science and Social Studies teaching boundaries.
4. Run focused and permanent tests, full tests, TypeScript, standards parity, and normal/single builds. Browser-check all four guides and disabled service behavior at desktop/mobile widths. Use transport mocks for available-service behavior; a live paid call requires an available server key.
5. Request an independent scoped review, resolve findings, and commit the integration in this worktree.

Primary edit scope: `src/tutor/`, `src/lesson/LessonPlayer.tsx`, `server/tutor-api*`, context generation script, `src/screens/Home.tsx`, package scripts, README, environment example, and this plan. Preserve released characters, curriculum, widgets, scoring, progress, routing, and unrelated work.

## Completed verification — September 19

- Context tests first failed for the 117 unsupported lessons, missing activity materials, and new source/placement cases. Integration tests exposed the two-lesson default state assumption; implementation now initializes only supported snapshots and validates real placement events.
- Generated parity covers 119 lessons and 714 stages. Current source selection distinguishes workshop passages from worked-example passages. Reading's shared-source carryover applies only where the activity and worked example have identical text.
- Existing lesson tests now scope character assertions to the lesson stage because the optional launcher adds another instance of that character. Fixtures with unregistered stage IDs gracefully omit the guide.
- Focused and adjacent gate: 404/404 tests. Full gate: 1,532/1,532 tests in 149 files. TypeScript, standards parity, normal build, and single-file build passed. Build inspection confirmed normal Google Fonts, no remote font links or external script dependencies in the single-file artifact, and no server-key configuration or test credential in browser bundles. Vite retains its large-chunk advisory.
- Real normal-build browser checks covered disabled service, continued lesson navigation, guide absence in a scored check, Back/history and refresh, and visible complete Reading/Social Studies sources. The self-contained build rendered correctly with no gateway and a disabled guide.
- A separate local availability-only fixture exercised the actual built guide panel for Nutty, Winnie, Sandy, and Pip without connecting to OpenAI. Desktop, 390px phone, and 1366×480 short-window checks confirmed reachable controls, no horizontal overflow, source retention, focus on opening, keyboard closing, and mobile return/jump controls. The fixture is not part of the delivered app.
- Independent scoped review: **APPROVED**, no actionable findings; reviewer independently passed 154 context/gateway tests.
- No key is configured in the new worktree, so live model speech was not retested. The inherited microphone-permission requirement and documented Math teaching-quality limitation remain; neither is presented as newly validated.

The recovered prototype and rollout are kept in the durable managed worktree `/Users/eherbert/.codex/worktrees/inline-lesson-guides/cram-all`. The original checkout and running prototype preview were preserved.
