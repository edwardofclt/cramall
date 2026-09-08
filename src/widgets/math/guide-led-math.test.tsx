import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import AreaModelMultiplier from './AreaModelMultiplier';
import ArrayBuilder from './ArrayBuilder';
import FractionModels from './FractionModels';
import ProbabilitySpinner from './ProbabilitySpinner';
import ShapeClassifier from './ShapeClassifier';
import { unit11Lessons } from '../../content/math/u11';
import type { LearnCard } from '../../content/schema';

test('area asks for a committed total before revealing products and retains retry feedback', async () => {
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<AreaModelMultiplier config={{ a: 23, b: 14, splitA: [20, 3], splitB: [10, 4], targetProduct: 322, revealMode: 'progressive' }} onEvent={onEvent} />);
  expect(screen.getByTestId('area-model-total')).not.toHaveTextContent('322');
  await user.type(screen.getByRole('spinbutton', { name: 'My total area' }), '300');
  await user.click(screen.getByRole('button', { name: 'Check my total' }));
  expect(screen.getByLabelText('Area answer feedback')).toHaveTextContent('Try again');
  expect(onEvent.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(0);
});

test('division accepts a learner chosen group size and visibly conserves the dividend', async () => {
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<ArrayBuilder config={{ rows: 1, columns: 1, targetProduct: 234, editable: true, task: 'division', dividend: 936, divisor: 4 }} onEvent={onEvent} />);
  await user.type(screen.getByRole('spinbutton', { name: 'Amount for each group' }), '100');
  await user.click(screen.getByRole('button', { name: 'Share into equal groups' }));
  expect(screen.getByLabelText('Remaining to share')).toHaveTextContent('536');
  expect(screen.getAllByTestId('division-recipient')).toHaveLength(4);
  expect(screen.getByTestId('array-builder-quotient')).toHaveTextContent('100');
});

