import { useEffect, useMemo, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Size = { rows: number; columns: number };
type DivisionStep = { amount: number; quotient: number };

function factorPairKey(rows: number, columns: number): string {
  return `${Math.min(rows, columns)} × ${Math.max(rows, columns)}`;
}

function factorPairs(target: number): string[] {
  const pairs: string[] = [];
  for (let factor = 1; factor * factor <= target; factor += 1) {
    if (target % factor === 0) pairs.push(factorPairKey(factor, target / factor));
  }
  return pairs;
}

/** Break a dividend into place-value-friendly groups that divide evenly. */
function divisionSteps(dividend: number, divisor: number): DivisionStep[] {
  const steps: DivisionStep[] = [];
  let remaining = dividend;
  for (const place of [1000, 100, 10, 1]) {
    const placeUnits = Math.floor(remaining / place);
    const groups = Math.floor(placeUnits / divisor);
    if (groups > 0) {
      const amount = groups * divisor * place;
      steps.push({ amount, quotient: groups * place });
      remaining -= amount;
    }
  }
  return steps;
}

export default function ArrayBuilder({ config, onEvent }: WidgetProps<'array-builder'>) {
  const key = JSON.stringify(config);
  const initial = { rows: config.rows, columns: config.columns };
  const task = config.task ?? 'editable';
  const maxDimension = task === 'factor-hunt' ? Math.max(20, config.targetProduct ?? 20) : 20;
  const [size, setSize] = useState<Size>(initial);
  const [foundPairs, setFoundPairs] = useState<string[]>([]);
  const [divisionProgress, setDivisionProgress] = useState(0);
  const { completed, completeOnce } = useCompletionLatch(key);
  const product = size.rows * size.columns;
  const matchesCurrentTarget = config.targetProduct !== undefined && product === config.targetProduct;
  const expectedPairs = useMemo(() => (
    task === 'factor-hunt' && config.targetProduct !== undefined ? factorPairs(config.targetProduct) : []
  ), [task, config.targetProduct]);
  const division = task === 'division' && config.dividend !== undefined && config.divisor !== undefined
    ? { dividend: config.dividend, divisor: config.divisor }
    : null;
  const steps = division ? divisionSteps(division.dividend, division.divisor) : [];
  const quotient = steps.slice(0, divisionProgress).reduce((sum, step) => sum + step.quotient, 0);
  const remainder = division ? division.dividend - steps.slice(0, divisionProgress).reduce((sum, step) => sum + step.amount, 0) : 0;
  const factorHuntComplete = task === 'factor-hunt' && expectedPairs.length > 0 && foundPairs.length === expectedPairs.length;
  const divisionComplete = task === 'division' && divisionProgress === steps.length && remainder === 0;
  const visiblyComplete = completed && (task === 'factor-hunt' ? factorHuntComplete : task === 'division' ? divisionComplete : matchesCurrentTarget);

  useEffect(() => {
    setSize(initial);
    setFoundPairs([]);
    setDivisionProgress(0);
  }, [key]);

  const emitChange = (next: Size) => {
    onEvent({ type: 'change', value: { rows: next.rows, columns: next.columns, product: next.rows * next.columns } });
  };

  const commit = (next: Size, action: 'change-rows' | 'change-columns' | 'reset') => {
    const value = { ...next, product: next.rows * next.columns };
    setSize(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value });
    if (task === 'editable' && config.targetProduct !== undefined && value.product === config.targetProduct) {
      completeOnce(() => onEvent({ type: 'complete', value }));
    }
  };

  const recordFactorPair = () => {
    const pair = factorPairKey(size.rows, size.columns);
    onEvent({ type: 'interaction', action: 'change-rows' });
    emitChange(size);
    if (!matchesCurrentTarget || foundPairs.includes(pair)) {
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }
    const nextPairs = [...foundPairs, pair];
    setFoundPairs(nextPairs);
    onEvent({ type: 'coach', cue: 'milestone' });
    if (nextPairs.length === expectedPairs.length) {
      completeOnce(() => onEvent({ type: 'complete', value: { rows: size.rows, columns: size.columns, product } }));
    }
  };

  const revealDivisionStep = (index: number) => {
    if (index !== divisionProgress || !division) return;
    const nextProgress = index + 1;
    const nextRemainder = division.dividend - steps.slice(0, nextProgress).reduce((sum, step) => sum + step.amount, 0);
    setDivisionProgress(nextProgress);
    onEvent({ type: 'interaction', action: 'change-rows' });
    onEvent({
      type: 'change',
      value: { rows: steps.slice(0, nextProgress).reduce((sum, step) => sum + step.quotient, 0), columns: division.divisor, product: division.dividend },
    });
    if (nextProgress === steps.length && nextRemainder === 0) {
      completeOnce(() => onEvent({
        type: 'complete',
        value: { rows: steps.reduce((sum, step) => sum + step.quotient, 0), columns: division.divisor, product: division.dividend },
      }));
    } else {
      onEvent({ type: 'coach', cue: 'milestone' });
    }
  };

  const reset = () => {
    setSize(initial);
    setFoundPairs([]);
    setDivisionProgress(0);
    onEvent({ type: 'interaction', action: 'reset' });
    emitChange(initial);
    if (task === 'editable' && config.targetProduct !== undefined && initial.rows * initial.columns === config.targetProduct) {
      completeOnce(() => onEvent({
        type: 'complete',
        value: { rows: initial.rows, columns: initial.columns, product: initial.rows * initial.columns },
      }));
    }
  };

  const renderControls = () => (
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
        disabled={!config.editable || size.rows === maxDimension}
        onClick={() => commit({ ...size, rows: Math.min(maxDimension, size.rows + 1) }, 'change-rows')}
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
        disabled={!config.editable || size.columns === maxDimension}
        onClick={() => commit({ ...size, columns: Math.min(maxDimension, size.columns + 1) }, 'change-columns')}
      >
        + column
      </button>
      {task === 'factor-hunt' && (
        <button onClick={recordFactorPair}>Record current factor pair</button>
      )}
      <button onClick={reset}>Start over</button>
    </div>
  );

  const renderArray = () => (
    <>
      {renderControls()}
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
    </>
  );

  const renderFactorHunt = () => (
    <>
      <p className="array-builder-task">Find every factor pair for {config.targetProduct}.</p>
      {renderArray()}
      <div data-testid="array-builder-found-pairs" aria-live="polite">
        <strong>Unique pairs found:</strong>{' '}
        {foundPairs.length === 0 ? 'None yet.' : foundPairs.map((pair) => <span data-testid="array-builder-factor-pair" key={pair}>{pair}</span>)}
      </div>
      <p role="status">{factorHuntComplete ? 'Every factor pair found.' : `${foundPairs.length} of ${expectedPairs.length} unique pairs found.`}</p>
    </>
  );

  const renderDivision = () => (
    <>
      <p className="array-builder-task">{division!.dividend} ÷ {division!.divisor}</p>
      <div className="array-builder-division-controls" aria-label="Partial quotient controls">
        {steps.map((step, index) => (
          <button
            key={`${step.amount}-${step.quotient}`}
            disabled={index !== divisionProgress}
            onClick={() => revealDivisionStep(index)}
          >
            Share {step.amount} into groups of {division!.divisor}
          </button>
        ))}
      </div>
      <div className="array-builder-division-groups" aria-label="Visible partial groups">
        {steps.slice(0, divisionProgress).map((step) => (
          <p key={`${step.amount}-${step.quotient}`}>{step.amount} ÷ {division!.divisor} = {step.quotient}</p>
        ))}
      </div>
      <output data-testid="array-builder-quotient">Quotient: {quotient}</output>
      <output>Remainder: {remainder}</output>
      <button onClick={reset}>Start over</button>
      <p role="status">{divisionComplete ? `${division!.dividend} ÷ ${division!.divisor} = ${quotient} remainder ${remainder}.` : 'Choose a partial group to build the quotient.'}</p>
    </>
  );

  return (
    <section
      className="card widget-experiment array-builder"
      data-testid="widget-array-builder"
      data-state={visiblyComplete ? 'complete' : 'building'}
      data-complete={visiblyComplete ? 'yes' : 'no'}
    >
      {config.taskPrompt && <div className="widget-task"><strong>Goal:</strong> {config.taskPrompt}</div>}
      {task === 'division' && division ? renderDivision() : task === 'factor-hunt' ? renderFactorHunt() : renderArray()}
      {task === 'editable' && <p role="status">{visiblyComplete ? 'Target array complete.' : 'Adjust rows and columns.'}</p>}
    </section>
  );
}
