import type { Lesson } from '../schema';

export const unit04Lessons = [
  {
    id: 'math-u04-l01',
    unitId: 'math-u04',
    title: 'Multiply by Multiples of 10 and 100',
    indicatorCodes: ['4.PAFR.1.2'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'A few basic facts can unlock much larger products.' },
      { speaker: 'kid', text: 'We can use place value to turn 3 × 4 into 3 × 40 or 3 × 400.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Properties let us decompose and regroup without changing the product.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Then we will use these products in real situations.' },
    ],
    learnCards: [
      {
        id: 'math-u04-l01-c1',
        title: 'See the Place-Value Shift',
        blocks: [
          { kind: 'text', text: 'A multiple of 10 or 100 is a basic fact multiplied by 10 or 100.' },
          { kind: 'example', text: 'Because 6 × 7 = 42, 6 × 70 = 420 and 6 × 700 = 4,200.' },
          { kind: 'tip', text: 'Name the unit: 42 tens equals 420, while 42 hundreds equals 4,200.' },
        ],
        widget: { type: 'area-model-multiplier', config: { a: 6, b: 70, splitA: [6], splitB: [10, 10, 10, 10, 10, 10, 10], targetProduct: 420 } },
      },
      {
        id: 'math-u04-l01-c2',
        title: 'Use Properties of Operations',
        blocks: [
          { kind: 'text', text: 'The commutative, associative, and distributive properties can make a product easier.' },
          { kind: 'example', text: '8 × 60 = 8 × (6 × 10) = (8 × 6) × 10 = 480.' },
          { kind: 'tip', text: 'Keep each factor’s value unchanged while regrouping or decomposing it.' },
        ],
        widget: { type: 'array-builder', config: { rows: 1, columns: 8, targetProduct: 48, editable: true } },
      },
      {
        id: 'math-u04-l01-c3',
        title: 'Apply a Multiple-of-Ten Product',
        blocks: [
          { kind: 'text', text: 'Real-world equal groups can be represented by one digit times a multiple of 10 or 100.' },
          { kind: 'example', text: 'Seven boxes with 300 beads each contain 7 × 300 = 2,100 beads.' },
          { kind: 'tip', text: 'Estimate the size first so 2,100 is not mistaken for 210 or 21,000.' },
        ],
        widget: { type: 'array-builder', config: { rows: 2, columns: 3, targetProduct: 21, editable: true } },
      },
    ],
    workedExample: {
      title: 'Find 8 × 600',
      steps: [
        'Write 600 as 6 × 100.',
        'Regroup: 8 × (6 × 100) = (8 × 6) × 100.',
        'Compute 48 × 100 = 4,800 and check that 8 groups of 600 should be in the thousands.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u04-l01-q01', type: 'multiple-choice', conceptTag: 'place-value-shifts', reviewCardId: 'math-u04-l01-c1', prompt: 'What is 4 × 30?', choices: [{ id: 'a', text: '120' }, { id: 'b', text: '12' }, { id: 'c', text: '1,200' }, { id: 'd', text: '34' }], correctChoiceId: 'a', explanation: 'Four times 3 tens is 12 tens, or 120.' },
        { id: 'math-u04-l01-q02', type: 'fill-blank', conceptTag: 'place-value-shifts', reviewCardId: 'math-u04-l01-c1', prompt: 'Complete the equation: 7 × 500 = ___.', acceptedAnswers: ['3,500'], explanation: 'Seven times 5 hundreds is 35 hundreds, or 3,500.' },
        { id: 'math-u04-l01-q03', type: 'true-false', conceptTag: 'place-value-shifts', reviewCardId: 'math-u04-l01-c1', prompt: 'Because 9 × 4 = 36, 9 × 40 = 360.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Thirty-six tens equals 360.' },
        { id: 'math-u04-l01-q04', type: 'multiple-choice', conceptTag: 'place-value-shifts', reviewCardId: 'math-u04-l01-c1', prompt: 'Which product equals 5 × 800?', choices: [{ id: 'a', text: '4,000' }, { id: 'b', text: '400' }, { id: 'c', text: '40,000' }, { id: 'd', text: '805' }], correctChoiceId: 'a', explanation: 'Five times 8 hundreds is 40 hundreds, or 4,000.' },
        { id: 'math-u04-l01-q05', type: 'multiple-choice', conceptTag: 'operation-properties', reviewCardId: 'math-u04-l01-c2', prompt: 'Which equation correctly decomposes 6 × 70?', choices: [{ id: 'a', text: '6 × (7 × 10) = (6 × 7) × 10' }, { id: 'b', text: '6 × (7 + 10) = 6 × 17' }, { id: 'c', text: '6 + (7 × 10) = 76' }, { id: 'd', text: '(6 × 7) + 10 = 52' }], correctChoiceId: 'a', explanation: 'Seventy is 7 × 10, so regrouping gives 42 × 10.' },
        { id: 'math-u04-l01-q06', type: 'fill-blank', conceptTag: 'operation-properties', reviewCardId: 'math-u04-l01-c2', prompt: 'Use the distributive property: 3 × 90 = 3 × (100 - 10) = 300 - ___.', acceptedAnswers: ['30'], explanation: 'Three times 10 is 30, and 300 - 30 = 270.' },
        { id: 'math-u04-l01-q07', type: 'multiple-choice', conceptTag: 'operation-properties', reviewCardId: 'math-u04-l01-c2', prompt: 'Which expression has the same value as 8 × 600?', choices: [{ id: 'a', text: '(8 × 6) × 100' }, { id: 'b', text: '(8 + 6) × 100' }, { id: 'c', text: '8 × (600 + 100)' }, { id: 'd', text: '(8 × 100) + 6' }], correctChoiceId: 'a', explanation: 'Six hundred is 6 × 100, and factors may be regrouped.' },
        { id: 'math-u04-l01-q08', type: 'sort', conceptTag: 'operation-properties', reviewCardId: 'math-u04-l01-c2', prompt: 'Order the steps for finding 7 × 400.', items: [{ id: 'a', text: 'Write 400 as 4 × 100.' }, { id: 'b', text: 'Regroup as (7 × 4) × 100.' }, { id: 'c', text: 'Compute 7 × 4 = 28.' }, { id: 'd', text: 'Compute 28 × 100 = 2,800.' }], correctOrder: ['a', 'b', 'c', 'd'], explanation: 'Decompose by place value, regroup, use the basic fact, and restore the hundreds.' },
        { id: 'math-u04-l01-q09', type: 'multiple-choice', conceptTag: 'product-application', reviewCardId: 'math-u04-l01-c3', prompt: 'Six shelves hold 80 books each. How many books do they hold?', choices: [{ id: 'a', text: '480' }, { id: 'b', text: '86' }, { id: 'c', text: '4,800' }, { id: 'd', text: '48' }], correctChoiceId: 'a', explanation: 'Six equal groups of 80 give 6 × 80 = 480.' },
        { id: 'math-u04-l01-q10', type: 'fill-blank', conceptTag: 'product-application', reviewCardId: 'math-u04-l01-c3', prompt: 'Nine bundles contain 200 sticks each. They contain ___ sticks.', acceptedAnswers: ['1,800'], explanation: 'Nine times 200 equals 1,800.' },
        { id: 'math-u04-l01-q11', type: 'true-false', conceptTag: 'product-application', reviewCardId: 'math-u04-l01-c3', prompt: 'A theater with 4 sections of 700 seats has 2,800 seats.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Four times 700 equals 2,800.' },
        { id: 'math-u04-l01-q12', type: 'multiple-choice', conceptTag: 'product-application', reviewCardId: 'math-u04-l01-c3', prompt: 'A hiker walks 50 meters on each of 8 laps. What distance does the hiker walk?', choices: [{ id: 'a', text: '400 meters' }, { id: 'b', text: '58 meters' }, { id: 'c', text: '4,000 meters' }, { id: 'd', text: '350 meters' }], correctChoiceId: 'a', explanation: 'Eight times 50 meters is 400 meters.' },
        { id: 'math-u04-l01-q13', type: 'multiple-choice', conceptTag: 'product-application', reviewCardId: 'math-u04-l01-c3', prompt: 'Which estimate supports 3 × 900 = 2,700?', choices: [{ id: 'a', text: 'Three groups of nearly 1,000 should total nearly 3,000.' }, { id: 'b', text: 'Three groups of 900 should be less than 900.' }, { id: 'c', text: 'The product should be about 300.' }, { id: 'd', text: 'Multiplication always gives 27.' }], correctChoiceId: 'a', explanation: 'A product near 3,000 has the expected size for three groups of 900.' },
      ],
    },
  },
  {
    id: 'math-u04-l02',
    unitId: 'math-u04',
    title: 'Decompose to Multiply Multi-Digit Numbers',
    indicatorCodes: ['4.PAFR.1.3'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Large factors can be split into place-value parts.' },
      { speaker: 'kid', text: 'Each part makes a partial product that is easier to find.' },
      { speaker: 'nutty', pose: 'cheer', text: 'An area model keeps every part visible.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Adding all partial products rebuilds the complete product.' },
    ],
    learnCards: [
      {
        id: 'math-u04-l02-c1',
        title: 'Make Partial Products',
        blocks: [
          { kind: 'text', text: 'Decompose a multi-digit factor by the value of each digit, then multiply every part.' },
          { kind: 'example', text: '3,214 × 3 = 3,000 × 3 + 200 × 3 + 10 × 3 + 4 × 3.' },
          { kind: 'tip', text: 'Include zero-value places in your thinking even when they do not create a written partial product.' },
        ],
        widget: { type: 'area-model-multiplier', config: { a: 4, b: 27, splitA: [4], splitB: [20, 7], targetProduct: 108 } },
      },
      {
        id: 'math-u04-l02-c2',
        title: 'Use an Area Model',
        blocks: [
          { kind: 'text', text: 'For two 2-digit factors, split both factors and multiply every rectangle.' },
          { kind: 'example', text: '23 × 14 gives 20 × 10, 20 × 4, 3 × 10, and 3 × 4.' },
          { kind: 'tip', text: 'There must be one partial product for every pair of decomposed parts.' },
        ],
        widget: { type: 'area-model-multiplier', config: { a: 23, b: 14, splitA: [20, 3], splitB: [10, 4], targetProduct: 322 } },
      },
      {
        id: 'math-u04-l02-c3',
        title: 'Check a Decomposition',
        blocks: [
          { kind: 'text', text: 'Add the partial products and check that their sizes match the original factors.' },
          { kind: 'example', text: 'For 23 × 14, 200 + 80 + 30 + 12 = 322.' },
          { kind: 'tip', text: 'Estimate with nearby tens to catch a missing or duplicated partial product.' },
        ],
        widget: { type: 'balance-scale', config: { task: 'make-equal', left: [{ id: 'product', label: '23 × 14', value: 322 }], right: [{ id: 'p1', label: '20 × 10 = 200', value: 200 }, { id: 'p2', label: '20 × 4 = 80', value: 80 }, { id: 'p3', label: '3 × 10 = 30', value: 30 }, { id: 'p4', label: '3 × 4 = 12', value: 12 }, { id: 'decoy', label: 'Extra 20', value: 20 }] } },
      },
    ],
    workedExample: {
      title: 'Multiply 2,306 × 4',
      steps: [
        'Decompose 2,306 as 2,000 + 300 + 6.',
        'Find partial products: 8,000, 1,200, and 24.',
        'Add 8,000 + 1,200 + 24 = 9,224; the estimate 2,300 × 4 = 9,200 supports the result.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u04-l02-q01', type: 'multiple-choice', conceptTag: 'partial-products', reviewCardId: 'math-u04-l02-c1', prompt: 'Which decomposition matches 4,321 × 3?', choices: [{ id: 'a', text: '(4,000 × 3) + (300 × 3) + (20 × 3) + (1 × 3)' }, { id: 'b', text: '(4 × 3) + (321 × 3)' }, { id: 'c', text: '(4,000 + 300 + 20 + 1) + 3' }, { id: 'd', text: '(4,321 × 30)' }], correctChoiceId: 'a', explanation: 'Each digit value is multiplied by 3.' },
        { id: 'math-u04-l02-q02', type: 'fill-blank', conceptTag: 'partial-products', reviewCardId: 'math-u04-l02-c1', prompt: 'What is the hundreds partial product in 2,416 × 3?', acceptedAnswers: ['1,200'], explanation: 'The hundreds value is 400, and 400 × 3 = 1,200.' },
        { id: 'math-u04-l02-q03', type: 'multiple-choice', conceptTag: 'partial-products', reviewCardId: 'math-u04-l02-c1', prompt: 'What is 1,204 × 5?', choices: [{ id: 'a', text: '6,020' }, { id: 'b', text: '6,200' }, { id: 'c', text: '5,020' }, { id: 'd', text: '60,200' }], correctChoiceId: 'a', explanation: 'The partial products 5,000 + 1,000 + 20 total 6,020.' },
        { id: 'math-u04-l02-q04', type: 'true-false', conceptTag: 'partial-products', reviewCardId: 'math-u04-l02-c1', prompt: 'In 3,042 × 2, the tens-place partial product is 80.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'The 4 represents 40, and 40 × 2 = 80.' },
        { id: 'math-u04-l02-q05', type: 'multiple-choice', conceptTag: 'area-model', reviewCardId: 'math-u04-l02-c2', prompt: 'Which four partial products model 23 × 14?', choices: [{ id: 'a', text: '200, 80, 30, and 12' }, { id: 'b', text: '200, 40, 30, and 7' }, { id: 'c', text: '20, 80, 3, and 12' }, { id: 'd', text: '230, 92, 14, and 1' }], correctChoiceId: 'a', explanation: 'Multiplying 20 and 3 by 10 and 4 gives those four products.' },
        { id: 'math-u04-l02-q06', type: 'fill-blank', conceptTag: 'area-model', reviewCardId: 'math-u04-l02-c2', prompt: 'In an area model for 32 × 15, what is 30 × 5?', acceptedAnswers: ['150'], explanation: 'Thirty times 5 equals 150.' },
        { id: 'math-u04-l02-q07', type: 'multiple-choice', conceptTag: 'area-model', reviewCardId: 'math-u04-l02-c2', prompt: 'What is 24 × 16?', choices: [{ id: 'a', text: '384' }, { id: 'b', text: '344' }, { id: 'c', text: '364' }, { id: 'd', text: '404' }], correctChoiceId: 'a', explanation: 'The partial products 200 + 120 + 40 + 24 total 384.' },
        { id: 'math-u04-l02-q08', type: 'sort', conceptTag: 'area-model', reviewCardId: 'math-u04-l02-c2', prompt: 'Order the partial products for 31 × 22 from greatest to least.', items: [{ id: 'a', text: '30 × 20 = 600' }, { id: 'b', text: '30 × 2 = 60' }, { id: 'c', text: '1 × 20 = 20' }, { id: 'd', text: '1 × 2 = 2' }], correctOrder: ['a', 'b', 'c', 'd'], explanation: 'The areas have values 600, 60, 20, and 2.' },
        { id: 'math-u04-l02-q09', type: 'multiple-choice', conceptTag: 'decomposition-check', reviewCardId: 'math-u04-l02-c3', prompt: 'Which sum correctly checks 42 × 17?', choices: [{ id: 'a', text: '400 + 280 + 20 + 14 = 714' }, { id: 'b', text: '400 + 70 + 20 + 7 = 497' }, { id: 'c', text: '420 + 170 = 590' }, { id: 'd', text: '40 + 2 + 10 + 7 = 59' }], correctChoiceId: 'a', explanation: 'The four partial products from 40 + 2 and 10 + 7 total 714.' },
        { id: 'math-u04-l02-q10', type: 'fill-blank', conceptTag: 'decomposition-check', reviewCardId: 'math-u04-l02-c3', prompt: 'Complete the check: 3,102 × 3 = 9,000 + 300 + 6 = ___.', acceptedAnswers: ['9,306'], explanation: 'Adding the partial products gives 9,306.' },
        { id: 'math-u04-l02-q11', type: 'true-false', conceptTag: 'decomposition-check', reviewCardId: 'math-u04-l02-c3', prompt: 'The estimate 20 × 10 = 200 supports a product of 322 for 23 × 14.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'The exact factors are a little larger than 20 and 10, so 322 is a reasonable product.' },
        { id: 'math-u04-l02-q12', type: 'multiple-choice', conceptTag: 'decomposition-check', reviewCardId: 'math-u04-l02-c3', prompt: 'A learner gets 92 for 23 × 14. What was most likely omitted?', choices: [{ id: 'a', text: 'The partial products involving 10' }, { id: 'b', text: 'The ones digits 3 and 4' }, { id: 'c', text: 'The addition sign' }, { id: 'd', text: 'The factor 14' }], correctChoiceId: 'a', explanation: 'The remaining 80 + 12 equals 92, so both products using 10 were missed.' },
        { id: 'math-u04-l02-q13', type: 'multiple-choice', conceptTag: 'decomposition-check', reviewCardId: 'math-u04-l02-c3', prompt: 'Which result is reasonable for 3,988 × 2?', choices: [{ id: 'a', text: '7,976' }, { id: 'b', text: '797' }, { id: 'c', text: '79,760' }, { id: 'd', text: '3,990' }], correctChoiceId: 'a', explanation: 'Four thousand times 2 is about 8,000, and the exact product is 7,976.' },
      ],
    },
  },
  {
    id: 'math-u04-l03',
    unitId: 'math-u04',
    title: 'Multiplicative Comparisons and Unknowns',
    indicatorCodes: ['4.PAFR.3.3'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'A comparison can tell how many times as much one quantity is.' },
      { speaker: 'kid', text: 'Words such as “times as many” signal multiplication, not addition.' },
      { speaker: 'nutty', pose: 'cheer', text: 'A variable can stand for any unknown part of the comparison.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will solve and check the equation in its real-world context.' },
    ],
    learnCards: [
      {
        id: 'math-u04-l03-c1',
        title: 'Read Comparison Language',
        blocks: [
          { kind: 'text', text: '“Four times as many” means four equal copies of the smaller quantity.' },
          { kind: 'example', text: 'If one basket has 6 acorns and another has 4 times as many, the larger basket has 4 × 6 = 24.' },
          { kind: 'tip', text: 'Do not confuse “4 times as many” with “4 more than.”' },
        ],
        widget: { type: 'array-builder', config: { rows: 1, columns: 6, targetProduct: 24, editable: true } },
      },
      {
        id: 'math-u04-l03-c2',
        title: 'Write a Variable Equation',
        blocks: [
          { kind: 'text', text: 'Use a letter for the unknown and place it where the unknown quantity belongs.' },
          { kind: 'example', text: 'If Mia has 5 stickers and Leo has 3 times as many, 3 × 5 = s represents Leo’s stickers.' },
          { kind: 'tip', text: 'For an unknown smaller amount, an equation such as 4 × n = 28 keeps the comparison direction clear.' },
        ],
        widget: { type: 'array-builder', config: { rows: 1, columns: 5, targetProduct: 15, editable: true } },
      },
      {
        id: 'math-u04-l03-c3',
        title: 'Solve a Comparison Problem',
        blocks: [
          { kind: 'text', text: 'Solve the equation and state what the answer measures.' },
          { kind: 'example', text: 'If 6 × n = 42, then n = 7 because 6 × 7 = 42.' },
          { kind: 'tip', text: 'Check by replacing the variable and rereading the comparison sentence.' },
        ],
        widget: { type: 'balance-scale', config: { task: 'make-equal', left: [{ id: 'total', label: '36 shells', value: 36 }], right: [{ id: 'g1', label: 'Group of 9', value: 9 }, { id: 'g2', label: 'Group of 9', value: 9 }, { id: 'g3', label: 'Group of 9', value: 9 }, { id: 'g4', label: 'Group of 9', value: 9 }, { id: 'decoy', label: 'Extra 7', value: 7 }] } },
      },
    ],
    workedExample: {
      title: 'Compare two shell collections',
      steps: [
        'Sandy has 36 shells, which is 4 times the number Nutty has.',
        'Let n be Nutty’s shells and write 4 × n = 36.',
        'Solve n = 9 and check: 4 × 9 = 36, so Nutty has 9 shells.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u04-l03-q01', type: 'multiple-choice', conceptTag: 'comparison-language', reviewCardId: 'math-u04-l03-c1', prompt: 'Kai has 5 cards. Remy has 4 times as many. What does “4 times as many” mean?', choices: [{ id: 'a', text: 'Four equal groups of 5' }, { id: 'b', text: 'Five plus 4' }, { id: 'c', text: 'Five minus 4' }, { id: 'd', text: 'Four fewer than 5' }], correctChoiceId: 'a', explanation: 'Multiplicative comparison uses four copies of the smaller amount.' },
        { id: 'math-u04-l03-q02', type: 'fill-blank', conceptTag: 'comparison-language', reviewCardId: 'math-u04-l03-c1', prompt: 'Twelve is ___ times as many as 3.', acceptedAnswers: ['4'], explanation: 'Twelve divided by 3 equals 4.' },
        { id: 'math-u04-l03-q03', type: 'true-false', conceptTag: 'comparison-language', reviewCardId: 'math-u04-l03-c1', prompt: '“Six times as long as 8 centimeters” describes 6 × 8 centimeters.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Six equal lengths of 8 centimeters total 48 centimeters.' },
        { id: 'math-u04-l03-q04', type: 'multiple-choice', conceptTag: 'comparison-language', reviewCardId: 'math-u04-l03-c1', prompt: 'Which phrase describes 7 × 9?', choices: [{ id: 'a', text: 'Seven times as many as 9' }, { id: 'b', text: 'Seven more than 9' }, { id: 'c', text: 'Nine fewer than 7' }, { id: 'd', text: 'Seven divided among 9' }], correctChoiceId: 'a', explanation: 'The product represents seven equal groups of 9.' },
        { id: 'math-u04-l03-q05', type: 'multiple-choice', conceptTag: 'variable-equation', reviewCardId: 'math-u04-l03-c2', prompt: 'Lena has 6 beads. Omar has 5 times as many. Which equation uses b for Omar’s beads?', choices: [{ id: 'a', text: '5 × 6 = b' }, { id: 'b', text: '6 + 5 = b' }, { id: 'c', text: '5 × b = 6' }, { id: 'd', text: 'b - 5 = 6' }], correctChoiceId: 'a', explanation: 'Omar’s unknown amount is five groups of 6.' },
        { id: 'math-u04-l03-q06', type: 'fill-blank', conceptTag: 'variable-equation', reviewCardId: 'math-u04-l03-c2', prompt: 'A rope is 3 times as long as a 7-foot rope. Complete the equation: 3 × 7 = r, so r = ___.', acceptedAnswers: ['21'], explanation: 'Three groups of 7 feet total 21 feet.' },
        { id: 'math-u04-l03-q07', type: 'multiple-choice', conceptTag: 'variable-equation', reviewCardId: 'math-u04-l03-c2', prompt: 'A tower is 32 blocks tall, 4 times as tall as a smaller tower. Which equation finds the smaller height h?', choices: [{ id: 'a', text: '4 × h = 32' }, { id: 'b', text: '32 × 4 = h' }, { id: 'c', text: 'h + 4 = 32' }, { id: 'd', text: '32 - h = 4' }], correctChoiceId: 'a', explanation: 'Four copies of the smaller height equal 32.' },
        { id: 'math-u04-l03-q08', type: 'true-false', conceptTag: 'variable-equation', reviewCardId: 'math-u04-l03-c2', prompt: 'The equation n × 8 = 40 can represent an unknown comparison factor.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'The variable can stand for how many groups of 8 make 40.' },
        { id: 'math-u04-l03-q09', type: 'multiple-choice', conceptTag: 'comparison-problem', reviewCardId: 'math-u04-l03-c3', prompt: 'A dog walked 24 meters, 3 times the distance a turtle moved. How far did the turtle move?', choices: [{ id: 'a', text: '8 meters' }, { id: 'b', text: '21 meters' }, { id: 'c', text: '27 meters' }, { id: 'd', text: '72 meters' }], correctChoiceId: 'a', explanation: 'Solve 3 × t = 24, so t = 8 meters.' },
        { id: 'math-u04-l03-q10', type: 'fill-blank', conceptTag: 'comparison-problem', reviewCardId: 'math-u04-l03-c3', prompt: 'A red ribbon is 6 inches long. A blue ribbon is 7 times as long. The blue ribbon is ___ inches long.', acceptedAnswers: ['42'], explanation: 'Seven times 6 inches equals 42 inches.' },
        { id: 'math-u04-l03-q11', type: 'multiple-choice', conceptTag: 'comparison-problem', reviewCardId: 'math-u04-l03-c3', prompt: 'Nora read 45 pages, which is 5 times Eli’s pages. Which check supports Eli reading 9 pages?', choices: [{ id: 'a', text: '5 × 9 = 45' }, { id: 'b', text: '45 × 5 = 225' }, { id: 'c', text: '45 - 5 = 40' }, { id: 'd', text: '9 + 5 = 14' }], correctChoiceId: 'a', explanation: 'Five copies of Eli’s 9 pages equal Nora’s 45 pages.' },
        { id: 'math-u04-l03-q12', type: 'true-false', conceptTag: 'comparison-problem', reviewCardId: 'math-u04-l03-c3', prompt: 'If 4 × p = 28, then p = 6.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'false', explanation: 'Four times 7 equals 28, so p = 7.' },
        { id: 'math-u04-l03-q13', type: 'multiple-choice', conceptTag: 'comparison-problem', reviewCardId: 'math-u04-l03-c3', prompt: 'A pine tree is 36 feet tall. It is 3 times as tall as a sapling. What is the sapling’s height?', choices: [{ id: 'a', text: '12 feet' }, { id: 'b', text: '33 feet' }, { id: 'c', text: '39 feet' }, { id: 'd', text: '108 feet' }], correctChoiceId: 'a', explanation: 'Solve 3 × s = 36 to get 12 feet.' },
      ],
    },
  },
] satisfies Lesson[];
