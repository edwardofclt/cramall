import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { WaveMakerWidgetConfigSchema } from '../../content/schema';
import WaveMaker from './WaveMaker';

test('changes both wave values and completes the configured target once', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  render(<WaveMaker config={{ medium: 'rope', amplitude: 2, frequency: 2, target: { amplitude: 3, frequency: 3 } }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Increase amplitude' }));
  onEvent.mockClear();
  await user.click(screen.getByRole('button', { name: 'Increase frequency' }));
  expect(screen.getByTestId('widget-wave-maker')).toHaveAttribute('data-amplitude', '3');
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'change-frequency' },
    { type: 'change', value: { amplitude: 3, frequency: 3 } },
    { type: 'complete', value: { amplitude: 3, frequency: 3 } },
  ]);
});

test('an initial target match is not presented or emitted as complete', () => {
  const onEvent = vi.fn();
  render(<WaveMaker config={{ medium: 'rope', amplitude: 2, frequency: 2, target: { amplitude: 2, frequency: 2 } }} onEvent={onEvent} />);
  expect(screen.getByTestId('widget-wave-maker')).toHaveAttribute('data-state', 'changing');
  expect(onEvent).not.toHaveBeenCalled();
});

test('keeps a fixed-width wave while amplitude changes height and frequency changes cycle geometry', async () => {
  const user = userEvent.setup();
  render(<WaveMaker config={{ medium: 'rope', amplitude: 2, frequency: 2 }} onEvent={vi.fn()} />);
  const read = () => screen.getByTestId('wave-geometry').getAttribute('points')!.split(' ');
  let points = read();
  expect(points).toHaveLength(81);
  expect(points[0]).toBe('0.00,50.00');
  expect(points[80]).toBe('100.00,50.00');
  expect(points[10]).toBe('12.50,44.00');
  await user.click(screen.getByRole('button', { name: 'Increase amplitude' }));
  points = read();
  expect(points[10]).toBe('12.50,41.00');
  await user.click(screen.getByRole('button', { name: 'Increase frequency' }));
  points = read();
  expect(points[0]).toBe('0.00,50.00');
  expect(points[80]).toBe('100.00,50.00');
  expect(points[10]).toBe('12.50,43.64');
  expect(points[20]).toBe('25.00,59.00');
  expect(screen.getByText(/Simplified wave model/)).toBeVisible();
});

test('keeps its visible state live and distinguishes sound from a literal air shape', async () => {
  const onEvent = vi.fn(); const user = userEvent.setup();
  render(<WaveMaker config={{ medium: 'sound', amplitude: 2, frequency: 2, target: { amplitude: 3 } }} onEvent={onEvent} />);
  expect(screen.getByText(/graph of changing relative pressure or displacement.*not the visible shape of air.*not direct evidence/i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /wave graph.*baseline.*amplitude 2.*frequency 2/i })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Increase amplitude' }));
  expect(screen.getByTestId('widget-wave-maker')).toHaveAttribute('data-state', 'complete');
  await user.click(screen.getByRole('button', { name: 'Decrease amplitude' }));
  expect(screen.getByTestId('widget-wave-maker')).toHaveAttribute('data-state', 'changing');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('strictly bounds wave levels and requires a nonempty partial target', () => {
  expect(WaveMakerWidgetConfigSchema.safeParse({ medium: 'water', amplitude: 0 }).success).toBe(false);
  expect(WaveMakerWidgetConfigSchema.safeParse({ medium: 'rope', frequency: 11 }).success).toBe(false);
  expect(WaveMakerWidgetConfigSchema.safeParse({ medium: 'sound', target: {} }).success).toBe(false);
  expect(WaveMakerWidgetConfigSchema.safeParse({ medium: 'sound', amplitude: 4, target: { frequency: 3 } }).success).toBe(true);
});
