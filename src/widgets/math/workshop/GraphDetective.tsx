import { useState } from 'react';
import { Block, Choice, Entry, Explain, Feedback, Surface, operations, useSession, type WorkshopProps } from './common';
function Basket({ half = false, apples = false }: {
    half?: boolean;
    apples?: boolean;
}) { return <svg className="mw-basket" viewBox={half ? '0 0 40 65' : '0 0 80 65'} role="img" aria-label={apples ? (half ? 'Half a basket contains two apples' : 'One basket contains four apples') : (half ? 'Half basket symbol' : 'Whole basket symbol')}><path d={half ? 'M5 26h35v30H15z' : 'M5 26h70L65 56H15z'} fill="#b7854e" stroke="#785329" strokeWidth="2"/><path d="M17 26C17 0 63 0 63 26" fill="none" stroke="#785329" strokeWidth="4"/>{apples && [19, 34, ...(half ? [] : [49, 64])].map((x, i) => <g key={i}><circle cx={x} cy={24 + (i % 2) * 4} r="6" fill="#ad4329"/><path d={`M${x} 18l2-4`} stroke="#416032" strokeWidth="2"/></g>)}{[35, 43, 51].map(y => <path key={y} d={`M10 ${y}h${half ? 30 : 60}`} stroke="#775329"/>)}{half && <path d="M40 16v42" stroke="#543520" strokeDasharray="3 3"/>}</svg>; }
function BirdGraph({marked}: {marked: number[]}) {
    const left = 80, interval = 15;
    return <svg className="mw-bird-graph" viewBox="0 0 420 190" role="img" aria-label="Robin 18 birds and Wren 11 birds. Both bars use the same scale: one interval is one bird, from 0 to 20 birds.">
        {Array.from({length:21},(_,count)=><line key={count} data-bird-tick={count} x1={left+count*interval} x2={left+count*interval} y1="25" y2="137" stroke={count%5===0?'#91a288':'#cbd4c5'} strokeWidth={count%5===0?1.5:1}/>)}
        {([['Robin',18],['Wren',11]] as const).map(([name,count],index)=><g key={name}>
            <text x="68" y={51+index*60} textAnchor="end">{name}</text>
            <rect data-bird-count={count} x={left} y={32+index*60} width={count*interval} height="28" fill={marked.includes(index)?'#d7bd84':'#b6cda9'} stroke={marked.includes(index)?'#654723':'#426238'} strokeWidth={marked.includes(index)?3:1}/>
            {Array.from({length:count-1},(_,i)=><line key={i} x1={left+(i+1)*interval} x2={left+(i+1)*interval} y1={32+index*60} y2={60+index*60} stroke="#5c774f"/>)}
            <text x={left+count*interval+8} y={51+index*60}>{count}</text>
        </g>)}
        <line x1={left} x2={left+20*interval} y1="137" y2="137" stroke="#354f2d"/>
        {[0,5,10,15,20].map(count=><text key={count} x={left+count*interval} y="157" textAnchor="middle">{count}</text>)}
        <text x="230" y="182" textAnchor="middle">Birds</text>
    </svg>;
}
const CASES = [{ title: 'Picture case', problem: 'Trail Group has 2½ basket symbols. One basket = 4 apples. How many apples did it pick?', result: '10', unit: 'apples', op: '×', reason: 'key', equation: '5 × 2 = 10 apples' }, { title: 'Bird case', problem: 'Robin observations: 18 birds. Wren observations: 11 birds. How many more robins were observed?', result: '7', unit: 'birds', op: '-', reason: 'difference', equation: '18 − 11 = 7 birds' }, { title: 'Ribbon case', problem: 'Ribbon lengths are 3/8 m and 4/8 m. What is the combined length?', result: '7/8', unit: 'm', op: '+', reason: 'eighths', equation: '3/8 + 4/8 = 7/8 m' }] as const;
export default function GraphDetective(props: WorkshopProps) {
    const s = useSession(props);
    const [index, setIndex] = useState(0);
    const [split, setSplit] = useState(false);
    const [halfValue, setHalfValue] = useState('');
    const [enlarged, setEnlarged] = useState(false);
    const [marked, setMarked] = useState<number[]>([]);
    const [op, setOp] = useState('');
    const [answer, setAnswer] = useState('');
    const [unit, setUnit] = useState('');
    const [valid, setValid] = useState(false);
    const [reason, setReason] = useState('');
    const [records, setRecords] = useState<string[]>([]);
    const [caseDone, setCaseDone] = useState(false);
    const c = CASES[index];
    const clear = () => { setValid(false); setCaseDone(false); setRecords(r => r.slice(0, index)); s.clear('case', 'case-reason'); };
    const mark = (i: number) => { setMarked(v => v.includes(i) ? v.filter(n => n !== i) : [...v, i]); clear(); };
    const next = () => { setIndex(i => i + 1); setMarked([]); setOp(''); setAnswer(''); setUnit(''); setValid(false); setReason(''); setCaseDone(false); s.clear('case', 'case-reason'); };
    return <Surface props={props} revealKey={caseDone ? `case-${index}-saved` : valid ? `case-${index}-reason` : `case-${index}-build`} visual={<><h4>{c.title}</h4><p>{c.problem}</p><section aria-label="Picture graph source"><h4>Trail Group apples</h4><p>Key: one basket = 4 apples; half basket = half of that amount.</p>{index === 0 ? <><button onClick={() => { setEnlarged(v => !v); s.act(); }}>Enlarge basket key</button>{enlarged && <div><Basket apples/><Basket half apples/><p>Count the apples shown inside each key symbol.</p></div>}<div className="mw-toolbar">{split ? Array.from({ length: 5 }, (_, i) => <button key={i} aria-label={`Mark half basket ${i + 1}`} aria-pressed={marked.includes(i)} onClick={() => mark(i)}><Basket half/>{marked.includes(i) ? 'Marked' : 'Mark'} {i + 1}</button>) : <><Basket /><Basket /><Basket half/><span>2½ baskets</span></>}</div><button disabled={split} onClick={() => { setSplit(true); setMarked([]); clear(); }}>Split whole baskets into halves</button></> : <p>2½ basket symbols · key 4 apples per basket.</p>}</section>
 <section aria-label="Bird graph source"><h4>Bird observations</h4><p>Scale: each interval is 1 bird; axis from 0 to 20 birds.</p><BirdGraph marked={index === 1 ? marked : []}/>{index === 1 && ['Robin','Wren'].map((name,i)=><button key={name} className="mw-data-button" aria-label={`Mark ${name} bar`} aria-pressed={marked.includes(i)} onClick={()=>mark(i)}>{marked.includes(i)?'Marked':'Mark'} {name} bar</button>)}</section>
 <section aria-label="Ribbon table source"><h4>Ribbon lengths</h4><table><thead><tr><th>Ribbon</th><th>Length (m)</th></tr></thead><tbody>{[3, 4].map((n, i) => <tr key={n}><td>Ribbon {i + 1}</td><td>{index === 2 ? <button aria-pressed={marked.includes(i)} onClick={() => mark(i)}>Mark ribbon {n}/8 m</button> : `${n}/8 m`}</td></tr>)}</tbody></table>{index === 2 && <div className="mw-frames">{[3, 4].map(n => <div className="mw-whole" key={n}><p>{n}/8 m</p><div className="mw-slots" style={{ gridTemplateColumns: 'repeat(8,1fr)' }}>{Array.from({ length: 8 }, (_, i) => <span key={i} data-filled={i < n ? 'yes' : 'no'}/>)}</div></div>)}</div>}</section>
 <div className="mw-equation">Linked draft: {index === 0 ? `${marked.length || '?'} half baskets ${op || '?'} ${halfValue || '?'} apples per half` : index === 1 ? `${marked.includes(0) ? '18' : '?'} ${op || '?'} ${marked.includes(1) ? '11' : '?'}` : `${marked.includes(0) ? '3/8' : '?'} ${op || '?'} ${marked.includes(1) ? '4/8' : '?'}`} = {answer || '?'} {unit}</div><div className="mw-records" role="region" aria-label="Case records"><h4>Checked case records</h4><ul>{records.map(r => <li key={r}>{r}</li>)}</ul></div></>}>
 <Block title="Read, mark, and calculate"><p>Mark every symbol, bar, or row needed for this question. Keep the key and unit with the values.</p>{index === 0 && <Entry label="Apples per half basket" value={halfValue} onChange={v => { setHalfValue(v); clear(); }}/>}<Choice label="Graph operation" value={op} onChange={v => { setOp(v); clear(); }} options={operations}/><Entry label="Graph result" value={answer} onChange={v => { setAnswer(v); clear(); }}/><Choice label="Graph unit" value={unit} onChange={v => { setUnit(v); clear(); }} options={[["apples", "apples"], ["birds", "birds"], ["m", "meters (m)"], ["baskets", "baskets"], ["m²", "square meters"]]}/><button onClick={() => { const relevant = marked.length === (index === 0 ? 5 : 2) && (index !== 0 || split && Number(halfValue) === 2); const ok = relevant && op === c.op && answer.trim() === c.result && unit === c.unit; setValid(ok); s.say('case', ok ? 'The selected data, operation, result, and unit agree. Explain why this calculation fits.' : index === 0 ? 'Use the basket key. Split the complete symbols, mark every half, and count apples rather than raw symbols.' : index === 1 ? 'Is the question asking for a total or a difference? Mark both bird bars and keep the bird unit.' : 'Combine the two ribbon lengths, keeping eighth-size pieces and meters.', ok); }}>Check case</button><Feedback session={s} phase="case"/></Block>
 {valid && <Block title="Explain this calculation"><Choice label="Case explanation" value={reason} onChange={v => { setReason(v); setCaseDone(false); setRecords(r => r.slice(0, index)); s.clear('case-reason'); }} options={[["key", "Each half basket represents two apples, so five equal halves use multiplication."], ["difference", "How many more asks for the difference between the two bird counts."], ["eighths", "Combined length adds the numerators while the pieces remain eighths."], ["appearance", "The tallest or largest picture is always the answer."]]}/><button onClick={() => { const ok = reason === c.reason; setCaseDone(ok); if (ok)
        setRecords(r => [...r.slice(0, index), c.equation]); s.say('case-reason', ok ? 'Saved the equation with its unit and the reason for the operation.' : 'Choose the reason that matches this case’s key or question.', ok); }}>Confirm case explanation</button><Feedback session={s} phase="case-reason"/></Block>}
 {caseDone && index < 2 && <Block title="Open the next source"><button onClick={next}>{index === 0 ? 'Open bird case' : 'Open ribbon case'}</button></Block>}
 {caseDone && index === 2 && <Explain session={s} answer="read" options={[["guess", "Choose an operation before reading the display."], ["read", "The key, units, and question tell what the marks mean and which operation fits."], ["same", "Every graph problem uses the same operation."]]}/>}
 </Surface>;
}
