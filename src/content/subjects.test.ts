import { SUBJECTS, getSubject, findLesson, indicatorText } from './subjects';

test('three subjects with correct guides and unit counts', () => {
  expect(SUBJECTS.map((s) => s.id)).toEqual(['math', 'reading', 'science']);
  expect(getSubject('math').guide).toBe('nutty');
  expect(getSubject('math').units).toHaveLength(12);
  expect(getSubject('reading').units).toHaveLength(11);
  expect(getSubject('science').units).toHaveLength(8);
});
test('unit ids and prerequisites resolve', () => {
  for (const s of SUBJECTS) {
    const ids = new Set(s.units.map((u) => u.id));
    for (const u of s.units)
      for (const p of u.prerequisiteUnitIds) expect(ids.has(p)).toBe(true);
  }
});
test('reading units contain no OE codes', () => {
  const codes = getSubject('reading').units.flatMap((u) => u.indicatorCodes);
  expect(codes.some((c) => c.includes('.OE.'))).toBe(false);
});
test('indicator text lookup works', () => {
  expect(indicatorText('4.NR.1.1')).toMatch(/millions/i);
  expect(indicatorText('bogus')).toBeNull();
});
test('findLesson returns null for unknown id', () => {
  expect(findLesson('nope')).toBeNull();
});
