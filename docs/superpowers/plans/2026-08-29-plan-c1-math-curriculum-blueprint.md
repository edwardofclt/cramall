# Cram All Plan C1: Math Curriculum Blueprint

> **Status:** Tracked curriculum blueprint; not an executable implementation plan. Source work is blocked until all five exact tracked literal wave plans in **Promotion status: blueprint-only and blocked** exist and pass their own writing-plans reviews.

**Goal:** Preserve the two accepted Math pilot lessons and author the 31 remaining Grade 4 Math lessons so the Math catalog contains exactly 33 lessons across 12 units.

**Architecture:** Math Unit 1 remains the accepted reference implementation. Each new unit owns one `Lesson[]` module and one direct test; Math wave authors do not edit subject indexes, manifests, shared schemas, generated standards, or global validation files. After all five isolated Math waves pass direct schema, cross-reference, content, TypeScript, and human-accuracy review, master Plan C Task C3 performs the one atomic Math registration and owns every shared/index edit.

**Tech Stack:** React 18, TypeScript 5, Zod 3, Vitest 2; no new packages.

**Spec:** `/Users/eherbert/cram-all/docs/superpowers/specs/2026-08-29-cram-all-design.md`

**Master plan:** `docs/superpowers/plans/2026-08-29-plan-c-full-year-content.md`

## Global Constraints

- Execute only after Plan A and Plan B are committed and their full suites pass. Before authoring, run `npm test && npx tsc -b --pretty false && npm run build` from `/Users/eherbert/cram-all`.
- Treat `/Users/eherbert/cram-all/src/content/math/u01.ts` as read-only. It remains exactly `math-u01-l01` “Numbers to the Millions” (`4.NR.1.1`) and `math-u01-l02` “Comparing and Ordering Big Numbers” (`4.NR.1.3`). Its accepted coverage lives in `/Users/eherbert/cram-all/src/content/content-validation.test.ts`, `/Users/eherbert/cram-all/src/content/schema.test.ts`, and `/Users/eherbert/cram-all/src/widgets/math/widgets.test.tsx`.
- Final Math scope is exactly 12 units and 33 lessons: the two accepted Unit 1 lessons plus the 31 new lessons listed below. Every new lesson has exactly three learn cards, question ids `q01` through `q13`, and `passThreshold: 8`.
- Every module uses `import type { Lesson } from '../schema'`. Its named `unitNNLessons` export is written with `satisfies Lesson[]` so the array is both schema-compatible and literal-aware. The direct test imports that exact symbol from `./uNN`.
- Every direct test calls `LessonSchema.safeParse`, `validateLesson`, and literal identity/card/question assertions. It does not duplicate shared validators.
- A question's `conceptTag` maps to exactly one same-lesson `reviewCardId`; every card receives at least one question. Question prose must be understandable without using a widget.
- Use at least two pedagogically natural question types per lesson. `MC`, `TF`, `FB`, and `SORT` below mean `multiple-choice`, `true-false`, `fill-blank`, and `sort`. Each mapping entry is exact: `qNN TYPE tag -> cN` fixes the question id, type, `conceptTag`, and `reviewCardId` suffix.
- A widget appears only as the complete literal `{ type, config }` shown below. Each shown literal conforms to the final Plan B discriminated `WidgetRefSchema`. When the final widget cannot teach the standard directly, the card has no `widget` property.
- Unit authors may create only `/Users/eherbert/cram-all/src/content/math/u02.ts` through `u12.ts` and their colocated `.test.ts` files. They do not edit `/Users/eherbert/cram-all/src/content/math/index.ts`, `/Users/eherbert/cram-all/src/content/curriculum.ts`, `/Users/eherbert/cram-all/src/content/unit-test-helpers.ts`, `/Users/eherbert/cram-all/src/content/schema.ts`, `/Users/eherbert/cram-all/src/content/content-validation.test.ts`, `/Users/eherbert/cram-all/src/content/lesson-quality.test.ts`, generated standards, or any reading/science file. Master Plan C owns those files.
- Each red gate runs the new direct test and fails because `./uNN` is absent. Each green gate runs the direct test plus the permanent schema/content suites, `npx tsc -b --pretty false`, and `npm run build`.
- Every implementation commit runs the task's narrow `git add`, then requires the sorted output of `git diff --cached --name-only` to equal exactly that unit source and direct test before committing. This guard is mandatory in a shared checkout; an isolated worktree remains acceptable. The tracked curriculum blueprint and tracked wave plans are reviewed artifacts, not files to mix into a content-module commit.

---

## Exact 33-lesson inventory

The exact unit titles are: Unit 01 “Place Value and Whole Number Relationships”; Unit 02 “Addition, Subtraction, and Estimation with Whole Numbers”; Unit 03 “Factors, Multiples, Primes, and Patterns”; Unit 04 “Multi-Digit Multiplication and Multiplicative Comparison”; Unit 05 “Multi-Digit Division and Multi-Step Problem Solving”; Unit 06 “Fraction Equivalence and Comparison”; Unit 07 “Fraction Operations”; Unit 08 “Decimals: Tenths, Hundredths, and Fraction Connections”; Unit 09 “Measurement: Money, Elapsed Time, Length, Weight, and Conversions”; Unit 10 “Perimeter and Area of Rectangles”; Unit 11 “Geometry: Classifying Triangles and Quadrilaterals”; Unit 12 “Data, Graphs, and Probability”.

| Unit | Lesson id | Exact title | Exact indicators |
|---|---|---|---|
| 01 | `math-u01-l01` | Numbers to the Millions | `['4.NR.1.1']` |
| 01 | `math-u01-l02` | Comparing and Ordering Big Numbers | `['4.NR.1.3']` |
| 02 | `math-u02-l01` | Add and Subtract to 100,000 | `['4.PAFR.1.1']` |
| 02 | `math-u02-l02` | Estimate and Judge Reasonableness | `['4.NR.1.2']` |
| 03 | `math-u03-l01` | Factor Pairs, Primes, and Composites | `['4.PAFR.3.1']` |
| 03 | `math-u03-l02` | Rules and Function-Table Patterns | `['4.PAFR.3.2']` |
| 04 | `math-u04-l01` | Multiply by Multiples of 10 and 100 | `['4.PAFR.1.2']` |
| 04 | `math-u04-l02` | Decompose to Multiply Multi-Digit Numbers | `['4.PAFR.1.3']` |
| 04 | `math-u04-l03` | Multiplicative Comparisons and Unknowns | `['4.PAFR.3.3']` |
| 05 | `math-u05-l01` | Divide up to Four Digits by One Digit, Including Remainders | `['4.PAFR.1.4']` |
| 05 | `math-u05-l02` | Two-Step Equations with an Unknown | `['4.PAFR.3.4']` |
| 06 | `math-u06-l01` | Equivalent Fractions and Models | `['4.NR.2.3']` |
| 06 | `math-u06-l02` | Compose and Decompose Like-Denominator Fractions | `['4.NR.2.4']` |
| 06 | `math-u06-l03` | Mixed Numbers and Fractions Greater Than One | `['4.NR.2.5']` |
| 06 | `math-u06-l04` | Compare Fractions and Mixed Numbers | `['4.NR.2.6']` |
| 07 | `math-u07-l01` | Add and Subtract Like-Denominator Fractions | `['4.PAFR.2.1']` |
| 07 | `math-u07-l02` | Whole Number Times a Unit Fraction | `['4.PAFR.2.3']` |
| 07 | `math-u07-l03` | Fractions as Equal-Sharing Division | `['4.PAFR.2.4']` |
| 08 | `math-u08-l01` | Tenths and Hundredths as Fractions and Decimals | `['4.NR.2.1']` |
| 08 | `math-u08-l02` | Compare Decimals with Benchmarks | `['4.NR.2.2']` |
| 08 | `math-u08-l03` | Add and Subtract Tenths and Hundredths | `['4.PAFR.2.2']` |
| 09 | `math-u09-l01` | Money Collections and Purchases | `['4.MGSR.2.1']` |
| 09 | `math-u09-l02` | Elapsed, Start, and End Time | `['4.MGSR.2.2']` |
| 09 | `math-u09-l03` | Measure to the Nearest Quarter Inch | `['4.MGSR.2.3']` |
| 09 | `math-u09-l04` | Measure Customary and Metric Weight | `['4.MGSR.2.4']` |
| 09 | `math-u09-l05` | Convert Larger Customary Units to Smaller Units | `['4.MGSR.2.5']` |
| 10 | `math-u10-l01` | Rectangle Perimeter and Unknown Sides | `['4.MGSR.1.1']` |
| 10 | `math-u10-l02` | Rectangle Area in Square Units | `['4.MGSR.1.2']` |
| 11 | `math-u11-l01` | Classify Triangles by Sides and Angles | `['4.MGSR.3.1']` |
| 11 | `math-u11-l02` | The Quadrilateral Hierarchy | `['4.MGSR.3.2']` |
| 12 | `math-u12-l01` | Collect and Organize Data | `['4.DPSR.1.1']` |
| 12 | `math-u12-l02` | Solve Problems with Graphs and Tables | `['4.DPSR.1.2']` |
| 12 | `math-u12-l03` | Certain, Possible, and Impossible | `['4.DPSR.2.1']` |

### Protected Unit 1 preservation gate

Run before and after every Math wave:

```bash
git diff --exit-code -- src/content/math/u01.ts src/content/content-validation.test.ts src/content/schema.test.ts src/widgets/math/widgets.test.tsx
```

Expected: no diff in the accepted source/tests. Master integration may later change `src/content/content-validation.test.ts`; unit authors may not.

## Unit 2 complete literal production/test exemplar

This is the one unit in this draft blueprint whose learner-facing prose, answer keys, distractors, sort order, source module, and direct test are fully literal. It proves the required level of specificity, but execution starts only after this material is copied into the tracked C1a wave plan named under “Promotion status.”

**Files:**

- Create: `/Users/eherbert/cram-all/src/content/math/u02.ts`
- Create: `/Users/eherbert/cram-all/src/content/math/u02.test.ts`

**Interfaces:**

- Consumes from `/Users/eherbert/cram-all/src/content/schema.ts`: `Lesson`, `LessonSchema`, and `validateLesson`.
- Produces from `/Users/eherbert/cram-all/src/content/math/u02.ts`: `export const unit02Lessons: Lesson[]` with retained literal inference through `satisfies Lesson[]`.
- Master Plan C alone imports `unit02Lessons` into `/Users/eherbert/cram-all/src/content/math/index.ts`.

**Exact cards and question mappings:**

