import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { FractionModelsWidgetConfigSchema } from '../../content/schema';
import FractionModels from './FractionModels';

test('uses next numerator and latches equivalent completion', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <FractionModels
      config={{
        mode: 'both',
        denominator: 4,
        target: { numerator: 1, denominator: 2 },
        allowEquivalent: true,
      }}
      onEvent={onEvent}
    />,
  );

  await user.click(screen.getByRole('button', { name: 'Shade part 1 of 4' }));
  await user.click(screen.getByRole('button', { name: 'Shade part 2 of 4' }));

  expect(screen.getAllByTestId('fraction-view')).toHaveLength(2);
  expect(onEvent.mock.calls.slice(-3).map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'select-piece' },
    { type: 'change', value: { numerator: 2, denominator: 4 } },
    { type: 'complete', value: { numerator: 2, denominator: 4, equivalent: true } },
  ]);

  await user.click(screen.getByRole('button', { name: 'Shade part 2 of 4' }));

  await user.click(screen.getByRole('button', { name: 'Clear model' }));
  expect(screen.getByTestId('widget-fraction-models')).toHaveAttribute('data-state', 'choosing');
  expect(screen.getByTestId('widget-fraction-models')).toHaveAttribute('data-complete', 'no');
  expect(screen.getByRole('status')).toHaveTextContent('Choose the shaded amount.');

  await user.click(screen.getByRole('button', { name: 'Shade part 2 of 4' }));
  expect(screen.getByTestId('widget-fraction-models')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByTestId('widget-fraction-models')).toHaveAttribute('data-complete', 'yes');

  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('uses exact completion copy when the target representation matches', async () => {
  const user = userEvent.setup();

  render(
    <FractionModels
      config={{ mode: 'bars', denominator: 4, target: { numerator: 2, denominator: 4 }, allowEquivalent: true }}
      onEvent={() => {}}
    />,
  );

  await user.click(screen.getByRole('button', { name: 'Shade part 2 of 4' }));

  expect(screen.getByRole('status')).toHaveTextContent('Fraction complete.');
});

test('rejects an unreachable target and does not complete an initial zero target on mount', () => {
  expect(FractionModelsWidgetConfigSchema.safeParse({
    mode: 'bars',
    denominator: 3,
    target: { numerator: 1, denominator: 2 },
    allowEquivalent: true,
  }).success).toBe(false);

  const onEvent = vi.fn();
  render(
    <FractionModels
      config={{ mode: 'bars', denominator: 4, numerator: 0, target: { numerator: 0, denominator: 4 } }}
      onEvent={onEvent}
    />,
  );

  expect(screen.getByTestId('widget-fraction-models')).toHaveAttribute('data-state', 'choosing');
  expect(onEvent).not.toHaveBeenCalled();
});

test('renders distinct segmented bar and radial circle models with readable shading state', () => {
  render(
    <FractionModels
      config={{ mode: 'both', denominator: 4, numerator: 1 }}
      onEvent={() => {}}
    />,
  );

  const bar = screen.getByTestId('fraction-bar-model');
  const circle = screen.getByTestId('fraction-circle-model');

  expect(bar).toHaveAttribute('role', 'img');
  expect(bar.querySelectorAll('[data-testid="fraction-bar-segment"]')).toHaveLength(4);
  expect(circle).toHaveAttribute('role', 'img');
  expect(circle.querySelectorAll('[data-testid="fraction-circle-sector"]')).toHaveLength(4);
  expect(screen.getAllByText('1 shaded, 3 unshaded')).toHaveLength(2);
});
