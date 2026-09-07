import { ActivityWorkbench } from '../ActivityWorkbench';
import './guide-led-math.css';
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
  const [acted, setActed] = useState(false);
  const [checkedEndpoint, setCheckedEndpoint] = useState<number | null>(null);
  const { completed, completeOnce } = useCompletionLatch(key);
  const tickCount = length * 4 + 1;
  const matchesCurrentTarget = inches === target;
  const visiblyComplete = completed && acted && matchesCurrentTarget;

  useEffect(() => {
    setInches(start); setCheckedEndpoint(null); setActed(false);
    milestoneSent.current = false;
  }, [key, start]);

  const commit = (raw: number, action: 'move-marker' | 'reset') => {
    if (action === 'reset') setCheckedEndpoint(null);
    const previous = inches;
    const next = Math.round(Math.max(0, Math.min(length, raw)) * 4) / 4;
    setInches(next); setActed(action !== 'reset');
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { inches: next } });
    if (next !== previous && next !== target) {
      const currentDistance = Math.abs(previous - target);
      const nextDistance = Math.abs(next - target);
      if (nextDistance < currentDistance && !milestoneSent.current) {
        milestoneSent.current = true;
        onEvent({ type: 'coach', cue: 'milestone' });
      }
    }
    if (action !== 'reset' && next === target) {
      completeOnce(() => onEvent({ type: 'complete', value: { inches: next } }));
    }
  };

  const rulerLabel = `Quarter-inch ruler from 0 to ${length} inches. Marker at ${mixedMeasurement(inches)}.`;

  return (
    <section
      className="card widget-experiment ruler activity-shell math-activity"
      data-testid="widget-quarter-inch-ruler"
      data-state={visiblyComplete ? 'complete' : 'measuring'}
      data-complete={visiblyComplete ? 'yes' : 'no'}
    >
<ActivityWorkbench label="Measure quarter inches" visual={<><div className="widget-task" data-testid="widget-task">
        <strong>Goal:</strong> {config.taskPrompt ?? `Place the object endpoint at ${compactMeasurement(target)}`}
        <span> Target endpoint: {compactMeasurement(target)}.</span>
      </div>
<div className="ruler-viewport math-ruler-surface">
<svg viewBox="0 0 640 200" role="group" aria-label="Object and quarter-inch ruler" className="math-ruler-svg">
  <g data-testid="measured-object" data-start-inches="0" data-end-inches={target} data-zero-aligned="true" data-quarter-step={Math.round(target * 4)} role="img" aria-label={`Measured object starts at 0 inches and ends at ${mixedMeasurement(target)}`}>
    <rect x="24" y="26" width={target / length * 592} height="34" rx="5" fill="#d8a64c" stroke="#6f4d25" strokeWidth="3" data-testid="measured-object-body" />
    <line x1={24 + target / length * 592} x2={24 + target / length * 592} y1="20" y2="94" stroke="#794d29" strokeWidth="4" data-testid="measured-object-endpoint" data-quarter-step={Math.round(target * 4)} />
    <text x="28" y="18" fontSize="14">Object</text>
  </g>
  <g className="math-ruler-track" role="img" aria-label={rulerLabel}>
    <rect x="24" y="94" width="592" height="80" rx="3" fill="#f5e4af" stroke="#665125" strokeWidth="2" />
    {Array.from({ length: tickCount }, (_, index) => { const value = index / 4; const kind: TickKind = index % 4 === 0 ? 'whole' : index % 2 === 0 ? 'half' : 'quarter'; const x = 24 + value / length * 592; return <g key={index} data-testid="ruler-tick" data-tick-kind={kind} data-marker={value === inches ? 'true' : 'false'} data-inches={value} aria-hidden="true"><line x1={x} x2={x} y1="94" y2={kind === 'whole' ? 139 : kind === 'half' ? 126 : 115} stroke="#665125" strokeWidth="2" />{kind === 'whole' && <text className="ruler-label" x={x} y="158" fontSize="17" textAnchor="middle">{value}</text>}</g>; })}
    <path d={`M${24 + inches / length * 592} 83l-8 -13h16Z`} fill="#38647c" />
    <line x1={24 + inches / length * 592} x2={24 + inches / length * 592} y1="84" y2="179" stroke="#38647c" strokeWidth="3" />
  </g>
</svg></div></>}>
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
<output aria-label={`Marker at ${mixedMeasurement(inches)}`}>{mixedMeasurement(inches)}</output>
<p role="status">
        {visiblyComplete ? 'Target measurement complete.' : `Marker at ${mixedMeasurement(inches)}.`}
      </p>
<section className="math-task"><h4>Check the endpoint</h4><button type="button" onClick={() => { setCheckedEndpoint(inches); onEvent({ type: 'coach', cue: inches === target ? 'milestone' : 'retry' }); }}>Check my endpoint</button><p aria-label="Endpoint check feedback" role="status">{checkedEndpoint === null ? 'Move the marker, then check your idea.' : checkedEndpoint === target ? `Correct: your marker at ${compactMeasurement(checkedEndpoint)} lines up with the object’s end.` : `Try again. Your checked marker was at ${compactMeasurement(checkedEndpoint)}. Compare it with the object’s end.`}</p><p>There are four equal quarter-inch spaces in each inch. How many quarter spaces come after the last whole-inch mark?</p></section>
</ActivityWorkbench>
</section>
  );
}
