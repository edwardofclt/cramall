import { createContext, useContext, useState, type ReactNode } from 'react';
import type { WidgetProps } from '../../registry';
import { useCompletionLatch } from '../../useCompletionLatch';
import { ActivityWorkbench } from '../../ActivityWorkbench';
import { mathWorkshopSources } from '../../../content/math/workshopActivities';
export type WorkshopProps = WidgetProps<'math-workshop'>;
export type Session = ReturnType<typeof useSession>;
export const ResetContext = createContext<() => void>(() => { });
export function useSession({ config, onEvent }: WorkshopProps) {
    const [feedback, setFeedback] = useState<Record<string, string>>({});
    const [revision, setRevision] = useState(0);
    const [planned, setPlanned] = useState(false);
    const plan = () => { setPlanned(true); setFeedback(v => ({ ...v, prediction: '' })); onEvent({ type: 'interaction', action: 'plan' }); onEvent({ type: 'coach', cue: 'strategy' }); };
    const resetPlan = () => setPlanned(false);
    const { completeOnce } = useCompletionLatch(config.activity);
    const act = () => { setRevision(v => v + 1); setFeedback(v => ({ ...v, explain: '' })); onEvent({ type: 'interaction', action: 'act' }); };
    const say = (phase: string, text: string, valid: boolean) => { setFeedback(v => ({ ...v, [phase]: text })); onEvent({ type: 'interaction', action: phase === 'explain' ? 'explain' : 'check' }); onEvent({ type: 'coach', cue: valid ? 'milestone' : 'retry' }); };
    const clear = (...phases: string[]) => { setFeedback(v => { const next = { ...v }; for (const p of phases)
        delete next[p]; return next; }); act(); };
    const complete = () => { say('explain', 'Activity complete. Your reasoning matches your work.', true); completeOnce(() => onEvent({ type: 'complete', value: { activity: config.activity } })); };
    return { feedback, revision, act, say, clear, complete, planned, plan, resetPlan };
}
export function Surface({ props, visual, children, revealKey }: {
    props: WorkshopProps;
    visual: ReactNode;
    children: ReactNode;
    revealKey?: string | number;
}) {
    const reset = useContext(ResetContext);
    const source = mathWorkshopSources.find(a => a.activity === props.config.activity)!;
    return <ActivityWorkbench className="math-workshop" label={source.title} visualScrollable revealKey={revealKey} visual={<><h3>{source.title}</h3><p className="mw-source">{source.setup}</p>{visual}</>}>{children}<button onClick={reset}>Reset activity</button></ActivityWorkbench>;
}
export function Block({ title, children }: {
    title: string;
    children: ReactNode;
}) { return <section className="mw-task" data-activity-reveal><h4>{title}</h4>{children}</section>; }
export function Choice({ label, value, onChange, options }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: readonly (readonly [
        string,
        string
    ])[];
}) {
    const selectedText = options.find(([id]) => id === value)?.[1];
    return <><label className="mw-field">{label}<select value={value} onChange={e => onChange(e.target.value)}><option value="">Choose…</option>{options.map(([id, text]) => <option value={id} key={id}>{text}</option>)}</select></label>{selectedText && <p className="mw-chosen">Chosen: {selectedText}</p>}</>;
}
export function Entry({ label, value, onChange }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) { return <label className="mw-field">{label}<input type="text" inputMode="text" value={value} onChange={e => onChange(e.target.value)} autoComplete="off"/></label>; }
export function Feedback({ session, phase }: {
    session: Session;
    phase: string;
}) { return <p role="status" className="mw-feedback">{session.feedback[phase] ?? ''}</p>; }
export function Explain({ session, answer, options }: {
    session: Session;
    answer: string;
    options: readonly (readonly [
        string,
        string
    ])[];
}) {
    const [value, setValue] = useState('');
    return <Block title="Explain the result"><Choice label="Explain your work" value={value} onChange={v => { setValue(v); session.clear('explain'); }} options={options}/><button onClick={() => value === answer ? session.complete() : session.say('explain', 'Look back at the quantities and your records. Choose reasoning that explains your work.', false)}>Check explanation</button><Feedback session={session} phase="explain"/></Block>;
}
export function Prediction({ session, options }: {
    session: Session;
    options: readonly (readonly [
        string,
        string
    ])[];
}) {
    const [value, setValue] = useState('');
    const [record, setRecord] = useState('');
    return <Block title="Predict"><Choice label="Prediction" value={value} onChange={setValue} options={options}/><button onClick={() => { if (value) {
        setRecord(options.find(([id]) => id === value)![1]);
        session.plan();
    }
    else
        session.say('prediction', 'Choose an idea first.', false); }}>Commit prediction</button>{record && <p>Your prediction: {record}. Keep it for comparison with your model.</p>}<Feedback session={session} phase="prediction"/></Block>;
}
export const operations = [['+', '+'], ['-', '−'], ['×', '×'], ['÷', '÷']] as const;
export function WholeFrames({ count, denominator, frames, labels = true }: {
    count: number;
    denominator: number;
    frames: number;
    labels?: boolean;
}) {
    return <div className="mw-frames" role="img" aria-label={`${count} ${denominator === 8 ? 'eighth' : 'quarter'}-size pieces in ${frames} equal whole frames`}>
  {Array.from({ length: frames }, (_, f) => <div className="mw-whole" key={f}>{labels && <span>Whole frame {f + 1}</span>}<div className="mw-slots" style={{ gridTemplateColumns: `repeat(${denominator === 8 ? 4 : 2},1fr)` }}>{Array.from({ length: denominator }, (_, p) => <span key={p} data-filled={f * denominator + p < count ? 'yes' : 'no'}>{f * denominator + p < count ? '▧' : ''}</span>)}</div></div>)}
    </div>;
}
export function NumberPoint({ numerator, denominator, max }: {
    numerator: number;
    denominator: number;
    max: number;
}) { return <svg className="mw-line" viewBox="0 0 400 65" role="img" aria-label={`Position of the built amount on a number line from 0 to ${max}`}><line x1="20" y1="20" x2="380" y2="20" stroke="currentColor"/>{Array.from({ length: max * denominator + 1 }, (_, i) => <line key={i} x1={20 + i / (max * denominator) * 360} x2={20 + i / (max * denominator) * 360} y1="15" y2={i % denominator === 0 ? 31 : 25} stroke="currentColor"/>)}{Array.from({ length: max + 1 }, (_, i) => <text key={i} x={20 + i / max * 360} y="53" textAnchor="middle">{i}</text>)}<circle cx={20 + numerator / (denominator * max) * 360} cy="20" r="6" fill="#8a3516"/></svg>; }
