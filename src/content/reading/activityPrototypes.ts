import type { WidgetCoach, WidgetConfig } from '../schema';

export const phrasePathfinderConfig: WidgetConfig<'phrase-pathfinder'> = {
  title: 'The Winding Path',
  source: 'Before the rain began, Isla carried the seedlings along the winding path. She stopped beside the wooden gate to check the labels. The tray marked “shade” belonged under the oak, but the tray marked “sun” belonged beside the fence. Isla reread both labels before putting the trays down.',
  originalWord: 'winding', changedWord: 'windy',
  meaningPrompt: 'Why did Isla reread both labels?',
  meaningChoices: [
    { id: 'rain', text: 'To find out when the rain would begin.' },
    { id: 'places', text: 'To put each tray in the place its seedlings needed.' },
    { id: 'gate', text: 'To learn how to repair the wooden gate.' },
  ],
  correctMeaningId: 'places',
  meaningEvidence: 'The tray marked “shade” belonged under the oak, but the tray marked “sun” belonged beside the fence.',
};
export const phrasePathfinderCoach: WidgetCoach = {
  startLabel: 'Plan my reading',
  intro: [
    { speaker: 'guide', pose: 'talk', text: 'A changed word can change the picture. Let’s make a reading plan that keeps the words and their meaning together.' },
    { speaker: 'kid', text: 'I’ll check the copy, mark useful word groups, and reread to explain what happened.' },
  ],
  reactions: {
    strategy: { pose: 'think', text: 'Try reading each group as one connected idea. Move a pause if it interrupts the meaning.' },
    retry: { pose: 'oops', text: 'Return to the original passage and compare the words carefully.' },
    milestone: { pose: 'talk', text: 'Keep your reading plan with the words that support its meaning.' },
    complete: { pose: 'cheer', text: 'You checked the words and reflected on how your reading plan supported meaning.' },
  },
};
