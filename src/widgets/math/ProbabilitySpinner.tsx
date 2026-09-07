import { ActivityWorkbench } from '../ActivityWorkbench';
import './guide-led-math.css';
import { useEffect, useState, type CSSProperties } from 'react';
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

export function weightedGeometry(segments: Array<{ id: string; weight?: number }>, selectedId: string | null) {
  const total = segments.reduce((sum, segment) => sum + (segment.weight ?? 1), 0);
  let startAngle = -90;
  const slices = segments.map((segment) => {
    const endAngle = startAngle + ((segment.weight ?? 1) / total) * 360;
    const slice = { id: segment.id, startAngle, endAngle, midpoint: (startAngle + endAngle) / 2 };
    startAngle = endAngle;
    return slice;
  });
  const selectedMidpoint = slices.find((slice) => slice.id === selectedId)?.midpoint;
  const finalRotation = selectedMidpoint === undefined ? 0 : ((-90 - selectedMidpoint) % 360 + 360) % 360;
  return { slices, selectedMidpoint, finalRotation };
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
  const [prediction, setPrediction] = useState<string | null>(null);
  const [classification, setClassification] = useState<'certain' | 'possible' | 'impossible' | null>(null);
  const { completeOnce } = useCompletionLatch(key);
  const coached = Boolean(config.eventQuestion);
  const completed = coached ? classification === config.eventQuestion?.classification && spins >= (config.trials ?? 1) : spins >= (config.trials ?? 1) && (!config.targetOutcomeId || counts[config.targetOutcomeId] > 0);
  const totalWeight = config.segments.reduce((sum, segment) => sum + segmentWeight(segment), 0);
  const trials = config.trials ?? 1;
  const geometry = weightedGeometry(config.segments, outcome);
  const displayedRotation = reduced ? geometry.finalRotation : geometry.finalRotation + (outcome ? 720 : 0);
  const rotationStyle = {
    transform: `rotate(${displayedRotation}deg)`,
    '--spinner-from-rotation': `${geometry.finalRotation}deg`,
    '--spinner-to-rotation': `${displayedRotation}deg`,
  } as CSSProperties;

  useEffect(() => {
    setCounts(emptyCounts(config.segments));
    setOutcome(null);
    setSpins(0);
    setPrediction(null);
    setClassification(null);
  }, [key]);

  const run = () => {
    if (coached && prediction === null) return;
    if (spins >= trials || completed) return;
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
    if (!coached && nextSpins >= trials && targetSeen) {
      completeOnce(() => onEvent({ type: 'complete', value }));
    }
    if (coached && nextSpins === 1) onEvent({ type: 'coach', cue: 'milestone' });
  };

  const classify = (nextClassification: 'certain' | 'possible' | 'impossible') => {
    if (!config.eventQuestion || spins < trials || !outcome) return;
    setClassification(nextClassification);
    if (nextClassification === config.eventQuestion.classification) {
      completeOnce(() => onEvent({ type: 'complete', value: { outcomeId: outcome, counts } }));
    } else {
      onEvent({ type: 'coach', cue: 'retry' });
    }
  };

  const reset = () => {
    const nextCounts = emptyCounts(config.segments);
    setCounts(nextCounts);
    setOutcome(null);
    setSpins(0);
    setPrediction(null);
    setClassification(null);
    onEvent({ type: 'interaction', action: 'reset' });
    onEvent({ type: 'change', value: { outcomeId: null, counts: nextCounts } });
  };

  const outcomeLabel = config.segments.find((segment) => segment.id === outcome)?.label;
  const eventLabel = config.eventQuestion?.eventLabel;
  const eventOutcomeLabel = eventLabel === 'all'
    ? 'any listed outcome'
    : eventLabel === 'none'
      ? 'an outcome not in the sample space'
      : config.segments.find((segment) => segment.id === eventLabel)?.label ?? eventLabel;
  const classificationWrong = Boolean(config.eventQuestion && classification && classification !== config.eventQuestion.classification);
  const wheelLabel = `Spinner model: ${config.segments.map((segment) => `${segment.label} has ${segmentWeight(segment)} of ${totalWeight} equal part${totalWeight === 1 ? '' : 's'}`).join('; ')}.`;
  return (
    <section
      className="card widget-experiment spinner activity-shell math-activity"
      data-testid="widget-probability-spinner"
      data-motion={reduced ? 'off' : 'on'}
      data-state={completed ? 'complete' : 'ready'}
      data-complete={completed ? 'yes' : 'no'}
    >
<ActivityWorkbench label="Predict and spin" revealKey={spins >= trials ? "classify" : prediction ? "spin" : "predict"} visual={<><h3>Weighted probability spinner</h3>
{config.taskPrompt && <p className="spinner-task"><strong>Goal:</strong> {config.taskPrompt}</p>}

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
          <g
            className="spinner-rotating-group"
            data-testid="spinner-rotating-group"
            data-final-rotation={geometry.finalRotation}
            style={rotationStyle}
          >
          {config.segments.map((segment, index) => {
            const slice = geometry.slices[index]!;
            const path = slicePath(slice.startAngle, slice.endAngle);
            const patterns = ['spinner-stripes', 'spinner-dots', 'spinner-checks', 'spinner-lines'];
            return <path data-testid="spinner-segment" d={path} fill={`url(#${patterns[index % patterns.length]})`} key={segment.id} />;
          })}
          <circle className="spinner-rim" cx="50" cy="50" r="43" />
          </g>
          <path data-testid="spinner-pointer" className="spinner-pointer" d="M 50 1 L 45 12 H 55 Z" />
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
<table className="spinner-frequency" aria-label="Cumulative spin frequencies">
        <caption>Cumulative frequency table</caption>
        <thead><tr><th scope="col">Outcome</th><th scope="col">Times selected</th></tr></thead>
        <tbody>
          {config.segments.map((segment) => (
            <tr key={segment.id}><th scope="row">{segment.label}</th><td>{counts[segment.id]}</td></tr>
          ))}
        </tbody>
      </table></>}>
<p className="spinner-explanation">This model uses a random number for each spin. Larger areas are more likely over many spins, but one spin does not prove what a future spin will be.</p>
{coached && (
        <div className="spinner-probability-setup" data-testid="spinner-probability-setup">
          <section className="spinner-prediction" aria-labelledby="spinner-prediction-title">
            <h4 id="spinner-prediction-title">1. Make a prediction</h4>
            <p>Which outcome do you predict might appear? Your prediction is a starting idea, not a score.</p>
            <div className="spinner-prediction-choices">
              {config.segments.map((segment) => (
                <button key={segment.id} type="button" aria-pressed={prediction === segment.id} disabled={spins > 0} onClick={() => { if (prediction === segment.id) return; setPrediction(segment.id); onEvent({ type: 'coach', cue: 'strategy' }); }}>
                  Predict {segment.label}
                </button>
              ))}
            </div>
            <p className="spinner-decision-summary">{prediction ? `Prediction: ${config.segments.find((segment) => segment.id === prediction)?.label}.` : 'Prediction needed before the first spin.'}</p>
          </section>
          <section className="spinner-sample-space" data-testid="spinner-sample-space" aria-labelledby="spinner-sample-space-title">
            <h4 id="spinner-sample-space-title">Sample space</h4>
            <p>{config.segments.map((segment) => segment.label).join(', ')}</p>
            {config.eventQuestion && <p>Event to classify: land on {eventOutcomeLabel}.</p>}
          </section>
        </div>
      )}
<p className="spinner-progress">Completed {spins} of {trials} trial{trials === 1 ? '' : 's'}; {Math.max(0, trials - spins)} remaining.</p>
{config.targetOutcomeId && !coached && <p className="spinner-target">Completion also needs: {config.segments.find((segment) => segment.id === config.targetOutcomeId)?.label}.</p>}
<div className="spinner-controls" data-activity-reveal={prediction && spins < trials ? "" : undefined}>
        <button aria-label="Spin" disabled={(coached && prediction === null) || spins >= trials || completed} onClick={run}>Spin</button>
        <button onClick={reset}>Start over</button>
      </div>
{coached && (
        <> <section className="math-task" aria-label="Prediction comparison"><h4>Compare the prediction with the record</h4><p>{spins > 0 ? `Your prediction was ${config.segments.find(segment => segment.id === prediction)?.label}. It appeared ${prediction ? counts[prediction] : 0} times in ${spins} spins. A short record does not promise the next result.` : 'Your first prediction will stay here while you collect results.'}</p></section>
        <section className="spinner-classification" data-activity-reveal={spins >= trials ? "" : undefined} aria-labelledby="spinner-classification-title">
          <h4 id="spinner-classification-title">3. Classify the event from the sample space</h4>
          <div className="spinner-classification-choices">
            {(['certain', 'possible', 'impossible'] as const).map((choice) => (
              <button key={choice} type="button" aria-pressed={classification === choice} data-outcome={classification === choice ? classificationWrong ? 'retry' : 'correct' : undefined} disabled={spins < trials || completed} onClick={() => classify(choice)}>
                {choice[0]!.toUpperCase() + choice.slice(1)}{classification === choice && <strong>{classificationWrong ? ' · Try again' : ' · Correct'}</strong>}
              </button>
            ))}
          </div>
          <p className="spinner-decision-summary" aria-label="Classification feedback">{classification ? classificationWrong ? `Try again. Your choice was ${classification}. Check which outcomes the wheel allows.` : `Correct: ${classification}. Use the wheel’s possible outcomes, not only this short record.` : spins >= trials ? 'Choose one classification.' : `Complete all ${trials} trials first.`}</p>
        </section></>
      )}
<p role="status">
        {classificationWrong ? 'Try classifying the event from the sample space.' : coached && spins >= trials && !classification ? 'Classify the event from the sample space.' : outcomeLabel ? `Spinner selected ${outcomeLabel}.` : coached && prediction === null ? 'Make a prediction before the first spin.' : 'Press Spin to choose a model-generated random outcome.'}
      </p>
</ActivityWorkbench>
</section>
  );
}
