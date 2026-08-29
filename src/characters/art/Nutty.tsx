import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import type { Pose } from '../../content/schema';
import { springy } from '../../app/motion';
import { useReducedMotionPref } from '../../app/useReducedMotionPref';

/** Nutty the fox squirrel — math guide. Warm orange fur, huge S-curve tail, acorn in paw. */

const OUTLINE = '#5b3218';
const FUR = '#e28a3e';
const FUR_DEEP = '#c1671f';
const CREAM = '#ffe7c6';
const EAR = '#f0a49b';
const MOUTH = '#8f3f42';
const TONGUE = '#ef8f8f';
const ACORN = '#e0a860';
const ACORN_CAP = '#8b5a2b';

const TAIL = 'M 88 160 C 46 166 22 134 28 100 C 34 68 62 46 86 56';
const TAIL_LIT = 'M 86 150 C 54 152 38 126 44 102 C 49 78 68 62 84 66';
const ARM_L = 'M 74 132 C 60 140 52 150 52 159';
const ARM_R = 'M 126 132 C 140 140 148 150 148 159';

type Spec = { armL: number; armR: number; tail: number; body: number; brow: number; pupil: number };

const SPECS: Record<Pose, Spec> = {
  idle: { armL: 0, armR: 0, tail: 0, body: 0, brow: 0, pupil: 0 },
  talk: { armL: -10, armR: 16, tail: -6, body: -1, brow: -1, pupil: 0 },
  think: { armL: 4, armR: 155, tail: 8, body: 1, brow: -5, pupil: -3 },
  cheer: { armL: 105, armR: -105, tail: -18, body: -6, brow: -7, pupil: -1 },
  oops: { armL: -18, armR: 18, tail: 16, body: 6, brow: 6, pupil: 3 },
};

function Eye({ x, dy, t }: { x: number; dy: number; t: Transition }) {
  return (
    <g>
      <circle cx={x} cy={60} r={12.5} fill="#ffffff" stroke={OUTLINE} strokeWidth={3.5} />
      <motion.g initial={false} animate={{ y: dy }} transition={t}>
        <circle cx={x} cy={60} r={7} fill="#33200f" />
        <circle cx={x - 2.5} cy={57} r={2.9} fill="#ffffff" />
        <circle cx={x + 3} cy={64} r={1.5} fill="#ffffff" opacity={0.75} />
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
        <path d="M 85 93 q 15 22 30 0 z" {...open} />
        <path d="M 95 105 q 5 7 10 0 z" fill={TONGUE} />
      </g>
    );
  if (pose === 'talk')
    return (
      <g>
        <ellipse cx={100} cy={100} rx={9.5} ry={8} {...open} />
        <path d="M 96 105 q 4 5 8 0 z" fill={TONGUE} />
      </g>
    );
  if (pose === 'think') return <path d="M 92 98 q 9 -5 17 -2" {...line} />;
  if (pose === 'oops') return <path d="M 88 99 h 24" {...line} />;
  return <path d="M 89 95 q 11 10 22 0" {...line} />;
}

function Arm({ d, hand }: { d: string; hand: [number, number] }) {
  return (
    <>
      <path d={d} fill="none" stroke={OUTLINE} strokeWidth={18} />
      <path d={d} fill="none" stroke={FUR_DEEP} strokeWidth={11} />
      <circle cx={hand[0]} cy={hand[1]} r={9.5} fill={FUR_DEEP} stroke={OUTLINE} strokeWidth={3.5} />
    </>
  );
}

export function Nutty({ pose }: { pose: Pose }) {
  const reduced = useReducedMotionPref();
  const t: Transition = reduced ? { duration: 0 } : springy;
  const s = SPECS[pose];

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <motion.g
        initial={false}
        style={{ originX: '88px', originY: '160px', transformBox: 'view-box' }}
        animate={{ rotate: s.tail }}
        transition={t}
      >
        <path d={TAIL} fill="none" stroke={OUTLINE} strokeWidth={40} />
        <path d={TAIL} fill="none" stroke={FUR} strokeWidth={32} />
        <path d={TAIL_LIT} fill="none" stroke={CREAM} strokeWidth={9} opacity={0.65} />
      </motion.g>

      <ellipse cx={82} cy={177} rx={14} ry={9} fill={FUR_DEEP} stroke={OUTLINE} strokeWidth={3.5} />
      <ellipse cx={118} cy={177} rx={14} ry={9} fill={FUR_DEEP} stroke={OUTLINE} strokeWidth={3.5} />

      <motion.g initial={false} animate={{ y: s.body }} transition={t}>
        <ellipse cx={100} cy={148} rx={33} ry={31} fill={FUR} stroke={OUTLINE} strokeWidth={4} />
        <ellipse cx={100} cy={154} rx={21} ry={22} fill={CREAM} />

        <path d="M 72 46 L 62 12 L 96 32 Z" fill={FUR} stroke={OUTLINE} strokeWidth={4} />
        <path d="M 75 42 L 71 23 L 88 32 Z" fill={EAR} />
        <path d="M 128 46 L 138 12 L 104 32 Z" fill={FUR} stroke={OUTLINE} strokeWidth={4} />
        <path d="M 125 42 L 129 23 L 112 32 Z" fill={EAR} />

        <ellipse cx={100} cy={76} rx={41} ry={39} fill={FUR} stroke={OUTLINE} strokeWidth={4} />
        <ellipse cx={74} cy={92} rx={8.5} ry={5.5} fill="#ef8a6c" opacity={0.5} />
        <ellipse cx={126} cy={92} rx={8.5} ry={5.5} fill="#ef8a6c" opacity={0.5} />
        <ellipse cx={100} cy={93} rx={26} ry={18} fill={CREAM} stroke={OUTLINE} strokeWidth={3} />
        <g stroke={OUTLINE} strokeWidth={2} opacity={0.55} fill="none">
          <path d="M 77 90 l -12 -6 M 77 97 l -13 3" />
          <path d="M 123 90 l 12 -6 M 123 97 l 13 3" />
        </g>

        <Eye x={80} dy={s.pupil} t={t} />
        <Eye x={120} dy={s.pupil} t={t} />
        <motion.g initial={false} animate={{ y: s.brow }} transition={t} stroke={OUTLINE} strokeWidth={3.5} fill="none">
          <path d="M 70 41 q 10 -7 20 -2" />
          <path d="M 130 41 q -10 -7 -20 -2" />
        </motion.g>

        <ellipse cx={100} cy={82} rx={7.5} ry={6} fill="#43280f" />
        <path d="M 100 88 v 4" stroke={OUTLINE} strokeWidth={2.5} />
        <Mouth pose={pose} />

        <motion.g
          initial={false}
          style={{ originX: '74px', originY: '132px', transformBox: 'view-box' }}
          animate={{ rotate: s.armL }}
          transition={t}
        >
          <Arm d={ARM_L} hand={[52, 160]} />
          <path d="M 53 152 v -6" stroke={OUTLINE} strokeWidth={3.5} />
          <path d="M 41 163 q 12 23 24 0 z" fill={ACORN} stroke={OUTLINE} strokeWidth={3} />
          <path d="M 38 163 q 15 -16 30 0 z" fill={ACORN_CAP} stroke={OUTLINE} strokeWidth={3} />
        </motion.g>
        <motion.g
          initial={false}
          style={{ originX: '126px', originY: '132px', transformBox: 'view-box' }}
          animate={{ rotate: s.armR }}
          transition={t}
        >
          <Arm d={ARM_R} hand={[148, 160]} />
        </motion.g>
      </motion.g>
    </g>
  );
}
