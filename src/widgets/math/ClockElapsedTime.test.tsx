import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import ClockElapsedTime from './ClockElapsedTime';

test('elapsed mode crosses midnight without mount events', () => {
  const onEvent = vi.fn();

  render(
    <ClockElapsedTime
      config={{ mode: 'elapsed', startTime: '23:45', elapsedMinutes: 30, minuteStep: 15 }}
      onEvent={onEvent}
    />,
  );

  expect(screen.getByTestId('clock-result')).toHaveTextContent('12:15 AM');
  expect(onEvent).not.toHaveBeenCalled();
});

test('elapsed jumps retain their timeline and hide the target until exact completion', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <ClockElapsedTime
      config={{ mode: 'elapsed', startTime: '09:00', elapsedMinutes: 35, jumpMinutes: [5, 10, 15] }}
      onEvent={onEvent}
    />,
  );
  await user.type(screen.getByRole('textbox', { name: 'My predicted ending time' }), '10:00 AM');
  await user.click(screen.getByRole('button', { name: 'Save prediction' }));


  expect(screen.queryByText('9:35 AM')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Add 15 minutes' })).toBeEnabled();
  expect(screen.getByText(/35 minutes remaining\./)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Add 15 minutes' }));

  expect(screen.getByTestId('clock-current-result')).toHaveTextContent('9:15 AM');
  expect(screen.getByTestId('clock-jump-1')).toHaveTextContent('9:00 AM → 15 minutes → 9:15 AM');
  expect(screen.getByText(/20 minutes remaining\./)).toBeInTheDocument();
  expect(onEvent.mock.calls.slice(-2).map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'change-minute' },
    { type: 'change', value: { hour: 9, minute: 15, totalMinutes: 555 } },
  ]);
});

test('elapsed jumps disable overshoots, name the remaining interval, and complete once', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <ClockElapsedTime
      config={{ mode: 'elapsed', startTime: '09:45', elapsedMinutes: 35, jumpMinutes: [5, 10, 15] }}
      onEvent={onEvent}
    />,
  );
  await user.type(screen.getByRole('textbox', { name: 'My predicted ending time' }), '10:00 AM');
  await user.click(screen.getByRole('button', { name: 'Save prediction' }));


  await user.click(screen.getByRole('button', { name: 'Add 15 minutes' }));
  await user.click(screen.getByRole('button', { name: 'Add 15 minutes' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'coach' && event.cue === 'milestone')).toHaveLength(1);
  const overshoot = screen.getByRole('button', { name: 'Add 15 minutes' });
  expect(overshoot).toHaveAttribute('aria-disabled', 'true');
  expect(screen.getByText(/5 minutes remaining\./, { selector: 'p[role="status"]' })).toBeInTheDocument();
  overshoot.focus();
  await user.keyboard('{Enter}');
  expect(onEvent.mock.calls.map(([event]) => event)).toContainEqual({ type: 'coach', cue: 'retry' });

  await user.click(screen.getByRole('button', { name: 'Add 5 minutes' }));
  expect(screen.getByTestId('widget-clock-elapsed-time')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByTestId('clock-end-result')).toHaveTextContent('10:20 AM');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);

  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.queryAllByTestId(/clock-jump-/)).toHaveLength(0);
  expect(screen.getByTestId('clock-current-result')).toHaveTextContent('9:45 AM');
  expect(screen.getByTestId('widget-clock-elapsed-time')).toHaveAttribute('data-complete', 'no');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'coach' && event.cue === 'retry')).toHaveLength(1);
});

