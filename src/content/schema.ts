import { z } from 'zod';
import { normalizeAnswerText } from './answer-normalization';
import {
  MAX_BALANCE_DECIMAL_PLACES,
  compareExactDecimals,
  exactDecimalFromNumber,
  exactDecimalRoundTripsNumber,
  sumExactDecimals,
  type ExactDecimal,
} from './balance-decimals';

export const WIDGET_TYPES = [
  'place-value-builder',
  'number-line-compare',
  'base-ten-blocks',
  'fraction-models',
  'area-model-multiplier',
  'array-builder',
  'money-counter',
  'clock-elapsed-time',
  'quarter-inch-ruler',
  'balance-scale',
  'shape-classifier',
  'data-plot-builder',
  'probability-spinner',
  'collision-ramp',
  'energy-transfer-builder',
  'wave-maker',
  'light-reflection-eye',
  'message-sender',
  'energy-conversion-designer',
  'animal-structure-matcher',
  'erosion-simulator',
  'rock-layer-explorer',
  'topographic-map-explorer',
  'hazard-solution-designer',
  'resource-sorter',
  'word-root-builder',
  'context-clue-detective',
] as const;

export const SubjectIdSchema = z.enum(['math', 'reading', 'science']);
export const GuideIdSchema = z.enum(['nutty', 'winnie', 'sandy']);
export const PoseSchema = z.enum(['idle', 'talk', 'think', 'cheer', 'oops']);

export const UnitIdSchema = z.string().regex(
  /^(math|reading|science)-u\d{2}$/,
  'invalid canonical unit id',
);
export const LessonIdSchema = z.string().regex(
  /^(math|reading|science)-u\d{2}-l\d{2}$/,
  'invalid canonical lesson id',
);
export const LearnCardIdSchema = z.string().regex(
  /^(math|reading|science)-u\d{2}-l\d{2}-c\d+$/,
  'invalid canonical learn card id',
);
export const QuestionIdSchema = z.string().regex(
  /^(math|reading|science)-u\d{2}-l\d{2}-q\d{2,}$/,
  'invalid canonical question id',
);
const OptionIdSchema = z.string().regex(
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  'invalid canonical option id',
);

export const DialogueLineSchema = z.object({
  speaker: z.union([GuideIdSchema, z.literal('kid')]),
  text: z.string().min(1),
  pose: PoseSchema.optional(),
});

export const RichBlockSchema = z.object({
  kind: z.enum(['text', 'example', 'tip']),
  text: z.string().min(1),
});

/** A small, unscored check that lets a learner reinforce one teaching-card idea. */
const InlineCheckChoiceSchema = z.object({
  id: OptionIdSchema,
  text: z.string().trim().min(1).max(120),
}).strict();

export const InlineCheckSchema = z.object({
  prompt: z.string().trim().min(1).max(240),
  choices: z.array(InlineCheckChoiceSchema).min(2).max(4),
  correctChoiceId: OptionIdSchema,
  explanation: z.string().trim().min(1).max(320),
}).strict().superRefine((check, context) => {
  if (!check.choices.some((choice) => choice.id === check.correctChoiceId)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['correctChoiceId'],
      message: 'correctChoiceId must name one of the check choices',
    });
  }
  if (new Set(check.choices.map((choice) => choice.id)).size !== check.choices.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['choices'],
      message: 'check choice ids must be unique',
    });
  }
  if (new Set(check.choices.map((choice) => normalizeAnswerText(choice.text))).size !== check.choices.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['choices'],
      message: 'check choice text must be unique after normalization',
    });
  }
});

/** Optional, unscored instruction that demonstrates one lesson idea without saving progress. */
export const InstructionalDemoSchema = z.object({
  type: z.literal('roller-coaster'),
  focus: z.enum(['speed-energy', 'evidence', 'collision']),
}).strict();

export const PlaceValueWidgetConfigSchema = z.object({
  target: z.number().int().min(0).optional(),
  periods: z.union([z.literal(2), z.literal(3)]).optional(),
}).strict().superRefine((config, context) => {
  const columns = (config.periods ?? 2) * 3;
  if (config.target !== undefined && config.target >= 10 ** columns) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['target'],
      message: `target must fit in ${columns} place-value columns`,
    });
  }
});

function alignsToStep(value: number, min: number, step: number): boolean {
  const steps = (value - min) / step;
  return Math.abs(steps - Math.round(steps)) < 1e-9;
}

const alignsToDenominator = (value: number, denominator: number) =>
  Math.abs(value * denominator - Math.round(value * denominator)) < 1e-9;

export const NumberLineWidgetConfigSchema = z.object({
  min: z.number().finite(),
  max: z.number().finite(),
  a: z.number().finite(),
  b: z.number().finite(),
  step: z.number().positive().finite().optional(),
  display: z.enum(['number', 'fraction']).optional(),
  denominator: z.union([z.literal(2), z.literal(4), z.literal(8), z.literal(10), z.literal(100)]).optional(),
}).strict().superRefine((config, context) => {
  if (config.max <= config.min) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['max'], message: 'max must exceed min' });
  }
  if (config.a < config.min || config.a > config.max || config.b < config.min || config.b > config.max) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'markers must be on line' });
  }
  const step = config.step ?? (config.display === 'fraction' && config.denominator ? 1 / config.denominator : 1);
  for (const marker of ['a', 'b'] as const) {
    if (!alignsToStep(config[marker], config.min, step)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [marker],
        message: `${marker} must align to step from min`,
      });
    }
  }
  if (config.display === 'fraction') {
    if (!config.denominator) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['denominator'], message: 'required' });
      return;
    }
    for (const [field, value] of Object.entries({
      min: config.min,
      max: config.max,
      a: config.a,
      b: config.b,
      step,
    })) {
      if (!alignsToDenominator(value, config.denominator)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field],
          message: `${field} must align to denominator grid`,
        });
      }
    }
  }
});

export const BaseTenBlocksWidgetConfigSchema = z.object({
  target: z.number().int().min(0).max(9999).optional(),
  initial: z.object({
    ones: z.number().int().min(0).max(9),
    tens: z.number().int().min(0).max(9),
    hundreds: z.number().int().min(0).max(9),
    thousands: z.number().int().min(0).max(9),
  }).strict().optional(),
  allowRegroup: z.boolean().optional(),
}).strict();

export const BaseTenBlocksWidgetRefSchema = z.object({
  type: z.literal('base-ten-blocks'),
  config: BaseTenBlocksWidgetConfigSchema,
}).strict();

export const FractionModelsWidgetConfigSchema = z.object({
  mode: z.enum(['bars', 'circles', 'both']),
  denominator: z.number().int().min(2).max(12),
  numerator: z.number().int().min(0).max(12).optional(),
  target: z.object({
    numerator: z.number().int().min(0).max(12),
    denominator: z.number().int().min(2).max(12),
  }).strict().optional(),
  allowEquivalent: z.boolean().optional(),
}).strict().superRefine((value, context) => {
  if ((value.numerator ?? 0) > value.denominator) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['numerator'],
      message: 'too large',
    });
  }
  if (value.target && value.target.numerator > value.target.denominator) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['target', 'numerator'],
      message: 'too large',
    });
  }
  if (value.target) {
    const reachable = Array.from({ length: value.denominator + 1 }, (_, numerator) => (
      value.allowEquivalent
        ? numerator * value.target!.denominator === value.target!.numerator * value.denominator
        : numerator === value.target!.numerator && value.denominator === value.target!.denominator
    )).some(Boolean);
    if (!reachable) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['target'],
        message: 'target is unreachable with this denominator',
      });
    }
  }
});

export const FractionModelsWidgetRefSchema = z.object({
  type: z.literal('fraction-models'),
  config: FractionModelsWidgetConfigSchema,
}).strict();

