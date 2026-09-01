import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { allLessons, getSubject } from '../content/subjects';
import { ProgressProvider } from '../progress/ProgressContext';
import { defaultSave, persist, recordAttempt, type SaveData } from '../progress/storage';
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

  afterEach(() => {
    vi.useRealTimers();
  });

  test('derives stars, subject completion, and earned badges from current progress', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 29, 12));
    const [first, second] = allLessons();
    let save = defaultSave();
    for (const day of [23, 24, 25, 26, 27, 28]) {
      save = recordAttempt(save, first!.id, {
        date: `2026-08-${day}`, score: 10, total: 10, missedConceptTags: [],
      }, 8);
    }
    save = recordAttempt(save, second!.id, {
      date: '2026-08-29', score: 9, total: 10, missedConceptTags: [],
    }, 8);
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

  test('stale streaks do not earn display badges', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 29, 12));
    let save = defaultSave();
    for (const day of [24, 25, 26, 27]) {
      save = recordAttempt(save, `lesson-${day}`, {
        date: `2026-08-${day}`, score: 5, total: 10, missedConceptTags: [],
      }, 8);
    }

    renderProgress(save);

    expect(screen.getByText(/0 day streak/i)).toBeInTheDocument();
    expect(screen.getByTestId('badge-streak-3')).toHaveAttribute('data-state', 'locked');
  });

  test('subjects with authored lessons show zero completion progressbars before any attempts', () => {
    renderProgress();

    expect(screen.getByRole('progressbar', { name: /reading completion/i })).toHaveAttribute(
      'aria-valuemax',
      String(getSubject('reading').units.flatMap((unit) => unit.lessons).length),
    );
    expect(screen.getByRole('progressbar', { name: /science completion/i })).toHaveAttribute(
      'aria-valuemax',
      String(getSubject('science').units.flatMap((unit) => unit.lessons).length),
    );
    expect(screen.getAllByRole('progressbar')).toHaveLength(3);
    expect(screen.queryByText(/no authored lessons yet/i)).toBeNull();
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
