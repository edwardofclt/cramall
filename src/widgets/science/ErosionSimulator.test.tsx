import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { ErosionSimulatorWidgetConfigSchema } from '../../content/schema';
import ErosionSimulator from './ErosionSimulator';

const motion = vi.hoisted(() => ({ reduced: false }));
vi.mock('../../app/useReducedMotionPref', () => ({ useReducedMotionPref: () => motion.reduced }));

test('runs water without vegetation and emits checked completion', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<ErosionSimulator config={{ terrain: 'soil', agents: ['water', 'wind'], vegetation: false, targetAgent: 'water' }} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Use water' }));
  onEvent.mockClear();
  await user.click(screen.getByRole('button', { name: 'Run erosion' }));

  expect(screen.getByRole('status')).toHaveTextContent(/authored model.*water.*erosion/i);
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'run' },
    { type: 'change', value: { agent: 'water', vegetation: false } },
    { type: 'complete', value: { agent: 'water', vegetation: false } },
  ]);
});

test('shows a labelled pre-run terrain and a water-shaped after terrain', async () => {
  const user = userEvent.setup();
  render(<ErosionSimulator config={{ terrain: 'soil', agents: ['water'], vegetation: false }} onEvent={vi.fn()} />);

  expect(screen.getByTestId('erosion-before')).toHaveTextContent(/before.*soil/i);
  expect(screen.getByTestId('erosion-after')).toHaveTextContent(/run the authored model/i);
  await user.click(screen.getByRole('button', { name: 'Run erosion' }));
  expect(screen.getByTestId('erosion-after')).toHaveAttribute('data-agent', 'water');
  expect(screen.getByTestId('erosion-after')).toHaveTextContent(/water path.*moved soil/i);
  expect(screen.getByTestId('erosion-after-geometry')).toHaveAttribute('data-pattern', 'channel');
});

test('makes vegetation a visible movement comparison for soil and marks an old run stale', async () => {
  const user = userEvent.setup();
  render(<ErosionSimulator config={{ terrain: 'sand', agents: ['wind'], vegetation: false, targetAgent: 'wind' }} onEvent={vi.fn()} />);

  await user.click(screen.getByRole('button', { name: 'Run erosion' }));
  const barePattern = screen.getByTestId('erosion-after-geometry').getAttribute('data-pattern');
  expect(screen.getByTestId('widget-erosion-simulator')).toHaveAttribute('data-state', 'complete');
  await user.click(screen.getByRole('button', { name: 'Toggle vegetation' }));
  expect(screen.getByTestId('widget-erosion-simulator')).toHaveAttribute('data-state', 'testing');
  expect(screen.getByTestId('erosion-after')).toHaveAttribute('data-stale', 'yes');
  expect(screen.getByRole('status')).toHaveTextContent(/inputs changed.*run/i);
  await user.click(screen.getByRole('button', { name: 'Run erosion' }));
  expect(screen.getByTestId('erosion-after-geometry')).not.toHaveAttribute('data-pattern', barePattern!);
  expect(screen.getByTestId('erosion-after')).toHaveTextContent(/vegetation.*less movement.*not stop all erosion/i);
});

