# Manipulative Coaching Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate all subject repairs, enforce production coaching/source contracts, and verify the complete experience in both build modes.

**Architecture:** Turn migration audits into permanent gates, add safe visible-widget text to read-aloud, reconcile shared responsive styling, then run cross-subject automation and real-browser acceptance.

**Tech Stack:** React 18, TypeScript 5, Zod 3, Framer Motion 11, Vite 5, Vitest 2, React Testing Library, in-app browser.

**Spec:** `docs/superpowers/specs/2026-09-05-manipulative-coaching-and-usability-design.md`

## Global Constraints

- Requires every accepted Foundation, Math, Reading, and Science task.
- Do not modify `src/characters/**` or generated standards.
- Preserve `HashRouter`, stage URL/history behavior, `passThreshold: 8`, and local-only progress.
- Full production content must pass strict parsing and widget/coaching coverage.
- Browser acceptance uses a served build, never direct `dist/index.html`.
- No Critical or Important final-review finding may remain unresolved.

---

### Task I1: Turn coaching and rich-mode audits into permanent content gates

**Files:**
- Modify: `src/content/content-validation.test.ts`
- Modify: `src/content/schema.test.ts`

**Interfaces:**
- Consumes: all authored subjects and `widgetCoachingErrors(subjects)` from Foundation.
- Produces: zero-error production requirements for coaching and repaired-mode usage.

- [ ] **Step 1: Add failing production assertions**

Assert every widget card has `widgetCoach`; no production card combines general dialogue
with widget intro; no story mapper uses legacy exact-string `answers`; every credibility
card uses criteria judgments; every elapsed card exposes jumps; every collision/erosion/
topographic card uses the new comparison/point modes; and all visible targets/source data
are present where required.

```ts
expect(widgetCoachingErrors(SUBJECTS)).toEqual([]);
```

- [ ] **Step 2: Run and confirm the gate catches any migration gap**

```sh
npm test -- content-validation schema
```

- [ ] **Step 3: Route any migration failure back to its owning subject task**

Do not weaken the assertion or generate fallback content from hidden answers. A Math,
Reading, or Science failure blocks this task until a fresh bounded agent corrects the
literal file named by the test under that subject plan and commits its focused fix.

- [ ] **Step 4: Verify and commit the permanent gates**

```sh
npm test -- content-validation schema content
npx tsc -b --pretty false
git add src/content/content-validation.test.ts src/content/schema.test.ts
git diff --cached --check
git commit -m "test(content): enforce coached manipulatives"
```

### Task I2: Include visible widget material in read-aloud

**Files:**
- Create: `src/widgets/widgetSpeechText.ts`
- Create: `src/widgets/widgetSpeechText.test.ts`
- Modify: `src/lesson/LearnCard.tsx`
- Modify: `src/lesson/LessonPlayer.test.tsx`

**Interfaces:**
- Produces `widgetSpeechText(ref: WidgetRef): string[]` containing only text visible before commitment.
- Consumes the helper when building the learn-card Read Aloud string.

- [ ] **Step 1: Add failing speech tests**

Assert Reading source title/text, excerpts, summary planning sentences, figurative
phrases, and credibility source metadata are included. Assert hidden correct IDs,
accepted answers, classifications, and result explanations are excluded. Add a real
LearnCard test proving the utterance includes the visible source.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- widgetSpeechText LessonPlayer ReadAloud
```

- [ ] **Step 3: Implement an exhaustive type switch**

Return arrays from visible prompt/source/choice fields only. Each of all 35 widget cases
must be explicit; return `[]` for widgets whose config contains no additional visible
prose. Do not serialize whole config objects.

- [ ] **Step 4: Integrate, verify, and commit**

```sh
npm test -- widgetSpeechText LessonPlayer ReadAloud widgets reading
npx tsc -b --pretty false
git add src/widgets/widgetSpeechText.ts src/widgets/widgetSpeechText.test.ts src/lesson/LearnCard.tsx src/lesson/LessonPlayer.test.tsx
git diff --cached --check
git commit -m "feat(accessibility): read visible widget material aloud"
```

### Task I3: Reconcile responsive, focus, and reduced-motion behavior

**Files:**
- Modify: `src/theme.css`
- Modify: `src/widgets/widget-css.test.ts`
- Modify: `src/lesson/WidgetCoachFrame.test.tsx`

**Interfaces:** Produces shared coaching/widget layout that works at desktop, ≤640px, short-wide, and 200% zoom.

- [ ] **Step 1: Add failing static and component contracts**

Assert scoped controls keep 44px minimums; coach reaction uses reserved grid space on
wide layouts and a block strip at ≤640px; no absolute coach overlay covers controls;
reduced motion disables new transitions/animations; inert preview excludes descendants
from focus; dismissal and live status remain named.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- widget-css WidgetCoachFrame
```

- [ ] **Step 3: Consolidate subject CSS deliberately**

