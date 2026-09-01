# Plan C2A: Reading Units 1–3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the exact reviewed Grade 4 Reading content assigned to this wave with no learner-content decisions left to execution.

**Architecture:** Copy the complete TypeScript modules and focused tests in this plan exactly. Each lesson is one red/green/review/commit slice; later slices append their already-supplied object and expected-test rows without changing earlier accepted content.

**Tech Stack:** React 18 content model, TypeScript 5, Zod 3, Vitest 2, Vite 5; no dependency changes.

**Spec:** `docs/superpowers/specs/2026-08-29-cram-all-design.md`

## Global Constraints

- Read `AGENTS.md`, Plan C master, Reading blueprint, final `LessonSchema`, `WidgetRefSchema`, registry, frame, and master C1 helper contracts before editing. Stop unless accepted Plan A remediation, completed Plan B, and the normal baseline are green.
- Modify only the source/test paths named in this plan. Never edit Reading indexes, shared contracts, generated standards, `.github/**`, or `src/characters/**`.
- The code blocks below are complete final-file literals. Copy them exactly; do not design helpers, prose, IDs, options, checks, mappings, or widget fields during execution.
- Every lesson has exactly three cards, three visible-prior-material checks, 13 q01–q13 questions, threshold 8, Winnie intros, exact regular indicators, and `[...READING_OE_CODES]` resolving to all six ordered OE codes.
- The complete source remains visible through `workedExample.passage` and `quiz.reference`. Solo work is sufficient; optional read-aloud is assistance only. No widget state writes scoring, progress, analytics, or storage.

---

### Task 1: Freeze the dependency and workspace gate

**Files:** Read `AGENTS.md`, governing plans/spec, ledgers, `src/content/schema.ts`, `src/content/curriculum.ts`, `src/content/unit-test-helpers.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`; inspect `src/content/reading/u01.ts`, `src/content/reading/u01.test.ts`, `src/content/reading/u02.ts`, `src/content/reading/u02.test.ts`, `src/content/reading/u03.ts`, `src/content/reading/u03.test.ts`.

**Consumes:** Accepted Plan A remediation, completed/reviewed Plan B, and master C1 contracts including `READING_OE_CODES`, `crossCuttingExpectationCodes`, and `expectUnitLessons`.

**Produces:** A recorded green baseline and confirmation that only this wave owns the named files.

- [ ] **Step 1 (2–5 minutes): Inspect ownership.** Run `git status --short`, `git diff --stat`, `git log -8 --oneline`, and read both execution ledgers. Stop on overlapping changes to owned paths.
- [ ] **Step 2 (2–5 minutes): Verify interfaces.** Confirm all widget refs in the final modules below parse with the implemented strict `WidgetRefSchema` and the master helper signature matches the imports in the test literals.
- [ ] **Step 3 (2–5 minutes): Run baseline.** Run `npm test && npx tsc -b --pretty false && npm run build`; record the exact commit and result.

## Complete copy-ready final files

### `src/content/reading/u01.ts`

```ts
import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

const accuracyPassage = `On Saturday morning, Maya arrived at the community garden before the volunteers began planting. A blue sign beside the gate read, “Pollinator Patch—Please Walk Slowly.” Maya opened the garden map and traced a route from the tool shed to the sunflower bed. Her partner, Eli, carried two trowels and a small watering can. “Let’s check the labels before we dig,” Maya said.

At the first bed, they found a card that said, “Basil needs sunlight and careful watering.” Maya read the long sentence slowly, then explained that the basil should get water at its roots, not on every leaf.

A breeze lifted the edge of the map. Maya noticed that the arrow pointed toward the compost bin, not the greenhouse. She reread the map and changed direction before the group walked too far.

Near the sunflowers, Eli spotted a monarch butterfly resting on a purple flower. The volunteers grew quiet for a moment, then kept working in steady pairs. By noon, they had planted basil, checked the map, and filled the watering can again. Maya smiled because careful reading had helped the garden team work safely and finish on time.`;

const expressionPassage = `On Thursday afternoon, Tomas and his grandfather waited beside the harbor as a thick fog rolled over the water. The fishing boats were tied safely to the dock, but the far shore had disappeared. Tomas held a small brass compass in his hand. “Do you think the lighthouse can still see us?” he asked.

Grandfather pointed toward the gray water. For several seconds, everything was quiet except for the tap of a rope against a wooden post. Then a pale beam swept across the fog. It vanished, returned, and flashed once more.

“There it is!” Tomas whispered. He stepped closer to the railing, then stopped when Grandfather gently touched his sleeve. “Stay behind the yellow line,” Grandfather said. Tomas nodded and took one careful step back.

