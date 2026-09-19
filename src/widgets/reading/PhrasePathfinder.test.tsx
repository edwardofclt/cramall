import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { phrasePathfinderConfig } from '../../content/reading/activityPrototypes';
import PhrasePathfinder from './PhrasePathfinder';

const completeRepair = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: /select practice word windy/i }));
  await user.type(screen.getByRole('textbox', { name: /word from the original/i }), 'winding');
  await user.click(screen.getByRole('button', { name: 'Check repair' }));
};

const completePlanAndMeaning = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: /add phrase boundary after “began,”/i }));
  await user.click(screen.getByRole('button', { name: 'Preview my phrase groups' }));
  await user.click(screen.getByRole('button', { name: /choose meaning: to put each tray/i }));
  await user.click(screen.getByRole('button', { name: /choose evidence: the tray marked “shade”/i }));
  await user.click(screen.getByRole('button', { name: 'Check meaning' }));
};

const finishReflections = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('radio', { name: 'I matched the words in the original.' }));
  await user.click(screen.getByRole('radio', { name: 'My pace felt steady enough to follow the ideas.' }));
  await user.click(screen.getByRole('radio', { name: 'I can explain why Isla checked the labels.' }));
  await user.click(screen.getByRole('checkbox', { name: /i reread the passage on my own/i }));
  await user.click(screen.getByRole('button', { name: 'Finish reflection' }));
};

test('keeps the complete original visible before and after repairing the labeled changed copy', async () => {
  // Mutating or hiding the source when the repair is made must fail this test.
  const user = userEvent.setup();
  render(<PhrasePathfinder config={phrasePathfinderConfig} onEvent={vi.fn()} />);

  const original = screen.getByRole('region', { name: 'Original passage' });
  expect(original).toHaveTextContent('winding path');
  expect(original).toHaveTextContent('Isla reread both labels before putting the trays down.');
  const practice = screen.getByRole('region', { name: 'Practice copy with a changed word' });
  expect(practice).toHaveTextContent('windy path');

  await completeRepair(user);
  expect(original).toHaveTextContent('winding path');
  expect(original).not.toHaveTextContent('windy path');
  expect(screen.getByRole('region', { name: 'Corrected practice copy' })).toHaveTextContent('winding path');
});

test('checks a selected written-word repair and preserves retry feedback through recovery', async () => {
  // Accepting a near-match or erasing the earlier retry record after correction must fail this test.
  const user = userEvent.setup();
  const onEvent = vi.fn();
  render(<PhrasePathfinder config={phrasePathfinderConfig} onEvent={onEvent} />);

  await user.click(screen.getByRole('button', { name: /select practice word windy/i }));
  await user.type(screen.getByRole('textbox', { name: /word from the original/i }), 'wind');
  await user.click(screen.getByRole('button', { name: 'Check repair' }));
  expect(screen.getByLabelText('Repair feedback history')).toHaveTextContent('Compare every letter with the original sentence.');
  expect(onEvent.mock.calls.map(([event]) => event)).toContainEqual({ type: 'coach', cue: 'retry' });

  await user.clear(screen.getByRole('textbox', { name: /word from the original/i }));
  await user.type(screen.getByRole('textbox', { name: /word from the original/i }), 'winding');
  await user.click(screen.getByRole('button', { name: 'Check repair' }));
  expect(screen.getByLabelText('Repair feedback history')).toHaveTextContent('You restored “winding” from the original.');
  expect(screen.getByLabelText('Repair feedback history')).toHaveTextContent('Compare every letter');
});

