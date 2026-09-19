import {fireEvent,render,screen,within} from '@testing-library/react';
import {expect,test,vi} from 'vitest';
import MathWorkshop from '../MathWorkshop';
import {mathWorkshopActivities} from '../../../content/math/workshopActivities';
const click=(name:string)=>fireEvent.click(screen.getByRole('button',{name}));
const fill=(label:string,value:string)=>fireEvent.change(screen.getByLabelText(label),{target:{value}});

test('a matching partial machine test never sends retry coaching; a real mismatch does',()=>{
 const events=vi.fn();render(<MathWorkshop config={{activity:'acorn-rule-machine'}} onEvent={events}/>);
 fill('Machine rule','times6');click('Send 2 bags');
 expect(events.mock.calls.filter(([event])=>event.type==='coach').slice(-1)[0]?.[0].cue).not.toBe('retry');
 click('Send 4 bags');expect(events.mock.calls.filter(([event])=>event.type==='coach').slice(-1)[0]?.[0].cue).not.toBe('retry');
 expect(screen.queryByLabelText('Seeds for 5 bags')).not.toBeInTheDocument();
 fill('Machine rule','times4');click('Send 2 bags');expect(events.mock.calls.filter(([event])=>event.type==='coach').slice(-1)[0]?.[0].cue).toBe('retry');
 expect(screen.getByText(/does not fit this recorded row/)).toBeInTheDocument();
});
test('shared coaching does not claim a later phase is already reached',()=>{
 const acorn=mathWorkshopActivities.find(a=>a.config.activity==='acorn-rule-machine')!;
 expect(acorn.coach.reactions?.milestone?.text).not.toMatch(/Now use the same rule in both directions/);
 const graph=mathWorkshopActivities.find(a=>a.config.activity==='graph-detective')!;
 expect(graph.coach.reactions?.milestone?.text).not.toMatch(/eighth/);
});
test('unequal fence allocations leave the unused supply on the reel',()=>{
 render(<MathWorkshop config={{activity:'fence-the-garden'}} onEvent={vi.fn()}/>);
 click('Fence top with 11 m');click('Fence bottom with 11 m');fill('Left fence meters','3');fill('Right fence meters','9');click('Allocate widths');
 expect(screen.getByText('Fence left on the reel: 12 one-meter segments.')).toBeInTheDocument();
 expect(screen.getByRole('img',{name:/Garden model/})).toHaveAccessibleName(/left allocation 0, right allocation 0/);
 fill('Left fence meters','6');fill('Right fence meters','6');click('Allocate widths');expect(screen.getByText('Fence left on the reel: 0 one-meter segments.')).toBeInTheDocument();
 fill('Width in meters','3');const drawing=screen.getByRole('img',{name:/Garden model/});expect(drawing.querySelectorAll('line')).toHaveLength(34);expect(drawing).toHaveAccessibleName(/drawn width 6 meters/);
});
test('fourths start as loose pieces without a prebundled total or result point',()=>{
 render(<MathWorkshop config={{activity:'bundle-the-fourths'}} onEvent={vi.fn()}/>);
 expect(screen.getByRole('img',{name:'13 loose fourth-size tiles'})).toBeInTheDocument();
 expect(screen.queryByRole('img',{name:'13 quarter-size pieces in 4 equal whole frames'})).not.toBeInTheDocument();
 expect(screen.queryByRole('img',{name:/Position of the built amount/})).not.toBeInTheDocument();
 click('Make a whole');expect(screen.getByRole('img',{name:'13 loose fourth-size tiles'})).toBeInTheDocument();
 fill('Prediction','3-4');click('Commit prediction');click('Make a whole');expect(screen.getByRole('img',{name:'4 quarter-size pieces in 4 equal whole frames'})).toBeInTheDocument();
 expect(screen.queryByRole('img',{name:/Position of the built amount/})).not.toBeInTheDocument();
 click('Make a whole');click('Make a whole');fill('Whole groups','3');fill('Leftover numerator','1');fill('Mixed denominator','4');fill('Fraction numerator','13');fill('Fraction denominator','4');click('Check both names');
 expect(screen.getByRole('img',{name:/Position of the built amount/})).toBeInTheDocument();
});
test('a valid prediction replaces the earlier blank-commit error',()=>{
 render(<MathWorkshop config={{activity:'estimate-checkpoint'}} onEvent={vi.fn()}/>);
 click('Commit prediction');expect(screen.getByText('Choose an idea first.')).toBeInTheDocument();fill('Prediction','too-large');click('Commit prediction');expect(screen.queryByText('Choose an idea first.')).not.toBeInTheDocument();expect(screen.getByText(/Your prediction: The claim seems too large/)).toBeInTheDocument();
});
test('bird bars use a common one-bird SVG interval and exact 18-to-11 geometry',()=>{
 render(<MathWorkshop config={{activity:'graph-detective'}} onEvent={vi.fn()}/>);
 const source=screen.getByRole('region',{name:'Bird graph source'});
 const graph=within(source).getByRole('img',{name:/Robin 18 birds and Wren 11 birds/});
 const bars=graph.querySelectorAll('rect[data-bird-count]');expect(bars).toHaveLength(2);
 const [robin,wren]=[...bars].map(node=>Number(node.getAttribute('width')));expect(robin/wren).toBeCloseTo(18/11,12);
 const ticks=[...graph.querySelectorAll('line[data-bird-tick]')].map(node=>Number(node.getAttribute('x1')));expect(ticks).toHaveLength(21);const step=ticks[1]-ticks[0];expect(robin).toBe(18*step);expect(wren).toBe(11*step);for(let i=1;i<ticks.length;i++)expect(ticks[i]-ticks[i-1]).toBe(step);
});
