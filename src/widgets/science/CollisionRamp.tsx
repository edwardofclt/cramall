import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Direction = 'left' | 'right' | 'same';
type RampState = { rampAngle: number; speedA: number; speedB: number };

export const stuckCartDirection = (massA: number, speedA: number, massB: number, speedB: number): Direction => {
  const rightMomentum = massA * speedA;
  const leftMomentum = massB * speedB;
  return rightMomentum > leftMomentum ? 'right' : rightMomentum < leftMomentum ? 'left' : 'same';
};

const directionText: Record<Direction, string> = { left: 'moves left', right: 'moves right', same: 'stays the same' };

export default function CollisionRamp({ config, onEvent }: WidgetProps<'collision-ramp'>) {
  const key = JSON.stringify(config);
  const initial: RampState = { rampAngle: config.rampAngle ?? 0, speedA: config.speedA ?? 0, speedB: config.speedB ?? 0 };
  const prompt = 'Use the simplified stuck-cart lesson model and make a prediction.';
  const [state, setState] = useState<RampState>(initial);
  const [checked, setChecked] = useState<{ state: RampState; correct: boolean } | null>(null);
  const [status, setStatus] = useState(prompt);
  const { completeOnce } = useCompletionLatch(key);
  const target = config.target ?? 'predict-direction';
  const currentDirection = stuckCartDirection(config.massA, state.speedA, config.massB, state.speedB);
  const visiblyComplete = checked?.correct === true
    && checked.state.rampAngle === state.rampAngle
    && checked.state.speedA === state.speedA
    && checked.state.speedB === state.speedB;

  useEffect(() => {
    setState(initial);
    setChecked(null);
    setStatus(prompt);
  }, [key]);

  const change = (next: RampState, action: 'change-angle' | 'change-speed' | 'reset') => {
    setState(next);
    setChecked(null);
    setStatus(action === 'reset' ? prompt : 'Inputs changed; make a prediction with the lesson model.');
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: next });
  };

  const finish = (prediction: Direction, action: 'run' | 'choose-prediction') => {
    const correct = prediction === currentDirection;
    setChecked({ state, correct });
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: state });
    setStatus(correct
      ? `${prediction} is correct for this lesson model.`
      : `This lesson model gives ${currentDirection}; revise your prediction.`);
    if (correct) completeOnce(() => onEvent({ type: 'complete', value: { prediction, correct: true } }));
  };

  const cartAQuantity = config.massA * state.speedA;
  const cartBQuantity = config.massB * state.speedB;

  return (
    <section
      className="card widget-experiment collision"
      data-testid="widget-collision-ramp"
      data-state={visiblyComplete ? 'complete' : 'testing'}
      data-complete={visiblyComplete ? 'yes' : 'no'}
      aria-description="Simplified stuck-cart prediction model; ramp angle is setup-only and does not change the result."
    >
      <header><h3>Collision ramp model</h3><p>This is a simplified prediction model, not physical evidence or full physics. The ramp angle is setup-only.</p></header>
      <div className="collision-model" aria-label="Two-cart collision track">
        <div className="collision-ramp-line" style={{ transform: `rotate(${-state.rampAngle / 8}deg)` }} aria-hidden="true" />
        <div className="collision-cart collision-cart-a" role="img" aria-label={`Cart A: mass ${config.massA}, speed ${state.speedA}, moving right toward the collision point.`}>
          <span>Cart A</span><strong>{config.massA} mass</strong><b>→ {state.speedA} speed</b>
        </div>
        <div className="collision-point" aria-label="Collision point">×<span>collision point</span></div>
        <div className="collision-cart collision-cart-b" role="img" aria-label={`Cart B: mass ${config.massB}, speed ${state.speedB}, moving left toward the collision point.`}>
          <span>Cart B</span><strong>{config.massB} mass</strong><b>{state.speedB} speed ←</b>
        </div>
      </div>
      <p className="collision-quantities">Cart A push number: {config.massA} × {state.speedA} = {cartAQuantity}. Cart B push number: {config.massB} × {state.speedB} = {cartBQuantity}. The larger push number points the stuck carts that way.</p>
      <div data-widget-grid="controls" className="collision-controls">
        <button aria-label="Decrease ramp angle" disabled={state.rampAngle === 0} onClick={() => change({ ...state, rampAngle: state.rampAngle - 1 }, 'change-angle')}>− angle</button>
        <button aria-label="Increase ramp angle" disabled={state.rampAngle === 45} onClick={() => change({ ...state, rampAngle: state.rampAngle + 1 }, 'change-angle')}>+ angle</button>
        <button aria-label="Decrease cart A speed" disabled={state.speedA === 0} onClick={() => change({ ...state, speedA: state.speedA - 1 }, 'change-speed')}>Cart A − speed</button>
        <button aria-label="Increase cart A speed" disabled={state.speedA === 100} onClick={() => change({ ...state, speedA: state.speedA + 1 }, 'change-speed')}>Cart A + speed</button>
        <button aria-label="Decrease cart B speed" disabled={state.speedB === 0} onClick={() => change({ ...state, speedB: state.speedB - 1 }, 'change-speed')}>Cart B − speed</button>
        <button aria-label="Increase cart B speed" disabled={state.speedB === 100} onClick={() => change({ ...state, speedB: state.speedB + 1 }, 'change-speed')}>Cart B + speed</button>
      </div>
      {target === 'predict-direction' ? <div className="collision-predictions" aria-label="Prediction choices">
        <h4>After the stuck-cart collision, the model says the carts…</h4>
        <button aria-label="Moves left" onClick={() => finish('left', 'choose-prediction')}>Moves left</button>
        <button aria-label="Moves right" onClick={() => finish('right', 'choose-prediction')}>Moves right</button>
        <button aria-label="Stays the same" onClick={() => finish('same', 'choose-prediction')}>Stays the same</button>
      </div> : <div className="collision-predictions"><button aria-label="Run collision" onClick={() => finish(currentDirection, 'run')}>Run collision model</button><p>Model result: {checked ? directionText[currentDirection] : 'run the model to compare the two push numbers'}.</p></div>}
      <button className="collision-reset" onClick={() => change(initial, 'reset')}>Start over</button>
      <p role="status">{visiblyComplete ? `${currentDirection} is correct for this lesson model.` : status}</p>
    </section>
  );
}
