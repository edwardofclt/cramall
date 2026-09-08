import type { UnitConnection } from '../connections';

export const mathConnections: UnitConnection[] = [
  {
    unitId: 'math-u01',
    foundation: 'Expanded form tells you what each digit is worth. Use those place values to compare two records of a collection.',
    question: {
      id: 'math-u01-l02-q99', type: 'multiple-choice', conceptTag: 'comparison-method', reviewCardId: 'math-u01-l02-c1',
      prompt: 'A museum record lists 40,000 + 1,000 + 500 + 6 postcards. A box label says 41,560 postcards. Which record shows the greater number, and which place decides?',
      choices: [
        { id: 'expanded', text: 'The expanded-form record is greater; its ones digit is greater.' },
        { id: 'label', text: 'The box label is greater; its tens digit is greater.' },
        { id: 'equal', text: 'They are equal because they use the same nonzero digits.' },
        { id: 'hundreds', text: 'The box label is greater; its hundreds digit is greater.' },
      ],
      correctChoiceId: 'label',
      explanation: 'The expanded form is 41,506. Compare 41,506 and 41,560 from the left: both have 4 ten-thousands, 1 thousand, and 5 hundreds. The first difference is the tens place: 0 tens versus 6 tens. The box label is greater even though its ones digit is smaller.',
    },
  },
  {
    unitId: 'math-u02',
    foundation: 'Place value helps you add accurately and round to friendly numbers. Use both to check a reported total.',
    question: {
      id: 'math-u02-l02-q99', type: 'multiple-choice', conceptTag: 'reasonableness', reviewCardId: 'math-u02-l02-c3',
      prompt: 'A festival sold 18,650 tickets in spring and 23,280 in summer. A report says 51,930 tickets altogether. Which replacement gives the exact total and a useful nearest-thousand check?',
      choices: [
        { id: 'too-many', text: '51,930 tickets; 19,000 + 23,000 = 42,000.' },
        { id: 'estimate-only', text: '42,000 tickets; rounded numbers always give the exact total.' },
        { id: 'checked-total', text: '41,930 tickets; 19,000 + 23,000 = 42,000.' },
        { id: 'difference', text: '4,630 tickets; subtract the spring sales from the summer sales.' },
      ],
      correctChoiceId: 'checked-total',
      explanation: 'The seasons are parts of one total, so add: 18,650 + 23,280 = 41,930. Rounding each part to the nearest thousand gives 19,000 + 23,000 = 42,000. The exact sum is close to that estimate; 51,930 is about ten thousand too large. The estimate checks the sum but does not replace it.',
    },
  },
  {
    unitId: 'math-u03',
    foundation: 'A factor pair describes equal groups. The same multiplication relationship can fill a missing input in a pattern table.',
    question: {
      id: 'math-u03-l02-q99', type: 'multiple-choice', conceptTag: 'function-table', reviewCardId: 'math-u03-l02-c2',
      prompt: 'A garden table shows 1 tray → 6 pots, 2 trays → 12 pots, and 3 trays → 18 pots. Every tray holds the same number. How many full trays hold exactly 24 pots, and what factor pair checks the answer?',
      choices: [
        { id: 'four', text: '4 trays; 4 × 6 = 24.' },
        { id: 'six', text: '6 trays; 6 × 6 = 24.' },
        { id: 'eighteen', text: '18 trays; 18 + 6 = 24.' },
        { id: 'three', text: '3 trays; 3 × 6 = 24.' },
      ],
      correctChoiceId: 'four',
      explanation: 'Every row follows pots = trays × 6. To get 24 pots, find the missing factor in trays × 6 = 24. The factor pair 4 and 6 gives 24, so 4 trays are needed. Adding 6 to the tray count would not follow the rule in the other rows.',
    },
  },
  {
    unitId: 'math-u04',
    foundation: 'You can split a number into tens and ones. Use that earlier place-value idea to solve a times-as-many comparison.',
    question: {
      id: 'math-u04-l03-q99', type: 'multiple-choice', conceptTag: 'comparison-problem', reviewCardId: 'math-u04-l03-c3',
      prompt: 'Booth A has 24 flags. Booth B has 3 times as many flags as Booth A. Which count for Booth B is checked correctly by splitting 24 into tens and ones?',
      choices: [
        { id: 'more-than', text: '27 flags; 24 + 3 = 27.' },
        { id: 'ones-once', text: '64 flags; (3 × 20) + 4 = 64.' },
        { id: 'divide', text: '8 flags; 24 ÷ 3 = 8.' },
        { id: 'three-groups', text: '72 flags; (3 × 20) + (3 × 4) = 72.' },
      ],
      correctChoiceId: 'three-groups',
      explanation: 'Three times as many means three equal groups of 24, not 3 more flags. Each group contains 20 + 4. Multiply both parts: 3 × 20 = 60 and 3 × 4 = 12, then add 60 + 12 = 72 flags. This place-value check matches 3 × 24 = 72.',
    },
  },
  {
    unitId: 'math-u05',
    foundation: 'Division makes equal groups, and subtraction describes what is taken away. Connect the two operations in the order the story needs.',
    question: {
      id: 'math-u05-l02-q99', type: 'multiple-choice', conceptTag: 'two-step-check', reviewCardId: 'math-u05-l02-c3',
      prompt: 'A shop shares 156 postcards equally among 6 bins. Later, 7 postcards are taken from each bin. How many postcards remain in each bin?',
      choices: [
        { id: 'nineteen', text: '19 postcards in each bin.' },
        { id: 'twenty-six', text: '26 postcards in each bin.' },
        { id: 'one-forty-nine', text: '149 postcards in each bin.' },
        { id: 'thirty-three', text: '33 postcards in each bin.' },
      ],
      correctChoiceId: 'nineteen',
      explanation: 'First find one bin’s share: 156 ÷ 6 = 26, checked by 26 × 6 = 156. Then remove 7 from that share: 26 − 7 = 19 postcards. The equation is p = (156 ÷ 6) − 7. Subtracting just 7 from the full collection misses that 7 were taken from every bin.',
    },
  },
  {
    unitId: 'math-u06',
    foundation: 'Whole-number comparisons start with the largest place. For mixed numbers, compare the wholes first, then rename the fraction parts as equal-sized pieces.',
    question: {
      id: 'math-u06-l04-q99', type: 'multiple-choice', conceptTag: 'fraction-comparison', reviewCardId: 'math-u06-l04-c3',
      prompt: 'A craft project needs a ribbon longer than 1 5/8 yards. Which ribbon works, and why? All measurements use the same yard-sized whole.',
      choices: [
        { id: 'one-half', text: '1 1/2 yards, because 2 is a smaller denominator than 8.' },
        { id: 'three-fourths', text: '1 3/4 yards, because 3/4 = 6/8 and 6/8 > 5/8.' },
        { id: 'equal', text: '1 5/8 yards, because equal length is longer than the required length.' },
        { id: 'seven-eighths', text: '7/8 yard, because 7 is greater than 5.' },
      ],
      correctChoiceId: 'three-fourths',
      explanation: 'Both 1 3/4 and 1 5/8 have 1 whole yard. Rename 3/4 as 6/8, so their fractional parts use the same-sized pieces. Six eighths is greater than five eighths, making 1 3/4 yards long enough. A ribbon of 7/8 yard is less than 1 whole yard, even though its numerator is larger.',
    },
  },
  {
    unitId: 'math-u07',
    foundation: 'Equal-sharing division can produce a fraction. Compare that share with a benchmark to decide whether there is enough for a recipe.',
    question: {
      id: 'math-u07-l03-q99', type: 'multiple-choice', conceptTag: 'sharing-situation', reviewCardId: 'math-u07-l03-c1',
      prompt: 'Three same-sized loaves are shared equally among 4 picnic baskets, with none left over. Each basket needs at least 1/2 loaf. How much goes in each basket, and is it enough?',
      choices: [
        { id: 'four-thirds', text: '4/3 loaf; enough, because 4 baskets are divided among 3 loaves.' },
        { id: 'one-fourth', text: '1/4 loaf; not enough, because there are 4 baskets.' },
        { id: 'three-fourths', text: '3/4 loaf; enough, because 3/4 > 1/2.' },
        { id: 'three', text: '3 loaves; enough, because every basket receives all 3 loaves.' },
      ],
      correctChoiceId: 'three-fourths',
      explanation: 'Share 3 loaves among 4 baskets: 3 ÷ 4 = 3/4 loaf per basket. You can picture cutting each loaf into fourths and putting one fourth from each of the 3 loaves in each basket. Since 1/2 = 2/4, each 3/4-loaf share is greater than the 1/2 loaf needed.',
    },
  },
  {
    unitId: 'math-u08',
    foundation: 'Equivalent fractions let you rename unlike pieces. Use hundredths to combine two decimal lengths and compare their total with a goal.',
    question: {
      id: 'math-u08-l03-q99', type: 'multiple-choice', conceptTag: 'decimal-operation', reviewCardId: 'math-u08-l03-c2',
      prompt: 'A model path uses a 4/10-meter strip joined end to end with a 25/100-meter strip, without overlap. The path must be longer than 0.60 meter. Which total and decision are correct?',
      choices: [
        { id: 'twenty-nine', text: '0.29 meter; too short.' },
        { id: 'sixty-five', text: '0.65 meter; long enough.' },
        { id: 'forty-two-five', text: '0.425 meter; too short.' },
        { id: 'two-nine', text: '2.9 meters; long enough.' },
      ],
      correctChoiceId: 'sixty-five',
      explanation: 'Rename 4/10 as 40/100. Then 40/100 + 25/100 = 65/100 = 0.65 meter. The goal 0.60 is 60 hundredths, and 65 hundredths is greater than 60 hundredths. Renaming first prevents treating 4 tenths as only 4 hundredths.',
    },
  },
  {
    unitId: 'math-u09',
    foundation: 'Multiplication counts equal groups. Use it first to find a total length, then use a unit equivalence to name that same length in smaller units.',
    question: {
      id: 'math-u09-l05-q99', type: 'multiple-choice', conceptTag: 'conversion-application', reviewCardId: 'math-u09-l05-c3',
      prompt: 'You need 3 garlands, each 4 yards long. The ribbon shop measures ribbon in feet. Given 1 yard = 3 feet, how many feet of ribbon make all 3 garlands?',
      choices: [
        { id: 'twelve', text: '12 feet.' },
        { id: 'seven', text: '7 feet.' },
        { id: 'sixteen', text: '16 feet.' },
        { id: 'thirty-six', text: '36 feet.' },
      ],
      correctChoiceId: 'thirty-six',
      explanation: 'Three garlands of 4 yards each need 3 × 4 = 12 yards. Each yard contains 3 feet, so 12 × 3 = 36 feet. The amount of ribbon stays the same when you convert; its number grows because feet are smaller units than yards. Twelve feet would cover just one garland.',
    },
  },
  {
    unitId: 'math-u10',
    foundation: 'Unit equivalences name the same length in different ways. Put both sides in the same unit before counting a rectangle’s square units.',
    question: {
      id: 'math-u10-l02-q99', type: 'multiple-choice', conceptTag: 'area-situation', reviewCardId: 'math-u10-l02-c3',
      prompt: 'A rectangular display is 2 yards long and 4 feet wide. Given 1 yard = 3 feet, how many square feet of paper cover its inside with no gaps or overlap?',
      choices: [
        { id: 'eight', text: '8 square feet.' },
        { id: 'twenty', text: '20 square feet.' },
        { id: 'twenty-four', text: '24 square feet.' },
        { id: 'six', text: '6 square feet.' },
      ],
      correctChoiceId: 'twenty-four',
      explanation: 'Convert the length first: 2 yards = 2 × 3 = 6 feet. Now both sides use feet, so area = 6 × 4 = 24 square feet. You could count 6 rows of 4 one-foot squares. Adding the four side lengths would find the boundary, not the paper needed inside.',
    },
  },
  {
    unitId: 'math-u11',
    foundation: 'A rectangle’s area comes from length × width. Shape families tell you when that rule also applies to a more specific kind of shape.',
    question: {
      id: 'math-u11-l02-q99', type: 'multiple-choice', conceptTag: 'hierarchy-explanation', reviewCardId: 'math-u11-l02-c3',
      prompt: 'A square tile has four 3-inch sides and four right angles. Can you use the rectangle area rule to find the tile’s area?',
      choices: [
        { id: 'rectangle-family', text: 'Yes. A square is also a rectangle, so its area is 3 × 3 = 9 square inches.' },
        { id: 'only-square', text: 'No. A shape can belong to only one named group.' },
        { id: 'perimeter', text: 'Yes. Add its four sides to get an area of 12 inches.' },
        { id: 'not-rectangle', text: 'No. A rectangle cannot have all four sides equal.' },
      ],
      correctChoiceId: 'rectangle-family',
      explanation: 'A square has the four right angles and two pairs of parallel sides required for a rectangle. It belongs to the rectangle family even though all its sides are equal. Its inside contains 3 rows of 3 one-inch squares, so the rectangle rule gives 9 square inches. The 12-inch total around its edges is perimeter.',
    },
  },
  {
    unitId: 'math-u12',
    foundation: 'Factor pairs tell you which numbers divide a total evenly. Use that earlier knowledge to check every outcome of a chance event.',
    question: {
      id: 'math-u12-l03-q99', type: 'multiple-choice', conceptTag: 'probability-language', reviewCardId: 'math-u12-l03-c3',
      prompt: 'A spinner has four equal sections labeled 2, 3, 4, and 6. These are its only outcomes. Is the event “land on a factor of 12” certain, possible but not certain, or impossible?',
      choices: [
        { id: 'missing-factors', text: 'Possible but not certain, because 1 and 12 are missing from the spinner.' },
        { id: 'no-twelve', text: 'Impossible, because no section is labeled 12.' },
        { id: 'prime-only', text: 'Possible but not certain, because only prime numbers can be factors.' },
        { id: 'all-outcomes', text: 'Certain, because every listed outcome is a factor of 12.' },
      ],
      correctChoiceId: 'all-outcomes',
      explanation: 'The factor pairs 2 × 6 = 12 and 3 × 4 = 12 show that 2, 3, 4, and 6 are all factors of 12. Every outcome on this spinner meets the event, so it is certain. A spinner does not need to show every factor of 12; it only needs every outcome it can land on to meet the event.',
    },
  },
];
