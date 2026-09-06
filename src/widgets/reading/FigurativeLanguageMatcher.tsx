import {useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type FigurativeLanguageMatcherProps=WidgetProps<'figurative-language-matcher'>;
const defaultKinds=['simile','metaphor','personification','idiom'] as const;
const ownMatch=(values:Record<string,string>,id:string)=>Object.prototype.hasOwnProperty.call(values,id)?values[id]:undefined;

function FigurativeLanguageMatcherBody({config,onEvent}:FigurativeLanguageMatcherProps){
  const key=JSON.stringify(config);
  const [selectedId,setSelectedId]=useState<string|null>(null);
  const [matches,setMatches]=useState<Record<string,string>>({});
  const [lastMissId,setLastMissId]=useState<string|null>(null);
  const {completeOnce}=useCompletionLatch(key);
  const kinds=config.availableKinds ?? defaultKinds;
  const orderedMatches=(values:Record<string,string>)=>Object.fromEntries(
    config.pairs.flatMap((pair)=>{
      const value=ownMatch(values,pair.id);
      return value===undefined?[]:[[pair.id,value]];
    }),
  );
  const correct=(values:Record<string,string>)=>config.pairs.every((pair)=>ownMatch(values,pair.id)===pair.kind);
  const emit=(values:Record<string,string>,action:'select-phrase'|'match'|'reset')=>{
    const ordered=orderedMatches(values);
    const previousCorrectCount=config.pairs.filter((pair)=>ownMatch(matches,pair.id)===pair.kind).length;
    const nextCorrectCount=config.pairs.filter((pair)=>ownMatch(ordered,pair.id)===pair.kind).length;
    const actedOn=selectedId===null?undefined:config.pairs.find((pair)=>pair.id===selectedId);
    const missId=action==='match'&&actedOn&&ordered[actedOn.id]!==actedOn.kind?actedOn.id:null;
    setMatches(ordered);
    setLastMissId(action==='reset'?null:missId??lastMissId);
    onEvent({type:'interaction',action});
    onEvent({type:'change',value:{matches:ordered}});
    if(action==='select-phrase') onEvent({type:'coach',cue:'strategy'});
    if(action==='match'&&nextCorrectCount>previousCorrectCount&&nextCorrectCount===1) onEvent({type:'coach',cue:'milestone'});
    if(action==='match'&&actedOn&&ordered[actedOn.id]!==actedOn.kind) onEvent({type:'coach',cue:'retry'});
    if(correct(ordered))completeOnce(()=>onEvent({type:'complete',value:{matches:ordered}}));
  };
  const select=(id:string)=>{
    setSelectedId(id);
    emit(matches,'select-phrase');
  };
  const match=(kind:typeof kinds[number])=>{
    if(selectedId===null)return;
    emit({...matches,[selectedId]:kind},'match');
  };
  const reset=()=>{
    setSelectedId(null);
    emit({},'reset');
  };
  const currentComplete=correct(matches);
  const hasWrongMatch=config.pairs.some((pair)=>{
    const value=ownMatch(matches,pair.id);
    return value!==undefined&&value!==pair.kind;
  });
  const state=currentComplete?'complete':Object.keys(matches).length?'revision':'matching';
  const wrongPair=config.pairs.find((pair)=>pair.id===lastMissId&&ownMatch(matches,pair.id)!==undefined&&ownMatch(matches,pair.id)!==pair.kind)
    ??config.pairs.find((pair)=>ownMatch(matches,pair.id)!==undefined&&ownMatch(matches,pair.id)!==pair.kind);
  const status=currentComplete
    ?'Every figurative phrase is matched.'
    :selectedId!==null
      ?wrongPair
        ?`The match for “${wrongPair.phrase}” needs another look. What clue tells you how the phrase works? Reread its meaning and try another type.`
        :'Phrase selected. Choose a language type, then revise any match that needs another look.'
      :hasWrongMatch
        ?`The match for “${wrongPair?.phrase??'this phrase'}” needs another look. Select it and reread its meaning.`
        :'Select a phrase, then choose its language type.';

  return <section className="card widget-experiment figurative" data-testid="widget-figurative-language-matcher" data-state={state}>
    <header>
      <h3>Match figurative language</h3>
      <p>Read each complete phrase and meaning. Match its language type, and revise any choice that needs another look.</p>
    </header>
    <div className="figurative-pairs" aria-label="Figurative phrases and meanings">
      {config.pairs.map((pair)=>{
        const selected=selectedId===pair.id;
        const matchValue=ownMatch(matches,pair.id);
        return <article className="figurative-pair" key={pair.id} data-selected={selected?'yes':'no'}>
          <blockquote>{pair.phrase}</blockquote>
          <p><strong>Meaning:</strong> {pair.meaning}</p>
          <button aria-label={`Select phrase ${pair.phrase}`} aria-pressed={selected} onClick={()=>select(pair.id)}>
            <span>Choose this phrase</span>
            <span className="figurative-selection-marker" aria-hidden="true">{selected?'✓ Selected':'○ Not selected'}</span>
          </button>
          <output aria-label={`Current match for ${pair.phrase}`} data-testid={`figurative-match-${pair.id}`}>{matchValue??''}</output>
        </article>;
      })}
    </div>
    <div className="figurative-kinds" aria-label="Language types">
      {kinds.map((kind)=><button key={kind} aria-label={`Match ${kind}`} disabled={selectedId===null} onClick={()=>match(kind)}>{kind}</button>)}
    </div>
    <strong className="figurative-valid-marker">{currentComplete?'✓ All matched':'○ Needs revision'}</strong>
    <button className="figurative-reset" onClick={reset}>Start over</button>
    <p role="status">{status}</p>
  </section>;
}

export default function FigurativeLanguageMatcher(props:FigurativeLanguageMatcherProps){
  return <FigurativeLanguageMatcherBody key={JSON.stringify(props.config)} {...props}/>;
}
