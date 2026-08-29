# Cram All Plan A Closure Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve the three independently reproduced Important residuals that block Plan A closure after the `abe7f64` final-fix re-review.

**Architecture:** Treat this as a new, separately authorized remediation pass rather than a second fix wave inside the exhausted Plan A review workflow. Normalize valid legacy v1 data at the storage migration boundary, share one answer normalizer between grading and authored-content validation, and test rendered/composited contrast rather than raw color tokens alone.

**Tech Stack:** React 18, TypeScript 5, Zod 3, Vitest 2, Vite 5, Node.js; no new dependencies.

**Spec:** `docs/superpowers/specs/2026-08-29-cram-all-design.md`; residual evidence: `.superpowers/sdd/2026-08-29-plan-a-foundation/final-rereview-report.md`.

## Global Constraints

- Execution requires a new explicit user authorization. The prior Plan A SDD workflow already used its one consolidated final fix wave and one scoped re-review.
- `abe7f64` is the historical reproduction base, not a checkout target. Execute from the then-current `plan-a-foundation` `HEAD`, record that exact pre-remediation commit as `REMEDIATION_BASE` in the per-plan ledger before Task 1, and preserve all later Reading, Science, documentation, and unrelated user work. Never reset or rebase the branch back to `abe7f64`.
- Preserve `HashRouter`, the literal `cramall.v1` key, `passThreshold: 8`, current authored Math Unit 1 semantics, and normal-versus-single Google Font behavior.
- Do not modify, stage, or revert `src/characters/**`.
- Do not weaken malformed-save validation, content identity rules, or WCAG thresholds to make tests pass.
- Use test-driven development: demonstrate each focused failure before production edits, then run the focused green test and commit.
- End with fresh tests, TypeScript checks, both builds, artifact inspection, and an independent scoped review of this remediation range.

---

## Task 1: Migrate valid legacy v1 saves into current invariants

**Files:**

- Modify: `src/progress/storage.ts`
- Modify: `src/progress/storage.test.ts`

**Interfaces:**

- Consumes: `SaveData`, `AttemptSchema`, `SettingsSchema`, `deriveStreak()`, `SaveDataSchema`, and `migrateSave(value: unknown): SaveData` from `src/progress/storage.ts`.
- Produces: an internal strict `LegacyV1SaveSchema`, `canonicalizeLegacyV1(value): SaveData`, and a `migrateSave()` v1 branch that accepts valid previous-producer data, canonicalizes derived fields, and then parses the result with `SaveDataSchema`.
- Compatibility rule: preserve valid attempt order/data, settings, lesson keys, and parent flags; recompute lesson `bestScore` and `status`; update the streak date to the latest valid attempt date while clamping the legacy count to `1..deriveStreak(lessons).count`. Empty attempts require the empty streak. Reject invalid dates, scores, totals, tags, booleans, unknown keys, and unsupported versions.

- [ ] **Step 1: Write the failing old-producer regressions**

Add this fixture and tests to `src/progress/storage.test.ts`:

```ts
function legacyBackwardDateSave() {
  return {
    version: 1 as const,
    settings: { soundOn: true, ttsOn: true },
    lessons: {
      'math-u01-l01': {
        status: 'in-progress' as const,
        bestScore: 7,
        attempts: [
          attempt({ date: '2026-01-29', score: 7 }),
          attempt({ date: '2026-01-28', score: 6 }),
        ],
      },
    },
    // This is exactly the state the pre-abe7f64 producer could emit after clock rollback.
    streak: { lastActiveDate: '2026-01-28', count: 1 },
    parentChecked: { 'math-u01-l01': true },
  };
}

test('migrateSave canonicalizes a valid pre-fix backward-date v1 save', () => {
  const migrated = migrateSave(legacyBackwardDateSave());

  expect(migrated.lessons['math-u01-l01']?.attempts.map(({ date }) => date)).toEqual([
    '2026-01-29',
    '2026-01-28',
  ]);
  expect(migrated.streak).toEqual({ lastActiveDate: '2026-01-29', count: 1 });
  expect(migrated.parentChecked['math-u01-l01']).toBe(true);
  expect(importSave(exportSave(migrated))).toEqual(migrated);
});

test('loadSaveResult loads and canonicalizes the prior producer save without deleting it', () => {
  const raw = JSON.stringify(legacyBackwardDateSave());
  window.localStorage.setItem(KEY, raw);

  const loaded = loadSaveResult();

  expect(loaded.issue).toBeNull();
  expect(loaded.save.streak).toEqual({ lastActiveDate: '2026-01-29', count: 1 });
  expect(window.localStorage.getItem(KEY)).toBe(raw);
});

test('legacy migration still rejects malformed core attempt data', () => {
  const legacy = legacyBackwardDateSave();
  legacy.lessons['math-u01-l01'].attempts[0]!.score = 11;
  expect(() => migrateSave(legacy)).toThrow();
});
```

