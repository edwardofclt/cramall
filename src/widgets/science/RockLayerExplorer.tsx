import { ActivityWorkbench } from '../ActivityWorkbench';
import './guide-led-science.css';
import {useEffect,useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

const defaultPrompt = 'Select a rock layer. Larger relative-age ranks are relatively older in this model.';
type CoachPhase = 'none' | 'strategy' | 'retry';
const rockEvidenceKey = (value: string) => value.normalize('NFKC').toLocaleLowerCase();

export default function RockLayerExplorer({config,onEvent}:WidgetProps<'rock-layer-explorer'>) {
  const key = JSON.stringify(config);
  const [conclusionFeedback,setConclusionFeedback]=useState('');
  const [evidenceFeedback,setEvidenceFeedback]=useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState<string | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [status, setStatus] = useState(config.prompt ?? defaultPrompt);
  const [coachPhase, setCoachPhase] = useState<CoachPhase>('none');
  const {completeOnce} = useCompletionLatch(key);
  const evidenceChoices = config.evidenceChoices ?? [];
  const hasEvidence = config.evidenceChoices !== undefined;
  const isComplete = config.targetLayerId !== undefined && selected === config.targetLayerId && checked === config.targetLayerId && (!hasEvidence || rockEvidenceKey(selectedEvidence ?? '') === rockEvidenceKey(config.requiredEvidenceId ?? ''));

  useEffect(() => {
    setSelected(null);setConclusionFeedback('');setEvidenceFeedback('');
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
    setSelected(id);
    setChecked(id);
    setSelectedEvidence(null);
    setEvidenceFeedback('');
    emit(id, 'select-layer');
    if (config.targetLayerId === undefined) {
      setConclusionFeedback('');
      setStatus(`You are exploring ${layer.label}, with relative-age rank ${layer.age}. There is no scored target; larger ranks are relatively older in this model.${layer.artifact ? ` Artifact: ${layer.artifact}.` : ''}`);
      return;
    }
    if (id !== config.targetLayerId) {
      setConclusionFeedback('Try again. Compare the positions and relative-age ranks before choosing.');
      setStatus('Try again. Compare the printed relative-age ranks. Larger ranks are relatively older in this model.');
      coachWrong();
      return;
    }
    setConclusionFeedback(hasEvidence
      ? 'Correct: this layer matches the question. Now connect your conclusion to a visible clue.'
      : 'Correct: this layer matches the question.');
    if (hasEvidence) {
      setStatus(`Correct layer. ${config.evidencePrompt} Choose the evidence that supports your conclusion.`);
      onEvent({type: 'coach', cue: 'milestone'});
      return;
    }
    setStatus('Correct layer for this model. Larger relative-age ranks are relatively older; ranks are not years.');
    completeOnce(() => onEvent({type: 'complete', value: {selectedLayerId: id}}));
  };

  const chooseEvidence = (evidenceId: string) => {
    if (!hasEvidence || checked !== config.targetLayerId) return;
    setSelectedEvidence(evidenceId);
    onEvent({type: 'interaction', action: 'check'});
    onEvent({type: 'change', value: {selectedLayerId: selected}});
    if (rockEvidenceKey(evidenceId) !== rockEvidenceKey(config.requiredEvidenceId ?? '')) {
      setEvidenceFeedback('Try again: choose a clue in the layer model, not an exact age or invented process.');
      setStatus('Revise the evidence choice. Use the relative rank and fossil pattern from the lesson; ranks are not years.');
      coachWrong();
      return;
    }
    const evidence = evidenceChoices.find((choice) => choice.id === evidenceId)!;
    setEvidenceFeedback(`Conclusion supported: ${evidence.text} Ranks give order, not years.`);
    setStatus(`Relative-age conclusion supported by selected evidence: ${evidence.text} Ranks show order, not years.`);
    completeOnce(() => onEvent({type: 'complete', value: {selectedLayerId: selected!}}));
  };

  const reset = () => {
    setSelected(null);setConclusionFeedback('');setEvidenceFeedback('');
    setChecked(null);
    setSelectedEvidence(null);
    setStatus(config.prompt ?? defaultPrompt);
    setCoachPhase('none');
    emit(null, 'reset');
  };

  return <section className="card widget-experiment rocks activity-shell science-activity" data-testid="widget-rock-layer-explorer" data-state={isComplete ? 'complete' : 'exploring'} aria-describedby="rock-layer-convention">
    <ActivityWorkbench label="Rock layer model" revealKey={checked === config.targetLayerId ? 'evidence' : 'layer'} visual={<>
    <header><h3>Rock-layer explorer</h3><p className="science-model-label">Model only · not physical evidence</p></header>
    <div className="rock-layer-stack" data-testid="rock-layer-stack" data-order="authored" aria-label="Rock layers in authored stack order">
      {config.layers.map((layer, index) => <article key={layer.id} className="rock-layer" data-testid={`rock-layer-${layer.id}`} data-layer-id={layer.id} data-pattern={index % 4}>
        <div className="rock-layer-label"><strong>{layer.label}</strong>{selected === layer.id && <span className="rock-layer-selected">Selected</span>}</div>
        <span>Relative-age rank: {layer.age}</span>
        {layer.artifact && <><span className="rock-fossils" aria-hidden="true">{/shell/i.test(layer.artifact) && !/without shells/i.test(layer.artifact) ? '◒ ◒ ◒' : '♧ ♧ ♧'}</span><span>Artifact: {layer.artifact}</span></>}

      </article>)}
    </div>
    </>}>
    <section aria-label="Choose a layer"><h4>{config.prompt ?? 'Choose a layer to inspect'}</h4>{config.layers.map(layer=><button key={layer.id} aria-label={`Select ${layer.label} layer`} aria-pressed={selected===layer.id} onClick={()=>select(layer.id)}>{layer.label}</button>)}</section>
    <p aria-label="Layer conclusion feedback" className="science-feedback" data-outcome={conclusionFeedback ? selected === config.targetLayerId ? 'correct' : 'retry' : undefined}>{conclusionFeedback || 'Choose a layer to test your idea.'}</p>
    {hasEvidence && checked === config.targetLayerId && <section data-activity-reveal className="rock-evidence" aria-label={config.evidencePrompt}>
      <h4>{config.evidencePrompt}</h4>
      <div className="rock-evidence-choices">
        {evidenceChoices.map((choice) => <button type="button" key={choice.id} aria-pressed={selectedEvidence === choice.id} disabled={checked !== config.targetLayerId} onClick={() => chooseEvidence(choice.id)}>{selectedEvidence === choice.id ? 'Selected: ' : 'Choose: '}{choice.text}</button>)}
      </div>
      <p aria-label="Layer evidence feedback" data-outcome={evidenceFeedback ? isComplete ? 'correct' : 'retry' : undefined}>{evidenceFeedback}</p>
      {selectedEvidence && <p data-testid="rock-selected-evidence">Selected evidence: {evidenceChoices.find((choice) => choice.id === selectedEvidence)?.text}</p>}
    </section>}
    <div className="rock-layer-controls">
      <button onClick={reset}>Start over</button>
    </div>
    <p role="status">{status}</p>
    <section className="science-model-notes" aria-label="About this model"><h4>About this model</h4>

      <p id="rock-layer-convention">This stack is shown in the authored order. Larger relative-age ranks are relatively older in this model; ranks are not years or absolute ages.</p>
    </section>
    </ActivityWorkbench>
  </section>;
}
