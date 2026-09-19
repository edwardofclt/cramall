import type { UnitConnection } from '../connections';

// Original summaries of facts already taught in the reviewed Social Studies lessons.
// Each source includes the earlier idea and the later evidence needed to compare it.
export const socialStudiesConnections: UnitConnection[] = [
  {
    unitId: 'social-studies-u01',
    foundation: 'Earlier you connected colonial work with power over people. Now use contrasting sources to explain how political rules and arguments could support or challenge that power.',
    source: {
      title: 'Work, power, and two colonial arguments — authored summary',
      text: 'Enslaved people were forced to work, and enslavers used laws to maintain control. Carolina’s Lords Proprietors proposed a government plan in 1669 that protected wealthy owners and claimed broad authority for enslavers. In Boston in 1700, Samuel Sewall published an argument against slavery. He challenged buying and selling people and argued for a shared right to liberty. These records tell us what their writers supported. They do not tell us every resident’s views or prove that an argument changed the law.',
    },
    question: {
      id: 'social-studies-u01-l06-q99', type: 'multiple-choice', conceptTag: 'history-card-3', reviewCardId: 'social-studies-u01-l06-c3',
      prompt: 'A museum display connects colonial work with government power. Which caption uses both records without claiming more than they show?',
      choices: [
        { id: 'one-view', text: 'Both writers agreed that enslavers should control workers.' },
        { id: 'power-and-challenge', text: 'The Carolina plan supported enslavers’ control of labor; Sewall’s argument challenged slavery, showing disagreement about power and liberty.' },
        { id: 'ended-slavery', text: 'Sewall’s argument proves slavery ended in the colonies in 1700.' },
        { id: 'every-resident', text: 'The two records reveal exactly what every colonial resident believed.' },
      ],
      correctChoiceId: 'power-and-challenge',
      explanation: 'The earlier idea about forced labor helps explain why a government plan protecting enslavers mattered: political power could support control over work and people. Sewall argued against that system. Comparing the two records supports a claim about these writers’ disagreement, but an argument is not proof of a changed law or of everyone’s beliefs.',
    },
  },
  {
    unitId: 'social-studies-u02',
    foundation: 'You have used an author’s purpose to judge a colonial source. Apply that same habit to arguments about representation in the new nation, and consider whose voices are missing.',
    source: {
      title: 'Plans, arguments, and representation — authored summary',
      text: 'A colonial government proposal can reveal its writers’ goals without showing that every resident agreed. In the 1787 debate about the proposed U.S. Constitution, Madison argued that many different interests in a large republic could prevent one unfair group from dominating. Brutus worried that distant national leaders could overlook people’s needs. Both wrote to persuade readers. Women, enslaved people, and many Native people lacked equal influence in the approval process. These two arguments do not record all those people’s views.',
    },
    question: {
      id: 'social-studies-u02-l06-q99', type: 'multiple-choice', conceptTag: 'history-card-3', reviewCardId: 'social-studies-u02-l06-c3',
      prompt: 'A student concludes, “Because Madison and Brutus both wrote about liberty, the new government represented everyone equally.” Which revision uses the earlier source-reading habit?',
      choices: [
        { id: 'agreement', text: 'Keep the claim because writing about the same topic means the authors agreed.' },
        { id: 'outcome', text: 'Replace it with a claim that Madison’s prediction always came true.' },
        { id: 'count', text: 'Count the two arguments as a vote by every resident.' },
        { id: 'purpose-and-limits', text: 'Explain their disagreement about representation, then seek additional sources about people excluded from equal influence.' },
      ],
      correctChoiceId: 'purpose-and-limits',
      explanation: 'As with a colonial proposal, identify what each writer wanted before treating the source as evidence of an outcome. Madison and Brutus disagreed about whether a large republic would protect people’s interests. Their shared topic does not prove equal representation. Additional sources are needed to understand the experiences and views of people excluded from equal influence.',
    },
  },
  {
    unitId: 'social-studies-u03',
    foundation: 'Earlier debates asked whose interests a government would hear. Connect that question to westward expansion by comparing an official policy claim with the people affected by it.',
    source: {
      title: 'Representation and removal — authored summary',
      text: 'Debates about the new republic raised questions about whether government would represent different people’s needs. In 1830, President Andrew Jackson promoted Native removal, saying it would open land for white settlement and claiming it would benefit Native peoples. In an 1836 petition, Cherokee people protested the Treaty of New Echota. They said its signers lacked authority to speak for the nation and defended their homeland and self-government. Later records document forced removal and suffering. The president’s claim of benefit did not establish Cherokee consent.',
    },
    question: {
      id: 'social-studies-u03-l06-q99', type: 'multiple-choice', conceptTag: 'history-card-3', reviewCardId: 'social-studies-u03-l06-c3',
      prompt: 'Which explanation connects representation, territorial growth, and the evidence in these notes?',
      choices: [
        { id: 'voice-and-effects', text: 'Expansion served some settlers’ goals while threatening Cherokee land and self-government; the petition challenges the idea that officials spoke for everyone affected.' },
        { id: 'official-consent', text: 'A president’s claim of benefit proves Cherokee people freely agreed to removal.' },
        { id: 'all-agreed', text: 'The treaty’s existence proves its signers represented every Cherokee person.' },
        { id: 'no-comparison', text: 'Only the president’s view matters when judging the effects of government policy.' },
      ],
      correctChoiceId: 'voice-and-effects',
      explanation: 'The earlier question about representation helps us ask whose needs a policy served and whose voices it ignored. Jackson promoted land for settlement, while Cherokee petitioners defended their homeland and challenged the signers’ authority. Their disagreement and the later removal records show why an official promise cannot establish consent or describe all the policy’s effects.',
    },
  },
  {
    unitId: 'social-studies-u04',
    foundation: 'Earlier you connected laws about slavery with control over labor and political power. Use those connections to compare what opposing voices sought during secession and the Civil War.',
    source: {
      title: 'Labor, government, and freedom — authored summary',
      text: 'Colonial slavery forced people to work under enslavers’ control. Later disputes over slavery in new territories also concerned political power. South Carolina’s secession convention defended slavery in its 1860 declaration and objected to northern resistance to returning freedom seekers. In 1863, Frederick Douglass urged Black men to serve in Union forces as a path toward freedom and citizenship. He also pressed for equal pay and treatment. These accounts identify the convention’s goals and Douglass’s goals; neither represents every person in a region.',
    },
    question: {
      id: 'social-studies-u04-l06-q99', type: 'multiple-choice', conceptTag: 'history-card-3', reviewCardId: 'social-studies-u04-l06-c3',
      prompt: 'Which museum caption best connects earlier disputes over labor and power with these Civil War perspectives?',
      choices: [
        { id: 'unrelated', text: 'Secession and Union service had no connection to slavery or political rights.' },
        { id: 'same-goal', text: 'The convention and Douglass both sought to preserve enslavers’ control.' },
        { id: 'opposing-changes', text: 'The convention sought to protect slavery and its control of labor; Douglass connected Union service to freedom and wider citizenship rights.' },
        { id: 'whole-regions', text: 'Every South Carolinian supported the convention, and every northerner shared Douglass’s goals.' },
      ],
      correctChoiceId: 'opposing-changes',
      explanation: 'Forced labor was an economic relationship maintained through political power. The convention sought to protect that system. Douglass sought freedom and citizenship, while also challenging unequal treatment of Black soldiers. The comparison connects earlier labor and power questions to wartime goals without pretending that either voice speaks for an entire population.',
    },
  },
  {
    unitId: 'social-studies-u05',
    foundation: 'The Civil War lessons connected freedom with citizenship. Now connect those ideas to Reconstruction debates about how people could protect their homes, work, and voice in government.',
    source: {
      title: 'Making freedom secure — authored summary',
      text: 'During the Civil War, Douglass connected Black Union service with freedom and citizenship. After slavery ended, an Edisto Island committee of freedpeople petitioned in 1865 to protect their ability to buy land. They feared dependence on former enslavers if land returned to its former owners. In a reply to an earlier committee appeal, official O. O. Howard recommended leases, wages, or purchases within government policy. In 1866, Douglass argued that equal voting rights would help people protect themselves. These sources describe proposed protections, not proof that every family obtained land or equal voting access.',
    },
    question: {
      id: 'social-studies-u05-l06-q99', type: 'multiple-choice', conceptTag: 'history-card-3', reviewCardId: 'social-studies-u05-l06-c3',
      prompt: 'Which explanation best connects wartime hopes for freedom and citizenship to the Reconstruction proposals?',
      choices: [
        { id: 'finished', text: 'Ending slavery immediately guaranteed everyone secure land and equal political power.' },
        { id: 'connected-protections', text: 'Secure land could reduce dependence, and voting could help defend rights; different proposals show why making freedom secure involved more than ending slavery.' },
        { id: 'identical', text: 'The committee, Howard, and Douglass all proposed exactly the same protection.' },
        { id: 'guaranteed', text: 'The petition and essay prove every proposed protection was carried out equally everywhere.' },
      ],
      correctChoiceId: 'connected-protections',
      explanation: 'Wartime hopes for freedom and citizenship continued into questions about daily independence. The committee emphasized land and homes; Howard advised agreements within existing policy; Douglass emphasized voting power. Economic independence and political participation could support each other. The proposals show people working to secure freedom, while evidence of actual outcomes is still needed to judge what changed.',
    },
  },
];