- [ ] **Step 2: Run the focused tests to verify the compatibility failure**

Run: `npm test -- src/progress/storage.test.ts --run`

Expected: the first two new tests FAIL because the current v1 branch passes the old object directly to `SaveDataSchema`, which rejects its rewound streak; the malformed-core test already passes.

- [ ] **Step 3: Implement constrained v1 canonicalization**

Add an input schema that validates core data but deliberately does not enforce derived values, then canonicalize before the current strict parse:

```ts
const LegacyLessonProgressSchema = z.object({
  status: z.enum(['in-progress', 'passed']),
  bestScore: z.number().int().min(0).max(10),
  attempts: z.array(AttemptSchema).min(1),
}).strict();

const LegacyV1SaveSchema = z.object({
  version: z.literal(1),
  settings: SettingsSchema,
  lessons: z.record(LegacyLessonProgressSchema),
  streak: z.object({
    lastActiveDate: z.union([z.literal(''), IsoDateSchema]),
    count: z.number().int().min(0).max(36_600),
  }).strict(),
  parentChecked: z.record(z.boolean()),
}).strict();

function canonicalizeLegacyV1(value: unknown): SaveData {
  const legacy = LegacyV1SaveSchema.parse(value);
  const lessons: Record<string, LessonProgress> = Object.fromEntries(
    Object.entries(legacy.lessons).map(([lessonId, progress]) => {
      const bestScore = Math.max(...progress.attempts.map(({ score }) => score));
      return [lessonId, {
        attempts: progress.attempts,
        bestScore,
        status: progress.attempts.some(({ score }) => score >= PASS_THRESHOLD)
          ? 'passed' as const
          : 'in-progress' as const,
      }];
    }),
  );
  const maximum = deriveStreak(lessons);
  const streak = maximum.count === 0
    ? { lastActiveDate: '', count: 0 }
    : {
        lastActiveDate: maximum.lastActiveDate,
        count: Math.max(1, Math.min(legacy.streak.count, maximum.count)),
      };
  return SaveDataSchema.parse({ ...legacy, lessons, streak });
}

export function migrateSave(value: unknown): SaveData {
  if (typeof value !== 'object' || value === null || !('version' in value)) {
    return SaveDataSchema.parse(value);
  }
  switch ((value as { version?: unknown }).version) {
    case 1:
      return canonicalizeLegacyV1(value);
    default:
      throw new UnsupportedSaveVersionError((value as { version?: unknown }).version);
  }
}
```

Do not mutate `value`; `persist()` and `exportSave()` may receive already-current saves and must round-trip byte-equivalent data after JSON serialization.

- [ ] **Step 4: Run focused and adjacent tests**

Run: `npm test -- src/progress/storage.test.ts src/progress/ProgressContext.test.tsx src/progress/logic.test.ts --run`

Expected: PASS, including the three new migration tests, invalid/unsupported-data notices, literal-key tests, and current backward-date policy.

- [ ] **Step 5: Commit**

```bash
git add src/progress/storage.ts src/progress/storage.test.ts
git commit -m "fix: migrate valid legacy v1 progress"
```

## Task 2: Share grading and ambiguity normalization

**Files:**

- Create: `src/content/answer-normalization.ts`
- Create: `src/content/answer-normalization.test.ts`
- Modify: `src/content/schema.ts`
- Modify: `src/content/schema.test.ts`
- Modify: `src/quiz/engine.ts`
- Modify: `src/quiz/engine.test.ts`

**Interfaces:**

- Produces: `normalizeAnswerText(value: string): string` in a dependency-neutral content helper.
- Preserves: `normalizeText` as a public alias from `src/quiz/engine.ts` so existing callers/tests do not break.
- Shared semantics, in order: Unicode NFKC, trim, locale-stable lowercase, collapse internal whitespace, strip commas, remove whitespace around `+`.
- `validateLesson()` uses the same helper for visible choice and sort-item ambiguity that `gradeAnswer()` uses for fill answers.