export const AreaModelMultiplierWidgetConfigSchema = z.object({
  a: z.number().int().min(1).max(99),
  b: z.number().int().min(1).max(99),
  splitA: z.array(z.number().int().positive()).min(1).optional(),
  splitB: z.array(z.number().int().positive()).min(1).optional(),
  targetProduct: z.number().int().min(1).max(9801).optional(),
}).strict().superRefine((value, context) => {
  if (value.splitA && value.splitA.reduce((sum, part) => sum + part, 0) !== value.a) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['splitA'], message: 'must sum to a' });
  }
  if (value.splitB && value.splitB.reduce((sum, part) => sum + part, 0) !== value.b) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['splitB'], message: 'must sum to b' });
  }
  if (value.targetProduct !== undefined && value.targetProduct !== value.a * value.b) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['targetProduct'], message: 'must equal product' });
  }
});

export const AreaModelMultiplierWidgetRefSchema = z.object({
  type: z.literal('area-model-multiplier'),
  config: AreaModelMultiplierWidgetConfigSchema,
}).strict();

export const ArrayBuilderWidgetConfigSchema = z.object({
  rows: z.number().int().min(1).max(20),
  columns: z.number().int().min(1).max(20),
  targetProduct: z.number().int().min(1).max(400).optional(),
  editable: z.boolean().optional(),
}).strict().superRefine((value, context) => {
  if (value.targetProduct === undefined) return;

  const initial = value.rows * value.columns;
  const reachable = initial === value.targetProduct || (
    Boolean(value.editable) && Array.from({ length: 20 }, (_, index) => index + 1).some((rows) => (
      value.targetProduct! % rows === 0 && value.targetProduct! / rows <= 20
    ))
  );
  if (!reachable) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['targetProduct'],
      message: 'target product is unreachable',
    });
  }
});

export const ArrayBuilderWidgetRefSchema = z.object({
  type: z.literal('array-builder'),
  config: ArrayBuilderWidgetConfigSchema,
}).strict();

const DenominationSchema = z.union([
  z.literal(1),
  z.literal(5),
  z.literal(10),
  z.literal(25),
  z.literal(100),
]);

function canMakeMoneyTarget(target: number, denominations: readonly number[]): boolean {
  const reachable = Array<boolean>(target + 1).fill(false);
  reachable[0] = true;
  for (let cents = 1; cents <= target; cents += 1) {
    reachable[cents] = denominations.some((coin) => coin <= cents && reachable[cents - coin]);
  }
  return reachable[target];
}

export const MoneyCounterWidgetConfigSchema = z.object({
  targetCents: z.number().int().min(0).max(9999).optional(),
  denominations: z.array(DenominationSchema).min(1).refine(
    (values) => new Set(values).size === values.length,
    'duplicates',
  ).optional(),
}).strict().superRefine((value, context) => {
  if (value.targetCents === undefined) return;
  const denominations = value.denominations ?? [1, 5, 10, 25, 100];
  if (!canMakeMoneyTarget(value.targetCents, denominations)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['targetCents'],
      message: 'target is unreachable with these denominations',
    });
  }
});

export const MoneyCounterWidgetRefSchema = z.object({
  type: z.literal('money-counter'),
  config: MoneyCounterWidgetConfigSchema,
}).strict();

const TimeSchema = z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/);
const MinuteStepSchema = z.union([z.literal(5), z.literal(15)]);
const minutePart = (time: string) => Number(time.slice(3));

const SetTimeConfigSchema = z.object({
  mode: z.literal('set-time'),
  targetTime: TimeSchema,
  minuteStep: MinuteStepSchema.optional(),
}).strict();

const ElapsedTimeConfigSchema = z.object({
  mode: z.literal('elapsed'),
  startTime: TimeSchema,
  elapsedMinutes: z.number().int().min(0).max(1439),
  minuteStep: MinuteStepSchema.optional(),
}).strict();

export const ClockElapsedTimeWidgetConfigSchema = z.discriminatedUnion('mode', [
  SetTimeConfigSchema,
  ElapsedTimeConfigSchema,
]).superRefine((value, context) => {
  if (value.mode === 'set-time' && minutePart(value.targetTime) % (value.minuteStep ?? 5) !== 0) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['targetTime'],
      message: 'target must align to minuteStep',
    });
  }
});

export const ClockElapsedTimeWidgetRefSchema = z.object({
  type: z.literal('clock-elapsed-time'),
  config: ClockElapsedTimeWidgetConfigSchema,
}).strict();

const isQuarterAligned = (value: number) => Math.abs(value * 4 - Math.round(value * 4)) < 1e-9;

export const QuarterInchRulerWidgetConfigSchema = z.object({
  lengthInches: z.number().int().min(1).max(24).optional(),
  targetInches: z.number().min(0).max(24),
  startInches: z.number().min(0).max(24).optional(),
}).strict().superRefine((value, context) => {
  const length = value.lengthInches ?? 12;
  if (!isQuarterAligned(value.targetInches) || !isQuarterAligned(value.startInches ?? 0)) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'quarter increments required' });
  }
  if (value.targetInches > length || (value.startInches ?? 0) > length) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'marker exceeds ruler' });
  }
});

export const QuarterInchRulerWidgetRefSchema = z.object({
  type: z.literal('quarter-inch-ruler'),
  config: QuarterInchRulerWidgetConfigSchema,
}).strict();

const WeightSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  value: z.number().positive().finite(),
}).strict().superRefine((weight, context) => {
  if (!exactDecimalFromNumber(weight.value)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['value'],
      message: `value must have at most ${MAX_BALANCE_DECIMAL_PLACES} decimal places`,
    });
  }
});

// Sixteen retained weights bound exhaustive left/right subset comparisons to 2^16 (65,536).
const MAX_MAKE_EQUAL_WEIGHTS = 16;
const MAX_FINITE_BALANCE_TOTAL = (() => {
  const maximum = exactDecimalFromNumber(Number.MAX_VALUE);
  if (!maximum) throw new Error('Number.MAX_VALUE must be an exact balance decimal.');
  return maximum;
})();

function subsetTotals(weights: Array<{ value: number }>): ExactDecimal[] {
  const values = weights.map((weight) => exactDecimalFromNumber(weight.value));
  if (values.some((value) => !value)) return [];

  const totals = [{ units: 0n, scale: 0 }];
  for (const value of values) {
    if (!value) return [];
    totals.push(...totals.map((total) => sumExactDecimals([total, value])));
  }
  return totals;
}

function hasReachableNonzeroBalance(
  left: Array<{ value: number }>,
  right: Array<{ value: number }>,
) {
  const leftTotals = subsetTotals(left);
  const rightTotals = subsetTotals(right);
  return leftTotals.some((leftTotal) => leftTotal.units > 0n && rightTotals.some(
    (rightTotal) => rightTotal.units > 0n && compareExactDecimals(leftTotal, rightTotal) === 0,
  ));
}

function exactPanTotal(weights: Array<{ value: number }>): ExactDecimal | null {
  const values = weights.map((weight) => exactDecimalFromNumber(weight.value));
  if (values.some((value) => !value)) return null;
  return sumExactDecimals(values as ExactDecimal[]);
}

function hasSafeEmittedTotal(total: ExactDecimal) {
  return compareExactDecimals(total, MAX_FINITE_BALANCE_TOTAL) <= 0
    && exactDecimalRoundTripsNumber(total);
}

function hasSafeFullPanTotal(weights: Array<{ value: number }>) {
  const total = exactPanTotal(weights);
  return total !== null && hasSafeEmittedTotal(total);
}

