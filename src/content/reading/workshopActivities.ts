import type { WidgetCoach } from '../schema';
import type { ReadingWorkshopConfig } from './workshop-schema';
import { readingSources } from '../../widgets/reading/workshop/sources';

export const readingWorkshopActivities: { lessonId: string; cardId: string; config: ReadingWorkshopConfig; coach: WidgetCoach }[] = [
  {
    "lessonId": "reading-u01-l02",
    "cardId": "reading-u01-l02-c2",
    "config": {
      "activity": "direct-the-reading"
    },
    "coach": {
      "startLabel": "Direct a reading",
      "intro": [
        {
          "speaker": "guide",
          "pose": "talk",
          "text": "The words and punctuation give us clues about how these speakers feel."
        },
        {
          "speaker": "kid",
          "text": "I’ll choose a clue, mark a possible voice choice, and explain the meaning it brings out."
        }
      ],
      "reactions": {
        "strategy": {
          "pose": "think",
          "text": "Keep the original source nearby. Use its words to support or revise the connection you are building."
        },
        "retry": {
          "pose": "oops",
          "text": "Compare the line, its context, and your voice choice. Explain the meaning your plan brings out."
        },
        "milestone": {
          "pose": "talk",
          "text": "Your checked connection is retained. Keep its source details nearby as you work."
        },
        "complete": {
          "pose": "cheer",
          "text": "You connected two reading choices to clues in the scene."
        }
      }
    }
  },
  {
    "lessonId": "reading-u02-l03",
    "cardId": "reading-u02-l03-c3",
    "config": {
      "activity": "word-desk"
    },
    "coach": {
      "startLabel": "Open the word desk",
      "intro": [
        {
          "speaker": "guide",
          "pose": "talk",
          "text": "The first meaning in an entry may not fit our sentence. Let's check the word desk."
        },
        {
          "speaker": "kid",
          "text": "I’ll choose a reference, try a meaning in context, and show why it fits."
        }
      ],
      "reactions": {
        "strategy": {
          "pose": "think",
          "text": "Keep the original source nearby. Use its words to support or revise the connection you are building."
        },
        "retry": {
          "pose": "oops",
          "text": "Compare your choice with the reference entry and the field-note sentence."
        },
        "milestone": {
          "pose": "talk",
          "text": "Your checked connection is retained. Keep its source details nearby as you work."
        },
        "complete": {
          "pose": "cheer",
          "text": "You used both an entry and its sentence to choose precise meanings."
        }
      }
    }
  },
  {
    "lessonId": "reading-u07-l02",
    "cardId": "reading-u07-l02-c3",
    "config": {
      "activity": "connect-weather-report"
    },
    "coach": {
      "startLabel": "Connect the report",
      "intro": [
        {
          "speaker": "guide",
          "pose": "talk",
          "text": "The report, map, and transcript each tell us something different about the rain."
        },
        {
          "speaker": "kid",
          "text": "I’ll pin exact details and explain what they add when I read them together."
        }
      ],
      "reactions": {
        "strategy": {
          "pose": "think",
          "text": "Keep the original source nearby. Use its words to support or revise the connection you are building."
        },
        "retry": {
          "pose": "oops",
          "text": "Return to the labeled record or exact phrase. Check what that kind of source can tell you."
        },
        "milestone": {
          "pose": "talk",
          "text": "Your checked connection is retained. Keep its source details nearby as you work."
        },
        "complete": {
          "pose": "cheer",
          "text": "You combined exact amounts, location, and described sound without mixing up what each source shows."
        }
      }
    }
  },
  {
    "lessonId": "reading-u08-l01",
    "cardId": "reading-u08-l01-c3",
    "config": {
      "activity": "authors-lens"
    },
    "coach": {
      "startLabel": "Compare the authors",
      "intro": [
        {
          "speaker": "guide",
          "pose": "talk",
          "text": "Both authors discuss a bench, but they want different things from their readers."
        },
        {
          "speaker": "kid",
          "text": "I’ll mark their language and connect it to a viewpoint and a purpose."
        }
      ],
      "reactions": {
        "strategy": {
          "pose": "think",
          "text": "Keep the original source nearby. Use its words to support or revise the connection you are building."
        },
        "retry": {
          "pose": "oops",
          "text": "Return to the selected wording. Check how it supports your interpretation of purpose and perspective."
        },
        "milestone": {
          "pose": "talk",
          "text": "Your checked connection is retained. Keep its source details nearby as you work."
        },
        "complete": {
          "pose": "cheer",
          "text": "You explained how each author's language helps carry out a purpose."
        }
      }
    }
  },
  {
    "lessonId": "reading-u08-l02",
    "cardId": "reading-u08-l02-c3",
    "config": {
      "activity": "support-chain"
    },
    "coach": {
      "startLabel": "Build the support chain",
      "intro": [
        {
          "speaker": "guide",
          "pose": "talk",
          "text": "A useful detail needs a connection to the author's claim. Let's build those connections."
        },
        {
          "speaker": "kid",
          "text": "I’ll link evidence to reasons, keep unrelated details aside, and include the source's limit."
        }
      ],
      "reactions": {
        "strategy": {
          "pose": "think",
          "text": "Keep the original source nearby. Use its words to support or revise the connection you are building."
        },
        "retry": {
          "pose": "oops",
          "text": "Trace each detail back to its role in the argument. Keep support, limits, and care conditions distinct."
        },
        "milestone": {
          "pose": "talk",
          "text": "Your checked connection is retained. Keep its source details nearby as you work."
        },
        "complete": {
          "pose": "cheer",
          "text": "Your chains show how the evidence supports the claim and what it cannot prove."
        }
      }
    }
  },
  {
    "lessonId": "reading-u09-l02",
    "cardId": "reading-u09-l02-c3",
    "config": {
      "activity": "two-views-one-event"
    },
    "coach": {
      "startLabel": "Trace the two views",
      "intro": [
        {
          "speaker": "guide",
          "pose": "talk",
          "text": "The rehearsal changed for everyone, but Ari and Bea see that change differently."
        },
        {
          "speaker": "kid",
          "text": "I’ll trace each view to a reaction and show how the misunderstanding changes."
        }
      ],
      "reactions": {
        "strategy": {
          "pose": "think",
          "text": "Keep the original source nearby. Use its words to support or revise the connection you are building."
        },
        "retry": {
          "pose": "oops",
          "text": "Use the characters’ own words and actions to reconsider the viewpoint or story connection."
        },
        "milestone": {
          "pose": "talk",
          "text": "Your checked connection is retained. Keep its source details nearby as you work."
        },
        "complete": {
          "pose": "cheer",
          "text": "You connected different perspectives to the conflict and the later cooperation."
        }
      }
    }
  },
  {
    "lessonId": "reading-u10-l01",
    "cardId": "reading-u10-l01-c3",
    "config": {
      "activity": "one-moment-three-forms"
    },
    "coach": {
      "startLabel": "Compare the three forms",
      "intro": [
        {
          "speaker": "guide",
          "pose": "talk",
          "text": "The same mitten changes hands in three forms. Each form helps us notice something."
        },
        {
          "speaker": "kid",
          "text": "I’ll match the shared moment, mark the structures, and compare how they tell it."
        }
      ],
      "reactions": {
        "strategy": {
          "pose": "think",
          "text": "Keep the original source nearby. Use its words to support or revise the connection you are building."
        },
        "retry": {
          "pose": "oops",
          "text": "Compare actual words and structures in the selected forms. Connect your explanation to an example."
        },
        "milestone": {
          "pose": "talk",
          "text": "Your checked connection is retained. Keep its source details nearby as you work."
        },
        "complete": {
          "pose": "cheer",
          "text": "You connected structure to how each version presents the same moment."
        }
      }
    }
  },
  {
    "lessonId": "reading-u10-l03",
    "cardId": "reading-u10-l03-c3",
    "config": {
      "activity": "literal-and-vivid"
    },
    "coach": {
      "startLabel": "Compare the wording",
      "intro": [
        {
          "speaker": "guide",
          "pose": "talk",
          "text": "We could tell these events plainly, but the author chose vivid phrases. Let's see what those choices add."
        },
        {
          "speaker": "kid",
          "text": "I’ll try a literal version, compare it with the original, and use the scene to explain the effect."
        }
      ],
      "reactions": {
        "strategy": {
          "pose": "think",
          "text": "Keep the original source nearby. Use its words to support or revise the connection you are building."
        },
        "retry": {
          "pose": "oops",
          "text": "Compare the wording with the race context. Check that your meaning and reader effect fit the source."
        },
        "milestone": {
          "pose": "talk",
          "text": "Your checked connection is retained. Keep its source details nearby as you work."
        },
        "complete": {
          "pose": "cheer",
          "text": "You explained what each phrase adds beyond the literal event."
        }
      }
    }
  },
  {
    "lessonId": "reading-u11-l01",
    "cardId": "reading-u11-l01-c3",
    "config": {
      "activity": "question-compass"
    },
    "coach": {
      "startLabel": "Set my inquiry",
      "intro": [
        {
          "speaker": "guide",
          "pose": "talk",
          "text": "A focused question helps us notice useful information. One source may not answer everything."
        },
        {
          "speaker": "kid",
          "text": "I’ll build a question, collect findings that answer it, and mark what I still need to learn."
        }
      ],
      "reactions": {
        "strategy": {
          "pose": "think",
          "text": "Keep the original source nearby. Use its words to support or revise the connection you are building."
        },
        "retry": {
          "pose": "oops",
          "text": "Check the current question against the notes. Separate supported findings from information the notes do not supply."
        },
        "milestone": {
          "pose": "talk",
          "text": "Your checked connection is retained. Keep its source details nearby as you work."
        },
        "complete": {
          "pose": "cheer",
          "text": "You gathered source-linked findings for a focused question and named a limit."
        }
      }
    }
  },
  {
    "lessonId": "reading-u11-l03",
    "cardId": "reading-u11-l03-c3",
    "config": {
      "activity": "research-folder"
    },
    "coach": {
      "startLabel": "Pack the research folder",
      "intro": [
        {
          "speaker": "guide",
          "pose": "talk",
          "text": "A true detail can still miss our question. Our research folder needs useful connections."
        },
        {
          "speaker": "kid",
          "text": "I’ll sort the notes by the question, explain my choices, and check what changes with a new question."
        }
      ],
      "reactions": {
        "strategy": {
          "pose": "think",
          "text": "Keep the original source nearby. Use its words to support or revise the connection you are building."
        },
        "retry": {
          "pose": "oops",
          "text": "Use the current research question to reconsider where a note belongs and why."
        },
        "milestone": {
          "pose": "talk",
          "text": "Your checked connection is retained. Keep its source details nearby as you work."
        },
        "complete": {
          "pose": "cheer",
          "text": "You judged relevance by the question and explained why a detail could change groups."
        }
      }
    }
  },
  {
    "lessonId": "reading-u11-l04",
    "cardId": "reading-u11-l04-c3",
    "config": {
      "activity": "research-clusters"
    },
    "coach": {
      "startLabel": "Build research clusters",
      "intro": [
        {
          "speaker": "guide",
          "pose": "talk",
          "text": "Several findings can point to one bigger idea. Let's arrange them so another reader can see the connections."
        },
        {
          "speaker": "kid",
          "text": "I’ll group related notes, name each shared idea, and explain what the group shows."
        }
      ],
      "reactions": {
        "strategy": {
          "pose": "think",
          "text": "Keep the original source nearby. Use its words to support or revise the connection you are building."
        },
        "retry": {
          "pose": "oops",
          "text": "Compare each folder’s name, notes, and group statement. Look for the shared idea they support."
        },
        "milestone": {
          "pose": "talk",
          "text": "Your checked connection is retained. Keep its source details nearby as you work."
        },
        "complete": {
          "pose": "cheer",
          "text": "Your groups turn separate findings into three clear shared ideas."
        }
      }
    }
  },
  {
    "lessonId": "reading-u11-l05",
    "cardId": "reading-u11-l05-c3",
    "config": {
      "activity": "source-credit"
    },
    "coach": {
      "startLabel": "Repair the source credit",
      "intro": [
        {
          "speaker": "guide",
          "pose": "talk",
          "text": "We can use a source's words or explain its idea in our own wording. Both need credit."
        },
        {
          "speaker": "kid",
          "text": "I’ll repair a quotation, build the citation from the source, and check a paraphrase."
        }
      ],
      "reactions": {
        "strategy": {
          "pose": "think",
          "text": "Keep the original source nearby. Use its words to support or revise the connection you are building."
        },
        "retry": {
          "pose": "oops",
          "text": "Compare your draft choices with the source text and supplied publication details. Check faithful wording and source credit."
        },
        "milestone": {
          "pose": "talk",
          "text": "Your checked connection is retained. Keep its source details nearby as you work."
        },
        "complete": {
          "pose": "cheer",
          "text": "You marked borrowed wording and gave credit for both the quotation and the paraphrase."
        }
      }
    }
  }
];

export function readingWorkshopSpeechText(config: ReadingWorkshopConfig): string[] {
  const source = readingSources[config.activity];
  return [source.title, source.text];
}
