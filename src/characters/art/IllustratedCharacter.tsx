import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { springy } from '../../app/motion';
import { useReducedMotionPref } from '../../app/useReducedMotionPref';
import type { GuideId, Pose } from '../../content/schema';

type PoseTransform = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

const POSE_TRANSFORMS: Record<Pose, PoseTransform> = {
  idle: { x: 0, y: 0, rotate: 0, scale: 1 },
  talk: { x: 0, y: -2, rotate: 1, scale: 1.02 },
  think: { x: -3, y: 1, rotate: -4, scale: 0.99 },
  cheer: { x: 0, y: -10, rotate: 0, scale: 1.06 },
  oops: { x: 2, y: 6, rotate: 3, scale: 0.96 },
};

function PoseAccent({ pose }: { pose: Pose }) {
  if (pose === 'talk') {
    return (
      <g fill="none" stroke="#7253b6" strokeLinecap="round" strokeWidth="3.5">
        <path d="M 169 83 q 9 -6 13 -15" />
        <path d="M 174 94 q 11 -1 18 -8" />
      </g>
    );
  }

  if (pose === 'think') {
    return (
      <g>
        <circle cx="163" cy="48" r="5" fill="#d9cef0" />
        <circle cx="174" cy="35" r="8" fill="#c7b6e7" />
        <circle cx="186" cy="20" r="13" fill="#ffffff" stroke="#7253b6" strokeWidth="3" />
        <text
          x="186"
          y="26"
          fill="#7253b6"
          fontFamily="Nunito, sans-serif"
          fontSize="20"
          fontWeight="900"
          textAnchor="middle"
        >
          ?
        </text>
      </g>
    );
  }

  if (pose === 'cheer') {
    return (
      <g fill="#f8b934">
        <path d="M 22 52 l 4 9 9 4-9 4-4 9-4-9-9-4 9-4z" />
        <path d="M 178 36 l 3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        <circle cx="28" cy="108" r="4" fill="#8b63cc" />
        <circle cx="181" cy="104" r="4" fill="#2bb7aa" />
      </g>
    );
  }

  if (pose === 'oops') {
    return <path d="M 178 45 q 12 16 0 27 q -12 -11 0 -27z" fill="#63bce8" />;
  }

  return null;
}

type IllustratedCharacterProps = {
  asset: string;
  guide: GuideId;
  pose: Pose;
};

export function IllustratedCharacter({ asset, guide, pose }: IllustratedCharacterProps) {
  const reduced = useReducedMotionPref();
  const transition: Transition = reduced ? { duration: 0 } : springy;
  const transform = POSE_TRANSFORMS[pose];

  return (
    <g>
      <motion.g
        initial={false}
        animate={transform}
        transition={transition}
        style={{ transformBox: 'view-box', transformOrigin: '100px 178px' }}
      >
        <image
          href={asset}
          x="0"
          y="0"
          width="200"
          height="200"
          preserveAspectRatio="xMidYMid meet"
          data-character-asset={guide}
          style={{ filter: 'drop-shadow(0 5px 4px rgba(60, 42, 73, 0.16))' }}
        />
      </motion.g>
      <PoseAccent pose={pose} />
    </g>
  );
}
