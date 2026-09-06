import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

const accuracyPassage = `On Saturday morning, Maya arrived at the community garden before the volunteers began planting. A blue sign beside the gate read, “Pollinator Patch—Please Walk Slowly.” Maya opened the garden map and traced a route from the tool shed to the sunflower bed. Her partner, Eli, carried two trowels and a small watering can. “Let’s check the labels before we dig,” Maya said.

At the first bed, they found a card that said, “Basil needs sunlight and careful watering.” Maya read the long sentence slowly, then explained that the basil should get water at its roots, not on every leaf.

A breeze lifted the edge of the map. Maya noticed that the arrow pointed toward the compost bin, not the greenhouse. She reread the map and changed direction before the group walked too far.

Near the sunflowers, Eli spotted a monarch butterfly resting on a purple flower. The volunteers grew quiet for a moment, then kept working in steady pairs. By noon, they had planted basil, checked the map, and filled the watering can again. Maya smiled because careful reading had helped the garden team work safely and finish on time.`;

const expressionPassage = `On Thursday afternoon, Tomas and his grandfather waited beside the harbor as a thick fog rolled over the water. The fishing boats were tied safely to the dock, but the far shore had disappeared. Tomas held a small brass compass in his hand. “Do you think the lighthouse can still see us?” he asked.

Grandfather pointed toward the gray water. For several seconds, everything was quiet except for the tap of a rope against a wooden post. Then a pale beam swept across the fog. It vanished, returned, and flashed once more.

“There it is!” Tomas whispered. He stepped closer to the railing, then stopped when Grandfather gently touched his sleeve. “Stay behind the yellow line,” Grandfather said. Tomas nodded and took one careful step back.

The beam flashed again, this time brighter. Tomas grinned. “The harbor light is showing boats the safe way home!” Grandfather smiled and said, “Yes, and it helped us find our way too.” Tomas tucked the compass into his pocket. As they walked along the dock, he read the yellow safety sign aloud so they could keep a safe distance from the edge.`;

