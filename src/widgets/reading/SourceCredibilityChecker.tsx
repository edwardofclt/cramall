import {useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type SourceCredibilityCheckerProps=WidgetProps<'source-credibility-checker'>;
type Rating='credible'|'needs-checking';
type ReasonedRating='credible-for-question'|'needs-checking';
type Source=SourceCredibilityCheckerProps['config']['sources'][number];
type CredibilityState='rating'|'revision'|'complete';
type ReasonedSource=Source & {judgments:NonNullable<Source['judgments']>};

const ownRating=(ratings:Record<string,Rating>,id:string)=>Object.prototype.hasOwnProperty.call(ratings,id)?ratings[id]:undefined;
const missingCriteria=(source:Source,criteria:NonNullable<SourceCredibilityCheckerProps['config']['criteria']>)=>criteria.filter((criterion)=>
  criterion==='author'?source.author===undefined
    :criterion==='evidence'?(source.claims?.length??0)===0
      :criterion==='date'?source.date===undefined
        :source.purpose===undefined,
);

function ReasonedSourceCredibility({config,onEvent}:SourceCredibilityCheckerProps){
  const key=JSON.stringify(config);
  const sources=config.sources.filter((source):source is ReasonedSource=>Array.isArray(source.judgments));
  const required=config.requiredReasonCount??1;
  const answers=config.answers??{};
  const [ratings,setRatings]=useState<Record<string,ReasonedRating>>({});
  const [selectedReasons,setSelectedReasons]=useState<Record<string,string[]>>({});
  const [viewState,setViewState]=useState<CredibilityState>('rating');
  const [status,setStatus]=useState('Choose a judgment for every source, then support each choice with reason stamps.');
  const {completeOnce}=useCompletionLatch(key);

  const orderedRatings=(values:Record<string,ReasonedRating>)=>Object.fromEntries(
    sources.flatMap((source)=>values[source.id]===undefined?[]:[[source.id,values[source.id]]]),
  ) as Record<string,ReasonedRating>;
  const orderedReasons=(values:Record<string,string[]>)=>Object.fromEntries(
    sources.flatMap((source)=>{
      const ids=new Set(values[source.id]??[]);
      const ordered=source.judgments.filter((judgment)=>ids.has(judgment.criterion)).map((judgment)=>judgment.criterion);
      return ordered.length>0?[[source.id,ordered]]:[];
    }),
  ) as Record<string,string[]>;
  const expectedStrength=(rating:ReasonedRating)=>rating==='credible-for-question'?'supports':'concern';
  const allRated=(values:Record<string,ReasonedRating>)=>sources.every((source)=>values[source.id]!==undefined);
  const sourceReasonsValid=(source:ReasonedSource,values:Record<string,ReasonedRating>,reasons:Record<string,string[]>)=>{
    const rating=values[source.id];
    if(rating===undefined) return false;
    const ids=new Set(reasons[source.id]??[]);
    const strength=expectedStrength(rating);
    return ids.size>=required && [...ids].every((id)=>source.judgments.some((judgment)=>judgment.criterion===id&&judgment.strength===strength));
  };
  const wrongSources=(values:Record<string,ReasonedRating>,reasons:Record<string,string[]>)=>sources.filter((source)=>
    values[source.id]!==answers[source.id]||!sourceReasonsValid(source,values,reasons),
  );
  const emitChange=(nextRatings:Record<string,ReasonedRating>,nextReasons:Record<string,string[]>,action:'rate-source'|'select-reason'|'check'|'reset')=>{
    const ratingsInOrder=orderedRatings(nextRatings);
    const reasonsInOrder=orderedReasons(nextReasons);
    setRatings(ratingsInOrder);
    setSelectedReasons(reasonsInOrder);
    onEvent({type:'interaction',action});
    onEvent({type:'change',value:{ratings:ratingsInOrder,reasons:reasonsInOrder}});
    return {ratings:ratingsInOrder,reasons:reasonsInOrder};
  };
  const rate=(sourceId:string,rating:ReasonedRating)=>{
    emitChange({...ratings,[sourceId]:rating},selectedReasons,'rate-source');
    setViewState('revision');
    onEvent({type:'coach',cue:'strategy'});
    setStatus('Judgment saved. Select reason stamps that support it.');
  };
  const toggleReason=(source:ReasonedSource,criterion:string)=>{
    const current=selectedReasons[source.id]??[];
    const next=current.includes(criterion)?current.filter((id)=>id!==criterion):[...current,criterion];
    emitChange(ratings,{...selectedReasons,[source.id]:next},'select-reason');
    setViewState('revision');
    if(next.length===1) onEvent({type:'coach',cue:'milestone'});
    setStatus(`${next.length} reason stamp${next.length===1?'':'s'} selected for ${source.title}.`);
  };
  const check=()=>{
    const emitted=emitChange(ratings,selectedReasons,'check');
    if(!allRated(emitted.ratings)){
      setViewState('revision');
      setStatus('Choose a judgment for every source before checking.');
      return;
    }
    const wrong=wrongSources(emitted.ratings,emitted.reasons);
    if(wrong.length===0){
      setViewState('complete');
      setStatus('Strong work: you compared why one source fits this question and why another needs checking.');
      completeOnce(()=>onEvent({type:'complete',value:{ratings:emitted.ratings,reasons:emitted.reasons}}));
      return;
    }
    const source=wrong[0]!;
    const rating=emitted.ratings[source.id];
    const ids=new Set(emitted.reasons[source.id]??[]);
    const strength=rating===undefined?'supports':expectedStrength(rating);
    const weak=source.judgments.find((judgment)=>!ids.has(judgment.criterion)||judgment.strength!==strength);
    setViewState('revision');
    onEvent({type:'coach',cue:'retry'});
    setStatus(weak===undefined
      ?`Recheck “${source.title}”: compare one criterion with the question.`
      :`Recheck “${source.title}”: look closely at ${weak.criterion}.`);
  };
  const reset=()=>{
    emitChange({}, {}, 'reset');
    setViewState('rating');
    setStatus('Choose a judgment for every source, then support each choice with reason stamps.');
  };

  return <section className="card widget-experiment credibility" data-testid="widget-source-credibility-checker" data-state={viewState}>
    <header>
      <h3>Build a source credibility case</h3>
      <p>Question: <strong>{config.question}</strong></p>
      <p>Credibility depends on the question and the evidence—not a badge or a famous-sounding name.</p>
      <p>These are practice records supplied by this lesson. This model does not browse or verify real sources.</p>
    </header>
    <div className="credibility-sources">
      {sources.map((source)=>{
        const rating=ratings[source.id];
        const selected=selectedReasons[source.id]??[];
        return <fieldset className="credibility-source" key={source.id} aria-label={`Source: ${source.title}`}>
          <legend>{source.title}</legend>
          <dl>
            <div><dt>Author expertise:</dt><dd>{source.author??'Not supplied'}</dd></div>
            <div><dt>Publisher/accountability:</dt><dd>{source.publisher??'Not supplied'}</dd></div>
            <div><dt>Date relevance:</dt><dd>{source.date??'Not supplied'}</dd></div>
            <div><dt>Purpose:</dt><dd>{source.purpose??'Not supplied'}</dd></div>
          </dl>
          <div className="credibility-claims"><strong>Evidence and citations:</strong>{source.claims&&source.claims.length>0?<ul>{source.claims.map((claim)=><li key={claim}>{claim}</li>)}</ul>:<span> No checkable evidence supplied.</span>}</div>
          <div className="credibility-judgments" aria-label={`Reasons for ${source.title}`}>
            <strong>Reason stamps</strong>
            {source.judgments.map((judgment)=><button className={`credibility-reason credibility-reason-${judgment.strength}`} type="button" key={judgment.criterion} aria-pressed={selected.includes(judgment.criterion)} aria-label={`Select reason for ${source.title}: ${judgment.reason}`} onClick={()=>toggleReason(source,judgment.criterion)}>
              <span>{judgment.strength==='supports'?'Supports':'Concern'} · {judgment.criterion}</span>
              <span>{judgment.reason}</span>
              <span className="credibility-selection-marker" aria-hidden="true">{selected.includes(judgment.criterion)?'✓ Selected':'○ Choose'}</span>
            </button>)}
          </div>
          <div className="credibility-ratings" aria-label={`Judgment for ${source.title}`}>
            {(['credible-for-question','needs-checking'] as const).map((choice)=>{
              const selectedRating=rating===choice;
              const label=choice==='credible-for-question'?'credible for this question':'needs more checking';
              return <button type="button" key={choice} aria-label={`Rate ${source.title} ${label}`} aria-pressed={selectedRating} onClick={()=>rate(source.id,choice)}>
                <span>{choice==='credible-for-question'?'Credible for this question':'Needs more checking'}</span>
                <span className="credibility-selection-marker" aria-hidden="true">{selectedRating?'✓ Selected':'○ Not selected'}</span>
              </button>;
            })}
          </div>
          <p className="credibility-reason-progress">{selected.length} of {required} reason stamps selected.</p>
        </fieldset>;
      })}
    </div>
    <strong className="credibility-valid-marker">{viewState==='complete'?'✓ Case supported':'○ Build and check your case'}</strong>
    <div className="credibility-controls">
      <button type="button" aria-label="Check source judgments" onClick={check}>Check source judgments</button>
      <button type="button" onClick={reset}>Start over</button>
    </div>
    <p role="status" aria-live="polite">{status}</p>
  </section>;
}

function LegacySourceCredibility({config,onEvent}:SourceCredibilityCheckerProps){
  const key=JSON.stringify(config);
  const [ratings,setRatings]=useState<Record<string,Rating>>({});
  const [status,setStatus]=useState('Rate every source.');
  const [viewState,setViewState]=useState<CredibilityState>('rating');
  const {completeOnce}=useCompletionLatch(key);
  const criteria=config.criteria??[];
  const orderedRatings=(values:Record<string,Rating>)=>Object.fromEntries(
    config.sources.flatMap((source)=>{
      const rating=ownRating(values,source.id);
      return rating===undefined?[]:[[source.id,rating]];
    }),
  ) as Record<string,Rating>;
  const expectedRating=(source:Source):Rating=>config.credibleIds?.includes(source.id)?'credible':'needs-checking';
  const allRated=(values:Record<string,Rating>)=>config.sources.every((source)=>ownRating(values,source.id)!==undefined);
  const wrongSources=(values:Record<string,Rating>)=>config.sources.filter((source)=>ownRating(values,source.id)!==expectedRating(source));
  const emit=(values:Record<string,Rating>,action:'rate-source'|'check'|'reset')=>{
    const ordered=orderedRatings(values);
    setRatings(ordered);
    onEvent({type:'interaction',action});
    onEvent({type:'change',value:{ratings:ordered}});
    return ordered;
  };
  const rate=(sourceId:string,rating:Rating)=>{
    emit({...ratings,[sourceId]:rating},'rate-source');
    setViewState('revision');
    setStatus('Rating saved. Rate every source, then check your evidence decisions.');
  };
  const check=()=>{
    const ordered=emit(ratings,'check');
    const wrong=wrongSources(ordered).filter((source)=>ownRating(ordered,source.id)!==undefined);
    const hintedSource=wrong.find((source)=>missingCriteria(source,criteria).length>0);
    const hintedCriteria=hintedSource===undefined?[]:missingCriteria(hintedSource,criteria);
    const hint=hintedSource===undefined?'':`Recheck “${hintedSource.title}”: ${hintedCriteria.join(' and ')}.`;
    if(!allRated(ordered)){
      setViewState('revision');
      setStatus(hint.length>0?`Rate every source before checking. ${hint}`:'Rate every source before checking.');
      return;
    }
    if(wrong.length===0){
      setViewState('complete');
      setStatus('Every source rating is supported by the selected criteria.');
      completeOnce(()=>onEvent({type:'complete',value:{ratings:ordered}}));
      return;
    }
    setViewState('revision');
    setStatus(hint.length>0?hint:'Some ratings need revision. Compare each supplied record with every selected criterion.');
  };
  const reset=()=>{
    emit({},'reset');
    setViewState('rating');
    setStatus('Rate every source.');
  };
  return <section className="card widget-experiment credibility" data-testid="widget-source-credibility-checker" data-state={viewState}>
    <header>
      <h3>Check source credibility</h3>
      <p>Use only the supplied author, evidence, date, and purpose records. Polished design, popularity, or a domain name alone does not establish credibility.</p>
      <p>These are practice records supplied by this lesson. This model does not browse or verify real sources.</p>
    </header>
    <p className="credibility-criteria"><strong>Criteria for this check:</strong> {criteria.join(', ')}</p>
    <div className="credibility-sources">
      {config.sources.map((source)=>{
        const rating=ownRating(ratings,source.id);
        return <article className="credibility-source" aria-label={`Source: ${source.title}`} key={source.id}>
          <h4>{source.title}</h4>
          <dl>
            <div><dt>Author: </dt><dd>{source.author??'Missing'}</dd></div>
            <div><dt>Date: </dt><dd>{source.date??'Missing'}</dd></div>
            <div><dt>Publisher: </dt><dd>{source.publisher??'Missing'}</dd></div>
            <div><dt>Purpose: </dt><dd>{source.purpose??'Missing'}</dd></div>
          </dl>
          <div className="credibility-claims"><strong>Claims:</strong>{source.claims&&source.claims.length>0?<ul>{source.claims.map((claim)=><li key={claim}>{claim}</li>)}</ul>:<span> Missing</span>}</div>
          <div className="credibility-ratings" aria-label={`Ratings for ${source.title}`}>
            {(['credible','needs-checking'] as const).map((choice)=>{
              const selected=rating===choice;
              const label=choice==='credible'?'credible':'needs checking';
              return <button type="button" key={choice} aria-label={`Rate ${source.title} ${label}`} aria-pressed={selected} onClick={()=>rate(source.id,choice)}>
                <span>{choice==='credible'?'Credible':'Needs checking'}</span>
                <span className="credibility-selection-marker" aria-hidden="true">{selected?'✓ Selected':'○ Not selected'}</span>
              </button>;
            })}
          </div>
        </article>;
      })}
    </div>
    <strong className="credibility-valid-marker">{viewState==='complete'?'✓ Ratings supported':'○ Check the evidence'}</strong>
    <div className="credibility-controls"><button type="button" aria-label="Check sources" onClick={check}>Check</button><button type="button" onClick={reset}>Start over</button></div>
    <p role="status" aria-live="polite">{status}</p>
  </section>;
}

export default function SourceCredibilityChecker(props:SourceCredibilityCheckerProps){
  const productionMode=props.config.question!==undefined||props.config.requiredReasonCount!==undefined||props.config.answers!==undefined||props.config.sources.some((source)=>source.judgments!==undefined);
  return productionMode
    ?<ReasonedSourceCredibility key={JSON.stringify(props.config)} {...props}/>
    :<LegacySourceCredibility key={JSON.stringify(props.config)} {...props}/>;
}
