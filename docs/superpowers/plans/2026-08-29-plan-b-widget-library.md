# Cram All Plan B: Widget Library Master Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the typed widget-library boundary, execute one-widget subject plans, and verify the complete approved library without weakening lesson isolation, accessibility, motion, or build behavior.

**Architecture:** This master owns the prerequisite remediation gate, generic event types, completion latch, correlated lazy registry, exhaustive `WidgetFrame`, subject acceptance checkpoints, final catalog checks, browser harness, and release gates. The only valid execution order is Task 0 → Task 1 → Math → Task 2 → Science → Task 3 → Reading → Task 4 → Task 5 → Task 6; Task 0 stops all later work while any Plan-A blocker remains.

**Tech Stack:** React 18, TypeScript 5, Zod 3, Framer Motion 11, Vite 5, Vitest 2, React Testing Library, user-event, jsdom; no new production dependencies.

**Spec:** `docs/superpowers/specs/2026-08-29-cram-all-design.md`

## Global Constraints

- Execute only in this order: Task 0 → Task 1 → Math → Task 2 → Science → Task 3 → Reading → Task 4 → Task 5 → Task 6. A failing Task 0 blocks Task 1 and every subject plan.
- Node >= 20; npm. `npm run build` emits `dist/`; `npm run build:single` emits a double-clickable single-file build.
- Content ids remain canonical kebab-case. No Plan-B task creates lesson content.
- `WidgetRefSchema` and every config object are strict. Unknown keys fail validation.
- `WidgetType`/`WidgetConfig<T>` remain inferred from `WidgetRef`. Every widget lands schema literal/branch, event member, registry member, exhaustive dispatcher case, component, focused test, and CSS atomically.
- Production registry/dispatcher code contains no `as RegisteredWidget`, `as unknown`, or `as never` cast.
- Each mutation computes `next`, stores it, emits `interaction`, emits `change` derived from `next`, then emits at most one latched `complete`. Config changes reset state/latch. Targetless and target-zero widgets never complete on mount.
- Events remain ephemeral; `LessonPlayer` keeps `ignoreWidgetEvent`. No widget writes storage/progress/analytics/scoring/unlocks.
- Controls meet the existing >=44px target convention. Dragging is optional and always has named button/tap alternatives.
- Text plus `role="status"`/`aria-live="polite"` conveys state. Color, geometry, animation, and sound are not sole cues.
- Decorative motion uses `useReducedMotionPref()`. Reduced mode renders the same final state without spinning, shaking, confetti, or continuous loops.
- Preserve the existing `WidgetErrorBoundary`, `NappingWidget`, `Suspense`, loading fallback, card shell, and boundary reset key.
- Existing pilot configs remain valid: place value `{target?:number,periods?:2|3}` and number line `{min,max,a,b,step?:number}`.
- Plan B never modifies `src/characters/**`; character SVGs, poses, dialogue, and guide identities are a protected Plan-A boundary.
- Every passing gate includes `npx tsc -b --pretty false`.

---

**Saved as:** `docs/superpowers/plans/2026-08-29-plan-b-widget-library.md`

**Required tracked subject plans (execute each immediately before its matching master acceptance checkpoint):**

1. `docs/superpowers/plans/2026-08-29-plan-b1-math-widgets.md`
2. `docs/superpowers/plans/2026-08-29-plan-b2-science-widgets.md`
3. `docs/superpowers/plans/2026-08-29-plan-b3-reading-widgets.md`

## Final interface manifest

The subject plans implement these exact literals and payloads:

