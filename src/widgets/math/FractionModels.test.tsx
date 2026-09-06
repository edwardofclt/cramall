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

test('shows the fraction goal and meaningful progress cues', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <FractionModels
      config={{
        mode: 'bars',
        denominator: 8,
        numerator: 3,
        target: { numerator: 5, denominator: 8 },
        taskPrompt: 'Build 5/8',
      }}
      onEvent={onEvent}
    />,
  );

  expect(screen.getByTestId('widget-task')).toHaveTextContent('Build 5/8');
  await user.click(screen.getByRole('button', { name: 'Shade part 4 of 8' }));
  await user.click(screen.getByRole('button', { name: 'Shade part 1 of 8' }));

  expect(onEvent.mock.calls.map(([event]) => event)).toContainEqual({ type: 'coach', cue: 'milestone' });
  expect(onEvent.mock.calls.map(([event]) => event)).toContainEqual({ type: 'coach', cue: 'retry' });
});

test('shows equivalent fractions as side-by-side equal-sized wholes', () => {
  render(
    <FractionModels
      config={{
        mode: 'bars',
        denominator: 4,
        numerator: 2,
        task: 'equivalent',
        comparisonTarget: { numerator: 1, denominator: 2 },
        taskPrompt: 'Compare 2/4 and 1/2.',
      }}
      onEvent={() => {}}
    />,
  );

  expect(screen.getByTestId('fraction-equivalence')).toHaveTextContent('2/4');
  expect(screen.getByTestId('fraction-equivalence')).toHaveTextContent('1/2');
  expect(screen.getAllByTestId('fraction-whole')).toHaveLength(2);
  expect(screen.getByTestId('fraction-equivalence')).toHaveTextContent('same-sized whole');
});

test('renders multiple wholes without hiding an improper fraction', () => {
  render(
    <FractionModels
      config={{
        mode: 'bars',
        denominator: 4,
        numerator: 1,
        wholeCount: 2,
        target: { numerator: 1, denominator: 4 },
        taskPrompt: 'Build 5/4.',
      }}
      onEvent={() => {}}
    />,
  );

  expect(screen.getByTestId('fraction-total')).toHaveTextContent('5/4');
  expect(screen.getAllByTestId('fraction-whole')).toHaveLength(2);
  expect(screen.getByTestId('fraction-total')).toHaveTextContent('1 whole and 1/4');
});

test('makes the start, change, and result visible for an operation model', () => {
  render(
    <FractionModels
      config={{
        mode: 'bars',
        denominator: 8,
        numerator: 3,
        target: { numerator: 5, denominator: 8 },
        task: 'change',
        taskPrompt: 'Add two eighths.',
      }}
      onEvent={() => {}}
    />,
  );

  const equation = screen.getByTestId('fraction-equation');
  expect(equation).toHaveTextContent('Start: 3/8');
  expect(equation).toHaveTextContent('Change: +2/8');
  expect(equation).toHaveTextContent('Result: 5/8');
});

test('explains fair-sharing distribution and exposes add/remove controls', async () => {
  const user = userEvent.setup();
  render(
    <FractionModels
      config={{
        mode: 'circles',
        denominator: 6,
        numerator: 0,
        target: { numerator: 5, denominator: 6 },
        task: 'share',
        taskPrompt: 'Share five sixths fairly.',
      }}
      onEvent={() => {}}
    />,
  );

  expect(screen.getByTestId('fair-share-distribution')).toHaveTextContent('6 equal shares');
  expect(screen.getAllByTestId('fair-share-recipient')).toHaveLength(6);
  expect(screen.getAllByTestId('fair-share-unit')).toHaveLength(36);
  await user.click(screen.getByRole('button', { name: 'Add one part' }));
  expect(screen.getByTestId('fraction-total')).toHaveTextContent('1/6');
  expect(screen.getAllByTestId('fair-share-unit').filter((unit) => unit.getAttribute('data-state') === 'distributed')).toHaveLength(6);
  await user.click(screen.getByRole('button', { name: 'Remove one part' }));
  expect(screen.getByTestId('fraction-total')).toHaveTextContent('0/6');
  await user.click(screen.getByRole('button', { name: 'Shade part 5 of 6' }));
  expect(screen.getByTestId('widget-fraction-models')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByTestId('fraction-total')).toHaveTextContent('Fraction complete.');
});

test('renders repeated unit-fraction groups with boundaries and labels', async () => {
  const user = userEvent.setup();
  render(
    <FractionModels
      config={{
        mode: 'bars',
        denominator: 4,
        numerator: 0,
        target: { numerator: 3, denominator: 4 },
        task: 'groups',
        taskPrompt: 'Build three groups of one fourth.',
      }}
      onEvent={() => {}}
    />,
  );

  expect(screen.getByTestId('fraction-groups')).toHaveTextContent('0 × 1/4');
  await user.click(screen.getByRole('button', { name: 'Add one part' }));
  expect(screen.getAllByTestId('fraction-group')).toHaveLength(1);
  expect(screen.getByTestId('fraction-groups')).toHaveTextContent('1 × 1/4 = 1/4');
  await user.click(screen.getByRole('button', { name: 'Shade part 3 of 4' }));
  expect(screen.getAllByTestId('fraction-group')).toHaveLength(3);
  expect(screen.getByTestId('fraction-groups')).toHaveTextContent('3 × 1/4 = 3/4');
});

test('uses the computed multi-whole target in the fallback goal', () => {
  render(
    <FractionModels
      config={{ mode: 'bars', denominator: 4, numerator: 0, wholeCount: 2, target: { numerator: 1, denominator: 4 } }}
      onEvent={() => {}}
    />,
  );

  expect(screen.getByTestId('widget-task')).toHaveTextContent('Build 5/4');
});
