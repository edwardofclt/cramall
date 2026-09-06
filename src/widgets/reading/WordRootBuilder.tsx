import {useEffect,useRef,useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type WordValue = {parts: string[]; word: string};
type Construction = {prefix: string; suffix: string};
type WordRootBuilderProps = WidgetProps<'word-root-builder'>;

function revisionHint(config: WordRootBuilderProps['config'], prefix: string, suffix: string) {
  const constructions: Construction[] = [];
  for (const target of config.targets) for (const targetPrefix of ['', ...(config.prefixes ?? [])]) for (const targetSuffix of ['', ...(config.suffixes ?? [])]) {
    if (`${targetPrefix}${config.root}${targetSuffix}` === target.word) constructions.push({prefix: targetPrefix,suffix: targetSuffix});
  }
  const prefixCanChange = (config.prefixes?.length ?? 0) > 0;
  const suffixCanChange = (config.suffixes?.length ?? 0) > 0;
  const prefixMatches = constructions.some((construction) => construction.prefix === prefix);
  const suffixMatches = constructions.some((construction) => construction.suffix === suffix);
  if (prefixMatches && !suffixMatches && suffixCanChange) return 'Reconsider the suffix.';
  if (suffixMatches && !prefixMatches && prefixCanChange) return 'Reconsider the prefix.';
  if (prefixCanChange && suffixCanChange) return 'Reconsider both prefix and suffix.';
  if (prefixCanChange) return 'Reconsider the prefix.';
  if (suffixCanChange) return 'Reconsider the suffix.';
  return 'This word is not an authored target word yet.';
}

function WordRootBuilderBody({config,onEvent}: WordRootBuilderProps) {
  const key = JSON.stringify(config);
  const [prefix,setPrefix] = useState('');
  const [suffix,setSuffix] = useState('');
  const [spellingChecked,setSpellingChecked] = useState(false);
  const [meaningChoice,setMeaningChoice] = useState<string | null>(null);
  const [meaningChecked,setMeaningChecked] = useState(false);
  const [status,setStatus] = useState('Snap the parts together, then check the whole word.');
  const strategyAnnounced = useRef(false);
  const {completeOnce} = useCompletionLatch(key);

  useEffect(() => {
    setPrefix('');
    setSuffix('');
    setSpellingChecked(false);
    setMeaningChoice(null);
    setMeaningChecked(false);
    setStatus('Snap the parts together, then check the whole word.');
    strategyAnnounced.current = false;
  }, [key]);

  const value = (nextPrefix = prefix, nextSuffix = suffix): WordValue => {
    const parts = [nextPrefix,config.root,nextSuffix].filter(Boolean);
    return {parts,word: parts.join('')};
  };
  const emit = (next: WordValue, action: 'select-prefix' | 'select-root' | 'select-suffix' | 'check' | 'reset') => {
    onEvent({type: 'interaction',action});
    onEvent({type: 'change',value: next});
  };
  const announceStrategy = () => {
    if (strategyAnnounced.current) return;
    strategyAnnounced.current = true;
    onEvent({type:'coach',cue:'strategy'});
  };
  const revise = (nextPrefix: string, nextSuffix: string, action: 'select-prefix' | 'select-suffix') => {
    setPrefix(nextPrefix);
    setSuffix(nextSuffix);
    setSpellingChecked(false);
    setMeaningChoice(null);
    setMeaningChecked(false);
    setStatus('Snap the parts together, then check the whole word.');
    emit(value(nextPrefix,nextSuffix),action);
    announceStrategy();
  };
  const selectPrefix = (nextPrefix: string) => revise(prefix === nextPrefix ? '' : nextPrefix,suffix,'select-prefix');
  const selectSuffix = (nextSuffix: string) => revise(prefix,suffix === nextSuffix ? '' : nextSuffix,'select-suffix');
  const selectRoot = () => {
    setSpellingChecked(false);
    setMeaningChoice(null);
    setMeaningChecked(false);
    setStatus('The root stays in the middle. Snap on any needed affixes, then check the whole word.');
    emit(value(),'select-root');
  };
  const check = () => {
    const next = value();
    emit(next,'check');
    const target = config.targets.find((candidate) => candidate.word === next.word);
    if (!target) {
      setSpellingChecked(false);
      setMeaningChoice(null);
      setMeaningChecked(false);
      setStatus(`${next.word || 'That combination'} is not an authored target word yet. ${revisionHint(config,prefix,suffix)}`);
      onEvent({type:'coach',cue:'retry'});
      return;
    }
    if (!spellingChecked) {
      setSpellingChecked(true);
      setMeaningChoice(null);
      setMeaningChecked(false);
      setStatus('The spelling fits. Choose the whole-word meaning that best matches, then check it.');
      onEvent({type:'coach',cue:'milestone'});
      return;
    }
    if (!meaningChoice) {
      setStatus('Choose a whole-word meaning before checking your reasoning.');
      onEvent({type:'coach',cue:'retry'});
      return;
    }
    if (meaningChoice !== target.meaning) {
      setStatus('That meaning choice does not fit this word. Reread the word parts and choose again.');
      onEvent({type:'coach',cue:'retry'});
      return;
    }
    setMeaningChecked(true);
    setStatus(`${target.word}: ${target.meaning}`);
    completeOnce(() => onEvent({type: 'complete',value: {word: target.word,meaning: target.meaning}}));
  };
  const reset = () => {
    const next = {parts: [config.root],word: config.root};
    setPrefix('');
    setSuffix('');
    setSpellingChecked(false);
    setMeaningChoice(null);
    setMeaningChecked(false);
    setStatus('Snap the parts together, then check the whole word.');
    strategyAnnounced.current = false;
    emit(next,'reset');
  };
  const removePrefix = () => selectPrefix('');
  const removeSuffix = () => selectSuffix('');
  const removeOnDelete = (event: React.KeyboardEvent<HTMLButtonElement>, remove: () => void) => {
    if (event.key !== 'Backspace' && event.key !== 'Delete') return;
    event.preventDefault();
    remove();
  };
  const assembled = value();
  const state = meaningChecked ? 'complete' : spellingChecked ? 'meaning-check' : 'building';
  const target = config.targets.find((candidate) => candidate.word === assembled.word);
  const meaningOptions = [...new Set(config.targets.map((candidate) => candidate.meaning))];
  const checkLabel = spellingChecked && target ? 'Check whole-word meaning' : 'Check word';

  return <section className="card widget-experiment roots" data-testid="widget-word-root-builder" data-state={state} aria-describedby="word-root-guidance">
    <header>
      <h3>Word-root builder</h3>
      <p id="word-root-guidance">Snap a prefix before the root and a suffix after it. Then reread the whole word to check its meaning.</p>
    </header>
    <div className="word-root-slots" aria-label="Snapped word parts">
      <div className="word-root-slot" data-testid="word-root-slot-prefix" aria-label="Prefix slot">
        <span className="word-root-slot-label">Prefix</span>
        {prefix
          ? <button type="button" className="word-root-tile word-root-tile-snapped" aria-label={`Remove prefix ${prefix}`} onClick={removePrefix} onKeyDown={(event) => removeOnDelete(event,removePrefix)}>{prefix}<span aria-hidden="true"> prefix · remove</span></button>
          : <span className="word-root-slot-empty">No prefix</span>}
      </div>
      <div className="word-root-slot" data-testid="word-root-slot-root" aria-label="Root slot">
        <span className="word-root-slot-label">Root</span>
        <button type="button" className="word-root-tile word-root-tile-snapped" aria-label={`Root tile ${config.root}`} onClick={selectRoot}>{config.root}<span aria-hidden="true"> root</span></button>
      </div>
      <div className="word-root-slot" data-testid="word-root-slot-suffix" aria-label="Suffix slot">
        <span className="word-root-slot-label">Suffix</span>
        {suffix
          ? <button type="button" className="word-root-tile word-root-tile-snapped" aria-label={`Remove suffix ${suffix}`} onClick={removeSuffix} onKeyDown={(event) => removeOnDelete(event,removeSuffix)}>{suffix}<span aria-hidden="true"> suffix · remove</span></button>
          : <span className="word-root-slot-empty">No suffix</span>}
      </div>
    </div>
    <fieldset>
      <legend>Prefix tiles</legend>
      {(config.prefixes ?? []).map((candidate) => <button type="button" className="word-root-tile" key={candidate} aria-label={`Select prefix ${candidate}`} aria-pressed={prefix === candidate} onClick={() => selectPrefix(candidate)}>{candidate}<span aria-hidden="true"> prefix</span></button>)}
      {Object.prototype.hasOwnProperty.call(config,'prefixes') && <button type="button" className="word-root-tile" aria-label="Select no prefix" aria-pressed={prefix === ''} onClick={() => selectPrefix('')}>No prefix</button>}
    </fieldset>
    <fieldset>
      <legend>Root tile</legend>
      <button type="button" className="word-root-tile" aria-label={`Select root ${config.root}`} aria-pressed="true" onClick={selectRoot}>{config.root}<span aria-hidden="true"> root</span></button>
    </fieldset>
    <fieldset>
      <legend>Suffix tiles</legend>
      {(config.suffixes ?? []).map((candidate) => <button type="button" className="word-root-tile" key={candidate} aria-label={`Select suffix ${candidate}`} aria-pressed={suffix === candidate} onClick={() => selectSuffix(candidate)}>{candidate}<span aria-hidden="true"> suffix</span></button>)}
      {Object.prototype.hasOwnProperty.call(config,'suffixes') && <button type="button" className="word-root-tile" aria-label="Select no suffix" aria-pressed={suffix === ''} onClick={() => selectSuffix('')}>No suffix</button>}
    </fieldset>
    <div className="word-root-assembled" aria-label="Assembled word"><strong>Assembled word:</strong> {assembled.word || '—'}</div>
    {spellingChecked && target && <div className="word-root-meaning-check" data-testid="word-root-meaning-check">
      <strong>Whole-word meaning check</strong>
      <fieldset className="word-root-meaning-options">
        <legend>Which meaning fits <strong>{assembled.word}</strong>?</legend>
        {meaningOptions.map((meaning) => <button type="button" key={meaning} className="word-root-meaning-option" aria-label={`Choose whole-word meaning: ${meaning}`} aria-pressed={meaningChoice === meaning} onClick={() => { setMeaningChoice(meaning); setStatus('Meaning choice selected. Check your whole-word reasoning when ready.'); }}>
          <span>{meaning}</span><span className="word-root-meaning-marker" aria-hidden="true">{meaningChoice === meaning ? '✓ Selected' : '○ Choose'}</span>
        </button>)}
      </fieldset>
    </div>}
    <div className="word-root-controls"><button type="button" aria-label={checkLabel} onClick={check}>{checkLabel}</button> <button type="button" onClick={reset}>Start over</button></div>
    <p role="status">{status}</p>
  </section>;
}

export default function WordRootBuilder(props: WordRootBuilderProps) {
  return <WordRootBuilderBody key={JSON.stringify(props.config)} {...props} />;
}
