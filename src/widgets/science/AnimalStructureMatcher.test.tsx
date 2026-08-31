import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { AnimalStructureMatcherWidgetConfigSchema } from '../../content/schema';
import AnimalStructureMatcher from './AnimalStructureMatcher';

const config = {
  pairs: [
    { id: 'beak', animal: 'Bird', structure: 'beak', function: 'gathers food' },
    { id: 'fin', animal: 'Fish', structure: 'fin', function: 'swims' },
  ],
};

test('retains both matches and completes only after every correct pair', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<AnimalStructureMatcher config={config} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: 'Select Bird beak' }));
  await user.click(screen.getByRole('button', { name: 'Match gathers food' }));
  expect(screen.getByTestId('animal-match-beak')).toHaveTextContent(/gathers food/i);
  await user.click(screen.getByRole('button', { name: 'Select Fish fin' }));
  onEvent.mockClear();
  await user.click(screen.getByRole('button', { name: 'Match swims' }));

  expect(screen.getByTestId('animal-match-fin')).toHaveTextContent(/swims/i);
  expect(onEvent.mock.calls.map(([event]) => event)).toEqual([
    { type: 'interaction', action: 'match' },
    { type: 'change', value: { matches: { beak: 'gathers food', fin: 'swims' } } },
    { type: 'complete', value: { matches: { beak: 'gathers food', fin: 'swims' } } },
  ]);
});

test('rejects duplicate function choices and duplicate interactive labels', () => {
  expect(AnimalStructureMatcherWidgetConfigSchema.safeParse({
    pairs: [
      { id: 'a', animal: 'Bird', structure: 'wing', function: 'moves' },
      { id: 'b', animal: 'Fish', structure: 'fin', function: 'moves' },
    ],
  }).success).toBe(false);
  expect(AnimalStructureMatcherWidgetConfigSchema.safeParse({
    pairs: [
      { id: 'a', animal: 'Bird', structure: 'wing', function: 'flies' },
      { id: 'b', animal: ' Bird ', structure: ' wing ', function: 'balances' },
    ],
  }).success).toBe(false);
});

test('keeps a selected structure and existing visible match clear without color', async () => {
  const user = userEvent.setup();
  render(<AnimalStructureMatcher config={config} onEvent={vi.fn()} />);

  const beak = screen.getByRole('button', { name: 'Select Bird beak' });
  await user.click(beak);
  expect(beak).toHaveAttribute('aria-pressed', 'true');
  expect(document.querySelector('.animal-selection')).toHaveTextContent('Selected: Bird beak');
  await user.click(screen.getByRole('button', { name: 'Match gathers food' }));
  await user.click(screen.getByRole('button', { name: 'Select Fish fin' }));

  expect(screen.getByTestId('animal-match-beak')).toHaveTextContent(/Bird's beak.*gathers food/i);
  expect(screen.getByRole('button', { name: 'Select Fish fin' })).toHaveAttribute('aria-pressed', 'true');
});

test('clears selected and matched state immediately when a new config removes the selected id', async () => {
  const user = userEvent.setup();
  const view = render(<AnimalStructureMatcher config={config} onEvent={vi.fn()} />);

  await user.click(screen.getByRole('button', { name: 'Select Bird beak' }));
  await user.click(screen.getByRole('button', { name: 'Match gathers food' }));
  await user.click(screen.getByRole('button', { name: 'Select Fish fin' }));

  view.rerender(<AnimalStructureMatcher config={{
    pairs: [
      { id: 'shell', animal: 'Turtle', structure: 'shell', function: 'stays safe' },
      { id: 'tail', animal: 'Squirrel', structure: 'tail', function: 'balances' },
    ],
  }} onEvent={vi.fn()} />);

  expect(screen.getByText('Selected: none')).toBeInTheDocument();
  expect(screen.getByTestId('animal-match-shell')).toHaveTextContent('No function matched yet.');
  expect(screen.getByRole('button', { name: 'Match stays safe' })).toBeDisabled();
});

test('uses natural, specific feedback for each correct match and completion', async () => {
  const user = userEvent.setup();
  render(<AnimalStructureMatcher config={config} onEvent={vi.fn()} />);

  await user.click(screen.getByRole('button', { name: 'Select Bird beak' }));
  await user.click(screen.getByRole('button', { name: 'Match gathers food' }));
  expect(screen.getByRole('status')).toHaveTextContent("Correct: The function “gathers food” matches the Bird's beak. Select another structure.");

  await user.click(screen.getByRole('button', { name: 'Select Fish fin' }));
  await user.click(screen.getByRole('button', { name: 'Match swims' }));
  expect(screen.getByRole('status')).toHaveTextContent("Correct: The function “swims” matches the Fish's fin. All matches are complete.");
});

test('preserves authored verb and noun function labels in correct feedback', async () => {
  const user = userEvent.setup();
  render(<AnimalStructureMatcher config={{
    pairs: [
      { id: 'ears', animal: 'Bat', structure: 'ears', function: 'uses sound' },
      { id: 'shell', animal: 'Turtle', structure: 'shell', function: 'body protection' },
    ],
  }} onEvent={vi.fn()} />);

  await user.click(screen.getByRole('button', { name: 'Select Bat ears' }));
  await user.click(screen.getByRole('button', { name: 'Match uses sound' }));
  expect(screen.getByRole('status')).toHaveTextContent("Correct: The function “uses sound” matches the Bat's ears. Select another structure.");

  await user.click(screen.getByRole('button', { name: 'Select Turtle shell' }));
  await user.click(screen.getByRole('button', { name: 'Match body protection' }));
  expect(screen.getByRole('status')).toHaveTextContent("Correct: The function “body protection” matches the Turtle's shell. All matches are complete.");
});

test('allows a completed match to be corrected back to matching without another completion', async () => {
  const onEvent = vi.fn();
  const user = userEvent.setup();
  render(<AnimalStructureMatcher config={config} onEvent={onEvent} />);

  for (const [structure, fn] of [['Bird beak', 'gathers food'], ['Fish fin', 'swims']] as const) {
    await user.click(screen.getByRole('button', { name: `Select ${structure}` }));
    await user.click(screen.getByRole('button', { name: `Match ${fn}` }));
  }
  expect(screen.getByTestId('widget-animal-structure-matcher')).toHaveAttribute('data-state', 'complete');
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);

  await user.click(screen.getByRole('button', { name: 'Select Bird beak' }));
  await user.click(screen.getByRole('button', { name: 'Match swims' }));
  expect(screen.getByTestId('widget-animal-structure-matcher')).toHaveAttribute('data-state', 'matching');
  expect(screen.getByRole('status')).toHaveTextContent(/does not match/i);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);

  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByTestId('widget-animal-structure-matcher')).toHaveAttribute('data-state', 'matching');
});

test('trims terms and rejects blank or whitespace-equivalent animal choices', () => {
  const parsed = AnimalStructureMatcherWidgetConfigSchema.parse({
    pairs: [
      { id: 'beak', animal: ' Bird ', structure: ' beak ', function: ' gathers food ' },
      { id: 'fin', animal: 'Fish', structure: 'fin', function: 'swims' },
    ],
  });
  expect(parsed.pairs[0]).toEqual({ id: 'beak', animal: 'Bird', structure: 'beak', function: 'gathers food' });
  expect(AnimalStructureMatcherWidgetConfigSchema.safeParse({
    pairs: [
      { id: 'beak', animal: ' ', structure: 'beak', function: 'gathers food' },
      { id: 'fin', animal: 'Fish', structure: 'fin', function: 'swims' },
    ],
  }).success).toBe(false);
});
