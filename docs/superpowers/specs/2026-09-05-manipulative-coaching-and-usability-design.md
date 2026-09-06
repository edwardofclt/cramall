# Manipulative Coaching and Usability Design

**Date:** 2026-09-05
**Status:** Approved for implementation
**Scope:** Hybrid improvement of every manipulative used by the current lesson catalog

## 1. Purpose

Cram All's manipulatives must help a Grade 4 learner use the idea taught on the current
learn card, not merely operate controls. This project adds subject-guide coaching inside
the widget-bearing lesson step and repairs manipulatives that currently hide their goal,
reveal an answer, omit required source material, or perform a materially different task
from the lesson.

The approved experience is:

1. the learn-card explanation and source material remain visible;
2. a two- or three-line guide/kid conversation immediately introduces the activity;
3. the learner manipulates the activity;
4. the guide reacts only to meaningful actions, never elapsed time; and
5. completion feedback explicitly connects the learner's action to the lesson idea.

This is a hybrid improvement, not a cosmetic coaching overlay and not a rebuild of every
widget as a mini-game. Every P0/P1 audit finding is in scope. P2 polish is included when
it materially improves comprehension, tactility, or enjoyment.

## 2. Non-goals and preserved boundaries

- Do not modify `src/characters/**`. The project reuses the public `Character` and
  `DialoguePlayer` behavior while preserving that protected boundary.
- Do not change the subject guides or their identities.
- Do not change `HashRouter`, `passThreshold: 8`, canonical IDs, or local-only progress.
- Widget and coaching state remain ephemeral. They do not write storage, scoring,
  analytics, readiness, stars, streaks, or unlocks.
- Do not add timers, pressure, punitive language, sound requirements, recording, voice
  scoring, or claims of live partners.
- Do not treat Science models as physical evidence. Observable screen changes represent
  predictions/models; energy remains an inference from observable effects.
- Do not hand-edit generated standards files.
- Unreferenced library widgets do not receive speculative visual rebuilds, although
  shared contracts and regressions must continue to cover all 35 registered types.

## 3. Coaching content model

### 3.1 Learn-card field

Add an optional strict `widgetCoach` object to `LearnCardSchema`. It is valid only when
the same card contains `widget`.

```ts
type WidgetCoach = {
  intro: Array<{
    speaker: 'guide' | 'kid';
    text: string;
    pose?: 'idle' | 'talk' | 'think' | 'cheer' | 'oops';
  }>;
  reactions: {
    strategy?: { text: string; pose?: Pose };
    retry?: { text: string; pose?: Pose };
    milestone?: { text: string; pose?: Pose };
    complete: { text: string; pose?: Pose };
  };
};
```

Rules:

- `intro` contains two or three non-empty lines.
- A `kid` line cannot carry a guide pose.
- `reactions.complete` is required; other reactions are optional when the widget has no
  honest trigger for that category.
- Every widget-bearing card in authored production content must provide `widgetCoach`.
- A content validation test rejects `widgetCoach` without `widget` and widget cards
  without coaching.
- Abstract `guide` speakers are resolved from `subject.guide` at render time, preventing
  a Math card from accidentally showing Winnie or Sandy.
- Existing general card `dialogue` remains valid on cards without widgets. Validation
  rejects simultaneous non-empty `dialogue` and `widgetCoach.intro` on a widget-bearing
  card; authored widget introductions use only `widgetCoach.intro`.

### 3.2 Semantic coaching event

Preserve every existing typed `interaction`, `change`, and `complete` event. Extend the
shared widget event type with:

```ts
type WidgetCoachEvent = {
  type: 'coach';
  cue: 'strategy' | 'retry' | 'milestone';
};
```

The widget, which owns the relevant state and correctness logic, emits this event only
when a meaningful learning condition is known. `complete` remains the universal
completion cue. The event contains no authored prose and no persistence behavior.

Examples:

- changing multiple conditions in a fair-test activity can emit `strategy`;
- submitting an incorrect prediction can emit `retry`;
- reaching a useful intermediate representation can emit `milestone`;
- a latched successful result emits the existing `complete` event.

## 4. Coaching runtime and interaction

Create a lesson-layer coaching component between `LearnCard` and `WidgetFrame`.

### 4.1 Introduction state

- The card heading, rich blocks, source passage/snippet, and callouts remain visible.
- The guide conversation appears immediately before the manipulative, not before the
  lesson and not above the lesson material.
- The manipulative remains visually previewed, but it is inert and excluded from the
  accessibility tree and focus order until the introduction ends.
- The conversation owns exactly one visible forward `Next` action at a time. The normal
  lesson-stage Next is hidden while it is active.
- The final introduction action says `Try it` and activates the manipulative.
- Revisiting the card replays the short introduction. This supports quiz review links
  and retains the existing stage-visit dialogue model.

### 4.2 Active coaching state

