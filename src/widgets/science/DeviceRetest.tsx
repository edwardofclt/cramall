import { useState, type CSSProperties } from 'react';
import type { WidgetProps } from '../registry';
import { ActivityWorkbench } from '../ActivityWorkbench';
import { useCompletionLatch } from '../useCompletionLatch';
import './device-retest.css';

type ChangeId = 'clip' | 'battery' | 'lamp';
type PlanResult = 'multiple' | 'other' | 'clip' | null;
type ReasonChoice = 'supported' | 'overreach' | null;

const CHANGES: { id: ChangeId; label: string; buttonLabel: string }[] = [
  { id: 'clip', label: 'Loose clip → firm clip', buttonLabel: 'Change the loose clip' },
  { id: 'battery', label: 'Battery', buttonLabel: 'Change the battery' },
  { id: 'lamp', label: 'Lamp', buttonLabel: 'Change the lamp' },
];

function metCount(records: number[], goal: number) {
  return records.filter(value => value >= goal).length;
}

function TrialTable({ label, records, goal, showJudgment }: { label: string; records: number[]; goal: number; showJudgment: boolean }) {
  return <table className="dr-table" aria-label={label}>
    <thead><tr><th scope="col">Trial</th><th scope="col">Lit time</th>{showJudgment && <th scope="col">Goal</th>}</tr></thead>
    <tbody>{records.map((seconds, index) => <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{seconds} seconds</td>
      {showJudgment && <td>{seconds >= goal ? 'Met' : 'Missed'}</td>}
    </tr>)}</tbody>
  </table>;
}

function TrialBars({ kind, records, goal }: { kind: 'Original' | 'Supplied retest'; records: number[]; goal: number }) {
  const values = records.join(', ').replace(/, ([^,]*)$/, ', and $1');
  return <div className="dr-chart" role="img" aria-label={`${kind} trial bars show ${values} seconds compared with the ${goal}-second goal.`}>
    <div className="dr-plot-region" aria-hidden="true">
      <div className="dr-goal-line"><span>{goal}s goal</span></div>
      <div className="dr-bars">
        {records.map((seconds, index) => <div className="dr-bar-wrap" key={index}>
          <span className="dr-value" style={{ '--dr-height': `${Math.min(seconds / goal, 1) * 100}%` } as CSSProperties}>{seconds}s</span>
          <span className="dr-bar" data-seconds={seconds} style={{ '--dr-height': `${Math.min(seconds / goal, 1) * 100}%` } as CSSProperties} />
          <small>T{index + 1}</small>
        </div>)}
      </div>
    </div>
  </div>;
}

function CircuitCard({ version, firm, note }: { version: string; firm: boolean; note: string }) {
  return <div className="dr-circuit-card" data-firm={firm ? 'yes' : 'no'}>
    <strong>{version}</strong>
    <svg viewBox="0 0 220 118" role="img" aria-label={`${version} circuit setup. ${firm ? 'Clip fitted firmly.' : 'One clip fitted loosely.'}`}>
      <path className="dr-wire" d="M39 83 H72 M91 83 H148 M168 83 H190 V31 H151" />
      <path className="dr-wire" d="M130 31 H39 V83" />
      <rect className="dr-battery" x="72" y="70" width="19" height="26" rx="3" />
      <path className="dr-battery-mark" d="M76 66 H87 M81.5 61 V71" />
      <circle className="dr-lamp" cx="140" cy="31" r="18" />
      <path className="dr-filament" d="M130 32 Q140 22 150 32 M136 46 V50 M144 46 V50" />
      <circle className="dr-terminal" cx="158" cy="83" r="8" />
      <g className="dr-clip">
        <path d={firm ? 'M157 83 L187 72' : 'M165 76 L192 62'} />
        <circle cx={firm ? 158 : 165} cy={firm ? 83 : 76} r="4" />
      </g>
      <text x="110" y="112">battery</text>
      <text x="140" y="8">lamp</text>
      <text x="181" y="101">{firm ? 'firm clip' : 'loose clip'}</text>
    </svg>
    <span>{note}</span>
  </div>;
}

export default function DeviceRetest(props: WidgetProps<'device-retest'>) {
  return <DeviceRetestActivity key={JSON.stringify(props.config)} {...props} />;
}

