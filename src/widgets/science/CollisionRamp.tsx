import { useEffect, useState } from 'react';
import { useReducedMotionPref } from '../../app/useReducedMotionPref';
import { compareExactDecimals, exactDecimalFromNumber, exactDecimalToNumber, sumExactDecimals, type ExactDecimal } from '../../content/balance-decimals';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Direction = 'left' | 'right' | 'same';
type RampState = { rampAngle: number; speedA: number; speedB: number };

function multiplyExact(left: number, right: number): ExactDecimal {
  const leftDecimal = exactDecimalFromNumber(left);
  const rightDecimal = exactDecimalFromNumber(right);
  if (!leftDecimal || !rightDecimal) {
    throw new RangeError('Collision ramp values must use the shared exact-decimal policy of at most 12 decimal places.');
  }
  return { units: leftDecimal.units * rightDecimal.units, scale: leftDecimal.scale + rightDecimal.scale };
}

function exactText(value: ExactDecimal) {
  const negative = value.units < 0n;
  const digits = (negative ? -value.units : value.units).toString().padStart(value.scale + 1, '0');
  const decimal = value.scale === 0 ? digits : `${digits.slice(0, -value.scale)}.${digits.slice(-value.scale)}`;
  return negative ? `-${decimal}` : decimal;
}

export const stuckCartDirection = (massA: number, speedA: number, massB: number, speedB: number): Direction => {
  const rightMomentum = multiplyExact(massA, speedA);
  const leftMomentum = multiplyExact(massB, speedB);
  const comparison = compareExactDecimals(rightMomentum, leftMomentum);
  return comparison > 0 ? 'right' : comparison < 0 ? 'left' : 'same';
};

const directionText: Record<Direction, string> = { left: 'moves left', right: 'moves right', same: 'has no left/right motion' };
const modelDirectionText: Record<Direction, string> = { left: 'moves left', right: 'moves right', same: 'stays in the same place' };

function stepExact(value: number, amount: -1 | 1, min: number, max: number) {
  const decimal = exactDecimalFromNumber(value);
  const minimum = exactDecimalFromNumber(min);
  const maximum = exactDecimalFromNumber(max);
  if (!decimal || !minimum || !maximum) {
    throw new RangeError('Collision ramp controls require exact-decimal values.');
  }
  const next = sumExactDecimals([decimal, { units: BigInt(amount), scale: 0 }]);
  if (compareExactDecimals(next, minimum) < 0) return min;
  if (compareExactDecimals(next, maximum) > 0) return max;
  return exactDecimalToNumber(next);
}

type ComparisonConfig = {
  rampAngle?: number;
  massA: number;
  massB: number;
  speedA?: number;
  speedB?: number;
  controlledVariable: 'speed-a' | 'speed-b';
  comparisonRuns: 2;
  taskPrompt?: string;
};

type ComparisonPhase = 'setup' | 'predicted' | 'running' | 'observed' | 'compared';
type ComparisonRun = {
  id: 1 | 2;
  inputs: RampState;
  prediction: Direction;
  outcome: Direction;
};

