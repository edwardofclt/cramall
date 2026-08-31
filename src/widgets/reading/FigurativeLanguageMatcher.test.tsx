import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,test,vi} from 'vitest';
import {FigurativeLanguageMatcherWidgetConfigSchema} from '../../content/schema';
import FigurativeLanguageMatcher from './FigurativeLanguageMatcher';

const pairs=[
  {id:'flash',phrase:'fast as lightning',kind:'simile' as const,meaning:'very fast'},
  {id:'cake',phrase:'piece of cake',kind:'idiom' as const,meaning:'easy'},
];

test('prints retained matches and completes every correct kind in authored order',async()=>{
  // Dropping prior matches, emitting click order, or completing before every pair is correct must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<FigurativeLanguageMatcher config={{pairs}} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Select phrase fast as lightning'}));
  await user.click(screen.getByRole('button',{name:'Match simile'}));
  await user.click(screen.getByRole('button',{name:'Select phrase piece of cake'}));
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Match idiom'}));
  expect(screen.getByTestId('figurative-match-flash')).toHaveTextContent('simile');
  expect(screen.getByTestId('figurative-match-cake')).toHaveTextContent('idiom');
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'match'},
    {type:'change',value:{matches:{flash:'simile',cake:'idiom'}}},
    {type:'complete',value:{matches:{flash:'simile',cake:'idiom'}}},
  ]);
});

test('keeps every phrase and meaning visible with keyboard and non-color selection markers',async()=>{
  // Hidden source language, mouse-only controls, or color-only selection must fail this test.
  const user=userEvent.setup();
  render(<FigurativeLanguageMatcher config={{pairs}} onEvent={vi.fn()}/>);
  expect(screen.getByText('very fast')).toBeVisible();
  expect(screen.getByText('easy')).toBeVisible();
  const phrase=screen.getByRole('button',{name:'Select phrase fast as lightning'});
  phrase.focus();
  await user.keyboard('{Enter}');
  expect(phrase).toHaveAttribute('aria-pressed','true');
  expect(phrase).toHaveTextContent('✓ Selected');
  expect(screen.getByText('Phrase selected. Choose a language type, then revise any match that needs another look.')).not.toHaveTextContent(/simile|idiom|metaphor|personification/i);
});

test('emits unchanged matches when selecting and retains wrong matches for revision',async()=>{
  // Silent selection or clearing a wrong attempt instead of preserving it must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<FigurativeLanguageMatcher config={{pairs}} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Select phrase fast as lightning'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'select-phrase'},
    {type:'change',value:{matches:{}}},
  ]);
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Match metaphor'}));
  expect(screen.getByTestId('figurative-match-flash')).toHaveTextContent('metaphor');
  expect(screen.getByText('○ Needs revision')).toBeVisible();
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'match'},
    {type:'change',value:{matches:{flash:'metaphor'}}},
  ]);
});

test('leaves visible success after revision without rearming completion',async()=>{
  // A latched success label or repeated completion after correction must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<FigurativeLanguageMatcher config={{pairs}} onEvent={onEvent}/>);
  for(const [phrase,kind] of [['fast as lightning','simile'],['piece of cake','idiom']] as const){
    await user.click(screen.getByRole('button',{name:`Select phrase ${phrase}`}));
    await user.click(screen.getByRole('button',{name:`Match ${kind}`}));
  }
  expect(screen.getByTestId('widget-figurative-language-matcher')).toHaveAttribute('data-state','complete');
  await user.click(screen.getByRole('button',{name:'Select phrase fast as lightning'}));
  await user.click(screen.getByRole('button',{name:'Match metaphor'}));
  expect(screen.getByTestId('widget-figurative-language-matcher')).toHaveAttribute('data-state','revision');
  expect(screen.getByText('Phrase selected. Choose a language type, then revise any match that needs another look.')).toBeVisible();
  await user.click(screen.getByRole('button',{name:'Select phrase fast as lightning'}));
  await user.click(screen.getByRole('button',{name:'Match simile'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
});

test('resets selection and matches without rearming the completion latch',async()=>{
  // Retaining reset state, omitting reset events, or completing twice must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<FigurativeLanguageMatcher config={{pairs}} onEvent={onEvent}/>);
  for(const [phrase,kind] of [['fast as lightning','simile'],['piece of cake','idiom']] as const){
    await user.click(screen.getByRole('button',{name:`Select phrase ${phrase}`}));
    await user.click(screen.getByRole('button',{name:`Match ${kind}`}));
  }
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Start over'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'reset'},
    {type:'change',value:{matches:{}}},
  ]);
  expect(screen.getByTestId('figurative-match-flash')).toBeEmptyDOMElement();
  expect(screen.getByRole('button',{name:'Select phrase fast as lightning'})).toHaveAttribute('aria-pressed','false');
  for(const [phrase,kind] of [['fast as lightning','simile'],['piece of cake','idiom']] as const){
    await user.click(screen.getByRole('button',{name:`Select phrase ${phrase}`}));
    await user.click(screen.getByRole('button',{name:`Match ${kind}`}));
  }
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(0);
});

test('resets stale selection and matches safely on the first render of a new config',async()=>{
  // Dereferencing removed pair IDs or showing stale matches during lesson navigation must fail this test.
  const user=userEvent.setup();
  const view=render(<FigurativeLanguageMatcher config={{pairs}} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Select phrase fast as lightning'}));
  await user.click(screen.getByRole('button',{name:'Match simile'}));
  view.rerender(<FigurativeLanguageMatcher config={{pairs:[
    {id:'sun',phrase:'the sun smiled',kind:'personification',meaning:'sunshine felt cheerful'},
    {id:'library',phrase:'the library was a beehive',kind:'metaphor',meaning:'the library was busy'},
  ]}} onEvent={vi.fn()}/>);
  expect(screen.getByTestId('figurative-match-sun')).toBeEmptyDOMElement();
  expect(screen.getByRole('button',{name:'Select phrase the sun smiled'})).toHaveAttribute('aria-pressed','false');
  expect(screen.getByTestId('widget-figurative-language-matcher')).toHaveAttribute('data-state','matching');
});

test('normalizes text and rejects ambiguous pairs or array-index IDs',()=>{
  // Blank/equivalent fields, duplicate visible pairs, forbidden kinds, and numeric IDs must fail these literals.
  expect(FigurativeLanguageMatcherWidgetConfigSchema.parse({pairs:[
    {id:' flash ',phrase:' fast   as lightning ',kind:'simile',meaning:' very fast '},
    {id:' cake ',phrase:' piece of cake ',kind:'idiom',meaning:' easy '},
  ]})).toEqual({pairs});
  const invalid=[
    {pairs:[pairs[0]]},
    {pairs:[pairs[0],{...pairs[1],id:' flash '}]},
    {pairs:[pairs[0],{...pairs[1],phrase:' FAST AS LIGHTNING '}]},
    {pairs:[pairs[0],{...pairs[1],meaning:' VERY FAST '}]},
    {pairs:[{...pairs[0],id:'0'},pairs[1]]},
    {pairs:[{...pairs[0],id:'4294967294'},pairs[1]]},
    {pairs:[{...pairs[0],phrase:'   '},pairs[1]]},
    {pairs:[{...pairs[0],kind:'hyperbole'},pairs[1]]},
  ];
  for(const value of invalid)expect(FigurativeLanguageMatcherWidgetConfigSchema.safeParse(value).success).toBe(false);
});
