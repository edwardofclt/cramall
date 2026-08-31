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

  await user.click(screen.getByRole('button', { name: 'Regroup 10 ones' }));

  expect(screen.getByTestId('base-ten-counts')).toHaveTextContent('0 ones, 1 ten');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('a zero target is not complete on mount', () => {
  const onEvent = vi.fn();

  render(<BaseTenBlocks config={{ target: 0 }} onEvent={onEvent} />);

  expect(screen.getByTestId('widget-base-ten-blocks')).toHaveAttribute('data-state', 'building');
  expect(onEvent).not.toHaveBeenCalled();
});
