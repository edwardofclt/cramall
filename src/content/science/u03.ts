import type { Lesson } from '../schema';

const scienceU03L01Core = {
  "id": "science-u03-l01",
  "unitId": "science-u03",
  "title": "Model Wave Amplitude Patterns",
  "indicatorCodes": [
    "4-PS4-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A rope moved up and down makes a repeating shape that travels along it."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "How can we describe a taller or shorter wave pattern without measuring it?"
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare displacement from a baseline and explain what a wave model can and cannot represent."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s look for a repeating amplitude pattern!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u03-l01-c1",
      "title": "Recognize a repeating wave",
      "blocks": [
        {
          "kind": "text",
          "text": "A repeating wave model has a pattern that returns: crest, baseline, trough, baseline, then repeats."
        },
        {
          "kind": "example",
          "text": "On a rope diagram, each crest is above the baseline and each trough is below it. Matching parts recur in order."
        },
        {
          "kind": "tip",
          "text": "Support: Trace one complete pattern with your finger: crest → baseline → trough → baseline."
        }
      ]
    },
    {
      "id": "science-u03-l01-c2",
      "title": "Compare small and large amplitude",
      "blocks": [
        {
          "kind": "text",
          "text": "Amplitude describes the greatest displacement from the baseline. A larger amplitude wave is drawn with crests and troughs farther from the baseline."
        },
        {
          "kind": "example",
          "text": "Two rope models have the same spacing. Model B has taller crests and deeper troughs, so Model B has larger amplitude."
        },
        {
          "kind": "tip",
          "text": "Response frame: Wave ____ has larger amplitude because its crest and trough are ____ from the baseline."
        }
      ],
      "widget": {
        "type": "wave-maker",
        "config": {
          "medium": "rope",
          "amplitude": 2,
          "frequency": 2,
          "target": {
            "amplitude": 4
          },
          "taskPrompt": "Raise the modeled amplitude to the visible target while keeping the cycle spacing in view."
        }
      },
      "widgetCoach": {
  "intro": [
    {
      "speaker": "guide",
      "pose": "talk",
      "text": "Let’s change the wave’s height while keeping the baseline in view."
    },
    {
      "speaker": "kid",
      "text": "I’ll move the control, compare the starting and changed patterns, and explain the difference."
    }
  ],
  "reactions": {
    "strategy": {
      "text": "Compare the starting pattern with the changed pattern before explaining.",
      "pose": "think"
    },
    "retry": {
      "text": "Compare each crest with the baseline and the target marks, then revise.",
      "pose": "think"
    },
    "milestone": {
      "text": "Your pattern matches the target. Now explain the visible change.",
      "pose": "talk"
    },
    "complete": {
      "text": "You compared wave patterns and explained what amplitude describes.",
      "pose": "cheer"
    }
  }
}
    },
    {
      "id": "science-u03-l01-c3",
      "title": "Explain what the model represents",
      "blocks": [
        {
          "kind": "text",
          "text": "A graph or rope sketch represents a repeating pattern. It is not a photograph of every wave and does not collect evidence from a physical rope."
        },
        {
          "kind": "example",
          "text": "Changing the amplitude control changes vertical displacement in the authored graph. It does not measure a real rope or show an exact distance."
        },
        {
          "kind": "tip",
          "text": "Stretch: State one pattern the model represents and one limitation, using “represents” and “does not measure.”"
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Model Wave Amplitude Patterns",
    "steps": [
      "Locate the baseline on two repeating rope-wave diagrams.",
      "Compare the greatest upward and downward displacement while keeping the spacing pattern alike.",
      "Identify the diagram with crests and troughs farther from the baseline as the larger-amplitude model.",
      "Explain that this is a qualitative representation, not a measurement or physical observation."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU03L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u03-l01-q01",
    "conceptTag": "repeating-wave-model",
    "reviewCardId": "science-u03-l01-c1",
    "type": "multiple-choice",
    "prompt": "Which sequence shows one repeating wave pattern?",
    "choices": [
      {
        "id": "a",
        "text": "crest, baseline, trough, baseline"
      },
      {
        "id": "b",
        "text": "crest, crest, label, stop"
      },
      {
        "id": "c",
        "text": "baseline, color, number, crest"
      },
      {
        "id": "d",
        "text": "trough, title, title, arrow"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The four parts form one repeating cycle."
  },
  {
    "id": "science-u03-l01-q02",
    "conceptTag": "repeating-wave-model",
    "reviewCardId": "science-u03-l01-c1",
    "type": "true-false",
    "prompt": "Matching crests recur in a repeating wave model.",
    "choices": [
      {
        "id": "true",
        "text": "True — matching parts repeat"
      },
      {
        "id": "false",
        "text": "False — no part repeats"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A repeating pattern returns to matching points."
  },
  {
    "id": "science-u03-l01-q03",
    "conceptTag": "repeating-wave-model",
    "reviewCardId": "science-u03-l01-c1",
    "type": "multiple-choice",
    "prompt": "What is the reference line halfway between crest and trough?",
    "choices": [
      {
        "id": "a",
        "text": "The label"
      },
      {
        "id": "b",
        "text": "The baseline"
      },
      {
        "id": "c",
        "text": "The receiver"
      },
      {
        "id": "d",
        "text": "The code"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Amplitude is compared from the baseline."
  },
  {
    "id": "science-u03-l01-q04",
    "conceptTag": "repeating-wave-model",
    "reviewCardId": "science-u03-l01-c1",
    "type": "multiple-choice",
    "prompt": "Which feature best identifies a repeating pattern?",
    "choices": [
      {
        "id": "a",
        "text": "Its color changes once"
      },
      {
        "id": "b",
        "text": "It has one isolated bump"
      },
      {
        "id": "c",
        "text": "The same sequence of parts returns"
      },
      {
        "id": "d",
        "text": "It contains an exact energy value"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Repeated order defines the pattern."
  },
  {
    "id": "science-u03-l01-q05",
    "conceptTag": "amplitude-pattern",
    "reviewCardId": "science-u03-l01-c2",
    "type": "multiple-choice",
    "prompt": "Wave A has crests and troughs close to the baseline. Wave B has crests and troughs farther from the same baseline. Which wave has larger amplitude?",
    "choices": [
      {
        "id": "a",
        "text": "The one with more labels"
      },
      {
        "id": "b",
        "text": "The one drawn first"
      },
      {
        "id": "c",
        "text": "The one with closer crests only"
      },
      {
        "id": "d",
        "text": "The one with crests and troughs farther from the baseline"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Greater displacement from baseline means larger amplitude."
  },
  {
    "id": "science-u03-l01-q06",
    "conceptTag": "amplitude-pattern",
    "reviewCardId": "science-u03-l01-c2",
    "type": "true-false",
    "prompt": "Amplitude is compared by looking at displacement from the baseline.",
    "choices": [
      {
        "id": "true",
        "text": "True — baseline displacement is the comparison"
      },
      {
        "id": "false",
        "text": "False — count only the labels"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Amplitude concerns displacement."
  },
  {
    "id": "science-u03-l01-q07",
    "conceptTag": "amplitude-pattern",
    "reviewCardId": "science-u03-l01-c2",
    "type": "multiple-choice",
    "prompt": "Two models have the same spacing; Wave A is shorter vertically. Which has smaller amplitude?",
    "choices": [
      {
        "id": "a",
        "text": "Wave A"
      },
      {
        "id": "b",
        "text": "Wave B"
      },
      {
        "id": "c",
        "text": "Both must be exact equals"
      },
      {
        "id": "d",
        "text": "Neither can be compared qualitatively"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Wave A has less displacement."
  },
  {
    "id": "science-u03-l01-q08",
    "conceptTag": "amplitude-pattern",
    "reviewCardId": "science-u03-l01-c2",
    "type": "multiple-choice",
    "prompt": "What does increasing the amplitude control change?",
    "choices": [
      {
        "id": "a",
        "text": "The code alphabet"
      },
      {
        "id": "b",
        "text": "The graph’s vertical displacement"
      },
      {
        "id": "c",
        "text": "The number of receivers"
      },
      {
        "id": "d",
        "text": "The light path"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The widget labels amplitude as vertical displacement."
  },
  {
    "id": "science-u03-l01-q09",
    "conceptTag": "wave-model-limits",
    "reviewCardId": "science-u03-l01-c3",
    "type": "multiple-choice",
    "prompt": "An app activity shows an authored wave graph and lets a learner change its amplitude. It does not measure a physical rope. Which statement accurately describes the activity?",
    "choices": [
      {
        "id": "a",
        "text": "It measured a physical rope"
      },
      {
        "id": "b",
        "text": "It proved every water wave"
      },
      {
        "id": "c",
        "text": "It is an authored model of a qualitative pattern"
      },
      {
        "id": "d",
        "text": "It observed energy directly"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It represents a pattern."
  },
  {
    "id": "science-u03-l01-q10",
    "conceptTag": "wave-model-limits",
    "reviewCardId": "science-u03-l01-c3",
    "type": "true-false",
    "prompt": "A larger drawn amplitude is an exact measurement of a real wave.",
    "choices": [
      {
        "id": "true",
        "text": "True — the graph measures a real wave"
      },
      {
        "id": "false",
        "text": "False — it is a qualitative authored value"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The graph does not collect a physical measurement."
  },
  {
    "id": "science-u03-l01-q11",
    "conceptTag": "wave-model-limits",
    "reviewCardId": "science-u03-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which is a model limitation?",
    "choices": [
      {
        "id": "a",
        "text": "It has a baseline"
      },
      {
        "id": "b",
        "text": "It displays a wave curve"
      },
      {
        "id": "c",
        "text": "It allows amplitude changes"
      },
      {
        "id": "d",
        "text": "It does not observe or measure a real rope"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "That limitation keeps the evidence claim honest."
  },
  {
    "id": "science-u03-l01-q12",
    "conceptTag": "wave-model-limits",
    "reviewCardId": "science-u03-l01-c3",
    "type": "fill-blank",
    "prompt": "The greatest displacement is compared from the ___.",
    "acceptedAnswers": [
      "baseline"
    ],
    "explanation": "Amplitude is described from the baseline."
  },
  {
    "id": "science-u03-l01-q13",
    "conceptTag": "wave-model-limits",
    "reviewCardId": "science-u03-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which explanation is best?",
    "choices": [
      {
        "id": "a",
        "text": "The graph represents a repeating amplitude pattern but does not measure a physical wave"
      },
      {
        "id": "b",
        "text": "The graph proves a rope moved"
      },
      {
        "id": "c",
        "text": "The graph makes energy visible"
      },
      {
        "id": "d",
        "text": "The graph shows every wave exactly"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It states both representation and limit."
  }
];

const scienceU03L01Lesson: Lesson = {
  ...scienceU03L01Core,
  quiz: { passThreshold: 8, pool: scienceU03L01Questions },
};

const scienceU03L02Core = {
  "id": "science-u03-l02",
  "unitId": "science-u03",
  "title": "Describe Wavelength Patterns",
  "indicatorCodes": [
    "4-PS4-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Two repeating rope-wave drawings have crests spaced differently."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Wavelength compares the distance between matching points on neighboring waves."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will use words such as shorter and longer and avoid turning a frequency control into a wavelength tool."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s compare matching points carefully!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u03-l02-c1",
      "title": "Find matching points on waves",
      "blocks": [
        {
          "kind": "text",
          "text": "Wavelength is compared from one point on a wave to the next matching point, such as crest to crest or trough to trough."
        },
        {
          "kind": "example",
          "text": "Measure the pattern conceptually from crest 1 to crest 2, not from a crest to the nearby trough."
        },
        {
          "kind": "tip",
          "text": "Support: Circle two neighboring crests, then draw one horizontal arrow between them."
        }
      ]
    },
    {
      "id": "science-u03-l02-c2",
      "title": "Compare shorter and longer wavelengths",
      "blocks": [
        {
          "kind": "text",
          "text": "When matching crests are closer together, the wavelength is shorter. When matching crests are farther apart, the wavelength is longer."
        },
        {
          "kind": "example",
          "text": "Diagram A fits more complete waves across the same strip than Diagram B. Its neighboring crests are closer, so A has shorter wavelength."
        },
        {
          "kind": "tip",
          "text": "Response frame: Wave ____ has a ____ wavelength because its matching ____ are closer/farther apart."
        }
      ]
    },
    {
      "id": "science-u03-l02-c3",
      "title": "Use a qualitative wave model",
      "blocks": [
        {
          "kind": "text",
          "text": "A wavelength model can be a diagram, rope, wire, or string. Grade 4 comparisons use patterns rather than exact numerical distances."
        },
        {
          "kind": "example",
          "text": "A control labeled frequency changes the number of cycles across a fixed graph; it is not an authored wavelength control and is omitted from this card."
        },
        {
          "kind": "tip",
          "text": "Stretch: Compare two drawings by matching points, then name why the comparison is qualitative rather than numerical."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Describe Wavelength Patterns",
    "steps": [
      "Mark two neighboring crests on each of two wave drawings.",
      "Compare the crest-to-crest spacing across strips of equal width.",
      "Call the closer spacing shorter wavelength and the farther spacing longer wavelength.",
      "State that the diagrams model a pattern and do not supply exact wavelength measurements."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU03L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u03-l02-q01",
    "conceptTag": "wavelength-reference-points",
    "reviewCardId": "science-u03-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which points should be compared for one wavelength?",
    "choices": [
      {
        "id": "a",
        "text": "One crest and the next crest"
      },
      {
        "id": "b",
        "text": "A crest and the nearby trough"
      },
      {
        "id": "c",
        "text": "The title and baseline"
      },
      {
        "id": "d",
        "text": "Two unrelated labels"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Wavelength uses matching neighboring points."
  },
  {
    "id": "science-u03-l02-q02",
    "conceptTag": "wavelength-reference-points",
    "reviewCardId": "science-u03-l02-c1",
    "type": "true-false",
    "prompt": "Trough-to-trough spacing can represent wavelength.",
    "choices": [
      {
        "id": "true",
        "text": "True — troughs are matching points"
      },
      {
        "id": "false",
        "text": "False — only colors can match"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Neighboring troughs are matching points."
  },
  {
    "id": "science-u03-l02-q03",
    "conceptTag": "wavelength-reference-points",
    "reviewCardId": "science-u03-l02-c1",
    "type": "multiple-choice",
    "prompt": "Which comparison is not a wavelength?",
    "choices": [
      {
        "id": "a",
        "text": "crest to next crest"
      },
      {
        "id": "b",
        "text": "crest to nearby trough"
      },
      {
        "id": "c",
        "text": "trough to next trough"
      },
      {
        "id": "d",
        "text": "matching baseline crossing to the next same-direction crossing"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Crest and trough are different parts."
  },
  {
    "id": "science-u03-l02-q04",
    "conceptTag": "wavelength-reference-points",
    "reviewCardId": "science-u03-l02-c1",
    "type": "fill-blank",
    "prompt": "Wavelength can be compared from crest to ___.",
    "acceptedAnswers": [
      "crest",
      "the next crest"
    ],
    "explanation": "Neighboring crests are matching points."
  },
  {
    "id": "science-u03-l02-q05",
    "conceptTag": "wavelength-comparison",
    "reviewCardId": "science-u03-l02-c2",
    "type": "multiple-choice",
    "prompt": "Drawing A has neighboring crests closer together than Drawing B. Which drawing has shorter wavelength?",
    "choices": [
      {
        "id": "a",
        "text": "The one with brighter ink"
      },
      {
        "id": "b",
        "text": "The one with taller crests only"
      },
      {
        "id": "c",
        "text": "The one with neighboring crests closer together"
      },
      {
        "id": "d",
        "text": "The one with fewer labels"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Closer matching points mean shorter wavelength."
  },
  {
    "id": "science-u03-l02-q06",
    "conceptTag": "wavelength-comparison",
    "reviewCardId": "science-u03-l02-c2",
    "type": "true-false",
    "prompt": "Farther-apart neighboring crests indicate a longer wavelength.",
    "choices": [
      {
        "id": "true",
        "text": "True — the matching-point spacing is longer"
      },
      {
        "id": "false",
        "text": "False — farther means shorter"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Wavelength is the spacing between matching points."
  },
  {
    "id": "science-u03-l02-q07",
    "conceptTag": "wavelength-comparison",
    "reviewCardId": "science-u03-l02-c2",
    "type": "multiple-choice",
    "prompt": "Two strips have equal width. Strip B fits fewer complete waves. What is likely true?",
    "choices": [
      {
        "id": "a",
        "text": "B has no pattern"
      },
      {
        "id": "b",
        "text": "B has smaller amplitude for certain"
      },
      {
        "id": "c",
        "text": "B must be sound"
      },
      {
        "id": "d",
        "text": "B has longer wavelength"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Fewer cycles over the same width means matching points are farther apart."
  },
  {
    "id": "science-u03-l02-q08",
    "conceptTag": "wavelength-comparison",
    "reviewCardId": "science-u03-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which statement compares wavelength without a number?",
    "choices": [
      {
        "id": "a",
        "text": "Wave A has a shorter crest-to-crest spacing than Wave B"
      },
      {
        "id": "b",
        "text": "Wave A is exactly 2.4 units"
      },
      {
        "id": "c",
        "text": "Wave B has 9 energy units"
      },
      {
        "id": "d",
        "text": "Wave A proves the rope length"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Shorter is a qualitative comparison."
  },
  {
    "id": "science-u03-l02-q09",
    "conceptTag": "wavelength-model-boundary",
    "reviewCardId": "science-u03-l02-c3",
    "type": "multiple-choice",
    "prompt": "The available wave-maker has controls labeled amplitude and frequency, but no control labeled wavelength. Why is it not used to compare wavelength on this card?",
    "choices": [
      {
        "id": "a",
        "text": "Wave models are forbidden"
      },
      {
        "id": "b",
        "text": "Its control is labeled frequency, not wavelength"
      },
      {
        "id": "c",
        "text": "Wavelength has no pattern"
      },
      {
        "id": "d",
        "text": "Widgets always provide evidence"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The contract does not provide a direct wavelength control."
  },
  {
    "id": "science-u03-l02-q10",
    "conceptTag": "wavelength-model-boundary",
    "reviewCardId": "science-u03-l02-c3",
    "type": "true-false",
    "prompt": "A Grade 4 wavelength model must include an exact measurement.",
    "choices": [
      {
        "id": "true",
        "text": "True — a number is required"
      },
      {
        "id": "false",
        "text": "False — qualitative pattern comparisons are sufficient"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The standard excludes quantitative models."
  },
  {
    "id": "science-u03-l02-q11",
    "conceptTag": "wavelength-model-boundary",
    "reviewCardId": "science-u03-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which material can model wavelength patterns?",
    "choices": [
      {
        "id": "a",
        "text": "A calculator answer only"
      },
      {
        "id": "b",
        "text": "A color name"
      },
      {
        "id": "c",
        "text": "A rope drawing with repeated crests"
      },
      {
        "id": "d",
        "text": "An unrelated battery label"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "A rope diagram can represent matching-point spacing."
  },
  {
    "id": "science-u03-l02-q12",
    "conceptTag": "wavelength-model-boundary",
    "reviewCardId": "science-u03-l02-c3",
    "type": "multiple-choice",
    "prompt": "Grade 4 wavelength comparisons are qualitative and do not use exact numerical measurements. Which explanation stays within this boundary?",
    "choices": [
      {
        "id": "a",
        "text": "The wavelength equals a calculated decimal"
      },
      {
        "id": "b",
        "text": "The graph proves a physical result"
      },
      {
        "id": "c",
        "text": "Every wave has the same spacing"
      },
      {
        "id": "d",
        "text": "The model with farther-apart crests has a longer qualitative wavelength"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It compares a visible pattern without measuring."
  },
  {
    "id": "science-u03-l02-q13",
    "conceptTag": "wavelength-model-boundary",
    "reviewCardId": "science-u03-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which statement names a limitation?",
    "choices": [
      {
        "id": "a",
        "text": "The drawing represents spacing but does not measure a real wave"
      },
      {
        "id": "b",
        "text": "The drawing is direct evidence from the ocean"
      },
      {
        "id": "c",
        "text": "The frequency button is a wavelength meter"
      },
      {
        "id": "d",
        "text": "The wave’s exact size is visible"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The drawing is a representation, not a physical measurement."
  }
];

const scienceU03L02Lesson: Lesson = {
  ...scienceU03L02Core,
  quiz: { passThreshold: 8, pool: scienceU03L02Questions },
};

const scienceU03L03Core = {
  "id": "science-u03-l03",
  "unitId": "science-u03",
  "title": "Model Waves Moving Objects",
  "indicatorCodes": [
    "4-PS4-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A floating cork rises and falls as water waves pass."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Its motion is an observable effect that a wave can cause an object to move."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare before-and-during observations with a simplified water-wave model."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s track the cork without claiming the water carries it across the whole tray!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u03-l03-c1",
      "title": "Observe an object at the surface",
      "blocks": [
        {
          "kind": "text",
          "text": "Before waves begin, a cork may rest near one mark. As waves pass, it can bob up and down or move slightly back and forth. Record that motion directly."
        },
        {
          "kind": "example",
          "text": "Written observation: the cork was nearly still before the tray edge was tapped; while repeating ripples passed, it bobbed up and down near the same mark."
        },
        {
          "kind": "tip",
          "text": "Support: Use the frame Before waves, ____. During waves, ____."
        }
      ]
    },
    {
      "id": "science-u03-l03-c2",
      "title": "Model motion caused by waves",
      "blocks": [
        {
          "kind": "text",
          "text": "A water-wave model can change amplitude and cycle pattern while showing a qualitative curve. It predicts patterns; it does not observe a cork."
        },
        {
          "kind": "example",
          "text": "A larger modeled amplitude shows greater vertical displacement, so predict a more noticeable up-and-down response for a floating object, all else kept alike."
        },
        {
          "kind": "tip",
          "text": "Response frame: When modeled amplitude changes from ____ to ____, I predict the object will ____."
        }
      ],
      "widget": {
        "type": "wave-maker",
        "config": {
          "medium": "water",
          "amplitude": 2,
          "frequency": 2,
          "target": {
            "amplitude": 3
          },
          "taskPrompt": "Change the modeled amplitude to the visible target, then predict what a floating object might do."
        }
      },
      "widgetCoach": {
  "intro": [
    {
      "speaker": "guide",
      "pose": "talk",
      "text": "Let’s compare a water-wave model before and after changing its height."
    },
    {
      "speaker": "kid",
      "text": "I’ll change the amplitude, watch the floating marker, and compare its distance from the baseline."
    }
  ],
  "reactions": {
    "strategy": {
      "text": "Compare the starting pattern with the changed pattern before explaining.",
      "pose": "think"
    },
    "retry": {
      "text": "Compare each crest with the baseline and the target marks, then revise.",
      "pose": "think"
    },
    "milestone": {
      "text": "Your pattern matches the target. Now explain the visible change.",
      "pose": "talk"
    },
    "complete": {
      "text": "You compared wave patterns and explained what amplitude describes.",
      "pose": "cheer"
    }
  }
}
    },
    {
      "id": "science-u03-l03-c3",
      "title": "Connect patterns without overclaiming",
      "blocks": [
        {
          "kind": "text",
          "text": "Use the physical written observation as evidence and the diagram as a way to explain or predict. Do not claim that the screen result proves the tray result."
        },
        {
          "kind": "example",
          "text": "The cork’s bobbing supports the claim that waves can cause objects to move. Remaining near one mark shows that the cork need not travel with the wave across the tray."
        },
        {
          "kind": "tip",
          "text": "Stretch: State a claim, cite the before-and-during cork observation, and name one model limitation."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Model Waves Moving Objects",
    "steps": [
      "Before ripples, the cork is nearly still near a tape mark.",
      "During repeating ripples, the cork bobs up and down near that mark.",
      "Use the motion change as evidence that waves can cause an object to move.",
      "Use the graph only to model a possible pattern and acknowledge that it did not observe the cork."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU03L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u03-l03-q01",
    "conceptTag": "wave-object-observation",
    "reviewCardId": "science-u03-l03-c1",
    "type": "multiple-choice",
    "prompt": "A cork was nearly still near a tape mark before repeating ripples. While ripples passed, it bobbed up and down near the same mark. Which is an observable change?",
    "choices": [
      {
        "id": "a",
        "text": "The cork begins bobbing as ripples pass"
      },
      {
        "id": "b",
        "text": "An energy label appears"
      },
      {
        "id": "c",
        "text": "A screen result counts as physical motion evidence"
      },
      {
        "id": "d",
        "text": "The tray chooses a pattern"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Bobbing is an observable motion."
  },
  {
    "id": "science-u03-l03-q02",
    "conceptTag": "wave-object-observation",
    "reviewCardId": "science-u03-l03-c1",
    "type": "true-false",
    "prompt": "A before-and-during comparison helps identify wave-caused motion.",
    "choices": [
      {
        "id": "true",
        "text": "True — it compares the object’s motion"
      },
      {
        "id": "false",
        "text": "False — comparisons hide motion"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The comparison records a change."
  },
  {
    "id": "science-u03-l03-q03",
    "conceptTag": "wave-object-observation",
    "reviewCardId": "science-u03-l03-c1",
    "type": "multiple-choice",
    "prompt": "A cork was nearly still near a tape mark before repeating ripples. While ripples passed, it bobbed up and down near the same mark. Where did the cork remain?",
    "choices": [
      {
        "id": "a",
        "text": "At the tray bottom"
      },
      {
        "id": "b",
        "text": "Near the same tape mark"
      },
      {
        "id": "c",
        "text": "Inside the wave graph"
      },
      {
        "id": "d",
        "text": "At an exact measured speed"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The case says it bobs near the mark."
  },
  {
    "id": "science-u03-l03-q04",
    "conceptTag": "wave-object-observation",
    "reviewCardId": "science-u03-l03-c1",
    "type": "multiple-choice",
    "prompt": "A learner needs evidence for the claim that waves can cause objects to move. Which note is most relevant?",
    "choices": [
      {
        "id": "a",
        "text": "The cork is brown"
      },
      {
        "id": "b",
        "text": "The tray is rectangular"
      },
      {
        "id": "c",
        "text": "The cork was still, then bobbed during ripples"
      },
      {
        "id": "d",
        "text": "The observer likes water"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It describes motion before and during waves."
  },
  {
    "id": "science-u03-l03-q05",
    "conceptTag": "wave-caused-motion",
    "reviewCardId": "science-u03-l03-c2",
    "type": "multiple-choice",
    "prompt": "An app water-wave activity changes authored amplitude and cycle controls on a graph; it does not observe or measure a physical tray or cork. What does the activity provide?",
    "choices": [
      {
        "id": "a",
        "text": "A measurement from a real tray"
      },
      {
        "id": "b",
        "text": "Proof about every cork"
      },
      {
        "id": "c",
        "text": "Physical evidence"
      },
      {
        "id": "d",
        "text": "A simplified model for trying a pattern"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The widget models a possible pattern."
  },
  {
    "id": "science-u03-l03-q06",
    "conceptTag": "wave-caused-motion",
    "reviewCardId": "science-u03-l03-c2",
    "type": "true-false",
    "prompt": "Changing the model does not itself observe a floating object.",
    "choices": [
      {
        "id": "true",
        "text": "True — the screen is not a physical observation"
      },
      {
        "id": "false",
        "text": "False — it measures a cork automatically"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The model contains no real cork measurement."
  },
  {
    "id": "science-u03-l03-q07",
    "conceptTag": "wave-caused-motion",
    "reviewCardId": "science-u03-l03-c2",
    "type": "multiple-choice",
    "prompt": "What prediction fits a larger modeled amplitude, all else alike?",
    "choices": [
      {
        "id": "a",
        "text": "A more noticeable up-and-down object response"
      },
      {
        "id": "b",
        "text": "No object motion is possible"
      },
      {
        "id": "c",
        "text": "The cork must change color"
      },
      {
        "id": "d",
        "text": "An exact motion amount is known"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Larger displacement supports a qualitative prediction."
  },
  {
    "id": "science-u03-l03-q08",
    "conceptTag": "wave-caused-motion",
    "reviewCardId": "science-u03-l03-c2",
    "type": "multiple-choice",
    "prompt": "Which variable should stay the same in a fair amplitude comparison?",
    "choices": [
      {
        "id": "a",
        "text": "The conclusion"
      },
      {
        "id": "b",
        "text": "The floating object and setup"
      },
      {
        "id": "c",
        "text": "The answer key"
      },
      {
        "id": "d",
        "text": "Every wave feature must change"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Holding setup and object constant focuses on amplitude."
  },
  {
    "id": "science-u03-l03-q09",
    "conceptTag": "wave-motion-model-limits",
    "reviewCardId": "science-u03-l03-c3",
    "type": "multiple-choice",
    "prompt": "A cork was nearly still near a tape mark before repeating ripples. While ripples passed, it bobbed up and down near the same mark. Which claim is supported by this written observation?",
    "choices": [
      {
        "id": "a",
        "text": "Waves always carry objects across a tray"
      },
      {
        "id": "b",
        "text": "The graph measured the cork"
      },
      {
        "id": "c",
        "text": "Waves can cause objects to move"
      },
      {
        "id": "d",
        "text": "Energy was directly seen"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The cork’s bobbing supports object motion."
  },
  {
    "id": "science-u03-l03-q10",
    "conceptTag": "wave-motion-model-limits",
    "reviewCardId": "science-u03-l03-c3",
    "type": "true-false",
    "prompt": "The cork must travel across the tray for waves to cause it to move.",
    "choices": [
      {
        "id": "true",
        "text": "True — only travel counts"
      },
      {
        "id": "false",
        "text": "False — bobbing is motion"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Up-and-down motion is still motion."
  },
  {
    "id": "science-u03-l03-q11",
    "conceptTag": "wave-motion-model-limits",
    "reviewCardId": "science-u03-l03-c3",
    "type": "multiple-choice",
    "prompt": "Claim: Waves can cause objects to move. A cork was nearly still before ripples and bobbed as they passed. Which evidence should support the claim?",
    "choices": [
      {
        "id": "a",
        "text": "The model target turned complete"
      },
      {
        "id": "b",
        "text": "The graph has a blue line"
      },
      {
        "id": "c",
        "text": "The word wave appears"
      },
      {
        "id": "d",
        "text": "The cork changed from nearly still to bobbing"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "That physical written observation is relevant evidence."
  },
  {
    "id": "science-u03-l03-q12",
    "conceptTag": "wave-motion-model-limits",
    "reviewCardId": "science-u03-l03-c3",
    "type": "fill-blank",
    "prompt": "The cork moved up and down, or ___.",
    "acceptedAnswers": [
      "bobbed"
    ],
    "explanation": "Bobbing names the observed motion."
  },
  {
    "id": "science-u03-l03-q13",
    "conceptTag": "wave-motion-model-limits",
    "reviewCardId": "science-u03-l03-c3",
    "type": "multiple-choice",
    "prompt": "A written observation says a cork was nearly still before ripples and bobbed as they passed. An app graph changes authored values but does not observe the cork. Which explanation avoids overclaiming?",
    "choices": [
      {
        "id": "a",
        "text": "The cork observation supports motion; the graph only models a possible pattern"
      },
      {
        "id": "b",
        "text": "Finishing the graph guarantees the cork moved"
      },
      {
        "id": "c",
        "text": "The moving screen is physical evidence"
      },
      {
        "id": "d",
        "text": "The cork revealed an exact energy amount"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It separates evidence from representation."
  }
];

const scienceU03L03Lesson: Lesson = {
  ...scienceU03L03Core,
  quiz: { passThreshold: 8, pool: scienceU03L03Questions },
};

const scienceU03L04Core = {
  "id": "science-u03-l04",
  "unitId": "science-u03",
  "title": "Model Reflected Light Entering the Eye",
  "indicatorCodes": [
    "4-PS4-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A book is visible when light reaches it, reflects, and then enters an eye."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "The eye does not send out the light used to see the book."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will trace a cause-and-effect path with arrows and stop at the eye."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s build the complete light path!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u03-l04-c1",
      "title": "Trace light to an object",
      "blocks": [
        {
          "kind": "text",
          "text": "Seeing begins with light from a source traveling to an object. Without light reaching the object, there is no reflected light from it to enter the eye."
        },
        {
          "kind": "example",
          "text": "A lamp shines on a book. First trace lamp → light → book."
        },
        {
          "kind": "tip",
          "text": "Support: Point first to the light source and then to the object it illuminates."
        }
      ]
    },
    {
      "id": "science-u03-l04-c2",
      "title": "Trace reflected light to the eye",
      "blocks": [
        {
          "kind": "text",
          "text": "Some light reaching the object reflects from it and travels into the eye. Arrows must point source → object → eye."
        },
        {
          "kind": "example",
          "text": "For the book: lamp light reaches the page, reflected light leaves the page, and some enters the reader’s eye."
        },
        {
          "kind": "tip",
          "text": "Response frame: Light travels from ____ to ____, reflects, and enters ____."
        }
      ],
      "widget": {
        "type": "light-reflection-eye",
        "config": {
          "incidentAngle": 25,
          "showEye": true,
          "task": "trace-path",
          "pathLabels": {
            "source": "Lamp",
            "object": "Book",
            "eye": "Eye"
          },
          "taskPrompt": "Connect the source, object, and eye before committing the modeled light path."
        }
      },
      "widgetCoach": {
  "intro": [
    {
      "speaker": "guide",
      "pose": "talk",
      "text": "How could light from this lamp help someone see the book?"
    },
    {
      "speaker": "kid",
      "text": "I’ll build a path, turn on the model, and check where the light goes."
    }
  ],
  "reactions": {
    "strategy": {
      "text": "Think about which object supplies light and which receives it.",
      "pose": "think"
    },
    "retry": {
      "text": "The eye receives light. Start over and test another proposed path.",
      "pose": "think"
    },
    "milestone": {
      "text": "Your committed path now shows how light could reach the eye.",
      "pose": "talk"
    },
    "complete": {
      "text": "You traced reflected light to the eye to explain how someone could see the object.",
      "pose": "cheer"
    }
  }
}
    },
    {
      "id": "science-u03-l04-c3",
      "title": "Explain seeing with a model",
      "blocks": [
        {
          "kind": "text",
          "text": "Cause: light reflects from the object and enters the eye. Effect: the object can be seen. The model stops at this system-level explanation."
        },
        {
          "kind": "example",
          "text": "The ray diagram represents a possible path and equal authored angles at a surface. It is not evidence that a particular person saw an object."
        },
        {
          "kind": "tip",
          "text": "Stretch: Explain the complete cause-and-effect chain and stop the model when reflected light enters the eye."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Model Reflected Light Entering the Eye",
    "steps": [
      "Name the lamp as source, the book as object, and the eye as receiver.",
      "Trace light from lamp to book.",
      "Trace reflected light from book into the eye.",
      "Explain that entering reflected light allows the book to be seen; the ray activity represents the path."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU03L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u03-l04-q01",
    "conceptTag": "light-to-object",
    "reviewCardId": "science-u03-l04-c1",
    "type": "multiple-choice",
    "prompt": "What must happen first for a lamp-lit book to be seen?",
    "choices": [
      {
        "id": "a",
        "text": "Light from the lamp reaches the book"
      },
      {
        "id": "b",
        "text": "The eye sends light to the book"
      },
      {
        "id": "c",
        "text": "The book measures energy"
      },
      {
        "id": "d",
        "text": "The model finishes"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Light must reach the object first."
  },
  {
    "id": "science-u03-l04-q02",
    "conceptTag": "light-to-object",
    "reviewCardId": "science-u03-l04-c1",
    "type": "true-false",
    "prompt": "The eye is the light source in the seeing model.",
    "choices": [
      {
        "id": "true",
        "text": "True — eyes send seeing rays"
      },
      {
        "id": "false",
        "text": "False — a source such as a lamp supplies light"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The lamp is the source."
  },
  {
    "id": "science-u03-l04-q03",
    "conceptTag": "light-to-object",
    "reviewCardId": "science-u03-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which partial path is correct?",
    "choices": [
      {
        "id": "a",
        "text": "eye → book → lamp"
      },
      {
        "id": "b",
        "text": "lamp → light → book"
      },
      {
        "id": "c",
        "text": "book → eye → lamp"
      },
      {
        "id": "d",
        "text": "lamp → sound → book"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Light travels from lamp to book."
  },
  {
    "id": "science-u03-l04-q04",
    "conceptTag": "light-to-object",
    "reviewCardId": "science-u03-l04-c1",
    "type": "multiple-choice",
    "prompt": "Why can a book in complete darkness not be seen by this model?",
    "choices": [
      {
        "id": "a",
        "text": "The book stops existing"
      },
      {
        "id": "b",
        "text": "The eye closes automatically"
      },
      {
        "id": "c",
        "text": "No light reaches the book to reflect into the eye"
      },
      {
        "id": "d",
        "text": "The page loses its words"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The path needs incoming light."
  },
  {
    "id": "science-u03-l04-q05",
    "conceptTag": "reflected-light-path",
    "reviewCardId": "science-u03-l04-c2",
    "type": "multiple-choice",
    "prompt": "After light reaches the book, where must some reflected light go?",
    "choices": [
      {
        "id": "a",
        "text": "Back into the lamp only"
      },
      {
        "id": "b",
        "text": "Into the table only"
      },
      {
        "id": "c",
        "text": "Into a sound source"
      },
      {
        "id": "d",
        "text": "Into the eye"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Entering the eye completes the modeled path."
  },
  {
    "id": "science-u03-l04-q06",
    "conceptTag": "reflected-light-path",
    "reviewCardId": "science-u03-l04-c2",
    "type": "sort",
    "prompt": "Order the seeing path.",
    "items": [
      {
        "id": "eye",
        "text": "Reflected light enters the eye"
      },
      {
        "id": "source",
        "text": "Light leaves the lamp"
      },
      {
        "id": "object",
        "text": "Light reaches and reflects from the book"
      }
    ],
    "correctOrder": [
      "source",
      "object",
      "eye"
    ],
    "explanation": "The sequence is source, object reflection, eye."
  },
  {
    "id": "science-u03-l04-q07",
    "conceptTag": "reflected-light-path",
    "reviewCardId": "science-u03-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which arrows are correct?",
    "choices": [
      {
        "id": "a",
        "text": "lamp → book → eye"
      },
      {
        "id": "b",
        "text": "eye → book → lamp"
      },
      {
        "id": "c",
        "text": "book → lamp → eye"
      },
      {
        "id": "d",
        "text": "eye → lamp → book"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The arrows follow light travel."
  },
  {
    "id": "science-u03-l04-q08",
    "conceptTag": "reflected-light-path",
    "reviewCardId": "science-u03-l04-c2",
    "type": "true-false",
    "prompt": "An app reflection activity draws an authored light path from a source to an object to an eye; it does not observe a real person. The activity is a model rather than an observation of someone seeing.",
    "choices": [
      {
        "id": "true",
        "text": "True — it represents a light path"
      },
      {
        "id": "false",
        "text": "False — it watches a real eye"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The activity is an authored representation."
  },
  {
    "id": "science-u03-l04-q09",
    "conceptTag": "seeing-cause-effect-model",
    "reviewCardId": "science-u03-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which cause-and-effect statement is correct?",
    "choices": [
      {
        "id": "a",
        "text": "The eye sends light, causing the lamp to glow"
      },
      {
        "id": "b",
        "text": "Reflected light enters the eye, allowing the book to be seen"
      },
      {
        "id": "c",
        "text": "The book creates an exact energy amount"
      },
      {
        "id": "d",
        "text": "Completing a diagram guarantees vision occurred"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The PE links entering reflected light to seeing."
  },
  {
    "id": "science-u03-l04-q10",
    "conceptTag": "seeing-cause-effect-model",
    "reviewCardId": "science-u03-l04-c3",
    "type": "true-false",
    "prompt": "The Grade 4 seeing model must continue past light entering the eye.",
    "choices": [
      {
        "id": "true",
        "text": "True — processes after light enters the eye are required"
      },
      {
        "id": "false",
        "text": "False — the system-level path is the boundary"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The standard stops at light entering the eye."
  },
  {
    "id": "science-u03-l04-q11",
    "conceptTag": "seeing-cause-effect-model",
    "reviewCardId": "science-u03-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which statement names a model limit?",
    "choices": [
      {
        "id": "a",
        "text": "It has arrows"
      },
      {
        "id": "b",
        "text": "It includes a source"
      },
      {
        "id": "c",
        "text": "It does not observe whether a person saw the object"
      },
      {
        "id": "d",
        "text": "It shows a book label"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The diagram cannot supply a real observation of seeing."
  },
  {
    "id": "science-u03-l04-q12",
    "conceptTag": "seeing-cause-effect-model",
    "reviewCardId": "science-u03-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which explanation is complete?",
    "choices": [
      {
        "id": "a",
        "text": "The book is visible because it has words"
      },
      {
        "id": "b",
        "text": "The eye sees because it sends rays"
      },
      {
        "id": "c",
        "text": "The lamp alone causes seeing"
      },
      {
        "id": "d",
        "text": "Lamp light reaches the book, reflects, and enters the eye, allowing the book to be seen"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It includes source, object, reflection, eye, and effect."
  },
  {
    "id": "science-u03-l04-q13",
    "conceptTag": "seeing-cause-effect-model",
    "reviewCardId": "science-u03-l04-c3",
    "type": "fill-blank",
    "prompt": "Light that bounces from an object is called ___ light.",
    "acceptedAnswers": [
      "reflected"
    ],
    "explanation": "Reflected light travels from the object toward the eye."
  }
];

const scienceU03L04Lesson: Lesson = {
  ...scienceU03L04Core,
  quiz: { passThreshold: 8, pool: scienceU03L04Questions },
};

export const unit03Lessons: Lesson[] = [
  scienceU03L01Lesson,
  scienceU03L02Lesson,
  scienceU03L03Lesson,
  scienceU03L04Lesson,
];
