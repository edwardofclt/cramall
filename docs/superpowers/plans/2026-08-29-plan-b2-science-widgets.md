# Cram All Plan B Science Widgets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add every approved science experiment with deterministic models, recoverable inputs, ordered events, keyboard controls, text feedback, and one-shot completion.

**Architecture:** This plan occupies Science in the mandatory master order Task 0 → Task 1 → Math → Task 2 → Science → Task 3 → Reading → Task 4 → Task 5 → Task 6. Hard dependency: master Task 2 must pass after Tasks 0–1 and Math. Each task atomically adds one strict schema branch, event member, lazy registry member, exhaustive `RenderWidget` case, component, tests, and styles.

**Tech Stack:** React 18, TypeScript 5, Zod 3, Framer Motion 11, Vite 5, Vitest 2, React Testing Library, user-event, jsdom; no new production dependencies.

**Spec:** `docs/superpowers/specs/2026-08-29-cram-all-design.md`

## Global Constraints

- Follow Task 0 → Task 1 → Math → Task 2 → Science → Task 3 → Reading → Task 4 → Task 5 → Task 6; complete master acceptance Task 2 before S1, and do not modify `src/characters/**`.
- Every config is strict; mutations emit interaction then next-state change; completion is latched once per config key.
- Copy states authored qualitative limits and never claims evidence or physical precision the implementation lacks.
- Controls are keyboard-operable and at least 44px; results use text status; reduced motion preserves final state.
- Every green gate includes `npx tsc -b --pretty false`; every commit runs the protected-character guard below first.
- **Exact new-file prelude:** Every science component begins with `import {useEffect,useState} from 'react';`, `import type {WidgetProps} from '../registry';`, and `import {useCompletionLatch} from '../useCompletionLatch';`. S3 and S8 also import `useReducedMotionPref` from `../../app/useReducedMotionPref`. Every focused test begins with `import {render,screen} from '@testing-library/react';`, `import userEvent from '@testing-library/user-event';`, and `import {expect,test,vi} from 'vitest';`, then imports its named default component (plus S1's named `stuckCartDirection` if tested separately) from the sibling file. Tests naming a `*WidgetConfigSchema` import that exact export from `../../content/schema`.

---

**Saved as:** `docs/superpowers/plans/2026-08-29-plan-b2-science-widgets.md`


### Task S1: Collision ramp

**Files:** Create `src/widgets/science/CollisionRamp.tsx`, `src/widgets/science/CollisionRamp.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict visual angle 0..45, masses 1..100, rightward `speedA` and leftward `speedB` 0..100, mode `predict-direction|compare-motion`. The simplified stuck-cart prediction compares the two opposing 1-D momenta `massA*speedA` and `massB*speedB`; ramp angle is explicitly visual/setup-only and never changes correctness. UI says the formula is a lesson model, not assessed physics evidence. Named controls emit next angle/speeds; prediction or run completes only the configured model task.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('grades opposing next-state momenta rather than a hard-coded direction',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<CollisionRamp config={{rampAngle:20,massA:1,massB:1,speedA:5,speedB:4,target:'predict-direction'}} onEvent={onEvent}/>);expect(screen.getByRole('button',{name:'Decrease cart A speed'})).toBeEnabled();expect(screen.getByRole('button',{name:'Decrease cart B speed'})).toBeEnabled();await user.click(screen.getByRole('button',{name:'Increase cart B speed'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Stays the same'}));expect(screen.getByRole('status')).toHaveTextContent(/same.*correct/i);expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'choose-prediction'},{type:'change',value:{rampAngle:20,speedA:5,speedB:5}},{type:'complete',value:{prediction:'same',correct:true}}]);await user.click(screen.getByRole('button',{name:'Stays the same'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1);await user.click(screen.getByRole('button',{name:'Start over'}));expect(screen.getByRole('status')).toHaveTextContent(/make a prediction/i)});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- CollisionRamp` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
export const CollisionRampWidgetConfigSchema=z.object({rampAngle:z.number().min(0).max(45).optional(),massA:z.number().min(1).max(100),massB:z.number().min(1).max(100),speedA:z.number().min(0).max(100).optional(),speedB:z.number().min(0).max(100).optional(),target:z.enum(['predict-direction','compare-motion']).optional()}).strict();
export const CollisionRampWidgetRefSchema=z.object({type:z.literal('collision-ramp'),config:CollisionRampWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
 ClockElapsedTimeWidgetRefSchema,
 QuarterInchRulerWidgetRefSchema,
 BalanceScaleWidgetRefSchema,
 ShapeClassifierWidgetRefSchema,
 DataPlotBuilderWidgetRefSchema,
 ProbabilitySpinnerWidgetRefSchema,
 CollisionRampWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'collision-ramp':{type:'interaction';action:'change-angle'|'change-speed'|'run'|'choose-prediction'|'reset'}|{type:'change';value:{rampAngle:number;speedA:number;speedB:number}}|{type:'complete';value:{prediction:'left'|'right'|'same';correct:boolean}};
'collision-ramp':lazy(()=>import('./science/CollisionRamp')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'collision-ramp':{const Widget=widgetRegistry['collision-ramp'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
type Direction='left'|'right'|'same';export const stuckCartDirection=(massA:number,speedA:number,massB:number,speedB:number):Direction=>{const rightMomentum=massA*speedA,leftMomentum=massB*speedB;return rightMomentum>leftMomentum?'right':rightMomentum<leftMomentum?'left':'same'};
export default function CollisionRamp({config,onEvent}:WidgetProps<'collision-ramp'>){const key=JSON.stringify(config),initial={rampAngle:config.rampAngle??0,speedA:config.speedA??0,speedB:config.speedB??0},prompt='Use the simplified stuck-cart lesson model and make a prediction.';const [state,setState]=useState(initial),[status,setStatus]=useState(prompt);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setState(initial);setStatus(prompt)},[key]);const change=(next:typeof state,action:'change-angle'|'change-speed'|'reset')=>{setState(next);setStatus(action==='reset'?prompt:'Inputs changed; make a prediction with the lesson model.');onEvent({type:'interaction',action});onEvent({type:'change',value:next})};const finish=(prediction:Direction,action:'run'|'choose-prediction')=>{const truth=stuckCartDirection(config.massA,state.speedA,config.massB,state.speedB),correct=prediction===truth;onEvent({type:'interaction',action});onEvent({type:'change',value:state});setStatus(correct?`${prediction} is correct for this lesson model.`:`This lesson model gives ${truth}; revise your prediction.`);if(correct)completeOnce(()=>onEvent({type:'complete',value:{prediction,correct:true}}))};return <section className="card widget-experiment collision" data-testid="widget-collision-ramp" data-state={completed?'complete':'testing'} aria-description="Simplified stuck-cart prediction model; ramp angle is visual only and the formula is not assessed physics evidence"><p>This is a simplified stuck-cart lesson model. Ramp angle is visual only; the formula is not assessed.</p><button aria-label="Decrease ramp angle" disabled={state.rampAngle===0} onClick={()=>change({...state,rampAngle:state.rampAngle-1},'change-angle')}>− angle</button><button aria-label="Increase ramp angle" disabled={state.rampAngle===45} onClick={()=>change({...state,rampAngle:state.rampAngle+1},'change-angle')}>+ angle</button><button aria-label="Decrease cart A speed" disabled={state.speedA===0} onClick={()=>change({...state,speedA:state.speedA-1},'change-speed')}>A−</button><button aria-label="Increase cart A speed" disabled={state.speedA===100} onClick={()=>change({...state,speedA:state.speedA+1},'change-speed')}>A+</button><button aria-label="Decrease cart B speed" disabled={state.speedB===0} onClick={()=>change({...state,speedB:state.speedB-1},'change-speed')}>B−</button><button aria-label="Increase cart B speed" disabled={state.speedB===100} onClick={()=>change({...state,speedB:state.speedB+1},'change-speed')}>B+</button>{(config.target??'predict-direction')==='predict-direction'?(['left','right','same'] as const).map(d=><button key={d} aria-label={d==='same'?'Stays the same':`Moves ${d}`} onClick={()=>finish(d,'choose-prediction')}>{d}</button>):<button aria-label="Run collision" onClick={()=>finish(stuckCartDirection(config.massA,state.speedA,config.massB,state.speedB),'run')}>Run</button>}<button onClick={()=>change(initial,'reset')}>Start over</button><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.collision{display:grid;gap:.75rem}.widget-experiment.collision [data-widget-grid]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.5rem}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- CollisionRamp WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact S1 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/science/CollisionRamp.tsx src/widgets/science/CollisionRamp.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add collision ramp widget"
```

### Task S2: Energy-transfer builder

**Files:** Create `src/widgets/science/EnergyTransferBuilder.tsx`, `src/widgets/science/EnergyTransferBuilder.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict source/transfer/target token arrays and required path starting/interior/ending in the matching lists. Buttons retain a valid prefix; invalid adjacency reports feedback and leaves the path recoverable. Events append/reset; change/complete path.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('rejects an invalid next token then completes the exact path',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<EnergyTransferBuilder config={{sources:['Sun'],transfers:['Electricity'],targets:['Lamp'],requiredPath:['Sun','Electricity','Lamp']}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Add Lamp to path'}));expect(screen.getByRole('status')).toHaveTextContent(/not the next transfer/i);expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'append-path'},{type:'change',value:{path:[]}}]);for(const label of ['Sun','Electricity','Lamp'])await user.click(screen.getByRole('button',{name:`Add ${label} to path` }));expect(screen.getByTestId('widget-energy-transfer-builder')).toHaveAttribute('data-state','complete');expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toEqual([[{type:'complete',value:{path:['Sun','Electricity','Lamp']}}]])});
test('rejects duplicate or cross-category energy tokens',()=>expect(EnergyTransferBuilderWidgetConfigSchema.safeParse({sources:['Sun'],transfers:['Sun'],targets:['Lamp'],requiredPath:['Sun','Sun','Lamp']}).success).toBe(false));
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- EnergyTransferBuilder` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
export const EnergyTransferBuilderWidgetConfigSchema=z.object({sources:z.array(z.string().min(1)).min(1),transfers:z.array(z.string().min(1)).min(1),targets:z.array(z.string().min(1)).min(1),requiredPath:z.array(z.string().min(1)).min(3)}).strict().superRefine((v,ctx)=>{const all=[...v.sources,...v.transfers,...v.targets];if(new Set(all).size!==all.length)ctx.addIssue({code:z.ZodIssueCode.custom,message:'source, transfer, and target tokens must be unique and disjoint'});if(!v.sources.includes(v.requiredPath[0]!)||!v.targets.includes(v.requiredPath.at(-1)!)||!v.requiredPath.slice(1,-1).every(x=>v.transfers.includes(x)))ctx.addIssue({code:z.ZodIssueCode.custom,path:['requiredPath'],message:'invalid source-transfer-target path'})});
export const EnergyTransferBuilderWidgetRefSchema=z.object({type:z.literal('energy-transfer-builder'),config:EnergyTransferBuilderWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
 ClockElapsedTimeWidgetRefSchema,
 QuarterInchRulerWidgetRefSchema,
 BalanceScaleWidgetRefSchema,
 ShapeClassifierWidgetRefSchema,
 DataPlotBuilderWidgetRefSchema,
 ProbabilitySpinnerWidgetRefSchema,
 CollisionRampWidgetRefSchema,
 EnergyTransferBuilderWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'energy-transfer-builder':{type:'interaction';action:'append-path'|'reset'}|{type:'change';value:{path:string[]}}|{type:'complete';value:{path:string[]}};
'energy-transfer-builder':lazy(()=>import('./science/EnergyTransferBuilder')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'energy-transfer-builder':{const Widget=widgetRegistry['energy-transfer-builder'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function EnergyTransferBuilder({config,onEvent}:WidgetProps<'energy-transfer-builder'>){const key=JSON.stringify(config);const [path,setPath]=useState<string[]>([]),[status,setStatus]=useState('Choose the source.');const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setPath([]);setStatus('Choose the source.')},[key]);const emit=(next:string[],action:'append-path'|'reset')=>{setPath(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{path:next}});if(next.length===config.requiredPath.length&&next.every((x,i)=>x===config.requiredPath[i]))completeOnce(()=>onEvent({type:'complete',value:{path:next}}))};const add=(token:string)=>{if(token!==config.requiredPath[path.length]){setStatus(`${token} is not the next transfer; try another token.`);emit(path,'append-path');return}const next=path.concat(token);setStatus(next.length===config.requiredPath.length?'Energy path complete.':`Path: ${next.join(' to ')}`);emit(next,'append-path')};return <section className="card widget-experiment transfer" data-testid="widget-energy-transfer-builder" data-state={completed?'complete':'building'}>{[...config.sources,...config.transfers,...config.targets].map(token=><button key={token} aria-label={`Add ${token} to path`} onClick={()=>add(token)}>{token}</button>)}<button onClick={()=>{setStatus('Choose the source.');emit([],'reset')}}>Start over</button><output>{path.join(' → ')}</output><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.transfer{display:grid;gap:.75rem}.widget-experiment.transfer output{font-weight:700}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- EnergyTransferBuilder WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact S2 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/science/EnergyTransferBuilder.tsx src/widgets/science/EnergyTransferBuilder.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add energy transfer widget"
```

### Task S3: Wave maker

**Files:** Create `src/widgets/science/WaveMaker.tsx`, `src/widgets/science/WaveMaker.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict medium, amplitude/frequency 1..10, optional partial target. Named controls clamp, emit next state, complete only when every configured target field matches. A visible label identifies the diagram as a simplified model; its sampled polyline always spans x=0..100, amplitude controls vertical displacement, and frequency controls whole cycle count within that fixed span. The SVG is aria-hidden and reduced motion renders the same static final geometry.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('changes both wave values and completes the configured target once',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<WaveMaker config={{medium:'rope',amplitude:2,frequency:2,target:{amplitude:3,frequency:3}}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Increase amplitude'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Increase frequency'}));expect(screen.getByTestId('widget-wave-maker')).toHaveAttribute('data-amplitude','3');expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'change-frequency'},{type:'change',value:{amplitude:3,frequency:3}},{type:'complete',value:{amplitude:3,frequency:3}}])});
test('an initial target match is not presented or emitted as complete',()=>{const onEvent=vi.fn();render(<WaveMaker config={{medium:'rope',amplitude:2,frequency:2,target:{amplitude:2,frequency:2}}} onEvent={onEvent}/>);expect(screen.getByTestId('widget-wave-maker')).toHaveAttribute('data-state','changing');expect(onEvent).not.toHaveBeenCalled()});
test('keeps a fixed-width wave while amplitude changes height and frequency changes cycle geometry',async()=>{const user=userEvent.setup();render(<WaveMaker config={{medium:'rope',amplitude:2,frequency:2}} onEvent={vi.fn()}/>);const read=()=>screen.getByTestId('wave-geometry').getAttribute('points')!.split(' ');let points=read();expect(points).toHaveLength(81);expect(points[0]).toBe('0.00,50.00');expect(points[80]).toBe('100.00,50.00');expect(points[10]).toBe('12.50,44.00');await user.click(screen.getByRole('button',{name:'Increase amplitude'}));points=read();expect(points[10]).toBe('12.50,41.00');await user.click(screen.getByRole('button',{name:'Increase frequency'}));points=read();expect(points[0]).toBe('0.00,50.00');expect(points[80]).toBe('100.00,50.00');expect(points[10]).toBe('12.50,43.64');expect(points[20]).toBe('25.00,59.00');expect(screen.getByText(/Simplified wave model/)).toBeVisible()});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- WaveMaker` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const WaveLevel=z.number().int().min(1).max(10);export const WaveMakerWidgetConfigSchema=z.object({medium:z.enum(['rope','water','sound']),amplitude:WaveLevel.optional(),frequency:WaveLevel.optional(),target:z.object({amplitude:WaveLevel.optional(),frequency:WaveLevel.optional()}).strict().refine(v=>v.amplitude!==undefined||v.frequency!==undefined,'target needs value').optional()}).strict();
export const WaveMakerWidgetRefSchema=z.object({type:z.literal('wave-maker'),config:WaveMakerWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
 ClockElapsedTimeWidgetRefSchema,
 QuarterInchRulerWidgetRefSchema,
 BalanceScaleWidgetRefSchema,
 ShapeClassifierWidgetRefSchema,
 DataPlotBuilderWidgetRefSchema,
 ProbabilitySpinnerWidgetRefSchema,
 CollisionRampWidgetRefSchema,
 EnergyTransferBuilderWidgetRefSchema,
 WaveMakerWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'wave-maker':{type:'interaction';action:'change-amplitude'|'change-frequency'|'reset'}|{type:'change';value:{amplitude:number;frequency:number}}|{type:'complete';value:{amplitude:number;frequency:number}};
'wave-maker':lazy(()=>import('./science/WaveMaker')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'wave-maker':{const Widget=widgetRegistry['wave-maker'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
const sampleWave=(amplitude:number,frequency:number)=>Array.from({length:81},(_,i)=>{const x=i*1.25,y=50-Math.sin(2*Math.PI*frequency*x/100)*amplitude*3;return `${x.toFixed(2)},${y.toFixed(2)}`}).join(' ');
export default function WaveMaker({config,onEvent}:WidgetProps<'wave-maker'>){const reduced=useReducedMotionPref(),key=JSON.stringify(config),initial={amplitude:config.amplitude??1,frequency:config.frequency??1};const [wave,setWave]=useState(initial);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>setWave(initial),[key]);const matches=(v:typeof wave)=>!!config.target&&(config.target.amplitude===undefined||v.amplitude===config.target.amplitude)&&(config.target.frequency===undefined||v.frequency===config.target.frequency);const commit=(next:typeof wave,action:'change-amplitude'|'change-frequency'|'reset')=>{setWave(next);onEvent({type:'interaction',action});onEvent({type:'change',value:next});if(matches(next))completeOnce(()=>onEvent({type:'complete',value:next}))};return <section className="card widget-experiment wave" data-testid="widget-wave-maker" data-amplitude={wave.amplitude} data-frequency={wave.frequency} data-motion={reduced?'off':'on'} data-state={completed?'complete':'changing'}><button aria-label="Decrease amplitude" disabled={wave.amplitude===1} onClick={()=>commit({...wave,amplitude:wave.amplitude-1},'change-amplitude')}>A−</button><button aria-label="Increase amplitude" disabled={wave.amplitude===10} onClick={()=>commit({...wave,amplitude:wave.amplitude+1},'change-amplitude')}>A+</button><button aria-label="Decrease frequency" disabled={wave.frequency===1} onClick={()=>commit({...wave,frequency:wave.frequency-1},'change-frequency')}>F−</button><button aria-label="Increase frequency" disabled={wave.frequency===10} onClick={()=>commit({...wave,frequency:wave.frequency+1},'change-frequency')}>F+</button><button onClick={()=>commit(initial,'reset')}>Start over</button><p><strong>Simplified wave model.</strong> Amplitude changes vertical displacement; frequency changes cycle count across the same span.</p><svg aria-hidden="true" focusable="false" viewBox="0 0 100 100" data-static={reduced?'yes':'no'}><polyline className="wave-line" data-testid="wave-geometry" points={sampleWave(wave.amplitude,wave.frequency)}/></svg><p role="status">{completed?'Wave target was completed.':`${config.medium}: amplitude ${wave.amplitude}, frequency ${wave.frequency}.`}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.wave{display:grid;gap:.75rem}.widget-experiment.wave svg{inline-size:100%;block-size:auto}.widget-experiment.wave .wave-line{fill:none;stroke:var(--c-marker-a);stroke-width:2;vector-effect:non-scaling-stroke}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- WaveMaker WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact S3 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/science/WaveMaker.tsx src/widgets/science/WaveMaker.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add wave maker widget"
```

### Task S4: Light-reflection eye model

**Files:** Create `src/widgets/science/LightReflectionEye.tsx`, `src/widgets/science/LightReflectionEye.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict incident/target angle 0..90, optional eye. Reflection always equals incident. Change controls emit; Check completes only configured target.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('changes angle, states the reflection, and completes on check once',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<LightReflectionEye config={{incidentAngle:29,targetAngle:30,showEye:true}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Increase incident angle'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Check reflection'}));expect(screen.getByTestId('reflection-angle')).toHaveTextContent('30°');expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'check'},{type:'change',value:{incidentAngle:30,reflectionAngle:30}},{type:'complete',value:{incidentAngle:30,reflectionAngle:30}}]);await user.click(screen.getByRole('button',{name:'Check reflection'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- LightReflectionEye` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
export const LightReflectionEyeWidgetConfigSchema=z.object({incidentAngle:z.number().int().min(0).max(90),targetAngle:z.number().int().min(0).max(90).optional(),showEye:z.boolean().optional()}).strict();
export const LightReflectionEyeWidgetRefSchema=z.object({type:z.literal('light-reflection-eye'),config:LightReflectionEyeWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
 ClockElapsedTimeWidgetRefSchema,
 QuarterInchRulerWidgetRefSchema,
 BalanceScaleWidgetRefSchema,
 ShapeClassifierWidgetRefSchema,
 DataPlotBuilderWidgetRefSchema,
 ProbabilitySpinnerWidgetRefSchema,
 CollisionRampWidgetRefSchema,
 EnergyTransferBuilderWidgetRefSchema,
 WaveMakerWidgetRefSchema,
 LightReflectionEyeWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
type LightValue={incidentAngle:number;reflectionAngle:number};
'light-reflection-eye':{type:'interaction';action:'change-angle'|'check'|'reset'}|{type:'change';value:LightValue}|{type:'complete';value:LightValue};
'light-reflection-eye':lazy(()=>import('./science/LightReflectionEye')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'light-reflection-eye':{const Widget=widgetRegistry['light-reflection-eye'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function LightReflectionEye({config,onEvent}:WidgetProps<'light-reflection-eye'>){const key=JSON.stringify(config);const [angle,setAngle]=useState(config.incidentAngle),[status,setStatus]=useState('Adjust the light ray.');const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setAngle(config.incidentAngle);setStatus('Adjust the light ray.')},[key]);const value=(n:number)=>({incidentAngle:n,reflectionAngle:n});const emit=(next:number,action:'change-angle'|'check'|'reset',check=false)=>{const payload=value(next);setAngle(next);if(action==='change-angle')setStatus('Angle changed; check the reflection when ready.');if(action==='reset')setStatus('Adjust the light ray.');onEvent({type:'interaction',action});onEvent({type:'change',value:payload});if(check){const ok=config.targetAngle!==undefined&&next===config.targetAngle;setStatus(ok?'Reflection target is correct.':'The angles are equal, but this is not the target yet.');if(ok)completeOnce(()=>onEvent({type:'complete',value:payload}))}};return <section className="card widget-experiment light" data-testid="widget-light-reflection-eye" data-state={completed?'complete':'testing'}><button aria-label="Decrease incident angle" disabled={angle===0} onClick={()=>emit(angle-1,'change-angle')}>−</button><button aria-label="Increase incident angle" disabled={angle===90} onClick={()=>emit(angle+1,'change-angle')}>+</button><button aria-label="Check reflection" onClick={()=>emit(angle,'check',true)}>Check</button><button onClick={()=>emit(config.incidentAngle,'reset')}>Start over</button><output data-testid="reflection-angle">{angle}°</output>{config.showEye&&<span aria-label="eye model">👁</span>}<p role="status">Incident and reflection angles are {angle}°. {status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.light{display:grid;gap:.75rem}.widget-experiment.light output{font-variant-numeric:tabular-nums}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- LightReflectionEye WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact S4 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/science/LightReflectionEye.tsx src/widgets/science/LightReflectionEye.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add light reflection widget"
```

### Task S5: Morse/binary message sender

**Files:** Create `src/widgets/science/MessageSender.tsx`, `src/widgets/science/MessageSender.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict encoding/message and optional nonblank alphabet overrides. Built-in Morse covers A–Z; binary defaults to 8-bit character codes. Append/remove/send/reset each emit. Send completes only when the encoded symbols decode to configured message.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('uses the effective Morse alphabet and emits send completion once',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<MessageSender config={{encoding:'morse',message:'A'}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Add dot'}));await user.click(screen.getByRole('button',{name:'Add dash'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Send message'}));expect(screen.getByRole('status')).toHaveTextContent('A');expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'send'},{type:'change',value:{encoded:'.-'}},{type:'complete',value:{encoded:'.-',decoded:'A'}}]);await user.click(screen.getByRole('button',{name:'Send message'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('rejects unenterable overrides and unsupported message characters',()=>{expect(MessageSenderWidgetConfigSchema.safeParse({encoding:'morse',message:'A',alphabet:{A:'beep'}}).success).toBe(false);expect(MessageSenderWidgetConfigSchema.safeParse({encoding:'morse',message:'!',alphabet:{}}).success).toBe(false);expect(MessageSenderWidgetConfigSchema.safeParse({encoding:'binary',message:'é'}).success).toBe(false);expect(MessageSenderWidgetConfigSchema.safeParse({encoding:'binary',message:'A',alphabet:{'é':'11101001'}}).success).toBe(false)});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- MessageSender` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
export const MessageSenderWidgetConfigSchema=z.object({encoding:z.enum(['morse','binary']),message:z.string().min(1),alphabet:z.record(z.string().min(1)).optional()}).strict().superRefine((v,ctx)=>{const message=v.encoding==='morse'?v.message.toUpperCase():v.message,codePattern=v.encoding==='morse'?/^[.-]+$/:/^[01]{8}$/;if(Object.entries(v.alphabet??{}).some(([char,code])=>[...char].length!==1||!codePattern.test(code)||(v.encoding==='binary'&&char.charCodeAt(0)>127)))ctx.addIssue({code:z.ZodIssueCode.custom,path:['alphabet'],message:'override keys/codes must be enterable ASCII symbols'});const covered=[...message].every(char=>v.encoding==='morse'?(v.alphabet?.[char]!==undefined||/[A-Z]/.test(char)):char.charCodeAt(0)<=127);if(!covered)ctx.addIssue({code:z.ZodIssueCode.custom,path:['message'],message:'effective alphabet must cover every ASCII message character'})});
export const MessageSenderWidgetRefSchema=z.object({type:z.literal('message-sender'),config:MessageSenderWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
 ClockElapsedTimeWidgetRefSchema,
 QuarterInchRulerWidgetRefSchema,
 BalanceScaleWidgetRefSchema,
 ShapeClassifierWidgetRefSchema,
 DataPlotBuilderWidgetRefSchema,
 ProbabilitySpinnerWidgetRefSchema,
 CollisionRampWidgetRefSchema,
 EnergyTransferBuilderWidgetRefSchema,
 WaveMakerWidgetRefSchema,
 LightReflectionEyeWidgetRefSchema,
 MessageSenderWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'message-sender':{type:'interaction';action:'append-symbol'|'remove-symbol'|'send'|'reset'}|{type:'change';value:{encoded:string}}|{type:'complete';value:{encoded:string;decoded:string}};
'message-sender':lazy(()=>import('./science/MessageSender')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'message-sender':{const Widget=widgetRegistry['message-sender'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
const MORSE:Record<string,string>={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..'};
const binaryAlphabet=(message:string)=>Object.fromEntries([...new Set([...message])].map(char=>[char,char.charCodeAt(0).toString(2).padStart(8,'0')]));
export default function MessageSender({config,onEvent}:WidgetProps<'message-sender'>){const key=JSON.stringify(config),message=config.encoding==='morse'?config.message.toUpperCase():config.message,alphabet={...(config.encoding==='morse'?MORSE:binaryAlphabet(message)),...(config.alphabet??{})},target=[...message].map(c=>alphabet[c]??'').join(' ');const [encoded,setEncoded]=useState(''),[status,setStatus]=useState('Build the message.');const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setEncoded('');setStatus('Build the message.')},[key]);const emit=(next:string,action:'append-symbol'|'remove-symbol'|'send'|'reset')=>{setEncoded(next);if(action==='append-symbol'||action==='remove-symbol')setStatus('Message changed; send it when ready.');onEvent({type:'interaction',action});onEvent({type:'change',value:{encoded:next}})};const append=(symbol:string)=>emit(encoded+symbol,'append-symbol');const send=()=>{emit(encoded,'send');const success=encoded===target;setStatus(success?`Decoded message: ${message}`:'Those symbols do not decode to the message yet.');if(success)completeOnce(()=>onEvent({type:'complete',value:{encoded,decoded:message}}))};return <section className="card widget-experiment message" data-testid="widget-message-sender" data-state={completed?'complete':'encoding'}>{config.encoding==='morse'?<><button aria-label="Add dot" onClick={()=>append('.')}>.</button><button aria-label="Add dash" onClick={()=>append('-')}>−</button></>:<><button aria-label="Add zero" onClick={()=>append('0')}>0</button><button aria-label="Add one" onClick={()=>append('1')}>1</button></>}<button aria-label="Add letter separator" onClick={()=>append(' ')}>space</button><button aria-label="Remove last symbol" disabled={!encoded} onClick={()=>emit(encoded.slice(0,-1),'remove-symbol')}>Delete</button><button aria-label="Send message" onClick={send}>Send</button><button onClick={()=>{setStatus('Build the message.');emit('','reset')}}>Start over</button><output>{encoded}</output><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.message{display:grid;gap:.75rem}.widget-experiment.message output{min-block-size:44px;overflow-wrap:anywhere}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- MessageSender WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact S5 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/science/MessageSender.tsx src/widgets/science/MessageSender.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add coded message sender widget"
```

### Task S6: Energy-conversion designer

**Files:** Create `src/widgets/science/EnergyConversionDesigner.tsx`, `src/widgets/science/EnergyConversionDesigner.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict unique components with input/output energy and existing required endpoints. Completion requires endpoints and `energyOut===energyIn` at every adjacent edge.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('rejects incompatible adjacency without corrupting the valid chain',async()=>{const onEvent=vi.fn(),user=userEvent.setup(),config={components:[{id:'sun',label:'Sun',energyIn:'nuclear',energyOut:'light'},{id:'panel',label:'Panel',energyIn:'light',energyOut:'electric'},{id:'lamp',label:'Lamp',energyIn:'electric',energyOut:'light'}],requiredStart:'sun',requiredEnd:'lamp'};render(<EnergyConversionDesigner config={config} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Add Sun'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Add Lamp'}));expect(screen.getByRole('status')).toHaveTextContent(/does not connect/i);expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'append-chain'},{type:'change',value:{chain:['sun']}}]);expect(screen.getByTestId('conversion-chain')).toHaveTextContent('sun');await user.click(screen.getByRole('button',{name:'Add Panel'}));await user.click(screen.getByRole('button',{name:'Add Lamp'}));expect(screen.getByTestId('widget-energy-conversion-designer')).toHaveAttribute('data-state','complete');expect(onEvent.mock.calls.filter(([e])=>e.type==='complete').at(-1)?.[0]).toEqual({type:'complete',value:{chain:['sun','panel','lamp']}})});
test('rejects equal endpoints and endpoint pairs with no compatible path',()=>{const components=[{id:'sun',label:'Sun',energyIn:'nuclear',energyOut:'light'},{id:'lamp',label:'Lamp',energyIn:'electric',energyOut:'light'}];expect(EnergyConversionDesignerWidgetConfigSchema.safeParse({components,requiredStart:'sun',requiredEnd:'sun'}).success).toBe(false);expect(EnergyConversionDesignerWidgetConfigSchema.safeParse({components,requiredStart:'sun',requiredEnd:'lamp'}).success).toBe(false)});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- EnergyConversionDesigner` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const EnergyComponentSchema=z.object({id:z.string().min(1),label:z.string().min(1),energyIn:z.string().min(1),energyOut:z.string().min(1)}).strict();
export const EnergyConversionDesignerWidgetConfigSchema=z.object({components:z.array(EnergyComponentSchema).min(2),requiredStart:z.string().min(1),requiredEnd:z.string().min(1)}).strict().superRefine((v,ctx)=>{const ids=v.components.map(x=>x.id),byId=new Map(v.components.map(x=>[x.id,x]));if(new Set(ids).size!==ids.length||!ids.includes(v.requiredStart)||!ids.includes(v.requiredEnd)||v.requiredStart===v.requiredEnd){ctx.addIssue({code:z.ZodIssueCode.custom,message:'component ids must be unique and required endpoints must exist and differ'});return}const visit=(id:string,seen:Set<string>):boolean=>id===v.requiredEnd||v.components.some(next=>!seen.has(next.id)&&byId.get(id)!.energyOut===next.energyIn&&visit(next.id,new Set([...seen,next.id])));if(!visit(v.requiredStart,new Set([v.requiredStart])))ctx.addIssue({code:z.ZodIssueCode.custom,message:'no compatible path connects required endpoints'})});
export const EnergyConversionDesignerWidgetRefSchema=z.object({type:z.literal('energy-conversion-designer'),config:EnergyConversionDesignerWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
 ClockElapsedTimeWidgetRefSchema,
 QuarterInchRulerWidgetRefSchema,
 BalanceScaleWidgetRefSchema,
 ShapeClassifierWidgetRefSchema,
 DataPlotBuilderWidgetRefSchema,
 ProbabilitySpinnerWidgetRefSchema,
 CollisionRampWidgetRefSchema,
 EnergyTransferBuilderWidgetRefSchema,
 WaveMakerWidgetRefSchema,
 LightReflectionEyeWidgetRefSchema,
 MessageSenderWidgetRefSchema,
 EnergyConversionDesignerWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'energy-conversion-designer':{type:'interaction';action:'append-chain'|'reset'}|{type:'change';value:{chain:string[]}}|{type:'complete';value:{chain:string[]}};
'energy-conversion-designer':lazy(()=>import('./science/EnergyConversionDesigner')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'energy-conversion-designer':{const Widget=widgetRegistry['energy-conversion-designer'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function EnergyConversionDesigner({config,onEvent}:WidgetProps<'energy-conversion-designer'>){const key=JSON.stringify(config);const [chain,setChain]=useState<string[]>([]),[status,setStatus]=useState('Choose the starting component.');const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setChain([]);setStatus('Choose the starting component.')},[key]);const component=(id:string)=>config.components.find(x=>x.id===id)!;const valid=(ids:string[])=>ids.every((id,i)=>i===0||component(ids[i-1]!).energyOut===component(id).energyIn);const emit=(next:string[],action:'append-chain'|'reset')=>{setChain(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{chain:next}});const done=next[0]===config.requiredStart&&next.at(-1)===config.requiredEnd&&valid(next);if(done)completeOnce(()=>onEvent({type:'complete',value:{chain:next}}))};const add=(id:string)=>{if(chain.length&&component(chain.at(-1)!).energyOut!==component(id).energyIn){setStatus(`${component(chain.at(-1)!).energyOut} does not connect to ${component(id).energyIn}.`);emit(chain,'append-chain');return}const next=chain.concat(id);setStatus(`Chain: ${next.map(x=>component(x).label).join(' to ')}`);emit(next,'append-chain')};return <section className="card widget-experiment conversion" data-testid="widget-energy-conversion-designer" data-state={completed?'complete':'building'}>{config.components.map(c=><button key={c.id} aria-label={`Add ${c.label}`} onClick={()=>add(c.id)}>{c.label}</button>)}<button aria-label="Start over" onClick={()=>{setStatus('Choose the starting component.');emit([],'reset')}}>Start over</button><output data-testid="conversion-chain">{chain.join(' → ')}</output><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.conversion{display:grid;gap:.75rem}.widget-experiment.conversion output{font-weight:700}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- EnergyConversionDesigner WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact S6 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/science/EnergyConversionDesigner.tsx src/widgets/science/EnergyConversionDesigner.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add energy conversion widget"
```

### Task S7: Animal-structure matcher

**Files:** Create `src/widgets/science/AnimalStructureMatcher.tsx`, `src/widgets/science/AnimalStructureMatcher.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict unique pairs. Tap structure then function; retain matches, leave wrong matches movable, and complete every correct pair once.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('retains both matches and completes only after every correct pair',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<AnimalStructureMatcher config={{pairs:[{id:'beak',animal:'Bird',structure:'beak',function:'gathers food'},{id:'fin',animal:'Fish',structure:'fin',function:'swims'}]}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Select Bird beak'}));await user.click(screen.getByRole('button',{name:'Match gathers food'}));await user.click(screen.getByRole('button',{name:'Select Fish fin'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Match swims'}));expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'match'},{type:'change',value:{matches:{beak:'gathers food',fin:'swims'}}},{type:'complete',value:{matches:{beak:'gathers food',fin:'swims'}}}])});
test('rejects duplicate function choices and duplicate interactive labels',()=>{expect(AnimalStructureMatcherWidgetConfigSchema.safeParse({pairs:[{id:'a',animal:'Bird',structure:'wing',function:'moves'},{id:'b',animal:'Fish',structure:'fin',function:'moves'}]}).success).toBe(false);expect(AnimalStructureMatcherWidgetConfigSchema.safeParse({pairs:[{id:'a',animal:'Bird',structure:'wing',function:'flies'},{id:'b',animal:'Bird',structure:'wing',function:'balances'}]}).success).toBe(false)});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- AnimalStructureMatcher` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const AnimalPairSchema=z.object({id:z.string().min(1),animal:z.string().min(1),structure:z.string().min(1),function:z.string().min(1)}).strict();export const AnimalStructureMatcherWidgetConfigSchema=z.object({pairs:z.array(AnimalPairSchema).min(2)}).strict().refine(v=>new Set(v.pairs.map(x=>x.id)).size===v.pairs.length&&new Set(v.pairs.map(x=>x.function)).size===v.pairs.length&&new Set(v.pairs.map(x=>`${x.animal} ${x.structure}`)).size===v.pairs.length,'ids, functions, and interactive labels must be unique');
export const AnimalStructureMatcherWidgetRefSchema=z.object({type:z.literal('animal-structure-matcher'),config:AnimalStructureMatcherWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
 ClockElapsedTimeWidgetRefSchema,
 QuarterInchRulerWidgetRefSchema,
 BalanceScaleWidgetRefSchema,
 ShapeClassifierWidgetRefSchema,
 DataPlotBuilderWidgetRefSchema,
 ProbabilitySpinnerWidgetRefSchema,
 CollisionRampWidgetRefSchema,
 EnergyTransferBuilderWidgetRefSchema,
 WaveMakerWidgetRefSchema,
 LightReflectionEyeWidgetRefSchema,
 MessageSenderWidgetRefSchema,
 EnergyConversionDesignerWidgetRefSchema,
 AnimalStructureMatcherWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'animal-structure-matcher':{type:'interaction';action:'select-structure'|'match'|'reset'}|{type:'change';value:{matches:Record<string,string>}}|{type:'complete';value:{matches:Record<string,string>}};
'animal-structure-matcher':lazy(()=>import('./science/AnimalStructureMatcher')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'animal-structure-matcher':{const Widget=widgetRegistry['animal-structure-matcher'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function AnimalStructureMatcher({config,onEvent}:WidgetProps<'animal-structure-matcher'>){const key=JSON.stringify(config);const [selected,setSelected]=useState<string|null>(null),[matches,setMatches]=useState<Record<string,string>>({}),[status,setStatus]=useState('Select a structure.');const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setSelected(null);setMatches({});setStatus('Select a structure.')},[key]);const emit=(next:Record<string,string>,action:'select-structure'|'match'|'reset')=>{setMatches(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{matches:next}});if(config.pairs.every(p=>next[p.id]===p.function))completeOnce(()=>onEvent({type:'complete',value:{matches:next}}))};const select=(id:string)=>{setSelected(id);setStatus('Choose its function.');emit(matches,'select-structure')};const match=(fn:string)=>{if(!selected)return;const next={...matches,[selected]:fn},correct=config.pairs.find(p=>p.id===selected)!.function===fn;setStatus(correct?'Correct match.':'That function does not match; choose another.');emit(next,'match')};return <section className="card widget-experiment animal" data-testid="widget-animal-structure-matcher" data-state={completed?'complete':'matching'}>{config.pairs.map(p=><button key={p.id} aria-label={`Select ${p.animal} ${p.structure}`} onClick={()=>select(p.id)}>{p.animal} {p.structure}</button>)}{config.pairs.map(p=><button key={p.function} aria-label={`Match ${p.function}`} disabled={!selected} onClick={()=>match(p.function)}>{p.function}</button>)}<button onClick={()=>{setSelected(null);setStatus('Select a structure.');emit({},'reset')}}>Start over</button><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.animal{display:grid;gap:.75rem}.widget-experiment.animal button[aria-pressed="true"]{outline:3px solid var(--c-accent-action)}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- AnimalStructureMatcher WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact S7 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/science/AnimalStructureMatcher.tsx src/widgets/science/AnimalStructureMatcher.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add animal structure matcher widget"
```

### Task S8: Erosion simulator

**Files:** Create `src/widgets/science/ErosionSimulator.tsx`, `src/widgets/science/ErosionSimulator.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict terrain, unique agents, vegetation, optional target agent. Selection/toggle/run/reset retain state; only Run with target completes. Static text gives same result as optional motion.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('runs water without vegetation and emits checked completion',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<ErosionSimulator config={{terrain:'soil',agents:['water','wind'],vegetation:false,targetAgent:'water'}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Use water'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Run erosion'}));expect(screen.getByRole('status')).toHaveTextContent(/water.*erosion/i);expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'run'},{type:'change',value:{agent:'water',vegetation:false}},{type:'complete',value:{agent:'water',vegetation:false}}])});
test('rock terrain cannot author or toggle vegetation',()=>{expect(ErosionSimulatorWidgetConfigSchema.safeParse({terrain:'rock',agents:['ice'],vegetation:true}).success).toBe(false);render(<ErosionSimulator config={{terrain:'rock',agents:['ice'],vegetation:false}} onEvent={vi.fn()}/>);expect(screen.queryByRole('button',{name:'Toggle vegetation'})).toBeNull()});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- ErosionSimulator` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const AgentSchema=z.enum(['water','wind','ice']);export const ErosionSimulatorWidgetConfigSchema=z.object({terrain:z.enum(['soil','sand','rock']),agents:z.array(AgentSchema).min(1).refine(v=>new Set(v).size===v.length,'duplicates'),vegetation:z.boolean().optional(),targetAgent:AgentSchema.optional()}).strict().superRefine((v,ctx)=>{if(v.targetAgent&&!v.agents.includes(v.targetAgent))ctx.addIssue({code:z.ZodIssueCode.custom,path:['targetAgent'],message:'target agent unavailable'});if(v.terrain==='rock'&&v.vegetation)ctx.addIssue({code:z.ZodIssueCode.custom,path:['vegetation'],message:'vegetation cover is not modeled on rock'})});
export const ErosionSimulatorWidgetRefSchema=z.object({type:z.literal('erosion-simulator'),config:ErosionSimulatorWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
 ClockElapsedTimeWidgetRefSchema,
 QuarterInchRulerWidgetRefSchema,
 BalanceScaleWidgetRefSchema,
 ShapeClassifierWidgetRefSchema,
 DataPlotBuilderWidgetRefSchema,
 ProbabilitySpinnerWidgetRefSchema,
 CollisionRampWidgetRefSchema,
 EnergyTransferBuilderWidgetRefSchema,
 WaveMakerWidgetRefSchema,
 LightReflectionEyeWidgetRefSchema,
 MessageSenderWidgetRefSchema,
 EnergyConversionDesignerWidgetRefSchema,
 AnimalStructureMatcherWidgetRefSchema,
 ErosionSimulatorWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'erosion-simulator':{type:'interaction';action:'select-agent'|'toggle-vegetation'|'run'|'reset'}|{type:'change';value:{agent:string;vegetation:boolean}}|{type:'complete';value:{agent:string;vegetation:boolean}};
'erosion-simulator':lazy(()=>import('./science/ErosionSimulator')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'erosion-simulator':{const Widget=widgetRegistry['erosion-simulator'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function ErosionSimulator({config,onEvent}:WidgetProps<'erosion-simulator'>){const reduced=useReducedMotionPref(),key=JSON.stringify(config),supportsVegetation=config.terrain!=='rock',initial={agent:config.agents[0]!,vegetation:supportsVegetation&&(config.vegetation??false)};const [state,setState]=useState(initial),[status,setStatus]=useState('Choose an erosion agent.');const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setState(initial);setStatus('Choose an erosion agent.')},[key]);const emit=(next:typeof state,action:'select-agent'|'toggle-vegetation'|'run'|'reset',run=false)=>{setState(next);if(action==='select-agent'||action==='toggle-vegetation')setStatus('Inputs changed; run the authored erosion model.');if(action==='reset')setStatus('Choose an erosion agent.');onEvent({type:'interaction',action});onEvent({type:'change',value:next});if(run){setStatus(`Authored ${next.agent} erosion outcome on ${config.terrain}, with vegetation cover ${next.vegetation?'on':'off'}: compare the displayed before/after terrain.`);if(config.targetAgent!==undefined&&next.agent===config.targetAgent)completeOnce(()=>onEvent({type:'complete',value:next}))}};return <section className="card widget-experiment erosion" data-testid="widget-erosion-simulator" data-motion={reduced?'off':'on'} data-state={completed?'complete':'testing'}>{config.agents.map(a=><button key={a} aria-label={`Use ${a}`} aria-pressed={state.agent===a} onClick={()=>emit({...state,agent:a},'select-agent')}>{a}</button>)}{supportsVegetation&&<button aria-label="Toggle vegetation" aria-pressed={state.vegetation} onClick={()=>emit({...state,vegetation:!state.vegetation},'toggle-vegetation')}>Vegetation</button>}<button aria-label="Run erosion" onClick={()=>emit(state,'run',true)}>Run</button><button onClick={()=>emit(initial,'reset')}>Start over</button><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.erosion{display:grid;gap:.75rem}.widget-experiment.erosion[data-motion="off"]{transition:none}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- ErosionSimulator WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact S8 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/science/ErosionSimulator.tsx src/widgets/science/ErosionSimulator.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add erosion simulator widget"
```

### Task S9: Rock-layer explorer

**Files:** Create `src/widgets/science/RockLayerExplorer.tsx`, `src/widgets/science/RockLayerExplorer.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict unique layers with unique nonnegative relative-age ranks; a larger `age` rank means older. Optional target must exist. Selection states the rank convention without inferring physical years; Check completes only target; reset recovers.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('retains the oldest relative-age rank and completes only after check',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<RockLayerExplorer config={{layers:[{id:'top',label:'Top',age:1},{id:'bottom',label:'Bottom',age:2}],targetLayerId:'bottom'}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Select Bottom layer'}));expect(screen.getByRole('status')).toHaveTextContent(/oldest rank shown/i);onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Check layer'}));expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'check'},{type:'change',value:{selectedLayerId:'bottom'}},{type:'complete',value:{selectedLayerId:'bottom'}}]);await user.click(screen.getByRole('button',{name:'Check layer'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('rejects ambiguous duplicate relative-age ranks',()=>expect(RockLayerExplorerWidgetConfigSchema.safeParse({layers:[{id:'top',label:'Top',age:1},{id:'bottom',label:'Bottom',age:1}]}).success).toBe(false));
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- RockLayerExplorer` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const RockLayerSchema=z.object({id:z.string().min(1),label:z.string().min(1),age:z.number().int().nonnegative(),artifact:z.string().min(1).optional()}).strict();export const RockLayerExplorerWidgetConfigSchema=z.object({layers:z.array(RockLayerSchema).min(2),prompt:z.string().min(1).optional(),targetLayerId:z.string().min(1).optional()}).strict().superRefine((v,ctx)=>{if(new Set(v.layers.map(x=>x.id)).size!==v.layers.length||new Set(v.layers.map(x=>x.age)).size!==v.layers.length||v.targetLayerId&&!v.layers.some(x=>x.id===v.targetLayerId))ctx.addIssue({code:z.ZodIssueCode.custom,message:'layer ids and relative-age ranks must be unique and target must exist'})});
export const RockLayerExplorerWidgetRefSchema=z.object({type:z.literal('rock-layer-explorer'),config:RockLayerExplorerWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
 ClockElapsedTimeWidgetRefSchema,
 QuarterInchRulerWidgetRefSchema,
 BalanceScaleWidgetRefSchema,
 ShapeClassifierWidgetRefSchema,
 DataPlotBuilderWidgetRefSchema,
 ProbabilitySpinnerWidgetRefSchema,
 CollisionRampWidgetRefSchema,
 EnergyTransferBuilderWidgetRefSchema,
 WaveMakerWidgetRefSchema,
 LightReflectionEyeWidgetRefSchema,
 MessageSenderWidgetRefSchema,
 EnergyConversionDesignerWidgetRefSchema,
 AnimalStructureMatcherWidgetRefSchema,
 ErosionSimulatorWidgetRefSchema,
 RockLayerExplorerWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'rock-layer-explorer':{type:'interaction';action:'select-layer'|'check'|'reset'}|{type:'change';value:{selectedLayerId:string|null}}|{type:'complete';value:{selectedLayerId:string}};
'rock-layer-explorer':lazy(()=>import('./science/RockLayerExplorer')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'rock-layer-explorer':{const Widget=widgetRegistry['rock-layer-explorer'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function RockLayerExplorer({config,onEvent}:WidgetProps<'rock-layer-explorer'>){const key=JSON.stringify(config);const [selected,setSelected]=useState<string|null>(null),[status,setStatus]=useState(config.prompt??'Select a rock layer. Larger relative-age ranks are older.');const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setSelected(null);setStatus(config.prompt??'Select a rock layer. Larger relative-age ranks are older.')},[key]);const emit=(next:string|null,action:'select-layer'|'check'|'reset',check=false)=>{setSelected(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{selectedLayerId:next}});if(check&&next){const ok=config.targetLayerId!==undefined&&next===config.targetLayerId;setStatus(ok?'Correct layer.':'Compare the printed relative-age ranks and try again.');if(ok)completeOnce(()=>onEvent({type:'complete',value:{selectedLayerId:next}}))}};const select=(id:string)=>{const layer=config.layers.find(x=>x.id===id)!,oldest=Math.max(...config.layers.map(x=>x.age));setStatus(`${layer.label} has relative-age rank ${layer.age}${layer.age===oldest?', the oldest rank shown':''}.${layer.artifact?` Artifact: ${layer.artifact}.`:''}`);emit(id,'select-layer')};return <section className="card widget-experiment rocks" data-testid="widget-rock-layer-explorer" data-state={completed?'complete':'exploring'}>{config.layers.map(l=><button key={l.id} aria-label={`Select ${l.label} layer`} aria-pressed={selected===l.id} onClick={()=>select(l.id)}>{l.label}</button>)}<button aria-label="Check layer" disabled={!selected} onClick={()=>emit(selected,'check',true)}>Check</button><button onClick={()=>{setStatus(config.prompt??'Select a rock layer. Larger relative-age ranks are older.');emit(null,'reset')}}>Start over</button><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.rocks{display:grid;gap:.75rem}.widget-experiment.rocks button[aria-pressed="true"]{outline:3px solid var(--c-accent-action)}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- RockLayerExplorer WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact S9 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/science/RockLayerExplorer.tsx src/widgets/science/RockLayerExplorer.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add rock layer explorer widget"
```

### Task S10: Topographic-map explorer

**Files:** Create `src/widgets/science/TopographicMapExplorer.tsx`, `src/widgets/science/TopographicMapExplorer.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict contours and unique named points, optional existing target. Named point buttons provide elevation text; Check/reset emit and complete only target.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('names selected elevation and completes only after target check',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<TopographicMapExplorer config={{contours:[{elevation:500,points:'0,0 1,1'}],points:[{id:'summit',label:'Summit',elevation:500},{id:'trail',label:'Trail',elevation:300}],targetPointId:'summit'}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Select Summit'}));expect(screen.getByRole('status')).toHaveTextContent('500 m');onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Check point'}));expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'check'},{type:'change',value:{selectedPointId:'summit'}},{type:'complete',value:{selectedPointId:'summit'}}])});
test('rejects malformed SVG coordinate lists',()=>expect(TopographicMapExplorerWidgetConfigSchema.safeParse({contours:[{elevation:500,points:'0,0 nope'}],points:[{id:'summit',label:'Summit',elevation:500},{id:'trail',label:'Trail',elevation:300}]}).success).toBe(false));
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- TopographicMapExplorer` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const CoordinateListSchema=z.string().regex(/^-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?(?:\s+-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?)+$/),ContourSchema=z.object({elevation:z.number().finite(),points:CoordinateListSchema}).strict(),TopoPointSchema=z.object({id:z.string().min(1),label:z.string().min(1),elevation:z.number().finite()}).strict();export const TopographicMapExplorerWidgetConfigSchema=z.object({contours:z.array(ContourSchema).min(1),points:z.array(TopoPointSchema).min(2),targetPointId:z.string().min(1).optional()}).strict().superRefine((v,ctx)=>{if(new Set(v.points.map(x=>x.id)).size!==v.points.length||v.targetPointId&&!v.points.some(x=>x.id===v.targetPointId))ctx.addIssue({code:z.ZodIssueCode.custom,message:'invalid point ids'})});
export const TopographicMapExplorerWidgetRefSchema=z.object({type:z.literal('topographic-map-explorer'),config:TopographicMapExplorerWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer','topographic-map-explorer'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
 ClockElapsedTimeWidgetRefSchema,
 QuarterInchRulerWidgetRefSchema,
 BalanceScaleWidgetRefSchema,
 ShapeClassifierWidgetRefSchema,
 DataPlotBuilderWidgetRefSchema,
 ProbabilitySpinnerWidgetRefSchema,
 CollisionRampWidgetRefSchema,
 EnergyTransferBuilderWidgetRefSchema,
 WaveMakerWidgetRefSchema,
 LightReflectionEyeWidgetRefSchema,
 MessageSenderWidgetRefSchema,
 EnergyConversionDesignerWidgetRefSchema,
 AnimalStructureMatcherWidgetRefSchema,
 ErosionSimulatorWidgetRefSchema,
 RockLayerExplorerWidgetRefSchema,
 TopographicMapExplorerWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'topographic-map-explorer':{type:'interaction';action:'select-point'|'check'|'reset'}|{type:'change';value:{selectedPointId:string|null}}|{type:'complete';value:{selectedPointId:string}};
'topographic-map-explorer':lazy(()=>import('./science/TopographicMapExplorer')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'topographic-map-explorer':{const Widget=widgetRegistry['topographic-map-explorer'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function TopographicMapExplorer({config,onEvent}:WidgetProps<'topographic-map-explorer'>){const key=JSON.stringify(config);const [selected,setSelected]=useState<string|null>(null),[status,setStatus]=useState('Select a map point.');const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setSelected(null);setStatus('Select a map point.')},[key]);const emit=(next:string|null,action:'select-point'|'check'|'reset',check=false)=>{setSelected(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{selectedPointId:next}});if(check&&next){const ok=config.targetPointId!==undefined&&next===config.targetPointId;setStatus(ok?'Correct topographic point.':'Compare the printed elevations and try again.');if(ok)completeOnce(()=>onEvent({type:'complete',value:{selectedPointId:next}}))}};const select=(id:string)=>{const point=config.points.find(x=>x.id===id)!;setStatus(`${point.label}: ${point.elevation} m.`);emit(id,'select-point')};return <section className="card widget-experiment topo" data-testid="widget-topographic-map-explorer" data-state={completed?'complete':'exploring'}><svg aria-label="Topographic contours">{config.contours.map((c,i)=><polyline key={i} points={c.points}><title>{c.elevation} m contour</title></polyline>)}</svg>{config.points.map(p=><button key={p.id} aria-label={`Select ${p.label}`} onClick={()=>select(p.id)}>{p.label}: {p.elevation} m</button>)}<button aria-label="Check point" disabled={!selected} onClick={()=>emit(selected,'check',true)}>Check</button><button onClick={()=>{setStatus('Select a map point.');emit(null,'reset')}}>Start over</button><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.topo{display:grid;gap:.75rem}.widget-experiment.topo svg{inline-size:100%;block-size:auto;stroke:currentColor;fill:none}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- TopographicMapExplorer WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact S10 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/science/TopographicMapExplorer.tsx src/widgets/science/TopographicMapExplorer.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add topographic map explorer widget"
```

### Task S11: Hazard-solution designer

**Files:** Create `src/widgets/science/HazardSolutionDesigner.tsx`, `src/widgets/science/HazardSolutionDesigner.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict unique solutions, existing unique required ids. Toggle retains selection; Check compares exact sorted sets and explains poor/partial extras. Wrong checks never complete.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('rejects a poor extra, completes the exact mitigation set, and resets status',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<HazardSolutionDesigner config={{hazard:'Flood',solutions:[{id:'wall',label:'Seawall',effectiveness:'good'},{id:'leave',label:'Evacuate',effectiveness:'good'},{id:'ignore',label:'Ignore warning',effectiveness:'poor'}],requiredIds:['wall','leave']}} onEvent={onEvent}/>);for(const label of ['Seawall','Evacuate','Ignore warning'])await user.click(screen.getByRole('button',{name:`Toggle ${label}`}));await user.click(screen.getByRole('button',{name:'Check solution'}));expect(screen.getByRole('status')).toHaveTextContent(/poor|remove/i);expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(0);await user.click(screen.getByRole('button',{name:'Toggle Ignore warning'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Check solution'}));expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'check'},{type:'change',value:{selectedIds:['wall','leave']}},{type:'complete',value:{selectedIds:['wall','leave']}}]);await user.click(screen.getByRole('button',{name:'Start over'}));expect(screen.getByRole('status')).toHaveTextContent('Choose protections for Flood.')});
test('rejects a poor solution in requiredIds',()=>expect(HazardSolutionDesignerWidgetConfigSchema.safeParse({hazard:'Flood',solutions:[{id:'wall',label:'Seawall',effectiveness:'good'},{id:'ignore',label:'Ignore',effectiveness:'poor'}],requiredIds:['ignore']}).success).toBe(false));
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- HazardSolutionDesigner` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const HazardSolutionSchema=z.object({id:z.string().min(1),label:z.string().min(1),effectiveness:z.enum(['good','partial','poor'])}).strict();export const HazardSolutionDesignerWidgetConfigSchema=z.object({hazard:z.string().min(1),solutions:z.array(HazardSolutionSchema).min(2),requiredIds:z.array(z.string().min(1)).min(1)}).strict().superRefine((v,ctx)=>{const ids=v.solutions.map(x=>x.id);if(new Set(ids).size!==ids.length||new Set(v.requiredIds).size!==v.requiredIds.length||!v.requiredIds.every(id=>ids.includes(id))||v.requiredIds.some(id=>v.solutions.find(s=>s.id===id)!.effectiveness==='poor'))ctx.addIssue({code:z.ZodIssueCode.custom,message:'required solution ids must exist, be unique, and not be poor'})});
export const HazardSolutionDesignerWidgetRefSchema=z.object({type:z.literal('hazard-solution-designer'),config:HazardSolutionDesignerWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer','topographic-map-explorer','hazard-solution-designer'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
 ClockElapsedTimeWidgetRefSchema,
 QuarterInchRulerWidgetRefSchema,
 BalanceScaleWidgetRefSchema,
 ShapeClassifierWidgetRefSchema,
 DataPlotBuilderWidgetRefSchema,
 ProbabilitySpinnerWidgetRefSchema,
 CollisionRampWidgetRefSchema,
 EnergyTransferBuilderWidgetRefSchema,
 WaveMakerWidgetRefSchema,
 LightReflectionEyeWidgetRefSchema,
 MessageSenderWidgetRefSchema,
 EnergyConversionDesignerWidgetRefSchema,
 AnimalStructureMatcherWidgetRefSchema,
 ErosionSimulatorWidgetRefSchema,
 RockLayerExplorerWidgetRefSchema,
 TopographicMapExplorerWidgetRefSchema,
 HazardSolutionDesignerWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'hazard-solution-designer':{type:'interaction';action:'toggle-solution'|'check'|'reset'}|{type:'change';value:{selectedIds:string[]}}|{type:'complete';value:{selectedIds:string[]}};
'hazard-solution-designer':lazy(()=>import('./science/HazardSolutionDesigner')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'hazard-solution-designer':{const Widget=widgetRegistry['hazard-solution-designer'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
const sorted=(ids:string[])=>[...ids].sort();export default function HazardSolutionDesigner({config,onEvent}:WidgetProps<'hazard-solution-designer'>){const key=JSON.stringify(config),prompt=`Choose protections for ${config.hazard}.`;const [selected,setSelected]=useState<string[]>([]),[status,setStatus]=useState(prompt);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setSelected([]);setStatus(prompt)},[key]);const emit=(next:string[],action:'toggle-solution'|'check'|'reset',check=false)=>{const ordered=config.solutions.map(s=>s.id).filter(id=>next.includes(id));setSelected(ordered);if(action==='toggle-solution')setStatus('Selection changed; check the revised hazard plan.');if(action==='reset')setStatus(prompt);onEvent({type:'interaction',action});onEvent({type:'change',value:{selectedIds:ordered}});if(check){const ok=JSON.stringify(sorted(ordered))===JSON.stringify(sorted(config.requiredIds));const poor=config.solutions.find(s=>ordered.includes(s.id)&&s.effectiveness==='poor');setStatus(ok?'Hazard plan complete.':poor?`${poor.label} is poor; remove it and revise.`:'The plan is partial; check required protections.');if(ok)completeOnce(()=>onEvent({type:'complete',value:{selectedIds:ordered}}))}};return <section className="card widget-experiment hazard" data-testid="widget-hazard-solution-designer" data-state={completed?'complete':'designing'}>{config.solutions.map(s=><button key={s.id} aria-label={`Toggle ${s.label}`} aria-pressed={selected.includes(s.id)} onClick={()=>emit(selected.includes(s.id)?selected.filter(id=>id!==s.id):selected.concat(s.id),'toggle-solution')}>{s.label}</button>)}<button aria-label="Check solution" onClick={()=>emit(selected,'check',true)}>Check</button><button onClick={()=>emit([],'reset')}>Start over</button><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.hazard{display:grid;gap:.75rem}.widget-experiment.hazard button[aria-pressed="true"]{outline:3px solid var(--c-accent-action)}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- HazardSolutionDesigner WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact S11 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/science/HazardSolutionDesigner.tsx src/widgets/science/HazardSolutionDesigner.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add hazard solution widget"
```

### Task S12: Resource sorter

**Files:** Create `src/widgets/science/ResourceSorter.tsx`, `src/widgets/science/ResourceSorter.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict unique items and unique bin subset. Select/place/reset retain all placements; output per item; complete only when every item is in its authored kind.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('retains resource placements and completes all correct bins',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<ResourceSorter config={{items:[{id:'sun',label:'Sunlight',kind:'renewable'},{id:'coal',label:'Coal',kind:'nonrenewable'}],bins:['renewable','nonrenewable']}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Select Sunlight'}));await user.click(screen.getByRole('button',{name:'Place selected item in renewable'}));await user.click(screen.getByRole('button',{name:'Select Coal'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Place selected item in nonrenewable'}));expect(screen.getByTestId('resource-placement-sun')).toHaveTextContent('renewable');expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'place-item'},{type:'change',value:{placements:{sun:'renewable',coal:'nonrenewable'}}},{type:'complete',value:{placements:{sun:'renewable',coal:'nonrenewable'}}}])});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- ResourceSorter` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const ResourceKindSchema=z.enum(['renewable','nonrenewable','conserve']),ResourceItemSchema=z.object({id:z.string().min(1),label:z.string().min(1),kind:ResourceKindSchema}).strict();export const ResourceSorterWidgetConfigSchema=z.object({items:z.array(ResourceItemSchema).min(2),bins:z.array(ResourceKindSchema).min(2)}).strict().superRefine((v,ctx)=>{if(new Set(v.items.map(x=>x.id)).size!==v.items.length||new Set(v.bins).size!==v.bins.length||!v.items.every(x=>v.bins.includes(x.kind)))ctx.addIssue({code:z.ZodIssueCode.custom,message:'invalid item ids or bins'})});
export const ResourceSorterWidgetRefSchema=z.object({type:z.literal('resource-sorter'),config:ResourceSorterWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer','topographic-map-explorer','hazard-solution-designer','resource-sorter'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
 ClockElapsedTimeWidgetRefSchema,
 QuarterInchRulerWidgetRefSchema,
 BalanceScaleWidgetRefSchema,
 ShapeClassifierWidgetRefSchema,
 DataPlotBuilderWidgetRefSchema,
 ProbabilitySpinnerWidgetRefSchema,
 CollisionRampWidgetRefSchema,
 EnergyTransferBuilderWidgetRefSchema,
 WaveMakerWidgetRefSchema,
 LightReflectionEyeWidgetRefSchema,
 MessageSenderWidgetRefSchema,
 EnergyConversionDesignerWidgetRefSchema,
 AnimalStructureMatcherWidgetRefSchema,
 ErosionSimulatorWidgetRefSchema,
 RockLayerExplorerWidgetRefSchema,
 TopographicMapExplorerWidgetRefSchema,
 HazardSolutionDesignerWidgetRefSchema,
 ResourceSorterWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'resource-sorter':{type:'interaction';action:'select-item'|'place-item'|'reset'}|{type:'change';value:{placements:Record<string,string>}}|{type:'complete';value:{placements:Record<string,string>}};
'resource-sorter':lazy(()=>import('./science/ResourceSorter')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'resource-sorter':{const Widget=widgetRegistry['resource-sorter'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function ResourceSorter({config,onEvent}:WidgetProps<'resource-sorter'>){const key=JSON.stringify(config);const [selected,setSelected]=useState<string|null>(null),[placements,setPlacements]=useState<Record<string,string>>({});const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setSelected(null);setPlacements({})},[key]);const correct=(next:Record<string,string>)=>config.items.every(i=>next[i.id]===i.kind);const emit=(next:Record<string,string>,action:'select-item'|'place-item'|'reset')=>{setPlacements(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{placements:next}});if(correct(next))completeOnce(()=>onEvent({type:'complete',value:{placements:next}}))};const select=(id:string)=>{setSelected(id);emit(placements,'select-item')};return <section className="card widget-experiment resources" data-testid="widget-resource-sorter" data-state={completed?'complete':'sorting'}>{config.items.map(i=><div key={i.id}><button aria-label={`Select ${i.label}`} onClick={()=>select(i.id)}>{i.label}</button><output data-testid={`resource-placement-${i.id}`}>{placements[i.id]??''}</output></div>)}{config.bins.map(bin=><button key={bin} aria-label={`Place selected item in ${bin}`} disabled={!selected} onClick={()=>selected&&emit({...placements,[selected]:bin},'place-item')}>{bin}</button>)}<button onClick={()=>{setSelected(null);emit({},'reset')}}>Start over</button><p role="status">{correct(placements)?'Every resource is sorted.':selected?'Choose a resource bin.':'Select a resource.'}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.resources{display:grid;gap:.75rem}.widget-experiment.resources output{min-block-size:1.5em}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- ResourceSorter WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact S12 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/science/ResourceSorter.tsx src/widgets/science/ResourceSorter.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add resource sorter widget"
```

## Science plan verification

**Files:** Read only `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/widgets/WidgetFrame.test.tsx`, and the exact Science component/test files listed in S1–S12.

**Interfaces:** Consumes the twelve guarded Science task commits after accepted Math. Produces the Science plan acceptance record; it changes no file.

- [ ] **Step 1 (2–5 minutes):** Run `npm test -- widgets science schema WidgetFrame && npx tsc -b --pretty false`.
- [ ] **Step 2 (2–5 minutes):** Run `for literal in collision-ramp energy-transfer-builder wave-maker light-reflection-eye message-sender energy-conversion-designer animal-structure-matcher erosion-simulator rock-layer-explorer topographic-map-explorer hazard-solution-designer resource-sorter; do test "$(rg -l -F "'$literal'" src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx | wc -l | tr -d ' ')" = 3; done`.
- [ ] **Step 3 (2–5 minutes):** Confirm `git diff --cached --name-only -- src/characters` prints nothing and record S1–S12 gate/commit ids in the execution notes.

Expected: PASS. Every Science widget has its exact schema/event/registry/dispatcher/component/test/CSS, current recoverable feedback, honest authored-model copy, and interaction-triggered one-shot completion.
