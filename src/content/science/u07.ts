import type { Lesson } from '../schema';

const scienceU07L01Core = {
  "id": "science-u07-l01",
  "unitId": "science-u07",
  "title": "Find Earth-Feature Patterns on Maps",
  "indicatorCodes": [
    "4-ESS2-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A topographic map uses contour lines and printed elevations to represent land height."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "An accessible coordinate map locates six peaks in western column A and three valleys through central column C."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will read the key, recognize clustered or linear patterns, and describe only what the data support."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s turn map data into a precise pattern claim!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u07-l01-c1",
      "title": "Read a map key and elevation",
      "blocks": [
        {
          "kind": "text",
          "text": "Contour lines connect places represented at the same elevation. Printed point entries can be compared by their elevation values; they are not necessarily plotted on the contour drawing."
        },
        {
          "kind": "example",
          "text": "In the activity key, Ridge is 200 m and Valley is 100 m. Therefore Ridge has the higher printed elevation."
        },
        {
          "kind": "tip",
          "text": "Support: Read the unit after each number, then compare the printed values before naming the higher entry."
        }
      ],
      "widget": {
        "type": "topographic-map-explorer",
        "config": {
          "contours": [
            {
              "elevation": 100,
              "points": "10,90 50,60 90,90"
            },
            {
              "elevation": 200,
              "points": "25,75 50,45 75,75"
            }
          ],
          "points": [
            {
              "id": "ridge",
              "label": "Ridge",
              "elevation": 200
            },
            {
              "id": "valley",
              "label": "Valley",
              "elevation": 100
            },
            {
              "id": "bench",
              "label": "Bench",
              "elevation": 150
            },
            {
              "id": "marsh",
              "label": "Marsh",
              "elevation": 60
            }
          ],
          "targetPointId": "ridge"
        }
      }
    },
    {
      "id": "science-u07-l01-c2",
      "title": "Recognize clustered and linear patterns",
      "blocks": [
        {
          "kind": "text",
          "text": "The accessible map uses columns A–E from west to east and rows 1–6 from north to south. A vertical band keeps one column while row numbers change; a cluster keeps nearby columns and rows."
        },
        {
          "kind": "example",
          "text": `Coordinate map (columns A–E west→east; rows 1–6 north→south):\n       A   B   C   D   E\nRow 1  P1  ·   ·   ·   ·\nRow 2  P2  ·   V1  ·   ·\nRow 3  P3  ·   V2  ·   ·\nRow 4  P4  ·   V3  ·   ·\nRow 5  P5  ·   ·   ·   ·\nRow 6  P6  ·   ·   ·   ·\nEquivalent text table: P1 A1, P2 A2, P3 A3, P4 A4, P5 A5, P6 A6; V1 C2, V2 C3, V3 C4. The six peak symbols form a north–south band in western column A; the valley symbols form a shorter central band in column C.`
        },
        {
          "kind": "tip",
          "text": "Response frame: The ____ features form a ____ pattern because locations ____ are arranged ____."
        }
      ],
      "widget": {
        "type": "data-plot-builder",
        "config": {
          "kind": "bar",
          "prompt": "Build a bar for how many mapped peaks sit in each column A-E.",
          "categories": [
            "A",
            "B",
            "C",
            "D",
            "E"
          ],
          "target": {
            "A": 6,
            "B": 0,
            "C": 0,
            "D": 0,
            "E": 0
          } as Record<string, number>
        }
      }
    },
    {
      "id": "science-u07-l01-c3",
      "title": "Describe a pattern from data",
      "blocks": [
        {
          "kind": "text",
          "text": "A pattern claim names the feature, spatial arrangement, and several supporting data points. It stops before an unsupported cause."
        },
        {
          "kind": "example",
          "text": "Claim: Six mapped peaks form a north-to-south band in western column A. P1 at A1, P3 at A3, and P6 at A6 show the band’s extent."
        },
        {
          "kind": "tip",
          "text": "Stretch: Cite three named locations and state one conclusion the map cannot support, such as why the features formed."
        }
      ],
      "widget": {
        "type": "central-idea-organizer",
        "config": {
          "mainIdeaChoices": [
            "Six mapped peaks form a north-south band in western column A",
            "The mapped peaks are scattered with no arrangement"
          ],
          "details": [
            {
              "id": "p1",
              "text": "P1 is at A1.",
              "supports": [
                "Six mapped peaks form a north-south band in western column A"
              ]
            },
            {
              "id": "p3",
              "text": "P3 is at A3.",
              "supports": [
                "Six mapped peaks form a north-south band in western column A"
              ]
            },
            {
              "id": "p6",
              "text": "P6 is at A6.",
              "supports": [
                "Six mapped peaks form a north-south band in western column A"
              ]
            },
            {
              "id": "spread",
              "text": "The peaks appear in five different columns.",
              "supports": [
                "The mapped peaks are scattered with no arrangement"
              ]
            }
          ],
          "requiredDetailCount": 3
        }
      }
    }
  ],
  "workedExample": {
    "title": "Apply: Find Earth-Feature Patterns on Maps",
    "steps": [
      "Read the coordinate key: A is west, E is east, row 1 is north, and row 6 is south.",
      "Locate P1 at A1, P3 at A3, and P6 at A6; their shared column and changing rows form a vertical western band.",
      "Compare V1 C2, V2 C3, and V3 C4; those mapped valley points form a shorter central band.",
      "Describe only the mapped pattern; do not claim a formation cause because the location/elevation data do not provide process evidence."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;


const scienceU07L01Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u07-l01-q01",
    "conceptTag": "map-data-reading",
    "reviewCardId": "science-u07-l01-c1",
    "type": "multiple-choice",
    "prompt": "Map key: Ridge 200 m; Valley 100 m. Which printed point has the higher elevation?",
    "choices": [
      {
        "id": "a",
        "text": "Ridge at 200 m"
      },
      {
        "id": "b",
        "text": "Valley at 100 m"
      },
      {
        "id": "c",
        "text": "Both are 0 m"
      },
      {
        "id": "d",
        "text": "The map title"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Two hundred is higher than one hundred."
  },
  {
    "id": "science-u07-l01-q02",
    "conceptTag": "map-data-reading",
    "reviewCardId": "science-u07-l01-c1",
    "type": "true-false",
    "prompt": "A contour line connects places represented at the same elevation.",
    "choices": [
      {
        "id": "true",
        "text": "True — that is the map convention"
      },
      {
        "id": "false",
        "text": "False — it connects random labels"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Contour values represent elevation."
  },
  {
    "id": "science-u07-l01-q03",
    "conceptTag": "map-data-reading",
    "reviewCardId": "science-u07-l01-c1",
    "type": "multiple-choice",
    "prompt": "Map key: Ridge 200 m; Valley 100 m. What is the printed elevation of Valley?",
    "choices": [
      {
        "id": "a",
        "text": "0 m"
      },
      {
        "id": "b",
        "text": "100 m"
      },
      {
        "id": "c",
        "text": "200 m"
      },
      {
        "id": "d",
        "text": "300 m"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The key lists Valley at 100 m."
  },
  {
    "id": "science-u07-l01-q04",
    "conceptTag": "map-data-reading",
    "reviewCardId": "science-u07-l01-c1",
    "type": "fill-blank",
    "prompt": "Map key: Ridge 200 m; Valley 100 m. The Ridge entry is ___ m.",
    "acceptedAnswers": [
      "200",
      "two hundred"
    ],
    "explanation": "The printed Ridge elevation is 200 m."
  },
  {
    "id": "science-u07-l01-q05",
    "conceptTag": "earth-feature-patterns",
    "reviewCardId": "science-u07-l01-c2",
    "type": "multiple-choice",
    "prompt": "Which arrangement is linear?",
    "choices": [
      {
        "id": "a",
        "text": "Features scattered with no band"
      },
      {
        "id": "b",
        "text": "Features grouped in one small spot"
      },
      {
        "id": "c",
        "text": "Features arranged along a north-to-south band"
      },
      {
        "id": "d",
        "text": "One feature with no comparison"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "A band is a linear pattern."
  },
  {
    "id": "science-u07-l01-q06",
    "conceptTag": "earth-feature-patterns",
    "reviewCardId": "science-u07-l01-c2",
    "type": "true-false",
    "prompt": "Do P1 at A1 through P6 at A6 form a western north–south band?",
    "choices": [
      {
        "id": "true",
        "text": "True — they share western column A across rows 1–6"
      },
      {
        "id": "false",
        "text": "False — they are all in eastern column E"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The coordinate map places all six peaks in column A from north to south."
  },
  {
    "id": "science-u07-l01-q07",
    "conceptTag": "earth-feature-patterns",
    "reviewCardId": "science-u07-l01-c2",
    "type": "multiple-choice",
    "prompt": "Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4. Which mapped group spans more north-to-south rows?",
    "choices": [
      {
        "id": "a",
        "text": "Neither group"
      },
      {
        "id": "b",
        "text": "Both span one row"
      },
      {
        "id": "c",
        "text": "V1 C2 through V3 C4"
      },
      {
        "id": "d",
        "text": "P1 A1 through P6 A6"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The peak band spans rows 1–6, more than the valley band’s rows 2–4."
  },
  {
    "id": "science-u07-l01-q08",
    "conceptTag": "earth-feature-patterns",
    "reviewCardId": "science-u07-l01-c2",
    "type": "multiple-choice",
    "prompt": "Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4. Which statement analyzes the mapped coordinates?",
    "choices": [
      {
        "id": "a",
        "text": "P1–P6 share western column A while their row numbers increase north to south"
      },
      {
        "id": "b",
        "text": "One hidden process certainly formed every peak"
      },
      {
        "id": "c",
        "text": "The point labels are decorative only"
      },
      {
        "id": "d",
        "text": "The map predicts future change"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Shared column A and changing row numbers describe the mapped spatial pattern."
  },
  {
    "id": "science-u07-l01-q09",
    "conceptTag": "map-pattern-claim",
    "reviewCardId": "science-u07-l01-c3",
    "type": "multiple-choice",
    "prompt": "Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4. Which is the strongest pattern claim from the coordinate map?",
    "choices": [
      {
        "id": "a",
        "text": "There are features"
      },
      {
        "id": "b",
        "text": "Six peaks form a western north–south band from P1 A1 to P6 A6"
      },
      {
        "id": "c",
        "text": "The map is interesting"
      },
      {
        "id": "d",
        "text": "One cause formed all features identically"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It names the arrangement and its mapped endpoints."
  },
  {
    "id": "science-u07-l01-q10",
    "conceptTag": "map-pattern-claim",
    "reviewCardId": "science-u07-l01-c3",
    "type": "true-false",
    "prompt": "Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4. The provided locations alone prove why the peaks formed.",
    "choices": [
      {
        "id": "true",
        "text": "True — location proves cause"
      },
      {
        "id": "false",
        "text": "False — the data describe pattern, not cause"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Causation needs additional evidence."
  },
  {
    "id": "science-u07-l01-q11",
    "conceptTag": "map-pattern-claim",
    "reviewCardId": "science-u07-l01-c3",
    "type": "multiple-choice",
    "prompt": "Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4. Which mapped evidence supports the western-band claim?",
    "choices": [
      {
        "id": "a",
        "text": "Valley is printed at 100 m"
      },
      {
        "id": "b",
        "text": "The title says map"
      },
      {
        "id": "c",
        "text": "P1 A1, P3 A3, and P6 A6 share column A"
      },
      {
        "id": "d",
        "text": "Ridge is a printed entry"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The three coordinates sample one western column across separated rows."
  },
  {
    "id": "science-u07-l01-q12",
    "conceptTag": "map-pattern-claim",
    "reviewCardId": "science-u07-l01-c3",
    "type": "multiple-choice",
    "prompt": "Coordinate map: peaks P1 A1 through P6 A6; valleys V1 C2, V2 C3, V3 C4. Which claim is unsupported?",
    "choices": [
      {
        "id": "a",
        "text": "Ridge has a higher printed elevation than Valley"
      },
      {
        "id": "b",
        "text": "Six peaks are listed along the west"
      },
      {
        "id": "c",
        "text": "Three valleys are listed through the center"
      },
      {
        "id": "d",
        "text": "The location pattern proves one exact formation mechanism"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The map does not provide process evidence."
  },
  {
    "id": "science-u07-l01-q13",
    "conceptTag": "map-pattern-claim",
    "reviewCardId": "science-u07-l01-c3",
    "type": "fill-blank",
    "prompt": "Features arranged along a band form a ___ pattern.",
    "acceptedAnswers": [
      "linear"
    ],
    "explanation": "Linear describes a line-like arrangement."
  }
];

const scienceU07L01Lesson: Lesson = {
  ...scienceU07L01Core,
  quiz: { passThreshold: 8, pool: scienceU07L01Questions },
};

const scienceU07L02Core = {
  "id": "science-u07-l02",
  "unitId": "science-u07",
  "title": "Interpret Earth-Feature Map Data",
  "indicatorCodes": [
    "4-ESS2-2"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A coastal map packet combines contour elevations with a table of named coast and hill locations."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "One point alone cannot establish the larger pattern."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare values, connect several points, and support an interpretation without inventing a cause."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s build the claim from multiple data points!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u07-l02-c1",
      "title": "Compare elevations and locations",
      "blocks": [
        {
          "kind": "text",
          "text": "Compare printed elevations with units and compare named locations using the packet table. Keep value and location evidence separate."
        },
        {
          "kind": "example",
          "text": `Coordinate map (columns A–F west→east; rows 1–4 north→south):\n       A   B   C   D   E   F\nRow 1  ·   H1  ·   H2  ·   H3\nRow 2  ·   ·   ·   ·   ·   ·\nRow 3  ·   ·   ·   ·   ·   ·\nRow 4  ·   C1  ·   C2  ·   C3\nH1–H3 are 50 m; C1–C3 are 0 m. Equivalent text table: H1 B1 50 m, H2 D1 50 m, H3 F1 50 m; C1 B4 0 m, C2 D4 0 m, C3 F4 0 m.`
        },
        {
          "kind": "tip",
          "text": "Support: Make two columns: elevation values and location descriptions. Put each fact in only one column."
        }
      ],
      "widget": {
        "type": "number-line-compare",
        "config": {
          "min": 0,
          "max": 50,
          "a": 0,
          "b": 50,
          "step": 10
        }
      }
    },
    {
      "id": "science-u07-l02-c2",
      "title": "Connect several data points",
      "blocks": [
        {
          "kind": "text",
          "text": "A reliable pattern uses several points that agree. Three southern coast points and three northern hill points support a coast-to-inland elevation pattern."
        },
        {
          "kind": "example",
          "text": "The plotted points show H1–H3 across northern row 1 and C1–C3 across southern row 4. The activity buttons carry the same six named points, so you can step through them and see which elevations agree."
        },
        {
          "kind": "tip",
          "text": "Response frame: Points ____, ____, and ____ share ____; points ____, ____, and ____ share ____."
        }
      ],
      "widget": {
        "type": "topographic-map-explorer",
        "config": {
          "contours": [
            {
              "elevation": 0,
              "points": "5,80 50,70 95,80"
            },
            {
              "elevation": 50,
              "points": "20,60 50,50 80,60"
            }
          ],
          "points": [
            {
              "id": "h1",
              "label": "H1 hill (B1)",
              "elevation": 50
            },
            {
              "id": "h2",
              "label": "H2 hill (D1)",
              "elevation": 50
            },
            {
              "id": "h3",
              "label": "H3 hill (F1)",
              "elevation": 50
            },
            {
              "id": "c1",
              "label": "C1 coast (B4)",
              "elevation": 0
            },
            {
              "id": "c2",
              "label": "C2 coast (D4)",
              "elevation": 0
            },
            {
              "id": "c3",
              "label": "C3 coast (F4)",
              "elevation": 0
            }
          ],
          "targetPointId": "c2"
        }
      }
    },
    {
      "id": "science-u07-l02-c3",
      "title": "Support an interpretation",
      "blocks": [
        {
          "kind": "text",
          "text": "An interpretation combines the pattern and evidence. It should be no broader than the packet."
        },
        {
          "kind": "example",
          "text": "Interpretation: At columns B, D, and F in this packet, each northern row-1 hill is 50 m and each southern row-4 coast point is 0 m."
        },
        {
          "kind": "tip",
          "text": "Stretch: Cite all six data points, then add “in this packet” and name one cause question the data do not answer."
        }
      ],
      "widget": {
        "type": "central-idea-organizer",
        "config": {
          "mainIdeaChoices": [
            "In this packet, northern row-1 hills are 50 m and southern row-4 coast points are 0 m",
            "Land always gets higher as you go north"
          ],
          "details": [
            {
              "id": "h1",
              "text": "H1 at B1 is 50 m.",
              "supports": [
                "In this packet, northern row-1 hills are 50 m and southern row-4 coast points are 0 m"
              ]
            },
            {
              "id": "h3",
              "text": "H3 at F1 is 50 m.",
              "supports": [
                "In this packet, northern row-1 hills are 50 m and southern row-4 coast points are 0 m"
              ]
            },
            {
              "id": "c1",
              "text": "C1 at B4 is 0 m.",
              "supports": [
                "In this packet, northern row-1 hills are 50 m and southern row-4 coast points are 0 m"
              ]
            },
            {
              "id": "c3",
              "text": "C3 at F4 is 0 m.",
              "supports": [
                "In this packet, northern row-1 hills are 50 m and southern row-4 coast points are 0 m"
              ]
            },
            {
              "id": "everywhere",
              "text": "Every place on Earth rises toward the north.",
              "supports": [
                "Land always gets higher as you go north"
              ]
            }
          ],
          "requiredDetailCount": 4
        }
      }
    }
  ],
  "workedExample": {
    "title": "Apply: Interpret Earth-Feature Map Data",
    "steps": [
      "Read the coordinate/elevation table for all six plotted points.",
      "Pair locations by column: H1 B1 with C1 B4, H2 D1 with C2 D4, and H3 F1 with C3 F4.",
      "Notice the repeated pattern in all three columns: northern row 1 is 50 m and southern row 4 is 0 m.",
      "Interpret a north-higher/south-lower pattern in this packet without claiming why it formed."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;


const scienceU07L02Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u07-l02-q01",
    "conceptTag": "map-data-comparison",
    "reviewCardId": "science-u07-l02-c1",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Which entry has the lower printed elevation?",
    "choices": [
      {
        "id": "a",
        "text": "Coast at 0 m"
      },
      {
        "id": "b",
        "text": "Hill at 50 m"
      },
      {
        "id": "c",
        "text": "Both are 100 m"
      },
      {
        "id": "d",
        "text": "Neither has a value"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Zero is below fifty."
  },
  {
    "id": "science-u07-l02-q02",
    "conceptTag": "map-data-comparison",
    "reviewCardId": "science-u07-l02-c1",
    "type": "true-false",
    "prompt": "Are C1 B4, C2 D4, and C3 F4 all plotted on southern row 4?",
    "choices": [
      {
        "id": "true",
        "text": "True — each coast coordinate ends in row 4"
      },
      {
        "id": "false",
        "text": "False — each is on northern row 1"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The coordinate map locates all three coast points on row 4."
  },
  {
    "id": "science-u07-l02-q03",
    "conceptTag": "map-data-comparison",
    "reviewCardId": "science-u07-l02-c1",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Where are H1 B1, H2 D1, and H3 F1 relative to the coast points?",
    "choices": [
      {
        "id": "a",
        "text": "South in row 4"
      },
      {
        "id": "b",
        "text": "North in row 1"
      },
      {
        "id": "c",
        "text": "At the same coordinates"
      },
      {
        "id": "d",
        "text": "Outside the mapped grid"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "All three hill coordinates use northern row 1."
  },
  {
    "id": "science-u07-l02-q04",
    "conceptTag": "map-data-comparison",
    "reviewCardId": "science-u07-l02-c1",
    "type": "fill-blank",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. The representative Hill entry is ___ m.",
    "acceptedAnswers": [
      "50",
      "fifty"
    ],
    "explanation": "The printed elevation is 50 m."
  },
  {
    "id": "science-u07-l02-q05",
    "conceptTag": "multi-point-pattern",
    "reviewCardId": "science-u07-l02-c2",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Why compare the B, D, and F column pairs?",
    "choices": [
      {
        "id": "a",
        "text": "One point is always wrong"
      },
      {
        "id": "b",
        "text": "Their labels rhyme"
      },
      {
        "id": "c",
        "text": "Three repeated north–south comparisons support a pattern"
      },
      {
        "id": "d",
        "text": "They prove a cause"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The repeated column pairs provide several mapped comparisons."
  },
  {
    "id": "science-u07-l02-q06",
    "conceptTag": "multi-point-pattern",
    "reviewCardId": "science-u07-l02-c2",
    "type": "true-false",
    "prompt": "Explorer note: named-point buttons show printed elevations but not plotted locations. The named point buttons provide printed values, not plotted locations on the contour drawing.",
    "choices": [
      {
        "id": "true",
        "text": "True — the widget states this limit"
      },
      {
        "id": "false",
        "text": "False — every name is plotted"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The implementation keeps the data types separate."
  },
  {
    "id": "science-u07-l02-q07",
    "conceptTag": "multi-point-pattern",
    "reviewCardId": "science-u07-l02-c2",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Which mapped set supports the higher northern group?",
    "choices": [
      {
        "id": "a",
        "text": "C1 B4 only"
      },
      {
        "id": "b",
        "text": "Coast at 0 m only"
      },
      {
        "id": "c",
        "text": "C1 B4, C2 D4, C3 F4"
      },
      {
        "id": "d",
        "text": "H1 B1, H2 D1, H3 F1"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The three row-1 hill points are each printed at 50 m."
  },
  {
    "id": "science-u07-l02-q08",
    "conceptTag": "multi-point-pattern",
    "reviewCardId": "science-u07-l02-c2",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Which comparison analyzes all six mapped points?",
    "choices": [
      {
        "id": "a",
        "text": "At B, D, and F, row-1 hills are 50 m while row-4 coast points are 0 m"
      },
      {
        "id": "b",
        "text": "Coast is one word"
      },
      {
        "id": "c",
        "text": "Hill has four letters"
      },
      {
        "id": "d",
        "text": "The grid caused the elevations"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It compares locations and elevations across every mapped column pair."
  },
  {
    "id": "science-u07-l02-q09",
    "conceptTag": "map-interpretation-evidence",
    "reviewCardId": "science-u07-l02-c3",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Which interpretation is supported by the coordinate map?",
    "choices": [
      {
        "id": "a",
        "text": "Every coast in the world is identical"
      },
      {
        "id": "b",
        "text": "In columns B, D, and F, northern row-1 hills are higher than southern row-4 coast points"
      },
      {
        "id": "c",
        "text": "The hills must have one exact cause"
      },
      {
        "id": "d",
        "text": "Future elevations are known"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It stays within the six plotted locations and elevations."
  },
  {
    "id": "science-u07-l02-q10",
    "conceptTag": "map-interpretation-evidence",
    "reviewCardId": "science-u07-l02-c3",
    "type": "true-false",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. The interpretation should be limited to the supplied packet.",
    "choices": [
      {
        "id": "true",
        "text": "True — the evidence has a defined scope"
      },
      {
        "id": "false",
        "text": "False — it proves all maps"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Scope prevents overgeneralization."
  },
  {
    "id": "science-u07-l02-q11",
    "conceptTag": "map-interpretation-evidence",
    "reviewCardId": "science-u07-l02-c3",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Which evidence best supports the interpretation?",
    "choices": [
      {
        "id": "a",
        "text": "One contour color"
      },
      {
        "id": "b",
        "text": "A favorite point"
      },
      {
        "id": "c",
        "text": "All three row-1 hill coordinates at 50 m and all three row-4 coast coordinates at 0 m"
      },
      {
        "id": "d",
        "text": "The title alone"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "It uses every mapped location and elevation."
  },
  {
    "id": "science-u07-l02-q12",
    "conceptTag": "map-interpretation-evidence",
    "reviewCardId": "science-u07-l02-c3",
    "type": "multiple-choice",
    "prompt": "Map table: hills H1 B1, H2 D1, H3 F1 are 50 m; coast points C1 B4, C2 D4, C3 F4 are 0 m. Which question remains unanswered?",
    "choices": [
      {
        "id": "a",
        "text": "Which representative value is lower?"
      },
      {
        "id": "b",
        "text": "Where are the coast points?"
      },
      {
        "id": "c",
        "text": "Where are the hill points?"
      },
      {
        "id": "d",
        "text": "What exact process formed the pattern?"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The data do not establish a formation cause."
  },
  {
    "id": "science-u07-l02-q13",
    "conceptTag": "map-interpretation-evidence",
    "reviewCardId": "science-u07-l02-c3",
    "type": "fill-blank",
    "prompt": "A claim supported by several map points is a map ___.",
    "acceptedAnswers": [
      "interpretation"
    ],
    "explanation": "The lesson builds an evidence-based interpretation."
  }
];

const scienceU07L02Lesson: Lesson = {
  ...scienceU07L02Core,
  quiz: { passThreshold: 8, pool: scienceU07L02Questions },
};

const scienceU07L03Core = {
  "id": "science-u07-l03",
  "unitId": "science-u07",
  "title": "Test a Weathering or Erosion Variable",
  "indicatorCodes": [
    "4-ESS2-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "Two soil trays receive the same amount of water down the same slope."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "One tray has plant cover and the other is bare, so vegetation is the single changed condition."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will plan a fair water-erosion comparison and use supplied observations as evidence."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s change one condition and watch the soil, not the screen, for evidence!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u07-l03-c1",
      "title": "Choose one process and variable",
      "blocks": [
        {
          "kind": "text",
          "text": "This investigation studies water erosion only: the movement of soil by flowing water. The single varied condition is vegetation cover, on or off."
        },
        {
          "kind": "example",
          "text": "Both trays use the same soil, slope, water amount, pour height, tray size, and observation time."
        },
        {
          "kind": "tip",
          "text": "Support: Circle water erosion as the process and vegetation as the one variable; cross out every second change."
        }
      ],
      "widget": {
        "type": "erosion-simulator",
        "config": {
          "terrain": "soil",
          "agents": [
            "water",
            "wind",
            "ice"
          ],
          "vegetation": false,
          "targetAgent": "water"
        }
      }
    },
    {
      "id": "science-u07-l03-c2",
      "title": "Plan a fair comparison",
      "blocks": [
        {
          "kind": "text",
          "text": "A fair comparison changes vegetation cover while holding the other listed conditions constant. Predict before collecting observations."
        },
        {
          "kind": "example",
          "text": "Prediction: the bare tray will lose more loose soil downhill than the covered tray. The activity can model this prediction but is not tray evidence."
        },
        {
          "kind": "tip",
          "text": "Response frame: I change ____. I keep ____ the same. I predict ____."
        }
      ],
      "widget": {
        "type": "erosion-simulator",
        "config": {
          "terrain": "soil",
          "agents": [
            "water",
            "wind",
            "ice"
          ],
          "vegetation": false,
          "targetAgent": "water"
        }
      }
    },
    {
      "id": "science-u07-l03-c3",
      "title": "Use observations as evidence",
      "blocks": [
        {
          "kind": "text",
          "text": "Supplied tray observations: bare soil formed a deeper channel and 14 spoonfuls reached the catch pan; covered soil formed a shallow channel and 5 spoonfuls reached the pan."
        },
        {
          "kind": "example",
          "text": "These observations support that vegetation reduced the rate of water erosion under the tested conditions. They do not show that vegetation stops all erosion."
        },
        {
          "kind": "tip",
          "text": "Stretch: Cite both channel descriptions and both spoon counts, then limit the claim to water erosion in this setup."
        }
      ],
      "widget": {
        "type": "data-plot-builder",
        "config": {
          "kind": "bar",
          "prompt": "Plot the supplied tray counts: spoonfuls of soil that reached the catch pan.",
          "categories": [
            "Bare tray",
            "Covered tray"
          ],
          "target": {
            "Bare tray": 14,
            "Covered tray": 5
          } as Record<string, number>
        }
      }
    }
  ],
  "workedExample": {
    "title": "Apply: Test a Weathering or Erosion Variable",
    "steps": [
      "Choose water erosion and vary only vegetation cover.",
      "Keep soil, slope, water amount, pour height, tray size, and time the same.",
      "Compare the supplied outcomes: bare/deep/14 versus covered/shallow/5.",
      "Conclude that vegetation reduced water-erosion rate in this test; the authored terrain model was only a prediction tool."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;


const scienceU07L03Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u07-l03-q01",
    "conceptTag": "single-process-variable",
    "reviewCardId": "science-u07-l03-c1",
    "type": "multiple-choice",
    "prompt": "Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs. Which process is tested?",
    "choices": [
      {
        "id": "a",
        "text": "Water erosion"
      },
      {
        "id": "b",
        "text": "Wind erosion"
      },
      {
        "id": "c",
        "text": "Ice weathering"
      },
      {
        "id": "d",
        "text": "Several processes together"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Only water erosion is used."
  },
  {
    "id": "science-u07-l03-q02",
    "conceptTag": "single-process-variable",
    "reviewCardId": "science-u07-l03-c1",
    "type": "true-false",
    "prompt": "Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs. Vegetation cover is the single varied condition.",
    "choices": [
      {
        "id": "true",
        "text": "True — it changes on versus off"
      },
      {
        "id": "false",
        "text": "False — soil type also changes"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The trays otherwise match."
  },
  {
    "id": "science-u07-l03-q03",
    "conceptTag": "single-process-variable",
    "reviewCardId": "science-u07-l03-c1",
    "type": "multiple-choice",
    "prompt": "Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs. Which condition must stay the same?",
    "choices": [
      {
        "id": "a",
        "text": "The conclusion"
      },
      {
        "id": "b",
        "text": "The amount of water"
      },
      {
        "id": "c",
        "text": "The evidence sentence"
      },
      {
        "id": "d",
        "text": "The answer choice order"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Equal water supports fairness."
  },
  {
    "id": "science-u07-l03-q04",
    "conceptTag": "single-process-variable",
    "reviewCardId": "science-u07-l03-c1",
    "type": "fill-blank",
    "prompt": "Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs. The one varied condition is ___ cover.",
    "acceptedAnswers": [
      "vegetation",
      "plant"
    ],
    "explanation": "Vegetation cover differs between trays."
  },
  {
    "id": "science-u07-l03-q05",
    "conceptTag": "erosion-fair-test",
    "reviewCardId": "science-u07-l03-c2",
    "type": "sort",
    "prompt": "Order the fair-test steps.",
    "items": [
      {
        "id": "compare",
        "text": "Compare the soil movement"
      },
      {
        "id": "predict",
        "text": "Predict which tray will lose more soil"
      },
      {
        "id": "setup",
        "text": "Prepare matching trays that differ only in vegetation"
      },
      {
        "id": "pour",
        "text": "Pour the same water in the same way"
      }
    ],
    "correctOrder": [
      "setup",
      "predict",
      "pour",
      "compare"
    ],
    "explanation": "Prepare, predict, run, compare."
  },
  {
    "id": "science-u07-l03-q06",
    "conceptTag": "erosion-fair-test",
    "reviewCardId": "science-u07-l03-c2",
    "type": "true-false",
    "prompt": "The on-screen erosion activity is an authored prediction model; the supplied tray record is the evidence. The erosion activity supplies physical observations from soil trays.",
    "choices": [
      {
        "id": "true",
        "text": "True — its pictures are test evidence"
      },
      {
        "id": "false",
        "text": "False — it is an authored prediction model"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Only the supplied tray record is evidence."
  },
  {
    "id": "science-u07-l03-q07",
    "conceptTag": "erosion-fair-test",
    "reviewCardId": "science-u07-l03-c2",
    "type": "multiple-choice",
    "prompt": "Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs. Which prediction fits the design?",
    "choices": [
      {
        "id": "a",
        "text": "Both trays must be identical afterward"
      },
      {
        "id": "b",
        "text": "The covered tray will have no water"
      },
      {
        "id": "c",
        "text": "The bare tray will lose more loose soil downhill"
      },
      {
        "id": "d",
        "text": "The model will prove the result"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The prediction follows the single-variable comparison."
  },
  {
    "id": "science-u07-l03-q08",
    "conceptTag": "erosion-fair-test",
    "reviewCardId": "science-u07-l03-c2",
    "type": "multiple-choice",
    "prompt": "Fair test: two matching soil trays get equal water on the same slope; only vegetation cover differs. Which plan is unfair?",
    "choices": [
      {
        "id": "a",
        "text": "Same soil and slope, vegetation differs"
      },
      {
        "id": "b",
        "text": "Same water and time"
      },
      {
        "id": "c",
        "text": "Same tray size and pour height"
      },
      {
        "id": "d",
        "text": "Vegetation and water amount both differ"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Two changed conditions prevent isolation."
  },
  {
    "id": "science-u07-l03-q09",
    "conceptTag": "erosion-observation-evidence",
    "reviewCardId": "science-u07-l03-c3",
    "type": "multiple-choice",
    "prompt": "Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls. Which result was observed for bare soil?",
    "choices": [
      {
        "id": "a",
        "text": "A deeper channel and 14 spoonfuls in the pan"
      },
      {
        "id": "b",
        "text": "No moved soil"
      },
      {
        "id": "c",
        "text": "A shallow channel and 5 spoonfuls"
      },
      {
        "id": "d",
        "text": "A model completion badge"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "That is the supplied bare-tray record."
  },
  {
    "id": "science-u07-l03-q10",
    "conceptTag": "erosion-observation-evidence",
    "reviewCardId": "science-u07-l03-c3",
    "type": "true-false",
    "prompt": "Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls. The covered tray still showed some water erosion.",
    "choices": [
      {
        "id": "true",
        "text": "True — five spoonfuls moved"
      },
      {
        "id": "false",
        "text": "False — vegetation stopped all erosion"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The record shows reduced, not zero, movement."
  },
  {
    "id": "science-u07-l03-q11",
    "conceptTag": "erosion-observation-evidence",
    "reviewCardId": "science-u07-l03-c3",
    "type": "multiple-choice",
    "prompt": "Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls. Which claim is supported?",
    "choices": [
      {
        "id": "a",
        "text": "Vegetation eliminates every kind of erosion"
      },
      {
        "id": "b",
        "text": "Vegetation reduced water erosion in this setup"
      },
      {
        "id": "c",
        "text": "Wind caused the channels"
      },
      {
        "id": "d",
        "text": "The exact future rate is known"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "It matches the one-process observations."
  },
  {
    "id": "science-u07-l03-q12",
    "conceptTag": "erosion-observation-evidence",
    "reviewCardId": "science-u07-l03-c3",
    "type": "multiple-choice",
    "prompt": "Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls. Which evidence uses both trays?",
    "choices": [
      {
        "id": "a",
        "text": "The tray labels"
      },
      {
        "id": "b",
        "text": "The model colors"
      },
      {
        "id": "c",
        "text": "Bare had 14 spoonfuls and covered had 5"
      },
      {
        "id": "d",
        "text": "The observer preferred plants"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The paired counts compare outcomes."
  },
  {
    "id": "science-u07-l03-q13",
    "conceptTag": "erosion-observation-evidence",
    "reviewCardId": "science-u07-l03-c3",
    "type": "fill-blank",
    "prompt": "Tray record: bare soil had a deeper channel and 14 spoonfuls; covered soil had a shallow channel and 5 spoonfuls. The bare tray formed a deeper ___.",
    "acceptedAnswers": [
      "channel"
    ],
    "explanation": "The supplied observation names a deeper channel."
  }
];

const scienceU07L03Lesson: Lesson = {
  ...scienceU07L03Core,
  quiz: { passThreshold: 8, pool: scienceU07L03Questions },
};

const scienceU07L04Core = {
  "id": "science-u07-l04",
  "unitId": "science-u07",
  "title": "Use Rock Layers and Fossils as Change Evidence",
  "indicatorCodes": [
    "4-ESS1-1"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A cliff record has a lower layer with plant fossils and no shells, and an upper layer with marine shell fossils."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "The order and fossil pattern can provide evidence that the landscape changed over relative time."
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will compare older and younger layers without assigning years or memorizing formation names."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s reason from the pattern in the record!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u07-l04-c1",
      "title": "Read relative layer order",
      "blocks": [
        {
          "kind": "text",
          "text": "In this undisturbed authored stack, the lower layer has relative-age rank 2 and is older than the upper layer with rank 1. The ranks show order, not years."
        },
        {
          "kind": "example",
          "text": "Lower plant layer is relatively older; upper shell layer is relatively younger."
        },
        {
          "kind": "tip",
          "text": "Support: Write older beside the larger relative-age rank and younger beside the smaller rank."
        }
      ],
      "widget": {
        "type": "rock-layer-explorer",
        "config": {
          "layers": [
            {
              "id": "top-sand",
              "label": "Top sandy layer",
              "age": 1
            },
            {
              "id": "upper-shells",
              "label": "Upper shell layer",
              "age": 2,
              "artifact": "marine shell fossils"
            },
            {
              "id": "lower-plants",
              "label": "Lower plant layer",
              "age": 3,
              "artifact": "plant fossils without shells"
            },
            {
              "id": "base-gravel",
              "label": "Base gravel layer",
              "age": 4
            }
          ],
          "prompt": "Which layer is relatively oldest in this authored stack?",
          "targetLayerId": "base-gravel"
        }
      }
    },
    {
      "id": "science-u07-l04-c2",
      "title": "Find patterns in fossils and layers",
      "blocks": [
        {
          "kind": "text",
          "text": "The lower layer contains plant fossils without shells. The upper layer contains marine shell fossils. The change in fossil pattern is the key evidence."
        },
        {
          "kind": "example",
          "text": "Plant fossils without shells occur earlier in the stack; marine shell fossils occur later above them."
        },
        {
          "kind": "tip",
          "text": "Response frame: The relatively older ____ layer contains ____, while the younger ____ layer contains ____."
        }
      ],
      "widget": {
        "type": "rock-layer-explorer",
        "config": {
          "layers": [
            {
              "id": "top-sand",
              "label": "Top sandy layer",
              "age": 1
            },
            {
              "id": "upper-shells",
              "label": "Upper shell layer",
              "age": 2,
              "artifact": "marine shell fossils"
            },
            {
              "id": "lower-plants",
              "label": "Lower plant layer",
              "age": 3,
              "artifact": "plant fossils without shells"
            },
            {
              "id": "base-gravel",
              "label": "Base gravel layer",
              "age": 4
            }
          ],
          "prompt": "Which layer holds marine shell fossils?",
          "targetLayerId": "upper-shells"
        }
      }
    },
    {
      "id": "science-u07-l04-c3",
      "title": "Explain landscape change over time",
      "blocks": [
        {
          "kind": "text",
          "text": "The fossil shift supports an explanation that the place changed from a land setting with plants to a water setting where marine organisms lived."
        },
        {
          "kind": "example",
          "text": "The evidence gives relative sequence only. It does not give calendar years or the detailed process that produced the rock."
        },
        {
          "kind": "tip",
          "text": "Stretch: Build claim-evidence-reasoning from layer order and both fossil groups, then state the relative-time limit."
        }
      ],
      "widget": {
        "type": "central-idea-organizer",
        "config": {
          "mainIdeaChoices": [
            "This place changed from a land setting with plants to a water setting with marine life",
            "The layers tell how many years passed"
          ],
          "details": [
            {
              "id": "order",
              "text": "The plant layer sits below the shell layer.",
              "supports": [
                "This place changed from a land setting with plants to a water setting with marine life"
              ]
            },
            {
              "id": "plants",
              "text": "The lower layer holds plant fossils and no shells.",
              "supports": [
                "This place changed from a land setting with plants to a water setting with marine life"
              ]
            },
            {
              "id": "shells",
              "text": "The upper layer holds marine shell fossils.",
              "supports": [
                "This place changed from a land setting with plants to a water setting with marine life"
              ]
            },
            {
              "id": "ranks",
              "text": "The layers are labelled with rank numbers, not years.",
              "supports": [
                "The layers tell how many years passed"
              ]
            }
          ],
          "requiredDetailCount": 3
        }
      }
    }
  ],
  "workedExample": {
    "title": "Apply: Use Rock Layers and Fossils as Change Evidence",
    "steps": [
      "Identify the lower plant layer as relatively older than the upper shell layer.",
      "Record plant fossils without shells below and marine shell fossils above.",
      "Explain that the fossil pattern supports a change from land to water over time.",
      "Limit the explanation to relative order; do not assign an age in years or a rock-formation process."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;


const scienceU07L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u07-l04-q01",
    "conceptTag": "relative-layer-order",
    "reviewCardId": "science-u07-l04-c1",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. Which layer is relatively older in the authored stack?",
    "choices": [
      {
        "id": "a",
        "text": "Lower plant layer"
      },
      {
        "id": "b",
        "text": "Upper shell layer"
      },
      {
        "id": "c",
        "text": "Both have the same rank"
      },
      {
        "id": "d",
        "text": "The title"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Rank 2 is defined as older than rank 1 here."
  },
  {
    "id": "science-u07-l04-q02",
    "conceptTag": "relative-layer-order",
    "reviewCardId": "science-u07-l04-c1",
    "type": "true-false",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. Relative-age ranks are not calendar years.",
    "choices": [
      {
        "id": "true",
        "text": "True — they show order only"
      },
      {
        "id": "false",
        "text": "False — rank 2 means two years"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The model explicitly states the convention."
  },
  {
    "id": "science-u07-l04-q03",
    "conceptTag": "relative-layer-order",
    "reviewCardId": "science-u07-l04-c1",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. Which layer is relatively younger?",
    "choices": [
      {
        "id": "a",
        "text": "Lower plant layer"
      },
      {
        "id": "b",
        "text": "Upper shell layer"
      },
      {
        "id": "c",
        "text": "Both are the oldest"
      },
      {
        "id": "d",
        "text": "No layer has an order"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The upper layer has rank 1."
  },
  {
    "id": "science-u07-l04-q04",
    "conceptTag": "relative-layer-order",
    "reviewCardId": "science-u07-l04-c1",
    "type": "fill-blank",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. The relatively older layer is the ___ plant layer.",
    "acceptedAnswers": [
      "lower"
    ],
    "explanation": "The plant layer lies below and has the older rank."
  },
  {
    "id": "science-u07-l04-q05",
    "conceptTag": "rock-fossil-patterns",
    "reviewCardId": "science-u07-l04-c2",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. What fossils are in the upper layer?",
    "choices": [
      {
        "id": "a",
        "text": "Plant fossils only"
      },
      {
        "id": "b",
        "text": "No fossils"
      },
      {
        "id": "c",
        "text": "Marine shell fossils"
      },
      {
        "id": "d",
        "text": "Dinosaur names"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The upper layer contains marine shells."
  },
  {
    "id": "science-u07-l04-q06",
    "conceptTag": "rock-fossil-patterns",
    "reviewCardId": "science-u07-l04-c2",
    "type": "true-false",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. The lower layer has plant fossils without shells.",
    "choices": [
      {
        "id": "true",
        "text": "True — that is the supplied pattern"
      },
      {
        "id": "false",
        "text": "False — it has only shells"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "The lower record is plant fossils without shells."
  },
  {
    "id": "science-u07-l04-q07",
    "conceptTag": "rock-fossil-patterns",
    "reviewCardId": "science-u07-l04-c2",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. What pattern matters most?",
    "choices": [
      {
        "id": "a",
        "text": "The labels use different fonts"
      },
      {
        "id": "b",
        "text": "The layers have names"
      },
      {
        "id": "c",
        "text": "One layer is drawn wider"
      },
      {
        "id": "d",
        "text": "Plant fossils occur below marine shell fossils"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "The fossil sequence is evidence."
  },
  {
    "id": "science-u07-l04-q08",
    "conceptTag": "rock-fossil-patterns",
    "reviewCardId": "science-u07-l04-c2",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. What does the explorer provide?",
    "choices": [
      {
        "id": "a",
        "text": "A model of relative layer order"
      },
      {
        "id": "b",
        "text": "An exact age measurement"
      },
      {
        "id": "c",
        "text": "A physical fossil observation"
      },
      {
        "id": "d",
        "text": "Proof of one formation process"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It represents the authored stack."
  },
  {
    "id": "science-u07-l04-q09",
    "conceptTag": "landscape-change-explanation",
    "reviewCardId": "science-u07-l04-c3",
    "type": "sort",
    "prompt": "Order the evidence and explanation.",
    "items": [
      {
        "id": "claim",
        "text": "Explain that the landscape changed from land to water"
      },
      {
        "id": "older",
        "text": "Older lower layer has plant fossils without shells"
      },
      {
        "id": "younger",
        "text": "Younger upper layer has marine shell fossils"
      }
    ],
    "correctOrder": [
      "older",
      "younger",
      "claim"
    ],
    "explanation": "The ordered fossil evidence supports the change claim."
  },
  {
    "id": "science-u07-l04-q10",
    "conceptTag": "landscape-change-explanation",
    "reviewCardId": "science-u07-l04-c3",
    "type": "true-false",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. The layers reveal the exact number of years between settings.",
    "choices": [
      {
        "id": "true",
        "text": "True — relative rank gives years"
      },
      {
        "id": "false",
        "text": "False — the record gives relative time only"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "No calendar ages are supplied."
  },
  {
    "id": "science-u07-l04-q11",
    "conceptTag": "landscape-change-explanation",
    "reviewCardId": "science-u07-l04-c3",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. Which explanation is supported?",
    "choices": [
      {
        "id": "a",
        "text": "The place never changed"
      },
      {
        "id": "b",
        "text": "The landscape changed from a land setting to a water setting over time"
      },
      {
        "id": "c",
        "text": "One exact rock-making process is proven"
      },
      {
        "id": "d",
        "text": "Every landscape changes identically"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The fossil shift supports land-to-water change."
  },
  {
    "id": "science-u07-l04-q12",
    "conceptTag": "landscape-change-explanation",
    "reviewCardId": "science-u07-l04-c3",
    "type": "multiple-choice",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. Which evidence should be cited?",
    "choices": [
      {
        "id": "a",
        "text": "The model’s completion status"
      },
      {
        "id": "b",
        "text": "The observer’s favorite fossil"
      },
      {
        "id": "c",
        "text": "Plant fossils below and marine shells above"
      },
      {
        "id": "d",
        "text": "An invented calendar date"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The two fossil groups and order are relevant."
  },
  {
    "id": "science-u07-l04-q13",
    "conceptTag": "landscape-change-explanation",
    "reviewCardId": "science-u07-l04-c3",
    "type": "fill-blank",
    "prompt": "Layer model: lower plant layer—rank 2, plant fossils, no shells; upper shell layer—rank 1, marine shells. Larger ranks are relatively older; ranks are not years. The evidence supports change over ___ time.",
    "acceptedAnswers": [
      "relative"
    ],
    "explanation": "The assessment boundary uses relative time."
  }
];

const scienceU07L04Lesson: Lesson = {
  ...scienceU07L04Core,
  quiz: { passThreshold: 8, pool: scienceU07L04Questions },
};

export const unit07Lessons: Lesson[] = [
  scienceU07L01Lesson,
  scienceU07L02Lesson,
  scienceU07L03Lesson,
  scienceU07L04Lesson,
];
