import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { unit02Lessons } from '../content/science/u02';
import { WidgetCoachFrame } from './WidgetCoachFrame';

function setup() {
  const card = unit02Lessons[1]!.learnCards[0]!;
  const onEvent = vi.fn();
  render(<WidgetCoachFrame {...card.widget!} coach={card.widgetCoach!} guide="sandy" visitKey="fork" onEvent={onEvent} onIntroActiveChange={() => {}} />);
  return { user: userEvent.setup(), onEvent };
}

test('real tuning fork conversation replaces the activity and focuses prediction', async () => {
  const { user, onEvent } = setup();
  expect(screen.queryByTestId('widget-energy-transfer-builder')).not.toBeInTheDocument();
  expect(screen.getByTestId('character-sandy')).toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Next' }));
  await user.click(screen.getByRole('button', { name: 'Start the model' }));
  const prediction = await screen.findByRole('button', { name: 'They will stay still' });
  expect(prediction).toHaveFocus();
  expect(screen.queryByTestId('widget-coach-intro')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Strike the fork' })).toBeDisabled();
  expect(onEvent).not.toHaveBeenCalled();
});

test('wrong prediction, observation, explanation retry, replay and reset retain their own feedback without writing storage', async () => {
  const write = vi.spyOn(Storage.prototype, 'setItem');
  const { user, onEvent } = setup();
  await user.click(screen.getByRole('button', { name: 'Next' }));
  await user.click(screen.getByRole('button', { name: 'Start the model' }));
  await user.click(await screen.findByRole('button', { name: 'They will stay still' }));
  expect(screen.queryByText(/Your prediction differed/)).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Strike the fork' }));
  const observation = await screen.findByText(/The model showed the paper bits trembling/);
  expect(observation).toBeVisible();
  const prediction = screen.getByLabelText('Prediction feedback');
  expect(prediction).toHaveTextContent('Your prediction differed');
  await user.click(screen.getByRole('button', { name: 'We saw energy itself' }));
  expect(screen.getByLabelText('Explanation feedback')).toHaveTextContent(/change in the objects/);
  expect(screen.getByRole('button', { name: /We saw energy itself.*Try again/ })).toHaveAttribute('data-outcome', 'retry');
  expect(onEvent.mock.calls.some(([e]) => e.type === 'complete')).toBe(false);
  await user.click(screen.getByRole('button', { name: 'The paper moved without the fork touching it' }));
  expect(screen.getByLabelText('Explanation feedback')).toHaveTextContent(/could support/);
  expect(screen.getByRole('button', { name: /The paper moved.*Correct/ })).toHaveAttribute('data-outcome', 'correct');
  expect(prediction).toHaveTextContent('Your prediction differed');
  expect(observation).toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Replay the strike' }));
  expect(within(screen.getByLabelText('Prediction feedback')).getByText(/Your prediction differed/)).toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByRole('button', { name: 'Strike the fork' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'They will stay still' })).toHaveFocus();
  expect(screen.queryByLabelText('Explanation feedback')).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'They will tremble' }));
  await user.click(screen.getByRole('button', { name: 'Strike the fork' }));
  await user.click(await screen.findByRole('button', { name: 'The paper moved without the fork touching it' }));
  expect(onEvent.mock.calls.filter(([e]) => e.type === 'complete')).toHaveLength(1);
  expect(write).not.toHaveBeenCalled();
  write.mockRestore();
});

 test('unchanged prediction and explanation taps do not repeat coaching', async () => {
  const { user, onEvent } = setup();
  await user.click(screen.getByRole('button', { name: 'Next' }));
  await user.click(screen.getByRole('button', { name: 'Start the model' }));
  const prediction = await screen.findByRole('button', { name: 'They will tremble' });
  await user.click(prediction);
  await user.click(prediction);
  expect(onEvent.mock.calls.filter(([e]) => e.type === 'coach' && e.cue === 'strategy')).toHaveLength(1);
  await user.click(screen.getByRole('button', { name: 'Strike the fork' }));
  const explanation = screen.getByRole('button', { name: 'We saw energy itself' });
  await user.click(explanation);
  await user.click(explanation);
  expect(onEvent.mock.calls.filter(([e]) => e.type === 'coach' && e.cue === 'retry')).toHaveLength(1);
});
