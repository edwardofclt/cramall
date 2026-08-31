import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { CollisionRampWidgetConfigSchema } from '../../content/schema';
import CollisionRamp, { stuckCartDirection } from './CollisionRamp';

test('grades opposing next-state momenta rather than a hard-coded direction', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<CollisionRamp config={{ rampAngle: 20, massA: 1, massB: 1, speedA: 5, speedB: 4, target: 'predict-direction' }} onEvent={onEvent} />);

  expect(screen.getByRole('button', { name: 'Decrease cart A speed' })).toBeEnabled();
  expect(screen.getByRole('button', { name: 'Decrease cart B speed' })).toBeEnabled();
  await user.click(screen.getByRole('button', { name: 'Increase cart B speed' }));
  onEvent.mockClear();
  await user.click(screen.getByRole('button', { name: 'Stays the same' }));

  expect(screen.getByRole('status')).toHaveTextContent(/same.*correct/i);
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'choose-prediction' },
    { type: 'change', value: { rampAngle: 20, speedA: 5, speedB: 5 } },
    { type: 'complete', value: { prediction: 'same', correct: true } },
  ]);
  await user.click(screen.getByRole('button', { name: 'Stays the same' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByRole('status')).toHaveTextContent(/make a prediction/i);
});

test('shows labelled carts, live completion, and the simplified-model boundary', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<CollisionRamp config={{ massA: 2, massB: 1, speedA: 3, speedB: 1 }} onEvent={onEvent} />);

  expect(screen.getByRole('img', { name: /cart A.*mass 2.*right/i })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /cart B.*mass 1.*left/i })).toBeInTheDocument();
  expect(screen.getByText(/simplified.*not physical evidence or full physics/i)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Moves right' }));
  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-state', 'complete');
  await user.click(screen.getByRole('button', { name: 'Decrease cart A speed' }));
  expect(screen.getByTestId('widget-collision-ramp')).toHaveAttribute('data-state', 'testing');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('validates bounded visual setup and reports opposing stuck-cart directions', () => {
  expect(stuckCartDirection(2, 3, 3, 2)).toBe('same');
  expect(stuckCartDirection(2, 4, 3, 2)).toBe('right');
  expect(stuckCartDirection(1, 2, 3, 2)).toBe('left');
  expect(CollisionRampWidgetConfigSchema.safeParse({ massA: 0, massB: 1 }).success).toBe(false);
  expect(CollisionRampWidgetConfigSchema.safeParse({ massA: 1, massB: 1, rampAngle: 46 }).success).toBe(false);
});
