import {useState} from 'react';
import {ActivityWorkbench} from '../ActivityWorkbench';
import './guide-led-reading.css';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

const defaultStructures=['sequence','compare-contrast','cause-effect','problem-solution','description'] as const;
const structureLabel=(structure:string)=>structure.replace(/-/g,' and ');
type TextStructureSorterProps=WidgetProps<'text-structure-sorter'>;
type Placements=Record<string,string>;

function TextStructureSorterBody({config,onEvent}:TextStructureSorterProps){
  const key=JSON.stringify(config);
  const [selectedId,setSelectedId]=useState<string|null>(null);
  const [placements,setPlacements]=useState<Placements>({});
  const [lastMissId,setLastMissId]=useState<string|null>(null);
  const {completeOnce}=useCompletionLatch(key);
  const structures=config.availableStructures ?? defaultStructures;

  const inAuthoredOrder=(next:Placements)=>Object.fromEntries(
    config.excerpts.flatMap((excerpt)=>next[excerpt.id]===undefined?[]:[[excerpt.id,next[excerpt.id]]]),
  );
  const correct=(next:Placements)=>config.excerpts.every((excerpt)=>next[excerpt.id]===excerpt.structure);
  const emit=(next:Placements,action:'select-excerpt'|'place-structure'|'reset')=>{
    if(action==='place-structure'&&selectedId&&next[selectedId]===placements[selectedId])return;
    const ordered=inAuthoredOrder(next);
    const previousCorrectCount=config.excerpts.filter((excerpt)=>placements[excerpt.id]===excerpt.structure).length;
    const nextCorrectCount=config.excerpts.filter((excerpt)=>ordered[excerpt.id]===excerpt.structure).length;
    const actedOn=selectedId===null?undefined:config.excerpts.find((excerpt)=>excerpt.id===selectedId);
    const missId=action==='place-structure'&&actedOn&&ordered[actedOn.id]!==actedOn.structure?actedOn.id:null;
    setPlacements(ordered);
    setLastMissId(action==='reset'?null:missId??lastMissId);
    onEvent({type:'interaction',action});
    onEvent({type:'change',value:{placements:ordered}});
    if(action==='select-excerpt') onEvent({type:'coach',cue:'strategy'});
    if(action==='place-structure'&&nextCorrectCount>previousCorrectCount&&nextCorrectCount===1) onEvent({type:'coach',cue:'milestone'});
    if(action==='place-structure'&&actedOn&&ordered[actedOn.id]!==actedOn.structure) onEvent({type:'coach',cue:'retry'});
    if(correct(ordered)){
      completeOnce(()=>onEvent({type:'complete',value:{placements:ordered}}));
    }
  };
  const select=(id:string)=>{
    if(selectedId===id)return;
    setSelectedId(id);
    emit(placements,'select-excerpt');
  };
  const isCorrect=correct(placements);
  const placementCount=Object.keys(placements).length;
  const state=isCorrect?'complete':config.excerpts.some(excerpt=>placements[excerpt.id]&&placements[excerpt.id]!==excerpt.structure)?'revision':'sorting';
  const incorrect=config.excerpts.find((excerpt)=>excerpt.id===lastMissId&&placements[excerpt.id]!==undefined&&placements[excerpt.id]!==excerpt.structure)
    ??config.excerpts.find((excerpt)=>placements[excerpt.id]!==undefined&&placements[excerpt.id]!==excerpt.structure);
  const status=isCorrect
    ?'Every text structure is correct.'
    :incorrect
      ?`“${incorrect.text}” is placed in ${structureLabel(placements[incorrect.id]??'')}. What relationship does it show? Reread the excerpt and try again.`
      :placementCount>0
        ?'This arrangement is taking shape. Select an excerpt to place or revise.'
        :selectedId?'Choose a structure for the selected excerpt.':'Select an excerpt.';

  return <section className="card widget-experiment activity-shell reading-activity structures" data-testid="widget-text-structure-sorter" data-state={state}>
    <ActivityWorkbench label="Text structures" visualScrollable visual={<>
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

          <output className="text-structure-placement" data-testid={`text-structure-placement-${excerpt.id}`}>
            {placement?`Placed in ${structureLabel(placement)} (${placement})`:'Not placed yet'}
          </output>
        </article>;
      })}
    </div>
    </>}>
    <div className="text-structure-excerpts" aria-label="Choose an excerpt">{config.excerpts.map(excerpt=><button key={excerpt.id} aria-label={`Select ${excerpt.text}`} aria-pressed={selectedId===excerpt.id} onClick={()=>select(excerpt.id)}>{excerpt.text}<span>{selectedId===excerpt.id?' · Selected':''}</span></button>)}</div>
    <div className="text-structure-bins" aria-label="Text structure choices">
      {structures.map((structure)=><button key={structure} aria-label={`Place selected excerpt in ${structureLabel(structure)}`} disabled={!selectedId} onClick={()=>{
        if(selectedId)emit({...placements,[selectedId]:structure},'place-structure');
      }}>{structureLabel(structure)}</button>)}
    </div>
    <div className="text-structure-controls"><button onClick={()=>{setSelectedId(null);emit({},'reset');}}>Start over</button></div>
    <div aria-label="Placement record">{config.excerpts.map(excerpt=><p key={excerpt.id} aria-label={`Placement feedback for ${excerpt.id}`} data-outcome={!placements[excerpt.id]?'neutral':placements[excerpt.id]===excerpt.structure?'correct':'incorrect'}>{excerpt.text} — {!placements[excerpt.id]?'Not placed yet.':placements[excerpt.id]===excerpt.structure?'Correct: this relationship fits the complete excerpt.':'Try again: reread how the ideas connect before placing this excerpt again.'}</p>)}</div>
    {isCorrect&&<p>Compare two excerpts. Which words show that their ideas connect in different ways?</p>}
    <p role="status">{status}</p>
    </ActivityWorkbench>
  </section>;
}

export default function TextStructureSorter(props:TextStructureSorterProps){
  return <TextStructureSorterBody key={JSON.stringify(props.config)} {...props}/>;
}
