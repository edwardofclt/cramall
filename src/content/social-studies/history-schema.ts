import { z } from 'zod';

const Text = z.string().trim().min(1);
const Id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a canonical kebab-case ID');

function issue(context: z.RefinementCtx, path: (string | number)[], message: string) {
  context.addIssue({ code: z.ZodIssueCode.custom, path, message });
}
function unique(values: string[], context: z.RefinementCtx, path: string) {
  if (new Set(values.map(value => value.trim().toLowerCase().replace(/\s+/g, ' '))).size !== values.length) {
    issue(context, [path], `${path} must be unique`);
  }
}
function sourceReferences(sources: { id: string }[], items: { sourceId: string }[], context: z.RefinementCtx, path: string) {
  items.forEach((item, index) => {
    if (!sources.some(source => source.id === item.sourceId)) issue(context, [path, index, 'sourceId'], 'sourceId must name a supplied source');
  });
}
function baseReferences(config: { sources: { id: string }[] }, context: z.RefinementCtx) {
  unique(config.sources.map(source => source.id), context, 'sources');
}
function targetReferences(targets: { id: string }[], targetIds: string[], context: z.RefinementCtx, path: string) {
  unique(targets.map(target => target.id), context, path);
  targetIds.forEach(id => {
    if (!targets.some(target => target.id === id)) issue(context, [path], 'Every relationship must name a supplied target');
  });
  targets.forEach(target => {
    if (!targetIds.includes(target.id)) issue(context, [path], 'Every target needs at least one card');
  });
}

