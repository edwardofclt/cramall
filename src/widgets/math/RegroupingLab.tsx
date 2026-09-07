import { useEffect, useRef, useState } from 'react';
import { ActivityWorkbench } from '../ActivityWorkbench';
import { useCompletionLatch } from '../useCompletionLatch';
import type { WidgetProps } from '../registry';
import './regrouping-lab.css';

const units = [1, 10, 100, 1000, 10000, 100000];
const names = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands'];
const short = ['1', '10', '100', '1k', '10k', '100k'];
const fmt = (n: number) => n.toLocaleString('en-US');
const digits = (n: number, size: number) => units.slice(0, size).map(unit => Math.floor(n / unit) % 10);

function Lab({ config, onEvent }: WidgetProps<'regrouping-lab'>) {
  const result = config.operation === 'add' ? config.a + config.b : config.a - config.b;
  const size = String(Math.max(config.a, config.b, result)).length;
  const a = digits(config.a, size), b = digits(config.b, size);
  const [choice, setChoice] = useState<'add' | 'subtract' | null>(null);
  const [started, setStarted] = useState(false);
  const [counters, setCounters] = useState(a);
  const [column, setColumn] = useState(0);
  const [removed, setRemoved] = useState(false);
  const [entry, setEntry] = useState('');
  const [operationFeedback, setOperationFeedback] = useState('Choose an operation for this situation.');
  const [columnFeedback, setColumnFeedback] = useState('');
  const [exchangeRecord, setExchangeRecord] = useState('No exchanges yet.');
  const [explanation, setExplanation] = useState<boolean | null>(null);
  const first = useRef<HTMLButtonElement>(null);
  const { completeOnce } = useCompletionLatch(JSON.stringify(config));
  const done = column === size;
  const inverse = config.purpose === 'inverse-check';
  const complete = done && explanation === true;
  useEffect(() => { if (!started) first.current?.focus({preventScroll:true}); }, [started]);

  function choose(operation: 'add' | 'subtract') {
    setChoice(operation);
    onEvent({type:'interaction',action:'choose-operation'});
    if (operation !== config.operation) {
      setOperationFeedback(`Try again. Does the situation ask you to ${config.operation === 'add' ? 'join amounts or rebuild a total' : 'remove an amount or find a difference'}?`);
      onEvent({type:'coach',cue:'retry'}); return;
    }
    setStarted(true); setCounters(config.operation === 'add' ? a.map((count, i) => count + b[i]) : a);
    setOperationFeedback(config.operation === 'add' ? 'Addition joins these amounts. Both sets of counters are now in the trays.' : 'Subtraction removes the second amount from the first. Start with the ones.');
    onEvent({type:'coach',cue:'strategy'});
  }
  function exchange(from: number, to: number, amount: number) {
    const next = [...counters]; next[from] -= amount; next[to] += amount === 10 ? 1 : 10;
    setCounters(next); setColumnFeedback(''); setEntry('');
    setExchangeRecord(`Exchanged ${amount} × ${fmt(units[from])} for ${amount === 10 ? 1 : 10} × ${fmt(units[to])}. The total value stayed the same.`);
    onEvent({type:'interaction',action:'exchange'}); onEvent({type:'change',value:{counters:next,column}});
  }
  function remove() {
    if (removed || counters[column] < b[column]) return;
    const next = [...counters]; next[column] -= b[column]; setCounters(next); setRemoved(true); setEntry('');
    setColumnFeedback(`Removed ${b[column]} ${names[column]}. Count what remains in this tray.`);
    onEvent({type:'interaction',action:'remove'}); onEvent({type:'change',value:{counters:next,column}});
  }
  function checkColumn() {
    if (config.operation === 'subtract' && !removed) return;
    onEvent({type:'interaction',action:'check-column'});
    if (counters[column] > 9 || entry.trim() === '' || Number(entry) !== counters[column]) {
      setColumnFeedback(counters[column] > 9 ? 'Try again. Exchange ten counters before recording a single digit.' : 'Try again. Count the counters in this place, then enter that digit.');
      onEvent({type:'coach',cue:'retry'}); return;
    }
    setColumn(column + 1); setEntry(''); setRemoved(false); setColumnFeedback('');
    if (column + 1 === size) onEvent({type:'coach',cue:'milestone'});
  }
  function explain(correct: boolean) {
    setExplanation(correct); onEvent({type:'interaction',action:'explain'});
    if (correct) completeOnce(() => onEvent({type:'complete',value:{result}}));
    else onEvent({type:'coach',cue:'retry'});
  }
  function reset() {
    setChoice(null); setStarted(false); setCounters(a); setColumn(0); setRemoved(false); setEntry(''); setExplanation(null);
    setOperationFeedback('Choose an operation for this situation.'); setColumnFeedback(''); setExchangeRecord('No exchanges yet.');
    onEvent({type:'interaction',action:'reset'}); first.current?.focus({preventScroll:true});
  }

  return <section className="activity-shell regrouping-lab" data-testid="widget-regrouping-lab" data-state={complete ? 'complete' : done ? 'explain' : started ? 'building' : 'choosing'}>
    <ActivityWorkbench label="Place-value exchanges" revealKey={done ? 'explain' : started ? `column-${column}` : 'choose'} visual={<>
      <h3>{inverse ? 'Rebuild the original amount' : 'Exchange equal values'}</h3>
      <p className="regroup-problem">{fmt(config.a)} {started ? config.operation === 'add' ? '+' : '−' : 'and'} {fmt(config.b)}</p>
      <div className="regroup-board" style={{gridTemplateColumns:`repeat(${size},minmax(0,1fr))`}} aria-label="Place-value counter trays">
        {units.slice(0,size).map((unit,i) => <div key={unit} className="regroup-tray" data-active={started && !done && column === i} style={{gridColumn:size-i,gridRow:1}}>
          <strong aria-label={`Each counter is worth ${fmt(unit)}`}>{short[i]}</strong>
          <span className="regroup-original" aria-label={`Starting digits: ${a[i]} and ${b[i]} ${names[i]}`}>{a[i]}<br/>{b[i]}</span>
          <div role="group" aria-label={`${started ? counters[i] : a[i]} ${names[i]} in the tray`} data-counter-count={started ? counters[i] : a[i]} data-unit={unit}>
            <b>{started ? counters[i] : a[i]}</b>
            <div className="regroup-counters" aria-hidden="true">{Array.from({length:started ? counters[i] : a[i]},(_,j)=><i key={j}/>)}</div>
          </div>
          <span className="regroup-digit" aria-label={`${names[i]} result ${started && column > i ? counters[i] : 'not recorded'}`}>{started && column > i ? counters[i] : '·'}</span>
        </div>)}
      </div>
      <p className="regroup-key">Top rows: starting digits. Each counter is worth its tray’s label. “k” means thousand.</p>
      {done && <p className="regroup-result" aria-label="Result record">{fmt(config.a)} {config.operation === 'add' ? '+' : '−'} {fmt(config.b)} = {fmt(result)}</p>}
    </>}>
      <p>{config.context}</p>
      <section className="regroup-task"><h4>1 · Choose the operation</h4>
        <button ref={first} type="button" disabled={started} aria-pressed={choice === 'add'} onClick={()=>choose('add')}>Add the amounts</button>
        <button type="button" disabled={started} aria-pressed={choice === 'subtract'} onClick={()=>choose('subtract')}>Subtract the amounts</button>
        <p aria-label="Operation feedback">{operationFeedback}</p>
      </section>
      {started && !done && <section className="regroup-task" data-activity-reveal><h4>2 · Work in the {names[column]}</h4>
        {config.operation === 'add' ? <>
          <p>Count this tray. Exchange ten counters for one in the next place when needed.</p>
          {column < size - 1 && <button type="button" disabled={counters[column] < 10} onClick={()=>exchange(column,column+1,10)}>Exchange 10 × {fmt(units[column])} for 1 × {fmt(units[column+1])}</button>}
        </> : <>
          <p>Remove {b[column]} {names[column]}. If there are too few, exchange from the next place. Work across empty trays one place at a time.</p>
          {units.slice(column+1,size).map((unit,index)=>{const from=column+1+index;return <button key={unit} type="button" disabled={removed || counters[from] < 1 || counters[from-1] > 9} onClick={()=>exchange(from,from-1,1)}>Exchange 1 × {fmt(unit)} for 10 × {fmt(unit/10)}</button>;})}
          {column < size - 1 && <button type="button" disabled={counters[column] < 10} onClick={()=>exchange(column,column+1,10)}>Exchange 10 × {fmt(units[column])} for 1 × {fmt(units[column+1])}</button>}
          <button type="button" disabled={removed || counters[column] < b[column]} onClick={remove}>Remove {b[column]} {names[column]}</button>
        </>}
        <label>Result digit<input type="number" min="0" max="9" step="1" value={entry} onChange={event=>{setEntry(event.target.value);setColumnFeedback('');}}/></label>
        <button type="button" disabled={!entry.trim() || (config.operation === 'subtract' && !removed)} onClick={checkColumn}>Check this column</button>
        <p role="status" aria-label="Column feedback">{columnFeedback}</p>
      </section>}
      {started && <p aria-label="Exchange record">{exchangeRecord}</p>}
      {done && <section className="regroup-task" data-activity-reveal><h4>3 · Explain the check</h4>
        <p>{inverse ? `The original subtraction was ${fmt(result)} − ${fmt(config.b)}. How does your addition help check ${fmt(config.a)}?` : 'Why can you exchange counters while solving this problem?'}</p>
        <button type="button" data-outcome={explanation === false ? 'retry' : undefined} onClick={()=>explain(false)}>{inverse ? 'Addition cannot check subtraction' : 'An exchange changes the total value'}</button>
        <button type="button" data-outcome={explanation === true ? 'correct' : undefined} onClick={()=>explain(true)}>{inverse ? 'Adding the removed amount rebuilds the original total' : 'An exchange keeps the same total value'}</button>
        <p role="status" aria-label="Explanation feedback">{explanation === null ? 'Use the tray changes to explain.' : explanation ? inverse ? 'Correct. The parts rebuild the original total, so the subtraction checks.' : 'Correct. Ten smaller units have the same value as one unit in the next place.' : 'Try again. Compare the values before and after your exchanges, and what your result represents.'}</p>
      </section>}
      <button type="button" onClick={reset}>Start over</button>
    </ActivityWorkbench>
  </section>;
}
export default function RegroupingLab(props: WidgetProps<'regrouping-lab'>) { return <Lab key={JSON.stringify(props.config)} {...props}/>; }
