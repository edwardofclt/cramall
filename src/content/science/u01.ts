import type { Lesson } from '../schema';

const scienceU01L04Core = {
  "id": "science-u01-l04",
  "unitId": "science-u01",
  "title": "Predict Collision Energy Outcomes",
  "indicatorCodes": [
    "4-PS3-3"
  ],
  "intro": [
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "A roller coaster car rolls toward a stopped coaster car on the same level track, and the two cars latch during their collision."
    },
    {
      "speaker": "sandy",
      "pose": "think",
      "text": "Which before-and-after motion observations can support a prediction about the joined coaster cars?"
    },
    {
      "speaker": "sandy",
      "pose": "talk",
      "text": "We will keep the track and cars alike, change one release condition, and infer energy changes only from observable motion and effects."
    },
    {
      "speaker": "sandy",
      "pose": "cheer",
      "text": "Let’s predict, model, and explain a roller coaster collision carefully!"
    }
  ],
  "learnCards": [
    {
      "id": "science-u01-l04-c1",
      "title": "Read before-and-after motion",
      "blocks": [
        {
          "kind": "text",
          "text": "Before a roller coaster collision, record each coaster car as moving, slower, faster, stopped, and traveling left or right. Afterward, record the same motion features. These are observations; energy transfer is an inference from the changes."
        },
        {
          "kind": "example",
          "text": "Before the bump, coaster car A rolls right and coaster car B is stopped. After the latch, the joined roller coaster cars roll right more slowly than A did before. The direction and speed words describe what changed."
        },
        {
          "kind": "tip",
          "text": "Support: Draw a before/after T-chart for both coaster cars. Circle only motion words you could observe."
        }
      ],
      "check": {
        "prompt": "Which note is a useful before-and-after observation for the roller coaster collision?",
        "choices": [
          {
            "id": "motion-note",
            "text": "Before: car B was stopped; after: car B moved right."
          },
          {
            "id": "energy-number",
            "text": "The coaster car had exactly 12 energy units."
          },
          {
            "id": "track-style",
            "text": "The roller coaster track looked exciting."
          }
        ],
        "correctChoiceId": "motion-note",
        "explanation": "The note compares observable coaster car motion before and after the collision."
      }
    },
    {
      "id": "science-u01-l04-c2",
      "title": "Make a fair collision prediction",
      "blocks": [
        {
          "kind": "text",
          "text": "A fair roller coaster prediction changes one condition while keeping the same coaster cars, track, bumper, and release method. The collision-ramp widget is a controllable model for trying the prediction, not physical evidence."
        },
        {
          "kind": "example",
          "text": "The two coaster cars roll toward each other at matching speeds, so the model starts with neither side winning. Keep both coaster car masses fixed and change only car A from a slower to a faster release, then predict the joined cars’ direction after the collision."
        },
        {
          "kind": "tip",
          "text": "Response frame: If coaster car A starts ____, I predict the joined cars will move ____ because ____; the model represents the prediction but does not test a physical track."
        }
      ],
      "widget": {
        "type": "collision-ramp",
        "config": {
          "rampAngle": 0,
          "massA": 4,
          "massB": 4,
          "speedA": 3,
          "speedB": 3,
          "target": "predict-direction"
        }
      },
      "check": {
        "prompt": "Which roller coaster plan asks a fair, testable collision question?",
        "choices": [
          {
            "id": "one-change",
            "text": "Keep both cars and the track the same; change only car A’s release speed."
          },
          {
            "id": "many-changes",
            "text": "Change both cars, the track, and the bumper together."
          },
          {
            "id": "model-proof",
            "text": "Press the model button and call its animation physical evidence."
          }
        ],
        "correctChoiceId": "one-change",
        "explanation": "A fair coaster car comparison changes one planned condition and keeps the rest alike."
      }
    },
    {
      "id": "science-u01-l04-c3",
      "title": "Infer energy change from motion",
      "blocks": [
        {
          "kind": "text",
          "text": "When one coaster car slows and another begins moving during a collision, their energy of motion changes. Sound or warmth can be an observable effect of energy transferred to the track, air, or bumpers; energy itself is inferred, not seen."
        },
        {
          "kind": "example",
          "text": "Car A rolls right, car B is stopped, and the cars latch. After the collision, A is slower and B moves right. Those paired roller coaster observations support a qualitative energy-transfer explanation."
        },
        {
          "kind": "tip",
          "text": "Stretch: Explain two coaster car motion changes and one possible surrounding effect without assigning exact energy or claiming that the model supplied evidence."
        }
      ],
      "demo": {
        "type": "roller-coaster",
        "focus": "collision"
      },
      "check": {
        "prompt": "Which roller coaster prediction correctly connects motion observations to energy?",
        "choices": [
          {
            "id": "transfer-inference",
            "text": "If car A slows and car B begins moving, infer that energy of motion transferred during the collision."
          },
          {
            "id": "visible-energy",
            "text": "If a label appears, energy itself became visible."
          },
          {
            "id": "used-up",
            "text": "If the cars slow, all energy was used up and disappeared."
          }
        ],
        "correctChoiceId": "transfer-inference",
        "explanation": "Observable coaster car motion changes can support a qualitative energy-transfer inference."
      }
    }
  ],
  "workedExample": {
    "title": "Apply: Predict Collision Energy Outcomes",
    "steps": [
      "Record that coaster car A rolls right, coaster car B is stopped, and the two roller coaster cars latch after the bump.",
      "Predict that the joined coaster cars will move right because A is the only moving car before the collision.",
      "Compare the after-motion: car A is slower and car B now moves right with it; a bump sound is also observed.",
      "Infer that energy of motion changed and transferred between the cars and surroundings; the observations are evidence, while the widget and roller coaster demo are replayable models."
    ]
  }
} satisfies Omit<Lesson, 'quiz'>;