- `math-u02-l01`: c1 “Choose an Addition or Subtraction Strategy” / `add-subtract-strategy`; c2 “Regroup by Place Value” / `regrouping`; c3 “Justify and Check the Result” / `justify-check`. Mapping: q01 MC `add-subtract-strategy` -> c1; q02 MC `add-subtract-strategy` -> c1; q03 FB `add-subtract-strategy` -> c1; q04 MC `add-subtract-strategy` -> c1; q05 MC `regrouping` -> c2; q06 FB `regrouping` -> c2; q07 TF `regrouping` -> c2; q08 SORT `regrouping` -> c2; q09 MC `justify-check` -> c3; q10 FB `justify-check` -> c3; q11 TF `justify-check` -> c3; q12 MC `justify-check` -> c3; q13 MC `justify-check` -> c3.
- `math-u02-l02`: c1 “Choose the Place to Round” / `rounding-choice`; c2 “Write an Estimate Equation” / `estimate-equation`; c3 “Judge Whether an Answer Is Reasonable” / `reasonableness`. Mapping: q01 MC `rounding-choice` -> c1; q02 FB `rounding-choice` -> c1; q03 MC `rounding-choice` -> c1; q04 TF `rounding-choice` -> c1; q05 MC `estimate-equation` -> c2; q06 FB `estimate-equation` -> c2; q07 MC `estimate-equation` -> c2; q08 SORT `estimate-equation` -> c2; q09 MC `reasonableness` -> c3; q10 TF `reasonableness` -> c3; q11 MC `reasonableness` -> c3; q12 FB `reasonableness` -> c3; q13 MC `reasonableness` -> c3.

**Standard bounds:** `math-u02-l01` computes and justifies whole-number sums/differences no greater than 100,000. `math-u02-l02` estimates multi-digit sums, differences, products, and quotients by rounding/place value, writes an estimate equation, and uses the estimate to judge a real-world answer. No Unit 2 card has a `widget` property because the final Plan B experiments do not directly perform the required complete computations.

- [ ] **Step 1: Write the failing direct test**

```ts
// /Users/eherbert/cram-all/src/content/math/u02.test.ts
import { expect, test } from 'vitest';
import { LessonSchema, validateLesson } from '../schema';
import { unit02Lessons } from './u02';

const expected = [
  { id: 'math-u02-l01', title: 'Add and Subtract to 100,000', indicatorCodes: ['4.PAFR.1.1'] },
  { id: 'math-u02-l02', title: 'Estimate and Judge Reasonableness', indicatorCodes: ['4.NR.1.2'] },
] as const;

const expectedCards = {
  'math-u02-l01': [
    ['Choose an Addition or Subtraction Strategy', 'add-subtract-strategy'],
    ['Regroup by Place Value', 'regrouping'],
    ['Justify and Check the Result', 'justify-check'],
  ],
  'math-u02-l02': [
    ['Choose the Place to Round', 'rounding-choice'],
    ['Write an Estimate Equation', 'estimate-equation'],
    ['Judge Whether an Answer Is Reasonable', 'reasonableness'],
  ],
} as const;

test('u02 is the exact validated two-lesson unit', () => {
  expect(unit02Lessons.map(({ id, title, indicatorCodes }) => ({ id, title, indicatorCodes }))).toEqual(expected);
  for (const lesson of unit02Lessons) {
    expect(LessonSchema.safeParse(lesson).success).toBe(true);
    expect(validateLesson(lesson)).toHaveLength(0);
    expect(lesson.unitId).toBe('math-u02');
    expect(lesson.learnCards).toHaveLength(3);
    expect(lesson.quiz.passThreshold).toBe(8);
    expect(lesson.quiz.pool).toHaveLength(13);
    expect(lesson.quiz.pool.map((question) => question.id)).toEqual(
      Array.from({ length: 13 }, (_, index) => `${lesson.id}-q${String(index + 1).padStart(2, '0')}`),
    );
    expect(lesson.learnCards.every((card) => card.widget === undefined)).toBe(true);

    const cardSpecs = expectedCards[lesson.id as keyof typeof expectedCards];
    expect(lesson.learnCards.map((card, index) => [
      card.title,
      lesson.quiz.pool.find((question) => question.reviewCardId === `${lesson.id}-c${index + 1}`)?.conceptTag,
    ])).toEqual(cardSpecs);
    for (const question of lesson.quiz.pool) {
      const cardIndex = Number(question.reviewCardId.at(-1)) - 1;
      expect(question.conceptTag).toBe(cardSpecs[cardIndex]?.[1]);
    }
  }
});
```

- [ ] **Step 2: Run the red gate**

Run: `npm test -- src/content/math/u02.test.ts`

Expected: FAIL with `Failed to resolve import "./u02"`.

- [ ] **Step 3: Write the complete source module**

