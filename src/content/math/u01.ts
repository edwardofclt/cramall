import type { Lesson } from '../schema';

export const unit01Lessons: Lesson[] = [
  {
    id: 'math-u01-l01',
    unitId: 'math-u01',
    title: 'Numbers to the Millions',
    indicatorCodes: ['4.NR.1.1'],
    intro: [
      { speaker: 'nutty', pose: 'talk', text: 'My acorn stash has gotten huge, and I need a way to count every acorn!' },
      { speaker: 'kid', text: 'Could a place-value chart help you organize the number?' },
      { speaker: 'nutty', pose: 'cheer', text: 'Yes! We can read and write numbers all the way through the millions period.' },
      { speaker: 'nutty', pose: 'think', text: 'Let’s make each digit’s place do its important job.' },
    ],
    learnCards: [
      {
        id: 'math-u01-l01-c1',
        title: 'Periods organize big numbers',
        blocks: [
          { kind: 'text', text: 'A place-value chart groups digits into periods of three: ones, thousands, and millions.' },
          { kind: 'tip', text: 'Read the commas from right to left to spot each period.' },
          { kind: 'example', text: 'In 68,405,013, the 68 is in the millions period, 405 is in the thousands period, and 013 is in the ones period.' },
        ],
        widget: { type: 'place-value-builder', config: { periods: 3 } },
      },
      {
        id: 'math-u01-l01-c2',
        title: 'Standard form and word form tell the same number',
        blocks: [
          { kind: 'text', text: 'Standard form uses digits and commas. Word form uses number words.' },
          { kind: 'example', text: '405,013 is four hundred five thousand thirteen.' },
          { kind: 'tip', text: 'Say each nonzero period, then add its period name: thousand or million.' },
        ],
      },
      {
        id: 'math-u01-l01-c3',
        title: 'Expanded form shows each digit’s value',
        blocks: [
          { kind: 'text', text: 'Expanded form is an equation that adds the value of every nonzero digit.' },
          { kind: 'example', text: '4,302 = 4,000 + 300 + 2.' },
          { kind: 'tip', text: 'A zero has no value to add, so you may leave that addend out.' },
        ],
        widget: { type: 'place-value-builder', config: { target: 4302 } },
      },
    ],
    workedExample: {
      title: 'Write 68,405,013 three ways',
      steps: [
        'Start with standard form: 68,405,013. The commas separate the millions, thousands, and ones periods.',
        'Read the millions period, then the thousands period, then the ones period: sixty-eight million four hundred five thousand thirteen.',
        'Add each nonzero digit value for expanded form: 60,000,000 + 8,000,000 + 400,000 + 5,000 + 10 + 3.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        {
          id: 'math-u01-l01-q01', type: 'multiple-choice', conceptTag: 'place-value', reviewCardId: 'math-u01-l01-c1',
          prompt: 'Which digit is in the millions place in 6,405,013?',
          choices: [{ id: 'a', text: '6' }, { id: 'b', text: '4' }, { id: 'c', text: '5' }, { id: 'd', text: '3' }], correctChoiceId: 'a',
          explanation: 'The 6 is worth 6,000,000, so it sits in the millions place.',
        },
        {
          id: 'math-u01-l01-q02', type: 'fill-blank', conceptTag: 'place-value', reviewCardId: 'math-u01-l01-c1',
          prompt: 'In 72,310,408, what is the value of the digit 3?', acceptedAnswers: ['300,000', '300000'],
          explanation: 'The 3 is in the hundred-thousands place, so its value is 300,000.',
        },
        {
          id: 'math-u01-l01-q03', type: 'multiple-choice', conceptTag: 'place-value', reviewCardId: 'math-u01-l01-c1',
          prompt: 'How many digits are in the millions period of 405,013,020?',
          choices: [{ id: 'a', text: '1' }, { id: 'b', text: '2' }, { id: 'c', text: '3' }, { id: 'd', text: '6' }], correctChoiceId: 'c',
          explanation: 'The millions period is 405, and every period has three digit spaces.',
        },
        {
          id: 'math-u01-l01-q04', type: 'fill-blank', conceptTag: 'place-value', reviewCardId: 'math-u01-l01-c1',
          prompt: 'Write the digit in the ten-thousands place of 8,761,942.', acceptedAnswers: ['6'],
          explanation: 'The 6 is in the ten-thousands place in the group 761.',
        },
        {
          id: 'math-u01-l01-q05', type: 'multiple-choice', conceptTag: 'word-form', reviewCardId: 'math-u01-l01-c2',
          prompt: 'Which standard form matches “nine hundred two thousand seven”?',
          choices: [{ id: 'a', text: '902,007' }, { id: 'b', text: '920,007' }, { id: 'c', text: '902,700' }, { id: 'd', text: '9,020,007' }], correctChoiceId: 'a',
          explanation: 'Nine hundred two thousand is 902,000, and seven more makes 902,007.',
        },
        {
          id: 'math-u01-l01-q06', type: 'fill-blank', conceptTag: 'word-form', reviewCardId: 'math-u01-l01-c2',
          prompt: 'Write 17,004 in word form.', acceptedAnswers: ['seventeen thousand four'],
          explanation: 'The number has seventeen thousands and four ones.',
        },
        {
          id: 'math-u01-l01-q07', type: 'multiple-choice', conceptTag: 'word-form', reviewCardId: 'math-u01-l01-c2',
          prompt: 'Which word form matches 3,200,050?',
          choices: [
            { id: 'a', text: 'three million two hundred thousand fifty' },
            { id: 'b', text: 'three million two thousand fifty' },
            { id: 'c', text: 'three hundred twenty thousand fifty' },
            { id: 'd', text: 'three million two hundred thousand five' },
          ], correctChoiceId: 'a',
          explanation: 'The number has 3 millions, 200 thousands, and 50 ones.',
        },
        {
          id: 'math-u01-l01-q08', type: 'fill-blank', conceptTag: 'word-form', reviewCardId: 'math-u01-l01-c2',
          prompt: 'Write “four hundred six million” in standard form.', acceptedAnswers: ['406,000,000', '406000000'],
          explanation: 'Four hundred six million means 406 groups of one million.',
        },
        {
          id: 'math-u01-l01-q09', type: 'multiple-choice', conceptTag: 'expanded-form', reviewCardId: 'math-u01-l01-c3',
          prompt: 'Which expanded form equals 52,304?',
          choices: [
            { id: 'a', text: '50,000 + 2,000 + 300 + 4' },
            { id: 'b', text: '50,000 + 2,000 + 30 + 4' },
            { id: 'c', text: '5,000 + 2,000 + 300 + 4' },
            { id: 'd', text: '50,000 + 2,000 + 300 + 40' },
          ], correctChoiceId: 'a',
          explanation: 'Each nonzero digit keeps its place value: 50,000, 2,000, 300, and 4.',
        },
        {
          id: 'math-u01-l01-q10', type: 'fill-blank', conceptTag: 'expanded-form', reviewCardId: 'math-u01-l01-c3',
          prompt: 'Write 7,030 in expanded form.', acceptedAnswers: ['7,000 + 30', '7000 + 30'],
          explanation: 'The 7 is worth 7,000 and the 3 is worth 30.',
        },
        {
          id: 'math-u01-l01-q11', type: 'multiple-choice', conceptTag: 'expanded-form', reviewCardId: 'math-u01-l01-c3',
          prompt: 'What number is 900,000 + 40,000 + 500 + 6?',
          choices: [{ id: 'a', text: '940,506' }, { id: 'b', text: '945,006' }, { id: 'c', text: '940,056' }, { id: 'd', text: '900,456' }], correctChoiceId: 'a',
          explanation: 'Put each value in its place to make 940,506.',
        },
        {
          id: 'math-u01-l01-q12', type: 'fill-blank', conceptTag: 'expanded-form', reviewCardId: 'math-u01-l01-c3',
          prompt: 'Write 1,234 in expanded form.', acceptedAnswers: ['1,000 + 200 + 30 + 4', '1000 + 200 + 30 + 4'],
          explanation: 'Each digit adds its own value: thousands, hundreds, tens, and ones.',
        },
        {
          id: 'math-u01-l01-q13', type: 'multiple-choice', conceptTag: 'place-value', reviewCardId: 'math-u01-l01-c1',
          prompt: 'Which number has a 9 worth 90,000?',
          choices: [{ id: 'a', text: '19,204' }, { id: 'b', text: '9,204' }, { id: 'c', text: '190,204' }, { id: 'd', text: '1,902,040' }], correctChoiceId: 'c',
          explanation: 'In 190,204, the 9 is in the ten-thousands place, so it is worth 90,000.',
        },
      ],
    },
  },
  {
    id: 'math-u01-l02',
    unitId: 'math-u01',
    title: 'Comparing and Ordering Big Numbers',
    indicatorCodes: ['4.NR.1.3'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'I found three acorn trails, but which one has the most acorns?' },
      { speaker: 'kid', text: 'We can compare the numbers one digit at a time.' },
      { speaker: 'nutty', pose: 'talk', text: 'Then we can use symbols and put the trails in order!' },
      { speaker: 'nutty', pose: 'cheer', text: 'Big numbers are easy to compare when we start at the left.' },
    ],
    learnCards: [
      {
        id: 'math-u01-l02-c1',
        title: 'Compare from the greatest place',
        blocks: [
          { kind: 'text', text: 'Line up the digits and compare from left to right. The first different digit tells which number is greater.' },
          { kind: 'example', text: '52,014 is greater than 51,999 because the thousands digits are 2 and 1.' },
          { kind: 'tip', text: 'If the first digits match, keep moving right until you find a difference.' },
        ],
        widget: { type: 'number-line-compare', config: { min: 0, max: 100, a: 25, b: 52 } },
      },
      {
        id: 'math-u01-l02-c2',
        title: 'Comparison symbols point to the smaller number',
        blocks: [
          { kind: 'text', text: 'Use < for is less than and > for is greater than.' },
          { kind: 'tip', text: 'Imagine an alligator mouth: its wide, hungry side opens toward the greater number.' },
          { kind: 'example', text: '45,000 > 44,999 because 45,000 is greater.' },
        ],
        widget: { type: 'number-line-compare', config: { min: 44900, max: 45100, a: 44999, b: 45000, step: 1 } },
      },
      {
        id: 'math-u01-l02-c3',
        title: 'Order three numbers carefully',
        blocks: [
          { kind: 'text', text: 'To order numbers ascending, write least to greatest. To order descending, write greatest to least.' },
          { kind: 'example', text: 'Ascending: 12,003, 12,030, 12,300.' },
          { kind: 'tip', text: 'Compare two numbers at a time, then place the third where it belongs.' },
        ],
        widget: { type: 'place-value-builder', config: { periods: 2, target: 12300 } },
      },
    ],
    workedExample: {
      title: 'Order 91,204, 89,999, and 91,240',
      steps: [
        '89,999 is least because its ten-thousands digit is 8, while the other two numbers have 9.',
        'Compare 91,204 and 91,240 from left to right. The first difference is in the tens place: 0 is less than 4.',
        'Ascending order is 89,999, 91,204, 91,240. Descending order is the reverse.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        {
          id: 'math-u01-l02-q01', type: 'multiple-choice', conceptTag: 'comparison-method', reviewCardId: 'math-u01-l02-c1',
          prompt: 'Which number is greater?', choices: [{ id: 'a', text: '45,210' }, { id: 'b', text: '45,201' }], correctChoiceId: 'a',
          explanation: 'The first different digits are the tens digits, and 1 ten is greater than 0 tens.',
        },
        {
          id: 'math-u01-l02-q02', type: 'multiple-choice', conceptTag: 'compare-symbols', reviewCardId: 'math-u01-l02-c2',
          prompt: 'Choose the true comparison.', choices: [{ id: 'a', text: '87,005 < 87,050' }, { id: 'b', text: '87,005 > 87,050' }], correctChoiceId: 'a',
          explanation: 'Both numbers begin with 87, but 5 ones is less than 5 tens.',
        },
        {
          id: 'math-u01-l02-q03', type: 'multiple-choice', conceptTag: 'compare-symbols', reviewCardId: 'math-u01-l02-c2',
          prompt: 'Which symbol makes this true: 102,300 ___ 102,030?',
          choices: [{ id: 'a', text: '<' }, { id: 'b', text: '>' }, { id: 'c', text: '=' }], correctChoiceId: 'b',
          explanation: 'Three hundreds is greater than zero hundreds, so 102,300 is greater.',
        },
        {
          id: 'math-u01-l02-q04', type: 'multiple-choice', conceptTag: 'comparison-method', reviewCardId: 'math-u01-l02-c1',
          prompt: 'Which number is smaller?', choices: [{ id: 'a', text: '300,100' }, { id: 'b', text: '299,999' }], correctChoiceId: 'b',
          explanation: 'Two hundred ninety-nine thousand is less than three hundred thousand.',
        },
        {
          id: 'math-u01-l02-q05', type: 'multiple-choice', conceptTag: 'compare-symbols', reviewCardId: 'math-u01-l02-c2',
          prompt: 'Which comparison is true?', choices: [{ id: 'a', text: '56,789 < 56,790' }, { id: 'b', text: '56,789 > 56,790' }], correctChoiceId: 'a',
          explanation: 'The tens digits show that 56,789 is less than 56,790.',
        },
        {
          id: 'math-u01-l02-q06', type: 'sort', conceptTag: 'ordering', reviewCardId: 'math-u01-l02-c3',
          prompt: 'Tap these numbers from least to greatest.',
          items: [{ id: 'a', text: '45,090' }, { id: 'b', text: '45,009' }, { id: 'c', text: '45,900' }], correctOrder: ['b', 'a', 'c'],
          explanation: 'Compare the hundreds, tens, and ones after the matching 45 thousands.',
        },
        {
          id: 'math-u01-l02-q07', type: 'sort', conceptTag: 'ordering', reviewCardId: 'math-u01-l02-c3',
          prompt: 'Tap these numbers from greatest to least.',
          items: [{ id: 'a', text: '100,001' }, { id: 'b', text: '99,999' }, { id: 'c', text: '100,010' }], correctOrder: ['c', 'a', 'b'],
          explanation: 'Numbers with 100 thousands are greater than 99,999, and 100,010 is greatest.',
        },
        {
          id: 'math-u01-l02-q08', type: 'sort', conceptTag: 'ordering', reviewCardId: 'math-u01-l02-c3',
          prompt: 'Tap these numbers from least to greatest.',
          items: [{ id: 'a', text: '72,120' }, { id: 'b', text: '72,102' }, { id: 'c', text: '71,999' }], correctOrder: ['c', 'b', 'a'],
          explanation: '71,999 comes first, then 72,102, then 72,120.',
        },
        {
          id: 'math-u01-l02-q09', type: 'sort', conceptTag: 'ordering', reviewCardId: 'math-u01-l02-c3',
          prompt: 'Tap these numbers from greatest to least.',
          items: [{ id: 'a', text: '9,999' }, { id: 'b', text: '10,000' }, { id: 'c', text: '9,090' }], correctOrder: ['b', 'a', 'c'],
          explanation: '10,000 has more digits, so it is greatest; then 9,999 comes before 9,090.',
        },
        {
          id: 'math-u01-l02-q10', type: 'multiple-choice', conceptTag: 'comparison-method', reviewCardId: 'math-u01-l02-c1',
          prompt: 'Which digit decides that 63,421 is greater than 62,999?',
          choices: [{ id: 'a', text: 'The 6 in the ten-thousands place' }, { id: 'b', text: 'The 3 and 2 in the thousands place' }, { id: 'c', text: 'The 1 and 9 in the ones place' }], correctChoiceId: 'b',
          explanation: 'The ten-thousands digits match, so the thousands digits 3 and 2 decide it.',
        },
        {
          id: 'math-u01-l02-q11', type: 'sort', conceptTag: 'ordering', reviewCardId: 'math-u01-l02-c3',
          prompt: 'Tap these numbers from least to greatest.',
          items: [{ id: 'a', text: '500,005' }, { id: 'b', text: '500,050' }, { id: 'c', text: '500,500' }], correctOrder: ['a', 'b', 'c'],
          explanation: 'The hundreds, tens, and ones make 500,005 the least and 500,500 the greatest.',
        },
        {
          id: 'math-u01-l02-q12', type: 'multiple-choice', conceptTag: 'compare-symbols', reviewCardId: 'math-u01-l02-c2',
          prompt: 'Which symbol makes this true: 76,010 ___ 76,100?',
          choices: [{ id: 'a', text: '<' }, { id: 'b', text: '>' }, { id: 'c', text: '=' }], correctChoiceId: 'a',
          explanation: 'One hundred is greater than one ten, so 76,010 is less than 76,100.',
        },
        {
          id: 'math-u01-l02-q13', type: 'sort', conceptTag: 'ordering', reviewCardId: 'math-u01-l02-c3',
          prompt: 'Tap these numbers from greatest to least.',
          items: [{ id: 'a', text: '91,204' }, { id: 'b', text: '89,999' }, { id: 'c', text: '91,240' }], correctOrder: ['c', 'a', 'b'],
          explanation: 'Compare from the left: 91,240 is greatest, then 91,204, then 89,999.',
        },
      ],
    },
  },
];
