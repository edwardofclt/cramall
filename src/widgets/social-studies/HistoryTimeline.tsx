import type { TimelineConfig } from '../../content/social-studies/history-schema';
import { HistoryActivity, type HistoryWidgetProps } from './HistoryActivity';

export default function HistoryTimeline({ config, onEvent }: HistoryWidgetProps<TimelineConfig>) {
  return <HistoryActivity config={config} onEvent={onEvent} type="history-timeline" surfaceLabel="Your timeline"
    instruction="Read each date and event. Select an event, then place it from earliest to latest. Select a placed event again to move it."
    retryHint="Compare this year with the cards beside it. Which event happened earlier?"
    items={config.events.map(event => ({ ...event, targetId: `position-${config.correctOrder.indexOf(event.id) + 1}` }))}
    targets={config.correctOrder.map((_, index) => ({ id: `position-${index + 1}`, label: `Position ${index + 1}${index === 0 ? ' (earliest)' : index === config.events.length - 1 ? ' (latest)' : ''}` }))} />;
}
