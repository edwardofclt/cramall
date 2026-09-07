import type { Lesson } from '../schema';

export const unit12Lessons = [
  {
    id: 'math-u12-l01',
    unitId: 'math-u12',
    title: 'Collect and Organize Data',
    indicatorCodes: ['4.DPSR.1.1'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Data begins with a clear question and a consistent collection method.' },
      { speaker: 'kid', text: 'Some data names categories, while other data records numbers.' },
      { speaker: 'nutty', pose: 'cheer', text: 'The display should fit the data and use a truthful scale.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will include a title, labels, and exact values so another reader can understand it.' },
    ],
    learnCards: [
      {
        id: 'math-u12-l01-c1',
        title: 'Tell Numerical from Categorical Data',
        blocks: [
          { kind: 'text', text: 'Observations, investigations, surveys, and experiments can produce numerical data that measures or counts or categorical data that sorts results into named groups.' },
          { kind: 'example', text: 'Plant heights in centimeters are numerical, while favorite fruit choices are categorical.' },
          { kind: 'tip', text: 'State what each observation represents before collecting data.' },
        ],
      },
      {
        id: 'math-u12-l01-c2',
        title: 'Choose a Table, Bar Graph, or Dot Plot',
        blocks: [
          { kind: 'text', text: 'Tables organize exact entries, bar graphs compare category counts, and dot plots show how often numerical values occur.' },
          { kind: 'example', text: 'A pet survey with dog, cat, and fish categories fits a bar graph.' },
          { kind: 'tip', text: 'Choose a display that preserves the question and all collected values.' },
        ],
        widget: { type: 'data-plot-builder', config: { kind: 'bar', prompt: 'Build the class pet survey bar graph.', categories: ['dog', 'cat', 'fish'], target: { dog: 8, cat: 6, fish: 4 }, sourceData: { dog: 8, cat: 6, fish: 4 }, displayChoices: ['bar', 'dot'], taskPrompt: 'Build the class pet survey bar graph from the source table.' } },
        widgetCoach: {
          intro: [
            { speaker: 'guide', pose: 'think', text: 'Turn the pet survey table into a bar graph. Keep each bar connected to its source count.' },
            { speaker: 'kid', text: 'I will choose the graph setup, build the bars, and use them to compare two categories.' },
          ],
          reactions: {
            strategy: { text: 'Use the source table to make the next setup or graph decision.', pose: 'think' },
            retry: { text: 'Check the current task: compare the display, bar height, or difference with the source and scale.', pose: 'oops' },
            milestone: { text: 'Your check connects the graph with its source counts.', pose: 'think' },
            complete: { text: 'Your bar graph matches the source data, and your comparison uses the difference between two bar heights.', pose: 'cheer' },
          },
        },
      },
      {
        id: 'math-u12-l01-c3',
        title: 'Use an Exact Scale, Title, and Labels',
        blocks: [
          { kind: 'text', text: 'A complete graph has a descriptive title, labeled categories or axes, and evenly spaced scale values.' },
          { kind: 'example', text: 'A bar graph scale counting 0, 2, 4, 6, 8 uses increments of 2.' },
          { kind: 'tip', text: 'Half- and fourth-unit scales must mark equal intervals so fractional values are not distorted.' },
        ],
      },
    ],
    workedExample: {
      title: 'Organize a plant-height investigation',
      steps: [
        'Record the numerical heights 4, 5, 5, 6, and 8 centimeters in a table.',
        'Choose a dot plot because repeated numerical measurements should remain visible.',
        'Title it “Seedling Heights,” label the axis “Height (centimeters),” and place one dot for each observation.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u12-l01-q01', type: 'multiple-choice', conceptTag: 'data-types', reviewCardId: 'math-u12-l01-c1', prompt: 'Which set is numerical data?', choices: [{ id: 'a', text: 'Plant heights in centimeters' }, { id: 'b', text: 'Favorite fruit names' }, { id: 'c', text: 'Types of pets' }, { id: 'd', text: 'Shirt colors' }], correctChoiceId: 'a', explanation: 'Heights are measured numbers.' },
        { id: 'math-u12-l01-q02', type: 'fill-blank', conceptTag: 'data-types', reviewCardId: 'math-u12-l01-c1', prompt: 'Data that sorts responses into named groups is called ___ data.', acceptedAnswers: ['categorical'], explanation: 'Categorical data uses labels such as dog, cat, or fish.' },
        { id: 'math-u12-l01-q03', type: 'true-false', conceptTag: 'data-types', reviewCardId: 'math-u12-l01-c1', prompt: 'The number of books read by each learner is numerical data.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Each observation is a number that counts books.' },
        { id: 'math-u12-l01-q04', type: 'multiple-choice', conceptTag: 'data-types', reviewCardId: 'math-u12-l01-c1', prompt: 'Which question would collect categorical data?', choices: [{ id: 'a', text: 'Which trail do you prefer?' }, { id: 'b', text: 'How many minutes did you walk?' }, { id: 'c', text: 'What is your height in inches?' }, { id: 'd', text: 'How many shells did you count?' }], correctChoiceId: 'a', explanation: 'Trail choices are named categories rather than measurements.' },
        { id: 'math-u12-l01-q05', type: 'multiple-choice', conceptTag: 'data-display', reviewCardId: 'math-u12-l01-c2', prompt: 'Which display best compares counts for dog, cat, and fish survey choices?', choices: [{ id: 'a', text: 'Bar graph' }, { id: 'b', text: 'Dot plot of decimal measurements' }, { id: 'c', text: 'Clock' }, { id: 'd', text: 'Number sentence' }], correctChoiceId: 'a', explanation: 'A bar graph clearly compares categorical counts.' },
        { id: 'math-u12-l01-q06', type: 'fill-blank', conceptTag: 'data-display', reviewCardId: 'math-u12-l01-c2', prompt: 'Which display uses one mark for each occurrence of a numerical value?', acceptedAnswers: ['dot plot'], explanation: 'A dot plot stacks marks above repeated numerical values.' },
        { id: 'math-u12-l01-q07', type: 'true-false', conceptTag: 'data-display', reviewCardId: 'math-u12-l01-c2', prompt: 'A table can organize exact observations before a graph is made.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Tables preserve the collected entries and totals.' },
        { id: 'math-u12-l01-q08', type: 'multiple-choice', conceptTag: 'data-display', reviewCardId: 'math-u12-l01-c2', prompt: 'Which display best shows the repeated shoe sizes 3, 4, 4, 5, 5, 5?', choices: [{ id: 'a', text: 'Dot plot' }, { id: 'b', text: 'Bar graph of pet types' }, { id: 'c', text: 'Pie drawing without labels' }, { id: 'd', text: 'Clock face' }], correctChoiceId: 'a', explanation: 'A dot plot shows the frequency of each numerical shoe size.' },
        { id: 'math-u12-l01-q09', type: 'multiple-choice', conceptTag: 'graph-conventions', reviewCardId: 'math-u12-l01-c3', prompt: 'Which graph title is most informative for a survey of class pets?', choices: [{ id: 'a', text: 'Class Pet Survey Results' }, { id: 'b', text: 'Graph' }, { id: 'c', text: 'Numbers' }, { id: 'd', text: 'Things' }], correctChoiceId: 'a', explanation: 'The title states exactly what the data describes.' },
        { id: 'math-u12-l01-q10', type: 'fill-blank', conceptTag: 'graph-conventions', reviewCardId: 'math-u12-l01-c3', prompt: 'A bar-graph axis labeled 0, 2, 4, 6 uses a scale increment of ___.', acceptedAnswers: ['2'], explanation: 'Each neighboring label increases by 2.' },
        { id: 'math-u12-l01-q11', type: 'true-false', conceptTag: 'graph-conventions', reviewCardId: 'math-u12-l01-c3', prompt: 'A graph may omit category labels if the bars have different colors.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'false', explanation: 'Labels are required because meaning cannot depend on color alone.' },
        { id: 'math-u12-l01-q12', type: 'multiple-choice', conceptTag: 'graph-conventions', reviewCardId: 'math-u12-l01-c3', prompt: 'A dot plot measures ribbon lengths in quarter inches. Which axis sequence has equal fourth-unit intervals?', choices: [{ id: 'a', text: '1, 1 1/4, 1 1/2, 1 3/4, 2' }, { id: 'b', text: '1, 1 1/4, 1 3/4, 2, 3' }, { id: 'c', text: '1, 1 1/2, 1 3/4, 3, 4' }, { id: 'd', text: '1, 2, 2 1/4, 4, 5' }], correctChoiceId: 'a', explanation: 'Each adjacent value increases by one quarter.' },
        { id: 'math-u12-l01-q13', type: 'multiple-choice', conceptTag: 'graph-conventions', reviewCardId: 'math-u12-l01-c3', prompt: 'A survey records dog 8, cat 6, and fish 4. Which bar heights are correct?', choices: [{ id: 'a', text: 'Dog 8, cat 6, fish 4' }, { id: 'b', text: 'Dog 6, cat 4, fish 8' }, { id: 'c', text: 'Dog 4, cat 8, fish 6' }, { id: 'd', text: 'All three bars at 8' }], correctChoiceId: 'a', explanation: 'Each bar must preserve its category’s exact count.' },
      ],
    },
  },
  {
    id: 'math-u12-l02',
    unitId: 'math-u12',
    title: 'Solve Problems with Graphs and Tables',
    indicatorCodes: ['4.DPSR.1.2'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'A data display holds information that can answer a real question.' },
      { speaker: 'kid', text: 'First read the title, labels, key, and scale.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Then choose one operation that matches the question.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Fractional data must use like denominators before we combine or compare it.' },
    ],
    learnCards: [
      {
        id: 'math-u12-l02-c1',
        title: 'Read a Table or Graph',
        blocks: [
          { kind: 'text', text: 'Use labels, the key, and the scale to translate a mark or bar into an exact value.' },
          { kind: 'example', text: 'If one picture represents 4 books, 3 pictures represent 12 books.' },
          { kind: 'tip', text: 'Check for half-picture symbols or scaled axes before counting marks.' },
        ],
      },
      {
        id: 'math-u12-l02-c2',
        title: 'Choose the One-Step Operation',
        blocks: [
          { kind: 'text', text: 'Use addition for a combined total, subtraction for a difference, multiplication for equal scaled symbols, or division for equal grouping.' },
          { kind: 'example', text: 'If two bars show 18 and 11 votes, the difference is 18 - 11 = 7 votes.' },
          { kind: 'tip', text: 'Answer only the question asked; do not perform extra operations.' },
        ],
      },
      {
        id: 'math-u12-l02-c3',
        title: 'Solve with Whole or Fractional Data',
        blocks: [
          { kind: 'text', text: 'For fractional data, operate only after confirming the denominators match.' },
          { kind: 'example', text: 'A dot plot with 1/4, 2/4, and 3/4 mile has a total of 6/4 = 1 2/4 miles.' },
          { kind: 'tip', text: 'Keep the display’s measurement unit in the final answer.' },
        ],
      },
    ],
    workedExample: {
      title: 'Compare two scaled bars',
      steps: [
        'A bar graph uses a scale of 2 votes per interval; the blue bar reaches 8 intervals and the green bar reaches 5.',
        'Translate the bars: blue has 16 votes and green has 10 votes.',
        'Subtract once: 16 - 10 = 6, so blue has 6 more votes.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u12-l02-q01', type: 'multiple-choice', conceptTag: 'read-data', reviewCardId: 'math-u12-l02-c1', prompt: 'A picture graph key says one star represents 4 books. What do 3 stars represent?', choices: [{ id: 'a', text: '12 books' }, { id: 'b', text: '7 books' }, { id: 'c', text: '3 books' }, { id: 'd', text: '16 books' }], correctChoiceId: 'a', explanation: 'Three groups of 4 books equal 12 books.' },
        { id: 'math-u12-l02-q02', type: 'fill-blank', conceptTag: 'read-data', reviewCardId: 'math-u12-l02-c1', prompt: 'A bar reaches 6 on a scale marked 0, 2, 4, 6, 8. The bar represents ___.', acceptedAnswers: ['6'], explanation: 'The top aligns with the labeled value 6.' },
        { id: 'math-u12-l02-q03', type: 'true-false', conceptTag: 'read-data', reviewCardId: 'math-u12-l02-c1', prompt: 'On a dot plot, three dots above 5 mean that the value 5 occurred three times.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Each dot records one observation at that value.' },
        { id: 'math-u12-l02-q04', type: 'multiple-choice', conceptTag: 'read-data', reviewCardId: 'math-u12-l02-c1', prompt: 'A table shows Monday 14 visitors and Tuesday 19 visitors. Which day has more?', choices: [{ id: 'a', text: 'Tuesday' }, { id: 'b', text: 'Monday' }, { id: 'c', text: 'Both are equal' }, { id: 'd', text: 'The table does not say' }], correctChoiceId: 'a', explanation: 'Nineteen is greater than 14.' },
        { id: 'math-u12-l02-q05', type: 'multiple-choice', conceptTag: 'data-operation', reviewCardId: 'math-u12-l02-c2', prompt: 'Two bars show 18 and 11 votes. Which operation finds how many more votes the first has?', choices: [{ id: 'a', text: '18 - 11' }, { id: 'b', text: '18 + 11' }, { id: 'c', text: '18 × 11' }, { id: 'd', text: '18 ÷ 11' }], correctChoiceId: 'a', explanation: '“How many more” asks for a difference.' },
        { id: 'math-u12-l02-q06', type: 'fill-blank', conceptTag: 'data-operation', reviewCardId: 'math-u12-l02-c2', prompt: 'A table lists 24 red beads and 17 blue beads. There are ___ beads altogether.', acceptedAnswers: ['41'], explanation: 'Addition combines the two counts: 24 + 17 = 41.' },
        { id: 'math-u12-l02-q07', type: 'true-false', conceptTag: 'data-operation', reviewCardId: 'math-u12-l02-c2', prompt: 'If 5 picture symbols each represent 3 hikers, the total is 15 hikers.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Five groups of 3 equal 15.' },
        { id: 'math-u12-l02-q08', type: 'multiple-choice', conceptTag: 'data-operation', reviewCardId: 'math-u12-l02-c2', prompt: 'A dot plot has 9 observations, and 4 are at the value 6. How many observations are at other values?', choices: [{ id: 'a', text: '5' }, { id: 'b', text: '13' }, { id: 'c', text: '3' }, { id: 'd', text: '36' }], correctChoiceId: 'a', explanation: 'Nine total minus 4 at value 6 leaves 5.' },
        { id: 'math-u12-l02-q09', type: 'multiple-choice', conceptTag: 'fractional-data', reviewCardId: 'math-u12-l02-c3', prompt: 'A table lists trail lengths 1/4 mile and 2/4 mile. What is their combined length?', choices: [{ id: 'a', text: '3/4 mile' }, { id: 'b', text: '3/8 mile' }, { id: 'c', text: '1/2 mile' }, { id: 'd', text: '2/4 mile' }], correctChoiceId: 'a', explanation: 'Like-denominator fourths combine to three fourths.' },
        { id: 'math-u12-l02-q10', type: 'fill-blank', conceptTag: 'fractional-data', reviewCardId: 'math-u12-l02-c3', prompt: 'Give the answer as a fraction with denominator 8: A dot plot includes 7/8 mile and 3/8 mile. Their difference is ___ mile.', acceptedAnswers: ['4/8'], explanation: 'Seven eighths minus three eighths equals four eighths.' },
        { id: 'math-u12-l02-q11', type: 'true-false', conceptTag: 'fractional-data', reviewCardId: 'math-u12-l02-c3', prompt: 'A bar of 6/10 meter is longer than a bar of 4/10 meter by 2/10 meter.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Six tenths minus four tenths equals two tenths.' },
        { id: 'math-u12-l02-q12', type: 'multiple-choice', conceptTag: 'fractional-data', reviewCardId: 'math-u12-l02-c3', prompt: 'A picture graph shows 2 1/2 symbols, and each full symbol represents 4 cups. How many cups are shown?', choices: [{ id: 'a', text: '10 cups' }, { id: 'b', text: '8 cups' }, { id: 'c', text: '6 cups' }, { id: 'd', text: '12 cups' }], correctChoiceId: 'a', explanation: 'Two full symbols are 8 cups and a half symbol is 2 cups, totaling 10.' },
        { id: 'math-u12-l02-q13', type: 'multiple-choice', conceptTag: 'fractional-data', reviewCardId: 'math-u12-l02-c3', prompt: 'A table shows 5/6 liter in one container and 2/6 liter in another. How much more is in the first?', choices: [{ id: 'a', text: '3/6 liter' }, { id: 'b', text: '7/6 liter' }, { id: 'c', text: '3/12 liter' }, { id: 'd', text: '2/6 liter' }], correctChoiceId: 'a', explanation: 'Subtracting like-denominator fractions gives 5/6 - 2/6 = 3/6 liter.' },
      ],
    },
  },
  {
    id: 'math-u12-l03',
    unitId: 'math-u12',
    title: 'Certain, Possible, and Impossible',
    indicatorCodes: ['4.DPSR.2.1'],
    intro: [
      { speaker: 'nutty', pose: 'think', text: 'Probability begins by listing every possible outcome of a simple event.' },
      { speaker: 'kid', text: 'An event may include one, several, all, or none of those outcomes.' },
      { speaker: 'nutty', pose: 'cheer', text: 'Certain, possible, and impossible describe how the event relates to the outcome list.' },
      { speaker: 'nutty', pose: 'cheer', text: 'We will classify events without predicting one guaranteed random result.' },
    ],
    learnCards: [
      {
        id: 'math-u12-l03-c1',
        title: 'List Every Possible Outcome',
        blocks: [
          { kind: 'text', text: 'The sample space is the complete list of outcomes that can occur in one trial.' },
          { kind: 'example', text: 'A spinner with red, blue, and green sections has outcomes red, blue, and green.' },
          { kind: 'tip', text: 'List each distinct outcome once, even if an outcome has more than one equal section.' },
        ],
      },
      {
        id: 'math-u12-l03-c2',
        title: 'Connect an Event to Its Outcomes',
        blocks: [
          { kind: 'text', text: 'An event is a chosen outcome or group of outcomes from the sample space.' },
          { kind: 'example', text: 'On a red, blue, and green spinner, “land on a cool color” may include blue and green if those categories were defined.' },
          { kind: 'tip', text: 'Decide exactly which listed outcomes satisfy the event before classifying it.' },
        ],
        widget: { type: 'probability-spinner', config: { segments: [{ id: 'red', label: 'Red', weight: 2, color: '#ef4444' }, { id: 'blue', label: 'Blue', weight: 1, color: '#3b82f6' }, { id: 'green', label: 'Green', weight: 1, color: '#22c55e' }], trials: 8, eventQuestion: { eventLabel: 'red', classification: 'possible' }, taskPrompt: 'Predict, run eight trials, and classify landing on red.' } },
        widgetCoach: {
          intro: [
            { speaker: 'guide', pose: 'think', text: 'This spinner has three possible colors. Predict one, then collect eight results.' },
            { speaker: 'kid', text: 'I will keep my prediction and use the full wheel to decide whether landing on red is certain, possible, or impossible.' },
          ],
          reactions: {
            strategy: { text: 'Your prediction is saved. Each spin adds one result to the record.', pose: 'think' },
            retry: { text: 'Check whether the wheel allows the event on every section, some sections, or no sections.', pose: 'oops' },
            milestone: { text: 'Your first spin is recorded. Keep collecting the planned eight results.', pose: 'think' },
            complete: { text: 'You classified landing on red as possible from the full wheel. A short random record does not guarantee the next spin.', pose: 'cheer' },
          },
        },
      },
      {
        id: 'math-u12-l03-c3',
        title: 'Classify the Probability',
        blocks: [
          { kind: 'text', text: 'An event is certain if every outcome satisfies it, possible if at least one but not all outcomes satisfy it, and impossible if no outcome satisfies it.' },
          { kind: 'example', text: 'Rolling 1–6 makes “roll less than 7” certain, “roll 4” possible, and “roll 8” impossible.' },
          { kind: 'tip', text: 'Unequal spinner sections change how likely outcomes are, but any listed outcome is still possible.' },
        ],
      },
    ],
    workedExample: {
      title: 'Classify events for a four-section spinner',
      steps: [
        'The spinner sections are red, red, blue, and green, so the distinct outcome list is red, blue, green.',
        '“Land on red” is possible because red is present, but blue and green can also occur.',
        '“Land on a color” is certain, and “land on yellow” is impossible because yellow is absent.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        { id: 'math-u12-l03-q01', type: 'multiple-choice', conceptTag: 'possible-outcomes', reviewCardId: 'math-u12-l03-c1', prompt: 'A spinner has red, blue, and green sections. Which list gives every distinct outcome?', choices: [{ id: 'a', text: 'Red, blue, green' }, { id: 'b', text: 'Red only' }, { id: 'c', text: 'Red, blue, green, yellow' }, { id: 'd', text: 'Color, not color' }], correctChoiceId: 'a', explanation: 'Each labeled spinner result appears once in the outcome list.' },
        { id: 'math-u12-l03-q02', type: 'fill-blank', conceptTag: 'possible-outcomes', reviewCardId: 'math-u12-l03-c1', prompt: 'A standard number cube has ___ possible number outcomes.', acceptedAnswers: ['6'], explanation: 'The outcomes are 1, 2, 3, 4, 5, and 6.' },
        { id: 'math-u12-l03-q03', type: 'true-false', conceptTag: 'possible-outcomes', reviewCardId: 'math-u12-l03-c1', prompt: 'For a coin toss, heads and tails are the complete possible outcomes.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'One toss can land heads or tails.' },
        { id: 'math-u12-l03-q04', type: 'multiple-choice', conceptTag: 'possible-outcomes', reviewCardId: 'math-u12-l03-c1', prompt: 'A bag contains tiles labeled A, B, B, and C. Which list gives distinct label outcomes?', choices: [{ id: 'a', text: 'A, B, C' }, { id: 'b', text: 'A, B, B, C' }, { id: 'c', text: 'A and C only' }, { id: 'd', text: 'B only' }], correctChoiceId: 'a', explanation: 'Distinct outcomes list each possible label once.' },
        { id: 'math-u12-l03-q05', type: 'multiple-choice', conceptTag: 'event-outcomes', reviewCardId: 'math-u12-l03-c2', prompt: 'For a number cube with outcomes 1–6, which outcomes satisfy “roll an even number”?', choices: [{ id: 'a', text: '2, 4, 6' }, { id: 'b', text: '1, 3, 5' }, { id: 'c', text: '4, 5, 6' }, { id: 'd', text: '2 only' }], correctChoiceId: 'a', explanation: 'The even outcomes are 2, 4, and 6.' },
        { id: 'math-u12-l03-q06', type: 'fill-blank', conceptTag: 'event-outcomes', reviewCardId: 'math-u12-l03-c2', prompt: 'A spinner has outcomes cat, dog, and fish. The event “land on a pet with fins” contains the outcome ___.', acceptedAnswers: ['fish'], explanation: 'Fish is the listed outcome with fins.' },
        { id: 'math-u12-l03-q07', type: 'true-false', conceptTag: 'event-outcomes', reviewCardId: 'math-u12-l03-c2', prompt: 'On a spinner with red, blue, and green, the event “not red” contains blue and green.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Both non-red listed outcomes satisfy the event.' },
        { id: 'math-u12-l03-q08', type: 'multiple-choice', conceptTag: 'event-outcomes', reviewCardId: 'math-u12-l03-c2', prompt: 'Which event contains every outcome of a number cube labeled 1–6?', choices: [{ id: 'a', text: 'Roll a number less than 7' }, { id: 'b', text: 'Roll an even number' }, { id: 'c', text: 'Roll a 4' }, { id: 'd', text: 'Roll a number greater than 6' }], correctChoiceId: 'a', explanation: 'Every listed result 1 through 6 is less than 7.' },
        { id: 'math-u12-l03-q09', type: 'multiple-choice', conceptTag: 'probability-language', reviewCardId: 'math-u12-l03-c3', prompt: 'On a number cube labeled 1–6, how is “roll an 8” classified?', choices: [{ id: 'a', text: 'Impossible' }, { id: 'b', text: 'Possible' }, { id: 'c', text: 'Certain' }, { id: 'd', text: 'Equal' }], correctChoiceId: 'a', explanation: 'Eight is not in the outcome list.' },
        { id: 'math-u12-l03-q10', type: 'fill-blank', conceptTag: 'probability-language', reviewCardId: 'math-u12-l03-c3', prompt: 'A coin landing heads is ___ because heads is one outcome but not the only outcome.', acceptedAnswers: ['possible'], explanation: 'Heads can occur, while tails can also occur.' },
        { id: 'math-u12-l03-q11', type: 'true-false', conceptTag: 'probability-language', reviewCardId: 'math-u12-l03-c3', prompt: 'Drawing a shape from a bag containing only triangles makes “draw a triangle” certain.', choices: [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }], correctChoiceId: 'true', explanation: 'Every available outcome is a triangle.' },
        { id: 'math-u12-l03-q12', type: 'multiple-choice', conceptTag: 'probability-language', reviewCardId: 'math-u12-l03-c3', prompt: 'A spinner has two red sections, one blue section, and one green section. How is “land on blue” classified?', choices: [{ id: 'a', text: 'Possible' }, { id: 'b', text: 'Certain' }, { id: 'c', text: 'Impossible' }, { id: 'd', text: 'Equal' }], correctChoiceId: 'a', explanation: 'Blue is present, but other outcomes can occur.' },
        { id: 'math-u12-l03-q13', type: 'multiple-choice', conceptTag: 'probability-language', reviewCardId: 'math-u12-l03-c3', prompt: 'Which statement is correct about unequal spinner sections?', choices: [{ id: 'a', text: 'A listed outcome with a smaller section is still possible.' }, { id: 'b', text: 'Only the largest section is possible.' }, { id: 'c', text: 'Every listed outcome is certain.' }, { id: 'd', text: 'Section size creates impossible outcomes.' }], correctChoiceId: 'a', explanation: 'Any outcome with a section can occur, even when it is less likely.' },
      ],
    },
  },
] satisfies Lesson[];
