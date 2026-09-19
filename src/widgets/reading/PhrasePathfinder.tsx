import { useMemo, useState } from 'react';
import { ActivityWorkbench } from '../ActivityWorkbench';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';
import './guide-led-reading.css';
import './phrase-pathfinder.css';

type PhrasePathfinderProps = WidgetProps<'phrase-pathfinder'>;
type ReflectionKind = 'accuracy' | 'pace' | 'meaning';

const reflectionOptions: Record<ReflectionKind, string[]> = {
  accuracy: [
    'I matched the words in the original.',
    'I went back to fix a word I missed.',
  ],
  pace: [
    'My pace felt steady enough to follow the ideas.',
    'I slowed down where the ideas were packed together.',
  ],
  meaning: [
    'I can explain why Isla checked the labels.',
    'I want to reread the label details once more.',
  ],
};

const cleanWord = (word: string) => word.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, '');
const wordsFrom = (text: string) => text.trim().split(/\s+/);
const sentencesFrom = (text: string) => text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(sentence => sentence.trim()) ?? [text];
const meaningSuccess = 'Your answer and evidence work together: the labels show where each tray belonged.';

function phraseGroups(words: string[], pauseAfter: number[]) {
  const stops = [...new Set([...pauseAfter, words.length - 1])].sort((a, b) => a - b);
  let start = 0;
  return stops.map(stop => {
    const group = words.slice(start, stop + 1);
    start = stop + 1;
    return group;
  }).filter(group => group.length > 0);
}

