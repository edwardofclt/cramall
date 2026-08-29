import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { Lesson, Question, Subject, Unit } from '../content/schema';
import { ProgressProvider, useProgress } from '../progress/ProgressContext';
import type { SaveData } from '../progress/storage';
import { QuickCheck } from './QuickCheck';

const { FIXTURE, THIN } = vi.hoisted(() => {
  function mc(n: number, conceptTag: string, reviewCardId: string): Question {
    return {
      id: `q${n}`,
      type: 'multiple-choice',
      prompt: `Question ${n}: which one is right?`,
      explanation: `Explanation for question ${n}.`,
      conceptTag,
      reviewCardId,
      choices: [
        { id: 'a', text: `Q${n} right answer` },
        { id: 'b', text: `Q${n} wrong answer` },
        { id: 'c', text: `Q${n} other answer` },
      ],
      correctChoiceId: 'a',
    };
  }

  const pool: Question[] = [
    mc(1, 'rounding-rules', 'card-rounding'),
    mc(2, 'rounding-rules', 'card-rounding'),
    mc(3, 'rounding-rules', 'card-rounding'),
    mc(4, 'place-value', 'card-places'),
    mc(5, 'place-value', 'card-places'),
    mc(6, 'place-value', 'card-places'),
    mc(7, 'place-value', 'card-places'),
    mc(8, 'place-value', 'card-places'),
    {
      id: 'q9',
      type: 'fill-blank',
      prompt: 'Question 9: write 482 in words.',
      explanation: 'Explanation for question 9.',
      conceptTag: 'place-value',
      reviewCardId: 'card-places',
      acceptedAnswers: ['four hundred eighty two'],
    },
    {
      id: 'q10',
      type: 'sort',
      prompt: 'Question 10: order them from least to greatest.',
      explanation: 'Explanation for question 10.',
      conceptTag: 'ordering-numbers',
      reviewCardId: 'card-order',
      items: [
        { id: 'i1', text: 'twelve' },
        { id: 'i2', text: 'one hundred twenty' },
        { id: 'i3', text: 'one thousand two hundred' },
      ],
      correctOrder: ['i1', 'i2', 'i3'],
    },
  ];

  const lesson: Lesson = {
    id: 'math-u01-l1',
    unitId: 'math-u01',
    title: 'Reading Big Numbers',
    indicatorCodes: ['4.NSBT.1'],
    intro: [{ speaker: 'nutty', text: 'Here we go!' }],
    learnCards: [
      { id: 'card-places', title: 'Places', blocks: [{ kind: 'text', text: 'Body' }] },
      { id: 'card-rounding', title: 'Rounding', blocks: [{ kind: 'text', text: 'Body' }] },
      { id: 'card-order', title: 'Ordering', blocks: [{ kind: 'text', text: 'Body' }] },
    ],
    workedExample: { title: 'Worked example', steps: ['Step one'] },
    quiz: { passThreshold: 8, pool },
  };

  // A lesson whose author has not written enough questions yet.
  const thinLesson: Lesson = {
    ...lesson,
    id: 'math-u01-l2',
    title: 'Half-written Lesson',
    quiz: { passThreshold: 8, pool: pool.slice(0, 4) },
  };

  const unit: Unit = {
    id: 'math-u01',
    subjectId: 'math',
    number: 1,
    title: 'Place Value Party',
    indicatorCodes: ['4.NSBT.1'],
    prerequisiteUnitIds: [],
    lessons: [lesson, thinLesson],
  };

  const subject: Subject = {
    id: 'math',
    title: 'Math',
    guide: 'nutty',
    color: '#f59e0b',
    units: [unit],
  };

  return {
    FIXTURE: { subject, unit, lesson },
    THIN: { subject, unit, lesson: thinLesson },
  };
});

vi.mock('../content/subjects', () => ({
  findLesson: (id: string) =>
    id === FIXTURE.lesson.id ? FIXTURE : id === THIN.lesson.id ? THIN : null,
}));

const LESSON_ID = FIXTURE.lesson.id;
const POOL = FIXTURE.lesson.quiz.pool;

