import { ActivityWorkbench } from '../ActivityWorkbench';
import './guide-led-math.css';
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
  const [displayChosen, setDisplayChosen] = useState(false);
  const [setupFeedback, setSetupFeedback] = useState('');
  const [graphChecked, setGraphChecked] = useState<boolean | null>(null);
  const [comparison, setComparison] = useState('');
  const [comparisonChecked, setComparisonChecked] = useState<number | null>(null);
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
  const rankedCategories = [...config.categories].sort((a, b) => config.target[b] - config.target[a]);
  const largest = rankedCategories[0]!; const smallest = rankedCategories[rankedCategories.length - 1]!;
  const difference = config.target[largest] - config.target[smallest];
  const visiblyComplete = completed && matchesCurrentTarget && setupComplete && displaySelection === config.kind && (!needsDecisions || comparisonChecked === difference);
  const categoryTrackWidth = config.categories.length * 4;

  useEffect(() => {
    setValues(emptyValues(config.categories)); setDisplayChosen(false); setSetupFeedback(''); setGraphChecked(null); setComparison(''); setComparisonChecked(null);
    setDisplaySelection(config.kind);
    setDisplayConfirmed(!Boolean(config.displayChoices));
    setTitle('');
    setTitleConfirmed(!Boolean(config.displayChoices));
    setLabelsConfirmed(!Boolean(config.displayChoices));
    setScaleSelection(config.displayChoices ? null : 1);
    setScaleConfirmed(!Boolean(config.displayChoices));
    milestoneSent.current = false;
  }, [key]);

  const chooseDisplay = (choice: 'bar' | 'dot') => {
    setDisplaySelection(choice);
    setDisplayChosen(true);
    if (choice !== config.kind) {
      setSetupFeedback('Try again. Choose the display requested by the problem.');
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }
    setSetupFeedback('Display choice saved. Add a title that describes the data.');
    setDisplayConfirmed(true);
    onEvent({ type: 'coach', cue: 'strategy' });
  };

  const confirmTitle = () => {
    if (!title.trim()) {
      setSetupFeedback('Add a title that tells what these counts describe.');
      onEvent({ type: 'coach', cue: 'retry' });
      return;
    }
    setSetupFeedback('Title saved. The source categories will label your graph.');
    setTitleConfirmed(true);
    onEvent({ type: 'coach', cue: 'strategy' });
  };

  const confirmLabels = () => {
    setSetupFeedback('Category labels added to the graph. Now choose equal steps for the scale.');
    setLabelsConfirmed(true);
    onEvent({ type: 'coach', cue: 'strategy' });
  };

  const chooseScale = (option: number) => {
    setScaleSelection(option);
    setSetupFeedback('Scale saved. Build each bar from its source count.');
    setScaleConfirmed(true);
    onEvent({ type: 'coach', cue: 'strategy' });
  };

  const commit = (next: Record<string, number>, action: Action) => {
    if (action === 'reset') {
      setValues(emptyValues(config.categories)); setDisplayChosen(false); setDisplaySelection(config.kind); setDisplayConfirmed(!needsDecisions); setTitle(''); setTitleConfirmed(!needsDecisions); setLabelsConfirmed(!needsDecisions); setScaleSelection(needsDecisions ? null : 1); setScaleConfirmed(!needsDecisions); setSetupFeedback(''); setGraphChecked(null); setComparison(''); setComparisonChecked(null); milestoneSent.current = false;
      onEvent({ type: 'interaction', action: 'reset' }); onEvent({ type: 'change', value: { values: emptyValues(config.categories) } }); return;
    }
    if (!setupComplete) return;
    const previousDistance = config.categories.reduce((distance, category) => distance + Math.abs(values[category] - config.target[category]), 0);
    const nextDistance = config.categories.reduce((distance, category) => distance + Math.abs(next[category] - config.target[category]), 0);
    setValues(next); setComparisonChecked(null);
    if (graphChecked !== null) setGraphChecked(null);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { values: next } });
    if (!exact(next) && nextDistance < previousDistance && !milestoneSent.current) {
      milestoneSent.current = true;
      onEvent({ type: 'coach', cue: 'milestone' });
    }
    if (exact(next) && !needsDecisions) completeOnce(() => onEvent({ type: 'complete', value: { values: next } }));
  };

  const plotKind = displaySelection ?? config.kind;
  const chartLabel = needsDecisions
    ? `${plotKind === 'bar' ? 'Bar' : 'Dot'} plot${title.trim() ? ` titled ${title.trim()}` : ''} with labeled categories, a shared zero baseline, and integer scale from 0 to ${maximum}. ${config.categories.map((category) => `${category}: ${values[category]}.`).join(' ')}`
    : `${plotKind === 'bar' ? 'Bar' : 'Dot'} plot with a shared zero baseline and integer scale from 0 to ${maximum}. ${config.categories.map((category) => `${category}: ${values[category]}.`).join(' ')}`;
  const sourceData = config.sourceData ?? config.target;
  const scaleOptions = [1, 2, 5].filter((option) => option <= Math.max(5, maximumTarget));

  return (
    <section
      className="card widget-experiment data-plot activity-shell math-activity"
      data-testid="widget-data-plot-builder"
      data-state={visiblyComplete ? 'complete' : 'building'}
      data-complete={visiblyComplete ? 'yes' : 'no'}
    >
<ActivityWorkbench label="Build a graph from data" revealKey={graphChecked ? "compare" : setupComplete ? "build" : labelsConfirmed ? "scale" : titleConfirmed ? "labels" : displayConfirmed ? "title" : "display"} visual={<><div className="widget-task" data-testid="widget-task">
        <strong>Goal:</strong> {config.taskPrompt ?? config.prompt}
      </div>
{titleConfirmed && title && <h3>{title}</h3>}
<p className="data-plot-instruction">Match the bar heights to the source counts.</p>
<table data-testid="data-plot-source-data">
        <caption>Source data for this plot</caption>
        <thead><tr><th scope="col">Category</th><th scope="col">Count</th></tr></thead>
        <tbody>{config.categories.map((category) => <tr key={category}><th scope="row">{category}</th><td>{sourceData[category]}</td></tr>)}</tbody>
      </table>
<div className="data-plot-viewport" role="region" aria-label="Scrollable data plot" tabIndex={0}>
        <div
          className="data-plot-chart"
          data-testid="data-plot-chart"
          data-compact={config.categories.length <= 3}
          role="img"
          aria-label={chartLabel}
          style={{ gridTemplateColumns: `2.5rem minmax(${categoryTrackWidth}rem, 1fr)` }}
        >
          <div className="data-plot-scale" aria-label={`Integer scale from 0 to ${maximum}`}>
            {scaleTicks(maximum, scale).map((tick) => <span className="data-plot-scale-label" key={tick} style={{ top: `${(1 - tick / maximum) * 100}%` }}>{tick}</span>)}
          </div>
          <div
            className="data-plot-columns"
            data-testid="data-plot-columns"
            data-kind={plotKind}
            style={{ gridTemplateColumns: `repeat(${config.categories.length}, minmax(4rem, 1fr))` }}
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
                  <p className="data-plot-category">{labelsConfirmed ? category : "Label waiting"}</p>
                </div>
              );
            })}
            <div className="data-plot-baseline" data-testid="data-plot-baseline" aria-hidden="true" />
          </div>
        </div>
      </div>
