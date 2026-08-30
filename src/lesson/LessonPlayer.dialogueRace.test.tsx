import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, expect, test, vi } from 'vitest';
import type { Lesson, Subject, Unit } from '../content/schema';

const { FIXTURE, cardDialogueCallbacks } = vi.hoisted(() => {
  const lesson: Lesson = {
    id: 'math-u01-l1',
    unitId: 'math-u01',
    title: 'Dialogue race lesson',
    indicatorCodes: ['4.NSBT.1'],
    intro: [
      { speaker: 'nutty', text: 'Intro one.' },
      { speaker: 'nutty', text: 'Intro two.' },
    ],
    learnCards: [
      {
        id: 'card-dialogue',
        title: 'Dialogue card',
        dialogue: [{ speaker: 'nutty', text: 'Card dialogue.' }],
        blocks: [{ kind: 'text', text: 'Teaching stays visible.' }],
      },
      {
        id: 'card-next',
        title: 'Next card',
        blocks: [{ kind: 'text', text: 'Second card.' }],
      },
    ],
    workedExample: { title: 'Worked', steps: ['Step.'] },
    quiz: { passThreshold: 8, pool: [] },
  };
  const unit: Unit = {
    id: 'math-u01',
    subjectId: 'math',
    number: 1,
    title: 'Unit',
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
  return {
    FIXTURE: { subject, unit, lesson },
    cardDialogueCallbacks: [] as Array<() => void>,
  };
});

vi.mock('../content/subjects', () => ({
  findLesson: (id: string) => (id === FIXTURE.lesson.id ? FIXTURE : null),
}));

vi.mock('./LearnCard', () => ({
  LearnCard: ({ card, onDialogueDone }: { card: Lesson['learnCards'][number]; onDialogueDone?: () => void }) => {
    if (card.dialogue?.length) cardDialogueCallbacks.push(onDialogueDone ?? (() => {}));
    return (
      <section>
        <h2>{card.title}</h2>
        {card.dialogue?.length ? <button onClick={onDialogueDone}>Next</button> : null}
        {card.blocks.map((block) => <p key={block.text}>{block.text}</p>)}
      </section>
    );
  },
}));

import { LessonPlayer } from './LessonPlayer';

function nav() {
  return within(screen.getByRole('navigation', { name: /lesson steps/i }));
}

afterEach(() => {
  cardDialogueCallbacks.length = 0;
});

test('ignores an exiting card dialogue completion after returning to a fresh card visit', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/lesson/math-u01-l1']}>
      <Routes>
        <Route path="/lesson/:lessonId" element={<LessonPlayer />} />
      </Routes>
    </MemoryRouter>,
  );

  await user.click(screen.getByRole('button', { name: 'Next' }));
  await user.click(screen.getByRole('button', { name: 'Next' }));
  expect(await screen.findByRole('heading', { name: 'Dialogue card' })).toBeInTheDocument();
  const staleDone = cardDialogueCallbacks[0];
  if (!staleDone) throw new Error('Expected the first card dialogue callback');
  expect(nav().queryByRole('button', { name: /next step/i })).toBeNull();

  await user.click(screen.getByRole('button', { name: 'Next' }));
  await user.click(nav().getByRole('button', { name: /next step/i }));
  expect(await screen.findByRole('heading', { name: 'Next card' })).toBeInTheDocument();

  await user.click(nav().getByRole('button', { name: /back/i }));
  expect(await screen.findByRole('heading', { name: 'Dialogue card' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  expect(nav().queryByRole('button', { name: /next step/i })).toBeNull();

  act(staleDone);

  expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  expect(nav().queryByRole('button', { name: /next step/i })).toBeNull();
});
