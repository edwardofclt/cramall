import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit05Lessons = [
  {
    "id": "reading-u05-l01",
    "unitId": "reading-u05",
    "title": "Explain Stated and Implied Central Ideas",
    "indicatorCodes": [
      "ELA.4.AOR.2.2"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "A central idea is a complete statement about an informational text."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "It may be stated directly or implied by connected details."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s identify it, select support, and explain how each detail develops it."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u05-l01-c1",
        "title": "Find the Central Idea",
        "blocks": [
          {
            "kind": "text",
            "text": "Ask what most of the text explains and say it as a complete sentence."
          },
          {
            "kind": "example",
            "text": "The opening states: “Salt marshes support wildlife and shorelines.”"
          },
          {
            "kind": "tip",
            "text": "Do not choose a fact that covers only one sentence."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which is a central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Salt marshes support wildlife and shorelines"
            },
            {
              "id": "b",
              "text": "Young fish hide"
            },
            {
              "id": "c",
              "text": "Tides rise"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It covers the text’s main explanation."
        }
      },
      {
        "id": "reading-u05-l01-c2",
        "title": "Choose Supporting Details",
        "blocks": [
          {
            "kind": "text",
            "text": "A supporting detail proves, explains, or illustrates the central idea."
          },
          {
            "kind": "example",
            "text": "Young fish shelter among grasses and plants slow waves."
          },
          {
            "kind": "tip",
            "text": "Interesting facts that do not support the idea should be left out."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "Salt marshes support wildlife and shorelines",
              "Every wet place is a salt marsh"
            ],
            "requiredDetailCount": 2,
            "source": {
              "title": "Why Salt Marshes Matter",
              "text": "Why Salt Marshes Matter\n\nSalt marshes support wildlife and shorelines. Twice each day, tides carry water through winding creeks among salt-tolerant grasses. Young fish and shrimp hide between the stems, where larger animals have trouble reaching them. Wading birds feed in the shallow water.\n\nMarsh plants also slow moving water. Their stems bend as waves pass, and their roots hold muddy soil. This buffering can reduce some wave force near the shoreline. The marsh does not stop every storm, but it can soften ordinary wave action.\n\nIn another marsh, researchers count young fish, map nesting areas, and measure changes along the bank. These separate details point to an idea the paragraph does not state in one sentence: a healthy marsh provides several connected benefits. It serves as nursery habitat, feeding space, and a living shoreline buffer. A puddle after rain is not automatically a salt marsh; tides, salty water, soils, and adapted plants work together in this ecosystem."
            },
            "details": [
              {
                "id": "nursery",
                "text": "Young fish find shelter among marsh grasses.",
                "supports": ["Salt marshes support wildlife and shorelines"],
                "sourceQuote": "Young fish and shrimp hide between the stems"
              },
              {
                "id": "buffer",
                "text": "Marsh plants slow waves near the shoreline.",
                "supports": ["Salt marshes support wildlife and shorelines"],
                "sourceQuote": "Their stems bend as waves pass, and their roots hold muddy soil"
              },
              {
                "id": "definition",
                "text": "Any place with rainwater is a salt marsh.",
                "sourceContradictsDetail": true,
                "supports": ["Every wet place is a salt marsh"],
                "sourceQuote": "A puddle after rain is not automatically a salt marsh"
              }
            ]
          }
        },
        "widgetCoach": {
          "intro": [
            {"speaker":"guide","pose":"think","text":"Let’s build an idea board and check it against the complete passage."},
            {"speaker":"kid","text":"I’ll propose an idea, attach details, and check each one against its source quote."}
          ],
          "reactions": {
            "strategy": {"text":"Ask whether this detail explains an important part of the complete passage.","pose":"think"},
            "retry": {"text":"That detail does not support the idea you chose. Use its source quote to reconsider.","pose":"oops"},
            "milestone": {"text":"Your checked details explain important parts of the passage. Compare their source quotes.","pose":"cheer"},
            "complete": {"text":"You connected the central idea to important details from the whole passage.","pose":"cheer"}
          }
        },
        "check": {
          "prompt": "Which detail supports shoreline protection?",
          "choices": [
            {
              "id": "a",
              "text": "Marsh stems slow waves"
            },
            {
              "id": "b",
              "text": "Birds have feathers"
            },
            {
              "id": "c",
              "text": "Researchers carry pencils"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It explains the shoreline-buffer part of the idea."
        }
      },
      {
        "id": "reading-u05-l01-c3",
        "title": "Explain How Details Develop the Idea",
        "blocks": [
          {
            "kind": "text",
            "text": "Explain the role of each detail: example, reason, evidence, or clarification."
          },
          {
            "kind": "example",
            "text": "Fish shelter develops the wildlife part; roots and stems develop the shoreline part."
          },
          {
            "kind": "tip",
            "text": "Use Detail → Part of idea → Connection."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "How does the fish detail develop the idea?",
          "choices": [
            {
              "id": "a",
              "text": "It gives an example of marsh wildlife support"
            },
            {
              "id": "b",
              "text": "It proves every fish lives there"
            },
            {
              "id": "c",
              "text": "It describes a storm"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Shelter among grasses illustrates habitat support."
        }
      }
    ],
    "workedExample": {
      "title": "Connect marsh details to the central idea",
      "passage": {
        "title": "Why Salt Marshes Matter",
        "text": "Why Salt Marshes Matter\n\nSalt marshes support wildlife and shorelines. Twice each day, tides carry water through winding creeks among salt-tolerant grasses. Young fish and shrimp hide between the stems, where larger animals have trouble reaching them. Wading birds feed in the shallow water.\n\nMarsh plants also slow moving water. Their stems bend as waves pass, and their roots hold muddy soil. This buffering can reduce some wave force near the shoreline. The marsh does not stop every storm, but it can soften ordinary wave action.\n\nIn another marsh, researchers count young fish, map nesting areas, and measure changes along the bank. These separate details point to an idea the paragraph does not state in one sentence: a healthy marsh provides several connected benefits. It serves as nursery habitat, feeding space, and a living shoreline buffer. A puddle after rain is not automatically a salt marsh; tides, salty water, soils, and adapted plants work together in this ecosystem."
      },
      "steps": [
        "Read the stated first sentence.",
        "Sort details under wildlife and shoreline support.",
        "Explain how the two groups together develop the central idea."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Why Salt Marshes Matter”",
        "text": "Why Salt Marshes Matter\n\nSalt marshes support wildlife and shorelines. Twice each day, tides carry water through winding creeks among salt-tolerant grasses. Young fish and shrimp hide between the stems, where larger animals have trouble reaching them. Wading birds feed in the shallow water.\n\nMarsh plants also slow moving water. Their stems bend as waves pass, and their roots hold muddy soil. This buffering can reduce some wave force near the shoreline. The marsh does not stop every storm, but it can soften ordinary wave action.\n\nIn another marsh, researchers count young fish, map nesting areas, and measure changes along the bank. These separate details point to an idea the paragraph does not state in one sentence: a healthy marsh provides several connected benefits. It serves as nursery habitat, feeding space, and a living shoreline buffer. A puddle after rain is not automatically a salt marsh; tides, salty water, soils, and adapted plants work together in this ecosystem."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "What is the stated central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Salt marshes support wildlife and shorelines"
            },
            {
              "id": "b",
              "text": "Every wet place is a marsh"
            },
            {
              "id": "c",
              "text": "Only birds use marshes"
            },
            {
              "id": "d",
              "text": "Marshes stop every storm"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The opening states the idea directly.",
          "id": "reading-u05-l01-q01",
          "conceptTag": "central-idea",
          "reviewCardId": "reading-u05-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "A central idea should cover the whole text, not one small fact.",
          "choices": [
            {
              "id": "true",
              "text": "True — it unifies the details"
            },
            {
              "id": "false",
              "text": "False — choose the smallest fact"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "A central idea explains what the details collectively develop.",
          "id": "reading-u05-l01-q02",
          "conceptTag": "central-idea",
          "reviewCardId": "reading-u05-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which central idea is supported by the research paragraph’s observations?",
          "choices": [
            {
              "id": "a",
              "text": "Researchers only study fish"
            },
            {
              "id": "b",
              "text": "Maps are the main benefit"
            },
            {
              "id": "c",
              "text": "Healthy marshes provide several connected benefits"
            },
            {
              "id": "d",
              "text": "Every bank changes equally"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The grouped observations support several connected benefits.",
          "id": "reading-u05-l01-q03",
          "conceptTag": "central-idea",
          "reviewCardId": "reading-u05-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why is “Wading birds feed” not the whole central idea?",
          "choices": [
            {
              "id": "a",
              "text": "It is false"
            },
            {
              "id": "b",
              "text": "It is an opinion"
            },
            {
              "id": "c",
              "text": "It is a title"
            },
            {
              "id": "d",
              "text": "It covers only one supporting detail"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The text explains more than bird feeding.",
          "id": "reading-u05-l01-q04",
          "conceptTag": "central-idea",
          "reviewCardId": "reading-u05-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail supports the wildlife part?",
          "choices": [
            {
              "id": "a",
              "text": "Roots hold soil"
            },
            {
              "id": "b",
              "text": "Young fish hide among grass stems"
            },
            {
              "id": "c",
              "text": "Waves pass the marsh"
            },
            {
              "id": "d",
              "text": "Tides happen twice daily"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Fish shelter is wildlife support.",
          "id": "reading-u05-l01-q05",
          "conceptTag": "supporting-details",
          "reviewCardId": "reading-u05-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "“Marsh plants slow moving water” supports the shoreline part.",
          "choices": [
            {
              "id": "true",
              "text": "True — it explains buffering"
            },
            {
              "id": "false",
              "text": "False — it only describes fish"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Slower water can reduce wave force.",
          "id": "reading-u05-l01-q06",
          "conceptTag": "supporting-details",
          "reviewCardId": "reading-u05-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail does not support “every wet place is a salt marsh”?",
          "choices": [
            {
              "id": "a",
              "text": "Rain makes puddles"
            },
            {
              "id": "b",
              "text": "Wet places contain water"
            },
            {
              "id": "c",
              "text": "A marsh requires tides, salt, soil, and adapted plants"
            },
            {
              "id": "d",
              "text": "Some ground is muddy"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The clarification directly rejects the false idea.",
          "id": "reading-u05-l01-q07",
          "conceptTag": "supporting-details",
          "reviewCardId": "reading-u05-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which pair best spans both parts of the central idea?",
          "choices": [
            {
              "id": "a",
              "text": "birds and fish"
            },
            {
              "id": "b",
              "text": "tides and researchers"
            },
            {
              "id": "c",
              "text": "mud and maps"
            },
            {
              "id": "d",
              "text": "fish shelter and wave slowing"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The pair covers wildlife and shorelines.",
          "id": "reading-u05-l01-q08",
          "conceptTag": "supporting-details",
          "reviewCardId": "reading-u05-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "How do roots develop the central idea?",
          "choices": [
            {
              "id": "a",
              "text": "They hold muddy soil, explaining one way marshes support shorelines"
            },
            {
              "id": "b",
              "text": "They feed every bird"
            },
            {
              "id": "c",
              "text": "They cause all tides"
            },
            {
              "id": "d",
              "text": "They count fish"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Root action develops shoreline support.",
          "id": "reading-u05-l01-q09",
          "conceptTag": "idea-development",
          "reviewCardId": "reading-u05-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "A detail can develop one part of a two-part central idea.",
          "choices": [
            {
              "id": "true",
              "text": "True — details combine across the text"
            },
            {
              "id": "false",
              "text": "False — every detail must prove every part"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Different details build different parts.",
          "id": "reading-u05-l01-q10",
          "conceptTag": "idea-development",
          "reviewCardId": "reading-u05-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "What role does the final clarification play?",
          "choices": [
            {
              "id": "a",
              "text": "It changes the topic"
            },
            {
              "id": "b",
              "text": "It defines boundaries so readers do not overgeneralize"
            },
            {
              "id": "c",
              "text": "It adds a fictional character"
            },
            {
              "id": "d",
              "text": "It proves puddles are marshes"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "It makes the idea precise.",
          "id": "reading-u05-l01-q11",
          "conceptTag": "idea-development",
          "reviewCardId": "reading-u05-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation is complete?",
          "choices": [
            {
              "id": "a",
              "text": "Fish are there"
            },
            {
              "id": "b",
              "text": "Marshes matter"
            },
            {
              "id": "c",
              "text": "Fish shelter shows wildlife support, while stems slowing waves show shoreline support"
            },
            {
              "id": "d",
              "text": "The text has three paragraphs"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It links two details to the two idea parts.",
          "id": "reading-u05-l01-q12",
          "conceptTag": "idea-development",
          "reviewCardId": "reading-u05-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response uses the required format?",
          "choices": [
            {
              "id": "a",
              "text": "Roots — good"
            },
            {
              "id": "b",
              "text": "Birds are interesting"
            },
            {
              "id": "c",
              "text": "The idea is marshes"
            },
            {
              "id": "d",
              "text": "Roots hold soil → shoreline support → less erosion near ordinary waves"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It states detail, idea part, and connection.",
          "id": "reading-u05-l01-q13",
          "conceptTag": "idea-development",
          "reviewCardId": "reading-u05-l01-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
