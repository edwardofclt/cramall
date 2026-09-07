import { ActivityWorkbench } from '../ActivityWorkbench';
import './guide-led-science.css';
import { useEffect, useState } from 'react';
import { useReducedMotionPref } from '../../app/useReducedMotionPref';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

type WaveValues = { amplitude: number; frequency: number };


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
  const [compared, setCompared] = useState<WaveValues | null>(null);
  const [explained, setExplained] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [wave, setWave] = useState<WaveValues>(initial);
  const [hasChanged, setHasChanged] = useState(false);

  const { completeOnce } = useCompletionLatch(key);
  const matches = (values: WaveValues) => !!config.target
    && (config.target.amplitude === undefined || values.amplitude === config.target.amplitude)
    && (config.target.frequency === undefined || values.frequency === config.target.frequency);
  const visiblyComplete = hasChanged && matches(wave) && explained;
  const targetAmplitude = config.target?.amplitude;
  const targetFrequency = config.target?.frequency;

  useEffect(() => { setWave(initial); setHasChanged(false); setCompared(null);setExplained(false);setFeedback(''); }, [key]);

  const commit = (next: WaveValues, action: 'change-amplitude' | 'change-frequency') => {
    setWave(next);
    setHasChanged(true);
    onEvent({ type: 'interaction', action });
    onEvent({ type: 'change', value: next });
    setCompared(null); setExplained(false); setFeedback('');
  };
  const reset = () => {
    setWave(initial);
    setHasChanged(false);
    setCompared(null);setExplained(false);setFeedback('');
    onEvent({ type: 'interaction', action: 'reset' });
    onEvent({ type: 'change', value: initial });
  };
  const graphLabel = `Wave graph with a baseline. Amplitude ${wave.amplitude}; frequency ${wave.frequency} cycles across the fixed width.`;

  return <section className="card widget-experiment wave activity-shell science-activity" data-testid="widget-wave-maker" data-amplitude={wave.amplitude} data-frequency={wave.frequency} data-motion={reduced ? 'off' : 'on'} data-state={visiblyComplete ? 'complete' : 'changing'}>
    <ActivityWorkbench label="Wave model" revealKey={compared ? 'explain' : 'setup'} visual={<>
    <header><h3>Wave maker graph</h3><p className="science-model-label">Model only · not physical evidence</p></header>
    <div className="wave-values" aria-label={`Current wave values: amplitude ${wave.amplitude}, frequency ${wave.frequency} cycles`}>
      <strong>Amplitude: {wave.amplitude}</strong><span aria-hidden="true">↕</span>
      <strong>Frequency: {wave.frequency} cycle{wave.frequency === 1 ? '' : 's'}</strong><span aria-hidden="true">↔</span>
    </div>

    <div className="wave-graph" role="img" aria-label={graphLabel}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 100 100" preserveAspectRatio="none" data-static={reduced ? 'yes' : 'no'}>
        <line className="wave-axis" x1="0" x2="100" y1="50" y2="50" />
        <line className="wave-axis wave-y-axis" x1="0" x2="0" y1="0" y2="100" />
        {targetAmplitude !== undefined && <>
          <line className="wave-target-line" data-testid="wave-target-amplitude" data-target-amplitude={targetAmplitude} x1="0" x2="100" y1={50 - targetAmplitude * 3} y2={50 - targetAmplitude * 3} />
          <line className="wave-target-line" data-testid="wave-target-amplitude-trough" x1="0" x2="100" y1={50 + targetAmplitude * 3} y2={50 + targetAmplitude * 3} />
        </>}
        {targetFrequency !== undefined && <g className="wave-target-frequency" data-testid="wave-target-frequency" data-target-frequency={targetFrequency} aria-label={`Target frequency marker: ${targetFrequency} cycles across this width`}>
          {Array.from({ length: targetFrequency + 1 }, (_, index) => <line key={index} x1={(index * 100) / targetFrequency} x2={(index * 100) / targetFrequency} y1="46" y2="54" />)}
        </g>}
        <polyline className="wave-before" aria-label="Starting wave pattern" points={sampleWave(initial.amplitude, initial.frequency)}/><polyline className="wave-line" data-testid="wave-geometry" points={sampleWave(wave.amplitude, wave.frequency)} />
        {config.medium === 'water' && <circle className="wave-marker" cx="12.5" cy={50-Math.sin(2*Math.PI*wave.frequency*.125)*wave.amplitude*3} r="2.3"/>}
      </svg>
      <span className="wave-baseline-label">Baseline / no displacement</span>
    </div>
      <p>The dashed pattern keeps your starting wave visible. The solid pattern follows your controls.</p>
    </>}>
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
    <button aria-label="Compare wave patterns" disabled={!hasChanged} onClick={() => {if(compared && compared.amplitude===wave.amplitude && compared.frequency===wave.frequency){onEvent({type:'interaction',action:'compare'});return;}setCompared({...wave});setExplained(false);setFeedback(matches(wave) ? 'Target matched. Explain the change you can see.' : 'Try again: compare the solid pattern with the target marks, then adjust.');onEvent({type:'interaction',action:'compare'});onEvent({type:'coach',cue:matches(wave)?'milestone':'retry'});}}>Compare wave patterns</button>
    {compared && <section className="science-feedback" data-activity-reveal><h4>Compare and explain</h4><p aria-label="Wave comparison">Starting amplitude {initial.amplitude}; compared amplitude {compared.amplitude}. Starting cycles {initial.frequency}; compared cycles {compared.frequency}.</p>{matches(wave) && <><p>When amplitude grows, which change describes the pattern?</p><button onClick={() => {setExplained(false);setFeedback('Try again. Compare a crest with the baseline, rather than counting cycles.');onEvent({type:'coach',cue:'retry'});}}>Only the number of cycles grows</button><button aria-label="The crests moved farther from the baseline" onClick={() => {setExplained(true);setFeedback('You compared the vertical distance from the baseline. A larger amplitude reaches farther above and below it.');onEvent({type:'interaction',action:'explain'});completeOnce(()=>onEvent({type:'complete',value:wave}));}}>The crests moved farther from the baseline</button></>}<p aria-label="Wave explanation feedback" data-outcome={feedback.startsWith('Try again') ? 'retry' : explained ? 'correct' : undefined}>{feedback}</p></section>}
    <button className="wave-reset" onClick={reset}>Start over</button>
    <p role="status">{visiblyComplete ? 'Wave target is currently matched.' : `${config.medium}: amplitude ${wave.amplitude}, frequency ${wave.frequency}.`}</p>
    <section className="science-model-notes" aria-label="About this model"><h4>About this model</h4>

      <p><strong>Simplified wave model.</strong> Amplitude changes vertical displacement from the baseline. Frequency changes the number of complete cycles across the same fixed width.</p>
      <p>{mediumExplanation(config.medium)}</p>
    </section>
    </ActivityWorkbench>
  </section>;
}
