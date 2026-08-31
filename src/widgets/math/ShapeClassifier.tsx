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
  const details: Record<ClassificationConfig['shapes'][number]['diagram'], { points: string; evidence: string }> = {
    'equilateral-triangle': { points: '20,76 80,76 50,24', evidence: 'three equal-side marks; three acute angles; and equal-angle evidence' },
    'isosceles-acute-triangle': { points: '25,76 75,76 50,25', evidence: 'two equal-side marks and three acute angles' },
    'isosceles-right-triangle': { points: '25,75 75,75 25,25', evidence: 'two equal-side marks and one right-angle box' },
    'isosceles-obtuse-triangle': { points: '20,76 80,76 50,62', evidence: 'two equal-side marks and one visibly obtuse top angle' },
    'scalene-acute-triangle': { points: '20,76 80,76 53,21', evidence: 'three visibly different side lengths and three acute angles' },
    'scalene-right-triangle': { points: '20,75 75,75 20,35', evidence: 'three visibly different side lengths and one right-angle box' },
    'scalene-obtuse-triangle': { points: '18,76 82,76 42,62', evidence: 'three visibly different side lengths and one visibly obtuse angle' },
    quadrilateral: { points: '18,25 76,20 84,70 30,80', evidence: 'four unequal-looking sides with no parallel-arrow marks' },
    parallelogram: { points: '25,25 70,25 84,75 39,75', evidence: 'two distinct arrow-marked pairs of parallel sides' },
    rectangle: { points: '23,24 77,24 77,76 23,76', evidence: 'four right-angle boxes and two distinct arrow-marked pairs of parallel sides' },
    rhombus: { points: '50,18 82,50 50,82 18,50', evidence: 'four equal-side marks and two distinct arrow-marked pairs of parallel sides' },
    square: { points: '28,28 72,28 72,72 28,72', evidence: 'four equal-side marks, four right-angle boxes, and two distinct arrow-marked pairs of parallel sides' },
  };
  const { points, evidence } = details[shape.diagram];
  const right = shape.diagram === 'isosceles-right-triangle' ? <><title>Right-angle box</title><path className="shape-right-mark" d="M25 67h8v8" /></>
    : shape.diagram === 'scalene-right-triangle' ? <><title>Right-angle box</title><path className="shape-right-mark" d="M20 67h8v8" /></>
      : shape.diagram === 'rectangle' ? <><title>Right-angle box</title><path className="shape-right-mark" d="M23 32h8v-8 M69 24h8v8 M77 68h-8v8 M31 76h-8v-8" /></>
        : shape.diagram === 'square' ? <><title>Right-angle box</title><path className="shape-right-mark" d="M28 36h8v-8 M64 28h8v8 M72 64h-8v8 M36 72h-8v-8" /></> : null;
  const equal = shape.diagram === 'equilateral-triangle' ? <><g className="shape-equal-mark" data-equal-sides="3"><path d="M50 72v8 M32 48l6 4 M62 52l6-4" /></g><g className="shape-equal-angle-mark" data-equal-angles="3"><path d="M26 69q4-7 9-8 M65 61q5 1 9 8 M46 32q4-3 8 0" /></g></>
    : shape.diagram === 'isosceles-acute-triangle' ? <g className="shape-equal-mark" data-equal-sides="2"><path d="M34 50l6 4 M60 54l6-4" /></g>
      : shape.diagram === 'isosceles-right-triangle' ? <g className="shape-equal-mark" data-equal-sides="2"><path d="M21 50h8 M50 71v8" /></g>
        : shape.diagram === 'isosceles-obtuse-triangle' ? <g className="shape-equal-mark" data-equal-sides="2"><path d="M33 69l6 4 M61 73l6-4" /></g>
          : shape.diagram === 'rhombus' ? <g className="shape-equal-mark" data-equal-sides="4"><path d="M32 33l6 4 M68 29l6 4 M68 71l6-4 M32 67l6-4" /></g>
            : shape.diagram === 'square' ? <g className="shape-equal-mark" data-equal-sides="4"><path d="M50 24v8 M68 50h8 M50 68v8 M24 50h8" /></g> : null;
  const parallel = ['parallelogram', 'rectangle', 'rhombus', 'square'].includes(shape.diagram) ? <>
    <g className="shape-parallel-mark" data-parallel-pair="one"><path d="M42 21l7 4 M42 79l7-4" /></g>
    <g className="shape-parallel-mark" data-parallel-pair="two"><path d="M75 44l4 7 M25 44l4 7" /></g>
  </> : null;
  const classes = shape.classifications.map((classification) => classification.replace(/-/g, ' ')).join(', ');
  return <svg className="shape-canonical-diagram" role="img" aria-label={`${shape.label}: canonical ${shape.diagram.replace(/-/g, ' ')} with ${shape.sides} sides, ${shape.angles} angles, and ${shape.parallelPairs} pairs of parallel sides. Observable evidence: ${evidence}. Canonical classes: ${classes}.`} viewBox="0 0 100 100" data-diagram={shape.diagram}>
    <polygon points={points} />{right}{parallel}{equal}
  </svg>;
}

