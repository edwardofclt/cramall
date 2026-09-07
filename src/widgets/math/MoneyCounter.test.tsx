import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { MoneyCounterWidgetConfigSchema } from '../../content/schema';
import MoneyCounter from './MoneyCounter';

test('retains denomination counts and completes 85 cents once', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(<MoneyCounter config={{ targetCents: 85 }} onEvent={onEvent} />);

  for (let index = 0; index < 3; index += 1) {
    await user.click(screen.getByRole('button', { name: 'Add a quarter' }));
  }
  await user.click(screen.getByRole('button', { name: 'Add a dime' }));

  expect(screen.getByTestId('money-count-25')).toHaveTextContent('3');
  expect(onEvent.mock.calls.slice(-3).map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'add-coin' },
    { type: 'change', value: { totalCents: 85, counts: { '1': 0, '5': 0, '10': 1, '25': 3, '100': 0 } } },
    { type: 'complete', value: { totalCents: 85, counts: { '1': 0, '5': 0, '10': 1, '25': 3, '100': 0 } } },
  ]);

  await user.click(screen.getByRole('button', { name: 'Remove a dime' }));
  expect(screen.getByTestId('widget-money-counter')).toHaveAttribute('data-state', 'building');
  expect(screen.getByTestId('widget-money-counter')).toHaveAttribute('data-complete', 'no');
  expect(screen.getByText('75 cents counted.', { selector: 'p[role="status"]' })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Add a dime' }));
  expect(screen.getByTestId('widget-money-counter')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByTestId('widget-money-counter')).toHaveAttribute('data-complete', 'yes');

  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('rejects a target unreachable by its denomination set', () => {
  expect(MoneyCounterWidgetConfigSchema.safeParse({ targetCents: 3, denominations: [5, 10] }).success).toBe(false);
});

test('rejects gcd-only false positives with bounded reachability', () => {
  expect(MoneyCounterWidgetConfigSchema.safeParse({ targetCents: 2, denominations: [6, 10] }).success).toBe(false);
  expect(MoneyCounterWidgetConfigSchema.safeParse({ targetCents: 5, denominations: [10, 25] }).success).toBe(false);
});

test('a zero-cent target is not complete on mount', () => {
  const onEvent = vi.fn();

  render(<MoneyCounter config={{ targetCents: 0 }} onEvent={onEvent} />);

  expect(screen.getByTestId('widget-money-counter')).toHaveAttribute('data-state', 'building');
  expect(onEvent).not.toHaveBeenCalled();
});

test('shows a dollar goal, labeled tokens, subtotals, and meaningful cues', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(<MoneyCounter config={{ targetCents: 635, taskPrompt: 'Show $6.35' }} onEvent={onEvent} />);

  expect(screen.getByTestId('widget-task')).toHaveTextContent('Show $6.35');
  expect(screen.getByLabelText('penny, 1 cents')).toHaveTextContent('1¢');
  expect(screen.getByLabelText('dollar bill, 100 cents')).toHaveTextContent('100¢');
  expect(screen.getByRole('img', { name: '100-cent dollar bill token' })).toBeInTheDocument();
  expect(screen.getByTestId('money-subtotal-25')).toHaveTextContent('0¢');

  await user.click(screen.getByRole('button', { name: 'Add a penny' }));
  await user.click(screen.getByRole('button', { name: 'Start over' }));

  expect(onEvent.mock.calls.map(([event]) => event)).toContainEqual({ type: 'coach', cue: 'milestone' });
  expect(onEvent.mock.calls.map(([event]) => event)).not.toContainEqual({ type: 'coach', cue: 'retry' });
});
