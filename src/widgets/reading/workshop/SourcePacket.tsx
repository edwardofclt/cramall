import { Fragment, type ReactNode } from 'react';
import { readingSources } from './sources';
import type { Activity, Draft, Experience } from './types';
export function selectedQuotes(experience:Experience,drafts:Draft[]) {
 return [...new Set(experience.phases.flatMap((phase,i)=>phase.fields.flatMap(field=>{
  const value=drafts[i]?.[field.id];return [...(value&&field.excerpt?[field.excerpt]:[]),...field.options.filter(o=>o.quote&&(Array.isArray(value)?value.includes(o.id):value===o.id)).map(o=>o.quote!)];
 })))].sort((a,b)=>b.length-a.length);
}
function highlighted(text:string,quotes:string[]): ReactNode {
 const quote=quotes.find(q=>text.includes(q));if(!quote)return text;
 const index=text.indexOf(quote);const remaining=quotes.filter(q=>q!==quote);
 return <>{highlighted(text.slice(0,index),remaining)}<mark>{quote}</mark>{highlighted(text.slice(index+quote.length),quotes)}</>;
}
export function SourcePacket({activity,experience,drafts}:{activity:Activity;experience:Experience;drafts:Draft[]}) {
 const source=readingSources[activity];return <section className="rw-source" role="region" aria-label="Complete source packet"><h3>{source.title}</h3><div className="rw-source-prose">{highlighted(source.text,selectedQuotes(experience,drafts))}</div></section>;
}
export function Value({experience,drafts,phase,id}:{experience:Experience;drafts:Draft[];phase:number;id:string}) {
 const field=experience.phases[phase]?.fields.find(f=>f.id===id);const value=drafts[phase]?.[id];
 const ids=Array.isArray(value)?value:value?[value]:[];
 return <>{ids.length?ids.map((key,i)=><Fragment key={key}>{i>0?' + ':''}{field?.options.find(o=>o.id===key)?.text??key}</Fragment>):<span className="rw-unplaced">Choose a connection</span>}</>;
}
