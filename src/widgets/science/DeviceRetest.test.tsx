import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { deviceRetestConfig } from '../../content/science/activityPrototypes';
import DeviceRetest from './DeviceRetest';

async function revealSuppliedRetest(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: 'Change the loose clip' }));
  await user.click(screen.getByRole('button', { name: 'Check my change plan' }));
  expect(screen.queryByRole('table', { name: 'Supplied retest records' })).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Inspect the supplied retest' }));
}

async function citeRecords(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByRole('spinbutton', { name: 'Original trials meeting the goal' }), '0');
  await user.type(screen.getByRole('spinbutton', { name: 'Retest trials meeting the goal' }), '3');
  await user.click(screen.getByRole('radio', { name: /battery type, lamp, switch, viewing condition, ten-second interval stayed the same/i }));
  await user.click(screen.getByRole('button', { name: 'Check my evidence notes' }));
}

async function chooseSupportedClaim(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('radio', { name: /performed better in these supplied trials/i }));
  await user.click(screen.getByRole('radio', { name: /three retest trials cannot show what will happen every time/i }));
  await user.click(screen.getByRole('button', { name: 'Check my evidence claim' }));
}

async function completeNotebook(user: ReturnType<typeof userEvent.setup>) {
  await citeRecords(user);
  await chooseSupportedClaim(user);
}

test('identifies the original gap and retains it when a multiple-change plan needs revision', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<DeviceRetest config={deviceRetestConfig} onEvent={onEvent} />);

  expect(screen.getByText('Supplied practice records')).toBeVisible();
  expect(screen.getByText(/goal: stay lit for all 10 seconds/i)).toBeVisible();
  const original = screen.getByRole('table', { name: 'Original records' });
  expect(within(original).getAllByRole('cell').map(cell => cell.textContent)).toEqual(['6 seconds', '7 seconds', '6 seconds']);
  expect(within(original).queryByText(/met|missed/i)).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /0 of 3 trials met the goal/i }));
  expect(screen.getByLabelText('Original gap feedback')).toHaveTextContent(/0 of 3.*10-second goal/i);
  expect(within(original).getAllByText('Missed')).toHaveLength(3);

  await user.click(screen.getByRole('button', { name: 'Change the loose clip' }));
  await user.click(screen.getByRole('button', { name: 'Change the battery' }));
  await user.click(screen.getByRole('button', { name: 'Check my change plan' }));

  expect(screen.getByLabelText('Plan feedback')).toHaveTextContent(/several changes.*one-feature plan/i);
  expect(screen.getByLabelText('Original gap feedback')).toHaveTextContent(/0 of 3/i);
  expect(screen.queryByRole('table', { name: 'Supplied retest records' })).not.toBeInTheDocument();
  expect(onEvent.mock.calls.map(([event]) => event)).toContainEqual({ type: 'coach', cue: 'retry' });
});

