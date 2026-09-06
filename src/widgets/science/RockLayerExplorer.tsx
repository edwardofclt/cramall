import {useEffect,useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

const defaultPrompt = 'Select a rock layer. Larger relative-age ranks are relatively older in this model.';

export default function RockLayerExplorer({config,onEvent}:WidgetProps<'rock-layer-explorer'>) {
  const key = JSON.stringify(config);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState<string | null>(null);
  const [status, setStatus] = useState(config.prompt ?? defaultPrompt);
  const {completeOnce} = useCompletionLatch(key);
  const isComplete = config.targetLayerId !== undefined && selected === config.targetLayerId && checked === config.targetLayerId;

  useEffect(() => {
    setSelected(null);
    setChecked(null);
    setStatus(config.prompt ?? defaultPrompt);
  }, [key]);

  const emit = (next: string | null, action: 'select-layer' | 'check' | 'reset') => {
    onEvent({type: 'interaction', action});
    onEvent({type: 'change', value: {selectedLayerId: next}});
  };

  const select = (id: string) => {
    const layer = config.layers.find((candidate) => candidate.id === id)!;
    setSelected(id);
    setChecked(null);
    // Report the selected layer's own rank and artifact, but never rank it against the
    // others: when the authored question asks for the oldest layer, saying "the oldest
    // rank shown" here would answer it before the learner presses Check.
    setStatus(`${layer.label} has relative-age rank ${layer.age}. Larger relative-age ranks are relatively older in this model.${layer.artifact ? ` Artifact: ${layer.artifact}.` : ''}`);
    emit(id, 'select-layer');
  };

  const check = () => {
    if (!selected) return;
    setChecked(selected);
    emit(selected, 'check');
    if (config.targetLayerId === undefined) {
      setStatus('You checked this layer while exploring. This configuration has no scored target; larger relative-age ranks are relatively older in this model.');
      return;
    }
    if (selected !== config.targetLayerId) {
      setStatus('Not the configured layer yet. Compare the printed relative-age ranks and try again. Larger ranks are relatively older in this model.');
      return;
    }
    setStatus('Correct layer for this authored model. Larger relative-age ranks are relatively older in this model.');
    completeOnce(() => onEvent({type: 'complete', value: {selectedLayerId: selected}}));
  };

  const reset = () => {
    setSelected(null);
    setChecked(null);
    setStatus(config.prompt ?? defaultPrompt);
    emit(null, 'reset');
  };

  return <section className="card widget-experiment rocks" data-testid="widget-rock-layer-explorer" data-state={isComplete ? 'complete' : 'exploring'} aria-describedby="rock-layer-convention">
    <header>
      <h3>Rock-layer explorer</h3>
      <p id="rock-layer-convention">This stack is shown in the authored order. Larger relative-age ranks are relatively older in this model; ranks are not years or absolute ages.</p>
    </header>
    <div className="rock-layer-stack" data-testid="rock-layer-stack" data-order="authored" aria-label="Rock layers in authored stack order">
      {config.layers.map((layer, index) => <article key={layer.id} className="rock-layer" data-testid={`rock-layer-${layer.id}`} data-layer-id={layer.id} data-pattern={index % 4}>
        <div className="rock-layer-label"><strong>{layer.label}</strong>{selected === layer.id && <span className="rock-layer-selected">Selected</span>}</div>
        <span>Relative-age rank: {layer.age}</span>
        {layer.artifact && <span>Artifact: {layer.artifact}</span>}
        <button aria-label={`Select ${layer.label} layer`} aria-pressed={selected === layer.id} onClick={() => select(layer.id)}>Select layer</button>
      </article>)}
    </div>
    <div className="rock-layer-controls">
      <button aria-label="Check layer" disabled={!selected} onClick={check}>Check</button>
      <button onClick={reset}>Start over</button>
    </div>
    <p role="status">{status}</p>
  </section>;
}
