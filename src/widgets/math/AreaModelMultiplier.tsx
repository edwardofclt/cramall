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
  const [selected, setSelected] = useState<string[]>([]);
  const { completed, completeOnce } = useCompletionLatch(key);

  useEffect(() => setSelected([]), [key]);

  const commit = (next: string[], action: 'select-cell' | 'reset') => {
    setSelected(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { selectedCells: next.length, product } });
    if (config.targetProduct === product && next.length === cells.length) {
      completeOnce(() => onEvent({ type: 'complete', value: { product } }));
    }
  };

  return (
    <section
      className="card widget-experiment area-model"
      data-testid="widget-area-model-multiplier"
      data-state={completed ? 'complete' : 'building'}
      data-complete={completed ? 'yes' : 'no'}
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
        style={{ gridTemplateColumns: `repeat(${partsB.length}, minmax(0, 1fr))` }}
      >
        {cells.map((cell) => {
          const isSelected = selected.includes(cell.id);
          return (
            <button
              className="area-model-cell"
              key={cell.id}
              aria-label={`Select ${cell.a} by ${cell.b} cell`}
              aria-pressed={isSelected}
              onClick={() => commit(isSelected ? selected : selected.concat(cell.id), 'select-cell')}
            >
              <span>{cell.a} × {cell.b} = {cell.a * cell.b}</span>
              <span className="area-model-selection">{isSelected ? 'Selected' : 'Select this part'}</span>
            </button>
          );
        })}
      </div>
      <output data-testid="area-model-total">{config.a} × {config.b} = {product}</output>
      <button className="area-model-reset" onClick={() => commit([], 'reset')}>Start over</button>
      <p role="status">
        {completed
          ? 'All partial products make the target.'
          : `${selected.length} of ${cells.length} cells selected.`}
      </p>
    </section>
  );
}
