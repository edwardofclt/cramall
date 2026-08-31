import { useEffect, useState } from 'react';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type Rule = 'sides' | 'angles' | 'parallelPairs';
type Action = 'select-shape' | 'place-shape' | 'reset';

const ruleLabels: Record<Rule, string> = {
  sides: 'sides',
  angles: 'angles',
  parallelPairs: 'pairs of parallel sides',
};

function propertyDescription(shape: { label: string; sides: number; angles: number; parallelPairs: number }) {
  return `${shape.label} schematic. ${shape.sides} sides, ${shape.angles} angles, ${shape.parallelPairs} pairs of parallel sides. Only these listed properties are represented.`;
}

type ClassificationConfig = Extract<WidgetProps<'shape-classifier'>['config'], { mode: 'classifications' }>;
type LegacyConfig = Exclude<WidgetProps<'shape-classifier'>['config'], { mode: 'classifications' }>;

function CanonicalShapeDiagram({ shape }: { shape: ClassificationConfig['shapes'][number] }) {
  const marks = shape.diagram === 'square' || shape.diagram === 'rectangle'
    ? <><path className="shape-right-mark" d="M33 52h7v-7 M80 52h-7v-7" /><title>Right-angle marks</title></>
    : shape.diagram.includes('right') ? <><path className="shape-right-mark" d="M28 70h8v-8" /><title>Right-angle mark</title></>
      : null;
  const parallel = ['parallelogram', 'rectangle', 'rhombus', 'square'].includes(shape.diagram)
    ? <path className="shape-parallel-mark" d="M40 30l7 4m26-4 7 4M40 70l7 4m26-4 7 4" /> : null;
  const equal = ['isosceles-triangle', 'isosceles-right-triangle', 'equilateral-triangle', 'rhombus', 'square'].includes(shape.diagram)
    ? <path className="shape-equal-mark" d="M38 42l5 5m34-5 5 5" /> : null;
  const triangle = shape.diagram.includes('triangle');
  const points = triangle ? '20,78 50,18 80,78' : shape.diagram === 'parallelogram' ? '24,26 76,26 88,76 36,76' : '24,24 76,24 76,76 24,76';
  return <svg className="shape-canonical-diagram" role="img" aria-label={`${shape.label}: ${shape.sides} sides, ${shape.angles} angles, and ${shape.parallelPairs} pairs of parallel sides. Diagram marks show only the authored classification properties.`} viewBox="0 0 100 100" data-diagram={shape.diagram}>
    <polygon points={points} />{marks}{parallel}{equal}
  </svg>;
}

function ClassificationShapeClassifier({ config, onEvent }: { config: ClassificationConfig; onEvent: WidgetProps<'shape-classifier'>['onEvent'] }) {
  const key = JSON.stringify(config);
  const [selected, setSelected] = useState<string | null>(null);
  const [memberships, setMemberships] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState('Select a shape, then choose every class that fits it.');
  const { completed, completeOnce } = useCompletionLatch(key);
  useEffect(() => { setSelected(null); setMemberships({}); setStatus('Select a shape, then choose every class that fits it.'); }, [key]);
  const targetIds = (shape: ClassificationConfig['shapes'][number]) => shape.classifications.map((classification) => config.bins.find((bin) => bin.classification === classification)!.id);
  const correct = (next: Record<string, string[]>) => config.shapes.every((shape) => {
    const chosen = next[shape.id] ?? []; const target = targetIds(shape);
    return chosen.length === target.length && target.every((id) => chosen.includes(id));
  });
  const emit = (next: Record<string, string[]>, action: Action) => {
    setMemberships(next); onEvent({ type: 'interaction', action }); onEvent({ type: 'change', value: { memberships: next } });
    if (correct(next)) { setStatus('Every shape is in exactly the classes shown by its diagram.'); completeOnce(() => onEvent({ type: 'complete', value: { memberships: next } })); }
  };
  const place = (binId: string) => {
    if (!selected) return;
    const current = memberships[selected] ?? [];
    const nextMembership = current.includes(binId) ? current.filter((id) => id !== binId) : [...current, binId];
    const shape = config.shapes.find((candidate) => candidate.id === selected)!;
    setStatus(`${shape.label} ${current.includes(binId) ? 'removed from' : 'added to'} ${config.bins.find((bin) => bin.id === binId)?.label}.`);
    emit({ ...memberships, [selected]: nextMembership }, 'place-shape');
  };
  return <section className="card widget-experiment shapes" data-testid="widget-shape-classifier" data-state={completed ? 'complete' : 'sorting'} data-complete={completed ? 'yes' : 'no'}>
    <header className="shapes-heading"><h3>Classify the shapes</h3><p>Select every class supported by each diagram.</p></header>
    <div className="shape-cards" aria-label="Shape classification cards">{config.shapes.map((shape) => <article className="shape-card" data-selected={selected === shape.id ? 'true' : 'false'} key={shape.id}>
      <CanonicalShapeDiagram shape={shape} /><div className="shape-properties"><h4>{shape.label}</h4><p>Classes: {(memberships[shape.id] ?? []).map((id) => config.bins.find((bin) => bin.id === id)?.label).join(', ') || 'not placed'}</p></div>
      <button aria-label={`Select ${shape.label}`} aria-pressed={selected === shape.id} onClick={() => { setSelected(shape.id); setStatus(`Selected ${shape.label}. Choose every class that fits.`); emit(memberships, 'select-shape'); }}>Select {shape.label}</button>
    </article>)}</div>
    <section className="shape-bins" aria-label="Classification bins"><h4>Choose every class that fits</h4><div>{config.bins.map((bin) => <button aria-label={`Place selected shape in ${bin.label}`} aria-pressed={selected ? (memberships[selected] ?? []).includes(bin.id) : false} disabled={!selected} key={bin.id} onClick={() => place(bin.id)}>{bin.label}</button>)}</div></section>
    <button className="shape-reset" onClick={() => { setSelected(null); setStatus('Classifications cleared. Select a shape.'); emit({}, 'reset'); }}>Start over</button><p role="status">{status}</p>
  </section>;
}

