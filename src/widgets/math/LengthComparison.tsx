import { useEffect, useState } from 'react';
import { ActivityWorkbench } from '../ActivityWorkbench';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';
import './guide-led-math.css';

type Relation = 'longer' | 'equal' | 'shorter';
export default function LengthComparison({ config, onEvent }: WidgetProps<'balance-scale'>) {
  const { feet, inches } = config.lengthModel!;
  const key = JSON.stringify(config);
  const [prediction, setPrediction] = useState<Relation | null>(null);
  const [built, setBuilt] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [checked, setChecked] = useState<number | null>(null);
  const { completeOnce } = useCompletionLatch(key);
  const observed = built === feet;
  const truth: Relation = feet * 12 > inches ? 'longer' : feet * 12 < inches ? 'shorter' : 'equal';
  const complete = observed && checked === 12;
  useEffect(() => { setPrediction(null); setBuilt(0); setExplanation(''); setChecked(null); }, [key]);
  const width = Math.max(feet * 12, inches);
  function addStrip() {
    if (!prediction || observed) return;
    const next = built + 1; setBuilt(next);
    onEvent({ type: 'interaction', action: 'add-weight' });
    onEvent({ type: 'change', value: { leftTotal: next * 12, rightTotal: inches } });
    if (next === feet) onEvent({ type: 'coach', cue: 'milestone' });
  }
  return <section className="card widget-experiment balance activity-shell math-activity" data-testid="widget-balance-scale" data-state={complete ? 'complete' : 'comparing'} data-complete={complete ? 'yes' : 'no'}>
    <ActivityWorkbench label="Compare feet and inches" revealKey={observed ? "explain" : prediction ? "build" : "predict"} visual={<>
      <h3>Two ways to name a length</h3><p>Compare {feet} feet with {inches} inches.</p>
      <div className="math-length-surface" role="img" aria-label={`Length model. ${built} of ${feet} foot strips built, each divided into 12 equal inch spaces. Reference strip: ${inches} inches.`}>
        <strong>{feet}-foot length</strong><div className="math-length-track" style={{ width: `${feet * 12 / width * 100}%` }}>{Array.from({ length: feet }, (_, index) => <div className="math-foot-strip" data-testid={index < built ? 'built-foot-strip' : undefined} data-built={index < built} style={{ width: `${100 / feet}%` }} key={index}>{index < built ? Array.from({ length: 12 }, (_, inch) => <span key={inch} />) : <span className="math-empty-strip" />}</div>)}</div>
        <strong>{inches}-inch length</strong><div className="math-length-track math-inch-reference" style={{ width: `${inches / width * 100}%` }}>{Array.from({ length: inches }, (_, inch) => <span key={inch} />)}</div>
        <p>Both strips start at the same line. Each small space is one inch.</p>
      </div>
      {observed && <p aria-label="Length observation">{feet} feet {truth === 'equal' ? '=' : truth === 'longer' ? '>' : '<'} {inches} inches. The {feet} foot strips contain {feet * 12} inch spaces.</p>}
    </>}>
      <section className="math-task"><h4>1 · Predict the comparison</h4><p>Which length do you expect to be longer?</p>{([['longer', 'The feet length is longer'], ['equal', 'The lengths are equal'], ['shorter', 'The inches length is longer']] as const).map(([value, label]) => <button type="button" key={value} aria-pressed={prediction === value} disabled={built > 0} onClick={() => { if (prediction !== value) { setPrediction(value); onEvent({ type: 'coach', cue: 'strategy' }); } }}>{label}</button>)}
        <p aria-label="Length prediction feedback">{observed ? prediction === truth ? 'Your prediction matched the model.' : 'Your prediction was different from the model. Compare the aligned endpoints.' : prediction ? 'Prediction saved. Build the foot strips to compare.' : 'Choose an idea before you build.'}</p>
      </section>
      <section className="math-task" data-activity-reveal={prediction && !observed ? "" : undefined}><h4>2 · Build and observe</h4><button type="button" disabled={!prediction || observed} onClick={addStrip}>Add one foot strip</button><p>{built} of {feet} foot strips built.</p></section>
      {observed && <section className="math-task" data-activity-reveal><h4>3 · Explain with equal units</h4><p>Count the inch spaces in one foot strip. What factor changes feet into inches?</p><label>Inches in one foot<input type="number" min="1" value={explanation} onChange={event => { setExplanation(event.target.value); setChecked(null); }} /></label><button type="button" disabled={!explanation.trim()} onClick={() => { const answer = Number(explanation); setChecked(answer); if (answer === 12) completeOnce(() => onEvent({ type: 'complete', value: { leftTotal: feet * 12, rightTotal: inches } })); else onEvent({ type: 'coach', cue: 'retry' }); }}>Explain the comparison</button><p aria-label="Length explanation feedback" role="status" data-outcome={checked === null ? undefined : checked === 12 ? 'correct' : 'retry'}>{checked === null ? 'Use the equal inch spaces to explain.' : checked === 12 ? `Correct. ${feet} × 12 = ${feet * 12} inches. Now both measurements use the same unit.` : 'Try again. Count the equal inch spaces in one complete foot strip.'}</p></section>}
      <button type="button" onClick={() => { setPrediction(null); setBuilt(0); setExplanation(''); setChecked(null); onEvent({ type: 'interaction', action: 'reset' }); onEvent({ type: 'change', value: { leftTotal: 0, rightTotal: inches } }); }}>Start over</button>
    </ActivityWorkbench>
  </section>;
}
