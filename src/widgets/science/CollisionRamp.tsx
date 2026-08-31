import { useEffect, useState } from 'react';
import { compareExactDecimals, exactDecimalFromNumber, type ExactDecimal } from '../../content/balance-decimals';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Direction = 'left' | 'right' | 'same';
type RampState = { rampAngle: number; speedA: number; speedB: number };

function multiplyExact(left: number, right: number): ExactDecimal | null {
  const leftDecimal = exactDecimalFromNumber(left);
  const rightDecimal = exactDecimalFromNumber(right);
  return leftDecimal && rightDecimal ? { units: leftDecimal.units * rightDecimal.units, scale: leftDecimal.scale + rightDecimal.scale } : null;
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
  if (rightMomentum && leftMomentum) {
    const comparison = compareExactDecimals(rightMomentum, leftMomentum);
    return comparison > 0 ? 'right' : comparison < 0 ? 'left' : 'same';
  }
  const comparison = massA * speedA - massB * speedB;
  return comparison > 0 ? 'right' : comparison < 0 ? 'left' : 'same';
};

const directionText: Record<Direction, string> = { left: 'moves left', right: 'moves right', same: 'has no left/right motion' };
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function CollisionRamp({ config, onEvent }: WidgetProps<'collision-ramp'>) {
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
      <p className="collision-quantities">Cart A push number: {config.massA} × {state.speedA} = {cartAQuantity ? exactText(cartAQuantity) : 'unavailable'}. Cart B push number: {config.massB} × {state.speedB} = {cartBQuantity ? exactText(cartBQuantity) : 'unavailable'}. {stationary ? 'Both carts remain stationary, so no collision occurs.' : 'The larger push number points the stuck carts that way.'}</p>
      <div data-widget-grid="controls" className="collision-controls">
        <button aria-label="Decrease ramp angle" disabled={state.rampAngle <= 0} onClick={() => change({ ...state, rampAngle: clamp(state.rampAngle - 1, 0, 45) }, 'change-angle')}>− angle</button>
        <button aria-label="Increase ramp angle" disabled={state.rampAngle >= 45} onClick={() => change({ ...state, rampAngle: clamp(state.rampAngle + 1, 0, 45) }, 'change-angle')}>+ angle</button>
        <button aria-label="Decrease cart A speed" disabled={state.speedA <= 0} onClick={() => change({ ...state, speedA: clamp(state.speedA - 1, 0, 100) }, 'change-speed')}>Cart A − speed</button>
        <button aria-label="Increase cart A speed" disabled={state.speedA >= 100} onClick={() => change({ ...state, speedA: clamp(state.speedA + 1, 0, 100) }, 'change-speed')}>Cart A + speed</button>
        <button aria-label="Decrease cart B speed" disabled={state.speedB <= 0} onClick={() => change({ ...state, speedB: clamp(state.speedB - 1, 0, 100) }, 'change-speed')}>Cart B − speed</button>
        <button aria-label="Increase cart B speed" disabled={state.speedB >= 100} onClick={() => change({ ...state, speedB: clamp(state.speedB + 1, 0, 100) }, 'change-speed')}>Cart B + speed</button>
      </div>
      {target === 'predict-direction' ? <div className="collision-predictions" aria-label="Prediction choices">
        <h4>After the stuck-cart collision, the model says the carts…</h4>
        <button aria-label="Moves left" onClick={() => finish('left', 'choose-prediction')}>Moves left</button>
        <button aria-label="Moves right" onClick={() => finish('right', 'choose-prediction')}>Moves right</button>
        <button aria-label="Stays the same" onClick={() => finish('same', 'choose-prediction')}>Stays the same</button>
      </div> : <div className="collision-predictions"><button aria-label="Run collision" onClick={() => finish(currentDirection, 'run')}>Run collision model</button><p>Model result: {checked ? stationary ? 'both carts remain stationary; no collision occurs' : directionText[currentDirection] : 'run the model to compare the two push numbers'}.</p></div>}
      <button className="collision-reset" onClick={() => change(initial, 'reset')}>Start over</button>
      <p role="status">{visiblyComplete ? resultFor(currentDirection, state) : status}</p>
    </section>
  );
}
