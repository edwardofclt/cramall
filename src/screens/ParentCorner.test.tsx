import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test } from 'vitest';
import { allLessons } from '../content/subjects';
import { ProgressProvider } from '../progress/ProgressContext';
import { defaultSave, persist, type SaveData } from '../progress/storage';
import { ParentCorner } from './ParentCorner';

const FIRST_LESSON = allLessons()[0]!;

function renderParent(save: SaveData = defaultSave()) {
  persist(save);
  return render(
    <ProgressProvider>
      <MemoryRouter><ParentCorner /></MemoryRouter>
    </ProgressProvider>,
  );
}

describe('ParentCorner', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('toggles the parent spot-check flag for an authored lesson', async () => {
    const user = userEvent.setup();
    renderParent();

    const checkbox = screen.getByRole('checkbox', { name: new RegExp(FIRST_LESSON.title, 'i') });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test('keeps progress unchanged and reports an error for an invalid import', async () => {
    const user = userEvent.setup();
    const save = defaultSave();
    save.lessons[FIRST_LESSON.id] = { status: 'passed', bestScore: 9, attempts: [] };
    renderParent(save);

    await user.upload(
      screen.getByLabelText(/import progress file/i),
      new File(['not valid JSON'], 'broken.json', { type: 'application/json' }),
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(/invalid save file/i);
    expect(screen.getByText('Passed')).toBeInTheDocument();
  });

  test('requires exact uppercase RESET before enabling reset', async () => {
    const user = userEvent.setup();
    const save = defaultSave();
    save.lessons[FIRST_LESSON.id] = { status: 'passed', bestScore: 9, attempts: [] };
    renderParent(save);

    const reset = screen.getByRole('button', { name: /^reset progress$/i });
    expect(reset).toBeDisabled();

    await user.type(screen.getByLabelText(/type RESET/i), 'reset');
    expect(reset).toBeDisabled();

    await user.clear(screen.getByLabelText(/type RESET/i));
    await user.type(screen.getByLabelText(/type RESET/i), 'RESET');
    expect(reset).toBeEnabled();

    await user.click(reset);
    expect(screen.queryByText('Passed')).not.toBeInTheDocument();
  });
});
