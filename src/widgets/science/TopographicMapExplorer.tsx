import {useEffect, useMemo, useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type Coordinate = [number, number];

const defaultPrompt = 'Select a map point to compare its printed elevation.';

function parseCoordinates(points: string): Coordinate[] {
  return points.split(' ').map((pair) => pair.split(',').map(Number) as Coordinate);
}

function contourViewBox(contours: WidgetProps<'topographic-map-explorer'>['config']['contours']): string {
  const coordinates = contours.flatMap((contour) => parseCoordinates(contour.points));
  const xs = coordinates.map(([x]) => x);
  const ys = coordinates.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const padding = 10;
  return `${minX - padding} ${minY - padding} ${Math.max(maxX - minX, 1) + padding * 2} ${Math.max(maxY - minY, 1) + padding * 2}`;
}

export default function TopographicMapExplorer({config, onEvent}: WidgetProps<'topographic-map-explorer'>) {
  const key = JSON.stringify(config);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState<string | null>(null);
  const [status, setStatus] = useState(defaultPrompt);
  const {completeOnce} = useCompletionLatch(key);
  const viewBox = useMemo(() => contourViewBox(config.contours), [config.contours]);
  const isComplete = config.targetPointId !== undefined && selected === config.targetPointId && checked === config.targetPointId;

  useEffect(() => {
    setSelected(null);
    setChecked(null);
    setStatus(defaultPrompt);
  }, [key]);

  const emit = (next: string | null, action: 'select-point' | 'check' | 'reset') => {
    onEvent({type: 'interaction', action});
    onEvent({type: 'change', value: {selectedPointId: next}});
  };

  const select = (id: string) => {
    const point = config.points.find((candidate) => candidate.id === id)!;
    setSelected(id);
    setChecked(null);
    setStatus(`${point.label}: ${point.elevation} m. This is printed map data, not a plotted location.`);
    emit(id, 'select-point');
  };

  const check = () => {
    if (!selected) return;
    setChecked(selected);
    emit(selected, 'check');
    if (config.targetPointId === undefined) {
      setStatus('You checked this point while exploring. This configuration has no scored target; compare the printed elevations.');
      return;
    }
    if (selected !== config.targetPointId) {
      setStatus('Not the configured point yet. Compare the printed elevations and try again.');
      return;
    }
    setStatus('Correct point for this authored topographic model. Compare printed elevation data; this is not a measured survey.');
    completeOnce(() => onEvent({type: 'complete', value: {selectedPointId: selected}}));
  };

  const reset = () => {
    setSelected(null);
    setChecked(null);
    setStatus(defaultPrompt);
    emit(null, 'reset');
  };

  return <section className="card widget-experiment topo" data-testid="widget-topographic-map-explorer" data-state={isComplete ? 'complete' : 'exploring'} aria-describedby="topographic-model-note">
    <header>
      <h3>Topographic-map explorer</h3>
      <p id="topographic-model-note">This is an authored topographic model. It supports comparing printed elevation data, but it is not a measured survey, physical evidence, or proof of a real location.</p>
    </header>
    <div className="topographic-model">
      <figure className="topographic-contours">
        <svg aria-label="Topographic contour model" viewBox={viewBox} role="img">
          {config.contours.map((contour, index) => <polyline key={`${contour.elevation}-${index}`} points={contour.points} data-testid={`topographic-contour-${index}`} />)}
        </svg>
        <figcaption>Contour lines are an authored model; named map-data entries are not plotted on this drawing.</figcaption>
      </figure>
      <section className="topographic-elevation-key" aria-labelledby="contour-elevation-key-title">
        <h4 id="contour-elevation-key-title">Contour elevation key</h4>
        <ul aria-label="Contour elevation key">
          {config.contours.map((contour, index) => <li key={`${contour.elevation}-${index}`}>{contour.elevation} m contour</li>)}
        </ul>
      </section>
    </div>
    <section className="topographic-point-key" aria-labelledby="named-map-data-key-title">
      <h4 id="named-map-data-key-title">Named map-data key</h4>
      <p>Choose a named point by its printed elevation. The model does not supply locations for these names.</p>
      <div className="topographic-point-buttons">
        {config.points.map((point) => <button key={point.id} aria-label={`Select ${point.label}`} aria-pressed={selected === point.id} onClick={() => select(point.id)}>{point.label}: {point.elevation} m</button>)}
      </div>
    </section>
    <div className="topographic-controls">
      <button aria-label="Check point" disabled={!selected} onClick={check}>Check</button>
      <button onClick={reset}>Start over</button>
    </div>
    <p role="status">{status}</p>
  </section>;
}
