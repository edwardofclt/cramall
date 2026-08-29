import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ProgressProvider, useProgress, type ProgressContextValue } from './ProgressContext';
import * as storage from './storage';
import { defaultSave, exportSave, loadSave, type Attempt } from './storage';

const ATTEMPT: Attempt = {
  date: '2026-08-29',
  score: 9,
  total: 10,
  missedConceptTags: ['rounding'],
};

const LESSON = 'math-u01-l1';

function Probe({ importJsonText = '' }: { importJsonText?: string }) {
  const { save, recordAttempt, updateSettings, setParentChecked, importJson, reset } =
    useProgress();
  const [importError, setImportError] = useState('');
  return (
    <div>
      <span data-testid="best">{save.lessons[LESSON]?.bestScore ?? 'none'}</span>
      <span data-testid="streak">{save.streak.count}</span>
      <span data-testid="sound">{String(save.settings.soundOn)}</span>
      <span data-testid="tts">{String(save.settings.ttsOn)}</span>
      <span data-testid="checked">{String(save.parentChecked[LESSON] ?? false)}</span>
      <span data-testid="import-error">{importError}</span>
      <button onClick={() => recordAttempt(LESSON, ATTEMPT, 8)}>record</button>
      <button onClick={() => updateSettings({ soundOn: false })}>mute</button>
      <button onClick={() => setParentChecked(LESSON, true)}>check</button>
      <button onClick={() => reset()}>reset</button>
      <button
        onClick={() => {
          try {
            importJson(importJsonText);
            setImportError('');
          } catch (error) {
            setImportError((error as Error).message);
          }
        }}
      >
        import
      </button>
    </div>
  );
}

function renderProbe(importJsonText?: string) {
  return render(
    <ProgressProvider>
      <Probe importJsonText={importJsonText} />
    </ProgressProvider>,
  );
}

function click(name: string) {
  return userEvent.setup().click(screen.getByRole('button', { name }));
}

