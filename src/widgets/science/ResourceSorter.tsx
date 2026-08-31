import {useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

const binLabels = {
  renewable: 'Renewable resource',
  nonrenewable: 'Nonrenewable resource',
  conserve: 'Conservation action',
} as const;

type ResourceKind = keyof typeof binLabels;
type Placements = Record<string, ResourceKind>;

const orderedPlacements = (items: WidgetProps<'resource-sorter'>['config']['items'], placements: Placements) => Object.fromEntries(
  items.flatMap((item) => placements[item.id] === undefined ? [] : [[item.id, placements[item.id]]]),
);

function ResourceSorterBody({config, onEvent}: WidgetProps<'resource-sorter'>) {
  const key = JSON.stringify(config);
  const [selected, setSelected] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Placements>({});
  const [status, setStatus] = useState('Select an item, then choose an authored category.');
  const {completed, completeOnce} = useCompletionLatch(key);
  const isCorrect = (next: Placements) => config.items.every((item) => next[item.id] === item.kind);
  const visibleComplete = completed && isCorrect(placements);

  const emit = (next: Placements, action: 'select-item' | 'place-item' | 'reset') => {
    const ordered = orderedPlacements(config.items, next);
    setPlacements(ordered);
    onEvent({type: 'interaction', action});
    onEvent({type: 'change', value: {placements: ordered}});
    if (isCorrect(ordered)) completeOnce(() => onEvent({type: 'complete', value: {placements: ordered}}));
  };

  const select = (id: string) => {
    const item = config.items.find((candidate) => candidate.id === id)!;
    setSelected(id);
    setStatus(`${item.label} selected. Choose an authored category.`);
    emit(placements, 'select-item');
  };

  const place = (bin: ResourceKind) => {
    if (!selected) return;
    const item = config.items.find((candidate) => candidate.id === selected)!;
    const next = {...placements, [selected]: bin};
    setSelected(null);
    if (bin !== item.kind) {
      setStatus(`${item.label} is currently in ${binLabels[bin]}. A revision is needed.`);
    } else if (isCorrect(next)) {
      setStatus('Every item is in its authored category.');
    } else {
      setStatus(`${item.label} is currently in ${binLabels[bin]}. Keep sorting the remaining items.`);
    }
    emit(next, 'place-item');
  };

  const reset = () => {
    setSelected(null);
    setStatus('Select an item, then choose an authored category.');
    emit({}, 'reset');
  };

  return <section className="card widget-experiment resources" data-testid="widget-resource-sorter" data-state={visibleComplete ? 'complete' : 'sorting'} aria-describedby="resource-model-note">
    <header>
      <h3>Resource sorter</h3>
      <p id="resource-model-note">These are authored categories for this activity. This model does not examine resources or measure environmental effects.</p>
    </header>
    <section className="resource-items" aria-label="Items to sort">
      {config.items.map((item) => <article className="resource-item-card" key={item.id} data-selected={selected === item.id ? 'yes' : 'no'}>
        <strong>{item.label}</strong>
        {selected === item.id && <span className="resource-selection-marker">Selected</span>}
        <button aria-label={`Select ${item.label}`} aria-pressed={selected === item.id} onClick={() => select(item.id)}>Select {item.label}</button>
        <p className="resource-placement" data-testid={`resource-placement-${item.id}`}>{placements[item.id] === undefined ? 'Not sorted yet' : `Placed in: ${binLabels[placements[item.id]]}`}</p>
      </article>)}
    </section>
    <section className="resource-bins" aria-label="Authored categories">
      {config.bins.map((bin) => <article className="resource-bin" key={bin}>
        <strong>{binLabels[bin]}</strong>
        <span className="resource-placement-marker">Category</span>
        <button aria-label={`Place selected item in ${binLabels[bin]}`} disabled={!selected} onClick={() => place(bin)}>Place here</button>
      </article>)}
    </section>
    <div className="resource-controls"><button onClick={reset}>Start over</button></div>
    <p role="status">{status}</p>
  </section>;
}

export default function ResourceSorter(props: WidgetProps<'resource-sorter'>) {
  return <ResourceSorterBody key={JSON.stringify(props.config)} {...props} />;
}
