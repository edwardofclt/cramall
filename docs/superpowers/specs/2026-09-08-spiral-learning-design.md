# Cumulative learning and delayed review

The student should retain earlier ideas and use them as later concepts are introduced. The user authorized the recommended cumulative review approach, requested a separate worktree, and then explicitly authorized independent completion and a pull request. This specification records implementation decisions within that authorization.

## Learning experience

1. Before an eligible lesson's introduction, show **Warm up your memory**: up to three questions from passed, earlier lessons in the same subject. Include a relevant prerequisite and a spread of other older concepts, prioritizing due or previously missed material. New learners proceed directly into their first introduction. Explicit stage/review links still open their requested stage.
2. At each unit's final lesson, after its worked example, show **Connect it**: an authored application that combines that unit's learning with a foundation, followed by an explanation. Keep every referenced Reading source visible before and during its question. These questions are practice, with immediate feedback and no mastery claim.
3. Put **Keep it growing** above the subject map, showing due concepts and a three-question mixed-review entry point. Retain access after every lesson is passed. Show a home-screen count so a completed subject still invites review.
4. Wrong answers reveal an explanation and a link to the exact source card. Review links open separately so learners retain their place. End sessions with factual feedback and a path back to their lesson or subject. No scores, stars, or perfect-retention promises for review.

## Scheduling and persistence

Store an optional concept-review record in the existing `cramall.v1` save. A record is keyed by lesson ID plus concept tag; it includes the last review date, question ID, outcome, and interval level. An optional last-answer date preserves the latest actual observation when early practice rotates a question without moving the scheduling date. Dates use the local calendar, with calendar arithmetic independent of DST. Initial reviews become due one day after a lesson's latest Quick Check attempt. Successful review on later days advances intervals through 1, 3, 7, 14, and 30 days; incorrect recall returns to one day. Same-day repetitions cannot advance an interval; clock rollback cannot overwrite later evidence. A later same-day Quick Check miss brings its concept back the next day; early practice after a newer quiz preserves that quiz’s effective baseline rather than reviving an older review interval. These intervals are transparent product defaults, not a guarantee of retention or a claim of an optimal schedule.

Keep lesson passThreshold 8, lesson stars, Quick Checks, readiness, parent checkmarks, and existing streak semantics intact. The additive review data survives export/import and refresh; legacy saves need no new fields. Reset clears it. Invalid review data fails strict import validation. Widgets do not write review progress. Review only records evidence for passed lessons; an import/reset during a run cannot recreate passed state.

## Architecture

- `src/review/model.ts`: validated review records and date/interval transitions.
- `src/review/selection.ts`: deterministic, pure concept selection and source ownership; passed lessons only, same-subject, earlier-than-current warmups; no duplicate concepts/questions per run, prefer different lessons and rotate question variants.
- `src/review/connections.ts`: original unit application prompts, source snippets, and explanations. Catalog validation covers every registered unit's terminal lesson.
- `src/review/ReviewSession.tsx`: fixed session snapshot, QuestionCard feedback, owned source panels, per-answer persistence, guarded advance, and completion.
- `src/review/SpiralLesson.tsx`: curriculum-aware integration around the generic LessonPlayer. Extra recall/connect stages are URL-driven; existing direct intro/card/worked/outro links remain valid.
- `src/review/ReviewScreen.tsx`, `ReviewInvitation.tsx`: standalone sessions and navigation.
- Extend storage/context, route registration, optional lesson stages, and QuestionCard's final action label through small typed interfaces.

All review screens use existing accessible controls, text/status cues, keyboard operation, optional read-aloud and reduced-motion behavior. Normal versus single-file Google Font behavior and HashRouter remain unchanged. Registered-curriculum selection avoids hardcoded subject counts; authored connection coverage must be extended alongside future units. The worktree starts at 0f1ecd9; concurrent uncommitted Social Studies/activity work is outside this PR.

## Verification

Use focused failing tests before implementation for schedule transitions, selection, save round trips and invalid imports, Reading source ownership, frozen sessions, route history, completion, feedback, reset and duplicate-event protection. Run adjacent tests, full suite, TypeScript, normal/single builds, artifact inspection and real browser desktop/mobile flows. Obtain independent scoped review and resolve findings before opening the PR.