| Plan | Literal | Config success target | Interaction actions | change / complete |
|---|---|---|---|---|
| Math | `base-ten-blocks` | optional numeric target | `add-block`,`remove-block`,`regroup`,`reset` | counts+value / same |
| Math | `fraction-models` | optional exact/equivalent fraction | `select-piece`,`clear-model` | numerator+denominator / plus equivalent |
| Math | `area-model-multiplier` | optional target product after all cells | `select-cell`,`reset` | selectedCells+product / product |
| Math | `array-builder` | optional target product | `change-rows`,`change-columns`,`reset` | rows+columns+product / same |
| Math | `money-counter` | optional cents target | `add-coin`,`remove-coin`,`reset` | totalCents+five counts / same |
| Math | `clock-elapsed-time` | set-time target only | `change-hour`,`change-minute`,`reset` | hour+minute+totalMinutes / same |
| Math | `quarter-inch-ruler` | required target | `move-marker`,`reset` | inches / same |
| Math | `balance-scale` | correct comparison or equalization | `add-weight`,`remove-weight`,`check`,`reset` | totals / totals |
| Math | `shape-classifier` | every shape in numeric-rule bin | `select-shape`,`place-shape`,`reset` | placements / same |
| Math | `data-plot-builder` | every target count | `increase-value`,`decrease-value`,`reset` | values / same |
| Math | `probability-spinner` | trial floor and optional outcome seen | `spin`,`reset` | outcomeId+counts / same |
| Science | `collision-ramp` | correct simplified opposing-momentum prediction | `change-angle`,`change-speed`,`run`,`choose-prediction`,`reset` | angle+speedA+speedB / prediction+correct |
| Science | `energy-transfer-builder` | exact valid required path | `append-path`,`reset` | path / path |
| Science | `wave-maker` | optional amplitude/frequency target | `change-amplitude`,`change-frequency`,`reset` | amplitude+frequency / same |
| Science | `light-reflection-eye` | target-angle check | `change-angle`,`check`,`reset` | incident+reflection / same |
| Science | `message-sender` | decoded configured message | `append-symbol`,`remove-symbol`,`send`,`reset` | encoded / encoded+decoded |
| Science | `energy-conversion-designer` | endpoints plus every compatible edge | `append-chain`,`reset` | chain / chain |
| Science | `animal-structure-matcher` | every structure/function match | `select-structure`,`match`,`reset` | matches / same |
| Science | `erosion-simulator` | selected configured agent after run | `select-agent`,`toggle-vegetation`,`run`,`reset` | agent+vegetation / same |
| Science | `rock-layer-explorer` | selected target after check | `select-layer`,`check`,`reset` | selectedLayerId / same |
| Science | `topographic-map-explorer` | selected target after check | `select-point`,`check`,`reset` | selectedPointId / same |
| Science | `hazard-solution-designer` | exact required id set | `toggle-solution`,`check`,`reset` | selectedIds / same |
| Science | `resource-sorter` | every item in its kind bin | `select-item`,`place-item`,`reset` | placements / same |
| Reading | `word-root-builder` | configured word/meaning | `select-prefix`,`select-root`,`select-suffix`,`check`,`reset` | parts+word / word+meaning |
| Reading | `context-clue-detective` | correct choice | `choose-clue`,`reset` | choiceId / choiceId |
| Reading | `story-elements-mapper` | all entries equal answers after check | `change-field`,`check`,`reset` | entries / entries |
| Reading | `theme-evidence-collector` | enough evidence, all supporting theme | `choose-theme`,`toggle-evidence`,`reset` | theme+evidenceIds / same |
| Reading | `central-idea-organizer` | enough details, all supporting idea | `choose-main-idea`,`toggle-detail`,`reset` | mainIdea+detailIds / same |
| Reading | `text-structure-sorter` | every excerpt in authored structure | `select-excerpt`,`place-structure`,`reset` | placements / same |
| Reading | `summary-builder` | mains included, no extras, within max | `toggle-sentence`,`reset` | selectedIds / same |
| Reading | `pov-switcher` | required pronouns applied | `select-pronoun`,`apply`,`reset` | selectedPronouns / rewrittenText |
| Reading | `figurative-language-matcher` | every phrase matched to kind | `select-phrase`,`match`,`reset` | matches / same |
| Reading | `source-credibility-checker` | all ratings equal authored answer | `rate-source`,`check`,`reset` | ratings / ratings |

### Task 0: Verify Plan-A remediation and protected boundaries

**Files:** Read only `src/progress/storage.ts`, `src/quiz/engine.ts`, `src/quiz/QuestionCard.tsx`, `src/content/schema.ts`, `src/content/subjects.ts`, `src/theme.css`, and `src/characters/**`.

**Interfaces:** Consumes an accepted Plan-A remediation commit and the current protected character tree. Produces only a recorded prerequisite decision and baseline file list; it changes no file.

- [ ] **Step 1 (2–5 minutes):** Confirm the legacy backward-date v1 migration, shared grading/ambiguity normalization, and science unit-number composited contrast fixes are present as an accepted Plan-A remediation commit. If any is absent, stop: executing or committing that remediation requires separate user authorization and is outside this Plan-B execution.
- [ ] **Step 2 (2–5 minutes):** Run `rg --files src/characters | sort`, save the output in the execution notes, and confirm no Plan-B task lists a returned path for modification.
- [ ] **Step 3 (2–5 minutes):** Run `npm test && npx tsc -b --pretty false && npm run build`.

Expected: PASS. Stop execution if any remediation is absent or any unrelated regression fails; reconcile the Plan-A closure before widget edits.

### Task 1: Retrofit generic event boundary and completion latch

**Files:**

- Create: `src/widgets/useCompletionLatch.ts`, `src/widgets/useCompletionLatch.test.tsx`, `src/widgets/WidgetFrame.crash.test.tsx`
- Modify: `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/widgets/WidgetFrame.test.tsx`

**Interfaces:** Consumes current two-widget `WidgetRef`. Produces exported `WidgetEventMap`, `WidgetEvent<T>`, `WidgetEventHandler<T>`, `WidgetProps<T>`, `WidgetRegistry`, `useCompletionLatch(resetKey)`, and a correlated exhaustive renderer inside the real frame shell.

**Step 1: Write failing type/runtime tests in three bounded edits**

- [ ] **Step 1a (2–5 minutes): Create the latch regression**

```tsx
// src/widgets/useCompletionLatch.test.tsx
import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,test,vi} from 'vitest';
import {useCompletionLatch} from './useCompletionLatch';
test('completion latch fires once and resets on a new key',async()=>{
 const fired=vi.fn();function Probe({id}:{id:string}){const {completed,completeOnce}=useCompletionLatch(id);return <button data-complete={completed} onClick={()=>completeOnce(fired)}>Finish</button>}
 const user=userEvent.setup(),view=render(<Probe id="a"/>);await user.click(screen.getByRole('button',{name:'Finish'}));await user.click(screen.getByRole('button',{name:'Finish'}));expect(fired).toHaveBeenCalledTimes(1);view.rerender(<Probe id="b"/>);expect(screen.getByRole('button',{name:'Finish'})).toHaveAttribute('data-complete','false');await user.click(screen.getByRole('button',{name:'Finish'}));expect(fired).toHaveBeenCalledTimes(2);
});
```