```ts
// /Users/eherbert/cram-all/src/content/math/u02.ts
import type { Lesson } from '../schema';

export const unit02Lessons = [
  {
    id: 'math-u02-l01',
    unitId: 'math-u02',
    title: 'Add and Subtract to 100,000',
    indicatorCodes: ['4.PAFR.1.1'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Two acorn teams counted huge piles. How can we combine or compare their totals accurately?' },
      { speaker: 'kid', text: 'We can choose addition or subtraction and keep each digit in its place.' },
      { speaker: 'nutty', pose: 'talk', text: 'When a place has too many or too few, regrouping keeps the value equal.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Then an estimate or inverse operation can prove our answer makes sense!' },
    ],
    learnCards: [
      {
        id: 'math-u02-l01-c1',
        title: 'Choose an Addition or Subtraction Strategy',
        blocks: [
          { kind: 'text', text: 'Add when amounts join or a total is needed. Subtract when an amount is removed or a difference is needed.' },
          { kind: 'example', text: 'To find how many more 52,400 is than 18,250, use 52,400 - 18,250.' },
          { kind: 'tip', text: 'Line up ones under ones, tens under tens, and every other matching place.' },
        ],
      },
      {
        id: 'math-u02-l01-c2',
        title: 'Regroup by Place Value',
        blocks: [
          { kind: 'text', text: 'Ten units in one place can be regrouped as one unit in the place to its left without changing the number.' },
          { kind: 'example', text: 'In addition, 8 ones + 7 ones = 15 ones, so write 5 ones and regroup 1 ten.' },
          { kind: 'tip', text: 'In subtraction, regroup one unit from the left as ten units in the current place.' },
        ],
      },
      {
        id: 'math-u02-l01-c3',
        title: 'Justify and Check the Result',
        blocks: [
          { kind: 'text', text: 'Explain why the chosen operation fits the situation and why each regroup keeps the same value.' },
          { kind: 'example', text: '37,425 + 27,395 = 64,820 checks that 64,820 - 27,395 = 37,425.' },
          { kind: 'tip', text: 'Use addition to check subtraction, subtraction to check addition, and an estimate to catch a misplaced digit.' },
        ],
      },
    ],
    workedExample: {
      title: 'Find and justify 52,004 - 18,769',
      steps: [
        'Line up the place values because the question asks how many remain.',
        'Regroup across the zeros, then subtract from right to left to get 33,235.',
        'Check with the inverse operation: 33,235 + 18,769 = 52,004.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        {
          id: 'math-u02-l01-q01', type: 'multiple-choice', conceptTag: 'add-subtract-strategy', reviewCardId: 'math-u02-l01-c1',
          prompt: 'What is 23,456 + 12,300?',
          choices: [{ id: 'a', text: '35,756' }, { id: 'b', text: '34,756' }, { id: 'c', text: '35,656' }, { id: 'd', text: '11,156' }], correctChoiceId: 'a',
          explanation: 'Adding each aligned place gives 35,756.',
        },
        {
          id: 'math-u02-l01-q02', type: 'multiple-choice', conceptTag: 'add-subtract-strategy', reviewCardId: 'math-u02-l01-c1',
          prompt: 'What is 80,000 - 26,745?',
          choices: [{ id: 'a', text: '53,255' }, { id: 'b', text: '54,255' }, { id: 'c', text: '63,255' }, { id: 'd', text: '53,345' }], correctChoiceId: 'a',
          explanation: 'Subtracting 26,745 from 80,000 leaves 53,255.',
        },
        {
          id: 'math-u02-l01-q03', type: 'fill-blank', conceptTag: 'add-subtract-strategy', reviewCardId: 'math-u02-l01-c1',
          prompt: 'Complete the equation: 14,208 + 9,516 = ___.', acceptedAnswers: ['23,724', '23724'],
          explanation: 'The aligned sum is 23,724.',
        },
        {
          id: 'math-u02-l01-q04', type: 'multiple-choice', conceptTag: 'add-subtract-strategy', reviewCardId: 'math-u02-l01-c1',
          prompt: 'A park printed 45,000 tickets and sold 27,650. Which equation finds how many tickets remain?',
          choices: [{ id: 'a', text: '45,000 - 27,650' }, { id: 'b', text: '45,000 + 27,650' }, { id: 'c', text: '27,650 - 45,000' }, { id: 'd', text: '45,000 - 17,350' }], correctChoiceId: 'a',
          explanation: 'Remaining means subtract the sold tickets from the starting amount.',
        },
        {
          id: 'math-u02-l01-q05', type: 'multiple-choice', conceptTag: 'regrouping', reviewCardId: 'math-u02-l01-c2',
          prompt: 'When 7 ones and 8 ones are added, what should be recorded?',
          choices: [{ id: 'a', text: '5 ones and 1 regrouped ten' }, { id: 'b', text: '15 tens' }, { id: 'c', text: '5 tens and 1 one' }, { id: 'd', text: '15 hundreds' }], correctChoiceId: 'a',
          explanation: 'Fifteen ones equal 5 ones and 1 ten.',
        },
        {
          id: 'math-u02-l01-q06', type: 'fill-blank', conceptTag: 'regrouping', reviewCardId: 'math-u02-l01-c2',
          prompt: 'Complete the subtraction: 52,004 - 18,769 = ___.', acceptedAnswers: ['33,235', '33235'],
          explanation: 'Regrouping across the zeros gives a difference of 33,235.',
        },
        {
          id: 'math-u02-l01-q07', type: 'true-false', conceptTag: 'regrouping', reviewCardId: 'math-u02-l01-c2',
          prompt: 'True or false: 47,000 - 18,956 = 28,044.',
          choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true',
          explanation: 'Regrouping and subtracting gives 28,044.',
        },
        {
          id: 'math-u02-l01-q08', type: 'sort', conceptTag: 'regrouping', reviewCardId: 'math-u02-l01-c2',
          prompt: 'Order the place-value steps for 27,468 + 5,739 from first to last.',
          items: [{ id: 'ones', text: 'Add ones and regroup 1 ten.' }, { id: 'tens', text: 'Add tens and regroup 1 hundred.' }, { id: 'hundreds', text: 'Add hundreds and regroup 1 thousand.' }, { id: 'thousands', text: 'Add thousands to finish 33,207.' }],
          correctOrder: ['ones', 'tens', 'hundreds', 'thousands'],
          explanation: 'The standard written strategy works from ones toward the greatest place.',
        },
        {
          id: 'math-u02-l01-q09', type: 'multiple-choice', conceptTag: 'justify-check', reviewCardId: 'math-u02-l01-c3',
          prompt: 'Which equation checks 64,820 - 27,395 = 37,425?',
          choices: [{ id: 'a', text: '37,425 + 27,395 = 64,820' }, { id: 'b', text: '64,820 + 27,395 = 37,425' }, { id: 'c', text: '37,425 - 27,395 = 64,820' }, { id: 'd', text: '64,820 - 37,425 = 27,305' }], correctChoiceId: 'a',
          explanation: 'Adding the difference and the subtracted amount must return the starting amount.',
        },
        {
          id: 'math-u02-l01-q10', type: 'fill-blank', conceptTag: 'justify-check', reviewCardId: 'math-u02-l01-c3',
          prompt: 'Complete the equation: 56,700 - 19,850 = ___.', acceptedAnswers: ['36,850', '36850'],
          explanation: 'The exact difference is 36,850.',
        },
        {
          id: 'math-u02-l01-q11', type: 'true-false', conceptTag: 'justify-check', reviewCardId: 'math-u02-l01-c3',
          prompt: 'True or false: 73,583 is a reasonable sum for 48,675 + 24,908 because 50,000 + 25,000 is about 75,000.',
          choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true',
          explanation: 'The exact sum is close to the 75,000 estimate.',
        },
        {
          id: 'math-u02-l01-q12', type: 'multiple-choice', conceptTag: 'justify-check', reviewCardId: 'math-u02-l01-c3',
          prompt: 'Which statement best justifies 90,000 - 34,678 = 55,322?',
          choices: [{ id: 'a', text: '55,322 + 34,678 equals 90,000.' }, { id: 'b', text: '55,322 is greater than 90,000.' }, { id: 'c', text: '34,678 + 90,000 equals 55,322.' }, { id: 'd', text: 'No check is possible.' }], correctChoiceId: 'a',
          explanation: 'The inverse addition equation proves the difference.',
        },
        {
          id: 'math-u02-l01-q13', type: 'multiple-choice', conceptTag: 'justify-check', reviewCardId: 'math-u02-l01-c3',
          prompt: 'Two trail counters recorded 18,745 and 26,980 visitors. How many visitors did they record altogether?',
          choices: [{ id: 'a', text: '45,725' }, { id: 'b', text: '44,725' }, { id: 'c', text: '8,235' }, { id: 'd', text: '45,625' }], correctChoiceId: 'a',
          explanation: 'Altogether signals addition, and the sum is 45,725.',
        },
      ],
    },
  },
  {
    id: 'math-u02-l02',
    unitId: 'math-u02',
    title: 'Estimate and Judge Reasonableness',
    indicatorCodes: ['4.NR.1.2'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'A calculator says my acorn order costs 319,842 shells. That sounds suspicious!' },
      { speaker: 'kid', text: 'An estimate can tell us what size answer to expect.' },
      { speaker: 'nutty', pose: 'talk', text: 'We will round useful place values and write an estimate equation.' },
      { speaker: 'nutty', pose: 'cheer', text: 'If the exact answer is far from the estimate, we know to check again.' },
    ],
    learnCards: [
      {
        id: 'math-u02-l02-c1',
        title: 'Choose the Place to Round',
        blocks: [
          { kind: 'text', text: 'Round to a place that makes the numbers friendly while keeping enough information for the decision.' },
          { kind: 'example', text: '47,382 rounds to 47,000 to the nearest thousand and 50,000 to the nearest ten thousand.' },
          { kind: 'tip', text: 'Look one place to the right: 5 or more rounds up; 4 or less keeps the rounding digit.' },
        ],
      },
      {
        id: 'math-u02-l02-c2',
        title: 'Write an Estimate Equation',
        blocks: [
          { kind: 'text', text: 'Write the rounded numbers, operation symbol, and estimated result as a complete equation.' },
          { kind: 'example', text: '28,742 + 19,615 is about 29,000 + 20,000 = 49,000.' },
          { kind: 'tip', text: 'For multiplication or division, choose compatible numbers that are easy to compute mentally.' },
        ],
      },
      {
        id: 'math-u02-l02-c3',
        title: 'Judge Whether an Answer Is Reasonable',
        blocks: [
          { kind: 'text', text: 'A reasonable exact answer should be close to the estimate and have the expected size.' },
          { kind: 'example', text: '39,816 + 20,177 is 59,993, which is close to 40,000 + 20,000 = 60,000.' },
          { kind: 'tip', text: 'An estimate is a check, not a replacement for the exact answer when the situation asks for one.' },
        ],
      },
    ],
    workedExample: {
      title: 'Check a reported difference',
      steps: [
        'Round 71,205 to 71,000 and 29,711 to 30,000.',
        'Write the estimate equation: 71,000 - 30,000 = 41,000.',
        'A reported answer of 31,494 is about 10,000 too small, so recompute; the exact difference is 41,494.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        {
          id: 'math-u02-l02-q01', type: 'multiple-choice', conceptTag: 'rounding-choice', reviewCardId: 'math-u02-l02-c1',
          prompt: 'What is 47,382 rounded to the nearest thousand?',
          choices: [{ id: 'a', text: '47,000' }, { id: 'b', text: '48,000' }, { id: 'c', text: '50,000' }, { id: 'd', text: '47,400' }], correctChoiceId: 'a',
          explanation: 'The hundreds digit is 3, so the thousands digit stays 7.',
        },
        {
          id: 'math-u02-l02-q02', type: 'fill-blank', conceptTag: 'rounding-choice', reviewCardId: 'math-u02-l02-c1',
          prompt: 'Round 68,741 to the nearest ten thousand.', acceptedAnswers: ['70,000', '70000'],
          explanation: 'The thousands digit is 8, so 68,741 rounds up to 70,000.',
        },
        {
          id: 'math-u02-l02-q03', type: 'multiple-choice', conceptTag: 'rounding-choice', reviewCardId: 'math-u02-l02-c1',
          prompt: 'Which compatible numbers give a useful estimate for 398 x 21?',
          choices: [{ id: 'a', text: '400 x 20' }, { id: 'b', text: '300 x 10' }, { id: 'c', text: '500 x 30' }, { id: 'd', text: '398 x 1' }], correctChoiceId: 'a',
          explanation: '400 and 20 stay close to the factors and are easy to multiply.',
        },
        {
          id: 'math-u02-l02-q04', type: 'true-false', conceptTag: 'rounding-choice', reviewCardId: 'math-u02-l02-c1',
          prompt: 'True or false: 6,400 divided by 8 is a useful compatible-number estimate for 6,248 divided by 8.',
          choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true',
          explanation: '6,400 is close to 6,248 and divides evenly by 8.',
        },
        {
          id: 'math-u02-l02-q05', type: 'multiple-choice', conceptTag: 'estimate-equation', reviewCardId: 'math-u02-l02-c2',
          prompt: 'Which nearest-thousand estimate equation fits 28,742 + 19,615?',
          choices: [{ id: 'a', text: '29,000 + 20,000 = 49,000' }, { id: 'b', text: '28,000 + 19,000 = 47,000' }, { id: 'c', text: '30,000 - 20,000 = 10,000' }, { id: 'd', text: '29,000 x 20,000 = 580,000,000' }], correctChoiceId: 'a',
          explanation: 'Each addend rounds to the nearest thousand before adding.',
        },
        {
          id: 'math-u02-l02-q06', type: 'fill-blank', conceptTag: 'estimate-equation', reviewCardId: 'math-u02-l02-c2',
          prompt: 'Complete the nearest-thousand estimate: 83,126 - 27,904 is about 83,000 - 28,000 = ___.', acceptedAnswers: ['55,000', '55000'],
          explanation: 'Subtracting the rounded numbers gives 55,000.',
        },
        {
          id: 'math-u02-l02-q07', type: 'multiple-choice', conceptTag: 'estimate-equation', reviewCardId: 'math-u02-l02-c2',
          prompt: 'Which estimate equation is useful for 4,760 divided by 6?',
          choices: [{ id: 'a', text: '4,800 divided by 6 = 800' }, { id: 'b', text: '4,000 divided by 6 = 4' }, { id: 'c', text: '4,760 x 6 = 28,560' }, { id: 'd', text: '5,000 + 6 = 5,006' }], correctChoiceId: 'a',
          explanation: '4,800 is nearby and is compatible with division by 6.',
        },
        {
          id: 'math-u02-l02-q08', type: 'sort', conceptTag: 'estimate-equation', reviewCardId: 'math-u02-l02-c2',
          prompt: 'Order the steps for making and using an estimate.',
          items: [{ id: 'choose', text: 'Choose a useful rounding place or compatible numbers.' }, { id: 'round', text: 'Round the numbers.' }, { id: 'equation', text: 'Write and solve the estimate equation.' }, { id: 'compare', text: 'Compare the estimate with the reported answer.' }],
          correctOrder: ['choose', 'round', 'equation', 'compare'],
          explanation: 'Choose, round, write the equation, and then compare.',
        },
        {
          id: 'math-u02-l02-q09', type: 'multiple-choice', conceptTag: 'reasonableness', reviewCardId: 'math-u02-l02-c3',
          prompt: 'Is 59,993 reasonable for 39,816 + 20,177?',
          choices: [{ id: 'a', text: 'Yes, because 40,000 + 20,000 is about 60,000.' }, { id: 'b', text: 'No, because the sum should be about 6,000.' }, { id: 'c', text: 'No, because addition always makes 100,000.' }, { id: 'd', text: 'Yes, because 40,000 - 20,000 is 20,000.' }], correctChoiceId: 'a',
          explanation: 'The exact sum is only 7 away from the 60,000 estimate.',
        },
        {
          id: 'math-u02-l02-q10', type: 'true-false', conceptTag: 'reasonableness', reviewCardId: 'math-u02-l02-c3',
          prompt: 'True or false: 31,494 is reasonable for 71,205 - 29,711.',
          choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'false',
          explanation: 'The estimate is about 41,000, so 31,494 is too small.',
        },
        {
          id: 'math-u02-l02-q11', type: 'multiple-choice', conceptTag: 'reasonableness', reviewCardId: 'math-u02-l02-c3',
          prompt: 'A learner reports 247 x 32 = 7,904. Which estimate best checks the answer?',
          choices: [{ id: 'a', text: '250 x 30 = 7,500, so 7,904 is reasonable.' }, { id: 'b', text: '200 x 3 = 600, so 7,904 is unreasonable.' }, { id: 'c', text: '250 + 30 = 280, so 7,904 is reasonable.' }, { id: 'd', text: '300 x 40 = 120, so 7,904 is unreasonable.' }], correctChoiceId: 'a',
          explanation: '7,904 is close to the useful estimate of 7,500.',
        },
        {
          id: 'math-u02-l02-q12', type: 'fill-blank', conceptTag: 'reasonableness', reviewCardId: 'math-u02-l02-c3',
          prompt: 'Use 8,100 divided by 9 to estimate 8,316 divided by 9. The estimated quotient is ___.', acceptedAnswers: ['900'],
          explanation: '8,100 divided by 9 equals 900.',
        },
        {
          id: 'math-u02-l02-q13', type: 'multiple-choice', conceptTag: 'reasonableness', reviewCardId: 'math-u02-l02-c3',
          prompt: 'A library had 14,785 books and received 8,940 more. Is a reported total of 32,725 reasonable?',
          choices: [{ id: 'a', text: 'No; 15,000 + 9,000 is about 24,000.' }, { id: 'b', text: 'Yes; 15,000 + 9,000 is about 33,000.' }, { id: 'c', text: 'Yes; totals must always be over 30,000.' }, { id: 'd', text: 'No; addition should make a smaller number.' }], correctChoiceId: 'a',
          explanation: 'The rounded total is about 24,000, so 32,725 is not reasonable.',
        },
      ],
    },
  },
] satisfies Lesson[];
```

