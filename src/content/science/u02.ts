import type { Lesson } from '../schema';

const scienceU02L01Core = {
  "id": "science-u02-l01",
  "unitId": "science-u02",
  "title": "Observe Energy Transfer",
  "indicatorCodes": [
    "4-PS3-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A sunlit card becomes warmer while a shaded card stays cooler."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "What observation could show energy moving from one place to another?"
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will separate what we notice from the energy idea we infer."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s follow the evidence carefully!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u02-l01-c1",
      "title": "Identify a source and receiver",
      "blocks": [
        {
          "kind": "text",
          "text": "A transfer description names where energy starts and what receives it."
        },
        {
          "kind": "example",
          "text": "Light travels from the Sun to a paper square."
        },
        {
          "kind": "tip",
          "text": "Support: Point to the source first, trace the route second, and name the receiver last."
        }
      ]
    },
    {
      "id": "science-u02-l01-c2",
      "title": "Observe a change",
      "blocks": [
        {
          "kind": "text",
          "text": "A receiver becoming warmer, brighter, moving, or vibrating can be observed."
        },
        {
          "kind": "example",
          "text": "The sunlit square feels warmer than the shaded comparison square."
        },
        {
          "kind": "tip",
          "text": "Response frame: I observed ____. This change can support the inference that energy moved by ____."
        }
      ],
      "widget": {
        "type": "energy-transfer-builder",
        "config": {
          "sources": [
            "Sun"
          ],
          "transfers": [
            "light"
          ],
          "targets": [
            "paper square"
          ],
          "requiredPath": [
            "Sun",
            "light",
            "paper square"
          ]
        }
      }
    },
    {
      "id": "science-u02-l01-c3",
      "title": "Use the change as evidence",
      "blocks": [
        {
          "kind": "text",
          "text": "Compare the receiver before and after, or compare it with an unchanged condition."
        },
        {
          "kind": "example",
          "text": "The warmer sunlit square supports an explanation that light transferred energy to it."
        },
        {
          "kind": "tip",
          "text": "Stretch: Compare a changed receiver with an unchanged condition and explain why that comparison strengthens the claim."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Observe Energy Transfer",
    "steps": [
      "Two matching paper squares begin in the same room.",
      "One is placed in sunlight and later feels warmer than the shaded square.",
      "That observed difference supports an inference that energy moved by light from the Sun to the paper."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU02L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u02-l01-q01",
    "conceptTag": "transfer-source-receiver",
    "reviewCardId": "science-u02-l01-c1",
    "type": "multiple-choice",
    "prompt": "Two matching paper squares begin in the same room. One is placed in sunlight and later feels warmer than the shaded square. What is the energy source?",
    "choices": [
      {
        "id": "a",
        "text": "The Sun"
      },
      {
        "id": "b",
        "text": "The label"
      },
      {
        "id": "c",
        "text": "The desk"
      },
      {
        "id": "d",
        "text": "The clock"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The light starts at the Sun."
  },
  {
    "id": "science-u02-l01-q02",
    "conceptTag": "transfer-source-receiver",
    "reviewCardId": "science-u02-l01-c1",
    "type": "true-false",
    "prompt": "A transfer explanation should identify where energy starts and what receives it.",
    "choices": [
      {
        "id": "true",
        "text": "True — both places matter"
      },
      {
        "id": "false",
        "text": "False — places do not matter"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Source and receiver describe the transfer path."
  },
  {
    "id": "science-u02-l01-q03",
    "conceptTag": "transfer-source-receiver",
    "reviewCardId": "science-u02-l01-c1",
    "type": "multiple-choice",
    "prompt": "Two matching paper squares begin in the same room. One is placed in sunlight and later feels warmer than the shaded square. Which transfer path matches this phenomenon?",
    "choices": [
      {
        "id": "a",
        "text": "paper to label to Sun"
      },
      {
        "id": "b",
        "text": "Sun to light to paper"
      },
      {
        "id": "c",
        "text": "desk to clock to shade"
      },
      {
        "id": "d",
        "text": "shade to paper to Sun"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Light carries energy from the Sun to the paper."
  },
  {
    "id": "science-u02-l01-q04",
    "conceptTag": "observable-transfer-change",
    "reviewCardId": "science-u02-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which is an observable change?",
    "choices": [
      {
        "id": "a",
        "text": "An energy label is an observation of energy"
      },
      {
        "id": "b",
        "text": "The Sun chose the paper"
      },
      {
        "id": "c",
        "text": "The sunlit paper felt warmer"
      },
      {
        "id": "d",
        "text": "Completing the activity guarantees the result"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Warmer paper is an observable effect."
  },
  {
    "id": "science-u02-l01-q05",
    "conceptTag": "observable-transfer-change",
    "reviewCardId": "science-u02-l01-c2",
    "type": "true-false",
    "prompt": "Energy itself must be directly visible before transfer can be inferred.",
    "choices": [
      {
        "id": "true",
        "text": "True — inference is not allowed"
      },
      {
        "id": "false",
        "text": "False — observable effects can support an inference"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Scientists use observed changes as evidence."
  },
  {
    "id": "science-u02-l01-q06",
    "conceptTag": "observable-transfer-change",
    "reviewCardId": "science-u02-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which comparison is most useful?",
    "choices": [
      {
        "id": "a",
        "text": "A sunlit square and a matching shaded square"
      },
      {
        "id": "b",
        "text": "Different papers in different rooms"
      },
      {
        "id": "c",
        "text": "One paper with no comparison"
      },
      {
        "id": "d",
        "text": "A paper and a metal spoon"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Matching squares make the light condition the useful difference."
  },
  {
    "id": "science-u02-l01-q07",
    "conceptTag": "observable-transfer-change",
    "reviewCardId": "science-u02-l01-c2",
    "type": "multiple-choice",
    "prompt": "What does the path builder provide?",
    "choices": [
      {
        "id": "a",
        "text": "A physical temperature reading"
      },
      {
        "id": "b",
        "text": "A model of a possible transfer path"
      },
      {
        "id": "c",
        "text": "Proof from a real investigation"
      },
      {
        "id": "d",
        "text": "An exact energy amount"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The activity represents ideas; it does not collect evidence."
  },
  {
    "id": "science-u02-l01-q08",
    "conceptTag": "transfer-evidence",
    "reviewCardId": "science-u02-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which statement correctly separates observation and inference?",
    "choices": [
      {
        "id": "a",
        "text": "Observation: an energy label appeared; inference: paper exists"
      },
      {
        "id": "b",
        "text": "Observation: activity finished; inference: the screen is physical evidence"
      },
      {
        "id": "c",
        "text": "Observation: paper is square; inference: every square warms"
      },
      {
        "id": "d",
        "text": "Observation: paper felt warmer; inference: light transferred energy"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The warmth is observed and energy transfer is inferred."
  },
  {
    "id": "science-u02-l01-q09",
    "conceptTag": "transfer-evidence",
    "reviewCardId": "science-u02-l01-c3",
    "type": "true-false",
    "prompt": "A written before-and-after temperature description can provide evidence about transfer by heat or light.",
    "choices": [
      {
        "id": "true",
        "text": "True — the change can be compared"
      },
      {
        "id": "false",
        "text": "False — observations cannot be evidence"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A described change can support a qualitative transfer explanation."
  },
  {
    "id": "science-u02-l01-q10",
    "conceptTag": "transfer-evidence",
    "reviewCardId": "science-u02-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which claim is supported by the warmer sunlit square?",
    "choices": [
      {
        "id": "a",
        "text": "The label created energy"
      },
      {
        "id": "b",
        "text": "The shaded paper made sunlight"
      },
      {
        "id": "c",
        "text": "Light transferred energy from the Sun to the paper"
      },
      {
        "id": "d",
        "text": "The exact energy amount is known"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The observed warming supports a qualitative transfer claim."
  },
  {
    "id": "science-u02-l01-q11",
    "conceptTag": "transfer-evidence",
    "reviewCardId": "science-u02-l01-c3",
    "type": "fill-blank",
    "prompt": "Complete the evidence sentence: The sunlit paper felt ___ than the shaded paper.",
    "acceptedAnswers": [
      "warmer"
    ],
    "explanation": "Warmer names the observed comparison."
  },
  {
    "id": "science-u02-l01-q12",
    "conceptTag": "transfer-evidence",
    "reviewCardId": "science-u02-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which detail is not evidence of transfer?",
    "choices": [
      {
        "id": "a",
        "text": "The sunlit paper became warmer"
      },
      {
        "id": "b",
        "text": "The shaded paper stayed cooler"
      },
      {
        "id": "c",
        "text": "The two papers began in the same room"
      },
      {
        "id": "d",
        "text": "The paper had a blue star printed on it"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "A printed star does not describe a transfer effect."
  },
  {
    "id": "science-u02-l01-q13",
    "conceptTag": "transfer-evidence",
    "reviewCardId": "science-u02-l01-c3",
    "type": "multiple-choice",
    "prompt": "Why can the model not be cited as physical evidence?",
    "choices": [
      {
        "id": "a",
        "text": "Models never help thinking"
      },
      {
        "id": "b",
        "text": "It represents a path but does not make a real-world observation"
      },
      {
        "id": "c",
        "text": "It uses too few colors"
      },
      {
        "id": "d",
        "text": "It has no written labels"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Evidence comes from observations, while the activity represents the explanation."
  }
];

const scienceU02L01Lesson: Lesson = {
  ...scienceU02L01Core,
  quiz: { passThreshold: 8, pool: scienceU02L01Questions },
};

const scienceU02L02Core = {
  "id": "science-u02-l02",
  "unitId": "science-u02",
  "title": "Use Sound and Light as Evidence",
  "indicatorCodes": [
    "4-PS3-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A struck tuning fork vibrates, nearby paper bits tremble, and a flashlight brightens a card."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Which changes can serve as evidence that energy moved from place to place?"
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will trace sound and light paths while keeping observations separate from explanations."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s compare two transfer routes with careful words!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u02-l02-c1",
      "title": "Track sound from a source",
      "blocks": [
        {
          "kind": "text",
          "text": "A vibrating object can be a sound source. Sound travels through matter to a receiver, where an observable vibration or motion may occur."
        },
        {
          "kind": "example",
          "text": "A struck tuning fork vibrates. Nearby paper bits tremble even though the fork does not touch them. That written observation can support a sound-transfer inference."
        },
        {
          "kind": "tip",
          "text": "Support: Say the path in three parts: tuning fork → sound → paper bits. Then underline the observed effect."
        }
      ],
      "widget": {
        "type": "energy-transfer-builder",
        "config": {
          "sources": [
            "tuning fork"
          ],
          "transfers": [
            "sound"
          ],
          "targets": [
            "paper bits"
          ],
          "requiredPath": [
            "tuning fork",
            "sound",
            "paper bits"
          ]
        }
      }
    },
    {
      "id": "science-u02-l02-c2",
      "title": "Track light from a source",
      "blocks": [
        {
          "kind": "text",
          "text": "Light can move energy from a source to a receiver. A brighter surface or a warmer receiver can be an observed effect when the comparison is fair."
        },
        {
          "kind": "example",
          "text": "A flashlight shines on one matching card while another stays covered. The lit card is brighter; that observation supports a light path from flashlight to card."
        },
        {
          "kind": "tip",
          "text": "Response frame: Light traveled from ____ to ____. I observed ____, so I infer ____."
        }
      ]
    },
    {
      "id": "science-u02-l02-c3",
      "title": "Compare observable effects",
      "blocks": [
        {
          "kind": "text",
          "text": "Sound and light are different transfer routes, so their observable effects need not look alike. Compare each source, route, receiver, and effect."
        },
        {
          "kind": "example",
          "text": "The tuning-fork case includes vibration and trembling paper bits. The flashlight case includes a brighter card. Neither case makes energy directly visible."
        },
        {
          "kind": "tip",
          "text": "Stretch: Compare both routes in one claim and name one observation for each without treating the tracing model as evidence."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Use Sound and Light as Evidence",
    "steps": [
      "Case A says a struck tuning fork vibrated and nearby paper bits trembled.",
      "Case B says a flashlight made one matching card brighter than a covered card.",
      "Trace tuning fork → sound → paper bits and flashlight → light → card.",
      "Conclude that the different observed effects support energy transfer by sound and by light; the path builder only represents one route."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU02L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u02-l02-q01",
    "conceptTag": "sound-transfer-path",
    "reviewCardId": "science-u02-l02-c1",
    "type": "multiple-choice",
    "prompt": "What is the sound source in the tuning-fork case?",
    "choices": [
      {
        "id": "a",
        "text": "The vibrating tuning fork"
      },
      {
        "id": "b",
        "text": "The paper label"
      },
      {
        "id": "c",
        "text": "The table color"
      },
      {
        "id": "d",
        "text": "The quiet room"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The tuning fork begins the sound path."
  },
  {
    "id": "science-u02-l02-q02",
    "conceptTag": "sound-transfer-path",
    "reviewCardId": "science-u02-l02-c1",
    "type": "true-false",
    "prompt": "The trembling paper bits are an observable effect at the receiver.",
    "choices": [
      {
        "id": "true",
        "text": "True — their motion can be noticed"
      },
      {
        "id": "false",
        "text": "False — receivers never change"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The paper bits’ motion is an observation."
  },
  {
    "id": "science-u02-l02-q03",
    "conceptTag": "sound-transfer-path",
    "reviewCardId": "science-u02-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which path matches the sound case?",
    "choices": [
      {
        "id": "a",
        "text": "paper bits → light → fork"
      },
      {
        "id": "b",
        "text": "tuning fork → sound → paper bits"
      },
      {
        "id": "c",
        "text": "table → heat → label"
      },
      {
        "id": "d",
        "text": "fork → paper → sunlight"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Sound carries energy from the vibrating fork to the paper bits."
  },
  {
    "id": "science-u02-l02-q04",
    "conceptTag": "sound-transfer-path",
    "reviewCardId": "science-u02-l02-c1",
    "type": "multiple-choice",
    "prompt": "Why is the path builder not physical evidence?",
    "choices": [
      {
        "id": "a",
        "text": "It has words"
      },
      {
        "id": "b",
        "text": "It can be reset"
      },
      {
        "id": "c",
        "text": "It represents a route but makes no real-world observation"
      },
      {
        "id": "d",
        "text": "It uses a tuning-fork label"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The model organizes ideas rather than collecting observations."
  },
  {
    "id": "science-u02-l02-q05",
    "conceptTag": "light-transfer-path",
    "reviewCardId": "science-u02-l02-c2",
    "type": "multiple-choice",
    "prompt": "What is the receiver in the flashlight case?",
    "choices": [
      {
        "id": "a",
        "text": "The switch"
      },
      {
        "id": "b",
        "text": "The room clock"
      },
      {
        "id": "c",
        "text": "The observer"
      },
      {
        "id": "d",
        "text": "The illuminated card"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The card receives the light."
  },
  {
    "id": "science-u02-l02-q06",
    "conceptTag": "light-transfer-path",
    "reviewCardId": "science-u02-l02-c2",
    "type": "true-false",
    "prompt": "A card becoming brighter can be an observable effect of light reaching it.",
    "choices": [
      {
        "id": "true",
        "text": "True — brightness can be compared"
      },
      {
        "id": "false",
        "text": "False — light has no observable effects"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Brightness is an observable effect."
  },
  {
    "id": "science-u02-l02-q07",
    "conceptTag": "light-transfer-path",
    "reviewCardId": "science-u02-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which comparison best supports the light claim?",
    "choices": [
      {
        "id": "a",
        "text": "One matching card lit and one matching card covered"
      },
      {
        "id": "b",
        "text": "A card and a metal pan in different rooms"
      },
      {
        "id": "c",
        "text": "One card with no comparison"
      },
      {
        "id": "d",
        "text": "Two cards of different colors under different lamps"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Matching cards isolate the light condition."
  },
  {
    "id": "science-u02-l02-q08",
    "conceptTag": "light-transfer-path",
    "reviewCardId": "science-u02-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which statement separates observation from inference?",
    "choices": [
      {
        "id": "a",
        "text": "Observation: energy was seen; inference: the card exists"
      },
      {
        "id": "b",
        "text": "Observation: the card looked brighter; inference: light transferred energy"
      },
      {
        "id": "c",
        "text": "Observation: the model ended; inference: the model is evidence"
      },
      {
        "id": "d",
        "text": "Observation: the card is paper; inference: all paper glows"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Brightness is observed and transfer is inferred."
  },
  {
    "id": "science-u02-l02-q09",
    "conceptTag": "sound-light-evidence",
    "reviewCardId": "science-u02-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which pair correctly matches route and effect?",
    "choices": [
      {
        "id": "a",
        "text": "sound—brighter card; light—trembling paper"
      },
      {
        "id": "b",
        "text": "sound—covered card; light—silent fork"
      },
      {
        "id": "c",
        "text": "sound—trembling paper; light—brighter card"
      },
      {
        "id": "d",
        "text": "sound—exact energy; light—proof"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The written cases pair sound with trembling and light with brightness."
  },
  {
    "id": "science-u02-l02-q10",
    "conceptTag": "sound-light-evidence",
    "reviewCardId": "science-u02-l02-c3",
    "type": "true-false",
    "prompt": "Sound and light must cause the same observable effect to transfer energy.",
    "choices": [
      {
        "id": "true",
        "text": "True — every effect must match"
      },
      {
        "id": "false",
        "text": "False — different routes can have different effects"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Different receivers and routes can show different effects."
  },
  {
    "id": "science-u02-l02-q11",
    "conceptTag": "sound-light-evidence",
    "reviewCardId": "science-u02-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which comparison claim is supported?",
    "choices": [
      {
        "id": "a",
        "text": "Only light can move energy"
      },
      {
        "id": "b",
        "text": "Energy labels supplied physical observations in both cases"
      },
      {
        "id": "c",
        "text": "The activity collected physical measurements for both transfers"
      },
      {
        "id": "d",
        "text": "Sound was linked to trembling paper, while light was linked to a brighter card"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It cites one relevant observation from each case."
  },
  {
    "id": "science-u02-l02-q12",
    "conceptTag": "sound-light-evidence",
    "reviewCardId": "science-u02-l02-c3",
    "type": "fill-blank",
    "prompt": "Complete the sound evidence sentence: The nearby paper bits ___.",
    "acceptedAnswers": [
      "trembled",
      "moved"
    ],
    "explanation": "Their trembling or movement is the observable effect."
  },
  {
    "id": "science-u02-l02-q13",
    "conceptTag": "sound-light-evidence",
    "reviewCardId": "science-u02-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which detail is irrelevant to both transfer claims?",
    "choices": [
      {
        "id": "a",
        "text": "The observer wrote with a blue pencil"
      },
      {
        "id": "b",
        "text": "The tuning fork vibrated"
      },
      {
        "id": "c",
        "text": "The paper bits trembled"
      },
      {
        "id": "d",
        "text": "The lit card appeared brighter"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Pencil color does not describe either transfer effect."
  }
];

const scienceU02L02Lesson: Lesson = {
  ...scienceU02L02Core,
  quiz: { passThreshold: 8, pool: scienceU02L02Questions },
};

const scienceU02L03Core = {
  "id": "science-u02-l03",
  "unitId": "science-u02",
  "title": "Use Heat and Electric Current as Evidence",
  "indicatorCodes": [
    "4-PS3-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A metal spoon in warm water becomes warmer, and a battery-connected motor begins turning."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Both changes can help us reason about energy moving from place to place."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will use qualitative observations and trace an electric-current path without calculating energy."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s follow the evidence from source to receiver!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u02-l03-c1",
      "title": "Notice transfer by heat",
      "blocks": [
        {
          "kind": "text",
          "text": "When objects at different temperatures interact, a cooler object may become warmer. That temperature change is an observable effect supporting energy transfer by heat."
        },
        {
          "kind": "example",
          "text": "Two matching metal spoons begin at room temperature. One rests in warm water and later feels warmer than the untouched spoon."
        },
        {
          "kind": "tip",
          "text": "Support: Compare matching objects and complete: The spoon in ____ became ____ than the comparison spoon."
        }
      ]
    },
    {
      "id": "science-u02-l03-c2",
      "title": "Follow an electric-current path",
      "blocks": [
        {
          "kind": "text",
          "text": "A connected battery can supply energy that is transferred by electric current through a closed path to a receiver such as a motor."
        },
        {
          "kind": "example",
          "text": "When the circuit is connected, the motor shaft turns. When the path is open, it stops. The turning is the observation; energy transfer is the inference."
        },
        {
          "kind": "tip",
          "text": "Response frame: The path is battery → electric current → motor. I observed the motor ____."
        }
      ],
      "widget": {
        "type": "energy-transfer-builder",
        "config": {
          "sources": [
            "battery"
          ],
          "transfers": [
            "electric current"
          ],
          "targets": [
            "motor"
          ],
          "requiredPath": [
            "battery",
            "electric current",
            "motor"
          ]
        }
      }
    },
    {
      "id": "science-u02-l03-c3",
      "title": "Separate transfer from effect",
      "blocks": [
        {
          "kind": "text",
          "text": "Name the transfer route and the receiver’s effect separately. Heat is linked to a warmer spoon; electric current is linked to a turning motor."
        },
        {
          "kind": "example",
          "text": "Do not use “the energy moved” as the only evidence. Cite the warmer spoon or turning shaft first, then explain the transfer."
        },
        {
          "kind": "tip",
          "text": "Stretch: Write one observation-and-inference pair for heat and another for electric current, using a different observable effect in each."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Use Heat and Electric Current as Evidence",
    "steps": [
      "Observe that one matching spoon in warm water became warmer than the untouched spoon.",
      "Observe that a connected battery-and-motor setup had a turning shaft, while the open path did not.",
      "Identify heat as the route in the spoon case and electric current as the route in the motor case.",
      "Use each observed effect as evidence for a qualitative transfer inference; the path model supplies no test data."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU02L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u02-l03-q01",
    "conceptTag": "heat-transfer-evidence",
    "reviewCardId": "science-u02-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which observation supports transfer by heat?",
    "choices": [
      {
        "id": "a",
        "text": "The spoon in warm water became warmer"
      },
      {
        "id": "b",
        "text": "The spoon has a label"
      },
      {
        "id": "c",
        "text": "The cup is round"
      },
      {
        "id": "d",
        "text": "The clock moved forward"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The spoon’s warming is the relevant effect."
  },
  {
    "id": "science-u02-l03-q02",
    "conceptTag": "heat-transfer-evidence",
    "reviewCardId": "science-u02-l03-c1",
    "type": "true-false",
    "prompt": "Comparing matching spoons helps focus on the warm-water condition.",
    "choices": [
      {
        "id": "true",
        "text": "True — the comparison holds the spoon type constant"
      },
      {
        "id": "false",
        "text": "False — matching objects prevent comparison"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Matching spoons make the condition more useful."
  },
  {
    "id": "science-u02-l03-q03",
    "conceptTag": "heat-transfer-evidence",
    "reviewCardId": "science-u02-l03-c1",
    "type": "multiple-choice",
    "prompt": "What is the receiver in the warm-water example?",
    "choices": [
      {
        "id": "a",
        "text": "The room clock"
      },
      {
        "id": "b",
        "text": "The cooler spoon"
      },
      {
        "id": "c",
        "text": "The written label"
      },
      {
        "id": "d",
        "text": "The observer’s pencil"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The cooler spoon receives energy and warms."
  },
  {
    "id": "science-u02-l03-q04",
    "conceptTag": "heat-transfer-evidence",
    "reviewCardId": "science-u02-l03-c1",
    "type": "fill-blank",
    "prompt": "The spoon placed in warm water became ___.",
    "acceptedAnswers": [
      "warmer"
    ],
    "explanation": "Warmer names the observed temperature change."
  },
  {
    "id": "science-u02-l03-q05",
    "conceptTag": "electric-transfer-path",
    "reviewCardId": "science-u02-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which path matches the motor case?",
    "choices": [
      {
        "id": "a",
        "text": "motor → light → battery"
      },
      {
        "id": "b",
        "text": "battery → sound → spoon"
      },
      {
        "id": "c",
        "text": "battery → electric current → motor"
      },
      {
        "id": "d",
        "text": "water → heat → battery"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The connected path runs from battery by current to motor."
  },
  {
    "id": "science-u02-l03-q06",
    "conceptTag": "electric-transfer-path",
    "reviewCardId": "science-u02-l03-c2",
    "type": "true-false",
    "prompt": "The motor turning is an observable effect at the receiver.",
    "choices": [
      {
        "id": "true",
        "text": "True — shaft motion can be observed"
      },
      {
        "id": "false",
        "text": "False — motor motion cannot be observed"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Turning is the visible motion effect."
  },
  {
    "id": "science-u02-l03-q07",
    "conceptTag": "electric-transfer-path",
    "reviewCardId": "science-u02-l03-c2",
    "type": "multiple-choice",
    "prompt": "What should happen in the written case when the electric path is opened?",
    "choices": [
      {
        "id": "a",
        "text": "The spoon warms"
      },
      {
        "id": "b",
        "text": "The battery becomes sunlight"
      },
      {
        "id": "c",
        "text": "Finishing an activity guarantees a test result"
      },
      {
        "id": "d",
        "text": "The motor stops turning"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The case states that breaking the path stops the motor."
  },
  {
    "id": "science-u02-l03-q08",
    "conceptTag": "electric-transfer-path",
    "reviewCardId": "science-u02-l03-c2",
    "type": "multiple-choice",
    "prompt": "What does the path builder do?",
    "choices": [
      {
        "id": "a",
        "text": "Represents the battery-current-motor route"
      },
      {
        "id": "b",
        "text": "Measures the motor’s exact energy"
      },
      {
        "id": "c",
        "text": "Observes a physical circuit"
      },
      {
        "id": "d",
        "text": "Guarantees all motors behave alike"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It is a simplified route model."
  },
  {
    "id": "science-u02-l03-q09",
    "conceptTag": "transfer-effect-reasoning",
    "reviewCardId": "science-u02-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which sentence correctly separates effect and inference?",
    "choices": [
      {
        "id": "a",
        "text": "An energy label appeared, so the spoon exists"
      },
      {
        "id": "b",
        "text": "The spoon became warmer, so heat transfer is inferred"
      },
      {
        "id": "c",
        "text": "The activity finished, so a circuit was tested"
      },
      {
        "id": "d",
        "text": "The motor label moved, so light transferred"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Warming is observed and heat transfer is inferred."
  },
  {
    "id": "science-u02-l03-q10",
    "conceptTag": "transfer-effect-reasoning",
    "reviewCardId": "science-u02-l03-c3",
    "type": "true-false",
    "prompt": "“Energy transferred” alone is a complete observation.",
    "choices": [
      {
        "id": "true",
        "text": "True — no effect is needed"
      },
      {
        "id": "false",
        "text": "False — name the observed change first"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The claim needs an observable effect as evidence."
  },
  {
    "id": "science-u02-l03-q11",
    "conceptTag": "transfer-effect-reasoning",
    "reviewCardId": "science-u02-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which pair matches each case?",
    "choices": [
      {
        "id": "a",
        "text": "heat—turning label; current—warmer water"
      },
      {
        "id": "b",
        "text": "heat—exact amount; current—proof"
      },
      {
        "id": "c",
        "text": "heat—warmer spoon; current—turning motor"
      },
      {
        "id": "d",
        "text": "heat—battery; current—sunlight"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The observations match their written transfer routes."
  },
  {
    "id": "science-u02-l03-q12",
    "conceptTag": "transfer-effect-reasoning",
    "reviewCardId": "science-u02-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which statement remains within the Grade 4 boundary?",
    "choices": [
      {
        "id": "a",
        "text": "The motor received exactly 14 energy units"
      },
      {
        "id": "b",
        "text": "The spoon gained a calculated amount of energy"
      },
      {
        "id": "c",
        "text": "Transfer and transformation must be distinguished by formula"
      },
      {
        "id": "d",
        "text": "The warmer spoon and turning motor qualitatively support transfer claims"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The lesson uses qualitative observations only."
  },
  {
    "id": "science-u02-l03-q13",
    "conceptTag": "transfer-effect-reasoning",
    "reviewCardId": "science-u02-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which detail is irrelevant to the electric-current claim?",
    "choices": [
      {
        "id": "a",
        "text": "The motor casing is the observer’s favorite color"
      },
      {
        "id": "b",
        "text": "The battery and motor are connected"
      },
      {
        "id": "c",
        "text": "The shaft turns when connected"
      },
      {
        "id": "d",
        "text": "The shaft stops when the path opens"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Favorite color does not describe the transfer effect."
  }
];

const scienceU02L03Lesson: Lesson = {
  ...scienceU02L03Core,
  quiz: { passThreshold: 8, pool: scienceU02L03Questions },
};

const scienceU02L04Core = {
  "id": "science-u02-l04",
  "unitId": "science-u02",
  "title": "Compare Energy Transfer Observations",
  "indicatorCodes": [
    "4-PS3-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Four evidence cards describe sound, light, heat, and electric-current cases."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "A strong comparison organizes each source, route, receiver, and observable effect."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will choose only relevant observations and build a claim across cases."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s make a careful four-route evidence chart!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u02-l04-c1",
      "title": "Organize four transfer cases",
      "blocks": [
        {
          "kind": "text",
          "text": "Use four headings for every case: source, transfer route, receiver, and observed effect. This common structure makes different cases comparable."
        },
        {
          "kind": "example",
          "text": "Sound: tuning fork, sound, paper bits, trembling. Light: flashlight, light, card, brighter. Heat: warm water, heat, spoon, warmer. Electric current: battery, current, motor, turning."
        },
        {
          "kind": "tip",
          "text": "Support: Read one row at a time and point to source → route → receiver → effect."
        }
      ]
    },
    {
      "id": "science-u02-l04-c2",
      "title": "Choose relevant observations",
      "blocks": [
        {
          "kind": "text",
          "text": "Relevant evidence describes a receiver change tied to the question. Colors, names, and preferences are irrelevant unless they are the measured effect."
        },
        {
          "kind": "example",
          "text": "Useful observations are trembling paper, a brighter card, a warmer spoon, and a turning motor. A blue pencil is unrelated."
        },
        {
          "kind": "tip",
          "text": "Response frame: The observation ____ is relevant because it describes a change in the ____."
        }
      ]
    },
    {
      "id": "science-u02-l04-c3",
      "title": "Build a comparison claim",
      "blocks": [
        {
          "kind": "text",
          "text": "A comparison claim names a pattern and supports it with observations from more than one case. It does not say all routes cause the same effect."
        },
        {
          "kind": "example",
          "text": "Across the four cases, energy transfer is supported by different receiver effects: motion, brightness, warming, and turning."
        },
        {
          "kind": "tip",
          "text": "Stretch: Use evidence from three routes, then state one limit: the observations support transfer qualitatively but do not give exact energy amounts."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Compare Energy Transfer Observations",
    "steps": [
      "Place the four written cases under source, route, receiver, and effect headings.",
      "Remove unrelated details such as object color or the observer’s favorite case.",
      "Notice that every relevant row includes a change at a receiver, although the kinds of change differ.",
      "Claim that sound, light, heat, and electric current can transfer energy from place to place, supported by the listed qualitative observations."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU02L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u02-l04-q01",
    "conceptTag": "transfer-case-features",
    "reviewCardId": "science-u02-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which row is organized correctly?",
    "choices": [
      {
        "id": "a",
        "text": "tuning fork | sound | paper bits | trembling"
      },
      {
        "id": "b",
        "text": "paper bits | heat | tuning fork | blue"
      },
      {
        "id": "c",
        "text": "flashlight | current | spoon | turning"
      },
      {
        "id": "d",
        "text": "battery | light | card | warmer"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The row correctly orders source, route, receiver, and effect."
  },
  {
    "id": "science-u02-l04-q02",
    "conceptTag": "transfer-case-features",
    "reviewCardId": "science-u02-l04-c1",
    "type": "sort",
    "prompt": "Order the four parts of a transfer evidence row.",
    "items": [
      {
        "id": "receiver",
        "text": "Receiver"
      },
      {
        "id": "effect",
        "text": "Observed effect"
      },
      {
        "id": "source",
        "text": "Source"
      },
      {
        "id": "route",
        "text": "Transfer route"
      }
    ],
    "correctOrder": [
      "source",
      "route",
      "receiver",
      "effect"
    ],
    "explanation": "The common comparison order is source, route, receiver, effect."
  },
  {
    "id": "science-u02-l04-q03",
    "conceptTag": "transfer-case-features",
    "reviewCardId": "science-u02-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which receiver belongs to the light case?",
    "choices": [
      {
        "id": "a",
        "text": "Tuning fork"
      },
      {
        "id": "b",
        "text": "Card"
      },
      {
        "id": "c",
        "text": "Warm water"
      },
      {
        "id": "d",
        "text": "Battery"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The card receives the flashlight’s light."
  },
  {
    "id": "science-u02-l04-q04",
    "conceptTag": "transfer-case-features",
    "reviewCardId": "science-u02-l04-c1",
    "type": "true-false",
    "prompt": "The four cases can be compared with the same source-route-receiver-effect headings.",
    "choices": [
      {
        "id": "true",
        "text": "True — common headings organize the cases"
      },
      {
        "id": "false",
        "text": "False — different routes cannot be compared"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The common structure supports comparison."
  },
  {
    "id": "science-u02-l04-q05",
    "conceptTag": "relevant-transfer-observations",
    "reviewCardId": "science-u02-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which detail is relevant evidence in the sound case?",
    "choices": [
      {
        "id": "a",
        "text": "The fork is silver"
      },
      {
        "id": "b",
        "text": "The table is rectangular"
      },
      {
        "id": "c",
        "text": "The paper bits trembled"
      },
      {
        "id": "d",
        "text": "The observer likes music"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Trembling paper describes the receiver effect."
  },
  {
    "id": "science-u02-l04-q06",
    "conceptTag": "relevant-transfer-observations",
    "reviewCardId": "science-u02-l04-c2",
    "type": "true-false",
    "prompt": "A motor’s brand name is relevant evidence that electric current transferred energy.",
    "choices": [
      {
        "id": "true",
        "text": "True — names show transfer"
      },
      {
        "id": "false",
        "text": "False — the turning shaft is the relevant effect"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "A brand name does not describe a receiver change."
  },
  {
    "id": "science-u02-l04-q07",
    "conceptTag": "relevant-transfer-observations",
    "reviewCardId": "science-u02-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which observation belongs to the heat case?",
    "choices": [
      {
        "id": "a",
        "text": "The paper bits trembled"
      },
      {
        "id": "b",
        "text": "The card appeared brighter"
      },
      {
        "id": "c",
        "text": "The motor turned"
      },
      {
        "id": "d",
        "text": "The spoon became warmer"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Warming is the stated effect in the heat case."
  },
  {
    "id": "science-u02-l04-q08",
    "conceptTag": "relevant-transfer-observations",
    "reviewCardId": "science-u02-l04-c2",
    "type": "multiple-choice",
    "prompt": "Why is “the model completed” not transfer evidence?",
    "choices": [
      {
        "id": "a",
        "text": "It reports app state rather than a receiver change in the physical case"
      },
      {
        "id": "b",
        "text": "It is too short"
      },
      {
        "id": "c",
        "text": "It names no color"
      },
      {
        "id": "d",
        "text": "It uses the word model"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Completion does not observe the physical phenomenon."
  },
  {
    "id": "science-u02-l04-q09",
    "conceptTag": "transfer-comparison-claim",
    "reviewCardId": "science-u02-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which comparison claim uses evidence from two routes?",
    "choices": [
      {
        "id": "a",
        "text": "Every route makes objects brighter"
      },
      {
        "id": "b",
        "text": "Paper bits trembled with sound, while a card brightened with light"
      },
      {
        "id": "c",
        "text": "Energy labels were physical observations in all cases"
      },
      {
        "id": "d",
        "text": "Only motors can receive energy"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It cites different effects for sound and light."
  },
  {
    "id": "science-u02-l04-q10",
    "conceptTag": "transfer-comparison-claim",
    "reviewCardId": "science-u02-l04-c3",
    "type": "true-false",
    "prompt": "Different transfer routes may produce different observable effects.",
    "choices": [
      {
        "id": "true",
        "text": "True — effects depend on the route and receiver"
      },
      {
        "id": "false",
        "text": "False — every effect must be identical"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The cases include motion, brightness, warming, and turning."
  },
  {
    "id": "science-u02-l04-q11",
    "conceptTag": "transfer-comparison-claim",
    "reviewCardId": "science-u02-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which conclusion is supported by all four cases?",
    "choices": [
      {
        "id": "a",
        "text": "Every receiver moved"
      },
      {
        "id": "b",
        "text": "Every source was a battery"
      },
      {
        "id": "c",
        "text": "Each case described a receiver change linked to a transfer route"
      },
      {
        "id": "d",
        "text": "Exact energy amounts were measured"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Each written case includes a relevant qualitative change."
  },
  {
    "id": "science-u02-l04-q12",
    "conceptTag": "transfer-comparison-claim",
    "reviewCardId": "science-u02-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which limitation should be included?",
    "choices": [
      {
        "id": "a",
        "text": "The observations prove every future result"
      },
      {
        "id": "b",
        "text": "The activity supplied an exact energy measurement"
      },
      {
        "id": "c",
        "text": "The cases directly recorded energy itself"
      },
      {
        "id": "d",
        "text": "The observations support qualitative transfer claims, not exact energy amounts"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The PE excludes quantitative energy measurement."
  },
  {
    "id": "science-u02-l04-q13",
    "conceptTag": "transfer-comparison-claim",
    "reviewCardId": "science-u02-l04-c3",
    "type": "fill-blank",
    "prompt": "Complete the claim: Each case includes an observed change at the ___.",
    "acceptedAnswers": [
      "receiver"
    ],
    "explanation": "The receiver is where the compared effect occurs."
  }
];

const scienceU02L04Lesson: Lesson = {
  ...scienceU02L04Core,
  quiz: { passThreshold: 8, pool: scienceU02L04Questions },
};

export const unit02Lessons: Lesson[] = [
  scienceU02L01Lesson,
  scienceU02L02Lesson,
  scienceU02L03Lesson,
  scienceU02L04Lesson,
];
