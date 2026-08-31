import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

const equivalent = (a: number, b: number, c: number, d: number) => a * d === c * b;

export default function FractionModels({ config, onEvent }: WidgetProps<'fraction-models'>) {
  const key = JSON.stringify(config);
  const initial = Math.min(config.numerator ?? 0, config.denominator);
  const [numerator, setNumerator] = useState(initial);
  const { completed, completeOnce } = useCompletionLatch(key);

  useEffect(() => setNumerator(initial), [key]);

  const matches = (next: number) => Boolean(config.target) && (
    config.allowEquivalent
      ? equivalent(next, config.denominator, config.target!.numerator, config.target!.denominator)
      : next === config.target!.numerator && config.denominator === config.target!.denominator
  );

  const commit = (next: number, action: 'select-piece' | 'clear-model') => {
    setNumerator(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { numerator: next, denominator: config.denominator } });
    if (config.target && matches(next)) {
      completeOnce(() => onEvent({
        type: 'complete',
        value: {
          numerator: next,
          denominator: config.denominator,
          equivalent: equivalent(next, config.denominator, config.target!.numerator, config.target!.denominator),
        },
      }));
    }
  };

  const view = (kind: string) => (
    <div data-testid="fraction-view" data-kind={kind}>
      {Array.from({ length: config.denominator }, (_, index) => (
        <span key={index} data-state={index < numerator ? 'shaded' : 'unshaded'}>
          {index < numerator ? 'shaded' : 'unshaded'}
        </span>
      ))}
    </div>
  );

  return (
    <section
      className="card widget-experiment fraction-models"
      data-testid="widget-fraction-models"
      data-state={completed ? 'complete' : 'choosing'}
      data-complete={completed ? 'yes' : 'no'}
    >
      <button onClick={() => commit(0, 'clear-model')}>Clear model</button>
      <div role="group" aria-label="Fraction parts">
        {Array.from({ length: config.denominator }, (_, index) => (
          <button
            key={index}
            aria-label={`Shade part ${index + 1} of ${config.denominator}`}
            aria-pressed={index < numerator}
            onClick={() => commit(index + 1, 'select-piece')}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {config.mode !== 'circles' && view('bars')}
      {config.mode !== 'bars' && view('circles')}
      <p role="status">{completed ? 'Equivalent fraction complete.' : 'Choose the shaded amount.'}</p>
    </section>
  );
}