The beam flashed again, this time brighter. Tomas grinned. “The harbor light is showing boats the safe way home!” Grandfather smiled and said, “Yes, and it helped us find our way too.” Tomas tucked the compass into his pocket. As they walked along the dock, he read the yellow safety sign aloud so they could keep a safe distance from the edge.`;

export const unit01Lessons = [
  {
    id: 'reading-u01-l01',
    unitId: 'reading-u01',
    title: 'Read Accurately at a Good Pace',
    indicatorCodes: ['ELA.4.F.4.2'],
    crossCuttingExpectationCodes: [...READING_OE_CODES],
    intro: [
      { speaker: 'winnie', pose: 'talk', text: 'Fluent reading begins with getting the words right and understanding what they say.' },
      { speaker: 'winnie', pose: 'think', text: 'A useful pace is not a race; it gives your brain time to build meaning.' },
      { speaker: 'winnie', pose: 'talk', text: 'You can practice fluency while reading aloud or silently.' },
      { speaker: 'winnie', pose: 'cheer', text: 'Let’s combine accuracy, an appropriate pace, expression, and intonation so the message stays clear.' },
    ],
    learnCards: [
      {
        id: 'reading-u01-l01-c1',
        title: 'Accuracy protects the meaning',
        blocks: [
          { kind: 'text', text: 'Fluent readers read the words the author wrote. They notice a mistake, return to it, and reread the sentence so it makes sense.' },
          { kind: 'example', text: 'In “The tiny crab slipped under the striped shell,” changing crab to cap would change the picture, so an accurate reader checks the letters and rereads.' },
          { kind: 'tip', text: 'Use the sentence meaning and every letter in a word; do not guess from only the first sound.' },
        ],
        check: {
          prompt: 'A reader changes “crab” to “cap” in the tiny crab sentence. Which move best protects the meaning?',
          choices: [
            { id: 'a', text: 'Check every letter in “crab,” correct it, and reread the sentence' },
            { id: 'b', text: 'Keep going because the two words look alike' },
            { id: 'c', text: 'Skip the word and guess later' },
          ],
          correctChoiceId: 'a',
          explanation: 'Check the letters in crab, correct the word, then reread so the tiny crab still makes sense.',
        },
      },
      {
        id: 'reading-u01-l01-c2',
        title: 'An appropriate pace fits the text',
        blocks: [
          { kind: 'text', text: 'Appropriate rate means reading smoothly enough to connect ideas while slowing down for challenging words, important details, or complex sentences.' },
          { kind: 'example', text: 'A reader might move steadily through “Rain tapped the roof,” then pause to unpack a sentence explaining how a rain gauge works.' },
          { kind: 'tip', text: 'Read meaningful groups of words instead of racing word by word or stopping after every word.' },
        ],
        check: {
          prompt: 'What pace best helps a reader understand the sentence explaining how a rain gauge works?',
          choices: [
            { id: 'a', text: 'Race through it so the sentence ends faster' },
            { id: 'b', text: 'Read smoothly, then slow down for the rain-gauge details' },
            { id: 'c', text: 'Pause after every single word' },
          ],
          correctChoiceId: 'b',
          explanation: 'Keep a smooth pace across the sentence, but slow down to unpack the important rain-gauge details.',
        },
      },
      {
        id: 'reading-u01-l01-c3',
        title: 'Check fluency by checking meaning',
        blocks: [
          { kind: 'text', text: 'Build stamina by reading varied academic and personal texts aloud and silently for longer stretches, then explain what you understood.' },
          { kind: 'text', text: 'Written, oral, visual, digital, and interactive texts may combine words with maps, captions, images, or audio, so connect each part to the same message.' },
          { kind: 'example', text: 'After reading “Muddy paw prints crossed the porch, but the dog bed was empty,” infer what may have happened and cite “muddy paw prints” as evidence.' },
          { kind: 'tip', text: 'Use a three-line reflection labeled Accuracy, Pace, and Meaning/Evidence; this consistent format helps you create careful work.' },
          { kind: 'tip', text: 'Practice independently: read a short section, use the Read aloud button to compare a model pace, then write an Accuracy, Pace, and Meaning/Evidence self-reflection. The app does not listen to or score your voice.' },
        ],
        check: {
          prompt: 'Which note checks meaning with evidence from the muddy-paw sentence?',
          choices: [
            { id: 'a', text: 'I read quickly, so I must have understood' },
            { id: 'b', text: 'I liked the striped shell because it is my favorite color' },
            { id: 'c', text: 'The dog bed was empty, and the muddy paw prints suggest a dog left the porch' },
          ],
          correctChoiceId: 'c',
          explanation: 'The muddy paw prints are evidence for the inference, so the note checks meaning instead of only reporting reading speed.',
        },
      },
    ],
    workedExample: {
      title: 'Fluency check at the community garden',
      passage: { title: 'Original passage', text: accuracyPassage },
      steps: [
        'Read accurately by checking Pollinator, trowels, compost, and greenhouse instead of replacing them with easier-looking words.',
        'Use a steady pace through the action, pause at the paragraph breaks, and slow down for the map directions and the basil care card.',
        'Check comprehension by explaining why Maya rereads the map and by citing details that show careful reading helped the team.',
      ],
    },
    quiz: {
      passThreshold: 8,
      reference: { title: 'Read this passage', text: accuracyPassage },
      pool: [
        {
          id: 'reading-u01-l01-q01',
          type: 'multiple-choice',
          prompt: 'Maya reads “Pollinator” as “planet” in the blue sign. What should she do to protect accuracy?',
          choices: [
            { id: 'a', text: 'Keep going because both words begin with p' },
            { id: 'b', text: 'Check every letter in Pollinator, correct the word, and reread the sentence' },
            { id: 'c', text: 'Guess another p word without looking at the ending' },
            { id: 'd', text: 'Skip the sign and never return to it' },
          ],
          correctChoiceId: 'b',
          explanation: 'Checking every letter and rereading corrects the word so the sign keeps its meaning.',
          conceptTag: 'reading-accuracy',
          reviewCardId: 'reading-u01-l01-c1',
        },
        {
          id: 'reading-u01-l01-q02',
          type: 'multiple-choice',
          prompt: 'A reader says “towels” instead of “trowels” when describing what Eli carries. Which fluency skill needs attention?',
          choices: [
            { id: 'a', text: 'Accuracy' },
            { id: 'b', text: 'Volume' },
            { id: 'c', text: 'Page turning' },
            { id: 'd', text: 'Memorization' },
          ],
          correctChoiceId: 'a',
          explanation: 'Replacing trowels with towels changes the word and can change the meaning.',
          conceptTag: 'reading-accuracy',
          reviewCardId: 'reading-u01-l01-c1',
        },
        {
          id: 'reading-u01-l01-q03',
          type: 'true-false',
          prompt: 'True or false: Maya’s rereading of the map is a useful strategy because it helps her notice the arrow points to the compost bin, not the greenhouse.',
          choices: [
            { id: 'true', text: 'True — rereading can repair meaning' },
            { id: 'false', text: 'False — keep going without checking' },
          ],
          correctChoiceId: 'true',
          explanation: 'Rereading lets Maya correct her understanding of the map before the group walks too far.',
          conceptTag: 'reading-accuracy',
          reviewCardId: 'reading-u01-l01-c1',
        },
        {
          id: 'reading-u01-l01-q04',
          type: 'multiple-choice',
          prompt: 'Maya may not know the word “traced” at first. Which accurate-reading check would help her clarify its meaning in the garden map sentence?',
          choices: [
            { id: 'a', text: 'Reread the whole sentence and use the route on the map as a clue' },
            { id: 'b', text: 'Skip traced and decide the sentence cannot have meaning' },
            { id: 'c', text: 'Replace traced with a random word that begins with t' },
            { id: 'd', text: 'Read only the first word of the sentence' },
          ],
          correctChoiceId: 'a',
          explanation: 'Rereading the sentence and looking at the route helps a reader infer that Maya followed its path on the map.',
          conceptTag: 'reading-accuracy',
          reviewCardId: 'reading-u01-l01-c1',
        },
        {
          id: 'reading-u01-l01-q05',
          type: 'multiple-choice',
          prompt: 'Why is it sensible for a reader to slow down for the basil care card?',
          choices: [
            { id: 'a', text: 'The card contains a detail about how to care for the basil correctly' },
            { id: 'b', text: 'Readers should always stop after every word' },
            { id: 'c', text: 'The card is less important than every other part of the passage' },
            { id: 'd', text: 'Slowing down means skipping the sentence' },
          ],
          correctChoiceId: 'a',
          explanation: 'The card tells the team where and how to water the basil, so its meaning matters to their work.',
          conceptTag: 'appropriate-pace',
          reviewCardId: 'reading-u01-l01-c2',
        },
        {
          id: 'reading-u01-l01-q06',
          type: 'true-false',
          prompt: 'True or false: The volunteers should read “Pollinator Patch—Please Walk Slowly” quickly without thinking because it is only a sign.',
          choices: [
            { id: 'true', text: 'True — signs never give important directions' },
            { id: 'false', text: 'False — the sign gives a safety direction that the team should understand' },
          ],
          correctChoiceId: 'false',
          explanation: 'The sign tells visitors to walk slowly near the pollinator patch, so readers should make sure they understand it.',
          conceptTag: 'appropriate-pace',
          reviewCardId: 'reading-u01-l01-c2',
        },
        {
          id: 'reading-u01-l01-q07',
          type: 'multiple-choice',
          prompt: 'Which event happens after Maya rereads the map?',
          choices: [
            { id: 'a', text: 'She and the group walk too far toward the greenhouse' },
            { id: 'b', text: 'She changes direction before the group walks too far' },
            { id: 'c', text: 'Eli plants basil before checking its label' },
            { id: 'd', text: 'The volunteers leave before reaching the garden' },
          ],
          correctChoiceId: 'b',
          explanation: 'The passage says Maya rereads the map and changes direction before the group walks too far.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
        {
          id: 'reading-u01-l01-q08',
          type: 'multiple-choice',
          prompt: 'Which sentence best states the main idea of the passage?',
          choices: [
            { id: 'a', text: 'Maya and Eli use careful reading to help their garden team work safely and correctly' },
            { id: 'b', text: 'Monarch butterflies are always found on purple flowers' },
            { id: 'c', text: 'Every garden must have a greenhouse and a compost bin' },
            { id: 'd', text: 'Trowels are the only tool volunteers need for gardening' },
          ],
          correctChoiceId: 'a',
          explanation: 'The passage shows the team reading signs, a care card, and a map so they can make good choices together.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
        {
          id: 'reading-u01-l01-q09',
          type: 'true-false',
          prompt: 'True or false: A reader can pause briefly at a period because it usually closes a complete sentence.',
          choices: [
            { id: 'true', text: 'True — that pause separates the complete first sentence' },
            { id: 'false', text: 'False — punctuation should never affect pace' },
          ],
          correctChoiceId: 'true',
          explanation: 'A period normally closes a complete thought, so a brief pause helps readers separate ideas.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
        {
          id: 'reading-u01-l01-q10',
          type: 'multiple-choice',
          prompt: 'What is a useful way to read a sentence that contains several connected actions?',
          choices: [
            { id: 'a', text: 'Read only the first action and skip the rest' },
            { id: 'b', text: 'Read in meaningful groups and keep the actions connected' },
            { id: 'c', text: 'Pause for a long time after every word' },
            { id: 'd', text: 'Ignore the action words' },
          ],
          correctChoiceId: 'b',
          explanation: 'Meaningful groups help a reader hold each action in mind and understand how they connect.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
        {
          id: 'reading-u01-l01-q11',
          type: 'multiple-choice',
          prompt: 'A passage says, “Jordan zipped a raincoat and tucked a book into a dry bag.” Which inference is best supported?',
          choices: [
            { id: 'a', text: 'Jordan expects wet weather' },
            { id: 'b', text: 'Jordan has never seen a book' },
            { id: 'c', text: 'Jordan is preparing a garden bed' },
            { id: 'd', text: 'Jordan will not need to carry anything' },
          ],
          correctChoiceId: 'a',
          explanation: 'A raincoat and dry bag are clues that Jordan expects rain or another wet condition.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
        {
          id: 'reading-u01-l01-q12',
          type: 'multiple-choice',
          prompt: 'Which reflection uses text evidence to explain a fluency choice?',
          choices: [
            { id: 'a', text: 'I changed a word but did not reread it' },
            { id: 'b', text: 'I raced without noticing punctuation' },
            { id: 'c', text: 'I paused at a sentence break because the period showed one idea had ended' },
            { id: 'd', text: 'I skipped a sentence and gave no reason' },
          ],
          correctChoiceId: 'c',
          explanation: 'The reflection names a voice choice and the punctuation clue that supports it.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
        {
          id: 'reading-u01-l01-q13',
          type: 'true-false',
          prompt: 'True or false: During independent app practice, you can use Read aloud to compare a model with the text and then write a self-reflection.',
          choices: [
            { id: 'true', text: 'True — the model and reflection can help you check pace and meaning' },
            { id: 'false', text: 'False — the app requires another student to listen' },
          ],
          correctChoiceId: 'true',
          explanation: 'Read aloud gives you a model to compare with the text, and a self-reflection helps you explain your own pace and meaning. The app does not listen to or score your voice.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
      ],
    },
  },
  {
    id: 'reading-u01-l02',
    unitId: 'reading-u01',
    title: 'Read with Expression and Intonation',
    indicatorCodes: ['ELA.4.F.4.2'],
    crossCuttingExpectationCodes: [...READING_OE_CODES],
    intro: [
      { speaker: 'winnie', pose: 'talk', text: 'Accurate words and an appropriate pace create a strong base for fluent reading.' },
      { speaker: 'winnie', pose: 'think', text: 'Expression adds feeling and emphasis that fit the author’s meaning.' },
      { speaker: 'winnie', pose: 'talk', text: 'Intonation is the way a voice rises and falls across a sentence.' },
      { speaker: 'winnie', pose: 'cheer', text: 'Let’s use punctuation and text evidence to make meaning easier to hear and understand.' },
    ],
    learnCards: [
      {
        id: 'reading-u01-l02-c1',
        title: 'Expression reveals meaning',
        blocks: [
          { kind: 'text', text: 'Expression is not simply being loud; it means changing emphasis, tone, or volume to match the ideas and feelings in a text.' },
          { kind: 'example', text: 'In “At last, the lantern glowed,” emphasizing at last can show relief after a long wait.' },
          { kind: 'tip', text: 'Infer a speaker’s feeling from details, then cite the words that guided your voice choice.' },
        ],
        check: {
          prompt: 'What expression best fits emphasizing “at last” in the lantern sentence?',
          choices: [
            { id: 'a', text: 'A bright, relieved voice that shows “at last” means the long wait has ended' },
            { id: 'b', text: 'A flat voice that hides the relief in “at last”' },
            { id: 'c', text: 'An angry voice that does not fit the relief in “at last”' },
          ],
          correctChoiceId: 'a',
          explanation: 'The words “at last” show relief after a long wait, so a bright voice helps listeners hear that feeling.',
        },
      },
      {
        id: 'reading-u01-l02-c2',
        title: 'Intonation follows ideas and punctuation',
        blocks: [
          { kind: 'text', text: 'Intonation is the rise and fall of the voice. A question may rise, a completed statement usually settles, and punctuation helps group ideas.' },
          { kind: 'example', text: 'Compare “You found the trail?” with “You found the trail!”; the same words carry different meanings when punctuation and intonation change.' },
          { kind: 'tip', text: 'Let commas create brief pauses, but use the sentence meaning—not a rigid timer—to decide how the line should sound.' },
        ],
        check: {
          prompt: 'Which intonation fits the question, “You found the trail?”',
          choices: [
            { id: 'a', text: 'Let the voice rise a little at the end of “You found the trail?” to show a question' },
            { id: 'b', text: 'Let the voice drop as if it were a finished statement' },
            { id: 'c', text: 'Read the sentence without letting the question mark affect the voice' },
          ],
          correctChoiceId: 'a',
          explanation: 'The question mark in “You found the trail?” signals uncertainty, so a small rise helps listeners hear that the speaker is asking.',
        },
      },
      {
        id: 'reading-u01-l02-c3',
        title: 'Practice independently and reflect',
        blocks: [
          { kind: 'text', text: 'Practice with varied academic and personal texts, both orally and silently, and gradually extend how long you read with attention.' },
          { kind: 'text', text: 'For print, oral, visual, digital, or interactive texts, connect captions, images, audio, and written words before choosing an expressive reading.' },
          { kind: 'example', text: 'Preview a line, infer its feeling, read it accurately at an appropriate pace, and then explain how one text clue shaped your expression.' },
          { kind: 'tip', text: 'Use the accepted reflection format Text clue → Voice choice → Meaning connection so your reasoning is clear and complete.' },
          { kind: 'tip', text: 'Practice independently with the app: read the passage, use Read aloud to hear a model, and write a Text clue → Voice choice → Meaning connection self-reflection. The app does not listen to or score your voice.' },
        ],
        check: {
          prompt: 'Which reflection connects a text clue, a voice choice, and meaning?',
          choices: [
            { id: 'a', text: 'I used a loud voice because loud voices are always better' },
            { id: 'b', text: 'The words “at last” are my text clue; I used a bright voice because they show the wait ended' },
            { id: 'c', text: 'I read the sentence twice but cannot explain why' },
          ],
          correctChoiceId: 'b',
          explanation: 'The words “at last” are the clue, the bright voice is the choice, and relief is the meaning connection.',
        },
      },
    ],
    workedExample: {
      title: 'Give the lighthouse scene a meaningful voice',
      passage: { title: 'Original passage', text: expressionPassage },
      steps: [
        'Use rising intonation for Tomas’s first question because he is uncertain and looking for an answer.',
        'Read the quiet harbor details steadily, pausing at the paragraph breaks so listeners can picture the fog and the returning beam.',
        'Use brighter expression on “There it is!” and Tomas’s final statement because the exclamation, grin, and lighthouse beam show relief and excitement.',
      ],
    },
    quiz: {
      passThreshold: 8,
      reference: { title: 'Read this passage', text: expressionPassage },
      pool: [
        {
          id: 'reading-u01-l02-q01',
          type: 'multiple-choice',
          prompt: 'Which voice best fits Tomas’s first line, “Do you think the lighthouse can still see us?”',
          choices: [
            { id: 'a', text: 'A flat voice that ignores the question mark' },
            { id: 'b', text: 'A shouting voice on every word' },
            { id: 'c', text: 'A curious voice that rises with the question' },
            { id: 'd', text: 'A silent pause instead of the sentence' },
          ],
          correctChoiceId: 'c',
          explanation: 'A curious rising voice matches the question and helps listeners follow its meaning.',
          conceptTag: 'intonation-and-punctuation',
          reviewCardId: 'reading-u01-l02-c2',
        },
        {
          id: 'reading-u01-l02-q02',
          type: 'multiple-choice',
          prompt: 'Which line should sound brightest and most relieved?',
          choices: [
            { id: 'a', text: '“Do you think the lighthouse can still see us?” with quiet uncertainty' },
            { id: 'b', text: '“There it is!” with bright, excited relief' },
            { id: 'c', text: '“Everything was quiet” in a rushed monotone' },
            { id: 'd', text: '“Grandfather pointed” as an angry shout' },
          ],
          correctChoiceId: 'b',
          explanation: 'The exclamation and discovery show relief and excitement in “There it is!”',
          conceptTag: 'expression-and-meaning',
          reviewCardId: 'reading-u01-l02-c1',
        },
        {
          id: 'reading-u01-l02-q03',
          type: 'true-false',
          prompt: 'True or false: Reading the quiet fog description and Tomas’s excited exclamation with exactly the same tone would make the passage clearer.',
          choices: [
            { id: 'true', text: 'True — one tone fits every idea' },
            { id: 'false', text: 'False — tone should respond to meaning' },
          ],
          correctChoiceId: 'false',
          explanation: 'The quiet harbor scene and excited discovery have different feelings, so their tone should change to match the meaning.',
          conceptTag: 'expression-and-meaning',
          reviewCardId: 'reading-u01-l02-c1',
        },
        {
          id: 'reading-u01-l02-q04',
          type: 'multiple-choice',
          prompt: 'What happens immediately after the pale beam sweeps across the fog?',
          choices: [
            { id: 'a', text: 'The beam stays bright for the rest of the afternoon' },
            { id: 'b', text: 'Tomas runs across the yellow safety line' },
            { id: 'c', text: 'The beam vanishes, returns, and flashes once more' },
            { id: 'd', text: 'Grandfather unties the fishing boats' },
          ],
          correctChoiceId: 'c',
          explanation: 'The passage says the beam vanished, returned, and flashed once more after it first swept across the fog.',
          conceptTag: 'expressive-practice',
          reviewCardId: 'reading-u01-l02-c3',
        },
        {
          id: 'reading-u01-l02-q05',
          type: 'multiple-choice',
          prompt: 'Which detail best supports the inference that Grandfather is helping Tomas stay safe?',
          choices: [
            { id: 'a', text: 'He gently touches Tomas’s sleeve and tells him to stay behind the yellow line' },
            { id: 'b', text: 'He points toward the gray water' },
            { id: 'c', text: 'He waits beside the harbor' },
            { id: 'd', text: 'He smiles at the lighthouse beam' },
          ],
          correctChoiceId: 'a',
          explanation: 'Grandfather gives a safety reminder and stops Tomas from stepping too close to the edge.',
          conceptTag: 'expression-and-meaning',
          reviewCardId: 'reading-u01-l02-c1',
        },
        {
          id: 'reading-u01-l02-q06',
          type: 'multiple-choice',
          prompt: 'How should Tomas’s voice change from “Do you think the lighthouse can still see us?” to “There it is!”?',
          choices: [
            { id: 'a', text: 'Keep the same flat tone because both lines come from Tomas' },
            { id: 'b', text: 'Start curious and questioning, then become brighter and more excited when he sees the beam' },
            { id: 'c', text: 'Start angry, then become sleepy because the harbor is quiet' },
            { id: 'd', text: 'Whisper every word so the punctuation cannot be heard' },
          ],
          correctChoiceId: 'b',
          explanation: 'The question mark and Tomas’s uncertainty support a curious question, while the exclamation and discovery support a brighter, excited voice.',
          conceptTag: 'expression-and-meaning',
          reviewCardId: 'reading-u01-l02-c1',
        },
        {
          id: 'reading-u01-l02-q07',
          type: 'multiple-choice',
          prompt: 'Which reading best matches Grandfather’s line, “Stay behind the yellow line,”?',
          choices: [
            { id: 'a', text: 'Use a calm, firm voice because the line gives a safety direction' },
            { id: 'b', text: 'Raise the voice as though Grandfather is unsure' },
            { id: 'c', text: 'Pause after each letter in yellow' },
            { id: 'd', text: 'Rush through the words and ignore their warning' },
          ],
          correctChoiceId: 'a',
          explanation: 'Grandfather is giving a caring safety instruction, so a calm, firm delivery fits the meaning.',
          conceptTag: 'intonation-and-punctuation',
          reviewCardId: 'reading-u01-l02-c2',
        },
        {
          id: 'reading-u01-l02-q08',
          type: 'multiple-choice',
          prompt: 'Which sentence best states the main idea of the passage?',
          choices: [
            { id: 'a', text: 'Tomas and Grandfather safely use lighthouse and safety-sign clues to find their way through fog' },
            { id: 'b', text: 'Fishing boats should always be untied when fog arrives' },
            { id: 'c', text: 'A brass compass can make a lighthouse brighter' },
            { id: 'd', text: 'Yellow is the only color used at a harbor' },
          ],
          correctChoiceId: 'a',
          explanation: 'The passage follows Tomas and Grandfather as they notice the lighthouse, follow safety directions, and walk safely along the dock.',
          conceptTag: 'expressive-practice',
          reviewCardId: 'reading-u01-l02-c3',
        },
        {
          id: 'reading-u01-l02-q09',
          type: 'true-false',
          prompt: 'A comma can suggest a brief pause, but sentence meaning also guides the voice.',
          choices: [
            { id: 'true', text: 'True — punctuation and meaning work together' },
            { id: 'false', text: 'False — commas require the same timed pause everywhere' },
          ],
          correctChoiceId: 'true',
          explanation: 'A comma groups ideas, while the whole sentence determines the most meaningful phrasing.',
          conceptTag: 'intonation-and-punctuation',
          reviewCardId: 'reading-u01-l02-c2',
        },
        {
          id: 'reading-u01-l02-q10',
          type: 'multiple-choice',
          prompt: 'Which practice sequence best supports expressive fluency?',
          choices: [
            { id: 'a', text: 'Read every line in a flat voice and ignore the punctuation' },
            { id: 'b', text: 'Make the question and final exclamation sound exactly alike' },
            { id: 'c', text: 'Skip the dialogue and read only the sentence about the fog' },
            { id: 'd', text: 'Read with expression and intonation: raise the question, read the middle steadily, brighten the final line, and explain the text clues' },
          ],
          correctChoiceId: 'd',
          explanation: 'Punctuation and text details guide different voice choices, followed by an evidence-based reflection.',
          conceptTag: 'expressive-practice',
          reviewCardId: 'reading-u01-l02-c3',
        },
        {
          id: 'reading-u01-l02-q11',
          type: 'multiple-choice',
          prompt: 'A character says, “We made it home!” after a long walk. What feeling should the line convey?',
          choices: [
            { id: 'a', text: 'Sleepiness because the walk was long' },
            { id: 'b', text: 'Anger because the character used an exclamation point' },
            { id: 'c', text: 'Relief and excitement because the character has reached home' },
            { id: 'd', text: 'No feeling because the final line should be flat' },
          ],
          correctChoiceId: 'c',
          explanation: 'The words “made it home” and the exclamation point support a relieved, excited reading.',
          conceptTag: 'expressive-practice',
          reviewCardId: 'reading-u01-l02-c3',
        },
        {
          id: 'reading-u01-l02-q12',
          type: 'multiple-choice',
          prompt: 'Which independent app practice best supports expressive fluency?',
          choices: [
            { id: 'a', text: 'Skip the punctuation and try to finish as fast as possible' },
            { id: 'b', text: 'Read the passage, use Read aloud to hear a model, and write how a text clue shapes your voice choice' },
            { id: 'c', text: 'Give yourself a score without naming any text evidence' },
            { id: 'd', text: 'Change the passage so it sounds more exciting' },
          ],
          correctChoiceId: 'b',
          explanation: 'The model gives you a way to compare phrasing, and the reflection connects a text clue to your expressive voice choice. The app does not listen to or score your voice.',
          conceptTag: 'expressive-practice',
          reviewCardId: 'reading-u01-l02-c3',
        },
        {
          id: 'reading-u01-l02-q13',
          type: 'true-false',
          prompt: 'The reflection format Text clue → Voice choice → Meaning connection helps explain and justify an expressive reading.',
          choices: [
            { id: 'true', text: 'True — the format links evidence, choice, and meaning' },
            { id: 'false', text: 'False — quality reflection should omit text evidence' },
          ],
          correctChoiceId: 'true',
          explanation: 'The format creates clear work by connecting a voice decision to evidence and meaning.',
          conceptTag: 'expressive-practice',
          reviewCardId: 'reading-u01-l02-c3',
        },
      ],
    },
  },
] satisfies Lesson[];
```

### `src/content/reading/u01.test.ts`

