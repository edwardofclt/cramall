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
  await user.click(screen.getByRole('button',{name:'Compare wave patterns'}));
  await user.click(screen.getByRole('button',{name:'The crests moved farther from the baseline'}));
  expect(screen.getByTestId('widget-wave-maker')).toHaveAttribute('data-state', 'complete');
  await user.click(screen.getByRole('button', { name: 'Decrease amplitude' }));
  expect(screen.getByTestId('widget-wave-maker')).toHaveAttribute('data-state', 'changing');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('shows authored targets and graph effects before the learner changes controls', () => {
  render(<WaveMaker config={{ medium: 'rope', amplitude: 2, frequency: 2, target: { amplitude: 4, frequency: 3 } }} onEvent={vi.fn()} />);

  expect(screen.getByText('Target amplitude: 4')).toBeInTheDocument();
  expect(screen.getByText('Target frequency: 3 cycles across this width')).toBeInTheDocument();
  expect(screen.getByTestId('wave-target-amplitude')).toHaveAttribute('data-target-amplitude', '4');
  expect(screen.getByText(/Read amplitude as vertical displacement from the baseline/i)).toBeInTheDocument();
  expect(screen.getByText(/read frequency as cycles across this fixed width/i)).toBeInTheDocument();
});

test('keeps adjustments neutral and coaches only a committed comparison', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<WaveMaker config={{ medium: 'rope', amplitude: 2, frequency: 2, target: { amplitude: 4 } }} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Increase amplitude' }));
  await user.click(screen.getByRole('button', { name: 'Decrease amplitude' }));
  await user.click(screen.getByRole('button', { name: 'Decrease amplitude' }));

  expect(onEvent.mock.calls.filter(([event]) => event.type === 'coach')).toHaveLength(0);
  await user.click(screen.getByRole('button',{name:'Compare wave patterns'}));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'coach').map(([event]) => event.cue)).toEqual(['retry']);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'coach').every(([event]) => Object.keys(event).sort().join(',') === 'cue,type')).toBe(true);
});

test('strictly bounds wave levels and requires a nonempty partial target', () => {
  expect(WaveMakerWidgetConfigSchema.safeParse({ medium: 'water', amplitude: 0 }).success).toBe(false);
  expect(WaveMakerWidgetConfigSchema.safeParse({ medium: 'rope', frequency: 11 }).success).toBe(false);
  expect(WaveMakerWidgetConfigSchema.safeParse({ medium: 'sound', target: {} }).success).toBe(false);
  expect(WaveMakerWidgetConfigSchema.safeParse({ medium: 'sound', amplitude: 4, target: { frequency: 3 } }).success).toBe(true);
});


test('an unmatched wave asks for adjustment without exposing one disabled answer', async () => {
  const user = userEvent.setup();
  render(<WaveMaker config={{ medium: 'rope', amplitude: 2, frequency: 2, target: { amplitude: 4 } }} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Increase amplitude' }));
  await user.click(screen.getByRole('button', { name: 'Compare wave patterns' }));
  expect(screen.queryByRole('button', { name: 'The crests moved farther from the baseline' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Only the number of cycles grows' })).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Increase amplitude' }));
  await user.click(screen.getByRole('button', { name: 'Compare wave patterns' }));
  expect(screen.getByRole('button', { name: 'The crests moved farther from the baseline' })).toBeEnabled();
  expect(screen.getByRole('button', { name: 'Only the number of cycles grows' })).toBeEnabled();
});
