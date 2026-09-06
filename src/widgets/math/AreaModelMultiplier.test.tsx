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
  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-state', 'building');
  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-complete', 'no');
  expect(screen.getByText('1 of 2 cells selected.', { selector: 'p[role="status"]' })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Select 3 by 4 cell' }));
  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-complete', 'yes');

  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('the authored product alone does not present completion before cell interaction', () => {
  const onEvent = vi.fn();

  render(<AreaModelMultiplier config={{ a: 2, b: 3, targetProduct: 6 }} onEvent={onEvent} />);

  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-state', 'building');
  expect(onEvent).not.toHaveBeenCalled();
});

test('preserves 44px tracks for a valid 99-partition factor', () => {
  render(
    <AreaModelMultiplier
      config={{ a: 99, b: 99, splitA: [99], splitB: Array.from({ length: 99 }, () => 1) }}
      onEvent={() => {}}
    />,
  );

  const grid = screen.getByRole('group', { name: 'Area model partitions for 99 times 99' });

  expect(grid).toHaveStyle({ gridTemplateColumns: 'repeat(99, minmax(44px, 1fr))' });
  expect(screen.getAllByRole('button', { name: 'Select 99 by 1 cell' })).toHaveLength(99);
});

test('shows the sum of the partial products', () => {
  render(
    <AreaModelMultiplier
      config={{ a: 23, b: 4, splitA: [20, 3], splitB: [4] }}
      onEvent={() => {}}
    />,
  );

  expect(screen.getByTestId('area-model-partial-sum')).toHaveTextContent('80 + 12 = 92');
});

test('progressive decomposition hides each partial product until its region is selected', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <AreaModelMultiplier
      config={{ a: 23, b: 14, splitA: [20, 3], splitB: [10, 4], targetProduct: 322, revealMode: 'progressive' }}
      onEvent={onEvent}
    />,
  );

  expect(screen.queryByText('20 × 10 = 200')).not.toBeInTheDocument();
  expect(screen.getByTestId('area-model-partial-sum')).toHaveTextContent('?');

  await user.click(screen.getByRole('button', { name: 'Select 20 by 10 cell' }));
  expect(screen.getByText('20 × 10 = 200')).toBeInTheDocument();
  expect(screen.queryByText('20 × 4 = 80')).not.toBeInTheDocument();

  for (const label of ['Select 20 by 4 cell', 'Select 3 by 10 cell', 'Select 3 by 4 cell']) {
    await user.click(screen.getByRole('button', { name: label }));
  }

  expect(screen.getByTestId('area-model-partial-sum')).toHaveTextContent('200 + 80 + 30 + 12 = 322');
  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-state', 'complete');
});

test('unit-square area mode renders every square in an 8 by 5 rectangle', () => {
  render(
    <AreaModelMultiplier
      config={{ a: 8, b: 5, splitA: [8], splitB: [5], targetProduct: 40, revealMode: 'all' }}
      onEvent={() => {}}
    />,
  );

  expect(screen.getAllByRole('gridcell')).toHaveLength(40);
  expect(screen.getByTestId('area-model-unit-square-count')).toHaveTextContent('40 unit squares');
});
