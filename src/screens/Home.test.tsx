import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test } from 'vitest';
import { SUBJECTS } from '../content/subjects';
import { ProgressProvider } from '../progress/ProgressContext';
import { defaultSave, persist, type SaveData } from '../progress/storage';
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
    const save = defaultSave();
    save.streak = { lastActiveDate: '2026-08-29', count: 4 };
    renderHome(save);

    expect(screen.getByTestId('streak')).toHaveTextContent('4');
    expect(screen.getByTestId('streak')).toHaveAccessibleName(/4 day/i);
  });

  test('shows the total stars earned across authored lessons', () => {
    const save = defaultSave();
    save.lessons['math-u01-l01'] = { status: 'passed', bestScore: 8, attempts: [] };
    save.lessons['math-u01-l02'] = { status: 'passed', bestScore: 10, attempts: [] };
    renderHome(save);

    expect(screen.getByLabelText('4 total stars')).toBeInTheDocument();
  });

  test('links to My Progress and Parent Corner', () => {
    renderHome();

    expect(screen.getByRole('link', { name: /my progress/i })).toHaveAttribute('href', '/progress');
    expect(screen.getByRole('link', { name: /parent corner/i })).toHaveAttribute('href', '/parent');
  });
});
