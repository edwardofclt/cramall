import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import NumberLineCompare from './NumberLineCompare';
import PlaceValueBuilder, { numberToWords } from './PlaceValueBuilder';

type User = ReturnType<typeof userEvent.setup>;

/** Taps the same button `times` times — the kid's actual interaction, one poke at a time. */
async function tap(user: User, name: string, times = 1) {
  const button = screen.getByRole('button', { name });
  for (let i = 0; i < times; i += 1) await user.click(button);
}

describe('numberToWords', () => {
  test.each([
    [0, 'zero'],
    [7, 'seven'],
    [13, 'thirteen'],
    [20, 'twenty'],
    [42, 'forty-two'],
    [100, 'one hundred'],
    [405, 'four hundred five'],
    [999, 'nine hundred ninety-nine'],
    [1_000, 'one thousand'],
    [1_234, 'one thousand two hundred thirty-four'],
    [40_000, 'forty thousand'],
    [905_060, 'nine hundred five thousand sixty'],
    [1_000_000, 'one million'],
    [68_405_013, 'sixty-eight million four hundred five thousand thirteen'],
    [900_000_000, 'nine hundred million'],
    [999_999_999, 'nine hundred ninety-nine million nine hundred ninety-nine thousand nine hundred ninety-nine'],
  ])('%i reads as "%s"', (value, words) => {
    expect(numberToWords(value)).toBe(words);
  });
});

describe('PlaceValueBuilder', () => {
  test('starts empty, in the building state, with all three forms of zero', () => {
    render(<PlaceValueBuilder config={{}} />);

    const root = screen.getByTestId('widget-place-value-builder');
    expect(root).toHaveAttribute('data-state', 'building');
    expect(screen.getByTestId('pv-standard')).toHaveTextContent('0');
    expect(screen.getByTestId('pv-words')).toHaveTextContent('zero');
    expect(screen.getByTestId('pv-expanded')).toHaveTextContent('0');
  });

  test('building the target number matches it and celebrates', async () => {
    const user = userEvent.setup();
    render(<PlaceValueBuilder config={{ target: 340 }} />);

    await tap(user, 'Add one to the hundreds place', 3);
    await tap(user, 'Add one to the tens place', 4);

    expect(screen.getByTestId('pv-standard')).toHaveTextContent('340');
    expect(screen.getByTestId('pv-expanded')).toHaveTextContent('300 + 40');
    expect(screen.getByTestId('pv-words')).toHaveTextContent('three hundred forty');
    expect(screen.getByTestId('widget-place-value-builder')).toHaveAttribute('data-state', 'matched');
    expect(screen.getByTestId('pv-feedback')).toHaveTextContent(/you built it/i);
  });

  test('stays in the building state until the number is exactly the target', async () => {
    const user = userEvent.setup();
    render(<PlaceValueBuilder config={{ target: 340 }} />);

    await tap(user, 'Add one to the hundreds place', 3);

    const root = screen.getByTestId('widget-place-value-builder');
    expect(root).toHaveAttribute('data-state', 'building');
    expect(screen.getByTestId('pv-standard')).toHaveTextContent('300');
    expect(screen.queryByText(/you built it/i)).toBeNull();
  });

  test('a matched number can be un-built again', async () => {
    const user = userEvent.setup();
    render(<PlaceValueBuilder config={{ target: 40 }} />);

    await tap(user, 'Add one to the tens place', 4);
    expect(screen.getByTestId('widget-place-value-builder')).toHaveAttribute('data-state', 'matched');

    await tap(user, 'Take one from the tens place');

    expect(screen.getByTestId('widget-place-value-builder')).toHaveAttribute('data-state', 'building');
    expect(screen.getByTestId('pv-standard')).toHaveTextContent('30');
  });

  test('groups big numbers with commas and reads them correctly', async () => {
    const user = userEvent.setup();
    render(<PlaceValueBuilder config={{}} />);

    await tap(user, 'Add one to the thousands place', 1);
    await tap(user, 'Add one to the hundreds place', 2);
    await tap(user, 'Add one to the tens place', 3);
    await tap(user, 'Add one to the ones place', 4);

    expect(screen.getByTestId('pv-standard')).toHaveTextContent('1,234');
    expect(screen.getByTestId('pv-words')).toHaveTextContent('one thousand two hundred thirty-four');
    expect(screen.getByTestId('pv-expanded')).toHaveTextContent('1,000 + 200 + 30 + 4');
  });

  test('digits clamp at 0 and 9 instead of wrapping', async () => {
    const user = userEvent.setup();
    render(<PlaceValueBuilder config={{}} />);

    expect(screen.getByRole('button', { name: 'Take one from the ones place' })).toBeDisabled();

    await tap(user, 'Add one to the ones place', 9);

    expect(screen.getByTestId('pv-digit-ones')).toHaveTextContent('9');
    expect(screen.getByRole('button', { name: 'Add one to the ones place' })).toBeDisabled();
    expect(screen.getByTestId('pv-standard')).toHaveTextContent('9');
  });

  test('shows ones through hundred thousands by default', () => {
    render(<PlaceValueBuilder config={{}} />);

    expect(screen.getAllByTestId('pv-column')).toHaveLength(6);
    expect(screen.getByTestId('pv-digit-hundred-thousands')).toBeInTheDocument();
    expect(screen.queryByTestId('pv-digit-millions')).toBeNull();
  });

  test('three periods reaches the hundred millions', () => {
    render(<PlaceValueBuilder config={{ periods: 3 }} />);

    expect(screen.getAllByTestId('pv-column')).toHaveLength(9);
    expect(screen.getByTestId('pv-digit-hundred-millions')).toBeInTheDocument();
  });

  test('survives a nonsense config instead of crashing the lesson', () => {
    render(<PlaceValueBuilder config={{ target: 'banana', periods: 47, start: 482 }} />);

    expect(screen.getAllByTestId('pv-column')).toHaveLength(6);
    expect(screen.getByTestId('widget-place-value-builder')).toHaveAttribute('data-state', 'building');
  });
});

