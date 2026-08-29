# Cram All — SC Grade 4 Independent Learning Site — Design Spec

**Date:** 2026-08-29
**Status:** Approved design, pending spec review

## 1. Purpose

A website that equips a 4th grader (2026–27 school year) to learn the current South
Carolina standards for **math, reading (ELA), and science** independently. Lessons build
on prior knowledge in a guided path, teach through character-led dialogue
(Duolingo-style), reinforce concepts with tactile in-browser experiments, and close each
lesson with a 10-question Quick Check that gives immediate feedback and tells her exactly
what to review. All progress lives in the browser (no accounts, no backend).

**Users:** one learner (the student) and one maintainer (the parent, who reviews and
edits content).

## 2. Standards basis (verified 2026-08-29 against ed.sc.gov)

| Subject | Document | Grade-4 scope |
|---|---|---|
| Math | 2025 SC CCR Mathematics Standards (approved Dec 2023, Emended July 2026) | 33 indicators, 4 strands (NR, PAFR, MGSR, DPSR) |
| Reading | 2024 SC CCR ELA Standards (approved Jan 2023, Emended Aug 2025) — reading strands | 20 unit-assignable indicators (F, AOR, R) + 6 cross-cutting OE expectations |
| Science | SC CCR Science Standards 2021 | 14 performance expectations (PS3, PS4, LS1, ESS1–3) |

Full verbatim indicator text, source URLs, and suggested unit sequences:
[docs/research/sc-grade4-standards.json](../../research/sc-grade4-standards.json).
The six `ELA.4.OE.*` Overarching Expectations are embedded as habits across all reading
lessons (per the standards document), not assigned to units. The ELA Written and Oral
Communications strand (writing/grammar) is out of scope per the reading focus.

## 3. Curriculum map

31 units total; each unit contains 2–4 lessons (one lesson per indicator or tight
indicator cluster), **~90 lessons** overall. Unit order and prerequisites follow the
`suggestedUnitSequence` in the research JSON:

- **Math (12 units):** Place Value → Add/Subtract & Estimation → Factors, Primes &
  Patterns → Multi-Digit Multiplication → Division & Multi-Step Problems → Fraction
  Equivalence → Fraction Operations → Decimals → Measurement → Perimeter & Area →
  Classifying Shapes → Data & Probability.
- **Reading (11 units):** Fluency & Reading Habits → Word Study (roots/affixes/context
  clues) → Story Elements → Theme → Central Idea → Summarizing → Text Structures &
  Features → Author's Purpose & Claims → Point of View → Poetry, Drama & Figurative
  Language → Research & Source Evaluation.
- **Science (8 units):** Energy & Motion → Energy Transfer → Waves & Light → Sending
  Messages (patterns/codes) → Energy Conversion Design Challenge → Plant & Animal
  Structures → Earth's Changing Landscapes → Natural Resources & Hazards.

## 4. Tech stack

- **React 18 + Vite + TypeScript**, Framer Motion for animation, Vitest (+ React Testing
  Library) for tests. Zod for content-schema validation.
- **No backend.** Pure static output.
- **Builds:** `npm run build` → static `dist/` (hostable anywhere later);
  `npm run build:single` (vite-plugin-singlefile) → one self-contained HTML file that
  runs by double-clicking, since plain Vite builds don't run from `file://`.

## 5. Architecture

Content-as-data with a generic renderer. One `LessonPlayer` renders every lesson from a
typed data file; interactive widgets are a reusable library referenced by name.

```
src/
  app/            routes, layout, theme, transitions
  characters/     SVG character components + pose/dialogue system
  widgets/        interactive manipulatives (shared contract)
  lesson/         LessonPlayer, LearnCard, WorkedExample
  quiz/           QuickCheck engine, results/review screen
  progress/       storage module, mastery/unlock logic, awards
  content/
    schema.ts     Zod schemas for Subject/Unit/Lesson/Question
    standards/    indicator data (from research JSON)
    math/  reading/  science/   one .ts data file per lesson
  test/
```

### Content model (Zod-validated)

- **Subject** → **Unit** `{ id, title, indicatorCodes, prerequisiteUnitIds, lessons[] }`
- **Lesson** `{ id, title, indicatorCodes, guide, intro (dialogue lines), learnCards[],
  workedExample, quiz }`
- **LearnCard** `{ id, title, dialogue[], body (rich blocks), widget? { type, config } }`
- **Quiz** `{ passThreshold: 8, pool: Question[] }` — pool ≥ 13 questions; each attempt
  samples 10, so retakes differ.
- **Question** `{ id, type: 'multiple-choice' | 'true-false' | 'sort' | 'fill-blank',
  prompt, choices/answer, explanation, conceptTag, reviewCardId }` — `reviewCardId` must
  reference a real learn card in the same lesson (enforced by a validation test).

