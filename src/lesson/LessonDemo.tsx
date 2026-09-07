import { useEffect, useRef, useState } from 'react';
import type { GuideId, InstructionalDemo, WidgetCoach } from '../content/schema';
import { Character } from '../characters/Character';
import { SpeechBubble } from '../characters/SpeechBubble';
import { ActivityCoachProvider } from '../widgets/ActivityCoach';
import { RollerCoasterDemo, type DemoCoachCue } from './RollerCoasterDemo';
import '../widgets/activity-workbench.css';

export function LessonDemo({ demo, guide = 'sandy', onIntroActiveChange }: { demo: InstructionalDemo; guide?: GuideId; onIntroActiveChange?: (active: boolean) => void }) {
  const [turn, setTurn] = useState(0);
  const [reaction, setReaction] = useState<WidgetCoach['reactions']['complete'] | null>(null);
  function react(cue: DemoCoachCue) {
    const text = { prediction: 'Your prediction is saved. Compare both releases before explaining what changed.', observation: 'Keep each model result as a record. What changed between the two releases?', retry: 'Describe the motion you noticed. Energy itself is not something we directly see.', complete: 'You connected a visible change in motion to a possible energy explanation. A real experiment would provide physical evidence.', reset: '' }[cue];
    setReaction(text ? { text, pose: 'talk' } : null);
  }
  const notify = useRef(onIntroActiveChange);
  notify.current = onIntroActiveChange;
  useEffect(() => { notify.current?.(turn < 2); }, [turn]);
  const collision = demo.focus === 'collision';
  const lines = [
    collision ? 'Let’s compare two releases of the same marble into a foam block. What might change?' : 'Let’s release the same car from two heights. We will compare its motion on the same part of the track.',
    'I’ll predict, run both models, and use the motion I notice to explain my idea.',
  ];
  return <div className="widget-coach-frame guide-led-coach">
    {turn < 2 ? <div className="widget-coach-intro" data-testid="demo-coach-intro">
      <div className="widget-coach-scene">
        <div className="widget-coach-intro-live" aria-live="polite" aria-atomic="true"><SpeechBubble align="center">{lines[turn]}</SpeechBubble></div>
        <Character guide={guide} pose={turn === 0 ? 'talk' : 'idle'} size={360} className="widget-coach-character" />
      </div>
      <div className="widget-coach-controls"><button type="button" className="btn btn-primary" onClick={() => setTurn(value => value + 1)}>{turn === 0 ? 'Next' : 'Start the model'}</button></div>
    </div> : <ActivityCoachProvider value={{guide, reaction, dismiss: () => setReaction(null)}}><RollerCoasterDemo focus={demo.focus} onCoach={react} /></ActivityCoachProvider>}
  </div>;
}