/** Deterministic LCG so a run is reproducible; the helpers below never rely on the order. */
function seededRng(seed = 20260829): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function ProgressProbe() {
  const { save, updateSettings } = useProgress();
  return (
    <>
      <pre data-testid="save">{JSON.stringify(save)}</pre>
      <button type="button" onClick={() => updateSettings({ soundOn: !save.settings.soundOn })}>
        poke the context
      </button>
    </>
  );
}

function readSave(): SaveData {
  return JSON.parse(screen.getByTestId('save').textContent ?? '{}') as SaveData;
}

function renderQuiz(lessonId = LESSON_ID) {
  return render(
    <ProgressProvider>
      <MemoryRouter initialEntries={[`/lesson/${lessonId}/quiz`]}>
        <Routes>
          <Route path="/lesson/:lessonId/quiz" element={<QuickCheck rng={seededRng()} />} />
          <Route path="/lesson/:lessonId" element={<h1>Lesson screen</h1>} />
          <Route path="/subject/:subjectId" element={<h1>Subject map</h1>} />
          <Route path="/" element={<h1>Home screen</h1>} />
        </Routes>
        <ProgressProbe />
      </MemoryRouter>
    </ProgressProvider>,
  );
}

type User = ReturnType<typeof userEvent.setup>;

/** Whatever question the run put in front of us, found by its prompt. */
function currentQuestion(): Question {
  const prompt = screen.getByTestId('quiz-prompt').textContent ?? '';
  const question = POOL.find((q) => q.prompt === prompt);
  if (!question) throw new Error(`no fixture question matches prompt: "${prompt}"`);
  return question;
}

/**
 * Waits out the card transition: the outgoing question animates away before the next one
 * arrives, so "a prompt is on screen" is not enough — it has to be a *different* prompt.
 */
async function settledQuestion(previousPrompt?: string): Promise<Question> {
  await waitFor(() => {
    expect(screen.queryByTestId('quiz-results')).toBeNull();
    const prompt = screen.getByTestId('quiz-prompt').textContent ?? '';
    expect(prompt.length).toBeGreaterThan(0);
    if (previousPrompt !== undefined) expect(prompt).not.toBe(previousPrompt);
  });
  return currentQuestion();
}

async function answerCurrent(user: User, correctly: boolean) {
  const q = currentQuestion();
  if (q.type === 'sort') {
    const order = correctly ? q.correctOrder : [...q.correctOrder].reverse();
    for (const id of order) {
      await user.click(screen.getByTestId(`sort-item-${id}`));
    }
    await user.click(screen.getByRole('button', { name: /check/i }));
    return;
  }
  if (q.type === 'fill-blank') {
    await user.type(
      screen.getByLabelText(/your answer/i),
      correctly ? q.acceptedAnswers[0]! : 'purple bananas',
    );
    await user.click(screen.getByRole('button', { name: /check/i }));
    return;
  }
  const choice = correctly
    ? q.choices.find((c) => c.id === q.correctChoiceId)!
    : q.choices.find((c) => c.id !== q.correctChoiceId)!;
  await user.click(screen.getByRole('button', { name: choice.text }));
}

async function goNext(user: User) {
  await user.click(await screen.findByTestId('quiz-next'));
}

/** Plays a whole 10-question run; questions whose conceptTag is in `wrongTags` are missed. */
async function playRun(user: User, wrongTags: string[] = []) {
  let previous: string | undefined;
  for (let i = 0; i < 10; i += 1) {
    const q = await settledQuestion(previous);
    previous = q.prompt;
    await answerCurrent(user, !wrongTags.includes(q.conceptTag));
    await goNext(user);
  }
  await screen.findByTestId('quiz-results');
}

/** Answers correctly until the question of `type` is on screen. Returns once it is. */
async function advanceTo(user: User, type: Question['type']) {
  let previous: string | undefined;
  for (let i = 0; i < 10; i += 1) {
    const q = await settledQuestion(previous);
    if (q.type === type) return q;
    previous = q.prompt;
    await answerCurrent(user, true);
    await goNext(user);
  }
  throw new Error(`no ${type} question appeared in the run`);
}

beforeEach(() => {
  window.localStorage.clear();
});

