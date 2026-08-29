import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import type { Pose } from '../../content/schema';
import { springy } from '../../app/motion';
import { useReducedMotionPref } from '../../app/useReducedMotionPref';

/** Winnie the Carolina wren — reading guide. Rusty brown, cocked tail, bold cream
 *  eyebrow stripe (the real wren's giveaway) and tiny reading glasses on her bill. */

const OUTLINE = '#4a2c14';
const BROWN = '#b57a45';
const BROWN_DEEP = '#8a5426';
const CREAM = '#f8e6c9';
const STRIPE = '#fff6e4';
const BILL = '#e9a83f';
const BILL_DEEP = '#c9862a';
const GAPE = '#7d3b2e';
const FRAME = '#b98a1f';

const WING_L = 'M 60 108 q -24 20 -18 48 q 18 4 26 -16 q 6 -18 4 -32 z';
const WING_R = 'M 140 108 q 24 20 18 48 q -18 4 -26 -16 q -6 -18 -4 -32 z';

type Spec = {
  wingL: number; wingR: number; tail: number; body: number;
  brow: number; pupil: number; open: boolean;
};

const SPECS: Record<Pose, Spec> = {
  idle: { wingL: 0, wingR: 0, tail: 0, body: 0, brow: 0, pupil: 0, open: false },
  talk: { wingL: -8, wingR: 8, tail: -5, body: -1, brow: -1, pupil: 0, open: true },
  think: { wingL: -6, wingR: -168, tail: 7, body: 1, brow: -5, pupil: -3, open: false },
  cheer: { wingL: 120, wingR: -120, tail: -20, body: -6, brow: -6, pupil: -1, open: true },
  oops: { wingL: 14, wingR: -12, tail: 18, body: 5, brow: 6, pupil: 3, open: false },
};

function Eye({ x, dy, t }: { x: number; dy: number; t: Transition }) {
  return (
    <g>
      <circle cx={x} cy={62} r={12} fill="#ffffff" stroke={OUTLINE} strokeWidth={3.5} />
      <motion.g initial={false} animate={{ y: dy }} transition={t}>
        <circle cx={x} cy={62} r={6.8} fill="#2c1b0c" />
        <circle cx={x - 2.4} cy={59.4} r={2.8} fill="#ffffff" />
        <circle cx={x + 2.8} cy={65.6} r={1.4} fill="#ffffff" opacity={0.75} />
      </motion.g>
    </g>
  );
}

function Bill({ open }: { open: boolean }) {
  if (open)
    return (
      <g>
        <path d="M 90 70 L 100 112 L 110 70 Z" fill={GAPE} stroke={OUTLINE} strokeWidth={3} />
        <path d="M 90 70 L 100 90 L 110 70 Q 100 77 90 70 Z" fill={BILL} stroke={OUTLINE} strokeWidth={3} />
        <path d="M 95 98 L 100 112 L 105 98 Z" fill={BILL_DEEP} stroke={OUTLINE} strokeWidth={3} />
      </g>
    );
  return (
    <g>
      <path d="M 90 70 L 100 112 L 110 70 Q 100 77 90 70 Z" fill={BILL} stroke={OUTLINE} strokeWidth={3} />
      <path d="M 93 80 L 100 82 L 107 80" fill="none" stroke={BILL_DEEP} strokeWidth={2.5} />
    </g>
  );
}

function Mood({ pose }: { pose: Pose }) {
  const line = { fill: 'none', stroke: OUTLINE, strokeWidth: 3, opacity: 0.7 };
  if (pose === 'cheer') return <path d="M 76 84 q 8 12 16 12 M 124 84 q -8 12 -16 12" {...line} />;
  if (pose === 'oops') return <path d="M 78 96 q 8 -8 14 -6 M 122 96 q -8 -8 -14 -6" {...line} />;
  return null;
}

