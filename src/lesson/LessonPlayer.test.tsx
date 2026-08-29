import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, test, vi } from 'vitest';
import type { Lesson, Subject, Unit } from '../content/schema';
import { LessonPlayer } from './LessonPlayer';

const { FIXTURE } = vi.hoisted(() => {
  const lesson: Lesson = {
    id: 'math-u01-l1',
    unitId: 'math-u01',
    title: 'Reading Big Numbers',
    indicatorCodes: ['4.NSBT.1'],
    intro: [
      { speaker: 'nutty', text: 'Big numbers are just acorn piles!' },
      { speaker: 'kid', text: 'Show me how!' },
    ],
    learnCards: [
      {
        id: 'card-places',
        title: 'Every digit has a place',
        dialogue: [{ speaker: 'nutty', text: 'Watch the places line up.' }],
        blocks: [
          {
            kind: 'text',
            text: 'The **hundreds** place is third from the right.\nCount from the ones.',
          },
          { kind: 'example', text: '482 is 4 hundreds, 8 tens, 2 ones' },
          { kind: 'tip', text: 'Say the number out loud.' },
        ],
        widget: { type: 'place-value-builder', config: { start: 482 } },
      },
      {
        id: 'card-compare',
        title: 'Compare from the left',
        blocks: [{ kind: 'text', text: 'Start at the biggest place.' }],
      },
    ],
    workedExample: {
      title: 'Try one together',
      steps: ['Line up the places.', 'Compare the digits.'],
    },
    quiz: { passThreshold: 8, pool: [] },
  };

  const unit: Unit = {
    id: 'math-u01',
    subjectId: 'math',
    number: 1,
    title: 'Place Value Party',
    indicatorCodes: ['4.NSBT.1'],
    prerequisiteUnitIds: [],
    lessons: [lesson],
  };

  const subject: Subject = {
    id: 'math',
    title: 'Math',
    guide: 'nutty',
    color: '#f59e0b',
    units: [unit],
  };

  return { FIXTURE: { subject, unit, lesson } };
});

vi.mock('../content/subjects', () => ({
  findLesson: (id: string) => (id === FIXTURE.lesson.id ? FIXTURE : null),
}));

const LESSON_ID = 'math-u01-l1';

