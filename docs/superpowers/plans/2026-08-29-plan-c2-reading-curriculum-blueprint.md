# Cram All Plan C2: Full-Year Reading Curriculum Blueprint

> **Status:** Tracked curriculum blueprint; not an executable implementation plan. Source work is blocked until all four exact tracked literal wave plans in **Promotion Blocker and Literal-Wave Split** exist and pass their own writing-plans reviews.

**Goal:** Freeze the complete Grade 4 Reading/ELA curriculum contract: 24 lessons in 11 units covering all 20 regular Reading indicators while embedding all six Overarching Expectations as cross-cutting habits.

**Architecture:** Reading remains authored content-as-data: one `uNN.ts` module and focused `uNN.test.ts` per unit. Unit 1 is already registered and visible from `05b46b9`; its subsequently deepened source and answers are preserved and independently revalidated. Four fully literal wave plans own lesson source and tests; Plan C master Tasks C4 and C9 extend the existing registry and own final release. Eleven direct-fit lessons use exact static refs from the final Plan B Reading contracts; the other 13 omit a widget rather than forcing an interaction that does not match the indicator.

**Tech Stack:** React 18 content model, TypeScript 5, Zod 3, Vitest 2, Vite 5; no new dependency.

**Spec:** `docs/superpowers/specs/2026-08-29-cram-all-design.md`

## Global Constraints

- Do not begin until the accepted Plan A remediation is committed and `npm test && npx tsc -b --pretty false && npm run build` is green.
- Do not begin until Plan B is complete and its final `WidgetRefSchema`, `WIDGET_TYPES`, `widgetRegistry`, and Reading subject plan have been read. This plan’s 11 literal refs must parse that final strict schema unchanged; do not improvise additional keys or substitute a type.
- Plan C shared contracts must already expose `READING_OE_CODES`, the complete `PLANNED_LESSONS` manifest, `Lesson.crossCuttingExpectationCodes`, and permanent catalog validation. This subject plan does not edit those shared contracts.
- `src/content/reading/u01.ts` and `u01.test.ts` from commits `a63a388` and `5fae7cb` are accepted existing work, registered by `05b46b9`, and deepened by `d91a1b3`. Preserve their learner prose, source-before-question sequence, persistent references, inline checks, and answer corrections; the C2a wave may add only the shared OE field/import needed by the final contract and revalidate them. Plan C master Task C4 extends the existing registry with later units.
- Every Reading lesson uses `guide: 'winnie'` indirectly through the Reading subject and every authored intro line uses Winnie. Do not add an unsupported per-lesson `guide` field if the final schema still obtains the guide from the subject.
- Every lesson has exactly 3 cards, exactly 13 questions named `q01`–`q13`, `passThreshold: 8`, at least 2 pedagogically natural question types, unique normalized visible options, and balanced multiple-choice answer positions.
- Within a lesson, each of the 3 exact `conceptTag` values maps to exactly one card, and every card is targeted by at least one question. No tag is reused for another card in that lesson.
- Every lesson has `indicatorCodes` containing only the regular code(s) in its manifest row. `ELA.4.OE.1`–`ELA.4.OE.6` never appear in `indicatorCodes`; every lesson declares the exact six-code `crossCuttingExpectationCodes` source of truth.
- OE habits are visible in ordinary reading work: sustained/varied reading, written/visual/digital connections where present, inference, evidence, and an accepted response format. OE.4 is represented only by an optional off-app partner move or by reading and accurately restating a supplied response before answering; never claim the app listened, measured oral fluency, supplied a live collaborator, or assessed a recording.
- All passages, source packets, poems, and drama excerpts are newly written for Cram All. Do not adapt recognizable copyrighted characters, plots, poems, lyrics, textbook passages, or paywalled/news prose. Common facts must be expressed in original language.
- Questions must be answerable from card prose and the self-contained prompt. A widget may not hold required evidence. Use only the 11 exact refs in the manifest; every other lesson is intentionally widget-free.
- Do not force `sort` or `fill-blank` questions. Use `sort` only for a genuine order and `fill-blank` only when a short exact response is natural.
- Wave authors modify only their assigned `src/content/reading/uNN.ts` and `uNN.test.ts`. They do not create a Reading-specific helper and do not edit `src/content/reading/index.ts` or `index.test.ts`; Plan C master owns `src/content/unit-test-helpers.ts`, both Reading index files, schema, curriculum manifest, shared validation, standards JSON, and release work.
- Every green gate includes the focused Reading test, permanent schema/content gates, and `npx tsc -b --pretty false`.

---

## Exact Files and Interfaces

**Wave-owned source/test targets:** C2a modifies `src/content/reading/u01.ts` and `u01.test.ts` only for OE wiring/revalidation, and creates `u02.ts`, `u02.test.ts`, `u03.ts`, and `u03.test.ts`. C2b creates `u04.ts`–`u07.ts` and matching tests; C2c creates `u08.ts`–`u10.ts` and matching tests; C2d creates `u11.ts` and `u11.test.ts`.

**Master-owned, read-only to every Reading wave:** `src/content/schema.ts`, `src/content/curriculum.ts`, `src/content/unit-test-helpers.ts`, `src/content/content-validation.test.ts`, `src/content/reading/index.ts`, and `src/content/reading/index.test.ts`. Master Task C1 produces `READING_OE_CODES: readonly string[]`, `PlannedLesson`, `PLANNED_LESSONS`, optional `Lesson.crossCuttingExpectationCodes?: string[]`, `PlannedUnitLesson`, and `expectUnitLessons(lessons: readonly Lesson[], expected: readonly PlannedUnitLesson[], subject: SubjectId): void`. Master Task C4 alone produces the 11-key `lessonsByUnit: Record<string, Lesson[]>` registry and its index test.

**Wave outputs:** `unit01Lessons` through `unit11Lessons`, each exported as a `Lesson[]` from its matching `src/content/reading/uNN.ts`, plus a focused `uNN.test.ts`. Unit tests consume the master helper and add unit-local literal assertions for exact card titles/tags, q01–q13 type/tag/card routing, normalized option uniqueness, answer balance, widget `{type, config}` parsing, original-text provenance, and instructional boundaries. No wave creates a helper, index, shared contract, generated file, widget file, or cross-subject file.

## Complete Production Code Pattern

The first new lesson is shown completely so the C2a literal wave has an exact schema-valid pattern, including 3 cards, 13 questions, four natural question types, one tag per card, balanced multiple-choice answer positions, OE metadata, Winnie dialogue, original prose, and the exact `word-root-builder` ref on card 2. Later literal wave plans must replace every learner-facing literal with their own exact manifest row and original-text brief; they do not copy the word-study answers.

```ts
// opening of src/content/reading/u02.ts
import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit02Lessons = [
  {
    id: 'reading-u02-l01',
    unitId: 'reading-u02',
    title: 'Build Meaning with Roots, Base Words, and Affixes',
    indicatorCodes: ['ELA.4.AOR.9.1'],
    crossCuttingExpectationCodes: [...READING_OE_CODES],
    intro: [
      { speaker: 'winnie', pose: 'talk', text: 'Long words often contain smaller parts that carry meaning.' },
      { speaker: 'winnie', pose: 'think', text: 'A root or base gives the core idea, while a prefix or suffix can adjust it.' },
      { speaker: 'winnie', pose: 'cheer', text: 'Let’s build a meaning, then check that meaning in a real sentence.' },
    ],
    learnCards: [
      {
        id: 'reading-u02-l01-c1',
        title: 'Build Words from Meaningful Parts',
        blocks: [
          { kind: 'text', text: 'A base word can stand alone. An affix joins a base or root: a prefix comes before it, and a suffix comes after it.' },
          { kind: 'example', text: 'In rebuild, re- means again and build is the base word, so rebuild means build again.' },
          { kind: 'tip', text: 'Name each part and its meaning before combining them.' },
        ],
      },
      {
        id: 'reading-u02-l01-c2',
        title: 'Use Roots to Unlock Meaning',
        blocks: [
          { kind: 'text', text: 'Many Greek and Latin roots appear in grade-level science, history, and literature. The root port means carry.' },
          { kind: 'example', text: 'Portable describes something that can be carried. Transport means carry from one place to another.' },
          { kind: 'tip', text: 'A root gives a useful clue, but the full word decides the precise meaning.' },
        ],
        widget: {
          type: 'word-root-builder',
          config: {
            root: 'port',
            prefixes: ['trans'],
            suffixes: ['able'],
            targets: [
              { word: 'transport', meaning: 'carry from one place to another' },
              { word: 'portable', meaning: 'able to be carried' },
            ],
          },
        },
      },
      {
        id: 'reading-u02-l01-c3',
        title: 'Check the Whole Word in Context',
        blocks: [
          { kind: 'text', text: 'After combining word-part meanings, reread the sentence. Keep the meaning only if it fits the sentence.' },
          { kind: 'example', text: 'The volunteers rebuilt the garden beds after the storm means they built them again, not that they built them badly.' },
          { kind: 'tip', text: 'Use the response format Parts → Combined meaning → Sentence check.' },
          { kind: 'tip', text: 'If a partner is available, listen to their combined meaning and restate it before comparing evidence. The app does not listen or score spoken work.' },
        ],
      },
    ],
    workedExample: {
      title: 'Unlock transported in “The Rebuilt Garden”',
      steps: [
        'Read the original sentence: “A small cart transported fresh soil from the gate to the raised beds.”',
        'Identify trans- as across and port as carry.',
        'Combine the clues: transported means carried across or from one place to another.',
        'Check the sentence: the cart carried soil from the gate to the beds, so the meaning fits.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'reading-u02-l01-q01', type: 'multiple-choice', prompt: 'Which part comes before a root or base word?', choices: [{ id: 'a', text: 'Prefix' }, { id: 'b', text: 'Suffix' }, { id: 'c', text: 'Sentence' }, { id: 'd', text: 'Syllable count' }], correctChoiceId: 'a', explanation: 'A prefix is attached before a root or base word.', conceptTag: 'word-parts', reviewCardId: 'reading-u02-l01-c1' },
        { id: 'reading-u02-l01-q02', type: 'fill-blank', prompt: 'Complete the word that means build again: ___build.', acceptedAnswers: ['re', 're-'], explanation: 'The prefix re- means again, so rebuild means build again.', conceptTag: 'word-parts', reviewCardId: 'reading-u02-l01-c1' },
        { id: 'reading-u02-l01-q03', type: 'multiple-choice', prompt: 'What does the suffix -less mean in fearless?', choices: [{ id: 'a', text: 'Full of' }, { id: 'b', text: 'Without' }, { id: 'c', text: 'Again' }, { id: 'd', text: 'Before' }], correctChoiceId: 'b', explanation: 'The suffix -less means without, so fearless means without fear.', conceptTag: 'word-parts', reviewCardId: 'reading-u02-l01-c1' },
        { id: 'reading-u02-l01-q04', type: 'true-false', prompt: 'A suffix is attached after a root or base word.', choices: [{ id: 'true', text: 'True — suffixes follow the root or base' }, { id: 'false', text: 'False — suffixes always come first' }], correctChoiceId: 'true', explanation: 'A suffix follows a root or base word.', conceptTag: 'word-parts', reviewCardId: 'reading-u02-l01-c1' },
        { id: 'reading-u02-l01-q05', type: 'multiple-choice', prompt: 'The root port means carry. What does portable most likely describe?', choices: [{ id: 'a', text: 'Something that cannot move' }, { id: 'b', text: 'Something made of paper' }, { id: 'c', text: 'Something that can be carried' }, { id: 'd', text: 'Something that is very loud' }], correctChoiceId: 'c', explanation: 'The root port points to carrying, so portable means able to be carried.', conceptTag: 'root-meaning', reviewCardId: 'reading-u02-l01-c2' },
        { id: 'reading-u02-l01-q06', type: 'fill-blank', prompt: 'The root bio means life. Which root completes the word for the story of a person’s life: ___graphy?', acceptedAnswers: ['bio', 'bio-'], explanation: 'Biography uses bio, meaning life.', conceptTag: 'root-meaning', reviewCardId: 'reading-u02-l01-c2' },
        { id: 'reading-u02-l01-q07', type: 'multiple-choice', prompt: 'The root spect means look. Which meaning best fits inspect?', choices: [{ id: 'a', text: 'To carry away' }, { id: 'b', text: 'To write again' }, { id: 'c', text: 'To hear from far away' }, { id: 'd', text: 'To look at closely' }], correctChoiceId: 'd', explanation: 'The root spect means look, and inspect means look at closely.', conceptTag: 'root-meaning', reviewCardId: 'reading-u02-l01-c2' },
        { id: 'reading-u02-l01-q08', type: 'true-false', prompt: 'A root clue always gives the full precise meaning without any context.', choices: [{ id: 'true', text: 'True — context is never needed' }, { id: 'false', text: 'False — the whole word and sentence refine the meaning' }], correctChoiceId: 'false', explanation: 'A root is a clue; the complete word and context establish the precise meaning.', conceptTag: 'root-meaning', reviewCardId: 'reading-u02-l01-c2' },
        { id: 'reading-u02-l01-q09', type: 'multiple-choice', prompt: 'In “Mara previewed the map before hiking,” what does previewed mean?', choices: [{ id: 'a', text: 'Looked at beforehand' }, { id: 'b', text: 'Looked at again afterward' }, { id: 'c', text: 'Carried the map away' }, { id: 'd', text: 'Covered the map completely' }], correctChoiceId: 'a', explanation: 'Pre- means before, and the sentence confirms that Mara looked before hiking.', conceptTag: 'morphology-check', reviewCardId: 'reading-u02-l01-c3' },
        { id: 'reading-u02-l01-q10', type: 'fill-blank', prompt: 'Complete the meaning check: careless means without ___.', acceptedAnswers: ['care'], explanation: 'Careless combines care with -less, meaning without care.', conceptTag: 'morphology-check', reviewCardId: 'reading-u02-l01-c3' },
        { id: 'reading-u02-l01-q11', type: 'multiple-choice', prompt: 'Which response best checks the word submarine?', choices: [{ id: 'a', text: 'Sub means above, so a submarine flies' }, { id: 'b', text: 'Sub means under, marine relates to sea, and a submarine travels under the sea' }, { id: 'c', text: 'Marine means mountain, so it climbs rocks' }, { id: 'd', text: 'The word has many letters, so it means enormous' }], correctChoiceId: 'b', explanation: 'Both word parts and the sentence meaning support a vessel that travels under the sea.', conceptTag: 'morphology-check', reviewCardId: 'reading-u02-l01-c3' },
        { id: 'reading-u02-l01-q12', type: 'sort', prompt: 'Put the word parts in order to build reusable.', items: [{ id: 'prefix', text: 're-' }, { id: 'root', text: 'use' }, { id: 'suffix', text: '-able' }], correctOrder: ['prefix', 'root', 'suffix'], explanation: 'Reusable is built in the natural order prefix, base word, suffix.', conceptTag: 'morphology-check', reviewCardId: 'reading-u02-l01-c3' },
        { id: 'reading-u02-l01-q13', type: 'true-false', prompt: 'After using word parts, rereading the sentence helps confirm the meaning.', choices: [{ id: 'true', text: 'True — context checks the combined meaning' }, { id: 'false', text: 'False — the sentence should be ignored' }], correctChoiceId: 'true', explanation: 'The sentence confirms or corrects the meaning suggested by word parts.', conceptTag: 'morphology-check', reviewCardId: 'reading-u02-l01-c3' },
      ],
    },
  },
] satisfies Lesson[];
```

