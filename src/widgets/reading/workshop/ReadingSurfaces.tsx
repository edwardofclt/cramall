import { useState } from 'react';
import { readingSources } from './sources';
import { Value } from './SourcePacket';
import type { Activity, Draft, Experience } from './types';
export type SurfaceProps={activity:Activity;experience:Experience;drafts:Draft[];valid:boolean[];attempted:boolean[]};
function status(valid:boolean) {return valid?'Connected record':'Draft — needs a check';}
export function RehearsalSurface(props:SurfaceProps) {
 const {experience,drafts,valid}=props;
 const lines:Record<string,string>={question:'“You found my kite?”',excited:'“I found it!”',relief:'“At last,”'};
 return <section aria-label="Annotated reading plans" className="rw-board"><h3>My reading markings</h3><p>Visual voice plans. Optional read-aloud may not perform these markings.</p>{[0,1].map(i=>{
 const d=drafts[i]??{};const text=lines[String(d.line)];const word=String(d.emphasis??'');const index=word?text?.toLowerCase().indexOf(word):-1;
 return <article key={i}><h4>Reading {i+1} · {status(!!valid[i])}</h4>{text?<blockquote>{index!==undefined&&index>=0?<>{text.slice(0,index)}{d.pause==='inside'&&<span className="rw-pause-mark" aria-label="brief pause"> | </span>}<strong>{text.slice(index,index+word.length)}</strong>{text.slice(index+word.length)}</>:text}{d.pause==='end'&&<span className="rw-pause-mark" aria-label="end pause"> | </span>}</blockquote>:<p>Choose a line to begin its annotation.</p>}<p>Pause: <Value {...props} phase={i} id="pause"/></p><p>Voice: <Value {...props} phase={i} id="tone"/></p><p>Text clue: <Value experience={experience} drafts={drafts} phase={i} id="clue"/></p></article>;
 })}</section>;
}
export function DeskSurface(props:SurfaceProps) {
 const [view,setView]=useState('page');const {drafts,valid}=props;
 return <section aria-label="Word notebook" className="rw-board"><h3>Local reference desk</h3><div className="rw-controls"><button type="button" aria-pressed={view==='page'} onClick={()=>setView('page')}>Page view</button><button type="button" aria-pressed={view==='search'} onClick={()=>setView('search')}>Search view</button></div><p>{view==='search'?'Search view of the same local packet. No online search.':'Page view of the same local packet.'}</p><div className={view==='page'?'rw-entry-page':'rw-entry-search'}><p><b>bank</b> /bangk/, noun. 1. a business that keeps and lends money. 2. land along a river or stream.</p><p><b>brackish</b>, adjective — slightly salty, as where fresh water and seawater mix.</p></div>{[0,1].map(i=><article key={i}><h4>{i===0?'bank':'brackish'} · {status(!!valid[i])}</h4><p>{i===0?'We rested on the ':'Near the coast, the creek water became '}<mark>{drafts[i]?.definition?<Value {...props} phase={i} id="definition"/>:'[choose a meaning]'}</mark>{i===0?' beside the creek.':'.'}</p><p>Reference: <Value {...props} phase={i} id="reference"/></p><p>Context: <Value {...props} phase={i} id="context"/></p></article>)}</section>;
}
export function LiteralSurface(props:SurfaceProps) {
 const {drafts,attempted,valid}=props;let copy=readingSources['literal-and-vivid'].text;
 if(attempted[0]&&drafts[0]?.literal==='nervous')copy=copy.replace("a swarm of butterflies filled Noah's stomach",'Noah felt nervous');
 if(attempted[1]&&drafts[1]?.literal==='sound')copy=copy.replace('the whistle sliced through the silence','the whistle suddenly interrupted the quiet');
 return <section className="rw-board" aria-label="Literal comparison copy"><h3>Separate comparison copy</h3>{attempted.some(Boolean)?<p>{copy}</p>:<p>Commit a substitution to compare it here with the unchanged original.</p>}{[0,1].map(i=><article key={i}><h4>{i===0?'Butterflies':'Whistle'} · {status(!!valid[i])}</h4><p>Literal: <Value {...props} phase={i} id="literal"/></p><p>Context → Effect</p><blockquote><Value {...props} phase={i} id="context"/></blockquote><p><Value {...props} phase={i} id="effect"/></p></article>)}</section>;
}
export function FormsSurface(props:SurfaceProps) {
 const d=props.drafts;const text=readingSources['one-moment-three-forms'].text;
 const narrative=text.split('Narrative\n\n')[1]?.split('\n\nOne-scene drama')[0]??'';
 const drama=text.split('One-scene drama\n\n')[1]?.split('\n\nFree-verse poem')[0]??'';
 const poem=text.split('Free-verse poem\n\n')[1]??'';
 const pair=String(d[2]?.pair??'narrative-drama').split('-');const texts:Record<string,string>={narrative,drama,poem};
 return <section className="rw-board" aria-label="Form alignment"><h3>The return, aligned</h3><div className="rw-form-row">{['narrative','drama','poem'].map(id=><article key={id}><h4>{id}</h4><Value {...props} phase={0} id={id}/></article>)}</div><div className="rw-form-pair" aria-label="Two forms side by side">{pair.map(id=><article key={id}><h4>{id}</h4><div className="rw-source-prose">{texts[id]}</div></article>)}</div><div className="rw-marker-board">{props.experience.phases[1].fields.filter(f=>d[1]?.[f.id]).map(f=><p key={f.id}><b>{f.label}</b> → <Value {...props} phase={1} id={f.id}/></p>)}</div></section>;
}
