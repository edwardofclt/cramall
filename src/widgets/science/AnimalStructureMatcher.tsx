import { ActivityWorkbench } from '../ActivityWorkbench';
import { WrenScene } from './ScienceScenes';
import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

const INITIAL_STATUS = 'Select a structure, then choose the function it helps an animal perform.';
type CoachPhase = 'none' | 'strategy' | 'retry';

export default function AnimalStructureMatcher({ config, onEvent }: WidgetProps<'animal-structure-matcher'>) {
  const key = JSON.stringify(config);
  const [systemIds,setSystemIds]=useState<string[]>([]);
  const [showInternal,setShowInternal]=useState(false);
  useEffect(()=>{setSystemIds([]);setShowInternal(false);},[key]);
  const emptyState = () => ({ key, selected: null as string | null, matches: {} as Record<string, string>, systemConnected: false, status: INITIAL_STATUS });
  const [state, setState] = useState(emptyState);
  const currentState = state.key === key ? state : emptyState();
  if (state.key !== key) setState(currentState);
  const { selected, matches, systemConnected, status } = currentState;
  const [coachPhase, setCoachPhase] = useState<CoachPhase>('none');
  useEffect(() => { setCoachPhase('none'); }, [key]);
  const { completeOnce } = useCompletionLatch(key);
  const pairFor = (id: string) => config.pairs.find((pair) => pair.id === id)!;
  const hasCooperatingKinds = config.pairs.some((pair) => pair.kind === 'internal') && config.pairs.some((pair) => pair.kind === 'external');
  const allCorrect = config.pairs.every((pair) => matches[pair.id] === pair.function);
  const liveComplete = allCorrect && (!hasCooperatingKinds || systemConnected);

  const coachWrong = () => {
    const cue = coachPhase === 'none' ? 'strategy' : 'retry';
    setCoachPhase(cue);
    onEvent({ type: 'coach', cue });
  };

  const emit = (next: Record<string, string>, action: 'select-structure' | 'match' | 'reset', nextSystemConnected = false) => {
    setState((previous) => previous.key === key ? { ...previous, matches: next, systemConnected: nextSystemConnected } : previous);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { matches: next } });
    if (config.pairs.every((pair) => next[pair.id] === pair.function) && (!hasCooperatingKinds || nextSystemConnected)) {
      completeOnce(() => onEvent({ type: 'complete', value: { matches: next } }));
    }
  };
  const select = (id: string) => {
    if (selected === id) return;
    const pair = pairFor(id);
    setState({ key, selected: id, matches, systemConnected, status: `Selected: ${pair.animal} ${pair.structure}. Choose the function this structure helps it perform.` });
    emit(matches, 'select-structure', systemConnected);
  };
  const match = (fn: string) => {
    if (!selected) return;
    const pair = pairFor(selected);
    const next = { ...matches, [selected]: fn };
    const correct = pair.function === fn;
    const feedback = correct
      ? `Correct: The function “${fn}” matches the ${pair.animal}'s ${pair.structure}.${config.pairs.every((item) => next[item.id] === item.function) ? ' All matches are complete.' : ' Select another structure.'}`
      : `${fn} does not match the ${pair.animal}'s ${pair.structure}. Select that structure again to choose another function.`;
    const allNextCorrect = config.pairs.every((item) => next[item.id] === item.function);
    setState({ key, selected: null, matches: next, systemConnected: false, status: allNextCorrect && hasCooperatingKinds
      ? 'All matches are correct. Now connect one internal and one external structure in the cooperating-system map.'
      : feedback });
    emit(next, 'match');
    if (allNextCorrect && hasCooperatingKinds) onEvent({ type: 'coach', cue: 'milestone' });
    if (!correct) coachWrong();
  };
  const connectSystem = () => {
    if (!hasCooperatingKinds || !allCorrect || systemIds.length !== 2) return;
    const internal = config.pairs.find((pair) => systemIds.includes(pair.id) && pair.kind === 'internal');
    const external = config.pairs.find((pair) => systemIds.includes(pair.id) && pair.kind === 'external');
    if (!internal || !external || internal.animal !== external.animal) {setState(previous=>({...previous,status:'Try again: choose one internal and one external structure from the same animal.'}));coachWrong();return;}
    setState({ key, selected: null, matches, systemConnected: true, status: `Connected ${external.structure} (${external.function}) and ${internal.structure} (${internal.function}): their different jobs cooperate in one animal system.` });
    emit(matches, 'match', true);
    completeOnce(() => onEvent({ type: 'complete', value: { matches } }));
  };
  const reset = () => {
    setCoachPhase('none');setSystemIds([]);setShowInternal(false);
    setState(emptyState());
    emit({}, 'reset');
  };

  return <section className="card widget-experiment animal activity-shell science-activity" data-testid="widget-animal-structure-matcher" data-state={liveComplete ? 'complete' : 'matching'}>
    <ActivityWorkbench label="Animal structure model" revealKey={allCorrect ? 'system' : 'matching'} visual={<>
    <header><h3>Animal structure and function matcher</h3><p className="science-model-label">Model only · not physical evidence</p></header>
      {config.pairs.every(pair=>pair.animal.toLowerCase()==='wren') ? <WrenScene selected={selected ? pairFor(selected).structure : null} matched={config.pairs.filter(pair=>matches[pair.id]===pair.function).map(pair=>pair.structure)} internal={showInternal}/> : <p>{config.pairs.map(pair=>`${pair.animal}: ${pair.structure}`).join(' · ')}</p>}
      <p>{selected ? `Inspecting ${pairFor(selected).structure}` : 'Choose a part to inspect its job.'}</p>
    </>}>
    <button aria-pressed={showInternal} onClick={()=>setShowInternal(value=>!value)}>{showInternal?'Hide internal cutaway':'Show internal cutaway'}</button>
    <section className="animal-structure-cards" aria-label="Animal structure cards">
      <h4>1. Select a structure</h4>
      <div className="animal-card-grid">
        {config.pairs.map((pair) => <article className="animal-structure-card" key={pair.id}>
          <h5>{pair.animal}</h5>
          <p>Structure: <strong>{pair.structure}</strong></p>
          <button aria-label={`Select ${pair.animal} ${pair.structure}`} aria-pressed={selected === pair.id} onClick={() => select(pair.id)}>
            {selected === pair.id ? 'Selected structure' : `Select ${pair.structure}`}
          </button>
          <p data-testid={`animal-match-${pair.id}`} className="animal-current-match">
            {matches[pair.id] ? `${matches[pair.id] === pair.function ? '✓ Matched' : 'Try again'}: ${pair.animal}'s ${pair.structure} → ${matches[pair.id]}` : 'No function matched yet.'}
          </p>
        </article>)}
      </div>
    </section>
    <p className="animal-selection" aria-live="polite">{selected ? `Selected: ${pairFor(selected).animal} ${pairFor(selected).structure}` : 'Selected: none'}</p>
    <section className="animal-function-cards" aria-label="Function cards">
      <h4>2. Match its function</h4>
      <div className="animal-card-grid">
        {config.pairs.map((pair) => <article className="animal-function-card" key={pair.function}>
          <p>Function: <strong>{pair.function}</strong></p>
          <button aria-label={`Match ${pair.function}`} disabled={!selected} onClick={() => match(pair.function)}>Match {pair.function}</button>
        </article>)}
      </div>
    </section>
    <section className="animal-connections" aria-label="Current structure to function matches">
      <h4>Your visible matches</h4>
      {config.pairs.filter((pair) => matches[pair.id]).map((pair) => <p key={pair.id}>{pair.animal} {pair.structure} <span aria-hidden="true">→</span> {matches[pair.id]}</p>)}
      {!Object.keys(matches).length && <p>No matches yet.</p>}
    </section>
    {hasCooperatingKinds && <section className="animal-system-map" data-testid="animal-system-map" aria-label="Cooperating animal system">
      <h4>Cooperating system map</h4>
      <p>External structures connect with internal structures so different jobs can support the whole animal.</p>
      <div className="animal-system-links">
        {config.pairs.filter((pair) => matches[pair.id]).map((pair) => <span key={pair.id} data-kind={pair.kind}>{pair.kind}: {pair.structure} → {matches[pair.id]}</span>)}
      </div>
      {allCorrect && <div className="science-choice-row" data-activity-reveal>{config.pairs.map(pair=><button key={pair.id} aria-label={`Use ${pair.structure} in the system`} aria-pressed={systemIds.includes(pair.id)} onClick={()=>{setSystemIds(current=>current.includes(pair.id)?current.filter(id=>id!==pair.id):current.length<2?[...current,pair.id]:[current[1]!,pair.id]);setState(previous=>({...previous,systemConnected:false,status:'System selection changed. Connect the chosen structures to check how their jobs cooperate.'}));}}>{pair.structure}</button>)}</div>}
      <button type="button" aria-label="Connect cooperating system" disabled={!allCorrect || systemConnected || systemIds.length!==2} onClick={connectSystem}>{systemConnected ? 'Connected cooperating system' : 'Connect cooperating system'}</button>
    </section>}
    <button className="animal-reset" onClick={reset}>Start over</button>
    <p role="status">{status}</p>
    <section className="science-model-notes" aria-label="About this model"><h4>About this model</h4>

      <p>This is a simplified matching model, not an observation of a real animal. Match each structure with the function it can help an animal perform.</p>
    </section>
    </ActivityWorkbench>
  </section>;
}