```ts
import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { expectUnitLessons } from '../unit-test-helpers';
import { validateLesson, type LearnCard, type Question } from '../schema';
import { unit01Lessons } from './u01';

const expectedLessons = [
  {
    id: 'reading-u01-l01',
    title: 'Read Accurately at a Good Pace',
  },
  {
    id: 'reading-u01-l02',
    title: 'Read with Expression and Intonation',
  },
] as const;

const expectedManifest = [
  { id: 'reading-u01-l01', unitId: 'reading-u01', title: 'Read Accurately at a Good Pace', indicatorCodes: ['ELA.4.F.4.2'] },
  { id: 'reading-u01-l02', unitId: 'reading-u01', title: 'Read with Expression and Intonation', indicatorCodes: ['ELA.4.F.4.2'] },
] as const;

const expectedPassageQuestionIds = [
  [
    'reading-u01-l01-q01',
    'reading-u01-l01-q02',
    'reading-u01-l01-q03',
    'reading-u01-l01-q04',
    'reading-u01-l01-q05',
    'reading-u01-l01-q06',
    'reading-u01-l01-q07',
    'reading-u01-l01-q08',
  ],
  [
    'reading-u01-l02-q01',
    'reading-u01-l02-q02',
    'reading-u01-l02-q03',
    'reading-u01-l02-q04',
    'reading-u01-l02-q05',
    'reading-u01-l02-q06',
    'reading-u01-l02-q07',
    'reading-u01-l02-q08',
  ],
] as const;

const passageQuestionDetailExpectations = [
  [
    ['reading-u01-l01-q01', /Pollinator.*accuracy|accuracy.*Pollinator/i],
    ['reading-u01-l01-q02', /towels.*trowels|trowels.*towels/i],
    ['reading-u01-l01-q03', /compost bin.*greenhouse|greenhouse.*compost bin/i],
    ['reading-u01-l01-q04', /traced.*route|route.*map/i],
    ['reading-u01-l01-q05', /basil.*care|care.*basil/i],
    ['reading-u01-l01-q06', /Pollinator Patch.*sign|sign.*Pollinator Patch/i],
    ['reading-u01-l01-q07', /Maya rereads the map.*changes direction/i],
    ['reading-u01-l01-q08', /Maya and Eli.*garden team|garden team.*Maya and Eli/i],
  ],
  [
    ['reading-u01-l02-q01', /lighthouse can still see us|curious.*question/i],
    ['reading-u01-l02-q02', /There it is.*relief|relief.*There it is/i],
    ['reading-u01-l02-q03', /quiet fog.*excited exclamation|excited exclamation.*quiet fog/i],
    ['reading-u01-l02-q04', /^(?=[\s\S]*pale beam)(?=[\s\S]*beam vanish)/i],
    ['reading-u01-l02-q05', /^(?=[\s\S]*Grandfather)(?=[\s\S]*yellow line)/i],
    ['reading-u01-l02-q06', /lighthouse can still see us.*There it is|There it is.*lighthouse can still see us/i],
    ['reading-u01-l02-q07', /Grandfather.*yellow line|yellow line.*safety/i],
    ['reading-u01-l02-q08', /Tomas and Grandfather.*fog|fog.*Tomas and Grandfather/i],
  ],
] as const;

const inlineCheckExpectations = new Map([
  ['reading-u01-l01-c1', { prompt: /crab|accuracy/i, explanation: /letter.*reread/i }],
  ['reading-u01-l01-c2', { prompt: /pace|rain gauge/i, explanation: /smooth.*slow/i }],
  ['reading-u01-l01-c3', { prompt: /meaning|evidence/i, explanation: /paw prints.*evidence/i }],
  ['reading-u01-l02-c1', { prompt: /expression|at last/i, explanation: /lantern|relief/i }],
  ['reading-u01-l02-c2', { prompt: /intonation|question/i, explanation: /rise|question mark/i }],
  ['reading-u01-l02-c3', { prompt: /reflection|text clue/i, explanation: /clue.*voice.*meaning/i }],
]);

type InlineCheckSequenceExpectation = {
  prompt: RegExp;
  correctChoice: RegExp;
  explanation: RegExp;
  future: RegExp;
};

const inlineCheckSequenceExpectations = new Map<string, InlineCheckSequenceExpectation>([
  ['reading-u01-l01-c1', {
    prompt: /tiny crab|crab.*cap/i,
    correctChoice: /crab/i,
    explanation: /crab/i,
    future: /Maya|trowels|towels|garden|basil|compost|greenhouse|butterfly|Pollinator|Eli/i,
  }],
  ['reading-u01-l01-c2', {
    prompt: /rain gauge/i,
    correctChoice: /rain.?gauge/i,
    explanation: /rain.?gauge/i,
    future: /Maya|trowels|towels|garden|basil|compost|greenhouse|butterfly|Pollinator|Eli/i,
  }],
  ['reading-u01-l01-c3', {
    prompt: /muddy.?paw|dog bed/i,
    correctChoice: /muddy paw|dog bed/i,
    explanation: /muddy paw/i,
    future: /Maya|trowels|towels|garden|basil|compost|greenhouse|butterfly|Pollinator|Eli|map/i,
  }],
  ['reading-u01-l02-c1', {
    prompt: /lantern|at last/i,
    correctChoice: /lantern|at last/i,
    explanation: /lantern|at last/i,
    future: /Tomas|lighthouse|harbor|fog|Grandfather|beam|yellow line|compass|There it is/i,
  }],
  ['reading-u01-l02-c2', {
    prompt: /trail/i,
    correctChoice: /trail/i,
    explanation: /trail/i,
    future: /Tomas|lighthouse|harbor|fog|Grandfather|beam|yellow line|compass|There it is/i,
  }],
  ['reading-u01-l02-c3', {
    prompt: /text clue|voice choice|meaning connection/i,
    correctChoice: /at last|text clue/i,
    explanation: /at last/i,
    future: /Tomas|lighthouse|harbor|fog|Grandfather|beam|yellow line|compass|There it is/i,
  }],
]);

function quizPassage(lesson: (typeof unit01Lessons)[number]): string {
  expect(lesson.quiz.reference?.title).toBe('Read this passage');
  return lesson.quiz.reference?.text ?? '';
}

function normalizedVisibleText(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('en-US')
    .replace(/,/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

function visibleAnswers(question: Question): Array<{ id: string; text: string }> {
  if ('choices' in question) return question.choices;
  if ('items' in question) return question.items;
  return question.acceptedAnswers.map((text, index) => ({ id: `accepted-${index}`, text }));
}

function correctChoiceText(question: Question): string {
  if (!('choices' in question)) throw new Error(`${question.id} must be a choice question`);
  return question.choices.find(({ id }) => id === question.correctChoiceId)?.text ?? '';
}

describe('Reading unit 1 fluency lessons', () => {
  test('exports the exact two requested lessons and standards metadata', () => {
    expect(unit01Lessons.map(({ id, title }) => ({ id, title }))).toEqual(expectedLessons);
    expectUnitLessons(unit01Lessons, expectedManifest, 'reading');

    for (const lesson of unit01Lessons) {
      expect(lesson.unitId).toBe('reading-u01');
      expect(lesson.indicatorCodes).toEqual(['ELA.4.F.4.2']);
      expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
      expect(lesson.intro).toHaveLength(4);
      expect(lesson.intro.every(({ speaker }) => speaker === 'winnie')).toBe(true);
    }
  });

  test('keeps the authored lesson shape schema-valid and widget-free', () => {
    for (const lesson of unit01Lessons) {
      expect(validateLesson(lesson)).toEqual([]);
      expect(lesson.learnCards).toHaveLength(3);
      expect(lesson.learnCards.every((card) => card.blocks.length >= 1)).toBe(true);
      expect(lesson.learnCards.every((card) => !('widget' in card))).toBe(true);
      expect(lesson.quiz.passThreshold).toBe(8);
      expect(lesson.quiz.pool).toHaveLength(13);
      expect(lesson.quiz.pool.map(({ id }) => id)).toEqual(
        Array.from(
          { length: 13 },
          (_, index) => `${lesson.id}-q${String(index + 1).padStart(2, '0')}`,
        ),
      );
    }
  });

  test('gives each lesson an original persistent 150–250-word passage and a passage-dependent quiz majority', () => {
    const passages = unit01Lessons.map(quizPassage);

    expect(new Set(passages).size).toBe(unit01Lessons.length);
    for (const passage of passages) {
      const wordCount = passage.trim().split(/\s+/).length;
      expect(wordCount).toBeGreaterThanOrEqual(150);
      expect(wordCount).toBeLessThanOrEqual(250);
    }

    for (const [index, lesson] of unit01Lessons.entries()) {
      const passage = passages[index]!;
      expect(lesson.workedExample.passage).toEqual({
        title: 'Original passage',
        text: passage,
      });
      expect(lesson.workedExample.steps).not.toContainEqual(expect.stringContaining(passage));
      expect(lesson.workedExample.steps).toHaveLength(3);
      const passageQuestions = lesson.quiz.pool.filter(({ id }) =>
        expectedPassageQuestionIds[index].some((passageQuestionId) => passageQuestionId === id),
      );
      expect(passageQuestions.map(({ id }) => id)).toEqual(expectedPassageQuestionIds[index]);
      expect(passageQuestions).toHaveLength(8);
      expect(lesson.quiz.pool.every(({ prompt }) => !prompt.includes(passage))).toBe(true);
      expect(passageQuestions.every(({ prompt }) => /what|which|true or false|how|why/i.test(prompt))).toBe(true);

      for (const [questionId, detail] of passageQuestionDetailExpectations[index]!) {
        const question = lesson.quiz.pool.find(({ id }) => id === questionId);
        expect(question).toBeDefined();
        if (!question) continue;
        const questionContent = [question.prompt, correctChoiceText(question), question.explanation].join('\n');
        expect(questionContent).toMatch(detail);
      }
    }
  });

  test('maps each concept tag to exactly one card and targets every card', () => {
    for (const lesson of unit01Lessons) {
      const cardByTag = new Map<string, string>();
      for (const question of lesson.quiz.pool) {
        const existing = cardByTag.get(question.conceptTag);
        if (existing === undefined) cardByTag.set(question.conceptTag, question.reviewCardId);
        else expect(question.reviewCardId).toBe(existing);
      }

      expect(new Set(cardByTag.values()).size).toBe(cardByTag.size);
      expect(new Set(cardByTag.values())).toEqual(new Set(lesson.learnCards.map(({ id }) => id)));
    }
  });

  test('gives every learn card a substantive, concept-relevant unscored check', () => {
    const cards: LearnCard[] = unit01Lessons.flatMap((lesson) => lesson.learnCards);
    expect(cards.map(({ id }) => id)).toEqual([...inlineCheckExpectations.keys()]);

    for (const card of cards) {
      const expected = inlineCheckExpectations.get(card.id);
      const check = card.check;
      expect(expected).toBeDefined();
      expect(check).toBeDefined();
      if (!check || !expected) continue;

      expect(check.choices.length).toBeGreaterThanOrEqual(3);
      expect(check.choices.some(({ id }) => id === check.correctChoiceId)).toBe(true);
      expect(new Set(check.choices.map(({ id }) => id)).size).toBe(check.choices.length);
      expect(new Set(check.choices.map(({ text }) => normalizedVisibleText(text))).size).toBe(
        check.choices.length,
      );
      expect(check.prompt).toMatch(expected.prompt);
      expect(check.explanation).toMatch(expected.explanation);
    }
  });

  test('keeps each inline check grounded in material presented before that check', () => {
    for (const lesson of unit01Lessons) {
      for (const card of lesson.learnCards) {
        const expected = inlineCheckSequenceExpectations.get(card.id);
        const check = card.check;
        expect(expected).toBeDefined();
        expect(check).toBeDefined();
        if (!expected || !check) continue;

        const cardIndex = lesson.learnCards.indexOf(card);
        const availableMaterial = lesson.learnCards
          .slice(0, cardIndex + 1)
          .flatMap(({ blocks }) => blocks.map(({ text }) => text))
          .join('\n');
        expect(availableMaterial).toMatch(expected.prompt);
        expect(availableMaterial).toMatch(expected.correctChoice);
        expect(availableMaterial).toMatch(expected.explanation);

        const fields = [
          ['prompt', check.prompt],
          ['correct choice', check.choices.find(({ id }) => id === check.correctChoiceId)?.text ?? ''],
          ['explanation', check.explanation],
          ...check.choices.map(({ id, text }) => [`choice ${id}`, text]),
        ] as const;
        for (const [field, text] of fields) {
          expect(text, `${card.id} ${field}`).not.toMatch(expected.future);
        }

        expect(check.prompt).toMatch(expected.prompt);
        expect(check.choices.find(({ id }) => id === check.correctChoiceId)?.text ?? '').toMatch(
          expected.correctChoice,
        );
        expect(check.explanation).toMatch(expected.explanation);

        if (card.id === 'reading-u01-l02-c3') {
          expect(availableMaterial).toMatch(/at last/i);
          expect(check.explanation).toMatch(/at last/i);
        }
      }
    }
  });

  test('frames fluency practice as independent app work that never scores a student voice', () => {
    const learnerFacingText = unit01Lessons.flatMap((lesson) => [
      ...lesson.learnCards.flatMap((card) => [
        card.title,
        ...card.blocks.map(({ text }) => text),
        card.check?.prompt ?? '',
        card.check?.explanation ?? '',
        ...(card.check?.choices.map(({ text }) => text) ?? []),
      ]),
      ...lesson.quiz.pool.flatMap((question) => [
        question.prompt,
        question.explanation,
        ...visibleAnswers(question).map(({ text }) => text),
      ]),
    ]).join('\n');

    expect(learnerFacingText).not.toMatch(/\bpartner\b|take turns|live collaboration|record yourself/i);
    expect(learnerFacingText).toMatch(/Read aloud/i);
    expect(learnerFacingText).toMatch(/app.*does not listen to or score.*voice/i);
    expect(learnerFacingText).toMatch(/self-reflection|reflection/i);
  });

  test('uses varied question types with unique visible answer text and ids', () => {
    for (const lesson of unit01Lessons) {
      expect(new Set(lesson.quiz.pool.map(({ type }) => type)).size).toBeGreaterThanOrEqual(2);

      for (const question of lesson.quiz.pool) {
        const answers = visibleAnswers(question);
        expect(new Set(answers.map(({ id }) => id)).size).toBe(answers.length);
        expect(new Set(answers.map(({ text }) => normalizedVisibleText(text))).size).toBe(
          answers.length,
        );
      }
    }
  });

  test('keeps the reviewed prompts, examples, and review targets semantically aligned', () => {
    const [accuracyLesson, expressionLesson] = unit01Lessons;
    const accuracyQuestion = accuracyLesson.quiz.pool[0];
    const intonationQuestion = expressionLesson.quiz.pool[0];
    const sequenceQuestion = expressionLesson.quiz.pool[3];
    const practiceQuestion = expressionLesson.quiz.pool[9];
    const accuracyInference = accuracyLesson.workedExample.steps[
      accuracyLesson.workedExample.steps.length - 1
    ] ?? '';

    expect(accuracyQuestion.conceptTag).toBe('reading-accuracy');
    expect(accuracyQuestion.reviewCardId).toBe('reading-u01-l01-c1');
    expect(correctChoiceText(accuracyQuestion)).toMatch(/check.*letter.*reread/i);

    expect(intonationQuestion.conceptTag).toBe('intonation-and-punctuation');
    expect(intonationQuestion.reviewCardId).toBe('reading-u01-l02-c2');

    expect(sequenceQuestion.conceptTag).toBe('expressive-practice');
    expect(sequenceQuestion.reviewCardId).toBe('reading-u01-l02-c3');

    expect(accuracyInference).toMatch(/why Maya rereads the map/i);
    expect(accuracyInference).toMatch(/careful reading helped the team/i);
    expect(correctChoiceText(practiceQuestion)).toMatch(/read.*expression.*intonation/i);
  });

  test('no option id holds more than 60 percent of multiple-choice answer keys', () => {
    for (const lesson of unit01Lessons) {
      const keys = lesson.quiz.pool
        .filter((question) => question.type === 'multiple-choice')
        .map((question) => question.correctChoiceId);
      const counts = new Map<string, number>();
      for (const key of keys) counts.set(key, (counts.get(key) ?? 0) + 1);

      expect(Math.max(...counts.values()) / keys.length).toBeLessThanOrEqual(0.6);
    }
  });
});
```

### `src/content/reading/u02.ts`

