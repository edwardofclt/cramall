import type { WidgetCoach, WidgetRef, WidgetType } from '../content/schema';

type RefFor<T extends WidgetType> = Extract<WidgetRef, { type: T }>;

export const validWidgetRefByType = {
  'place-value-builder': { type: 'place-value-builder', config: { target: 482, periods: 2 } },
  'number-line-compare': { type: 'number-line-compare', config: { min: 0, max: 1, a: 0.25, b: 0.75, step: 0.25, display: 'fraction', denominator: 4 } },
  'base-ten-blocks': { type: 'base-ten-blocks', config: { target: 10, initial: { ones: 9, tens: 0, hundreds: 0, thousands: 0 }, allowRegroup: true } },
  'fraction-models': { type: 'fraction-models', config: { mode: 'both', denominator: 4, target: { numerator: 1, denominator: 2 }, allowEquivalent: true } },
  'area-model-multiplier': { type: 'area-model-multiplier', config: { a: 23, b: 4, splitA: [20, 3], splitB: [4], targetProduct: 92 } },
  'array-builder': { type: 'array-builder', config: { rows: 2, columns: 4, targetProduct: 12, editable: true } },
  'money-counter': { type: 'money-counter', config: { targetCents: 85 } },
  'clock-elapsed-time': { type: 'clock-elapsed-time', config: { mode: 'set-time', targetTime: '01:15', minuteStep: 15 } },
  'quarter-inch-ruler': { type: 'quarter-inch-ruler', config: { lengthInches: 3, targetInches: 2.25 } },
  'balance-scale': { type: 'balance-scale', config: { left: [{ id: 'a', label: '2', value: 2 }], right: [{ id: 'b', label: '1+1', value: 2 }], task: 'compare' } },
  'shape-classifier': { type: 'shape-classifier', config: { shapes: [{ id: 'triangle', label: 'Triangle', sides: 3, angles: 3, parallelPairs: 0 }, { id: 'square', label: 'Square', sides: 4, angles: 4, parallelPairs: 2 }], bins: [{ id: 'three', label: '3 sides', value: 3 }, { id: 'four', label: '4 sides', value: 4 }], rule: 'sides' } },
  'data-plot-builder': { type: 'data-plot-builder', config: { kind: 'dot', prompt: 'Build', categories: ['A'], target: { A: 2 } } },
  'probability-spinner': { type: 'probability-spinner', config: { segments: [{ id: 'a', label: 'A', weight: 1 }, { id: 'b', label: 'B', weight: 3 }], trials: 1, targetOutcomeId: 'b' } },
  'collision-ramp': { type: 'collision-ramp', config: { rampAngle: 20, massA: 1, massB: 1, speedA: 5, speedB: 4, target: 'predict-direction' } },
  'energy-transfer-builder': { type: 'energy-transfer-builder', config: { sources: ['Sun'], transfers: ['Electricity'], targets: ['Lamp'], requiredPath: ['Sun', 'Electricity', 'Lamp'] } },
  'wave-maker': { type: 'wave-maker', config: { medium: 'rope', amplitude: 2, frequency: 2, target: { amplitude: 3, frequency: 3 } } },
  'light-reflection-eye': { type: 'light-reflection-eye', config: { incidentAngle: 29, targetAngle: 30, showEye: true } },
  'message-sender': { type: 'message-sender', config: { encoding: 'morse', message: 'A' } },
  'energy-conversion-designer': { type: 'energy-conversion-designer', config: { components: [{ id: 'sun', label: 'Sun', energyIn: 'nuclear', energyOut: 'light' }, { id: 'panel', label: 'Panel', energyIn: 'light', energyOut: 'electric' }, { id: 'lamp', label: 'Lamp', energyIn: 'electric', energyOut: 'light' }], requiredStart: 'sun', requiredEnd: 'lamp' } },
  'animal-structure-matcher': { type: 'animal-structure-matcher', config: { pairs: [{ id: 'beak', animal: 'Bird', structure: 'beak', function: 'gathers food' }, { id: 'fin', animal: 'Fish', structure: 'fin', function: 'swims' }] } },
  'erosion-simulator': { type: 'erosion-simulator', config: { terrain: 'soil', agents: ['water', 'wind'], vegetation: false, targetAgent: 'water' } },
  'rock-layer-explorer': { type: 'rock-layer-explorer', config: { layers: [{ id: 'top', label: 'Top', age: 1 }, { id: 'bottom', label: 'Bottom', age: 2 }], targetLayerId: 'bottom' } },
  'topographic-map-explorer': { type: 'topographic-map-explorer', config: { contours: [{ elevation: 500, points: '0,0 1,1' }], points: [{ id: 'summit', label: 'Summit', elevation: 500 }, { id: 'trail', label: 'Trail', elevation: 300 }], targetPointId: 'summit' } },
  'hazard-solution-designer': { type: 'hazard-solution-designer', config: { hazard: 'Flood', solutions: [{ id: 'wall', label: 'Seawall', effectiveness: 'good' }, { id: 'leave', label: 'Evacuate', effectiveness: 'good' }, { id: 'ignore', label: 'Ignore warning', effectiveness: 'poor' }], requiredIds: ['wall', 'leave'] } },
  'resource-sorter': { type: 'resource-sorter', config: { items: [{ id: 'sun', label: 'Sunlight', kind: 'renewable' }, { id: 'coal', label: 'Coal', kind: 'nonrenewable' }], bins: ['renewable', 'nonrenewable'] } },
  'word-root-builder': { type: 'word-root-builder', config: { root: 'port', prefixes: ['trans'], suffixes: ['able'], targets: [{ word: 'transport', meaning: 'carry across' }, { word: 'portable', meaning: 'able to be carried' }] } },
  'context-clue-detective': { type: 'context-clue-detective', config: { passage: 'A timid child is shy.', targetWord: 'timid', clueChoices: [{ id: 'definition', text: 'is shy', type: 'definition' }, { id: 'example', text: 'child', type: 'example' }], correctChoiceId: 'definition' } },
  'story-elements-mapper': { type: 'story-elements-mapper', config: { textTitle: 'Story', fields: ['character', 'setting'], answers: { character: 'Ava', setting: 'Park' } } },
  'theme-evidence-collector': { type: 'theme-evidence-collector', config: { themeChoices: ['Practice pays off', 'Cats are funny'], evidence: [{ id: 'a', text: 'Ava practices daily', supports: ['Practice pays off'] }, { id: 'b', text: 'Ava improves', supports: ['Practice pays off'] }], requiredEvidenceCount: 2 } },
  'central-idea-organizer': { type: 'central-idea-organizer', config: { mainIdeaChoices: ['Plants need sunlight', 'Dogs like bones'], details: [{ id: 'sun', text: 'Leaves use sunlight', supports: ['Plants need sunlight'] }, { id: 'dog', text: 'Dogs wag tails', supports: ['Dogs like bones'] }], requiredDetailCount: 1 } },
  'text-structure-sorter': { type: 'text-structure-sorter', config: { excerpts: [{ id: 'rain', text: 'Rain fell, so the field flooded.', structure: 'cause-effect' }, { id: 'steps', text: 'First mix, then bake.', structure: 'sequence' }] } },
  'summary-builder': { type: 'summary-builder', config: { sourceSentences: [{ id: 'main', text: 'Bees help plants.', role: 'main' }, { id: 'detail', text: 'They carry pollen.', role: 'detail' }, { id: 'extra', text: 'Blue is a color.', role: 'extra' }], requiredMainIds: ['main'], maxSentences: 2 } },
  'pov-switcher': { type: 'pov-switcher', config: { passage: 'Ava carried Ava’s book.', from: 'third', target: 'first', pronounOptions: ['I', 'my', 'she'], requiredPronouns: ['I', 'my'] } },
  'figurative-language-matcher': { type: 'figurative-language-matcher', config: { pairs: [{ id: 'simile', phrase: 'fast as lightning', kind: 'simile', meaning: 'very fast' }, { id: 'idiom', phrase: 'piece of cake', kind: 'idiom', meaning: 'easy' }] } },
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