- [ ] **Step 1: Write the failing shared-normalization and mutation tests**

Create `src/content/answer-normalization.test.ts`:

```ts
import { expect, test } from 'vitest';
import { normalizeAnswerText } from './answer-normalization';

test.each([
  ['7,000 + 30', '7000+30'],
  ['7,000+30', '7000+30'],
  ['  THREE   hundred  ', 'three hundred'],
  ['３００＋４０', '300+40'],
])('normalizes %j to %j', (input, expected) => {
  expect(normalizeAnswerText(input)).toBe(expected);
});
```

In `src/content/schema.test.ts`, mutate a valid choice question so its visible choices contain `300 + 40` and `300+40`, then assert `validateLesson()` reports duplicate visible answers. Add the same mutation for sort-item text. In `src/quiz/engine.test.ts`, assert `normalizeText === normalizeAnswerText` behavior and retain the real `gradeAnswer()` regression for `7,000+30`.

- [ ] **Step 2: Run the focused tests to verify they fail**

Run: `npm test -- src/content/answer-normalization.test.ts src/content/schema.test.ts src/quiz/engine.test.ts --run`

Expected: FAIL because the shared module does not exist and the current schema normalizer permits the plus-spacing duplicates.

- [ ] **Step 3: Implement one dependency-neutral normalizer**

Create `src/content/answer-normalization.ts`:

```ts
export function normalizeAnswerText(value: string): string {
  return value
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en-US')
    .replace(/\s+/g, ' ')
    .replace(/,/g, '')
    .replace(/\s*\+\s*/g, '+');
}
```

In `src/content/schema.ts`, import `normalizeAnswerText`, delete `normalizedVisibleText`, and pass all choice/sort visible text through the shared helper before `duplicateValues()`. In `src/quiz/engine.ts`, replace the local function with:

```ts
import { normalizeAnswerText } from '../content/answer-normalization';

export const normalizeText = normalizeAnswerText;
```

Keep choice grading ID-based and sort grading order-ID-based; this change aligns authoring ambiguity with visible-answer semantics without changing those interaction contracts.

- [ ] **Step 4: Run focused and permanent content gates**

Run: `npm test -- src/content/answer-normalization.test.ts src/content/schema.test.ts src/content/content-validation.test.ts src/quiz/engine.test.ts --run`

Expected: PASS; both plus-spacing ambiguity mutations are rejected and `7,000+30` still grades correct.

- [ ] **Step 5: Commit**

```bash
git add src/content/answer-normalization.ts src/content/answer-normalization.test.ts src/content/schema.ts src/content/schema.test.ts src/quiz/engine.ts src/quiz/engine.test.ts
git commit -m "fix: share answer normalization with content validation"
```

## Task 3: Test rendered text contrast and remove opacity loss

**Files:**

- Modify: `src/theme.css`
- Modify: `scripts/theme.test.mjs`

**Interfaces:**

- Consumes: `hexToRgb`, `contrast`, `token`, `block`, and `SUBJECTS` in `scripts/theme.test.mjs`.
- Produces: `compositeHex(foreground, background, alpha)` and a rendered `.unit-number` assertion for every subject action color.
- Preserves: bright decorative subject colors, opaque action colors, global focus, 44px quiet links, and the 4.5:1 normal-text / 3:1 functional-boundary thresholds.

- [ ] **Step 1: Write the failing composited-contrast test**

Add this helper and test to `scripts/theme.test.mjs` before changing CSS:

```js
function compositeHex(foreground, background, alpha) {
  const mixed = hexToRgb(foreground).map((channel, index) =>
    Math.round(channel * alpha + hexToRgb(background)[index] * (1 - alpha)),
  );
  return `#${mixed.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}

test('unit-number rendered text meets 4.5:1 for every subject', () => {
  const rule = block('.unit-number');
  const opacity = Number(/opacity:\s*([\d.]+)/.exec(rule)?.[1] ?? '1');
  const foreground = token('c-on-accent');
  for (const subject of SUBJECTS) {
    const renderedForeground = compositeHex(foreground, subject.actionColor, opacity);
    expect(
      contrast(renderedForeground, subject.actionColor),
      `${subject.id} unit-number`,
    ).toBeGreaterThanOrEqual(4.5);
  }
});
```

- [ ] **Step 2: Run the real-CSS test to verify it fails**

Run: `npx vitest run scripts/theme.test.mjs`

Expected: FAIL for Science at approximately `4.433:1` because `.unit-number` has `opacity: 0.85` over `#047857`.

