# Cram All — Plan A: App Foundation + Pilot Unit

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A fully working end-to-end site — home → subject map → character-guided lesson → tactile widget → 10-question Quick Check → results with review links — with one pilot math unit, so Plans B (widget library) and C (content generation) only add data and widgets.

**Architecture:** Content-as-data: Zod-validated lesson files rendered by a generic `LessonPlayer`. Pure-logic modules (storage, progress, quiz engine) are dependency-free and unit-tested; React layers consume them via a single `ProgressContext`. Widgets are lazy components behind a registry + error boundary. Hash routing so the single-file build works from `file://`.

**Tech Stack:** React 18, Vite 5, TypeScript 5, react-router-dom 6 (HashRouter), Framer Motion 11, Zod 3, Vitest 2 + @testing-library/react + jsdom, vite-plugin-singlefile.

**Plan scope:** Plan A of three. Plan B (remaining widgets) and Plan C (full content generation via schema-validated workflows) are written after Plan A completes.

## Global Constraints

- Node ≥ 20; npm. All ids kebab-case: units `math-u01`, lessons `math-u01-l01`, cards `math-u01-l01-c1`, questions `math-u01-l01-q01`.
- Quiz: `passThreshold: 8`, pool ≥ 13 questions, each attempt samples 10.
- localStorage key: `cramall.v1`. All storage access goes through `src/progress/storage.ts`.
- Routing: `HashRouter` only (single-file build must work from `file://`). No runtime network calls except the optional Google Fonts `<link>` (must degrade gracefully offline).
- Motion: all animation via Framer Motion using shared variants from `src/app/motion.ts`; every animated component honors reduced motion (`useReducedMotionPref()`).
- Subjects/guides: `math`→`nutty`, `reading`→`winnie`, `science`→`sandy`. Subject accent colors: math `#f59e0b`, reading `#8b5cf6`, science `#10b981`.
- Standards source of truth: `docs/research/sc-grade4-standards.json` (never hand-edit generated `src/content/standards/standards.json`).
- Commit after every task (at minimum). Test commands must pass before each commit.

---

### Task 1: Project scaffold, theme, and test harness

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `.gitignore`, `src/main.tsx`, `src/App.tsx`, `src/theme.css`, `src/app/motion.ts`, `src/app/useReducedMotionPref.ts`, `src/test/smoke.test.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `npm run dev|build|build:single|test`; theme CSS custom properties (`--c-bg`, `--c-card`, `--c-ink`, `--c-ink-soft`, `--c-accent`, `--c-good`, `--c-bad`, `--radius`, `--shadow`); `motion.ts` exports `pageVariants`, `cardVariants`, `popVariants` (Framer `Variants`) and `springy` transition; `useReducedMotionPref(): boolean`.

- [ ] **Step 1: Scaffold and install**

```bash
npm create vite@latest . -- --template react-ts
npm i react-router-dom framer-motion zod
npm i -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom vite-plugin-singlefile
```

- [ ] **Step 2: Configure Vite + Vitest + scripts**

`vite.config.ts`:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
}));
```

`src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

`package.json` scripts:

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "build:single": "tsc -b && vite build --mode single --outDir dist-single",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 3: Theme, motion module, reduced-motion hook**

`src/theme.css` — CSS custom properties from the Interfaces block, `body` background `--c-bg`, font stack `"Baloo 2", "Trebuchet MS", ui-rounded, system-ui, sans-serif`, base classes `.card`, `.btn`, `.btn-primary`, `.btn-good`, `.btn-bad`, `.badge`, `.speech-bubble` (rounded, shadowed, large tap targets ≥ 44px). Add Google Fonts `<link>` for "Baloo 2" in `index.html` (graceful fallback offline). Kid-friendly palette: `--c-bg:#fef9f0; --c-card:#ffffff; --c-ink:#3d3d3d; --c-ink-soft:#8a8a8a; --c-accent:#f59e0b; --c-good:#22c55e; --c-bad:#ef4444; --radius:20px; --shadow:0 4px 0 rgba(0,0,0,.08)`.

`src/app/motion.ts`:

```ts
import type { Variants, Transition } from 'framer-motion';

export const springy: Transition = { type: 'spring', stiffness: 400, damping: 28 };

export const pageVariants: Variants = {
  initial: { opacity: 0, x: 40 },
  enter: { opacity: 1, x: 0, transition: springy },
  exit: { opacity: 0, x: -40, transition: { duration: 0.15 } },
};

export const cardVariants: Variants = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  enter: { opacity: 1, y: 0, scale: 1, transition: springy },
  exit: { opacity: 0, y: -24, transition: { duration: 0.15 } },
};

export const popVariants: Variants = {
  initial: { scale: 0 },
  enter: { scale: 1, transition: { type: 'spring', stiffness: 500, damping: 15 } },
};
```

`src/app/useReducedMotionPref.ts`:

```ts
import { useReducedMotion } from 'framer-motion';
export function useReducedMotionPref(): boolean {
  return useReducedMotion() ?? false;
}
```

`src/App.tsx` for now renders `<h1>Cram All</h1>`.

- [ ] **Step 4: Smoke test, verify, commit**

`src/test/smoke.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders app title', () => {
  render(<App />);
  expect(screen.getByText(/cram all/i)).toBeInTheDocument();
});
```

Run: `npm test` → PASS. `npm run build` → succeeds.