- The subject guide collapses into a compact coach adjacent to the manipulative.
- On wide layouts the guide/bubble sits at a corner without covering controls, data,
  source text, or status feedback. On narrow/high-zoom layouts it becomes a strip above
  the manipulative.
- Reactions are non-modal and never steal focus.
- Each cue category appears at most once per card visit. A later meaningful cue replaces
  the current message; no queue grows while the learner acts quickly.
- Messages remain until the next meaningful cue or a learner dismissal. No message
  appears or disappears because of elapsed time.
- Completion uses a positive guide pose and names the reasoning demonstrated. It does
  not imply the lesson or quiz is complete.

### 4.3 Accessibility

- New dialogue and reactions have visible text and polite live announcements.
- Character art is redundant inside the live coaching status and is hidden from the
  accessibility tree at that location to avoid repetitive guide-name announcements.
- Controls remain at least 44 by 44 CSS pixels.
- Keyboard users can complete every activity using named controls; drag behavior, when
  retained or added, always has button/tap alternatives.
- The `Try it` control retains focus after activation; the learner's next Tab enters the
  activity in document order.
- Reduced motion removes transitions and decorative motion while presenting the same
  final states, text, and completion opportunity.
- Coaching never relies on color, pose, animation, or geometry as its only cue.

### 4.4 Failure behavior

- A card without valid coaching data cannot enter production because content validation
  fails. Defensive runtime handling renders the widget normally if data is absent.
- An unknown/unavailable cue is ignored without breaking the activity.
- Existing lazy loading, Suspense fallback, keyed error boundary, and friendly napping
  widget remain intact.
- A crashing widget cannot trap the learner behind an unfinished coaching state; the
  lesson-stage Next becomes available after the introduction.

## 5. Manipulative repair scope

### 5.1 Math

Every target-driven activity must visibly state or depict its goal/source data.

- **Fractions, money, ruler, arrays, and data plots:** show the target, endpoint, factor
  goal, or source dataset instead of requiring guessing.
- **Elapsed time:** replace the immediate answer with a learner-controlled start clock
  and friendly 5/10/15-minute jumps, retain a jump list, and check the end time.
- **Shape classification:** migrate lesson content from property-count text boxes to the
  canonical diagram/multi-membership branch so a square belongs to every valid parent
  class.
- **Arrays:** add factor-hunt and division/grouping modes where the lesson requires them;
  retain discovered factor pairs and represent dividend, divisor, quotient, and
  remainder honestly.
- **Area models:** let learners decompose factors and reveal partial products
  progressively; use proportional regions or unit-square arrays when area is taught.
- **Fractions:** support side-by-side equivalence, multi-whole/improper amounts,
  join/remove states, and fair-sharing modes used by current lessons.
- **Number lines:** align authored magnitudes with the lesson, preserve requested
  tenths/hundredths labels such as `10/100`, add relevant landmarks, and give
  equality-specific feedback.
- **Balance:** do not print the numerical relation before the learner decides it; allow
  construction where the lesson teaches equivalence.
- **Data plots:** include choosing/confirming appropriate display decisions, labels,
  scale, and baseline before construction.
- **Probability:** add a prediction and sample-space/event classification around trials;
  do not make one result or trial count the concept.
- **Money:** use recognizable non-color coin/bill silhouettes and show denomination
  subtotals.

Reference strengths to preserve include the place-value builder's immediate multiple
representations, number-line dual controls, spinner reduced-motion parity, and the
canonical shape diagrams.

### 5.2 Reading

Every evidence-dependent interaction keeps its complete applicable source visible.

- **Story elements:** add the complete authored source passage/snippet to config and
  render it persistently. Replace one-secret-string grading with evidence IDs, structured
  choices, or multiple normalized accepted responses.
- **Source credibility:** model expertise, publisher/accountability, evidence/citations,
  currency/relevance, and purpose/bias as strengths and gaps. Require a judgment plus
  selected reasons; use `credible for this question` versus `needs more checking`.
- **Summaries:** require essential supporting details and a short learner composition;
  selected sentences are planning material, not the completed summary.
- **Context clues:** do not reveal clue type in the choice label before commitment.
  Select the clue first, then classify or reveal its type.
- **Theme and central idea:** add a short complete source passage and anchored evidence
  sentences instead of isolated detail fragments.
- **Text structure and figurative language:** author the categories available for the
  exact card rather than showing global bins not yet taught.
- **Feedback:** identify one relationship to reconsider after a committed miss without
  disclosing the answer or encouraging blind trial-and-error.
- **Tactile metaphors:** use snapping morpheme tiles, evidence/claim boards, story cards
  on a plot path, a concise-summary strip, and criterion stamps where these metaphors
  improve understanding.
- **Read aloud:** include source passages and activity text, not only the surrounding
  learn-card blocks.

### 5.3 Science

All activities preserve model/evidence boundaries and expose observable response.

