import '../widgets/science/tuning-fork.css';
import '../widgets/activity-workbench.css';
import { ActivityCoachProvider } from '../widgets/ActivityCoach';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Character } from '../characters/Character';
import { SpeechBubble } from '../characters/SpeechBubble';
import type { GuideId, WidgetCoach, WidgetCoachLine } from '../content/schema';
import { WidgetFrame, type WidgetFrameProps } from '../widgets/WidgetFrame';
import type { CoachCue, WidgetEvent, WidgetEventHandler } from '../widgets/registry';

export type WidgetCoachFrameProps = WidgetFrameProps & {
  coach: WidgetCoach;
  guide: GuideId;
  visitKey: string;
  onEvent: WidgetEventHandler;
  onIntroActiveChange: (active: boolean) => void;
  onActivityReady?: () => void;
};

type Phase = 'intro' | 'active';

function IntroLine({ line, guide }: { line: WidgetCoachLine; guide: GuideId }) {
  const speakingGuide = line.speaker === 'guide';
  return (
    <div className="widget-coach-scene" data-speaker={line.speaker}>
      <div className="widget-coach-intro-live" data-testid="widget-coach-intro-live" aria-live="polite" aria-atomic="true">
        <SpeechBubble align={speakingGuide ? 'center' : 'right'}>{line.text}</SpeechBubble>
      </div>
      <Character
        guide={guide}
        pose={speakingGuide ? line.pose ?? 'talk' : 'idle'}
        size={96}
        className="widget-coach-character"
        allowOverflow
      />
    </div>
  );
}

function widgetCoachStyle(phase: Phase): CSSProperties {
  return { '--widget-coach-phase': phase } as CSSProperties;
}

/**
 * Adds a short, lesson-local conversation and bounded semantic coaching around any widget.
 * The activity is absent until its in-step conversation finishes. Each activity owns
 * its persistent feedback; authored guide reactions appear locally in its task pane.
 */
export function WidgetCoachFrame(props: WidgetCoachFrameProps) {
  return <WidgetCoachRun key={props.visitKey} {...props} />;
}

function WidgetCoachRun({
  coach,
  guide,
  onEvent,
  onIntroActiveChange,
  onActivityReady,
  ...widget
}: WidgetCoachFrameProps) {
  const tuningFork = widget.type === 'energy-transfer-builder' && widget.config.experience === 'tuning-fork';
  const startLabel = tuningFork ? 'Start the model' : 'Try it';
  const [phase, setPhase] = useState<Phase>('intro');
  const [introIndex, setIntroIndex] = useState(0);
  const [reaction, setReaction] = useState<WidgetCoach['reactions']['complete'] | null>(null);
  const readyCallback = useRef(onActivityReady);
  readyCallback.current = onActivityReady;
  const activityRef = useRef<HTMLDivElement>(null);
  const lastCue = useRef<CoachCue | 'complete' | null>(null);
  const onIntroActiveChangeRef = useRef(onIntroActiveChange);
  const intro = coach.intro[introIndex] ?? coach.intro[0]!;
  const isLastIntroLine = introIndex === coach.intro.length - 1;

  onIntroActiveChangeRef.current = onIntroActiveChange;

  useEffect(() => {
    onIntroActiveChangeRef.current(false);
  }, []);

  useEffect(() => {
    if (phase === 'active') onIntroActiveChangeRef.current(true);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'active') return;
    const activity = activityRef.current;
    if (!activity) return;
    let focused = false;
    function focusFirst() {
      if (focused) return;
      const control = activity?.querySelector<HTMLElement>('[data-activity-first-control], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [role="slider"][tabindex="0"]');
      if (control) { control.focus({ preventScroll: true }); focused = true; readyCallback.current?.(); }
    }
    // Lazy widgets may arrive after activation; stop observing as soon as focus lands.
    focusFirst();
    const observer = new MutationObserver(() => { focusFirst(); if (focused) observer.disconnect(); });
    if (!focused) observer.observe(activity, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [phase]);

  function advanceIntro() {
    if (!isLastIntroLine) {
      setIntroIndex((index) => Math.min(index + 1, coach.intro.length - 1));
      return;
    }
    activate();
  }

  function showReaction(cue: CoachCue | 'complete') {
    if (lastCue.current === cue) return;
    lastCue.current = cue;
    const nextReaction = coach.reactions[cue];
    if (nextReaction) setReaction(nextReaction);
  }

  function handleEvent(event: WidgetEvent) {
    // The lesson boundary receives every widget event unchanged, including events that do
    // not have an authored coaching line. Coaching is an additive presentation concern.
    onEvent(event);
    if (phase !== 'active' || tuningFork) return;
    if (event.type === 'interaction') {
      setReaction(null);
      lastCue.current = null;
    } else if (event.type === 'coach') {
      showReaction(event.cue);
    } else if (event.type === 'complete') {
      showReaction('complete');
    }
  }

  function activate() {
    setPhase('active');
  }

  return (
    <div className={`widget-coach-frame${tuningFork ? ' tuning-coach' : ' guide-led-coach'}`} style={widgetCoachStyle(phase)}>
      {phase === 'intro' && <div className="widget-coach-intro" data-testid="widget-coach-intro">
        {phase === 'intro' && <IntroLine line={intro} guide={guide} />}
        <div className="widget-coach-controls">
          <button
            type="button"
            className="btn btn-primary"
            aria-label={isLastIntroLine ? startLabel : 'Next'}
            onClick={isLastIntroLine ? activate : advanceIntro}
          >
            {isLastIntroLine ? startLabel : 'Next'} <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>}

      {phase === 'active' && <div
        ref={activityRef}
        className="widget-coach-activity"
        data-testid="widget-coach-activity"
        onChangeCapture={() => { setReaction(null); lastCue.current = null; }}
        onClickCapture={(event) => { if ((event.target as Element).closest('button, [role="button"]')) { setReaction(null); lastCue.current = null; } }}
      >
        <ActivityCoachProvider value={{ guide, reaction, dismiss: () => setReaction(null) }}>
          <WidgetFrame {...widget} onEvent={handleEvent} />
        </ActivityCoachProvider>
      </div>}
    </div>
  );
}