- [ ] **Step 4: Run the green and permanent gates**

Run:

```bash
npm test -- src/content/math/u02.test.ts src/content/schema.test.ts src/content/content-validation.test.ts
npx tsc -b --pretty false
npm run build
```

Expected: PASS. Manually recompute all 26 answers, confirm every distractor is distinct after visible-text normalization, and verify Unit 2 has no out-of-range value or ungrounded operation.

- [ ] **Step 5: Commit only the unit-owned files**

```bash
git add src/content/math/u02.ts src/content/math/u02.test.ts
test "$(git diff --cached --name-only | sort)" = $'src/content/math/u02.test.ts\nsrc/content/math/u02.ts'
git commit -m "feat(content): add math unit 02 lessons"
```

## Locked author briefs for Units 3–12

The following briefs freeze allocation, card names, tags, question-type/card routing, standards bounds, exact widget literals, file ownership, gates, and commits. They intentionally do not pretend that learner-facing question prose and answer data exist when they do not. See “Promotion status” before executing any brief.

### Unit 3 author brief

**Files:** Create only `/Users/eherbert/cram-all/src/content/math/u03.ts` and `/Users/eherbert/cram-all/src/content/math/u03.test.ts`.

**Interface:** The module imports `Lesson` from `../schema` and produces the named `unit03Lessons` export using `satisfies Lesson[]`. The direct test imports `LessonSchema`, `WidgetRefSchema`, and `validateLesson` from `../schema`, imports `unit03Lessons` from `./u03`, and asserts the exact two rows, cards, mappings, widget literals, 13 questions, threshold 8, and zero validation errors.

**Exact lesson/card allocation:**

- `math-u03-l01` “Factor Pairs, Primes, and Composites” / `['4.PAFR.3.1']`: c1 “Build Every Factor Pair” / `factor-pairs`; c2 “Tell Prime from Composite” / `prime-composite`; c3 “Classify a Number and Justify” / `number-classification`.
- `math-u03-l02` “Rules and Function-Table Patterns” / `['4.PAFR.3.2']`: c1 “Find the Input-Output Rule” / `input-output-rule`; c2 “Complete a Function Table” / `function-table`; c3 “Apply a Pattern to a Situation” / `real-world-pattern`.

**Exact question routing:**

- `math-u03-l01`: q01 MC `factor-pairs` -> c1; q02 FB `factor-pairs` -> c1; q03 SORT `factor-pairs` -> c1; q04 MC `factor-pairs` -> c1; q05 MC `prime-composite` -> c2; q06 TF `prime-composite` -> c2; q07 FB `prime-composite` -> c2; q08 MC `prime-composite` -> c2; q09 MC `number-classification` -> c3; q10 FB `number-classification` -> c3; q11 TF `number-classification` -> c3; q12 MC `number-classification` -> c3; q13 MC `number-classification` -> c3.
- `math-u03-l02`: q01 MC `input-output-rule` -> c1; q02 FB `input-output-rule` -> c1; q03 TF `input-output-rule` -> c1; q04 MC `input-output-rule` -> c1; q05 FB `function-table` -> c2; q06 MC `function-table` -> c2; q07 FB `function-table` -> c2; q08 MC `function-table` -> c2; q09 MC `real-world-pattern` -> c3; q10 FB `real-world-pattern` -> c3; q11 TF `real-world-pattern` -> c3; q12 MC `real-world-pattern` -> c3; q13 FB `real-world-pattern` -> c3.

**Exact widgets:** c1 of `math-u03-l01` uses `{ type: 'array-builder', config: { rows: 4, columns: 6, targetProduct: 24, editable: true } }`. `math-u03-l02` has no `widget` property because an array builder does not model a function-table rule.

**Standard bounds:** Find every factor pair only for whole numbers 1–50 and determine prime/composite. Pattern work states one numerical rule, extends the pattern, uses a function table, and includes a real-world interpretation.

**Required gates and commit:** Red: `npm test -- src/content/math/u03.test.ts` -> unresolved `./u03`. Green: `npm test -- src/content/math/u03.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false && npm run build` -> PASS. Commit:

```bash
git add src/content/math/u03.ts src/content/math/u03.test.ts
test "$(git diff --cached --name-only | sort)" = $'src/content/math/u03.test.ts\nsrc/content/math/u03.ts'
git commit -m "feat(content): add math unit 03 lessons"
```

### Unit 4 author brief

**Files:** Create only `/Users/eherbert/cram-all/src/content/math/u04.ts` and `/Users/eherbert/cram-all/src/content/math/u04.test.ts`.

**Interface:** The module imports `Lesson` from `../schema` and produces the named `unit04Lessons` export using `satisfies Lesson[]`. The direct test imports `LessonSchema`, `WidgetRefSchema`, and `validateLesson` from `../schema`, imports `unit04Lessons` from `./u04`, and asserts the exact three rows, cards, mappings, widgets, 13 questions per lesson, threshold 8, and zero validation errors.

**Exact lesson/card allocation:**

- `math-u04-l01` “Multiply by Multiples of 10 and 100” / `['4.PAFR.1.2']`: c1 “See the Place-Value Shift” / `place-value-shifts`; c2 “Use Properties of Operations” / `operation-properties`; c3 “Apply a Multiple-of-Ten Product” / `product-application`.
- `math-u04-l02` “Decompose to Multiply Multi-Digit Numbers” / `['4.PAFR.1.3']`: c1 “Make Partial Products” / `partial-products`; c2 “Use an Area Model” / `area-model`; c3 “Check a Decomposition” / `decomposition-check`.
- `math-u04-l03` “Multiplicative Comparisons and Unknowns” / `['4.PAFR.3.3']`: c1 “Read Comparison Language” / `comparison-language`; c2 “Write a Variable Equation” / `variable-equation`; c3 “Solve a Comparison Problem” / `comparison-problem`.

**Exact question routing:**

- `math-u04-l01`: q01 MC `place-value-shifts` -> c1; q02 FB `place-value-shifts` -> c1; q03 TF `place-value-shifts` -> c1; q04 MC `place-value-shifts` -> c1; q05 MC `operation-properties` -> c2; q06 FB `operation-properties` -> c2; q07 MC `operation-properties` -> c2; q08 SORT `operation-properties` -> c2; q09 MC `product-application` -> c3; q10 FB `product-application` -> c3; q11 TF `product-application` -> c3; q12 MC `product-application` -> c3; q13 MC `product-application` -> c3.
- `math-u04-l02`: q01 MC `partial-products` -> c1; q02 FB `partial-products` -> c1; q03 MC `partial-products` -> c1; q04 TF `partial-products` -> c1; q05 MC `area-model` -> c2; q06 FB `area-model` -> c2; q07 MC `area-model` -> c2; q08 SORT `area-model` -> c2; q09 MC `decomposition-check` -> c3; q10 FB `decomposition-check` -> c3; q11 TF `decomposition-check` -> c3; q12 MC `decomposition-check` -> c3; q13 MC `decomposition-check` -> c3.
- `math-u04-l03`: q01 MC `comparison-language` -> c1; q02 FB `comparison-language` -> c1; q03 TF `comparison-language` -> c1; q04 MC `comparison-language` -> c1; q05 MC `variable-equation` -> c2; q06 FB `variable-equation` -> c2; q07 MC `variable-equation` -> c2; q08 TF `variable-equation` -> c2; q09 MC `comparison-problem` -> c3; q10 FB `comparison-problem` -> c3; q11 MC `comparison-problem` -> c3; q12 TF `comparison-problem` -> c3; q13 MC `comparison-problem` -> c3.

**Exact widgets:** `math-u04-l01` c1 uses `{ type: 'area-model-multiplier', config: { a: 30, b: 4, splitA: [30], splitB: [4], targetProduct: 120 } }`; `math-u04-l02` c2 uses `{ type: 'area-model-multiplier', config: { a: 23, b: 14, splitA: [20, 3], splitB: [10, 4], targetProduct: 322 } }`; `math-u04-l03` c1 uses `{ type: 'array-builder', config: { rows: 2, columns: 6, targetProduct: 12, editable: true } }`.

**Standard bounds:** `4.PAFR.1.2` is one digit times a multiple of 10 from 10–90 or 100 from 100–900. `4.PAFR.1.3` is at most four digits by one digit or two 2-digit numbers, using digit-value decomposition. `4.PAFR.3.3` uses a real-world multiplicative comparison and a variable in the representing equation.

**Required gates and commit:** Red: `npm test -- src/content/math/u04.test.ts` -> unresolved `./u04`. Green: `npm test -- src/content/math/u04.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false && npm run build` -> PASS. Commit:

```bash
git add src/content/math/u04.ts src/content/math/u04.test.ts
test "$(git diff --cached --name-only | sort)" = $'src/content/math/u04.test.ts\nsrc/content/math/u04.ts'
git commit -m "feat(content): add math unit 04 lessons"
```

### Unit 5 author brief

**Files:** Create only `/Users/eherbert/cram-all/src/content/math/u05.ts` and `/Users/eherbert/cram-all/src/content/math/u05.test.ts`.

**Interface:** The module imports `Lesson` from `../schema` and produces the named `unit05Lessons` export using `satisfies Lesson[]`. The direct test imports `LessonSchema`, `WidgetRefSchema`, and `validateLesson` from `../schema`, imports `unit05Lessons` from `./u05`, and asserts the exact two rows, cards, mappings, shown widget, 13 questions, threshold 8, and zero validation errors.

