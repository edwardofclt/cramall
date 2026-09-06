import { useState } from 'react';
import type { GuideId, LearnCard as LearnCardData, RichBlock } from '../content/schema';
import { WidgetFrame } from '../widgets/WidgetFrame';
import type { WidgetEventHandler } from '../widgets/registry';
import { ReadAloudButton } from './ReadAloudButton';
import { RichText, speechText } from './Rich';
import { AnnouncingDialogue } from './AnnouncingDialogue';
import { InlineCheck } from './InlineCheck';
import { LessonDemo } from './LessonDemo';
import { WidgetCoachFrame } from './WidgetCoachFrame';

function Block({ block }: { block: RichBlock }) {
  if (block.kind === 'example') {
    return (
      <div className="callout callout-example" data-testid="block-example">
        <span className="callout-label">Example</span>
        <p className="callout-body">
          <RichText text={block.text} />
        </p>
      </div>
    );
  }

  if (block.kind === 'tip') {
    return (
      <div className="callout callout-tip" data-testid="block-tip">
        <span className="callout-label">
          <span aria-hidden="true">💡</span> Tip
        </span>
        <p className="callout-body">
          <RichText text={block.text} />
        </p>
      </div>
    );
  }

  return (
    <p className="learn-text" data-testid="block-text">
      <RichText text={block.text} />
    </p>
  );
}

export type LearnCardProps = {
  card: LearnCardData;
  onWidgetEvent: WidgetEventHandler;
  onDialogueAnnouncement: (text: string) => void;
  /** Lets the lesson stage reserve its forward control while this dialogue owns it. */
  onDialogueDone?: () => void;
  guide?: GuideId;
  stageVisitKey?: string;
  /** True while the coached widget's mini-conversation owns the lesson forward action. */
  onWidgetCoachIntroActiveChange?: (active: boolean) => void;
};

export function LearnCard({
  card,
  onWidgetEvent,
  onDialogueAnnouncement,
  onDialogueDone,
  guide = 'nutty',
  stageVisitKey = card.id,
  onWidgetCoachIntroActiveChange,
}: LearnCardProps) {
  const [dialogueDone, setDialogueDone] = useState(false);
  const spoken = speechText([card.title, ...card.blocks.map((b) => b.text)]);

  return (
    <section className="card stack" aria-labelledby={`learn-card-${card.id}`}>
      <div className="row" style={{ justifyContent: 'space-between', gap: '0.75rem' }}>
        <h2 id={`learn-card-${card.id}`} style={{ margin: 0 }}>
          {card.title}
        </h2>
        <ReadAloudButton text={spoken} />
      </div>

      {!dialogueDone && card.dialogue && card.dialogue.length > 0 && (
        <AnnouncingDialogue
          lines={card.dialogue}
          onDone={() => {
            setDialogueDone(true);
            onDialogueDone?.();
          }}
          onAnnouncement={onDialogueAnnouncement}
          size={110}
        />
      )}

      {card.blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}

      {card.widget && card.widgetCoach ? (
        <WidgetCoachFrame
          {...card.widget}
          coach={card.widgetCoach}
          guide={guide}
          visitKey={stageVisitKey}
          onEvent={onWidgetEvent}
          onIntroActiveChange={(active) => onWidgetCoachIntroActiveChange?.(!active)}
        />
      ) : (
        card.widget && <WidgetFrame {...card.widget} onEvent={onWidgetEvent} />
      )}

      {card.demo && <LessonDemo demo={card.demo} />}

      {card.check && <InlineCheck check={card.check} />}
    </section>
  );
}
