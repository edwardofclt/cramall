import type { Lesson } from '../schema';

const scienceU08L01Core = {
  "id": "science-u08-l01",
  "unitId": "science-u08",
  "title": "Trace Energy and Fuels to Natural Resources",
  "indicatorCodes": [
    "4-ESS3-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A community energy guide lists sunlight, wind, water behind dams, fossil fuels, and nuclear fuels."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Each energy source or fuel begins with a natural resource."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will name origins, classify renewable and nonrenewable examples, and combine two source notes."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s trace each resource without mixing its category!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u08-l01-c1",
      "title": "Name resource origins",
      "blocks": [
        {
          "kind": "text",
          "text": "Sunlight comes from the Sun; wind is moving air; dammed water is stored water in a managed river system; coal, oil, and natural gas are fossil fuels from Earth; uranium is a nuclear fuel mined from Earth."
        },
        {
          "kind": "example",
          "text": "Resource origin answers where the energy source or fuel comes from, not whether one use is preferred."
        },
        {
          "kind": "tip",
          "text": "Support: Complete ____ comes from ____ for each of the five resource groups."
        }
      ]
    },
    {
      "id": "science-u08-l01-c2",
      "title": "Classify renewable and nonrenewable resources",
      "blocks": [
        {
          "kind": "text",
          "text": "Renewable resources are replenished through ongoing natural processes on human time scales, including sunlight, wind, and flowing/stored water. Fossil and nuclear fuels are nonrenewable because their supplies are limited."
        },
        {
          "kind": "example",
          "text": "In the sorter, sunlight is renewable and coal is nonrenewable. The two examples stand for a larger list explained in the card."
        },
        {
          "kind": "tip",
          "text": "Response frame: ____ is renewable/nonrenewable because ____."
        }
      ],
      "widget": {
        "type": "resource-sorter",
        "config": {
          "items": [
            {
              "id": "sun",
              "label": "Sunlight",
              "kind": "renewable",
              "lessonCategory": "replenished on human time scales"
            },
            {
              "id": "coal",
              "label": "Coal",
              "kind": "nonrenewable",
              "lessonCategory": "limited Earth material"
            }
          ],
          "bins": [
            "renewable",
            "nonrenewable"
          ],
          "lessonCategory": "resource origin and replenishment",
          "effectChoices": [
            { "id": "replenished", "text": "Replenished through ongoing natural processes" },
            { "id": "limited", "text": "Limited supply that can run out" }
          ],
          "effectAnswers": { "sun": "replenished", "coal": "limited" }
        }
      },
      "widgetCoach": {
          "intro": [
            { "speaker": "guide", "pose": "talk", "text": "Sort each resource by its lesson category, then connect it to how its supply behaves." },
            { "speaker": "kid", "text": "I’ll place each one, then explain whether it is replenished or limited." }
          ],
          "reactions": {
            "strategy": { "pose": "think", "text": "Start with the category, then use the lesson fact about replenished or limited supply." },
            "retry": { "pose": "oops", "text": "Check the lesson source note again: renewable resources replenish; fossil fuels have limited supplies." },
            "milestone": { "pose": "talk", "text": "Your categories fit. Now connect each resource to the effect the lesson describes." },
            "complete": { "pose": "cheer", "text": "You connected resource categories to lesson-based supply effects." }
          }
        }
    },
    {
      "id": "science-u08-l01-c3",
      "title": "Combine information from sources",
      "blocks": [
        {
          "kind": "text",
          "text": "Source A says wind, sunlight, and water behind dams can be renewed by ongoing natural processes. Source B says fossil and nuclear fuels come from limited Earth materials."
        },
        {
          "kind": "example",
          "text": "Combining means using relevant information from both sources in one accurate description."
        },
        {
          "kind": "tip",
          "text": "Stretch: Write one sentence with all three renewable examples and both nonrenewable fuel groups, citing Source A and Source B."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Trace Energy and Fuels to Natural Resources",
    "steps": [
      "From Source A, list wind, sunlight, and water behind dams as renewable examples.",
      "From Source B, list fossil fuels and nuclear fuels as nonrenewable examples.",
      "Trace each example to its natural origin.",
      "Combine both sources into one description without claiming that all uses have identical effects."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;


const scienceU08L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u08-l01-q01",
    "conceptTag": "resource-origin",
    "reviewCardId": "science-u08-l01-c1",
    "type": "multiple-choice",
    "prompt": "What natural resource supplies solar energy?",
    "choices": [
      {
        "id": "a",
        "text": "Sunlight"
      },
      {
        "id": "b",
        "text": "Coal"
      },
      {
        "id": "c",
        "text": "Uranium"
      },
      {
        "id": "d",
        "text": "Moving air"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Solar energy comes from sunlight."
  },
  {
    "id": "science-u08-l01-q02",
    "conceptTag": "resource-origin",
    "reviewCardId": "science-u08-l01-c1",
    "type": "true-false",
    "prompt": "Wind is moving air used as a natural energy resource.",
    "choices": [
      {
        "id": "true",
        "text": "True — wind is the resource"
      },
      {
        "id": "false",
        "text": "False — wind is a fossil fuel"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The guide identifies moving air."
  },
  {
    "id": "science-u08-l01-q03",
    "conceptTag": "resource-origin",
    "reviewCardId": "science-u08-l01-c1",
    "type": "multiple-choice",
    "prompt": "Which resource is held behind a dam?",
    "choices": [
      {
        "id": "a",
        "text": "Sunlight"
      },
      {
        "id": "b",
        "text": "Water"
      },
      {
        "id": "c",
        "text": "Coal"
      },
      {
        "id": "d",
        "text": "Uranium"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Dams hold water."
  },
  {
    "id": "science-u08-l01-q04",
    "conceptTag": "resource-origin",
    "reviewCardId": "science-u08-l01-c1",
    "type": "fill-blank",
    "prompt": "Coal, oil, and natural gas are ___ fuels.",
    "acceptedAnswers": [
      "fossil"
    ],
    "explanation": "They are fossil fuels."
  },
  {
    "id": "science-u08-l01-q05",
    "conceptTag": "resource-kind",
    "reviewCardId": "science-u08-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which is renewable?",
    "choices": [
      {
        "id": "a",
        "text": "Coal"
      },
      {
        "id": "b",
        "text": "Oil"
      },
      {
        "id": "c",
        "text": "Sunlight"
      },
      {
        "id": "d",
        "text": "Uranium"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Sunlight is replenished continuously."
  },
  {
    "id": "science-u08-l01-q06",
    "conceptTag": "resource-kind",
    "reviewCardId": "science-u08-l01-c2",
    "type": "true-false",
    "prompt": "Source B: fossil and nuclear fuels are nonrenewable and use limited Earth materials. Nuclear fuels are classified as nonrenewable in the source.",
    "choices": [
      {
        "id": "true",
        "text": "True — their mined supply is limited"
      },
      {
        "id": "false",
        "text": "False — they are listed with wind"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The standard names nuclear fuels as nonrenewable."
  },
  {
    "id": "science-u08-l01-q07",
    "conceptTag": "resource-kind",
    "reviewCardId": "science-u08-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which pair is nonrenewable?",
    "choices": [
      {
        "id": "a",
        "text": "Wind and sunlight"
      },
      {
        "id": "b",
        "text": "Sunlight and water"
      },
      {
        "id": "c",
        "text": "Wind and water"
      },
      {
        "id": "d",
        "text": "Coal and uranium"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Coal is fossil fuel and uranium nuclear fuel."
  },
  {
    "id": "science-u08-l01-q08",
    "conceptTag": "resource-kind",
    "reviewCardId": "science-u08-l01-c2",
    "type": "multiple-choice",
    "prompt": "Sorter setup: sunlight is labeled renewable and coal nonrenewable. What does the sorter do?",
    "choices": [
      {
        "id": "a",
        "text": "Represents authored categories for sunlight and coal"
      },
      {
        "id": "b",
        "text": "Measures resource supplies"
      },
      {
        "id": "c",
        "text": "Observes mining"
      },
      {
        "id": "d",
        "text": "Proves environmental effects"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It is a classification model."
  },
  {
    "id": "science-u08-l01-q09",
    "conceptTag": "resource-information",
    "reviewCardId": "science-u08-l01-c3",
    "type": "multiple-choice",
    "prompt": "Source A: wind, sunlight, and dammed water are renewable. Source B: fossil and nuclear fuels are nonrenewable and use limited Earth materials. Which sentence combines both sources?",
    "choices": [
      {
        "id": "a",
        "text": "Only Source A matters"
      },
      {
        "id": "b",
        "text": "Wind, sunlight, and dammed water are renewable; fossil and nuclear fuels are nonrenewable"
      },
      {
        "id": "c",
        "text": "Every resource is renewable"
      },
      {
        "id": "d",
        "text": "Every resource has the same origin"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It includes both lists accurately."
  },
  {
    "id": "science-u08-l01-q10",
    "conceptTag": "resource-information",
    "reviewCardId": "science-u08-l01-c3",
    "type": "true-false",
    "prompt": "Combining sources means using relevant information from each.",
    "choices": [
      {
        "id": "true",
        "text": "True — both contribute to the description"
      },
      {
        "id": "false",
        "text": "False — copy only one source"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The combined statement uses A and B."
  },
  {
    "id": "science-u08-l01-q11",
    "conceptTag": "resource-information",
    "reviewCardId": "science-u08-l01-c3",
    "type": "multiple-choice",
    "prompt": "Source B: fossil and nuclear fuels are nonrenewable and use limited Earth materials. Which information comes from Source B?",
    "choices": [
      {
        "id": "a",
        "text": "Wind is moving air"
      },
      {
        "id": "b",
        "text": "Sunlight comes from the Sun"
      },
      {
        "id": "c",
        "text": "Fossil and nuclear fuels use limited Earth materials"
      },
      {
        "id": "d",
        "text": "Water can be stored behind dams"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "That is Source B’s statement."
  },
  {
    "id": "science-u08-l01-q12",
    "conceptTag": "resource-information",
    "reviewCardId": "science-u08-l01-c3",
    "type": "multiple-choice",
    "prompt": "Source A: wind, sunlight, and dammed water are renewable. Source B: fossil and nuclear fuels are nonrenewable and use limited Earth materials. Which claim is unsupported?",
    "choices": [
      {
        "id": "a",
        "text": "Sunlight is renewable"
      },
      {
        "id": "b",
        "text": "Coal is nonrenewable"
      },
      {
        "id": "c",
        "text": "Uranium is a nuclear fuel"
      },
      {
        "id": "d",
        "text": "All resource uses have identical effects"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The sources do not say effects are identical."
  },
  {
    "id": "science-u08-l01-q13",
    "conceptTag": "resource-information",
    "reviewCardId": "science-u08-l01-c3",
    "type": "fill-blank",
    "prompt": "Wind, sunlight, and dammed water are ___ resources.",
    "acceptedAnswers": [
      "renewable"
    ],
    "explanation": "Source A classifies these as renewable."
  }
];

const scienceU08L01Lesson: Lesson = {
  ...scienceU08L01Core,
  quiz: { passThreshold: 8, pool: scienceU08L01Questions },
};

const scienceU08L02Core = {
  "id": "science-u08-l02",
  "unitId": "science-u08",
  "title": "Explain Environmental Effects of Resource Use",
  "indicatorCodes": [
    "4-ESS3-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "An information packet compares electricity from wind, dammed water, sunlight, and fuels."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Every choice can have benefits and environmental effects that depend on location and use."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will connect resources to uses, describe effects, and compare evidence without turning the lesson into a vote."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s weigh the supplied information carefully!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u08-l02-c1",
      "title": "Connect a resource to its use",
      "blocks": [
        {
          "kind": "text",
          "text": "Wind turbines, dams, and solar panels can help produce electricity. Fossil fuels may be burned for electricity or transportation; nuclear fuels can produce electricity at a plant. Conservation means using less electricity for the same need."
        },
        {
          "kind": "example",
          "text": "The sorter classifies wind, oil, and using less electricity; it does not measure their effects."
        },
        {
          "kind": "tip",
          "text": "Support: Match each resource or action to electricity, transportation, or conservation before comparing effects."
        }
      ],
      "widget": {
        "type": "resource-sorter",
        "config": {
          "items": [
            {
              "id": "wind",
              "label": "Wind",
              "kind": "renewable",
              "lessonCategory": "renewable source"
            },
            {
              "id": "oil",
              "label": "Oil",
              "kind": "nonrenewable",
              "lessonCategory": "fossil fuel"
            },
            {
              "id": "save",
              "label": "Use less electricity",
              "kind": "conserve",
              "lessonCategory": "conservation action"
            }
          ],
          "bins": [
            "renewable",
            "nonrenewable",
            "conserve"
          ],
          "lessonCategory": "resource use and environmental effect",
          "effectChoices": [
            { "id": "wildlife", "text": "Can affect flying wildlife" },
            { "id": "air-pollution", "text": "Can release air pollution when burned" },
            { "id": "demand", "text": "Lowers electricity demand for the same need" }
          ],
          "effectAnswers": { "wind": "wildlife", "oil": "air-pollution", "save": "demand" }
        }
      },
      "widgetCoach": {
          "intro": [
            { "speaker": "guide", "pose": "talk", "text": "Sort each resource or action, then connect it to the environmental effect in the lesson packet." },
            { "speaker": "kid", "text": "I’ll revise my category or effect connection when the packet gives me a better reason." }
          ],
          "reactions": {
            "strategy": { "pose": "think", "text": "Name the resource or action first, then connect one visible packet effect to it." },
            "retry": { "pose": "oops", "text": "Use the packet facts: wind may affect wildlife, oil burning can pollute air, and conservation lowers demand." },
            "milestone": { "pose": "talk", "text": "The categories are set. Connect each choice to the effect the lesson actually names." },
            "complete": { "pose": "cheer", "text": "You connected resource use to a specific environmental effect without claiming zero impact." }
          }
        }
    },
    {
      "id": "science-u08-l02-c2",
      "title": "Describe an environmental effect",
      "blocks": [
        {
          "kind": "text",
          "text": "Packet facts: wind turbines produce electricity without burning fuel at the turbine but can affect flying wildlife; dams provide controllable water-powered electricity but change river flow and habitat; solar panels produce electricity from sunlight but require space and materials; burning fossil fuels releases air pollution; fuel extraction can disturb land or water; nuclear plants produce electricity without burning fossil fuel but require mined fuel and careful waste management."
        },
        {
          "kind": "example",
          "text": "An environmental effect is a change to air, water, land, or living things linked to a resource use."
        },
        {
          "kind": "tip",
          "text": "Response frame: Using ____ can benefit ____ and can affect ____ by ____."
        }
      ]
    },
    {
      "id": "science-u08-l02-c3",
      "title": "Compare choices using evidence",
      "blocks": [
        {
          "kind": "text",
          "text": "A fair comparison names the same goal, then cites a benefit and effect for each option. It does not claim one option has no impact."
        },
        {
          "kind": "example",
          "text": "For electricity, wind avoids burning fuel at the turbine but may affect flying wildlife; dammed water is controllable but changes river habitat."
        },
        {
          "kind": "tip",
          "text": "Stretch: Compare two options for the same goal with two packet facts each, and explain what local information would still be needed."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Explain Environmental Effects of Resource Use",
    "steps": [
      "Choose the common goal of producing electricity.",
      "For wind, cite no fuel burning at the turbine and possible effects on flying wildlife.",
      "For dammed water, cite controllable output and changed river flow/habitat.",
      "Conclude that both have benefits and effects; local wildlife, river, land, and energy needs would matter for a decision."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;


const scienceU08L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u08-l02-q01",
    "conceptTag": "resource-use",
    "reviewCardId": "science-u08-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which resource can power turbines to produce electricity?",
    "choices": [
      {
        "id": "a",
        "text": "Wind"
      },
      {
        "id": "b",
        "text": "A conservation label"
      },
      {
        "id": "c",
        "text": "Coal color"
      },
      {
        "id": "d",
        "text": "A map key"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Wind turns turbines."
  },
  {
    "id": "science-u08-l02-q02",
    "conceptTag": "resource-use",
    "reviewCardId": "science-u08-l02-c1",
    "type": "true-false",
    "prompt": "Using less electricity is a conservation action.",
    "choices": [
      {
        "id": "true",
        "text": "True — it reduces use for the same need"
      },
      {
        "id": "false",
        "text": "False — it is a fuel"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The sorter includes conservation."
  },
  {
    "id": "science-u08-l02-q03",
    "conceptTag": "resource-use",
    "reviewCardId": "science-u08-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which resource commonly fuels transportation?",
    "choices": [
      {
        "id": "a",
        "text": "Sunlight directly in every vehicle"
      },
      {
        "id": "b",
        "text": "Oil"
      },
      {
        "id": "c",
        "text": "A dam"
      },
      {
        "id": "d",
        "text": "Wind alone"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Oil is a fossil fuel used for transportation."
  },
  {
    "id": "science-u08-l02-q04",
    "conceptTag": "resource-use",
    "reviewCardId": "science-u08-l02-c1",
    "type": "fill-blank",
    "prompt": "Using less electricity for the same need is called ___.",
    "acceptedAnswers": [
      "conservation",
      "conserving"
    ],
    "explanation": "Conservation reduces resource use."
  },
  {
    "id": "science-u08-l02-q05",
    "conceptTag": "resource-environment-effect",
    "reviewCardId": "science-u08-l02-c2",
    "type": "multiple-choice",
    "prompt": "Packet fact: burning fossil fuels releases air pollution. Which effect is linked to burning fossil fuels in the packet?",
    "choices": [
      {
        "id": "a",
        "text": "No environmental change"
      },
      {
        "id": "b",
        "text": "Only brighter labels"
      },
      {
        "id": "c",
        "text": "Air pollution"
      },
      {
        "id": "d",
        "text": "More river flow"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Burning releases pollution."
  },
  {
    "id": "science-u08-l02-q06",
    "conceptTag": "resource-environment-effect",
    "reviewCardId": "science-u08-l02-c2",
    "type": "true-false",
    "prompt": "Dams can change river flow and habitat.",
    "choices": [
      {
        "id": "true",
        "text": "True — that is a supplied effect"
      },
      {
        "id": "false",
        "text": "False — dams never affect rivers"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The packet names the change."
  },
  {
    "id": "science-u08-l02-q07",
    "conceptTag": "resource-environment-effect",
    "reviewCardId": "science-u08-l02-c2",
    "type": "multiple-choice",
    "prompt": "Packet fact: wind turbines produce electricity without burning fuel at the turbine but may affect flying wildlife. Which statement about wind is accurate?",
    "choices": [
      {
        "id": "a",
        "text": "It requires burning coal at each turbine"
      },
      {
        "id": "b",
        "text": "It has no possible effect"
      },
      {
        "id": "c",
        "text": "It is a nuclear fuel"
      },
      {
        "id": "d",
        "text": "It produces electricity without burning fuel at the turbine but may affect flying wildlife"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It includes both benefit and effect."
  },
  {
    "id": "science-u08-l02-q08",
    "conceptTag": "resource-environment-effect",
    "reviewCardId": "science-u08-l02-c2",
    "type": "multiple-choice",
    "prompt": "Packet fact: solar panels produce electricity from sunlight but require space and materials. What is one solar-panel consideration?",
    "choices": [
      {
        "id": "a",
        "text": "Panels require space and materials"
      },
      {
        "id": "b",
        "text": "Panels are fossil fuels"
      },
      {
        "id": "c",
        "text": "Panels always damage rivers"
      },
      {
        "id": "d",
        "text": "Panels remove all impacts"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The packet names land/material needs."
  },
  {
    "id": "science-u08-l02-q09",
    "conceptTag": "resource-choice-comparison",
    "reviewCardId": "science-u08-l02-c3",
    "type": "multiple-choice",
    "prompt": "Packet facts: wind avoids fuel burning at the turbine but may affect wildlife; dams provide controllable electricity but change river habitat. Which comparison is balanced?",
    "choices": [
      {
        "id": "a",
        "text": "Wind is perfect and dams are harmful"
      },
      {
        "id": "b",
        "text": "Wind avoids turbine fuel burning but may affect wildlife; dams are controllable but change river habitat"
      },
      {
        "id": "c",
        "text": "All options have identical effects"
      },
      {
        "id": "d",
        "text": "Only cost matters"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It cites benefit and effect for both."
  },
  {
    "id": "science-u08-l02-q10",
    "conceptTag": "resource-choice-comparison",
    "reviewCardId": "science-u08-l02-c3",
    "type": "true-false",
    "prompt": "A strong comparison can acknowledge uncertainty and local conditions.",
    "choices": [
      {
        "id": "true",
        "text": "True — effects depend on setting and use"
      },
      {
        "id": "false",
        "text": "False — one answer fits every place"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Local evidence matters."
  },
  {
    "id": "science-u08-l02-q11",
    "conceptTag": "resource-choice-comparison",
    "reviewCardId": "science-u08-l02-c3",
    "type": "multiple-choice",
    "prompt": "Packet: wind may affect wildlife; dams change river habitat; solar needs space and materials; fossil-fuel burning pollutes air; local conditions vary. Which information is still useful for a local decision?",
    "choices": [
      {
        "id": "a",
        "text": "The designer’s favorite color"
      },
      {
        "id": "b",
        "text": "The number of words in the packet"
      },
      {
        "id": "c",
        "text": "Local wildlife, river, land, and energy needs"
      },
      {
        "id": "d",
        "text": "A promise of no impacts"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Those conditions affect fit."
  },
  {
    "id": "science-u08-l02-q12",
    "conceptTag": "resource-choice-comparison",
    "reviewCardId": "science-u08-l02-c3",
    "type": "multiple-choice",
    "prompt": "Packet: wind may affect wildlife; dams change river habitat; solar needs space and materials; fossil-fuel burning pollutes air; local conditions vary. Which claim goes beyond the packet?",
    "choices": [
      {
        "id": "a",
        "text": "Fossil-fuel burning affects air"
      },
      {
        "id": "b",
        "text": "Dams alter river habitat"
      },
      {
        "id": "c",
        "text": "Wind may affect flying wildlife"
      },
      {
        "id": "d",
        "text": "One resource is always best everywhere"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The evidence does not support a universal choice."
  },
  {
    "id": "science-u08-l02-q13",
    "conceptTag": "resource-choice-comparison",
    "reviewCardId": "science-u08-l02-c3",
    "type": "fill-blank",
    "prompt": "A comparison should include a benefit and an environmental ___.",
    "acceptedAnswers": [
      "effect",
      "impact"
    ],
    "explanation": "Both sides are required."
  }
];

const scienceU08L02Lesson: Lesson = {
  ...scienceU08L02Core,
  quiz: { passThreshold: 8, pool: scienceU08L02Questions },
};

const scienceU08L03Core = {
  "id": "science-u08-l03",
  "unitId": "science-u08",
  "title": "Describe Natural-Process Hazards",
  "indicatorCodes": [
    "4-ESS3-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Earth processes can create hazards that affect people and communities."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "This lesson uses earthquakes, floods, hurricanes, tornadoes, and coastal erosion only."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will connect each process to an impact and match a practical solution to that impact."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s plan calmly: solutions reduce impact but never promise perfect safety."
    }
  ],
  "learnCards": [
    {
      "id": "science-u08-l03-c1",
      "title": "Connect a process to a hazard",
      "blocks": [
        {
          "kind": "text",
          "text": "Ground shaking creates earthquake hazards; overflowing water creates floods; powerful tropical storms create hurricane hazards; rotating storm columns create tornado hazards; waves and currents removing shoreline material create coastal erosion."
        },
        {
          "kind": "example",
          "text": "Name the process and hazard without frightening imagery or adding hazards outside the assessed set."
        },
        {
          "kind": "tip",
          "text": "Support: Match one process phrase to one of the five hazard names before reading impacts."
        }
      ]
    },
    {
      "id": "science-u08-l03-c2",
      "title": "Identify impacts on people",
      "blocks": [
        {
          "kind": "text",
          "text": "Possible impacts include damaged buildings and roads, water entering homes, wind damaging windows or roofs, warning time needed for shelter, and shoreline loss threatening paths or buildings."
        },
        {
          "kind": "example",
          "text": "An impact is the harm or disruption to reduce. It guides which solution fits."
        },
        {
          "kind": "tip",
          "text": "Response frame: The ____ hazard can affect people by ____."
        }
      ]
    },
    {
      "id": "science-u08-l03-c3",
      "title": "Match a solution to an impact",
      "blocks": [
        {
          "kind": "text",
          "text": "Storm shutters reduce window damage from hurricane winds; early warnings give people time to follow official plans. Neither removes all hurricane risk."
        },
        {
          "kind": "example",
          "text": "The activity pairs these protections and rejects ignoring forecasts. It is a simplified planning model, not emergency advice."
        },
        {
          "kind": "tip",
          "text": "Stretch: Match two different solutions to two different impacts and explain each limit."
        }
      ],
      "widget": {
        "type": "hazard-solution-designer",
        "config": {
          "hazard": "Hurricane",
          "solutions": [
            {
              "id": "shutters",
              "label": "Storm shutters",
              "effectiveness": "good",
              "strengths": ["Reduce window damage from hurricane winds"],
              "impacts": ["window damage"],
              "limits": ["Cannot stop all wind or protect every part of a building"]
            },
            {
              "id": "warnings",
              "label": "Early warnings",
              "effectiveness": "good",
              "strengths": ["Give people time to follow official plans"],
              "impacts": ["limited preparation time"],
              "limits": ["Do not physically stop wind or remove all risk"]
            },
            {
              "id": "ignore",
              "label": "Ignore forecasts",
              "effectiveness": "poor",
              "strengths": ["Adds no protection"],
              "impacts": ["no impact reduced"],
              "limits": ["Leaves people and buildings exposed"]
            }
          ],
          "requiredIds": [
            "shutters",
            "warnings"
          ],
          "requiredImpactIds": ["window damage", "limited preparation time"]
        }
      },
      "widgetCoach": {
          "intro": [
            { "speaker": "guide", "pose": "talk", "text": "Choose a protection for each hurricane impact, then inspect its strength and limit." },
            { "speaker": "kid", "text": "I’ll connect the plan to impacts instead of hunting for a secret answer set." }
          ],
          "reactions": {
            "strategy": { "pose": "think", "text": "Name the impact first: window damage and preparation time need different kinds of protection." },
            "retry": { "pose": "oops", "text": "Use each card’s visible limit and connect a selected protection to every required impact." },
            "milestone": { "pose": "talk", "text": "You covered the required impacts. Check the plan and remember that risk is reduced, not eliminated." },
            "complete": { "pose": "cheer", "text": "You justified protections by their impacts, strengths, and limits; the plan reduces risk but cannot eliminate it." }
          }
        }
    }
  ],
  "workedExample": {
    "title": "Apply: Describe Natural-Process Hazards",
    "steps": [
      "Name hurricane winds as a hazard process that can damage windows and roofs.",
      "Identify window damage and need for preparation time as two impacts.",
      "Match shutters to reducing window damage and early warnings to preparation time.",
      "Explain that the combined plan can reduce impacts but cannot guarantee safety or prevent every loss."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;


const scienceU08L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u08-l03-q01",
    "conceptTag": "hazard-cause-effect",
    "reviewCardId": "science-u08-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which process creates a flood hazard?",
    "choices": [
      {
        "id": "a",
        "text": "Water overflowing onto normally dry land"
      },
      {
        "id": "b",
        "text": "Ground shaking"
      },
      {
        "id": "c",
        "text": "A rotating storm column"
      },
      {
        "id": "d",
        "text": "Shoreline material building up only"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Overflowing water creates floods."
  },
  {
    "id": "science-u08-l03-q02",
    "conceptTag": "hazard-cause-effect",
    "reviewCardId": "science-u08-l03-c1",
    "type": "true-false",
    "prompt": "Ground shaking is connected to earthquake hazards.",
    "choices": [
      {
        "id": "true",
        "text": "True — shaking can damage structures"
      },
      {
        "id": "false",
        "text": "False — it is a hurricane process"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Earthquakes involve ground shaking."
  },
  {
    "id": "science-u08-l03-q03",
    "conceptTag": "hazard-cause-effect",
    "reviewCardId": "science-u08-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which hazard involves a rotating storm column?",
    "choices": [
      {
        "id": "a",
        "text": "Flood"
      },
      {
        "id": "b",
        "text": "Tornado"
      },
      {
        "id": "c",
        "text": "Coastal erosion"
      },
      {
        "id": "d",
        "text": "Earthquake"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "That describes a tornado."
  },
  {
    "id": "science-u08-l03-q04",
    "conceptTag": "hazard-cause-effect",
    "reviewCardId": "science-u08-l03-c1",
    "type": "fill-blank",
    "prompt": "Waves and currents removing shoreline material cause coastal ___.",
    "acceptedAnswers": [
      "erosion"
    ],
    "explanation": "The named hazard is coastal erosion."
  },
  {
    "id": "science-u08-l03-q05",
    "conceptTag": "hazard-human-impact",
    "reviewCardId": "science-u08-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which is a possible hurricane impact?",
    "choices": [
      {
        "id": "a",
        "text": "A map gains a title"
      },
      {
        "id": "b",
        "text": "The Sun stops shining"
      },
      {
        "id": "c",
        "text": "Wind damages windows or roofs"
      },
      {
        "id": "d",
        "text": "Every road improves"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Wind damage is a human impact."
  },
  {
    "id": "science-u08-l03-q06",
    "conceptTag": "hazard-human-impact",
    "reviewCardId": "science-u08-l03-c2",
    "type": "true-false",
    "prompt": "A hazard impact can be harm to buildings, roads, or access.",
    "choices": [
      {
        "id": "true",
        "text": "True — these affect communities"
      },
      {
        "id": "false",
        "text": "False — hazards cannot affect structures"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The card lists these impacts."
  },
  {
    "id": "science-u08-l03-q07",
    "conceptTag": "hazard-human-impact",
    "reviewCardId": "science-u08-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which impact fits a flood?",
    "choices": [
      {
        "id": "a",
        "text": "Only ground shaking"
      },
      {
        "id": "b",
        "text": "Only a broken code"
      },
      {
        "id": "c",
        "text": "A longer wavelength"
      },
      {
        "id": "d",
        "text": "Water entering homes and roads"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Floodwater can enter built areas."
  },
  {
    "id": "science-u08-l03-q08",
    "conceptTag": "hazard-human-impact",
    "reviewCardId": "science-u08-l03-c2",
    "type": "multiple-choice",
    "prompt": "Why identify the specific impact?",
    "choices": [
      {
        "id": "a",
        "text": "It helps choose a solution that addresses the need"
      },
      {
        "id": "b",
        "text": "It guarantees safety"
      },
      {
        "id": "c",
        "text": "It replaces evidence"
      },
      {
        "id": "d",
        "text": "It changes the hazard"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Solution fit depends on impact."
  },
  {
    "id": "science-u08-l03-q09",
    "conceptTag": "hazard-impact-solution",
    "reviewCardId": "science-u08-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which solution addresses hurricane window damage?",
    "choices": [
      {
        "id": "a",
        "text": "Ignore forecasts"
      },
      {
        "id": "b",
        "text": "Storm shutters"
      },
      {
        "id": "c",
        "text": "Block every drain"
      },
      {
        "id": "d",
        "text": "Remove map keys"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Shutters protect windows."
  },
  {
    "id": "science-u08-l03-q10",
    "conceptTag": "hazard-impact-solution",
    "reviewCardId": "science-u08-l03-c3",
    "type": "true-false",
    "prompt": "Early warnings can give people time to follow official plans.",
    "choices": [
      {
        "id": "true",
        "text": "True — warning time supports preparation"
      },
      {
        "id": "false",
        "text": "False — warnings cause storms"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Warnings address preparation time."
  },
  {
    "id": "science-u08-l03-q11",
    "conceptTag": "hazard-impact-solution",
    "reviewCardId": "science-u08-l03-c3",
    "type": "multiple-choice",
    "prompt": "Plan facts: storm shutters reduce hurricane window damage; early warnings add preparation time; neither removes all risk. Which pair forms the authored hurricane plan?",
    "choices": [
      {
        "id": "a",
        "text": "Ignore forecasts and open windows"
      },
      {
        "id": "b",
        "text": "Shutters only with a safety guarantee"
      },
      {
        "id": "c",
        "text": "Storm shutters and early warnings"
      },
      {
        "id": "d",
        "text": "Block drains and ignore warnings"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The two solutions address different impacts."
  },
  {
    "id": "science-u08-l03-q12",
    "conceptTag": "hazard-impact-solution",
    "reviewCardId": "science-u08-l03-c3",
    "type": "multiple-choice",
    "prompt": "Plan facts: storm shutters reduce hurricane window damage; early warnings add preparation time; neither removes all risk. Which statement is accurate?",
    "choices": [
      {
        "id": "a",
        "text": "Shutters prevent every hurricane effect"
      },
      {
        "id": "b",
        "text": "Warnings stop wind"
      },
      {
        "id": "c",
        "text": "The model is emergency advice"
      },
      {
        "id": "d",
        "text": "The solutions can reduce impacts but do not eliminate risk"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Mitigation is limited."
  },
  {
    "id": "science-u08-l03-q13",
    "conceptTag": "hazard-impact-solution",
    "reviewCardId": "science-u08-l03-c3",
    "type": "fill-blank",
    "prompt": "A solution should match the named hazard ___.",
    "acceptedAnswers": [
      "impact"
    ],
    "explanation": "Impact-solution fit guides design."
  }
];

const scienceU08L03Lesson: Lesson = {
  ...scienceU08L03Core,
  quiz: { passThreshold: 8, pool: scienceU08L03Questions },
};

const scienceU08L04Core = {
  "id": "science-u08-l04",
  "unitId": "science-u08",
  "title": "Compare Hazard-Impact Solutions",
  "indicatorCodes": [
    "4-ESS3-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A riverside community compares ways to reduce flood impacts on homes, roads, and preparation time."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "A floodwater channel and an early warning address different parts of the problem."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will define criteria, compare strengths and limits, and justify a combined plan."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s choose solutions with evidence and honest limits!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u08-l04-c1",
      "title": "Define criteria for a solution",
      "blocks": [
        {
          "kind": "text",
          "text": "Effectiveness asks how well a solution addresses the named impact. Feasibility asks whether it can be built, maintained, or used. Coverage asks which people or places it helps."
        },
        {
          "kind": "example",
          "text": "For this scenario, criteria are reducing water near roads/homes, providing warning time, fitting available land, and remaining maintainable."
        },
        {
          "kind": "tip",
          "text": "Support: Write the impact first, then choose one effectiveness, feasibility, or coverage criterion."
        }
      ]
    },
    {
      "id": "science-u08-l04-c2",
      "title": "Compare strengths and limits",
      "blocks": [
        {
          "kind": "text",
          "text": "A floodwater channel can redirect some water away from built areas but needs land and maintenance. A flood warning can reach many people quickly but does not physically stop water. Blocking every drain is poor because it can trap water."
        },
        {
          "kind": "example",
          "text": "The activity identifies channel plus warning as the authored combination; it does not promise that the plan removes flood risk."
        },
        {
          "kind": "tip",
          "text": "Response frame: ____ helps by ____, but its limit is ____."
        }
      ],
      "widget": {
        "type": "hazard-solution-designer",
        "config": {
          "hazard": "Flood",
          "solutions": [
            {
              "id": "waterway",
              "label": "Floodwater channel",
              "effectiveness": "good",
              "strengths": ["Redirects some water away from built areas"],
              "impacts": ["water near roads and homes"],
              "limits": ["Needs land and maintenance"]
            },
            {
              "id": "warning",
              "label": "Flood warning",
              "effectiveness": "good",
              "strengths": ["Provides preparation time"],
              "impacts": ["limited preparation time"],
              "limits": ["Does not physically stop water"]
            },
            {
              "id": "block",
              "label": "Block every drain",
              "effectiveness": "poor",
              "strengths": ["Adds no useful flood protection"],
              "impacts": ["no impact reduced"],
              "limits": ["Can trap water and worsen flooding"]
            }
          ],
          "requiredIds": [
            "waterway",
            "warning"
          ],
          "requiredImpactIds": ["water near roads and homes", "limited preparation time"]
        }
      },
      "widgetCoach": {
          "intro": [
            { "speaker": "guide", "pose": "talk", "text": "Compare each flood option by the impact it addresses, its strength, and its limit." },
            { "speaker": "kid", "text": "I’ll build a plan that covers the impacts without pretending any choice removes all risk." }
          ],
          "reactions": {
            "strategy": { "pose": "think", "text": "Start with the impact: water near homes needs a physical channel, while preparation time needs a warning." },
            "retry": { "pose": "oops", "text": "Read the limits on the cards and connect selected protections to both required impacts." },
            "milestone": { "pose": "talk", "text": "Both impacts are connected. Check the strengths and limits before you finish the plan." },
            "complete": { "pose": "cheer", "text": "You justified a combined flood plan with visible strengths and limits; it reduces risk, not eliminates it." }
          }
        }
    },
    {
      "id": "science-u08-l04-c3",
      "title": "Justify a combined plan",
      "blocks": [
        {
          "kind": "text",
          "text": "A combined plan is justified when its parts address different impacts and their limits are acknowledged."
        },
        {
          "kind": "example",
          "text": "Use the channel to redirect some floodwater and the warning to provide preparation time. Maintain drains rather than blocking them."
        },
        {
          "kind": "tip",
          "text": "Stretch: Cite one strength and one limit for each chosen solution, then explain why the combination still cannot guarantee safety."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Compare Hazard-Impact Solutions",
    "steps": [
      "Define the impacts: water near roads/homes and limited preparation time.",
      "Compare channel strength/land-maintenance limit and warning strength/no-water-blocking limit.",
      "Choose channel plus warning because they address physical water movement and information needs.",
      "State that maintained drainage and official planning remain important and the combination reduces, not eliminates, flood impact."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;


const scienceU08L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u08-l04-q01",
    "conceptTag": "hazard-solution-criteria",
    "reviewCardId": "science-u08-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which criterion asks how well a solution addresses an impact?",
    "choices": [
      {
        "id": "a",
        "text": "Effectiveness"
      },
      {
        "id": "b",
        "text": "Decoration"
      },
      {
        "id": "c",
        "text": "Popularity"
      },
      {
        "id": "d",
        "text": "Length of its name"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Effectiveness concerns impact reduction."
  },
  {
    "id": "science-u08-l04-q02",
    "conceptTag": "hazard-solution-criteria",
    "reviewCardId": "science-u08-l04-c1",
    "type": "true-false",
    "prompt": "Feasibility can include land and maintenance needs.",
    "choices": [
      {
        "id": "true",
        "text": "True — those affect whether a solution can work"
      },
      {
        "id": "false",
        "text": "False — feasibility means color"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The scenario names both constraints."
  },
  {
    "id": "science-u08-l04-q03",
    "conceptTag": "hazard-solution-criteria",
    "reviewCardId": "science-u08-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which is a coverage question?",
    "choices": [
      {
        "id": "a",
        "text": "Is the label blue?"
      },
      {
        "id": "b",
        "text": "Which people or places can the warning reach?"
      },
      {
        "id": "c",
        "text": "Does the river have a name?"
      },
      {
        "id": "d",
        "text": "Is the solution someone’s favorite?"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Coverage concerns who or what benefits."
  },
  {
    "id": "science-u08-l04-q04",
    "conceptTag": "hazard-solution-criteria",
    "reviewCardId": "science-u08-l04-c1",
    "type": "fill-blank",
    "prompt": "The criterion about whether a plan can be built and maintained is ___.",
    "acceptedAnswers": [
      "feasibility"
    ],
    "explanation": "Feasibility concerns practical fit."
  },
  {
    "id": "science-u08-l04-q05",
    "conceptTag": "hazard-solution-comparison",
    "reviewCardId": "science-u08-l04-c2",
    "type": "multiple-choice",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. What is a strength of a floodwater channel?",
    "choices": [
      {
        "id": "a",
        "text": "It guarantees no flood"
      },
      {
        "id": "b",
        "text": "It sends warnings"
      },
      {
        "id": "c",
        "text": "It can redirect some water away from built areas"
      },
      {
        "id": "d",
        "text": "It blocks every drain"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Redirecting water addresses a physical impact."
  },
  {
    "id": "science-u08-l04-q06",
    "conceptTag": "hazard-solution-comparison",
    "reviewCardId": "science-u08-l04-c2",
    "type": "true-false",
    "prompt": "A flood warning physically stops water from rising.",
    "choices": [
      {
        "id": "true",
        "text": "True — messages block water"
      },
      {
        "id": "false",
        "text": "False — it provides information and time"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Warning does not move water."
  },
  {
    "id": "science-u08-l04-q07",
    "conceptTag": "hazard-solution-comparison",
    "reviewCardId": "science-u08-l04-c2",
    "type": "multiple-choice",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. What is a channel limitation?",
    "choices": [
      {
        "id": "a",
        "text": "It provides no physical effect"
      },
      {
        "id": "b",
        "text": "It cannot be maintained"
      },
      {
        "id": "c",
        "text": "It always worsens floods"
      },
      {
        "id": "d",
        "text": "It needs land and maintenance"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Those are supplied constraints."
  },
  {
    "id": "science-u08-l04-q08",
    "conceptTag": "hazard-solution-comparison",
    "reviewCardId": "science-u08-l04-c2",
    "type": "multiple-choice",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. Why is blocking every drain a poor choice?",
    "choices": [
      {
        "id": "a",
        "text": "It can trap water"
      },
      {
        "id": "b",
        "text": "It provides warning time"
      },
      {
        "id": "c",
        "text": "It redirects water safely"
      },
      {
        "id": "d",
        "text": "It improves drainage"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Blocked drains can worsen pooling."
  },
  {
    "id": "science-u08-l04-q09",
    "conceptTag": "hazard-solution-justification",
    "reviewCardId": "science-u08-l04-c3",
    "type": "multiple-choice",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. Which combined plan is best supported?",
    "choices": [
      {
        "id": "a",
        "text": "Block every drain and ignore forecasts"
      },
      {
        "id": "b",
        "text": "Use a floodwater channel and an early warning"
      },
      {
        "id": "c",
        "text": "Use only a map title"
      },
      {
        "id": "d",
        "text": "Promise the flood cannot happen"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The pair addresses water movement and preparation."
  },
  {
    "id": "science-u08-l04-q10",
    "conceptTag": "hazard-solution-justification",
    "reviewCardId": "science-u08-l04-c3",
    "type": "true-false",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. The combined plan still has limits and cannot guarantee safety.",
    "choices": [
      {
        "id": "true",
        "text": "True — mitigation reduces rather than removes risk"
      },
      {
        "id": "false",
        "text": "False — two solutions eliminate all risk"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The boundary requires honest limits."
  },
  {
    "id": "science-u08-l04-q11",
    "conceptTag": "hazard-solution-justification",
    "reviewCardId": "science-u08-l04-c3",
    "type": "multiple-choice",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. Why combine channel and warning?",
    "choices": [
      {
        "id": "a",
        "text": "They have matching names"
      },
      {
        "id": "b",
        "text": "They cost nothing"
      },
      {
        "id": "c",
        "text": "They address different impacts"
      },
      {
        "id": "d",
        "text": "They prove future safety"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Complementary functions support the choice."
  },
  {
    "id": "science-u08-l04-q12",
    "conceptTag": "hazard-solution-justification",
    "reviewCardId": "science-u08-l04-c3",
    "type": "multiple-choice",
    "prompt": "Flood options: a channel redirects some water but needs land and maintenance; a warning provides preparation time but does not stop water; blocked drains can trap water. Which justification is complete?",
    "choices": [
      {
        "id": "a",
        "text": "Choose both because more is always better"
      },
      {
        "id": "b",
        "text": "Choose warning because it stops water"
      },
      {
        "id": "c",
        "text": "Choose channel because warnings have no value"
      },
      {
        "id": "d",
        "text": "Channel redirects some water and warning provides time; both have limits"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It cites strengths and limits."
  },
  {
    "id": "science-u08-l04-q13",
    "conceptTag": "hazard-solution-justification",
    "reviewCardId": "science-u08-l04-c3",
    "type": "fill-blank",
    "prompt": "Solutions can reduce flood impacts but cannot remove all ___.",
    "acceptedAnswers": [
      "risk"
    ],
    "explanation": "No plan eliminates all risk."
  }
];

const scienceU08L04Lesson: Lesson = {
  ...scienceU08L04Core,
  quiz: { passThreshold: 8, pool: scienceU08L04Questions },
};

export const unit08Lessons: Lesson[] = [
  scienceU08L01Lesson,
  scienceU08L02Lesson,
  scienceU08L03Lesson,
  scienceU08L04Lesson,
];
