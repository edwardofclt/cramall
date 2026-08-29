import standardsJson from './standards.json';
import { StandardsDataSchema } from './schema';

const OE_CODES = Array.from({ length: 6 }, (_, index) => `ELA.4.OE.${index + 1}`);

test('checked-in generated standards satisfy the runtime schema and referential invariants', () => {
  expect(() => StandardsDataSchema.parse(standardsJson)).not.toThrow();
});

test('runtime standards validation rejects malformed fields and broken references', () => {
  const malformed = structuredClone(standardsJson) as unknown as Record<string, any>;
  malformed.math.units[0].indicatorCodes.push('4.NOT.REAL');
  malformed.science.units[1].prerequisiteUnits.push(99);

  expect(() => StandardsDataSchema.parse(malformed)).toThrow();
});

test('all six reading overarching expectations remain explicit cross-cutting metadata', () => {
  const parsed = StandardsDataSchema.parse(standardsJson);
  expect(parsed.reading.crossCuttingExpectations.map(({ code }) => code)).toEqual(OE_CODES);
  expect(parsed.reading.indicators.some(({ code }) => code.includes('.OE.'))).toBe(false);
  expect(parsed.reading.units.flatMap(({ indicatorCodes }) => indicatorCodes).some((code) => code.includes('.OE.')))
    .toBe(false);
  expect(parsed.math.crossCuttingExpectations).toEqual([]);
  expect(parsed.science.crossCuttingExpectations).toEqual([]);
});