When Tasks 4 and 5 add the second and third Unit 2 literals, the final export remains one nonempty `unit02Lessons` array with the three manifest-ordered objects.

## Complete Focused-Test Pattern

The C2a wave creates this populated first revision of `src/content/reading/u02.test.ts`; later U02 lessons append their rows to `expectedLessons`. Shared invariants come from the master-owned `src/content/unit-test-helpers.ts`; exact Reading mappings and answer balance stay local to this unit test.

```ts
import { describe, expect, test } from 'vitest';
import { WidgetRefSchema, type Question, type WidgetRef } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit02Lessons } from './u02';

type ExpectedReadingLesson = {
  id: string;
  unitId: string;
  title: string;
  indicatorCodes: readonly string[];
  cards: readonly { id: string; title: string; conceptTag: string }[];
  questions: readonly { id: string; type: Question['type']; conceptTag: string; reviewCardId: string }[];
  widget?: { cardId: string; ref: WidgetRef };
};

const expectedLessons = [
  {
    id: 'reading-u02-l01',
    unitId: 'reading-u02',
    title: 'Build Meaning with Roots, Base Words, and Affixes',
    indicatorCodes: ['ELA.4.AOR.9.1'],
    cards: [
      { id: 'reading-u02-l01-c1', title: 'Build Words from Meaningful Parts', conceptTag: 'word-parts' },
      { id: 'reading-u02-l01-c2', title: 'Use Roots to Unlock Meaning', conceptTag: 'root-meaning' },
      { id: 'reading-u02-l01-c3', title: 'Check the Whole Word in Context', conceptTag: 'morphology-check' },
    ],
    widget: {
      cardId: 'reading-u02-l01-c2',
      ref: {
        type: 'word-root-builder',
        config: {
          root: 'port',
          prefixes: ['trans'],
          suffixes: ['able'],
          targets: [
            { word: 'transport', meaning: 'carry from one place to another' },
            { word: 'portable', meaning: 'able to be carried' },
          ],
        },
      },
    },
    questions: [
      { id: 'reading-u02-l01-q01', type: 'multiple-choice', conceptTag: 'word-parts', reviewCardId: 'reading-u02-l01-c1' },
      { id: 'reading-u02-l01-q02', type: 'fill-blank', conceptTag: 'word-parts', reviewCardId: 'reading-u02-l01-c1' },
      { id: 'reading-u02-l01-q03', type: 'multiple-choice', conceptTag: 'word-parts', reviewCardId: 'reading-u02-l01-c1' },
      { id: 'reading-u02-l01-q04', type: 'true-false', conceptTag: 'word-parts', reviewCardId: 'reading-u02-l01-c1' },
      { id: 'reading-u02-l01-q05', type: 'multiple-choice', conceptTag: 'root-meaning', reviewCardId: 'reading-u02-l01-c2' },
      { id: 'reading-u02-l01-q06', type: 'fill-blank', conceptTag: 'root-meaning', reviewCardId: 'reading-u02-l01-c2' },
      { id: 'reading-u02-l01-q07', type: 'multiple-choice', conceptTag: 'root-meaning', reviewCardId: 'reading-u02-l01-c2' },
      { id: 'reading-u02-l01-q08', type: 'true-false', conceptTag: 'root-meaning', reviewCardId: 'reading-u02-l01-c2' },
      { id: 'reading-u02-l01-q09', type: 'multiple-choice', conceptTag: 'morphology-check', reviewCardId: 'reading-u02-l01-c3' },
      { id: 'reading-u02-l01-q10', type: 'fill-blank', conceptTag: 'morphology-check', reviewCardId: 'reading-u02-l01-c3' },
      { id: 'reading-u02-l01-q11', type: 'multiple-choice', conceptTag: 'morphology-check', reviewCardId: 'reading-u02-l01-c3' },
      { id: 'reading-u02-l01-q12', type: 'sort', conceptTag: 'morphology-check', reviewCardId: 'reading-u02-l01-c3' },
      { id: 'reading-u02-l01-q13', type: 'true-false', conceptTag: 'morphology-check', reviewCardId: 'reading-u02-l01-c3' },
    ],
  },
] as const satisfies readonly ExpectedReadingLesson[];

const normalize = (value: string): string =>
  value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');

const visibleOptions = (question: Question): readonly { id: string; text: string }[] => {
  if ('choices' in question) return question.choices;
  if ('items' in question) return question.items;
  return question.acceptedAnswers.map((text, index) => ({ id: `accepted-${index}`, text }));
};

describe('Reading unit 2 word study lessons', () => {
  test('matches the exact manifest and permanent Reading invariants', () => {
    expectUnitLessons(unit02Lessons, expectedLessons, 'reading');
    for (const [index, lesson] of unit02Lessons.entries()) {
      const plan = expectedLessons[index];
      expect(lesson.unitId).toBe(plan.unitId);
      expect(lesson.intro.length).toBeGreaterThanOrEqual(3);
      expect(lesson.intro.every(({ speaker }) => speaker === 'winnie')).toBe(true);
      expect(lesson.learnCards.map(({ id, title }) => ({ id, title })))
        .toEqual(plan.cards.map(({ id, title }) => ({ id, title })));
      const widgets = lesson.learnCards.flatMap((card) =>
        card.widget ? [{ cardId: card.id, ref: card.widget }] : []
      );
      expect(widgets).toEqual(plan.widget ? [plan.widget] : []);
      for (const { ref } of widgets) expect(WidgetRefSchema.safeParse(ref).success).toBe(true);
      expect(lesson.quiz.pool.map(({ id, type, conceptTag, reviewCardId }) =>
        ({ id, type, conceptTag, reviewCardId }))).toEqual(plan.questions);
      const cardByTag = new Map(plan.cards.map(({ conceptTag, id }) => [conceptTag, id]));
      for (const question of lesson.quiz.pool) {
        expect(cardByTag.get(question.conceptTag)).toBe(question.reviewCardId);
        const options = visibleOptions(question);
        expect(new Set(options.map(({ id }) => id)).size).toBe(options.length);
        expect(new Set(options.map(({ text }) => normalize(text))).size).toBe(options.length);
      }
      const keys = lesson.quiz.pool
        .filter((question) => question.type === 'multiple-choice')
        .map((question) => question.correctChoiceId);
      const counts = new Map<string, number>();
      for (const key of keys) counts.set(key, (counts.get(key) ?? 0) + 1);
      expect([...counts.keys()].sort()).toEqual(['a', 'b', 'c', 'd']);
      expect(Math.max(...counts.values()) - Math.min(...counts.values())).toBeLessThanOrEqual(1);
    }
  });

  test('uses the original Rebuilt Garden text and checks morphology in context', () => {
    const prose = JSON.stringify(unit02Lessons);
    expect(prose).toContain('The Rebuilt Garden');
    expect(prose).toMatch(/root|base word/i);
    expect(prose).toMatch(/prefix|suffix/i);
    expect(prose).toMatch(/reread|sentence check|context/i);
  });
});
```

## Exact Lesson Manifest

Legend: `MC` = `multiple-choice`, `TF` = `true-false`, `FB` = `fill-blank`, `SO` = `sort`; `tag→cN` means the exact `conceptTag` and `reviewCardId` suffix for that question. `Widget: none` is intentional and exact.

