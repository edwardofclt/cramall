import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { allLessons } from '../content/subjects';
import { ProgressProvider } from '../progress/ProgressContext';
import { defaultSave, exportSave, persist, type SaveData } from '../progress/storage';
import { ParentCorner } from './ParentCorner';

const FIRST_LESSON = allLessons()[0]!;

class ControlledFileReader {
  static readers: ControlledFileReader[] = [];
  result: string | ArrayBuffer | null = null;
  onload: ((event: ProgressEvent<FileReader>) => void) | null = null;
  onerror: ((event: ProgressEvent<FileReader>) => void) | null = null;

  readAsText() {
    ControlledFileReader.readers.push(this);
  }

  abort() {}

  complete(text: string) {
    this.result = text;
    this.onload?.(new ProgressEvent('load') as ProgressEvent<FileReader>);
  }
}

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
    ControlledFileReader.readers = [];
  });

  test('toggles the parent spot-check flag for an authored lesson', async () => {
    const user = userEvent.setup();
    renderParent();

    const checkbox = screen.getByRole('checkbox', { name: new RegExp(FIRST_LESSON.title, 'i') });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test('clicking the labeled 44px parent-check target toggles its checkbox', async () => {
    const user = userEvent.setup();
    renderParent();

    const checkbox = screen.getByRole('checkbox', { name: new RegExp(FIRST_LESSON.title, 'i') });
    await user.click(screen.getByText(`Mark checked: ${FIRST_LESSON.title}`));

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

  test('ignores an older import result after a newer selection and a reset', async () => {
    const user = userEvent.setup();
    vi.stubGlobal('FileReader', ControlledFileReader);
    try {
      renderParent();
      const input = screen.getByLabelText(/import progress file/i);
      const imported = defaultSave();
      imported.lessons[FIRST_LESSON.id] = { status: 'passed', bestScore: 10, attempts: [] };

      await user.upload(input, new File(['older'], 'older.json', { type: 'application/json' }));
      await user.upload(input, new File(['newer'], 'newer.json', { type: 'application/json' }));
      expect(ControlledFileReader.readers).toHaveLength(2);

      await act(async () => {
        ControlledFileReader.readers[1]!.complete(exportSave(defaultSave()));
      });
      expect(screen.queryByText('Passed')).not.toBeInTheDocument();

      await user.type(screen.getByLabelText(/type RESET/i), 'RESET');
      await user.click(screen.getByRole('button', { name: /^reset progress$/i }));
      await act(async () => {
        ControlledFileReader.readers[0]!.complete(exportSave(imported));
      });

      expect(screen.queryByText('Passed')).not.toBeInTheDocument();
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
