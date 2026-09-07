import { useEffect, useRef, useState } from 'react';
import { Character } from '../../characters/Character';
import type { WidgetProps } from '../registry';
import { useCompletionLatch } from '../useCompletionLatch';

export default function TuningForkActivity({ config, onEvent }: WidgetProps<'energy-transfer-builder'>) {
  const [prediction, setPrediction] = useState<'still' | 'tremble' | null>(null);
  const [run, setRun] = useState(0);
  const [answer, setAnswer] = useState<'energy' | 'motion' | null>(null);
  const [coach, setCoach] = useState('');
  const first = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const { completeOnce } = useCompletionLatch(JSON.stringify(config));
  useEffect(() => { if (!run) first.current?.focus({ preventScroll: true }); }, [run]);
  useEffect(() => {
    // Reveal the next task inside its panel, without moving the lesson or illustration.
    if (panel.current && run) panel.current.scrollTop = panel.current.scrollHeight;
  }, [run, answer]);

  function predict(value: 'still' | 'tremble') {
    if (prediction === value) return;
    setPrediction(value);
    setCoach('Your prediction is saved. Strike the fork to compare it with the model.');
    onEvent({ type: 'coach', cue: 'strategy' });
  }
  function strike() {
    setRun(value => value + 1);
    if (!run) {
      setCoach('Compare the quiet scene with the strike. What changed in the model?');
      onEvent({ type: 'coach', cue: 'milestone' });
    }
  }
  function explain(value: 'energy' | 'motion') {
    if (answer === value) return;
    setAnswer(value);
    if (value === 'energy') {
      setCoach('Look for a change in the objects. What moved after the strike?');
      onEvent({ type: 'coach', cue: 'retry' });
    } else {
      setCoach('You used a change in motion to explain how sound could transfer energy.');
      completeOnce(() => onEvent({ type: 'complete', value: { path: config.requiredPath } }));
    }
  }
  function reset() {
    setPrediction(null); setRun(0); setAnswer(null); setCoach('');
    if (panel.current) panel.current.scrollTop = 0;
    onEvent({ type: 'interaction', action: 'reset' });
  }

  return <section className="tuning-activity" data-testid="widget-energy-transfer-builder" data-state={answer === 'motion' ? 'complete' : 'building'} aria-label="Tuning fork model">
    <div className="tuning-visual">
      <header><span className="tuning-eyebrow">SANDY’S SOUND LAB · MODEL</span><h3>A tiny tremble</h3><p>One strike. Watch what changes.</p></header>
      <svg key={run} viewBox="0 0 600 380" role="img" aria-label={run ? 'Model after a strike: the fork vibrates and nearby paper bits tremble without touching the fork.' : 'Quiet model: a tuning fork beside paper bits in a shallow tray. A striker waits to the left.'}>
        <defs>
          <linearGradient id="fork-metal" x2="1" y2="0"><stop stopColor="#54747e"/><stop offset=".45" stopColor="#e8f5f4"/><stop offset=".7" stopColor="#9eb8bc"/><stop offset="1" stopColor="#476c78"/></linearGradient>
          <clipPath id="paper-tray"><rect x="332" y="225" width="211" height="64" rx="12"/></clipPath>
        </defs>
        <ellipse cx="300" cy="329" rx="244" ry="17" fill="#b4d2ce" opacity=".45"/>
        <path d="M45 310H560" stroke="#93b7ae" strokeWidth="3"/>
        <rect x="154" y="291" width="135" height="20" rx="10" fill="#244f58"/>
        <rect x="207" y="219" width="27" height="74" rx="8" fill="url(#fork-metal)"/>
        <g className={run ? 'tuning-fork-motion' : ''}>
          <path d="M176 91V189Q176 235 220 235Q264 235 264 189V91" fill="none" stroke="#365964" strokeWidth="22" strokeLinecap="round"/>
          <path d="M176 91V189Q176 235 220 235Q264 235 264 189V91" fill="none" stroke="url(#fork-metal)" strokeWidth="16" strokeLinecap="round"/>
        </g>
        <g className={run ? 'tuning-striker-motion' : ''}>
          <path d="M79 224L125 163" stroke="#9c6640" strokeWidth="14" strokeLinecap="round"/>
          <rect x="106" y="129" width="45" height="40" rx="13" transform="rotate(25 128 149)" fill="#304955"/>
          <path d="M116 137L132 144" stroke="#647c87" strokeWidth="5" strokeLinecap="round"/>
        </g>
        <path d="M324 262H551L537 304H338Z" fill="#b7874d"/>
        <ellipse cx="438" cy="262" rx="114" ry="27" fill="#e9c696" stroke="#9b7040" strokeWidth="4"/>
        <g clipPath="url(#paper-tray)">
          {[ [359,253], [390,260], [419,247], [451,263], [479,248], [513,260], [433,274] ].map(([x,y], i) => <g key={i} className={run ? 'tuning-paper-motion' : ''} style={{ animationDelay: `${.18 + i * .035}s` }}><path d={`M${x} ${y}l14 -3 4 9 -15 3Z`} fill={i % 2 ? '#fff6d6' : '#edf8f6'} stroke="#688f86" strokeWidth="1.5"/></g>)}
        </g>
        <path d="M325 265Q438 309 551 265L546 281Q438 319 330 281Z" fill="#bd915b"/>
        <text x="220" y="355" textAnchor="middle">Tuning fork</text><text x="439" y="355" textAnchor="middle">Paper bits</text>
      </svg>
      <p className="tuning-caption">{run ? 'After the strike: fork vibrates · paper trembles' : 'Before the strike: fork still · paper still'}</p>
      <p className="tuning-boundary">This simplified model shows motion. It is not physical evidence, and energy itself is not visible.</p>
    </div>
    <div className="tuning-tasks" ref={panel} tabIndex={0} aria-label="Sound lab tasks">
      <div className="tuning-task">
        <span className="tuning-eyebrow">1 · PREDICT</span><h4>What will the paper bits do?</h4>
        <button ref={first} type="button" disabled={run > 0} aria-pressed={prediction === 'still'} onClick={() => predict('still')}>They will stay still</button>
        <button type="button" disabled={run > 0} aria-pressed={prediction === 'tremble'} onClick={() => predict('tremble')}>They will tremble</button>
        <p aria-label="Prediction feedback">{run ? prediction === 'tremble' ? 'Your prediction matched the model: the paper trembled.' : 'Your prediction differed from the model: the paper trembled.' : prediction ? 'Prediction saved. Now try the strike.' : 'Choose an idea before you strike.'}</p>
      </div>
      <div className="tuning-task"><span className="tuning-eyebrow">2 · ACT & OBSERVE</span><h4>Strike, then compare</h4>
        <button type="button" className="tuning-strike" disabled={!prediction} onClick={strike}>{run ? 'Replay the strike' : 'Strike the fork'}</button>
        {run > 0 && <p aria-label="Observation">The model showed the paper bits trembling while the fork vibrated. The fork did not touch the paper.</p>}
      </div>
      {run > 0 && <div className="tuning-task"><span className="tuning-eyebrow">3 · EXPLAIN</span><h4>Which change could support a sound-transfer explanation?</h4>
        <button type="button" disabled={answer === 'motion'} aria-pressed={answer === 'energy'} data-outcome={answer === 'energy' ? 'retry' : undefined} onClick={() => explain('energy')}>We saw energy itself{answer === 'energy' && <strong className="tuning-answer-label">Try again</strong>}</button>
        <button type="button" disabled={answer === 'motion'} aria-pressed={answer === 'motion'} data-outcome={answer === 'motion' ? 'correct' : undefined} onClick={() => explain('motion')}>The paper moved without the fork touching it{answer === 'motion' && <strong className="tuning-answer-label">✓ Correct</strong>}</button>
        {answer && <p aria-label="Explanation feedback">{answer === 'motion' ? 'Yes. That motion could support the idea that sound transferred energy. A real observation would be needed as evidence.' : 'Try again: name a change in the objects. Energy itself is not visible.'}</p>}
      </div>}
      <div className="tuning-coaching"><span aria-hidden="true"><Character guide="sandy" pose={answer === 'motion' ? 'cheer' : answer ? 'think' : 'talk'} size={64}/></span><p role="status">{coach || 'Choose your prediction to begin.'}</p></div>
      <button type="button" onClick={reset}>Start over</button>
    </div>
  </section>;
}