test('four times as many requires four groups of three, not any array with product twelve', async () => {
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<ArrayBuilder config={{ rows: 2, columns: 6, targetProduct: 12, targetRows: 4, targetColumns: 3, editable: true, taskPrompt: 'Build an array that shows four times as many as 3.' }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Check my groups' }));
  expect(screen.getByLabelText('Array check feedback')).toHaveTextContent('Try again');
  expect(onEvent.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(0);
});

test('fair sharing does not disclose each share and cannot distribute more than five wholes', async () => {
  const user = userEvent.setup();
  render(<FractionModels config={{ mode: 'circles', denominator: 6, numerator: 0, target: { numerator: 5, denominator: 6 }, allowEquivalent: false, task: 'share', taskPrompt: 'Share 5 whole units among 6 learners.' }} onEvent={vi.fn()} />);
  expect(screen.queryByText(/Each learner receives 5\/6 when/)).not.toBeInTheDocument();
  expect(screen.getByLabelText('Pieces left to share')).toHaveTextContent('30');
  for (let i = 0; i < 5; i++) await user.click(screen.getByRole('button', { name: 'Add one part' }));
  expect(screen.getByLabelText('Pieces left to share')).toHaveTextContent('0');
  expect(screen.getByRole('button', { name: 'Add one part' })).toBeDisabled();
});

test('shape alternative describes geometry without listing the keyed memberships', () => {
  const card = unit11Lessons.flatMap<LearnCard>(l => l.learnCards).find(c => 'widget' in c && c.widget?.type === 'shape-classifier');
  if (!card || !('widget' in card) || card.widget?.type !== 'shape-classifier') throw new Error('shape-classifier is missing');
  const config = card.widget.config;
  render(<ShapeClassifier config={config as Parameters<typeof ShapeClassifier>[0]['config']} onEvent={vi.fn()} />);
  for (const diagram of screen.getAllByRole('img')) expect(diagram).not.toHaveAccessibleName(/Canonical classes:/);
});

test('spinner reset after correct classification permits a fresh run without duplicating completion', async () => {
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<ProbabilitySpinner config={{ segments: [{ id: 'red', label: 'Red' }, { id: 'blue', label: 'Blue' }], trials: 1, eventQuestion: { eventLabel: 'red', classification: 'possible' } }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Predict Red' }));
  await user.click(screen.getByRole('button', { name: 'Spin' }));
  await user.click(screen.getByRole('button', { name: 'Possible' }));
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  await user.click(screen.getByRole('button', { name: 'Predict Blue' }));
  expect(screen.getByRole('button', { name: 'Spin' })).toBeEnabled();
  await user.click(screen.getByRole('button', { name: 'Spin' }));
  await user.click(screen.getByRole('button', { name: /^Possible/ }));
  expect(onEvent.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(1);
});

test('number-line comparison keeps the earlier answer when the markers move and supports reset', async () => {
  const { default: NumberLineCompare } = await import('./NumberLineCompare');
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<NumberLineCompare config={{ min: 0, max: 10, a: 2, b: 5, step: 1 }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'greater than' }));
  await user.click(screen.getByRole('button', { name: 'Move A right' }));
  expect(screen.getByLabelText('Previous comparison')).toHaveTextContent('2 > 5');
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByTestId('marker-a-value')).toHaveTextContent('2');
  expect(screen.queryByLabelText('Previous comparison')).not.toBeInTheDocument();
});

test('money collection renders each selected piece and treats changing a collection as neutral', async () => {
  const { default: MoneyCounter } = await import('./MoneyCounter');
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<MoneyCounter config={{ targetCents: 25, denominations: [5, 10, 25] }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Add a dime' }));
  await user.click(screen.getByRole('button', { name: 'Add a dime' }));
  await user.click(screen.getByRole('button', { name: 'Remove a dime' }));
  expect(screen.getAllByTestId('money-collected-piece')).toHaveLength(1);
  expect(onEvent.mock.calls.filter(([e]) => e.type === 'coach' && e.cue === 'retry')).toHaveLength(0);
  await user.click(screen.getByRole('button', { name: 'Check my collection' }));
  expect(screen.getByLabelText('Money check feedback')).toHaveTextContent('Try again');
});

test('shape memberships are neutral until checked and feedback belongs to that shape', async () => {
  const card = unit11Lessons.flatMap<LearnCard>(l => l.learnCards).find(c => 'widget' in c && c.widget?.type === 'shape-classifier');
  if (!card || !('widget' in card) || card.widget?.type !== 'shape-classifier') throw new Error('shape-classifier is missing');
  const config = card.widget.config;
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<ShapeClassifier config={config as Parameters<typeof ShapeClassifier>[0]['config']} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Select Shape E' }));
  await user.click(screen.getByRole('button', { name: 'Place selected shape in Rectangle' }));
  expect(screen.getByLabelText('Shape check feedback')).toHaveTextContent('not checked');
  await user.click(screen.getByRole('button', { name: 'Check these classes' }));
  expect(screen.getByLabelText('Shape check feedback')).toHaveTextContent('Try again');
  await user.click(screen.getByRole('button', { name: 'Select Shape C' }));
  expect(screen.getByLabelText('Shape check record')).toHaveTextContent('Shape E');
});

test('elapsed-time prediction is committed before jumps and survives an overshoot correction', async () => {
  const { default: ClockElapsedTime } = await import('./ClockElapsedTime');
  const user = userEvent.setup();
  render(<ClockElapsedTime config={{ mode: 'elapsed', startTime: '09:00', elapsedMinutes: 35, minuteStep: 5, jumpMinutes: [5, 10, 15] }} onEvent={vi.fn()} />);
  expect(screen.getByRole('button', { name: 'Add 15 minutes' })).toBeDisabled();
  await user.type(screen.getByRole('textbox', { name: 'My predicted ending time' }), '9:40 AM');
  await user.click(screen.getByRole('button', { name: 'Save prediction' }));
  await user.click(screen.getByRole('button', { name: 'Add 15 minutes' }));
  await user.click(screen.getByRole('button', { name: 'Add 15 minutes' }));
  await user.click(screen.getByRole('button', { name: 'Add 10 minutes' }));
  await user.click(screen.getByRole('button', { name: 'Add 5 minutes' }));
  expect(screen.getByLabelText('Time prediction record')).toHaveTextContent('9:40 AM');
  expect(screen.getByLabelText('Jump check feedback')).toHaveTextContent('10-minute jump');
});

test('ruler explores neutrally and checks the committed endpoint with a retained record', async () => {
  const { default: QuarterInchRuler } = await import('./QuarterInchRuler');
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<QuarterInchRuler config={{ lengthInches: 5, targetInches: 4.75, startInches: 0 }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Move marker right one quarter inch' }));
  await user.click(screen.getByRole('button', { name: 'Move marker left one quarter inch' }));
  expect(onEvent.mock.calls.filter(([e]) => e.type === 'coach' && e.cue === 'retry')).toHaveLength(0);
  await user.click(screen.getByRole('button', { name: 'Check my endpoint' }));
  expect(screen.getByLabelText('Endpoint check feedback')).toHaveTextContent('Try again');
  await user.click(screen.getByRole('button', { name: 'Move marker right one quarter inch' }));
  expect(screen.getByLabelText('Endpoint check feedback')).toHaveTextContent('0 inches');
});

test('place-value task lets the learner commit and retains the checked number after editing', async () => {
  const { default: PlaceValueBuilder } = await import('./PlaceValueBuilder');
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<PlaceValueBuilder config={{ target: 4302 }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Add one to the thousands place' }));
  await user.click(screen.getByRole('button', { name: 'Check my number' }));
  expect(screen.getByLabelText('Place-value check feedback')).toHaveTextContent('1,000');
  expect(screen.getByLabelText('Place-value check feedback')).toHaveTextContent('Try again');
  await user.click(screen.getByRole('button', { name: 'Add one to the hundreds place' }));
  expect(screen.getByLabelText('Place-value check feedback')).toHaveTextContent('1,000');
});

test('length conversion builds foot strips after prediction and retains that prediction during explanation', async () => {
  const { default: BalanceScale } = await import('./BalanceScale');
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<BalanceScale config={{ left: [{ id: 'feet', label: '3 feet', value: 36 }], right: [{ id: 'inches', label: '36 inches', value: 36 }], task: 'compare', lengthModel: { feet: 3, inches: 36 } }} onEvent={onEvent} />);
  expect(screen.queryByText('3 feet = 36 inches')).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'The feet length is longer' }));
  for (let i = 0; i < 3; i++) await user.click(screen.getByRole('button', { name: 'Add one foot strip' }));
  expect(screen.getAllByTestId('built-foot-strip')).toHaveLength(3);
  expect(screen.getByLabelText('Length prediction feedback')).toHaveTextContent('different');
  await user.type(screen.getByRole('spinbutton', { name: 'Inches in one foot' }), '12');
  await user.click(screen.getByRole('button', { name: 'Explain the comparison' }));
  expect(screen.getByLabelText('Length prediction feedback')).toHaveTextContent('different');
  expect(onEvent.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(1);
});

test('graph setup starts neutral and reset restores every setup decision without retry coaching', async () => {
  const { default: DataPlotBuilder } = await import('./DataPlotBuilder');
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<DataPlotBuilder config={{ kind: 'bar', prompt: 'Build the pet graph.', categories: ['dog', 'cat'], target: { dog: 2, cat: 1 }, sourceData: { dog: 2, cat: 1 }, displayChoices: ['bar', 'dot'] }} onEvent={onEvent} />);
  expect(screen.getByRole('button', { name: 'Bar graph' })).toHaveAttribute('aria-pressed', 'false');
  await user.click(screen.getByRole('button', { name: 'Bar graph' }));
  expect(screen.queryByRole('button', { name: 'Confirm display' })).not.toBeInTheDocument();
  await user.type(screen.getByRole('textbox', { name: 'Graph title' }), 'Our pets');
  await user.click(screen.getByRole('button', { name: 'Confirm title' }));
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByRole('textbox', { name: 'Graph title' })).toHaveValue('');
  expect(screen.getByRole('button', { name: 'Bar graph' })).toHaveAttribute('aria-pressed', 'false');
  expect(onEvent.mock.calls.filter(([e]) => e.type === 'coach' && e.cue === 'retry')).toHaveLength(0);
});

