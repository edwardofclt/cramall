import { ActivityWorkbench } from '../ActivityWorkbench';
import './guide-led-math.css';
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

function CanonicalShapeDiagram({ shape, label }: { shape: ClassificationConfig['shapes'][number]; label: string }) {
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
    rhombus: { points: '50,15 80,50 50,85 20,50', evidence: 'four equal-side ticks on its four slanted sides, two distinct arrow-marked pairs of parallel sides, and unequal diagonals' },
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
          : shape.diagram === 'rhombus' ? <g className="shape-equal-mark" data-equal-sides="4" data-edge-anchors="AB,BC,CD,DA"><path d="M62 35.5l6-6 M62 64.5l6 6 M32 64.5l6 6 M32 35.5l6-6" /></g>
            : shape.diagram === 'square' ? <g className="shape-equal-mark" data-equal-sides="4" data-edge-anchors="AB,BC,CD,DA"><path d="M50 24v8 M68 50h8 M50 68v8 M24 50h8" /></g> : null;
  const parallel = shape.diagram === 'parallelogram' ? <>
    <g className="shape-parallel-mark" data-parallel-pair="one" data-edge-anchors="AB,CD"><path d="M47 25l-4-3m4 3l-4 3 M47 75l-4-3m4 3l-4 3" /></g>
    <g className="shape-parallel-mark" data-parallel-pair="two" data-edge-anchors="BC,DA"><path d="M75.6 45l-4-3m4 3l-1 5 M33.4 55l-4-3m4 3l-1 5" /></g>
  </> : shape.diagram === 'rectangle' ? <>
    <g className="shape-parallel-mark" data-parallel-pair="one" data-edge-anchors="AB,CD"><path d="M50 24l-4-3m4 3l-4 3 M50 76l-4-3m4 3l-4 3" /></g>
    <g className="shape-parallel-mark" data-parallel-pair="two" data-edge-anchors="BC,DA"><path d="M77 50l-3-4m3 4l-3 4 M23 50l3-4m-3 4l3 4" /></g>
  </> : shape.diagram === 'rhombus' ? <>
    <g className="shape-parallel-mark" data-parallel-pair="one" data-edge-anchors="AB,CD"><path d="M65 32.5l-4-3m4 3l-1 5 M35 67.5l4 3m-4-3l1-5" /></g>
    <g className="shape-parallel-mark" data-parallel-pair="two" data-edge-anchors="BC,DA"><path d="M65 67.5l4-3m-4 3l1 5 M35 32.5l-4 3m4-3l-1-5" /></g>
  </> : shape.diagram === 'square' ? <>
    <g className="shape-parallel-mark" data-parallel-pair="one" data-edge-anchors="AB,CD"><path d="M50 28l-4-3m4 3l-4 3 M50 72l-4-3m4 3l-4 3" /></g>
    <g className="shape-parallel-mark" data-parallel-pair="two" data-edge-anchors="BC,DA"><path d="M72 50l-3-4m3 4l-3 4 M28 50l3-4m-3 4l3 4" /></g>
  </> : null;
  return <svg className="shape-canonical-diagram" role="img" aria-label={`${label}: ${shape.sides} sides, ${shape.angles} angles, and ${shape.parallelPairs} pairs of parallel sides. Observable evidence: ${evidence}.`} viewBox="0 0 100 100" data-diagram={shape.diagram}>
    <polygon points={points} />{right}{parallel}{equal}
  </svg>;
}

