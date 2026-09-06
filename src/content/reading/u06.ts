import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit06Lessons = [
  {
    "id": "reading-u06-l01",
    "unitId": "reading-u06",
    "title": "Summarize Literary Texts",
    "indicatorCodes": [
      "ELA.4.AOR.6.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "A literary summary keeps the plot’s essential arc."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "It also states a supported theme and only relevant details."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s be accurate, concise, and objective."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u06-l01-c1",
        "title": "Retell the Plot Selectively",
        "blocks": [
          {
            "kind": "text",
            "text": "Select the character, conflict, key actions, turning point, and resolution."
          },
          {
            "kind": "example",
            "text": "Amina loses borrowed binoculars, searches, finds them, and returns them honestly."
          },
          {
            "kind": "tip",
            "text": "Leave out decorative details unless they affect the plot."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "widget": {
          "type": "summary-builder",
          "config": {
            "sourceSentences": [
              {
                "id": "borrow",
                "text": "Amina borrowed her aunt's binoculars for a marsh walk.",
                "role": "main"
              },
              {
                "id": "search",
                "text": "She checked the overlook rail, the map bench, and the sandy path.",
                "role": "main"
              },
              {
                "id": "return",
                "text": "Amina told her aunt what had happened and returned the binoculars.",
                "role": "main"
              },
              {
                "id": "strap",
                "text": "The binocular strap is green.",
                "role": "extra"
              },
              {
                "id": "lunch",
                "text": "Her friends were ready for lunch.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "borrow",
              "search",
              "return"
            ],
            "maxSentences": 3
          }
        },
        "check": {
          "prompt": "Which belongs in the plot summary?",
          "choices": [
            {
              "id": "a",
              "text": "Amina searches for and returns the binoculars"
            },
            {
              "id": "b",
              "text": "The strap is green"
            },
            {
              "id": "c",
              "text": "Friends plan lunch"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It states the central action and resolution."
        }
      },
      {
        "id": "reading-u06-l01-c2",
        "title": "Include Theme and Relevant Details",
        "blocks": [
          {
            "kind": "text",
            "text": "A theme is supported by what the character chooses and learns."
          },
          {
            "kind": "example",
            "text": "Responsibility is supported by Amina retracing her route and telling the truth."
          },
          {
            "kind": "tip",
            "text": "Include one detail that proves the theme."
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
              "Responsibility includes honest care for borrowed things",
              "Bird watching needs the right equipment"
            ],
            "evidence": [
              {
                "id": "retrace",
                "text": "Amina told her friends she needed to retrace the route instead of going to lunch.",
                "supports": [
                  "Responsibility includes honest care for borrowed things"
                ]
              },
              {
                "id": "truth",
                "text": "Amina told her aunt exactly what had happened and returned the binoculars.",
                "supports": [
                  "Responsibility includes honest care for borrowed things"
                ]
              },
              {
                "id": "egret",
                "text": "At the first overlook, Amina watched an egret step through shallow water.",
                "supports": [
                  "Bird watching needs the right equipment"
                ]
              }
            ],
            "requiredEvidenceCount": 2
          }
        },
        "check": {
          "prompt": "Which theme is best supported?",
          "choices": [
            {
              "id": "a",
              "text": "Responsibility includes honest care for borrowed things"
            },
            {
              "id": "b",
              "text": "Green is lucky"
            },
            {
              "id": "c",
              "text": "Lunch solves problems"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Her search and truthful report support responsibility."
        }
      },
      {
        "id": "reading-u06-l01-c3",
        "title": "Write an Objective Literary Summary",
        "blocks": [
          {
            "kind": "text",
            "text": "Combine plot, theme, and a relevant detail in your own words."
          },
          {
            "kind": "example",
            "text": "Avoid opinions such as “This is the best story.”"
          },
          {
            "kind": "tip",
            "text": "Use Somebody → Problem → Key response → Outcome/theme."
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
                "id": "plot",
                "text": "Amina loses borrowed binoculars, searches carefully, and returns them.",
                "role": "main"
              },
              {
                "id": "theme",
                "text": "Her honest choices show responsibility.",
                "role": "main"
              },
              {
                "id": "detail",
                "text": "She retraces her route beside the marsh.",
                "role": "detail"
              },
              {
                "id": "extra",
                "text": "The binocular strap is green.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "plot",
              "theme"
            ],
            "maxSentences": 3
          }
        },
        "check": {
          "prompt": "Which sentence is objective?",
          "choices": [
            {
              "id": "a",
              "text": "Amina searches carefully and honestly returns what she borrowed"
            },
            {
              "id": "b",
              "text": "Amina is obviously the coolest character"
            },
            {
              "id": "c",
              "text": "The green strap is beautiful"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It reports supported events without opinion."
        }
      }
    ],
    "workedExample": {
      "title": "Build an objective literary summary",
      "passage": {
        "title": "The Borrowed Binoculars",
        "text": "The Borrowed Binoculars\n\nAmina borrowed her aunt’s binoculars for a marsh walk. At the first overlook, she watched an egret step through shallow water. Later, she reached for the binoculars and found only the green strap’s empty case.\n\nHer friends were ready for lunch, but Amina said she needed to retrace the route. She checked the overlook rail, the map bench, and the sandy path. Near a clump of cordgrass, she spotted the binoculars beside a weathered post. One lens was dusty but not cracked.\n\nAmina wiped the case, told her aunt exactly what had happened, and returned the binoculars. Her aunt thanked her for searching carefully and being honest. Amina decided that borrowing something meant protecting it and reporting problems truthfully.\n\nThe plot moves from loss to a careful search and honest return. A theme of responsibility grows through Amina’s choices. The green strap and lunch plans are minor details; they do not belong in every concise summary."
      },
      "steps": [
        "Name Amina and the lost borrowed binoculars.",
        "Condense the search and honest return.",
        "Connect those choices to responsibility without adding an opinion."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “The Borrowed Binoculars”",
        "text": "The Borrowed Binoculars\n\nAmina borrowed her aunt’s binoculars for a marsh walk. At the first overlook, she watched an egret step through shallow water. Later, she reached for the binoculars and found only the green strap’s empty case.\n\nHer friends were ready for lunch, but Amina said she needed to retrace the route. She checked the overlook rail, the map bench, and the sandy path. Near a clump of cordgrass, she spotted the binoculars beside a weathered post. One lens was dusty but not cracked.\n\nAmina wiped the case, told her aunt exactly what had happened, and returned the binoculars. Her aunt thanked her for searching carefully and being honest. Amina decided that borrowing something meant protecting it and reporting problems truthfully.\n\nThe plot moves from loss to a careful search and honest return. A theme of responsibility grows through Amina’s choices. The green strap and lunch plans are minor details; they do not belong in every concise summary."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which event is essential to the plot?",
          "choices": [
            {
              "id": "a",
              "text": "Amina discovers the borrowed binoculars are missing"
            },
            {
              "id": "b",
              "text": "The strap is green"
            },
            {
              "id": "c",
              "text": "Friends want lunch"
            },
            {
              "id": "d",
              "text": "An egret steps"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The loss creates the main conflict.",
          "id": "reading-u06-l01-q01",
          "conceptTag": "literary-plot-summary",
          "reviewCardId": "reading-u06-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "A literary summary should include every descriptive detail.",
          "choices": [
            {
              "id": "true",
              "text": "True — length proves accuracy"
            },
            {
              "id": "false",
              "text": "False — select only relevant details"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "A summary condenses.",
          "id": "reading-u06-l01-q02",
          "conceptTag": "literary-plot-summary",
          "reviewCardId": "reading-u06-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which sequence captures the plot?",
          "choices": [
            {
              "id": "a",
              "text": "walk, lunch, color"
            },
            {
              "id": "b",
              "text": "egret, post, lens"
            },
            {
              "id": "c",
              "text": "borrow, lose, search, return"
            },
            {
              "id": "d",
              "text": "aunt, friends, marsh"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It preserves the main event chain.",
          "id": "reading-u06-l01-q03",
          "conceptTag": "literary-plot-summary",
          "reviewCardId": "reading-u06-l01-c1"
        },
        {
          "type": "sort",
          "prompt": "Order the main plot events.",
          "explanation": "This is the story’s chronological plot arc.",
          "id": "reading-u06-l01-q04",
          "conceptTag": "literary-plot-summary",
          "reviewCardId": "reading-u06-l01-c1",
          "items": [
            {
              "id": "step-3",
              "text": "She retraces the route and finds them"
            },
            {
              "id": "step-1",
              "text": "Amina borrows binoculars"
            },
            {
              "id": "step-4",
              "text": "She reports honestly and returns them"
            },
            {
              "id": "step-2",
              "text": "She discovers they are missing"
            }
          ],
          "correctOrder": [
            "step-1",
            "step-2",
            "step-3",
            "step-4"
          ]
        },
        {
          "type": "multiple-choice",
          "prompt": "Which theme fits the story?",
          "choices": [
            {
              "id": "a",
              "text": "Nature is always quiet"
            },
            {
              "id": "b",
              "text": "Responsibility includes care and honesty"
            },
            {
              "id": "c",
              "text": "Friends should skip lunch"
            },
            {
              "id": "d",
              "text": "Dust damages everything"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Amina’s choices support responsibility.",
          "id": "reading-u06-l01-q05",
          "conceptTag": "literary-theme-details",
          "reviewCardId": "reading-u06-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "Amina’s truthful report helps develop the theme.",
          "choices": [
            {
              "id": "true",
              "text": "True — honesty is evidence of responsibility"
            },
            {
              "id": "false",
              "text": "False — only the search matters"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The report is a key choice.",
          "id": "reading-u06-l01-q06",
          "conceptTag": "literary-theme-details",
          "reviewCardId": "reading-u06-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail best supports the theme?",
          "choices": [
            {
              "id": "a",
              "text": "The egret walks"
            },
            {
              "id": "b",
              "text": "The strap is green"
            },
            {
              "id": "c",
              "text": "Amina retraces the route instead of ignoring the loss"
            },
            {
              "id": "d",
              "text": "The lens is dusty"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Her response demonstrates responsibility.",
          "id": "reading-u06-l01-q07",
          "conceptTag": "literary-theme-details",
          "reviewCardId": "reading-u06-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail can be omitted?",
          "choices": [
            {
              "id": "a",
              "text": "She borrowed the binoculars"
            },
            {
              "id": "b",
              "text": "They went missing"
            },
            {
              "id": "c",
              "text": "She returned them honestly"
            },
            {
              "id": "d",
              "text": "The strap was green"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Color does not affect plot or theme.",
          "id": "reading-u06-l01-q08",
          "conceptTag": "literary-theme-details",
          "reviewCardId": "reading-u06-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which is the best summary?",
          "choices": [
            {
              "id": "a",
              "text": "After losing borrowed binoculars, Amina retraces her route, finds them, and honestly returns them, showing responsibility"
            },
            {
              "id": "b",
              "text": "Amina sees an egret and a green strap"
            },
            {
              "id": "c",
              "text": "I loved this exciting marsh story"
            },
            {
              "id": "d",
              "text": "Amina goes to lunch after a perfect day"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It is accurate, concise, objective, and thematic.",
          "id": "reading-u06-l01-q09",
          "conceptTag": "literary-summary",
          "reviewCardId": "reading-u06-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "“I think Amina is wonderful” belongs in an objective summary.",
          "choices": [
            {
              "id": "true",
              "text": "True — opinions are required"
            },
            {
              "id": "false",
              "text": "False — summaries avoid personal judgments"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "Objective summaries report the text.",
          "id": "reading-u06-l01-q10",
          "conceptTag": "literary-summary",
          "reviewCardId": "reading-u06-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which revision is most concise?",
          "choices": [
            {
              "id": "a",
              "text": "Amina walked to every named location in every sentence"
            },
            {
              "id": "b",
              "text": "Amina carefully searched her route and found the binoculars"
            },
            {
              "id": "c",
              "text": "Amina had a green strap case beside a post near grass"
            },
            {
              "id": "d",
              "text": "Amina and friends had many plans"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "It condenses repeated search details.",
          "id": "reading-u06-l01-q11",
          "conceptTag": "literary-summary",
          "reviewCardId": "reading-u06-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "What must a strong literary summary include?",
          "choices": [
            {
              "id": "a",
              "text": "Every quotation"
            },
            {
              "id": "b",
              "text": "Only the theme"
            },
            {
              "id": "c",
              "text": "Key plot, supported theme, and relevant details"
            },
            {
              "id": "d",
              "text": "A review score"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Those elements capture literary meaning.",
          "id": "reading-u06-l01-q12",
          "conceptTag": "literary-summary",
          "reviewCardId": "reading-u06-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which wording stays in the writer’s own words?",
          "choices": [
            {
              "id": "a",
              "text": "Copy the entire final paragraph"
            },
            {
              "id": "b",
              "text": "Use the aunt’s exact dialogue without quotation marks"
            },
            {
              "id": "c",
              "text": "Change one copied word"
            },
            {
              "id": "d",
              "text": "Amina admits the loss and returns the found binoculars, showing responsible care"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It paraphrases accurately.",
          "id": "reading-u06-l01-q13",
          "conceptTag": "literary-summary",
          "reviewCardId": "reading-u06-l01-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u06-l02",
    "unitId": "reading-u06",
    "title": "Summarize Informational Texts",
    "indicatorCodes": [
      "ELA.4.AOR.6.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Informational summaries center on a central idea."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Relevant details explain that idea; minor examples stay out."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s condense accurately in original wording."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u06-l02-c1",
        "title": "State the Central Idea",
        "blocks": [
          {
            "kind": "text",
            "text": "State what the whole article explains."
          },
          {
            "kind": "example",
            "text": "The central idea is that martin houses need suitable placement and regular care."
          },
          {
            "kind": "tip",
            "text": "Do not substitute a single detail such as paint color."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "Purple martin houses need suitable placement and regular care",
              "Purple martin houses should be painted white"
            ],
            "details": [
              {
                "id": "space",
                "text": "Open space around the house gives martins a clear flight path.",
                "supports": [
                  "Purple martin houses need suitable placement and regular care"
                ]
              },
              {
                "id": "clean",
                "text": "Seasonal cleaning removes old nesting material and prepares the rooms.",
                "supports": [
                  "Purple martin houses need suitable placement and regular care"
                ]
              },
              {
                "id": "paint",
                "text": "One pictured house is painted white.",
                "supports": [
                  "Purple martin houses should be painted white"
                ]
              }
            ],
            "requiredDetailCount": 2
          }
        },
        "check": {
          "prompt": "Which is the central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Purple martin houses need good placement and care"
            },
            {
              "id": "b",
              "text": "One house is white"
            },
            {
              "id": "c",
              "text": "Martins fly"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It unifies the full article."
        }
      },
      {
        "id": "reading-u06-l02-c2",
        "title": "Select Relevant Supporting Details",
        "blocks": [
          {
            "kind": "text",
            "text": "Choose details that directly develop the central idea."
          },
          {
            "kind": "example",
            "text": "Open space supports flight; seasonal cleaning prepares rooms."
          },
          {
            "kind": "tip",
            "text": "Leave out an incidental color unless the question asks about it."
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
                "id": "steps",
                "text": "First, choose an open site. Next, raise the house. Then, check the rooms each season.",
                "structure": "sequence"
              },
              {
                "id": "why",
                "text": "Because old nesting material blocks the rooms, martins may not return the next spring.",
                "structure": "cause-effect"
              },
              {
                "id": "compare",
                "text": "Wooden houses cost less, while metal houses last longer in wet weather.",
                "structure": "compare-contrast"
              },
              {
                "id": "describe",
                "text": "These tall birdhouses contain several nesting rooms set above open ground.",
                "structure": "description"
              }
            ]
          }
        },
        "check": {
          "prompt": "Which detail belongs?",
          "choices": [
            {
              "id": "a",
              "text": "Open space provides a clear flight path"
            },
            {
              "id": "b",
              "text": "One pictured house is white"
            },
            {
              "id": "c",
              "text": "The article has four paragraphs"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It explains suitable placement."
        }
      },
      {
        "id": "reading-u06-l02-c3",
        "title": "Condense in Your Own Words",
        "blocks": [
          {
            "kind": "text",
            "text": "Paraphrase the central idea and combine two useful details."
          },
          {
            "kind": "example",
            "text": "Stay objective and shorter than the source."
          },
          {
            "kind": "tip",
            "text": "Use Central idea → Detail 1 → Detail 2."
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
                "id": "central",
                "text": "Purple martin houses work best with suitable placement and regular care.",
                "role": "main"
              },
              {
                "id": "space",
                "text": "Open space gives the birds a clear flight path.",
                "role": "detail"
              },
              {
                "id": "care",
                "text": "Seasonal cleaning keeps the house ready.",
                "role": "detail"
              },
              {
                "id": "extra",
                "text": "One house in the article is painted white.",
                "role": "extra"
              }
            ],
            "requiredMainIds": [
              "central"
            ],
            "maxSentences": 3
          }
        },
        "check": {
          "prompt": "Which sentence is an accurate paraphrase?",
          "choices": [
            {
              "id": "a",
              "text": "Martin houses succeed when placed in open space and cared for seasonally"
            },
            {
              "id": "b",
              "text": "Every bird needs a white city"
            },
            {
              "id": "c",
              "text": "The author loves poles"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It restates the idea without copying."
        }
      }
    ],
    "workedExample": {
      "title": "Build an objective informational summary",
      "passage": {
        "title": "A City for Purple Martins",
        "text": "A City for Purple Martins\n\nPurple martin houses work best with suitable placement and regular care. These tall birdhouses contain several nesting rooms, so a group of birds may use one structure.\n\nOpen space around the house gives martins a clear flight path. A pole placed away from thick trees can also make it harder for some climbing animals to reach the rooms. People should follow safe installation directions and check the pole from the ground.\n\nCare continues after nesting season. An adult can lower a safely designed house, remove old nesting material, and inspect the rooms. Seasonal cleaning helps prepare the house for future birds. Observers can record arrival dates and room use without disturbing nests.\n\nOne pictured house is painted white, but color is not the article’s main point. Placement, a clear flight path, seasonal cleaning, and careful monitoring work together. A concise summary should state that central idea and select a few supporting details rather than copy every sentence."
      },
      "steps": [
        "State the placement-and-care central idea.",
        "Select clear flight path and seasonal cleaning.",
        "Combine them in one objective, original summary."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “A City for Purple Martins”",
        "text": "A City for Purple Martins\n\nPurple martin houses work best with suitable placement and regular care. These tall birdhouses contain several nesting rooms, so a group of birds may use one structure.\n\nOpen space around the house gives martins a clear flight path. A pole placed away from thick trees can also make it harder for some climbing animals to reach the rooms. People should follow safe installation directions and check the pole from the ground.\n\nCare continues after nesting season. An adult can lower a safely designed house, remove old nesting material, and inspect the rooms. Seasonal cleaning helps prepare the house for future birds. Observers can record arrival dates and room use without disturbing nests.\n\nOne pictured house is painted white, but color is not the article’s main point. Placement, a clear flight path, seasonal cleaning, and careful monitoring work together. A concise summary should state that central idea and select a few supporting details rather than copy every sentence."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "What is the central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Martin houses need suitable placement and regular care"
            },
            {
              "id": "b",
              "text": "All houses must be white"
            },
            {
              "id": "c",
              "text": "Birds avoid open space"
            },
            {
              "id": "d",
              "text": "Monitoring disturbs every nest"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The article repeatedly develops placement and care.",
          "id": "reading-u06-l02-q01",
          "conceptTag": "informational-central-idea",
          "reviewCardId": "reading-u06-l02-c1"
        },
        {
          "type": "true-false",
          "prompt": "A central idea can include two connected needs: placement and care.",
          "choices": [
            {
              "id": "true",
              "text": "True — both organize the text"
            },
            {
              "id": "false",
              "text": "False — it must be one word"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The sections explain both.",
          "id": "reading-u06-l02-q02",
          "conceptTag": "informational-central-idea",
          "reviewCardId": "reading-u06-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which is too narrow to be the central idea?",
          "choices": [
            {
              "id": "a",
              "text": "Houses can contain rooms"
            },
            {
              "id": "b",
              "text": "Care happens after nesting"
            },
            {
              "id": "c",
              "text": "One pictured house is white"
            },
            {
              "id": "d",
              "text": "People observe arrivals"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Paint color is a minor detail.",
          "id": "reading-u06-l02-q03",
          "conceptTag": "informational-central-idea",
          "reviewCardId": "reading-u06-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which heading best matches the whole text?",
          "choices": [
            {
              "id": "a",
              "text": "White Paint"
            },
            {
              "id": "b",
              "text": "One Nesting Room"
            },
            {
              "id": "c",
              "text": "Watching One Bird"
            },
            {
              "id": "d",
              "text": "Placing and Caring for a Purple Martin House"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It includes both major parts.",
          "id": "reading-u06-l02-q04",
          "conceptTag": "informational-central-idea",
          "reviewCardId": "reading-u06-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail supports suitable placement?",
          "choices": [
            {
              "id": "a",
              "text": "Old nests are removed"
            },
            {
              "id": "b",
              "text": "Open space gives a clear flight path"
            },
            {
              "id": "c",
              "text": "Observers record dates"
            },
            {
              "id": "d",
              "text": "The house has rooms"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Open space explains placement.",
          "id": "reading-u06-l02-q05",
          "conceptTag": "informational-details",
          "reviewCardId": "reading-u06-l02-c2"
        },
        {
          "type": "true-false",
          "prompt": "Seasonal cleaning supports the care part of the central idea.",
          "choices": [
            {
              "id": "true",
              "text": "True — it prepares rooms"
            },
            {
              "id": "false",
              "text": "False — it changes paint"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Cleaning is regular care.",
          "id": "reading-u06-l02-q06",
          "conceptTag": "informational-details",
          "reviewCardId": "reading-u06-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which pair best supports the whole idea?",
          "choices": [
            {
              "id": "a",
              "text": "white paint and rooms"
            },
            {
              "id": "b",
              "text": "arrival dates and color"
            },
            {
              "id": "c",
              "text": "open flight space and seasonal cleaning"
            },
            {
              "id": "d",
              "text": "birds and poles"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It covers placement and care.",
          "id": "reading-u06-l02-q07",
          "conceptTag": "informational-details",
          "reviewCardId": "reading-u06-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail is least relevant?",
          "choices": [
            {
              "id": "a",
              "text": "Open space"
            },
            {
              "id": "b",
              "text": "Ground-level safety checks"
            },
            {
              "id": "c",
              "text": "Removing old material"
            },
            {
              "id": "d",
              "text": "One pictured house is white"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The color does not develop the idea.",
          "id": "reading-u06-l02-q08",
          "conceptTag": "informational-details",
          "reviewCardId": "reading-u06-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which is the best summary?",
          "choices": [
            {
              "id": "a",
              "text": "Purple martin houses need open placement for safe flight and seasonal care that keeps nesting rooms ready"
            },
            {
              "id": "b",
              "text": "Purple martins live in a white building"
            },
            {
              "id": "c",
              "text": "I think birdhouses are fun"
            },
            {
              "id": "d",
              "text": "Adults lower one house and record every date"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It states the idea and representative details.",
          "id": "reading-u06-l02-q09",
          "conceptTag": "informational-summary",
          "reviewCardId": "reading-u06-l02-c3"
        },
        {
          "type": "true-false",
          "prompt": "A summary should copy the article sentence by sentence.",
          "choices": [
            {
              "id": "true",
              "text": "True — copying is summarizing"
            },
            {
              "id": "false",
              "text": "False — condense in your own words"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "Summaries paraphrase.",
          "id": "reading-u06-l02-q10",
          "conceptTag": "informational-summary",
          "reviewCardId": "reading-u06-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which revision removes an extra detail?",
          "choices": [
            {
              "id": "a",
              "text": "Add the paint color"
            },
            {
              "id": "b",
              "text": "Keep placement and cleaning; remove the pictured color"
            },
            {
              "id": "c",
              "text": "List every nesting room"
            },
            {
              "id": "d",
              "text": "Add an opinion"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The color is not central.",
          "id": "reading-u06-l02-q11",
          "conceptTag": "informational-summary",
          "reviewCardId": "reading-u06-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why include both flight space and cleaning?",
          "choices": [
            {
              "id": "a",
              "text": "They rhyme"
            },
            {
              "id": "b",
              "text": "They are the first sentences"
            },
            {
              "id": "c",
              "text": "They represent the two major idea parts"
            },
            {
              "id": "d",
              "text": "They describe paint"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Together they cover placement and care.",
          "id": "reading-u06-l02-q12",
          "conceptTag": "informational-summary",
          "reviewCardId": "reading-u06-l02-c3"
        },
        {
          "type": "fill-blank",
          "prompt": "Complete the objective summary: Good placement and regular ___ help a martin house serve birds.",
          "acceptedAnswers": [
            "care"
          ],
          "explanation": "Care is the central word used throughout the source.",
          "id": "reading-u06-l02-q13",
          "conceptTag": "informational-summary",
          "reviewCardId": "reading-u06-l02-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
