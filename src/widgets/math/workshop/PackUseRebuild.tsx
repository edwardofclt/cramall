import { useState } from 'react';
import { Block, Choice, Entry, Explain, Feedback, Surface, operations, useSession, type WorkshopProps } from './common';
function Markers({ count }: {
    count: number;
}) { return <div className="mw-markers" role="img" aria-label={`${count} markers`}>{Array.from({ length: count }, (_, i) => <span key={i} className="mw-marker"/>)}</div>; }
export default function PackUseRebuild(props: WorkshopProps) {
    const s = useSession(props);
    const [packs, setPacks] = useState([false, false, false, false]);
    const [ops, setOps] = useState(['', '']);
    const [unknown, setUnknown] = useState('');
    const [swap, setSwap] = useState(false);
    const [eq, setEq] = useState(false);
    const [run, setRun] = useState(false);
    const [packed, setPacked] = useState('');
    const [totalOk, setTotalOk] = useState(false);
    const [used, setUsed] = useState(false);
    const [remaining, setRemaining] = useState('');
    const [firstDone, setFirstDone] = useState(false);
    const [inverse, setInverse] = useState(false);
    const [iops, setIops] = useState(['', '']);
    const [ipos, setIpos] = useState('');
    const [ieq, setIeq] = useState(false);
    const [restored, setRestored] = useState(false);
    const [grouped, setGrouped] = useState(false);
    const [answer, setAnswer] = useState('');
    const [done, setDone] = useState(false);
    const clearFirst = () => { setEq(false); setRun(false); setTotalOk(false); setUsed(false); setFirstDone(false); s.clear('equation', 'packed', 'remaining'); };
    const clearInverse = () => { setIeq(false); setRestored(false); setGrouped(false); setDone(false); s.clear('inverse', 'answer'); };
    const equation = `${unknown === 'result' ? 'm' : '?'} = (${swap ? '18' : '4'} ${ops[0] || '?'} ${swap ? '4' : '18'}) ${ops[1] || '?'} 15`;
    const iequation = `(${ipos === 'packs' ? 'p' : ipos === 'size' ? '18' : '?'} ${iops[0] || '?'} ${ipos === 'size' ? 'p' : '18'}) ${iops[1] || '?'} 15 = ${ipos === 'result' ? 'p' : '57'}`;
    return <Surface props={props} revealKey={done ? 'explain' : inverse ? 'inverse' : firstDone ? 'rebuild' : totalOk ? 'use' : eq ? 'run' : 'build'} visual={<>
 {!inverse ? <><div className="mw-packs">{packs.map((filled, i) => <div key={i} className="mw-pack"><b>Pack {i + 1} · 18 markers</b>{filled ? <Markers count={used ? Math.max(0, 18 - Math.max(0, 15 - (3 - i) * 18)) : 18}/> : <p>Empty outline</p>}</div>)}</div><div className="mw-records"><b>Used-marker tray</b>{used ? <Markers count={15}/> : <p>No markers moved yet.</p>}</div><p className="mw-equation">{equation}</p>{run && <p>Packed stage: four groups of eighteen markers are ready to count.</p>}{totalOk && <p>Checked intermediate record: 72 markers packed.</p>}{firstDone && <p>Checked first story: 72 − 15 = 57 markers remain.</p>}</> : <><p className="mw-records">Checked first story: m = (4 × 18) − 15; 72 packed markers, 57 remaining markers.</p><p>Some packs hold 18 markers each. After 15 markers are used, 57 remain. How many packs were there?</p><p className="mw-equation">{iequation}</p><div className="mw-packs">{grouped ? Array.from({ length: 4 }, (_, i) => <div className="mw-pack" key={i}>Rebuilt pack {i + 1}<Markers count={18}/></div>) : <div className="mw-pack">Remaining / restored mat<Markers count={restored ? 72 : 57}/></div>}</div><div className="mw-records">Used tray: {restored ? 'empty — moved back to the mat' : <Markers count={15}/>}</div></>}
 </>}>
 {!inverse && <><Block title="Build the pack story">{packs.map((filled, i) => <button key={i} aria-pressed={filled} onClick={() => { setPacks(p => p.map((v, j) => i === j ? !v : v)); clearFirst(); }}>{filled ? 'Remove' : 'Place'} bundle {filled ? 'from' : 'in'} pack {i + 1}</button>)}<Choice label="Unknown position" value={unknown} onChange={v => { setUnknown(v); clearFirst(); }} options={[["result", "m is the remaining marker count"], ["packs", "m is the number of packs"], ["size", "m is the number in each pack"]]}/><Choice label="First operation" value={ops[0]} onChange={v => { setOps([v, ops[1]]); clearFirst(); }} options={operations}/><button onClick={() => { setSwap(v => !v); clearFirst(); }}>Swap multiplication factors</button><Choice label="Second operation" value={ops[1]} onChange={v => { setOps([ops[0], v]); clearFirst(); }} options={operations}/><button onClick={() => { const ok = packs.every(Boolean) && unknown === 'result' && ops[0] === '×' && ops[1] === '-'; setEq(ok); s.say('equation', ok ? 'The equation matches packing first, then using markers.' : 'Which amount must exist before we can remove used markers? Build every pack and place m at the remaining amount.', ok); }}>Check first equation</button><Feedback session={s} phase="equation"/></Block>
 {eq && <Block title="Run the packed stage"><button onClick={() => { setRun(true); s.act(); }}>Run packed stage</button>{run && <><Entry label="Packed markers" value={packed} onChange={v => { setPacked(v); setTotalOk(false); setUsed(false); setFirstDone(false); s.clear('packed', 'remaining'); }}/><button onClick={() => { const ok = Number(packed) === 72; setTotalOk(ok); s.say('packed', ok ? 'Keep that total. It becomes the starting amount for the next step.' : 'Count the markers in all four equal packs.', ok); }}>Check packed total</button><Feedback session={s} phase="packed"/></>}</Block>}
 {totalOk && <Block title="Use the markers"><button onClick={() => { setUsed(true); setFirstDone(false); s.clear('remaining'); }}>Move 15 markers to used tray</button><Entry label="Remaining markers" value={remaining} onChange={v => { setRemaining(v); setFirstDone(false); s.clear('remaining'); }}/><button onClick={() => { const ok = used && Number(remaining) === 57; setFirstDone(ok); s.say('remaining', ok ? 'The remaining markers match the packed total minus the used tray.' : 'Move the used markers out, then count only the markers that remain.', ok); }}>Check remaining total</button><Feedback session={s} phase="remaining"/></Block>}
 {firstDone && <Block title="Move the unknown"><button onClick={() => { setInverse(true); s.act(); }}>Rebuild inverse story</button></Block>}</>}
 {inverse && <><Block title="Construct the inverse story"><p>The number of packs is unknown; the remaining amount is 57 markers.</p><Choice label="Inverse unknown position" value={ipos} onChange={v => { setIpos(v); clearInverse(); }} options={[["packs", "p is the number of packs"], ["size", "p is the markers in one pack"], ["result", "p is the remaining markers"]]}/><Choice label="Inverse first operation" value={iops[0]} onChange={v => { setIops([v, iops[1]]); clearInverse(); }} options={operations}/><Choice label="Inverse second operation" value={iops[1]} onChange={v => { setIops([iops[0], v]); clearInverse(); }} options={operations}/><button onClick={() => { const ok = ipos === 'packs' && iops[0] === '×' && iops[1] === '-'; setIeq(ok); s.say('inverse', ok ? 'The equation places the unknown at the pack count. Rebuild the starting amount.' : 'Keep the unknown on the pack count and match the two events in the story.', ok); }}>Check inverse equation</button><Feedback session={s} phase="inverse"/></Block>
 {ieq && <Block title="Restore and regroup"><button onClick={() => { setRestored(true); setGrouped(false); setDone(false); s.clear('answer'); }}>Restore 15 used markers</button><button onClick={() => { if (restored) {
            setGrouped(true);
            setDone(false);
            s.clear('answer');
        }
        else
            s.say('answer', 'Rebuild the amount before any markers were used.', false); }}>Regroup into packs of 18</button><Entry label="Original packs" value={answer} onChange={v => { setAnswer(v); setDone(false); s.clear('answer'); }}/><button onClick={() => { const ok = restored && grouped && Number(answer) === 4; setDone(ok); s.say('answer', ok ? 'Putting four packs into the inverse equation returns 57 remaining markers.' : 'Restore the used markers, then count complete packs of eighteen.', ok); }}>Check original packs</button><Feedback session={s} phase="answer"/></Block>}</>}
 {done && <Explain session={s} answer="undo" options={[["subtract", "Subtract used markers again to find the original pack count."], ["undo", "Restore the used markers, then split the original total into packs of eighteen."], ["ignore", "The number of used markers does not affect the pack count."]]}/>}
 </Surface>;
}