test('lets the learner place arbitrary phrase boundaries and step the preview manually', async () => {
  // Grading one pause plan or auto-advancing the preview must fail this test.
  const user = userEvent.setup();
  const onEvent = vi.fn();
  render(<PhrasePathfinder config={phrasePathfinderConfig} onEvent={onEvent} />);
  await completeRepair(user);

  const rainBoundary = screen.getByRole('button', { name: /add phrase boundary after “began,”/i });
  const pathBoundary = screen.getByRole('button', { name: /add phrase boundary after “path\.”/i });
  await user.click(rainBoundary);
  await user.click(pathBoundary);
  expect(rainBoundary).toHaveAttribute('aria-pressed', 'true');
  expect(pathBoundary).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByLabelText('Phrase plan')).toHaveTextContent('2 learner-chosen pauses');
  expect(onEvent.mock.calls.map(([event]) => event)).toContainEqual({ type: 'change', value: { pauseAfter: [3, 11] } });

  await user.click(screen.getByRole('button', { name: 'Preview my phrase groups' }));
  const preview = screen.getByRole('region', { name: 'Phrase preview' });
  expect(preview).toHaveTextContent('Group 1 of 3');
  expect(within(preview).getByTestId('active-phrase')).toHaveTextContent('Before the rain began,');
  await user.click(screen.getByRole('button', { name: 'Next phrase' }));
  expect(preview).toHaveTextContent('Group 2 of 3');
  expect(within(preview).getByTestId('active-phrase')).toHaveTextContent('Isla carried the seedlings along the winding path.');
  expect(screen.getByLabelText('Phrase-plan feedback')).toHaveTextContent(/move a pause if it interrupts the meaning/i);
  expect(screen.queryByText(/wrong phrase|incorrect pause|correct pause/i)).not.toBeInTheDocument();
});

test('requires the supported meaning and the matching selected source evidence', async () => {
  // Completing from the answer key alone, without evidence selection, must fail this test.
  const user = userEvent.setup();
  const onEvent = vi.fn();
  render(<PhrasePathfinder config={phrasePathfinderConfig} onEvent={onEvent} />);
  await completeRepair(user);
  await user.click(screen.getByRole('button', { name: /add phrase boundary after “began,”/i }));
  await user.click(screen.getByRole('button', { name: 'Preview my phrase groups' }));

  await user.click(screen.getByRole('button', { name: /choose meaning: to put each tray/i }));
  await user.click(screen.getByRole('button', { name: 'Check meaning' }));
  expect(screen.getByLabelText('Meaning feedback history')).toHaveTextContent(/choose a sentence from the passage/i);

  await user.click(screen.getByRole('button', { name: /choose evidence: before the rain began/i }));
  await user.click(screen.getByRole('button', { name: 'Check meaning' }));
  expect(screen.getByLabelText('Meaning feedback history')).toHaveTextContent(/look for the two labels and where each tray belongs/i);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(0);

  await user.click(screen.getByRole('button', { name: /choose evidence: the tray marked “shade”/i }));
  expect(screen.getByLabelText('Selected evidence')).toHaveTextContent('under the oak');
  await user.click(screen.getByRole('button', { name: 'Check meaning' }));
  expect(screen.getByLabelText('Meaning feedback history')).toHaveTextContent(/answer and evidence work together/i);
  expect(screen.getByRole('region', { name: 'Original passage' })).toBeVisible();
});

