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

  test.each(GUIDES)('%s renders its approved illustrated asset', (guide) => {
    const { container } = render(<Character guide={guide} pose="idle" size={96} />);
    const art = container.querySelector('image');
    expect(art).not.toBeNull();
    expect(art).toHaveAttribute('data-character-asset', guide);
    expect(art?.getAttribute('href')).toMatch(new RegExp(`/${guide}\\.png$`));
  });

  test('the reading guide is identified as a river otter', () => {
    render(<Character guide="winnie" pose="idle" size={96} />);
    expect(screen.getByRole('img')).toHaveAccessibleName(/winnie the river otter/i);
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

const GUIDE_KID_GUIDE_LINES: DialogueLine[] = [
  { speaker: 'nutty', text: 'Guide one', pose: 'talk' },
  { speaker: 'kid', text: 'Kid response' },
  { speaker: 'nutty', text: 'Guide two', pose: 'cheer' },
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

  test('keeps the current guide visible in a listening pose while the kid speaks', async () => {
    const user = userEvent.setup();
    render(<DialoguePlayer lines={LINES} onDone={vi.fn()} />);

    expect(screen.getByTestId('character-nutty')).toHaveAttribute('data-pose', 'talk');

    await user.click(nextButton());

    expect(await screen.findByText('Second line')).toHaveClass('speech-bubble-right');
    expect(screen.getByTestId('character-nutty')).toHaveAttribute('data-pose', 'idle');
  });

  test('keeps a bounded character slot while dialogue lines change', async () => {
    const user = userEvent.setup();
    render(<DialoguePlayer lines={LINES} onDone={vi.fn()} />);

    const slot = screen.getByTestId('dialogue-character-slot');
    expect(slot).toHaveClass('dialogue-character-slot');
    expect(slot).toContainElement(screen.getByTestId('character-nutty'));
    expect(screen.getByTestId('character-nutty')).toHaveStyle({ overflow: 'visible' });

    await user.click(nextButton());

    expect(screen.getByTestId('dialogue-character-slot')).toBe(slot);
    expect(screen.getByTestId('dialogue-character-slot')).toContainElement(
      screen.getByTestId('character-nutty'),
    );
  });

  test('keeps the two-row scene footprint through guide, kid, and guide lines', async () => {
    const user = userEvent.setup();
    render(<DialoguePlayer lines={GUIDE_KID_GUIDE_LINES} onDone={vi.fn()} />);

    const scene = screen.getByTestId('dialogue-scene');
    const slot = screen.getByTestId('dialogue-character-slot');
    const rows = scene.style.gridTemplateRows;
    expect(rows).toContain('12rem');

    await user.click(nextButton());
    expect(await screen.findByText('Kid response')).toBeInTheDocument();
    expect(screen.getByTestId('dialogue-scene')).toBe(scene);
    expect(screen.getByTestId('dialogue-character-slot')).toBe(slot);
    expect(scene.style.gridTemplateRows).toBe(rows);
    expect(slot).toContainElement(screen.getByTestId('character-nutty'));
    expect(screen.getByTestId('character-nutty')).toHaveAttribute('data-pose', 'idle');

    await user.click(nextButton());
    expect(await screen.findByText('Guide two')).toBeInTheDocument();
    expect(screen.getByTestId('dialogue-scene')).toBe(scene);
    expect(scene.style.gridTemplateRows).toBe(rows);
    expect(slot).toContainElement(screen.getByTestId('character-nutty'));
  });

  test('places a guide bubble above the stable guide slot', () => {
    render(<DialoguePlayer lines={LINES} onDone={vi.fn()} />);

    const bubble = screen.getByText('First line').closest('.speech-bubble');
    const slot = screen.getByTestId('dialogue-character-slot');
    expect(bubble).not.toBeNull();
    if (!bubble) throw new Error('Expected a dialogue bubble');
    expect(bubble).toHaveClass('speech-bubble-center');
    expect(bubble.compareDocumentPosition(slot) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
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
