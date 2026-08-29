import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  defaultSave,
  importSave,
  loadSave,
  persist,
  recordAttempt as recordAttemptPure,
  setParentChecked as setParentCheckedPure,
  type Attempt,
  type SaveData,
  type Settings,
} from './storage';

export type ProgressContextValue = {
  save: SaveData;
  recordAttempt: (lessonId: string, attempt: Attempt, passThreshold: number) => void;
  setParentChecked: (lessonId: string, checked: boolean) => void;
  updateSettings: (partial: Partial<Settings>) => void;
  /** Throws (`invalid save file`) when the JSON does not parse as a save — callers report it. */
  importJson: (json: string) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

/**
 * Thin React state wrapper over the pure functions in `storage.ts`: every action derives the
 * next save, writes it to localStorage, then swaps it into state. Nothing else in the app
 * touches storage directly.
 */
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [save, setSave] = useState<SaveData>(loadSave);

  // Actions derive the next save from the *latest* state inside the updater, so several of
  // them can fire in one tick without clobbering each other, and so none of them close over
  // `save` — their identities stay stable for the life of the provider and are safe to put in
  // a consumer's effect dependency array. Persisting inside the updater is a deliberate
  // exception to updater purity: it is an idempotent write of the value being returned, so
  // StrictMode's double-invoke just writes the same JSON twice.
  const commit = useCallback((derive: (current: SaveData) => SaveData) => {
    setSave((current) => {
      const next = derive(current);
      persist(next);
      return next;
    });
  }, []);

  const recordAttempt = useCallback<ProgressContextValue['recordAttempt']>(
    (lessonId, attempt, passThreshold) =>
      commit((current) => recordAttemptPure(current, lessonId, attempt, passThreshold)),
    [commit],
  );

  const setParentChecked = useCallback<ProgressContextValue['setParentChecked']>(
    (lessonId, checked) => commit((current) => setParentCheckedPure(current, lessonId, checked)),
    [commit],
  );

  const updateSettings = useCallback<ProgressContextValue['updateSettings']>(
    (partial) =>
      commit((current) => ({ ...current, settings: { ...current.settings, ...partial } })),
    [commit],
  );

  const importJson = useCallback<ProgressContextValue['importJson']>(
    (json) => {
      // Parsed before the updater runs, so an invalid file throws synchronously to the caller
      // and leaves both state and storage untouched.
      const imported = importSave(json);
      commit(() => imported);
    },
    [commit],
  );

  const reset = useCallback<ProgressContextValue['reset']>(
    () => commit(() => defaultSave()),
    [commit],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({ save, recordAttempt, setParentChecked, updateSettings, importJson, reset }),
    [save, recordAttempt, setParentChecked, updateSettings, importJson, reset],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const value = useContext(ProgressContext);
  if (!value) throw new Error('useProgress must be used inside a <ProgressProvider>');
  return value;
}
