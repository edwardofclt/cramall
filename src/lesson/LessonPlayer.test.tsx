import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { afterEach, describe, expect, test, vi } from 'vitest';
import type { Lesson, Subject, Unit } from '../content/schema';
import { LessonPlayer } from './LessonPlayer';

const { FIXTURE, READING_FIXTURE } = vi.hoisted(() => {
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
        widget: { type: 'place-value-builder', config: { target: 482 } },
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
    actionColor: '#92400e',
    units: [unit],
  };

  const readingLesson: Lesson = {
    ...lesson,
    id: 'reading-u01-l01',
    unitId: 'reading-u01',
    title: 'Read a garden passage',
    workedExample: {
      title: 'Practice reading the garden scene',
      passage: {
        title: 'Original passage',
        text: 'Maya checked the garden map before choosing a path.\n\nThen she reread the sign so the team could walk safely.',
      },
      steps: ['Read the map details steadily.', 'Use a careful voice for the safety sign.'],
    },
  };
  const readingUnit: Unit = {
    ...unit,
    id: 'reading-u01',
    subjectId: 'reading',
    lessons: [readingLesson],
  };
  const readingSubject: Subject = {
    ...subject,
    id: 'reading',
    title: 'Reading',
    guide: 'winnie',
    units: [readingUnit],
  };

  return {
    FIXTURE: { subject, unit, lesson },
    READING_FIXTURE: { subject: readingSubject, unit: readingUnit, lesson: readingLesson },
  };
});

vi.mock('../content/subjects', () => ({
  findLesson: (id: string) => {
    if (id === FIXTURE.lesson.id) return FIXTURE;
    if (id === READING_FIXTURE.lesson.id) return READING_FIXTURE;
    return null;
  },
}));

const LESSON_ID = 'math-u01-l1';
const READING_LESSON_ID = 'reading-u01-l01';

