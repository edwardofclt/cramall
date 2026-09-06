import {render,screen,within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,test,vi} from 'vitest';
import {SummaryBuilderWidgetConfigSchema} from '../../content/schema';
import type {WidgetEvent} from '../registry';
import SummaryBuilder from './SummaryBuilder';

const config={
  sourceSentences:[
    {id:'main',text:'Bees help plants.',role:'main' as const},
    {id:'detail',text:'They carry pollen.',role:'detail' as const},
    {id:'extra',text:'Blue is a color.',role:'extra' as const},
  ],
  requiredMainIds:['main'],
  maxSentences:2,
};

const compositionConfig={
  sourceSentences:[
    {id:'main',text:'Bees help plants.',role:'main' as const},
    {id:'detail',text:'They carry pollen.',role:'detail' as const},
    {id:'second-detail',text:'Flowers receive the pollen.',role:'detail' as const},
    {id:'extra',text:'Blue is a color.',role:'extra' as const},
  ],
  requiredMainIds:['main'],
  requiredDetailIds:['detail'],
  maxSentences:2,
  compositionPrompt:'Now explain the main idea and useful detail in your own words.',
  minCompositionWords:5,
  maxCompositionWords:14,
};

test('types summary completion payloads with optional composition for legacy and new lessons',()=>{
  const legacy:WidgetEvent<'summary-builder'>={type:'complete',value:{selectedIds:['main']}};
  const composed:WidgetEvent<'summary-builder'>={type:'complete',value:{selectedIds:['main','detail'],composition:'Bees carry pollen.'}};
  expect(legacy).toEqual({type:'complete',value:{selectedIds:['main']}});
  expect(composed).toEqual({type:'complete',value:{selectedIds:['main','detail'],composition:'Bees carry pollen.'}});
});

test('accepts the required main, keeps a detail concise, then explains an extra',async()=>{
  // Dropping a selected detail, rejecting a concise detail, or completing more than once must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<SummaryBuilder config={config} onEvent={onEvent}/>);

  await user.click(screen.getByRole('button',{name:'Toggle Bees help plants.'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'toggle-sentence'},
    {type:'coach',cue:'strategy'},
    {type:'coach',cue:'milestone'},
    {type:'change',value:{selectedIds:['main']}},
    {type:'complete',value:{selectedIds:['main']}},
  ]);
  await user.click(screen.getByRole('button',{name:'Toggle They carry pollen.'}));
  expect(screen.getByTestId('widget-summary-builder')).toHaveAttribute('data-state','complete');
  expect(within(screen.getByTestId('summary-selected-order')).getAllByRole('listitem').map((item)=>item.textContent)).toEqual([
    'Bees help plants.',
    'They carry pollen.',
  ]);
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);

  await user.click(screen.getByRole('button',{name:'Toggle Blue is a color.'}));
  expect(screen.getByRole('status')).toHaveTextContent(/extra/i);
  expect(screen.getByTestId('widget-summary-builder')).toHaveAttribute('data-state','revision');
  expect(screen.getByText('Selected 3 of 2 sentences.')).toBeVisible();
});

test('keeps every source sentence visible with keyboard-ready non-color selection markers',async()=>{
  // Hiding source sentences or relying on color instead of aria and text markers must fail this test.
  const user=userEvent.setup();
  render(<SummaryBuilder config={config} onEvent={vi.fn()}/>);
  const main=screen.getByRole('button',{name:'Toggle Bees help plants.'});
  expect(screen.getByText('They carry pollen.')).toBeVisible();
  expect(screen.getByText('Blue is a color.')).toBeVisible();
  expect(main).toHaveAttribute('aria-pressed','false');
  expect(main).toHaveTextContent('Not selected');

  main.focus();
  await user.keyboard('{Enter}');
  expect(main).toHaveAttribute('aria-pressed','true');
  expect(main).toHaveTextContent('Selected');
  expect(screen.getByText('✓ Summary ready')).toBeVisible();
});

