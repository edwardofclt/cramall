import { fireEvent,render,screen,within } from '@testing-library/react';
import { expect,test,vi } from 'vitest';
import ReadingWorkshop from '../ReadingWorkshop';
import { readingWorkshopActivities } from '../../../content/reading/workshopActivities';
import { walkthroughs } from './walkthroughs';
import type { Activity,Draft } from './types';
function fill(values:Draft) {
 const task=screen.getByRole('group',{name:/^Current task:/});
 for(const [id,value] of Object.entries(values)) {
  const field=within(task).getByTestId(`field-${id}`);
  if(Array.isArray(value))for(const key of value)fireEvent.click(field.querySelector<HTMLElement>(`[data-option="${key}"]`)!);
  else if(field.matches('input,select'))fireEvent.change(field,{target:{value}});
  else fireEvent.click(field.querySelector<HTMLElement>(`[data-option="${value}"]`)!);
 }
}
const cases:{activity:Activity;phase:number;values:Draft;cue:'retry'|'milestone';forbidden:RegExp}[]=[
 {activity:'question-compass',phase:0,values:{topic:'corner',need:'setup'},cue:'milestone',forbidden:/does not provide|another source/},
 {activity:'word-desk',phase:1,values:{reference:'glossary',field:'meaning',definition:'muddy',context:'coast'},cue:'retry',forbidden:/money|beside this creek/},
 {activity:'literal-and-vivid',phase:1,values:{literal:'cut',context:'quiet',effect:'cut'},cue:'retry',forbidden:/insects|stomach/},
 {activity:'source-credit',phase:1,values:{author:'moss',title:'shelf',publisher:'practice',year:'2025'},cue:'retry',forbidden:/quotation begins|quotation ends|exact words/}
];
for(const c of cases)test(`${c.activity} phase ${c.phase+1}: shared coach does not misdiagnose a different task`,()=>{
 const onEvent=vi.fn();render(<ReadingWorkshop config={{activity:c.activity}} onEvent={onEvent}/>);
 const path=walkthroughs.find(w=>w.activity===c.activity)!;
 for(let i=0;i<c.phase;i++){fill(path.phases[i]);fireEvent.click(screen.getByRole('button',{name:'Check this connection'}));fireEvent.click(screen.getByRole('button',{name:'Continue building'}));}
 fill(c.values);fireEvent.click(screen.getByRole('button',{name:'Check this connection'}));
 const lastCue=onEvent.mock.calls.map(([e])=>e).filter(e=>e.type==='coach').slice(-1)[0];
 expect(lastCue?.cue).toBe(c.cue);
 const coach=readingWorkshopActivities.find(a=>a.config.activity===c.activity)!.coach;
 expect(coach.reactions[c.cue]?.text).not.toMatch(c.forbidden);
});