```ts
import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit02Lessons = [
  {
    "id": "reading-u02-l01",
    "unitId": "reading-u02",
    "title": "Build Meaning with Roots, Base Words, and Affixes",
    "indicatorCodes": [
      "ELA.4.AOR.9.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Long words often contain smaller parts that carry meaning."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "A root or base gives the core idea, while a prefix or suffix can adjust it."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s build a meaning, then check that meaning in a real sentence."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u02-l01-c1",
        "title": "Build Words from Meaningful Parts",
        "blocks": [
          {
            "kind": "text",
            "text": "A base word can stand alone. An affix joins a base or root: a prefix comes before it, and a suffix comes after it."
          },
          {
            "kind": "example",
            "text": "In rebuild, re- means again and build is the base word, so rebuild means build again."
          },
          {
            "kind": "tip",
            "text": "Name each part and its meaning before combining them."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "In rebuild, which part means again?",
          "choices": [
            {
              "id": "a",
              "text": "re-"
            },
            {
              "id": "b",
              "text": "build"
            },
            {
              "id": "c",
              "text": "-less"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible example states that re- means again."
        }
      },
      {
        "id": "reading-u02-l01-c2",
        "title": "Use Roots to Unlock Meaning",
        "blocks": [
          {
            "kind": "text",
            "text": "Many Greek and Latin roots appear in grade-level science, history, and literature. The root port means carry."
          },
          {
            "kind": "example",
            "text": "Portable describes something that can be carried. Transport means carry from one place to another."
          },
          {
            "kind": "tip",
            "text": "A root gives a useful clue, but the full word decides the precise meaning."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "widget": {
          "type": "word-root-builder",
          "config": {
            "root": "port",
            "prefixes": [
              "trans"
            ],
            "suffixes": [
              "able"
            ],
            "targets": [
              {
                "word": "transport",
                "meaning": "carry from one place to another"
              },
              {
                "word": "portable",
                "meaning": "able to be carried"
              }
            ]
          }
        },
        "check": {
          "prompt": "The root port means carry. Which word means able to be carried?",
          "choices": [
            {
              "id": "a",
              "text": "portable"
            },
            {
              "id": "b",
              "text": "transport"
            },
            {
              "id": "c",
              "text": "rebuild"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Port means carry and -able means able to be."
        }
      },
      {
        "id": "reading-u02-l01-c3",
        "title": "Check the Whole Word in Context",
        "blocks": [
          {
            "kind": "text",
            "text": "After combining word-part meanings, reread the sentence. Keep the meaning only if it fits the sentence."
          },
          {
            "kind": "example",
            "text": "The volunteers rebuilt the garden beds after the storm means they built them again, not that they built them badly."
          },
          {
            "kind": "tip",
            "text": "Use the response format Parts → Combined meaning → Sentence check."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "Why should you reread after combining word-part meanings?",
          "choices": [
            {
              "id": "a",
              "text": "confirm the meaning fits the sentence"
            },
            {
              "id": "b",
              "text": "count the letters"
            },
            {
              "id": "c",
              "text": "remove the root"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The card says context confirms or corrects the combined meaning."
        }
      }
    ],
    "workedExample": {
      "title": "Unlock transported in “The Rebuilt Garden”",
      "passage": {
        "title": "The Rebuilt Garden",
        "text": "After a summer storm, the school garden needed careful work. Nia and Omar rebuilt a short border around the herb bed. They reused straight boards that had washed beside the fence and replaced one cracked board with a new piece. Before lifting anything, they previewed the cleanup map so they knew where each pile belonged.\n\nA small cart transported fresh soil from the gate to the raised beds. The cart was portable enough for one student to pull, but the load was heavy, so the students made two trips. Omar reread the labels on three reusable bins: wood, weeds, and plastic. Nia checked each item before sorting it.\n\nBy noon, the repaired border held the soil in place. The class had built it again, carried supplies across the garden, looked at the plan beforehand, and used materials more than once. Those actions made the meanings of rebuilt, transported, previewed, and reusable clear in context."
      },
      "steps": [
        "Read “A small cart transported fresh soil from the gate to the raised beds.”",
        "Identify trans- as across and port as carry.",
        "Combine the clues as carried from one place to another, then check that the cart action fits."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “The Rebuilt Garden”",
        "text": "After a summer storm, the school garden needed careful work. Nia and Omar rebuilt a short border around the herb bed. They reused straight boards that had washed beside the fence and replaced one cracked board with a new piece. Before lifting anything, they previewed the cleanup map so they knew where each pile belonged.\n\nA small cart transported fresh soil from the gate to the raised beds. The cart was portable enough for one student to pull, but the load was heavy, so the students made two trips. Omar reread the labels on three reusable bins: wood, weeds, and plastic. Nia checked each item before sorting it.\n\nBy noon, the repaired border held the soil in place. The class had built it again, carried supplies across the garden, looked at the plan beforehand, and used materials more than once. Those actions made the meanings of rebuilt, transported, previewed, and reusable clear in context."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which part comes before a root or base word?",
          "choices": [
            {
              "id": "a",
              "text": "Prefix"
            },
            {
              "id": "b",
              "text": "Suffix"
            },
            {
              "id": "c",
              "text": "Sentence"
            },
            {
              "id": "d",
              "text": "Syllable count"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "A prefix is attached before a root or base word.",
          "id": "reading-u02-l01-q01",
          "conceptTag": "word-parts",
          "reviewCardId": "reading-u02-l01-c1"
        },
        {
          "type": "fill-blank",
          "prompt": "Complete the word that means build again: ___build.",
          "acceptedAnswers": [
            "re",
            "re-"
          ],
          "explanation": "The prefix re- means again, so rebuild means build again.",
          "id": "reading-u02-l01-q02",
          "conceptTag": "word-parts",
          "reviewCardId": "reading-u02-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the suffix -less mean in fearless?",
          "choices": [
            {
              "id": "a",
              "text": "Full of"
            },
            {
              "id": "b",
              "text": "Without"
            },
            {
              "id": "c",
              "text": "Again"
            },
            {
              "id": "d",
              "text": "Before"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The suffix -less means without, so fearless means without fear.",
          "id": "reading-u02-l01-q03",
          "conceptTag": "word-parts",
          "reviewCardId": "reading-u02-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "A suffix is attached after a root or base word.",
          "choices": [
            {
              "id": "true",
              "text": "True — suffixes follow the root or base"
            },
            {
              "id": "false",
              "text": "False — suffixes always come first"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "A suffix follows a root or base word.",
          "id": "reading-u02-l01-q04",
          "conceptTag": "word-parts",
          "reviewCardId": "reading-u02-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "The root port means carry. What does portable most likely describe?",
          "choices": [
            {
              "id": "a",
              "text": "Something that cannot move"
            },
            {
              "id": "b",
              "text": "Something made of paper"
            },
            {
              "id": "c",
              "text": "Something that can be carried"
            },
            {
              "id": "d",
              "text": "Something that is very loud"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The root port points to carrying, so portable means able to be carried.",
          "id": "reading-u02-l01-q05",
          "conceptTag": "root-meaning",
          "reviewCardId": "reading-u02-l01-c2"
        },
        {
          "type": "fill-blank",
          "prompt": "The root bio means life. Which root completes the word for the story of a person’s life: ___graphy?",
          "acceptedAnswers": [
            "bio",
            "bio-"
          ],
          "explanation": "Biography uses bio, meaning life.",
          "id": "reading-u02-l01-q06",
          "conceptTag": "root-meaning",
          "reviewCardId": "reading-u02-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "The root spect means look. Which meaning best fits inspect?",
          "choices": [
            {
              "id": "a",
              "text": "To carry away"
            },
            {
              "id": "b",
              "text": "To write again"
            },
            {
              "id": "c",
              "text": "To hear from far away"
            },
            {
              "id": "d",
              "text": "To look at closely"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The root spect means look, and inspect means look at closely.",
          "id": "reading-u02-l01-q07",
          "conceptTag": "root-meaning",
          "reviewCardId": "reading-u02-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "A root clue always gives the full precise meaning without any context.",
          "choices": [
            {
              "id": "true",
              "text": "True — context is never needed"
            },
            {
              "id": "false",
              "text": "False — the whole word and sentence refine the meaning"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "A root is a clue; the complete word and context establish the precise meaning.",
          "id": "reading-u02-l01-q08",
          "conceptTag": "root-meaning",
          "reviewCardId": "reading-u02-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "In “Mara previewed the map before hiking,” what does previewed mean?",
          "choices": [
            {
              "id": "a",
              "text": "Looked at beforehand"
            },
            {
              "id": "b",
              "text": "Looked at again afterward"
            },
            {
              "id": "c",
              "text": "Carried the map away"
            },
            {
              "id": "d",
              "text": "Covered the map completely"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Pre- means before, and the sentence confirms that Mara looked before hiking.",
          "id": "reading-u02-l01-q09",
          "conceptTag": "morphology-check",
          "reviewCardId": "reading-u02-l01-c3"
        },
        {
          "type": "fill-blank",
          "prompt": "Complete the meaning check: careless means without ___.",
          "acceptedAnswers": [
            "care"
          ],
          "explanation": "Careless combines care with -less, meaning without care.",
          "id": "reading-u02-l01-q10",
          "conceptTag": "morphology-check",
          "reviewCardId": "reading-u02-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "In “The submarine traveled under the sea,” which response best checks the word submarine?",
          "choices": [
            {
              "id": "a",
              "text": "Sub means above, so a submarine flies"
            },
            {
              "id": "b",
              "text": "Sub means under, marine relates to sea, and a submarine travels under the sea"
            },
            {
              "id": "c",
              "text": "Marine means mountain, so it climbs rocks"
            },
            {
              "id": "d",
              "text": "The word has many letters, so it means enormous"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Both word parts and sentence meaning support a vessel that travels under the sea.",
          "id": "reading-u02-l01-q11",
          "conceptTag": "morphology-check",
          "reviewCardId": "reading-u02-l01-c3"
        },
        {
          "type": "sort",
          "prompt": "Put the word parts in order to build reusable.",
          "explanation": "Reusable is built in the natural order prefix, base word, suffix.",
          "id": "reading-u02-l01-q12",
          "conceptTag": "morphology-check",
          "reviewCardId": "reading-u02-l01-c3",
          "items": [
            {
              "id": "step-2",
              "text": "use"
            },
            {
              "id": "step-3",
              "text": "-able"
            },
            {
              "id": "step-1",
              "text": "re-"
            }
          ],
          "correctOrder": [
            "step-1",
            "step-2",
            "step-3"
          ]
        },
        {
          "type": "true-false",
          "prompt": "After using word parts, rereading the sentence helps confirm the meaning.",
          "choices": [
            {
              "id": "true",
              "text": "True — context checks the combined meaning"
            },
            {
              "id": "false",
              "text": "False — the sentence should be ignored"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The sentence confirms or corrects the meaning suggested by word parts.",
          "id": "reading-u02-l01-q13",
          "conceptTag": "morphology-check",
          "reviewCardId": "reading-u02-l01-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u02-l02",
    "unitId": "reading-u02",
    "title": "Use Definition, Example, and Restatement Clues",
    "indicatorCodes": [
      "ELA.4.AOR.7.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Unknown words often travel with clues."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Definitions, examples, and restatements can reveal meaning."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s name the clue, infer a meaning, and reread to confirm it."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u02-l02-c1",
        "title": "Spot the Kind of Context Clue",
        "blocks": [
          {
            "kind": "text",
            "text": "A definition clue directly tells a meaning; an example clue supplies members of a group; a restatement says the idea again in new words."
          },
          {
            "kind": "example",
            "text": "“Nocturnal animals, creatures that are active at night, include owls and moths.” The phrase after the comma defines nocturnal; owls and moths are examples."
          },
          {
            "kind": "tip",
            "text": "Signal punctuation and phrases such as “in other words” can point to a clue."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "widget": {
          "type": "context-clue-detective",
          "config": {
            "passage": "Nocturnal animals, creatures that are active at night, include owls and moths.",
            "targetWord": "nocturnal",
            "clueChoices": [
              {
                "id": "definition",
                "text": "creatures that are active at night",
                "type": "definition"
              },
              {
                "id": "examples",
                "text": "owls and moths",
                "type": "example"
              }
            ],
            "correctChoiceId": "definition"
          }
        },
        "check": {
          "prompt": "Which words directly define nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "creatures that are active at night"
            },
            {
              "id": "b",
              "text": "owls and moths"
            },
            {
              "id": "c",
              "text": "Some garden visitors"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The phrase after nocturnal directly states its meaning."
        }
      },
      {
        "id": "reading-u02-l02-c2",
        "title": "Read Around the Unknown Word",
        "blocks": [
          {
            "kind": "text",
            "text": "Read the sentence before, the sentence with the word, and the sentence after it. Gather more than one clue when possible."
          },
          {
            "kind": "example",
            "text": "“Several insects emerge; in other words, they come out from hiding.” The restatement explains emerge."
          },
          {
            "kind": "tip",
            "text": "Write Clue → Possible meaning → Evidence before choosing."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "What does emerge mean in the visible sentence?",
          "choices": [
            {
              "id": "a",
              "text": "come out from hiding"
            },
            {
              "id": "b",
              "text": "sleep through every night"
            },
            {
              "id": "c",
              "text": "grow bright petals"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The words “in other words” introduce the restatement."
        }
      },
      {
        "id": "reading-u02-l02-c3",
        "title": "Confirm Meaning in the Sentence",
        "blocks": [
          {
            "kind": "text",
            "text": "Substitute the possible meaning and reread. A correct meaning must keep the sentence sensible and precise."
          },
          {
            "kind": "example",
            "text": "Replacing nocturnal with active at night keeps the sentence accurate; replacing it with able to fly does not."
          },
          {
            "kind": "tip",
            "text": "A dictionary can confirm a meaning after context reasoning, but it does not replace reading the sentence."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "Which substitution confirms nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "creatures active at night"
            },
            {
              "id": "b",
              "text": "creatures with feathers"
            },
            {
              "id": "c",
              "text": "creatures living in gardens"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That substitution preserves the exact definition in the card."
        }
      }
    ],
    "workedExample": {
      "title": "Confirm emerge with a restatement clue",
      "passage": {
        "title": "Night Garden Visitors",
        "text": "Night Garden Visitors\n\nSome garden visitors are nocturnal, creatures that are active at night. Owls may hunt after sunset, and moths often visit pale flowers in the dark. These examples help explain nocturnal even if the word is new.\n\nAt dusk, several insects emerge; in other words, they come out from hiding. A luna moth rests during much of the day but becomes active when evening arrives. By contrast, many butterflies are diurnal and fly while the sun is up.\n\nReaders can use the definition beside nocturnal, the examples of owls and moths, and the restatement after emerge. Then they should replace the unknown word with the possible meaning and reread. If “creatures active at night” fits the first sentence without changing its message, the context-clue reasoning is confirmed."
      },
      "steps": [
        "Read the full sentence around emerge.",
        "Mark “in other words” as a restatement signal.",
        "Infer “come out from hiding,” substitute it, and reread to confirm the meaning."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Night Garden Visitors”",
        "text": "Night Garden Visitors\n\nSome garden visitors are nocturnal, creatures that are active at night. Owls may hunt after sunset, and moths often visit pale flowers in the dark. These examples help explain nocturnal even if the word is new.\n\nAt dusk, several insects emerge; in other words, they come out from hiding. A luna moth rests during much of the day but becomes active when evening arrives. By contrast, many butterflies are diurnal and fly while the sun is up.\n\nReaders can use the definition beside nocturnal, the examples of owls and moths, and the restatement after emerge. Then they should replace the unknown word with the possible meaning and reread. If “creatures active at night” fits the first sentence without changing its message, the context-clue reasoning is confirmed."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which phrase is a definition clue for nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "owls and moths"
            },
            {
              "id": "b",
              "text": "creatures that are active at night"
            },
            {
              "id": "c",
              "text": "visit pale flowers"
            },
            {
              "id": "d",
              "text": "after sunset"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "It directly states what nocturnal means.",
          "id": "reading-u02-l02-q01",
          "conceptTag": "clue-types",
          "reviewCardId": "reading-u02-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which words are example clues for nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "active at night"
            },
            {
              "id": "b",
              "text": "garden visitors"
            },
            {
              "id": "c",
              "text": "owls and moths"
            },
            {
              "id": "d",
              "text": "when evening arrives"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Owls and moths are members of the nocturnal group.",
          "id": "reading-u02-l02-q02",
          "conceptTag": "clue-types",
          "reviewCardId": "reading-u02-l02-c1"
        },
        {
          "type": "true-false",
          "prompt": "“In other words” can signal a restatement clue.",
          "choices": [
            {
              "id": "true",
              "text": "True — it introduces the idea again"
            },
            {
              "id": "false",
              "text": "False — it always signals contrast"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The phrase introduces a second wording of emerge.",
          "id": "reading-u02-l02-q03",
          "conceptTag": "clue-types",
          "reviewCardId": "reading-u02-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which clue type appears in “brackish water, a mix of fresh and salt water”?",
          "choices": [
            {
              "id": "a",
              "text": "example"
            },
            {
              "id": "b",
              "text": "contrast"
            },
            {
              "id": "c",
              "text": "sound"
            },
            {
              "id": "d",
              "text": "definition"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The words after the comma define brackish.",
          "id": "reading-u02-l02-q04",
          "conceptTag": "clue-types",
          "reviewCardId": "reading-u02-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What should a reader do first with an unknown word in a sentence?",
          "choices": [
            {
              "id": "a",
              "text": "Read around it for nearby clues"
            },
            {
              "id": "b",
              "text": "Choose the longest meaning"
            },
            {
              "id": "c",
              "text": "Skip the whole paragraph"
            },
            {
              "id": "d",
              "text": "Use only its first letter"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Nearby words supply evidence.",
          "id": "reading-u02-l02-q05",
          "conceptTag": "context-reasoning",
          "reviewCardId": "reading-u02-l02-c2"
        },
        {
          "type": "fill-blank",
          "prompt": "In the passage, emerge means to come out from ___.",
          "acceptedAnswers": [
            "hiding"
          ],
          "explanation": "The restatement says the insects come out from hiding.",
          "id": "reading-u02-l02-q06",
          "conceptTag": "context-reasoning",
          "reviewCardId": "reading-u02-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which two clues best support nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "sunset and flowers"
            },
            {
              "id": "b",
              "text": "the definition plus owl and moth examples"
            },
            {
              "id": "c",
              "text": "butterflies and gardens"
            },
            {
              "id": "d",
              "text": "pale and active"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The definition and examples agree.",
          "id": "reading-u02-l02-q07",
          "conceptTag": "context-reasoning",
          "reviewCardId": "reading-u02-l02-c2"
        },
        {
          "type": "true-false",
          "prompt": "A reader should accept a guessed meaning even when it makes the sentence confusing.",
          "choices": [
            {
              "id": "true",
              "text": "True — guesses need no check"
            },
            {
              "id": "false",
              "text": "False — rereading must confirm the meaning"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "Context must confirm the inference.",
          "id": "reading-u02-l02-q08",
          "conceptTag": "context-reasoning",
          "reviewCardId": "reading-u02-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which replacement keeps the first sentence accurate?",
          "choices": [
            {
              "id": "a",
              "text": "colorful"
            },
            {
              "id": "b",
              "text": "able to fly"
            },
            {
              "id": "c",
              "text": "active at night"
            },
            {
              "id": "d",
              "text": "very small"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The passage directly defines nocturnal as active at night.",
          "id": "reading-u02-l02-q09",
          "conceptTag": "context-check",
          "reviewCardId": "reading-u02-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why does “come out from hiding” confirm emerge?",
          "choices": [
            {
              "id": "a",
              "text": "It rhymes with emerge"
            },
            {
              "id": "b",
              "text": "It names an owl"
            },
            {
              "id": "c",
              "text": "It gives an opposite"
            },
            {
              "id": "d",
              "text": "It makes the sentence logical and repeats the idea"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The restatement both fits and repeats the idea.",
          "id": "reading-u02-l02-q10",
          "conceptTag": "context-check",
          "reviewCardId": "reading-u02-l02-c3"
        },
        {
          "type": "fill-blank",
          "prompt": "The passage calls butterflies active in daytime ___.",
          "acceptedAnswers": [
            "diurnal"
          ],
          "explanation": "The contrast sentence supplies the exact word diurnal.",
          "id": "reading-u02-l02-q11",
          "conceptTag": "context-check",
          "reviewCardId": "reading-u02-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response uses the complete context routine?",
          "choices": [
            {
              "id": "a",
              "text": "Name the clue, infer a meaning, substitute it, and reread"
            },
            {
              "id": "b",
              "text": "Pick a familiar-looking word"
            },
            {
              "id": "c",
              "text": "Ignore punctuation"
            },
            {
              "id": "d",
              "text": "Use the examples as the definition"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The full routine gathers and checks evidence.",
          "id": "reading-u02-l02-q12",
          "conceptTag": "context-check",
          "reviewCardId": "reading-u02-l02-c3"
        },
        {
          "type": "true-false",
          "prompt": "A dictionary may confirm context reasoning after the sentence has been examined.",
          "choices": [
            {
              "id": "true",
              "text": "True — references can confirm"
            },
            {
              "id": "false",
              "text": "False — references must never be used"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The lesson pairs context reasoning with later confirmation.",
          "id": "reading-u02-l02-q13",
          "conceptTag": "context-check",
          "reviewCardId": "reading-u02-l02-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u02-l03",
    "unitId": "reading-u02",
    "title": "Use Print and Digital References Precisely",
    "indicatorCodes": [
      "ELA.4.AOR.7.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "References answer different word questions."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Entries show pronunciation, part of speech, and numbered meanings."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s choose a tool and select the meaning that fits the field note."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u02-l03-c1",
        "title": "Choose the Right Reference",
        "blocks": [
          {
            "kind": "text",
            "text": "Use a dictionary for pronunciation, part of speech, and meanings; use a glossary for a term’s meaning in the current topic."
          },
          {
            "kind": "example",
            "text": "For brackish in a wetland article, the packet glossary gives the specialized meaning directly."
          },
          {
            "kind": "tip",
            "text": "Choose a trusted print or digital reference with clear authorship and complete entries."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which reference best gives the wetland meaning of brackish?",
          "choices": [
            {
              "id": "a",
              "text": "the packet glossary"
            },
            {
              "id": "b",
              "text": "a calendar"
            },
            {
              "id": "c",
              "text": "a map scale"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible glossary defines the topic word brackish."
        }
      },
      {
        "id": "reading-u02-l03-c2",
        "title": "Read a Dictionary Entry",
        "blocks": [
          {
            "kind": "text",
            "text": "A headword is followed by pronunciation, part of speech, and one or more numbered meanings."
          },
          {
            "kind": "example",
            "text": "Current can be a noun meaning moving water or an adjective meaning happening now."
          },
          {
            "kind": "tip",
            "text": "Match the part of speech and sentence use before selecting a definition."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "In “a gentle current moved,” what part of speech is current?",
          "choices": [
            {
              "id": "a",
              "text": "noun"
            },
            {
              "id": "b",
              "text": "adjective"
            },
            {
              "id": "c",
              "text": "verb"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The entry labels the moving-water meaning as a noun."
        }
      },
      {
        "id": "reading-u02-l03-c3",
        "title": "Select the Precise Meaning",
        "blocks": [
          {
            "kind": "text",
            "text": "A multiple-meaning word needs a context check. Substitute each candidate meaning and keep the precise one."
          },
          {
            "kind": "example",
            "text": "The grassy bank beside a creek is land beside water, not a money business."
          },
          {
            "kind": "tip",
            "text": "Answer with Entry evidence → Context evidence → Precise meaning."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "Which bank meaning fits the field note?",
          "choices": [
            {
              "id": "a",
              "text": "land beside a river or stream"
            },
            {
              "id": "b",
              "text": "a business that keeps money"
            },
            {
              "id": "c",
              "text": "a row of switches"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The creek and grass are context evidence for the riverbank meaning."
        }
      }
    ],
    "workedExample": {
      "title": "Select the creek meaning of bank",
      "passage": {
        "title": "Field Notes Word Desk",
        "text": "Field Notes Word Desk — invented reference packet\n\nDictionary entry: current /KUR-uhnt/ noun. 1. a steady movement of water or air in one direction. 2. the present time. adjective. happening now.\n\nDictionary entry: bank /bangk/ noun. 1. land beside a river or stream. 2. a business that keeps and lends money.\n\nGlossary: migrate — verb — to move from one region to another, often with the seasons. Brackish — adjective — slightly salty because fresh water and seawater mix.\n\nField note: “The young fish rested near the grassy bank while a gentle current moved through the creek. Some birds migrate through the preserve each fall. Where the river meets the ocean, the water becomes brackish.”\n\nA print dictionary and a trusted digital dictionary can provide pronunciation, part of speech, and numbered meanings. A topic glossary gives the specialized meaning used in one text. Readers compare each entry with the sentence instead of automatically choosing meaning 1."
      },
      "steps": [
        "Locate bank in the packet.",
        "Compare both numbered meanings with “grassy bank” and “creek.”",
        "Select land beside a river or stream and state the entry and context evidence."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Field Notes Word Desk”",
        "text": "Field Notes Word Desk — invented reference packet\n\nDictionary entry: current /KUR-uhnt/ noun. 1. a steady movement of water or air in one direction. 2. the present time. adjective. happening now.\n\nDictionary entry: bank /bangk/ noun. 1. land beside a river or stream. 2. a business that keeps and lends money.\n\nGlossary: migrate — verb — to move from one region to another, often with the seasons. Brackish — adjective — slightly salty because fresh water and seawater mix.\n\nField note: “The young fish rested near the grassy bank while a gentle current moved through the creek. Some birds migrate through the preserve each fall. Where the river meets the ocean, the water becomes brackish.”\n\nA print dictionary and a trusted digital dictionary can provide pronunciation, part of speech, and numbered meanings. A topic glossary gives the specialized meaning used in one text. Readers compare each entry with the sentence instead of automatically choosing meaning 1."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which source is best for the pronunciation of migrate?",
          "choices": [
            {
              "id": "a",
              "text": "A dictionary entry"
            },
            {
              "id": "b",
              "text": "A weather map"
            },
            {
              "id": "c",
              "text": "A table of contents"
            },
            {
              "id": "d",
              "text": "A photo caption"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "A dictionary supplies pronunciation.",
          "id": "reading-u02-l03-q01",
          "conceptTag": "reference-choice",
          "reviewCardId": "reading-u02-l03-c1"
        },
        {
          "type": "true-false",
          "prompt": "A topic glossary can define a specialized word used in that text.",
          "choices": [
            {
              "id": "true",
              "text": "True — it explains topic terms"
            },
            {
              "id": "false",
              "text": "False — glossaries list page numbers only"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Glossaries supply meanings for terms in a text.",
          "id": "reading-u02-l03-q02",
          "conceptTag": "reference-choice",
          "reviewCardId": "reading-u02-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which reference question does the glossary answer for brackish?",
          "choices": [
            {
              "id": "a",
              "text": "How many syllables are on the page?"
            },
            {
              "id": "b",
              "text": "Who owns the creek?"
            },
            {
              "id": "c",
              "text": "What does the wetland term mean?"
            },
            {
              "id": "d",
              "text": "When was the book printed?"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The glossary defines the wetland term.",
          "id": "reading-u02-l03-q03",
          "conceptTag": "reference-choice",
          "reviewCardId": "reading-u02-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which digital reference is the strongest choice?",
          "choices": [
            {
              "id": "a",
              "text": "An unsigned comment"
            },
            {
              "id": "b",
              "text": "An advertisement with no entry"
            },
            {
              "id": "c",
              "text": "A random image"
            },
            {
              "id": "d",
              "text": "A trusted dictionary with authorship and full entries"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Visible authority and complete entries make it useful.",
          "id": "reading-u02-l03-q04",
          "conceptTag": "reference-choice",
          "reviewCardId": "reading-u02-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What is the headword in the first entry?",
          "choices": [
            {
              "id": "a",
              "text": "noun"
            },
            {
              "id": "b",
              "text": "current"
            },
            {
              "id": "c",
              "text": "present time"
            },
            {
              "id": "d",
              "text": "KUR-uhnt"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Current is the word being defined.",
          "id": "reading-u02-l03-q05",
          "conceptTag": "dictionary-entry",
          "reviewCardId": "reading-u02-l03-c2"
        },
        {
          "type": "fill-blank",
          "prompt": "The entry labels migrate as a ___.",
          "acceptedAnswers": [
            "verb"
          ],
          "explanation": "The glossary visibly labels migrate as a verb.",
          "id": "reading-u02-l03-q06",
          "conceptTag": "dictionary-entry",
          "reviewCardId": "reading-u02-l03-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does /KUR-uhnt/ show?",
          "choices": [
            {
              "id": "a",
              "text": "the definition number"
            },
            {
              "id": "b",
              "text": "the part of speech"
            },
            {
              "id": "c",
              "text": "the pronunciation"
            },
            {
              "id": "d",
              "text": "the source date"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Slash marks show how to pronounce current.",
          "id": "reading-u02-l03-q07",
          "conceptTag": "dictionary-entry",
          "reviewCardId": "reading-u02-l03-c2"
        },
        {
          "type": "true-false",
          "prompt": "A numbered dictionary entry may list more than one meaning.",
          "choices": [
            {
              "id": "true",
              "text": "True — current and bank each have two"
            },
            {
              "id": "false",
              "text": "False — every word has one meaning"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The packet displays multiple numbered meanings.",
          "id": "reading-u02-l03-q08",
          "conceptTag": "dictionary-entry",
          "reviewCardId": "reading-u02-l03-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which meaning of current fits the creek sentence?",
          "choices": [
            {
              "id": "a",
              "text": "a steady movement of water"
            },
            {
              "id": "b",
              "text": "the present time"
            },
            {
              "id": "c",
              "text": "happening now"
            },
            {
              "id": "d",
              "text": "a money business"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Water moving through a creek is a current.",
          "id": "reading-u02-l03-q09",
          "conceptTag": "precise-meaning",
          "reviewCardId": "reading-u02-l03-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which evidence best rules out the money meaning of bank?",
          "choices": [
            {
              "id": "a",
              "text": "The word is a noun"
            },
            {
              "id": "b",
              "text": "The bank is grassy and beside a creek"
            },
            {
              "id": "c",
              "text": "Bank has four letters"
            },
            {
              "id": "d",
              "text": "The note mentions birds later"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Creek-side grass supports the land meaning.",
          "id": "reading-u02-l03-q10",
          "conceptTag": "precise-meaning",
          "reviewCardId": "reading-u02-l03-c3"
        },
        {
          "type": "fill-blank",
          "prompt": "In the field note, slightly salty mixed water is called ___.",
          "acceptedAnswers": [
            "brackish"
          ],
          "explanation": "The glossary gives brackish as the exact term.",
          "id": "reading-u02-l03-q11",
          "conceptTag": "precise-meaning",
          "reviewCardId": "reading-u02-l03-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response selects a precise meaning?",
          "choices": [
            {
              "id": "a",
              "text": "Bank is the first meaning everywhere"
            },
            {
              "id": "b",
              "text": "Bank means money because I know banks"
            },
            {
              "id": "c",
              "text": "Bank is a noun, so either meaning works"
            },
            {
              "id": "d",
              "text": "Bank means land beside water because the grassy creek context matches entry 1"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It joins entry and context evidence.",
          "id": "reading-u02-l03-q12",
          "conceptTag": "precise-meaning",
          "reviewCardId": "reading-u02-l03-c3"
        },
        {
          "type": "true-false",
          "prompt": "A reader should compare a definition with the sentence before accepting it.",
          "choices": [
            {
              "id": "true",
              "text": "True — context selects the precise meaning"
            },
            {
              "id": "false",
              "text": "False — always choose meaning 1"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Number order alone does not select the contextual meaning.",
          "id": "reading-u02-l03-q13",
          "conceptTag": "precise-meaning",
          "reviewCardId": "reading-u02-l03-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
```

