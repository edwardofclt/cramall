import { fireEvent, render, screen, within } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import ReadingWorkshop from '../ReadingWorkshop';
import { walkthroughs } from './walkthroughs';
import { readingSources } from './sources';

function fill(values: Record<string,string|string[]>) {
 const phase=screen.getByRole('group',{name:/^Current task:/});
 for(const [id,value] of Object.entries(values)) {
  const field=within(phase).getByTestId(`field-${id}`);
  if(Array.isArray(value)) for(const key of value) fireEvent.click(field.querySelector<HTMLElement>(`[data-option="${key}"]`)!) ;
  else if(field.matches('input')) fireEvent.change(field,{target:{value}});
  else if(field.matches('select')) fireEvent.change(field,{target:{value}});
  else fireEvent.click(field.querySelector<HTMLElement>(`[data-option="${value}"]`)!);
 }
}
for(const path of walkthroughs) test(`${path.activity}: wrong path, complete source-linked loop, retained feedback, reopened-phase invalidation, reset`,()=>{
 const onEvent=vi.fn(); render(<ReadingWorkshop config={{activity:path.activity}} onEvent={onEvent}/>);
 const source=screen.getByRole('region',{name:'Complete source packet'});
 expect(source.textContent).toContain(readingSources[path.activity].text);
 fireEvent.click(screen.getByRole('button',{name:'Check this connection'}));
 expect(screen.getByLabelText('Task 1 feedback')).toHaveTextContent('Revisit');
 expect(onEvent).not.toHaveBeenCalledWith(expect.objectContaining({type:'complete'}));
 for(let i=0;i<path.phases.length;i++) {
  fill(path.phases[i]); fireEvent.click(screen.getByRole('button',{name:'Check this connection'}));
  expect(screen.getByLabelText(`Task ${i+1} feedback`)).toHaveTextContent('Connected');
  if(i<path.phases.length-1) fireEvent.click(screen.getByRole('button',{name:'Continue building'}));
 }
 expect(screen.getByLabelText('Task 1 feedback')).toHaveTextContent('Revisit');
 expect(screen.getByRole('status',{name:'Activity completion'})).toHaveTextContent('Practice complete');
 expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1);
 fireEvent.click(screen.getByRole('button',{name:'Check this connection'}));
 expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1);
 fireEvent.click(screen.getByRole('button',{name:'Reopen task 1'}));
 const firstId=Object.keys(path.phases[0])[0]; const original=path.phases[0][firstId];
 const field=screen.getByTestId(`field-${firstId}`);
 if(Array.isArray(original)) fireEvent.click(field.querySelector<HTMLElement>(`[data-option="${original[0]}"]`)!);
 else if(field.matches('select')||field.matches('input')) fireEvent.change(field,{target:{value:''}});
 else fireEvent.click(field.querySelector<HTMLElement>(`[data-option="${original}"]`)!);
 expect(screen.getByRole('status',{name:'Activity completion'})).not.toHaveTextContent('Practice complete');
 expect(screen.getByLabelText(`Task ${path.phases.length} feedback`)).toHaveTextContent('Earlier draft');
 expect(source.textContent).toContain(readingSources[path.activity].text);
 fireEvent.click(screen.getByRole('button',{name:'Reset workshop'}));
 expect(screen.queryByLabelText('Task 1 feedback')).not.toBeInTheDocument();
 expect(screen.getByRole('group',{name:/^Current task:/})).toBeInTheDocument();
 for(let i=0;i<path.phases.length;i++) {fill(path.phases[i]);fireEvent.click(screen.getByRole('button',{name:'Check this connection'}));if(i<path.phases.length-1)fireEvent.click(screen.getByRole('button',{name:'Continue building'}));}
 expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(2);
});

const commit = () => fireEvent.click(screen.getByRole('button',{name:'Check this connection'}));
const next = () => fireEvent.click(screen.getByRole('button',{name:'Continue building'}));
const start = (activity:typeof walkthroughs[number]['activity']) => render(<ReadingWorkshop config={{activity}} onEvent={vi.fn()}/>);
const fillAndContinue=(values:Record<string,string|string[]>)=>{fill(values);commit();next();};

