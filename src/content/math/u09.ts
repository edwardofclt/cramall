import type { Lesson } from '../schema';

export const unit09Lessons = [
  {
    id: 'math-u09-l01',
    unitId: 'math-u09',
    title: 'Money Collections and Purchases',
    indicatorCodes: ['4.MGSR.2.1'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Coins and bills can be combined into one total value.' },
      { speaker: 'kid', text: 'Cents and dollars must stay aligned when we calculate.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Comparing the total with a price tells whether a purchase is possible.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will justify each decision with an equation or difference.' },
    ],
    learnCards: [
      {
        id: 'math-u09-l01-c1',
        title: 'Find Coin and Bill Values',
        blocks: [
          { kind: 'text', text: 'Multiply each denomination by its count, then add all values in cents or dollars.' },
          { kind: 'example', text: 'Two $1 bills, 3 quarters, and 2 dimes total $2.95.' },
          { kind: 'tip', text: 'Convert all values to cents when that makes the addition clearer.' },
        ],
        widget: { type: 'money-counter', config: { targetCents: 635, denominations: [1, 5, 10, 25, 100], taskPrompt: 'Show $6.35 with coins and bills.' } },
        widgetCoach: {
          intro: [
            { speaker: 'guide', pose: 'think', text: 'Show $6.35 by combining labeled coins and bills, then watch each subtotal join the total.' },
            { speaker: 'kid', text: 'I will count in cents first so every denomination lines up exactly.' },
          ],
          reactions: {
            strategy: { text: 'Choose a useful denomination and compare its subtotal with the cents still needed.', pose: 'think' },
            retry: { text: 'That collection moved away from $6.35. Read the subtotal labels and adjust one denomination.', pose: 'oops' },
            milestone: { text: 'Your collection is closer—use the subtotals to plan the next coin or bill.', pose: 'cheer' },
            complete: { text: 'You showed $6.35, or 635 cents, with a labeled collection of coins and bills.', pose: 'cheer' },
          },
        },
      },
      {
        id: 'math-u09-l01-c2',
        title: 'Compare a Total with a Price',
        blocks: [
          { kind: 'text', text: 'Align dollar signs and decimal points before comparing a collection with a price.' },
          { kind: 'example', text: '$6.35 is enough for a $6.20 item because $6.35 > $6.20.' },
          { kind: 'tip', text: 'Equal amounts are also enough; a smaller total is not enough.' },
        ],
      },
      {
        id: 'math-u09-l01-c3',
        title: 'Justify a Purchase Decision',
        blocks: [
          { kind: 'text', text: 'State the comparison and, when useful, find the amount left or the amount still needed.' },
          { kind: 'example', text: '$5.00 - $4.38 = $0.62, so a shopper has enough and will have 62 cents left.' },
          { kind: 'tip', text: 'Include the money unit and two decimal places for dollar amounts.' },
        ],
      },
    ],
    workedExample: {
      title: 'Can $8.15 buy a $7.68 game?',
      steps: [
        'Compare the totals: $8.15 > $7.68, so the collection is enough.',
        'Subtract to justify the difference: $8.15 - $7.68 = $0.47.',
        'The shopper can buy the game and will have 47 cents left.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u09-l01-q01', type: 'multiple-choice', conceptTag: 'money-values', reviewCardId: 'math-u09-l01-c1', prompt: 'What is the value of 3 quarters, 2 dimes, and 4 pennies?', choices: [{ id: 'a', text: '$0.99' }, { id: 'b', text: '$0.94' }, { id: 'c', text: '$1.04' }, { id: 'd', text: '$0.84' }], correctChoiceId: 'a', explanation: 'Seventy-five cents plus 20 cents plus 4 cents is 99 cents.' },
        { id: 'math-u09-l01-q02', type: 'fill-blank', conceptTag: 'money-values', reviewCardId: 'math-u09-l01-c1', prompt: 'Two $1 bills and 6 dimes have a total value of $___.', acceptedAnswers: ['2.60'], explanation: 'Two dollars plus 60 cents is $2.60.' },
        { id: 'math-u09-l01-q03', type: 'true-false', conceptTag: 'money-values', reviewCardId: 'math-u09-l01-c1', prompt: 'Four quarters have the same value as one $1 bill.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Four times 25 cents equals 100 cents, or $1.' },
        { id: 'math-u09-l01-q04', type: 'multiple-choice', conceptTag: 'money-values', reviewCardId: 'math-u09-l01-c1', prompt: 'Which collection equals $3.35?', choices: [{ id: 'a', text: 'Three $1 bills, 1 quarter, and 1 dime' }, { id: 'b', text: 'Three $1 bills and 3 dimes' }, { id: 'c', text: 'Two $1 bills, 4 quarters, and 1 dime' }, { id: 'd', text: 'Three $1 bills, 1 nickel, and 1 penny' }], correctChoiceId: 'a', explanation: 'Three dollars plus 25 cents plus 10 cents equals $3.35.' },
        { id: 'math-u09-l01-q05', type: 'multiple-choice', conceptTag: 'money-comparison', reviewCardId: 'math-u09-l01-c2', prompt: 'Which comparison is true?', choices: [{ id: 'a', text: '$6.35 > $6.20' }, { id: 'b', text: '$6.35 < $6.20' }, { id: 'c', text: '$6.35 = $6.20' }, { id: 'd', text: '$6.20 > $6.53' }], correctChoiceId: 'a', explanation: 'Thirty-five cents is greater than 20 cents when the dollar amounts match.' },
        { id: 'math-u09-l01-q06', type: 'fill-blank', conceptTag: 'money-comparison', reviewCardId: 'math-u09-l01-c2', prompt: 'A collection has $4.75. An item costs $5.00. The collection is short by $___.', acceptedAnswers: ['0.25'], explanation: 'Five dollars minus $4.75 is 25 cents.' },
        { id: 'math-u09-l01-q07', type: 'true-false', conceptTag: 'money-comparison', reviewCardId: 'math-u09-l01-c2', prompt: '$7.08 is enough to buy an item that costs $7.80.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'false', explanation: 'Seven dollars 8 cents is less than seven dollars 80 cents.' },
        { id: 'math-u09-l01-q08', type: 'multiple-choice', conceptTag: 'money-comparison', reviewCardId: 'math-u09-l01-c2', prompt: 'A toy costs $9.45. Which amount is enough?', choices: [{ id: 'a', text: '$9.50' }, { id: 'b', text: '$9.40' }, { id: 'c', text: '$9.05' }, { id: 'd', text: '$8.95' }], correctChoiceId: 'a', explanation: 'Nine dollars 50 cents is greater than $9.45.' },
        { id: 'math-u09-l01-q09', type: 'multiple-choice', conceptTag: 'purchase-decision', reviewCardId: 'math-u09-l01-c3', prompt: 'Mia has $5.00 and buys a notebook for $4.38. Which statement is correct?', choices: [{ id: 'a', text: 'She has enough and will have $0.62 left.' }, { id: 'b', text: 'She needs $0.62 more.' }, { id: 'c', text: 'She has exactly enough.' }, { id: 'd', text: 'She will have $1.62 left.' }], correctChoiceId: 'a', explanation: 'Five dollars minus $4.38 is 62 cents.' },
        { id: 'math-u09-l01-q10', type: 'fill-blank', conceptTag: 'purchase-decision', reviewCardId: 'math-u09-l01-c3', prompt: 'A book costs $6.72. A learner has $6.35. The learner needs $__ more.', acceptedAnswers: ['0.37'], explanation: 'Six dollars 72 cents minus $6.35 is 37 cents.' },
        { id: 'math-u09-l01-q11', type: 'true-false', conceptTag: 'purchase-decision', reviewCardId: 'math-u09-l01-c3', prompt: 'If a snack costs $2.85 and you have $3.00, you have enough because $3.00 - $2.85 = $0.15.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'The positive 15-cent difference justifies the purchase.' },
        { id: 'math-u09-l01-q12', type: 'multiple-choice', conceptTag: 'purchase-decision', reviewCardId: 'math-u09-l01-c3', prompt: 'Which equation justifies that $8.15 is enough for a $7.68 item?', choices: [{ id: 'a', text: '$8.15 - $7.68 = $0.47' }, { id: 'b', text: '$7.68 - $8.15 = $0.47' }, { id: 'c', text: '$8.15 + $7.68 = $0.47' }, { id: 'd', text: '$8.15 - $0.47 = $7.58' }], correctChoiceId: 'a', explanation: 'The total minus the price leaves 47 cents.' },
        { id: 'math-u09-l01-q13', type: 'multiple-choice', conceptTag: 'purchase-decision', reviewCardId: 'math-u09-l01-c3', prompt: 'A shopper has one $5 bill, two $1 bills, and 3 quarters. Can the shopper buy an item costing $7.60?', choices: [{ id: 'a', text: 'Yes; the total is $7.75, leaving $0.15.' }, { id: 'b', text: 'No; the total is $7.25.' }, { id: 'c', text: 'Yes; the total is $8.00.' }, { id: 'd', text: 'No; the shopper needs $0.75.' }], correctChoiceId: 'a', explanation: 'Five dollars plus $2 plus 75 cents is $7.75, which is 15 cents more than the price.' },
      ],
    },
  },
  {
    id: 'math-u09-l02',
    unitId: 'math-u09',
    title: 'Elapsed, Start, and End Time',
    indicatorCodes: ['4.MGSR.2.2'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'A timeline connects start time, elapsed time, and end time.' },
      { speaker: 'kid', text: 'We can add minutes to move forward or subtract minutes to move backward.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Breaking at an hour can make the interval easier to see.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Every problem here uses an interval of 60 minutes or less.' },
    ],
    learnCards: [
      {
        id: 'math-u09-l02-c1',
        title: 'Read Start and End Times',
        blocks: [
          { kind: 'text', text: 'Read the hour and minute for each endpoint and notice whether the interval crosses an hour.' },
          { kind: 'example', text: 'From 9:45 to 10:05, move 15 minutes to 10:00 and 5 more minutes to 10:05.' },
          { kind: 'tip', text: 'Write times with a colon and include a.m. or p.m. when the context needs it.' },
        ],
      },
      {
        id: 'math-u09-l02-c2',
        title: 'Find Elapsed Time',
        blocks: [
          { kind: 'text', text: 'Count forward from the start to the end in friendly jumps, then add the jumps.' },
          { kind: 'example', text: 'From 9:45 to 10:05 is 15 + 5 = 20 minutes.' },
          { kind: 'tip', text: 'The minute hand moving one full circle represents 60 minutes.' },
        ],
        widget: { type: 'clock-elapsed-time', config: { mode: 'elapsed', startTime: '09:00', elapsedMinutes: 35, minuteStep: 5, jumpMinutes: [5, 10, 15] } },
        widgetCoach: {
          intro: [
            { speaker: 'guide', pose: 'think', text: 'Use friendly jumps to add the elapsed minutes from the start time, pausing at an hour when it helps.' },
            { speaker: 'kid', text: 'I will keep each jump visible and add them until the current clock reaches the end.' },
          ],
          reactions: {
            strategy: { text: 'Choose a jump that fits the minutes remaining, then read the new current time.', pose: 'think' },
            retry: { text: 'That jump would pass the end. Use a smaller remaining interval and keep the total honest.', pose: 'oops' },
            milestone: { text: 'You crossed an hour—record that friendly jump before adding the next one.', pose: 'cheer' },
            complete: { text: 'Your jumps add to 35 minutes, taking 9:00 AM to 9:35 AM.', pose: 'cheer' },
          },
        },
      },
      {
        id: 'math-u09-l02-c3',
        title: 'Find a Missing Start or End Time',
        blocks: [
          { kind: 'text', text: 'Add the elapsed interval to find an end time; subtract it to find a start time.' },
          { kind: 'example', text: 'A 35-minute lesson ending at 2:20 starts at 1:45.' },
          { kind: 'tip', text: 'Check by counting forward from the found start to the stated end.' },
        ],
      },
    ],
    workedExample: {
      title: 'Find a missing start time',
      steps: [
        'A hike ends at 11:10 a.m. after 45 minutes.',
        'Count backward 10 minutes to 11:00, then 35 more minutes to 10:25.',
        'Check forward: 10:25 + 35 minutes = 11:00, plus 10 minutes = 11:10.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u09-l02-q01', type: 'multiple-choice', conceptTag: 'clock-times', reviewCardId: 'math-u09-l02-c1', prompt: 'Which time is 20 minutes after 9:45?', choices: [{ id: 'a', text: '10:05' }, { id: 'b', text: '9:55' }, { id: 'c', text: '10:15' }, { id: 'd', text: '9:25' }], correctChoiceId: 'a', explanation: 'Fifteen minutes reaches 10:00 and 5 more reaches 10:05.' },
        { id: 'math-u09-l02-q02', type: 'fill-blank', conceptTag: 'clock-times', reviewCardId: 'math-u09-l02-c1', prompt: 'A clock shows 3:25. Fifteen minutes later it shows ___.', acceptedAnswers: ['3:40'], explanation: 'Twenty-five minutes plus 15 minutes is 40 minutes past 3.' },
        { id: 'math-u09-l02-q03', type: 'true-false', conceptTag: 'clock-times', reviewCardId: 'math-u09-l02-c1', prompt: 'From 1:50 to 2:10 is a 20-minute interval.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Ten minutes reaches 2:00 and 10 more reaches 2:10.' },
        { id: 'math-u09-l02-q04', type: 'multiple-choice', conceptTag: 'clock-times', reviewCardId: 'math-u09-l02-c1', prompt: 'A practice starts at 4:05 and lasts 50 minutes. Which time is the endpoint?', choices: [{ id: 'a', text: '4:55' }, { id: 'b', text: '5:05' }, { id: 'c', text: '4:45' }, { id: 'd', text: '5:55' }], correctChoiceId: 'a', explanation: 'Adding 50 minutes to 4:05 gives 4:55.' },
        { id: 'math-u09-l02-q05', type: 'multiple-choice', conceptTag: 'elapsed-time', reviewCardId: 'math-u09-l02-c2', prompt: 'How much time passes from 8:35 to 9:10?', choices: [{ id: 'a', text: '35 minutes' }, { id: 'b', text: '25 minutes' }, { id: 'c', text: '45 minutes' }, { id: 'd', text: '55 minutes' }], correctChoiceId: 'a', explanation: 'Twenty-five minutes reaches 9:00 and 10 more reaches 9:10.' },
        { id: 'math-u09-l02-q06', type: 'fill-blank', conceptTag: 'elapsed-time', reviewCardId: 'math-u09-l02-c2', prompt: 'How many minutes pass from 2:18 to 2:53?', acceptedAnswers: ['35'], explanation: 'Fifty-three minus 18 is 35 minutes.' },
        { id: 'math-u09-l02-q07', type: 'true-false', conceptTag: 'elapsed-time', reviewCardId: 'math-u09-l02-c2', prompt: 'The elapsed time from 6:40 to 7:25 is 45 minutes.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Twenty minutes reaches 7:00 and 25 more reaches 7:25.' },
        { id: 'math-u09-l02-q08', type: 'sort', conceptTag: 'elapsed-time', reviewCardId: 'math-u09-l02-c2', prompt: 'Order the jumps for finding elapsed time from 9:47 to 10:22.', items: [{ id: 'a', text: 'Move 13 minutes to 10:00.' }, { id: 'b', text: 'Move 20 minutes to 10:20.' }, { id: 'c', text: 'Move 2 minutes to 10:22.' }, { id: 'd', text: 'Add 13 + 20 + 2 = 35 minutes.' }], correctOrder: ['a', 'b', 'c', 'd'], explanation: 'Counting through friendly times gives a total of 35 minutes.' },
        { id: 'math-u09-l02-q09', type: 'multiple-choice', conceptTag: 'missing-time', reviewCardId: 'math-u09-l02-c3', prompt: 'A movie starts at 1:35 and lasts 55 minutes. When does it end?', choices: [{ id: 'a', text: '2:30' }, { id: 'b', text: '2:20' }, { id: 'c', text: '1:90' }, { id: 'd', text: '2:40' }], correctChoiceId: 'a', explanation: 'Twenty-five minutes reaches 2:00 and 30 more reaches 2:30.' },
        { id: 'math-u09-l02-q10', type: 'fill-blank', conceptTag: 'missing-time', reviewCardId: 'math-u09-l02-c3', prompt: 'A 40-minute class ends at 11:15. It starts at ___.', acceptedAnswers: ['10:35'], explanation: 'Counting backward 15 minutes to 11:00 and 25 more gives 10:35.' },
        { id: 'math-u09-l02-q11', type: 'true-false', conceptTag: 'missing-time', reviewCardId: 'math-u09-l02-c3', prompt: 'A 30-minute walk ending at 5:05 began at 4:35.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Adding 30 minutes to 4:35 gives 5:05.' },
        { id: 'math-u09-l02-q12', type: 'multiple-choice', conceptTag: 'missing-time', reviewCardId: 'math-u09-l02-c3', prompt: 'Which equation finds the start time s for a 25-minute activity ending at 3:50?', choices: [{ id: 'a', text: 's + 25 minutes = 3:50' }, { id: 'b', text: '3:50 + 25 minutes = s' }, { id: 'c', text: 's - 25 minutes = 3:50' }, { id: 'd', text: '25 - s = 3:50' }], correctChoiceId: 'a', explanation: 'Start plus elapsed time equals end time.' },
        { id: 'math-u09-l02-q13', type: 'fill-blank', conceptTag: 'missing-time', reviewCardId: 'math-u09-l02-c3', prompt: 'A trip begins at 7:42 and ends 48 minutes later. The end time is ___.', acceptedAnswers: ['8:30'], explanation: 'Eighteen minutes reaches 8:00 and 30 more reaches 8:30.' },
      ],
    },
  },
  {
    id: 'math-u09-l03',
    unitId: 'math-u09',
    title: 'Measure to the Nearest Quarter Inch',
    indicatorCodes: ['4.MGSR.2.3'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'An inch can be divided into four equal quarter-inch parts.' },
      { speaker: 'kid', text: 'The marks name fourths: 0, 1/4, 1/2, 3/4, and 1 inch.' },
      { speaker: 'nutty', pose: 'cheer', text: 'An endpoint between marks rounds to the nearest quarter inch.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will read, round, and apply measured lengths.' },
    ],
    learnCards: [
      {
        id: 'math-u09-l03-c1',
        title: 'Read Quarter-Inch Marks',
        blocks: [
          { kind: 'text', text: 'Four equal spaces divide each inch, so each small step is 1/4 inch.' },
          { kind: 'example', text: 'After 2 inches, the next marks are 2 1/4, 2 1/2, and 2 3/4 inches.' },
          { kind: 'tip', text: 'Count spaces from zero, not just printed tick lines.' },
        ],
      },
      {
        id: 'math-u09-l03-c2',
        title: 'Choose the Nearest Quarter Inch',
        blocks: [
          { kind: 'text', text: 'Locate the endpoint between neighboring quarter-inch marks and choose the closer mark.' },
          { kind: 'example', text: 'A length of about 4.72 inches is closer to 4.75 than to 4.50, so it rounds to 4 3/4 inches.' },
          { kind: 'tip', text: 'If measuring a real object, align one end with zero before reading the other end.' },
        ],
        widget: { type: 'quarter-inch-ruler', config: { lengthInches: 5, targetInches: 4.75, startInches: 0, taskPrompt: 'Place the object endpoint at 4¾ inches.' } },
        widgetCoach: {
          intro: [
            { speaker: 'guide', pose: 'think', text: 'Measure the visible object from zero to its endpoint, then place the marker at 4¾ inches.' },
            { speaker: 'kid', text: 'I will count quarter-inch steps from the aligned zero end.' },
          ],
          reactions: {
            strategy: { text: 'Compare the marker with the object endpoint and move one quarter-inch step toward 4¾.', pose: 'think' },
            retry: { text: 'The marker moved away from the endpoint. Recheck the neighboring quarter-inch marks.', pose: 'oops' },
            milestone: { text: 'The marker is closer to the object endpoint—keep using the quarter-inch steps.', pose: 'cheer' },
            complete: { text: 'You measured the object at 4¾ inches by aligning its end with zero.', pose: 'cheer' },
          },
        },
      },
      {
        id: 'math-u09-l03-c3',
        title: 'Use a Quarter-Inch Measurement',
        blocks: [
          { kind: 'text', text: 'Record the rounded number and the unit inches, then use it in a comparison or simple context.' },
          { kind: 'example', text: 'A 3 1/4-inch strip is 1/2 inch longer than a 2 3/4-inch strip.' },
          { kind: 'tip', text: 'Measurement is approximate when an endpoint falls between marked values.' },
        ],
      },
    ],
    workedExample: {
      title: 'Measure an endpoint near 3.62 inches',
      steps: [
        'The neighboring quarter-inch marks are 3 1/2 inches (3.50) and 3 3/4 inches (3.75).',
        'The endpoint is 0.12 from 3.50 and 0.13 from 3.75.',
        'It is slightly closer to 3 1/2 inches, so record 3 1/2 inches.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u09-l03-q01', type: 'multiple-choice', conceptTag: 'quarter-inch-marks', reviewCardId: 'math-u09-l03-c1', prompt: 'What is the first quarter-inch mark after 2 inches?', choices: [{ id: 'a', text: '2 1/4 inches' }, { id: 'b', text: '2 1/2 inches' }, { id: 'c', text: '2 3/4 inches' }, { id: 'd', text: '3 inches' }], correctChoiceId: 'a', explanation: 'One quarter-inch step after 2 is 2 1/4.' },
        { id: 'math-u09-l03-q02', type: 'fill-blank', conceptTag: 'quarter-inch-marks', reviewCardId: 'math-u09-l03-c1', prompt: 'The third quarter-inch mark after 5 inches is 5 ___/4 inches.', acceptedAnswers: ['3'], explanation: 'The three marks are 5 1/4, 5 2/4, and 5 3/4.' },
        { id: 'math-u09-l03-q03', type: 'true-false', conceptTag: 'quarter-inch-marks', reviewCardId: 'math-u09-l03-c1', prompt: 'The mark halfway between 6 and 7 inches is 6 1/2 inches.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Two quarter-inch steps equal one half inch.' },
        { id: 'math-u09-l03-q04', type: 'sort', conceptTag: 'quarter-inch-marks', reviewCardId: 'math-u09-l03-c1', prompt: 'Order these marks from left to right between 3 and 4 inches.', items: [{ id: 'a', text: '3 inches' }, { id: 'b', text: '3 1/4 inches' }, { id: 'c', text: '3 1/2 inches' }, { id: 'd', text: '3 3/4 inches' }, { id: 'e', text: '4 inches' }], correctOrder: ['a', 'b', 'c', 'd', 'e'], explanation: 'Quarter-inch marks increase by one fourth from 3 to 4.' },
        { id: 'math-u09-l03-q05', type: 'multiple-choice', conceptTag: 'nearest-quarter-inch', reviewCardId: 'math-u09-l03-c2', prompt: 'A pencil endpoint is at about 4.72 inches. What is its length to the nearest quarter inch?', choices: [{ id: 'a', text: '4 3/4 inches' }, { id: 'b', text: '4 1/2 inches' }, { id: 'c', text: '5 inches' }, { id: 'd', text: '4 1/4 inches' }], correctChoiceId: 'a', explanation: '4.72 is closest to 4.75, which is 4 3/4.' },
        { id: 'math-u09-l03-q06', type: 'fill-blank', conceptTag: 'nearest-quarter-inch', reviewCardId: 'math-u09-l03-c2', prompt: 'A strip measures about 2.48 inches. To the nearest quarter inch, it is ___ inches.', acceptedAnswers: ['2 1/2'], explanation: '2.48 is closest to 2.50, or 2 1/2.' },
        { id: 'math-u09-l03-q07', type: 'true-false', conceptTag: 'nearest-quarter-inch', reviewCardId: 'math-u09-l03-c2', prompt: 'A length of about 1.12 inches rounds to 1 inch to the nearest quarter inch.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'It is 0.12 from 1 and 0.13 from 1 1/4.' },
        { id: 'math-u09-l03-q08', type: 'multiple-choice', conceptTag: 'nearest-quarter-inch', reviewCardId: 'math-u09-l03-c2', prompt: 'Which quarter-inch value is nearest to 6.63 inches?', choices: [{ id: 'a', text: '6 3/4 inches' }, { id: 'b', text: '6 1/2 inches' }, { id: 'c', text: '6 1/4 inches' }, { id: 'd', text: '7 inches' }], correctChoiceId: 'a', explanation: '6.63 is slightly closer to 6.75 than to 6.50.' },
        { id: 'math-u09-l03-q09', type: 'multiple-choice', conceptTag: 'measurement-application', reviewCardId: 'math-u09-l03-c3', prompt: 'A ribbon is 3 1/4 inches and another is 2 3/4 inches. How much longer is the first?', choices: [{ id: 'a', text: '1/2 inch' }, { id: 'b', text: '1/4 inch' }, { id: 'c', text: '3/4 inch' }, { id: 'd', text: '1 inch' }], correctChoiceId: 'a', explanation: 'Thirteen fourths minus eleven fourths is two fourths, or one half.' },
        { id: 'math-u09-l03-q10', type: 'fill-blank', conceptTag: 'measurement-application', reviewCardId: 'math-u09-l03-c3', prompt: 'Two boards measure 1 1/2 inches and 2 1/4 inches. Their combined length is ___ inches.', acceptedAnswers: ['3 3/4'], explanation: 'Six fourths plus nine fourths is fifteen fourths, or 3 3/4.' },
        { id: 'math-u09-l03-q11', type: 'true-false', conceptTag: 'measurement-application', reviewCardId: 'math-u09-l03-c3', prompt: 'A 5 3/4-inch object is shorter than a 5 1/2-inch object.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'false', explanation: 'Three fourths is greater than one half, so 5 3/4 is longer.' },
        { id: 'math-u09-l03-q12', type: 'multiple-choice', conceptTag: 'measurement-application', reviewCardId: 'math-u09-l03-c3', prompt: 'Why should an object’s end be aligned with zero before measuring?', choices: [{ id: 'a', text: 'So the endpoint reading equals the object’s length' }, { id: 'b', text: 'So every object rounds up' }, { id: 'c', text: 'So the ruler becomes longer' }, { id: 'd', text: 'So inches change into centimeters' }], correctChoiceId: 'a', explanation: 'Starting at zero makes the final mark show the full length directly.' },
        { id: 'math-u09-l03-q13', type: 'multiple-choice', conceptTag: 'measurement-application', reviewCardId: 'math-u09-l03-c3', prompt: 'A craft needs a piece at least 4 1/2 inches long. Which measured piece works?', choices: [{ id: 'a', text: '4 3/4 inches' }, { id: 'b', text: '4 1/4 inches' }, { id: 'c', text: '4 inches' }, { id: 'd', text: '3 3/4 inches' }], correctChoiceId: 'a', explanation: 'Four and three fourths is greater than the required 4 1/2 inches.' },
      ],
    },
  },
  {
    id: 'math-u09-l04',
    unitId: 'math-u09',
    title: 'Measure Customary and Metric Weight',
    indicatorCodes: ['4.MGSR.2.4'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Weight can be described with customary or metric units.' },
      { speaker: 'kid', text: 'The object’s size helps us choose a sensible unit and tool.' },
      { speaker: 'nutty', pose: 'cheer', text: 'A scale reading between whole marks is rounded to the nearest whole unit.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will name, choose, read, and record weight units.' },
    ],
    learnCards: [
      {
        id: 'math-u09-l04-c1',
        title: 'Name Customary and Metric Weight Units',
        blocks: [
          { kind: 'text', text: 'Ounces and pounds are customary weight units; grams and kilograms are metric weight units.' },
          { kind: 'example', text: 'A paper clip may weigh about 1 gram, while a backpack may weigh several kilograms.' },
          { kind: 'tip', text: 'Always include the unit because the same numeral can describe very different weights.' },
        ],
      },
      {
        id: 'math-u09-l04-c2',
        title: 'Choose a Sensible Unit',
        blocks: [
          { kind: 'text', text: 'Use smaller units for light objects and larger units for heavier objects.' },
          { kind: 'example', text: 'An apple is sensibly measured in ounces or grams; a large dog is sensibly measured in pounds or kilograms.' },
          { kind: 'tip', text: 'Choose from the allowed unit system before estimating the number.' },
        ],
      },
      {
        id: 'math-u09-l04-c3',
        title: 'Record the Nearest Whole Unit',
        blocks: [
          { kind: 'text', text: 'Read the scale value, compare it with neighboring whole units, and record the closer whole number.' },
          { kind: 'example', text: 'A metric scale reading 2.6 kilograms rounds to 3 kilograms.' },
          { kind: 'tip', text: 'A reading below the halfway point rounds down; a reading at or above halfway rounds up.' },
        ],
      },
    ],
    workedExample: {
      title: 'Record a package weight',
      steps: [
        'A customary scale points to 6.4 pounds, between 6 and 7 pounds.',
        'The reading is 0.4 from 6 and 0.6 from 7, so 6 is closer.',
        'Record the package weight as 6 pounds to the nearest whole pound.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u09-l04-q01', type: 'multiple-choice', conceptTag: 'weight-units', reviewCardId: 'math-u09-l04-c1', prompt: 'Which pair contains customary weight units?', choices: [{ id: 'a', text: 'Ounces and pounds' }, { id: 'b', text: 'Grams and kilograms' }, { id: 'c', text: 'Inches and feet' }, { id: 'd', text: 'Cups and pints' }], correctChoiceId: 'a', explanation: 'Ounces and pounds are customary units for weight.' },
        { id: 'math-u09-l04-q02', type: 'fill-blank', conceptTag: 'weight-units', reviewCardId: 'math-u09-l04-c1', prompt: 'The metric unit smaller than a kilogram is a ___.', acceptedAnswers: ['gram'], explanation: 'Grams measure lighter metric weights.' },
        { id: 'math-u09-l04-q03', type: 'true-false', conceptTag: 'weight-units', reviewCardId: 'math-u09-l04-c1', prompt: 'Pounds and kilograms can both describe the weight of a heavy object.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Pounds are customary and kilograms are metric, but both are weight units.' },
        { id: 'math-u09-l04-q04', type: 'multiple-choice', conceptTag: 'weight-units', reviewCardId: 'math-u09-l04-c1', prompt: 'Which word completes “A marker weighs about 12 ___” most sensibly?', choices: [{ id: 'a', text: 'grams' }, { id: 'b', text: 'kilograms' }, { id: 'c', text: 'pounds' }, { id: 'd', text: 'yards' }], correctChoiceId: 'a', explanation: 'A marker is light enough for grams.' },
        { id: 'math-u09-l04-q05', type: 'multiple-choice', conceptTag: 'weight-unit-choice', reviewCardId: 'math-u09-l04-c2', prompt: 'Which unit is most sensible for the weight of a large dog in the customary system?', choices: [{ id: 'a', text: 'Pounds' }, { id: 'b', text: 'Ounces' }, { id: 'c', text: 'Grams' }, { id: 'd', text: 'Kilograms' }], correctChoiceId: 'a', explanation: 'Pounds are the larger customary weight unit in this lesson.' },
        { id: 'math-u09-l04-q06', type: 'fill-blank', conceptTag: 'weight-unit-choice', reviewCardId: 'math-u09-l04-c2', prompt: 'A small strawberry might weigh about 20 ___.', acceptedAnswers: ['grams'], explanation: 'Grams are a sensible metric unit for a light strawberry.' },
        { id: 'math-u09-l04-q07', type: 'true-false', conceptTag: 'weight-unit-choice', reviewCardId: 'math-u09-l04-c2', prompt: 'Kilograms are a sensible unit for the weight of a school backpack.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'A backpack can weigh several kilograms.' },
        { id: 'math-u09-l04-q08', type: 'multiple-choice', conceptTag: 'weight-unit-choice', reviewCardId: 'math-u09-l04-c2', prompt: 'Which unit is most sensible for one slice of bread in the customary system?', choices: [{ id: 'a', text: 'Ounces' }, { id: 'b', text: 'Pounds' }, { id: 'c', text: 'Kilograms' }, { id: 'd', text: 'Feet' }], correctChoiceId: 'a', explanation: 'A slice is light, so ounces are sensible.' },
        { id: 'math-u09-l04-q09', type: 'multiple-choice', conceptTag: 'whole-unit-weight', reviewCardId: 'math-u09-l04-c3', prompt: 'A scale reads 2.6 kilograms. What is the weight to the nearest kilogram?', choices: [{ id: 'a', text: '3 kilograms' }, { id: 'b', text: '2 kilograms' }, { id: 'c', text: '2.5 kilograms' }, { id: 'd', text: '26 kilograms' }], correctChoiceId: 'a', explanation: 'Six tenths is at least halfway, so round up to 3.' },
        { id: 'math-u09-l04-q10', type: 'fill-blank', conceptTag: 'whole-unit-weight', reviewCardId: 'math-u09-l04-c3', prompt: 'A package scale reads 6.4 pounds. To the nearest pound, record ___ pounds.', acceptedAnswers: ['6'], explanation: 'The reading is closer to 6 than to 7.' },
        { id: 'math-u09-l04-q11', type: 'true-false', conceptTag: 'whole-unit-weight', reviewCardId: 'math-u09-l04-c3', prompt: 'A reading of 148.7 grams rounds to 149 grams.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Seven tenths rounds the whole-number part up.' },
        { id: 'math-u09-l04-q12', type: 'multiple-choice', conceptTag: 'whole-unit-weight', reviewCardId: 'math-u09-l04-c3', prompt: 'A scale reads 11.2 ounces. Which recorded measurement is correct to the nearest ounce?', choices: [{ id: 'a', text: '11 ounces' }, { id: 'b', text: '12 ounces' }, { id: 'c', text: '11.2 ounces' }, { id: 'd', text: '10 ounces' }], correctChoiceId: 'a', explanation: 'Two tenths is below halfway, so round down to 11.' },
        { id: 'math-u09-l04-q13', type: 'multiple-choice', conceptTag: 'whole-unit-weight', reviewCardId: 'math-u09-l04-c3', prompt: 'Which statement correctly reports a 4.5-kilogram reading to the nearest whole unit?', choices: [{ id: 'a', text: '5 kilograms' }, { id: 'b', text: '4 kilograms' }, { id: 'c', text: '4.5 grams' }, { id: 'd', text: '45 kilograms' }], correctChoiceId: 'a', explanation: 'A halfway reading rounds up to 5 kilograms.' },
      ],
    },
  },
  {
    id: 'math-u09-l05',
    unitId: 'math-u09',
    title: 'Convert Larger Customary Units to Smaller Units',
    indicatorCodes: ['4.MGSR.2.5'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'A larger customary unit can be renamed with more smaller units.' },
      { speaker: 'kid', text: 'The problem will supply or state the needed unit equivalence.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Multiplication counts how many smaller units are in several larger units.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will convert length, weight, and liquid volume within one system.' },
    ],
    learnCards: [
      {
        id: 'math-u09-l05-c1',
        title: 'Use a Given Unit Equivalence',
        blocks: [
          { kind: 'text', text: 'An equivalence states two names for the same measure, such as 1 foot = 12 inches.' },
          { kind: 'example', text: 'Three feet and 36 inches balance because 3 × 12 = 36.' },
          { kind: 'tip', text: 'Keep the equivalence visible and do not mix unrelated measurement types.' },
        ],
        widget: { type: 'balance-scale', config: { left: [{ id: 'three-feet', label: '3 feet', value: 36 }], right: [{ id: 'thirty-six-inches', label: '36 inches', value: 36 }], task: 'compare' } },
      },
      {
        id: 'math-u09-l05-c2',
        title: 'Multiply from Larger to Smaller Units',
        blocks: [
          { kind: 'text', text: 'Multiply the number of larger units by the number of smaller units in one larger unit.' },
          { kind: 'example', text: 'Given 1 yard = 3 feet, 5 yards = 5 × 3 = 15 feet.' },
          { kind: 'tip', text: 'The numerical count grows because smaller units require more pieces to name the same measure.' },
        ],
      },
      {
        id: 'math-u09-l05-c3',
        title: 'Apply a Conversion in Context',
        blocks: [
          { kind: 'text', text: 'Choose the equivalence named in the situation, multiply, and label the smaller unit.' },
          { kind: 'example', text: 'Given 1 gallon = 4 quarts, 3 gallons of water equals 12 quarts.' },
          { kind: 'tip', text: 'A correct answer preserves the amount even though the number and unit change.' },
        ],
      },
    ],
    workedExample: {
      title: 'Convert 4 pounds to ounces',
      steps: [
        'Use the given equivalence 1 pound = 16 ounces.',
        'Multiply 4 × 16 = 64.',
        'Therefore 4 pounds = 64 ounces; the larger number of smaller units names the same weight.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u09-l05-q01', type: 'multiple-choice', conceptTag: 'unit-equivalence', reviewCardId: 'math-u09-l05-c1', prompt: 'Given 1 foot = 12 inches, which equivalence is true?', choices: [{ id: 'a', text: '3 feet = 36 inches' }, { id: 'b', text: '3 feet = 15 inches' }, { id: 'c', text: '12 feet = 3 inches' }, { id: 'd', text: '3 inches = 36 feet' }], correctChoiceId: 'a', explanation: 'Three groups of 12 inches equal 36 inches.' },
        { id: 'math-u09-l05-q02', type: 'fill-blank', conceptTag: 'unit-equivalence', reviewCardId: 'math-u09-l05-c1', prompt: 'Given 1 yard = 3 feet, 2 yards = ___ feet.', acceptedAnswers: ['6'], explanation: 'Two times 3 feet is 6 feet.' },
        { id: 'math-u09-l05-q03', type: 'true-false', conceptTag: 'unit-equivalence', reviewCardId: 'math-u09-l05-c1', prompt: 'Given 1 pound = 16 ounces, 5 pounds equals 80 ounces.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Five times 16 is 80.' },
        { id: 'math-u09-l05-q04', type: 'multiple-choice', conceptTag: 'unit-equivalence', reviewCardId: 'math-u09-l05-c1', prompt: 'Given 1 gallon = 4 quarts, which pair names the same volume?', choices: [{ id: 'a', text: '2 gallons and 8 quarts' }, { id: 'b', text: '2 gallons and 6 quarts' }, { id: 'c', text: '4 gallons and 2 quarts' }, { id: 'd', text: '8 gallons and 2 quarts' }], correctChoiceId: 'a', explanation: 'Two groups of 4 quarts equal 8 quarts.' },
        { id: 'math-u09-l05-q05', type: 'multiple-choice', conceptTag: 'larger-to-smaller', reviewCardId: 'math-u09-l05-c2', prompt: 'Given 1 yard = 3 feet, how many feet are in 7 yards?', choices: [{ id: 'a', text: '21 feet' }, { id: 'b', text: '10 feet' }, { id: 'c', text: '4 feet' }, { id: 'd', text: '28 feet' }], correctChoiceId: 'a', explanation: 'Seven times 3 feet is 21 feet.' },
        { id: 'math-u09-l05-q06', type: 'fill-blank', conceptTag: 'larger-to-smaller', reviewCardId: 'math-u09-l05-c2', prompt: 'Given 1 cup = 8 fluid ounces, 6 cups = ___ fluid ounces.', acceptedAnswers: ['48'], explanation: 'Six times 8 is 48.' },
        { id: 'math-u09-l05-q07', type: 'sort', conceptTag: 'larger-to-smaller', reviewCardId: 'math-u09-l05-c2', prompt: 'Order the steps for converting 4 pounds to ounces when 1 pound = 16 ounces.', items: [{ id: 'a', text: 'Identify 16 ounces in each pound.' }, { id: 'b', text: 'Write 4 × 16.' }, { id: 'c', text: 'Compute 64.' }, { id: 'd', text: 'Label the result 64 ounces.' }], correctOrder: ['a', 'b', 'c', 'd'], explanation: 'Use the equivalence, multiply, compute, and label.' },
        { id: 'math-u09-l05-q08', type: 'multiple-choice', conceptTag: 'larger-to-smaller', reviewCardId: 'math-u09-l05-c2', prompt: 'Given 1 quart = 2 pints, how many pints are in 9 quarts?', choices: [{ id: 'a', text: '18 pints' }, { id: 'b', text: '11 pints' }, { id: 'c', text: '7 pints' }, { id: 'd', text: '4 pints' }], correctChoiceId: 'a', explanation: 'Nine times 2 pints is 18 pints.' },
        { id: 'math-u09-l05-q09', type: 'multiple-choice', conceptTag: 'conversion-application', reviewCardId: 'math-u09-l05-c3', prompt: 'A rope is 6 yards long. Given 1 yard = 3 feet, how long is the rope in feet?', choices: [{ id: 'a', text: '18 feet' }, { id: 'b', text: '9 feet' }, { id: 'c', text: '2 feet' }, { id: 'd', text: '36 feet' }], correctChoiceId: 'a', explanation: 'Six yards times 3 feet per yard is 18 feet.' },
        { id: 'math-u09-l05-q10', type: 'fill-blank', conceptTag: 'conversion-application', reviewCardId: 'math-u09-l05-c3', prompt: 'A jug holds 3 gallons. Given 1 gallon = 4 quarts, it holds ___ quarts.', acceptedAnswers: ['12'], explanation: 'Three times 4 quarts is 12 quarts.' },
        { id: 'math-u09-l05-q11', type: 'true-false', conceptTag: 'conversion-application', reviewCardId: 'math-u09-l05-c3', prompt: 'Given 1 pint = 2 cups, 5 pints of juice equals 10 cups.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Five times 2 cups is 10 cups.' },
        { id: 'math-u09-l05-q12', type: 'multiple-choice', conceptTag: 'conversion-application', reviewCardId: 'math-u09-l05-c3', prompt: 'A box weighs 4 pounds. Given 1 pound = 16 ounces, what is its weight in ounces?', choices: [{ id: 'a', text: '64 ounces' }, { id: 'b', text: '20 ounces' }, { id: 'c', text: '12 ounces' }, { id: 'd', text: '48 ounces' }], correctChoiceId: 'a', explanation: 'Four times 16 ounces equals 64 ounces.' },
        { id: 'math-u09-l05-q13', type: 'multiple-choice', conceptTag: 'conversion-application', reviewCardId: 'math-u09-l05-c3', prompt: 'Why does 2 gallons become 8 quarts when 1 gallon = 4 quarts?', choices: [{ id: 'a', text: 'Each gallon contributes 4 quarts, so 2 × 4 = 8.' }, { id: 'b', text: 'The units are added: 2 + 4 = 6.' }, { id: 'c', text: 'Quarts are larger, so the number decreases.' }, { id: 'd', text: 'Gallons and quarts measure different properties.' }], correctChoiceId: 'a', explanation: 'Multiplying counts the four smaller units in each of two gallons.' },
      ],
    },
  },
] satisfies Lesson[];
