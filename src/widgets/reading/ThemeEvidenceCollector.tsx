import {useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type ThemeEvidenceCollectorProps=WidgetProps<'theme-evidence-collector'>;
type ThemeEvidenceState='collecting'|'revision'|'complete';

function ThemeEvidenceCollectorBody({config,onEvent}:ThemeEvidenceCollectorProps){
  const key=JSON.stringify(config);
  const required=config.requiredEvidenceCount??2;
  const [theme,setTheme]=useState<string|null>(null);
  const [evidenceIds,setEvidenceIds]=useState<string[]>([]);
  const {completeOnce}=useCompletionLatch(key);

  const supportsTheme=(nextTheme:string|null,nextIds:readonly string[])=>!!nextTheme
    &&nextIds.every((id)=>config.evidence.find((detail)=>detail.id===id)?.supports.includes(nextTheme)===true);
  const currentSupportsTheme=supportsTheme(theme,evidenceIds);
  const isComplete=currentSupportsTheme&&evidenceIds.length>=required;
  const state:ThemeEvidenceState=!theme||evidenceIds.length===0
    ?'collecting'
    :!currentSupportsTheme
      ?'revision'
      :isComplete?'complete':'collecting';

  const emit=(nextTheme:string|null,nextIds:readonly string[],action:'choose-theme'|'toggle-evidence'|'reset')=>{
    const selected=new Set(nextIds);
    const authoredOrderIds=config.evidence.filter((detail)=>selected.has(detail.id)).map((detail)=>detail.id);
    setTheme(nextTheme);
    setEvidenceIds(authoredOrderIds);
    onEvent({type:'interaction',action});
    onEvent({type:'change',value:{theme:nextTheme,evidenceIds:authoredOrderIds}});
    if (action === 'choose-theme') onEvent({type:'coach',cue:'strategy'});
    if (action === 'toggle-evidence' && nextTheme && !supportsTheme(nextTheme,authoredOrderIds)) onEvent({type:'coach',cue:'retry'});
    if (action === 'toggle-evidence' && nextTheme && authoredOrderIds.length === 1 && supportsTheme(nextTheme,authoredOrderIds)) onEvent({type:'coach',cue:'milestone'});
    if(nextTheme&&authoredOrderIds.length>=required&&supportsTheme(nextTheme,authoredOrderIds)){
      completeOnce(()=>onEvent({type:'complete',value:{theme:nextTheme,evidenceIds:authoredOrderIds}}));
    }
  };

  const status=!theme
    ?'Choose a theme.'
    :evidenceIds.length===0
      ?`Select ${required} evidence details for this theme.`
      :!currentSupportsTheme
        ?'Some selected evidence does not support this theme. Revise your choices.'
        :evidenceIds.length<required
          ?`${evidenceIds.length} of ${required} evidence details selected.`
          :'Theme supported.';

  return <section className="card widget-experiment theme-evidence" data-testid="widget-theme-evidence-collector" data-state={state}>
    <header>
      <h3>Collect theme evidence</h3>
      <p>Choose a theme, then select details from the source that support it.</p>
    </header>
    {config.source&&<article className="theme-evidence-source" data-testid="theme-evidence-source">
      <h4>{config.source.title}</h4>
      <p>{config.source.text}</p>
    </article>}
    <div className="theme-evidence-choices" aria-label="Theme choices">
      {config.themeChoices.map((choice)=>{
        const selected=theme===choice;
        return <button className="theme-evidence-choice" key={choice} aria-label={`Choose theme ${choice}`} aria-pressed={selected} onClick={()=>emit(choice,evidenceIds,'choose-theme')}>
          <span>{choice}</span><span className="theme-evidence-marker" aria-hidden="true">{selected?'✓ Selected':'○ Choose'}</span>
        </button>;
      })}
    </div>
    <div className="theme-evidence-choices" aria-label="Evidence details">
      {config.evidence.map((detail)=>{
        const selected=evidenceIds.includes(detail.id);
        return <div className="theme-evidence-card" key={detail.id} data-supports-theme={theme&&detail.supports.includes(theme)?'true':'false'}>
          <button className="theme-evidence-choice" aria-label={`Toggle evidence ${detail.text}${detail.sourceQuote?`; source quote ${detail.sourceQuote}`:''}`} aria-pressed={selected} onClick={()=>emit(theme,selected?evidenceIds.filter((id)=>id!==detail.id):[...evidenceIds,detail.id],'toggle-evidence')}>
            <span>{detail.text}</span><span className="theme-evidence-marker" aria-hidden="true">{selected?'✓ Selected':'○ Choose'}</span>
            {detail.sourceQuote&&<span className="theme-evidence-quote">Source: “{detail.sourceQuote}”</span>}
          </button>
          {selected&&<button className="theme-evidence-remove" aria-label={`Remove evidence ${detail.text}`} onClick={()=>emit(theme,evidenceIds.filter((id)=>id!==detail.id),'toggle-evidence')}>Remove evidence</button>}
        </div>;
      })}
    </div>
    <div className="theme-evidence-controls"><button onClick={()=>emit(null,[],'reset')}>Start over</button></div>
    <p role="status">{status}</p>
  </section>;
}

export default function ThemeEvidenceCollector(props:ThemeEvidenceCollectorProps){
  return <ThemeEvidenceCollectorBody key={JSON.stringify(props.config)} {...props}/>;
}