function hasSafeSubsetTotals(weights: Array<{ value: number }>) {
  const totals = subsetTotals(weights);
  return totals.length > 0 && totals.every(hasSafeEmittedTotal);
}

export const BalanceScaleWidgetConfigSchema = z.object({
  left: z.array(WeightSchema).min(1),
  right: z.array(WeightSchema).min(1),
  task: z.enum(['compare', 'make-equal']).optional(),
}).strict().superRefine((value, context) => {
  const ids = [...value.left, ...value.right].map((weight) => weight.id);
  if (new Set(ids).size !== ids.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'duplicate ids' });
  }
  const makeEqual = value.task === 'make-equal';
  const validatePan = makeEqual && ids.length <= MAX_MAKE_EQUAL_WEIGHTS
    ? hasSafeSubsetTotals
    : hasSafeFullPanTotal;
  if (!validatePan(value.left)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['left'],
      message: 'left totals must round-trip through a finite number exactly',
    });
  }
  if (!validatePan(value.right)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['right'],
      message: 'right totals must round-trip through a finite number exactly',
    });
  }
  if (!makeEqual) return;

  if (ids.length > MAX_MAKE_EQUAL_WEIGHTS) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: `make-equal supports at most ${MAX_MAKE_EQUAL_WEIGHTS} weights for bounded reachability validation`,
    });
    return;
  }
  if (!hasReachableNonzeroBalance(value.left, value.right)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'make-equal needs a reachable nonzero balance',
    });
  }
});

export const BalanceScaleWidgetRefSchema = z.object({
  type: z.literal('balance-scale'),
  config: BalanceScaleWidgetConfigSchema,
}).strict();

const ShapeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  sides: z.number().int().min(0),
  angles: z.number().int().min(0),
  parallelPairs: z.number().int().min(0),
}).strict();

const ShapeBinSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  value: z.number().int().min(0),
}).strict();

const LegacyShapeClassifierWidgetConfigSchema = z.object({
  shapes: z.array(ShapeSchema).min(2),
  bins: z.array(ShapeBinSchema).min(2),
  rule: z.enum(['sides', 'angles', 'parallelPairs']),
}).strict().superRefine((value, context) => {
  if (new Set(value.shapes.map((shape) => shape.id)).size !== value.shapes.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['shapes'], message: 'shape ids must be unique' });
  }
  if (new Set(value.shapes.map((shape) => shape.label)).size !== value.shapes.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['shapes'], message: 'shape labels must be unique' });
  }
  if (new Set(value.bins.map((bin) => bin.id)).size !== value.bins.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['bins'], message: 'bin ids must be unique' });
  }
  if (new Set(value.bins.map((bin) => bin.value)).size !== value.bins.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['bins'],
      message: 'bin values must be unique',
    });
  }
  if (!value.shapes.every((shape) => value.bins.some((bin) => bin.value === shape[value.rule]))) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['bins'],
      message: 'every rule value needs a bin',
    });
  }
});

export const ShapeDiagramSchema = z.enum([
  'equilateral-triangle', 'isosceles-acute-triangle', 'isosceles-right-triangle', 'isosceles-obtuse-triangle', 'scalene-acute-triangle', 'scalene-right-triangle', 'scalene-obtuse-triangle',
  'quadrilateral', 'parallelogram', 'rectangle', 'rhombus', 'square',
]);
export const ShapeClassificationSchema = z.enum([
  'triangle', 'acute-triangle', 'right-triangle', 'obtuse-triangle', 'equiangular-triangle', 'equilateral-triangle', 'isosceles-triangle', 'scalene-triangle',
  'quadrilateral', 'parallelogram', 'rectangle', 'rhombus', 'square',
]);

const diagramMemberships: Record<z.infer<typeof ShapeDiagramSchema>, readonly z.infer<typeof ShapeClassificationSchema>[]> = {
  'equilateral-triangle': ['triangle', 'equilateral-triangle', 'acute-triangle', 'equiangular-triangle'],
  'isosceles-acute-triangle': ['triangle', 'isosceles-triangle', 'acute-triangle'],
  'isosceles-right-triangle': ['triangle', 'isosceles-triangle', 'right-triangle'],
  'isosceles-obtuse-triangle': ['triangle', 'isosceles-triangle', 'obtuse-triangle'],
  'scalene-acute-triangle': ['triangle', 'scalene-triangle', 'acute-triangle'],
  'scalene-right-triangle': ['triangle', 'scalene-triangle', 'right-triangle'],
  'scalene-obtuse-triangle': ['triangle', 'scalene-triangle', 'obtuse-triangle'],
  quadrilateral: ['quadrilateral'],
  parallelogram: ['quadrilateral', 'parallelogram'],
  rectangle: ['quadrilateral', 'parallelogram', 'rectangle'],
  rhombus: ['quadrilateral', 'parallelogram', 'rhombus'],
  square: ['quadrilateral', 'parallelogram', 'rectangle', 'rhombus', 'square'],
};
const allowedParents: Partial<Record<z.infer<typeof ShapeClassificationSchema>, readonly z.infer<typeof ShapeClassificationSchema>[]>> = {
  'acute-triangle': ['triangle'], 'right-triangle': ['triangle'], 'obtuse-triangle': ['triangle'], 'equiangular-triangle': ['equilateral-triangle'], 'equilateral-triangle': ['triangle'], 'isosceles-triangle': ['triangle'], 'scalene-triangle': ['triangle'],
  parallelogram: ['quadrilateral'], rectangle: ['parallelogram'], rhombus: ['parallelogram'], square: ['rectangle', 'rhombus'],
};
const ClassificationShapeSchema = ShapeSchema.extend({
  diagram: ShapeDiagramSchema,
  classifications: z.array(ShapeClassificationSchema).min(1),
}).strict();
const ClassificationBinSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  classification: ShapeClassificationSchema,
  parentIds: z.array(z.string().min(1)).min(1).optional(),
}).strict();
const ClassificationShapeClassifierWidgetConfigSchema = z.object({
  mode: z.literal('classifications'),
  shapes: z.array(ClassificationShapeSchema).min(1),
  bins: z.array(ClassificationBinSchema).min(2),
}).strict().superRefine((value, context) => {
  const binById = new Map(value.bins.map((bin) => [bin.id, bin]));
  if (binById.size !== value.bins.length || new Set(value.bins.map((bin) => bin.classification)).size !== value.bins.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['bins'], message: 'classification bin ids and classifications must be unique' });
  }
  if (new Set(value.shapes.map((shape) => shape.id)).size !== value.shapes.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['shapes'], message: 'shape ids must be unique' });
  }
  for (const [shapeIndex, shape] of value.shapes.entries()) {
    const expected = diagramMemberships[shape.diagram];
    if (shape.sides !== (shape.diagram.includes('triangle') ? 3 : 4) || shape.angles !== (shape.diagram.includes('triangle') ? 3 : 4) || shape.parallelPairs !== (shape.diagram.includes('triangle') ? 0 : (shape.diagram === 'quadrilateral' ? 0 : 2))) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['shapes', shapeIndex], message: 'diagram counts must match the canonical property model' });
    }
    if (new Set(shape.classifications).size !== shape.classifications.length || shape.classifications.length !== expected.length || !expected.every((classification) => shape.classifications.includes(classification))) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['shapes', shapeIndex, 'classifications'], message: 'classifications must exactly match the canonical diagram' });
    }
    if (!shape.classifications.every((classification) => value.bins.some((bin) => bin.classification === classification))) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['bins'], message: 'every classification needs a bin' });
    }
  }
  for (const [binIndex, bin] of value.bins.entries()) {
    const parents = bin.parentIds ?? [];
    if (new Set(parents).size !== parents.length || parents.some((parentId) => !binById.has(parentId))) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['bins', binIndex, 'parentIds'], message: 'parent ids must be unique known bins' });
    }
    const allowed = allowedParents[bin.classification] ?? [];
    if (parents.some((parentId) => !allowed.includes(binById.get(parentId)?.classification as never))) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['bins', binIndex, 'parentIds'], message: 'parent relationship is not a supported classification edge' });
    }
  }
  const visits = new Set<string>(); const active = new Set<string>();
  const visit = (id: string) => {
    if (active.has(id)) return true;
    if (visits.has(id)) return false;
    visits.add(id); active.add(id);
    const cycle = (binById.get(id)?.parentIds ?? []).some(visit);
    active.delete(id); return cycle;
  };
  if (value.bins.some((bin) => visit(bin.id))) context.addIssue({ code: z.ZodIssueCode.custom, path: ['bins'], message: 'classification parents cannot form a cycle' });
});

