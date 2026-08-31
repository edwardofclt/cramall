import {useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type StoryElementsMapperProps=WidgetProps<'story-elements-mapper'>;
type MapState='mapping'|'revision'|'complete';

const titleCase=(field:string)=>field[0]!.toUpperCase()+field.slice(1);
const emptyEntries=(fields:readonly string[])=>Object.fromEntries(fields.map((field)=>[field,'']));

function StoryElementsMapperBody({config,onEvent}:StoryElementsMapperProps){
  const key=JSON.stringify(config);
  const [entries,setEntries]=useState<Record<string,string>>(()=>emptyEntries(config.fields));
  const [status,setStatus]=useState('Fill in the story map.');
  const [mapState,setMapState]=useState<MapState>('mapping');
  const {completeOnce}=useCompletionLatch(key);

  const emitChange=(next:Record<string,string>,action:'change-field'|'check'|'reset')=>{
    onEvent({type:'interaction',action});
    onEvent({type:'change',value:{entries:next}});
  };

  const changeField=(field:string,value:string)=>{
    const next={...entries,[field]:value};
    setEntries(next);
    setMapState('mapping');
    setStatus('Story map changed. Check it when you are ready.');
    emitChange(next,'change-field');
  };

  const check=()=>{
    emitChange(entries,'check');
    const fieldsToRevise=config.fields.filter((field)=>entries[field].trim()!==config.answers[field].trim());
    if(fieldsToRevise.length===0){
      setMapState('complete');
      setStatus('Story map complete.');
      completeOnce(()=>onEvent({type:'complete',value:{entries}}));
      return;
    }
    const labels=fieldsToRevise.map(titleCase);
    const joined=labels.length===1?labels[0]:`${labels.slice(0,-1).join(', ')} and ${labels[labels.length-1]}`;
    setMapState('revision');
    setStatus(`Revise these story-map fields: ${joined}.`);
  };

  const reset=()=>{
    const next=emptyEntries(config.fields);
    setEntries(next);
    setMapState('mapping');
    setStatus('Fill in the story map.');
    emitChange(next,'reset');
  };

  return <section className="card widget-experiment story-map" data-testid="widget-story-elements-mapper" data-state={mapState}>
    <header>
      <h3>{config.textTitle}</h3>
      <p>Use the story you are reading to organize its important parts.</p>
    </header>
    <div className="story-map-fields">
      {config.fields.map((field)=>{
        const label=titleCase(field);
        return <label key={field}>{label}<input aria-label={label} value={entries[field]} onChange={(event)=>changeField(field,event.target.value)}/></label>;
      })}
    </div>
    <div className="story-map-controls">
      <button aria-label="Check story map" onClick={check}>Check story map</button>
      <button onClick={reset}>Start over</button>
    </div>
    <p role="status">{status}</p>
  </section>;
}

export default function StoryElementsMapper(props:StoryElementsMapperProps){
  return <StoryElementsMapperBody key={JSON.stringify(props.config)} {...props}/>;
}