```bash
git add -A && git commit -m "feat: scaffold Vite+React+TS app with theme, motion, and test harness"
```

---

### Task 2: Content schema (Zod) + cross-reference validation

**Files:**
- Create: `src/content/schema.ts`, `src/content/schema.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces (all later tasks import from `src/content/schema.ts`):
  - Types: `SubjectId = 'math'|'reading'|'science'`, `GuideId = 'nutty'|'winnie'|'sandy'`, `Pose = 'idle'|'talk'|'think'|'cheer'|'oops'`, `DialogueLine { speaker: GuideId|'kid'; text: string; pose?: Pose }`, `RichBlock { kind: 'text'|'example'|'tip'; text: string }`, `WidgetRef { type: string; config: Record<string, unknown> }`, `LearnCard { id; title; dialogue?: DialogueLine[]; blocks: RichBlock[]; widget?: WidgetRef }`, `Question` (discriminated union on `type`), `Lesson`, `Unit`, `Subject` — exactly as below.
  - Schemas: `LessonSchema`, `UnitSchema` (Zod).
  - `validateLesson(lesson: Lesson): string[]` — returns human-readable error strings (empty = valid).
  - `WIDGET_TYPES: readonly string[]` — every legal `WidgetRef.type`. Plan A entries: `'place-value-builder'`, `'number-line-compare'`. (Plan B appends here.)

- [ ] **Step 1: Write failing tests**

`src/content/schema.test.ts` — build one minimal valid lesson helper `makeLesson()` (13 multiple-choice questions, 1 card) and assert:

```ts
import { describe, expect, test } from 'vitest';
import { LessonSchema, validateLesson, type Lesson, type Question } from './schema';

function q(id: string, over: Partial<Question> = {}): Question {
  return {
    id, type: 'multiple-choice', prompt: '2+2?',
    choices: [{ id: 'a', text: '4' }, { id: 'b', text: '5' }],
    correctChoiceId: 'a', explanation: 'Because 2+2=4.',
    conceptTag: 'adding', reviewCardId: 'les-c1', ...over,
  } as Question;
}
function makeLesson(): Lesson {
  return {
    id: 'les', unitId: 'math-u01', title: 'T', indicatorCodes: ['4.NR.1.1'],
    intro: [{ speaker: 'nutty', text: 'Hi!' }],
    learnCards: [{ id: 'les-c1', title: 'Card', blocks: [{ kind: 'text', text: 'Learn.' }] }],
    workedExample: { title: 'Try it', steps: ['Step one.'] },
    quiz: { passThreshold: 8, pool: Array.from({ length: 13 }, (_, i) => q(`les-q${i}`)) },
  };
}

test('valid lesson parses and validates clean', () => {
  expect(LessonSchema.parse(makeLesson())).toBeTruthy();
  expect(validateLesson(makeLesson())).toEqual([]);
});
test('bad reviewCardId is reported', () => {
  const l = makeLesson();
  l.quiz.pool[0]!.reviewCardId = 'nope';
  expect(validateLesson(l).join()).toMatch(/nope/);
});
test('pool under 13 is reported', () => {
  const l = makeLesson();
  l.quiz.pool = l.quiz.pool.slice(0, 12);
  expect(validateLesson(l).join()).toMatch(/13/);
});
test('multiple-choice correctChoiceId must be a real choice', () => {
  const l = makeLesson();
  (l.quiz.pool[0] as any).correctChoiceId = 'zzz';
  expect(validateLesson(l).length).toBeGreaterThan(0);
});
test('unknown widget type is reported', () => {
  const l = makeLesson();
  l.learnCards[0]!.widget = { type: 'made-up', config: {} };
  expect(validateLesson(l).join()).toMatch(/made-up/);
});
test('duplicate question ids are reported', () => {
  const l = makeLesson();
  l.quiz.pool[1]!.id = l.quiz.pool[0]!.id;
  expect(validateLesson(l).join()).toMatch(/duplicate/i);
});
```

- [ ] **Step 2: Run to verify fail** — `npm test -- schema` → FAIL (module not found).

- [ ] **Step 3: Implement `src/content/schema.ts`**

```ts
import { z } from 'zod';

export const WIDGET_TYPES = ['place-value-builder', 'number-line-compare'] as const;

export const SubjectIdSchema = z.enum(['math', 'reading', 'science']);
export const GuideIdSchema = z.enum(['nutty', 'winnie', 'sandy']);
export const PoseSchema = z.enum(['idle', 'talk', 'think', 'cheer', 'oops']);

export const DialogueLineSchema = z.object({
  speaker: z.union([GuideIdSchema, z.literal('kid')]),
  text: z.string().min(1),
  pose: PoseSchema.optional(),
});

export const RichBlockSchema = z.object({
  kind: z.enum(['text', 'example', 'tip']),
  text: z.string().min(1),
});

export const WidgetRefSchema = z.object({
  type: z.string(),
  config: z.record(z.unknown()),
});

export const LearnCardSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  dialogue: z.array(DialogueLineSchema).optional(),
  blocks: z.array(RichBlockSchema).min(1),
  widget: WidgetRefSchema.optional(),
});

