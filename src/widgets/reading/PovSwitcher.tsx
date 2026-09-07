import {useEffect,useState} from 'react';
import {ActivityWorkbench} from '../ActivityWorkbench';
import './guide-led-reading.css';
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
  const [comparison,setComparison]=useState<'same'|'changed'|null>(null);
  const [attemptedApply,setAttemptedApply]=useState(false);
  const {completeOnce}=useCompletionLatch(key);
  useEffect(()=>{
    setSelectedPronouns([]);
    setAppliedText(null);
    setAttemptedApply(false);
    setComparison(null);
  },[key]);
  const inAuthoredOrder=(values:string[])=>config.pronounOptions.filter((option)=>values.includes(option));
  const isReady=(values:string[])=>values.length===config.requiredPronouns.length
    &&config.requiredPronouns.every((required)=>values.includes(required));
  const emitSelection=(values:string[],action:'select-pronoun'|'reset')=>{
    const ordered=inAuthoredOrder(values);
    setSelectedPronouns(ordered);
    setAppliedText(null);
    setAttemptedApply(false);
    setComparison(null);
    onEvent({type:'interaction',action});
    onEvent({type:'change',value:{selectedPronouns:ordered}});
    if(action==='select-pronoun'&&ordered.length===1) onEvent({type:'coach',cue:'strategy'});

  };
  const apply=()=>{
    // Selection changes already clear the rewrite, so an applied text is unchanged.
    if(appliedText!==null)return;
    const ordered=inAuthoredOrder(selectedPronouns);
    const ready=isReady(ordered);
    setAttemptedApply(true);
    setComparison(null);
    onEvent({type:'interaction',action:'apply'});
    onEvent({type:'change',value:{selectedPronouns:ordered}});
    if(!ready){
      setAppliedText(null);
      onEvent({type:'coach',cue:'retry'});
      return;
    }
    const rewrittenText=rewritePassage(config.passage,config.from,config.requiredPronouns);
    setAppliedText(rewrittenText);
    onEvent({type:'coach',cue:'milestone'});
  };
  const compare=(answer:'same'|'changed')=>{
    if(comparison===answer)return;
    onEvent({type:'interaction',action:'compare'});
    onEvent({type:'change',value:{selectedPronouns:inAuthoredOrder(selectedPronouns)}});
    setComparison(answer);
    if(answer==='changed')onEvent({type:'coach',cue:'retry'});
    else if(appliedText)completeOnce(()=>onEvent({type:'complete',value:{rewrittenText:appliedText}}));
  };
  const ready=selectedPronouns.length===config.requiredPronouns.length;
  const currentComplete=appliedText!==null&&comparison==='same';
  const state=currentComplete?'complete':comparison==='changed'||attemptedApply&&!appliedText?'revision':appliedText?'comparing':'choosing';
  const status=currentComplete
    ?'Reread both passages: did the event and meaning stay the same?'
    :comparison==='changed'
      ?'Try again: compare who acted and what happened in both passages.'
    :appliedText
      ?'Rewrite applied. Compare both passages before choosing what changed.'
    :attemptedApply
      ?'Try again: these forms do not fit the target point of view. Reread the source, choose the target forms, and apply.'
      :ready
        ?'Two target forms selected. Apply your rewrite when ready.'
        :selectedPronouns.length
          ?'Selection changed. Choose two target forms, then apply your rewrite.'
          :'Choose two target forms, then apply your rewrite.';

  return <section className="card widget-experiment activity-shell reading-activity pov" data-testid="widget-pov-switcher" data-state={state}>
    <ActivityWorkbench label="Point of view" visualScrollable visual={<>
    <header>
      <h3>Switch the point of view</h3>
      <p>Change {config.from==='third'?'third person to first person':'first person to third person'}.</p>
      <p>This is one text model. Read the complete source, choose the two target forms, and apply them.</p>
    </header>
    <blockquote className="pov-source-passage" data-testid="pov-source-passage">
      <strong>Source passage</strong>
      <span>{config.passage}</span>
    </blockquote>
    {appliedText&&<blockquote className="pov-rewritten-passage" data-testid="pov-rewritten-passage">
      <strong>Rewritten passage</strong>
      <span>{appliedText}</span>
    </blockquote>}
    </>} revealKey={appliedText ? "compare" : "rewrite"}>
    <div className="pov-pronoun-options" aria-label="Target forms">
      {config.pronounOptions.map((pronoun)=>{
        const selected=selectedPronouns.includes(pronoun);
        return <button key={pronoun} aria-label={`Select pronoun ${pronoun}`} aria-pressed={selected} onClick={()=>emitSelection(
          selected?selectedPronouns.filter((value)=>value!==pronoun):selectedPronouns.concat(pronoun),
          'select-pronoun',
        )}>
          <span>{pronoun}</span>
          <span className="pov-selection-marker" aria-hidden="true">{selected?'● Selected':'○ Not selected'}</span>
        </button>;
      })}
    </div>
    <strong className="pov-valid-marker">{currentComplete?'✓ Comparison correct':comparison==='changed'?'Try again':appliedText?'Rewrite applied':attemptedApply?'Try again: revise the forms':'Choose your rewrite forms'}</strong>
    <div className="pov-controls">
      <button aria-label="Apply point of view" onClick={apply}>Apply</button>
      <button onClick={()=>emitSelection([],'reset')}>Start over</button>
    </div>
    {appliedText&&<>
      <p aria-label="Rewrite feedback">Rewrite applied. Both passages remain available for comparison.</p>
      <fieldset className="reading-comparison" data-activity-reveal><legend>What changed between these passages?</legend>
        <button type="button" aria-pressed={comparison==='changed'} data-outcome={comparison==='changed'?'incorrect':undefined} onClick={()=>compare('changed')}>The event changed</button>
        <button type="button" aria-pressed={comparison==='same'} data-outcome={comparison==='same'?'correct':undefined} onClick={()=>compare('same')}>The narrator words changed; the event stayed the same</button>
      </fieldset>
      {comparison&&<p aria-label="Comparison feedback">{comparison==='same'?'Correct: the narrator words changed while the same event remained.':'Try again: compare who acted and what happened in each passage.'}</p>}
    </>}
    <p role="status">{status}</p>
    </ActivityWorkbench>
  </section>;
}

export default function PovSwitcher(props:PovSwitcherProps){
  return <PovSwitcherBody key={JSON.stringify(props.config)} {...props}/>;
}
