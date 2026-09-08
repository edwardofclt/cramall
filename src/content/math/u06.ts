import { mathWorkshopForCard } from './workshop-registration';
// src/content/math/u06.ts
import type { Lesson } from '../schema';

export const unit06Lessons = [
  {
    id: 'math-u06-l01',
    unitId: 'math-u06',
    title: 'Equivalent Fractions and Models',
    indicatorCodes: ['4.NR.2.3'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Two fractions can name the same amount with different-sized parts.' },
      { speaker: 'kid', text: 'Models help us see when the covered amount stays equal.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Multiplying or dividing numerator and denominator by the same number preserves value.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will connect models, equations, and fractions greater than one.' },
    ],
    learnCards: [
      {
        id: 'math-u06-l01-c1',
        title: 'Name Equal Parts',
        blocks: [
          { kind: 'text', text: 'The denominator names how many equal parts make one whole; the numerator names how many are selected.' },
          { kind: 'example', text: 'One half covers the same amount as two fourths when the same whole is used.' },
          { kind: 'tip', text: 'Equivalent fractions must refer to equal-sized wholes.' },
        ],
      },
      {
        id: 'math-u06-l01-c2',
        title: 'Generate an Equivalent Fraction',
        blocks: [
          { kind: 'text', text: 'Multiply or divide both numerator and denominator by the same nonzero whole number.' },
          { kind: 'example', text: '3/4 × 2/2 = 6/8, so 3/4 and 6/8 are equivalent.' },
          { kind: 'tip', text: 'Changing only the numerator or only the denominator changes the value.' },
        ],
        widget: { type: 'fraction-models', config: { mode: 'both', denominator: 4, numerator: 0, target: { numerator: 1, denominator: 2 }, allowEquivalent: true, task: 'equivalent', comparisonTarget: { numerator: 1, denominator: 2 }, taskPrompt: 'Build 1/2 with fourths.' } },
        widgetCoach: {
          intro: [
            { speaker: 'guide', pose: 'think', text: 'Can fourth-size pieces cover the same amount as one half?' },
            { speaker: 'kid', text: 'I will build with fourths and compare the shaded amounts on equal-sized wholes.' },
          ],
          reactions: {
            strategy: { text: 'Compare how much is shaded, keeping the whole the same size.', pose: 'think' },
            retry: { text: 'Keep the whole fixed and compare the shaded amounts again.', pose: 'oops' },
            milestone: { text: 'Your comparison connects different equal parts to the same amount.', pose: 'think' },
            complete: { text: 'You built 2/4, an equivalent model for 1/2.', pose: 'cheer' },
          },
        },
      },
      {
        id: 'math-u06-l01-c3',
        title: 'Connect Equivalent Representations',
        blocks: [
          { kind: 'text', text: 'An area model, number line, fraction equation, and words can represent the same value.' },
          { kind: 'example', text: 'Six fourths and three halves both equal one whole and one half.' },
          { kind: 'tip', text: 'For fractions greater than 1, group complete wholes before comparing the leftover parts.' },
        ],
      },
    ],
    workedExample: {
      title: 'Show that 6/4 equals 3/2',
      steps: [
        'Divide numerator and denominator of 6/4 by 2 to get 3/2.',
        'Both forms contain one whole plus one half: 6 fourths = 4 fourths + 2 fourths.',
        'A model with the same-sized wholes covers one whole and one half in either partition.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u06-l01-q01', type: 'multiple-choice', conceptTag: 'equal-parts', reviewCardId: 'math-u06-l01-c1', prompt: 'Which fraction names the same amount as 1/2?', choices: [{ id: 'a', text: '2/4' }, { id: 'b', text: '1/4' }, { id: 'c', text: '2/3' }, { id: 'd', text: '3/4' }], correctChoiceId: 'a', explanation: 'Multiplying numerator and denominator by 2 gives 2/4.' },
        { id: 'math-u06-l01-q02', type: 'fill-blank', conceptTag: 'equal-parts', reviewCardId: 'math-u06-l01-c1', prompt: 'Three shaded parts out of 6 equal ___ of a whole in simplest form.', acceptedAnswers: ['1/2'], explanation: 'Dividing 3/6 by 3/3 gives 1/2.' },
        { id: 'math-u06-l01-q03', type: 'true-false', conceptTag: 'equal-parts', reviewCardId: 'math-u06-l01-c1', prompt: 'Two fourths and four eighths can cover the same amount of equal-sized wholes.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Both fractions equal one half.' },
        { id: 'math-u06-l01-q04', type: 'multiple-choice', conceptTag: 'equal-parts', reviewCardId: 'math-u06-l01-c1', prompt: 'Which pair is not equivalent?', choices: [{ id: 'a', text: '2/3 and 3/6' }, { id: 'b', text: '1/2 and 2/4' }, { id: 'c', text: '3/5 and 6/10' }, { id: 'd', text: '5/6 and 10/12' }], correctChoiceId: 'a', explanation: 'Two thirds is not one half, while each other pair scales both terms equally.' },
        { id: 'math-u06-l01-q05', type: 'multiple-choice', conceptTag: 'equivalent-pattern', reviewCardId: 'math-u06-l01-c2', prompt: 'Which multiplication generates a fraction equivalent to 3/4?', choices: [{ id: 'a', text: '3/4 × 2/2 = 6/8' }, { id: 'b', text: '3/4 × 2/3 = 6/12' }, { id: 'c', text: '3/4 × 1/2 = 3/8' }, { id: 'd', text: '3/4 + 2/2 = 5/6' }], correctChoiceId: 'a', explanation: 'Multiplying by 2/2 changes the name but not the value.' },
        { id: 'math-u06-l01-q06', type: 'fill-blank', conceptTag: 'equivalent-pattern', reviewCardId: 'math-u06-l01-c2', prompt: 'Complete the equivalent fraction: 4/5 = ___/10.', acceptedAnswers: ['8'], explanation: 'The denominator doubles, so the numerator also doubles.' },
        { id: 'math-u06-l01-q07', type: 'true-false', conceptTag: 'equivalent-pattern', reviewCardId: 'math-u06-l01-c2', prompt: 'Dividing both terms of 8/12 by 4 gives the equivalent fraction 2/3.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Eight divided by 4 is 2 and 12 divided by 4 is 3.' },
        { id: 'math-u06-l01-q08', type: 'multiple-choice', conceptTag: 'equivalent-pattern', reviewCardId: 'math-u06-l01-c2', prompt: 'Which fraction is equivalent to 9/12?', choices: [{ id: 'a', text: '3/4' }, { id: 'b', text: '7/8' }, { id: 'c', text: '2/3' }, { id: 'd', text: '4/5' }], correctChoiceId: 'a', explanation: 'Dividing 9 and 12 by 3 gives 3/4.' },
        { id: 'math-u06-l01-q09', type: 'multiple-choice', conceptTag: 'equivalent-representations', reviewCardId: 'math-u06-l01-c3', prompt: 'Which mixed-number description matches both 6/4 and 3/2?', choices: [{ id: 'a', text: '1 whole and 1/2' }, { id: 'b', text: '1 whole and 1/4' }, { id: 'c', text: '2 wholes' }, { id: 'd', text: '1/2 of a whole' }], correctChoiceId: 'a', explanation: 'Both improper fractions equal 1 1/2.' },
        { id: 'math-u06-l01-q10', type: 'fill-blank', conceptTag: 'equivalent-representations', reviewCardId: 'math-u06-l01-c3', prompt: 'Complete: 6/4 = ___/8.', acceptedAnswers: ['12'], explanation: 'Six fourths and 12 eighths both equal one whole and one half.' },
        { id: 'math-u06-l01-q11', type: 'true-false', conceptTag: 'equivalent-representations', reviewCardId: 'math-u06-l01-c3', prompt: 'Eight sixths and four thirds are equivalent fractions greater than 1.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Dividing both terms of 8/6 by 2 gives 4/3.' },
        { id: 'math-u06-l01-q12', type: 'multiple-choice', conceptTag: 'equivalent-representations', reviewCardId: 'math-u06-l01-c3', prompt: 'Which representation equals 5/2?', choices: [{ id: 'a', text: '2 wholes and 1/2' }, { id: 'b', text: '1 whole and 2/5' }, { id: 'c', text: '5 wholes and 2/5' }, { id: 'd', text: '2 halves' }], correctChoiceId: 'a', explanation: 'Five halves contain four halves, or 2 wholes, plus 1 half.' },
        { id: 'math-u06-l01-q13', type: 'multiple-choice', conceptTag: 'equivalent-representations', reviewCardId: 'math-u06-l01-c3', prompt: 'Why are 15/10 and 3/2 equivalent?', choices: [{ id: 'a', text: 'Dividing 15 and 10 by 5 gives 3 and 2.' }, { id: 'b', text: 'Their numerators are both odd.' }, { id: 'c', text: 'Their denominators add to 12.' }, { id: 'd', text: 'Both are less than 1.' }], correctChoiceId: 'a', explanation: 'Scaling both terms by the same factor preserves the value.' },
      ],
    },
  },
  {
    id: 'math-u06-l02',
    unitId: 'math-u06',
    title: 'Compose and Decompose Like-Denominator Fractions',
    indicatorCodes: ['4.NR.2.4'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'A fraction can be built from smaller fractions or split apart.' },
      { speaker: 'kid', text: 'When the parts are the same size, the denominator stays fixed.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We can group enough parts to make one or more wholes.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will represent each composition with equations, words, and imagined models.' },
    ],
    learnCards: [
      {
        id: 'math-u06-l02-c1',
        title: 'Compose Fraction Parts',
        blocks: [
          { kind: 'text', text: 'Compose means join same-sized fractional parts into one quantity.' },
          { kind: 'example', text: '2/8 + 3/8 = 5/8 because five eighth-size parts are selected.' },
          { kind: 'tip', text: 'Add the numerators to count parts and keep the common denominator.' },
        ],
      },
      {
        id: 'math-u06-l02-c2',
        title: 'Decompose Fraction Parts',
        blocks: [
          { kind: 'text', text: 'Decompose means write one fraction as a sum of same-denominator parts.' },
          { kind: 'example', text: '7/10 can be 5/10 + 2/10 or 1/10 + 3/10 + 3/10.' },
          { kind: 'tip', text: 'Check that the numerators of the parts total the original numerator.' },
        ],
      },
      {
        ...mathWorkshopForCard('math-u06-l02-c3'),
        id: 'math-u06-l02-c3',
        title: 'Represent a Mixed Quantity',
        blocks: [
          { kind: 'text', text: 'A mixed quantity can be composed from whole fractions and a remaining fraction.' },
          { kind: 'example', text: '1 3/4 = 4/4 + 3/4 = 7/4.' },
          { kind: 'tip', text: 'Use a denominator-sized numerator, such as 4/4, for each complete whole.' },
        ],
      },
    ],
    workedExample: {
      title: 'Compose and decompose 11/6',
      steps: [
        'Group 6/6 from the 11 sixths to make one whole.',
        'Write 11/6 = 6/6 + 5/6 = 1 5/6.',
        'A different valid decomposition is 3/6 + 3/6 + 5/6; the numerators still total 11.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u06-l02-q01', type: 'multiple-choice', conceptTag: 'compose-parts', reviewCardId: 'math-u06-l02-c1', prompt: 'What is 2/8 + 3/8?', choices: [{ id: 'a', text: '5/8' }, { id: 'b', text: '5/12' }, { id: 'c', text: '1/8' }, { id: 'd', text: '6/8' }], correctChoiceId: 'a', explanation: 'Five eighth-size parts are selected.' },
        { id: 'math-u06-l02-q02', type: 'fill-blank', conceptTag: 'compose-parts', reviewCardId: 'math-u06-l02-c1', prompt: 'Complete: 4/10 + 3/10 = ___.', acceptedAnswers: ['7/10'], explanation: 'Adding the numerators gives seven tenths.' },
        { id: 'math-u06-l02-q03', type: 'true-false', conceptTag: 'compose-parts', reviewCardId: 'math-u06-l02-c1', prompt: 'One fifth plus two fifths equals three fifths.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'The pieces are all fifths, so 1 + 2 = 3 fifths.' },
        { id: 'math-u06-l02-q04', type: 'multiple-choice', conceptTag: 'compose-parts', reviewCardId: 'math-u06-l02-c1', prompt: 'Which sum composes 9/12?', choices: [{ id: 'a', text: '4/12 + 5/12' }, { id: 'b', text: '4/12 + 5/6' }, { id: 'c', text: '4/6 + 5/6' }, { id: 'd', text: '9/12 + 1/12' }], correctChoiceId: 'a', explanation: 'Four twelfths plus five twelfths equals nine twelfths.' },
        { id: 'math-u06-l02-q05', type: 'multiple-choice', conceptTag: 'decompose-parts', reviewCardId: 'math-u06-l02-c2', prompt: 'Which is a valid decomposition of 7/10?', choices: [{ id: 'a', text: '5/10 + 2/10' }, { id: 'b', text: '5/10 + 2/5' }, { id: 'c', text: '7/20 + 7/20' }, { id: 'd', text: '6/10 + 2/10' }], correctChoiceId: 'a', explanation: 'The parts keep denominator 10 and their numerators total 7.' },
        { id: 'math-u06-l02-q06', type: 'fill-blank', conceptTag: 'decompose-parts', reviewCardId: 'math-u06-l02-c2', prompt: 'Complete the decomposition: 11/12 = 6/12 + ___/12.', acceptedAnswers: ['5'], explanation: 'Six twelfths plus five twelfths equals eleven twelfths.' },
        { id: 'math-u06-l02-q07', type: 'multiple-choice', conceptTag: 'decompose-parts', reviewCardId: 'math-u06-l02-c2', prompt: 'Which three-part sum equals 8/5?', choices: [{ id: 'a', text: '5/5 + 2/5 + 1/5' }, { id: 'b', text: '4/5 + 2/5 + 1/5' }, { id: 'c', text: '5/10 + 2/10 + 1/10' }, { id: 'd', text: '8/5 + 1/5 + 1/5' }], correctChoiceId: 'a', explanation: 'The numerators 5 + 2 + 1 total 8 fifths.' },
        { id: 'math-u06-l02-q08', type: 'true-false', conceptTag: 'decompose-parts', reviewCardId: 'math-u06-l02-c2', prompt: '9/4 can be decomposed as 4/4 + 4/4 + 1/4.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'The numerators total 9 and each part is in fourths.' },
        { id: 'math-u06-l02-q09', type: 'multiple-choice', conceptTag: 'mixed-composition', reviewCardId: 'math-u06-l02-c3', prompt: 'Which fraction equals 2 3/8?', choices: [{ id: 'a', text: '19/8' }, { id: 'b', text: '16/8' }, { id: 'c', text: '13/8' }, { id: 'd', text: '23/8' }], correctChoiceId: 'a', explanation: 'Two wholes are 16/8; adding 3/8 gives 19/8.' },
        { id: 'math-u06-l02-q10', type: 'fill-blank', conceptTag: 'mixed-composition', reviewCardId: 'math-u06-l02-c3', prompt: 'Write 14/5 as a mixed number.', acceptedAnswers: ['2 4/5'], explanation: 'Ten fifths make 2 wholes, with 4 fifths remaining.' },
        { id: 'math-u06-l02-q11', type: 'true-false', conceptTag: 'mixed-composition', reviewCardId: 'math-u06-l02-c3', prompt: '3 2/6 = 20/6.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Three wholes are 18/6, and 18/6 + 2/6 = 20/6.' },
        { id: 'math-u06-l02-q12', type: 'multiple-choice', conceptTag: 'mixed-composition', reviewCardId: 'math-u06-l02-c3', prompt: 'Which equation represents 1 7/10?', choices: [{ id: 'a', text: '10/10 + 7/10 = 17/10' }, { id: 'b', text: '1/10 + 7/10 = 8/10' }, { id: 'c', text: '10/5 + 7/10 = 17/10' }, { id: 'd', text: '17/10 + 10/10 = 1 7/10' }], correctChoiceId: 'a', explanation: 'One whole is 10/10, so the total is 17/10.' },
        { id: 'math-u06-l02-q13', type: 'multiple-choice', conceptTag: 'mixed-composition', reviewCardId: 'math-u06-l02-c3', prompt: 'A model shows one whole circle and 3 of 4 parts of another circle. Which fraction describes all shaded fourths?', choices: [{ id: 'a', text: '7/4' }, { id: 'b', text: '4/8' }, { id: 'c', text: '1/4' }, { id: 'd', text: '3/8' }], correctChoiceId: 'a', explanation: 'The whole contributes 4 fourths and the other circle contributes 3 fourths.' },
      ],
    },
  },
  {
    id: 'math-u06-l03',
    unitId: 'math-u06',
    title: 'Mixed Numbers and Fractions Greater Than One',
    indicatorCodes: ['4.NR.2.5'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Fractions greater than one can be regrouped into wholes.' },
      { speaker: 'kid', text: 'Mixed numbers name those wholes and the leftover fraction.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We can convert in either direction without changing the amount.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Every conversion will include an explanation, not just a rule.' },
    ],
    learnCards: [
      {
        id: 'math-u06-l03-c1',
        title: 'Read a Fraction Greater Than One',
        blocks: [
          { kind: 'text', text: 'A fraction is greater than 1 when its numerator is greater than its denominator.' },
          { kind: 'example', text: '9/4 contains two groups of 4 fourths with 1 fourth left.' },
          { kind: 'tip', text: 'Count denominator-sized groups to locate the fraction between whole numbers.' },
        ],
      },
      {
        ...mathWorkshopForCard('math-u06-l03-c2'),
        id: 'math-u06-l03-c2',
        title: 'Write an Equivalent Mixed Number',
        blocks: [
          { kind: 'text', text: 'Divide the numerator by the denominator: the quotient is the whole number and the remainder becomes the new numerator.' },
          { kind: 'example', text: '17/5 gives quotient 3 remainder 2, so 17/5 = 3 2/5.' },
          { kind: 'tip', text: 'Keep the original denominator because the part size does not change.' },
        ],
      },
      {
        id: 'math-u06-l03-c3',
        title: 'Explain Why the Forms Are Equal',
        blocks: [
          { kind: 'text', text: 'To change a mixed number to a fraction, multiply wholes by the denominator and add the numerator.' },
          { kind: 'example', text: '2 3/8 = (2 × 8 + 3)/8 = 19/8.' },
          { kind: 'tip', text: 'Check by decomposing the fraction back into whole fractions and the leftover part.' },
        ],
      },
    ],
    workedExample: {
      title: 'Explain 14/5 = 2 4/5',
      steps: [
        'Two groups of 5 fifths use 10 of the 14 fifths.',
        'Four fifths remain, so 14/5 = 10/5 + 4/5 = 2 4/5.',
        'Convert back: 2 × 5 + 4 = 14 fifths, confirming the forms are equal.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u06-l03-q01', type: 'multiple-choice', conceptTag: 'greater-than-one', reviewCardId: 'math-u06-l03-c1', prompt: 'Between which two whole numbers is 9/4?', choices: [{ id: 'a', text: '2 and 3' }, { id: 'b', text: '1 and 2' }, { id: 'c', text: '3 and 4' }, { id: 'd', text: '4 and 5' }], correctChoiceId: 'a', explanation: 'Eight fourths equal 2, and twelve fourths equal 3.' },
        { id: 'math-u06-l03-q02', type: 'fill-blank', conceptTag: 'greater-than-one', reviewCardId: 'math-u06-l03-c1', prompt: 'How many whole groups of 6 sixths are in 20/6?', acceptedAnswers: ['3'], explanation: 'Eighteen sixths make 3 wholes, with 2 sixths left.' },
        { id: 'math-u06-l03-q03', type: 'true-false', conceptTag: 'greater-than-one', reviewCardId: 'math-u06-l03-c1', prompt: '7/8 is a fraction greater than 1.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'false', explanation: 'Seven eighths is less than one whole because 7 is less than 8.' },
        { id: 'math-u06-l03-q04', type: 'multiple-choice', conceptTag: 'greater-than-one', reviewCardId: 'math-u06-l03-c1', prompt: 'Which decomposition shows 13/4?', choices: [{ id: 'a', text: '4/4 + 4/4 + 4/4 + 1/4' }, { id: 'b', text: '4/4 + 4/4 + 1/4' }, { id: 'c', text: '3/4 + 3/4 + 3/4' }, { id: 'd', text: '12/12' }], correctChoiceId: 'a', explanation: 'Three whole groups of 4 fourths and 1 fourth total 13 fourths.' },
        { id: 'math-u06-l03-q05', type: 'multiple-choice', conceptTag: 'mixed-number', reviewCardId: 'math-u06-l03-c2', prompt: 'Write 17/5 as a mixed number.', choices: [{ id: 'a', text: '3 2/5' }, { id: 'b', text: '2 3/5' }, { id: 'c', text: '3 5/2' }, { id: 'd', text: '4 2/5' }], correctChoiceId: 'a', explanation: 'Seventeen divided by 5 is 3 remainder 2.' },
        { id: 'math-u06-l03-q06', type: 'fill-blank', conceptTag: 'mixed-number', reviewCardId: 'math-u06-l03-c2', prompt: 'Write 11/3 as a mixed number.', acceptedAnswers: ['3 2/3'], explanation: 'Nine thirds make 3 wholes, leaving 2 thirds.' },
        { id: 'math-u06-l03-q07', type: 'true-false', conceptTag: 'mixed-number', reviewCardId: 'math-u06-l03-c2', prompt: '22/10 equals 2 2/10.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Twenty tenths make 2 wholes, with 2 tenths remaining.' },
        { id: 'math-u06-l03-q08', type: 'multiple-choice', conceptTag: 'mixed-number', reviewCardId: 'math-u06-l03-c2', prompt: 'Which mixed number equals 25/12?', choices: [{ id: 'a', text: '2 1/12' }, { id: 'b', text: '1 13/12' }, { id: 'c', text: '2 12/25' }, { id: 'd', text: '3 1/12' }], correctChoiceId: 'a', explanation: 'Twenty-four twelfths make 2 wholes, leaving 1 twelfth.' },
        { id: 'math-u06-l03-q09', type: 'multiple-choice', conceptTag: 'mixed-equivalence', reviewCardId: 'math-u06-l03-c3', prompt: 'Which fraction equals 2 3/8?', choices: [{ id: 'a', text: '19/8' }, { id: 'b', text: '16/8' }, { id: 'c', text: '13/8' }, { id: 'd', text: '23/8' }], correctChoiceId: 'a', explanation: 'Two times 8 plus 3 equals 19 eighths.' },
        { id: 'math-u06-l03-q10', type: 'fill-blank', conceptTag: 'mixed-equivalence', reviewCardId: 'math-u06-l03-c3', prompt: 'Convert 4 1/6 to a fraction greater than 1.', acceptedAnswers: ['25/6'], explanation: 'Four wholes are 24 sixths; one more sixth makes 25/6.' },
        { id: 'math-u06-l03-q11', type: 'true-false', conceptTag: 'mixed-equivalence', reviewCardId: 'math-u06-l03-c3', prompt: '3 4/5 = 19/5 because 3 × 5 + 4 = 19.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'The calculation counts all fifth-size parts.' },
        { id: 'math-u06-l03-q12', type: 'multiple-choice', conceptTag: 'mixed-equivalence', reviewCardId: 'math-u06-l03-c3', prompt: 'Why does the denominator stay 4 when 3 2/4 becomes 14/4?', choices: [{ id: 'a', text: 'The pieces remain fourth-size pieces.' }, { id: 'b', text: 'The whole number is 4.' }, { id: 'c', text: 'The numerator and denominator must match.' }, { id: 'd', text: 'Four is always used for mixed numbers.' }], correctChoiceId: 'a', explanation: 'Conversion changes the count of parts, not their size.' },
        { id: 'math-u06-l03-q13', type: 'multiple-choice', conceptTag: 'mixed-equivalence', reviewCardId: 'math-u06-l03-c3', prompt: 'Which equation checks that 16/6 = 2 4/6?', choices: [{ id: 'a', text: '2 × 6 + 4 = 16' }, { id: 'b', text: '2 + 6 + 4 = 12' }, { id: 'c', text: '16 - 6 = 10' }, { id: 'd', text: '16 ÷ 4 = 4' }], correctChoiceId: 'a', explanation: 'Two whole groups of 6 sixths plus 4 sixths total 16 sixths.' },
      ],
    },
  },
  {
    id: 'math-u06-l04',
    unitId: 'math-u06',
    title: 'Compare Fractions and Mixed Numbers',
    indicatorCodes: ['4.NR.2.6'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Benchmark fractions give us useful landmarks.' },
      { speaker: 'kid', text: 'We can compare each quantity with 0, one half, or 1 before making a detailed comparison.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Equivalent denominators or cross-products can settle close comparisons.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Then we will choose a symbol and justify it with fraction meaning.' },
    ],
    learnCards: [
      {
        id: 'math-u06-l04-c1',
        title: 'Use Benchmark Fractions',
        blocks: [
          { kind: 'text', text: 'Compare the numerator with half the denominator to decide whether a fraction is below, equal to, or above 1/2.' },
          { kind: 'example', text: '3/8 is below 1/2 because half of 8 is 4; 5/8 is above 1/2.' },
          { kind: 'tip', text: 'A numerator equal to the denominator names 1 whole.' },
        ],
        widget: { type: 'number-line-compare', config: { min: 0, max: 2, a: 0.5, b: 1.5, step: 0.25, display: 'fraction', denominator: 4 } },
        widgetCoach: {
          intro: [
            { speaker: 'guide', pose: 'think', text: 'Use the number line to compare fractions on both sides of one whole.' },
            { speaker: 'kid', text: 'I will locate both markers and choose a symbol using their positions.' },
          ],
          reactions: {
            strategy: { text: 'Count equal fourth-size spaces between the labeled landmarks.', pose: 'think' },
            retry: { text: 'Compare the marker positions using the same-sized spaces.', pose: 'oops' },
            milestone: { text: 'The whole-number landmarks help locate fractions greater than one.', pose: 'think' },
            complete: { text: 'You compared the fractions by their locations and benchmarks.', pose: 'cheer' },
          },
        },
      },
      {
        id: 'math-u06-l04-c2',
        title: 'Compare Unlike Denominators',
        blocks: [
          { kind: 'text', text: 'Use equivalent fractions, benchmarks, or cross-products to compare fractions with different denominators.' },
          { kind: 'example', text: '3/4 = 9/12, so 3/4 > 8/12.' },
          { kind: 'tip', text: 'Compare only quantities that refer to the same whole.' },
        ],
      },
      {
        id: 'math-u06-l04-c3',
        title: 'Choose and Justify a Comparison Symbol',
        blocks: [
          { kind: 'text', text: 'Use <, >, or = and support the symbol with a model, benchmark, or equivalent-fraction statement.' },
          { kind: 'example', text: '1 2/5 < 1 1/2 because both have 1 whole and 2/5 is below 1/2.' },
          { kind: 'tip', text: 'Compare whole-number parts first when mixed numbers are involved.' },
        ],
      },
    ],
    workedExample: {
      title: 'Compare 1 3/8 and 1 2/5',
      steps: [
        'The whole-number parts are both 1, so compare 3/8 and 2/5.',
        'Cross-products are 3 × 5 = 15 and 2 × 8 = 16, so 3/8 < 2/5.',
        'Therefore 1 3/8 < 1 2/5.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u06-l04-q01', type: 'multiple-choice', conceptTag: 'benchmark-fractions', reviewCardId: 'math-u06-l04-c1', prompt: 'Which fraction is greater than 1/2?', choices: [{ id: 'a', text: '5/8' }, { id: 'b', text: '3/8' }, { id: 'c', text: '2/5' }, { id: 'd', text: '4/10' }], correctChoiceId: 'a', explanation: 'Five eighths has more than the 4 eighths needed for one half.' },
        { id: 'math-u06-l04-q02', type: 'fill-blank', conceptTag: 'benchmark-fractions', reviewCardId: 'math-u06-l04-c1', prompt: 'Complete with <, >, or =: 5/10 ___ 1/2.', acceptedAnswers: ['='], explanation: 'Five tenths is exactly one half.' },
        { id: 'math-u06-l04-q03', type: 'true-false', conceptTag: 'benchmark-fractions', reviewCardId: 'math-u06-l04-c1', prompt: '7/12 is greater than 1/2.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'One half is 6/12, and 7/12 is greater.' },
        { id: 'math-u06-l04-q04', type: 'multiple-choice', conceptTag: 'benchmark-fractions', reviewCardId: 'math-u06-l04-c1', prompt: 'Which fraction is closest to 1 without equaling 1?', choices: [{ id: 'a', text: '9/10' }, { id: 'b', text: '3/5' }, { id: 'c', text: '1/2' }, { id: 'd', text: '2/10' }], correctChoiceId: 'a', explanation: 'Nine tenths is only one tenth below 1.' },
        { id: 'math-u06-l04-q05', type: 'multiple-choice', conceptTag: 'unlike-denominators', reviewCardId: 'math-u06-l04-c2', prompt: 'Which comparison is true?', choices: [{ id: 'a', text: '3/4 > 8/12' }, { id: 'b', text: '3/4 < 8/12' }, { id: 'c', text: '3/4 = 8/12' }, { id: 'd', text: '3/4 > 11/12' }], correctChoiceId: 'a', explanation: 'Three fourths is 9/12, which is greater than 8/12.' },
        { id: 'math-u06-l04-q06', type: 'fill-blank', conceptTag: 'unlike-denominators', reviewCardId: 'math-u06-l04-c2', prompt: 'Complete with <, >, or =: 2/3 ___ 4/6.', acceptedAnswers: ['='], explanation: 'Multiplying 2/3 by 2/2 gives 4/6.' },
        { id: 'math-u06-l04-q07', type: 'true-false', conceptTag: 'unlike-denominators', reviewCardId: 'math-u06-l04-c2', prompt: '3/5 is less than 5/8.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Cross-products are 24 and 25, so 3/5 is smaller.' },
        { id: 'math-u06-l04-q08', type: 'multiple-choice', conceptTag: 'unlike-denominators', reviewCardId: 'math-u06-l04-c2', prompt: 'Which method correctly compares 7/10 and 2/3?', choices: [{ id: 'a', text: 'Compare 7 × 3 = 21 with 2 × 10 = 20.' }, { id: 'b', text: 'Compare denominators only: 10 > 3.' }, { id: 'c', text: 'Add each numerator and denominator.' }, { id: 'd', text: 'Subtract 3 from 10.' }], correctChoiceId: 'a', explanation: 'Because 21 > 20, 7/10 > 2/3.' },
        { id: 'math-u06-l04-q09', type: 'multiple-choice', conceptTag: 'fraction-comparison', reviewCardId: 'math-u06-l04-c3', prompt: 'Choose the true comparison.', choices: [{ id: 'a', text: '1 2/5 < 1 1/2' }, { id: 'b', text: '1 2/5 > 1 1/2' }, { id: 'c', text: '1 2/5 = 1 1/2' }, { id: 'd', text: '2/5 > 1' }], correctChoiceId: 'a', explanation: 'The wholes match, and 2/5 is less than 1/2.' },
        { id: 'math-u06-l04-q10', type: 'sort', conceptTag: 'fraction-comparison', reviewCardId: 'math-u06-l04-c3', prompt: 'Order the fractions from least to greatest.', items: [{ id: 'a', text: '1/4' }, { id: 'b', text: '1/2' }, { id: 'c', text: '3/4' }, { id: 'd', text: '1' }], correctOrder: ['a', 'b', 'c', 'd'], explanation: 'The benchmark sequence increases from one fourth to one whole.' },
        { id: 'math-u06-l04-q11', type: 'true-false', conceptTag: 'fraction-comparison', reviewCardId: 'math-u06-l04-c3', prompt: '2 1/3 is greater than 1 5/6.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Any amount with 2 wholes is greater than an amount with only 1 whole.' },
        { id: 'math-u06-l04-q12', type: 'multiple-choice', conceptTag: 'fraction-comparison', reviewCardId: 'math-u06-l04-c3', prompt: 'Which statement justifies 5/6 > 4/5?', choices: [{ id: 'a', text: 'Cross-products give 25 > 24.' }, { id: 'b', text: 'Six is greater than 5.' }, { id: 'c', text: 'Five plus 6 is greater than 4 plus 5.' }, { id: 'd', text: 'Both fractions are below 1/2.' }], correctChoiceId: 'a', explanation: 'Comparing cross-products 5 × 5 and 4 × 6 gives 25 > 24.' },
        { id: 'math-u06-l04-q13', type: 'fill-blank', conceptTag: 'fraction-comparison', reviewCardId: 'math-u06-l04-c3', prompt: 'Complete with <, >, or =: 1 3/8 ___ 1 2/5.', acceptedAnswers: ['<'], explanation: 'The wholes match, and 3/8 is less than 2/5 because 15 < 16 in the cross-products.' },
      ],
    },
  },
] satisfies Lesson[];