Create a separate crash-only suite so its hoisted mock cannot poison normal `WidgetFrame.test.tsx` pilot-success tests:

- [ ] **Step 1b (2–5 minutes): Create the isolated crash regression**

```tsx
// src/widgets/WidgetFrame.crash.test.tsx
import {render,screen} from '@testing-library/react';import {expect,test,vi} from 'vitest';import {WidgetFrame} from './WidgetFrame';
vi.mock('./math/PlaceValueBuilder',()=>({default:function ThrowingPilot(){throw new Error('widget exploded')}}));
test('keeps the crash fallback and resets the boundary by type',async()=>{vi.spyOn(console,'error').mockImplementation(()=>{});const view=render(<WidgetFrame type="place-value-builder" config={{}} onEvent={()=>{}}/>);expect(await screen.findByTestId('widget-napping')).toHaveTextContent(/experiment is napping/i);view.rerender(<WidgetFrame type="number-line-compare" config={{min:0,max:1,a:0,b:1}} onEvent={()=>{}}/>);expect(await screen.findByTestId('widget-number-line-compare')).toBeInTheDocument();expect(screen.queryByTestId('widget-napping')).toBeNull()});
```

Replace `src/widgets/WidgetFrame.test.tsx` with the real-pilot suite below. This exact replacement removes its old top-level `vi.mock('./math/PlaceValueBuilder',...)` and its two crash tests; only the separate crash suite above mocks the pilot.

- [ ] **Step 1c (2–5 minutes): Replace the normal real-pilot suite**

```tsx
import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {afterEach,describe,expect,test,vi} from 'vitest';
import {WIDGET_TYPES} from '../content/schema';
import {WidgetFrame,type WidgetFrameProps} from './WidgetFrame';
import {widgetRegistry} from './registry';
afterEach(()=>vi.restoreAllMocks());
describe('widgetRegistry',()=>{test('covers every widget type the content schema allows',()=>expect(Object.keys(widgetRegistry).sort()).toEqual([...WIDGET_TYPES].sort()))});
describe('WidgetFrame',()=>{
 test('renders both real pilots',async()=>{const view=render(<WidgetFrame type="place-value-builder" config={{target:1}} onEvent={()=>{}}/>);expect(await screen.findByTestId('widget-place-value-builder')).toBeInTheDocument();view.rerender(<WidgetFrame type="number-line-compare" config={{min:0,max:10,a:2,b:8}} onEvent={()=>{}}/>);expect(await screen.findByTestId('widget-number-line-compare')).toBeInTheDocument()});
 test('shows the napping card for an unregistered runtime value',()=>{const invalid={type:'not-a-widget',config:{},onEvent:()=>{}} as unknown as WidgetFrameProps;render(<WidgetFrame {...invalid}/>);expect(screen.getByTestId('widget-napping')).toHaveTextContent(/experiment is napping/i)});
 test('forwards events to the lesson boundary',async()=>{const user=userEvent.setup(),onEvent=vi.fn();render(<WidgetFrame type="number-line-compare" config={{min:0,max:10,a:2,b:8}} onEvent={onEvent}/>);await screen.findByTestId('widget-number-line-compare');await user.click(screen.getByRole('button',{name:'less than'}));expect(onEvent).toHaveBeenCalledWith({type:'complete',value:{a:2,b:8,choice:'<'}})});
});
```

- [ ] **Step 2 (2–5 minutes): Run red**

Run: `npm test -- useCompletionLatch WidgetFrame`

Expected: FAIL because the hook and correlated types are absent.

**Step 3: Implement the boundary in three bounded edits**

- [ ] **Step 3a (2–5 minutes): Replace the registry types and two-member registry**

```ts
// registry.ts
import {lazy,type ComponentType,type LazyExoticComponent} from 'react';
import type {WidgetConfig,WidgetType} from '../content/schema';
export type WidgetEventMap={
 'place-value-builder':{type:'interaction';action:'change-place'|'reset'}|{type:'change';value:number}|{type:'complete';value:number};
 'number-line-compare':{type:'interaction';action:'move-marker'|'choose-comparison'}|{type:'change';value:{a:number;b:number;choice:'<'|'='|'>'|null}}|{type:'complete';value:{a:number;b:number;choice:'<'|'='|'>'}};
};
export type WidgetEvent<T extends WidgetType=WidgetType>=WidgetEventMap[T];
export type WidgetEventHandler<T extends WidgetType=WidgetType>=(event:WidgetEvent<T>)=>void;
export type WidgetProps<T extends WidgetType=WidgetType>={config:WidgetConfig<T>;onEvent:WidgetEventHandler<T>};
export type WidgetRegistry={[T in WidgetType]:LazyExoticComponent<ComponentType<WidgetProps<T>>>};
export const widgetRegistry={
 'place-value-builder':lazy(()=>import('./math/PlaceValueBuilder')),
 'number-line-compare':lazy(()=>import('./math/NumberLineCompare')),
} satisfies WidgetRegistry;
```