function CollisionComparison({ config, onEvent }: { config: ComparisonConfig; onEvent: WidgetProps<'collision-ramp'>['onEvent'] }) {
  const key = JSON.stringify(config);
  const initial: RampState = { rampAngle: config.rampAngle ?? 0, speedA: config.speedA ?? 0, speedB: config.speedB ?? 0 };
  const reduced = useReducedMotionPref();
  const [inputs, setInputs] = useState<RampState>(initial);
  const [phase, setPhase] = useState<ComparisonPhase>('setup');
  const [prediction, setPrediction] = useState<Direction | null>(null);
  const [runs, setRuns] = useState<ComparisonRun[]>([]);
  const [pendingRun, setPendingRun] = useState<ComparisonRun | null>(null);
  const [comparisonChoice, setComparisonChoice] = useState<'run-1-more' | 'same' | 'run-2-more' | null>(null);
  const [status, setStatus] = useState('Choose a prediction for Run 1 before you run the model.');
  const { completeOnce } = useCompletionLatch(key);
  const currentDirection = stuckCartDirection(config.massA, inputs.speedA, config.massB, inputs.speedB);
  const runNumber = (runs.length + 1) as 1 | 2;
  const controlledLabel = config.controlledVariable === 'speed-a' ? 'Cart A speed' : 'Cart B speed';
  const nonControlledLabel = config.controlledVariable === 'speed-a' ? 'Cart B speed' : 'Cart A speed';
  const nonControlledValue = config.controlledVariable === 'speed-a' ? inputs.speedB : inputs.speedA;
  const controlledValue = (value: RampState) => config.controlledVariable === 'speed-a' ? value.speedA : value.speedB;

  useEffect(() => {
    setInputs(initial);
    setPhase('setup');
    setPrediction(null);
    setRuns([]);
    setPendingRun(null);
    setComparisonChoice(null);
    setStatus('Choose a prediction for Run 1 before you run the model.');
  }, [key]);

  useEffect(() => {
    if (phase !== 'running' || pendingRun === null || reduced) return;
    const timer = window.setTimeout(() => {
      setRuns((previous) => [...previous, pendingRun]);
      setPendingRun(null);
      setPhase('observed');
      if (pendingRun.prediction !== pendingRun.outcome) {
        onEvent({ type: 'coach', cue: 'retry' });
        setStatus(`Run ${pendingRun.id} observed: the model ${modelDirectionText[pendingRun.outcome]}. Compare the visible before-and-after motion and revise your prediction next time.`);
      } else if (pendingRun.id === 1) {
        onEvent({ type: 'coach', cue: 'milestone' });
        setStatus(`Run 1 observed. Change only ${controlledLabel}, then predict and run Run 2.`);
      } else {
        setStatus('Run 2 observed. Choose a comparison statement before you finish.');
      }
    }, 320);
    return () => window.clearTimeout(timer);
  }, [onEvent, pendingRun, phase, reduced]);

  const settleReducedRun = (run: ComparisonRun) => {
    setRuns((previous) => [...previous, run]);
    setPendingRun(null);
    setPhase('observed');
    if (run.prediction !== run.outcome) {
      onEvent({ type: 'coach', cue: 'retry' });
      setStatus(`Run ${run.id} observed: the model ${modelDirectionText[run.outcome]}. Compare the visible before-and-after motion and revise your prediction next time.`);
    } else if (run.id === 1) {
      onEvent({ type: 'coach', cue: 'milestone' });
      setStatus(`Run 1 observed. Change only ${controlledLabel}, then predict and run Run 2.`);
    } else {
      setStatus('Run 2 observed. Choose a comparison statement before you finish.');
    }
  };

  const changeControlledSpeed = (amount: -1 | 1) => {
    if (phase === 'running' || runs.length >= 2) return;
    const nextValue = stepExact(controlledValue(inputs), amount, 0, 100);
    const next = config.controlledVariable === 'speed-a' ? { ...inputs, speedA: nextValue } : { ...inputs, speedB: nextValue };
    setInputs(next);
    setPrediction(null);
    setComparisonChoice(null);
    setPhase('setup');
    setStatus(`Run ${runNumber}: inputs changed. Make a prediction before running the model.`);
    onEvent({ type: 'interaction', action: 'change-speed' });
    onEvent({ type: 'change', value: next });
  };

  const choosePrediction = (next: Direction) => {
    if (phase === 'running' || runs.length >= 2) return;
    setPrediction(next);
    setPhase('predicted');
    setStatus(`Prediction saved for Run ${runNumber}: the joined carts ${modelDirectionText[next]}. Now run the model.`);
    onEvent({ type: 'interaction', action: 'choose-prediction' });
    onEvent({ type: 'change', value: inputs });
  };

  const runModel = () => {
    if (prediction === null || phase !== 'predicted') return;
    const run: ComparisonRun = { id: runNumber, inputs, prediction, outcome: currentDirection };
    setPendingRun(run);
    setPhase('running');
    setStatus(`Run ${run.id} is moving. Watch the model settle, then compare the before-and-after motion.`);
    onEvent({ type: 'interaction', action: 'run' });
    onEvent({ type: 'change', value: inputs });
    if (reduced) settleReducedRun(run);
  };

  const comparisonCorrect = () => {
    const first = runs[0];
    const second = runs[1];
    if (!first || !second) return null;
    const firstValue = controlledValue(first.inputs);
    const secondValue = controlledValue(second.inputs);
    return firstValue === secondValue ? 'same' : firstValue > secondValue ? 'run-1-more' : 'run-2-more';
  };

  const compareRuns = () => {
    if (comparisonChoice === null || runs.length !== 2 || phase !== 'observed') return;
    onEvent({ type: 'interaction', action: 'choose-prediction' });
    onEvent({ type: 'change', value: inputs });
    if (comparisonChoice !== comparisonCorrect()) {
      onEvent({ type: 'coach', cue: 'retry' });
      setStatus(`That comparison does not match the two visible ${controlledLabel} values. Revise your comparison after reading the run cards.`);
      return;
    }
    setPhase('compared');
    setStatus('Compared! You changed one condition, observed both modeled outcomes, and connected the evidence to the fair-test idea.');
    const last = runs[1]!;
    completeOnce(() => onEvent({ type: 'complete', value: { prediction: last.outcome, correct: true } }));
  };

  const reset = () => {
    setInputs(initial);
    setPhase('setup');
    setPrediction(null);
    setRuns([]);
    setPendingRun(null);
    setComparisonChoice(null);
    setStatus('Choose a prediction for Run 1 before you run the model.');
    onEvent({ type: 'interaction', action: 'reset' });
    onEvent({ type: 'change', value: initial });
  };

  const displayRuns = pendingRun === null ? runs : [...runs, pendingRun];
  const lockedNote = `Cart A mass ${config.massA}, Cart B mass ${config.massB}, ramp angle ${config.rampAngle ?? 0}°, and ${nonControlledLabel} ${nonControlledValue ?? 0} are locked so this is a fair comparison.`;
  const trackDirection = pendingRun?.outcome ?? (phase === 'observed' || phase === 'compared' ? runs[runs.length - 1]?.outcome : undefined) ?? 'setup';
  return (
    <section className="card widget-experiment collision collision-comparison" data-testid="widget-collision-ramp" data-state={phase === 'compared' ? 'complete' : 'testing'} data-complete={phase === 'compared' ? 'yes' : 'no'} data-phase={phase} data-motion={reduced ? 'off' : 'on'} aria-description="A simplified fair-test collision model, not physical evidence from real carts.">
      <header>
        <h3>Fair collision comparison model</h3>
        <p>This animation is a simplified model of a prediction, not physical evidence. It shows before-and-after motion so you can compare two fair runs.</p>
      </header>
      <p className="collision-task"><strong>Goal:</strong> {config.taskPrompt ?? `Change only ${controlledLabel} and compare two modeled runs.`}</p>
      <p className="collision-locked" aria-label={lockedNote}>{lockedNote}</p>
      <div className="collision-track-viewport" data-testid="collision-comparison-track-viewport">
        <div className="collision-model comparison-track" data-testid="collision-comparison-track" data-phase={phase} data-motion-direction={trackDirection} aria-label="Two-cart collision model track">
          <div className={`collision-cart collision-cart-a collision-position-${trackDirection}`} role="img" aria-label={`Cart A: mass ${config.massA}, speed ${inputs.speedA ?? 0}.`}><span>Cart A</span><strong>{config.massA} mass</strong><b>{inputs.speedA ?? 0} speed →</b></div>
          <div className="collision-point" aria-label="Collision point">×<span>latch point</span></div>
          <div className={`collision-cart collision-cart-b collision-position-${trackDirection}`} role="img" aria-label={`Cart B: mass ${config.massB}, speed ${inputs.speedB ?? 0}.`}><span>Cart B</span><strong>{config.massB} mass</strong><b>← {inputs.speedB ?? 0} speed</b></div>
        </div>
      </div>
      <p className="collision-quantities">Modeled push numbers: Cart A {config.massA} × {inputs.speedA ?? 0} = {exactText(multiplyExact(config.massA, inputs.speedA ?? 0))}; Cart B {config.massB} × {inputs.speedB ?? 0} = {exactText(multiplyExact(config.massB, inputs.speedB ?? 0))}. These numbers are part of this lesson model.</p>
      <div className="collision-comparison-controls" data-widget-grid="controls">
        <button aria-label={`Decrease ${controlledLabel}`} disabled={phase === 'running' || runs.length >= 2 || controlledValue(inputs) <= 0} onClick={() => changeControlledSpeed(-1)}>− {controlledLabel}</button>
        <button aria-label={`Increase ${controlledLabel}`} disabled={phase === 'running' || runs.length >= 2 || controlledValue(inputs) >= 100} onClick={() => changeControlledSpeed(1)}>+ {controlledLabel}</button>
        <button className="collision-lock-help" aria-label="Why are the other conditions locked?" onClick={() => { onEvent({ type: 'coach', cue: 'strategy' }); setStatus('A fair test changes one condition at a time. Keep the masses, ramp angle, and the other speed fixed.'); }}>Why are the other conditions locked?</button>
      </div>
      <div className="collision-predictions" aria-label={`Prediction choices for Run ${runNumber}`}>
        <h4>{phase === 'running' ? 'The model is running…' : `Before Run ${runNumber}, predict how the joined carts will move.`}</h4>
        <button aria-label="Moves left" aria-pressed={prediction === 'left'} disabled={phase === 'running' || runs.length >= 2} onClick={() => choosePrediction('left')}>Moves left</button>
        <button aria-label="Moves right" aria-pressed={prediction === 'right'} disabled={phase === 'running' || runs.length >= 2} onClick={() => choosePrediction('right')}>Moves right</button>
        <button aria-label="Stays the same" aria-pressed={prediction === 'same'} disabled={phase === 'running' || runs.length >= 2} onClick={() => choosePrediction('same')}>Stays the same</button>
        <button aria-label="Run collision model" disabled={prediction === null || phase !== 'predicted'} onClick={runModel}>Run collision model</button>
      </div>
      {displayRuns.length > 0 && <div className="collision-run-records" aria-label="Retained before-and-after modeled runs">
        <h4>Retained model runs</h4>
        <div className="collision-run-grid">
          {displayRuns.map((run) => <article key={run.id} className="collision-run-card" data-testid={`collision-run-${run.id}`} data-run-phase={pendingRun?.id === run.id ? 'running' : 'observed'}>
            <h5>Run {run.id} {pendingRun?.id === run.id ? 'running' : 'observed'}</h5>
            <p><strong>Before:</strong> Cart A {run.inputs.speedA ?? 0} speed; Cart B {run.inputs.speedB ?? 0} speed.</p>
            <p><strong>Prediction:</strong> joined carts {modelDirectionText[run.prediction]}.</p>
            <div className={`collision-before-after collision-after-${run.outcome}`} data-testid={`collision-run-${run.id}-after`} data-direction={run.outcome}>
                <span>After model: {modelDirectionText[run.outcome]}.</span>
            </div>
          </article>)}
        </div>
      </div>}
      {runs.length === 2 && phase === 'observed' && <fieldset className="collision-compare-choices" aria-label="Compare the two modeled runs">
        <legend>What changed between the two runs?</legend>
        <button type="button" aria-label={`Run 1 had more ${controlledLabel}`} aria-pressed={comparisonChoice === 'run-1-more'} onClick={() => setComparisonChoice('run-1-more')}>Run 1 had more {controlledLabel}</button>
        <button type="button" aria-label={`Both runs used the same ${controlledLabel}`} aria-pressed={comparisonChoice === 'same'} onClick={() => setComparisonChoice('same')}>Both runs used the same {controlledLabel}</button>
        <button type="button" aria-label={`Run 2 had more ${controlledLabel}`} aria-pressed={comparisonChoice === 'run-2-more'} onClick={() => setComparisonChoice('run-2-more')}>Run 2 had more {controlledLabel}</button>
        <button type="button" aria-label="Compare runs" disabled={comparisonChoice === null} onClick={compareRuns}>Compare runs</button>
        <p className="collision-comparison-hint">Read both run cards and compare the two visible {controlledLabel} values.</p>
      </fieldset>}
      <button className="collision-reset" onClick={reset}>Start over</button>
      <p role="status">{status}</p>
    </section>
  );
}