test('labels another single change as a plan that needs a new test without inventing an outcome', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<DeviceRetest config={deviceRetestConfig} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: /0 of 3 trials met the goal/i }));
  await user.click(screen.getByRole('button', { name: 'Change the lamp' }));
  await user.click(screen.getByRole('button', { name: 'Check my change plan' }));

  expect(screen.getByLabelText('Plan feedback')).toHaveTextContent(/potentially valid one-change plan/i);
  expect(screen.getByLabelText('Plan feedback')).toHaveTextContent(/Needs a new test/i);
  expect(screen.getByLabelText('Plan feedback')).not.toHaveAttribute('data-outcome');
  expect(screen.queryByRole('table', { name: 'Supplied retest records' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Inspect the supplied retest' })).not.toBeInTheDocument();
  expect(onEvent.mock.calls.map(([event]) => event)).toContainEqual({ type: 'coach', cue: 'strategy' });
  expect(onEvent.mock.calls.map(([event]) => event)).not.toContainEqual({ type: 'coach', cue: 'retry' });
});

test('reveals the supplied clip-only retest only after explicit inspection and retains both record sets', async () => {
  const user = userEvent.setup();
  render(<DeviceRetest config={deviceRetestConfig} onEvent={vi.fn()} />);

  await user.click(screen.getByRole('button', { name: /0 of 3 trials met the goal/i }));
  await revealSuppliedRetest(user);

  const retest = screen.getByRole('table', { name: 'Supplied retest records' });
  expect(within(retest).getAllByRole('cell').map(cell => cell.textContent)).toEqual(['10 seconds', '10 seconds', '10 seconds']);
  expect(within(retest).queryByText(/^Met$/)).not.toBeInTheDocument();
  expect(screen.queryByText(/3 of 3 met the 10-second goal/i)).not.toBeInTheDocument();
  expect(screen.getByRole('table', { name: 'Original records' })).toBeVisible();
  expect(screen.getByRole('img', { name: /original trial bars.*6, 7, and 6 seconds.*10-second goal/i })).toBeVisible();
  expect(screen.getByRole('img', { name: /supplied retest trial bars.*10, 10, and 10 seconds.*10-second goal/i })).toBeVisible();
  expect(screen.getByLabelText('Plan feedback')).toHaveTextContent(/only the loose clip/i);
  expect(screen.getByText(/setup diagram.*not a measurement of energy/i)).toBeVisible();
  expect(screen.getByLabelText('Supplied setup record')).toHaveTextContent(/only that clip was replaced.*battery type, lamp, switch, viewing condition, ten-second interval/i);
});

test('requires learner-entered counts and unchanged conditions before unlocking a claim', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<DeviceRetest config={deviceRetestConfig} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: /0 of 3 trials met the goal/i }));
  await revealSuppliedRetest(user);

  expect(screen.queryByRole('radio', { name: /performed better in these supplied trials/i })).not.toBeInTheDocument();
  expect(screen.queryByText(/3 of 3 met the 10-second goal/i)).not.toBeInTheDocument();
  await user.type(screen.getByRole('spinbutton', { name: 'Original trials meeting the goal' }), '0');
  await user.type(screen.getByRole('spinbutton', { name: 'Retest trials meeting the goal' }), '2');
  await user.click(screen.getByRole('radio', { name: /battery, lamp, and clip all changed/i }));
  await user.click(screen.getByRole('button', { name: 'Check my evidence notes' }));

  expect(screen.getByLabelText('Evidence notes feedback')).toHaveTextContent(/check both counts.*conditions stayed steady/i);
  expect(screen.queryByRole('radio', { name: /performed better in these supplied trials/i })).not.toBeInTheDocument();
  expect(screen.getByLabelText('Original gap feedback')).toHaveTextContent(/0 of 3/i);
  expect(screen.getByLabelText('Plan feedback')).toHaveTextContent(/only the loose clip/i);
  expect(screen.getByRole('table', { name: 'Original records' })).toBeVisible();
  expect(screen.getByRole('table', { name: 'Supplied retest records' })).toBeVisible();

  await user.clear(screen.getByRole('spinbutton', { name: 'Retest trials meeting the goal' }));
  await user.type(screen.getByRole('spinbutton', { name: 'Retest trials meeting the goal' }), '3');
  await user.click(screen.getByRole('radio', { name: /battery type, lamp, switch, viewing condition, ten-second interval stayed the same/i }));
  await user.click(screen.getByRole('button', { name: 'Check my evidence notes' }));

  expect(screen.getByLabelText('Evidence notes feedback')).toHaveTextContent(/cited both record sets.*held-steady conditions/i);
  expect(screen.getByRole('radio', { name: /performed better in these supplied trials/i })).toBeVisible();
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);
});

test('uses one plot region so a full-height bar reaches the fixed goal line', async () => {
  const user = userEvent.setup();
  render(<DeviceRetest config={deviceRetestConfig} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: /0 of 3 trials met the goal/i }));
  await revealSuppliedRetest(user);

  const chart = screen.getByRole('img', { name: /supplied retest trial bars/i });
  expect(screen.getByRole('region', { name: 'Compare a device retest work surface' })).toHaveAttribute('tabindex', '0');
  const region = chart.querySelector('.dr-plot-region');
  expect(region).not.toBeNull();
  expect(region?.querySelector('.dr-goal-line')).not.toBeNull();
  const fullBars = region?.querySelectorAll<HTMLElement>('.dr-bar[data-seconds="10"]');
  expect(fullBars).toHaveLength(3);
  fullBars?.forEach(bar => expect(bar).toHaveStyle({ '--dr-height': '100%' }));
});