test('voice plans support surprise, excitement, relief and gentle disbelief with unchanged source punctuation',()=>{
 start('direct-the-reading');
 fill({line:'relief',clue:'relief',emphasis:'last',pause:'inside',tone:'loud'});commit();
 expect(screen.getByLabelText('Task 1 feedback')).toHaveTextContent('Leo whispers');
 fill({tone:'gentle'});commit();
 expect(screen.getByLabelText('Task 1 feedback')).toHaveTextContent('Connected');next();
 fill({line:'relief',clue:'relief',emphasis:'last',pause:'end',tone:'relief'});commit();
 expect(screen.queryByRole('button',{name:'Continue building'})).not.toBeInTheDocument();
 fill({line:'question',clue:'question',emphasis:'kite',tone:'surprise'});commit();next();
 fill({comparison:'clues',reflection:'revise'});commit();
 expect(screen.getByRole('status',{name:'Activity completion'})).toHaveTextContent('Practice complete');
 expect(screen.getByRole('region',{name:'Complete source packet'}).textContent).toContain('“At last,” he whispered.');
 expect(screen.queryByRole('button',{name:/record|play audio/i})).not.toBeInTheDocument();
});

test('word substitutions change a separate notebook; both local reference views retain identical entries and order',()=>{
 start('word-desk');fill({...walkthroughs[1].phases[0],definition:'money'});commit();
 const notebook=screen.getByRole('region',{name:'Word notebook'});
 expect(notebook).toHaveTextContent('We rested on the a business that keeps and lends money beside the creek.');
 expect(screen.getByLabelText('Task 1 feedback')).toHaveTextContent('Does a business');
 const entry=notebook.querySelector('.rw-entry-page')!.textContent;
 fireEvent.click(screen.getByRole('button',{name:'Search view'}));
 expect(notebook.querySelector('.rw-entry-search')!.textContent).toBe(entry);
 fill({definition:'land'});commit();next();fill(walkthroughs[1].phases[1]);commit();
 expect(notebook).toHaveTextContent('slightly salty');
 expect(screen.getByRole('region',{name:'Complete source packet'})).toHaveTextContent('bank beside the creek');
});

test('weather renders real table/map parity and rejects treating described sound as an exact ratio',()=>{
 start('connect-weather-report');
 const display=screen.getByRole('region',{name:'Garden Rain Watch displays'});
 expect(within(display).getByRole('img')).toHaveAccessibleName(/West 0.9 inch; East 0.4 inch/);
 expect(within(display).getByRole('row',{name:'8 a.m. 0.3 0.0'})).toBeInTheDocument();
 expect(within(display).getByRole('row',{name:'noon 0.9 0.4'})).toBeInTheDocument();
 fillAndContinue(walkthroughs[2].phases[0]);fillAndContinue(walkthroughs[2].phases[1]);
 fill({...walkthroughs[2].phases[2],contribution:'heard'});commit();
 expect(screen.getByLabelText('Task 3 feedback')).toHaveTextContent('A transcript describes sound');
 fill({contribution:'experience'});commit();next();
 fill({...walkthroughs[2].phases[3],limit:'noon'});commit();
 expect(screen.getByRole('status',{name:'Activity completion'})).not.toHaveTextContent('Practice complete');
 fill({limit:'no-ratio'});commit();
 expect(display).toHaveTextContent('At the east garden, I heard softer tapping.');
});

test('author evidence stays attributed and text highlights reflect the learner selection',()=>{
 start('authors-lens');fill({phrases:['belief','topic'],perspective:'supports',purpose:'topic'});commit();
 expect(screen.queryByRole('button',{name:'Continue building'})).not.toBeInTheDocument();
 const source=screen.getByRole('region',{name:'Complete source packet'});
 expect(source.querySelector('mark')).toHaveTextContent('I believe');
 fill({phrases:['topic','request'],purpose:'persuade'});commit();next();
 fill({...walkthroughs[3].phases[1],phrases:['belief','sites']});commit();
 expect(screen.queryByRole('button',{name:'Continue building'})).not.toBeInTheDocument();
 fill({phrases:['belief','planning']});commit();
 expect(screen.getByLabelText('Task 2 feedback')).toHaveTextContent('Connected');
 expect(screen.getByRole('region',{name:'Source connection board'})).toHaveTextContent('Please ask the school council');
});

