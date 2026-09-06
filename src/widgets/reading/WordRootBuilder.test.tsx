import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,test,vi} from 'vitest';
import {WordRootBuilderWidgetConfigSchema} from '../../content/schema';
import WordRootBuilder from './WordRootBuilder';

test('snaps configured morphemes into left-to-right slots before checking whole-word meaning',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<WordRootBuilder config={{root:'view',prefixes:['re'],suffixes:['er'],targets:[{word:'review',meaning:'see again'}]}} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Select prefix re'}));
  expect(screen.getByTestId('word-root-slot-prefix')).toHaveTextContent('re');
  expect(screen.getByTestId('word-root-slot-root')).toHaveTextContent('view');
  expect(screen.getByTestId('word-root-slot-suffix')).toHaveTextContent('No suffix');
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Check word'}));
  expect(screen.getByRole('status')).toHaveTextContent(/spelling fits/i);
  expect(screen.getByRole('button',{name:'Check whole-word meaning'})).toBeVisible();
  expect(onEvent.mock.calls.map(([e])=>e)).toEqual([
    {type:'interaction',action:'check'},
    {type:'change',value:{parts:['re','view'],word:'review'}},
    {type:'coach',cue:'milestone'},
  ]);
  expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(0);
  await user.click(screen.getByRole('button',{name:'Choose whole-word meaning: see again'}));
  await user.click(screen.getByRole('button',{name:'Check whole-word meaning'}));
  expect(screen.getByRole('status')).toHaveTextContent('see again');
  expect(onEvent.mock.calls.map(([e])=>e)).toEqual([
    {type:'interaction',action:'check'},
    {type:'change',value:{parts:['re','view'],word:'review'}},
    {type:'coach',cue:'milestone'},
    {type:'interaction',action:'check'},
    {type:'change',value:{parts:['re','view'],word:'review'}},
    {type:'complete',value:{word:'review',meaning:'see again'}},
  ]);
  await user.click(screen.getByRole('button',{name:'Check whole-word meaning'}));
  expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1);
});

test('requires a learner-selected whole-word meaning and coaches a wrong meaning choice',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<WordRootBuilder config={{root:'port',prefixes:['trans'],suffixes:['able'],targets:[{word:'transport',meaning:'carry from one place to another'},{word:'portable',meaning:'able to be carried'}]}} onEvent={onEvent}/>);

  await user.click(screen.getByRole('button',{name:'Select prefix trans'}));
  await user.click(screen.getByRole('button',{name:'Check word'}));
  expect(screen.getByTestId('word-root-meaning-check')).toBeVisible();
  expect(screen.getByRole('button',{name:'Choose whole-word meaning: carry from one place to another'})).toBeVisible();
  expect(screen.getByRole('button',{name:'Choose whole-word meaning: able to be carried'})).toBeVisible();

  await user.click(screen.getByRole('button',{name:'Choose whole-word meaning: able to be carried'}));
  await user.click(screen.getByRole('button',{name:'Check whole-word meaning'}));
  expect(screen.getByRole('status')).toHaveTextContent(/meaning choice does not fit/i);
  expect(screen.getByTestId('widget-word-root-builder')).toHaveAttribute('data-state','meaning-check');
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(0);
  expect(onEvent.mock.calls.map(([event])=>event)).toContainEqual({type:'coach',cue:'retry'});

  await user.click(screen.getByRole('button',{name:'Choose whole-word meaning: carry from one place to another'}));
  await user.click(screen.getByRole('button',{name:'Check whole-word meaning'}));
  expect(screen.getByTestId('widget-word-root-builder')).toHaveAttribute('data-state','complete');
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
});

