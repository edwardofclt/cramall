# Cram All Plan B Math Widgets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add approved math widgets and fraction-display number lines as independently reviewable, typed, accessible experiments.

**Architecture:** This plan occupies Math in the mandatory master order Task 0 → Task 1 → Math → Task 2 → Science → Task 3 → Reading → Task 4 → Task 5 → Task 6. Hard dependency: Tasks 0 and 1 of `docs/superpowers/plans/2026-08-29-plan-b-widget-library.md` must both pass first. Every task atomically extends strict schema, generic event map, correlated registry, exhaustive `RenderWidget`, component, tests, and CSS. Every state mutation derives events from `next` and uses `useCompletionLatch`.

**Tech Stack:** React, TypeScript, Zod, Framer Motion, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-08-29-cram-all-design.md`

## Global Constraints

- Follow Task 0 → Task 1 → Math → Task 2 → Science → Task 3 → Reading → Task 4 → Task 5 → Task 6; complete master Tasks 0 and 1 before M1, and do not modify `src/characters/**`.
- Use React 18, TypeScript 5, Zod 3, Framer Motion 11, Vite 5, Vitest 2, Testing Library, and existing npm scripts; add no production dependency.
- Every config is strict; mutations emit interaction then next-state change; completion is latched once per config key.
- Controls are keyboard-operable and at least 44px; results use text status; reduced motion preserves final state.
- Every green gate includes `npx tsc -b --pretty false`; every commit runs the protected-character guard below first.
- **Exact new-file prelude:** Every M2–M12 component begins with `import {useEffect,useState} from 'react';`, `import type {WidgetProps} from '../registry';`, and `import {useCompletionLatch} from '../useCompletionLatch';`. M12 also imports `useReducedMotionPref` from `../../app/useReducedMotionPref`. Every focused test begins with `import {render,screen} from '@testing-library/react';`, `import userEvent from '@testing-library/user-event';`, and `import {expect,test,vi} from 'vitest';`, then imports its named default component (and M12's named `spin`) from the sibling component file. Tests that name a `*WidgetConfigSchema` import that exact export from `../../content/schema`. M1 edits the existing files and retains their existing imports, adding named formatter/schema imports only where the shown tests require them.

---

**Saved as:** `docs/superpowers/plans/2026-08-29-plan-b1-math-widgets.md`


### Task M1: Fraction-display number line

**Files:** Modify `src/content/schema.ts`, `src/content/schema.test.ts`, `src/widgets/math/NumberLineCompare.tsx`, `src/widgets/math/widgets.test.tsx`, `src/theme.css`.

**Interfaces:** Add `display?:'number'|'fraction'`, `denominator?:2|4|8|10|100`; fraction mode requires denominator and aligns min/max/a/b/step.

- [ ] **Step 1 (2–5 minutes): Write red tests**

```tsx
test('reduces fraction labels and keeps whole values whole',()=>{expect(formatNumberLineValue(.25,'fraction',4)).toBe('1/4');expect(formatNumberLineValue(.5,'fraction',4)).toBe('1/2');expect(formatNumberLineValue(1,'fraction',4)).toBe('1');expect(formatNumberLineValue(0,'fraction',4)).toBe('0')});
test('renders aligned quarter ticks and rejects a misaligned marker',()=>{expect(NumberLineWidgetConfigSchema.safeParse({min:0,max:1,a:.25,b:.75,step:.25,display:'fraction',denominator:4}).success).toBe(true);expect(NumberLineWidgetConfigSchema.safeParse({min:0,max:1,a:.3,b:.75,step:.25,display:'fraction',denominator:4}).success).toBe(false);render(<NumberLineCompare config={{min:0,max:1,a:.25,b:.75,step:.25,display:'fraction',denominator:4}} onEvent={vi.fn()}/>);expect(screen.getAllByText('1/4').length).toBeGreaterThan(0);expect(screen.queryByText('1/1')).toBeNull()});
test('retains supplied-step marker alignment in number and fraction modes',()=>{expect(NumberLineWidgetConfigSchema.safeParse({min:0,max:1,a:.3,b:.75,step:.25}).success).toBe(false);expect(NumberLineWidgetConfigSchema.safeParse({min:0,max:1,a:.5,b:.75,step:.5,display:'fraction',denominator:4}).success).toBe(false)});
```

- [ ] **Step 2 (2–5 minutes): Run red**

Run: `npm test -- widgets schema`

Expected: FAIL on new fields and formatter.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Edit the strict number-line schema**

```ts
const alignsToDenominator=(value:number,denominator:number)=>Math.abs(value*denominator-Math.round(value*denominator))<1e-9;
export const NumberLineWidgetConfigSchema=z.object({min:z.number().finite(),max:z.number().finite(),a:z.number().finite(),b:z.number().finite(),step:z.number().positive().finite().optional(),display:z.enum(['number','fraction']).optional(),denominator:z.union([z.literal(2),z.literal(4),z.literal(8),z.literal(10),z.literal(100)]).optional()}).strict().superRefine((v,ctx)=>{if(v.max<=v.min)ctx.addIssue({code:z.ZodIssueCode.custom,path:['max'],message:'max must exceed min'});if(v.a<v.min||v.a>v.max||v.b<v.min||v.b>v.max)ctx.addIssue({code:z.ZodIssueCode.custom,message:'markers must be on line'});const step=v.step??(v.display==='fraction'&&v.denominator?1/v.denominator:1);for(const marker of ['a','b'] as const)if(!alignsToStep(v[marker],v.min,step))ctx.addIssue({code:z.ZodIssueCode.custom,path:[marker],message:`${marker} must align to step from min`});if(v.display==='fraction'){if(!v.denominator){ctx.addIssue({code:z.ZodIssueCode.custom,path:['denominator'],message:'required'});return}for(const [field,value] of Object.entries({min:v.min,max:v.max,a:v.a,b:v.b,step}))if(!alignsToDenominator(value,v.denominator))ctx.addIssue({code:z.ZodIssueCode.custom,path:[field],message:`${field} must align to denominator grid`})}});
```

- [ ] **Step 3b (2–5 minutes): Add the exact fraction formatter and retained-renderer edits**

```ts
export function formatNumberLineValue(value:number,display:'number'|'fraction'='number',denominator?:number){if(display==='number'||!denominator)return String(value);const numerator=Math.round(value*denominator);const gcd=(a:number,b:number):number=>b===0?Math.abs(a):gcd(b,a%b);const divisor=gcd(numerator,denominator),top=numerator/divisor,bottom=denominator/divisor;return bottom===1?String(top):`${top}/${bottom}`}
function tickValues(min:number,max:number,display:'number'|'fraction',denominator?:number){if(display==='fraction'&&denominator&&(max-min)*denominator<=10)return Array.from({length:Math.round((max-min)*denominator)+1},(_,i)=>Number((min+i/denominator).toFixed(10)));const interval=tickStep(max-min),ticks:number[]=[];for(let v=Math.ceil(min/interval)*interval;v<=max;v+=interval)ticks.push(v);if(ticks[0]!==min)ticks.unshift(min);if(ticks.at(-1)!==max)ticks.push(max);return ticks}
function readConfig(config:Record<string,unknown>){let min=toFinite(config.min,DEFAULTS.min),max=toFinite(config.max,DEFAULTS.max);if(!(max>min)){min=DEFAULTS.min;max=DEFAULTS.max}const display:'number'|'fraction'=config.display==='fraction'?'fraction':'number';const denominator=[2,4,8,10,100].includes(Number(config.denominator))?Number(config.denominator):undefined;const defaultStep=display==='fraction'&&denominator?1/denominator:1,rawStep=toFinite(config.step,defaultStep),step=rawStep>0?rawStep:defaultStep;return{min,max,step,a:snapToStep(toFinite(config.a,DEFAULTS.a),min,max,step),b:snapToStep(toFinite(config.b,DEFAULTS.b),min,max,step),display,denominator}}
```

Replace the existing `readConfig` with the exact implementation above. In `NumberLineCompare`, define `const format=(value:number)=>formatNumberLineValue(value,display,denominator)` and `const ticks=tickValues(min,max,display,denominator)`. Add `format:(value:number)=>string` to `Marker` and `Stepper`, replace their raw values with `format(value)`, pass `format` into both marker/stepper calls, and render every tick with `format(tick)`. Retain the existing drag, nudge, event, reduced-motion, and `card widget-experiment nl` JSX.

- [ ] **Step 3c (2–5 minutes): Append the exact namespaced fraction-label CSS**

```css
.nl-pill-text,.nl-stepper-value,.nl-tick-label{font-variant-numeric:tabular-nums}.nl-fraction-label{font-size:.875rem;white-space:nowrap}
```

- [ ] **Step 4 (2–5 minutes): Run green**

Run: `npm test -- widgets schema && npx tsc -b --pretty false`

Expected: PASS, including old decimal/event tests.

- [ ] **Step 5 (2–5 minutes): Commit the exact M1 files**

```bash
git add src/content/schema.ts src/content/schema.test.ts src/widgets/math/NumberLineCompare.tsx src/widgets/math/widgets.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add fraction labels to number lines"
```

### Task M2: Base-ten blocks

**Files:** Create `src/widgets/math/BaseTenBlocks.tsx`, `src/widgets/math/BaseTenBlocks.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict config `{target?:0..9999,initial?:{ones,tens,hundreds,thousands:0..9},allowRegroup?:boolean}`; interaction `add-block|remove-block|regroup|reset`; change/complete counts plus value.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('uses next counts and emits one completion',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<BaseTenBlocks config={{target:10,initial:{ones:9,tens:0,hundreds:0,thousands:0},allowRegroup:true}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Add one block'}));expect(screen.getByTestId('base-ten-value')).toHaveTextContent('10');expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'add-block'},{type:'change',value:{ones:10,tens:0,hundreds:0,thousands:0,value:10}},{type:'complete',value:{ones:10,tens:0,hundreds:0,thousands:0,value:10}}]);await user.click(screen.getByRole('button',{name:'Regroup 10 ones'}));expect(screen.getByTestId('base-ten-counts')).toHaveTextContent('0 ones, 1 ten');expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('a zero target is not complete on mount',()=>{const onEvent=vi.fn();render(<BaseTenBlocks config={{target:0}} onEvent={onEvent}/>);expect(screen.getByTestId('widget-base-ten-blocks')).toHaveAttribute('data-state','building');expect(onEvent).not.toHaveBeenCalled()});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- BaseTenBlocks` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
export const BaseTenBlocksWidgetConfigSchema=z.object({target:z.number().int().min(0).max(9999).optional(),initial:z.object({ones:z.number().int().min(0).max(9),tens:z.number().int().min(0).max(9),hundreds:z.number().int().min(0).max(9),thousands:z.number().int().min(0).max(9)}).strict().optional(),allowRegroup:z.boolean().optional()}).strict();
export const BaseTenBlocksWidgetRefSchema=z.object({type:z.literal('base-ten-blocks'),config:BaseTenBlocksWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
type BaseTenValue={ones:number;tens:number;hundreds:number;thousands:number;value:number};
'base-ten-blocks':{type:'interaction';action:'add-block'|'remove-block'|'regroup'|'reset'}|{type:'change';value:BaseTenValue}|{type:'complete';value:BaseTenValue};
'base-ten-blocks':lazy(()=>import('./math/BaseTenBlocks')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'base-ten-blocks':{const Widget=widgetRegistry['base-ten-blocks'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
type Counts={ones:number;tens:number;hundreds:number;thousands:number};const ZERO:Counts={ones:0,tens:0,hundreds:0,thousands:0};const valueOf=(c:Counts)=>c.ones+c.tens*10+c.hundreds*100+c.thousands*1000;
export default function BaseTenBlocks({config,onEvent}:WidgetProps<'base-ten-blocks'>){const key=JSON.stringify(config),initial=config.initial??ZERO;const [counts,setCounts]=useState(initial);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>setCounts(initial),[key]);const commit=(next:Counts,action:'add-block'|'remove-block'|'regroup'|'reset')=>{const value=valueOf(next);setCounts(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{...next,value}});if(config.target!==undefined&&value===config.target)completeOnce(()=>onEvent({type:'complete',value:{...next,value}}))};const value=valueOf(counts);return <section className="card widget-experiment base-ten" data-testid="widget-base-ten-blocks" data-state={completed?'complete':'building'} data-complete={completed?'yes':'no'}><div className="widget-head"><h3 className="widget-title">Base-ten blocks</h3><button onClick={()=>commit(ZERO,'reset')}>Start over</button></div>{(['ones','tens','hundreds','thousands'] as const).map(p=><div key={p}><span>{counts[p]} {p}</span><button aria-label={`Add one ${p==='ones'?'block':p.slice(0,-1)+' block'}`} disabled={counts[p]>=10} onClick={()=>commit({...counts,[p]:Math.min(10,counts[p]+1)},'add-block')}>+</button><button aria-label={`Remove one ${p==='ones'?'block':p.slice(0,-1)+' block'}`} disabled={!counts[p]} onClick={()=>commit({...counts,[p]:Math.max(0,counts[p]-1)},'remove-block')}>−</button></div>)}{config.allowRegroup&&<button aria-label="Regroup 10 ones" disabled={counts.ones<10||counts.tens>=10} onClick={()=>commit({...counts,ones:counts.ones-10,tens:counts.tens+1},'regroup')}>Regroup 10 ones</button>}<output data-testid="base-ten-counts">{counts.ones} ones, {counts.tens} ten</output><output data-testid="base-ten-value" aria-live="polite">{value}</output><p role="status">{completed?'Target complete.':`${value} built.`}</p></section>}
```

- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.base-ten button{min-width:44px;min-height:44px}.base-ten output{display:block;font-weight:700}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- BaseTenBlocks WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact M2 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/math/BaseTenBlocks.tsx src/widgets/math/BaseTenBlocks.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add base-ten blocks widget"
```

### Task M3: Fraction bars and circles

**Files:** Create `src/widgets/math/FractionModels.tsx`, `src/widgets/math/FractionModels.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict denominator/numerator config refined to numerator<=denominator; optional exact/equivalent target. Events `select-piece|clear-model`, change fraction, complete plus equivalence.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('uses next numerator and latches equivalent completion',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<FractionModels config={{mode:'both',denominator:4,target:{numerator:1,denominator:2},allowEquivalent:true}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Shade part 1 of 4'}));await user.click(screen.getByRole('button',{name:'Shade part 2 of 4'}));expect(screen.getAllByTestId('fraction-view')).toHaveLength(2);expect(onEvent.mock.calls.slice(-3).map(([e])=>e)).toEqual([{type:'interaction',action:'select-piece'},{type:'change',value:{numerator:2,denominator:4}},{type:'complete',value:{numerator:2,denominator:4,equivalent:true}}]);await user.click(screen.getByRole('button',{name:'Shade part 2 of 4'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('rejects an unreachable target and does not complete an initial zero target on mount',()=>{expect(FractionModelsWidgetConfigSchema.safeParse({mode:'bars',denominator:3,target:{numerator:1,denominator:2},allowEquivalent:true}).success).toBe(false);const onEvent=vi.fn();render(<FractionModels config={{mode:'bars',denominator:4,numerator:0,target:{numerator:0,denominator:4}}} onEvent={onEvent}/>);expect(screen.getByTestId('widget-fraction-models')).toHaveAttribute('data-state','choosing');expect(onEvent).not.toHaveBeenCalled()});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- FractionModels` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
export const FractionModelsWidgetConfigSchema=z.object({mode:z.enum(['bars','circles','both']),denominator:z.number().int().min(2).max(12),numerator:z.number().int().min(0).max(12).optional(),target:z.object({numerator:z.number().int().min(0).max(12),denominator:z.number().int().min(2).max(12)}).strict().optional(),allowEquivalent:z.boolean().optional()}).strict().superRefine((v,ctx)=>{if((v.numerator??0)>v.denominator)ctx.addIssue({code:z.ZodIssueCode.custom,path:['numerator'],message:'too large'});if(v.target&&v.target.numerator>v.target.denominator)ctx.addIssue({code:z.ZodIssueCode.custom,path:['target','numerator'],message:'too large'});if(v.target){const reachable=Array.from({length:v.denominator+1},(_,n)=>v.allowEquivalent?n*v.target!.denominator===v.target!.numerator*v.denominator:n===v.target!.numerator&&v.denominator===v.target!.denominator).some(Boolean);if(!reachable)ctx.addIssue({code:z.ZodIssueCode.custom,path:['target'],message:'target is unreachable with this denominator'})}});
export const FractionModelsWidgetRefSchema=z.object({type:z.literal('fraction-models'),config:FractionModelsWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'fraction-models':{type:'interaction';action:'select-piece'|'clear-model'}|{type:'change';value:{numerator:number;denominator:number}}|{type:'complete';value:{numerator:number;denominator:number;equivalent:boolean}};
'fraction-models':lazy(()=>import('./math/FractionModels')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'fraction-models':{const Widget=widgetRegistry['fraction-models'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
const equivalent=(a:number,b:number,c:number,d:number)=>a*d===c*b;
export default function FractionModels({config,onEvent}:WidgetProps<'fraction-models'>){const key=JSON.stringify(config),initial=Math.min(config.numerator??0,config.denominator);const [numerator,setNumerator]=useState(initial);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>setNumerator(initial),[key]);const matches=(n:number)=>!!config.target&&(config.allowEquivalent?equivalent(n,config.denominator,config.target.numerator,config.target.denominator):n===config.target.numerator&&config.denominator===config.target.denominator);const commit=(next:number,action:'select-piece'|'clear-model')=>{setNumerator(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{numerator:next,denominator:config.denominator}});if(config.target&&matches(next))completeOnce(()=>onEvent({type:'complete',value:{numerator:next,denominator:config.denominator,equivalent:equivalent(next,config.denominator,config.target!.numerator,config.target!.denominator)}}))};const view=(kind:string)=><div data-testid="fraction-view" data-kind={kind}>{Array.from({length:config.denominator},(_,i)=><span key={i} data-state={i<numerator?'shaded':'unshaded'}>{i<numerator?'shaded':'unshaded'}</span>)}</div>;return <section className="card widget-experiment fraction-models" data-testid="widget-fraction-models" data-state={completed?'complete':'choosing'} data-complete={completed?'yes':'no'}><button onClick={()=>commit(0,'clear-model')}>Clear model</button><div role="group" aria-label="Fraction parts">{Array.from({length:config.denominator},(_,i)=><button key={i} aria-label={`Shade part ${i+1} of ${config.denominator}`} aria-pressed={i<numerator} onClick={()=>commit(i+1,'select-piece')}>{i+1}</button>)}</div>{config.mode!=='circles'&&view('bars')}{config.mode!=='bars'&&view('circles')}<p role="status">{completed?'Equivalent fraction complete.':'Choose the shaded amount.'}</p></section>}
```

- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.fraction-models [data-testid="fraction-view"]{display:flex;gap:.5rem}.fraction-models button{min-width:44px;min-height:44px}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- FractionModels WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact M3 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/math/FractionModels.tsx src/widgets/math/FractionModels.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add fraction model widget"
```

### Task M4: Area-model multiplier

**Files:** Create `src/widgets/math/AreaModelMultiplier.tsx`, `src/widgets/math/AreaModelMultiplier.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict `{a:1..99,b:1..99,splitA?:positive integers[],splitB?:positive integers[],targetProduct?:1..9801}`; splits sum to factors and target equals product. Events `select-cell|reset`; change selected count/product; complete product after every cell.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('selects every partition and completes configured product once',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<AreaModelMultiplier config={{a:23,b:4,splitA:[20,3],splitB:[4],targetProduct:92}} onEvent={onEvent}/>);expect(screen.getByText('20 × 4 = 80')).toBeInTheDocument();await user.click(screen.getByRole('button',{name:'Select 20 by 4 cell'}));await user.click(screen.getByRole('button',{name:'Select 3 by 4 cell'}));expect(onEvent.mock.calls.slice(-3).map(([e])=>e)).toEqual([{type:'interaction',action:'select-cell'},{type:'change',value:{selectedCells:2,product:92}},{type:'complete',value:{product:92}}]);await user.click(screen.getByRole('button',{name:'Select 3 by 4 cell'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('the authored product alone does not present completion before cell interaction',()=>{const onEvent=vi.fn();render(<AreaModelMultiplier config={{a:2,b:3,targetProduct:6}} onEvent={onEvent}/>);expect(screen.getByTestId('widget-area-model-multiplier')).toHaveAttribute('data-state','building');expect(onEvent).not.toHaveBeenCalled()});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- AreaModelMultiplier` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
export const AreaModelMultiplierWidgetConfigSchema=z.object({a:z.number().int().min(1).max(99),b:z.number().int().min(1).max(99),splitA:z.array(z.number().int().positive()).min(1).optional(),splitB:z.array(z.number().int().positive()).min(1).optional(),targetProduct:z.number().int().min(1).max(9801).optional()}).strict().superRefine((v,ctx)=>{if(v.splitA&&v.splitA.reduce((a,b)=>a+b,0)!==v.a)ctx.addIssue({code:z.ZodIssueCode.custom,path:['splitA'],message:'must sum to a'});if(v.splitB&&v.splitB.reduce((a,b)=>a+b,0)!==v.b)ctx.addIssue({code:z.ZodIssueCode.custom,path:['splitB'],message:'must sum to b'});if(v.targetProduct!==undefined&&v.targetProduct!==v.a*v.b)ctx.addIssue({code:z.ZodIssueCode.custom,path:['targetProduct'],message:'must equal product'})});
export const AreaModelMultiplierWidgetRefSchema=z.object({type:z.literal('area-model-multiplier'),config:AreaModelMultiplierWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'area-model-multiplier':{type:'interaction';action:'select-cell'|'reset'}|{type:'change';value:{selectedCells:number;product:number}}|{type:'complete';value:{product:number}};
'area-model-multiplier':lazy(()=>import('./math/AreaModelMultiplier')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'area-model-multiplier':{const Widget=widgetRegistry['area-model-multiplier'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function AreaModelMultiplier({config,onEvent}:WidgetProps<'area-model-multiplier'>){const key=JSON.stringify(config),partsA=config.splitA??[config.a],partsB=config.splitB??[config.b],cells=partsA.flatMap((a,ai)=>partsB.map((b,bi)=>({id:`${ai}-${bi}`,a,b}))),product=config.a*config.b;const [selected,setSelected]=useState<string[]>([]);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>setSelected([]),[key]);const commit=(next:string[],action:'select-cell'|'reset')=>{setSelected(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{selectedCells:next.length,product}});if(config.targetProduct===product&&next.length===cells.length)completeOnce(()=>onEvent({type:'complete',value:{product}}))};return <section className="card widget-experiment area-model" data-testid="widget-area-model-multiplier" data-state={completed?'complete':'building'} data-complete={completed?'yes':'no'}><button onClick={()=>commit([],'reset')}>Start over</button><div role="grid" data-widget-grid>{cells.map(c=><button role="gridcell" key={c.id} aria-label={`Select ${c.a} by ${c.b} cell`} aria-pressed={selected.includes(c.id)} onClick={()=>commit(selected.includes(c.id)?selected:selected.concat(c.id),'select-cell')}>{c.a} × {c.b} = {c.a*c.b}</button>)}</div><output data-testid="area-model-total">{product}</output><p role="status">{completed?'All partial products make the target.':`${selected.length} of ${cells.length} cells selected.`}</p></section>}
```

- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.area-model [data-widget-grid]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.5rem}.area-model button{min-height:44px}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- AreaModelMultiplier WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact M4 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/math/AreaModelMultiplier.tsx src/widgets/math/AreaModelMultiplier.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add area model multiplier widget"
```

### Task M5: Array builder

**Files:** Create `src/widgets/math/ArrayBuilder.tsx`, `src/widgets/math/ArrayBuilder.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict `{rows:1..20,columns:1..20,targetProduct?:1..400,editable?:boolean}`. Events row/column/reset; change/complete rows, columns, product.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('clamps steppers and emits ordered one-shot completion',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<ArrayBuilder config={{rows:2,columns:4,targetProduct:12,editable:true}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Add one row'}));expect(screen.getAllByRole('gridcell')).toHaveLength(12);expect(onEvent.mock.calls.slice(-3).map(([e])=>e)).toEqual([{type:'interaction',action:'change-rows'},{type:'change',value:{rows:3,columns:4,product:12}},{type:'complete',value:{rows:3,columns:4,product:12}}]);await user.click(screen.getByRole('button',{name:'Remove one row'}));await user.click(screen.getByRole('button',{name:'Add one row'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('an initially matching array target is not complete on mount',()=>{const onEvent=vi.fn();render(<ArrayBuilder config={{rows:2,columns:4,targetProduct:8,editable:true}} onEvent={onEvent}/>);expect(screen.getByTestId('widget-array-builder')).toHaveAttribute('data-state','building');expect(onEvent).not.toHaveBeenCalled()});
test('rejects an unreachable product when dimensions cannot be edited or factored',()=>{expect(ArrayBuilderWidgetConfigSchema.safeParse({rows:2,columns:3,targetProduct:12,editable:false}).success).toBe(false);expect(ArrayBuilderWidgetConfigSchema.safeParse({rows:2,columns:3,targetProduct:397,editable:true}).success).toBe(false)});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- ArrayBuilder` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
export const ArrayBuilderWidgetConfigSchema=z.object({rows:z.number().int().min(1).max(20),columns:z.number().int().min(1).max(20),targetProduct:z.number().int().min(1).max(400).optional(),editable:z.boolean().optional()}).strict().superRefine((v,ctx)=>{if(v.targetProduct===undefined)return;const initial=v.rows*v.columns,reachable=initial===v.targetProduct||!!v.editable&&Array.from({length:20},(_,i)=>i+1).some(rows=>v.targetProduct!%rows===0&&v.targetProduct!/rows<=20);if(!reachable)ctx.addIssue({code:z.ZodIssueCode.custom,path:['targetProduct'],message:'target product is unreachable'})});
export const ArrayBuilderWidgetRefSchema=z.object({type:z.literal('array-builder'),config:ArrayBuilderWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'array-builder':{type:'interaction';action:'change-rows'|'change-columns'|'reset'}|{type:'change';value:{rows:number;columns:number;product:number}}|{type:'complete';value:{rows:number;columns:number;product:number}};
'array-builder':lazy(()=>import('./math/ArrayBuilder')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'array-builder':{const Widget=widgetRegistry['array-builder'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function ArrayBuilder({config,onEvent}:WidgetProps<'array-builder'>){const key=JSON.stringify(config);const [size,setSize]=useState({rows:config.rows,columns:config.columns});const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>setSize({rows:config.rows,columns:config.columns}),[key]);const commit=(next:{rows:number;columns:number},action:'change-rows'|'change-columns'|'reset')=>{const value={...next,product:next.rows*next.columns};setSize(next);onEvent({type:'interaction',action});onEvent({type:'change',value});if(config.targetProduct!==undefined&&value.product===config.targetProduct)completeOnce(()=>onEvent({type:'complete',value}))};const product=size.rows*size.columns;return <section className="card widget-experiment array-builder" data-testid="widget-array-builder" data-state={completed?'complete':'building'} data-complete={completed?'yes':'no'}><button aria-label="Remove one row" disabled={!config.editable||size.rows===1} onClick={()=>commit({...size,rows:Math.max(1,size.rows-1)},'change-rows')}>− row</button><button aria-label="Add one row" disabled={!config.editable||size.rows===20} onClick={()=>commit({...size,rows:Math.min(20,size.rows+1)},'change-rows')}>+ row</button><button aria-label="Remove one column" disabled={!config.editable||size.columns===1} onClick={()=>commit({...size,columns:Math.max(1,size.columns-1)},'change-columns')}>− column</button><button aria-label="Add one column" disabled={!config.editable||size.columns===20} onClick={()=>commit({...size,columns:Math.min(20,size.columns+1)},'change-columns')}>+ column</button><button onClick={()=>commit({rows:config.rows,columns:config.columns},'reset')}>Start over</button><div role="grid" data-widget-grid style={{gridTemplateColumns:`repeat(${size.columns},minmax(20px,1fr))`}}>{Array.from({length:product},(_,i)=><span role="gridcell" key={i}>●</span>)}</div><output>{size.rows} × {size.columns} = {product}</output><p role="status">{completed?'Target array complete.':'Adjust rows and columns.'}</p></section>}
```

- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.array-builder [data-widget-grid]{display:grid;grid-template-columns:repeat(var(--array-columns,4),minmax(20px,1fr));gap:.25rem}.array-builder button{min-height:44px}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- ArrayBuilder WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact M5 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/math/ArrayBuilder.tsx src/widgets/math/ArrayBuilder.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add array builder widget"
```

### Task M6: Money counter

**Files:** Create `src/widgets/math/MoneyCounter.tsx`, `src/widgets/math/MoneyCounter.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict optional target 0..9999 and unique denomination subset of 1,5,10,25,100. A bounded nonnegative reachability table through `targetCents` rejects exact amounts that the configured unlimited coins cannot make. Events add/remove/reset; cumulative total plus five-key counts.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('retains denomination counts and completes 85 cents once',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<MoneyCounter config={{targetCents:85}} onEvent={onEvent}/>);for(let i=0;i<3;i++)await user.click(screen.getByRole('button',{name:'Add a quarter'}));await user.click(screen.getByRole('button',{name:'Add a dime'}));expect(screen.getByTestId('money-count-25')).toHaveTextContent('3');expect(onEvent.mock.calls.slice(-3).map(([e])=>e)).toEqual([{type:'interaction',action:'add-coin'},{type:'change',value:{totalCents:85,counts:{'1':0,'5':0,'10':1,'25':3,'100':0}}},{type:'complete',value:{totalCents:85,counts:{'1':0,'5':0,'10':1,'25':3,'100':0}}}]);await user.click(screen.getByRole('button',{name:'Remove a dime'}));await user.click(screen.getByRole('button',{name:'Add a dime'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('rejects a target unreachable by its denomination set',()=>expect(MoneyCounterWidgetConfigSchema.safeParse({targetCents:3,denominations:[5,10]}).success).toBe(false));
test('rejects gcd-only false positives with bounded reachability',()=>{expect(MoneyCounterWidgetConfigSchema.safeParse({targetCents:2,denominations:[6,10]}).success).toBe(false);expect(MoneyCounterWidgetConfigSchema.safeParse({targetCents:5,denominations:[10,25]}).success).toBe(false)});
test('a zero-cent target is not complete on mount',()=>{const onEvent=vi.fn();render(<MoneyCounter config={{targetCents:0}} onEvent={onEvent}/>);expect(screen.getByTestId('widget-money-counter')).toHaveAttribute('data-state','building');expect(onEvent).not.toHaveBeenCalled()});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- MoneyCounter` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const DenominationSchema=z.union([z.literal(1),z.literal(5),z.literal(10),z.literal(25),z.literal(100)]);
const canMakeMoneyTarget=(target:number,denominations:readonly number[])=>{const reachable=Array<boolean>(target+1).fill(false);reachable[0]=true;for(let cents=1;cents<=target;cents++)reachable[cents]=denominations.some(coin=>coin<=cents&&reachable[cents-coin]);return reachable[target]};
export const MoneyCounterWidgetConfigSchema=z.object({targetCents:z.number().int().min(0).max(9999).optional(),denominations:z.array(DenominationSchema).min(1).refine(v=>new Set(v).size===v.length,'duplicates').optional()}).strict().superRefine((v,ctx)=>{if(v.targetCents===undefined)return;const denoms=v.denominations??[1,5,10,25,100];if(!canMakeMoneyTarget(v.targetCents,denoms))ctx.addIssue({code:z.ZodIssueCode.custom,path:['targetCents'],message:'target is unreachable with these denominations'})});
export const MoneyCounterWidgetRefSchema=z.object({type:z.literal('money-counter'),config:MoneyCounterWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
type MoneyCounts=Record<'1'|'5'|'10'|'25'|'100',number>;type MoneyValue={totalCents:number;counts:MoneyCounts};
'money-counter':{type:'interaction';action:'add-coin'|'remove-coin'|'reset'}|{type:'change';value:MoneyValue}|{type:'complete';value:MoneyValue};
'money-counter':lazy(()=>import('./math/MoneyCounter')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'money-counter':{const Widget=widgetRegistry['money-counter'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
type Denom=1|5|10|25|100;type Counts=Record<'1'|'5'|'10'|'25'|'100',number>;const ZERO:Counts={'1':0,'5':0,'10':0,'25':0,'100':0};const names:Record<Denom,string>={1:'penny',5:'nickel',10:'dime',25:'quarter',100:'dollar'};const total=(c:Counts)=>Object.entries(c).reduce((sum,[d,n])=>sum+Number(d)*n,0);
export default function MoneyCounter({config,onEvent}:WidgetProps<'money-counter'>){const key=JSON.stringify(config),denoms:Denom[]=config.denominations??[1,5,10,25,100];const [counts,setCounts]=useState<Counts>(ZERO);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>setCounts(ZERO),[key]);const commit=(next:Counts,action:'add-coin'|'remove-coin'|'reset')=>{const value={totalCents:total(next),counts:next};setCounts(next);onEvent({type:'interaction',action});onEvent({type:'change',value});if(config.targetCents!==undefined&&value.totalCents===config.targetCents)completeOnce(()=>onEvent({type:'complete',value}))};const cents=total(counts);return <section className="card widget-experiment money" data-testid="widget-money-counter" data-state={completed?'complete':'building'} data-complete={completed?'yes':'no'}>{denoms.map(d=><div key={d}><button aria-label={`Add a ${names[d]}`} onClick={()=>commit({...counts,[String(d)]:counts[String(d) as keyof Counts]+1},'add-coin')}>+{d}</button><button aria-label={`Remove a ${names[d]}`} disabled={!counts[String(d) as keyof Counts]} onClick={()=>commit({...counts,[String(d)]:Math.max(0,counts[String(d) as keyof Counts]-1)},'remove-coin')}>−{d}</button><output data-testid={`money-count-${d}`}>{counts[String(d) as keyof Counts]}</output></div>)}<button onClick={()=>commit(ZERO,'reset')}>Start over</button><output>{cents}¢</output><p role="status">{completed?'Target amount complete.':`${cents} cents counted.`}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.money{display:grid;gap:.75rem}.widget-experiment.money output{font-variant-numeric:tabular-nums}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- MoneyCounter WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact M6 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/math/MoneyCounter.tsx src/widgets/math/MoneyCounter.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add money counter widget"
```

### Task M7: Clock and elapsed time

**Files:** Create `src/widgets/math/ClockElapsedTime.tsx`, `src/widgets/math/ClockElapsedTime.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict discriminated config: set-time requires `targetTime`; elapsed requires `startTime` and `elapsedMinutes`; `minuteStep?:5|15`. Elapsed renders without mount events. Set controls emit hour/minute/reset and complete a target once.

- [ ] **Step 1 (2–5 minutes): Write red tests**

```tsx
test('elapsed mode crosses midnight without mount events',()=>{const onEvent=vi.fn();render(<ClockElapsedTime config={{mode:'elapsed',startTime:'23:45',elapsedMinutes:30,minuteStep:15}} onEvent={onEvent}/>);expect(screen.getByTestId('clock-result')).toHaveTextContent('12:15 AM');expect(onEvent).not.toHaveBeenCalled()});
test('set-time controls emit next time and one completion',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<ClockElapsedTime config={{mode:'set-time',targetTime:'01:15',minuteStep:15}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Increase hour'}));await user.click(screen.getByRole('button',{name:'Increase minute'}));expect(onEvent.mock.calls.slice(-3).map(([e])=>e)).toEqual([{type:'interaction',action:'change-minute'},{type:'change',value:{hour:1,minute:15,totalMinutes:75}},{type:'complete',value:{hour:1,minute:15,totalMinutes:75}}]);await user.click(screen.getByRole('button',{name:'Decrease minute'}));await user.click(screen.getByRole('button',{name:'Increase minute'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('midnight target does not complete on mount',()=>{const onEvent=vi.fn();render(<ClockElapsedTime config={{mode:'set-time',targetTime:'00:00'}} onEvent={onEvent}/>);expect(screen.getByTestId('widget-clock-elapsed-time')).toHaveAttribute('data-state','setting');expect(onEvent).not.toHaveBeenCalled()});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- ClockElapsedTime` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const TimeSchema=z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),MinuteStepSchema=z.union([z.literal(5),z.literal(15)]);const minutePart=(time:string)=>Number(time.slice(3));
const SetTimeConfigSchema=z.object({mode:z.literal('set-time'),targetTime:TimeSchema,minuteStep:MinuteStepSchema.optional()}).strict().refine(v=>minutePart(v.targetTime)%(v.minuteStep??5)===0,{path:['targetTime'],message:'target must align to minuteStep'});
const ElapsedTimeConfigSchema=z.object({mode:z.literal('elapsed'),startTime:TimeSchema,elapsedMinutes:z.number().int().min(0).max(1439),minuteStep:MinuteStepSchema.optional()}).strict();
export const ClockElapsedTimeWidgetConfigSchema=z.discriminatedUnion('mode',[SetTimeConfigSchema,ElapsedTimeConfigSchema]);
export const ClockElapsedTimeWidgetRefSchema=z.object({type:z.literal('clock-elapsed-time'),config:ClockElapsedTimeWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time'] as const;
export const WidgetRefSchema=z.discriminatedUnion('type',[
 z.object({type:z.literal('place-value-builder'),config:PlaceValueWidgetConfigSchema}).strict(),
 z.object({type:z.literal('number-line-compare'),config:NumberLineWidgetConfigSchema}).strict(),
 BaseTenBlocksWidgetRefSchema,
 FractionModelsWidgetRefSchema,
 AreaModelMultiplierWidgetRefSchema,
 ArrayBuilderWidgetRefSchema,
 MoneyCounterWidgetRefSchema,
 ClockElapsedTimeWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
type ClockValue={hour:number;minute:number;totalMinutes:number};
'clock-elapsed-time':{type:'interaction';action:'change-hour'|'change-minute'|'reset'}|{type:'change';value:ClockValue}|{type:'complete';value:ClockValue};
'clock-elapsed-time':lazy(()=>import('./math/ClockElapsedTime')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'clock-elapsed-time':{const Widget=widgetRegistry['clock-elapsed-time'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
const parseTime=(s:string)=>Number(s.slice(0,2))*60+Number(s.slice(3));const clockValue=(total:number)=>({hour:Math.floor(total/60)%24,minute:total%60,totalMinutes:total});const formatClock=(total:number)=>{const {hour,minute}=clockValue((total+1440)%1440);return `${((hour+11)%12)+1}:${String(minute).padStart(2,'0')} ${hour<12?'AM':'PM'}`};
export default function ClockElapsedTime({config,onEvent}:WidgetProps<'clock-elapsed-time'>){const key=JSON.stringify(config),step=config.minuteStep??5,elapsed=config.mode==='elapsed'?(parseTime(config.startTime)+config.elapsedMinutes)%1440:0;const [minutes,setMinutes]=useState(0);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>setMinutes(0),[key]);const target=config.mode==='set-time'?parseTime(config.targetTime):null;const commit=(next:number,action:'change-hour'|'change-minute'|'reset')=>{const normalized=(next+1440)%1440,value=clockValue(normalized);setMinutes(normalized);onEvent({type:'interaction',action});onEvent({type:'change',value});if(target!==null&&normalized===target)completeOnce(()=>onEvent({type:'complete',value}))};const shown=config.mode==='elapsed'?elapsed:minutes;return <section className="card widget-experiment clock" data-testid="widget-clock-elapsed-time" data-state={config.mode==='elapsed'?'result':completed?'complete':'setting'} data-complete={completed?'yes':'no'}>{config.mode==='set-time'&&<><button aria-label="Decrease hour" onClick={()=>commit(minutes-60,'change-hour')}>− hour</button><button aria-label="Increase hour" onClick={()=>commit(minutes+60,'change-hour')}>+ hour</button><button aria-label="Decrease minute" onClick={()=>commit(minutes-step,'change-minute')}>− minute</button><button aria-label="Increase minute" onClick={()=>commit(minutes+step,'change-minute')}>+ minute</button><button onClick={()=>commit(0,'reset')}>Start over</button></>}<output data-testid="clock-result">{formatClock(shown)}</output><p role="status">{config.mode==='elapsed'?`Elapsed-time result: ${formatClock(shown)}.`:completed?'Target time complete.':`Clock shows ${formatClock(shown)}.`}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.clock{display:grid;gap:.75rem}.widget-experiment.clock output{font-variant-numeric:tabular-nums;font-size:1.5rem}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- ClockElapsedTime WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact M7 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/math/ClockElapsedTime.tsx src/widgets/math/ClockElapsedTime.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add clock elapsed-time widget"
```

### Task M8: Quarter-inch ruler

**Files:** Create `src/widgets/math/QuarterInchRuler.tsx`, `src/widgets/math/QuarterInchRuler.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict quarter-aligned length 1..24, target/start within length. Events `move-marker|reset`; change/complete inches.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('moves to 2.25 inches with next-state events and one completion',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<QuarterInchRuler config={{lengthInches:3,targetInches:2.25}} onEvent={onEvent}/>);for(let i=0;i<9;i++)await user.click(screen.getByRole('button',{name:'Move marker right one quarter inch'}));expect(screen.getAllByTestId('ruler-tick')).toHaveLength(13);expect(onEvent.mock.calls.slice(-3).map(([e])=>e)).toEqual([{type:'interaction',action:'move-marker'},{type:'change',value:{inches:2.25}},{type:'complete',value:{inches:2.25}}]);await user.click(screen.getByRole('button',{name:'Move marker left one quarter inch'}));await user.click(screen.getByRole('button',{name:'Move marker right one quarter inch'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('equal start and target do not complete on mount',()=>{const onEvent=vi.fn();render(<QuarterInchRuler config={{lengthInches:3,startInches:1,targetInches:1}} onEvent={onEvent}/>);expect(screen.getByTestId('widget-quarter-inch-ruler')).toHaveAttribute('data-state','measuring');expect(onEvent).not.toHaveBeenCalled()});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- QuarterInchRuler` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const quarter=(n:number)=>Math.abs(n*4-Math.round(n*4))<1e-9;
export const QuarterInchRulerWidgetConfigSchema=z.object({lengthInches:z.number().int().min(1).max(24).optional(),targetInches:z.number().min(0).max(24),startInches:z.number().min(0).max(24).optional()}).strict().superRefine((v,ctx)=>{const length=v.lengthInches??12;if(!quarter(v.targetInches)||!quarter(v.startInches??0))ctx.addIssue({code:z.ZodIssueCode.custom,message:'quarter increments required'});if(v.targetInches>length||(v.startInches??0)>length)ctx.addIssue({code:z.ZodIssueCode.custom,message:'marker exceeds ruler'})});
export const QuarterInchRulerWidgetRefSchema=z.object({type:z.literal('quarter-inch-ruler'),config:QuarterInchRulerWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler'] as const;
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
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'quarter-inch-ruler':{type:'interaction';action:'move-marker'|'reset'}|{type:'change';value:{inches:number}}|{type:'complete';value:{inches:number}};
'quarter-inch-ruler':lazy(()=>import('./math/QuarterInchRuler')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'quarter-inch-ruler':{const Widget=widgetRegistry['quarter-inch-ruler'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function QuarterInchRuler({config,onEvent}:WidgetProps<'quarter-inch-ruler'>){const key=JSON.stringify(config),length=config.lengthInches??12,start=config.startInches??0;const [inches,setInches]=useState(start);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>setInches(start),[key]);const commit=(raw:number,action:'move-marker'|'reset')=>{const next=Math.round(Math.max(0,Math.min(length,raw))*4)/4;setInches(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{inches:next}});if(next===config.targetInches)completeOnce(()=>onEvent({type:'complete',value:{inches:next}}))};return <section className="card widget-experiment ruler" data-testid="widget-quarter-inch-ruler" data-state={completed?'complete':'measuring'} data-complete={completed?'yes':'no'}><button aria-label="Move marker left one quarter inch" disabled={inches===0} onClick={()=>commit(inches-.25,'move-marker')}>←</button><button aria-label="Move marker right one quarter inch" disabled={inches===length} onClick={()=>commit(inches+.25,'move-marker')}>→</button><button onClick={()=>commit(start,'reset')}>Start over</button><div>{Array.from({length:length*4+1},(_,i)=><span key={i} data-testid="ruler-tick">{i%4===0?i/4:'|'}</span>)}</div><output>{inches} inches</output><p role="status">{completed?'Target measurement complete.':`Marker at ${inches} inches.`}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.ruler{display:grid;gap:.75rem}.widget-experiment.ruler [data-widget-grid]{display:grid;grid-auto-flow:column}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- QuarterInchRuler WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact M8 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/math/QuarterInchRuler.tsx src/widgets/math/QuarterInchRuler.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add quarter-inch ruler widget"
```

### Task M9: Balance scale

**Files:** Create `src/widgets/math/BalanceScale.tsx`, `src/widgets/math/BalanceScale.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict unique weighted items on left/right and `task?:'compare'|'make-equal'`. Compare uses explicit relation buttons; make-equal uses retained add/remove toggles and Check. Events add/remove/check/reset; totals payload.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('checks the learner comparison instead of hard-coding completion and reset restores status',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<BalanceScale config={{left:[{id:'a',label:'2',value:2}],right:[{id:'b',label:'1+1',value:2}],task:'compare'}} onEvent={onEvent}/>);expect(screen.getByTestId('balance-beam')).toHaveAttribute('data-state','level');await user.click(screen.getByRole('button',{name:'Balanced'}));expect(onEvent.mock.calls).toEqual([[{type:'interaction',action:'check'}],[{type:'change',value:{leftTotal:2,rightTotal:2}}],[{type:'complete',value:{leftTotal:2,rightTotal:2}}]]);await user.click(screen.getByRole('button',{name:'Balanced'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1);await user.click(screen.getByRole('button',{name:'Start over'}));expect(screen.getByRole('status')).toHaveTextContent('Compare the pans.')});
test('rejects empty pans and nonpositive weights',()=>{expect(BalanceScaleWidgetConfigSchema.safeParse({left:[],right:[{id:'b',label:'B',value:1}]}).success).toBe(false);expect(BalanceScaleWidgetConfigSchema.safeParse({left:[{id:'a',label:'A',value:-1}],right:[{id:'b',label:'B',value:1}]}).success).toBe(false)});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- BalanceScale` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const WeightSchema=z.object({id:z.string().min(1),label:z.string().min(1),value:z.number().positive().finite()}).strict();
export const BalanceScaleWidgetConfigSchema=z.object({left:z.array(WeightSchema).min(1),right:z.array(WeightSchema).min(1),task:z.enum(['compare','make-equal']).optional()}).strict().refine(v=>{const ids=[...v.left,...v.right].map(x=>x.id);return new Set(ids).size===ids.length},'duplicate ids');
export const BalanceScaleWidgetRefSchema=z.object({type:z.literal('balance-scale'),config:BalanceScaleWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale'] as const;
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
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
type BalanceValue={leftTotal:number;rightTotal:number};
'balance-scale':{type:'interaction';action:'add-weight'|'remove-weight'|'check'|'reset'}|{type:'change';value:BalanceValue}|{type:'complete';value:BalanceValue};
'balance-scale':lazy(()=>import('./math/BalanceScale')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'balance-scale':{const Widget=widgetRegistry['balance-scale'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
type Relation='left'|'equal'|'right';
export default function BalanceScale({config,onEvent}:WidgetProps<'balance-scale'>){const key=JSON.stringify(config),all=[...config.left,...config.right],initialIds=all.map(x=>x.id);const [active,setActive]=useState(initialIds);const [status,setStatus]=useState('Compare the pans.');const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setActive(initialIds);setStatus('Compare the pans.')},[key]);const totals=(ids:string[])=>({leftTotal:config.left.filter(x=>ids.includes(x.id)).reduce((s,x)=>s+x.value,0),rightTotal:config.right.filter(x=>ids.includes(x.id)).reduce((s,x)=>s+x.value,0)});const emit=(ids:string[],action:'add-weight'|'remove-weight'|'check'|'reset',success=false)=>{const value=totals(ids);setActive(ids);onEvent({type:'interaction',action});onEvent({type:'change',value});if(success)completeOnce(()=>onEvent({type:'complete',value}))};const value=totals(active),truth:Relation=value.leftTotal>value.rightTotal?'left':value.leftTotal<value.rightTotal?'right':'equal';const choose=(choice:Relation)=>{const ok=choice===truth;setStatus(ok?'Correct comparison.':'Try the other relation.');emit(active,'check',ok)};const reset=()=>{setStatus('Compare the pans.');emit(initialIds,'reset')};return <section className="card widget-experiment balance" data-testid="widget-balance-scale" data-state={completed?'complete':'comparing'}><output data-testid="balance-beam" data-state={truth==='equal'?'level':truth}>{value.leftTotal} versus {value.rightTotal}</output>{all.map(w=><button key={w.id} aria-label={`${active.includes(w.id)?'Remove':'Add'} ${w.label} weight`} onClick={()=>{const on=active.includes(w.id),next=on?active.filter(id=>id!==w.id):active.concat(w.id);emit(next,on?'remove-weight':'add-weight')}}>{w.label}</button>)}{(config.task??'compare')==='compare'?<><button aria-label="Left is heavier" onClick={()=>choose('left')}>Left</button><button aria-label="Balanced" onClick={()=>choose('equal')}>Balanced</button><button aria-label="Right is heavier" onClick={()=>choose('right')}>Right</button></>:<button aria-label="Check balance" onClick={()=>{const ok=truth==='equal';setStatus(ok?'Scale is balanced.':'Totals are not equal yet.');emit(active,'check',ok)}}>Check</button>}<button onClick={reset}>Start over</button><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.balance{display:grid;gap:.75rem}.widget-experiment.balance [data-state="level"]{border-block-start:4px solid var(--c-good-action)}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- BalanceScale WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact M9 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/math/BalanceScale.tsx src/widgets/math/BalanceScale.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add balance scale widget"
```

### Task M10: Shape classifier

**Files:** Create `src/widgets/math/ShapeClassifier.tsx`, `src/widgets/math/ShapeClassifier.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Bins carry explicit numeric `value`; the selected rule maps each shape's `sides|angles|parallelPairs` to that value. Retained placements complete only when all are correct.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('retains two correct button placements and completes once',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<ShapeClassifier config={{shapes:[{id:'triangle',label:'Triangle',sides:3,angles:3,parallelPairs:0},{id:'square',label:'Square',sides:4,angles:4,parallelPairs:2}],bins:[{id:'three',label:'3 sides',value:3},{id:'four',label:'4 sides',value:4}],rule:'sides'}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Select Triangle'}));await user.click(screen.getByRole('button',{name:'Place selected shape in 3 sides'}));await user.click(screen.getByRole('button',{name:'Select Square'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Place selected shape in 4 sides'}));expect(screen.getByTestId('shape-placement-triangle')).toHaveTextContent('three');expect(screen.getByTestId('widget-shape-classifier')).toHaveAttribute('data-complete','yes');expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'place-shape'},{type:'change',value:{placements:{triangle:'three',square:'four'}}},{type:'complete',value:{placements:{triangle:'three',square:'four'}}}])});
test('rejects duplicate bin values and an uncovered rule value',()=>{const shapes=[{id:'triangle',label:'Triangle',sides:3,angles:3,parallelPairs:0},{id:'square',label:'Square',sides:4,angles:4,parallelPairs:2}];expect(ShapeClassifierWidgetConfigSchema.safeParse({shapes,bins:[{id:'a',label:'A',value:3},{id:'b',label:'B',value:3}],rule:'sides'}).success).toBe(false);expect(ShapeClassifierWidgetConfigSchema.safeParse({shapes,bins:[{id:'a',label:'A',value:3},{id:'b',label:'B',value:5}],rule:'sides'}).success).toBe(false)});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- ShapeClassifier` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const ShapeSchema=z.object({id:z.string().min(1),label:z.string().min(1),sides:z.number().int().min(0),angles:z.number().int().min(0),parallelPairs:z.number().int().min(0)}).strict();const ShapeBinSchema=z.object({id:z.string().min(1),label:z.string().min(1),value:z.number().int().min(0)}).strict();
export const ShapeClassifierWidgetConfigSchema=z.object({shapes:z.array(ShapeSchema).min(2),bins:z.array(ShapeBinSchema).min(2),rule:z.enum(['sides','angles','parallelPairs'])}).strict().superRefine((v,ctx)=>{if(new Set(v.shapes.map(x=>x.id)).size!==v.shapes.length||new Set(v.bins.map(x=>x.id)).size!==v.bins.length)ctx.addIssue({code:z.ZodIssueCode.custom,message:'duplicate ids'});if(new Set(v.bins.map(x=>x.value)).size!==v.bins.length)ctx.addIssue({code:z.ZodIssueCode.custom,path:['bins'],message:'bin values must be unique'});if(!v.shapes.every(s=>v.bins.some(b=>b.value===s[v.rule])))ctx.addIssue({code:z.ZodIssueCode.custom,path:['bins'],message:'every rule value needs a bin'})});
export const ShapeClassifierWidgetRefSchema=z.object({type:z.literal('shape-classifier'),config:ShapeClassifierWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier'] as const;
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
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'shape-classifier':{type:'interaction';action:'select-shape'|'place-shape'|'reset'}|{type:'change';value:{placements:Record<string,string>}}|{type:'complete';value:{placements:Record<string,string>}};
'shape-classifier':lazy(()=>import('./math/ShapeClassifier')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'shape-classifier':{const Widget=widgetRegistry['shape-classifier'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function ShapeClassifier({config,onEvent}:WidgetProps<'shape-classifier'>){const key=JSON.stringify(config);const [selected,setSelected]=useState<string|null>(null),[placements,setPlacements]=useState<Record<string,string>>({});const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setSelected(null);setPlacements({})},[key]);const emit=(next:Record<string,string>,action:'select-shape'|'place-shape'|'reset')=>{setPlacements(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{placements:next}});const ok=config.shapes.every(s=>config.bins.find(b=>b.id===next[s.id])?.value===s[config.rule]);if(ok)completeOnce(()=>onEvent({type:'complete',value:{placements:next}}))};const choose=(id:string)=>{setSelected(id);emit(placements,'select-shape')};const place=(bin:string)=>{if(!selected)return;emit({...placements,[selected]:bin},'place-shape')};return <section className="card widget-experiment shapes" data-testid="widget-shape-classifier" data-state={completed?'complete':'sorting'} data-complete={completed?'yes':'no'}>{config.shapes.map(s=><div key={s.id}><button aria-label={`Select ${s.label}`} aria-pressed={selected===s.id} onClick={()=>choose(s.id)}>{s.label}</button><output data-testid={`shape-placement-${s.id}`}>{placements[s.id]??''}</output></div>)}{config.bins.map(b=><button key={b.id} aria-label={`Place selected shape in ${b.label}`} disabled={!selected} onClick={()=>place(b.id)}>{b.label}</button>)}<button onClick={()=>{setSelected(null);emit({},'reset')}}>Start over</button><p role="status">{completed?'Every shape is classified.':selected?'Choose a bin.':'Select a shape.'}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.shapes{display:grid;gap:.75rem}.widget-experiment.shapes output{min-block-size:1.5em}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- ShapeClassifier WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact M10 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/math/ShapeClassifier.tsx src/widgets/math/ShapeClassifier.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add shape classifier widget"
```

### Task M11: Data plot builder

**Files:** Create `src/widgets/math/DataPlotBuilder.tsx`, `src/widgets/math/DataPlotBuilder.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict bar/dot prompt, unique categories, exact nonnegative target for every category. Increment/decrement/reset retain values and complete exact plot once.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('buttons build two dots and emit exact completion',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<DataPlotBuilder config={{kind:'dot',prompt:'Build',categories:['A'],target:{A:2}}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Increase A'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Increase A'}));expect(screen.getAllByTestId('dot-A')).toHaveLength(2);expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'increase-value'},{type:'change',value:{values:{A:2}}},{type:'complete',value:{values:{A:2}}}]);await user.click(screen.getByRole('button',{name:'Decrease A'}));await user.click(screen.getByRole('button',{name:'Increase A'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('an all-zero target is not complete on mount',()=>{const onEvent=vi.fn();render(<DataPlotBuilder config={{kind:'bar',prompt:'Build',categories:['A'],target:{A:0}}} onEvent={onEvent}/>);expect(screen.getByTestId('widget-data-plot-builder')).toHaveAttribute('data-state','building');expect(onEvent).not.toHaveBeenCalled()});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- DataPlotBuilder` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
export const DataPlotBuilderWidgetConfigSchema=z.object({kind:z.enum(['bar','dot']),prompt:z.string().min(1),categories:z.array(z.string().min(1)).min(1).refine(v=>new Set(v).size===v.length,'duplicates'),target:z.record(z.number().int().min(0).max(50))}).strict().refine(v=>Object.keys(v.target).length===v.categories.length&&v.categories.every(c=>c in v.target),'target keys must equal categories');
export const DataPlotBuilderWidgetRefSchema=z.object({type:z.literal('data-plot-builder'),config:DataPlotBuilderWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder'] as const;
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
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'data-plot-builder':{type:'interaction';action:'increase-value'|'decrease-value'|'reset'}|{type:'change';value:{values:Record<string,number>}}|{type:'complete';value:{values:Record<string,number>}};
'data-plot-builder':lazy(()=>import('./math/DataPlotBuilder')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'data-plot-builder':{const Widget=widgetRegistry['data-plot-builder'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function DataPlotBuilder({config,onEvent}:WidgetProps<'data-plot-builder'>){const key=JSON.stringify(config),zero=Object.fromEntries(config.categories.map(c=>[c,0]));const [values,setValues]=useState<Record<string,number>>(zero);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>setValues(zero),[key]);const exact=(v:Record<string,number>)=>config.categories.every(c=>v[c]===config.target[c]);const commit=(next:Record<string,number>,action:'increase-value'|'decrease-value'|'reset')=>{setValues(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{values:next}});if(exact(next))completeOnce(()=>onEvent({type:'complete',value:{values:next}}))};return <section className="card widget-experiment data-plot" data-testid="widget-data-plot-builder" data-state={completed?'complete':'building'}><h3>{config.prompt}</h3>{config.categories.map(c=><div key={c}><button aria-label={`Decrease ${c}`} disabled={!values[c]} onClick={()=>commit({...values,[c]:Math.max(0,values[c]-1)},'decrease-value')}>−</button><button aria-label={`Increase ${c}`} disabled={values[c]>=50} onClick={()=>commit({...values,[c]:Math.min(50,values[c]+1)},'increase-value')}>+</button><output>{values[c]}</output>{config.kind==='dot'?Array.from({length:values[c]},(_,i)=><span key={i} data-testid={`dot-${c}`}>●</span>):<span aria-label={`${c} bar value ${values[c]}`}>▮ {values[c]}</span>}</div>)}<button onClick={()=>commit(zero,'reset')}>Start over</button><p role="status">{completed?'Plot matches the target.':'Adjust the plot values.'}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.data-plot{display:grid;gap:.75rem}.widget-experiment.data-plot [data-widget-grid]{display:grid;grid-template-columns:repeat(auto-fit,minmax(96px,1fr));gap:.5rem}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- DataPlotBuilder WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact M11 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/math/DataPlotBuilder.tsx src/widgets/math/DataPlotBuilder.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add data plot builder widget"
```

### Task M12: Probability spinner

**Files:** Create `src/widgets/math/ProbabilitySpinner.tsx`, `src/widgets/math/ProbabilitySpinner.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict unique weighted segments, trial floor 1..100, optional existing target outcome. Spinner chooses only on named Spin; reduced mode suppresses rotation. Change/complete outcome and cumulative counts.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('spins only on click and emits deterministic cumulative result',async()=>{vi.spyOn(Math,'random').mockReturnValue(.9);const onEvent=vi.fn(),user=userEvent.setup();render(<ProbabilitySpinner config={{segments:[{id:'a',label:'A',weight:1},{id:'b',label:'B',weight:3}],trials:1,targetOutcomeId:'b'}} onEvent={onEvent}/>);expect(onEvent).not.toHaveBeenCalled();await user.click(screen.getByRole('button',{name:'Spin'}));expect(screen.getByRole('status')).toHaveTextContent('B');expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'spin'},{type:'change',value:{outcomeId:'b',counts:{a:0,b:1}}},{type:'complete',value:{outcomeId:'b',counts:{a:0,b:1}}}]);await user.click(screen.getByRole('button',{name:'Spin'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('weighted helper accepts injected rng',()=>expect(spin([{id:'a',weight:1},{id:'b',weight:3}],()=>.9)).toBe('b'));
test('rejects an empty segment list and nonpositive weights',()=>{expect(ProbabilitySpinnerWidgetConfigSchema.safeParse({segments:[]}).success).toBe(false);expect(ProbabilitySpinnerWidgetConfigSchema.safeParse({segments:[{id:'a',label:'A',weight:0},{id:'b',label:'B',weight:1}]}).success).toBe(false)});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- ProbabilitySpinner` → module/helper-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const SpinnerSegmentSchema=z.object({id:z.string().min(1),label:z.string().min(1),weight:z.number().positive().optional(),color:z.string().min(1).optional()}).strict();
export const ProbabilitySpinnerWidgetConfigSchema=z.object({segments:z.array(SpinnerSegmentSchema).min(2),trials:z.number().int().min(1).max(100).optional(),targetOutcomeId:z.string().min(1).optional()}).strict().superRefine((v,ctx)=>{if(new Set(v.segments.map(s=>s.id)).size!==v.segments.length)ctx.addIssue({code:z.ZodIssueCode.custom,message:'duplicate ids'});if(v.targetOutcomeId&&!v.segments.some(s=>s.id===v.targetOutcomeId))ctx.addIssue({code:z.ZodIssueCode.custom,path:['targetOutcomeId'],message:'unknown outcome'})});
export const ProbabilitySpinnerWidgetRefSchema=z.object({type:z.literal('probability-spinner'),config:ProbabilitySpinnerWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner'] as const;
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
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'probability-spinner':{type:'interaction';action:'spin'|'reset'}|{type:'change';value:{outcomeId:string|null;counts:Record<string,number>}}|{type:'complete';value:{outcomeId:string;counts:Record<string,number>}};
'probability-spinner':lazy(()=>import('./math/ProbabilitySpinner')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'probability-spinner':{const Widget=widgetRegistry['probability-spinner'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export function spin(segments:Array<{id:string;weight?:number}>,rng:()=>number){const total=segments.reduce((s,x)=>s+(x.weight??1),0);let pick=rng()*total;for(const segment of segments){pick-=segment.weight??1;if(pick<0)return segment.id}return segments.at(-1)!.id}
export default function ProbabilitySpinner({config,onEvent}:WidgetProps<'probability-spinner'>){const reduced=useReducedMotionPref(),key=JSON.stringify(config),zero=Object.fromEntries(config.segments.map(s=>[s.id,0]));const [counts,setCounts]=useState<Record<string,number>>(zero),[outcome,setOutcome]=useState<string|null>(null);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setCounts(zero);setOutcome(null)},[key]);const run=()=>{const id=spin(config.segments,Math.random),next={...counts,[id]:counts[id]+1},spins=Object.values(next).reduce((a,b)=>a+b,0),value={outcomeId:id,counts:next};setCounts(next);setOutcome(id);onEvent({type:'interaction',action:'spin'});onEvent({type:'change',value});const enough=spins>=(config.trials??1),targetSeen=!config.targetOutcomeId||next[config.targetOutcomeId]>0;if(enough&&targetSeen)completeOnce(()=>onEvent({type:'complete',value}))};const reset=()=>{setCounts(zero);setOutcome(null);onEvent({type:'interaction',action:'reset'});onEvent({type:'change',value:{outcomeId:null,counts:zero}})};const label=config.segments.find(s=>s.id===outcome)?.label;return <section className="card widget-experiment spinner" data-testid="widget-probability-spinner" data-motion={reduced?'off':'on'} data-state={completed?'complete':'ready'}><button aria-label="Spin" onClick={run}>Spin</button><button onClick={reset}>Start over</button><output>{config.segments.map(s=>`${s.label}: ${counts[s.id]}`).join(', ')}</output><p role="status">{label?`Spinner selected ${label}.`:'Press Spin to choose an outcome.'}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.spinner{display:grid;gap:.75rem}.widget-experiment.spinner[data-motion="off"]{transition:none}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- ProbabilitySpinner WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact M12 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/math/ProbabilitySpinner.tsx src/widgets/math/ProbabilitySpinner.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add probability spinner widget"
```

## Math plan verification

**Files:** Read only `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/widgets/WidgetFrame.test.tsx`, and the exact Math component/test files listed in M1–M12.

**Interfaces:** Consumes the twelve guarded task commits. Produces the Math plan acceptance record; it changes no file.

- [ ] **Step 1 (2–5 minutes):** Run `npm test -- widgets math schema WidgetFrame && npx tsc -b --pretty false`.
- [ ] **Step 2 (2–5 minutes):** Run `for literal in base-ten-blocks fraction-models area-model-multiplier array-builder money-counter clock-elapsed-time quarter-inch-ruler balance-scale shape-classifier data-plot-builder probability-spinner; do test "$(rg -l -F "'$literal'" src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx | wc -l | tr -d ' ')" = 3; done`.
- [ ] **Step 3 (2–5 minutes):** Confirm `git diff --cached --name-only -- src/characters` prints nothing and record M1–M12 gate/commit ids in the execution notes.

Expected: PASS. M1 retains pilot drag/nudge/events and whole-number formatting; M2–M12 each has its exact schema/event/registry/dispatcher/component/test/CSS and one-shot completion behavior.
