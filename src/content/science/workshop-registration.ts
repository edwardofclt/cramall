import { scienceWorkshopActivities } from './workshopActivities';

export function scienceWorkshopForCard(cardId: string) {
  const activity = scienceWorkshopActivities.find(item => item.cardId === cardId);
  if (!activity) throw new Error(`Missing authored science activity for ${cardId}`);
  return { widget: { type: 'science-workshop' as const, config: activity.config }, widgetCoach: activity.coach };
}
