import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Cell = { id: string; a: number; b: number };

export default function AreaModelMultiplier({ config, onEvent }: WidgetProps<'area-model-multiplier'>) {
  const key = JSON.stringify(config);
  const partsA = config.splitA ?? [config.a];
  const partsB = config.splitB ?? [config.b];
  const cells: Cell[] = partsA.flatMap((a, row) => (
    partsB.map((b, column) => ({ id: `${row}-${column}`, a, b }))
  ));
  const product = config.a * config.b;
  const progressive = config.revealMode === 'progressive';
  const unitSquareMode = config.revealMode === 'all' && cells.length === 1;
  const [selected, setSelected] = useState<string[]>([]);
  const { completed, completeOnce } = useCompletionLatch(key);
  const matchesCurrentTarget = config.targetProduct === product && selected.length === cells.length;
  const visiblyComplete = completed && matchesCurrentTarget;

  useEffect(() => setSelected([]), [key]);

  const commit = (next: string[], action: 'select-cell' | 'reset') => {
    const movedForward = next.length > selected.length;
    const movedBackward = next.length < selected.length;
    setSelected(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { selectedCells: next.length, product } });
    if (config.targetProduct === product && next.length === cells.length) {
      completeOnce(() => onEvent({ type: 'complete', value: { product } }));
    } else if (action === 'select-cell' && movedForward) {
      onEvent({ type: 'coach', cue: 'milestone' });
    } else if (action === 'select-cell' && movedBackward) {
      onEvent({ type: 'coach', cue: 'retry' });
    }
  };

  const selectedProducts = cells.map((cell) => (
    selected.includes(cell.id) ? cell.a * cell.b : null
  ));
  const partialSum = selectedProducts.map((value) => value === null ? '?' : String(value)).join(' + ');
  const splitColumns = config.revealMode === undefined
    ? `repeat(${partsB.length}, minmax(44px, 1fr))`
    : partsB.map((part) => `${part}fr`).join(' ');
  const splitRows = config.revealMode === undefined
    ? undefined
    : partsA.map((part) => `${part}fr`).join(' ');

  return (
    <section
      className="card widget-experiment area-model"
      data-testid="widget-area-model-multiplier"
      data-state={visiblyComplete ? 'complete' : 'building'}
      data-complete={visiblyComplete ? 'yes' : 'no'}
    >
      <div className="area-model-factors" aria-label={`Factors: ${config.a} times ${config.b}`}>
        <span>{config.a} = {partsA.join(' + ')}</span>
        <span>{config.b} = {partsB.join(' + ')}</span>
      </div>
      <div
        className="area-model-grid"
        data-widget-grid
        role="group"
        aria-label={`Area model partitions for ${config.a} times ${config.b}`}
        style={{ gridTemplateColumns: splitColumns, ...(splitRows ? { gridTemplateRows: splitRows } : {}) }}
      >
        {cells.map((cell) => {
          const isSelected = selected.includes(cell.id);
          const showProduct = !progressive || isSelected;
          return (
            <button
              className="area-model-cell"
              key={cell.id}
              aria-label={`Select ${cell.a} by ${cell.b} cell`}
              aria-pressed={isSelected}
              onClick={() => commit(
                isSelected ? selected.filter((id) => id !== cell.id) : selected.concat(cell.id),
                'select-cell',
              )}
              style={unitSquareMode ? { display: 'grid', gridTemplateColumns: `repeat(${cell.b}, minmax(24px, 1fr))` } : undefined}
            >
              {unitSquareMode && Array.from({ length: cell.a * cell.b }, (_, index) => (
                <span
                  role="gridcell"
                  className="area-model-unit-square"
                  aria-label={`Unit square ${index + 1} of ${cell.a * cell.b}`}
                  key={index}
                >
                  <span aria-hidden="true">□</span>
                </span>
              ))}
              <span className="area-model-cell-label">{showProduct ? `${cell.a} × ${cell.b} = ${cell.a * cell.b}` : 'Partial product hidden'}</span>
              <span className="area-model-selection">{isSelected ? 'Selected' : 'Select this part'}</span>
            </button>
          );
        })}
      </div>
      {unitSquareMode && <p data-testid="area-model-unit-square-count">{product} unit squares cover the rectangle.</p>}
      <output data-testid="area-model-partial-sum">{progressive && !matchesCurrentTarget ? partialSum : `${cells.map((cell) => cell.a * cell.b).join(' + ')} = ${product}`}</output>
      <output data-testid="area-model-total">{config.a} × {config.b} = {product}</output>
      <button className="area-model-reset" onClick={() => commit([], 'reset')}>Start over</button>
      <p role="status">
        {visiblyComplete
          ? 'All partial products make the target.'
          : `${selected.length} of ${cells.length} ${progressive ? 'regions' : 'cells'} selected.`}
      </p>
    </section>
  );
}
