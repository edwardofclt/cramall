import {useEffect,useState} from 'react';
import { useReducedMotionPref } from '../../app/useReducedMotionPref';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Agent = 'water' | 'wind' | 'ice';
type Inputs = { agent: Agent; vegetation: boolean };
type Run = Inputs;
type Prediction = 'bare' | 'covered';

const labels: Record<Agent, string> = { water: 'Water', wind: 'Wind', ice: 'Ice' };

function terrainDescription(terrain: 'soil' | 'sand' | 'rock') {
  return terrain === 'soil' ? 'clumps of soil on a small slope' : terrain === 'sand' ? 'a ridge of loose sand' : 'a cracked rock surface';
}

function outcomeFor(terrain: 'soil' | 'sand' | 'rock', run: Run) {
  const protectedMovement = run.vegetation && terrain !== 'rock';
  const amount = protectedMovement ? 'less movement of loose material' : terrain === 'rock' ? 'a small amount of worn material' : 'more movement of loose material';
  const pattern = run.agent === 'water' ? (protectedMovement ? 'rooted-channel' : 'channel') : run.agent === 'wind' ? (protectedMovement ? 'anchored-ripples' : 'wind-ripples') : (protectedMovement ? 'rooted-scrape' : 'scrape');
  const shape = `${terrain}-${run.agent}-${protectedMovement ? 'covered' : 'bare'}`;
  const effect = run.agent === 'water'
    ? terrain === 'soil' ? `A water path moved soil downhill, with ${amount}.` : `A water path carries ${amount} downhill.`
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
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [comparisonRuns, setComparisonRuns] = useState<Partial<Record<Prediction, Run>>>({});
  const [compared, setCompared] = useState(false);
  const [status, setStatus] = useState(config.comparison ? 'Choose a prediction before running the authored model.' : 'Choose an erosion agent, then run the authored model.');
  const { completeOnce } = useCompletionLatch(key);
  const hasComparison = config.comparison !== undefined;
  const stale = lastRun !== null && (lastRun.agent !== inputs.agent || lastRun.vegetation !== inputs.vegetation);
  const hasMatchedRuns = comparisonRuns.bare !== undefined && comparisonRuns.covered !== undefined;
  const visiblyComplete = hasComparison
    ? hasMatchedRuns && compared && prediction === 'bare' && config.targetAgent !== undefined && comparisonRuns.bare?.agent === config.targetAgent
    : lastRun !== null && !stale && config.targetAgent !== undefined && lastRun.agent === config.targetAgent;

  useEffect(() => {
    setInputs(initial);
    setLastRun(null);
    setPrediction(null);
    setComparisonRuns({});
    setCompared(false);
    setStatus(config.comparison ? 'Choose a prediction before running the authored model.' : 'Choose an erosion agent, then run the authored model.');
  }, [key]);

  const emit = (next: Inputs, action: 'select-agent' | 'toggle-vegetation' | 'run' | 'reset') => {
    setInputs(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: next });
  };
  const changeInputs = (next: Inputs, action: 'select-agent' | 'toggle-vegetation') => {
    emit(next, action);
    if (hasComparison && next.agent !== inputs.agent) setComparisonRuns({});
    if (hasComparison) setCompared(false);
    const changed = next.agent !== inputs.agent || next.vegetation !== inputs.vegetation;
    const matchesLastRun = lastRun !== null && next.agent === lastRun.agent && next.vegetation === lastRun.vegetation;
    setStatus(lastRun
      ? matchesLastRun ? 'The current input matches the displayed authored model result.' : 'Inputs differ from the displayed result, which is stale. Run the authored erosion model again.'
      : changed ? 'Inputs changed; run the authored erosion model.' : 'Choose an erosion agent, then run the authored model.');
  };
  const run = () => {
    if (hasComparison && prediction === null) {
      setStatus('Choose a prediction before running the authored erosion model.');
      return;
    }
    emit(inputs, 'run');
    setLastRun(inputs);
    let retainedBoth = false;
    if (hasComparison) {
      const nextRuns = { ...comparisonRuns, [inputs.vegetation ? 'covered' : 'bare']: inputs };
      setComparisonRuns(nextRuns);
      setCompared(false);
      retainedBoth = nextRuns.bare !== undefined && nextRuns.covered !== undefined;
      if (retainedBoth) setStatus('Both matched runs are retained. Compare bare and covered vegetation runs before making a claim.');
      else onEvent({ type: 'coach', cue: 'milestone' });
    }
    const outcome = outcomeFor(config.terrain, inputs);
    if (!hasComparison || !retainedBoth) {
      setStatus(`The authored model shows ${labels[inputs.agent].toLowerCase()} erosion on ${config.terrain}: ${outcome.effect} Compare the labelled before and after terrain.`);
    }
    if (!hasComparison && config.targetAgent !== undefined && inputs.agent === config.targetAgent) {
      completeOnce(() => onEvent({ type: 'complete', value: inputs }));
    }
  };
  const choosePrediction = (value: Prediction) => {
    setPrediction(value);
    setCompared(false);
    onEvent({ type: 'interaction', action: 'choose-prediction' });
    onEvent({ type: 'change', value: { ...inputs, prediction: value } });
    onEvent({ type: 'coach', cue: 'strategy' });
    setStatus(`Prediction saved: the ${value} tray will show more movement than the other matched run.`);
  };
  const compare = () => {
    if (!hasMatchedRuns) {
      setStatus('Run both matched conditions—bare and covered vegetation—before comparing them.');
      return;
    }
    setCompared(true);
    if (prediction !== 'bare') {
      onEvent({ type: 'coach', cue: 'retry' });
      setStatus('The visible model comparison shows more movement in the bare tray. Revise the prediction and compare again; this is an authored model, not physical evidence.');
      return;
    }
    setStatus('You compared matched bare and covered vegetation runs: the bare tray shows more modeled movement. This authored model is not physical evidence.');
    if (config.targetAgent !== undefined && comparisonRuns.bare?.agent === config.targetAgent) {
      completeOnce(() => onEvent({ type: 'complete', value: { ...comparisonRuns.bare!, prediction: 'bare' } }));
    }
  };
  const reset = () => {
    emit(initial, 'reset');
    setLastRun(null);
    setPrediction(null);
    setComparisonRuns({});
    setCompared(false);
    setStatus(config.comparison ? 'Choose a prediction before running the authored model.' : 'Choose an erosion agent, then run the authored model.');
  };
  const outcome = lastRun ? outcomeFor(config.terrain, lastRun) : null;

  return <section className="card widget-experiment erosion" data-testid="widget-erosion-simulator" data-motion={reduced ? 'off' : 'on'} data-state={visiblyComplete ? 'complete' : 'testing'} data-complete={visiblyComplete ? 'yes' : 'no'}>
    <header>
      <h3>Before-and-after erosion model</h3>
      <p>This authored model predicts possible changes. It is not physical evidence and does not prove what happened in a real place.</p>
    </header>
    {hasComparison && <div className="erosion-prediction" aria-label="Erosion prediction">
      <p>Before either run, predict which matched tray will show more movement.</p>
      <button aria-label="Predict bare movement" aria-pressed={prediction === 'bare'} onClick={() => choosePrediction('bare')}>Predict bare</button>
      <button aria-label="Predict covered movement" aria-pressed={prediction === 'covered'} onClick={() => choosePrediction('covered')}>Predict covered</button>
    </div>}
    <div className="erosion-controls" aria-label="Erosion model controls">
      {config.agents.map((agent) => <button key={agent} aria-label={`Use ${agent}`} aria-pressed={inputs.agent === agent} onClick={() => changeInputs({ ...inputs, agent }, 'select-agent')}>Use {labels[agent]}</button>)}
      {supportsVegetation && <button aria-label="Toggle vegetation" aria-pressed={inputs.vegetation} onClick={() => changeInputs({ ...inputs, vegetation: !inputs.vegetation }, 'toggle-vegetation')}>Vegetation {inputs.vegetation ? 'on' : 'off'}</button>}
      <button aria-label="Run erosion" disabled={hasComparison && prediction === null} onClick={run}>Run erosion</button>
      {hasComparison && <button aria-label="Compare erosion runs" disabled={!hasMatchedRuns} onClick={compare}>Compare runs</button>}
    </div>
    {hasComparison && <div className="erosion-retained-runs" aria-label="Retained vegetation comparison">
      <h4>Matched runs</h4>
      <div className="erosion-retained-grid">
        {(['bare', 'covered'] as const).map((condition) => {
          const retained = comparisonRuns[condition];
          const retainedOutcome = retained ? outcomeFor(config.terrain, retained) : null;
          return <figure className="erosion-terrain erosion-retained-run" data-testid={`erosion-run-${condition}`} key={condition} data-run={condition}>
            <figcaption><strong>{condition === 'bare' ? 'Bare vegetation' : 'Covered vegetation'}:</strong> {retained ? `modeled ${retainedOutcome!.effect}` : 'Run this matched condition to retain its modeled result.'}</figcaption>
            <div className="terrain-art" data-pattern={retainedOutcome?.pattern ?? 'not-run'} aria-label={retained ? `${condition} vegetation modeled outcome: ${retainedOutcome!.effect}` : `${condition} vegetation run not completed`}>
              <span aria-hidden="true">{retained ? retained.agent === 'water' ? '≈↘≈' : retained.agent === 'wind' ? '≋→≋' : '▱⇢▱' : '…'}</span>
            </div>
          </figure>;
        })}
      </div>
      <p>Compare the retained cards only after both runs use the same agent and authored settings. A difference is a model output, not physical evidence.</p>
    </div>}
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