test('requires a bounded supported claim and limit before completing once', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<DeviceRetest config={deviceRetestConfig} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: /0 of 3 trials met the goal/i }));
  await revealSuppliedRetest(user);
  await citeRecords(user);

  await user.click(screen.getByRole('radio', { name: /will never flicker again/i }));
  await user.click(screen.getByRole('radio', { name: /proved the loose clip caused every failure/i }));
  await user.click(screen.getByRole('button', { name: 'Check my evidence claim' }));
  expect(screen.getByLabelText('Claim feedback')).toHaveTextContent(/goes beyond these supplied records/i);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);

  await chooseSupportedClaim(user);
  await user.click(screen.getByRole('button', { name: 'Check my evidence claim' }));

  expect(screen.getByLabelText('Claim feedback')).toHaveTextContent(/performed better in these trials.*cannot promise/i);
  expect(within(screen.getByRole('table', { name: 'Supplied retest records' })).getAllByText('Met')).toHaveLength(3);
  expect(screen.getByText(/3 of 3 met the 10-second goal/i)).toBeVisible();
  expect(screen.getByTestId('widget-device-retest')).toHaveAttribute('data-state', 'complete');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete').map(([event]) => event)).toEqual([
    { type: 'complete', value: { metBefore: 0, metAfter: 3 } },
  ]);
});

test('changing the plan removes downstream records and success while keeping the original record', async () => {
  const user = userEvent.setup();
  render(<DeviceRetest config={deviceRetestConfig} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: /0 of 3 trials met the goal/i }));
  await revealSuppliedRetest(user);
  await completeNotebook(user);

  await user.click(screen.getByRole('button', { name: 'Change the battery' }));

  expect(screen.getByTestId('widget-device-retest')).toHaveAttribute('data-state', 'planning');
  expect(screen.queryByRole('table', { name: 'Supplied retest records' })).not.toBeInTheDocument();
  expect(screen.queryByLabelText('Claim feedback')).not.toBeInTheDocument();
  expect(screen.getByRole('table', { name: 'Original records' })).toBeVisible();
  expect(screen.getByLabelText('Original gap feedback')).toHaveTextContent(/0 of 3/i);
});

test('revising the original gap after completion clears every downstream result', async () => {
  const user = userEvent.setup();
  render(<DeviceRetest config={deviceRetestConfig} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: /0 of 3 trials met the goal/i }));
  await revealSuppliedRetest(user);
  await completeNotebook(user);

  await user.click(screen.getByRole('button', { name: 'All trials met the goal' }));

  expect(screen.getByTestId('widget-device-retest')).toHaveAttribute('data-state', 'planning');
  expect(screen.getByLabelText('Original gap feedback')).toHaveTextContent(/each original time is shorter/i);
  expect(screen.queryByRole('button', { name: 'Change the loose clip' })).not.toBeInTheDocument();
  expect(screen.queryByRole('table', { name: 'Supplied retest records' })).not.toBeInTheDocument();
  expect(screen.queryByLabelText('Claim feedback')).not.toBeInTheDocument();
});

test('reset starts a new attempt that can complete once and configuration changes clear stale state', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  const { rerender } = render(<DeviceRetest config={deviceRetestConfig} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: /0 of 3 trials met the goal/i }));
  await revealSuppliedRetest(user);
  await completeNotebook(user);

  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.queryByLabelText('Original gap feedback')).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Change the loose clip' })).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /0 of 3 trials met the goal/i }));
  expect(screen.getByRole('button', { name: 'Change the loose clip' })).toHaveAttribute('aria-pressed', 'false');
  await revealSuppliedRetest(user);
  await completeNotebook(user);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(2);

  rerender(<DeviceRetest config={{ ...deviceRetestConfig, title: 'Backup lamp comparison', before: [4, 4, 4] }} onEvent={onEvent} />);
  expect(screen.getByRole('heading', { name: 'Backup lamp comparison' })).toBeVisible();
  expect(screen.queryByRole('table', { name: 'Supplied retest records' })).not.toBeInTheDocument();
  expect(screen.queryByLabelText('Original gap feedback')).not.toBeInTheDocument();
});

test('keeps widget state local instead of writing learner storage', async () => {
  const write = vi.spyOn(Storage.prototype, 'setItem');
  const user = userEvent.setup();
  render(<DeviceRetest config={deviceRetestConfig} onEvent={vi.fn()} />);

  await user.click(screen.getByRole('button', { name: /0 of 3 trials met the goal/i }));
  await revealSuppliedRetest(user);
  await completeNotebook(user);

  expect(write).not.toHaveBeenCalled();
  write.mockRestore();
});
