import { useId, useRef, useState, type ReactNode } from 'react';
import type { HistoryBase, HistoryEvent } from '../../content/social-studies/history-schema';
import { ActivityWorkbench } from '../ActivityWorkbench';
import './history.css';

export type HistoryWidgetProps<Config> = {
  config: Config;
  onEvent: (event: HistoryEvent | { type: 'coach'; cue: 'strategy' | 'retry' | 'milestone' }) => void;
};
export type HistoryItem = { id: string; title: string; detail?: string; year?: number; sourceId: string; targetId: string };
export type HistoryTarget = { id: string; label: string; detail?: string; sourceId?: string };
type Placements = Record<string, string>;
export type HistoryActivityProps = HistoryWidgetProps<HistoryBase> & {
  type: 'history-timeline' | 'history-map' | 'history-evidence-board' | 'history-cause-effect';
  items: HistoryItem[];
  targets: HistoryTarget[];
  surfaceLabel: string;
  instruction: string;
  retryHint: string;
  map?: (placements: Placements) => ReactNode;
};
type Feedback = { outcome: 'correct' | 'retry' | 'neutral'; text: string };

function HistoryActivityRun({ config, onEvent, type, items, targets, surfaceLabel, instruction, retryHint, map }: HistoryActivityProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Placements>({});
  const [feedback, setFeedback] = useState<Record<string, Feedback>>({});
  const [explanationId, setExplanationId] = useState<string | null>(null);
  const [explanationFeedback, setExplanationFeedback] = useState<Feedback | null>(null);
  const [announcement, setAnnouncement] = useState('Read the sources, then select a card.');
  const firstControl = useRef<HTMLButtonElement>(null);
  const revision = useRef(0);
  const completedRevision = useRef<number | null>(null);
  const sourcePrefix = useId();
  const sourceName = (sourceId: string) => config.sources.find(source => source.id === sourceId)?.title;
  const allCorrect = items.every(item => placements[item.id] === item.targetId);
  const complete = allCorrect && explanationId === config.explain.correctChoiceId;

  function select(itemId: string) {
    if (selectedId === itemId) return;
    setSelectedId(itemId);
    onEvent({ type: 'interaction', action: 'select' });
    setAnnouncement('Card selected. Choose where to place it.');
  }

  function place(targetId: string) {
    const item = items.find(candidate => candidate.id === selectedId);
    if (!item || placements[item.id] === targetId) return;
    const next: Placements = { ...placements };
    const nextFeedback = { ...feedback };
    if (type === 'history-timeline') {
      for (const [otherId, position] of Object.entries(next)) {
        if (position === targetId && otherId !== item.id) {
          delete next[otherId];
          nextFeedback[otherId] = { outcome: 'neutral', text: `${items.find(candidate => candidate.id === otherId)?.title} returned to the card bank. Choose a new position for it.` };
        }
      }
    }
    next[item.id] = targetId;
    const correct = item.targetId === targetId;
    const destination = targets.find(target => target.id === targetId)!;
    const text = correct
      ? `Correct: “${item.title}” fits “${destination.label}.” Keep its source in view as you compare.`
      : `Try again: “${item.title}” does not fit “${destination.label}.” ${retryHint}`;
    nextFeedback[item.id] = { outcome: correct ? 'correct' : 'retry', text };
    setPlacements(next);
    setFeedback(nextFeedback);
    revision.current += 1;
    setExplanationId(null);
    if (explanationFeedback) setExplanationFeedback({ outcome: 'neutral', text: 'Your construction changed. Check the connections, then choose an explanation again.' });
    setAnnouncement(correct ? 'Placement fits. Compare the construction with the sources.' : `Try again. ${retryHint}`);
    onEvent({ type: 'interaction', action: 'place' });
    onEvent({ type: 'change', value: { placements: next } });
    onEvent({ type: 'coach', cue: !correct ? 'retry' : items.every(candidate => next[candidate.id] === candidate.targetId) ? 'milestone' : 'strategy' });
  }

  function explain(choiceId: string) {
    if (!allCorrect || choiceId === explanationId) return;
    const correct = choiceId === config.explain.correctChoiceId;
    const text = correct
      ? `Correct: ${config.explain.explanation}`
      : 'Try again: compare your construction with the source summaries. Which explanation uses that evidence?';
    setExplanationId(choiceId);
    setExplanationFeedback({ outcome: correct ? 'correct' : 'retry', text });
    setAnnouncement(correct ? 'Your construction and explanation fit the sources.' : text);
    onEvent({ type: 'interaction', action: 'explain' });
    if (!correct) onEvent({ type: 'coach', cue: 'retry' });
    if (correct && completedRevision.current !== revision.current) {
      completedRevision.current = revision.current;
      onEvent({ type: 'complete', value: { explanationId: choiceId } });
    }
  }

  function reset() {
    setSelectedId(null);
    setPlacements({});
    setFeedback({});
    setExplanationId(null);
    setExplanationFeedback(null);
    revision.current += 1;
    setAnnouncement('Activity reset. Read the sources, then select a card.');
    onEvent({ type: 'interaction', action: 'reset' });
    onEvent({ type: 'change', value: { placements: {} } });
    firstControl.current?.focus({ preventScroll: true });
  }

  const construction = <section role="region" aria-label={surfaceLabel} className={`history-construction ${type}`}>
    <h4>{surfaceLabel}</h4>
    {map?.(placements)}
    <ol className="history-destinations">
      {targets.map((target, index) => {
        const attached = items.filter(item => placements[item.id] === target.id);
        return <li key={target.id} className="history-destination">
          <div className="history-target-heading">
            <span className="history-target-number" aria-hidden="true">{index + 1}</span>
            <h5>{target.label}</h5>
          </div>
          {target.detail && <p className="history-place-detail">{target.detail}</p>}
          {target.sourceId && <p className="history-source-tag">Source: {sourceName(target.sourceId)}</p>}
          {type === 'history-cause-effect' && <p className="history-connection-arrow"><span aria-hidden="true">↓ </span>Helped lead to</p>}
          <div className="history-attached">
            {attached.length ? attached.map(item => <article key={item.id} className="history-attached-card">
              {item.year !== undefined && <span className="history-year">{item.year}</span>}
              <p>{item.title}</p>
              {item.detail && <p>{item.detail}</p>}
              <p className="history-source-tag">Source: {sourceName(item.sourceId)}</p>
            </article>) : <p className="history-empty">{type === 'history-cause-effect' ? 'Attach an effect here.' : 'Place a card here.'}</p>}
          </div>
        </li>;
      })}
    </ol>
  </section>;

  return <section className="card widget-experiment activity-shell history-activity" data-testid={`widget-${type}`} data-state={complete ? 'complete' : allCorrect ? 'explaining' : 'building'}>
    <ActivityWorkbench label={config.title} visualScrollable revealKey={allCorrect ? 'explain' : 'build'} visual={<>
      <header className="history-header"><p className="history-kicker">Investigate the past</p><h3>{config.title}</h3></header>
      {construction}
      <section className="history-sources" aria-label="Historical sources">
        <h4>Keep the sources in view</h4>
        {config.sources.map(source => <article className="history-source" key={source.id} id={`${sourcePrefix}-${source.id}`}>
          <h5>{source.title}</h5><p className="history-source-text">{source.text}</p>
          <p className="history-source-attribution">{source.attribution}</p>
          <a href={source.url} target="_blank" rel="noreferrer">Open reference: {source.title}</a>
        </article>)}
      </section>
    </>}>
      <p className="history-question">{config.prompt}</p>
      <fieldset className="history-task"><legend>1. Select a source card</legend><p>{instruction}</p>
        <div className="history-card-bank">
          {items.map((item, index) => <button type="button" className="history-choice" key={item.id}
            ref={index === 0 ? firstControl : undefined} data-activity-first-control={index === 0 ? '' : undefined}
            aria-label={`Select ${item.title}`} aria-describedby={`${sourcePrefix}-card-${item.id}`} aria-pressed={selectedId === item.id} onClick={() => select(item.id)}>
            <span id={`${sourcePrefix}-card-${item.id}`} className="history-card-detail">
              {item.year !== undefined && <span className="history-year">{item.year}</span>}
              <strong>{item.title}</strong>{item.detail && <span>{item.detail}</span>}
            </span>
            <span className="history-source-tag">Source: {sourceName(item.sourceId)}</span>
            <span className="history-card-state">{selectedId === item.id ? '● Selected — choose a place' : placements[item.id] ? `Placed: ${targets.find(target => target.id === placements[item.id])?.label}. Select to move.` : '○ Select card'}</span>
          </button>)}
        </div>
      </fieldset>
      <fieldset className="history-task"><legend>2. Build the connections</legend>
        <p>{selectedId ? `Place: ${items.find(item => item.id === selectedId)?.title}` : 'Select a card above to choose its place.'}</p>
        <div className="history-target-controls">{targets.map((target, index) => <button type="button" className="history-choice" key={target.id} disabled={!selectedId}
          aria-label={`Place selected card: ${target.label}`} onClick={() => place(target.id)}><span>{index + 1}. {target.label}</span></button>)}</div>
      </fieldset>
      <section className="history-feedback" aria-label="Placement feedback"><h4>Placement notes</h4>
        {Object.keys(feedback).length ? <ul>{items.filter(item => feedback[item.id]).map(item => <li key={item.id} data-outcome={feedback[item.id]!.outcome}>{feedback[item.id]!.text}</li>)}</ul> : <p>Your notes appear after you place a card.</p>}
      </section>
      <p className="history-progress">{items.filter(item => placements[item.id] === item.targetId).length} of {items.length} cards fit the sources.</p>
      {allCorrect ? <fieldset className="history-task" data-activity-reveal><legend>3. Explain with evidence</legend>
        <p>{config.explain.prompt}</p>
        <div className="history-card-bank">{config.explain.choices.map(choice => <button type="button" className="history-choice" key={choice.id}
          aria-pressed={explanationId === choice.id} onClick={() => explain(choice.id)}>{choice.text}</button>)}</div>
      </fieldset> : <p className="history-explain-lock">Build all the connections using the sources. Then explain what they show.</p>}
      {explanationFeedback && <section className="history-feedback" aria-label="Explanation feedback" data-outcome={explanationFeedback.outcome}>
        <h4>Your explanation</h4><p>{explanationFeedback.text}</p>
      </section>}
      <button type="button" className="history-reset" onClick={reset}>Start over</button>
      <p className="history-announcement" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
    </ActivityWorkbench>
  </section>;
}

export function HistoryActivity(props: HistoryActivityProps) {
  return <HistoryActivityRun key={JSON.stringify({ config: props.config, items: props.items, targets: props.targets })} {...props} />;
}