test('elapsed jumps offer an accessible final remainder for targets outside the jump set', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <ClockElapsedTime
      config={{ mode: 'elapsed', startTime: '09:00', elapsedMinutes: 7, jumpMinutes: [5, 10, 15] }}
      onEvent={onEvent}
    />,
  );
  await user.type(screen.getByRole('textbox', { name: 'My predicted ending time' }), '10:00 AM');
  await user.click(screen.getByRole('button', { name: 'Save prediction' }));


  await user.click(screen.getByRole('button', { name: 'Add 5 minutes' }));
  const remainder = screen.getByRole('button', { name: 'Add remaining 2 minutes' });
  expect(remainder).toHaveAttribute('aria-disabled', 'false');
  await user.click(remainder);

  expect(screen.getByTestId('clock-end-result')).toHaveTextContent('9:07 AM');
  expect(screen.getByTestId('widget-clock-elapsed-time')).toHaveAttribute('data-complete', 'yes');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('a zero-minute elapsed interval has an explicit completion action', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <ClockElapsedTime
      config={{ mode: 'elapsed', startTime: '09:00', elapsedMinutes: 0, jumpMinutes: [5, 10, 15] }}
      onEvent={onEvent}
    />,
  );
  await user.type(screen.getByRole('textbox', { name: 'My predicted ending time' }), '10:00 AM');
  await user.click(screen.getByRole('button', { name: 'Save prediction' }));


  await user.click(screen.getByRole('button', { name: 'Complete 0-minute interval' }));
  expect(screen.getByTestId('widget-clock-elapsed-time')).toHaveAttribute('data-complete', 'yes');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('reset after completion clears progress without replaying completion or retry coaching', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(
    <ClockElapsedTime
      config={{ mode: 'elapsed', startTime: '09:00', elapsedMinutes: 5, jumpMinutes: [5] }}
      onEvent={onEvent}
    />,
  );
  await user.type(screen.getByRole('textbox', { name: 'My predicted ending time' }), '10:00 AM');
  await user.click(screen.getByRole('button', { name: 'Save prediction' }));


  await user.click(screen.getByRole('button', { name: 'Add 5 minutes' }));
  await user.click(screen.getByRole('button', { name: 'Start over' }));

  expect(screen.getByTestId('clock-current-result')).toHaveTextContent('9:00 AM');
  expect(screen.getByTestId('widget-clock-elapsed-time')).toHaveAttribute('data-complete', 'no');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'coach' && event.cue === 'retry')).toHaveLength(0);
});

test('set-time controls emit next time and one completion', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(<ClockElapsedTime config={{ mode: 'set-time', targetTime: '01:15', minuteStep: 15 }} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Increase hour' }));
  await user.click(screen.getByRole('button', { name: 'Increase minute' }));

  expect(onEvent.mock.calls.slice(-3).map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'change-minute' },
    { type: 'change', value: { hour: 1, minute: 15, totalMinutes: 75 } },
    { type: 'complete', value: { hour: 1, minute: 15, totalMinutes: 75 } },
  ]);

  await user.click(screen.getByRole('button', { name: 'Decrease minute' }));
  expect(screen.getByTestId('widget-clock-elapsed-time')).toHaveAttribute('data-state', 'setting');
  expect(screen.getByTestId('widget-clock-elapsed-time')).toHaveAttribute('data-complete', 'no');
  expect(screen.getByText('Clock shows 1:00 AM.', { selector: 'p[role="status"]' })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Increase minute' }));
  expect(screen.getByTestId('widget-clock-elapsed-time')).toHaveAttribute('data-state', 'complete');
  expect(screen.getByTestId('widget-clock-elapsed-time')).toHaveAttribute('data-complete', 'yes');

  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('midnight target does not complete on mount', () => {
  const onEvent = vi.fn();

  render(<ClockElapsedTime config={{ mode: 'set-time', targetTime: '00:00' }} onEvent={onEvent} />);

  expect(screen.getByTestId('widget-clock-elapsed-time')).toHaveAttribute('data-state', 'setting');
  expect(onEvent).not.toHaveBeenCalled();
});

test('renders a labeled analog clock with distinct hands and hour markers', () => {
  render(
    <ClockElapsedTime
      config={{ mode: 'elapsed', startTime: '03:30', elapsedMinutes: 0 }}
      onEvent={() => {}}
    />,
  );

  expect(screen.getByTestId('analog-clock')).toHaveAttribute('aria-label', 'Analog clock showing 3:30 AM');
  expect(screen.getAllByTestId('clock-hour-marker')).toHaveLength(12);
  expect(screen.getByTestId('clock-hour-hand')).toBeInTheDocument();
  expect(screen.getByTestId('clock-minute-hand')).toBeInTheDocument();
});
