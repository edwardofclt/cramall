import {useState} from 'react';
import {ActivityWorkbench} from '../ActivityWorkbench';
import './guide-led-reading.css';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type StoryElementsMapperProps=WidgetProps<'story-elements-mapper'>;
type MapState='mapping'|'revision'|'complete';

const emptyEntries=(fields:readonly string[])=>Object.fromEntries(fields.map((field)=>[field,'']));
const titleCase=(field:string)=>field[0]!.toUpperCase()+field.slice(1);

type ProductionEntries = Record<string,string>;

function StoryElementsMapperBody({config,onEvent}:StoryElementsMapperProps){
  const key=JSON.stringify(config);
  const [entries,setEntries]=useState<Record<string,string>>(()=>emptyEntries(config.fields));

  const [status,setStatus]=useState('Fill in the story map.');
  const [mapState,setMapState]=useState<MapState>('mapping');
  const {completeOnce}=useCompletionLatch(key);


  const production = !!config.source && !!config.choices && !!config.answerChoiceIds;

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

  if (production) {
    const source=config.source!;
    const choices=config.choices!;
    const answers=config.answerChoiceIds!;
    const placedIds=new Set(Object.values(entries).filter(Boolean));
    const productionEntries: ProductionEntries={};
    for (const field of config.fields) {
      const choiceId=entries[field];
      if (choiceId) productionEntries[field]=choiceId;
    }
    const emitProduction=(next:ProductionEntries,action:'change-field'|'check'|'reset')=>{
      onEvent({type:'interaction',action});
      onEvent({type:'change',value:{entries:next}});
    };
    const place=(field:string,choiceId:string)=>{
      const next={...productionEntries,[field]:choiceId};
      for (const otherField of config.fields) {
        if (otherField!==field && next[otherField]===choiceId) delete next[otherField];
      }
      setEntries(next);
      setMapState('mapping');
      setStatus(`${titleCase(field)} placed. Keep tracing the story.`);
      emitProduction(next,'change-field');

    };
    const undo=(field:string)=>{
      const next={...productionEntries};
      delete next[field];
      setEntries(next);
      setMapState('mapping');
      setStatus(`${titleCase(field)} is ready for a new clue.`);
      emitProduction(next,'change-field');
    };
    const checkProduction=()=>{
      emitProduction(productionEntries,'check');
      const wrongField=config.fields.find((field)=>productionEntries[field]!==answers[field]);
      if (!wrongField) {
        setMapState('complete');
        setStatus('Correct: your story elements match the source. Explain how the setting led to the problem and how the choices helped solve it.');
        onEvent({type:'coach',cue:'milestone'});
        completeOnce(()=>onEvent({type:'complete',value:{entries:productionEntries}}));
        return;
      }
      setMapState('revision');
      setStatus(`Try the ${titleCase(wrongField)} field again. Look for a story word that supports it.`);
      onEvent({type:'coach',cue:'retry'});
    };

    return <section className="card widget-experiment activity-shell reading-activity story-map" data-testid="widget-story-elements-mapper" data-state={mapState}>
      <ActivityWorkbench label="Story map" visualScrollable visual={<>
      <header>
        <h3>{config.textTitle}</h3>
        <p>Point each story element to words in the source. You can revise the path anytime.</p>
      </header>
      <article className="story-map-source" data-testid="story-map-source" aria-labelledby="story-map-source-title">
        <h4 id="story-map-source-title">{source.title}</h4>
        <p>{source.text}</p>
      </article>
      <div aria-label="Your story map"><h4>Story connections</h4><ol>{config.fields.map(field=><li key={field}><strong>{titleCase(field)}: </strong>{choices.find(choice=>choice.id===productionEntries[field])?.text??'No clue placed yet.'}</li>)}</ol></div>
      </>}>
      <div className="story-map-path" data-testid="story-map-path">
        <h4>Ordered story path</h4>
        <ol aria-label="Ordered story path">
          {config.fields.map((field)=>{
            const choiceId=productionEntries[field];
            const choice=choices.find((item)=>item.id===choiceId);

            return <li key={field} className="story-map-slot">
              <fieldset aria-label={titleCase(field)}>
                <legend>{titleCase(field)}</legend>
                {choice ? <div className="story-map-placed" data-testid={`story-map-placed-${field}`}>
                  <span>{choice.text}</span>
                  <div className="story-map-slot-controls">
                    <button type="button" onClick={()=>undo(field)}>Undo {titleCase(field)}</button>

                  </div>
                </div> : <div className="story-map-choice-bank" aria-label={`Choices for ${titleCase(field)}`}>
                  {choices.filter((item)=>!placedIds.has(item.id)).map((item)=><button type="button" key={item.id} aria-label={`Place “${item.text}” in ${titleCase(field)}`} onClick={()=>place(field,item.id)}>{item.text}</button>)}
                </div>}
              </fieldset>
            </li>;
          })}
        </ol>
      </div>
      <div className="story-map-controls">
        <button type="button" aria-label="Check story map" onClick={checkProduction}>Check story map</button>
        <button type="button" onClick={reset}>Start over</button>
      </div>
      <p role="status">{status}</p>
      </ActivityWorkbench>
    </section>;
  }

  return <section className="card widget-experiment activity-shell reading-activity story-map" data-testid="widget-story-elements-mapper" data-state={mapState}>
    <ActivityWorkbench label="Story map" visualScrollable visual={<>
    <header>
      <h3>{config.textTitle}</h3>
      <p>Use the story you are reading to organize its important parts.</p>
    </header>
    </>}>
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
    </ActivityWorkbench>
  </section>;
}

export default function StoryElementsMapper(props:StoryElementsMapperProps){
  return <StoryElementsMapperBody key={JSON.stringify(props.config)} {...props}/>;
}