test('support chain rejects swapped log/count evidence, causation, and treating maintenance as decoration',()=>{
 start('support-chain');fillAndContinue(walkthroughs[4].phases[0]);
 fill({...walkthroughs[4].phases[1],evidence:'84',limit:'proved'});commit();
 expect(screen.queryByRole('button',{name:'Continue building'})).not.toBeInTheDocument();
 fill({evidence:'counts',limit:'different'});commit();next();
 fill({decoration:'aside',condition:'aside'});commit();
 expect(screen.queryByRole('button',{name:'Continue building'})).not.toBeInTheDocument();
 fill({condition:'care'});commit();
 expect(screen.getByRole('region',{name:'Source connection board'})).toHaveTextContent('The weeks differed');
});

test('perspective chains reject invented motives and retain the precise turning point',()=>{
 start('two-views-one-event');fillAndContinue(walkthroughs[5].phases[0]);
 fill({...walkthroughs[5].phases[1],view:'dislike',turn:'smile'});commit();
 expect(screen.queryByRole('button',{name:'Continue building'})).not.toBeInTheDocument();
 fill({view:'relieved',turn:'relieved'});commit();next();
 fill(walkthroughs[5].phases[2]);commit();
 expect(screen.getByRole('region',{name:'Source connection board'})).toHaveTextContent("I'm relieved about the rain, not happy that you're disappointed.");
});

test('forms preserve stanza/line whitespace and keep selected versions simultaneously present',()=>{
 start('one-moment-three-forms');fillAndContinue(walkthroughs[6].phases[0]);
 fill({...walkthroughs[6].phases[1],speaker:'poem'});commit();
 expect(screen.getByLabelText('Task 2 feedback')).toHaveTextContent('performance text');
 fill({speaker:'drama'});commit();next();fill({pair:'narrative-poem',contrast:'compressed'});commit();
 const pair=screen.getByLabelText('Two forms side by side');
 expect(pair).toHaveTextContent('June found a red mitten');
 expect(pair.textContent).toContain('Under the bench,  \none red mitten waits—  \na small warm promise.\n\nA searching boy,');
 expect(screen.getByRole('status',{name:'Activity completion'})).toHaveTextContent('Practice complete');
});

test('literal preview changes after a commitment while original stays immutable; anticipation is supported',()=>{
 start('literal-and-vivid');const source=screen.getByRole('region',{name:'Complete source packet'});const before=source.textContent;
 fill({...walkthroughs[7].phases[0],literal:'insects'});commit();
 expect(screen.getByLabelText('Task 1 feedback')).toHaveTextContent('actual insects');
 fill({literal:'nervous',effect:'anticipation'});commit();
 expect(screen.getByRole('region',{name:'Literal comparison copy'})).toHaveTextContent('At the starting line, Noah felt nervous.');
 expect(source.textContent).toBe(before);next();fill(walkthroughs[7].phases[1]);commit();
 expect(screen.getByRole('region',{name:'Literal comparison copy'})).toHaveTextContent('the whistle suddenly interrupted the quiet');
 expect(source.textContent).toBe(before);
});

test('revised inquiry rejects old book-choice findings and accepts paths plus care without a second completion event',()=>{
 const onEvent=vi.fn();render(<ReadingWorkshop config={{activity:'question-compass'}} onEvent={onEvent}/>);
 fillAndContinue(walkthroughs[8].phases[0]);fillAndContinue(walkthroughs[8].phases[1]);fill(walkthroughs[8].phases[2]);commit();
 fireEvent.click(screen.getByRole('button',{name:'Reopen task 1'}));fill({need:'ready'});commit();next();commit();
 expect(screen.queryByRole('button',{name:'Continue building'})).not.toBeInTheDocument();
 expect(screen.getByLabelText('Task 2 feedback')).toHaveTextContent('current question');
 fill({heading2:'care',finding2:'routine'});commit();next();commit();
 expect(screen.getByRole('status',{name:'Activity completion'})).toHaveTextContent('Practice complete');
 expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1);
});

test('research folder physically moves notes and distinguishes investigation from action and appearance transfer',()=>{
 start('research-folder');const folders=screen.getByRole('region',{name:'Research folders'});
 fill({...walkthroughs[9].phases[0],D:'action'});commit();
 expect(screen.getByLabelText('Task 1 feedback')).toHaveTextContent('not proof');
 fill({D:'investigation'});commit();next();fillAndContinue(walkthroughs[9].phases[1]);
 fill({B:'outside',reason:'question'});commit();
 expect(screen.getByRole('status',{name:'Activity completion'})).not.toHaveTextContent('Practice complete');
 fill({B:'helps'});commit();
 expect(folders).toHaveTextContent('Appearance question · Connected');
 expect(folders).toHaveTextContent('Helps answer — investigation');
});

