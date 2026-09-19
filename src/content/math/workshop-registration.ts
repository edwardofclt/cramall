import { mathWorkshopActivities } from './workshopActivities';

export function mathWorkshopForCard(cardId: string) {
  const activity = mathWorkshopActivities.find(item => item.cardId === cardId);
  if (!activity) throw new Error(`Missing authored math activity for ${cardId}`);
  return { widget: { type: 'math-workshop' as const, config: activity.config }, widgetCoach: activity.coach };
}
