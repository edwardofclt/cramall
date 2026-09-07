import type { Lesson } from '../schema';

const scienceU04L01Core = {
  "id": "science-u04-l01",
  "unitId": "science-u04",
  "title": "Build Two-Value Message Patterns",
  "indicatorCodes": [
    "4-PS4-3"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A code can send information using only two signal values."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "The sender and receiver need the same meanings and reading order."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will encode a short message, then check whether the pattern decodes accurately."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s make every symbol count!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u04-l01-c1",
      "title": "Define two signal values",
      "blocks": [
        {
          "kind": "text",
          "text": "A two-value code uses only two possible values, such as 0/1, off/on, black/white, low/high, or dot/dash."
        },
        {
          "kind": "example",
          "text": "In an eight-place binary character, each place is either 0 or 1. The shared code reference assigns one pattern to each character."
        },
        {
          "kind": "tip",
          "text": "Support: Name the two allowed values and cross out any third value before encoding."
        }
      ]
    },
    {
      "id": "science-u04-l01-c2",
      "title": "Encode a short message",
      "blocks": [
        {
          "kind": "text",
          "text": "Encoding changes information into the shared pattern. Keep every value and separator in the agreed order."
        },
        {
          "kind": "example",
          "text": "For target A, follow the binary reference exactly from left to right; changing one place can change the decoded character."
        },
        {
          "kind": "tip",
          "text": "Response frame: The target is ____. Its two-value pattern is ____."
        }
      ],
      "widget": {
        "type": "message-sender",
        "config": {
          "encoding": "binary",
          "message": "A"
        }
      },
      "widgetCoach": {
  "intro": [
    {
      "speaker": "guide",
      "pose": "talk",
      "text": "A shared code can carry a message using a simple signal."
    },
    {
      "speaker": "kid",
      "text": "I’ll build the code, send it in the model, and compare the received message."
    }
  ],
  "reactions": {
    "strategy": {
      "text": "Compare the first mismatched group with the code reference.",
      "pose": "think"
    },
    "retry": {
      "text": "Revise the mismatched group and check any character separators.",
      "pose": "think"
    },
    "milestone": {
      "text": "The receiver decoded your signal. Explain why the shared code matters.",
      "pose": "talk"
    },
    "complete": {
      "text": "You built a signal and explained how a shared code connects it to a message.",
      "pose": "cheer"
    }
  }
}
    },
    {
      "id": "science-u04-l01-c3",
      "title": "Check whether a receiver can decode",
      "blocks": [
        {
          "kind": "text",
          "text": "Decoding uses the same reference to turn the pattern back into information. Accuracy means the decoded result matches the intended message."
        },
        {
          "kind": "example",
          "text": "Compare the decoded character with A. If it differs, locate the first mismatched position and revise it."
        },
        {
          "kind": "tip",
          "text": "Stretch: Explain why shared value meanings and shared order are both necessary for accurate decoding."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Build Two-Value Message Patterns",
    "steps": [
      "Agree that each binary place contains only 0 or 1 and that positions are read left to right.",
      "Use the reference to encode the character A.",
      "Decode the pattern with the same reference.",
      "Compare decoded A with intended A and repair any mismatched position."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU04L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u04-l01-q01",
    "conceptTag": "two-value-code",
    "reviewCardId": "science-u04-l01-c1",
    "type": "multiple-choice",
    "prompt": "Which pair can form a two-value code?",
    "choices": [
      {
        "id": "a",
        "text": "0 and 1"
      },
      {
        "id": "b",
        "text": "red, blue, and green"
      },
      {
        "id": "c",
        "text": "short, medium, and long"
      },
      {
        "id": "d",
        "text": "circle, square, triangle, and star"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "A two-value code has exactly two values."
  },
  {
    "id": "science-u04-l01-q02",
    "conceptTag": "two-value-code",
    "reviewCardId": "science-u04-l01-c1",
    "type": "true-false",
    "prompt": "Black and white can be the two possible values in a code.",
    "choices": [
      {
        "id": "true",
        "text": "True — they form a two-value pair"
      },
      {
        "id": "false",
        "text": "False — codes require numbers"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Values need not be numeric."
  },
  {
    "id": "science-u04-l01-q03",
    "conceptTag": "two-value-code",
    "reviewCardId": "science-u04-l01-c1",
    "type": "multiple-choice",
    "prompt": "What must sender and receiver share?",
    "choices": [
      {
        "id": "a",
        "text": "The same handwriting"
      },
      {
        "id": "b",
        "text": "The same code meanings"
      },
      {
        "id": "c",
        "text": "The same room"
      },
      {
        "id": "d",
        "text": "The same favorite message"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Shared meanings allow decoding."
  },
  {
    "id": "science-u04-l01-q04",
    "conceptTag": "two-value-code",
    "reviewCardId": "science-u04-l01-c1",
    "type": "fill-blank",
    "prompt": "A code in which every place is 0 or 1 uses ___ possible values.",
    "acceptedAnswers": [
      "two",
      "2"
    ],
    "explanation": "Only 0 and 1 are allowed values."
  },
  {
    "id": "science-u04-l01-q05",
    "conceptTag": "encode-pattern",
    "reviewCardId": "science-u04-l01-c2",
    "type": "multiple-choice",
    "prompt": "What does encoding do?",
    "choices": [
      {
        "id": "a",
        "text": "Erases a message"
      },
      {
        "id": "b",
        "text": "Measures sound"
      },
      {
        "id": "c",
        "text": "Changes information into a shared pattern"
      },
      {
        "id": "d",
        "text": "Adds a third signal value"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Encoding represents information with the code."
  },
  {
    "id": "science-u04-l01-q06",
    "conceptTag": "encode-pattern",
    "reviewCardId": "science-u04-l01-c2",
    "type": "sort",
    "prompt": "Order the encoding steps.",
    "items": [
      {
        "id": "write",
        "text": "Write the exact pattern in shared order"
      },
      {
        "id": "choose",
        "text": "Choose the target information"
      },
      {
        "id": "reference",
        "text": "Find it in the code reference"
      }
    ],
    "correctOrder": [
      "choose",
      "reference",
      "write"
    ],
    "explanation": "Choose the target, consult the reference, then write the pattern."
  },
  {
    "id": "science-u04-l01-q07",
    "conceptTag": "encode-pattern",
    "reviewCardId": "science-u04-l01-c2",
    "type": "multiple-choice",
    "prompt": "Why does position order matter in a binary character?",
    "choices": [
      {
        "id": "a",
        "text": "Order changes the paper color"
      },
      {
        "id": "b",
        "text": "Order makes the code louder"
      },
      {
        "id": "c",
        "text": "Order proves the message arrived"
      },
      {
        "id": "d",
        "text": "Changing a position can change the decoded character"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Each position is part of the pattern."
  },
  {
    "id": "science-u04-l01-q08",
    "conceptTag": "encode-pattern",
    "reviewCardId": "science-u04-l01-c2",
    "type": "true-false",
    "prompt": "An in-app message activity encodes and decodes A with an authored key; it has no connection to another person. The activity sends information to a live person outside the app.",
    "choices": [
      {
        "id": "true",
        "text": "True — a live receiver is required"
      },
      {
        "id": "false",
        "text": "False — it is an in-app encoding model"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "The activity has no live receiver."
  },
  {
    "id": "science-u04-l01-q09",
    "conceptTag": "decode-pattern",
    "reviewCardId": "science-u04-l01-c3",
    "type": "multiple-choice",
    "prompt": "When is the code accurate?",
    "choices": [
      {
        "id": "a",
        "text": "The decoded message matches the intended message"
      },
      {
        "id": "b",
        "text": "The pattern looks attractive"
      },
      {
        "id": "c",
        "text": "The sender uses more than two values"
      },
      {
        "id": "d",
        "text": "The receiver guesses"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Accuracy is a match between intended and decoded information."
  },
  {
    "id": "science-u04-l01-q10",
    "conceptTag": "decode-pattern",
    "reviewCardId": "science-u04-l01-c3",
    "type": "true-false",
    "prompt": "A mismatched decoded character is a reason to inspect the pattern.",
    "choices": [
      {
        "id": "true",
        "text": "True — compare and repair the mismatch"
      },
      {
        "id": "false",
        "text": "False — mismatches should be ignored"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Debugging begins with a mismatch."
  },
  {
    "id": "science-u04-l01-q11",
    "conceptTag": "decode-pattern",
    "reviewCardId": "science-u04-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which action best repairs an error?",
    "choices": [
      {
        "id": "a",
        "text": "Choose a new code without comparing"
      },
      {
        "id": "b",
        "text": "Find the first mismatched position and correct it"
      },
      {
        "id": "c",
        "text": "Add a random third value"
      },
      {
        "id": "d",
        "text": "Change the intended message secretly"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "A targeted correction preserves the shared code."
  },
  {
    "id": "science-u04-l01-q12",
    "conceptTag": "decode-pattern",
    "reviewCardId": "science-u04-l01-c3",
    "type": "multiple-choice",
    "prompt": "Why are separators useful in a longer message?",
    "choices": [
      {
        "id": "a",
        "text": "They add a third value"
      },
      {
        "id": "b",
        "text": "They measure speed"
      },
      {
        "id": "c",
        "text": "They show where one character pattern ends and the next begins"
      },
      {
        "id": "d",
        "text": "They guarantee every answer"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Separators preserve grouping."
  },
  {
    "id": "science-u04-l01-q13",
    "conceptTag": "decode-pattern",
    "reviewCardId": "science-u04-l01-c3",
    "type": "multiple-choice",
    "prompt": "Which explanation is strongest?",
    "choices": [
      {
        "id": "a",
        "text": "Any pattern can mean anything each time"
      },
      {
        "id": "b",
        "text": "Only the sender needs the key"
      },
      {
        "id": "c",
        "text": "Order never affects decoding"
      },
      {
        "id": "d",
        "text": "Shared values, meanings, and order let the receiver decode accurately"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "All three agreements are needed."
  }
];

const scienceU04L01Lesson: Lesson = {
  ...scienceU04L01Core,
  quiz: { passThreshold: 8, pool: scienceU04L01Questions },
};

const scienceU04L02Core = {
  "id": "science-u04-l02",
  "unitId": "science-u04",
  "title": "Design Morse and Drum Codes",
  "indicatorCodes": [
    "4-PS4-3"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Dots and dashes can encode text, while low and high drum sounds can encode the same information."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Both solutions work only when each uses two values and a shared key."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will design patterns and compare their clarity."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s make a message that can be decoded without guessing!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u04-l02-c1",
      "title": "Use dots and dashes",
      "blocks": [
        {
          "kind": "text",
          "text": "Morse patterns use dot and dash as the two signal values. Character spaces organize values without becoming a third signal value."
        },
        {
          "kind": "example",
          "text": "The shared reference gives A as dot-dash. Copy the order exactly."
        },
        {
          "kind": "tip",
          "text": "Support: Tap each value while saying dot, dash; then compare with the printed A reference."
        }
      ],
      "widget": {
        "type": "message-sender",
        "config": {
          "encoding": "morse",
          "message": "A"
        }
      },
      "widgetCoach": {
  "intro": [
    {
      "speaker": "guide",
      "pose": "talk",
      "text": "A shared code can carry a message using a simple signal."
    },
    {
      "speaker": "kid",
      "text": "I’ll build the code, send it in the model, and compare the received message."
    }
  ],
  "reactions": {
    "strategy": {
      "text": "Compare the first mismatched group with the code reference.",
      "pose": "think"
    },
    "retry": {
      "text": "Revise the mismatched group and check any character separators.",
      "pose": "think"
    },
    "milestone": {
      "text": "The receiver decoded your signal. Explain why the shared code matters.",
      "pose": "talk"
    },
    "complete": {
      "text": "You built a signal and explained how a shared code connects it to a message.",
      "pose": "cheer"
    }
  }
}
    },
    {
      "id": "science-u04-l02-c2",
      "title": "Use two drum sounds",
      "blocks": [
        {
          "kind": "text",
          "text": "A drum code can use low and high as its two values. The sender chooses a pattern and the receiver uses the same key."
        },
        {
          "kind": "example",
          "text": "A shared key might assign low-high to A. A pause separates characters but does not add a third drum value."
        },
        {
          "kind": "tip",
          "text": "Response frame: Low means ____, high means ____, and the pattern for A is ____."
        }
      ]
    },
    {
      "id": "science-u04-l02-c3",
      "title": "Compare code clarity",
      "blocks": [
        {
          "kind": "text",
          "text": "A clear code keeps its two values easy to distinguish, preserves order, and includes unambiguous character boundaries."
        },
        {
          "kind": "example",
          "text": "Dot/dash may be clear on paper; low/high may work by sound. Background noise or unclear pauses can reduce drum-code accuracy."
        },
        {
          "kind": "tip",
          "text": "Stretch: Choose one code for a named condition and justify it with accuracy and clarity evidence plus one limitation."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Design Morse and Drum Codes",
    "steps": [
      "Define dot/dash for Morse and low/high for drums.",
      "Assign A the ordered pattern first-value then second-value in both keys.",
      "Encode and decode A with each shared key.",
      "Compare: written dots/dashes are easy to inspect visually; low/high sounds can travel without a screen but may be confused in noise."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU04L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u04-l02-q01",
    "conceptTag": "morse-pattern",
    "reviewCardId": "science-u04-l02-c1",
    "type": "multiple-choice",
    "prompt": "What are the two Morse signal values used here?",
    "choices": [
      {
        "id": "a",
        "text": "Dot and dash"
      },
      {
        "id": "b",
        "text": "Low, middle, and high"
      },
      {
        "id": "c",
        "text": "Black, gray, and white"
      },
      {
        "id": "d",
        "text": "Short, medium, and long"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The code uses dot and dash."
  },
  {
    "id": "science-u04-l02-q02",
    "conceptTag": "morse-pattern",
    "reviewCardId": "science-u04-l02-c1",
    "type": "true-false",
    "prompt": "The order dot-dash can represent a different character from dash-dot.",
    "choices": [
      {
        "id": "true",
        "text": "True — order is part of the pattern"
      },
      {
        "id": "false",
        "text": "False — order never matters"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Morse patterns depend on order."
  },
  {
    "id": "science-u04-l02-q03",
    "conceptTag": "morse-pattern",
    "reviewCardId": "science-u04-l02-c1",
    "type": "multiple-choice",
    "prompt": "A printed Morse reference states A = dot-dash. Which pattern does it assign to A?",
    "choices": [
      {
        "id": "a",
        "text": "dash-dash"
      },
      {
        "id": "b",
        "text": "dot-dash"
      },
      {
        "id": "c",
        "text": "dot-dot-dot"
      },
      {
        "id": "d",
        "text": "dash-dot-dot"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "A is dot-dash."
  },
  {
    "id": "science-u04-l02-q04",
    "conceptTag": "morse-pattern",
    "reviewCardId": "science-u04-l02-c1",
    "type": "fill-blank",
    "prompt": "A short Morse value is called a ___.",
    "acceptedAnswers": [
      "dot"
    ],
    "explanation": "Dot is one of the two values."
  },
  {
    "id": "science-u04-l02-q05",
    "conceptTag": "drum-pattern",
    "reviewCardId": "science-u04-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which pair keeps a drum code to two values?",
    "choices": [
      {
        "id": "a",
        "text": "quiet, medium, loud"
      },
      {
        "id": "b",
        "text": "tap, shake, scrape"
      },
      {
        "id": "c",
        "text": "low and high"
      },
      {
        "id": "d",
        "text": "one, two, three"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Low/high is exactly two values."
  },
  {
    "id": "science-u04-l02-q06",
    "conceptTag": "drum-pattern",
    "reviewCardId": "science-u04-l02-c2",
    "type": "true-false",
    "prompt": "A shared pause may separate characters without becoming a third drum value.",
    "choices": [
      {
        "id": "true",
        "text": "True — it marks grouping"
      },
      {
        "id": "false",
        "text": "False — every pause is a signal value"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The pause is a boundary convention."
  },
  {
    "id": "science-u04-l02-q07",
    "conceptTag": "drum-pattern",
    "reviewCardId": "science-u04-l02-c2",
    "type": "multiple-choice",
    "prompt": "What must a drum-code receiver know?",
    "choices": [
      {
        "id": "a",
        "text": "The sender’s favorite rhythm"
      },
      {
        "id": "b",
        "text": "The drum’s color"
      },
      {
        "id": "c",
        "text": "The room size"
      },
      {
        "id": "d",
        "text": "The shared low/high key and reading order"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The receiver needs the code rules."
  },
  {
    "id": "science-u04-l02-q08",
    "conceptTag": "drum-pattern",
    "reviewCardId": "science-u04-l02-c2",
    "type": "multiple-choice",
    "prompt": "Which pattern matches low-high for A?",
    "choices": [
      {
        "id": "a",
        "text": "one low sound followed by one high sound"
      },
      {
        "id": "b",
        "text": "two high sounds followed by low"
      },
      {
        "id": "c",
        "text": "three medium sounds"
      },
      {
        "id": "d",
        "text": "one scrape only"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It copies the assigned order."
  },
  {
    "id": "science-u04-l02-q09",
    "conceptTag": "code-clarity-comparison",
    "reviewCardId": "science-u04-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which criterion asks whether values are easy to tell apart?",
    "choices": [
      {
        "id": "a",
        "text": "Cost"
      },
      {
        "id": "b",
        "text": "Clarity"
      },
      {
        "id": "c",
        "text": "Decoration"
      },
      {
        "id": "d",
        "text": "Length only"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Clarity concerns distinguishability."
  },
  {
    "id": "science-u04-l02-q10",
    "conceptTag": "code-clarity-comparison",
    "reviewCardId": "science-u04-l02-c3",
    "type": "true-false",
    "prompt": "Background noise can be a limitation for a drum-sound code.",
    "choices": [
      {
        "id": "true",
        "text": "True — noise can hide distinctions"
      },
      {
        "id": "false",
        "text": "False — conditions never matter"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Noise can reduce accurate decoding."
  },
  {
    "id": "science-u04-l02-q11",
    "conceptTag": "code-clarity-comparison",
    "reviewCardId": "science-u04-l02-c3",
    "type": "multiple-choice",
    "prompt": "A learner must choose a code for a printed card. Written Morse uses visible dots and dashes; a drum code uses low and high sounds that may be affected by noise. Which evidence favors Morse?",
    "choices": [
      {
        "id": "a",
        "text": "It is always faster"
      },
      {
        "id": "b",
        "text": "It uses three values"
      },
      {
        "id": "c",
        "text": "Dots and dashes can be inspected visually"
      },
      {
        "id": "d",
        "text": "It needs no shared key"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Visual inspection supports clarity."
  },
  {
    "id": "science-u04-l02-q12",
    "conceptTag": "code-clarity-comparison",
    "reviewCardId": "science-u04-l02-c3",
    "type": "multiple-choice",
    "prompt": "Which comparison is justified?",
    "choices": [
      {
        "id": "a",
        "text": "Drums are always best"
      },
      {
        "id": "b",
        "text": "Morse is always best"
      },
      {
        "id": "c",
        "text": "Both codes guarantee success"
      },
      {
        "id": "d",
        "text": "Choose written Morse when visual inspection matters; choose drums when a sound route fits, while considering noise"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It links conditions to strengths and limits."
  },
  {
    "id": "science-u04-l02-q13",
    "conceptTag": "code-clarity-comparison",
    "reviewCardId": "science-u04-l02-c3",
    "type": "fill-blank",
    "prompt": "A code is clear when its two values are easy to tell ___.",
    "acceptedAnswers": [
      "apart"
    ],
    "explanation": "Distinct values support accurate decoding."
  }
];

const scienceU04L02Lesson: Lesson = {
  ...scienceU04L02Core,
  quiz: { passThreshold: 8, pool: scienceU04L02Questions },
};

const scienceU04L03Core = {
  "id": "science-u04-l03",
  "unitId": "science-u04",
  "title": "Send Binary-Grid Picture Messages",
  "indicatorCodes": [
    "4-PS4-3"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A small picture can be described one grid square at a time with black and white values."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "The sender and receiver must agree where to start and how to move through the rows."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will encode, decode, and repair one mismatched square."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s turn a picture into an exact two-value pattern!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u04-l03-c1",
      "title": "Assign black and white values",
      "blocks": [
        {
          "kind": "text",
          "text": "A binary picture grid assigns one of two values to every square: black or white. A complete message includes a value for each square."
        },
        {
          "kind": "example",
          "text": "For a 2 × 2 diagonal picture, the top-left and bottom-right squares are black; the other two are white."
        },
        {
          "kind": "tip",
          "text": "Support: Cover all but one square and name only black or white before moving on."
        }
      ]
    },
    {
      "id": "science-u04-l03-c2",
      "title": "Read rows in a shared order",
      "blocks": [
        {
          "kind": "text",
          "text": "Agree to begin at top-left, read left to right, then continue on the next row. A different order can produce a different picture from the same values."
        },
        {
          "kind": "example",
          "text": "The diagonal 2 × 2 grid reads black, white | white, black in row order."
        },
        {
          "kind": "tip",
          "text": "Response frame: Start at ____, move ____, then move to ____."
        }
      ]
    },
    {
      "id": "science-u04-l03-c3",
      "title": "Find and repair a mismatch",
      "blocks": [
        {
          "kind": "text",
          "text": "Compare the decoded grid with the intended grid square by square in the shared order. Change only the first mismatched square, then compare again."
        },
        {
          "kind": "example",
          "text": "If the decoded bottom-right square is white but the intended square is black, revise that value to black."
        },
        {
          "kind": "tip",
          "text": "Stretch: Explain how one value error changes the decoded picture and how a position-by-position check locates it."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Send Binary-Grid Picture Messages",
    "steps": [
      "Assign black/white as the only two grid values.",
      "Read the intended 2 × 2 diagonal from top-left across each row.",
      "Decode black, white | white, white and compare with the target.",
      "Find the bottom-right mismatch, change it to black, and confirm the decoded grid matches."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU04L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u04-l03-q01",
    "conceptTag": "binary-grid-values",
    "reviewCardId": "science-u04-l03-c1",
    "type": "multiple-choice",
    "prompt": "A picture code assigns every grid square one of two values: black or white. What are the two values in this picture code?",
    "choices": [
      {
        "id": "a",
        "text": "Black and white"
      },
      {
        "id": "b",
        "text": "Black, gray, and white"
      },
      {
        "id": "c",
        "text": "0, 1, and 2"
      },
      {
        "id": "d",
        "text": "Small and large squares"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Each square is black or white."
  },
  {
    "id": "science-u04-l03-q02",
    "conceptTag": "binary-grid-values",
    "reviewCardId": "science-u04-l03-c1",
    "type": "true-false",
    "prompt": "Every grid square needs one code value.",
    "choices": [
      {
        "id": "true",
        "text": "True — each position must be represented"
      },
      {
        "id": "false",
        "text": "False — blank positions decode themselves"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A complete grid accounts for every square."
  },
  {
    "id": "science-u04-l03-q03",
    "conceptTag": "binary-grid-values",
    "reviewCardId": "science-u04-l03-c1",
    "type": "multiple-choice",
    "prompt": "An intended 2 × 2 grid is read from top-left across each row: black, white | white, black. Which squares are black?",
    "choices": [
      {
        "id": "a",
        "text": "top-right and bottom-left"
      },
      {
        "id": "b",
        "text": "top-left and bottom-right"
      },
      {
        "id": "c",
        "text": "both top squares"
      },
      {
        "id": "d",
        "text": "both bottom squares"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Those positions form the stated diagonal."
  },
  {
    "id": "science-u04-l03-q04",
    "conceptTag": "binary-grid-values",
    "reviewCardId": "science-u04-l03-c1",
    "type": "fill-blank",
    "prompt": "An intended 2 × 2 grid is read from top-left across each row: black, white | white, black. The top-left square is ___.",
    "acceptedAnswers": [
      "black"
    ],
    "explanation": "The first diagonal square is black."
  },
  {
    "id": "science-u04-l03-q05",
    "conceptTag": "binary-grid-order",
    "reviewCardId": "science-u04-l03-c2",
    "type": "multiple-choice",
    "prompt": "For a 2 × 2 grid, the sender and receiver agree to start at top-left, read left to right, and then continue on the next row. Where does the reading order begin?",
    "choices": [
      {
        "id": "a",
        "text": "Bottom-right"
      },
      {
        "id": "b",
        "text": "Top-right"
      },
      {
        "id": "c",
        "text": "Top-left"
      },
      {
        "id": "d",
        "text": "Any random square"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The shared order begins top-left."
  },
  {
    "id": "science-u04-l03-q06",
    "conceptTag": "binary-grid-order",
    "reviewCardId": "science-u04-l03-c2",
    "type": "sort",
    "prompt": "Order the row-reading steps.",
    "items": [
      {
        "id": "next-row",
        "text": "Move to the next row"
      },
      {
        "id": "start",
        "text": "Start at the top-left square"
      },
      {
        "id": "across",
        "text": "Read left to right across the row"
      }
    ],
    "correctOrder": [
      "start",
      "across",
      "next-row"
    ],
    "explanation": "The order starts top-left, goes across, then moves down."
  },
  {
    "id": "science-u04-l03-q07",
    "conceptTag": "binary-grid-order",
    "reviewCardId": "science-u04-l03-c2",
    "type": "multiple-choice",
    "prompt": "An intended 2 × 2 grid has black top-left and bottom-right squares and white top-right and bottom-left squares. What pattern represents it in row order?",
    "choices": [
      {
        "id": "a",
        "text": "white, black | black, white"
      },
      {
        "id": "b",
        "text": "black, black | white, white"
      },
      {
        "id": "c",
        "text": "white, white | black, black"
      },
      {
        "id": "d",
        "text": "black, white | white, black"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It follows the four stated square values."
  },
  {
    "id": "science-u04-l03-q08",
    "conceptTag": "binary-grid-order",
    "reviewCardId": "science-u04-l03-c2",
    "type": "true-false",
    "prompt": "Changing the agreed reading order can change the decoded picture.",
    "choices": [
      {
        "id": "true",
        "text": "True — position order carries information"
      },
      {
        "id": "false",
        "text": "False — order never matters"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A grid pattern depends on positions."
  },
  {
    "id": "science-u04-l03-q09",
    "conceptTag": "binary-grid-debugging",
    "reviewCardId": "science-u04-l03-c3",
    "type": "multiple-choice",
    "prompt": "The decoded bottom-right square is white instead of black. What should be repaired?",
    "choices": [
      {
        "id": "a",
        "text": "Only the bottom-right value"
      },
      {
        "id": "b",
        "text": "Every square"
      },
      {
        "id": "c",
        "text": "The grid size"
      },
      {
        "id": "d",
        "text": "The black/white meanings"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "The comparison identifies one mismatch."
  },
  {
    "id": "science-u04-l03-q10",
    "conceptTag": "binary-grid-debugging",
    "reviewCardId": "science-u04-l03-c3",
    "type": "true-false",
    "prompt": "A position-by-position comparison can locate a grid error.",
    "choices": [
      {
        "id": "true",
        "text": "True — compare corresponding squares"
      },
      {
        "id": "false",
        "text": "False — errors cannot be located"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Corresponding positions reveal mismatches."
  },
  {
    "id": "science-u04-l03-q11",
    "conceptTag": "binary-grid-debugging",
    "reviewCardId": "science-u04-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which action is least useful for debugging?",
    "choices": [
      {
        "id": "a",
        "text": "Compare intended and decoded rows"
      },
      {
        "id": "b",
        "text": "Change several random squares at once"
      },
      {
        "id": "c",
        "text": "Find the first mismatch"
      },
      {
        "id": "d",
        "text": "Decode again after one repair"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Random changes do not isolate the error."
  },
  {
    "id": "science-u04-l03-q12",
    "conceptTag": "binary-grid-debugging",
    "reviewCardId": "science-u04-l03-c3",
    "type": "multiple-choice",
    "prompt": "Why can one wrong value matter?",
    "choices": [
      {
        "id": "a",
        "text": "It adds a third code value"
      },
      {
        "id": "b",
        "text": "It changes the reading direction automatically"
      },
      {
        "id": "c",
        "text": "It changes one square of the decoded picture"
      },
      {
        "id": "d",
        "text": "It proves the code failed everywhere"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Each value controls a square."
  },
  {
    "id": "science-u04-l03-q13",
    "conceptTag": "binary-grid-debugging",
    "reviewCardId": "science-u04-l03-c3",
    "type": "multiple-choice",
    "prompt": "Which debugging explanation is complete?",
    "choices": [
      {
        "id": "a",
        "text": "The picture looks wrong"
      },
      {
        "id": "b",
        "text": "Use a new grid"
      },
      {
        "id": "c",
        "text": "Change all white squares"
      },
      {
        "id": "d",
        "text": "Compare in shared order, repair the first mismatch, and decode again"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It gives a precise repeatable process."
  }
];

const scienceU04L03Lesson: Lesson = {
  ...scienceU04L03Core,
  quiz: { passThreshold: 8, pool: scienceU04L03Questions },
};

const scienceU04L04Core = {
  "id": "science-u04-l04",
  "unitId": "science-u04",
  "title": "Compare Message Solutions",
  "indicatorCodes": [
    "4-PS4-3"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Three teams encode the same four-character message with Morse, low/high drums, and a black/white grid strip."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "A fair comparison sends the same information under the same conditions."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare accuracy, clarity, and efficiency, then justify a choice."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s choose with evidence instead of preference!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u04-l04-c1",
      "title": "Name comparison criteria",
      "blocks": [
        {
          "kind": "text",
          "text": "Accuracy asks whether decoding matches the intended message. Clarity asks whether the two values and boundaries are distinguishable. Efficiency asks how many values or how much time the solution uses."
        },
        {
          "kind": "example",
          "text": "A code can be accurate but slower, or quick but unclear in noise. No single criterion answers every design question."
        },
        {
          "kind": "tip",
          "text": "Support: Make three columns labeled accuracy, clarity, and efficiency before reading results."
        }
      ]
    },
    {
      "id": "science-u04-l04-c2",
      "title": "Test accuracy and efficiency",
      "blocks": [
        {
          "kind": "text",
          "text": "Hold the target message and conditions constant. Record decoded characters, errors, and values used for each solution."
        },
        {
          "kind": "example",
          "text": "Results: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid strip decoded 4/4 using 16 values."
        },
        {
          "kind": "tip",
          "text": "Response frame: ____ was more/less ____ because the result shows ____."
        }
      ]
    },
    {
      "id": "science-u04-l04-c3",
      "title": "Choose and justify a solution",
      "blocks": [
        {
          "kind": "text",
          "text": "Choose the solution that best meets the named need and cite at least two criteria. A limitation makes the justification more honest."
        },
        {
          "kind": "example",
          "text": "For an accurate printed card, Morse may fit because it decoded all characters with fewer values than the grid. Its limitation is that readers still need the shared key."
        },
        {
          "kind": "tip",
          "text": "Stretch: Defend a different solution for a different condition and explain why the chosen criteria changed."
        }
      ]
    }
  ],
  "workedExample": {
    "title": "Apply: Compare Message Solutions",
    "steps": [
      "Keep the four-character target and test conditions the same.",
      "Compare decoded accuracy: Morse 4/4, drums 3/4, grid 4/4.",
      "Compare efficiency: Morse 12 values, drums 10, grid 16; note that drums had an error in noise.",
      "Choose Morse for accurate compact print, cite both results, and acknowledge the shared-key limitation."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU04L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u04-l04-q01",
    "conceptTag": "message-criteria",
    "reviewCardId": "science-u04-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which criterion asks whether decoded information matches the target?",
    "choices": [
      {
        "id": "a",
        "text": "Accuracy"
      },
      {
        "id": "b",
        "text": "Clarity"
      },
      {
        "id": "c",
        "text": "Decoration"
      },
      {
        "id": "d",
        "text": "Volume"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Accuracy measures the match."
  },
  {
    "id": "science-u04-l04-q02",
    "conceptTag": "message-criteria",
    "reviewCardId": "science-u04-l04-c1",
    "type": "true-false",
    "prompt": "Efficiency and accuracy are different criteria.",
    "choices": [
      {
        "id": "true",
        "text": "True — a shorter code can still contain errors"
      },
      {
        "id": "false",
        "text": "False — they always mean the same thing"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The results can trade one criterion against another."
  },
  {
    "id": "science-u04-l04-q03",
    "conceptTag": "message-criteria",
    "reviewCardId": "science-u04-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which criterion asks whether two values are easy to distinguish?",
    "choices": [
      {
        "id": "a",
        "text": "Speed only"
      },
      {
        "id": "b",
        "text": "Clarity"
      },
      {
        "id": "c",
        "text": "Color preference"
      },
      {
        "id": "d",
        "text": "Cost only"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Clarity concerns distinguishability."
  },
  {
    "id": "science-u04-l04-q04",
    "conceptTag": "message-criteria",
    "reviewCardId": "science-u04-l04-c1",
    "type": "fill-blank",
    "prompt": "The criterion about values or time used is ___.",
    "acceptedAnswers": [
      "efficiency"
    ],
    "explanation": "Efficiency concerns resources used."
  },
  {
    "id": "science-u04-l04-q05",
    "conceptTag": "message-solution-evidence",
    "reviewCardId": "science-u04-l04-c2",
    "type": "multiple-choice",
    "prompt": "Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. Which solutions decoded all four characters?",
    "choices": [
      {
        "id": "a",
        "text": "Drums only"
      },
      {
        "id": "b",
        "text": "Grid only"
      },
      {
        "id": "c",
        "text": "Morse and grid"
      },
      {
        "id": "d",
        "text": "Morse and drums"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The results list 4/4 for Morse and grid."
  },
  {
    "id": "science-u04-l04-q06",
    "conceptTag": "message-solution-evidence",
    "reviewCardId": "science-u04-l04-c2",
    "type": "true-false",
    "prompt": "Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. The drum solution had one decoding error in the noise condition.",
    "choices": [
      {
        "id": "true",
        "text": "True — it decoded 3 of 4"
      },
      {
        "id": "false",
        "text": "False — it decoded all 4"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The written result is 3/4."
  },
  {
    "id": "science-u04-l04-q07",
    "conceptTag": "message-solution-evidence",
    "reviewCardId": "science-u04-l04-c2",
    "type": "multiple-choice",
    "prompt": "Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. Which accurate solution used fewer values?",
    "choices": [
      {
        "id": "a",
        "text": "Drums"
      },
      {
        "id": "b",
        "text": "Both accurate solutions used 16"
      },
      {
        "id": "c",
        "text": "Grid"
      },
      {
        "id": "d",
        "text": "Morse"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Morse used 12 versus grid’s 16."
  },
  {
    "id": "science-u04-l04-q08",
    "conceptTag": "message-solution-evidence",
    "reviewCardId": "science-u04-l04-c2",
    "type": "multiple-choice",
    "prompt": "Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. Why is this a fair comparison?",
    "choices": [
      {
        "id": "a",
        "text": "The same message and conditions were used"
      },
      {
        "id": "b",
        "text": "Each team sent a different message"
      },
      {
        "id": "c",
        "text": "Only favorite codes were recorded"
      },
      {
        "id": "d",
        "text": "The results were guessed"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Shared conditions make results comparable."
  },
  {
    "id": "science-u04-l04-q09",
    "conceptTag": "message-solution-choice",
    "reviewCardId": "science-u04-l04-c3",
    "type": "multiple-choice",
    "prompt": "Three solutions encoded the same four-character message under the same conditions: Morse decoded 4/4 using 12 values; drums decoded 3/4 using 10 values in background noise; grid decoded 4/4 using 16 values. Which choice is best justified for accurate compact print?",
    "choices": [
      {
        "id": "a",
        "text": "Drums, because 3/4 is perfect"
      },
      {
        "id": "b",
        "text": "Morse, because it decoded 4/4 with fewer values than the grid"
      },
      {
        "id": "c",
        "text": "Grid, because it used the most values"
      },
      {
        "id": "d",
        "text": "Any code, because evidence does not matter"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Morse meets both named criteria."
  },
  {
    "id": "science-u04-l04-q10",
    "conceptTag": "message-solution-choice",
    "reviewCardId": "science-u04-l04-c3",
    "type": "true-false",
    "prompt": "A justified choice should include a limitation.",
    "choices": [
      {
        "id": "true",
        "text": "True — limitations show the tradeoff"
      },
      {
        "id": "false",
        "text": "False — chosen solutions have no limits"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A limitation keeps the comparison honest."
  },
  {
    "id": "science-u04-l04-q11",
    "conceptTag": "message-solution-choice",
    "reviewCardId": "science-u04-l04-c3",
    "type": "multiple-choice",
    "prompt": "Example choice: For an accurate printed card, Morse decoded all four characters using 12 values, but readers still need the shared key. What is one Morse limitation in this example?",
    "choices": [
      {
        "id": "a",
        "text": "It decoded only 3 characters"
      },
      {
        "id": "b",
        "text": "It cannot be written"
      },
      {
        "id": "c",
        "text": "Readers need the shared key"
      },
      {
        "id": "d",
        "text": "It uses three signal values"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The shared reference is necessary."
  },
  {
    "id": "science-u04-l04-q12",
    "conceptTag": "message-solution-choice",
    "reviewCardId": "science-u04-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which claim uses two criteria?",
    "choices": [
      {
        "id": "a",
        "text": "Morse is my favorite"
      },
      {
        "id": "b",
        "text": "Drums sound interesting"
      },
      {
        "id": "c",
        "text": "Grid has squares"
      },
      {
        "id": "d",
        "text": "Morse was accurate and used fewer values than the other accurate solution"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "It cites accuracy and efficiency."
  },
  {
    "id": "science-u04-l04-q13",
    "conceptTag": "message-solution-choice",
    "reviewCardId": "science-u04-l04-c3",
    "type": "fill-blank",
    "prompt": "Results: Morse decoded 4/4 using 12 values; grid decoded 4/4 using 16 values. Complete the justification: I choose Morse because it decoded 4/4 and used ___ values.",
    "acceptedAnswers": [
      "12",
      "twelve"
    ],
    "explanation": "The results give Morse 12 values."
  }
];

const scienceU04L04Lesson: Lesson = {
  ...scienceU04L04Core,
  quiz: { passThreshold: 8, pool: scienceU04L04Questions },
};

export const unit04Lessons: Lesson[] = [
  scienceU04L01Lesson,
  scienceU04L02Lesson,
  scienceU04L03Lesson,
  scienceU04L04Lesson,
];