test('clusters accept arbitrary folder order, prevent duplicated notes and preserve optional ungraded cross-links',()=>{
 start('research-clusters');fill({label1:'sharing',label2:'finding',label3:'caring',F:'one',D:'two',E:'three',A:'two',C:'one',B:'three'});commit();next();
 fill({one:'sharing',two:'finding',three:'caring'});commit();next();
 const clusters=screen.getByRole('region',{name:'Research clusters'});
 expect(within(clusters).getAllByText(/Story, poetry, and information labels help/)).toHaveLength(1);
 fireEvent.change(screen.getByRole('textbox',{name:'Optional own-word category label'}),{target:{value:'My book groups'}});
 fireEvent.change(screen.getByRole('textbox',{name:'Optional secondary connection'}),{target:{value:'Recommendations can also help someone find a book.'}});
 fill({reason:'ideas'});commit();
 expect(clusters).toHaveTextContent('Secondary connection retained');
 expect(screen.getByRole('status',{name:'Activity completion'})).toHaveTextContent('Practice complete');
});

test('citation requires exact quote boundaries, real supplied metadata and source credit even for the faithful paraphrase',()=>{
 start('source-credit');fill({quotation:'“Labels need checking.”',attribution:'moss'});commit();
 expect(screen.queryByRole('button',{name:'Continue building'})).not.toBeInTheDocument();
 fill({quotation:'"Labels need checking when books move."'});commit();next();
 fill({...walkthroughs[11].phases[1],year:'2025'});commit();
 expect(screen.getByLabelText('Task 2 feedback')).toHaveTextContent('four supplied');
 fill({year:'2026'});commit();next();fill({...walkthroughs[11].phases[2],draft:'B'});commit();
 expect(screen.getByRole('status',{name:'Activity completion'})).not.toHaveTextContent('Practice complete');
 fill({draft:'A',credit:'no'});commit();
 expect(screen.getByRole('status',{name:'Activity completion'})).not.toHaveTextContent('Practice complete');
 fill({credit:'yes'});commit();
 expect(screen.getByRole('region',{name:'Source credit drafts'})).toHaveTextContent('Lena Moss — A Shelf for Every Reader — Cram All Practice Library — 2026');
});

test('R8 cannot finish from a blank final comparison after both earlier tasks are connected',()=>{
 const onEvent=vi.fn();render(<ReadingWorkshop config={{activity:'one-moment-three-forms'}} onEvent={onEvent}/>);
 fillAndContinue(walkthroughs[6].phases[0]);fillAndContinue(walkthroughs[6].phases[1]);commit();
 expect(screen.getByRole('status',{name:'Activity completion'})).not.toHaveTextContent('Practice complete');
 expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(0);
 expect(screen.getByLabelText('Task 3 feedback')).toHaveTextContent('Revisit');
 fill({pair:'narrative-poem'});commit();
 expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(0);
 fill({contrast:'compressed'});commit();
 expect(onEvent.mock.calls.filter(([e])=>e.type==='complete')).toHaveLength(1);
});

test('R12 labels old synthesis locally after completed folders are rearranged and task 1 is rechecked',()=>{
 start('research-clusters');fillAndContinue(walkthroughs[10].phases[0]);fillAndContinue(walkthroughs[10].phases[1]);fill(walkthroughs[10].phases[2]);commit();
 fireEvent.click(screen.getByRole('button',{name:'Reopen task 1'}));
 fill({label1:'caring',label2:'finding',A:'two',D:'two',B:'one',E:'one'});commit();
 const surface=screen.getByRole('region',{name:'Research clusters'});
 const firstFolder=within(surface).getByRole('heading',{name:'Folder 1: Caring for books'}).closest('article')!;
 expect(firstFolder).toHaveTextContent('Earlier draft — recheck group statement');
 expect(firstFolder).toHaveTextContent('Labels and a title list help readers locate books.');
 expect(screen.getByRole('status',{name:'Activity completion'})).not.toHaveTextContent('Practice complete');
 next();fill({one:'caring',two:'finding'});commit();
 expect(firstFolder).toHaveTextContent('Connected group statement');
 expect(firstFolder).toHaveTextContent('Gentle handling and a dry return place help protect pages.');
 expect(firstFolder).not.toHaveTextContent('Earlier draft');
});
