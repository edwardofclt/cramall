#!/usr/bin/env node
// Reads docs/research/sc-grade4-standards.json and writes the trimmed,
// schema-validated build-time content module in src/content/standards.
//
// Run with: node scripts/build-standards.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { z } from 'zod';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const SOURCE_PATH = path.join(repoRoot, 'docs/research/sc-grade4-standards.json');
const OUTPUT_PATH = path.join(repoRoot, 'src/content/standards/standards.json');

const SUBJECT_KEY_MAP = {
  math: 'math',
  'ela-reading': 'reading',
  science: 'science',
  'social-studies': 'social-studies',
};
const SUBJECT_IDS = ['math', 'reading', 'science', 'social-studies'];
const OE_CODE_PATTERN = /^ELA\.4\.OE\./;
const OE_CODES = Array.from({ length: 6 }, (_, index) => `ELA.4.OE.${index + 1}`);

const IndicatorSchema = z.object({
  code: z.string().min(1),
  text: z.string().min(1),
  strand: z.string().min(1),
}).strict();
const GeneratedUnitSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(1),
  indicatorCodes: z.array(z.string().min(1)).min(1),
  prerequisiteUnits: z.array(z.number().int().positive()),
}).strict();
const GeneratedSubjectSchema = z.object({
  document: z.object({ title: z.string().min(1), url: z.string().url() }).strict(),
  indicators: z.array(IndicatorSchema).min(1),
  crossCuttingExpectations: z.array(IndicatorSchema),
  units: z.array(GeneratedUnitSchema).min(1),
}).strict();

export const GeneratedStandardsSchema = z.object({
  math: GeneratedSubjectSchema,
  reading: GeneratedSubjectSchema,
  science: GeneratedSubjectSchema,
  'social-studies': GeneratedSubjectSchema,
}).strict().superRefine((data, context) => {
  for (const subjectId of SUBJECT_IDS) {
    const subject = data[subjectId];
    const codes = subject.indicators.map(({ code }) => code);
    const crossCodes = subject.crossCuttingExpectations.map(({ code }) => code);
    const unitNumbers = subject.units.map(({ number }) => number);
    const knownCodes = new Set(codes);
    const knownUnits = new Set(unitNumbers);
    if (knownCodes.size !== codes.length || new Set(crossCodes).size !== crossCodes.length) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: [subjectId], message: 'duplicate indicator code' });
    }
    if (new Set(unitNumbers).size !== unitNumbers.length) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: [subjectId, 'units'], message: 'duplicate unit number' });
    }
    if (new Set([...codes, ...crossCodes]).size !== codes.length + crossCodes.length) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: [subjectId], message: 'regular and cross-cutting codes overlap' });
    }
    for (const unit of subject.units) {
      if (new Set(unit.indicatorCodes).size !== unit.indicatorCodes.length) {
        context.addIssue({ code: z.ZodIssueCode.custom, path: [subjectId, 'units'], message: 'duplicate unit indicator code' });
      }
      for (const code of unit.indicatorCodes) {
        if (!knownCodes.has(code)) {
          context.addIssue({ code: z.ZodIssueCode.custom, path: [subjectId, 'units'], message: `unknown unit indicator ${code}` });
        }
      }
      for (const prerequisite of unit.prerequisiteUnits) {
        if (!knownUnits.has(prerequisite) || prerequisite === unit.number) {
          context.addIssue({ code: z.ZodIssueCode.custom, path: [subjectId, 'units'], message: `invalid prerequisite ${prerequisite}` });
        }
      }
    }
    const assigned = new Set(subject.units.flatMap(({ indicatorCodes }) => indicatorCodes));
    for (const code of codes) {
      if (!assigned.has(code)) {
        context.addIssue({ code: z.ZodIssueCode.custom, path: [subjectId, 'indicators'], message: `unassigned indicator ${code}` });
      }
    }
  }
  const readingOE = data.reading.crossCuttingExpectations.map(({ code }) => code);
  if (readingOE.length !== OE_CODES.length || readingOE.some((code, index) => code !== OE_CODES[index])) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['reading', 'crossCuttingExpectations'],
      message: 'reading must retain ELA.4.OE.1 through ELA.4.OE.6 in order',
    });
  }
  if (data.reading.indicators.some(({ code }) => OE_CODE_PATTERN.test(code)) ||
      data.reading.units.some(({ indicatorCodes }) => indicatorCodes.some((code) => OE_CODE_PATTERN.test(code)))) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['reading'],
      message: 'reading OE codes must be cross-cutting only',
    });
  }
  if (data.math.crossCuttingExpectations.length || data.science.crossCuttingExpectations.length || data['social-studies'].crossCuttingExpectations.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'only reading may define cross-cutting expectations' });
  }
});

const SourceIndicatorSchema = IndicatorSchema;
const SourceUnitSchema = z.object({
  unitNumber: z.number().int().positive(),
  title: z.string().min(1),
  indicatorCodes: z.array(z.string().min(1)).min(1),
  prerequisiteUnits: z.array(z.number().int().positive()),
}).passthrough();
const SourceSubjectSchema = z.object({
  document: z.object({ title: z.string().min(1), url: z.string().url() }).passthrough(),
  indicators: z.array(SourceIndicatorSchema).min(1),
  suggestedUnitSequence: z.array(SourceUnitSchema).min(1),
}).passthrough();
const SourceSchema = z.object({
  bySubject: z.object({
    math: SourceSubjectSchema,
    'ela-reading': SourceSubjectSchema,
    science: SourceSubjectSchema,
    'social-studies': SourceSubjectSchema,
  }).passthrough(),
}).passthrough();

function buildSubject(sourceSubject, outputId) {
  const allIndicators = sourceSubject.indicators.map(({ code, text, strand }) => ({ code, text, strand }));
  const crossCuttingExpectations = outputId === 'reading'
    ? allIndicators.filter(({ code }) => OE_CODE_PATTERN.test(code))
    : [];
  const indicators = outputId === 'reading'
    ? allIndicators.filter(({ code }) => !OE_CODE_PATTERN.test(code))
    : allIndicators;
  const units = sourceSubject.suggestedUnitSequence.map((unit) => ({
    number: unit.unitNumber,
    title: unit.title,
    indicatorCodes: unit.indicatorCodes.filter((code) => outputId !== 'reading' || !OE_CODE_PATTERN.test(code)),
    prerequisiteUnits: [...unit.prerequisiteUnits],
  }));

  return {
    document: {
      title: sourceSubject.document.title,
      url: sourceSubject.document.url,
    },
    indicators,
    crossCuttingExpectations,
    units,
  };
}

export function buildStandards(rawSource) {
  const source = SourceSchema.parse(rawSource);
  const output = {};
  for (const [sourceKey, outputId] of Object.entries(SUBJECT_KEY_MAP)) {
    output[outputId] = buildSubject(source.bySubject[sourceKey], outputId);
  }
  return GeneratedStandardsSchema.parse(output);
}

export function generateStandardsFile() {
  const source = JSON.parse(readFileSync(SOURCE_PATH, 'utf8'));
  const output = buildStandards(source);
  writeFileSync(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  for (const [id, subject] of Object.entries(output)) {
    console.log(`${id}: ${subject.indicators.length} indicators, ${subject.units.length} units`);
  }
  console.log(`Wrote ${path.relative(repoRoot, OUTPUT_PATH)}`);
}

const directEntry = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (directEntry === fileURLToPath(import.meta.url)) generateStandardsFile();
