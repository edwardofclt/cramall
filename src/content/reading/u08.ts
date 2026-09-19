import { readingWorkshopForCard } from './workshop-registration';
import { READING_OE_CODES } from '../curriculum';
import type { Lesson } from '../schema';

export const unit08Lessons = [
  {
    "id": "reading-u08-l01",
    "unitId": "reading-u08",
    "title": "Connect Author's Purpose and Perspective",
    "indicatorCodes": [
      "ELA.4.AOR.4.1"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "Purpose is what an author wants a text to accomplish."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Perspective is the author’s attitude or position toward the subject."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s explain how language choices connect perspective to purpose."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u08-l01-c1",
        "title": "Identify the Author's Purpose",
        "blocks": [
          {
            "kind": "text",
            "text": "Purposes include answering, explaining, describing, and advocating; infer the precise purpose from the whole text."
          },
          {
            "kind": "example",
            "text": "Text A asks a committee to consider trees, while Text B explains how canopy shade works."
          },
          {
            "kind": "tip",
            "text": "Name the audience and intended result."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "What is Text A mainly trying to do?",
          "choices": [
            {
              "id": "a",
              "text": "persuade the committee to study planting shade trees"
            },
            {
              "id": "b",
              "text": "explain every tree species"
            },
            {
              "id": "c",
              "text": "entertain with a fantasy"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The writer states a belief and makes a request."
        }
      },
      {
        "id": "reading-u08-l01-c2",
        "title": "Infer the Author's Perspective",
        "blocks": [
          {
            "kind": "text",
            "text": "Perspective appears in judgments, emphasis, tone, and selected details."
          },
          {
            "kind": "example",
            "text": "“I believe” and “would serve students” show support; Text B uses neutral qualifying language."
          },
          {
            "kind": "tip",
            "text": "Perspective is not first/third-person narration."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Which phrase most clearly reveals support?",
          "choices": [
            {
              "id": "a",
              "text": "I believe our school should plant"
            },
            {
              "id": "b",
              "text": "A canopy is a layer"
            },
            {
              "id": "c",
              "text": "Cooling varies"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It directly states the writer’s position."
        }
      },
      {
        ...readingWorkshopForCard('reading-u08-l01-c3'),
        "id": "reading-u08-l01-c3",
        "title": "Explain How Perspective Conveys Purpose",
        "blocks": [
          {
            "kind": "text",
            "text": "Connect language to purpose: perspective language shapes how the audience receives the goal."
          },
          {
            "kind": "example",
            "text": "Positive benefits and a respectful request advance advocacy; neutral definitions and qualifications advance explanation."
          },
          {
            "kind": "tip",
            "text": "Use Language → Perspective → Purpose."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "How does “Please ask” serve Text A?",
          "choices": [
            {
              "id": "a",
              "text": "It turns support into a direct advocacy request"
            },
            {
              "id": "b",
              "text": "It defines canopy"
            },
            {
              "id": "c",
              "text": "It proves all sites cool equally"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The phrase asks the audience to act."
        }
      }
    ],
    "workedExample": {
      "title": "Compare purpose and perspective in paired texts",
      "passage": {
        "title": "A Shadier Schoolyard / How Tree Canopies Cool Pavement",
        "text": "Paired Text A — A Shadier Schoolyard\n\nI believe our school should plant two shade trees beside the blacktop. At midday, the pavement feels hot, and students crowd beneath the one small awning. Trees would create another shaded place for reading and recess. Their roots would need protected planting beds, and adults would choose species suited to the site. Planting takes planning, but a cooler gathering space would serve students for years. Please ask the school committee to study safe locations this fall.\n\nPaired Text B — How Tree Canopies Cool Pavement\n\nA tree canopy is the layer formed by branches and leaves. A canopy blocks some sunlight before it reaches pavement. Leaves also release water vapor, a process that can cool nearby air. The amount of cooling varies with tree size, weather, placement, and time of day. Schools considering trees must also plan for roots, water, and long-term care. These facts explain why tree shade can change conditions around paved areas without promising the same result in every location."
      },
      "steps": [
        "Mark Text A’s belief, benefits, and request.",
        "Mark Text B’s definitions, causes, and qualifications.",
        "Explain that supportive perspective advances advocacy while neutral perspective advances explanation."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “A Shadier Schoolyard / How Tree Canopies Cool Pavement”",
        "text": "Paired Text A — A Shadier Schoolyard\n\nI believe our school should plant two shade trees beside the blacktop. At midday, the pavement feels hot, and students crowd beneath the one small awning. Trees would create another shaded place for reading and recess. Their roots would need protected planting beds, and adults would choose species suited to the site. Planting takes planning, but a cooler gathering space would serve students for years. Please ask the school committee to study safe locations this fall.\n\nPaired Text B — How Tree Canopies Cool Pavement\n\nA tree canopy is the layer formed by branches and leaves. A canopy blocks some sunlight before it reaches pavement. Leaves also release water vapor, a process that can cool nearby air. The amount of cooling varies with tree size, weather, placement, and time of day. Schools considering trees must also plan for roots, water, and long-term care. These facts explain why tree shade can change conditions around paved areas without promising the same result in every location."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "What is Text A’s main purpose?",
          "choices": [
            {
              "id": "a",
              "text": "Advocate that the committee study safe tree planting"
            },
            {
              "id": "b",
              "text": "Explain water vapor only"
            },
            {
              "id": "c",
              "text": "Describe one tree species"
            },
            {
              "id": "d",
              "text": "Tell a fictional adventure"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The writer argues for consideration and action.",
          "id": "reading-u08-l01-q01",
          "conceptTag": "author-purpose",
          "reviewCardId": "reading-u08-l01-c1"
        },
        {
          "type": "true-false",
          "prompt": "Text B primarily explains rather than asks the reader to act.",
          "choices": [
            {
              "id": "true",
              "text": "True — it defines and explains canopy effects"
            },
            {
              "id": "false",
              "text": "False — it demands a vote"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Its language is informational.",
          "id": "reading-u08-l01-q02",
          "conceptTag": "author-purpose",
          "reviewCardId": "reading-u08-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which detail most clearly serves Text A’s purpose?",
          "choices": [
            {
              "id": "a",
              "text": "Branches form canopies"
            },
            {
              "id": "b",
              "text": "Cooling varies"
            },
            {
              "id": "c",
              "text": "Please ask the committee to study safe locations"
            },
            {
              "id": "d",
              "text": "Leaves release water vapor"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "The request names the desired action.",
          "id": "reading-u08-l01-q03",
          "conceptTag": "author-purpose",
          "reviewCardId": "reading-u08-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which statement best distinguishes the purposes?",
          "choices": [
            {
              "id": "a",
              "text": "Both only entertain"
            },
            {
              "id": "b",
              "text": "Both demand planting"
            },
            {
              "id": "c",
              "text": "A describes and B narrates"
            },
            {
              "id": "d",
              "text": "A advocates a study; B explains how canopy cooling works"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It accurately states each goal.",
          "id": "reading-u08-l01-q04",
          "conceptTag": "author-purpose",
          "reviewCardId": "reading-u08-l01-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "What perspective does Text A express?",
          "choices": [
            {
              "id": "a",
              "text": "uncertain that trees exist"
            },
            {
              "id": "b",
              "text": "supportive of carefully planned shade trees"
            },
            {
              "id": "c",
              "text": "opposed to all planting"
            },
            {
              "id": "d",
              "text": "neutral about the school"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Benefits and request show support.",
          "id": "reading-u08-l01-q05",
          "conceptTag": "author-perspective",
          "reviewCardId": "reading-u08-l01-c2"
        },
        {
          "type": "true-false",
          "prompt": "Text B’s qualifications create a more neutral perspective.",
          "choices": [
            {
              "id": "true",
              "text": "True — it notes variables and limits"
            },
            {
              "id": "false",
              "text": "False — neutral texts hide limits"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The caveats avoid overstatement.",
          "id": "reading-u08-l01-q06",
          "conceptTag": "author-perspective",
          "reviewCardId": "reading-u08-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which phrase is strongest perspective evidence?",
          "choices": [
            {
              "id": "a",
              "text": "tree canopy"
            },
            {
              "id": "b",
              "text": "water vapor"
            },
            {
              "id": "c",
              "text": "would serve students for years"
            },
            {
              "id": "d",
              "text": "time of day"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It gives a positive judgment.",
          "id": "reading-u08-l01-q07",
          "conceptTag": "author-perspective",
          "reviewCardId": "reading-u08-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which statement avoids confusing perspective with narration?",
          "choices": [
            {
              "id": "a",
              "text": "Perspective means using I"
            },
            {
              "id": "b",
              "text": "Third person is always neutral"
            },
            {
              "id": "c",
              "text": "Purpose and perspective are identical"
            },
            {
              "id": "d",
              "text": "Perspective is the author’s stance, shown by selected language and emphasis"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It defines stance accurately.",
          "id": "reading-u08-l01-q08",
          "conceptTag": "author-perspective",
          "reviewCardId": "reading-u08-l01-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does Text A’s perspective convey purpose?",
          "choices": [
            {
              "id": "a",
              "text": "Positive benefits and a respectful request encourage committee action"
            },
            {
              "id": "b",
              "text": "Definitions prove advocacy"
            },
            {
              "id": "c",
              "text": "Qualifications demand planting"
            },
            {
              "id": "d",
              "text": "First person makes every claim true"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Language and action align.",
          "id": "reading-u08-l01-q09",
          "conceptTag": "purpose-perspective",
          "reviewCardId": "reading-u08-l01-c3"
        },
        {
          "type": "true-false",
          "prompt": "An author can explain from a neutral perspective while still selecting useful facts.",
          "choices": [
            {
              "id": "true",
              "text": "True — Text B does so"
            },
            {
              "id": "false",
              "text": "False — explanation requires a strong opinion"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "Neutral does not mean fact-free.",
          "id": "reading-u08-l01-q10",
          "conceptTag": "purpose-perspective",
          "reviewCardId": "reading-u08-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "How does Text B’s perspective serve its purpose?",
          "choices": [
            {
              "id": "a",
              "text": "It praises the school"
            },
            {
              "id": "b",
              "text": "It uses definitions, causes, and limits to explain accurately"
            },
            {
              "id": "c",
              "text": "It tells readers to vote"
            },
            {
              "id": "d",
              "text": "It uses a character conflict"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The neutral evidence supports explanation.",
          "id": "reading-u08-l01-q11",
          "conceptTag": "purpose-perspective",
          "reviewCardId": "reading-u08-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which comparison is supported?",
          "choices": [
            {
              "id": "a",
              "text": "A and B oppose trees"
            },
            {
              "id": "b",
              "text": "A explains roots; B tells a story"
            },
            {
              "id": "c",
              "text": "Both discuss shade, but their stance and intended result differ"
            },
            {
              "id": "d",
              "text": "Their purposes are identical"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Topic can match while purpose differs.",
          "id": "reading-u08-l01-q12",
          "conceptTag": "purpose-perspective",
          "reviewCardId": "reading-u08-l01-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which response follows Language → Perspective → Purpose?",
          "choices": [
            {
              "id": "a",
              "text": "Trees → shade → school"
            },
            {
              "id": "b",
              "text": "I appears → first person → true"
            },
            {
              "id": "c",
              "text": "Canopy is defined → trees are good"
            },
            {
              "id": "d",
              "text": "“Would serve students” shows support, which helps persuade the committee to consider planting"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It traces exact language to stance and goal.",
          "id": "reading-u08-l01-q13",
          "conceptTag": "purpose-perspective",
          "reviewCardId": "reading-u08-l01-c3"
        }
      ]
    }
  },
  {
    "id": "reading-u08-l02",
    "unitId": "reading-u08",
    "title": "Explain Claims, Reasons, and Evidence",
    "indicatorCodes": [
      "ELA.4.AOR.5.3"
    ],
    "crossCuttingExpectationCodes": [...READING_OE_CODES],
    "intro": [
      {
        "speaker": "winnie",
        "pose": "talk",
        "text": "A claim is the position an author wants readers to accept."
      },
      {
        "speaker": "winnie",
        "pose": "think",
        "text": "Reasons tell why; evidence supplies verifiable support."
      },
      {
        "speaker": "winnie",
        "pose": "cheer",
        "text": "Let’s trace each evidence link without overstating it."
      }
    ],
    "learnCards": [
      {
        "id": "reading-u08-l02-c1",
        "title": "Locate the Claim",
        "blocks": [
          {
            "kind": "text",
            "text": "Find the broad arguable statement supported by the rest of the text."
          },
          {
            "kind": "example",
            "text": "“Our school should keep the refill station” is the claim."
          },
          {
            "kind": "tip",
            "text": "A fact can support the claim without being the claim."
          },
          {
            "kind": "tip",
            "text": "Support: Read one source section at a time. Underline the words named in the question before choosing."
          }
        ],
        "check": {
          "prompt": "Which sentence is the claim?",
          "choices": [
            {
              "id": "a",
              "text": "The school should keep the refill station"
            },
            {
              "id": "b",
              "text": "The log counted 1,240 refills"
            },
            {
              "id": "c",
              "text": "A bottle has a sticker"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It is the position the argument supports."
        }
      },
      {
        "id": "reading-u08-l02-c2",
        "title": "Evaluate the Reasons",
        "blocks": [
          {
            "kind": "text",
            "text": "A reason is a logical why: convenience and possible waste reduction."
          },
          {
            "kind": "example",
            "text": "A relevant reason connects directly and is not merely a repeated claim."
          },
          {
            "kind": "tip",
            "text": "Check whether the reason would matter if true."
          },
          {
            "kind": "tip",
            "text": "Response frame: The source says ____. This supports ____ because ____."
          }
        ],
        "check": {
          "prompt": "Which is a relevant reason?",
          "choices": [
            {
              "id": "a",
              "text": "Students can refill after activity"
            },
            {
              "id": "b",
              "text": "The station is beside a wall"
            },
            {
              "id": "c",
              "text": "A sticker shows a dolphin"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Convenient access directly supports keeping it."
        }
      },
      {
        ...readingWorkshopForCard('reading-u08-l02-c3'),
        "id": "reading-u08-l02-c3",
        "title": "Connect Evidence to the Claim",
        "blocks": [
          {
            "kind": "text",
            "text": "Evidence includes observations, records, measurements, and credible expert information."
          },
          {
            "kind": "example",
            "text": "The refill count supports use; the waste count supports reduced disposable bottles, with stated limits."
          },
          {
            "kind": "tip",
            "text": "Explain Evidence → Reason → Claim."
          },
          {
            "kind": "tip",
            "text": "Stretch: Compare a second detail and explain whether it strengthens, limits, or changes your first answer."
          }
        ],
        "check": {
          "prompt": "What does 1,240 refills support?",
          "choices": [
            {
              "id": "a",
              "text": "The station is frequently used"
            },
            {
              "id": "b",
              "text": "Every refill replaces plastic"
            },
            {
              "id": "c",
              "text": "Filters never need changing"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The log directly measures use."
        }
      }
    ],
    "workedExample": {
      "title": "Trace claim, reasons, evidence, and limits",
      "passage": {
        "title": "Keep the Refill Station",
        "text": "Keep the Refill Station\n\nOur school should keep the water-bottle refill station beside the gym. First, it gives students a convenient place to refill reusable bottles after physical education and recess. A facilities log recorded 1,240 refills during the first eight weeks of school. That count shows frequent use.\n\nSecond, refilling a bottle can reduce the number of single-use bottles placed in trash bins. In a one-day cafeteria check, the green team counted 37 fewer disposable water bottles than on the same event day before the station opened. One student’s bottle has a dolphin sticker; that detail is true but does not support the claim.\n\nThe station needs filter changes and cleaning, so keeping it requires a maintenance plan. The usage log and waste count do not prove every refill replaces a disposable bottle, but they provide relevant evidence for convenience and reduced waste. For those reasons, the school should keep and maintain the station."
      },
      "steps": [
        "State the keep-the-station claim.",
        "Match convenience and reduced waste as reasons.",
        "Connect the refill and waste counts while preserving the source’s limits."
      ]
    },
    "quiz": {
      "passThreshold": 8,
      "reference": {
        "title": "Read “Keep the Refill Station”",
        "text": "Keep the Refill Station\n\nOur school should keep the water-bottle refill station beside the gym. First, it gives students a convenient place to refill reusable bottles after physical education and recess. A facilities log recorded 1,240 refills during the first eight weeks of school. That count shows frequent use.\n\nSecond, refilling a bottle can reduce the number of single-use bottles placed in trash bins. In a one-day cafeteria check, the green team counted 37 fewer disposable water bottles than on the same event day before the station opened. One student’s bottle has a dolphin sticker; that detail is true but does not support the claim.\n\nThe station needs filter changes and cleaning, so keeping it requires a maintenance plan. The usage log and waste count do not prove every refill replaces a disposable bottle, but they provide relevant evidence for convenience and reduced waste. For those reasons, the school should keep and maintain the station."
      },
      "pool": [
        {
          "type": "multiple-choice",
          "prompt": "What is the central claim?",
          "choices": [
            {
              "id": "a",
              "text": "The school should keep and maintain the refill station"
            },
            {
              "id": "b",
              "text": "Every student owns a bottle"
            },
            {
              "id": "c",
              "text": "The gym should close"
            },
            {
              "id": "d",
              "text": "Filters last forever"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The text argues for keeping the station.",
          "id": "reading-u08-l02-q01",
          "conceptTag": "claim",
          "reviewCardId": "reading-u08-l02-c1"
        },
        {
          "type": "true-false",
          "prompt": "“The log recorded 1,240 refills” is evidence, not the claim.",
          "choices": [
            {
              "id": "true",
              "text": "True — it supports frequent use"
            },
            {
              "id": "false",
              "text": "False — every number is a claim"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The number supports a reason.",
          "id": "reading-u08-l02-q02",
          "conceptTag": "claim",
          "reviewCardId": "reading-u08-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which sentence restates the claim?",
          "choices": [
            {
              "id": "a",
              "text": "The station needs cleaning"
            },
            {
              "id": "b",
              "text": "A bottle has a sticker"
            },
            {
              "id": "c",
              "text": "Continue operating the refill station with maintenance"
            },
            {
              "id": "d",
              "text": "The green team counts trash"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It preserves the author’s position.",
          "id": "reading-u08-l02-q03",
          "conceptTag": "claim",
          "reviewCardId": "reading-u08-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which is not the claim?",
          "choices": [
            {
              "id": "a",
              "text": "Keep the station"
            },
            {
              "id": "b",
              "text": "Maintain the station"
            },
            {
              "id": "c",
              "text": "The station should remain available"
            },
            {
              "id": "d",
              "text": "The station logged 1,240 refills"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "The log is evidence.",
          "id": "reading-u08-l02-q04",
          "conceptTag": "claim",
          "reviewCardId": "reading-u08-l02-c1"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which reason supports the claim?",
          "choices": [
            {
              "id": "a",
              "text": "The station has metal parts"
            },
            {
              "id": "b",
              "text": "Students can refill reusable bottles conveniently"
            },
            {
              "id": "c",
              "text": "The gym has a door"
            },
            {
              "id": "d",
              "text": "A student likes dolphins"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "Convenience is a direct benefit.",
          "id": "reading-u08-l02-q05",
          "conceptTag": "reasons",
          "reviewCardId": "reading-u08-l02-c2"
        },
        {
          "type": "true-false",
          "prompt": "The need for maintenance automatically destroys the argument.",
          "choices": [
            {
              "id": "true",
              "text": "True — costs end every claim"
            },
            {
              "id": "false",
              "text": "False — the author acknowledges it and proposes a plan"
            }
          ],
          "correctChoiceId": "false",
          "explanation": "A limitation can be addressed.",
          "id": "reading-u08-l02-q06",
          "conceptTag": "reasons",
          "reviewCardId": "reading-u08-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which is the second reason?",
          "choices": [
            {
              "id": "a",
              "text": "The station is beside the gym"
            },
            {
              "id": "b",
              "text": "Filters change"
            },
            {
              "id": "c",
              "text": "Refilling may reduce disposable-bottle waste"
            },
            {
              "id": "d",
              "text": "Logs use numbers"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "Waste reduction supports keeping it.",
          "id": "reading-u08-l02-q07",
          "conceptTag": "reasons",
          "reviewCardId": "reading-u08-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Why is the dolphin sticker irrelevant?",
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
              "text": "It appears late"
            },
            {
              "id": "d",
              "text": "It does not support convenience, waste reduction, or the claim"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "Truth alone does not ensure relevance.",
          "id": "reading-u08-l02-q08",
          "conceptTag": "reasons",
          "reviewCardId": "reading-u08-l02-c2"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which evidence supports frequent use?",
          "choices": [
            {
              "id": "a",
              "text": "1,240 refills in eight weeks"
            },
            {
              "id": "b",
              "text": "37 bottle colors"
            },
            {
              "id": "c",
              "text": "one sticker"
            },
            {
              "id": "d",
              "text": "a filter schedule"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The usage log directly measures refills.",
          "id": "reading-u08-l02-q09",
          "conceptTag": "claim-evidence",
          "reviewCardId": "reading-u08-l02-c3"
        },
        {
          "type": "true-false",
          "prompt": "The source carefully avoids claiming every refill replaces a disposable bottle.",
          "choices": [
            {
              "id": "true",
              "text": "True — it states that limit"
            },
            {
              "id": "false",
              "text": "False — it makes the absolute claim"
            }
          ],
          "correctChoiceId": "true",
          "explanation": "The limitation keeps the reasoning accurate.",
          "id": "reading-u08-l02-q10",
          "conceptTag": "claim-evidence",
          "reviewCardId": "reading-u08-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "What does the one-day waste count support?",
          "choices": [
            {
              "id": "a",
              "text": "The station cleans itself"
            },
            {
              "id": "b",
              "text": "Disposable-bottle waste may be lower with refilling"
            },
            {
              "id": "c",
              "text": "Every student drinks equally"
            },
            {
              "id": "d",
              "text": "The log is incorrect"
            }
          ],
          "correctChoiceId": "b",
          "explanation": "The comparison is relevant evidence.",
          "id": "reading-u08-l02-q11",
          "conceptTag": "claim-evidence",
          "reviewCardId": "reading-u08-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which explanation is strongest?",
          "choices": [
            {
              "id": "a",
              "text": "Numbers are convincing"
            },
            {
              "id": "b",
              "text": "The station is useful"
            },
            {
              "id": "c",
              "text": "The refill log supports convenience/frequent use, which supports keeping the station"
            },
            {
              "id": "d",
              "text": "Stickers support recycling"
            }
          ],
          "correctChoiceId": "c",
          "explanation": "It traces evidence to reason to claim.",
          "id": "reading-u08-l02-q12",
          "conceptTag": "claim-evidence",
          "reviewCardId": "reading-u08-l02-c3"
        },
        {
          "type": "multiple-choice",
          "prompt": "Which evaluation is accurate?",
          "choices": [
            {
              "id": "a",
              "text": "The evidence proves all future behavior"
            },
            {
              "id": "b",
              "text": "No evidence is present"
            },
            {
              "id": "c",
              "text": "The claim is only a fact"
            },
            {
              "id": "d",
              "text": "The records support the reasons, while the author appropriately notes their limits"
            }
          ],
          "correctChoiceId": "d",
          "explanation": "It weighs both support and limitation.",
          "id": "reading-u08-l02-q13",
          "conceptTag": "claim-evidence",
          "reviewCardId": "reading-u08-l02-c3"
        }
      ]
    }
  }
] satisfies Lesson[];
