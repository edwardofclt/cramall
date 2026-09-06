# Manipulative Coaching Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a typed, accessible, in-step guide-coaching boundary that reacts only to meaningful widget events and never mutates learner progress.

**Architecture:** `LearnCard` owns authored coaching data, `WidgetCoachFrame` owns introduction/reaction state, and widgets emit a small semantic coach event alongside their existing events. `LessonPlayer` supplies the subject guide and coordinates the single forward action.

**Tech Stack:** React 18, TypeScript 5, Zod 3, Framer Motion 11, Vitest 2, React Testing Library, user-event.

**Spec:** `docs/superpowers/specs/2026-09-05-manipulative-coaching-and-usability-design.md`

## Global Constraints

- Do not modify `src/characters/**`; consume only its public APIs.
- No timer-based coaching and no persistence/progress writes.
- Keep the widget error boundary, Suspense fallback, lazy registry, and keyed reset behavior.
- Introduction lines resolve abstract `guide` to `subject.guide`.
- The lesson explanation remains visible; coaching renders immediately before the widget.
- Exactly one forward action is visible while the introduction is active.
- Each reaction category fires at most once per card visit.
- Use TDD and exact narrow commits.

---

### Task 1: Coaching schemas and types

**Files:**
- Modify: `src/content/schema.ts`
- Modify: `src/content/schema.test.ts`

**Interfaces:**
- Consumes: `PoseSchema`, `LearnCardSchema`, existing inferred content types.
- Produces: `WidgetCoachLineSchema`, `WidgetCoachReactionSchema`, `WidgetCoachSchema`, `WidgetCoach`, and `LearnCard.widgetCoach`.

- [ ] **Step 1: Add failing schema tests**

Add tests that parse this exact shape and reject one/four intro lines, a kid pose,
`widgetCoach` without `widget`, and simultaneous card `dialogue` plus `widgetCoach`:

```ts
const widgetCoach = {
  intro: [
    { speaker: 'guide', text: 'Connect the lesson idea to this model.', pose: 'talk' },
    { speaker: 'kid', text: 'I will change one thing and compare.' },
  ],
  reactions: {
    strategy: { text: 'Change one condition at a time.', pose: 'think' },
    retry: { text: 'Use the visible evidence and revise.', pose: 'oops' },
    milestone: { text: 'That intermediate model is useful.', pose: 'talk' },
    complete: { text: 'You used the model to explain the lesson idea.', pose: 'cheer' },
  },
};
```

- [ ] **Step 2: Run the focused test and confirm red**

```sh
npm test -- schema
```

Expected: FAIL because `widgetCoach` is stripped/rejected and schemas are absent.

- [ ] **Step 3: Implement strict schemas and cross-field refinement**

Use the exact public shape from the interface block. `speaker` is
`z.enum(['guide','kid'])`; text is trimmed/non-empty; guide poses use `PoseSchema`;
`superRefine` reports paths `['widgetCoach']` and `['dialogue']` for cross-field errors.
Export the inferred `WidgetCoach` type.

- [ ] **Step 4: Run focused tests and TypeScript**

```sh
npm test -- schema
npx tsc -b --pretty false
```

- [ ] **Step 5: Commit exact files**

```sh
git add src/content/schema.ts src/content/schema.test.ts
git diff --cached --check
git commit -m "feat(coaching): define authored widget coaching"
```

### Task 2: Semantic coaching event contract

**Files:**
- Modify: `src/widgets/registry.ts`
- Modify: `src/widgets/WidgetFrame.test.tsx`

**Interfaces:**
- Consumes: existing `WidgetEventMap[T]` and `WidgetEventHandler<T>`.
- Produces: `CoachCue = 'strategy' | 'retry' | 'milestone'`, `WidgetCoachEvent`, and `WidgetEvent<T> = WidgetEventMap[T] | WidgetCoachEvent`.

- [ ] **Step 1: Add a compile/runtime contract test**

Use a handler that accepts `{type:'coach', cue:'retry'}` for two different widget types
and add `@ts-expect-error` for cue `idle`.

```ts
const event: WidgetEvent<'place-value-builder'> = { type: 'coach', cue: 'retry' };
expect(event).toEqual({ type: 'coach', cue: 'retry' });
```

- [ ] **Step 2: Run focused tests and confirm red**

```sh
npm test -- WidgetFrame
npx tsc -b --pretty false
```

- [ ] **Step 3: Implement the additive event union**

Do not add `coach` separately to all 35 map entries. Keep current per-widget payloads
unchanged and define the union at `WidgetEvent<T>`.

- [ ] **Step 4: Run focused tests and TypeScript**

```sh
npm test -- WidgetFrame widgets
npx tsc -b --pretty false
```

- [ ] **Step 5: Commit exact files**

```sh
git add src/widgets/registry.ts src/widgets/WidgetFrame.test.tsx
git diff --cached --check
git commit -m "feat(coaching): add semantic widget cues"
```

### Task 3: In-step coaching component

**Files:**
- Create: `src/lesson/WidgetCoachFrame.tsx`
- Create: `src/lesson/WidgetCoachFrame.test.tsx`
- Modify: `src/theme.css`

**Interfaces:**
- Consumes: `WidgetCoach`, `GuideId`, `WidgetFrameProps`, `WidgetEvent`.
- Produces:

