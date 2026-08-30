import { useEffect, useState, type AnimationEvent } from 'react';
import { useReducedMotionPref } from '../app/useReducedMotionPref';
import type { InstructionalDemo } from '../content/schema';

type Focus = InstructionalDemo['focus'];
type Release = 'idle' | 'lower' | 'higher';
type RunPhase = 'idle' | 'running' | 'complete';

type DemoRun = {
  release: Release;
  sequence: number;
  phase: RunPhase;
  wasReset: boolean;
};

const COPY: Record<Focus, { title: string; prompt: string }> = {
  'speed-energy': {
    title: 'Compare release height, speed, and energy',
    prompt: 'Run both releases. Compare the same car only while it crosses the same fixed near-bottom interval.',
  },
  evidence: {
    title: 'Build a Claim–Evidence–Reasoning explanation',
    prompt: 'Run both releases, then notice how a model observation can support a claim when reasoning connects the ideas.',
  },
  collision: {
    title: 'Observe energy transfer in a safe collision',
    prompt: 'Run a safe miniature marble-and-foam-block collision from each release height and compare how far the block moves.',
  },
};

function resultFor(focus: Focus, release: Exclude<Release, 'idle'>): string {
  const higher = release === 'higher';
  if (focus === 'speed-energy') {
    return higher
      ? 'Higher release complete: The same car traveled through the same fixed near-bottom interval faster, so it had more kinetic energy than on the lower release.'
      : 'Lower release complete: The same car traveled through the same fixed near-bottom interval more slowly, so it had less kinetic energy than on the higher release.';
  }
  if (focus === 'evidence') {
    return higher
      ? 'Claim: The higher release gives the same coaster car more kinetic energy near the bottom. Model observation: In this simplified model, the same car traveled through the fixed near-bottom interval faster after the higher release. Reasoning: For the same car, faster motion means more kinetic energy. This model helps explain the pattern; it is not real experimental evidence.'
      : 'Claim: The lower release gives the same coaster car less kinetic energy near the bottom. Model observation: In this simplified model, the same car traveled through the fixed near-bottom interval more slowly after the lower release. Reasoning: For the same car, slower motion means less kinetic energy. This model helps explain the pattern; it is not real experimental evidence.';
  }
  return higher
    ? 'Higher release model complete: In this safe miniature marble-and-foam-block collision, the foam block moved farther. The faster marble had more energy of motion, so more energy of motion transferred to the block. This is a qualitative model, not an exact measurement.'
    : 'Lower release model complete: In this safe miniature marble-and-foam-block collision, the foam block moved a shorter distance. The marble slowed as some energy of motion transferred to the block. This is a qualitative model, not an exact measurement.';
}

function runningFor(focus: Focus, release: Exclude<Release, 'idle'>): string {
  const label = release === 'higher' ? 'Higher' : 'Lower';
  if (focus === 'collision') {
    return `${label} release running: Watch the marble travel toward the foam block. The modeled outcome will be announced after the collision and the block stops moving.`;
  }
  return `${label} release running: Watch the same car travel toward and through the fixed near-bottom interval. The modeled outcome will be announced after the car stops moving.`;
}

function CoasterVehicle({ collision }: { collision: boolean }) {
  if (collision) {
    return <circle className="rc-marble" cx="0" cy="0" r="10" />;
  }
  return (
    <g className="rc-car">
      <rect x="-21" y="-15" width="42" height="23" rx="7" />
      <circle cx="-12" cy="11" r="6" />
      <circle cx="12" cy="11" r="6" />
    </g>
  );
}

