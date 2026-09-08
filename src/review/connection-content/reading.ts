import type { UnitConnection } from '../connections';

/** Each source is original practice writing and stays separate from instructional feedback. */
export const readingConnections: UnitConnection[] = [
  {
    unitId: 'reading-u01',
    foundation: 'Accurate reading preserves the words and punctuation. Use those clues, together with what happens, to choose an expression that carries the meaning.',
    source: {
      title: 'The Missing Key',
      text: 'Mara checked her backpack twice. Without the garden key, she could not water the seedlings. She searched each coat pocket, then felt something hard beneath a folded tissue. “There it is!” Mara said. Her shoulders relaxed, and she smiled as she hurried toward the gate.',
    },
    question: {
      id: 'reading-u01-l02-q99', type: 'multiple-choice', conceptTag: 'expressive-practice', reviewCardId: 'reading-u01-l02-c3',
      prompt: 'You are practicing the line “There it is!” silently or aloud. Which plan keeps the words accurate and uses the story to guide expression?',
      choices: [
        { id: 'worried-question', text: 'Read “Where is it?” with worry, because Mara searched earlier.' },
        { id: 'relieved', text: 'Read the printed words with relief, then pause; finding the key lets Mara water the seedlings.' },
        { id: 'angry', text: 'Shout angrily; every exclamation mark means the speaker is angry.' },
        { id: 'skip', text: 'Skip “it” and rush through the line; speed matters more than meaning.' },
      ],
      correctChoiceId: 'relieved',
      explanation: 'The line says “There it is!” rather than asking where the key is. Mara has found what she needs, her shoulders relax, and she smiles. Those details support relief. Keeping every word and pausing at the sentence end preserves the meaning while expression shows how the event changes her feeling.',
    },
  },
  {
    unitId: 'reading-u02',
    foundation: 'Context clues suggest a meaning. Check that meaning against a reference entry so you choose the sense that fits this sentence.',
    source: {
      title: 'Packing the Seeds and a Practice Dictionary Entry',
      text: 'Omar poured the dry seeds into an envelope. He folded the flap and pressed tape across the opening to seal it. He shook the envelope gently; no seeds fell out.\n\nPractice dictionary: seal. Noun: 1. a sea mammal with flippers; 2. an official mark stamped on something. Verb: 1. to close an opening securely; 2. to make an agreement final.',
    },
    question: {
      id: 'reading-u02-l03-q99', type: 'multiple-choice', conceptTag: 'precise-meaning', reviewCardId: 'reading-u02-l03-c3',
      prompt: 'Which entry meaning fits “seal it,” and which context detail checks that meaning?',
      choices: [
        { id: 'animal', text: 'A sea mammal; seeds are living things.' },
        { id: 'official-mark', text: 'An official mark; the envelope could have a stamp.' },
        { id: 'agreement', text: 'Make an agreement final; Omar agrees to plant the seeds.' },
        { id: 'close', text: 'Close an opening securely; the tape covers the opening and keeps seeds inside.' },
      ],
      correctChoiceId: 'close',
      explanation: 'In this sentence, “seal” names an action, so look at the verb meanings. Tape across an opening and seeds staying inside support “close an opening securely.” The passage describes no agreement, official mark, or sea mammal. The sentence context selects one precise meaning from the entry.',
    },
  },
  {
    unitId: 'reading-u03',
    foundation: 'Use nearby details to work out an unfamiliar word. Its meaning can help explain how a story’s setting causes a problem and changes a character’s plan.',
    source: {
      title: 'A Sign for the Garden',
      text: 'Mina proudly tied her cardboard sign to the garden gate. By noon, rain had soaked through it. The sodden sign dripped, sagged, and tore beside one string. Mina carried it into the shed. She found a spare wooden board and painted the garden name on it. The next rainy morning, her new sign still hung firmly at the gate.',
    },
    question: {
      id: 'reading-u03-l01-q99', type: 'multiple-choice', conceptTag: 'plot-development', reviewCardId: 'reading-u03-l01-c3',
      prompt: 'How does working out the meaning of “sodden” help explain why Mina changes her plan?',
      choices: [
        { id: 'wet-problem', text: 'It means very wet; rain damages the cardboard, so Mina chooses a wooden board.' },
        { id: 'proud', text: 'It means proud; Mina wants to hang more cardboard signs.' },
        { id: 'bright', text: 'It means brightly painted; Mina thinks the garden name is too colorful.' },
        { id: 'windy', text: 'It means blown away; wind carries the wooden sign off the gate.' },
      ],
      correctChoiceId: 'wet-problem',
      explanation: '“Soaked,” “dripped,” and “sagged” show that “sodden” means very wet. This word connects the rainy setting to the damaged cardboard. That problem leads Mina to replace the material, and the new sign stays up. The context-clue meaning helps explain the cause-and-effect links in the plot.',
    },
  },
  {
    unitId: 'reading-u04',
    foundation: 'Track a character’s early choice and later choice. That change, together with its result, can support a message that reaches beyond one story.',
    source: {
      title: 'The Last Blue Tile',
      text: 'Eli kept the last blue tile beside his own mosaic. Across the table, Noor had an empty space in her river. Eli looked at his finished blue border, then slid the spare tile toward her. Later, one of Eli’s green pieces cracked. Noor opened her box and offered a green tile. Both mosaics were ready for the display by afternoon.',
    },
    question: {
      id: 'reading-u04-l01-q99', type: 'multiple-choice', conceptTag: 'theme-development', reviewCardId: 'reading-u04-l01-c3',
      prompt: 'Which explanation connects Eli’s change to a theme supported by the whole story?',
      choices: [
        { id: 'topic', text: 'The theme is blue and green tiles because the story names both colors.' },
        { id: 'keep-extras', text: 'Keeping every extra piece is best because Eli begins by saving his tile.' },
        { id: 'sharing', text: 'Sharing can help people succeed together: Eli gives a spare tile, Noor later helps him, and both finish.' },
        { id: 'always-repaid', text: 'Every gift is always repaid immediately because Noor gives Eli a tile.' },
      ],
      correctChoiceId: 'sharing',
      explanation: 'Eli moves from keeping a spare tile to helping Noor. Noor later helps when his piece breaks, and both mosaics are finished. The linked choices and result support a broader message about sharing and cooperation. Colors are only a topic, and one story does not establish that every gift will always be repaid.',
    },
  },
  {
    unitId: 'reading-u05',
    foundation: 'A theme needs evidence that supports a whole message. Use that same evidence habit with an informational central idea, while keeping the focus on what the text explains.',
    source: {
      title: 'The Tool Shelf',
      text: 'A small shelf beside the school garden holds tools for anyone working there. Each tool has a picture label showing its place. New gardeners match a tool to its picture when they put it away. A sign-out card tells other gardeners which tools are in use. At the end of the day, empty labeled spaces show which tools still need to be returned. The shelf was painted yellow last summer.',
    },
    question: {
      id: 'reading-u05-l01-q99', type: 'multiple-choice', conceptTag: 'idea-development', reviewCardId: 'reading-u05-l01-c3',
      prompt: 'Which central idea and detail connection best explain this information?',
      choices: [
        { id: 'paint', text: 'Yellow paint makes tools work better; the shelf was painted last summer.' },
        { id: 'organization', text: 'A shared tool shelf can help gardeners track tools; picture labels show where tools belong, and cards show which are in use.' },
        { id: 'moral', text: 'Bravery always brings a reward; the gardeners must be brave to use tools.' },
        { id: 'one-detail', text: 'Some spaces are empty; that is all the article explains.' },
      ],
      correctChoiceId: 'organization',
      explanation: 'Most details explain how the shelf helps people locate, return, and track shared tools. Picture labels identify each place, while sign-out cards account for tools being used. These details develop the organization idea in different ways. The paint color is incidental, and the text gives no story evidence for a bravery theme.',
    },
  },
  {
    unitId: 'reading-u06',
    foundation: 'A central idea tells what the whole article explains. Use supporting details to build a short, accurate summary without adding an opinion.',
    source: {
      title: 'Keeping the Trail Easy to Follow',
      text: 'Trail workers help visitors follow the marsh path. At each fork, a sign names the next stop and an arrow points toward it. Workers trim branches that hide the signs. They check the arrows after storms and replace loose posts. A map at the entrance shows the same stop names used along the trail. Last Tuesday, a worker carried the replacement signs in a purple wagon.',
    },
    question: {
      id: 'reading-u06-l02-q99', type: 'multiple-choice', conceptTag: 'informational-summary', reviewCardId: 'reading-u06-l02-c3',
      prompt: 'Which summary combines the central idea with useful details and stays faithful to the article?',
      choices: [
        { id: 'wagon', text: 'A worker had a purple wagon on Tuesday. Signs can fit in wagons.' },
        { id: 'opinion', text: 'The marsh trail is the best trail, and everyone should visit it immediately.' },
        { id: 'changed-fact', text: 'Workers remove all trail signs after storms so visitors will use only the entrance map.' },
        { id: 'main-details', text: 'Workers keep the marsh trail easy to follow by placing and maintaining clear signs that match the entrance map.' },
      ],
      correctChoiceId: 'main-details',
      explanation: 'The article focuses on helping visitors follow the path. Sign placement, maintenance, and matching stop names explain how workers do that. The chosen summary combines those related details in new wording and leaves out the wagon color. It adds no recommendation and does not change the facts about storm checks.',
    },
  },
  {
    unitId: 'reading-u07',
    foundation: 'A central idea organizes the written details. Read a visual’s labels just as carefully, then explain the specific information it adds to that idea.',
    source: {
      title: 'Two Water Stops',
      text: 'Trail notice: Visitors can refill water bottles at two stops along the loop. Use the trail map to decide where to refill before setting out.\n\nMap description: A loop begins and ends at Entrance. Clockwise, the marked locations are Entrance, Reed Shelter, Lookout, and Pine Shelter. A water-drop symbol appears at Entrance and Pine Shelter only. The key says “water drop = bottle refill tap.” No distances or travel times are shown.',
    },
    question: {
      id: 'reading-u07-l02-q99', type: 'multiple-choice', conceptTag: 'visual-text-connection', reviewCardId: 'reading-u07-l02-c2',
      prompt: 'Which explanation correctly connects the map information to the notice?',
      choices: [
        { id: 'locations', text: 'The notice says there are two refill stops; the map names them as Entrance and Pine Shelter.' },
        { id: 'all-stops', text: 'The notice says every stop has water, and the map confirms that.' },
        { id: 'time', text: 'The map proves a walk between the two taps takes ten minutes.' },
        { id: 'lookout', text: 'The map adds a refill tap at Lookout because Lookout is named on it.' },
      ],
      correctChoiceId: 'locations',
      explanation: 'The notice gives the general information: two places offer refills. The key tells what the water-drop symbol means, and those symbols identify Entrance and Pine Shelter. Combining words and map answers where the stops are. A named location without that symbol is not a listed tap, and the map supplies no timing evidence.',
    },
  },
  {
    unitId: 'reading-u08',
    foundation: 'Read labels and counts carefully before using them as evidence. Then explain how the information supports a reason for a claim, including its limits.',
    source: {
      title: 'A Shelf for Returned Books',
      text: 'Proposal: The library should keep the new return shelf near the door. It gives readers a place to leave books they have finished using.\n\nLibrarian’s record — books left on reading tables at closing: Monday, before the return shelf: 18 books. Tuesday, with the shelf: 7 books. Wednesday, with the shelf: 6 books. The library was open for the same hours each day. Visitor totals were not recorded.',
    },
    question: {
      id: 'reading-u08-l02-q99', type: 'multiple-choice', conceptTag: 'claim-evidence', reviewCardId: 'reading-u08-l02-c3',
      prompt: 'Which use of the record best supports the proposal without claiming more than the evidence shows?',
      choices: [
        { id: 'guarantee', text: 'The shelf guarantees that no books will ever be left on tables again.' },
        { id: 'more-visitors', text: 'More visitors came on Tuesday, proving that people prefer the shelf.' },
        { id: 'supported-limit', text: 'Fewer books were left on tables on both shelf days, supporting its usefulness; unknown visitor totals limit the comparison.' },
        { id: 'repeat', text: 'The shelf should stay because the library should keep the shelf.' },
      ],
      correctChoiceId: 'supported-limit',
      explanation: 'The count drops from 18 books before the shelf to 7 and 6 on the two shelf days. That pattern supports the reason that a return place may help keep tables clear. The unrecorded visitor totals mean the days may differ in another way, so the record supports a limited claim rather than a guarantee or a proven cause.',
    },
  },
  {
    unitId: 'reading-u09',
    foundation: 'Story events grow from what characters do. Compare how two characters understand the same event to explain their different actions and the resulting change in the plot.',
    source: {
      title: 'Moving the Seedlings',
      text: 'When the seedlings were moved away from the window, Bea frowned. “Now they will not get enough light,” she said. Luis placed them on a shelf beside a growing lamp. “This spot will keep them away from the cold window at night,” he explained. Bea had not noticed the lamp. She checked that it shone on every tray, then helped Luis arrange the pots. They agreed to check the plants each morning.',
    },
    question: {
      id: 'reading-u09-l02-q99', type: 'multiple-choice', conceptTag: 'perspective-impact', reviewCardId: 'reading-u09-l02-c3',
      prompt: 'How do the different perspectives on moving the seedlings shape what happens next?',
      choices: [
        { id: 'same-view', text: 'Both characters think the move removes all light, so they put the plants outside.' },
        { id: 'new-understanding', text: 'Bea worries about light while Luis focuses on cold; learning about the lamp helps Bea join his plan.' },
        { id: 'ignores', text: 'Luis refuses to explain the move, so Bea leaves without helping.' },
        { id: 'no-impact', text: 'Their perspectives have no effect because neither character changes an action.' },
      ],
      correctChoiceId: 'new-understanding',
      explanation: 'Bea’s first words show a concern about losing light. Luis’s words show a concern about cold and identify another light source. Once Bea notices and checks the lamp, she helps arrange the pots. The contrast first creates concern; sharing the missing information changes her reaction and leads to a joint plan within the story.',
    },
  },
  {
    unitId: 'reading-u10',
    foundation: 'Context clues help you infer meaning, and expressive reading follows that meaning. Use both to explain how a nonliteral phrase shapes the feeling of a passage.',
    source: {
      title: 'After the Rain',
      text: 'The rain stopped tapping the porch roof. Lila stepped outside and listened. In the quiet yard, the creek whispered over the stones. She sat on the lowest step, loosened the knot in her shoulders, and watched a leaf drift around the bend. Even the dog settled beside her without a bark.',
    },
    question: {
      id: 'reading-u10-l03-q99', type: 'multiple-choice', conceptTag: 'reader-experience', reviewCardId: 'reading-u10-l03-c3',
      prompt: 'What does “the creek whispered” add to this passage, and what reading choice fits its effect?',
      choices: [
        { id: 'literal-words', text: 'The creek speaks actual words; use a questioning voice to ask what it said.' },
        { id: 'urgent', text: 'The creek is dangerously loud; shout the line with urgency.' },
        { id: 'label-only', text: 'It is figurative language, so the surrounding details do not matter.' },
        { id: 'quiet-mood', text: 'The water makes a soft sound, adding to a calm mood; read the line gently at an unhurried pace.' },
      ],
      correctChoiceId: 'quiet-mood',
      explanation: 'A creek cannot whisper words, but moving water can make a soft sound. “Whispered,” the quiet yard, Lila relaxing, and the settled dog work together to create calm. A gentle, unhurried reading carries that effect. Naming the figure alone would not explain what it helps the reader imagine or feel.',
    },
  },
  {
    unitId: 'reading-u11',
    foundation: 'A summary keeps the important idea while changing the wording. Research writing also needs credit for that borrowed idea, even when you paraphrase it.',
    source: {
      title: 'Practice Research Source: Keeping Shared Paintbrushes Useful',
      text: 'This is an original practice source.\nAuthor: Tessa Lane\nTitle: Keeping Shared Paintbrushes Useful\nPublisher: Cram All Art Notes\nYear: 2026\n\nSource paragraph: “Wash water-based paint from brushes before it dries. Shape the damp bristles gently, then let the brushes dry flat. These small steps keep dried paint from stiffening the bristles and help the brushes stay useful for later projects.”',
    },
    question: {
      id: 'reading-u11-l05-q99', type: 'multiple-choice', conceptTag: 'attribution-check', reviewCardId: 'reading-u11-l05-c3',
      prompt: 'You are writing about caring for shared art tools. Which note faithfully paraphrases the relevant idea and gives the required source credit?',
      choices: [
        { id: 'credited-paraphrase', text: 'According to Tessa Lane, cleaning brushes promptly and drying them carefully helps preserve them. Tessa Lane — Keeping Shared Paintbrushes Useful — Cram All Art Notes — 2026.' },
        { id: 'uncredited-copy', text: 'Wash water-based paint from brushes before it dries. These are my own words, so no source is needed.' },
        { id: 'reversed', text: 'According to Tessa Lane, leave paint to dry on brushes to keep them useful. Tessa Lane — Keeping Shared Paintbrushes Useful — Cram All Art Notes — 2026.' },
        { id: 'invented-credit', text: 'Cleaning brushes promptly helps preserve them. Tessa Lane — Keeping Shared Paintbrushes Useful — National Museum of Art — 2025.' },
      ],
      correctChoiceId: 'credited-paraphrase',
      explanation: 'The chosen note preserves the source’s care idea in new wording and identifies whose idea it is. Its citation uses the provided author, title, publisher, and year. A paraphrase still needs credit. Copying without quotation marks, reversing the care advice, or inventing publication details would make the note unreliable.',
    },
  },
];