Group only shared tokens/layout rules; retain subject-specific visualization classes.
Use overflow wrapping/scroll containers only where the model needs width, and keep source
text visible rather than horizontally scrolling prose.

- [ ] **Step 4: Verify and commit**

```sh
npm test -- widget-css WidgetCoachFrame widgets
npx tsc -b --pretty false
git add src/theme.css src/widgets/widget-css.test.ts src/lesson/WidgetCoachFrame.test.tsx
git diff --cached --check
git commit -m "fix(accessibility): harden coached widget layouts"
```

### Task I4: Add cross-subject lesson integration coverage

**Files:**
- Modify: `src/lesson/LessonPlayer.test.tsx`
- Modify: `src/widgets/WidgetFrame.test.tsx`
- Modify: `src/content/content-validation.test.ts`

**Interfaces:** Produces representative end-to-end component tests for Nutty, Winnie, and Sandy.

- [ ] **Step 1: Add three real-content flows**

For one repaired card per subject, navigate directly by `?step=card:<id>`, assert lesson
material then two-line coaching, activate with `Try it`, perform a meaningful retry and
completion, verify the correct guide/reaction, use Back/Forward to replay intro, and
confirm unrelated query parameters survive.

- [ ] **Step 2: Add ephemerality and failure assertions**

Spy on `Storage.prototype.setItem`; no intro/widget/cue action may call it. Force a
widget crash after intro and assert the napping card plus lesson Next remain available.
Send an unmatched cue and assert the activity remains usable.

- [ ] **Step 3: Run full component/content gate**

```sh
npm test -- LessonPlayer WidgetFrame WidgetCoach content-validation widgets content
npx tsc -b --pretty false
```

- [ ] **Step 4: Commit exact files**

```sh
git add src/lesson/LessonPlayer.test.tsx src/widgets/WidgetFrame.test.tsx src/content/content-validation.test.ts
git diff --cached --check
git commit -m "test(coaching): cover real subject lesson flows"
```

### Task I5: Full release and browser acceptance

**Files:** Read only unless browser testing reveals a focused defect; any fix receives a separate TDD task and exact commit.

**Interfaces:** Produces final automated/build/browser evidence.

- [ ] **Step 1: Run full automated gates**

```sh
npm test
npx tsc -b --pretty false
npm run build
npm run build:single
git diff --check
```

- [ ] **Step 2: Inspect artifacts**

```sh
find dist -maxdepth 2 -type f | sort
find dist-single -maxdepth 2 -type f | sort
rg -n "https?://|<script[^>]+src=|<link[^>]+href=" dist-single/index.html
```

Expected: `dist-single/index.html` is the sole single-build artifact and the resource scan
finds no external font/script/style dependency.

- [ ] **Step 3: Serve the normal build**

```sh
npx vite preview --host 127.0.0.1
```

- [ ] **Step 4: Browser-check structurally distinct repairs**

At minimum exercise: Math elapsed time, fraction mode, shape hierarchy, and probability;
Reading story map, credibility, summary, and evidence board; Science collision, erosion,
topographic map, and constrained energy conversion. For each, verify in-step placement,
one forward action, meaningful cue, completion connection, source/goal visibility, and
lesson navigation.

- [ ] **Step 5: Repeat responsive/accessibility checks**

Use desktop, 390px mobile, and short-wide viewports. Complete representative activities
with Tab/Shift+Tab/Enter/Space, enable reduced motion, inspect visible focus, verify no
coach/control/source overlap, and confirm status text without color or motion.

- [ ] **Step 6: Test the exact single build through localhost**

Serve `dist-single` and repeat one coached activity per subject. Confirm the guide art,
lazy widgets, navigation, and reaction state work without external resources.

### Task I6: Independent final reviews and bounded fixes

**Files:** Read only for reviewers; exact finding paths for fix agents.

**Interfaces:** Produces zero unresolved Critical/Important findings.

- [ ] **Step 1: Dispatch curriculum/spec Luna reviewer**

Review every spec acceptance criterion, lesson/widget alignment, Reading source
self-containment, Math correctness, and Science model/evidence language. Return findings
with severity and exact paths; do not edit.

- [ ] **Step 2: Dispatch runtime/accessibility Luna reviewer**

Review event ordering, completion latches, resets, storage isolation, error boundaries,
keyboard semantics, live regions, reduced motion, and responsive CSS. Return findings
with severity and exact paths; do not edit.

- [ ] **Step 3: Fix findings with fresh bounded Luna tasks**

Each prompt lists exact finding text and files. Require a failing regression first, then
the smallest fix, focused gates, and exact commit. Never combine unrelated findings.

- [ ] **Step 4: Re-review and run final gates**

```sh
npm test
npx tsc -b --pretty false
npm run build
npm run build:single
git status --short
git diff --check
```

Expected: all green, no unresolved Critical/Important review item, no protected character
change, and no unrelated staged file.
