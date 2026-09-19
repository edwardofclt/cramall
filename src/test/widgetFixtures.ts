import { timelineConfig, mapConfig, evidenceConfig, causeConfig } from '../widgets/social-studies/history-fixtures';
import type { WidgetCoach, WidgetRef, WidgetType } from '../content/schema';
import { scaleReadingConfig } from '../content/math/activityPrototypes';
import { phrasePathfinderConfig } from '../content/reading/activityPrototypes';
import { deviceRetestConfig } from '../content/science/activityPrototypes';

type RefFor<T extends WidgetType> = Extract<WidgetRef, { type: T }>;

export const validWidgetRefByType = {
  'math-workshop': { type: 'math-workshop', config: { activity: 'estimate-checkpoint' } },
  'reading-workshop': { type: 'reading-workshop', config: { activity: 'direct-the-reading' } },
  'science-workshop': { type: 'science-workshop', config: { activity: 'receiver-changes' } },
  'history-timeline': { type: 'history-timeline', config: timelineConfig },
  'history-map': { type: 'history-map', config: mapConfig },
  'history-evidence-board': { type: 'history-evidence-board', config: evidenceConfig },
  'history-cause-effect': { type: 'history-cause-effect', config: causeConfig },
  'scale-reading': { type: 'scale-reading', config: scaleReadingConfig },
  'phrase-pathfinder': { type: 'phrase-pathfinder', config: phrasePathfinderConfig },
  'device-retest': { type: 'device-retest', config: deviceRetestConfig },
  'regrouping-lab': { type: 'regrouping-lab', config: { a: 50003, b: 26718, operation: 'subtract', context: 'Find how many seeds remain.' } },
  'place-value-builder': { type: 'place-value-builder', config: { target: 482, periods: 2 } },
  'number-line-compare': { type: 'number-line-compare', config: { min: 0, max: 1, a: 0.25, b: 0.75, step: 0.25, display: 'fraction', denominator: 4 } },
  'base-ten-blocks': { type: 'base-ten-blocks', config: { target: 10, initial: { ones: 9, tens: 0, hundreds: 0, thousands: 0 }, allowRegroup: true } },
  'fraction-models': { type: 'fraction-models', config: { mode: 'both', denominator: 4, target: { numerator: 1, denominator: 2 }, allowEquivalent: true, task: 'equivalent', wholeCount: 2, comparisonTarget: { numerator: 1, denominator: 2 }, taskPrompt: 'Build an equivalent fraction.' } },
  'area-model-multiplier': { type: 'area-model-multiplier', config: { a: 23, b: 4, splitA: [20, 3], splitB: [4], targetProduct: 92, revealMode: 'progressive' } },
  'array-builder': { type: 'array-builder', config: { rows: 2, columns: 4, targetProduct: 12, editable: true, task: 'factor-hunt', taskPrompt: 'Find another factor pair.' } },
  'money-counter': { type: 'money-counter', config: { targetCents: 85, taskPrompt: 'Make the exact amount.' } },
  'clock-elapsed-time': { type: 'clock-elapsed-time', config: { mode: 'elapsed', startTime: '01:00', elapsedMinutes: 15, minuteStep: 15, jumpMinutes: [5, 10, 15] } },
  'quarter-inch-ruler': { type: 'quarter-inch-ruler', config: { lengthInches: 3, targetInches: 2.25, taskPrompt: 'Measure to the nearest quarter inch.' } },
  'balance-scale': { type: 'balance-scale', config: { left: [{ id: 'a', label: '2', value: 2 }], right: [{ id: 'b', label: '1+1', value: 2 }], task: 'compare', taskPrompt: 'Compare the two sides.' } },
  'shape-classifier': { type: 'shape-classifier', config: { shapes: [{ id: 'triangle', label: 'Triangle', sides: 3, angles: 3, parallelPairs: 0 }, { id: 'square', label: 'Square', sides: 4, angles: 4, parallelPairs: 2 }], bins: [{ id: 'three', label: '3 sides', value: 3 }, { id: 'four', label: '4 sides', value: 4 }], rule: 'sides' } },
  'data-plot-builder': { type: 'data-plot-builder', config: { kind: 'dot', prompt: 'Build', categories: ['A'], target: { A: 2 }, sourceData: { A: 2 }, displayChoices: ['dot', 'bar'], taskPrompt: 'Show the data.' } },
  'probability-spinner': { type: 'probability-spinner', config: { segments: [{ id: 'a', label: 'A', weight: 1 }, { id: 'b', label: 'B', weight: 3 }], trials: 1, targetOutcomeId: 'b', eventQuestion: { eventLabel: 'b', classification: 'possible' }, taskPrompt: 'Predict the chance.' } },
  'collision-ramp': { type: 'collision-ramp', config: { rampAngle: 20, massA: 1, massB: 1, speedA: 5, speedB: 4, target: 'predict-direction', controlledVariable: 'speed-a', comparisonRuns: 2, taskPrompt: 'Compare the two modeled runs.' } },
  'energy-transfer-builder': { type: 'energy-transfer-builder', config: { sources: ['Sun'], transfers: ['Electricity'], targets: ['Lamp'], requiredPath: ['Sun', 'Electricity', 'Lamp'], distractors: ['Sound'] } },
  'wave-maker': { type: 'wave-maker', config: { medium: 'rope', amplitude: 2, frequency: 2, target: { amplitude: 3, frequency: 3 }, taskPrompt: 'Match the visible wave target.' } },
  'light-reflection-eye': { type: 'light-reflection-eye', config: { incidentAngle: 29, targetAngle: 30, showEye: true, task: 'trace-path', pathLabels: { source: 'Lamp', object: 'Mirror', eye: 'Eye' }, taskPrompt: 'Trace source to object to eye.' } },
  'message-sender': { type: 'message-sender', config: { encoding: 'morse', message: 'A' } },
  'energy-conversion-designer': { type: 'energy-conversion-designer', config: { components: [{ id: 'sun', label: 'Sun', energyIn: 'nuclear', energyOut: 'light', satisfiesConstraintIds: ['safe'] }, { id: 'panel', label: 'Panel', energyIn: 'light', energyOut: 'electric', satisfiesConstraintIds: ['safe'] }, { id: 'lamp', label: 'Lamp', energyIn: 'electric', energyOut: 'light', satisfiesConstraintIds: ['safe'] }], requiredStart: 'sun', requiredEnd: 'lamp', constraints: [{ id: 'safe', label: 'Safe', kind: 'safety' }] } },
  'animal-structure-matcher': { type: 'animal-structure-matcher', config: { pairs: [{ id: 'beak', animal: 'Bird', structure: 'beak', function: 'gathers food', kind: 'external' }, { id: 'fin', animal: 'Fish', structure: 'fin', function: 'swims', kind: 'external' }] } },
  'erosion-simulator': { type: 'erosion-simulator', config: { terrain: 'soil', agents: ['water', 'wind'], vegetation: false, targetAgent: 'water', comparison: { variable: 'vegetation', values: [false, true] } } },
  'rock-layer-explorer': { type: 'rock-layer-explorer', config: { layers: [{ id: 'top', label: 'Top', age: 1 }, { id: 'bottom', label: 'Bottom', age: 2 }], targetLayerId: 'bottom', evidencePrompt: 'Choose evidence for the older layer.', evidenceChoices: [{ id: 'rank', text: 'Larger relative-age rank' }, { id: 'fossil', text: 'Fossil pattern' }], requiredEvidenceId: 'rank' } },
  'topographic-map-explorer': { type: 'topographic-map-explorer', config: { contours: [{ elevation: 500, points: '0,0 1,1' }], points: [{ id: 'summit', label: 'Summit', x: 50, y: 20, elevation: 500, group: 'ridge' }, { id: 'trail', label: 'Trail', x: 50, y: 80, elevation: 300, group: 'ridge' }], targetPointId: 'summit', targetPattern: 'band' } },
  'hazard-solution-designer': { type: 'hazard-solution-designer', config: { hazard: 'Flood', solutions: [{ id: 'wall', label: 'Seawall', effectiveness: 'good', strengths: ['slows water'], impacts: ['homes'], limits: ['can be overtopped'] }, { id: 'leave', label: 'Evacuate', effectiveness: 'good', strengths: ['moves people'], impacts: ['people'], limits: ['needs warning time'] }, { id: 'ignore', label: 'Ignore warning', effectiveness: 'poor', strengths: ['none'], impacts: ['none'], limits: ['does not reduce harm'] }], requiredIds: ['wall', 'leave'], requiredImpactIds: ['homes', 'people'] } },
  'resource-sorter': { type: 'resource-sorter', config: { items: [{ id: 'sun', label: 'Sunlight', kind: 'renewable' }, { id: 'coal', label: 'Coal', kind: 'nonrenewable' }], bins: ['renewable', 'nonrenewable'], lessonCategory: 'resource use and effect', effectChoices: [{ id: 'clean', text: 'Produces less pollution' }, { id: 'limited', text: 'Can run out' }], effectAnswers: { sun: 'clean', coal: 'limited' } } },
  'word-root-builder': { type: 'word-root-builder', config: { root: 'port', prefixes: ['trans'], suffixes: ['able'], targets: [{ word: 'transport', meaning: 'carry across' }, { word: 'portable', meaning: 'able to be carried' }] } },
  'context-clue-detective': { type: 'context-clue-detective', config: { passage: 'A timid child is shy.', targetWord: 'timid', clueChoices: [{ id: 'definition', text: 'is shy', type: 'definition' }, { id: 'example', text: 'child', type: 'example' }], correctChoiceId: 'definition' } },
  'story-elements-mapper': { type: 'story-elements-mapper', config: { textTitle: 'Story', fields: ['character', 'setting'], answers: { character: 'Ava', setting: 'Park' }, source: { title: 'Story', text: 'Ava waits at the Park.' }, choices: [{ id: 'ava', text: 'Ava', field: 'character' }, { id: 'park', text: 'Park', field: 'setting' }], answerChoiceIds: { character: 'ava', setting: 'park' } } },
  'theme-evidence-collector': { type: 'theme-evidence-collector', config: { themeChoices: ['Practice pays off', 'Cats are funny'], evidence: [{ id: 'a', text: 'Ava practices daily', supports: ['Practice pays off'], sourceQuote: 'Ava practices daily' }, { id: 'b', text: 'Ava improves', supports: ['Practice pays off'], sourceQuote: 'Ava improves' }], requiredEvidenceCount: 2, source: { title: 'Practice', text: 'Ava practices daily. Ava improves.' } } },
  'central-idea-organizer': { type: 'central-idea-organizer', config: { mainIdeaChoices: ['Plants need sunlight', 'Dogs like bones'], details: [{ id: 'sun', text: 'Leaves use sunlight', supports: ['Plants need sunlight'], sourceQuote: 'Leaves use sunlight' }, { id: 'dog', text: 'Dogs wag tails', supports: ['Dogs like bones'], sourceQuote: 'Dogs wag tails' }], requiredDetailCount: 1, source: { title: 'Plants', text: 'Leaves use sunlight. Dogs wag tails.' } } },
  'text-structure-sorter': { type: 'text-structure-sorter', config: { excerpts: [{ id: 'rain', text: 'Rain fell, so the field flooded.', structure: 'cause-effect' }, { id: 'steps', text: 'First mix, then bake.', structure: 'sequence' }], availableStructures: ['cause-effect', 'sequence'] } },
  'summary-builder': { type: 'summary-builder', config: { sourceSentences: [{ id: 'main', text: 'Bees help plants.', role: 'main' }, { id: 'detail', text: 'They carry pollen.', role: 'detail' }, { id: 'extra', text: 'Blue is a color.', role: 'extra' }], requiredMainIds: ['main'], maxSentences: 2, requiredDetailIds: ['detail'], compositionPrompt: 'Explain the big idea.', minCompositionWords: 3, maxCompositionWords: 20 } },
  'pov-switcher': { type: 'pov-switcher', config: { passage: 'Ava carried Ava’s book.', from: 'third', target: 'first', pronounOptions: ['I', 'my', 'she'], requiredPronouns: ['I', 'my'] } },
  'figurative-language-matcher': { type: 'figurative-language-matcher', config: { pairs: [{ id: 'simile', phrase: 'fast as lightning', kind: 'simile', meaning: 'very fast' }, { id: 'idiom', phrase: 'piece of cake', kind: 'idiom', meaning: 'easy' }], availableKinds: ['simile', 'idiom'] } },
  'source-credibility-checker': { type: 'source-credibility-checker', config: { sources: [{ id: 'named', title: 'Museum guide', author: 'City Museum', claims: ['catalog evidence'] }, { id: 'anon', title: 'Amazing facts', claims: [] }], criteria: ['author', 'evidence'], credibleIds: ['named'] } },
} satisfies { [T in WidgetType]: RefFor<T> };

export const validWidgetCoach = {
  intro: [
    { speaker: 'guide', text: 'Connect the lesson idea to this model.', pose: 'talk' },
    { speaker: 'kid', text: 'I will change one thing and compare.' },
  ],
  reactions: {
    strategy: { text: 'Change one condition at a time.', pose: 'think' },
    retry: { text: 'Use the visible evidence and revise.', pose: 'oops' },
    milestone: { text: 'That intermediate model is useful.', pose: 'talk' },
    complete: { text: 'You used the model to explain the lesson idea.', pose: 'cheer' },
  },
} satisfies WidgetCoach;
