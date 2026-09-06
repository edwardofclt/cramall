import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {expect,test,vi} from 'vitest';
import {PovSwitcherWidgetConfigSchema} from '../../content/schema';
import PovSwitcher,{rewritePassage} from './PovSwitcher';

const thirdToFirst={
  passage:'Ava carried Ava’s book.',
  from:'third' as const,
  target:'first' as const,
  pronounOptions:['I','my','she'],
  requiredPronouns:['I','my'] as [string,string],
};

test('applies the selected target forms to the complete visible source and completes once',async()=>{
  // Hard-coded output, hidden source text, selection-time completion, or a second completion must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<PovSwitcher config={thirdToFirst} onEvent={onEvent}/>);
  expect(screen.getByTestId('pov-source-passage')).toHaveTextContent('Ava carried Ava’s book.');

  await user.click(screen.getByRole('button',{name:'Select pronoun I'}));
  await user.click(screen.getByRole('button',{name:'Select pronoun my'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(0);
  onEvent.mockClear();

  await user.click(screen.getByRole('button',{name:'Apply point of view'}));
  expect(screen.getByRole('status')).toHaveTextContent(/reread both passages/i);
  expect(screen.getByTestId('pov-source-passage')).toBeVisible();
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'apply'},
    {type:'change',value:{selectedPronouns:['I','my']}},
    {type:'complete',value:{rewrittenText:'I carried my book.'}},
  ]);

  await user.click(screen.getByRole('button',{name:'Apply point of view'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
});

test('keeps a rewritten passage visible and prompts a post-rewrite meaning check',async()=>{
  const user=userEvent.setup();
  render(<PovSwitcher config={thirdToFirst} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Select pronoun I'}));
  await user.click(screen.getByRole('button',{name:'Select pronoun my'}));
  await user.click(screen.getByRole('button',{name:'Apply point of view'}));
  expect(screen.getByTestId('pov-source-passage')).toHaveTextContent('Ava carried Ava’s book.');
  expect(screen.getByTestId('pov-rewritten-passage')).toHaveTextContent('I carried my book.');
  expect(screen.getByRole('status')).toHaveTextContent(/reread both passages/i);
  expect(screen.getByRole('status')).toHaveTextContent(/event and meaning stay the same/i);
});

test('rewrites both directions at word boundaries while preserving punctuation and untouched text',()=>{
  // Reversing replacement order, matching substrings, or mishandling apostrophes/case must fail these literals.
  expect(rewritePassage("Ava packed Ava's atlas; Savannah waved.",'third',['I','my'])).toBe('I packed my atlas; Savannah waved.');
  expect(rewritePassage('Ava packed Ava’s atlas.','third',['I','my'])).toBe('I packed my atlas.');
  expect(rewritePassage('I packed my atlas; Mya waved.','first',['Ava','Ava’s'])).toBe('Ava packed Ava’s atlas; Mya waved.');
  expect(rewritePassage('I said MY label was beside my atlas.','first',['Ava',"Ava's"])).toBe("Ava said Ava's label was beside Ava's atlas.");
  expect(rewritePassage('Ava thanked Ava and packed Ava’s atlas.','third',['I','my'])).toBe('Ava thanked Ava and packed Ava’s atlas.');
  expect(rewritePassage("I'm packing my atlas.",'first',['Ava',"Ava's"])).toBe("I'm packing my atlas.");
  expect(rewritePassage('I’m packing my atlas.','first',['Ava','Ava’s'])).toBe('I’m packing my atlas.');
  expect(rewritePassage('Léa packed Léa’s atlas.','third',['I','my'])).toBe('I packed my atlas.');
  expect(rewritePassage("José packed José's atlas.",'third',['I','my'])).toBe('I packed my atlas.');
});

test('keeps schema-valid canonical target forms selectable in the UI',async()=>{
  // Accepting canonically equivalent but non-selectable required options, or case-only mismatches, must fail this test.
  const parsed=PovSwitcherWidgetConfigSchema.parse({
    passage:'I packed my book.',from:'first',target:'third',
    pronounOptions:['Jose\u0301',"Jose\u0301's",'they'],requiredPronouns:['José',"José's"],
  });
  expect(parsed.pronounOptions.slice(0,2)).toEqual(['José',"José's"]);
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<PovSwitcher config={parsed} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Select pronoun José'}));
  await user.click(screen.getByRole('button',{name:"Select pronoun José's"}));
  await user.click(screen.getByRole('button',{name:'Apply point of view'}));
  expect(onEvent).toHaveBeenLastCalledWith({type:'complete',value:{rewrittenText:"José packed José's book."}});

  expect(PovSwitcherWidgetConfigSchema.safeParse({
    ...thirdToFirst,pronounOptions:['i','my','she'],requiredPronouns:['I','my'],
  }).success).toBe(false);
});

test('preserves authored passage whitespace and newlines byte for byte',()=>{
  // Trimming or collapsing the paired source passage must fail this fidelity test.
  const passage='Ava  carried\n  Ava’s book.';
  const parsed=PovSwitcherWidgetConfigSchema.parse({...thirdToFirst,passage});
  expect(parsed.passage).toBe(passage);
  expect(rewritePassage(parsed.passage,'third',['I','my'])).toBe('I  carried\n  my book.');
  expect(PovSwitcherWidgetConfigSchema.safeParse({...thirdToFirst,passage:' \n\t '}).success).toBe(false);
});

test('accepts Unicode-letter source names without weakening proper-name boundaries',()=>{
  // Falling back to ASCII-only names or accepting a name embedded in a longer word must fail this test.
  expect(PovSwitcherWidgetConfigSchema.safeParse({...thirdToFirst,passage:'Léa carried Léa’s book.'}).success).toBe(true);
  expect(PovSwitcherWidgetConfigSchema.safeParse({...thirdToFirst,passage:"José carried José's book."}).success).toBe(true);
  expect(PovSwitcherWidgetConfigSchema.safeParse({...thirdToFirst,passage:'Léanne carried Léa’s book.'}).success).toBe(false);
});

test('retains revisable choices in authored order with keyboard and non-color markers',async()=>{
  // Click-order payloads, inaccessible toggles, or color-only selection must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<PovSwitcher config={thirdToFirst} onEvent={onEvent}/>);
  const my=screen.getByRole('button',{name:'Select pronoun my'});
  my.focus();
  await user.keyboard('{Enter}');
  await user.click(screen.getByRole('button',{name:'Select pronoun I'}));
  expect(my).toHaveAttribute('aria-pressed','true');
  expect(my).toHaveTextContent('✓ Selected');
  expect(onEvent.mock.calls.map(([event])=>event)).toContainEqual({type:'interaction',action:'select-pronoun'});
  expect(onEvent.mock.calls.map(([event])=>event)).toContainEqual({type:'change',value:{selectedPronouns:['I','my']}});
});

test('gives bounded apply guidance and leaves completion view after a successful revision',async()=>{
  // Exposing the missing answer or leaving stale success visible after a revision must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<PovSwitcher config={thirdToFirst} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Select pronoun I'}));
  await user.click(screen.getByRole('button',{name:'Apply point of view'}));
  expect(screen.getByRole('status')).toHaveTextContent('Choose two target forms, then apply your rewrite.');
  expect(screen.getByRole('status')).not.toHaveTextContent('my');

  await user.click(screen.getByRole('button',{name:'Select pronoun my'}));
  await user.click(screen.getByRole('button',{name:'Apply point of view'}));
  expect(screen.getByTestId('widget-pov-switcher')).toHaveAttribute('data-state','complete');
  await user.click(screen.getByRole('button',{name:'Select pronoun my'}));
  expect(screen.getByTestId('widget-pov-switcher')).toHaveAttribute('data-state','revision');
  expect(screen.getByText('○ Needs revision')).toBeVisible();
});

test('emits ordered reset state without rearming the one-shot completion latch',async()=>{
  // A silent reset, stale choices, or completion re-emission after reset must fail this test.
  const onEvent=vi.fn(),user=userEvent.setup();
  render(<PovSwitcher config={thirdToFirst} onEvent={onEvent}/>);
  await user.click(screen.getByRole('button',{name:'Select pronoun I'}));
  await user.click(screen.getByRole('button',{name:'Select pronoun my'}));
  await user.click(screen.getByRole('button',{name:'Apply point of view'}));
  onEvent.mockClear();
  await user.click(screen.getByRole('button',{name:'Start over'}));
  expect(onEvent.mock.calls.map(([event])=>event)).toEqual([
    {type:'interaction',action:'reset'},
    {type:'change',value:{selectedPronouns:[]}},
  ]);
  expect(screen.getByRole('button',{name:'Select pronoun I'})).toHaveAttribute('aria-pressed','false');
  await user.click(screen.getByRole('button',{name:'Select pronoun I'}));
  await user.click(screen.getByRole('button',{name:'Select pronoun my'}));
  await user.click(screen.getByRole('button',{name:'Apply point of view'}));
  expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(0);
});

test('resets stale selection safely on the first render of a new config',async()=>{
  // Dereferencing prior options or retaining prior readiness across lesson navigation must fail this test.
  const user=userEvent.setup();
  const view=render(<PovSwitcher config={thirdToFirst} onEvent={vi.fn()}/>);
  await user.click(screen.getByRole('button',{name:'Select pronoun I'}));
  view.rerender(<PovSwitcher config={{
    passage:'I packed my book.',from:'first',target:'third',
    pronounOptions:['Lila','Lila’s','they'],requiredPronouns:['Lila','Lila’s'],
  }} onEvent={vi.fn()}/>);
  expect(screen.getByRole('button',{name:'Select pronoun Lila'})).toHaveAttribute('aria-pressed','false');
  expect(screen.getByTestId('widget-pov-switcher')).toHaveAttribute('data-state','choosing');
  expect(screen.getByRole('status')).toHaveTextContent('Choose two target forms');
});

test('normalizes target options and rejects ambiguous or grammatically unsafe transitions',()=>{
  // Duplicate normalized choices, malformed target pairs, or ambiguous source occurrences must fail this test.
  expect(PovSwitcherWidgetConfigSchema.parse({
    ...thirdToFirst,pronounOptions:[' I ',' my ',' she '],requiredPronouns:[' I ',' my '],
  })).toEqual(thirdToFirst);
  const invalid=[
    {...thirdToFirst,from:'first',target:'first'},
    {...thirdToFirst,pronounOptions:['I',' i ','my']},
    {...thirdToFirst,requiredPronouns:['I','I']},
    {...thirdToFirst,requiredPronouns:['I','ours']},
    {...thirdToFirst,requiredPronouns:['we','our'],pronounOptions:['we','our']},
    {...thirdToFirst,passage:'the child carried a book.'},
    {...thirdToFirst,passage:'At noon, Lila carried Lila’s book.'},
    {...thirdToFirst,passage:'Lila thanked Lila and carried Lila’s book.'},
    {...thirdToFirst,passage:'Lila ran.'},
    {passage:'I ran.',from:'first',target:'third',pronounOptions:['Lila','Lila’s'],requiredPronouns:['Lila','Lila’s']},
    {passage:'I packed my book.',from:'first',target:'third',pronounOptions:['Lila','her'],requiredPronouns:['Lila','her']},
    {passage:'I told myself I packed my book.',from:'first',target:'third',pronounOptions:['Lila','Lila’s'],requiredPronouns:['Lila','Lila’s']},
    {passage:"I'm carrying my book.",from:'first',target:'third',pronounOptions:['Lila','Lila’s'],requiredPronouns:['Lila','Lila’s']},
    {passage:'I’m carrying my book.',from:'first',target:'third',pronounOptions:['Lila','Lila’s'],requiredPronouns:['Lila','Lila’s']},
  ];
  for(const value of invalid)expect(PovSwitcherWidgetConfigSchema.safeParse(value).success).toBe(false);
});
