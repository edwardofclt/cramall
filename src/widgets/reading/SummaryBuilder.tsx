import {useEffect,useMemo,useRef,useState} from 'react';
import {ActivityWorkbench} from '../ActivityWorkbench';
import './guide-led-reading.css';
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
  const {completeOnce}=useCompletionLatch(key);
  const [planChecked,setPlanChecked]=useState(false);
  const [submitted,setSubmitted]=useState(false);
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
  const currentValid=submitted&&planValid&&compositionValid;

  useEffect(()=>{
    setPlanChecked(false); setSubmitted(false);
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
    setPlanChecked(false); setSubmitted(false);
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
    emitValue({selectedIds:ordered,composition:compositionOverride??(composition||undefined)});
  };

  const checkPlan=()=>{
    if(planChecked)return;
    onEvent({type:'interaction',action:'check'});
    emitValue({selectedIds,composition:composition||undefined});
    setPlanChecked(true);
    if(!planValid){
      onEvent({type:'coach',cue:'retry'});
      return;
    }
    onEvent({type:'coach',cue:'milestone'});
    if(!hasCompositionStage){
      setSubmitted(true);
      completeOnce(()=>onEvent({type:'complete',value:{selectedIds}}));
    }
  };

  const updateComposition=(value:string)=>{
    setSubmitted(false);
    setComposition(value);
    setAttemptedComposition(true);
    emitValue({selectedIds,composition:value});
  };

  const submitComposition=()=>{
    if(submitted)return;
    onEvent({type:'interaction',action:'check'});
    emitValue({selectedIds,composition});
    setAttemptedComposition(true);
    if(planChecked&&planValid&&compositionValid){
      setSubmitted(true);
      completeOnce(()=>onEvent({type:'complete',value:{selectedIds,composition}}));
    } else {
      if(!retryAnnounced.current){
        retryAnnounced.current=true;
        onEvent({type:'coach',cue:'retry'});
      }
    }
  };

  const hasPlanError=planChecked&&!planValid;
  const state=currentValid?'complete':hasPlanError?'revision':'building';
  const feedback=!planChecked
    ?'Build your sentence plan, then check it when you are ready.'
    :selectedExtras.length>0
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

  return <section className="card widget-experiment activity-shell reading-activity summary" data-testid="widget-summary-builder" data-state={state} data-current-valid={currentValid?'yes':'no'}>
    <ActivityWorkbench label="Summary builder" visualScrollable visual={<>
    <header>
      <h3>Build a concise summary</h3>
      <p>Read every source sentence. Plan with the main idea and the details that explain it.</p>
    </header>
    <article aria-label="Complete source sentences"><h4>Read these source sentences</h4><ol>{config.sourceSentences.map(sentence=><li key={sentence.id}>{sentence.text}</li>)}</ol></article>
    <div aria-label="Your summary board"><h4>Your selected plan</h4><ol>{selectedIds.map(id=><li key={id}>{sourceById.get(id)?.text}</li>)}</ol>{!selectedIds.length&&<p>No sentences selected yet.</p>}</div>
    </>} revealKey={planChecked&&planValid ? "compose" : "plan"}>
    <fieldset className="summary-source-sentences">
      <legend>Source sentences</legend>
      {config.sourceSentences.map((sentence)=>{
        const selected=selectedIds.includes(sentence.id);
        return <button type="button" key={sentence.id} aria-label={`Toggle ${sentence.text}`} aria-pressed={selected} onClick={()=>emitSelection(
          selected?selectedIds.filter((id)=>id!==sentence.id):selectedIds.concat(sentence.id),
          'toggle-sentence',
        )}>
          <span>{sentence.text}</span>
          <span className="summary-selection-marker" aria-hidden="true">{selected?'● Selected':'○ Not selected'}</span>
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
      <strong className="summary-valid-marker">{currentValid?'Response submitted':planChecked&&planValid?'✓ Plan checked':planChecked?'Try again: revise your plan':'Build your plan'}</strong>
    </div>
    <button type="button" onClick={checkPlan}>Check summary plan</button>
    <p aria-label="Plan feedback">{!planChecked?"Plan not checked yet.":planValid?"Your checked plan includes the main idea and useful supporting details.":feedback}</p>
    {planChecked&&planValid&&hasCompositionStage&&<div className="summary-composition" data-activity-reveal>
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
    {submitted&&<p aria-label="Response feedback">Response submitted within the word range. Reread it yourself to check the meaning against your plan.</p>}
    <p role="status">{currentValid?'Response submitted. Your word count fits; compare your meaning with the source.':feedback}</p>
    </ActivityWorkbench>
  </section>;
}

export default function SummaryBuilder(props:SummaryBuilderProps){
  return <SummaryBuilderBody key={JSON.stringify(props.config)} {...props}/>;
}
