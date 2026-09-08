import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ActivityWorkbench } from '../ActivityWorkbench';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';
import './scale-reading.css';

type ScaleItem = WidgetProps<'scale-reading'>['config']['items'][number];
type Illustration = ScaleItem['illustration'];

const unitNames = { oz: 'ounces', lb: 'pounds', g: 'grams', kg: 'kilograms' } as const;
const alternateUnits = { oz: 'lb', lb: 'oz', g: 'kg', kg: 'g' } as const;

const reading = (tenths: number) => (tenths / 10).toFixed(1);
const roundedWhole = (tenths: number) => Math.floor((tenths + 5) / 10);

function polarPoint(angle: number, radius: number) {
  const radians = (angle - 90) * Math.PI / 180;
  return { x: 260 + radius * Math.cos(radians), y: 236 + radius * Math.sin(radians) };
}

function dialAngle(value: number, item: ScaleItem) {
  const start = item.minWhole * 10;
  const end = item.maxWhole * 10;
  return -110 + ((value - start) / (end - start)) * 220;
}

function ObjectIcon({ illustration, label, compact = false }: { illustration: Illustration; label: string; compact?: boolean }) {
  let drawing: ReactNode;
  if (illustration === 'apple') {
    drawing = <>
      <path className="scale-object-leaf" d="M53 24c6-12 18-11 24-8-5 9-13 13-24 8Z" />
      <path className="scale-object-stem" d="M52 31c1-9 4-15 9-21" />
      <path className="scale-object-apple" d="M51 32c13-10 31-1 31 20 0 24-17 36-31 30-14 6-32-6-32-30 0-21 19-30 32-20Z" />
      <path className="scale-object-shine" d="M34 42c-5 5-7 12-5 19" />
    </>;
  } else if (illustration === 'backpack') {
    drawing = <>
      <path className="scale-object-strap" d="M31 39V27c0-16 38-16 38 0v12M22 46C9 53 13 77 25 79M78 46c13 7 9 31-3 33" />
      <rect className="scale-object-backpack" x="22" y="28" width="56" height="58" rx="15" />
      <path className="scale-object-pocket" d="M31 59h38v20H31z" />
      <path className="scale-object-seam" d="M36 42h28M50 30v12" />
    </>;
  } else if (illustration === 'eraser') {
    drawing = <g transform="rotate(-12 50 52)">
      <rect className="scale-object-eraser" x="14" y="34" width="72" height="38" rx="8" />
      <path className="scale-object-eraser-band" d="M55 34h23c4 0 8 4 8 8v22c0 4-4 8-8 8H55Z" />
      <path className="scale-object-seam" d="M55 34v38" />
    </g>;
  } else {
    drawing = <>
      <path className="scale-object-strap" d="M28 38V27c0-13 44-13 44 0v11" />
      <rect className="scale-object-kit" x="13" y="35" width="74" height="48" rx="10" />
      <path className="scale-object-kit-pocket" d="M32 54h36v22H32z" />
      <path className="scale-object-buckle" d="M43 34v18h14V34M47 58h6v7h-6z" />
    </>;
  }
  return <svg className={`scale-object-icon${compact ? ' scale-object-icon--compact' : ''}`} viewBox="0 0 100 100" role="img" aria-label={`${label} illustration`}>
    {drawing}
  </svg>;
}

