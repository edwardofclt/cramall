import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,test,vi} from 'vitest';
import {StoryElementsMapperWidgetConfigSchema} from '../../content/schema';
import StoryElementsMapper from './StoryElementsMapper';

const firstConfig = {
  textTitle: 'The Garden Surprise',
  fields: ['character','setting','problem'] as ('character'|'setting'|'problem')[],
  answers: {character:'Ava',setting:'Park',problem:'The gate is locked'},
};

test('retains authored-order labelled entries and completes only after Check',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<StoryElementsMapper config={firstConfig} onEvent={onEvent}/>);

  expect(screen.getAllByRole('textbox').map((input)=>input.getAttribute('aria-label'))).toEqual([
    'Character','Setting','Problem',
  ]);
  await user.type(screen.getByRole('textbox',{name:'Character'}),'Ava');
  await user.type(screen.getByRole('textbox',{name:'Setting'}),'Park');
  await user.type(screen.getByRole('textbox',{name:'Problem'}),'The gate is locked');
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(0);

  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Check story map'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'check'},
    {type:'change',value:{entries:{character:'Ava',setting:'Park',problem:'The gate is locked'}}},
    {type:'complete',value:{entries:{character:'Ava',setting:'Park',problem:'The gate is locked'}}},
  ]);
});

test('normalizes bounded authoring text and rejects invalid answer-key sets',()=>{
  const parsed=StoryElementsMapperWidgetConfigSchema.parse({
    textTitle:'  Story  ',
    fields:['character','setting'],
    answers:{character:'  Ava  ',setting:'  Park  '},
  });
  expect(parsed).toEqual({
    textTitle:'Story',
    fields:['character','setting'],
    answers:{character:'Ava',setting:'Park'},
  });
  expect(StoryElementsMapperWidgetConfigSchema.safeParse({...firstConfig,textTitle:'  '}).success).toBe(false);
  expect(StoryElementsMapperWidgetConfigSchema.safeParse({...firstConfig,fields:['character','character']}).success).toBe(false);
  expect(StoryElementsMapperWidgetConfigSchema.safeParse({...firstConfig,answers:{character:'Ava',setting:'Park'}}).success).toBe(false);
  expect(StoryElementsMapperWidgetConfigSchema.safeParse({...firstConfig,answers:{...firstConfig.answers,solution:'They find a key'}}).success).toBe(false);
  expect(StoryElementsMapperWidgetConfigSchema.safeParse({...firstConfig,answers:{...firstConfig.answers,problem:'  '}}).success).toBe(false);
});

test('names only the fields needing revision without exposing authored answers',async()=>{
  const user=userEvent.setup();
  render(<StoryElementsMapper config={firstConfig} onEvent={vi.fn()}/>);
  await user.type(screen.getByRole('textbox',{name:'Character'}),'Ava');
  await user.type(screen.getByRole('textbox',{name:'Setting'}),'School');
  await user.type(screen.getByRole('textbox',{name:'Problem'}),'A different problem');
  await user.click(screen.getByRole('button',{name:'Check story map'}));

  expect(screen.getByTestId('widget-story-elements-mapper')).toHaveAttribute('data-state','revision');
  expect(screen.getByRole('status')).toHaveTextContent('Setting and Problem');
  expect(screen.getByRole('status')).not.toHaveTextContent(/Park|gate is locked/i);
});

test('uses current entries after success while emitting completion only once per config',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<StoryElementsMapper config={{textTitle:'Story',fields:['character','setting'],answers:{character:'Ava',setting:'Park'}}} onEvent={onEvent}/>);
  const character=screen.getByRole('textbox',{name:'Character'});
  const setting=screen.getByRole('textbox',{name:'Setting'});
  await user.type(character,'  Ava  ');
  await user.type(setting,'Park');
  await user.click(screen.getByRole('button',{name:'Check story map'}));
  expect(screen.getByTestId('widget-story-elements-mapper')).toHaveAttribute('data-state','complete');

  await user.clear(setting);
  await user.type(setting,'School');
  expect(screen.getByTestId('widget-story-elements-mapper')).toHaveAttribute('data-state','mapping');
  expect(screen.getByRole('status')).toHaveTextContent(/map changed/i);
  await user.click(screen.getByRole('button',{name:'Check story map'}));
  expect(screen.getByTestId('widget-story-elements-mapper')).toHaveAttribute('data-state','revision');
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);

  await user.click(screen.getByRole('button',{name:'Start over'}));
  expect(screen.getByTestId('widget-story-elements-mapper')).toHaveAttribute('data-state','mapping');
  expect(character).toHaveValue('');
  expect(setting).toHaveValue('');
  expect(screen.getByRole('status')).toHaveTextContent('Fill in the story map.');
  await user.type(character,'Ava');
  await user.type(setting,'Park');
  await user.click(screen.getByRole('button',{name:'Check story map'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
});

test('resets fields and status on the first render of a new config',async()=>{
  const user=userEvent.setup();
  const view=render(<StoryElementsMapper config={firstConfig} onEvent={vi.fn()}/>);
  await user.type(screen.getByRole('textbox',{name:'Character'}),'Ava');

  view.rerender(<StoryElementsMapper config={{textTitle:'A New Story',fields:['events','solution'],answers:{events:'Rain begins',solution:'They open umbrellas'}}} onEvent={vi.fn()}/>);

  expect(screen.getByRole('heading',{name:'A New Story'})).toBeInTheDocument();
  expect(screen.getAllByRole('textbox').map((input)=>input.getAttribute('aria-label'))).toEqual(['Events','Solution']);
  expect(screen.getByRole('textbox',{name:'Events'})).toHaveValue('');
  expect(screen.getByRole('textbox',{name:'Solution'})).toHaveValue('');
  expect(screen.getByRole('status')).toHaveTextContent('Fill in the story map.');
});
