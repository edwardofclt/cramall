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

function schematicPoints(sides: number): string | null {
  if (sides < 3 || sides > 12) return null;
  return Array.from({ length: sides }, (_, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / sides;
    return `${50 + 37 * Math.cos(angle)},${50 + 37 * Math.sin(angle)}`;
  }).join(' ');
}

export default function ShapeClassifier({ config, onEvent }: WidgetProps<'shape-classifier'>) {
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

  const isCorrect = (next: Record<string, string>) => config.shapes.every((shape) => (
    config.bins.find((bin) => bin.id === next[shape.id])?.value === shape[config.rule]
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
    const shape = config.shapes.find((candidate) => candidate.id === shapeId);
    setSelected(shapeId);
    setStatus(`Selected ${shape?.label}. Choose a bin for ${ruleLabels[config.rule]}.`);
    emit(placements, 'select-shape');
  };

  const place = (binId: string) => {
    if (!selected) return;
    const shape = config.shapes.find((candidate) => candidate.id === selected);
    const bin = config.bins.find((candidate) => candidate.id === binId);
    const correct = shape?.[config.rule] === bin?.value;
    const next = { ...placements, [selected]: binId };
    setSelected(null);
    setStatus(correct
      ? `Placed ${shape?.label} in ${bin?.label}. Select a shape to continue.`
      : `Placed ${shape?.label} in ${bin?.label}. Check ${ruleLabels[config.rule]} and select it again to correct the placement.`);
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
        <p>Classify by: <strong>{ruleLabels[config.rule]}</strong></p>
      </header>
      <div className="shape-cards" aria-label="Shape property cards">
        {config.shapes.map((shape) => {
          const bin = config.bins.find((candidate) => candidate.id === placements[shape.id]);
          const points = schematicPoints(shape.sides);
          const description = propertyDescription(shape);
          return (
            <article className="shape-card" data-selected={selected === shape.id ? 'true' : 'false'} key={shape.id}>
              {points ? (
                <svg className="shape-schematic" viewBox="0 0 100 100" role="img" aria-label={description}>
                  <polygon points={points} />
                  {points.split(' ').map((point) => {
                    const [cx, cy] = point.split(',');
                    return <circle cx={cx} cy={cy} r="3" key={point} />;
                  })}
                </svg>
              ) : (
                <div className="shape-schematic shape-property-schematic" role="img" aria-label={description}>
                  Property-count schematic
                </div>
              )}
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
      <section className="shape-bins" aria-label={`Bins for ${ruleLabels[config.rule]}`}>
        <h4>Choose a {ruleLabels[config.rule]} bin</h4>
        <div>
          {config.bins.map((bin) => (
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
