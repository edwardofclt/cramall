import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Counts = { ones: number; tens: number; hundreds: number; thousands: number };

const ZERO: Counts = { ones: 0, tens: 0, hundreds: 0, thousands: 0 };

const valueOf = (counts: Counts) =>
  counts.ones + counts.tens * 10 + counts.hundreds * 100 + counts.thousands * 1000;

export default function BaseTenBlocks({ config, onEvent }: WidgetProps<'base-ten-blocks'>) {
  const key = JSON.stringify(config);
  const initial = config.initial ?? ZERO;
  const [counts, setCounts] = useState(initial);
  const { completed, completeOnce } = useCompletionLatch(key);

  useEffect(() => setCounts(initial), [key]);

  const commit = (
    next: Counts,
    action: 'add-block' | 'remove-block' | 'regroup' | 'reset',
  ) => {
    const value = valueOf(next);
    setCounts(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { ...next, value } });
    if (config.target !== undefined && value === config.target) {
      completeOnce(() => onEvent({ type: 'complete', value: { ...next, value } }));
    }
  };

  const value = valueOf(counts);

  return (
    <section
      className="card widget-experiment base-ten"
      data-testid="widget-base-ten-blocks"
      data-state={completed ? 'complete' : 'building'}
      data-complete={completed ? 'yes' : 'no'}
    >
      <div className="widget-head">
        <h3 className="widget-title">Base-ten blocks</h3>
        <button onClick={() => commit(ZERO, 'reset')}>Start over</button>
      </div>
      {(['ones', 'tens', 'hundreds', 'thousands'] as const).map((place) => (
        <div key={place}>
          <span>{counts[place]} {place}</span>
          <button
            aria-label={`Add one ${place === 'ones' ? 'block' : `${place.slice(0, -1)} block`}`}
            disabled={counts[place] >= 10}
            onClick={() => commit({ ...counts, [place]: Math.min(10, counts[place] + 1) }, 'add-block')}
          >
            +
          </button>
          <button
            aria-label={`Remove one ${place === 'ones' ? 'block' : `${place.slice(0, -1)} block`}`}
            disabled={!counts[place]}
            onClick={() => commit({ ...counts, [place]: Math.max(0, counts[place] - 1) }, 'remove-block')}
          >
            −
          </button>
        </div>
      ))}
      {config.allowRegroup && (
        <button
          aria-label="Regroup 10 ones"
          disabled={counts.ones < 10 || counts.tens >= 10}
          onClick={() => commit({ ...counts, ones: counts.ones - 10, tens: counts.tens + 1 }, 'regroup')}
        >
          Regroup 10 ones
        </button>
      )}
      <output data-testid="base-ten-counts">{counts.ones} ones, {counts.tens} ten</output>
      <output data-testid="base-ten-value" aria-live="polite">{value}</output>
      <p role="status">{completed ? 'Target complete.' : `${value} built.`}</p>
    </section>
  );
}
