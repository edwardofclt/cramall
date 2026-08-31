import {useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

const structures=['sequence','compare-contrast','cause-effect','problem-solution','description'] as const;
const structureLabel=(structure:string)=>structure.replace(/-/g,' and ');
type TextStructureSorterProps=WidgetProps<'text-structure-sorter'>;
type Placements=Record<string,string>;

function TextStructureSorterBody({config,onEvent}:TextStructureSorterProps){
  const key=JSON.stringify(config);
  const [selectedId,setSelectedId]=useState<string|null>(null);
  const [placements,setPlacements]=useState<Placements>({});
  const {completeOnce}=useCompletionLatch(key);

  const inAuthoredOrder=(next:Placements)=>Object.fromEntries(
    config.excerpts.flatMap((excerpt)=>next[excerpt.id]===undefined?[]:[[excerpt.id,next[excerpt.id]]]),
  );
  const correct=(next:Placements)=>config.excerpts.every((excerpt)=>next[excerpt.id]===excerpt.structure);
  const emit=(next:Placements,action:'select-excerpt'|'place-structure'|'reset')=>{
    const ordered=inAuthoredOrder(next);
    setPlacements(ordered);
    onEvent({type:'interaction',action});
    onEvent({type:'change',value:{placements:ordered}});
    if(correct(ordered)){
      completeOnce(()=>onEvent({type:'complete',value:{placements:ordered}}));
    }
  };
  const select=(id:string)=>{
    setSelectedId(id);
    emit(placements,'select-excerpt');
  };
  const isCorrect=correct(placements);
  const placementCount=Object.keys(placements).length;
  const state=isCorrect?'complete':placementCount>0?'revision':'sorting';
  const status=isCorrect
    ?'Every text structure is correct.'
    :placementCount>0
      ?'This arrangement needs revision. Select an excerpt to try a different structure.'
      :selectedId?'Choose a structure for the selected excerpt.':'Select an excerpt.';

  return <section className="card widget-experiment structures" data-testid="widget-text-structure-sorter" data-state={state}>
    <header>
      <h3>Sort the text structures</h3>
      <p>Read each full excerpt. Select it, then place it in the structure that best describes how its ideas are organized.</p>
    </header>
    <div className="text-structure-excerpts" aria-label="Text excerpts">
      {config.excerpts.map((excerpt)=>{
        const selected=selectedId===excerpt.id;
        const placement=placements[excerpt.id];
        return <article className="text-structure-excerpt" key={excerpt.id} data-selected={selected?'yes':'no'}>
          <p>{excerpt.text}</p>
          <button aria-label={`Select ${excerpt.text}`} aria-pressed={selected} onClick={()=>select(excerpt.id)}>
            {selected?'✓ Selected':'○ Select excerpt'}
          </button>
          <output className="text-structure-placement" data-testid={`text-structure-placement-${excerpt.id}`}>
            {placement?`Placed in ${structureLabel(placement)} (${placement})`:'Not placed yet'}
          </output>
        </article>;
      })}
    </div>
    <div className="text-structure-bins" aria-label="Text structure choices">
      {structures.map((structure)=><button key={structure} aria-label={`Place selected excerpt in ${structureLabel(structure)}`} disabled={!selectedId} onClick={()=>{
        if(selectedId)emit({...placements,[selectedId]:structure},'place-structure');
      }}>{structureLabel(structure)}</button>)}
    </div>
    <div className="text-structure-controls"><button onClick={()=>{setSelectedId(null);emit({},'reset');}}>Start over</button></div>
    <p role="status">{status}</p>
  </section>;
}

export default function TextStructureSorter(props:TextStructureSorterProps){
  return <TextStructureSorterBody key={JSON.stringify(props.config)} {...props}/>;
}
