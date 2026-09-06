import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit10Lessons } from './u10';

const expectedManifest = [
  {
    "id": "reading-u10-l01",
    "unitId": "reading-u10",
    "title": "Compare Narratives, Dramas, and Poems",
    "indicatorCodes": [
      "ELA.4.AOR.5.1"
    ]
  },
  {
    "id": "reading-u10-l02",
    "unitId": "reading-u10",
    "title": "Interpret Literal and Nonliteral Language",
    "indicatorCodes": [
      "ELA.4.AOR.8.1"
    ]
  },
  {
    "id": "reading-u10-l03",
    "unitId": "reading-u10",
    "title": "Explain Figurative Language's Effect",
    "indicatorCodes": [
      "ELA.4.AOR.1.2"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u10-l01",
    "cards": [
      {
        "id": "reading-u10-l01-c1",
        "title": "Notice Narrative Structure",
        "conceptTag": "narrative-structure"
      },
      {
        "id": "reading-u10-l01-c2",
        "title": "Read Drama Structure",
        "conceptTag": "drama-structure"
      },
      {
        "id": "reading-u10-l01-c3",
        "title": "Read Poetry Structure",
        "conceptTag": "poetry-structure"
      }
    ]
  },
  {
    "id": "reading-u10-l02",
    "cards": [
      {
        "id": "reading-u10-l02-c1",
        "title": "Distinguish Literal and Nonliteral Meaning",
        "conceptTag": "literal-nonliteral"
      },
      {
        "id": "reading-u10-l02-c2",
        "title": "Explain Similes, Metaphors, and Idioms",
        "conceptTag": "figurative-meaning"
      },
      {
        "id": "reading-u10-l02-c3",
        "title": "Use Word Relationships to Clarify Meaning",
        "conceptTag": "word-relationships"
      }
    ]
  },
  {
    "id": "reading-u10-l03",
    "cards": [
      {
        "id": "reading-u10-l03-c1",
        "title": "Spot the Figurative Choice",
        "conceptTag": "figurative-choice"
      },
      {
        "id": "reading-u10-l03-c2",
        "title": "Interpret Its Effect on Meaning",
        "conceptTag": "figurative-effect"
      },
      {
        "id": "reading-u10-l03-c3",
        "title": "Explain the Reader's Experience",
        "conceptTag": "reader-experience"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u10-l01",
    "questions": [
      {
        "id": "reading-u10-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "narrative-structure",
        "reviewCardId": "reading-u10-l01-c1"
      },
      {
        "id": "reading-u10-l01-q02",
        "type": "true-false",
        "conceptTag": "narrative-structure",
        "reviewCardId": "reading-u10-l01-c1"
      },
      {
        "id": "reading-u10-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "narrative-structure",
        "reviewCardId": "reading-u10-l01-c1"
      },
      {
        "id": "reading-u10-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "narrative-structure",
        "reviewCardId": "reading-u10-l01-c1"
      },
      {
        "id": "reading-u10-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "drama-structure",
        "reviewCardId": "reading-u10-l01-c2"
      },
      {
        "id": "reading-u10-l01-q06",
        "type": "true-false",
        "conceptTag": "drama-structure",
        "reviewCardId": "reading-u10-l01-c2"
      },
      {
        "id": "reading-u10-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "drama-structure",
        "reviewCardId": "reading-u10-l01-c2"
      },
      {
        "id": "reading-u10-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "drama-structure",
        "reviewCardId": "reading-u10-l01-c2"
      },
      {
        "id": "reading-u10-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "poetry-structure",
        "reviewCardId": "reading-u10-l01-c3"
      },
      {
        "id": "reading-u10-l01-q10",
        "type": "true-false",
        "conceptTag": "poetry-structure",
        "reviewCardId": "reading-u10-l01-c3"
      },
      {
        "id": "reading-u10-l01-q11",
        "type": "multiple-choice",
        "conceptTag": "poetry-structure",
        "reviewCardId": "reading-u10-l01-c3"
      },
      {
        "id": "reading-u10-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "poetry-structure",
        "reviewCardId": "reading-u10-l01-c3"
      },
      {
        "id": "reading-u10-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "poetry-structure",
        "reviewCardId": "reading-u10-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u10-l02",
    "questions": [
      {
        "id": "reading-u10-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "literal-nonliteral",
        "reviewCardId": "reading-u10-l02-c1"
      },
      {
        "id": "reading-u10-l02-q02",
        "type": "true-false",
        "conceptTag": "literal-nonliteral",
        "reviewCardId": "reading-u10-l02-c1"
      },
      {
        "id": "reading-u10-l02-q03",
        "type": "multiple-choice",
        "conceptTag": "literal-nonliteral",
        "reviewCardId": "reading-u10-l02-c1"
      },
      {
        "id": "reading-u10-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "literal-nonliteral",
        "reviewCardId": "reading-u10-l02-c1"
      },
      {
        "id": "reading-u10-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "figurative-meaning",
        "reviewCardId": "reading-u10-l02-c2"
      },
      {
        "id": "reading-u10-l02-q06",
        "type": "true-false",
        "conceptTag": "figurative-meaning",
        "reviewCardId": "reading-u10-l02-c2"
      },
      {
        "id": "reading-u10-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "figurative-meaning",
        "reviewCardId": "reading-u10-l02-c2"
      },
      {
        "id": "reading-u10-l02-q08",
        "type": "fill-blank",
        "conceptTag": "figurative-meaning",
        "reviewCardId": "reading-u10-l02-c2"
      },
      {
        "id": "reading-u10-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "word-relationships",
        "reviewCardId": "reading-u10-l02-c3"
      },
      {
        "id": "reading-u10-l02-q10",
        "type": "true-false",
        "conceptTag": "word-relationships",
        "reviewCardId": "reading-u10-l02-c3"
      },
      {
        "id": "reading-u10-l02-q11",
        "type": "multiple-choice",
        "conceptTag": "word-relationships",
        "reviewCardId": "reading-u10-l02-c3"
      },
      {
        "id": "reading-u10-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "word-relationships",
        "reviewCardId": "reading-u10-l02-c3"
      },
      {
        "id": "reading-u10-l02-q13",
        "type": "fill-blank",
        "conceptTag": "word-relationships",
        "reviewCardId": "reading-u10-l02-c3"
      }
    ]
  },
  {
    "id": "reading-u10-l03",
    "questions": [
      {
        "id": "reading-u10-l03-q01",
        "type": "multiple-choice",
        "conceptTag": "figurative-choice",
        "reviewCardId": "reading-u10-l03-c1"
      },
      {
        "id": "reading-u10-l03-q02",
        "type": "true-false",
        "conceptTag": "figurative-choice",
        "reviewCardId": "reading-u10-l03-c1"
      },
      {
        "id": "reading-u10-l03-q03",
        "type": "multiple-choice",
        "conceptTag": "figurative-choice",
        "reviewCardId": "reading-u10-l03-c1"
      },
      {
        "id": "reading-u10-l03-q04",
        "type": "multiple-choice",
        "conceptTag": "figurative-choice",
        "reviewCardId": "reading-u10-l03-c1"
      },
      {
        "id": "reading-u10-l03-q05",
        "type": "multiple-choice",
        "conceptTag": "figurative-effect",
        "reviewCardId": "reading-u10-l03-c2"
      },
      {
        "id": "reading-u10-l03-q06",
        "type": "true-false",
        "conceptTag": "figurative-effect",
        "reviewCardId": "reading-u10-l03-c2"
      },
      {
        "id": "reading-u10-l03-q07",
        "type": "multiple-choice",
        "conceptTag": "figurative-effect",
        "reviewCardId": "reading-u10-l03-c2"
      },
      {
        "id": "reading-u10-l03-q08",
        "type": "multiple-choice",
        "conceptTag": "figurative-effect",
        "reviewCardId": "reading-u10-l03-c2"
      },
      {
        "id": "reading-u10-l03-q09",
        "type": "multiple-choice",
        "conceptTag": "reader-experience",
        "reviewCardId": "reading-u10-l03-c3"
      },
      {
        "id": "reading-u10-l03-q10",
        "type": "true-false",
        "conceptTag": "reader-experience",
        "reviewCardId": "reading-u10-l03-c3"
      },
      {
        "id": "reading-u10-l03-q11",
        "type": "multiple-choice",
        "conceptTag": "reader-experience",
        "reviewCardId": "reading-u10-l03-c3"
      },
      {
        "id": "reading-u10-l03-q12",
        "type": "multiple-choice",
        "conceptTag": "reader-experience",
        "reviewCardId": "reading-u10-l03-c3"
      },
      {
        "id": "reading-u10-l03-q13",
        "type": "multiple-choice",
        "conceptTag": "reader-experience",
        "reviewCardId": "reading-u10-l03-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u10-l01",
    "checks": [
      {
        "cardId": "reading-u10-l01-c1",
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
        "cardId": "reading-u10-l01-c2",
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
        "cardId": "reading-u10-l01-c3",
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
    ]
  },
  {
    "id": "reading-u10-l02",
    "checks": [
      {
        "cardId": "reading-u10-l02-c1",
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
        "cardId": "reading-u10-l02-c2",
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
        "cardId": "reading-u10-l02-c3",
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
    ]
  },
  {
    "id": "reading-u10-l03",
    "checks": [
      {
        "cardId": "reading-u10-l03-c1",
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
        "cardId": "reading-u10-l03-c2",
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
        "cardId": "reading-u10-l03-c3",
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
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u10-l01",
    "widgets": [
      {
        "cardId": "reading-u10-l01-c1",
        "ref": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "check",
                "text": "Nora checked the tables after the evening festival.",
                "role": "main"
              },
              {
                "id": "one",
                "text": "Every paper lantern had been collected except one glowing beside the empty stage.",
                "role": "main"
              },
              {
                "id": "carry",
                "text": "She carried it toward the gate, where Mr. Lee was searching the dark path.",
                "role": "main"
              },
              {
                "id": "smile",
                "text": "Mr. Lee smiled because the lantern marked the path to his family's booth.",
                "role": "detail"
              },
              {
                "id": "fact",
                "text": "Paper lanterns are often made from bamboo and rice paper.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "check",
              "one",
              "carry"
            ],
            "maxSentences": 4
          }
        }
      },
      {
        "cardId": "reading-u10-l01-c3",
        "ref": {
          "type": "figurative-language-matcher",
          "config": {
            "pairs": [
              {
                "id": "moon",
                "phrase": "the last small moon",
                "kind": "metaphor",
                "meaning": "the single lantern glowing in the darkness"
              },
              {
                "id": "finds",
                "phrase": "the lost light finds its hand",
                "kind": "personification",
                "meaning": "the lantern is returned to its owner"
              },
              {
                "id": "circle",
                "phrase": "a warm circle in the dark",
                "kind": "metaphor",
                "meaning": "the ring of lantern light on the ground"
              }
            ]
          }
        }
      }
    ]
  },
  {
    "id": "reading-u10-l02",
    "widgets": [
      {
        "cardId": "reading-u10-l02-c1",
        "ref": {
          "type": "context-clue-detective",
          "config": {
            "passage": "Setting out baskets was a piece of cake because her checklist was clear. The steps to the produce stand were three real wooden boards.",
            "targetWord": "a piece of cake",
            "clueChoices": [
              {
                "id": "clue-checklist",
                "text": "because her checklist was clear",
                "type": "definition"
              },
              {
                "id": "clue-boards",
                "text": "The steps to the produce stand were three real wooden boards",
                "type": "contrast"
              },
              {
                "id": "clue-baskets",
                "text": "Setting out baskets",
                "type": "example"
              }
            ],
            "correctChoiceId": "clue-checklist"
          }
        }
      },
      {
        "cardId": "reading-u10-l02-c2",
        "ref": {
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
        }
      },
      {
        "cardId": "reading-u10-l02-c3",
        "ref": {
          "type": "word-root-builder",
          "config": {
            "root": "ripe",
            "prefixes": [
              "un"
            ],
            "suffixes": [
              "ness"
            ],
            "targets": [
              {
                "word": "unripe",
                "meaning": "not fully ready to eat"
              },
              {
                "word": "ripeness",
                "meaning": "how fully ready to eat something is"
              }
            ]
          }
        }
      }
    ]
  },
  {
    "id": "reading-u10-l03",
    "widgets": [
      {
        "cardId": "reading-u10-l03-c1",
        "ref": {
          "type": "context-clue-detective",
          "config": {
            "passage": "Then the ferry horn sounded. The horn was a giant's warning rolling through the mist. Mara knew no giant stood in the river; the metaphor made the sound feel enormous and serious.",
            "targetWord": "giant's warning",
            "clueChoices": [
              {
                "id": "clue-meaning",
                "text": "the metaphor made the sound feel enormous and serious",
                "type": "definition"
              },
              {
                "id": "clue-noliteral",
                "text": "Mara knew no giant stood in the river",
                "type": "contrast"
              },
              {
                "id": "clue-mist",
                "text": "rolling through the mist",
                "type": "example"
              }
            ],
            "correctChoiceId": "clue-meaning"
          }
        }
      },
      {
        "cardId": "reading-u10-l03-c2",
        "ref": {
          "type": "figurative-language-matcher",
          "config": {
            "pairs": [
              {
                "id": "blanket",
                "phrase": "the fog folded a gray blanket over the river",
                "kind": "metaphor",
                "meaning": "thick fog covers the river and blocks the distant view"
              },
              {
                "id": "giant",
                "phrase": "The horn was a giant's warning",
                "kind": "metaphor",
                "meaning": "the horn sounded enormous and serious"
              },
              {
                "id": "tapped",
                "phrase": "water tapped softly against the pilings",
                "kind": "personification",
                "meaning": "the water made a light knocking sound against the posts"
              }
            ]
          }
        }
      }
    ]
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u10-l01",
    "passage": {
      "title": "The Last Lantern",
      "text": "The Last Lantern — narrative\n\nNora checked the tables after the evening festival. Every paper lantern had been collected except one glowing beside the empty stage. She carried it toward the gate, where Mr. Lee was searching the dark path.\n\n“This must be yours,” Nora said. Mr. Lee smiled because the lantern marked the path to his family’s booth. Nora handed it back, and together they watched its warm circle move through the dark.\n\nThe Last Lantern — one-scene drama\n\n[An empty festival stage at night. One lantern glows.]\nNORA: One lantern is still here.\nMR. LEE: I have been searching for it. It marks the path to our booth.\n[Nora lifts the lantern and hands it to him.]\nNORA: Then it can guide you back.\nMR. LEE: Thank you.\n[They exit as the lantern’s light moves along the path.]\n\nThe Last Lantern — free-verse poem\n\nOne lantern waits\nbeside the quiet stage,\na warm circle in the dark.\n\nNora lifts the glow.\nA searching face softens;\nthe lost light finds its hand.\n\nDown the festival path\ntwo figures follow\nthe last small moon."
    },
    "reference": {
      "title": "Read “The Last Lantern”",
      "text": "The Last Lantern — narrative\n\nNora checked the tables after the evening festival. Every paper lantern had been collected except one glowing beside the empty stage. She carried it toward the gate, where Mr. Lee was searching the dark path.\n\n“This must be yours,” Nora said. Mr. Lee smiled because the lantern marked the path to his family’s booth. Nora handed it back, and together they watched its warm circle move through the dark.\n\nThe Last Lantern — one-scene drama\n\n[An empty festival stage at night. One lantern glows.]\nNORA: One lantern is still here.\nMR. LEE: I have been searching for it. It marks the path to our booth.\n[Nora lifts the lantern and hands it to him.]\nNORA: Then it can guide you back.\nMR. LEE: Thank you.\n[They exit as the lantern’s light moves along the path.]\n\nThe Last Lantern — free-verse poem\n\nOne lantern waits\nbeside the quiet stage,\na warm circle in the dark.\n\nNora lifts the glow.\nA searching face softens;\nthe lost light finds its hand.\n\nDown the festival path\ntwo figures follow\nthe last small moon."
    },
    "evidence": [
      "one-scene drama",
      "free-verse poem",
      "last small moon"
    ]
  },
  {
    "id": "reading-u10-l02",
    "passage": {
      "title": "Market Morning",
      "text": "Market Morning\n\nBefore customers arrived, Lena climbed the three wooden steps to the produce stand. The steps were literal boards. Setting out baskets was a piece of cake because her checklist was clear. Soon vendors became busy as bees, moving quickly from crate to table.\n\nBy nine o’clock, the market was a beehive. No giant hive replaced the square; the metaphor means the market was crowded and active. Lena’s aunt called the peaches ripe, or fully ready to eat. Unripe is the antonym of ripe. Nearby, a quiet corner contrasted with the noisy main aisle.\n\nLiteral language means exactly what the words ordinarily state. Nonliteral language asks readers to interpret a comparison or familiar expression. A simile compares using like or as; a metaphor says one thing is another; an idiom has a meaning not found by combining each word literally. Synonyms have similar meanings, antonyms have opposite meanings, and contrasts can clarify both."
    },
    "reference": {
      "title": "Read “Market Morning”",
      "text": "Market Morning\n\nBefore customers arrived, Lena climbed the three wooden steps to the produce stand. The steps were literal boards. Setting out baskets was a piece of cake because her checklist was clear. Soon vendors became busy as bees, moving quickly from crate to table.\n\nBy nine o’clock, the market was a beehive. No giant hive replaced the square; the metaphor means the market was crowded and active. Lena’s aunt called the peaches ripe, or fully ready to eat. Unripe is the antonym of ripe. Nearby, a quiet corner contrasted with the noisy main aisle.\n\nLiteral language means exactly what the words ordinarily state. Nonliteral language asks readers to interpret a comparison or familiar expression. A simile compares using like or as; a metaphor says one thing is another; an idiom has a meaning not found by combining each word literally. Synonyms have similar meanings, antonyms have opposite meanings, and contrasts can clarify both."
    },
    "evidence": [
      "piece of cake",
      "market was a beehive",
      "Unripe is the antonym of ripe"
    ]
  },
  {
    "id": "reading-u10-l03",
    "passage": {
      "title": "Fog at the Ferry",
      "text": "Fog at the Ferry\n\nAt dawn, the fog folded a gray blanket over the river. Mara could see the ferry dock beneath her shoes, but the opposite bank had vanished. Moist air cooled her cheeks while water tapped softly against the pilings.\n\nThen the ferry horn sounded. The horn was a giant’s warning rolling through the mist. Mara knew no giant stood in the river; the metaphor made the sound feel enormous and serious. She tightened her hand around the rail and listened for the dock worker’s directions.\n\nA small amber light appeared, blurred by the fog. It bobbed closer until the ferry’s square windows came into view. The gray blanket slowly thinned, revealing a silver path of water.\n\nThe figures do more than decorate the scene. The blanket metaphor makes fog feel enclosing and soft-edged. The giant’s-warning metaphor magnifies the horn and builds caution. Together with restrained sound and touch details, they place readers inside Mara’s limited, uncertain view before relief arrives."
    },
    "reference": {
      "title": "Read “Fog at the Ferry”",
      "text": "Fog at the Ferry\n\nAt dawn, the fog folded a gray blanket over the river. Mara could see the ferry dock beneath her shoes, but the opposite bank had vanished. Moist air cooled her cheeks while water tapped softly against the pilings.\n\nThen the ferry horn sounded. The horn was a giant’s warning rolling through the mist. Mara knew no giant stood in the river; the metaphor made the sound feel enormous and serious. She tightened her hand around the rail and listened for the dock worker’s directions.\n\nA small amber light appeared, blurred by the fog. It bobbed closer until the ferry’s square windows came into view. The gray blanket slowly thinned, revealing a silver path of water.\n\nThe figures do more than decorate the scene. The blanket metaphor makes fog feel enclosing and soft-edged. The giant’s-warning metaphor magnifies the horn and builds caution. Together with restrained sound and touch details, they place readers inside Mara’s limited, uncertain view before relief arrives."
    },
    "evidence": [
      "gray blanket",
      "giant’s warning",
      "amber light"
    ]
  }
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 10 literal content', () => {
  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit10Lessons, expectedManifest, 'reading');
    expect(unit10Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit10Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit10Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit10Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit10Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit10Lessons) {
      expect(validateLesson(lesson)).toEqual([]);
      const source=expectedSources.find(row=>row.id===lesson.id)!;
      expect(lesson.workedExample.passage).toEqual(source.passage);
      expect(lesson.quiz.reference).toEqual(source.reference);
      expect(lesson.workedExample.passage!.text).toBe(lesson.quiz.reference!.text);
      for (const token of source.evidence) expect(source.passage.text).toContain(token);
      for (const card of lesson.learnCards) {
        expect(card.check).toBeDefined();
        expect(card.blocks.some(block=>block.text.startsWith('Support:')||block.text.startsWith('Response frame:')||block.text.startsWith('Stretch:'))).toBe(true);
        if ('widget' in card) expect(WidgetRefSchema.safeParse(card.widget).success).toBe(true);
      }
    }
  });

  test('keeps exact pools, unique visible answers, balanced MC keys, and solo framing', () => {
    for (const lesson of unit10Lessons) {
      expect(lesson.quiz.passThreshold).toBe(8);
      expect(lesson.quiz.pool.map(question=>question.id)).toEqual(Array.from({length:13},(_,index)=>`${lesson.id}-q${String(index+1).padStart(2,'0')}`));
      expect(new Set(lesson.quiz.pool.map(question=>question.conceptTag)).size).toBe(3);
      for (const question of lesson.quiz.pool) {
        const options=visible(question);
        expect(new Set(options.map(option=>option.id)).size).toBe(options.length);
        expect(new Set(options.map(option=>normalize(option.text))).size).toBe(options.length);
      }
      const keys=lesson.quiz.pool.filter(question=>question.type==='multiple-choice').map(question=>question.correctChoiceId);
      const counts=new Map<string,number>(); for(const key of keys) counts.set(key,(counts.get(key)??0)+1);
      expect([...counts.keys()].sort()).toEqual(['a','b','c','d']);
      expect(Math.max(...counts.values())-Math.min(...counts.values())).toBeLessThanOrEqual(1);
      expect(JSON.stringify(lesson)).not.toMatch(/live (partner|classmate|collaboration)|recording score|words per minute score/i);
    }
  });
});
