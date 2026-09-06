import { useEffect, useState } from 'react';
import {
  compareExactDecimals,
  exactDecimalFromNumber,
  exactDecimalToNumber,
  sumExactDecimals,
  type ExactDecimal,
} from '../../content/balance-decimals';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Relation = 'left' | 'equal' | 'right';
type Weight = { id: string; label: string; value: number };
type Totals = { leftTotal: number; rightTotal: number };
type ExactTotals = { left: ExactDecimal; right: ExactDecimal };
type Action = 'add-weight' | 'remove-weight' | 'check' | 'reset';

function exactTotal(weights: Weight[]) {
  const values = weights.map((weight) => exactDecimalFromNumber(weight.value));
  if (values.some((value) => !value)) {
    throw new Error('Balance scale values must use supported exact decimal precision.');
  }
  return sumExactDecimals(values as ExactDecimal[]);
}

function displayTotals({ left, right }: ExactTotals): Totals {
  return { leftTotal: exactDecimalToNumber(left), rightTotal: exactDecimalToNumber(right) };
}

function balanceRelation({ left, right }: ExactTotals): Relation {
  const comparison = compareExactDecimals(left, right);
  return comparison === 0 ? 'equal' : comparison > 0 ? 'left' : 'right';
}

function relationText(relation: Relation) {
  if (relation === 'left') return 'The left pan is heavier and lower.';
  if (relation === 'right') return 'The right pan is heavier and lower.';
  return 'The pans are level and balanced.';
}

function beamEvidence(relation: Relation) {
  if (relation === 'left') return 'The beam tilts down on the left.';
  if (relation === 'right') return 'The beam tilts down on the right.';
  return 'The beam is level.';
}

export default function BalanceScale({ config, onEvent }: WidgetProps<'balance-scale'>) {
  const key = JSON.stringify(config);
  const task = config.task ?? 'compare';
  const all = [...config.left, ...config.right];
  const initialIds = all.map((weight) => weight.id);
  const initialStatus = task === 'compare'
    ? 'Compare the pans.'
    : 'Adjust the active weights, then check the balance.';
  const [active, setActive] = useState(initialIds);
  const [status, setStatus] = useState(initialStatus);
  const [selectedRelation, setSelectedRelation] = useState<Relation | null>(null);
  const { completed, completeOnce } = useCompletionLatch(key);

  useEffect(() => {
    setActive(initialIds);
    setSelectedRelation(null);
    setStatus(initialStatus);
  }, [key]);

  const exactTotals = (ids: string[]): ExactTotals => ({
    left: exactTotal(config.left.filter((weight) => ids.includes(weight.id))),
    right: exactTotal(config.right.filter((weight) => ids.includes(weight.id))),
  });

  const emit = (ids: string[], action: Action, success = false) => {
    const value = displayTotals(exactTotals(ids));
    setActive(ids);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value });
    if (success) completeOnce(() => onEvent({ type: 'complete', value }));
  };

  const exactValue = exactTotals(active);
  const value = displayTotals(exactValue);
  const truth = balanceRelation(exactValue);
  const beamState = truth === 'equal' ? 'level' : truth;
  const relationCommitted = selectedRelation !== null;

  const chooseRelation = (choice: Relation) => {
    const correct = choice === truth;
    setSelectedRelation(choice);
    setStatus(correct ? 'Correct comparison.' : 'Try the other relation.');
    emit(active, 'check', correct);
  };

  const checkBalance = () => {
    const meaningful = exactValue.left.units > 0n && exactValue.right.units > 0n;
    const balanced = meaningful && truth === 'equal';
    if (meaningful) setSelectedRelation(truth);
    setStatus(!meaningful
      ? 'Add at least one weight to each pan before checking.'
      : balanced ? 'Scale is balanced.' : 'Totals are not equal yet.');
    emit(active, 'check', balanced);
  };

  const reset = () => {
    setSelectedRelation(null);
    setStatus(initialStatus);
    emit(initialIds, 'reset');
  };

  const renderPan = (side: 'left' | 'right', weights: Weight[], total: number) => (
    <section
      className="balance-pan"
      data-testid={`balance-pan-${side}`}
      data-side={side}
      aria-label={`${side === 'left' ? 'Left' : 'Right'} pan${relationCommitted ? `, total ${total}` : ''}`}
    >
      <h3>{side === 'left' ? 'Left pan' : 'Right pan'}</h3>
      <ul>
        {weights.map((weight) => {
          const isActive = active.includes(weight.id);
          const panName = side === 'left' ? 'left' : 'right';
          return (
            <li key={weight.id} data-active={isActive ? 'true' : 'false'}>
              <span>{weight.label} = {weight.value}</span>
              {task === 'make-equal' && (
                <button
                  aria-label={`${isActive ? 'Remove' : 'Add'} ${weight.label} ${isActive ? 'from' : 'to'} the ${panName} pan`}
                  aria-pressed={isActive}
                  onClick={() => {
                    const next = isActive
                      ? active.filter((id) => id !== weight.id)
                      : active.concat(weight.id);
                    emit(next, isActive ? 'remove-weight' : 'add-weight');
                  }}
                >
                  {isActive ? 'Remove' : 'Add'} {weight.label}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <p className="balance-total">{relationCommitted ? `Total: ${total}` : 'Total hidden until you commit a comparison.'}</p>
    </section>
  );

  return (
    <section
      className="card widget-experiment balance"
      data-testid="widget-balance-scale"
      data-state={completed ? 'complete' : task === 'compare' ? 'comparing' : 'making-equal'}
      data-complete={completed ? 'yes' : 'no'}
    >
      <div className="balance-model" role="group" aria-label={relationCommitted
        ? `Balance scale. Left total ${value.leftTotal}; right total ${value.rightTotal}. ${relationText(truth)}`
        : `Balance scale. Qualitative evidence only: ${beamEvidence(truth)} Watch the beam before committing your comparison.`}>
        <div className="balance-pans">
          {renderPan('left', config.left, value.leftTotal)}
          {renderPan('right', config.right, value.rightTotal)}
        </div>
        <div className="balance-beam-area" aria-hidden="true">
          <div className="balance-beam" data-testid="balance-beam" data-state={beamState} />
          <div className="balance-fulcrum" />
        </div>
      </div>
      <p className="balance-relation">
        {relationCommitted
          ? <><strong>{value.leftTotal} {truth === 'left' ? '>' : truth === 'right' ? '<' : '='} {value.rightTotal}</strong> — {relationText(truth)}</>
          : <>Watch the beam: {beamEvidence(truth)} Choose a relation, then check your idea.</>}
      </p>
      {task === 'compare' ? (
        <div className="balance-relation-controls" aria-label="Choose the relationship between the pans">
          <button aria-label="Left is heavier" aria-pressed={selectedRelation === 'left'} onClick={() => chooseRelation('left')}>Left</button>
          <button aria-label="Balanced" aria-pressed={selectedRelation === 'equal'} onClick={() => chooseRelation('equal')}>Balanced</button>
          <button aria-label="Right is heavier" aria-pressed={selectedRelation === 'right'} onClick={() => chooseRelation('right')}>Right</button>
        </div>
      ) : (
        <button className="balance-check" aria-label="Check balance" onClick={checkBalance}>Check balance</button>
      )}
      <button className="balance-reset" onClick={reset}>Start over</button>
      <p role="status">{status}</p>
    </section>
  );
}
