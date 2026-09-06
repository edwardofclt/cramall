import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit03Lessons = [
  {
    "id": "reading-u03-l01",
    "unitId": "reading-u03",
    "title": "Connect Setting, Conflict, Character Change, and Plot",
    "indicatorCodes": [
      "ELA.4.AOR.1.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Stories are systems: setting pressures characters, conflict demands choices, and choices move the plot."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "A character change is shown through later actions, not simply announced."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s trace cause and effect through one complete story."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u03-l01-c1",
        "title": "Connect Setting and Conflict",
        "blocks": [
          {
            "kind": "text",
            "text": "Setting is when and where; conflict is the central struggle. Ask how conditions in the setting create or intensify the problem."
          },
          {
            "kind": "example",
            "text": "At the open harbor field, sudden gusts twist the kite tail around a fence post."
          },
          {
            "kind": "tip",
            "text": "Use Setting condition → Resulting problem."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which setting detail causes the kite problem?",
          "choices": [
            {
              "id": "a",
              "text": "sudden harbor gusts"
            },
            {
              "id": "b",
              "text": "the judging line"
            },
            {
              "id": "c",
              "text": "the kite color"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The visible example connects gusts to the twisted tail."
        }
      },
      {
        "id": "reading-u03-l01-c2",
        "title": "Track Character Change",
        "blocks": [
          {
            "kind": "text",
            "text": "Track what a character wants, does, learns, and does differently later."
          },
          {
            "kind": "example",
            "text": "Priya first pulls harder; after the frame bends, she listens, moves, shortens the tail, and waits."
          },
          {
            "kind": "tip",
            "text": "Change needs before-and-after evidence."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Which later action best shows Priya changed?",
          "choices": [
            {
              "id": "a",
              "text": "She waits for steady wind and follows the team plan"
            },
            {
              "id": "b",
              "text": "She wants to launch first"
            },
            {
              "id": "c",
              "text": "She carries a diamond kite"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Her later patience contrasts with her earlier rush."
        }
      },
      {
        "id": "reading-u03-l01-c3",
        "title": "Explain How Conflict Builds Plot",
        "blocks": [
          {
            "kind": "text",
            "text": "Plot grows through connected events: situation, conflict, attempts, turning point, and resolution."
          },
          {
            "kind": "example",
            "text": "The bent frame is a turning point because Priya recognizes the cost of rushing."
          },
          {
            "kind": "tip",
            "text": "Explain each link with because, so, or therefore."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "widget": {
          "type": "story-elements-mapper",
          "config": {
            "textTitle": "The Windy Kite Festival",
            "fields": [
              "character",
              "setting",
              "problem",
              "events",
              "solution"
            ],
            "answers": {},
            "source": {
              "title": "The Windy Kite Festival",
              "text": "The Windy Kite Festival\n\nPriya’s team carried a bright diamond kite onto the open field beside the harbor. Flags snapped above the booths, and sudden gusts pushed hats across the grass. Priya wanted to launch at once because the judging line was growing.\n\nWhen the first strong gust twisted the long kite tail around a fence post, teammate Ben suggested waiting. Priya frowned and pulled harder. The paper frame bent, and she realized that rushing could ruin everyone’s work. She listened while Ben explained that a shorter tail would drag less near the fence.\n\nThe team moved to the field’s clear center, shortened the tail, and watched two gusts before trying again. Priya counted down only when the wind steadied. Ben held the kite while she released the line gradually. The kite climbed without striking the fence.\n\nAfter the flight, Priya thanked Ben for speaking up. The windy harbor setting created the danger, but Priya’s decision to listen and adjust changed the events. Their safer plan solved the conflict and let the whole team finish the festival flight."
            },
            "choices": [
              {"id":"character-priya","text":"Priya","field":"character"},
              {"id":"setting-harbor","text":"The open field beside the windy harbor","field":"setting"},
              {"id":"problem-gust","text":"A gust twists the kite tail around a fence post","field":"problem"},
              {"id":"events-adjust","text":"Priya listens, shortens the tail, and changes the launch plan","field":"events"},
              {"id":"solution-safe","text":"The kite climbs safely and the team finishes the flight","field":"solution"}
            ],
            "answerChoiceIds": {
              "character":"character-priya",
              "setting":"setting-harbor",
              "problem":"problem-gust",
              "events":"events-adjust",
              "solution":"solution-safe"
            }
          }
        },
        "widgetCoach": {
          "intro": [
            {"speaker":"guide","pose":"think","text":"Point each story element to the words that prove it in the story."},
            {"speaker":"kid","text":"I will build the setting → problem → choices → solution path from visible clues."}
          ],
          "reactions": {
            "strategy": {"text":"Read the source line by line and look for the clue that answers each field.","pose":"think"},
            "retry": {"text":"That field needs a different story clue. Scan the source before trying again.","pose":"oops"},
            "milestone": {"text":"Nice evidence match! Keep building the plot path.","pose":"cheer"},
            "complete": {"text":"You connected setting, problem, choices, and solution using the story’s words.","pose":"cheer"}
          }
        },
        "check": {
          "prompt": "Why is the bent frame a turning point?",
          "choices": [
            {
              "id": "a",
              "text": "It causes Priya to reconsider rushing"
            },
            {
              "id": "b",
              "text": "It changes the kite color"
            },
            {
              "id": "c",
              "text": "It ends the festival immediately"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The consequence changes her next choice."
        }
      }
    ],
    "workedExample": {
      "title": "Trace cause and change through the kite plot",
      "passage": {
        "title": "The Windy Kite Festival",
        "text": "The Windy Kite Festival\n\nPriya’s team carried a bright diamond kite onto the open field beside the harbor. Flags snapped above the booths, and sudden gusts pushed hats across the grass. Priya wanted to launch at once because the judging line was growing.\n\nWhen the first strong gust twisted the long kite tail around a fence post, teammate Ben suggested waiting. Priya frowned and pulled harder. The paper frame bent, and she realized that rushing could ruin everyone’s work. She listened while Ben explained that a shorter tail would drag less near the fence.\n\nThe team moved to the field’s clear center, shortened the tail, and watched two gusts before trying again. Priya counted down only when the wind steadied. Ben held the kite while she released the line gradually. The kite climbed without striking the fence.\n\nAfter the flight, Priya thanked Ben for speaking up. The windy harbor setting created the danger, but Priya’s decision to listen and adjust changed the events. Their safer plan solved the conflict and let the whole team finish the festival flight."
      },
      "steps": [
        "Name the gusty harbor setting and twisted-tail conflict.",
        "Compare Priya’s first response with her later listening and waiting.",
        "Link the adjusted launch plan to the safe flight resolution."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “The Windy Kite Festival”",
        "text": "The Windy Kite Festival\n\nPriya’s team carried a bright diamond kite onto the open field beside the harbor. Flags snapped above the booths, and sudden gusts pushed hats across the grass. Priya wanted to launch at once because the judging line was growing.\n\nWhen the first strong gust twisted the long kite tail around a fence post, teammate Ben suggested waiting. Priya frowned and pulled harder. The paper frame bent, and she realized that rushing could ruin everyone’s work. She listened while Ben explained that a shorter tail would drag less near the fence.\n\nThe team moved to the field’s clear center, shortened the tail, and watched two gusts before trying again. Priya counted down only when the wind steadied. Ben held the kite while she released the line gradually. The kite climbed without striking the fence.\n\nAfter the flight, Priya thanked Ben for speaking up. The windy harbor setting created the danger, but Priya’s decision to listen and adjust changed the events. Their safer plan solved the conflict and let the whole team finish the festival flight."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "Which setting detail most directly creates the conflict?",
          "choices": [
            {
              "id": "a",
              "text": "Strong gusts near the fence"
            },
            {
              "id": "b",
              "text": "Bright booth flags"
            },
            {
              "id": "c",
              "text": "A growing judging line"
            },
            {
              "id": "d",
              "text": "The diamond kite shape"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The gusts twist the tail around the fence.",
          "id": "reading-u03-l01-q01",
          "conceptTag": "setting-conflict",
          "reviewCardId": "reading-u03-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "The harbor wind affects the events of the story.",
          "choices": [
            {
              "id": "true",
              "text": "True — gusts create danger and shape the plan"
            },
            {
              "id": "false",
              "text": "False — the setting has no effect"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The plot depends on changing wind.",
          "id": "reading-u03-l01-q02",
          "conceptTag": "setting-conflict",
          "reviewCardId": "reading-u03-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What is the central conflict?",
          "choices": [
            {
              "id": "a",
              "text": "Priya dislikes festivals"
            },
            {
              "id": "b",
              "text": "Ben wants a different color"
            },
            {
              "id": "c",
              "text": "Gusts threaten the team kite and Priya rushes the launch"
            },
            {
              "id": "d",
              "text": "The booth has too many flags"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The weather and rushed response endanger the kite.",
          "id": "reading-u03-l01-q03",
          "conceptTag": "setting-conflict",
          "reviewCardId": "reading-u03-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which sentence best uses causal reasoning?",
          "choices": [
            {
              "id": "a",
              "text": "The setting is outdoors"
            },
            {
              "id": "b",
              "text": "A kite has a tail"
            },
            {
              "id": "c",
              "text": "Priya is on a team"
            },
            {
              "id": "d",
              "text": "Because gusts catch the long tail near the fence, the team must change its plan"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It explicitly links setting to conflict.",
          "id": "reading-u03-l01-q04",
          "conceptTag": "setting-conflict",
          "reviewCardId": "reading-u03-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does Priya respond at first?",
          "choices": [
            {
              "id": "a",
              "text": "She waits calmly"
            },
            {
              "id": "b",
              "text": "She frowns and pulls harder"
            },
            {
              "id": "c",
              "text": "She leaves the field"
            },
            {
              "id": "d",
              "text": "She shortens the tail immediately"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Her first action is impatient.",
          "id": "reading-u03-l01-q05",
          "conceptTag": "character-change",
          "reviewCardId": "reading-u03-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "Priya’s thanks to Ben and careful second launch show a change in her actions.",
          "choices": [
            {
              "id": "true",
              "text": "True — later actions show listening and patience"
            },
            {
              "id": "false",
              "text": "False — she behaves exactly as before"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The before-and-after actions differ.",
          "id": "reading-u03-l01-q06",
          "conceptTag": "character-change",
          "reviewCardId": "reading-u03-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "What causes Priya to reconsider?",
          "choices": [
            {
              "id": "a",
              "text": "The flags snap"
            },
            {
              "id": "b",
              "text": "The line grows"
            },
            {
              "id": "c",
              "text": "The kite frame bends"
            },
            {
              "id": "d",
              "text": "Ben holds the kite"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The bent frame reveals the risk of rushing.",
          "id": "reading-u03-l01-q07",
          "conceptTag": "character-change",
          "reviewCardId": "reading-u03-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which statement best explains Priya’s change?",
          "choices": [
            {
              "id": "a",
              "text": "She moves from rushing alone to listening and adapting with her team"
            },
            {
              "id": "b",
              "text": "She changes from liking kites to disliking them"
            },
            {
              "id": "c",
              "text": "She learns that wind never changes"
            },
            {
              "id": "d",
              "text": "She becomes the festival judge"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The evidence shows teamwork and patience.",
          "id": "reading-u03-l01-q08",
          "conceptTag": "character-change",
          "reviewCardId": "reading-u03-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which event begins the main problem?",
          "choices": [
            {
              "id": "a",
              "text": "Priya thanks Ben"
            },
            {
              "id": "b",
              "text": "The kite climbs"
            },
            {
              "id": "c",
              "text": "The team moves to center field"
            },
            {
              "id": "d",
              "text": "A gust twists the tail around a fence post"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "That event launches the conflict.",
          "id": "reading-u03-l01-q09",
          "conceptTag": "plot-development",
          "reviewCardId": "reading-u03-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How is the conflict resolved?",
          "choices": [
            {
              "id": "a",
              "text": "The festival closes"
            },
            {
              "id": "b",
              "text": "The team moves, shortens the tail, waits, and launches safely"
            },
            {
              "id": "c",
              "text": "Priya buys a new kite"
            },
            {
              "id": "d",
              "text": "The wind stops forever"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The revised plan addresses the wind and fence danger.",
          "id": "reading-u03-l01-q10",
          "conceptTag": "plot-development",
          "reviewCardId": "reading-u03-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "The resolution follows from the characters’ changed choices rather than luck alone.",
          "choices": [
            {
              "id": "true",
              "text": "True — their plan produces the safer launch"
            },
            {
              "id": "false",
              "text": "False — no action contributes"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Their deliberate adjustments solve the problem.",
          "id": "reading-u03-l01-q11",
          "conceptTag": "plot-development",
          "reviewCardId": "reading-u03-l01-c3"
        },
        {
          "type": "sort",
          "prompt": "Order the plot events.",
          "explanation": "The events progress from conflict through turning point and response to resolution.",
          "id": "reading-u03-l01-q12",
          "conceptTag": "plot-development",
          "reviewCardId": "reading-u03-l01-c3",
          "items": [
            {
              "id": "step-3",
              "text": "Priya listens and the team adjusts"
            },
            {
              "id": "step-1",
              "text": "A gust twists the tail"
            },
            {
              "id": "step-4",
              "text": "The kite launches safely"
            },
            {
              "id": "step-2",
              "text": "The frame bends when Priya pulls"
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
          "prompt": "Which explanation connects all four story elements?",
          "choices": [
            {
              "id": "a",
              "text": "The kite is bright and Priya attends a festival"
            },
            {
              "id": "b",
              "text": "Ben speaks and flags move"
            },
            {
              "id": "c",
              "text": "Wind creates the conflict; Priya changes after a consequence; her new choices build a safe resolution"
            },
            {
              "id": "d",
              "text": "The team wins because the setting disappears"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It traces the full causal chain.",
          "id": "reading-u03-l01-q13",
          "conceptTag": "plot-development",
          "reviewCardId": "reading-u03-l01-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
