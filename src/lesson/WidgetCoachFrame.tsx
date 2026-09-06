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
};

type Phase = 'intro' | 'active';

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function IntroLine({ line, guide }: { line: WidgetCoachLine; guide: GuideId }) {
  const speakingGuide = line.speaker === 'guide';
  return (
    <div className="widget-coach-scene" data-speaker={line.speaker}>
      <SpeechBubble align={speakingGuide ? 'center' : 'right'}>
        {line.text}
      </SpeechBubble>
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

function Reaction({
  guide,
  text,
  pose,
  onDismiss,
}: {
  guide: GuideId;
  text: string;
  pose?: WidgetCoach['reactions']['complete']['pose'];
  onDismiss: () => void;
}) {
  return (
    <div className="widget-coach-reaction" data-testid="widget-coach-reaction">
      <Character guide={guide} pose={pose ?? 'talk'} size={76} allowOverflow />
      <div className="widget-coach-reaction-copy" role="status" aria-live="polite" aria-atomic="true">
        <SpeechBubble align="left">{text}</SpeechBubble>
        <button type="button" className="btn widget-coach-dismiss" aria-label="Dismiss" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

function widgetCoachStyle(phase: Phase): CSSProperties {
  return { '--widget-coach-phase': phase } as CSSProperties;
}

/**
 * Adds a short, lesson-local conversation and bounded semantic coaching around any widget.
 * The widget stays mounted during the conversation so its layout does not jump, but the
 * wrapper is inert and its event boundary ignores events until the learner opts in.
 */
export function WidgetCoachFrame(props: WidgetCoachFrameProps) {
  return <WidgetCoachRun key={props.visitKey} {...props} />;
}

function WidgetCoachRun({
  coach,
  guide,
  onEvent,
  onIntroActiveChange,
  ...widget
}: WidgetCoachFrameProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [introIndex, setIntroIndex] = useState(0);
  const [reaction, setReaction] = useState<WidgetCoach['reactions'][CoachCue | 'complete'] | null>(null);
  const seen = useRef(new Set<CoachCue | 'complete'>());
  const activityRef = useRef<HTMLDivElement>(null);
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

  function advanceIntro() {
    if (!isLastIntroLine) {
      setIntroIndex((index) => Math.min(index + 1, coach.intro.length - 1));
      return;
    }
    activate();
  }

  function showReaction(cue: CoachCue | 'complete') {
    if (seen.current.has(cue)) return;
    seen.current.add(cue);
    const nextReaction = coach.reactions[cue];
    if (nextReaction) setReaction(nextReaction);
  }

  function handleEvent(event: WidgetEvent) {
    // The lesson boundary receives every widget event unchanged, including events that do
    // not have an authored coaching line. Coaching is an additive presentation concern.
    onEvent(event);
    if (phase !== 'active') return;
    if (event.type === 'coach') {
      showReaction(event.cue);
    } else if (event.type === 'complete') {
      showReaction('complete');
    }
  }

  function activate() {
    setPhase('active');
    // Keep the next Tab target in the widget. The wrapper itself is not inserted into the
    // browser tab order, so keyboard learners land on the first real widget control.
    requestAnimationFrame(() => {
      activityRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    });
  }

  return (
    <div className="widget-coach-frame" style={widgetCoachStyle(phase)}>
      {phase === 'intro' && (
        <div className="widget-coach-intro" data-testid="widget-coach-intro">
          <IntroLine line={intro} guide={guide} />
          <div className="widget-coach-controls">
            <button type="button" className="btn btn-primary" aria-label={isLastIntroLine ? 'Try it' : 'Next'} onClick={isLastIntroLine ? activate : advanceIntro}>
              {isLastIntroLine ? 'Try it' : 'Next'} <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}

      {reaction && (
        <Reaction
          guide={guide}
          text={reaction.text}
          pose={reaction.pose}
          onDismiss={() => setReaction(null)}
        />
      )}

      <div
        ref={activityRef}
        className="widget-coach-activity"
        data-testid="widget-coach-activity"
        {...(phase === 'intro' ? ({ inert: '' } as Record<string, string>) : {})}
        aria-hidden={phase === 'intro' ? true : undefined}
      >
        <WidgetFrame {...widget} onEvent={handleEvent} />
      </div>
    </div>
  );
}
