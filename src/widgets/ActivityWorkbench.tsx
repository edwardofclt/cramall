import { useEffect, useRef, type ReactNode } from 'react';
import { ActivityCoachSlot } from './ActivityCoach';
import './activity-workbench.css';

export type ActivityWorkbenchProps = {
  label: string;
  visual: ReactNode;
  children: ReactNode;
  revealKey?: string | number;
  visualScrollable?: boolean;
  className?: string;
};

/** Stable work surface and a separate, growing task flow; no progress state lives here. */
export function ActivityWorkbench({ label, visual, children, revealKey, visualScrollable = false, className = '' }: ActivityWorkbenchProps) {
  const panel = useRef<HTMLDivElement>(null);
  const previous = useRef(revealKey);
  const initial = useRef(revealKey);
  useEffect(() => {
    if (previous.current !== revealKey && panel.current) {
      const markers = panel.current.querySelectorAll<HTMLElement>('[data-activity-reveal]');
      const nextTask = revealKey === initial.current ? null : markers[markers.length - 1];
      // Never use scrollIntoView: it can move the whole lesson and its work surface.
      if (revealKey === initial.current) panel.current.scrollTop = 0;
      else if (nextTask) panel.current.scrollTop += nextTask.getBoundingClientRect().top - panel.current.getBoundingClientRect().top - 16;
    }
    previous.current = revealKey;
  }, [revealKey]);
  return <div className={`activity-workbench ${className}`}>
    <div className="activity-workbench-visual" data-scrollable={visualScrollable ? 'yes' : 'no'} role="region" aria-label={`${label} work surface`} tabIndex={visualScrollable ? 0 : undefined}>{visual}</div>
    <div className="activity-workbench-task-column">
    <div ref={panel} className="activity-workbench-tasks" role="region" aria-label={`${label} tasks`} tabIndex={0}>
      {children}
    </div>
    <ActivityCoachSlot />
    </div>
  </div>;
}