const questionBase = {
  id: z.string().min(1),
  prompt: z.string().min(1),
  explanation: z.string().min(1),
  conceptTag: z.string().min(1),
  reviewCardId: z.string().min(1),
};
export const ChoiceQuestionSchema = z.object({
  ...questionBase,
  type: z.enum(['multiple-choice', 'true-false']),
  choices: z.array(z.object({ id: z.string(), text: z.string() })).min(2),
  correctChoiceId: z.string(),
});
export const FillQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('fill-blank'),
  acceptedAnswers: z.array(z.string().min(1)).min(1),
});
export const SortQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('sort'),
  items: z.array(z.object({ id: z.string(), text: z.string() })).min(2),
  correctOrder: z.array(z.string()).min(2),
});
export const QuestionSchema = z.discriminatedUnion('type', [
  ChoiceQuestionSchema, FillQuestionSchema, SortQuestionSchema,
]);

export const LessonSchema = z.object({
  id: z.string().min(1),
  unitId: z.string().min(1),
  title: z.string().min(1),
  indicatorCodes: z.array(z.string()).min(1),
  intro: z.array(DialogueLineSchema).min(1),
  learnCards: z.array(LearnCardSchema).min(1),
  workedExample: z.object({ title: z.string(), steps: z.array(z.string()).min(1) }),
  quiz: z.object({ passThreshold: z.number().int(), pool: z.array(QuestionSchema) }),
});

export const UnitSchema = z.object({
  id: z.string().min(1),
  subjectId: SubjectIdSchema,
  number: z.number().int().positive(),
  title: z.string().min(1),
  indicatorCodes: z.array(z.string()).min(1),
  prerequisiteUnitIds: z.array(z.string()),
  lessons: z.array(LessonSchema),
});

export type SubjectId = z.infer<typeof SubjectIdSchema>;
export type GuideId = z.infer<typeof GuideIdSchema>;
export type Pose = z.infer<typeof PoseSchema>;
export type DialogueLine = z.infer<typeof DialogueLineSchema>;
export type RichBlock = z.infer<typeof RichBlockSchema>;
export type WidgetRef = z.infer<typeof WidgetRefSchema>;
export type LearnCard = z.infer<typeof LearnCardSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type Subject = {
  id: SubjectId; title: string; guide: GuideId; color: string; units: Unit[];
};

export function validateLesson(lesson: Lesson): string[] {
  const errors: string[] = [];
  const parsed = LessonSchema.safeParse(lesson);
  if (!parsed.success) {
    return parsed.error.issues.map((i) => `${lesson.id}: ${i.path.join('.')}: ${i.message}`);
  }
  const cardIds = new Set(lesson.learnCards.map((c) => c.id));
  if (lesson.quiz.pool.length < 13)
    errors.push(`${lesson.id}: quiz pool has ${lesson.quiz.pool.length}, needs >= 13`);
  const seen = new Set<string>();
  for (const q of lesson.quiz.pool) {
    if (seen.has(q.id)) errors.push(`${lesson.id}: duplicate question id ${q.id}`);
    seen.add(q.id);
    if (!cardIds.has(q.reviewCardId))
      errors.push(`${q.id}: reviewCardId "${q.reviewCardId}" does not match any learn card`);
    if (q.type === 'multiple-choice' || q.type === 'true-false') {
      if (!q.choices.some((c) => c.id === q.correctChoiceId))
        errors.push(`${q.id}: correctChoiceId "${q.correctChoiceId}" not in choices`);
    }
    if (q.type === 'sort') {
      const itemIds = new Set(q.items.map((i) => i.id));
      if (q.correctOrder.length !== q.items.length || !q.correctOrder.every((id) => itemIds.has(id)))
        errors.push(`${q.id}: correctOrder must be a permutation of item ids`);
    }
  }
  for (const card of lesson.learnCards) {
    if (card.widget && !(WIDGET_TYPES as readonly string[]).includes(card.widget.type))
      errors.push(`${card.id}: unknown widget type "${card.widget.type}"`);
  }
  return errors;
}
```

- [ ] **Step 4: Run to verify pass** — `npm test -- schema` → PASS.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: content schema with cross-reference validation"`

---

### Task 3: Standards data + subject assembly

**Files:**
- Create: `scripts/build-standards.mjs`, `src/content/standards/standards.json` (generated), `src/content/subjects.ts`, `src/content/math/index.ts`, `src/content/reading/index.ts`, `src/content/science/index.ts`, `src/content/subjects.test.ts`

**Interfaces:**
- Consumes: `docs/research/sc-grade4-standards.json`; `Unit`, `Subject`, `SubjectId` from Task 2.
- Produces:
  - `standards.json` shape: `{ [subjectId]: { document: { title: string; url: string }, indicators: { code: string; text: string; strand: string }[], units: { number: number; title: string; indicatorCodes: string[]; prerequisiteUnits: number[] }[] } }` with keys exactly `math`, `reading`, `science`.
  - `src/content/subjects.ts`: `export const SUBJECTS: Subject[]`; `export function getSubject(id: SubjectId): Subject`; `export function findLesson(lessonId: string): { subject: Subject; unit: Unit; lesson: Lesson } | null`; `export function allLessons(): Lesson[]`; `export function indicatorText(code: string): string | null`.
  - Each `src/content/<subject>/index.ts`: `export const lessonsByUnit: Record<string, Lesson[]>` (unit id → lessons; empty `{}` until content lands).

- [ ] **Step 1: Write the generator script**

