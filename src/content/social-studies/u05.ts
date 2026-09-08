import { historyLesson } from './authoring';

const reconstructionUrl = 'https://www.nps.gov/articles/reconstruction.htm';
const bureauUrl = 'https://www.senate.gov/artandhistory/history/common/generic/FreedmensBureau.htm';
const thirteenthUrl = 'https://www.archives.gov/milestone-documents/13th-amendment';
const fourteenthUrl = 'https://www.archives.gov/milestone-documents/14th-amendment';
const fifteenthUrl = 'https://www.archives.gov/milestone-documents/15th-amendment';
const portRoyalUrl = 'https://www.nps.gov/reer/learn/proclamation.htm';
const edistoUrl = 'https://www.freedmen.umd.edu/Edisto%20petitions.htm';
const douglassUrl = 'https://constitutioncenter.org/the-constitution/historic-document-library/detail/frederick-douglass-reconstruction-atlantic-monthly-18';

export const unit05Lessons = [
  historyLesson({
    id: 'social-studies-u05-l01', title: 'People Rebuilding Communities', indicatorCode: '4.5.CO',
    intro: 'Rebuilding after slavery and war took many kinds of work. Which groups worked together, and where did their goals clash?',
    cards: [
      {
        title: 'Freedpeople built community life',
        text: 'Reconstruction was the effort to rebuild the nation and define freedom after slavery and Civil War. Freedpeople, people formerly enslaved, searched for relatives, formed independent churches, and established schools. They negotiated work and sought land so their families could gain independence. African Americans organized meetings, petitioned government, voted when allowed, and served in office. They helped shape Reconstruction rather than simply receiving others’ plans. Community institutions gave people places to learn, worship, share resources, and work together for rights.',
        example: 'A community that raised money for a school made a choice about its future. A petition asking for land expressed what freedom needed to mean in daily life.',
        tip: 'Name a group’s action and the goal behind it. People helped create their own opportunities.',
      },
      {
        title: 'Cooperation and competing interests',
        text: 'The Freedmen’s Bureau was a federal agency created in 1865. It helped with food, medical care, labor agreements, and education. Black communities worked with northern teachers and other supporters to build schools. White southern Republicans also joined African Americans in new political coalitions, groups working together. Business leaders sought to rebuild railroads and trade. Former plantation owners wanted workers and often tried to regain control over labor. A freed family seeking independent land and an owner seeking workers could have sharply different goals.',
        example: 'Authored source comparison: Freedmen’s Bureau history describes aid and schools. An 1865 Edisto Island petition shows freedpeople asking to buy and keep land instead of depending on former enslavers.',
        tip: 'Compare cooperation as well as disagreement. A group’s birthplace alone does not explain its actions.',
      },
      {
        title: 'Different plans for the nation',
        text: 'Lincoln’s wartime Ten Percent Plan offered a route to new state governments after loyalty pledges by some voters. After Lincoln was assassinated in 1865, President Andrew Johnson allowed white-led southern governments broad control. They passed Black Codes restricting freedpeople. Radical Republicans in Congress wanted stronger protection for African American rights. Congressional Reconstruction required new governments with Black male participation. Opponents insulted northern newcomers as “carpetbaggers” and white southern Republicans as “scalawags.” These labels express hostility; they do not fairly describe every person’s motives.',
        example: 'Lincoln, Johnson, and congressional Republicans proposed different approaches. Johnson’s approach let many former leaders regain power; congressional requirements expanded Black men’s participation in rebuilding government.',
        tip: 'A hostile nickname is evidence of the speaker’s attitude, not proof about the person being named.',
      },
    ],
    activity: { type: 'history-evidence-board', config: {
      title: 'Who sought which kind of rebuilding?', prompt: 'Connect the actions to the goals they support. Then compare the roles of communities, allies, and former owners.',
      sources: [
        { id: 'freedpeople', title: 'Edisto petition, 1865 — authored summary', text: 'Freedpeople on Edisto Island asked the president to protect their ability to buy land. They argued that their work and loyalty should matter. They feared dependence on former enslavers if land was returned to its previous owners.', attribution: 'Summary of October 28, 1865 petition; Freedmen and Southern Society Project, National Archives records', url: edistoUrl },
        { id: 'bureau', title: 'Federal assistance — authored summary', text: 'Congress created the Freedmen’s Bureau in 1865 to help the transition from slavery to freedom. Its work included supplies, medical care, labor agreements, and support for schools. Communities and teachers also did essential work.', attribution: 'Summary of U.S. Senate, Freedmen’s Bureau Acts of 1865 and 1866', url: bureauUrl },
        { id: 'owners', title: 'Control of labor — authored summary', text: 'Many former plantation owners wanted a dependable labor force and sought to regain power over Black workers. Black Codes attempted to restrict freedpeople and restore plantation discipline. African Americans resisted these measures.', attribution: 'Summary of National Park Service, Reconstruction', url: reconstructionUrl },
      ],
      headings: [{ id: 'independence', label: 'Build independent community life' }, { id: 'assistance', label: 'Provide federal assistance' }, { id: 'control', label: 'Regain control over workers' }],
      cards: [
        { id: 'buy-land', text: 'Petition the president for the ability to buy and keep land.', sourceId: 'freedpeople', targetId: 'independence' },
        { id: 'families', text: 'Seek a home that does not depend on a former enslaver’s decisions.', sourceId: 'freedpeople', targetId: 'independence' },
        { id: 'aid', text: 'Offer food, care, and support for schools through a federal agency.', sourceId: 'bureau', targetId: 'assistance' },
        { id: 'codes', text: 'Use restrictive laws to recover plantation discipline.', sourceId: 'owners', targetId: 'control' },
      ],
      explain: { prompt: 'Which comparison best explains these groups’ roles?', choices: [
        { id: 'goals-differ', text: 'Freedpeople sought independence, the Bureau offered aid, and many former owners sought labor control.' },
        { id: 'all-same', text: 'All groups agreed that freedpeople should have no control over their work.' },
        { id: 'passive', text: 'Freedpeople waited silently for the other groups to decide everything.' },
      ], correctChoiceId: 'goals-differ', explanation: 'The sources show active choices, assistance, and competing goals. Reconstruction involved cooperation and conflict.' },
    } },
    coach: { intro: [
      { speaker: 'guide', text: 'Rebuilding meant different things to different groups. Let’s find the goal behind each action.', pose: 'think' },
      { speaker: 'kid', text: 'I’ll connect the details, then compare where the goals worked together or clashed.' },
    ], reactions: {
      retry: { text: 'Check who took the action. Were they seeking independence, offering aid, or trying to regain control?', pose: 'think' },
      milestone: { text: 'The board shows three roles. Use their goals to explain the relationships between the groups.', pose: 'talk' },
      complete: { text: 'You compared people’s actions and explained both support and conflict during Reconstruction.', pose: 'cheer' },
    } },
    worked: { title: 'Compare two goals about land', steps: [
      'Read the petition summary. Freedpeople sought secure land so their families could control work and home life.',
      'Read the owner summary. Many former owners wanted workers and tried to regain control over labor.',
      'Explain the difference: both cared about land and work, but one goal increased independence while the other threatened it.',
    ] },
    questions: [
      { card: 1, prompt: 'Which action shows freedpeople shaping Reconstruction?', correct: 'Organizing a school and petitioning for land.', wrong: ['Waiting without expressing any goals.', 'Restoring slaveholders’ power over their families.', 'Giving up every community institution.'], explanation: 'Freedpeople actively built schools, institutions, and political organizations and made demands for rights.' },
      { card: 1, prompt: 'Why could landownership matter to a freed family?', correct: 'It could give the family more control over work and home life.', wrong: ['It automatically guaranteed every political right.', 'It meant the family needed no resources.', 'It restored the family to slavery.'], explanation: 'Land could support independence, although it did not by itself remove all barriers.' },
      { card: 1, prompt: 'How did independent churches help communities?', correct: 'They provided places to worship, gather, and organize.', wrong: ['They ended the need for education.', 'They prevented people from sharing resources.', 'They made everyone’s goals identical.'], explanation: 'Community institutions supported worship, learning, cooperation, and work for rights.' },
      { card: 1, type: 'true-false', prompt: 'African Americans only received Reconstruction plans and never helped shape them.', correct: 'False', wrong: ['True'], explanation: 'They organized, petitioned, built schools, voted when allowed, and served in office.' },
      { card: 2, prompt: 'What role did the Freedmen’s Bureau have?', correct: 'A federal agency offered aid and supported the transition from slavery to freedom.', wrong: ['It was a private club defending slavery.', 'It replaced every Black community organization.', 'It guaranteed every family free land.'], explanation: 'The Bureau worked on food, care, labor agreements, and education, alongside people’s own efforts.' },
      { card: 2, prompt: 'Which example shows a coalition during Reconstruction?', correct: 'African Americans and white southern Republicans working together politically.', wrong: ['One person making a decision alone.', 'Every landowner refusing any discussion.', 'A school closing its doors permanently.'], explanation: 'A coalition is a group working together. Reconstruction politics included alliances across racial lines.' },
      { card: 2, prompt: 'How might a freed family’s labor goal differ from a former plantation owner’s goal?', correct: 'The family sought independence while the owner might seek control over workers.', wrong: ['Both necessarily wanted slavery restored.', 'The family wanted no say in its work.', 'The owner and family always had equal power.'], explanation: 'Freedom raised conflicts over who would control land and labor.' },
      { card: 2, prompt: 'What did business leaders seek to rebuild in the notes?', correct: 'Railroads and trade.', wrong: ['The Underground Railroad as a public train company.', 'Every slave market as an equal-rights center.', 'A government with no transportation.'], explanation: 'Business leaders had economic interests in restoring transport and trade after war damage.' },
      { card: 3, prompt: 'How did congressional Reconstruction differ from Johnson’s approach?', correct: 'Congress required stronger protections and Black male participation in new governments.', wrong: ['Congress sought to exclude all Black men from government.', 'Johnson guaranteed complete equal rights immediately.', 'Both plans banned all new state governments.'], explanation: 'Johnson allowed white-led governments broad control; Congress imposed requirements that expanded Black participation.' },
      { card: 3, prompt: 'Why are “carpetbagger” and “scalawag” not neutral descriptions?', correct: 'Opponents used them as insults against Reconstruction supporters.', wrong: ['They precisely proved every person had the same motive.', 'They were names chosen by all freed families.', 'They were amendments guaranteeing voting rights.'], explanation: 'The nicknames reveal the hostility of those using them and should not replace evidence about people’s actions.' },
      { card: 3, prompt: 'What happened after Lincoln’s assassination that affected Reconstruction?', correct: 'Andrew Johnson became president and allowed white-led southern governments broad control.', wrong: ['The Constitution stopped operating forever.', 'Every Reconstruction debate ended.', 'Freedpeople automatically received all land they requested.'], explanation: 'The change of president changed how the federal government approached rebuilding southern governments.' },
      { card: 3, type: 'true-false', prompt: 'Black Codes restricted freedpeople after slavery ended.', correct: 'True', wrong: ['False'], explanation: 'White-led southern governments used these laws to limit the freedom and work choices of African Americans.' },
      { card: 3, prompt: 'What was Lincoln’s Ten Percent Plan meant to provide?', correct: 'A route toward new state governments through loyalty pledges.', wrong: ['A rule dividing every farm into ten pieces.', 'A guarantee of land for every freed family.', 'A plan to prevent any state from rejoining national political life.'], explanation: 'Lincoln’s wartime plan connected new state governments with loyalty pledges by a portion of voters.' },
    ],
  }),
  historyLesson({
    id: 'social-studies-u05-l02', title: 'Three Changes to the Constitution', indicatorCode: '4.5.CE',
    intro: 'Three amendments changed freedom, citizenship, and voting. Let’s connect each change to its effects and its limits.',
    cards: [
      {
        title: 'Ending slavery in national law',
        text: 'An amendment is a change to the Constitution. States ratify an amendment by formally approving it. Ratified in 1865, the Thirteenth Amendment ended slavery and involuntary servitude across the United States. It kept an exception for punishment after conviction of a crime. The change ended the legal system that treated enslaved people as property. It did not give every freed family land, money, or equal treatment. Congress also passed the Civil Rights Act of 1866 to protect citizenship and basic civil rights, overriding President Johnson’s veto.',
        example: 'Authored summary of the Thirteenth Amendment: slavery could no longer be kept as an ordinary labor system. The stated punishment exception remained. Ending slavery was essential, but other rights still needed protection.',
        tip: 'Ask what a law changes and what it does not provide. Do not add promises the document never made.',
      },
      {
        title: 'Citizenship and equal protection',
        text: 'The Fourteenth Amendment was ratified in 1868. It recognized citizenship for people born or naturalized in the United States and subject to its jurisdiction. Naturalized means becoming a citizen through a legal process. This overturned the Dred Scott decision’s denial of African American citizenship. The amendment also required states to give people equal protection under law and fair legal procedures. Many Native people were still excluded from U.S. citizenship at this time. Written protections strengthened national responsibility, but officials still had to enforce them fairly.',
        example: 'Authored summary of the Fourteenth Amendment: a state could not simply deny a person equal legal protection. A constitutional rule provided a basis for challenging unfair state actions.',
        tip: 'Citizenship and equal protection are related ideas, but they are not the same as owning land or voting.',
      },
      {
        title: 'Voting rights and enforcement',
        text: 'The Fifteenth Amendment was ratified in 1870. It prohibited denying a citizen the vote because of race, color, or previous enslavement. Black men used voting and public office to help shape government. The amendment did not prohibit exclusion based on sex, so it did not secure voting rights for women. Racist threats, unfair rules, and weak enforcement still blocked many voters. Congress passed enforcement laws to protect rights. Written amendments changed the nation’s basic law, while making those protections real required continuing action.',
        example: 'Compare the three changes: the Thirteenth addressed slavery; the Fourteenth addressed citizenship and legal protection; the Fifteenth addressed racial barriers to voting. None automatically produced equal treatment in every community.',
        tip: 'A right written in law and a person’s ability to use it safely can differ.',
      },
    ],
    activity: { type: 'history-cause-effect', config: {
      title: 'Connect each amendment to its protection', prompt: 'Match the legal changes to their effects. Then explain why written protections still needed enforcement.',
      sources: [
        { id: 'thirteenth', title: 'Thirteenth Amendment, 1865 — authored summary', text: 'This amendment ended slavery and involuntary servitude nationwide, except as punishment after conviction of a crime. It did not distribute land or guarantee every other right.', attribution: 'Summary of the amendment text, National Archives', url: thirteenthUrl },
        { id: 'fourteenth', title: 'Fourteenth Amendment, 1868 — authored summary', text: 'This amendment recognized citizenship for people born or naturalized in the United States and subject to its jurisdiction. It required states to provide equal protection and fair legal procedures.', attribution: 'Summary of the amendment text, National Archives', url: fourteenthUrl },
        { id: 'fifteenth', title: 'Fifteenth Amendment, 1870 — authored summary', text: 'This amendment prohibited denying citizens the vote because of race, color, or previous enslavement. It did not prohibit voting exclusion based on sex. Threats and unfair practices still prevented many Black people from using their rights.', attribution: 'Summary of the amendment and its historical context, National Archives', url: fifteenthUrl },
      ],
      causes: [
        { id: 'end-slavery', text: 'The Constitution prohibits slavery, with the stated punishment exception.' },
        { id: 'protect-persons', text: 'The Constitution defines citizenship and requires equal legal protection.' },
        { id: 'protect-votes', text: 'The Constitution prohibits racial reasons for denying citizens the vote.' },
      ],
      effects: [
        { id: 'labor-status', text: 'Slavery can no longer be maintained as an ordinary labor system.', sourceId: 'thirteenth', causeId: 'end-slavery' },
        { id: 'legal-status', text: 'African American citizenship gains constitutional protection, and states must protect people equally.', sourceId: 'fourteenth', causeId: 'protect-persons' },
        { id: 'voting-status', text: 'Black men’s voting rights gain protection against racial exclusion.', sourceId: 'fifteenth', causeId: 'protect-votes' },
      ],
      explain: { prompt: 'Why did people still need to work for rights after the amendments?', choices: [
        { id: 'enforce', text: 'People and officials could violate written protections, so fair enforcement remained necessary.' },
        { id: 'no-change', text: 'None of the amendments changed the Constitution.' },
        { id: 'all-rights', text: 'The amendments gave everyone land and ended every unfair practice immediately.' },
      ], correctChoiceId: 'enforce', explanation: 'The amendments created lasting legal protections. Racist barriers and unequal treatment still had to be challenged.' },
    } },
    coach: { intro: [
      { speaker: 'guide', text: 'These amendments protected different parts of freedom. Let’s connect each rule to what it changed.', pose: 'talk' },
      { speaker: 'kid', text: 'I’ll match the protections, then explain why people still needed enforcement.' },
    ], reactions: {
      retry: { text: 'Look for the rule’s subject: slavery, citizenship and legal protection, or voting. Match that subject to the effect.', pose: 'think' },
      milestone: { text: 'Your connections show three legal gains. Now compare those gains with the barriers described in the sources.', pose: 'talk' },
      complete: { text: 'You explained the amendments’ different effects and why rights still needed protection in daily life.', pose: 'cheer' },
    } },
    worked: { title: 'Do not confuse related rights', steps: [
      'Read a claim: “The Thirteenth Amendment gave everyone the vote.” Find what that amendment actually addressed: slavery.',
      'Read the Fifteenth Amendment summary. It addresses denying citizens a vote because of race, color, or previous enslavement.',
      'Correct the claim: the amendments protected different rights, and voting protections still needed fair enforcement.',
    ] },
    questions: [
      { card: 1, prompt: 'What did the Thirteenth Amendment most directly change?', correct: 'It ended slavery nationwide, with a punishment exception after conviction.', wrong: ['It gave every freed family a farm.', 'It guaranteed every woman the vote.', 'It returned slavery to northern states.'], explanation: 'The amendment abolished slavery and involuntary servitude except as punishment after conviction of a crime.' },
      { card: 1, prompt: 'Why is “the Thirteenth Amendment solved every problem” unsupported?', correct: 'It did not guarantee land, money, or equal treatment.', wrong: ['It never changed slavery’s legal status.', 'It only applied to one South Carolina island.', 'It was simply a railroad law.'], explanation: 'Abolition was a major change, but the amendment did not supply every resource or secure every other right.' },
      { card: 1, prompt: 'What does it mean that states ratified an amendment?', correct: 'They formally approved the constitutional change.', wrong: ['They erased it before considering it.', 'They treated it as a private family rule.', 'They changed every state border.'], explanation: 'Ratification is the formal approval needed for a proposed amendment to become part of the Constitution.' },
      { card: 1, type: 'true-false', prompt: 'Congress passed the Civil Rights Act of 1866 despite President Johnson’s veto.', correct: 'True', wrong: ['False'], explanation: 'Congress overrode the veto and passed protections for citizenship and basic civil rights.' },
      { card: 2, prompt: 'Which protection belongs to the Fourteenth Amendment?', correct: 'Citizenship rules and equal protection under law.', wrong: ['A free farm for every citizen.', 'A rule restoring forced plantation labor.', 'A guarantee that every person will become wealthy.'], explanation: 'The amendment protects citizenship, equal protection, and fair legal procedures.' },
      { card: 2, prompt: 'How did the Fourteenth Amendment change the rule behind the Dred Scott decision?', correct: 'It protected African American citizenship instead of denying it.', wrong: ['It repeated the denial of all African American citizenship.', 'It restored the Confederacy as a separate nation.', 'It ended citizenship for everyone.'], explanation: 'Its citizenship provision overturned the Dred Scott decision’s denial of African American citizenship.' },
      { card: 2, prompt: 'What does naturalized mean in the citizenship notes?', correct: 'Becoming a citizen through a legal process.', wrong: ['Being elected governor automatically.', 'Receiving land without applying.', 'Living without any government or laws.'], explanation: 'Naturalization is a legal path to citizenship for someone not already a citizen by birth.' },
      { card: 2, prompt: 'Why should we avoid claiming the Fourteenth Amendment immediately made every Native person a U.S. citizen?', correct: 'Many Native people were still excluded from U.S. citizenship at that time.', wrong: ['Native communities had disappeared.', 'No citizenship rules were written in the amendment.', 'The amendment only discussed railroad routes.'], explanation: 'The notes name the jurisdiction condition and the historical exclusion of many Native people.' },
      { card: 3, prompt: 'What denial did the Fifteenth Amendment prohibit?', correct: 'Denying citizens the vote because of race, color, or previous enslavement.', wrong: ['Denying every citizen a government-owned farm.', 'Refusing to let children hold the presidency.', 'Requiring every person to become a soldier.'], explanation: 'The Fifteenth Amendment addressed racial exclusion from voting.' },
      { card: 3, prompt: 'Why did the Fifteenth Amendment not secure voting rights for women?', correct: 'It did not prohibit voting exclusion based on sex.', wrong: ['It banned every woman from all citizenship.', 'It only changed the definition of land.', 'It required women to give up education.'], explanation: 'The amendment targeted race, color, and previous enslavement as reasons for exclusion; it did not address sex.' },
      { card: 3, prompt: 'How could a written voting protection fail in daily practice?', correct: 'Threats, unfair rules, or weak enforcement could still prevent people from voting.', wrong: ['Everyone always obeyed every law fairly.', 'Having a right erased all racist hostility.', 'A constitutional amendment automatically provided protection at every polling place.'], explanation: 'Rights needed action and enforcement because people could violate or evade the protections.' },
      { card: 3, type: 'true-false', prompt: 'Black men used voting and public office to shape government during Reconstruction.', correct: 'True', wrong: ['False'], explanation: 'Political participation was a real gain, even though discrimination and barriers continued.' },
      { card: 3, prompt: 'Which comparison correctly connects the three amendments?', correct: 'Thirteenth: slavery; Fourteenth: citizenship and legal protection; Fifteenth: racial voting barriers.', wrong: ['All three gave every person the same amount of land.', 'All three dealt only with military uniforms.', 'Thirteenth: voting; Fourteenth: factories; Fifteenth: ocean trade.'], explanation: 'The amendments addressed distinct but connected parts of freedom and rights.' },
    ],
  }),
  historyLesson({
    id: 'social-studies-u05-l03', title: 'A Turning Point After War', indicatorCode: '4.5.P',
    intro: 'Reconstruction changed work and who could take part in government. What makes this period a turning point?',
    cards: [
      {
        title: 'A new labor system with hard limits',
        text: 'The end of slavery changed the legal basis of work. Freedpeople could seek wages, negotiate agreements, and try to acquire land. Many lacked land and money because slavery had denied them payment for their labor. Some became sharecroppers: they farmed another person’s land in return for part of the crop. Supplies bought on credit could leave families owing debts after harvest. Sharecropping differed from slavery, but unfair contracts and debt limited independence. Freedom opened choices without giving everyone equal power to bargain.',
        example: 'Authored labor summary: a sharecropper gave the landowner part of the harvest. If the family also owed for seeds and supplies, little might remain. This describes a labor system, not a budgeting game.',
        tip: 'Compare legal freedom with practical control over land, work, and income.',
      },
      {
        title: 'Government participation expanded',
        text: 'Reconstruction brought greater federal involvement in protecting rights. The Reconstruction Acts of 1867 required new governments in former Confederate states under military supervision, except Tennessee. Black men could take part in selecting these governments. African Americans joined white allies in Republican coalitions and served in office. South Carolina adopted a new constitution in 1868. New governments supported public schools and rebuilt infrastructure, such as roads and railroads. This political realignment changed who held power and whose needs government was expected to serve.',
        example: 'Authored sequence: 1865 — slavery ends nationwide through the Thirteenth Amendment; 1867 — congressional Reconstruction expands Black male participation; 1868 — South Carolina adopts a new constitution.',
        tip: 'A turning point is a development that changes the direction of events. Explain what changes, not only the date.',
      },
      {
        title: 'A turning point did not end the struggle',
        text: 'Many former Confederate leaders and their supporters resisted this new political order. Violence and racist intimidation threatened Black voters and officeholders. After the disputed election of 1876, federal troops stopped supporting the remaining Reconstruction state governments in 1877. White Democrats regained control in South Carolina and other southern states. Federal protection weakened, and restrictions grew. The constitutional amendments remained in place. African Americans continued organizing through families, schools, churches, and public action. Reconstruction changed the nation’s direction even though many promises were denied in practice.',
        example: 'Compare change and reversal: expanded political participation brought new leaders, but violence and reduced federal protection helped opponents regain power. That reversal did not erase every institution or constitutional right.',
        tip: 'A period can contain progress and setbacks. Explain both without treating its ending as the end of all action.',
      },
    ],
    activity: { type: 'history-timeline', config: {
      title: 'Work, government, and a reversal', prompt: 'Place the turning points in order. Then explain why Reconstruction changed American history despite its setbacks.',
      sources: [
        { id: 'freedom', title: 'A changed legal labor system — authored summary', text: 'The Thirteenth Amendment abolished slavery nationwide in 1865, with an exception for punishment after conviction of a crime. Freedpeople sought wages, land, and control over work. Many still faced unequal resources.', attribution: 'Summary of National Archives, Thirteenth Amendment', url: thirteenthUrl },
        { id: 'government', title: 'Congressional Reconstruction — authored summary', text: 'The 1867 Reconstruction Acts required new governments with Black male participation. South Carolina adopted a constitution in 1868. African American and white Republican allies changed government and supported public schools.', attribution: 'Summary of National Park Service, Reconstruction', url: reconstructionUrl },
        { id: 'withdrawal', title: 'A political reversal — authored summary', text: 'In 1877, federal troops stopped sustaining the remaining Reconstruction state governments. Opponents gained power, weakening protection of Black rights. The constitutional amendments and community organizations continued.', attribution: 'Summary of National Park Service, Reconstruction Era monument history', url: portRoyalUrl },
      ],
      events: [
        { id: 'abolition', title: 'Slavery abolished nationwide', year: 1865, detail: 'Legal freedom changes the basis of labor, with a punishment exception.', sourceId: 'freedom' },
        { id: 'acts', title: 'Reconstruction Acts', year: 1867, detail: 'Federal requirements expand Black men’s part in creating governments.', sourceId: 'government' },
        { id: 'constitution', title: 'New South Carolina constitution', year: 1868, detail: 'The state creates a broader political order and supports public schools.', sourceId: 'government' },
        { id: 'protection', title: 'Federal support for remaining governments ends', year: 1877, detail: 'Opponents regain power as federal protection weakens.', sourceId: 'withdrawal' },
      ], correctOrder: ['abolition', 'acts', 'constitution', 'protection'],
      explain: { prompt: 'Why is Reconstruction a turning point rather than simply a return to before the war?', choices: [
        { id: 'new-order', text: 'Slavery ended and political participation expanded, even though later barriers limited those gains.' },
        { id: 'unchanged', text: 'Work and government remained exactly the same as under slavery.' },
        { id: 'no-setbacks', text: 'Every new right was protected equally from then on.' },
      ], correctChoiceId: 'new-order', explanation: 'The period changed labor, citizenship, and political power. Setbacks limited those changes without making the period meaningless.' },
    } },
    coach: { intro: [
      { speaker: 'guide', text: 'This timeline includes new opportunities and a reversal. Let’s explain the direction of change.', pose: 'think' },
      { speaker: 'kid', text: 'I’ll order the evidence and compare work and government before and after these turning points.' },
    ], reactions: {
      retry: { text: 'Compare the dates, then ask which change in work or government had already happened.', pose: 'think' },
      milestone: { text: 'The sequence is built. Look across the events to explain what changed and what protection weakened.', pose: 'talk' },
      complete: { text: 'You explained Reconstruction’s new labor and political order while recognizing its setbacks.', pose: 'cheer' },
    } },
    worked: { title: 'Explain a period’s significance', steps: [
      'Compare work before and after abolition: forced labor under slavery ended, and people pursued wages and land.',
      'Compare political power: Black men gained opportunities to vote and serve in the new governments.',
      'Add a limit: debt, racist opposition, and reduced federal protection restricted those gains. The changes still made Reconstruction a turning point.',
    ] },
    questions: [
      { card: 1, prompt: 'What is sharecropping?', correct: 'Farming someone else’s land in exchange for part of the crop.', wrong: ['Receiving an entire farm free with every citizenship paper.', 'Working in a factory only for the government.', 'A rule giving all harvests equally to every household.'], explanation: 'Sharecroppers paid for use of land with a portion of what they grew.' },
      { card: 1, prompt: 'How could buying supplies on credit limit a sharecropping family’s independence?', correct: 'Debts could remain after the harvest was divided.', wrong: ['Credit guaranteed the family would never owe money.', 'The landowner automatically gave the family ownership.', 'Seeds and tools never had any cost.'], explanation: 'If crop income did not cover debts for supplies, a family could remain dependent and owe more.' },
      { card: 1, prompt: 'Why did legal freedom not give every family equal bargaining power?', correct: 'Many freed families lacked land and money after generations of unpaid forced labor.', wrong: ['Every family started with the same resources.', 'The amendment distributed all plantations equally.', 'Slavery had paid all workers fair wages.'], explanation: 'Ending slavery changed legal status, but unequal resources limited practical choices.' },
      { card: 1, type: 'true-false', prompt: 'Sharecropping and slavery were identical legal systems.', correct: 'False', wrong: ['True'], explanation: 'Slavery denied legal freedom. Sharecropping was a different labor arrangement, although debt and unfair contracts could restrict independence.' },
      { card: 2, prompt: 'What made the Reconstruction Acts a political turning point?', correct: 'They required new governments with Black male participation under federal supervision.', wrong: ['They restored slavery in every former Confederate state.', 'They ended all public schools.', 'They made politics exactly the same as before the war.'], explanation: 'The acts expanded participation and increased federal responsibility in rebuilding southern governments.' },
      { card: 2, prompt: 'What does political realignment mean in this lesson?', correct: 'A change in who held power and worked together in government.', wrong: ['Moving a railroad track a few feet.', 'Giving every person the same job.', 'Placing every town on a different map.'], explanation: 'African American and white Republican allies formed new coalitions and reshaped southern governments.' },
      { card: 2, prompt: 'Why were public schools part of the new governments’ work?', correct: 'Government was expected to serve broader community needs, including education.', wrong: ['Education had become unnecessary after emancipation.', 'Schools automatically removed every unequal condition.', 'Only railroad owners were allowed to learn.'], explanation: 'The expansion of government responsibilities included public education and rebuilding infrastructure.' },
      { card: 2, prompt: 'Which explanation shows why 1868 mattered beyond its place on a timeline?', correct: 'South Carolina’s new constitution helped establish a broader political order.', wrong: ['The number itself caused every person to agree.', 'It was the year all political action permanently stopped.', 'It proved earlier events never affected later conditions.'], explanation: 'A turning point matters because of what changed, not simply because it has a date.' },
      { card: 3, prompt: 'What changed when federal support for the remaining Reconstruction governments ended in 1877?', correct: 'Protection weakened and opponents of Reconstruction regained power.', wrong: ['The Thirteenth Amendment was automatically erased.', 'All African American organizations disappeared.', 'Every voter became equally safe.'], explanation: 'Reduced federal support helped opponents regain state power and impose further restrictions.' },
      { card: 3, prompt: 'Which condition threatened Black political participation during Reconstruction?', correct: 'Racist intimidation and violence against voters and officeholders.', wrong: ['Equal access to safe voting.', 'A community opening its own school.', 'People reading constitutional protections.'], explanation: 'Threats and violence were used to keep Black citizens and their allies from exercising political power.' },
      { card: 3, prompt: 'What continued after the political reversal?', correct: 'The amendments and African American community organizing.', wrong: ['Slavery as the same legal system across the South.', 'Perfect protection for every right.', 'A complete end to all schools and churches.'], explanation: 'The constitutional changes remained and people continued working through institutions and public action.' },
      { card: 3, type: 'true-false', prompt: 'A turning point can include major gains followed by setbacks.', correct: 'True', wrong: ['False'], explanation: 'Reconstruction changed labor and politics, but opposition and reduced enforcement limited the gains.' },
      { card: 3, prompt: 'Which conclusion best summarizes Reconstruction as a turning point?', correct: 'It expanded freedom and participation, while the struggle to protect them continued.', wrong: ['It made every condition identical to life before the war.', 'It guaranteed that racism ended forever.', 'It changed only the names of political leaders.'], explanation: 'The period reshaped the nation’s laws and institutions, even though freedom’s promises were not fully realized.' },
    ],
  }),
  historyLesson({
    id: 'social-studies-u05-l04', title: 'Rebuilding South Carolina', indicatorCode: '4.5.CX',
    intro: 'South Carolina’s rebuilding began before the war ended. Let’s connect Sea Island communities and a new state constitution.',
    cards: [
      {
        title: 'Port Royal opened an early path',
        text: 'Union forces took Port Royal Sound in November 1861. Many white plantation owners fled, while thousands of African Americans remained. The Port Royal Experiment was an effort to organize education, paid work, and life after slavery in the Sea Islands. Freedpeople made decisions, built institutions, and worked with teachers and federal officials. Penn School began on St. Helena Island in 1862. Some families saved money and bought land. Others faced uncertain pay or lost access to land. The experience offered opportunities without solving every problem.',
        example: 'Authored summary of National Park Service history: the Beaufort and Sea Islands area became an early setting for paid labor, Black community schools, and landownership while war continued elsewhere.',
        tip: '“Experiment” here names a historical effort to organize change. It was people’s real lives, not an app simulation.',
      },
      {
        title: 'A constitution for a different state',
        text: 'A constitution sets the basic rules for government. South Carolina’s 1865 government had restricted freedpeople through Black Codes. Under congressional Reconstruction, Black and white delegates met in Charleston to write a new constitution in 1868. Robert Smalls helped advocate public education. The document removed race as a barrier to male voting and called for a statewide system of free public schools. Columbia remained the state capital where lawmakers worked. These changes linked local demands for learning and participation to rules for the whole state.',
        example: 'Authored geographic summary: Penn School served learners near Beaufort on the coast. The 1868 convention met in Charleston, another coastal city. State government in inland Columbia carried responsibilities for people across South Carolina.',
        tip: 'Distinguish the place where a document was written from the places its rules were intended to serve.',
      },
      {
        title: 'Promises met difficult conditions',
        text: 'Rebuilding South Carolina required money, workers, and safe political participation. War damage and poverty made schools, farms, and transport hard to rebuild. Many freed families worked for wages or sharecropped because they lacked land. Schools needed buildings, teachers, and funding before all children could attend. Republican Governor Daniel Chamberlain’s administration faced fierce opposition and the disputed election of 1876. Racist intimidation threatened Black voters and Republican supporters. In 1877, federal support for the remaining Reconstruction government ended. Community organizing and the demand for education continued.',
        example: 'A constitution could promise public education before enough classrooms existed. Freedpeople, teachers, lawmakers, and families still had to build and support schools. A legal promise needed resources and protection.',
        tip: 'Connect four conditions: the economy, work, government, and community life. None changed in isolation.',
      },
    ],
    activity: { type: 'history-map', config: {
      title: 'Connect local change to statewide rebuilding', prompt: 'Attach the sourced details to the places. This north-up schematic is not to scale; compare the local and statewide roles.',
      mapKind: 'south-carolina', period: 'South Carolina, 1861–1877 — schematic, not to scale',
      sources: [
        { id: 'sea-islands', title: 'Port Royal and schools — authored summary', text: 'Union control of Port Royal Sound in 1861 created an early setting for life after slavery near Beaufort. Penn School began on nearby St. Helena Island in 1862. Freedpeople helped shape education, paid work, and landownership.', attribution: 'Summary of National Park Service, Reconstruction Era monument history', url: portRoyalUrl },
        { id: 'constitution', title: 'A statewide constitution — authored summary', text: 'Delegates met in Charleston in 1868. The new constitution protected Black men’s participation and required a system of free public schools. Columbia, the inland state capital, remained the center of lawmaking for the whole state.', attribution: 'Summary of South Carolina Encyclopedia, Constitutions, and National Park Service history', url: 'https://www.scencyclopedia.org/sce/entries/constitutions/' },
      ],
      locations: [
        { id: 'beaufort-islands', label: 'Beaufort and Sea Islands', x: 52, y: 86, detail: 'Southern coast: Port Royal Sound and nearby St. Helena Island.', sourceId: 'sea-islands' },
        { id: 'charleston', label: 'Charleston', x: 70, y: 72, detail: 'Coastal city northeast of Beaufort; site of the 1868 convention.', sourceId: 'constitution' },
        { id: 'columbia', label: 'Columbia', x: 50, y: 48, detail: 'Inland state capital, northwest of Charleston; home of state lawmaking.', sourceId: 'constitution' },
      ],
      cards: [
        { id: 'port-royal', text: 'Union control creates an early setting for paid work and life after slavery.', sourceId: 'sea-islands', locationId: 'beaufort-islands' },
        { id: 'penn-school', text: 'Penn School begins on nearby St. Helena Island in 1862.', sourceId: 'sea-islands', locationId: 'beaufort-islands' },
        { id: 'delegates', text: 'Black and white delegates meet here to write the 1868 constitution.', sourceId: 'constitution', locationId: 'charleston' },
        { id: 'lawmakers', text: 'State lawmakers work in the inland capital on responsibilities reaching the whole state.', sourceId: 'constitution', locationId: 'columbia' },
      ],
      explain: { prompt: 'How did the places have different but connected roles?', choices: [
        { id: 'local-state', text: 'Sea Island communities built local opportunities, while the convention and state government shaped statewide rules.' },
        { id: 'one-place', text: 'Every Reconstruction event happened in one building in Columbia.' },
        { id: 'no-link', text: 'The public-school promise had no connection to communities seeking education.' },
      ], correctChoiceId: 'local-state', explanation: 'Local efforts near Beaufort and changes to state government addressed connected needs for learning, work, and participation.' },
    } },
    coach: { intro: [
      { speaker: 'guide', text: 'Our schematic separates coastal communities from the inland capital. Let’s connect the places to their roles.', pose: 'talk' },
      { speaker: 'kid', text: 'I’ll attach each detail and compare local efforts with changes meant for the whole state.' },
    ], reactions: {
      retry: { text: 'Check whether the source describes the Sea Islands, the convention’s meeting city, or the inland capital.', pose: 'think' },
      milestone: { text: 'Your map connects each place to an action. Now explain how community needs and state rules related.', pose: 'talk' },
      complete: { text: 'You connected South Carolina’s local experiences to the wider work of Reconstruction.', pose: 'cheer' },
    } },
    worked: { title: 'Connect a local school to a statewide promise', steps: [
      'Find Penn School near Beaufort and the Sea Islands. It began meeting a community’s demand for education in 1862.',
      'Find Charleston, where delegates wrote the 1868 constitution. Its public-school provisions applied across South Carolina.',
      'Explain the connection: local efforts showed the demand for learning, while statewide rules made education a responsibility of government.',
    ] },
    questions: [
      { card: 1, prompt: 'Why did the Port Royal area become an early setting for Reconstruction?', correct: 'Union control opened opportunities for life after slavery while the war continued.', wrong: ['The Civil War never affected the area.', 'Every former owner stayed and gave up all control willingly.', 'It was the only place in the country with people who wanted education.'], explanation: 'Union forces took Port Royal Sound in 1861, creating new conditions for freedom, education, and paid work.' },
      { card: 1, prompt: 'What did the Port Royal Experiment involve?', correct: 'Education, paid work, and organizing life after slavery.', wrong: ['An app proving history through a simulation.', 'A plan to restore all people to forced labor.', 'A game about buying and selling people.'], explanation: 'The term names a real historical effort involving people’s work, education, and freedom.' },
      { card: 1, prompt: 'How did freedpeople participate in the Port Royal changes?', correct: 'They built institutions, made decisions, worked, and sometimes bought land.', wrong: ['They had no goals and made no decisions.', 'They all received equal amounts of land automatically.', 'They refused all learning because freedom ended its usefulness.'], explanation: 'Freedpeople were active in shaping community life and pursuing resources and education.' },
      { card: 1, type: 'true-false', prompt: 'Every family in the Port Royal Experiment immediately gained secure land and fair pay.', correct: 'False', wrong: ['True'], explanation: 'Some families bought land, while others faced uncertain work or lost access to land.' },
      { card: 2, prompt: 'How did the 1868 constitution change South Carolina’s approach to education?', correct: 'It called for a statewide system of free public schools.', wrong: ['It required all schools to close.', 'It limited all learning to plantation owners.', 'It made education only a private concern with no state role.'], explanation: 'The constitution made public education a responsibility reaching children across the state.' },
      { card: 2, prompt: 'Why does the lesson distinguish Charleston from Columbia?', correct: 'The convention met in Charleston, while Columbia remained the state capital.', wrong: ['Both names referred to St. Helena Island.', 'Columbia was an ocean port south of Beaufort.', 'Charleston and Columbia were the same city.'], explanation: 'Different places had different roles: writing the constitution and carrying out state lawmaking.' },
      { card: 2, prompt: 'Which change challenged South Carolina’s earlier Black Codes?', correct: 'A new constitution removed race as a barrier to male voting.', wrong: ['The new constitution expanded all Black Code restrictions.', 'All freedpeople lost the chance to take part in government.', 'State government stopped writing rules.'], explanation: 'The 1868 constitution expanded Black men’s political participation after the restrictive 1865 government.' },
      { card: 2, prompt: 'How did Robert Smalls connect community needs to government?', correct: 'He advocated public education during the creation of the new constitution.', wrong: ['He argued that no child needed schooling.', 'He moved the state capital to St. Helena Island.', 'He required former enslavers to control every school.'], explanation: 'Smalls supported education as part of the new state government’s responsibilities.' },
      { card: 3, prompt: 'Why could a public-school promise take time to reach every child?', correct: 'Schools needed buildings, teachers, and funding.', wrong: ['A written rule instantly creates classrooms.', 'Families had no interest in learning.', 'There were no economic effects from the war.'], explanation: 'A legal promise needed resources and work to become available in communities.' },
      { card: 3, prompt: 'How did poverty affect work choices during Reconstruction?', correct: 'Families without land often had to seek wages or sharecrop.', wrong: ['Every family could buy a farm immediately.', 'Lack of money gave everyone equal bargaining power.', 'No one needed seeds, tools, or shelter.'], explanation: 'Limited resources constrained choices even after people were legally free from slavery.' },
      { card: 3, prompt: 'What does the opposition facing Chamberlain’s administration show about Reconstruction?', correct: 'Government changes faced fierce conflict and threats to political participation.', wrong: ['Every group peacefully agreed on equal rights.', 'South Carolina had no disputed elections.', 'The political struggle ended as soon as schools opened.'], explanation: 'The disputed 1876 election and intimidation reflected serious conflict over the new political order.' },
      { card: 3, type: 'true-false', prompt: 'Education and community organizing stopped everywhere when federal support weakened in 1877.', correct: 'False', wrong: ['True'], explanation: 'African American communities continued organizing and demanding education despite setbacks.' },
      { card: 3, prompt: 'Which explanation best connects a law with the conditions needed to carry it out?', correct: 'A school law needed funding, teachers, buildings, and protection of participation.', wrong: ['A school law alone solved every economic and political problem.', 'Community work had no connection to public policy.', 'Political safety could never affect rebuilding.'], explanation: 'Economic resources, work, government, and community life were linked during Reconstruction.' },
    ],
  }),
  historyLesson({
    id: 'social-studies-u05-l05', title: 'New Rights, Unfair Barriers', indicatorCode: '4.5.CC',
    intro: 'A right could be written into law and still be blocked. Let’s compare gains, barriers, and people’s responses over time.',
    cards: [
      {
        title: 'Abolition and new restrictions',
        text: 'The Thirteenth Amendment ended slavery in 1865, with an exception for punishment after conviction of a crime. Freedpeople sought control over work, movement, and family life. Southern governments passed Black Codes to restrict those choices. Some rules forced Black workers into unfair labor contracts or punished people for being without work. These laws tried to preserve plantation control after slavery ended. The Civil Rights Act of 1866 and Fourteenth Amendment of 1868 strengthened legal protections. A change in status did not stop efforts to limit freedom.',
        example: 'Authored comparison: abolition ended the legal ownership of people, while Black Codes tried to keep control over their labor and movement. Federal civil-rights protections challenged those restrictions.',
        tip: 'Compare a gain with the restriction responding to it. Explain whose choices were affected.',
      },
      {
        title: 'Voting gains faced organized resistance',
        text: 'The Fifteenth Amendment protected voting against racial exclusion in 1870. African American men voted and held public office. White supremacist groups, including the Ku Klux Klan and South Carolina’s Red Shirts, used threats and violence to suppress Black participation. White supremacy is the racist belief that white people should rule others. Congress passed enforcement laws against political violence. Groups calling themselves “Redeemers” sought to end Reconstruction governments and restore white Democratic control. Their name described their own claim, not a rescue shared by everyone.',
        example: 'A protected vote could still be dangerous to cast if someone threatened the voter. Enforcement and community organization were necessary because written rights did not enforce themselves.',
        tip: 'Describe intimidation directly, without graphic details. The responsibility lies with those who threaten or deny rights.',
      },
      {
        title: 'Resistance and lasting foundations',
        text: 'Federal support for the remaining Reconstruction state governments ended in 1877. Restrictions on African Americans grew as opponents gained power. Later Jim Crow laws required segregation, or enforced separation by race, especially in the decades after Reconstruction. The full system did not appear all at once in 1877. African Americans continued building schools, churches, businesses, and political organizations. They challenged unfair treatment and defended constitutional rights. These institutions and the Reconstruction amendments became foundations for later civil-rights struggles. Setbacks were real, but people did not stop acting.',
        example: 'Change: slavery ended and citizenship gained constitutional protection. Continuity: racism and unequal treatment persisted. Response: people organized to defend the meaning of freedom in daily life.',
        tip: 'A careful account includes rights, barriers, and people’s responses. It does not reduce a community to its mistreatment.',
      },
    ],
    activity: { type: 'history-timeline', config: {
      title: 'Trace gains and barriers', prompt: 'Arrange the dated evidence. Then explain why the history of rights was not a straight path of improvement.',
      sources: [
        { id: 'codes', title: 'Restrictions after abolition — authored summary', text: 'In 1865, southern legislatures enacted Black Codes. These laws restricted freedpeople’s work and movement and attempted to preserve plantation control after slavery ended.', attribution: 'Summary of National Park Service, Reconstruction and Repression', url: 'https://www.nps.gov/subjects/civilrights/reconstructionandrepression.htm' },
        { id: 'citizenship', title: 'Legal protection — authored summary', text: 'The Fourteenth Amendment, ratified in 1868, protected citizenship and required equal protection under law. Its rules provided tools for challenging unfair state actions.', attribution: 'Summary of National Archives, Fourteenth Amendment', url: fourteenthUrl },
        { id: 'votes', title: 'Voting protection — authored summary', text: 'The Fifteenth Amendment, ratified in 1870, prohibited racial reasons for denying citizens the vote. Black men participated in government while intimidation and unfair practices threatened their rights.', attribution: 'Summary of National Archives, Fifteenth Amendment', url: fifteenthUrl },
        { id: 'setback', title: 'Federal protection weakened — authored summary', text: 'In 1877, federal troops stopped sustaining the remaining Reconstruction state governments. Opponents strengthened restrictions, while Black communities continued organizing and defending rights.', attribution: 'Summary of National Park Service, Reconstruction', url: reconstructionUrl },
      ],
      events: [
        { id: 'black-codes', title: 'Black Codes restrict freedpeople', year: 1865, detail: 'Southern laws try to keep control over work and movement.', sourceId: 'codes' },
        { id: 'fourteenth', title: 'Citizenship and legal protection strengthened', year: 1868, detail: 'The Fourteenth Amendment adds constitutional protections.', sourceId: 'citizenship' },
        { id: 'fifteenth', title: 'Racial voting barriers prohibited', year: 1870, detail: 'The Fifteenth Amendment protects voting rights.', sourceId: 'votes' },
        { id: 'withdrawal', title: 'Federal support for remaining governments ends', year: 1877, detail: 'Rights face growing restrictions as opponents regain power.', sourceId: 'setback' },
      ], correctOrder: ['black-codes', 'fourteenth', 'fifteenth', 'withdrawal'],
      explain: { prompt: 'What pattern does the evidence support?', choices: [
        { id: 'gains-barriers', text: 'New legal rights faced repeated attempts to restrict them, and communities kept responding.' },
        { id: 'steady', text: 'Every change immediately made all people equally safe and powerful.' },
        { id: 'no-gains', text: 'No laws changed and African Americans took no action.' },
      ], correctChoiceId: 'gains-barriers', explanation: 'The timeline combines real gains with restrictions and setbacks. People continued working to make legal protections effective.' },
    } },
    coach: { intro: [
      { speaker: 'guide', text: 'This timeline has gains and barriers. Let’s look for the pattern without overlooking people’s responses.', pose: 'think' },
      { speaker: 'kid', text: 'I’ll place the evidence and explain how rights and restrictions changed over time.' },
    ], reactions: {
      retry: { text: 'Compare the years, then identify whether this event adds protection or weakens people’s ability to use it.', pose: 'think' },
      milestone: { text: 'The events show a pattern of gains and barriers. Explain why the work for rights continued.', pose: 'talk' },
      complete: { text: 'You connected Reconstruction’s gains and setbacks to the continuing struggle for civil rights.', pose: 'cheer' },
    } },
    worked: { title: 'Explain a right and a barrier', steps: [
      'Name the right: the Fifteenth Amendment prohibited racial reasons for denying a citizen the vote.',
      'Name the barrier: racist intimidation could prevent a person from safely using that right.',
      'Name a response: communities organized and Congress passed enforcement laws. This shows why a written right needed continuing protection.',
    ] },
    questions: [
      { card: 1, prompt: 'What was the purpose of Black Codes in the lesson?', correct: 'To restrict freedpeople’s choices and preserve control over labor.', wrong: ['To guarantee equal bargaining power for every worker.', 'To distribute all plantation land equally.', 'To make racial restrictions impossible.'], explanation: 'Black Codes limited work and movement after slavery ended.' },
      { card: 1, prompt: 'How could an unfair labor rule limit freedom after abolition?', correct: 'It could force people into work arrangements they had little power to refuse.', wrong: ['It gave every worker control of a farm.', 'It removed all consequences for leaving work.', 'It made all employers treat people equally.'], explanation: 'A person could be legally free from slavery while restrictive laws limited practical work choices.' },
      { card: 1, prompt: 'How did federal civil-rights measures respond to restrictions?', correct: 'They strengthened citizenship and equal legal protection.', wrong: ['They approved every Black Code without challenge.', 'They ended citizenship for all freedpeople.', 'They made plantation discipline the only national goal.'], explanation: 'The Civil Rights Act and Fourteenth Amendment provided protections against unfair treatment.' },
      { card: 1, type: 'true-false', prompt: 'Ending slavery stopped every later effort to control Black people’s labor.', correct: 'False', wrong: ['True'], explanation: 'Black Codes attempted to continue control after abolition, showing a conflict between legal change and ongoing restriction.' },
      { card: 2, prompt: 'Why could voting remain difficult after the Fifteenth Amendment?', correct: 'Racist threats and violence could prevent people from voting safely.', wrong: ['The amendment erased every hostile belief.', 'No one could ever violate a constitutional rule.', 'The amendment required Black voters to stay home.'], explanation: 'Legal protection did not prevent all attempts to intimidate voters or suppress participation.' },
      { card: 2, prompt: 'What did the Ku Klux Klan and Red Shirts try to suppress?', correct: 'Black political participation and the power of Reconstruction supporters.', wrong: ['All racial discrimination.', 'Every effort to restore white control.', 'Only the use of railroads for trade.'], explanation: 'These white supremacist groups used threats and violence to oppose Black rights and Reconstruction governments.' },
      { card: 2, prompt: 'Why should historians treat the name “Redeemers” carefully?', correct: 'It expresses the group’s claim, not an outcome everyone considered a rescue.', wrong: ['It proves all people agreed with the group.', 'It was the name of a constitutional amendment.', 'It means the group protected every Black voter.'], explanation: 'The name reflected opponents’ own perspective about ending Reconstruction and restoring white Democratic control.' },
      { card: 2, prompt: 'Why did Congress pass enforcement laws?', correct: 'To protect rights against political violence and obstruction.', wrong: ['To reward intimidation of Black voters.', 'To remove every constitutional protection.', 'To prevent people from participating in public life.'], explanation: 'Enforcement was needed because written rights could be violated in practice.' },
      { card: 3, prompt: 'What does segregation mean in the notes?', correct: 'Enforced separation of people by race.', wrong: ['Equal access to every institution.', 'People choosing different favorite foods.', 'A system giving everyone the same political power.'], explanation: 'Jim Crow laws imposed racial separation as part of an unequal system.' },
      { card: 3, prompt: 'Why is it inaccurate to place the entire Jim Crow system in one instant in 1877?', correct: 'Restrictions developed over time, especially in later decades.', wrong: ['All restrictions ended in 1877.', 'The laws existed only in colonial times.', 'No law changed after Reconstruction.'], explanation: 'The notes distinguish the end of federal support in 1877 from the later growth of Jim Crow laws.' },
      { card: 3, prompt: 'Which response shows African American communities continuing to act?', correct: 'Building institutions and organizing to defend rights.', wrong: ['Accepting that no future change was possible.', 'Closing every school and church voluntarily.', 'Agreeing that constitutional rights had never mattered.'], explanation: 'Communities maintained schools, churches, businesses, and political organizations despite barriers.' },
      { card: 3, type: 'true-false', prompt: 'Reconstruction institutions and amendments helped form a foundation for later civil-rights struggles.', correct: 'True', wrong: ['False'], explanation: 'Later efforts built on legal protections and community organizations established during Reconstruction.' },
      { card: 3, prompt: 'Which account best explains change over this period?', correct: 'Rights expanded, barriers persisted, and people organized to defend freedom.', wrong: ['Every condition improved at the same pace for everyone.', 'Only mistreatment occurred and nobody responded.', 'All legal gains disappeared as if they had never happened.'], explanation: 'A complete account includes real gains, efforts to restrict them, and African American action.' },
    ],
  }),
  historyLesson({
    id: 'social-studies-u05-l06', title: 'What Reconstruction Changed', indicatorCode: '4.5.E',
    intro: 'How did people judge freedom after the war? Let’s compare arguments about land, government, and the power to protect rights.',
    cards: [
      {
        title: 'A community asked for secure homes',
        text: 'Authored summary of an Edisto Island petition, October 1865: freedpeople asked President Andrew Johnson to protect their ability to buy land. They had worked that land under slavery and had supported the Union. They feared that restoring it to former owners would leave their families dependent on former enslavers. Henry Bram, Ishmael Moultrie, and Yates Sampson signed for the community. Their perspective connected economic independence with freedom and equal rights. Their petition was public action, not evidence that everyone’s land request had been granted.',
        example: 'Source label: committee of freedpeople on Edisto Island, South Carolina, petition to the president, October 28, 1865. This is an authored summary of a primary document preserved in National Archives records.',
        tip: 'A request tells us what people wanted and feared. It does not, by itself, tell us what officials finally did.',
      },
      {
        title: 'An official proposed a different path',
        text: 'Authored summary of Freedmen’s Bureau commissioner O. O. Howard’s reply to the Edisto committee, October 22, 1865: Howard recognized their wish for homes. He said purchased land should be protected, but explained the government’s policy of restoring property to pardoned former owners. He advised leases, wages, or purchases and offered to bring a petition to Congress. Howard and the committee both discussed homes and work. They differed over how safely freedpeople could depend on agreements with former enslavers. An official’s assurance did not erase the community’s concern.',
        example: 'Source label: Howard’s reply followed the committee’s earlier October 20 or 21 appeal; the committee later petitioned the president on October 28. These related documents have different authors and purposes.',
        tip: 'Compare both agreement and disagreement. A shared topic does not mean two writers seek the same solution.',
      },
      {
        title: 'A northern advocate emphasized political power',
        text: 'Authored summary of Frederick Douglass’s 1866 essay “Reconstruction”: Douglass urged Congress to secure equal voting rights for loyal citizens. Writing for a national magazine from his position as a northern abolitionist, he argued that people needed political power to protect their own rights. This complements the Edisto committee’s demand for secure land. One emphasized economic independence and homes; the other emphasized voting and government. Howard emphasized legal agreements under existing policy. Together, the sources show why ending slavery was only part of rebuilding freedom, families, and citizenship.',
        example: 'Supported conclusion: these writers discussed different ways to make freedom secure. Their arguments show debate about Reconstruction; they do not prove that landownership or voting rights became equally available everywhere.',
        tip: 'Use evidence from different positions and regions. State what it supports and what it cannot establish.',
      },
    ],
    activity: { type: 'history-evidence-board', config: {
      title: 'Three perspectives on making freedom secure', prompt: 'Connect each detail to the argument it supports. Then compare the proposed ways to protect freedom.',
      sources: [
        { id: 'edisto', title: 'Edisto committee, 1865 — authored summary', text: 'The committee asked the president to protect freedpeople’s ability to buy land. Members connected their labor and Union loyalty to a claim for secure homes. They feared dependence if former enslavers regained the land.', attribution: 'Summary of October 28, 1865 petition; Freedmen and Southern Society Project transcription of National Archives records', url: edistoUrl },
        { id: 'howard', title: 'Howard’s reply, 1865 — authored summary', text: 'Howard agreed that people wanted homes. He explained the policy of restoring former owners’ property and recommended leases, wages, or purchases. He offered to bring their requests to Congress, but his reply did not guarantee every family a farm.', attribution: 'Summary of O. O. Howard’s October 22, 1865 reply to the earlier Edisto petition; Freedmen and Southern Society Project', url: edistoUrl },
        { id: 'douglass', title: 'Douglass, 1866 — authored summary', text: 'In his Reconstruction essay, Douglass urged Congress to protect equal voting rights. He argued that people needed a voice in government to defend their own rights. His national argument emphasized political power as a safeguard.', attribution: 'Summary of Frederick Douglass, Reconstruction (1866), National Constitution Center primary-document collection', url: douglassUrl },
      ],
      headings: [{ id: 'land-independence', label: 'Committee: secure land and homes' }, { id: 'agreements', label: 'Howard: agreements within policy' }, { id: 'political-power', label: 'Douglass: voting to protect rights' }],
      cards: [
        { id: 'work-claim', text: 'Past labor and loyalty support a request to buy land.', sourceId: 'edisto', targetId: 'land-independence' },
        { id: 'dependence', text: 'Returning land to former enslavers could threaten family independence.', sourceId: 'edisto', targetId: 'land-independence' },
        { id: 'leases', text: 'Try leases, wages, or purchases under the government’s existing policy.', sourceId: 'howard', targetId: 'agreements' },
        { id: 'congress', text: 'Send requests to Congress, without guaranteeing a farm to every family.', sourceId: 'howard', targetId: 'agreements' },
        { id: 'vote', text: 'Give citizens voting power so they can defend their rights.', sourceId: 'douglass', targetId: 'political-power' },
        { id: 'voice', text: 'A voice in government helps people protect themselves.', sourceId: 'douglass', targetId: 'political-power' },
      ],
      explain: { prompt: 'Which conclusion compares the perspectives using evidence?', choices: [
        { id: 'different-paths', text: 'The committee emphasized land, Howard proposed agreements, and Douglass emphasized voting as ways to secure freedom.' },
        { id: 'all-farms', text: 'All three documents prove every freed family received a farm and full voting access.' },
        { id: 'same-plan', text: 'All three writers proposed exactly the same plan and had no concerns.' },
      ], correctChoiceId: 'different-paths', explanation: 'Their arguments share concern for life after slavery but emphasize different means: economic independence, agreements under policy, and political power.' },
    } },
    coach: { intro: [
      { speaker: 'guide', text: 'These writers did not all measure freedom in the same way. Let’s compare their proposed protections.', pose: 'think' },
      { speaker: 'kid', text: 'I’ll build each argument from evidence and keep requests separate from proven results.' },
    ], reactions: {
      retry: { text: 'Find the writer’s proposed solution: secure land, work agreements, or voting power. Check the source before placing it.', pose: 'think' },
      milestone: { text: 'Three arguments are visible. Compare their shared concern and their different proposed paths.', pose: 'talk' },
      complete: { text: 'You compared Reconstruction perspectives and supported a conclusion without turning requests into guaranteed results.', pose: 'cheer' },
    } },
    worked: { title: 'Distinguish an argument from an outcome', steps: [
      'Read the committee’s request for land. This supports a claim about its goal of independence, not a claim that everyone received land.',
      'Compare Howard’s reply and Douglass’s essay. Howard advised agreements within policy; Douglass emphasized voting as protection.',
      'Conclude that people debated how to make freedom secure through economic and political power. More evidence is needed to judge each policy’s results.',
    ] },
    questions: [
      { card: 1, prompt: 'Why did the Edisto committee connect land to freedom?', correct: 'Secure land could reduce dependence on former enslavers.', wrong: ['Land automatically guaranteed every family a vote.', 'The committee wanted forced labor restored.', 'The committee believed homes had no connection to family life.'], explanation: 'The petition linked homes and land with the ability to control work and family life.' },
      { card: 1, prompt: 'What evidence did the committee use to support its request?', correct: 'Its members’ labor on the land and support for the Union.', wrong: ['A promise that every owner had agreed freely.', 'Proof that all land had already been divided equally.', 'A claim that freedpeople had done no work there.'], explanation: 'The committee argued that long labor and loyalty supported its claim to buy and keep land.' },
      { card: 1, prompt: 'What can this petition establish by itself?', correct: 'What the committee wanted and feared.', wrong: ['That every freed family received land.', 'That all South Carolinians shared its view.', 'That every official carried out its request.'], explanation: 'A petition documents a request. Additional evidence is needed to establish the outcome.' },
      { card: 1, type: 'true-false', prompt: 'Signing and sending a petition shows freedpeople taking public action.', correct: 'True', wrong: ['False'], explanation: 'The committee expressed its claims to the president instead of silently waiting for others to decide.' },
      { card: 2, prompt: 'What path did Howard recommend in his reply?', correct: 'Leases, wages, or purchases under the government’s policy.', wrong: ['An immediate guaranteed farm for every family.', 'A complete end to all work agreements.', 'Restoring slavery as the legal labor system.'], explanation: 'Howard recommended ways to work or obtain land while explaining the existing restoration policy.' },
      { card: 2, prompt: 'Where did Howard and the committee share a concern?', correct: 'They both discussed people’s need for homes and work.', wrong: ['They both said families needed no land or shelter.', 'They both promised every request had already succeeded.', 'They both refused any contact with Congress.'], explanation: 'The sources shared a topic even though they differed about the safety and fairness of the proposed path.' },
      { card: 2, prompt: 'What was a key disagreement between the committee and Howard’s advice?', correct: 'Whether agreements with former enslavers could securely protect freedpeople’s independence.', wrong: ['Whether South Carolina had ever contained farms.', 'Whether letters could carry written words.', 'Whether all people already agreed on Reconstruction.'], explanation: 'The committee feared dependence, while Howard advised work or land agreements within existing policy.' },
      { card: 2, prompt: 'Why do the dates matter when comparing these related documents?', correct: 'Howard replied to an earlier committee appeal before its later petition to the president.', wrong: ['Howard’s reply came before anyone had raised a concern.', 'All documents were written in the same minute.', 'The dates prove every later request was granted.'], explanation: 'The earlier appeal came on October 20 or 21, the reply on October 22, and the presidential petition on October 28.' },
      { card: 3, prompt: 'What did Douglass emphasize as a way to protect rights?', correct: 'Equal voting rights and a voice in government.', wrong: ['Depending entirely on former enslavers’ promises.', 'Ending all civic participation.', 'Keeping every freedperson out of public office.'], explanation: 'Douglass argued that political power would help people protect their own rights.' },
      { card: 3, prompt: 'How did Douglass’s argument complement the committee’s argument?', correct: 'He emphasized political power while the committee emphasized secure land and homes.', wrong: ['Both discussed only the price of railroad tickets.', 'Neither connected freedom with daily power.', 'They each demanded the return of slavery.'], explanation: 'Economic independence and political participation were different but connected ways to secure freedom.' },
      { card: 3, prompt: 'Why does including Douglass help broaden the comparison beyond Edisto Island?', correct: 'He offered a northern advocate’s argument for a national audience.', wrong: ['He spoke for every person in every region.', 'He proved all local communities had identical needs.', 'He replaced the need to read the committee’s petition.'], explanation: 'His position and national audience add another perspective, while not representing everyone in the North.' },
      { card: 3, type: 'true-false', prompt: 'These sources alone prove that every proposed protection worked equally well everywhere.', correct: 'False', wrong: ['True'], explanation: 'They reveal arguments and concerns. Evidence of actual outcomes is needed to evaluate what happened in different communities.' },
      { card: 3, prompt: 'Which conclusion is best supported across the three sources?', correct: 'People debated how land, work agreements, and voting could make freedom more secure.', wrong: ['Ending slavery immediately settled every question about freedom.', 'All writers proposed the same solution for identical reasons.', 'Freedpeople had no role in discussing Reconstruction.'], explanation: 'The writers shared a concern about life after slavery while emphasizing different protections and paths.' },
    ],
  }),
];