- **Collision:** use a predict-then-run interaction with visible before/after motion.
  Lock or clearly designate controlled variables for a fair comparison and render the
  same final result without motion under reduced-motion preferences.
- **Topographic maps:** add plotted coordinates and symbol groups so learners identify
  bands/clusters from the map rather than choose between two printed elevations.
- **Erosion:** require matched bare/covered runs and a comparison/prediction before
  completion. Show meaningful particle/channel differences while labeling them as model
  output.
- **Light:** teach and manipulate the source-to-object-to-eye path rather than guessing
  an undisclosed exact angle.
- **Waves:** visibly state any target and connect amplitude/frequency changes to the
  plotted model without claiming unsupported measurements.
- **Energy conversions:** include the material, cost, time, and safety constraints taught
  by the card when selecting a solution chain.
- **Resources:** align categories and follow-up reasoning with the current lesson's uses
  and effects.
- **Hazards:** show strengths, impacts, and limits; grade a reasoned plan rather than a
  hidden exact set of solution names.
- **Energy transfer, animal structures, messages, and rock layers:** add enough choices,
  comparison, connected-system reasoning, and observable response to avoid one-path rote
  completion.

## 6. Visual and motion language

Entertainment serves the learning action:

- objects visibly move, assemble, regroup, connect, stamp, clip, or populate a model;
- prediction creates anticipation before a reveal;
- intermediate states remain inspectable rather than immediately disappearing;
- successful completion uses a brief guide pose/state and restrained accent motion;
- incorrect attempts use gentle, specific coaching without shaking or punitive effects;
- controls and status remain legible at 200% zoom and narrow mobile widths.

Decorative motion must never delay input or be required to infer the result.

## 7. Implementation boundaries and agent ownership

Implementation proceeds in dependency order:

1. **Shared foundation:** schema, event union, coaching frame, lesson integration,
   content-validation contract, shared CSS, and integration tests.
2. **Subject waves:** Math, Reading, and Science run in parallel only after the shared
   interfaces are stable. Each owns `src/widgets/<subject>/**`,
   `src/content/<subject>/**`, and subject-specific CSS/test additions assigned by the
   executable plan.
3. **Integration hardening:** shared CSS reconciliation, catalog validation, cross-subject
   tests, responsive browser testing, and both build modes.
4. **Independent review/fix:** scoped reviewers inspect correctness, curriculum
   alignment, accessibility, and regressions; findings receive focused fix rounds.

All delegated implementation and review agents use `gpt-5.6-luna` as requested. The
controller remains responsible for file-scope enforcement, shared-interface decisions,
diff review, integration, and final gates.

No agent uses broad staging, cleans the worktree, edits `src/characters/**`, or modifies
another subject's files without a controller-approved follow-up.

## 8. Test strategy and release gates

Use TDD for each behavior change: establish a focused failing test, make the smallest
coherent implementation, then run focused and adjacent permanent tests.

Required automated coverage:

- strict `widgetCoach` schema and cross-field validation;
- production coverage for every widget-bearing card;
- guide resolution from subject context;
- exactly one forward action during the in-step introduction;
- widget inert/focus behavior before `Try it`;
- one-shot action-based reactions with no timer dependency;
- completion coaching and card-visit reset;
- absence of storage/progress writes;
- unknown-cue and widget-crash fallbacks;
- all modified widget mathematics/content logic;
- Reading source visibility and accepted-response behavior;
- Science model/evidence language and reduced-motion final-state parity;
- keyboard completion and named groups/statuses;
- high-zoom/narrow-layout CSS contracts;
- exact catalog/registry and strict-config coverage for all 35 types.

Baseline release commands:

```sh
npm test
npx tsc -b --pretty false
npm run build
npm run build:single
git diff --check
```

Browser acceptance uses the real Vite preview rather than opening `dist/index.html`.
Test at least one representative repaired widget per subject plus every structurally
distinct P0 repair. Verify desktop, narrow mobile, short-wide viewport, keyboard-only
operation, reduced motion, lesson Back/Forward/revisit behavior, coaching/live status,
widget error fallback, and both normal and single-file builds.

## 9. Acceptance criteria

The project is complete when:

1. every currently authored widget-bearing lesson card has an in-step subject-guide
   introduction and a completion connection;
2. reactive coaching is meaningful-action-only and one-shot per category/card visit;
3. every audit P0/P1 issue listed in this design is addressed with focused tests;
4. no relevant task requires hidden source data or a concealed target;
5. Reading source-dependent tasks remain self-contained and visible;
6. Science models remain truthful and visibly learner-controlled;
7. all activities are keyboard operable, non-color-dependent, and reduced-motion safe;
8. no widget/coaching interaction mutates progress or storage;
9. the full test, type, normal-build, single-build, diff, and browser gates pass; and
10. independent scoped review has no unresolved Critical or Important finding.