function ScaleDial({ item, placed, markerTenths }: { item: ScaleItem; placed: boolean; markerTenths: number }) {
  const ticks = useMemo(() => Array.from(
    { length: item.maxWhole * 10 - item.minWhole * 10 + 1 },
    (_, index) => item.minWhole * 10 + index,
  ), [item.maxWhole, item.minWhole]);
  const targetAngle = dialAngle(item.valueTenths, item);
  const markerAngle = dialAngle(markerTenths, item);
  const target = polarPoint(targetAngle, 132);
  const markerInner = polarPoint(markerAngle, 142);
  const markerOuter = polarPoint(markerAngle, 174);

  return <svg className="scale-dial" viewBox="0 0 520 305" role="img" aria-label={placed
    ? `${item.label} scale. The needle reads ${reading(item.valueTenths)} ${unitNames[item.unit]}. The movable marker is at ${reading(markerTenths)} ${unitNames[item.unit]}.`
    : `${item.label} scale in ${unitNames[item.unit]}. No object is on the tray yet.`}>
    <path className="scale-dial-body" d="M64 258c0-108 88-196 196-196s196 88 196 196v25H64Z" />
    <path className="scale-dial-face" d="M96 252c0-91 73-164 164-164s164 73 164 164" />
    {ticks.map((value) => {
      const angle = dialAngle(value, item);
      const whole = value % 10 === 0;
      const outer = polarPoint(angle, 160);
      const inner = polarPoint(angle, whole ? 137 : 149);
      return <line key={value} className="scale-tick" data-whole={whole ? 'yes' : 'no'} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} />;
    })}
    {Array.from({ length: item.maxWhole - item.minWhole + 1 }, (_, index) => item.minWhole + index).map((value) => {
      const point = polarPoint(dialAngle(value * 10, item), 116);
      return <text key={value} className="scale-dial-number" x={point.x} y={point.y + 5} textAnchor="middle">{value}</text>;
    })}
    <text className="scale-dial-unit" x="260" y="181" textAnchor="middle">{unitNames[item.unit]}</text>
    {placed && <>
      <line className="scale-needle" x1="260" y1="236" x2={target.x} y2={target.y} />
      <circle className="scale-needle-pin" cx="260" cy="236" r="12" />
      <line className="scale-reading-marker" x1={markerInner.x} y1={markerInner.y} x2={markerOuter.x} y2={markerOuter.y} />
    </>}
    <path className="scale-base" d="M108 281h304l24 20H84Z" />
  </svg>;
}

