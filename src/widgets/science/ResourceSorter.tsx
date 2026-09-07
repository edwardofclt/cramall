import { ActivityWorkbench } from '../ActivityWorkbench';
import './guide-led-science.css';
import { ResourceObject } from './ScienceScenes';
import {useEffect, useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

const binLabels = {
  renewable: 'Renewable resource',
  nonrenewable: 'Nonrenewable resource',
  conserve: 'Conservation action',
} as const;

type ResourceKind = keyof typeof binLabels;
type Placements = Record<string, ResourceKind>;
type Effects = Record<string, string>;
type CoachPhase = 'none' | 'strategy' | 'retry';
const resourceVisualKey = (value: string) => value.normalize('NFKC').toLocaleLowerCase();

const orderedPlacements = (items: WidgetProps<'resource-sorter'>['config']['items'], placements: Placements) => Object.fromEntries(
  items.flatMap((item) => placements[item.id] === undefined ? [] : [[item.id, placements[item.id]]]),
);
const orderedEffects = (items: WidgetProps<'resource-sorter'>['config']['items'], effects: Effects) => Object.fromEntries(
  items.flatMap((item) => effects[item.id] === undefined ? [] : [[item.id, effects[item.id]]]),
);

function ResourceSorterBody({config, onEvent}: WidgetProps<'resource-sorter'>) {
  const key = JSON.stringify(config);
  const [selected, setSelected] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Placements>({});
  const [effects, setEffects] = useState<Effects>({});
  const initialStatus = config.items.some((item) => (item.effectChoices ?? config.effectChoices ?? []).length > 0)
    ? 'Sort each item, then connect it to a lesson effect.'
    : 'Select an item, then choose an authored category.';
  const [status, setStatus] = useState(initialStatus);
  const [coachPhase, setCoachPhase] = useState<CoachPhase>('none');
  const {completed, completeOnce} = useCompletionLatch(key);
  const effectChoicesFor = (item: typeof config.items[number]) => item.effectChoices ?? config.effectChoices ?? [];
  const effectAnswerFor = (item: typeof config.items[number]) => item.effectAnswerId
    ?? Object.entries(config.effectAnswers ?? {}).find(([itemId]) => resourceVisualKey(itemId) === resourceVisualKey(item.id))?.[1];
  const requiresEffects = config.items.some((item) => effectChoicesFor(item).length > 0);
  const isCorrect = (nextPlacements: Placements, nextEffects: Effects = effects) => config.items.every((item) => nextPlacements[item.id] === item.kind)
    && (!requiresEffects || config.items.every((item) => {
      const answer = effectAnswerFor(item);
      return effectChoicesFor(item).length > 0 && answer !== undefined && nextEffects[item.id] !== undefined
        && resourceVisualKey(nextEffects[item.id]!) === resourceVisualKey(answer);
    }));
  const visibleComplete = completed && isCorrect(placements, effects);

  useEffect(() => {
    setSelected(null);
    setPlacements({});
    setEffects({});
    setStatus(initialStatus);
    setCoachPhase('none');
  }, [key]);

  const coachWrong = () => {
    const cue = coachPhase === 'none' ? 'strategy' : 'retry';
    setCoachPhase(cue);
    onEvent({type: 'coach', cue});
  };

  const emit = (next: Placements, action: 'select-item' | 'place-item' | 'reset') => {
    const ordered = orderedPlacements(config.items, next);
    setPlacements(ordered);
    onEvent({type: 'interaction', action});
    onEvent({type: 'change', value: {placements: ordered}});
    return ordered;
  };

  const select = (id: string) => {
    const item = config.items.find((candidate) => candidate.id === id)!;
    setSelected(id);
    setStatus(`${item.label} selected. Choose an authored category, then connect its lesson effect.`);
    emit(placements, 'select-item');
  };

  const place = (bin: ResourceKind) => {
    if (!selected) return;
    const item = config.items.find((candidate) => candidate.id === selected)!;
    const next = {...placements, [selected]: bin};
    setSelected(null);
    const categoryCorrect = bin === item.kind;
    if (!categoryCorrect) {
      setStatus(requiresEffects
        ? `${item.label} is currently in ${binLabels[bin]}. Compare the lesson category and revise it.`
        : `${item.label} is currently in ${binLabels[bin]}. Revision needed.`);
      coachWrong();
    } else if (effectChoicesFor(item).length > 0) {
      setStatus(`${item.label} is in ${binLabels[bin]}. Now connect it to a lesson use/effect.`);
    } else if (isCorrect(next)) {
      setStatus(`${item.label} is currently in ${binLabels[bin]}. No revision needed. Every item is in its authored category.`);
    } else if (!requiresEffects) {
      setStatus(`${item.label} is currently in ${binLabels[bin]}. No revision needed. Keep sorting the remaining items.`);
    } else {
      setStatus(`${item.label} is in ${binLabels[bin]}. Keep sorting the remaining items.`);
    }
    const ordered = emit(next, 'place-item');
    if (isCorrect(ordered, effects)) {
      if (requiresEffects) onEvent({type: 'coach', cue: 'milestone'});
      completeOnce(() => onEvent({type: 'complete', value: {placements: ordered}}));
    }
  };

  const chooseEffect = (itemId: string, effectId: string) => {
    if (placements[itemId] === undefined) return;
    const item = config.items.find((candidate) => candidate.id === itemId)!;
    const nextEffects = {...effects, [itemId]: effectId};
    setEffects(nextEffects);
    const effect = effectChoicesFor(item).find((choice) => resourceVisualKey(choice.id) === resourceVisualKey(effectId));
    if (!effect) return;
    const answer = effectAnswerFor(item);
    const effectCorrect = answer !== undefined && resourceVisualKey(effectId) === resourceVisualKey(answer);
    const ordered = orderedPlacements(config.items, placements);
    const orderedEffectValues = orderedEffects(config.items, nextEffects);
    onEvent({type: 'interaction', action: 'connect-effect'});
    onEvent({type: 'change', value: {placements: ordered, effects: orderedEffectValues}});
    if (!effectCorrect) {
      setStatus(`${item.label} is connected to “${effect.text}.” Revisit the lesson fact and revise the use/effect connection.`);
      coachWrong();
    } else if (isCorrect(placements, nextEffects)) {
      setStatus(`${item.label} is connected to “${effect.text}.” Every category and lesson effect is connected.`);
      onEvent({type: 'coach', cue: 'milestone'});
      completeOnce(() => onEvent({type: 'complete', value: {placements: ordered, effects: orderedEffectValues}}));
    } else {
      setStatus(`${item.label} is connected to “${effect.text}.” Keep connecting the remaining items.`);
    }
  };

  const reset = () => {
    setSelected(null);
    setPlacements({});
    setEffects({});
    setStatus(initialStatus);
    setCoachPhase('none');
    emit({}, 'reset');
  };

  const categoryChoices = <section className="resource-bins" aria-label="Authored categories">
      {config.bins.map((bin) => <article className="resource-bin" key={bin}>
        <strong>{binLabels[bin]}</strong>

        <button aria-label={`Place selected item in ${binLabels[bin]}`} disabled={!selected} onClick={() => place(bin)}>{binLabels[bin]}</button>
      </article>)}
    </section>;

  return <section className="card widget-experiment resources activity-shell science-activity" data-testid="widget-resource-sorter" data-state={visibleComplete ? 'complete' : 'sorting'} aria-describedby="resource-model-note">
    <ActivityWorkbench label="Resource connections" revealKey={Object.keys(placements).length+Object.keys(effects).length} visual={<>
    <header><h3>Resource sorter</h3><p className="science-model-label">Model only · not physical evidence</p></header>
      <div className="science-resource-board">{config.items.map(item=><article key={item.id} className="science-feedback"><ResourceObject label={item.label}/><strong>{item.label}</strong><p>{placements[item.id] === undefined ? 'Choose this resource or action to place it.' : `Your placement: ${binLabels[placements[item.id]]}`}</p>{effects[item.id] && <p>{effectChoicesFor(item).find(choice=>choice.id===effects[item.id])?.text}</p>}</article>)}</div>
    </>}>
    <section className="resource-items" aria-label="Items to sort">
      {config.items.map((item) => {
        const choices = effectChoicesFor(item);
        const selectedEffect = effects[item.id];
        return <article className="resource-item-card" key={item.id} data-selected={selected === item.id ? 'yes' : 'no'}>
          <strong>{item.label}</strong>
          {placements[item.id] !== undefined && <span aria-label={`${item.label} category feedback`} className="resource-category-note" data-outcome={placements[item.id] === item.kind ? 'correct' : 'retry'}>{placements[item.id] === item.kind ? '✓ Category matched: ' : 'Try again: '}{binLabels[placements[item.id]]}{placements[item.id] === item.kind && item.lessonCategory ? ` · ${item.lessonCategory}` : ''}</span>}
          {selected === item.id && <span className="resource-selection-marker">Selected</span>}
          <button aria-label={`Select ${item.label}`} aria-pressed={selected === item.id} onClick={() => select(item.id)}>Select {item.label}</button>
          {selected === item.id && categoryChoices}
          <p className="resource-placement" data-testid={`resource-placement-${item.id}`}>{placements[item.id] === undefined ? 'Not sorted yet' : `Placed in: ${binLabels[placements[item.id]]}`}</p>
          {choices.length > 0 && placements[item.id] !== undefined && <fieldset className="resource-effect-choices" disabled={placements[item.id] === undefined}>
            <legend>Connect {item.label} to a use/effect</legend>
            {choices.map((choice) => <button type="button" key={choice.id} aria-label={`Connect ${item.label} to ${choice.text}`} aria-pressed={selectedEffect === choice.id} onClick={() => chooseEffect(item.id, choice.id)}>{selectedEffect === choice.id ? 'Connected: ' : 'Connect: '}{choice.text}</button>)}
            {selectedEffect && <span className="resource-effect-status">Current connection: {choices.find((choice) => choice.id === selectedEffect)?.text}</span>}
          </fieldset>}
        </article>;
      })}
    </section>
    {!selected && categoryChoices}
    <div className="resource-controls"><button onClick={reset}>Start over</button></div>
    <p role="status">{status}</p>
    <section className="science-model-notes" aria-label="About this model"><h4>About this model</h4>

      <p id="resource-model-note">This model uses authored categories for this activity ({config.lessonCategory ?? 'resource use'}). It does not examine resources or measure environmental effects; revise a connection when the lesson fact changes your thinking.</p>
    </section>
    </ActivityWorkbench>
  </section>;
}

export default function ResourceSorter(props: WidgetProps<'resource-sorter'>) {
  return <ResourceSorterBody key={JSON.stringify(props.config)} {...props} />;
}