function renderPlayer(entry = `/lesson/${LESSON_ID}`) {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route path="/" element={<h1>Home screen</h1>} />
        <Route path="/lesson/:lessonId" element={<LessonPlayer />} />
        <Route path="/lesson/:lessonId/quiz" element={<h1>Quick Check screen</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

/** The stage Next/Back live in their own landmark so the dialogue's Next stays separate. */
function nav() {
  return within(screen.getByRole('navigation', { name: /lesson steps/i }));
}

async function clickNext(user: ReturnType<typeof userEvent.setup>) {
  await user.click(nav().getByRole('button', { name: /next step/i }));
}

/** Card one holds the lazy widget; settle it so nothing resolves after the test ends. */
async function settleWidget() {
  await screen.findByTestId('widget-placeholder');
}

function stubSpeech() {
  const speak = vi.fn();
  const cancel = vi.fn();
  class FakeUtterance {
    rate = 1;
    constructor(public text: string) {}
  }
  Object.defineProperty(window, 'speechSynthesis', {
    configurable: true,
    writable: true,
    value: { speak, cancel },
  });
  Object.defineProperty(window, 'SpeechSynthesisUtterance', {
    configurable: true,
    writable: true,
    value: FakeUtterance,
  });
  return { speak, cancel };
}

afterEach(() => {
  Reflect.deleteProperty(window, 'speechSynthesis');
  Reflect.deleteProperty(window, 'SpeechSynthesisUtterance');
});

describe('LessonPlayer', () => {
  test('opens on the intro dialogue with the lesson title', () => {
    renderPlayer();

    expect(screen.getByRole('heading', { name: 'Reading Big Numbers' })).toBeInTheDocument();
    expect(screen.getByText('Big numbers are just acorn piles!')).toBeInTheDocument();
    expect(screen.getByTestId('character-nutty')).toBeInTheDocument();
    expect(screen.queryByText('Every digit has a place')).toBeNull();
    // Nowhere to go back to from the first stage.
    expect(nav().queryByRole('button', { name: /back/i })).toBeNull();
  });

  test('advancing past the intro shows the first learn card', async () => {
    const user = userEvent.setup();
    renderPlayer();

    await clickNext(user);

    expect(await screen.findByRole('heading', { name: 'Every digit has a place' })).toBeInTheDocument();
    await settleWidget();
    expect(screen.queryByText('Big numbers are just acorn piles!')).toBeNull();
    expect(nav().getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  test('finishing the intro dialogue advances on its own', async () => {
    const user = userEvent.setup();
    renderPlayer();

    // The dialogue's own Next walks its lines, then hands off to the next stage.
    const dialogueNext = screen.getByRole('button', { name: 'Next' });
    await user.click(dialogueNext);
    expect(await screen.findByText('Show me how!')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(await screen.findByRole('heading', { name: 'Every digit has a place' })).toBeInTheDocument();
    await settleWidget();
  });

  test("a card's dialogue hands off to the next stage when it runs out", async () => {
    const user = userEvent.setup();
    renderPlayer();
    await clickNext(user);
    await screen.findByRole('heading', { name: 'Every digit has a place' });
    await settleWidget();
    // The blocks are readable the whole time the dialogue plays — it never gates them.
    expect(screen.getByText(/Count from the ones/)).toBeInTheDocument();

    // The card dialogue is one line, so its own Next finishes it.
    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(await screen.findByRole('heading', { name: 'Compare from the left' })).toBeInTheDocument();
  });

  test('renders card blocks with bold, line breaks, example and tip callouts', async () => {
    const user = userEvent.setup();
    renderPlayer();
    await clickNext(user);
    await screen.findByRole('heading', { name: 'Every digit has a place' });
    await settleWidget();

    expect(screen.getByText('hundreds').tagName).toBe('STRONG');
    expect(screen.getByText(/Count from the ones/)).toBeInTheDocument();
    expect(screen.getByTestId('block-example')).toHaveTextContent('482 is 4 hundreds, 8 tens, 2 ones');
    const tip = screen.getByTestId('block-tip');
    expect(tip).toHaveTextContent('Say the number out loud.');
    expect(tip).toHaveTextContent('💡');
    // The card's own dialogue sits above the blocks, no gating.
    expect(screen.getByText('Watch the places line up.')).toBeInTheDocument();
  });

  test('a card widget renders inside the widget frame', async () => {
    const user = userEvent.setup();
    renderPlayer();
    await clickNext(user);

    expect(await screen.findByTestId('widget-placeholder')).toBeInTheDocument();
  });

  test('?card= deep-links straight to that learn card', async () => {
    renderPlayer(`/lesson/${LESSON_ID}?card=card-compare`);

    expect(await screen.findByRole('heading', { name: 'Compare from the left' })).toBeInTheDocument();
    expect(screen.queryByText('Big numbers are just acorn piles!')).toBeNull();
  });

  test('an unknown ?card= id falls back to the intro', () => {
    renderPlayer(`/lesson/${LESSON_ID}?card=nope`);

    expect(screen.getByText('Big numbers are just acorn piles!')).toBeInTheDocument();
  });

  test('walks intro → cards → worked example → outro and offers the quiz', async () => {
    const user = userEvent.setup();
    renderPlayer();

    await clickNext(user);
    await screen.findByRole('heading', { name: 'Every digit has a place' });
    await settleWidget();

    await clickNext(user);
    expect(await screen.findByRole('heading', { name: 'Compare from the left' })).toBeInTheDocument();

    await clickNext(user);
    expect(await screen.findByRole('heading', { name: 'Try one together' })).toBeInTheDocument();
    const steps = screen.getAllByTestId('worked-step');
    expect(steps).toHaveLength(2);
    expect(steps[0]).toHaveTextContent('Line up the places.');
    expect(steps[1]).toHaveTextContent('Compare the digits.');

    await clickNext(user);
    const quizLink = await screen.findByRole('link', { name: /start quick check/i });
    expect(quizLink).toHaveAttribute('href', `/lesson/${LESSON_ID}/quiz`);
    // Last stage: no Next left to press.
    expect(nav().queryByRole('button', { name: /next step/i })).toBeNull();
  });

  test('Back returns to the previous stage', async () => {
    const user = userEvent.setup();
    renderPlayer(`/lesson/${LESSON_ID}?card=card-compare`);
    await screen.findByRole('heading', { name: 'Compare from the left' });

    await user.click(nav().getByRole('button', { name: /back/i }));

    expect(await screen.findByRole('heading', { name: 'Every digit has a place' })).toBeInTheDocument();
    await settleWidget();
  });

  test('progress dots track the current stage', async () => {
    const user = userEvent.setup();
    renderPlayer();

    // intro + 2 cards + worked example + outro
    const dots = screen.getByRole('group', { name: /step 1 of 5/i });
    expect(within(dots).getAllByTestId('progress-dot')).toHaveLength(5);

    await clickNext(user);
    await screen.findByRole('heading', { name: 'Every digit has a place' });
    await settleWidget();
    expect(screen.getByRole('group', { name: /step 2 of 5/i })).toBeInTheDocument();
  });

  test('an unknown lesson id shows a friendly not-found card', () => {
    renderPlayer('/lesson/bogus');

    expect(screen.getByRole('heading', { name: /lesson not found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
  });

  test('?peek=1 shows a dismissible sneak-peek banner', async () => {
    const user = userEvent.setup();
    renderPlayer(`/lesson/${LESSON_ID}?peek=1`);

    const banner = screen.getByRole('status');
    expect(banner).toHaveTextContent(/not ready yet/i);
    expect(banner).toHaveTextContent(/sneak peek/i);

    await user.click(within(banner).getByRole('button', { name: /dismiss/i }));

    expect(screen.queryByRole('status')).toBeNull();
  });

  test('no peek banner on a normal visit', () => {
    renderPlayer();

    expect(screen.queryByRole('status')).toBeNull();
  });

  test('offers a way back to the subject map', () => {
    renderPlayer();

    expect(screen.getByRole('link', { name: /back to math/i })).toHaveAttribute(
      'href',
      '/subject/math',
    );
  });

  describe('read aloud', () => {
    test('renders nothing when the browser has no speech synthesis', async () => {
      const user = userEvent.setup();
      renderPlayer();
      await clickNext(user);
      await screen.findByRole('heading', { name: 'Every digit has a place' });
      await settleWidget();

      expect(screen.queryByRole('button', { name: /read aloud/i })).toBeNull();
    });

    test('cancels any current speech, then speaks the card text', async () => {
      const { speak, cancel } = stubSpeech();
      const user = userEvent.setup();
      renderPlayer();
      await clickNext(user);
      await screen.findByRole('heading', { name: 'Every digit has a place' });
      await settleWidget();

      await user.click(screen.getByRole('button', { name: /read aloud/i }));

      expect(cancel).toHaveBeenCalledTimes(1);
      expect(speak).toHaveBeenCalledTimes(1);
      expect(cancel.mock.invocationCallOrder[0]!).toBeLessThan(speak.mock.invocationCallOrder[0]!);

      const utterance = speak.mock.calls[0]![0] as { text: string; rate: number };
      expect(utterance.rate).toBe(0.95);
      expect(utterance.text).toContain('Every digit has a place');
      expect(utterance.text).toContain('Say the number out loud.');
      // Markup characters never reach the speaker.
      expect(utterance.text).not.toContain('**');
    });

    test('stops the reading when the card is left behind', async () => {
      const { speak, cancel } = stubSpeech();
      const user = userEvent.setup();
      renderPlayer();
      await clickNext(user);
      await screen.findByRole('heading', { name: 'Every digit has a place' });
      await settleWidget();

      await user.click(screen.getByRole('button', { name: /read aloud/i }));
      expect(speak).toHaveBeenCalledTimes(1);
      cancel.mockClear();

      await clickNext(user);
      await screen.findByRole('heading', { name: 'Compare from the left' });

      // Otherwise the old card keeps talking over the new one with no way to stop it.
      expect(cancel).toHaveBeenCalled();
    });

    test('a second tap stops the voice instead of starting it over', async () => {
      const { speak, cancel } = stubSpeech();
      const user = userEvent.setup();
      renderPlayer();
      await clickNext(user);
      await screen.findByRole('heading', { name: 'Every digit has a place' });
      await settleWidget();

      await user.click(screen.getByRole('button', { name: /read aloud/i }));
      expect(speak).toHaveBeenCalledTimes(1);

      await user.click(screen.getByRole('button', { name: /stop reading/i }));

      expect(cancel).toHaveBeenCalledTimes(2);
      expect(speak).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('button', { name: /read aloud/i })).toBeInTheDocument();
    });

    test('the button offers to read again once the voice finishes on its own', async () => {
      const { speak } = stubSpeech();
      const user = userEvent.setup();
      renderPlayer();
      await clickNext(user);
      await screen.findByRole('heading', { name: 'Every digit has a place' });
      await settleWidget();

      await user.click(screen.getByRole('button', { name: /read aloud/i }));
      const utterance = speak.mock.calls[0]![0] as { onend?: () => void };
      await act(async () => {
        utterance.onend?.();
      });

      expect(screen.getByRole('button', { name: /read aloud/i })).toBeInTheDocument();
    });

    test('reads the worked example too', async () => {
      const { speak } = stubSpeech();
      const user = userEvent.setup();
      renderPlayer(`/lesson/${LESSON_ID}?card=card-compare`);
      await screen.findByRole('heading', { name: 'Compare from the left' });

      await clickNext(user);
      await screen.findByRole('heading', { name: 'Try one together' });

      await user.click(screen.getByRole('button', { name: /read aloud/i }));

      const utterance = speak.mock.calls[0]![0] as { text: string };
      expect(utterance.text).toContain('Line up the places.');
    });
  });
});
