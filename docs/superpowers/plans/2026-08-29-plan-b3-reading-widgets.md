# Cram All Plan B Reading Widgets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add every approved reading widget with retained, revisable choices, explicit feedback, ordered events, and one-shot completion.

**Architecture:** This plan occupies Reading in the mandatory master order Task 0 → Task 1 → Math → Task 2 → Science → Task 3 → Reading → Task 4 → Task 5 → Task 6. Hard dependency: master Task 3 must pass after Tasks 0–2, Math, and Science. Each task atomically adds one strict schema branch, exact event-map member, lazy registry member, exhaustive `RenderWidget` case, component, focused test, and namespaced styles.

**Tech Stack:** React 18, TypeScript 5, Zod 3, Vite 5, Vitest 2, React Testing Library, user-event, jsdom; no new production dependencies.

**Spec:** `docs/superpowers/specs/2026-08-29-cram-all-design.md`

## Global Constraints

- Follow Task 0 → Task 1 → Math → Task 2 → Science → Task 3 → Reading → Task 4 → Task 5 → Task 6; complete master acceptance Task 3 before R1, and do not modify `src/characters/**`.
- Every config is strict and authored choices are solvable; mutations emit interaction then next-state change; completion is latched once per config key.
- Learner choices remain visible/revisable and current invalid feedback takes priority over previously latched completion copy.
- Controls are keyboard-operable and at least 44px; results use text status.
- Every green gate includes `npx tsc -b --pretty false`; every commit runs the protected-character guard below first.
- **Exact new-file prelude:** Every reading component begins with `import {useEffect,useState} from 'react';`, `import type {WidgetProps} from '../registry';`, and `import {useCompletionLatch} from '../useCompletionLatch';`. Every focused test begins with `import {render,screen} from '@testing-library/react';`, `import userEvent from '@testing-library/user-event';`, and `import {expect,test,vi} from 'vitest';`, then imports its named default component (plus R8's named `rewritePassage` if tested separately) from the sibling file. Tests naming a `*WidgetConfigSchema` import that exact export from `../../content/schema`.

---

**Saved as:** `docs/superpowers/plans/2026-08-29-plan-b3-reading-widgets.md`


### Task R1: Word-root builder

**Files:** Create `src/widgets/reading/WordRootBuilder.tsx`, `src/widgets/reading/WordRootBuilder.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict nonblank root, optional unique prefixes/suffixes, nonempty unique target words. State derives selected configured morphemes; no hard-coded prefix. Select/check/reset emit parts+word; successful Check emits word+meaning once.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('builds from configured morphemes and announces one completion',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<WordRootBuilder config={{root:'view',prefixes:['re'],suffixes:['er'],targets:[{word:'review',meaning:'see again'}]}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Select prefix re'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Check word'}));expect(screen.getByRole('status')).toHaveTextContent('see again');expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'check'},{type:'change',value:{parts:['re','view'],word:'review'}},{type:'complete',value:{word:'review',meaning:'see again'}}]);await user.click(screen.getByRole('button',{name:'Check word'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('rejects whitespace and any unbuildable target while allowing a blank affix choice',()=>{expect(WordRootBuilderWidgetConfigSchema.safeParse({root:' ',targets:[{word:'x',meaning:'x'}]}).success).toBe(false);expect(WordRootBuilderWidgetConfigSchema.safeParse({root:'view',prefixes:['re'],targets:[{word:'preview',meaning:'see before'}]}).success).toBe(false);expect(WordRootBuilderWidgetConfigSchema.safeParse({root:'port',prefixes:['trans'],suffixes:['able'],targets:[{word:'transport',meaning:'carry across'},{word:'portable',meaning:'able to be carried'}]}).success).toBe(true)});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- WordRootBuilder` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const NonBlank=z.string().trim().min(1),WordTargetSchema=z.object({word:NonBlank,meaning:NonBlank}).strict();export const WordRootBuilderWidgetConfigSchema=z.object({root:NonBlank,prefixes:z.array(NonBlank).refine(v=>new Set(v).size===v.length,'duplicates').optional(),suffixes:z.array(NonBlank).refine(v=>new Set(v).size===v.length,'duplicates').optional(),targets:z.array(WordTargetSchema).min(1)}).strict().superRefine((v,ctx)=>{if(new Set(v.targets.map(x=>x.word)).size!==v.targets.length)ctx.addIssue({code:z.ZodIssueCode.custom,path:['targets'],message:'duplicate targets'});const buildable=new Set(['',...(v.prefixes??[])].flatMap(p=>['',...(v.suffixes??[])].map(s=>`${p}${v.root}${s}`)));if(v.targets.some(t=>!buildable.has(t.word)))ctx.addIssue({code:z.ZodIssueCode.custom,path:['targets'],message:'every target must be constructible from the authored morphemes'})});
export const WordRootBuilderWidgetRefSchema=z.object({type:z.literal('word-root-builder'),config:WordRootBuilderWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer','topographic-map-explorer','hazard-solution-designer','resource-sorter','word-root-builder'] as const;
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
 WordRootBuilderWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'word-root-builder':{type:'interaction';action:'select-prefix'|'select-root'|'select-suffix'|'check'|'reset'}|{type:'change';value:{parts:string[];word:string}}|{type:'complete';value:{word:string;meaning:string}};
'word-root-builder':lazy(()=>import('./reading/WordRootBuilder')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'word-root-builder':{const Widget=widgetRegistry['word-root-builder'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function WordRootBuilder({config,onEvent}:WidgetProps<'word-root-builder'>){const key=JSON.stringify(config);const [prefix,setPrefix]=useState(''),[suffix,setSuffix]=useState(''),[status,setStatus]=useState('Choose word parts.');const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setPrefix('');setSuffix('');setStatus('Choose word parts.')},[key]);const value=(p=prefix,s=suffix)=>{const parts=[p,config.root,s].filter(Boolean);return {parts,word:parts.join('')}};const emit=(next:{parts:string[];word:string},action:'select-prefix'|'select-root'|'select-suffix'|'check'|'reset',check=false)=>{onEvent({type:'interaction',action});onEvent({type:'change',value:next});if(check){const target=config.targets.find(t=>t.word===next.word);setStatus(target?`${next.word}: ${target.meaning}`:`${next.word} is not a target word yet.`);if(target)completeOnce(()=>onEvent({type:'complete',value:{word:target.word,meaning:target.meaning}}))}};const choosePrefix=(p:string)=>{setPrefix(p);emit(value(p,suffix),'select-prefix')},chooseSuffix=(s:string)=>{setSuffix(s);emit(value(prefix,s),'select-suffix')};return <section className="card widget-experiment roots" data-testid="widget-word-root-builder" data-state={completed?'complete':'building'}>{(config.prefixes??[]).map(p=><button key={p} aria-label={`Select prefix ${p}`} aria-pressed={prefix===p} onClick={()=>choosePrefix(p)}>{p}</button>)}<button aria-label={`Select root ${config.root}`} onClick={()=>emit(value(),'select-root')}>{config.root}</button>{(config.suffixes??[]).map(s=><button key={s} aria-label={`Select suffix ${s}`} aria-pressed={suffix===s} onClick={()=>chooseSuffix(s)}>{s}</button>)}<button aria-label="Check word" onClick={()=>emit(value(),'check',true)}>Check</button><button onClick={()=>{setPrefix('');setSuffix('');setStatus('Choose word parts.');emit({parts:[config.root],word:config.root},'reset')}}>Start over</button><output>{value().word}</output><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.roots{display:grid;gap:.75rem}.widget-experiment.roots output{font-weight:700;overflow-wrap:anywhere}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- WordRootBuilder WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact R1 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/reading/WordRootBuilder.tsx src/widgets/reading/WordRootBuilder.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add word root builder widget"
```

### Task R2: Context-clue detective

**Files:** Create `src/widgets/reading/ContextClueDetective.tsx`, `src/widgets/reading/ContextClueDetective.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict passage/target word, unique clue ids, existing correct id. Named choice emits choice and completes correct once; root `data-state` reflects attempted correctness, never initial config.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('marks a correct named clue and emits ordered completion',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<ContextClueDetective config={{passage:'A timid child is shy.',targetWord:'timid',clueChoices:[{id:'definition',text:'is shy',type:'definition'},{id:'example',text:'child',type:'example'}],correctChoiceId:'definition'}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Choose definition clue: is shy'}));expect(screen.getByTestId('widget-context-clue-detective')).toHaveAttribute('data-state','complete');expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'choose-clue'},{type:'change',value:{choiceId:'definition'}},{type:'complete',value:{choiceId:'definition'}}]);await user.click(screen.getByRole('button',{name:'Choose definition clue: is shy'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- ContextClueDetective` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const ClueSchema=z.object({id:z.string().min(1),text:z.string().min(1),type:z.enum(['definition','example','synonym','contrast'])}).strict();export const ContextClueDetectiveWidgetConfigSchema=z.object({passage:z.string().min(1),targetWord:z.string().min(1),clueChoices:z.array(ClueSchema).min(2),correctChoiceId:z.string().min(1)}).strict().superRefine((v,ctx)=>{if(new Set(v.clueChoices.map(x=>x.id)).size!==v.clueChoices.length||!v.clueChoices.some(x=>x.id===v.correctChoiceId))ctx.addIssue({code:z.ZodIssueCode.custom,message:'invalid clue ids'})});
export const ContextClueDetectiveWidgetRefSchema=z.object({type:z.literal('context-clue-detective'),config:ContextClueDetectiveWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer','topographic-map-explorer','hazard-solution-designer','resource-sorter','word-root-builder','context-clue-detective'] as const;
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
 WordRootBuilderWidgetRefSchema,
 ContextClueDetectiveWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'context-clue-detective':{type:'interaction';action:'choose-clue'|'reset'}|{type:'change';value:{choiceId:string|null}}|{type:'complete';value:{choiceId:string}};
'context-clue-detective':lazy(()=>import('./reading/ContextClueDetective')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'context-clue-detective':{const Widget=widgetRegistry['context-clue-detective'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function ContextClueDetective({config,onEvent}:WidgetProps<'context-clue-detective'>){const key=JSON.stringify(config);const [choice,setChoice]=useState<string|null>(null),[status,setStatus]=useState(`Find the clue for ${config.targetWord}.`);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setChoice(null);setStatus(`Find the clue for ${config.targetWord}.`)},[key]);const choose=(id:string)=>{setChoice(id);onEvent({type:'interaction',action:'choose-clue'});onEvent({type:'change',value:{choiceId:id}});const ok=id===config.correctChoiceId;setStatus(ok?'That clue explains the target word.':'That is not the best clue; try another.');if(ok)completeOnce(()=>onEvent({type:'complete',value:{choiceId:id}}))};const reset=()=>{setChoice(null);setStatus(`Find the clue for ${config.targetWord}.`);onEvent({type:'interaction',action:'reset'});onEvent({type:'change',value:{choiceId:null}})};return <section className="card widget-experiment clues" data-testid="widget-context-clue-detective" data-state={completed?'complete':choice?'incorrect':'choosing'}><p>{config.passage}</p>{config.clueChoices.map(c=><button key={c.id} aria-label={`Choose ${c.type} clue: ${c.text}`} onClick={()=>choose(c.id)}>{c.text}</button>)}<button onClick={reset}>Start over</button><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.clues{display:grid;gap:.75rem}.widget-experiment.clues button[aria-pressed="true"]{outline:3px solid var(--c-accent-action)}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- ContextClueDetective WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact R2 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/reading/ContextClueDetective.tsx src/widgets/reading/ContextClueDetective.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add context clue widget"
```

### Task R3: Story-elements mapper

**Files:** Create `src/widgets/reading/StoryElementsMapper.tsx`, `src/widgets/reading/StoryElementsMapper.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict unique field list and exact nonblank answer per field. Controlled labelled inputs emit next entries; named Check completes only exact trimmed answers; reset recovers.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('retains labelled entries and completes only after Check',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<StoryElementsMapper config={{textTitle:'Story',fields:['character','setting'],answers:{character:'Ava',setting:'Park'}}} onEvent={onEvent}/>);await user.type(screen.getByRole('textbox',{name:'Character'}),'Ava');await user.type(screen.getByRole('textbox',{name:'Setting'}),'Park');expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(0);onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Check story map'}));expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'check'},{type:'change',value:{entries:{character:'Ava',setting:'Park'}}},{type:'complete',value:{entries:{character:'Ava',setting:'Park'}}}])});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- StoryElementsMapper` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const StoryFieldSchema=z.enum(['character','setting','problem','events','solution']);export const StoryElementsMapperWidgetConfigSchema=z.object({textTitle:z.string().min(1),fields:z.array(StoryFieldSchema).min(2),answers:z.record(z.string().min(1))}).strict().refine(v=>new Set(v.fields).size===v.fields.length&&Object.keys(v.answers).length===v.fields.length&&v.fields.every(f=>v.answers[f]?.trim()),'answers must equal fields');
export const StoryElementsMapperWidgetRefSchema=z.object({type:z.literal('story-elements-mapper'),config:StoryElementsMapperWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer','topographic-map-explorer','hazard-solution-designer','resource-sorter','word-root-builder','context-clue-detective','story-elements-mapper'] as const;
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
 WordRootBuilderWidgetRefSchema,
 ContextClueDetectiveWidgetRefSchema,
 StoryElementsMapperWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'story-elements-mapper':{type:'interaction';action:'change-field'|'check'|'reset'}|{type:'change';value:{entries:Record<string,string>}}|{type:'complete';value:{entries:Record<string,string>}};
'story-elements-mapper':lazy(()=>import('./reading/StoryElementsMapper')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'story-elements-mapper':{const Widget=widgetRegistry['story-elements-mapper'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
const titleCase=(s:string)=>s[0]!.toUpperCase()+s.slice(1);export default function StoryElementsMapper({config,onEvent}:WidgetProps<'story-elements-mapper'>){const key=JSON.stringify(config),empty=Object.fromEntries(config.fields.map(f=>[f,'']));const [entries,setEntries]=useState<Record<string,string>>(empty),[status,setStatus]=useState('Fill in the story map.');const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setEntries(empty);setStatus('Fill in the story map.')},[key]);const emit=(next:Record<string,string>,action:'change-field'|'check'|'reset',check=false)=>{setEntries(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{entries:next}});if(check){const ok=config.fields.every(f=>next[f].trim()===config.answers[f].trim());setStatus(ok?'Story map complete.':'Revise the entries that do not match the story.');if(ok)completeOnce(()=>onEvent({type:'complete',value:{entries:next}}))}};return <section className="card widget-experiment story-map" data-testid="widget-story-elements-mapper" data-state={completed?'complete':'mapping'}><h3>{config.textTitle}</h3>{config.fields.map(f=><label key={f}>{titleCase(f)}<input aria-label={titleCase(f)} value={entries[f]} onChange={e=>emit({...entries,[f]:e.target.value},'change-field')}/></label>)}<button aria-label="Check story map" onClick={()=>emit(entries,'check',true)}>Check</button><button onClick={()=>emit(empty,'reset')}>Start over</button><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.story-map{display:grid;gap:.75rem}.widget-experiment.story-map label{display:grid;gap:.25rem}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- StoryElementsMapper WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact R3 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/reading/StoryElementsMapper.tsx src/widgets/reading/StoryElementsMapper.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add story elements mapper widget"
```

### Task R4: Theme-evidence collector

**Files:** Create `src/widgets/reading/ThemeEvidenceCollector.tsx`, `src/widgets/reading/ThemeEvidenceCollector.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict unique themes/evidence, support references to themes, required count within evidence length. Choose/toggle/reset retain state; complete after enough selected evidence and every selection supports theme.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('retains two supporting details, latches completion, and reports a later revision',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<ThemeEvidenceCollector config={{themeChoices:['Practice pays off','Cats are funny'],evidence:[{id:'a',text:'Ava practices daily',supports:['Practice pays off']},{id:'b',text:'Ava improves',supports:['Practice pays off']}],requiredEvidenceCount:2}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Choose theme Practice pays off'}));await user.click(screen.getByRole('button',{name:'Toggle evidence Ava practices daily'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Toggle evidence Ava improves'}));expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'toggle-evidence'},{type:'change',value:{theme:'Practice pays off',evidenceIds:['a','b']}},{type:'complete',value:{theme:'Practice pays off',evidenceIds:['a','b']}}]);await user.click(screen.getByRole('button',{name:'Choose theme Cats are funny'}));expect(screen.getByTestId('widget-theme-evidence-collector')).toHaveAttribute('data-state','complete');expect(screen.getByRole('status')).toHaveTextContent(/does not support/i);expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('rejects a theme exercise with no solvable evidence count',()=>expect(ThemeEvidenceCollectorWidgetConfigSchema.safeParse({themeChoices:['A','B'],evidence:[{id:'a',text:'one',supports:['A']},{id:'b',text:'two',supports:['B']}],requiredEvidenceCount:2}).success).toBe(false));
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- ThemeEvidenceCollector` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const ThemeEvidenceSchema=z.object({id:z.string().min(1),text:z.string().min(1),supports:z.array(z.string().min(1)).min(1)}).strict();export const ThemeEvidenceCollectorWidgetConfigSchema=z.object({themeChoices:z.array(z.string().min(1)).min(2),evidence:z.array(ThemeEvidenceSchema).min(2),requiredEvidenceCount:z.number().int().min(2).max(5).optional()}).strict().superRefine((v,ctx)=>{const required=v.requiredEvidenceCount??2;if(new Set(v.themeChoices).size!==v.themeChoices.length||new Set(v.evidence.map(x=>x.id)).size!==v.evidence.length||v.evidence.some(e=>e.supports.some(t=>!v.themeChoices.includes(t)))||required>v.evidence.length||!v.themeChoices.some(theme=>v.evidence.filter(e=>e.supports.includes(theme)).length>=required))ctx.addIssue({code:z.ZodIssueCode.custom,message:'themes/evidence must be valid and at least one theme solvable'})});
export const ThemeEvidenceCollectorWidgetRefSchema=z.object({type:z.literal('theme-evidence-collector'),config:ThemeEvidenceCollectorWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer','topographic-map-explorer','hazard-solution-designer','resource-sorter','word-root-builder','context-clue-detective','story-elements-mapper','theme-evidence-collector'] as const;
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
 WordRootBuilderWidgetRefSchema,
 ContextClueDetectiveWidgetRefSchema,
 StoryElementsMapperWidgetRefSchema,
 ThemeEvidenceCollectorWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'theme-evidence-collector':{type:'interaction';action:'choose-theme'|'toggle-evidence'|'reset'}|{type:'change';value:{theme:string|null;evidenceIds:string[]}}|{type:'complete';value:{theme:string;evidenceIds:string[]}};
'theme-evidence-collector':lazy(()=>import('./reading/ThemeEvidenceCollector')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'theme-evidence-collector':{const Widget=widgetRegistry['theme-evidence-collector'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function ThemeEvidenceCollector({config,onEvent}:WidgetProps<'theme-evidence-collector'>){const key=JSON.stringify(config),required=config.requiredEvidenceCount??2;const [theme,setTheme]=useState<string|null>(null),[ids,setIds]=useState<string[]>([]);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setTheme(null);setIds([])},[key]);const emit=(nextTheme:string|null,nextIds:string[],action:'choose-theme'|'toggle-evidence'|'reset')=>{setTheme(nextTheme);setIds(nextIds);onEvent({type:'interaction',action});onEvent({type:'change',value:{theme:nextTheme,evidenceIds:nextIds}});const ok=!!nextTheme&&nextIds.length>=required&&nextIds.every(id=>config.evidence.find(e=>e.id===id)!.supports.includes(nextTheme));if(ok&&nextTheme)completeOnce(()=>onEvent({type:'complete',value:{theme:nextTheme,evidenceIds:nextIds}}))};const valid=!!theme&&ids.every(id=>config.evidence.find(e=>e.id===id)!.supports.includes(theme));return <section className="card widget-experiment theme" data-testid="widget-theme-evidence-collector" data-state={completed?'complete':'collecting'}>{config.themeChoices.map(t=><button key={t} aria-label={`Choose theme ${t}`} aria-pressed={theme===t} onClick={()=>emit(t,ids,'choose-theme')}>{t}</button>)}{config.evidence.map(e=><button key={e.id} aria-label={`Toggle evidence ${e.text}`} aria-pressed={ids.includes(e.id)} onClick={()=>emit(theme,ids.includes(e.id)?ids.filter(id=>id!==e.id):ids.concat(e.id),'toggle-evidence')}>{e.text}</button>)}<button onClick={()=>emit(null,[],'reset')}>Start over</button><p role="status">{!theme?'Choose a theme.':!valid?'Some evidence does not support this theme.':ids.length<required?`${ids.length} of ${required} evidence choices selected.`:completed?'Theme supported.':'Evidence supports this theme.'}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.theme{display:grid;gap:.75rem}.widget-experiment.theme button[aria-pressed="true"]{outline:3px solid var(--c-accent-action)}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- ThemeEvidenceCollector WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact R4 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/reading/ThemeEvidenceCollector.tsx src/widgets/reading/ThemeEvidenceCollector.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add theme evidence widget"
```

### Task R5: Central-idea organizer

**Files:** Create `src/widgets/reading/CentralIdeaOrganizer.tsx`, `src/widgets/reading/CentralIdeaOrganizer.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Mirrors theme evidence with main-idea choices/details. Unsupported detail stays selected and announces revision feedback; enough wholly supporting details completes once.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('retains a distractor, completes supporting detail, and reports a later revision',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<CentralIdeaOrganizer config={{mainIdeaChoices:['Plants need sunlight','Dogs like bones'],details:[{id:'sun',text:'Leaves use sunlight',supports:['Plants need sunlight']},{id:'dog',text:'Dogs wag tails',supports:['Dogs like bones']}],requiredDetailCount:1}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Choose main idea Plants need sunlight'}));await user.click(screen.getByRole('button',{name:'Toggle detail Dogs wag tails'}));expect(screen.getByRole('status')).toHaveTextContent(/does not support/i);expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(0);await user.click(screen.getByRole('button',{name:'Toggle detail Dogs wag tails'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Toggle detail Leaves use sunlight'}));expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'toggle-detail'},{type:'change',value:{mainIdea:'Plants need sunlight',detailIds:['sun']}},{type:'complete',value:{mainIdea:'Plants need sunlight',detailIds:['sun']}}]);await user.click(screen.getByRole('button',{name:'Choose main idea Dogs like bones'}));expect(screen.getByTestId('widget-central-idea-organizer')).toHaveAttribute('data-state','complete');expect(screen.getByRole('status')).toHaveTextContent(/does not support/i);expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1)});
test('rejects a central-idea exercise with no solvable detail count',()=>expect(CentralIdeaOrganizerWidgetConfigSchema.safeParse({mainIdeaChoices:['A','B'],details:[{id:'a',text:'one',supports:['A']},{id:'b',text:'two',supports:['B']}],requiredDetailCount:2}).success).toBe(false));
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- CentralIdeaOrganizer` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const CentralDetailSchema=z.object({id:z.string().min(1),text:z.string().min(1),supports:z.array(z.string().min(1)).min(1)}).strict();export const CentralIdeaOrganizerWidgetConfigSchema=z.object({mainIdeaChoices:z.array(z.string().min(1)).min(2),details:z.array(CentralDetailSchema).min(2),requiredDetailCount:z.number().int().min(1).max(5).optional()}).strict().superRefine((v,ctx)=>{const required=v.requiredDetailCount??2;if(new Set(v.mainIdeaChoices).size!==v.mainIdeaChoices.length||new Set(v.details.map(x=>x.id)).size!==v.details.length||v.details.some(d=>d.supports.some(i=>!v.mainIdeaChoices.includes(i)))||required>v.details.length||!v.mainIdeaChoices.some(idea=>v.details.filter(d=>d.supports.includes(idea)).length>=required))ctx.addIssue({code:z.ZodIssueCode.custom,message:'ideas/details must be valid and at least one idea solvable'})});
export const CentralIdeaOrganizerWidgetRefSchema=z.object({type:z.literal('central-idea-organizer'),config:CentralIdeaOrganizerWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer','topographic-map-explorer','hazard-solution-designer','resource-sorter','word-root-builder','context-clue-detective','story-elements-mapper','theme-evidence-collector','central-idea-organizer'] as const;
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
 WordRootBuilderWidgetRefSchema,
 ContextClueDetectiveWidgetRefSchema,
 StoryElementsMapperWidgetRefSchema,
 ThemeEvidenceCollectorWidgetRefSchema,
 CentralIdeaOrganizerWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'central-idea-organizer':{type:'interaction';action:'choose-main-idea'|'toggle-detail'|'reset'}|{type:'change';value:{mainIdea:string|null;detailIds:string[]}}|{type:'complete';value:{mainIdea:string;detailIds:string[]}};
'central-idea-organizer':lazy(()=>import('./reading/CentralIdeaOrganizer')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'central-idea-organizer':{const Widget=widgetRegistry['central-idea-organizer'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function CentralIdeaOrganizer({config,onEvent}:WidgetProps<'central-idea-organizer'>){const key=JSON.stringify(config),required=config.requiredDetailCount??2;const [main,setMain]=useState<string|null>(null),[ids,setIds]=useState<string[]>([]);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setMain(null);setIds([])},[key]);const emit=(idea:string|null,nextIds:string[],action:'choose-main-idea'|'toggle-detail'|'reset')=>{setMain(idea);setIds(nextIds);onEvent({type:'interaction',action});onEvent({type:'change',value:{mainIdea:idea,detailIds:nextIds}});const ok=!!idea&&nextIds.length>=required&&nextIds.every(id=>config.details.find(d=>d.id===id)!.supports.includes(idea));if(ok&&idea)completeOnce(()=>onEvent({type:'complete',value:{mainIdea:idea,detailIds:nextIds}}))};const unsupported=main&&ids.some(id=>!config.details.find(d=>d.id===id)!.supports.includes(main));return <section className="card widget-experiment central" data-testid="widget-central-idea-organizer" data-state={completed?'complete':'organizing'}>{config.mainIdeaChoices.map(i=><button key={i} aria-label={`Choose main idea ${i}`} aria-pressed={main===i} onClick={()=>emit(i,ids,'choose-main-idea')}>{i}</button>)}{config.details.map(d=><button key={d.id} aria-label={`Toggle detail ${d.text}`} aria-pressed={ids.includes(d.id)} onClick={()=>emit(main,ids.includes(d.id)?ids.filter(id=>id!==d.id):ids.concat(d.id),'toggle-detail')}>{d.text}</button>)}<button onClick={()=>emit(null,[],'reset')}>Start over</button><p role="status">{!main?'Choose a main idea.':unsupported?'That detail does not support the selected main idea; revise it.':ids.length<required?`${ids.length} of ${required} details selected.`:completed?'Central idea supported.':'These details support the selected main idea.'}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.central{display:grid;gap:.75rem}.widget-experiment.central button[aria-pressed="true"]{outline:3px solid var(--c-accent-action)}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- CentralIdeaOrganizer WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact R5 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/reading/CentralIdeaOrganizer.tsx src/widgets/reading/CentralIdeaOrganizer.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add central idea widget"
```

### Task R6: Text-structure sorter

**Files:** Create `src/widgets/reading/TextStructureSorter.tsx`, `src/widgets/reading/TextStructureSorter.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict unique excerpts with authored structure. Tap select/bin retains placements, prints `text-structure-placement-{id}`, and completes only every correct placement.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('retains two select-then-bin placements and completes',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<TextStructureSorter config={{excerpts:[{id:'rain',text:'Rain fell, so the field flooded.',structure:'cause-effect'},{id:'steps',text:'First mix, then bake.',structure:'sequence'}]}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Select Rain fell, so the field flooded.'}));await user.click(screen.getByRole('button',{name:'Place selected excerpt in cause and effect'}));await user.click(screen.getByRole('button',{name:'Select First mix, then bake.'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Place selected excerpt in sequence'}));expect(screen.getByTestId('text-structure-placement-rain')).toHaveTextContent('cause-effect');expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'place-structure'},{type:'change',value:{placements:{rain:'cause-effect',steps:'sequence'}}},{type:'complete',value:{placements:{rain:'cause-effect',steps:'sequence'}}}])});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- TextStructureSorter` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const StructureSchema=z.enum(['sequence','compare-contrast','cause-effect','problem-solution','description']),ExcerptSchema=z.object({id:z.string().min(1),text:z.string().min(1),structure:StructureSchema}).strict();export const TextStructureSorterWidgetConfigSchema=z.object({excerpts:z.array(ExcerptSchema).min(2)}).strict().refine(v=>new Set(v.excerpts.map(x=>x.id)).size===v.excerpts.length,'duplicate ids');
export const TextStructureSorterWidgetRefSchema=z.object({type:z.literal('text-structure-sorter'),config:TextStructureSorterWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer','topographic-map-explorer','hazard-solution-designer','resource-sorter','word-root-builder','context-clue-detective','story-elements-mapper','theme-evidence-collector','central-idea-organizer','text-structure-sorter'] as const;
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
 WordRootBuilderWidgetRefSchema,
 ContextClueDetectiveWidgetRefSchema,
 StoryElementsMapperWidgetRefSchema,
 ThemeEvidenceCollectorWidgetRefSchema,
 CentralIdeaOrganizerWidgetRefSchema,
 TextStructureSorterWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'text-structure-sorter':{type:'interaction';action:'select-excerpt'|'place-structure'|'reset'}|{type:'change';value:{placements:Record<string,string>}}|{type:'complete';value:{placements:Record<string,string>}};
'text-structure-sorter':lazy(()=>import('./reading/TextStructureSorter')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'text-structure-sorter':{const Widget=widgetRegistry['text-structure-sorter'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
const structures=['sequence','compare-contrast','cause-effect','problem-solution','description'] as const,structureLabel=(s:string)=>s.replaceAll('-',' and ');export default function TextStructureSorter({config,onEvent}:WidgetProps<'text-structure-sorter'>){const key=JSON.stringify(config);const [selected,setSelected]=useState<string|null>(null),[placements,setPlacements]=useState<Record<string,string>>({});const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setSelected(null);setPlacements({})},[key]);const correct=(next:Record<string,string>)=>config.excerpts.every(e=>next[e.id]===e.structure);const emit=(next:Record<string,string>,action:'select-excerpt'|'place-structure'|'reset')=>{setPlacements(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{placements:next}});if(correct(next))completeOnce(()=>onEvent({type:'complete',value:{placements:next}}))};const select=(id:string)=>{setSelected(id);emit(placements,'select-excerpt')};return <section className="card widget-experiment structures" data-testid="widget-text-structure-sorter" data-state={completed?'complete':'sorting'}>{config.excerpts.map(e=><div key={e.id}><button aria-label={`Select ${e.text}`} onClick={()=>select(e.id)}>{e.text}</button><output data-testid={`text-structure-placement-${e.id}`}>{placements[e.id]??''}</output></div>)}{structures.map(s=><button key={s} aria-label={`Place selected excerpt in ${structureLabel(s)}`} disabled={!selected} onClick={()=>selected&&emit({...placements,[selected]:s},'place-structure')}>{structureLabel(s)}</button>)}<button onClick={()=>{setSelected(null);emit({},'reset')}}>Start over</button><p role="status">{correct(placements)?'Every text structure is correct.':selected?'Choose a structure.':'Select an excerpt.'}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.structures{display:grid;gap:.75rem}.widget-experiment.structures output{min-block-size:1.5em}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- TextStructureSorter WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact R6 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/reading/TextStructureSorter.tsx src/widgets/reading/TextStructureSorter.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add text structure sorter widget"
```

### Task R7: Summary builder

**Files:** Create `src/widgets/reading/SummaryBuilder.tsx`, `src/widgets/reading/SummaryBuilder.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict unique sentences, required main ids, max 1..5. Toggle/reset retain ids. Current state is valid only with every required main, no extras, and within max; extra/limit text remains revisable.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('accepts the required main, keeps detail concise, then explains an extra',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<SummaryBuilder config={{sourceSentences:[{id:'main',text:'Bees help plants.',role:'main'},{id:'detail',text:'They carry pollen.',role:'detail'},{id:'extra',text:'Blue is a color.',role:'extra'}],requiredMainIds:['main'],maxSentences:2}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Toggle Bees help plants.'}));expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'toggle-sentence'},{type:'change',value:{selectedIds:['main']}},{type:'complete',value:{selectedIds:['main']}}]);await user.click(screen.getByRole('button',{name:'Toggle They carry pollen.'}));expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1);await user.click(screen.getByRole('button',{name:'Toggle Blue is a color.'}));expect(screen.getByRole('status')).toHaveTextContent(/extra|too many/i)});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- SummaryBuilder` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const SummarySentenceSchema=z.object({id:z.string().min(1),text:z.string().min(1),role:z.enum(['main','detail','extra'])}).strict();export const SummaryBuilderWidgetConfigSchema=z.object({sourceSentences:z.array(SummarySentenceSchema).min(3),requiredMainIds:z.array(z.string().min(1)).min(1),maxSentences:z.number().int().min(1).max(5)}).strict().superRefine((v,ctx)=>{const ids=v.sourceSentences.map(x=>x.id);if(new Set(ids).size!==ids.length||new Set(v.requiredMainIds).size!==v.requiredMainIds.length||!v.requiredMainIds.every(id=>v.sourceSentences.some(s=>s.id===id&&s.role==='main'))||v.requiredMainIds.length>v.maxSentences)ctx.addIssue({code:z.ZodIssueCode.custom,message:'invalid summary ids or limit'})});
export const SummaryBuilderWidgetRefSchema=z.object({type:z.literal('summary-builder'),config:SummaryBuilderWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer','topographic-map-explorer','hazard-solution-designer','resource-sorter','word-root-builder','context-clue-detective','story-elements-mapper','theme-evidence-collector','central-idea-organizer','text-structure-sorter','summary-builder'] as const;
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
 WordRootBuilderWidgetRefSchema,
 ContextClueDetectiveWidgetRefSchema,
 StoryElementsMapperWidgetRefSchema,
 ThemeEvidenceCollectorWidgetRefSchema,
 CentralIdeaOrganizerWidgetRefSchema,
 TextStructureSorterWidgetRefSchema,
 SummaryBuilderWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'summary-builder':{type:'interaction';action:'toggle-sentence'|'reset'}|{type:'change';value:{selectedIds:string[]}}|{type:'complete';value:{selectedIds:string[]}};
'summary-builder':lazy(()=>import('./reading/SummaryBuilder')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'summary-builder':{const Widget=widgetRegistry['summary-builder'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export default function SummaryBuilder({config,onEvent}:WidgetProps<'summary-builder'>){const key=JSON.stringify(config);const [ids,setIds]=useState<string[]>([]);const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>setIds([]),[key]);const valid=(next:string[])=>config.requiredMainIds.every(id=>next.includes(id))&&next.length<=config.maxSentences&&!next.some(id=>config.sourceSentences.find(s=>s.id===id)!.role==='extra');const emit=(next:string[],action:'toggle-sentence'|'reset')=>{const ordered=config.sourceSentences.map(s=>s.id).filter(id=>next.includes(id));setIds(ordered);onEvent({type:'interaction',action});onEvent({type:'change',value:{selectedIds:ordered}});if(valid(ordered))completeOnce(()=>onEvent({type:'complete',value:{selectedIds:ordered}}))};const hasExtra=ids.some(id=>config.sourceSentences.find(s=>s.id===id)!.role==='extra'),over=ids.length>config.maxSentences;return <section className="card widget-experiment summary" data-testid="widget-summary-builder" data-state={completed?'complete':'revising'} data-current-valid={valid(ids)?'yes':'no'}>{config.sourceSentences.map(s=><button key={s.id} aria-label={`Toggle ${s.text}`} aria-pressed={ids.includes(s.id)} onClick={()=>emit(ids.includes(s.id)?ids.filter(id=>id!==s.id):ids.concat(s.id),'toggle-sentence')}>{s.text}</button>)}<button onClick={()=>emit([],'reset')}>Start over</button><p role="status">{hasExtra?'An extra sentence does not belong in the summary.':over?'Too many sentences; shorten the summary.':valid(ids)?'Concise summary complete.':`Selected ${ids.length} of ${config.maxSentences}; include every main idea.`}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.summary{display:grid;gap:.75rem}.widget-experiment.summary button[aria-pressed="true"]{outline:3px solid var(--c-accent-action)}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- SummaryBuilder WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact R7 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/reading/SummaryBuilder.tsx src/widgets/reading/SummaryBuilder.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add summary builder widget"
```

### Task R8: Point-of-view switcher

**Files:** Create `src/widgets/reading/PovSwitcher.tsx`, `src/widgets/reading/PovSwitcher.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** `requiredPronouns` is exactly `[subject,possessive]`, both present in unique options; from and target differ. `rewritePassage` deterministically replaces the first proper-name subject/possessive for third→first, or `I`/`my` for first→third. Apply completes only with both required choices.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('rewrites configured passage rather than returning hard-coded output',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<PovSwitcher config={{passage:'Ava carried Ava’s book.',from:'third',target:'first',pronounOptions:['I','my','she'],requiredPronouns:['I','my']}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Select pronoun I'}));await user.click(screen.getByRole('button',{name:'Select pronoun my'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Apply point of view'}));expect(screen.getByRole('status')).toHaveTextContent('I carried my book.');expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'apply'},{type:'change',value:{selectedPronouns:['I','my']}},{type:'complete',value:{rewrittenText:'I carried my book.'}}])});
test('rejects duplicate pronouns or a passage without both deterministic subject forms',()=>{expect(PovSwitcherWidgetConfigSchema.safeParse({passage:'Ava carried Ava’s book.',from:'third',target:'first',pronounOptions:['I','my'],requiredPronouns:['I','I']}).success).toBe(false);expect(PovSwitcherWidgetConfigSchema.safeParse({passage:'the child ran.',from:'third',target:'first',pronounOptions:['I','my'],requiredPronouns:['I','my']}).success).toBe(false);expect(PovSwitcherWidgetConfigSchema.safeParse({passage:'At noon, Lila carried Lila’s book.',from:'third',target:'first',pronounOptions:['I','my'],requiredPronouns:['I','my']}).success).toBe(false);expect(PovSwitcherWidgetConfigSchema.safeParse({passage:'Lila ran.',from:'third',target:'first',pronounOptions:['I','my'],requiredPronouns:['I','my']}).success).toBe(false);expect(PovSwitcherWidgetConfigSchema.safeParse({passage:'I ran.',from:'first',target:'third',pronounOptions:['Lila','Lila’s'],requiredPronouns:['Lila','Lila’s']}).success).toBe(false)});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- PovSwitcher` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
export const PovSwitcherWidgetConfigSchema=z.object({passage:z.string().min(1),from:z.enum(['first','third']),target:z.enum(['first','third']),pronounOptions:z.array(z.string().min(1)).min(2),requiredPronouns:z.tuple([z.string().min(1),z.string().min(1)])}).strict().superRefine((v,ctx)=>{const name=v.passage.match(/^([A-Z][a-z]+)\b/)?.[1],passageMatches=v.from==='third'?!!name&&new RegExp(`${name}[’']s`).test(v.passage):/^I\b/.test(v.passage)&&/\bmy\b/i.test(v.passage);if(v.from===v.target||new Set(v.pronounOptions).size!==v.pronounOptions.length||new Set(v.requiredPronouns).size!==2||!v.requiredPronouns.every(p=>v.pronounOptions.includes(p))||!passageMatches)ctx.addIssue({code:z.ZodIssueCode.custom,message:'POV transition needs distinct pronouns and both deterministic authored subject forms'})});
export const PovSwitcherWidgetRefSchema=z.object({type:z.literal('pov-switcher'),config:PovSwitcherWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer','topographic-map-explorer','hazard-solution-designer','resource-sorter','word-root-builder','context-clue-detective','story-elements-mapper','theme-evidence-collector','central-idea-organizer','text-structure-sorter','summary-builder','pov-switcher'] as const;
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
 WordRootBuilderWidgetRefSchema,
 ContextClueDetectiveWidgetRefSchema,
 StoryElementsMapperWidgetRefSchema,
 ThemeEvidenceCollectorWidgetRefSchema,
 CentralIdeaOrganizerWidgetRefSchema,
 TextStructureSorterWidgetRefSchema,
 SummaryBuilderWidgetRefSchema,
 PovSwitcherWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'pov-switcher':{type:'interaction';action:'select-pronoun'|'apply'|'reset'}|{type:'change';value:{selectedPronouns:string[]}}|{type:'complete';value:{rewrittenText:string}};
'pov-switcher':lazy(()=>import('./reading/PovSwitcher')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'pov-switcher':{const Widget=widgetRegistry['pov-switcher'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
export function rewritePassage(passage:string,from:'first'|'third',[subject,possessive]:[string,string]){if(from==='first')return passage.replace(/\bmy\b/gi,possessive).replace(/\bI\b/g,subject);const name=passage.match(/\b[A-Z][a-z]+\b/)?.[0];if(!name)return passage;return passage.replace(new RegExp(`${name}[’']s`,'g'),possessive).replace(new RegExp(`\\b${name}\\b`,'g'),subject)}
export default function PovSwitcher({config,onEvent}:WidgetProps<'pov-switcher'>){const key=JSON.stringify(config);const [selected,setSelected]=useState<string[]>([]),[status,setStatus]=useState('Choose the target pronouns.');const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setSelected([]);setStatus('Choose the target pronouns.')},[key]);const ordered=(ids:string[])=>config.pronounOptions.filter(p=>ids.includes(p));const emit=(next:string[],action:'select-pronoun'|'apply'|'reset',apply=false)=>{const value=ordered(next);setSelected(value);if(action==='select-pronoun')setStatus('Pronoun selection changed; apply when ready.');if(action==='reset')setStatus('Choose the target pronouns.');onEvent({type:'interaction',action});onEvent({type:'change',value:{selectedPronouns:value}});if(apply){const ready=config.requiredPronouns.every(p=>value.includes(p));if(!ready){setStatus('Choose both required pronouns.');return}const rewrittenText=rewritePassage(config.passage,config.from,config.requiredPronouns);setStatus(rewrittenText);completeOnce(()=>onEvent({type:'complete',value:{rewrittenText}}))}};return <section className="card widget-experiment pov" data-testid="widget-pov-switcher" data-state={completed?'complete':'switching'}><p>{config.passage}</p>{config.pronounOptions.map(p=><button key={p} aria-label={`Select pronoun ${p}`} aria-pressed={selected.includes(p)} onClick={()=>emit(selected.includes(p)?selected.filter(x=>x!==p):selected.concat(p),'select-pronoun')}>{p}</button>)}<button aria-label="Apply point of view" onClick={()=>emit(selected,'apply',true)}>Apply</button><button onClick={()=>emit([],'reset')}>Start over</button><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.pov{display:grid;gap:.75rem}.widget-experiment.pov button[aria-pressed="true"]{outline:3px solid var(--c-accent-action)}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- PovSwitcher WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact R8 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/reading/PovSwitcher.tsx src/widgets/reading/PovSwitcher.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add point of view widget"
```

### Task R9: Figurative-language matcher

**Files:** Create `src/widgets/reading/FigurativeLanguageMatcher.tsx`, `src/widgets/reading/FigurativeLanguageMatcher.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Strict unique pairs. Tap phrase then kind; retain printed `figurative-match-{id}`, leave wrong match revisable, complete all correct once.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('prints retained matches and completes every correct kind',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<FigurativeLanguageMatcher config={{pairs:[{id:'simile',phrase:'fast as lightning',kind:'simile',meaning:'very fast'},{id:'idiom',phrase:'piece of cake',kind:'idiom',meaning:'easy'}]}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Select phrase fast as lightning'}));await user.click(screen.getByRole('button',{name:'Match simile'}));await user.click(screen.getByRole('button',{name:'Select phrase piece of cake'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Match idiom'}));expect(screen.getByTestId('figurative-match-simile')).toHaveTextContent('simile');expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'match'},{type:'change',value:{matches:{simile:'simile',idiom:'idiom'}}},{type:'complete',value:{matches:{simile:'simile',idiom:'idiom'}}}])});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- FigurativeLanguageMatcher` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const FigurativeKindSchema=z.enum(['simile','metaphor','personification','idiom']),FigurativePairSchema=z.object({id:z.string().min(1),phrase:z.string().min(1),kind:FigurativeKindSchema,meaning:z.string().min(1)}).strict();export const FigurativeLanguageMatcherWidgetConfigSchema=z.object({pairs:z.array(FigurativePairSchema).min(2)}).strict().refine(v=>new Set(v.pairs.map(x=>x.id)).size===v.pairs.length,'duplicate ids');
export const FigurativeLanguageMatcherWidgetRefSchema=z.object({type:z.literal('figurative-language-matcher'),config:FigurativeLanguageMatcherWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer','topographic-map-explorer','hazard-solution-designer','resource-sorter','word-root-builder','context-clue-detective','story-elements-mapper','theme-evidence-collector','central-idea-organizer','text-structure-sorter','summary-builder','pov-switcher','figurative-language-matcher'] as const;
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
 WordRootBuilderWidgetRefSchema,
 ContextClueDetectiveWidgetRefSchema,
 StoryElementsMapperWidgetRefSchema,
 ThemeEvidenceCollectorWidgetRefSchema,
 CentralIdeaOrganizerWidgetRefSchema,
 TextStructureSorterWidgetRefSchema,
 SummaryBuilderWidgetRefSchema,
 PovSwitcherWidgetRefSchema,
 FigurativeLanguageMatcherWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
'figurative-language-matcher':{type:'interaction';action:'select-phrase'|'match'|'reset'}|{type:'change';value:{matches:Record<string,string>}}|{type:'complete';value:{matches:Record<string,string>}};
'figurative-language-matcher':lazy(()=>import('./reading/FigurativeLanguageMatcher')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'figurative-language-matcher':{const Widget=widgetRegistry['figurative-language-matcher'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
const kinds=['simile','metaphor','personification','idiom'] as const;export default function FigurativeLanguageMatcher({config,onEvent}:WidgetProps<'figurative-language-matcher'>){const key=JSON.stringify(config);const [selected,setSelected]=useState<string|null>(null),[matches,setMatches]=useState<Record<string,string>>({});const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setSelected(null);setMatches({})},[key]);const correct=(next:Record<string,string>)=>config.pairs.every(p=>next[p.id]===p.kind);const emit=(next:Record<string,string>,action:'select-phrase'|'match'|'reset')=>{setMatches(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{matches:next}});if(correct(next))completeOnce(()=>onEvent({type:'complete',value:{matches:next}}))};const select=(id:string)=>{setSelected(id);emit(matches,'select-phrase')};return <section className="card widget-experiment figurative" data-testid="widget-figurative-language-matcher" data-state={completed?'complete':'matching'}>{config.pairs.map(p=><div key={p.id}><button aria-label={`Select phrase ${p.phrase}`} onClick={()=>select(p.id)}>{p.phrase}</button><output data-testid={`figurative-match-${p.id}`}>{matches[p.id]??''}</output></div>)}{kinds.map(k=><button key={k} aria-label={`Match ${k}`} disabled={!selected} onClick={()=>selected&&emit({...matches,[selected]:k},'match')}>{k}</button>)}<button onClick={()=>{setSelected(null);emit({},'reset')}}>Start over</button><p role="status">{correct(matches)?'Every figurative phrase is matched.':selected?'Choose the language type.':'Select a phrase.'}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.figurative{display:grid;gap:.75rem}.widget-experiment.figurative output{min-block-size:1.5em}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- FigurativeLanguageMatcher WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact R9 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/reading/FigurativeLanguageMatcher.tsx src/widgets/reading/FigurativeLanguageMatcher.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add figurative language widget"
```

### Task R10: Source-credibility checker

**Files:** Create `src/widgets/reading/SourceCredibilityChecker.tsx`, `src/widgets/reading/SourceCredibilityChecker.test.tsx`; modify `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/theme.css`.

**Interfaces:** Source includes optional author/date/publisher/purpose and claims. Criteria-derived credibility must exactly equal authored `credibleIds` at schema validation. Ratings are retained/revisable; Check explains missing criteria or completes all decisions.

- [ ] **Step 1 (2–5 minutes): Write red test**

```tsx
test('evaluates missing author/evidence and then completes corrected rating',async()=>{const onEvent=vi.fn(),user=userEvent.setup();render(<SourceCredibilityChecker config={{sources:[{id:'anon',title:'Amazing facts',claims:[]}],criteria:['author','evidence'],credibleIds:[]}} onEvent={onEvent}/>);await user.click(screen.getByRole('button',{name:'Rate Amazing facts credible'}));await user.click(screen.getByRole('button',{name:'Check sources'}));expect(screen.getByRole('status')).toHaveTextContent(/author.*evidence/i);expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(0);await user.click(screen.getByRole('button',{name:'Rate Amazing facts needs checking'}));onEvent.mockClear();await user.click(screen.getByRole('button',{name:'Check sources'}));expect(onEvent.mock.calls.map(([e])=>e)).toEqual([{type:'interaction',action:'check'},{type:'change',value:{ratings:{anon:'needs-checking'}}},{type:'complete',value:{ratings:{anon:'needs-checking'}}}])});
```

- [ ] **Step 2 (2–5 minutes): Run red** — `npm test -- SourceCredibilityChecker` → module-not-found.

**Step 3: Implement the exact unit in bounded edits**

- [ ] **Step 3a (2–5 minutes): Add the strict config/ref schema and exact cumulative schema exports**

```ts
const CredibilityCriterionSchema=z.enum(['author','evidence','date','purpose']),CredibilitySourceSchema=z.object({id:z.string().min(1),title:z.string().min(1),author:z.string().min(1).optional(),date:z.string().min(1).optional(),publisher:z.string().min(1).optional(),purpose:z.string().min(1).optional(),claims:z.array(z.string().min(1))}).strict();const sourceMeets=(s:z.infer<typeof CredibilitySourceSchema>,criteria:Array<z.infer<typeof CredibilityCriterionSchema>>)=>criteria.every(c=>c==='author'?!!s.author:c==='evidence'?s.claims.length>0:c==='date'?!!s.date:!!s.purpose);
export const SourceCredibilityCheckerWidgetConfigSchema=z.object({sources:z.array(CredibilitySourceSchema).min(1),criteria:z.array(CredibilityCriterionSchema).min(1),credibleIds:z.array(z.string().min(1))}).strict().superRefine((v,ctx)=>{const ids=v.sources.map(x=>x.id),derived=v.sources.filter(s=>sourceMeets(s,v.criteria)).map(s=>s.id).sort();if(new Set(ids).size!==ids.length||new Set(v.criteria).size!==v.criteria.length||new Set(v.credibleIds).size!==v.credibleIds.length||!v.credibleIds.every(id=>ids.includes(id))||JSON.stringify([...v.credibleIds].sort())!==JSON.stringify(derived))ctx.addIssue({code:z.ZodIssueCode.custom,message:'credibleIds must equal criteria evaluation'})});
export const SourceCredibilityCheckerWidgetRefSchema=z.object({type:z.literal('source-credibility-checker'),config:SourceCredibilityCheckerWidgetConfigSchema}).strict();
```

At the two existing export sites in `src/content/schema.ts`, replace the complete declarations with these cumulative forms; keep them at their existing positions (the type tuple above the schemas and the union after every referenced config schema):

```ts
export const WIDGET_TYPES=['place-value-builder','number-line-compare','base-ten-blocks','fraction-models','area-model-multiplier','array-builder','money-counter','clock-elapsed-time','quarter-inch-ruler','balance-scale','shape-classifier','data-plot-builder','probability-spinner','collision-ramp','energy-transfer-builder','wave-maker','light-reflection-eye','message-sender','energy-conversion-designer','animal-structure-matcher','erosion-simulator','rock-layer-explorer','topographic-map-explorer','hazard-solution-designer','resource-sorter','word-root-builder','context-clue-detective','story-elements-mapper','theme-evidence-collector','central-idea-organizer','text-structure-sorter','summary-builder','pov-switcher','figurative-language-matcher','source-credibility-checker'] as const;
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
 WordRootBuilderWidgetRefSchema,
 ContextClueDetectiveWidgetRefSchema,
 StoryElementsMapperWidgetRefSchema,
 ThemeEvidenceCollectorWidgetRefSchema,
 CentralIdeaOrganizerWidgetRefSchema,
 TextStructureSorterWidgetRefSchema,
 SummaryBuilderWidgetRefSchema,
 PovSwitcherWidgetRefSchema,
 FigurativeLanguageMatcherWidgetRefSchema,
 SourceCredibilityCheckerWidgetRefSchema,
]);
```

- [ ] **Step 3b (2–5 minutes): Insert the exact event-map member and lazy registry member**

```ts
type Rating='credible'|'needs-checking';
'source-credibility-checker':{type:'interaction';action:'rate-source'|'check'|'reset'}|{type:'change';value:{ratings:Record<string,Rating>}}|{type:'complete';value:{ratings:Record<string,Rating>}};
'source-credibility-checker':lazy(()=>import('./reading/SourceCredibilityChecker')),
```

- [ ] **Step 3c (2–5 minutes): Insert the exact exhaustive WidgetFrame case**

```tsx
case 'source-credibility-checker':{const Widget=widgetRegistry['source-credibility-checker'];return <Widget config={ref.config} onEvent={ref.onEvent}/>}
```

- [ ] **Step 3d (2–5 minutes): Create the exact component implementation**

```tsx
type Rating='credible'|'needs-checking';const missing=(s:{author?:string;date?:string;purpose?:string;claims:string[]},criteria:string[])=>criteria.filter(c=>c==='author'?!s.author:c==='evidence'?s.claims.length===0:c==='date'?!s.date:!s.purpose);export default function SourceCredibilityChecker({config,onEvent}:WidgetProps<'source-credibility-checker'>){const key=JSON.stringify(config);const [ratings,setRatings]=useState<Record<string,Rating>>({}),[status,setStatus]=useState('Rate every source.');const {completed,completeOnce}=useCompletionLatch(key);useEffect(()=>{setRatings({});setStatus('Rate every source.')},[key]);const emit=(next:Record<string,Rating>,action:'rate-source'|'check'|'reset',check=false)=>{setRatings(next);onEvent({type:'interaction',action});onEvent({type:'change',value:{ratings:next}});if(check){const allRated=config.sources.every(s=>next[s.id]),wrong=config.sources.filter(s=>{const expected=config.credibleIds.includes(s.id)?'credible':'needs-checking';return next[s.id]!==expected}),omissions=wrong.flatMap(s=>missing(s,config.criteria)),ok=allRated&&wrong.length===0;setStatus(ok?'Every source rating is supported.':!allRated?'Rate every source before checking.':omissions.length?`Recheck ${[...new Set(omissions)].join(' and ')}.`:'Some completed ratings do not match the evidence.');if(ok)completeOnce(()=>onEvent({type:'complete',value:{ratings:next}}))}};return <section className="card widget-experiment credibility" data-testid="widget-source-credibility-checker" data-state={completed?'complete':'rating'}>{config.sources.map(s=><div key={s.id}><h4>{s.title}</h4><button aria-label={`Rate ${s.title} credible`} aria-pressed={ratings[s.id]==='credible'} onClick={()=>emit({...ratings,[s.id]:'credible'},'rate-source')}>Credible</button><button aria-label={`Rate ${s.title} needs checking`} aria-pressed={ratings[s.id]==='needs-checking'} onClick={()=>emit({...ratings,[s.id]:'needs-checking'},'rate-source')}>Needs checking</button></div>)}<button aria-label="Check sources" onClick={()=>emit(ratings,'check',true)}>Check</button><button onClick={()=>emit({},'reset')}>Start over</button><p role="status">{status}</p></section>}
```


- [ ] **Step 3e (2–5 minutes): Append the exact namespaced CSS**

```css
.widget-experiment.credibility{display:grid;gap:.75rem}.widget-experiment.credibility button[aria-pressed="true"]{outline:3px solid var(--c-accent-action)}
```

- [ ] **Step 4 (2–5 minutes): Run green** — `npm test -- SourceCredibilityChecker WidgetFrame schema && npx tsc -b --pretty false` → PASS.
- [ ] **Step 5 (2–5 minutes): Commit the exact R10 files**

```bash
git add src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx src/widgets/reading/SourceCredibilityChecker.tsx src/widgets/reading/SourceCredibilityChecker.test.tsx src/theme.css
test -z "$(git diff --cached --name-only -- src/characters)"
git commit -m "feat: add source credibility widget"
```

## Reading plan verification

**Files:** Read only `src/content/schema.ts`, `src/widgets/registry.ts`, `src/widgets/WidgetFrame.tsx`, `src/widgets/WidgetFrame.test.tsx`, and the exact Reading component/test files listed in R1–R10.

**Interfaces:** Consumes the ten guarded Reading task commits after accepted Math and Science. Produces the Reading plan acceptance record; it changes no file.

- [ ] **Step 1 (2–5 minutes):** Run `npm test -- widgets reading schema WidgetFrame && npx tsc -b --pretty false`.
- [ ] **Step 2 (2–5 minutes):** Run `for literal in word-root-builder context-clue-detective story-elements-mapper theme-evidence-collector central-idea-organizer text-structure-sorter summary-builder pov-switcher figurative-language-matcher source-credibility-checker; do test "$(rg -l -F "'$literal'" src/content/schema.ts src/widgets/registry.ts src/widgets/WidgetFrame.tsx | wc -l | tr -d ' ')" = 3; done`.
- [ ] **Step 3 (2–5 minutes):** Confirm `git diff --cached --name-only -- src/characters` prints nothing and record R1–R10 gate/commit ids in the execution notes.

Expected: PASS. Every Reading widget has its exact schema/event/registry/dispatcher/component/test/CSS, retained revisable state, current revision feedback, and interaction-triggered one-shot completion.