### Unit 1 — Launching Readers: Fluency and Comprehension Habits

1. `reading-u01-l01` / `reading-u01` / **Read Accurately at a Good Pace** / `['ELA.4.F.4.2']` / Widget: none. Existing cards: c1 **Accuracy protects the meaning** (`reading-accuracy`); c2 **An appropriate pace fits the text** (`appropriate-pace`); c3 **Check fluency by checking meaning** (`fluency-self-check`). Existing distribution: q01 MC `reading-accuracy→c1`; q02 MC `reading-accuracy→c1`; q03 TF `reading-accuracy→c1`; q04 MC `reading-accuracy→c1`; q05 MC `appropriate-pace→c2`; q06 TF `appropriate-pace→c2`; q07 MC `appropriate-pace→c2`; q08 MC `appropriate-pace→c2`; q09 TF `fluency-self-check→c3`; q10 MC `fluency-self-check→c3`; q11 MC `fluency-self-check→c3`; q12 MC `fluency-self-check→c3`; q13 TF `fluency-self-check→c3`. Original text: existing **Fluency check at the marsh boardwalk** passage. Preserve commit `5fae7cb` corrections.
2. `reading-u01-l02` / `reading-u01` / **Read with Expression and Intonation** / `['ELA.4.F.4.2']` / Widget: none. Existing cards: c1 **Expression reveals meaning** (`expression-and-meaning`); c2 **Intonation follows ideas and punctuation** (`intonation-and-punctuation`); c3 **Practice, listen, and reflect** (`expressive-practice`). Existing distribution: q01 MC `intonation-and-punctuation→c2`; q02 MC `expression-and-meaning→c1`; q03 TF `expression-and-meaning→c1`; q04 MC `expression-and-meaning→c1`; q05 MC `expression-and-meaning→c1`; q06 MC `intonation-and-punctuation→c2`; q07 MC `intonation-and-punctuation→c2`; q08 MC `intonation-and-punctuation→c2`; q09 TF `intonation-and-punctuation→c2`; q10 MC `expressive-practice→c3`; q11 MC `expressive-practice→c3`; q12 MC `expressive-practice→c3`; q13 TF `expressive-practice→c3`. Original text: existing **Give the lighthouse scene a meaningful voice** passage. Preserve commit `5fae7cb` review targets and answer balancing.

### Unit 2 — Word Study: Roots, Affixes, and Context Clues

3. `reading-u02-l01` / `reading-u02` / **Build Meaning with Roots, Base Words, and Affixes** / `['ELA.4.AOR.9.1']` / Widget on c2: `{ type: 'word-root-builder', config: { root: 'port', prefixes: ['trans'], suffixes: ['able'], targets: [{ word: 'transport', meaning: 'carry from one place to another' }, { word: 'portable', meaning: 'able to be carried' }] } }`. Cards: c1 **Build Words from Meaningful Parts** (`word-parts`); c2 **Use Roots to Unlock Meaning** (`root-meaning`); c3 **Check the Whole Word in Context** (`morphology-check`). Distribution: q01 MC `word-parts→c1`; q02 FB `word-parts→c1`; q03 MC `word-parts→c1`; q04 TF `word-parts→c1`; q05 MC `root-meaning→c2`; q06 FB `root-meaning→c2`; q07 MC `root-meaning→c2`; q08 TF `root-meaning→c2`; q09 MC `morphology-check→c3`; q10 FB `morphology-check→c3`; q11 MC `morphology-check→c3`; q12 SO `morphology-check→c3`; q13 TF `morphology-check→c3`. Original text: **The Rebuilt Garden**, a four-sentence school-garden vignette using rebuild, transported, preview, and reusable.
4. `reading-u02-l02` / `reading-u02` / **Use Definition, Example, and Restatement Clues** / `['ELA.4.AOR.7.1']` / Widget on c1: `{ type: 'context-clue-detective', config: { passage: 'Nocturnal animals, creatures that are active at night, include owls and moths.', targetWord: 'nocturnal', clueChoices: [{ id: 'definition', text: 'creatures that are active at night', type: 'definition' }, { id: 'examples', text: 'owls and moths', type: 'example' }], correctChoiceId: 'definition' } }`. Cards: c1 **Spot the Kind of Context Clue** (`clue-types`); c2 **Read Around the Unknown Word** (`context-reasoning`); c3 **Confirm Meaning in the Sentence** (`context-check`). Distribution: q01 MC `clue-types→c1`; q02 MC `clue-types→c1`; q03 TF `clue-types→c1`; q04 MC `clue-types→c1`; q05 MC `context-reasoning→c2`; q06 FB `context-reasoning→c2`; q07 MC `context-reasoning→c2`; q08 TF `context-reasoning→c2`; q09 MC `context-check→c3`; q10 MC `context-check→c3`; q11 FB `context-check→c3`; q12 MC `context-check→c3`; q13 TF `context-check→c3`. Original text: **Night Garden Visitors**, an informational paragraph defining nocturnal, giving owl/moth examples, and restating emerge.
5. `reading-u02-l03` / `reading-u02` / **Use Print and Digital References Precisely** / `['ELA.4.AOR.7.1']` / Widget: none. Cards: c1 **Choose the Right Reference** (`reference-choice`); c2 **Read a Dictionary Entry** (`dictionary-entry`); c3 **Select the Precise Meaning** (`precise-meaning`). Distribution: q01 MC `reference-choice→c1`; q02 TF `reference-choice→c1`; q03 MC `reference-choice→c1`; q04 MC `reference-choice→c1`; q05 MC `dictionary-entry→c2`; q06 FB `dictionary-entry→c2`; q07 MC `dictionary-entry→c2`; q08 TF `dictionary-entry→c2`; q09 MC `precise-meaning→c3`; q10 MC `precise-meaning→c3`; q11 FB `precise-meaning→c3`; q12 MC `precise-meaning→c3`; q13 TF `precise-meaning→c3`. Original text: **Field Notes Word Desk**, a fictional dictionary/glossary packet for current, bank, migrate, and brackish with pronunciation and part-of-speech labels.

### Unit 3 — Story Elements: Character, Setting, Conflict, and Plot

6. `reading-u03-l01` / `reading-u03` / **Connect Setting, Conflict, Character Change, and Plot** / `['ELA.4.AOR.1.1']` / Widget on c3: `{ type: 'story-elements-mapper', config: { textTitle: 'The Windy Kite Festival', fields: ['character', 'setting', 'problem', 'events', 'solution'], answers: { character: 'Priya', setting: 'A windy kite festival', problem: 'Strong gusts threaten the team kite', events: 'Priya listens, shortens the tail, and changes the launch plan', solution: 'The team launches the kite safely' } } }`. Cards: c1 **Connect Setting and Conflict** (`setting-conflict`); c2 **Track Character Change** (`character-change`); c3 **Explain How Conflict Builds Plot** (`plot-development`). Distribution: q01 MC `setting-conflict→c1`; q02 TF `setting-conflict→c1`; q03 MC `setting-conflict→c1`; q04 MC `setting-conflict→c1`; q05 MC `character-change→c2`; q06 TF `character-change→c2`; q07 MC `character-change→c2`; q08 MC `character-change→c2`; q09 MC `plot-development→c3`; q10 MC `plot-development→c3`; q11 TF `plot-development→c3`; q12 SO `plot-development→c3`; q13 MC `plot-development→c3`. Original literary text: **The Windy Kite Festival**, in which Priya adapts her plan when gusts threaten a team kite; the setting causes the conflict, choices reveal change, and events form a complete plot.

### Unit 4 — Theme in Literary Texts

7. `reading-u04-l01` / `reading-u04` / **Explain Explicit and Implied Themes** / `['ELA.4.AOR.2.1']` / Widget on c2: `{ type: 'theme-evidence-collector', config: { themeChoices: ['Generosity strengthens a community', 'Gardening takes careful planning'], evidence: [{ id: 'shares', text: 'Mateo gives his neighbor part of the extra row.', supports: ['Generosity strengthens a community'] }, { id: 'replants', text: 'They replant the washed-out seedlings together.', supports: ['Generosity strengthens a community'] }, { id: 'measures', text: 'Mateo measures the garden rows before planting.', supports: ['Gardening takes careful planning'] }], requiredEvidenceCount: 2 } }`. Cards: c1 **State a Theme as a Message** (`theme-statement`); c2 **Gather Key Details** (`theme-evidence`); c3 **Explain How the Theme Develops** (`theme-development`). Distribution: q01 MC `theme-statement→c1`; q02 TF `theme-statement→c1`; q03 MC `theme-statement→c1`; q04 MC `theme-statement→c1`; q05 MC `theme-evidence→c2`; q06 TF `theme-evidence→c2`; q07 MC `theme-evidence→c2`; q08 MC `theme-evidence→c2`; q09 MC `theme-development→c3`; q10 TF `theme-development→c3`; q11 MC `theme-development→c3`; q12 MC `theme-development→c3`; q13 MC `theme-development→c3`. Original literary text: **The Extra Row**, where Mateo first guards his garden space, then shares it after a neighbor’s seedlings wash out; an implied theme about generosity develops through actions and consequences.

### Unit 5 — Central Idea and Supporting Details in Informational Text

8. `reading-u05-l01` / `reading-u05` / **Explain Stated and Implied Central Ideas** / `['ELA.4.AOR.2.2']` / Widget on c2: `{ type: 'central-idea-organizer', config: { mainIdeaChoices: ['Salt marshes support wildlife and shorelines', 'Every wet place is a salt marsh'], details: [{ id: 'nursery', text: 'Young fish find shelter among marsh grasses.', supports: ['Salt marshes support wildlife and shorelines'] }, { id: 'buffer', text: 'Marsh plants slow waves near the shoreline.', supports: ['Salt marshes support wildlife and shorelines'] }, { id: 'definition', text: 'Any place with rainwater is a salt marsh.', supports: ['Every wet place is a salt marsh'] }], requiredDetailCount: 2 } }`. Cards: c1 **Find the Central Idea** (`central-idea`); c2 **Choose Supporting Details** (`supporting-details`); c3 **Explain How Details Develop the Idea** (`idea-development`). Distribution: q01 MC `central-idea→c1`; q02 TF `central-idea→c1`; q03 MC `central-idea→c1`; q04 MC `central-idea→c1`; q05 MC `supporting-details→c2`; q06 TF `supporting-details→c2`; q07 MC `supporting-details→c2`; q08 MC `supporting-details→c2`; q09 MC `idea-development→c3`; q10 TF `idea-development→c3`; q11 MC `idea-development→c3`; q12 MC `idea-development→c3`; q13 MC `idea-development→c3`. Original informational text: **Why Salt Marshes Matter**, a short original explanation of shelter, shoreline buffering, and nursery habitat with one stated-idea paragraph and one implied-idea paragraph.

### Unit 6 — Summarizing Across Genres

