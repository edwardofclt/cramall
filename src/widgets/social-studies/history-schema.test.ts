import { describe, expect, test } from 'vitest';
import {
  HistoryTimelineWidgetRefSchema,
  HistoryMapWidgetRefSchema,
  HistoryEvidenceBoardWidgetRefSchema,
  HistoryCauseEffectWidgetRefSchema,
} from '../../content/social-studies/history-schema';
import { causeConfig, evidenceConfig, mapConfig, timelineConfig } from './history-fixtures';

const refs = [
  { schema: HistoryTimelineWidgetRefSchema, type: 'history-timeline', config: timelineConfig },
  { schema: HistoryMapWidgetRefSchema, type: 'history-map', config: mapConfig },
  { schema: HistoryEvidenceBoardWidgetRefSchema, type: 'history-evidence-board', config: evidenceConfig },
  { schema: HistoryCauseEffectWidgetRefSchema, type: 'history-cause-effect', config: causeConfig },
];

describe.each(refs)('$type contract', ({ schema, type, config }) => {
  const accepts = (value: unknown) => schema.safeParse(value).success;
  test('accepts a complete, solvable source-based activity', () => {
    expect(accepts({ type, config })).toBe(true);
  });
  test('rejects unknown fields and missing explanations instead of permitting completion shortcuts', () => {
    expect(accepts({ type, config, complete: true })).toBe(false);
    expect(accepts({ type, config: { ...config, complete: true } })).toBe(false);
    expect(accepts({ type, config: { ...config, explain: undefined } })).toBe(false);
    expect(accepts({ type, config: { ...config, explain: { ...config.explain, correctChoiceId: 'missing' } } })).toBe(false);
    expect(accepts({ type, config: { ...config, explain: { ...config.explain, choices: [config.explain.choices[0], config.explain.choices[0]] } } })).toBe(false);
  });
  test('rejects duplicated sources, invalid source URLs, and empty source text', () => {
    expect(accepts({ type, config: { ...config, sources: [config.sources[0], config.sources[0]] } })).toBe(false);
    expect(accepts({ type, config: { ...config, sources: config.sources.map(source => ({ ...source, url: 'javascript:alert(1)' })) } })).toBe(false);
    expect(accepts({ type, config: { ...config, sources: config.sources.map(source => ({ ...source, text: ' ' })) } })).toBe(false);
  });
});

test('timeline rejects missing, duplicate, unknown, and contradictory chronological answers', () => {
  const accepts = (config: unknown) => HistoryTimelineWidgetRefSchema.safeParse({ type: 'history-timeline', config }).success;
  for (const correctOrder of [['articles', 'approved'], ['articles', 'approved', 'approved'], ['articles', 'approved', 'missing'], ['began', 'approved', 'articles']]) {
    expect(accepts({ ...timelineConfig, correctOrder })).toBe(false);
  }
  expect(accepts({ ...timelineConfig, events: timelineConfig.events.map(event => ({ ...event, sourceId: 'unknown' })) })).toBe(false);
  expect(accepts({ ...timelineConfig, events: [timelineConfig.events[0], timelineConfig.events[0], timelineConfig.events[2]] })).toBe(false);
  // A year alone cannot establish the order of two events within that same year.
  expect(accepts({ ...timelineConfig, events: timelineConfig.events.map(event => ({ ...event, year: 1788 })) })).toBe(false);
});

test('evidence requires two sources, resolvable cards, distinct headings, and evidence for every heading', () => {
  const accepts = (config: unknown) => HistoryEvidenceBoardWidgetRefSchema.safeParse({ type: 'history-evidence-board', config }).success;
  expect(accepts({ ...evidenceConfig, sources: [evidenceConfig.sources[0]] })).toBe(false);
  expect(accepts({ ...evidenceConfig, headings: [...evidenceConfig.headings, { id: 'unused', label: 'No evidence' }] })).toBe(false);
  expect(accepts({ ...evidenceConfig, headings: [evidenceConfig.headings[0], evidenceConfig.headings[0]] })).toBe(false);
  expect(accepts({ ...evidenceConfig, cards: evidenceConfig.cards.map(card => ({ ...card, targetId: 'missing' })) })).toBe(false);
  expect(accepts({ ...evidenceConfig, cards: evidenceConfig.cards.map(card => ({ ...card, sourceId: 'missing' })) })).toBe(false);
  expect(accepts({ ...evidenceConfig, cards: [evidenceConfig.cards[0], evidenceConfig.cards[0]] })).toBe(false);
});

test('cause/effect requires two supported relationships with no unused causes', () => {
  const accepts = (config: unknown) => HistoryCauseEffectWidgetRefSchema.safeParse({ type: 'history-cause-effect', config }).success;
  expect(accepts({ ...causeConfig, effects: [causeConfig.effects[0]] })).toBe(false);
  expect(accepts({ ...causeConfig, causes: [causeConfig.causes[0], causeConfig.causes[0]] })).toBe(false);
  expect(accepts({ ...causeConfig, causes: [...causeConfig.causes, { id: 'unused', text: 'No effect' }] })).toBe(false);
  expect(accepts({ ...causeConfig, effects: causeConfig.effects.map(effect => ({ ...effect, causeId: 'missing' })) })).toBe(false);
  expect(accepts({ ...causeConfig, effects: causeConfig.effects.map(effect => ({ ...effect, sourceId: 'missing' })) })).toBe(false);
  expect(accepts({ ...causeConfig, effects: [causeConfig.effects[0], causeConfig.effects[0]] })).toBe(false);
});

test('map supports all map families while rejecting invisible, duplicate, unused, and unresolved locations', () => {
  const accepts = (config: unknown) => HistoryMapWidgetRefSchema.safeParse({ type: 'history-map', config }).success;
  for (const mapKind of ['colonial-regions', 'united-states', 'south-carolina']) expect(accepts({ ...mapConfig, mapKind })).toBe(true);
  expect(accepts({ ...mapConfig, mapKind: 'world' })).toBe(false);
  expect(accepts({ ...mapConfig, locations: mapConfig.locations.map(location => ({ ...location, x: 101 })) })).toBe(false);
  expect(accepts({ ...mapConfig, locations: mapConfig.locations.map(location => ({ ...location, y: -1 })) })).toBe(false);
  expect(accepts({ ...mapConfig, locations: mapConfig.locations.map(location => ({ ...location, x: 50, y: 50 })) })).toBe(false);
  expect(accepts({ ...mapConfig, locations: [...mapConfig.locations, { ...mapConfig.locations[0], id: 'unused' }] })).toBe(false);
  expect(accepts({ ...mapConfig, locations: mapConfig.locations.map(location => ({ ...location, sourceId: 'missing' })) })).toBe(false);
  expect(accepts({ ...mapConfig, cards: mapConfig.cards.map(card => ({ ...card, locationId: 'missing' })) })).toBe(false);
  expect(accepts({ ...mapConfig, cards: mapConfig.cards.map(card => ({ ...card, sourceId: 'missing' })) })).toBe(false);
});
