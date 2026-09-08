import {render,screen,within,cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {afterEach,expect,test,vi} from 'vitest';
import {lessonsByUnit} from '../../content/reading';
import WordRootBuilder from './WordRootBuilder';
import ContextClueDetective from './ContextClueDetective';
import StoryElementsMapper from './StoryElementsMapper';
import ThemeEvidenceCollector from './ThemeEvidenceCollector';
import CentralIdeaOrganizer from './CentralIdeaOrganizer';
import SummaryBuilder from './SummaryBuilder';
import TextStructureSorter from './TextStructureSorter';
import PovSwitcher from './PovSwitcher';
import FigurativeLanguageMatcher from './FigurativeLanguageMatcher';
import SourceCredibilityChecker from './SourceCredibilityChecker';
import PhrasePathfinder from './PhrasePathfinder';
import ReadingWorkshop from './ReadingWorkshop';
import type {WidgetRef} from '../../content/schema';

afterEach(cleanup);
const components={
  'word-root-builder':WordRootBuilder,'context-clue-detective':ContextClueDetective,
  'story-elements-mapper':StoryElementsMapper,'theme-evidence-collector':ThemeEvidenceCollector,
  'central-idea-organizer':CentralIdeaOrganizer,'summary-builder':SummaryBuilder,
  'text-structure-sorter':TextStructureSorter,'pov-switcher':PovSwitcher,
  'figurative-language-matcher':FigurativeLanguageMatcher,'source-credibility-checker':SourceCredibilityChecker,
  'phrase-pathfinder':PhrasePathfinder,
  'reading-workshop':ReadingWorkshop,
};
const placements=Object.values(lessonsByUnit).flat().flatMap(lesson=>lesson.learnCards.flatMap(card=>card.widget?[{cardId:card.id,widget:card.widget}]:[]));
function activity(type:WidgetRef['type']) {return placements.find(item=>item.widget.type===type)!.widget;}
function mount(type:keyof typeof components,onEvent=vi.fn()) {
  const Component=components[type] as React.ComponentType<{config:never;onEvent:typeof onEvent}>;
  return {onEvent,...render(<Component config={activity(type).config as never} onEvent={onEvent}/>)};
}

test.each(placements)('$cardId keeps the source/work surface separate from a neutral task flow',({widget})=>{
  const {container}=mount(widget.type as keyof typeof components);
  expect(container.querySelector('.activity-shell')).toBeInTheDocument();
  expect(container.querySelector('.activity-workbench-visual')).toBeInTheDocument();
  expect(container.querySelector('.activity-workbench-tasks')).toBeInTheDocument();
  expect(screen.queryByText(/needs revision|try again|correct|all matched|summary ready/i,{selector:'strong'})).not.toBeInTheDocument();
});

test('word spelling feedback survives a wrong meaning check',async()=>{
 const user=userEvent.setup();mount('word-root-builder');
 await user.click(screen.getByRole('button',{name:'Select prefix trans'}));
 await user.click(screen.getByRole('button',{name:'Check word'}));
 await user.click(screen.getByRole('button',{name:'Choose whole-word meaning: able to be carried'}));
 expect(screen.getByLabelText('Spelling feedback')).toHaveTextContent(/spelling fits/i);
 expect(screen.getByTestId('word-root-meaning-check')).toHaveAttribute('data-activity-reveal');
 expect(screen.getByLabelText('Meaning feedback')).toHaveTextContent(/try again|does not fit/i);
});

test('clue selection record survives classification feedback',async()=>{
 const user=userEvent.setup();mount('context-clue-detective');
 await user.click(screen.getByRole('button',{name:'Choose clue text: creatures that are active at night'}));
 await user.click(screen.getByRole('button',{name:'Choose example clue type'}));
 expect(screen.getByLabelText('Clue choice')).toHaveTextContent('creatures that are active at night');
 expect(screen.getByRole('button',{name:'Choose example clue type'}).closest('fieldset')).toHaveAttribute('data-activity-reveal');
 expect(screen.getByLabelText('Clue kind feedback')).toHaveTextContent(/try again|does not match/i);
});

test.each(['theme-evidence-collector','central-idea-organizer'] as const)('%s does not style keyed supports before a checked evidence set',async(type)=>{
 const user=userEvent.setup();const {container,onEvent}=mount(type);
 const claim=screen.getAllByRole('button',{name:type==='theme-evidence-collector'?/^Choose theme /:/^Choose main idea /})[0]!;
 await user.click(claim);
 expect(container.querySelector('[data-supports-theme], [data-supports-idea]')).not.toBeInTheDocument();
 const detail=screen.getAllByRole('button',{name:type==='theme-evidence-collector'?/^Toggle evidence /:/^Toggle detail /})[0]!;
 await user.click(detail);
 expect(onEvent.mock.calls.some(([event])=>event.type==='coach'&&event.cue==='milestone')).toBe(false);
 expect(screen.getByLabelText('Evidence feedback')).toHaveTextContent(/check/i);
});

test('summary reset requires a new submission and does not judge prose meaning',async()=>{
 const user=userEvent.setup();mount('summary-builder');
 const plan=async()=>{for(const text of ['Amina loses borrowed binoculars, searches carefully, and returns them.','Her honest choices show responsibility.','She retraces her route beside the marsh.']) await user.click(screen.getByRole('button',{name:`Toggle ${text}`}));};
 await plan();await user.click(screen.getByRole('button',{name:'Check summary plan'}));
 await user.type(screen.getByRole('textbox',{name:'Your summary'}),'one two three four five six seven eight');
 await user.click(screen.getByRole('button',{name:'Finish summary'}));
 await user.click(screen.getByRole('button',{name:'Start over'}));
 await plan();await user.click(screen.getByRole('button',{name:'Check summary plan'}));
 await user.type(screen.getByRole('textbox',{name:'Your summary'}),'one two three four five six seven eight');
 expect(screen.getByTestId('widget-summary-builder')).not.toHaveAttribute('data-state','complete');
 expect(screen.getByLabelText('Plan feedback')).toHaveTextContent(/plan/i);
 expect(screen.getByRole('textbox',{name:'Your summary'}).closest('.summary-composition')).toHaveAttribute('data-activity-reveal');
 expect(screen.getByText(/check only.*word range/i)).toBeVisible();
});

test('point of view requires a comparison after applying, retaining both texts and application feedback',async()=>{
 const user=userEvent.setup();const {onEvent}=mount('pov-switcher');
 expect(screen.getByText(/change third person to first person/i)).toBeVisible();
 await user.click(screen.getByRole('button',{name:'Select pronoun I'}));await user.click(screen.getByRole('button',{name:'Select pronoun my'}));
 expect(onEvent.mock.calls.some(([event])=>event.type==='coach'&&event.cue==='milestone')).toBe(false);
 await user.click(screen.getByRole('button',{name:'Apply point of view'}));
 expect(onEvent.mock.calls.some(([event])=>event.type==='complete')).toBe(false);
 await user.click(screen.getByRole('button',{name:'The event changed'}));
 expect(screen.getByLabelText('Rewrite feedback')).toHaveTextContent(/applied/i);
 expect(screen.getByRole('button',{name:'The event changed'}).closest('fieldset')).toHaveAttribute('data-activity-reveal');
 expect(screen.getByLabelText('Comparison feedback')).toHaveTextContent(/try again/i);
 await user.click(screen.getByRole('button',{name:'The narrator words changed; the event stayed the same'}));
 expect(onEvent.mock.calls.filter(([event])=>event.type==='complete')).toHaveLength(1);
 expect(screen.getByTestId('pov-source-passage')).toBeVisible();expect(screen.getByTestId('pov-rewritten-passage')).toBeVisible();
});

test('credibility shows raw records before commitment and never celebrates one unchecked reason',async()=>{
 const user=userEvent.setup();const {container,onEvent}=mount('source-credibility-checker');
 expect(container.querySelector('.credibility-reason-supports, .credibility-reason-concern')).not.toBeInTheDocument();
 await user.click(screen.getByRole('button',{name:'Rate Amazing Mosquito Facts credible for this question'}));
 await user.click(screen.getAllByRole('button',{name:/Select reason for Amazing Mosquito Facts:/})[0]!);
 expect(onEvent.mock.calls.some(([event])=>event.type==='coach'&&event.cue==='milestone')).toBe(false);
 expect(within(screen.getByRole('article',{name:'Record: Amazing Mosquito Facts'})).getByText('Kai Reed')).toBeVisible();
});

test('story mapping waits for a check before celebrating and uses a fixed causal path',async()=>{
 const user=userEvent.setup();const {onEvent}=mount('story-elements-mapper');
 await user.click(screen.getByRole('button',{name:'Place “Priya” in Character'}));
 expect(onEvent.mock.calls.some(([event])=>event.type==='coach'&&event.cue==='milestone')).toBe(false);
 expect(screen.queryByRole('button',{name:/Move Character later/})).not.toBeInTheDocument();
});

test('sorting feedback stays attached to each excerpt after working on another',async()=>{
 const user=userEvent.setup();mount('text-structure-sorter');
 await user.click(screen.getByRole('button',{name:'Select Loose boards created a tripping problem, so volunteers replaced them.'}));
 await user.click(screen.getByRole('button',{name:'Place selected excerpt in sequence'}));
 await user.click(screen.getByRole('button',{name:'Select First inspect the boards, next mark damage, and then make repairs.'}));
 await user.click(screen.getByRole('button',{name:'Place selected excerpt in sequence'}));
 expect(screen.getByLabelText('Placement feedback for repair')).toHaveTextContent(/try again/i);
 expect(screen.getByLabelText('Placement feedback for steps')).toHaveTextContent(/correct/i);
});

test('phrase outcomes remain visible and selection alone is neutral',async()=>{
 const user=userEvent.setup();mount('figurative-language-matcher');
 await user.click(screen.getByRole('button',{name:'Select phrase busy as a bee'}));
 expect(screen.getByLabelText('Match feedback for simile')).toHaveTextContent(/not matched/i);
 await user.click(screen.getByRole('button',{name:'Match metaphor'}));
 await user.click(screen.getByRole('button',{name:'Select phrase the market was a beehive'}));
 await user.click(screen.getByRole('button',{name:'Match metaphor'}));
 expect(screen.getByLabelText('Match feedback for simile')).toHaveTextContent(/try again/i);
 expect(screen.getByLabelText('Match feedback for metaphor')).toHaveTextContent(/correct/i);
});

test('summary coaching names the actual word-count check and credibility preparation does not give the judgment',()=>{
 const summary=Object.values(lessonsByUnit).flat().flatMap(lesson=>lesson.learnCards).filter(card=>card.widget?.type==='summary-builder');
 for(const card of summary)expect(card.widgetCoach?.reactions.complete.text).toMatch(/word count/i);
 const credibility=Object.values(lessonsByUnit).flat().flatMap(lesson=>lesson.learnCards).find(card=>card.widget?.type==='source-credibility-checker')!;
 expect(credibility.blocks.map(block=>block.text).join(' ')).not.toMatch(/B is the best fit/i);
});

test('repeated unchanged claim and placement do not trigger new coaching',async()=>{
 const user=userEvent.setup();const {onEvent,unmount}=mount('theme-evidence-collector');
 const claim=screen.getByRole('button',{name:'Choose theme Generosity strengthens a community'});
 await user.click(claim);onEvent.mockClear();await user.click(claim);
 expect(onEvent).not.toHaveBeenCalled();unmount();
 const sorter=mount('text-structure-sorter');
 await user.click(screen.getByRole('button',{name:'Select Loose boards created a tripping problem, so volunteers replaced them.'}));
 const bin=screen.getByRole('button',{name:'Place selected excerpt in sequence'});
 await user.click(bin);sorter.onEvent.mockClear();await user.click(bin);
 expect(sorter.onEvent).not.toHaveBeenCalled();
});

test('word builder begins with a changeable part instead of an inert root button',()=>{
 mount('word-root-builder');
 expect(screen.getAllByRole('button')[0]).toHaveAccessibleName('Select prefix trans');
});

test.each([
 ['central-idea-organizer','Choose main idea Salt marshes support wildlife and shorelines'],
 ['source-credibility-checker','Rate Amazing Mosquito Facts credible for this question'],
] as const)('%s ignores a repeated unchanged proposal',async(type,label)=>{
 const user=userEvent.setup();const {onEvent}=mount(type);const button=screen.getByRole('button',{name:label});
 await user.click(button);onEvent.mockClear();await user.click(button);expect(onEvent).not.toHaveBeenCalled();
});

test('credibility asks for a proposed judgment before reason stamps',()=>{
 mount('source-credibility-checker');
 expect(screen.getAllByRole('button')[0]).toHaveAccessibleName('Rate Amazing Mosquito Facts credible for this question');
});

test('a detail contradicted by its source is rejected even when it echoes the proposed idea',async()=>{
 const user=userEvent.setup();const {onEvent}=mount('central-idea-organizer');
 await user.click(screen.getByRole('button',{name:'Choose main idea Every wet place is a salt marsh'}));
 await user.click(screen.getByRole('button',{name:/Toggle detail Any place with rainwater is a salt marsh/}));
 expect(screen.getByLabelText('Evidence feedback')).not.toHaveTextContent(/contradicts/i);
 await user.click(screen.getByRole('button',{name:'Check evidence'}));
 expect(screen.getByLabelText('Evidence feedback')).toHaveTextContent(/source quote contradicts/i);
 expect(onEvent.mock.calls.some(([event])=>event.type==='complete')).toBe(false);
});
