import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Action = 'increase-value' | 'decrease-value' | 'reset';

function emptyValues(categories: readonly string[]): Record<string, number> {
  return Object.fromEntries(categories.map((category) => [category, 0]));
}

function scaleTicks(maximum: number): number[] {
  const step = maximum <= 10 ? 1 : maximum <= 25 ? 5 : 10;
  const ticks = Array.from({ length: Math.floor(maximum / step) + 1 }, (_, index) => index * step);
  return ticks[ticks.length - 1] === maximum ? ticks.reverse() : [maximum, ...ticks.reverse()];
}

export default function DataPlotBuilder({ config, onEvent }: WidgetProps<'data-plot-builder'>) {
  const key = JSON.stringify(config);
  const [values, setValues] = useState<Record<string, number>>(() => emptyValues(config.categories));
  const { completed, completeOnce } = useCompletionLatch(key);
  const maximum = Math.max(1, ...config.categories.flatMap((category) => [config.target[category], values[category]]));
  const exact = (next: Record<string, number>) => config.categories.every((category) => next[category] === config.target[category]);

  useEffect(() => setValues(emptyValues(config.categories)), [key]);

  const commit = (next: Record<string, number>, action: Action) => {
    setValues(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { values: next } });
    if (exact(next)) completeOnce(() => onEvent({ type: 'complete', value: { values: next } }));
  };

  const chartLabel = `${config.kind === 'bar' ? 'Bar' : 'Dot'} plot with a shared zero baseline and integer scale from 0 to ${maximum}. ${config.categories.map((category) => `${category}: ${values[category]}.`).join(' ')}`;

  return (
    <section
      className="card widget-experiment data-plot"
      data-testid="widget-data-plot-builder"
      data-state={completed ? 'complete' : 'building'}
      data-complete={completed ? 'yes' : 'no'}
    >
      <h3>{config.prompt}</h3>
      <p className="data-plot-instruction">Use the controls to build the exact plot. Each category starts at zero.</p>
      <div className="data-plot-controls" aria-label="Plot value controls">
        {config.categories.map((category) => (
          <section className="data-plot-control" key={category} aria-label={`${category} controls`}>
            <h4>{category}</h4>
            <p>Current value: <strong>{values[category]}</strong></p>
            <div>
              <button
                aria-label={`Decrease ${category}`}
                disabled={values[category] === 0}
                onClick={() => commit({ ...values, [category]: values[category] - 1 }, 'decrease-value')}
              >
                −
              </button>
              <button
                aria-label={`Increase ${category}`}
                disabled={values[category] === 50}
                onClick={() => commit({ ...values, [category]: values[category] + 1 }, 'increase-value')}
              >
                +
              </button>
            </div>
          </section>
        ))}
      </div>
      <div className="data-plot-viewport" role="region" aria-label="Scrollable data plot" tabIndex={0}>
        <div className="data-plot-chart" role="img" aria-label={chartLabel}>
          <div className="data-plot-scale" aria-label={`Integer scale from 0 to ${maximum}`}>
            {scaleTicks(maximum).map((tick) => <span className="data-plot-scale-label" key={tick}>{tick}</span>)}
          </div>
          <div className="data-plot-columns" data-kind={config.kind}>
            {config.categories.map((category) => {
              const value = values[category];
              return (
                <div className="data-plot-column" key={category}>
                  <div className="data-plot-mark-area">
                    {config.kind === 'bar' ? (
                      <div
                        className="data-plot-bar"
                        data-testid={`bar-${category}`}
                        data-value={value}
                        style={{ height: value === 0 ? '0%' : `${(value / maximum) * 100}%` }}
                        aria-hidden="true"
                      />
                    ) : (
                      <div className="data-plot-dots" aria-hidden="true">
                        {Array.from({ length: value }, (_, index) => (
                          <span className="data-plot-dot" data-testid={`dot-${category}`} key={index}>●</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="data-plot-category">{category}</p>
                </div>
              );
            })}
            <div className="data-plot-baseline" data-testid="data-plot-baseline" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="data-plot-values" aria-label="Current plot values">
        {config.categories.map((category) => <p key={category}>{category}: {values[category]}</p>)}
      </div>
      <button className="data-plot-reset" onClick={() => commit(emptyValues(config.categories), 'reset')}>Start over</button>
      <p role="status">{completed ? 'Plot matches the target.' : 'Adjust the plot values.'}</p>
    </section>
  );
}