- [ ] **Step 3b (2–5 minutes): Create the synchronous key-aware completion latch**

```tsx
// useCompletionLatch.ts
import {useRef,useState} from 'react';
export function useCompletionLatch(resetKey:string){const latch=useRef({key:resetKey,fired:false});const [completedKey,setCompletedKey]=useState<string|null>(null);if(latch.current.key!==resetKey)latch.current={key:resetKey,fired:false};const completeOnce=(emit:()=>void)=>{if(latch.current.fired)return;latch.current.fired=true;setCompletedKey(resetKey);emit()};return {completed:latch.current.fired&&completedKey===resetKey,completeOnce}}
```

- [ ] **Step 3c (2–5 minutes): Replace only the typed dispatcher and exported frame while retaining the real wrapper shell**

```tsx
// WidgetFrame.tsx — replace the three existing imports exactly; retain NappingWidget/WidgetErrorBoundary unchanged.
import {Component,Suspense,type ErrorInfo,type ReactNode} from 'react';
import type {WidgetConfig,WidgetType} from '../content/schema';
import {widgetRegistry,type WidgetEventHandler} from './registry';
export type WidgetFrameProps={[T in WidgetType]:{type:T;config:WidgetConfig<T>;onEvent:WidgetEventHandler<T>}}[WidgetType];
function RenderWidget(ref:WidgetFrameProps){switch(ref.type){
 case 'place-value-builder':{const Widget=widgetRegistry['place-value-builder'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
 case 'number-line-compare':{const Widget=widgetRegistry['number-line-compare'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
 default:{const exhaustive:never=ref;void exhaustive;return <NappingWidget/>}
}}
export function WidgetFrame(ref:WidgetFrameProps){return <WidgetErrorBoundary key={ref.type}><Suspense fallback={<div className="card widget-loading" data-testid="widget-loading">Getting the experiment ready…</div>}><RenderWidget {...ref}/></Suspense></WidgetErrorBoundary>}
```

- [ ] **Step 4 (2–5 minutes): Run green**

Run: `npm test -- useCompletionLatch WidgetFrame widgets && npx tsc -b --pretty false`

Expected: PASS; TypeScript proves the two pilot registry members and dispatcher arms are correlated.

- [ ] **Step 5 (2–5 minutes): Commit the exact boundary files**

```bash
git add src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/WidgetFrame.test.tsx src/widgets/WidgetFrame.crash.test.tsx src/widgets/useCompletionLatch.ts src/widgets/useCompletionLatch.test.tsx
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "refactor: type the widget event boundary"
```

### Task 2: Accept the independently executed math plan

**Files:** Read only `docs/superpowers/plans/2026-08-29-plan-b1-math-widgets.md`, `src/content/schema.ts`, `src/widgets/registry.ts`, and `src/widgets/WidgetFrame.tsx`.

**Interfaces:** Consumes the separately executed and accepted Math plan. Produces a bounded acceptance decision for all eleven new math literals plus the fraction-display pilot retrofit; it performs no implementation or commit.

- [ ] **Step 1 (2–5 minutes):** Confirm `docs/superpowers/plans/2026-08-29-plan-b1-math-widgets.md` exists and its execution record lists passing M1–M12 green gates and guarded commits. If it does not, stop and execute that tracked plan in a separate authorized plan-execution session.
- [ ] **Step 2 (2–5 minutes):** Run `npm test -- widgets math schema WidgetFrame && npx tsc -b --pretty false`.
- [ ] **Step 3 (2–5 minutes):** Run the exact membership check below; every literal must be found in all three files.

```bash
for literal in base-ten-blocks fraction-models area-model-multiplier array-builder money-counter clock-elapsed-time quarter-inch-ruler balance-scale shape-classifier data-plot-builder probability-spinner; do
  test "$(rg -l -F "'$literal'" src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx | wc -l | tr -d ' ')" = 3
done
```

Expected: PASS with no reading/science literals added by this checkpoint.

### Task 3: Accept the independently executed science plan

**Files:** Read only `docs/superpowers/plans/2026-08-29-plan-b2-science-widgets.md`, `src/content/schema.ts`, `src/widgets/registry.ts`, and `src/widgets/WidgetFrame.tsx`.

**Interfaces:** Consumes the separately executed and accepted Science plan after Math. Produces a bounded acceptance decision for all twelve science literals; it performs no implementation or commit.

- [ ] **Step 1 (2–5 minutes):** Confirm `docs/superpowers/plans/2026-08-29-plan-b2-science-widgets.md` exists and its execution record lists passing S1–S12 green gates and guarded commits. If it does not, stop and execute that tracked plan in a separate authorized plan-execution session.
- [ ] **Step 2 (2–5 minutes):** Run `npm test -- widgets science schema WidgetFrame && npx tsc -b --pretty false`.
- [ ] **Step 3 (2–5 minutes):** Run the exact membership check below; every literal must be found in all three files.