export const HistorySourceSchema = z.object({
  id: Id, title: Text, text: Text, attribution: Text,
  url: z.string().url().refine(url => /^https?:\/\//.test(url), 'Sources must use an HTTP or HTTPS URL'),
}).strict();
export const HistoryExplainSchema = z.object({
  prompt: Text,
  choices: z.array(z.object({ id: Id, text: Text }).strict()).min(2).max(4),
  correctChoiceId: Id,
  explanation: Text,
}).strict().superRefine((explain, context) => {
  unique(explain.choices.map(choice => choice.id), context, 'choices');
  unique(explain.choices.map(choice => choice.text), context, 'choices');
  if (!explain.choices.some(choice => choice.id === explain.correctChoiceId)) issue(context, ['correctChoiceId'], 'correctChoiceId must name a supplied choice');
});
const baseShape = {
  title: Text,
  prompt: Text,
  sources: z.array(HistorySourceSchema).min(1),
  explain: HistoryExplainSchema,
};
export const HistoryTimelineWidgetConfigSchema = z.object({
  ...baseShape,
  events: z.array(z.object({ id: Id, title: Text, year: z.number().int().min(1).max(2100), detail: Text, sourceId: Id }).strict()).min(2).max(8),
  correctOrder: z.array(Id).min(2).max(8),
}).strict().superRefine((config, context) => {
  baseReferences(config, context);
  unique(config.events.map(event => event.id), context, 'events');
  unique(config.events.map(event => event.title), context, 'events');
  sourceReferences(config.sources, config.events, context, 'events');
  unique(config.correctOrder, context, 'correctOrder');
  if (config.correctOrder.length !== config.events.length || config.correctOrder.some(id => !config.events.some(event => event.id === id))) {
    issue(context, ['correctOrder'], 'correctOrder must include every event exactly once');
  }
  const years = config.correctOrder.map(id => config.events.find(event => event.id === id)?.year);
  if (years.some((year, index) => index > 0 && year !== undefined && years[index - 1] !== undefined && year <= years[index - 1]!)) {
    issue(context, ['correctOrder'], 'Events must have distinct years in increasing chronological order');
  }
});
export const HistoryMapWidgetConfigSchema = z.object({
  ...baseShape,
  mapKind: z.enum(['colonial-regions', 'united-states', 'south-carolina']),
  period: Text,
  locations: z.array(z.object({ id: Id, label: Text, x: z.number().min(0).max(100), y: z.number().min(0).max(100), detail: Text, sourceId: Id }).strict()).min(2).max(8),
  cards: z.array(z.object({ id: Id, text: Text, sourceId: Id, locationId: Id }).strict()).min(2).max(12),
}).strict().superRefine((config, context) => {
  baseReferences(config, context);
  unique(config.cards.map(card => card.id), context, 'cards');
  unique(config.cards.map(card => card.text), context, 'cards');
  unique(config.locations.map(location => location.label), context, 'locations');
  unique(config.locations.map(location => `${location.x},${location.y}`), context, 'locations');
  sourceReferences(config.sources, config.locations, context, 'locations');
  sourceReferences(config.sources, config.cards, context, 'cards');
  targetReferences(config.locations, config.cards.map(card => card.locationId), context, 'locations');
});
export const HistoryEvidenceBoardWidgetConfigSchema = z.object({
  ...baseShape,
  sources: z.array(HistorySourceSchema).min(2),
  headings: z.array(z.object({ id: Id, label: Text }).strict()).min(2).max(6),
  cards: z.array(z.object({ id: Id, text: Text, sourceId: Id, targetId: Id }).strict()).min(2).max(12),
}).strict().superRefine((config, context) => {
  baseReferences(config, context);
  unique(config.cards.map(card => card.id), context, 'cards');
  unique(config.cards.map(card => card.text), context, 'cards');
  unique(config.headings.map(heading => heading.label), context, 'headings');
  sourceReferences(config.sources, config.cards, context, 'cards');
  targetReferences(config.headings, config.cards.map(card => card.targetId), context, 'headings');
  if (new Set(config.cards.map(card => card.sourceId)).size < 2) issue(context, ['cards'], 'An evidence comparison must use at least two sources');
});
export const HistoryCauseEffectWidgetConfigSchema = z.object({
  ...baseShape,
  causes: z.array(z.object({ id: Id, text: Text }).strict()).min(2).max(6),
  effects: z.array(z.object({ id: Id, text: Text, sourceId: Id, causeId: Id }).strict()).min(2).max(12),
}).strict().superRefine((config, context) => {
  baseReferences(config, context);
  unique(config.effects.map(effect => effect.id), context, 'effects');
  unique(config.effects.map(effect => effect.text), context, 'effects');
  unique(config.causes.map(cause => cause.text), context, 'causes');
  sourceReferences(config.sources, config.effects, context, 'effects');
  targetReferences(config.causes, config.effects.map(effect => effect.causeId), context, 'causes');
});

// The outer refs stay plain Zod objects for the central discriminated union.
export const HistoryTimelineWidgetRefSchema = z.object({ type: z.literal('history-timeline'), config: HistoryTimelineWidgetConfigSchema }).strict();
export const HistoryMapWidgetRefSchema = z.object({ type: z.literal('history-map'), config: HistoryMapWidgetConfigSchema }).strict();
export const HistoryEvidenceBoardWidgetRefSchema = z.object({ type: z.literal('history-evidence-board'), config: HistoryEvidenceBoardWidgetConfigSchema }).strict();
export const HistoryCauseEffectWidgetRefSchema = z.object({ type: z.literal('history-cause-effect'), config: HistoryCauseEffectWidgetConfigSchema }).strict();

export type HistorySource = z.infer<typeof HistorySourceSchema>;
export type HistoryExplain = z.infer<typeof HistoryExplainSchema>;
export type HistoryBase = { title: string; prompt: string; sources: HistorySource[]; explain: HistoryExplain };
export type TimelineConfig = z.infer<typeof HistoryTimelineWidgetConfigSchema>;
export type MapConfig = z.infer<typeof HistoryMapWidgetConfigSchema>;
export type EvidenceConfig = z.infer<typeof HistoryEvidenceBoardWidgetConfigSchema>;
export type CauseConfig = z.infer<typeof HistoryCauseEffectWidgetConfigSchema>;
export type HistoryEvent =
  | { type: 'interaction'; action: 'select' | 'place' | 'explain' | 'reset' }
  | { type: 'change'; value: { placements: Record<string, string> } }
  | { type: 'complete'; value: { explanationId: string } };
