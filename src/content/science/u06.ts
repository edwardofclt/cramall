import { scienceWorkshopForCard } from './workshop-registration';
import type { Lesson } from '../schema';

const scienceU06L01Core = {
  "id": "science-u06-l01",
  "unitId": "science-u06",
  "title": "Explain Plant Structures as a System",
  "indicatorCodes": [
    "4-LS1-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A blackberry plant survives because several visible structures do different jobs together."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Roots, stems, leaves, flowers, and thorns contribute to one whole system."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will connect each structure to a function and build a system argument."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s see how the parts support the whole plant!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u06-l01-c1",
      "title": "Identify visible plant structures",
      "blocks": [
        {
          "kind": "text",
          "text": "External plant structures include roots, stems, leaves, flowers, and thorns. Identify the structure before explaining its job."
        },
        {
          "kind": "example",
          "text": "On the blackberry plant, roots extend into soil, stems hold leaves and flowers, leaves spread outward, flowers grow at stem tips, and thorns line stems."
        },
        {
          "kind": "tip",
          "text": "Support: Label the five structures on a whole-plant sketch before adding any function arrows."
        }
      ]
    },
    {
      "id": "science-u06-l01-c2",
      "title": "Connect structures and functions",
      "blocks": [
        {
          "kind": "text",
          "text": "Roots anchor and take in water; stems support and move materials; leaves capture sunlight; flowers support reproduction; thorns can discourage some animals from feeding."
        },
        {
          "kind": "example",
          "text": "A function explains how a structure contributes to survival, growth, behavior, or reproduction."
        },
        {
          "kind": "tip",
          "text": "Response frame: The ____ helps the plant ____ by ____."
        }
      ]
    },
    {
      ...scienceWorkshopForCard('science-u06-l01-c3'),
      "id": "science-u06-l01-c3",
      "title": "Argue how structures work together",
      "blocks": [
        {
          "kind": "text",
          "text": "A system argument connects more than one structure. No single part performs every job."
        },
        {
          "kind": "example",
          "text": "Roots supply water, stems support and connect the plant, leaves capture sunlight, and flowers support reproduction. Together they support growth and continuation."
        },
        {
          "kind": "tip",
          "text": "Stretch: Make a claim about the plant system, cite three structure-function pairs, and explain how their jobs connect."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Explain Plant Structures as a System",
    "steps": [
      "Claim that the blackberry plant’s structures function together as a system.",
      "Cite roots taking in water, stems supporting leaves, and leaves capturing sunlight.",
      "Add flowers supporting reproduction and thorns helping protect stems and leaves.",
      "Reason that combined jobs support survival, growth, and reproduction better than any one structure alone."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU06L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u06-l01-q01",
    "conceptTag": "plant-structures",
    "reviewCardId": "science-u06-l01-c1",
    "type": "multiple-choice",
    "prompt": "Which is a visible plant structure?",
    "choices": [
      {
        "id": "a",
        "text": "A root"
      },
      {
        "id": "b",
        "text": "A thought"
      },
      {
        "id": "c",
        "text": "A code value"
      },
      {
        "id": "d",
        "text": "A sound route"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Roots are plant structures."
  },
  {
    "id": "science-u06-l01-q02",
    "conceptTag": "plant-structures",
    "reviewCardId": "science-u06-l01-c1",
    "type": "true-false",
    "prompt": "Leaves and stems are different plant structures.",
    "choices": [
      {
        "id": "true",
        "text": "True — they are distinct parts"
      },
      {
        "id": "false",
        "text": "False — they are the same structure"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "They have different forms and jobs."
  },
  {
    "id": "science-u06-l01-q03",
    "conceptTag": "plant-structures",
    "reviewCardId": "science-u06-l01-c1",
    "type": "multiple-choice",
    "prompt": "Blackberry description: Thorns grow along its stems. Where are the thorns described?",
    "choices": [
      {
        "id": "a",
        "text": "On flowers only"
      },
      {
        "id": "b",
        "text": "Along stems"
      },
      {
        "id": "c",
        "text": "Inside soil as roots"
      },
      {
        "id": "d",
        "text": "On a map key"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The example places thorns on stems."
  },
  {
    "id": "science-u06-l01-q04",
    "conceptTag": "plant-structures",
    "reviewCardId": "science-u06-l01-c1",
    "type": "fill-blank",
    "prompt": "The structures that spread outward and capture sunlight are ___.",
    "acceptedAnswers": [
      "leaves"
    ],
    "explanation": "Leaves are the named structures."
  },
  {
    "id": "science-u06-l01-q05",
    "conceptTag": "plant-structure-functions",
    "reviewCardId": "science-u06-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which pair is correct?",
    "choices": [
      {
        "id": "a",
        "text": "flower—anchors in soil"
      },
      {
        "id": "b",
        "text": "thorn—captures sunlight"
      },
      {
        "id": "c",
        "text": "root—takes in water"
      },
      {
        "id": "d",
        "text": "leaf—moves through air"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Roots take in water."
  },
  {
    "id": "science-u06-l01-q06",
    "conceptTag": "plant-structure-functions",
    "reviewCardId": "science-u06-l01-c2",
    "type": "true-false",
    "prompt": "Flowers can support plant reproduction.",
    "choices": [
      {
        "id": "true",
        "text": "True — reproduction is one system function"
      },
      {
        "id": "false",
        "text": "False — flowers only anchor plants"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Flowers contribute to reproduction."
  },
  {
    "id": "science-u06-l01-q07",
    "conceptTag": "plant-structure-functions",
    "reviewCardId": "science-u06-l01-c2",
    "type": "multiple-choice",
    "prompt": "What is a main stem function?",
    "choices": [
      {
        "id": "a",
        "text": "Produce sound"
      },
      {
        "id": "b",
        "text": "Enter the brain"
      },
      {
        "id": "c",
        "text": "Decode a grid"
      },
      {
        "id": "d",
        "text": "Support plant parts and move materials"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Stems support and connect the plant."
  },
  {
    "id": "science-u06-l01-q08",
    "conceptTag": "plant-structure-functions",
    "reviewCardId": "science-u06-l01-c2",
    "type": "multiple-choice",
    "prompt": "How can thorns support survival?",
    "choices": [
      {
        "id": "a",
        "text": "They can discourage some animals from feeding"
      },
      {
        "id": "b",
        "text": "They pull water from soil"
      },
      {
        "id": "c",
        "text": "They replace all leaves"
      },
      {
        "id": "d",
        "text": "They make exact energy visible"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Thorns can help protect the plant."
  },
  {
    "id": "science-u06-l01-q09",
    "conceptTag": "plant-system-argument",
    "reviewCardId": "science-u06-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which claim describes a system?",
    "choices": [
      {
        "id": "a",
        "text": "Roots do every plant job"
      },
      {
        "id": "b",
        "text": "Several structures with different functions work together"
      },
      {
        "id": "c",
        "text": "Flowers are the only needed structure"
      },
      {
        "id": "d",
        "text": "Structures never affect survival"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "A system combines cooperating parts."
  },
  {
    "id": "science-u06-l01-q10",
    "conceptTag": "plant-system-argument",
    "reviewCardId": "science-u06-l01-c3",
    "type": "true-false",
    "prompt": "One plant structure must perform every function in the system.",
    "choices": [
      {
        "id": "true",
        "text": "True — one part does all jobs"
      },
      {
        "id": "false",
        "text": "False — different parts contribute different functions"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Cooperation defines the system."
  },
  {
    "id": "science-u06-l01-q11",
    "conceptTag": "plant-system-argument",
    "reviewCardId": "science-u06-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which evidence set best supports growth?",
    "choices": [
      {
        "id": "a",
        "text": "Flower color and label style"
      },
      {
        "id": "b",
        "text": "Thorn count only"
      },
      {
        "id": "c",
        "text": "Roots take in water, stems support leaves, and leaves capture sunlight"
      },
      {
        "id": "d",
        "text": "The observer likes berries"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It links multiple functions."
  },
  {
    "id": "science-u06-l01-q12",
    "conceptTag": "plant-system-argument",
    "reviewCardId": "science-u06-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which reasoning connects the evidence?",
    "choices": [
      {
        "id": "a",
        "text": "Every structure is identical"
      },
      {
        "id": "b",
        "text": "Roots are underground, so leaves are unneeded"
      },
      {
        "id": "c",
        "text": "Flowers prove all plants have thorns"
      },
      {
        "id": "d",
        "text": "Water intake, support, and light capture cooperate to support growth"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It explains how the jobs connect."
  },
  {
    "id": "science-u06-l01-q13",
    "conceptTag": "plant-system-argument",
    "reviewCardId": "science-u06-l01-c3",
    "type": "fill-blank",
    "prompt": "Complete the claim: Plant structures function together as a ___.",
    "acceptedAnswers": [
      "system"
    ],
    "explanation": "The lesson’s central idea is a structure system."
  }
];

const scienceU06L01Lesson: Lesson = {
  ...scienceU06L01Core,
  quiz: { passThreshold: 8, pool: scienceU06L01Questions },
};

const scienceU06L02Core = {
  "id": "science-u06-l02",
  "unitId": "science-u06",
  "title": "Explain Animal Structures as a System",
  "indicatorCodes": [
    "4-LS1-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A Carolina wren gathers food, moves, breathes, and stays protected through cooperating structures."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Some structures are external, such as beak, wings, and skin; others, such as heart and lungs, are internal."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will match structures to functions and explain a whole-animal system."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s connect each part to the jobs it supports!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u06-l02-c1",
      "title": "Identify internal and external structures",
      "blocks": [
        {
          "kind": "text",
          "text": "External structures are visible on the outside, including beak, wings, feet, feathers, and skin. Internal structures include heart and lungs."
        },
        {
          "kind": "example",
          "text": "A wren uses its beak and wings outside its body, while heart and lungs work inside."
        },
        {
          "kind": "tip",
          "text": "Support: Sort each named structure into outside or inside before naming its function."
        }
      ]
    },
    {
      "id": "science-u06-l02-c2",
      "title": "Match structures to functions",
      "blocks": [
        {
          "kind": "text",
          "text": "A beak gathers food; wings move the bird through air; lungs take in air; heart moves blood; skin and feathers help protect the body."
        },
        {
          "kind": "example",
          "text": "Match the specific structure to the function it can perform. The activity is a simplified model, not an observation of a living bird."
        },
        {
          "kind": "tip",
          "text": "Response frame: The wren’s ____ helps it ____ ."
        }
      ],
      "widget": {
        "type": "animal-structure-matcher",
        "config": {
          "pairs": [
            {
              "id": "beak",
              "animal": "wren",
              "structure": "beak",
              "function": "gathers food",
              "kind": "external"
            },
            {
              "id": "wing",
              "animal": "wren",
              "structure": "wing",
              "function": "moves through air",
              "kind": "external"
            },
            {
              "id": "lungs",
              "animal": "wren",
              "structure": "lungs",
              "function": "takes in air",
              "kind": "internal"
            }
          ]
        }
      },
      "widgetCoach": {
  "intro": [
    {
      "speaker": "guide",
      "pose": "talk",
      "text": "A wren’s body parts do different jobs that help it live."
    },
    {
      "speaker": "kid",
      "text": "I’ll connect each part to its job, then choose two parts that work together."
    }
  ],
  "reactions": {
    "strategy": {
      "text": "Think about what the selected body part helps the animal do.",
      "pose": "think"
    },
    "retry": {
      "text": "Revisit that match or choose one internal and one external part from the same animal.",
      "pose": "think"
    },
    "milestone": {
      "text": "Your matches are ready. Choose two structures for the cooperating system.",
      "pose": "talk"
    },
    "complete": {
      "text": "You connected the different jobs of an internal and an external structure.",
      "pose": "cheer"
    }
  }
}
    },
    {
      "id": "science-u06-l02-c3",
      "title": "Explain a cooperating system",
      "blocks": [
        {
          "kind": "text",
          "text": "Structures cooperate: the beak gathers food, lungs support breathing, heart moves blood, wings enable movement, and skin/feathers protect."
        },
        {
          "kind": "example",
          "text": "The system supports survival and behavior because the bird can get food, use air, move, and protect its body."
        },
        {
          "kind": "tip",
          "text": "Stretch: Explain one external and two internal structures in a connected system argument."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Explain Animal Structures as a System",
    "steps": [
      "Classify beak and wings as external, heart and lungs as internal.",
      "Match beak with gathering food, wings with moving through air, lungs with taking in air, and heart with moving blood.",
      "Add skin and feathers as protective external structures.",
      "Explain that these different functions cooperate to support the wren’s survival and behavior."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU06L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u06-l02-q01",
    "conceptTag": "animal-structures",
    "reviewCardId": "science-u06-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which is an external structure?",
    "choices": [
      {
        "id": "a",
        "text": "Beak"
      },
      {
        "id": "b",
        "text": "Heart"
      },
      {
        "id": "c",
        "text": "Lungs"
      },
      {
        "id": "d",
        "text": "Brain"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "A beak is outside the body."
  },
  {
    "id": "science-u06-l02-q02",
    "conceptTag": "animal-structures",
    "reviewCardId": "science-u06-l02-c1",
    "type": "true-false",
    "prompt": "Heart and lungs are internal structures.",
    "choices": [
      {
        "id": "true",
        "text": "True — they are inside the body"
      },
      {
        "id": "false",
        "text": "False — they are external coverings"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "They are internal organs."
  },
  {
    "id": "science-u06-l02-q03",
    "conceptTag": "animal-structures",
    "reviewCardId": "science-u06-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which pair contains one external and one internal structure?",
    "choices": [
      {
        "id": "a",
        "text": "heart and lungs"
      },
      {
        "id": "b",
        "text": "wing and heart"
      },
      {
        "id": "c",
        "text": "beak and skin"
      },
      {
        "id": "d",
        "text": "lungs and brain"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Wing is external and heart internal."
  },
  {
    "id": "science-u06-l02-q04",
    "conceptTag": "animal-structures",
    "reviewCardId": "science-u06-l02-c1",
    "type": "fill-blank",
    "prompt": "The internal structure that takes in air is the ___.",
    "acceptedAnswers": [
      "lungs",
      "lung"
    ],
    "explanation": "Lungs support breathing."
  },
  {
    "id": "science-u06-l02-q05",
    "conceptTag": "animal-structure-functions",
    "reviewCardId": "science-u06-l02-c2",
    "type": "multiple-choice",
    "prompt": "What function matches the wren’s beak?",
    "choices": [
      {
        "id": "a",
        "text": "Moves blood"
      },
      {
        "id": "b",
        "text": "Takes in air"
      },
      {
        "id": "c",
        "text": "Gathers food"
      },
      {
        "id": "d",
        "text": "Moves through air"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The beak gathers food."
  },
  {
    "id": "science-u06-l02-q06",
    "conceptTag": "animal-structure-functions",
    "reviewCardId": "science-u06-l02-c2",
    "type": "true-false",
    "prompt": "Wings can help a wren move through air.",
    "choices": [
      {
        "id": "true",
        "text": "True — that is their matched function"
      },
      {
        "id": "false",
        "text": "False — wings gather food"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Wings support flight."
  },
  {
    "id": "science-u06-l02-q07",
    "conceptTag": "animal-structure-functions",
    "reviewCardId": "science-u06-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which structure moves blood?",
    "choices": [
      {
        "id": "a",
        "text": "Beak"
      },
      {
        "id": "b",
        "text": "Wing"
      },
      {
        "id": "c",
        "text": "Skin"
      },
      {
        "id": "d",
        "text": "Heart"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The heart moves blood."
  },
  {
    "id": "science-u06-l02-q08",
    "conceptTag": "animal-structure-functions",
    "reviewCardId": "science-u06-l02-c2",
    "type": "multiple-choice",
    "prompt": "On-screen matcher: pair a wren’s beak with gathering food, wings with flight, heart with moving blood, and lungs with taking in air. What does the matcher provide?",
    "choices": [
      {
        "id": "a",
        "text": "A simplified structure-function model"
      },
      {
        "id": "b",
        "text": "An observation of a living wren"
      },
      {
        "id": "c",
        "text": "A medical measurement"
      },
      {
        "id": "d",
        "text": "Proof of survival"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It is an authored matching model."
  },
  {
    "id": "science-u06-l02-q09",
    "conceptTag": "animal-system-explanation",
    "reviewCardId": "science-u06-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which explanation describes cooperation?",
    "choices": [
      {
        "id": "a",
        "text": "The beak performs every job"
      },
      {
        "id": "b",
        "text": "The beak gathers food while lungs and heart support the body and wings enable movement"
      },
      {
        "id": "c",
        "text": "Wings replace lungs"
      },
      {
        "id": "d",
        "text": "Skin gathers all food"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It connects different functions."
  },
  {
    "id": "science-u06-l02-q10",
    "conceptTag": "animal-system-explanation",
    "reviewCardId": "science-u06-l02-c3",
    "type": "true-false",
    "prompt": "Animal survival can depend on internal and external structures working together.",
    "choices": [
      {
        "id": "true",
        "text": "True — both groups contribute"
      },
      {
        "id": "false",
        "text": "False — only external parts matter"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The PE emphasizes a system."
  },
  {
    "id": "science-u06-l02-q11",
    "conceptTag": "animal-system-explanation",
    "reviewCardId": "science-u06-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which evidence supports behavior and survival?",
    "choices": [
      {
        "id": "a",
        "text": "The bird’s name"
      },
      {
        "id": "b",
        "text": "Its feather color only"
      },
      {
        "id": "c",
        "text": "Wings move it and a beak gathers food"
      },
      {
        "id": "d",
        "text": "The model button works"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Movement and feeding are relevant functions."
  },
  {
    "id": "science-u06-l02-q12",
    "conceptTag": "animal-system-explanation",
    "reviewCardId": "science-u06-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which statement stays at the correct scale?",
    "choices": [
      {
        "id": "a",
        "text": "Describe unnamed cell reactions"
      },
      {
        "id": "b",
        "text": "Explain tiny tissue chemistry"
      },
      {
        "id": "c",
        "text": "Calculate blood pressure"
      },
      {
        "id": "d",
        "text": "The heart moves blood and lungs take in air"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It uses organ-level functions."
  },
  {
    "id": "science-u06-l02-q13",
    "conceptTag": "animal-system-explanation",
    "reviewCardId": "science-u06-l02-c3",
    "type": "fill-blank",
    "prompt": "A beak, wings, heart, and lungs can function together in a ___.",
    "acceptedAnswers": [
      "system"
    ],
    "explanation": "These structures cooperate as a system."
  }
];

const scienceU06L02Lesson: Lesson = {
  ...scienceU06L02Core,
  quiz: { passThreshold: 8, pool: scienceU06L02Questions },
};

const scienceU06L03Core = {
  "id": "science-u06-l03",
  "unitId": "science-u06",
  "title": "Argue How Structures Support Survival",
  "indicatorCodes": [
    "4-LS1-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Two observation cards describe a blackberry plant during a dry week and a wren feeding and flying."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "An argument needs a claim, relevant evidence, and reasoning that links structures to survival functions."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will choose evidence from the supplied observations and avoid unsupported body details."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s build a claim another reader can check!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u06-l03-c1",
      "title": "State a structure-system claim",
      "blocks": [
        {
          "kind": "text",
          "text": "A focused claim answers how a set of structures supports survival, growth, behavior, or reproduction."
        },
        {
          "kind": "example",
          "text": "Claim: The blackberry plant’s roots, stems, and leaves function together to support survival and growth during the dry week."
        },
        {
          "kind": "tip",
          "text": "Support: Begin with The ____ structures function together to support ____ ."
        }
      ]
    },
    {
      "id": "science-u06-l03-c2",
      "title": "Select relevant survival evidence",
      "blocks": [
        {
          "kind": "text",
          "text": "Plant card: deep roots reached damp soil, the upright stem held leaves in sunlight, and leaves remained spread. Wren card: beak gathered insects, wings carried the bird to cover, and feathers protected its body."
        },
        {
          "kind": "example",
          "text": "Choose observations that name a structure and what it did. Do not use card color or the observer’s preference."
        },
        {
          "kind": "tip",
          "text": "Response frame: The observation ____ is relevant because it shows the ____ performing ____."
        }
      ]
    },
    {
      ...scienceWorkshopForCard('science-u06-l03-c3'),
      "id": "science-u06-l03-c3",
      "title": "Connect evidence with reasoning",
      "blocks": [
        {
          "kind": "text",
          "text": "Reasoning explains why the functions in the evidence matter to the claim. It connects parts into a system rather than listing them."
        },
        {
          "kind": "example",
          "text": "Roots supplying water and stems holding leaves in light support plant growth; beak feeding and wing movement support the wren’s survival and behavior."
        },
        {
          "kind": "tip",
          "text": "Stretch: Write claim-evidence-reasoning with two structures and explain how the functions cooperate, then name one evidence limit."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Argue How Structures Support Survival",
    "steps": [
      "Claim that the blackberry plant’s structures cooperate during the dry week.",
      "Cite roots reaching damp soil and stems holding leaves in sunlight.",
      "Reason that water access plus supported leaves helps the plant continue growing.",
      "Limit the argument to the supplied whole-plant observations; do not invent an internal cause."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU06L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u06-l03-q01",
    "conceptTag": "structure-claim",
    "reviewCardId": "science-u06-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which is a focused system claim?",
    "choices": [
      {
        "id": "a",
        "text": "Blackberry roots, stems, and leaves work together to support growth"
      },
      {
        "id": "b",
        "text": "Plants are nice"
      },
      {
        "id": "c",
        "text": "Every plant survives every drought"
      },
      {
        "id": "d",
        "text": "Leaves do every job"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It answers the structure-system question."
  },
  {
    "id": "science-u06-l03-q02",
    "conceptTag": "structure-claim",
    "reviewCardId": "science-u06-l03-c1",
    "type": "true-false",
    "prompt": "A claim should answer the question being argued.",
    "choices": [
      {
        "id": "true",
        "text": "True — it states the position"
      },
      {
        "id": "false",
        "text": "False — claims should be unrelated"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A focused claim guides the evidence."
  },
  {
    "id": "science-u06-l03-q03",
    "conceptTag": "structure-claim",
    "reviewCardId": "science-u06-l03-c1",
    "type": "multiple-choice",
    "prompt": "Which claim concerns wren survival?",
    "choices": [
      {
        "id": "a",
        "text": "Wrens are small"
      },
      {
        "id": "b",
        "text": "Beak, wings, and feathers support feeding, movement, and protection"
      },
      {
        "id": "c",
        "text": "All birds behave identically"
      },
      {
        "id": "d",
        "text": "Feathers replace lungs"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It connects named structures and functions."
  },
  {
    "id": "science-u06-l03-q04",
    "conceptTag": "structure-claim",
    "reviewCardId": "science-u06-l03-c1",
    "type": "fill-blank",
    "prompt": "The first part of a science argument is the ___.",
    "acceptedAnswers": [
      "claim"
    ],
    "explanation": "The claim answers the question."
  },
  {
    "id": "science-u06-l03-q05",
    "conceptTag": "structure-evidence",
    "reviewCardId": "science-u06-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which observation is relevant to the plant claim?",
    "choices": [
      {
        "id": "a",
        "text": "The card has green ink"
      },
      {
        "id": "b",
        "text": "The observer likes berries"
      },
      {
        "id": "c",
        "text": "Deep roots reached damp soil"
      },
      {
        "id": "d",
        "text": "The heading has six words"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It names a structure and action."
  },
  {
    "id": "science-u06-l03-q06",
    "conceptTag": "structure-evidence",
    "reviewCardId": "science-u06-l03-c2",
    "type": "true-false",
    "prompt": "A wren’s beak gathering insects is relevant survival evidence.",
    "choices": [
      {
        "id": "true",
        "text": "True — it shows a feeding function"
      },
      {
        "id": "false",
        "text": "False — feeding is unrelated"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Obtaining food supports survival."
  },
  {
    "id": "science-u06-l03-q07",
    "conceptTag": "structure-evidence",
    "reviewCardId": "science-u06-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which detail should be excluded?",
    "choices": [
      {
        "id": "a",
        "text": "Wings carried the wren to cover"
      },
      {
        "id": "b",
        "text": "Feathers protected the body"
      },
      {
        "id": "c",
        "text": "The stem held leaves upright"
      },
      {
        "id": "d",
        "text": "The evidence card had a blue border"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Border color does not show a function."
  },
  {
    "id": "science-u06-l03-q08",
    "conceptTag": "structure-evidence",
    "reviewCardId": "science-u06-l03-c2",
    "type": "multiple-choice",
    "prompt": "Why are two structure observations useful?",
    "choices": [
      {
        "id": "a",
        "text": "They can show how different functions contribute to a system"
      },
      {
        "id": "b",
        "text": "They prove every future outcome"
      },
      {
        "id": "c",
        "text": "They replace reasoning"
      },
      {
        "id": "d",
        "text": "They make cells visible"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Multiple relevant parts support a system claim."
  },
  {
    "id": "science-u06-l03-q09",
    "conceptTag": "structure-argument",
    "reviewCardId": "science-u06-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which reasoning connects roots and leaves?",
    "choices": [
      {
        "id": "a",
        "text": "Both have letters"
      },
      {
        "id": "b",
        "text": "Roots supply water while supported leaves capture sunlight, so their functions cooperate in growth"
      },
      {
        "id": "c",
        "text": "Leaves are above roots"
      },
      {
        "id": "d",
        "text": "All structures are the same"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It explains the functional link."
  },
  {
    "id": "science-u06-l03-q10",
    "conceptTag": "structure-argument",
    "reviewCardId": "science-u06-l03-c3",
    "type": "true-false",
    "prompt": "A list of structures without function reasoning is a complete argument.",
    "choices": [
      {
        "id": "true",
        "text": "True — names alone are enough"
      },
      {
        "id": "false",
        "text": "False — reasoning must connect evidence to the claim"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "An argument needs the link."
  },
  {
    "id": "science-u06-l03-q11",
    "conceptTag": "structure-argument",
    "reviewCardId": "science-u06-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which sentence is reasoning?",
    "choices": [
      {
        "id": "a",
        "text": "The root was visible"
      },
      {
        "id": "b",
        "text": "The stem was upright"
      },
      {
        "id": "c",
        "text": "Access to water and supported leaves helps the plant continue growing"
      },
      {
        "id": "d",
        "text": "The card was read Tuesday"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It connects functions to growth."
  },
  {
    "id": "science-u06-l03-q12",
    "conceptTag": "structure-argument",
    "reviewCardId": "science-u06-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which limit is honest?",
    "choices": [
      {
        "id": "a",
        "text": "The observations prove all plants behave alike"
      },
      {
        "id": "b",
        "text": "The model observed survival"
      },
      {
        "id": "c",
        "text": "The evidence shows internal cell reactions"
      },
      {
        "id": "d",
        "text": "The claim is limited to the supplied structures and observations"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It avoids unsupported generalization."
  },
  {
    "id": "science-u06-l03-q13",
    "conceptTag": "structure-argument",
    "reviewCardId": "science-u06-l03-c3",
    "type": "fill-blank",
    "prompt": "Evidence plus reasoning should support the ___.",
    "acceptedAnswers": [
      "claim"
    ],
    "explanation": "The argument’s parts connect to its claim."
  }
];

const scienceU06L03Lesson: Lesson = {
  ...scienceU06L03Core,
  quiz: { passThreshold: 8, pool: scienceU06L03Questions },
};

const scienceU06L04Core = {
  "id": "science-u06-l04",
  "unitId": "science-u06",
  "title": "Model Sense, Brain, and Response",
  "indicatorCodes": [
    "4-LS1-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A wren hears a sudden branch snap and turns toward the sound."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "This event can be modeled as information received through a sense, processed by the brain, and followed by a response."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare different sense inputs and possible responses at the whole-system level."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s trace information through the animal system!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u06-l04-c1",
      "title": "Receive information through senses",
      "blocks": [
        {
          "kind": "text",
          "text": "Animals receive different information through senses: light through sight, sound through hearing, odors through smell, flavors through taste, and contact through touch."
        },
        {
          "kind": "example",
          "text": "In the branch-snap case, hearing receives sound information. The sound is information about an event, not a command that forces one response."
        },
        {
          "kind": "tip",
          "text": "Support: Name the event, then choose the sense that can receive its information."
        }
      ]
    },
    {
      "id": "science-u06-l04-c2",
      "title": "Route information through the brain",
      "blocks": [
        {
          "kind": "text",
          "text": "A system model routes sense information to the brain for processing. It does not describe tiny structures or how information is stored."
        },
        {
          "kind": "example",
          "text": "Sequence so far: branch sound → hearing information → brain processes the information."
        },
        {
          "kind": "tip",
          "text": "Response frame: The ____ sense receives ____. The information goes to the brain, which ____."
        }
      ]
    },
    {
      ...scienceWorkshopForCard('science-u06-l04-c3'),
      "id": "science-u06-l04-c3",
      "title": "Connect information to a response",
      "blocks": [
        {
          "kind": "text",
          "text": "After processing, an animal may respond in different ways. The same kind of information can lead to turn, pause, move away, approach, or continue, depending on conditions."
        },
        {
          "kind": "example",
          "text": "The wren might turn toward the snap, pause, or fly to cover. Each is a response after hearing information is processed."
        },
        {
          "kind": "tip",
          "text": "Stretch: Model two different valid responses to the same sense input and explain why the system does not require one automatic outcome."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Model Sense, Brain, and Response",
    "steps": [
      "Identify the branch snap as sound information received through hearing.",
      "Route that information to the brain for processing.",
      "Choose the observable response “the wren turns toward the sound.”",
      "Write the model as sound → hearing → brain processing → turning response and state that other responses are possible."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU06L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u06-l04-q01",
    "conceptTag": "sense-input",
    "reviewCardId": "science-u06-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which sense receives the branch-snap information?",
    "choices": [
      {
        "id": "a",
        "text": "Hearing"
      },
      {
        "id": "b",
        "text": "Taste"
      },
      {
        "id": "c",
        "text": "Smell"
      },
      {
        "id": "d",
        "text": "Touch"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "A snap is sound information."
  },
  {
    "id": "science-u06-l04-q02",
    "conceptTag": "sense-input",
    "reviewCardId": "science-u06-l04-c1",
    "type": "true-false",
    "prompt": "Sight can receive light information.",
    "choices": [
      {
        "id": "true",
        "text": "True — light is received through sight"
      },
      {
        "id": "false",
        "text": "False — sight receives only sound"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Sight handles light information."
  },
  {
    "id": "science-u06-l04-q03",
    "conceptTag": "sense-input",
    "reviewCardId": "science-u06-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which pair is correct?",
    "choices": [
      {
        "id": "a",
        "text": "odor—hearing"
      },
      {
        "id": "b",
        "text": "odor—smell"
      },
      {
        "id": "c",
        "text": "sound—taste"
      },
      {
        "id": "d",
        "text": "contact—sight"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Smell receives odor information."
  },
  {
    "id": "science-u06-l04-q04",
    "conceptTag": "sense-input",
    "reviewCardId": "science-u06-l04-c1",
    "type": "fill-blank",
    "prompt": "The sense that receives sound information is ___.",
    "acceptedAnswers": [
      "hearing"
    ],
    "explanation": "Hearing receives the snap."
  },
  {
    "id": "science-u06-l04-q05",
    "conceptTag": "brain-processing-model",
    "reviewCardId": "science-u06-l04-c2",
    "type": "sort",
    "prompt": "Order the system model before the response.",
    "items": [
      {
        "id": "brain",
        "text": "Brain processes the information"
      },
      {
        "id": "event",
        "text": "A branch makes a sound"
      },
      {
        "id": "sense",
        "text": "Hearing receives sound information"
      }
    ],
    "correctOrder": [
      "event",
      "sense",
      "brain"
    ],
    "explanation": "The event produces information, a sense receives it, and the brain processes it."
  },
  {
    "id": "science-u06-l04-q06",
    "conceptTag": "brain-processing-model",
    "reviewCardId": "science-u06-l04-c2",
    "type": "true-false",
    "prompt": "The model needs details about how the brain stores memories.",
    "choices": [
      {
        "id": "true",
        "text": "True — storage mechanisms are required"
      },
      {
        "id": "false",
        "text": "False — the lesson stays at system level"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Memory mechanisms are outside the boundary."
  },
  {
    "id": "science-u06-l04-q07",
    "conceptTag": "brain-processing-model",
    "reviewCardId": "science-u06-l04-c2",
    "type": "multiple-choice",
    "prompt": "What happens after a sense receives information in this model?",
    "choices": [
      {
        "id": "a",
        "text": "The animal must sleep"
      },
      {
        "id": "b",
        "text": "The information disappears"
      },
      {
        "id": "c",
        "text": "The information is processed by the brain"
      },
      {
        "id": "d",
        "text": "The eye sends light"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Brain processing is the next system part."
  },
  {
    "id": "science-u06-l04-q08",
    "conceptTag": "brain-processing-model",
    "reviewCardId": "science-u06-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which sequence is correct?",
    "choices": [
      {
        "id": "a",
        "text": "brain → branch → hearing"
      },
      {
        "id": "b",
        "text": "response → sense → event"
      },
      {
        "id": "c",
        "text": "hearing → event → brain"
      },
      {
        "id": "d",
        "text": "sound event → hearing → brain processing"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It follows the information path."
  },
  {
    "id": "science-u06-l04-q09",
    "conceptTag": "sense-response-system",
    "reviewCardId": "science-u06-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which is an observable response?",
    "choices": [
      {
        "id": "a",
        "text": "The wren turns toward the sound"
      },
      {
        "id": "b",
        "text": "An information label appears"
      },
      {
        "id": "c",
        "text": "A screen result establishes fear"
      },
      {
        "id": "d",
        "text": "A memory is stored in a named place"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Turning is observable behavior."
  },
  {
    "id": "science-u06-l04-q10",
    "conceptTag": "sense-response-system",
    "reviewCardId": "science-u06-l04-c3",
    "type": "true-false",
    "prompt": "The same sound information can be followed by more than one possible response.",
    "choices": [
      {
        "id": "true",
        "text": "True — the animal may turn, pause, or move"
      },
      {
        "id": "false",
        "text": "False — one sound forces one action"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Responses can differ."
  },
  {
    "id": "science-u06-l04-q11",
    "conceptTag": "sense-response-system",
    "reviewCardId": "science-u06-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which complete model is correct?",
    "choices": [
      {
        "id": "a",
        "text": "light → ear → exact response"
      },
      {
        "id": "b",
        "text": "sound → hearing → brain processing → turning"
      },
      {
        "id": "c",
        "text": "odor → wing → memory storage"
      },
      {
        "id": "d",
        "text": "touch → lamp → eye"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It includes input, sense, brain, and response."
  },
  {
    "id": "science-u06-l04-q12",
    "conceptTag": "sense-response-system",
    "reviewCardId": "science-u06-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which statement stays within the boundary?",
    "choices": [
      {
        "id": "a",
        "text": "Name a tiny receptor mechanism"
      },
      {
        "id": "b",
        "text": "Explain where memory is stored"
      },
      {
        "id": "c",
        "text": "The brain processes sense information before a response"
      },
      {
        "id": "d",
        "text": "Describe cells in the eye"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It is a system-level explanation."
  },
  {
    "id": "science-u06-l04-q13",
    "conceptTag": "sense-response-system",
    "reviewCardId": "science-u06-l04-c3",
    "type": "fill-blank",
    "prompt": "After information is processed, the animal may make a ___.",
    "acceptedAnswers": [
      "response"
    ],
    "explanation": "A response is the final system part."
  }
];

const scienceU06L04Lesson: Lesson = {
  ...scienceU06L04Core,
  quiz: { passThreshold: 8, pool: scienceU06L04Questions },
};

export const unit06Lessons: Lesson[] = [
  scienceU06L01Lesson,
  scienceU06L02Lesson,
  scienceU06L03Lesson,
  scienceU06L04Lesson,
];