const scienceU01L04Questions: Lesson['quiz']['pool'] = [
  {
    "id": "science-u01-l04-q01",
    "conceptTag": "collision-motion-evidence",
    "reviewCardId": "science-u01-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which note is a before-and-after roller coaster motion observation?",
    "choices": [
      {
        "id": "a",
        "text": "Before: Cart A moved right; after: the stuck carts moved right"
      },
      {
        "id": "b",
        "text": "The carts had exactly 12 energy units"
      },
      {
        "id": "c",
        "text": "An on-screen collision counts as physical evidence"
      },
      {
        "id": "d",
        "text": "Cart A was the best-looking cart"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It states observable directions before and after."
  },
  {
    "id": "science-u01-l04-q02",
    "conceptTag": "collision-motion-evidence",
    "reviewCardId": "science-u01-l04-c1",
    "type": "true-false",
    "prompt": "A cart beginning to move after a collision is an observable motion change.",
    "choices": [
      {
        "id": "true",
        "text": "True — starting to move can be observed"
      },
      {
        "id": "false",
        "text": "False — motion cannot be observed"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "Beginning to move is an observable change."
  },
  {
    "id": "science-u01-l04-q03",
    "conceptTag": "collision-motion-evidence",
    "reviewCardId": "science-u01-l04-c1",
    "type": "multiple-choice",
    "prompt": "Before a roller coaster bump, car A moves right and car B is stopped. After they latch, both move right. What changed for car B?",
    "choices": [
      {
        "id": "a",
        "text": "Its color changed"
      },
      {
        "id": "b",
        "text": "It began moving right"
      },
      {
        "id": "c",
        "text": "It became lighter"
      },
      {
        "id": "d",
        "text": "Its exact energy appeared"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "Cart B changed from still to moving right."
  },
  {
    "id": "science-u01-l04-q04",
    "conceptTag": "collision-motion-evidence",
    "reviewCardId": "science-u01-l04-c1",
    "type": "multiple-choice",
    "prompt": "Which statement is an inference rather than a direct observation?",
    "choices": [
      {
        "id": "a",
        "text": "Cart A moved right before the bump"
      },
      {
        "id": "b",
        "text": "Cart B was still before the bump"
      },
      {
        "id": "c",
        "text": "Energy transferred during the collision"
      },
      {
        "id": "d",
        "text": "The joined carts moved right afterward"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "Energy transfer explains observed changes but is not directly seen."
  },
  {
    "id": "science-u01-l04-q05",
    "conceptTag": "collision-outcome-prediction",
    "reviewCardId": "science-u01-l04-c2",
    "type": "multiple-choice",
    "prompt": "Which plan makes a fair roller coaster collision comparison?",
    "choices": [
      {
        "id": "a",
        "text": "Change both carts and the track"
      },
      {
        "id": "b",
        "text": "Change cart mass and speed together"
      },
      {
        "id": "c",
        "text": "Use a different bumper each time"
      },
      {
        "id": "d",
        "text": "Keep both carts and the track the same while changing only Cart A’s speed"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Only one planned condition changes."
  },
  {
    "id": "science-u01-l04-q06",
    "conceptTag": "collision-outcome-prediction",
    "reviewCardId": "science-u01-l04-c2",
    "type": "true-false",
    "prompt": "A useful prediction names an observable outcome before the test.",
    "choices": [
      {
        "id": "true",
        "text": "True — it says what motion is expected"
      },
      {
        "id": "false",
        "text": "False — predictions are written only afterward"
      }
    ],
    "correctChoiceId": "true",
    "explanation": "A prediction states an expected observable result."
  },
  {
    "id": "science-u01-l04-q07",
    "conceptTag": "collision-outcome-prediction",
    "reviewCardId": "science-u01-l04-c2",
    "type": "multiple-choice",
    "prompt": "If only Cart A changes from slower to faster, which prediction fits the lesson?",
    "choices": [
      {
        "id": "a",
        "text": "The stuck carts are more likely to move in Cart A’s direction"
      },
      {
        "id": "b",
        "text": "The track must change color"
      },
      {
        "id": "c",
        "text": "No motion can change"
      },
      {
        "id": "d",
        "text": "The exact energy amount becomes visible"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "Faster motion gives the same cart more energy of motion, supporting the directional prediction."
  },
  {
    "id": "science-u01-l04-q08",
    "conceptTag": "collision-outcome-prediction",
    "reviewCardId": "science-u01-l04-c2",
    "type": "multiple-choice",
    "prompt": "What does the collision-ramp activity provide?",
    "choices": [
      {
        "id": "a",
        "text": "Physical evidence from real carts"
      },
      {
        "id": "b",
        "text": "A simplified model for trying a prediction"
      },
      {
        "id": "c",
        "text": "A measurement of exact energy"
      },
      {
        "id": "d",
        "text": "Proof that every collision matches"
      }
    ],
    "correctChoiceId": "b",
    "explanation": "The activity represents a prediction and does not collect physical observations."
  },
  {
    "id": "science-u01-l04-q09",
    "conceptTag": "collision-energy-inference",
    "reviewCardId": "science-u01-l04-c3",
    "type": "multiple-choice",
    "prompt": "Coaster car A slows while coaster car B begins moving after they collide. Which inference is supported?",
    "choices": [
      {
        "id": "a",
        "text": "No energy changed anywhere"
      },
      {
        "id": "b",
        "text": "An energy label is an observation of energy"
      },
      {
        "id": "c",
        "text": "Energy of motion transferred during the collision"
      },
      {
        "id": "d",
        "text": "Cart B created energy from nothing"
      }
    ],
    "correctChoiceId": "c",
    "explanation": "The paired motion changes support a transfer inference."
  },
  {
    "id": "science-u01-l04-q10",
    "conceptTag": "collision-energy-inference",
    "reviewCardId": "science-u01-l04-c3",
    "type": "true-false",
    "prompt": "Energy itself must be visible for motion changes to support an energy inference.",
    "choices": [
      {
        "id": "true",
        "text": "True — only visible energy counts"
      },
      {
        "id": "false",
        "text": "False — observable effects can support an inference"
      }
    ],
    "correctChoiceId": "false",
    "explanation": "Scientists infer energy changes from observable motion and effects."
  },
  {
    "id": "science-u01-l04-q11",
    "conceptTag": "collision-energy-inference",
    "reviewCardId": "science-u01-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which observation supports that some energy reached the surroundings?",
    "choices": [
      {
        "id": "a",
        "text": "A label stayed attached"
      },
      {
        "id": "b",
        "text": "The track remained blue"
      },
      {
        "id": "c",
        "text": "The model button was pressed"
      },
      {
        "id": "d",
        "text": "A sound was heard during the bump"
      }
    ],
    "correctChoiceId": "d",
    "explanation": "Sound can be an observable effect of transfer to the surroundings."
  },
  {
    "id": "science-u01-l04-q12",
    "conceptTag": "collision-energy-inference",
    "reviewCardId": "science-u01-l04-c3",
    "type": "multiple-choice",
    "prompt": "Which explanation stays qualitative and within the lesson boundary?",
    "choices": [
      {
        "id": "a",
        "text": "Cart A slowed and Cart B moved, so their energy of motion changed during the collision"
      },
      {
        "id": "b",
        "text": "The collision produced exactly 18 units of force"
      },
      {
        "id": "c",
        "text": "The carts accelerated by a measured rate"
      },
      {
        "id": "d",
        "text": "Completing the activity guarantees the real-world result"
      }
    ],
    "correctChoiceId": "a",
    "explanation": "It connects motion observations to a qualitative energy inference."
  },
  {
    "id": "science-u01-l04-q13",
    "type": "sort",
    "prompt": "Order the roller coaster explanation from observation to inference.",
    "items": [
      {
        "id": "infer",
        "text": "Infer that energy of motion transferred during the collision."
      },
      {
        "id": "before",
        "text": "Record car A moving right and car B stopped before the collision."
      },
      {
        "id": "after",
        "text": "Record both joined coaster cars moving right afterward."
      }
    ],
    "correctOrder": [
      "before",
      "after",
      "infer"
    ],
    "explanation": "A sound explanation records before and after motion before inferring energy transfer.",
    "conceptTag": "collision-energy-inference",
    "reviewCardId": "science-u01-l04-c3"
  }
];

const scienceU01L04Lesson: Lesson = {
  ...scienceU01L04Core,
  quiz: { passThreshold: 8, pool: scienceU01L04Questions },
};

export const unit01Lessons = [
  {
    id: 'science-u01-l01',
    unitId: 'science-u01',
    title: "Speed and an Object's Energy",
    indicatorCodes: ['4-PS3-1'],
    intro: [
      { speaker: 'sandy', pose: 'talk', text: 'Think about a roller coaster car near the top of a hill and then racing down the track. Its position and its motion both give scientists clues about energy.' },
      { speaker: 'sandy', pose: 'think', text: 'What can the speed of the same roller coaster car tell us about its energy of motion?' },
      { speaker: 'sandy', pose: 'talk', text: 'We will use a safe tabletop coaster model to compare the same moving object, the same track, and clear observations.' },
      { speaker: 'sandy', pose: 'cheer', text: 'Let’s use careful evidence to connect speed, stored energy, and motion!' },
    ],
    learnCards: [
      {
        id: 'science-u01-l01-c1',
        title: 'Describe speed with observations',
        blocks: [
          { kind: 'text', text: 'Speed describes how quickly an object changes position. You can notice speed without a stopwatch: a coaster car that travels between two fixed markers near the bottom of the track in less time is faster, while one that takes longer between those same markers is slower. At this level, words such as faster, slower, stopped, sooner, and farther are useful science words.' },
          { kind: 'example', text: 'Picture the same roller coaster car on a safe model track. After it leaves a high hill, compare how long it takes to travel from the first fixed near-bottom marker to the second with the same car released from a lower spot. If the first trip crosses that same short interval sooner, the car is moving faster there. In a classroom, a marble or small cart can stand in for a coaster car; people never need to ride the model.' },
          { kind: 'tip', text: 'Describe what you can observe instead of inventing an exact measurement. Say “the car traveled between the fixed markers sooner,” not “it was extremely fast.”' },
        ],
        "widget": {
          "type": "collision-ramp",
          "config": {
            "rampAngle": 0,
            "massA": 4,
            "massB": 4,
            "speedA": 5,
            "speedB": 2,
            "target": "compare-motion"
          }
        },
        check: {
          prompt: 'Two trips use the same coaster car. Which observation shows that it is faster near the bottom?',
          choices: [
            { id: 'fixed-markers', text: 'It travels between the same two fixed near-bottom markers in less time.' },
            { id: 'track-color', text: 'The roller coaster track has a brighter color.' },
            { id: 'later-day', text: 'The trip happens later in the day.' },
          ],
          correctChoiceId: 'fixed-markers',
          explanation: 'Speed evidence compares how the same car moves through the same short interval between fixed markers.',
        },
      },
      {
        id: 'science-u01-l01-c2',
        title: 'Make a fair speed comparison',
        blocks: [
          { kind: 'text', text: 'A fair comparison changes one important condition while keeping the others the same. For a tabletop roller coaster investigation, use the same marble or coaster car, the same track, and the same two fixed markers near the bottom. Release it from two different marked heights so its speed can change. Then compare its travel through that same short interval to help answer how speed relates to that object’s energy.' },
          { kind: 'example', text: 'A car held higher on the same roller coaster hill has more gravitational potential energy because of its higher position. When it is released, some of that stored energy changes into kinetic energy, the energy of motion. Compare that same car with itself on the same track, rather than comparing a marble on one lane with a foam ball on another.' },
          { kind: 'tip', text: 'Across unlike objects, speed alone does not tell the whole energy story. Choose the same object or another suitable fair comparison, and change only what your question asks about.' },
        ],
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "This comparison changes only the release height",
              "This comparison changes more than one condition"
            ],
            "details": [
              {
                "id": "same-car",
                "text": "The same coaster car is used for both trips.",
                "supports": [
                  "This comparison changes only the release height"
                ]
              },
              {
                "id": "same-track",
                "text": "The same track and the same two markers are used for both trips.",
                "supports": [
                  "This comparison changes only the release height"
                ]
              },
              {
                "id": "height",
                "text": "Only the release height is changed between the two trips.",
                "supports": [
                  "This comparison changes only the release height"
                ]
              },
              {
                "id": "swap-car",
                "text": "A heavier car is used for the second trip.",
                "supports": [
                  "This comparison changes more than one condition"
                ]
              }
            ],
            "requiredDetailCount": 3
          }
        },
        check: {
          prompt: 'Which tabletop roller coaster plan is a fair comparison of speed?',
          choices: [
            { id: 'same-car', text: 'Use the same car and track, then change only its release height.' },
            { id: 'new-everything', text: 'Change the car, track, and release height for every trip.' },
            { id: 'two-objects', text: 'Compare a marble on one track with a foam ball on another.' },
          ],
          correctChoiceId: 'same-car',
          explanation: 'Keeping the coaster car and track the same makes release height the one planned change.',
        },
      },
      {
        id: 'science-u01-l01-c3',
        title: 'Relate faster motion to more energy',
        blocks: [
          { kind: 'text', text: 'When the same object moves faster, it has more kinetic energy, or energy of motion, than when it moves slower. A roller coaster car is a helpful example: high on a hill it has gravitational potential energy because of its position; as it moves down, much of that energy changes into kinetic energy. If the same car slows, its energy of motion decreases.' },
          { kind: 'example', text: 'A model roller coaster car released from the higher mark travels between the same two fixed near-bottom markers faster and pushes a light paper flag farther than the same car from the lower mark. That is qualitative evidence that the faster car had more energy of motion. The energy was not “used up” on the way down; it changed form, and some may also transfer to the track, air, or nearby objects.' },
          { kind: 'tip', text: 'State the relationship as more or less energy of motion, without assigning an exact energy value. We observe the motion and its effects; energy itself is not something we see directly.' },
        ],
        demo: { type: 'roller-coaster', focus: 'speed-energy' },
        check: {
          prompt: 'The same coaster car crosses the fixed markers sooner and moves a paper flag farther. What is the best conclusion?',
          choices: [
            { id: 'more-kinetic', text: 'The faster car has more kinetic energy, or energy of motion.' },
            { id: 'no-energy', text: 'The car has no energy because it is already moving.' },
            { id: 'color-energy', text: 'The car’s color tells how much energy it has.' },
          ],
          correctChoiceId: 'more-kinetic',
          explanation: 'For the same coaster car, faster motion and a larger observable effect support more energy of motion.',
        },
      },
    ],
    workedExample: {
      title: 'Compare two trips on a tabletop roller coaster',
      steps: [
        'Jalen builds a safe tabletop roller coaster with a smooth ramp, two release marks, two fixed speed markers near the bottom, and a paper flag. He uses the same small car for both trips.',
        'First, Jalen releases the car from the lower mark. Next, he releases it from the higher mark, where the car begins with more gravitational potential energy because it is higher above the table.',
        'On the higher-release trip, the car travels from the first fixed near-bottom marker to the second in less time and bends the paper flag farther. Those are observations, not guesses about an exact energy amount.',
        'Jalen concludes that the same roller coaster car was faster on the second trip and had more kinetic energy. He explains that stored gravitational potential energy changed into energy of motion as the car traveled down the ramp.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        {
          id: 'science-u01-l01-q01',
          type: 'multiple-choice',
          prompt: 'Two trips use the same tabletop roller coaster car and the same track; on which trip is the car faster?',
          choices: [
            { id: 'a', text: 'The trip that travels between the same two near-bottom markers sooner' },
            { id: 'b', text: 'The trip that begins later in the day' },
            { id: 'c', text: 'The trip beside a different-colored marker' },
            { id: 'd', text: 'The trip watched by more people' },
          ],
          correctChoiceId: 'a',
          explanation: 'On the same track, traveling between the same two near-bottom markers sooner is evidence that the coaster car moved faster.',
          conceptTag: 'qualitative-speed',
          reviewCardId: 'science-u01-l01-c1',
        },
        {
          id: 'science-u01-l01-q02',
          type: 'multiple-choice',
          prompt: 'Which pair of words gives a useful qualitative speed comparison?',
          choices: [
            { id: 'a', text: 'Shiny and dull' },
            { id: 'b', text: 'Slower and faster' },
            { id: 'c', text: 'Round and square' },
            { id: 'd', text: 'Warm and cool' },
          ],
          correctChoiceId: 'b',
          explanation: 'Slower and faster compare how quickly objects change position.',
          conceptTag: 'qualitative-speed',
          reviewCardId: 'science-u01-l01-c1',
        },
        {
          id: 'science-u01-l01-q03',
          type: 'multiple-choice',
          prompt: 'Which observation best describes a cart slowing down?',
          choices: [
            { id: 'a', text: 'Its color becomes easier to see' },
            { id: 'b', text: 'Its wheels stay the same size' },
            { id: 'c', text: 'It covers less of the path during similar moments' },
            { id: 'd', text: 'Its label points toward the ceiling' },
          ],
          correctChoiceId: 'c',
          explanation: 'Covering less of the path during similar moments is qualitative evidence of slower motion.',
          conceptTag: 'qualitative-speed',
          reviewCardId: 'science-u01-l01-c1',
        },
        {
          id: 'science-u01-l01-q04',
          type: 'multiple-choice',
          prompt: 'Which roller coaster comparison best isolates the relationship between speed and energy of motion?',
          choices: [
            { id: 'a', text: 'A foam ball on carpet and a metal ball on tile' },
            { id: 'b', text: 'A large cart outdoors and a small bead indoors' },
            { id: 'c', text: 'A marble rolling and a block resting' },
            { id: 'd', text: 'The same coaster car moving slower and faster on the same track' },
          ],
          correctChoiceId: 'd',
          explanation: 'Keeping the coaster car and track the same makes speed the main changed condition.',
          conceptTag: 'fair-speed-comparison',
          reviewCardId: 'science-u01-l01-c2',
        },
        {
          id: 'science-u01-l01-q05',
          type: 'multiple-choice',
          prompt: 'Why is comparing the same rolling ball at two speeds useful?',
          choices: [
            { id: 'a', text: 'It keeps the object the same while speed changes' },
            { id: 'b', text: 'It guarantees that every surface is different' },
            { id: 'c', text: 'It changes both size and material at once' },
            { id: 'd', text: 'It makes observations unnecessary' },
          ],
          correctChoiceId: 'a',
          explanation: 'A same-object comparison helps connect a change in speed to a change in that object’s energy of motion.',
          conceptTag: 'fair-speed-comparison',
          reviewCardId: 'science-u01-l01-c2',
        },
        {
          id: 'science-u01-l01-q06',
          type: 'multiple-choice',
          prompt: 'Which comparison would need more information before using speed to compare energy?',
          choices: [
            { id: 'a', text: 'The same marble moving slowly and faster' },
            { id: 'b', text: 'A light foam ball and a heavy cart moving at different speeds' },
            { id: 'c', text: 'The same toy turtle on the same lane twice' },
            { id: 'd', text: 'The same cart before and after it slows' },
          ],
          correctChoiceId: 'b',
          explanation: 'Unlike objects differ in more than speed, so speed alone does not make this a fair energy comparison.',
          conceptTag: 'fair-speed-comparison',
          reviewCardId: 'science-u01-l01-c2',
        },
        {
          id: 'science-u01-l01-q07',
          type: 'multiple-choice',
          prompt: 'The same roller coaster car moves faster on its second trip; how does its energy of motion compare?',
          choices: [
            { id: 'a', text: 'It has no energy of motion' },
            { id: 'b', text: 'It has exactly the same energy of motion' },
            { id: 'c', text: 'It has more energy of motion' },
            { id: 'd', text: 'Its energy cannot be described at all' },
          ],
          correctChoiceId: 'c',
          explanation: 'The same object has more energy of motion when it moves faster.',
          conceptTag: 'speed-energy-relationship',
          reviewCardId: 'science-u01-l01-c3',
        },
        {
          id: 'science-u01-l01-q08',
          type: 'multiple-choice',
          prompt: 'The same ball slows as it rolls across grass; what happens to its energy of motion?',
          choices: [
            { id: 'a', text: 'It becomes an exact value that must be computed' },
            { id: 'b', text: 'It increases because grass is green' },
            { id: 'c', text: 'It stays greater than on every earlier moment' },
            { id: 'd', text: 'It decreases as the ball slows' },
          ],
          correctChoiceId: 'd',
          explanation: 'As the same ball slows, it has less energy of motion.',
          conceptTag: 'speed-energy-relationship',
          reviewCardId: 'science-u01-l01-c3',
        },
        {
          id: 'science-u01-l01-q09',
          type: 'true-false',
          prompt: 'For the same moving object, faster motion means more energy of motion than slower motion.',
          choices: [
            { id: 'true', text: 'True — this is the qualitative relationship' },
            { id: 'false', text: 'False — speed and energy are never related' },
          ],
          correctChoiceId: 'true',
          explanation: 'A faster-moving version of the same object has more energy of motion.',
          conceptTag: 'speed-energy-relationship',
          reviewCardId: 'science-u01-l01-c3',
        },
        {
          id: 'science-u01-l01-q10',
          type: 'sort',
          prompt: 'Tap the parts in order to assemble a short claim-evidence-reasoning explanation about the model coaster.',
          items: [
            { id: 'claim', text: 'Claim: The same coaster car had more energy of motion on its faster trip.' },
            { id: 'evidence', text: 'Evidence: It traveled between the fixed markers sooner and moved the paper flag farther.' },
            { id: 'reasoning', text: 'Reasoning: For the same car, faster motion means more energy of motion.' },
          ],
          correctOrder: ['claim', 'evidence', 'reasoning'],
          explanation: 'The claim answers the question, the observations are evidence, and the reasoning explains why those observations support the claim.',
          conceptTag: 'speed-energy-relationship',
          reviewCardId: 'science-u01-l01-c3',
        },
        {
          id: 'science-u01-l01-q11',
          type: 'true-false',
          prompt: 'Speed alone is enough to compare the energy of any two unlike objects.',
          choices: [
            { id: 'true', text: 'True — no other difference matters' },
            { id: 'false', text: 'False — use the same object or another suitable fair comparison' },
          ],
          correctChoiceId: 'false',
          explanation: 'Unlike objects may differ in important ways, so speed alone is not a fair energy comparison.',
          conceptTag: 'fair-speed-comparison',
          reviewCardId: 'science-u01-l01-c2',
        },
        {
          id: 'science-u01-l01-q12',
          type: 'multiple-choice',
          prompt: 'Which conclusion fits a same-coaster-car observation in which the faster trip nudges a flag farther?',
          choices: [
            { id: 'a', text: 'The flag’s color caused the cart to move' },
            { id: 'b', text: 'The faster-moving coaster car had more energy of motion than the slower-moving car' },
            { id: 'c', text: 'The slower cart must have had more energy of motion' },
            { id: 'd', text: 'The two trips cannot be compared qualitatively' },
          ],
          correctChoiceId: 'b',
          explanation: 'The same coaster car’s faster trip and larger observed effect support more energy of motion.',
          conceptTag: 'speed-energy-relationship',
          reviewCardId: 'science-u01-l01-c3',
        },
        {
          id: 'science-u01-l01-q13',
          type: 'true-false',
          prompt: 'Words such as faster, slower, more, and less can describe the speed-energy relationship without exact measurements.',
          choices: [
            { id: 'true', text: 'True — qualitative comparisons use descriptive relationships' },
            { id: 'false', text: 'False — only exact values can support a comparison' },
          ],
          correctChoiceId: 'true',
          explanation: 'Qualitative evidence can relate speed and energy with comparison words.',
          conceptTag: 'qualitative-speed',
          reviewCardId: 'science-u01-l01-c1',
        },
      ],
    },
  },
  {
    id: 'science-u01-l02',
    unitId: 'science-u01',
    title: 'Explain Speed and Energy with Evidence',
    indicatorCodes: ['4-PS3-1'],
    intro: [
      { speaker: 'sandy', pose: 'talk', text: 'A strong science explanation is more than a good guess about why a roller coaster races down a hill.' },
      { speaker: 'sandy', pose: 'think', text: 'It begins with evidence: observations that can support a claim about the same coaster car.' },
      { speaker: 'sandy', pose: 'talk', text: 'Reasoning connects that evidence to what we know about speed, stored energy, and energy of motion.' },
      { speaker: 'sandy', pose: 'cheer', text: 'Let’s build explanations that another scientist can follow and check!' },
    ],
    learnCards: [
      {
        id: 'science-u01-l02-c1',
        title: 'Choose relevant evidence',
        blocks: [
          { kind: 'text', text: 'Evidence is an observation connected to the question. Imagine a safe roller coaster model with one car, one track, a high release mark, a low release mark, and two fixed markers near the bottom. Useful evidence may describe which trip traveled between those same markers sooner and what happened when the same car touched a light paper flag. A decoration on the track is not evidence unless it helps you observe motion.' },
          { kind: 'example', text: 'Nia writes: “The same coaster car released from the high mark traveled from the first near-bottom marker to the second in less time. It also pushed the paper flag farther than the car from the low mark.” Both details are relevant because they report what she could see happen during a fair comparison.' },
          { kind: 'tip', text: 'An object’s color, a student’s favorite ride, or “it looked exciting” is not evidence about a speed-energy relationship. Record the motion before explaining it.' },
        ],
        "widget": {
          "type": "theme-evidence-collector",
          "config": {
            "themeChoices": [
              "The car had more energy of motion on the high-release trip",
              "The high-release trip was more fun to watch"
            ],
            "evidence": [
              {
                "id": "marker-time",
                "text": "The car crossed the two bottom markers in less time after the high release.",
                "supports": [
                  "The car had more energy of motion on the high-release trip"
                ]
              },
              {
                "id": "flag-distance",
                "text": "The car pushed the paper flag farther after the high release.",
                "supports": [
                  "The car had more energy of motion on the high-release trip"
                ]
              },
              {
                "id": "favorite",
                "text": "The high hill is the observer's favorite part of the track.",
                "supports": [
                  "The high-release trip was more fun to watch"
                ]
              },
              {
                "id": "bright-track",
                "text": "The track is painted a bright color.",
                "supports": [
                  "The high-release trip was more fun to watch"
                ]
              }
            ],
            "requiredEvidenceCount": 2
          }
        },
        check: {
          prompt: 'Which notebook detail is evidence from Nia’s roller coaster model?',
          choices: [
            { id: 'marker-time', text: 'The coaster car traveled between the fixed markers in less time.' },
            { id: 'favorite-ride', text: 'Nia says the high hill is her favorite part.' },
            { id: 'bright-track', text: 'The model track looks bright in the classroom.' },
          ],
          correctChoiceId: 'marker-time',
          explanation: 'A timed comparison through the same fixed markers is an observation connected to the speed question.',
        },
      },
      {
        id: 'science-u01-l02-c2',
        title: 'Use reasoning to connect the ideas',
        blocks: [
          { kind: 'text', text: 'Reasoning explains why the evidence supports the claim. It uses a science idea: when the same object moves faster, it has more kinetic energy, or energy of motion. On a roller coaster hill, a car at a higher position has gravitational potential energy. As it travels down, gravitational potential energy changes into kinetic energy, the energy of motion; the car does not create energy or make it disappear.' },
          { kind: 'example', text: 'Nia reasons: “Because I used the same coaster car and track, the high and low releases are a fair comparison. The high-release car was faster and moved the flag farther, so it had more energy of motion at the bottom.” She does not need an exact number to make this evidence-based explanation.' },
          { kind: 'tip', text: 'Reasoning is the bridge between what was observed and what the evidence means. Name the evidence first, then connect it to the science idea.' },
        ],
        "widget": {
          "type": "energy-transfer-builder",
          "config": {
            "sources": [
              "car released from the high mark",
              "car released from the low mark"
            ],
            "transfers": [
              "faster motion at the bottom",
              "slower motion at the bottom"
            ],
            "targets": [
              "paper flag pushed farther",
              "paper flag pushed a shorter way"
            ],
            "requiredPath": [
              "car released from the high mark",
              "faster motion at the bottom",
              "paper flag pushed farther"
            ]
          }
        },
        check: {
          prompt: 'Which sentence gives reasoning for a claim about the same coaster car?',
          choices: [
            { id: 'speed-idea', text: 'Because the same car moved faster, it had more energy of motion.' },
            { id: 'marker-note', text: 'The car passed the second fixed marker.' },
            { id: 'track-opinion', text: 'The roller coaster track is fun to watch.' },
          ],
          correctChoiceId: 'speed-idea',
          explanation: 'Reasoning uses the science idea about faster motion to explain why an observation supports a claim.',
        },
      },
      {
        id: 'science-u01-l02-c3',
        title: 'Construct a complete explanation',
        blocks: [
          { kind: 'text', text: 'A complete explanation has a claim, relevant evidence, and reasoning. The claim answers the question. Evidence tells what happened. Reasoning explains why that observation supports the claim. Each part should answer the same question without adding an exact energy amount or changing the subject to an unrelated fact.' },
          { kind: 'example', text: 'Claim: the same roller coaster car had more energy of motion on its faster trip. Evidence: from the higher release mark, it traveled between the same two near-bottom markers sooner and moved the paper flag farther. Reasoning: the car began higher with more gravitational potential energy, and as it moved down that energy changed into kinetic energy; for the same car, faster motion means more energy of motion.' },
          { kind: 'tip', text: 'Check your explanation on your own: compare its claim, evidence, and reasoning with Priya’s worked example, then use the inline check to practice finding each part. Add any missing piece.' },
        ],
        demo: { type: 'roller-coaster', focus: 'evidence' },
        check: {
          prompt: 'Which choice includes a claim, evidence, and reasoning about the coaster car?',
          choices: [
            { id: 'complete-cer', text: 'Claim: more motion energy; evidence: faster between markers; reasoning: faster same car means more motion energy.' },
            { id: 'evidence-only', text: 'Evidence: the paper flag moved farther.' },
            { id: 'opinion-only', text: 'The roller coaster is exciting to watch.' },
          ],
          correctChoiceId: 'complete-cer',
          explanation: 'A complete explanation answers with a claim, cites observations as evidence, and connects them with reasoning.',
        },
      },
    ],
    workedExample: {
      title: 'Explain observations from a roller coaster model',
      steps: [
        'Priya sends the same coaster car down the same tabletop track twice. She releases it first from a low mark and then from a high mark, keeping the car, track, two fixed near-bottom markers, and paper gate the same.',
        'On the high-release trip, the car travels from the first fixed near-bottom marker to the second in less time and shifts the paper gate farther. Priya records those two observations in her notebook as evidence.',
        'Her claim is that the roller coaster car had more kinetic energy on the high-release trip. Her reasoning is that the car started higher with more gravitational potential energy and was moving faster at the bottom; for the same car, faster motion means more energy of motion.',
        'Priya’s explanation is strong because every part answers one question: how did the same car’s motion and energy compare on the two trips?',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        {
          id: 'science-u01-l02-q01',
          type: 'multiple-choice',
          prompt: 'Which detail is relevant evidence that the same roller coaster car moved faster on its second trip?',
          choices: [
            { id: 'a', text: 'It traveled between the same two near-bottom markers sooner' },
            { id: 'b', text: 'A student liked the second trip best' },
            { id: 'c', text: 'Its blue stripe looked bright' },
            { id: 'd', text: 'The observer wore green shoes' },
          ],
          correctChoiceId: 'a',
          explanation: 'Traveling between the same two fixed near-bottom markers sooner is an observation directly connected to speed.',
          conceptTag: 'relevant-speed-evidence',
          reviewCardId: 'science-u01-l02-c1',
        },
        {
          id: 'science-u01-l02-q02',
          type: 'multiple-choice',
          prompt: 'Which observation is relevant to the same ball’s energy of motion?',
          choices: [
            { id: 'a', text: 'The ball has a star sticker' },
            { id: 'b', text: 'Its faster trip moved the paper gate farther than its slower trip' },
            { id: 'c', text: 'The lane is beside a window' },
            { id: 'd', text: 'The observer prefers round objects' },
          ],
          correctChoiceId: 'b',
          explanation: 'A changed effect during the same ball’s faster trip is relevant qualitative evidence.',
          conceptTag: 'relevant-speed-evidence',
          reviewCardId: 'science-u01-l02-c1',
        },
        {
          id: 'science-u01-l02-q03',
          type: 'multiple-choice',
          prompt: 'Which note is an observation rather than an opinion?',
          choices: [
            { id: 'a', text: 'The slower trip was boring' },
            { id: 'b', text: 'The red cart is the nicest cart' },
            { id: 'c', text: 'The faster trip traveled between the two fixed near-bottom markers sooner' },
            { id: 'd', text: 'Everyone should enjoy rolling carts' },
          ],
          correctChoiceId: 'c',
          explanation: 'Which trip traveled between the fixed markers sooner can be observed, while the other statements are opinions.',
          conceptTag: 'relevant-speed-evidence',
          reviewCardId: 'science-u01-l02-c1',
        },
        {
          id: 'science-u01-l02-q04',
          type: 'multiple-choice',
          prompt: 'Which reasoning best connects a faster trip of the same roller coaster car to more energy of motion?',
          choices: [
            { id: 'a', text: 'The cart was faster because its stripe was orange' },
            { id: 'b', text: 'The paper gate moved because science is interesting' },
            { id: 'c', text: 'All objects have identical energy whenever they move' },
            { id: 'd', text: 'For the same object, faster motion means more energy of motion' },
          ],
          correctChoiceId: 'd',
          explanation: 'This reasoning states the scientific idea that links the speed evidence to the energy claim.',
          conceptTag: 'evidence-energy-reasoning',
          reviewCardId: 'science-u01-l02-c2',
        },
        {
          id: 'science-u01-l02-q05',
          type: 'multiple-choice',
          prompt: 'Why does keeping the same object and path strengthen the reasoning?',
          choices: [
            { id: 'a', text: 'It makes the two speeds a suitable fair comparison' },
            { id: 'b', text: 'It makes the object’s color determine its energy' },
            { id: 'c', text: 'It removes the need to observe what happens' },
            { id: 'd', text: 'It proves every unlike object behaves identically' },
          ],
          correctChoiceId: 'a',
          explanation: 'Keeping the object and path the same lets the explanation focus on the speed change.',
          conceptTag: 'evidence-energy-reasoning',
          reviewCardId: 'science-u01-l02-c2',
        },
        {
          id: 'science-u01-l02-q06',
          type: 'multiple-choice',
          prompt: 'What job does reasoning do in a science explanation?',
          choices: [
            { id: 'a', text: 'It lists unrelated facts' },
            { id: 'b', text: 'It explains how the evidence supports the claim' },
            { id: 'c', text: 'It replaces evidence with a preference' },
            { id: 'd', text: 'It gives the object a new name' },
          ],
          correctChoiceId: 'b',
          explanation: 'Reasoning tells why the observations count as support for the claim.',
          conceptTag: 'evidence-energy-reasoning',
          reviewCardId: 'science-u01-l02-c2',
        },
        {
          id: 'science-u01-l02-q07',
          type: 'multiple-choice',
          prompt: 'Which sentence is a clear claim for a roller coaster speed-energy explanation?',
          choices: [
            { id: 'a', text: 'The cart crossed a leaf picture' },
            { id: 'b', text: 'I wonder who drew the lane' },
            { id: 'c', text: 'The same coaster car had more energy of motion during its faster trip' },
            { id: 'd', text: 'The paper gate was folded before lunch' },
          ],
          correctChoiceId: 'c',
          explanation: 'The sentence directly answers how the same coaster car’s speed relates to its energy of motion.',
          conceptTag: 'complete-energy-explanation',
          reviewCardId: 'science-u01-l02-c3',
        },
        {
          id: 'science-u01-l02-q08',
          type: 'sort',
          prompt: 'Tap the parts in order to assemble Priya’s claim-evidence-reasoning explanation.',
          items: [
            { id: 'claim', text: 'Claim: The same coaster car had more energy of motion on the high-release trip.' },
            { id: 'evidence', text: 'Evidence: It traveled between the fixed markers sooner and shifted the paper gate farther.' },
            { id: 'reasoning', text: 'Reasoning: The same car was faster, and faster motion means more energy of motion.' },
          ],
          correctOrder: ['claim', 'evidence', 'reasoning'],
          explanation: 'A claim answers the question, evidence supports it, and reasoning connects the two.',
          conceptTag: 'complete-energy-explanation',
          reviewCardId: 'science-u01-l02-c3',
        },
        {
          id: 'science-u01-l02-q09',
          type: 'true-false',
          prompt: 'A useful explanation can compare more and less energy of motion without giving an exact energy amount.',
          choices: [
            { id: 'true', text: 'True — qualitative evidence supports the relationship' },
            { id: 'false', text: 'False — an exact amount is always required' },
          ],
          correctChoiceId: 'true',
          explanation: 'The standard asks for a qualitative evidence-based relationship rather than an exact energy amount.',
          conceptTag: 'complete-energy-explanation',
          reviewCardId: 'science-u01-l02-c3',
        },
        {
          id: 'science-u01-l02-q10',
          type: 'multiple-choice',
          prompt: 'Which evidence best supports the claim that the same roller coaster car had more energy of motion on its quicker trip?',
          choices: [
            { id: 'a', text: 'It traveled between the same two near-bottom markers sooner and shifted the paper gate farther' },
            { id: 'b', text: 'The coaster car had a star sticker' },
            { id: 'c', text: 'The observer wrote with a pencil' },
            { id: 'd', text: 'The slower trip happened before the quicker trip' },
          ],
          correctChoiceId: 'a',
          explanation: 'Both observations are relevant to the coaster car’s faster motion and larger effect.',
          conceptTag: 'relevant-speed-evidence',
          reviewCardId: 'science-u01-l02-c1',
        },
        {
          id: 'science-u01-l02-q11',
          type: 'true-false',
          prompt: 'A favorite color is enough evidence to explain a moving object’s energy.',
          choices: [
            { id: 'true', text: 'True — preferences are scientific observations' },
            { id: 'false', text: 'False — evidence must be relevant to speed and energy' },
          ],
          correctChoiceId: 'false',
          explanation: 'Color preference does not show how speed relates to energy of motion.',
          conceptTag: 'relevant-speed-evidence',
          reviewCardId: 'science-u01-l02-c1',
        },
        {
          id: 'science-u01-l02-q12',
          type: 'multiple-choice',
          prompt: 'Which ending adds reasoning to the claim and evidence?',
          choices: [
            { id: 'a', text: 'The coaster car is my favorite classroom object' },
            { id: 'b', text: 'A different coaster car might have a different name' },
            { id: 'c', text: 'The lane would look better with stars' },
            { id: 'd', text: 'Because the same coaster car moved faster, the observations support that it had more energy of motion' },
          ],
          correctChoiceId: 'd',
          explanation: 'This sentence links the fair-comparison evidence to the energy claim.',
          conceptTag: 'evidence-energy-reasoning',
          reviewCardId: 'science-u01-l02-c2',
        },
        {
          id: 'science-u01-l02-q13',
          type: 'true-false',
          prompt: 'Evidence and reasoning should both connect to the claim being explained.',
          choices: [
            { id: 'true', text: 'True — all three parts answer the same question' },
            { id: 'false', text: 'False — unrelated details make a claim stronger' },
          ],
          correctChoiceId: 'true',
          explanation: 'A clear explanation keeps its claim, evidence, and reasoning focused on one question.',
          conceptTag: 'complete-energy-explanation',
          reviewCardId: 'science-u01-l02-c3',
        },
      ],
    },
  },
  {
    id: 'science-u01-l03',
    unitId: 'science-u01',
    title: 'Ask Questions About Collisions',
    indicatorCodes: ['4-PS3-3'],
    intro: [
      { speaker: 'sandy', pose: 'talk', text: 'A collision happens when a moving object bumps into another object. Real roller coasters are designed to avoid crashes, so we will investigate collisions with a safe miniature roller coaster model instead.' },
      { speaker: 'sandy', pose: 'think', text: 'After a model coaster marble bumps a foam bumper, what can we observe about its speed, direction, and energy of motion?' },
      { speaker: 'sandy', pose: 'talk', text: 'Testable questions help us investigate how those motion changes relate to energy moving from one object or place to another.' },
      { speaker: 'sandy', pose: 'cheer', text: 'Let’s ask fair questions and make qualitative predictions from what we can see!' },
    ],
    learnCards: [
      {
        id: 'science-u01-l03-c1',
        title: 'Notice changes during a collision',
        blocks: [
          { kind: 'text', text: 'In a collision, look for changes in speed or direction before and after objects bump. A moving object may slow, stop, or bounce back while the object it hits may begin moving. The energy of motion can transfer from the moving object to the object it hits, and some energy transfers to surroundings as sound and thermal (heat) energy.' },
          { kind: 'example', text: 'On a miniature roller coaster, a marble rolls down a track and bumps a light foam block at the bottom. The marble slows, and the block slides forward. The real coaster ride is only the familiar idea; this small model is the safe way to observe a collision.' },
          { kind: 'tip', text: 'Describe what changed before and after the collision without assigning exact values. Do not say energy was “used up.” First name an observable effect, such as the block moving, the marble slowing, or a sound; then infer that energy transferred.' },
        ],
        "widget": {
          "type": "collision-ramp",
          "config": {
            "rampAngle": 0,
            "massA": 6,
            "massB": 3,
            "speedA": 4,
            "speedB": 0,
            "target": "compare-motion"
          }
        },
        check: {
          prompt: 'Which note best describes a motion change in the model roller coaster collision?',
          choices: [
            { id: 'before-after', text: 'Before: foam block still; after: block moves and marble slows.' },
            { id: 'same-color', text: 'Before and after: the track is the same color.' },
            { id: 'favorite', text: 'The marble is the observer’s favorite object.' },
          ],
          correctChoiceId: 'before-after',
          explanation: 'Comparing the marble and foam block before and after the bump shows the motion changes in a collision.',
        },
      },
      {
        id: 'science-u01-l03-c2',
        title: 'Ask a testable collision question',
        blocks: [
          { kind: 'text', text: 'A testable question names something to change and something to observe. In a model roller coaster investigation, you might change the marble’s release height and observe how far a foam block moves after the bump. Keep the marble, track, block, and surface the same so the comparison is fair.' },
          { kind: 'example', text: 'Ask, “How does changing the release height of the same miniature roller coaster marble affect how far the same foam block moves after their collision?” This question tells you what changes and what observable result to record.' },
          { kind: 'tip', text: 'Questions about changes in speed and energy can be investigated. Questions about which collision looks coolest are opinions, so they cannot guide a fair test.' },
        ],
        "widget": {
          "type": "central-idea-organizer",
          "config": {
            "mainIdeaChoices": [
              "This question is testable",
              "This question is not testable"
            ],
            "details": [
              {
                "id": "change-height",
                "text": "It names the marble release height as the one thing to change.",
                "supports": [
                  "This question is testable"
                ]
              },
              {
                "id": "observe-block",
                "text": "It names how far the foam block moves as the thing to observe.",
                "supports": [
                  "This question is testable"
                ]
              },
              {
                "id": "hold-same",
                "text": "It keeps the same marble, ramp, and block for every trial.",
                "supports": [
                  "This question is testable"
                ]
              },
              {
                "id": "coolest",
                "text": "It asks which track looks coolest.",
                "supports": [
                  "This question is not testable"
                ]
              }
            ],
            "requiredDetailCount": 3
          }
        },
        check: {
          prompt: 'Which is a testable question for the model roller coaster collision?',
          choices: [
            { id: 'release-height', text: 'How does the marble’s release height affect how far the foam block moves?' },
            { id: 'coolest', text: 'Which marble collision looks coolest?' },
            { id: 'favorite-name', text: 'What is the best name for the roller coaster track?' },
          ],
          correctChoiceId: 'release-height',
          explanation: 'A testable question changes release height and asks about the foam block’s observable motion.',
        },
      },
      {
        id: 'science-u01-l03-c3',
        title: 'Predict a qualitative outcome',
        blocks: [
          { kind: 'text', text: 'A prediction states what you expect to observe and why. It can use faster, slower, farther, more, or less instead of exact amounts. A good prediction does not promise that every trial will look exactly the same; it gives a scientific reason for an expected pattern.' },
          { kind: 'example', text: 'If the same miniature roller coaster marble is released from a higher mark before it hits the same foam block, I predict the block will move farther. The marble should be moving faster and have more kinetic energy, so more energy of motion can transfer to the block in the collision.' },
          { kind: 'tip', text: 'A prediction is testable when the before-and-after motion can be observed and compared. Be ready to revise an explanation if new observations do not match the prediction.' },
        ],
        demo: { type: 'roller-coaster', focus: 'collision' },
        check: {
          prompt: 'Which is a testable prediction for the tabletop roller coaster marble?',
          choices: [
            { id: 'farther-block', text: 'The foam block may move farther after the marble is released from higher up.' },
            { id: 'guaranteed', text: 'The marble will always do exactly the same thing.' },
            { id: 'unrelated', text: 'The track will become a different color after the collision.' },
          ],
          correctChoiceId: 'farther-block',
          explanation: 'This prediction names an observable result and connects it to a planned change in the marble’s release height.',
        },
      },
    ],
    workedExample: {
      title: 'Plan a safe model roller-coaster collision investigation',
      steps: [
        'Ari builds a safe miniature roller coaster: a marble rolls down the same ramp toward the same light foam block. The block begins still on a clear, level surface.',
        'Ari asks, “How does the marble’s release height affect how far the foam block moves after their collision?” The release height is what Ari will change; the block’s movement is what Ari will observe.',
        'Ari predicts that the block will move farther after the higher release because the same marble should be moving faster and have more kinetic energy at the bottom of the ramp.',
        'After each trial, Ari notes the marble’s motion before the bump and the marble and block motions afterward. The collision can transfer energy of motion to the block, while some energy transfers to surroundings as sound and thermal (heat) energy.',
      ],
    },
    quiz: {
      passThreshold: 8,
      pool: [
        {
          id: 'science-u01-l03-q01',
          type: 'multiple-choice',
          prompt: 'Which event is a collision in a safe model roller coaster investigation?',
          choices: [
            { id: 'a', text: 'A rolling marble bumps a foam block at the bottom of a model track' },
            { id: 'b', text: 'A still cart waits beside a book' },
            { id: 'c', text: 'A student draws two carts on paper' },
            { id: 'd', text: 'A tube rests alone on a shelf' },
          ],
          correctChoiceId: 'a',
          explanation: 'A collision occurs when the moving marble bumps the foam block.',
          conceptTag: 'collision-motion-changes',
          reviewCardId: 'science-u01-l03-c1',
        },
        {
          id: 'science-u01-l03-q02',
          type: 'multiple-choice',
          prompt: 'What should an observer compare around a model roller coaster collision?',
          choices: [
            { id: 'a', text: 'The favorite colors of the observers' },
            { id: 'b', text: 'The objects’ motion before and after they bump' },
            { id: 'c', text: 'The number of words in the directions' },
            { id: 'd', text: 'The day each object was made' },
          ],
          correctChoiceId: 'b',
          explanation: 'Before-and-after motion reveals changes in speed or direction during the collision.',
          conceptTag: 'collision-motion-changes',
          reviewCardId: 'science-u01-l03-c1',
        },
        {
          id: 'science-u01-l03-q03',
          type: 'multiple-choice',
          prompt: 'A model roller coaster marble hits a still foam block; which observation shows a motion change?',
          choices: [
            { id: 'a', text: 'Both objects have labels' },
            { id: 'b', text: 'The lane remains the same color' },
            { id: 'c', text: 'The marble slows and the foam block begins moving' },
            { id: 'd', text: 'The observer writes the date' },
          ],
          correctChoiceId: 'c',
          explanation: 'The marble slowing and the foam block starting to move are visible changes caused by the collision.',
          conceptTag: 'collision-motion-changes',
          reviewCardId: 'science-u01-l03-c1',
        },
        {
          id: 'science-u01-l03-q04',
          type: 'multiple-choice',
          prompt: 'Which is the best testable question about a miniature roller coaster collision?',
          choices: [
            { id: 'a', text: 'Why are toy carts fun?' },
            { id: 'b', text: 'Which cart is the prettiest?' },
            { id: 'c', text: 'Who likes collisions most?' },
            { id: 'd', text: 'How does the same marble’s release height affect how far the same foam block moves after they collide?' },
          ],
          correctChoiceId: 'd',
          explanation: 'This question changes release height and names an observable collision outcome.',
          conceptTag: 'testable-collision-questions',
          reviewCardId: 'science-u01-l03-c2',
        },
        {
          id: 'science-u01-l03-q05',
          type: 'sort',
          prompt: 'Tap the pieces in order to assemble a testable model roller coaster collision question.',
          items: [
            { id: 'start', text: 'How does changing the release height of the same marble' },
            { id: 'middle', text: 'affect how far the same foam block moves' },
            { id: 'end', text: 'after their collision?' },
          ],
          correctOrder: ['start', 'middle', 'end'],
          explanation: 'The assembled question changes release height and names the foam block’s observable motion after the collision.',
          conceptTag: 'testable-collision-questions',
          reviewCardId: 'science-u01-l03-c2',
        },
        {
          id: 'science-u01-l03-q06',
          type: 'multiple-choice',
          prompt: 'Which miniature roller coaster question asks about an observable motion outcome that can provide evidence about a change in energy of motion?',
          choices: [
            { id: 'a', text: 'Which cart has the best name?' },
            { id: 'b', text: 'Does the foam block move farther when the same marble is released from higher on the track?' },
            { id: 'c', text: 'Why is rolling always exciting?' },
            { id: 'd', text: 'Which sticker belongs on the lane?' },
          ],
          correctChoiceId: 'b',
          explanation: 'The question links a changed release height to the foam block’s observable motion, which can provide evidence about a change in energy of motion.',
          conceptTag: 'testable-collision-questions',
          reviewCardId: 'science-u01-l03-c2',
        },
        {
          id: 'science-u01-l03-q07',
          type: 'multiple-choice',
          prompt: 'The same model roller coaster marble will hit the same foam block after a low and then a higher release; which prediction fits the lesson?',
          choices: [
            { id: 'a', text: 'The tube will change into a cart' },
            { id: 'b', text: 'The lane will choose the outcome' },
            { id: 'c', text: 'The foam block may move farther after the faster collision' },
            { id: 'd', text: 'Nothing observable can change in a collision' },
          ],
          correctChoiceId: 'c',
          explanation: 'The same marble has more energy of motion when faster, so farther foam-block motion is a reasonable prediction.',
          conceptTag: 'qualitative-collision-predictions',
          reviewCardId: 'science-u01-l03-c3',
        },
        {
          id: 'science-u01-l03-q08',
          type: 'multiple-choice',
          prompt: 'Which model roller coaster prediction includes both an expected outcome and a reason?',
          choices: [
            { id: 'a', text: 'The carts might collide' },
            { id: 'b', text: 'I predict something will happen' },
            { id: 'c', text: 'The tube is made of cardboard' },
            { id: 'd', text: 'The foam block will move farther after the faster collision because the same marble has more energy of motion' },
          ],
          correctChoiceId: 'd',
          explanation: 'The statement predicts an observable result and connects it to the marble’s energy of motion.',
          conceptTag: 'qualitative-collision-predictions',
          reviewCardId: 'science-u01-l03-c3',
        },
        {
          id: 'science-u01-l03-q09',
          type: 'true-false',
          prompt: 'A qualitative collision prediction may use words such as farther or slower instead of exact amounts.',
          choices: [
            { id: 'true', text: 'True — comparison words can describe expected changes' },
            { id: 'false', text: 'False — every prediction needs an exact number' },
          ],
          correctChoiceId: 'true',
          explanation: 'Qualitative predictions describe expected changes without requiring exact measurements.',
          conceptTag: 'qualitative-collision-predictions',
          reviewCardId: 'science-u01-l03-c3',
        },
        {
          id: 'science-u01-l03-q10',
          type: 'multiple-choice',
          prompt: 'Which before-and-after note is most useful for a model roller coaster collision investigation?',
          choices: [
            { id: 'a', text: 'Before: foam block still; after: foam block moving and incoming marble slower' },
            { id: 'b', text: 'Before: observer curious; after: observer still curious' },
            { id: 'c', text: 'Before: lane blue; after: lane blue' },
            { id: 'd', text: 'Before: Tuesday; after: later on Tuesday' },
          ],
          correctChoiceId: 'a',
          explanation: 'The note records observable motion changes in both objects during the collision.',
          conceptTag: 'collision-motion-changes',
          reviewCardId: 'science-u01-l03-c1',
        },
        {
          id: 'science-u01-l03-q11',
          type: 'true-false',
          prompt: '“Which collision looks coolest?” is a testable question about changes in speed and energy.',
          choices: [
            { id: 'true', text: 'True — coolest is an observable energy change' },
            { id: 'false', text: 'False — coolest is an opinion, not a defined motion observation' },
          ],
          correctChoiceId: 'false',
          explanation: 'A testable collision question must name a change and an observable motion outcome.',
          conceptTag: 'testable-collision-questions',
          reviewCardId: 'science-u01-l03-c2',
        },
        {
          id: 'science-u01-l03-q12',
          type: 'multiple-choice',
          prompt: 'Which model roller coaster plan makes the fairest comparison of collision outcomes?',
          choices: [
            { id: 'a', text: 'Change the marble, foam block, and track each time' },
            { id: 'b', text: 'Use the same marble, foam block, and track while changing its release height' },
            { id: 'c', text: 'Use one trial and choose the hoped-for answer' },
            { id: 'd', text: 'Compare a rolling cart with a falling leaf' },
          ],
          correctChoiceId: 'b',
          explanation: 'Keeping the marble, foam block, and track the same focuses the comparison on release height.',
          conceptTag: 'testable-collision-questions',
          reviewCardId: 'science-u01-l03-c2',
        },
        {
          id: 'science-u01-l03-q13',
          type: 'true-false',
          prompt: 'A collision in a model roller coaster investigation can change the speed and energy of motion of the objects involved.',
          choices: [
            { id: 'true', text: 'True — motion may change when objects collide' },
            { id: 'false', text: 'False — collisions never change motion' },
          ],
          correctChoiceId: 'true',
          explanation: 'Objects may slow, stop, or begin moving during a collision, showing changes in energy of motion.',
          conceptTag: 'collision-motion-changes',
          reviewCardId: 'science-u01-l03-c1',
        },
      ],
    },
  },
  scienceU01L04Lesson,
] satisfies Lesson[];
