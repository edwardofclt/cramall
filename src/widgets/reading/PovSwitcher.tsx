import {useEffect,useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type PovSwitcherProps=WidgetProps<'pov-switcher'>;

function escapeRegExp(value:string){return value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
const unicodeWord='\\p{L}\\p{M}\\p{N}_';
const firstSubjectPattern=()=>new RegExp(`(?<![${unicodeWord}])I(?![${unicodeWord}])`,'gu');
const firstPossessivePattern=()=>new RegExp(`(?<![${unicodeWord}])my(?![${unicodeWord}])`,'giu');

export function rewritePassage(
  passage:string,
  from:'first'|'third',
  [subject,possessive]:[string,string],
){
  if(from==='first'){
    if(new RegExp(`(?<![${unicodeWord}])I[\u2019'][\\p{L}\\p{M}]+`,'u').test(passage))return passage;
    return passage.replace(firstPossessivePattern(),possessive).replace(firstSubjectPattern(),subject);
  }
  const name=passage.match(/^(\p{Lu}[\p{Ll}\p{M}]*)(?![\p{L}\p{M}\p{N}_])/u)?.[1];
  if(!name)return passage;
  const escaped=escapeRegExp(name);
  const subjectPattern=new RegExp(`(?<![${unicodeWord}])${escaped}(?![\u2019']s)(?![${unicodeWord}])`,'gu');
  const possessivePattern=new RegExp(`(?<![${unicodeWord}])${escaped}[\u2019']s(?![${unicodeWord}])`,'gu');
  if((passage.match(subjectPattern)?.length??0)!==1||(passage.match(possessivePattern)?.length??0)!==1){
    return passage;
  }
  return passage.replace(possessivePattern,possessive).replace(subjectPattern,subject);
}

function PovSwitcherBody({config,onEvent}:PovSwitcherProps){
  const key=JSON.stringify(config);
  const [selectedPronouns,setSelectedPronouns]=useState<string[]>([]);
  const [appliedText,setAppliedText]=useState<string|null>(null);
  const [attemptedApply,setAttemptedApply]=useState(false);
  const {completeOnce}=useCompletionLatch(key);
  useEffect(()=>{
    setSelectedPronouns([]);
    setAppliedText(null);
    setAttemptedApply(false);
  },[key]);
  const inAuthoredOrder=(values:string[])=>config.pronounOptions.filter((option)=>values.includes(option));
  const isReady=(values:string[])=>values.length===config.requiredPronouns.length
    &&config.requiredPronouns.every((required)=>values.includes(required));
  const emitSelection=(values:string[],action:'select-pronoun'|'reset')=>{
    const ordered=inAuthoredOrder(values);
    setSelectedPronouns(ordered);
    setAppliedText(null);
    setAttemptedApply(false);
    onEvent({type:'interaction',action});
    onEvent({type:'change',value:{selectedPronouns:ordered}});
  };
  const apply=()=>{
    const ordered=inAuthoredOrder(selectedPronouns);
    const ready=isReady(ordered);
    setAttemptedApply(true);
    onEvent({type:'interaction',action:'apply'});
    onEvent({type:'change',value:{selectedPronouns:ordered}});
    if(!ready){
      setAppliedText(null);
      return;
    }
    const rewrittenText=rewritePassage(config.passage,config.from,config.requiredPronouns);
    setAppliedText(rewrittenText);
    completeOnce(()=>onEvent({type:'complete',value:{rewrittenText}}));
  };
  const ready=isReady(selectedPronouns);
  const currentComplete=ready&&appliedText!==null;
  const state=currentComplete?'complete':selectedPronouns.length?'revision':'choosing';
  const status=currentComplete
    ?appliedText
    :attemptedApply
      ?'Choose two target forms, then apply your rewrite.'
      :ready
        ?'Two target forms selected. Apply your rewrite when ready.'
        :selectedPronouns.length
          ?'Selection changed. Choose two target forms, then apply your rewrite.'
          :'Choose two target forms, then apply your rewrite.';

  return <section className="card widget-experiment pov" data-testid="widget-pov-switcher" data-state={state} data-current-ready={ready?'yes':'no'}>
    <header>
      <h3>Switch the point of view</h3>
      <p>This is one text model. Read the complete source, choose the two target forms, and apply them.</p>
    </header>
    <blockquote className="pov-source-passage" data-testid="pov-source-passage">
      <strong>Source passage</strong>
      <span>{config.passage}</span>
    </blockquote>
    <div className="pov-pronoun-options" aria-label="Target forms">
      {config.pronounOptions.map((pronoun)=>{
        const selected=selectedPronouns.includes(pronoun);
        return <button key={pronoun} aria-label={`Select pronoun ${pronoun}`} aria-pressed={selected} onClick={()=>emitSelection(
          selected?selectedPronouns.filter((value)=>value!==pronoun):selectedPronouns.concat(pronoun),
          'select-pronoun',
        )}>
          <span>{pronoun}</span>
          <span className="pov-selection-marker" aria-hidden="true">{selected?'✓ Selected':'○ Not selected'}</span>
        </button>;
      })}
    </div>
    <strong className="pov-valid-marker">{currentComplete?'✓ Rewrite applied':'○ Needs revision'}</strong>
    <div className="pov-controls">
      <button aria-label="Apply point of view" onClick={apply}>Apply</button>
      <button onClick={()=>emitSelection([],'reset')}>Start over</button>
    </div>
    <p role="status">{status}</p>
  </section>;
}

export default function PovSwitcher(props:PovSwitcherProps){
  return <PovSwitcherBody key={JSON.stringify(props.config)} {...props}/>;
}