```ts
type WidgetCoachFrameProps = WidgetFrameProps & {
  coach: WidgetCoach;
  guide: GuideId;
  visitKey: string;
  onEvent: WidgetEventHandler;
  onIntroActiveChange: (active: boolean) => void;
};
```

- [ ] **Step 1: Write failing interaction tests**

Test two intro lines, one visible `Next`, final `Try it`, inert widget preview, subject
guide rendering, next-Tab widget access, one-shot cue categories, message replacement,
completion coaching, dismissal, visit-key reset, polite live status, and no fake timers.

```tsx
render(<WidgetCoachFrame type="place-value-builder" config={{target:2}}
  coach={coach} guide="nutty" visitKey="card:1@0"
  onEvent={onEvent} onIntroActiveChange={onIntroActiveChange} />);
expect(screen.getByText(coach.intro[0].text)).toBeVisible();
expect(screen.getByRole('button',{name:'Next'})).toBeVisible();
expect(screen.getByTestId('widget-coach-activity')).toHaveAttribute('inert');
```

- [ ] **Step 2: Run the focused test and confirm red**

```sh
npm test -- WidgetCoachFrame
```

- [ ] **Step 3: Implement the smallest complete state machine**

Use explicit states `intro` and `active`; a `Set<CoachCue | 'complete'>` prevents repeat
announcements. Wrap `onEvent`, forward every event unchanged, map `coach` and `complete`
to authored reactions, and reset state when `visitKey` changes. Render the public
`Character` directly for compact reactions and map abstract intro lines to the subject
guide without editing character files.

- [ ] **Step 4: Add responsive/reduced-motion CSS**

Use `.widget-coach-intro`, `.widget-coach-activity`, and `.widget-coach-reaction` under
the existing lesson card. Wide reaction layout must reserve space rather than overlay
controls; at `max-width: 640px` it becomes a full-width strip above the widget. Use the
existing reduced-motion convention for zero-duration transitions.

- [ ] **Step 5: Run focused tests and CSS checks**

```sh
npm test -- WidgetCoachFrame widget-css
npx tsc -b --pretty false
```

- [ ] **Step 6: Commit exact files**

```sh
git add src/lesson/WidgetCoachFrame.tsx src/lesson/WidgetCoachFrame.test.tsx src/theme.css
git diff --cached --check
git commit -m "feat(coaching): render in-step widget coach"
```

### Task 4: Learn-card and lesson-stage integration

**Files:**
- Modify: `src/lesson/LearnCard.tsx`
- Modify: `src/lesson/LessonPlayer.tsx`
- Modify: `src/lesson/LessonPlayer.test.tsx`

**Interfaces:**
- Consumes: `WidgetCoachFrameProps`, subject `guide`, stage visit identity.
- Produces: widget coaching placed after blocks and before the widget, plus intro ownership of the lesson forward action.

- [ ] **Step 1: Add failing real-player tests**

Extend the existing player fixture with `widgetCoach`. Assert blocks remain visible,
coaching follows the final block, the lesson Next is absent during intro, `Try it`
reveals it, Back/Forward revisits replay coaching, unrelated query parameters survive,
and widget events still do not call `localStorage.setItem`.

- [ ] **Step 2: Run the focused test and confirm red**

```sh
npm test -- LessonPlayer
```

- [ ] **Step 3: Pass subject and visit context into LearnCard**

Add `guide`, `stageVisitKey`, and `onWidgetCoachIntroActiveChange` props. Replace direct
`WidgetFrame` rendering only when `card.widgetCoach` exists. Preserve defensive direct
widget rendering when it does not.

- [ ] **Step 4: Coordinate the single forward action**

Track widget-coach intro activity alongside existing card dialogue activity. Hide the
lesson-stage Next when either owns the forward action. Do not change URL stage keys.

- [ ] **Step 5: Run focused and adjacent tests**

```sh
npm test -- LessonPlayer LearnCard WidgetCoach WidgetFrame
npx tsc -b --pretty false
```

- [ ] **Step 6: Commit exact files**

```sh
git add src/lesson/LearnCard.tsx src/lesson/LessonPlayer.tsx src/lesson/LessonPlayer.test.tsx
git diff --cached --check
git commit -m "feat(coaching): integrate coach with lesson stages"
```

### Task 5: Foundation content-validation hook

**Files:**
- Modify: `src/content/content-validation.test.ts`
- Modify: `src/test/widgetFixtures.ts`

**Interfaces:**
- Consumes: `WidgetCoachSchema`, 35-widget fixture map.
- Produces: reusable validator assertions without yet requiring all production cards to be migrated.

- [ ] **Step 1: Add failing fixture/validation tests**

Assert a coached widget card parses; a widget without `widgetCoach` is collected by a
named helper `widgetCoachingErrors(subjects)`; and non-widget cards are ignored. Do not
turn the production-wide zero-error assertion on until the integration plan.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- content-validation widgetFixtures
```

- [ ] **Step 3: Implement the reusable coverage helper**

Return stable messages of the form
`<lesson-id>/<card-id>: widget <type> is missing widgetCoach` so subject agents can use
the same gate while migrating content.

- [ ] **Step 4: Run the foundation gate**

```sh
npm test -- schema WidgetCoach WidgetFrame LessonPlayer content-validation
npx tsc -b --pretty false
npm run build
git diff --check
```

- [ ] **Step 5: Commit exact files**

```sh
git add src/content/content-validation.test.ts src/test/widgetFixtures.ts
git diff --cached --check
git commit -m "test(coaching): expose production coverage audit"
```