### `src/content/reading/u02.test.ts`

```ts
import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit02Lessons } from './u02';

const expectedManifest = [
  {
    "id": "reading-u02-l01",
    "unitId": "reading-u02",
    "title": "Build Meaning with Roots, Base Words, and Affixes",
    "indicatorCodes": [
      "ELA.4.AOR.9.1"
    ]
  },
  {
    "id": "reading-u02-l02",
    "unitId": "reading-u02",
    "title": "Use Definition, Example, and Restatement Clues",
    "indicatorCodes": [
      "ELA.4.AOR.7.1"
    ]
  },
  {
    "id": "reading-u02-l03",
    "unitId": "reading-u02",
    "title": "Use Print and Digital References Precisely",
    "indicatorCodes": [
      "ELA.4.AOR.7.1"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u02-l01",
    "cards": [
      {
        "id": "reading-u02-l01-c1",
        "title": "Build Words from Meaningful Parts",
        "conceptTag": "word-parts"
      },
      {
        "id": "reading-u02-l01-c2",
        "title": "Use Roots to Unlock Meaning",
        "conceptTag": "root-meaning"
      },
      {
        "id": "reading-u02-l01-c3",
        "title": "Check the Whole Word in Context",
        "conceptTag": "morphology-check"
      }
    ]
  },
  {
    "id": "reading-u02-l02",
    "cards": [
      {
        "id": "reading-u02-l02-c1",
        "title": "Spot the Kind of Context Clue",
        "conceptTag": "clue-types"
      },
      {
        "id": "reading-u02-l02-c2",
        "title": "Read Around the Unknown Word",
        "conceptTag": "context-reasoning"
      },
      {
        "id": "reading-u02-l02-c3",
        "title": "Confirm Meaning in the Sentence",
        "conceptTag": "context-check"
      }
    ]
  },
  {
    "id": "reading-u02-l03",
    "cards": [
      {
        "id": "reading-u02-l03-c1",
        "title": "Choose the Right Reference",
        "conceptTag": "reference-choice"
      },
      {
        "id": "reading-u02-l03-c2",
        "title": "Read a Dictionary Entry",
        "conceptTag": "dictionary-entry"
      },
      {
        "id": "reading-u02-l03-c3",
        "title": "Select the Precise Meaning",
        "conceptTag": "precise-meaning"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u02-l01",
    "questions": [
      {
        "id": "reading-u02-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "word-parts",
        "reviewCardId": "reading-u02-l01-c1"
      },
      {
        "id": "reading-u02-l01-q02",
        "type": "fill-blank",
        "conceptTag": "word-parts",
        "reviewCardId": "reading-u02-l01-c1"
      },
      {
        "id": "reading-u02-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "word-parts",
        "reviewCardId": "reading-u02-l01-c1"
      },
      {
        "id": "reading-u02-l01-q04",
        "type": "true-false",
        "conceptTag": "word-parts",
        "reviewCardId": "reading-u02-l01-c1"
      },
      {
        "id": "reading-u02-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "root-meaning",
        "reviewCardId": "reading-u02-l01-c2"
      },
      {
        "id": "reading-u02-l01-q06",
        "type": "fill-blank",
        "conceptTag": "root-meaning",
        "reviewCardId": "reading-u02-l01-c2"
      },
      {
        "id": "reading-u02-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "root-meaning",
        "reviewCardId": "reading-u02-l01-c2"
      },
      {
        "id": "reading-u02-l01-q08",
        "type": "true-false",
        "conceptTag": "root-meaning",
        "reviewCardId": "reading-u02-l01-c2"
      },
      {
        "id": "reading-u02-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "morphology-check",
        "reviewCardId": "reading-u02-l01-c3"
      },
      {
        "id": "reading-u02-l01-q10",
        "type": "fill-blank",
        "conceptTag": "morphology-check",
        "reviewCardId": "reading-u02-l01-c3"
      },
      {
        "id": "reading-u02-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "morphology-check",
        "reviewCardId": "reading-u02-l01-c3"
      },
      {
        "id": "reading-u02-l01-q12",
        "type": "sort",
        "conceptTag": "morphology-check",
        "reviewCardId": "reading-u02-l01-c3"
      },
      {
        "id": "reading-u02-l01-q13",
        "type": "true-false",
        "conceptTag": "morphology-check",
        "reviewCardId": "reading-u02-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u02-l02",
    "questions": [
      {
        "id": "reading-u02-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "clue-types",
        "reviewCardId": "reading-u02-l02-c1"
      },
      {
        "id": "reading-u02-l02-q02",
        "type": "multiple-choice",
        "conceptTag": "clue-types",
        "reviewCardId": "reading-u02-l02-c1"
      },
      {
        "id": "reading-u02-l02-q03",
        "type": "true-false",
        "conceptTag": "clue-types",
        "reviewCardId": "reading-u02-l02-c1"
      },
      {
        "id": "reading-u02-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "clue-types",
        "reviewCardId": "reading-u02-l02-c1"
      },
      {
        "id": "reading-u02-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "context-reasoning",
        "reviewCardId": "reading-u02-l02-c2"
      },
      {
        "id": "reading-u02-l02-q06",
        "type": "fill-blank",
        "conceptTag": "context-reasoning",
        "reviewCardId": "reading-u02-l02-c2"
      },
      {
        "id": "reading-u02-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "context-reasoning",
        "reviewCardId": "reading-u02-l02-c2"
      },
      {
        "id": "reading-u02-l02-q08",
        "type": "true-false",
        "conceptTag": "context-reasoning",
        "reviewCardId": "reading-u02-l02-c2"
      },
      {
        "id": "reading-u02-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "context-check",
        "reviewCardId": "reading-u02-l02-c3"
      },
      {
        "id": "reading-u02-l02-q10",
        "type": "multiple-choice",
        "conceptTag": "context-check",
        "reviewCardId": "reading-u02-l02-c3"
      },
      {
        "id": "reading-u02-l02-q11",
        "type": "fill-blank",
        "conceptTag": "context-check",
        "reviewCardId": "reading-u02-l02-c3"
      },
      {
        "id": "reading-u02-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "context-check",
        "reviewCardId": "reading-u02-l02-c3"
      },
      {
        "id": "reading-u02-l02-q13",
        "type": "true-false",
        "conceptTag": "context-check",
        "reviewCardId": "reading-u02-l02-c3"
      }
    ]
  },
  {
    "id": "reading-u02-l03",
    "questions": [
      {
        "id": "reading-u02-l03-q01",
        "type": "multiple-choice",
        "conceptTag": "reference-choice",
        "reviewCardId": "reading-u02-l03-c1"
      },
      {
        "id": "reading-u02-l03-q02",
        "type": "true-false",
        "conceptTag": "reference-choice",
        "reviewCardId": "reading-u02-l03-c1"
      },
      {
        "id": "reading-u02-l03-q03",
        "type": "multiple-choice",
        "conceptTag": "reference-choice",
        "reviewCardId": "reading-u02-l03-c1"
      },
      {
        "id": "reading-u02-l03-q04",
        "type": "multiple-choice",
        "conceptTag": "reference-choice",
        "reviewCardId": "reading-u02-l03-c1"
      },
      {
        "id": "reading-u02-l03-q05",
        "type": "multiple-choice",
        "conceptTag": "dictionary-entry",
        "reviewCardId": "reading-u02-l03-c2"
      },
      {
        "id": "reading-u02-l03-q06",
        "type": "fill-blank",
        "conceptTag": "dictionary-entry",
        "reviewCardId": "reading-u02-l03-c2"
      },
      {
        "id": "reading-u02-l03-q07",
        "type": "multiple-choice",
        "conceptTag": "dictionary-entry",
        "reviewCardId": "reading-u02-l03-c2"
      },
      {
        "id": "reading-u02-l03-q08",
        "type": "true-false",
        "conceptTag": "dictionary-entry",
        "reviewCardId": "reading-u02-l03-c2"
      },
      {
        "id": "reading-u02-l03-q09",
        "type": "multiple-choice",
        "conceptTag": "precise-meaning",
        "reviewCardId": "reading-u02-l03-c3"
      },
      {
        "id": "reading-u02-l03-q10",
        "type": "multiple-choice",
        "conceptTag": "precise-meaning",
        "reviewCardId": "reading-u02-l03-c3"
      },
      {
        "id": "reading-u02-l03-q11",
        "type": "fill-blank",
        "conceptTag": "precise-meaning",
        "reviewCardId": "reading-u02-l03-c3"
      },
      {
        "id": "reading-u02-l03-q12",
        "type": "multiple-choice",
        "conceptTag": "precise-meaning",
        "reviewCardId": "reading-u02-l03-c3"
      },
      {
        "id": "reading-u02-l03-q13",
        "type": "true-false",
        "conceptTag": "precise-meaning",
        "reviewCardId": "reading-u02-l03-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u02-l01",
    "checks": [
      {
        "cardId": "reading-u02-l01-c1",
        "check": {
          "prompt": "In rebuild, which part means again?",
          "choices": [
            {
              "id": "a",
              "text": "re-"
            },
            {
              "id": "b",
              "text": "build"
            },
            {
              "id": "c",
              "text": "-less"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible example states that re- means again."
        }
      },
      {
        "cardId": "reading-u02-l01-c2",
        "check": {
          "prompt": "The root port means carry. Which word means able to be carried?",
          "choices": [
            {
              "id": "a",
              "text": "portable"
            },
            {
              "id": "b",
              "text": "transport"
            },
            {
              "id": "c",
              "text": "rebuild"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Port means carry and -able means able to be."
        }
      },
      {
        "cardId": "reading-u02-l01-c3",
        "check": {
          "prompt": "Why should you reread after combining word-part meanings?",
          "choices": [
            {
              "id": "a",
              "text": "confirm the meaning fits the sentence"
            },
            {
              "id": "b",
              "text": "count the letters"
            },
            {
              "id": "c",
              "text": "remove the root"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The card says context confirms or corrects the combined meaning."
        }
      }
    ]
  },
  {
    "id": "reading-u02-l02",
    "checks": [
      {
        "cardId": "reading-u02-l02-c1",
        "check": {
          "prompt": "Which words directly define nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "creatures that are active at night"
            },
            {
              "id": "b",
              "text": "owls and moths"
            },
            {
              "id": "c",
              "text": "Some garden visitors"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The phrase after nocturnal directly states its meaning."
        }
      },
      {
        "cardId": "reading-u02-l02-c2",
        "check": {
          "prompt": "What does emerge mean in the visible sentence?",
          "choices": [
            {
              "id": "a",
              "text": "come out from hiding"
            },
            {
              "id": "b",
              "text": "sleep through every night"
            },
            {
              "id": "c",
              "text": "grow bright petals"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The words “in other words” introduce the restatement."
        }
      },
      {
        "cardId": "reading-u02-l02-c3",
        "check": {
          "prompt": "Which substitution confirms nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "creatures active at night"
            },
            {
              "id": "b",
              "text": "creatures with feathers"
            },
            {
              "id": "c",
              "text": "creatures living in gardens"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That substitution preserves the exact definition in the card."
        }
      }
    ]
  },
  {
    "id": "reading-u02-l03",
    "checks": [
      {
        "cardId": "reading-u02-l03-c1",
        "check": {
          "prompt": "Which reference best gives the wetland meaning of brackish?",
          "choices": [
            {
              "id": "a",
              "text": "the packet glossary"
            },
            {
              "id": "b",
              "text": "a calendar"
            },
            {
              "id": "c",
              "text": "a map scale"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible glossary defines the topic word brackish."
        }
      },
      {
        "cardId": "reading-u02-l03-c2",
        "check": {
          "prompt": "In “a gentle current moved,” what part of speech is current?",
          "choices": [
            {
              "id": "a",
              "text": "noun"
            },
            {
              "id": "b",
              "text": "adjective"
            },
            {
              "id": "c",
              "text": "verb"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The entry labels the moving-water meaning as a noun."
        }
      },
      {
        "cardId": "reading-u02-l03-c3",
        "check": {
          "prompt": "Which bank meaning fits the field note?",
          "choices": [
            {
              "id": "a",
              "text": "land beside a river or stream"
            },
            {
              "id": "b",
              "text": "a business that keeps money"
            },
            {
              "id": "c",
              "text": "a row of switches"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The creek and grass are context evidence for the riverbank meaning."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u02-l01",
    "widgets": [
      {
        "cardId": "reading-u02-l01-c2",
        "ref": {
          "type": "word-root-builder",
          "config": {
            "root": "port",
            "prefixes": [
              "trans"
            ],
            "suffixes": [
              "able"
            ],
            "targets": [
              {
                "word": "transport",
                "meaning": "carry from one place to another"
              },
              {
                "word": "portable",
                "meaning": "able to be carried"
              }
            ]
          }
        }
      }
    ]
  },
  {
    "id": "reading-u02-l02",
    "widgets": [
      {
        "cardId": "reading-u02-l02-c1",
        "ref": {
          "type": "context-clue-detective",
          "config": {
            "passage": "Nocturnal animals, creatures that are active at night, include owls and moths.",
            "targetWord": "nocturnal",
            "clueChoices": [
              {
                "id": "definition",
                "text": "creatures that are active at night",
                "type": "definition"
              },
              {
                "id": "examples",
                "text": "owls and moths",
                "type": "example"
              }
            ],
            "correctChoiceId": "definition"
          }
        }
      }
    ]
  },
  {
    "id": "reading-u02-l03",
    "widgets": []
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u02-l01",
    "passage": {
      "title": "The Rebuilt Garden",
      "text": "After a summer storm, the school garden needed careful work. Nia and Omar rebuilt a short border around the herb bed. They reused straight boards that had washed beside the fence and replaced one cracked board with a new piece. Before lifting anything, they previewed the cleanup map so they knew where each pile belonged.\n\nA small cart transported fresh soil from the gate to the raised beds. The cart was portable enough for one student to pull, but the load was heavy, so the students made two trips. Omar reread the labels on three reusable bins: wood, weeds, and plastic. Nia checked each item before sorting it.\n\nBy noon, the repaired border held the soil in place. The class had built it again, carried supplies across the garden, looked at the plan beforehand, and used materials more than once. Those actions made the meanings of rebuilt, transported, previewed, and reusable clear in context."
    },
    "reference": {
      "title": "Read “The Rebuilt Garden”",
      "text": "After a summer storm, the school garden needed careful work. Nia and Omar rebuilt a short border around the herb bed. They reused straight boards that had washed beside the fence and replaced one cracked board with a new piece. Before lifting anything, they previewed the cleanup map so they knew where each pile belonged.\n\nA small cart transported fresh soil from the gate to the raised beds. The cart was portable enough for one student to pull, but the load was heavy, so the students made two trips. Omar reread the labels on three reusable bins: wood, weeds, and plastic. Nia checked each item before sorting it.\n\nBy noon, the repaired border held the soil in place. The class had built it again, carried supplies across the garden, looked at the plan beforehand, and used materials more than once. Those actions made the meanings of rebuilt, transported, previewed, and reusable clear in context."
    },
    "evidence": [
      "rebuilt",
      "transported",
      "reusable"
    ]
  },
  {
    "id": "reading-u02-l02",
    "passage": {
      "title": "Night Garden Visitors",
      "text": "Night Garden Visitors\n\nSome garden visitors are nocturnal, creatures that are active at night. Owls may hunt after sunset, and moths often visit pale flowers in the dark. These examples help explain nocturnal even if the word is new.\n\nAt dusk, several insects emerge; in other words, they come out from hiding. A luna moth rests during much of the day but becomes active when evening arrives. By contrast, many butterflies are diurnal and fly while the sun is up.\n\nReaders can use the definition beside nocturnal, the examples of owls and moths, and the restatement after emerge. Then they should replace the unknown word with the possible meaning and reread. If “creatures active at night” fits the first sentence without changing its message, the context-clue reasoning is confirmed."
    },
    "reference": {
      "title": "Read “Night Garden Visitors”",
      "text": "Night Garden Visitors\n\nSome garden visitors are nocturnal, creatures that are active at night. Owls may hunt after sunset, and moths often visit pale flowers in the dark. These examples help explain nocturnal even if the word is new.\n\nAt dusk, several insects emerge; in other words, they come out from hiding. A luna moth rests during much of the day but becomes active when evening arrives. By contrast, many butterflies are diurnal and fly while the sun is up.\n\nReaders can use the definition beside nocturnal, the examples of owls and moths, and the restatement after emerge. Then they should replace the unknown word with the possible meaning and reread. If “creatures active at night” fits the first sentence without changing its message, the context-clue reasoning is confirmed."
    },
    "evidence": [
      "nocturnal",
      "emerge",
      "owls and moths"
    ]
  },
  {
    "id": "reading-u02-l03",
    "passage": {
      "title": "Field Notes Word Desk",
      "text": "Field Notes Word Desk — invented reference packet\n\nDictionary entry: current /KUR-uhnt/ noun. 1. a steady movement of water or air in one direction. 2. the present time. adjective. happening now.\n\nDictionary entry: bank /bangk/ noun. 1. land beside a river or stream. 2. a business that keeps and lends money.\n\nGlossary: migrate — verb — to move from one region to another, often with the seasons. Brackish — adjective — slightly salty because fresh water and seawater mix.\n\nField note: “The young fish rested near the grassy bank while a gentle current moved through the creek. Some birds migrate through the preserve each fall. Where the river meets the ocean, the water becomes brackish.”\n\nA print dictionary and a trusted digital dictionary can provide pronunciation, part of speech, and numbered meanings. A topic glossary gives the specialized meaning used in one text. Readers compare each entry with the sentence instead of automatically choosing meaning 1."
    },
    "reference": {
      "title": "Read “Field Notes Word Desk”",
      "text": "Field Notes Word Desk — invented reference packet\n\nDictionary entry: current /KUR-uhnt/ noun. 1. a steady movement of water or air in one direction. 2. the present time. adjective. happening now.\n\nDictionary entry: bank /bangk/ noun. 1. land beside a river or stream. 2. a business that keeps and lends money.\n\nGlossary: migrate — verb — to move from one region to another, often with the seasons. Brackish — adjective — slightly salty because fresh water and seawater mix.\n\nField note: “The young fish rested near the grassy bank while a gentle current moved through the creek. Some birds migrate through the preserve each fall. Where the river meets the ocean, the water becomes brackish.”\n\nA print dictionary and a trusted digital dictionary can provide pronunciation, part of speech, and numbered meanings. A topic glossary gives the specialized meaning used in one text. Readers compare each entry with the sentence instead of automatically choosing meaning 1."
    },
    "evidence": [
      "current /KUR-uhnt/",
      "brackish",
      "grassy bank"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 2 literal content', () => {
  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit02Lessons, expectedManifest, 'reading');
    expect(unit02Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit02Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit02Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit02Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit02Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit02Lessons) {
      expect(validateLesson(lesson)).toEqual([]);
      const source=expectedSources.find(row=>row.id===lesson.id)!;
      expect(lesson.workedExample.passage).toEqual(source.passage);
      expect(lesson.quiz.reference).toEqual(source.reference);
      expect(lesson.workedExample.passage!.text).toBe(lesson.quiz.reference!.text);
      for (const token of source.evidence) expect(source.passage.text).toContain(token);
      for (const card of lesson.learnCards) {
        expect(card.check).toBeDefined();
        expect(card.blocks.some(block=>block.text.startsWith('Support:')||block.text.startsWith('Response frame:')||block.text.startsWith('Stretch:'))).toBe(true);
        if ('widget' in card) expect(WidgetRefSchema.safeParse(card.widget).success).toBe(true);
      }
    }
  });

  test('keeps exact pools, unique visible answers, balanced MC keys, and solo framing', () => {
    for (const lesson of unit02Lessons) {
      expect(lesson.quiz.passThreshold).toBe(8);
      expect(lesson.quiz.pool.map(question=>question.id)).toEqual(Array.from({length:13},(_,index)=>`${lesson.id}-q${String(index+1).padStart(2,'0')}`));
      expect(new Set(lesson.quiz.pool.map(question=>question.conceptTag)).size).toBe(3);
      for (const question of lesson.quiz.pool) {
        const options=visible(question);
        expect(new Set(options.map(option=>option.id)).size).toBe(options.length);
        expect(new Set(options.map(option=>normalize(option.text))).size).toBe(options.length);
      }
      const keys=lesson.quiz.pool.filter(question=>question.type==='multiple-choice').map(question=>question.correctChoiceId);
      const counts=new Map<string,number>(); for(const key of keys) counts.set(key,(counts.get(key)??0)+1);
      expect([...counts.keys()].sort()).toEqual(['a','b','c','d']);
      expect(Math.max(...counts.values())-Math.min(...counts.values())).toBeLessThanOrEqual(1);
      expect(JSON.stringify(lesson)).not.toMatch(/live (partner|classmate|collaboration)|recording score|words per minute score/i);
    }
  });

  test('gives the submarine morphology check the sentence context named in its feedback', () => {
    const question = unit02Lessons[0]!.quiz.pool.find(
      ({ id }) => id === 'reading-u02-l01-q11',
    );

    expect(question?.prompt).toBe(
      'In “The submarine traveled under the sea,” which response best checks the word submarine?',
    );
  });
});
```

