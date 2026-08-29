import type { ComponentType, CSSProperties } from 'react';
import type { GuideId, Pose } from '../content/schema';
import { Nutty } from './art/Nutty';
import { Winnie } from './art/Winnie';
import { Sandy } from './art/Sandy';

const ART: Record<GuideId, ComponentType<{ pose: Pose }>> = {
  nutty: Nutty,
  winnie: Winnie,
  sandy: Sandy,
};

export const GUIDE_NAMES: Record<GuideId, string> = {
  nutty: 'Nutty the fox squirrel',
  winnie: 'Winnie the river otter',
  sandy: 'Sandy the sea turtle',
};

export type CharacterProps = {
  guide: GuideId;
  pose?: Pose;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export function Character({ guide, pose = 'idle', size = 120, className, style }: CharacterProps) {
  const Art = ART[guide];
  return (
    <svg
      role="img"
      aria-label={GUIDE_NAMES[guide]}
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={{ flex: '0 0 auto', ...style }}
      data-testid={`character-${guide}`}
      data-pose={pose}
    >
      <Art pose={pose} />
    </svg>
  );
}
