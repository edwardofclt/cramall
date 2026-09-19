import { expect, test } from 'vitest';
import { widgetSpeechText } from './widgetSpeechText';
import { timelineConfig, mapConfig, evidenceConfig, causeConfig } from './social-studies/history-fixtures';
import type { WidgetRef } from '../content/schema';

test.each([
  [{type:'history-timeline',config:timelineConfig}, 'New government begins'],
  [{type:'history-map',config:mapConfig}, 'Upcountry'],
  [{type:'history-evidence-board',config:evidenceConfig}, 'First national plan'],
  [{type:'history-cause-effect',config:causeConfig}, 'States approve the first plan'],
] as const)('reads the visible history work material without its hidden explanation', (ref, visible) => {
  const spoken=widgetSpeechText(ref as WidgetRef).join(' ');
  expect(spoken).toContain(visible);
  for (const source of ref.config.sources) expect(spoken).toContain(source.text);
  expect(spoken).not.toContain(ref.config.explain.explanation);
});