### `src/content/reading/u03.ts`

```ts
import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit03Lessons = [
  {
    "id": "reading-u03-l01",
    "unitId": "reading-u03",
    "title": "Connect Setting, Conflict, Character Change, and Plot",
    "indicatorCodes": [
      "ELA.4.AOR.1.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Stories are systems: setting pressures characters, conflict demands choices, and choices move the plot."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "A character change is shown through later actions, not simply announced."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s trace cause and effect through one complete story."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u03-l01-c1",
        "title": "Connect Setting and Conflict",
        "blocks": [
          {
            "kind": "text",
            "text": "Setting is when and where; conflict is the central struggle. Ask how conditions in the setting create or intensify the problem."
          },
          {
            "kind": "example",
            "text": "At the open harbor field, sudden gusts twist the kite tail around a fence post."
          },
          {
            "kind": "tip",
            "text": "Use Setting condition → Resulting problem."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which setting detail causes the kite problem?",
          "choices": [
            {
              "id": "a",
              "text": "sudden harbor gusts"
            },
            {
              "id": "b",
              "text": "the judging line"
            },
            {
              "id": "c",
              "text": "the kite color"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible example connects gusts to the twisted tail."
        }
      },
      {
        "id": "reading-u03-l01-c2",
        "title": "Track Character Change",
        "blocks": [
          {
            "kind": "text",
            "text": "Track what a character wants, does, learns, and does differently later."
          },
          {
            "kind": "example",
            "text": "Priya first pulls harder; after the frame bends, she listens, moves, shortens the tail, and waits."
          },
          {
            "kind": "tip",
            "text": "Change needs before-and-after evidence."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Which later action best shows Priya changed?",
          "choices": [
            {
              "id": "a",
              "text": "She waits for steady wind and follows the team plan"
            },
            {
              "id": "b",
              "text": "She wants to launch first"
            },
            {
              "id": "c",
              "text": "She carries a diamond kite"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Her later patience contrasts with her earlier rush."
        }
      },
      {
        "id": "reading-u03-l01-c3",
        "title": "Explain How Conflict Builds Plot",
        "blocks": [
          {
            "kind": "text",
            "text": "Plot grows through connected events: situation, conflict, attempts, turning point, and resolution."
          },
          {
            "kind": "example",
            "text": "The bent frame is a turning point because Priya recognizes the cost of rushing."
          },
          {
            "kind": "tip",
            "text": "Explain each link with because, so, or therefore."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "widget": {
          "type": "story-elements-mapper",
          "config": {
            "textTitle": "The Windy Kite Festival",
            "fields": [
              "character",
              "setting",
              "problem",
              "events",
              "solution"
            ],
            "answers": {
              "character": "Priya",
              "setting": "A windy kite festival",
              "problem": "Strong gusts threaten the team kite",
              "events": "Priya listens, shortens the tail, and changes the launch plan",
              "solution": "The team launches the kite safely"
            }
          }
        },
        "check": {
          "prompt": "Why is the bent frame a turning point?",
          "choices": [
            {
              "id": "a",
              "text": "It causes Priya to reconsider rushing"
            },
            {
              "id": "b",
              "text": "It changes the kite color"
            },
            {
              "id": "c",
              "text": "It ends the festival immediately"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The consequence changes her next choice."
        }
      }
    ],
    "workedExample": {
      "title": "Trace cause and change through the kite plot",
      "passage": {
        "title": "The Windy Kite Festival",
        "text": "The Windy Kite Festival\n\nPriya’s team carried a bright diamond kite onto the open field beside the harbor. Flags snapped above the booths, and sudden gusts pushed hats across the grass. Priya wanted to launch at once because the judging line was growing.\n\nWhen the first strong gust twisted the long kite tail around a fence post, teammate Ben suggested waiting. Priya frowned and pulled harder. The paper frame bent, and she realized that rushing could ruin everyone’s work. She listened while Ben explained that a shorter tail would drag less near the fence.\n\nThe team moved to the field’s clear center, shortened the tail, and watched two gusts before trying again. Priya counted down only when the wind steadied. Ben held the kite while she released the line gradually. The kite climbed without striking the fence.\n\nAfter the flight, Priya thanked Ben for speaking up. The windy harbor setting created the danger, but Priya’s decision to listen and adjust changed the events. Their safer plan solved the conflict and let the whole team finish the festival flight."
      },
      "steps": [
        "Name the gusty harbor setting and twisted-tail conflict.",
        "Compare Priya’s first response with her later listening and waiting.",
        "Link the adjusted launch plan to the safe flight resolution."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “The Windy Kite Festival”",
        "text": "The Windy Kite Festival\n\nPriya’s team carried a bright diamond kite onto the open field beside the harbor. Flags snapped above the booths, and sudden gusts pushed hats across the grass. Priya wanted to launch at once because the judging line was growing.\n\nWhen the first strong gust twisted the long kite tail around a fence post, teammate Ben suggested waiting. Priya frowned and pulled harder. The paper frame bent, and she realized that rushing could ruin everyone’s work. She listened while Ben explained that a shorter tail would drag less near the fence.\n\nThe team moved to the field’s clear center, shortened the tail, and watched two gusts before trying again. Priya counted down only when the wind steadied. Ben held the kite while she released the line gradually. The kite climbed without striking the fence.\n\nAfter the flight, Priya thanked Ben for speaking up. The windy harbor setting created the danger, but Priya’s decision to listen and adjust changed the events. Their safer plan solved the conflict and let the whole team finish the festival flight."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which setting detail most directly creates the conflict?",
          "choices": [
            {
              "id": "a",
              "text": "Strong gusts near the fence"
            },
            {
              "id": "b",
              "text": "Bright booth flags"
            },
            {
              "id": "c",
              "text": "A growing judging line"
            },
            {
              "id": "d",
              "text": "The diamond kite shape"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The gusts twist the tail around the fence.",
          "id": "reading-u03-l01-q01",
          "conceptTag": "setting-conflict",
          "reviewCardId": "reading-u03-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "The harbor wind affects the events of the story.",
          "choices": [
            {
              "id": "true",
              "text": "True — gusts create danger and shape the plan"
            },
            {
              "id": "false",
              "text": "False — the setting has no effect"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The plot depends on changing wind.",
          "id": "reading-u03-l01-q02",
          "conceptTag": "setting-conflict",
          "reviewCardId": "reading-u03-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What is the central conflict?",
          "choices": [
            {
              "id": "a",
              "text": "Priya dislikes festivals"
            },
            {
              "id": "b",
              "text": "Ben wants a different color"
            },
            {
              "id": "c",
              "text": "Gusts threaten the team kite and Priya rushes the launch"
            },
            {
              "id": "d",
              "text": "The booth has too many flags"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The weather and rushed response endanger the kite.",
          "id": "reading-u03-l01-q03",
          "conceptTag": "setting-conflict",
          "reviewCardId": "reading-u03-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which sentence best uses causal reasoning?",
          "choices": [
            {
              "id": "a",
              "text": "The setting is outdoors"
            },
            {
              "id": "b",
              "text": "A kite has a tail"
            },
            {
              "id": "c",
              "text": "Priya is on a team"
            },
            {
              "id": "d",
              "text": "Because gusts catch the long tail near the fence, the team must change its plan"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It explicitly links setting to conflict.",
          "id": "reading-u03-l01-q04",
          "conceptTag": "setting-conflict",
          "reviewCardId": "reading-u03-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does Priya respond at first?",
          "choices": [
            {
              "id": "a",
              "text": "She waits calmly"
            },
            {
              "id": "b",
              "text": "She frowns and pulls harder"
            },
            {
              "id": "c",
              "text": "She leaves the field"
            },
            {
              "id": "d",
              "text": "She shortens the tail immediately"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Her first action is impatient.",
          "id": "reading-u03-l01-q05",
          "conceptTag": "character-change",
          "reviewCardId": "reading-u03-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "Priya’s thanks to Ben and careful second launch show a change in her actions.",
          "choices": [
            {
              "id": "true",
              "text": "True — later actions show listening and patience"
            },
            {
              "id": "false",
              "text": "False — she behaves exactly as before"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The before-and-after actions differ.",
          "id": "reading-u03-l01-q06",
          "conceptTag": "character-change",
          "reviewCardId": "reading-u03-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What causes Priya to reconsider?",
          "choices": [
            {
              "id": "a",
              "text": "The flags snap"
            },
            {
              "id": "b",
              "text": "The line grows"
            },
            {
              "id": "c",
              "text": "The kite frame bends"
            },
            {
              "id": "d",
              "text": "Ben holds the kite"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The bent frame reveals the risk of rushing.",
          "id": "reading-u03-l01-q07",
          "conceptTag": "character-change",
          "reviewCardId": "reading-u03-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which statement best explains Priya’s change?",
          "choices": [
            {
              "id": "a",
              "text": "She moves from rushing alone to listening and adapting with her team"
            },
            {
              "id": "b",
              "text": "She changes from liking kites to disliking them"
            },
            {
              "id": "c",
              "text": "She learns that wind never changes"
            },
            {
              "id": "d",
              "text": "She becomes the festival judge"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The evidence shows teamwork and patience.",
          "id": "reading-u03-l01-q08",
          "conceptTag": "character-change",
          "reviewCardId": "reading-u03-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which event begins the main problem?",
          "choices": [
            {
              "id": "a",
              "text": "Priya thanks Ben"
            },
            {
              "id": "b",
              "text": "The kite climbs"
            },
            {
              "id": "c",
              "text": "The team moves to center field"
            },
            {
              "id": "d",
              "text": "A gust twists the tail around a fence post"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "That event launches the conflict.",
          "id": "reading-u03-l01-q09",
          "conceptTag": "plot-development",
          "reviewCardId": "reading-u03-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How is the conflict resolved?",
          "choices": [
            {
              "id": "a",
              "text": "The festival closes"
            },
            {
              "id": "b",
              "text": "The team moves, shortens the tail, waits, and launches safely"
            },
            {
              "id": "c",
              "text": "Priya buys a new kite"
            },
            {
              "id": "d",
              "text": "The wind stops forever"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The revised plan addresses the wind and fence danger.",
          "id": "reading-u03-l01-q10",
          "conceptTag": "plot-development",
          "reviewCardId": "reading-u03-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "The resolution follows from the characters’ changed choices rather than luck alone.",
          "choices": [
            {
              "id": "true",
              "text": "True — their plan produces the safer launch"
            },
            {
              "id": "false",
              "text": "False — no action contributes"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Their deliberate adjustments solve the problem.",
          "id": "reading-u03-l01-q11",
          "conceptTag": "plot-development",
          "reviewCardId": "reading-u03-l01-c3"
        },
        {
          "type": "sort",
          "prompt": "Order the plot events.",
          "explanation": "The events progress from conflict through turning point and response to resolution.",
          "id": "reading-u03-l01-q12",
          "conceptTag": "plot-development",
          "reviewCardId": "reading-u03-l01-c3",
          "items": [
            {
              "id": "step-3",
              "text": "Priya listens and the team adjusts"
            },
            {
              "id": "step-1",
              "text": "A gust twists the tail"
            },
            {
              "id": "step-4",
              "text": "The kite launches safely"
            },
            {
              "id": "step-2",
              "text": "The frame bends when Priya pulls"
            }
          ],
          "correctOrder": [
            "step-1",
            "step-2",
            "step-3",
            "step-4"
          ]
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation connects all four story elements?",
          "choices": [
            {
              "id": "a",
              "text": "The kite is bright and Priya attends a festival"
            },
            {
              "id": "b",
              "text": "Ben speaks and flags move"
            },
            {
              "id": "c",
              "text": "Wind creates the conflict; Priya changes after a consequence; her new choices build a safe resolution"
            },
            {
              "id": "d",
              "text": "The team wins because the setting disappears"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It traces the full causal chain.",
          "id": "reading-u03-l01-q13",
          "conceptTag": "plot-development",
          "reviewCardId": "reading-u03-l01-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
```

