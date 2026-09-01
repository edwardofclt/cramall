import { describe, expect, test } from 'vitest';
import { READING_OE_CODES } from '../curriculum';
import { WidgetRefSchema, validateLesson, type Question } from '../schema';
import { expectUnitLessons } from '../unit-test-helpers';
import { unit11Lessons } from './u11';

const expectedManifest = [
  {
    "id": "reading-u11-l01",
    "unitId": "reading-u11",
    "title": "Ask an Inquiry Question and Examine a Source",
    "indicatorCodes": [
      "ELA.4.R.1.1"
    ]
  },
  {
    "id": "reading-u11-l02",
    "unitId": "reading-u11",
    "title": "Judge the Credibility of a Provided Source",
    "indicatorCodes": [
      "ELA.4.R.1.2"
    ]
  },
  {
    "id": "reading-u11-l03",
    "unitId": "reading-u11",
    "title": "Select Information Relevant to a Topic",
    "indicatorCodes": [
      "ELA.4.R.1.3"
    ]
  },
  {
    "id": "reading-u11-l04",
    "unitId": "reading-u11",
    "title": "Group Related Research Findings",
    "indicatorCodes": [
      "ELA.4.R.1.4"
    ]
  },
  {
    "id": "reading-u11-l05",
    "unitId": "reading-u11",
    "title": "Cite Sources and Avoid Plagiarism",
    "indicatorCodes": [
      "ELA.4.R.1.5"
    ]
  }
] as const;
const expectedCards = [
  {
    "id": "reading-u11-l01",
    "cards": [
      {
        "id": "reading-u11-l01-c1",
        "title": "Focus an Inquiry Question",
        "conceptTag": "inquiry-question"
      },
      {
        "id": "reading-u11-l01-c2",
        "title": "Examine the Provided Source",
        "conceptTag": "source-examination"
      },
      {
        "id": "reading-u11-l01-c3",
        "title": "Record Question-Based Findings",
        "conceptTag": "inquiry-findings"
      }
    ]
  },
  {
    "id": "reading-u11-l02",
    "cards": [
      {
        "id": "reading-u11-l02-c1",
        "title": "Check Author and Publisher",
        "conceptTag": "source-authority"
      },
      {
        "id": "reading-u11-l02-c2",
        "title": "Check Date, Evidence, and Purpose",
        "conceptTag": "source-evidence"
      },
      {
        "id": "reading-u11-l02-c3",
        "title": "Make a Credibility Judgment",
        "conceptTag": "credibility-judgment"
      }
    ]
  },
  {
    "id": "reading-u11-l03",
    "cards": [
      {
        "id": "reading-u11-l03-c1",
        "title": "Define the Relevance Test",
        "conceptTag": "relevance-test"
      },
      {
        "id": "reading-u11-l03-c2",
        "title": "Select Relevant Information",
        "conceptTag": "relevance-selection"
      },
      {
        "id": "reading-u11-l03-c3",
        "title": "Explain Why a Detail Belongs",
        "conceptTag": "relevance-reasoning"
      }
    ]
  },
  {
    "id": "reading-u11-l04",
    "cards": [
      {
        "id": "reading-u11-l04-c1",
        "title": "Identify Useful Categories",
        "conceptTag": "finding-categories"
      },
      {
        "id": "reading-u11-l04-c2",
        "title": "Place Findings with Their Group",
        "conceptTag": "grouped-findings"
      },
      {
        "id": "reading-u11-l04-c3",
        "title": "Name the Pattern in Each Group",
        "conceptTag": "group-synthesis"
      }
    ]
  },
  {
    "id": "reading-u11-l05",
    "cards": [
      {
        "id": "reading-u11-l05-c1",
        "title": "Distinguish Quoting and Paraphrasing",
        "conceptTag": "source-use"
      },
      {
        "id": "reading-u11-l05-c2",
        "title": "Build a Simple Source Citation",
        "conceptTag": "citation-format"
      },
      {
        "id": "reading-u11-l05-c3",
        "title": "Give Credit Every Time",
        "conceptTag": "attribution-check"
      }
    ]
  }
] as const;
const expectedRoutes = [
  {
    "id": "reading-u11-l01",
    "questions": [
      {
        "id": "reading-u11-l01-q01",
        "type": "multiple-choice",
        "conceptTag": "inquiry-question",
        "reviewCardId": "reading-u11-l01-c1"
      },
      {
        "id": "reading-u11-l01-q02",
        "type": "true-false",
        "conceptTag": "inquiry-question",
        "reviewCardId": "reading-u11-l01-c1"
      },
      {
        "id": "reading-u11-l01-q03",
        "type": "multiple-choice",
        "conceptTag": "inquiry-question",
        "reviewCardId": "reading-u11-l01-c1"
      },
      {
        "id": "reading-u11-l01-q04",
        "type": "multiple-choice",
        "conceptTag": "inquiry-question",
        "reviewCardId": "reading-u11-l01-c1"
      },
      {
        "id": "reading-u11-l01-q05",
        "type": "multiple-choice",
        "conceptTag": "source-examination",
        "reviewCardId": "reading-u11-l01-c2"
      },
      {
        "id": "reading-u11-l01-q06",
        "type": "true-false",
        "conceptTag": "source-examination",
        "reviewCardId": "reading-u11-l01-c2"
      },
      {
        "id": "reading-u11-l01-q07",
        "type": "multiple-choice",
        "conceptTag": "source-examination",
        "reviewCardId": "reading-u11-l01-c2"
      },
      {
        "id": "reading-u11-l01-q08",
        "type": "multiple-choice",
        "conceptTag": "source-examination",
        "reviewCardId": "reading-u11-l01-c2"
      },
      {
        "id": "reading-u11-l01-q09",
        "type": "multiple-choice",
        "conceptTag": "inquiry-findings",
        "reviewCardId": "reading-u11-l01-c3"
      },
      {
        "id": "reading-u11-l01-q10",
        "type": "true-false",
        "conceptTag": "inquiry-findings",
        "reviewCardId": "reading-u11-l01-c3"
      },
      {
        "id": "reading-u11-l01-q11",
        "type": "sort",
        "conceptTag": "inquiry-findings",
        "reviewCardId": "reading-u11-l01-c3"
      },
      {
        "id": "reading-u11-l01-q12",
        "type": "multiple-choice",
        "conceptTag": "inquiry-findings",
        "reviewCardId": "reading-u11-l01-c3"
      },
      {
        "id": "reading-u11-l01-q13",
        "type": "multiple-choice",
        "conceptTag": "inquiry-findings",
        "reviewCardId": "reading-u11-l01-c3"
      }
    ]
  },
  {
    "id": "reading-u11-l02",
    "questions": [
      {
        "id": "reading-u11-l02-q01",
        "type": "multiple-choice",
        "conceptTag": "source-authority",
        "reviewCardId": "reading-u11-l02-c1"
      },
      {
        "id": "reading-u11-l02-q02",
        "type": "true-false",
        "conceptTag": "source-authority",
        "reviewCardId": "reading-u11-l02-c1"
      },
      {
        "id": "reading-u11-l02-q03",
        "type": "multiple-choice",
        "conceptTag": "source-authority",
        "reviewCardId": "reading-u11-l02-c1"
      },
      {
        "id": "reading-u11-l02-q04",
        "type": "multiple-choice",
        "conceptTag": "source-authority",
        "reviewCardId": "reading-u11-l02-c1"
      },
      {
        "id": "reading-u11-l02-q05",
        "type": "multiple-choice",
        "conceptTag": "source-evidence",
        "reviewCardId": "reading-u11-l02-c2"
      },
      {
        "id": "reading-u11-l02-q06",
        "type": "true-false",
        "conceptTag": "source-evidence",
        "reviewCardId": "reading-u11-l02-c2"
      },
      {
        "id": "reading-u11-l02-q07",
        "type": "multiple-choice",
        "conceptTag": "source-evidence",
        "reviewCardId": "reading-u11-l02-c2"
      },
      {
        "id": "reading-u11-l02-q08",
        "type": "multiple-choice",
        "conceptTag": "source-evidence",
        "reviewCardId": "reading-u11-l02-c2"
      },
      {
        "id": "reading-u11-l02-q09",
        "type": "multiple-choice",
        "conceptTag": "credibility-judgment",
        "reviewCardId": "reading-u11-l02-c3"
      },
      {
        "id": "reading-u11-l02-q10",
        "type": "true-false",
        "conceptTag": "credibility-judgment",
        "reviewCardId": "reading-u11-l02-c3"
      },
      {
        "id": "reading-u11-l02-q11",
        "type": "multiple-choice",
        "conceptTag": "credibility-judgment",
        "reviewCardId": "reading-u11-l02-c3"
      },
      {
        "id": "reading-u11-l02-q12",
        "type": "multiple-choice",
        "conceptTag": "credibility-judgment",
        "reviewCardId": "reading-u11-l02-c3"
      },
      {
        "id": "reading-u11-l02-q13",
        "type": "multiple-choice",
        "conceptTag": "credibility-judgment",
        "reviewCardId": "reading-u11-l02-c3"
      }
    ]
  },
  {
    "id": "reading-u11-l03",
    "questions": [
      {
        "id": "reading-u11-l03-q01",
        "type": "multiple-choice",
        "conceptTag": "relevance-test",
        "reviewCardId": "reading-u11-l03-c1"
      },
      {
        "id": "reading-u11-l03-q02",
        "type": "true-false",
        "conceptTag": "relevance-test",
        "reviewCardId": "reading-u11-l03-c1"
      },
      {
        "id": "reading-u11-l03-q03",
        "type": "multiple-choice",
        "conceptTag": "relevance-test",
        "reviewCardId": "reading-u11-l03-c1"
      },
      {
        "id": "reading-u11-l03-q04",
        "type": "multiple-choice",
        "conceptTag": "relevance-test",
        "reviewCardId": "reading-u11-l03-c1"
      },
      {
        "id": "reading-u11-l03-q05",
        "type": "multiple-choice",
        "conceptTag": "relevance-selection",
        "reviewCardId": "reading-u11-l03-c2"
      },
      {
        "id": "reading-u11-l03-q06",
        "type": "true-false",
        "conceptTag": "relevance-selection",
        "reviewCardId": "reading-u11-l03-c2"
      },
      {
        "id": "reading-u11-l03-q07",
        "type": "multiple-choice",
        "conceptTag": "relevance-selection",
        "reviewCardId": "reading-u11-l03-c2"
      },
      {
        "id": "reading-u11-l03-q08",
        "type": "multiple-choice",
        "conceptTag": "relevance-selection",
        "reviewCardId": "reading-u11-l03-c2"
      },
      {
        "id": "reading-u11-l03-q09",
        "type": "multiple-choice",
        "conceptTag": "relevance-reasoning",
        "reviewCardId": "reading-u11-l03-c3"
      },
      {
        "id": "reading-u11-l03-q10",
        "type": "true-false",
        "conceptTag": "relevance-reasoning",
        "reviewCardId": "reading-u11-l03-c3"
      },
      {
        "id": "reading-u11-l03-q11",
        "type": "multiple-choice",
        "conceptTag": "relevance-reasoning",
        "reviewCardId": "reading-u11-l03-c3"
      },
      {
        "id": "reading-u11-l03-q12",
        "type": "multiple-choice",
        "conceptTag": "relevance-reasoning",
        "reviewCardId": "reading-u11-l03-c3"
      },
      {
        "id": "reading-u11-l03-q13",
        "type": "multiple-choice",
        "conceptTag": "relevance-reasoning",
        "reviewCardId": "reading-u11-l03-c3"
      }
    ]
  },
  {
    "id": "reading-u11-l04",
    "questions": [
      {
        "id": "reading-u11-l04-q01",
        "type": "multiple-choice",
        "conceptTag": "finding-categories",
        "reviewCardId": "reading-u11-l04-c1"
      },
      {
        "id": "reading-u11-l04-q02",
        "type": "true-false",
        "conceptTag": "finding-categories",
        "reviewCardId": "reading-u11-l04-c1"
      },
      {
        "id": "reading-u11-l04-q03",
        "type": "multiple-choice",
        "conceptTag": "finding-categories",
        "reviewCardId": "reading-u11-l04-c1"
      },
      {
        "id": "reading-u11-l04-q04",
        "type": "multiple-choice",
        "conceptTag": "finding-categories",
        "reviewCardId": "reading-u11-l04-c1"
      },
      {
        "id": "reading-u11-l04-q05",
        "type": "multiple-choice",
        "conceptTag": "grouped-findings",
        "reviewCardId": "reading-u11-l04-c2"
      },
      {
        "id": "reading-u11-l04-q06",
        "type": "true-false",
        "conceptTag": "grouped-findings",
        "reviewCardId": "reading-u11-l04-c2"
      },
      {
        "id": "reading-u11-l04-q07",
        "type": "multiple-choice",
        "conceptTag": "grouped-findings",
        "reviewCardId": "reading-u11-l04-c2"
      },
      {
        "id": "reading-u11-l04-q08",
        "type": "multiple-choice",
        "conceptTag": "grouped-findings",
        "reviewCardId": "reading-u11-l04-c2"
      },
      {
        "id": "reading-u11-l04-q09",
        "type": "multiple-choice",
        "conceptTag": "group-synthesis",
        "reviewCardId": "reading-u11-l04-c3"
      },
      {
        "id": "reading-u11-l04-q10",
        "type": "true-false",
        "conceptTag": "group-synthesis",
        "reviewCardId": "reading-u11-l04-c3"
      },
      {
        "id": "reading-u11-l04-q11",
        "type": "multiple-choice",
        "conceptTag": "group-synthesis",
        "reviewCardId": "reading-u11-l04-c3"
      },
      {
        "id": "reading-u11-l04-q12",
        "type": "multiple-choice",
        "conceptTag": "group-synthesis",
        "reviewCardId": "reading-u11-l04-c3"
      },
      {
        "id": "reading-u11-l04-q13",
        "type": "multiple-choice",
        "conceptTag": "group-synthesis",
        "reviewCardId": "reading-u11-l04-c3"
      }
    ]
  },
  {
    "id": "reading-u11-l05",
    "questions": [
      {
        "id": "reading-u11-l05-q01",
        "type": "multiple-choice",
        "conceptTag": "source-use",
        "reviewCardId": "reading-u11-l05-c1"
      },
      {
        "id": "reading-u11-l05-q02",
        "type": "true-false",
        "conceptTag": "source-use",
        "reviewCardId": "reading-u11-l05-c1"
      },
      {
        "id": "reading-u11-l05-q03",
        "type": "multiple-choice",
        "conceptTag": "source-use",
        "reviewCardId": "reading-u11-l05-c1"
      },
      {
        "id": "reading-u11-l05-q04",
        "type": "fill-blank",
        "conceptTag": "source-use",
        "reviewCardId": "reading-u11-l05-c1"
      },
      {
        "id": "reading-u11-l05-q05",
        "type": "multiple-choice",
        "conceptTag": "citation-format",
        "reviewCardId": "reading-u11-l05-c2"
      },
      {
        "id": "reading-u11-l05-q06",
        "type": "true-false",
        "conceptTag": "citation-format",
        "reviewCardId": "reading-u11-l05-c2"
      },
      {
        "id": "reading-u11-l05-q07",
        "type": "multiple-choice",
        "conceptTag": "citation-format",
        "reviewCardId": "reading-u11-l05-c2"
      },
      {
        "id": "reading-u11-l05-q08",
        "type": "fill-blank",
        "conceptTag": "citation-format",
        "reviewCardId": "reading-u11-l05-c2"
      },
      {
        "id": "reading-u11-l05-q09",
        "type": "multiple-choice",
        "conceptTag": "attribution-check",
        "reviewCardId": "reading-u11-l05-c3"
      },
      {
        "id": "reading-u11-l05-q10",
        "type": "true-false",
        "conceptTag": "attribution-check",
        "reviewCardId": "reading-u11-l05-c3"
      },
      {
        "id": "reading-u11-l05-q11",
        "type": "multiple-choice",
        "conceptTag": "attribution-check",
        "reviewCardId": "reading-u11-l05-c3"
      },
      {
        "id": "reading-u11-l05-q12",
        "type": "multiple-choice",
        "conceptTag": "attribution-check",
        "reviewCardId": "reading-u11-l05-c3"
      },
      {
        "id": "reading-u11-l05-q13",
        "type": "multiple-choice",
        "conceptTag": "attribution-check",
        "reviewCardId": "reading-u11-l05-c3"
      }
    ]
  }
] as const;
const expectedChecks = [
  {
    "id": "reading-u11-l01",
    "checks": [
      {
        "cardId": "reading-u11-l01-c1",
        "check": {
          "prompt": "Which question fits this source?",
          "choices": [
            {
              "id": "a",
              "text": "What features help a schoolyard pollinator patch?"
            },
            {
              "id": "b",
              "text": "What is everything about insects?"
            },
            {
              "id": "c",
              "text": "Which exact bees visit next year?"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The packet directly supplies design features."
        }
      },
      {
        "cardId": "reading-u11-l01-c2",
        "check": {
          "prompt": "Which heading addresses blooms across months?",
          "choices": [
            {
              "id": "a",
              "text": "Flower timing"
            },
            {
              "id": "b",
              "text": "Care"
            },
            {
              "id": "c",
              "text": "Limits"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "That section states spring through early fall."
        }
      },
      {
        "cardId": "reading-u11-l01-c3",
        "check": {
          "prompt": "Which is a supported finding?",
          "choices": [
            {
              "id": "a",
              "text": "Different bloom times can extend food availability"
            },
            {
              "id": "b",
              "text": "Every pollinator species will arrive"
            },
            {
              "id": "c",
              "text": "Dirty standing water is ideal"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The source states the timing benefit and avoids guarantees."
        }
      }
    ]
  },
  {
    "id": "reading-u11-l02",
    "checks": [
      {
        "cardId": "reading-u11-l02-c1",
        "check": {
          "prompt": "Which record supplies both author and publisher?",
          "choices": [
            {
              "id": "a",
              "text": "Source B"
            },
            {
              "id": "b",
              "text": "Source A"
            },
            {
              "id": "c",
              "text": "Source C"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The record names Dr. Ortiz and Sample County Extension."
        }
      },
      {
        "cardId": "reading-u11-l02-c2",
        "check": {
          "prompt": "Which source gives checkable claims?",
          "choices": [
            {
              "id": "a",
              "text": "Source B"
            },
            {
              "id": "b",
              "text": "Source A"
            },
            {
              "id": "c",
              "text": "Source C"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Its standing-water claims can be examined."
        }
      },
      {
        "cardId": "reading-u11-l02-c3",
        "check": {
          "prompt": "Which is most credible for prevention here?",
          "choices": [
            {
              "id": "a",
              "text": "Source B"
            },
            {
              "id": "b",
              "text": "Source A because it is surprising"
            },
            {
              "id": "c",
              "text": "Source C because it says share"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It alone satisfies all four visible criteria."
        }
      }
    ]
  },
  {
    "id": "reading-u11-l03",
    "checks": [
      {
        "cardId": "reading-u11-l03-c1",
        "check": {
          "prompt": "Which detail passes the relevance test?",
          "choices": [
            {
              "id": "a",
              "text": "offer smaller first portions"
            },
            {
              "id": "b",
              "text": "school colors are blue and silver"
            },
            {
              "id": "c",
              "text": "music plays Friday"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It names an action tied to less untouched food."
        }
      },
      {
        "cardId": "reading-u11-l03-c2",
        "check": {
          "prompt": "Why is a waste audit relevant?",
          "choices": [
            {
              "id": "a",
              "text": "It identifies commonly discarded foods for action"
            },
            {
              "id": "b",
              "text": "It changes school colors"
            },
            {
              "id": "c",
              "text": "It selects music"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The measurement informs waste reduction."
        }
      },
      {
        "cardId": "reading-u11-l03-c3",
        "check": {
          "prompt": "Which explanation is complete?",
          "choices": [
            {
              "id": "a",
              "text": "Share tables may redirect approved unopened food, so they address reducing waste"
            },
            {
              "id": "b",
              "text": "Share tables are nice"
            },
            {
              "id": "c",
              "text": "Lunch is important"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It connects mechanism to question."
        }
      }
    ]
  },
  {
    "id": "reading-u11-l04",
    "checks": [
      {
        "cardId": "reading-u11-l04-c1",
        "check": {
          "prompt": "Which is a useful category?",
          "choices": [
            {
              "id": "a",
              "text": "Crossings"
            },
            {
              "id": "b",
              "text": "Things"
            },
            {
              "id": "c",
              "text": "Repaint one stripe"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It names a shared idea for three findings."
        }
      },
      {
        "cardId": "reading-u11-l04-c2",
        "check": {
          "prompt": "Where does C2 belong?",
          "choices": [
            {
              "id": "a",
              "text": "Crossings"
            },
            {
              "id": "b",
              "text": "Visibility"
            },
            {
              "id": "c",
              "text": "Travel habits"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Repainting crosswalk stripes improves a crossing."
        }
      },
      {
        "cardId": "reading-u11-l04-c3",
        "check": {
          "prompt": "What pattern unites V1–V3?",
          "choices": [
            {
              "id": "a",
              "text": "They improve visibility of signs, people, or route markings"
            },
            {
              "id": "b",
              "text": "They change crossing time"
            },
            {
              "id": "c",
              "text": "They teach bike signals only"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The synthesis covers all three."
        }
      }
    ]
  },
  {
    "id": "reading-u11-l05",
    "checks": [
      {
        "cardId": "reading-u11-l05-c1",
        "check": {
          "prompt": "Which is a faithful paraphrase?",
          "choices": [
            {
              "id": "a",
              "text": "Chen says small boxes can support bees with suitable flowers blooming at different times"
            },
            {
              "id": "b",
              "text": "A shallow window box can offer nectar when it holds several locally suitable flowers"
            },
            {
              "id": "c",
              "text": "A shallow box can offer nectar when it has several suitable flowers"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "It changes structure/wording while preserving meaning."
        }
      },
      {
        "cardId": "reading-u11-l05-c2",
        "check": {
          "prompt": "What comes after the title?",
          "choices": [
            {
              "id": "a",
              "text": "Cram All Student Science Notes"
            },
            {
              "id": "b",
              "text": "2026"
            },
            {
              "id": "c",
              "text": "Nia Chen"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "The accepted order places publisher third."
        }
      },
      {
        "cardId": "reading-u11-l05-c3",
        "check": {
          "prompt": "Does a paraphrase still need credit?",
          "choices": [
            {
              "id": "a",
              "text": "Yes, the idea came from the source"
            },
            {
              "id": "b",
              "text": "No, new wording erases the source"
            },
            {
              "id": "c",
              "text": "Only if it rhymes"
            }
          ],
          "correctChoiceId": "a",
          "explanation": "Attribution applies to borrowed ideas."
        }
      }
    ]
  }
] as const;
const expectedWidgets = [
  {
    "id": "reading-u11-l01",
    "widgets": []
  },
  {
    "id": "reading-u11-l02",
    "widgets": [
      {
        "cardId": "reading-u11-l02-c3",
        "ref": {
          "type": "source-credibility-checker",
          "config": {
            "sources": [
              {
                "id": "blog",
                "title": "Mosquito Myths Blog",
                "author": "Kai Reed",
                "date": "2024",
                "purpose": "entertain with surprising claims",
                "claims": []
              },
              {
                "id": "extension",
                "title": "County Extension Mosquito Guide",
                "author": "Dr. Lena Ortiz",
                "date": "2026",
                "publisher": "Sample County Extension",
                "purpose": "explain mosquito prevention",
                "claims": [
                  "Standing water can become mosquito habitat.",
                  "Empty small containers after rain."
                ]
              },
              {
                "id": "screenshot",
                "title": "Mystery Screenshot",
                "claims": []
              }
            ],
            "criteria": [
              "author",
              "evidence",
              "date",
              "purpose"
            ],
            "credibleIds": [
              "extension"
            ]
          }
        }
      }
    ]
  },
  {
    "id": "reading-u11-l03",
    "widgets": []
  },
  {
    "id": "reading-u11-l04",
    "widgets": []
  },
  {
    "id": "reading-u11-l05",
    "widgets": []
  }
] as const;
const expectedSources = [
  {
    "id": "reading-u11-l01",
    "passage": {
      "title": "Schoolyard Pollinator Patch: Planning Notes",
      "text": "Schoolyard Pollinator Patch: Planning Notes — invented Cram All practice source\n\nInquiry question: What features help a small schoolyard patch serve pollinators?\n\nFlower timing: Include several plant kinds so some flowers bloom in spring, summer, and early fall. A longer bloom season can provide nectar or pollen across more months.\n\nPlant choice: Native flowering plants are adapted to local conditions and can support local insects. Choose plants appropriate for the patch’s sunlight and soil.\n\nShelter and water: Leave a few hollow stems or small bare-soil areas where appropriate. A shallow water dish needs stones for landing and regular cleaning; standing dirty water is not helpful.\n\nCare: Avoid spraying broad insect killers in the patch. Remove invasive plants, water new plants as needed, and observe visitors without touching them.\n\nLimits: This source describes design features. It does not count which pollinator species will arrive or guarantee that every feature works equally at every site."
    },
    "reference": {
      "title": "Read “Schoolyard Pollinator Patch: Planning Notes”",
      "text": "Schoolyard Pollinator Patch: Planning Notes — invented Cram All practice source\n\nInquiry question: What features help a small schoolyard patch serve pollinators?\n\nFlower timing: Include several plant kinds so some flowers bloom in spring, summer, and early fall. A longer bloom season can provide nectar or pollen across more months.\n\nPlant choice: Native flowering plants are adapted to local conditions and can support local insects. Choose plants appropriate for the patch’s sunlight and soil.\n\nShelter and water: Leave a few hollow stems or small bare-soil areas where appropriate. A shallow water dish needs stones for landing and regular cleaning; standing dirty water is not helpful.\n\nCare: Avoid spraying broad insect killers in the patch. Remove invasive plants, water new plants as needed, and observe visitors without touching them.\n\nLimits: This source describes design features. It does not count which pollinator species will arrive or guarantee that every feature works equally at every site."
    },
    "evidence": [
      "Flower timing",
      "Plant choice",
      "Limits"
    ]
  },
  {
    "id": "reading-u11-l02",
    "passage": {
      "title": "Three invented Cram All practice source records",
      "text": "Three invented Cram All practice source records\n\nSource A — Mosquito Myths Blog. Author: Kai Reed. Date: 2024. Publisher: not supplied. Purpose: entertain with surprising claims. Evidence notes: none supplied. Excerpt: “My secret leaf trick chases every mosquito forever!”\n\nSource B — County Extension Mosquito Guide. Author: Dr. Lena Ortiz, entomology educator. Date: 2026. Publisher: Sample County Extension. Purpose: explain mosquito prevention. Evidence notes: cites local monitoring guidance and gives checkable actions. Claims: “Standing water can become mosquito habitat. Empty small containers after rain.”\n\nSource C — Mystery Screenshot. Author: not supplied. Date: not supplied. Publisher: not supplied. Purpose: unclear. Evidence notes: none. Excerpt: “Share this now!”\n\nThese records are invented for practice. A credible judgment uses visible authorship/publisher, evidence, date context, and purpose together. A recent date, polished screen, or official-sounding name alone is not proof."
    },
    "reference": {
      "title": "Read “Three invented Cram All practice source records”",
      "text": "Three invented Cram All practice source records\n\nSource A — Mosquito Myths Blog. Author: Kai Reed. Date: 2024. Publisher: not supplied. Purpose: entertain with surprising claims. Evidence notes: none supplied. Excerpt: “My secret leaf trick chases every mosquito forever!”\n\nSource B — County Extension Mosquito Guide. Author: Dr. Lena Ortiz, entomology educator. Date: 2026. Publisher: Sample County Extension. Purpose: explain mosquito prevention. Evidence notes: cites local monitoring guidance and gives checkable actions. Claims: “Standing water can become mosquito habitat. Empty small containers after rain.”\n\nSource C — Mystery Screenshot. Author: not supplied. Date: not supplied. Publisher: not supplied. Purpose: unclear. Evidence notes: none. Excerpt: “Share this now!”\n\nThese records are invented for practice. A credible judgment uses visible authorship/publisher, evidence, date context, and purpose together. A recent date, polished screen, or official-sounding name alone is not proof."
    },
    "evidence": [
      "Mosquito Myths Blog",
      "County Extension Mosquito Guide",
      "Mystery Screenshot"
    ]
  },
  {
    "id": "reading-u11-l03",
    "passage": {
      "title": "Reducing Cafeteria Food Waste",
      "text": "Reducing Cafeteria Food Waste — invented research notes\n\nResearch question: Which school actions can reduce cafeteria food waste?\n\nNote 1: Letting students request a smaller first portion can reduce untouched food.\nNote 2: A supervised share table may allow unopened approved items to be used by another student, following school rules.\nNote 3: Separating suitable scraps for a managed compost program can divert some waste from trash.\nNote 4: A one-week waste audit can identify which foods are discarded most often.\nNote 5: The school colors are blue and silver.\nNote 6: Music plays in the lunchroom on Fridays.\nNote 7: The mascot was chosen twenty years ago.\nNote 8: Posters can remind students which bin accepts compostable scraps.\n\nA fact can be true and still irrelevant. Relevance asks whether the information helps answer the exact topic/question, not whether the reader likes it."
    },
    "reference": {
      "title": "Read “Reducing Cafeteria Food Waste”",
      "text": "Reducing Cafeteria Food Waste — invented research notes\n\nResearch question: Which school actions can reduce cafeteria food waste?\n\nNote 1: Letting students request a smaller first portion can reduce untouched food.\nNote 2: A supervised share table may allow unopened approved items to be used by another student, following school rules.\nNote 3: Separating suitable scraps for a managed compost program can divert some waste from trash.\nNote 4: A one-week waste audit can identify which foods are discarded most often.\nNote 5: The school colors are blue and silver.\nNote 6: Music plays in the lunchroom on Fridays.\nNote 7: The mascot was chosen twenty years ago.\nNote 8: Posters can remind students which bin accepts compostable scraps.\n\nA fact can be true and still irrelevant. Relevance asks whether the information helps answer the exact topic/question, not whether the reader likes it."
    },
    "evidence": [
      "smaller first portion",
      "school colors",
      "waste audit"
    ]
  },
  {
    "id": "reading-u11-l04",
    "passage": {
      "title": "Safer Routes to School",
      "text": "Safer Routes to School — nine invented finding cards\n\nV1: Trim branches that block drivers’ view of a school-zone sign.\nV2: Add reflective material to backpacks for low-light visibility.\nV3: Use bright pavement markings near the school entrance.\nC1: A crossing guard helps students use the busiest intersection.\nC2: Repaint faded crosswalk stripes.\nC3: Adjust a signal to provide enough crossing time after an approved traffic study.\nT1: Practice a consistent walking route with an adult.\nT2: Form a supervised walking group where families choose to participate.\nT3: Review helmet fit and hand signals before biking.\n\nUseful categories: Visibility — V1/V2/V3; Crossings — C1/C2/C3; Travel habits — T1/T2/T3. Categories group shared ideas; they do not have a correct first-to-last order. A synthesis names what each group collectively suggests without erasing differences among findings."
    },
    "reference": {
      "title": "Read “Safer Routes to School”",
      "text": "Safer Routes to School — nine invented finding cards\n\nV1: Trim branches that block drivers’ view of a school-zone sign.\nV2: Add reflective material to backpacks for low-light visibility.\nV3: Use bright pavement markings near the school entrance.\nC1: A crossing guard helps students use the busiest intersection.\nC2: Repaint faded crosswalk stripes.\nC3: Adjust a signal to provide enough crossing time after an approved traffic study.\nT1: Practice a consistent walking route with an adult.\nT2: Form a supervised walking group where families choose to participate.\nT3: Review helmet fit and hand signals before biking.\n\nUseful categories: Visibility — V1/V2/V3; Crossings — C1/C2/C3; Travel habits — T1/T2/T3. Categories group shared ideas; they do not have a correct first-to-last order. A synthesis names what each group collectively suggests without erasing differences among findings."
    },
    "evidence": [
      "V1:",
      "C1:",
      "T1:"
    ]
  },
  {
    "id": "reading-u11-l05",
    "passage": {
      "title": "Window Boxes for Native Bees",
      "text": "Invented practice source — not a real publication\n\nAuthor: Nia Chen\nTitle: Window Boxes for Native Bees\nPublisher: Cram All Student Science Notes\nYear: 2026\n\nSource text: “A shallow window box can offer nectar when it holds several locally suitable flowers that bloom at different times. Gardeners should choose plants for the available sunlight and avoid spraying insect killers on the blooms. Even a small planting needs regular care.”\n\nAccepted simple citation format: Nia Chen — Window Boxes for Native Bees — Cram All Student Science Notes — 2026.\n\nA quotation copies exact words inside quotation marks and names the source. A paraphrase restates the meaning in genuinely new wording and still names the source. Changing only one or two words is patchwriting, not a faithful independent paraphrase. Citation gives readers enough supplied metadata to identify the practice source."
    },
    "reference": {
      "title": "Read “Window Boxes for Native Bees”",
      "text": "Invented practice source — not a real publication\n\nAuthor: Nia Chen\nTitle: Window Boxes for Native Bees\nPublisher: Cram All Student Science Notes\nYear: 2026\n\nSource text: “A shallow window box can offer nectar when it holds several locally suitable flowers that bloom at different times. Gardeners should choose plants for the available sunlight and avoid spraying insect killers on the blooms. Even a small planting needs regular care.”\n\nAccepted simple citation format: Nia Chen — Window Boxes for Native Bees — Cram All Student Science Notes — 2026.\n\nA quotation copies exact words inside quotation marks and names the source. A paraphrase restates the meaning in genuinely new wording and still names the source. Changing only one or two words is patchwriting, not a faithful independent paraphrase. Citation gives readers enough supplied metadata to identify the practice source."
    },
    "evidence": [
      "Nia Chen",
      "Cram All Student Science Notes",
      "not a real publication"
    ]
  }
] as const;
const expectedVisiblePriorSnippets = [
  { cardId: 'reading-u11-l01-c1', snippets: ['What features help a small schoolyard patch serve pollinators?'] },
  { cardId: 'reading-u11-l01-c2', snippets: ['The source covers flower timing, plant choice, shelter/water, care, and limits.'] },
  { cardId: 'reading-u11-l01-c3', snippets: ['Staggered blooms, suitable native plants, safe shelter/water, and careful maintenance answer the inquiry.'] },
  { cardId: 'reading-u11-l02-c1', snippets: ['Source B supplies an author role and publisher; A lacks a publisher; C lacks both.'] },
  { cardId: 'reading-u11-l02-c2', snippets: ['B gives checkable prevention actions and explanatory purpose; A entertains without evidence.'] },
  { cardId: 'reading-u11-l02-c3', snippets: ['Only B meets author, evidence, date, and purpose in the supplied exercise.'] },
  {
    cardId: 'reading-u11-l03-c1',
    snippets: [
      'Note 1: Letting students request a smaller first portion can reduce untouched food.',
      'Note 5: The school colors are blue and silver.',
      'Note 6: Music plays in the lunchroom on Fridays.',
    ],
  },
  { cardId: 'reading-u11-l03-c2', snippets: ['Note 4: A one-week waste audit can identify which foods are discarded most often.'] },
  { cardId: 'reading-u11-l03-c3', snippets: ['Note 2: A supervised share table may allow unopened approved items to be used by another student, following school rules.'] },
  { cardId: 'reading-u11-l04-c1', snippets: ['Visibility, crossings, and travel habits each fit three notes.'] },
  {
    cardId: 'reading-u11-l04-c2',
    snippets: [
      'C2: Repaint faded crosswalk stripes.',
      'Useful categories: Visibility — V1/V2/V3; Crossings — C1/C2/C3; Travel habits — T1/T2/T3.',
    ],
  },
  {
    cardId: 'reading-u11-l04-c3',
    snippets: [
      'V1: Trim branches that block drivers’ view of a school-zone sign.',
      'V2: Add reflective material to backpacks for low-light visibility.',
      'V3: Use bright pavement markings near the school entrance.',
    ],
  },
  {
    cardId: 'reading-u11-l05-c1',
    snippets: ['Source text: “A shallow window box can offer nectar when it holds several locally suitable flowers that bloom at different times.”'],
  },
  {
    cardId: 'reading-u11-l05-c2',
    snippets: [
      'Author: Nia Chen',
      'Title: Window Boxes for Native Bees',
      'Publisher: Cram All Student Science Notes',
      'Year: 2026',
    ],
  },
  { cardId: 'reading-u11-l05-c3', snippets: ['Credit is required for quotations, paraphrases, and borrowed ideas.'] },
] as const;
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase('en-US').replace(/,/g, '').trim().replace(/\s+/g, ' ');
const visible = (question: Question): readonly { id: string; text: string }[] => 'choices' in question ? question.choices : 'items' in question ? question.items : question.acceptedAnswers.map((text,index)=>({id:`accepted-${index}`,text}));

describe('Reading unit 11 literal content', () => {
  test('matches the exact manifest, OE metadata, cards, and question routes', () => {
    expectUnitLessons(unit11Lessons, expectedManifest, 'reading');
    expect(unit11Lessons.map(lesson=>({id:lesson.id,cards:lesson.learnCards.map((card,index)=>({id:card.id,title:card.title,conceptTag:expectedCards.find(row=>row.id===lesson.id)!.cards[index]!.conceptTag}))}))).toEqual(expectedCards);
    expect(unit11Lessons.map(lesson=>({id:lesson.id,questions:lesson.quiz.pool.map(({id,type,conceptTag,reviewCardId})=>({id,type,conceptTag,reviewCardId}))}))).toEqual(expectedRoutes);
    for (const lesson of unit11Lessons) expect(lesson.crossCuttingExpectationCodes).toEqual([...READING_OE_CODES]);
  });

  test('is schema-valid with exact source identity, inline checks, and widget refs', () => {
    expect(unit11Lessons.map(lesson=>({id:lesson.id,checks:lesson.learnCards.map(card=>({cardId:card.id,check:card.check}))}))).toEqual(expectedChecks);
    expect(unit11Lessons.map(lesson=>({id:lesson.id,widgets:lesson.learnCards.flatMap(card=>'widget' in card?[{cardId:card.id,ref:card.widget}]:[])}))).toEqual(expectedWidgets);
    for (const lesson of unit11Lessons) {
      expect(validateLesson(lesson)).toEqual([]);
      const source=expectedSources.find(row=>row.id===lesson.id)!;
      expect(lesson.workedExample.passage).toEqual(source.passage);
      expect(lesson.quiz.reference).toEqual(source.reference);
      expect(lesson.workedExample.passage!.text).toBe(lesson.quiz.reference!.text);
      for (const token of source.evidence) expect(source.passage.text).toContain(token);
      for (const card of lesson.learnCards) {
        expect(card.check).toBeDefined();
        expect(card.blocks.some(block=>block.text.startsWith('Support:')||block.text.startsWith('Response frame:')||block.text.startsWith('Stretch:'))).toBe(true);
        if ('widget' in card) expect(WidgetRefSchema.safeParse(card.widget).success).toBe(true);
      }
    }
  });

  test('places every source snippet needed by an inline check in its current card first', () => {
    const cards = new Map(unit11Lessons.flatMap(lesson=>lesson.learnCards.map(card=>[card.id,card] as const)));
    expect(expectedVisiblePriorSnippets).toHaveLength(15);
    for (const { cardId, snippets } of expectedVisiblePriorSnippets) {
      const card = cards.get(cardId);
      expect(card?.check).toBeDefined();
      const visiblePriorMaterial = card?.blocks.map(block=>block.text).join('\n') ?? '';
      for (const snippet of snippets) expect(visiblePriorMaterial).toContain(snippet);
    }
  });

  test('keeps exact pools, unique visible answers, balanced MC keys, and solo framing', () => {
    for (const lesson of unit11Lessons) {
      expect(lesson.quiz.passThreshold).toBe(8);
      expect(lesson.quiz.pool.map(question=>question.id)).toEqual(Array.from({length:13},(_,index)=>`${lesson.id}-q${String(index+1).padStart(2,'0')}`));
      expect(new Set(lesson.quiz.pool.map(question=>question.conceptTag)).size).toBe(3);
      for (const question of lesson.quiz.pool) {
        const options=visible(question);
        expect(new Set(options.map(option=>option.id)).size).toBe(options.length);
        expect(new Set(options.map(option=>normalize(option.text))).size).toBe(options.length);
      }
      const keys=lesson.quiz.pool.filter(question=>question.type==='multiple-choice').map(question=>question.correctChoiceId);
      const counts=new Map<string,number>(); for(const key of keys) counts.set(key,(counts.get(key)??0)+1);
      expect([...counts.keys()].sort()).toEqual(['a','b','c','d']);
      expect(Math.max(...counts.values())-Math.min(...counts.values())).toBeLessThanOrEqual(1);
      expect(JSON.stringify(lesson)).not.toMatch(/live (partner|classmate|collaboration)|recording score|words per minute score/i);
    }
  });
});
