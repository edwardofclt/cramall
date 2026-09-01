import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit10Lessons = [
  {
    "id": "reading-u10-l01",
    "unitId": "reading-u10",
    "title": "Compare Narratives, Dramas, and Poems",
    "indicatorCodes": [
      "ELA.4.AOR.5.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Genres can share content while organizing it differently."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Structure shapes how readers receive action, speech, pacing, and imagery."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s compare exact elements across three parallel forms."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u10-l01-c1",
        "title": "Notice Narrative Structure",
        "blocks": [
          {
            "kind": "text",
            "text": "Narratives use sentences and paragraphs, a narrator, description, dialogue, and sequenced events."
          },
          {
            "kind": "example",
            "text": "The narrator tells Nora’s actions and explains why Mr. Lee smiles."
          },
          {
            "kind": "tip",
            "text": "Paragraph breaks group the discovery and return."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which element belongs especially to the narrative form here?",
          "choices": [
            {
              "id": "a",
              "text": "a narrator explaining actions"
            },
            {
              "id": "b",
              "text": "speaker labels"
            },
            {
              "id": "c",
              "text": "three stanzas"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The prose narrator reports and connects events."
        }
      },
      {
        "id": "reading-u10-l01-c2",
        "title": "Read Drama Structure",
        "blocks": [
          {
            "kind": "text",
            "text": "Drama uses speaker labels, dialogue, stage directions, acts/scenes, and performance-ready action."
          },
          {
            "kind": "example",
            "text": "Bracketed directions show the stage, lantern, handoff, and exit."
          },
          {
            "kind": "tip",
            "text": "Readers infer tone from dialogue and directions."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "What do brackets contribute?",
          "choices": [
            {
              "id": "a",
              "text": "stage directions for visible action"
            },
            {
              "id": "b",
              "text": "a narrator’s paragraph"
            },
            {
              "id": "c",
              "text": "rhyme"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The bracketed text directs setting and movement."
        }
      },
      {
        "id": "reading-u10-l01-c3",
        "title": "Read Poetry Structure",
        "blocks": [
          {
            "kind": "text",
            "text": "Poems use lines and stanzas; rhythm, repetition, and imagery compress experience."
          },
          {
            "kind": "example",
            "text": "“last small moon” creates a visual comparison for the lantern."
          },
          {
            "kind": "tip",
            "text": "Explain how line/stanza choices affect emphasis or pace."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "What does “last small moon” add?",
          "choices": [
            {
              "id": "a",
              "text": "a compact image of the lantern in darkness"
            },
            {
              "id": "b",
              "text": "a literal moon fact"
            },
            {
              "id": "c",
              "text": "a speaker label"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The metaphor creates imagery."
        }
      }
    ],
    "workedExample": {
      "title": "Compare one event across narrative, drama, and poem",
      "passage": {
        "title": "The Last Lantern",
        "text": "The Last Lantern — narrative\n\nNora checked the tables after the evening festival. Every paper lantern had been collected except one glowing beside the empty stage. She carried it toward the gate, where Mr. Lee was searching the dark path.\n\n“This must be yours,” Nora said. Mr. Lee smiled because the lantern marked the path to his family’s booth. Nora handed it back, and together they watched its warm circle move through the dark.\n\nThe Last Lantern — one-scene drama\n\n[An empty festival stage at night. One lantern glows.]\nNORA: One lantern is still here.\nMR. LEE: I have been searching for it. It marks the path to our booth.\n[Nora lifts the lantern and hands it to him.]\nNORA: Then it can guide you back.\nMR. LEE: Thank you.\n[They exit as the lantern’s light moves along the path.]\n\nThe Last Lantern — free-verse poem\n\nOne lantern waits\nbeside the quiet stage,\na warm circle in the dark.\n\nNora lifts the glow.\nA searching face softens;\nthe lost light finds its hand.\n\nDown the festival path\ntwo figures follow\nthe last small moon."
      },
      "steps": [
        "Hold the shared event constant: Nora returns a lantern.",
        "Name how each form presents action and speech.",
        "Explain how prose develops sequence, drama makes action performable, and poetry compresses the image."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “The Last Lantern”",
        "text": "The Last Lantern — narrative\n\nNora checked the tables after the evening festival. Every paper lantern had been collected except one glowing beside the empty stage. She carried it toward the gate, where Mr. Lee was searching the dark path.\n\n“This must be yours,” Nora said. Mr. Lee smiled because the lantern marked the path to his family’s booth. Nora handed it back, and together they watched its warm circle move through the dark.\n\nThe Last Lantern — one-scene drama\n\n[An empty festival stage at night. One lantern glows.]\nNORA: One lantern is still here.\nMR. LEE: I have been searching for it. It marks the path to our booth.\n[Nora lifts the lantern and hands it to him.]\nNORA: Then it can guide you back.\nMR. LEE: Thank you.\n[They exit as the lantern’s light moves along the path.]\n\nThe Last Lantern — free-verse poem\n\nOne lantern waits\nbeside the quiet stage,\na warm circle in the dark.\n\nNora lifts the glow.\nA searching face softens;\nthe lost light finds its hand.\n\nDown the festival path\ntwo figures follow\nthe last small moon."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which feature organizes the narrative?",
          "choices": [
            {
              "id": "a",
              "text": "paragraphs and a narrator"
            },
            {
              "id": "b",
              "text": "speaker labels only"
            },
            {
              "id": "c",
              "text": "stanzas only"
            },
            {
              "id": "d",
              "text": "a data table"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Narrative prose uses paragraphs and narration.",
          "id": "reading-u10-l01-q01",
          "conceptTag": "narrative-structure",
          "reviewCardId": "reading-u10-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "The narrative includes both narration and dialogue.",
          "choices": [
            {
              "id": "true",
              "text": "True — the narrator reports and Nora speaks"
            },
            {
              "id": "false",
              "text": "False — only stage directions appear"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Both forms are visible.",
          "id": "reading-u10-l01-q02",
          "conceptTag": "narrative-structure",
          "reviewCardId": "reading-u10-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the narrator add?",
          "choices": [
            {
              "id": "a",
              "text": "a rhyme scheme"
            },
            {
              "id": "b",
              "text": "a cast list"
            },
            {
              "id": "c",
              "text": "connections among actions and Mr. Lee’s response"
            },
            {
              "id": "d",
              "text": "lighting instructions only"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The narrator explains sequence and reason.",
          "id": "reading-u10-l01-q03",
          "conceptTag": "narrative-structure",
          "reviewCardId": "reading-u10-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "How are events grouped?",
          "choices": [
            {
              "id": "a",
              "text": "by table rows"
            },
            {
              "id": "b",
              "text": "by acts only"
            },
            {
              "id": "c",
              "text": "by repeated chorus"
            },
            {
              "id": "d",
              "text": "into paragraphs moving from discovery to return"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The paragraph structure organizes the plot.",
          "id": "reading-u10-l01-q04",
          "conceptTag": "narrative-structure",
          "reviewCardId": "reading-u10-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which feature identifies who speaks in the drama?",
          "choices": [
            {
              "id": "a",
              "text": "quotation marks alone"
            },
            {
              "id": "b",
              "text": "speaker labels NORA and MR. LEE"
            },
            {
              "id": "c",
              "text": "stanza breaks"
            },
            {
              "id": "d",
              "text": "narrator comments"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Labels assign lines.",
          "id": "reading-u10-l01-q05",
          "conceptTag": "drama-structure",
          "reviewCardId": "reading-u10-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "Bracketed text gives stage directions.",
          "choices": [
            {
              "id": "true",
              "text": "True — it guides setting and action"
            },
            {
              "id": "false",
              "text": "False — it is spoken dialogue"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The bracketed lines are performance cues.",
          "id": "reading-u10-l01-q06",
          "conceptTag": "drama-structure",
          "reviewCardId": "reading-u10-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What can actors perform directly?",
          "choices": [
            {
              "id": "a",
              "text": "a narrator’s hidden explanation only"
            },
            {
              "id": "b",
              "text": "a glossary"
            },
            {
              "id": "c",
              "text": "dialogue and stage directions"
            },
            {
              "id": "d",
              "text": "a rainfall table"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Drama presents words and actions.",
          "id": "reading-u10-l01-q07",
          "conceptTag": "drama-structure",
          "reviewCardId": "reading-u10-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does the one-scene structure affect pacing?",
          "choices": [
            {
              "id": "a",
              "text": "It adds years of backstory"
            },
            {
              "id": "b",
              "text": "It separates three narrators"
            },
            {
              "id": "c",
              "text": "It repeats every event"
            },
            {
              "id": "d",
              "text": "It presents the discovery and handoff as one continuous moment"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "One scene keeps the action immediate.",
          "id": "reading-u10-l01-q08",
          "conceptTag": "drama-structure",
          "reviewCardId": "reading-u10-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which structure organizes the poem?",
          "choices": [
            {
              "id": "a",
              "text": "lines grouped into three stanzas"
            },
            {
              "id": "b",
              "text": "paragraphs and chapters"
            },
            {
              "id": "c",
              "text": "speaker labels"
            },
            {
              "id": "d",
              "text": "numbered steps"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The poem visibly has lines/stanzas.",
          "id": "reading-u10-l01-q09",
          "conceptTag": "poetry-structure",
          "reviewCardId": "reading-u10-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "The poem uses imagery to compress the lantern event.",
          "choices": [
            {
              "id": "true",
              "text": "True — glow, circle, and moon create images"
            },
            {
              "id": "false",
              "text": "False — it only states facts"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Imagery carries meaning concisely.",
          "id": "reading-u10-l01-q10",
          "conceptTag": "poetry-structure",
          "reviewCardId": "reading-u10-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "What receives emphasis from its own line?",
          "choices": [
            {
              "id": "a",
              "text": "the title only"
            },
            {
              "id": "b",
              "text": "“Nora lifts the glow”"
            },
            {
              "id": "c",
              "text": "a stage label"
            },
            {
              "id": "d",
              "text": "Mr. Lee’s explanation paragraph"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Line placement highlights the action.",
          "id": "reading-u10-l01-q11",
          "conceptTag": "poetry-structure",
          "reviewCardId": "reading-u10-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How do stanza breaks organize meaning?",
          "choices": [
            {
              "id": "a",
              "text": "They assign actors"
            },
            {
              "id": "b",
              "text": "They define words"
            },
            {
              "id": "c",
              "text": "They separate waiting, return, and departure"
            },
            {
              "id": "d",
              "text": "They number paragraphs"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The three moments align to stanzas.",
          "id": "reading-u10-l01-q12",
          "conceptTag": "poetry-structure",
          "reviewCardId": "reading-u10-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which comparison is accurate?",
          "choices": [
            {
              "id": "a",
              "text": "All forms use identical structure"
            },
            {
              "id": "b",
              "text": "Only drama has events"
            },
            {
              "id": "c",
              "text": "Poetry cannot show action"
            },
            {
              "id": "d",
              "text": "Narrative explains through prose, drama stages dialogue/action, and poetry emphasizes images through lines/stanzas"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It compares structural elements.",
          "id": "reading-u10-l01-q13",
          "conceptTag": "poetry-structure",
          "reviewCardId": "reading-u10-l01-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u10-l02",
    "unitId": "reading-u10",
    "title": "Interpret Literal and Nonliteral Language",
    "indicatorCodes": [
      "ELA.4.AOR.8.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Some language states exactly; some creates meaning through comparison or expression."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Word relationships also sharpen meaning."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s paraphrase each phrase precisely."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u10-l02-c1",
        "title": "Distinguish Literal and Nonliteral Meaning",
        "blocks": [
          {
            "kind": "text",
            "text": "Literal words mean what they state; nonliteral phrases need interpretation."
          },
          {
            "kind": "example",
            "text": "Three wooden steps are literal; “piece of cake” means easy."
          },
          {
            "kind": "tip",
            "text": "Check whether the literal reading makes sense in context."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which phrase is literal?",
          "choices": [
            {
              "id": "a",
              "text": "three wooden steps"
            },
            {
              "id": "b",
              "text": "piece of cake"
            },
            {
              "id": "c",
              "text": "market was a beehive"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The passage describes actual boards."
        }
      },
      {
        "id": "reading-u10-l02-c2",
        "title": "Explain Similes, Metaphors, and Idioms",
        "blocks": [
          {
            "kind": "text",
            "text": "Simile uses like/as; metaphor directly compares; idiom has a conventional meaning."
          },
          {
            "kind": "example",
            "text": "busy as bees = very busy; market was a beehive = crowded/active; piece of cake = easy."
          },
          {
            "kind": "tip",
            "text": "Always give the meaning, not just the device."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "widget": {
          "type": "figurative-language-matcher",
          "config": {
            "pairs": [
              {
                "id": "simile",
                "phrase": "busy as a bee",
                "kind": "simile",
                "meaning": "very busy"
              },
              {
                "id": "metaphor",
                "phrase": "the market was a beehive",
                "kind": "metaphor",
                "meaning": "the market was crowded and active"
              },
              {
                "id": "idiom",
                "phrase": "the setup was a piece of cake",
                "kind": "idiom",
                "meaning": "the setup was easy"
              }
            ]
          }
        },
        "check": {
          "prompt": "What does “market was a beehive” mean?",
          "choices": [
            {
              "id": "a",
              "text": "the market was crowded and active"
            },
            {
              "id": "b",
              "text": "bees replaced vendors"
            },
            {
              "id": "c",
              "text": "the market sold only honey"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The source directly paraphrases the metaphor."
        }
      },
      {
        "id": "reading-u10-l02-c3",
        "title": "Use Word Relationships to Clarify Meaning",
        "blocks": [
          {
            "kind": "text",
            "text": "Synonyms are alike, antonyms are opposite, and contrast clues set meanings against each other."
          },
          {
            "kind": "example",
            "text": "Ripe/fully ready are synonyms; ripe/unripe are antonyms; quiet/noisy contrast."
          },
          {
            "kind": "tip",
            "text": "Name the relationship and use it to clarify the target."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "What is an antonym of ripe?",
          "choices": [
            {
              "id": "a",
              "text": "unripe"
            },
            {
              "id": "b",
              "text": "ready"
            },
            {
              "id": "c",
              "text": "peach"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The source identifies the opposite."
        }
      }
    ],
    "workedExample": {
      "title": "Interpret figures and word relationships in context",
      "passage": {
        "title": "Market Morning",
        "text": "Market Morning\n\nBefore customers arrived, Lena climbed the three wooden steps to the produce stand. The steps were literal boards. Setting out baskets was a piece of cake because her checklist was clear. Soon vendors became busy as bees, moving quickly from crate to table.\n\nBy nine o’clock, the market was a beehive. No giant hive replaced the square; the metaphor means the market was crowded and active. Lena’s aunt called the peaches ripe, or fully ready to eat. Unripe is the antonym of ripe. Nearby, a quiet corner contrasted with the noisy main aisle.\n\nLiteral language means exactly what the words ordinarily state. Nonliteral language asks readers to interpret a comparison or familiar expression. A simile compares using like or as; a metaphor says one thing is another; an idiom has a meaning not found by combining each word literally. Synonyms have similar meanings, antonyms have opposite meanings, and contrasts can clarify both."
      },
      "steps": [
        "Decide whether the phrase is literal.",
        "If nonliteral, name the kind and paraphrase it.",
        "Use nearby synonym/antonym/contrast relationships to confirm meaning."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Market Morning”",
        "text": "Market Morning\n\nBefore customers arrived, Lena climbed the three wooden steps to the produce stand. The steps were literal boards. Setting out baskets was a piece of cake because her checklist was clear. Soon vendors became busy as bees, moving quickly from crate to table.\n\nBy nine o’clock, the market was a beehive. No giant hive replaced the square; the metaphor means the market was crowded and active. Lena’s aunt called the peaches ripe, or fully ready to eat. Unripe is the antonym of ripe. Nearby, a quiet corner contrasted with the noisy main aisle.\n\nLiteral language means exactly what the words ordinarily state. Nonliteral language asks readers to interpret a comparison or familiar expression. A simile compares using like or as; a metaphor says one thing is another; an idiom has a meaning not found by combining each word literally. Synonyms have similar meanings, antonyms have opposite meanings, and contrasts can clarify both."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which phrase is literal?",
          "choices": [
            {
              "id": "a",
              "text": "climbed three wooden steps"
            },
            {
              "id": "b",
              "text": "setup was a piece of cake"
            },
            {
              "id": "c",
              "text": "busy as bees"
            },
            {
              "id": "d",
              "text": "market was a beehive"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Actual boards are described.",
          "id": "reading-u10-l02-q01",
          "conceptTag": "literal-nonliteral",
          "reviewCardId": "reading-u10-l02-c1"
        },
        {
          "type": "true-false",
          "prompt": "“Piece of cake” means the setup was easy, not that food was the setup.",
          "choices": [
            {
              "id": "true",
              "text": "True — it is an idiom"
            },
            {
              "id": "false",
              "text": "False — it names dessert literally"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The context and source define it.",
          "id": "reading-u10-l02-q02",
          "conceptTag": "literal-nonliteral",
          "reviewCardId": "reading-u10-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "How can a reader test literal meaning?",
          "choices": [
            {
              "id": "a",
              "text": "Count letters"
            },
            {
              "id": "b",
              "text": "Look only for as"
            },
            {
              "id": "c",
              "text": "Ask whether the ordinary meaning fits the context"
            },
            {
              "id": "d",
              "text": "Assume every phrase is figurative"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Context distinguishes use.",
          "id": "reading-u10-l02-q03",
          "conceptTag": "literal-nonliteral",
          "reviewCardId": "reading-u10-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which statement is accurate?",
          "choices": [
            {
              "id": "a",
              "text": "All comparisons are literal"
            },
            {
              "id": "b",
              "text": "All nouns are metaphors"
            },
            {
              "id": "c",
              "text": "Idioms always use like"
            },
            {
              "id": "d",
              "text": "The same word can be literal in one context and nonliteral in another"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Context controls meaning.",
          "id": "reading-u10-l02-q04",
          "conceptTag": "literal-nonliteral",
          "reviewCardId": "reading-u10-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What kind is “busy as bees”?",
          "choices": [
            {
              "id": "a",
              "text": "metaphor"
            },
            {
              "id": "b",
              "text": "simile"
            },
            {
              "id": "c",
              "text": "idiom"
            },
            {
              "id": "d",
              "text": "literal fact"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "As signals a simile.",
          "id": "reading-u10-l02-q05",
          "conceptTag": "figurative-meaning",
          "reviewCardId": "reading-u10-l02-c2"
        },
        {
          "type": "true-false",
          "prompt": "“The market was a beehive” is a metaphor.",
          "choices": [
            {
              "id": "true",
              "text": "True — it directly compares the market to a hive"
            },
            {
              "id": "false",
              "text": "False — it uses like"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The direct comparison is metaphor.",
          "id": "reading-u10-l02-q06",
          "conceptTag": "figurative-meaning",
          "reviewCardId": "reading-u10-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the metaphor mean?",
          "choices": [
            {
              "id": "a",
              "text": "The square became wax"
            },
            {
              "id": "b",
              "text": "Only bees shopped"
            },
            {
              "id": "c",
              "text": "The market was crowded and active"
            },
            {
              "id": "d",
              "text": "The market was silent"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The text gives that meaning.",
          "id": "reading-u10-l02-q07",
          "conceptTag": "figurative-meaning",
          "reviewCardId": "reading-u10-l02-c2"
        },
        {
          "type": "fill-blank",
          "prompt": "The idiom “a piece of cake” means ___.",
          "acceptedAnswers": [
            "easy",
            "simple"
          ],
          "explanation": "The passage states the setup was easy.",
          "id": "reading-u10-l02-q08",
          "conceptTag": "figurative-meaning",
          "reviewCardId": "reading-u10-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which pair are synonyms in the source?",
          "choices": [
            {
              "id": "a",
              "text": "ripe and fully ready"
            },
            {
              "id": "b",
              "text": "ripe and unripe"
            },
            {
              "id": "c",
              "text": "quiet and noisy"
            },
            {
              "id": "d",
              "text": "market and bee"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "They share meaning.",
          "id": "reading-u10-l02-q09",
          "conceptTag": "word-relationships",
          "reviewCardId": "reading-u10-l02-c3"
        },
        {
          "type": "true-false",
          "prompt": "Ripe and unripe are antonyms.",
          "choices": [
            {
              "id": "true",
              "text": "True — they are opposites"
            },
            {
              "id": "false",
              "text": "False — they mean the same"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The prefix un- creates the opposite.",
          "id": "reading-u10-l02-q10",
          "conceptTag": "word-relationships",
          "reviewCardId": "reading-u10-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does quiet clarify noisy?",
          "choices": [
            {
              "id": "a",
              "text": "They rhyme"
            },
            {
              "id": "b",
              "text": "Their contrast highlights opposite sound levels"
            },
            {
              "id": "c",
              "text": "They are both fruit terms"
            },
            {
              "id": "d",
              "text": "They are identical"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Contrast supplies an opposite.",
          "id": "reading-u10-l02-q11",
          "conceptTag": "word-relationships",
          "reviewCardId": "reading-u10-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response fully explains a phrase?",
          "choices": [
            {
              "id": "a",
              "text": "Simile"
            },
            {
              "id": "b",
              "text": "It has as"
            },
            {
              "id": "c",
              "text": "Bees are insects"
            },
            {
              "id": "d",
              "text": "“Busy as bees” is a simile meaning very busy"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It names and interprets.",
          "id": "reading-u10-l02-q12",
          "conceptTag": "word-relationships",
          "reviewCardId": "reading-u10-l02-c3"
        },
        {
          "type": "fill-blank",
          "prompt": "A word with the opposite meaning is an ___.",
          "acceptedAnswers": [
            "antonym"
          ],
          "explanation": "Antonym names an opposite word relationship.",
          "id": "reading-u10-l02-q13",
          "conceptTag": "word-relationships",
          "reviewCardId": "reading-u10-l02-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u10-l03",
    "unitId": "reading-u10",
    "title": "Explain Figurative Language's Effect",
    "indicatorCodes": [
      "ELA.4.AOR.1.2"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Figurative choices change meaning and shape a reader’s experience."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Device labels are only a first step."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s literalize, interpret, and explain effect."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u10-l03-c1",
        "title": "Spot the Figurative Choice",
        "blocks": [
          {
            "kind": "text",
            "text": "Spot language that cannot be literally true in context."
          },
          {
            "kind": "example",
            "text": "Fog does not fold a blanket; the horn is not a giant."
          },
          {
            "kind": "tip",
            "text": "Quote the exact phrase before analyzing."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which phrase is figurative?",
          "choices": [
            {
              "id": "a",
              "text": "fog folded a gray blanket"
            },
            {
              "id": "b",
              "text": "water tapped against pilings"
            },
            {
              "id": "c",
              "text": "Mara held the rail"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Fog cannot literally fold cloth."
        }
      },
      {
        "id": "reading-u10-l03-c2",
        "title": "Interpret Its Effect on Meaning",
        "blocks": [
          {
            "kind": "text",
            "text": "Paraphrase the figure in literal language, then notice what the original adds."
          },
          {
            "kind": "example",
            "text": "Gray blanket means thick fog covers and limits the view; blanket suggests enclosure."
          },
          {
            "kind": "tip",
            "text": "Avoid stopping at “metaphor.”"
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "What does the gray blanket mean?",
          "choices": [
            {
              "id": "a",
              "text": "thick fog covers the river and limits sight"
            },
            {
              "id": "b",
              "text": "a blanket fell in water"
            },
            {
              "id": "c",
              "text": "the river is warm"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That literal meaning fits the scene."
        }
      },
      {
        "id": "reading-u10-l03-c3",
        "title": "Explain the Reader's Experience",
        "blocks": [
          {
            "kind": "text",
            "text": "Effect may shape mood, imagery, emphasis, pacing, or connection."
          },
          {
            "kind": "example",
            "text": "Giant’s warning makes the horn feel huge and urgent, increasing caution."
          },
          {
            "kind": "tip",
            "text": "Use Phrase → Literal meaning → Reader effect."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "What effect does “giant’s warning” create?",
          "choices": [
            {
              "id": "a",
              "text": "It makes the horn feel enormous and serious"
            },
            {
              "id": "b",
              "text": "It proves a giant is present"
            },
            {
              "id": "c",
              "text": "It makes the scene comic"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The exaggerated image intensifies warning."
        }
      }
    ],
    "workedExample": {
      "title": "Explain figurative meaning and reader effect",
      "passage": {
        "title": "Fog at the Ferry",
        "text": "Fog at the Ferry\n\nAt dawn, the fog folded a gray blanket over the river. Mara could see the ferry dock beneath her shoes, but the opposite bank had vanished. Moist air cooled her cheeks while water tapped softly against the pilings.\n\nThen the ferry horn sounded. The horn was a giant’s warning rolling through the mist. Mara knew no giant stood in the river; the metaphor made the sound feel enormous and serious. She tightened her hand around the rail and listened for the dock worker’s directions.\n\nA small amber light appeared, blurred by the fog. It bobbed closer until the ferry’s square windows came into view. The gray blanket slowly thinned, revealing a silver path of water.\n\nThe figures do more than decorate the scene. The blanket metaphor makes fog feel enclosing and soft-edged. The giant’s-warning metaphor magnifies the horn and builds caution. Together with restrained sound and touch details, they place readers inside Mara’s limited, uncertain view before relief arrives."
      },
      "steps": [
        "Quote “fog folded a gray blanket.”",
        "Paraphrase: thick fog covers the river and blocks distance.",
        "Explain: the enclosing image creates uncertainty before the ferry appears."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Fog at the Ferry”",
        "text": "Fog at the Ferry\n\nAt dawn, the fog folded a gray blanket over the river. Mara could see the ferry dock beneath her shoes, but the opposite bank had vanished. Moist air cooled her cheeks while water tapped softly against the pilings.\n\nThen the ferry horn sounded. The horn was a giant’s warning rolling through the mist. Mara knew no giant stood in the river; the metaphor made the sound feel enormous and serious. She tightened her hand around the rail and listened for the dock worker’s directions.\n\nA small amber light appeared, blurred by the fog. It bobbed closer until the ferry’s square windows came into view. The gray blanket slowly thinned, revealing a silver path of water.\n\nThe figures do more than decorate the scene. The blanket metaphor makes fog feel enclosing and soft-edged. The giant’s-warning metaphor magnifies the horn and builds caution. Together with restrained sound and touch details, they place readers inside Mara’s limited, uncertain view before relief arrives."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which phrase is clearly figurative?",
          "choices": [
            {
              "id": "a",
              "text": "the fog folded a gray blanket"
            },
            {
              "id": "b",
              "text": "water tapped against pilings"
            },
            {
              "id": "c",
              "text": "Mara held the rail"
            },
            {
              "id": "d",
              "text": "the light appeared"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Fog cannot literally fold a blanket.",
          "id": "reading-u10-l03-q01",
          "conceptTag": "figurative-choice",
          "reviewCardId": "reading-u10-l03-c1"
        },
        {
          "type": "true-false",
          "prompt": "The horn is not literally a giant in the story.",
          "choices": [
            {
              "id": "true",
              "text": "True — the phrase is a metaphor"
            },
            {
              "id": "false",
              "text": "False — a giant drives the ferry"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The source explicitly rejects the literal reading.",
          "id": "reading-u10-l03-q02",
          "conceptTag": "figurative-choice",
          "reviewCardId": "reading-u10-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why is “silver path of water” figurative imagery?",
          "choices": [
            {
              "id": "a",
              "text": "The river is solid metal"
            },
            {
              "id": "b",
              "text": "Mara walks on water"
            },
            {
              "id": "c",
              "text": "Light makes the water look like a shining path"
            },
            {
              "id": "d",
              "text": "A road was built"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The image transforms reflected water.",
          "id": "reading-u10-l03-q03",
          "conceptTag": "figurative-choice",
          "reviewCardId": "reading-u10-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What should analysis quote first?",
          "choices": [
            {
              "id": "a",
              "text": "a device definition only"
            },
            {
              "id": "b",
              "text": "the lesson title"
            },
            {
              "id": "c",
              "text": "a reader opinion"
            },
            {
              "id": "d",
              "text": "the exact figurative phrase"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Exact language anchors the explanation.",
          "id": "reading-u10-l03-q04",
          "conceptTag": "figurative-choice",
          "reviewCardId": "reading-u10-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What is the literal meaning of the blanket image?",
          "choices": [
            {
              "id": "a",
              "text": "Someone drops cloth"
            },
            {
              "id": "b",
              "text": "Thick fog covers the river and limits view"
            },
            {
              "id": "c",
              "text": "The river goes to sleep"
            },
            {
              "id": "d",
              "text": "Fog becomes gray wool"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "It accurately paraphrases.",
          "id": "reading-u10-l03-q05",
          "conceptTag": "figurative-effect",
          "reviewCardId": "reading-u10-l03-c2"
        },
        {
          "type": "true-false",
          "prompt": "The blanket image suggests both coverage and enclosure.",
          "choices": [
            {
              "id": "true",
              "text": "True — those associations deepen meaning"
            },
            {
              "id": "false",
              "text": "False — it only names color"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The comparison adds more than thickness.",
          "id": "reading-u10-l03-q06",
          "conceptTag": "figurative-effect",
          "reviewCardId": "reading-u10-l03-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does giant’s warning change the horn’s meaning?",
          "choices": [
            {
              "id": "a",
              "text": "It makes it quiet"
            },
            {
              "id": "b",
              "text": "It makes it musical"
            },
            {
              "id": "c",
              "text": "It emphasizes enormous, serious warning"
            },
            {
              "id": "d",
              "text": "It removes danger"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The metaphor magnifies urgency.",
          "id": "reading-u10-l03-q07",
          "conceptTag": "figurative-effect",
          "reviewCardId": "reading-u10-l03-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which analysis goes beyond naming?",
          "choices": [
            {
              "id": "a",
              "text": "It is metaphor"
            },
            {
              "id": "b",
              "text": "It has a noun"
            },
            {
              "id": "c",
              "text": "It sounds interesting"
            },
            {
              "id": "d",
              "text": "The horn is compared to a giant’s warning, making its caution feel huge and urgent"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It provides meaning and effect.",
          "id": "reading-u10-l03-q08",
          "conceptTag": "figurative-effect",
          "reviewCardId": "reading-u10-l03-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What mood does the blanket image help create?",
          "choices": [
            {
              "id": "a",
              "text": "enclosed uncertainty"
            },
            {
              "id": "b",
              "text": "sunny celebration"
            },
            {
              "id": "c",
              "text": "comic confusion"
            },
            {
              "id": "d",
              "text": "ordinary boredom"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Limited vision and coverage create uncertainty.",
          "id": "reading-u10-l03-q09",
          "conceptTag": "reader-experience",
          "reviewCardId": "reading-u10-l03-c3"
        },
        {
          "type": "true-false",
          "prompt": "The sensory details and figures place readers near Mara’s limited view.",
          "choices": [
            {
              "id": "true",
              "text": "True — sight, sound, and touch narrow experience"
            },
            {
              "id": "false",
              "text": "False — they reveal every location"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The perspective is immersive and limited.",
          "id": "reading-u10-l03-q10",
          "conceptTag": "reader-experience",
          "reviewCardId": "reading-u10-l03-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does the amber light change the reader’s experience?",
          "choices": [
            {
              "id": "a",
              "text": "It makes fog thicker"
            },
            {
              "id": "b",
              "text": "Its approach brings growing clarity and relief"
            },
            {
              "id": "c",
              "text": "It introduces a villain"
            },
            {
              "id": "d",
              "text": "It proves the horn was false"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Visibility grows as ferry arrives.",
          "id": "reading-u10-l03-q11",
          "conceptTag": "reader-experience",
          "reviewCardId": "reading-u10-l03-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "What is the combined effect of both main metaphors?",
          "choices": [
            {
              "id": "a",
              "text": "They explain ferry mechanics"
            },
            {
              "id": "b",
              "text": "They create humor"
            },
            {
              "id": "c",
              "text": "They make fog enclosing and the horn urgent, building caution"
            },
            {
              "id": "d",
              "text": "They remove sensory detail"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Their effects reinforce uncertainty/caution.",
          "id": "reading-u10-l03-q12",
          "conceptTag": "reader-experience",
          "reviewCardId": "reading-u10-l03-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response uses the full format?",
          "choices": [
            {
              "id": "a",
              "text": "Gray blanket is metaphor"
            },
            {
              "id": "b",
              "text": "Fog is gray"
            },
            {
              "id": "c",
              "text": "Readers see a ferry"
            },
            {
              "id": "d",
              "text": "“Gray blanket” means covering fog and makes readers feel enclosed by Mara’s uncertain view"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It joins phrase, meaning, and effect.",
          "id": "reading-u10-l03-q13",
          "conceptTag": "reader-experience",
          "reviewCardId": "reading-u10-l03-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