**Exact lesson/card allocation:**

- `math-u05-l01` “Divide up to Four Digits by One Digit, Including Remainders” / `['4.PAFR.1.4']`: c1 “Choose a Division Strategy” / `division-strategy`; c2 “Interpret a Remainder” / `remainder-meaning`; c3 “Justify and Check a Quotient” / `quotient-check`.
- `math-u05-l02` “Two-Step Equations with an Unknown” / `['4.PAFR.3.4']`: c1 “Plan the Two Steps” / `problem-plan`; c2 “Write an Equation with a Variable” / `two-step-equation`; c3 “Solve and Check the Answer” / `two-step-check`.

**Exact question routing:**

- `math-u05-l01`: q01 MC `division-strategy` -> c1; q02 FB `division-strategy` -> c1; q03 MC `division-strategy` -> c1; q04 TF `division-strategy` -> c1; q05 MC `remainder-meaning` -> c2; q06 FB `remainder-meaning` -> c2; q07 MC `remainder-meaning` -> c2; q08 TF `remainder-meaning` -> c2; q09 MC `quotient-check` -> c3; q10 FB `quotient-check` -> c3; q11 TF `quotient-check` -> c3; q12 MC `quotient-check` -> c3; q13 MC `quotient-check` -> c3.
- `math-u05-l02`: q01 MC `problem-plan` -> c1; q02 SORT `problem-plan` -> c1; q03 FB `problem-plan` -> c1; q04 MC `problem-plan` -> c1; q05 MC `two-step-equation` -> c2; q06 FB `two-step-equation` -> c2; q07 TF `two-step-equation` -> c2; q08 MC `two-step-equation` -> c2; q09 MC `two-step-check` -> c3; q10 FB `two-step-check` -> c3; q11 TF `two-step-check` -> c3; q12 MC `two-step-check` -> c3; q13 MC `two-step-check` -> c3.

**Exact widgets:** `math-u05-l01` c1 uses `{ type: 'array-builder', config: { rows: 4, columns: 6, targetProduct: 24, editable: true } }`. `math-u05-l02` has no `widget` property because no final Plan B widget models a general two-step four-operation equation.

**Standard bounds:** Division uses at most a four-digit dividend and one-digit divisor, both with and without remainders, and the calculation is justified. Two-step real-world situations may use all four operations but produce whole-number answers and place a variable in any position.

**Required gates and commit:** Red: `npm test -- src/content/math/u05.test.ts` -> unresolved `./u05`. Green: `npm test -- src/content/math/u05.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false && npm run build` -> PASS. Commit:

```bash
git add src/content/math/u05.ts src/content/math/u05.test.ts
test "$(git diff --cached --name-only | sort)" = $'src/content/math/u05.test.ts\nsrc/content/math/u05.ts'
git commit -m "feat(content): add math unit 05 lessons"
```

### Unit 6 author brief

**Files:** Create only `/Users/eherbert/cram-all/src/content/math/u06.ts` and `/Users/eherbert/cram-all/src/content/math/u06.test.ts`.

**Interface:** The module imports `Lesson` from `../schema` and produces the named `unit06Lessons` export using `satisfies Lesson[]`. The direct test imports `LessonSchema`, `WidgetRefSchema`, and `validateLesson` from `../schema`, imports `unit06Lessons` from `./u06`, and asserts the exact four rows, cards, mappings, shown widgets, 13 questions, threshold 8, and zero validation errors.

**Exact lesson/card allocation:**

- `math-u06-l01` “Equivalent Fractions and Models” / `['4.NR.2.3']`: c1 “Name Equal Parts” / `equal-parts`; c2 “Generate an Equivalent Fraction” / `equivalent-pattern`; c3 “Connect Equivalent Representations” / `equivalent-representations`.
- `math-u06-l02` “Compose and Decompose Like-Denominator Fractions” / `['4.NR.2.4']`: c1 “Compose Fraction Parts” / `compose-parts`; c2 “Decompose Fraction Parts” / `decompose-parts`; c3 “Represent a Mixed Quantity” / `mixed-composition`.
- `math-u06-l03` “Mixed Numbers and Fractions Greater Than One” / `['4.NR.2.5']`: c1 “Read a Fraction Greater Than One” / `greater-than-one`; c2 “Write an Equivalent Mixed Number” / `mixed-number`; c3 “Explain Why the Forms Are Equal” / `mixed-equivalence`.
- `math-u06-l04` “Compare Fractions and Mixed Numbers” / `['4.NR.2.6']`: c1 “Use Benchmark Fractions” / `benchmark-fractions`; c2 “Compare Unlike Denominators” / `unlike-denominators`; c3 “Choose and Justify a Comparison Symbol” / `fraction-comparison`.

**Exact question routing:**

- `math-u06-l01`: q01 MC `equal-parts` -> c1; q02 FB `equal-parts` -> c1; q03 TF `equal-parts` -> c1; q04 MC `equal-parts` -> c1; q05 MC `equivalent-pattern` -> c2; q06 FB `equivalent-pattern` -> c2; q07 TF `equivalent-pattern` -> c2; q08 MC `equivalent-pattern` -> c2; q09 MC `equivalent-representations` -> c3; q10 FB `equivalent-representations` -> c3; q11 TF `equivalent-representations` -> c3; q12 MC `equivalent-representations` -> c3; q13 MC `equivalent-representations` -> c3.
- `math-u06-l02`: q01 MC `compose-parts` -> c1; q02 FB `compose-parts` -> c1; q03 TF `compose-parts` -> c1; q04 MC `compose-parts` -> c1; q05 MC `decompose-parts` -> c2; q06 FB `decompose-parts` -> c2; q07 MC `decompose-parts` -> c2; q08 TF `decompose-parts` -> c2; q09 MC `mixed-composition` -> c3; q10 FB `mixed-composition` -> c3; q11 TF `mixed-composition` -> c3; q12 MC `mixed-composition` -> c3; q13 MC `mixed-composition` -> c3.
- `math-u06-l03`: q01 MC `greater-than-one` -> c1; q02 FB `greater-than-one` -> c1; q03 TF `greater-than-one` -> c1; q04 MC `greater-than-one` -> c1; q05 MC `mixed-number` -> c2; q06 FB `mixed-number` -> c2; q07 TF `mixed-number` -> c2; q08 MC `mixed-number` -> c2; q09 MC `mixed-equivalence` -> c3; q10 FB `mixed-equivalence` -> c3; q11 TF `mixed-equivalence` -> c3; q12 MC `mixed-equivalence` -> c3; q13 MC `mixed-equivalence` -> c3.
- `math-u06-l04`: q01 MC `benchmark-fractions` -> c1; q02 FB `benchmark-fractions` -> c1; q03 TF `benchmark-fractions` -> c1; q04 MC `benchmark-fractions` -> c1; q05 MC `unlike-denominators` -> c2; q06 FB `unlike-denominators` -> c2; q07 TF `unlike-denominators` -> c2; q08 MC `unlike-denominators` -> c2; q09 MC `fraction-comparison` -> c3; q10 SORT `fraction-comparison` -> c3; q11 TF `fraction-comparison` -> c3; q12 MC `fraction-comparison` -> c3; q13 FB `fraction-comparison` -> c3.

**Exact widgets:** `math-u06-l01` c2 uses `{ type: 'fraction-models', config: { mode: 'both', denominator: 4, numerator: 0, target: { numerator: 1, denominator: 2 }, allowEquivalent: true } }`. `math-u06-l04` c1 uses `{ type: 'number-line-compare', config: { min: 0, max: 2, a: 0.5, b: 1.5, step: 0.25, display: 'fraction', denominator: 4 } }`. `math-u06-l02` and `math-u06-l03` have no `widget` property because Plan B `fraction-models` forbids numerator greater than denominator and therefore cannot represent their required mixed/improper cases.

**Standard bounds:** Every lesson uses only denominators 2, 3, 4, 5, 6, 8, 10, 12, 20, 25, 50, and 100. Equivalence includes fractions greater than 1 using multiple representations; composition/decomposition uses the same denominator; mixed/improper conversion is explained both ways; comparisons use 0, 1/2, and 1 with `=`, `<`, or `>`.

**Required gates and commit:** Red: `npm test -- src/content/math/u06.test.ts` -> unresolved `./u06`. Green: `npm test -- src/content/math/u06.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false && npm run build` -> PASS. Commit:

```bash
git add src/content/math/u06.ts src/content/math/u06.test.ts
test "$(git diff --cached --name-only | sort)" = $'src/content/math/u06.test.ts\nsrc/content/math/u06.ts'
git commit -m "feat(content): add math unit 06 lessons"
```

### Unit 7 author brief

**Files:** Create only `/Users/eherbert/cram-all/src/content/math/u07.ts` and `/Users/eherbert/cram-all/src/content/math/u07.test.ts`.

**Interface:** The module imports `Lesson` from `../schema` and produces the named `unit07Lessons` export using `satisfies Lesson[]`. The direct test imports `LessonSchema`, `WidgetRefSchema`, and `validateLesson` from `../schema`, imports `unit07Lessons` from `./u07`, and asserts the exact three rows, cards, mappings, widgets, 13 questions, threshold 8, and zero validation errors.

**Exact lesson/card allocation:**

- `math-u07-l01` “Add and Subtract Like-Denominator Fractions” / `['4.PAFR.2.1']`: c1 “Model a Fraction Operation” / `fraction-operation-model`; c2 “Keep the Denominator” / `like-denominator`; c3 “Apply and Justify the Result” / `fraction-reasonableness`.
- `math-u07-l02` “Whole Number Times a Unit Fraction” / `['4.PAFR.2.3']`: c1 “See Equal Unit-Fraction Groups” / `unit-fraction-groups`; c2 “Compute the Product” / `unit-fraction-product`; c3 “Solve a Fraction Product Situation” / `fraction-product-situation`.
- `math-u07-l03` “Fractions as Equal-Sharing Division” / `['4.PAFR.2.4']`: c1 “Describe an Equal-Sharing Situation” / `sharing-situation`; c2 “Connect Numerator and Quantity” / `numerator-quantity`; c3 “Connect Denominator and Shares” / `denominator-shares`.

**Exact question routing:**

