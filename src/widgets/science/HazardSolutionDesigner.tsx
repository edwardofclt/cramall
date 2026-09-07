import { ActivityWorkbench } from '../ActivityWorkbench';
import { HazardScene } from './ScienceScenes';
import {useEffect, useState} from 'react';
import type {WidgetProps} from '../registry';
import {useCompletionLatch} from '../useCompletionLatch';

const orderedIds = (ids: string[], solutionIds: string[]) => solutionIds.filter((id) => ids.includes(id));
const sameSet = (first: string[], second: string[]) => first.length === second.length && first.every((id) => second.includes(id));

type CoachPhase = 'none' | 'strategy' | 'retry';

export default function HazardSolutionDesigner({config, onEvent}: WidgetProps<'hazard-solution-designer'>) {
  const key = JSON.stringify(config);
  const hasReasoning = config.requiredImpactIds !== undefined && config.solutions.every((solution) => solution.strengths && solution.impacts && solution.limits);
  const prompt = hasReasoning
    ? `Design a plan for ${config.hazard}. Choose protections, then choose the impacts they address.`
    : `Choose protections for ${config.hazard}.`;
  const [planFeedback,setPlanFeedback]=useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedImpacts, setSelectedImpacts] = useState<Record<string, string[]>>({});
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(prompt);
  const [coachPhase, setCoachPhase] = useState<CoachPhase>('none');
  const {completed, completeOnce} = useCompletionLatch(key);
  const selectedInConfigOrder = orderedIds(selected, config.solutions.map((solution) => solution.id));
  const selectedImpactIds = config.solutions.flatMap((solution) => selectedImpacts[solution.id] ?? []);
  const requiredImpactIds = config.requiredImpactIds ?? [];
  const impactOptions = [...new Set(config.solutions.flatMap(solution=>solution.impacts ?? []))];
  const mismatchedLinks = config.solutions.filter(solution=>(selectedImpacts[solution.id] ?? []).some(impact=>!solution.impacts?.includes(impact)));
  const reasonedPlanComplete = hasReasoning
    && selectedInConfigOrder.length > 0
    && mismatchedLinks.length === 0
    && selectedInConfigOrder.every(id=>(selectedImpacts[id] ?? []).length > 0)
    && selectedInConfigOrder.every((id) => config.solutions.find((solution) => solution.id === id)?.effectiveness !== 'poor')
    && requiredImpactIds.every((impactId) => selectedImpactIds.includes(impactId));
  const visibleComplete = completed && checked && (hasReasoning ? reasonedPlanComplete : sameSet(selectedInConfigOrder, config.requiredIds));

  useEffect(() => {
    setSelected([]);setPlanFeedback('');
    setSelectedImpacts({});
    setChecked(false);
    setStatus(prompt);
    setCoachPhase('none');
  }, [key, prompt]);

  const coachWrong = () => {
    const cue = coachPhase === 'none' ? 'strategy' : 'retry';
    setCoachPhase(cue);
    onEvent({type: 'coach', cue});
  };

  const emit = (next: string[], action: 'toggle-solution' | 'check' | 'reset') => {
    const ordered = orderedIds(next, config.solutions.map((solution) => solution.id));
    onEvent({type: 'interaction', action});
    onEvent({type: 'change', value: {selectedIds: ordered}});
    return ordered;
  };

  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter((selectedId) => selectedId !== id) : [...selected, id];
    const ordered = orderedIds(next, config.solutions.map((solution) => solution.id));
    setSelected(ordered);
    setSelectedImpacts((current) => {
      if (ordered.includes(id)) return current;
      const nextImpacts = {...current};
      delete nextImpacts[id];
      return nextImpacts;
    });
    setChecked(false);
    setStatus(ordered.includes(id)
      ? (hasReasoning ? `${config.solutions.find((solution) => solution.id === id)?.label} chosen. Now choose an impact it addresses.` : 'Selection changed; check the revised hazard plan.')
      : 'Protection removed. Revise the hazard plan.');
    emit(next, 'toggle-solution');
  };

  const toggleImpact = (solutionId: string, impactId: string) => {
    if (!selected.includes(solutionId)) return;
    const current = selectedImpacts[solutionId] ?? [];
    const nextForSolution = current.includes(impactId) ? current.filter((id) => id !== impactId) : [...current, impactId];
    const nextImpacts = {...selectedImpacts, [solutionId]: nextForSolution};
    setSelectedImpacts(nextImpacts);
    setChecked(false);
    setStatus(`${impactId} ${nextForSolution.includes(impactId) ? 'connected to' : 'removed from'} ${config.solutions.find((solution) => solution.id === solutionId)?.label}. Check the revised plan.`);
    emit(selected, 'toggle-solution');

  };

  const check = () => {
    const ordered = emit(selected, 'check');
    setChecked(true);
    if (!hasReasoning) {
      const isExact = sameSet(ordered, config.requiredIds);
      if (isExact) {
        setStatus('Hazard plan complete. This simplified authored model reduces risk; it does not promise safety.');
        completeOnce(() => onEvent({type: 'complete', value: {selectedIds: ordered}}));
        return;
      }
      const poor = config.solutions.filter((solution) => ordered.includes(solution.id) && solution.effectiveness === 'poor');
      const missing = config.requiredIds.filter((id) => !ordered.includes(id)).map((id) => config.solutions.find((solution) => solution.id === id)!.label);
      const unnecessaryExtras = config.solutions.filter((solution) => ordered.includes(solution.id) && !config.requiredIds.includes(solution.id) && solution.effectiveness !== 'poor');
      const feedback = [
        poor.length ? `${poor.map((solution) => solution.label).join(', ')} ${poor.length === 1 ? 'is' : 'are'} poor choices; remove ${poor.length === 1 ? 'it' : 'them'}.` : '',
        missing.length ? `${missing.join(', ')} ${missing.length === 1 ? 'is' : 'are'} missing; add ${missing.length === 1 ? 'it' : 'them'}.` : '',
        unnecessaryExtras.length ? unnecessaryExtras.map((solution) => solution.effectiveness === 'partial'
          ? `${solution.label} is partial and is not needed in this authored plan; remove it.`
          : `${solution.label} is not needed in this authored plan; remove it.`).join(' ') : '',
      ].filter(Boolean).join(' ');
      setStatus(`Revise the plan. ${feedback}`);
      coachWrong();
      return;
    }
    if(mismatchedLinks.length){const message=`Try again: a chosen impact does not match ${mismatchedLinks.map(solution=>solution.label).join(', ')}. Compare its job with the impact.`;setStatus(message);setPlanFeedback(message);coachWrong();return;}
    const poor = config.solutions.filter((solution) => ordered.includes(solution.id) && solution.effectiveness === 'poor');
    const missing = requiredImpactIds.filter((id) => !selectedImpactIds.includes(id));
    if (reasonedPlanComplete) {
      setPlanFeedback('Your checked protections address the named impacts. Each still has limits.');
      setStatus('Plan complete. You connected protections to required impacts. Risk is reduced, not eliminated.');
      completeOnce(() => onEvent({type: 'complete', value: {selectedIds: ordered}}));
      return;
    }
    const details = [
      !ordered.length ? 'Choose at least one protection.' : '',
      poor.length ? `${poor.map((solution) => solution.label).join(', ')} does not reduce the named impact; revise that choice.` : '',
      missing.length ? `Connect a selected protection to: ${missing.join(', ')}.` : '',
    ].filter(Boolean).join(' ');
    setPlanFeedback(`Try again. ${details}`);
    setStatus(`Revise the plan. ${details} Risk can be reduced, not eliminated.`);
    coachWrong();
  };

  const reset = () => {
    setSelected([]);setPlanFeedback('');
    setSelectedImpacts({});
    setChecked(false);
    setStatus(prompt);
    setCoachPhase('none');
    emit([], 'reset');
  };

  const detailsFor = (solution: typeof config.solutions[number]) => ({
    strengths: solution.strengths ?? [solution.effectiveness === 'good' ? 'Addresses part of the named hazard.' : 'Has a limited effect in this model.'],
    impacts: solution.impacts ?? ['The named hazard impact'],
    limits: solution.limits ?? ['This simplified plan has limits and cannot promise safety.'],
  });

  return <section className="card widget-experiment hazard activity-shell science-activity" data-testid="widget-hazard-solution-designer" data-state={visibleComplete ? 'complete' : 'designing'} aria-describedby="hazard-model-note">
    <ActivityWorkbench label="Hazard planning model" revealKey={checked?'checked':'designing'} visual={<>
    <header><h3>Hazard-solution designer</h3><p className="science-model-label">Model only · not physical evidence</p></header>
    <section className="hazard-context" data-testid="hazard-context" aria-label="Current hazard">
      <h4>Hazard: {config.hazard}</h4>

    </section>
      <HazardScene flood={/flood/i.test(config.hazard)} selected={selectedInConfigOrder} checked={checked}/>
      <p className="science-selection-summary">Your plan: {selectedInConfigOrder.map(id=>config.solutions.find(solution=>solution.id===id)?.label).join(' + ') || 'No protections placed yet'}.</p>
    </>}>
    <p>Choose protections, then explain which impacts each protection addresses.</p>
    <section className="hazard-design-cards" aria-label={`Solutions for ${config.hazard}`}>
      {config.solutions.map((solution) => {
        const details = detailsFor(solution);
        const chosenImpacts = selectedImpacts[solution.id] ?? [];
        return <article className="hazard-solution-card" key={solution.id} data-selected={selected.includes(solution.id) ? 'yes' : 'no'}>
          <strong>{solution.label}</strong>
          {selected.includes(solution.id) && <span className="hazard-selected-marker">Selected</span>}
          <dl className="hazard-solution-details">
            <div><dt>Strengths</dt><dd>{details.strengths.join(' ')}</dd></div>
            {checked && <div><dt>Impacts addressed</dt><dd>{details.impacts.join(' ')}</dd></div>}
            <div><dt>Limits</dt><dd>{details.limits.join(' ')}</dd></div>
          </dl>
          <button aria-label={`Toggle ${solution.label}`} aria-pressed={selected.includes(solution.id)} onClick={() => toggle(solution.id)}>Choose {solution.label}</button>
          {selected.includes(solution.id) && <fieldset className="hazard-impact-choices">
            <legend>Connect impacts for {solution.label}</legend>
            {(hasReasoning ? impactOptions : details.impacts).map((impact) => <button type="button" key={impact} aria-label={`Connect ${impact} to ${solution.label}`} aria-pressed={chosenImpacts.includes(impact)} onClick={() => toggleImpact(solution.id, impact)}>{chosenImpacts.includes(impact) ? 'Connected: ' : 'Connect: '}{impact}</button>)}
          </fieldset>}
        </article>;
      })}
    </section>
    {planFeedback && <p className="science-feedback" aria-label="Checked plan feedback">{!checked && 'Earlier check — plan changed: '}{planFeedback}</p>}
    <div className="hazard-controls">
      <button aria-label="Check solution" onClick={check}>Check solution</button>
      <button onClick={reset}>Start over</button>
    </div>
    <p role="status">{status}</p>
    <section className="science-model-notes" aria-label="About this model"><h4>About this model</h4>

      <p id="hazard-model-note">This is a simplified authored mitigation-planning model, not emergency advice. A plan can reduce risk and impacts, but it does not promise safety and cannot eliminate risk.</p>
    </section>
    </ActivityWorkbench>
  </section>;
}