### Widgets (tactile experiments)

Common contract: `({ config, onEvent }) => JSX`; lessons embed them via
`widget: { type, config }`. Target library (built in phases, MVP set first):

- **Math:** base-10 blocks, place-value chart, number line (whole/fraction/decimal),
  fraction bars & circles, area-model multiplier, array builder, money counter,
  clock/elapsed-time, quarter-inch ruler, balance scale, shape classifier, bar-graph &
  dot-plot builder, probability spinner.
- **Science:** collision ramp simulator, circuit/energy-transfer builder, wave maker,
  light-reflection eye model, Morse/binary message sender, energy-conversion device
  designer, animal-structure matcher, erosion simulator, rock-layer explorer, topographic
  map explorer, hazard-solution designer, resource sorter.
- **Reading:** word-root builder (morphology tiles), context-clue detective,
  story-elements mapper, theme evidence collector, central-idea organizer, text-structure
  sorter, summary builder, POV switcher, figurative-language matcher, source-credibility
  checker.

## 6. Characters & feel (Duolingo-style)

Original SC-native cast, drawn as SVG components with poses (idle, talk, think, cheer,
oops) and speech bubbles that narrate lessons:

- **Winnie the Wren** (Carolina wren, state bird) — reading guide
- **Sandy the Loggerhead** (state reptile) — science guide
- **Nutty the Fox Squirrel** — math guide (acorn counters)

Characters react to answers: bounce/confetti on correct, gentle encouragement on misses
(never punitive). Framer Motion drives slide/fade screen transitions, springy buttons,
animated progress bars, star/streak counters, and quiz card transitions.
`prefers-reduced-motion` disables non-essential motion. Kid-friendly rounded typography
(Nunito/Baloo family with system fallbacks), high-contrast palette, large touch targets
(tablet-friendly). A **read-aloud button** (Web Speech API) on learn cards and questions
supports independent reading. Display name "Cram All" is a one-line config.

## 7. Screens & flow

1. **Home** — pick subject (character portals), streak + total stars.
2. **Subject map** — vertical unit path with lesson nodes; "up next" highlighted.
   Soft locks: un-ready lessons are peekable but badged "Not ready yet — finish X first."
3. **Lesson player** — intro dialogue → learn cards (with widgets) → worked example →
   Quick Check launch.
4. **Quick Check** — one question per card; answer locks in, immediate right/wrong +
   one-line explanation, then Next.
5. **Results** — score, stars, confetti on pass (≥ 8/10); misses grouped by
   `conceptTag` with **"Review this"** buttons deep-linking to the exact learn card;
   retake button (new sample from pool).
6. **My progress** — per-subject completion, badges, streak.
7. **Parent corner** (footer link) — content spot-check checklist (lesson-by-lesson
   review status stored locally), progress export/import, reset.

**Mastery/unlock logic:** a lesson is `passed` at ≥ 8/10. A lesson is `ready` when the
previous lesson in its unit is passed; a unit is `ready` when all prerequisite units are
fully passed. "Up next" = first ready-but-unpassed lesson in unit order.

## 8. Progress storage

Single storage module (`progress/storage.ts`) over `localStorage`, JSON-serialized,
versioned key `cramall.v1`: learner settings, per-lesson
`{ status, bestScore, attempts[{ date, score, missedConceptTags }] }`, stars, streak,
parent-review flags. Export/import as a downloadable/pickable JSON file. All access goes
through the module, so swapping to IndexedDB later touches one file. Storage failures
(private mode) degrade gracefully to in-memory with a visible notice.

## 9. Content generation & quality

Lesson content is generated by schema-validated workflow agents (one per unit), each
grounded in the verbatim indicator text from the research JSON. Machine checks (run as
Vitest suites):

- every indicator in the research JSON is covered by ≥ 1 lesson;
- every lesson's quiz pool has ≥ 13 questions, every `reviewCardId`/`conceptTag`
  resolves, exactly one correct answer per question;
- every referenced widget type exists.

Human check: the Parent corner checklist tracks which lessons the parent has spot-checked
for accuracy and age-appropriateness.

## 10. Testing & error handling

- Vitest: quiz engine (sampling, scoring, feedback mapping), mastery/unlock logic,
  storage (roundtrip, version migration, quota/private-mode fallback), content
  validation suites above.
- React error boundary around widgets: a broken widget shows a friendly "experiment is
  napping" card and never blocks the lesson or quiz.
- TTS and localStorage feature-detected; site fully usable without either.

## 11. Out of scope

Accounts/auth, backend sync, multi-device progress, other grade levels (the content model
is grade-agnostic so more grades can be added later), ELA writing/grammar strand,
teacher dashboards.