export const ShapeClassifierWidgetConfigSchema = z.union([
  LegacyShapeClassifierWidgetConfigSchema,
  ClassificationShapeClassifierWidgetConfigSchema,
]);

export const ShapeClassifierWidgetRefSchema = z.object({
  type: z.literal('shape-classifier'),
  config: ShapeClassifierWidgetConfigSchema,
}).strict();

export const DataPlotBuilderWidgetConfigSchema = z.object({
  kind: z.enum(['bar', 'dot']),
  prompt: z.string().trim().min(1),
  categories: z.array(z.string().trim().min(1)).min(1).refine(
    (categories) => new Set(categories).size === categories.length,
    'categories must be unique',
  ),
  target: z.record(z.number().int().min(0).max(50)),
}).strict().refine((value) => (
  Object.keys(value.target).length === value.categories.length
  && value.categories.every((category) => Object.prototype.hasOwnProperty.call(value.target, category))
), 'target keys must equal categories');

export const DataPlotBuilderWidgetRefSchema = z.object({
  type: z.literal('data-plot-builder'),
  config: DataPlotBuilderWidgetConfigSchema,
}).strict();

const SpinnerSegmentSchema = z.object({
  id: z.string().min(1),
  label: z.string().trim().min(1),
  weight: z.number().finite().positive().optional(),
  color: z.string().trim().min(1).optional(),
}).strict();

export const ProbabilitySpinnerWidgetConfigSchema = z.object({
  segments: z.array(SpinnerSegmentSchema).min(2),
  trials: z.number().int().min(1).max(100).optional(),
  targetOutcomeId: z.string().min(1).optional(),
}).strict().superRefine((value, context) => {
  if (new Set(value.segments.map((segment) => segment.id)).size !== value.segments.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['segments'], message: 'segment ids must be unique' });
  }
  const totalWeight = value.segments.reduce((sum, segment) => sum + (segment.weight ?? 1), 0);
  if (!Number.isFinite(totalWeight) || totalWeight <= 0) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['segments'],
      message: 'total segment weight must be finite and positive',
    });
  }
  if (value.targetOutcomeId && !value.segments.some((segment) => segment.id === value.targetOutcomeId)) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['targetOutcomeId'], message: 'unknown outcome' });
  }
});

export const ProbabilitySpinnerWidgetRefSchema = z.object({
  type: z.literal('probability-spinner'),
  config: ProbabilitySpinnerWidgetConfigSchema,
}).strict();

export const CollisionRampWidgetConfigSchema = z.object({
  // Shares the exact authored-decimal contract (12 places, including scientific notation).
  rampAngle: z.number().finite().min(0).max(45).refine((value) => exactDecimalFromNumber(value) !== null, `at most ${MAX_BALANCE_DECIMAL_PLACES} decimal places`).optional(),
  massA: z.number().finite().min(1).max(100).refine((value) => exactDecimalFromNumber(value) !== null, `at most ${MAX_BALANCE_DECIMAL_PLACES} decimal places`),
  massB: z.number().finite().min(1).max(100).refine((value) => exactDecimalFromNumber(value) !== null, `at most ${MAX_BALANCE_DECIMAL_PLACES} decimal places`),
  speedA: z.number().finite().min(0).max(100).refine((value) => exactDecimalFromNumber(value) !== null, `at most ${MAX_BALANCE_DECIMAL_PLACES} decimal places`).optional(),
  speedB: z.number().finite().min(0).max(100).refine((value) => exactDecimalFromNumber(value) !== null, `at most ${MAX_BALANCE_DECIMAL_PLACES} decimal places`).optional(),
  target: z.enum(['predict-direction', 'compare-motion']).optional(),
}).strict();

export const CollisionRampWidgetRefSchema = z.object({
  type: z.literal('collision-ramp'),
  config: CollisionRampWidgetConfigSchema,
}).strict();

const EnergyTransferTokenSchema = z.string().trim().min(1);
export const EnergyTransferBuilderWidgetConfigSchema = z.object({
  sources: z.array(EnergyTransferTokenSchema).min(1), transfers: z.array(EnergyTransferTokenSchema).min(1), targets: z.array(EnergyTransferTokenSchema).min(1), requiredPath: z.array(EnergyTransferTokenSchema).min(3),
}).strict().superRefine((value, context) => {
  const all = [...value.sources, ...value.transfers, ...value.targets];
  if (new Set(all).size !== all.length) context.addIssue({ code: z.ZodIssueCode.custom, message: 'source, transfer, and target tokens must be unique and disjoint' });
  if (!value.sources.includes(value.requiredPath[0]!) || !value.targets.includes(value.requiredPath[value.requiredPath.length - 1]!) || !value.requiredPath.slice(1, -1).every((token) => value.transfers.includes(token))) context.addIssue({ code: z.ZodIssueCode.custom, path: ['requiredPath'], message: 'invalid source-transfer-target path' });
});
export const EnergyTransferBuilderWidgetRefSchema = z.object({ type: z.literal('energy-transfer-builder'), config: EnergyTransferBuilderWidgetConfigSchema }).strict();

const WaveLevel = z.number().int().min(1).max(10);
export const WaveMakerWidgetConfigSchema = z.object({
  medium: z.enum(['rope', 'water', 'sound']),
  amplitude: WaveLevel.optional(),
  frequency: WaveLevel.optional(),
  target: z.object({ amplitude: WaveLevel.optional(), frequency: WaveLevel.optional() }).strict()
    .refine((target) => target.amplitude !== undefined || target.frequency !== undefined, 'target needs value').optional(),
}).strict();

export const WaveMakerWidgetRefSchema = z.object({ type: z.literal('wave-maker'), config: WaveMakerWidgetConfigSchema }).strict();

export const LightReflectionEyeWidgetConfigSchema = z.object({
  incidentAngle: z.number().int().min(0).max(90),
  targetAngle: z.number().int().min(0).max(90).optional(),
  showEye: z.boolean().optional(),
}).strict();

export const LightReflectionEyeWidgetRefSchema = z.object({ type: z.literal('light-reflection-eye'), config: LightReflectionEyeWidgetConfigSchema }).strict();

const MorseAlphabet: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
};
/** Uppercase only ASCII a-z so each authored character remains exactly one symbol. */
export const normalizeMorseAscii = (text: string) => text.replace(/[a-z]/g, (character) => String.fromCharCode(character.charCodeAt(0) - 32));
const isVisibleCharacter = (character: string) => [...character].length === 1 && character.trim() === character && !/[\p{C}\p{Z}]/u.test(character);
const isPrintableAscii = (character: string) => character.length === 1 && character.charCodeAt(0) >= 32 && character.charCodeAt(0) <= 126;
const printableAsciiAlphabet = () => Object.fromEntries(Array.from({ length: 95 }, (_, index) => {
  const character = String.fromCharCode(index + 32);
  return [character, character.charCodeAt(0).toString(2).padStart(8, '0')];
}));