### `src/content/reading/u03.test.ts`

```ts
import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit03Lessons } from './u03';

const expectedManifest = [
  {
    "id": "reading-u03-l01",
    "unitId": "reading-u03",
    "title": "Connect Setting, Conflict, Character Change, and Plot",
    "indicatorCodes": [
      "ELA.4.AOR.1.1"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u03-l01",
    "cards": [
      {
        "id": "reading-u03-l01-c1",
        "title": "Connect Setting and Conflict",
        "conceptTag": "setting-conflict"
      },
      {
        "id": "reading-u03-l01-c2",
        "title": "Track Character Change",
        "conceptTag": "character-change"
      },
      {
        "id": "reading-u03-l01-c3",
        "title": "Explain How Conflict Builds Plot",
        "conceptTag": "plot-development"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u03-l01",
    "questions": [
      {
        "id": "reading-u03-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "setting-conflict",
        "reviewCardId": "reading-u03-l01-c1"
      },
      {
        "id": "reading-u03-l01-q02",
        "type": "true-false",
        "conceptTag": "setting-conflict",
        "reviewCardId": "reading-u03-l01-c1"
      },
      {
        "id": "reading-u03-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "setting-conflict",
        "reviewCardId": "reading-u03-l01-c1"
      },
      {
        "id": "reading-u03-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "setting-conflict",
        "reviewCardId": "reading-u03-l01-c1"
      },
      {
        "id": "reading-u03-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "character-change",
        "reviewCardId": "reading-u03-l01-c2"
      },
      {
        "id": "reading-u03-l01-q06",
        "type": "true-false",
        "conceptTag": "character-change",
        "reviewCardId": "reading-u03-l01-c2"
      },
      {
        "id": "reading-u03-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "character-change",
        "reviewCardId": "reading-u03-l01-c2"
      },
      {
        "id": "reading-u03-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "character-change",
        "reviewCardId": "reading-u03-l01-c2"
      },
      {
        "id": "reading-u03-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "plot-development",
        "reviewCardId": "reading-u03-l01-c3"
      },
      {
        "id": "reading-u03-l01-q10",
        "type": "multiple-choice",
        "conceptTag": "plot-development",
        "reviewCardId": "reading-u03-l01-c3"
      },
      {
        "id": "reading-u03-l01-q11",
        "type": "true-false",
        "conceptTag": "plot-development",
        "reviewCardId": "reading-u03-l01-c3"
      },
      {
        "id": "reading-u03-l01-q12",
        "type": "sort",
        "conceptTag": "plot-development",
        "reviewCardId": "reading-u03-l01-c3"
      },
      {
        "id": "reading-u03-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "plot-development",
        "reviewCardId": "reading-u03-l01-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u03-l01",
    "checks": [
      {
        "cardId": "reading-u03-l01-c1",
        "check": {
          "prompt": "Which setting detail causes the kite problem?",
          "choices": [
            {
              "id": "a",
              "text": "sudden harbor gusts"
            },
            {
              "id": "b",
              "text": "the judging line"
            },
            {
              "id": "c",
              "text": "the kite color"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible example connects gusts to the twisted tail."
        }
      },
      {
        "cardId": "reading-u03-l01-c2",
        "check": {
          "prompt": "Which later action best shows Priya changed?",
          "choices": [
            {
              "id": "a",
              "text": "She waits for steady wind and follows the team plan"
            },
            {
              "id": "b",
              "text": "She wants to launch first"
            },
            {
              "id": "c",
              "text": "She carries a diamond kite"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Her later patience contrasts with her earlier rush."
        }
      },
      {
        "cardId": "reading-u03-l01-c3",
        "check": {
          "prompt": "Why is the bent frame a turning point?",
          "choices": [
            {
              "id": "a",
              "text": "It causes Priya to reconsider rushing"
            },
            {
              "id": "b",
              "text": "It changes the kite color"
            },
            {
              "id": "c",
              "text": "It ends the festival immediately"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The consequence changes her next choice."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u03-l01",
    "widgets": [
      {
        "cardId": "reading-u03-l01-c3",
        "ref": {
          "type": "story-elements-mapper",
          "config": {
            "textTitle": "The Windy Kite Festival",
            "fields": [
              "character",
              "setting",
              "problem",
              "events",
              "solution"
            ],
            "answers": {
              "character": "Priya",
              "setting": "A windy kite festival",
              "problem": "Strong gusts threaten the team kite",
              "events": "Priya listens, shortens the tail, and changes the launch plan",
              "solution": "The team launches the kite safely"
            }
          }
        }
      }
    ]
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u03-l01",
    "passage": {
      "title": "The Windy Kite Festival",
      "text": "The Windy Kite Festival\n\nPriya’s team carried a bright diamond kite onto the open field beside the harbor. Flags snapped above the booths, and sudden gusts pushed hats across the grass. Priya wanted to launch at once because the judging line was growing.\n\nWhen the first strong gust twisted the long kite tail around a fence post, teammate Ben suggested waiting. Priya frowned and pulled harder. The paper frame bent, and she realized that rushing could ruin everyone’s work. She listened while Ben explained that a shorter tail would drag less near the fence.\n\nThe team moved to the field’s clear center, shortened the tail, and watched two gusts before trying again. Priya counted down only when the wind steadied. Ben held the kite while she released the line gradually. The kite climbed without striking the fence.\n\nAfter the flight, Priya thanked Ben for speaking up. The windy harbor setting created the danger, but Priya’s decision to listen and adjust changed the events. Their safer plan solved the conflict and let the whole team finish the festival flight."
    },
    "reference": {
      "title": "Read “The Windy Kite Festival”",
      "text": "The Windy Kite Festival\n\nPriya’s team carried a bright diamond kite onto the open field beside the harbor. Flags snapped above the booths, and sudden gusts pushed hats across the grass. Priya wanted to launch at once because the judging line was growing.\n\nWhen the first strong gust twisted the long kite tail around a fence post, teammate Ben suggested waiting. Priya frowned and pulled harder. The paper frame bent, and she realized that rushing could ruin everyone’s work. She listened while Ben explained that a shorter tail would drag less near the fence.\n\nThe team moved to the field’s clear center, shortened the tail, and watched two gusts before trying again. Priya counted down only when the wind steadied. Ben held the kite while she released the line gradually. The kite climbed without striking the fence.\n\nAfter the flight, Priya thanked Ben for speaking up. The windy harbor setting created the danger, but Priya’s decision to listen and adjust changed the events. Their safer plan solved the conflict and let the whole team finish the festival flight."
    },
    "evidence": [
      "sudden gusts",
      "frame bent",
      "finish the festival flight"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 3 literal content', () => {
  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit03Lessons, expectedManifest, 'reading');
    expect(unit03Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit03Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit03Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit03Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit03Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit03Lessons) {
      expect(validateLesson(lesson)).toEqual([]);
      const source=expectedSources.find(row=>row.id===lesson.id)!;
      expect(lesson.workedExample.passage).toEqual(source.passage);
      expect(lesson.quiz.reference).toEqual(source.reference);
      expect(lesson.workedExample.passage!.text).toBe(lesson.quiz.reference!.text);
      for (const token of source.evidence) expect(source.passage.text).toContain(token);
      for (const card of lesson.learnCards) {
        expect(card.check).toBeDefined();
        expect(card.blocks.some(block=>block.text.startsWith('Support:')||block.text.startsWith('Response frame:')||block.text.startsWith('Stretch:'))).toBe(true);
        if ('widget' in card) expect(WidgetRefSchema.safeParse(card.widget).success).toBe(true);
      }
    }
  });

  test('keeps exact pools, unique visible answers, balanced MC keys, and solo framing', () => {
    for (const lesson of unit03Lessons) {
      expect(lesson.quiz.passThreshold).toBe(8);
      expect(lesson.quiz.pool.map(question=>question.id)).toEqual(Array.from({length:13},(_,index)=>`${lesson.id}-q${String(index+1).padStart(2,'0')}`));
      expect(new Set(lesson.quiz.pool.map(question=>question.conceptTag)).size).toBe(3);
      for (const question of lesson.quiz.pool) {
        const options=visible(question);
        expect(new Set(options.map(option=>option.id)).size).toBe(options.length);
        expect(new Set(options.map(option=>normalize(option.text))).size).toBe(options.length);
      }
      const keys=lesson.quiz.pool.filter(question=>question.type==='multiple-choice').map(question=>question.correctChoiceId);
      const counts=new Map<string,number>(); for(const key of keys) counts.set(key,(counts.get(key)??0)+1);
      expect([...counts.keys()].sort()).toEqual(['a','b','c','d']);
      expect(Math.max(...counts.values())-Math.min(...counts.values())).toBeLessThanOrEqual(1);
      expect(JSON.stringify(lesson)).not.toMatch(/live (partner|classmate|collaboration)|recording score|words per minute score/i);
    }
  });
});
```

