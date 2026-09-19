import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { scaleReadingConfig } from '../../content/math/activityPrototypes';
import ScaleReading from './ScaleReading';

const unitNames = { oz: 'ounces', lb: 'pounds', g: 'grams', kg: 'kilograms' } as const;

async function recordItem(
  user: ReturnType<typeof userEvent.setup>,
  label: string,
  unit: keyof typeof unitNames,
  markerTenths: number,
  lower: number,
  upper: number,
  rounded: number,
) {
  const unitName = unitNames[unit];
  await user.click(screen.getByRole('button', { name: `Weigh ${label}` }));
  await user.click(screen.getByRole('button', { name: `Choose ${unitName}` }));
  await user.click(screen.getByRole('button', { name: `Place ${label} on the scale` }));
  fireEvent.change(screen.getByRole('slider', { name: 'Reading marker' }), { target: { value: String(markerTenths) } });
  await user.click(screen.getByRole('button', { name: 'Check marker' }));
  await user.type(screen.getByRole('spinbutton', { name: 'Lower whole number' }), String(lower));
  await user.type(screen.getByRole('spinbutton', { name: 'Upper whole number' }), String(upper));
  await user.click(screen.getByRole('button', { name: 'Check neighboring whole numbers' }));
  await user.selectOptions(screen.getByRole('combobox', { name: 'Nearest whole number' }), String(rounded));
  await user.click(screen.getByRole('button', { name: 'Record rounded measurement' }));
}

test('repairs marker and rounding errors, retains four unit records, and explains half-up rounding before completion', async () => {
  const user = userEvent.setup();
  const onEvent = vi.fn();
  render(<ScaleReading config={scaleReadingConfig} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Weigh Apple' }));
  await user.click(screen.getByRole('button', { name: 'Choose pounds' }));
  expect(screen.getByLabelText('Unit prediction feedback')).toHaveTextContent('You chose pounds');
  expect(screen.getByLabelText('Unit prediction feedback')).not.toHaveTextContent(/right|wrong|correct/i);
  await user.click(screen.getByRole('button', { name: 'Place Apple on the scale' }));
  expect(screen.getByText('Scale needle reads 5.6 ounces.')).toBeVisible();

  fireEvent.change(screen.getByRole('slider', { name: 'Reading marker' }), { target: { value: '55' } });
  await user.click(screen.getByRole('button', { name: 'Check marker' }));
  expect(screen.getByLabelText('Marker feedback')).toHaveTextContent('do not line up');
  expect(screen.queryByRole('spinbutton', { name: 'Lower whole number' })).not.toBeInTheDocument();
  fireEvent.change(screen.getByRole('slider', { name: 'Reading marker' }), { target: { value: '56' } });
  await user.click(screen.getByRole('button', { name: 'Check marker' }));
  expect(screen.getByLabelText('Marker feedback')).toHaveTextContent('5.6 ounces');

  await user.type(screen.getByRole('spinbutton', { name: 'Lower whole number' }), '5');
  await user.type(screen.getByRole('spinbutton', { name: 'Upper whole number' }), '6');
  await user.click(screen.getByRole('button', { name: 'Check neighboring whole numbers' }));
  await user.selectOptions(screen.getByRole('combobox', { name: 'Nearest whole number' }), '5');
  await user.click(screen.getByRole('button', { name: 'Record rounded measurement' }));
  expect(screen.getByLabelText('Rounding feedback')).toHaveTextContent('halfway point');
  expect(within(screen.getByRole('table', { name: 'Field notebook' })).queryByText('6 ounces')).not.toBeInTheDocument();
  await user.selectOptions(screen.getByRole('combobox', { name: 'Nearest whole number' }), '6');
  await user.click(screen.getByRole('button', { name: 'Record rounded measurement' }));

  await recordItem(user, 'Backpack', 'lb', 73, 7, 8, 7);
  await recordItem(user, 'Eraser', 'g', 234, 23, 24, 23);
  await recordItem(user, 'Camping kit', 'kg', 35, 3, 4, 4);

  const notebook = screen.getByRole('table', { name: 'Field notebook' });
  expect(notebook).toHaveTextContent('Apple5.6 ounces6 ounces');
  expect(notebook).toHaveTextContent('Backpack7.3 pounds7 pounds');
  expect(notebook).toHaveTextContent('Eraser23.4 grams23 grams');
  expect(notebook).toHaveTextContent('Camping kit3.5 kilograms4 kilograms');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);

  const wrongExplanation = screen.getByRole('button', { name: 'Always choose the lower whole number' });
  const correctExplanation = screen.getByRole('button', { name: 'At or above halfway rounds up; below halfway rounds down' });
  expect(wrongExplanation).not.toHaveAttribute('data-outcome');
  expect(correctExplanation).not.toHaveAttribute('data-outcome');
  await user.click(wrongExplanation);
  expect(wrongExplanation).toHaveAttribute('data-outcome', 'retry');
  expect(correctExplanation).not.toHaveAttribute('data-outcome');
  expect(screen.getByLabelText('Explanation feedback')).toHaveTextContent('Try again');
  await user.click(correctExplanation);
  expect(wrongExplanation).not.toHaveAttribute('data-outcome');
  expect(correctExplanation).toHaveAttribute('data-outcome', 'correct');
  expect(screen.getByText('Field kit record complete.')).toBeVisible();
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toEqual([[{
    type: 'complete',
    value: { records: { apple: 6, backpack: 7, eraser: 23, kit: 4 } },
  }]]);
  expect(screen.getByRole('button', { name: 'At or above halfway rounds up; below halfway rounds down' })).toBeDisabled();
});

test('reset starts a fresh local attempt and a config change clears the old notebook', async () => {
  const user = userEvent.setup();
  const onEvent = vi.fn();
  const { rerender } = render(<ScaleReading config={{ items: [scaleReadingConfig.items[3]] }} onEvent={onEvent} />);

  await recordItem(user, 'Camping kit', 'kg', 35, 3, 4, 4);
  await user.click(screen.getByRole('button', { name: 'At or above halfway rounds up; below halfway rounds down' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByRole('button', { name: 'Weigh Camping kit' })).toHaveFocus();
  expect(within(screen.getByRole('table', { name: 'Field notebook' })).queryByText('4 kilograms')).not.toBeInTheDocument();

  await recordItem(user, 'Camping kit', 'kg', 35, 3, 4, 4);
  await user.click(screen.getByRole('button', { name: 'At or above halfway rounds up; below halfway rounds down' }));
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(2);

  rerender(<ScaleReading config={{ items: [scaleReadingConfig.items[0]] }} onEvent={onEvent} />);
  expect(screen.getByRole('button', { name: 'Weigh Apple' })).toBeInTheDocument();
  expect(screen.queryByText('Camping kit')).not.toBeInTheDocument();
  expect(within(screen.getByRole('table', { name: 'Field notebook' })).queryByText('4 kilograms')).not.toBeInTheDocument();
});