export const unit01Lessons = [
  {
    id: 'reading-u01-l01',
    unitId: 'reading-u01',
    title: 'Read Accurately at a Good Pace',
    indicatorCodes: ['ELA.4.F.4.2'],
    crossCuttingExpectationCodes: [...READING_OE_CODES],
    intro: [
      { speaker: 'winnie', pose: 'talk', text: 'Fluent reading begins with getting the words right and understanding what they say.' },
      { speaker: 'winnie', pose: 'think', text: 'A useful pace is not a race; it gives your brain time to build meaning.' },
      { speaker: 'winnie', pose: 'talk', text: 'You can practice fluency while reading aloud or silently.' },
      { speaker: 'winnie', pose: 'cheer', text: 'Let’s combine accuracy, an appropriate pace, expression, and intonation so the message stays clear.' },
    ],
    learnCards: [
      {
        id: 'reading-u01-l01-c1',
        title: 'Accuracy protects the meaning',
        blocks: [
          { kind: 'text', text: 'Fluent readers read the words the author wrote. They notice a mistake, return to it, and reread the sentence so it makes sense.' },
          { kind: 'example', text: 'In “The tiny crab slipped under the striped shell,” changing crab to cap would change the picture, so an accurate reader checks the letters and rereads.' },
          { kind: 'tip', text: 'Use the sentence meaning and every letter in a word; do not guess from only the first sound.' },
        ],
        "widget": {
          "type": "context-clue-detective",
          "config": {
            "passage": "The tiny crab slipped under the striped shell.",
            "targetWord": "crab",
            "clueChoices": [
              {
                "id": "slipped-under",
                "text": "slipped under the striped shell",
                "type": "definition"
              },
              {
                "id": "striped",
                "text": "the striped shell",
                "type": "example"
              },
              {
                "id": "tiny",
                "text": "The tiny",
                "type": "example"
              }
            ],
            "correctChoiceId": "slipped-under"
          }
        },
        check: {
          prompt: 'A reader changes “crab” to “cap” in the tiny crab sentence. Which move best protects the meaning?',
          choices: [
            { id: 'a', text: 'Check every letter in “crab,” correct it, and reread the sentence' },
            { id: 'b', text: 'Keep going because the two words look alike' },
            { id: 'c', text: 'Skip the word and guess later' },
          ],
          correctChoiceId: 'a',
          explanation: 'Check the letters in crab, correct the word, then reread so the tiny crab still makes sense.',
        },
      },
      {
        id: 'reading-u01-l01-c2',
        title: 'An appropriate pace fits the text',
        blocks: [
          { kind: 'text', text: 'Appropriate rate means reading smoothly enough to connect ideas while slowing down for challenging words, important details, or complex sentences.' },
          { kind: 'example', text: 'A reader might move steadily through “Rain tapped the roof,” then pause to unpack a sentence explaining how a rain gauge works.' },
          { kind: 'tip', text: 'Read meaningful groups of words instead of racing word by word or stopping after every word.' },
        ],
        check: {
          prompt: 'What pace best helps a reader understand the sentence explaining how a rain gauge works?',
          choices: [
            { id: 'a', text: 'Race through it so the sentence ends faster' },
            { id: 'b', text: 'Read smoothly, then slow down for the rain-gauge details' },
            { id: 'c', text: 'Pause after every single word' },
          ],
          correctChoiceId: 'b',
          explanation: 'Keep a smooth pace across the sentence, but slow down to unpack the important rain-gauge details.',
        },
      },
      {
        id: 'reading-u01-l01-c3',
        title: 'Check fluency by checking meaning',
        blocks: [
          { kind: 'text', text: 'Build stamina by reading varied academic and personal texts aloud and silently for longer stretches, then explain what you understood.' },
          { kind: 'text', text: 'Written, oral, visual, digital, and interactive texts may combine words with maps, captions, images, or audio, so connect each part to the same message.' },
          { kind: 'example', text: 'After reading “Muddy paw prints crossed the porch, but the dog bed was empty,” infer what may have happened and cite “muddy paw prints” as evidence.' },
          { kind: 'tip', text: 'Use a three-line reflection labeled Accuracy, Pace, and Meaning/Evidence; this consistent format helps you create careful work.' },
          { kind: 'tip', text: 'Practice independently: read a short section, use the Read aloud button to compare a model pace, then write an Accuracy, Pace, and Meaning/Evidence self-reflection. The app does not listen to or score your voice.' },
        ],
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "A dog walked across the porch",
              "The porch had just been washed"
            ],
            "details": [
              {
                "id": "paw-prints",
                "text": "Muddy paw prints crossed the porch boards.",
                "supports": [
                  "A dog walked across the porch"
                ]
              },
              {
                "id": "empty-bed",
                "text": "The dog bed by the door was empty.",
                "supports": [
                  "A dog walked across the porch"
                ]
              },
              {
                "id": "clean-rail",
                "text": "Someone hosed the porch rail yesterday.",
                "supports": [
                  "The porch had just been washed"
                ]
              }
            ],
            "requiredDetailCount": 2
          }
        },
        check: {
          prompt: 'Which note checks meaning with evidence from the muddy-paw sentence?',
          choices: [
            { id: 'a', text: 'I read quickly, so I must have understood' },
            { id: 'b', text: 'I liked the striped shell because it is my favorite color' },
            { id: 'c', text: 'The dog bed was empty, and the muddy paw prints suggest a dog left the porch' },
          ],
          correctChoiceId: 'c',
          explanation: 'The muddy paw prints are evidence for the inference, so the note checks meaning instead of only reporting reading speed.',
        },
      },
    ],
    workedExample: {
      title: 'Fluency check at the community garden',
      passage: { title: 'Original passage', text: accuracyPassage },
      steps: [
        'Read accurately by checking Pollinator, trowels, compost, and greenhouse instead of replacing them with easier-looking words.',
        'Use a steady pace through the action, pause at the paragraph breaks, and slow down for the map directions and the basil care card.',
        'Check comprehension by explaining why Maya rereads the map and by citing details that show careful reading helped the team.',
      ],
    },
    quiz: {
      passThreshold: 8,
      reference: { title: 'Read this passage', text: accuracyPassage },
      pool: [
        {
          id: 'reading-u01-l01-q01',
          type: 'multiple-choice',
          prompt: 'Maya reads “Pollinator” as “planet” in the blue sign. What should she do to protect accuracy?',
          choices: [
            { id: 'a', text: 'Keep going because both words begin with p' },
            { id: 'b', text: 'Check every letter in Pollinator, correct the word, and reread the sentence' },
            { id: 'c', text: 'Guess another p word without looking at the ending' },
            { id: 'd', text: 'Skip the sign and never return to it' },
          ],
          correctChoiceId: 'b',
          explanation: 'Checking every letter and rereading corrects the word so the sign keeps its meaning.',
          conceptTag: 'reading-accuracy',
          reviewCardId: 'reading-u01-l01-c1',
        },
        {
          id: 'reading-u01-l01-q02',
          type: 'multiple-choice',
          prompt: 'A reader says “towels” instead of “trowels” when describing what Eli carries. Which fluency skill needs attention?',
          choices: [
            { id: 'a', text: 'Accuracy' },
            { id: 'b', text: 'Volume' },
            { id: 'c', text: 'Page turning' },
            { id: 'd', text: 'Memorization' },
          ],
          correctChoiceId: 'a',
          explanation: 'Replacing trowels with towels changes the word and can change the meaning.',
          conceptTag: 'reading-accuracy',
          reviewCardId: 'reading-u01-l01-c1',
        },
        {
          id: 'reading-u01-l01-q03',
          type: 'true-false',
          prompt: 'True or false: Maya’s rereading of the map is a useful strategy because it helps her notice the arrow points to the compost bin, not the greenhouse.',
          choices: [
            { id: 'true', text: 'True — rereading can repair meaning' },
            { id: 'false', text: 'False — keep going without checking' },
          ],
          correctChoiceId: 'true',
          explanation: 'Rereading lets Maya correct her understanding of the map before the group walks too far.',
          conceptTag: 'reading-accuracy',
          reviewCardId: 'reading-u01-l01-c1',
        },
        {
          id: 'reading-u01-l01-q04',
          type: 'multiple-choice',
          prompt: 'Maya may not know the word “traced” at first. Which accurate-reading check would help her clarify its meaning in the garden map sentence?',
          choices: [
            { id: 'a', text: 'Reread the whole sentence and use the route on the map as a clue' },
            { id: 'b', text: 'Skip traced and decide the sentence cannot have meaning' },
            { id: 'c', text: 'Replace traced with a random word that begins with t' },
            { id: 'd', text: 'Read only the first word of the sentence' },
          ],
          correctChoiceId: 'a',
          explanation: 'Rereading the sentence and looking at the route helps a reader infer that Maya followed its path on the map.',
          conceptTag: 'reading-accuracy',
          reviewCardId: 'reading-u01-l01-c1',
        },
        {
          id: 'reading-u01-l01-q05',
          type: 'multiple-choice',
          prompt: 'Why is it sensible for a reader to slow down for the basil care card?',
          choices: [
            { id: 'a', text: 'The card contains a detail about how to care for the basil correctly' },
            { id: 'b', text: 'Readers should always stop after every word' },
            { id: 'c', text: 'The card is less important than every other part of the passage' },
            { id: 'd', text: 'Slowing down means skipping the sentence' },
          ],
          correctChoiceId: 'a',
          explanation: 'The card tells the team where and how to water the basil, so its meaning matters to their work.',
          conceptTag: 'appropriate-pace',
          reviewCardId: 'reading-u01-l01-c2',
        },
        {
          id: 'reading-u01-l01-q06',
          type: 'true-false',
          prompt: 'True or false: The volunteers should read “Pollinator Patch—Please Walk Slowly” quickly without thinking because it is only a sign.',
          choices: [
            { id: 'true', text: 'True — signs never give important directions' },
            { id: 'false', text: 'False — the sign gives a safety direction that the team should understand' },
          ],
          correctChoiceId: 'false',
          explanation: 'The sign tells visitors to walk slowly near the pollinator patch, so readers should make sure they understand it.',
          conceptTag: 'appropriate-pace',
          reviewCardId: 'reading-u01-l01-c2',
        },
        {
          id: 'reading-u01-l01-q07',
          type: 'multiple-choice',
          prompt: 'Which event happens after Maya rereads the map?',
          choices: [
            { id: 'a', text: 'She and the group walk too far toward the greenhouse' },
            { id: 'b', text: 'She changes direction before the group walks too far' },
            { id: 'c', text: 'Eli plants basil before checking its label' },
            { id: 'd', text: 'The volunteers leave before reaching the garden' },
          ],
          correctChoiceId: 'b',
          explanation: 'The passage says Maya rereads the map and changes direction before the group walks too far.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
        {
          id: 'reading-u01-l01-q08',
          type: 'multiple-choice',
          prompt: 'Which sentence best states the main idea of the passage?',
          choices: [
            { id: 'a', text: 'Maya and Eli use careful reading to help their garden team work safely and correctly' },
            { id: 'b', text: 'Monarch butterflies are always found on purple flowers' },
            { id: 'c', text: 'Every garden must have a greenhouse and a compost bin' },
            { id: 'd', text: 'Trowels are the only tool volunteers need for gardening' },
          ],
          correctChoiceId: 'a',
          explanation: 'The passage shows the team reading signs, a care card, and a map so they can make good choices together.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
        {
          id: 'reading-u01-l01-q09',
          type: 'true-false',
          prompt: 'True or false: A reader can pause briefly at a period because it usually closes a complete sentence.',
          choices: [
            { id: 'true', text: 'True — that pause separates the complete first sentence' },
            { id: 'false', text: 'False — punctuation should never affect pace' },
          ],
          correctChoiceId: 'true',
          explanation: 'A period normally closes a complete thought, so a brief pause helps readers separate ideas.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
        {
          id: 'reading-u01-l01-q10',
          type: 'multiple-choice',
          prompt: 'What is a useful way to read a sentence that contains several connected actions?',
          choices: [
            { id: 'a', text: 'Read only the first action and skip the rest' },
            { id: 'b', text: 'Read in meaningful groups and keep the actions connected' },
            { id: 'c', text: 'Pause for a long time after every word' },
            { id: 'd', text: 'Ignore the action words' },
          ],
          correctChoiceId: 'b',
          explanation: 'Meaningful groups help a reader hold each action in mind and understand how they connect.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
        {
          id: 'reading-u01-l01-q11',
          type: 'multiple-choice',
          prompt: 'A passage says, “Jordan zipped a raincoat and tucked a book into a dry bag.” Which inference is best supported?',
          choices: [
            { id: 'a', text: 'Jordan expects wet weather' },
            { id: 'b', text: 'Jordan has never seen a book' },
            { id: 'c', text: 'Jordan is preparing a garden bed' },
            { id: 'd', text: 'Jordan will not need to carry anything' },
          ],
          correctChoiceId: 'a',
          explanation: 'A raincoat and dry bag are clues that Jordan expects rain or another wet condition.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
        {
          id: 'reading-u01-l01-q12',
          type: 'multiple-choice',
          prompt: 'Which reflection uses text evidence to explain a fluency choice?',
          choices: [
            { id: 'a', text: 'I changed a word but did not reread it' },
            { id: 'b', text: 'I raced without noticing punctuation' },
            { id: 'c', text: 'I paused at a sentence break because the period showed one idea had ended' },
            { id: 'd', text: 'I skipped a sentence and gave no reason' },
          ],
          correctChoiceId: 'c',
          explanation: 'The reflection names a voice choice and the punctuation clue that supports it.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
        {
          id: 'reading-u01-l01-q13',
          type: 'true-false',
          prompt: 'True or false: During independent app practice, you can use Read aloud to compare a model with the text and then write a self-reflection.',
          choices: [
            { id: 'true', text: 'True — the model and reflection can help you check pace and meaning' },
            { id: 'false', text: 'False — the app requires another student to listen' },
          ],
          correctChoiceId: 'true',
          explanation: 'Read aloud gives you a model to compare with the text, and a self-reflection helps you explain your own pace and meaning. The app does not listen to or score your voice.',
          conceptTag: 'fluency-self-check',
          reviewCardId: 'reading-u01-l01-c3',
        },
      ],
    },
  },
  {
    id: 'reading-u01-l02',
    unitId: 'reading-u01',
    title: 'Read with Expression and Intonation',
    indicatorCodes: ['ELA.4.F.4.2'],
    crossCuttingExpectationCodes: [...READING_OE_CODES],
    intro: [
      { speaker: 'winnie', pose: 'talk', text: 'Accurate words and an appropriate pace create a strong base for fluent reading.' },
      { speaker: 'winnie', pose: 'think', text: 'Expression adds feeling and emphasis that fit the author’s meaning.' },
      { speaker: 'winnie', pose: 'talk', text: 'Intonation is the way a voice rises and falls across a sentence.' },
      { speaker: 'winnie', pose: 'cheer', text: 'Let’s use punctuation and text evidence to make meaning easier to hear and understand.' },
    ],
    learnCards: [
      {
        id: 'reading-u01-l02-c1',
        title: 'Expression reveals meaning',
        blocks: [
          { kind: 'text', text: 'Expression is not simply being loud; it means changing emphasis, tone, or volume to match the ideas and feelings in a text.' },
          { kind: 'example', text: 'In “At last, the lantern glowed,” emphasizing at last can show relief after a long wait.' },
          { kind: 'tip', text: 'Infer a speaker’s feeling from details, then cite the words that guided your voice choice.' },
        ],
        "widget": {
          "type": "context-clue-detective",
          "config": {
            "passage": "At last, the lantern glowed after the long, dark wait.",
            "targetWord": "At last",
            "clueChoices": [
              {
                "id": "long-wait",
                "text": "after the long, dark wait",
                "type": "definition"
              },
              {
                "id": "lantern",
                "text": "the lantern glowed",
                "type": "example"
              },
              {
                "id": "dark",
                "text": "dark",
                "type": "contrast"
              }
            ],
            "correctChoiceId": "long-wait"
          }
        },
        check: {
          prompt: 'What expression best fits emphasizing “at last” in the lantern sentence?',
          choices: [
            { id: 'a', text: 'A bright, relieved voice that shows “at last” means the long wait has ended' },
            { id: 'b', text: 'A flat voice that hides the relief in “at last”' },
            { id: 'c', text: 'An angry voice that does not fit the relief in “at last”' },
          ],
          correctChoiceId: 'a',
          explanation: 'The words “at last” show relief after a long wait, so a bright voice helps listeners hear that feeling.',
        },
      },
      {
        id: 'reading-u01-l02-c2',
        title: 'Intonation follows ideas and punctuation',
        blocks: [
          { kind: 'text', text: 'Intonation is the rise and fall of the voice. A question may rise, a completed statement usually settles, and punctuation helps group ideas.' },
          { kind: 'example', text: 'Compare “You found the trail?” with “You found the trail!”; the same words carry different meanings when punctuation and intonation change.' },
          { kind: 'tip', text: 'Let commas create brief pauses, but use the sentence meaning—not a rigid timer—to decide how the line should sound.' },
        ],
        check: {
          prompt: 'Which intonation fits the question, “You found the trail?”',
          choices: [
            { id: 'a', text: 'Let the voice rise a little at the end of “You found the trail?” to show a question' },
            { id: 'b', text: 'Let the voice drop as if it were a finished statement' },
            { id: 'c', text: 'Read the sentence without letting the question mark affect the voice' },
          ],
          correctChoiceId: 'a',
          explanation: 'The question mark in “You found the trail?” signals uncertainty, so a small rise helps listeners hear that the speaker is asking.',
        },
      },
      {
        id: 'reading-u01-l02-c3',
        title: 'Practice independently and reflect',
        blocks: [
          { kind: 'text', text: 'Practice with varied academic and personal texts, both orally and silently, and gradually extend how long you read with attention.' },
          { kind: 'text', text: 'For print, oral, visual, digital, or interactive texts, connect captions, images, audio, and written words before choosing an expressive reading.' },
          { kind: 'example', text: 'Preview a line, infer its feeling, read it accurately at an appropriate pace, and then explain how one text clue shaped your expression.' },
          { kind: 'tip', text: 'Use the accepted reflection format Text clue → Voice choice → Meaning connection so your reasoning is clear and complete.' },
          { kind: 'tip', text: 'Practice independently with the app: read the passage, use Read aloud to hear a model, and write a Text clue → Voice choice → Meaning connection self-reflection. The app does not listen to or score your voice.' },
        ],
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "Read the line brightly to show relief",
              "Read the line flatly to show boredom"
            ],
            "details": [
              {
                "id": "at-last",
                "text": "The words \"At last\" show that a long wait has ended.",
                "supports": [
                  "Read the line brightly to show relief"
                ]
              },
              {
                "id": "glowed",
                "text": "The lantern finally glowed after the dark.",
                "supports": [
                  "Read the line brightly to show relief"
                ]
              },
              {
                "id": "word-count",
                "text": "The sentence has five words.",
                "supports": [
                  "Read the line flatly to show boredom"
                ]
              }
            ],
            "requiredDetailCount": 2
          }
        },
        check: {
          prompt: 'Which reflection connects a text clue, a voice choice, and meaning?',
          choices: [
            { id: 'a', text: 'I used a loud voice because loud voices are always better' },
            { id: 'b', text: 'The words “at last” are my text clue; I used a bright voice because they show the wait ended' },
            { id: 'c', text: 'I read the sentence twice but cannot explain why' },
          ],
          correctChoiceId: 'b',
          explanation: 'The words “at last” are the clue, the bright voice is the choice, and relief is the meaning connection.',
        },
      },
    ],
    workedExample: {
      title: 'Give the lighthouse scene a meaningful voice',
      passage: { title: 'Original passage', text: expressionPassage },
      steps: [
        'Use rising intonation for Tomas’s first question because he is uncertain and looking for an answer.',
        'Read the quiet harbor details steadily, pausing at the paragraph breaks so listeners can picture the fog and the returning beam.',
        'Use brighter expression on “There it is!” and Tomas’s final statement because the exclamation, grin, and lighthouse beam show relief and excitement.',
      ],
    },
    quiz: {
      passThreshold: 8,
      reference: { title: 'Read this passage', text: expressionPassage },
      pool: [
        {
          id: 'reading-u01-l02-q01',
          type: 'multiple-choice',
          prompt: 'Which voice best fits Tomas’s first line, “Do you think the lighthouse can still see us?”',
          choices: [
            { id: 'a', text: 'A flat voice that ignores the question mark' },
            { id: 'b', text: 'A shouting voice on every word' },
            { id: 'c', text: 'A curious voice that rises with the question' },
            { id: 'd', text: 'A silent pause instead of the sentence' },
          ],
          correctChoiceId: 'c',
          explanation: 'A curious rising voice matches the question and helps listeners follow its meaning.',
          conceptTag: 'intonation-and-punctuation',
          reviewCardId: 'reading-u01-l02-c2',
        },
        {
          id: 'reading-u01-l02-q02',
          type: 'multiple-choice',
          prompt: 'Which line should sound brightest and most relieved?',
          choices: [
            { id: 'a', text: '“Do you think the lighthouse can still see us?” with quiet uncertainty' },
            { id: 'b', text: '“There it is!” with bright, excited relief' },
            { id: 'c', text: '“Everything was quiet” in a rushed monotone' },
            { id: 'd', text: '“Grandfather pointed” as an angry shout' },
          ],
          correctChoiceId: 'b',
          explanation: 'The exclamation and discovery show relief and excitement in “There it is!”',
          conceptTag: 'expression-and-meaning',
          reviewCardId: 'reading-u01-l02-c1',
        },
        {
          id: 'reading-u01-l02-q03',
          type: 'true-false',
          prompt: 'True or false: Reading the quiet fog description and Tomas’s excited exclamation with exactly the same tone would make the passage clearer.',
          choices: [
            { id: 'true', text: 'True — one tone fits every idea' },
            { id: 'false', text: 'False — tone should respond to meaning' },
          ],
          correctChoiceId: 'false',
          explanation: 'The quiet harbor scene and excited discovery have different feelings, so their tone should change to match the meaning.',
          conceptTag: 'expression-and-meaning',
          reviewCardId: 'reading-u01-l02-c1',
        },
        {
          id: 'reading-u01-l02-q04',
          type: 'multiple-choice',
          prompt: 'What happens immediately after the pale beam sweeps across the fog?',
          choices: [
            { id: 'a', text: 'The beam stays bright for the rest of the afternoon' },
            { id: 'b', text: 'Tomas runs across the yellow safety line' },
            { id: 'c', text: 'The beam vanishes, returns, and flashes once more' },
            { id: 'd', text: 'Grandfather unties the fishing boats' },
          ],
          correctChoiceId: 'c',
          explanation: 'The passage says the beam vanished, returned, and flashed once more after it first swept across the fog.',
          conceptTag: 'expressive-practice',
          reviewCardId: 'reading-u01-l02-c3',
        },
        {
          id: 'reading-u01-l02-q05',
          type: 'multiple-choice',
          prompt: 'Which detail best supports the inference that Grandfather is helping Tomas stay safe?',
          choices: [
            { id: 'a', text: 'He gently touches Tomas’s sleeve and tells him to stay behind the yellow line' },
            { id: 'b', text: 'He points toward the gray water' },
            { id: 'c', text: 'He waits beside the harbor' },
            { id: 'd', text: 'He smiles at the lighthouse beam' },
          ],
          correctChoiceId: 'a',
          explanation: 'Grandfather gives a safety reminder and stops Tomas from stepping too close to the edge.',
          conceptTag: 'expression-and-meaning',
          reviewCardId: 'reading-u01-l02-c1',
        },
        {
          id: 'reading-u01-l02-q06',
          type: 'multiple-choice',
          prompt: 'How should Tomas’s voice change from “Do you think the lighthouse can still see us?” to “There it is!”?',
          choices: [
            { id: 'a', text: 'Keep the same flat tone because both lines come from Tomas' },
            { id: 'b', text: 'Start curious and questioning, then become brighter and more excited when he sees the beam' },
            { id: 'c', text: 'Start angry, then become sleepy because the harbor is quiet' },
            { id: 'd', text: 'Whisper every word so the punctuation cannot be heard' },
          ],
          correctChoiceId: 'b',
          explanation: 'The question mark and Tomas’s uncertainty support a curious question, while the exclamation and discovery support a brighter, excited voice.',
          conceptTag: 'expression-and-meaning',
          reviewCardId: 'reading-u01-l02-c1',
        },
        {
          id: 'reading-u01-l02-q07',
          type: 'multiple-choice',
          prompt: 'Which reading best matches Grandfather’s line, “Stay behind the yellow line,”?',
          choices: [
            { id: 'a', text: 'Use a calm, firm voice because the line gives a safety direction' },
            { id: 'b', text: 'Raise the voice as though Grandfather is unsure' },
            { id: 'c', text: 'Pause after each letter in yellow' },
            { id: 'd', text: 'Rush through the words and ignore their warning' },
          ],
          correctChoiceId: 'a',
          explanation: 'Grandfather is giving a caring safety instruction, so a calm, firm delivery fits the meaning.',
          conceptTag: 'intonation-and-punctuation',
          reviewCardId: 'reading-u01-l02-c2',
        },
        {
          id: 'reading-u01-l02-q08',
          type: 'multiple-choice',
          prompt: 'Which sentence best states the main idea of the passage?',
          choices: [
            { id: 'a', text: 'Tomas and Grandfather safely use lighthouse and safety-sign clues to find their way through fog' },
            { id: 'b', text: 'Fishing boats should always be untied when fog arrives' },
            { id: 'c', text: 'A brass compass can make a lighthouse brighter' },
            { id: 'd', text: 'Yellow is the only color used at a harbor' },
          ],
          correctChoiceId: 'a',
          explanation: 'The passage follows Tomas and Grandfather as they notice the lighthouse, follow safety directions, and walk safely along the dock.',
          conceptTag: 'expressive-practice',
          reviewCardId: 'reading-u01-l02-c3',
        },
        {
          id: 'reading-u01-l02-q09',
          type: 'true-false',
          prompt: 'A comma can suggest a brief pause, but sentence meaning also guides the voice.',
          choices: [
            { id: 'true', text: 'True — punctuation and meaning work together' },
            { id: 'false', text: 'False — commas require the same timed pause everywhere' },
          ],
          correctChoiceId: 'true',
          explanation: 'A comma groups ideas, while the whole sentence determines the most meaningful phrasing.',
          conceptTag: 'intonation-and-punctuation',
          reviewCardId: 'reading-u01-l02-c2',
        },
        {
          id: 'reading-u01-l02-q10',
          type: 'multiple-choice',
          prompt: 'Which practice sequence best supports expressive fluency?',
          choices: [
            { id: 'a', text: 'Read every line in a flat voice and ignore the punctuation' },
            { id: 'b', text: 'Make the question and final exclamation sound exactly alike' },
            { id: 'c', text: 'Skip the dialogue and read only the sentence about the fog' },
            { id: 'd', text: 'Read with expression and intonation: raise the question, read the middle steadily, brighten the final line, and explain the text clues' },
          ],
          correctChoiceId: 'd',
          explanation: 'Punctuation and text details guide different voice choices, followed by an evidence-based reflection.',
          conceptTag: 'expressive-practice',
          reviewCardId: 'reading-u01-l02-c3',
        },
        {
          id: 'reading-u01-l02-q11',
          type: 'multiple-choice',
          prompt: 'A character says, “We made it home!” after a long walk. What feeling should the line convey?',
          choices: [
            { id: 'a', text: 'Sleepiness because the walk was long' },
            { id: 'b', text: 'Anger because the character used an exclamation point' },
            { id: 'c', text: 'Relief and excitement because the character has reached home' },
            { id: 'd', text: 'No feeling because the final line should be flat' },
          ],
          correctChoiceId: 'c',
          explanation: 'The words “made it home” and the exclamation point support a relieved, excited reading.',
          conceptTag: 'expressive-practice',
          reviewCardId: 'reading-u01-l02-c3',
        },
        {
          id: 'reading-u01-l02-q12',
          type: 'multiple-choice',
          prompt: 'Which independent app practice best supports expressive fluency?',
          choices: [
            { id: 'a', text: 'Skip the punctuation and try to finish as fast as possible' },
            { id: 'b', text: 'Read the passage, use Read aloud to hear a model, and write how a text clue shapes your voice choice' },
            { id: 'c', text: 'Give yourself a score without naming any text evidence' },
            { id: 'd', text: 'Change the passage so it sounds more exciting' },
          ],
          correctChoiceId: 'b',
          explanation: 'The model gives you a way to compare phrasing, and the reflection connects a text clue to your expressive voice choice. The app does not listen to or score your voice.',
          conceptTag: 'expressive-practice',
          reviewCardId: 'reading-u01-l02-c3',
        },
        {
          id: 'reading-u01-l02-q13',
          type: 'true-false',
          prompt: 'The reflection format Text clue → Voice choice → Meaning connection helps explain and justify an expressive reading.',
          choices: [
            { id: 'true', text: 'True — the format links evidence, choice, and meaning' },
            { id: 'false', text: 'False — quality reflection should omit text evidence' },
          ],
          correctChoiceId: 'true',
          explanation: 'The format creates clear work by connecting a voice decision to evidence and meaning.',
          conceptTag: 'expressive-practice',
          reviewCardId: 'reading-u01-l02-c3',
        },
      ],
    },
  },
] satisfies Lesson[];