test('removes a snapped tile with keyboard and gives strategy-specific retry coaching',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<WordRootBuilder config={{root:'port',prefixes:['trans'],suffixes:['able'],targets:[{word:'transport',meaning:'carry from one place to another'},{word:'portable',meaning:'able to be carried'}]}} onEvent={onEvent}/>);

  await user.click(screen.getByRole('button',{name:'Select prefix trans'}));
  const selectedPrefix=screen.getByRole('button',{name:'Remove prefix trans'});
  selectedPrefix.focus();
  await user.keyboard('{Delete}');
  expect(screen.getByTestId('word-root-slot-prefix')).toHaveTextContent('No prefix');
  await user.click(screen.getByRole('button',{name:'Select prefix trans'}));
  await user.click(screen.getByRole('button',{name:'Select suffix able'}));
  await user.click(screen.getByRole('button',{name:'Check word'}));

  expect(screen.getByRole('status')).toHaveTextContent(/reconsider both prefix and suffix/i);
  expect(onEvent.mock.calls.map(([event])=>event)).toContainEqual({type:'coach',cue:'retry'});
  expect(screen.getByTestId('word-root-slot-prefix')).toHaveTextContent('trans');
});

test('rejects whitespace and any unbuildable target while allowing a blank affix choice',()=>{
  expect(WordRootBuilderWidgetConfigSchema.safeParse({root:' ',targets:[{word:'x',meaning:'x'}]}).success).toBe(false);
  expect(WordRootBuilderWidgetConfigSchema.safeParse({root:'view',prefixes:['re'],targets:[{word:'preview',meaning:'see before'}]}).success).toBe(false);
  expect(WordRootBuilderWidgetConfigSchema.safeParse({root:'port',prefixes:['trans'],suffixes:['able'],targets:[{word:'transport',meaning:'carry across'},{word:'portable',meaning:'able to be carried'}]}).success).toBe(true);
});

test('lets a learner revise to explicit blank affixes after completion without emitting completion again',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<WordRootBuilder config={{root:'view',prefixes:['re'],suffixes:['er'],targets:[{word:'review',meaning:'see again'},{word:'view',meaning:'look'}]}} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Select prefix re'}));
  await user.click(screen.getByRole('button',{name:'Check word'}));
  await user.click(screen.getByRole('button',{name:'Choose whole-word meaning: see again'}));
  await user.click(screen.getByRole('button',{name:'Check whole-word meaning'}));
  expect(screen.getByTestId('widget-word-root-builder')).toHaveAttribute('data-state','complete');
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Select no prefix'}));
  expect(screen.getByTestId('widget-word-root-builder')).toHaveAttribute('data-state','building');
  expect(screen.getByRole('button',{name:'Select no prefix'})).toHaveAttribute('aria-pressed','true');
  await user.click(screen.getByRole('button',{name:'Check word'}));
  await user.click(screen.getByRole('button',{name:'Choose whole-word meaning: look'}));
  await user.click(screen.getByRole('button',{name:'Check whole-word meaning'}));
  expect(screen.getByRole('status')).toHaveTextContent('look');
  expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(0);
});

test('renders explicit blank controls for schema-valid present empty affix arrays',()=>{
  render(<WordRootBuilder config={{root:'view',prefixes:[],suffixes:[],targets:[{word:'view',meaning:'look'}]}} onEvent={vi.fn()}/>);

  expect(screen.getByRole('button',{name:'Select no prefix'})).toHaveAttribute('aria-pressed','true');
  expect(screen.getByRole('button',{name:'Select no suffix'})).toHaveAttribute('aria-pressed','true');
});

test('points only to word parts that can be revised after an invalid check',async()=>{
  const user = userEvent.setup();
  const {rerender} = render(<WordRootBuilder config={{root:'view',prefixes:['re'],targets:[{word:'review',meaning:'see again'}]}} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Check word'}));
  expect(screen.getByRole('status')).toHaveTextContent(/reconsider the prefix\.$/i);

  rerender(<WordRootBuilder config={{root:'view',suffixes:['er'],targets:[{word:'viewer',meaning:'a person who looks'}]}} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Check word'}));
  expect(screen.getByRole('status')).toHaveTextContent(/reconsider the suffix\.$/i);

  rerender(<WordRootBuilder config={{root:'view',prefixes:['re'],suffixes:['er'],targets:[{word:'reviewer',meaning:'a person who reviews'}]}} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Check word'}));
  expect(screen.getByRole('status')).toHaveTextContent(/reconsider both prefix and suffix\.$/i);
});