<div className="data-plot-values" aria-label="Current plot values">
        {config.categories.map((category) => <p key={category}>{category}: {values[category]}</p>)}
      </div></>}>
{needsDecisions && (
        <div className="data-plot-setup" data-testid="data-plot-setup">
          <fieldset className="data-plot-decision" disabled={displayConfirmed}>
            <legend>1. Choose the display</legend>
            <div className="data-plot-choice-row">
              {displayChoices.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  aria-pressed={displayChosen && displaySelection === choice}
                  aria-label={choice === 'bar' ? 'Bar graph' : 'Dot plot'}
                  onClick={() => chooseDisplay(choice)}
                >
                  {choice === 'bar' ? 'Bar graph' : 'Dot plot'}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="data-plot-decision" data-activity-reveal={displayConfirmed && !titleConfirmed ? "" : undefined} disabled={!displayConfirmed || titleConfirmed}>
            <legend>2. Give the graph a title</legend>
            <label htmlFor="data-plot-title">Graph title</label>
            <input id="data-plot-title" value={title} onChange={(event) => setTitle(event.target.value)} />
            <button type="button" onClick={confirmTitle}>Confirm title</button>
          </fieldset>
          <fieldset className="data-plot-decision" data-activity-reveal={titleConfirmed && !labelsConfirmed ? "" : undefined} disabled={!titleConfirmed || labelsConfirmed}>
            <legend>3. Confirm the labels</legend>
            <p>Category labels: {config.categories.join(', ')}</p>
            <button type="button" onClick={confirmLabels}>Confirm category labels</button>
          </fieldset>
          <fieldset className="data-plot-decision" data-activity-reveal={labelsConfirmed && !scaleConfirmed ? "" : undefined} disabled={!labelsConfirmed || scaleConfirmed}>
            <legend>4. Choose an even scale</legend>
            <div className="data-plot-choice-row">
              {scaleOptions.map((option) => (
                <button key={option} type="button" aria-pressed={scaleSelection === option} aria-label={`Scale ${option}`} onClick={() => chooseScale(option)}>
                  Scale {option}
                </button>
              ))}
            </div>
          </fieldset>
          <p className="data-plot-decisions" data-testid="data-plot-decisions">
            {displayConfirmed && `Display: ${plotKind === 'bar' ? 'Bar graph' : 'Dot plot'}. `}
            {titleConfirmed && `Title: ${title || 'Untitled graph'}. `}
            {labelsConfirmed && `Labels: ${config.categories.join(', ')}. `}
            {scaleConfirmed && `Scale ${scale}.`}
          </p>
        </div>
      )}
<p role="status" aria-label="Graph setup feedback">{setupFeedback}</p>
<div className="data-plot-controls" data-activity-reveal={setupComplete && !graphChecked ? "" : undefined} aria-label="Plot value controls">
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
<button className="data-plot-reset" onClick={() => commit(emptyValues(config.categories), 'reset')}>Start over</button>
<p role="status" aria-label="Plot build status">{visiblyComplete ? 'Plot matches the target.' : 'Adjust the plot values.'}</p>
{needsDecisions && <section className="math-task"><h4>Check the graph</h4><button type="button" disabled={!setupComplete} onClick={() => { setGraphChecked(matchesCurrentTarget); onEvent({ type: 'coach', cue: matchesCurrentTarget ? 'milestone' : 'retry' }); }}>Check my graph</button><p aria-label="Graph check feedback">{graphChecked === null ? 'Build the bars, then compare every height with the source table.' : graphChecked ? 'Your checked graph matches every source count.' : 'Try again. One or more bars differ from the source table. Check the category and its count.'}</p></section>}
{needsDecisions && graphChecked && <section className="math-task" data-activity-reveal><h4>Compare two bars</h4><p>How many more {largest} than {smallest}?</p><label>How many more?<input type="number" min="0" value={comparison} onChange={event => { setComparison(event.target.value); setComparisonChecked(null); }} /></label><button type="button" disabled={!comparison.trim()} onClick={() => { const answer = Number(comparison); setComparisonChecked(answer); if (answer === difference) completeOnce(() => onEvent({ type: 'complete', value: { values } })); else onEvent({ type: 'coach', cue: 'retry' }); }}>Check my comparison</button><p aria-label="Graph comparison feedback" role="status" data-outcome={comparisonChecked === null ? undefined : comparisonChecked === difference ? 'correct' : 'retry'}>{comparisonChecked === null ? 'Use the gap between the two bar heights.' : comparisonChecked === difference ? `Correct: ${config.target[largest]} − ${config.target[smallest]} = ${difference}. The bar-height gap represents that difference.` : 'Try again. Count from the shorter bar’s top to the taller bar’s top using the scale.'}</p></section>}
</ActivityWorkbench>
</section>
  );
}
