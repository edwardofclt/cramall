import { describe, expect, test } from 'vitest';
import { allLessons } from './subjects';
import type { WidgetRef } from './schema';

/**
 * A widget earns its place on a card only when the learner has a decision to make. Two
 * failure modes recur across the catalog and neither is caught by the Zod contracts, which
 * check that a config is well-formed rather than that it teaches:
 *
 *   - *No decision*: every control has exactly one option, so the only possible interaction
 *     is the correct one (a one-token transfer builder, a single-cell area model).
 *   - *Pre-solved*: the config's initial state already equals its target, so the widget
 *     mounts complete and the search the card describes never happens.
 *
 * A third, narrower case is an answer that the widget states before the learner commits.
 *
 * Types absent from RULES have no mechanical reachability rule and pass by default; a rule
 * belongs here only when it can be decided from the config alone, never from card prose.
 */

type Placement = { lessonId: string; cardId: string; widget: WidgetRef };

function placements(): Placement[] {
  return allLessons().flatMap((lesson) =>
    lesson.learnCards.flatMap((card) => (
      card.widget ? [{ lessonId: lesson.id, cardId: card.id, widget: card.widget }] : []
    )));
}

/** Returns a defect description, or null when the config gives the learner a real choice. */
type Rule = (config: any) => string | null;

const RULES: Partial<Record<WidgetRef['type'], Rule>> = {
  'energy-transfer-builder': (c) => {
    const options = c.sources.length + c.transfers.length + c.targets.length;
    return options > c.requiredPath.length
      ? null
      : `every group offers exactly one token, so the only possible path is the correct one `
        + `(${options} tokens for a ${c.requiredPath.length}-step path)`;
  },

  'erosion-simulator': (c) => (
    c.targetAgent === undefined || c.agents.length >= 2
      ? null
      : `targetAgent "${c.targetAgent}" is the only agent offered, so pressing Run completes `
        + `the widget with no choice made`
  ),

  'area-model-multiplier': (c) => {
    const cells = (c.splitA?.length ?? 1) * (c.splitB?.length ?? 1);
    return cells >= 2
      ? null
      : 'splits produce a single cell, so the model is one tap and shows no decomposition';
  },

  'array-builder': (c) => (
    c.targetProduct === undefined || c.rows * c.columns !== c.targetProduct
      ? null
      : `mounts already at its target (${c.rows} x ${c.columns} = ${c.targetProduct}), so the `
        + 'array the card asks the learner to find is already built'
  ),

  'fraction-models': (c) => (
    c.target === undefined
      || (c.numerator ?? 0) * c.target.denominator !== c.target.numerator * c.denominator
      ? null
      : 'mounts already showing its target fraction'
  ),

  'energy-conversion-designer': (c) => (
    c.components.length >= 3
      ? null
      : `${c.components.length} components leave exactly one legal click per step, so the `
        + 'output-must-match-input rule is never tested'
  ),

  'animal-structure-matcher': (c) => (
    c.pairs.length >= 3 ? null : `${c.pairs.length} pairs make the match a coin flip`
  ),

  'resource-sorter': (c) => (
    c.items.length >= 3 ? null : `${c.items.length} items make the sort a coin flip`
  ),

  'topographic-map-explorer': (c) => (
    c.targetPointId === undefined || c.points.length >= 3
      ? null
      : `${c.points.length} points make the Check a coin flip`
  ),

  'rock-layer-explorer': (c) => {
    if (c.targetLayerId === undefined) return null;
    if (c.layers.length < 3) return `${c.layers.length} layers make the Check a coin flip`;
    // RockLayerExplorer appends ", the oldest rank shown" on selection, before Check.
    const oldest = Math.max(...c.layers.map((layer: any) => layer.age));
    const target = c.layers.find((layer: any) => layer.id === c.targetLayerId);
    return target?.age === oldest
      ? 'targets the oldest layer, which the widget names as oldest on selection - the status '
        + 'line gives the answer away before the learner commits'
      : null;
  },

  'collision-ramp': (c) => {
    if (c.target !== 'predict-direction') return null;
    const pushA = c.massA * (c.speedA ?? 0);
    const pushB = c.massB * (c.speedB ?? 0);
    return pushA !== 0 && pushB !== 0
      ? null
      : `one cart's push number is fixed at 0 (A=${pushA}, B=${pushB}), so no speed change the `
        + 'card authorises can alter the prediction';
  },

  'clock-elapsed-time': (c) => (
    // ClockElapsedTime gates its control block on mode === 'set-time'; 'elapsed' is display-only.
    c.mode === 'set-time' ? null : `mode "${c.mode}" renders no controls at all`
  ),
};

describe('widget configs give the learner a decision', () => {
  test('no placed widget is degenerate, pre-solved, or self-answering', () => {
    const defects = placements().flatMap(({ cardId, widget }) => {
      const rule = RULES[widget.type];
      if (!rule) return [];
      const defect = rule(widget.config);
      return defect ? [`${cardId} [${widget.type}]: ${defect}`] : [];
    });

    expect(defects, `\n${defects.join('\n')}\n`).toEqual([]);
  });

  test('the rule table only names widget types that are actually registered', () => {
    const placed = new Set(placements().map(({ widget }) => widget.type));
    const unused = Object.keys(RULES).filter((type) => !placed.has(type as WidgetRef['type']));
    expect(unused, 'rules for widgets no lesson places are dead weight').toEqual([]);
  });
});
