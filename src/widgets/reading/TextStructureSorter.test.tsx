import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,test,vi} from 'vitest';
import {TextStructureSorterWidgetConfigSchema} from '../../content/schema';
import TextStructureSorter from './TextStructureSorter';

const config={
  excerpts:[
    {id:'rain',text:'Rain fell, so the field flooded.',structure:'cause-effect' as const},
    {id:'steps',text:'First mix, then bake.',structure:'sequence' as const},
  ],
};

test('retains select-then-bin placements in authored order and completes once',async()=>{
  // Reordering the map, dropping an earlier placement, or emitting completion twice must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<TextStructureSorter config={config} onEvent={onEvent}/>);

  await user.click(screen.getByRole('button',{name:'Select First mix, then bake.'}));
  await user.click(screen.getByRole('button',{name:'Place selected excerpt in sequence'}));
  expect(screen.getByTestId('text-structure-placement-steps')).toHaveTextContent('Placed in sequence');
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'select-excerpt'},
    {type:'change',value:{placements:{}}},
    {type:'coach',cue:'strategy'},
    {type:'interaction',action:'place-structure'},
    {type:'change',value:{placements:{steps:'sequence'}}},
    {type:'coach',cue:'milestone'},
  ]);

  await user.click(screen.getByRole('button',{name:'Select Rain fell, so the field flooded.'}));
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Place selected excerpt in cause and effect'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'place-structure'},
    {type:'change',value:{placements:{rain:'cause-effect',steps:'sequence'}}},
    {type:'complete',value:{placements:{rain:'cause-effect',steps:'sequence'}}},
  ]);
  expect(screen.getByTestId('widget-text-structure-sorter')).toHaveAttribute('data-state','complete');

  await user.click(screen.getByRole('button',{name:'Place selected excerpt in cause and effect'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
});

test('keeps full excerpts, selection, and incorrect placements visible for revision',async()=>{
  // Hiding source text, relying only on color, or discarding an incorrect placement must fail this test.
  const user=userEvent.setup();
  render(<TextStructureSorter config={config} onEvent={vi.fn()}/>);
  const rain=screen.getByRole('button',{name:'Select Rain fell, so the field flooded.'});
  expect(screen.getByText('First mix, then bake.')).toBeVisible();
  expect(rain).toHaveAttribute('aria-pressed','false');
  expect(screen.getByTestId('text-structure-placement-rain')).toHaveTextContent('Not placed yet');

  rain.focus();
  await user.keyboard('{Enter}');
  expect(rain).toHaveAttribute('aria-pressed','true');
  expect(rain).toHaveTextContent('Selected');
  await user.click(screen.getByRole('button',{name:'Place selected excerpt in description'}));
  expect(screen.getByTestId('text-structure-placement-rain')).toHaveTextContent('Placed in description');
  const feedback=screen.getByText(/is placed in description/);
  expect(feedback).toBeVisible();
  expect(feedback).not.toHaveTextContent(/cause and effect/i);
});

test('exits visible success after revision while keeping completion latched through reset',async()=>{
  // Stale success or rearming completion when the learner revises or resets must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<TextStructureSorter config={config} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Select Rain fell, so the field flooded.'}));
  await user.click(screen.getByRole('button',{name:'Place selected excerpt in cause and effect'}));
  await user.click(screen.getByRole('button',{name:'Select First mix, then bake.'}));
  await user.click(screen.getByRole('button',{name:'Place selected excerpt in sequence'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);

  await user.click(screen.getByRole('button',{name:'Place selected excerpt in description'}));
  expect(screen.getByTestId('widget-text-structure-sorter')).toHaveAttribute('data-state','revision');
  expect(screen.getByText(/is placed in description/)).toBeVisible();
  await user.click(screen.getByRole('button',{name:'Start over'}));
  expect(screen.getByTestId('text-structure-placement-rain')).toHaveTextContent('Not placed yet');
  expect(screen.getByTestId('text-structure-placement-steps')).toHaveTextContent('Not placed yet');
  expect(onEvent).toHaveBeenLastCalledWith({type:'change',value:{placements:{}}});

  await user.click(screen.getByRole('button',{name:'Select Rain fell, so the field flooded.'}));
  await user.click(screen.getByRole('button',{name:'Place selected excerpt in cause and effect'}));
  await user.click(screen.getByRole('button',{name:'Select First mix, then bake.'}));
  await user.click(screen.getByRole('button',{name:'Place selected excerpt in sequence'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
});

test('resets stale selection and placements on the first render of a new config',async()=>{
  // Retaining an old selected ID or old placement across lesson navigation must fail this test.
  const user=userEvent.setup();
  const view=render(<TextStructureSorter config={config} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Select Rain fell, so the field flooded.'}));
  await user.click(screen.getByRole('button',{name:'Place selected excerpt in cause and effect'}));

  view.rerender(<TextStructureSorter config={{excerpts:[
    {id:'same',text:'Both turtles and frogs hatch from eggs.',structure:'compare-contrast'},
    {id:'problem',text:'The trail was muddy, so Ana wore boots.',structure:'problem-solution'},
  ]}} onEvent={vi.fn()}/>);
  expect(screen.getByRole('button',{name:'Select Both turtles and frogs hatch from eggs.'})).toHaveAttribute('aria-pressed','false');
  expect(screen.getByTestId('text-structure-placement-same')).toHaveTextContent('Not placed yet');
  expect(screen.getByRole('button',{name:'Place selected excerpt in sequence'})).toBeDisabled();
  expect(screen.getByText(/^Select an excerpt\.$/)).toBeVisible();
});

test('normalizes authoring text and rejects blank, equivalent, or unsupported excerpts',()=>{
  // Weakening canonical uniqueness, minimum size, or the allowed structure set must fail these literals.
  expect(TextStructureSorterWidgetConfigSchema.parse({excerpts:[
    {id:' rain ',text:' Rain   fell, so the field flooded. ',structure:'cause-effect'},
    {id:'steps',text:' First mix, then bake. ',structure:'sequence'},
  ]})).toEqual(config);

  expect(TextStructureSorterWidgetConfigSchema.safeParse({excerpts:[config.excerpts[0]]}).success).toBe(false);
  expect(TextStructureSorterWidgetConfigSchema.safeParse({excerpts:[config.excerpts[0],{id:' RAIN ',text:'Different text',structure:'description'}]}).success).toBe(false);
  expect(TextStructureSorterWidgetConfigSchema.safeParse({excerpts:[config.excerpts[0],{id:'other',text:' rain fell, so the field flooded. ',structure:'description'}]}).success).toBe(false);
  expect(TextStructureSorterWidgetConfigSchema.safeParse({excerpts:[config.excerpts[0],{id:'other',text:'Other',structure:'chronological'}]}).success).toBe(false);
  expect(TextStructureSorterWidgetConfigSchema.safeParse({excerpts:[config.excerpts[0],{id:' ',text:'Other',structure:'description'}]}).success).toBe(false);
});

test('uses only authored structures and gives relationship-specific retry coaching',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<TextStructureSorter config={{
    availableStructures:['sequence','compare-contrast'],
    excerpts:[
      {id:'steps',text:'First mix, then bake.',structure:'sequence'},
      {id:'materials',text:'Wood costs less, while composite lasts longer.',structure:'compare-contrast'},
    ],
  }} onEvent={onEvent}/>);
  expect(screen.queryByRole('button',{name:'Place selected excerpt in cause and effect'})).not.toBeInTheDocument();
  expect(screen.queryByRole('button',{name:'Place selected excerpt in problem and solution'})).not.toBeInTheDocument();
  await user.click(screen.getByRole('button',{name:'Select First mix, then bake.'}));
  await user.click(screen.getByRole('button',{name:'Place selected excerpt in compare and contrast'}));
  expect(screen.getByText(/what relationship does it show/i)).toHaveTextContent('First mix, then bake.');
  expect(screen.getByText(/what relationship does it show/i)).not.toHaveTextContent(/sequence/i);
  expect(onEvent.mock.calls.map(([event])=>event)).toContainEqual({type:'coach',cue:'retry'});
});

test('keeps retry feedback on the most recently misclassified excerpt',async()=>{
  const user=userEvent.setup();
  render(<TextStructureSorter config={config} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Select Rain fell, so the field flooded.'}));
  await user.click(screen.getByRole('button',{name:'Place selected excerpt in description'}));
  await user.click(screen.getByRole('button',{name:'Select First mix, then bake.'}));
  await user.click(screen.getByRole('button',{name:'Place selected excerpt in cause and effect'}));
  const feedback=screen.getByText(/what relationship does it show/i);
  expect(feedback).toHaveTextContent('First mix, then bake.');
  expect(feedback).not.toHaveTextContent('Rain fell, so the field flooded.');
  expect(feedback).not.toHaveTextContent(/sequence/i);
});

test('rejects digit-only IDs before Record property ordering can change authored order',()=>{
  // Allowing either numeric ID would let JavaScript reorder the placement payload as 2,10.
  const numericIds={excerpts:[
    {id:'10',text:'Rain fell, so the field flooded.',structure:'cause-effect'},
    {id:'2',text:'First mix, then bake.',structure:'sequence'},
  ]};
  expect(TextStructureSorterWidgetConfigSchema.safeParse(numericIds).success).toBe(false);
  expect(TextStructureSorterWidgetConfigSchema.safeParse({...numericIds,excerpts:[numericIds.excerpts[0],{...numericIds.excerpts[1],id:'steps'}]}).success).toBe(false);
  expect(TextStructureSorterWidgetConfigSchema.safeParse({...numericIds,excerpts:[{...numericIds.excerpts[0],id:'rain'},numericIds.excerpts[1]]}).success).toBe(false);
  expect(TextStructureSorterWidgetConfigSchema.safeParse({...numericIds,excerpts:[{...numericIds.excerpts[0],id:'rain-10'},{...numericIds.excerpts[1],id:'steps-2'}]}).success).toBe(true);
});