export default function CollisionRamp({ config, onEvent }: WidgetProps<'collision-ramp'>) {
  if (config.controlledVariable !== undefined && config.comparisonRuns === 2) {
    return <CollisionComparison config={config as ComparisonConfig} onEvent={onEvent} />;
  }
  const key = JSON.stringify(config);
  const initial: RampState = { rampAngle: config.rampAngle ?? 0, speedA: config.speedA ?? 0, speedB: config.speedB ?? 0 };
  const [state, setState] = useState<RampState>(initial);
  const [checked, setChecked] = useState<{ state: RampState; correct: boolean } | null>(null);
  const [status, setStatus] = useState('Use the simplified stuck-cart lesson model and make a prediction.');
  const { completeOnce } = useCompletionLatch(key);
  const target = config.target ?? 'predict-direction';
  const currentDirection = stuckCartDirection(config.massA, state.speedA, config.massB, state.speedB);
  const stationary = state.speedA === 0 && state.speedB === 0;
  const promptFor = (next: RampState) => next.speedA === 0 && next.speedB === 0
    ? 'Both carts are stationary, so no collision occurs. You can still make a prediction with the lesson model.'
    : 'Use the simplified stuck-cart lesson model and make a prediction.';
  const resultFor = (direction: Direction, next: RampState) => next.speedA === 0 && next.speedB === 0
    ? 'Both carts remain stationary; no collision occurs in this lesson model.'
    : direction === 'same'
      ? 'Same is correct: the opposing model quantities are equal, so there is no left/right motion after a modeled stuck-cart collision.'
      : `${direction} is correct for this lesson model.`;
  const visiblyComplete = checked?.correct === true
    && checked.state.rampAngle === state.rampAngle
    && checked.state.speedA === state.speedA
    && checked.state.speedB === state.speedB;

  useEffect(() => {
    setState(initial);
    setChecked(null);
    setStatus(promptFor(initial));
  }, [key]);

  const change = (next: RampState, action: 'change-angle' | 'change-speed' | 'reset') => {
    setState(next);
    setChecked(null);
    setStatus(action === 'reset' || (next.speedA === 0 && next.speedB === 0) ? promptFor(next) : 'Inputs changed; make a prediction with the lesson model.');
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: next });
  };

  const finish = (prediction: Direction, action: 'run' | 'choose-prediction') => {
    const correct = prediction === currentDirection;
    setChecked({ state, correct });
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: state });
    setStatus(correct ? resultFor(prediction, state) : `This lesson model gives ${currentDirection}; revise your prediction.`);
    if (correct) completeOnce(() => onEvent({ type: 'complete', value: { prediction, correct: true } }));
  };

  const cartAQuantity = multiplyExact(config.massA, state.speedA);
  const cartBQuantity = multiplyExact(config.massB, state.speedB);

  return (
    <section
      className="card widget-experiment collision"
      data-testid="widget-collision-ramp"
      data-state={visiblyComplete ? 'complete' : 'testing'}
      data-complete={visiblyComplete ? 'yes' : 'no'}
      aria-description="Simplified stuck-cart prediction model; ramp angle is setup-only and does not change the result."
    >
      <header><h3>Collision ramp model</h3><p>This is a simplified prediction model, not physical evidence or full physics. The ramp angle is setup-only.</p></header>
      <p className="collision-angle">Ramp setup angle: {state.rampAngle}°. Setup-only: changing it does not change this model result.</p>
      <div className="collision-track-viewport" data-testid="collision-track-viewport"><div className="collision-model" aria-label="Two-cart collision track">
        <div className="collision-ramp-line" style={{ transform: `rotate(${-state.rampAngle / 8}deg)` }} aria-hidden="true" />
        <div className="collision-cart collision-cart-a" role="img" aria-label={state.speedA === 0 ? `Cart A: mass ${config.massA}, speed 0, stationary.` : `Cart A: mass ${config.massA}, speed ${state.speedA}, moving right toward the collision point.`}>
          <span>Cart A</span><strong>{config.massA} mass</strong><b>{state.speedA === 0 ? 'stationary' : `→ ${state.speedA} speed`}</b>
        </div>
        <div className="collision-point" aria-label="Collision point">×<span>collision point</span></div>
        <div className="collision-cart collision-cart-b" role="img" aria-label={state.speedB === 0 ? `Cart B: mass ${config.massB}, speed 0, stationary.` : `Cart B: mass ${config.massB}, speed ${state.speedB}, moving left toward the collision point.`}>
          <span>Cart B</span><strong>{config.massB} mass</strong><b>{state.speedB === 0 ? 'stationary' : `${state.speedB} speed ←`}</b>
        </div>
      </div></div>
      <p className="collision-quantities">Cart A push number: {config.massA} × {state.speedA} = {exactText(cartAQuantity)}. Cart B push number: {config.massB} × {state.speedB} = {exactText(cartBQuantity)}. {stationary ? 'Both carts remain stationary, so no collision occurs.' : 'The larger push number points the stuck carts that way.'}</p>
      <div data-widget-grid="controls" className="collision-controls">
        <button aria-label="Decrease ramp angle" disabled={state.rampAngle <= 0} onClick={() => change({ ...state, rampAngle: stepExact(state.rampAngle, -1, 0, 45) }, 'change-angle')}>− angle</button>
        <button aria-label="Increase ramp angle" disabled={state.rampAngle >= 45} onClick={() => change({ ...state, rampAngle: stepExact(state.rampAngle, 1, 0, 45) }, 'change-angle')}>+ angle</button>
        <button aria-label="Decrease cart A speed" disabled={state.speedA <= 0} onClick={() => change({ ...state, speedA: stepExact(state.speedA, -1, 0, 100) }, 'change-speed')}>Cart A − speed</button>
        <button aria-label="Increase cart A speed" disabled={state.speedA >= 100} onClick={() => change({ ...state, speedA: stepExact(state.speedA, 1, 0, 100) }, 'change-speed')}>Cart A + speed</button>
        <button aria-label="Decrease cart B speed" disabled={state.speedB <= 0} onClick={() => change({ ...state, speedB: stepExact(state.speedB, -1, 0, 100) }, 'change-speed')}>Cart B − speed</button>
        <button aria-label="Increase cart B speed" disabled={state.speedB >= 100} onClick={() => change({ ...state, speedB: stepExact(state.speedB, 1, 0, 100) }, 'change-speed')}>Cart B + speed</button>
      </div>
      {target === 'predict-direction' ? <div className="collision-predictions" aria-label="Prediction choices">
        <h4>{stationary ? 'Both carts are stationary, so no collision occurs. Choose the matching model result.' : 'After the modeled stuck-cart collision, the model says the carts…'}</h4>
        <button aria-label="Moves left" onClick={() => finish('left', 'choose-prediction')}>Moves left</button>
        <button aria-label="Moves right" onClick={() => finish('right', 'choose-prediction')}>Moves right</button>
        <button aria-label="Stays the same" onClick={() => finish('same', 'choose-prediction')}>Stays the same</button>
      </div> : <div className="collision-predictions"><button aria-label="Run collision" onClick={() => finish(currentDirection, 'run')}>Run collision model</button><p>Model result: {checked ? stationary ? 'both carts remain stationary; no collision occurs' : directionText[currentDirection] : 'run the model to compare the two push numbers'}.</p></div>}
      <button className="collision-reset" onClick={() => change(initial, 'reset')}>Start over</button>
      <p role="status">{visiblyComplete ? resultFor(currentDirection, state) : status}</p>
    </section>
  );
}
