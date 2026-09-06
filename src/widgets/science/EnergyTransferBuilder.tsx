import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type CoachPhase = 'none' | 'strategy' | 'retry';
type ReceiverEffect = 'warmer' | 'brighter' | 'moving' | 'vibrating';

const receiverEffects: ReceiverEffect[] = ['warmer', 'brighter', 'moving', 'vibrating'];

function expectedEffectFor(target: string): ReceiverEffect {
  const normalized = target.toLocaleLowerCase();
  if (/paper bits?|tuning|vibrat|trembl/.test(normalized)) return 'vibrating';
  if (/motor|move|turn|shaft/.test(normalized)) return 'moving';
  if (/lamp|light|card|bright/.test(normalized)) return 'brighter';
  return 'warmer';
}

export default function EnergyTransferBuilder({ config, onEvent }: WidgetProps<'energy-transfer-builder'>) {
  const key = JSON.stringify(config);
  const [path, setPath] = useState<string[]>([]);
  const [effect, setEffect] = useState<ReceiverEffect | null>(null);
  const [status, setStatus] = useState('Choose the source.');
  const [coachPhase, setCoachPhase] = useState<CoachPhase>('none');
  const { completeOnce } = useCompletionLatch(key);
  const pathComplete = path.length === config.requiredPath.length && path.every((token, index) => token === config.requiredPath[index]);
  const complete = pathComplete && effect === expectedEffectFor(config.requiredPath[config.requiredPath.length - 1]!);
  useEffect(() => {
    setPath([]);
    setEffect(null);
    setStatus('Choose the source.');
    setCoachPhase('none');
  }, [key]);

  const emit = (next: string[], action: 'append-path' | 'reset') => {
    setPath(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { path: next } });
    if (next.length === config.requiredPath.length && next.every((token, index) => token === config.requiredPath[index])) onEvent({ type: 'coach', cue: 'milestone' });
  };
  const categoryFor = (token: string) => config.sources.includes(token) ? 'source'
    : config.transfers.includes(token) ? 'transfer'
      : config.targets.includes(token) ? 'target' : 'distractor';
  const coachWrong = () => {
    const cue = coachPhase === 'none' ? 'strategy' : 'retry';
    setCoachPhase(cue);
    onEvent({ type: 'coach', cue });
  };
  const add = (token: string) => {
    if (pathComplete) return;
    if ((config.distractors ?? []).includes(token)) {
      setStatus(`${token} is a distractor, not part of this transfer. Trace source → route → receiver.`);
      coachWrong();
      return;
    }
    const expected = config.requiredPath[path.length];
    if (token !== expected) {
      setStatus(`${token} is not the next transfer step. Choose the next ${expected ? categoryFor(expected) : 'step'} in the source → route → receiver path.`);
      emit(path, 'append-path');
      coachWrong();
      return;
    }
    const next = [...path, token];
    setEffect(null);
    setStatus(next.length === config.requiredPath.length ? `Path complete. Now choose an observable effect at ${token}.` : `Path: ${next.join(' to ')}. Choose the next transfer step.`);
    emit(next, 'append-path');
  };
  const removeAt = (index: number) => {
    if (pathComplete && effect) return;
    const next = path.slice(0, index);
    setEffect(null);
    setStatus(next.length ? `Path: ${next.join(' to ')}. Choose the next transfer step.` : 'Choose the source.');
    emit(next, 'append-path');
  };
  const chooseEffect = (nextEffect: ReceiverEffect) => {
    if (!pathComplete) return;
    setEffect(nextEffect);
    const expected = expectedEffectFor(config.requiredPath[config.requiredPath.length - 1]!);
    if (nextEffect !== expected) {
      setStatus(`${nextEffect} is not the clearest observable effect for this receiver. Look at what the receiver could visibly do.`);
      coachWrong();
      return;
    }
    setStatus(`Observed ${nextEffect} at the receiver. That observable effect supports the inference that energy moved.`);
    completeOnce(() => onEvent({ type: 'complete', value: { path } }));
  };
  const reset = () => {
    setPath([]);
    setEffect(null);
    setStatus('Choose the source.');
    setCoachPhase('none');
    onEvent({ type: 'interaction', action: 'reset' });
    onEvent({ type: 'change', value: { path: [] } });
  };
  const groups: Array<[string, string[], string]> = [
    ['Source', config.sources, 'source'],
    ['Transfer route', config.transfers, 'transfer'],
    ['Receiver', config.targets, 'target'],
    ...((config.distractors ?? []).length ? [['Distractors', config.distractors ?? [], 'distractor'] as [string, string[], string]] : []),
  ];
  return <section className="card widget-experiment transfer" data-testid="widget-energy-transfer-builder" data-state={complete ? 'complete' : 'building'} data-complete={complete ? 'yes' : 'no'}>
    <header><h3>Energy transfer tracing model</h3><p>This simplified diagram traces transfers. Energy is inferred from observable changes or effects, not directly seen, and this app is not physical evidence.</p></header>
    <div className="transfer-model" aria-label="Source to transfer to target model">{groups.map(([label, tokens, category], index) => <div className="transfer-group" data-category={category} key={label}><h4>{label}</h4>{tokens.map((token) => <button key={token} aria-label={`Add ${token} to path`} aria-pressed={path.includes(token)} disabled={pathComplete || category === 'distractor' && complete} onClick={() => add(token)}>{token}</button>)}{index < 2 && <span aria-hidden="true" className="transfer-arrow">→</span>}</div>)}</div>
    <div className="selected-energy-path" data-testid="selected-energy-path" aria-label="Selected connected energy path">{path.length ? path.map((token, index) => <span key={`${token}-${index}`} className="selected-energy-slot" data-testid={`selected-energy-slot-${index}`}><span data-testid={`selected-energy-node-${index}`} className="selected-energy-node" data-kind={categoryFor(token)}>{categoryFor(token)}: {token}</span><button type="button" className="selected-energy-remove" aria-label={`Remove ${token} from path`} onClick={() => removeAt(index)} disabled={pathComplete}>Remove</button>{index < path.length - 1 && <span data-testid="selected-energy-arrow" className="selected-energy-arrow" aria-hidden="true">→</span>}</span>) : <span className="conversion-empty">Your source → route → receiver path will snap here.</span>}</div>
    <p className="transfer-path" aria-label={`Current energy path: ${path.join(' to ') || 'empty'}`}>Path: {path.join(' → ') || 'none yet'}</p>
    {pathComplete && <div className="receiver-effect-board" data-testid="receiver-effect-board" aria-label="Observable receiver effect choices"><h4>What can you observe at the receiver?</h4><p>Choose a visible change, then use it as evidence for your energy-transfer inference.</p>{receiverEffects.map((candidate) => <button key={candidate} type="button" aria-pressed={effect === candidate} onClick={() => chooseEffect(candidate)}>Observe {candidate} effect</button>)}</div>}
    <button className="transfer-reset" onClick={reset}>Start over</button>
    <p role="status">{complete ? `Observed ${effect} at the receiver. Energy is inferred from that effect.` : status}</p>
  </section>;
}
