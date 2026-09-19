export const sources = {
    'receiver-changes': 'Supplied practice packet: A struck tuning fork produces sound; nearby paper bits change from still to trembling. A flashlight is switched on; a card changes from dim to brighter. A spoon rests in warm water; the supplied temperature record describes the spoon as warmer afterward. A connected battery powers a motor; its shaft changes from still to turning. The notebook cover was blue. These are qualitative descriptions, not numerical energy measurements.',
    'crest-to-crest': 'Two rope-pattern diagrams have the same strip width, height, and scale. A has more complete cycles across the strip than B. Compare neighboring matching points. This diagram has no meter scale and makes no sound-pitch claim.',
    'pixel-post': 'Practice picture: a small flag on a 3 by 3 grid. Rows: black, black, white; black, black, white; black, white, white. Key: black = 1, white = 0. Shared order: top-left, left to right, then the next row. Empty input cells mean not entered; they are not a third transmitted value. Reconstruction happens here on this device.',
    'message-design-trials': 'Practice target: HOME. A is a printed Morse strip: H = ...., O = ---, M = --, E = .; B is a drum code: soft = 0, loud = 1; H = 00, O = 01, M = 10, E = 11. C is a printed black/white strip: black = 1, white = 0; H = 1100, O = 1010, M = 0101, E = 0011. All keys include letter boundaries. Separators frame letters; they are not a third data value. Build two versions of HOME here before inspecting the separate supplied trials.',
    'lamp-test-notebook': 'Supplied reading-lamp case. Goal: stay visibly lit throughout ten seconds. Trial 1 lit 6 seconds, then flickered off; Trial 2 lit 7 seconds, then flickered off; Trial 3 lit 6 seconds, then flickered off. Every trial uses the same battery type, lamp, switch, connections, viewing condition, and ten-second interval. The circuit identifies the device; this activity does not assemble or test a physical lamp.',
    'plant-system': 'Supplied information: A blackberry plant has roots in soil, stems supporting leaves and flowers, leaves exposed to light, flowers, and thorns along its stems. Roots take in water and help anchor the plant. Stems support the plant and move materials. Leaves capture sunlight to help the plant make food. Flowers support reproduction. Thorns can discourage some animals from feeding.',
    'survival-evidence': 'Supplied practice observations. Blackberry roots reached damp soil during a dry week; its stem remained upright and held spread leaves in sunlight. A wren’s beak gathered insects; its wings carried it to cover; feathers covered and protected its body. Extra notes: the observer used a purple notebook; the bird was the observer’s favorite. These descriptions do not measure exact food production, prove every individual survives, or show microscopic processes.',
    'sense-response': 'Model card: A branch snaps near a wren. Sound can provide information through hearing. In this model, that information goes to the brain for processing. The wren might turn toward the sound, pause, or fly to cover. These are possible responses, not predictions that every wren must behave the same way. In another scene, a wren sees a berry: light provides information through sight.',
} as const;
export const receiverCases = [
    { id: 'sound', name: 'Sound', source: 'Struck tuning fork', route: 'Sound', receiver: 'Paper bits', effect: 'Still → trembling' },
    { id: 'light', name: 'Light', source: 'Flashlight', route: 'Light', receiver: 'Card', effect: 'Dim → brighter' },
    { id: 'heat', name: 'Heating', source: 'Warm water', route: 'Heating', receiver: 'Spoon', effect: 'Warmer afterward' },
    { id: 'current', name: 'Electric current', source: 'Battery', route: 'Electric current', receiver: 'Motor shaft', effect: 'Still → turning' },
] as const;
export const targetPixels = '110110100';
export const challengePixels = '110111100';
export const codes = { A: ['....', '---', '--', '.'], B: ['00', '01', '10', '11'], C: ['1100', '1010', '0101', '0011'] } as const;
export type CodeId = keyof typeof codes;
export function decodeLetters(id: CodeId, values: string[]) { return values.map(v => { const index = (codes[id] as readonly string[]).indexOf(v); return index < 0 ? '?' : 'HOME'[index]; }).join(''); }
export const lampDurations = [6, 7, 6] as const;
export const plantParts = ['Roots', 'Stem', 'Leaves', 'Flowers', 'Thorns'] as const;
export const plantFunctions = ['Take in water and anchor', 'Support and move materials', 'Capture sunlight to help make food', 'Support reproduction', 'Discourage some feeding animals'] as const;
export function wavePoints(cycles: number) { return Array.from({ length: cycles * 2 }, (_, i) => ({ x: 20 + (i + .5) * 300 / (cycles * 2), y: i % 2 === 0 ? 35 : 95, kind: i % 2 === 0 ? 'crest' : 'trough' })); }
export function wavePath(cycles: number) { return Array.from({ length: 301 }, (_, i) => `${i === 0 ? 'M' : 'L'}${20 + i},${65 - 30 * Math.sin(i / 300 * cycles * 2 * Math.PI)}`).join(' '); }
export function matchingSpan(a: string, b: string) { return a !== '' && b !== '' && Math.abs(Number(a) - Number(b)) === 2; }
