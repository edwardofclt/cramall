import {useEffect,useState} from 'react';
import { useReducedMotionPref } from '../../app/useReducedMotionPref';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Agent = 'water' | 'wind' | 'ice';
type Inputs = { agent: Agent; vegetation: boolean };
type Run = Inputs;

const labels: Record<Agent, string> = { water: 'Water', wind: 'Wind', ice: 'Ice' };

function terrainDescription(terrain: 'soil' | 'sand' | 'rock') {
  return terrain === 'soil' ? 'clumps of soil on a small slope' : terrain === 'sand' ? 'a ridge of loose sand' : 'a cracked rock surface';
}

function outcomeFor(terrain: 'soil' | 'sand' | 'rock', run: Run) {
  const protectedMovement = run.vegetation && terrain !== 'rock';
  const amount = protectedMovement ? 'less movement' : terrain === 'rock' ? 'a small amount of worn material' : 'more loose material';
  const pattern = run.agent === 'water' ? 'channel' : run.agent === 'wind' ? (protectedMovement ? 'anchored-ripples' : 'wind-ripples') : 'scrape';
  const shape = `${terrain}-${run.agent}-${protectedMovement ? 'covered' : 'bare'}`;
  const effect = run.agent === 'water'
    ? terrain === 'soil' ? 'A water path moved soil downhill.' : `A water path carries ${amount} downhill.`
    : run.agent === 'wind'
      ? `Wind streaks shift ${amount} across the surface.`
      : `An ice scrape moves ${amount} along the surface.`;
  const vegetation = protectedMovement ? ' Vegetation means less movement in this authored model and changes its pattern; it does not stop all erosion.' : '';
  return { effect, pattern, shape, vegetation };
}

export default function ErosionSimulator({config,onEvent}:WidgetProps<'erosion-simulator'>) {
  const reduced = useReducedMotionPref();
  const key = JSON.stringify(config);
  const supportsVegetation = config.terrain !== 'rock';
  const initial: Inputs = { agent: config.agents[0]!, vegetation: supportsVegetation && (config.vegetation ?? false) };
  const [inputs, setInputs] = useState<Inputs>(initial);
  const [lastRun, setLastRun] = useState<Run | null>(null);
  const [status, setStatus] = useState('Choose an erosion agent, then run the authored model.');
  const { completeOnce } = useCompletionLatch(key);
  const stale = lastRun !== null && (lastRun.agent !== inputs.agent || lastRun.vegetation !== inputs.vegetation);
  const visiblyComplete = lastRun !== null && !stale && config.targetAgent !== undefined && lastRun.agent === config.targetAgent;

  useEffect(() => {
    setInputs(initial);
    setLastRun(null);
    setStatus('Choose an erosion agent, then run the authored model.');
  }, [key]);

  const emit = (next: Inputs, action: 'select-agent' | 'toggle-vegetation' | 'run' | 'reset') => {
    setInputs(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: next });
  };
  const changeInputs = (next: Inputs, action: 'select-agent' | 'toggle-vegetation') => {
    emit(next, action);
    setStatus('Inputs changed; the displayed result is stale. Run the authored erosion model again.');
  };
  const run = () => {
    emit(inputs, 'run');
    setLastRun(inputs);
    const outcome = outcomeFor(config.terrain, inputs);
    setStatus(`The authored model shows ${labels[inputs.agent].toLowerCase()} erosion on ${config.terrain}: ${outcome.effect} Compare the labelled before and after terrain.`);
    if (config.targetAgent !== undefined && inputs.agent === config.targetAgent) {
      completeOnce(() => onEvent({ type: 'complete', value: inputs }));
    }
  };
  const reset = () => {
    emit(initial, 'reset');
    setLastRun(null);
    setStatus('Choose an erosion agent, then run the authored model.');
  };
  const outcome = lastRun ? outcomeFor(config.terrain, lastRun) : null;

  return <section className="card widget-experiment erosion" data-testid="widget-erosion-simulator" data-motion={reduced ? 'off' : 'on'} data-state={visiblyComplete ? 'complete' : 'testing'} data-complete={visiblyComplete ? 'yes' : 'no'}>
    <header>
      <h3>Before-and-after erosion model</h3>
      <p>This authored model predicts possible changes. It is not physical evidence and does not prove what happened in a real place.</p>
    </header>
    <div className="erosion-controls" aria-label="Erosion model controls">
      {config.agents.map((agent) => <button key={agent} aria-label={`Use ${agent}`} aria-pressed={inputs.agent === agent} onClick={() => changeInputs({ ...inputs, agent }, 'select-agent')}>Use {labels[agent]}</button>)}
      {supportsVegetation && <button aria-label="Toggle vegetation" aria-pressed={inputs.vegetation} onClick={() => changeInputs({ ...inputs, vegetation: !inputs.vegetation }, 'toggle-vegetation')}>Vegetation {inputs.vegetation ? 'on' : 'off'}</button>}
      <button aria-label="Run erosion" onClick={run}>Run erosion</button>
    </div>
    <div className="erosion-comparison" aria-label="Authored before and after terrain comparison">
      <figure className="erosion-terrain erosion-before" data-testid="erosion-before" data-terrain={config.terrain}>
        <figcaption><strong>Before:</strong> {terrainDescription(config.terrain)}.</figcaption>
        <div className="terrain-art terrain-before-art" data-shape={`${config.terrain}-before`} aria-label={`Before terrain: ${terrainDescription(config.terrain)}`}><span aria-hidden="true">{config.terrain === 'rock' ? '▰ ▰ ▰' : config.terrain === 'sand' ? '⌁⌁⌁' : '▴▴▴'}</span></div>
      </figure>
      <figure className="erosion-terrain erosion-after" data-testid="erosion-after" data-stale={stale ? 'yes' : 'no'} data-agent={lastRun?.agent ?? 'none'}>
        <figcaption><strong>After:</strong> {!lastRun ? 'Run the authored model to show a labelled predicted change.' : stale ? 'This earlier result is stale because the current inputs changed.' : `The authored model predicts: ${outcome!.effect}${outcome!.vegetation}`}</figcaption>
        <div className="terrain-art terrain-after-art" data-testid="erosion-after-geometry" data-pattern={outcome?.pattern ?? 'not-run'} data-shape={outcome?.shape ?? `${config.terrain}-not-run`} aria-label={lastRun ? `${labels[lastRun.agent]} after terrain: ${outcome!.effect}${outcome!.vegetation}` : 'After terrain is not run yet'}>
          <span aria-hidden="true">{!lastRun ? '…' : lastRun.agent === 'water' ? '≈↘≈' : lastRun.agent === 'wind' ? '≋→≋' : '▱⇢▱'}</span>
        </div>
      </figure>
    </div>
    {supportsVegetation && <p className="erosion-vegetation-note">Compare vegetation on and off for soil or sand. In this authored model, plants change the amount and pattern of movement; they do not prevent all erosion.</p>}
    <button className="erosion-reset" onClick={reset}>Start over</button>
    <p role="status">{status}</p>
  </section>;
}
