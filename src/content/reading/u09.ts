import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit09Lessons = [
  {
    "id": "reading-u09-l01",
    "unitId": "reading-u09",
    "title": "Compare First- and Third-Person Narration",
    "indicatorCodes": [
      "ELA.4.AOR.3.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Point of view identifies who narrates and what that narrator can reveal."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "First person uses I/we; third person names characters or uses he/she/they."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Third person is not automatically all-knowing."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u09-l01-c1",
        "title": "Recognize First-Person Narration",
        "blocks": [
          {
            "kind": "text",
            "text": "A first-person narrator participates and uses I, me, my, or we."
          },
          {
            "kind": "example",
            "text": "Lila’s first version directly reveals “I felt proud” and what she did not know."
          },
          {
            "kind": "tip",
            "text": "Ask who “I” is."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "widget": {
          "type": "pov-switcher",
          "config": {
            "passage": "I carried my painted marker toward the trail.",
            "from": "first",
            "target": "third",
            "pronounOptions": [
              "Lila",
              "Lila's",
              "I",
              "my",
              "she"
            ],
            "requiredPronouns": [
              "Lila",
              "Lila's"
            ]
          }
        },
        "check": {
          "prompt": "Which pronoun signals first person?",
          "choices": [
            {
              "id": "a",
              "text": "I"
            },
            {
              "id": "b",
              "text": "she"
            },
            {
              "id": "c",
              "text": "Lila"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The narrator refers to herself as I."
        }
      },
      {
        "id": "reading-u09-l01-c2",
        "title": "Recognize Third-Person Narration",
        "blocks": [
          {
            "kind": "text",
            "text": "Third-person narration uses character names and third-person pronouns."
          },
          {
            "kind": "example",
            "text": "The second version reports Lila’s thoughts and then shifts beyond her knowledge to Carlos’s separate discovery."
          },
          {
            "kind": "tip",
            "text": "Knowledge access must be inferred from what the narrator actually reveals."
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
              "First-person narration",
              "Third-person narration"
            ],
            "details": [
              {
                "id": "brush-i",
                "text": "\"I brushed it clean and wondered whether it belonged to the trail's original route.\"",
                "supports": [
                  "First-person narration"
                ]
              },
              {
                "id": "proud-i",
                "text": "\"I felt proud when I recognized the faded owl symbol.\"",
                "supports": [
                  "First-person narration"
                ]
              },
              {
                "id": "brush-she",
                "text": "\"She brushed it clean and remembered the faded owl symbol from a library map.\"",
                "supports": [
                  "Third-person narration"
                ]
              },
              {
                "id": "carlos",
                "text": "\"Farther ahead, Carlos found a matching symbol, but Lila had not seen him yet.\"",
                "supports": [
                  "Third-person narration"
                ]
              }
            ],
            "requiredDetailCount": 2
          }
        },
        "check": {
          "prompt": "Which phrase is third person?",
          "choices": [
            {
              "id": "a",
              "text": "she noticed"
            },
            {
              "id": "b",
              "text": "I wondered"
            },
            {
              "id": "c",
              "text": "my marker"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "She refers to a character from outside."
        }
      },
      {
        "id": "reading-u09-l01-c3",
        "title": "Compare What Narrators Reveal",
        "blocks": [
          {
            "kind": "text",
            "text": "Compare pronouns, narrator participation, and revealed information."
          },
          {
            "kind": "example",
            "text": "Both versions show Lila’s discovery; the third-person version explicitly shifts to Carlos farther ahead."
          },
          {
            "kind": "tip",
            "text": "A rewrite must preserve events while changing narrator words."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "widget": {
          "type": "pov-switcher",
          "config": {
            "passage": "Lila carried Lila’s marker to the trail.",
            "from": "third",
            "target": "first",
            "pronounOptions": [
              "I",
              "my",
              "she"
            ],
            "requiredPronouns": [
              "I",
              "my"
            ]
          }
        },
        "check": {
          "prompt": "How should “Lila carried Lila’s marker” begin in first person?",
          "choices": [
            {
              "id": "a",
              "text": "I carried my marker"
            },
            {
              "id": "b",
              "text": "She carried her marker"
            },
            {
              "id": "c",
              "text": "Lila carried my marker"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "I/my correctly shifts the narrator."
        }
      }
    ],
    "workedExample": {
      "title": "Compare first person with third-person omniscient narration",
      "passage": {
        "title": "The Hidden Trail Marker",
        "text": "The Hidden Trail Marker — first-person version\n\nI carried my painted marker toward the school nature trail. Near the first bend, I noticed an older marker half buried under pine needles. I brushed it clean and wondered whether it belonged to the trail’s original route. I felt proud when I recognized the faded owl symbol from a map in the library. I hurried back to tell Ms. Reed, still wondering whether another marker waited farther ahead.\n\nThe Hidden Trail Marker — third-person omniscient version\n\nLila carried Lila’s painted marker toward the school nature trail. Near the first bend, she noticed an older marker half buried under pine needles. She brushed it clean and remembered the faded owl symbol from a library map. Lila felt proud and hurried back to tell Ms. Reed. Farther ahead, Carlos found a matching symbol, but Lila had not seen him yet."
      },
      "steps": [
        "Mark I/my in version one and Lila/she in version two.",
        "List what each reveals about Lila and Carlos.",
        "Explain that the event stays constant while narrator access and wording change."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “The Hidden Trail Marker”",
        "text": "The Hidden Trail Marker — first-person version\n\nI carried my painted marker toward the school nature trail. Near the first bend, I noticed an older marker half buried under pine needles. I brushed it clean and wondered whether it belonged to the trail’s original route. I felt proud when I recognized the faded owl symbol from a map in the library. I hurried back to tell Ms. Reed, still wondering whether another marker waited farther ahead.\n\nThe Hidden Trail Marker — third-person omniscient version\n\nLila carried Lila’s painted marker toward the school nature trail. Near the first bend, she noticed an older marker half buried under pine needles. She brushed it clean and remembered the faded owl symbol from a library map. Lila felt proud and hurried back to tell Ms. Reed. Farther ahead, Carlos found a matching symbol, but Lila had not seen him yet."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which word identifies first-person narration?",
          "choices": [
            {
              "id": "a",
              "text": "I"
            },
            {
              "id": "b",
              "text": "Lila"
            },
            {
              "id": "c",
              "text": "she"
            },
            {
              "id": "d",
              "text": "Carlos"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "I marks the participating narrator.",
          "id": "reading-u09-l01-q01",
          "conceptTag": "first-person",
          "reviewCardId": "reading-u09-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "The first-person narrator is Lila.",
          "choices": [
            {
              "id": "true",
              "text": "True — “I” carries Lila’s role and marker"
            },
            {
              "id": "false",
              "text": "False — Ms. Reed narrates"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The paired details identify Lila.",
          "id": "reading-u09-l01-q02",
          "conceptTag": "first-person",
          "reviewCardId": "reading-u09-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does first person reveal directly?",
          "choices": [
            {
              "id": "a",
              "text": "Carlos’s full thoughts"
            },
            {
              "id": "b",
              "text": "Ms. Reed’s plan"
            },
            {
              "id": "c",
              "text": "Lila’s pride and wondering"
            },
            {
              "id": "d",
              "text": "the map author’s opinion"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The I narrator reports her own internal experience.",
          "id": "reading-u09-l01-q03",
          "conceptTag": "first-person",
          "reviewCardId": "reading-u09-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What is one first-person limitation?",
          "choices": [
            {
              "id": "a",
              "text": "It cannot include events"
            },
            {
              "id": "b",
              "text": "It never uses names"
            },
            {
              "id": "c",
              "text": "It cannot describe settings"
            },
            {
              "id": "d",
              "text": "Lila does not know Carlos already found a match"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Her knowledge is limited.",
          "id": "reading-u09-l01-q04",
          "conceptTag": "first-person",
          "reviewCardId": "reading-u09-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which phrase signals third person?",
          "choices": [
            {
              "id": "a",
              "text": "my marker"
            },
            {
              "id": "b",
              "text": "she noticed"
            },
            {
              "id": "c",
              "text": "I felt"
            },
            {
              "id": "d",
              "text": "we hurried"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "She is third-person language.",
          "id": "reading-u09-l01-q05",
          "conceptTag": "third-person",
          "reviewCardId": "reading-u09-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "Third-person narration always knows every character’s thoughts.",
          "choices": [
            {
              "id": "true",
              "text": "True — third person is always all-knowing"
            },
            {
              "id": "false",
              "text": "False — third-person narration may be limited or omniscient"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "Third person names an outside narrator; its knowledge can be limited or omniscient. This version shifts to Carlos beyond Lila’s view.",
          "id": "reading-u09-l01-q06",
          "conceptTag": "third-person",
          "reviewCardId": "reading-u09-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What extra information does the third-person version provide?",
          "choices": [
            {
              "id": "a",
              "text": "The marker color"
            },
            {
              "id": "b",
              "text": "Lila’s pride"
            },
            {
              "id": "c",
              "text": "Carlos finds a matching symbol farther ahead"
            },
            {
              "id": "d",
              "text": "The trail location"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It shifts briefly to Carlos’s action.",
          "id": "reading-u09-l01-q07",
          "conceptTag": "third-person",
          "reviewCardId": "reading-u09-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which description is accurate?",
          "choices": [
            {
              "id": "a",
              "text": "The narrator joins as I"
            },
            {
              "id": "b",
              "text": "Carlos narrates"
            },
            {
              "id": "c",
              "text": "No feelings are revealed"
            },
            {
              "id": "d",
              "text": "An outside narrator follows Lila and reports one event beyond her view"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It captures pronouns and access.",
          "id": "reading-u09-l01-q08",
          "conceptTag": "third-person",
          "reviewCardId": "reading-u09-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What stays the same across both versions?",
          "choices": [
            {
              "id": "a",
              "text": "Lila finds and cleans an old owl marker"
            },
            {
              "id": "b",
              "text": "Carlos speaks to Lila"
            },
            {
              "id": "c",
              "text": "Ms. Reed finds the marker"
            },
            {
              "id": "d",
              "text": "The marker disappears"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The central event is parallel.",
          "id": "reading-u09-l01-q09",
          "conceptTag": "pov-comparison",
          "reviewCardId": "reading-u09-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "Changing point of view can change what readers learn even when the event stays the same.",
          "choices": [
            {
              "id": "true",
              "text": "True — Carlos’s action is clearer in one version"
            },
            {
              "id": "false",
              "text": "False — wording/access never change"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The pair demonstrates the difference.",
          "id": "reading-u09-l01-q10",
          "conceptTag": "pov-comparison",
          "reviewCardId": "reading-u09-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which rewrite is correct?",
          "choices": [
            {
              "id": "a",
              "text": "She carried my marker"
            },
            {
              "id": "b",
              "text": "I carried my marker"
            },
            {
              "id": "c",
              "text": "I carried Lila’s marker as narrator Lila"
            },
            {
              "id": "d",
              "text": "Lila carried I marker"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "I/my forms create first person.",
          "id": "reading-u09-l01-q11",
          "conceptTag": "pov-comparison",
          "reviewCardId": "reading-u09-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which comparison is strongest?",
          "choices": [
            {
              "id": "a",
              "text": "One is longer"
            },
            {
              "id": "b",
              "text": "Both mention needles"
            },
            {
              "id": "c",
              "text": "First person gives Lila’s direct voice; third person can show Carlos’s separate action"
            },
            {
              "id": "d",
              "text": "Third person has no character"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It compares narrator access.",
          "id": "reading-u09-l01-q12",
          "conceptTag": "pov-comparison",
          "reviewCardId": "reading-u09-l01-c3"
        },
        {
          "type": "fill-blank",
          "prompt": "Complete the first-person rewrite: ___ carried my marker to the trail.",
          "acceptedAnswers": [
            "I"
          ],
          "explanation": "I is the required first-person subject pronoun.",
          "id": "reading-u09-l01-q13",
          "conceptTag": "pov-comparison",
          "reviewCardId": "reading-u09-l01-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u09-l02",
    "unitId": "reading-u09",
    "title": "Explain How Character Perspectives Shape a Story",
    "indicatorCodes": [
      "ELA.4.AOR.3.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Characters can interpret the same event differently."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Those perspectives influence reactions, conflict, mood, and later choices."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s trace impact rather than merely label attitudes."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u09-l02-c1",
        "title": "Identify Character Perspectives",
        "blocks": [
          {
            "kind": "text",
            "text": "A perspective is a character’s attitude or interpretation, supported by thoughts, words, and actions."
          },
          {
            "kind": "example",
            "text": "Jalen sees the move as a loss; Mei sees safety and invention."
          },
          {
            "kind": "tip",
            "text": "State the event and the character’s view."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "widget": {
          "type": "theme-evidence-collector",
          "config": {
            "themeChoices": [
              "Jalen sees the gym move as losing his practiced event",
              "Mei sees the gym move as safer and full of new options"
            ],
            "evidence": [
              {
                "id": "groan",
                "text": "Jalen groaned when the principal moved every event into the gym.",
                "supports": [
                  "Jalen sees the gym move as losing his practiced event"
                ]
              },
              {
                "id": "jump",
                "text": "He had practiced the long jump for weeks.",
                "supports": [
                  "Jalen sees the gym move as losing his practiced event"
                ]
              },
              {
                "id": "grin",
                "text": "Mei grinned at the news.",
                "supports": [
                  "Mei sees the gym move as safer and full of new options"
                ]
              },
              {
                "id": "wet",
                "text": "She disliked running on wet grass.",
                "supports": [
                  "Mei sees the gym move as safer and full of new options"
                ]
              }
            ],
            "requiredEvidenceCount": 2
          }
        },
        "check": {
          "prompt": "How does Jalen view the gym move?",
          "choices": [
            {
              "id": "a",
              "text": "as a disappointing loss of his practiced event"
            },
            {
              "id": "b",
              "text": "as perfect weather"
            },
            {
              "id": "c",
              "text": "as proof Mei is angry"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "His groan and thoughts directly support that view."
        }
      },
      {
        "id": "reading-u09-l02-c2",
        "title": "Compare Reactions to One Event",
        "blocks": [
          {
            "kind": "text",
            "text": "Compare reactions to the same event and explain why they differ."
          },
          {
            "kind": "example",
            "text": "Jalen groans; Mei grins because Mei values safety and new indoor events."
          },
          {
            "kind": "tip",
            "text": "Restate each view accurately before evaluating it."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Why does Mei react positively?",
          "choices": [
            {
              "id": "a",
              "text": "She values safety and new indoor events"
            },
            {
              "id": "b",
              "text": "She wants no field day"
            },
            {
              "id": "c",
              "text": "She practiced long jump"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Her words show those priorities."
        }
      },
      {
        "id": "reading-u09-l02-c3",
        "title": "Explain the Impact on the Text",
        "blocks": [
          {
            "kind": "text",
            "text": "Perspective matters when it changes conflict, mood, events, or reader understanding."
          },
          {
            "kind": "example",
            "text": "Misreading Mei creates tension; mutual restatement allows a shared plan."
          },
          {
            "kind": "tip",
            "text": "Use Perspective → Reaction → Text impact."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "widget": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "misread",
                "text": "Jalen hears Mei's excitement as proof that she does not care about the canceled jump.",
                "role": "main"
              },
              {
                "id": "tension",
                "text": "That misreading makes his reply sharp and creates tension.",
                "role": "main"
              },
              {
                "id": "restate",
                "text": "Once each of them accurately restates the other's view, the conflict softens.",
                "role": "main"
              },
              {
                "id": "plan",
                "text": "Their combined ideas produce a standing-jump challenge and a cone relay.",
                "role": "detail"
              },
              {
                "id": "rain",
                "text": "The rain stopped by lunchtime.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "misread",
              "tension",
              "restate"
            ],
            "maxSentences": 4
          }
        },
        "check": {
          "prompt": "What resolves the perspective conflict?",
          "choices": [
            {
              "id": "a",
              "text": "They restate each other’s views and combine ideas"
            },
            {
              "id": "b",
              "text": "The rain instantly stops"
            },
            {
              "id": "c",
              "text": "The principal restores long jump"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Accurate understanding changes their actions."
        }
      }
    ],
    "workedExample": {
      "title": "Trace perspectives through conflict and resolution",
      "passage": {
        "title": "Rain on Field Day",
        "text": "Rain on Field Day\n\nRain drummed against the classroom windows on field-day morning. Jalen groaned when the principal moved every event into the gym. He had practiced the long jump for weeks and thought an indoor field day would feel cramped and disappointing.\n\nMei grinned. She disliked running on wet grass and imagined relay games winding safely around cones. “We can invent events that fit the space,” she said. Jalen heard her excitement as proof that she did not care about the canceled jump, and his reply sounded sharp.\n\nDuring setup, Mei noticed his silence. She explained that she was relieved about safety but understood why he missed his event. Jalen admitted that he had treated her relief as an insult. Together they designed a standing-jump challenge and a careful cone relay.\n\nTheir contrasting perspectives first create tension and a disappointed mood. Once each character accurately restates the other’s view, the conflict softens. Their combined ideas reshape the events and produce a cooperative resolution."
      },
      "steps": [
        "Name the shared event.",
        "Contrast Jalen’s loss perspective with Mei’s safety/opportunity perspective.",
        "Trace misunderstanding to tension, then restatement to cooperative resolution."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Rain on Field Day”",
        "text": "Rain on Field Day\n\nRain drummed against the classroom windows on field-day morning. Jalen groaned when the principal moved every event into the gym. He had practiced the long jump for weeks and thought an indoor field day would feel cramped and disappointing.\n\nMei grinned. She disliked running on wet grass and imagined relay games winding safely around cones. “We can invent events that fit the space,” she said. Jalen heard her excitement as proof that she did not care about the canceled jump, and his reply sounded sharp.\n\nDuring setup, Mei noticed his silence. She explained that she was relieved about safety but understood why he missed his event. Jalen admitted that he had treated her relief as an insult. Together they designed a standing-jump challenge and a careful cone relay.\n\nTheir contrasting perspectives first create tension and a disappointed mood. Once each character accurately restates the other’s view, the conflict softens. Their combined ideas reshape the events and produce a cooperative resolution."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "What is Jalen’s perspective?",
          "choices": [
            {
              "id": "a",
              "text": "The move is cramped and disappointing because his event is lost"
            },
            {
              "id": "b",
              "text": "Rain makes every event better"
            },
            {
              "id": "c",
              "text": "Mei caused the weather"
            },
            {
              "id": "d",
              "text": "Safety never matters"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "His thoughts and groan support loss.",
          "id": "reading-u09-l02-q01",
          "conceptTag": "character-perspective",
          "reviewCardId": "reading-u09-l02-c1"
        },
        {
          "type": "true-false",
          "prompt": "Mei views the gym as a chance for safe new events.",
          "choices": [
            {
              "id": "true",
              "text": "True — she imagines and proposes them"
            },
            {
              "id": "false",
              "text": "False — she wants cancellation"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Her grin and proposal show optimism.",
          "id": "reading-u09-l02-q02",
          "conceptTag": "character-perspective",
          "reviewCardId": "reading-u09-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail reveals perspective most directly?",
          "choices": [
            {
              "id": "a",
              "text": "Rain hits windows"
            },
            {
              "id": "b",
              "text": "The principal speaks"
            },
            {
              "id": "c",
              "text": "Jalen thinks indoor field day will disappoint"
            },
            {
              "id": "d",
              "text": "Cones are in a gym"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "His thought states his interpretation.",
          "id": "reading-u09-l02-q03",
          "conceptTag": "character-perspective",
          "reviewCardId": "reading-u09-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response accurately restates both views?",
          "choices": [
            {
              "id": "a",
              "text": "Both hate the gym"
            },
            {
              "id": "b",
              "text": "Both only care about winning"
            },
            {
              "id": "c",
              "text": "Jalen values safety; Mei wants long jump"
            },
            {
              "id": "d",
              "text": "Jalen mourns a practiced event; Mei welcomes safety and invention"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It preserves both positions.",
          "id": "reading-u09-l02-q04",
          "conceptTag": "character-perspective",
          "reviewCardId": "reading-u09-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "How do their first reactions contrast?",
          "choices": [
            {
              "id": "a",
              "text": "Both grin"
            },
            {
              "id": "b",
              "text": "Jalen groans while Mei grins"
            },
            {
              "id": "c",
              "text": "Mei leaves while Jalen runs"
            },
            {
              "id": "d",
              "text": "Neither responds"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The actions visibly contrast.",
          "id": "reading-u09-l02-q05",
          "conceptTag": "perspective-contrast",
          "reviewCardId": "reading-u09-l02-c2"
        },
        {
          "type": "true-false",
          "prompt": "Different priorities help explain the contrasting reactions.",
          "choices": [
            {
              "id": "true",
              "text": "True — practice/loss differs from safety/opportunity"
            },
            {
              "id": "false",
              "text": "False — one must be lying"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The story supplies both reasons.",
          "id": "reading-u09-l02-q06",
          "conceptTag": "perspective-contrast",
          "reviewCardId": "reading-u09-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why does Jalen reply sharply?",
          "choices": [
            {
              "id": "a",
              "text": "He dislikes cones"
            },
            {
              "id": "b",
              "text": "He cannot hear rain"
            },
            {
              "id": "c",
              "text": "He interprets Mei’s excitement as not caring about his loss"
            },
            {
              "id": "d",
              "text": "He wants no events"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "His mistaken interpretation creates tension.",
          "id": "reading-u09-l02-q07",
          "conceptTag": "perspective-contrast",
          "reviewCardId": "reading-u09-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does Mei do to reduce the contrast?",
          "choices": [
            {
              "id": "a",
              "text": "She hides her view"
            },
            {
              "id": "b",
              "text": "She blames Jalen"
            },
            {
              "id": "c",
              "text": "She cancels the day"
            },
            {
              "id": "d",
              "text": "She explains her relief and acknowledges his disappointment"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "She clarifies and validates.",
          "id": "reading-u09-l02-q08",
          "conceptTag": "perspective-contrast",
          "reviewCardId": "reading-u09-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What mood do the initial perspectives create?",
          "choices": [
            {
              "id": "a",
              "text": "tense and disappointed"
            },
            {
              "id": "b",
              "text": "peaceful and sleepy"
            },
            {
              "id": "c",
              "text": "mysterious"
            },
            {
              "id": "d",
              "text": "silly without conflict"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Misunderstanding and loss create tension.",
          "id": "reading-u09-l02-q09",
          "conceptTag": "perspective-impact",
          "reviewCardId": "reading-u09-l02-c3"
        },
        {
          "type": "true-false",
          "prompt": "The perspectives change the plot because they lead first to conflict and then a shared design.",
          "choices": [
            {
              "id": "true",
              "text": "True — reactions drive events"
            },
            {
              "id": "false",
              "text": "False — the plot ignores them"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The causal chain is explicit.",
          "id": "reading-u09-l02-q10",
          "conceptTag": "perspective-impact",
          "reviewCardId": "reading-u09-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does the story deepen readers’ understanding?",
          "choices": [
            {
              "id": "a",
              "text": "Readers learn one view is fake"
            },
            {
              "id": "b",
              "text": "Readers see reasonable priorities behind both reactions"
            },
            {
              "id": "c",
              "text": "Readers forget the rain"
            },
            {
              "id": "d",
              "text": "Readers know the final score"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The dual views add complexity.",
          "id": "reading-u09-l02-q11",
          "conceptTag": "perspective-impact",
          "reviewCardId": "reading-u09-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which event results from the repaired understanding?",
          "choices": [
            {
              "id": "a",
              "text": "The gym closes"
            },
            {
              "id": "b",
              "text": "Jalen leaves"
            },
            {
              "id": "c",
              "text": "They design a standing jump and cone relay"
            },
            {
              "id": "d",
              "text": "The rain becomes snow"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Their combined perspectives create the solution.",
          "id": "reading-u09-l02-q12",
          "conceptTag": "perspective-impact",
          "reviewCardId": "reading-u09-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation follows Perspective → Reaction → Impact?",
          "choices": [
            {
              "id": "a",
              "text": "Mei likes gyms"
            },
            {
              "id": "b",
              "text": "Jalen is sad and it rains"
            },
            {
              "id": "c",
              "text": "They have different opinions"
            },
            {
              "id": "d",
              "text": "Jalen sees loss and responds sharply, creating tension; later mutual restatement enables cooperation"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It traces the complete chain.",
          "id": "reading-u09-l02-q13",
          "conceptTag": "perspective-impact",
          "reviewCardId": "reading-u09-l02-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
