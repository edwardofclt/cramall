import type { Lesson } from '../schema';

export const unit07Lessons = [
  {
    id: 'math-u07-l01',
    unitId: 'math-u07',
    title: 'Add and Subtract Like-Denominator Fractions',
    indicatorCodes: ['4.PAFR.2.1'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Equal-sized fraction pieces can be joined or removed.' },
      { speaker: 'kid', text: 'Because the part size stays the same, the denominator stays the same.' },
      { speaker: 'nutty', pose: 'cheer', text: 'A model can show the operation before we calculate.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Benchmarks help us decide whether the result is reasonable.' },
    ],
    learnCards: [
      {
        id: 'math-u07-l01-c1',
        title: 'Model a Fraction Operation',
        blocks: [
          { kind: 'text', text: 'Use a bar model or number line to show equal-sized parts being joined or removed.' },
          { kind: 'example', text: 'A bar model with 3 of 8 parts selected gains 2 more eighths, showing 5/8.' },
          { kind: 'tip', text: 'Describe the start, the change, and the result so the model matches the equation.' },
        ],
        widget: { type: 'fraction-models', config: { mode: 'bars', denominator: 8, numerator: 3, target: { numerator: 5, denominator: 8 }, allowEquivalent: false } },
      },
      {
        id: 'math-u07-l01-c2',
        title: 'Keep the Denominator',
        blocks: [
          { kind: 'text', text: 'For like denominators, add or subtract the numerators and keep the common denominator.' },
          { kind: 'example', text: '3/8 + 2/8 = 5/8 because three eighths and two eighths make five eighths.' },
          { kind: 'tip', text: 'The denominator names the part size; adding pieces does not change that size.' },
        ],
        widget: { type: 'fraction-models', config: { mode: 'circles', denominator: 8, numerator: 5, target: { numerator: 2, denominator: 8 }, allowEquivalent: false } },
      },
      {
        id: 'math-u07-l01-c3',
        title: 'Apply and Justify the Result',
        blocks: [
          { kind: 'text', text: 'In a measurement situation, identify the starting amount and the fraction joined or removed.' },
          { kind: 'example', text: 'A jug with 8/10 liter loses 3/10 liter, so 5/10 liter remains.' },
          { kind: 'tip', text: 'A positive addend should not make a sum smaller, and subtracting a positive amount should not make a difference larger.' },
        ],
        widget: { type: 'fraction-models', config: { mode: 'bars', denominator: 10, numerator: 8, target: { numerator: 5, denominator: 10 }, allowEquivalent: false } },
      },
    ],
    workedExample: {
      title: 'Find and justify 11/12 - 5/12',
      steps: [
        'The denominators match, so remove 5 of the 11 twelfth-size parts.',
        'Subtract numerators: 11 - 5 = 6, giving 6/12.',
        'Six twelfths equals 1/2, which is reasonable because about half of 11/12 was removed.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u07-l01-q01', type: 'multiple-choice', conceptTag: 'like-denominator', reviewCardId: 'math-u07-l01-c2', prompt: 'What is 3/8 + 2/8?', choices: [{ id: 'a', text: '5/8' }, { id: 'b', text: '5/16' }, { id: 'c', text: '1/8' }, { id: 'd', text: '6/8' }], correctChoiceId: 'a', explanation: 'The five selected parts are still eighths.' },
        { id: 'math-u07-l01-q02', type: 'fill-blank', conceptTag: 'like-denominator', reviewCardId: 'math-u07-l01-c2', prompt: 'Give the answer as a fraction with denominator 10: 9/10 - 4/10 = ___.', acceptedAnswers: ['5/10'], explanation: 'Subtracting the numerators gives five tenths.' },
        { id: 'math-u07-l01-q03', type: 'true-false', conceptTag: 'like-denominator', reviewCardId: 'math-u07-l01-c2', prompt: '2/5 + 1/5 = 3/5.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Two fifths plus one fifth makes three fifths.' },
        { id: 'math-u07-l01-q04', type: 'multiple-choice', conceptTag: 'like-denominator', reviewCardId: 'math-u07-l01-c2', prompt: 'What is 7/12 - 3/12?', choices: [{ id: 'a', text: '4/12' }, { id: 'b', text: '4/9' }, { id: 'c', text: '10/12' }, { id: 'd', text: '3/12' }], correctChoiceId: 'a', explanation: 'Seven twelfths minus three twelfths leaves four twelfths.' },
        { id: 'math-u07-l01-q05', type: 'multiple-choice', conceptTag: 'fraction-operation-model', reviewCardId: 'math-u07-l01-c1', prompt: 'A bar has 3 of 8 parts shaded, then 4 more eighths are shaded. Which equation matches?', choices: [{ id: 'a', text: '3/8 + 4/8 = 7/8' }, { id: 'b', text: '3/8 + 4/8 = 7/16' }, { id: 'c', text: '4/8 - 3/8 = 1/8' }, { id: 'd', text: '3/4 + 4/8 = 7/8' }], correctChoiceId: 'a', explanation: 'The same whole gains four more eighth-size parts.' },
        { id: 'math-u07-l01-q06', type: 'fill-blank', conceptTag: 'fraction-operation-model', reviewCardId: 'math-u07-l01-c1', prompt: 'Start at 2/6 on a number line and move forward 3/6. Where do you land?', acceptedAnswers: ['5/6'], explanation: 'Two sixths plus three sixths equals five sixths.' },
        { id: 'math-u07-l01-q07', type: 'true-false', conceptTag: 'fraction-operation-model', reviewCardId: 'math-u07-l01-c1', prompt: 'Removing 2/4 from 7/4 leaves 5/4.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Seven fourths minus two fourths equals five fourths.' },
        { id: 'math-u07-l01-q08', type: 'multiple-choice', conceptTag: 'fraction-operation-model', reviewCardId: 'math-u07-l01-c1', prompt: 'Which story matches 9/10 - 3/10?', choices: [{ id: 'a', text: 'A ribbon is 9/10 meter long, then 3/10 meter is cut away.' }, { id: 'b', text: 'Nine ribbons are joined to three ribbons.' }, { id: 'c', text: 'Three tenths is divided into nine groups.' }, { id: 'd', text: 'Nine tenths is compared with three fifths.' }], correctChoiceId: 'a', explanation: 'The story begins with nine tenths of a meter and removes three tenths of a meter.' },
        { id: 'math-u07-l01-q09', type: 'multiple-choice', conceptTag: 'fraction-reasonableness', reviewCardId: 'math-u07-l01-c3', prompt: 'Which result is reasonable for 7/10 + 2/10?', choices: [{ id: 'a', text: '9/10' }, { id: 'b', text: '9/20' }, { id: 'c', text: '5/10' }, { id: 'd', text: '1/10' }], correctChoiceId: 'a', explanation: 'The sum is two tenths more than seven tenths and remains just below 1.' },
        { id: 'math-u07-l01-q10', type: 'fill-blank', conceptTag: 'fraction-reasonableness', reviewCardId: 'math-u07-l01-c3', prompt: 'Give the answer as a fraction with denominator 8: 13/8 - 4/8 = ___.', acceptedAnswers: ['9/8'], explanation: 'Subtracting the numerators leaves nine eighths.' },
        { id: 'math-u07-l01-q11', type: 'true-false', conceptTag: 'fraction-reasonableness', reviewCardId: 'math-u07-l01-c3', prompt: '5/6 + 4/6 = 9/12 is reasonable.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'false', explanation: 'The denominator should remain 6, so the sum is 9/6, which is greater than 1.' },
        { id: 'math-u07-l01-q12', type: 'multiple-choice', conceptTag: 'fraction-reasonableness', reviewCardId: 'math-u07-l01-c3', prompt: 'Why is 2/5 a reasonable answer for 7/5 - 5/5?', choices: [{ id: 'a', text: 'Removing one whole from 1 2/5 leaves 2/5.' }, { id: 'b', text: 'A difference must always be greater than 1.' }, { id: 'c', text: 'The denominators should be subtracted.' }, { id: 'd', text: 'Seven minus 5 changes fifths into halves.' }], correctChoiceId: 'a', explanation: 'Five fifths is one whole, leaving the two remaining fifths.' },
        { id: 'math-u07-l01-q13', type: 'multiple-choice', conceptTag: 'fraction-reasonableness', reviewCardId: 'math-u07-l01-c3', prompt: 'A jug contains 8/10 liter and 3/10 liter is poured out. How much remains?', choices: [{ id: 'a', text: '5/10 liter' }, { id: 'b', text: '11/10 liters' }, { id: 'c', text: '5/20 liter' }, { id: 'd', text: '3/10 liter' }], correctChoiceId: 'a', explanation: 'Eight tenths minus three tenths leaves five tenths of a liter.' },
      ],
    },
  },
  {
    id: 'math-u07-l02',
    unitId: 'math-u07',
    title: 'Whole Number Times a Unit Fraction',
    indicatorCodes: ['4.PAFR.2.3'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Repeated equal fraction pieces can be written as multiplication.' },
      { speaker: 'kid', text: 'A unit fraction has numerator 1.' },
      { speaker: 'nutty', pose: 'cheer', text: 'The whole-number factor tells how many copies of that unit fraction we have.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will model, compute, and use these products in situations.' },
    ],
    learnCards: [
      {
        id: 'math-u07-l02-c1',
        title: 'See Equal Unit-Fraction Groups',
        blocks: [
          { kind: 'text', text: 'A whole number times a unit fraction means repeated addition of the same fractional part.' },
          { kind: 'example', text: '3 × 1/4 = 1/4 + 1/4 + 1/4 = 3/4.' },
          { kind: 'tip', text: 'Keep the denominator because every group contains the same unit-size part.' },
        ],
        widget: { type: 'fraction-models', config: { mode: 'bars', denominator: 4, numerator: 0, target: { numerator: 3, denominator: 4 }, allowEquivalent: false } },
      },
      {
        id: 'math-u07-l02-c2',
        title: 'Compute the Product',
        blocks: [
          { kind: 'text', text: 'Multiply the whole number by the numerator 1 and keep the denominator.' },
          { kind: 'example', text: '7 × 1/5 = 7/5 = 1 2/5.' },
          { kind: 'tip', text: 'When the numerator reaches the denominator, regroup complete wholes.' },
        ],
        widget: { type: 'number-line-compare', config: { min: 0, max: 2.5, a: 0, b: 2.25, step: 0.25, display: 'fraction', denominator: 4 } },
      },
      {
        id: 'math-u07-l02-c3',
        title: 'Solve a Fraction Product Situation',
        blocks: [
          { kind: 'text', text: 'Look for equal groups that each contain one unit fraction of a whole.' },
          { kind: 'example', text: 'Six trail sections are each 1/8 mile, so the distance is 6 × 1/8 = 6/8 mile.' },
          { kind: 'tip', text: 'Label the result with the whole being measured, such as mile, cup, or meter.' },
        ],
        widget: { type: 'fraction-models', config: { mode: 'bars', denominator: 8, numerator: 0, target: { numerator: 6, denominator: 8 }, allowEquivalent: false } },
      },
    ],
    workedExample: {
      title: 'Find 9 × 1/4',
      steps: [
        'Write nine copies of one fourth as 9/4.',
        'Group 8/4 as two wholes, leaving 1/4.',
        'Therefore 9 × 1/4 = 9/4 = 2 1/4.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u07-l02-q01', type: 'multiple-choice', conceptTag: 'unit-fraction-groups', reviewCardId: 'math-u07-l02-c1', prompt: 'Which repeated addition equals 4 × 1/6?', choices: [{ id: 'a', text: '1/6 + 1/6 + 1/6 + 1/6' }, { id: 'b', text: '4/6 + 4/6' }, { id: 'c', text: '1/4 + 1/4 + 1/4 + 1/4' }, { id: 'd', text: '4 + 1/6' }], correctChoiceId: 'a', explanation: 'The factor 4 means four copies of one sixth.' },
        { id: 'math-u07-l02-q02', type: 'fill-blank', conceptTag: 'unit-fraction-groups', reviewCardId: 'math-u07-l02-c1', prompt: 'Three groups of 1/8 equal ___.', acceptedAnswers: ['3/8'], explanation: 'Three unit eighths make three eighths.' },
        { id: 'math-u07-l02-q03', type: 'true-false', conceptTag: 'unit-fraction-groups', reviewCardId: 'math-u07-l02-c1', prompt: '5 × 1/10 can be represented by shading 5 of 10 equal parts.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Five copies of one tenth equal five tenths.' },
        { id: 'math-u07-l02-q04', type: 'multiple-choice', conceptTag: 'unit-fraction-groups', reviewCardId: 'math-u07-l02-c1', prompt: 'Which model description matches 7 × 1/4?', choices: [{ id: 'a', text: 'Seven fourth-size pieces' }, { id: 'b', text: 'Four seventh-size pieces' }, { id: 'c', text: 'Seven whole groups of 4' }, { id: 'd', text: 'One piece split into 7 unequal parts' }], correctChoiceId: 'a', explanation: 'The product counts seven copies of one fourth.' },
        { id: 'math-u07-l02-q05', type: 'multiple-choice', conceptTag: 'unit-fraction-product', reviewCardId: 'math-u07-l02-c2', prompt: 'What is 6 × 1/5?', choices: [{ id: 'a', text: '6/5' }, { id: 'b', text: '6/30' }, { id: 'c', text: '1/30' }, { id: 'd', text: '5/6' }], correctChoiceId: 'a', explanation: 'Six copies of one fifth make six fifths.' },
        { id: 'math-u07-l02-q06', type: 'fill-blank', conceptTag: 'unit-fraction-product', reviewCardId: 'math-u07-l02-c2', prompt: 'Complete: 8 × 1/4 = ___ wholes.', acceptedAnswers: ['2'], explanation: 'Eight fourths regroup as two wholes.' },
        { id: 'math-u07-l02-q07', type: 'true-false', conceptTag: 'unit-fraction-product', reviewCardId: 'math-u07-l02-c2', prompt: '12 × 1/3 = 4.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Twelve thirds contain four groups of three thirds.' },
        { id: 'math-u07-l02-q08', type: 'multiple-choice', conceptTag: 'unit-fraction-product', reviewCardId: 'math-u07-l02-c2', prompt: 'What mixed number equals 9 × 1/4?', choices: [{ id: 'a', text: '2 1/4' }, { id: 'b', text: '1 2/4' }, { id: 'c', text: '2 4/1' }, { id: 'd', text: '9 1/4' }], correctChoiceId: 'a', explanation: 'Nine fourths contain two wholes and one fourth.' },
        { id: 'math-u07-l02-q09', type: 'multiple-choice', conceptTag: 'fraction-product-situation', reviewCardId: 'math-u07-l02-c3', prompt: 'Six trail sections are each 1/8 mile. What is their total length?', choices: [{ id: 'a', text: '6/8 mile' }, { id: 'b', text: '1/48 mile' }, { id: 'c', text: '6 miles' }, { id: 'd', text: '8/6 mile' }], correctChoiceId: 'a', explanation: 'Six equal sections of one eighth mile total six eighths mile.' },
        { id: 'math-u07-l02-q10', type: 'fill-blank', conceptTag: 'fraction-product-situation', reviewCardId: 'math-u07-l02-c3', prompt: 'Give the answer as a fraction with denominator 3: A recipe uses 1/3 cup of oats in each of 5 batches. It uses ___ cup in all.', acceptedAnswers: ['5/3'], explanation: 'Five copies of one third cup total five thirds cup.' },
        { id: 'math-u07-l02-q11', type: 'true-false', conceptTag: 'fraction-product-situation', reviewCardId: 'math-u07-l02-c3', prompt: 'Ten pieces that are each 1/10 meter long have a total length of 1 meter.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Ten tenths make one whole meter.' },
        { id: 'math-u07-l02-q12', type: 'multiple-choice', conceptTag: 'fraction-product-situation', reviewCardId: 'math-u07-l02-c3', prompt: 'Which equation represents 7 bags with 1/5 kilogram in each bag?', choices: [{ id: 'a', text: '7 × 1/5 = 7/5 kilograms' }, { id: 'b', text: '7 + 1/5 = 7 1/5 kilograms' }, { id: 'c', text: '1/5 ÷ 7 = 1/35 kilogram' }, { id: 'd', text: '7 × 5 = 35 kilograms' }], correctChoiceId: 'a', explanation: 'Seven equal one-fifth-kilogram groups give seven fifths kilogram.' },
        { id: 'math-u07-l02-q13', type: 'multiple-choice', conceptTag: 'fraction-product-situation', reviewCardId: 'math-u07-l02-c3', prompt: 'Four ribbons are each 1/2 yard. How many yards of ribbon are there?', choices: [{ id: 'a', text: '2 yards' }, { id: 'b', text: '4 1/2 yards' }, { id: 'c', text: '1/8 yard' }, { id: 'd', text: '8 yards' }], correctChoiceId: 'a', explanation: 'Four halves regroup as two wholes.' },
      ],
    },
  },
  {
    id: 'math-u07-l03',
    unitId: 'math-u07',
    title: 'Fractions as Equal-Sharing Division',
    indicatorCodes: ['4.PAFR.2.4'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'A fraction can describe fair sharing.' },
      { speaker: 'kid', text: 'The numerator is the quantity being shared.' },
      { speaker: 'nutty', pose: 'cheer', text: 'The denominator is the number of equal shares.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will connect a sharing story, a division expression, and the amount in each share.' },
    ],
    learnCards: [
      {
        id: 'math-u07-l03-c1',
        title: 'Describe an Equal-Sharing Situation',
        blocks: [
          { kind: 'text', text: 'The fraction a/b represents a ÷ b: a units shared equally among b recipients.' },
          { kind: 'example', text: 'Three brownies shared among 4 learners gives 3 ÷ 4 = 3/4 brownie per learner.' },
          { kind: 'tip', text: 'Every recipient must receive the same amount.' },
        ],
        widget: { type: 'fraction-models', config: { mode: 'circles', denominator: 6, numerator: 0, target: { numerator: 5, denominator: 6 }, allowEquivalent: false } },
      },
      {
        id: 'math-u07-l03-c2',
        title: 'Connect Numerator and Quantity',
        blocks: [
          { kind: 'text', text: 'The numerator names how many whole units are available to share.' },
          { kind: 'example', text: 'In 5/6, five is the number of whole units divided among the shares.' },
          { kind: 'tip', text: 'Changing the numerator changes the total quantity being shared.' },
        ],
        widget: { type: 'array-builder', config: { rows: 1, columns: 3, targetProduct: 12, editable: true } },
      },
      {
        id: 'math-u07-l03-c3',
        title: 'Connect Denominator and Shares',
        blocks: [
          { kind: 'text', text: 'The denominator names how many equal shares are made.' },
          { kind: 'example', text: 'For 5 ÷ 6, each of 6 shares receives 5/6 of one unit.' },
          { kind: 'tip', text: 'More equal shares from the same quantity make each share smaller.' },
        ],
        widget: { type: 'number-line-compare', config: { min: 0, max: 1, a: 0.5, b: 0.25, step: 0.25, display: 'fraction', denominator: 4 } },
      },
    ],
    workedExample: {
      title: 'Share 7 granola bars among 4 hikers',
      steps: [
        'The total quantity is 7 bars, so 7 is the numerator.',
        'There are 4 equal shares, so 4 is the denominator.',
        'Each hiker receives 7 ÷ 4 = 7/4 = 1 3/4 bars.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u07-l03-q01', type: 'multiple-choice', conceptTag: 'sharing-situation', reviewCardId: 'math-u07-l03-c1', prompt: 'Which story represents 3/4?', choices: [{ id: 'a', text: 'Three pizzas shared equally among 4 families' }, { id: 'b', text: 'Four pizzas shared among 3 families' }, { id: 'c', text: 'Three fourths added to 4 wholes' }, { id: 'd', text: 'One pizza cut into 3 unequal parts' }], correctChoiceId: 'a', explanation: 'The numerator 3 is shared among the denominator 4.' },
        { id: 'math-u07-l03-q02', type: 'fill-blank', conceptTag: 'sharing-situation', reviewCardId: 'math-u07-l03-c1', prompt: 'Five sandwiches shared equally among 6 hikers gives each hiker ___ sandwich.', acceptedAnswers: ['5/6'], explanation: 'Five divided by 6 is five sixths.' },
        { id: 'math-u07-l03-q03', type: 'true-false', conceptTag: 'sharing-situation', reviewCardId: 'math-u07-l03-c1', prompt: 'The fraction 7/8 can represent 7 yards of ribbon shared equally among 8 people.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Each person receives 7 ÷ 8 = 7/8 yard.' },
        { id: 'math-u07-l03-q04', type: 'multiple-choice', conceptTag: 'sharing-situation', reviewCardId: 'math-u07-l03-c1', prompt: 'Which division expression matches 9/5?', choices: [{ id: 'a', text: '9 ÷ 5' }, { id: 'b', text: '5 ÷ 9' }, { id: 'c', text: '9 × 5' }, { id: 'd', text: '9 - 5' }], correctChoiceId: 'a', explanation: 'A fraction bar means numerator divided by denominator.' },
        { id: 'math-u07-l03-q05', type: 'multiple-choice', conceptTag: 'numerator-quantity', reviewCardId: 'math-u07-l03-c2', prompt: 'In 4/7, what does the numerator 4 represent in a sharing story?', choices: [{ id: 'a', text: 'The total quantity being shared' }, { id: 'b', text: 'The number of equal shares' }, { id: 'c', text: 'The size of one whole' }, { id: 'd', text: 'The number left over' }], correctChoiceId: 'a', explanation: 'The numerator gives the amount available before sharing.' },
        { id: 'math-u07-l03-q06', type: 'fill-blank', conceptTag: 'numerator-quantity', reviewCardId: 'math-u07-l03-c2', prompt: 'Eight liters are shared equally among 5 containers. The numerator of the amount in each container is ___.', acceptedAnswers: ['8'], explanation: 'The 8 liters are the quantity being shared.' },
        { id: 'math-u07-l03-q07', type: 'true-false', conceptTag: 'numerator-quantity', reviewCardId: 'math-u07-l03-c2', prompt: 'In 2/3, the numerator says that 2 whole units are being shared.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Two is the starting quantity in 2 ÷ 3.' },
        { id: 'math-u07-l03-q08', type: 'multiple-choice', conceptTag: 'numerator-quantity', reviewCardId: 'math-u07-l03-c2', prompt: 'Which fraction describes each share when 11 crackers are shared among 6 learners?', choices: [{ id: 'a', text: '11/6' }, { id: 'b', text: '6/11' }, { id: 'c', text: '5/6' }, { id: 'd', text: '17/6' }], correctChoiceId: 'a', explanation: 'The 11 crackers are divided among 6 equal shares.' },
        { id: 'math-u07-l03-q09', type: 'multiple-choice', conceptTag: 'denominator-shares', reviewCardId: 'math-u07-l03-c3', prompt: 'In 5/8, what does the denominator 8 represent in a sharing story?', choices: [{ id: 'a', text: 'The number of equal shares' }, { id: 'b', text: 'The total quantity being shared' }, { id: 'c', text: 'The whole-number quotient' }, { id: 'd', text: 'The remainder' }], correctChoiceId: 'a', explanation: 'The denominator names how many equal shares are made.' },
        { id: 'math-u07-l03-q10', type: 'fill-blank', conceptTag: 'denominator-shares', reviewCardId: 'math-u07-l03-c3', prompt: 'Three cakes are shared equally among 10 tables. Each table receives ___ cake.', acceptedAnswers: ['3/10'], explanation: 'Three divided by 10 is three tenths.' },
        { id: 'math-u07-l03-q11', type: 'true-false', conceptTag: 'denominator-shares', reviewCardId: 'math-u07-l03-c3', prompt: 'Sharing 4 apples among 2 children gives less to each child than sharing 4 apples among 8 children.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'false', explanation: 'Four apples among 2 gives 2 each, which is more than 1/2 each among 8.' },
        { id: 'math-u07-l03-q12', type: 'multiple-choice', conceptTag: 'denominator-shares', reviewCardId: 'math-u07-l03-c3', prompt: 'Seven bars are shared equally among 4 hikers. How much does each hiker receive?', choices: [{ id: 'a', text: '1 3/4 bars' }, { id: 'b', text: '3/4 bar' }, { id: 'c', text: '2 1/4 bars' }, { id: 'd', text: '7 bars' }], correctChoiceId: 'a', explanation: 'Seven fourths regroup as one whole and three fourths.' },
        { id: 'math-u07-l03-q13', type: 'multiple-choice', conceptTag: 'denominator-shares', reviewCardId: 'math-u07-l03-c3', prompt: 'Which statement correctly connects 6 ÷ 5 and 6/5?', choices: [{ id: 'a', text: 'Both mean 6 units divided into 5 equal shares.' }, { id: 'b', text: 'Both mean 5 units divided into 6 shares.' }, { id: 'c', text: 'The fraction means multiplication, not sharing.' }, { id: 'd', text: 'The denominator is the quantity being shared.' }], correctChoiceId: 'a', explanation: 'The fraction bar and division symbol describe the same equal-sharing action.' },
      ],
    },
  },
] satisfies Lesson[];
