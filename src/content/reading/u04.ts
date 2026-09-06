import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit04Lessons = [
  {
    "id": "reading-u04-l01",
    "unitId": "reading-u04",
    "title": "Explain Explicit and Implied Themes",
    "indicatorCodes": [
      "ELA.4.AOR.2.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "A topic names a subject; a theme states a transferable message."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Some texts state a theme, while others imply it through choices and consequences."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s gather key details and explain how the message grows."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u04-l01-c1",
        "title": "State a Theme as a Message",
        "blocks": [
          {
            "kind": "text",
            "text": "A theme is a complete message that applies beyond one story."
          },
          {
            "kind": "example",
            "text": "“Generosity strengthens a community” is a theme; “gardening” is only a topic."
          },
          {
            "kind": "tip",
            "text": "State the message without using a character’s name."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which choice is a theme?",
          "choices": [
            {
              "id": "a",
              "text": "Generosity strengthens a community"
            },
            {
              "id": "b",
              "text": "Mateo plants peppers"
            },
            {
              "id": "c",
              "text": "Gardening"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It is a complete transferable message."
        }
      },
      {
        "id": "reading-u04-l01-c2",
        "title": "Gather Key Details",
        "blocks": [
          {
            "kind": "text",
            "text": "Strong theme evidence includes repeated choices, turning points, and consequences."
          },
          {
            "kind": "example",
            "text": "Mateo shares the extra row; later Ana’s stakes help his tomatoes."
          },
          {
            "kind": "tip",
            "text": "Choose details that show both the message and its result."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "widget": {
          "type": "theme-evidence-collector",
          "config": {
            "themeChoices": [
              "Generosity strengthens a community",
              "Gardening takes careful planning"
            ],
            "requiredEvidenceCount": 2,
            "source": {
              "title": "The Extra Row",
              "text": "The Extra Row\n\nMateo measured straight garden rows for the neighborhood planting day. When Mrs. Green asked whether the new family next door could use the extra row beside his tomatoes, Mateo shook his head. He had planned to fill it with peppers, although he already had more seedlings than his yard could hold.\n\nThat night, hard rain washed the neighbors’ newly planted seedlings from their sloped bed. The next morning, Mateo found Ana gathering broken stems. He looked at his untouched extra row, then carried over a tray of pepper seedlings. “We can plant these together,” he said.\n\nAna and Mateo rebuilt the row, pressed soil around each plant, and shared the watering job. A week later, Ana brought stakes that kept Mateo’s tomato vines upright. Their two families began trading garden tasks and vegetables.\n\nNo narrator states the story’s lesson directly. Mateo’s choice to give up space helps Ana, and that generosity later brings cooperation back to him. The events support the implied theme that generosity strengthens a community."
            },
            "evidence": [
              {
                "id": "shares",
                "text": "Mateo gives his neighbor part of the extra row.",
                "supports": ["Generosity strengthens a community"],
                "sourceQuote": "carried over a tray of pepper seedlings"
              },
              {
                "id": "replants",
                "text": "They replant the washed-out seedlings together.",
                "supports": ["Generosity strengthens a community"],
                "sourceQuote": "Ana and Mateo rebuilt the row"
              },
              {
                "id": "measures",
                "text": "Mateo measures the garden rows before planting.",
                "supports": ["Gardening takes careful planning"],
                "sourceQuote": "Mateo measured straight garden rows"
              }
            ]
          }
        },
        "check": {
          "prompt": "Which detail best supports generosity?",
          "choices": [
            {
              "id": "a",
              "text": "Mateo gives Ana part of the extra row"
            },
            {
              "id": "b",
              "text": "Mateo measures rows"
            },
            {
              "id": "c",
              "text": "Rain falls at night"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That action directly shows sharing."
        }
      },
      {
        "id": "reading-u04-l01-c3",
        "title": "Explain How the Theme Develops",
        "blocks": [
          {
            "kind": "text",
            "text": "Explain development as a chain: early attitude → key choice → consequence → message."
          },
          {
            "kind": "example",
            "text": "Mateo guards the row, sees Ana’s loss, shares, and receives cooperation."
          },
          {
            "kind": "tip",
            "text": "An explanation needs evidence and reasoning, not a device label."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "What consequence develops the theme?",
          "choices": [
            {
              "id": "a",
              "text": "The families begin sharing work and vegetables"
            },
            {
              "id": "b",
              "text": "The rows are straight"
            },
            {
              "id": "c",
              "text": "The rain stops"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The community grows more cooperative after Mateo shares."
        }
      }
    ],
    "workedExample": {
      "title": "Infer generosity from choices and consequences",
      "passage": {
        "title": "The Extra Row",
        "text": "The Extra Row\n\nMateo measured straight garden rows for the neighborhood planting day. When Mrs. Green asked whether the new family next door could use the extra row beside his tomatoes, Mateo shook his head. He had planned to fill it with peppers, although he already had more seedlings than his yard could hold.\n\nThat night, hard rain washed the neighbors’ newly planted seedlings from their sloped bed. The next morning, Mateo found Ana gathering broken stems. He looked at his untouched extra row, then carried over a tray of pepper seedlings. “We can plant these together,” he said.\n\nAna and Mateo rebuilt the row, pressed soil around each plant, and shared the watering job. A week later, Ana brought stakes that kept Mateo’s tomato vines upright. Their two families began trading garden tasks and vegetables.\n\nNo narrator states the story’s lesson directly. Mateo’s choice to give up space helps Ana, and that generosity later brings cooperation back to him. The events support the implied theme that generosity strengthens a community."
      },
      "steps": [
        "State the topic as generosity.",
        "Compare Mateo’s refusal with his later decision and its consequences.",
        "Conclude that generosity strengthens a community and cite both the shared row and later cooperation."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “The Extra Row”",
        "text": "The Extra Row\n\nMateo measured straight garden rows for the neighborhood planting day. When Mrs. Green asked whether the new family next door could use the extra row beside his tomatoes, Mateo shook his head. He had planned to fill it with peppers, although he already had more seedlings than his yard could hold.\n\nThat night, hard rain washed the neighbors’ newly planted seedlings from their sloped bed. The next morning, Mateo found Ana gathering broken stems. He looked at his untouched extra row, then carried over a tray of pepper seedlings. “We can plant these together,” he said.\n\nAna and Mateo rebuilt the row, pressed soil around each plant, and shared the watering job. A week later, Ana brought stakes that kept Mateo’s tomato vines upright. Their two families began trading garden tasks and vegetables.\n\nNo narrator states the story’s lesson directly. Mateo’s choice to give up space helps Ana, and that generosity later brings cooperation back to him. The events support the implied theme that generosity strengthens a community."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which is the strongest theme statement?",
          "choices": [
            {
              "id": "a",
              "text": "Generosity strengthens a community"
            },
            {
              "id": "b",
              "text": "Gardens need rain"
            },
            {
              "id": "c",
              "text": "Mateo owns peppers"
            },
            {
              "id": "d",
              "text": "Neighbors live nearby"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Only the first is a transferable message supported by the whole story.",
          "id": "reading-u04-l01-q01",
          "conceptTag": "theme-statement",
          "reviewCardId": "reading-u04-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "“Gardening” is a theme because it names the story’s subject.",
          "choices": [
            {
              "id": "true",
              "text": "True — one word is a full message"
            },
            {
              "id": "false",
              "text": "False — it is a topic, not a message"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "A theme expresses what the text suggests about a topic.",
          "id": "reading-u04-l01-q02",
          "conceptTag": "theme-statement",
          "reviewCardId": "reading-u04-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why is “Sharing can lead to cooperation” a theme?",
          "choices": [
            {
              "id": "a",
              "text": "It names Mateo"
            },
            {
              "id": "b",
              "text": "It retells the storm"
            },
            {
              "id": "c",
              "text": "It expresses a lesson beyond this story"
            },
            {
              "id": "d",
              "text": "It lists garden tools"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It transfers to other situations.",
          "id": "reading-u04-l01-q03",
          "conceptTag": "theme-statement",
          "reviewCardId": "reading-u04-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which statement is unsupported?",
          "choices": [
            {
              "id": "a",
              "text": "Generosity can return through cooperation"
            },
            {
              "id": "b",
              "text": "People can revise a selfish choice"
            },
            {
              "id": "c",
              "text": "Helping neighbors builds connection"
            },
            {
              "id": "d",
              "text": "Every garden must grow peppers"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The story never requires peppers in every garden.",
          "id": "reading-u04-l01-q04",
          "conceptTag": "theme-statement",
          "reviewCardId": "reading-u04-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail most directly shows Mateo changing?",
          "choices": [
            {
              "id": "a",
              "text": "He measures rows"
            },
            {
              "id": "b",
              "text": "He offers the extra row and seedlings"
            },
            {
              "id": "c",
              "text": "Rain washes a bed"
            },
            {
              "id": "d",
              "text": "Ana gathers stems"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "His offer reverses his refusal.",
          "id": "reading-u04-l01-q05",
          "conceptTag": "theme-evidence",
          "reviewCardId": "reading-u04-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "Ana’s later help with tomato stakes supports the community theme.",
          "choices": [
            {
              "id": "true",
              "text": "True — help is returned"
            },
            {
              "id": "false",
              "text": "False — it is unrelated"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The returned help shows reciprocal community care.",
          "id": "reading-u04-l01-q06",
          "conceptTag": "theme-evidence",
          "reviewCardId": "reading-u04-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which pair is strongest evidence?",
          "choices": [
            {
              "id": "a",
              "text": "straight rows and rain"
            },
            {
              "id": "b",
              "text": "tomatoes and peppers"
            },
            {
              "id": "c",
              "text": "Mateo shares; Ana later helps"
            },
            {
              "id": "d",
              "text": "a tray and stakes"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The actions and consequences support the message.",
          "id": "reading-u04-l01-q07",
          "conceptTag": "theme-evidence",
          "reviewCardId": "reading-u04-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail is least useful as theme evidence?",
          "choices": [
            {
              "id": "a",
              "text": "Mateo first refuses"
            },
            {
              "id": "b",
              "text": "Mateo shares after seeing the damage"
            },
            {
              "id": "c",
              "text": "Families trade tasks"
            },
            {
              "id": "d",
              "text": "Mateo measured straight rows"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Measurement does not develop generosity.",
          "id": "reading-u04-l01-q08",
          "conceptTag": "theme-evidence",
          "reviewCardId": "reading-u04-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does the theme begin developing?",
          "choices": [
            {
              "id": "a",
              "text": "Mateo’s refusal establishes a contrast for his later generosity"
            },
            {
              "id": "b",
              "text": "The narrator states the moral"
            },
            {
              "id": "c",
              "text": "Ana teaches a speech"
            },
            {
              "id": "d",
              "text": "The rain solves everything"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The early refusal makes the change meaningful.",
          "id": "reading-u04-l01-q09",
          "conceptTag": "theme-development",
          "reviewCardId": "reading-u04-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "Before the final explanatory paragraph, readers must infer the theme from Mateo’s actions and their consequences.",
          "choices": [
            {
              "id": "true",
              "text": "True — the events imply the message before it is explained"
            },
            {
              "id": "false",
              "text": "False — Mateo announces it"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Mateo never states the message; the final explanatory paragraph names the theme after the narrative events imply it.",
          "id": "reading-u04-l01-q10",
          "conceptTag": "theme-development",
          "reviewCardId": "reading-u04-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "What is the key turning point?",
          "choices": [
            {
              "id": "a",
              "text": "The rows are measured"
            },
            {
              "id": "b",
              "text": "Mateo sees Ana’s damaged seedlings and chooses to share"
            },
            {
              "id": "c",
              "text": "Tomatoes need stakes"
            },
            {
              "id": "d",
              "text": "Families eat vegetables"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "His choice changes the relationship.",
          "id": "reading-u04-l01-q11",
          "conceptTag": "theme-development",
          "reviewCardId": "reading-u04-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation best shows development?",
          "choices": [
            {
              "id": "a",
              "text": "The story is about a garden"
            },
            {
              "id": "b",
              "text": "Mateo has many seedlings"
            },
            {
              "id": "c",
              "text": "Mateo moves from guarding space to sharing it, and the resulting cooperation supports the theme"
            },
            {
              "id": "d",
              "text": "Rain is bad"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It links change, result, and message.",
          "id": "reading-u04-l01-q12",
          "conceptTag": "theme-development",
          "reviewCardId": "reading-u04-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response uses evidence and reasoning?",
          "choices": [
            {
              "id": "a",
              "text": "Theme: kindness"
            },
            {
              "id": "b",
              "text": "Mateo is nice"
            },
            {
              "id": "c",
              "text": "Gardens create themes"
            },
            {
              "id": "d",
              "text": "Mateo gives a row and Ana later helps; these connected acts show generosity strengthening their community"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It cites details and explains their connection.",
          "id": "reading-u04-l01-q13",
          "conceptTag": "theme-development",
          "reviewCardId": "reading-u04-l01-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