function DeviceRetestActivity({ config, onEvent }: WidgetProps<'device-retest'>) {
  const configKey = JSON.stringify(config);
  const [attempt, setAttempt] = useState(0);
  const [gap, setGap] = useState<'correct' | 'retry' | null>(null);
  const [changes, setChanges] = useState<ChangeId[]>([]);
  const [planResult, setPlanResult] = useState<PlanResult>(null);
  const [inspected, setInspected] = useState(false);
  const [evidenceBefore, setEvidenceBefore] = useState('');
  const [evidenceAfter, setEvidenceAfter] = useState('');
  const [steadyChoice, setSteadyChoice] = useState<'steady' | 'changed' | null>(null);
  const [evidenceResult, setEvidenceResult] = useState<'retry' | 'correct' | null>(null);
  const [claim, setClaim] = useState<ReasonChoice>(null);
  const [limit, setLimit] = useState<ReasonChoice>(null);
  const [claimResult, setClaimResult] = useState<'retry' | 'complete' | null>(null);
  const { completeOnce } = useCompletionLatch(`${configKey}:${attempt}`);
  const beforeMet = metCount(config.before, config.goalSeconds);
  const afterMet = metCount(config.after, config.goalSeconds);
  const complete = claimResult === 'complete';

  function clearState() {
    setGap(null);
    setChanges([]);
    setPlanResult(null);
    setInspected(false);
    setEvidenceBefore('');
    setEvidenceAfter('');
    setSteadyChoice(null);
    setEvidenceResult(null);
    setClaim(null);
    setLimit(null);
    setClaimResult(null);
  }

  function identifyGap(answer: 'correct' | 'retry') {
    if (answer !== gap) {
      setChanges([]);
      setPlanResult(null);
      setInspected(false);
      setEvidenceBefore('');
      setEvidenceAfter('');
      setSteadyChoice(null);
      setEvidenceResult(null);
      setClaim(null);
      setLimit(null);
      setClaimResult(null);
    }
    setGap(answer);
    onEvent({ type: 'interaction', action: 'identify-gap' });
    onEvent({ type: 'coach', cue: answer === 'correct' ? 'strategy' : 'retry' });
  }

  function toggleChange(id: ChangeId) {
    const next = changes.includes(id) ? changes.filter(change => change !== id) : [...changes, id];
    setChanges(next);
    setPlanResult(null);
    setInspected(false);
    setEvidenceBefore('');
    setEvidenceAfter('');
    setSteadyChoice(null);
    setEvidenceResult(null);
    setClaim(null);
    setLimit(null);
    setClaimResult(null);
    onEvent({ type: 'interaction', action: 'change-plan' });
    onEvent({ type: 'change', value: { changes: next } });
  }

  function checkPlan() {
    onEvent({ type: 'interaction', action: 'check-plan' });
    if (changes.length !== 1) {
      setPlanResult('multiple');
      onEvent({ type: 'coach', cue: 'retry' });
    } else if (changes[0] !== 'clip') {
      setPlanResult('other');
      onEvent({ type: 'coach', cue: 'strategy' });
    } else {
      setPlanResult('clip');
      onEvent({ type: 'coach', cue: 'strategy' });
    }
  }

  function inspectRetest() {
    setInspected(true);
    onEvent({ type: 'interaction', action: 'inspect-retest' });
    onEvent({ type: 'coach', cue: 'milestone' });
  }

  function reviseEvidence(update: () => void) {
    update();
    setEvidenceResult(null);
    setClaim(null);
    setLimit(null);
    setClaimResult(null);
  }

  function checkEvidence() {
    onEvent({ type: 'interaction', action: 'explain' });
    if (Number(evidenceBefore) === beforeMet && Number(evidenceAfter) === afterMet && steadyChoice === 'steady') {
      setEvidenceResult('correct');
      onEvent({ type: 'coach', cue: 'milestone' });
    } else {
      setEvidenceResult('retry');
      onEvent({ type: 'coach', cue: 'retry' });
    }
  }

  function checkClaim() {
    onEvent({ type: 'interaction', action: 'explain' });
    if (claim === 'supported' && limit === 'supported') {
      setClaimResult('complete');
      completeOnce(() => onEvent({ type: 'complete', value: { metBefore: beforeMet, metAfter: afterMet } }));
    } else {
      setClaimResult('retry');
      onEvent({ type: 'coach', cue: 'retry' });
    }
  }

  function reset() {
    clearState();
    setAttempt(value => value + 1);
    onEvent({ type: 'interaction', action: 'reset' });
    onEvent({ type: 'change', value: { changes: [] } });
  }

  const proposedNote = changes.includes('clip')
    ? 'Firmly fitted clip shown in the proposed setup.'
    : changes.length === 0 ? 'No proposed change yet.' : `${changes.map(id => CHANGES.find(item => item.id === id)?.label).join(' and ')} selected.`;

  return <section className="card widget-experiment activity-shell science-activity device-retest" data-testid="widget-device-retest" data-state={complete ? 'complete' : inspected ? 'comparing' : 'planning'}>
    <ActivityWorkbench label="Compare a device retest" visualScrollable revealKey={complete ? 'complete' : evidenceResult === 'correct' ? 'claim' : evidenceResult === 'retry' ? 'evidence-retry' : inspected ? 'records' : planResult ?? gap ?? 'gap'} visual={<>
      <div className="dr-visual-heading">
        <div><p className="dr-kicker">Controlled comparison</p><h3>{config.title}</h3></div>
        <span className="dr-provenance">Supplied practice records</span>
      </div>
      <p className="dr-goal">Goal: stay lit for all {config.goalSeconds} seconds in each trial.</p>
      <div className="dr-circuits">
        <CircuitCard version="Original setup" firm={false} note="One clip was loosely fitted." />
        <CircuitCard version="Proposed setup" firm={changes.includes('clip')} note={proposedNote} />
      </div>
      <p className="dr-diagram-note">Setup diagram only — this is not a measurement of energy.</p>
      <div className="dr-record-plots">
        <div><h4>Original</h4><TrialBars kind="Original" records={config.before} goal={config.goalSeconds} /></div>
        {inspected && <div><h4>One-clip retest</h4><TrialBars kind="Supplied retest" records={config.after} goal={config.goalSeconds} /></div>}
      </div>
    </>}>
      <section className="dr-task">
        <h4>1 · Find the original gap</h4>
        <p>Original setup note: {config.setupNote.split('. ')[0]}.</p>
        <TrialTable label="Original records" records={config.before} goal={config.goalSeconds} showJudgment={gap === 'correct'} />
        <div className="dr-choice-row" role="group" aria-label="Original performance gap">
          <button type="button" onClick={() => identifyGap('correct')}>{beforeMet} of {config.before.length} trials met the goal</button>
          <button type="button" onClick={() => identifyGap('retry')}>All trials met the goal</button>
        </div>
        {gap && <p role="status" aria-label="Original gap feedback" data-outcome={gap === 'correct' ? 'correct' : 'retry'}>{gap === 'correct'
          ? `Original record saved: ${beforeMet} of ${config.before.length} trials met the ${config.goalSeconds}-second goal.`
          : `Check every trial against the ${config.goalSeconds}-second goal. Each original time is shorter.`}</p>}
      </section>

      {gap === 'correct' && <section className="dr-task" data-activity-reveal>
        <h4>2 · Plan one change</h4>
        <p>Select what the new version changes. Everything else should stay steady.</p>
        <div className="dr-change-grid" role="group" aria-label="Proposed device changes">
          {CHANGES.map(change => <button type="button" key={change.id} aria-label={change.buttonLabel} aria-pressed={changes.includes(change.id)} onClick={() => toggleChange(change.id)}>
            <span>{change.label}</span><small>{changes.includes(change.id) ? 'Selected change' : 'Keep steady'}</small>
          </button>)}
        </div>
        <button type="button" className="dr-primary" disabled={changes.length === 0} onClick={checkPlan}>Check my change plan</button>
        {planResult && <p role="status" aria-label="Plan feedback" data-outcome={planResult === 'multiple' ? 'retry' : planResult === 'clip' ? 'correct' : undefined}>{planResult === 'multiple'
          ? 'With several changes at once, which one could explain a difference? Try a one-feature plan.'
          : planResult === 'other'
            ? 'Potentially valid one-change plan. Outcome: Needs a new test. This packet has no retest for that change.'
            : 'Controlled plan saved: only the loose clip changes. The supplied packet records this comparison.'}</p>}
        {planResult === 'clip' && !inspected && <button type="button" className="dr-primary" onClick={inspectRetest}>Inspect the supplied retest</button>}
      </section>}

      {inspected && <section className="dr-task dr-notebook" data-activity-reveal>
        <h4>3 · Compare the evidence notebook</h4>
        <p className="dr-record-source">Record source: <strong>Supplied practice records</strong></p>
        <aside className="dr-setup-source" aria-label="Supplied setup record">
          <strong>Supplied setup record</strong>
          <p>{config.setupNote}</p>
          <p>Held constant in these supplied trials: {config.heldConstant.join(', ')}.</p>
        </aside>
        <dl>
          <div><dt>Change</dt><dd>Loosely fitted clip replaced with a firmly fitting clip</dd></div>
          <div><dt>First results</dt><dd>{beforeMet} of {config.before.length} met the {config.goalSeconds}-second goal</dd></div>
          <div><dt>Retest results</dt><dd>{complete ? `${afterMet} of ${config.after.length} met the ${config.goalSeconds}-second goal` : evidenceResult === 'correct' ? `${evidenceAfter} of ${config.after.length} recorded in your evidence notes` : 'Add this count from the retest record below'}</dd></div>
          <div><dt>Held steady</dt><dd>{evidenceResult === 'correct' ? config.heldConstant.join(', ') : 'Choose which setup conditions stayed the same'}</dd></div>
        </dl>
        <TrialTable label="Supplied retest records" records={config.after} goal={config.goalSeconds} showJudgment={complete} />
        <section className="dr-evidence-check" aria-labelledby="dr-evidence-title">
          <h5 id="dr-evidence-title">Cite the records</h5>
          <div className="dr-evidence-counts">
            <label>Original trials meeting the goal<input type="number" min="0" max={config.before.length} value={evidenceBefore} onChange={event => reviseEvidence(() => setEvidenceBefore(event.target.value))} /></label>
            <label>Retest trials meeting the goal<input type="number" min="0" max={config.after.length} value={evidenceAfter} onChange={event => reviseEvidence(() => setEvidenceAfter(event.target.value))} /></label>
          </div>
          <fieldset>
            <legend>What stayed steady?</legend>
            <label><input type="radio" name={`steady-${attempt}`} checked={steadyChoice === 'steady'} onChange={() => reviseEvidence(() => setSteadyChoice('steady'))} /> {config.heldConstant.join(', ')} stayed the same.</label>
            <label><input type="radio" name={`steady-${attempt}`} checked={steadyChoice === 'changed'} onChange={() => reviseEvidence(() => setSteadyChoice('changed'))} /> Battery, lamp, and clip all changed.</label>
          </fieldset>
          <button type="button" className="dr-primary" disabled={evidenceBefore === '' || evidenceAfter === '' || !steadyChoice} onClick={checkEvidence}>Check my evidence notes</button>
          {evidenceResult && <p role="status" aria-label="Evidence notes feedback" data-outcome={evidenceResult}>{evidenceResult === 'correct'
            ? 'Evidence notes saved: you cited both record sets and the held-steady conditions.'
            : `Check both counts against the ${config.goalSeconds}-second goal and identify which conditions stayed steady.`}</p>}
        </section>
        {evidenceResult === 'correct' && <section className="dr-claim-check" data-activity-reveal>
          <h5>Make a limited claim</h5>
          <fieldset>
            <legend>Supported claim</legend>
            <label><input type="radio" name={`claim-${attempt}`} checked={claim === 'supported'} onChange={() => { setClaim('supported'); setClaimResult(null); }} /> This one-clip version performed better in these supplied trials.</label>
            <label><input type="radio" name={`claim-${attempt}`} checked={claim === 'overreach'} onChange={() => { setClaim('overreach'); setClaimResult(null); }} /> This clip will never flicker again.</label>
          </fieldset>
          <fieldset>
            <legend>Limit</legend>
            <label><input type="radio" name={`limit-${attempt}`} checked={limit === 'supported'} onChange={() => { setLimit('supported'); setClaimResult(null); }} /> Three retest trials cannot show what will happen every time.</label>
            <label><input type="radio" name={`limit-${attempt}`} checked={limit === 'overreach'} onChange={() => { setLimit('overreach'); setClaimResult(null); }} /> The app proved the loose clip caused every failure.</label>
          </fieldset>
          <button type="button" className="dr-primary" disabled={!claim || !limit} onClick={checkClaim}>Check my evidence claim</button>
          {claimResult && <p role="status" aria-label="Claim feedback" data-outcome={claimResult === 'complete' ? 'correct' : 'retry'}>{claimResult === 'complete'
            ? `Supported: this version performed better in these trials (${beforeMet} of ${config.before.length} before; ${afterMet} of ${config.after.length} after). The three supplied retest records cannot promise what will happen every time.`
            : 'That claim or limit goes beyond these supplied records. Compare both sets, then say only what these trials support.'}</p>}
        </section>}
      </section>}

      <button type="button" className="dr-reset" onClick={reset}>Start over</button>
    </ActivityWorkbench>
  </section>;
}
