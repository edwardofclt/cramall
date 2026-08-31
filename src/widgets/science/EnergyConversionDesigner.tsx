import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

export default function EnergyConversionDesigner({ config, onEvent }: WidgetProps<'energy-conversion-designer'>) {
  const key = JSON.stringify(config);
  const [chain, setChain] = useState<string[]>([]);
  const [status, setStatus] = useState('Choose the required starting component.');
  const { completeOnce } = useCompletionLatch(key);
  const componentFor = (id: string) => config.components.find((component) => component.id === id)!;
  const hasValidConnections = (ids: string[]) => ids.every((id, index) => index === 0 || componentFor(ids[index - 1]!).energyOut === componentFor(id).energyIn);
  const visiblyComplete = chain[0] === config.requiredStart && chain[chain.length - 1] === config.requiredEnd && hasValidConnections(chain);

  useEffect(() => { setChain([]); setStatus('Choose the required starting component.'); }, [key]);

  const emit = (next: string[], action: 'append-chain' | 'reset') => {
    setChain(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { chain: next } });
    const complete = next[0] === config.requiredStart && next[next.length - 1] === config.requiredEnd && hasValidConnections(next);
    if (complete) completeOnce(() => onEvent({ type: 'complete', value: { chain: next } }));
  };
  const add = (id: string) => {
    const selected = componentFor(id);
    if (!chain.length && id !== config.requiredStart) {
      setStatus(`${selected.label} is not the required start. Choose ${componentFor(config.requiredStart).label}.`);
      emit(chain, 'append-chain');
      return;
    }
    if (chain.length) {
      const previous = componentFor(chain[chain.length - 1]!);
      if (previous.energyOut !== selected.energyIn) {
        setStatus(`${previous.label} outputs ${previous.energyOut}, which does not connect to ${selected.label}'s ${selected.energyIn} input.`);
        emit(chain, 'append-chain');
        return;
      }
    }
    const next = [...chain, id];
    const completesRequiredChain = next[0] === config.requiredStart && next[next.length - 1] === config.requiredEnd && hasValidConnections(next);
    setStatus(completesRequiredChain
      ? 'The selected conversion chain connects the required endpoints.'
      : `Chain: ${next.map((componentId) => componentFor(componentId).label).join(' to ')}.`);
    emit(next, 'append-chain');
  };
  const reset = () => {
    setStatus('Choose the required starting component.');
    emit([], 'reset');
  };

  return <section className="card widget-experiment conversion" data-testid="widget-energy-conversion-designer" data-state={visiblyComplete ? 'complete' : 'building'}>
    <header>
      <h3>Energy conversion chain model</h3>
      <p>Simplified energy-conversion model: energy is not directly seen here, and this app is not physical evidence. Use the component labels to connect conversions with observable effects when the authored setup supports them.</p>
      <p>Start with {componentFor(config.requiredStart).label} and end with {componentFor(config.requiredEnd).label}. Each outgoing energy label must match the next incoming energy label.</p>
    </header>
    <div className="conversion-options" aria-label="Available energy components">
      {config.components.map((component) => <article className="conversion-option" key={component.id}>
        <h4>{component.label}</h4><p>Input: {component.energyIn}</p><p>Output: {component.energyOut}</p>
        <button aria-label={`Add ${component.label}`} onClick={() => add(component.id)}>Add {component.label}</button>
      </article>)}
    </div>
    <div className="conversion-chain" data-testid="conversion-chain" role="group" aria-label={`Selected energy conversion chain: ${chain.map((id) => componentFor(id).label).join(' to ') || 'empty'}`}>
      {chain.length ? chain.map((id, index) => {
        const component = componentFor(id);
        return <span className="conversion-chain-part" key={`${id}-${index}`}>
          <article className="conversion-node" data-component-id={id}><strong>{id}: {component.label}</strong><span>Input: {component.energyIn}</span><span>Output: {component.energyOut}</span></article>
          {index < chain.length - 1 && <span data-testid="conversion-connector" className="conversion-connector" aria-label={`${component.energyOut} connects to next component`}>{component.energyOut} →</span>}
        </span>;
      }) : <span className="conversion-empty">Your selected chain will appear here.</span>}
    </div>
    <button className="conversion-reset" aria-label="Start over" onClick={reset}>Start over</button>
    <p role="status">{status}</p>
  </section>;
}