export const MessageSenderWidgetConfigSchema = z.object({
  encoding: z.enum(['morse', 'binary']),
  message: z.string().trim().min(1),
  alphabet: z.record(z.string()).optional(),
}).strict().superRefine((value, context) => {
  const message = value.encoding === 'morse' ? normalizeMorseAscii(value.message) : value.message;
  const codePattern = value.encoding === 'morse' ? /^[.-]+$/ : /^[01]{8}$/;
  const normalizedOverrides = Object.entries(value.alphabet ?? {}).map(([character, code]) => [value.encoding === 'morse' ? normalizeMorseAscii(character) : character, code] as const);
  if (normalizedOverrides.some(([character, code]) => !isVisibleCharacter(character) || (value.encoding === 'binary' && !isPrintableAscii(character)) || !codePattern.test(code))) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['alphabet'], message: 'override keys must be visible enterable characters and codes must be enterable symbols' });
  }
  if (new Set(normalizedOverrides.map(([character]) => character)).size !== normalizedOverrides.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['alphabet'], message: 'override keys must remain unique after normalization' });
  }
  const effective = { ...(value.encoding === 'morse' ? MorseAlphabet : printableAsciiAlphabet()), ...Object.fromEntries(normalizedOverrides) };
  if (new Set(Object.values(effective)).size !== Object.keys(effective).length) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['alphabet'], message: 'effective codes must be unambiguous' });
  }
  if (![...message].every((character) => Object.prototype.hasOwnProperty.call(effective, character))) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['message'], message: 'effective alphabet must cover every message character' });
  }
});

export const MessageSenderWidgetRefSchema = z.object({ type: z.literal('message-sender'), config: MessageSenderWidgetConfigSchema }).strict();

const EnergyTermSchema = z.string().trim().min(1);
const EnergyComponentSchema = z.object({
  id: EnergyTermSchema,
  label: EnergyTermSchema,
  energyIn: EnergyTermSchema,
  energyOut: EnergyTermSchema,
}).strict();

function hasCompatibleEnergyPath(components: Array<{ id: string; energyIn: string; energyOut: string }>, start: string, end: string) {
  const byId = new Map(components.map((component) => [component.id, component]));
  const pending = [start];
  const visited = new Set([start]);
  while (pending.length) {
    const currentId = pending.shift()!;
    if (currentId === end) return true;
    const current = byId.get(currentId)!;
    for (const next of components) {
      if (!visited.has(next.id) && current.energyOut === next.energyIn) {
        visited.add(next.id);
        pending.push(next.id);
      }
    }
  }
  return false;
}

export const EnergyConversionDesignerWidgetConfigSchema = z.object({
  components: z.array(EnergyComponentSchema).min(2),
  requiredStart: EnergyTermSchema,
  requiredEnd: EnergyTermSchema,
}).strict().superRefine((value, context) => {
  const ids = value.components.map((component) => component.id);
  const labels = value.components.map((component) => component.label);
  const endpointsExist = ids.includes(value.requiredStart) && ids.includes(value.requiredEnd);
  if (new Set(ids).size !== ids.length || new Set(labels).size !== labels.length || !endpointsExist || value.requiredStart === value.requiredEnd) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'component ids and labels must be unique and required endpoints must exist and differ' });
    return;
  }
  if (!hasCompatibleEnergyPath(value.components, value.requiredStart, value.requiredEnd)) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'no compatible path connects required endpoints' });
  }
});

export const EnergyConversionDesignerWidgetRefSchema = z.object({ type: z.literal('energy-conversion-designer'), config: EnergyConversionDesignerWidgetConfigSchema }).strict();

const AnimalStructureTermSchema = z.string().trim().transform((value) => value.replace(/\s+/g, ' ')).pipe(z.string().min(1));
const AnimalStructurePairSchema = z.object({
  id: AnimalStructureTermSchema,
  animal: AnimalStructureTermSchema,
  structure: AnimalStructureTermSchema,
  function: AnimalStructureTermSchema,
}).strict();

export const AnimalStructureMatcherWidgetConfigSchema = z.object({
  pairs: z.array(AnimalStructurePairSchema).min(2),
}).strict().superRefine((value, context) => {
  const ids = value.pairs.map((pair) => pair.id);
  const functions = value.pairs.map((pair) => pair.function);
  const labels = value.pairs.map((pair) => `${pair.animal} ${pair.structure}`);
  if (new Set(ids).size !== ids.length || new Set(functions).size !== functions.length || new Set(labels).size !== labels.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'ids, functions, and interactive labels must be unique' });
  }
});

export const AnimalStructureMatcherWidgetRefSchema = z.object({ type: z.literal('animal-structure-matcher'), config: AnimalStructureMatcherWidgetConfigSchema }).strict();

const ErosionAgentSchema = z.enum(['water', 'wind', 'ice']);
export const ErosionSimulatorWidgetConfigSchema = z.object({
  terrain: z.enum(['soil', 'sand', 'rock']),
  agents: z.array(ErosionAgentSchema).min(1).refine((agents) => new Set(agents).size === agents.length, 'duplicates'),
  vegetation: z.boolean().optional(),
  targetAgent: ErosionAgentSchema.optional(),
}).strict().superRefine((value, context) => {
  if (value.targetAgent && !value.agents.includes(value.targetAgent)) context.addIssue({ code: z.ZodIssueCode.custom, path: ['targetAgent'], message: 'target agent unavailable' });
  if (value.terrain === 'rock' && value.vegetation !== undefined) context.addIssue({ code: z.ZodIssueCode.custom, path: ['vegetation'], message: 'vegetation cover is not modeled on rock' });
});
export const ErosionSimulatorWidgetRefSchema = z.object({ type: z.literal('erosion-simulator'), config: ErosionSimulatorWidgetConfigSchema }).strict();

const RockLayerTextSchema = z.string().trim().transform((value) => value.replace(/\s+/g, ' ')).pipe(z.string().min(1));
const RockLayerSchema = z.object({
  id: RockLayerTextSchema,
  label: RockLayerTextSchema,
  age: z.number().int().nonnegative(),
  artifact: RockLayerTextSchema.optional(),
}).strict();
const rockLayerVisualKey = (value: string) => value.normalize('NFKC').toLocaleLowerCase();
export const RockLayerExplorerWidgetConfigSchema = z.object({
  layers: z.array(RockLayerSchema).min(2),
  prompt: RockLayerTextSchema.optional(),
  targetLayerId: RockLayerTextSchema.optional(),
}).strict().superRefine((value, context) => {
  const ids = value.layers.map((layer) => rockLayerVisualKey(layer.id));
  const labels = value.layers.map((layer) => rockLayerVisualKey(layer.label));
  const ages = value.layers.map((layer) => layer.age);
  if (new Set(ids).size !== ids.length || new Set(labels).size !== labels.length || new Set(ages).size !== ages.length) {
    context.addIssue({code: z.ZodIssueCode.custom, message: 'layer ids, labels, and relative-age ranks must be unique'});
  }
  if (value.targetLayerId && !value.layers.some((layer) => layer.id === value.targetLayerId)) {
    context.addIssue({code: z.ZodIssueCode.custom, path: ['targetLayerId'], message: 'target layer must exist'});
  }
});
export const RockLayerExplorerWidgetRefSchema = z.object({type: z.literal('rock-layer-explorer'), config: RockLayerExplorerWidgetConfigSchema}).strict();

