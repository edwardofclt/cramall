import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type TickKind = 'whole' | 'half' | 'quarter';
const canonicalQuarter = (value: number) => Math.round(value * 4) / 4;

function mixedMeasurement(inches: number) {
  const quarters = Math.round(inches * 4);
  const whole = Math.floor(quarters / 4);
  const remainder = quarters % 4;
  const fraction = ['', '1/4', '1/2', '3/4'][remainder];
  const mixed = fraction ? `${whole} ${fraction}` : String(whole);
  return `${mixed} inches (${inches} inches)`;
}

export default function QuarterInchRuler({ config, onEvent }: WidgetProps<'quarter-inch-ruler'>) {
  const key = JSON.stringify(config);
  const length = config.lengthInches ?? 12;
  const start = canonicalQuarter(config.startInches ?? 0);
  const target = canonicalQuarter(config.targetInches);
  const [inches, setInches] = useState(start);
  const { completed, completeOnce } = useCompletionLatch(key);
  const tickCount = length * 4 + 1;
  const matchesCurrentTarget = inches === target;
  const visiblyComplete = completed && matchesCurrentTarget;

  useEffect(() => setInches(start), [key]);

  const commit = (raw: number, action: 'move-marker' | 'reset') => {
    const next = Math.round(Math.max(0, Math.min(length, raw)) * 4) / 4;
    setInches(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { inches: next } });
    if (next === target) {
      completeOnce(() => onEvent({ type: 'complete', value: { inches: next } }));
    }
  };

  const rulerLabel = `Quarter-inch ruler from 0 to ${length} inches. Marker at ${mixedMeasurement(inches)}.`;

  return (
    <section
      className="card widget-experiment ruler"
      data-testid="widget-quarter-inch-ruler"
      data-state={visiblyComplete ? 'complete' : 'measuring'}
      data-complete={visiblyComplete ? 'yes' : 'no'}
    >
      <div className="ruler-controls" aria-label="Ruler controls">
        <button
          aria-label="Move marker left one quarter inch"
          disabled={inches === 0}
          onClick={() => commit(inches - 0.25, 'move-marker')}
        >
          ← ¼ inch
        </button>
        <button
          aria-label="Move marker right one quarter inch"
          disabled={inches === length}
          onClick={() => commit(inches + 0.25, 'move-marker')}
        >
          ¼ inch →
        </button>
        <button onClick={() => commit(start, 'reset')}>Start over</button>
      </div>
      <div className="ruler-viewport" role="region" aria-label="Scrollable quarter-inch ruler" tabIndex={0}>
        <div
          className="ruler-track"
          role="img"
          aria-label={rulerLabel}
          style={{ gridTemplateColumns: `repeat(${tickCount}, 32px)` }}
        >
          {Array.from({ length: tickCount }, (_, index) => {
            const tickInches = index / 4;
            const kind: TickKind = index % 4 === 0 ? 'whole' : index % 2 === 0 ? 'half' : 'quarter';
            const marker = tickInches === inches;
            return (
              <div
                className="ruler-tick"
                data-testid="ruler-tick"
                data-tick-kind={kind}
                data-marker={marker ? 'true' : 'false'}
                data-inches={tickInches}
                key={index}
                aria-hidden="true"
              >
                {kind === 'whole' && <span className="ruler-label">{tickInches}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <output aria-label={`Marker at ${mixedMeasurement(inches)}`}>{mixedMeasurement(inches)}</output>
      <p role="status">
        {visiblyComplete ? 'Target measurement complete.' : `Marker at ${mixedMeasurement(inches)}.`}
      </p>
    </section>
  );
}
