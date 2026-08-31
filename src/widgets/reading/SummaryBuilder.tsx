import {useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type SummaryBuilderProps=WidgetProps<'summary-builder'>;

function SummaryBuilderBody({config,onEvent}:SummaryBuilderProps){
  const key=JSON.stringify(config);
  const [selectedIds,setSelectedIds]=useState<string[]>([]);
  const {completeOnce}=useCompletionLatch(key);
  const inAuthoredOrder=(ids:string[])=>config.sourceSentences
    .map((sentence)=>sentence.id)
    .filter((id)=>ids.includes(id));
  const isValid=(ids:string[])=>config.requiredMainIds.every((id)=>ids.includes(id))
    &&ids.length<=config.maxSentences
    &&!ids.some((id)=>config.sourceSentences.find((sentence)=>sentence.id===id)?.role==='extra');
  const emit=(ids:string[],action:'toggle-sentence'|'reset')=>{
    const ordered=inAuthoredOrder(ids);
    setSelectedIds(ordered);
    onEvent({type:'interaction',action});
    onEvent({type:'change',value:{selectedIds:ordered}});
    if(isValid(ordered)){
      completeOnce(()=>onEvent({type:'complete',value:{selectedIds:ordered}}));
    }
  };
  const hasExtra=selectedIds.some((id)=>
    config.sourceSentences.find((sentence)=>sentence.id===id)?.role==='extra');
  const overLimit=selectedIds.length>config.maxSentences;
  const missingMain=!config.requiredMainIds.every((id)=>selectedIds.includes(id));
  const currentValid=isValid(selectedIds);
  const state=currentValid?'complete':selectedIds.length?'revision':'building';
  const feedback=hasExtra
    ?'An extra sentence does not belong in this summary.'
    :overLimit
      ?'Too many sentences are selected. Shorten the summary.'
      :missingMain
        ?'Include every main idea before finishing the summary.'
        :'Keep choosing only sentences that explain the main ideas.';

  return <section className="card widget-experiment summary" data-testid="widget-summary-builder" data-state={state} data-current-valid={currentValid?'yes':'no'}>
    <header>
      <h3>Build a concise summary</h3>
      <p>Read every source sentence. Choose the main ideas and only the details needed to explain them.</p>
    </header>
    <div className="summary-source-sentences" aria-label="Source sentences">
      {config.sourceSentences.map((sentence)=>{
        const selected=selectedIds.includes(sentence.id);
        return <button key={sentence.id} aria-label={`Toggle ${sentence.text}`} aria-pressed={selected} onClick={()=>emit(
          selected?selectedIds.filter((id)=>id!==sentence.id):selectedIds.concat(sentence.id),
          'toggle-sentence',
        )}>
          <span>{sentence.text}</span>
          <span className="summary-selection-marker" aria-hidden="true">{selected?'✓ Selected':'○ Not selected'}</span>
        </button>;
      })}
    </div>
    <div className="summary-current" aria-label="Current summary">
      <h4>Your summary</h4>
      <p>Selected {selectedIds.length} of {config.maxSentences} sentences.</p>
      <ol data-testid="summary-selected-order">
        {selectedIds.length
          ?selectedIds.map((id)=><li key={id}>{config.sourceSentences.find((sentence)=>sentence.id===id)?.text}</li>)
          :<li>No sentences selected yet.</li>}
      </ol>
      <strong className="summary-valid-marker">{currentValid?'✓ Summary ready':'○ Needs revision'}</strong>
    </div>
    <div className="summary-controls"><button onClick={()=>emit([],'reset')}>Start over</button></div>
    <p role="status">{feedback}</p>
  </section>;
}

export default function SummaryBuilder(props:SummaryBuilderProps){
  return <SummaryBuilderBody key={JSON.stringify(props.config)} {...props}/>;
}