const TopographicTextSchema = z.string().trim().transform((value) => value.replace(/\s+/g, ' ')).pipe(z.string().min(1));
const CoordinateListSchema = TopographicTextSchema.refine(
  (value) => /^-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?(?:\s+-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?)+$/.test(value),
  'coordinates must be numeric x,y pairs',
);
const parseCoordinates = (value: string) => value.split(' ').map((pair) => pair.split(',').map(Number) as [number, number]);
const hasUsableTopographicBounds = (coordinates: [number, number][]) => {
  const xs = coordinates.map(([x]) => x);
  const ys = coordinates.map(([, y]) => y);
  const padding = 10;
  const width = Math.max(Math.max(...xs) - Math.min(...xs), 1) + padding * 2;
  const height = Math.max(Math.max(...ys) - Math.min(...ys), 1) + padding * 2;
  return Number.isFinite(Math.min(...xs) - padding)
    && Number.isFinite(Math.min(...ys) - padding)
    && Number.isFinite(width)
    && Number.isFinite(height)
    && width > 0
    && height > 0;
};
const ContourSchema = z.object({
  elevation: z.number().finite(),
  points: CoordinateListSchema,
}).strict().superRefine((contour, context) => {
  const coordinates = parseCoordinates(contour.points);
  if (!coordinates.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y))) {
    context.addIssue({code: z.ZodIssueCode.custom, path: ['points'], message: 'coordinates must be finite'});
    return;
  }
  if (new Set(coordinates.map(([x, y]) => `${x},${y}`)).size < 2) {
    context.addIssue({code: z.ZodIssueCode.custom, path: ['points'], message: 'a contour needs two distinct points'});
  }
  if (!hasUsableTopographicBounds(coordinates)) {
    context.addIssue({code: z.ZodIssueCode.custom, path: ['points'], message: 'coordinates must produce usable SVG bounds'});
  }
});
const TopographicPointSchema = z.object({
  id: TopographicTextSchema,
  label: TopographicTextSchema,
  elevation: z.number().finite(),
}).strict();
const topographicVisualKey = (value: string) => value.normalize('NFKC').toLocaleLowerCase();
export const TopographicMapExplorerWidgetConfigSchema = z.object({
  contours: z.array(ContourSchema).min(1),
  points: z.array(TopographicPointSchema).min(2),
  targetPointId: TopographicTextSchema.optional(),
}).strict().superRefine((value, context) => {
  const coordinates = value.contours.flatMap((contour) => parseCoordinates(contour.points));
  if (!hasUsableTopographicBounds(coordinates)) {
    context.addIssue({code: z.ZodIssueCode.custom, path: ['contours'], message: 'all contours must produce usable SVG bounds together'});
  }
  const ids = value.points.map((point) => topographicVisualKey(point.id));
  const labels = value.points.map((point) => topographicVisualKey(point.label));
  if (new Set(ids).size !== ids.length || new Set(labels).size !== labels.length) {
    context.addIssue({code: z.ZodIssueCode.custom, message: 'point ids and labels must be unique'});
  }
  if (value.targetPointId && !value.points.some((point) => point.id === value.targetPointId)) {
    context.addIssue({code: z.ZodIssueCode.custom, path: ['targetPointId'], message: 'target point must exist'});
  }
});
export const TopographicMapExplorerWidgetRefSchema = z.object({
  type: z.literal('topographic-map-explorer'),
  config: TopographicMapExplorerWidgetConfigSchema,
}).strict();

const HazardTextSchema = z.string().trim().transform((value) => value.replace(/\s+/g, ' ')).pipe(z.string().min(1));
const HazardSolutionSchema = z.object({
  id: HazardTextSchema,
  label: HazardTextSchema,
  effectiveness: z.enum(['good', 'partial', 'poor']),
}).strict();
const hazardVisualKey = (value: string) => value.normalize('NFKC').toLocaleLowerCase();
export const HazardSolutionDesignerWidgetConfigSchema = z.object({
  hazard: HazardTextSchema,
  solutions: z.array(HazardSolutionSchema).min(2),
  requiredIds: z.array(HazardTextSchema).min(1),
}).strict().superRefine((value, context) => {
  const ids = value.solutions.map((solution) => hazardVisualKey(solution.id));
  const labels = value.solutions.map((solution) => hazardVisualKey(solution.label));
  const requiredIds = value.requiredIds.map(hazardVisualKey);
  if (new Set(ids).size !== ids.length || new Set(labels).size !== labels.length) {
    context.addIssue({code: z.ZodIssueCode.custom, message: 'solution ids and labels must be unique'});
  }
  if (new Set(requiredIds).size !== requiredIds.length || !value.requiredIds.every((id) => value.solutions.some((solution) => solution.id === id)) || value.requiredIds.some((id) => value.solutions.find((solution) => solution.id === id)!.effectiveness === 'poor')) {
    context.addIssue({code: z.ZodIssueCode.custom, message: 'required solution ids must exist, be unique, and not be poor'});
  }
});
export const HazardSolutionDesignerWidgetRefSchema = z.object({
  type: z.literal('hazard-solution-designer'),
  config: HazardSolutionDesignerWidgetConfigSchema,
}).strict();

const ResourceTextSchema = z.string().trim().transform((value) => value.replace(/\s+/g, ' ')).pipe(z.string().min(1));
const ResourceKindSchema = z.enum(['renewable', 'nonrenewable', 'conserve']);
const ResourceItemSchema = z.object({
  id: ResourceTextSchema,
  label: ResourceTextSchema,
  kind: ResourceKindSchema,
}).strict();
const resourceVisualKey = (value: string) => value.normalize('NFKC').toLocaleLowerCase();

export const ResourceSorterWidgetConfigSchema = z.object({
  items: z.array(ResourceItemSchema).min(2),
  bins: z.array(ResourceKindSchema).min(2),
}).strict().superRefine((value, context) => {
  const ids = value.items.map((item) => resourceVisualKey(item.id));
  const labels = value.items.map((item) => resourceVisualKey(item.label));
  if (new Set(ids).size !== ids.length || new Set(labels).size !== labels.length || new Set(value.bins).size !== value.bins.length || !value.items.every((item) => value.bins.includes(item.kind))) {
    context.addIssue({code: z.ZodIssueCode.custom, message: 'resource item ids and labels must be unique and every item kind needs a bin'});
  }
});

export const ResourceSorterWidgetRefSchema = z.object({
  type: z.literal('resource-sorter'),
  config: ResourceSorterWidgetConfigSchema,
}).strict();

const WordRootTextSchema = z.string().trim().transform((value) => value.replace(/\s+/g, ' ')).pipe(z.string().min(1));
const wordRootVisualKey = (value: string) => value.normalize('NFKC').toLocaleLowerCase();
const WordTargetSchema = z.object({
  word: WordRootTextSchema,
  meaning: WordRootTextSchema,
}).strict();

export const WordRootBuilderWidgetConfigSchema = z.object({
  root: WordRootTextSchema,
  prefixes: z.array(WordRootTextSchema).optional(),
  suffixes: z.array(WordRootTextSchema).optional(),
  targets: z.array(WordTargetSchema).min(1),
}).strict().superRefine((value, context) => {
  const prefixes = value.prefixes ?? [];
  const suffixes = value.suffixes ?? [];
  const prefixKeys = prefixes.map(wordRootVisualKey);
  const suffixKeys = suffixes.map(wordRootVisualKey);
  const targetKeys = value.targets.map((target) => wordRootVisualKey(target.word));
  if (new Set(prefixKeys).size !== prefixKeys.length || new Set(suffixKeys).size !== suffixKeys.length || new Set(targetKeys).size !== targetKeys.length) {
    context.addIssue({code: z.ZodIssueCode.custom, message: 'prefixes, suffixes, and target words must be unique after normalization'});
  }
  const buildCounts = new Map<string, number>();
  for (const prefix of ['', ...prefixes]) for (const suffix of ['', ...suffixes]) {
    const word = `${prefix}${value.root}${suffix}`;
    buildCounts.set(word, (buildCounts.get(word) ?? 0) + 1);
  }
  if (value.targets.some((target) => buildCounts.get(target.word) !== 1)) {
    context.addIssue({code: z.ZodIssueCode.custom, path: ['targets'], message: 'every target must be constructible exactly once from the authored morphemes'});
  }
});

