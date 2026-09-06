import { useEffect, useRef, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Action = 'increase-value' | 'decrease-value' | 'reset';

function emptyValues(categories: readonly string[]): Record<string, number> {
  return Object.fromEntries(categories.map((category) => [category, 0]));
}

function scaleTicks(maximum: number, step = maximum <= 10 ? 1 : maximum <= 25 ? 5 : 10): number[] {
  const ticks = Array.from({ length: Math.floor(maximum / step) + 1 }, (_, index) => index * step);
  const last = ticks[ticks.length - 1];
  return last === maximum ? ticks.reverse() : [maximum, ...ticks.reverse()];
}

export default function DataPlotBuilder({ config, onEvent }: WidgetProps<'data-plot-builder'>) {
  const key = JSON.stringify(config);
  const needsDecisions = Boolean(config.displayChoices);
  const displayChoices = config.displayChoices ?? [config.kind];
  const [values, setValues] = useState<Record<string, number>>(() => emptyValues(config.categories));
  const [displaySelection, setDisplaySelection] = useState<'bar' | 'dot'>(() => config.kind);
  const [displayConfirmed, setDisplayConfirmed] = useState(!needsDecisions);
  const [title, setTitle] = useState('');
  const [titleConfirmed, setTitleConfirmed] = useState(!needsDecisions);
  const [labelsConfirmed, setLabelsConfirmed] = useState(!needsDecisions);
  const [scaleSelection, setScaleSelection] = useState<number | null>(() => needsDecisions ? null : 1);
  const [scaleConfirmed, setScaleConfirmed] = useState(!needsDecisions);
  const milestoneSent = useRef(false);
  const { completed, completeOnce } = useCompletionLatch(key);
  const maximumTarget = Math.max(1, ...config.categories.map((category) => config.target[category]));
  const scale = scaleSelection ?? 1;
  const maximum = Math.max(1, Math.ceil(Math.max(maximumTarget, ...Object.values(values)) / scale) * scale);
  const exact = (next: Record<string, number>) => config.categories.every((category) => next[category] === config.target[category]);
  const matchesCurrentTarget = exact(values);
  const setupComplete = displayConfirmed && titleConfirmed && labelsConfirmed && scaleConfirmed;
  const visiblyComplete = completed && matchesCurrentTarget && setupComplete && displaySelection === config.kind;
  const categoryTrackWidth = config.categories.length * 7;

  useEffect(() => {
    setValues(emptyValues(config.categories));
    setDisplaySelection(config.kind);
    setDisplayConfirmed(!Boolean(config.displayChoices));
    setTitle('');
    setTitleConfirmed(!Boolean(config.displayChoices));
    setLabelsConfirmed(!Boolean(config.displayChoices));
    setScaleSelection(config.displayChoices ? null : 1);
    setScaleConfirmed(!Boolean(config.displayChoices));
    milestoneSent.current = false;
  }, [key]);

  const confirmDisplay = () => {
    if (displaySelection !== config.kind) {
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }
    setDisplayConfirmed(true);
    onEvent({ type: 'coach', cue: 'strategy' });
  };

  const confirmTitle = () => {
    if (!title.trim()) {
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }
    setTitleConfirmed(true);
    onEvent({ type: 'coach', cue: 'strategy' });
  };

  const confirmLabels = () => {
    setLabelsConfirmed(true);
    onEvent({ type: 'coach', cue: 'strategy' });
  };

  const confirmScale = () => {
    if (scaleSelection === null) {
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }
    setScaleConfirmed(true);
    onEvent({ type: 'coach', cue: 'strategy' });
  };

  const commit = (next: Record<string, number>, action: Action) => {
    if (!setupComplete) return;
    const previousDistance = config.categories.reduce((distance, category) => distance + Math.abs(values[category] - config.target[category]), 0);
    const nextDistance = config.categories.reduce((distance, category) => distance + Math.abs(next[category] - config.target[category]), 0);
    setValues(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { values: next } });
    if (!exact(next) && nextDistance < previousDistance && !milestoneSent.current) {
      milestoneSent.current = true;
      onEvent({ type: 'coach', cue: 'milestone' });
    } else if (!exact(next) && nextDistance >= previousDistance && nextDistance !== previousDistance) {
      onEvent({ type: 'coach', cue: 'retry' });
    }
    if (exact(next)) completeOnce(() => onEvent({ type: 'complete', value: { values: next } }));
  };

  const plotKind = displaySelection ?? config.kind;
  const chartLabel = needsDecisions
    ? `${plotKind === 'bar' ? 'Bar' : 'Dot'} plot${title.trim() ? ` titled ${title.trim()}` : ''} with labeled categories, a shared zero baseline, and integer scale from 0 to ${maximum}. ${config.categories.map((category) => `${category}: ${values[category]}.`).join(' ')}`
    : `${plotKind === 'bar' ? 'Bar' : 'Dot'} plot with a shared zero baseline and integer scale from 0 to ${maximum}. ${config.categories.map((category) => `${category}: ${values[category]}.`).join(' ')}`;
  const sourceData = config.sourceData ?? config.target;
  const scaleOptions = [1, 2, 5].filter((option) => option <= Math.max(5, maximumTarget));

  return (
    <section
      className="card widget-experiment data-plot"
      data-testid="widget-data-plot-builder"
      data-state={visiblyComplete ? 'complete' : 'building'}
      data-complete={visiblyComplete ? 'yes' : 'no'}
    >
      <div className="widget-task" data-testid="widget-task">
        <strong>Goal:</strong> {config.taskPrompt ?? config.prompt}
        <span> Target display: {config.kind === 'bar' ? 'bar graph' : 'dot plot'}.</span>
      </div>
      <h3>{config.prompt}</h3>
      <p className="data-plot-instruction">Use the source table to make a truthful display. Decide the display, title, labels, and scale before placing any data.</p>
      <table data-testid="data-plot-source-data">
        <caption>Source data for this plot</caption>
        <thead><tr><th scope="col">Category</th><th scope="col">Count</th></tr></thead>
        <tbody>{config.categories.map((category) => <tr key={category}><th scope="row">{category}</th><td>{sourceData[category]}</td></tr>)}</tbody>
      </table>
      {needsDecisions && (
        <div className="data-plot-setup" data-testid="data-plot-setup">
          <fieldset className="data-plot-decision" disabled={displayConfirmed}>
            <legend>1. Choose the display</legend>
            <div className="data-plot-choice-row">
              {displayChoices.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  aria-pressed={displaySelection === choice}
                  aria-label={choice === 'bar' ? 'Bar graph' : 'Dot plot'}
                  onClick={() => setDisplaySelection(choice)}
                >
                  {choice === 'bar' ? 'Bar graph' : 'Dot plot'}
                </button>
              ))}
            </div>
            <button type="button" onClick={confirmDisplay}>Confirm display</button>
          </fieldset>
          <fieldset className="data-plot-decision" disabled={!displayConfirmed || titleConfirmed}>
            <legend>2. Give the graph a title</legend>
            <label htmlFor="data-plot-title">Graph title</label>
            <input id="data-plot-title" value={title} onChange={(event) => setTitle(event.target.value)} />
            <button type="button" onClick={confirmTitle}>Confirm title</button>
          </fieldset>
          <fieldset className="data-plot-decision" disabled={!titleConfirmed || labelsConfirmed}>
            <legend>3. Confirm the labels</legend>
            <p>Category labels: {config.categories.join(', ')}</p>
            <button type="button" onClick={confirmLabels}>Confirm category labels</button>
          </fieldset>
          <fieldset className="data-plot-decision" disabled={!labelsConfirmed || scaleConfirmed}>
            <legend>4. Choose an even scale</legend>
            <div className="data-plot-choice-row">
              {scaleOptions.map((option) => (
                <button key={option} type="button" aria-pressed={scaleSelection === option} aria-label={`Scale ${option}`} onClick={() => setScaleSelection(option)}>
                  Scale {option}
                </button>
              ))}
            </div>
            <button type="button" onClick={confirmScale}>Confirm scale</button>
          </fieldset>
          <p className="data-plot-decisions" data-testid="data-plot-decisions">
            {displayConfirmed && `Display: ${plotKind === 'bar' ? 'Bar graph' : 'Dot plot'}. `}
            {titleConfirmed && `Title: ${title || 'Untitled graph'}. `}
            {labelsConfirmed && `Labels: ${config.categories.join(', ')}. `}
            {scaleConfirmed && `Scale ${scale}.`}
          </p>
        </div>
      )}
      <div className="data-plot-controls" aria-label="Plot value controls">
        {config.categories.map((category) => (
          <section className="data-plot-control" key={category} aria-label={`${category} controls`}>
            <h4>{category}</h4>
            <p>Current value: <strong>{values[category]}</strong></p>
            <div>
              <button
                aria-label={`Decrease ${category}`}
                disabled={!setupComplete || values[category] === 0}
                onClick={() => commit({ ...values, [category]: values[category] - 1 }, 'decrease-value')}
              >
                −
              </button>
              <button
                aria-label={`Increase ${category}`}
                disabled={!setupComplete || values[category] === 50}
                onClick={() => commit({ ...values, [category]: values[category] + 1 }, 'increase-value')}
              >
                +
              </button>
            </div>
          </section>
        ))}
      </div>
      <div className="data-plot-viewport" role="region" aria-label="Scrollable data plot" tabIndex={0}>
        <div
          className="data-plot-chart"
          data-testid="data-plot-chart"
          role="img"
          aria-label={chartLabel}
          style={{ gridTemplateColumns: `2.5rem minmax(${categoryTrackWidth}rem, 1fr)` }}
        >
          <div className="data-plot-scale" aria-label={`Integer scale from 0 to ${maximum}`}>
            {scaleTicks(maximum, scale).map((tick) => <span className="data-plot-scale-label" key={tick}>{tick}</span>)}
          </div>
          <div
            className="data-plot-columns"
            data-testid="data-plot-columns"
            data-kind={plotKind}
            style={{ gridTemplateColumns: `repeat(${config.categories.length}, minmax(7rem, 1fr))` }}
          >
            {config.categories.map((category) => {
              const value = values[category];
              return (
                <div className="data-plot-column" key={category}>
                  <div className="data-plot-mark-area">
                    {plotKind === 'bar' ? (
                      <div
                        className="data-plot-bar"
                        data-testid={`bar-${category}`}
                        data-value={value}
                        style={{ height: value === 0 ? '0%' : `${(value / maximum) * 100}%` }}
                        aria-hidden="true"
                      />
                    ) : (
                      <div className="data-plot-dots" aria-hidden="true">
                        {Array.from({ length: value }, (_, index) => (
                          <span className="data-plot-dot" data-testid={`dot-${category}`} key={index}>●</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="data-plot-category">{category}</p>
                </div>
              );
            })}
            <div className="data-plot-baseline" data-testid="data-plot-baseline" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="data-plot-values" aria-label="Current plot values">
        {config.categories.map((category) => <p key={category}>{category}: {values[category]}</p>)}
      </div>
      <button className="data-plot-reset" onClick={() => commit(emptyValues(config.categories), 'reset')}>Start over</button>
      <p role="status">{visiblyComplete ? 'Plot matches the target.' : 'Adjust the plot values.'}</p>
    </section>
  );
}
