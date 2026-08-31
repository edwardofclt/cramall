import { useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

const INITIAL_STATUS = 'Select a structure, then choose the function it helps an animal perform.';

export default function AnimalStructureMatcher({ config, onEvent }: WidgetProps<'animal-structure-matcher'>) {
  const key = JSON.stringify(config);
  const emptyState = () => ({ key, selected: null as string | null, matches: {} as Record<string, string>, status: INITIAL_STATUS });
  const [state, setState] = useState(emptyState);
  const currentState = state.key === key ? state : emptyState();
  if (state.key !== key) setState(currentState);
  const { selected, matches, status } = currentState;
  const { completeOnce } = useCompletionLatch(key);
  const pairFor = (id: string) => config.pairs.find((pair) => pair.id === id)!;
  const liveComplete = config.pairs.every((pair) => matches[pair.id] === pair.function);

  const emit = (next: Record<string, string>, action: 'select-structure' | 'match' | 'reset') => {
    setState((previous) => previous.key === key ? { ...previous, matches: next } : previous);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { matches: next } });
    if (config.pairs.every((pair) => next[pair.id] === pair.function)) {
      completeOnce(() => onEvent({ type: 'complete', value: { matches: next } }));
    }
  };
  const select = (id: string) => {
    const pair = pairFor(id);
    setState({ key, selected: id, matches, status: `Selected: ${pair.animal} ${pair.structure}. Choose the function this structure helps it perform.` });
    emit(matches, 'select-structure');
  };
  const match = (fn: string) => {
    if (!selected) return;
    const pair = pairFor(selected);
    const next = { ...matches, [selected]: fn };
    const correct = pair.function === fn;
    const feedback = correct
      ? `Correct: The function “${fn}” matches the ${pair.animal}'s ${pair.structure}.${config.pairs.every((item) => next[item.id] === item.function) ? ' All matches are complete.' : ' Select another structure.'}`
      : `${fn} does not match the ${pair.animal}'s ${pair.structure}. Select that structure again to choose another function.`;
    setState({ key, selected: null, matches: next, status: feedback });
    emit(next, 'match');
  };
  const reset = () => {
    setState(emptyState());
    emit({}, 'reset');
  };

  return <section className="card widget-experiment animal" data-testid="widget-animal-structure-matcher" data-state={liveComplete ? 'complete' : 'matching'}>
    <header>
      <h3>Animal structure and function matcher</h3>
      <p>This is a simplified matching model, not an observation of a real animal. Match each structure with the function it can help an animal perform.</p>
    </header>
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
            {matches[pair.id] ? `${pair.animal}'s ${pair.structure} → ${matches[pair.id]}` : 'No function matched yet.'}
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
    <button className="animal-reset" onClick={reset}>Start over</button>
    <p role="status">{status}</p>
  </section>;
}
