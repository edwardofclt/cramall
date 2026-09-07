import { useEffect, useMemo, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';
import { ActivityWorkbench } from '../ActivityWorkbench';
import './guide-led-math.css';

type Size = { rows: number; columns: number };
const pairKey = (rows: number, columns: number) => `${Math.min(rows, columns)} × ${Math.max(rows, columns)}`;
function factorPairs(target: number) {
  const pairs: string[] = [];
  for (let factor = 1; factor * factor <= target; factor++) if (target % factor === 0) pairs.push(pairKey(factor, target / factor));
  return pairs;
}

export default function ArrayBuilder({ config, onEvent }: WidgetProps<'array-builder'>) {
  const key = JSON.stringify(config);
  const task = config.task ?? 'editable';
  const initial = { rows: config.rows, columns: config.columns };
  const maxDimension = task === 'factor-hunt' ? Math.max(20, config.targetProduct ?? 20) : 20;
  const [size, setSize] = useState<Size>(initial);
  const [foundPairs, setFoundPairs] = useState<string[]>([]);
  const [bundles, setBundles] = useState<number[]>([]);
  const [amount, setAmount] = useState('');
  const [feedback, setFeedback] = useState('Build a model, then check your idea.');
  const [checked, setChecked] = useState(false);
  const { completeOnce } = useCompletionLatch(key);
  const product = size.rows * size.columns;
  const expectedPairs = useMemo(() => factorPairs(config.targetProduct ?? 1), [config.targetProduct]);
  const divisor = config.divisor ?? 1;
  const dividend = config.dividend ?? 0;
  const quotient = bundles.reduce((sum, bundle) => sum + bundle, 0);
  const remainder = dividend - quotient * divisor;
  const matches = (next: Size) => next.rows * next.columns === config.targetProduct && (config.targetRows === undefined || next.rows === config.targetRows) && (config.targetColumns === undefined || next.columns === config.targetColumns);
  const complete = task === 'division' ? bundles.length > 0 && remainder === 0 : task === 'factor-hunt' ? foundPairs.length === expectedPairs.length : checked && matches(size);
  useEffect(() => { setSize(initial); setFoundPairs([]); setBundles([]); setAmount(''); setChecked(false); setFeedback('Build a model, then check your idea.'); }, [key]);
  function commit(next: Size, action: 'change-rows' | 'change-columns') {
    setSize(next); setChecked(false);
    setFeedback('Your array changed. Check it when you are ready.');
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { ...next, product: next.rows * next.columns } });
  }
  function check() {
    setChecked(true);
    if (!matches(size)) {
      setFeedback(config.targetRows !== undefined ? 'Try again. The number of groups and the amount in each group must both match the problem.' : 'Try again. Count the rows and the counters in each row.');
      onEvent({ type: 'coach', cue: 'retry' }); return;
    }
    setFeedback(`Correct: ${size.rows} equal groups of ${size.columns} make ${product}.`);
    completeOnce(() => onEvent({ type: 'complete', value: { ...size, product } }));
  }
  function recordPair() {
    const pair = pairKey(size.rows, size.columns);
    onEvent({ type: 'interaction', action: 'change-rows' });
    onEvent({ type: 'change', value: { ...size, product } });
    if (product !== config.targetProduct) { setFeedback(`Try again. This array has ${product} counters. Match the target before recording.`); onEvent({ type: 'coach', cue: 'retry' }); return; }
    if (foundPairs.includes(pair)) { setFeedback('That pair is already recorded. Turning an array keeps the same factor pair. Try a new row count.'); onEvent({ type: 'coach', cue: 'retry' }); return; }
    const next = [...foundPairs, pair]; setFoundPairs(next); setFeedback(`Recorded ${pair}. Changing the row count can uncover another equal grouping.`);
    onEvent({ type: 'coach', cue: 'milestone' });
    if (next.length === expectedPairs.length) completeOnce(() => onEvent({ type: 'complete', value: { ...size, product } }));
  }
  function share() {
    const nextAmount = Number(amount);
    if (!Number.isInteger(nextAmount) || nextAmount <= 0 || nextAmount * divisor > remainder) {
      setFeedback('Try again. Choose a whole-number amount that fits in every group without using more than remains.'); onEvent({ type: 'coach', cue: 'retry' }); return;
    }
    const next = [...bundles, nextAmount]; const nextQuotient = quotient + nextAmount;
    setBundles(next); setAmount(''); setFeedback(`You put ${nextAmount} in each group, using ${nextAmount * divisor} altogether.`);
    onEvent({ type: 'interaction', action: 'change-rows' });
    onEvent({ type: 'change', value: { rows: nextQuotient, columns: divisor, product: dividend } });
    if (nextQuotient * divisor === dividend) completeOnce(() => onEvent({ type: 'complete', value: { rows: nextQuotient, columns: divisor, product: dividend } }));
    else onEvent({ type: 'coach', cue: 'milestone' });
  }
  function reset() {
    setSize(initial); setFoundPairs([]); setBundles([]); setAmount(''); setChecked(false); setFeedback('Build a model, then check your idea.');
    onEvent({ type: 'interaction', action: 'reset' });
    onEvent({ type: 'change', value: { ...initial, product: initial.rows * initial.columns } });
  }
  return <section className="card widget-experiment array-builder activity-shell math-activity" data-testid="widget-array-builder" data-state={complete ? 'complete' : 'building'} data-complete={complete ? 'yes' : 'no'}>
    <ActivityWorkbench label={task === 'division' ? 'Share into equal groups' : 'Build equal groups'} revealKey={complete ? "complete" : bundles.length || foundPairs.length || checked ? "record" : "build"} visual={<>
      <h3>{task === 'division' ? 'Share the collection' : 'Arrange the counters'}</h3>
      <p className="widget-task"><strong>Goal:</strong> {config.taskPrompt ?? (task === 'division' ? `Share ${dividend} into ${divisor} equal groups.` : `Build an array with ${config.targetProduct ?? product} counters.`)}</p>
      {task === 'division' ? <>
        <p>{dividend} ÷ {divisor}</p>
        <div className="math-share-groups" aria-label="Equal groups">{Array.from({ length: divisor }, (_, index) => <section className="math-share-group" data-testid="division-recipient" key={index}><strong>Group {index + 1}</strong><div className="math-share-bundles">{bundles.map((bundle, i) => <span className="math-share-bundle" key={i}>{bundle}</span>)}</div><p>{quotient} so far</p></section>)}</div>
        <output aria-label="Remaining to share">Remainder: {remainder}</output>
        <output data-testid="array-builder-quotient">Quotient: {quotient}</output>
      </> : <>
        <p className="array-builder-description">{size.rows} rows of {size.columns} counters.</p>
        <div className="array-builder-viewport" role="region" aria-label="Scrollable array model" tabIndex={0}><div role="grid" data-widget-grid aria-label={`${size.rows} rows by ${size.columns} columns`} style={{ gridTemplateColumns: `repeat(${size.columns}, minmax(24px, 1fr))` }}>{Array.from({ length: size.rows }, (_, row) => <div role="row" key={row}>{Array.from({ length: size.columns }, (_, column) => <span role="gridcell" className="array-builder-cell" aria-label={`Row ${row + 1}, column ${column + 1}`} key={column}><span aria-hidden="true">●</span></span>)}</div>)}</div></div>
        <output>{size.rows} × {size.columns} = {product}</output>
      </>}
    </>}>
      {task === 'division' ? <section className="math-task"><h4>1 · Choose a fair amount</h4><p>Enter how many to put in each of the {divisor} groups. Repeat with smaller amounts until none remain.</p><label>Amount for each group<input type="number" min="1" step="1" value={amount} onChange={event => setAmount(event.target.value)} /></label><button type="button" disabled={remainder === 0 || !amount.trim()} onClick={share}>Share into equal groups</button></section> : <section className="math-task"><h4>1 · Build your groups</h4><div className="array-builder-controls" aria-label="Array controls">
        <button aria-label="Remove one row" disabled={!config.editable || size.rows === 1} onClick={() => commit({ ...size, rows: size.rows - 1 }, 'change-rows')}>− row</button>
        <button aria-label="Add one row" disabled={!config.editable || size.rows === maxDimension} onClick={() => commit({ ...size, rows: size.rows + 1 }, 'change-rows')}>+ row</button>
        <button aria-label="Remove one column" disabled={!config.editable || size.columns === 1} onClick={() => commit({ ...size, columns: size.columns - 1 }, 'change-columns')}>− column</button>
        <button aria-label="Add one column" disabled={!config.editable || size.columns === maxDimension} onClick={() => commit({ ...size, columns: size.columns + 1 }, 'change-columns')}>+ column</button>
        <button onClick={task === 'factor-hunt' ? recordPair : check}>{task === 'factor-hunt' ? 'Record current factor pair' : 'Check my groups'}</button>
      </div></section>}
      <p className="math-feedback" aria-label="Array check feedback" role="status">{feedback}</p>
      <section className="math-task" data-activity-reveal={bundles.length || foundPairs.length || checked ? "" : undefined}><h4>2 · Compare your record</h4>
        {task === 'division' ? <div aria-label="Partial quotient record">{bundles.length ? bundles.map((bundle, index) => <p className="math-record" key={index}>{bundle * divisor} ÷ {divisor} = {bundle}</p>) : <p>No amounts shared yet.</p>}{complete && <p>Each group has {quotient}. Adding {bundles.join(' + ')} gives the quotient. Multiplying {quotient} by {divisor} checks that all {dividend} were shared.</p>}</div> : task === 'factor-hunt' ? <div data-testid="array-builder-found-pairs"><strong>Unique pairs found:</strong> {foundPairs.length ? foundPairs.map(pair => <p data-testid="array-builder-factor-pair" className="math-record" key={pair}>{pair}</p>) : 'None yet.'}<p>{foundPairs.length} of {expectedPairs.length} unique pairs found.</p>{complete && <p>Every factor pair found. Reversed rows and columns describe a turn of the same array.</p>}</div> : <p>{complete ? `Your model shows ${size.rows} times as many as ${size.columns}. Each row contains the same amount.` : 'How does the row count connect to the number of equal groups in the problem?'}</p>}
      </section>
      <button type="button" onClick={reset}>Start over</button>
    </ActivityWorkbench>
  </section>;
}
