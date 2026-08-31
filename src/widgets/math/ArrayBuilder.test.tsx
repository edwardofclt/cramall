import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { ArrayBuilderWidgetConfigSchema } from '../../content/schema';
import ArrayBuilder from './ArrayBuilder';

test('clamps steppers and emits ordered one-shot completion', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(<ArrayBuilder config={{ rows: 2, columns: 4, targetProduct: 12, editable: true }} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Add one row' }));

  expect(screen.getAllByRole('gridcell')).toHaveLength(12);
  expect(onEvent.mock.calls.slice(-3).map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'change-rows' },
    { type: 'change', value: { rows: 3, columns: 4, product: 12 } },
    { type: 'complete', value: { rows: 3, columns: 4, product: 12 } },
  ]);

  await user.click(screen.getByRole('button', { name: 'Remove one row' }));
  await user.click(screen.getByRole('button', { name: 'Add one row' }));

  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('an initially matching array target is not complete on mount', () => {
  const onEvent = vi.fn();

  render(<ArrayBuilder config={{ rows: 2, columns: 4, targetProduct: 8, editable: true }} onEvent={onEvent} />);

  expect(screen.getByTestId('widget-array-builder')).toHaveAttribute('data-state', 'building');
  expect(onEvent).not.toHaveBeenCalled();
});

test('rejects an unreachable product when dimensions cannot be edited or factored', () => {
  expect(ArrayBuilderWidgetConfigSchema.safeParse({
    rows: 2, columns: 3, targetProduct: 12, editable: false,
  }).success).toBe(false);
  expect(ArrayBuilderWidgetConfigSchema.safeParse({
    rows: 2, columns: 3, targetProduct: 397, editable: true,
  }).success).toBe(false);
});