export const WordRootBuilderWidgetRefSchema = z.object({
  type: z.literal('word-root-builder'),
  config: WordRootBuilderWidgetConfigSchema,
}).strict();

const ContextClueTextSchema = z.string().trim().transform((value) => value.replace(/\s+/g, ' ')).pipe(z.string().min(1));
const contextClueVisualKey = (value: string) => value.normalize('NFKC').toLocaleLowerCase();
const contextClueWordCharacter = /[\p{L}\p{N}\p{M}]/u;

export function findContextClueTargetRange(passage: string,targetWord: string): {start:number;end:number}|null {
  const targetKey = contextClueVisualKey(targetWord);
  const targetCharacters = Array.from(targetKey);
  const needsStartBoundary = contextClueWordCharacter.test(targetCharacters[0] ?? '');
  const needsEndBoundary = contextClueWordCharacter.test(targetCharacters[targetCharacters.length-1] ?? '');
  const boundaries = [0];
  let cursor = 0;
  for (const character of passage) {
    cursor += character.length;
    boundaries.push(cursor);
  }
  for (let startIndex=0;startIndex<boundaries.length-1;startIndex+=1) {
    const start = boundaries[startIndex];
    const before = startIndex > 0 ? passage.slice(boundaries[startIndex-1],start) : '';
    if (needsStartBoundary && contextClueWordCharacter.test(before)) continue;
    for (let endIndex=startIndex+1;endIndex<boundaries.length;endIndex+=1) {
      const end = boundaries[endIndex];
      const candidate = passage.slice(start,end);
      if (candidate.trim() !== candidate || contextClueVisualKey(candidate) !== targetKey) continue;
      const after = endIndex < boundaries.length-1 ? passage.slice(end,boundaries[endIndex+1]) : '';
      if (needsEndBoundary && contextClueWordCharacter.test(after)) continue;
      return {start,end};
    }
  }
  return null;
}

const ClueSchema = z.object({
  id: ContextClueTextSchema,
  text: ContextClueTextSchema,
  type: z.enum(['definition','example','synonym','contrast']),
}).strict();

export const ContextClueDetectiveWidgetConfigSchema = z.object({
  passage: ContextClueTextSchema,
  targetWord: ContextClueTextSchema,
  clueChoices: z.array(ClueSchema).min(2),
  correctChoiceId: ContextClueTextSchema,
}).strict().superRefine((value, context) => {
  const clueIds = value.clueChoices.map((clue) => contextClueVisualKey(clue.id));
  const clueTexts = value.clueChoices.map((clue) => contextClueVisualKey(clue.text));
  if (new Set(clueIds).size !== clueIds.length || new Set(clueTexts).size !== clueTexts.length) {
    context.addIssue({code: z.ZodIssueCode.custom, path: ['clueChoices'], message: 'clue ids and clue text must be unique after normalization'});
  }
  if (value.clueChoices.filter((clue) => clue.id === value.correctChoiceId).length !== 1) {
    context.addIssue({code: z.ZodIssueCode.custom, path: ['correctChoiceId'], message: 'correct choice id must name exactly one clue'});
  }
  if (!findContextClueTargetRange(value.passage,value.targetWord)) {
    context.addIssue({code: z.ZodIssueCode.custom, path: ['targetWord'], message: 'target word must occur in the passage'});
  }
});

export const ContextClueDetectiveWidgetRefSchema = z.object({
  type: z.literal('context-clue-detective'),
  config: ContextClueDetectiveWidgetConfigSchema,
}).strict();

export const WidgetRefSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('place-value-builder'),
    config: PlaceValueWidgetConfigSchema,
  }).strict(),
  z.object({
    type: z.literal('number-line-compare'),
    config: NumberLineWidgetConfigSchema,
  }).strict(),
  BaseTenBlocksWidgetRefSchema,
  FractionModelsWidgetRefSchema,
  AreaModelMultiplierWidgetRefSchema,
  ArrayBuilderWidgetRefSchema,
  MoneyCounterWidgetRefSchema,
  ClockElapsedTimeWidgetRefSchema,
  QuarterInchRulerWidgetRefSchema,
  BalanceScaleWidgetRefSchema,
  ShapeClassifierWidgetRefSchema,
  DataPlotBuilderWidgetRefSchema,
  ProbabilitySpinnerWidgetRefSchema,
  CollisionRampWidgetRefSchema,
  EnergyTransferBuilderWidgetRefSchema,
  WaveMakerWidgetRefSchema,
  LightReflectionEyeWidgetRefSchema,
  MessageSenderWidgetRefSchema,
  EnergyConversionDesignerWidgetRefSchema,
  AnimalStructureMatcherWidgetRefSchema,
  ErosionSimulatorWidgetRefSchema,
  RockLayerExplorerWidgetRefSchema,
  TopographicMapExplorerWidgetRefSchema,
  HazardSolutionDesignerWidgetRefSchema,
  ResourceSorterWidgetRefSchema,
  WordRootBuilderWidgetRefSchema,
  ContextClueDetectiveWidgetRefSchema,
]);

export const LearnCardSchema = z.object({
  id: LearnCardIdSchema,
  title: z.string().min(1),
  dialogue: z.array(DialogueLineSchema).optional(),
  blocks: z.array(RichBlockSchema).min(1),
  widget: WidgetRefSchema.optional(),
  demo: InstructionalDemoSchema.optional(),
  check: InlineCheckSchema.optional(),
});

const questionBase = {
  id: QuestionIdSchema,
  prompt: z.string().min(1),
  explanation: z.string().min(1),
  conceptTag: z.string().min(1),
  reviewCardId: z.string().min(1),
};
export const ChoiceQuestionSchema = z.object({
  ...questionBase,
  type: z.enum(['multiple-choice', 'true-false']),
  choices: z.array(z.object({ id: OptionIdSchema, text: z.string().min(1) }).strict()).min(2),
  correctChoiceId: OptionIdSchema,
});
export const FillQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('fill-blank'),
  acceptedAnswers: z.array(z.string().min(1)).min(1),
});
export const SortQuestionSchema = z.object({
  ...questionBase,
  type: z.literal('sort'),
  items: z.array(z.object({ id: OptionIdSchema, text: z.string().min(1) }).strict()).min(2),
  correctOrder: z.array(OptionIdSchema).min(2),
});
export const QuestionSchema = z.discriminatedUnion('type', [
  ChoiceQuestionSchema, FillQuestionSchema, SortQuestionSchema,
]);

/** Optional shared material that remains available while a Quick Check advances. */
export const QuizReferenceSchema = z.object({
  title: z.string().trim().min(1),
  text: z.string().trim().min(1),
}).strict();

/** Optional source text shown separately from coaching on a worked example. */
export const WorkedPassageSchema = z.object({
  title: z.string().trim().min(1),
  text: z.string().trim().min(1),
}).strict();

export const QuizSchema = z.object({
  passThreshold: z.literal(8),
  pool: z.array(QuestionSchema),
  reference: QuizReferenceSchema.optional(),
});

export const LessonSchema = z.object({
  id: LessonIdSchema,
  unitId: UnitIdSchema,
  title: z.string().min(1),
  indicatorCodes: z.array(z.string()).min(1),
  intro: z.array(DialogueLineSchema).min(1),
  learnCards: z.array(LearnCardSchema).min(1),
  workedExample: z.object({
    title: z.string(),
    steps: z.array(z.string()).min(1),
    passage: WorkedPassageSchema.optional(),
  }),
  quiz: QuizSchema,
});