9. `reading-u06-l01` / `reading-u06` / **Summarize Literary Texts** / `['ELA.4.AOR.6.1']` / Widget on c3: `{ type: 'summary-builder', config: { sourceSentences: [{ id: 'plot', text: 'Amina loses borrowed binoculars, searches carefully, and returns them.', role: 'main' }, { id: 'theme', text: 'Her honest choices show responsibility.', role: 'main' }, { id: 'detail', text: 'She retraces her route beside the marsh.', role: 'detail' }, { id: 'extra', text: 'The binocular strap is green.', role: 'extra' }], requiredMainIds: ['plot', 'theme'], maxSentences: 3 } }`. Cards: c1 **Retell the Plot Selectively** (`literary-plot-summary`); c2 **Include Theme and Relevant Details** (`literary-theme-details`); c3 **Write an Objective Literary Summary** (`literary-summary`). Distribution: q01 MC `literary-plot-summary→c1`; q02 TF `literary-plot-summary→c1`; q03 MC `literary-plot-summary→c1`; q04 SO `literary-plot-summary→c1`; q05 MC `literary-theme-details→c2`; q06 TF `literary-theme-details→c2`; q07 MC `literary-theme-details→c2`; q08 MC `literary-theme-details→c2`; q09 MC `literary-summary→c3`; q10 TF `literary-summary→c3`; q11 MC `literary-summary→c3`; q12 MC `literary-summary→c3`; q13 MC `literary-summary→c3`. Original literary text: **The Borrowed Binoculars**, where Amina loses, searches for, and honestly returns borrowed binoculars; a theme of responsibility is supported by her choices.
10. `reading-u06-l02` / `reading-u06` / **Summarize Informational Texts** / `['ELA.4.AOR.6.1']` / Widget on c3: `{ type: 'summary-builder', config: { sourceSentences: [{ id: 'central', text: 'Purple martin houses work best with suitable placement and regular care.', role: 'main' }, { id: 'space', text: 'Open space gives the birds a clear flight path.', role: 'detail' }, { id: 'care', text: 'Seasonal cleaning keeps the house ready.', role: 'detail' }, { id: 'extra', text: 'One house in the article is painted white.', role: 'extra' }], requiredMainIds: ['central'], maxSentences: 3 } }`. Cards: c1 **State the Central Idea** (`informational-central-idea`); c2 **Select Relevant Supporting Details** (`informational-details`); c3 **Condense in Your Own Words** (`informational-summary`). Distribution: q01 MC `informational-central-idea→c1`; q02 TF `informational-central-idea→c1`; q03 MC `informational-central-idea→c1`; q04 MC `informational-central-idea→c1`; q05 MC `informational-details→c2`; q06 TF `informational-details→c2`; q07 MC `informational-details→c2`; q08 MC `informational-details→c2`; q09 MC `informational-summary→c3`; q10 TF `informational-summary→c3`; q11 MC `informational-summary→c3`; q12 MC `informational-summary→c3`; q13 FB `informational-summary→c3`. Original informational text: **A City for Purple Martins**, explaining why communal birdhouses need open space, regular care, and seasonal monitoring.

### Unit 7 — Informational Text Structures and Features

11. `reading-u07-l01` / `reading-u07` / **Use Text Features and Informational Structures** / `['ELA.4.AOR.5.2']` / Widget on c2: `{ type: 'text-structure-sorter', config: { excerpts: [{ id: 'repair', text: 'Loose boards created a tripping problem, so volunteers replaced them.', structure: 'problem-solution' }, { id: 'steps', text: 'First inspect the boards, next mark damage, and then make repairs.', structure: 'sequence' }, { id: 'materials', text: 'Recycled boards cost less, while composite boards last longer.', structure: 'compare-contrast' }] } }`. Cards: c1 **Navigate with Text Features** (`text-features`); c2 **Recognize Three Text Structures** (`structure-types`); c3 **Explain How Organization Builds Meaning** (`structure-meaning`). Distribution: q01 MC `text-features→c1`; q02 TF `text-features→c1`; q03 MC `text-features→c1`; q04 MC `text-features→c1`; q05 MC `structure-types→c2`; q06 TF `structure-types→c2`; q07 MC `structure-types→c2`; q08 MC `structure-types→c2`; q09 MC `structure-meaning→c3`; q10 TF `structure-meaning→c3`; q11 MC `structure-meaning→c3`; q12 MC `structure-meaning→c3`; q13 MC `structure-meaning→c3`. Original packet: **Boardwalk Repair Guide**, with heading, diagram caption, glossary, and three labeled mini-excerpts using problem/solution, chronological, and compare/contrast structures.
12. `reading-u07-l02` / `reading-u07` / **Explain How Visuals and Multimedia Add Meaning** / `['ELA.4.AOR.10.1']` / Widget: none. Cards: c1 **Read Visuals as Evidence** (`visual-information`); c2 **Connect Visuals and Words** (`visual-text-connection`); c3 **Explain a Multimedia Contribution** (`multimedia-contribution`). Distribution: q01 MC `visual-information→c1`; q02 TF `visual-information→c1`; q03 MC `visual-information→c1`; q04 MC `visual-information→c1`; q05 MC `visual-text-connection→c2`; q06 TF `visual-text-connection→c2`; q07 MC `visual-text-connection→c2`; q08 MC `visual-text-connection→c2`; q09 MC `multimedia-contribution→c3`; q10 TF `multimedia-contribution→c3`; q11 MC `multimedia-contribution→c3`; q12 MC `multimedia-contribution→c3`; q13 MC `multimedia-contribution→c3`. Original packet: **Tracking a Storm’s Rain**, with a prose forecast, authored table-like rainfall description, map legend description, photo caption, and audio-transcript excerpt; questions never require an absent image or audio file.

### Unit 8 — Author's Purpose, Perspective, and Claims

13. `reading-u08-l01` / `reading-u08` / **Connect Author's Purpose and Perspective** / `['ELA.4.AOR.4.1']` / Widget: none. Cards: c1 **Identify the Author's Purpose** (`author-purpose`); c2 **Infer the Author's Perspective** (`author-perspective`); c3 **Explain How Perspective Conveys Purpose** (`purpose-perspective`). Distribution: q01 MC `author-purpose→c1`; q02 TF `author-purpose→c1`; q03 MC `author-purpose→c1`; q04 MC `author-purpose→c1`; q05 MC `author-perspective→c2`; q06 TF `author-perspective→c2`; q07 MC `author-perspective→c2`; q08 MC `author-perspective→c2`; q09 MC `purpose-perspective→c3`; q10 TF `purpose-perspective→c3`; q11 MC `purpose-perspective→c3`; q12 MC `purpose-perspective→c3`; q13 MC `purpose-perspective→c3`. Original paired texts: **A Shadier Schoolyard** and **How Tree Canopies Cool Pavement**, one persuasive first-person community note and one neutral explanatory article, used to distinguish purpose from perspective.
14. `reading-u08-l02` / `reading-u08` / **Explain Claims, Reasons, and Evidence** / `['ELA.4.AOR.5.3']` / Widget: none. Cards: c1 **Locate the Claim** (`claim`); c2 **Evaluate the Reasons** (`reasons`); c3 **Connect Evidence to the Claim** (`claim-evidence`). Distribution: q01 MC `claim→c1`; q02 TF `claim→c1`; q03 MC `claim→c1`; q04 MC `claim→c1`; q05 MC `reasons→c2`; q06 TF `reasons→c2`; q07 MC `reasons→c2`; q08 MC `reasons→c2`; q09 MC `claim-evidence→c3`; q10 TF `claim-evidence→c3`; q11 MC `claim-evidence→c3`; q12 MC `claim-evidence→c3`; q13 MC `claim-evidence→c3`. Original informational argument: **Keep the Refill Station**, claiming a school should retain a water-bottle station and supplying distinguishable reasons, evidence, and an unrelated detail.

### Unit 9 — Point of View and Character Perspective

15. `reading-u09-l01` / `reading-u09` / **Compare First- and Third-Person Narration** / `['ELA.4.AOR.3.1']` / Widget on c3: `{ type: 'pov-switcher', config: { passage: 'Lila carried Lila’s marker to the trail.', from: 'third', target: 'first', pronounOptions: ['I', 'my', 'she'], requiredPronouns: ['I', 'my'] } }`. Cards: c1 **Recognize First-Person Narration** (`first-person`); c2 **Recognize Third-Person Narration** (`third-person`); c3 **Compare What Narrators Reveal** (`pov-comparison`). Distribution: q01 MC `first-person→c1`; q02 TF `first-person→c1`; q03 MC `first-person→c1`; q04 MC `first-person→c1`; q05 MC `third-person→c2`; q06 TF `third-person→c2`; q07 MC `third-person→c2`; q08 MC `third-person→c2`; q09 MC `pov-comparison→c3`; q10 TF `pov-comparison→c3`; q11 MC `pov-comparison→c3`; q12 MC `pov-comparison→c3`; q13 FB `pov-comparison→c3`. Original paired narration: **The Hidden Trail Marker**, the same discovery told once by “I” narrator Lila and once by a third-person narrator with deliberately different access to thoughts.
16. `reading-u09-l02` / `reading-u09` / **Explain How Character Perspectives Shape a Story** / `['ELA.4.AOR.3.1']` / Widget: none. Cards: c1 **Identify Character Perspectives** (`character-perspective`); c2 **Compare Reactions to One Event** (`perspective-contrast`); c3 **Explain the Impact on the Text** (`perspective-impact`). Distribution: q01 MC `character-perspective→c1`; q02 TF `character-perspective→c1`; q03 MC `character-perspective→c1`; q04 MC `character-perspective→c1`; q05 MC `perspective-contrast→c2`; q06 TF `perspective-contrast→c2`; q07 MC `perspective-contrast→c2`; q08 MC `perspective-contrast→c2`; q09 MC `perspective-impact→c3`; q10 TF `perspective-impact→c3`; q11 MC `perspective-impact→c3`; q12 MC `perspective-impact→c3`; q13 MC `perspective-impact→c3`. Original literary text: **Rain on Field Day**, where one character welcomes a gym-based change and another feels disappointed before their perspectives reshape the conflict and resolution.

### Unit 10 — Poetry, Drama, and Figurative Language

