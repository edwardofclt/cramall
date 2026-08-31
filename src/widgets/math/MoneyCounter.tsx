import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Denomination = 1 | 5 | 10 | 25 | 100;
type CountKey = '1' | '5' | '10' | '25' | '100';
type Counts = Record<CountKey, number>;

const ZERO: Counts = { '1': 0, '5': 0, '10': 0, '25': 0, '100': 0 };
const DEFAULT_DENOMINATIONS: Denomination[] = [1, 5, 10, 25, 100];
const COIN_NAMES: Record<Denomination, string> = {
  1: 'penny',
  5: 'nickel',
  10: 'dime',
  25: 'quarter',
  100: 'dollar coin',
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
  const { completed, completeOnce } = useCompletionLatch(key);
  const cents = total(counts);
  const matchesCurrentTarget = config.targetCents !== undefined && cents === config.targetCents;
  const visiblyComplete = completed && matchesCurrentTarget;

  useEffect(() => setCounts(ZERO), [key]);

  const commit = (next: Counts, action: 'add-coin' | 'remove-coin' | 'reset') => {
    const value = { totalCents: total(next), counts: next };
    setCounts(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value });
    if (config.targetCents !== undefined && value.totalCents === config.targetCents) {
      completeOnce(() => onEvent({ type: 'complete', value }));
    }
  };

  return (
    <section
      className="card widget-experiment money"
      data-testid="widget-money-counter"
      data-state={visiblyComplete ? 'complete' : 'building'}
      data-complete={visiblyComplete ? 'yes' : 'no'}
    >
      <div className="money-denominations" aria-label="Coin counter controls">
        {denominations.map((denomination) => {
          const name = COIN_NAMES[denomination];
          const keyForDenomination = countKey(denomination);
          const count = counts[keyForDenomination];
          return (
            <section className="money-denomination" key={denomination} aria-label={`${name}, ${denomination} cents`}>
              <h3>{name} · {denomination}¢</h3>
              <p><output data-testid={`money-count-${denomination}`}>{count}</output> counted</p>
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
      <output className="money-total" aria-label={`${cents} cents, ${moneyText(cents)}`}>
        Total: {cents}¢ ({moneyText(cents)})
      </output>
      <p role="status">{visiblyComplete ? 'Target amount complete.' : `${cents} cents counted.`}</p>
    </section>
  );
}
