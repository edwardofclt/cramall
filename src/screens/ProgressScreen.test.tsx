import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test } from 'vitest';
import { allLessons, getSubject } from '../content/subjects';
import { ProgressProvider } from '../progress/ProgressContext';
import { defaultSave, persist, type SaveData } from '../progress/storage';
import { ProgressScreen } from './ProgressScreen';

function renderProgress(save: SaveData = defaultSave()) {
  persist(save);
  return render(
    <ProgressProvider>
      <MemoryRouter><ProgressScreen /></MemoryRouter>
    </ProgressProvider>,
  );
}

describe('ProgressScreen', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('derives stars, subject completion, and earned badges from current progress', () => {
    const [first, second] = allLessons();
    const save = defaultSave();
    save.lessons[first!.id] = { status: 'passed', bestScore: 10, attempts: [] };
    save.lessons[second!.id] = { status: 'passed', bestScore: 9, attempts: [] };
    save.streak = { lastActiveDate: '2026-08-29', count: 7 };
    renderProgress(save);

    expect(screen.getByLabelText('5 total stars')).toBeInTheDocument();
    expect(screen.getByRole('progressbar', { name: /math completion/i })).toHaveAttribute(
      'aria-valuenow',
      '2',
    );
    for (const badge of ['first-pass', 'perfect-10', 'unit-complete', 'streak-3', 'streak-7']) {
      expect(screen.getByTestId(`badge-${badge}`)).toHaveAttribute('data-state', 'earned');
    }
  });

  test('shows locked badges until their conditions are met', () => {
    renderProgress();

    expect(screen.getByTestId('badge-first-pass')).toHaveAttribute('data-state', 'locked');
    expect(screen.getByTestId('badge-perfect-10')).toHaveAttribute('data-state', 'locked');
    expect(screen.getByTestId('badge-unit-complete')).toHaveAttribute('data-state', 'locked');
    expect(screen.getByTestId('badge-streak-3')).toHaveAttribute('data-state', 'locked');
    expect(screen.getByTestId('badge-streak-7')).toHaveAttribute('data-state', 'locked');
    expect(screen.getByRole('progressbar', { name: /math completion/i })).toHaveAttribute(
      'aria-valuemax',
      String(getSubject('math').units.flatMap((unit) => unit.lessons).length),
    );
  });
});
