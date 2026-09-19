import type { Subject, WidgetRef } from '../content/schema';
import { widgetSpeechText } from '../widgets/widgetSpeechText';
import { readingSources } from '../widgets/reading/workshop/sources';
import type { InlineActivity, InlineLesson, InlineSource } from './inline-context.mjs';

// Explicit projections only: widget configs contain hidden assessment relationships.
function sourceFor(widget: WidgetRef): InlineSource | undefined {
  switch (widget.type) {
    case 'reading-workshop': return readingSources[widget.config.activity];
    case 'story-elements-mapper':
    case 'theme-evidence-collector':
    case 'central-idea-organizer': return widget.config.source;
    case 'phrase-pathfinder': return {title:widget.config.title, text:widget.config.source};
    case 'context-clue-detective':
    case 'pov-switcher': return {title:'Practice passage', text:widget.config.passage};
    case 'summary-builder': return {title:'Source sentences', text:widget.config.sourceSentences.map(item => item.text).join(' ')};
    case 'text-structure-sorter': return {title:'Source excerpts', text:widget.config.excerpts.map(item => item.text).join('\n\n')};
    case 'history-timeline':
    case 'history-map':
    case 'history-evidence-board':
    case 'history-cause-effect': return {title:widget.config.title, text:widget.config.sources.map(source => `${source.title}\n\n${source.text}\n\n${source.attribution}`).join('\n\n')};
    default: return undefined;
  }
}

function activityFor(widget: WidgetRef): InlineActivity {
  const activity: InlineActivity = {type:widget.type, materials:widgetSpeechText(widget)};
  switch (widget.type) {
    case 'place-value-builder':
      return {...activity, stateKind:'number', target:widget.config.target, columns:widget.config.periods === 3 ? 9 : 6};
    case 'theme-evidence-collector':
      return {...activity, stateKind:'theme', themeChoices:widget.config.themeChoices, evidence:widget.config.evidence.map(item => ({id:item.id,quote:item.sourceQuote ?? item.text}))};
    case 'history-timeline': return {...activity, stateKind:'placements',
      items:widget.config.events.map(item => ({id:item.id,label:`${item.year}: ${item.title}`})),
      locations:widget.config.events.map((_, index) => ({id:`position-${index + 1}`,label:`Position ${index + 1} (earliest to latest)`}))};
    case 'history-map': return {...activity, stateKind:'placements',
      items:widget.config.cards.map(item => ({id:item.id,label:item.text})),
      locations:widget.config.locations.map(item => ({id:item.id,label:item.label}))};
    case 'history-evidence-board': return {...activity, stateKind:'placements',
      items:widget.config.cards.map(item => ({id:item.id,label:item.text})),
      locations:widget.config.headings.map(item => ({id:item.id,label:item.label}))};
    case 'history-cause-effect': return {...activity, stateKind:'placements',
      items:widget.config.effects.map(item => ({id:item.id,label:item.text})),
      locations:widget.config.causes.map(item => ({id:item.id,label:item.text}))};
    default: return activity;
  }
}

/** Shared by generation and parity tests; never ships raw curriculum to the gateway. */
export function projectInlineLessons(subjects: Subject[]): InlineLesson[] {
  return subjects.flatMap(subject => subject.units.flatMap(unit => unit.lessons.map(lesson => {
    const cards = lesson.learnCards.map(card => ({
      key:`card:${card.id}`, title:card.title, text:card.blocks.map(block => block.text),
      ...(card.widget ? {activity:activityFor(card.widget), source:sourceFor(card.widget)} : {}),
    }));
    const sources = [...new Map(cards.flatMap(card => card.source ? [[JSON.stringify(card.source), card.source] as const] : [])).values()];
    // Carry a passage between steps only when the activity and worked example
    // share it. A workshop may teach with a different story from the lesson.
    const source = subject.id === 'reading' && sources.length === 1 && sources[0].text === lesson.workedExample.passage?.text ? sources[0] : null;
    const reflection = subject.id === 'social-studies'
      ? lesson.learnCards.find(card => card.widgetCoach)?.widgetCoach?.reactions.complete.text
      : undefined;
    return {
      id:lesson.id, title:lesson.title, subject:subject.title,
      overview:lesson.learnCards.flatMap(card => [card.title, ...card.blocks.map(block => block.text)]),
      guide:{id:subject.guide, name:subject.guide[0].toUpperCase() + subject.guide.slice(1)}, source,
      stages:[
        {key:'intro', title:'Meet the big idea', text:lesson.intro.map(line => line.text)},
        ...cards,
        {key:'worked', title:lesson.workedExample.title, text:lesson.workedExample.steps, source:lesson.workedExample.passage},
        {key:'outro', title:'Reflect on what you learned', text:[...(reflection ? [reflection] : []), 'Summarize the main idea and one strategy from this lesson. Invite the learner to explain it in their own words. The scored Quick Check is separate.']},
      ],
    };
  })));
}
