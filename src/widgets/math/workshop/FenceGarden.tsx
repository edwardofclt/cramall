import { useState } from 'react';
import { Block, Choice, Entry, Explain, Feedback, Prediction, Surface, useSession, type WorkshopProps } from './common';
export function perimeterEquation(text: string, length: number, width: number) { const cleaned = text.replace(/\s/g, '').replace(/×/g, '*'); const [expression, right, ...extra] = cleaned.split('='); if (extra.length || right !== undefined && Number(right) !== 2 * (length + width))
    return false; const parts = expression.split('+'); if (parts.length === 4 && parts.every(v => /^\d+$/.test(v)))
    return parts.map(Number).sort((a, b) => a - b).join(',') === [length, length, width, width].sort((a, b) => a - b).join(','); return [`2*(${length}+${width})`, `2*(${width}+${length})`, `2(${length}+${width})`, `2(${width}+${length})`, `2*${length}+2*${width}`, `2*${width}+2*${length}`].includes(expression); }
export default function FenceGarden(props: WorkshopProps) {
    const s = useSession(props);
    const [top, setTop] = useState(false);
    const [bottom, setBottom] = useState(false);
    const [left, setLeft] = useState('');
    const [right, setRight] = useState('');
    const [allocation, setAllocation] = useState<[
        number,
        number
    ] | null>(null);
    const [width, setWidth] = useState('');
    const [equation, setEquation] = useState('');
    const [firstOk, setFirstOk] = useState(false);
    const [transfer, setTransfer] = useState(false);
    const [teq, setTeq] = useState('');
    const [total, setTotal] = useState('');
    const [unit, setUnit] = useState('');
    const [done, setDone] = useState(false);
    const clear = () => { setFirstOk(false); s.clear('garden'); };
    const clearTransfer = () => { setDone(false); s.clear('transfer'); };
    const remaining = 34 - (top ? 11 : 0) - (bottom ? 11 : 0) - (allocation?.[0] || 0) - (allocation?.[1] || 0);
    const length = transfer ? 7 : 11, w = transfer ? 4 : Math.max(1, Math.min(14, allocation?.[0] || Number(width) || 5));
    const scale = Math.min(260 / length, 230 / w), x = 70, y = 60, dx = length * scale, dy = w * scale;
    return <Surface props={props} revealKey={done ? 'explain' : transfer ? 'transfer' : firstOk ? 'first-checked' : 'allocate'} visual={<>{transfer && <p className="mw-records">First garden checked: 11 + 6 + 11 + 6 = 34 m. Width 6 m.</p>}<p>{transfer ? 'Transfer garden: length 7 m, width 4 m. Find the full fence total.' : `Fence left on the reel: ${remaining} one-meter segments.`}</p><svg className="mw-geometry" viewBox={`0 0 420 ${dy + 135}`} role="img" aria-label={transfer ? 'Rectangle with length 7 meters and width 4 meters' : `Garden model, length 11 meters and drawn width ${w} meters. Top allocation ${top ? 11 : 0}, bottom allocation ${bottom ? 11 : 0}, left allocation ${allocation?.[0] || 0}, right allocation ${allocation?.[1] || 0} meters`}><rect x={x} y={y} width={dx} height={dy} fill="#e5edd4" stroke="#788c64" strokeDasharray="5 5"/>{[{ x1: x, y1: y, x2: x + dx, y2: y, n: transfer ? 7 : top ? 11 : 0, max: length }, { x1: x, y1: y + dy, x2: x + dx, y2: y + dy, n: transfer ? 7 : bottom ? 11 : 0, max: length }, { x1: x, y1: y, x2: x, y2: y + dy, n: transfer ? 4 : allocation?.[0] || 0, max: w }, { x1: x + dx, y1: y, x2: x + dx, y2: y + dy, n: transfer ? 4 : allocation?.[1] || 0, max: w }].map((edge, i) => <g key={i}>{Array.from({ length: Math.min(edge.n, Math.ceil(edge.max)) }, (_, j) => <line key={j} x1={edge.x1 + (edge.x2 - edge.x1) * j / edge.max} y1={edge.y1 + (edge.y2 - edge.y1) * j / edge.max} x2={edge.x1 + (edge.x2 - edge.x1) * Math.min((j + .88) / edge.max, 1)} y2={edge.y1 + (edge.y2 - edge.y1) * Math.min((j + .88) / edge.max, 1)} stroke="#856037" strokeWidth="7"/>)}</g>)}<text x={x + dx / 2} y={y - 18} textAnchor="middle">{length} m</text><text x={x + dx / 2} y={y + dy + 28} textAnchor="middle">{length} m</text><text x={x - 10} y={y + dy / 2} textAnchor="end">{transfer ? '4' : allocation?.[0] ?? '?'} m</text><text x={x + dx + 10} y={y + dy / 2}>{transfer ? '4' : allocation?.[1] ?? '?'} m</text><text x={x + dx / 2} y={y + dy / 2} textAnchor="middle">Garden</text></svg>{!transfer && <p>Side labels show allocated fence. The preview scales to the allocated width, or to your proposed width while no widths are allocated.</p>}{firstOk && !transfer && <p className="mw-equation">11 + 6 + 11 + 6 = 34 m</p>}{done && <p className="mw-equation">7 + 4 + 7 + 4 = 22 m</p>}</>}>
 {!transfer && <><Prediction session={s} options={[["one", "Subtracting one long side is enough"], ["two", "Both long sides need fence first"]]}/><Block title="Allocate the fence"><button aria-pressed={top} onClick={() => { setTop(v => !v); setAllocation(null); clear(); }}>Fence top with 11 m</button><button aria-pressed={bottom} onClick={() => { setBottom(v => !v); setAllocation(null); clear(); }}>Fence bottom with 11 m</button><Entry label="Left fence meters" value={left} onChange={v => { setLeft(v); setAllocation(null); clear(); }}/><Entry label="Right fence meters" value={right} onChange={v => { setRight(v); setAllocation(null); clear(); }}/><button onClick={() => { const a = Number(left), b = Number(right); if (!top || !bottom) {
        s.say('allocation', 'Find the opposite side with the same length. It needs fence too.', false);
        return;
    } if (!Number.isInteger(a) || !Number.isInteger(b) || a <= 0 || b <= 0 || a + b > 12) {
        s.say('allocation', 'Use whole-meter pieces from the remaining twelve meters; do not use more than the reel holds.', false);
        return;
    } if (a !== b) {
        s.say('allocation', 'Opposite widths must be equal. These pieces stay on the reel until you choose equal lengths.', false);
        return;
    } setAllocation([a, b]); clear(); s.say('allocation', a === b && a + b === 12 ? 'Read all four side labels to check your boundary.' : 'What must be true about opposite sides of a rectangle? Use all the remaining fence.', a === b && a + b === 12); }}>Allocate widths</button><Feedback session={s} phase="allocation"/></Block><Block title="Check the complete boundary"><Entry label="Width in meters" value={width} onChange={v => { setWidth(v); clear(); }}/><Entry label="Perimeter equation" value={equation} onChange={v => { setEquation(v); clear(); }}/><button onClick={() => { const ok = s.planned && top && bottom && allocation?.[0] === 6 && allocation[1] === 6 && Number(width) === 6 && perimeterEquation(equation, 11, 6); setFirstOk(ok); s.say('garden', ok ? 'Every edge has fence. The four-side sum uses the whole reel.' : 'Include both opposite pairs in the allocation and equation. The widths must match and use the remaining fence.', ok); }}>Check garden</button><Feedback session={s} phase="garden"/></Block>{firstOk && <Block title="Transfer to another rectangle"><button onClick={() => { setTransfer(true); s.act(); }}>Start transfer garden</button></Block>}</>}
 {transfer && <Block title="Fence the transfer garden"><Entry label="Transfer perimeter equation" value={teq} onChange={v => { setTeq(v); clearTransfer(); }}/><Entry label="Transfer fence total" value={total} onChange={v => { setTotal(v); clearTransfer(); }}/><Choice label="Fence unit" value={unit} onChange={v => { setUnit(v); clearTransfer(); }} options={[["m", "meters (m)"], ["m²", "square meters (m²)"]]}/><button onClick={() => { const ok = perimeterEquation(teq, 7, 4) && Number(total) === 22 && unit === 'm'; setDone(ok); s.say('transfer', ok ? 'The fence measures the complete boundary in meters.' : 'Add both pairs of sides and use a length unit for fence.', ok); }}>Check transfer</button><Feedback session={s} phase="transfer"/></Block>}
 {done && <Explain session={s} answer="opposites" options={[["area", "The interior tiles tell how much fence is needed."], ["opposites", "Both equal opposite pairs belong in the boundary total."], ["single", "Only one length and one width need fence."]]}/>}
 </Surface>;
}
