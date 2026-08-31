import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import BaseTenBlocks from './BaseTenBlocks';

test('uses next counts and emits one completion', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <BaseTenBlocks
      config={{
        target: 10,
        initial: { ones: 9, tens: 0, hundreds: 0, thousands: 0 },
        allowRegroup: true,
      }}
      onEvent={onEvent}
    />,
  );

  await user.click(screen.getByRole('button', { name: 'Add one block' }));

  expect(screen.getByTestId('base-ten-value')).toHaveTextContent('10');
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'add-block' },
    { type: 'change', value: { ones: 10, tens: 0, hundreds: 0, thousands: 0, value: 10 } },
    { type: 'complete', value: { ones: 10, tens: 0, hundreds: 0, thousands: 0, value: 10 } },
  ]);

  await user.click(screen.getByRole('button', { name: 'Regroup 10 ones into 1 ten' }));

  expect(screen.getByTestId('base-ten-counts')).toHaveTextContent('0 ones, 1 ten');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);

  await user.click(screen.getByRole('button', { name: 'Remove one ten block' }));
  expect(screen.getByTestId('widget-base-ten-blocks')).toHaveAttribute('data-state', 'building');
  expect(screen.getByRole('status')).not.toHaveTextContent('Target complete.');
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByTestId('widget-base-ten-blocks')).toHaveAttribute('data-state', 'building');
});

test('a zero target is not complete on mount', () => {
  const onEvent = vi.fn();

  render(<BaseTenBlocks config={{ target: 0 }} onEvent={onEvent} />);

  expect(screen.getByTestId('widget-base-ten-blocks')).toHaveAttribute('data-state', 'building');
  expect(onEvent).not.toHaveBeenCalled();
});

test('shows count-accurate block models, exchanges adjacent places, and keeps completion status truthful', async () => {
  const user = userEvent.setup();
  const onEvent = vi.fn();
  render(
    <BaseTenBlocks
      config={{
        target: 10,
        initial: { ones: 10, tens: 1, hundreds: 1, thousands: 1 },
        allowRegroup: true,
      }}
      onEvent={onEvent}
    />,
  );

  expect(screen.getAllByTestId('base-ten-one')).toHaveLength(10);
  expect(screen.getAllByTestId('base-ten-ten')).toHaveLength(1);
  expect(screen.getAllByTestId('base-ten-hundred')).toHaveLength(1);
  expect(screen.getAllByTestId('base-ten-thousand')).toHaveLength(1);
  expect(screen.getByRole('group', { name: '10 ones blocks' })).toBeInTheDocument();
  expect(screen.getByRole('group', { name: '1 hundred flat' })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Regroup 10 ones into 1 ten' }));
  await user.click(screen.getByRole('button', { name: 'Ungroup 1 ten into 10 ones' }));
  for (let count = 0; count < 9; count += 1) await user.click(screen.getByRole('button', { name: 'Add one ten block' }));
  await user.click(screen.getByRole('button', { name: 'Regroup 10 tens into 1 hundred' }));
  await user.click(screen.getByRole('button', { name: 'Ungroup 1 hundred into 10 tens' }));
  for (let count = 0; count < 9; count += 1) await user.click(screen.getByRole('button', { name: 'Add one hundred block' }));
  await user.click(screen.getByRole('button', { name: 'Regroup 10 hundreds into 1 thousand' }));
  await user.click(screen.getByRole('button', { name: 'Ungroup 1 thousand into 10 hundreds' }));
});