export function Winnie({ pose }: { pose: Pose }) {
  const reduced = useReducedMotionPref();
  const t: Transition = reduced ? { duration: 0 } : springy;
  const s = SPECS[pose];

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <motion.g
        initial={false}
        style={{ originX: '130px', originY: '164px', transformBox: 'view-box' }}
        animate={{ rotate: s.tail }}
        transition={t}
      >
        <path d="M 128 158 L 166 94 L 190 114 L 144 170 Z" fill={BROWN_DEEP} stroke={OUTLINE} strokeWidth={4} />
        <g stroke={OUTLINE} strokeWidth={3.5} opacity={0.6} fill="none">
          <path d="M 142 140 L 155 151 M 151 125 L 166 137 M 161 109 L 177 122" />
        </g>
      </motion.g>

      <g stroke={BILL} strokeWidth={5} fill="none">
        <path d="M 88 160 v 22 M 79 187 l 9 -5 l 9 5" />
        <path d="M 112 160 v 22 M 103 187 l 9 -5 l 9 5" />
      </g>

      <motion.g initial={false} animate={{ y: s.body }} transition={t}>
        <ellipse cx={100} cy={132} rx={45} ry={41} fill={BROWN} stroke={OUTLINE} strokeWidth={4} />
        <ellipse cx={100} cy={142} rx={28} ry={27} fill={CREAM} />

        <circle cx={100} cy={60} r={35} fill={BROWN} stroke={OUTLINE} strokeWidth={4} />
        <ellipse cx={78} cy={76} rx={8} ry={5} fill="#e5806a" opacity={0.45} />
        <ellipse cx={122} cy={76} rx={8} ry={5} fill="#e5806a" opacity={0.45} />

        <motion.g initial={false} animate={{ y: s.brow }} transition={t} fill="none">
          <path d="M 62 48 q 13 -13 28 -8" stroke={OUTLINE} strokeWidth={12} />
          <path d="M 138 48 q -13 -13 -28 -8" stroke={OUTLINE} strokeWidth={12} />
          <path d="M 62 48 q 13 -13 28 -8" stroke={STRIPE} strokeWidth={7.5} />
          <path d="M 138 48 q -13 -13 -28 -8" stroke={STRIPE} strokeWidth={7.5} />
        </motion.g>

        <g stroke={OUTLINE} strokeWidth={5} opacity={0.55} fill="none">
          <path d="M 66 60 q 12 -6 24 -3 M 134 60 q -12 -6 -24 -3" />
        </g>
        <Eye x={82} dy={s.pupil} t={t} />
        <Eye x={118} dy={s.pupil} t={t} />

        <Bill open={s.open} />
        <Mood pose={pose} />

        <g stroke={FRAME} strokeWidth={3.2} fill="rgba(255,255,255,0.2)">
          <circle cx={82} cy={64} r={13} />
          <circle cx={118} cy={64} r={13} />
          <path d="M 95 66 q 5 5 10 0 M 69 60 l -7 -6 M 131 60 l 7 -6" fill="none" />
        </g>
        <path d="M 75 57 l 6 -5 M 111 57 l 6 -5" stroke="#ffffff" strokeWidth={2.5} opacity={0.7} fill="none" />

        <motion.g
          initial={false}
          style={{ originX: '60px', originY: '108px', transformBox: 'view-box' }}
          animate={{ rotate: s.wingL }}
          transition={t}
        >
          <path d={WING_L} fill={BROWN_DEEP} stroke={OUTLINE} strokeWidth={3.5} />
          <g stroke={OUTLINE} strokeWidth={2.5} opacity={0.45} fill="none">
            <path d="M 50 124 q -6 14 -5 24 M 60 128 q -5 12 -4 20" />
          </g>
        </motion.g>
        <motion.g
          initial={false}
          style={{ originX: '140px', originY: '108px', transformBox: 'view-box' }}
          animate={{ rotate: s.wingR }}
          transition={t}
        >
          <path d={WING_R} fill={BROWN_DEEP} stroke={OUTLINE} strokeWidth={3.5} />
          <g stroke={OUTLINE} strokeWidth={2.5} opacity={0.45} fill="none">
            <path d="M 150 124 q 6 14 5 24 M 140 128 q 5 12 4 20" />
          </g>
        </motion.g>
      </motion.g>
    </g>
  );
}
