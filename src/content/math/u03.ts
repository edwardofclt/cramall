import type { Lesson } from '../schema';

export const unit03Lessons = [
  {
    id: 'math-u03-l01',
    unitId: 'math-u03',
    title: 'Factor Pairs, Primes, and Composites',
    indicatorCodes: ['4.PAFR.3.1'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Can equal rows help us find every factor of a number?' },
      { speaker: 'kid', text: 'Each whole-number array gives one factor pair.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will list pairs in order so none are skipped.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Then we can prove whether a number is prime, composite, or neither.' },
    ],
    learnCards: [
      {
        id: 'math-u03-l01-c1',
        title: 'Build Every Factor Pair',
        blocks: [
          { kind: 'text', text: 'A factor pair contains two whole numbers whose product is the target number.' },
          { kind: 'example', text: 'For 24, the pairs are 1 × 24, 2 × 12, 3 × 8, and 4 × 6.' },
          { kind: 'tip', text: 'Test divisors in order and stop after the factors begin repeating.' },
        ],
        widget: { type: 'array-builder', config: { rows: 4, columns: 6, targetProduct: 24, editable: true } },
      },
      {
        id: 'math-u03-l01-c2',
        title: 'Tell Prime from Composite',
        blocks: [
          { kind: 'text', text: 'A prime number greater than 1 has exactly two factors: 1 and itself. A composite number has more than two factors.' },
          { kind: 'example', text: '29 is prime because its only factor pair is 1 × 29; 30 is composite because 5 × 6 also works.' },
          { kind: 'tip', text: 'The number 1 is neither prime nor composite because it has only one factor.' },
        ],
      },
      {
        id: 'math-u03-l01-c3',
        title: 'Classify a Number and Justify',
        blocks: [
          { kind: 'text', text: 'A classification needs evidence from a complete factor list, not a guess from the number’s size.' },
          { kind: 'example', text: '49 is composite because 1 × 49 and 7 × 7 are factor pairs.' },
          { kind: 'tip', text: 'Finding one factor pair besides 1 and the number is enough to prove composite; proving prime requires checking every possible pair.' },
        ],
      },
    ],
    workedExample: {
      title: 'Classify 36',
      steps: [
        'List factor pairs in order: 1 × 36, 2 × 18, 3 × 12, 4 × 9, and 6 × 6.',
        'The next possible first factor would repeat a pair, so the list is complete.',
        'Because 36 has more than two factors, 36 is composite.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u03-l01-q01', type: 'multiple-choice', conceptTag: 'factor-pairs', reviewCardId: 'math-u03-l01-c1', prompt: 'Which list contains every factor pair of 24?', choices: [{ id: 'a', text: '1 × 24, 2 × 12, 3 × 8, 4 × 6' }, { id: 'b', text: '1 × 24, 2 × 12, 3 × 8' }, { id: 'c', text: '1 × 24, 4 × 6, 5 × 5' }, { id: 'd', text: '2 × 12, 3 × 6, 4 × 8' }], correctChoiceId: 'a', explanation: 'The four complete pairs each multiply to 24.' },
        { id: 'math-u03-l01-q02', type: 'fill-blank', conceptTag: 'factor-pairs', reviewCardId: 'math-u03-l01-c1', prompt: 'Complete the factor pair for 35: 5 × ___.', acceptedAnswers: ['7'], explanation: 'Five times 7 equals 35.' },
        { id: 'math-u03-l01-q03', type: 'sort', conceptTag: 'factor-pairs', reviewCardId: 'math-u03-l01-c1', prompt: 'Order the factor pairs of 36 by their smaller factor, least to greatest.', items: [{ id: 'a', text: '1 × 36' }, { id: 'b', text: '2 × 18' }, { id: 'c', text: '3 × 12' }, { id: 'd', text: '4 × 9' }, { id: 'e', text: '6 × 6' }], correctOrder: ['a', 'b', 'c', 'd', 'e'], explanation: 'Testing smaller factors in order produces the complete list without repeats.' },
        { id: 'math-u03-l01-q04', type: 'multiple-choice', conceptTag: 'factor-pairs', reviewCardId: 'math-u03-l01-c1', prompt: 'Which number is a factor of 42?', choices: [{ id: 'a', text: '7' }, { id: 'b', text: '5' }, { id: 'c', text: '8' }, { id: 'd', text: '9' }], correctChoiceId: 'a', explanation: 'Six times 7 equals 42, so 7 is a factor.' },
        { id: 'math-u03-l01-q05', type: 'multiple-choice', conceptTag: 'prime-composite', reviewCardId: 'math-u03-l01-c2', prompt: 'Which number is prime?', choices: [{ id: 'a', text: '29' }, { id: 'b', text: '21' }, { id: 'c', text: '33' }, { id: 'd', text: '49' }], correctChoiceId: 'a', explanation: 'Only 1 and 29 divide 29 evenly.' },
        { id: 'math-u03-l01-q06', type: 'true-false', conceptTag: 'prime-composite', reviewCardId: 'math-u03-l01-c2', prompt: 'The number 1 is prime because 1 × 1 is its only factor pair.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'false', explanation: 'One is neither prime nor composite because it has only one factor.' },
        { id: 'math-u03-l01-q07', type: 'fill-blank', conceptTag: 'prime-composite', reviewCardId: 'math-u03-l01-c2', prompt: 'How many factors does the prime number 13 have?', acceptedAnswers: ['2'], explanation: 'Its factors are 1 and 13.' },
        { id: 'math-u03-l01-q08', type: 'multiple-choice', conceptTag: 'prime-composite', reviewCardId: 'math-u03-l01-c2', prompt: 'Why is 27 composite?', choices: [{ id: 'a', text: 'It has the factor pair 3 × 9.' }, { id: 'b', text: 'It is greater than 20.' }, { id: 'c', text: 'It is an odd number.' }, { id: 'd', text: 'Its digits add to 9.' }], correctChoiceId: 'a', explanation: 'The extra factor pair 3 × 9 proves that 27 has more than two factors.' },
        { id: 'math-u03-l01-q09', type: 'multiple-choice', conceptTag: 'number-classification', reviewCardId: 'math-u03-l01-c3', prompt: 'How should 37 be classified?', choices: [{ id: 'a', text: 'Prime' }, { id: 'b', text: 'Composite' }, { id: 'c', text: 'Neither prime nor composite' }, { id: 'd', text: 'Even' }], correctChoiceId: 'a', explanation: 'The only factors of 37 are 1 and 37, so it is prime.' },
        { id: 'math-u03-l01-q10', type: 'fill-blank', conceptTag: 'number-classification', reviewCardId: 'math-u03-l01-c3', prompt: 'How many factors does 24 have?', acceptedAnswers: ['8'], explanation: 'The four pairs give eight factors: 1, 2, 3, 4, 6, 8, 12, and 24.' },
        { id: 'math-u03-l01-q11', type: 'true-false', conceptTag: 'number-classification', reviewCardId: 'math-u03-l01-c3', prompt: '49 is composite because 7 × 7 = 49.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'The factor 7 is different from 1 and 49, so 49 is composite.' },
        { id: 'math-u03-l01-q12', type: 'multiple-choice', conceptTag: 'number-classification', reviewCardId: 'math-u03-l01-c3', prompt: 'Which statement best justifies that 2 is prime?', choices: [{ id: 'a', text: 'Its only factors are 1 and 2.' }, { id: 'b', text: 'It is the smallest even number.' }, { id: 'c', text: 'It has one factor pair with equal numbers.' }, { id: 'd', text: 'It can be added to itself.' }], correctChoiceId: 'a', explanation: 'Exactly two factors, 1 and itself, make 2 prime.' },
        { id: 'math-u03-l01-q13', type: 'multiple-choice', conceptTag: 'number-classification', reviewCardId: 'math-u03-l01-c3', prompt: 'How should the number 1 be classified?', choices: [{ id: 'a', text: 'Neither prime nor composite' }, { id: 'b', text: 'Prime' }, { id: 'c', text: 'Composite' }, { id: 'd', text: 'Both prime and composite' }], correctChoiceId: 'a', explanation: 'One has only one factor, so it is neither prime nor composite.' },
      ],
    },
  },
  {
    id: 'math-u03-l02',
    unitId: 'math-u03',
    title: 'Rules and Function-Table Patterns',
    indicatorCodes: ['4.PAFR.3.2'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'A trail sign changes every input number into a new output.' },
      { speaker: 'kid', text: 'The same rule must work for every row.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We can use known pairs to name the rule and complete a table.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Then we will explain what the pattern means in a real situation.' },
    ],
    learnCards: [
      {
        id: 'math-u03-l02-c1',
        title: 'Find the Input-Output Rule',
        blocks: [
          { kind: 'text', text: 'An input-output rule applies the same operation to every input.' },
          { kind: 'example', text: 'The pairs 2 → 8, 3 → 12, and 5 → 20 follow the rule multiply by 4.' },
          { kind: 'tip', text: 'Check a proposed rule against every given pair, not just one row.' },
        ],
      },
      {
        id: 'math-u03-l02-c2',
        title: 'Complete a Function Table',
        blocks: [
          { kind: 'text', text: 'Use the named rule to calculate each missing input or output.' },
          { kind: 'example', text: 'For the rule add 7, input 9 gives output 16, and output 20 came from input 13.' },
          { kind: 'tip', text: 'Write the operation beside the table and use its inverse to find a missing input.' },
        ],
      },
      {
        id: 'math-u03-l02-c3',
        title: 'Apply a Pattern to a Situation',
        blocks: [
          { kind: 'text', text: 'A function table can represent a quantity that changes by one consistent rule.' },
          { kind: 'example', text: 'If each bag holds 6 acorns, bags 1, 2, 3, and 4 match 6, 12, 18, and 24 acorns.' },
          { kind: 'tip', text: 'Name what the input and output measure so the rule has meaning, not just numbers.' },
        ],
      },
    ],
    workedExample: {
      title: 'Extend a bike-rental pattern',
      steps: [
        'A rental costs $4 plus $3 for each hour, so use the rule 3 × hours + 4.',
        'For 1, 2, and 3 hours, the outputs are 7, 10, and 13 dollars.',
        'For 5 hours, compute 3 × 5 + 4 = 19 dollars and explain that 19 is the total cost.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u03-l02-q01', type: 'multiple-choice', conceptTag: 'input-output-rule', reviewCardId: 'math-u03-l02-c1', prompt: 'Which rule changes 3 to 12, 5 to 20, and 7 to 28?', choices: [{ id: 'a', text: 'Multiply by 4' }, { id: 'b', text: 'Add 9' }, { id: 'c', text: 'Multiply by 3' }, { id: 'd', text: 'Add 4' }], correctChoiceId: 'a', explanation: 'Multiplying every input by 4 gives all three outputs.' },
        { id: 'math-u03-l02-q02', type: 'fill-blank', conceptTag: 'input-output-rule', reviewCardId: 'math-u03-l02-c1', prompt: 'The rule is multiply by 3. What is the output for input 8?', acceptedAnswers: ['24'], explanation: 'Eight times 3 equals 24.' },
        { id: 'math-u03-l02-q03', type: 'true-false', conceptTag: 'input-output-rule', reviewCardId: 'math-u03-l02-c1', prompt: 'The pairs 4 → 11 and 9 → 16 both follow the rule add 7.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Adding 7 gives 11 and 16.' },
        { id: 'math-u03-l02-q04', type: 'multiple-choice', conceptTag: 'input-output-rule', reviewCardId: 'math-u03-l02-c1', prompt: 'Which pair does not follow the rule subtract 5?', choices: [{ id: 'a', text: '12 → 8' }, { id: 'b', text: '19 → 14' }, { id: 'c', text: '10 → 5' }, { id: 'd', text: '8 → 3' }], correctChoiceId: 'a', explanation: 'Twelve minus 5 is 7, not 8.' },
        { id: 'math-u03-l02-q05', type: 'fill-blank', conceptTag: 'function-table', reviewCardId: 'math-u03-l02-c2', prompt: 'Use the rule add 6. Input 14 has output ___.', acceptedAnswers: ['20'], explanation: 'Fourteen plus 6 equals 20.' },
        { id: 'math-u03-l02-q06', type: 'multiple-choice', conceptTag: 'function-table', reviewCardId: 'math-u03-l02-c2', prompt: 'A table follows the rule multiply by 5. Which row is correct?', choices: [{ id: 'a', text: '6 → 30' }, { id: 'b', text: '6 → 11' }, { id: 'c', text: '6 → 25' }, { id: 'd', text: '6 → 35' }], correctChoiceId: 'a', explanation: 'Six times 5 equals 30.' },
        { id: 'math-u03-l02-q07', type: 'fill-blank', conceptTag: 'function-table', reviewCardId: 'math-u03-l02-c2', prompt: 'A table follows the rule subtract 4. Which input gives output 13?', acceptedAnswers: ['17'], explanation: 'Seventeen minus 4 equals 13.' },
        { id: 'math-u03-l02-q08', type: 'multiple-choice', conceptTag: 'function-table', reviewCardId: 'math-u03-l02-c2', prompt: 'Inputs 1, 2, 3, and 4 follow the rule 2 × input + 1. Which output list is correct?', choices: [{ id: 'a', text: '3, 5, 7, 9' }, { id: 'b', text: '2, 4, 6, 8' }, { id: 'c', text: '4, 6, 8, 10' }, { id: 'd', text: '3, 6, 9, 12' }], correctChoiceId: 'a', explanation: 'Doubling each input and adding 1 gives 3, 5, 7, and 9.' },
        { id: 'math-u03-l02-q09', type: 'multiple-choice', conceptTag: 'real-world-pattern', reviewCardId: 'math-u03-l02-c3', prompt: 'Each carton holds 8 juice boxes. Which rule gives the number of boxes from the number of cartons?', choices: [{ id: 'a', text: 'Multiply cartons by 8' }, { id: 'b', text: 'Add 8 to cartons' }, { id: 'c', text: 'Subtract cartons from 8' }, { id: 'd', text: 'Divide cartons by 8' }], correctChoiceId: 'a', explanation: 'Equal groups of 8 are found by multiplication.' },
        { id: 'math-u03-l02-q10', type: 'fill-blank', conceptTag: 'real-world-pattern', reviewCardId: 'math-u03-l02-c3', prompt: 'A plant is 5 centimeters tall and grows 2 centimeters each week. After 4 weeks its height is ___ centimeters.', acceptedAnswers: ['13'], explanation: 'The rule is 5 + 2 × weeks, so 5 + 8 = 13.' },
        { id: 'math-u03-l02-q11', type: 'true-false', conceptTag: 'real-world-pattern', reviewCardId: 'math-u03-l02-c3', prompt: 'If every ticket costs $6, then 7 tickets cost $42.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'The rule is multiply the ticket count by 6, and 7 × 6 = 42.' },
        { id: 'math-u03-l02-q12', type: 'multiple-choice', conceptTag: 'real-world-pattern', reviewCardId: 'math-u03-l02-c3', prompt: 'A pattern starts at 12 shells and adds 3 shells each day. How many shells are there after 5 days of adding?', choices: [{ id: 'a', text: '27' }, { id: 'b', text: '15' }, { id: 'c', text: '20' }, { id: 'd', text: '60' }], correctChoiceId: 'a', explanation: 'Five increases of 3 add 15 to 12, giving 27.' },
        { id: 'math-u03-l02-q13', type: 'fill-blank', conceptTag: 'real-world-pattern', reviewCardId: 'math-u03-l02-c3', prompt: 'A row of 4 tables seats 16 people when each table seats the same number. The rule is multiply tables by ___.', acceptedAnswers: ['4'], explanation: 'Sixteen divided equally among 4 tables is 4 seats per table.' },
      ],
    },
  },
] satisfies Lesson[];
