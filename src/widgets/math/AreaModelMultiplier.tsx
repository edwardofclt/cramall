import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';
import { ActivityWorkbench } from '../ActivityWorkbench';
import './guide-led-math.css';

type Cell = { id: string; a: number; b: number };

export default function AreaModelMultiplier({ config, onEvent }: WidgetProps<'area-model-multiplier'>) {
  const key = JSON.stringify(config);
  const partsA = config.splitA ?? [config.a];
  const partsB = config.splitB ?? [config.b];
  const cells: Cell[] = partsA.flatMap((a, row) => partsB.map((b, column) => ({ id: `${row}-${column}`, a, b })));
  const product = config.a * config.b;
  const unitSquareMode = config.revealMode === 'all' && cells.length === 1;
  const [selected, setSelected] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState<number | null>(null);
  const [firstGuess, setFirstGuess] = useState<number | null>(null);
  const { completeOnce } = useCompletionLatch(key);
  const correct = checked === product;
  const visiblyComplete = correct && selected.length === cells.length;
  useEffect(() => { setSelected([]); setAnswer(''); setChecked(null); setFirstGuess(null); }, [key]);

  function finish(next: string[], nextChecked: number | null) {
    if (nextChecked === product && next.length === cells.length) completeOnce(() => onEvent({ type: 'complete', value: { product } }));
  }
  function select(id: string) {
    const next = selected.includes(id) ? selected.filter(cell => cell !== id) : [...selected, id];
    setSelected(next);
    onEvent({ type: 'interaction', action: 'select-cell' });
    onEvent({ type: 'change', value: { selectedCells: next.length, product } });
    if (next.length > selected.length && next.length === 1) onEvent({ type: 'coach', cue: 'strategy' });
    finish(next, checked);
  }
  function check() {
    if (!answer.trim()) return;
    const value = Number(answer);
    setChecked(value); setFirstGuess(previous => previous ?? value);
    onEvent({ type: 'coach', cue: value === product ? 'milestone' : 'retry' });
    finish(selected, value);
  }
  function reset() {
    setSelected([]); setAnswer(''); setChecked(null); setFirstGuess(null);
    onEvent({ type: 'interaction', action: 'reset' });
    onEvent({ type: 'change', value: { selectedCells: 0, product } });
  }
  const partialSum = cells.map(cell => checked !== null && selected.includes(cell.id) ? String(cell.a * cell.b) : '?').join(' + ');
  return <section className="card widget-experiment area-model activity-shell math-activity" data-testid="widget-area-model-multiplier" data-state={visiblyComplete ? 'complete' : 'building'} data-complete={visiblyComplete ? 'yes' : 'no'}>
    <ActivityWorkbench label="Build an area model" revealKey={firstGuess === null ? "predict" : "inspect"} visual={<>
      <h3>{unitSquareMode ? 'Cover the rectangle' : 'Find the area in parts'}</h3>
      <p>How many square units cover a {config.a} by {config.b} rectangle?</p>
      <div className="area-model-factors" aria-label={`Factors: ${config.a} times ${config.b}`}><span>{config.a} = {partsA.join(' + ')}</span><span>{config.b} = {partsB.join(' + ')}</span></div>
      <div className="math-area-surface">
        <svg className="math-area-diagram" viewBox={`0 0 ${config.a} ${config.b}`} role="img" aria-label={`Rectangle: ${config.a} units wide and ${config.b} units high.`}>
          {cells.map((cell, index) => {
            const column = Math.floor(index / partsB.length);
            const row = index % partsB.length;
            const x = partsA.slice(0, column).reduce((sum, part) => sum + part, 0);
            const y = partsB.slice(0, row).reduce((sum, part) => sum + part, 0);
            return <rect key={cell.id} x={x} y={y} width={cell.a} height={cell.b} data-selected={selected.includes(cell.id)} vectorEffect="non-scaling-stroke" />;
          })}
          {unitSquareMode && Array.from({ length: product }, (_, index) => <rect className="math-area-unit" role="gridcell" aria-label={`Unit square ${index + 1}`} key={index} x={index % config.a} y={Math.floor(index / config.a)} width="1" height="1" vectorEffect="non-scaling-stroke" />)}
        </svg>
      </div>
      {unitSquareMode && <p data-testid="area-model-unit-square-count">{correct ? `${product} unit squares cover the rectangle.` : 'Each small square covers one square unit.'}</p>}
      <output data-testid="area-model-partial-sum">{partialSum}{visiblyComplete ? ` = ${product}` : ''}</output>
      <output data-testid="area-model-total">{config.a} × {config.b} = {correct ? product : '?'}</output>
    </>}>
      <section className="math-task"><h4>1 · Plan your total</h4><p>Use the side lengths. Enter a total before uncovering the partial products.</p>
        <label>My total area<input type="number" min="0" value={answer} onChange={event => { setAnswer(event.target.value); setChecked(null); }} /></label>
        <button type="button" disabled={!answer.trim()} onClick={check}>Check my total</button>
        <p aria-label="Area answer feedback" role="status">{checked === null ? 'Your answer is not checked yet.' : correct ? 'Correct total. Inspect each part to connect it to the whole.' : 'Try again. Inspect the parts and add their areas. Count every part once.'}</p>
        {firstGuess !== null && <p aria-label="Area prediction record">Your first total was {firstGuess} square units.</p>}
      </section>
      <section className="math-task" data-activity-reveal={firstGuess !== null ? "" : undefined}><h4>2 · Inspect and compare</h4><p>Choose a part below to highlight its region. Its side lengths tell you its partial area.</p>
        <div className="math-area-controls"><div className="math-area-parts" role="group" aria-label={`Area model partitions for ${config.a} times ${config.b}`} style={{ gridTemplateColumns: partsB.map(() => 'minmax(44px, 1fr)').join(' ') }}>
          {cells.map(cell => <button type="button" key={cell.id} aria-label={`Select ${cell.a} by ${cell.b} cell`} aria-pressed={selected.includes(cell.id)} onClick={() => select(cell.id)}>
            <span>{cell.a} × {cell.b}{checked !== null && selected.includes(cell.id) ? ` = ${cell.a * cell.b}` : ''}</span>
            <small>{selected.includes(cell.id) ? 'Highlighted' : 'Inspect this part'}</small>
          </button>)}
        </div></div>
        <p aria-label="Area observation">{selected.length} of {cells.length} regions selected.</p>
        {visiblyComplete && <p role="status">Correct: {cells.map(cell => cell.a * cell.b).join(' + ')} = {product}. The parts cover the whole rectangle without gaps or overlaps.</p>}
      </section>
      <button type="button" className="area-model-reset" onClick={reset}>Start over</button>
    </ActivityWorkbench>
  </section>;
}
