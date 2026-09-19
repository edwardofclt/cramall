import type { EvidenceConfig } from '../../content/social-studies/history-schema';
import { HistoryActivity, type HistoryWidgetProps } from './HistoryActivity';

export default function HistoryEvidenceBoard({ config, onEvent }: HistoryWidgetProps<EvidenceConfig>) {
  return <HistoryActivity config={config} onEvent={onEvent} type="history-evidence-board" surfaceLabel="Your evidence board"
    instruction="Read the sources and comparison headings. Attach each detail to the heading it supports. Select a placed card to revise it."
    retryHint="Reread the card's source. Which comparison heading matches that detail?"
    items={config.cards.map(card => ({ ...card, title: card.text }))}
    targets={config.headings} />;
}
