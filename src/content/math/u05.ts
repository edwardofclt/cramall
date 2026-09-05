// src/content/math/u05.ts
import type { Lesson } from '../schema';

export const unit05Lessons = [
  {
    id: 'math-u05-l01',
    unitId: 'math-u05',
    title: 'Divide up to Four Digits by One Digit, Including Remainders',
    indicatorCodes: ['4.PAFR.1.4'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'A large acorn collection can be shared in equal groups.' },
      { speaker: 'kid', text: 'Place value, partial quotients, or equal groups can all guide the division.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Sometimes a few objects remain after every full group is made.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will interpret that remainder and check every quotient.' },
    ],
    learnCards: [
      {
        id: 'math-u05-l01-c1',
        title: 'Choose a Division Strategy',
        blocks: [
          { kind: 'text', text: 'Break the dividend into friendly place-value parts or use partial quotients while keeping groups equal.' },
          { kind: 'example', text: '936 ÷ 4 can be split into 800 ÷ 4, 120 ÷ 4, and 16 ÷ 4, giving 200 + 30 + 4 = 234.' },
          { kind: 'example', text: 'Smaller numbers show the same equal-groups idea: 72 ÷ 4 asks how many are in each of 4 equal rows, and 4 rows of 18 make 72.' },
          { kind: 'tip', text: 'Estimate first so the quotient has a sensible number of digits.' },
        ],
        widget: { type: 'array-builder', config: { rows: 1, columns: 18, targetProduct: 72, editable: true } },
      },
      {
        id: 'math-u05-l01-c2',
        title: 'Interpret a Remainder',
        blocks: [
          { kind: 'text', text: 'A remainder is the amount left after making as many equal whole-number groups as possible.' },
          { kind: 'example', text: '53 ÷ 4 = 13 remainder 1 because 4 × 13 + 1 = 53.' },
          { kind: 'tip', text: 'A context may ask you to keep the remainder, discard it, or make one more group.' },
        ],
      },
      {
        id: 'math-u05-l01-c3',
        title: 'Justify and Check a Quotient',
        blocks: [
          { kind: 'text', text: 'Multiply divisor × quotient and add the remainder to recover the dividend.' },
          { kind: 'example', text: '875 ÷ 4 = 218 remainder 3 checks because 4 × 218 + 3 = 875.' },
          { kind: 'tip', text: 'The remainder must be less than the divisor or another full group can be made.' },
        ],
      },
    ],
    workedExample: {
      title: 'Divide 2,317 by 6',
      steps: [
        'Estimate: 2,400 ÷ 6 is about 400, so expect a three-digit quotient.',
        'Use partial quotients to find 386 full groups with 1 left over.',
        'Check 6 × 386 + 1 = 2,317; report 386 remainder 1 unless the context changes how the remainder is used.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u05-l01-q01', type: 'multiple-choice', conceptTag: 'division-strategy', reviewCardId: 'math-u05-l01-c1', prompt: 'What is 936 ÷ 4?', choices: [{ id: 'a', text: '234' }, { id: 'b', text: '214' }, { id: 'c', text: '244' }, { id: 'd', text: '3,744' }], correctChoiceId: 'a', explanation: 'The partial quotients 200 + 30 + 4 total 234.' },
        { id: 'math-u05-l01-q02', type: 'fill-blank', conceptTag: 'division-strategy', reviewCardId: 'math-u05-l01-c1', prompt: 'Complete the equation: 2,448 ÷ 6 = ___.', acceptedAnswers: ['408'], explanation: 'Six times 408 equals 2,448.' },
        { id: 'math-u05-l01-q03', type: 'multiple-choice', conceptTag: 'division-strategy', reviewCardId: 'math-u05-l01-c1', prompt: 'Which quotient is reasonable for 1,372 ÷ 4?', choices: [{ id: 'a', text: '343' }, { id: 'b', text: '34' }, { id: 'c', text: '3,430' }, { id: 'd', text: '548' }], correctChoiceId: 'a', explanation: 'About 1,400 divided by 4 is about 350, and the exact quotient is 343.' },
        { id: 'math-u05-l01-q04', type: 'true-false', conceptTag: 'division-strategy', reviewCardId: 'math-u05-l01-c1', prompt: '825 ÷ 5 = 165.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Five times 165 equals 825.' },
        { id: 'math-u05-l01-q05', type: 'multiple-choice', conceptTag: 'remainder-meaning', reviewCardId: 'math-u05-l01-c2', prompt: 'What is 53 ÷ 4?', choices: [{ id: 'a', text: '13 remainder 1' }, { id: 'b', text: '12 remainder 5' }, { id: 'c', text: '14 remainder 1' }, { id: 'd', text: '13 remainder 4' }], correctChoiceId: 'a', explanation: 'Four groups of 13 use 52, leaving 1.' },
        { id: 'math-u05-l01-q06', type: 'fill-blank', conceptTag: 'remainder-meaning', reviewCardId: 'math-u05-l01-c2', prompt: 'Complete: 67 ÷ 6 = 11 remainder ___.', acceptedAnswers: ['1'], explanation: 'Six times 11 is 66, leaving 1.' },
        { id: 'math-u05-l01-q07', type: 'multiple-choice', conceptTag: 'remainder-meaning', reviewCardId: 'math-u05-l01-c2', prompt: 'Twenty-nine learners ride in cars that hold 4 learners each. What is the least number of cars needed?', choices: [{ id: 'a', text: '8' }, { id: 'b', text: '7' }, { id: 'c', text: '6' }, { id: 'd', text: '9' }], correctChoiceId: 'a', explanation: 'Seven cars hold only 28, so the remaining learner requires an eighth car.' },
        { id: 'math-u05-l01-q08', type: 'true-false', conceptTag: 'remainder-meaning', reviewCardId: 'math-u05-l01-c2', prompt: 'Forty-six cookies placed on trays of 6 make 7 full trays with 4 cookies left.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Six times 7 is 42, and 46 - 42 = 4.' },
        { id: 'math-u05-l01-q09', type: 'multiple-choice', conceptTag: 'quotient-check', reviewCardId: 'math-u05-l01-c3', prompt: 'Which equation checks 875 ÷ 4 = 218 remainder 3?', choices: [{ id: 'a', text: '4 × 218 + 3 = 875' }, { id: 'b', text: '4 + 218 × 3 = 658' }, { id: 'c', text: '875 × 4 = 218 + 3' }, { id: 'd', text: '218 ÷ 4 + 3 = 875' }], correctChoiceId: 'a', explanation: 'Divisor times quotient plus remainder must equal the dividend.' },
        { id: 'math-u05-l01-q10', type: 'fill-blank', conceptTag: 'quotient-check', reviewCardId: 'math-u05-l01-c3', prompt: 'Complete the quotient: 3,276 ÷ 7 = ___.', acceptedAnswers: ['468'], explanation: 'Seven times 468 equals 3,276.' },
        { id: 'math-u05-l01-q11', type: 'true-false', conceptTag: 'quotient-check', reviewCardId: 'math-u05-l01-c3', prompt: '2,405 ÷ 5 = 481 because 5 × 481 = 2,405.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'The multiplication check returns the dividend.' },
        { id: 'math-u05-l01-q12', type: 'multiple-choice', conceptTag: 'quotient-check', reviewCardId: 'math-u05-l01-c3', prompt: 'A learner writes 986 ÷ 8 = 122 remainder 10. What proves the answer must be revised?', choices: [{ id: 'a', text: 'The remainder 10 is greater than the divisor 8.' }, { id: 'b', text: 'The quotient has three digits.' }, { id: 'c', text: 'The dividend is even.' }, { id: 'd', text: 'The divisor is one digit.' }], correctChoiceId: 'a', explanation: 'A remainder must be less than the divisor; another group of 8 can be made.' },
        { id: 'math-u05-l01-q13', type: 'multiple-choice', conceptTag: 'quotient-check', reviewCardId: 'math-u05-l01-c3', prompt: 'A farm packs 1,526 eggs into cartons of 6. How many full cartons and leftover eggs are there?', choices: [{ id: 'a', text: '254 cartons and 2 eggs' }, { id: 'b', text: '255 cartons and 4 eggs' }, { id: 'c', text: '253 cartons and 8 eggs' }, { id: 'd', text: '254 cartons and 6 eggs' }], correctChoiceId: 'a', explanation: 'Six times 254 is 1,524, leaving 2 eggs.' },
      ],
    },
  },
  {
    id: 'math-u05-l02',
    unitId: 'math-u05',
    title: 'Two-Step Equations with an Unknown',
    indicatorCodes: ['4.PAFR.3.4'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Some problems need two connected decisions.' },
      { speaker: 'kid', text: 'We will identify what must happen first and what happens next.' },
      { speaker: 'nutty', pose: 'cheer', text: 'One equation can show both steps with a variable in the unknown position.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Then we will solve, label, and check the whole-number answer.' },
    ],
    learnCards: [
      {
        id: 'math-u05-l02-c1',
        title: 'Plan the Two Steps',
        blocks: [
          { kind: 'text', text: 'Underline the question, identify the known quantities, and decide which intermediate result is needed.' },
          { kind: 'example', text: 'If 3 boxes hold 24 markers each and 17 are used, first multiply 3 × 24, then subtract 17.' },
          { kind: 'tip', text: 'Operations follow the situation; keywords alone do not choose the plan.' },
        ],
      },
      {
        id: 'math-u05-l02-c2',
        title: 'Write an Equation with a Variable',
        blocks: [
          { kind: 'text', text: 'Use parentheses to show a grouped first step and place the variable where the unknown belongs.' },
          { kind: 'example', text: 'The marker situation is m = (3 × 24) - 17.' },
          { kind: 'tip', text: 'A variable may represent the start, an intermediate quantity, or the final answer.' },
        ],
      },
      {
        id: 'math-u05-l02-c3',
        title: 'Solve and Check the Answer',
        blocks: [
          { kind: 'text', text: 'Complete the first operation, use its result in the second, and label the answer.' },
          { kind: 'example', text: '(3 × 24) - 17 = 72 - 17 = 55 markers.' },
          { kind: 'tip', text: 'Substitute the answer into the equation and confirm it matches the story.' },
        ],
      },
    ],
    workedExample: {
      title: 'Share the remaining trail maps',
      steps: [
        'Four packs hold 35 maps each, so first find 4 × 35 = 140 maps.',
        'After 20 maps are set aside, 140 - 20 = 120 maps remain.',
        'Share equally among 6 teams: 120 ÷ 6 = 20 maps per team; equation ((4 × 35) - 20) ÷ 6 = t.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u05-l02-q01', type: 'multiple-choice', conceptTag: 'problem-plan', reviewCardId: 'math-u05-l02-c1', prompt: 'Five bags hold 18 apples each, and 12 apples are eaten. Which plan finds the apples left?', choices: [{ id: 'a', text: 'Multiply 5 × 18, then subtract 12.' }, { id: 'b', text: 'Add 5 + 18, then multiply by 12.' }, { id: 'c', text: 'Subtract 12 from 18, then add 5.' }, { id: 'd', text: 'Divide 18 by 5, then add 12.' }], correctChoiceId: 'a', explanation: 'First find all apples in the equal groups, then remove the eaten apples.' },
        { id: 'math-u05-l02-q02', type: 'sort', conceptTag: 'problem-plan', reviewCardId: 'math-u05-l02-c1', prompt: 'Order the steps for 96 pencils shared among 4 classes after 16 are removed.', items: [{ id: 'a', text: 'Subtract 16 from 96.' }, { id: 'b', text: 'Use 80 as the amount to share.' }, { id: 'c', text: 'Divide 80 by 4.' }, { id: 'd', text: 'State 20 pencils per class.' }], correctOrder: ['a', 'b', 'c', 'd'], explanation: 'The removal changes the amount before equal sharing.' },
        { id: 'math-u05-l02-q03', type: 'fill-blank', conceptTag: 'problem-plan', reviewCardId: 'math-u05-l02-c1', prompt: 'A shop has 7 boxes of 9 balls and sells 8 balls. It has ___ balls left.', acceptedAnswers: ['55'], explanation: 'Seven times 9 is 63, and 63 - 8 = 55.' },
        { id: 'math-u05-l02-q04', type: 'multiple-choice', conceptTag: 'problem-plan', reviewCardId: 'math-u05-l02-c1', prompt: 'A bus makes 3 trips with 26 riders each, then 15 riders leave. What is the final number of riders counted?', choices: [{ id: 'a', text: '63' }, { id: 'b', text: '78' }, { id: 'c', text: '41' }, { id: 'd', text: '93' }], correctChoiceId: 'a', explanation: 'Three times 26 is 78, and 78 - 15 = 63.' },
        { id: 'math-u05-l02-q05', type: 'multiple-choice', conceptTag: 'two-step-equation', reviewCardId: 'math-u05-l02-c2', prompt: 'Which equation represents 6 shelves with 14 books each plus 9 books on a table, using b for the total?', choices: [{ id: 'a', text: 'b = (6 × 14) + 9' }, { id: 'b', text: 'b = 6 × (14 + 9)' }, { id: 'c', text: '6 × b = 14 + 9' }, { id: 'd', text: 'b + 9 = 6 × 14' }], correctChoiceId: 'a', explanation: 'The shelf books are found first, then the 9 table books are added.' },
        { id: 'math-u05-l02-q06', type: 'fill-blank', conceptTag: 'two-step-equation', reviewCardId: 'math-u05-l02-c2', prompt: 'Complete the equation: c = (120 - 24) ÷ 6, so c = ___.', acceptedAnswers: ['16'], explanation: 'Subtracting gives 96, and 96 divided by 6 is 16.' },
        { id: 'math-u05-l02-q07', type: 'true-false', conceptTag: 'two-step-equation', reviewCardId: 'math-u05-l02-c2', prompt: 'The equation 4 × (n + 3) = 40 can place the unknown before both operations are completed.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'The variable is inside the grouped first step, which is multiplied by 4.' },
        { id: 'math-u05-l02-q08', type: 'multiple-choice', conceptTag: 'two-step-equation', reviewCardId: 'math-u05-l02-c2', prompt: 'A learner had some cards, bought 12 more, and split all the cards into 5 equal stacks of 8. Which equation finds the starting number n?', choices: [{ id: 'a', text: '(n + 12) ÷ 5 = 8' }, { id: 'b', text: 'n + (12 ÷ 5) = 8' }, { id: 'c', text: '5 × 8 + 12 = n' }, { id: 'd', text: 'n ÷ 12 + 5 = 8' }], correctChoiceId: 'a', explanation: 'The starting cards plus 12 are divided into five stacks of 8.' },
        { id: 'math-u05-l02-q09', type: 'multiple-choice', conceptTag: 'two-step-check', reviewCardId: 'math-u05-l02-c3', prompt: 'Three teams collect 28 cans each and then recycle 19 cans. How many cans remain?', choices: [{ id: 'a', text: '65' }, { id: 'b', text: '84' }, { id: 'c', text: '47' }, { id: 'd', text: '103' }], correctChoiceId: 'a', explanation: 'Three times 28 is 84; subtracting 19 leaves 65.' },
        { id: 'math-u05-l02-q10', type: 'fill-blank', conceptTag: 'two-step-check', reviewCardId: 'math-u05-l02-c3', prompt: 'A baker makes 144 rolls, packs 12 in each tray, and sells 5 trays. How many trays remain?', acceptedAnswers: ['7'], explanation: 'There are 144 ÷ 12 = 12 trays, and 12 - 5 = 7.' },
        { id: 'math-u05-l02-q11', type: 'true-false', conceptTag: 'two-step-check', reviewCardId: 'math-u05-l02-c3', prompt: 'The equation (45 + 27) ÷ 8 = 9 has a whole-number answer and is true.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Forty-five plus 27 is 72, and 72 ÷ 8 = 9.' },
        { id: 'math-u05-l02-q12', type: 'multiple-choice', conceptTag: 'two-step-check', reviewCardId: 'math-u05-l02-c3', prompt: 'Which check proves ((4 × 35) - 20) ÷ 6 = 20?', choices: [{ id: 'a', text: '20 × 6 + 20 = 140 and 4 × 35 = 140' }, { id: 'b', text: '20 + 6 + 20 = 46' }, { id: 'c', text: '20 × 4 = 80' }, { id: 'd', text: '35 - 20 = 15' }], correctChoiceId: 'a', explanation: 'Reversing the share and subtraction returns the original 140 maps.' },
        { id: 'math-u05-l02-q13', type: 'multiple-choice', conceptTag: 'two-step-check', reviewCardId: 'math-u05-l02-c3', prompt: 'A school buys 8 packs of 25 notebooks and gives 40 notebooks to each of 5 classes. How many notebooks remain?', choices: [{ id: 'a', text: '0' }, { id: 'b', text: '160' }, { id: 'c', text: '195' }, { id: 'd', text: '240' }], correctChoiceId: 'a', explanation: 'The school buys 200 and gives away 5 × 40 = 200, leaving 0.' },
      ],
    },
  },
] satisfies Lesson[];
