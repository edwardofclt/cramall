import { expect, test } from 'vitest';
import { MathWorkshopConfigSchema } from '../../../content/math/workshop-schema';
import { mathWorkshopActivities, mathWorkshopSpeechText } from '../../../content/math/workshopActivities';
import { triangles, triangleVertices } from './TriangleDesk';
import { exchange, hundredthValue } from './DecimalExchange';
import { partitionKey } from './FractionPicnic';
import { perimeterEquation } from './FenceGarden';
import { ruleOutput } from './AcornRuleMachine';
test('nine strict selectors and exact authored placement IDs; speech contains setup only', () => {
    expect(mathWorkshopActivities).toHaveLength(9);
    expect(new Set(mathWorkshopActivities.map(a => a.cardId)).size).toBe(9);
    for (const a of mathWorkshopActivities) {
        expect(MathWorkshopConfigSchema.safeParse(a.config).success).toBe(true);
        expect(a.cardId.startsWith(a.lessonId + '-c')).toBe(true);
        expect(a.coach.intro.map(i => i.speaker)).toEqual(['guide', 'kid']);
        expect(mathWorkshopSpeechText(a.config)).toHaveLength(2);
        expect(mathWorkshopSpeechText(a.config).join(' ')).not.toMatch(/59,000|60,000|3 1\/4|0\.84|0\.85|11\/4|5 × 2 = 10/);
    }
});
test.each(triangles)('triangle $id geometry has exactly the authored angles and side equalities', t => {
    const points = triangleVertices(t.angles);
    const lengths = points.map((p, i) => Math.hypot(p.x - points[(i + 1) % 3].x, p.y - points[(i + 1) % 3].y));
    points.forEach((p, i) => { const a = points[(i + 1) % 3], b = points[(i + 2) % 3]; const u = { x: a.x - p.x, y: a.y - p.y }, v = { x: b.x - p.x, y: b.y - p.y }; const angle = Math.acos((u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y))) * 180 / Math.PI; expect(angle).toBeCloseTo(t.angles[i], 10); });
    const equalPairs = lengths.flatMap((l, i) => lengths.slice(i + 1).filter(other => Math.abs(l - other) < 1e-10)).length;
    expect(equalPairs).toBe(t.side === 'equilateral' ? 3 : t.side === 'isosceles' ? 1 : 0);
    expect(t.angles.reduce((a, b) => a + b, 0)).toBe(180);
});
test('hundredth exchanges preserve exact integers and reject partial bundles', () => {
    expect(exchange({ whole: 0, tenth: 4, hundredth: 8 }, 'hundredth')).toBeNull();
    let p = { whole: 1, tenth: 2, hundredth: 0 };
    expect(hundredthValue(p)).toBe(120);
    p = exchange(p, 'whole')!;
    expect(hundredthValue(p)).toBe(120);
    p = exchange(p, 'tenth')!;
    expect(hundredthValue(p)).toBe(120);
    expect(hundredthValue({ ...p, tenth: p.tenth - 3, hundredth: p.hundredth - 5 })).toBe(85);
    const addition = exchange({ whole: 0, tenth: 7, hundredth: 14 }, 'hundredth')!;
    expect(addition).toEqual({ whole: 0, tenth: 8, hundredth: 4 });
    expect(hundredthValue(addition)).toBe(84);
});
test('partition identity is unordered and supports three nonempty groups', () => { expect(partitionKey([5, 6, 0])).toBe(partitionKey([6, 5, 0])); expect(partitionKey([3, 3, 5])).not.toBe(partitionKey([5, 6, 0])); });
test('perimeter accepts complete equivalent equations and rejects omitted edges or unsupported equality', () => {
    for (const text of ['11+6+11+6', '6+11+6+11=34', '2(11+6)', '2*11+2*6'])
        expect(perimeterEquation(text, 11, 6)).toBe(true);
    for (const text of ['11+6', '11+6+11', '11+6+11+6=22', '34', '11*6', '11+6+11+6=34=0'])
        expect(perimeterEquation(text, 11, 6)).toBe(false);
});
test('the deceptive rule fits only the first row; one rule supports all known and inverse pairs', () => { expect([2, 4, 7].map(n => ruleOutput('add10', n))).toEqual([12, 14, 17]); expect([2, 4, 7, 5, 9].map(n => ruleOutput('times6', n))).toEqual([12, 24, 42, 30, 54]); });