function renderPlayer(entry = `/lesson/${LESSON_ID}`) {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <RouterProbe />
      <RouterHistoryControls />
      <Routes>
        <Route path="/" element={<h1>Home screen</h1>} />
        <Route path="/lesson/:lessonId" element={<LessonPlayer />} />
        <Route path="/lesson/:lessonId/quiz" element={<h1>Quick Check screen</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

function RouterProbe() {
  const location = useLocation();
  return <output data-testid="router-location">{`${location.pathname}${location.search}`}</output>;
}

function RouterHistoryControls() {
  const navigate = useNavigate();
  return (
    <>
      <button type="button" onClick={() => navigate(-1)}>
        Browser back
      </button>
      <button type="button" onClick={() => navigate(1)}>
        Browser forward
      </button>
    </>
  );
}

function currentSearchParams() {
  return new URLSearchParams(screen.getByTestId('router-location').textContent?.split('?')[1]);
}

/** The stage Next/Back live in their own landmark once intro dialogue hands off. */
function nav() {
  return within(screen.getByRole('navigation', { name: /lesson steps/i }));
}

async function clickNext(user: ReturnType<typeof userEvent.setup>) {
  const stageNext = nav().queryByRole('button', { name: /next step/i });
  if (stageNext) {
    await user.click(stageNext);
    return;
  }

  // Intro dialogue hands off directly to its first card. A card dialogue hands off
  // to its newly revealed stage Next, keeping both transitions explicit in tests.
  if (screen.queryByRole('group', { name: /step 1 of/i })) {
    while (screen.queryByRole('group', { name: /step 1 of/i })) {
      await user.click(screen.getByRole('button', { name: 'Next' }));
    }
    return;
  }

  await user.click(screen.getByRole('button', { name: 'Next' }));
  await user.click(nav().getByRole('button', { name: /next step/i }));
}

/** Card one holds the lazy widget; settle it so nothing resolves after the test ends. */
async function settleWidget() {
  await screen.findByTestId('widget-place-value-builder');
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
    expect(screen.getAllByText('Big numbers are just acorn piles!')).toHaveLength(2);
    expect(screen.getByTestId('character-nutty')).toHaveAttribute('width', '360');
    expect(screen.getByTestId('character-nutty')).toHaveAttribute('height', '360');
    expect(screen.queryByText('Every digit has a place')).toBeNull();
    // Nowhere to go back to from the first stage.
    expect(nav().queryByRole('button', { name: /back/i })).toBeNull();
  });

  test('uses one Next control for the intro dialogue, then hands off to lesson navigation', async () => {
    const user = userEvent.setup();
    renderPlayer();

    expect(screen.getAllByRole('button', { name: 'Next' })).toHaveLength(1);
    expect(nav().queryByRole('button', { name: /next step/i })).toBeNull();

    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(await screen.findByText('Show me how!')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Next' })).toHaveLength(1);
    expect(nav().queryByRole('button', { name: /next step/i })).toBeNull();

    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(await screen.findByRole('heading', { name: 'Every digit has a place' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(nav().queryByRole('button', { name: /next step/i })).toBeNull();

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(nav().getByRole('button', { name: /next step/i })).toBeInTheDocument();
    await settleWidget();
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

  test('the active lesson stage receives focus on entry and every stage change', async () => {
    const user = userEvent.setup();
    renderPlayer();

    await waitFor(() => expect(screen.getByTestId('lesson-stage')).toHaveFocus());
    const introStage = screen.getByTestId('lesson-stage');
    await clickNext(user);
    await screen.findByRole('heading', { name: 'Every digit has a place' });

    await waitFor(() => expect(screen.getByTestId('lesson-stage')).toHaveFocus());
    expect(screen.getByTestId('lesson-stage')).not.toBe(introStage);
  });

  test('one persistent polite region announces each dialogue line', async () => {
    const user = userEvent.setup();
    renderPlayer();
    const liveRegion = screen.getByTestId('dialogue-live-region');

    await waitFor(() => expect(liveRegion).toHaveTextContent('Big numbers are just acorn piles!'));
    await user.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => expect(liveRegion).toHaveTextContent('Show me how!'));
    expect(screen.getByTestId('dialogue-live-region')).toBe(liveRegion);
    expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
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

  test("finishing a card's dialogue keeps its teaching and widget on screen until lesson Next", async () => {
    const user = userEvent.setup();
    renderPlayer();
    await clickNext(user);
    await screen.findByRole('heading', { name: 'Every digit has a place' });
    await settleWidget();
    // The blocks are readable the whole time the dialogue plays — it never gates them.
    expect(screen.getByText(/Count from the ones/)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Next' })).toHaveLength(1);
    expect(nav().queryByRole('button', { name: /next step/i })).toBeNull();

    // The card dialogue is one line, so its own Next finishes only that local exchange.
    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByRole('heading', { name: 'Every digit has a place' })).toBeInTheDocument();
    expect(screen.getByText(/Count from the ones/)).toBeInTheDocument();
    expect(screen.getByTestId('widget-place-value-builder')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Compare from the left' })).toBeNull();
    expect(nav().getByRole('button', { name: /next step/i })).toBeInTheDocument();

    await clickNext(user);
    expect(await screen.findByRole('heading', { name: 'Compare from the left' })).toBeInTheDocument();

    await user.click(nav().getByRole('button', { name: /back/i }));
    expect(await screen.findByRole('heading', { name: 'Every digit has a place' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(nav().queryByRole('button', { name: /next step/i })).toBeNull();
  });

  test('renders card blocks with bold, line breaks, example and tip callouts', async () => {
    const user = userEvent.setup();
    renderPlayer();
    await clickNext(user);
    await screen.findByRole('heading', { name: 'Every digit has a place' });
    await settleWidget();

    // Scoped to the block: the card's widget has a "hundreds" column label of its own.
    expect(within(screen.getByTestId('block-text')).getByText('hundreds').tagName).toBe('STRONG');
    expect(screen.getByText(/Count from the ones/)).toBeInTheDocument();
    expect(screen.getByTestId('block-example')).toHaveTextContent('482 is 4 hundreds, 8 tens, 2 ones');
    const tip = screen.getByTestId('block-tip');
    expect(tip).toHaveTextContent('Say the number out loud.');
    expect(tip).toHaveTextContent('💡');
    // The card's own dialogue sits above the blocks, no gating.
    expect(screen.getAllByText('Watch the places line up.')).toHaveLength(2);
  });

  test('a card widget renders inside the widget frame', async () => {
    const user = userEvent.setup();
    renderPlayer();
    await clickNext(user);

    expect(await screen.findByTestId('widget-place-value-builder')).toBeInTheDocument();
  });

  test.each([
    ['intro', /Big numbers are just acorn piles!/i],
    ['card:card-compare', /Compare from the left/i],
    ['worked', /Try one together/i],
    ['outro', /You learned it all!/i],
  ])('opens the %s stage from its URL', async (step, content) => {
    renderPlayer(`/lesson/${LESSON_ID}?step=${step}`);

    if (step === 'intro') {
      expect(screen.getByTestId('dialogue-scene')).toBeInTheDocument();
    } else {
      expect(await screen.findByText(content)).toBeInTheDocument();
    }
    expect(currentSearchParams().get('step')).toBe(step);
  });

  test('canonicalizes legacy review links while preserving unrelated query parameters', async () => {
    renderPlayer(`/lesson/${LESSON_ID}?card=card-compare&peek=1`);

    expect(await screen.findByRole('heading', { name: 'Compare from the left' })).toBeInTheDocument();
    expect(screen.queryByText('Big numbers are just acorn piles!')).toBeNull();
    await waitFor(() => expect(currentSearchParams().get('step')).toBe('card:card-compare'));
    expect(currentSearchParams().get('peek')).toBe('1');
    expect(currentSearchParams().has('card')).toBe(false);
  });

  test('canonicalizes unknown steps and unknown legacy cards to intro', async () => {
    renderPlayer(`/lesson/${LESSON_ID}?step=card:nope&card=nope&peek=1`);

    expect(screen.getAllByText('Big numbers are just acorn piles!')).toHaveLength(2);
    await waitFor(() => expect(currentSearchParams().get('step')).toBe('intro'));
    expect(currentSearchParams().get('peek')).toBe('1');
    expect(currentSearchParams().has('card')).toBe(false);
  });

  test('prefers a valid modern step over a legacy card when both are present', async () => {
    renderPlayer(`/lesson/${LESSON_ID}?step=worked&card=card-compare&peek=1`);

    expect(await screen.findByRole('heading', { name: 'Try one together' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Compare from the left' })).toBeNull();
    await waitFor(() => expect(currentSearchParams().get('step')).toBe('worked'));
    expect(currentSearchParams().get('peek')).toBe('1');
    expect(currentSearchParams().has('card')).toBe(false);
  });

  test('keeps an invalid modern step authoritative over a valid legacy card', async () => {
    renderPlayer(`/lesson/${LESSON_ID}?step=nope&card=card-compare&peek=1`);

    expect(screen.getByTestId('dialogue-scene')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Compare from the left' })).toBeNull();
    await waitFor(() => expect(currentSearchParams().get('step')).toBe('intro'));
    expect(currentSearchParams().get('peek')).toBe('1');
    expect(currentSearchParams().has('card')).toBe(false);
  });

  test('lesson navigation preserves query parameters and follows browser history', async () => {
    const user = userEvent.setup();
    renderPlayer(`/lesson/${LESSON_ID}?step=card:card-compare&peek=1`);
    await screen.findByRole('heading', { name: 'Compare from the left' });

    await user.click(nav().getByRole('button', { name: /next step/i }));
    expect(await screen.findByRole('heading', { name: 'Try one together' })).toBeInTheDocument();
    expect(currentSearchParams().get('step')).toBe('worked');
    expect(currentSearchParams().get('peek')).toBe('1');

    await user.click(screen.getByRole('button', { name: /browser back/i }));
    expect(await screen.findByRole('heading', { name: 'Compare from the left' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /browser forward/i }));
    expect(await screen.findByRole('heading', { name: 'Try one together' })).toBeInTheDocument();
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

  test('keeps a Reading source passage separate from numbered coaching and reads only the source', async () => {
    const { speak } = stubSpeech();
    const user = userEvent.setup();
    renderPlayer(`/lesson/${READING_LESSON_ID}?step=worked`);

    const passage = await screen.findByRole('region', { name: 'Passage: Original passage' });
    expect(passage).toHaveAttribute('tabindex', '0');
    expect(within(passage).getByText(/Maya checked the garden map/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'How to read it' })).toBeInTheDocument();
    const passagePanel = screen.getByRole('article', { name: 'Original passage' });
    expect(screen.getByRole('complementary', { name: 'How to read it' })).toHaveAttribute('tabindex', '0');

    const steps = screen.getAllByTestId('worked-step');
    expect(steps).toHaveLength(2);
    expect(steps[0]).toHaveTextContent(/^1Read the map details steadily\.$/);
    expect(steps[1]).toHaveTextContent(/^2Use a careful voice for the safety sign\.$/);

    await user.click(within(passagePanel).getByRole('button', { name: /read aloud/i }));
    const utterance = speak.mock.calls[0]![0] as { text: string };
    expect(utterance.text).toContain('Maya checked the garden map before choosing a path.');
    expect(utterance.text).not.toContain('Read the map details steadily.');
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

    const dismiss = screen.getByRole('button', { name: /dismiss sneak peek/i });
    const banner = dismiss.closest<HTMLElement>('.peek-banner');
    expect(banner).not.toBeNull();
    if (!banner) throw new Error('peek banner is missing');
    expect(banner).toHaveTextContent(/not ready yet/i);
    expect(banner).toHaveTextContent(/sneak peek/i);

    await user.click(within(banner).getByRole('button', { name: /dismiss/i }));

    expect(screen.queryByRole('button', { name: /dismiss sneak peek/i })).toBeNull();
  });

  test('no peek banner on a normal visit', () => {
    renderPlayer();

    expect(screen.queryByRole('button', { name: /dismiss sneak peek/i })).toBeNull();
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

    test('detaches utterance callbacks before cancelling an active voice', async () => {
      let active: { onend: (() => void) | null; onerror: (() => void) | null } | null = null;
      const callbackStates: Array<[unknown, unknown] | null> = [];
      class FakeUtterance {
        rate = 1;
        onend: (() => void) | null = null;
        onerror: (() => void) | null = null;
        constructor(public text: string) {}
      }
      Object.defineProperty(window, 'speechSynthesis', {
        configurable: true,
        value: {
          speak: (utterance: FakeUtterance) => { active = utterance; },
          cancel: () => callbackStates.push(active ? [active.onend, active.onerror] : null),
        },
      });
      Object.defineProperty(window, 'SpeechSynthesisUtterance', {
        configurable: true,
        value: FakeUtterance,
      });
      const user = userEvent.setup();
      renderPlayer(`/lesson/${LESSON_ID}?card=card-compare`);

      await user.click(screen.getByRole('button', { name: /read aloud/i }));
      await user.click(screen.getByRole('button', { name: /stop reading/i }));

      expect(callbackStates[callbackStates.length - 1]).toEqual([null, null]);
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