function ScaleReadingActivity({ config, onEvent }: WidgetProps<'scale-reading'>) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [placed, setPlaced] = useState(false);
  const [markerTenths, setMarkerTenths] = useState(config.items[0].minWhole * 10);
  const [aligned, setAligned] = useState(false);
  const [lowerInput, setLowerInput] = useState('');
  const [upperInput, setUpperInput] = useState('');
  const [neighborsConfirmed, setNeighborsConfirmed] = useState(false);
  const [roundedChoice, setRoundedChoice] = useState('');
  const [records, setRecords] = useState<Record<string, number>>({});
  const [predictionFeedback, setPredictionFeedback] = useState('Choose the unit you think would give a convenient reading.');
  const [markerFeedback, setMarkerFeedback] = useState('Move the orange marker until it lines up with the needle.');
  const [neighborFeedback, setNeighborFeedback] = useState('Enter the whole numbers on either side of the needle.');
  const [roundingFeedback, setRoundingFeedback] = useState('Choose the neighboring whole number that is nearest to the reading.');
  const [explanationFeedback, setExplanationFeedback] = useState('Use the halfway point to explain all four records.');
  const [explanationChoice, setExplanationChoice] = useState<'retry' | 'correct' | null>(null);
  const [attempt, setAttempt] = useState(0);
  const firstObject = useRef<HTMLButtonElement>(null);
  const key = JSON.stringify(config);
  const { completed, completeOnce } = useCompletionLatch(`${key}:${attempt}`);
  const selected = config.items.find((item) => item.id === selectedId) ?? null;
  const allRecorded = Object.keys(records).length === config.items.length;
  const currentRecorded = selected ? records[selected.id] !== undefined : false;
  const phase = allRecorded ? 'explain' : !selected ? 'pick' : !prediction ? 'predict' : !placed ? 'place' : !aligned ? 'align' : !neighborsConfirmed ? 'neighbors' : currentRecorded ? 'pick' : 'round';

  useEffect(() => {
    firstObject.current?.focus({ preventScroll: true });
  }, [attempt]);

  function selectItem(item: ScaleItem) {
    setSelectedId(item.id);
    setPrediction(null);
    setPlaced(false);
    setMarkerTenths(item.minWhole * 10);
    setAligned(false);
    setLowerInput('');
    setUpperInput('');
    setNeighborsConfirmed(false);
    setRoundedChoice('');
    setPredictionFeedback('Choose the unit you think would give a convenient reading.');
    setMarkerFeedback('Move the orange marker until it lines up with the needle.');
    setNeighborFeedback('Enter the whole numbers on either side of the needle.');
    setRoundingFeedback('Choose the neighboring whole number that is nearest to the reading.');
    onEvent({ type: 'interaction', action: 'select-object' });
  }

  function predict(unit: string) {
    setPrediction(unit);
    setPredictionFeedback(`You chose ${unitNames[unit as keyof typeof unitNames]}. Unit choices can make a reading easier to use. Now place the object on its labeled scale.`);
    onEvent({ type: 'interaction', action: 'predict' });
    onEvent({ type: 'coach', cue: 'strategy' });
  }

  function place() {
    if (!selected) return;
    setPlaced(true);
    onEvent({ type: 'interaction', action: 'place' });
  }

  function moveMarker(next: number) {
    if (!selected) return;
    setMarkerTenths(next);
    setMarkerFeedback('Move the orange marker until it lines up with the needle.');
    onEvent({ type: 'interaction', action: 'move-marker' });
    onEvent({ type: 'change', value: { objectId: selected.id, markerTenths: next } });
  }

  function checkMarker() {
    if (!selected) return;
    if (markerTenths !== selected.valueTenths) {
      setMarkerFeedback('The marker and needle do not line up yet. Move the marker one tick at a time.');
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }
    setAligned(true);
    setMarkerFeedback(`Marker aligned with the needle at ${reading(selected.valueTenths)} ${unitNames[selected.unit]}.`);
  }

  function checkNeighbors() {
    if (!selected) return;
    onEvent({ type: 'interaction', action: 'record' });
    const lower = Math.floor(selected.valueTenths / 10);
    const upper = Math.ceil(selected.valueTenths / 10);
    if (Number(lowerInput) !== lower || Number(upperInput) !== upper) {
      setNeighborFeedback('Try again. Read the whole-number labels just below and just above the needle.');
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }
    setNeighborsConfirmed(true);
    setNeighborFeedback(`${lower} ${unitNames[selected.unit]} and ${upper} ${unitNames[selected.unit]} are the neighboring whole numbers.`);
  }

  function recordRounded() {
    if (!selected) return;
    onEvent({ type: 'interaction', action: 'record' });
    const answer = roundedWhole(selected.valueTenths);
    if (Number(roundedChoice) !== answer) {
      setRoundingFeedback('Try again. Compare the reading with the halfway point between those two whole marks.');
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }
    const next = { ...records, [selected.id]: answer };
    setRecords(next);
    setRoundingFeedback(`Recorded ${reading(selected.valueTenths)} ${unitNames[selected.unit]} as ${answer} ${unitNames[selected.unit]} to the nearest whole unit.`);
    if (Object.keys(records).length === 0) onEvent({ type: 'coach', cue: 'milestone' });
  }

  function explain(correct: boolean) {
    onEvent({ type: 'interaction', action: 'explain' });
    if (!correct) {
      setExplanationChoice('retry');
      setExplanationFeedback('Try again. A reading can be nearer to the upper whole number, especially at or beyond halfway.');
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }
    setExplanationChoice('correct');
    setExplanationFeedback('Field kit record complete. At or above halfway rounds up; below halfway rounds down.');
    completeOnce(() => onEvent({ type: 'complete', value: { records } }));
  }

  function reset() {
    setSelectedId(null);
    setPrediction(null);
    setPlaced(false);
    setMarkerTenths(config.items[0].minWhole * 10);
    setAligned(false);
    setLowerInput('');
    setUpperInput('');
    setNeighborsConfirmed(false);
    setRoundedChoice('');
    setRecords({});
    setPredictionFeedback('Choose the unit you think would give a convenient reading.');
    setMarkerFeedback('Move the orange marker until it lines up with the needle.');
    setNeighborFeedback('Enter the whole numbers on either side of the needle.');
    setRoundingFeedback('Choose the neighboring whole number that is nearest to the reading.');
    setExplanationFeedback('Use the halfway point to explain all four records.');
    setExplanationChoice(null);
    setAttempt((value) => value + 1);
    onEvent({ type: 'interaction', action: 'reset' });
  }

  const visualItem = selected ?? config.items.find((item) => records[item.id] === undefined) ?? config.items[config.items.length - 1];
  const minTenths = visualItem.minWhole * 10;
  const maxTenths = visualItem.maxWhole * 10;
  const predictionUnits = selected ? [selected.unit, alternateUnits[selected.unit]] : [];
  const lower = selected ? Math.floor(selected.valueTenths / 10) : 0;
  const upper = selected ? Math.ceil(selected.valueTenths / 10) : 0;

  return <section className="activity-shell math-activity scale-reading" data-testid="widget-scale-reading" data-state={completed ? 'complete' : phase}>
    <ActivityWorkbench label="Weigh the field kit" revealKey={`${Object.keys(records).length}-${phase}`} visual={<>
      <div className="scale-heading">
        <div><span className="scale-kicker">FIELD STATION</span><h3>Read the dial</h3></div>
        <span className="scale-round-count">{Object.keys(records).length} of {config.items.length} recorded</span>
      </div>
      <div className="scale-machine">
        <div className="scale-tray" aria-hidden="true" />
        <div className="scale-object-stage" data-placed={placed ? 'yes' : 'no'}>
          <ObjectIcon illustration={visualItem.illustration} label={visualItem.label} />
        </div>
        <ScaleDial item={visualItem} placed={placed} markerTenths={markerTenths} />
      </div>
      <p className="scale-source-reading" role="status" aria-live="polite">
        {placed ? `Scale needle reads ${reading(visualItem.valueTenths)} ${unitNames[visualItem.unit]}.` : `${visualItem.label} scale · ${unitNames[visualItem.unit]}`}
      </p>
    </>}>
      <section className="scale-task" data-activity-reveal={phase === 'pick' && Object.keys(records).length > 0 ? true : undefined}>
        <h4>1 · Pick an object</h4>
        <div className="scale-object-buttons">
          {config.items.map((item, index) => {
            const done = records[item.id] !== undefined;
            return <button key={item.id} ref={index === 0 ? firstObject : undefined} type="button" disabled={done || completed} aria-label={done ? `Recorded ${item.label}` : `Weigh ${item.label}`} aria-pressed={selectedId === item.id} onClick={() => selectItem(item)}>
              <ObjectIcon illustration={item.illustration} label={item.label} compact />
              <span>{done ? `Recorded ${item.label}` : `Weigh ${item.label}`}</span>
            </button>;
          })}
        </div>
      </section>

      {selected && !currentRecorded && <section className="scale-task" data-activity-reveal>
        <h4>2 · Predict a useful unit</h4>
        <p>This prediction is a plan, not a scored answer. Which unit might give a convenient number?</p>
        <div className="scale-unit-buttons">
          {predictionUnits.map((unit) => <button key={unit} type="button" disabled={placed} aria-pressed={prediction === unit} onClick={() => predict(unit)}>Choose {unitNames[unit]}</button>)}
        </div>
        <p className="scale-feedback" aria-label="Unit prediction feedback">{predictionFeedback}</p>
        {prediction && !placed && <button type="button" className="scale-primary" onClick={place}>Place {selected.label} on the scale</button>}
      </section>}

      {selected && placed && !currentRecorded && <section className="scale-task" data-activity-reveal>
        <h4>3 · Align the reading marker</h4>
        <label htmlFor={`scale-marker-${selected.id}`}>Reading marker</label>
        <input id={`scale-marker-${selected.id}`} type="range" aria-label="Reading marker" aria-valuetext={`${reading(markerTenths)} ${unitNames[selected.unit]}`} min={minTenths} max={maxTenths} step="1" value={markerTenths} disabled={aligned} onChange={(event) => moveMarker(Number(event.currentTarget.value))} />
        <div className="scale-range-ends" aria-hidden="true"><span>{visualItem.minWhole}</span><span>{unitNames[visualItem.unit]}</span><span>{visualItem.maxWhole}</span></div>
        <button type="button" disabled={aligned} onClick={checkMarker}>Check marker</button>
        <p className="scale-feedback" aria-label="Marker feedback" role="status">{markerFeedback}</p>
      </section>}

      {selected && aligned && !currentRecorded && <section className="scale-task" data-activity-reveal>
        <h4>4 · Find the neighboring whole numbers</h4>
        <div className="scale-neighbor-inputs">
          <label>Lower whole number<input type="number" aria-label="Lower whole number" inputMode="numeric" value={lowerInput} disabled={neighborsConfirmed} onChange={(event) => setLowerInput(event.currentTarget.value)} /></label>
          <label>Upper whole number<input type="number" aria-label="Upper whole number" inputMode="numeric" value={upperInput} disabled={neighborsConfirmed} onChange={(event) => setUpperInput(event.currentTarget.value)} /></label>
        </div>
        <button type="button" disabled={neighborsConfirmed} onClick={checkNeighbors}>Check neighboring whole numbers</button>
        <p className="scale-feedback" aria-label="Neighbor feedback" role="status">{neighborFeedback}</p>
      </section>}

      {selected && neighborsConfirmed && !currentRecorded && <section className="scale-task" data-activity-reveal>
        <h4>5 · Record the nearest whole unit</h4>
        <label htmlFor={`scale-rounded-${selected.id}`}>Nearest whole number</label>
        <select id={`scale-rounded-${selected.id}`} aria-label="Nearest whole number" value={roundedChoice} onChange={(event) => setRoundedChoice(event.currentTarget.value)}>
          <option value="">Choose one</option>
          <option value={lower}>{lower} {unitNames[selected.unit]}</option>
          {upper !== lower && <option value={upper}>{upper} {unitNames[selected.unit]}</option>}
        </select>
        <button type="button" disabled={!roundedChoice} onClick={recordRounded}>Record rounded measurement</button>
        <p className="scale-feedback" aria-label="Rounding feedback" role="status">{roundingFeedback}</p>
      </section>}

      <section className="scale-notebook">
        <h4>Field notebook</h4>
        <table aria-label="Field notebook">
          <thead><tr><th scope="col">Object</th><th scope="col">Reading</th><th scope="col">Nearest whole</th></tr></thead>
          <tbody>
            {config.items.filter((item) => records[item.id] !== undefined).map((item) => <tr key={item.id}>
              <th scope="row">{item.label}</th>
              <td>{reading(item.valueTenths)} {unitNames[item.unit]}</td>
              <td>{records[item.id]} {unitNames[item.unit]}</td>
            </tr>)}
            {Object.keys(records).length === 0 && <tr><td colSpan={3}>No measurements recorded yet.</td></tr>}
          </tbody>
        </table>
      </section>

      {allRecorded && <section className="scale-task scale-explanation" data-activity-reveal>
        <h4>6 · Explain your rounding</h4>
        <p>How did the halfway point help with all four scale readings?</p>
        <button type="button" disabled={completed} data-outcome={explanationChoice === 'retry' ? 'retry' : undefined} onClick={() => explain(false)}>Always choose the lower whole number</button>
        <button type="button" disabled={completed} data-outcome={explanationChoice === 'correct' ? 'correct' : undefined} onClick={() => explain(true)}>At or above halfway rounds up; below halfway rounds down</button>
        <p className="scale-feedback" aria-label="Explanation feedback" role="status">{completed ? <><strong>Field kit record complete.</strong> At or above halfway rounds up; below halfway rounds down.</> : explanationFeedback}</p>
      </section>}

      <button type="button" className="scale-reset" onClick={reset}>Start over</button>
    </ActivityWorkbench>
  </section>;
}

export default function ScaleReading({ config, onEvent }: WidgetProps<'scale-reading'>) {
  return <ScaleReadingActivity key={JSON.stringify(config)} config={config} onEvent={onEvent} />;
}
