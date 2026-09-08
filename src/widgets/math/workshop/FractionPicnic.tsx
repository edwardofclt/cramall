import { useState } from 'react';
import { Block, Entry, Explain, Feedback, NumberPoint, Prediction, Surface, WholeFrames, useSession, type WorkshopProps } from './common';
export const partitionKey = (counts: number[]) => counts.filter(n => n > 0).sort((a, b) => a - b).join(',');
export default function FractionPicnic(props: WorkshopProps) {
    const s = useSession(props);
    const [plates, setPlates] = useState([0, 0, 0]);
    const [den, setDen] = useState('');
    const [records, setRecords] = useState<number[][]>([]);
    const [currentValid, setCurrentValid] = useState(false);
    const left = 11 - plates.reduce((a, b) => a + b, 0);
    const change = (i: number, delta: number) => { if (delta === 1 && left === 0 || delta === -1 && plates[i] === 0)
        return; setPlates(p => p.map((v, j) => j === i ? v + delta : v)); setCurrentValid(false); s.clear('group'); };
    return <Surface props={props} revealKey={records.length === 2 && currentValid ? 'explain' : `record-${records.length}`} visual={<><WholeFrames count={11} denominator={8} frames={2}/><NumberPoint numerator={11} denominator={8} max={2}/><p>The total point stays fixed as pieces move between plates.</p><p>Unplaced eighths: {left}</p><div className="mw-pieces">{Array.from({ length: left }, (_, i) => <span className="mw-piece" key={i}>⅛</span>)}</div><div className="mw-plates">{plates.map((n, i) => <div className="mw-plate" key={i}><b>Plate {'ABC'[i]} · {['stripes', 'dots', 'crosses'][i]}</b><p>{n} eighth-size pieces</p><div className="mw-pieces">{Array.from({ length: n }, (_, j) => <span key={j} className="mw-piece">{['///', '••', '×'][i]}</span>)}</div></div>)}</div><div className="mw-records" role="region" aria-label="Grouping records">{records.length === 0 ? <p>No groupings recorded yet.</p> : records.map((r, i) => <p key={i}>Record {i + 1}: {r.filter(v => v > 0).map(v => `${v}/8`).join(' + ')} = 11/8</p>)}{records.length > 0 && !currentValid && <p>Saved groupings stay in the notebook. Check the current arrangement before explaining.</p>}{records.length === 2 && currentValid && <p>Both groupings fill one whole and three eighths: 1 3/8.</p>}</div></>}>
 <Prediction session={s} options={[["less", "Less than one whole"], ["one", "Exactly one whole"], ["more", "More than one whole"]]}/>
 <Block title="Move eighth-size pieces">{plates.map((n, i) => <div key={i}><button disabled={left === 0} onClick={() => change(i, 1)}>Add eighth to plate {'ABC'[i]}</button><button disabled={n === 0} onClick={() => change(i, -1)}>Remove eighth from plate {'ABC'[i]}</button></div>)}<Entry label="Piece denominator" value={den} onChange={v => { setDen(v); setCurrentValid(false); s.clear('group'); }}/><button onClick={() => { if (!s.planned) {
        s.say('group', 'Commit your prediction before recording the grouping.', false);
        return;
    } if (left || plates.filter(v => v > 0).length < 2) {
        s.say('group', 'Share all eleven pieces between at least two nonempty plates.', false);
        return;
    } if (Number(den) !== 8) {
        s.say('group', 'Moving a piece did not cut it into a new size. How many equal pieces fill a whole?', false);
        return;
    } const duplicate = records.some(r => partitionKey(r) === partitionKey(plates)); if (duplicate && records.length < 2) {
        s.say('group', 'Changing the order repeats the same groups. Try changing how many eighths are on a plate.', false);
        return;
    } if (records.length < 2)
        setRecords(r => [...r, [...plates]]); setCurrentValid(true); s.say('group', records.length === 0 ? 'Keep that record. Find another grouping with the same total.' : 'Your different groupings conserve the eleven eighth-size pieces.', true); }}>Record grouping</button><Feedback session={s} phase="group"/></Block>
 {records.length === 2 && currentValid && <Explain session={s} answer="same-pieces" options={[["plates", "The denominator counts the number of plates."], ["same-pieces", "The pieces stay eighth-size, and all eleven pieces stay in the total."], ["order", "Changing the order changes the total amount."]]}/>}
 </Surface>;
}
