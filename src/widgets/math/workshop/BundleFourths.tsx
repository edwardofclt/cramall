import { useState } from 'react';
import { Block, Entry, Explain, Feedback, NumberPoint, Prediction, Surface, WholeFrames, useSession, type WorkshopProps } from './common';
export default function BundleFourths(props: WorkshopProps) {
    const s = useSession(props);
    const [whole, setWhole] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [fields, setFields] = useState<Record<string, string>>({});
    const [firstOk, setFirstOk] = useState(false);
    const [done, setDone] = useState(false);
    const total = reverse ? 11 : 13;
    const loose = total - whole * 4;
    const change = (n: number) => { setWhole(n); setDone(false); if (!reverse)
        setFirstOk(false); s.clear('names', 'reverse'); };
    const input = (label: string) => <Entry label={label} value={fields[label] || ''} onChange={v => { setFields(f => ({ ...f, [label]: v })); setDone(false); if (!reverse)
        setFirstOk(false); s.clear(reverse ? 'reverse' : 'names'); }}/>;
    return <Surface props={props} revealKey={done ? 'explain' : reverse ? 'reverse' : firstOk ? 'transfer' : 'bundle'} visual={<>{reverse && <p className="mw-records">Round A checked: 13/4 = 3 1/4.</p>}<p>{reverse ? 'Reverse round: 2 3/4. Break the wholes into fourths.' : 'Thirteen loose fourths. Make groups of four to fill whole frames.'}</p><WholeFrames count={whole * 4} denominator={4} frames={4}/><p>Loose fourth-size tiles: {loose}</p><div className="mw-pieces" role="img" aria-label={`${loose} loose fourth-size tiles`}>{Array.from({ length: loose }, (_, i) => <span className="mw-piece" key={i}>¼</span>)}</div><p>Filled whole frames: {whole}. The loose tiles have the same size as the frame slots.</p>{(firstOk || reverse) && <><WholeFrames count={total} denominator={4} frames={4} labels={false}/><p>Total area, unchanged by bundling:</p><NumberPoint numerator={total} denominator={4} max={4}/></>}{firstOk && !reverse && <p className="mw-records">13/4 = 3 1/4. Compare this point with your prediction.</p>}{done && <p className="mw-records">Reverse checked: 2 3/4 = 11/4.</p>}</>}>
 {!reverse && <Prediction session={s} options={[["2-3", "Between 2 and 3 wholes"], ["3-4", "Between 3 and 4 wholes"], ["4-5", "Between 4 and 5 wholes"]]}/>}
 <Block title={reverse ? 'Unbundle the mixed number' : 'Bundle the loose pieces'}><button disabled={(!reverse && !s.planned) || loose < 4} onClick={() => change(whole + 1)}>Make a whole</button><button disabled={whole === 0} onClick={() => change(whole - 1)}>Break one whole into fourths</button>{!reverse ? <>{input('Whole groups')}{input('Leftover numerator')}{input('Mixed denominator')}{input('Fraction numerator')}{input('Fraction denominator')}<button onClick={() => { const ok = s.planned && whole === 3 && Number(fields['Whole groups']) === 3 && Number(fields['Leftover numerator']) === 1 && Number(fields['Mixed denominator']) === 4 && Number(fields['Fraction numerator']) === 13 && Number(fields['Fraction denominator']) === 4; setFirstOk(ok); s.say('names', ok ? 'The pieces stayed the same. Only their grouping changed. Compare the number-line point with your prediction.' : 'Fill complete frames and count the leftover tiles. How many equal pieces fill one whole?', ok); }}>Check both names</button><Feedback session={s} phase="names"/></> : <>{input('Reverse numerator')}{input('Reverse denominator')}<button onClick={() => { const ok = whole === 0 && Number(fields['Reverse numerator']) === 11 && Number(fields['Reverse denominator']) === 4; setDone(ok); s.say('reverse', ok ? 'Both wholes are unpacked. All eleven fourths are still present.' : 'Count the fourths inside every whole before adding the loose pieces. Unpack both wholes.', ok); }}>Check reverse name</button><Feedback session={s} phase="reverse"/></>}</Block>
 {firstOk && !reverse && <Block title="Try the other direction"><button onClick={() => { setReverse(true); setWhole(2); setFields({}); s.act(); }}>Start reverse round</button></Block>}
 {done && <Explain session={s} answer="four" options={[["four", "Four fourths make one whole, so grouping changes the name but not the amount."], ["denominator", "The denominator changes whenever a frame fills."], ["more", "Bundling adds more fourths to the total."]]}/>}
 </Surface>;
}