describe('QuickCheck', () => {
  test('opens on the first question with an empty progress bar', async () => {
    renderQuiz();

    expect(await screen.findByTestId('quiz-prompt')).toBeInTheDocument();
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '10');
    expect(screen.queryByTestId('quiz-results')).toBeNull();
  });

  test('the progress bar advances as questions are answered', async () => {
    const user = userEvent.setup();
    renderQuiz();
    const first = await settledQuestion();

    await answerCurrent(user, true);
    await goNext(user);

    await settledQuestion(first.prompt);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
  });

  test('a perfect run scores 10/10 and records a passed attempt', async () => {
    const user = userEvent.setup();
    renderQuiz();

    await playRun(user);

    expect(screen.getByText('10/10')).toBeInTheDocument();
    const lessonProgress = readSave().lessons[LESSON_ID];
    expect(lessonProgress?.status).toBe('passed');
    expect(lessonProgress?.bestScore).toBe(10);
    expect(lessonProgress?.attempts).toHaveLength(1);
    expect(lessonProgress?.attempts[0]?.total).toBe(10);
    expect(lessonProgress?.attempts[0]?.missedConceptTags).toEqual([]);
    // Three stars for a clean sweep, read off the progress that was just written.
    expect(screen.getByTestId('lesson-stars')).toHaveAttribute('data-stars', '3');
  });

  test('a passing run celebrates with confetti and a cheering guide', async () => {
    const user = userEvent.setup();
    renderQuiz();

    await playRun(user);

    expect(screen.getAllByTestId('confetti-bit').length).toBeGreaterThan(20);
    const results = within(screen.getByTestId('quiz-results'));
    expect(results.getByTestId('character-nutty')).toHaveAttribute('data-pose', 'cheer');
  });

  test('records the attempt exactly once, even when the app re-renders', async () => {
    const user = userEvent.setup();
    renderQuiz();

    await playRun(user);
    expect(readSave().lessons[LESSON_ID]?.attempts).toHaveLength(1);

    // Any context change re-renders the results screen; recording must not fire again.
    await user.click(screen.getByRole('button', { name: /poke the context/i }));
    await user.click(screen.getByRole('button', { name: /poke the context/i }));

    expect(readSave().lessons[LESSON_ID]?.attempts).toHaveLength(1);
  });

  test('three misses of one concept become a single review card linking to that card', async () => {
    const user = userEvent.setup();
    renderQuiz();

    await playRun(user, ['rounding-rules']);

    expect(screen.getByText('7/10')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /things to review/i })).toBeInTheDocument();

    const groups = screen.getAllByTestId('review-group');
    expect(groups).toHaveLength(1);
    const group = within(groups[0]!);
    expect(group.getByText(/rounding rules/i)).toBeInTheDocument();
    expect(groups[0]!).toHaveTextContent(/3/);
    expect(group.getByRole('link', { name: /review this/i })).toHaveAttribute(
      'href',
      `/lesson/${LESSON_ID}?card=card-rounding`,
    );

    const attempt = readSave().lessons[LESSON_ID]?.attempts[0];
    expect(attempt?.score).toBe(7);
    expect(attempt?.missedConceptTags).toEqual([
      'rounding-rules',
      'rounding-rules',
      'rounding-rules',
    ]);
    expect(readSave().lessons[LESSON_ID]?.status).toBe('in-progress');
  });

  test('a missed run stays encouraging instead of punitive', async () => {
    const user = userEvent.setup();
    renderQuiz();

    await playRun(user, ['rounding-rules']);

    expect(screen.queryAllByTestId('confetti-bit')).toHaveLength(0);
    const results = within(screen.getByTestId('quiz-results'));
    expect(results.getByTestId('character-nutty')).toHaveAttribute('data-pose', 'think');
    expect(screen.getByTestId('quiz-results')).not.toHaveTextContent(/fail|wrong|bad/i);
    expect(screen.getByTestId('results-message')).toHaveTextContent(/\w/);
  });

  test('a wrong answer shows the explanation and an oops guide', async () => {
    const user = userEvent.setup();
    renderQuiz();
    const q = await settledQuestion();

    await answerCurrent(user, false);

    const feedback = await screen.findByTestId('quiz-feedback');
    expect(feedback).toHaveAttribute('data-tone', 'incorrect');
    expect(feedback).toHaveTextContent(q.explanation);
    expect(screen.getByTestId('character-nutty')).toHaveAttribute('data-pose', 'oops');
  });

  test('a right answer cheers and locks the choices', async () => {
    const user = userEvent.setup();
    renderQuiz();
    const q = await advanceTo(user, 'multiple-choice');
    if (q.type !== 'multiple-choice') throw new Error('unreachable');

    await answerCurrent(user, true);

    const feedback = await screen.findByTestId('quiz-feedback');
    expect(feedback).toHaveAttribute('data-tone', 'correct');
    expect(feedback).toHaveTextContent(/nice/i);
    expect(screen.getByTestId('character-nutty')).toHaveAttribute('data-pose', 'cheer');
    for (const choice of q.choices) {
      expect(screen.getByRole('button', { name: choice.text })).toBeDisabled();
    }
  });

  test('fill-blank: Check is disabled while empty and Enter submits', async () => {
    const user = userEvent.setup();
    renderQuiz();

    // Walk to the fill-blank question, answering everything before it correctly.
    await advanceTo(user, 'fill-blank');

    const input = screen.getByLabelText(/your answer/i);
    expect(screen.getByRole('button', { name: /check/i })).toBeDisabled();

    await user.type(input, 'four hundred eighty two{Enter}');

    const feedback = await screen.findByTestId('quiz-feedback');
    expect(feedback).toHaveAttribute('data-tone', 'correct');
    expect(input).toBeDisabled();
  });

  test('sort: tapped items number themselves, Reset order clears, Check grades', async () => {
    const user = userEvent.setup();
    renderQuiz();

    await advanceTo(user, 'sort');

    expect(screen.getByRole('button', { name: /check/i })).toBeDisabled();

    await user.click(screen.getByTestId('sort-item-i1'));
    expect(screen.getByTestId('sort-item-i1')).toHaveAttribute('data-position', '1');
    expect(screen.getByTestId('sort-item-i1')).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /reset order/i }));
    expect(screen.getByTestId('sort-item-i1')).not.toHaveAttribute('data-position');
    expect(screen.getByTestId('sort-item-i1')).toBeEnabled();

    await user.click(screen.getByTestId('sort-item-i1'));
    await user.click(screen.getByTestId('sort-item-i2'));
    await user.click(screen.getByTestId('sort-item-i3'));
    await user.click(screen.getByRole('button', { name: /check/i }));

    expect(await screen.findByTestId('quiz-feedback')).toHaveAttribute('data-tone', 'correct');
  });

  test('Try again starts a completely fresh run', async () => {
    const user = userEvent.setup();
    renderQuiz();
    await playRun(user);

    await user.click(screen.getByRole('button', { name: /try again/i }));

    await settledQuestion();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    // The finished attempt is still on record; a retry does not erase it.
    expect(readSave().lessons[LESSON_ID]?.attempts).toHaveLength(1);
  });

  test('a second run records a second attempt', async () => {
    const user = userEvent.setup();
    renderQuiz();
    await playRun(user, ['rounding-rules']);
    await user.click(screen.getByRole('button', { name: /try again/i }));
    await settledQuestion();

    await playRun(user);

    const lessonProgress = readSave().lessons[LESSON_ID];
    expect(lessonProgress?.attempts).toHaveLength(2);
    expect(lessonProgress?.bestScore).toBe(10);
    expect(lessonProgress?.status).toBe('passed');
  });

  test('results offer a way back to the subject map', async () => {
    const user = userEvent.setup();
    renderQuiz();

    await playRun(user);

    expect(screen.getByRole('link', { name: /back to map/i })).toHaveAttribute(
      'href',
      '/subject/math',
    );
  });

  test('a lesson without enough questions says so instead of crashing', () => {
    renderQuiz(THIN.lesson.id);

    expect(screen.getByText(/quiz not ready/i)).toBeInTheDocument();
    expect(screen.queryByTestId('quiz-prompt')).toBeNull();
  });

  test('an unknown lesson id shows a friendly not-found card', () => {
    renderQuiz('bogus-lesson');

    expect(screen.getByRole('heading', { name: /not found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
  });
});
