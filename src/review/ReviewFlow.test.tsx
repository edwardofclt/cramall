import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { LessonPlayer } from '../lesson/LessonPlayer';
import { SUBJECTS } from '../content/subjects';

const math = SUBJECTS.find((subject) => subject.id === 'math')!;
const lesson = math.units[0]!.lessons[0]!;

function Location() {
  const location = useLocation();
  const navigate = useNavigate();
  return <><output data-testid="location">{location.pathname}{location.search}</output>
    <button onClick={() => navigate(-1)}>History back</button>
    <button onClick={() => navigate(1)}>History forward</button></>;
}

function renderStages(search = '') {
  return render(<MemoryRouter initialEntries={[`/lesson/${lesson.id}${search}`]}>
    <Location />
    <Routes><Route path="/lesson/:lessonId" element={<LessonPlayer review={{
      recall: (onDone) => <section><h2>Warm up your memory</h2><button onClick={onDone}>Finish warmup</button></section>,
      connect: (onDone) => <section><h2>Connect it</h2><button onClick={onDone}>Finish connection</button></section>,
    }} />} /></Routes>
  </MemoryRouter>);
}

describe('optional lesson review stages', () => {
  test('enters recall before intro and gives the stage one forward action', async () => {
    const user = userEvent.setup();
    renderStages('?peek=1&keep=yes');
    expect(screen.getByRole('heading', { name: 'Warm up your memory' })).toBeVisible();
    expect(screen.queryByRole('button', { name: 'Next step' })).not.toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('step=recall');
    await user.click(screen.getByRole('button', { name: 'Finish warmup' }));
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('step=intro'));
    expect(screen.getByTestId('location')).toHaveTextContent('peek=1&keep=yes');
  });

  test.each(['intro', `card:${lesson.learnCards[0]!.id}`, 'worked', 'outro', 'connect'])('preserves an explicit %s link', (step) => {
    renderStages(`?step=${encodeURIComponent(step)}&keep=yes`);
    expect(screen.getByTestId('location').textContent).toContain(`step=${encodeURIComponent(step)}`);
    expect(screen.queryByRole('heading', { name: 'Warm up your memory' })).not.toBeInTheDocument();
  });

  test('preserves exact legacy review card and unrelated parameters', () => {
    renderStages(`?card=${lesson.learnCards[0]!.id}&keep=yes`);
    expect(screen.getByTestId('location')).toHaveTextContent(`step=card%3A${lesson.learnCards[0]!.id}`);
    expect(screen.getByTestId('location')).toHaveTextContent('keep=yes');
    expect(screen.getByRole('heading', { name: lesson.learnCards[0]!.title })).toBeVisible();
  });

  test('puts connect after worked, restores it with history, and continues to outro', async () => {
    const user = userEvent.setup();
    renderStages('?step=worked&keep=yes');
    await user.click(screen.getByRole('button', { name: 'Next step' }));
    await screen.findByRole('heading', { name: 'Connect it' });
    expect(screen.queryByRole('button', { name: 'Next step' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Finish connection' }));
    await screen.findByRole('heading', { name: 'You learned it all!' });
    await user.click(screen.getByRole('button', { name: 'History back' }));
    await screen.findByRole('heading', { name: 'Connect it' });
    await user.click(screen.getByRole('button', { name: 'History forward' }));
    await screen.findByRole('heading', { name: 'You learned it all!' });
    expect(screen.getByTestId('location')).toHaveTextContent('step=outro&keep=yes');
  });
});

// Each test answers rendered controls and inspects saved evidence, rather than
// replacing the provider or question card with mocks.
import type { Lesson, Question } from '../content/schema';
import { ProgressProvider, useProgress } from '../progress/ProgressContext';
import { defaultSave, loadSave, persist, recordAttempt } from '../progress/storage';
import { ReviewSession } from './ReviewSession';
import type { ReviewItem } from './selection';

const reading = SUBJECTS.find((subject) => subject.id === 'reading')!;
const sourceLesson = reading.units.flatMap((unit) => unit.lessons).find((candidate) => candidate.quiz.reference)!;
const question = sourceLesson.quiz.pool.find((candidate) => candidate.type === 'multiple-choice')!;
const secondQuestion = sourceLesson.quiz.pool.find((candidate) => candidate.conceptTag !== question.conceptTag)!;
const items: ReviewItem[] = [
  { lesson: sourceLesson, question, reason: 'Ready to revisit' },
  { lesson: sourceLesson, question: secondQuestion, reason: 'Ready to revisit' },
];

function passedSave(lessons: Lesson[] = [sourceLesson]) {
  return lessons.reduce((save, current) => recordAttempt(save, current.id, {
    date: '2026-09-01', score: 9, total: 10, missedConceptTags: [],
  }, 8), defaultSave());
}

function answer(questionToAnswer: Question, correct = true) {
  if (questionToAnswer.type === 'multiple-choice' || questionToAnswer.type === 'true-false') {
    const choice = questionToAnswer.choices.find((candidate) => (candidate.id === questionToAnswer.correctChoiceId) === correct)!;
    fireEvent.click(screen.getByRole('button', { name: choice.text }));
  } else if (questionToAnswer.type === 'fill-blank') {
    fireEvent.change(screen.getByRole('textbox'), { target: { value: correct ? questionToAnswer.acceptedAnswers[0] : 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
  } else if (questionToAnswer.type === 'sort') {
    const order = correct ? questionToAnswer.correctOrder : [...questionToAnswer.correctOrder].reverse();
    for (const id of order) {
      const option = questionToAnswer.items.find((candidate) => candidate.id === id)!;
      fireEvent.click(screen.getByRole('button', { name: `${option.text}, not selected` }));
    }
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
  }
}

function ContextControls() {
  const { save, reset, importJson, updateSettings } = useProgress();
  return <><output data-testid="save">{JSON.stringify(save)}</output>
    <button onClick={reset}>Reset progress</button>
    <button onClick={() => importJson(JSON.stringify(defaultSave()))}>Import empty save</button>
    <button onClick={() => updateSettings({ soundOn: false })}>Change sound</button></>;
}

beforeEach(() => {
  window.localStorage.clear();
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date(2026, 8, 8, 12));
});
afterEach(() => {
  vi.useRealTimers();
  Reflect.deleteProperty(window, 'speechSynthesis');
  Reflect.deleteProperty(window, 'SpeechSynthesisUtterance');
});

describe('fixed memory practice session', () => {
  function mount(sessionItems = items) {
    const before = passedSave();
    persist(before);
    const onDone = vi.fn();
    const view = render(<MemoryRouter><ProgressProvider><ContextControls />
      <ReviewSession items={sessionItems} guide={reading.guide} onDone={onDone} />
    </ProgressProvider></MemoryRouter>);
    return { ...view, onDone, before };
  }

  test('puts the complete owned source before its question and retains it with missed feedback', () => {
    mount();
    const source = screen.getByRole('region', { name: `Source: ${sourceLesson.quiz.reference!.title}` });
    const prompt = screen.getByTestId('quiz-prompt');
    expect(source.compareDocumentPosition(prompt) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(source.textContent).toContain(sourceLesson.quiz.reference!.text);
    answer(question, false);
    expect(source).toBeVisible();
    expect(screen.getByTestId('quiz-feedback')).toHaveTextContent(question.explanation);
    const link = screen.getByRole('link', { name: /revisit.*opens in a new tab/i });
    expect(link).toHaveAttribute('href', `/lesson/${sourceLesson.id}?step=card%3A${question.reviewCardId}`);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('records only the first submission, keeps the selected questions, and guards repeated Next', () => {
    const { before, onDone } = mount();
    expect(loadSave()).toEqual(before);
    answer(question);
    const savedAfterAnswer = loadSave();
    expect(savedAfterAnswer).not.toEqual(before);
    expect(savedAfterAnswer.lessons).toEqual(before.lessons);
    expect(savedAfterAnswer.streak).toEqual(before.streak);
    const next = screen.getByRole('button', { name: 'Next' });
    act(() => { fireEvent.click(next); fireEvent.click(next); });
    expect(screen.getByTestId('quiz-prompt')).toHaveTextContent(secondQuestion.prompt);
    expect(loadSave()).toEqual(savedAfterAnswer);
    expect(screen.queryByTestId('quiz-feedback')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Change sound' }));
    expect(screen.getByTestId('quiz-prompt')).toHaveTextContent(secondQuestion.prompt);
    answer(secondQuestion);
    expect(screen.queryByRole('button', { name: 'See my score' })).not.toBeInTheDocument();
    const finish = screen.getByRole('button', { name: 'Finish practice' });
    act(() => { fireEvent.click(finish); fireEvent.click(finish); });
    expect(screen.getByRole('heading', { name: 'Memory practice complete' })).toBeVisible();
    const done = screen.getByRole('button', { name: 'Continue to lesson' });
    act(() => { fireEvent.click(done); fireEvent.click(done); });
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  test('a same-tick second choice cannot replace the first answer or its feedback', () => {
    mount();
    if (question.type !== 'multiple-choice' && question.type !== 'true-false') throw new Error('Expected choice fixture');
    const first = screen.getByRole('button', { name: question.choices.find((choice) => choice.id === question.correctChoiceId)!.text });
    const second = screen.getByRole('button', { name: question.choices.find((choice) => choice.id !== question.correctChoiceId)!.text });
    act(() => { fireEvent.click(first); fireEvent.click(second); });
    expect(screen.getByTestId('quiz-card')).toHaveAttribute('data-tone', 'correct');
    expect(screen.queryByRole('link', { name: /revisit/i })).not.toBeInTheDocument();
    expect(Object.values(loadSave().reviews!)).toHaveLength(1);
    expect(Object.values(loadSave().reviews!)[0]!.correct).toBe(true);
  });

  test('optional read-aloud speaks the entire source and stops when the question changes', () => {
    const speak = vi.fn();
    const cancel = vi.fn();
    class FakeUtterance {
      rate = 1;
      onend: (() => void) | null = null;
      onerror: (() => void) | null = null;
      constructor(public text: string) {}
    }
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: { speak, cancel } });
    Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, value: FakeUtterance });
    mount();
    const source = screen.getByRole('region', { name: `Source: ${sourceLesson.quiz.reference!.title}` });
    fireEvent.click(within(source).getByRole('button', { name: 'Read aloud' }));
    expect((speak.mock.calls[0]![0] as FakeUtterance).text).toContain(sourceLesson.quiz.reference!.text.replace(/\s+/g, ' '));
    answer(question);
    cancel.mockClear();
    fireEvent.click(screen.getByTestId('quiz-next'));
    expect(cancel).toHaveBeenCalled();
    Reflect.deleteProperty(window, 'speechSynthesis');
    Reflect.deleteProperty(window, 'SpeechSynthesisUtterance');
  });

  test.each(['Reset progress', 'Import empty save'])('does not write old review after %s', (action) => {
    mount();
    fireEvent.click(screen.getByRole('button', { name: action }));
    // A mounted old card cannot recreate review evidence after the save changes.
    if (screen.queryByTestId('quiz-prompt')) answer(question);
    expect(loadSave()).toEqual(defaultSave());
  });
});

import { Home } from '../screens/Home';
import { SubjectMap } from '../screens/SubjectMap';

function mountMap() {
  return render(<MemoryRouter initialEntries={['/subject/math']}><ProgressProvider>
    <Routes><Route path="/subject/:subjectId" element={<SubjectMap />} /></Routes>
  </ProgressProvider></MemoryRouter>);
}

describe('review invitations', () => {
  test('keeps a prominent review route after every lesson is passed', () => {
    persist(passedSave(math.units.flatMap((unit) => unit.lessons)));
    mountMap();
    const invitation = screen.getByRole('region', { name: 'Keep it growing' });
    expect(within(invitation).getByRole('link', { name: 'Review earlier ideas' })).toHaveAttribute('href', '/subject/math/review');
    expect(invitation.compareDocumentPosition(screen.getAllByTestId('unit-title')[0]!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(invitation).toHaveTextContent(/ideas are ready to revisit/);
  });

  test('home subject cards show when earlier ideas are due', () => {
    persist(passedSave([lesson]));
    render(<MemoryRouter><ProgressProvider><Home /></ProgressProvider></MemoryRouter>);
    expect(screen.getByRole('link', { name: /Math.*ideas ready to revisit/ })).toBeVisible();
  });
});

import { SpiralLesson } from './SpiralLesson';
import { ReviewScreen } from './ReviewScreen';
import { selectReview } from './selection';
import { connectionForLesson } from './connections';
import { localDateIso } from '../progress/logic';

function mountFlow(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><ProgressProvider><Location /><ContextControls />
    <Routes>
      <Route path="/lesson/:lessonId" element={<SpiralLesson />} />
      <Route path="/subject/:subjectId/review" element={<ReviewScreen />} />
      <Route path="/subject/:subjectId" element={<SubjectMap />} />
    </Routes>
  </ProgressProvider></MemoryRouter>);
}

describe('curriculum review routes', () => {
  test('a new learner still starts with the introduction', () => {
    mountFlow(`/lesson/${lesson.id}`);
    expect(screen.getByTestId('location')).toHaveTextContent('step=intro');
    expect(screen.queryByRole('heading', { name: 'Warm up your memory' })).not.toBeInTheDocument();
  });

  test('warmup uses earlier passed ideas, keeps its selection as answers save, and continues to intro', async () => {
    const save = passedSave();
    persist(save);
    const nextLesson = reading.units.flatMap((unit) => unit.lessons)[1]!;
    const selected = selectReview(save, reading, localDateIso(), nextLesson.id);
    expect(selected.length).toBeGreaterThan(0);
    mountFlow(`/lesson/${nextLesson.id}?keep=yes`);
    expect(screen.getByRole('heading', { name: 'Warm up your memory' })).toBeVisible();
    for (const item of selected) {
      expect(screen.getByTestId('quiz-prompt')).toHaveTextContent(item.question.prompt);
      answer(item.question);
      fireEvent.click(screen.getByTestId('quiz-next'));
    }
    fireEvent.click(screen.getByRole('button', { name: 'Continue to lesson' }));
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('step=intro'));
    expect(screen.getByTestId('location')).toHaveTextContent('keep=yes');
    expect(loadSave().lessons).toEqual(save.lessons);
  });

  test('a standalone due review stays available after all lessons pass and returns to the map', () => {
    const save = passedSave(math.units.flatMap((unit) => unit.lessons));
    persist(save);
    const selected = selectReview(save, math, localDateIso());
    mountFlow('/subject/math/review');
    expect(screen.getByRole('heading', { name: 'Keep it growing', level: 1 })).toBeVisible();
    for (const item of selected) {
      answer(item.question);
      fireEvent.click(screen.getByTestId('quiz-next'));
    }
    fireEvent.click(screen.getByRole('button', { name: 'Back to Math' }));
    expect(screen.getByRole('heading', { name: 'Math', level: 1 })).toBeVisible();
    expect(screen.getByTestId('location')).toHaveTextContent('/subject/math');
  });

  test('a standalone review with nothing due offers a return path without a question', () => {
    mountFlow('/subject/reading/review');
    expect(screen.getByRole('heading', { name: 'Nothing due today' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Back to Reading' })).toHaveAttribute('href', '/subject/reading');
    expect(screen.queryByTestId('quiz-card')).not.toBeInTheDocument();
  });

  test('connect asks the authored application, explains it and reaches outro without review evidence', async () => {
    const unit = reading.units[0]!;
    const terminal = unit.lessons[unit.lessons.length - 1]!;
    const connection = connectionForLesson(reading, terminal)!;
    mountFlow(`/lesson/${terminal.id}?step=connect&keep=yes`);
    expect(screen.getByRole('heading', { name: 'Connect it' })).toBeVisible();
    expect(screen.getByText(connection.foundation)).toBeVisible();
    const source = screen.getByRole('region', { name: `Source: ${connection.source!.title}` });
    expect(source.textContent).toContain(connection.source!.text);
    expect(source.compareDocumentPosition(screen.getByTestId('quiz-prompt')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Next step' })).not.toBeInTheDocument();
    answer(connection.question, false);
    expect(screen.getByTestId('quiz-feedback')).toHaveTextContent(connection.question.explanation);
    expect(source).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Continue lesson' }));
    await screen.findByRole('heading', { name: 'You learned it all!' });
    expect(screen.getByTestId('location')).toHaveTextContent('step=outro&keep=yes');
    expect(loadSave()).toEqual(defaultSave());
  });
});
