import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Size = { rows: number; columns: number };

export default function ArrayBuilder({ config, onEvent }: WidgetProps<'array-builder'>) {
  const key = JSON.stringify(config);
  const initial = { rows: config.rows, columns: config.columns };
  const [size, setSize] = useState<Size>(initial);
  const { completed, completeOnce } = useCompletionLatch(key);
  const product = size.rows * size.columns;

  useEffect(() => setSize(initial), [key]);

  const commit = (next: Size, action: 'change-rows' | 'change-columns' | 'reset') => {
    const value = { ...next, product: next.rows * next.columns };
    setSize(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value });
    if (config.targetProduct !== undefined && value.product === config.targetProduct) {
      completeOnce(() => onEvent({ type: 'complete', value }));
    }
  };

  return (
    <section
      className="card widget-experiment array-builder"
      data-testid="widget-array-builder"
      data-state={completed ? 'complete' : 'building'}
      data-complete={completed ? 'yes' : 'no'}
    >
      <div className="array-builder-controls" aria-label="Array controls">
        <button
          aria-label="Remove one row"
          disabled={!config.editable || size.rows === 1}
          onClick={() => commit({ ...size, rows: Math.max(1, size.rows - 1) }, 'change-rows')}
        >
          − row
        </button>
        <button
          aria-label="Add one row"
          disabled={!config.editable || size.rows === 20}
          onClick={() => commit({ ...size, rows: Math.min(20, size.rows + 1) }, 'change-rows')}
        >
          + row
        </button>
        <button
          aria-label="Remove one column"
          disabled={!config.editable || size.columns === 1}
          onClick={() => commit({ ...size, columns: Math.max(1, size.columns - 1) }, 'change-columns')}
        >
          − column
        </button>
        <button
          aria-label="Add one column"
          disabled={!config.editable || size.columns === 20}
          onClick={() => commit({ ...size, columns: Math.min(20, size.columns + 1) }, 'change-columns')}
        >
          + column
        </button>
        <button onClick={() => commit(initial, 'reset')}>Start over</button>
      </div>
      <p className="array-builder-description">{size.rows} rows of {size.columns} counters.</p>
      <div className="array-builder-viewport" role="region" aria-label="Scrollable array model" tabIndex={0}>
        <div
          role="grid"
          data-widget-grid
          aria-label={`${size.rows} rows by ${size.columns} columns`}
          style={{ gridTemplateColumns: `repeat(${size.columns}, minmax(24px, 1fr))` }}
        >
          {Array.from({ length: size.rows }, (_, row) => (
            <div role="row" key={row}>
              {Array.from({ length: size.columns }, (_, column) => (
                <span role="gridcell" className="array-builder-cell" aria-label={`Row ${row + 1}, column ${column + 1}`} key={column}>
                  <span aria-hidden="true">●</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <output>{size.rows} × {size.columns} = {product}</output>
      <p role="status">{completed ? 'Target array complete.' : 'Adjust rows and columns.'}</p>
    </section>
  );
}
