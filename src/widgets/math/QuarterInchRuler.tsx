import { useEffect, useRef, useState } from 'react';
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

function compactMeasurement(inches: number) {
  const quarters = Math.round(inches * 4);
  const whole = Math.floor(quarters / 4);
  const remainder = quarters % 4;
  const fraction = ['', '¼', '½', '¾'][remainder];
  return `${whole}${fraction} inches`;
}

export default function QuarterInchRuler({ config, onEvent }: WidgetProps<'quarter-inch-ruler'>) {
  const key = JSON.stringify(config);
  const length = config.lengthInches ?? 12;
  const start = canonicalQuarter(config.startInches ?? 0);
  const target = canonicalQuarter(config.targetInches);
  const [inches, setInches] = useState(start);
  const milestoneSent = useRef(false);
  const { completed, completeOnce } = useCompletionLatch(key);
  const tickCount = length * 4 + 1;
  const matchesCurrentTarget = inches === target;
  const visiblyComplete = completed && matchesCurrentTarget;

  useEffect(() => {
    setInches(start);
    milestoneSent.current = false;
  }, [key, start]);

  const commit = (raw: number, action: 'move-marker' | 'reset') => {
    const previous = inches;
    const next = Math.round(Math.max(0, Math.min(length, raw)) * 4) / 4;
    setInches(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { inches: next } });
    if (next !== previous && next !== target) {
      const currentDistance = Math.abs(previous - target);
      const nextDistance = Math.abs(next - target);
      if (nextDistance < currentDistance && !milestoneSent.current) {
        milestoneSent.current = true;
        onEvent({ type: 'coach', cue: 'milestone' });
      } else if (nextDistance >= currentDistance) {
        onEvent({ type: 'coach', cue: 'retry' });
      }
    }
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
      <div className="widget-task" data-testid="widget-task">
        <strong>Goal:</strong> {config.taskPrompt ?? `Place the object endpoint at ${compactMeasurement(target)}`}
        <span> Target endpoint: {compactMeasurement(target)}.</span>
      </div>
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
          className="ruler-measured-object"
          data-testid="measured-object"
          data-start-inches="0"
          data-end-inches={target}
          data-zero-aligned="true"
          data-quarter-step={Math.round(target * 4)}
          role="img"
          aria-label={`Measured object starts at 0 inches and ends at ${mixedMeasurement(target)}`}
          style={{
            position: 'relative',
            width: `${Math.max(32, target * 128)}px`,
            minHeight: '2.5rem',
          }}
        >
          <span
            data-testid="measured-object-body"
            aria-hidden="true"
            style={{
              display: 'block',
              width: '100%',
              height: '2rem',
              boxSizing: 'border-box',
              border: '3px solid var(--c-ink)',
              borderRadius: '.5rem',
              background: 'repeating-linear-gradient(135deg, var(--c-card) 0 .45rem, var(--c-accent) .45rem .9rem)',
              fontWeight: 800,
            }}
          >
            <span style={{ paddingInline: '.4rem' }}>Measured object</span>
          </span>
          <span
            data-testid="measured-object-endpoint"
            data-quarter-step={Math.round(target * 4)}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '.05rem',
              right: '-.35rem',
              width: '.7rem',
              height: '2.4rem',
              border: '3px solid var(--c-ink)',
              borderRadius: '.25rem',
              background: 'var(--c-accent-action)',
            }}
          />
        </div>
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
