import {useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type SourceCredibilityCheckerProps=WidgetProps<'source-credibility-checker'>;
type Rating='credible'|'needs-checking';
type Source=SourceCredibilityCheckerProps['config']['sources'][number];
type CredibilityState='rating'|'revision'|'complete';

const ownRating=(ratings:Record<string,Rating>,id:string)=>Object.prototype.hasOwnProperty.call(ratings,id)?ratings[id]:undefined;
const missingCriteria=(source:Source,criteria:SourceCredibilityCheckerProps['config']['criteria'])=>criteria.filter((criterion)=>
  criterion==='author'?source.author===undefined
    :criterion==='evidence'?source.claims.length===0
      :criterion==='date'?source.date===undefined
        :source.purpose===undefined,
);

function SourceCredibilityCheckerBody({config,onEvent}:SourceCredibilityCheckerProps){
  const key=JSON.stringify(config);
  const [ratings,setRatings]=useState<Record<string,Rating>>({});
  const [status,setStatus]=useState('Rate every source.');
  const [viewState,setViewState]=useState<CredibilityState>('rating');
  const {completeOnce}=useCompletionLatch(key);
  const orderedRatings=(values:Record<string,Rating>)=>Object.fromEntries(
    config.sources.flatMap((source)=>{
      const rating=ownRating(values,source.id);
      return rating===undefined?[]:[[source.id,rating]];
    }),
  ) as Record<string,Rating>;
  const expectedRating=(source:Source):Rating=>config.credibleIds.includes(source.id)?'credible':'needs-checking';
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
    const omissions=[...new Set(wrong.flatMap((source)=>missingCriteria(source,config.criteria)))];
    if(!allRated(ordered)){
      setViewState('revision');
      setStatus(omissions.length>0
        ?`Rate every source before checking. Recheck the ${omissions.join(' and ')} criteria for the rated sources that need revision.`
        :'Rate every source before checking.');
      return;
    }
    if(wrong.length===0){
      setViewState('complete');
      setStatus('Every source rating is supported by the selected criteria.');
      completeOnce(()=>onEvent({type:'complete',value:{ratings:ordered}}));
      return;
    }
    setViewState('revision');
    setStatus(omissions.length>0
      ?`Recheck the ${omissions.join(' and ')} criteria for the sources that need revision.`
      :'Some ratings need revision. Compare each supplied record with every selected criterion.');
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
    <p className="credibility-criteria"><strong>Criteria for this check:</strong> {config.criteria.join(', ')}</p>
    <div className="credibility-sources">
      {config.sources.map((source)=>{
        const rating=ownRating(ratings,source.id);
        return <article className="credibility-source" aria-label={`Source: ${source.title}`} key={source.id}>
          <h4>{source.title}</h4>
          <dl>
            <div><dt>{'Author: '}</dt><dd>{source.author??'Missing'}</dd></div>
            <div><dt>{'Date: '}</dt><dd>{source.date??'Missing'}</dd></div>
            <div><dt>{'Publisher: '}</dt><dd>{source.publisher??'Missing'}</dd></div>
            <div><dt>{'Purpose: '}</dt><dd>{source.purpose??'Missing'}</dd></div>
          </dl>
          <div className="credibility-claims">
            <strong>Claims:</strong>
            {source.claims.length>0?<ul>{source.claims.map((claim)=><li key={claim}>{claim}</li>)}</ul>:<span> Missing</span>}
          </div>
          <div className="credibility-ratings" aria-label={`Ratings for ${source.title}`}>
            {(['credible','needs-checking'] as const).map((choice)=>{
              const selected=rating===choice;
              const label=choice==='credible'?'credible':'needs checking';
              return <button key={choice} aria-label={`Rate ${source.title} ${label}`} aria-pressed={selected} onClick={()=>rate(source.id,choice)}>
                <span>{choice==='credible'?'Credible':'Needs checking'}</span>
                <span className="credibility-selection-marker" aria-hidden="true">{selected?'✓ Selected':'○ Not selected'}</span>
              </button>;
            })}
          </div>
        </article>;
      })}
    </div>
    <strong className="credibility-valid-marker">{viewState==='complete'?'✓ Ratings supported':'○ Check the evidence'}</strong>
    <div className="credibility-controls">
      <button aria-label="Check sources" onClick={check}>Check</button>
      <button onClick={reset}>Start over</button>
    </div>
    <p role="status">{status}</p>
  </section>;
}

export default function SourceCredibilityChecker(props:SourceCredibilityCheckerProps){
  return <SourceCredibilityCheckerBody key={JSON.stringify(props.config)} {...props}/>;
}