```bash
for literal in collision-ramp energy-transfer-builder wave-maker light-reflection-eye message-sender energy-conversion-designer animal-structure-matcher erosion-simulator rock-layer-explorer topographic-map-explorer hazard-solution-designer resource-sorter; do
  test "$(rg -l -F "'$literal'" src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx | wc -l | tr -d ' ')" = 3
done
```

Expected: PASS with all Math regression suites still green.

### Task 4: Accept the independently executed reading plan

**Files:** Read only `docs/superpowers/plans/2026-08-29-plan-b3-reading-widgets.md`, `src/content/schema.ts`, `src/widgets/registry.ts`, and `src/widgets/WidgetFrame.tsx`.

**Interfaces:** Consumes the separately executed and accepted Reading plan after Math and Science. Produces a bounded acceptance decision for all ten reading literals; it performs no implementation or commit.

- [ ] **Step 1 (2–5 minutes):** Confirm `docs/superpowers/plans/2026-08-29-plan-b3-reading-widgets.md` exists and its execution record lists passing R1–R10 green gates and guarded commits. If it does not, stop and execute that tracked plan in a separate authorized plan-execution session.
- [ ] **Step 2 (2–5 minutes):** Run `npm test -- widgets reading schema WidgetFrame && npx tsc -b --pretty false`.
- [ ] **Step 3 (2–5 minutes):** Run the exact membership check below; every literal must be found in all three files.

```bash
for literal in word-root-builder context-clue-detective story-elements-mapper theme-evidence-collector central-idea-organizer text-structure-sorter summary-builder pov-switcher figurative-language-matcher source-credibility-checker; do
  test "$(rg -l -F "'$literal'" src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx | wc -l | tr -d ' ')" = 3
done
```

Expected: PASS with all Math and Science regressions green.

### Task 5: Final catalog, strict-schema, ephemerality, and responsive checks

**Files:**

- Create: `src/test/widgetFixtures.ts`, `src/widgets/widget-css.test.ts`
- Modify: `src/widgets/WidgetFrame.test.tsx`, `src/content/schema.test.ts`, `src/lesson/LessonPlayer.test.tsx`, `src/theme.css`

**Interfaces:** `src/test/widgetFixtures.ts` is the only cross-suite fixture module; production never imports it. Subject component tests remain test suites and are never imported by another test file. The catalog test proves all 35 schema literals have a strict valid reference. The lesson test uses the existing real lesson/player fixture and pilot widget. The CSS test proves a concrete narrow-width/reduced-motion contract.

**Step 1: Create the shared fixture and failing integration coverage in bounded edits**

- [ ] **Step 1a (2–5 minutes): Create the compile-checked shared fixture map**