`scripts/build-standards.mjs` reads `docs/research/sc-grade4-standards.json`, maps `bySubject.math|ela-reading|science` → keys `math|reading|science`, keeps `document.title/url`, `indicators[{code,text,strand}]`, `suggestedUnitSequence` → `units[{number,title,indicatorCodes,prerequisiteUnits}]`. **Reading exception (per spec §2):** drop the six `ELA.4.OE.*` codes from `indicators` and from any unit's `indicatorCodes` (they are cross-cutting habits, not unit content). Writes pretty-printed JSON to `src/content/standards/standards.json`. Run with `node scripts/build-standards.mjs`.

- [ ] **Step 2: Write failing assembly tests**

`src/content/subjects.test.ts`:

```ts
import { SUBJECTS, getSubject, findLesson, indicatorText } from './subjects';

test('three subjects with correct guides and unit counts', () => {
  expect(SUBJECTS.map((s) => s.id)).toEqual(['math', 'reading', 'science']);
  expect(getSubject('math').guide).toBe('nutty');
  expect(getSubject('math').units).toHaveLength(12);
  expect(getSubject('reading').units).toHaveLength(11);
  expect(getSubject('science').units).toHaveLength(8);
});
test('unit ids and prerequisites resolve', () => {
  for (const s of SUBJECTS) {
    const ids = new Set(s.units.map((u) => u.id));
    for (const u of s.units)
      for (const p of u.prerequisiteUnitIds) expect(ids.has(p)).toBe(true);
  }
});
test('reading units contain no OE codes', () => {
  const codes = getSubject('reading').units.flatMap((u) => u.indicatorCodes);
  expect(codes.some((c) => c.includes('.OE.'))).toBe(false);
});
test('indicator text lookup works', () => {
  expect(indicatorText('4.NR.1.1')).toMatch(/millions/i);
  expect(indicatorText('bogus')).toBeNull();
});
test('findLesson returns null for unknown id', () => {
  expect(findLesson('nope')).toBeNull();
});
```

- [ ] **Step 3: Run to verify fail**, then implement

`src/content/subjects.ts` builds `SUBJECTS` by mapping `standards.json` units to `Unit` objects: `id` = `${subjectId}-u${String(number).padStart(2, '0')}`, `prerequisiteUnitIds` mapped from `prerequisiteUnits` numbers, `lessons` = `lessonsByUnit[id] ?? []` from the subject's content module. Subject titles: `Math`, `Reading`, `Science`; guides and colors per Global Constraints. `findLesson` walks all subjects/units; `allLessons()` flattens; `indicatorText` scans all subjects' indicators.

- [ ] **Step 4: Run to verify pass** — `npm test -- subjects` → PASS.
- [ ] **Step 5: Commit** — `git commit -m "feat: standards data pipeline and subject assembly"`

---

### Task 4: Progress storage module

**Files:**
- Create: `src/progress/storage.ts`, `src/progress/storage.test.ts`

**Interfaces:**
- Consumes: nothing (pure, uses `window.localStorage` when available).
- Produces:

```ts
export type Attempt = { date: string; score: number; total: number; missedConceptTags: string[] };
export type LessonProgress = { status: 'in-progress' | 'passed'; bestScore: number; attempts: Attempt[] };
export type Settings = { soundOn: boolean; ttsOn: boolean };
export type SaveData = {
  version: 1;
  settings: Settings;
  lessons: Record<string, LessonProgress>;
  streak: { lastActiveDate: string; count: number };
  parentChecked: Record<string, boolean>;
};
export function defaultSave(): SaveData;
export function loadSave(): SaveData;                    // corrupt/missing -> defaultSave()
export function persist(save: SaveData): void;           // no-throw (quota/private mode swallowed)
export function recordAttempt(save: SaveData, lessonId: string, attempt: Attempt, passThreshold: number): SaveData; // pure; updates status/bestScore/attempts + streak (same-day no-op, next-day +1, gap resets to 1)
export function setParentChecked(save: SaveData, lessonId: string, checked: boolean): SaveData;
export function exportSave(save: SaveData): string;      // pretty JSON
export function importSave(json: string): SaveData;      // throws Error('invalid save file') on bad shape (Zod-checked)
export function storageAvailable(): boolean;
```

- [ ] **Step 1: Write failing tests** covering: roundtrip persist/load; corrupt JSON in localStorage → `defaultSave()`; `recordAttempt` marks `passed` at `score >= passThreshold` and keeps best score; failed-then-passed keeps both attempts; streak same-day/next-day/gap logic (pass `date` in attempts to control days); `importSave('{}')` throws; `importSave(exportSave(s))` roundtrips; `storageAvailable()` true in jsdom.
- [ ] **Step 2: Run to verify fail.**
- [ ] **Step 3: Implement** — internal Zod schema mirroring `SaveData`; `persist` wraps in try/catch; date compare via `yyyy-mm-dd` strings, day-diff computed with `Date.UTC` parse.
- [ ] **Step 4: Run to verify pass** — `npm test -- storage`.
- [ ] **Step 5: Commit** — `git commit -m "feat: versioned localStorage progress store with export/import"`

---

### Task 5: Mastery, readiness, and up-next logic

**Files:**
- Create: `src/progress/logic.ts`, `src/progress/logic.test.ts`

**Interfaces:**
- Consumes: `SaveData` (Task 4); `Subject`, `Unit`, `Lesson` (Task 2).
- Produces:

