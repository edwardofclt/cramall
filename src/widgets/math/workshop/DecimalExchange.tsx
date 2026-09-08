import { useState } from 'react';
import { Block, Choice, Entry, Explain, Feedback, Prediction, Surface, useSession, type WorkshopProps } from './common';
export type DecimalPieces = {
    whole: number;
    tenth: number;
    hundredth: number;
};
export const hundredthValue = (p: DecimalPieces) => 100 * p.whole + 10 * p.tenth + p.hundredth;
export function exchange(p: DecimalPieces, from: keyof DecimalPieces): DecimalPieces | null { if (from === 'hundredth')
    return p.hundredth >= 10 ? { ...p, hundredth: p.hundredth - 10, tenth: p.tenth + 1 } : null; if (from === 'tenth')
    return p.tenth >= 1 ? { ...p, tenth: p.tenth - 1, hundredth: p.hundredth + 10 } : null; return p.whole >= 1 ? { ...p, whole: p.whole - 1, tenth: p.tenth + 10 } : null; }
function Mats({ pieces }: {
    pieces: DecimalPieces;
}) { const cells: string[] = [...Array(pieces.whole * 100).fill('whole'), ...Array(pieces.tenth * 10).fill('tenth'), ...Array(pieces.hundredth).fill('hundredth')]; return <div className="mw-decimal-mats" role="img" aria-label={`${pieces.whole} whole tiles, ${pieces.tenth} tenth strips, and ${pieces.hundredth} hundredth cells; equal unit squares divided into 100 cells`}>{Array.from({ length: Math.max(1, Math.ceil(cells.length / 100)) }, (_, m) => <div key={m}><p>Unit square {m + 1}</p><div className="mw-count-grid">{Array.from({ length: 100 }, (_, i) => <span key={i} data-kind={cells[m * 100 + i] || 'empty'}/>)}</div></div>)}</div>; }
export default function DecimalExchange(props: WorkshopProps) {
    const s = useSession(props);
    const [round, setRound] = useState(0);
    const [pieces, setPieces] = useState<DecimalPieces>({ whole: 0, tenth: 0, hundredth: 0 });
    const [loaded, setLoaded] = useState([false, false]);
    const [traded, setTraded] = useState(false);
    const [removed, setRemoved] = useState(false);
    const [fields, setFields] = useState<Record<string, string>>({});
    const [recordOk, setRecordOk] = useState(false);
    const [reason, setReason] = useState('');
    const [roundOk, setRoundOk] = useState(false);
    const clear = () => { setRecordOk(false); setRoundOk(false); s.clear('record', 'round-reason'); };
    const trade = (from: keyof DecimalPieces) => { const next = exchange(pieces, from); if (!next) {
        s.say('exchange', 'An exchange needs ten smaller pieces for one piece in the next place, or one larger piece to unpack.', false);
        return;
    } setPieces(next); if (round === 1 || from === 'hundredth')
        setTraded(true); clear(); s.say('exchange', 'Equal-value trade: the covered area stays the same.', true); };
    const field = (label: string) => <Entry label={label} value={fields[label] || ''} onChange={v => { setFields(f => ({ ...f, [label]: v })); clear(); }}/>;
    return <Surface props={props} revealKey={roundOk ? `round-${round}-explained` : recordOk ? `round-${round}-reason` : `round-${round}-build`} visual={<>{round === 1 && <p className="mw-records">Round A checked: 0.48 + 0.36 = 84/100 = 0.84. Trading kept the value.</p>}<h4>{round === 0 ? 'Round A: 0.48 + 0.36' : 'Round B: 1.2 − 0.35'}</h4><p>Whole tile = 1 = 100/100. Tenth strip = 1/10 = 10/100. Small cell = 1/100.</p><Mats pieces={pieces}/><p>On the mat: {pieces.whole} whole tiles · {pieces.tenth} tenth strips · {pieces.hundredth} hundredth cells.</p>{round === 1 && <p>Removed tray: {removed ? '3 tenth strips and 5 hundredth cells' : 'empty'}</p>}{recordOk && <p className="mw-equation">{round === 0 ? '0.48 + 0.36 = 84/100 = 0.84' : '120/100 − 35/100 = 85/100 = 0.85'}</p>}</>}>
 <Prediction key={round} session={s} options={[["below-one", "The result will be less than one whole"], ["one", "The result will be exactly one whole"], ["above-one", "The result will be greater than one whole"]]}/>
 <Block title="Build and exchange">{round === 0 && [48, 36].map((n, i) => <button key={n} disabled={loaded[i]} onClick={() => { setPieces(p => ({ ...p, tenth: p.tenth + Math.floor(n / 10), hundredth: p.hundredth + n % 10 })); setLoaded(p => p.map((v, j) => j === i ? true : v)); clear(); }}>Place 0.{n}</button>)}<button onClick={() => trade('hundredth')}>Trade 10 hundredths for 1 tenth</button><button onClick={() => trade('whole')}>Trade 1 whole for 10 tenths</button><button onClick={() => trade('tenth')}>Trade 1 tenth for 10 hundredths</button>{round === 1 && <button disabled={removed} onClick={() => { if (pieces.tenth < 3 || pieces.hundredth < 5) {
        s.say('exchange', 'Rename a larger piece so you have the parts you need to remove.', false);
        return;
    } setPieces(p => ({ ...p, tenth: p.tenth - 3, hundredth: p.hundredth - 5 })); setRemoved(true); clear(); s.say('exchange', 'The requested tenth strips and hundredth cells moved to the removed tray.', true); }}>Remove 3 tenths and 5 hundredths</button>}<Feedback session={s} phase="exchange"/></Block>
 <Block title="Record the mat’s value">{field('Fraction numerator')}{field('Fraction denominator')}{field('Decimal result')}<button onClick={() => { const value = round === 0 ? 84 : 85; const model = s.planned && hundredthValue(pieces) === value && traded && (round === 0 ? loaded.every(Boolean) : removed); const ok = model && Number(fields['Fraction numerator']) === value && Number(fields['Fraction denominator']) === 100 && Number(fields['Decimal result']) === value / 100; setRecordOk(ok); s.say('record', ok ? 'Your fraction and decimal describe the same mat. Explain the equal-value exchange.' : 'Build the requested operation and make an equal-value exchange. Count value, then keep hundredths in both written names.', ok); }}>Check decimal record</button><Feedback session={s} phase="record"/></Block>
 {recordOk && <Block title="Explain this exchange"><Choice label="Round explanation" value={reason} onChange={v => { setReason(v); setRoundOk(false); s.clear('round-reason'); }} options={[["more", "More pieces always mean more value."], ["equal", "One larger piece covers the same amount as ten pieces in the next smaller place."], ["shape", "Changing the shape changes the value."]]}/><button onClick={() => { const ok = reason === 'equal'; setRoundOk(ok); s.say('round-reason', ok ? 'The exchange changed the number of pieces while preserving the covered amount.' : 'Compare the area of one larger piece with ten pieces in the next smaller place.', ok); }}>Confirm round explanation</button><Feedback session={s} phase="round-reason"/></Block>}
 {roundOk && round === 0 && <Block title="Try subtraction"><button onClick={() => { setRound(1); s.resetPlan(); setPieces({ whole: 1, tenth: 2, hundredth: 0 }); setTraded(false); setFields({}); setReason(''); setRecordOk(false); setRoundOk(false); s.clear('exchange', 'record', 'round-reason'); }}>Start subtraction round</button></Block>}
 {roundOk && round === 1 && <Explain session={s} answer="equal" options={[["count", "The count of pieces determines the decimal."], ["equal", "Matching place values and trading equal amounts kept both operations accurate."], ["denominator", "The denominator should change to count the remaining pieces."]]}/>}
 </Surface>;
}