export default function ShapeClassifier({ config, onEvent }: WidgetProps<'shape-classifier'>) {
  if ('mode' in config && config.mode === 'classifications') return <ClassificationShapeClassifier config={config} onEvent={onEvent} />;
  const legacyConfig = config as LegacyConfig;
  const key = JSON.stringify(config);
  const [selected, setSelected] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('Select a shape to inspect and classify.');
  const { completed, completeOnce } = useCompletionLatch(key);

  useEffect(() => {
    setSelected(null);
    setPlacements({});
    setStatus('Select a shape to inspect and classify.');
  }, [key]);

  const isCorrect = (next: Record<string, string>) => legacyConfig.shapes.every((shape) => (
    legacyConfig.bins.find((bin) => bin.id === next[shape.id])?.value === shape[legacyConfig.rule]
  ));

  const emit = (next: Record<string, string>, action: Action) => {
    setPlacements(next);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: { placements: next } });
    if (isCorrect(next)) {
      setStatus('Every shape is classified by the active rule.');
      completeOnce(() => onEvent({ type: 'complete', value: { placements: next } }));
    }
  };

  const choose = (shapeId: string) => {
    const shape = legacyConfig.shapes.find((candidate) => candidate.id === shapeId);
    setSelected(shapeId);
    setStatus(`Selected ${shape?.label}. Choose a bin for ${ruleLabels[legacyConfig.rule]}.`);
    emit(placements, 'select-shape');
  };

  const place = (binId: string) => {
    if (!selected) return;
    const shape = legacyConfig.shapes.find((candidate) => candidate.id === selected);
    const bin = legacyConfig.bins.find((candidate) => candidate.id === binId);
    const correct = shape?.[legacyConfig.rule] === bin?.value;
    const next = { ...placements, [selected]: binId };
    setSelected(null);
    setStatus(correct
      ? `Placed ${shape?.label} in ${bin?.label}. Select a shape to continue.`
      : `Placed ${shape?.label} in ${bin?.label}. Check ${ruleLabels[legacyConfig.rule]} and select it again to correct the placement.`);
    emit(next, 'place-shape');
  };

  const reset = () => {
    setSelected(null);
    setStatus('Placements cleared. Select a shape to inspect and classify.');
    emit({}, 'reset');
  };

  return (
    <section
      className="card widget-experiment shapes"
      data-testid="widget-shape-classifier"
      data-state={completed ? 'complete' : 'sorting'}
      data-complete={completed ? 'yes' : 'no'}
    >
      <header className="shapes-heading">
        <h3>Classify the shapes</h3>
        <p>Classify by: <strong>{ruleLabels[legacyConfig.rule]}</strong></p>
      </header>
      <div className="shape-cards" aria-label="Shape property cards">
        {legacyConfig.shapes.map((shape) => {
          const bin = legacyConfig.bins.find((candidate) => candidate.id === placements[shape.id]);
          const description = propertyDescription(shape);
          return (
            <article className="shape-card" data-selected={selected === shape.id ? 'true' : 'false'} key={shape.id}>
              <div className="shape-schematic shape-property-schematic" role="img" aria-label={description}>
                <span className="shape-schematic-title">Property counts</span>
                <span>{shape.sides} sides</span>
                <span>{shape.angles} angles</span>
                <span>{shape.parallelPairs} parallel pairs</span>
              </div>
              <div className="shape-properties">
                <h4>{shape.label}</h4>
                <dl>
                  <div><dt>Sides</dt><dd>{shape.sides}</dd></div>
                  <div><dt>Angles</dt><dd>{shape.angles}</dd></div>
                  <div><dt>Parallel pairs</dt><dd>{shape.parallelPairs}</dd></div>
                </dl>
              </div>
              <button
                aria-label={`Select ${shape.label}`}
                aria-pressed={selected === shape.id}
                onClick={() => choose(shape.id)}
              >
                Select {shape.label}
              </button>
              <p className="shape-placement" data-testid={`shape-placement-${shape.id}`}>
                <span aria-hidden="true" className="shape-placement-id">{placements[shape.id] ?? ''}</span>
                Placed in: {bin?.label ?? 'not placed'}
              </p>
            </article>
          );
        })}
      </div>
      <section className="shape-bins" aria-label={`Bins for ${ruleLabels[legacyConfig.rule]}`}>
        <h4>Choose a {ruleLabels[legacyConfig.rule]} bin</h4>
        <div>
          {legacyConfig.bins.map((bin) => (
            <button
              aria-label={`Place selected shape in ${bin.label}`}
              disabled={!selected}
              key={bin.id}
              onClick={() => place(bin.id)}
            >
              {bin.label}
            </button>
          ))}
        </div>
      </section>
      <button className="shape-reset" onClick={reset}>Start over</button>
      <p role="status">{status}</p>
    </section>
  );
}
