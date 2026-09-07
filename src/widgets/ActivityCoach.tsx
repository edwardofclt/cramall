import { createContext, useContext } from 'react';
import { Character } from '../characters/Character';
import type { GuideId, WidgetCoach } from '../content/schema';

type ActivityCoachValue = {
  guide: GuideId;
  reaction: WidgetCoach['reactions']['complete'] | null;
  dismiss: () => void;
};
const Context = createContext<ActivityCoachValue | null>(null);
export const ActivityCoachProvider = Context.Provider;

/** The guide lives beside the task, without replacing the task's own retained feedback. */
export function ActivityCoachSlot() {
  const value = useContext(Context);
  if (!value?.reaction) return null;
  const { guide, reaction, dismiss } = value;
  return <aside className="activity-coach-slot" data-testid="widget-coach-reaction" aria-label="Guide coaching">
    <span aria-hidden="true"><Character guide={guide} pose={reaction.pose ?? 'talk'} size={72} allowOverflow /></span>
    <div>
      <p role="status" aria-live="polite" aria-atomic="true">{reaction.text}</p>
      <button type="button" className="btn activity-coach-dismiss" onClick={(event) => {
        const tasks = event.currentTarget.closest('.activity-workbench-task-column')?.querySelector('.activity-workbench-tasks');
        const control = tasks?.querySelector<HTMLElement>('button:not(:disabled):not(.activity-coach-dismiss), input:not(:disabled), select:not(:disabled), textarea:not(:disabled)');
        control?.focus({ preventScroll: true });
        dismiss();
      }}>Dismiss</button>
    </div>
  </aside>;
}
