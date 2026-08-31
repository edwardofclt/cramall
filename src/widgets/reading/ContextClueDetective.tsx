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
  const [status,setStatus]=useState(`Find the clue for ${config.targetWord}.`);
  const {completeOnce}=useCompletionLatch(key);
  const correct = choice === config.correctChoiceId;
  const state = choice === null ? 'ready' : correct ? 'complete' : 'incorrect';

  const choose=(id:string)=>{
    setChoice(id);
    onEvent({type:'interaction',action:'choose-clue'});
    onEvent({type:'change',value:{choiceId:id}});
    if(id===config.correctChoiceId){
      setStatus('That clue explains the target word in this passage.');
      completeOnce(()=>onEvent({type:'complete',value:{choiceId:id}}));
    }else{
      setStatus('That is not the best clue yet. Reread how the clue connects to the target word in the passage.');
    }
  };
  const reset=()=>{
    setChoice(null);
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
      {config.clueChoices.map((clue)=><button key={clue.id} aria-label={`Choose ${clue.type} clue: ${clue.text}`} aria-pressed={choice===clue.id} onClick={()=>choose(clue.id)}>
        <strong>{clue.type[0].toUpperCase()+clue.type.slice(1)}</strong>
        <span>{clue.text}</span>
        {choice===clue.id&&<span className="context-clue-selected">Selected</span>}
      </button>)}
    </fieldset>
    <button className="context-clue-reset" onClick={reset}>Start over</button>
    <p role="status">{status}</p>
  </section>;
}

export default function ContextClueDetective(props:ContextClueDetectiveProps){
  return <ContextClueDetectiveBody key={JSON.stringify(props.config)} {...props}/>;
}