17. `reading-u10-l01` / `reading-u10` / **Compare Narratives, Dramas, and Poems** / `['ELA.4.AOR.5.1']` / Widget: none. Cards: c1 **Notice Narrative Structure** (`narrative-structure`); c2 **Read Drama Structure** (`drama-structure`); c3 **Read Poetry Structure** (`poetry-structure`). Distribution: q01 MC `narrative-structure→c1`; q02 TF `narrative-structure→c1`; q03 MC `narrative-structure→c1`; q04 MC `narrative-structure→c1`; q05 MC `drama-structure→c2`; q06 TF `drama-structure→c2`; q07 MC `drama-structure→c2`; q08 MC `drama-structure→c2`; q09 MC `poetry-structure→c3`; q10 TF `poetry-structure→c3`; q11 MC `poetry-structure→c3`; q12 MC `poetry-structure→c3`; q13 MC `poetry-structure→c3`. Original triptych: **The Last Lantern** as a two-paragraph narrative, a one-scene drama with speaker labels/stage direction, and a three-stanza free-verse poem; content stays parallel so structural comparison is fair.
18. `reading-u10-l02` / `reading-u10` / **Interpret Literal and Nonliteral Language** / `['ELA.4.AOR.8.1']` / Widget on c2: `{ type: 'figurative-language-matcher', config: { pairs: [{ id: 'simile', phrase: 'busy as a bee', kind: 'simile', meaning: 'very busy' }, { id: 'metaphor', phrase: 'the market was a beehive', kind: 'metaphor', meaning: 'the market was crowded and active' }, { id: 'idiom', phrase: 'the setup was a piece of cake', kind: 'idiom', meaning: 'the setup was easy' }] } }`. Cards: c1 **Distinguish Literal and Nonliteral Meaning** (`literal-nonliteral`); c2 **Explain Similes, Metaphors, and Idioms** (`figurative-meaning`); c3 **Use Word Relationships to Clarify Meaning** (`word-relationships`). Distribution: q01 MC `literal-nonliteral→c1`; q02 TF `literal-nonliteral→c1`; q03 MC `literal-nonliteral→c1`; q04 MC `literal-nonliteral→c1`; q05 MC `figurative-meaning→c2`; q06 TF `figurative-meaning→c2`; q07 MC `figurative-meaning→c2`; q08 FB `figurative-meaning→c2`; q09 MC `word-relationships→c3`; q10 TF `word-relationships→c3`; q11 MC `word-relationships→c3`; q12 MC `word-relationships→c3`; q13 FB `word-relationships→c3`. Original mixed text: **Market Morning**, a short descriptive passage using one simile, one metaphor, one common idiom, a literal use of steps, and explicit synonym/antonym clues.
19. `reading-u10-l03` / `reading-u10` / **Explain Figurative Language's Effect** / `['ELA.4.AOR.1.2']` / Widget: none. Cards: c1 **Spot the Figurative Choice** (`figurative-choice`); c2 **Interpret Its Effect on Meaning** (`figurative-effect`); c3 **Explain the Reader's Experience** (`reader-experience`). Distribution: q01 MC `figurative-choice→c1`; q02 TF `figurative-choice→c1`; q03 MC `figurative-choice→c1`; q04 MC `figurative-choice→c1`; q05 MC `figurative-effect→c2`; q06 TF `figurative-effect→c2`; q07 MC `figurative-effect→c2`; q08 MC `figurative-effect→c2`; q09 MC `reader-experience→c3`; q10 TF `reader-experience→c3`; q11 MC `reader-experience→c3`; q12 MC `reader-experience→c3`; q13 MC `reader-experience→c3`. Original literary text: **Fog at the Ferry**, using “the fog folded a gray blanket,” “the horn was a giant’s warning,” and restrained sensory language so students explain impact rather than merely label devices.

### Unit 11 — Research and Source Evaluation

20. `reading-u11-l01` / `reading-u11` / **Ask an Inquiry Question and Examine a Source** / `['ELA.4.R.1.1']` / Widget: none. Cards: c1 **Focus an Inquiry Question** (`inquiry-question`); c2 **Examine the Provided Source** (`source-examination`); c3 **Record Question-Based Findings** (`inquiry-findings`). Distribution: q01 MC `inquiry-question→c1`; q02 TF `inquiry-question→c1`; q03 MC `inquiry-question→c1`; q04 MC `inquiry-question→c1`; q05 MC `source-examination→c2`; q06 TF `source-examination→c2`; q07 MC `source-examination→c2`; q08 MC `source-examination→c2`; q09 MC `inquiry-findings→c3`; q10 TF `inquiry-findings→c3`; q11 SO `inquiry-findings→c3`; q12 MC `inquiry-findings→c3`; q13 MC `inquiry-findings→c3`. Original provided source: **Schoolyard Pollinator Patch: Planning Notes**, a short, internally complete fact sheet used to investigate “What features help a small schoolyard patch serve pollinators?”
21. `reading-u11-l02` / `reading-u11` / **Judge the Credibility of a Provided Source** / `['ELA.4.R.1.2']` / Widget on c3: `{ type: 'source-credibility-checker', config: { sources: [{ id: 'blog', title: 'Mosquito Myths Blog', author: 'Kai Reed', date: '2024', purpose: 'entertain with surprising claims', claims: [] }, { id: 'extension', title: 'County Extension Mosquito Guide', author: 'Dr. Lena Ortiz', date: '2026', publisher: 'Sample County Extension', purpose: 'explain mosquito prevention', claims: ['Standing water can become mosquito habitat.', 'Empty small containers after rain.'] }, { id: 'screenshot', title: 'Mystery Screenshot', claims: [] }], criteria: ['author', 'evidence', 'date', 'purpose'], credibleIds: ['extension'] } }`. Cards: c1 **Check Author and Publisher** (`source-authority`); c2 **Check Date, Evidence, and Purpose** (`source-evidence`); c3 **Make a Credibility Judgment** (`credibility-judgment`). Distribution: q01 MC `source-authority→c1`; q02 TF `source-authority→c1`; q03 MC `source-authority→c1`; q04 MC `source-authority→c1`; q05 MC `source-evidence→c2`; q06 TF `source-evidence→c2`; q07 MC `source-evidence→c2`; q08 MC `source-evidence→c2`; q09 MC `credibility-judgment→c3`; q10 TF `credibility-judgment→c3`; q11 MC `credibility-judgment→c3`; q12 MC `credibility-judgment→c3`; q13 MC `credibility-judgment→c3`. Original three-source packet: **Mosquito Myths Blog**, **County Extension Mosquito Guide**, and **Mystery Screenshot**, with invented bylines/dates/evidence notes; the lesson judges provided metadata and never implies those fictional publications are real.
22. `reading-u11-l03` / `reading-u11` / **Select Information Relevant to a Topic** / `['ELA.4.R.1.3']` / Widget: none. Cards: c1 **Define the Relevance Test** (`relevance-test`); c2 **Select Relevant Information** (`relevance-selection`); c3 **Explain Why a Detail Belongs** (`relevance-reasoning`). Distribution: q01 MC `relevance-test→c1`; q02 TF `relevance-test→c1`; q03 MC `relevance-test→c1`; q04 MC `relevance-test→c1`; q05 MC `relevance-selection→c2`; q06 TF `relevance-selection→c2`; q07 MC `relevance-selection→c2`; q08 MC `relevance-selection→c2`; q09 MC `relevance-reasoning→c3`; q10 TF `relevance-reasoning→c3`; q11 MC `relevance-reasoning→c3`; q12 MC `relevance-reasoning→c3`; q13 MC `relevance-reasoning→c3`. Original research notes: **Reducing Cafeteria Food Waste**, with details about portion choices, share tables, compost, school colors, lunch music, and unrelated mascot history.
23. `reading-u11-l04` / `reading-u11` / **Group Related Research Findings** / `['ELA.4.R.1.4']` / Widget: none. Cards: c1 **Identify Useful Categories** (`finding-categories`); c2 **Place Findings with Their Group** (`grouped-findings`); c3 **Name the Pattern in Each Group** (`group-synthesis`). Distribution: q01 MC `finding-categories→c1`; q02 TF `finding-categories→c1`; q03 MC `finding-categories→c1`; q04 MC `finding-categories→c1`; q05 MC `grouped-findings→c2`; q06 TF `grouped-findings→c2`; q07 MC `grouped-findings→c2`; q08 MC `grouped-findings→c2`; q09 MC `group-synthesis→c3`; q10 TF `group-synthesis→c3`; q11 MC `group-synthesis→c3`; q12 MC `group-synthesis→c3`; q13 MC `group-synthesis→c3`. Original note cards: **Safer Routes to School**, nine short findings that naturally group under visibility, crossings, and travel habits; no ordering question treats categories as a sequence.
24. `reading-u11-l05` / `reading-u11` / **Cite Sources and Avoid Plagiarism** / `['ELA.4.R.1.5']` / Widget: none. Cards: c1 **Distinguish Quoting and Paraphrasing** (`source-use`); c2 **Build a Simple Source Citation** (`citation-format`); c3 **Give Credit Every Time** (`attribution-check`). Distribution: q01 MC `source-use→c1`; q02 TF `source-use→c1`; q03 MC `source-use→c1`; q04 FB `source-use→c1`; q05 MC `citation-format→c2`; q06 TF `citation-format→c2`; q07 MC `citation-format→c2`; q08 FB `citation-format→c2`; q09 MC `attribution-check→c3`; q10 TF `attribution-check→c3`; q11 MC `attribution-check→c3`; q12 MC `attribution-check→c3`; q13 MC `attribution-check→c3`. Original mini-source: **“Window Boxes for Native Bees” by Nia Chen, Cram All Student Science Notes, 2026**, used to practice quotation marks, a faithful paraphrase, and the accepted format `Author — Title — Publisher — Year`; clearly label this as an invented practice source.

## Regular-Indicator Trace — Exactly One Audit Row per Code

| Regular indicator | Manifest lesson allocation | Instructional boundary |
|---|---|---|
| `ELA.4.F.4.2` | u01-l01, u01-l02 | Oral and silent accuracy, appropriate rate, expression, intonation; no automated oral-fluency score. |
| `ELA.4.AOR.1.1` | u03-l01 | Explain causal links among setting, conflict, character change, and plot. |
| `ELA.4.AOR.1.2` | u10-l03 | Explain how figurative choices change meaning and reader experience. |
| `ELA.4.AOR.2.1` | u04-l01 | Explicit or implied literary theme plus development by key details. |
| `ELA.4.AOR.2.2` | u05-l01 | Stated or implied informational central idea plus supporting-detail development. |
| `ELA.4.AOR.3.1` | u09-l01, u09-l02 | Both lettered parts: first/third-person comparison and character-perspective impact. |
| `ELA.4.AOR.4.1` | u08-l01 | Purpose is conveyed through author perspective; do not reduce purpose to a mnemonic label. |
| `ELA.4.AOR.5.1` | u10-l01 | Compare structural elements across narratives, dramas, and poems. |
| `ELA.4.AOR.5.2` | u07-l01 | Text-feature contribution plus problem/solution, chronological, and compare/contrast structures. |
| `ELA.4.AOR.5.3` | u08-l02 | Explain how reasons and evidence support a claim. |
| `ELA.4.AOR.6.1` | u06-l01, u06-l02 | Both lettered parts: literary plot/theme/details and informational central idea/details. |
| `ELA.4.AOR.7.1` | u02-l02, u02-l03 | All parts: definition/example/restatement context clues and print/digital references for knowledge, pronunciation, part of speech, precise meaning. |
| `ELA.4.AOR.8.1` | u10-l02 | All parts: literal/nonliteral, common simile/metaphor/idiom, and word relationships. |
| `ELA.4.AOR.9.1` | u02-l01 | Common Greek/Latin roots, base words, and affixes in grade-appropriate content. |
| `ELA.4.AOR.10.1` | u07-l02 | Explain contribution of visuals and/or multimedia, with all evidence represented accessibly in the prompt. |
| `ELA.4.R.1.1` | u11-l01 | Generate a topic question and examine a provided source. |
| `ELA.4.R.1.2` | u11-l02 | Determine credibility of provided sources from visible authorship, publication, date, evidence, and purpose clues. |
| `ELA.4.R.1.3` | u11-l03 | Determine relevance to the stated topic/question. |
| `ELA.4.R.1.4` | u11-l04 | Group related findings; categories are not forced into an order. |
| `ELA.4.R.1.5` | u11-l05 | Cite supplied sources to avoid plagiarism using one explicitly taught accepted format. |

## TDD Task Protocol for Tasks 3–24

Each new-lesson task below is one independently reviewable slice. Its `Files`, `Interfaces`, manifest row, text brief, and boundary are exact. Perform these five steps for that task only:

- [ ] **Step A: Write or extend the failing focused test.** Add the task's full `ExpectedReadingLesson` row—three cards and all q01–q13 entries—to the unit test. Add assertions for the named original passage/source and instructional boundary. Do not add the production lesson yet.
- [ ] **Step B: Run the exact red command shown in the task.** Expected: FAIL because the new module is absent or the newly expected lesson is absent; already accepted lesson tests remain green.
- [ ] **Step C: Author the literal lesson.** Follow the complete production shape above; write 3–4 Winnie intro lines, all three exact cards with explanatory/example/tip blocks, the named original passage/source, a worked example of at least 3 concrete steps, and 13 fully authored questions matching the exact distribution. Every MC has four unique plausible choices and a balanced `a`/`b`/`c`/`d` correct key across the lesson; every TF has two nonduplicative choices; every FB has explicit accepted answers; every SO is a genuine sequence with a full permutation.
- [ ] **Step D: Run the exact green command shown in the task.** Expected: focused test, `schema.test.ts`, and `content-validation.test.ts` PASS; TypeScript emits no errors. If a whole-catalog assertion owned by the master is deliberately red before final registration, the controller must move it to the final integration gate before this task; lesson authors do not weaken shared validation.
- [ ] **Step E: Human review and exact commit.** The main agent compares every card/question against the verbatim indicator text and this plan row, checks every answer and distractor, confirms original/copyright-safe text and honest OE language, then runs the task's exact `git add`/`git commit` command.

The phrase “follow the complete production shape” refers to the concrete, fully populated code contract in this same plan, not to another task or omitted implementation.

## Tasks

### Task 1: Freeze the Reading dependency gate

**Files:** Read only: `src/content/schema.ts`, `src/content/curriculum.ts`, `src/content/content-validation.test.ts`, `src/widgets/registry.ts`, `src/content/reading/u01.ts`, `src/content/reading/u01.test.ts`, and the completed Plan B Reading plan.

**Interfaces:** Consumes the exact interfaces listed above. Produces a written main-agent checkpoint in the execution log; no file change and no commit.

- [ ] Verify Plan A remediation is accepted and `LessonSchema` validates the exact six-code OE field from the generated Reading OE source.
- [ ] Verify Plan B is complete. Parse the 11 exact manifest refs with the final `WidgetRefSchema`; confirm the other 13 lessons have no widget and every named type exists in `WIDGET_TYPES` and `widgetRegistry`.
- [ ] Run `npm test && npx tsc -b --pretty false && npm run build`.
- [ ] Stop if any command fails or if the final interfaces differ. Update this plan before learner-facing authorship; do not translate a contract ad hoc during implementation.

### Task 2: Revalidate accepted Unit 1 in the C2a wave

**Files:** Read `src/content/unit-test-helpers.ts`; modify only `src/content/reading/u01.ts` and `src/content/reading/u01.test.ts`.

**Interfaces:** Consumes master-owned `READING_OE_CODES` and `expectUnitLessons(...)`. Produces the preserved `unit01Lessons` export with exact OE metadata and strengthened local tests; it produces no shared helper.

- [ ] Extend `u01.test.ts` with the two exact Unit 1 manifest rows through `expectUnitLessons(unit01Lessons, expected, 'reading')`. Preserve every accepted semantic assertion from `5fae7cb` and the current deepened source/answer corrections.
- [ ] Run red: `npm test -- src/content/reading/u01.test.ts`. Expected: FAIL because existing lessons do not yet declare `crossCuttingExpectationCodes`.
- [ ] Add `import { READING_OE_CODES } from '../curriculum'` and `crossCuttingExpectationCodes: [...READING_OE_CODES]` to both existing lesson objects. Make no learner-prose, answer, card, tag, or review-target edits.
- [ ] Run green: `npm test -- src/content/reading/u01.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`. Expected: PASS.
- [ ] Main-agent checkpoint: compare `git diff -- src/content/reading/u01.ts` and require only import/OE metadata changes; independently recheck the six accepted semantic assertions. Commit exactly:

```bash
git add src/content/reading/u01.ts src/content/reading/u01.test.ts
git commit -m "test(content): revalidate reading fluency lessons"
```

### Task 3: Unit 2 Lesson 1 — roots, base words, and affixes

**Files:** Create `src/content/reading/u02.ts`, `src/content/reading/u02.test.ts`.

**Interfaces:** Produces the first literal in `unit02Lessons`; manifest row 3 is exact. Boundary: teach common Greek/Latin roots, bases, and affixes as meaning clues, always checked against the whole word and context.

- [ ] Write `u02.test.ts` with manifest row 3 and the complete focused-test pattern; do not create `u02.ts` yet.
- [ ] Run `npm test -- src/content/reading/u02.test.ts`; expect a missing-module failure.
- [ ] Create `u02.ts` with the complete production literal shown above.
- [ ] Run `npm test -- src/content/reading/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent manually verifies all 13 keys and q12’s genuine prefix→root→suffix order, then commits exactly:

```bash
git add src/content/reading/u02.ts src/content/reading/u02.test.ts
git commit -m "feat(content): add reading roots and affixes lesson"
```

### Task 4: Unit 2 Lesson 2 — context clues

**Files:** Modify `src/content/reading/u02.ts`, `src/content/reading/u02.test.ts`.

**Interfaces:** Appends manifest row 4 after l01. Boundary: every assessed clue is visibly a definition, example, or restatement in the prompt; no vague “guess from context.”

- [ ] Extend `u02.test.ts` with the full row-4 expected object and Night Garden Visitors boundary assertions; do not add the lesson yet.
- [ ] Run `npm test -- src/content/reading/u02.test.ts`; expect “expected 2 lessons, received 1.”
- [ ] Append the complete row-4 literal after l01, with all authored card and question prose.
- [ ] Run `npm test -- src/content/reading/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent independently classifies every clue and verifies each meaning in its full sentence, then commits exactly:

```bash
git add src/content/reading/u02.ts src/content/reading/u02.test.ts
git commit -m "feat(content): add reading context clues lesson"
```

### Task 5: Unit 2 Lesson 3 — print and digital references

**Files:** Modify `src/content/reading/u02.ts`, `src/content/reading/u02.test.ts`.

**Interfaces:** Appends manifest row 5 after l02 and completes `unit02Lessons`. Boundary: cover reference choice, background knowledge, pronunciation, part of speech, multiple meanings, and precise contextual meaning without requiring external browsing.

- [ ] Extend `u02.test.ts` with the full row-5 expected object and Field Notes Word Desk boundary assertions; do not add the lesson yet.
- [ ] Run `npm test -- src/content/reading/u02.test.ts`; expect “expected 3 lessons, received 2.”
- [ ] Append the complete row-5 literal after l02, with all authored reference entries and questions.
- [ ] Run `npm test -- src/content/reading/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent reads every fictional entry from its spelling guide and verifies part of speech and contextual sense, then commits exactly:

```bash
git add src/content/reading/u02.ts src/content/reading/u02.test.ts
git commit -m "feat(content): add reading reference skills lesson"
```

### Task 6: Unit 3 — story elements

**Files:** Create `src/content/reading/u03.ts`, `src/content/reading/u03.test.ts`.

**Interfaces:** Produces `unit03Lessons` with manifest row 6. Boundary: explanations must be causal—setting/conflict causes or pressures change, and conflict contributes events to plot—not merely identify element names.

- [ ] Create the failing `u03.test.ts` with the full row-6 expected object and causal-chain assertions.
- [ ] Run `npm test -- src/content/reading/u03.test.ts`; expect a missing-module failure.
- [ ] Create `u03.ts` with the complete row-6 lesson and original Windy Kite Festival story.
- [ ] Run `npm test -- src/content/reading/u03.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent traces setting→conflict→choice/change→plot and q12’s chronological permutation, then commits exactly:

```bash
git add src/content/reading/u03.ts src/content/reading/u03.test.ts
git commit -m "feat(content): add reading story elements lesson"
```

### Task 7: Unit 4 — theme

**Files:** Create `src/content/reading/u04.ts`, `src/content/reading/u04.test.ts`.

**Interfaces:** Produces `unit04Lessons` with manifest row 7. Boundary: theme is a transferable message, not a one-word topic; explain development with key details and distinguish explicit from implied.

- [ ] Create the failing `u04.test.ts` with the full row-7 expected object and theme/message boundary assertions.
- [ ] Run `npm test -- src/content/reading/u04.test.ts`; expect a missing-module failure.
- [ ] Create `u04.ts` with the complete row-7 lesson and original Extra Row story.
- [ ] Run `npm test -- src/content/reading/u04.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent rejects distractors that are only a topic, plot fact, or unsupported moral, then commits exactly:

```bash
git add src/content/reading/u04.ts src/content/reading/u04.test.ts
git commit -m "feat(content): add reading theme lesson"
```

### Task 8: Unit 5 — central idea

**Files:** Create `src/content/reading/u05.ts`, `src/content/reading/u05.test.ts`.

**Interfaces:** Produces `unit05Lessons` with manifest row 8. Boundary: central idea is a complete statement about the whole informational text; details must demonstrably develop it.

- [ ] Create the failing `u05.test.ts` with the full row-8 expected object and stated/implied central-idea assertions.
- [ ] Run `npm test -- src/content/reading/u05.test.ts`; expect a missing-module failure.
- [ ] Create `u05.ts` with the complete row-8 lesson and original Why Salt Marshes Matter text.
- [ ] Run `npm test -- src/content/reading/u05.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent solves both paragraphs and cites two supporting details for each central idea, then commits exactly:

```bash
git add src/content/reading/u05.ts src/content/reading/u05.test.ts
git commit -m "feat(content): add reading central idea lesson"
```

### Task 9: Unit 6 Lesson 1 — literary summaries

**Files:** Create `src/content/reading/u06.ts`, `src/content/reading/u06.test.ts`.

**Interfaces:** Produces the first literal in `unit06Lessons`; manifest row 9 is exact. Boundary: a literary summary includes plot, theme, and relevant key details, stays objective, and does not become an exhaustive retelling.

- [ ] Create the failing `u06.test.ts` with the full row-9 expected object and literary-summary boundary assertions.
- [ ] Run `npm test -- src/content/reading/u06.test.ts`; expect a missing-module failure.
- [ ] Create `u06.ts` with the complete row-9 lesson and original Borrowed Binoculars story.
- [ ] Run `npm test -- src/content/reading/u06.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent verifies q04’s plot order and that summaries include theme without opinion, then commits exactly:

```bash
git add src/content/reading/u06.ts src/content/reading/u06.test.ts
git commit -m "feat(content): add literary summary lesson"
```

### Task 10: Unit 6 Lesson 2 — informational summaries

**Files:** Modify `src/content/reading/u06.ts`, `src/content/reading/u06.test.ts`.

**Interfaces:** Appends manifest row 10 after l01 and completes `unit06Lessons`. Boundary: include central idea and relevant supporting details in concise original wording; do not require theme or plot.

- [ ] Extend `u06.test.ts` with the full row-10 expected object and informational-summary assertions; do not add l02 yet.
- [ ] Run `npm test -- src/content/reading/u06.test.ts`; expect “expected 2 lessons, received 1.”
- [ ] Append the complete row-10 literal and original City for Purple Martins text after l01.
- [ ] Run `npm test -- src/content/reading/u06.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent checks every sample for accuracy, relevance, concision, and original wording, then commits exactly:

```bash
git add src/content/reading/u06.ts src/content/reading/u06.test.ts
git commit -m "feat(content): add informational summary lesson"
```

### Task 11: Unit 7 Lesson 1 — text features and structures

**Files:** Create `src/content/reading/u07.ts`, `src/content/reading/u07.test.ts`.

**Interfaces:** Produces the first literal in `unit07Lessons`; manifest row 11 is exact. Boundary: cover feature contribution and exactly the standard’s problem/solution, chronological, and compare/contrast structures.

- [ ] Create failing `u07.test.ts` with full row 11, exact widget ref, and feature/structure assertions.
- [ ] Run `npm test -- src/content/reading/u07.test.ts`; expect a missing-module failure.
- [ ] Create `u07.ts` with row 11, the Boardwalk Repair Guide, and the exact c2 widget ref.
- [ ] Run `npm test -- src/content/reading/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent explains each feature’s contribution and classifies all three excerpts, then commits exactly:

```bash
git add src/content/reading/u07.ts src/content/reading/u07.test.ts
git commit -m "feat(content): add text features and structures lesson"
```

### Task 12: Unit 7 Lesson 2 — visuals and multimedia

**Files:** Modify `src/content/reading/u07.ts`, `src/content/reading/u07.test.ts`.

**Interfaces:** Appends manifest row 12 after l01 and completes `unit07Lessons`. Boundary: ask what information or experience a visual/audio element contributes; make every representation accessible in text and never require an absent asset.

- [ ] Extend `u07.test.ts` with full row 12 and accessible-representation assertions; do not add l02 yet.
- [ ] Run `npm test -- src/content/reading/u07.test.ts`; expect “expected 2 lessons, received 1.”
- [ ] Append row 12 and the complete Tracking a Storm’s Rain packet after l01; keep l02 widget-free.
- [ ] Run `npm test -- src/content/reading/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent answers every item from rendered text and rejects absent-media cues, then commits exactly:

```bash
git add src/content/reading/u07.ts src/content/reading/u07.test.ts
git commit -m "feat(content): add visual and multimedia meaning lesson"
```

### Task 13: Unit 8 Lesson 1 — purpose and perspective

**Files:** Create `src/content/reading/u08.ts`, `src/content/reading/u08.test.ts`.

**Interfaces:** Produces the first literal in `unit08Lessons`; manifest row 13 is exact. Boundary: explain how perspective conveys what the author wants to answer, explain, describe, or advocate; purpose and point of view are not synonyms.

- [ ] Create failing `u08.test.ts` with full row 13 and paired-purpose/perspective assertions.
- [ ] Run `npm test -- src/content/reading/u08.test.ts`; expect a missing-module failure.
- [ ] Create `u08.ts` with row 13 and both complete original paired texts; keep l01 widget-free.
- [ ] Run `npm test -- src/content/reading/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent marks perspective language and connects it to purpose in both texts, then commits exactly:

```bash
git add src/content/reading/u08.ts src/content/reading/u08.test.ts
git commit -m "feat(content): add author purpose and perspective lesson"
```

### Task 14: Unit 8 Lesson 2 — claims, reasons, and evidence

**Files:** Modify `src/content/reading/u08.ts`, `src/content/reading/u08.test.ts`.

**Interfaces:** Appends manifest row 14 after l01 and completes `unit08Lessons`. Boundary: distinguish the claim from reasons and evidence, then explain the support relationship; do not ask students to write an argument.

- [ ] Extend `u08.test.ts` with full row 14 and claim/reason/evidence assertions; do not add l02 yet.
- [ ] Run `npm test -- src/content/reading/u08.test.ts`; expect “expected 2 lessons, received 1.”
- [ ] Append row 14 and the complete Keep the Refill Station argument; keep l02 widget-free.
- [ ] Run `npm test -- src/content/reading/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent labels every sentence and confirms concrete evidence rather than repeated claims, then commits exactly:

```bash
git add src/content/reading/u08.ts src/content/reading/u08.test.ts
git commit -m "feat(content): add claims reasons and evidence lesson"
```

### Task 15: Unit 9 Lesson 1 — first- and third-person narration

**Files:** Create `src/content/reading/u09.ts`, `src/content/reading/u09.test.ts`.

**Interfaces:** Produces the first literal in `unit09Lessons`; manifest row 15 is exact. Boundary: compare and contrast narration using pronouns and access to thoughts; third person is not automatically all-knowing.

- [ ] Create failing `u09.test.ts` with full row 15, exact widget ref, and narration assertions.
- [ ] Run `npm test -- src/content/reading/u09.test.ts`; expect a missing-module failure.
- [ ] Create `u09.ts` with row 15, both Hidden Trail Marker versions, and the exact c3 POV ref.
- [ ] Run `npm test -- src/content/reading/u09.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent checks narrator, pronouns, knowledge limits, rewritten output, and q13 response, then commits exactly:

```bash
git add src/content/reading/u09.ts src/content/reading/u09.test.ts
git commit -m "feat(content): add narration point of view lesson"
```

### Task 16: Unit 9 Lesson 2 — character perspectives

**Files:** Modify `src/content/reading/u09.ts`, `src/content/reading/u09.test.ts`.

**Interfaces:** Appends manifest row 16 after l01 and completes `unit09Lessons`. Boundary: character perspective means attitudes/interpretations inside the story and must be tied to impact on conflict, mood, events, or reader understanding.

- [ ] Extend `u09.test.ts` with full row 16 and character-perspective impact assertions; do not add l02 yet.
- [ ] Run `npm test -- src/content/reading/u09.test.ts`; expect “expected 2 lessons, received 1.”
- [ ] Append row 16 and the complete Rain on Field Day story; keep l02 widget-free.
- [ ] Run `npm test -- src/content/reading/u09.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent traces both reactions through conflict and resolution, then commits exactly:

```bash
git add src/content/reading/u09.ts src/content/reading/u09.test.ts
git commit -m "feat(content): add character perspective lesson"
```

### Task 17: Unit 10 Lesson 1 — literary structures

**Files:** Create `src/content/reading/u10.ts`, `src/content/reading/u10.test.ts`.

**Interfaces:** Produces the first literal in `unit10Lessons`; manifest row 17 is exact. Boundary: compare structural elements, not merely labels—paragraph/narrator/event sequence, dialogue/speaker/stage directions/scenes, and lines/stanzas/rhythm/imagery.

- [ ] Create failing `u10.test.ts` with full row 17 and structural-comparison assertions.
- [ ] Run `npm test -- src/content/reading/u10.test.ts`; expect a missing-module failure.
- [ ] Create `u10.ts` with row 17 and all three complete Last Lantern forms; keep l01 widget-free.
- [ ] Run `npm test -- src/content/reading/u10.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent compares the triptych and ensures keyed answers follow from form, then commits exactly:

```bash
git add src/content/reading/u10.ts src/content/reading/u10.test.ts
git commit -m "feat(content): add literary structures lesson"
```

### Task 18: Unit 10 Lesson 2 — literal/nonliteral language and word relationships

**Files:** Modify `src/content/reading/u10.ts`, `src/content/reading/u10.test.ts`.

**Interfaces:** Appends manifest row 18 after l01. Boundary: cover every lettered part of AOR.8.1 with common grade-level examples; accepted FB answers must be short and unambiguous.

- [ ] Extend `u10.test.ts` with full row 18, exact widget ref, and all AOR.8.1-part assertions; do not add l02 yet.
- [ ] Run `npm test -- src/content/reading/u10.test.ts`; expect “expected 2 lessons, received 1.”
- [ ] Append row 18, complete Market Morning text, and exact c2 figurative matcher ref.
- [ ] Run `npm test -- src/content/reading/u10.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent labels/paraphrases each expression and verifies word relationships, then commits exactly:

```bash
git add src/content/reading/u10.ts src/content/reading/u10.test.ts
git commit -m "feat(content): add literal and figurative meaning lesson"
```

### Task 19: Unit 10 Lesson 3 — figurative effect

**Files:** Modify `src/content/reading/u10.ts`, `src/content/reading/u10.test.ts`.

**Interfaces:** Appends manifest row 19 after l02 and completes `unit10Lessons`. Boundary: every answer explains both changed meaning and effect on the reader’s experience; device naming alone is insufficient.

- [ ] Extend `u10.test.ts` with full row 19 and meaning/reader-effect assertions; do not add l03 yet.
- [ ] Run `npm test -- src/content/reading/u10.test.ts`; expect “expected 3 lessons, received 2.”
- [ ] Append row 19 and the complete Fog at the Ferry text; keep l03 widget-free because matching device labels does not model reader effect.
- [ ] Run `npm test -- src/content/reading/u10.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent literalizes each figure and verifies the keyed experience/effect, then commits exactly:

```bash
git add src/content/reading/u10.ts src/content/reading/u10.test.ts
git commit -m "feat(content): add figurative language effect lesson"
```

### Task 20: Unit 11 Lesson 1 — inquiry question and provided source

**Files:** Create `src/content/reading/u11.ts`, `src/content/reading/u11.test.ts`.

**Interfaces:** Produces the first literal in `unit11Lessons`; manifest row 20 is exact. Boundary: conduct a short, bounded inquiry by generating a focused question and examining only the provided source.

- [ ] Create failing `u11.test.ts` with full row 20 and inquiry-process assertions.
- [ ] Run `npm test -- src/content/reading/u11.test.ts`; expect a missing-module failure.
- [ ] Create `u11.ts` with row 20 and complete Pollinator Patch source; keep l01 widget-free.
- [ ] Run `npm test -- src/content/reading/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent answers the inquiry, checks every finding, and validates q11’s true process order, then commits exactly:

```bash
git add src/content/reading/u11.ts src/content/reading/u11.test.ts
git commit -m "feat(content): add inquiry and source lesson"
```

### Task 21: Unit 11 Lesson 2 — source credibility

**Files:** Modify `src/content/reading/u11.ts`, `src/content/reading/u11.test.ts`.

**Interfaces:** Appends manifest row 21 after l01. Boundary: judge only provided sources and visible credibility signals; do not teach that domain suffix, visual polish, popularity, or recency alone proves truth.

- [ ] Extend `u11.test.ts` with full row 21, exact widget ref, and credibility-criteria assertions; do not add l02 yet.
- [ ] Run `npm test -- src/content/reading/u11.test.ts`; expect “expected 2 lessons, received 1.”
- [ ] Append row 21, all three fictional source records, and exact c3 credibility ref.
- [ ] Run `npm test -- src/content/reading/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent derives `credibleIds` from all four criteria and verifies every judgment, then commits exactly:

```bash
git add src/content/reading/u11.ts src/content/reading/u11.test.ts
git commit -m "feat(content): add source credibility lesson"
```

### Task 22: Unit 11 Lesson 3 — relevant information

**Files:** Modify `src/content/reading/u11.ts`, `src/content/reading/u11.test.ts`.

**Interfaces:** Appends manifest row 22 after l02. Boundary: relevance is always relative to the exact topic/question; a true or interesting fact may still be irrelevant.

- [ ] Extend `u11.test.ts` with full row 22 and relevance-to-question assertions; do not add l03 yet.
- [ ] Run `npm test -- src/content/reading/u11.test.ts`; expect “expected 3 lessons, received 2.”
- [ ] Append row 22 and all complete Cafeteria Food Waste notes; keep l03 widget-free.
- [ ] Run `npm test -- src/content/reading/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent applies the relevance test to every note and rejects preference-based keys, then commits exactly:

```bash
git add src/content/reading/u11.ts src/content/reading/u11.test.ts
git commit -m "feat(content): add research relevance lesson"
```

### Task 23: Unit 11 Lesson 4 — group findings

**Files:** Modify `src/content/reading/u11.ts`, `src/content/reading/u11.test.ts`.

**Interfaces:** Appends manifest row 23 after l03. Boundary: group by a defensible shared idea and explain the relationship; no `sort` question because categories have no correct sequence.

- [ ] Extend `u11.test.ts` with full row 23 and category/relationship assertions; do not add l04 yet.
- [ ] Run `npm test -- src/content/reading/u11.test.ts`; expect “expected 4 lessons, received 3.”
- [ ] Append row 23 and all nine Safer Routes note cards; keep l04 widget-free and use no sort question.
- [ ] Run `npm test -- src/content/reading/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent groups and justifies all nine findings, then commits exactly:

```bash
git add src/content/reading/u11.ts src/content/reading/u11.test.ts
git commit -m "feat(content): add grouped research findings lesson"
```

### Task 24: Unit 11 Lesson 5 — citation and plagiarism

**Files:** Modify `src/content/reading/u11.ts`, `src/content/reading/u11.test.ts`.

**Interfaces:** Appends manifest row 24 after l04 and completes `unit11Lessons`. Boundary: teach quotation, faithful paraphrase, and one accepted simple citation format; invented practice-source metadata must never be presented as a real publication.

- [ ] Extend `u11.test.ts` with full row 24 and quotation/paraphrase/citation assertions; do not add l05 yet.
- [ ] Run `npm test -- src/content/reading/u11.test.ts`; expect “expected 5 lessons, received 4.”
- [ ] Append row 24 and the complete invented Native Bees practice source; keep l05 widget-free.
- [ ] Run `npm test -- src/content/reading/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] Main agent verifies paraphrases and reconstructs every citation from visible metadata, then commits exactly:

```bash
git add src/content/reading/u11.ts src/content/reading/u11.test.ts
git commit -m "feat(content): add citation and plagiarism lesson"
```

### Master-owned integration and release reference

The four Reading waves stop after producing and reviewing their assigned unit modules/tests. Plan C master Task C4 alone modifies `src/content/reading/index.ts` and `src/content/reading/index.test.ts`, runs the partial-registry red gate (which may fail only for missing later units), extends the existing Unit 1 registration to all 11 exports, proves 24/72/312 counts, and commits exactly those two paths. Master Task C9 alone owns generated-standard drift checks, full test/type/build/single-build gates, browser and keyboard smoke coverage, and Parent Corner review. A wave must return a defect to its owning unit rather than editing shared or registry files during handoff.

## Manual Trace and Self-Review

| Check | Expected | Manual evidence to record |
|---|---:|---|
| Units | 11 | Registry keys `reading-u01`–`reading-u11`, numeric order |
| Lessons | 24 | Manifest rows 1–24 equal runtime rows |
| Regular indicators | 20 distinct | One audit row per code above; allocation may intentionally span paired lessons |
| OE expectations | 6 on every lesson | 144 OE field entries total; 0 OE values in `indicatorCodes` |
| Cards | 72 | Exactly 3 per lesson; 72 distinct canonical IDs |
| Questions | 312 | Exactly 13 per lesson; q01–q13 present for all 24 |
| Pass threshold | 24 values of 8 | No other threshold |
| Guides | Winnie only | All intro speakers `winnie`; no automated speech assessment |
| Review mapping | 72 tag/card pairs | 3 unique tags per lesson; every card targeted |
| Question variety | ≥2 types per lesson | Exact per-row distributions above |
| Widgets | 11 refs / 10 distinct types | Exact Plan B refs on direct-fit cards; 13 lessons intentionally omit a widget |
| Copyright | 24 original lesson packets/passages | Titles and provenance checked by human reviewer |

Run these exact scans from the repository root after all four literal Reading waves have executed and before master Task C4 registration:

```bash
# Empty production arrays in authored Reading modules; expected no output.
rg -n '=\s*\[\s*\]|learnCards:\s*\[\s*\]|pool:\s*\[\s*\]' src/content/reading/u*.ts

# Prohibited planning/implementation prose in authored modules and tests; expected no output.
rg -n -i 'T[O]DO|T[B]D|implement[[:space:]]+later|fill[[:space:]]+in[[:space:]]+details|similar[[:space:]]+to|lorem[[:space:]]+ipsum|placeholder[[:space:]]+(text|passage|question)' src/content/reading

# No invented or stale Reading widget type appears; expected no output.
rg -n -U "widget:\s*\{\s*type:\s*'((?!word-root-builder|context-clue-detective|story-elements-mapper|theme-evidence-collector|central-idea-organizer|text-structure-sorter|summary-builder|pov-switcher|figurative-language-matcher|source-credibility-checker)[a-z0-9-]+)'" src/content/reading/u*.ts --pcre2

# Exact widget occurrence counts; expected lines, in order: 1 1 1 1 1 1 2 1 1 1.
for widget_type in word-root-builder context-clue-detective story-elements-mapper theme-evidence-collector central-idea-organizer text-structure-sorter summary-builder pov-switcher figurative-language-matcher source-credibility-checker; do rg -l "type: '$widget_type'" src/content/reading/u*.ts | xargs rg -o "type: '$widget_type'" | wc -l; done

# Strict config validation is permanent, not regex-based; expected PASS.
npm test -- src/content/reading/u01.test.ts src/content/reading/u02.test.ts src/content/reading/u03.test.ts src/content/reading/u04.test.ts src/content/reading/u05.test.ts src/content/reading/u06.test.ts src/content/reading/u07.test.ts src/content/reading/u08.test.ts src/content/reading/u09.test.ts src/content/reading/u10.test.ts src/content/reading/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts

# No claims of automated oral scoring or live collaboration; expected no output.
rg -n -i 'app (heard|listened|scored|graded) (your|the) (voice|reading)|live (partner|classmate|collaboration)|recording score|words per minute score' src/content/reading/u*.ts

# Canonical count report; expected: lessons=24 cards=72 questions=312.
rg -o "id: 'reading-u[0-9]{2}-l[0-9]{2}'" src/content/reading/u*.ts | wc -l
rg -o "id: 'reading-u[0-9]{2}-l[0-9]{2}-c[1-3]'" src/content/reading/u*.ts | wc -l
rg -o "id: 'reading-u[0-9]{2}-l[0-9]{2}-q(0[1-9]|1[0-3])'" src/content/reading/u*.ts | wc -l
```

Then manually trace, lesson by lesson, these six facts in one review sheet: manifest identity and title; exact regular `indicatorCodes`; exact 3 cards/tags; exact q01–q13 type/tag/card distribution; original-text provenance; and honest OE treatment. A green regex scan is supporting evidence, not a substitute for this trace.

## Main-Agent Review Checkpoints

1. **Dependency checkpoint:** after Task 1; Plan A remediation and completed Plan B are green and interfaces match this plan.
2. **Accepted-work checkpoint:** after Task 2; Unit 1 diff contains only OE contract wiring/test strengthening, with `5fae7cb` prose/answers intact.
3. **Per-lesson checkpoint:** after every Task 3–24 and before its commit; standard fidelity, answer correctness, mappings, original text, and OE honesty reviewed.
4. **Per-unit checkpoint:** after the last lesson in U02, U06, U07, U08, U09, U10, and U11; run the entire unit test and compare ordered manifest rows.
5. **Master registration checkpoint:** master Task C4; exact 24/11/72/312 counts and all permanent gates green before the registry/index-test commit.
6. **Master release checkpoint:** master Task C9; full test/type/build/single-build gates and human browser/parent review complete.

## Promotion Blocker and Literal-Wave Split

This document is ready to promote as the tracked curriculum blueprint at `docs/superpowers/plans/2026-08-29-plan-c2-reading-curriculum-blueprint.md`, but it is **not an implementation-ready Superpowers plan**. It contains one complete new lesson production literal and its complete focused-test literal. The other 21 new lessons still lack exact learner-facing passages, dialogue, distractors, explanations, accepted answers, and answer-key positions. Asking an implementer to invent those during a current Step C violates the writing-plans skill's no-omitted-implementation rule and cannot honestly fit a 2–5 minute action. The blueprint remains non-executable even after promotion.

The hard promotion-to-execution blocker is resolved only by these four exact tracked, fully literal wave plans:

1. `docs/superpowers/plans/2026-08-29-plan-c2a-reading-u01-u03.md` — U01–U03: 6 lessons / 78 questions; preserve/revalidate the 2 accepted U01 lessons and supply the 4 new lessons, including the complete U02-L01 production/test exemplar copied from this blueprint.
2. `docs/superpowers/plans/2026-08-29-plan-c2b-reading-u04-u07.md` — U04–U07: 6 new lessons / 78 questions.
3. `docs/superpowers/plans/2026-08-29-plan-c2c-reading-u08-u10.md` — U08–U10: 7 new lessons / 91 questions.
4. `docs/superpowers/plans/2026-08-29-plan-c2d-reading-u11.md` — U11: 5 new lessons / 65 questions.

Together the four tracked waves account for all 24 lessons / 312 questions, including the 2 accepted lessons and 22 new lessons.

Each wave must retain the exact IDs, titles, indicator codes, card/title/tag triples, q01–q13 distributions, original-text briefs, and widget refs from this blueprint. It must spell out every learner-facing string and answer object, divide each lesson into genuine 2–5 minute red/edit/green actions, include focused tests and `npx tsc -b --pretty false` in every green gate, and provide exact narrow `git add` and `git commit` commands. Only after all four literal plans exist, pass this audit, and execute successfully may master Tasks C4 and C9 perform registration and release.

### Plan-time widget-contract audit

The 11 static refs were parsed independently against the stable R1–R10 config definitions in `plan-b-reading-draft.md`: 11 passed, 0 failed. Exact allocation is one each for word-root, context-clue, story-elements, theme-evidence, central-idea, text-structure, POV, figurative-language, and source-credibility, plus two summary-builder refs. Execution must repeat the parse against the implemented final `WidgetRefSchema`; this planning result is not a substitute for the permanent schema test.

The plan-time empty-array scan finds four deliberate non-placeholder expressions: two test-only empty comparison branches and the two `claims: []` values in the credibility widget, where an empty claims list is the exact Plan B representation of a supplied source with no evidence. No lesson export, `learnCards`, quiz `pool`, target list, or accepted-answer list is empty.

## Blueprint Handoff

Promote this reviewed document verbatim to `docs/superpowers/plans/2026-08-29-plan-c2-reading-curriculum-blueprint.md`. Do not execute its lesson briefs. After master Task C1 and Plan B are complete, author and independently review the four tracked literal waves above; use one fresh review boundary per lesson task and do not parallelize edits to the same unit module. Unit 1 remains registered throughout; return defects to the owning wave rather than patching learner prose during master registration or release work.

### Current implementation handoff

Commit `d91a1b3`: registered/visible Reading Unit 1 contains 2 deepened lessons. The source includes persistent passage references and source-before-question solo inline-check framing; committed regression coverage includes stable dialogue/one-Next/360px/no-clipping and kid/card-race behavior. These changes are evidence to preserve, not a replacement for the 13 unwritten Plan C wave plans.