- `math-u07-l01`: q01 MC `like-denominator` -> c2; q02 FB `like-denominator` -> c2; q03 TF `like-denominator` -> c2; q04 MC `like-denominator` -> c2; q05 MC `fraction-operation-model` -> c1; q06 FB `fraction-operation-model` -> c1; q07 TF `fraction-operation-model` -> c1; q08 MC `fraction-operation-model` -> c1; q09 MC `fraction-reasonableness` -> c3; q10 FB `fraction-reasonableness` -> c3; q11 TF `fraction-reasonableness` -> c3; q12 MC `fraction-reasonableness` -> c3; q13 MC `fraction-reasonableness` -> c3.
- `math-u07-l02`: q01 MC `unit-fraction-groups` -> c1; q02 FB `unit-fraction-groups` -> c1; q03 TF `unit-fraction-groups` -> c1; q04 MC `unit-fraction-groups` -> c1; q05 MC `unit-fraction-product` -> c2; q06 FB `unit-fraction-product` -> c2; q07 TF `unit-fraction-product` -> c2; q08 MC `unit-fraction-product` -> c2; q09 MC `fraction-product-situation` -> c3; q10 FB `fraction-product-situation` -> c3; q11 TF `fraction-product-situation` -> c3; q12 MC `fraction-product-situation` -> c3; q13 MC `fraction-product-situation` -> c3.
- `math-u07-l03`: q01 MC `sharing-situation` -> c1; q02 FB `sharing-situation` -> c1; q03 TF `sharing-situation` -> c1; q04 MC `sharing-situation` -> c1; q05 MC `numerator-quantity` -> c2; q06 FB `numerator-quantity` -> c2; q07 TF `numerator-quantity` -> c2; q08 MC `numerator-quantity` -> c2; q09 MC `denominator-shares` -> c3; q10 FB `denominator-shares` -> c3; q11 TF `denominator-shares` -> c3; q12 MC `denominator-shares` -> c3; q13 MC `denominator-shares` -> c3.

**Exact widgets:** `math-u07-l01` c1 uses `{ type: 'fraction-models', config: { mode: 'bars', denominator: 8, numerator: 3, target: { numerator: 5, denominator: 8 }, allowEquivalent: false } }`; `math-u07-l02` c1 uses `{ type: 'fraction-models', config: { mode: 'bars', denominator: 4, numerator: 0, target: { numerator: 3, denominator: 4 }, allowEquivalent: false } }`; `math-u07-l03` c1 uses `{ type: 'fraction-models', config: { mode: 'circles', denominator: 6, numerator: 0, target: { numerator: 5, denominator: 6 }, allowEquivalent: false } }`.

**Standard bounds:** Addition/subtraction uses like denominators limited to 2, 3, 4, 5, 6, 8, 10, 12, 25, and 100 and justifies reasonableness. Whole-number × unit-fraction uses that same denominator set. Equal-sharing treats numerator as the quantity divided into the denominator's number of equal shares and includes real-world situations.

**Required gates and commit:** Red: `npm test -- src/content/math/u07.test.ts` -> unresolved `./u07`. Green: `npm test -- src/content/math/u07.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false && npm run build` -> PASS. Commit:

```bash
git add src/content/math/u07.ts src/content/math/u07.test.ts
test "$(git diff --cached --name-only | sort)" = $'src/content/math/u07.test.ts\nsrc/content/math/u07.ts'
git commit -m "feat(content): add math unit 07 lessons"
```

### Unit 8 author brief

**Files:** Create only `/Users/eherbert/cram-all/src/content/math/u08.ts` and `/Users/eherbert/cram-all/src/content/math/u08.test.ts`.

**Interface:** The module imports `Lesson` from `../schema` and produces the named `unit08Lessons` export using `satisfies Lesson[]`. The direct test imports `LessonSchema`, `WidgetRefSchema`, and `validateLesson` from `../schema`, imports `unit08Lessons` from `./u08`, and asserts the exact three rows, cards, mappings, widgets, 13 questions, threshold 8, and zero validation errors.

**Exact lesson/card allocation:**

- `math-u08-l01` “Tenths and Hundredths as Fractions and Decimals” / `['4.NR.2.1']`: c1 “Represent Tenths” / `tenths-representation`; c2 “Represent Hundredths” / `hundredths-representation`; c3 “Connect Fraction Words, Models, and Decimals” / `decimal-notation`.
- `math-u08-l02` “Compare Decimals with Benchmarks” / `['4.NR.2.2']`: c1 “Use 0, 0.5, and 1 as Benchmarks” / `decimal-benchmarks`; c2 “Read Area and Linear Models” / `decimal-models`; c3 “Choose and Justify a Comparison Symbol” / `decimal-comparison`.
- `math-u08-l03` “Add and Subtract Tenths and Hundredths” / `['4.PAFR.2.2']`: c1 “Connect Fraction and Decimal Equivalents” / `fraction-decimal-equivalence`; c2 “Add or Subtract Decimal Parts” / `decimal-operation`; c3 “Operate with Mixed Quantities” / `decimal-mixed-quantity`.

**Exact question routing:**

- `math-u08-l01`: q01 MC `tenths-representation` -> c1; q02 FB `tenths-representation` -> c1; q03 TF `tenths-representation` -> c1; q04 MC `tenths-representation` -> c1; q05 MC `hundredths-representation` -> c2; q06 FB `hundredths-representation` -> c2; q07 TF `hundredths-representation` -> c2; q08 MC `hundredths-representation` -> c2; q09 MC `decimal-notation` -> c3; q10 FB `decimal-notation` -> c3; q11 TF `decimal-notation` -> c3; q12 MC `decimal-notation` -> c3; q13 MC `decimal-notation` -> c3.
- `math-u08-l02`: q01 MC `decimal-benchmarks` -> c1; q02 FB `decimal-benchmarks` -> c1; q03 TF `decimal-benchmarks` -> c1; q04 MC `decimal-benchmarks` -> c1; q05 MC `decimal-models` -> c2; q06 FB `decimal-models` -> c2; q07 TF `decimal-models` -> c2; q08 MC `decimal-models` -> c2; q09 MC `decimal-comparison` -> c3; q10 SORT `decimal-comparison` -> c3; q11 TF `decimal-comparison` -> c3; q12 MC `decimal-comparison` -> c3; q13 FB `decimal-comparison` -> c3.
- `math-u08-l03`: q01 MC `fraction-decimal-equivalence` -> c1; q02 FB `fraction-decimal-equivalence` -> c1; q03 TF `fraction-decimal-equivalence` -> c1; q04 MC `fraction-decimal-equivalence` -> c1; q05 MC `decimal-operation` -> c2; q06 FB `decimal-operation` -> c2; q07 TF `decimal-operation` -> c2; q08 MC `decimal-operation` -> c2; q09 MC `decimal-mixed-quantity` -> c3; q10 FB `decimal-mixed-quantity` -> c3; q11 TF `decimal-mixed-quantity` -> c3; q12 MC `decimal-mixed-quantity` -> c3; q13 MC `decimal-mixed-quantity` -> c3.

**Exact widgets:** `math-u08-l01` c3 uses `{ type: 'number-line-compare', config: { min: 0, max: 1, a: 0.1, b: 0.35, step: 0.01, display: 'fraction', denominator: 100 } }`; `math-u08-l02` c1 uses `{ type: 'number-line-compare', config: { min: 0, max: 1, a: 0.48, b: 0.52, step: 0.01, display: 'number' } }`. `math-u08-l03` has no `widget` property because the final Math widgets do not perform decimal addition/subtraction with mixed quantities.

**Standard bounds:** Fraction representations use denominators 10 and 100. Decimal comparison stops at hundredths and explicitly uses 0, 0.5, and 1.0 plus concrete/area/linear reasoning and `=`, `<`, or `>`. Operations use fraction-decimal equivalence to add/subtract tenths and hundredths, including mixed numbers and fractions greater than 1.

**Required gates and commit:** Red: `npm test -- src/content/math/u08.test.ts` -> unresolved `./u08`. Green: `npm test -- src/content/math/u08.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false && npm run build` -> PASS. Commit:

```bash
git add src/content/math/u08.ts src/content/math/u08.test.ts
test "$(git diff --cached --name-only | sort)" = $'src/content/math/u08.test.ts\nsrc/content/math/u08.ts'
git commit -m "feat(content): add math unit 08 lessons"
```

### Unit 9 author brief

**Files:** Create only `/Users/eherbert/cram-all/src/content/math/u09.ts` and `/Users/eherbert/cram-all/src/content/math/u09.test.ts`.

**Interface:** The module imports `Lesson` from `../schema` and produces the named `unit09Lessons` export using `satisfies Lesson[]`. The direct test imports `LessonSchema`, `WidgetRefSchema`, and `validateLesson` from `../schema`, imports `unit09Lessons` from `./u09`, and asserts the exact five rows, cards, mappings, shown widgets, 13 questions, threshold 8, and zero validation errors.

**Exact lesson/card allocation:**

- `math-u09-l01` “Money Collections and Purchases” / `['4.MGSR.2.1']`: c1 “Find Coin and Bill Values” / `money-values`; c2 “Compare a Total with a Price” / `money-comparison`; c3 “Justify a Purchase Decision” / `purchase-decision`.
- `math-u09-l02` “Elapsed, Start, and End Time” / `['4.MGSR.2.2']`: c1 “Read Start and End Times” / `clock-times`; c2 “Find Elapsed Time” / `elapsed-time`; c3 “Find a Missing Start or End Time” / `missing-time`.
- `math-u09-l03` “Measure to the Nearest Quarter Inch” / `['4.MGSR.2.3']`: c1 “Read Quarter-Inch Marks” / `quarter-inch-marks`; c2 “Choose the Nearest Quarter Inch” / `nearest-quarter-inch`; c3 “Use a Quarter-Inch Measurement” / `measurement-application`.
- `math-u09-l04` “Measure Customary and Metric Weight” / `['4.MGSR.2.4']`: c1 “Name Customary and Metric Weight Units” / `weight-units`; c2 “Choose a Sensible Unit” / `weight-unit-choice`; c3 “Record the Nearest Whole Unit” / `whole-unit-weight`.
- `math-u09-l05` “Convert Larger Customary Units to Smaller Units” / `['4.MGSR.2.5']`: c1 “Use a Given Unit Equivalence” / `unit-equivalence`; c2 “Multiply from Larger to Smaller Units” / `larger-to-smaller`; c3 “Apply a Conversion in Context” / `conversion-application`.

**Exact question routing:**

