import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,test,vi} from 'vitest';
import {ContextClueDetectiveWidgetConfigSchema} from '../../content/schema';
import ContextClueDetective from './ContextClueDetective';

const firstConfig = {
  passage: 'A timid child is shy near a new group.',
  targetWord: 'timid',
  clueChoices: [
    {id: 'definition',text: 'is shy',type: 'definition' as const},
    {id: 'example',text: 'near a new group',type: 'example' as const},
  ],
  correctChoiceId: 'definition',
};

test('keeps the passage visible, commits clue text before revealing clue kinds, and completes once',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<ContextClueDetective config={firstConfig} onEvent={onEvent}/>);

  expect(screen.getByTestId('context-clue-passage')).toHaveTextContent(firstConfig.passage);
  expect(screen.getByText('timid',{selector:'mark'})).toBeInTheDocument();
  const correct = screen.getByRole('button',{name:'Choose clue text: is shy'});
  expect(correct).not.toHaveTextContent('Definition');
  expect(correct).toHaveTextContent('is shy');
  await user.click(correct);

  expect(correct).toHaveAttribute('aria-pressed','true');
  expect(correct).toHaveTextContent('Selected');
  expect(screen.getByText(/what kind of clue/i)).toBeVisible();
  expect(screen.getByRole('button',{name:'Choose definition clue type'})).toBeVisible();
  expect(screen.getByRole('button',{name:'Choose example clue type'})).toBeVisible();
  expect(screen.getByTestId('widget-context-clue-detective')).toHaveAttribute('data-state','ready');
  await user.click(screen.getByRole('button',{name:'Choose definition clue type'}));
  expect(screen.getByTestId('widget-context-clue-detective')).toHaveAttribute('data-state','complete');
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'choose-clue'},
    {type:'change',value:{choiceId:'definition'}},
    {type:'interaction',action:'choose-clue'},
    {type:'change',value:{choiceId:'definition'}},
    {type:'complete',value:{choiceId:'definition'}},
  ]);
  await user.click(screen.getByRole('button',{name:'Choose definition clue type'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
});

test('rejects blank, equivalent, disconnected, and target-free authoring',()=>{
  expect(ContextClueDetectiveWidgetConfigSchema.safeParse({...firstConfig,passage:'  '}).success).toBe(false);
  expect(ContextClueDetectiveWidgetConfigSchema.safeParse({...firstConfig,targetWord:'brave'}).success).toBe(false);
  expect(ContextClueDetectiveWidgetConfigSchema.safeParse({...firstConfig,correctChoiceId:'missing'}).success).toBe(false);
  expect(ContextClueDetectiveWidgetConfigSchema.safeParse({...firstConfig,correctChoiceId:'Definition'}).success).toBe(false);
  expect(ContextClueDetectiveWidgetConfigSchema.safeParse({...firstConfig,clueChoices:[firstConfig.clueChoices[0],{...firstConfig.clueChoices[1],id:' DEFINITION '}]}).success).toBe(false);
  expect(ContextClueDetectiveWidgetConfigSchema.safeParse({...firstConfig,clueChoices:[firstConfig.clueChoices[0],{...firstConfig.clueChoices[1],text:' IS   SHY '}]}).success).toBe(false);
  expect(ContextClueDetectiveWidgetConfigSchema.safeParse({...firstConfig,clueChoices:[firstConfig.clueChoices[0]]}).success).toBe(false);
});

test('rejects a target that occurs only inside a longer word',()=>{
  expect(ContextClueDetectiveWidgetConfigSchema.safeParse({...firstConfig,targetWord:'tim'}).success).toBe(false);
});

test('accepts a canonical-equivalent target and marks its exact raw passage span',()=>{
  const decomposedTarget = 'cafe\u0301';
  const parsed = ContextClueDetectiveWidgetConfigSchema.safeParse({
    ...firstConfig,
    passage:`The ${decomposedTarget} served warm bread.`,
    targetWord:'caf\u00e9',
  });
  expect(parsed.success).toBe(true);
  if(!parsed.success) return;

  render(<ContextClueDetective config={parsed.data} onEvent={vi.fn()}/>);

  expect(screen.getByTestId('context-clue-passage')).toHaveTextContent(`The ${decomposedTarget} served warm bread.`);
  expect(screen.getByTestId('context-clue-passage').querySelector('mark')?.textContent).toBe(decomposedTarget);
});

test('shows bounded coaching and current attempt state when a learner revises after success',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<ContextClueDetective config={firstConfig} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Choose clue text: is shy'}));
  await user.click(screen.getByRole('button',{name:'Choose definition clue type'}));
  await user.click(screen.getByRole('button',{name:'Choose clue text: near a new group'}));
  await user.click(screen.getByRole('button',{name:'Choose example clue type'}));

  expect(screen.getByTestId('widget-context-clue-detective')).toHaveAttribute('data-state','incorrect');
  expect(screen.getByRole('status')).toHaveTextContent(/reread the passage/i);
  expect(screen.getByRole('status')).not.toHaveTextContent(/definition|is shy/i);
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);

  await user.click(screen.getByRole('button',{name:'Start over'}));
  expect(screen.getByTestId('widget-context-clue-detective')).toHaveAttribute('data-state','ready');
  expect(screen.getByRole('button',{name:'Choose clue text: near a new group'})).toHaveAttribute('aria-pressed','false');
});

test('does not expose clue-kind labels before the learner commits a clue text',()=>{
  render(<ContextClueDetective config={firstConfig} onEvent={vi.fn()}/>);
  expect(screen.getByTestId('context-clue-passage')).toHaveTextContent(firstConfig.passage);
  expect(screen.queryByText('Definition',{exact:true})).not.toBeInTheDocument();
  expect(screen.queryByText('Example',{exact:true})).not.toBeInTheDocument();
});

test('clears retained choice and status on the first render of a new config',async()=>{
  const user=userEvent.setup();
  const view=render(<ContextClueDetective config={firstConfig} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Choose clue text: is shy'}));

  view.rerender(<ContextClueDetective config={{passage:'The enormous whale was very large.',targetWord:'enormous',clueChoices:[{id:'synonym',text:'very large',type:'synonym'},{id:'contrast',text:'not tiny',type:'contrast'}],correctChoiceId:'synonym'}} onEvent={vi.fn()}/>);

  expect(screen.getByTestId('context-clue-passage')).toHaveTextContent('The enormous whale was very large.');
  expect(screen.getByTestId('widget-context-clue-detective')).toHaveAttribute('data-state','ready');
  expect(screen.getByRole('status')).toHaveTextContent('Find the clue for enormous.');
  expect(screen.getByRole('button',{name:'Choose clue text: very large'})).toHaveAttribute('aria-pressed','false');
});