test('removes stale success feedback when a checked meaning answer changes', async () => {
  // Keeping the earlier green success current after the learner chooses an unsupported answer must fail this test.
  const user = userEvent.setup();
  render(<PhrasePathfinder config={phrasePathfinderConfig} onEvent={vi.fn()} />);
  await completeRepair(user);
  await completePlanAndMeaning(user);
  const history = screen.getByLabelText('Meaning feedback history');
  expect(history).toHaveTextContent(/answer and evidence work together/i);

  await user.click(screen.getByRole('button', { name: /choose meaning: to find out when the rain/i }));

  expect(history).not.toHaveTextContent(/answer and evidence work together/i);
  expect(screen.queryByRole('group', { name: 'Accuracy reflection' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Check meaning' })).toBeEnabled();
});

test('does not restore stale meaning success after a phrase-plan revision', async () => {
  // Reopening meaning after a changed pause must not show success for the cleared answer and evidence.
  const user = userEvent.setup();
  render(<PhrasePathfinder config={phrasePathfinderConfig} onEvent={vi.fn()} />);
  await completeRepair(user);
  await completePlanAndMeaning(user);
  expect(screen.getByLabelText('Meaning feedback history')).toHaveTextContent(/answer and evidence work together/i);

  await user.click(screen.getByRole('button', { name: /add phrase boundary after “the” \(word 2\)/i }));
  await user.click(screen.getByRole('button', { name: 'Preview my phrase groups' }));

  const history = screen.getByLabelText('Meaning feedback history');
  expect(history).not.toHaveTextContent(/answer and evidence work together/i);
  expect(screen.getByLabelText('Selected evidence')).toHaveTextContent('none yet');
  expect(screen.getByRole('button', { name: /choose meaning: to put each tray/i })).toHaveAttribute('aria-pressed', 'false');
});

test('requires Accuracy, Pace, Meaning, and an independent reread for honest once-per-attempt completion', async () => {
  // Omitting a reflection, claiming measured fluency, or duplicating completion within an attempt must fail this test.
  const user = userEvent.setup();
  const onEvent = vi.fn();
  render(<PhrasePathfinder config={phrasePathfinderConfig} onEvent={onEvent} />);
  await completeRepair(user);
  await completePlanAndMeaning(user);

  await user.click(screen.getByRole('radio', { name: 'I matched the words in the original.' }));
  await user.click(screen.getByRole('radio', { name: 'My pace felt steady enough to follow the ideas.' }));
  await user.click(screen.getByRole('checkbox', { name: /i reread the passage on my own/i }));
  expect(screen.getByRole('button', { name: 'Finish reflection' })).toBeDisabled();
  await user.click(screen.getByRole('radio', { name: 'I can explain why Isla checked the labels.' }));
  await user.click(screen.getByRole('button', { name: 'Finish reflection' }));

  expect(screen.getByText('Practice and reflection complete.')).toBeVisible();
  expect(screen.queryByText(/fluency.*passed|pace.*passed|voice.*scored/i)).not.toBeInTheDocument();
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toEqual([
    [{ type: 'complete', value: { reflectionComplete: true } }],
  ]);
  expect(screen.getByRole('button', { name: 'Finish reflection' })).toBeDisabled();
});

test('invalidates downstream conclusions and allows one completion after a full reset', async () => {
  // Leaving completion latched after editing a pause, or refusing a fresh reset attempt, must fail this test.
  const user = userEvent.setup();
  const onEvent = vi.fn();
  render(<PhrasePathfinder config={phrasePathfinderConfig} onEvent={onEvent} />);
  await completeRepair(user);
  await completePlanAndMeaning(user);
  await finishReflections(user);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(1);

  await user.click(screen.getByRole('button', { name: /add phrase boundary after “the” \(word 2\)/i }));
  expect(screen.queryByText('Practice and reflection complete.')).not.toBeInTheDocument();
  expect(screen.queryByRole('group', { name: 'Accuracy reflection' })).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Start over' }));
  expect(screen.getByRole('region', { name: 'Practice copy with a changed word' })).toHaveTextContent('windy path');
  expect(screen.queryByRole('region', { name: 'Phrase preview' })).not.toBeInTheDocument();
  await completeRepair(user);
  await completePlanAndMeaning(user);
  await finishReflections(user);
  expect(onEvent.mock.calls.filter(([event]) => event.type === 'complete')).toHaveLength(2);
});

test('remounts safely when the authored configuration changes', async () => {
  // Carrying selected words or repair state into a different passage must fail this test.
  const user = userEvent.setup();
  const onEvent = vi.fn();
  const view = render(<PhrasePathfinder config={phrasePathfinderConfig} onEvent={onEvent} />);
  await completeRepair(user);

  view.rerender(<PhrasePathfinder config={{
    ...phrasePathfinderConfig,
    title: 'The Garden Path',
    source: 'Mina followed the narrow path. She read the blue sign before choosing the garden gate.',
    originalWord: 'narrow',
    changedWord: 'near',
    meaningPrompt: 'Why did Mina read the sign?',
    meaningChoices: [
      { id: 'gate', text: 'To choose the garden gate.' },
      { id: 'path', text: 'To make the path wider.' },
    ],
    correctMeaningId: 'gate',
    meaningEvidence: 'She read the blue sign before choosing the garden gate.',
  }} onEvent={onEvent} />);

  expect(screen.getByRole('region', { name: 'Original passage' })).toHaveTextContent('narrow path');
  expect(screen.getByRole('region', { name: 'Practice copy with a changed word' })).toHaveTextContent('near path');
  expect(screen.queryByRole('region', { name: 'Corrected practice copy' })).not.toBeInTheDocument();
});
