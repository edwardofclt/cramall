import { mathWorkshopForCard } from './workshop-registration';
import type { Lesson } from '../schema';

export const unit10Lessons = [
  {
    id: 'math-u10-l01',
    unitId: 'math-u10',
    title: 'Rectangle Perimeter and Unknown Sides',
    indicatorCodes: ['4.MGSR.1.1'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Perimeter measures the distance around a rectangle.' },
      { speaker: 'kid', text: 'Opposite sides of a rectangle have equal lengths.' },
      { speaker: 'nutty', pose: 'cheer', text: 'A formula can find the total boundary or help reveal a missing side.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will solve and label perimeter situations with linear units.' },
    ],
    learnCards: [
      {
        id: 'math-u10-l01-c1',
        title: 'Use the Perimeter Formula',
        blocks: [
          { kind: 'text', text: 'For length l and width w, rectangle perimeter is P = 2l + 2w, or P = 2(l + w).' },
          { kind: 'example', text: 'A rectangle 8 meters by 5 meters has P = 2(8 + 5) = 26 meters.' },
          { kind: 'tip', text: 'Perimeter uses linear units such as inches, feet, or meters.' },
        ],
      },
      {
        ...mathWorkshopForCard('math-u10-l01-c2'),
        id: 'math-u10-l01-c2',
        title: 'Find an Unknown Side Length',
        blocks: [
          { kind: 'text', text: 'Subtract the known pair of opposite sides from the perimeter, then divide the remaining distance equally between the unknown pair.' },
          { kind: 'example', text: 'If P = 30 and l = 9, then 30 - 18 = 12, so each width is 6.' },
          { kind: 'tip', text: 'Check by adding all four side lengths.' },
        ],
      },
      {
        id: 'math-u10-l01-c3',
        title: 'Solve a Perimeter Situation',
        blocks: [
          { kind: 'text', text: 'Decide whether the context asks for the full boundary, one side, or a comparison of boundaries.' },
          { kind: 'example', text: 'A fence around a 12-by-7-yard garden needs 2(12 + 7) = 38 yards.' },
          { kind: 'tip', text: 'A diagram helps label opposite sides and prevents omitting one edge.' },
        ],
      },
    ],
    workedExample: {
      title: 'Find a missing garden width',
      steps: [
        'A rectangular garden has perimeter 46 meters and length 15 meters.',
        'Two lengths use 2 × 15 = 30 meters, leaving 46 - 30 = 16 meters for both widths.',
        'Each width is 16 ÷ 2 = 8 meters; check 15 + 8 + 15 + 8 = 46.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u10-l01-q01', type: 'multiple-choice', conceptTag: 'perimeter-formula', reviewCardId: 'math-u10-l01-c1', prompt: 'What is the perimeter of a rectangle 8 meters long and 5 meters wide?', choices: [{ id: 'a', text: '26 meters' }, { id: 'b', text: '40 square meters' }, { id: 'c', text: '13 meters' }, { id: 'd', text: '21 meters' }], correctChoiceId: 'a', explanation: 'Two times 8 plus two times 5 equals 26 meters.' },
        { id: 'math-u10-l01-q02', type: 'fill-blank', conceptTag: 'perimeter-formula', reviewCardId: 'math-u10-l01-c1', prompt: 'A rectangle is 12 feet by 4 feet. Its perimeter is ___ feet.', acceptedAnswers: ['32'], explanation: 'Two times 12 plus two times 4 equals 32.' },
        { id: 'math-u10-l01-q03', type: 'true-false', conceptTag: 'perimeter-formula', reviewCardId: 'math-u10-l01-c1', prompt: 'The perimeter formula P = 2(l + w) counts all four sides of a rectangle.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Doubling length plus width includes both opposite pairs.' },
        { id: 'math-u10-l01-q04', type: 'multiple-choice', conceptTag: 'perimeter-formula', reviewCardId: 'math-u10-l01-c1', prompt: 'Which unit correctly labels a perimeter of a playground?', choices: [{ id: 'a', text: 'Meters' }, { id: 'b', text: 'Square meters' }, { id: 'c', text: 'Cubic meters' }, { id: 'd', text: 'Liters' }], correctChoiceId: 'a', explanation: 'Perimeter is a one-dimensional distance, so it uses linear units.' },
        { id: 'math-u10-l01-q05', type: 'multiple-choice', conceptTag: 'unknown-side', reviewCardId: 'math-u10-l01-c2', prompt: 'A rectangle has perimeter 30 inches and length 9 inches. What is its width?', choices: [{ id: 'a', text: '6 inches' }, { id: 'b', text: '12 inches' }, { id: 'c', text: '21 inches' }, { id: 'd', text: '3 inches' }], correctChoiceId: 'a', explanation: 'After two 9-inch lengths use 18 inches, 12 inches remain for two equal widths.' },
        { id: 'math-u10-l01-q06', type: 'fill-blank', conceptTag: 'unknown-side', reviewCardId: 'math-u10-l01-c2', prompt: 'A rectangle has perimeter 50 yards and width 7 yards. Its length is ___ yards.', acceptedAnswers: ['18'], explanation: 'Two widths use 14 yards; the remaining 36 yards split into two 18-yard lengths.' },
        { id: 'math-u10-l01-q07', type: 'true-false', conceptTag: 'unknown-side', reviewCardId: 'math-u10-l01-c2', prompt: 'A rectangle with perimeter 44 centimeters and length 14 centimeters has width 8 centimeters.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Fourteen plus 8 plus 14 plus 8 equals 44.' },
        { id: 'math-u10-l01-q08', type: 'multiple-choice', conceptTag: 'unknown-side', reviewCardId: 'math-u10-l01-c2', prompt: 'Which equation finds unknown width w when P = 38 and length is 12?', choices: [{ id: 'a', text: '2(12) + 2w = 38' }, { id: 'b', text: '12w = 38' }, { id: 'c', text: '12 + w = 38' }, { id: 'd', text: '2(38) + w = 12' }], correctChoiceId: 'a', explanation: 'The perimeter includes two known lengths and two unknown widths.' },
        { id: 'math-u10-l01-q09', type: 'multiple-choice', conceptTag: 'perimeter-situation', reviewCardId: 'math-u10-l01-c3', prompt: 'How much fencing surrounds a 12-yard by 7-yard rectangular garden?', choices: [{ id: 'a', text: '38 yards' }, { id: 'b', text: '84 square yards' }, { id: 'c', text: '19 yards' }, { id: 'd', text: '31 yards' }], correctChoiceId: 'a', explanation: 'Two times 12 plus two times 7 equals 38 yards.' },
        { id: 'math-u10-l01-q10', type: 'fill-blank', conceptTag: 'perimeter-situation', reviewCardId: 'math-u10-l01-c3', prompt: 'A rectangular picture frame is 10 inches by 6 inches. The outer edge measures ___ inches.', acceptedAnswers: ['32'], explanation: 'The perimeter is 2(10 + 6) = 32 inches.' },
        { id: 'math-u10-l01-q11', type: 'true-false', conceptTag: 'perimeter-situation', reviewCardId: 'math-u10-l01-c3', prompt: 'A 9-foot by 4-foot rug has a perimeter of 36 feet.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'false', explanation: 'Its perimeter is 2(9 + 4) = 26 feet.' },
        { id: 'math-u10-l01-q12', type: 'multiple-choice', conceptTag: 'perimeter-situation', reviewCardId: 'math-u10-l01-c3', prompt: 'A rectangular trail has perimeter 60 meters and width 10 meters. What is its length?', choices: [{ id: 'a', text: '20 meters' }, { id: 'b', text: '40 meters' }, { id: 'c', text: '25 meters' }, { id: 'd', text: '15 meters' }], correctChoiceId: 'a', explanation: 'Two widths use 20 meters; the remaining 40 meters split into two 20-meter lengths.' },
        { id: 'math-u10-l01-q13', type: 'multiple-choice', conceptTag: 'perimeter-situation', reviewCardId: 'math-u10-l01-c3', prompt: 'Which statement distinguishes perimeter from area?', choices: [{ id: 'a', text: 'Perimeter measures the boundary in linear units.' }, { id: 'b', text: 'Perimeter measures inside space in square units.' }, { id: 'c', text: 'Perimeter is found only by multiplying length and width.' }, { id: 'd', text: 'Perimeter uses liters.' }], correctChoiceId: 'a', explanation: 'Perimeter is the one-dimensional distance around a shape.' },
      ],
    },
  },
  {
    id: 'math-u10-l02',
    unitId: 'math-u10',
    title: 'Rectangle Area in Square Units',
    indicatorCodes: ['4.MGSR.1.2'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Area measures the surface inside a rectangle.' },
      { speaker: 'kid', text: 'Equal rows of square units can cover the region without gaps or overlaps.' },
      { speaker: 'nutty', pose: 'cheer', text: 'The area formula multiplies side lengths.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will solve and label area situations in square units.' },
    ],
    learnCards: [
      {
        id: 'math-u10-l02-c1',
        title: 'Use the Area Formula',
        blocks: [
          { kind: 'text', text: 'For rectangle length l and width w, area is A = l × w.' },
          { kind: 'example', text: 'An 8-foot by 5-foot rectangle has A = 8 × 5 = 40 square feet.' },
          { kind: 'tip', text: 'Multiplying two lengths creates square units, not linear units.' },
        ],
      },
      {
        id: 'math-u10-l02-c2',
        title: 'Connect Rows to Square Units',
        blocks: [
          { kind: 'text', text: 'An array shows why length × width counts every unit square exactly once.' },
          { kind: 'example', text: 'Eight rows of 5 squares contain 40 square units.' },
          { kind: 'tip', text: 'The unit square’s side length determines whether the label is square inches, square feet, or another square unit.' },
        ],
        widget: { type: 'area-model-multiplier', config: { a: 8, b: 5, splitA: [8], splitB: [5], targetProduct: 40, revealMode: 'all' } },
        widgetCoach: {
          intro: [
            { speaker: 'guide', pose: 'think', text: 'This rectangle has eight rows of five unit squares. How many square units cover it?' },
            { speaker: 'kid', text: 'I will work out a total, then check how the rows cover the rectangle.' },
          ],
          reactions: {
            strategy: { text: 'Use the number in each row and the total number of rows.', pose: 'think' },
            retry: { text: 'Count each unit square once, with no gaps or overlaps.', pose: 'oops' },
            milestone: { text: 'Your total fits the side lengths. Connect it to the equal rows.', pose: 'think' },
            complete: { text: 'The rectangle contains 40 unit squares: 8 × 5 = 40 square units.', pose: 'cheer' },
          },
        },
      },
      {
        id: 'math-u10-l02-c3',
        title: 'Solve and Label an Area Situation',
        blocks: [
          { kind: 'text', text: 'Identify the two perpendicular side lengths, multiply them, and attach square units.' },
          { kind: 'example', text: 'A 12-meter by 7-meter garden covers 84 square meters.' },
          { kind: 'tip', text: 'Check whether the question asks for inside space; a boundary question asks for perimeter instead.' },
        ],
      },
    ],
    workedExample: {
      title: 'Find the floor area',
      steps: [
        'A rectangular floor is 14 feet long and 9 feet wide.',
        'Apply A = l × w: 14 × 9 = 126.',
        'The floor covers 126 square feet because area counts unit squares.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u10-l02-q01', type: 'multiple-choice', conceptTag: 'area-formula', reviewCardId: 'math-u10-l02-c1', prompt: 'What is the area of an 8-foot by 5-foot rectangle?', choices: [{ id: 'a', text: '40 square feet' }, { id: 'b', text: '26 feet' }, { id: 'c', text: '13 square feet' }, { id: 'd', text: '80 feet' }], correctChoiceId: 'a', explanation: 'Eight times 5 is 40, and area uses square feet.' },
        { id: 'math-u10-l02-q02', type: 'fill-blank', conceptTag: 'area-formula', reviewCardId: 'math-u10-l02-c1', prompt: 'A rectangle is 9 meters by 6 meters. Its area is ___ square meters.', acceptedAnswers: ['54'], explanation: 'Nine times 6 equals 54.' },
        { id: 'math-u10-l02-q03', type: 'true-false', conceptTag: 'area-formula', reviewCardId: 'math-u10-l02-c1', prompt: 'The formula A = l × w finds the area of a rectangle.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Multiplying perpendicular side lengths counts the unit squares.' },
        { id: 'math-u10-l02-q04', type: 'multiple-choice', conceptTag: 'area-formula', reviewCardId: 'math-u10-l02-c1', prompt: 'Which label correctly completes “The poster covers 72 ___”?', choices: [{ id: 'a', text: 'square inches' }, { id: 'b', text: 'inches' }, { id: 'c', text: 'cubic inches' }, { id: 'd', text: 'fluid ounces' }], correctChoiceId: 'a', explanation: 'Area is measured in square units.' },
        { id: 'math-u10-l02-q05', type: 'multiple-choice', conceptTag: 'square-units', reviewCardId: 'math-u10-l02-c2', prompt: 'An array has 7 rows of 4 unit squares. What area does it show?', choices: [{ id: 'a', text: '28 square units' }, { id: 'b', text: '22 square units' }, { id: 'c', text: '11 units' }, { id: 'd', text: '14 square units' }], correctChoiceId: 'a', explanation: 'Seven times 4 counts 28 unit squares.' },
        { id: 'math-u10-l02-q06', type: 'fill-blank', conceptTag: 'square-units', reviewCardId: 'math-u10-l02-c2', prompt: 'A model has 12 columns and 3 rows. It contains ___ unit squares.', acceptedAnswers: ['36'], explanation: 'Twelve times 3 equals 36.' },
        { id: 'math-u10-l02-q07', type: 'true-false', conceptTag: 'square-units', reviewCardId: 'math-u10-l02-c2', prompt: 'A 5-by-5 square contains 25 square units.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Five rows of 5 unit squares total 25.' },
        { id: 'math-u10-l02-q08', type: 'multiple-choice', conceptTag: 'square-units', reviewCardId: 'math-u10-l02-c2', prompt: 'Why does a 6-centimeter by 4-centimeter rectangle have area 24 square centimeters?', choices: [{ id: 'a', text: 'Six rows of 4 one-centimeter squares cover it.' }, { id: 'b', text: 'Its four sides add to 24.' }, { id: 'c', text: 'Six plus 4 equals 24.' }, { id: 'd', text: 'Centimeters are liquid units.' }], correctChoiceId: 'a', explanation: 'The product counts the covering unit squares.' },
        { id: 'math-u10-l02-q09', type: 'multiple-choice', conceptTag: 'area-situation', reviewCardId: 'math-u10-l02-c3', prompt: 'A garden is 12 meters by 7 meters. What is its area?', choices: [{ id: 'a', text: '84 square meters' }, { id: 'b', text: '38 meters' }, { id: 'c', text: '19 square meters' }, { id: 'd', text: '96 square meters' }], correctChoiceId: 'a', explanation: 'Twelve times 7 equals 84 square meters.' },
        { id: 'math-u10-l02-q10', type: 'fill-blank', conceptTag: 'area-situation', reviewCardId: 'math-u10-l02-c3', prompt: 'A rectangular rug is 15 feet long and 8 feet wide. Its area is ___ square feet.', acceptedAnswers: ['120'], explanation: 'Fifteen times 8 equals 120.' },
        { id: 'math-u10-l02-q11', type: 'true-false', conceptTag: 'area-situation', reviewCardId: 'math-u10-l02-c3', prompt: 'A room measuring 10 feet by 9 feet has area 90 square feet.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Ten times 9 equals 90.' },
        { id: 'math-u10-l02-q12', type: 'multiple-choice', conceptTag: 'area-situation', reviewCardId: 'math-u10-l02-c3', prompt: 'A wall section has area 63 square yards and width 7 yards. What length produces that area?', choices: [{ id: 'a', text: '9 yards' }, { id: 'b', text: '56 yards' }, { id: 'c', text: '70 yards' }, { id: 'd', text: '8 yards' }], correctChoiceId: 'a', explanation: 'Seven times 9 equals 63.' },
        { id: 'math-u10-l02-q13', type: 'multiple-choice', conceptTag: 'area-situation', reviewCardId: 'math-u10-l02-c3', prompt: 'Which question asks for area rather than perimeter?', choices: [{ id: 'a', text: 'How many square tiles cover the floor?' }, { id: 'b', text: 'How much fence surrounds the yard?' }, { id: 'c', text: 'How long is the frame edge?' }, { id: 'd', text: 'What is the distance around the court?' }], correctChoiceId: 'a', explanation: 'Covering an inside surface with square tiles is an area question.' },
      ],
    },
  },
] satisfies Lesson[];
