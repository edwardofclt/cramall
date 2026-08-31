import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { BalanceScaleWidgetConfigSchema } from '../../content/schema';
import BalanceScale from './BalanceScale';

test('checks the learner comparison instead of hard-coding completion and reset restores status', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <BalanceScale
      config={{
        left: [{ id: 'a', label: '2', value: 2 }],
        right: [{ id: 'b', label: '1+1', value: 2 }],
        task: 'compare',
      }}
      onEvent={onEvent}
    />,
  );

  expect(screen.getByTestId('balance-beam')).toHaveAttribute('data-state', 'level');
  expect(screen.getByRole('group', { name: /balance scale/i })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Balanced' }));
  expect(onEvent.mock.calls).toEqual([
    [{ type: 'interaction', action: 'check' }],
    [{ type: 'change', value: { leftTotal: 2, rightTotal: 2 } }],
    [{ type: 'complete', value: { leftTotal: 2, rightTotal: 2 } }],
  ]);

  await user.click(screen.getByRole('button', { name: 'Balanced' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByRole('status')).toHaveTextContent('Compare the pans.');
});

test('rejects empty pans and nonpositive weights', () => {
  expect(BalanceScaleWidgetConfigSchema.safeParse({
    left: [],
    right: [{ id: 'b', label: 'B', value: 1 }],
  }).success).toBe(false);
  expect(BalanceScaleWidgetConfigSchema.safeParse({
    left: [{ id: 'a', label: 'A', value: -1 }],
    right: [{ id: 'b', label: 'B', value: 1 }],
  }).success).toBe(false);
  expect(BalanceScaleWidgetConfigSchema.safeParse({
    left: [{ id: 'same', label: 'A', value: 1 }],
    right: [{ id: 'same', label: 'B', value: 1 }],
  }).success).toBe(false);
});

test('makes active weights and each pan readable before a balance check completes', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <BalanceScale
      config={{
        left: [{ id: 'left-two', label: '2', value: 2 }],
        right: [{ id: 'right-one', label: '1', value: 1 }],
        task: 'make-equal',
      }}
      onEvent={onEvent}
    />,
  );

  expect(screen.getByTestId('balance-pan-left')).toHaveAccessibleName(/left pan/i);
  expect(screen.getByTestId('balance-pan-right')).toHaveAccessibleName(/right pan/i);
  expect(screen.getByRole('button', { name: 'Remove 2 from the left pan' })).toHaveAttribute('aria-pressed', 'true');

  await user.click(screen.getByRole('button', { name: 'Remove 2 from the left pan' }));
  await user.click(screen.getByRole('button', { name: 'Remove 1 from the right pan' }));
  expect(screen.getByRole('button', { name: 'Add 2 to the left pan' })).toHaveAttribute('aria-pressed', 'false');

  onEvent.mockClear();
  await user.click(screen.getByRole('button', { name: 'Check balance' }));
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'check' },
    { type: 'change', value: { leftTotal: 0, rightTotal: 0 } },
    { type: 'complete', value: { leftTotal: 0, rightTotal: 0 } },
  ]);
});
