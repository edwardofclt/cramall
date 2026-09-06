# Reading Manipulative Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every lesson-used Reading manipulative source-visible, evidence-based, engaging, and connected to Winnie's in-step coaching.

**Architecture:** Extend strict Reading configs with self-contained source and reasoning data, then repair activities by literacy task. Preserve the applicable source throughout each interaction and grade evidence relationships rather than hidden exact prose.

**Tech Stack:** React 18, TypeScript 5, Zod 3, Vitest 2, React Testing Library, user-event, CSS.

**Spec:** `docs/superpowers/specs/2026-09-05-manipulative-coaching-and-usability-design.md`

## Global Constraints

- Requires the committed coaching foundation plan.
- Only Task R1 edits `src/content/schema.ts` and `src/test/widgetFixtures.ts`.
- Do not modify `src/characters/**`, lesson framework files, or non-Reading content.
- Every question/action keeps its complete applicable source visible.
- Do not require a learner to reconstruct source text from a prior/collapsed card.
- Preserve solo-app language; no partner, recording, or fluency-scoring claims.
- Every widget-bearing Reading card gets a two-line Winnie bridge and completion connection.
- Keep 44px controls, keyboard operation, semantic groups, non-color cues, and polite status.

---

### Task R1: Stabilize source and reasoning config contracts

**Files:**
- Modify: `src/content/schema.ts`
- Modify: `src/content/schema.test.ts`
- Modify: `src/test/widgetFixtures.ts`

**Interfaces:**
- Add reusable strict `WidgetSourceSchema { title, text }`.
- Replace story mapper's single `answers` requirement with optional legacy `answers` plus production `source` and `choices`, where each choice is `{id,text,field}` and every configured field has exactly one authored correct choice ID in `answerChoiceIds`.
- Add optional `source` to theme-evidence and central-idea configs; evidence/detail records may carry `sourceQuote` and must occur in `source.text` after whitespace normalization.
- Add summary `requiredDetailIds`, `compositionPrompt`, `minCompositionWords` from 3–40, and `maxCompositionWords` from 3–80 with min ≤ max.
- Add optional exact `availableStructures` to text-structure config and `availableKinds` to figurative-language config; every answer used by an item/pair must be available.
- Redesign credibility source records with strict criterion judgments `{criterion:'expertise'|'publisher'|'evidence'|'currency'|'purpose', strength:'supports'|'concern', reason}`; add `question`, `requiredReasonCount`, and answer judgments `'credible-for-question'|'needs-checking'`.

- [ ] **Step 1: Add failing schema/refinement tests**

Test unknown fields, missing story source, duplicate choice IDs, source quotes absent from
source text, summary word-bound inconsistencies, unavailable category answers, duplicate
credibility criteria, and a credibility answer without enough authored reasons.

```ts
expect(StoryElementsMapperWidgetConfigSchema.safeParse({
  textTitle:'Story', fields:['character'], source:{title:'Story',text:'Ava waits.'},
  choices:[{id:'ava',text:'Ava',field:'character'}], answerChoiceIds:{character:'missing'}
}).success).toBe(false);
```

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- schema widgetFixtures reading
```

- [ ] **Step 3: Implement strict additive/migrating schemas**

Keep legacy story `answers` parseable for tests, but production validation later rejects
legacy mode. Make source-quote matching case-preserving and whitespace-normalized, not
substring-normalized beyond whitespace.

- [ ] **Step 4: Verify and commit**

```sh
npm test -- schema widgetFixtures reading
npx tsc -b --pretty false
git add src/content/schema.ts src/content/schema.test.ts src/test/widgetFixtures.ts
git diff --cached --check
git commit -m "feat(reading): define source-based widget contracts"
```

### Task R2: Make story mapping self-contained and evidence-based

**Files:**
- Modify: `src/widgets/reading/StoryElementsMapper.tsx`
- Modify: `src/widgets/reading/StoryElementsMapper.test.tsx`
- Modify: `src/content/reading/u03.ts`
- Modify: `src/content/reading/u03.test.ts`
- Modify: `src/theme.css`

**Interfaces:** Consumes `source`, `choices`, and `answerChoiceIds`; produces persistent source plus card-to-field mapping.

- [ ] **Step 1: Add failing source/choice tests**

Assert the complete Unit 3 passage stays visible while every field is answered; no exact
textboxes appear in production mode; choice cards can be selected/moved by buttons and
keyboard; wrong Check names one unsupported field; completion requires all correct IDs.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- StoryElementsMapper u03
```

- [ ] **Step 3: Implement source-and-plot-path UI**

Use a semantic source region and fieldsets. Selected cards remain visible on an ordered
plot path; each placement has a named Undo/Move action. Emit `retry` on a committed wrong
map, `milestone` when the first supported field is placed, and one completion.

- [ ] **Step 4: Re-author Unit 3 and Winnie coaching**

Place the complete applicable story in widget config. Intro asks the learner to point
each element to story words; completion names the setting→problem→choices→solution chain.

