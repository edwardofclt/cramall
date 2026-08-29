import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { allLessons } from '../content/subjects';
import { ProgressProvider } from '../progress/ProgressContext';
import { defaultSave, exportSave, persist, recordAttempt, type SaveData } from '../progress/storage';
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

  fail() {
    this.onerror?.(new ProgressEvent('error') as ProgressEvent<FileReader>);
  }
}

function saveWithScore(score: number): SaveData {
  return recordAttempt(defaultSave(), FIRST_LESSON.id, {
    date: '2026-08-29',
    score,
    total: 10,
    missedConceptTags: Array.from({ length: 10 - score }, () => 'review'),
  }, 8);
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
    const save = saveWithScore(9);
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
    const save = saveWithScore(9);
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
      const imported = saveWithScore(10);

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

  test('rejects imports over 1 MiB before starting a file reader', async () => {
    const user = userEvent.setup();
    vi.stubGlobal('FileReader', ControlledFileReader);
    try {
      renderParent();

      await user.upload(
        screen.getByLabelText(/import progress file/i),
        new File(['x'.repeat(1_048_577)], 'too-large.json', { type: 'application/json' }),
      );

      expect(ControlledFileReader.readers).toHaveLength(0);
      expect(screen.getByRole('alert')).toHaveTextContent(/1 mib|too large/i);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  test('export reports a polite success and revokes its object URL on a later task', () => {
    vi.useFakeTimers();
    const createObjectURL = vi.fn(() => 'blob:progress');
    const revokeObjectURL = vi.fn();
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: createObjectURL });
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: revokeObjectURL });
    try {
      renderParent();
      fireEvent.click(screen.getByRole('button', { name: /export progress/i }));

      expect(screen.getByRole('status')).toHaveTextContent(/exported/i);
      expect(revokeObjectURL).not.toHaveBeenCalled();
      act(() => vi.runOnlyPendingTimers());
      expect(revokeObjectURL).toHaveBeenCalledWith('blob:progress');
    } finally {
      click.mockRestore();
      vi.useRealTimers();
    }
  });

  test('a successful import is polite while a file-reader failure is an alert', async () => {
    const user = userEvent.setup();
    vi.stubGlobal('FileReader', ControlledFileReader);
    try {
      renderParent();
      const input = screen.getByLabelText(/import progress file/i);
      await user.upload(input, new File(['valid'], 'valid.json', { type: 'application/json' }));
      await act(async () => ControlledFileReader.readers[0]!.complete(exportSave(defaultSave())));
      expect(screen.getByRole('status')).toHaveTextContent(/imported/i);

      await user.upload(input, new File(['broken'], 'broken.json', { type: 'application/json' }));
      await act(async () => ControlledFileReader.readers[1]!.fail());
      expect(screen.getByRole('alert')).toHaveTextContent(/unable to read/i);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
