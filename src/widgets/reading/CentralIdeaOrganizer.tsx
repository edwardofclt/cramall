import {useState} from 'react';
import {ActivityWorkbench} from '../ActivityWorkbench';
import './guide-led-reading.css';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type CentralIdeaOrganizerProps=WidgetProps<'central-idea-organizer'>;

function CentralIdeaOrganizerBody({config,onEvent}:CentralIdeaOrganizerProps){
  const key=JSON.stringify(config);
  const required=config.requiredDetailCount??2;
  const [mainIdea,setMainIdea]=useState<string|null>(null);
  const [detailIds,setDetailIds]=useState<string[]>([]);
  const [checked,setChecked]=useState(false);
  const {completeOnce}=useCompletionLatch(key);

  const supportsMainIdea=(idea:string|null,ids:readonly string[])=>!!idea
    &&ids.every((id)=>{const detail=config.details.find((candidate)=>candidate.id===id);return !!detail&&!detail.sourceContradictsDetail&&detail.supports.includes(idea);});
  const hasContradictedDetail=config.details.some(detail=>detail.sourceContradictsDetail&&detailIds.includes(detail.id));
  const currentSupports=supportsMainIdea(mainIdea,detailIds);
  const isComplete=checked&&currentSupports&&detailIds.length>=required;
  const state = isComplete?'complete':checked?'revision':'organizing';

  const emit=(nextIdea:string|null,nextIds:readonly string[],action:'choose-main-idea'|'toggle-detail'|'reset')=>{
    if(action==='choose-main-idea'&&nextIdea===mainIdea)return;
    const selected=new Set(nextIds);
    const authoredOrderIds=config.details.filter((detail)=>selected.has(detail.id)).map((detail)=>detail.id);
    setChecked(false);
    setMainIdea(nextIdea);
    setDetailIds(authoredOrderIds);
    onEvent({type:'interaction',action});
    onEvent({type:'change',value:{mainIdea:nextIdea,detailIds:authoredOrderIds}});
    if (action === 'choose-main-idea') onEvent({type:'coach',cue:'strategy'});

  };

  const checkEvidence=()=>{
    if(checked)return;
    onEvent({type:'interaction',action:'check'});
    onEvent({type:'change',value:{mainIdea,detailIds}});
    setChecked(true);
    if(!mainIdea||detailIds.length<required||!currentSupports){
      onEvent({type:'coach',cue:'retry'});
      return;
    }
    onEvent({type:'coach',cue:'milestone'});
    completeOnce(()=>onEvent({type:'complete',value:{mainIdea,detailIds}}));
  };
  const status=!mainIdea
    ?'Choose a main idea.'
    :!checked
      ?`Select ${required} supporting details, then check your evidence.`
      :hasContradictedDetail
        ?'Try again: the source quote contradicts a selected detail. Reread the quoted words and revise that detail or your idea.'
      :!currentSupports
        ?'Try again: a selected detail does not support this main idea. Compare its source quote with the passage.'
        :detailIds.length<required
          ?`Keep building: select at least ${required} supporting details before checking.`
          :'Correct: the selected source details support your main idea.';


  return <section className="card widget-experiment activity-shell reading-activity central" data-testid="widget-central-idea-organizer" data-state={state}>
    <ActivityWorkbench label="Central idea" visualScrollable visual={<>
    <header>
      <h3>Organize the central idea</h3>
      <p>Choose the main idea, then select details from the source that support it.</p>
    </header>
    {config.source&&<article className="central-idea-source" data-testid="central-idea-source">
      <h4>{config.source.title}</h4>
      <p>{config.source.text}</p>
    </article>}
    <div aria-label="Your evidence board"><h4>Your proposed main idea</h4><p>{mainIdea??'No idea chosen yet.'}</p><ul>{config.details.filter(detail=>detailIds.includes(detail.id)).map(detail=><li key={detail.id}>{detail.text}</li>)}</ul></div>
    </>}>
    <div className="central-idea-choices" aria-label="Main idea choices">
      {config.mainIdeaChoices.map((idea)=>{
        const selected=mainIdea===idea;
        return <button className="central-idea-choice" key={idea} aria-label={`Choose main idea ${idea}`} aria-pressed={selected} onClick={()=>emit(idea,detailIds,'choose-main-idea')}>
          <span>{idea}</span><span className="central-idea-marker" aria-hidden="true">{selected?'● Selected':'○ Choose'}</span>
        </button>;
      })}
    </div>
    <div className="central-idea-choices" aria-label="Supporting details">
      {config.details.map((detail)=>{
        const selected=detailIds.includes(detail.id);
        return <div className="central-idea-card" key={detail.id}>
          <button className="central-idea-choice" aria-label={`Toggle detail ${detail.text}${detail.sourceQuote?`; source quote ${detail.sourceQuote}`:''}`} aria-pressed={selected} onClick={()=>emit(mainIdea,selected?detailIds.filter((id)=>id!==detail.id):[...detailIds,detail.id],'toggle-detail')}>
            <span>{detail.text}</span><span className="central-idea-marker" aria-hidden="true">{selected?'● Selected':'○ Choose'}</span>
            {detail.sourceQuote&&<span className="central-idea-quote">Source: “{detail.sourceQuote}”</span>}
          </button>
          {selected&&<button className="central-idea-remove" aria-label={`Remove detail ${detail.text}`} onClick={()=>emit(mainIdea,detailIds.filter((id)=>id!==detail.id),'toggle-detail')}>Remove detail</button>}
        </div>;
      })}
    </div>
    <p aria-label="Idea feedback">{mainIdea?`Your proposed main idea: ${mainIdea}. Use the source to check it.`:"Choose an idea to test against the source."}</p>
    <button type="button" onClick={checkEvidence}>Check evidence</button>
    <p aria-label="Evidence feedback" data-outcome={isComplete?'correct':checked&&!currentSupports?'incorrect':'neutral'}>{status}</p>
    <div className="central-idea-controls"><button onClick={()=>emit(null,[],'reset')}>Start over</button></div>
    <p role="status">{status}</p>
    </ActivityWorkbench>
  </section>;
}

export default function CentralIdeaOrganizer(props:CentralIdeaOrganizerProps){
  return <CentralIdeaOrganizerBody key={JSON.stringify(props.config)} {...props}/>;
}