describe('ProgressContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('useProgress throws when used outside a provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow(/ProgressProvider/i);
    spy.mockRestore();
  });

  test('recordAttempt updates state and persists to storage', async () => {
    renderProbe();
    expect(screen.getByTestId('best')).toHaveTextContent('none');

    await click('record');

    expect(screen.getByTestId('best')).toHaveTextContent('9');
    expect(screen.getByTestId('streak')).toHaveTextContent('1');

    const persisted = loadSave();
    expect(persisted.lessons[LESSON]?.status).toBe('passed');
    expect(persisted.lessons[LESSON]?.attempts).toHaveLength(1);
  });

  test('updateSettings merges into the existing settings and persists', async () => {
    renderProbe();

    await click('mute');

    expect(screen.getByTestId('sound')).toHaveTextContent('false');
    expect(screen.getByTestId('tts')).toHaveTextContent('true');
    expect(loadSave().settings).toEqual({ soundOn: false, ttsOn: true });
  });

  test('setParentChecked persists the parent review flag', async () => {
    renderProbe();

    await click('check');

    expect(screen.getByTestId('checked')).toHaveTextContent('true');
    expect(loadSave().parentChecked[LESSON]).toBe(true);
  });

  test('reset wipes progress back to a default save', async () => {
    renderProbe();

    await click('record');
    await click('reset');

    expect(screen.getByTestId('best')).toHaveTextContent('none');
    expect(loadSave().lessons).toEqual({});
  });

  test('importJson adopts a valid save file', async () => {
    const incoming = storage.recordAttempt(defaultSave(), LESSON, {
      date: '2026-08-29', score: 10, total: 10, missedConceptTags: [],
    }, 8);
    renderProbe(exportSave(incoming));

    await click('import');

    expect(screen.getByTestId('best')).toHaveTextContent('10');
    expect(screen.getByTestId('import-error')).toHaveTextContent('');
    expect(loadSave().lessons[LESSON]?.bestScore).toBe(10);
  });

  test('action identities stay stable across saves so effect deps do not churn', async () => {
    const seen: Array<ProgressContextValue['recordAttempt']> = [];

    function IdentityProbe() {
      const { save, recordAttempt } = useProgress();
      seen.push(recordAttempt);
      return (
        <div>
          <span data-testid="streak">{save.streak.count}</span>
          <button onClick={() => recordAttempt(LESSON, ATTEMPT, 8)}>record</button>
        </div>
      );
    }

    render(
      <ProgressProvider>
        <IdentityProbe />
      </ProgressProvider>,
    );
    const rendersBefore = seen.length;

    await click('record');

    // The save really did change (so the provider re-rendered)...
    expect(screen.getByTestId('streak')).toHaveTextContent('1');
    expect(seen.length).toBeGreaterThan(rendersBefore);
    // ...yet every consumer saw the very same function reference.
    expect(new Set(seen).size).toBe(1);
  });

  test('two actions in one tick both land instead of clobbering each other', async () => {
    function BatchProbe() {
      const { save, recordAttempt, setParentChecked } = useProgress();
      return (
        <div>
          <span data-testid="best">{save.lessons[LESSON]?.bestScore ?? 'none'}</span>
          <span data-testid="checked">{String(save.parentChecked[LESSON] ?? false)}</span>
          <button
            onClick={() => {
              recordAttempt(LESSON, ATTEMPT, 8);
              setParentChecked(LESSON, true);
            }}
          >
            record and check
          </button>
        </div>
      );
    }

    render(
      <ProgressProvider>
        <BatchProbe />
      </ProgressProvider>,
    );

    await click('record and check');

    expect(screen.getByTestId('best')).toHaveTextContent('9');
    expect(screen.getByTestId('checked')).toHaveTextContent('true');
    const persisted = loadSave();
    expect(persisted.lessons[LESSON]?.bestScore).toBe(9);
    expect(persisted.parentChecked[LESSON]).toBe(true);
  });

  test('importJson throws on an invalid save and leaves progress untouched', async () => {
    renderProbe('{"nope":true}');

    await click('record');
    await click('import');

    expect(screen.getByTestId('import-error')).toHaveTextContent(/invalid save file/i);
    expect(screen.getByTestId('best')).toHaveTextContent('9');
    expect(loadSave().lessons[LESSON]?.bestScore).toBe(9);
  });

  test('keeps progress usable and shows a notice when browser storage is unavailable', async () => {
    const storagePrototype = Object.getPrototypeOf(window.localStorage) as Storage;
    const original = storagePrototype.getItem;
    storagePrototype.getItem = () => {
      throw new Error('SecurityError');
    };
    try {
      renderProbe();

      expect(screen.getByRole('alert')).toHaveTextContent(/saved only while this tab is open/i);
      await click('record');
      expect(screen.getByTestId('best')).toHaveTextContent('9');
    } finally {
      storagePrototype.getItem = original;
    }
  });

  test('shows a storage notice and keeps state usable when the actual save write fails', async () => {
    const storagePrototype = Object.getPrototypeOf(window.localStorage) as Storage;
    const original = storagePrototype.setItem;
    storagePrototype.setItem = function (key, value) {
      if (key === 'cramall.v1') throw new Error('QuotaExceededError');
      return original.call(this, key, value);
    };
    try {
      renderProbe();

      await click('record');

      expect(screen.getByRole('alert')).toHaveTextContent(/saved only while this tab is open/i);
      expect(screen.getByTestId('best')).toHaveTextContent('9');
    } finally {
      storagePrototype.setItem = original;
    }
  });

  test('surfaces invalid stored progress instead of silently presenting it as a fresh save', () => {
    const raw = '{"version":1,"broken":true}';
    window.localStorage.setItem('cramall.v1', raw);

    renderProbe();

    expect(screen.getByRole('alert')).toHaveTextContent(/stored progress is invalid/i);
    expect(screen.getByTestId('best')).toHaveTextContent('none');
    expect(window.localStorage.getItem('cramall.v1')).toBe(raw);
  });
});
