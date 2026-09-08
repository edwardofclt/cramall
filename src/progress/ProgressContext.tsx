import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  defaultSave,
  importSave,
  loadSaveResult,
  persist,
  recordAttempt as recordAttemptPure,
  recordReview as recordReviewPure,
  setParentChecked as setParentCheckedPure,
  type Attempt,
  type SaveData,
  type Settings,
} from './storage';
import type { ReviewAnswer } from '../review/model';

export type ProgressContextValue = {
  save: SaveData;
  /** Invalidates frozen practice sessions after an explicit progress replacement. */
  reviewEpoch: number;
  recordAttempt: (lessonId: string, attempt: Attempt, passThreshold: number) => void;
  recordReview: (answer: ReviewAnswer) => void;
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
  const [state, setState] = useState(() => {
    const loaded = loadSaveResult();
    return {
      save: loaded.save,
      notice: loaded.issue,
      reviewEpoch: 0,
    };
  });
  const { save, notice, reviewEpoch } = state;

  // Actions derive the next save from the *latest* state inside the updater, so several of
  // them can fire in one tick without clobbering each other, and so none of them close over
  // `save`. Action identities stay stable during ordinary saves; review callbacks renew only
  // after reset/import so an old session cannot write into replaced progress.
  // Persisting inside the updater is a deliberate
  // exception to updater purity: it is an idempotent write of the value being returned, so
  // StrictMode's double-invoke just writes the same JSON twice.
  const commit = useCallback((
    derive: (current: SaveData) => SaveData,
    options: { replaceProgress?: boolean; expectedReviewEpoch?: number } = {},
  ) => {
    setState((current) => {
      if (options.expectedReviewEpoch !== undefined && options.expectedReviewEpoch !== current.reviewEpoch) return current;
      const next = derive(current.save);
      const saved = persist(next);
      return {
        save: next,
        reviewEpoch: current.reviewEpoch + (options.replaceProgress ? 1 : 0),
        notice: saved
          ? null
          : 'Progress is saved only while this tab is open because browser storage is unavailable.',
      };
    });
  }, []);

  const recordAttempt = useCallback<ProgressContextValue['recordAttempt']>(
    (lessonId, attempt, passThreshold) =>
      commit((current) => recordAttemptPure(current, lessonId, attempt, passThreshold)),
    [commit],
  );

  const recordReview = useCallback<ProgressContextValue['recordReview']>(
    (answer) => commit((current) => recordReviewPure(current, answer), { expectedReviewEpoch: reviewEpoch }),
    [commit, reviewEpoch],
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
      commit(() => imported, { replaceProgress: true });
    },
    [commit],
  );

  const reset = useCallback<ProgressContextValue['reset']>(
    () => commit(() => defaultSave(), { replaceProgress: true }),
    [commit],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({ save, reviewEpoch, recordAttempt, recordReview, setParentChecked, updateSettings, importJson, reset }),
    [save, reviewEpoch, recordAttempt, recordReview, setParentChecked, updateSettings, importJson, reset],
  );

  return (
    <ProgressContext.Provider value={value}>
      {notice && (
        <div className="storage-notice" role="alert">
          {notice}
        </div>
      )}
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const value = useContext(ProgressContext);
  if (!value) throw new Error('useProgress must be used inside a <ProgressProvider>');
  return value;
}