- `math-u09-l01`: q01 MC `money-values` -> c1; q02 FB `money-values` -> c1; q03 TF `money-values` -> c1; q04 MC `money-values` -> c1; q05 MC `money-comparison` -> c2; q06 FB `money-comparison` -> c2; q07 TF `money-comparison` -> c2; q08 MC `money-comparison` -> c2; q09 MC `purchase-decision` -> c3; q10 FB `purchase-decision` -> c3; q11 TF `purchase-decision` -> c3; q12 MC `purchase-decision` -> c3; q13 MC `purchase-decision` -> c3.
- `math-u09-l02`: q01 MC `clock-times` -> c1; q02 FB `clock-times` -> c1; q03 TF `clock-times` -> c1; q04 MC `clock-times` -> c1; q05 MC `elapsed-time` -> c2; q06 FB `elapsed-time` -> c2; q07 TF `elapsed-time` -> c2; q08 SORT `elapsed-time` -> c2; q09 MC `missing-time` -> c3; q10 FB `missing-time` -> c3; q11 TF `missing-time` -> c3; q12 MC `missing-time` -> c3; q13 FB `missing-time` -> c3.
- `math-u09-l03`: q01 MC `quarter-inch-marks` -> c1; q02 FB `quarter-inch-marks` -> c1; q03 TF `quarter-inch-marks` -> c1; q04 SORT `quarter-inch-marks` -> c1; q05 MC `nearest-quarter-inch` -> c2; q06 FB `nearest-quarter-inch` -> c2; q07 TF `nearest-quarter-inch` -> c2; q08 MC `nearest-quarter-inch` -> c2; q09 MC `measurement-application` -> c3; q10 FB `measurement-application` -> c3; q11 TF `measurement-application` -> c3; q12 MC `measurement-application` -> c3; q13 MC `measurement-application` -> c3.
- `math-u09-l04`: q01 MC `weight-units` -> c1; q02 FB `weight-units` -> c1; q03 TF `weight-units` -> c1; q04 MC `weight-units` -> c1; q05 MC `weight-unit-choice` -> c2; q06 FB `weight-unit-choice` -> c2; q07 TF `weight-unit-choice` -> c2; q08 MC `weight-unit-choice` -> c2; q09 MC `whole-unit-weight` -> c3; q10 FB `whole-unit-weight` -> c3; q11 TF `whole-unit-weight` -> c3; q12 MC `whole-unit-weight` -> c3; q13 MC `whole-unit-weight` -> c3.
- `math-u09-l05`: q01 MC `unit-equivalence` -> c1; q02 FB `unit-equivalence` -> c1; q03 TF `unit-equivalence` -> c1; q04 MC `unit-equivalence` -> c1; q05 MC `larger-to-smaller` -> c2; q06 FB `larger-to-smaller` -> c2; q07 SORT `larger-to-smaller` -> c2; q08 MC `larger-to-smaller` -> c2; q09 MC `conversion-application` -> c3; q10 FB `conversion-application` -> c3; q11 TF `conversion-application` -> c3; q12 MC `conversion-application` -> c3; q13 MC `conversion-application` -> c3.

**Exact widgets:** `math-u09-l01` c1 uses `{ type: 'money-counter', config: { targetCents: 635, denominations: [1, 5, 10, 25, 100] } }`; `math-u09-l02` c2 uses `{ type: 'clock-elapsed-time', config: { mode: 'elapsed', startTime: '09:00', elapsedMinutes: 35, minuteStep: 5 } }`; `math-u09-l03` c2 uses `{ type: 'quarter-inch-ruler', config: { lengthInches: 5, targetInches: 4.75, startInches: 0 } }`; `math-u09-l05` c1 uses `{ type: 'balance-scale', config: { left: [{ id: 'three-feet', label: '3 feet', value: 36 }], right: [{ id: 'thirty-six-inches', label: '36 inches', value: 36 }], task: 'compare' } }`. `math-u09-l04` has no `widget` property because Plan B has no instrument that measures an unknown weight to the nearest unit. The balance-scale values normalize both displayed units to inches while the labels preserve the authored units.

**Standard bounds:** Money uses coins/bills, totals, prices, and a justified enough/not-enough comparison. Time uses addition/subtraction intervals within 60 minutes to find elapsed, start, or end. Length rounds to the nearest quarter inch. Weight measures to the nearest whole ounce, pound, gram, or kilogram. Conversions move larger to smaller within one customary system and only use inches, feet, yards, ounces, pounds, fluid ounces, cups, pints, quarts, and gallons with a supplied equivalence.

**Required gates and commit:** Red: `npm test -- src/content/math/u09.test.ts` -> unresolved `./u09`. Green: `npm test -- src/content/math/u09.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false && npm run build` -> PASS. Commit:

```bash
git add src/content/math/u09.ts src/content/math/u09.test.ts
test "$(git diff --cached --name-only | sort)" = $'src/content/math/u09.test.ts\nsrc/content/math/u09.ts'
git commit -m "feat(content): add math unit 09 lessons"
```

### Unit 10 author brief

**Files:** Create only `/Users/eherbert/cram-all/src/content/math/u10.ts` and `/Users/eherbert/cram-all/src/content/math/u10.test.ts`.

**Interface:** The module imports `Lesson` from `../schema` and produces the named `unit10Lessons` export using `satisfies Lesson[]`. The direct test imports `LessonSchema`, `WidgetRefSchema`, and `validateLesson` from `../schema`, imports `unit10Lessons` from `./u10`, and asserts the exact two rows, cards, mappings, shown widget, 13 questions, threshold 8, and zero validation errors.

**Exact lesson/card allocation:**

- `math-u10-l01` “Rectangle Perimeter and Unknown Sides” / `['4.MGSR.1.1']`: c1 “Use the Perimeter Formula” / `perimeter-formula`; c2 “Find an Unknown Side Length” / `unknown-side`; c3 “Solve a Perimeter Situation” / `perimeter-situation`.
- `math-u10-l02` “Rectangle Area in Square Units” / `['4.MGSR.1.2']`: c1 “Use the Area Formula” / `area-formula`; c2 “Connect Rows to Square Units” / `square-units`; c3 “Solve and Label an Area Situation” / `area-situation`.

**Exact question routing:**

- `math-u10-l01`: q01 MC `perimeter-formula` -> c1; q02 FB `perimeter-formula` -> c1; q03 TF `perimeter-formula` -> c1; q04 MC `perimeter-formula` -> c1; q05 MC `unknown-side` -> c2; q06 FB `unknown-side` -> c2; q07 TF `unknown-side` -> c2; q08 MC `unknown-side` -> c2; q09 MC `perimeter-situation` -> c3; q10 FB `perimeter-situation` -> c3; q11 TF `perimeter-situation` -> c3; q12 MC `perimeter-situation` -> c3; q13 MC `perimeter-situation` -> c3.
- `math-u10-l02`: q01 MC `area-formula` -> c1; q02 FB `area-formula` -> c1; q03 TF `area-formula` -> c1; q04 MC `area-formula` -> c1; q05 MC `square-units` -> c2; q06 FB `square-units` -> c2; q07 TF `square-units` -> c2; q08 MC `square-units` -> c2; q09 MC `area-situation` -> c3; q10 FB `area-situation` -> c3; q11 TF `area-situation` -> c3; q12 MC `area-situation` -> c3; q13 MC `area-situation` -> c3.

**Exact widgets:** `math-u10-l02` c2 uses `{ type: 'area-model-multiplier', config: { a: 8, b: 5, splitA: [8], splitB: [5], targetProduct: 40 } }`. `math-u10-l01` has no `widget` property because the area-model multiplier does not model perimeter or an unknown side.

**Standard bounds:** Perimeter applies the rectangle perimeter formula to real-world situations, both from given sides and to find an unknown side. Area applies the rectangle area formula to real-world situations and every result is labeled with square units; perimeter results use linear units.

**Required gates and commit:** Red: `npm test -- src/content/math/u10.test.ts` -> unresolved `./u10`. Green: `npm test -- src/content/math/u10.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false && npm run build` -> PASS. Commit:

```bash
git add src/content/math/u10.ts src/content/math/u10.test.ts
test "$(git diff --cached --name-only | sort)" = $'src/content/math/u10.test.ts\nsrc/content/math/u10.ts'
git commit -m "feat(content): add math unit 10 lessons"
```

### Unit 11 author brief

**Files:** Create only `/Users/eherbert/cram-all/src/content/math/u11.ts` and `/Users/eherbert/cram-all/src/content/math/u11.test.ts`.

**Interface:** The module imports `Lesson` from `../schema` and produces the named `unit11Lessons` export using `satisfies Lesson[]`. The direct test imports `LessonSchema`, `WidgetRefSchema`, and `validateLesson` from `../schema`, imports `unit11Lessons` from `./u11`, and asserts the exact two rows, cards, mappings, shown widget, 13 questions, threshold 8, and zero validation errors.

**Exact lesson/card allocation:**

- `math-u11-l01` “Classify Triangles by Sides and Angles” / `['4.MGSR.3.1']`: c1 “Classify by Side Length” / `triangle-sides`; c2 “Classify by Angle Measure” / `triangle-angles`; c3 “Give Both Triangle Classifications” / `triangle-classification`.
- `math-u11-l02` “The Quadrilateral Hierarchy” / `['4.MGSR.3.2']`: c1 “Find Quadrilateral Attributes” / `quadrilateral-attributes`; c2 “Place Shapes in a Hierarchy” / `hierarchy-membership`; c3 “Explain Every Valid Classification” / `hierarchy-explanation`.

**Exact question routing:**

- `math-u11-l01`: q01 MC `triangle-sides` -> c1; q02 FB `triangle-sides` -> c1; q03 TF `triangle-sides` -> c1; q04 MC `triangle-sides` -> c1; q05 MC `triangle-angles` -> c2; q06 FB `triangle-angles` -> c2; q07 TF `triangle-angles` -> c2; q08 MC `triangle-angles` -> c2; q09 MC `triangle-classification` -> c3; q10 FB `triangle-classification` -> c3; q11 TF `triangle-classification` -> c3; q12 MC `triangle-classification` -> c3; q13 MC `triangle-classification` -> c3.
- `math-u11-l02`: q01 MC `quadrilateral-attributes` -> c1; q02 FB `quadrilateral-attributes` -> c1; q03 TF `quadrilateral-attributes` -> c1; q04 MC `quadrilateral-attributes` -> c1; q05 MC `hierarchy-membership` -> c2; q06 SORT `hierarchy-membership` -> c2; q07 TF `hierarchy-membership` -> c2; q08 MC `hierarchy-membership` -> c2; q09 MC `hierarchy-explanation` -> c3; q10 FB `hierarchy-explanation` -> c3; q11 TF `hierarchy-explanation` -> c3; q12 MC `hierarchy-explanation` -> c3; q13 MC `hierarchy-explanation` -> c3.

**Exact widgets:** `math-u11-l02` c1 uses `{ type: 'shape-classifier', config: { shapes: [{ id: 'trapezoid', label: 'Trapezoid', sides: 4, angles: 4, parallelPairs: 1 }, { id: 'rectangle', label: 'Rectangle', sides: 4, angles: 4, parallelPairs: 2 }, { id: 'square', label: 'Square', sides: 4, angles: 4, parallelPairs: 2 }], bins: [{ id: 'one-pair', label: '1 parallel pair', value: 1 }, { id: 'two-pairs', label: '2 parallel pairs', value: 2 }], rule: 'parallelPairs' } }`. `math-u11-l01` has no `widget` property because Plan B `shape-classifier` stores only the count of sides/angles, not side-length equality or angle measures, so it cannot classify isosceles/scalene or acute/obtuse/right triangles.