function ClassificationShapeClassifier({ config, onEvent }: { config: ClassificationConfig; onEvent: WidgetProps<'shape-classifier'>['onEvent'] }) {
  const key = JSON.stringify(config);
  const [selected, setSelected] = useState<string | null>(null);
  const [memberships, setMemberships] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState('Select a shape, then choose every class that fits it.');
  const { completeOnce } = useCompletionLatch(key);
  useEffect(() => { setSelected(null); setMemberships({}); setStatus('Select a shape, then choose every class that fits it.'); }, [key]);
  const targetIds = (shape: ClassificationConfig['shapes'][number]) => shape.classifications.map((classification) => config.bins.find((bin) => bin.classification === classification)!.id);
  const correct = (next: Record<string, string[]>) => config.shapes.every((shape) => {
    const chosen = next[shape.id] ?? []; const target = targetIds(shape);
    return chosen.length === target.length && target.every((id) => chosen.includes(id));
  });
  const matched = correct(memberships);
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
  return <section className="card widget-experiment shapes" data-testid="widget-shape-classifier" data-state={matched ? 'complete' : 'sorting'} data-complete={matched ? 'yes' : 'no'}>
    <header className="shapes-heading"><h3>Classify the shapes</h3><p>Select every class supported by each diagram.</p></header>
    <div className="shape-cards" aria-label="Shape classification cards">{config.shapes.map((shape) => <article className="shape-card" data-selected={selected === shape.id ? 'true' : 'false'} key={shape.id}>
      <CanonicalShapeDiagram shape={shape} /><div className="shape-properties"><h4>{shape.label}</h4><p>Classes: {(memberships[shape.id] ?? []).map((id) => config.bins.find((bin) => bin.id === id)?.label).join(', ') || 'not placed'}</p></div>
      <button aria-label={`Select ${shape.label}`} aria-pressed={selected === shape.id} onClick={() => { setSelected(shape.id); setStatus(`Selected ${shape.label}. Choose every class that fits.`); emit(memberships, 'select-shape'); }}>Select {shape.label}</button>
    </article>)}</div>
    <section className="shape-bins" aria-label="Classification bins"><h4>Choose every class that fits</h4><div>{config.bins.map((bin) => <button aria-label={`Place selected shape in ${bin.label}`} aria-pressed={selected ? (memberships[selected] ?? []).includes(bin.id) : false} disabled={!selected} key={bin.id} onClick={() => place(bin.id)}>{bin.label}</button>)}</div></section>
    <button className="shape-reset" onClick={() => { setSelected(null); setStatus('Classifications cleared. Select a shape.'); emit({}, 'reset'); }}>Start over</button><p role="status">{matched ? 'Every shape is in exactly the classes shown by its diagram.' : status}</p>
  </section>;
}

export default function ShapeClassifier({ config, onEvent }: WidgetProps<'shape-classifier'>) {
  if ('mode' in config && config.mode === 'classifications') return <ClassificationShapeClassifier config={config} onEvent={onEvent} />;
  const legacyConfig = config as LegacyConfig;
  const key = JSON.stringify(config);
  const [selected, setSelected] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('Select a shape to inspect and classify.');
  const { completeOnce } = useCompletionLatch(key);

  useEffect(() => {
    setSelected(null);
    setPlacements({});
    setStatus('Select a shape to inspect and classify.');
  }, [key]);

  const isCorrect = (next: Record<string, string>) => legacyConfig.shapes.every((shape) => (
    legacyConfig.bins.find((bin) => bin.id === next[shape.id])?.value === shape[legacyConfig.rule]
  ));
  const matched = isCorrect(placements);

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
      data-state={matched ? 'complete' : 'sorting'}
      data-complete={matched ? 'yes' : 'no'}
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
      <p role="status">{matched ? 'Every shape is classified by the active rule.' : status}</p>
    </section>
  );
}
