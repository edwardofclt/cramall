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
  const matchesCurrentTarget = matches(numerator);
  const visiblyComplete = completed && matchesCurrentTarget;
  const usesEquivalentRepresentation = Boolean(config.target) && matchesCurrentTarget && (
    numerator !== config.target!.numerator || config.denominator !== config.target!.denominator
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

  const stateFor = (index: number) => index < numerator ? 'shaded' : 'unshaded';
  const summary = `${numerator} shaded, ${config.denominator - numerator} unshaded`;
  const sectorPath = (index: number) => {
    const start = (index / config.denominator) * Math.PI * 2 - Math.PI / 2;
    const end = ((index + 1) / config.denominator) * Math.PI * 2 - Math.PI / 2;
    const point = (angle: number) => [50 + 46 * Math.cos(angle), 50 + 46 * Math.sin(angle)];
    const [startX, startY] = point(start);
    const [endX, endY] = point(end);
    return `M 50 50 L ${startX} ${startY} A 46 46 0 0 1 ${endX} ${endY} Z`;
  };

  const barView = (
    <div className="fraction-view" data-testid="fraction-view" data-kind="bars">
      <div
        className="fraction-bar-model"
        data-testid="fraction-bar-model"
        role="img"
        aria-label={`Fraction bar: ${summary}`}
      >
        {Array.from({ length: config.denominator }, (_, index) => (
          <span
            key={index}
            className="fraction-bar-segment"
            data-testid="fraction-bar-segment"
            data-state={stateFor(index)}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="fraction-model-summary">{summary}</p>
    </div>
  );

  const circleView = (
    <div className="fraction-view" data-testid="fraction-view" data-kind="circles">
      <svg
        className="fraction-circle-model"
        data-testid="fraction-circle-model"
        role="img"
        aria-label={`Fraction circle: ${summary}`}
        viewBox="0 0 100 100"
      >
        {Array.from({ length: config.denominator }, (_, index) => (
          <path
            key={index}
            className="fraction-circle-sector"
            data-testid="fraction-circle-sector"
            data-state={stateFor(index)}
            d={sectorPath(index)}
          />
        ))}
      </svg>
      <p className="fraction-model-summary">{summary}</p>
    </div>
  );

  return (
    <section
      className="card widget-experiment fraction-models"
      data-testid="widget-fraction-models"
      data-state={visiblyComplete ? 'complete' : 'choosing'}
      data-complete={visiblyComplete ? 'yes' : 'no'}
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
      {config.mode !== 'circles' && barView}
      {config.mode !== 'bars' && circleView}
      <p role="status">
        {visiblyComplete
          ? usesEquivalentRepresentation ? 'Equivalent fraction complete.' : 'Fraction complete.'
          : 'Choose the shaded amount.'}
      </p>
    </section>
  );
}
