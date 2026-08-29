import { DialoguePlayer } from '../characters/DialoguePlayer';
import type { LearnCard as LearnCardData, RichBlock } from '../content/schema';
import { WidgetFrame } from '../widgets/WidgetFrame';
import { ReadAloudButton } from './ReadAloudButton';
import { RichText, speechText } from './Rich';

/** A card's dialogue is decoration, not a gate — the kid can read past it any time. */
const noop = () => {};

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

export function LearnCard({ card }: { card: LearnCardData }) {
  const spoken = speechText([card.title, ...card.blocks.map((b) => b.text)]);

  return (
    <section className="card stack" aria-labelledby={`learn-card-${card.id}`}>
      <div className="row" style={{ justifyContent: 'space-between', gap: '0.75rem' }}>
        <h2 id={`learn-card-${card.id}`} style={{ margin: 0 }}>
          {card.title}
        </h2>
        <ReadAloudButton text={spoken} />
      </div>

      {card.dialogue && card.dialogue.length > 0 && (
        <DialoguePlayer lines={card.dialogue} onDone={noop} size={110} />
      )}

      {card.blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}

      {card.widget && <WidgetFrame type={card.widget.type} config={card.widget.config} />}
    </section>
  );
}
