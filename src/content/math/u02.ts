import { mathWorkshopForCard } from './workshop-registration';
import type { Lesson } from '../schema';

export const unit02Lessons = [
  {
    id: 'math-u02-l01',
    unitId: 'math-u02',
    title: 'Add and Subtract to 100,000',
    indicatorCodes: ['4.PAFR.1.1'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Two acorn teams counted huge piles. How can we combine or compare their totals accurately?' },
      { speaker: 'kid', text: 'We can choose addition or subtraction and keep each digit in its place.' },
      { speaker: 'nutty', pose: 'talk', text: 'When a place has too many or too few, regrouping keeps the value equal.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Then an estimate or inverse operation can prove our answer makes sense!' },
    ],
    learnCards: [
      {
        id: 'math-u02-l01-c1',
        widget: {"type": "regrouping-lab", "config": {"a": 23468, "b": 17857, "operation": "add", "context": "Two acorn teams collected 23,468 and 17,857 acorns. How many did they collect altogether?"}},
        widgetCoach: {"intro": [{"speaker": "guide", "pose": "talk", "text": "Two teams want to join their acorn counts. Choose an operation, then exchange counters whenever a tray holds ten or more."}, {"speaker": "kid", "text": "I’ll combine the amounts, record each digit, and explain why an exchange keeps the same value."}], "reactions": {"strategy": {"pose": "think", "text": "Work from the ones. Each tray’s label tells the value of one counter."}, "retry": {"pose": "oops", "text": "Compare the values in the trays with your move. Count carefully and try again."}, "milestone": {"pose": "talk", "text": "Every place is recorded. Use the exchanges to explain why the result makes sense."}, "complete": {"pose": "cheer", "text": "You used equal-value exchanges and checked how the parts fit together."}}},
        title: 'Choose an Addition or Subtraction Strategy',
        blocks: [
          { kind: 'text', text: 'Add when amounts join or a total is needed. Subtract when an amount is removed or a difference is needed.' },
          { kind: 'example', text: 'To find how many more 52,400 is than 18,250, use 52,400 - 18,250.' },
          { kind: 'tip', text: 'Line up ones under ones, tens under tens, and every other matching place.' },
        ],
      },
      {
        id: 'math-u02-l01-c2',
        widget: {"type": "regrouping-lab", "config": {"a": 50003, "b": 26718, "operation": "subtract", "context": "A store has 50,003 seeds and sends out 26,718. How many seeds remain?"}},
        widgetCoach: {"intro": [{"speaker": "guide", "pose": "talk", "text": "Some trays start empty. We can exchange one larger unit for ten smaller units to help remove the seeds."}, {"speaker": "kid", "text": "I’ll work from the ones, exchange across empty trays, and count what remains."}], "reactions": {"strategy": {"pose": "think", "text": "Work from the ones. Each tray’s label tells the value of one counter."}, "retry": {"pose": "oops", "text": "Compare the values in the trays with your move. Count carefully and try again."}, "milestone": {"pose": "talk", "text": "Every place is recorded. Use the exchanges to explain why the result makes sense."}, "complete": {"pose": "cheer", "text": "You used equal-value exchanges and checked how the parts fit together."}}},
        title: 'Regroup by Place Value',
        blocks: [
          { kind: 'text', text: 'Ten units in one place can be regrouped as one unit in the place to its left without changing the number.' },
          { kind: 'example', text: 'In addition, 8 ones + 7 ones = 15 ones, so write 5 ones and regroup 1 ten.' },
          { kind: 'tip', text: 'In subtraction, regroup one unit from the left as ten units in the current place.' },
        ],
      },
      {
        id: 'math-u02-l01-c3',
        widget: {"type": "regrouping-lab", "config": {"a": 38465, "b": 28956, "operation": "add", "context": "A gardener says 67,421 − 28,956 = 38,465. Add 38,465 and 28,956 to check whether they rebuild 67,421.", "purpose": "inverse-check"}},
        widgetCoach: {"intro": [{"speaker": "guide", "pose": "talk", "text": "Let’s check a subtraction by rebuilding the original amount from its two parts."}, {"speaker": "kid", "text": "I’ll add the removed amount back, regroup the counters, and compare the total with the starting amount."}], "reactions": {"strategy": {"pose": "think", "text": "Work from the ones. Each tray’s label tells the value of one counter."}, "retry": {"pose": "oops", "text": "Compare the values in the trays with your move. Count carefully and try again."}, "milestone": {"pose": "talk", "text": "Every place is recorded. Use the exchanges to explain why the result makes sense."}, "complete": {"pose": "cheer", "text": "You used equal-value exchanges and checked how the parts fit together."}}},
        title: 'Justify and Check the Result',
        blocks: [
          { kind: 'text', text: 'Explain why the chosen operation fits the situation and why each regroup keeps the same value.' },
          { kind: 'example', text: '37,425 + 27,395 = 64,820 checks that 64,820 - 27,395 = 37,425.' },
          { kind: 'tip', text: 'Use addition to check subtraction, subtraction to check addition, and an estimate to catch a misplaced digit.' },
        ],
      },
    ],
    workedExample: {
      title: 'Find and justify 52,004 - 18,769',
      steps: [
        'Line up the place values because the question asks how many remain.',
        'Regroup across the zeros, then subtract from right to left to get 33,235.',
        'Check with the inverse operation: 33,235 + 18,769 = 52,004.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        {
          id: 'math-u02-l01-q01', type: 'multiple-choice', conceptTag: 'add-subtract-strategy', reviewCardId: 'math-u02-l01-c1',
          prompt: 'What is 23,456 + 12,300?',
          choices: [{ id: 'a', text: '35,756' }, { id: 'b', text: '34,756' }, { id: 'c', text: '35,656' }, { id: 'd', text: '11,156' }], correctChoiceId: 'a',
          explanation: 'Adding each aligned place gives 35,756.',
        },
        {
          id: 'math-u02-l01-q02', type: 'multiple-choice', conceptTag: 'add-subtract-strategy', reviewCardId: 'math-u02-l01-c1',
          prompt: 'What is 80,000 - 26,745?',
          choices: [{ id: 'a', text: '53,255' }, { id: 'b', text: '54,255' }, { id: 'c', text: '63,255' }, { id: 'd', text: '53,345' }], correctChoiceId: 'a',
          explanation: 'Subtracting 26,745 from 80,000 leaves 53,255.',
        },
        {
          id: 'math-u02-l01-q03', type: 'fill-blank', conceptTag: 'add-subtract-strategy', reviewCardId: 'math-u02-l01-c1',
          prompt: 'Complete the equation: 14,208 + 9,516 = ___.', acceptedAnswers: ['23,724'],
          explanation: 'The aligned sum is 23,724.',
        },
        {
          id: 'math-u02-l01-q04', type: 'multiple-choice', conceptTag: 'add-subtract-strategy', reviewCardId: 'math-u02-l01-c1',
          prompt: 'A park printed 45,000 tickets and sold 27,650. Which equation finds how many tickets remain?',
          choices: [{ id: 'a', text: '45,000 - 27,650' }, { id: 'b', text: '45,000 + 27,650' }, { id: 'c', text: '27,650 - 45,000' }, { id: 'd', text: '45,000 - 17,350' }], correctChoiceId: 'a',
          explanation: 'Remaining means subtract the sold tickets from the starting amount.',
        },
        {
          id: 'math-u02-l01-q05', type: 'multiple-choice', conceptTag: 'regrouping', reviewCardId: 'math-u02-l01-c2',
          prompt: 'When 7 ones and 8 ones are added, what should be recorded?',
          choices: [{ id: 'a', text: '5 ones and 1 regrouped ten' }, { id: 'b', text: '15 tens' }, { id: 'c', text: '5 tens and 1 one' }, { id: 'd', text: '15 hundreds' }], correctChoiceId: 'a',
          explanation: 'Fifteen ones equal 5 ones and 1 ten.',
        },
        {
          id: 'math-u02-l01-q06', type: 'fill-blank', conceptTag: 'regrouping', reviewCardId: 'math-u02-l01-c2',
          prompt: 'Complete the subtraction: 52,004 - 18,769 = ___.', acceptedAnswers: ['33,235'],
          explanation: 'Regrouping across the zeros gives a difference of 33,235.',
        },
        {
          id: 'math-u02-l01-q07', type: 'true-false', conceptTag: 'regrouping', reviewCardId: 'math-u02-l01-c2',
          prompt: 'True or false: 47,000 - 18,956 = 28,044.',
          choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true',
          explanation: 'Regrouping and subtracting gives 28,044.',
        },
        {
          id: 'math-u02-l01-q08', type: 'sort', conceptTag: 'regrouping', reviewCardId: 'math-u02-l01-c2',
          prompt: 'Order the place-value steps for 27,468 + 5,739 from first to last.',
          items: [{ id: 'ones', text: 'Add ones and regroup 1 ten.' }, { id: 'tens', text: 'Add tens and regroup 1 hundred.' }, { id: 'hundreds', text: 'Add hundreds and regroup 1 thousand.' }, { id: 'thousands', text: 'Add thousands to finish 33,207.' }],
          correctOrder: ['ones', 'tens', 'hundreds', 'thousands'],
          explanation: 'The standard written strategy works from ones toward the greatest place.',
        },
        {
          id: 'math-u02-l01-q09', type: 'multiple-choice', conceptTag: 'justify-check', reviewCardId: 'math-u02-l01-c3',
          prompt: 'Which equation checks 64,820 - 27,395 = 37,425?',
          choices: [{ id: 'a', text: '37,425 + 27,395 = 64,820' }, { id: 'b', text: '64,820 + 27,395 = 37,425' }, { id: 'c', text: '37,425 - 27,395 = 64,820' }, { id: 'd', text: '64,820 - 37,425 = 27,305' }], correctChoiceId: 'a',
          explanation: 'Adding the difference and the subtracted amount must return the starting amount.',
        },
        {
          id: 'math-u02-l01-q10', type: 'fill-blank', conceptTag: 'justify-check', reviewCardId: 'math-u02-l01-c3',
          prompt: 'Complete the equation: 56,700 - 19,850 = ___.', acceptedAnswers: ['36,850'],
          explanation: 'The exact difference is 36,850.',
        },
        {
          id: 'math-u02-l01-q11', type: 'true-false', conceptTag: 'justify-check', reviewCardId: 'math-u02-l01-c3',
          prompt: 'True or false: 73,583 is a reasonable sum for 48,675 + 24,908 because 50,000 + 25,000 is about 75,000.',
          choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true',
          explanation: 'The exact sum is close to the 75,000 estimate.',
        },
        {
          id: 'math-u02-l01-q12', type: 'multiple-choice', conceptTag: 'justify-check', reviewCardId: 'math-u02-l01-c3',
          prompt: 'Which statement best justifies 90,000 - 34,678 = 55,322?',
          choices: [{ id: 'a', text: '55,322 + 34,678 equals 90,000.' }, { id: 'b', text: '55,322 is greater than 90,000.' }, { id: 'c', text: '34,678 + 90,000 equals 55,322.' }, { id: 'd', text: 'No check is possible.' }], correctChoiceId: 'a',
          explanation: 'The inverse addition equation proves the difference.',
        },
        {
          id: 'math-u02-l01-q13', type: 'multiple-choice', conceptTag: 'justify-check', reviewCardId: 'math-u02-l01-c3',
          prompt: 'Two trail counters recorded 18,745 and 26,980 visitors. How many visitors did they record altogether?',
          choices: [{ id: 'a', text: '45,725' }, { id: 'b', text: '44,725' }, { id: 'c', text: '8,235' }, { id: 'd', text: '45,625' }], correctChoiceId: 'a',
          explanation: 'Altogether signals addition, and the sum is 45,725.',
        },
      ],
    },
  },
  {
    id: 'math-u02-l02',
    unitId: 'math-u02',
    title: 'Estimate and Judge Reasonableness',
    indicatorCodes: ['4.NR.1.2'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'A calculator says my acorn order costs 319,842 shells. That sounds suspicious!' },
      { speaker: 'kid', text: 'An estimate can tell us what size answer to expect.' },
      { speaker: 'nutty', pose: 'talk', text: 'We will round useful place values and write an estimate equation.' },
      { speaker: 'nutty', pose: 'cheer', text: 'If the exact answer is far from the estimate, we know to check again.' },
    ],
    learnCards: [
      {
        id: 'math-u02-l02-c1',
        title: 'Choose the Place to Round',
        blocks: [
          { kind: 'text', text: 'Round to a place that makes the numbers friendly while keeping enough information for the decision.' },
          { kind: 'example', text: '47,382 rounds to 47,000 to the nearest thousand and 50,000 to the nearest ten thousand.' },
          { kind: 'tip', text: 'Look one place to the right: 5 or more rounds up; 4 or less keeps the rounding digit.' },
        ],
      },
      {
        id: 'math-u02-l02-c2',
        title: 'Write an Estimate Equation',
        blocks: [
          { kind: 'text', text: 'Write the rounded numbers, operation symbol, and estimated result as a complete equation.' },
          { kind: 'example', text: '28,742 + 19,615 is about 29,000 + 20,000 = 49,000.' },
          { kind: 'tip', text: 'For multiplication or division, choose compatible numbers that are easy to compute mentally.' },
        ],
      },
      {
        ...mathWorkshopForCard('math-u02-l02-c3'),
        id: 'math-u02-l02-c3',
        title: 'Judge Whether an Answer Is Reasonable',
        blocks: [
          { kind: 'text', text: 'A reasonable exact answer should be close to the estimate and have the expected size.' },
          { kind: 'example', text: '39,816 + 20,177 is 59,993, which is close to 40,000 + 20,000 = 60,000.' },
          { kind: 'tip', text: 'An estimate is a check, not a replacement for the exact answer when the situation asks for one.' },
        ],
      },
    ],
    workedExample: {
      title: 'Check a reported difference',
      steps: [
        'Round 71,205 to 71,000 and 29,711 to 30,000.',
        'Write the estimate equation: 71,000 - 30,000 = 41,000.',
        'A reported answer of 31,494 is about 10,000 too small, so recompute; the exact difference is 41,494.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        {
          id: 'math-u02-l02-q01', type: 'multiple-choice', conceptTag: 'rounding-choice', reviewCardId: 'math-u02-l02-c1',
          prompt: 'What is 47,382 rounded to the nearest thousand?',
          choices: [{ id: 'a', text: '47,000' }, { id: 'b', text: '48,000' }, { id: 'c', text: '50,000' }, { id: 'd', text: '47,400' }], correctChoiceId: 'a',
          explanation: 'The hundreds digit is 3, so the thousands digit stays 7.',
        },
        {
          id: 'math-u02-l02-q02', type: 'fill-blank', conceptTag: 'rounding-choice', reviewCardId: 'math-u02-l02-c1',
          prompt: 'Round 68,741 to the nearest ten thousand.', acceptedAnswers: ['70,000'],
          explanation: 'The thousands digit is 8, so 68,741 rounds up to 70,000.',
        },
        {
          id: 'math-u02-l02-q03', type: 'multiple-choice', conceptTag: 'rounding-choice', reviewCardId: 'math-u02-l02-c1',
          prompt: 'Which compatible numbers give a useful estimate for 398 × 21?',
          choices: [{ id: 'a', text: '400 × 20' }, { id: 'b', text: '300 × 10' }, { id: 'c', text: '500 × 30' }, { id: 'd', text: '398 × 1' }], correctChoiceId: 'a',
          explanation: '400 and 20 stay close to the factors and are easy to multiply.',
        },
        {
          id: 'math-u02-l02-q04', type: 'true-false', conceptTag: 'rounding-choice', reviewCardId: 'math-u02-l02-c1',
          prompt: 'True or false: 6,400 divided by 8 is a useful compatible-number estimate for 6,248 divided by 8.',
          choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true',
          explanation: '6,400 is close to 6,248 and divides evenly by 8.',
        },
        {
          id: 'math-u02-l02-q05', type: 'multiple-choice', conceptTag: 'estimate-equation', reviewCardId: 'math-u02-l02-c2',
          prompt: 'Which nearest-thousand estimate equation fits 28,742 + 19,615?',
          choices: [{ id: 'a', text: '29,000 + 20,000 = 49,000' }, { id: 'b', text: '28,000 + 19,000 = 47,000' }, { id: 'c', text: '30,000 - 20,000 = 10,000' }, { id: 'd', text: '29,000 × 20,000 = 580,000,000' }], correctChoiceId: 'a',
          explanation: 'Each addend rounds to the nearest thousand before adding.',
        },
        {
          id: 'math-u02-l02-q06', type: 'fill-blank', conceptTag: 'estimate-equation', reviewCardId: 'math-u02-l02-c2',
          prompt: 'Complete the nearest-thousand estimate: 83,126 - 27,904 is about 83,000 - 28,000 = ___.', acceptedAnswers: ['55,000'],
          explanation: 'Subtracting the rounded numbers gives 55,000.',
        },
        {
          id: 'math-u02-l02-q07', type: 'multiple-choice', conceptTag: 'estimate-equation', reviewCardId: 'math-u02-l02-c2',
          prompt: 'Which estimate equation is useful for 4,760 divided by 6?',
          choices: [{ id: 'a', text: '4,800 divided by 6 = 800' }, { id: 'b', text: '4,000 divided by 6 = 4' }, { id: 'c', text: '4,760 × 6 = 28,560' }, { id: 'd', text: '5,000 + 6 = 5,006' }], correctChoiceId: 'a',
          explanation: '4,800 is nearby and is compatible with division by 6.',
        },
        {
          id: 'math-u02-l02-q08', type: 'sort', conceptTag: 'estimate-equation', reviewCardId: 'math-u02-l02-c2',
          prompt: 'Order the steps for making and using an estimate.',
          items: [{ id: 'choose', text: 'Choose a useful rounding place or compatible numbers.' }, { id: 'round', text: 'Round the numbers.' }, { id: 'equation', text: 'Write and solve the estimate equation.' }, { id: 'compare', text: 'Compare the estimate with the reported answer.' }],
          correctOrder: ['choose', 'round', 'equation', 'compare'],
          explanation: 'Choose, round, write the equation, and then compare.',
        },
        {
          id: 'math-u02-l02-q09', type: 'multiple-choice', conceptTag: 'reasonableness', reviewCardId: 'math-u02-l02-c3',
          prompt: 'Is 59,993 reasonable for 39,816 + 20,177?',
          choices: [{ id: 'a', text: 'Yes, because 40,000 + 20,000 is about 60,000.' }, { id: 'b', text: 'No, because the sum should be about 6,000.' }, { id: 'c', text: 'No, because addition always makes 100,000.' }, { id: 'd', text: 'Yes, because 40,000 - 20,000 is 20,000.' }], correctChoiceId: 'a',
          explanation: 'The exact sum is only 7 away from the 60,000 estimate.',
        },
        {
          id: 'math-u02-l02-q10', type: 'true-false', conceptTag: 'reasonableness', reviewCardId: 'math-u02-l02-c3',
          prompt: 'True or false: 31,494 is reasonable for 71,205 - 29,711.',
          choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'false',
          explanation: 'The estimate is about 41,000, so 31,494 is too small.',
        },
        {
          id: 'math-u02-l02-q11', type: 'multiple-choice', conceptTag: 'reasonableness', reviewCardId: 'math-u02-l02-c3',
          prompt: 'A learner reports 247 × 32 = 7,904. Which estimate best checks the answer?',
          choices: [{ id: 'a', text: '250 × 30 = 7,500, so 7,904 is reasonable.' }, { id: 'b', text: '200 × 3 = 600, so 7,904 is unreasonable.' }, { id: 'c', text: '250 + 30 = 280, so 7,904 is reasonable.' }, { id: 'd', text: '300 × 40 = 120, so 7,904 is unreasonable.' }], correctChoiceId: 'a',
          explanation: '7,904 is close to the useful estimate of 7,500.',
        },
        {
          id: 'math-u02-l02-q12', type: 'fill-blank', conceptTag: 'reasonableness', reviewCardId: 'math-u02-l02-c3',
          prompt: 'Use 8,100 divided by 9 to estimate 8,316 divided by 9. The estimated quotient is ___.', acceptedAnswers: ['900'],
          explanation: '8,100 divided by 9 equals 900.',
        },
        {
          id: 'math-u02-l02-q13', type: 'multiple-choice', conceptTag: 'reasonableness', reviewCardId: 'math-u02-l02-c3',
          prompt: 'A library had 14,785 books and received 8,940 more. Is a reported total of 32,725 reasonable?',
          choices: [{ id: 'a', text: 'No; 15,000 + 9,000 is about 24,000.' }, { id: 'b', text: 'Yes; 15,000 + 9,000 is about 33,000.' }, { id: 'c', text: 'Yes; totals must always be over 30,000.' }, { id: 'd', text: 'No; addition should make a smaller number.' }], correctChoiceId: 'a',
          explanation: 'The rounded total is about 24,000, so 32,725 is not reasonable.',
        },
      ],
    },
  },
] satisfies Lesson[];
