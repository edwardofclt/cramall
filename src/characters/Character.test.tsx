import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import type { DialogueLine, GuideId, Pose } from '../content/schema';
import { Character } from './Character';
import { SpeechBubble } from './SpeechBubble';
import { DialoguePlayer } from './DialoguePlayer';

const GUIDES: GuideId[] = ['nutty', 'winnie', 'sandy'];
const POSES: Pose[] = ['idle', 'talk', 'think', 'cheer', 'oops'];

describe('Character', () => {
  test.each(GUIDES)('renders %s with its test id, pose attribute and size', (guide) => {
    render(<Character guide={guide} pose="idle" size={120} />);
    const el = screen.getByTestId(`character-${guide}`);
    expect(el).toHaveAttribute('data-pose', 'idle');
    expect(el).toHaveAttribute('width', '120');
    expect(el).toHaveAttribute('height', '120');
  });

  test.each(GUIDES)('%s is an accessible image with a name', (guide) => {
    render(<Character guide={guide} pose="idle" size={96} />);
    expect(screen.getByRole('img')).toHaveAccessibleName(new RegExp(guide, 'i'));
  });

  test.each(POSES)('every guide renders the %s pose', (pose) => {
    render(
      <>
        {GUIDES.map((guide) => (
          <Character key={guide} guide={guide} pose={pose} size={80} />
        ))}
      </>,
    );
    for (const guide of GUIDES) {
      expect(screen.getByTestId(`character-${guide}`)).toHaveAttribute('data-pose', pose);
    }
  });

  test('defaults to the idle pose', () => {
    render(<Character guide="nutty" />);
    expect(screen.getByTestId('character-nutty')).toHaveAttribute('data-pose', 'idle');
  });
});

describe('SpeechBubble', () => {
  test('renders children inside the themed bubble', () => {
    render(<SpeechBubble>Hello there</SpeechBubble>);
    expect(screen.getByText('Hello there').closest('.speech-bubble')).not.toBeNull();
  });
});

const LINES: DialogueLine[] = [
  { speaker: 'nutty', text: 'First line', pose: 'talk' },
  { speaker: 'kid', text: 'Second line' },
];

function nextButton() {
  return screen.getByRole('button', { name: 'Next' });
}

describe('DialoguePlayer', () => {
  test('shows one line at a time and advances with Next', async () => {
    const user = userEvent.setup();
    const onDone = vi.fn();
    render(<DialoguePlayer lines={LINES} onDone={onDone} />);

    expect(screen.getByText('First line')).toBeInTheDocument();
    expect(screen.queryByText('Second line')).toBeNull();

    await user.click(nextButton());

    expect(await screen.findByText('Second line')).toBeInTheDocument();
    expect(screen.queryByText('First line')).toBeNull();
    expect(onDone).not.toHaveBeenCalled();
  });

  test('calls onDone exactly once after the last line', async () => {
    const user = userEvent.setup();
    const onDone = vi.fn();
    render(<DialoguePlayer lines={LINES} onDone={onDone} />);

    await user.click(nextButton());
    await screen.findByText('Second line');
    await user.click(nextButton());
    expect(onDone).toHaveBeenCalledTimes(1);

    await user.click(nextButton());
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('shows the speaking guide, and no character for the kid', async () => {
    const user = userEvent.setup();
    render(<DialoguePlayer lines={LINES} onDone={vi.fn()} />);

    expect(screen.getByTestId('character-nutty')).toHaveAttribute('data-pose', 'talk');

    await user.click(nextButton());

    expect(await screen.findByText('Second line')).toHaveClass('speech-bubble-right');
    expect(screen.queryByTestId('character-nutty')).toBeNull();
  });

  test('starts over when a different dialogue is swapped in', async () => {
    const user = userEvent.setup();
    const onDone = vi.fn();
    const { rerender } = render(<DialoguePlayer lines={LINES} onDone={onDone} />);

    await user.click(nextButton());
    await screen.findByText('Second line');
    await user.click(nextButton());
    expect(onDone).toHaveBeenCalledTimes(1);

    const nextLines: DialogueLine[] = [
      { speaker: 'winnie', text: 'New one', pose: 'talk' },
      { speaker: 'kid', text: 'New two' },
      { speaker: 'winnie', text: 'New three', pose: 'cheer' },
    ];
    rerender(<DialoguePlayer lines={nextLines} onDone={onDone} />);

    expect(await screen.findByText('New one')).toBeInTheDocument();
    expect(screen.queryByText('Second line')).toBeNull();

    await user.click(nextButton());
    await screen.findByText('New two');
    await user.click(nextButton());
    await screen.findByText('New three');
    await user.click(nextButton());
    expect(onDone).toHaveBeenCalledTimes(2);
  });
});
