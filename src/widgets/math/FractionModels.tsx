import { useEffect, useRef, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

const equivalent = (a: number, b: number, c: number, d: number) => a * d === c * b;
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

export default function FractionModels({ config, onEvent }: WidgetProps<'fraction-models'>) {
  const key = JSON.stringify(config);
  const wholeCount = config.wholeCount ?? 1;
  const initial = Math.min(config.numerator ?? 0, config.denominator);
  const [numerator, setNumerator] = useState(initial);
  const milestoneSent = useRef(false);
  const { completed, completeOnce } = useCompletionLatch(key);
  const target = config.target ?? (config.task === 'equivalent' ? config.comparisonTarget : undefined);
  const comparisonTarget = config.comparisonTarget ?? (config.task === 'equivalent' ? config.target : undefined);
  const totalNumerator = (wholeCount - 1) * config.denominator + numerator;
  const totalTargetNumerator = target ? (wholeCount - 1) * config.denominator + target.numerator : undefined;

  useEffect(() => {
    setNumerator(initial);
    milestoneSent.current = false;
  }, [key, initial]);

  const matches = (next: number) => Boolean(target) && (
    config.allowEquivalent || config.task === 'equivalent'
      ? equivalent((wholeCount - 1) * config.denominator + next, config.denominator, totalTargetNumerator!, target!.denominator)
      : (wholeCount - 1) * config.denominator + next === totalTargetNumerator && config.denominator === target!.denominator
  );
  const matchesCurrentTarget = matches(numerator);
  const visiblyComplete = completed && matchesCurrentTarget;
  const usesEquivalentRepresentation = Boolean(target) && matchesCurrentTarget && (totalNumerator !== totalTargetNumerator || config.denominator !== target!.denominator);

  const commit = (raw: number, action: 'select-piece' | 'clear-model') => {
    const next = Math.min(config.denominator, Math.max(0, raw));
    const previous = numerator;
    setNumerator(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { numerator: next, denominator: config.denominator } });
    if (target && next !== previous && !matches(next)) {
      const currentDistance = Math.abs(previous / config.denominator - target.numerator / target.denominator);
      const nextDistance = Math.abs(next / config.denominator - target.numerator / target.denominator);
      if (nextDistance < currentDistance && !milestoneSent.current) {
        milestoneSent.current = true;
        onEvent({ type: 'coach', cue: 'milestone' });
      } else if (nextDistance >= currentDistance) {
        onEvent({ type: 'coach', cue: 'retry' });
      }
    }
    if (target && matches(next)) {
      completeOnce(() => onEvent({
        type: 'complete',
        value: {
          numerator: next,
          denominator: config.denominator,
          equivalent: equivalent((wholeCount - 1) * config.denominator + next, config.denominator, totalTargetNumerator!, target!.denominator),
        },
      }));
    }
  };

  const modelKinds = config.mode === 'both' ? (['bars', 'circles'] as const) : [config.mode];
  const change = target ? target.numerator - (config.numerator ?? 0) : 0;
  const changeText = change >= 0 ? `+${change}/${config.denominator}` : `${change}/${config.denominator}`;
  const mixedDescription = wholeCount > 1 ? `${wholeCount - 1} whole${wholeCount > 2 ? 's' : ''} and ${numerator}/${config.denominator}` : undefined;
  const targetLabel = target ? fractionText(target.numerator, target.denominator) : fractionText(totalNumerator, config.denominator);

  return (
    <section className="card widget-experiment fraction-models" data-testid="widget-fraction-models" data-state={visiblyComplete ? 'complete' : 'choosing'} data-complete={visiblyComplete ? 'yes' : 'no'}>
      <div className="widget-task" data-testid="widget-task">
        <strong>Goal:</strong> {config.taskPrompt ?? `Build ${targetLabel}`}
        {target && <span> Target value: {fractionText(totalTargetNumerator!, target.denominator)}.</span>}
      </div>
      {config.task === 'equivalent' && comparisonTarget && <p className="fraction-task-hint" data-testid="fraction-equivalence-hint">Compare two equal-sized wholes: {fractionText(totalNumerator, config.denominator)} and {fractionText(comparisonTarget.numerator, comparisonTarget.denominator)}.</p>}
      {config.task === 'change' && target && <p className="fraction-equation" data-testid="fraction-equation"><span>Start: {fractionText(config.numerator ?? 0, config.denominator)}</span>{' '}<span>Change: {changeText}</span>{' '}<span>Result: {fractionText(totalTargetNumerator!, config.denominator)}</span></p>}
      {config.task === 'share' && <p className="fraction-task-hint" data-testid="fair-share-distribution">One whole is split into {config.denominator} equal shares. Each share stays the same size.</p>}
      <div className="fraction-controls" role="group" aria-label="Change the shaded amount">
        <button type="button" onClick={() => commit(0, 'clear-model')}>Clear model</button>
        <button type="button" onClick={() => commit(numerator + 1, 'select-piece')} disabled={numerator >= config.denominator}>Add one part</button>
        <button type="button" onClick={() => commit(numerator - 1, 'select-piece')} disabled={numerator <= 0}>Remove one part</button>
      </div>
      <div role="group" aria-label="Fraction parts">
        {Array.from({ length: config.denominator }, (_, index) => <button key={index} type="button" aria-label={`Shade part ${index + 1} of ${config.denominator}`} aria-pressed={index < numerator} onClick={() => commit(index + 1, 'select-piece')}>{index + 1}</button>)}
      </div>
      {config.task === 'equivalent' && comparisonTarget ? (
        <div className="fraction-equivalence" data-testid="fraction-equivalence">
          <div><strong>{fractionText(totalNumerator, config.denominator)}</strong>{modelKinds.map((kind) => <FractionModel key={`selected-${kind}`} kind={kind} denominator={config.denominator} numerator={numerator} wholeCount={wholeCount} label="Selected" />)}</div>
          <div><strong>{fractionText(comparisonTarget.numerator, comparisonTarget.denominator)}</strong><FractionModel kind={modelKinds[0]!} denominator={comparisonTarget.denominator} numerator={comparisonTarget.numerator} label="Comparison" /></div>
          <p>These models use a same-sized whole, so their shaded amounts can be compared fairly.</p>
        </div>
      ) : <div className="fraction-models-views">{modelKinds.map((kind) => <FractionModel key={kind} kind={kind} denominator={config.denominator} numerator={numerator} wholeCount={wholeCount} label="Current" />)}</div>}
      <p className="fraction-total" data-testid="fraction-total" role="status">{fractionText(totalNumerator, config.denominator)}{mixedDescription ? ` (${mixedDescription})` : ''}{' '}{visiblyComplete ? usesEquivalentRepresentation ? 'Equivalent fraction complete.' : 'Fraction complete.' : 'Choose the shaded amount.'}</p>
    </section>
  );
}
