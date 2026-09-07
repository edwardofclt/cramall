import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import AreaModelMultiplier from './AreaModelMultiplier';

test('requires a checked total and every partition, with one completion across rebuilding', async () => {
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<AreaModelMultiplier config={{ a: 23, b: 4, splitA: [20, 3], splitB: [4], targetProduct: 92 }} onEvent={onEvent} />);
  expect(screen.queryByText('20 × 4 = 80')).not.toBeInTheDocument();
  await user.type(screen.getByRole('spinbutton', { name: 'My total area' }), '92');
  await user.click(screen.getByRole('button', { name: 'Check my total' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);
  await user.click(screen.getByRole('button', { name: 'Select 20 by 4 cell' }));
  expect(screen.getByText('20 × 4 = 80')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Select 3 by 4 cell' }));
  expect(onEvent.mock.calls.slice(-3).map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'select-cell' },
    { type: 'change', value: { selectedCells: 2, product: 92 } },
    { type: 'complete', value: { product: 92 } },
  ]);
  await user.click(screen.getByRole('button', { name: 'Select 3 by 4 cell' }));
  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-complete', 'no');
  expect(screen.getByLabelText('Area observation')).toHaveTextContent('1 of 2 regions selected.');
  await user.click(screen.getByRole('button', { name: 'Select 3 by 4 cell' }));
  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-complete', 'yes');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('does not disclose or complete the authored product on mount or mere selection', async () => {
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<AreaModelMultiplier config={{ a: 2, b: 3, targetProduct: 6 }} onEvent={onEvent} />);
  expect(screen.getByTestId('area-model-total')).toHaveTextContent('2 × 3 = ?');
  expect(onEvent).not.toHaveBeenCalled();
  await user.click(screen.getByRole('button', { name: 'Select 2 by 3 cell' }));
  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-state', 'building');
  expect(screen.queryByText('2 × 3 = 6')).not.toBeInTheDocument();
});

test('retains accessible 44px partition tracks for a valid 99-partition factor', () => {
  render(<AreaModelMultiplier config={{ a: 99, b: 99, splitA: [99], splitB: Array.from({ length: 99 }, () => 1) }} onEvent={() => {}} />);
  expect(screen.getByRole('group', { name: 'Area model partitions for 99 times 99' })).toHaveStyle({ gridTemplateColumns: Array.from({ length: 99 }, () => 'minmax(44px, 1fr)').join(' ') });
  expect(screen.getAllByRole('button', { name: 'Select 99 by 1 cell' })).toHaveLength(99);
});

test('reveals partial products only after commitment and retains the original guess during correction', async () => {
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<AreaModelMultiplier config={{ a: 23, b: 14, splitA: [20, 3], splitB: [10, 4], targetProduct: 322, revealMode: 'progressive' }} onEvent={onEvent} />);
  expect(screen.getByTestId('area-model-partial-sum')).toHaveTextContent('? + ? + ? + ?');
  await user.type(screen.getByRole('spinbutton', { name: 'My total area' }), '320');
  await user.click(screen.getByRole('button', { name: 'Check my total' }));
  await user.click(screen.getByRole('button', { name: 'Select 20 by 10 cell' }));
  expect(screen.getByText('20 × 10 = 200')).toBeInTheDocument();
  expect(screen.queryByText('20 × 4 = 80')).not.toBeInTheDocument();
  for (const label of ['Select 20 by 4 cell', 'Select 3 by 10 cell', 'Select 3 by 4 cell']) await user.click(screen.getByRole('button', { name: label }));
  expect(screen.getByTestId('area-model-partial-sum')).toHaveTextContent('200 + 80 + 30 + 12');
  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-state', 'building');
  await user.clear(screen.getByRole('spinbutton', { name: 'My total area' })); await user.type(screen.getByRole('spinbutton', { name: 'My total area' }), '322');
  await user.click(screen.getByRole('button', { name: 'Check my total' }));
  expect(screen.getByTestId('area-model-partial-sum')).toHaveTextContent('200 + 80 + 30 + 12 = 322');
  expect(screen.getByLabelText('Area prediction record')).toHaveTextContent('320');
  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-state', 'complete');
});

test('unit-square area mode renders the complete 8 by 5 grid without printing its answer', () => {
  render(<AreaModelMultiplier config={{ a: 8, b: 5, splitA: [8], splitB: [5], targetProduct: 40, revealMode: 'all' }} onEvent={() => {}} />);
  expect(screen.getAllByRole('gridcell')).toHaveLength(40);
  expect(screen.getByTestId('area-model-unit-square-count')).toHaveTextContent('Each small square covers one square unit.');
  expect(screen.getByTestId('area-model-total')).not.toHaveTextContent('40');
});

test('selecting and undoing regions is neutral, while an incorrect checked total requests retry', async () => {
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<AreaModelMultiplier config={{ a: 23, b: 14, splitA: [20, 3], splitB: [10, 4], targetProduct: 322, revealMode: 'progressive' }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Select 20 by 10 cell' }));
  await user.click(screen.getByRole('button', { name: 'Select 20 by 10 cell' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'coach' && event.cue === 'retry')).toHaveLength(0);
  await user.type(screen.getByRole('spinbutton', { name: 'My total area' }), '22'); await user.click(screen.getByRole('button', { name: 'Check my total' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'coach' && event.cue === 'retry')).toHaveLength(1);
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByLabelText('Area answer feedback')).toHaveTextContent('not checked');
  expect(screen.queryByLabelText('Area prediction record')).not.toBeInTheDocument();
});


test('area diagram preserves the side-length ratio independently of touch-sized partition controls', () => {
  render(<AreaModelMultiplier config={{ a: 30, b: 4, targetProduct: 120 }} onEvent={() => {}} />);
  expect(screen.getByRole('img', { name: 'Rectangle: 30 units wide and 4 units high.' })).toHaveAttribute('viewBox', '0 0 30 4');
  expect(screen.getByRole('region', { name: 'Build an area model tasks' })).toContainElement(screen.getByRole('button', { name: 'Select 30 by 4 cell' }));
});