test('keeps reduced-motion and normal runs at the same final terrain state', async () => {
  const user = userEvent.setup();
  const { rerender } = render(<ErosionSimulator config={{ terrain: 'soil', agents: ['ice'], vegetation: true }} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Run erosion' }));
  const normal = screen.getByTestId('erosion-after-geometry').getAttribute('data-shape');

  motion.reduced = true;
  rerender(<ErosionSimulator config={{ terrain: 'soil', agents: ['ice'], vegetation: true }} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Run erosion' }));
  expect(screen.getByTestId('widget-erosion-simulator')).toHaveAttribute('data-motion', 'off');
  expect(screen.getByTestId('erosion-after-geometry')).toHaveAttribute('data-shape', normal!);
  expect(screen.getByTestId('erosion-after')).toHaveTextContent(/ice.*erosion/i);
  motion.reduced = false;
});

test('does not complete for a non-target run and emits completion only once', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<ErosionSimulator config={{ terrain: 'soil', agents: ['wind', 'water'], targetAgent: 'water' }} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Run erosion' }));
  expect(screen.getByTestId('widget-erosion-simulator')).toHaveAttribute('data-state', 'testing');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);
  await user.click(screen.getByRole('button', { name: 'Use water' }));
  await user.click(screen.getByRole('button', { name: 'Run erosion' }));
  await user.click(screen.getByRole('button', { name: 'Run erosion' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('rock terrain rejects vegetation whenever it is authored and never exposes a toggle', () => {
  expect(ErosionSimulatorWidgetConfigSchema.safeParse({ terrain: 'rock', agents: ['ice'], vegetation: true }).success).toBe(false);
  expect(ErosionSimulatorWidgetConfigSchema.safeParse({ terrain: 'rock', agents: ['ice'], vegetation: false }).success).toBe(false);
  render(<ErosionSimulator config={{ terrain: 'rock', agents: ['ice'] }} onEvent={vi.fn()} />);
  expect(screen.queryByRole('button', { name: 'Toggle vegetation' })).toBeNull();
});

test('renders a distinct authored vegetation geometry and accessible movement amount for every loose-terrain agent', async () => {
  const user = userEvent.setup();
  for (const terrain of ['soil', 'sand'] as const) {
    for (const agent of ['water', 'wind', 'ice'] as const) {
      const view = render(<ErosionSimulator config={{ terrain, agents: [agent], vegetation: false }} onEvent={vi.fn()} />);
      await user.click(screen.getByRole('button', { name: 'Run erosion' }));
      const bare = screen.getByTestId('erosion-after-geometry').getAttribute('data-pattern');
      await user.click(screen.getByRole('button', { name: 'Toggle vegetation' }));
      await user.click(screen.getByRole('button', { name: 'Run erosion' }));
      const covered = screen.getByTestId('erosion-after-geometry');
      expect(covered).not.toHaveAttribute('data-pattern', bare!);
      expect(covered).toHaveAccessibleName(/less movement.*does not stop all erosion/i);
      view.unmount();
    }
  }
});

test('only marks a result stale when an input changes after a run', async () => {
  const user = userEvent.setup();
  render(<ErosionSimulator config={{ terrain: 'soil', agents: ['water', 'wind'], targetAgent: 'water' }} onEvent={vi.fn()} />);

  await user.click(screen.getByRole('button', { name: 'Use water' }));
  expect(screen.getByRole('status')).not.toHaveTextContent(/stale/i);
  expect(screen.getByTestId('erosion-after')).toHaveAttribute('data-stale', 'no');
  await user.click(screen.getByRole('button', { name: 'Run erosion' }));
  await user.click(screen.getByRole('button', { name: 'Use water' }));
  expect(screen.getByTestId('widget-erosion-simulator')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByTestId('erosion-after')).toHaveAttribute('data-stale', 'no');
  expect(screen.getByRole('status')).not.toHaveTextContent(/stale/i);
  await user.click(screen.getByRole('button', { name: 'Use wind' }));
  expect(screen.getByTestId('widget-erosion-simulator')).toHaveAttribute('data-state', 'testing');
  expect(screen.getByTestId('erosion-after')).toHaveAttribute('data-stale', 'yes');
});

test('keeps no-target runs incomplete and preserves final state through reset, config rerender, and reduced motion', async () => {
  const user = userEvent.setup();
  const noTargetEvents = vi.fn();
  const { rerender } = render(<ErosionSimulator config={{ terrain: 'soil', agents: ['water'], vegetation: false }} onEvent={noTargetEvents} />);
  await user.click(screen.getByRole('button', { name: 'Run erosion' }));
  expect(screen.getByTestId('widget-erosion-simulator')).toHaveAttribute('data-state', 'testing');
  expect(noTargetEvents.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByTestId('erosion-after')).toHaveAttribute('data-agent', 'none');
  expect(screen.getByRole('button', { name: 'Use water' })).toHaveAttribute('aria-pressed', 'true');

  const normalEvents = vi.fn();
  rerender(<ErosionSimulator config={{ terrain: 'soil', agents: ['water'], targetAgent: 'water' }} onEvent={normalEvents} />);
  await user.click(screen.getByRole('button', { name: 'Run erosion' }));
  const normal = {
    geometry: screen.getByTestId('erosion-after-geometry').outerHTML,
    after: screen.getByTestId('erosion-after').textContent,
    status: screen.getByRole('status').textContent,
    events: normalEvents.mock.calls.map(([event]) => event),
  };

  motion.reduced = true;
  const reducedEvents = vi.fn();
  rerender(<ErosionSimulator config={{ terrain: 'soil', agents: ['water'], vegetation: false, targetAgent: 'water' }} onEvent={reducedEvents} />);
  await user.click(screen.getByRole('button', { name: 'Run erosion' }));
  expect(screen.getByTestId('widget-erosion-simulator')).toHaveAttribute('data-motion', 'off');
  expect({
    geometry: screen.getByTestId('erosion-after-geometry').outerHTML,
    after: screen.getByTestId('erosion-after').textContent,
    status: screen.getByRole('status').textContent,
    events: reducedEvents.mock.calls.map(([event]) => event),
  }).toEqual(normal);
  expect(screen.getByTestId('widget-erosion-simulator')).toHaveAttribute('data-state', 'complete');
  motion.reduced = false;
});