```ts
export function isLessonPassed(save: SaveData, lessonId: string): boolean;
export function lessonStars(p: LessonProgress | undefined): 0 | 1 | 2 | 3; // undefined/unpassed->0, 8->1, 9->2, 10->3 (of total 10)
export function isUnitComplete(save: SaveData, unit: Unit): boolean;       // all lessons passed; unit with 0 lessons is NOT complete
export function isUnitReady(save: SaveData, subject: Subject, unit: Unit): boolean;  // all prerequisite units complete (prereqs with no lessons yet are treated as complete so future content can't block current play)
export function isLessonReady(save: SaveData, subject: Subject, lesson: Lesson): boolean; // its unit ready AND previous lesson in unit passed (first lesson: unit ready)
export function upNext(save: SaveData, subject: Subject): Lesson | null;   // first ready-but-unpassed lesson in unit order
export function subjectCompletion(save: SaveData, subject: Subject): { passed: number; total: number };
```

- [ ] **Step 1: Write failing tests** with a small fixture subject (2 units × 2 lessons, unit 2 requires unit 1): fresh save → `upNext` = u1-l1, l2 not ready; pass l1 → l2 ready; pass both → unit complete, u2-l1 ready and is `upNext`; all passed → `upNext` null; star boundaries 7/8/9/10 → 0/1/2/3; empty-lesson prereq unit treated complete.
- [ ] **Step 2: Run to verify fail.** **Step 3: Implement** (pure functions, no React). **Step 4: Verify pass.**
- [ ] **Step 5: Commit** — `git commit -m "feat: mastery, readiness, and up-next progression logic"`

---

### Task 6: Quiz engine

**Files:**
- Create: `src/quiz/engine.ts`, `src/quiz/engine.test.ts`

**Interfaces:**
- Consumes: `Question` (Task 2).
- Produces:

```ts
export type Answer = string | string[];  // choiceId | typed text | ordered item ids
export type MissGroup = { conceptTag: string; reviewCardId: string; count: number };
export type QuizResult = { score: number; total: number; missed: MissGroup[] };
export function sampleQuiz(pool: Question[], n?: number, rng?: () => number): Question[]; // default n=10; Fisher-Yates with injected rng; throws if pool < n
export function shuffleChoices<T extends Question>(q: T, rng?: () => number): T;          // shuffles choices/items order only
export function gradeAnswer(q: Question, answer: Answer): boolean;
export function buildResult(questions: Question[], answers: Answer[]): QuizResult;        // missed grouped by conceptTag, count desc
export function normalizeText(s: string): string;  // trim, lowercase, collapse spaces, strip commas — used for fill-blank
```

- [ ] **Step 1: Write failing tests**: `sampleQuiz` returns 10 unique questions, deterministic with seeded rng (`rng = () => 0.42` style sequence), throws on pool of 9; grading per type — choice right/wrong, fill-blank accepts `" 1,204 "` for accepted `["1204"]` via `normalizeText`, sort exact order only; `buildResult` groups two misses with same conceptTag into one group with count 2, sorted by count desc; score = total - missed counts.
- [ ] **Step 2: Verify fail.** **Step 3: Implement.** **Step 4: Verify pass.**
- [ ] **Step 5: Commit** — `git commit -m "feat: quiz engine (sampling, grading, miss grouping)"`

---

### Task 7: Character system

**Files:**
- Create: `src/characters/Character.tsx`, `src/characters/art/Nutty.tsx`, `src/characters/art/Winnie.tsx`, `src/characters/art/Sandy.tsx`, `src/characters/SpeechBubble.tsx`, `src/characters/DialoguePlayer.tsx`, `src/characters/Character.test.tsx`

**Interfaces:**
- Consumes: `GuideId`, `Pose`, `DialogueLine` (Task 2); `motion.ts` (Task 1).
- Produces:
  - `<Character guide={GuideId} pose={Pose} size={number} />` — renders the SVG cast member; `data-testid="character-{guide}"`, `data-pose={pose}`.
  - `<SpeechBubble>{children}</SpeechBubble>` — animated bubble (scale/fade in via `popVariants`).
  - `<DialoguePlayer lines={DialogueLine[]} onDone={() => void} />` — shows one line at a time with character + bubble; "Next" advances (`aria-label="Next"`); calls `onDone` after last line.

- [ ] **Step 1: Art components.** Each art file exports `{ pose }: { pose: Pose }` → inline `<svg viewBox="0 0 200 200">` original character (~30–60 shapes): Nutty = orange-brown fox squirrel with big tail + acorn; Winnie = round brown wren, perky tail; Sandy = green loggerhead with patterned shell. Pose changes eyes/mouth/limbs: `cheer` = arms up + open smile, `think` = hand to chin + raised brow, `oops` = flat mouth + droop, `talk` = open mouth, `idle` = neutral. Wrap pose-varying groups in `<motion.g>` springs. Keep each art component under ~150 lines; shared eye/mouth helpers per file.
- [ ] **Step 2: Write failing tests**: `Character` renders correct testid/pose attr for each guide; `DialoguePlayer` with 2 lines shows line 1 text, click Next → line 2, click Next → `onDone` called once.
- [ ] **Step 3: Implement `Character`, `SpeechBubble`, `DialoguePlayer`.** `DialoguePlayer` keys the bubble by line index inside `<AnimatePresence mode="wait">` so lines animate through; speaker `'kid'` renders bubble right-aligned without a character.
- [ ] **Step 4: Verify pass** — `npm test -- Character`. Visual check happens in Task 14.
- [ ] **Step 5: Commit** — `git commit -m "feat: SVG character cast with poses, speech bubbles, dialogue player"`