**Standard bounds:** Triangle classifications include isosceles, equilateral, scalene, acute, obtuse, right, and equiangular. Quadrilaterals are placed in a hierarchy by all shared attributes; a square must be recognized as a rectangle, rhombus, parallelogram, and quadrilateral where the lesson's definitions support those parent groups.

**Required gates and commit:** Red: `npm test -- src/content/math/u11.test.ts` -> unresolved `./u11`. Green: `npm test -- src/content/math/u11.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false && npm run build` -> PASS. Commit:

```bash
git add src/content/math/u11.ts src/content/math/u11.test.ts
test "$(git diff --cached --name-only | sort)" = $'src/content/math/u11.test.ts\nsrc/content/math/u11.ts'
git commit -m "feat(content): add math unit 11 lessons"
```

### Unit 12 author brief

**Files:** Create only `/Users/eherbert/cram-all/src/content/math/u12.ts` and `/Users/eherbert/cram-all/src/content/math/u12.test.ts`.

**Interface:** The module imports `Lesson` from `../schema` and produces the named `unit12Lessons` export using `satisfies Lesson[]`. The direct test imports `LessonSchema`, `WidgetRefSchema`, and `validateLesson` from `../schema`, imports `unit12Lessons` from `./u12`, and asserts the exact three rows, cards, mappings, shown widgets, 13 questions, threshold 8, and zero validation errors.

**Exact lesson/card allocation:**

- `math-u12-l01` “Collect and Organize Data” / `['4.DPSR.1.1']`: c1 “Tell Numerical from Categorical Data” / `data-types`; c2 “Choose a Table, Bar Graph, or Dot Plot” / `data-display`; c3 “Use an Exact Scale, Title, and Labels” / `graph-conventions`.
- `math-u12-l02` “Solve Problems with Graphs and Tables” / `['4.DPSR.1.2']`: c1 “Read a Table or Graph” / `read-data`; c2 “Choose the One-Step Operation” / `data-operation`; c3 “Solve with Whole or Fractional Data” / `fractional-data`.
- `math-u12-l03` “Certain, Possible, and Impossible” / `['4.DPSR.2.1']`: c1 “List Every Possible Outcome” / `possible-outcomes`; c2 “Connect an Event to Its Outcomes” / `event-outcomes`; c3 “Classify the Probability” / `probability-language`.

**Exact question routing:**

- `math-u12-l01`: q01 MC `data-types` -> c1; q02 FB `data-types` -> c1; q03 TF `data-types` -> c1; q04 MC `data-types` -> c1; q05 MC `data-display` -> c2; q06 FB `data-display` -> c2; q07 TF `data-display` -> c2; q08 MC `data-display` -> c2; q09 MC `graph-conventions` -> c3; q10 FB `graph-conventions` -> c3; q11 TF `graph-conventions` -> c3; q12 MC `graph-conventions` -> c3; q13 MC `graph-conventions` -> c3.
- `math-u12-l02`: q01 MC `read-data` -> c1; q02 FB `read-data` -> c1; q03 TF `read-data` -> c1; q04 MC `read-data` -> c1; q05 MC `data-operation` -> c2; q06 FB `data-operation` -> c2; q07 TF `data-operation` -> c2; q08 MC `data-operation` -> c2; q09 MC `fractional-data` -> c3; q10 FB `fractional-data` -> c3; q11 TF `fractional-data` -> c3; q12 MC `fractional-data` -> c3; q13 MC `fractional-data` -> c3.
- `math-u12-l03`: q01 MC `possible-outcomes` -> c1; q02 FB `possible-outcomes` -> c1; q03 TF `possible-outcomes` -> c1; q04 MC `possible-outcomes` -> c1; q05 MC `event-outcomes` -> c2; q06 FB `event-outcomes` -> c2; q07 TF `event-outcomes` -> c2; q08 MC `event-outcomes` -> c2; q09 MC `probability-language` -> c3; q10 FB `probability-language` -> c3; q11 TF `probability-language` -> c3; q12 MC `probability-language` -> c3; q13 MC `probability-language` -> c3.

**Exact widgets:** `math-u12-l01` c2 uses `{ type: 'data-plot-builder', config: { kind: 'bar', prompt: 'Build the class pet survey bar graph.', categories: ['dog', 'cat', 'fish'], target: { dog: 8, cat: 6, fish: 4 } } }`; `math-u12-l03` c2 uses `{ type: 'probability-spinner', config: { segments: [{ id: 'red', label: 'Red', weight: 2, color: '#ef4444' }, { id: 'blue', label: 'Blue', weight: 1, color: '#3b82f6' }, { id: 'green', label: 'Green', weight: 1, color: '#22c55e' }], trials: 8, targetOutcomeId: 'red' } }`. `math-u12-l02` has no `widget` property because `data-plot-builder` constructs integer-count plots but does not itself solve one-step whole/fractional-data situations.

**Standard bounds:** Data collection covers numerical/categorical observations, investigations, surveys, and experiments; displays are tables, scaled bar graphs, or dot plots with titles/labels and whole, half, or fourth scales. One-step situations use tables, scaled picture/bar graphs, or dot plots and fractional data with like denominators only 2, 3, 4, 5, 6, 8, or 10. Probability only classifies a simple event as certain, possible, or impossible after listing outcomes.

**Required gates and commit:** Red: `npm test -- src/content/math/u12.test.ts` -> unresolved `./u12`. Green: `npm test -- src/content/math/u12.test.ts src/content/schema.test.ts src/content/content-validation.test.ts && npx tsc -b --pretty false && npm run build` -> PASS. Commit:

```bash
git add src/content/math/u12.ts src/content/math/u12.test.ts
test "$(git diff --cached --name-only | sort)" = $'src/content/math/u12.test.ts\nsrc/content/math/u12.ts'
git commit -m "feat(content): add math unit 12 lessons"
```

## Math wave order and ownership

After all tracked literal wave plans are approved, execute `[u02,u03,u04]`, `[u05,u06]`, `[u07,u08]`, `[u09,u10]`, then `[u11,u12]`. Files do not overlap inside a wave, and each wave authors/reviews only its isolated unit source/test files. No controller integration occurs between waves. After all five waves are accepted, master Plan C Task C3 is the sole owner of the one atomic Math registry/index-test change and every shared Plan C file.

Before each commit, run the task's narrow `git add`, then run its exact staged-path equality command shown beside the commit. For example, Unit 2 requires:

```bash
git add src/content/math/u02.ts src/content/math/u02.test.ts
test "$(git diff --cached --name-only | sort)" = $'src/content/math/u02.test.ts\nsrc/content/math/u02.ts'
```

Expected: exit 0. Any pre-existing staged path, index/shared file, blueprint, or other unit makes the equality check fail and stops the commit. The unstaged working tree may contain other users' work and is not used as a commit-scope proxy.

## Promotion status: blueprint-only and blocked

This curriculum blueprint is **not implementation-ready and must not be executed directly**, including after it is promoted to its tracked destination. Unit 2 supplies a complete production/test exemplar, while Units 3–12 fix allocation, card metadata, question routing, widget references, standards bounds, gates, and commits but do not yet supply their intro dialogue, rich-block text, worked-example steps, 377 question prompts, choice/item text, correct choice ids, accepted-answer sets, sort orders, and explanations. A worker cannot author those fields from these briefs without making unreviewed curriculum decisions.

Promotion requires these five bounded, tracked literal implementation plans to exist and pass their own arithmetic/content review:

1. `/Users/eherbert/cram-all/docs/superpowers/plans/2026-08-29-plan-c1a-math-u02-u04.md` — exactly 7 lessons and 91 questions, including the complete Unit 2 exemplar from this blueprint.
2. `/Users/eherbert/cram-all/docs/superpowers/plans/2026-08-29-plan-c1b-math-u05-u06.md` — exactly 6 lessons and 78 questions.
3. `/Users/eherbert/cram-all/docs/superpowers/plans/2026-08-29-plan-c1c-math-u07-u08.md` — exactly 6 lessons and 78 questions.
4. `/Users/eherbert/cram-all/docs/superpowers/plans/2026-08-29-plan-c1d-math-u09-u10.md` — exactly 7 lessons and 91 questions.
5. `/Users/eherbert/cram-all/docs/superpowers/plans/2026-08-29-plan-c1e-math-u11-u12.md` — exactly 5 lessons and 65 questions.

Each tracked plan must reproduce its units' locked metadata from this document, provide complete `uNN.ts` and `uNN.test.ts` code with no deferred prose/data, parse every widget via the final `WidgetRefSchema`, recompute every numeric answer, and finish with its exact red/green/permanent/type/build/commit commands. Together the five tracked scopes contain exactly 31 new lessons and 403 new questions.

## Document audit commands

Run from `/Users/eherbert/cram-all` against the tracked blueprint:

```bash
PLAN_C_MATH=docs/superpowers/plans/2026-08-29-plan-c1-math-curriculum-blueprint.md
rg -o 'math-u[0-9]{2}-l[0-9]{2}' "$PLAN_C_MATH" | sort -u | wc -l
rg -o 'math-u[0-9]{2}' "$PLAN_C_MATH" | sort -u | wc -l
rg -n 'T[O]DO|T[B]D|implement l[a]ter|fill in deta[i]ls|similar t[o]|generate conten[t]|One literal Lesson objec[t]' "$PLAN_C_MATH"
rg -n '=\s*\[\s*\]|return\s*\[\s*\]' "$PLAN_C_MATH"
rg -n "type:\s*'(fraction-bars|fraction-circles|number-line|bar-dot-plot-builder)'" "$PLAN_C_MATH"
rg -n 'target:\s*[0-9]+,\s*allowEquivalen[t]|startMinute[s]|durationMinute[s]|\b(multiplicand|multiplier|price|sections|maxFactor):|left:\s*\{|right:\s*\{|sides:\s*\[' "$PLAN_C_MATH"
rg -o "\{ type: '[a-z0-9-]+'" "$PLAN_C_MATH" | sort -u
git status --short --ignored -- "$PLAN_C_MATH" src/content/math src/content/schema.ts src/content/content-validation.test.ts src/content/lesson-quality.test.ts src/content/curriculum.ts
```

Expected: lesson count `33`; unit count `12`; the four red-flag/config scans print no matches; the widget-type inventory contains only `area-model-multiplier`, `array-builder`, `balance-scale`, `clock-elapsed-time`, `data-plot-builder`, `fraction-models`, `money-counter`, `number-line-compare`, `probability-spinner`, `quarter-inch-ruler`, and `shape-classifier`; draft review shows only the ignored source blueprint, while post-promotion review shows only the intended tracked blueprint change and no source-code change.
