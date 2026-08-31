import { useEffect, useState } from 'react';
import { useReducedMotionPref } from '../../app/useReducedMotionPref';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Segment = { id: string; label: string; weight?: number };

function segmentWeight(segment: Segment): number {
  return segment.weight ?? 1;
}

function emptyCounts(segments: readonly Segment[]): Record<string, number> {
  return Object.fromEntries(segments.map((segment) => [segment.id, 0]));
}

export function spin(segments: Array<{ id: string; weight?: number }>, rng: () => number): string {
  const total = segments.reduce((sum, segment) => sum + (segment.weight ?? 1), 0);
  let pick = rng() * total;
  for (const segment of segments) {
    pick -= segment.weight ?? 1;
    if (pick < 0) return segment.id;
  }
  return segments[segments.length - 1]!.id;
}

function pointAt(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  return { x: 50 + radius * Math.cos(radians), y: 50 + radius * Math.sin(radians) };
}

function slicePath(start: number, end: number) {
  const startPoint = pointAt(start, 43);
  const endPoint = pointAt(end, 43);
  const largeArc = end - start > 180 ? 1 : 0;
  return `M 50 50 L ${startPoint.x} ${startPoint.y} A 43 43 0 ${largeArc} 1 ${endPoint.x} ${endPoint.y} Z`;
}

export default function ProbabilitySpinner({ config, onEvent }: WidgetProps<'probability-spinner'>) {
  const reduced = useReducedMotionPref();
  const key = JSON.stringify(config);
  const [counts, setCounts] = useState<Record<string, number>>(() => emptyCounts(config.segments));
  const [outcome, setOutcome] = useState<string | null>(null);
  const [spins, setSpins] = useState(0);
  const { completed, completeOnce } = useCompletionLatch(key);
  const totalWeight = config.segments.reduce((sum, segment) => sum + segmentWeight(segment), 0);
  const trials = config.trials ?? 1;

  useEffect(() => {
    setCounts(emptyCounts(config.segments));
    setOutcome(null);
    setSpins(0);
  }, [key]);

  const run = () => {
    const outcomeId = spin(config.segments, Math.random);
    const nextCounts = { ...counts, [outcomeId]: counts[outcomeId] + 1 };
    const nextSpins = spins + 1;
    const value = { outcomeId, counts: nextCounts };
    setCounts(nextCounts);
    setOutcome(outcomeId);
    setSpins(nextSpins);
    onEvent({ type: 'interaction', action: 'spin' });
    onEvent({ type: 'change', value });
    const targetSeen = !config.targetOutcomeId || nextCounts[config.targetOutcomeId] > 0;
    if (nextSpins >= trials && targetSeen) {
      completeOnce(() => onEvent({ type: 'complete', value }));
    }
  };

  const reset = () => {
    const nextCounts = emptyCounts(config.segments);
    setCounts(nextCounts);
    setOutcome(null);
    setSpins(0);
    onEvent({ type: 'interaction', action: 'reset' });
    onEvent({ type: 'change', value: { outcomeId: null, counts: nextCounts } });
  };

  const outcomeLabel = config.segments.find((segment) => segment.id === outcome)?.label;
  const wheelLabel = `Spinner model: ${config.segments.map((segment) => `${segment.label} has ${segmentWeight(segment)} of ${totalWeight} equal part${totalWeight === 1 ? '' : 's'}`).join('; ')}.`;
  let startAngle = -90;

  return (
    <section
      className="card widget-experiment spinner"
      data-testid="widget-probability-spinner"
      data-motion={reduced ? 'off' : 'on'}
      data-state={completed ? 'complete' : 'ready'}
      data-complete={completed ? 'yes' : 'no'}
    >
      <h3>Weighted probability spinner</h3>
      <p className="spinner-explanation">This model uses a random number for each spin. Larger areas are more likely over many spins, but one spin does not prove what a future spin will be.</p>
      <div className="spinner-model">
        <svg
          className="spinner-wheel"
          data-testid="spinner-wheel"
          data-spinning={!reduced && spins > 0 ? 'true' : 'false'}
          key={reduced ? 'still' : spins}
          viewBox="0 0 100 100"
          role="img"
          aria-label={wheelLabel}
        >
          <defs>
            <pattern id="spinner-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="8" height="8" fill="var(--c-card)" />
              <rect width="4" height="8" fill="var(--c-ink)" opacity=".3" />
            </pattern>
            <pattern id="spinner-dots" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="var(--c-card)" />
              <circle cx="2" cy="2" r="1.2" fill="var(--c-ink)" />
              <circle cx="6" cy="6" r="1.2" fill="var(--c-ink)" />
            </pattern>
            <pattern id="spinner-checks" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="var(--c-card)" />
              <path d="M 0 0 H 4 V 4 H 0 Z M 4 4 H 8 V 8 H 4 Z" fill="var(--c-ink)" opacity=".28" />
            </pattern>
            <pattern id="spinner-lines" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="var(--c-card)" />
              <path d="M 0 1 H 8 M 0 5 H 8" stroke="var(--c-ink)" strokeWidth="1.5" opacity=".45" />
            </pattern>
          </defs>
          {config.segments.map((segment, index) => {
            const endAngle = startAngle + (segmentWeight(segment) / totalWeight) * 360;
            const path = slicePath(startAngle, endAngle);
            startAngle = endAngle;
            const patterns = ['spinner-stripes', 'spinner-dots', 'spinner-checks', 'spinner-lines'];
            return <path data-testid="spinner-segment" d={path} fill={`url(#${patterns[index % patterns.length]})`} key={segment.id} />;
          })}
          <circle className="spinner-rim" cx="50" cy="50" r="43" />
          <path className="spinner-pointer" d="M 50 1 L 45 12 H 55 Z" />
        </svg>
        <ul className="spinner-legend" aria-label="Spinner segment key">
          {config.segments.map((segment, index) => (
            <li key={segment.id} data-pattern={index % 4}>
              <span aria-hidden="true" className="spinner-pattern-key" />
              {segment.label} — {segmentWeight(segment)} part{segmentWeight(segment) === 1 ? '' : 's'}
            </li>
          ))}
        </ul>
      </div>
      <p className="spinner-progress">Completed {spins} of {trials} trial{trials === 1 ? '' : 's'}; {Math.max(0, trials - spins)} remaining.</p>
      {config.targetOutcomeId && <p className="spinner-target">Completion also needs: {config.segments.find((segment) => segment.id === config.targetOutcomeId)?.label}.</p>}
      <div className="spinner-controls">
        <button aria-label="Spin" onClick={run}>Spin</button>
        <button onClick={reset}>Start over</button>
      </div>
      <table className="spinner-frequency" aria-label="Cumulative spin frequencies">
        <caption>Cumulative frequency table</caption>
        <thead><tr><th scope="col">Outcome</th><th scope="col">Times selected</th></tr></thead>
        <tbody>
          {config.segments.map((segment) => (
            <tr key={segment.id}><th scope="row">{segment.label}</th><td>{counts[segment.id]}</td></tr>
          ))}
        </tbody>
      </table>
      <p role="status">{outcomeLabel ? `Spinner selected ${outcomeLabel}.` : 'Press Spin to choose a model-generated random outcome.'}</p>
    </section>
  );
}
