import { ActivityWorkbench } from '../ActivityWorkbench';
import { EnergyScene } from './ScienceScenes';
import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type CoachPhase = 'none' | 'strategy' | 'retry';

export default function EnergyConversionDesigner({ config, onEvent }: WidgetProps<'energy-conversion-designer'>) {
  const key = JSON.stringify(config);
  const [ran, setRan] = useState(false);
  const [explained, setExplained] = useState(false);
  const [runNumber, setRunNumber] = useState(0);
  const [chain, setChain] = useState<string[]>([]);
  const [status, setStatus] = useState('Choose the required starting component.');
  const [coachPhase, setCoachPhase] = useState<CoachPhase>('none');
  const { completeOnce } = useCompletionLatch(key);
  const componentFor = (id: string) => config.components.find((component) => component.id === id)!;
  const constraints = config.constraints ?? [];
  const retainedChain = chain.every((id) => config.components.some((component) => component.id === id)) ? chain : [];
  const hasValidConnections = (ids: string[]) => ids.length > 0 && ids.every((id, index) => index === 0 || componentFor(ids[index - 1]!).energyOut === componentFor(id).energyIn);
  const coveredConstraintIds = new Set(retainedChain.flatMap((id) => componentFor(id).satisfiesConstraintIds ?? []));
  const unmetConstraints = constraints.filter((constraint) => !coveredConstraintIds.has(constraint.id));
  const validChain = retainedChain[0] === config.requiredStart && retainedChain[retainedChain.length - 1] === config.requiredEnd && hasValidConnections(retainedChain);
  const ready = validChain && unmetConstraints.length === 0;
  const visiblyComplete = ready && ran && explained;

  useEffect(() => {
    setChain([]); setRan(false); setExplained(false);
    setStatus('Choose the required starting component.');
    setCoachPhase('none');
  }, [key]);

  const coachWrong = () => {
    const cue = coachPhase === 'none' ? 'strategy' : 'retry';
    setCoachPhase(cue);
    onEvent({ type: 'coach', cue });
  };
  const coachRetry = () => {
    setCoachPhase('retry');
    onEvent({ type: 'coach', cue: 'retry' });
  };
  const emit = (next: string[], action: 'append-chain' | 'reset') => {
    const changed = next.length !== retainedChain.length || next.some((id,index)=>id!==retainedChain[index]);
    setChain(next);
    if(changed || action==='reset'){setRan(false);setExplained(false);}
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { chain: next } });
    const nextCovered = new Set(next.flatMap((id) => componentFor(id).satisfiesConstraintIds ?? []));
    const nextUnmet = constraints.filter((constraint) => !nextCovered.has(constraint.id));
    const complete = next[0] === config.requiredStart && next[next.length - 1] === config.requiredEnd && hasValidConnections(next) && nextUnmet.length === 0;
    if (complete && changed) {
      onEvent({ type: 'coach', cue: 'milestone' });

    }
  };
  const add = (id: string) => {
    const selected = componentFor(id);
    if (!retainedChain.length && id !== config.requiredStart) {
      setStatus(`${selected.label} is not the required start. Choose ${componentFor(config.requiredStart).label}.`);
      emit(retainedChain, 'append-chain');
      coachWrong();
      return;
    }
    if (retainedChain.length) {
      const previous = componentFor(retainedChain[retainedChain.length - 1]!);
      if (previous.energyOut !== selected.energyIn) {
        setStatus(`${previous.label} outputs ${previous.energyOut}, which does not connect to ${selected.label}'s ${selected.energyIn} input.`);
        emit(retainedChain, 'append-chain');
        coachWrong();
        return;
      }
    }
    const next = [...retainedChain, id];
    const nextCovered = new Set(next.flatMap((componentId) => componentFor(componentId).satisfiesConstraintIds ?? []));
    const nextUnmet = constraints.filter((constraint) => !nextCovered.has(constraint.id));
    const completesRequiredChain = next[0] === config.requiredStart && next[next.length - 1] === config.requiredEnd && hasValidConnections(next);
    setStatus(completesRequiredChain
      ? nextUnmet.length ? `The chain connects the required endpoints, but unmet constraints remain: ${nextUnmet.map(({ label }) => label).join(', ')}.` : 'The selected conversion chain connects the required endpoints and meets every constraint.'
      : `Chain: ${next.map((componentId) => componentFor(componentId).label).join(' to ')}.`);
    emit(next, 'append-chain');
    if (completesRequiredChain && nextUnmet.length > 0) coachRetry();
  };
  const removeAt = (index: number) => {
    const next = retainedChain.slice(0, index);
    setStatus(next.length ? `Chain: ${next.map((componentId) => componentFor(componentId).label).join(' to ')}.` : 'Choose the required starting component.');
    emit(next, 'append-chain');
  };
  const reset = () => {
    setStatus('Choose the required starting component.');
    setCoachPhase('none');
    emit([], 'reset');
  };

  return <section className="card widget-experiment conversion activity-shell science-activity" data-testid="widget-energy-conversion-designer" data-state={visiblyComplete ? 'complete' : 'building'}>
    <ActivityWorkbench label="Energy conversion" revealKey={ran ? 'explain' : 'setup'} visual={<>
    <header><h3>Energy conversion chain model</h3><p className="science-model-label">Model only · not physical evidence</p></header>
      <EnergyScene key={runNumber} source={componentFor(config.requiredStart).label} receiver={componentFor(config.requiredEnd).label} electric active={ran} connected={ready}/>
      <p aria-label="Device observation">{ran ? `${componentFor(config.requiredEnd).label}: the connected model ${/sound/i.test(componentFor(config.requiredEnd).energyOut) ? 'vibrates to represent a sound-producing effect' : /light/i.test(componentFor(config.requiredEnd).energyOut) ? 'lights up' : 'shows the labeled output effect'}. Energy itself is not visible.` : 'Before: the device is quiet. Connect its parts, then run the model.'}</p>
    </>}>
    <div className="conversion-options" aria-label="Available energy components">
      {config.components.map((component) => <article className="conversion-option" key={component.id}>
        <h4>{component.label}</h4><p>Input: {component.energyIn}</p><p>Output: {component.energyOut}</p>
        {component.satisfiesConstraintIds && <div className="conversion-component-stamps" aria-label={`${component.label} constraint stamps`}>{component.satisfiesConstraintIds.map((id) => { const constraint = constraints.find((candidate) => candidate.id === id); return constraint ? <span className="constraint-stamp" data-testid={`constraint-stamp-${component.id}-${id}`} data-kind={constraint.kind} key={id}>{constraint.label}</span> : null; })}</div>}
        <button aria-label={`Add ${component.label}`} onClick={() => add(component.id)}>Add {component.label}</button>
      </article>)}
    </div>
    {constraints.length > 0 && <div className="conversion-constraints" data-testid="conversion-constraints" aria-label="Design constraints"><h4>Constraint board</h4>{constraints.map((constraint) => <p key={constraint.id} data-constraint-state={coveredConstraintIds.has(constraint.id) ? 'met' : 'unmet'}><strong>{coveredConstraintIds.has(constraint.id) ? '✓ Met' : '○ Unmet'}:</strong> {constraint.label}</p>)}{unmetConstraints.length === 0 ? <p className="constraint-summary">All constraints met.</p> : <p className="constraint-summary">Unmet constraints: {unmetConstraints.map(({ label }) => label).join(', ')}.</p>}</div>}
    <div className="conversion-chain" data-testid="conversion-chain" role="group" aria-label={`Selected energy conversion chain: ${retainedChain.map((id) => componentFor(id).label).join(' to ') || 'empty'}`}>
      {retainedChain.length ? retainedChain.map((id, index) => { const component = componentFor(id); return <span className="conversion-chain-part" key={`${id}-${index}`} data-testid={`conversion-chain-slot-${index}`}><article className="conversion-node" data-component-id={id}><strong>{id}: {component.label}</strong><span>Input: {component.energyIn}</span><span>Output: {component.energyOut}</span><button type="button" aria-label={`Remove ${component.label} from chain`} onClick={() => removeAt(index)}>Remove</button></article>{index < retainedChain.length - 1 && <span data-testid="conversion-connector" className="conversion-connector" aria-label={`${component.energyOut} connects to next component`}>{component.energyOut} →</span>}</span>; }) : <span className="conversion-empty">Your selected chain will snap here.</span>}
    </div>
    <section className="science-feedback"><h4>Run and explain</h4><p aria-label="Connection feedback">{ready ? 'Your connected chain meets the listed requirements. Now run the device.' : 'Build a connected chain and check each requirement.'}</p><button aria-label="Run connected device" disabled={!ready} onClick={() => {setRan(true);setRunNumber(n=>n+1);if(!ran)setStatus('The modeled device ran. Which explanation connects the input to the effect?');onEvent({type:'interaction',action:'run'});}}>Run connected device</button>
    {ran && <div data-activity-reveal><button onClick={() => {setExplained(false);setStatus('Try again. A changed effect does not mean energy disappeared. Compare the input and output.');onEvent({type:'coach',cue:'retry'});}}>The device used up all its energy</button><button aria-label="The device changed motion into another effect" onClick={() => {setExplained(true);setStatus('You connected the input to an observable modeled effect. The energy changed form; it was not used up.');onEvent({type:'interaction',action:'explain'});completeOnce(()=>onEvent({type:'complete',value:{chain:retainedChain}}));}}>The device changed its input into another effect</button></div>}
    </section>
    <button className="conversion-reset" aria-label="Start over" onClick={reset}>Start over</button>
    <p role="status">{status}</p>
    <section className="science-model-notes" aria-label="About this model"><h4>About this model</h4>

      <p>Simplified energy-conversion model: energy is not directly seen here, and this app is not physical evidence. Use the component labels to connect conversions with observable effects when the authored setup supports them.</p>
      <p>Start with {componentFor(config.requiredStart).label} and end with {componentFor(config.requiredEnd).label}. Each outgoing energy label must match the next incoming energy label.</p>
      {constraints.length > 0 && <p className="conversion-tradeoff-copy">Compare the trade-offs: no single device is universally best.</p>}
    </section>
    </ActivityWorkbench>
  </section>;
}
