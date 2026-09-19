#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = JSON.parse(readFileSync('docs/research/sc-grade4-standards.json', 'utf8'));
const generated = JSON.parse(readFileSync('src/content/standards/standards.json', 'utf8'));
const OE_PATTERN = /^ELA\.4\.OE\./;
const sourceKey = {
  math: 'math',
  reading: 'ela-reading',
  science: 'science',
  'social-studies': 'social-studies',
};
const expectedUnitCounts = { math: 12, reading: 11, science: 8, 'social-studies': 5 };

for (const subjectId of ['math', 'reading', 'science', 'social-studies']) {
  const raw = source.bySubject[sourceKey[subjectId]];
  const built = generated[subjectId];
  const regular = raw.indicators.filter(({ code }) => subjectId !== 'reading' || !OE_PATTERN.test(code));
  const crossCutting = subjectId === 'reading'
    ? raw.indicators.filter(({ code }) => OE_PATTERN.test(code))
    : [];

  assert.deepEqual(
    built.indicators,
    regular,
    `${subjectId} regular indicator codes drifted`,
  );
  assert.deepEqual(
    built.crossCuttingExpectations.map(({ code }) => code),
    crossCutting.map(({ code }) => code),
    `${subjectId} cross-cutting codes drifted`,
  );
  assert.deepEqual(
    built.units,
    raw.suggestedUnitSequence.map((unit) => ({
      number: unit.unitNumber,
      title: unit.title,
      indicatorCodes: unit.indicatorCodes.filter(
        (code) => subjectId !== 'reading' || !OE_PATTERN.test(code),
      ),
      prerequisiteUnits: [...unit.prerequisiteUnits],
    })),
    `${subjectId} unit metadata drifted`,
  );
  assert.equal(built.units.length, expectedUnitCounts[subjectId], `${subjectId} unit count drifted`);
}

assert.deepEqual(
  generated.reading.crossCuttingExpectations.map(({ code }) => code),
  ['ELA.4.OE.1', 'ELA.4.OE.2', 'ELA.4.OE.3', 'ELA.4.OE.4', 'ELA.4.OE.5', 'ELA.4.OE.6'],
  'Reading OE codes must remain exact and ordered',
);

console.log('standards parity: math 33/12, reading 20+6 OE/11, science 14/8, social studies 30/5');