test('authored graph finishes by comparing the built bars and retains graph-check feedback', async () => {
  const { default: DataPlotBuilder } = await import('./DataPlotBuilder');
  const user = userEvent.setup(); const onEvent = vi.fn();
  render(<DataPlotBuilder config={{ kind: 'bar', prompt: 'Build the pet graph.', categories: ['dog', 'cat'], target: { dog: 2, cat: 1 }, sourceData: { dog: 2, cat: 1 }, displayChoices: ['bar', 'dot'] }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Bar graph' })); expect(screen.queryByRole('button', { name: 'Confirm display' })).not.toBeInTheDocument();
  await user.type(screen.getByRole('textbox', { name: 'Graph title' }), 'Pets'); await user.click(screen.getByRole('button', { name: 'Confirm title' }));
  await user.click(screen.getByRole('button', { name: 'Confirm category labels' })); await user.click(screen.getByRole('button', { name: 'Scale 1' })); expect(screen.queryByRole('button', { name: 'Confirm scale' })).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Increase dog' })); await user.click(screen.getByRole('button', { name: 'Increase dog' })); await user.click(screen.getByRole('button', { name: 'Increase cat' }));
  await user.click(screen.getByRole('button', { name: 'Check my graph' }));
  expect(onEvent.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(0);
  await user.type(screen.getByRole('spinbutton', { name: 'How many more?' }), '1'); await user.click(screen.getByRole('button', { name: 'Check my comparison' }));
  expect(screen.getByLabelText('Graph check feedback')).toHaveTextContent('matches');
  expect(screen.getByLabelText('Graph comparison feedback')).toHaveTextContent('Correct');
  expect(onEvent.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(1);
  await user.clear(screen.getByRole('spinbutton', { name: 'How many more?' }));
  expect(screen.getByTestId('widget-data-plot-builder')).toHaveAttribute('data-complete', 'no');
  expect(screen.getByLabelText('Graph comparison feedback')).not.toHaveTextContent('Correct');
});

test('number-line reset clears visible completion while keeping the event one-shot', async () => {
  const { default: NumberLineCompare } = await import('./NumberLineCompare'); const user = userEvent.setup(); const onEvent = vi.fn();
  render(<NumberLineCompare config={{ min: 0, max: 10, a: 2, b: 5 }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'less than' })); await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByTestId('widget-number-line-compare')).toHaveAttribute('data-complete', 'no');
  await user.click(screen.getByRole('button', { name: 'less than' })); expect(onEvent.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(1);
});

test('place-value reset does not complete an untouched zero target', async () => {
  const { default: PlaceValueBuilder } = await import('./PlaceValueBuilder'); const user = userEvent.setup(); const onEvent = vi.fn();
  render(<PlaceValueBuilder config={{ target: 0 }} onEvent={onEvent} />);
  await user.click(screen.getByRole('button', { name: 'Add one to the ones place' })); await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByTestId('widget-place-value-builder')).toHaveAttribute('data-complete', 'no');
  expect(onEvent.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(0);
});

test('fraction Start over restores the authored starting model and clears phase feedback', async () => {
  const user = userEvent.setup();
  render(<FractionModels config={{ mode: 'bars', denominator: 8, numerator: 3, target: { numerator: 5, denominator: 8 }, task: 'change' }} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Add one part' })); await user.click(screen.getByRole('button', { name: 'Add one part' }));
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByTestId('fraction-total')).toHaveTextContent('3/8'); expect(screen.getByTestId('widget-fraction-models')).toHaveAttribute('data-complete', 'no');
});

test('money reset at a zero target clears visible completion', async () => {
  const { default: MoneyCounter } = await import('./MoneyCounter'); const user = userEvent.setup();
  render(<MoneyCounter config={{ targetCents: 0, denominations: [1] }} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Add a penny' })); await user.click(screen.getByRole('button', { name: 'Remove a penny' })); await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByTestId('widget-money-counter')).toHaveAttribute('data-complete', 'no');
});

test('ruler reset at an initially matching target clears visible completion', async () => {
  const { default: QuarterInchRuler } = await import('./QuarterInchRuler'); const user = userEvent.setup();
  render(<QuarterInchRuler config={{ lengthInches: 5, startInches: 1, targetInches: 1 }} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Move marker right one quarter inch' })); await user.click(screen.getByRole('button', { name: 'Move marker left one quarter inch' })); await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByTestId('widget-quarter-inch-ruler')).toHaveAttribute('data-complete', 'no');
});

test('zero-minute interval reset clears completion until the next explicit action', async () => {
  const { default: ClockElapsedTime } = await import('./ClockElapsedTime'); const user = userEvent.setup(); const onEvent = vi.fn();
  render(<ClockElapsedTime config={{ mode: 'elapsed', startTime: '09:00', elapsedMinutes: 0, jumpMinutes: [5] }} onEvent={onEvent} />);
  await user.type(screen.getByRole('textbox', { name: 'My predicted ending time' }), '9:00 AM'); await user.click(screen.getByRole('button', { name: 'Save prediction' }));
  await user.click(screen.getByRole('button', { name: 'Complete 0-minute interval' })); await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByTestId('widget-clock-elapsed-time')).toHaveAttribute('data-complete', 'no');
});

test('editing a checked area total makes the current entry neutral without deleting the first guess', async () => {
  const user = userEvent.setup();
  render(<AreaModelMultiplier config={{ a: 2, b: 3, targetProduct: 6 }} onEvent={vi.fn()} />);
  await user.type(screen.getByRole('spinbutton', { name: 'My total area' }), '6'); await user.click(screen.getByRole('button', { name: 'Check my total' })); await user.click(screen.getByRole('button', { name: 'Select 2 by 3 cell' }));
  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-complete', 'yes');
  await user.clear(screen.getByRole('spinbutton', { name: 'My total area' }));
  expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-complete', 'no');
  expect(screen.getByLabelText('Area answer feedback')).toHaveTextContent('not checked');
  expect(screen.getByLabelText('Area prediction record')).toHaveTextContent('6');
});

test('editing an explained length conversion clears correctness without changing the prediction record', async () => {
  const { default: BalanceScale } = await import('./BalanceScale'); const user = userEvent.setup();
  render(<BalanceScale config={{ left: [{ id: 'feet', label: '1 foot', value: 12 }], right: [{ id: 'inches', label: '12 inches', value: 12 }], task: 'compare', lengthModel: { feet: 1, inches: 12 } }} onEvent={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'The lengths are equal' })); await user.click(screen.getByRole('button', { name: 'Add one foot strip' }));
  await user.type(screen.getByRole('spinbutton', { name: 'Inches in one foot' }), '12'); await user.click(screen.getByRole('button', { name: 'Explain the comparison' }));
  expect(screen.getByTestId('widget-balance-scale')).toHaveAttribute('data-complete', 'yes');
  await user.clear(screen.getByRole('spinbutton', { name: 'Inches in one foot' }));
  expect(screen.getByTestId('widget-balance-scale')).toHaveAttribute('data-complete', 'no');
  expect(screen.getByLabelText('Length explanation feedback')).not.toHaveTextContent('Correct');
  expect(screen.getByLabelText('Length prediction feedback')).toHaveTextContent('matched');
});

test('long number-line labels use a small set of readable, evenly spaced landmarks', async () => {
  const { default: NumberLineCompare } = await import('./NumberLineCompare');
  render(<NumberLineCompare config={{ min: 0, max: 1, a: .1, b: .35, step: .01, display: 'fraction', denominator: 100 }} onEvent={vi.fn()} />);
  const labels = screen.getByRole('img').querySelectorAll('.nl-tick-label');
  expect(Array.from(labels, label => label.textContent)).toEqual(['0', '20/100', '40/100', '60/100', '80/100', '1']);
});

test('hundredths landmarks stop at an off-step endpoint and stay in ascending order', async () => {
  const { default: NumberLineCompare } = await import('./NumberLineCompare');
  render(<NumberLineCompare config={{ min: 0, max: .36, a: .1, b: .35, step: .01, display: 'fraction', denominator: 100 }} onEvent={vi.fn()} />);
  const labels = screen.getByRole('img').querySelectorAll('.nl-tick-label');
  expect(Array.from(labels, label => label.textContent)).toEqual(['0', '10/100', '20/100', '30/100', '36/100']);
});
