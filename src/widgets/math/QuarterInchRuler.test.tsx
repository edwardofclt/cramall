import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import QuarterInchRuler from './QuarterInchRuler';

test('moves to 2.25 inches with next-state events and one completion', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();

  render(<QuarterInchRuler config={{ lengthInches: 3, targetInches: 2.25 }} onEvent={onEvent} />);

  for (let index = 0; index < 9; index += 1) {
    await user.click(screen.getByRole('button', { name: 'Move marker right one quarter inch' }));
  }

  expect(screen.getAllByTestId('ruler-tick')).toHaveLength(13);
  expect(onEvent.mock.calls.slice(-3).map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'move-marker' },
    { type: 'change', value: { inches: 2.25 } },
    { type: 'complete', value: { inches: 2.25 } },
  ]);

  await user.click(screen.getByRole('button', { name: 'Move marker left one quarter inch' }));
  await user.click(screen.getByRole('button', { name: 'Move marker right one quarter inch' }));

  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
});

test('equal start and target do not complete on mount', () => {
  const onEvent = vi.fn();

  render(<QuarterInchRuler config={{ lengthInches: 3, startInches: 1, targetInches: 1 }} onEvent={onEvent} />);

  expect(screen.getByTestId('widget-quarter-inch-ruler')).toHaveAttribute('data-state', 'measuring');
  expect(onEvent).not.toHaveBeenCalled();
});

test('renders a spatial quarter-inch ruler with labeled whole ticks and an aligned marker', () => {
  render(<QuarterInchRuler config={{ lengthInches: 3, startInches: 1.5, targetInches: 2 }} onEvent={() => {}} />);

  const ruler = screen.getByRole('img', { name: 'Quarter-inch ruler from 0 to 3 inches. Marker at 1 1/2 inches (1.5 inches).' });
  expect(ruler.querySelectorAll('[data-tick-kind="whole"]')).toHaveLength(4);
  expect(ruler.querySelectorAll('[data-tick-kind="half"]')).toHaveLength(3);
  expect(ruler.querySelectorAll('[data-tick-kind="quarter"]')).toHaveLength(6);
  expect(ruler.querySelector('[data-marker="true"]')).toHaveAttribute('data-inches', '1.5');
  expect(screen.getByText('3')).toBeInTheDocument();
});