---

### Task 8: App shell, routing, Home, Subject Map

**Files:**
- Create: `src/progress/ProgressContext.tsx`, `src/screens/Home.tsx`, `src/screens/SubjectMap.tsx`, `src/screens/SubjectMap.test.tsx`
- Modify: `src/App.tsx`, `src/main.tsx`

**Interfaces:**
- Consumes: Tasks 3–7.
- Produces:
  - `ProgressProvider` + `useProgress(): { save: SaveData; recordAttempt(lessonId, attempt, passThreshold): void; setParentChecked(lessonId, checked): void; updateSettings(partial): void; importJson(json: string): void; reset(): void }` — thin React state wrapper over Task 4 pure functions; persists on every change.
  - Routes (HashRouter): `/` Home, `/subject/:subjectId` SubjectMap, `/lesson/:lessonId` (Task 9), `/lesson/:lessonId/quiz` (Task 11), `/progress` + `/parent` (Task 13). Route transitions via `<AnimatePresence>` + `pageVariants`.

- [ ] **Step 1: Implement ProgressProvider** (useState + useEffect persist; context throws if used outside provider).
- [ ] **Step 2: Home screen** — big title, streak flame + count, three subject portal cards (character + subject title + completion fraction via `subjectCompletion`), each a `motion` button navigating to the map; footer links to My Progress and Parent Corner.
- [ ] **Step 3: SubjectMap screen** — vertical path of unit sections; each unit shows number/title and its lesson nodes as circles: passed = filled + stars, ready = accent ring + pulse on the `upNext` lesson ("START HERE" badge), not-ready = grey with lock badge but **still clickable** (soft lock — navigates with `?peek=1`); nodes link to `/lesson/:id`. Unit with no lessons renders "Coming soon" chip. Guide character sits beside the current unit.
- [ ] **Step 4: Write + pass tests** (`SubjectMap.test.tsx`): render map with fixture save where u1-l1 passed → u1-l2 shows START HERE; not-ready lesson node still has an accessible link role. Run `npm test -- SubjectMap` → PASS.
- [ ] **Step 5: Commit** — `git commit -m "feat: app shell, progress context, home and subject map screens"`

---

### Task 9: Lesson player + read-aloud + widget frame

**Files:**
- Create: `src/lesson/LessonPlayer.tsx`, `src/lesson/LearnCard.tsx`, `src/lesson/ReadAloudButton.tsx`, `src/widgets/WidgetFrame.tsx`, `src/widgets/registry.ts`, `src/lesson/LessonPlayer.test.tsx`

**Interfaces:**
- Consumes: `findLesson` (Task 3), `DialoguePlayer`/`Character` (Task 7), `useProgress` (Task 8), `cardVariants` (Task 1).
- Produces:
  - Route `/lesson/:lessonId`: stage machine `intro → card 0..n → worked-example → outro` with Back/Next; progress dots; final button "Start Quick Check ✓" → `/lesson/:id/quiz`. `?peek=1` shows a dismissible "Not ready yet — this is a sneak peek!" banner. Supports `?card=<cardId>` to jump directly to a card (used by review links).
  - `registry.ts`: `export const widgetRegistry: Record<string, React.LazyExoticComponent<React.ComponentType<WidgetProps>>>` and `export type WidgetProps = { config: Record<string, unknown> }` — keys must cover every `WIDGET_TYPES` entry (asserted by test).
  - `WidgetFrame` — error boundary + `<Suspense>`; on error renders "This experiment is napping 😴" card; never blocks Next.
  - `ReadAloudButton text={string}` — Web Speech API, feature-detected (hidden if unavailable), stops previous utterance on click.

- [ ] **Step 1: Write failing tests**: renders lesson intro dialogue; advancing past intro shows first learn card title; `?card=` deep-link lands on that card; registry covers `WIDGET_TYPES` (`Object.keys(widgetRegistry)` ⊇ `WIDGET_TYPES`) — this test fails until Task 10 fills the registry, so mark it `test.todo` here and enable in Task 10.
- [ ] **Step 2: Verify fail.** **Step 3: Implement** all five files. LearnCard renders `blocks` (kind `tip` = highlighted callout, `example` = boxed) with a tiny `**bold**`/newline renderer (no markdown dep) + `ReadAloudButton` with the card's concatenated text; card dialogue lines render above blocks via `DialoguePlayer` sans onDone gating.
- [ ] **Step 4: Verify pass** — `npm test -- LessonPlayer`.
- [ ] **Step 5: Commit** — `git commit -m "feat: lesson player with dialogue, learn cards, read-aloud, widget frame"`

---

### Task 10: Pilot widgets (place-value builder, number-line compare)

**Files:**
- Create: `src/widgets/math/PlaceValueBuilder.tsx`, `src/widgets/math/NumberLineCompare.tsx`, `src/widgets/math/widgets.test.tsx`
- Modify: `src/widgets/registry.ts` (register both), `src/lesson/LessonPlayer.test.tsx` (enable registry-coverage test)

