import type { CauseConfig } from '../../content/social-studies/history-schema';
import { HistoryActivity, type HistoryWidgetProps } from './HistoryActivity';

export default function HistoryCauseEffect({ config, onEvent }: HistoryWidgetProps<CauseConfig>) {
  return <HistoryActivity config={config} onEvent={onEvent} type="history-cause-effect" surfaceLabel="Your cause and effect connections"
    instruction="Read an effect card. Connect it to the action or condition that helped cause it. History can have several causes; being earlier is not enough."
    retryHint="Look for a source detail showing how the action affected people. Earlier does not always mean caused."
    items={config.effects.map(effect => ({ ...effect, title: effect.text, targetId: effect.causeId }))}
    targets={config.causes.map(cause => ({ id: cause.id, label: cause.text }))} />;
}
