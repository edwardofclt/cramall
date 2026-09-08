import { sources } from '../../widgets/science/workshop/models';
import type { WidgetCoach } from '../schema';
import type { ScienceWorkshopConfig } from './workshop-schema';
export const scienceWorkshopActivities = [
    {
        "lessonId": "science-u02-l04",
        "cardId": "science-u02-l04-c3",
        "config": {
            "activity": "receiver-changes"
        },
        "coach": {
            "startLabel": "Compare the cases",
            "intro": [
                {
                    "speaker": "guide",
                    "pose": "talk",
                    "text": "These cases have different effects. Let's compare what changed at the receiving object."
                },
                {
                    "speaker": "kid",
                    "text": "I’ll organize the supplied observations and use more than one case to explain a pattern."
                }
            ],
            "reactions": {
                "strategy": {
                    "pose": "think",
                    "text": "Keep the source or model beside your work. Use this step’s directions to decide what to compare."
                },
                "retry": {
                    "pose": "oops",
                    "text": "Use the feedback for this step. Compare your choices with the source or model, then revise what does not fit."
                },
                "milestone": {
                    "pose": "talk",
                    "text": "Look for a shared pattern without claiming every effect is the same."
                },
                "complete": {
                    "pose": "cheer",
                    "text": "You used different receiver effects to support an energy-transfer idea and kept its limits."
                }
            }
        }
    },
    {
        "lessonId": "science-u03-l02",
        "cardId": "science-u03-l02-c2",
        "config": {
            "activity": "crest-to-crest"
        },
        "coach": {
            "startLabel": "Mark the wave patterns",
            "intro": [
                {
                    "speaker": "guide",
                    "pose": "talk",
                    "text": "A wave's height and the spacing between its crests describe different things. Let's compare the spacing."
                },
                {
                    "speaker": "kid",
                    "text": "I’ll mark matching neighboring points, change their spacing, and explain the pattern."
                }
            ],
            "reactions": {
                "strategy": {
                    "pose": "think",
                    "text": "Keep the source or model beside your work. Use this step’s directions to decide what to compare."
                },
                "retry": {
                    "pose": "oops",
                    "text": "Use the feedback for this step. Compare your choices with the source or model, then revise what does not fit."
                },
                "milestone": {
                    "pose": "talk",
                    "text": "Keep the starting span beside the changed span."
                },
                "complete": {
                    "pose": "cheer",
                    "text": "You compared matching-point spacing while keeping the wave height the same."
                }
            }
        }
    },
    {
        "lessonId": "science-u04-l03",
        "cardId": "science-u04-l03-c3",
        "config": {
            "activity": "pixel-post"
        },
        "coach": {
            "startLabel": "Encode the picture",
            "intro": [
                {
                    "speaker": "guide",
                    "pose": "talk",
                    "text": "A picture can travel as a pattern of two values. Both ends need the same order."
                },
                {
                    "speaker": "kid",
                    "text": "I’ll encode each square, rebuild the picture here, and repair a changed value."
                }
            ],
            "reactions": {
                "strategy": {
                    "pose": "think",
                    "text": "Keep the source or model beside your work. Use this step’s directions to decide what to compare."
                },
                "retry": {
                    "pose": "oops",
                    "text": "Use the feedback for this step. Compare your choices with the source or model, then revise what does not fit."
                },
                "milestone": {
                    "pose": "talk",
                    "text": "Now check what one changed value does."
                },
                "complete": {
                    "pose": "cheer",
                    "text": "You used a shared key and order to reconstruct and repair the picture."
                }
            }
        }
    },
    {
        "lessonId": "science-u04-l04",
        "cardId": "science-u04-l04-c3",
        "config": {
            "activity": "message-design-trials"
        },
        "coach": {
            "startLabel": "Compare message designs",
            "intro": [
                {
                    "speaker": "guide",
                    "pose": "talk",
                    "text": "The same message can use different patterns. A shorter pattern is useful only if the message can still be understood."
                },
                {
                    "speaker": "kid",
                    "text": "I’ll build two solutions, compare the supplied results, and explain a choice using the criteria."
                }
            ],
            "reactions": {
                "strategy": {
                    "pose": "think",
                    "text": "Keep the source or model beside your work. Use this step’s directions to decide what to compare."
                },
                "retry": {
                    "pose": "oops",
                    "text": "Use the feedback for this step. Compare your choices with the source or model, then revise what does not fit."
                },
                "milestone": {
                    "pose": "talk",
                    "text": "What might change if the conditions or the reader's key changed?"
                },
                "complete": {
                    "pose": "cheer",
                    "text": "You supported a design choice with two criteria and a limitation."
                }
            }
        }
    },
    {
        "lessonId": "science-u05-l03",
        "cardId": "science-u05-l03-c1",
        "config": {
            "activity": "lamp-test-notebook"
        },
        "coach": {
            "startLabel": "Open the test notebook",
            "intro": [
                {
                    "speaker": "guide",
                    "pose": "talk",
                    "text": "We need the same goal and procedure for every trial. Then the records can help us judge the lamp."
                },
                {
                    "speaker": "kid",
                    "text": "I’ll organize the test steps, inspect the supplied trials, and compare every result with the goal."
                }
            ],
            "reactions": {
                "strategy": {
                    "pose": "think",
                    "text": "Keep the source or model beside your work. Use this step’s directions to decide what to compare."
                },
                "retry": {
                    "pose": "oops",
                    "text": "Use the feedback for this step. Compare your choices with the source or model, then revise what does not fit."
                },
                "milestone": {
                    "pose": "talk",
                    "text": "The goal is the whole ten seconds. Compare each recorded duration with ten."
                },
                "complete": {
                    "pose": "cheer",
                    "text": "You used all three records to judge this version against its stated goal."
                }
            }
        }
    },
    {
        "lessonId": "science-u06-l01",
        "cardId": "science-u06-l01-c3",
        "config": {
            "activity": "plant-system"
        },
        "coach": {
            "startLabel": "Build the plant system",
            "intro": [
                {
                    "speaker": "guide",
                    "pose": "talk",
                    "text": "A plant's parts have different jobs, and some jobs depend on connections between parts."
                },
                {
                    "speaker": "kid",
                    "text": "I’ll build the plant model, connect its jobs, and explain how several structures work together."
                }
            ],
            "reactions": {
                "strategy": {
                    "pose": "think",
                    "text": "Keep the source or model beside your work. Use this step’s directions to decide what to compare."
                },
                "retry": {
                    "pose": "oops",
                    "text": "Use the feedback for this step. Compare your choices with the source or model, then revise what does not fit."
                },
                "milestone": {
                    "pose": "talk",
                    "text": "Use the links to explain how water, support, and light work together."
                },
                "complete": {
                    "pose": "cheer",
                    "text": "You explained a plant system using connected structure jobs."
                }
            }
        }
    },
    {
        "lessonId": "science-u06-l03",
        "cardId": "science-u06-l03-c3",
        "config": {
            "activity": "survival-evidence"
        },
        "coach": {
            "startLabel": "Build a survival argument",
            "intro": [
                {
                    "speaker": "guide",
                    "pose": "talk",
                    "text": "An argument needs more than a list of body parts. Which observations help explain how the parts work together?"
                },
                {
                    "speaker": "kid",
                    "text": "I’ll connect a claim to observations and functions, then name what the evidence cannot tell me."
                }
            ],
            "reactions": {
                "strategy": {
                    "pose": "think",
                    "text": "Keep the source or model beside your work. Use this step’s directions to decide what to compare."
                },
                "retry": {
                    "pose": "oops",
                    "text": "Use the feedback for this step. Compare your choices with the source or model, then revise what does not fit."
                },
                "milestone": {
                    "pose": "talk",
                    "text": "Keep the observation separate from the conclusion it supports."
                },
                "complete": {
                    "pose": "cheer",
                    "text": "Your argument connects cooperating structures to supplied observations and a clear limit."
                }
            }
        }
    },
    {
        "lessonId": "science-u06-l04",
        "cardId": "science-u06-l04-c3",
        "config": {
            "activity": "sense-response"
        },
        "coach": {
            "startLabel": "Build the response trail",
            "intro": [
                {
                    "speaker": "guide",
                    "pose": "talk",
                    "text": "The same sound can lead to more than one response. Let's model how information reaches an animal and is processed."
                },
                {
                    "speaker": "kid",
                    "text": "I’ll connect the event, sense, and brain, then compare two possible responses."
                }
            ],
            "reactions": {
                "strategy": {
                    "pose": "think",
                    "text": "Keep the source or model beside your work. Use this step’s directions to decide what to compare."
                },
                "retry": {
                    "pose": "oops",
                    "text": "Use the feedback for this step. Compare your choices with the source or model, then revise what does not fit."
                },
                "milestone": {
                    "pose": "talk",
                    "text": "Keep that path and try another possible response to the same sound."
                },
                "complete": {
                    "pose": "cheer",
                    "text": "You modeled information moving through a sense and the brain, with more than one possible response."
                }
            }
        }
    }
] satisfies {
    lessonId: string;
    cardId: string;
    config: ScienceWorkshopConfig;
    coach: WidgetCoach;
}[];
export function scienceWorkshopSpeechText(config: ScienceWorkshopConfig): string[] { return [sources[config.activity]]; }
