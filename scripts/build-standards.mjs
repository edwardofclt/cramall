#!/usr/bin/env node
// Reads docs/research/sc-grade4-standards.json and writes the trimmed,
// build-time content module src/content/standards/standards.json.
//
// Run with: node scripts/build-standards.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const SOURCE_PATH = path.join(repoRoot, 'docs/research/sc-grade4-standards.json');
const OUTPUT_PATH = path.join(repoRoot, 'src/content/standards/standards.json');

// Maps source bySubject keys to output subject ids.
const SUBJECT_KEY_MAP = {
  math: 'math',
  'ela-reading': 'reading',
  science: 'science',
};

// Reading exception (spec §2): the six ELA.4.OE.* Overarching Expectations are
// cross-cutting habits embedded across all reading lessons, not unit content.
// Drop them from indicators and from every unit's indicatorCodes.
const OE_CODE_PATTERN = /^ELA\.4\.OE\./;

function buildSubject(sourceSubject, outputId) {
  const document = {
    title: sourceSubject.document.title,
    url: sourceSubject.document.url,
  };

  let indicators = sourceSubject.indicators.map((i) => ({
    code: i.code,
    text: i.text,
    strand: i.strand,
  }));

  let units = sourceSubject.suggestedUnitSequence.map((u) => ({
    number: u.unitNumber,
    title: u.title,
    indicatorCodes: [...u.indicatorCodes],
    prerequisiteUnits: [...u.prerequisiteUnits],
  }));

  if (outputId === 'reading') {
    indicators = indicators.filter((i) => !OE_CODE_PATTERN.test(i.code));
    units = units.map((u) => ({
      ...u,
      indicatorCodes: u.indicatorCodes.filter((c) => !OE_CODE_PATTERN.test(c)),
    }));
  }

  return { document, indicators, units };
}

function main() {
  const source = JSON.parse(readFileSync(SOURCE_PATH, 'utf-8'));
  const output = {};

  for (const [sourceKey, outputId] of Object.entries(SUBJECT_KEY_MAP)) {
    const sourceSubject = source.bySubject[sourceKey];
    if (!sourceSubject) {
      throw new Error(`Missing bySubject["${sourceKey}"] in ${SOURCE_PATH}`);
    }
    output[outputId] = buildSubject(sourceSubject, outputId);
  }

  writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf-8');

  for (const [id, subject] of Object.entries(output)) {
    console.log(
      `${id}: ${subject.indicators.length} indicators, ${subject.units.length} units`,
    );
  }
  console.log(`Wrote ${path.relative(repoRoot, OUTPUT_PATH)}`);
}

main();
