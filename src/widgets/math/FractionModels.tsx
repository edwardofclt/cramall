import { ActivityWorkbench } from '../ActivityWorkbench';
import './guide-led-math.css';
import { useEffect, useRef, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

const fractionText = (numerator: number, denominator: number) => `${numerator}/${denominator}`;

type FractionModelProps = {
  kind: 'bars' | 'circles';
  denominator: number;
  numerator: number;
  wholeCount?: number;
  label: string;
};

function FractionModel({ kind, denominator, numerator, wholeCount = 1, label }: FractionModelProps) {
  const wholes = Array.from({ length: wholeCount }, (_, wholeIndex) => {
    const shaded = wholeIndex < wholeCount - 1 ? denominator : numerator;
    const summary = `${shaded} shaded, ${denominator - shaded} unshaded`;
    const stateFor = (index: number) => index < shaded ? 'shaded' : 'unshaded';
    const sectorPath = (index: number) => {
      const start = (index / denominator) * Math.PI * 2 - Math.PI / 2;
      const end = ((index + 1) / denominator) * Math.PI * 2 - Math.PI / 2;
      const point = (angle: number) => [50 + 46 * Math.cos(angle), 50 + 46 * Math.sin(angle)];
      const [startX, startY] = point(start);
      const [endX, endY] = point(end);
      return `M 50 50 L ${startX} ${startY} A 46 46 0 0 1 ${endX} ${endY} Z`;
    };

    return (
      <div className="fraction-whole" data-testid="fraction-whole" data-whole-index={wholeIndex} key={wholeIndex}>
        {kind === 'bars' ? (
          <div className="fraction-bar-model" data-testid="fraction-bar-model" role="img" aria-label={`${label} fraction bar: ${summary}`}>
            {Array.from({ length: denominator }, (_, index) => (
              <span key={index} className="fraction-bar-segment" data-testid="fraction-bar-segment" data-state={stateFor(index)} aria-hidden="true" />
            ))}
          </div>
        ) : (
          <svg className="fraction-circle-model" data-testid="fraction-circle-model" role="img" aria-label={`${label} fraction circle: ${summary}`} viewBox="0 0 100 100">
            {Array.from({ length: denominator }, (_, index) => (
              <path key={index} className="fraction-circle-sector" data-testid="fraction-circle-sector" data-state={stateFor(index)} d={sectorPath(index)} />
            ))}
          </svg>
        )}
        <p className="fraction-model-summary">{summary}</p>
      </div>
    );
  });

  return <div className="fraction-view" data-testid="fraction-view" data-kind={kind}>{wholes}</div>;
}

function FairShareModel({ denominator, numerator, target, wholeUnits }: { denominator: number; numerator: number; target: number; wholeUnits: number }) {
  return (
    <div
      className="fair-share-model"
      data-testid="fair-share-model"
      data-equal={numerator === target ? 'yes' : 'no'}
      role="group"
      aria-label={`Fair sharing model: ${wholeUnits} whole units distributed among ${denominator} recipients; each receives ${numerator} of ${denominator} equal parts`}
    >
      <div className="math-share-source" aria-label="Source wholes">
        {Array.from({ length: wholeUnits }, (_, whole) => <div className="math-source-whole" key={whole} aria-label={`Whole ${whole + 1}`}>
          {Array.from({ length: denominator }, (_, part) => <span className="math-source-piece" data-shared={whole < numerator ? 'yes' : 'no'} key={part} />)}
        </div>)}
      </div>
      <p aria-label="Pieces left to share">{Math.max(0, (wholeUnits - numerator) * denominator)} equal pieces left to share.</p>
      <div className="fair-share-recipients">
        {Array.from({ length: denominator }, (_, recipientIndex) => (
          <div
            className="fair-share-recipient"
            data-testid="fair-share-recipient"
            data-recipient-index={recipientIndex}
            aria-label={`Learner ${recipientIndex + 1} receives ${numerator} of ${denominator} equal parts`}
            key={recipientIndex}
          >
            <strong>Learner {recipientIndex + 1}</strong>
            <div className="fair-share-units">
              {Array.from({ length: denominator }, (_, unitIndex) => (
                <span
                  className="fair-share-unit"
                  data-testid="fair-share-unit"
                  data-state={unitIndex < numerator ? 'distributed' : 'waiting'}
                  aria-hidden="true"
                  key={unitIndex}
                />
              ))}
            </div>
            <span className="fair-share-label">{numerator}/{denominator}</span>
          </div>
        ))}
      </div>
      <p data-testid="fair-share-state" role="status">
        {numerator === target
          ? `Each learner receives an equal ${numerator}/${denominator} share: ${wholeUnits} whole units are shared fairly.`
          : `${wholeUnits} whole units are cut into ${denominator} equal parts each. Distribute the same number to every learner: ${numerator} of ${denominator} so far.`}
      </p>
    </div>
  );
}

function FractionGroupsModel({ denominator, numerator }: { denominator: number; numerator: number }) {
  return (
    <div
      className="fraction-groups"
      data-testid="fraction-groups"
      role="img"
      aria-label={`${numerator} repeated groups of one ${fractionText(1, denominator)}`}
    >
      <p className="fraction-groups-equation">{numerator} × {fractionText(1, denominator)} = {fractionText(numerator, denominator)}</p>
      <div className="fraction-group-list">
        {Array.from({ length: numerator }, (_, groupIndex) => (
          <div className="fraction-group" data-testid="fraction-group" data-group-index={groupIndex} key={groupIndex}>
            <strong>Group {groupIndex + 1}</strong>
            <span className="fraction-group-boundary" aria-hidden="true">
              <span className="fraction-group-unit" />
            </span>
            <span>{fractionText(1, denominator)}</span>
          </div>
        ))}
      </div>
      <p>Each boundary contains one equal unit-fraction group.</p>
    </div>
  );
}

export default function FractionModels({ config, onEvent }: WidgetProps<'fraction-models'>) {
  const key = JSON.stringify(config);
  const wholeCount = config.wholeCount ?? 1;
  const initial = Math.min(config.numerator ?? 0, config.denominator);
  const [numerator, setNumerator] = useState(initial);
  const [acted, setActed] = useState(false);
  const milestoneSent = useRef(false);
  const { completed, completeOnce } = useCompletionLatch(key);
  const target = config.target ?? (config.task === 'equivalent' ? config.comparisonTarget : undefined);
  const comparisonTarget = config.comparisonTarget ?? (config.task === 'equivalent' ? config.target : undefined);
  const totalNumerator = (wholeCount - 1) * config.denominator + numerator;
  const totalTargetNumerator = target ? (wholeCount - 1) * target.denominator + target.numerator : undefined;
  const totalTargetDenominator = target?.denominator;
  const valuesEquivalent = (next: number) => Boolean(target) && (
    ((wholeCount - 1) * config.denominator + next) * totalTargetDenominator! === totalTargetNumerator! * config.denominator
  );

  useEffect(() => {
    setNumerator(initial); setActed(false);
    milestoneSent.current = false;
  }, [key, initial]);

  const matches = (next: number) => Boolean(target) && (
    config.allowEquivalent || config.task === 'equivalent'
      ? valuesEquivalent(next)
      : (wholeCount - 1) * config.denominator + next === totalTargetNumerator && config.denominator === target!.denominator
  );
  const matchesCurrentTarget = matches(numerator);
  const visiblyComplete = completed && acted && matchesCurrentTarget;
  const usesEquivalentRepresentation = Boolean(target) && matchesCurrentTarget && (totalNumerator !== totalTargetNumerator || config.denominator !== target!.denominator);

  const commit = (raw: number, action: 'select-piece' | 'clear-model') => {
    const limit = config.task === 'share' ? Math.min(config.denominator, target?.numerator ?? config.denominator) : config.denominator;
    const next = Math.min(limit, Math.max(0, raw));
    const previous = numerator;
    setNumerator(next); setActed(action !== 'clear-model');
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { numerator: next, denominator: config.denominator } });
    if (next !== previous && action !== 'clear-model' && !milestoneSent.current) {
      milestoneSent.current = true;
      onEvent({ type: 'coach', cue: 'strategy' });
    }
    if (action !== 'clear-model' && target && matches(next)) {
      completeOnce(() => onEvent({
        type: 'complete',
        value: {
          numerator: next,
          denominator: config.denominator,
          equivalent: valuesEquivalent(next),
        },
      }));
    }
  };

  const modelKinds = config.mode === 'both' ? (['bars', 'circles'] as const) : [config.mode];
  const change = target ? target.numerator - (config.numerator ?? 0) : 0;
  const changeText = change >= 0 ? `+${change}/${config.denominator}` : `${change}/${config.denominator}`;
  const mixedDescription = wholeCount > 1 ? `${wholeCount - 1} whole${wholeCount > 2 ? 's' : ''} and ${numerator}/${config.denominator}` : undefined;
  const targetLabel = target ? fractionText(totalTargetNumerator!, target.denominator) : fractionText(totalNumerator, config.denominator);
  const comparisonTotalNumerator = comparisonTarget ? (wholeCount - 1) * comparisonTarget.denominator + comparisonTarget.numerator : undefined;
  const comparisonDescription = comparisonTarget && wholeCount > 1
    ? `${wholeCount - 1} whole${wholeCount > 2 ? 's' : ''} and ${comparisonTarget.numerator}/${comparisonTarget.denominator}`
    : undefined;

  return (
    <section className="card widget-experiment fraction-models activity-shell math-activity" data-testid="widget-fraction-models" data-state={visiblyComplete ? 'complete' : 'choosing'} data-complete={visiblyComplete ? 'yes' : 'no'}>
<ActivityWorkbench label="Build and compare fractions" revealKey={visiblyComplete ? "compare" : "build"} visual={<><div className="widget-task" data-testid="widget-task">
        <strong>Goal:</strong> {config.taskPrompt ?? (config.task === 'share' ? `Share ${target?.numerator ?? 0} whole units among ${config.denominator} learners.` : `Build ${targetLabel}`)}
        {target && config.task !== 'share' && config.task !== 'change' && <span> Target value: {fractionText(totalTargetNumerator!, target.denominator)}.</span>}
      </div>
{config.task === 'equivalent' && comparisonTarget && <p className="fraction-task-hint" data-testid="fraction-equivalence-hint">Compare two equal-sized wholes: {fractionText(totalNumerator, config.denominator)} and {fractionText((wholeCount - 1) * comparisonTarget.denominator + comparisonTarget.numerator, comparisonTarget.denominator)}.</p>}
{config.task === 'change' && target && <p className="fraction-equation" data-testid="fraction-equation"><span>Start: {fractionText(config.numerator ?? 0, config.denominator)}</span>{' '}<span>Change: {changeText}</span>{' '}<span>Current: {fractionText(totalNumerator, config.denominator)}</span></p>}

{config.task === 'equivalent' && comparisonTarget ? (
        <div className="fraction-equivalence" data-testid="fraction-equivalence">
          <div><strong>{fractionText(totalNumerator, config.denominator)}</strong>{modelKinds.map((kind) => <FractionModel key={`selected-${kind}`} kind={kind} denominator={config.denominator} numerator={numerator} wholeCount={wholeCount} label="Selected" />)}</div>
          <div role="group" aria-label={`Comparison model: ${fractionText(comparisonTotalNumerator!, comparisonTarget.denominator)}${comparisonDescription ? ` made from ${comparisonDescription}` : ''}`}>
            <strong data-testid="fraction-equivalence-target-label">{fractionText(comparisonTotalNumerator!, comparisonTarget.denominator)}</strong>
            <FractionModel kind={modelKinds[0]!} denominator={comparisonTarget.denominator} numerator={comparisonTarget.numerator} wholeCount={wholeCount} label="Comparison" />
          </div>
          <p>These models use a same-sized whole, so their shaded amounts can be compared fairly.</p>
        </div>
      ) : config.task === 'share' ? (
        <FairShareModel denominator={config.denominator} numerator={numerator} target={target?.numerator ?? numerator} wholeUnits={target?.numerator ?? numerator} />
      ) : config.task === 'groups' ? (
        <FractionGroupsModel denominator={config.denominator} numerator={numerator} />
      ) : <div className="fraction-models-views">{modelKinds.map((kind) => <FractionModel key={kind} kind={kind} denominator={config.denominator} numerator={numerator} wholeCount={wholeCount} label="Current" />)}</div>}</>}>
{config.task === 'share' && <p className="fraction-task-hint" data-testid="fair-share-distribution">{target?.numerator ?? numerator} whole units are cut into {config.denominator} equal parts each. Distribute one piece to every learner at a time. Stop when no source pieces remain.</p>}
<section className="math-task"><h4>Build, then compare</h4><p>{config.task === 'share' ? 'Add one part to every learner. Keep the groups equal and watch the source pieces.' : 'Add or remove equal parts. Compare the amount you built with the goal.'}</p></section>
<div className="fraction-controls" role="group" aria-label="Change the shaded amount">
        <button type="button" onClick={() => commit(0, 'clear-model')}>Clear model</button>
        <button type="button" onClick={() => commit(numerator + 1, 'select-piece')} disabled={numerator >= (config.task === 'share' ? target?.numerator ?? config.denominator : config.denominator)}>Add one part</button>
        <button type="button" onClick={() => commit(numerator - 1, 'select-piece')} disabled={numerator <= 0}>Remove one part</button>
      </div>
{config.task !== 'share' && <div role="group" aria-label="Fraction parts">
        {Array.from({ length: config.denominator }, (_, index) => <button key={index} type="button" aria-label={`Shade part ${index + 1} of ${config.denominator}`} aria-pressed={index < numerator} onClick={() => commit(index + 1, 'select-piece')}>{index + 1}</button>)}
      </div>}
<p className="fraction-total" data-testid="fraction-total" role="status">{fractionText(totalNumerator, config.denominator)}{mixedDescription ? ` (${mixedDescription})` : ''}{' '}{visiblyComplete ? usesEquivalentRepresentation ? 'Equivalent fraction complete.' : 'Fraction complete.' : 'Choose the shaded amount.'}</p>
<section className="math-task" data-activity-reveal={visiblyComplete ? "" : undefined}><h4>Explain your model</h4><p aria-label="Fraction comparison">{visiblyComplete
  ? config.task === 'equivalent' ? 'The shaded amounts line up even though the wholes have different numbers of equal parts.'
    : config.task === 'share' ? `All ${target?.numerator} wholes are used, and every learner has the same ${numerator}/${config.denominator} share.`
      : config.task === 'groups' ? `${numerator} groups of 1/${config.denominator} make ${totalNumerator}/${config.denominator}. The size of each equal part stays the same.`
        : `You changed the number of shaded parts. Each part is still 1/${config.denominator} of the same whole.`
  : 'What stays the same about the size of each equal part when you change the shaded amount?'}</p></section>
<button type="button" onClick={() => { setNumerator(initial); setActed(false); milestoneSent.current = false; onEvent({ type: 'interaction', action: 'clear-model' }); onEvent({ type: 'change', value: { numerator: initial, denominator: config.denominator } }); }}>Start over</button>
</ActivityWorkbench>
</section>
  );
}