**Interfaces:**
- Consumes: `WidgetProps` (Task 9).
- Produces:
  - `place-value-builder` config `{ target?: number; periods?: 2 | 3 }`: tap +/− digit buttons per place (ones→hundred-millions per `periods`); live readout shows standard, word, and expanded form of the built number; if `target` set, celebrates (`data-state="matched"`, character-free confetti burst via Framer) when built number === target.
  - `number-line-compare` config `{ min: number; max: number; a: number; b: number }`: draggable markers for two numbers on an SVG line (Framer `drag="x"` with keyboard +/- buttons for a11y); child chooses `<`, `=`, `>` buttons; `data-state="correct"|"incorrect"` after choice.
- [ ] **Step 1: Write failing tests**: PlaceValueBuilder with target 340 → tap hundreds +3, tens +4 → readout shows "340" and `data-state="matched"`; expanded form shows "300 + 40". NumberLineCompare a=25 b=52 → click `<` → `data-state="correct"`; click `>` first → `incorrect`.
- [ ] **Step 2: Verify fail.** **Step 3: Implement + register** both in `widgetRegistry` via `React.lazy`. Enable the registry-coverage test from Task 9.
- [ ] **Step 4: Verify pass** — `npm test -- widgets && npm test -- LessonPlayer`.
- [ ] **Step 5: Commit** — `git commit -m "feat: place-value builder and number-line compare widgets"`

---

### Task 11: Quick Check + Results/review screens

**Files:**
- Create: `src/quiz/QuickCheck.tsx`, `src/quiz/QuestionCard.tsx`, `src/quiz/Results.tsx`, `src/quiz/QuickCheck.test.tsx`

**Interfaces:**
- Consumes: engine (Task 6), `useProgress` (Task 8), `findLesson` (Task 3), characters (Task 7).
- Produces: route `/lesson/:lessonId/quiz` flow:
  1. `sampleQuiz(pool, 10)` once on mount (choices shuffled per question).
  2. One `QuestionCard` at a time (`AnimatePresence mode="wait"`, `cardVariants`); progress bar `i/10` animates width. Answer interaction per type: choice buttons; fill-blank text input + Check button; sort = tap items in order (tapped items number themselves, Reset link).
  3. On answer: locks input, shows instant feedback — correct: green flash, guide `cheer`, "Nice! ✓"; incorrect: red shake, guide `oops`, the `explanation` line. "Next" continues.
  4. After Q10 → Results inline: animated score ring, stars via `lessonStars`, confetti (~40 falling `motion.div`s, skipped under reduced motion) if `score >= passThreshold`; guide cheers. Misses from `buildResult` listed as "Things to review" cards — conceptTag label + **"Review this"** button → `/lesson/:id?card=<reviewCardId>`. Buttons: "Try again" (fresh sample) and "Back to map".
  5. On finish, exactly one `recordAttempt(lessonId, { date: today, score, total: 10, missedConceptTags }, passThreshold)`.
- [ ] **Step 1: Write failing tests** (deterministic: fixture lesson via a test route wrapper, seeded rng exposed as optional prop on `QuickCheck`): answering all 10 correctly → "10/10", pass state recorded in context (assert via probe component reading `useProgress`); answering with 3 misses of same conceptTag → Results shows one review group with "Review this" link containing `card=` param; explanation text shown after a wrong answer.
- [ ] **Step 2: Verify fail.** **Step 3: Implement.** **Step 4: Verify pass** — `npm test -- QuickCheck`.
- [ ] **Step 5: Commit** — `git commit -m "feat: quick check flow with instant feedback and review-linked results"`

---

### Task 12: Pilot content — Math Unit 1 + content validation suite

**Files:**
- Create: `src/content/math/u01.ts`, `src/content/content-validation.test.ts`
- Modify: `src/content/math/index.ts` (export u01 lessons in `lessonsByUnit`)

**Interfaces:**
- Consumes: schema (Task 2), widgets (Task 10) — content only references `place-value-builder` and `number-line-compare`.
- Produces: `math-u01` ("Place Value and Whole Number Relationships") with two complete lessons appearing in the app.

- [ ] **Step 1: Write the content validation suite** (this suite is permanent — Plan C content must also pass it):

```ts
import { allLessons, SUBJECTS } from './subjects';
import { validateLesson } from './schema';

test('every authored lesson passes cross-reference validation', () => {
  const errors = allLessons().flatMap(validateLesson);
  expect(errors).toEqual([]);
});
test('every authored lesson belongs to a real unit and covers its indicators only', () => {
  for (const s of SUBJECTS)
    for (const u of s.units)
      for (const l of u.lessons) {
        expect(l.unitId).toBe(u.id);
        for (const code of l.indicatorCodes) expect(u.indicatorCodes).toContain(code);
      }
});
test('units with lessons cover all their indicators', () => {
  for (const s of SUBJECTS)
    for (const u of s.units) {
      if (u.lessons.length === 0) continue;
      const covered = new Set(u.lessons.flatMap((l) => l.indicatorCodes));
      for (const code of u.indicatorCodes) expect(covered).toContain(code);
    }
});
```

