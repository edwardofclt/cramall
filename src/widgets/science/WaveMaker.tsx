import { useEffect, useState } from 'react';
import { useReducedMotionPref } from '../../app/useReducedMotionPref';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type WaveValues = { amplitude: number; frequency: number };
type CoachPhase = 'none' | 'strategy' | 'retry';

const sampleWave = (amplitude: number, frequency: number) => Array.from({ length: 81 }, (_, index) => {
  const x = index * 1.25;
  const y = 50 - Math.sin((2 * Math.PI * frequency * x) / 100) * amplitude * 3;
  return `${x.toFixed(2)},${y.toFixed(2)}`;
}).join(' ');

function mediumExplanation(medium: 'rope' | 'water' | 'sound') {
  if (medium === 'sound') return 'For sound, this curve is a simplified graph of changing relative pressure or displacement—not the visible shape of air and not direct evidence.';
  return `For ${medium}, this is a simplified side-view pattern, not a photo or direct evidence of every part of the medium.`;
}

export default function WaveMaker({ config, onEvent }: WidgetProps<'wave-maker'>) {
  const reduced = useReducedMotionPref();
  const key = JSON.stringify(config);
  const initial: WaveValues = { amplitude: config.amplitude ?? 1, frequency: config.frequency ?? 1 };
  const [wave, setWave] = useState<WaveValues>(initial);
  const [hasChanged, setHasChanged] = useState(false);
  const [coachPhase, setCoachPhase] = useState<CoachPhase>('none');
  const { completeOnce } = useCompletionLatch(key);
  const matches = (values: WaveValues) => !!config.target
    && (config.target.amplitude === undefined || values.amplitude === config.target.amplitude)
    && (config.target.frequency === undefined || values.frequency === config.target.frequency);
  const visiblyComplete = hasChanged && matches(wave);
  const targetAmplitude = config.target?.amplitude;
  const targetFrequency = config.target?.frequency;

  useEffect(() => { setWave(initial); setHasChanged(false); setCoachPhase('none'); }, [key]);

  const commit = (next: WaveValues, action: 'change-amplitude' | 'change-frequency') => {
    setWave(next);
    setHasChanged(true);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: next });
    if (matches(next)) {
      completeOnce(() => onEvent({ type: 'complete', value: next }));
    } else if (config.target && coachPhase === 'none') {
      setCoachPhase('strategy');
      onEvent({ type: 'coach', cue: 'strategy' });
    } else if (config.target && coachPhase === 'strategy') {
      setCoachPhase('retry');
      onEvent({ type: 'coach', cue: 'retry' });
    }
  };
  const reset = () => {
    setWave(initial);
    setHasChanged(false);
    setCoachPhase('none');
    onEvent({ type: 'interaction', action: 'reset' });
    onEvent({ type: 'change', value: initial });
  };
  const graphLabel = `Wave graph with a baseline. Amplitude ${wave.amplitude}; frequency ${wave.frequency} cycles across the fixed width.`;

  return <section className="card widget-experiment wave" data-testid="widget-wave-maker" data-amplitude={wave.amplitude} data-frequency={wave.frequency} data-motion={reduced ? 'off' : 'on'} data-state={visiblyComplete ? 'complete' : 'changing'}>
    <header>
      <h3>Wave maker graph</h3>
      <p><strong>Simplified wave model.</strong> Amplitude changes vertical displacement from the baseline. Frequency changes the number of complete cycles across the same fixed width.</p>
      <p>{mediumExplanation(config.medium)}</p>
    </header>
    <div className="wave-values" aria-label={`Current wave values: amplitude ${wave.amplitude}, frequency ${wave.frequency} cycles`}>
      <strong>Amplitude: {wave.amplitude}</strong><span aria-hidden="true">↕</span>
      <strong>Frequency: {wave.frequency} cycle{wave.frequency === 1 ? '' : 's'}</strong><span aria-hidden="true">↔</span>
    </div>
    <div className="wave-targets" aria-label="Authored wave targets">
      <strong>Goal:</strong>
      {targetAmplitude !== undefined && <span>Target amplitude: {targetAmplitude}</span>}
      {targetFrequency !== undefined && <span>Target frequency: {targetFrequency} cycles across this width</span>}
      <span>Read amplitude as vertical displacement from the baseline; read frequency as cycles across this fixed width.</span>
    </div>
    <div className="wave-controls" aria-label="Wave controls">
      <button aria-label="Decrease amplitude" disabled={wave.amplitude === 1} onClick={() => commit({ ...wave, amplitude: wave.amplitude - 1 }, 'change-amplitude')}>Amplitude −</button>
      <button aria-label="Increase amplitude" disabled={wave.amplitude === 10} onClick={() => commit({ ...wave, amplitude: wave.amplitude + 1 }, 'change-amplitude')}>Amplitude +</button>
      <button aria-label="Decrease frequency" disabled={wave.frequency === 1} onClick={() => commit({ ...wave, frequency: wave.frequency - 1 }, 'change-frequency')}>Frequency −</button>
      <button aria-label="Increase frequency" disabled={wave.frequency === 10} onClick={() => commit({ ...wave, frequency: wave.frequency + 1 }, 'change-frequency')}>Frequency +</button>
    </div>
    <div className="wave-graph" role="img" aria-label={graphLabel}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 100 100" data-static={reduced ? 'yes' : 'no'}>
        <line className="wave-axis" x1="0" x2="100" y1="50" y2="50" />
        <line className="wave-axis wave-y-axis" x1="0" x2="0" y1="0" y2="100" />
        {targetAmplitude !== undefined && <>
          <line className="wave-target-line" data-testid="wave-target-amplitude" data-target-amplitude={targetAmplitude} x1="0" x2="100" y1={50 - targetAmplitude * 3} y2={50 - targetAmplitude * 3} />
          <line className="wave-target-line" data-testid="wave-target-amplitude-trough" x1="0" x2="100" y1={50 + targetAmplitude * 3} y2={50 + targetAmplitude * 3} />
        </>}
        {targetFrequency !== undefined && <g className="wave-target-frequency" data-testid="wave-target-frequency" data-target-frequency={targetFrequency} aria-label={`Target frequency marker: ${targetFrequency} cycles across this width`}>
          {Array.from({ length: targetFrequency + 1 }, (_, index) => <line key={index} x1={(index * 100) / targetFrequency} x2={(index * 100) / targetFrequency} y1="46" y2="54" />)}
        </g>}
        <polyline className="wave-line" data-testid="wave-geometry" points={sampleWave(wave.amplitude, wave.frequency)} />
      </svg>
      <span className="wave-baseline-label">Baseline / no displacement</span>
    </div>
    <button className="wave-reset" onClick={reset}>Start over</button>
    <p role="status">{visiblyComplete ? 'Wave target is currently matched.' : `${config.medium}: amplitude ${wave.amplitude}, frequency ${wave.frequency}.`}</p>
  </section>;
}
