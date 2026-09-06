import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit07Lessons = [
  {
    "id": "reading-u07-l01",
    "unitId": "reading-u07",
    "title": "Use Text Features and Informational Structures",
    "indicatorCodes": [
      "ELA.4.AOR.5.2"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Text features help readers locate and interpret information."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Structures organize relationships among ideas."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s name each contribution and explain how it builds meaning."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u07-l01-c1",
        "title": "Navigate with Text Features",
        "blocks": [
          {
            "kind": "text",
            "text": "Headings preview sections; captions explain visuals; glossaries define specialized terms."
          },
          {
            "kind": "example",
            "text": "The caption explains repair marks and detour arrows that the diagram description names."
          },
          {
            "kind": "tip",
            "text": "Name the information a feature adds, not just its label."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "widget": {
          "type": "text-structure-sorter",
          "config": {
            "excerpts": [
              {
                "id": "caption",
                "text": "Repair marks show where adults will replace damaged boards; arrows guide visitors around the closed section.",
                "structure": "description"
              },
              {
                "id": "order",
                "text": "First, inspect every board from the marked path. Next, replace the damaged boards. Finally, reopen the safe section.",
                "structure": "sequence"
              },
              {
                "id": "materials",
                "text": "Recycled wood boards cost less, while composite boards last longer and resist water.",
                "structure": "compare-contrast"
              },
              {
                "id": "loose",
                "text": "Loose boards can catch a shoe, so the crew replaces them before reopening the walkway.",
                "structure": "problem-solution"
              }
            ]
          }
        },
        "check": {
          "prompt": "What does the caption contribute?",
          "choices": [
            {
              "id": "a",
              "text": "It explains repair marks and detour arrows"
            },
            {
              "id": "b",
              "text": "It defines composite"
            },
            {
              "id": "c",
              "text": "It orders all repair steps"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That is the caption’s visible information."
        }
      },
      {
        "id": "reading-u07-l01-c2",
        "title": "Recognize Three Text Structures",
        "blocks": [
          {
            "kind": "text",
            "text": "Problem-solution presents an issue and response; sequence orders steps; compare-contrast shows similarities and differences."
          },
          {
            "kind": "example",
            "text": "Loose boards/replacement is problem-solution; First/Next/Then is sequence; wood/composite is compare-contrast."
          },
          {
            "kind": "tip",
            "text": "Signal words help, but verify the relationship."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "widget": {
          "type": "text-structure-sorter",
          "config": {
            "excerpts": [
              {
                "id": "repair",
                "text": "Loose boards created a tripping problem, so volunteers replaced them.",
                "structure": "problem-solution"
              },
              {
                "id": "steps",
                "text": "First inspect the boards, next mark damage, and then make repairs.",
                "structure": "sequence"
              },
              {
                "id": "materials",
                "text": "Recycled boards cost less, while composite boards last longer.",
                "structure": "compare-contrast"
              }
            ]
          }
        },
        "check": {
          "prompt": "Which structure uses First, Next, Then?",
          "choices": [
            {
              "id": "a",
              "text": "sequence"
            },
            {
              "id": "b",
              "text": "compare-contrast"
            },
            {
              "id": "c",
              "text": "problem-solution"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Those words order steps."
        }
      },
      {
        "id": "reading-u07-l01-c3",
        "title": "Explain How Organization Builds Meaning",
        "blocks": [
          {
            "kind": "text",
            "text": "Organization makes relationships easier to follow."
          },
          {
            "kind": "example",
            "text": "The sequence protects safety by preserving the repair order; comparison supports a material decision."
          },
          {
            "kind": "tip",
            "text": "Use Structure → Relationship → Reader benefit."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "Ordered steps keep the repair safe and complete",
              "Comparing two materials supports a decision"
            ],
            "details": [
              {
                "id": "first",
                "text": "First, inspect every board from the marked path.",
                "supports": [
                  "Ordered steps keep the repair safe and complete"
                ]
              },
              {
                "id": "finally",
                "text": "Finally, reopen the safe section.",
                "supports": [
                  "Ordered steps keep the repair safe and complete"
                ]
              },
              {
                "id": "cost",
                "text": "Recycled wood boards cost less, while composite boards last longer and resist water.",
                "supports": [
                  "Comparing two materials supports a decision"
                ]
              },
              {
                "id": "both",
                "text": "Both kinds of board need secure fasteners.",
                "supports": [
                  "Comparing two materials supports a decision"
                ]
              }
            ],
            "requiredDetailCount": 2
          }
        },
        "check": {
          "prompt": "How does compare-contrast help?",
          "choices": [
            {
              "id": "a",
              "text": "It shows tradeoffs between two materials"
            },
            {
              "id": "b",
              "text": "It hides differences"
            },
            {
              "id": "c",
              "text": "It gives repair order"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The section compares cost, appearance, and durability."
        }
      }
    ],
    "workedExample": {
      "title": "Explain how features and structure organize the guide",
      "passage": {
        "title": "Boardwalk Repair Guide",
        "text": "Boardwalk Repair Guide\n\nHeading: Why Repairs Matter\nLoose boards created a tripping problem, so volunteers replaced them with secure boards.\n\nHeading: Inspection Steps\nFirst, inspect every board from the marked path. Next, mark loose or cracked boards. Then, have trained adults make repairs. Finally, reopen the safe section.\n\nHeading: Comparing Materials\nRecycled wood boards cost less and match the older walkway, while composite boards last longer and resist water. Both need secure fasteners.\n\nDiagram description: A top-view rectangle labels the closed section, the safe walking route, and three repair marks. Caption: “Repair marks show where adults will replace damaged boards; arrows guide visitors around the closed section.”\n\nGlossary: fastener — a screw or other piece that joins materials; composite — material made by combining substances.\n\nThe headings preview each section. The diagram and caption show locations and movement. The glossary clarifies technical words. Structure helps readers anticipate whether a section will present a problem and response, ordered steps, or similarities and differences."
      },
      "steps": [
        "Use the heading to predict the section purpose.",
        "Identify the relationship among its sentences.",
        "Explain how the feature and structure help a reader act or understand."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Boardwalk Repair Guide”",
        "text": "Boardwalk Repair Guide\n\nHeading: Why Repairs Matter\nLoose boards created a tripping problem, so volunteers replaced them with secure boards.\n\nHeading: Inspection Steps\nFirst, inspect every board from the marked path. Next, mark loose or cracked boards. Then, have trained adults make repairs. Finally, reopen the safe section.\n\nHeading: Comparing Materials\nRecycled wood boards cost less and match the older walkway, while composite boards last longer and resist water. Both need secure fasteners.\n\nDiagram description: A top-view rectangle labels the closed section, the safe walking route, and three repair marks. Caption: “Repair marks show where adults will replace damaged boards; arrows guide visitors around the closed section.”\n\nGlossary: fastener — a screw or other piece that joins materials; composite — material made by combining substances.\n\nThe headings preview each section. The diagram and caption show locations and movement. The glossary clarifies technical words. Structure helps readers anticipate whether a section will present a problem and response, ordered steps, or similarities and differences."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which feature previews “Inspection Steps”?",
          "choices": [
            {
              "id": "a",
              "text": "The heading"
            },
            {
              "id": "b",
              "text": "The glossary"
            },
            {
              "id": "c",
              "text": "The caption"
            },
            {
              "id": "d",
              "text": "The fastener"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The heading names the section.",
          "id": "reading-u07-l01-q01",
          "conceptTag": "text-features",
          "reviewCardId": "reading-u07-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "A glossary helps clarify specialized terms such as composite.",
          "choices": [
            {
              "id": "true",
              "text": "True — it supplies a definition"
            },
            {
              "id": "false",
              "text": "False — it maps the route"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The glossary defines the term.",
          "id": "reading-u07-l01-q02",
          "conceptTag": "text-features",
          "reviewCardId": "reading-u07-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the diagram description add?",
          "choices": [
            {
              "id": "a",
              "text": "material prices"
            },
            {
              "id": "b",
              "text": "word pronunciations"
            },
            {
              "id": "c",
              "text": "locations of closure, route, and repairs"
            },
            {
              "id": "d",
              "text": "repair history"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It spatially locates features.",
          "id": "reading-u07-l01-q03",
          "conceptTag": "text-features",
          "reviewCardId": "reading-u07-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response explains a feature’s contribution?",
          "choices": [
            {
              "id": "a",
              "text": "It has a caption"
            },
            {
              "id": "b",
              "text": "It is bold"
            },
            {
              "id": "c",
              "text": "It comes last"
            },
            {
              "id": "d",
              "text": "The caption connects marks and arrows to repairs and a safe detour"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It states the added information.",
          "id": "reading-u07-l01-q04",
          "conceptTag": "text-features",
          "reviewCardId": "reading-u07-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What structure organizes “Why Repairs Matter”?",
          "choices": [
            {
              "id": "a",
              "text": "sequence"
            },
            {
              "id": "b",
              "text": "problem-solution"
            },
            {
              "id": "c",
              "text": "compare-contrast"
            },
            {
              "id": "d",
              "text": "description only"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Loose boards are the problem; replacement is the solution.",
          "id": "reading-u07-l01-q05",
          "conceptTag": "structure-types",
          "reviewCardId": "reading-u07-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "The material section uses compare-contrast.",
          "choices": [
            {
              "id": "true",
              "text": "True — it weighs cost, match, and durability"
            },
            {
              "id": "false",
              "text": "False — it orders repair steps"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The section compares two choices.",
          "id": "reading-u07-l01-q06",
          "conceptTag": "structure-types",
          "reviewCardId": "reading-u07-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which signal set points to chronology?",
          "choices": [
            {
              "id": "a",
              "text": "because/so"
            },
            {
              "id": "b",
              "text": "while/both"
            },
            {
              "id": "c",
              "text": "first/next/then/finally"
            },
            {
              "id": "d",
              "text": "problem/solution"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Those terms mark sequence.",
          "id": "reading-u07-l01-q07",
          "conceptTag": "structure-types",
          "reviewCardId": "reading-u07-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which sentence is the solution?",
          "choices": [
            {
              "id": "a",
              "text": "Boards are loose"
            },
            {
              "id": "b",
              "text": "Visitors use walkways"
            },
            {
              "id": "c",
              "text": "Damage creates risk"
            },
            {
              "id": "d",
              "text": "Volunteers replace boards securely"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Replacement answers the problem.",
          "id": "reading-u07-l01-q08",
          "conceptTag": "structure-types",
          "reviewCardId": "reading-u07-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does sequence build meaning?",
          "choices": [
            {
              "id": "a",
              "text": "It shows the safe order for inspection and repair"
            },
            {
              "id": "b",
              "text": "It compares costs"
            },
            {
              "id": "c",
              "text": "It defines fastener"
            },
            {
              "id": "d",
              "text": "It labels a route"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Order matters to the procedure.",
          "id": "reading-u07-l01-q09",
          "conceptTag": "structure-meaning",
          "reviewCardId": "reading-u07-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "Structure labels alone explain meaning without examining idea relationships.",
          "choices": [
            {
              "id": "true",
              "text": "True — labels are enough"
            },
            {
              "id": "false",
              "text": "False — readers must explain relationships"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "The standard requires contribution, not naming only.",
          "id": "reading-u07-l01-q10",
          "conceptTag": "structure-meaning",
          "reviewCardId": "reading-u07-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does problem-solution help the reader?",
          "choices": [
            {
              "id": "a",
              "text": "It lists materials randomly"
            },
            {
              "id": "b",
              "text": "It connects a safety issue with the response"
            },
            {
              "id": "c",
              "text": "It describes a bird"
            },
            {
              "id": "d",
              "text": "It hides the repair"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The causal response becomes clear.",
          "id": "reading-u07-l01-q11",
          "conceptTag": "structure-meaning",
          "reviewCardId": "reading-u07-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How do heading and structure work together?",
          "choices": [
            {
              "id": "a",
              "text": "Both define composite"
            },
            {
              "id": "b",
              "text": "Both show the map"
            },
            {
              "id": "c",
              "text": "The heading previews inspection, and sequence organizes its steps"
            },
            {
              "id": "d",
              "text": "The heading solves loose boards"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "They guide navigation and relationship.",
          "id": "reading-u07-l01-q12",
          "conceptTag": "structure-meaning",
          "reviewCardId": "reading-u07-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation is complete?",
          "choices": [
            {
              "id": "a",
              "text": "Compare-contrast is used"
            },
            {
              "id": "b",
              "text": "Two boards exist"
            },
            {
              "id": "c",
              "text": "Composite lasts longer"
            },
            {
              "id": "d",
              "text": "Compare-contrast organizes differences in cost and durability so readers can weigh materials"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It links structure, relationship, and benefit.",
          "id": "reading-u07-l01-q13",
          "conceptTag": "structure-meaning",
          "reviewCardId": "reading-u07-l01-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u07-l02",
    "unitId": "reading-u07",
    "title": "Explain How Visuals and Multimedia Add Meaning",
    "indicatorCodes": [
      "ELA.4.AOR.10.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Visuals and multimedia can add quantities, locations, and experiences."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Accessible descriptions and transcripts let every learner inspect the same evidence."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s explain what each representation adds to the prose."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u07-l02-c1",
        "title": "Read Visuals as Evidence",
        "blocks": [
          {
            "kind": "text",
            "text": "Read labels, units, legends, captions, and trends as evidence."
          },
          {
            "kind": "example",
            "text": "The table shows exact amounts; the map description shows spatial patterns."
          },
          {
            "kind": "example",
            "text": "Rainfall table description: West Station — 8 a.m. 0.4 inch, noon 1.2 inches, 4 p.m. 1.5 inches. Central Station — 8 a.m. 0.1 inch, noon 0.8 inch, 4 p.m. 1.3 inches. East Station — 8 a.m. 0 inch, noon 0.3 inch, 4 p.m. 0.9 inch."
          },
          {
            "kind": "tip",
            "text": "State the exact information, not “the visual helps.”"
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "widget": {
          "type": "data-plot-builder",
          "config": {
            "kind": "bar",
            "prompt": "The table description gives the 4 p.m. totals: West 1.5 inches, Central 1.3 inches, East 0.9 inch. Build one bar per station, measured in tenths of an inch.",
            "categories": [
              "West Station",
              "Central Station",
              "East Station"
            ],
            "target": {
              "West Station": 15,
              "Central Station": 13,
              "East Station": 9
            } as Record<string, number>
          }
        },
        "check": {
          "prompt": "Which station has 1.5 inches at 4 p.m.?",
          "choices": [
            {
              "id": "a",
              "text": "West"
            },
            {
              "id": "b",
              "text": "Central"
            },
            {
              "id": "c",
              "text": "East"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible table description lists West at 1.5 inches."
        }
      },
      {
        "id": "reading-u07-l02-c2",
        "title": "Connect Visuals and Words",
        "blocks": [
          {
            "kind": "text",
            "text": "Compare the representation with the prose: confirm, extend, qualify, or contrast."
          },
          {
            "kind": "example",
            "text": "The west-to-east arrows and earlier western totals extend the forecast’s direction claim."
          },
          {
            "kind": "tip",
            "text": "Use Words say → Representation adds → Combined meaning."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "How does the table support the forecast?",
          "choices": [
            {
              "id": "a",
              "text": "Western rain begins earlier and totals more at each time"
            },
            {
              "id": "b",
              "text": "All stations are equal"
            },
            {
              "id": "c",
              "text": "East starts first"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The values match west-to-east movement."
        }
      },
      {
        "id": "reading-u07-l02-c3",
        "title": "Explain a Multimedia Contribution",
        "blocks": [
          {
            "kind": "text",
            "text": "Audio can contribute sound, pacing, or speaker emphasis; a transcript preserves its information."
          },
          {
            "kind": "example",
            "text": "The steady loud roof pattern adds an experience of intensity that amounts alone do not provide."
          },
          {
            "kind": "tip",
            "text": "Do not claim playback when only a transcript is supplied."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "The audio transcript adds described sound and timing",
              "The rainfall table adds exact measured amounts"
            ],
            "details": [
              {
                "id": "roof",
                "text": "\"By noon, drops struck the shelter roof in a steady, loud pattern.\"",
                "supports": [
                  "The audio transcript adds described sound and timing"
                ]
              },
              {
                "id": "sunrise",
                "text": "\"Rain began lightly in the west before sunrise.\"",
                "supports": [
                  "The audio transcript adds described sound and timing"
                ]
              },
              {
                "id": "west-noon",
                "text": "West Station measured 1.2 inches at noon.",
                "supports": [
                  "The rainfall table adds exact measured amounts"
                ]
              },
              {
                "id": "east-noon",
                "text": "East Station measured 0.3 inch at noon.",
                "supports": [
                  "The rainfall table adds exact measured amounts"
                ]
              }
            ],
            "requiredDetailCount": 2
          }
        },
        "check": {
          "prompt": "What does the transcript add?",
          "choices": [
            {
              "id": "a",
              "text": "The audible experience of steady, loud rain"
            },
            {
              "id": "b",
              "text": "A new station total"
            },
            {
              "id": "c",
              "text": "A map color"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The words describe sound and intensity."
        }
      }
    ],
    "workedExample": {
      "title": "Combine forecast, table, map, caption, and transcript",
      "passage": {
        "title": "Tracking a Storm’s Rain",
        "text": "Tracking a Storm’s Rain — accessible media packet\n\nForecast prose: A slow storm is expected to cross the county from west to east Tuesday. Forecasters expect the western station to begin receiving rain before the eastern station.\n\nRainfall table description: West Station — 8 a.m. 0.4 inch, noon 1.2 inches, 4 p.m. 1.5 inches. Central Station — 8 a.m. 0.1 inch, noon 0.8 inch, 4 p.m. 1.3 inches. East Station — 8 a.m. 0 inch, noon 0.3 inch, 4 p.m. 0.9 inch.\n\nMap legend description: pale blue means under 0.5 inch; medium blue means 0.5–1.0 inch; dark blue means over 1.0 inch. At 4 p.m., West and Central are dark blue; East is medium blue. Arrows point west to east.\n\nPhoto caption: “Water covers the lowest board of the creek gauge at Central Station at noon.”\n\nAudio transcript: Reporter: “Rain began lightly in the west before sunrise. By noon, drops struck the shelter roof in a steady, loud pattern. The eastern station was still receiving lighter rain.”\n\nTogether, the representations show timing, amount, location, a visible creek effect, and the sound/intensity experience."
      },
      "steps": [
        "Read the forecast’s west-to-east claim.",
        "Compare table times and map arrows with it.",
        "Explain that the transcript adds experienced intensity while the table adds exact quantity."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Tracking a Storm’s Rain”",
        "text": "Tracking a Storm’s Rain — accessible media packet\n\nForecast prose: A slow storm is expected to cross the county from west to east Tuesday. Forecasters expect the western station to begin receiving rain before the eastern station.\n\nRainfall table description: West Station — 8 a.m. 0.4 inch, noon 1.2 inches, 4 p.m. 1.5 inches. Central Station — 8 a.m. 0.1 inch, noon 0.8 inch, 4 p.m. 1.3 inches. East Station — 8 a.m. 0 inch, noon 0.3 inch, 4 p.m. 0.9 inch.\n\nMap legend description: pale blue means under 0.5 inch; medium blue means 0.5–1.0 inch; dark blue means over 1.0 inch. At 4 p.m., West and Central are dark blue; East is medium blue. Arrows point west to east.\n\nPhoto caption: “Water covers the lowest board of the creek gauge at Central Station at noon.”\n\nAudio transcript: Reporter: “Rain began lightly in the west before sunrise. By noon, drops struck the shelter roof in a steady, loud pattern. The eastern station was still receiving lighter rain.”\n\nTogether, the representations show timing, amount, location, a visible creek effect, and the sound/intensity experience."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "What does the table show at Central Station at noon?",
          "choices": [
            {
              "id": "a",
              "text": "0.8 inch"
            },
            {
              "id": "b",
              "text": "1.5 inches"
            },
            {
              "id": "c",
              "text": "0.3 inch"
            },
            {
              "id": "d",
              "text": "no rain"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The table description gives 0.8 inch.",
          "id": "reading-u07-l02-q01",
          "conceptTag": "visual-information",
          "reviewCardId": "reading-u07-l02-c1"
        },
        {
          "type": "true-false",
          "prompt": "The map legend assigns meaning to three shades of blue.",
          "choices": [
            {
              "id": "true",
              "text": "True — each shade names a range"
            },
            {
              "id": "false",
              "text": "False — color has no stated meaning"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The ranges are written in the description.",
          "id": "reading-u07-l02-q02",
          "conceptTag": "visual-information",
          "reviewCardId": "reading-u07-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which station begins with 0 inches at 8 a.m.?",
          "choices": [
            {
              "id": "a",
              "text": "West"
            },
            {
              "id": "b",
              "text": "Central"
            },
            {
              "id": "c",
              "text": "East"
            },
            {
              "id": "d",
              "text": "All three"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "East is listed at zero.",
          "id": "reading-u07-l02-q03",
          "conceptTag": "visual-information",
          "reviewCardId": "reading-u07-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the photo caption contribute?",
          "choices": [
            {
              "id": "a",
              "text": "storm direction"
            },
            {
              "id": "b",
              "text": "all totals"
            },
            {
              "id": "c",
              "text": "roof sounds"
            },
            {
              "id": "d",
              "text": "a visible creek-gauge effect at Central noon"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It describes water reaching the lowest board.",
          "id": "reading-u07-l02-q04",
          "conceptTag": "visual-information",
          "reviewCardId": "reading-u07-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does the table connect to the forecast?",
          "choices": [
            {
              "id": "a",
              "text": "It contradicts every detail"
            },
            {
              "id": "b",
              "text": "It shows earlier and greater rain in the west"
            },
            {
              "id": "c",
              "text": "It omits time"
            },
            {
              "id": "d",
              "text": "It proves no rain moved"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The time series supports movement direction.",
          "id": "reading-u07-l02-q05",
          "conceptTag": "visual-text-connection",
          "reviewCardId": "reading-u07-l02-c2"
        },
        {
          "type": "true-false",
          "prompt": "The dark-blue west and central areas at 4 p.m. agree with totals above one inch.",
          "choices": [
            {
              "id": "true",
              "text": "True — both exceed 1.0"
            },
            {
              "id": "false",
              "text": "False — dark means under 0.5"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Legend and table agree.",
          "id": "reading-u07-l02-q06",
          "conceptTag": "visual-text-connection",
          "reviewCardId": "reading-u07-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which combined conclusion is supported?",
          "choices": [
            {
              "id": "a",
              "text": "East receives most first"
            },
            {
              "id": "b",
              "text": "All rain begins together"
            },
            {
              "id": "c",
              "text": "Rain progresses west to east while totals rise"
            },
            {
              "id": "d",
              "text": "The storm moves east to west"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Multiple representations support the progression.",
          "id": "reading-u07-l02-q07",
          "conceptTag": "visual-text-connection",
          "reviewCardId": "reading-u07-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which sentence best explains the caption/text connection?",
          "choices": [
            {
              "id": "a",
              "text": "The caption repeats the title"
            },
            {
              "id": "b",
              "text": "The caption gives a color"
            },
            {
              "id": "c",
              "text": "The caption supplies a forecast"
            },
            {
              "id": "d",
              "text": "The caption shows one observable creek effect of the noon rain"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It adds local impact.",
          "id": "reading-u07-l02-q08",
          "conceptTag": "visual-text-connection",
          "reviewCardId": "reading-u07-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the transcript add beyond exact totals?",
          "choices": [
            {
              "id": "a",
              "text": "sound and perceived intensity"
            },
            {
              "id": "b",
              "text": "new table units"
            },
            {
              "id": "c",
              "text": "map arrows"
            },
            {
              "id": "d",
              "text": "a fourth station"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It describes how rain sounded.",
          "id": "reading-u07-l02-q09",
          "conceptTag": "multimedia-contribution",
          "reviewCardId": "reading-u07-l02-c3"
        },
        {
          "type": "true-false",
          "prompt": "A transcript can make audio information available without requiring playback.",
          "choices": [
            {
              "id": "true",
              "text": "True — its words preserve the content"
            },
            {
              "id": "false",
              "text": "False — answers require a sound file"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The complete transcript is visible.",
          "id": "reading-u07-l02-q10",
          "conceptTag": "multimedia-contribution",
          "reviewCardId": "reading-u07-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which representation is best for comparing exact amounts?",
          "choices": [
            {
              "id": "a",
              "text": "photo caption"
            },
            {
              "id": "b",
              "text": "rainfall table description"
            },
            {
              "id": "c",
              "text": "audio transcript"
            },
            {
              "id": "d",
              "text": "heading"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Tables support exact comparison.",
          "id": "reading-u07-l02-q11",
          "conceptTag": "multimedia-contribution",
          "reviewCardId": "reading-u07-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which representation is best for location and direction?",
          "choices": [
            {
              "id": "a",
              "text": "audio transcript"
            },
            {
              "id": "b",
              "text": "photo caption"
            },
            {
              "id": "c",
              "text": "map legend description and arrows"
            },
            {
              "id": "d",
              "text": "title"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Map information shows spatial relationships.",
          "id": "reading-u07-l02-q12",
          "conceptTag": "multimedia-contribution",
          "reviewCardId": "reading-u07-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation is complete?",
          "choices": [
            {
              "id": "a",
              "text": "The media are helpful"
            },
            {
              "id": "b",
              "text": "There is rain"
            },
            {
              "id": "c",
              "text": "The table has numbers"
            },
            {
              "id": "d",
              "text": "The table adds exact amounts, the map adds location/direction, and the transcript adds the sound of intensity"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It names distinct contributions.",
          "id": "reading-u07-l02-q13",
          "conceptTag": "multimedia-contribution",
          "reviewCardId": "reading-u07-l02-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
