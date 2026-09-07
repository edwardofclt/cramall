import { ActivityWorkbench } from '../ActivityWorkbench';
import './guide-led-math.css';
import { useEffect, useRef, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Denomination = 1 | 5 | 10 | 25 | 100;
type CountKey = '1' | '5' | '10' | '25' | '100';
type Counts = Record<CountKey, number>;

const ZERO: Counts = { '1': 0, '5': 0, '10': 0, '25': 0, '100': 0 };
const DEFAULT_DENOMINATIONS: Denomination[] = [1, 5, 10, 25, 100];
const DENOMINATION_NAMES: Record<Denomination, string> = {
  1: 'penny',
  5: 'nickel',
  10: 'dime',
  25: 'quarter',
  100: 'dollar bill',
};

const countKey = (denomination: Denomination): CountKey => String(denomination) as CountKey;
const total = (counts: Counts) => Object.entries(counts).reduce(
  (sum, [denomination, count]) => sum + Number(denomination) * count,
  0,
);
const moneyText = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export default function MoneyCounter({ config, onEvent }: WidgetProps<'money-counter'>) {
  const key = JSON.stringify(config);
  const denominations = config.denominations ?? DEFAULT_DENOMINATIONS;
  const [counts, setCounts] = useState<Counts>(ZERO);
  const [acted, setActed] = useState(false);
  const [checkedCents, setCheckedCents] = useState<number | null>(null);
  const milestoneSent = useRef(false);
  const { completed, completeOnce } = useCompletionLatch(key);
  const cents = total(counts);
  const matchesCurrentTarget = config.targetCents !== undefined && cents === config.targetCents;
  const visiblyComplete = completed && acted && matchesCurrentTarget;

  useEffect(() => {
    setCounts(ZERO); setCheckedCents(null); setActed(false);
    milestoneSent.current = false;
  }, [key]);

  const commit = (next: Counts, action: 'add-coin' | 'remove-coin' | 'reset') => {
    if (action === 'reset') setCheckedCents(null);
    const previousCents = cents;
    const value = { totalCents: total(next), counts: next };
    setCounts(next); setActed(action !== 'reset');
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value });
    if (config.targetCents !== undefined && value.totalCents !== previousCents && value.totalCents !== config.targetCents) {
      const currentDistance = Math.abs(previousCents - config.targetCents);
      const nextDistance = Math.abs(value.totalCents - config.targetCents);
      if (nextDistance < currentDistance && !milestoneSent.current) {
        milestoneSent.current = true;
        onEvent({ type: 'coach', cue: 'milestone' });
      }
    }
    if (action !== 'reset' && config.targetCents !== undefined && value.totalCents === config.targetCents) {
      completeOnce(() => onEvent({ type: 'complete', value }));
    }
  };

  return (
    <section
      className="card widget-experiment money activity-shell math-activity"
      data-testid="widget-money-counter"
      data-state={visiblyComplete ? 'complete' : 'building'}
      data-complete={visiblyComplete ? 'yes' : 'no'}
    >
<ActivityWorkbench label="Build an amount of money" visual={<><div className="widget-task" data-testid="widget-task">
        <strong>Goal:</strong> {config.taskPrompt ?? `Show ${moneyText(config.targetCents ?? 0)}`}
        {config.targetCents !== undefined && <span> Target amount: {moneyText(config.targetCents)}.</span>}
      </div>
<div className="math-money-tray" role="img" aria-label={`Your collection: ${denominations.map(d => `${counts[countKey(d)]} ${DENOMINATION_NAMES[d]}`).join(', ')}`}>
  {denominations.flatMap(denomination => Array.from({ length: counts[countKey(denomination)] }, (_, index) => <span className="math-money-piece" data-testid="money-collected-piece" data-bill={denomination === 100} aria-hidden="true" key={`${denomination}-${index}`}>{denomination === 100 ? '$1' : `${denomination}¢`}</span>))}
  {cents === 0 && <p>The tray is empty. Add coins or bills.</p>}
</div>
<output className="money-total" aria-label={`${cents} cents, ${moneyText(cents)}`}>
        Total: {cents}¢ ({moneyText(cents)})
      </output></>}>
<div className="money-denominations" aria-label="Coin counter controls">
        {denominations.map((denomination) => {
          const name = DENOMINATION_NAMES[denomination];
          const keyForDenomination = countKey(denomination);
          const count = counts[keyForDenomination];
          return (
            <section className="money-denomination" key={denomination} aria-label={`${name}, ${denomination} cents`}>
              <h3>{name} · {denomination}¢</h3>
              <span
                className="money-token"
                data-token-kind={denomination === 100 ? 'bill' : 'coin'}
                role="img"
                aria-label={`${denomination}-cent ${name} token`}
                style={{
                  display: 'inline-grid',
                  width: denomination === 100 ? '4rem' : '2.5rem',
                  height: '2rem',
                  placeItems: 'center',
                  border: '2px solid currentColor',
                  borderRadius: denomination === 100 ? '.25rem' : '50%',
                  fontWeight: 800,
                }}
              >
                {denomination}¢
              </span>
              <p><output data-testid={`money-count-${denomination}`}>{count}</output> counted</p>
              <output data-testid={`money-subtotal-${denomination}`}>Subtotal: {denomination * count}¢ ({moneyText(denomination * count)})</output>
              <div className="money-denomination-controls">
                <button
                  aria-label={`Add a ${name}`}
                  onClick={() => commit({ ...counts, [keyForDenomination]: count + 1 }, 'add-coin')}
                >
                  Add {name}
                </button>
                <button
                  aria-label={`Remove a ${name}`}
                  disabled={count === 0}
                  onClick={() => commit({ ...counts, [keyForDenomination]: Math.max(0, count - 1) }, 'remove-coin')}
                >
                  Remove {name}
                </button>
              </div>
            </section>
          );
        })}
      </div>
<button className="money-reset" onClick={() => commit(ZERO, 'reset')}>Start over</button>
<p role="status">{visiblyComplete ? 'Target amount complete.' : `${cents} cents counted.`}</p>
<section className="math-task"><h4>Check and explain</h4><button type="button" onClick={() => { setCheckedCents(cents); onEvent({ type: 'coach', cue: matchesCurrentTarget ? 'milestone' : 'retry' }); }}>Check my collection</button>
<p aria-label="Money check feedback" role="status">{checkedCents === null ? 'Build a collection before checking.' : checkedCents === config.targetCents ? `Correct: your collection totaled ${moneyText(checkedCents)}. The subtotals add to the same amount.` : `Try again. Your checked collection totaled ${moneyText(checkedCents)}. Compare it with the target and adjust a denomination.`}</p>
<p>Which coins could replace one bill or one coin without changing the total?</p></section>
</ActivityWorkbench>
</section>
  );
}
