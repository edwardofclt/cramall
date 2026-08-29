import { useId } from 'react';
import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import type { Pose } from '../../content/schema';
import { springy } from '../../app/motion';
import { useReducedMotionPref } from '../../app/useReducedMotionPref';

/** Sandy the loggerhead sea turtle — science guide. Sage skin, amber scute-patterned
 *  shell with a notched marginal rim, four paddle flippers. */

const OUTLINE = '#3f3117';
const SKIN = '#8fb277';
const SKIN_DEEP = '#6f9159';
const SHELL = '#c98a2e';
const SHELL_DEEP = '#a86c1e';
const SHELL_LIT = '#e0a94e';
const MOUTH = '#7d4040';
const TONGUE = '#e08b8b';

const FLIP_L = 'M 56 112 q -32 12 -40 44 q 18 10 30 -8 q 10 -16 12 -34 z';
const FLIP_R = 'M 144 112 q 32 12 40 44 q -18 10 -30 -8 q -10 -16 -12 -34 z';

type Spec = { flipL: number; flipR: number; body: number; brow: number; pupil: number };

const SPECS: Record<Pose, Spec> = {
  idle: { flipL: 0, flipR: 0, body: 0, brow: 0, pupil: 0 },
  talk: { flipL: 12, flipR: -12, body: -1, brow: -1, pupil: 0 },
  think: { flipL: -10, flipR: 148, body: 1, brow: -5, pupil: -3 },
  cheer: { flipL: 100, flipR: -100, body: -6, brow: -7, pupil: -1 },
  oops: { flipL: -26, flipR: 26, body: 6, brow: 6, pupil: 3 },
};

function Eye({ x, dy, t }: { x: number; dy: number; t: Transition }) {
  return (
    <g>
      <circle cx={x} cy={48} r={12} fill="#ffffff" stroke={OUTLINE} strokeWidth={3.5} />
      <motion.g initial={false} animate={{ y: dy }} transition={t}>
        <circle cx={x} cy={48} r={6.8} fill="#2a2412" />
        <circle cx={x - 2.4} cy={45.4} r={2.8} fill="#ffffff" />
        <circle cx={x + 2.8} cy={51.6} r={1.4} fill="#ffffff" opacity={0.75} />
      </motion.g>
    </g>
  );
}

function Mouth({ pose }: { pose: Pose }) {
  const line = { fill: 'none', stroke: OUTLINE, strokeWidth: 3.5 };
  const open = { fill: MOUTH, stroke: OUTLINE, strokeWidth: 3 };
  if (pose === 'cheer')
    return (
      <g>
        <path d="M 79 66 q 21 27 42 0 z" {...open} />
        <path d="M 93 79 q 7 8 14 0 z" fill={TONGUE} />
      </g>
    );
  if (pose === 'talk')
    return (
      <g>
        <path d="M 83 68 q 17 19 34 0 z" {...open} />
        <path d="M 95 78 q 5 6 10 0 z" fill={TONGUE} />
      </g>
    );
  if (pose === 'think') return <path d="M 90 73 q 10 -5 19 -3" {...line} />;
  if (pose === 'oops') return <path d="M 82 74 h 36" {...line} />;
  return <path d="M 81 68 q 19 15 38 0" {...line} />;
}

