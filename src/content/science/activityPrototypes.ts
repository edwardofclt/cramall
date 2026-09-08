import type { WidgetCoach, WidgetConfig } from '../schema';

export const deviceRetestConfig: WidgetConfig<'device-retest'> = {
  title: 'One-Change Retest', goalSeconds: 10,
  before: [6, 7, 6], after: [10, 10, 10],
  setupNote: 'One clip was loosely fitted. In the supplied retest, only that clip was replaced with a firmly fitting clip.',
  heldConstant: ['Battery type', 'Lamp', 'Switch', 'Viewing condition', 'Ten-second interval'],
};
export const deviceRetestCoach: WidgetCoach = {
  startLabel: 'Compare the refinement',
  intro: [
    { speaker: 'guide', pose: 'talk', text: 'A new version needs a fair comparison with the first one. Let’s change one feature and keep track of the evidence.' },
    { speaker: 'kid', text: 'I’ll compare the setups, inspect both record sets, and explain what this retest supports.' },
  ],
  reactions: {
    strategy: { pose: 'think', text: 'Keep the original goal and the unchanged conditions beside your plan.' },
    retry: { pose: 'oops', text: 'Use the supplied records and separate what they show from what still needs a test.' },
    milestone: { pose: 'talk', text: 'Cite both sets of records before making your claim.' },
    complete: { pose: 'cheer', text: 'You connected one recorded change to better results in these trials and kept the claim limited to the evidence.' },
  },
};
