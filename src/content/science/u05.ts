import type { Lesson } from '../schema';

const scienceU05L01Core = {
  "id": "science-u05-l01",
  "unitId": "science-u05",
  "title": "Trace Allowed Energy Conversions",
  "indicatorCodes": [
    "4-PS3-4"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A hand-crank generator turns and a connected buzzer makes sound."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "A useful device model names the energy form entering and leaving each component."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will trace only connected forms and stay inside the Grade 4 device boundary."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s build a chain that can work!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u05-l01-c1",
      "title": "Name input and output forms",
      "blocks": [
        {
          "kind": "text",
          "text": "Each component has an input form and an output form. A hand-crank generator receives motion and can produce electric energy; a buzzer receives electric energy and produces sound."
        },
        {
          "kind": "example",
          "text": "Write component labels as motion → hand-crank generator → electric and electric → buzzer → sound."
        },
        {
          "kind": "tip",
          "text": "Support: Underline the outgoing form of the first component and the incoming form of the next."
        }
      ]
    },
    {
      "id": "science-u05-l01-c2",
      "title": "Trace a connected conversion chain",
      "blocks": [
        {
          "kind": "text",
          "text": "A chain connects only when one component’s output form exactly matches the next component’s input form."
        },
        {
          "kind": "example",
          "text": "The hand-crank generator outputs electric energy; the buzzer receives electric energy. Therefore hand-crank generator → buzzer is connected."
        },
        {
          "kind": "tip",
          "text": "Response frame: ____ outputs ____, which matches ____ input, so the chain ____."
        }
      ],
      "widget": {
        "type": "energy-conversion-designer",
        "config": {
          "components": [
            {
              "id": "crank",
              "label": "Hand-crank generator",
              "energyIn": "motion",
              "energyOut": "electric"
            },
            {
              "id": "buzzer",
              "label": "Buzzer",
              "energyIn": "electric",
              "energyOut": "sound"
            },
            {
              "id": "lamp",
              "label": "Lamp",
              "energyIn": "electric",
              "energyOut": "light"
            },
            {
              "id": "heater",
              "label": "Heater",
              "energyIn": "electric",
              "energyOut": "heat"
            },
            {
              "id": "spring",
              "label": "Wind-up spring",
              "energyIn": "stored",
              "energyOut": "motion"
            }
          ],
          "requiredStart": "crank",
          "requiredEnd": "buzzer"
        }
      }
    },
    {
      "id": "science-u05-l01-c3",
      "title": "Stay within device limits",
      "blocks": [
        {
          "kind": "text",
          "text": "Allowed designs use motion to produce electric energy or use battery-stored energy to cause motion or produce light or sound."
        },
        {
          "kind": "example",
          "text": "A hand-crank generator connected to a buzzer, or battery-to-lamp, battery-to-motor, and battery-to-buzzer designs, fit this unit."
        },
        {
          "kind": "tip",
          "text": "Stretch: Reject one out-of-boundary design and revise it to an allowed start and output without adding a formula."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Trace Allowed Energy Conversions",
    "steps": [
      "Label the hand-crank generator input motion and output electric.",
      "Label the buzzer input electric and output sound.",
      "Connect the matching electric labels to form motion → electric → sound.",
      "Explain that the model helps plan the chain; a physical test would need separate observations."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU05L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u05-l01-q01",
    "conceptTag": "conversion-input-output",
    "reviewCardId": "science-u05-l01-c1",
    "type": "multiple-choice",
    "prompt": "What enters the hand-crank generator in this model?",
    "choices": [
      {
        "id": "a",
        "text": "Motion"
      },
      {
        "id": "b",
        "text": "Light"
      },
      {
        "id": "c",
        "text": "Sound"
      },
      {
        "id": "d",
        "text": "Heat"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The crank input is motion."
  },
  {
    "id": "science-u05-l01-q02",
    "conceptTag": "conversion-input-output",
    "reviewCardId": "science-u05-l01-c1",
    "type": "true-false",
    "prompt": "The buzzer output is sound.",
    "choices": [
      {
        "id": "true",
        "text": "True — sound is the listed output"
      },
      {
        "id": "false",
        "text": "False — the output is stored energy"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The component label gives sound."
  },
  {
    "id": "science-u05-l01-q03",
    "conceptTag": "conversion-input-output",
    "reviewCardId": "science-u05-l01-c1",
    "type": "multiple-choice",
    "prompt": "What form connects crank to buzzer?",
    "choices": [
      {
        "id": "a",
        "text": "Motion"
      },
      {
        "id": "b",
        "text": "Electric"
      },
      {
        "id": "c",
        "text": "Light"
      },
      {
        "id": "d",
        "text": "Stored"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The generator output and buzzer input are electric."
  },
  {
    "id": "science-u05-l01-q04",
    "conceptTag": "conversion-input-output",
    "reviewCardId": "science-u05-l01-c1",
    "type": "fill-blank",
    "prompt": "The buzzer changes electric energy into ___.",
    "acceptedAnswers": [
      "sound"
    ],
    "explanation": "Sound is the observable output form."
  },
  {
    "id": "science-u05-l01-q05",
    "conceptTag": "conversion-chain",
    "reviewCardId": "science-u05-l01-c2",
    "type": "multiple-choice",
    "prompt": "When can two components connect?",
    "choices": [
      {
        "id": "a",
        "text": "Their colors match"
      },
      {
        "id": "b",
        "text": "Their names rhyme"
      },
      {
        "id": "c",
        "text": "The first output matches the second input"
      },
      {
        "id": "d",
        "text": "They are drawn close together"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Compatible forms make a chain."
  },
  {
    "id": "science-u05-l01-q06",
    "conceptTag": "conversion-chain",
    "reviewCardId": "science-u05-l01-c2",
    "type": "sort",
    "prompt": "Order the conversion chain.",
    "items": [
      {
        "id": "sound",
        "text": "Buzzer produces sound"
      },
      {
        "id": "motion",
        "text": "Hand turns the generator’s crank"
      },
      {
        "id": "electric",
        "text": "Hand-crank generator produces electric energy"
      }
    ],
    "correctOrder": [
      "motion",
      "electric",
      "sound"
    ],
    "explanation": "The chain moves from motion to electric to sound."
  },
  {
    "id": "science-u05-l01-q07",
    "conceptTag": "conversion-chain",
    "reviewCardId": "science-u05-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which pair is compatible?",
    "choices": [
      {
        "id": "a",
        "text": "lamp light output to battery stored input"
      },
      {
        "id": "b",
        "text": "buzzer sound output to motor electric input"
      },
      {
        "id": "c",
        "text": "battery stored output to crank motion input"
      },
      {
        "id": "d",
        "text": "crank electric output to buzzer electric input"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Both connecting labels are electric."
  },
  {
    "id": "science-u05-l01-q08",
    "conceptTag": "conversion-chain",
    "reviewCardId": "science-u05-l01-c2",
    "type": "true-false",
    "prompt": "The on-screen chain is design thinking, not device-test evidence.",
    "choices": [
      {
        "id": "true",
        "text": "True — testing needs physical observations"
      },
      {
        "id": "false",
        "text": "False — completing it proves a device"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A model does not collect device observations."
  },
  {
    "id": "science-u05-l01-q09",
    "conceptTag": "conversion-device-boundary",
    "reviewCardId": "science-u05-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which design fits the assessed boundary?",
    "choices": [
      {
        "id": "a",
        "text": "A battery powers a small lamp"
      },
      {
        "id": "b",
        "text": "A device calculates exact energy"
      },
      {
        "id": "c",
        "text": "A device outside the named conversion set"
      },
      {
        "id": "d",
        "text": "A chemical reaction formula"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Battery-to-light is allowed."
  },
  {
    "id": "science-u05-l01-q10",
    "conceptTag": "conversion-device-boundary",
    "reviewCardId": "science-u05-l01-c3",
    "type": "true-false",
    "prompt": "A battery may be used to produce motion, light, or sound in this unit.",
    "choices": [
      {
        "id": "true",
        "text": "True — those endpoints are allowed"
      },
      {
        "id": "false",
        "text": "False — batteries are excluded"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The boundary names these endpoints."
  },
  {
    "id": "science-u05-l01-q11",
    "conceptTag": "conversion-device-boundary",
    "reviewCardId": "science-u05-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which design begins with motion and produces electric energy?",
    "choices": [
      {
        "id": "a",
        "text": "Battery to buzzer"
      },
      {
        "id": "b",
        "text": "Turn a hand-crank generator"
      },
      {
        "id": "c",
        "text": "Lamp to paper"
      },
      {
        "id": "d",
        "text": "Speaker to battery"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Turning the crank supplies motion to the attached generator, which produces electric energy."
  },
  {
    "id": "science-u05-l01-q12",
    "conceptTag": "conversion-device-boundary",
    "reviewCardId": "science-u05-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which proposal is outside this lesson’s allowed device set?",
    "choices": [
      {
        "id": "a",
        "text": "Battery to motor"
      },
      {
        "id": "b",
        "text": "Battery to lamp"
      },
      {
        "id": "c",
        "text": "A device that calculates nuclear reaction energy"
      },
      {
        "id": "d",
        "text": "Hand-crank generator to buzzer"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The calculation is not an allowed device design."
  },
  {
    "id": "science-u05-l01-q13",
    "conceptTag": "conversion-device-boundary",
    "reviewCardId": "science-u05-l01-c3",
    "type": "multiple-choice",
    "prompt": "On-screen model: a hand-crank generator connects to a buzzer to trace motion → electric → sound. Which statement accurately describes what this model contributes?",
    "choices": [
      {
        "id": "a",
        "text": "The activity physically tested a buzzer"
      },
      {
        "id": "b",
        "text": "An energy label supplied a physical observation"
      },
      {
        "id": "c",
        "text": "Every device is allowed"
      },
      {
        "id": "d",
        "text": "The model traces an allowed chain but supplies no test observation"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It states both scope and model limit."
  }
];

const scienceU05L01Lesson: Lesson = {
  ...scienceU05L01Core,
  quiz: { passThreshold: 8, pool: scienceU05L01Questions },
};

const scienceU05L02Core = {
  "id": "science-u05-l02",
  "unitId": "science-u05",
  "title": "Plan a Device with Constraints",
  "indicatorCodes": [
    "4-PS3-4"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A reading-light prototype must use a battery to make a small lamp shine."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "The team has a covered battery holder, prewired lamp, switch, two wires, ten minutes, and a cost limit of eight classroom tokens."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will turn the need and constraints into a testable plan."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s make a plan another builder can follow safely!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u05-l02-c1",
      "title": "Define the device goal",
      "blocks": [
        {
          "kind": "text",
          "text": "A design goal names the energy start, desired observable output, and success criterion."
        },
        {
          "kind": "example",
          "text": "Goal: stored energy in the battery produces light; success means the lamp stays visibly lit for ten seconds after the switch closes."
        },
        {
          "kind": "tip",
          "text": "Support: Complete Goal = start ____; output ____; success when ____."
        }
      ]
    },
    {
      "id": "science-u05-l02-c2",
      "title": "Choose materials under constraints",
      "blocks": [
        {
          "kind": "text",
          "text": "Constraints limit materials, cost, and time. Choose only parts that support the conversion and fit every limit."
        },
        {
          "kind": "example",
          "text": "Available: covered holder 3 tokens, prewired lamp 3, switch 1, two wires 1; total 8 tokens and assembly within ten minutes under adult supervision."
        },
        {
          "kind": "tip",
          "text": "Response frame: I choose ____ because it supports ____ and keeps the plan within ____ tokens/minutes."
        }
      ],
      "widget": {
        "type": "energy-conversion-designer",
        "config": {
          "components": [
            {
              "id": "battery",
              "label": "Battery",
              "energyIn": "stored",
              "energyOut": "electric"
            },
            {
              "id": "lamp",
              "label": "Lamp",
              "energyIn": "electric",
              "energyOut": "light"
            },
            {
              "id": "buzzer",
              "label": "Buzzer",
              "energyIn": "electric",
              "energyOut": "sound"
            },
            {
              "id": "motor",
              "label": "Motor",
              "energyIn": "electric",
              "energyOut": "motion"
            },
            {
              "id": "windup",
              "label": "Wind-up spring",
              "energyIn": "stored",
              "energyOut": "motion"
            }
          ],
          "requiredStart": "battery",
          "requiredEnd": "lamp"
        }
      }
    },
    {
      "id": "science-u05-l02-c3",
      "title": "Draw a testable plan",
      "blocks": [
        {
          "kind": "text",
          "text": "A testable plan shows component order, safe connection steps, what stays the same, and the exact observation used to judge success."
        },
        {
          "kind": "example",
          "text": "Diagram battery holder → switch → prewired lamp → holder. Adult checks connections; tester closes the switch and observes whether the lamp remains lit for ten seconds."
        },
        {
          "kind": "tip",
          "text": "Stretch: Add a labeled fallback that changes no success criterion: reopen the switch, inspect one connection, and retest."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Plan a Device with Constraints",
    "steps": [
      "State the battery-to-light goal and ten-second visible-light criterion.",
      "Select holder, prewired lamp, switch, and two wires for exactly eight tokens and ten minutes.",
      "Draw the closed path and have an adult inspect the low-voltage setup.",
      "Test by closing the switch once and recording whether the lamp remains visibly lit for ten seconds."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU05L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u05-l02-q01",
    "conceptTag": "device-goal",
    "reviewCardId": "science-u05-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which goal is testable?",
    "choices": [
      {
        "id": "a",
        "text": "A battery-powered lamp stays visibly lit for ten seconds"
      },
      {
        "id": "b",
        "text": "Build the coolest device"
      },
      {
        "id": "c",
        "text": "Display an energy label"
      },
      {
        "id": "d",
        "text": "Use every material"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It names input, output, and observable criterion."
  },
  {
    "id": "science-u05-l02-q02",
    "conceptTag": "device-goal",
    "reviewCardId": "science-u05-l02-c1",
    "type": "true-false",
    "prompt": "A success criterion should be observable.",
    "choices": [
      {
        "id": "true",
        "text": "True — it tells how to judge the device"
      },
      {
        "id": "false",
        "text": "False — success should be a preference"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Visible light for a stated time is observable."
  },
  {
    "id": "science-u05-l02-q03",
    "conceptTag": "device-goal",
    "reviewCardId": "science-u05-l02-c1",
    "type": "multiple-choice",
    "prompt": "Goal: use battery-stored energy to light a reading space for at least 10 seconds. What is the desired output?",
    "choices": [
      {
        "id": "a",
        "text": "Motion"
      },
      {
        "id": "b",
        "text": "Light"
      },
      {
        "id": "c",
        "text": "Sound"
      },
      {
        "id": "d",
        "text": "A cost label"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The reading-light goal requires light."
  },
  {
    "id": "science-u05-l02-q04",
    "conceptTag": "device-goal",
    "reviewCardId": "science-u05-l02-c1",
    "type": "fill-blank",
    "prompt": "Goal: use battery-stored energy to light a reading space for at least 10 seconds. The lamp must stay lit for ___ seconds.",
    "acceptedAnswers": [
      "10",
      "ten"
    ],
    "explanation": "The criterion is ten seconds."
  },
  {
    "id": "science-u05-l02-q05",
    "conceptTag": "device-constraints",
    "reviewCardId": "science-u05-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which set meets the eight-token constraint exactly?",
    "choices": [
      {
        "id": "a",
        "text": "holder and lamp only for 6"
      },
      {
        "id": "b",
        "text": "holder, lamp, and extra decoration for 9"
      },
      {
        "id": "c",
        "text": "holder, lamp, switch, and two wires for 8"
      },
      {
        "id": "d",
        "text": "two lamps and two holders for 12"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The complete planned set totals eight."
  },
  {
    "id": "science-u05-l02-q06",
    "conceptTag": "device-constraints",
    "reviewCardId": "science-u05-l02-c2",
    "type": "true-false",
    "prompt": "A material should support the goal and fit the constraints.",
    "choices": [
      {
        "id": "true",
        "text": "True — both conditions matter"
      },
      {
        "id": "false",
        "text": "False — cost and function do not matter"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Design choices answer the need within limits."
  },
  {
    "id": "science-u05-l02-q07",
    "conceptTag": "device-constraints",
    "reviewCardId": "science-u05-l02-c2",
    "type": "multiple-choice",
    "prompt": "Why choose a prewired lamp?",
    "choices": [
      {
        "id": "a",
        "text": "It proves the device works"
      },
      {
        "id": "b",
        "text": "It removes the need for a battery"
      },
      {
        "id": "c",
        "text": "It changes light into stored energy"
      },
      {
        "id": "d",
        "text": "It supports the battery-to-light path in the safe classroom setup"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It is a suitable planned component."
  },
  {
    "id": "science-u05-l02-q08",
    "conceptTag": "device-constraints",
    "reviewCardId": "science-u05-l02-c2",
    "type": "multiple-choice",
    "prompt": "On-screen battery-to-lamp conversion activity: connect a battery model to a lamp model to trace stored → electric → light. What does this conversion activity contribute?",
    "choices": [
      {
        "id": "a",
        "text": "A model of battery-to-lamp connections"
      },
      {
        "id": "b",
        "text": "Physical test observations"
      },
      {
        "id": "c",
        "text": "Proof of ten-second lighting"
      },
      {
        "id": "d",
        "text": "A cost measurement"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It helps plan the chain only."
  },
  {
    "id": "science-u05-l02-q09",
    "conceptTag": "device-test-plan",
    "reviewCardId": "science-u05-l02-c3",
    "type": "sort",
    "prompt": "Order the test plan.",
    "items": [
      {
        "id": "record",
        "text": "Record whether the lamp stays lit for ten seconds"
      },
      {
        "id": "inspect",
        "text": "Have an adult inspect the connections"
      },
      {
        "id": "build",
        "text": "Connect the holder, switch, wires, and prewired lamp"
      },
      {
        "id": "close",
        "text": "Close the switch"
      }
    ],
    "correctOrder": [
      "build",
      "inspect",
      "close",
      "record"
    ],
    "explanation": "Build, inspect, operate, then record."
  },
  {
    "id": "science-u05-l02-q10",
    "conceptTag": "device-test-plan",
    "reviewCardId": "science-u05-l02-c3",
    "type": "true-false",
    "prompt": "The test should change the ten-second criterion after seeing the result.",
    "choices": [
      {
        "id": "true",
        "text": "True — move the goal to fit the result"
      },
      {
        "id": "false",
        "text": "False — keep the criterion fixed"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "A fixed criterion supports fair judgment."
  },
  {
    "id": "science-u05-l02-q11",
    "conceptTag": "device-test-plan",
    "reviewCardId": "science-u05-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which diagram is complete?",
    "choices": [
      {
        "id": "a",
        "text": "battery → label"
      },
      {
        "id": "b",
        "text": "battery holder → switch → lamp → holder"
      },
      {
        "id": "c",
        "text": "lamp → decoration"
      },
      {
        "id": "d",
        "text": "wire → timer only"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The closed component path is testable."
  },
  {
    "id": "science-u05-l02-q12",
    "conceptTag": "device-test-plan",
    "reviewCardId": "science-u05-l02-c3",
    "type": "multiple-choice",
    "prompt": "Who should inspect the low-voltage connections before the test?",
    "choices": [
      {
        "id": "a",
        "text": "No one"
      },
      {
        "id": "b",
        "text": "A random online viewer"
      },
      {
        "id": "c",
        "text": "An adult"
      },
      {
        "id": "d",
        "text": "The widget"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Adult supervision supports safe setup."
  },
  {
    "id": "science-u05-l02-q13",
    "conceptTag": "device-test-plan",
    "reviewCardId": "science-u05-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which fallback is appropriate?",
    "choices": [
      {
        "id": "a",
        "text": "Touch bare wire ends"
      },
      {
        "id": "b",
        "text": "Add an unknown battery"
      },
      {
        "id": "c",
        "text": "Change the success goal"
      },
      {
        "id": "d",
        "text": "Open the switch, inspect one connection, and retest"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It is bounded, safe, and preserves the criterion."
  }
];

const scienceU05L02Lesson: Lesson = {
  ...scienceU05L02Core,
  quiz: { passThreshold: 8, pool: scienceU05L02Questions },
};

const scienceU05L03Core = {
  "id": "science-u05-l03",
  "unitId": "science-u05",
  "title": "Test an Energy-Conversion Device",
  "indicatorCodes": [
    "4-PS3-4"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A supplied test record describes three trials of the battery reading-light prototype."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "The observations, not a model, determine whether it met the goal."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will write a fair procedure, record only observable results, and judge the fixed criterion."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s read the evidence like engineers!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u05-l03-c1",
      "title": "Write a fair test procedure",
      "blocks": [
        {
          "kind": "text",
          "text": "A fair procedure repeats the same steps with the same battery, lamp, connections, switch, ten-second interval, and viewing condition."
        },
        {
          "kind": "example",
          "text": "For each trial, adult checks the covered setup, tester closes the switch, observer watches for ten seconds, then records the lamp result."
        },
        {
          "kind": "tip",
          "text": "Support: Number the verbs connect/check, close, observe, record."
        }
      ]
    },
    {
      "id": "science-u05-l03-c2",
      "title": "Record observable results",
      "blocks": [
        {
          "kind": "text",
          "text": "Record what happened without turning an inference into an observation. Supplied record: Trial 1 lit 6 seconds then flickered off; Trial 2 lit 7 seconds then flickered off; Trial 3 lit 6 seconds then flickered off."
        },
        {
          "kind": "example",
          "text": "“Lit for 6 seconds” and “flickered off” are observations. “The device dislikes reading” is not."
        },
        {
          "kind": "tip",
          "text": "Response frame: In Trial ____, the lamp ____. This is an observation because ____."
        }
      ]
    },
    {
      "id": "science-u05-l03-c3",
      "title": "Judge the device against its goal",
      "blocks": [
        {
          "kind": "text",
          "text": "Compare every trial with the same success criterion: visibly lit for ten seconds. A near result is still a miss if it does not reach the criterion."
        },
        {
          "kind": "example",
          "text": "None of 6, 7, and 6 seconds reaches ten seconds, so the prototype did not yet meet its goal."
        },
        {
          "kind": "tip",
          "text": "Stretch: Use all three trials to justify the judgment and identify one pattern without inventing a cause."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Test an Energy-Conversion Device",
    "steps": [
      "Follow the same checked procedure for three supplied trials.",
      "Record 6 seconds, 7 seconds, and 6 seconds before the lamp flickers off.",
      "Compare each result with the fixed ten-second criterion.",
      "Conclude that the current prototype misses the goal in all three trials; no cause is proven by these observations alone."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU05L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u05-l03-q01",
    "conceptTag": "device-test-procedure",
    "reviewCardId": "science-u05-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which procedure is fairest?",
    "choices": [
      {
        "id": "a",
        "text": "Use the same setup, steps, and ten-second interval each trial"
      },
      {
        "id": "b",
        "text": "Change the lamp and battery each trial"
      },
      {
        "id": "c",
        "text": "Stop when a preferred result appears"
      },
      {
        "id": "d",
        "text": "Use different criteria each time"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Keeping conditions alike supports comparison."
  },
  {
    "id": "science-u05-l03-q02",
    "conceptTag": "device-test-procedure",
    "reviewCardId": "science-u05-l03-c1",
    "type": "sort",
    "prompt": "Order the trial steps.",
    "items": [
      {
        "id": "record",
        "text": "Record the lamp result"
      },
      {
        "id": "close",
        "text": "Close the switch"
      },
      {
        "id": "check",
        "text": "Have an adult check the covered setup"
      },
      {
        "id": "observe",
        "text": "Observe for ten seconds"
      }
    ],
    "correctOrder": [
      "check",
      "close",
      "observe",
      "record"
    ],
    "explanation": "Safety check comes before operation and recording."
  },
  {
    "id": "science-u05-l03-q03",
    "conceptTag": "device-test-procedure",
    "reviewCardId": "science-u05-l03-c1",
    "type": "true-false",
    "prompt": "The success criterion should remain ten seconds for every trial.",
    "choices": [
      {
        "id": "true",
        "text": "True — keep the criterion fixed"
      },
      {
        "id": "false",
        "text": "False — adjust it after each result"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A constant criterion allows judgment."
  },
  {
    "id": "science-u05-l03-q04",
    "conceptTag": "device-test-procedure",
    "reviewCardId": "science-u05-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which condition should stay the same?",
    "choices": [
      {
        "id": "a",
        "text": "The conclusion"
      },
      {
        "id": "b",
        "text": "The battery, lamp, and viewing condition"
      },
      {
        "id": "c",
        "text": "The number written in the result"
      },
      {
        "id": "d",
        "text": "The explanation after testing"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "These setup conditions support a fair test."
  },
  {
    "id": "science-u05-l03-q05",
    "conceptTag": "device-test-observations",
    "reviewCardId": "science-u05-l03-c2",
    "type": "multiple-choice",
    "prompt": "Supplied record: Trial 1 lit for 6 seconds, Trial 2 lit for 7 seconds, and Trial 3 lit for 6 seconds; each then flickered off. The goal was 10 seconds. What happened in Trial 2?",
    "choices": [
      {
        "id": "a",
        "text": "The lamp never lit"
      },
      {
        "id": "b",
        "text": "The lamp stayed lit ten seconds"
      },
      {
        "id": "c",
        "text": "The lamp lit seven seconds, then flickered off"
      },
      {
        "id": "d",
        "text": "The model predicted success"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "That is the supplied observation."
  },
  {
    "id": "science-u05-l03-q06",
    "conceptTag": "device-test-observations",
    "reviewCardId": "science-u05-l03-c2",
    "type": "true-false",
    "prompt": "“The lamp flickered off” is an observable result.",
    "choices": [
      {
        "id": "true",
        "text": "True — it describes what occurred"
      },
      {
        "id": "false",
        "text": "False — it is an exact energy value"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Flickering off can be observed."
  },
  {
    "id": "science-u05-l03-q07",
    "conceptTag": "device-test-observations",
    "reviewCardId": "science-u05-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which statement is not an observation?",
    "choices": [
      {
        "id": "a",
        "text": "Trial 1 lit for six seconds"
      },
      {
        "id": "b",
        "text": "Trial 2 lit for seven seconds"
      },
      {
        "id": "c",
        "text": "Trial 3 flickered off"
      },
      {
        "id": "d",
        "text": "The lamp dislikes reading"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It gives an unsupported human-like cause."
  },
  {
    "id": "science-u05-l03-q08",
    "conceptTag": "device-test-observations",
    "reviewCardId": "science-u05-l03-c2",
    "type": "fill-blank",
    "prompt": "Supplied record: Trial 1 lit for 6 seconds, Trial 2 lit for 7 seconds, and Trial 3 lit for 6 seconds; each then flickered off. The goal was 10 seconds. Trial 1 stayed lit for ___ seconds.",
    "acceptedAnswers": [
      "6",
      "six"
    ],
    "explanation": "The supplied record gives six seconds."
  },
  {
    "id": "science-u05-l03-q09",
    "conceptTag": "device-test-judgment",
    "reviewCardId": "science-u05-l03-c3",
    "type": "multiple-choice",
    "prompt": "Supplied record: Trial 1 lit for 6 seconds, Trial 2 lit for 7 seconds, and Trial 3 lit for 6 seconds; each then flickered off. The goal was 10 seconds. Did the prototype meet the ten-second goal?",
    "choices": [
      {
        "id": "a",
        "text": "No; all three trials were shorter than ten seconds"
      },
      {
        "id": "b",
        "text": "Yes; seven is close enough"
      },
      {
        "id": "c",
        "text": "Yes; the model can complete"
      },
      {
        "id": "d",
        "text": "There is no way to compare"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "All results miss the fixed criterion."
  },
  {
    "id": "science-u05-l03-q10",
    "conceptTag": "device-test-judgment",
    "reviewCardId": "science-u05-l03-c3",
    "type": "true-false",
    "prompt": "A seven-second result meets a ten-second success criterion.",
    "choices": [
      {
        "id": "true",
        "text": "True — near means success"
      },
      {
        "id": "false",
        "text": "False — seven is shorter than ten"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The criterion is explicit."
  },
  {
    "id": "science-u05-l03-q11",
    "conceptTag": "device-test-judgment",
    "reviewCardId": "science-u05-l03-c3",
    "type": "multiple-choice",
    "prompt": "Supplied record: Trial 1 lit for 6 seconds, Trial 2 lit for 7 seconds, and Trial 3 lit for 6 seconds; each then flickered off. The goal was 10 seconds. Which judgment uses all three trials?",
    "choices": [
      {
        "id": "a",
        "text": "The lamp failed because of a proven wire cause"
      },
      {
        "id": "b",
        "text": "The prototype missed the goal with results of 6, 7, and 6 seconds"
      },
      {
        "id": "c",
        "text": "The model passed, so the device passed"
      },
      {
        "id": "d",
        "text": "One trial can be ignored"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It compares all supplied results."
  },
  {
    "id": "science-u05-l03-q12",
    "conceptTag": "device-test-judgment",
    "reviewCardId": "science-u05-l03-c3",
    "type": "multiple-choice",
    "prompt": "Supplied record: Trial 1 lit for 6 seconds, Trial 2 lit for 7 seconds, and Trial 3 lit for 6 seconds; each then flickered off. The goal was 10 seconds. What pattern is supported?",
    "choices": [
      {
        "id": "a",
        "text": "Every trial reached ten seconds"
      },
      {
        "id": "b",
        "text": "The exact cause was loose wiring"
      },
      {
        "id": "c",
        "text": "Each trial ended before ten seconds"
      },
      {
        "id": "d",
        "text": "The lamp will always fail forever"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The repeated early ending is observed."
  },
  {
    "id": "science-u05-l03-q13",
    "conceptTag": "device-test-judgment",
    "reviewCardId": "science-u05-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which claim is too strong?",
    "choices": [
      {
        "id": "a",
        "text": "The current prototype missed the criterion"
      },
      {
        "id": "b",
        "text": "The trials ended before ten seconds"
      },
      {
        "id": "c",
        "text": "The record supports refinement"
      },
      {
        "id": "d",
        "text": "The observations prove exactly which component caused the miss"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The test did not isolate a cause."
  }
];

const scienceU05L03Lesson: Lesson = {
  ...scienceU05L03Core,
  quiz: { passThreshold: 8, pool: scienceU05L03Questions },
};

const scienceU05L04Core = {
  "id": "science-u05-l04",
  "unitId": "science-u05",
  "title": "Refine a Device Using Test Evidence",
  "indicatorCodes": [
    "4-PS3-4"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "The first reading-light design missed its ten-second goal in all three trials."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "A useful refinement changes one design feature while preserving the goal and test conditions."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare first-test and retest records before making a claim."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s improve the design with evidence!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u05-l04-c1",
      "title": "Find a result that misses the goal",
      "blocks": [
        {
          "kind": "text",
          "text": "A refinement starts with a specific gap between the result and the criterion."
        },
        {
          "kind": "example",
          "text": "First-test results were 6, 7, and 6 seconds; each missed the ten-second lighting goal."
        },
        {
          "kind": "tip",
          "text": "Support: Write criterion 10 seconds, then subtract only to describe how many seconds short each result was; do not compute an energy amount."
        }
      ]
    },
    {
      "id": "science-u05-l04-c2",
      "title": "Change one design feature",
      "blocks": [
        {
          "kind": "text",
          "text": "Change one feature so the retest can show whether it helped. Keep the battery type, lamp, switch, observation interval, and viewing condition the same."
        },
        {
          "kind": "example",
          "text": "Refinement: replace one loose clip with a firmly fitting clip. Do not also replace the battery or lamp."
        },
        {
          "kind": "tip",
          "text": "Response frame: I will change ____ and keep ____ the same so I can compare ____."
        }
      ]
    },
    {
      "id": "science-u05-l04-c3",
      "title": "Compare the retest with the first test",
      "blocks": [
        {
          "kind": "text",
          "text": "Retest record after the one-clip change: 10, 10, and 10 seconds lit with no flicker during the interval. Compare with 6, 7, and 6."
        },
        {
          "kind": "example",
          "text": "The refined prototype met the goal in all retests. The comparison supports that this version performed better; it does not promise every future trial."
        },
        {
          "kind": "tip",
          "text": "Stretch: Cite both record sets, identify the single change, and state a cautious refinement claim plus one limit."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Refine a Device Using Test Evidence",
    "steps": [
      "Identify the original gap: 6, 7, and 6 seconds versus the ten-second goal.",
      "Change only the loose clip and keep the remaining setup and procedure constant.",
      "Retest and record 10, 10, and 10 seconds without flicker during the interval.",
      "Conclude that the refined version met the criterion in these trials and performed better than the first version."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU05L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u05-l04-q01",
    "conceptTag": "refinement-need",
    "reviewCardId": "science-u05-l04-c1",
    "type": "multiple-choice",
    "prompt": "First-test record: Trials 1–3 stayed lit for 6, 7, and 6 seconds, then flickered off. The goal was 10 seconds. What evidence shows a refinement is needed?",
    "choices": [
      {
        "id": "a",
        "text": "All first-test results were below ten seconds"
      },
      {
        "id": "b",
        "text": "The lamp has a label"
      },
      {
        "id": "c",
        "text": "The team prefers a new color"
      },
      {
        "id": "d",
        "text": "The model can be reset"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The record shows a repeatable gap."
  },
  {
    "id": "science-u05-l04-q02",
    "conceptTag": "refinement-need",
    "reviewCardId": "science-u05-l04-c1",
    "type": "true-false",
    "prompt": "A result of six seconds misses a ten-second goal.",
    "choices": [
      {
        "id": "true",
        "text": "True — it ends before the criterion"
      },
      {
        "id": "false",
        "text": "False — every lit result passes"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Six is shorter than ten."
  },
  {
    "id": "science-u05-l04-q03",
    "conceptTag": "refinement-need",
    "reviewCardId": "science-u05-l04-c1",
    "type": "multiple-choice",
    "prompt": "First-test record: Trials 1–3 stayed lit for 6, 7, and 6 seconds, then flickered off. The goal was 10 seconds. Which is the best problem statement?",
    "choices": [
      {
        "id": "a",
        "text": "The device is bad"
      },
      {
        "id": "b",
        "text": "The lamp stopped after 6–7 seconds instead of staying lit for 10"
      },
      {
        "id": "c",
        "text": "The team needs a prettier box"
      },
      {
        "id": "d",
        "text": "An energy label should count as the result"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It names the evidence gap."
  },
  {
    "id": "science-u05-l04-q04",
    "conceptTag": "refinement-need",
    "reviewCardId": "science-u05-l04-c1",
    "type": "fill-blank",
    "prompt": "First-test record: Trials 1–3 stayed lit for 6, 7, and 6 seconds, then flickered off. The goal was 10 seconds. The highest first-test result was ___ seconds.",
    "acceptedAnswers": [
      "7",
      "seven"
    ],
    "explanation": "Trial 2 reached seven seconds."
  },
  {
    "id": "science-u05-l04-q05",
    "conceptTag": "single-design-change",
    "reviewCardId": "science-u05-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which refinement changes one feature?",
    "choices": [
      {
        "id": "a",
        "text": "Replace clip, battery, and lamp"
      },
      {
        "id": "b",
        "text": "Change the goal to six seconds"
      },
      {
        "id": "c",
        "text": "Replace the loose clip only"
      },
      {
        "id": "d",
        "text": "Use a different viewing room and interval"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Only the clip changes."
  },
  {
    "id": "science-u05-l04-q06",
    "conceptTag": "single-design-change",
    "reviewCardId": "science-u05-l04-c2",
    "type": "true-false",
    "prompt": "Keeping the lamp and battery type the same helps isolate the clip change.",
    "choices": [
      {
        "id": "true",
        "text": "True — other conditions stay controlled"
      },
      {
        "id": "false",
        "text": "False — every feature should change"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A single change supports comparison."
  },
  {
    "id": "science-u05-l04-q07",
    "conceptTag": "single-design-change",
    "reviewCardId": "science-u05-l04-c2",
    "type": "multiple-choice",
    "prompt": "Why not change the battery and clip together?",
    "choices": [
      {
        "id": "a",
        "text": "It costs no tokens"
      },
      {
        "id": "b",
        "text": "It guarantees failure"
      },
      {
        "id": "c",
        "text": "It changes the output to sound"
      },
      {
        "id": "d",
        "text": "The retest could not show which change mattered"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Two changes confound the result."
  },
  {
    "id": "science-u05-l04-q08",
    "conceptTag": "single-design-change",
    "reviewCardId": "science-u05-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which statement is a valid plan?",
    "choices": [
      {
        "id": "a",
        "text": "Change one clip, then repeat the same ten-second test"
      },
      {
        "id": "b",
        "text": "Change the success criterion"
      },
      {
        "id": "c",
        "text": "Skip recording"
      },
      {
        "id": "d",
        "text": "Use the model as test data"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It preserves the comparison."
  },
  {
    "id": "science-u05-l04-q09",
    "conceptTag": "refinement-evidence",
    "reviewCardId": "science-u05-l04-c3",
    "type": "sort",
    "prompt": "Order the refinement reasoning.",
    "items": [
      {
        "id": "claim",
        "text": "Judge whether the refined version met the goal"
      },
      {
        "id": "retest",
        "text": "Retest with the same procedure"
      },
      {
        "id": "gap",
        "text": "Identify the first-test gap"
      },
      {
        "id": "change",
        "text": "Change one design feature"
      }
    ],
    "correctOrder": [
      "gap",
      "change",
      "retest",
      "claim"
    ],
    "explanation": "Refinement moves from gap to change to retest to judgment."
  },
  {
    "id": "science-u05-l04-q10",
    "conceptTag": "refinement-evidence",
    "reviewCardId": "science-u05-l04-c3",
    "type": "true-false",
    "prompt": "The three successful retests guarantee every future trial will succeed.",
    "choices": [
      {
        "id": "true",
        "text": "True — three trials prove all future results"
      },
      {
        "id": "false",
        "text": "False — they support only a cautious claim"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Evidence is limited to the tested conditions."
  },
  {
    "id": "science-u05-l04-q11",
    "conceptTag": "refinement-evidence",
    "reviewCardId": "science-u05-l04-c3",
    "type": "multiple-choice",
    "prompt": "First-test record: Trials 1–3 stayed lit for 6, 7, and 6 seconds, then flickered off. The goal was 10 seconds. After replacing only a loose clip, the three retests each stayed lit for 10 seconds without flicker. Which comparison is correct?",
    "choices": [
      {
        "id": "a",
        "text": "First 10,10,10; retest 6,7,6"
      },
      {
        "id": "b",
        "text": "First 6,7,6; retest 10,10,10"
      },
      {
        "id": "c",
        "text": "Both sets were 7,7,7"
      },
      {
        "id": "d",
        "text": "No results were recorded"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Those are the two supplied records."
  },
  {
    "id": "science-u05-l04-q12",
    "conceptTag": "refinement-evidence",
    "reviewCardId": "science-u05-l04-c3",
    "type": "multiple-choice",
    "prompt": "First-test record: Trials 1–3 stayed lit for 6, 7, and 6 seconds, then flickered off. The goal was 10 seconds. After replacing only a loose clip, the three retests each stayed lit for 10 seconds without flicker. Which claim is supported?",
    "choices": [
      {
        "id": "a",
        "text": "The clip is the only possible cause in every device"
      },
      {
        "id": "b",
        "text": "Completing the activity guarantees the refinement worked"
      },
      {
        "id": "c",
        "text": "This refined version met the ten-second goal in all three retests"
      },
      {
        "id": "d",
        "text": "Every lamp will now work forever"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It matches the retest evidence without overclaiming."
  },
  {
    "id": "science-u05-l04-q13",
    "conceptTag": "refinement-evidence",
    "reviewCardId": "science-u05-l04-c3",
    "type": "multiple-choice",
    "prompt": "What stayed within the allowed conversion boundary?",
    "choices": [
      {
        "id": "a",
        "text": "The device changed into an unlisted design"
      },
      {
        "id": "b",
        "text": "The test calculated energy"
      },
      {
        "id": "c",
        "text": "The output changed to a chemical formula"
      },
      {
        "id": "d",
        "text": "Battery-stored energy still produced light"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The refinement preserves battery-to-light."
  }
];

const scienceU05L04Lesson: Lesson = {
  ...scienceU05L04Core,
  quiz: { passThreshold: 8, pool: scienceU05L04Questions },
};

export const unit05Lessons: Lesson[] = [
  scienceU05L01Lesson,
  scienceU05L02Lesson,
  scienceU05L03Lesson,
  scienceU05L04Lesson,
];