export const UnitSchema = z.object({
  id: UnitIdSchema,
  subjectId: SubjectIdSchema,
  number: z.number().int().positive(),
  title: z.string().min(1),
  indicatorCodes: z.array(z.string()).min(1),
  prerequisiteUnitIds: z.array(z.string()),
  lessons: z.array(LessonSchema),
});

export type SubjectId = z.infer<typeof SubjectIdSchema>;
export type GuideId = z.infer<typeof GuideIdSchema>;
export type Pose = z.infer<typeof PoseSchema>;
export type DialogueLine = z.infer<typeof DialogueLineSchema>;
export type RichBlock = z.infer<typeof RichBlockSchema>;
export type InlineCheck = z.infer<typeof InlineCheckSchema>;
export type InstructionalDemo = z.infer<typeof InstructionalDemoSchema>;
export type WidgetRef = z.infer<typeof WidgetRefSchema>;
export type WidgetType = WidgetRef['type'];
export type WidgetConfig<T extends WidgetType = WidgetType> = Extract<
  WidgetRef,
  { type: T }
>['config'];
export type LearnCard = z.infer<typeof LearnCardSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type QuizReference = z.infer<typeof QuizReferenceSchema>;
export type WorkedPassage = z.infer<typeof WorkedPassageSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type Subject = {
  id: SubjectId;
  title: string;
  guide: GuideId;
  /** Bright decorative identity color (confetti, shadows, non-semantic flourishes). */
  color: string;
  /** Darker identity color for text, controls, and meaningful graphics. */
  actionColor: string;
  units: Unit[];
};

function duplicateValues(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

export function validateLesson(lesson: Lesson): string[] {
  const errors: string[] = lesson.learnCards.flatMap((card) => {
    const widget = card.widget as { type?: unknown } | undefined;
    return widget &&
      typeof widget.type === 'string' &&
      !(WIDGET_TYPES as readonly string[]).includes(widget.type)
      ? [`${card.id}: unknown widget type "${widget.type}"`]
      : [];
  });
  const parsed = LessonSchema.safeParse(lesson);
  if (!parsed.success) {
    return [
      ...errors,
      ...parsed.error.issues.map((i) => `${lesson.id}: ${i.path.join('.')}: ${i.message}`),
    ];
  }
  const cardIds = new Set(lesson.learnCards.map((c) => c.id));
  if (lesson.unitId !== lesson.id.slice(0, lesson.id.lastIndexOf('-l'))) {
    errors.push(`${lesson.id}: lesson id must belong to unit ${lesson.unitId}`);
  }
  if (lesson.quiz.pool.length < 13)
    errors.push(`${lesson.id}: quiz pool has ${lesson.quiz.pool.length}, needs >= 13`);
  const seen = new Set<string>();
  for (const q of lesson.quiz.pool) {
    if (!q.id.startsWith(`${lesson.id}-q`)) {
      errors.push(`${q.id}: question id must belong to lesson ${lesson.id}`);
    }
    if (seen.has(q.id)) errors.push(`${lesson.id}: duplicate question id ${q.id}`);
    seen.add(q.id);
    if (!cardIds.has(q.reviewCardId))
      errors.push(`${q.id}: reviewCardId "${q.reviewCardId}" does not match any learn card`);
    if (q.type === 'multiple-choice' || q.type === 'true-false') {
      if (duplicateValues(q.choices.map((choice) => choice.id)).length > 0)
        errors.push(`${q.id}: duplicate choice id`);
      if (duplicateValues(q.choices.map((choice) => normalizeAnswerText(choice.text))).length > 0)
        errors.push(`${q.id}: duplicate choice text after normalization`);
      if (!q.choices.some((c) => c.id === q.correctChoiceId))
        errors.push(`${q.id}: correctChoiceId "${q.correctChoiceId}" not in choices`);
    }
    if (q.type === 'sort') {
      if (duplicateValues(q.items.map((item) => item.id)).length > 0)
        errors.push(`${q.id}: duplicate sort item id`);
      if (duplicateValues(q.items.map((item) => normalizeAnswerText(item.text))).length > 0)
        errors.push(`${q.id}: duplicate sort item text after normalization`);
      const itemIds = new Set(q.items.map((i) => i.id));
      const unique = new Set(q.correctOrder);
      if (
        q.correctOrder.length !== q.items.length ||
        unique.size !== q.correctOrder.length ||
        !q.correctOrder.every((id) => itemIds.has(id))
      )
        errors.push(`${q.id}: correctOrder must be a permutation of item ids`);
    }
  }
  // Card ids are load-bearing: the lesson player keys its stages on them and the results
  // screen deep-links to a card by id, so a duplicate would silently strand a review link.
  const seenCards = new Set<string>();
  for (const card of lesson.learnCards) {
    if (!card.id.startsWith(`${lesson.id}-c`)) {
      errors.push(`${card.id}: learn card id must belong to lesson ${lesson.id}`);
    }
    if (seenCards.has(card.id)) errors.push(`${lesson.id}: duplicate learn card id ${card.id}`);
    seenCards.add(card.id);
  }
  return errors;
}

function countById<T extends { id: string }>(values: T[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value.id, (counts.get(value.id) ?? 0) + 1);
  return counts;
}

/** Validates the two content views together so authored modules cannot be orphaned,
 * consumed twice, or silently shadowed by a colliding permanent identity. */
export function validateContentCatalog(
  subjects: Subject[],
  registries: Record<SubjectId, Record<string, Lesson[]>>,
): string[] {
  const errors: string[] = [];
  const unitsBySubject = new Map<SubjectId, Set<string>>();
  const consumed = subjects.flatMap((subject) => {
    unitsBySubject.set(subject.id, new Set(subject.units.map((unit) => unit.id)));
    return subject.units.flatMap((unit) => unit.lessons);
  });
  const registered: Lesson[] = [];

  for (const subjectId of SubjectIdSchema.options) {
    const realUnitIds = unitsBySubject.get(subjectId) ?? new Set<string>();
    for (const [registryUnitId, lessons] of Object.entries(registries[subjectId])) {
      if (!realUnitIds.has(registryUnitId)) {
        errors.push(`${subjectId}: registry key ${registryUnitId} must name a real unit`);
      }
      for (const lesson of lessons) {
        registered.push(lesson);
        if (lesson.unitId !== registryUnitId) {
          errors.push(`${lesson.id}: registry key ${registryUnitId} does not match lesson unitId`);
        }
      }
    }
  }

  const registeredCounts = countById(registered);
  const consumedCounts = countById(consumed);
  const allIds = new Set([...registeredCounts.keys(), ...consumedCounts.keys()]);
  for (const id of allIds) {
    if ((registeredCounts.get(id) ?? 0) !== 1)
      errors.push(`${id}: lesson must be registered exactly once`);
    if ((consumedCounts.get(id) ?? 0) !== 1)
      errors.push(`${id}: registered lesson must be consumed exactly once`);
  }

  for (const id of duplicateValues(consumed.map((lesson) => lesson.id)))
    errors.push(`duplicate lesson id ${id}`);
  const cards = consumed.flatMap((lesson) => lesson.learnCards);
  for (const id of duplicateValues(cards.map((card) => card.id)))
    errors.push(`duplicate learn card id ${id}`);
  const questions = consumed.flatMap((lesson) => lesson.quiz.pool);
  for (const id of duplicateValues(questions.map((question) => question.id)))
    errors.push(`duplicate question id ${id}`);

  return errors;
}
