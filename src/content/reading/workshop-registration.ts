import { readingWorkshopActivities } from './workshopActivities';

export function readingWorkshopForCard(cardId: string) {
  const activity = readingWorkshopActivities.find(item => item.cardId === cardId);
  if (!activity) throw new Error(`Missing authored reading activity for ${cardId}`);
  return { widget: { type: 'reading-workshop' as const, config: activity.config }, widgetCoach: activity.coach };
}
