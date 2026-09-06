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

const productionConfig = {
  textTitle: 'The Windy Kite Festival',
  fields: ['character','setting','problem','events','solution'] as ('character'|'setting'|'problem'|'events'|'solution')[],
  answers: {},
  source: {
    title: 'The Windy Kite Festival',
    text: 'Priya carried a kite to the windy harbor field. A gust twisted the tail, so she listened, shortened it, and waited. The kite climbed safely.',
  },
  choices: [
    {id:'character-priya',text:'Priya',field:'character' as const},
    {id:'setting-harbor',text:'The windy harbor field',field:'setting' as const},
    {id:'problem-gust',text:'A gust twisted the kite tail',field:'problem' as const},
    {id:'events-adjust',text:'She listened, shortened the tail, and waited',field:'events' as const},
    {id:'solution-safe',text:'The kite climbed safely',field:'solution' as const},
  ],
  answerChoiceIds: {
    character:'character-priya',setting:'setting-harbor',problem:'problem-gust',events:'events-adjust',solution:'solution-safe',
  },
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

test('keeps the complete source visible and uses evidence choices instead of production textboxes',async()=>{
  render(<StoryElementsMapper config={productionConfig} onEvent={vi.fn()}/>);

  expect(screen.getByTestId('story-map-source')).toHaveTextContent(productionConfig.source.text);
  expect(screen.queryAllByRole('textbox')).toHaveLength(0);
  expect(screen.getByRole('group',{name:'Character'})).toBeInTheDocument();
  expect(screen.getByRole('button',{name:/Place “Priya” in Character/})).toBeInTheDocument();
});

test('supports keyboard placement, named undo/move controls, bounded retry, and one completion',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<StoryElementsMapper config={productionConfig} onEvent={onEvent}/>);

  const placeCharacter=screen.getByRole('button',{name:/Place “Priya” in Character/});
  placeCharacter.focus();
  await user.keyboard('{Enter}');
  expect(screen.getByTestId('story-map-placed-character')).toHaveTextContent('Priya');
  expect(screen.getByRole('button',{name:'Undo Character'})).toBeInTheDocument();
  expect(screen.getByRole('button',{name:'Move Character later'})).toBeInTheDocument();
  expect(onEvent.mock.calls.map(([event])=>event)).toContainEqual({type:'coach',cue:'milestone'});

  await user.click(screen.getByRole('button',{name:'Check story map'}));
  expect(screen.getByRole('status')).toHaveTextContent('Setting');
  expect(screen.getByRole('status')).not.toHaveTextContent(/windy harbor field/i);
  expect(onEvent.mock.calls.map(([event])=>event)).toContainEqual({type:'coach',cue:'retry'});

  const place=(text:string,field:string)=>user.click(screen.getByRole('button',{name:new RegExp(`Place “${text}” in ${field}`)}));
  await place('The windy harbor field','Setting');
  await place('A gust twisted the kite tail','Problem');
  await place('She listened, shortened the tail, and waited','Events');
  await place('The kite climbed safely','Solution');
  await user.click(screen.getByRole('button',{name:'Check story map'}));

  expect(screen.getByTestId('widget-story-elements-mapper')).toHaveAttribute('data-state','complete');
  expect(screen.getByRole('status')).toHaveTextContent(/setting.*problem.*choices.*solution/i);
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
  await user.click(screen.getByRole('button',{name:'Check story map'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
});

test('does not celebrate an unsupported first placement, then celebrates the first supported one',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<StoryElementsMapper config={productionConfig} onEvent={onEvent}/>);

  await user.click(screen.getByRole('button',{name:/Place “The windy harbor field” in Character/}));
  expect(onEvent.mock.calls.map(([event])=>event)).not.toContainEqual({type:'coach',cue:'milestone'});

  await user.click(screen.getByRole('button',{name:'Undo Character'}));
  await user.click(screen.getByRole('button',{name:/Place “Priya” in Character/}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='coach'&&event.cue==='milestone')).toHaveLength(1);
});