function CoasterScene({ focus, release, phase, reduced, runNumber, onAnimationComplete }: {
  focus: Focus;
  release: Release;
  phase: RunPhase;
  reduced: boolean;
  runNumber: number;
  onAnimationComplete: (runNumber: number) => void;
}) {
  const collision = focus === 'collision';
  const hasRelease = release !== 'idle';
  const animatedRelease = hasRelease && phase === 'running' && !reduced ? release : null;
  const idleTransform = collision ? 'translate(72 44)' : 'translate(72 37)';
  const finalTransform = 'translate(493 210)';
  const animationStyle = animatedRelease
    ? {
        animationName: `rc-vehicle-${animatedRelease}`,
        animationDuration: animatedRelease === 'higher' ? '1.6s' : '2.4s',
        animationTimingFunction: 'linear',
        animationFillMode: 'forwards',
      }
    : undefined;
  const finishRun = (event: AnimationEvent<SVGGElement>) => {
    if (event.currentTarget === event.target) {
      onAnimationComplete(runNumber);
    }
  };

  return (
    <svg
      className="rc-scene"
      data-testid="roller-coaster-scene"
      viewBox="0 0 640 270"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="rc-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#dbeafe" />
          <stop offset="1" stopColor="#f0fdf4" />
        </linearGradient>
      </defs>
      <rect className="rc-sky" width="640" height="270" rx="18" fill="url(#rc-sky)" />
      <circle className="rc-sun" cx="568" cy="48" r="24" />
      <path className="rc-hill" d="M0 235 C100 190 170 225 245 218 C350 207 420 236 520 214 C570 203 610 210 640 224 V270 H0 Z" />
      <path className="rc-track-shadow" d="M58 43 C105 43 101 210 335 210 H580" />
      <path className="rc-track" d="M58 37 C105 37 101 203 335 203 H580" />
      <path className="rc-support" d="M104 93 V227 M161 153 V225 M235 190 V226 M335 203 V226 M448 203 V226 M555 203 V226" />
      <g className="rc-release-markers">
        <path d="M54 43 H98" />
        <path d="M127 120 H169" />
        <text x="19" y="31">higher release</text>
        <text x="115" y="109">lower release</text>
      </g>
      <g className="rc-speed-markers">
        <path d="M352 174 V228" />
        <path d="M430 174 V228" />
        <text x="341" y="164">fixed</text>
        <text x="416" y="164">interval</text>
      </g>
      {collision && (
        <g key={`collision-${release}-${runNumber}`} className="rc-collision-target">
          <path d="M495 229 H606" />
          <g
            className="rc-block"
            onAnimationEnd={animatedRelease ? finishRun : undefined}
          >
            <rect x="506" y="175" width="42" height="36" rx="5" />
            <text x="510" y="197">foam</text>
          </g>
        </g>
      )}
      <g
        key={`${release}-${runNumber}`}
        className="rc-vehicle"
        style={animationStyle}
        transform={!hasRelease ? idleTransform : phase === 'complete' ? finalTransform : undefined}
        onAnimationEnd={animatedRelease && !collision ? finishRun : undefined}
      >
        <CoasterVehicle collision={collision} />
      </g>
    </svg>
  );
}

export function RollerCoasterDemo({ focus }: { focus: Focus }) {
  const reduced = useReducedMotionPref();
  const [demoRun, setDemoRun] = useState<DemoRun>({
    release: 'idle',
    sequence: 0,
    phase: 'idle',
    wasReset: false,
  });
  const copy = COPY[focus];
  const phase: RunPhase = reduced && demoRun.phase === 'running'
    ? 'complete'
    : demoRun.phase;

  useEffect(() => {
    if (!reduced) return;
    setDemoRun((current) => current.phase === 'running'
      ? { ...current, phase: 'complete' }
      : current);
  }, [reduced]);

  const runRelease = (release: Exclude<Release, 'idle'>) => {
    setDemoRun((current) => ({
      release,
      sequence: current.sequence + 1,
      phase: reduced ? 'complete' : 'running',
      wasReset: false,
    }));
  };
  const reset = () => {
    setDemoRun((current) => ({
      release: 'idle',
      sequence: current.sequence + 1,
      phase: 'idle',
      wasReset: true,
    }));
  };
  const completeRun = (sequence: number) => {
    setDemoRun((current) => current.sequence === sequence && current.phase === 'running'
      ? { ...current, phase: 'complete' }
      : current);
  };
  const status = demoRun.release === 'idle'
    ? `${demoRun.wasReset ? 'Reset complete. ' : ''}Choose a release height. Nothing moves until you run the model.`
    : phase === 'running'
      ? runningFor(focus, demoRun.release)
      : resultFor(focus, demoRun.release);
  const blockDistance = demoRun.release === 'idle'
    ? 'none'
    : phase === 'running'
      ? 'moving'
      : demoRun.release === 'lower'
        ? 'shorter'
        : 'farther';

  return (
    <section
      className="rc-demo"
      aria-label={`Interactive roller-coaster model: ${copy.title}`}
      data-run={demoRun.release}
      data-motion={demoRun.release === 'idle' ? 'idle' : phase === 'running' ? 'animate' : 'instant'}
      data-phase={phase}
      data-focus={focus}
      data-block-distance={blockDistance}
    >
      <div className="rc-demo-heading">
        <div>
          <span className="rc-demo-kicker">Interactive roller-coaster model</span>
          <h3>{copy.title}</h3>
        </div>
        <span className="rc-demo-badge">Practice only</span>
      </div>
      <p className="rc-demo-prompt">{copy.prompt}</p>
      <p className="rc-demo-note">
        Simplified model: it helps us notice a pattern, but it is not real experimental evidence.
      </p>

      <CoasterScene
        focus={focus}
        release={demoRun.release}
        phase={phase}
        reduced={reduced}
        runNumber={demoRun.sequence}
        onAnimationComplete={completeRun}
      />

      <div className="rc-controls" aria-label="Roller-coaster model controls">
        <button
          className="btn rc-control rc-control-lower"
          type="button"
          aria-pressed={demoRun.release === 'lower'}
          onClick={() => runRelease('lower')}
        >
          Run lower release
        </button>
        <button
          className="btn btn-primary rc-control"
          type="button"
          aria-pressed={demoRun.release === 'higher'}
          onClick={() => runRelease('higher')}
        >
          Run higher release
        </button>
        <button className="btn rc-control" type="button" onClick={reset}>
          Reset
        </button>
      </div>

      <p className="rc-status" role="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