- [ ] **Step 3: Remove the contrast-lowering opacity**

Change the CSS rule to opaque text:

```css
.unit-number {
  font-size: 0.875rem;
  white-space: nowrap;
}
```

Do not darken the decorative subject colors or change text size to exploit the large-text exception.

- [ ] **Step 4: Run focused theme and screen tests**

Run: `npx vitest run scripts/theme.test.mjs src/screens/SubjectMap.test.tsx src/screens/Home.test.tsx src/screens/ProgressScreen.test.tsx`

Expected: PASS; the new rendered/composited test measures each `.unit-number` pair at the raw opaque subject-action ratio, including Science above 4.5:1.

- [ ] **Step 5: Commit**

```bash
git add src/theme.css scripts/theme.test.mjs
git commit -m "fix: preserve AA contrast in unit labels"
```

## Task 4: Fresh closure verification and scoped re-review

**Files:**

- Modify: none unless a verification failure is routed back to the owning task before review.

**Interfaces:**

- Consumes: the three reviewed remediation commits and the exact `REMEDIATION_BASE` recorded immediately before Task 1.
- Produces: a review package for the remediation base through `HEAD`, fresh command evidence, and a new independent scoped review. It does not reopen unrelated Plan A scope.

- [ ] **Step 1: Run the complete automated gate**

Run:

```bash
npm test
npx tsc --noEmit -p tsconfig.app.json --pretty false
npx tsc --noEmit -p tsconfig.node.json --pretty false
npm run build
npm run build:single
```

Expected: all tests pass (at least the prior 305 plus new regressions), both TypeScript projects emit no diagnostics, and both builds succeed.

- [ ] **Step 2: Inspect generated artifacts and protected invariants**

Run:

```bash
node scripts/build-standards.mjs
git diff --exit-code -- src/content/standards/standards.json
find dist-single -maxdepth 1 -type f
git diff --name-only abe7f64..HEAD -- src/characters
git diff --exit-code abe7f64..HEAD -- src/content/math/u01.ts
git diff --check abe7f64..HEAD
```

Expected: standards regenerate without drift; `dist-single` lists only `index.html`; the character and authored pilot-content diffs are empty; the remediation diff has no whitespace errors. Inspect `dist/index.html` for Google Font links and `dist-single/index.html` for no external script/stylesheet/image resources.

- [ ] **Step 3: Package and independently review the exact remediation range**

Use the Superpowers `subagent-driven-development/scripts/review-package` helper with this plan path, the exact `REMEDIATION_BASE` hash recorded in the ledger, and `HEAD`. Dispatch one fresh reviewer to verify only the three residuals, their regression tests, and new Critical/Important breakage. Do not use `abe7f64` as the package base when later user-requested commits precede remediation.

Expected: all three findings are ADDRESSED, no new Critical/Important findings, and the character issue remains out of scope by the binding ruling.

- [ ] **Step 4: Record closure evidence**

Append exact commands/counts and every reviewer ruling to the per-plan SDD ledger. Do not mark Plan A closed if any of the three residuals remains partial or if the independent review finds new Critical/Important breakage.

- [ ] **Step 5: Commit only if verification required documentation changes**

No source commit is expected in this task. If the user-authorized execution also updates a tracked release note, stage only that explicit file and use `docs: record Plan A closure verification`; otherwise leave the worktree clean.

## Self-review

- **Spec coverage:** Task 1 preserves valid learner progress while retaining strict malformed-data rejection; Task 2 makes permanent authored-content ambiguity match real grading; Task 3 measures actual rendered normal-text contrast; Task 4 repeats the full release and independent-review gates.
- **Placeholder scan:** no `TBD`, `TODO`, “implement later,” “same as,” or prose-only production step remains.
- **Type consistency:** Task 1 returns the existing `SaveData`; Task 2 preserves the exported `normalizeText` name while centralizing semantics; Task 3 uses the existing Node-side theme test helpers.
- **Boundary check:** no task edits characters, authored pilot content, routing, pass threshold, storage key, or build-mode font policy.

## Execution handoff

This plan is documentation only until the user explicitly authorizes a new remediation pass. Once authorized, execute with `superpowers:subagent-driven-development` so each task receives a fresh implementer and independent review before Plan A is reconsidered for closure.
