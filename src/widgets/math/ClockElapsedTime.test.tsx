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
  await user.click(screen.getByRole('button', { name: 'Increase minute' }));

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