- [ ] **Step 2: Author `u01.ts`** — two lessons grounded in the verbatim indicator text in `src/content/standards/standards.json`:
  - `math-u01-l01` "Numbers to the Millions" (indicator `4.NR.1.1`): intro dialogue (Nutty, 3–4 lines, acorn-stash framing); learn cards: `-c1` periods & place-value chart (widget `place-value-builder`, `{ periods: 3 }`), `-c2` standard ↔ word form, `-c3` expanded form as an equation (widget `place-value-builder`, `{ target: 4302 }`); worked example converting 68,405,013 across all three forms; quiz pool ≥ 13 spread across conceptTags `place-value`, `word-form`, `expanded-form` (mix of multiple-choice + fill-blank; every question's `reviewCardId` points at the card teaching that concept; explanations kid-voiced, one sentence).
  - `math-u01-l02` "Comparing and Ordering Big Numbers" (indicator `4.NR.1.3`): intro dialogue; learn cards: `-c1` comparing digit-by-digit (widget `number-line-compare`, `{ min: 0, max: 100, a: 25, b: 52 }`), `-c2` the `<` `>` symbols (alligator-mouth mnemonic), `-c3` ordering three numbers ascending/descending; worked example ordering 91,204 / 89,999 / 91,240; quiz pool ≥ 13 across conceptTags `compare-symbols`, `ordering` (multiple-choice + sort questions using `correctOrder`).
- [ ] **Step 3: Run full suite** — `npm test` → ALL PASS (validation suite + everything prior).
- [ ] **Step 4: Play it** — `npm run dev`, click through Home → Math → lesson 1 → quiz end-to-end in the browser.
- [ ] **Step 5: Commit** — `git commit -m "feat: pilot math unit 1 content with permanent validation suite"`

---

### Task 13: My Progress + Parent Corner

**Files:**
- Create: `src/screens/ProgressScreen.tsx`, `src/screens/ParentCorner.tsx`, `src/screens/ParentCorner.test.tsx`
- Modify: `src/App.tsx` (wire routes `/progress`, `/parent`)

**Interfaces:**
- Consumes: `useProgress`, logic (Task 5), `exportSave`/`importSave` (Task 4), `SUBJECTS` (Task 3).
- Produces:
  - `/progress`: per-subject completion bars (animated), total stars, streak, badge row (badges derived, not stored: `first-pass`, `perfect-10`, `unit-complete`, `streak-3`, `streak-7`).
  - `/parent`: plain styling; per-lesson spot-check table (lesson title, status, checkbox bound to `setParentChecked`); Export button downloads `cramall-progress.json` (Blob link); Import via `<input type="file">` → `importJson` with success/error message; Reset button with typed confirmation ("type RESET"); link to the design spec's standards source URL list.
- [ ] **Step 1: Write failing tests**: ParentCorner checkbox toggles `parentChecked` in save; import of invalid JSON shows error message and leaves save unchanged; reset requires typing RESET before the button enables.
- [ ] **Step 2: Verify fail.** **Step 3: Implement both screens.** **Step 4: Verify pass** — `npm test -- ParentCorner`.
- [ ] **Step 5: Commit** — `git commit -m "feat: progress screen and parent corner (export/import/reset, spot-check list)"`

---

### Task 14: Builds, browser verification, README

**Files:**
- Create: `README.md`
- Modify: `.gitignore` (`dist/`, `dist-single/`, `node_modules/`)

**Interfaces:**
- Consumes: everything.
- Produces: verified `dist/` and `dist-single/index.html`; README covering: what this is, `npm run dev`, both build commands, how to open the single file, where content lives and how to add a lesson, how progress storage/export works.

- [ ] **Step 1: Full gate** — `npm test` → all pass; `npm run build` → clean; `npm run build:single` → emits ONE `dist-single/index.html` (no sibling asset files).
- [ ] **Step 2: Browser-verify the real app** (use the browser tools): serve `dist/`, click Home → Math map → lesson → complete quiz with ≥8 correct → confetti + "Review this" absent; reload → progress persisted; then open `dist-single/index.html` from disk and repeat the smoke path. Fix anything broken before proceeding.
- [ ] **Step 3: Write README, commit** — `git add -A && git commit -m "feat: production + single-file builds, README"`

---

## Optional user checkpoints (learning mode — non-blocking)

Defaults ship in the tasks above; the user may replace either with their own 5–10 lines afterward:
1. **`lessonStars` curve** (`src/progress/logic.ts`) — how generous stars feel is a parenting call (current: 8→1★, 9→2★, 10→3★).
2. **Badge rules** (`src/screens/ProgressScreen.tsx`) — which achievements get celebrated.

## Self-review notes

- Spec coverage: §4 stack→T1; §5 schema/architecture→T2–T3; §8 storage→T4; §7 mastery/up-next→T5; quiz mechanics→T6, T11; §6 characters/animations→T1, T7, T11; §7 screens→T8, T9, T13; widgets contract + MVP→T9, T10; §9 validation suites→T2, T12; §10 error handling→T9 (WidgetFrame), T4 (storage fallback); builds→T1, T14; read-aloud→T9. Deferred by design: full widget library (Plan B), full content + generation workflow and full-coverage indicator test (Plan C).
- Type consistency: `recordAttempt(save, lessonId, attempt, passThreshold)` (T4) matches context wrapper (T8) and QuickCheck usage (T11); `WidgetProps` defined once in T9's registry and consumed in T10; `lessonStars(p: LessonProgress | undefined)` consistent T5/T11/T13.
- No unresolved placeholders: content-authoring steps (T12) specify exact ids, indicators, conceptTags, widgets, and pool sizes; the permanent validation suite enforces them.