function Shell({ clipId }: { clipId: string }) {
  return (
    <g>
      <ellipse cx={100} cy={138} rx={54} ry={41} fill={SHELL_DEEP} stroke={OUTLINE} strokeWidth={4.5} />
      <g stroke={OUTLINE} strokeWidth={3} fill="none">
        <path d="M 145 135 L 154 138 M 134 156 L 141 164 M 112 167 L 114 178" />
        <path d="M 88 167 L 86 178 M 66 156 L 59 164 M 55 135 L 46 138" />
      </g>
      <ellipse cx={100} cy={135} rx={45} ry={33} fill={SHELL} stroke={OUTLINE} strokeWidth={3.5} />
      <clipPath id={clipId}>
        <ellipse cx={100} cy={135} rx={45} ry={33} />
      </clipPath>
      <g clipPath={`url(#${clipId})`} fill={SHELL_LIT} stroke={OUTLINE} strokeWidth={3}>
        <rect x={86} y={104} width={28} height={26} rx={9} />
        <rect x={86} y={132} width={28} height={26} rx={9} />
        <rect x={58} y={109} width={26} height={24} rx={9} transform="rotate(-14 71 121)" />
        <rect x={116} y={109} width={26} height={24} rx={9} transform="rotate(14 129 121)" />
        <rect x={60} y={139} width={24} height={24} rx={9} transform="rotate(12 72 151)" />
        <rect x={116} y={139} width={24} height={24} rx={9} transform="rotate(-12 128 151)" />
      </g>
    </g>
  );
}

export function Sandy({ pose }: { pose: Pose }) {
  const reduced = useReducedMotionPref();
  const t: Transition = reduced ? { duration: 0 } : springy;
  const s = SPECS[pose];
  const clipId = `sandy-shell-${useId().replace(/:/g, '')}`;

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M 78 170 q -20 8 -18 22 q 16 6 24 -7 z" fill={SKIN_DEEP} stroke={OUTLINE} strokeWidth={3.5} />
      <path d="M 122 170 q 20 8 18 22 q -16 6 -24 -7 z" fill={SKIN_DEEP} stroke={OUTLINE} strokeWidth={3.5} />

      <motion.g initial={false} animate={{ y: s.body }} transition={t}>
        <rect x={84} y={70} width={32} height={36} rx={14} fill={SKIN_DEEP} stroke={OUTLINE} strokeWidth={3.5} />
        <Shell clipId={clipId} />

        <motion.g
          initial={false}
          style={{ originX: '56px', originY: '112px', transformBox: 'view-box' }}
          animate={{ rotate: s.flipL }}
          transition={t}
        >
          <path d={FLIP_L} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
          <g stroke={OUTLINE} strokeWidth={2.5} opacity={0.4} fill="none">
            <path d="M 42 130 q -6 10 -6 18 M 50 134 q -5 9 -5 15" />
          </g>
        </motion.g>
        <motion.g
          initial={false}
          style={{ originX: '144px', originY: '112px', transformBox: 'view-box' }}
          animate={{ rotate: s.flipR }}
          transition={t}
        >
          <path d={FLIP_R} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
          <g stroke={OUTLINE} strokeWidth={2.5} opacity={0.4} fill="none">
            <path d="M 158 130 q 6 10 6 18 M 150 134 q 5 9 5 15" />
          </g>
        </motion.g>

        <circle cx={100} cy={52} r={36} fill={SKIN} stroke={OUTLINE} strokeWidth={4} />
        <ellipse cx={100} cy={64} rx={24} ry={16} fill={SKIN_DEEP} opacity={0.4} />
        <ellipse cx={78} cy={66} rx={8} ry={5} fill="#e5806a" opacity={0.4} />
        <ellipse cx={122} cy={66} rx={8} ry={5} fill="#e5806a" opacity={0.4} />
        <g fill={OUTLINE} opacity={0.55}>
          <circle cx={94} cy={60} r={2.4} />
          <circle cx={106} cy={60} r={2.4} />
          <circle cx={72} cy={40} r={2.2} />
          <circle cx={128} cy={40} r={2.2} />
        </g>

        <Eye x={85} dy={s.pupil} t={t} />
        <Eye x={115} dy={s.pupil} t={t} />
        <motion.g initial={false} animate={{ y: s.brow }} transition={t} stroke={OUTLINE} strokeWidth={3.5} fill="none">
          <path d="M 75 29 q 10 -6 20 -1" />
          <path d="M 125 29 q -10 -6 -20 -1" />
        </motion.g>

        <Mouth pose={pose} />
      </motion.g>
    </g>
  );
}