describe('NumberLineCompare', () => {
  const CONFIG = { min: 0, max: 100, a: 25, b: 52 };

  test('starts in the choosing state with both markers on the line', () => {
    render(<NumberLineCompare config={CONFIG} />);

    const root = screen.getByTestId('widget-number-line-compare');
    expect(root).toHaveAttribute('data-state', 'choosing');
    expect(screen.getByTestId('marker-a-value')).toHaveTextContent('25');
    expect(screen.getByTestId('marker-b-value')).toHaveTextContent('52');
    expect(screen.queryByTestId('nl-feedback')).toBeNull();
  });

  test('choosing the right symbol is correct and cheers', async () => {
    const user = userEvent.setup();
    render(<NumberLineCompare config={CONFIG} />);

    await tap(user, 'less than');

    expect(screen.getByTestId('widget-number-line-compare')).toHaveAttribute('data-state', 'correct');
    expect(screen.getByTestId('nl-feedback')).toHaveTextContent(/25 is less than 52/i);
  });

  test('a wrong symbol says try again and lets the kid keep trying', async () => {
    const user = userEvent.setup();
    render(<NumberLineCompare config={CONFIG} />);

    await tap(user, 'greater than');

    const root = screen.getByTestId('widget-number-line-compare');
    expect(root).toHaveAttribute('data-state', 'incorrect');
    expect(screen.getByTestId('nl-feedback')).toHaveTextContent(/try again/i);
    expect(screen.getByRole('button', { name: 'less than' })).toBeEnabled();

    await tap(user, 'less than');

    expect(root).toHaveAttribute('data-state', 'correct');
  });

  test('the steppers move a marker and the comparison uses where it lands', async () => {
    const user = userEvent.setup();
    render(<NumberLineCompare config={{ min: 0, max: 100, a: 25, b: 27 }} />);

    await tap(user, 'Move A right', 2);

    expect(screen.getByTestId('marker-a-value')).toHaveTextContent('27');

    await tap(user, 'equal to');

    expect(screen.getByTestId('widget-number-line-compare')).toHaveAttribute('data-state', 'correct');
    expect(screen.getByTestId('nl-feedback')).toHaveTextContent(/27 is equal to 27/i);
  });

  test('markers stop at the ends of the line', async () => {
    const user = userEvent.setup();
    render(<NumberLineCompare config={{ min: 0, max: 5, a: 0, b: 5 }} />);

    expect(screen.getByRole('button', { name: 'Move A left' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Move B right' })).toBeDisabled();

    await tap(user, 'Move A right');

    expect(screen.getByTestId('marker-a-value')).toHaveTextContent('1');
    expect(screen.getByRole('button', { name: 'Move A left' })).toBeEnabled();
  });

  test('moving a marker after an answer asks the question again', async () => {
    const user = userEvent.setup();
    render(<NumberLineCompare config={CONFIG} />);

    await tap(user, 'less than');
    expect(screen.getByTestId('widget-number-line-compare')).toHaveAttribute('data-state', 'correct');

    await tap(user, 'Move A right');

    expect(screen.getByTestId('widget-number-line-compare')).toHaveAttribute('data-state', 'choosing');
    expect(screen.queryByTestId('nl-feedback')).toBeNull();
  });

  test('survives a nonsense config by falling back to a sane line', () => {
    render(<NumberLineCompare config={{ min: 'x', max: null, a: undefined, b: {} }} />);

    expect(screen.getByTestId('marker-a-value')).toHaveTextContent('25');
    expect(screen.getByTestId('marker-b-value')).toHaveTextContent('52');
    expect(screen.getByTestId('widget-number-line-compare')).toHaveAttribute('data-state', 'choosing');
  });
});
