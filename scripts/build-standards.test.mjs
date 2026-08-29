import { describe, expect, test } from 'vitest';
import source from '../docs/research/sc-grade4-standards.json' with { type: 'json' };
import generated from '../src/content/standards/standards.json' with { type: 'json' };
import * as generator from './build-standards.mjs';

describe('standards generator', () => {
  test('exports a deterministic build function whose output matches the checked-in artifact', () => {
    expect(typeof generator.buildStandards).toBe('function');
    expect(generator.buildStandards(source)).toEqual(generated);
  });

  test('rejects malformed source instead of emitting partial standards', () => {
    const malformed = structuredClone(source);
    malformed.bySubject.math.suggestedUnitSequence[0].indicatorCodes.push('4.NOT.REAL');

    expect(() => generator.buildStandards(malformed)).toThrow();
  });

  test('retains all six OE indicators as reading cross-cutting expectations only', () => {
    const output = generator.buildStandards(source);
    expect(output.reading.crossCuttingExpectations).toHaveLength(6);
    expect(output.reading.indicators.some(({ code }) => code.startsWith('ELA.4.OE.'))).toBe(false);
    expect(output.reading.units.flatMap(({ indicatorCodes }) => indicatorCodes)
      .some((code) => code.startsWith('ELA.4.OE.'))).toBe(false);
  });
});
