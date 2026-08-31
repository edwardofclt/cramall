import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,test,vi} from 'vitest';
import {WordRootBuilderWidgetConfigSchema} from '../../content/schema';
import WordRootBuilder from './WordRootBuilder';

test('builds from configured morphemes and announces one completion',async()=>{
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<WordRootBuilder config={{root:'view',prefixes:['re'],suffixes:['er'],targets:[{word:'review',meaning:'see again'}]}} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Select prefix re'}));
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Check word'}));
  expect(screen.getByRole('status')).toHaveTextContent('see again');
  expect(onEvent.mock.calls.map(([e])=>e)).toEqual([
    {type:'interaction',action:'check'},
    {type:'change',value:{parts:['re','view'],word:'review'}},
    {type:'complete',value:{word:'review',meaning:'see again'}},
  ]);
  await user.click(screen.getByRole('button',{name:'Check word'}));
  expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1);
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
  expect(screen.getByTestId('widget-word-root-builder')).toHaveAttribute('data-state','complete');
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Select no prefix'}));
  expect(screen.getByTestId('widget-word-root-builder')).toHaveAttribute('data-state','building');
  expect(screen.getByRole('button',{name:'Select no prefix'})).toHaveAttribute('aria-pressed','true');
  await user.click(screen.getByRole('button',{name:'Check word'}));
  expect(screen.getByRole('status')).toHaveTextContent('look');
  expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(0);
});