### Task 2: Revalidate accepted Reading Unit 1 with OE metadata

**Files:** Modify `src/content/reading/u01.ts`, `src/content/reading/u01.test.ts`.

**Consumes:** The accepted deepened Unit 1 source/test and the complete final literals in this plan.

**Produces:** Existing `unit01Lessons` with only the curriculum import/two OE fields plus exact helper/OE assertions; no learner-facing change.

- [ ] **Step 1 (2–5 minutes): Replace the focused test with the exact final literal.** Run `git diff --word-diff=porcelain -- src/content/reading/u01.test.ts` and confirm existing passage/check assertions remain.
- [ ] **Step 2 (2–5 minutes): Run red.** Run `npm test -- src/content/reading/u01.test.ts`; expect only missing OE metadata to fail.
- [ ] **Step 3 (2–5 minutes): Apply the exact source literal.** Copy the final `u01.ts`; verify its learner-facing strings equal the pre-task file and only the import/two OE fields differ.
- [ ] **Step 4 (2–5 minutes): Run green.** Run `npm test -- src/content/reading/u01.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`.
- [ ] **Step 5 (2–5 minutes): Review.** Run `git diff --word-diff=porcelain -- src/content/reading/u01.ts` and `git diff --check`; reject any learner-facing change.
- [ ] **Step 6 (2–5 minutes): Commit.** Stage exactly both U01 paths, inspect staged names, and commit `feat(content): add reading OE metadata to unit one`.

### Task 3: reading-u02-l01 — Build Meaning with Roots, Base Words, and Affixes

**Files:** Create `src/content/reading/u02.ts`, `src/content/reading/u02.test.ts`.

**Consumes:** The complete final `u02.ts` and `u02.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u02-l01` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u02.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u02.test.ts`; expect a missing-module failure.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u02-l01` object from the final `u02.ts` literal through the end of `reading-u02-l01-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u02.ts src/content/reading/u02.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u02.ts src/content/reading/u02.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u02-l01 build meaning with roots, base words, and affixes"`.

### Task 4: reading-u02-l02 — Use Definition, Example, and Restatement Clues

**Files:** Modify `src/content/reading/u02.ts`, `src/content/reading/u02.test.ts`.

**Consumes:** The complete final `u02.ts` and `u02.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u02-l02` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u02.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u02.test.ts`; expect the exact expected lesson count to exceed the current export by one.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u02-l02` object from the final `u02.ts` literal through the end of `reading-u02-l02-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u02.ts src/content/reading/u02.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u02.ts src/content/reading/u02.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u02-l02 use definition, example, and restatement clues"`.

### Task 5: reading-u02-l03 — Use Print and Digital References Precisely

**Files:** Modify `src/content/reading/u02.ts`, `src/content/reading/u02.test.ts`.

**Consumes:** The complete final `u02.ts` and `u02.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u02-l03` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u02.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u02.test.ts`; expect the exact expected lesson count to exceed the current export by one.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u02-l03` object from the final `u02.ts` literal through the end of `reading-u02-l03-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u02.ts src/content/reading/u02.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u02.ts src/content/reading/u02.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u02-l03 use print and digital references precisely"`.

### Task 6: reading-u03-l01 — Connect Setting, Conflict, Character Change, and Plot

**Files:** Create `src/content/reading/u03.ts`, `src/content/reading/u03.test.ts`.

**Consumes:** The complete final `u03.ts` and `u03.test.ts` literals in this plan, plus any earlier accepted lesson object in the same unit.

**Produces:** The exact `reading-u03-l01` object and its exact manifest/card/check/widget/source/route assertions, appended in manifest order.

- [ ] **Step 1 (2–5 minutes): Add the exact red test slice.** From the final `u03.test.ts` literal, copy this lesson's entries in `expectedManifest`, `expectedCards`, `expectedRoutes`, `expectedChecks`, `expectedWidgets`, and `expectedSources`, plus the complete shared assertions if this is the unit's first slice.
- [ ] **Step 2 (2–5 minutes): Prove red.** Run `npm test -- src/content/reading/u03.test.ts`; expect a missing-module failure.
- [ ] **Step 3 (2–5 minutes): Add identity, intro, source, and card 1.** Copy the `reading-u03-l01` object from the final `u03.ts` literal through the end of `reading-u03-l01-c1`.
- [ ] **Step 4 (2–5 minutes): Add cards 2–3 and the worked example.** Continue copying the same literal through `workedExample`; preserve every rich-block kind, check choice ID, source string, and widget config.
- [ ] **Step 5 (2–5 minutes): Add q01–q04.** Copy the four raw question objects exactly, including canonical IDs, choice IDs, keys, explanations, tag, and review card.
- [ ] **Step 6 (2–5 minutes): Add q05–q08.** Copy the next four raw question objects exactly.
- [ ] **Step 7 (2–5 minutes): Add q09–q13 and quiz reference.** Copy the final five question objects and close the exact lesson/export structure.
- [ ] **Step 8 (2–5 minutes): Run focused green.** Run `npm test -- src/content/reading/u03.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false`; expect PASS.
- [ ] **Step 9 (2–5 minutes): Review the lesson.** Trace all 13 answers from the visible source/cards, parse any widget ref, verify three tag/card pairs and three checks, and run `git diff --check -- src/content/reading/u03.ts src/content/reading/u03.test.ts`.
- [ ] **Step 10 (2–5 minutes): Commit only this lesson slice.** Run `git add src/content/reading/u03.ts src/content/reading/u03.test.ts && git diff --cached --name-only`, verify no protected path, then `git commit -m "feat(content): add reading-u03-l01 connect setting, conflict, character change, and plot"`.

### Task 7: Verify and review the complete C2A wave

**Files:** Read/verify `src/content/reading/u01.ts`, `src/content/reading/u01.test.ts`, `src/content/reading/u02.ts`, `src/content/reading/u02.test.ts`, `src/content/reading/u03.ts`, `src/content/reading/u03.test.ts`; do not modify shared or protected files.

**Consumes:** Every accepted per-lesson commit in this wave.

**Produces:** Mechanical count evidence, green focused/permanent/type gates, and an independent scoped-review disposition.

- [ ] **Step 1 (2–5 minutes): Run focused tests.** Run `npm test -- src/content/reading/u01.test.ts src/content/reading/u02.test.ts src/content/reading/u03.test.ts src/content/schema.test.ts src/content/content-validation.test.ts`.
- [ ] **Step 2 (2–5 minutes): Run TypeScript.** Run `npx tsc -b --pretty false`.
- [ ] **Step 3 (2–5 minutes): Run mechanical scans.** Verify canonical q01–q13 sequences, exact three-card/13-question counts, threshold 8, ordered six-code OE arrays, one tag/card mapping per card, exact widget counts, no empty lesson/card/pool arrays, and no planning-marker or live-collaboration/oral-scoring prose.
- [ ] **Step 4 (2–5 minutes): Inspect scope.** Run `git diff --check` and verify the wave commit range touches only the owned paths.
- [ ] **Step 5 (2–5 minutes): Request independent review.** Review standard fidelity, source-before-question visibility, answer/distractor correctness, differentiated supports, widget configs, and accessibility/solo framing; return defects to the owning lesson.

## Execution handoff

The wave stops after its owned modules/tests are reviewed. Plan C master Task C4 alone changes the Reading registry and final catalog.
