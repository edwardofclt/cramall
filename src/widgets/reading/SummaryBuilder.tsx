import {useEffect,useMemo,useRef,useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type SummaryBuilderProps=WidgetProps<'summary-builder'>;
type SummaryValue={selectedIds:string[];composition?:string};

function countWords(value:string){
  const trimmed=value.trim();
  return trimmed?trimmed.split(/\s+/u).length:0;
}

function SummaryBuilderBody({config,onEvent}:SummaryBuilderProps){
  const key=JSON.stringify(config);
  const [selectedIds,setSelectedIds]=useState<string[]>([]);
  const [composition,setComposition]=useState('');
  const [attemptedComposition,setAttemptedComposition]=useState(false);
  const strategyAnnounced=useRef(false);
  const retryAnnounced=useRef(false);
  const {completeOnce,completed}=useCompletionLatch(key);
  const sourceById=useMemo(()=>new Map(config.sourceSentences.map((sentence)=>[sentence.id,sentence])),[config.sourceSentences]);
  const inAuthoredOrder=(ids:string[])=>config.sourceSentences
    .map((sentence)=>sentence.id)
    .filter((id)=>ids.includes(id));
  const requiredDetailIds=config.requiredDetailIds??[];
  const hasCompositionStage=config.compositionPrompt!==undefined
    ||config.minCompositionWords!==undefined
    ||config.maxCompositionWords!==undefined;
  const selectedExtras=selectedIds.filter((id)=>sourceById.get(id)?.role==='extra');
  const unexpectedDetails=requiredDetailIds.length>0
    ?selectedIds.filter((id)=>sourceById.get(id)?.role==='detail'&&!requiredDetailIds.includes(id))
    :[];
  const missingMainIds=config.requiredMainIds.filter((id)=>!selectedIds.includes(id));
  const missingDetailIds=requiredDetailIds.filter((id)=>!selectedIds.includes(id));
  const overLimit=selectedIds.length>config.maxSentences;
  const planValid=missingMainIds.length===0
    &&missingDetailIds.length===0
    &&selectedExtras.length===0
    &&unexpectedDetails.length===0
    &&!overLimit;
  const wordCount=countWords(composition);
  const minWords=config.minCompositionWords??0;
  const maxWords=config.maxCompositionWords??Number.POSITIVE_INFINITY;
  const compositionValid=!hasCompositionStage
    ||(wordCount>0&&wordCount>=minWords&&wordCount<=maxWords);
  const currentValid=completed&&planValid&&compositionValid;

  useEffect(()=>{
    setSelectedIds([]);
    setComposition('');
    setAttemptedComposition(false);
    strategyAnnounced.current=false;
    retryAnnounced.current=false;
  },[key]);

  const emitValue=(value:SummaryValue)=>{
    const eventValue=value.composition===undefined
      ?{selectedIds:value.selectedIds}
      :value;
    onEvent({type:'change',value:eventValue});
  };

  const emitSelection=(ids:string[],action:'toggle-sentence'|'reset',compositionOverride?:string)=>{
    const ordered=inAuthoredOrder(ids);
    const nextPlanValid=planValidFor(ordered);
    if(action==='reset'){
      strategyAnnounced.current=false;
      retryAnnounced.current=false;
    }
    setSelectedIds(ordered);
    onEvent({type:'interaction',action});
    if(!strategyAnnounced.current&&ordered.length>0){
      strategyAnnounced.current=true;
      onEvent({type:'coach',cue:'strategy'});
    }
    if(ordered.length>0&&retryableSelectionFor(ordered)&&!retryAnnounced.current){
      retryAnnounced.current=true;
      onEvent({type:'coach',cue:'retry'});
    }
    if(nextPlanValid&&!planValid){
      retryAnnounced.current=false;
      onEvent({type:'coach',cue:'milestone'});
    }
    emitValue({selectedIds:ordered,composition:compositionOverride??(composition||undefined)});
    if(!hasCompositionStage&&nextPlanValid){
      completeOnce(()=>onEvent({type:'complete',value:{selectedIds:ordered}}));
    }
  };

  const planValidFor=(ids:string[])=>{
    const selectedExtrasForIds=ids.filter((id)=>sourceById.get(id)?.role==='extra');
    const unexpectedDetailsForIds=requiredDetailIds.length>0
      ?ids.filter((id)=>sourceById.get(id)?.role==='detail'&&!requiredDetailIds.includes(id))
      :[];
    return config.requiredMainIds.every((id)=>ids.includes(id))
      &&requiredDetailIds.every((id)=>ids.includes(id))
      &&selectedExtrasForIds.length===0
      &&unexpectedDetailsForIds.length===0
      &&ids.length<=config.maxSentences;
  };

  const retryableSelectionFor=(ids:string[])=>{
    const selectedExtrasForIds=ids.filter((id)=>sourceById.get(id)?.role==='extra');
    const unexpectedDetailsForIds=requiredDetailIds.length>0
      ?ids.filter((id)=>sourceById.get(id)?.role==='detail'&&!requiredDetailIds.includes(id))
      :[];
    return selectedExtrasForIds.length>0
      ||unexpectedDetailsForIds.length>0
      ||ids.length>config.maxSentences;
  };

  const updateComposition=(value:string)=>{
    setComposition(value);
    setAttemptedComposition(true);
    emitValue({selectedIds,composition:value});
  };

  const submitComposition=()=>{
    setAttemptedComposition(true);
    if(planValid&&compositionValid){
      completeOnce(()=>onEvent({type:'complete',value:{selectedIds,composition}}));
    } else {
      if(!retryAnnounced.current){
        retryAnnounced.current=true;
        onEvent({type:'coach',cue:'retry'});
      }
    }
  };

  const hasPlanError=selectedIds.length>0&&!planValid;
  const state=currentValid?'complete':hasPlanError?'revision':'building';
  const feedback=selectedExtras.length>0
    ?'That sentence is a decorative extra. Remove it and keep evidence that explains the main idea.'
    :unexpectedDetails.length>0
      ?'That detail is not required for this concise summary. Remove it and use the named supporting detail.'
    :overLimit
      ?`Too many sentences are selected. Keep the plan to ${config.maxSentences} sentences.`
      :missingMainIds.length>0
        ?'Include every main idea before finishing the summary.'
        :missingDetailIds.length>0
          ?'Add every required supporting detail before writing your summary.'
          :hasCompositionStage&&!compositionValid
            ?attemptedComposition
              ?wordCount<minWords
                ?`Keep writing: your summary needs at least ${minWords} words.`
                :`Shorten your summary to ${maxWords} words or fewer.`
              :'Your plan is ready. Explain the meaning in your own words, then finish your summary.'
            :hasCompositionStage&&planValid
              ?'Your response is within the word range. Finish your summary when you are ready.'
            :'Keep choosing sentences that explain the main ideas.';

  const removeSentence=(id:string)=>emitSelection(selectedIds.filter((selectedId)=>selectedId!==id),'toggle-sentence');

  return <section className="card widget-experiment summary" data-testid="widget-summary-builder" data-state={state} data-current-valid={currentValid?'yes':'no'}>
    <header>
      <h3>Build a concise summary</h3>
      <p>Read every source sentence. Plan with the main idea and the details that explain it.</p>
    </header>
    <fieldset className="summary-source-sentences">
      <legend>Source sentences</legend>
      {config.sourceSentences.map((sentence)=>{
        const selected=selectedIds.includes(sentence.id);
        return <button type="button" key={sentence.id} aria-label={`Toggle ${sentence.text}`} aria-pressed={selected} onClick={()=>emitSelection(
          selected?selectedIds.filter((id)=>id!==sentence.id):selectedIds.concat(sentence.id),
          'toggle-sentence',
        )}>
          <span>{sentence.text}</span>
          <span className="summary-selection-marker" aria-hidden="true">{selected?'✓ Selected':'○ Not selected'}</span>
        </button>;
      })}
    </fieldset>
    <div className="summary-current" aria-label="Current summary plan">
      <h4>Your summary plan</h4>
      <p>Selected {selectedIds.length} of {config.maxSentences} sentences.</p>
      <ol data-testid="summary-selected-order">
        {selectedIds.length
          ?selectedIds.map((id)=><li key={id}>
            <span>{sourceById.get(id)?.text}</span>
            <button type="button" className="summary-remove" aria-label={`Remove "${sourceById.get(id)?.text}" from your plan`} onClick={()=>removeSentence(id)} />
          </li>)
          :<li>No sentences selected yet.</li>}
      </ol>
      <strong className="summary-valid-marker">{currentValid?'✓ Summary ready':planValid?'✓ Plan ready':'○ Needs revision'}</strong>
    </div>
    {planValid&&hasCompositionStage&&<div className="summary-composition">
      <h4>Say the meaning in your own words</h4>
      <p id="summary-composition-prompt">{config.compositionPrompt??'Use your plan to write a concise summary.'}</p>
      <label htmlFor="summary-composition-input">Your summary</label>
      <textarea
        id="summary-composition-input"
        aria-describedby="summary-composition-prompt summary-composition-note"
        value={composition}
        onChange={(event)=>updateComposition(event.target.value)}
        rows={4}
      />
      <p id="summary-composition-note" className="summary-composition-note">
        {wordCount} word{wordCount===1?'':'s'} · We check only that you wrote something within the word range—not meaning or originality.
      </p>
      <button type="button" onClick={submitComposition}>Finish summary</button>
    </div>}
    <div className="summary-controls"><button type="button" onClick={()=>{
      setComposition('');
      setAttemptedComposition(false);
      emitSelection([],'reset',hasCompositionStage?'':undefined);
    }}>Start over</button></div>
    <p role="status">{currentValid?'Summary ready. You wrote a plan and a bounded response.':feedback}</p>
  </section>;
}

export default function SummaryBuilder(props:SummaryBuilderProps){
  return <SummaryBuilderBody key={JSON.stringify(props.config)} {...props}/>;
}
