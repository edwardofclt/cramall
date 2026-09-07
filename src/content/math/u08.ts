import type { Lesson } from '../schema';

export const unit08Lessons = [
  {
    id: 'math-u08-l01',
    unitId: 'math-u08',
    title: 'Tenths and Hundredths as Fractions and Decimals',
    indicatorCodes: ['4.NR.2.1'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Tenths and hundredths can be named with fractions, decimals, words, and models.' },
      { speaker: 'kid', text: 'The first digit after the decimal point names tenths.' },
      { speaker: 'nutty', pose: 'cheer', text: 'The second digit names hundredths.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will connect all representations of the same amount.' },
    ],
    learnCards: [
      {
        id: 'math-u08-l01-c1',
        title: 'Represent Tenths',
        blocks: [
          { kind: 'text', text: 'A whole divided into 10 equal parts has tenths; one selected part is 1/10 or 0.1.' },
          { kind: 'example', text: 'Seven tenths is 7/10, 0.7, and “seven tenths.”' },
          { kind: 'tip', text: 'Write a zero before the decimal point for amounts less than 1.' },
        ],
      },
      {
        id: 'math-u08-l01-c2',
        title: 'Represent Hundredths',
        blocks: [
          { kind: 'text', text: 'A whole divided into 100 equal parts has hundredths; one selected part is 1/100 or 0.01.' },
          { kind: 'example', text: 'Thirty-five hundredths is 35/100 or 0.35.' },
          { kind: 'tip', text: 'In 0.35, the 3 is 3 tenths and the 5 is 5 hundredths.' },
        ],
      },
      {
        id: 'math-u08-l01-c3',
        title: 'Connect Fraction Words, Models, and Decimals',
        blocks: [
          { kind: 'text', text: 'Equivalent tenths and hundredths can name the same decimal value.' },
          { kind: 'example', text: '4/10 = 40/100 = 0.4 = 0.40.' },
          { kind: 'tip', text: 'Count the equal parts in the model before choosing the denominator.' },
        ],
        widget: { type: 'number-line-compare', config: { min: 0, max: 1, a: 0.1, b: 0.35, step: 0.01, display: 'fraction', denominator: 100 } },
        widgetCoach: {
          intro: [
            { speaker: 'guide', pose: 'think', text: 'Use the hundredths line to compare these amounts. You can move a marker to make another comparison.' },
            { speaker: 'kid', text: 'I will read each marker in hundredths and compare its position.' },
          ],
          reactions: {
            strategy: { text: 'Read the tenths landmarks, then the exact hundredths at the markers.', pose: 'think' },
            retry: { text: 'Use the same hundredth-size spaces to compare both markers.', pose: 'oops' },
            milestone: { text: 'The landmarks help you connect fraction and decimal amounts.', pose: 'think' },
            complete: { text: 'Your comparison matches the current hundredths shown on the line.', pose: 'cheer' },
          },
        },
      },
    ],
    workedExample: {
      title: 'Represent sixty-two hundredths',
      steps: [
        'The words name 62 selected parts out of 100, so write 62/100.',
        'In decimal notation, hundredths occupy two places after the decimal: 0.62.',
        'A hundred-grid model would shade 62 of 100 equal squares.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u08-l01-q01', type: 'multiple-choice', conceptTag: 'tenths-representation', reviewCardId: 'math-u08-l01-c1', prompt: 'Which decimal represents 7/10?', choices: [{ id: 'a', text: '0.7' }, { id: 'b', text: '0.07' }, { id: 'c', text: '7.0' }, { id: 'd', text: '0.17' }], correctChoiceId: 'a', explanation: 'Seven tenths places 7 in the tenths place.' },
        { id: 'math-u08-l01-q02', type: 'fill-blank', conceptTag: 'tenths-representation', reviewCardId: 'math-u08-l01-c1', prompt: 'Write nine tenths as a decimal.', acceptedAnswers: ['0.9'], explanation: 'Nine tenths is 9/10 or 0.9.' },
        { id: 'math-u08-l01-q03', type: 'true-false', conceptTag: 'tenths-representation', reviewCardId: 'math-u08-l01-c1', prompt: 'A model with 4 of 10 equal strips shaded represents 0.4.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Four tenths is written 0.4.' },
        { id: 'math-u08-l01-q04', type: 'multiple-choice', conceptTag: 'tenths-representation', reviewCardId: 'math-u08-l01-c1', prompt: 'Which words name 0.3?', choices: [{ id: 'a', text: 'Three tenths' }, { id: 'b', text: 'Three hundredths' }, { id: 'c', text: 'Thirty hundredths and three tenths' }, { id: 'd', text: 'Three wholes' }], correctChoiceId: 'a', explanation: 'The 3 is in the tenths place.' },
        { id: 'math-u08-l01-q05', type: 'multiple-choice', conceptTag: 'hundredths-representation', reviewCardId: 'math-u08-l01-c2', prompt: 'Which fraction represents 0.46?', choices: [{ id: 'a', text: '46/100' }, { id: 'b', text: '46/10' }, { id: 'c', text: '4/6' }, { id: 'd', text: '6/100' }], correctChoiceId: 'a', explanation: 'Forty-six hundredths is 46 out of 100 parts.' },
        { id: 'math-u08-l01-q06', type: 'fill-blank', conceptTag: 'hundredths-representation', reviewCardId: 'math-u08-l01-c2', prompt: 'Write 8/100 as a decimal.', acceptedAnswers: ['0.08'], explanation: 'Eight hundredths needs a zero in the tenths place.' },
        { id: 'math-u08-l01-q07', type: 'true-false', conceptTag: 'hundredths-representation', reviewCardId: 'math-u08-l01-c2', prompt: 'In 0.72, the digit 2 represents two hundredths.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'The second digit after the decimal is the hundredths place.' },
        { id: 'math-u08-l01-q08', type: 'multiple-choice', conceptTag: 'hundredths-representation', reviewCardId: 'math-u08-l01-c2', prompt: 'A hundred grid has 63 squares shaded. Which decimal matches?', choices: [{ id: 'a', text: '0.63' }, { id: 'b', text: '6.3' }, { id: 'c', text: '0.063' }, { id: 'd', text: '0.36' }], correctChoiceId: 'a', explanation: 'Sixty-three of 100 equal parts is 63/100 or 0.63.' },
        { id: 'math-u08-l01-q09', type: 'multiple-choice', conceptTag: 'decimal-notation', reviewCardId: 'math-u08-l01-c3', prompt: 'Which set contains equivalent representations?', choices: [{ id: 'a', text: '4/10, 40/100, 0.4' }, { id: 'b', text: '4/10, 4/100, 0.04' }, { id: 'c', text: '40/10, 4/100, 0.4' }, { id: 'd', text: '4/10, 40/100, 4.0' }], correctChoiceId: 'a', explanation: 'Four tenths equals forty hundredths and 0.4.' },
        { id: 'math-u08-l01-q10', type: 'fill-blank', conceptTag: 'decimal-notation', reviewCardId: 'math-u08-l01-c3', prompt: 'Write “thirty-five hundredths” as a decimal.', acceptedAnswers: ['0.35'], explanation: 'Thirty-five hundredths places 35 after the decimal point.' },
        { id: 'math-u08-l01-q11', type: 'true-false', conceptTag: 'decimal-notation', reviewCardId: 'math-u08-l01-c3', prompt: '0.50 and 5/10 represent the same amount.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Fifty hundredths equals five tenths.' },
        { id: 'math-u08-l01-q12', type: 'multiple-choice', conceptTag: 'decimal-notation', reviewCardId: 'math-u08-l01-c3', prompt: 'A point is located at 0.2 on a number line from 0 to 1. Which fraction names the point?', choices: [{ id: 'a', text: '2/10' }, { id: 'b', text: '2/100' }, { id: 'c', text: '20/10' }, { id: 'd', text: '1/2' }], correctChoiceId: 'a', explanation: 'Two tenths is written 0.2.' },
        { id: 'math-u08-l01-q13', type: 'multiple-choice', conceptTag: 'decimal-notation', reviewCardId: 'math-u08-l01-c3', prompt: 'Which model description represents 0.07?', choices: [{ id: 'a', text: '7 of 100 equal parts shaded' }, { id: 'b', text: '7 of 10 equal parts shaded' }, { id: 'c', text: '70 of 10 equal parts shaded' }, { id: 'd', text: '7 whole models shaded' }], correctChoiceId: 'a', explanation: 'Seven hundredths is 7 out of 100 equal parts.' },
      ],
    },
  },
  {
    id: 'math-u08-l02',
    unitId: 'math-u08',
    title: 'Compare Decimals with Benchmarks',
    indicatorCodes: ['4.NR.2.2'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Decimals can be compared with familiar benchmark points.' },
      { speaker: 'kid', text: 'Zero, 0.5, and 1.0 help us locate an amount quickly.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Area and number-line models reveal the size of tenths and hundredths.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will choose a comparison symbol and explain why it fits.' },
    ],
    learnCards: [
      {
        id: 'math-u08-l02-c1',
        title: 'Use 0, 0.5, and 1 as Benchmarks',
        blocks: [
          { kind: 'text', text: 'A decimal below 0.5 is less than one half; a decimal above 0.5 and below 1 lies between one half and one whole.' },
          { kind: 'example', text: '0.48 is just below 0.5, while 0.52 is just above 0.5.' },
          { kind: 'tip', text: 'Write 1.0 to emphasize that one whole equals ten tenths or one hundred hundredths.' },
        ],
        widget: { type: 'number-line-compare', config: { min: 0, max: 1, a: 0.48, b: 0.52, step: 0.01, display: 'number' } },
        widgetCoach: {
          intro: [
            { speaker: 'guide', pose: 'think', text: 'Use one half as a landmark to compare 0.48 and 0.52. Then try moving a marker.' },
            { speaker: 'kid', text: 'I will compare both positions with the half-way point before choosing a symbol.' },
          ],
          reactions: {
            strategy: { text: 'Moving a marker changes the question. Read the current decimals again.', pose: 'think' },
            retry: { text: 'Check the positions relative to one half and to each other.', pose: 'oops' },
            milestone: { text: 'You used a landmark to compare the current decimals.', pose: 'think' },
            complete: { text: 'Your symbol matches the current decimal positions on the line.', pose: 'cheer' },
          },
        },
      },
      {
        id: 'math-u08-l02-c2',
        title: 'Read Concrete, Area, and Linear Models',
        blocks: [
          { kind: 'text', text: 'A concrete base-ten model can use a flat for 1 whole, a rod for 1 tenth, and a small square for 1 hundredth.' },
          { kind: 'example', text: 'Six rods and 4 small squares show 0.64, while an area grid or number line can show the same amount.' },
          { kind: 'tip', text: 'Define the same-sized whole and the same scale before comparing concrete, area, or linear models.' },
        ],
      },
      {
        id: 'math-u08-l02-c3',
        title: 'Choose and Justify a Comparison Symbol',
        blocks: [
          { kind: 'text', text: 'Compare ones first, then tenths, then hundredths; use = (is equal to), < (is less than), or > (is greater than).' },
          { kind: 'example', text: '0.70 = 0.7, read as “zero point seven zero is equal to zero point seven,” because the extra zero does not change the value.' },
          { kind: 'tip', text: 'State the first place where the digits differ or cite a benchmark/model.' },
        ],
      },
    ],
    workedExample: {
      title: 'Compare 0.58 and 0.6',
      steps: [
        'Write 0.6 as 0.60 so both numbers show hundredths.',
        'The tenths digits are 5 and 6; because 5 tenths is less than 6 tenths, 0.58 is smaller.',
        'On a 0-to-1 number line, 0.58 lies left of 0.60, so 0.58 < 0.6, read as “zero point five eight is less than zero point six.”',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u08-l02-q01', type: 'multiple-choice', conceptTag: 'decimal-benchmarks', reviewCardId: 'math-u08-l02-c1', prompt: 'Which decimal is greater than 0.5?', choices: [{ id: 'a', text: '0.62' }, { id: 'b', text: '0.48' }, { id: 'c', text: '0.05' }, { id: 'd', text: '0.50' }], correctChoiceId: 'a', explanation: 'Sixty-two hundredths is above the one-half benchmark.' },
        { id: 'math-u08-l02-q02', type: 'fill-blank', conceptTag: 'decimal-benchmarks', reviewCardId: 'math-u08-l02-c1', prompt: 'Complete with < (is less than), > (is greater than), or = (is equal to): 0.49 ___ 0.5.', acceptedAnswers: ['<'], explanation: 'Forty-nine hundredths is one hundredth below 0.50.' },
        { id: 'math-u08-l02-q03', type: 'true-false', conceptTag: 'decimal-benchmarks', reviewCardId: 'math-u08-l02-c1', prompt: '0.93 lies between 0.5 and 1.0.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Ninety-three hundredths is more than one half but less than one whole.' },
        { id: 'math-u08-l02-q04', type: 'multiple-choice', conceptTag: 'decimal-benchmarks', reviewCardId: 'math-u08-l02-c1', prompt: 'Which decimal is closest to 0?', choices: [{ id: 'a', text: '0.08' }, { id: 'b', text: '0.18' }, { id: 'c', text: '0.80' }, { id: 'd', text: '0.81' }], correctChoiceId: 'a', explanation: 'Eight hundredths has the least distance from 0.' },
        { id: 'math-u08-l02-q05', type: 'multiple-choice', conceptTag: 'decimal-models', reviewCardId: 'math-u08-l02-c2', prompt: 'One grid shows 54 of 100 squares shaded. Another same-sized grid shows 6 of 10 strips shaded. Which comparison is true?', choices: [{ id: 'a', text: '0.54 < 0.6 (0.54 is less than 0.6)' }, { id: 'b', text: '0.54 > 0.6 (0.54 is greater than 0.6)' }, { id: 'c', text: '0.54 = 0.6 (0.54 is equal to 0.6)' }, { id: 'd', text: 'The models cannot be compared.' }], correctChoiceId: 'a', explanation: 'Six tenths is 60 hundredths, which is greater than 54 hundredths.' },
        { id: 'math-u08-l02-q06', type: 'fill-blank', conceptTag: 'decimal-models', reviewCardId: 'math-u08-l02-c2', prompt: 'A point at 0.75 is ___ hundredths from 0.', acceptedAnswers: ['75'], explanation: 'The decimal 0.75 represents seventy-five hundredths.' },
        { id: 'math-u08-l02-q07', type: 'true-false', conceptTag: 'decimal-models', reviewCardId: 'math-u08-l02-c2', prompt: 'On the same 0-to-1 number line, 0.37 is to the right of 0.4.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'false', explanation: 'Thirty-seven hundredths is less than 40 hundredths, so it lies left of 0.4.' },
        { id: 'math-u08-l02-q08', type: 'multiple-choice', conceptTag: 'decimal-models', reviewCardId: 'math-u08-l02-c2', prompt: 'If one flat is 1 whole, each rod is 1 tenth, and each small square is 1 hundredth, which concrete base-ten model represents 0.68?', choices: [{ id: 'a', text: '6 rods and 8 small squares' }, { id: 'b', text: '6 rods and 8 flats' }, { id: 'c', text: '8 rods and 6 small squares' }, { id: 'd', text: '68 rods' }], correctChoiceId: 'a', explanation: 'Six rods represent six tenths, and 8 small squares represent eight hundredths.' },
        { id: 'math-u08-l02-q09', type: 'multiple-choice', conceptTag: 'decimal-comparison', reviewCardId: 'math-u08-l02-c3', prompt: 'Which comparison is true when each symbol is read as its spoken name?', choices: [{ id: 'a', text: '0.70 = 0.7 (0.70 is equal to 0.7)' }, { id: 'b', text: '0.70 < 0.7 (0.70 is less than 0.7)' }, { id: 'c', text: '0.70 > 0.7 (0.70 is greater than 0.7)' }, { id: 'd', text: '0.70 = 0.07 (0.70 is equal to 0.07)' }], correctChoiceId: 'a', explanation: 'A trailing zero does not change seven tenths.' },
        { id: 'math-u08-l02-q10', type: 'sort', conceptTag: 'decimal-comparison', reviewCardId: 'math-u08-l02-c3', prompt: 'Order the decimals from least to greatest.', items: [{ id: 'a', text: '0.09' }, { id: 'b', text: '0.4' }, { id: 'c', text: '0.52' }, { id: 'd', text: '0.90' }], correctOrder: ['a', 'b', 'c', 'd'], explanation: 'Nine hundredths is least, followed by four tenths, fifty-two hundredths, and nine tenths.' },
        { id: 'math-u08-l02-q11', type: 'true-false', conceptTag: 'decimal-comparison', reviewCardId: 'math-u08-l02-c3', prompt: '0.58 < 0.6, read as “0.58 is less than 0.6,” is true.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Fifty-eight hundredths is less than 60 hundredths.' },
        { id: 'math-u08-l02-q12', type: 'multiple-choice', conceptTag: 'decimal-comparison', reviewCardId: 'math-u08-l02-c3', prompt: 'Why is 0.36 greater than 0.29?', choices: [{ id: 'a', text: 'The tenths digits differ, and 3 tenths is greater than 2 tenths.' }, { id: 'b', text: 'The hundredths digit 6 is less than 9.' }, { id: 'c', text: 'Thirty-six has fewer digits.' }, { id: 'd', text: 'Both numbers are greater than 1.' }], correctChoiceId: 'a', explanation: 'The first different place is tenths, where 3 > 2.' },
        { id: 'math-u08-l02-q13', type: 'fill-blank', conceptTag: 'decimal-comparison', reviewCardId: 'math-u08-l02-c3', prompt: 'Complete with < (is less than), > (is greater than), or = (is equal to): 0.84 ___ 0.48.', acceptedAnswers: ['>'], explanation: 'Eight tenths is greater than four tenths.' },
      ],
    },
  },
  {
    id: 'math-u08-l03',
    unitId: 'math-u08',
    title: 'Add and Subtract Tenths and Hundredths',
    indicatorCodes: ['4.PAFR.2.2'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Decimal operations can be explained with fraction parts.' },
      { speaker: 'kid', text: 'Tenths combine with tenths, and hundredths combine with hundredths.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Equivalent fractions help when the parts are written in different forms.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will also operate with amounts greater than one whole.' },
    ],
    learnCards: [
      {
        id: 'math-u08-l03-c1',
        title: 'Connect Fraction and Decimal Equivalents',
        blocks: [
          { kind: 'text', text: 'Rewrite tenths and hundredths in a common form before operating.' },
          { kind: 'example', text: '0.4 = 4/10 = 40/100, and 0.07 = 7/100.' },
          { kind: 'tip', text: 'Align decimal points because they separate whole units from fractional place values.' },
        ],
      },
      {
        id: 'math-u08-l03-c2',
        title: 'Add or Subtract Decimal Parts',
        blocks: [
          { kind: 'text', text: 'Combine like place-value parts and regroup 10 hundredths as 1 tenth when needed.' },
          { kind: 'example', text: '0.35 + 0.27 = 35/100 + 27/100 = 62/100 = 0.62.' },
          { kind: 'tip', text: 'Estimate with 0, 0.5, and 1 to check the result’s size.' },
        ],
      },
      {
        id: 'math-u08-l03-c3',
        title: 'Operate with Mixed Quantities',
        blocks: [
          { kind: 'text', text: 'Separate whole-number and fractional parts or rename across a whole.' },
          { kind: 'example', text: 'A bar model shows 1 3/10 + 7/10 = 2 because the 10 tenths combine to make another whole.' },
          { kind: 'tip', text: 'A result greater than 1 may be written as a decimal, mixed number, or fraction greater than 1.' },
        ],
      },
    ],
    workedExample: {
      title: 'Find 1.25 + 0.6',
      steps: [
        'Rename 0.6 as 0.60 so both amounts show hundredths.',
        'Add 125/100 + 60/100 = 185/100.',
        'Write 185/100 as 1.85 and check that 1.25 + a little more than 0.5 should be a little more than 1.75.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u08-l03-q01', type: 'multiple-choice', conceptTag: 'fraction-decimal-equivalence', reviewCardId: 'math-u08-l03-c1', prompt: 'Which fraction is equivalent to 0.6?', choices: [{ id: 'a', text: '6/10' }, { id: 'b', text: '6/100' }, { id: 'c', text: '60/10' }, { id: 'd', text: '1/6' }], correctChoiceId: 'a', explanation: 'Six tenths is written 0.6.' },
        { id: 'math-u08-l03-q02', type: 'fill-blank', conceptTag: 'fraction-decimal-equivalence', reviewCardId: 'math-u08-l03-c1', prompt: 'Rewrite 0.45 as a fraction with denominator 100.', acceptedAnswers: ['45/100'], explanation: 'Forty-five hundredths is 45/100.' },
        { id: 'math-u08-l03-q03', type: 'true-false', conceptTag: 'fraction-decimal-equivalence', reviewCardId: 'math-u08-l03-c1', prompt: '0.3 and 30/100 are equivalent.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Three tenths equals thirty hundredths.' },
        { id: 'math-u08-l03-q04', type: 'multiple-choice', conceptTag: 'fraction-decimal-equivalence', reviewCardId: 'math-u08-l03-c1', prompt: 'Which common form helps add 0.4 + 0.07?', choices: [{ id: 'a', text: '40/100 + 7/100' }, { id: 'b', text: '4/10 + 7/10' }, { id: 'c', text: '4/100 + 7/100' }, { id: 'd', text: '40/10 + 7/100' }], correctChoiceId: 'a', explanation: 'Renaming 0.4 as 40/100 creates like denominators.' },
        { id: 'math-u08-l03-q05', type: 'multiple-choice', conceptTag: 'decimal-operation', reviewCardId: 'math-u08-l03-c2', prompt: 'What is 0.35 + 0.27?', choices: [{ id: 'a', text: '0.62' }, { id: 'b', text: '0.52' }, { id: 'c', text: '0.612' }, { id: 'd', text: '0.08' }], correctChoiceId: 'a', explanation: 'Thirty-five hundredths plus 27 hundredths is 62 hundredths.' },
        { id: 'math-u08-l03-q06', type: 'fill-blank', conceptTag: 'decimal-operation', reviewCardId: 'math-u08-l03-c2', prompt: 'Complete: 0.90 - 0.34 = ___.', acceptedAnswers: ['0.56'], explanation: 'Ninety hundredths minus 34 hundredths is 56 hundredths.' },
        { id: 'math-u08-l03-q07', type: 'true-false', conceptTag: 'decimal-operation', reviewCardId: 'math-u08-l03-c2', prompt: '0.8 + 0.5 = 1.3.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Eight tenths plus five tenths is 13 tenths, or 1.3.' },
        { id: 'math-u08-l03-q08', type: 'multiple-choice', conceptTag: 'decimal-operation', reviewCardId: 'math-u08-l03-c2', prompt: 'What is 0.72 - 0.08?', choices: [{ id: 'a', text: '0.64' }, { id: 'b', text: '0.80' }, { id: 'c', text: '0.70' }, { id: 'd', text: '0.14' }], correctChoiceId: 'a', explanation: 'Seventy-two hundredths minus 8 hundredths is 64 hundredths.' },
        { id: 'math-u08-l03-q09', type: 'multiple-choice', conceptTag: 'decimal-mixed-quantity', reviewCardId: 'math-u08-l03-c3', prompt: 'What is 1 3/10 + 7/10?', choices: [{ id: 'a', text: '2' }, { id: 'b', text: '1 10/20' }, { id: 'c', text: '1 1/10' }, { id: 'd', text: '8/10' }], correctChoiceId: 'a', explanation: 'Three tenths plus seven tenths makes one more whole, so the total is 2.' },
        { id: 'math-u08-l03-q10', type: 'fill-blank', conceptTag: 'decimal-mixed-quantity', reviewCardId: 'math-u08-l03-c3', prompt: 'Complete: 1.25 + 0.60 = ___.', acceptedAnswers: ['1.85'], explanation: 'One hundred twenty-five hundredths plus 60 hundredths is 185 hundredths.' },
        { id: 'math-u08-l03-q11', type: 'true-false', conceptTag: 'decimal-mixed-quantity', reviewCardId: 'math-u08-l03-c3', prompt: '3.02 - 0.18 = 2.84.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Three hundred two hundredths minus 18 hundredths is 284 hundredths.' },
        { id: 'math-u08-l03-q12', type: 'multiple-choice', conceptTag: 'decimal-mixed-quantity', reviewCardId: 'math-u08-l03-c3', prompt: 'A bottle contains 1.4 liters and 0.35 liter is added. How much is in the bottle?', choices: [{ id: 'a', text: '1.75 liters' }, { id: 'b', text: '1.45 liters' }, { id: 'c', text: '1.05 liters' }, { id: 'd', text: '1.39 liters' }], correctChoiceId: 'a', explanation: 'Rename 1.4 as 1.40; adding 0.35 gives 1.75.' },
        { id: 'math-u08-l03-q13', type: 'multiple-choice', conceptTag: 'decimal-mixed-quantity', reviewCardId: 'math-u08-l03-c3', prompt: 'Which estimate supports 2.48 + 0.51 = 2.99?', choices: [{ id: 'a', text: 'About 2.5 + 0.5 = 3' }, { id: 'b', text: 'About 2 + 0 = 2' }, { id: 'c', text: 'About 25 + 5 = 30' }, { id: 'd', text: 'About 2.5 - 0.5 = 2' }], correctChoiceId: 'a', explanation: 'The exact sum 2.99 is close to the benchmark estimate 3.' },
      ],
    },
  },
] satisfies Lesson[];
