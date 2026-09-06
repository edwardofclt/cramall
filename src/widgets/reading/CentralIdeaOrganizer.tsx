import {useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type CentralIdeaOrganizerProps=WidgetProps<'central-idea-organizer'>;
type CentralIdeaState='organizing'|'revision'|'complete';

function CentralIdeaOrganizerBody({config,onEvent}:CentralIdeaOrganizerProps){
  const key=JSON.stringify(config);
  const required=config.requiredDetailCount??2;
  const [mainIdea,setMainIdea]=useState<string|null>(null);
  const [detailIds,setDetailIds]=useState<string[]>([]);
  const {completeOnce}=useCompletionLatch(key);

  const supportsMainIdea=(idea:string|null,ids:readonly string[])=>!!idea
    &&ids.every((id)=>config.details.find((detail)=>detail.id===id)?.supports.includes(idea)===true);
  const currentSupports=supportsMainIdea(mainIdea,detailIds);
  const isComplete=currentSupports&&detailIds.length>=required;
  const state:CentralIdeaState=!mainIdea||detailIds.length===0
    ?'organizing'
    :!currentSupports
      ?'revision'
      :isComplete?'complete':'organizing';

  const emit=(nextIdea:string|null,nextIds:readonly string[],action:'choose-main-idea'|'toggle-detail'|'reset')=>{
    const selected=new Set(nextIds);
    const authoredOrderIds=config.details.filter((detail)=>selected.has(detail.id)).map((detail)=>detail.id);
    setMainIdea(nextIdea);
    setDetailIds(authoredOrderIds);
    onEvent({type:'interaction',action});
    onEvent({type:'change',value:{mainIdea:nextIdea,detailIds:authoredOrderIds}});
    if(nextIdea&&authoredOrderIds.length>=required&&supportsMainIdea(nextIdea,authoredOrderIds)){
      completeOnce(()=>onEvent({type:'complete',value:{mainIdea:nextIdea,detailIds:authoredOrderIds}}));
    }
  };

  const status=!mainIdea
    ?'Choose a main idea.'
    :detailIds.length===0
      ?`Select ${required} supporting details for this main idea.`
      :!currentSupports
        ?'A selected detail does not support this main idea. Revise your choices.'
        :detailIds.length<required
          ?`${detailIds.length} of ${required} supporting details selected.`
          :'Central idea supported.';

  return <section className="card widget-experiment central" data-testid="widget-central-idea-organizer" data-state={state}>
    <header>
      <h3>Organize the central idea</h3>
      <p>Choose the main idea, then select details from the source that support it.</p>
    </header>
    {config.source&&<article className="central-idea-source" data-testid="central-idea-source">
      <h4>{config.source.title}</h4>
      <p>{config.source.text}</p>
    </article>}
    <div className="central-idea-choices" aria-label="Main idea choices">
      {config.mainIdeaChoices.map((idea)=>{
        const selected=mainIdea===idea;
        return <button className="central-idea-choice" key={idea} aria-label={`Choose main idea ${idea}`} aria-pressed={selected} onClick={()=>emit(idea,detailIds,'choose-main-idea')}>
          <span>{idea}</span><span className="central-idea-marker" aria-hidden="true">{selected?'✓ Selected':'○ Choose'}</span>
        </button>;
      })}
    </div>
    <div className="central-idea-choices" aria-label="Supporting details">
      {config.details.map((detail)=>{
        const selected=detailIds.includes(detail.id);
        return <div className="central-idea-card" key={detail.id} data-supports-idea={mainIdea&&detail.supports.includes(mainIdea)?'true':'false'}>
          <button className="central-idea-choice" aria-label={`Toggle detail ${detail.text}${detail.sourceQuote?`; source quote ${detail.sourceQuote}`:''}`} aria-pressed={selected} onClick={()=>emit(mainIdea,selected?detailIds.filter((id)=>id!==detail.id):[...detailIds,detail.id],'toggle-detail')}>
            <span>{detail.text}</span><span className="central-idea-marker" aria-hidden="true">{selected?'✓ Selected':'○ Choose'}</span>
            {detail.sourceQuote&&<span className="central-idea-quote">Source: “{detail.sourceQuote}”</span>}
          </button>
          {selected&&<button className="central-idea-remove" aria-label={`Remove detail ${detail.text}`} onClick={()=>emit(mainIdea,detailIds.filter((id)=>id!==detail.id),'toggle-detail')}>Remove detail</button>}
        </div>;
      })}
    </div>
    <div className="central-idea-controls"><button onClick={()=>emit(null,[],'reset')}>Start over</button></div>
    <p role="status">{status}</p>
  </section>;
}

export default function CentralIdeaOrganizer(props:CentralIdeaOrganizerProps){
  return <CentralIdeaOrganizerBody key={JSON.stringify(props.config)} {...props}/>;
}
