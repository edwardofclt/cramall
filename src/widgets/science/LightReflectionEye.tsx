import { useEffect, useState } from 'react';
import { useReducedMotionPref } from '../../app/useReducedMotionPref';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

const contact = { x: 50, y: 50 };

function rayPoint(angle: number, side: -1 | 1, radius: number) {
  const radians = (angle * Math.PI) / 180;
  return { x: contact.x + side * radius * Math.sin(radians), y: contact.y - radius * Math.cos(radians) };
}

function pointText(point: { x: number; y: number }) {
  return `${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
}

function angleArc(angle: number, side: -1 | 1) {
  const endpoint = rayPoint(angle, side, 12);
  return `M 50 38 A 12 12 0 0 ${side === -1 ? 0 : 1} ${pointText(endpoint)}`;
}

export default function LightReflectionEye({ config, onEvent }: WidgetProps<'light-reflection-eye'>) {
  const key = JSON.stringify(config);
  const reduced = useReducedMotionPref();
  const tracePath = config.task === 'trace-path';
  const pathLabels = config.pathLabels ?? { source: 'Source', object: 'Object', eye: 'Eye' };
  const [angle, setAngle] = useState(config.incidentAngle);
  const [checked, setChecked] = useState(false);
  const [selectedPath, setSelectedPath] = useState<Array<'source' | 'object' | 'eye'>>([]);
  const [pathCommitted, setPathCommitted] = useState(false);
  const [status, setStatus] = useState('Select the source, then the object, then the eye.');
  const { completeOnce } = useCompletionLatch(key);
  const payload = (value: number) => ({ incidentAngle: value, reflectionAngle: value });
  const isTarget = config.targetAngle !== undefined && angle === config.targetAngle;
  const visiblyComplete = tracePath ? pathCommitted : checked && isTarget;
  const incidentStart = rayPoint(angle, -1, 36);
  const reflectedEnd = rayPoint(angle, 1, 36);
  const eyePoint = rayPoint(angle, 1, 29);

  useEffect(() => {
    setAngle(config.incidentAngle);
    setChecked(false);
    setSelectedPath([]);
    setPathCommitted(false);
    setStatus('Select the source, then the object, then the eye.');
  }, [key, config.incidentAngle]);

  const change = (next: number) => {
    setAngle(next);
    setChecked(false);
    onEvent({ type: 'interaction', action: 'change-angle' });
    onEvent({ type: 'change', value: payload(next) });
  };
  const check = () => {
    const value = payload(angle);
    setChecked(true);
    onEvent({ type: 'interaction', action: 'check' });
    onEvent({ type: 'change', value });
    if (config.targetAngle !== undefined && angle === config.targetAngle) completeOnce(() => onEvent({ type: 'complete', value }));
  };
  const selectPathNode = (node: 'source' | 'object' | 'eye') => {
    const expected: Array<'source' | 'object' | 'eye'> = ['source', 'object', 'eye'];
    const next = expected[selectedPath.length];
    if (node !== next) {
      onEvent({ type: 'coach', cue: selectedPath.length === 0 ? 'strategy' : 'retry' });
      setChecked(false);
      setPathCommitted(false);
      setStatus(selectedPath.length === 0 ? 'Start with the source, then trace to the object, then to the eye.' : `Next, select the ${next}.`);
      return;
    }
    const updated = [...selectedPath, node];
    setSelectedPath(updated);
    setChecked(false);
    onEvent({ type: 'interaction', action: 'check' });
    onEvent({ type: 'change', value: payload(angle) });
    if (updated.length === 2) onEvent({ type: 'coach', cue: 'milestone' });
    setStatus(updated.length === 3 ? 'The source → object → eye path is ready to commit.' : `Good start. Now select the ${expected[updated.length]}.`);
  };
  const commitPath = () => {
    if (!tracePath || selectedPath.length !== 3) return;
    setPathCommitted(true);
    onEvent({ type: 'interaction', action: 'check' });
    onEvent({ type: 'change', value: payload(angle) });
    onEvent({ type: 'coach', cue: 'milestone' });
    completeOnce(() => onEvent({ type: 'complete', value: payload(angle) }));
    setStatus(`Committed path: ${pathLabels.source} → ${pathLabels.object} → ${pathLabels.eye}. Reflected light entering the eye is the model's connection to seeing.`);
  };
  const reset = () => {
    setAngle(config.incidentAngle);
    setChecked(false);
    setSelectedPath([]);
    setPathCommitted(false);
    setStatus('Select the source, then the object, then the eye.');
    onEvent({ type: 'interaction', action: 'reset' });
    onEvent({ type: 'change', value: payload(config.incidentAngle) });
  };
  const diagramLabel = tracePath
    ? `Authored light-path model from ${pathLabels.source} to ${pathLabels.object} to ${pathLabels.eye}; not an observation.`
    : `Ray diagram with incident angle ${angle} degrees and reflected angle ${angle} degrees, both measured from the normal.`;

  return <section className="card widget-experiment light" data-testid="widget-light-reflection-eye" data-state={visiblyComplete ? 'complete' : 'testing'} data-angle={angle} data-motion={reduced ? 'off' : 'on'} data-path-committed={pathCommitted ? 'yes' : 'no'}>
    <header>
      <h3>Light reflection path model</h3>
      <p><strong>Simplified light-path model.</strong> It shows an authored ray path, not physical evidence.</p>
      {tracePath ? <p>{config.taskPrompt ?? `Connect ${pathLabels.source}, ${pathLabels.object}, then ${pathLabels.eye}.`}</p> : <p>Angles are measured from the dashed normal: 0° points along the normal and 90° lies along the surface.</p>}
    </header>
    {!tracePath && <div className="light-values">
      <strong>Incident angle: {angle}° from the normal</strong>
      <strong data-testid="reflection-angle">Reflected angle: {angle}° from the normal</strong>
    </div>}
    {tracePath && <div className="light-path-steps" aria-label="Light path steps">
      {(['source', 'object', 'eye'] as const).map((node) => <button key={node} type="button" aria-label={`Select ${node}: ${pathLabels[node]}`} aria-pressed={selectedPath.includes(node)} disabled={pathCommitted} onClick={() => selectPathNode(node)}>{selectedPath.includes(node) ? '✓ ' : ''}{node}: {pathLabels[node]}</button>)}
      <span className="light-path-order" aria-live="polite">Path: {selectedPath.length ? selectedPath.map((node) => pathLabels[node]).join(' → ') : 'not started'}</span>
    </div>}
    <div className="light-diagram" role="img" aria-label={diagramLabel}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 100 100">
        <defs><marker id="reflection-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M 0 0 L 6 3 L 0 6 z" /></marker></defs>
        <line data-testid="reflecting-surface" className="reflecting-surface" x1="4" x2="96" y1="50" y2="50" />
        <line data-testid="surface-normal" className="surface-normal" x1="50" x2="50" y1="8" y2="92" strokeDasharray="3 2" />
        <line data-testid="incident-ray" className={`incident-ray${tracePath && pathCommitted ? ' light-ray-committed' : ''}`} data-committed={pathCommitted ? 'yes' : 'no'} x1={incidentStart.x} y1={incidentStart.y} x2="50" y2="50" markerEnd="url(#reflection-arrow)" />
        <line data-testid="reflected-ray" className={`reflected-ray${tracePath && pathCommitted ? ' light-ray-committed' : ''}`} data-committed={pathCommitted ? 'yes' : 'no'} x1="50" y1="50" x2={reflectedEnd.x} y2={reflectedEnd.y} markerEnd="url(#reflection-arrow)" />
        <path data-testid="incident-angle-arc" className="angle-arc" d={angleArc(angle, -1)} />
        <path data-testid="reflected-angle-arc" className="angle-arc" d={angleArc(angle, 1)} />
        <text className="angle-label" x="29" y="34">{angle}°</text><text className="angle-label" x="61" y="34">{angle}°</text>
        <text className="surface-label" x="5" y="59">reflecting surface</text><text className="normal-label" x="53" y="13">normal</text>
        {tracePath && <>
          <circle className="light-path-node" cx={incidentStart.x} cy={incidentStart.y} r="3" />
          <text className="light-path-label" x={incidentStart.x - 8} y={incidentStart.y - 5}>{pathLabels.source}</text>
          <circle className="light-path-node" cx="50" cy="50" r="3" />
          <text className="light-path-label" x="52" y="56">{pathLabels.object}</text>
        </>}
        {(config.showEye || tracePath) && <g data-testid="eye-receiver" className="eye-receiver" transform={`translate(${eyePoint.x} ${eyePoint.y})`}><ellipse rx="6" ry="3.5" /><circle r="1.5" /><text x="7" y="-4">{tracePath ? pathLabels.eye : 'Eye receiver'}</text></g>}
      </svg>
    </div>
    {(config.showEye || tracePath) && <p className="eye-copy">Eye receiver: a labelled schematic on the reflected path, not a claim that the app observed vision.</p>}
    {tracePath ? <div className="light-path-controls">
      <button aria-label="Trace committed light path" disabled={selectedPath.length !== 3 || pathCommitted} onClick={commitPath}>Trace committed light path</button>
    </div> : <div className="light-controls" aria-label="Reflection angle controls">
      <button aria-label="Decrease incident angle" disabled={angle === 0} onClick={() => change(angle - 1)}>Angle −</button>
      <button aria-label="Increase incident angle" disabled={angle === 90} onClick={() => change(angle + 1)}>Angle +</button>
      <button aria-label="Check reflection" onClick={check}>Check reflection</button>
    </div>}
    <button className="light-reset" onClick={reset}>Start over</button>
    <p role="status">{tracePath ? status : (visiblyComplete ? 'Reflection target is currently correct.' : checked ? (config.targetAngle === undefined ? `The incident and reflected angles are both ${angle}°.` : `The angles are equal at ${angle}°, but this is not the target yet.`) : `Adjust the incident angle. The reflected angle matches it at ${angle}°.`)}</p>
  </section>;
}
