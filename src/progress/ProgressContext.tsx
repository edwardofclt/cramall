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

  const commit = useCallback((next: SaveData) => {
    persist(next);
    setSave(next);
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      save,
      recordAttempt: (lessonId, attempt, passThreshold) =>
        commit(recordAttemptPure(save, lessonId, attempt, passThreshold)),
      setParentChecked: (lessonId, checked) =>
        commit(setParentCheckedPure(save, lessonId, checked)),
      updateSettings: (partial) =>
        commit({ ...save, settings: { ...save.settings, ...partial } }),
      // importSave throws before commit, so a bad file leaves state and storage untouched.
      importJson: (json) => commit(importSave(json)),
      reset: () => commit(defaultSave()),
    }),
    [save, commit],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const value = useContext(ProgressContext);
  if (!value) throw new Error('useProgress must be used inside a <ProgressProvider>');
  return value;
}
