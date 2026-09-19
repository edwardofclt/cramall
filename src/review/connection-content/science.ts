import type { UnitConnection } from '../connections';

export const scienceConnections: UnitConnection[] = [
  {
    unitId: 'science-u01',
    foundation: 'The same moving object has more energy of motion when it is faster. Use that relationship to make a collision prediction, then separate the prediction from physical evidence.',
    question: {
      id: 'science-u01-l04-q99', type: 'multiple-choice', conceptTag: 'collision-outcome-prediction', reviewCardId: 'science-u01-l04-c2',
      prompt: 'In a cart model, cart A rolls right into stopped cart B and the carts latch together. You can change A from a slower to a faster incoming speed while keeping the carts, track, and latch the same. Which plan connects speed and energy fairly?',
      choices: [
        { id: 'predict-test', text: 'Predict a greater motion effect with faster A, then compare physical trials for evidence; the model only represents the prediction.' },
        { id: 'directly-see', text: 'Run the model once and report that you directly saw an exact amount of energy move.' },
        { id: 'many-changes', text: 'Use a heavier B and a new latch with faster A so speed is the only difference.' },
        { id: 'same-energy', text: 'Predict no possible difference because the same cart must have the same energy at every speed.' },
      ],
      correctChoiceId: 'predict-test',
      explanation: 'For the same cart, faster motion means more energy of motion. That gives a reason to predict a greater motion effect when it collides with B. Keeping the other conditions fixed makes the slower/faster comparison fair. A model represents this prediction; observations from physical trials are needed to support a claim about actual carts. Motion is observed, while energy is inferred.',
    },
  },
  {
    unitId: 'science-u02',
    foundation: 'Motion changes can support an energy inference. Look for receiver changes in different cases to explain energy transfer without claiming to see energy itself.',
    question: {
      id: 'science-u02-l04-q99', type: 'multiple-choice', conceptTag: 'transfer-comparison-claim', reviewCardId: 'science-u02-l04-c3',
      prompt: 'A practice record describes two physical tests. A drum sounds near a stretched sheet with paper bits; the bits begin trembling. In a separate test, closing a battery circuit starts a motor turning. Which comparison uses the observations as evidence?',
      choices: [
        { id: 'same-route', text: 'Both receivers move, so both must receive energy by electric current.' },
        { id: 'exact-equal', text: 'The moving receivers prove that the two tests transferred equal amounts of energy.' },
        { id: 'different-routes', text: 'Both show changes in a receiver’s motion, supporting transfer by sound in one case and electric current in the other.' },
        { id: 'energy-visible', text: 'Energy itself becomes visible whenever paper or a motor moves.' },
      ],
      correctChoiceId: 'different-routes',
      explanation: 'Trembling paper bits and a turning motor are observable effects in the receivers, just as motion changes in collisions can support an energy inference. The setups identify different routes: sound from the drum and electric current in the circuit. Similar motion effects do not make the routes identical or tell us exact energy amounts.',
    },
  },
  {
    unitId: 'science-u03',
    foundation: 'Light can transfer from a source to a receiver. Extend that path: seeing an ordinary object also requires light to reflect from the object into an eye.',
    question: {
      id: 'science-u03-l04-q99', type: 'multiple-choice', conceptTag: 'seeing-cause-effect-model', reviewCardId: 'science-u03-l04-c3',
      prompt: 'A diagram shows a flashlight shining through opening A onto a coin inside a box. An eye is outside opening B. A solid card blocks the path from the coin to opening B, while the flashlight still lights the coin. What change completes a model for seeing the coin?',
      choices: [
        { id: 'eye-light', text: 'Add an arrow showing light leaving the eye and going through the solid card.' },
        { id: 'clear-path', text: 'Remove the blocking card and show reflected light traveling from the coin through B into the eye.' },
        { id: 'source-only', text: 'Make no change; light reaching the coin is enough even if none reaches the eye.' },
        { id: 'reverse-source', text: 'Turn the flashlight away and show the unlit coin making its own light.' },
      ],
      correctChoiceId: 'clear-path',
      explanation: 'The flashlight-to-coin path supplies light, but it is only the first part of the system. Some light must reflect from the coin and enter the eye. Removing the card opens that second path. The completed arrows model why the coin could be seen; the drawing is not evidence that a particular person actually saw it.',
    },
  },
  {
    unitId: 'science-u04',
    foundation: 'Sound and light can carry information. Compare how well their coded patterns work under the same conditions, then choose using the goal and the evidence.',
    question: {
      id: 'science-u04-l04-q99', type: 'multiple-choice', conceptTag: 'message-solution-choice', reviewCardId: 'science-u04-l04-c3',
      prompt: 'A practice test record compares the same four-symbol message across a noisy room with a clear view. A two-sound code was decoded 2 of 4 correctly using 8 signals. A two-flash code was decoded 4 of 4 correctly using 10 signals. Receivers had both code keys. Accuracy matters most. Which choice fits these results?',
      choices: [
        { id: 'fewer-only', text: 'Choose sound because the fewest signals always make the most accurate message.' },
        { id: 'equal', text: 'Call the codes equally successful because sound and light both transfer information.' },
        { id: 'always-light', text: 'Choose flashes because this record proves light codes work in every condition.' },
        { id: 'flashes-with-limit', text: 'Choose flashes for these conditions: all four symbols were correct, although it used two more signals and needs a clear view.' },
      ],
      correctChoiceId: 'flashes-with-limit',
      explanation: 'Both sound and light can carry patterns, but the recorded results differ in this room. Flashes meet the accuracy goal with 4 of 4 correct, compared with 2 of 4 for sound. The tradeoff is 10 signals instead of 8 and a need for a visible light path. These results support a choice for the stated conditions, not every possible setting.',
    },
  },
  {
    unitId: 'science-u05',
    foundation: 'A fair comparison changes one condition, and energy transfer is inferred from a receiver’s effects. Use both ideas to judge whether a device refinement helped.',
    question: {
      id: 'science-u05-l04-q99', type: 'multiple-choice', conceptTag: 'refinement-evidence', reviewCardId: 'science-u05-l04-c3',
      prompt: 'A practice record describes a battery-powered motor lifting a small flag. The goal is to reach a marked height within 5 seconds. With a loose clip, three trials took 8, 9, and 8 seconds. After replacing only that clip, trials took 4, 5, and 4 seconds. Battery type, motor, flag, height, and timing method stayed the same. Which conclusion is supported?',
      choices: [
        { id: 'supported-improvement', text: 'The refined version met the goal in all three retests; the one-clip comparison supports improvement but does not guarantee future trials.' },
        { id: 'twice-energy', text: 'The refined version must transfer exactly twice as much energy because it is quicker.' },
        { id: 'no-motion', text: 'The flag’s movement cannot help us judge the device because energy is not directly visible.' },
        { id: 'change-all', text: 'The record proves that replacing the battery, motor, and clip together caused the improvement.' },
      ],
      correctChoiceId: 'supported-improvement',
      explanation: 'The first times all exceed 5 seconds; the retest times are all 5 seconds or less. Because only the clip changed, the comparison supports this refinement. Flag motion is an observable effect of the device’s electrical-to-motion energy conversion. The times measure performance, not exact energy amounts, and three successful trials cannot promise every future result.',
    },
  },
  {
    unitId: 'science-u06',
    foundation: 'Seeing requires reflected light to enter an eye. Connect that earlier light path with sense information, brain processing, and a possible animal response.',
    question: {
      id: 'science-u06-l04-q99', type: 'multiple-choice', conceptTag: 'sense-response-system', reviewCardId: 'science-u06-l04-c3',
      prompt: 'In a system model, a bird notices a red berry in daylight and may turn toward it. Which sequence connects the light path to the bird’s possible response?',
      choices: [
        { id: 'eye-beam', text: 'The eye sends light to the berry → the berry orders the bird to eat.' },
        { id: 'skip-brain', text: 'Light reflects from the berry → the wings receive it directly → every bird must fly.' },
        { id: 'light-sense-response', text: 'Sunlight reaches the berry → reflected light enters the eye → sense information goes to the brain → the bird may turn.' },
        { id: 'sound-only', text: 'Berry color travels as sound → hearing sends it to the brain → the bird turns.' },
      ],
      correctChoiceId: 'light-sense-response',
      explanation: 'Sunlight provides light that can reflect from the berry into the bird’s eye. Sight receives that information, and the brain processes it before a possible response such as turning. This joins the light-path model to the sense-response model. The same sight does not force every bird to act in exactly the same way.',
    },
  },
  {
    unitId: 'science-u07',
    foundation: 'Maps help you describe where features are now. Rock layers and their fossils provide a different kind of evidence about how that same place changed over relative time.',
    question: {
      id: 'science-u07-l04-q99', type: 'multiple-choice', conceptTag: 'landscape-change-explanation', reviewCardId: 'science-u07-l04-c3',
      prompt: 'A practice map marks Site P on dry land today. At P, an undisturbed layer model shows a lower, older layer with land-plant fossils and no shells. An upper, younger layer has marine shell fossils. Which explanation uses both the map and the layer information?',
      choices: [
        { id: 'always-dry', text: 'The map shows dry land, so Site P must always have been dry land.' },
        { id: 'change-sequence', text: 'The fossil pattern supports an earlier land setting followed by a marine setting; the map shows dry land now, but these sources give no exact dates.' },
        { id: 'exact-date', text: 'Two fossil layers mean the change happened exactly two years ago.' },
        { id: 'reverse-order', text: 'The upper layer is older, so marine conditions came before the lower land-plant layer.' },
      ],
      correctChoiceId: 'change-sequence',
      explanation: 'The lower-to-upper order gives a relative sequence in this undisturbed model: land-plant evidence first, then marine-shell evidence. The map adds present-day dry land at the same site. Together they support changing conditions across time, rather than a place that never changed. Neither a current map nor relative layer order provides calendar dates or the detailed cause of each change.',
    },
  },
  {
    unitId: 'science-u08',
    foundation: 'Landform maps help locate where water may collect. Use that information alongside each solution’s strengths and limits when planning to reduce a hazard’s impacts.',
    question: {
      id: 'science-u08-l04-q99', type: 'multiple-choice', conceptTag: 'hazard-solution-justification', reviewCardId: 'science-u08-l04-c3',
      prompt: 'A practice town map places homes beside a river in a low valley and a shelter on higher ground. A channel can redirect some floodwater from the homes, but it needs land and maintenance. A warning can give residents time to follow a marked route to the shelter, but cannot stop water. Which plan best uses the map and both solutions?',
      choices: [
        { id: 'warning-stops-water', text: 'Use only the warning; its message will physically hold water away from the valley.' },
        { id: 'channel-guarantee', text: 'Build the channel and promise the low homes can never flood again.' },
        { id: 'ignore-map', text: 'Place the shelter at the lowest riverside spot because elevation does not matter.' },
        { id: 'combined-limits', text: 'Combine a maintainable channel near the homes with warnings and the marked higher-ground route; the parts address different needs and still have limits.' },
      ],
      correctChoiceId: 'combined-limits',
      explanation: 'The map identifies low riverside homes and a higher shelter, connecting location to the possible impact. A channel addresses some water near the homes; warnings provide time to use the planned route. The combined plan must still fit the available land and be maintained. Neither part, nor their combination, removes all flood risk. This is a practice planning scenario.',
    },
  },
];
