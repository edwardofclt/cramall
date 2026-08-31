import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

export default function EnergyTransferBuilder({ config, onEvent }: WidgetProps<'energy-transfer-builder'>) {
  const key = JSON.stringify(config);
  const [path, setPath] = useState<string[]>([]);
  const [status, setStatus] = useState('Choose the source.');
  const { completeOnce } = useCompletionLatch(key);
  const complete = path.length === config.requiredPath.length && path.every((token, index) => token === config.requiredPath[index]);
  useEffect(() => { setPath([]); setStatus('Choose the source.'); }, [key]);
  const emit = (next: string[], action: 'append-path' | 'reset') => {
    setPath(next); onEvent({ type: 'interaction', action }); onEvent({ type: 'change', value: { path: next } });
    if (next.length === config.requiredPath.length && next.every((token, index) => token === config.requiredPath[index])) completeOnce(() => onEvent({ type: 'complete', value: { path: next } }));
  };
  const categoryFor = (token: string) => config.sources.includes(token) ? 'source' : config.transfers.includes(token) ? 'transfer' : 'target';
  const add = (token: string) => {
    const expected = config.requiredPath[path.length];
    if (token !== expected) { setStatus(`${token} is not the next transfer step. Keep your path and choose the next ${expected ? categoryFor(expected) : 'step'}.`); emit(path, 'append-path'); return; }
    const next = [...path, token]; setStatus(next.length === config.requiredPath.length ? 'Energy path complete.' : `Path: ${next.join(' to ')}. Choose the next transfer step.`); emit(next, 'append-path');
  };
  const groups: Array<[string, string[]]> = [['Source', config.sources], ['Transfer', config.transfers], ['Target', config.targets]];
  return <section className="card widget-experiment transfer" data-testid="widget-energy-transfer-builder" data-state={complete ? 'complete' : 'building'} data-complete={complete ? 'yes' : 'no'}>
    <header><h3>Energy transfer tracing model</h3><p>This simplified diagram traces transfers. Energy is inferred from observable changes or effects, not directly seen, and this app is not physical evidence.</p></header>
    <div className="transfer-model" aria-label="Source to transfer to target model">{groups.map(([label, tokens], index) => <div className="transfer-group" data-category={label.toLowerCase()} key={label}><h4>{label}</h4>{tokens.map((token) => <button key={token} aria-label={`Add ${token} to path`} aria-pressed={path.includes(token)} disabled={complete} onClick={() => add(token)}>{token}</button>)}{index < 2 && <span aria-hidden="true" className="transfer-arrow">→</span>}</div>)}</div>
    <div className="selected-energy-path" data-testid="selected-energy-path" aria-label="Selected connected energy path">{path.map((token, index) => <span key={`${token}-${index}`}><span data-testid={`selected-energy-node-${index}`} className="selected-energy-node" data-kind={categoryFor(token)}>{categoryFor(token)}: {token}</span>{index < path.length - 1 && <span data-testid="selected-energy-arrow" className="selected-energy-arrow" aria-hidden="true">→</span>}</span>)}</div>
    <p className="transfer-path" aria-label={`Current energy path: ${path.join(' to ') || 'empty'}`}>Path: {path.join(' → ') || 'none yet'}</p>
    <button className="transfer-reset" onClick={() => { setStatus('Choose the source.'); emit([], 'reset'); }}>Start over</button>
    <p role="status">{complete ? 'Energy path complete.' : status}</p>
  </section>;
}
