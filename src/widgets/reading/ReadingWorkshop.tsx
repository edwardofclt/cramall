import { useState } from 'react';
import { ActivityWorkbench } from '../ActivityWorkbench';
import { useCompletionLatch } from '../useCompletionLatch';
import type { WidgetProps } from '../registry';
import { experiences } from './workshop/experiences';
import { SourcePacket } from './workshop/SourcePacket';
import { RehearsalSurface, DeskSurface, LiteralSurface, FormsSurface } from './workshop/ReadingSurfaces';
import { WeatherSurface } from './workshop/WeatherSurface';
import { ChainSurface, InquirySurface, FolderSurface, ClusterSurface, CreditSurface } from './workshop/ResearchSurfaces';
import type { Draft, Field } from './workshop/types';
import './workshop/workshop.css';

type Props=WidgetProps<'reading-workshop'>;
type RecordEntry={message:string;stale:boolean};
function FieldControl({field,value,onChange}:{field:Field;value:string|string[]|undefined;onChange:(value:string|string[])=>void}) {
 if(field.kind==='text')return <label>{field.label}<input data-testid={`field-${field.id}`} value={String(value??'')} onChange={e=>onChange(e.target.value)}/></label>;
 if(field.kind==='select')return <label>{field.label}<select data-testid={`field-${field.id}`} value={String(value??'')} onChange={e=>onChange(e.target.value)}><option value="">Choose…</option>{field.options.map(o=><option key={o.id} value={o.id}>{o.text}</option>)}</select>{String(value??'')&&<p className="rw-selected-copy">Chosen: {field.options.find(o=>o.id===value)?.text}</p>}</label>;
 return <fieldset data-testid={`field-${field.id}`} className="rw-pin-field"><legend>{field.label}{field.kind==='multi'?' — mark two phrases':''}</legend>{field.options.map(o=>{
 const selected=Array.isArray(value)?value.includes(o.id):value===o.id;
 return <button type="button" key={o.id} data-option={o.id} aria-label={`Pin ${field.label}: ${o.text}`} aria-pressed={selected} onClick={()=>onChange(field.kind==='multi'?(selected?(Array.isArray(value)?value:[]).filter(v=>v!==o.id):[...(Array.isArray(value)?value:[]),o.id]):selected?'':o.id)}>{selected?'Pinned: ':''}{o.text}</button>;
 })}</fieldset>;
}
function Attempt({config,onEvent,reset}:{config:Props['config'];onEvent:Props['onEvent'];reset:()=>void}) {
 const experience=experiences[config.activity];
 const [drafts,setDrafts]=useState<Draft[]>(()=>experience.phases.map(p=>Object.fromEntries(p.fields.filter(f=>f.initial).map(f=>[f.id,f.initial!]))));
 const [current,setCurrent]=useState(0);
 const [valid,setValid]=useState<boolean[]>(()=>experience.phases.map(()=>false));
 const [attempted,setAttempted]=useState<boolean[]>(()=>experience.phases.map(()=>false));
 const [records,setRecords]=useState<RecordEntry[][]>(()=>experience.phases.map(()=>[]));
 const [latest,setLatest]=useState('');
 const completion=useCompletionLatch(config.activity);
 const phase=experience.phases[current];const finished=valid.every(Boolean);
 const change=(id:string,value:string|string[])=>{
  setDrafts(previous=>previous.map((draft,i)=>i===current?{...draft,[id]:value}:draft));
  setValid(previous=>previous.map((v,i)=>i>=current?false:v));
  setAttempted(previous=>previous.map((v,i)=>i>=current?false:v));
  setRecords(previous=>previous.map((entries,i)=>i>=current?entries.map(e=>({...e,stale:true})):entries));
  setLatest('Draft changed. Check this connection and any later records again.');
  onEvent({type:'interaction',action:'act'});
  onEvent({type:'change',value:{phase:phase.title}});
 };
 const check=()=>{
  if(valid[current])return;
  const correct=valid.slice(0,current).every(Boolean)&&phase.valid(drafts[current],drafts);
  const message=correct?`Connected. ${phase.success}`:phase.retry.startsWith('Revisit')?phase.retry:`Revisit this connection. ${phase.retry}`;
  setRecords(previous=>previous.map((entries,i)=>i===current?[...entries,{message,stale:false}]:entries));
  setAttempted(previous=>previous.map((v,i)=>i===current?true:v));
  setValid(previous=>previous.map((v,i)=>i===current?correct:v));
  setLatest(message);
  onEvent({type:'interaction',action:current===experience.phases.length-1?'explain':'check'});
  if(correct&&current===experience.phases.length-1){completion.completeOnce(()=>onEvent({type:'complete',value:{activity:config.activity}}));}
  else onEvent({type:'coach',cue:correct?'milestone':'retry'});
 };
 const surfaceProps={activity:config.activity,experience,drafts,valid,attempted};
 const surfaces={rehearsal:RehearsalSurface,desk:DeskSurface,weather:WeatherSurface,chains:ChainSurface,forms:FormsSurface,literal:LiteralSurface,inquiry:InquirySurface,folder:FolderSurface,clusters:ClusterSurface,credit:CreditSurface};
 const Surface=surfaces[experience.surface];
 return <section className="reading-workshop activity-shell" data-testid="widget-reading-workshop" data-activity={config.activity} aria-label="Reading workshop">
  <ActivityWorkbench label="Reading workshop" visualScrollable revealKey={current} visual={<><SourcePacket {...surfaceProps}/><Surface {...surfaceProps}/></>}>
   <p className="rw-step">Task {current+1} of {experience.phases.length} · {phase.title}</p>
   <fieldset className="rw-task" aria-label={`Current task: ${phase.title}`} data-activity-reveal><legend>{phase.title}</legend><p>{phase.instruction}</p>{phase.fields.map(field=><FieldControl key={field.id} field={field} value={drafts[current]?.[field.id]} onChange={value=>change(field.id,value)}/>)}<button type="button" onClick={check}>Check this connection</button>{valid[current]&&current<experience.phases.length-1&&<button type="button" onClick={()=>{setCurrent(current+1);onEvent({type:'interaction',action:'plan'});}}>Continue building</button>}</fieldset>
   <div className="rw-announcement" role="status" aria-label="Latest connection feedback">{latest}</div>
   {records.map((entries,i)=>entries.length>0&&<section className="rw-record" aria-label={`Task ${i+1} feedback`} key={i}><h4>Task {i+1}: {experience.phases[i].title}</h4><p className="rw-record-state">{valid[i]?'Current connected record':entries.some(e=>e.stale)?'Draft changed — check again':'Needs another look'}</p>{entries.map((entry,j)=><p key={j}>{entry.stale?'Earlier draft: ':''}{entry.message}</p>)}{i!==current&&<button type="button" disabled={!valid.slice(0,i).every(Boolean)} onClick={()=>{setCurrent(i);onEvent({type:'interaction',action:'replay'});}}>Reopen task {i+1}</button>}</section>)}
   <p role="status" aria-label="Activity completion">{finished?'Practice complete. Your source-linked records and reasoning are retained.':completion.completed?'This draft has changed. Recheck the affected connections before calling it complete.':'Build every connection and the final explanation to finish this practice.'}</p>
   <button type="button" onClick={()=>{onEvent({type:'interaction',action:'reset'});reset();}}>Reset workshop</button>
  </ActivityWorkbench>
 </section>;
}
export default function ReadingWorkshop(props:Props) {
 const [attempt,setAttempt]=useState(0);
 return <Attempt key={`${props.config.activity}:${attempt}`} {...props} reset={()=>setAttempt(n=>n+1)}/>;
}