test('retains over-limit choices in authored order and gives bounded revision feedback',async()=>{
  // Silently trimming the third choice, preserving click order, or naming the missing sentence must fail this test.
  const user=userEvent.setup();
  render(<SummaryBuilder config={config} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Toggle They carry pollen.'}));
  await user.click(screen.getByRole('button',{name:'Toggle Bees help plants.'}));
  await user.click(screen.getByRole('button',{name:'Toggle Blue is a color.'}));
  expect(within(screen.getByTestId('summary-selected-order')).getAllByRole('listitem').map((item)=>item.textContent)).toEqual([
    'Bees help plants.',
    'They carry pollen.',
    'Blue is a color.',
  ]);

  await user.click(screen.getByRole('button',{name:'Toggle Blue is a color.'}));
  await user.click(screen.getByRole('button',{name:'Toggle Bees help plants.'}));
  expect(screen.getByRole('status')).toHaveTextContent(/main idea/i);
  expect(screen.getByRole('status')).not.toHaveTextContent('Bees help plants.');
});

test('emits ordered reset state and never rearms completion after revision',async()=>{
  // Reordering events, leaving stale success visible, or re-emitting completion after reset must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<SummaryBuilder config={config} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Toggle Bees help plants.'}));
  await user.click(screen.getByRole('button',{name:'Toggle Blue is a color.'}));
  expect(screen.getByTestId('widget-summary-builder')).toHaveAttribute('data-current-valid','no');
  expect(screen.getByText('○ Needs revision')).toBeVisible();

  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Start over'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'reset'},
    {type:'change',value:{selectedIds:[]}},
  ]);
  expect(screen.getByTestId('summary-selected-order')).toHaveTextContent('No sentences selected yet.');

  await user.click(screen.getByRole('button',{name:'Toggle Bees help plants.'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(0);
});

test('resets stale selections safely on the first render of a new config',async()=>{
  // Retaining an old sentence ID across lesson navigation must fail this test.
  const user=userEvent.setup();
  const view=render(<SummaryBuilder config={config} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Toggle Blue is a color.'}));

  view.rerender(<SummaryBuilder config={{
    sourceSentences:[
      {id:'river',text:'Rain fills the river.',role:'main'},
      {id:'bank',text:'Fast water wears the bank.',role:'detail'},
      {id:'moon',text:'The moon is rocky.',role:'extra'},
    ],
    requiredMainIds:['river'],
    maxSentences:2,
  }} onEvent={vi.fn()}/>);
  expect(screen.getByRole('button',{name:'Toggle Rain fills the river.'})).toHaveAttribute('aria-pressed','false');
  expect(screen.getByTestId('summary-selected-order')).toHaveTextContent('No sentences selected yet.');
  expect(screen.getByRole('status')).toHaveTextContent(/main idea/i);
});

test('normalizes authoring text and rejects equivalent, dangling, duplicate, or unsolvable references',()=>{
  // Weakening canonical uniqueness, role integrity, or the maximum boundary must fail these literals.
  expect(SummaryBuilderWidgetConfigSchema.parse({
    sourceSentences:[
      {id:' main ',text:' Bees   help plants. ',role:'main'},
      {id:'detail',text:' They carry pollen. ',role:'detail'},
      {id:'extra',text:' Blue is a color. ',role:'extra'},
    ],
    requiredMainIds:[' main '],
    maxSentences:2,
  })).toEqual(config);

  const invalid=[
    {...config,sourceSentences:[config.sourceSentences[0],config.sourceSentences[1]]},
    {...config,sourceSentences:[config.sourceSentences[0],config.sourceSentences[1],{id:' ',text:'Other sentence.',role:'main' as const}]},
    {...config,sourceSentences:[config.sourceSentences[0],config.sourceSentences[1],{id:'other',text:' ',role:'main' as const}]},
    {...config,sourceSentences:[config.sourceSentences[0],config.sourceSentences[1],{id:' MAIN ',text:'Other sentence.',role:'main' as const}]},
    {...config,sourceSentences:[config.sourceSentences[0],config.sourceSentences[1],{id:'other',text:' bees help plants. ',role:'main' as const}]},
    {...config,requiredMainIds:['main','main']},
    {...config,requiredMainIds:['main',' MAIN ']},
    {...config,requiredMainIds:['missing']},
    {...config,requiredMainIds:['detail']},
    {...config,requiredMainIds:['main'],maxSentences:0},
    {...config,requiredMainIds:['main'],maxSentences:6},
    {...config,requiredMainIds:['main','second'],maxSentences:1,sourceSentences:[...config.sourceSentences,{id:'second',text:'Flowers make seeds.',role:'main' as const}]},
  ];
  for(const value of invalid)expect(SummaryBuilderWidgetConfigSchema.safeParse(value).success).toBe(false);
});

test('requires exact supporting evidence before revealing an honest composition step',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<SummaryBuilder config={compositionConfig} onEvent={onEvent}/>);

  await user.click(screen.getByRole('button',{name:'Toggle Bees help plants.'}));
  expect(screen.getByRole('status')).toHaveTextContent(/supporting detail/i);
  expect(screen.queryByRole('textbox',{name:/summary/i})).not.toBeInTheDocument();

  await user.click(screen.getByRole('button',{name:'Toggle Flowers receive the pollen.'}));
  expect(screen.getByRole('status')).toHaveTextContent(/not required/i);
  expect(screen.queryByRole('textbox',{name:/summary/i})).not.toBeInTheDocument();

  await user.click(screen.getByRole('button',{name:'Toggle Flowers receive the pollen.'}));
  await user.click(screen.getByRole('button',{name:'Toggle They carry pollen.'}));
  expect(screen.getByRole('textbox',{name:/summary/i})).toBeVisible();
  expect(screen.getByText(compositionConfig.compositionPrompt)).toBeVisible();
  expect(screen.getByText(/not meaning or originality/i)).toBeVisible();
  expect(screen.getByRole('button',{name:/Remove "Bees help plants/})).toBeVisible();

  await user.type(screen.getByRole('textbox',{name:/summary/i}),'Bees help plants by carrying pollen.');
  await user.click(screen.getByRole('button',{name:'Finish summary'}));
  expect(screen.getByRole('status')).toHaveTextContent(/ready/i);
  const completeEvents=onEvent.mock.calls.map(([event])=>event).filter((event)=>event.type==='complete');
  expect(completeEvents).toEqual([{
    type:'complete',
    value:{selectedIds:['main','detail'],composition:'Bees help plants by carrying pollen.'},
  }]);
});

test('keeps source visible and preserves a revision while word bounds are unmet',async()=>{
  const user=userEvent.setup();
  render(<SummaryBuilder config={compositionConfig} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Toggle Bees help plants.'}));
  await user.click(screen.getByRole('button',{name:'Toggle They carry pollen.'}));
  const textbox=screen.getByRole('textbox',{name:/summary/i});
  await user.type(textbox,'Too short');
  expect(screen.getByRole('status')).toHaveTextContent(/at least 5 words/i);
  expect(textbox).toHaveValue('Too short');
  expect(screen.getAllByText('Bees help plants.').length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText('They carry pollen.').length).toBeGreaterThanOrEqual(1);
  await user.type(textbox,' that helps flowers grow');
  expect(screen.getByRole('status')).toHaveTextContent(/ready/i);
});

test('emits bounded strategy, retry, milestone, and typed composition completion cues',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<SummaryBuilder config={compositionConfig} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Toggle Bees help plants.'}));
  await user.click(screen.getByRole('button',{name:'Toggle Flowers receive the pollen.'}));
  await user.click(screen.getByRole('button',{name:'Toggle Flowers receive the pollen.'}));
  await user.click(screen.getByRole('button',{name:'Toggle They carry pollen.'}));
  const events=onEvent.mock.calls.map(([event])=>event);
  expect(events.filter((event)=>event.type==='coach')).toEqual([
    {type:'coach',cue:'strategy'},
    {type:'coach',cue:'retry'},
    {type:'coach',cue:'milestone'},
  ]);
  await user.type(screen.getByRole('textbox',{name:/summary/i}),'Bees help plants by carrying pollen.');
  await user.click(screen.getByRole('button',{name:'Finish summary'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toContainEqual({
    type:'complete',
    value:{selectedIds:['main','detail'],composition:'Bees help plants by carrying pollen.'},
  });
});

test('does not coach retry for missing evidence, then retries the actual extra selection',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<SummaryBuilder config={compositionConfig} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Toggle Bees help plants.'}));
  expect(onEvent.mock.calls.map(([event])=>event).filter((event)=>event.type==='coach')).toEqual([
    {type:'coach',cue:'strategy'},
  ]);
  await user.click(screen.getByRole('button',{name:'Toggle Blue is a color.'}));
  expect(onEvent.mock.calls.map(([event])=>event).filter((event)=>event.type==='coach')).toEqual([
    {type:'coach',cue:'strategy'},
    {type:'coach',cue:'retry'},
  ]);
});

test('includes an empty composition only when a composition stage is configured',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<SummaryBuilder config={compositionConfig} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Start over'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'reset'},
    {type:'change',value:{selectedIds:[],composition:''}},
  ]);
});