function ClassificationShapeClassifier({ config, onEvent }: { config: ClassificationConfig; onEvent: WidgetProps<'shape-classifier'>['onEvent'] }) {
  const key = JSON.stringify(config);
  const name = (id: string) => `Shape ${String.fromCharCode(65 + config.shapes.findIndex(item => item.id === id))}`;
  const [selected, setSelected] = useState<string | null>(null);
  const [memberships, setMemberships] = useState<Record<string, string[]>>({});
  const [checks, setChecks] = useState<Record<string, { correct: boolean; classes: string[] }>>({});
  const { completeOnce } = useCompletionLatch(key);
  useEffect(() => { setSelected(null); setMemberships({}); setChecks({}); }, [key]);
  const shape = config.shapes.find(candidate => candidate.id === selected) ?? config.shapes[0]!;
  const targetIds = (item: ClassificationConfig['shapes'][number]) => item.classifications.map(classification => config.bins.find(bin => bin.classification === classification)!.id);
  const correct = (item: ClassificationConfig['shapes'][number], chosen: string[]) => chosen.length === targetIds(item).length && targetIds(item).every(id => chosen.includes(id));
  const matched = config.shapes.every(item => checks[item.id]?.correct && correct(item, memberships[item.id] ?? []));
  const current = memberships[shape.id] ?? [];
  const checked = checks[shape.id];
  const currentWasChecked = checked && checked.classes.length === current.length && checked.classes.every(id => current.includes(id));
  function choose(id: string) { if (selected === id) return; setSelected(id); onEvent({ type: 'interaction', action: 'select-shape' }); onEvent({ type: 'change', value: { memberships } }); }
  function place(id: string) {
    if (!selected) return;
    const nextClasses = current.includes(id) ? current.filter(value => value !== id) : [...current, id];
    const next = { ...memberships, [selected]: nextClasses };
    setMemberships(next); onEvent({ type: 'interaction', action: 'place-shape' }); onEvent({ type: 'change', value: { memberships: next } });
  }
  function check() {
    if (!selected) return;
    const isCorrect = correct(shape, current);
    const next = { ...checks, [shape.id]: { correct: isCorrect, classes: [...current] } };
    setChecks(next);
    onEvent({ type: 'coach', cue: isCorrect ? 'milestone' : 'retry' });
    if (config.shapes.every(item => next[item.id]?.correct && correct(item, memberships[item.id] ?? []))) completeOnce(() => onEvent({ type: 'complete', value: { memberships } }));
  }
  return <section className="card widget-experiment shapes activity-shell math-activity" data-testid="widget-shape-classifier" data-state={matched ? 'complete' : 'sorting'} data-complete={matched ? 'yes' : 'no'}>
    <ActivityWorkbench label="Classify by shape attributes" revealKey={`${selected}-${currentWasChecked}`} visual={<>
      <header className="shapes-heading"><h3>Classify the shapes</h3><p>Use side and angle marks to decide every group that fits.</p></header>
      <div className="math-selected-shape"><CanonicalShapeDiagram shape={shape} label={name(shape.id)} /><h4>{name(shape.id)}</h4></div>
      <p>Right-angle boxes, equal-side ticks, and parallel arrows describe the shape.</p>
      <p className="math-record">Your classes: {current.map(id => config.bins.find(bin => bin.id === id)?.label).join(', ') || 'none selected'}</p>
    </>}>
      <section className="math-task"><h4>1 · Choose a shape</h4><div className="math-choice-grid">{config.shapes.map(item => <button type="button" key={item.id} aria-label={`Select ${name(item.id)}`} aria-pressed={selected === item.id} onClick={() => choose(item.id)}>{name(item.id)}{checks[item.id]?.correct && correct(item, memberships[item.id] ?? []) ? ' · Checked' : ''}</button>)}</div></section>
      <section className="shape-bins math-task" data-activity-reveal={selected && !currentWasChecked ? "" : undefined} aria-label="Classification bins"><h4>2 · Select every class that fits</h4><div>{config.bins.map(bin => <button type="button" aria-label={`Place selected shape in ${bin.label}`} aria-pressed={selected ? current.includes(bin.id) : false} disabled={!selected} key={bin.id} onClick={() => place(bin.id)}>{bin.label}</button>)}</div><button type="button" disabled={!selected} onClick={check}>Check these classes</button>
        <p aria-label="Shape check feedback" role="status" data-outcome={currentWasChecked ? checked.correct ? 'correct' : 'retry' : undefined}>{!currentWasChecked ? 'These choices are not checked yet.' : checked.correct ? 'Correct. Every selected class is supported by this shape’s attributes.' : 'Try again. Check for missing groups and groups whose attributes do not fit. Use the diagram marks.'}</p>
      </section>
      <section className="math-task" aria-label="Shape check record" data-activity-reveal={currentWasChecked ? "" : undefined}><h4>3 · Compare your checks</h4>{Object.entries(checks).map(([id, record]) => <p className="math-record" key={id}>{name(id)}: {record.classes.map(classId => config.bins.find(bin => bin.id === classId)?.label).join(', ') || 'no classes'}. {record.correct ? 'Correct when checked.' : 'Needed another look when checked.'}</p>)}<p>Which marked attribute explains why one shape can belong to more than one group?</p></section>
      <button type="button" className="shape-reset" onClick={() => { setSelected(null); setMemberships({}); setChecks({}); onEvent({ type: 'interaction', action: 'reset' }); onEvent({ type: 'change', value: { memberships: {} } }); }}>Start over</button>
      <p role="status">{matched ? 'Every shape is in exactly the classes shown by its diagram.' : 'Select a shape, inspect its marks, and check its classes.'}</p>
    </ActivityWorkbench>
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
      className="card widget-experiment shapes activity-shell math-activity"
      data-testid="widget-shape-classifier"
      data-state={matched ? 'complete' : 'sorting'}
      data-complete={matched ? 'yes' : 'no'}
    >
<ActivityWorkbench label="Classify by shape attributes" visual={<><header className="shapes-heading">
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
      </div></>}>
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
</ActivityWorkbench>
</section>
  );
}
