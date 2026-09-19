import { useState, type ReactNode } from 'react';
import type { WidgetProps } from '../../registry';
import { ActivityWorkbench } from '../../ActivityWorkbench';
import { sources } from './models';
export type ModeProps = {
    activity: keyof typeof sources;
    onEvent: WidgetProps<'science-workshop'>['onEvent'];
    complete: () => void;
    reset: () => void;
};
export type Option = readonly [
    string,
    string
];
export function Select({ label, value, onChange, options, binaryKeys = false }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: readonly Option[];
    binaryKeys?: boolean;
}) { return <label className="sw-select">{label}<select aria-label={label} value={value} onChange={e => onChange(e.target.value)} onKeyDown={e => { if (binaryKeys && (e.key === '0' || e.key === '1')) {
    e.preventDefault();
    onChange(e.key);
} }}><option value="">Choose…</option>{options.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select>{value && <span className="sw-selected-text" aria-label={`${label} selected text`}>{options.find(([id]) => id === value)?.[1]}</span>}</label>; }
export function Feedback({ label, children }: {
    label: string;
    children: ReactNode;
}) { return <p className="sw-feedback" role="status" aria-label={label}>{children}</p>; }
export function Task({ title, children }: {
    title: string;
    children: ReactNode;
}) { return <fieldset className="sw-task" data-activity-reveal><legend>{title}</legend>{children}</fieldset>; }
export function useWork(onEvent: ModeProps['onEvent']) { const [revision, setRevision] = useState(0); const [valid, setValid] = useState(false); const [feedback, setFeedback] = useState(''); const edit = () => { setRevision(n => n + 1); setValid(false); setFeedback(''); onEvent({ type: 'interaction', action: 'act' }); }; const check = (ok: boolean, message: string) => { setValid(ok); setFeedback(message); onEvent({ type: 'interaction', action: 'check' }); onEvent({ type: 'coach', cue: ok ? 'milestone' : 'retry' }); }; return { revision, valid, feedback, edit, check }; }
export function Workbench({ title, props, visual, children, reveal }: {
    title: string;
    props: ModeProps;
    visual: ReactNode;
    children: ReactNode;
    reveal?: string | number;
}) { return <ActivityWorkbench className="sw-workshop" label={title} visualScrollable revealKey={reveal} visual={<><h3>{title}</h3><p className="sw-source">{sources[props.activity]}</p>{visual}</>}><p className="sw-kicker">Build • inspect • explain</p>{children}<button onClick={props.reset}>Reset activity</button></ActivityWorkbench>; }
export function Reasoning({ ready, onComplete, onEvent, claim, limit, wrongClaim = 'The model proves this happens every time.', wrongLimit = 'These records tell us everything.' }: {
    ready: boolean;
    onComplete: () => void;
    onEvent: ModeProps['onEvent'];
    claim: string;
    limit: string;
    wrongClaim?: string;
    wrongLimit?: string;
}) { const [a, setA] = useState(''), [b, setB] = useState(''), [feedback, setFeedback] = useState(''); if (!ready)
    return null; return <Task title="Explain with a limit"><Select label="My explanation" value={a} onChange={v => { setA(v); setFeedback(''); }} options={[["wrong", wrongClaim], ["supported", claim]]}/><Select label="Evidence limit" value={b} onChange={v => { setB(v); setFeedback(''); }} options={[["limited", limit], ["all", wrongLimit]]}/><button onClick={() => { onEvent({ type: 'interaction', action: 'explain' }); if (a === 'supported' && b === 'limited') {
    setFeedback('Explanation complete. You connected your work to the source and kept its limits.');
    onComplete();
}
else {
    setFeedback('Review your work and the source. Choose a supported explanation and a truthful limit.');
    onEvent({ type: 'coach', cue: 'retry' });
} }}>Check explanation</button><Feedback label="Explanation feedback">{feedback}</Feedback></Task>; }
