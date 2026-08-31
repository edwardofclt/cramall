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
  expect(BalanceScaleWidgetConfigSchema.safeParse({
    left: [{ id: 'left-two', label: '2', value: 2 }],
    right: [{ id: 'right-one', label: '1', value: 1 }],
    task: 'make-equal',
  }).success).toBe(false);
  expect(BalanceScaleWidgetConfigSchema.safeParse({
    left: [{ id: 'left-two', label: '2', value: 2 }],
    right: [{ id: 'right-one', label: '1', value: 1 }],
    task: 'compare',
  }).success).toBe(true);
  expect(BalanceScaleWidgetConfigSchema.safeParse({
    left: Array.from({ length: 17 }, (_, index) => ({
      id: `left-${index}`,
      label: String(index + 1),
      value: index + 1,
    })),
    right: [{ id: 'right', label: '1', value: 1 }],
    task: 'make-equal',
  }).success).toBe(false);
  expect(BalanceScaleWidgetConfigSchema.safeParse({
    left: [{ id: 'left-one', label: '1', value: 1 }],
    right: [{ id: 'right-near-one', label: '1.0000000005', value: 1.0000000005 }],
    task: 'make-equal',
  }).success).toBe(false);
  expect(BalanceScaleWidgetConfigSchema.safeParse({
    left: [{ id: 'scientific', label: 'one trillionth', value: 1e-12 }],
    right: [{ id: 'decimal', label: 'one trillionth', value: 0.000000000001 }],
    task: 'make-equal',
  }).success).toBe(true);
  expect(BalanceScaleWidgetConfigSchema.safeParse({
    left: [{ id: 'too-precise', label: 'one ten-trillionth', value: 1e-13 }],
    right: [{ id: 'zeroish', label: 'one', value: 1 }],
    task: 'compare',
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
  ]);
  expect(screen.getByRole('status')).toHaveTextContent('Add at least one weight to each pan before checking.');
});

test('uses stable decimal totals for an equal comparison and completion', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <BalanceScale
      config={{
        left: [
          { id: 'left-tenth', label: '0.1', value: 0.1 },
          { id: 'left-two-tenths', label: '0.2', value: 0.2 },
        ],
        right: [{ id: 'right-three-tenths', label: '0.3', value: 0.3 }],
        task: 'compare',
      }}
      onEvent={onEvent}
    />,
  );

  expect(screen.getByTestId('balance-beam')).toHaveAttribute('data-state', 'level');
  expect(screen.getByRole('group')).toHaveAccessibleName(/left total 0.3; right total 0.3/i);
  await user.click(screen.getByRole('button', { name: 'Balanced' }));

  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'check' },
    { type: 'change', value: { leftTotal: 0.3, rightTotal: 0.3 } },
    { type: 'complete', value: { leftTotal: 0.3, rightTotal: 0.3 } },
  ]);
});

test('preserves a right-heavy comparison after exact decimal handling', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <BalanceScale
      config={{
        left: [{ id: 'left-one', label: '1', value: 1 }],
        right: [{ id: 'right-two', label: '2', value: 2 }],
        task: 'compare',
      }}
      onEvent={onEvent}
    />,
  );

  expect(screen.getByTestId('balance-beam')).toHaveAttribute('data-state', 'right');
  await user.click(screen.getByRole('button', { name: 'Right is heavier' }));
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'check' },
    { type: 'change', value: { leftTotal: 1, rightTotal: 2 } },
    { type: 'complete', value: { leftTotal: 1, rightTotal: 2 } },
  ]);
});

test('keeps authored decimal differences unequal and incomplete', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <BalanceScale
      config={{
        left: [{ id: 'left-one', label: '1', value: 1 }],
        right: [{ id: 'right-near-one', label: '1.0000000005', value: 1.0000000005 }],
        task: 'compare',
      }}
      onEvent={onEvent}
    />,
  );

  expect(screen.getByTestId('balance-beam')).toHaveAttribute('data-state', 'right');
  await user.click(screen.getByRole('button', { name: 'Balanced' }));
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'check' },
    { type: 'change', value: { leftTotal: 1, rightTotal: 1.0000000005 } },
  ]);
  expect(screen.getByRole('status')).toHaveTextContent('Try the other relation.');
});
