import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import AreaModelMultiplier from './AreaModelMultiplier';

test('selects every partition and completes configured product once', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <AreaModelMultiplier
      config={{ a: 23, b: 4, splitA: [20, 3], splitB: [4], targetProduct: 92 }}
      onEvent={onEvent}
    />,
  );

  expect(screen.getByText('20 × 4 = 80')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Select 20 by 4 cell' }));
  await user.click(screen.getByRole('button', { name: 'Select 3 by 4 cell' }));

  expect(onEvent.mock.calls.slice(-3).map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'select-cell' },
    { type: 'change', value: { selectedCells: 2, product: 92 } },
    { type: 'complete', value: { product: 92 } },
  ]);

  await user.click(screen.getByRole('button', { name: 'Select 3 by 4 cell' }));

  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('the authored product alone does not present completion before cell interaction', () => {
  const onEvent = vi.fn();

  render(<AreaModelMultiplier config={{ a: 2, b: 3, targetProduct: 6 }} onEvent={onEvent} />);

  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-state', 'building');
  expect(onEvent).not.toHaveBeenCalled();
});