```ts
// src/test/widgetFixtures.ts
import type {WidgetRef,WidgetType} from '../content/schema';
type RefFor<T extends WidgetType>=Extract<WidgetRef,{type:T}>;
export const validWidgetRefByType={
 'place-value-builder':{type:'place-value-builder',config:{target:482,periods:2}},
 'number-line-compare':{type:'number-line-compare',config:{min:0,max:1,a:.25,b:.75,step:.25,display:'fraction',denominator:4}},
 'base-ten-blocks':{type:'base-ten-blocks',config:{target:10,initial:{ones:9,tens:0,hundreds:0,thousands:0},allowRegroup:true}},
 'fraction-models':{type:'fraction-models',config:{mode:'both',denominator:4,target:{numerator:1,denominator:2},allowEquivalent:true}},
 'area-model-multiplier':{type:'area-model-multiplier',config:{a:23,b:4,splitA:[20,3],splitB:[4],targetProduct:92}},
 'array-builder':{type:'array-builder',config:{rows:2,columns:4,targetProduct:12,editable:true}},
 'money-counter':{type:'money-counter',config:{targetCents:85}},
 'clock-elapsed-time':{type:'clock-elapsed-time',config:{mode:'set-time',targetTime:'01:15',minuteStep:15}},
 'quarter-inch-ruler':{type:'quarter-inch-ruler',config:{lengthInches:3,targetInches:2.25}},
 'balance-scale':{type:'balance-scale',config:{left:[{id:'a',label:'2',value:2}],right:[{id:'b',label:'1+1',value:2}],task:'compare'}},
 'shape-classifier':{type:'shape-classifier',config:{shapes:[{id:'triangle',label:'Triangle',sides:3,angles:3,parallelPairs:0},{id:'square',label:'Square',sides:4,angles:4,parallelPairs:2}],bins:[{id:'three',label:'3 sides',value:3},{id:'four',label:'4 sides',value:4}],rule:'sides'}},
 'data-plot-builder':{type:'data-plot-builder',config:{kind:'dot',prompt:'Build',categories:['A'],target:{A:2}}},
 'probability-spinner':{type:'probability-spinner',config:{segments:[{id:'a',label:'A',weight:1},{id:'b',label:'B',weight:3}],trials:1,targetOutcomeId:'b'}},
 'collision-ramp':{type:'collision-ramp',config:{rampAngle:20,massA:1,massB:1,speedA:5,speedB:4,target:'predict-direction'}},
 'energy-transfer-builder':{type:'energy-transfer-builder',config:{sources:['Sun'],transfers:['Electricity'],targets:['Lamp'],requiredPath:['Sun','Electricity','Lamp']}},
 'wave-maker':{type:'wave-maker',config:{medium:'rope',amplitude:2,frequency:2,target:{amplitude:3,frequency:3}}},
 'light-reflection-eye':{type:'light-reflection-eye',config:{incidentAngle:29,targetAngle:30,showEye:true}},
 'message-sender':{type:'message-sender',config:{encoding:'morse',message:'A'}},
 'energy-conversion-designer':{type:'energy-conversion-designer',config:{components:[{id:'sun',label:'Sun',energyIn:'nuclear',energyOut:'light'},{id:'panel',label:'Panel',energyIn:'light',energyOut:'electric'},{id:'lamp',label:'Lamp',energyIn:'electric',energyOut:'light'}],requiredStart:'sun',requiredEnd:'lamp'}},
 'animal-structure-matcher':{type:'animal-structure-matcher',config:{pairs:[{id:'beak',animal:'Bird',structure:'beak',function:'gathers food'},{id:'fin',animal:'Fish',structure:'fin',function:'swims'}]}},
 'erosion-simulator':{type:'erosion-simulator',config:{terrain:'soil',agents:['water','wind'],vegetation:false,targetAgent:'water'}},
 'rock-layer-explorer':{type:'rock-layer-explorer',config:{layers:[{id:'top',label:'Top',age:1},{id:'bottom',label:'Bottom',age:2}],targetLayerId:'bottom'}},
 'topographic-map-explorer':{type:'topographic-map-explorer',config:{contours:[{elevation:500,points:'0,0 1,1'}],points:[{id:'summit',label:'Summit',elevation:500},{id:'trail',label:'Trail',elevation:300}],targetPointId:'summit'}},
 'hazard-solution-designer':{type:'hazard-solution-designer',config:{hazard:'Flood',solutions:[{id:'wall',label:'Seawall',effectiveness:'good'},{id:'leave',label:'Evacuate',effectiveness:'good'},{id:'ignore',label:'Ignore warning',effectiveness:'poor'}],requiredIds:['wall','leave']}},
 'resource-sorter':{type:'resource-sorter',config:{items:[{id:'sun',label:'Sunlight',kind:'renewable'},{id:'coal',label:'Coal',kind:'nonrenewable'}],bins:['renewable','nonrenewable']}},
 'word-root-builder':{type:'word-root-builder',config:{root:'port',prefixes:['trans'],suffixes:['able'],targets:[{word:'transport',meaning:'carry across'},{word:'portable',meaning:'able to be carried'}]}},
 'context-clue-detective':{type:'context-clue-detective',config:{passage:'A timid child is shy.',targetWord:'timid',clueChoices:[{id:'definition',text:'is shy',type:'definition'},{id:'example',text:'child',type:'example'}],correctChoiceId:'definition'}},
 'story-elements-mapper':{type:'story-elements-mapper',config:{textTitle:'Story',fields:['character','setting'],answers:{character:'Ava',setting:'Park'}}},
 'theme-evidence-collector':{type:'theme-evidence-collector',config:{themeChoices:['Practice pays off','Cats are funny'],evidence:[{id:'a',text:'Ava practices daily',supports:['Practice pays off']},{id:'b',text:'Ava improves',supports:['Practice pays off']}],requiredEvidenceCount:2}},
 'central-idea-organizer':{type:'central-idea-organizer',config:{mainIdeaChoices:['Plants need sunlight','Dogs like bones'],details:[{id:'sun',text:'Leaves use sunlight',supports:['Plants need sunlight']},{id:'dog',text:'Dogs wag tails',supports:['Dogs like bones']}],requiredDetailCount:1}},
 'text-structure-sorter':{type:'text-structure-sorter',config:{excerpts:[{id:'rain',text:'Rain fell, so the field flooded.',structure:'cause-effect'},{id:'steps',text:'First mix, then bake.',structure:'sequence'}]}},
 'summary-builder':{type:'summary-builder',config:{sourceSentences:[{id:'main',text:'Bees help plants.',role:'main'},{id:'detail',text:'They carry pollen.',role:'detail'},{id:'extra',text:'Blue is a color.',role:'extra'}],requiredMainIds:['main'],maxSentences:2}},
 'pov-switcher':{type:'pov-switcher',config:{passage:'Ava carried Ava’s book.',from:'third',target:'first',pronounOptions:['I','my','she'],requiredPronouns:['I','my']}},
 'figurative-language-matcher':{type:'figurative-language-matcher',config:{pairs:[{id:'simile',phrase:'fast as lightning',kind:'simile',meaning:'very fast'},{id:'idiom',phrase:'piece of cake',kind:'idiom',meaning:'easy'}]}},
 'source-credibility-checker':{type:'source-credibility-checker',config:{sources:[{id:'named',title:'Museum guide',author:'City Museum',claims:['catalog evidence']},{id:'anon',title:'Amazing facts',claims:[]}],criteria:['author','evidence'],credibleIds:['named']}},
} satisfies {[T in WidgetType]:RefFor<T>};
```

- [ ] **Step 1b (2–5 minutes): Add the exact catalog/registry assertion**

```tsx
// src/widgets/WidgetFrame.test.tsx
test('catalog and lazy registry are identical',()=>expect(Object.keys(widgetRegistry).sort()).toEqual([...WIDGET_TYPES].sort()));
```

