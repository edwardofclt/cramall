import {useState} from 'react';
import {ActivityWorkbench} from '../ActivityWorkbench';
import './guide-led-reading.css';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type ThemeEvidenceCollectorProps=WidgetProps<'theme-evidence-collector'>;

function ThemeEvidenceCollectorBody({config,onEvent}:ThemeEvidenceCollectorProps){
  const key=JSON.stringify(config);
  const required=config.requiredEvidenceCount??2;
  const [theme,setTheme]=useState<string|null>(null);
  const [evidenceIds,setEvidenceIds]=useState<string[]>([]);
  const [checked,setChecked]=useState(false);
  const {completeOnce}=useCompletionLatch(key);

  const supportsTheme=(nextTheme:string|null,nextIds:readonly string[])=>!!nextTheme
    &&nextIds.every((id)=>config.evidence.find((detail)=>detail.id===id)?.supports.includes(nextTheme)===true);
  const currentSupportsTheme=supportsTheme(theme,evidenceIds);
  const isComplete=checked&&currentSupportsTheme&&evidenceIds.length>=required;
  const state = isComplete?'complete':checked?'revision':'collecting';

  const emit=(nextTheme:string|null,nextIds:readonly string[],action:'choose-theme'|'toggle-evidence'|'reset')=>{
    if(action==='choose-theme'&&nextTheme===theme)return;
    const selected=new Set(nextIds);
    const authoredOrderIds=config.evidence.filter((detail)=>selected.has(detail.id)).map((detail)=>detail.id);
    setChecked(false);
    setTheme(nextTheme);
    setEvidenceIds(authoredOrderIds);
    onEvent({type:'interaction',action});
    onEvent({type:'change',value:{theme:nextTheme,evidenceIds:authoredOrderIds}});
    if (action === 'choose-theme') onEvent({type:'coach',cue:'strategy'});

  };

  const checkEvidence=()=>{
    if(checked)return;
    onEvent({type:'interaction',action:'check'});
    onEvent({type:'change',value:{theme,evidenceIds}});
    setChecked(true);
    if(!theme||evidenceIds.length<required||!currentSupportsTheme){
      onEvent({type:'coach',cue:'retry'});
      return;
    }
    onEvent({type:'coach',cue:'milestone'});
    completeOnce(()=>onEvent({type:'complete',value:{theme,evidenceIds}}));
  };
  const status=!theme
    ?'Choose a theme.'
    :!checked
      ?`Select ${required} supporting details, then check your evidence.`
      :!currentSupportsTheme
        ?'Try again: a selected detail does not support this theme. Compare its source quote with the passage.'
        :evidenceIds.length<required
          ?`Keep building: select at least ${required} supporting details before checking.`
          :'Correct: the selected source details support your theme.';


  return <section className="card widget-experiment activity-shell reading-activity theme-evidence" data-testid="widget-theme-evidence-collector" data-state={state}>
    <ActivityWorkbench label="Theme evidence" visualScrollable visual={<>
    <header>
      <h3>Collect theme evidence</h3>
      <p>Choose a theme, then select details from the source that support it.</p>
    </header>
    {config.source&&<article className="theme-evidence-source" data-testid="theme-evidence-source">
      <h4>{config.source.title}</h4>
      <p>{config.source.text}</p>
    </article>}
    <div aria-label="Your evidence board"><h4>Your proposed theme</h4><p>{theme??'No idea chosen yet.'}</p><ul>{config.evidence.filter(detail=>evidenceIds.includes(detail.id)).map(detail=><li key={detail.id}>{detail.text}</li>)}</ul></div>
    </>}>
    <div className="theme-evidence-choices" aria-label="Theme choices">
      {config.themeChoices.map((choice)=>{
        const selected=theme===choice;
        return <button className="theme-evidence-choice" key={choice} aria-label={`Choose theme ${choice}`} aria-pressed={selected} onClick={()=>emit(choice,evidenceIds,'choose-theme')}>
          <span>{choice}</span><span className="theme-evidence-marker" aria-hidden="true">{selected?'● Selected':'○ Choose'}</span>
        </button>;
      })}
    </div>
    <div className="theme-evidence-choices" aria-label="Evidence details">
      {config.evidence.map((detail)=>{
        const selected=evidenceIds.includes(detail.id);
        return <div className="theme-evidence-card" key={detail.id}>
          <button className="theme-evidence-choice" aria-label={`Toggle evidence ${detail.text}${detail.sourceQuote?`; source quote ${detail.sourceQuote}`:''}`} aria-pressed={selected} onClick={()=>emit(theme,selected?evidenceIds.filter((id)=>id!==detail.id):[...evidenceIds,detail.id],'toggle-evidence')}>
            <span>{detail.text}</span><span className="theme-evidence-marker" aria-hidden="true">{selected?'● Selected':'○ Choose'}</span>
            {detail.sourceQuote&&<span className="theme-evidence-quote">Source: “{detail.sourceQuote}”</span>}
          </button>
          {selected&&<button className="theme-evidence-remove" aria-label={`Remove evidence ${detail.text}`} onClick={()=>emit(theme,evidenceIds.filter((id)=>id!==detail.id),'toggle-evidence')}>Remove evidence</button>}
        </div>;
      })}
    </div>
    <p aria-label="Idea feedback">{theme?`Your proposed theme: ${theme}. Use the source to check it.`:"Choose an idea to test against the source."}</p>
    <button type="button" onClick={checkEvidence}>Check evidence</button>
    <p aria-label="Evidence feedback" data-outcome={isComplete?'correct':checked&&!currentSupportsTheme?'incorrect':'neutral'}>{status}</p>
    <div className="theme-evidence-controls"><button onClick={()=>emit(null,[],'reset')}>Start over</button></div>
    <p role="status">{status}</p>
    </ActivityWorkbench>
  </section>;
}

export default function ThemeEvidenceCollector(props:ThemeEvidenceCollectorProps){
  return <ThemeEvidenceCollectorBody key={JSON.stringify(props.config)} {...props}/>;
}