function PhrasePathfinderExperience({ config, onEvent }: PhrasePathfinderProps) {
  const originalWords = useMemo(() => wordsFrom(config.source), [config.source]);
  const originalIndex = originalWords.findIndex(word => cleanWord(word).toLowerCase() === config.originalWord.toLowerCase());
  const changedSource = originalWords.map((word, index) => index === originalIndex
    ? word.replace(config.originalWord, config.changedWord)
    : word);
  const evidenceSentences = useMemo(() => sentencesFrom(config.source), [config.source]);

  const [attempt, setAttempt] = useState(0);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [repairDraft, setRepairDraft] = useState('');
  const [repaired, setRepaired] = useState(false);
  const [repairFeedback, setRepairFeedback] = useState<string[]>([]);
  const [pauseAfter, setPauseAfter] = useState<number[]>([]);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [showSample, setShowSample] = useState(false);
  const [phraseFeedback, setPhraseFeedback] = useState<string[]>([]);
  const [meaningChoice, setMeaningChoice] = useState<string | null>(null);
  const [meaningEvidence, setMeaningEvidence] = useState<string | null>(null);
  const [meaningFeedback, setMeaningFeedback] = useState<string[]>([]);
  const [meaningChecked, setMeaningChecked] = useState(false);
  const [reflections, setReflections] = useState<Partial<Record<ReflectionKind, string>>>({});
  const [rereadAcknowledged, setRereadAcknowledged] = useState(false);
  const [finished, setFinished] = useState(false);
  const completion = useCompletionLatch(`${attempt}`);
  const groups = phraseGroups(originalWords, pauseAfter);

  const clearConclusions = () => {
    setMeaningChoice(null);
    setMeaningEvidence(null);
    setMeaningFeedback(previous => previous.filter(message => message !== meaningSuccess));
    setMeaningChecked(false);
    setReflections({});
    setRereadAcknowledged(false);
    setFinished(false);
  };

  const selectPracticeWord = (index: number) => {
    setSelectedWord(index);
    setRepairDraft('');
    onEvent({ type: 'interaction', action: 'select-word' });
  };

  const checkRepair = () => {
    onEvent({ type: 'interaction', action: 'repair' });
    const selectedChangedWord = selectedWord === originalIndex;
    const restoredOriginal = repairDraft.trim().toLowerCase() === config.originalWord.toLowerCase();
    if (!selectedChangedWord || !restoredOriginal) {
      setRepairFeedback(previous => [...previous, 'Compare every letter with the original sentence.']);
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }
    setRepaired(true);
    setRepairFeedback(previous => [...previous, `You restored “${config.originalWord}” from the original.`]);
    onEvent({ type: 'coach', cue: 'milestone' });
  };

  const toggleBoundary = (index: number) => {
    const next = pauseAfter.includes(index)
      ? pauseAfter.filter(value => value !== index)
      : [...pauseAfter, index].sort((a, b) => a - b);
    setPauseAfter(next);
    setPreviewIndex(null);
    setShowSample(false);
    clearConclusions();
    setPhraseFeedback(previous => previous.length === 0
      ? ['Your pauses are a reading plan. There is more than one useful way to group the words.']
      : previous);
    onEvent({ type: 'interaction', action: 'mark-phrase' });
    onEvent({ type: 'change', value: { pauseAfter: next } });
  };

  const startPreview = () => {
    setPreviewIndex(0);
    setPhraseFeedback(previous => [...previous, 'Try reading each group as one connected idea. Move a pause if it interrupts the meaning.']);
    onEvent({ type: 'interaction', action: 'preview' });
    onEvent({ type: 'coach', cue: 'strategy' });
  };

  const reviseMeaning = (kind: 'choice' | 'evidence', value: string) => {
    if (kind === 'choice') setMeaningChoice(value);
    else setMeaningEvidence(value);
    setMeaningFeedback(previous => previous.filter(message => message !== meaningSuccess));
    setMeaningChecked(false);
    setReflections({});
    setRereadAcknowledged(false);
    setFinished(false);
    onEvent({ type: 'interaction', action: 'answer' });
  };

  const checkMeaning = () => {
    onEvent({ type: 'interaction', action: 'answer' });
    if (!meaningChoice || !meaningEvidence) {
      const prompt = !meaningChoice && !meaningEvidence
        ? 'Choose a meaning answer and a sentence from the passage before checking.'
        : !meaningChoice
          ? 'Choose a meaning answer before checking.'
          : 'Choose a sentence from the passage to support your answer.';
      setMeaningFeedback(previous => [...previous, prompt]);
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }
    if (meaningChoice !== config.correctMeaningId || meaningEvidence !== config.meaningEvidence) {
      setMeaningFeedback(previous => [...previous, 'Look for the two labels and where each tray belongs.']);
      setMeaningChecked(false);
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }
    setMeaningChecked(true);
    setMeaningFeedback(previous => [...previous, meaningSuccess]);
    onEvent({ type: 'coach', cue: 'milestone' });
  };

  const chooseReflection = (kind: ReflectionKind, value: string) => {
    setReflections(previous => ({ ...previous, [kind]: value }));
    setFinished(false);
    onEvent({ type: 'interaction', action: 'reflect' });
  };

  const reflectionReady = Boolean(reflections.accuracy && reflections.pace && reflections.meaning && rereadAcknowledged);
  const finish = () => {
    if (!reflectionReady || finished) return;
    setFinished(true);
    onEvent({ type: 'interaction', action: 'reflect' });
    completion.completeOnce(() => onEvent({ type: 'complete', value: { reflectionComplete: true } }));
  };

  const reset = () => {
    setAttempt(value => value + 1);
    setSelectedWord(null);
    setRepairDraft('');
    setRepaired(false);
    setRepairFeedback([]);
    setPauseAfter([]);
    setPreviewIndex(null);
    setShowSample(false);
    setPhraseFeedback([]);
    setMeaningChoice(null);
    setMeaningEvidence(null);
    setMeaningFeedback([]);
    setMeaningChecked(false);
    setReflections({});
    setRereadAcknowledged(false);
    setFinished(false);
    onEvent({ type: 'interaction', action: 'reset' });
    onEvent({ type: 'change', value: { pauseAfter: [] } });
  };

  const preview = previewIndex === null ? null : groups[Math.min(previewIndex, groups.length - 1)];
  const revealKey = finished ? 'complete' : meaningChecked ? 'reflect' : previewIndex !== null ? 'meaning' : repaired ? 'phrases' : 'repair';

  return (
    <section
      className="card widget-experiment activity-shell reading-activity phrase-pathfinder"
      data-testid="widget-phrase-pathfinder"
      data-state={finished ? 'complete' : revealKey}
    >
      <ActivityWorkbench
        label="Phrase Pathfinder"
        revealKey={revealKey}
        visualScrollable
        visual={<>
          <header className="phrase-heading">
            <p className="phrase-kicker">Reading rehearsal</p>
            <h3>{config.title}</h3>
            <p>Keep the original nearby while you check and plan the practice copy.</p>
          </header>
          <section className="phrase-source-card" role="region" aria-label="Original passage">
            <h4>Original passage</h4>
            <p>{config.source}</p>
          </section>
          {!repaired ? (
            <section className="phrase-practice-card" role="region" aria-label="Practice copy with a changed word">
              <h4>Practice copy with a changed word</h4>
              <p className="phrase-copy phrase-word-picker">
                {changedSource.map((word, index) => (
                  <button
                    type="button"
                    key={`${word}-${index}`}
                    aria-label={`Select practice word ${word}`}
                    aria-pressed={selectedWord === index}
                    onClick={() => selectPracticeWord(index)}
                  >
                    {word}
                    <span aria-hidden="true">{selectedWord === index ? ' ●' : ''}</span>{' '}
                  </button>
                ))}
              </p>
            </section>
          ) : (
            <section className="phrase-practice-card" role="region" aria-label="Corrected practice copy">
              <h4>Corrected practice copy</h4>
              <p className="phrase-copy phrase-boundary-plan">
                {originalWords.map((word, index) => index < originalWords.length - 1 ? (
                  <button
                    type="button"
                    key={`${word}-${index}`}
                    className="phrase-boundary-control"
                    aria-label={`${pauseAfter.includes(index) ? 'Remove' : 'Add'} phrase boundary after “${word}” (word ${index + 1})`}
                    aria-pressed={pauseAfter.includes(index)}
                    onClick={() => toggleBoundary(index)}
                  >
                    <span>{word}</span>
                    <span className="phrase-boundary-mark" aria-hidden="true">{pauseAfter.includes(index) ? ' /' : ''}</span>{' '}
                  </button>
                ) : <span className="phrase-final-word" key={`${word}-${index}`}>{word} </span>)}
              </p>
            </section>
          )}
          {preview && previewIndex !== null ? (
            <section className="phrase-preview" role="region" aria-label="Phrase preview">
              <p className="phrase-preview-count">Group {previewIndex + 1} of {groups.length}</p>
              <p data-testid="active-phrase">{preview.join(' ')}</p>
              <p>Highlighting moves only when you use the phrase controls.</p>
            </section>
          ) : null}
        </>}
      >
        <section className="phrase-task">
          <h4>1 · Repair the changed word</h4>
          {!repaired ? <>
            <p>Select the word that differs from the original. Type the original word, then check your written repair.</p>
            <p className="phrase-selection-record">{selectedWord === null ? 'No practice word selected yet.' : `Selected word: ${changedSource[selectedWord]}`}</p>
            <label className="phrase-repair-label">
              Word from the original
              <input
                type="text"
                value={repairDraft}
                disabled={selectedWord === null}
                onChange={event => setRepairDraft(event.target.value)}
                autoComplete="off"
              />
            </label>
            <button type="button" disabled={selectedWord === null || !repairDraft.trim()} onClick={checkRepair}>Check repair</button>
            <p className="phrase-honesty-note">This checks the written copy. Read silently or aloud on your own.</p>
          </> : <p>Written repair complete. The original still shows the source text.</p>}
          <ol className="phrase-feedback-history" aria-label="Repair feedback history" aria-live="polite">
            {repairFeedback.map((message, index) => <li key={`${message}-${index}`} data-outcome={message.startsWith('Compare') ? 'retry' : 'correct'}>{message}</li>)}
          </ol>
        </section>

        {repaired ? <section className="phrase-task" data-activity-reveal>
          <h4>2 · Mark useful word groups</h4>
          <p>Use words in the corrected copy to add or remove pauses. Your plan is exploratory and is not graded.</p>
          <p aria-label="Phrase plan">{pauseAfter.length} learner-chosen pause{pauseAfter.length === 1 ? '' : 's'}.</p>
          <div className="phrase-action-row">
            <button type="button" disabled={pauseAfter.length === 0} onClick={startPreview}>Preview my phrase groups</button>
            <button type="button" disabled={pauseAfter.length === 0} onClick={() => setShowSample(value => !value)} aria-pressed={showSample}>Show one sample plan</button>
          </div>
          {showSample ? <p className="phrase-sample">Sample only: Before the rain began, / Isla carried the seedlings along the winding path. / Move your own pauses where the ideas connect for you.</p> : null}
          <ol className="phrase-feedback-history" aria-label="Phrase-plan feedback" aria-live="polite">
            {phraseFeedback.map((message, index) => <li key={`${message}-${index}`}>{message}</li>)}
          </ol>
          {previewIndex !== null ? <div className="phrase-preview-controls">
            <button type="button" disabled={previewIndex === 0} onClick={() => {
              setPreviewIndex(index => Math.max(0, (index ?? 0) - 1));
              onEvent({ type: 'interaction', action: 'preview' });
            }}>Previous phrase</button>
            <button type="button" disabled={previewIndex >= groups.length - 1} onClick={() => {
              setPreviewIndex(index => Math.min(groups.length - 1, (index ?? 0) + 1));
              onEvent({ type: 'interaction', action: 'preview' });
            }}>Next phrase</button>
          </div> : null}
        </section> : null}

        {previewIndex !== null ? <section className="phrase-task" data-activity-reveal>
          <h4>3 · Connect the words to meaning</h4>
          <fieldset>
            <legend>{config.meaningPrompt}</legend>
            <div className="phrase-choice-list">
              {config.meaningChoices.map(choice => <button
                type="button"
                key={choice.id}
                aria-label={`Choose meaning: ${choice.text}`}
                aria-pressed={meaningChoice === choice.id}
                onClick={() => reviseMeaning('choice', choice.id)}
              >
                {choice.text}<span>{meaningChoice === choice.id ? '● Selected' : '○ Choose'}</span>
              </button>)}
            </div>
          </fieldset>
          <fieldset>
            <legend>Which sentence supports your answer?</legend>
            <div className="phrase-choice-list phrase-evidence-list">
              {evidenceSentences.map((sentence, index) => <button
                type="button"
                key={`${sentence}-${index}`}
                aria-label={`Choose evidence: ${sentence}`}
                aria-pressed={meaningEvidence === sentence}
                onClick={() => reviseMeaning('evidence', sentence)}
              >
                “{sentence}”<span>{meaningEvidence === sentence ? '● Selected evidence' : '○ Choose evidence'}</span>
              </button>)}
            </div>
          </fieldset>
          <p className="phrase-selected-evidence" aria-label="Selected evidence">
            {meaningEvidence ? <>Selected evidence: “{meaningEvidence}”</> : 'Selected evidence: none yet.'}
          </p>
          <button type="button" onClick={checkMeaning}>Check meaning</button>
          <ol className="phrase-feedback-history" aria-label="Meaning feedback history" aria-live="polite">
            {meaningFeedback.map((message, index) => <li key={`${message}-${index}`} data-outcome={message === meaningSuccess ? 'correct' : 'retry'}>{message}</li>)}
          </ol>
        </section> : null}

        {meaningChecked ? <section className="phrase-task phrase-reflections" data-activity-reveal>
          <h4>4 · Reflect after your reread</h4>
          <p>Choose the statement that best describes your own practice. These reflections are not a voice or pace score.</p>
          {(['accuracy', 'pace', 'meaning'] as const).map(kind => <fieldset key={kind}>
            <legend>{kind[0].toUpperCase() + kind.slice(1)} reflection</legend>
            {reflectionOptions[kind].map(option => <label key={option}>
              <input
                type="radio"
                name={`${kind}-${attempt}`}
                checked={reflections[kind] === option}
                onChange={() => chooseReflection(kind, option)}
              />
              <span>{option}</span>
            </label>)}
          </fieldset>)}
          <label className="phrase-reread-check">
            <input
              type="checkbox"
              checked={rereadAcknowledged}
              onChange={event => {
                setRereadAcknowledged(event.target.checked);
                setFinished(false);
                onEvent({ type: 'interaction', action: 'reflect' });
              }}
            />
            <span>I reread the passage on my own, silently or aloud.</span>
          </label>
          <button type="button" disabled={!reflectionReady || finished} onClick={finish}>Finish reflection</button>
          {finished ? <p className="phrase-complete" role="status">Practice and reflection complete.</p> : null}
        </section> : null}

        <button type="button" className="phrase-reset" onClick={reset}>Start over</button>
      </ActivityWorkbench>
    </section>
  );
}

export default function PhrasePathfinder(props: PhrasePathfinderProps) {
  return <PhrasePathfinderExperience key={JSON.stringify(props.config)} {...props} />;
}
