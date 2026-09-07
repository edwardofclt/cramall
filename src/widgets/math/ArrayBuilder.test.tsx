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
  await user.click(screen.getByRole('button', { name: 'Check my groups' }));

  expect(screen.getAllByRole('gridcell')).toHaveLength(12);
  expect(onEvent.mock.calls.slice(-3).map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'change-rows' },
    { type: 'change', value: { rows: 3, columns: 4, product: 12 } },
    { type: 'complete', value: { rows: 3, columns: 4, product: 12 } },
  ]);

  await user.click(screen.getByRole('button', { name: 'Remove one row' }));
  expect(screen.getByTestId('widget-array-builder')).toHaveAttribute('data-state', 'building');
  expect(screen.getByTestId('widget-array-builder')).toHaveAttribute('data-complete', 'no');
  expect(screen.getByLabelText('Array check feedback')).toHaveTextContent('Your array changed.');

  await user.click(screen.getByRole('button', { name: 'Add one row' }));
  await user.click(screen.getByRole('button', { name: 'Check my groups' }));
  expect(screen.getByTestId('widget-array-builder')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByTestId('widget-array-builder')).toHaveAttribute('data-complete', 'yes');

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

test('factor hunt keeps unique factor pairs instead of reversed duplicates', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <ArrayBuilder
      config={{ rows: 2, columns: 12, targetProduct: 24, editable: true, task: 'factor-hunt', taskPrompt: 'Find every factor pair for 24.' }}
      onEvent={onEvent}
    />,
  );

  await user.click(screen.getByRole('button', { name: 'Record current factor pair' }));
  for (let index = 0; index < 1; index += 1) {
    await user.click(screen.getByRole('button', { name: 'Add one row' }));
  }
  for (let index = 0; index < 4; index += 1) {
    await user.click(screen.getByRole('button', { name: 'Remove one column' }));
  }
  await user.click(screen.getByRole('button', { name: 'Record current factor pair' }));
  for (let index = 0; index < 5; index += 1) {
    await user.click(screen.getByRole('button', { name: 'Add one row' }));
    await user.click(screen.getByRole('button', { name: 'Remove one column' }));
  }
  await user.click(screen.getByRole('button', { name: 'Record current factor pair' }));

  expect(screen.getByTestId('array-builder-found-pairs')).toHaveTextContent('2 × 12');
  expect(screen.getByTestId('array-builder-found-pairs')).toHaveTextContent('3 × 8');
  expect(screen.getAllByTestId('array-builder-factor-pair')).toHaveLength(2);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'coach' && event.cue === 'milestone')).toHaveLength(2);
});

test('division builds learner-chosen partial groups and retains the remainder', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <ArrayBuilder
      config={{ rows: 1, columns: 1, targetProduct: 234, editable: true, task: 'division', dividend: 936, divisor: 4, taskPrompt: 'Share 936 into groups of 4.' }}
      onEvent={onEvent}
    />,
  );

  expect(screen.getByText('936 ÷ 4')).toBeInTheDocument();
  expect(screen.getByText('Remainder: 936')).toBeInTheDocument();
  expect(screen.queryByText('800 ÷ 4 = 200')).not.toBeInTheDocument();

  for (const amount of ['200', '30', '4']) {
    await user.type(screen.getByRole('spinbutton', { name: 'Amount for each group' }), amount);
    await user.click(screen.getByRole('button', { name: 'Share into equal groups' }));
  }

  expect(screen.getByText('800 ÷ 4 = 200')).toBeInTheDocument();
  expect(screen.getByText('120 ÷ 4 = 30')).toBeInTheDocument();
  expect(screen.getByText('16 ÷ 4 = 4')).toBeInTheDocument();
  expect(screen.getByTestId('array-builder-quotient')).toHaveTextContent('Quotient: 234');
  expect(screen.getByTestId('widget-array-builder')).toHaveAttribute('data-state', 'complete');
});
