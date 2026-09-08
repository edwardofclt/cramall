import { useState } from 'react';
import { Block, Choice, Explain, Feedback, Surface, useSession, type WorkshopProps } from './common';
export const triangles = [{ id: 'A', angles: [60, 60, 60], side: 'equilateral', categories: ['acute', 'equiangular'], rotation: 20 }, { id: 'B', angles: [45, 45, 90], side: 'isosceles', categories: ['right'], rotation: 145 }, { id: 'C', angles: [30, 40, 110], side: 'scalene', categories: ['obtuse'], rotation: 245 }, { id: 'D', angles: [40, 70, 70], side: 'isosceles', categories: ['acute'], rotation: 65 }] as const;
export function triangleVertices(angles: readonly number[]) { const [a, b, c] = angles.map(n => n * Math.PI / 180); return [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: Math.sin(b) * Math.cos(a) / Math.sin(c), y: Math.sin(b) * Math.sin(a) / Math.sin(c) }]; }
function Drawing({ index, rotation }: {
    index: number;
    rotation: number;
}) {
    const t = triangles[index];
    const raw = triangleVertices(t.angles);
    const center = { x: raw.reduce((n, p) => n + p.x, 0) / 3, y: raw.reduce((n, p) => n + p.y, 0) / 3 };
    const extent = Math.max(...raw.map(p => Math.hypot(p.x - center.x, p.y - center.y)));
    const angle = (t.rotation + rotation) * Math.PI / 180;
    const points = raw.map(p => ({ x: 210 + ((p.x - center.x) * Math.cos(angle) - (p.y - center.y) * Math.sin(angle)) * 130 / extent, y: 190 + ((p.x - center.x) * Math.sin(angle) + (p.y - center.y) * Math.cos(angle)) * 130 / extent }));
    const groups = [...new Set(t.angles)];
    return <svg className="mw-geometry" viewBox="0 0 420 380" role="img" aria-label={`Triangle ${t.id}. Angles ${t.angles.join(', ')} degrees. ${index === 0 ? 'Three equal sides' : index === 2 ? 'Three unequal sides' : 'Exactly two equal sides'}. Matching tick marks identify matching lengths.`}><polygon points={points.map(p => `${p.x},${p.y}`).join(' ')} fill="#f2e6c7" stroke="#4f5941" strokeWidth="3"/>{points.map((p, i) => { const q = points[(i + 1) % 3]; const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2; const length = Math.hypot(q.x - p.x, q.y - p.y); const dx = (q.x - p.x) / length, dy = (q.y - p.y) / length; const ticks = groups.indexOf(t.angles[(i + 2) % 3]) + 1; return <g key={i}>{Array.from({ length: ticks }, (_, j) => { const offset = (j - (ticks - 1) / 2) * 7; return <line key={j} x1={mx + offset * dx - 7 * dy} y1={my + offset * dy + 7 * dx} x2={mx + offset * dx + 7 * dy} y2={my + offset * dy - 7 * dx} stroke="#6c3c21" strokeWidth="2"/>; })}<text x={p.x + (210 - p.x) * .21} y={p.y + (190 - p.y) * .21 + 5} textAnchor="middle">{t.angles[i]}°</text></g>; })}</svg>;
}
type Draft = {
    side: string;
    angles: string[];
};
export default function TriangleDesk(props: WorkshopProps) {
    const s = useSession(props);
    const [index, setIndex] = useState(0);
    const [drafts, setDrafts] = useState<Draft[]>(triangles.map(() => ({ side: '', angles: [] })));
    const [records, setRecords] = useState<boolean[]>(triangles.map(() => false));
    const [rotation, setRotation] = useState(0);
    const [rotated, setRotated] = useState(false);
    const [evidence, setEvidence] = useState('');
    const [evidenceOk, setEvidenceOk] = useState(false);
    const t = triangles[index], draft = drafts[index], all = records.every(Boolean);
    const change = (next: Draft) => { setDrafts(ds => ds.map((d, i) => i === index ? next : d)); setRecords(rs => rs.map((r, i) => i === index ? false : r)); setEvidenceOk(false); setRotated(false); s.clear('triangle', 'evidence'); };
    return <Surface props={props} revealKey={evidenceOk ? 'explain' : all ? 'evidence' : `triangle-${index}`} visual={<><div className="mw-toolbar">{triangles.map((item, i) => <button key={item.id} aria-pressed={i === index} onClick={() => { setIndex(i); setRotation(0); setEvidence(''); setEvidenceOk(false); setRotated(false); s.clear('triangle', 'evidence'); }}>Inspect triangle {item.id}</button>)}</div><h4>Triangle {t.id}</h4><Drawing index={index} rotation={rotation}/><p className="mw-rotation">Rotation added: {rotation}°. Tick counts compare side lengths; printed angles give the angle measures.</p><button onClick={() => { setRotation(r => (r + 30) % 360); setRotated(true); setEvidenceOk(false); s.clear('evidence'); }}>Rotate triangle</button><div className="mw-records" role="region" aria-label="Triangle records"><ul>{triangles.map((item, i) => <li key={item.id}>Triangle {item.id}: {records[i] ? `${drafts[i].side}; ${drafts[i].angles.join(', ')} — checked` : 'needs a check'}</li>)}</ul></div></>}>
 <Block title={`Classify triangle ${t.id}`}><p>Choose one side name and every angle name that fits. Here, isosceles means exactly two equal sides.</p><Choice label="Side category" value={draft.side} onChange={v => change({ ...draft, side: v })} options={[["equilateral", "equilateral"], ["isosceles", "isosceles"], ["scalene", "scalene"]]}/><div className="mw-checks">{['acute', 'right', 'obtuse', 'equiangular'].map(a => <label key={a}><input type="checkbox" checked={draft.angles.includes(a)} onChange={() => change({ ...draft, angles: draft.angles.includes(a) ? draft.angles.filter(v => v !== a) : [...draft.angles, a] })}/>{a}</label>)}</div><button onClick={() => { const ok = draft.side === t.side && [...draft.angles].sort().join(',') === [...t.categories].sort().join(','); setRecords(rs => rs.map((v, i) => i === index ? ok : v)); setEvidenceOk(false); setRotated(false); s.say('triangle', ok ? 'Your side and angle names match the measurements. Keep this classification record.' : index === 0 ? 'Check both whether every angle is less than ninety and whether all angles are equal. Check the matching side marks too.' : 'Use the printed measurements and matching marks, even when the triangle is tilted.', ok); }}>Check triangle</button><Feedback session={s} phase="triangle"/></Block>
 {all && <Block title="Test rotation and cite evidence"><p>Rotate a triangle after all four records are checked. Then cite this triangle’s measurements.</p><Choice label={`Evidence for triangle ${t.id}`} value={evidence} onChange={v => { setEvidence(v); setEvidenceOk(false); s.clear('evidence'); }} options={[["tilt", "Its point faces the direction of that category."], ["marks", `The side tick marks and the ${t.angles.join('°, ')}° angle labels support both names.`], ["size", "Its size on the screen decides the classification."]]}/><button onClick={() => { const ok = evidence === 'marks' && rotated; setEvidenceOk(ok); s.say('evidence', ok ? 'Rotation kept the side lengths and angle measures unchanged. The checked names still fit.' : 'Rotate the inspected triangle, then use its matching marks and printed angles as evidence.', ok); }}>Check evidence</button><Feedback session={s} phase="evidence"/></Block>}
 {all && evidenceOk && <Explain session={s} answer="unchanged" options={[["direction", "Turning a triangle changes its angle category."], ["unchanged", "Rotation changes direction, while the same side lengths and angles keep both classifications."], ["one", "A triangle can only have one name."]]}/>}
 </Surface>;
}
