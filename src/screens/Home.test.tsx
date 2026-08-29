import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { SUBJECTS } from '../content/subjects';
import { ProgressProvider } from '../progress/ProgressContext';
import { defaultSave, persist, recordAttempt, type SaveData } from '../progress/storage';
import { Home } from './Home';

function renderHome(save: SaveData = defaultSave()) {
  persist(save);
  return render(
    <ProgressProvider>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </ProgressProvider>,
  );
}

describe('Home', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('shows the app title and a portal card per subject', () => {
    renderHome();

    expect(screen.getByRole('heading', { name: /cram all/i })).toBeInTheDocument();
    for (const subject of SUBJECTS) {
      const link = screen.getByRole('link', { name: new RegExp(subject.title, 'i') });
      expect(link).toHaveAttribute('href', `/subject/${subject.id}`);
      expect(link).toHaveTextContent(/\d+ \/ \d+ lessons/);
    }
  });

  test('invites a first streak when there is none yet', () => {
    renderHome();

    expect(screen.getByTestId('streak')).toHaveTextContent(/start your streak/i);
  });

  test('shows the streak flame and count once a streak exists', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 29, 12));
    let save = defaultSave();
    for (const day of [26, 27, 28, 29]) {
      save = recordAttempt(save, `lesson-${day}`, {
        date: `2026-08-${day}`,
        score: 5,
        total: 10,
        missedConceptTags: [],
      }, 8);
    }
    renderHome(save);

    expect(screen.getByTestId('streak')).toHaveTextContent('4');
    expect(screen.getByTestId('streak')).toHaveAccessibleName(/4 day/i);
  });

  test('expires a stale stored streak on display', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 29, 12));
    const save = recordAttempt(defaultSave(), 'lesson-1', {
      date: '2026-08-27',
      score: 5,
      total: 10,
      missedConceptTags: [],
    }, 8);

    renderHome(save);

    expect(screen.getByTestId('streak')).toHaveTextContent(/start your streak/i);
    expect(screen.getByTestId('streak')).not.toHaveTextContent('1 day streak');
  });

  test('shows the total stars earned across authored lessons', () => {
    let save = recordAttempt(defaultSave(), 'math-u01-l01', {
      date: '2026-08-28', score: 8, total: 10, missedConceptTags: [],
    }, 8);
    save = recordAttempt(save, 'math-u01-l02', {
      date: '2026-08-29', score: 10, total: 10, missedConceptTags: [],
    }, 8);
    renderHome(save);

    expect(screen.getByLabelText('4 total stars')).toBeInTheDocument();
  });

  test('links to My Progress and Parent Corner', () => {
    renderHome();

    expect(screen.getByRole('link', { name: /my progress/i })).toHaveAttribute('href', '/progress');
    expect(screen.getByRole('link', { name: /parent corner/i })).toHaveAttribute('href', '/parent');
  });
});
