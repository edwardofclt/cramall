import { useState } from 'react';
import { Block, Choice, Entry, Explain, Feedback, Prediction, Surface, operations, useSession, type WorkshopProps } from './common';
const fmt = (n: number) => n.toLocaleString('en-US');
export default function EstimateCheckpoint(props: WorkshopProps) {
    const s = useSession(props);
    const [place, setPlace] = useState('1000');
    const [placed, setPlaced] = useState([false, false]);
    const [ends, setEnds] = useState(['', '']);
    const [op, setOp] = useState('');
    const [result, setResult] = useState('');
    const [valid, setValid] = useState(false);
    const [verdict, setVerdict] = useState('');
    const [checked, setChecked] = useState(false);
    const clear = () => { setValid(false); setChecked(false); s.clear('estimate', 'verdict'); };
    const changePlace = (v: string) => { setPlace(v); setEnds(['', '']); setPlaced([false, false]); setResult(''); setVerdict(''); clear(); };
    const values = [36418, 22693], unit = Number(place) || 1000;
    const bounds = values.map(v => [Math.floor(v / unit) * unit, (Math.floor(v / unit) + 1) * unit]);
    const estimate = Number(ends[0]) + Number(ends[1]);
    return <Surface props={props} revealKey={checked ? 'explain' : valid ? 'verdict' : 'build'} visual={<>
   <div className="mw-equation">Claim: 159,111 acorns</div>
   {values.map((v, i) => <div key={v}><p>Count {i + 1}: {fmt(v)} acorns</p><svg className="mw-estimate-svg" viewBox="0 0 400 90" role="img" aria-label={`Count ${fmt(v)} between ${fmt(bounds[i][0])} and ${fmt(bounds[i][1])}${placed[i] ? '; count placed on the line' : ''}`}><line x1="45" y1="35" x2="355" y2="35" stroke="currentColor"/>{[0, 1].map(e => <g key={e}><line x1={45 + 310 * e} x2={45 + 310 * e} y1="27" y2="44" stroke="currentColor"/><text x={45 + 310 * e} y="69" textAnchor="middle">{fmt(bounds[i][e])}</text></g>)}{placed[i] && <g><circle cx={45 + (v - bounds[i][0]) / unit * 310} cy="35" r="6" fill="#734221"/><text x={45 + (v - bounds[i][0]) / unit * 310} y="17" textAnchor="middle">{fmt(v)}</text></g>}{ends[i] && <path d={`M${Number(ends[i]) === bounds[i][0] ? 45 : 355} 47l-6 10h12z`} fill="#245d83"/>}</svg></div>)}
   <p>Rounded equation: {ends[0] ? fmt(Number(ends[0])) : '?'} {op || '?'} {ends[1] ? fmt(Number(ends[1])) : '?'} = {result || '?'}</p>
   {valid && <><svg className="mw-estimate-svg" viewBox="0 0 400 90" role="img" aria-label={`Estimate ${fmt(estimate)} compared with claim 159,111 on the same scale`}><line x1="20" x2="380" y1="42" y2="42" stroke="currentColor"/><circle cx={20 + estimate / 180000 * 360} cy="42" r="6" fill="#477347"/><text x={20 + estimate / 180000 * 360} y="23" textAnchor="middle">{fmt(estimate)}</text><path d={`M${20 + 159111 / 180000 * 360} 35v14`} stroke="#a44321" strokeWidth="5"/><text x={20 + 159111 / 180000 * 360} y="70" textAnchor="middle">159,111</text><text x="20" y="70">0</text></svg><p>Estimate: {fmt(estimate)} acorns. The claim is shown on the same number line.</p></>}
   {checked && <p className="mw-records">Exact sum: 59,111 acorns. The sign is far too large.</p>}
 </>}>
 <Prediction session={s} options={[["plausible", "The claim seems plausible"], ["too-large", "The claim seems too large"]]}/>
 <Block title="Build a rounded equation"><Choice label="Rounding place" value={place} onChange={changePlace} options={[["1000", "Nearest thousand"], ["10000", "Nearest ten thousand"]]}/>{values.map((v, i) => <div key={v}><button onClick={() => { setPlaced(p => p.map((x, j) => j === i ? true : x)); clear(); }}>Place {i === 0 ? 'first' : 'second'} count</button><Choice label={`${i === 0 ? 'First' : 'Second'} rounded endpoint`} value={ends[i]} onChange={v => { setEnds(p => p.map((x, j) => j === i ? v : x)); clear(); }} options={bounds[i].map(n => [String(n), fmt(n)] as const)}/></div>)}<Choice label="Estimate operation" value={op} onChange={v => { setOp(v); clear(); }} options={operations}/><Entry label="Estimate result" value={result} onChange={v => { setResult(v); clear(); }}/><button onClick={() => { const ok = s.planned && placed.every(Boolean) && ends.every((v, i) => Number(v) === Math.round(values[i] / unit) * unit) && op === '+' && Number(result.replace(/,/g, '')) === estimate; setValid(ok); s.say('estimate', ok ? 'Keep your estimate beside the claim. Compare their sizes.' : 'Commit a prediction, place both counts, and check the digit just to the right of your rounding place. Then add your rounded endpoints.', ok); }}>Check estimate</button><Feedback session={s} phase="estimate"/></Block>
 {valid && <Block title="Compare the sizes"><Choice label="Verdict" value={verdict} onChange={v => { setVerdict(v); setChecked(false); s.clear('verdict'); }} options={[["plausible", "The claim is plausible"], ["too-large", "The claim is far too large"]]}/><button onClick={() => { const ok = verdict === 'too-large'; setChecked(ok); s.say('verdict', ok ? 'Your estimate supports rejecting the sign. Now compare with the exact sum.' : 'Does that claimed total fit the two amounts you started with?', ok); }}>Check verdict</button><Feedback session={s} phase="verdict"/></Block>}
 {checked && <Explain session={s} answer="size" options={[["digits", "Both numbers have five digits, so any six-digit sum is reasonable."], ["size", "About sixty thousand is far smaller than the sign’s claimed total."], ["exact", "An estimate must equal the exact sum."]]}/>}
 </Surface>;
}
