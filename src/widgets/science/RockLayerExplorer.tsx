import {useEffect,useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

const defaultPrompt = 'Select a rock layer. Larger relative-age ranks are relatively older in this model.';
type CoachPhase = 'none' | 'strategy' | 'retry';

export default function RockLayerExplorer({config,onEvent}:WidgetProps<'rock-layer-explorer'>) {
  const key = JSON.stringify(config);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState<string | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [status, setStatus] = useState(config.prompt ?? defaultPrompt);
  const [coachPhase, setCoachPhase] = useState<CoachPhase>('none');
  const {completeOnce} = useCompletionLatch(key);
  const evidenceChoices = config.evidenceChoices ?? [];
  const hasEvidence = config.evidenceChoices !== undefined;
  const isComplete = config.targetLayerId !== undefined && selected === config.targetLayerId && checked === config.targetLayerId && (!hasEvidence || selectedEvidence === config.requiredEvidenceId);

  useEffect(() => {
    setSelected(null);
    setChecked(null);
    setSelectedEvidence(null);
    setStatus(config.prompt ?? defaultPrompt);
    setCoachPhase('none');
  }, [key]);

  const coachWrong = () => {
    const cue = coachPhase === 'none' ? 'strategy' : 'retry';
    setCoachPhase(cue);
    onEvent({type: 'coach', cue});
  };

  const emit = (next: string | null, action: 'select-layer' | 'check' | 'reset') => {
    onEvent({type: 'interaction', action});
    onEvent({type: 'change', value: {selectedLayerId: next}});
  };

  const select = (id: string) => {
    const layer = config.layers.find((candidate) => candidate.id === id)!;
    const oldest = Math.max(...config.layers.map((candidate) => candidate.age));
    setSelected(id);
    setChecked(null);
    setSelectedEvidence(null);
    setStatus(`${layer.label} has relative-age rank ${layer.age}${layer.age === oldest ? ', the oldest rank shown' : ''}. Larger relative-age ranks are relatively older in this model.${layer.artifact ? ` Artifact: ${layer.artifact}.` : ''}`);
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
      coachWrong();
      return;
    }
    if (hasEvidence) {
      setStatus(`Correct relative-age rank. ${config.evidencePrompt} Choose the evidence that supports your conclusion.`);
      onEvent({type: 'coach', cue: 'milestone'});
      return;
    }
    setStatus('Correct layer for this authored model. Larger relative-age ranks are relatively older in this model.');
    completeOnce(() => onEvent({type: 'complete', value: {selectedLayerId: selected}}));
  };

  const chooseEvidence = (evidenceId: string) => {
    if (!hasEvidence || checked !== config.targetLayerId) return;
    setSelectedEvidence(evidenceId);
    onEvent({type: 'interaction', action: 'check'});
    onEvent({type: 'change', value: {selectedLayerId: selected}});
    if (evidenceId !== config.requiredEvidenceId) {
      setStatus('Revise the evidence choice. Use the relative rank and fossil pattern from the lesson; ranks are not years.');
      coachWrong();
      return;
    }
    const evidence = evidenceChoices.find((choice) => choice.id === evidenceId)!;
    setStatus(`Relative-age conclusion supported by selected evidence: ${evidence.text} Ranks show order, not years.`);
    completeOnce(() => onEvent({type: 'complete', value: {selectedLayerId: selected!}}));
  };

  const reset = () => {
    setSelected(null);
    setChecked(null);
    setSelectedEvidence(null);
    setStatus(config.prompt ?? defaultPrompt);
    setCoachPhase('none');
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
    {hasEvidence && <section className="rock-evidence" aria-label={config.evidencePrompt}>
      <h4>{config.evidencePrompt}</h4>
      <div className="rock-evidence-choices">
        {evidenceChoices.map((choice) => <button type="button" key={choice.id} aria-pressed={selectedEvidence === choice.id} disabled={checked !== config.targetLayerId} onClick={() => chooseEvidence(choice.id)}>{selectedEvidence === choice.id ? 'Selected: ' : 'Choose: '}{choice.text}</button>)}
      </div>
      {selectedEvidence && <p data-testid="rock-selected-evidence">Selected evidence: {evidenceChoices.find((choice) => choice.id === selectedEvidence)?.text}</p>}
    </section>}
    <div className="rock-layer-controls">
      <button aria-label="Check layer" disabled={!selected} onClick={check}>Check</button>
      <button onClick={reset}>Start over</button>
    </div>
    <p role="status">{status}</p>
  </section>;
}
