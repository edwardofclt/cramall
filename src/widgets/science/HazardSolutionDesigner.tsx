import {useEffect, useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

const orderedIds = (ids: string[], solutionIds: string[]) => solutionIds.filter((id) => ids.includes(id));
const sameSet = (first: string[], second: string[]) => first.length === second.length && first.every((id) => second.includes(id));

export default function HazardSolutionDesigner({config, onEvent}: WidgetProps<'hazard-solution-designer'>) {
  const key = JSON.stringify(config);
  const prompt = `Choose protections for ${config.hazard}.`;
  const [selected, setSelected] = useState<string[]>([]);
  const [checkedExact, setCheckedExact] = useState(false);
  const [status, setStatus] = useState(prompt);
  const {completed, completeOnce} = useCompletionLatch(key);
  const selectedInConfigOrder = orderedIds(selected, config.solutions.map((solution) => solution.id));
  const visibleComplete = completed && checkedExact && sameSet(selectedInConfigOrder, config.requiredIds);

  useEffect(() => {
    setSelected([]);
    setCheckedExact(false);
    setStatus(prompt);
  }, [key, prompt]);

  const emit = (next: string[], action: 'toggle-solution' | 'check' | 'reset') => {
    const ordered = orderedIds(next, config.solutions.map((solution) => solution.id));
    onEvent({type: 'interaction', action});
    onEvent({type: 'change', value: {selectedIds: ordered}});
    return ordered;
  };

  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter((selectedId) => selectedId !== id) : [...selected, id];
    setSelected(orderedIds(next, config.solutions.map((solution) => solution.id)));
    setCheckedExact(false);
    setStatus('Selection changed; check the revised hazard plan.');
    emit(next, 'toggle-solution');
  };

  const check = () => {
    const ordered = emit(selected, 'check');
    const isExact = sameSet(ordered, config.requiredIds);
    setCheckedExact(isExact);
    if (isExact) {
      setStatus('Hazard plan complete. This simplified authored model does not promise safety.');
      completeOnce(() => onEvent({type: 'complete', value: {selectedIds: ordered}}));
      return;
    }
    const poor = config.solutions.filter((solution) => ordered.includes(solution.id) && solution.effectiveness === 'poor');
    const missing = config.requiredIds.filter((id) => !ordered.includes(id)).map((id) => config.solutions.find((solution) => solution.id === id)!.label);
    const unnecessaryExtras = config.solutions.filter((solution) => ordered.includes(solution.id) && !config.requiredIds.includes(solution.id) && solution.effectiveness !== 'poor');
    const feedback = [
      poor.length ? `${poor.map((solution) => solution.label).join(', ')} ${poor.length === 1 ? 'is' : 'are'} poor choices; remove ${poor.length === 1 ? 'it' : 'them'}.` : '',
      missing.length ? `${missing.join(', ')} ${missing.length === 1 ? 'is' : 'are'} missing; add ${missing.length === 1 ? 'it' : 'them'}.` : '',
      unnecessaryExtras.length ? unnecessaryExtras.map((solution) => solution.effectiveness === 'partial'
        ? `${solution.label} is partial and is not needed in this authored plan; remove it.`
        : `${solution.label} is not needed in this authored plan; remove it.`).join(' ') : '',
    ].filter(Boolean).join(' ');
    setStatus(`Revise the plan. ${feedback}`);
  };

  const reset = () => {
    setSelected([]);
    setCheckedExact(false);
    setStatus(prompt);
    emit([], 'reset');
  };

  return <section className="card widget-experiment hazard" data-testid="widget-hazard-solution-designer" data-state={visibleComplete ? 'complete' : 'designing'} aria-describedby="hazard-model-note">
    <header>
      <h3>Hazard-solution designer</h3>
      <p id="hazard-model-note">This is a simplified authored mitigation-planning model, not emergency advice. It does not promise safety, prevent all damage, or eliminate risk.</p>
    </header>
    <section className="hazard-design-cards" aria-label={`Solutions for ${config.hazard}`}>
      {config.solutions.map((solution) => <article className="hazard-solution-card" key={solution.id} data-selected={selected.includes(solution.id) ? 'yes' : 'no'}>
        <strong>{solution.label}</strong>
        {selected.includes(solution.id) && <span className="hazard-selected-marker">Selected</span>}
        <button aria-label={`Toggle ${solution.label}`} aria-pressed={selected.includes(solution.id)} onClick={() => toggle(solution.id)}>Choose {solution.label}</button>
      </article>)}
    </section>
    <div className="hazard-controls">
      <button aria-label="Check solution" onClick={check}>Check solution</button>
      <button onClick={reset}>Start over</button>
    </div>
    <p role="status">{status}</p>
  </section>;
}
