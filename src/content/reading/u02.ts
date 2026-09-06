import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit02Lessons = [
  {
    "id": "reading-u02-l01",
    "unitId": "reading-u02",
    "title": "Build Meaning with Roots, Base Words, and Affixes",
    "indicatorCodes": [
      "ELA.4.AOR.9.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Long words often contain smaller parts that carry meaning."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "A root or base gives the core idea, while a prefix or suffix can adjust it."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s build a meaning, then check that meaning in a real sentence."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u02-l01-c1",
        "title": "Build Words from Meaningful Parts",
        "blocks": [
          {
            "kind": "text",
            "text": "A base word can stand alone. An affix joins a base or root: a prefix comes before it, and a suffix comes after it."
          },
          {
            "kind": "example",
            "text": "In rebuild, re- means again and build is the base word, so rebuild means build again."
          },
          {
            "kind": "tip",
            "text": "Name each part and its meaning before combining them."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "In rebuild, which part means again?",
          "choices": [
            {
              "id": "a",
              "text": "re-"
            },
            {
              "id": "b",
              "text": "build"
            },
            {
              "id": "c",
              "text": "-less"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible example states that re- means again."
        }
      },
      {
        "id": "reading-u02-l01-c2",
        "title": "Use Roots to Unlock Meaning",
        "blocks": [
          {
            "kind": "text",
            "text": "Many Greek and Latin roots appear in grade-level science, history, and literature. The root port means carry."
          },
          {
            "kind": "example",
            "text": "Portable describes something that can be carried. Transport means carry from one place to another."
          },
          {
            "kind": "tip",
            "text": "A root gives a useful clue, but the full word decides the precise meaning."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "widget": {
          "type": "word-root-builder",
          "config": {
            "root": "port",
            "prefixes": [
              "trans"
            ],
            "suffixes": [
              "able"
            ],
            "targets": [
              {
                "word": "transport",
                "meaning": "carry from one place to another"
              },
              {
                "word": "portable",
                "meaning": "able to be carried"
              }
            ]
          }
        },
        "widgetCoach": {
          "intro": [
            {"speaker":"guide","pose":"think","text":"Let’s snap the root and affixes together, then reread the whole word’s meaning."},
            {"speaker":"kid","text":"I’ll build it left to right and check whether the whole word fits the sentence."}
          ],
          "reactions": {
            "strategy": {"text":"Start with the root, then choose only the prefix or suffix that changes its meaning the right way.","pose":"think"},
            "retry": {"text":"That combination needs another look. Recheck the prefix, root, suffix, and the whole-word meaning.","pose":"oops"},
            "milestone": {"text":"The spelling fits! Now pause and check what the whole word means.","pose":"cheer"},
            "complete": {"text":"You connected the word parts and checked the whole-word meaning.","pose":"cheer"}
          }
        },
        "check": {
          "prompt": "The root port means carry. Which word means able to be carried?",
          "choices": [
            {
              "id": "a",
              "text": "portable"
            },
            {
              "id": "b",
              "text": "transport"
            },
            {
              "id": "c",
              "text": "rebuild"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Port means carry and -able means able to be."
        }
      },
      {
        "id": "reading-u02-l01-c3",
        "title": "Check the Whole Word in Context",
        "blocks": [
          {
            "kind": "text",
            "text": "After combining word-part meanings, reread the sentence. Keep the meaning only if it fits the sentence."
          },
          {
            "kind": "example",
            "text": "The volunteers rebuilt the garden beds after the storm means they built them again, not that they built them badly."
          },
          {
            "kind": "tip",
            "text": "Use the response format Parts → Combined meaning → Sentence check."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "Why should you reread after combining word-part meanings?",
          "choices": [
            {
              "id": "a",
              "text": "confirm the meaning fits the sentence"
            },
            {
              "id": "b",
              "text": "count the letters"
            },
            {
              "id": "c",
              "text": "remove the root"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The card says context confirms or corrects the combined meaning."
        }
      }
    ],
    "workedExample": {
      "title": "Unlock transported in “The Rebuilt Garden”",
      "passage": {
        "title": "The Rebuilt Garden",
        "text": "After a summer storm, the school garden needed careful work. Nia and Omar rebuilt a short border around the herb bed. They reused straight boards that had washed beside the fence and replaced one cracked board with a new piece. Before lifting anything, they previewed the cleanup map so they knew where each pile belonged.\n\nA small cart transported fresh soil from the gate to the raised beds. The cart was portable enough for one student to pull, but the load was heavy, so the students made two trips. Omar reread the labels on three reusable bins: wood, weeds, and plastic. Nia checked each item before sorting it.\n\nBy noon, the repaired border held the soil in place. The class had built it again, carried supplies across the garden, looked at the plan beforehand, and used materials more than once. Those actions made the meanings of rebuilt, transported, previewed, and reusable clear in context."
      },
      "steps": [
        "Read “A small cart transported fresh soil from the gate to the raised beds.”",
        "Identify trans- as across and port as carry.",
        "Combine the clues as carried from one place to another, then check that the cart action fits."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “The Rebuilt Garden”",
        "text": "After a summer storm, the school garden needed careful work. Nia and Omar rebuilt a short border around the herb bed. They reused straight boards that had washed beside the fence and replaced one cracked board with a new piece. Before lifting anything, they previewed the cleanup map so they knew where each pile belonged.\n\nA small cart transported fresh soil from the gate to the raised beds. The cart was portable enough for one student to pull, but the load was heavy, so the students made two trips. Omar reread the labels on three reusable bins: wood, weeds, and plastic. Nia checked each item before sorting it.\n\nBy noon, the repaired border held the soil in place. The class had built it again, carried supplies across the garden, looked at the plan beforehand, and used materials more than once. Those actions made the meanings of rebuilt, transported, previewed, and reusable clear in context."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which part comes before a root or base word?",
          "choices": [
            {
              "id": "a",
              "text": "Prefix"
            },
            {
              "id": "b",
              "text": "Suffix"
            },
            {
              "id": "c",
              "text": "Sentence"
            },
            {
              "id": "d",
              "text": "Syllable count"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "A prefix is attached before a root or base word.",
          "id": "reading-u02-l01-q01",
          "conceptTag": "word-parts",
          "reviewCardId": "reading-u02-l01-c1"
        },
        {
          "type": "fill-blank",
          "prompt": "Complete the word that means build again: ___build.",
          "acceptedAnswers": [
            "re",
            "re-"
          ],
          "explanation": "The prefix re- means again, so rebuild means build again.",
          "id": "reading-u02-l01-q02",
          "conceptTag": "word-parts",
          "reviewCardId": "reading-u02-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the suffix -less mean in fearless?",
          "choices": [
            {
              "id": "a",
              "text": "Full of"
            },
            {
              "id": "b",
              "text": "Without"
            },
            {
              "id": "c",
              "text": "Again"
            },
            {
              "id": "d",
              "text": "Before"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The suffix -less means without, so fearless means without fear.",
          "id": "reading-u02-l01-q03",
          "conceptTag": "word-parts",
          "reviewCardId": "reading-u02-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "A suffix is attached after a root or base word.",
          "choices": [
            {
              "id": "true",
              "text": "True — suffixes follow the root or base"
            },
            {
              "id": "false",
              "text": "False — suffixes always come first"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "A suffix follows a root or base word.",
          "id": "reading-u02-l01-q04",
          "conceptTag": "word-parts",
          "reviewCardId": "reading-u02-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "The root port means carry. What does portable most likely describe?",
          "choices": [
            {
              "id": "a",
              "text": "Something that cannot move"
            },
            {
              "id": "b",
              "text": "Something made of paper"
            },
            {
              "id": "c",
              "text": "Something that can be carried"
            },
            {
              "id": "d",
              "text": "Something that is very loud"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The root port points to carrying, so portable means able to be carried.",
          "id": "reading-u02-l01-q05",
          "conceptTag": "root-meaning",
          "reviewCardId": "reading-u02-l01-c2"
        },
        {
          "type": "fill-blank",
          "prompt": "The root bio means life. Which root completes the word for the story of a person’s life: ___graphy?",
          "acceptedAnswers": [
            "bio",
            "bio-"
          ],
          "explanation": "Biography uses bio, meaning life.",
          "id": "reading-u02-l01-q06",
          "conceptTag": "root-meaning",
          "reviewCardId": "reading-u02-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "The root spect means look. Which meaning best fits inspect?",
          "choices": [
            {
              "id": "a",
              "text": "To carry away"
            },
            {
              "id": "b",
              "text": "To write again"
            },
            {
              "id": "c",
              "text": "To hear from far away"
            },
            {
              "id": "d",
              "text": "To look at closely"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The root spect means look, and inspect means look at closely.",
          "id": "reading-u02-l01-q07",
          "conceptTag": "root-meaning",
          "reviewCardId": "reading-u02-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "A root clue always gives the full precise meaning without any context.",
          "choices": [
            {
              "id": "true",
              "text": "True — context is never needed"
            },
            {
              "id": "false",
              "text": "False — the whole word and sentence refine the meaning"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "A root is a clue; the complete word and context establish the precise meaning.",
          "id": "reading-u02-l01-q08",
          "conceptTag": "root-meaning",
          "reviewCardId": "reading-u02-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "In “Mara previewed the map before hiking,” what does previewed mean?",
          "choices": [
            {
              "id": "a",
              "text": "Looked at beforehand"
            },
            {
              "id": "b",
              "text": "Looked at again afterward"
            },
            {
              "id": "c",
              "text": "Carried the map away"
            },
            {
              "id": "d",
              "text": "Covered the map completely"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Pre- means before, and the sentence confirms that Mara looked before hiking.",
          "id": "reading-u02-l01-q09",
          "conceptTag": "morphology-check",
          "reviewCardId": "reading-u02-l01-c3"
        },
        {
          "type": "fill-blank",
          "prompt": "Complete the meaning check: careless means without ___.",
          "acceptedAnswers": [
            "care"
          ],
          "explanation": "Careless combines care with -less, meaning without care.",
          "id": "reading-u02-l01-q10",
          "conceptTag": "morphology-check",
          "reviewCardId": "reading-u02-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "In “The submarine traveled under the sea,” which response best checks the word submarine?",
          "choices": [
            {
              "id": "a",
              "text": "Sub means above, so a submarine flies"
            },
            {
              "id": "b",
              "text": "Sub means under, marine relates to sea, and a submarine travels under the sea"
            },
            {
              "id": "c",
              "text": "Marine means mountain, so it climbs rocks"
            },
            {
              "id": "d",
              "text": "The word has many letters, so it means enormous"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Both word parts and sentence meaning support a vessel that travels under the sea.",
          "id": "reading-u02-l01-q11",
          "conceptTag": "morphology-check",
          "reviewCardId": "reading-u02-l01-c3"
        },
        {
          "type": "sort",
          "prompt": "Put the word parts in order to build reusable.",
          "explanation": "Reusable is built in the natural order prefix, base word, suffix.",
          "id": "reading-u02-l01-q12",
          "conceptTag": "morphology-check",
          "reviewCardId": "reading-u02-l01-c3",
          "items": [
            {
              "id": "step-2",
              "text": "use"
            },
            {
              "id": "step-3",
              "text": "-able"
            },
            {
              "id": "step-1",
              "text": "re-"
            }
          ],
          "correctOrder": [
            "step-1",
            "step-2",
            "step-3"
          ]
        },
        {
          "type": "true-false",
          "prompt": "After using word parts, rereading the sentence helps confirm the meaning.",
          "choices": [
            {
              "id": "true",
              "text": "True — context checks the combined meaning"
            },
            {
              "id": "false",
              "text": "False — the sentence should be ignored"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The sentence confirms or corrects the meaning suggested by word parts.",
          "id": "reading-u02-l01-q13",
          "conceptTag": "morphology-check",
          "reviewCardId": "reading-u02-l01-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u02-l02",
    "unitId": "reading-u02",
    "title": "Use Definition, Example, and Restatement Clues",
    "indicatorCodes": [
      "ELA.4.AOR.7.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Unknown words often travel with clues."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Definitions, examples, and restatements can reveal meaning."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s name the clue, infer a meaning, and reread to confirm it."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u02-l02-c1",
        "title": "Spot the Kind of Context Clue",
        "blocks": [
          {
            "kind": "text",
            "text": "A definition clue directly tells a meaning; an example clue supplies members of a group; a restatement says the idea again in new words."
          },
          {
            "kind": "text",
            "text": "Source passage: Nocturnal animals, creatures that are active at night, include owls and moths."
          },
          {
            "kind": "example",
            "text": "“Nocturnal animals, creatures that are active at night, include owls and moths.” The phrase after the comma defines nocturnal; owls and moths are examples."
          },
          {
            "kind": "tip",
            "text": "Signal punctuation and phrases such as “in other words” can point to a clue."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "widget": {
          "type": "context-clue-detective",
          "config": {
            "passage": "Nocturnal animals, creatures that are active at night, include owls and moths.",
            "targetWord": "nocturnal",
            "clueChoices": [
              {
                "id": "definition",
                "text": "creatures that are active at night",
                "type": "definition"
              },
              {
                "id": "examples",
                "text": "owls and moths",
                "type": "example"
              }
            ],
            "correctChoiceId": "definition"
          }
        },
        "widgetCoach": {
          "intro": [
            {"speaker":"guide","pose":"think","text":"Read the whole sentence, then choose the exact words that unlock the target word."},
            {"speaker":"kid","text":"I’ll commit the clue text first, then name its kind from the punctuation and meaning."}
          ],
          "reactions": {
            "strategy": {"text":"Scan around the target word and point to the words that explain it.","pose":"think"},
            "retry": {"text":"That attempt needs another look. Reread the sentence and check both the clue words and their kind.","pose":"oops"},
            "milestone": {"text":"Nice! You matched a clue’s words to its kind.","pose":"cheer"},
            "complete": {"text":"You used the complete sentence to confirm both the clue and its kind.","pose":"cheer"}
          }
        },
        "check": {
          "prompt": "Which words directly define nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "creatures that are active at night"
            },
            {
              "id": "b",
              "text": "owls and moths"
            },
            {
              "id": "c",
              "text": "Some garden visitors"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The phrase after nocturnal directly states its meaning."
        }
      },
      {
        "id": "reading-u02-l02-c2",
        "title": "Read Around the Unknown Word",
        "blocks": [
          {
            "kind": "text",
            "text": "Read the sentence before, the sentence with the word, and the sentence after it. Gather more than one clue when possible."
          },
          {
            "kind": "example",
            "text": "“Several insects emerge; in other words, they come out from hiding.” The restatement explains emerge."
          },
          {
            "kind": "tip",
            "text": "Write Clue → Possible meaning → Evidence before choosing."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "What does emerge mean in the visible sentence?",
          "choices": [
            {
              "id": "a",
              "text": "come out from hiding"
            },
            {
              "id": "b",
              "text": "sleep through every night"
            },
            {
              "id": "c",
              "text": "grow bright petals"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The words “in other words” introduce the restatement."
        }
      },
      {
        "id": "reading-u02-l02-c3",
        "title": "Confirm Meaning in the Sentence",
        "blocks": [
          {
            "kind": "text",
            "text": "Substitute the possible meaning and reread. A correct meaning must keep the sentence sensible and precise."
          },
          {
            "kind": "example",
            "text": "Replacing nocturnal with active at night keeps the sentence accurate; replacing it with able to fly does not."
          },
          {
            "kind": "tip",
            "text": "A dictionary can confirm a meaning after context reasoning, but it does not replace reading the sentence."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "Which substitution confirms nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "creatures active at night"
            },
            {
              "id": "b",
              "text": "creatures with feathers"
            },
            {
              "id": "c",
              "text": "creatures living in gardens"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That substitution preserves the exact definition in the card."
        }
      }
    ],
    "workedExample": {
      "title": "Confirm emerge with a restatement clue",
      "passage": {
        "title": "Night Garden Visitors",
        "text": "Night Garden Visitors\n\nSome garden visitors are nocturnal, creatures that are active at night. Owls may hunt after sunset, and moths often visit pale flowers in the dark. These examples help explain nocturnal even if the word is new.\n\nAt dusk, several insects emerge; in other words, they come out from hiding. A luna moth rests during much of the day but becomes active when evening arrives. By contrast, many butterflies are diurnal and fly while the sun is up.\n\nReaders can use the definition beside nocturnal, the examples of owls and moths, and the restatement after emerge. Then they should replace the unknown word with the possible meaning and reread. If “creatures active at night” fits the first sentence without changing its message, the context-clue reasoning is confirmed."
      },
      "steps": [
        "Read the full sentence around emerge.",
        "Mark “in other words” as a restatement signal.",
        "Infer “come out from hiding,” substitute it, and reread to confirm the meaning."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Night Garden Visitors”",
        "text": "Night Garden Visitors\n\nSome garden visitors are nocturnal, creatures that are active at night. Owls may hunt after sunset, and moths often visit pale flowers in the dark. These examples help explain nocturnal even if the word is new.\n\nAt dusk, several insects emerge; in other words, they come out from hiding. A luna moth rests during much of the day but becomes active when evening arrives. By contrast, many butterflies are diurnal and fly while the sun is up.\n\nReaders can use the definition beside nocturnal, the examples of owls and moths, and the restatement after emerge. Then they should replace the unknown word with the possible meaning and reread. If “creatures active at night” fits the first sentence without changing its message, the context-clue reasoning is confirmed."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which phrase is a definition clue for nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "owls and moths"
            },
            {
              "id": "b",
              "text": "creatures that are active at night"
            },
            {
              "id": "c",
              "text": "visit pale flowers"
            },
            {
              "id": "d",
              "text": "after sunset"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "It directly states what nocturnal means.",
          "id": "reading-u02-l02-q01",
          "conceptTag": "clue-types",
          "reviewCardId": "reading-u02-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which words are example clues for nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "active at night"
            },
            {
              "id": "b",
              "text": "garden visitors"
            },
            {
              "id": "c",
              "text": "owls and moths"
            },
            {
              "id": "d",
              "text": "when evening arrives"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Owls and moths are members of the nocturnal group.",
          "id": "reading-u02-l02-q02",
          "conceptTag": "clue-types",
          "reviewCardId": "reading-u02-l02-c1"
        },
        {
          "type": "true-false",
          "prompt": "“In other words” can signal a restatement clue.",
          "choices": [
            {
              "id": "true",
              "text": "True — it introduces the idea again"
            },
            {
              "id": "false",
              "text": "False — it always signals contrast"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The phrase introduces a second wording of emerge.",
          "id": "reading-u02-l02-q03",
          "conceptTag": "clue-types",
          "reviewCardId": "reading-u02-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which clue type appears in “brackish water, a mix of fresh and salt water”?",
          "choices": [
            {
              "id": "a",
              "text": "example"
            },
            {
              "id": "b",
              "text": "contrast"
            },
            {
              "id": "c",
              "text": "sound"
            },
            {
              "id": "d",
              "text": "definition"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The words after the comma define brackish.",
          "id": "reading-u02-l02-q04",
          "conceptTag": "clue-types",
          "reviewCardId": "reading-u02-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What should a reader do first with an unknown word in a sentence?",
          "choices": [
            {
              "id": "a",
              "text": "Read around it for nearby clues"
            },
            {
              "id": "b",
              "text": "Choose the longest meaning"
            },
            {
              "id": "c",
              "text": "Skip the whole paragraph"
            },
            {
              "id": "d",
              "text": "Use only its first letter"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Nearby words supply evidence.",
          "id": "reading-u02-l02-q05",
          "conceptTag": "context-reasoning",
          "reviewCardId": "reading-u02-l02-c2"
        },
        {
          "type": "fill-blank",
          "prompt": "In the passage, emerge means to come out from ___.",
          "acceptedAnswers": [
            "hiding"
          ],
          "explanation": "The restatement says the insects come out from hiding.",
          "id": "reading-u02-l02-q06",
          "conceptTag": "context-reasoning",
          "reviewCardId": "reading-u02-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which two clues best support nocturnal?",
          "choices": [
            {
              "id": "a",
              "text": "sunset and flowers"
            },
            {
              "id": "b",
              "text": "the definition plus owl and moth examples"
            },
            {
              "id": "c",
              "text": "butterflies and gardens"
            },
            {
              "id": "d",
              "text": "pale and active"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The definition and examples agree.",
          "id": "reading-u02-l02-q07",
          "conceptTag": "context-reasoning",
          "reviewCardId": "reading-u02-l02-c2"
        },
        {
          "type": "true-false",
          "prompt": "A reader should accept a guessed meaning even when it makes the sentence confusing.",
          "choices": [
            {
              "id": "true",
              "text": "True — guesses need no check"
            },
            {
              "id": "false",
              "text": "False — rereading must confirm the meaning"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "Context must confirm the inference.",
          "id": "reading-u02-l02-q08",
          "conceptTag": "context-reasoning",
          "reviewCardId": "reading-u02-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which replacement keeps the first sentence accurate?",
          "choices": [
            {
              "id": "a",
              "text": "colorful"
            },
            {
              "id": "b",
              "text": "able to fly"
            },
            {
              "id": "c",
              "text": "active at night"
            },
            {
              "id": "d",
              "text": "very small"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The passage directly defines nocturnal as active at night.",
          "id": "reading-u02-l02-q09",
          "conceptTag": "context-check",
          "reviewCardId": "reading-u02-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why does “come out from hiding” confirm emerge?",
          "choices": [
            {
              "id": "a",
              "text": "It rhymes with emerge"
            },
            {
              "id": "b",
              "text": "It names an owl"
            },
            {
              "id": "c",
              "text": "It gives an opposite"
            },
            {
              "id": "d",
              "text": "It makes the sentence logical and repeats the idea"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The restatement both fits and repeats the idea.",
          "id": "reading-u02-l02-q10",
          "conceptTag": "context-check",
          "reviewCardId": "reading-u02-l02-c3"
        },
        {
          "type": "fill-blank",
          "prompt": "The passage calls butterflies active in daytime ___.",
          "acceptedAnswers": [
            "diurnal"
          ],
          "explanation": "The contrast sentence supplies the exact word diurnal.",
          "id": "reading-u02-l02-q11",
          "conceptTag": "context-check",
          "reviewCardId": "reading-u02-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response uses the complete context routine?",
          "choices": [
            {
              "id": "a",
              "text": "Name the clue, infer a meaning, substitute it, and reread"
            },
            {
              "id": "b",
              "text": "Pick a familiar-looking word"
            },
            {
              "id": "c",
              "text": "Ignore punctuation"
            },
            {
              "id": "d",
              "text": "Use the examples as the definition"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The full routine gathers and checks evidence.",
          "id": "reading-u02-l02-q12",
          "conceptTag": "context-check",
          "reviewCardId": "reading-u02-l02-c3"
        },
        {
          "type": "true-false",
          "prompt": "A dictionary may confirm context reasoning after the sentence has been examined.",
          "choices": [
            {
              "id": "true",
              "text": "True — references can confirm"
            },
            {
              "id": "false",
              "text": "False — references must never be used"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The lesson pairs context reasoning with later confirmation.",
          "id": "reading-u02-l02-q13",
          "conceptTag": "context-check",
          "reviewCardId": "reading-u02-l02-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u02-l03",
    "unitId": "reading-u02",
    "title": "Use Print and Digital References Precisely",
    "indicatorCodes": [
      "ELA.4.AOR.7.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "References answer different word questions."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Entries show pronunciation, part of speech, and numbered meanings."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s choose a tool and select the meaning that fits the field note."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u02-l03-c1",
        "title": "Choose the Right Reference",
        "blocks": [
          {
            "kind": "text",
            "text": "Use a dictionary for pronunciation, part of speech, and meanings; use a glossary for a term’s meaning in the current topic."
          },
          {
            "kind": "example",
            "text": "For brackish in a wetland article, the packet glossary gives the specialized meaning directly."
          },
          {
            "kind": "tip",
            "text": "Choose a trusted print or digital reference with clear authorship and complete entries."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which reference best gives the wetland meaning of brackish?",
          "choices": [
            {
              "id": "a",
              "text": "the packet glossary"
            },
            {
              "id": "b",
              "text": "a calendar"
            },
            {
              "id": "c",
              "text": "a map scale"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible glossary defines the topic word brackish."
        }
      },
      {
        "id": "reading-u02-l03-c2",
        "title": "Read a Dictionary Entry",
        "blocks": [
          {
            "kind": "text",
            "text": "A headword is followed by pronunciation, part of speech, and one or more numbered meanings."
          },
          {
            "kind": "example",
            "text": "Current can be a noun meaning moving water or an adjective meaning happening now."
          },
          {
            "kind": "tip",
            "text": "Match the part of speech and sentence use before selecting a definition."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "In “a gentle current moved,” what part of speech is current?",
          "choices": [
            {
              "id": "a",
              "text": "noun"
            },
            {
              "id": "b",
              "text": "adjective"
            },
            {
              "id": "c",
              "text": "verb"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The entry labels the moving-water meaning as a noun."
        }
      },
      {
        "id": "reading-u02-l03-c3",
        "title": "Select the Precise Meaning",
        "blocks": [
          {
            "kind": "text",
            "text": "A multiple-meaning word needs a context check. Substitute each candidate meaning and keep the precise one."
          },
          {
            "kind": "example",
            "text": "The grassy bank beside a creek is land beside water, not a money business."
          },
          {
            "kind": "tip",
            "text": "Answer with Entry evidence → Context evidence → Precise meaning."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "Which bank meaning fits the field note?",
          "choices": [
            {
              "id": "a",
              "text": "land beside a river or stream"
            },
            {
              "id": "b",
              "text": "a business that keeps money"
            },
            {
              "id": "c",
              "text": "a row of switches"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The creek and grass are context evidence for the riverbank meaning."
        }
      }
    ],
    "workedExample": {
      "title": "Select the creek meaning of bank",
      "passage": {
        "title": "Field Notes Word Desk",
        "text": "Field Notes Word Desk — invented reference packet\n\nDictionary entry: current /KUR-uhnt/ noun. 1. a steady movement of water or air in one direction. 2. the present time. adjective. happening now.\n\nDictionary entry: bank /bangk/ noun. 1. land beside a river or stream. 2. a business that keeps and lends money.\n\nGlossary: migrate — verb — to move from one region to another, often with the seasons. Brackish — adjective — slightly salty because fresh water and seawater mix.\n\nField note: “The young fish rested near the grassy bank while a gentle current moved through the creek. Some birds migrate through the preserve each fall. Where the river meets the ocean, the water becomes brackish.”\n\nA print dictionary and a trusted digital dictionary can provide pronunciation, part of speech, and numbered meanings. A topic glossary gives the specialized meaning used in one text. Readers compare each entry with the sentence instead of automatically choosing meaning 1."
      },
      "steps": [
        "Locate bank in the packet.",
        "Compare both numbered meanings with “grassy bank” and “creek.”",
        "Select land beside a river or stream and state the entry and context evidence."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Field Notes Word Desk”",
        "text": "Field Notes Word Desk — invented reference packet\n\nDictionary entry: current /KUR-uhnt/ noun. 1. a steady movement of water or air in one direction. 2. the present time. adjective. happening now.\n\nDictionary entry: bank /bangk/ noun. 1. land beside a river or stream. 2. a business that keeps and lends money.\n\nGlossary: migrate — verb — to move from one region to another, often with the seasons. Brackish — adjective — slightly salty because fresh water and seawater mix.\n\nField note: “The young fish rested near the grassy bank while a gentle current moved through the creek. Some birds migrate through the preserve each fall. Where the river meets the ocean, the water becomes brackish.”\n\nA print dictionary and a trusted digital dictionary can provide pronunciation, part of speech, and numbered meanings. A topic glossary gives the specialized meaning used in one text. Readers compare each entry with the sentence instead of automatically choosing meaning 1."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which source is best for the pronunciation of migrate?",
          "choices": [
            {
              "id": "a",
              "text": "A dictionary entry"
            },
            {
              "id": "b",
              "text": "A weather map"
            },
            {
              "id": "c",
              "text": "A table of contents"
            },
            {
              "id": "d",
              "text": "A photo caption"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "A dictionary supplies pronunciation.",
          "id": "reading-u02-l03-q01",
          "conceptTag": "reference-choice",
          "reviewCardId": "reading-u02-l03-c1"
        },
        {
          "type": "true-false",
          "prompt": "A topic glossary can define a specialized word used in that text.",
          "choices": [
            {
              "id": "true",
              "text": "True — it explains topic terms"
            },
            {
              "id": "false",
              "text": "False — glossaries list page numbers only"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Glossaries supply meanings for terms in a text.",
          "id": "reading-u02-l03-q02",
          "conceptTag": "reference-choice",
          "reviewCardId": "reading-u02-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which reference question does the glossary answer for brackish?",
          "choices": [
            {
              "id": "a",
              "text": "How many syllables are on the page?"
            },
            {
              "id": "b",
              "text": "Who owns the creek?"
            },
            {
              "id": "c",
              "text": "What does the wetland term mean?"
            },
            {
              "id": "d",
              "text": "When was the book printed?"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The glossary defines the wetland term.",
          "id": "reading-u02-l03-q03",
          "conceptTag": "reference-choice",
          "reviewCardId": "reading-u02-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which digital reference is the strongest choice?",
          "choices": [
            {
              "id": "a",
              "text": "An unsigned comment"
            },
            {
              "id": "b",
              "text": "An advertisement with no entry"
            },
            {
              "id": "c",
              "text": "A random image"
            },
            {
              "id": "d",
              "text": "A trusted dictionary with authorship and full entries"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Visible authority and complete entries make it useful.",
          "id": "reading-u02-l03-q04",
          "conceptTag": "reference-choice",
          "reviewCardId": "reading-u02-l03-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What is the headword in the first entry?",
          "choices": [
            {
              "id": "a",
              "text": "noun"
            },
            {
              "id": "b",
              "text": "current"
            },
            {
              "id": "c",
              "text": "present time"
            },
            {
              "id": "d",
              "text": "KUR-uhnt"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Current is the word being defined.",
          "id": "reading-u02-l03-q05",
          "conceptTag": "dictionary-entry",
          "reviewCardId": "reading-u02-l03-c2"
        },
        {
          "type": "fill-blank",
          "prompt": "The entry labels migrate as a ___.",
          "acceptedAnswers": [
            "verb"
          ],
          "explanation": "The glossary visibly labels migrate as a verb.",
          "id": "reading-u02-l03-q06",
          "conceptTag": "dictionary-entry",
          "reviewCardId": "reading-u02-l03-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does /KUR-uhnt/ show?",
          "choices": [
            {
              "id": "a",
              "text": "the definition number"
            },
            {
              "id": "b",
              "text": "the part of speech"
            },
            {
              "id": "c",
              "text": "the pronunciation"
            },
            {
              "id": "d",
              "text": "the source date"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Slash marks show how to pronounce current.",
          "id": "reading-u02-l03-q07",
          "conceptTag": "dictionary-entry",
          "reviewCardId": "reading-u02-l03-c2"
        },
        {
          "type": "true-false",
          "prompt": "A numbered dictionary entry may list more than one meaning.",
          "choices": [
            {
              "id": "true",
              "text": "True — current and bank each have two"
            },
            {
              "id": "false",
              "text": "False — every word has one meaning"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The packet displays multiple numbered meanings.",
          "id": "reading-u02-l03-q08",
          "conceptTag": "dictionary-entry",
          "reviewCardId": "reading-u02-l03-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which meaning of current fits the creek sentence?",
          "choices": [
            {
              "id": "a",
              "text": "a steady movement of water"
            },
            {
              "id": "b",
              "text": "the present time"
            },
            {
              "id": "c",
              "text": "happening now"
            },
            {
              "id": "d",
              "text": "a money business"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Water moving through a creek is a current.",
          "id": "reading-u02-l03-q09",
          "conceptTag": "precise-meaning",
          "reviewCardId": "reading-u02-l03-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which evidence best rules out the money meaning of bank?",
          "choices": [
            {
              "id": "a",
              "text": "The word is a noun"
            },
            {
              "id": "b",
              "text": "The bank is grassy and beside a creek"
            },
            {
              "id": "c",
              "text": "Bank has four letters"
            },
            {
              "id": "d",
              "text": "The note mentions birds later"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Creek-side grass supports the land meaning.",
          "id": "reading-u02-l03-q10",
          "conceptTag": "precise-meaning",
          "reviewCardId": "reading-u02-l03-c3"
        },
        {
          "type": "fill-blank",
          "prompt": "In the field note, slightly salty mixed water is called ___.",
          "acceptedAnswers": [
            "brackish"
          ],
          "explanation": "The glossary gives brackish as the exact term.",
          "id": "reading-u02-l03-q11",
          "conceptTag": "precise-meaning",
          "reviewCardId": "reading-u02-l03-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response selects a precise meaning?",
          "choices": [
            {
              "id": "a",
              "text": "Bank is the first meaning everywhere"
            },
            {
              "id": "b",
              "text": "Bank means money because I know banks"
            },
            {
              "id": "c",
              "text": "Bank is a noun, so either meaning works"
            },
            {
              "id": "d",
              "text": "Bank means land beside water because the grassy creek context matches entry 1"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It joins entry and context evidence.",
          "id": "reading-u02-l03-q12",
          "conceptTag": "precise-meaning",
          "reviewCardId": "reading-u02-l03-c3"
        },
        {
          "type": "true-false",
          "prompt": "A reader should compare a definition with the sentence before accepting it.",
          "choices": [
            {
              "id": "true",
              "text": "True — context selects the precise meaning"
            },
            {
              "id": "false",
              "text": "False — always choose meaning 1"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Number order alone does not select the contextual meaning.",
          "id": "reading-u02-l03-q13",
          "conceptTag": "precise-meaning",
          "reviewCardId": "reading-u02-l03-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
