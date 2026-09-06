import {useState} from 'react';
import {findContextClueTargetRange} from '../../content/schema';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type ContextClueDetectiveProps = WidgetProps<'context-clue-detective'>;

function markedPassage(passage: string,targetWord: string) {
  const range = findContextClueTargetRange(passage,targetWord);
  if (!range) return passage;
  const {start,end} = range;
  return <>{passage.slice(0,start)}<mark>{passage.slice(start,end)}</mark>{passage.slice(end)}</>;
}

function ContextClueDetectiveBody({config,onEvent}: ContextClueDetectiveProps) {
  const key=JSON.stringify(config);
  const [choice,setChoice]=useState<string|null>(null);
  const [clueType,setClueType]=useState<string|null>(null);
  const [status,setStatus]=useState(`Find the clue for ${config.targetWord}.`);
  const {completeOnce}=useCompletionLatch(key);
  const selectedClue=config.clueChoices.find((clue)=>clue.id===choice);
  const correct = choice === config.correctChoiceId && clueType === selectedClue?.type;
  const state = choice === null ? 'ready' : correct ? 'complete' : clueType === null ? 'ready' : 'incorrect';

  const choose=(id:string)=>{
    setChoice(id);
    setClueType(null);
    onEvent({type:'interaction',action:'choose-clue'});
    onEvent({type:'change',value:{choiceId:id}});
    onEvent({type:'coach',cue:'strategy'});
    setStatus('Now name the kind of clue. Use the passage, not a guess.');
  };
  const chooseType=(type:string)=>{
    setClueType(type);
    onEvent({type:'interaction',action:'choose-clue'});
    onEvent({type:'change',value:{choiceId:choice}});
    if(choice===config.correctChoiceId && type===selectedClue?.type){
      setStatus('That clue and clue kind fit the target word in this passage.');
      onEvent({type:'coach',cue:'milestone'});
      completeOnce(()=>onEvent({type:'complete',value:{choiceId:choice}}));
    }else if(choice!==config.correctChoiceId && type===selectedClue?.type){
      onEvent({type:'coach',cue:'retry'});
      setStatus('That clue type fits those words, but the clue does not explain the target word. Reread the passage and try again.');
    }else{
      onEvent({type:'coach',cue:'retry'});
      setStatus('That clue kind does not match those words. Reread the passage and try again.');
    }
  };
  const reset=()=>{
    setChoice(null);
    setClueType(null);
    setStatus(`Find the clue for ${config.targetWord}.`);
    onEvent({type:'interaction',action:'reset'});
    onEvent({type:'change',value:{choiceId:null}});
  };

  return <section className="card widget-experiment clues" data-testid="widget-context-clue-detective" data-state={state}>
    <header>
      <h3>Context-clue detective</h3>
      <p>Read the complete passage. Then choose the clue that best explains the marked target word.</p>
    </header>
    <blockquote className="context-clue-passage" data-testid="context-clue-passage">{markedPassage(config.passage,config.targetWord)}</blockquote>
    <fieldset className="context-clue-choices">
      <legend>Which clue best explains <strong>{config.targetWord}</strong>?</legend>
      {config.clueChoices.map((clue)=><button key={clue.id} aria-label={`Choose clue text: ${clue.text}`} aria-pressed={choice===clue.id} onClick={()=>choose(clue.id)}>
        <span>{clue.text}</span>
        {choice===clue.id&&<span className="context-clue-selected">Selected</span>}
      </button>)}
    </fieldset>
    {selectedClue&&<fieldset className="context-clue-types">
      <legend>What kind of clue is <strong>“{selectedClue.text}”</strong>?</legend>
      {[...new Set(config.clueChoices.map((clue)=>clue.type))].map((type)=><button key={type} type="button" aria-label={`Choose ${type} clue type`} aria-pressed={clueType===type} onClick={()=>chooseType(type)}>
        <span>{type[0].toUpperCase()+type.slice(1)}</span>
        {clueType===type&&<span className="context-clue-selected">Selected</span>}
      </button>)}
    </fieldset>}
    <button className="context-clue-reset" onClick={reset}>Start over</button>
    <p role="status">{status}</p>
  </section>;
}

export default function ContextClueDetective(props:ContextClueDetectiveProps){
  return <ContextClueDetectiveBody key={JSON.stringify(props.config)} {...props}/>;
}