- [ ] **Step 5: Verify and commit**

```sh
npm test -- StoryElementsMapper u03 content-validation widget-css
npx tsc -b --pretty false
git add src/widgets/reading/StoryElementsMapper.tsx src/widgets/reading/StoryElementsMapper.test.tsx src/content/reading/u03.ts src/content/reading/u03.test.ts src/theme.css
git diff --cached --check
git commit -m "feat(reading): ground story maps in visible text"
```

### Task R3: Rebuild source credibility as reasoned judgment

**Files:**
- Modify: `src/widgets/reading/SourceCredibilityChecker.tsx`
- Modify: `src/widgets/reading/SourceCredibilityChecker.test.tsx`
- Modify: `src/content/reading/u11.ts`
- Modify: `src/content/reading/u11.test.ts`
- Modify: `src/theme.css`

**Interfaces:** Consumes question-specific judgments and criterion strengths/concerns; produces rating plus selected reasons.

- [ ] **Step 1: Add failing credibility tests**

Assert each source shows author expertise, publisher/accountability, evidence/citations,
date relevance, and purpose. Require a rating and at least `requiredReasonCount` selected
reasons. Verify a named author with an unsupported claim is not automatically credible.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- SourceCredibilityChecker u11
```

- [ ] **Step 3: Implement source-folder and criterion-stamp interaction**

Render one fieldset per source, visible supports/concerns, two question-specific rating
buttons, and selectable reason stamps. Check grades both judgment and reason IDs. Retry
names one missing/weak criterion without revealing the correct rating.

- [ ] **Step 4: Re-author Unit 11 and coaching**

Use realistic but self-contained source records. Winnie states that credibility depends
on the question and evidence, not a badge; completion compares why one source is fit for
the question and another needs checking.

- [ ] **Step 5: Verify and commit**

```sh
npm test -- SourceCredibilityChecker u11 content-validation widget-css
npx tsc -b --pretty false
git add src/widgets/reading/SourceCredibilityChecker.tsx src/widgets/reading/SourceCredibilityChecker.test.tsx src/content/reading/u11.ts src/content/reading/u11.test.ts src/theme.css
git diff --cached --check
git commit -m "feat(reading): teach reasoned source credibility"
```

### Task R4: Turn summary selection into planning and composition

**Files:**
- Modify: `src/widgets/reading/SummaryBuilder.tsx`
- Modify: `src/widgets/reading/SummaryBuilder.test.tsx`
- Modify: `src/content/reading/u06.ts`
- Modify: `src/content/reading/u06.test.ts`
- Modify: `src/theme.css`

**Interfaces:** Consumes required main/detail IDs and word bounds; produces selected-plan IDs plus learner composition.

- [ ] **Step 1: Add failing plan/composition tests**

Assert main idea/theme alone cannot complete, required supporting details are enforced,
decorative extras trigger specific retry, and a selected plan must be followed by a
composition within the configured word range. Preserve the source sentences while typing.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- SummaryBuilder u06
```

- [ ] **Step 3: Implement summary strip and composition state**

Move selected sentence cards into a visible concise strip with remove buttons. After a
correct plan, reveal a labeled textarea; completion requires the word bound and nonempty
composition, but does not pretend to semantically score original prose.

- [ ] **Step 4: Re-author both Unit 6 uses and coaching**

Require the exact essential supporting details taught by each card. Winnie distinguishes
planning cards from saying the meaning briefly in the learner's own words.

- [ ] **Step 5: Verify and commit**

```sh
npm test -- SummaryBuilder u06 content-validation widget-css
npx tsc -b --pretty false
git add src/widgets/reading/SummaryBuilder.tsx src/widgets/reading/SummaryBuilder.test.tsx src/content/reading/u06.ts src/content/reading/u06.test.ts src/theme.css
git diff --cached --check
git commit -m "feat(reading): add evidence-based summary composition"
```

### Task R5: Preserve source context for clues, theme, and central idea

**Files:**
- Modify: `src/widgets/reading/ContextClueDetective.tsx`, `src/widgets/reading/ContextClueDetective.test.tsx`
- Modify: `src/widgets/reading/ThemeEvidenceCollector.tsx`, `src/widgets/reading/ThemeEvidenceCollector.test.tsx`
- Modify: `src/widgets/reading/CentralIdeaOrganizer.tsx`, `src/widgets/reading/CentralIdeaOrganizer.test.tsx`
- Modify: `src/content/reading/u02.ts`, `src/content/reading/u02.test.ts`
- Modify: `src/content/reading/u04.ts`, `src/content/reading/u04.test.ts`
- Modify: `src/content/reading/u05.ts`, `src/content/reading/u05.test.ts`
- Modify: `src/theme.css`

**Interfaces:** Produces clue-first classification and source-anchored evidence boards.

- [ ] **Step 1: Add failing source-first tests**

Assert clue choices do not expose `Definition`/`Example` labels before commitment. Assert
complete passages remain visible in theme/central activities and every evidence card has
a visible source quote/location. Reject locally matching false idea/detail pairs.

