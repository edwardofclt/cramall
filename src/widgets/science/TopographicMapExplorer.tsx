import {useEffect, useMemo, useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type Coordinate = [number, number];
type Point = WidgetProps<'topographic-map-explorer'>['config']['points'][number];
type PlottedPoint = Extract<Point, {x: number; y: number; group: string}>;

const defaultPrompt = 'Select a map point to compare its printed elevation.';

function parseCoordinates(points: string): Coordinate[] {
  return points.split(' ').map((pair) => pair.split(',').map(Number) as Coordinate);
}

function contourViewBox(contours: WidgetProps<'topographic-map-explorer'>['config']['contours'], points: Point[] = []): string {
  const coordinates = contours.flatMap((contour) => parseCoordinates(contour.points));
  const plotted = points.filter(isPlottedPoint).map((point) => [point.x, point.y] as Coordinate);
  coordinates.push(...plotted);
  const xs = coordinates.map(([x]) => x);
  const ys = coordinates.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const padding = 10;
  return `${minX - padding} ${minY - padding} ${Math.max(maxX - minX, 1) + padding * 2} ${Math.max(maxY - minY, 1) + padding * 2}`;
}

function isPlottedPoint(point: Point): point is PlottedPoint {
  return 'x' in point && 'y' in point && 'group' in point;
}

const contourIdentifier = (index: number) => `C${index + 1}`;

export default function TopographicMapExplorer({config, onEvent}: WidgetProps<'topographic-map-explorer'>) {
  const key = JSON.stringify(config);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState<string | null>(null);
  const [patternChoice, setPatternChoice] = useState<'band' | 'cluster' | null>(null);
  const [status, setStatus] = useState(defaultPrompt);
  const {completeOnce} = useCompletionLatch(key);
  const viewBox = useMemo(() => contourViewBox(config.contours, config.points), [config.contours, config.points]);
  const contourMapName = useMemo(() => `Topographic contour model: ${config.contours.map((contour, index) => `${contourIdentifier(index)} — Contour ${index + 1}: ${contour.elevation} m`).join('; ')}`, [config.contours]);
  const hasPlottedPoints = config.points.every(isPlottedPoint);
  const isComplete = config.targetPattern !== undefined
    ? patternChoice === config.targetPattern
    : config.targetPointId !== undefined && selected === config.targetPointId && checked === config.targetPointId;

  useEffect(() => {
    setSelected(null);
    setChecked(null);
    setPatternChoice(null);
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
    setStatus(hasPlottedPoints
      ? `${point.label}: printed elevation ${point.elevation} m at the plotted location. Compare the visible spatial pattern; the map does not establish a cause.`
      : `${point.label}: ${point.elevation} m. This is printed map data, not a plotted location.`);
    emit(id, 'select-point');
    if (hasPlottedPoints) onEvent({type: 'coach', cue: 'strategy'});
  };

  const choosePattern = (pattern: 'band' | 'cluster') => {
    setPatternChoice(pattern);
    setChecked(pattern);
    emit(selected, 'check');
    if (config.targetPattern === undefined) return;
    if (pattern !== config.targetPattern) {
      onEvent({type: 'coach', cue: 'retry'});
      setStatus(`That is not the authored pattern yet. Compare the plotted locations and name only the visible spatial arrangement, not its cause.`);
      return;
    }
    setStatus(`Correct: the plotted points form a visible ${pattern}. The map supports a pattern description, not a cause claim.`);
    completeOnce(() => onEvent({type: 'complete', value: {selectedPointId: pattern}}));
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
      onEvent({type: 'coach', cue: 'retry'});
      setStatus('Not the configured point yet. Compare the printed elevations and try again.');
      return;
    }
    setStatus('Correct point for this authored topographic model. Compare printed elevation data; this is not a measured survey.');
    completeOnce(() => onEvent({type: 'complete', value: {selectedPointId: selected}}));
  };

  const reset = () => {
    setSelected(null);
    setChecked(null);
    setPatternChoice(null);
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
        <svg aria-label={contourMapName} viewBox={viewBox} role="img">
          {config.contours.map((contour, index) => {
            const identifier = contourIdentifier(index);
            const [x, y] = parseCoordinates(contour.points)[0]!;
            return <g key={`${contour.elevation}-${index}`}>
          <polyline points={contour.points} data-testid={`topographic-contour-${identifier}`} aria-label={`Contour ${index + 1} (${identifier}): ${contour.elevation} m`} />
              <text className="topographic-contour-label" x={x + 2} y={y - 2} aria-hidden="true">{identifier}</text>
            </g>;
          })}
          {hasPlottedPoints && config.points.map((point) => {
            if (!isPlottedPoint(point)) return null;
            const pointId = `topographic-point-${point.id}`;
            const symbol = point.group.toLocaleLowerCase().includes('valley') || point.group.toLocaleLowerCase().includes('coast') ? '▼' : '▲';
            return <g key={point.id} id={pointId} className="topographic-plotted-point">
              <circle data-testid={pointId} cx={point.x} cy={point.y} r="3.5" data-x={point.x} data-y={point.y} data-group={point.group} role="button" tabIndex={0} aria-label={`${point.label}: ${point.elevation} m, ${point.group}`} aria-pressed={selected === point.id} onClick={() => select(point.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(point.id); } }} />
              <text className="topographic-point-symbol" x={point.x + 2} y={point.y + 2} aria-hidden="true">{symbol}</text>
              <text className="topographic-point-label" x={point.x + 4} y={point.y - 3} aria-hidden="true">{point.id}</text>
            </g>;
          })}
        </svg>
        <figcaption>{hasPlottedPoints ? 'Contours and named points are plotted in this authored model. Symbols and labels keep the pattern readable without relying on color.' : 'Contour lines are an authored model; named map-data entries are not plotted on this drawing.'}</figcaption>
      </figure>
      <section className="topographic-elevation-key" aria-labelledby="contour-elevation-key-title">
        <h4 id="contour-elevation-key-title">Contour elevation key</h4>
        <ul aria-label="Contour elevation key">
          {config.contours.map((contour, index) => {
            const identifier = contourIdentifier(index);
            return <li key={`${contour.elevation}-${index}`} data-testid={`topographic-contour-key-${identifier}`}>{identifier} — Contour {index + 1}: {contour.elevation} m</li>;
          })}
        </ul>
      </section>
    </div>
    {hasPlottedPoints && <section className="topographic-symbol-key" aria-labelledby="topographic-symbol-key-title">
      <h4 id="topographic-symbol-key-title">Map symbol legend</h4>
      <ul aria-label="Map symbol legend">
        <li>▲ hill or peak point</li>
        <li>▼ coast or valley point</li>
        <li>Each symbol is labeled with its point ID; shape and text do not depend on color.</li>
      </ul>
    </section>}
    <section className="topographic-point-key" aria-labelledby="named-map-data-key-title">
      <h4 id="named-map-data-key-title">Named map-data key</h4>
        <p>{hasPlottedPoints ? 'Choose a plotted point by its printed elevation, then describe the visible spatial pattern. The model does not establish why the pattern formed.' : 'Choose a named point by its printed elevation. The model does not supply locations for these names.'}</p>
      <div className="topographic-point-buttons">
        {config.points.map((point) => <button key={point.id} aria-label={`Select ${point.label}`} aria-controls={hasPlottedPoints ? `topographic-point-${point.id}` : undefined} aria-pressed={selected === point.id} onClick={() => select(point.id)}>{point.label}: {point.elevation} m</button>)}
      </div>
    </section>
    <div className="topographic-controls">
      {config.targetPattern !== undefined ? <>
        <button aria-label="Choose band pattern" aria-pressed={patternChoice === 'band'} onClick={() => choosePattern('band')}>Choose band</button>
        <button aria-label="Choose cluster pattern" aria-pressed={patternChoice === 'cluster'} onClick={() => choosePattern('cluster')}>Choose cluster</button>
      </> : <button aria-label="Check point" disabled={!selected} onClick={check}>Check</button>}
      <button onClick={reset}>Start over</button>
    </div>
    <p role="status">{status}</p>
  </section>;
}
