import { z } from 'zod';

export const StandardsIndicatorSchema = z.object({
  code: z.string().min(1),
  text: z.string().min(1),
  strand: z.string().min(1),
}).strict();

export const StandardsUnitSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(1),
  indicatorCodes: z.array(z.string().min(1)).min(1),
  prerequisiteUnits: z.array(z.number().int().positive()),
}).strict();

const StandardsSubjectSchema = z.object({
  document: z.object({
    title: z.string().min(1),
    url: z.string().url(),
  }).strict(),
  indicators: z.array(StandardsIndicatorSchema).min(1),
  crossCuttingExpectations: z.array(StandardsIndicatorSchema),
  units: z.array(StandardsUnitSchema).min(1),
}).strict();

const OE_CODES = Array.from({ length: 6 }, (_, index) => `ELA.4.OE.${index + 1}`);

export const StandardsDataSchema = z.object({
  math: StandardsSubjectSchema,
  reading: StandardsSubjectSchema,
  science: StandardsSubjectSchema,
}).strict().superRefine((data, context) => {
  for (const subjectId of ['math', 'reading', 'science'] as const) {
    const subject = data[subjectId];
    const indicatorCodes = subject.indicators.map(({ code }) => code);
    const crossCuttingCodes = subject.crossCuttingExpectations.map(({ code }) => code);
    const unitNumbers = subject.units.map(({ number }) => number);
    const allCodes = new Set([...indicatorCodes, ...crossCuttingCodes]);
    const regularCodes = new Set(indicatorCodes);
    const realUnits = new Set(unitNumbers);

    for (const [label, values] of [
      ['indicator code', indicatorCodes],
      ['cross-cutting code', crossCuttingCodes],
      ['unit number', unitNumbers.map(String)],
    ] as const) {
      if (new Set(values).size !== values.length) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [subjectId],
          message: `${subjectId} has a duplicate ${label}`,
        });
      }
    }

    for (const unit of subject.units) {
      if (new Set(unit.indicatorCodes).size !== unit.indicatorCodes.length) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [subjectId, 'units', unit.number, 'indicatorCodes'],
          message: 'unit indicator codes must be unique',
        });
      }
      for (const code of unit.indicatorCodes) {
        if (!regularCodes.has(code)) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: [subjectId, 'units', unit.number, 'indicatorCodes'],
            message: `unit references unknown or cross-cutting indicator ${code}`,
          });
        }
      }
      for (const prerequisite of unit.prerequisiteUnits) {
        if (!realUnits.has(prerequisite) || prerequisite === unit.number) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: [subjectId, 'units', unit.number, 'prerequisiteUnits'],
            message: `unit references invalid prerequisite ${prerequisite}`,
          });
        }
      }
    }

    const assignedCodes = new Set(subject.units.flatMap(({ indicatorCodes: codes }) => codes));
    for (const code of regularCodes) {
      if (!assignedCodes.has(code)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [subjectId, 'indicators'],
          message: `indicator ${code} is not assigned to a unit`,
        });
      }
    }
    if (allCodes.size !== indicatorCodes.length + crossCuttingCodes.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [subjectId],
        message: 'regular and cross-cutting indicator identities overlap',
      });
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
  if (data.reading.indicators.some(({ code }) => code.startsWith('ELA.4.OE.'))) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['reading', 'indicators'],
      message: 'reading OE codes must be cross-cutting, not regular indicators',
    });
  }
  for (const subjectId of ['math', 'science'] as const) {
    if (data[subjectId].crossCuttingExpectations.length > 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [subjectId, 'crossCuttingExpectations'],
        message: `${subjectId} must not declare reading cross-cutting expectations`,
      });
    }
  }
});

export type StandardsData = z.infer<typeof StandardsDataSchema>;
export type StandardsSubject = StandardsData[keyof StandardsData];
export type StandardsUnit = z.infer<typeof StandardsUnitSchema>;