- [ ] **Step 2: Run and confirm red**

```sh
npm test -- ContextClueDetective ThemeEvidenceCollector CentralIdeaOrganizer u02 u04 u05
```

- [ ] **Step 3: Implement clue reveal and evidence boards**

Commit clue text first, then reveal/ask type. Render source beside a claim board; clip
evidence cards to the selected claim and retain remove controls. Retry identifies one
relationship to reconsider, not the answer.

- [ ] **Step 4: Re-author passages and coaching**

Use complete short sources. Winnie asks whether the idea explains multiple important
details and whether each clipped quote actually supports it.

- [ ] **Step 5: Verify and commit**

```sh
npm test -- ContextClueDetective ThemeEvidenceCollector CentralIdeaOrganizer u02 u04 u05 content-validation widget-css
npx tsc -b --pretty false
git add src/widgets/reading/ContextClueDetective.tsx src/widgets/reading/ContextClueDetective.test.tsx src/widgets/reading/ThemeEvidenceCollector.tsx src/widgets/reading/ThemeEvidenceCollector.test.tsx src/widgets/reading/CentralIdeaOrganizer.tsx src/widgets/reading/CentralIdeaOrganizer.test.tsx src/content/reading/u02.ts src/content/reading/u02.test.ts src/content/reading/u04.ts src/content/reading/u04.test.ts src/content/reading/u05.ts src/content/reading/u05.test.ts src/theme.css
git diff --cached --check
git commit -m "feat(reading): keep evidence tied to source text"
```

### Task R6: Align structure, figurative language, and point of view

**Files:**
- Modify: `src/widgets/reading/TextStructureSorter.tsx`, `src/widgets/reading/TextStructureSorter.test.tsx`
- Modify: `src/widgets/reading/FigurativeLanguageMatcher.tsx`, `src/widgets/reading/FigurativeLanguageMatcher.test.tsx`
- Modify: `src/widgets/reading/PovSwitcher.tsx`, `src/widgets/reading/PovSwitcher.test.tsx`
- Modify: `src/content/reading/u07.ts`, `src/content/reading/u07.test.ts`
- Modify: `src/content/reading/u09.ts`, `src/content/reading/u09.test.ts`
- Modify: `src/content/reading/u10.ts`, `src/content/reading/u10.test.ts`

**Interfaces:** Consumes authored category subsets and produces relationship-specific retry feedback.

- [ ] **Step 1: Add failing alignment tests**

Assert Unit 7 exposes only its three taught structures and Unit 10 only simile, metaphor,
and idiom. Wrong checks name one relationship cue. POV application preserves the event,
changes only authorized narrator forms, and prompts a post-rewrite meaning check.

- [ ] **Step 2: Implement authored categories and feedback**

Build bins from config rather than global constants. On a miss, identify the acted-on
excerpt/phrase and a reasoning question without naming its answer. Keep rewritten source visible.

- [ ] **Step 3: Author coaching, verify, and commit**

```sh
npm test -- TextStructureSorter FigurativeLanguageMatcher PovSwitcher u07 u09 u10 content-validation
npx tsc -b --pretty false
git add src/widgets/reading/TextStructureSorter.tsx src/widgets/reading/TextStructureSorter.test.tsx src/widgets/reading/FigurativeLanguageMatcher.tsx src/widgets/reading/FigurativeLanguageMatcher.test.tsx src/widgets/reading/PovSwitcher.tsx src/widgets/reading/PovSwitcher.test.tsx src/content/reading/u07.ts src/content/reading/u07.test.ts src/content/reading/u09.ts src/content/reading/u09.test.ts src/content/reading/u10.ts src/content/reading/u10.test.ts
git diff --cached --check
git commit -m "fix(reading): align language activities with lessons"
```

### Task R7: Make word roots tactile and finish Reading coaching coverage

**Files:**
- Modify: `src/widgets/reading/WordRootBuilder.tsx`, `src/widgets/reading/WordRootBuilder.test.tsx`
- Modify: `src/content/reading/u02.ts`, `src/content/reading/u02.test.ts`
- Modify: `src/theme.css`

**Interfaces:** Produces snapping morpheme tiles, whole-word meaning check, and complete coaching coverage for Reading widget cards.

- [ ] **Step 1: Add failing tile/meaning tests**

Assert selected prefix/root/suffix visibly snap into left-to-right slots, can be removed by
keyboard, and do not complete until both spelling and whole-word meaning fit. Invalid
prefix/suffix emits strategy-specific coaching.

- [ ] **Step 2: Implement tiles, coaching, and Reading gate**

```sh
npm test -- WordRootBuilder u02
npm test -- widgets reading schema content-validation widget-css
npx tsc -b --pretty false
npm run build
git add src/widgets/reading/WordRootBuilder.tsx src/widgets/reading/WordRootBuilder.test.tsx src/content/reading/u02.ts src/content/reading/u02.test.ts src/theme.css
git diff --cached --check
git commit -m "feat(reading): make word building tactile"
```