- [ ] **Step 1c (2–5 minutes): Add the strict fixture schema table test**

```ts
// src/content/schema.test.ts
import {WIDGET_TYPES,WidgetRefSchema} from './schema';
import {validWidgetRefByType} from '../test/widgetFixtures';
test.each(WIDGET_TYPES)('%s accepts its fixture and rejects unknown config keys',(type)=>{const valid=validWidgetRefByType[type];expect(WidgetRefSchema.safeParse(valid).success).toBe(true);expect(WidgetRefSchema.safeParse({...valid,config:{...valid.config,unexpected:true}}).success).toBe(false)});
```

Append this test inside the existing `describe('LessonPlayer',...)`; it deliberately reuses that file's real `renderPlayer`, `clickNext`, and `settleWidget` helpers and its real place-value lesson:

- [ ] **Step 1d (2–5 minutes): Add the real-player ephemerality regression**

```tsx
test('widget interaction remains ephemeral',async()=>{const storageSpy=vi.spyOn(Storage.prototype,'setItem');const user=userEvent.setup();renderPlayer();await clickNext(user);await settleWidget();storageSpy.mockClear();await user.click(screen.getByRole('button',{name:'Add one to the ones place'}));expect(storageSpy).not.toHaveBeenCalled()});
```

- [ ] **Step 1e (2–5 minutes): Create the static base-control/responsive/motion CSS regression**

```ts
// src/widgets/widget-css.test.ts
import {expect,test} from 'vitest';
import themeCss from '../theme.css?raw';
test('widget CSS defines low-specificity base controls, narrow layout, and reduced-motion fallbacks',()=>{expect(themeCss).toMatch(/:where\(\.widget-experiment button\)\s*\{[^}]*min-block-size:\s*44px[^}]*min-inline-size:\s*44px[^}]*font-family:\s*inherit/);expect(themeCss).toMatch(/:where\(\.widget-experiment input\)\s*\{[^}]*min-block-size:\s*44px[^}]*font-family:\s*inherit/);expect(themeCss).toMatch(/:where\(\.widget-experiment button:disabled\)\s*\{[^}]*cursor:\s*not-allowed/);expect(themeCss).toMatch(/@media\s*\(max-width:\s*600px\)[\s\S]*?\.widget-experiment \[data-widget-grid\]\s*\{[^}]*grid-template-columns:\s*1fr/);expect(themeCss).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?animation-iteration-count:\s*1\s*!important/) });
```

- [ ] **Step 2 (2–5 minutes): Run red**

Run: `npm test -- WidgetFrame schema LessonPlayer widget-css`

Expected: FAIL before the fixture module and final CSS contract are present.

- [ ] **Step 3 (2–5 minutes): Add the exact shared control/responsive/reduced-motion CSS**

```css
:where(.widget-experiment button){
 display:inline-flex;align-items:center;justify-content:center;
 min-block-size:44px;min-inline-size:44px;padding:.625rem .875rem;
 border:2px solid var(--c-control-border);border-radius:var(--radius);box-shadow:var(--shadow);
 background:var(--c-card);color:var(--c-ink);font-family:inherit;font-size:1rem;font-weight:600;cursor:pointer
}
:where(.widget-experiment button:focus-visible){outline:3px solid var(--accent-action,var(--c-accent-action));outline-offset:3px}
:where(.widget-experiment button:disabled){opacity:.55;cursor:not-allowed}
:where(.widget-experiment input){min-block-size:44px;padding:.625rem .875rem;border:2px solid var(--c-control-border);border-radius:var(--radius);background:var(--c-card);color:var(--c-ink);font-family:inherit;font-size:1rem}
@media (max-width:600px){
 .widget-experiment [data-widget-grid]{grid-template-columns:1fr}
 .widget-experiment output,.widget-experiment [role="status"]{overflow-wrap:anywhere}
}
@media (prefers-reduced-motion:reduce){
 .widget-experiment *{animation-duration:.001ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important}
}
```

Keep `ignoreWidgetEvent`, `ProgressContext`, and every production storage/progress module unchanged.

- [ ] **Step 4 (2–5 minutes): Run green**

Run: `npm test -- WidgetFrame schema LessonPlayer widget-css content-validation && npx tsc -b --pretty false`

Expected: PASS for all 35 widget literals (two pilots plus 33 approved additions), strict configs, real-player ephemerality, and static responsive/reduced-motion coverage.

- [ ] **Step 5 (2–5 minutes): Commit exact final-catalog files**

```bash
git add src/test/widgetFixtures.ts src/widgets/widget-css.test.ts src/widgets/WidgetFrame.test.tsx src/content/schema.test.ts src/lesson/LessonPlayer.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "test: verify the complete widget catalog"
```

### Task 6: Ignored browser harness, cleanup, and release gates

**Files:** Temporarily create/delete only `.superpowers/sdd/2026-08-29-plan-a-foundation/widget-harness.html` and `.superpowers/sdd/2026-08-29-plan-a-foundation/widget-harness.tsx`; no harness file is committed.

**Interfaces:** Consumes three already-registered real widgets. Produces temporary ignored browser-only files, recorded keyboard/reduced-motion observations, both production builds, and then a verified clean harness state.

