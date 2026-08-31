import {useEffect,useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

type WordValue = {parts: string[]; word: string};
type WordRootBuilderProps = WidgetProps<'word-root-builder'>;

function WordRootBuilderBody({config,onEvent}: WordRootBuilderProps) {
  const key = JSON.stringify(config);
  const [prefix,setPrefix] = useState('');
  const [suffix,setSuffix] = useState('');
  const [checkedTarget,setCheckedTarget] = useState<string | null>(null);
  const [status,setStatus] = useState('Choose word parts, then check the word.');
  const {completeOnce} = useCompletionLatch(key);

  useEffect(() => {
    setPrefix('');
    setSuffix('');
    setCheckedTarget(null);
    setStatus('Choose word parts, then check the word.');
  }, [key]);

  const value = (nextPrefix = prefix, nextSuffix = suffix): WordValue => {
    const parts = [nextPrefix,config.root,nextSuffix].filter(Boolean);
    return {parts,word: parts.join('')};
  };
  const emit = (next: WordValue, action: 'select-prefix' | 'select-root' | 'select-suffix' | 'check' | 'reset') => {
    onEvent({type: 'interaction',action});
    onEvent({type: 'change',value: next});
  };
  const selectPrefix = (nextPrefix: string) => {
    setPrefix(nextPrefix);
    setCheckedTarget(null);
    setStatus('Choose word parts, then check the word.');
    emit(value(nextPrefix,suffix),'select-prefix');
  };
  const selectSuffix = (nextSuffix: string) => {
    setSuffix(nextSuffix);
    setCheckedTarget(null);
    setStatus('Choose word parts, then check the word.');
    emit(value(prefix,nextSuffix),'select-suffix');
  };
  const selectRoot = () => {
    setCheckedTarget(null);
    setStatus('The root stays in the middle. Choose any needed affixes, then check the word.');
    emit(value(),'select-root');
  };
  const check = () => {
    const next = value();
    emit(next,'check');
    const target = config.targets.find((candidate) => candidate.word === next.word);
    if (!target) {
      setCheckedTarget(null);
      setStatus(`${next.word} is not an authored target word yet. Reconsider the prefix or suffix.`);
      return;
    }
    setCheckedTarget(target.word);
    setStatus(`${target.word}: ${target.meaning}`);
    completeOnce(() => onEvent({type: 'complete',value: {word: target.word,meaning: target.meaning}}));
  };
  const reset = () => {
    const next = {parts: [config.root],word: config.root};
    setPrefix('');
    setSuffix('');
    setCheckedTarget(null);
    setStatus('Choose word parts, then check the word.');
    emit(next,'reset');
  };

  return <section className="card widget-experiment roots" data-testid="widget-word-root-builder" data-state={checkedTarget ? 'complete' : 'building'} aria-describedby="word-root-guidance">
    <header>
      <h3>Word-root builder</h3>
      <p id="word-root-guidance">Put a prefix before the root and a suffix after it. You can choose no prefix or no suffix when a word needs none.</p>
    </header>
    <fieldset>
      <legend>Prefix</legend>
      {(config.prefixes ?? []).map((candidate) => <button key={candidate} aria-label={`Select prefix ${candidate}`} aria-pressed={prefix === candidate} onClick={() => selectPrefix(candidate)}>{candidate}<span aria-hidden="true"> prefix</span></button>)}
      {(config.prefixes?.length ?? 0) > 0 && <button aria-label="Select no prefix" aria-pressed={prefix === ''} onClick={() => selectPrefix('')}>No prefix</button>}
    </fieldset>
    <fieldset>
      <legend>Root</legend>
      <button aria-label={`Select root ${config.root}`} aria-pressed="true" onClick={selectRoot}>{config.root}<span aria-hidden="true"> root</span></button>
    </fieldset>
    <fieldset>
      <legend>Suffix</legend>
      {(config.suffixes ?? []).map((candidate) => <button key={candidate} aria-label={`Select suffix ${candidate}`} aria-pressed={suffix === candidate} onClick={() => selectSuffix(candidate)}>{candidate}<span aria-hidden="true"> suffix</span></button>)}
      {(config.suffixes?.length ?? 0) > 0 && <button aria-label="Select no suffix" aria-pressed={suffix === ''} onClick={() => selectSuffix('')}>No suffix</button>}
    </fieldset>
    <div className="word-root-assembled" aria-label="Assembled word"><strong>Assembled word:</strong> {value().word}</div>
    <div><button aria-label="Check word" onClick={check}>Check word</button> <button onClick={reset}>Start over</button></div>
    <p role="status">{status}</p>
  </section>;
}

export default function WordRootBuilder(props: WordRootBuilderProps) {
  return <WordRootBuilderBody key={JSON.stringify(props.config)} {...props} />;
}
