import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Counts = { ones: number; tens: number; hundreds: number; thousands: number };
type Place = keyof Counts;
const ZERO: Counts = { ones: 0, tens: 0, hundreds: 0, thousands: 0 };
const places: Place[] = ['ones', 'tens', 'hundreds', 'thousands'];
const valueOf = (c: Counts) => c.ones + c.tens * 10 + c.hundreds * 100 + c.thousands * 1000;
const singular: Record<Place, string> = { ones: 'block', tens: 'ten block', hundreds: 'hundred block', thousands: 'thousand block' };

function Models({ c }: { c: Counts }) {
  return <div className="base-ten-models">
    <div role="group" aria-label={`${c.ones} ones blocks`}><b>Ones</b><div className="base-ten-ones">{Array.from({ length: c.ones }, (_, i) => <i data-testid="base-ten-one" className="base-ten-one" key={i} />)}</div></div>
    <div role="group" aria-label={`${c.tens} ten ${c.tens === 1 ? 'rod' : 'rods'}`}><b>Tens</b><div className="base-ten-tens">{Array.from({ length: c.tens }, (_, i) => <span data-testid="base-ten-ten" className="base-ten-ten" key={i}>{Array.from({ length: 10 }, (_, j) => <i key={j} />)}</span>)}</div></div>
    <div role="group" aria-label={`${c.hundreds} hundred ${c.hundreds === 1 ? 'flat' : 'flats'}`}><b>Hundreds</b><div className="base-ten-hundreds">{Array.from({ length: c.hundreds }, (_, i) => <span data-testid="base-ten-hundred" className="base-ten-hundred" key={i}>{Array.from({ length: 100 }, (_, j) => <i key={j} />)}</span>)}</div></div>
    <div role="group" aria-label={`${c.thousands} thousand ${c.thousands === 1 ? 'cube' : 'cubes'}`}><b>Thousands</b><div className="base-ten-thousands">{Array.from({ length: c.thousands }, (_, i) => <svg data-testid="base-ten-thousand" className="base-ten-thousand" viewBox="0 0 30 30" key={i}><path d="M5 10 15 4l10 6v12l-10 6-10-6Z M15 16v12 M5 10l10 6 10-6" /></svg>)}</div></div>
  </div>;
}

export default function BaseTenBlocks({ config, onEvent }: WidgetProps<'base-ten-blocks'>) {
  const key = JSON.stringify(config); const initial = config.initial ?? ZERO;
  const [counts, setCounts] = useState(initial); const [interacted, setInteracted] = useState(false); const { completeOnce } = useCompletionLatch(key);
  useEffect(() => { setCounts(initial); setInteracted(false); }, [key]);
  const commit = (next: Counts, action: 'add-block' | 'remove-block' | 'regroup' | 'reset') => { const value = valueOf(next); const isReset = action === 'reset'; setCounts(next); setInteracted(!isReset); onEvent({ type: 'interaction', action }); onEvent({ type: 'change', value: { ...next, value } }); if (!isReset && config.target !== undefined && value === config.target) completeOnce(() => onEvent({ type: 'complete', value: { ...next, value } })); };
  const value = valueOf(counts); const matched = interacted && config.target !== undefined && value === config.target;
  const regroup = (from: Place, to: Place) => commit({ ...counts, [from]: counts[from] - 10, [to]: counts[to] + 1 }, 'regroup');
  const ungroup = (from: Place, to: Place) => commit({ ...counts, [from]: counts[from] - 1, [to]: counts[to] + 10 }, 'regroup');
  const pairs: Array<[Place, Place, string, string]> = [['ones', 'tens', 'Regroup 10 ones into 1 ten', 'Ungroup 1 ten into 10 ones'], ['tens', 'hundreds', 'Regroup 10 tens into 1 hundred', 'Ungroup 1 hundred into 10 tens'], ['hundreds', 'thousands', 'Regroup 10 hundreds into 1 thousand', 'Ungroup 1 thousand into 10 hundreds']];
  return <section className="card widget-experiment base-ten" data-testid="widget-base-ten-blocks" data-state={matched ? 'complete' : 'building'} data-complete={matched ? 'yes' : 'no'}>
    <div className="widget-head"><h3 className="widget-title">Base-ten blocks</h3><button onClick={() => commit(ZERO, 'reset')}>Start over</button></div><Models c={counts} />
    <div className="base-ten-controls">{places.map(place => <div key={place}><span>{counts[place]} {place}</span><button aria-label={`Add one ${singular[place]}`} disabled={counts[place] >= 19} onClick={() => commit({ ...counts, [place]: counts[place] + 1 }, 'add-block')}>+</button><button aria-label={`Remove one ${singular[place]}`} disabled={!counts[place]} onClick={() => commit({ ...counts, [place]: counts[place] - 1 }, 'remove-block')}>−</button></div>)}</div>
    {config.allowRegroup && <div className="base-ten-regroup">{pairs.flatMap(([from, to, groupLabel, ungroupLabel]) => [<button key={groupLabel} aria-label={groupLabel} disabled={counts[from] < 10 || counts[to] >= 19} onClick={() => regroup(from, to)}>{groupLabel}</button>, <button key={ungroupLabel} aria-label={ungroupLabel} disabled={!counts[to] || counts[from] > 9} onClick={() => ungroup(to, from)}>{ungroupLabel}</button>])}</div>}
    <p data-testid="base-ten-counts">{counts.ones} ones, {counts.tens} ten</p><p data-testid="base-ten-value" aria-live="polite">{value}</p><p role="status">{matched ? 'Target complete.' : `${value} built.`}</p>
  </section>;
}