- [ ] **Step 1 (2–5 minutes): Create both exact harness files and prove each one is ignored**

```html
<div id="root"></div><script type="module" src="/.superpowers/sdd/2026-08-29-plan-a-foundation/widget-harness.tsx"></script>
```

```tsx
import {createRoot} from 'react-dom/client';import {WidgetFrame} from '/src/widgets/WidgetFrame';import '/src/theme.css';
const event=(value:unknown)=>console.info('widget event',value);
createRoot(document.getElementById('root')!).render(<main className="page stack"><h1>Widget harness</h1><WidgetFrame type="base-ten-blocks" config={{target:10}} onEvent={event}/><WidgetFrame type="collision-ramp" config={{rampAngle:20,massA:1,massB:1,speedA:5,speedB:4,target:'predict-direction'}} onEvent={event}/><WidgetFrame type="word-root-builder" config={{root:'view',prefixes:['re'],targets:[{word:'review',meaning:'see again'}]}} onEvent={event}/></main>);
```

Run: `git check-ignore -q .superpowers/sdd/2026-08-29-plan-a-foundation/widget-harness.html && git check-ignore -q .superpowers/sdd/2026-08-29-plan-a-foundation/widget-harness.tsx`

Expected: exit 0; both independently checked paths are ignored.

- [ ] **Step 2 (2–5 minutes): Start the local harness server in an interactive PTY and record its session identifier**

Run in a PTY: `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort`

Expected: after Vite prints the ready URL, record the PTY/session identifier and leave that exact process running only through Steps 3–5.

- [ ] **Step 3 (2–5 minutes):** Open `http://127.0.0.1:5173/.superpowers/sdd/2026-08-29-plan-a-foundation/widget-harness.html`; with Tab/Space only, complete Base-ten blocks and record the visible status plus console event order.

- [ ] **Step 4 (2–5 minutes):** With Tab/Space only, complete Collision ramp and Word-root builder; record visible prediction/meaning feedback and console event order.

- [ ] **Step 5 (2–5 minutes):** Enable reduced motion, reload, and confirm all final outcomes remain visible without decorative motion. Crash handling remains in the automated real-frame regression; the harness does not fake a direct-import failure.

- [ ] **Step 6 (2–5 minutes): Stop the recorded Vite PTY cleanly before running build gates**

Send `Ctrl-C` (`\x03`) to the exact PTY/session recorded in Step 2 and wait at most 10 seconds for that process to exit. If it remains live, record FAIL and do not run release gates.

Verify: `! curl -fsS http://127.0.0.1:5173/.superpowers/sdd/2026-08-29-plan-a-foundation/widget-harness.html >/dev/null`

Expected: the Vite process has exited (exit 0 or the normal interrupt status 130), and its harness URL no longer answers.

- [ ] **Step 7 (2–5 minutes): Prove the ignored harness is absent from both builds**

Run: `npx tsc -b --pretty false && npm run build && ! rg -F "Widget harness" dist && npm run build:single && ! rg -F "Widget harness" dist-single`

Expected: PASS; neither build contains the ignored harness.

- [ ] **Step 8 (2–5 minutes): Delete both exact ignored harness files with `apply_patch` and verify they no longer exist**

Apply this exact patch:

```text
*** Begin Patch
*** Delete File: .superpowers/sdd/2026-08-29-plan-a-foundation/widget-harness.html
*** Delete File: .superpowers/sdd/2026-08-29-plan-a-foundation/widget-harness.tsx
*** End Patch
```

Run: `test ! -e .superpowers/sdd/2026-08-29-plan-a-foundation/widget-harness.html && test ! -e .superpowers/sdd/2026-08-29-plan-a-foundation/widget-harness.tsx`

- [ ] **Step 9 (2–5 minutes): Run final release gates and protected-boundary check**

Run: `npm test && npx tsc -b --pretty false && npm run build && npm run build:single && ! rg -F "Widget harness" dist dist-single && test -f dist-single/index.html && test "$(find dist-single -type f | wc -l | tr -d ' ')" = 1 && test -z "$(git diff --cached --name-only -- src/characters)"`

Expected: PASS; `dist-single/index.html` exists without sibling assets, and no harness file is staged.

## Definition of done

- Task 0 passes before Task 1 or any subject task begins, and the execution record follows Task 0 → Task 1 → Math → Task 2 → Science → Task 3 → Reading → Task 4 → Task 5 → Task 6 without bypassing a gate.
- Master Task 1 and every subject-plan widget task is committed only after its passing gate.
- All manifest rows have strict schemas, exact event members, correlated registry entries, exhaustive frame arms, keyboard paths, text status, next-state payloads, and one-shot completion tests.
- The real frame retains boundary/Suspense/loading/napping behavior.
- Final tests/typecheck/both builds pass; ignored harness is deleted and absent from builds/commit.

## Execution handoff

Execute this master inline or subagent-driven, but do not parallelize subject plans because they edit the same schema/registry/frame files. Use this exact sequence: Task 0 → Task 1 → Math → Task 2 → Science → Task 3 → Reading → Task 4 → Task 5 → Task 6. Stop at Task 0 until every separately authorized Plan-A remediation is accepted.
