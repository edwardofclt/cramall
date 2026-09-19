import { historyLesson } from './authoring';

const causesUrl = 'https://www.nps.gov/liho/learn/historyculture/slavery-cause-civil-war.htm';
const secessionUrl = 'https://avalon.law.yale.edu/19th_century/csa_scarsec.asp';
const militaryUrl = 'https://www.nps.gov/articles/the-military-experience.htm';
const proclamationUrl = 'https://www.archives.gov/exhibits/featured-documents/emancipation-proclamation';
const amendmentUrl = 'https://www.archives.gov/milestone-documents/13th-amendment';
const douglassUrl = 'https://www.loc.gov/exhibits/lincoln/lincoln-and-frederick-douglass.html';
const planterUrl = 'https://home.nps.gov/articles/000/the-planter.htm';
const portRoyalUrl = 'https://www.nps.gov/reer/learn/proclamation.htm';

export const unit04Lessons = [
  historyLesson({
    id: 'social-studies-u04-l01', title: 'Slavery and the Road to War', indicatorCode: '4.4.CO',
    intro: 'What connected money, laws, and slavery on the road to Civil War? Let’s compare the evidence carefully.',
    cards: [
      {
        title: 'An economy built on unequal freedom',
        text: 'An economy is how people make, trade, and use goods. By 1860, the North had more factories and railroads. The South depended more on farming. Enslaved people grew cotton and rice under forced labor. Planters gained wealth while denying those workers freedom. Northern textile mills and merchants also profited from southern cotton. Many northerners farmed, and free African Americans lived in both regions. These patterns describe regions; they do not describe every person. Slavery was central to the conflict.',
        example: 'Authored summary of National Park Service history: cotton linked southern plantations to northern mills. An abolitionist wanted slavery ended. A slaveholder wanted to protect wealth gained from forced labor.',
        tip: 'Compare who did the work, who controlled it, and who received the money.',
      },
      {
        title: 'Laws sharpened the disagreement',
        text: 'Political causes concern power and government decisions. The Compromise of 1850 admitted California as a free state but strengthened the Fugitive Slave Law. That law threatened freedom seekers even in free states. In 1854, the Kansas–Nebraska Act reopened the struggle over slavery in western territories. In 1857, the Supreme Court’s Dred Scott decision denied African American citizenship and limited Congress’s power to restrict slavery. These choices protected slavery or spread conflict over it. Abolitionists challenged slavery as a violation of human freedom.',
        example: 'Authored source comparison: the National Park Service explains the slavery disputes behind these laws. South Carolina’s 1860 secession declaration complained that northern states resisted returning people who escaped slavery.',
        tip: 'Economic causes concern work and wealth. Political causes concern laws and power. They can be connected.',
      },
      {
        title: 'From division to secession',
        text: 'Sectionalism means putting one region’s interests ahead of the whole country. John Brown’s failed 1859 raid at Harpers Ferry aimed to start an uprising against slavery. It increased fear and division. Abraham Lincoln won the 1860 election while opposing slavery’s spread into territories. South Carolina’s leaders feared for slavery and voted to secede, or leave the United States. Other states followed and formed the Confederacy. Confederate forces attacked Fort Sumter in April 1861. Slavery lay at the center of this road to war.',
        example: 'Economic and political causes worked together: slaveholders defended wealth from forced labor and sought laws protecting slavery. Economic differences alone do not explain why secession happened.',
        tip: 'Name the underlying cause as well as the event that began the fighting.',
      },
    ],
    activity: { type: 'history-evidence-board', config: {
      title: 'Connect wealth and government power', prompt: 'Place each detail under its main kind of cause. Then explain the connection between the columns.',
      sources: [
        { id: 'economy', title: 'Regional economy — authored summary', text: 'Southern plantations forced enslaved people to produce cotton. Owners gained wealth from their work. Northern mills also bought cotton. Protecting slavery connected these economic interests to political conflict.', attribution: 'Summary of National Park Service, Slavery as a Cause of the Civil War', url: causesUrl },
        { id: 'declaration', title: 'South Carolina declaration, 1860 — authored summary', text: 'South Carolina’s secession convention defended slavery and complained about northern resistance to returning freedom seekers. The declaration tried to justify leaving the Union. It represents the convention’s position, not every South Carolinian’s view.', attribution: 'Summary of the December 24, 1860 declaration; Yale Avalon Project transcript', url: secessionUrl },
      ],
      headings: [{ id: 'economic', label: 'Work and wealth' }, { id: 'political', label: 'Government and laws' }],
      cards: [
        { id: 'cotton', text: 'Planters gained income from cotton produced through forced labor.', sourceId: 'economy', targetId: 'economic' },
        { id: 'mills', text: 'Northern mills bought cotton grown by enslaved workers.', sourceId: 'economy', targetId: 'economic' },
        { id: 'return-law', text: 'The convention objected to states resisting the return of freedom seekers.', sourceId: 'declaration', targetId: 'political' },
        { id: 'leave-union', text: 'The convention defended its decision to leave the United States.', sourceId: 'declaration', targetId: 'political' },
      ],
      explain: { prompt: 'How were the two kinds of causes connected?', choices: [
        { id: 'connected', text: 'Slaveholders sought political power to protect wealth from forced labor.' },
        { id: 'separate', text: 'Debates about laws had no connection to slavery or work.' },
        { id: 'factories', text: 'Owning a factory made every northerner an abolitionist.' },
      ], correctChoiceId: 'connected', explanation: 'Slavery shaped both the economy and demands for government protection. Regional differences were connected through slavery.' },
    } },
    coach: { intro: [
      { speaker: 'guide', text: 'A cause can involve wealth, laws, or both. Let’s examine the evidence before connecting the ideas.', pose: 'think' },
      { speaker: 'kid', text: 'I’ll sort each detail, then explain how the two columns connect.' },
    ], reactions: {
      retry: { text: 'Check whether this detail describes making money or a government decision. Then return to its source.', pose: 'think' },
      milestone: { text: 'Your columns show different kinds of causes. Look for the issue that connects them.', pose: 'talk' },
      complete: { text: 'You connected the defense of slavery to both wealth and political power.', pose: 'cheer' },
    } },
    worked: { title: 'Explain a connected cause', steps: [
      'Read the cotton summary. It describes wealth gained from enslaved people’s labor, so it provides economic evidence.',
      'Read the declaration summary. It describes a demand for government protection of slavery, so it provides political evidence.',
      'Connect them: slaveholders sought political power to protect slavery and the wealth they gained from it.',
    ] },
    questions: [
      { card: 1, prompt: 'Which comparison best describes the regional economies before the Civil War?', correct: 'The North had more factories; the South depended more on farming.', wrong: ['Every northerner worked in a factory.', 'Only the North had farms.', 'Southern cotton had no connection to northern business.'], explanation: 'The notes describe broad regional patterns while explaining that both regions included different kinds of workers.' },
      { card: 1, prompt: 'Why could a northern textile mill have an economic connection to slavery?', correct: 'It bought cotton produced by enslaved workers.', wrong: ['It made every southern law.', 'It stopped all trade with plantations.', 'It gave every cotton worker freedom.'], explanation: 'Northern mills used cotton grown through forced labor in the South.' },
      { card: 1, prompt: 'How did a slaveholder’s goal differ from an abolitionist’s goal?', correct: 'The slaveholder defended forced labor; the abolitionist sought its end.', wrong: ['Both wanted to end slavery immediately.', 'Both wanted more people enslaved.', 'The abolitionist wanted to protect plantation owners’ control.'], explanation: 'Abolitionists wanted slavery ended. Slaveholders sought to preserve the system from which they profited.' },
      { card: 1, type: 'true-false', prompt: 'Every person in a region had the same job and views about slavery.', correct: 'False', wrong: ['True'], explanation: 'The notes describe regional patterns, not every person. Free African Americans and many kinds of workers lived in both regions.' },
      { card: 2, prompt: 'What makes a dispute about the Fugitive Slave Law a political cause?', correct: 'It concerns a government rule affecting freedom seekers.', wrong: ['It concerns only the weather.', 'It describes how to weave cotton.', 'It describes the price of a railroad ticket.'], explanation: 'Political causes involve laws and government power. This law threatened people who escaped slavery.' },
      { card: 2, prompt: 'Why did the Compromise of 1850 fail to remove the conflict over slavery?', correct: 'It admitted a free state while also strengthening a law protecting slavery.', wrong: ['It ended slavery in every state.', 'It removed all disagreements about freedom.', 'It gave all African Americans citizenship.'], explanation: 'California entered as a free state, but the stronger Fugitive Slave Law increased dangers for freedom seekers.' },
      { card: 2, prompt: 'What issue did the Kansas–Nebraska Act reopen?', correct: 'Whether slavery could spread into western territories.', wrong: ['Which state would have the first school.', 'Whether all railroads should close.', 'Whether the Civil War had already ended.'], explanation: 'The act renewed conflict over the future of slavery in western territories.' },
      { card: 2, prompt: 'How did the Dred Scott decision deepen divisions?', correct: 'It denied African American citizenship and protected slavery’s reach.', wrong: ['It granted all people equal voting rights.', 'It required every state to abolish slavery.', 'It made abolitionists support slavery.'], explanation: 'The Court denied African American citizenship and limited Congress’s power to restrict slavery.' },
      { card: 2, type: 'true-false', prompt: 'Political and economic causes can be connected through the same issue.', correct: 'True', wrong: ['False'], explanation: 'Slaveholders gained wealth from forced labor and sought laws to protect slavery.' },
      { card: 3, prompt: 'Which explanation puts slavery at the center of South Carolina’s secession?', correct: 'Its leaders feared limits on slavery and wanted to protect it.', wrong: ['Its leaders objected only to different kinds of factories.', 'Its leaders left because Lincoln had ended every state’s slavery.', 'Its leaders wanted to abolish slavery before the North did.'], explanation: 'Lincoln opposed slavery’s spread. South Carolina’s leaders feared for slavery and chose secession.' },
      { card: 3, prompt: 'How did John Brown’s raid affect the growing conflict?', correct: 'The failed attempt to start an uprising increased fear and division.', wrong: ['It peacefully settled every dispute.', 'It immediately ended slavery across the country.', 'It happened after Reconstruction ended.'], explanation: 'Brown’s 1859 raid sought an uprising against slavery and intensified the conflict.' },
      { card: 3, prompt: 'Which statement distinguishes an underlying cause from the start of fighting?', correct: 'Slavery was central to the conflict; the attack on Fort Sumter began the war.', wrong: ['Fort Sumter created slavery for the first time.', 'Factories alone caused the attack, with no connection to slavery.', 'The war ended when South Carolina seceded.'], explanation: 'The long conflict over slavery preceded secession and the April 1861 attack on Fort Sumter.' },
      { card: 3, prompt: 'What is an example of sectionalism in the notes?', correct: 'Putting a region’s interests ahead of keeping the country together.', wrong: ['Comparing two sources carefully.', 'Protecting every person’s equal rights.', 'Sharing one view across all regions.'], explanation: 'Sectionalism places loyalty to a region ahead of loyalty to the whole country.' },
    ],
  }),
  historyLesson({
    id: 'social-studies-u04-l02', title: 'How War Plans Affected People', indicatorCode: '4.4.CE',
    intro: 'A war plan affected far more than an army. Let’s trace how routes, supplies, and decisions affected people.',
    cards: [
      {
        title: 'Routes carried supplies',
        text: 'A strategy is a plan for reaching a goal. The Union sought to preserve the United States. Its Anaconda Plan proposed blocking southern sea trade and controlling the Mississippi River. A blockade uses ships to limit movement into and out of ports. Along the Atlantic and Gulf coasts, it reduced Confederate trade and supplies. The Mississippi carried goods north and south. Union control split Confederate territory and disrupted supply routes. Capturing Richmond, Virginia, the Confederate capital, was another important Union objective.',
        example: 'Authored geographic summary: sea routes entered southern coastal ports; the Mississippi connected inland places; Richmond lay in Virginia. Controlling these different locations affected different supply routes.',
        tip: 'A place matters because of what moved through it or what leaders did there.',
      },
      {
        title: 'Defenses and new technology',
        text: 'The Confederacy sought independence so it could maintain a nation protecting slavery. Its leaders defended territory and the capital at Richmond. They also tried attacks into the North to gain support and weaken Union determination. Both sides used railroads to move supplies and soldiers. Ironclads were ships protected by iron armor. Confederate forces used the submarine H. L. Hunley against a Union blockade ship near Charleston. New technology could change a particular encounter, but it did not remove the larger need for food, transport, and people.',
        example: 'Authored summary: Confederate defenses protected Richmond. Blockade runners tried to carry goods through the Union blockade. The Hunley attacked a blockade ship, but one attack did not end the blockade.',
        tip: 'Explain what a plan tried to change. Its intended goal and actual result may differ.',
      },
      {
        title: 'Costs reached families',
        text: 'Both governments used conscription, a law requiring some people to serve in the military. It increased armies but took workers away from families. Exceptions and ways to avoid service caused anger about fairness. In 1864, Union General William Sherman’s March to the Sea crossed Georgia toward Savannah. His forces damaged railroads and took or destroyed supplies. They entered South Carolina in 1865. These actions weakened Confederate support systems and harmed civilians, people outside the military. Shortages and damaged farms made daily life harder.',
        example: 'A damaged railroad could stop army supplies and also prevent food from reaching families. Describing this effect helps us understand war’s costs; it does not celebrate destruction.',
        tip: 'Trace the connection: action → change in supplies or workers → effect on people.',
      },
    ],
    activity: { type: 'history-cause-effect', config: {
      title: 'Trace plans to consequences', prompt: 'Connect each strategy or policy to its supported effect. Use the geographic details in the source notes.',
      sources: [
        { id: 'routes', title: 'War routes, 1861–1865 — authored summary', text: 'The Union blockade limited trade at Atlantic and Gulf ports. Union control of the Mississippi disrupted inland Confederate supply routes. Confederate defenses aimed to keep Richmond, Virginia, from Union control.', attribution: 'Summary of National Park Service, The Military Experience', url: militaryUrl },
        { id: 'families', title: 'Supplies and service — authored summary', text: 'Conscription in both the Union and Confederacy required military service from some people, removing workers from homes. Sherman’s forces damaged railroads and supplies in Georgia in 1864 and the Carolinas in 1865. Civilians faced shortages and damage too.', attribution: 'Summary of National Park Service, The Military Experience', url: militaryUrl },
      ],
      causes: [
        { id: 'blockade', text: 'Union ships limit travel through southern coastal ports.' },
        { id: 'river', text: 'Union forces control the Mississippi River.' },
        { id: 'defense', text: 'Confederate forces defend Richmond.' },
        { id: 'draft', text: 'Both governments require some people to enter military service.' },
      ],
      effects: [
        { id: 'port-trade', text: 'Confederate sea trade and incoming supplies become harder to maintain.', sourceId: 'routes', causeId: 'blockade' },
        { id: 'inland-supply', text: 'Confederate supply routes through the inland river are disrupted.', sourceId: 'routes', causeId: 'river' },
        { id: 'capital', text: 'The Confederacy tries to keep control of its capital.', sourceId: 'routes', causeId: 'defense' },
        { id: 'workers', text: 'Armies gain people while households lose some workers.', sourceId: 'families', causeId: 'draft' },
      ],
      explain: { prompt: 'Why did military plans affect people away from fighting?', choices: [
        { id: 'shared-routes', text: 'Families and armies depended on workers, food, and transport routes.' },
        { id: 'separate-food', text: 'Families never used supplies that armies needed.' },
        { id: 'unchanged', text: 'Military service left every household’s work unchanged.' },
      ], correctChoiceId: 'shared-routes', explanation: 'The same routes carried goods for communities, and many soldiers had worked at home. Disruptions reached civilians too.' },
    } },
    coach: { intro: [
      { speaker: 'guide', text: 'Ports, a river, and a capital served different purposes. Follow each connection to the people affected.', pose: 'talk' },
      { speaker: 'kid', text: 'I’ll connect each action to an effect supported by the notes.' },
    ], reactions: {
      retry: { text: 'Return to the action. Does it change a sea route, an inland route, a capital, or available workers?', pose: 'think' },
      milestone: { text: 'Your connections show how the plans worked. Now consider why their effects reached families.', pose: 'talk' },
      complete: { text: 'You traced strategies to their effects and explained the costs beyond the battlefield.', pose: 'cheer' },
    } },
    worked: { title: 'Follow a supply connection', steps: [
      'Identify the action: Union ships limited access to southern ports.',
      'Find what used that route: ships carried exports and incoming supplies.',
      'Explain the effect: less trade meant fewer supplies for the Confederacy, and shortages also affected civilians.',
    ] },
    questions: [
      { card: 1, prompt: 'Why did the Union want to control the Mississippi River?', correct: 'It carried supplies through Confederate territory.', wrong: ['It was the Confederate capital.', 'It was the only ocean in North America.', 'It had no use for transport.'], explanation: 'The river was a major inland supply route. Control disrupted movement and split Confederate territory.' },
      { card: 1, prompt: 'How could a blockade weaken Confederate support systems?', correct: 'It made sea trade and delivery of supplies harder.', wrong: ['It supplied every Confederate port freely.', 'It created new farms in every town.', 'It moved Richmond into the North.'], explanation: 'The blockade limited ships entering and leaving southern ports.' },
      { card: 1, prompt: 'How did the Richmond objective differ from the river objective?', correct: 'Richmond was a capital; the Mississippi was a transport route.', wrong: ['Both were names for the same river.', 'Richmond was an Atlantic island with no government role.', 'The Mississippi was the Confederate president’s home city.'], explanation: 'Capturing a capital and controlling an inland supply route served different strategic purposes.' },
      { card: 1, type: 'true-false', prompt: 'The Anaconda Plan connected coastal trade with inland river routes.', correct: 'True', wrong: ['False'], explanation: 'It proposed a blockade of southern ports and control of the Mississippi River.' },
      { card: 2, prompt: 'Why did Confederate forces defend Richmond?', correct: 'They wanted to keep control of their capital.', wrong: ['They wanted the Union to capture it immediately.', 'They wanted to close every railroad in the North.', 'They believed food and supplies were unnecessary.'], explanation: 'Richmond was the Confederate capital, so its defense supported the Confederacy’s government and war effort.' },
      { card: 2, prompt: 'What does the Hunley example show about a new technology?', correct: 'It could affect one encounter without ending the larger blockade.', wrong: ['One submarine ended all sea trade everywhere.', 'Iron armor made supplies unnecessary.', 'The Hunley ended the Civil War by itself.'], explanation: 'The Hunley attacked a blockade ship, but the larger Union blockade continued.' },
      { card: 2, prompt: 'Why were railroads useful to both sides?', correct: 'They moved soldiers and supplies.', wrong: ['They automatically settled political disagreements.', 'They replaced every kind of food.', 'They guaranteed victory without planning.'], explanation: 'Railroads helped armies transport the people and materials they needed.' },
      { card: 2, prompt: 'What did Confederate attacks into the North try to accomplish?', correct: 'Gain support and weaken Union determination.', wrong: ['Abolish slavery throughout the Confederacy.', 'Give control of Richmond to the Union.', 'Create a new public school system.'], explanation: 'Confederate leaders hoped attacks would weaken the Union’s willingness to continue and attract support.' },
      { card: 3, prompt: 'How did conscription affect households?', correct: 'Some workers had to leave home for military service.', wrong: ['Every family gained more workers at home.', 'No one was required to serve.', 'It repaired farms and railroads automatically.'], explanation: 'Conscription added soldiers to armies while taking some workers away from their households.' },
      { card: 3, prompt: 'Why did some people consider conscription unfair?', correct: 'Exceptions and ways to avoid service did not affect everyone equally.', wrong: ['Every household had exactly the same resources.', 'No exceptions existed anywhere.', 'Conscription meant everyone received equal wages.'], explanation: 'Different opportunities to avoid service caused resentment about who carried the burden.' },
      { card: 3, prompt: 'Why did Sherman’s damage to railroads affect civilians too?', correct: 'Railroads also carried goods that families needed.', wrong: ['Civilians depended on no supplies.', 'Only empty trains ever used those tracks.', 'Railroad damage improved every family’s food supply.'], explanation: 'Armies and civilians shared transport systems. Damage disrupted supplies for both.' },
      { card: 3, type: 'true-false', prompt: 'Sherman’s March to the Sea in Georgia happened before his forces entered South Carolina.', correct: 'True', wrong: ['False'], explanation: 'The march across Georgia occurred in 1864. His forces entered South Carolina in 1865.' },
      { card: 3, prompt: 'Which explanation connects a military action to a human cost?', correct: 'Taking supplies weakened an army and could leave nearby families with less food.', wrong: ['A strategy had no effect beyond a general’s desk.', 'Damaged farms always produced more food.', 'Civilians were never affected by military decisions.'], explanation: 'War plans affected the same food, farms, workers, and routes on which civilians depended.' },
    ],
  }),
  historyLesson({
    id: 'social-studies-u04-l03', title: 'People Worked for Freedom', indicatorCode: '4.4.P',
    intro: 'Freedom did not arrive through one person’s decision. Let’s trace how people acted and pressed for change.',
    cards: [
      {
        title: 'Speaking, organizing, and resisting',
        text: 'An abolitionist worked to end slavery. African American and white abolitionists gave speeches, published newspapers, and sent petitions asking officials to act. A petition is a written request. Antislavery societies organized this work and raised support. Frederick Douglass used his experience of slavery to challenge it publicly. People who were enslaved also resisted, protected families, and sought freedom. Civic participation means taking action in public life. These actions changed public arguments and pressured leaders, even when activists could not vote.',
        example: 'An antislavery society could gather petitions and publish arguments. Douglass could reach listeners through speeches. Both actions urged policymakers to recognize people’s right to freedom.',
        tip: 'Look for people acting for themselves and working with others. Freedom seekers were active participants.',
      },
      {
        title: 'A sequence of action and change',
        text: 'In the 1850s, Harriet Tubman guided family members and others away from slavery through the Underground Railroad. This was a secret network of people and routes, not a train. Dred and Harriet Scott sought freedom through the courts. The 1857 Supreme Court ruling denied their claim and African American citizenship. Resistance continued despite this setback. Lincoln’s Emancipation Proclamation took effect in 1863. In 1865, the Thirteenth Amendment ended slavery nationwide, with an exception for punishment after conviction of a crime. Many actions helped create these changes.',
        example: 'Authored timeline summaries: 1850 — Tubman began returning to help others escape; 1857 — the Dred Scott ruling was a setback; 1863 — the proclamation changed Union policy; 1865 — the amendment changed the Constitution.',
        tip: 'A timeline shows sequence. Explain people’s actions too; earlier does not automatically mean caused.',
      },
      {
        title: 'Emancipation was a turning point',
        text: 'Emancipation means freedom from slavery. The 1863 proclamation applied to enslaved people in designated areas still rebelling against the United States. It did not free every enslaved person at once. Its enforcement depended on Union success and people reaching freedom. It made ending slavery an official Union war goal and allowed Black military service. Douglass recruited soldiers and challenged their unequal pay and treatment. Lincoln’s Gettysburg Address connected the war to a new birth of freedom. Emancipation changed law and opportunity, but equal rights still required action.',
        example: 'Authored summary of National Archives and Library of Congress sources: Black soldiers helped the Union and pursued freedom and citizenship. A promise in a document needed action to become real in people’s lives.',
        tip: 'Explain both the turning point and its limits. Freedom from slavery did not bring immediate equality.',
      },
    ],
    activity: { type: 'history-timeline', config: {
      title: 'Actions and turning points', prompt: 'Arrange the dated events. Then explain why the sequence includes people’s actions as well as government decisions.',
      sources: [
        { id: 'tubman', title: 'Tubman’s freedom work — authored summary', text: 'Starting in 1850, Harriet Tubman returned to Maryland to help relatives and others escape slavery. She relied on knowledge, planning, and people in a secret network.', attribution: 'Summary of National Park Service, Harriet Tubman', url: 'https://www.nps.gov/hatu/learn/historyculture/htubman.htm' },
        { id: 'scott', title: 'A court setback — authored summary', text: 'Dred and Harriet Scott sought freedom through legal action. In 1857, the Supreme Court ruled against Dred Scott and denied African American citizenship. People continued resisting slavery.', attribution: 'Summary of National Park Service, The Dred Scott Case', url: 'https://www.nps.gov/jeff/planyourvisit/dredscott.htm' },
        { id: 'emancipation', title: 'The proclamation — authored summary', text: 'In 1863, the Emancipation Proclamation made freedom from slavery a Union war goal in designated areas in rebellion. It did not end slavery everywhere at once.', attribution: 'Summary of National Archives, The Emancipation Proclamation', url: proclamationUrl },
        { id: 'amendment', title: 'A constitutional change — authored summary', text: 'In 1865, the Thirteenth Amendment ended slavery throughout the United States, with an exception for punishment after conviction of a crime.', attribution: 'Summary of National Archives, Thirteenth Amendment', url: amendmentUrl },
      ],
      events: [
        { id: 'tubman-helps', title: 'Tubman begins return journeys', year: 1850, detail: 'She helps other people escape slavery.', sourceId: 'tubman' },
        { id: 'court-setback', title: 'The Dred Scott ruling', year: 1857, detail: 'A court ruling denies freedom and citizenship claims.', sourceId: 'scott' },
        { id: 'proclamation', title: 'Emancipation Proclamation', year: 1863, detail: 'Union policy changes toward emancipation.', sourceId: 'emancipation' },
        { id: 'abolition', title: 'Thirteenth Amendment', year: 1865, detail: 'The Constitution changes to end slavery nationwide, with a punishment exception.', sourceId: 'amendment' },
      ], correctOrder: ['tubman-helps', 'court-setback', 'proclamation', 'abolition'],
      explain: { prompt: 'What does the sequence help explain about emancipation?', choices: [
        { id: 'actions', text: 'People pursued freedom and challenged slavery before and alongside changes in law.' },
        { id: 'automatic', text: 'The passage of time automatically ended slavery without people acting.' },
        { id: 'setback-ended', text: 'The court setback ended every effort to gain freedom.' },
      ], correctChoiceId: 'actions', explanation: 'The timeline includes resistance, a setback, and government action. Civic work continued through changes and obstacles.' },
    } },
    coach: { intro: [
      { speaker: 'guide', text: 'This path includes brave action and a serious setback. What continued as laws changed?', pose: 'think' },
      { speaker: 'kid', text: 'I’ll arrange the events and look for how people kept working for freedom.' },
    ], reactions: {
      retry: { text: 'Compare the years beside the events. Then reread what people or leaders did at that point.', pose: 'think' },
      milestone: { text: 'Your sequence is in place. Now connect public action to the changes in law.', pose: 'talk' },
      complete: { text: 'You explained emancipation as a turning point shaped by people’s continuing work for freedom.', pose: 'cheer' },
    } },
    worked: { title: 'Explain a turning point with limits', steps: [
      'Begin with the people: abolitionists spoke, petitioned, organized, and helped freedom seekers.',
      'Identify the change: the 1863 proclamation made emancipation an official Union war goal in designated areas in rebellion.',
      'Name its limit: it did not free everyone at once. Continued action and the 1865 amendment brought further change.',
    ] },
    questions: [
      { card: 1, prompt: 'Which action is an example of civic participation against slavery?', correct: 'Sending officials a petition asking them to end slavery.', wrong: ['Waiting silently for time alone to change a law.', 'Treating people as goods to sell.', 'Refusing to hear any argument about freedom.'], explanation: 'A petition is a written request. It let people urge leaders to change public policy.' },
      { card: 1, prompt: 'How did antislavery societies help abolitionists?', correct: 'They organized petitions, publications, and support.', wrong: ['They made every member president.', 'They guaranteed immediate agreement from all officials.', 'They prevented people from speaking in public.'], explanation: 'Organizing made it possible for people to work together to challenge slavery.' },
      { card: 1, prompt: 'Why is it incomplete to describe enslaved people only as waiting for freedom?', correct: 'They resisted slavery, protected families, and sought freedom themselves.', wrong: ['They had no goals of their own.', 'They were allowed every political right already.', 'They all agreed with slaveholders.'], explanation: 'The notes describe enslaved people’s own decisions and actions as part of the struggle for freedom.' },
      { card: 1, type: 'true-false', prompt: 'People who could not vote could still influence public life through speeches and petitions.', correct: 'True', wrong: ['False'], explanation: 'Civic participation includes organizing, speaking, publishing, and making requests, as well as voting.' },
      { card: 2, prompt: 'What was the Underground Railroad?', correct: 'A secret network of people and routes helping people escape slavery.', wrong: ['A train line carrying all southern cotton.', 'A government railroad with public tickets.', 'A court that guaranteed freedom to every applicant.'], explanation: 'The name describes a network, not an actual railroad. Tubman used it to guide people to freedom.' },
      { card: 2, prompt: 'What does the Scotts’ court case show about seeking change?', correct: 'People could use legal action and still face a serious setback.', wrong: ['Courts always granted freedom immediately.', 'People never challenged slavery in court.', 'A setback meant nobody continued resisting.'], explanation: 'Dred and Harriet Scott sought freedom in court. The ruling went against them, but resistance to slavery continued.' },
      { card: 2, prompt: 'How did the 1865 amendment differ from the 1863 proclamation?', correct: 'It ended slavery nationwide through a constitutional change, with a punishment exception.', wrong: ['It only applied to a secret travel network.', 'It restored slavery in every state.', 'It was simply an earlier court decision.'], explanation: 'The Thirteenth Amendment changed the Constitution and reached the whole country, unlike the proclamation’s designated areas.' },
      { card: 2, prompt: 'Why is arranging events by year only the first step in explaining emancipation?', correct: 'We must also explain how people acted and how policies changed.', wrong: ['Earlier events always cause every later event.', 'Dates prove nobody made decisions.', 'A timeline replaces all evidence about people.'], explanation: 'Sequence shows when events happened. Historical explanation also connects supported actions and changes.' },
      { card: 3, prompt: 'Why was the Emancipation Proclamation a turning point?', correct: 'It made ending slavery an official Union war goal.', wrong: ['It gave all Americans equal rights immediately.', 'It required the Union to protect slavery everywhere.', 'It ended all fighting that same day.'], explanation: 'The proclamation changed the purpose of the Union war effort while freedom still depended on enforcement and action.' },
      { card: 3, prompt: 'Why did the proclamation not free everyone at once?', correct: 'It applied to designated areas in rebellion and needed enforcement.', wrong: ['It was a plan to build a train.', 'It only discussed northern textile prices.', 'It gave Confederate leaders equal-rights lessons.'], explanation: 'Its reach was limited, and Union success and people’s actions helped make its promise real.' },
      { card: 3, prompt: 'Why did Douglass both recruit Black soldiers and challenge unequal treatment?', correct: 'He supported the fight for freedom while demanding fair treatment for those serving.', wrong: ['He thought military service had already ended racism.', 'He wanted soldiers to receive less pay.', 'He believed freedom required no further action.'], explanation: 'Douglass connected Black service with the struggle for freedom and citizenship, while confronting discrimination.' },
      { card: 3, type: 'true-false', prompt: 'Emancipation immediately removed every barrier to equal rights.', correct: 'False', wrong: ['True'], explanation: 'Freedom from slavery was a major change. Equal rights and fair treatment still required continued action.' },
      { card: 3, prompt: 'How did the Gettysburg Address connect to emancipation?', correct: 'Lincoln connected the war’s meaning to a new birth of freedom.', wrong: ['It called for slavery to expand everywhere.', 'It announced that civic participation no longer mattered.', 'It promised that no one would need to enforce rights.'], explanation: 'The address linked the war to freedom and the future of government, while the work of securing rights continued.' },
    ],
  }),
  historyLesson({
    id: 'social-studies-u04-l04', title: 'South Carolinians During the War', indicatorCode: '4.4.CX',
    intro: 'People living through the same war faced different choices. What did South Carolina’s setting mean for them?',
    cards: [
      {
        title: 'War reached South Carolina homes',
        text: 'Confederate forces attacked Fort Sumter in Charleston Harbor in April 1861, beginning the Civil War. The Union later blockaded Charleston, making trade and supplies harder to obtain. Wealthy planters had helped lead South Carolina toward secession to defend slavery. Many wanted to keep control of enslaved workers. A Confederate exemption allowed an owner or overseer on certain large plantations to avoid military service. Poorer white families resented unequal burdens. Living in the same state did not give everyone the same power or resources.',
        example: 'Authored summary of National Park Service history and Library of Congress conscription research: a planter could have land and political influence while a small farm family lost a worker to military service.',
        tip: 'Context means the surrounding conditions. Consider the port, the war, and a person’s legal and economic position.',
      },
      {
        title: 'People used their skills for freedom',
        text: 'Robert Smalls knew Charleston’s waters from working aboard ships while enslaved. In May 1862, Smalls and the Planter’s other Black crew members helped their families escape. They carried the vessel past Confederate defenses to Union ships. Women also shaped wartime life in different ways. Charlotte Forten, a free African American teacher from the North, taught formerly enslaved students on St. Helena Island. Harriet Tubman worked in South Carolina as a nurse and scout. African American knowledge, organizing, and decisions helped people pursue freedom.',
        example: 'Authored source summaries: the Planter escape used the crew’s maritime knowledge. Forten’s teaching supported learners near Union-held Port Royal. These were different actions within the same struggle for freedom.',
        tip: 'Name the skill or action. Avoid describing people as only receiving help.',
      },
      {
        title: 'Compare experiences within one war',
        text: 'Many southern women took on more farm, household, or nursing work when men left for military service. Their experiences differed by race, freedom, and wealth. An enslaved woman could face forced work and seek safety for her family. A planter’s wife might manage a household that depended on slavery. Union control near Port Royal opened opportunities for schools and paid work. Elsewhere, slavery continued until freedom could be secured. The blockade and Sherman’s later campaign disrupted families across the state, but their losses and hopes were not identical.',
        example: 'Compare a planter fearing loss of control with a freedom seeker pursuing control over family and work. Both experienced wartime change, but the meaning of that change was different.',
        tip: 'Ask “for whom?” after a claim about wartime life. One story cannot stand for all South Carolinians.',
      },
    ],
    activity: { type: 'history-evidence-board', config: {
      title: 'Different actions in wartime South Carolina', prompt: 'Connect each sourced detail to the experience it helps explain. Then compare the purposes behind those actions.',
      sources: [
        { id: 'smalls', title: 'The Planter, 1862 — authored summary', text: 'Smalls and other Black crew members used their knowledge of Charleston Harbor to take the Planter past Confederate defenses. They helped their families reach Union ships and freedom.', attribution: 'Summary of National Park Service, The Planter', url: planterUrl },
        { id: 'schools', title: 'Learning near Port Royal — authored summary', text: 'Charlotte Forten came from a free Black family in Philadelphia. In 1862 she joined teachers working with formerly enslaved learners on St. Helena Island. Union control created conditions in which schools could grow.', attribution: 'Summary of National Park Service, Reconstruction Era monument history', url: portRoyalUrl },
        { id: 'planters', title: 'Plantation power — authored summary', text: 'Wealthy planters defended slavery. A Confederate law allowed an owner or overseer on qualifying large plantations to avoid military service. Such exemptions protected plantation supervision and caused resentment about unequal burdens.', attribution: 'Summary of Library of Congress, Civil War Conscription Laws', url: 'https://blogs.loc.gov/law/2012/11/civil-war-conscription-laws/' },
      ],
      headings: [{ id: 'pursue-freedom', label: 'Pursuing freedom and learning' }, { id: 'preserve-control', label: 'Preserving plantation control' }],
      cards: [
        { id: 'crew', text: 'Black crew members use maritime knowledge to help families escape.', sourceId: 'smalls', targetId: 'pursue-freedom' },
        { id: 'forten', text: 'Forten teaches formerly enslaved learners near Union-held Port Royal.', sourceId: 'schools', targetId: 'pursue-freedom' },
        { id: 'slavery', text: 'Planters defend a labor system that denies workers freedom.', sourceId: 'planters', targetId: 'preserve-control' },
        { id: 'exemption', text: 'The exemption allows supervision of forced plantation labor to continue.', sourceId: 'planters', targetId: 'preserve-control' },
      ],
      explain: { prompt: 'Why did the same war mean different things to these groups?', choices: [
        { id: 'position', text: 'Their positions differed: some sought freedom while others tried to preserve power over them.' },
        { id: 'same-goal', text: 'Everyone in South Carolina wanted the same system of work to continue.' },
        { id: 'no-context', text: 'Union control and slavery had no connection to their choices.' },
      ], correctChoiceId: 'position', explanation: 'People’s freedom, skills, wealth, and power shaped their options and aims during the same war.' },
    } },
    coach: { intro: [
      { speaker: 'guide', text: 'These South Carolina stories share a period and place, but their purposes differ. Let’s compare them.', pose: 'talk' },
      { speaker: 'kid', text: 'I’ll connect each action to its purpose and explain what shaped the difference.' },
    ], reactions: {
      retry: { text: 'Read who acted and what the action was meant to protect or change. Use that purpose to place the detail.', pose: 'think' },
      milestone: { text: 'The evidence shows contrasting purposes. Consider whose freedom and power were at stake.', pose: 'talk' },
      complete: { text: 'You used South Carolina’s wartime conditions to explain different people’s experiences.', pose: 'cheer' },
    } },
    worked: { title: 'Connect an action to its setting', steps: [
      'Identify Smalls’s action: he and other crew members helped families escape aboard the Planter.',
      'Identify the useful context: they knew Charleston Harbor, and Union ships were beyond Confederate defenses.',
      'Explain the connection: local knowledge and the presence of Union ships created an opportunity that the crew acted upon.',
    ] },
    questions: [
      { card: 1, prompt: 'Why did Charleston’s location matter during the Civil War?', correct: 'Its harbor was a place of fighting, sea trade, and blockade.', wrong: ['It lay on the Pacific Ocean.', 'It had no connection to shipping.', 'It was the only farm in South Carolina.'], explanation: 'Fort Sumter and the blockade connected Charleston Harbor to the start of fighting and wartime supply problems.' },
      { card: 1, prompt: 'Why did a military exemption for some plantation owners or overseers cause resentment?', correct: 'Other families could lose workers while some plantation supervision was protected.', wrong: ['Every family had equal wealth and influence.', 'It ended forced plantation labor.', 'It required only wealthy owners to serve.'], explanation: 'The exemption showed that wartime burdens were unequal.' },
      { card: 1, prompt: 'What did wealthy planters seek to defend through secession?', correct: 'Slavery and their control over enslaved workers.', wrong: ['Equal voting rights for all workers.', 'A ban on forced labor everywhere.', 'The freedom of people they enslaved.'], explanation: 'Planters had wealth and power tied to slavery and supported its protection.' },
      { card: 1, type: 'true-false', prompt: 'Every South Carolina family had the same resources to handle wartime shortages.', correct: 'False', wrong: ['True'], explanation: 'Wealth, legal freedom, and political power differed across families and communities.' },
      { card: 2, prompt: 'How did Smalls and the crew use their knowledge to seek freedom?', correct: 'They guided the Planter through Charleston Harbor to Union ships.', wrong: ['They waited for the harbor to disappear.', 'They traveled by train to the Pacific.', 'They used voting rights already guaranteed to every enslaved person.'], explanation: 'Their experience aboard ships helped them pass Confederate defenses and reach Union forces.' },
      { card: 2, prompt: 'Why should the Planter story include the other crew members and families?', correct: 'The escape involved coordinated action to help families reach freedom.', wrong: ['Smalls was the only person aboard the vessel.', 'The families were unrelated to the escape’s purpose.', 'No one besides a government official could make decisions.'], explanation: 'The notes describe Smalls, other Black crew members, and their families as participants in the escape.' },
      { card: 2, prompt: 'How did Charlotte Forten contribute in South Carolina?', correct: 'She taught formerly enslaved learners on St. Helena Island.', wrong: ['She commanded the Confederate blockade.', 'She wrote a law protecting slavery.', 'She ran a plantation to stop education.'], explanation: 'Forten was a free African American teacher who supported learning near Port Royal.' },
      { card: 2, prompt: 'What links Forten’s teaching and the crew’s escape?', correct: 'Both used people’s skills to advance freedom or opportunities connected to it.', wrong: ['Both aimed to preserve plantation owners’ control.', 'Both were the same military job.', 'Both depended on everyone already having equal rights.'], explanation: 'Their actions differed, but each contributed to people’s efforts to build freer lives.' },
      { card: 3, prompt: 'Why is “all southern women had the same wartime experience” too broad?', correct: 'Race, wealth, and freedom shaped their work and choices.', wrong: ['Women did no work during the war.', 'Every woman managed a wealthy plantation.', 'No woman ever faced shortages.'], explanation: 'The notes describe different conditions for enslaved women, planter families, and other households.' },
      { card: 3, prompt: 'How did Union control near Port Royal change local possibilities?', correct: 'It opened opportunities for schools and paid work.', wrong: ['It guaranteed identical lives across South Carolina.', 'It ended all hardship throughout the country.', 'It prevented every formerly enslaved person from learning.'], explanation: 'Union control created openings for freedom, education, and new work arrangements in that area.' },
      { card: 3, prompt: 'Which comparison explains different hopes during the war?', correct: 'A freedom seeker wanted control of family and work; a planter wanted to keep control over workers.', wrong: ['Both wanted slavery to continue unchanged.', 'Neither cared about work or family.', 'Both had equal power under slavery.'], explanation: 'The same change could threaten a planter’s power while expanding another person’s freedom.' },
      { card: 3, type: 'true-false', prompt: 'New wartime responsibilities included more farm, household, and nursing work for many women.', correct: 'True', wrong: ['False'], explanation: 'With men away in military service, many women took on additional work, although experiences varied.' },
      { card: 3, prompt: 'What should a historian ask after hearing one story about life in wartime South Carolina?', correct: 'Whose experience is this, and how might others’ conditions differ?', wrong: ['How can this story prove everyone agreed?', 'Why can we ignore the person’s freedom and resources?', 'How can one story replace every other source?'], explanation: 'Context includes a person’s circumstances. One account cannot represent everyone in a state.' },
    ],
  }),
  historyLesson({
    id: 'social-studies-u04-l05', title: 'How the War Changed Life', indicatorCode: '4.4.CC',
    intro: 'What changed during the Civil War, and what still needed to change? Let’s compare work, rights, and daily life.',
    cards: [
      {
        title: 'Work and resources changed',
        text: 'War changed how people worked and used resources. Northern factories produced military supplies, while textile mills faced disruptions in cotton supplies. Railroads carried soldiers and goods. In the South, blockade, damaged transport, and destruction of farms reduced supplies. Enslaved people escaping to Union lines weakened slaveholders’ control of labor. Families in both regions lost workers to military service. Some businesses gained orders, but that did not mean every family prospered. Compare who gained income with who faced shortages, forced work, or loss.',
        example: 'A factory could receive an order for uniforms while a household struggled without a worker. A damaged southern railroad could disrupt both army deliveries and civilian food supplies.',
        tip: 'Economic change concerns work, production, and resources. Its effects can differ between groups.',
      },
      {
        title: 'Freedom changed law and choices',
        text: 'Before the war, slavery denied millions of African Americans control over their work and families. During the war, many sought freedom, helped the Union, and built new communities. The 1863 Emancipation Proclamation made ending slavery an official Union goal in designated areas in rebellion. The Thirteenth Amendment ended slavery nationwide in 1865, with an exception for punishment after conviction of a crime. Union victory preserved the United States. These were major political and social changes. They did not automatically provide equal treatment, land, or safe access to every right.',
        example: 'Authored before-and-after summary: in 1860, slavery remained legal in southern states; in 1863, Union policy expanded toward emancipation; in 1865, the Constitution abolished slavery nationwide with the stated exception.',
        tip: 'Separate a change in law from all the conditions of daily life. Both matter.',
      },
      {
        title: 'New roles and continuing needs',
        text: 'Social change concerns people’s roles and relationships. Women organized relief, managed work at home, and cared for soldiers. Clara Barton gathered medical supplies and helped wounded soldiers. Sojourner Truth recruited African American men for the Union and continued advocating for rights. Soldiers of different backgrounds faced danger, illness, and separation from family. Some returned with lasting injuries. After the war, people still needed homes, food, family connections, and fair treatment. Freedom expanded possibilities, while racism and unequal treatment continued. Change and continuity can exist together.',
        example: 'Continuity means something that continues. Families needed safety before, during, and after the war. A new role in nursing or public organizing was a change, but unequal rights remained.',
        tip: 'Use “changed” and “continued” in one careful explanation. Avoid claiming that every problem ended in 1865.',
      },
    ],
    activity: { type: 'history-timeline', config: {
      title: 'Before, during, and at the war’s end', prompt: 'Arrange the evidence by date. Explain one major change and one limit that the timeline shows.',
      sources: [
        { id: 'before', title: 'Before the war — authored summary', text: 'In 1860, slavery remained legal in southern states. Enslaved people were denied control over their labor, although they resisted and sought freedom.', attribution: 'Summary of National Park Service, Slavery as a Cause of the Civil War', url: causesUrl },
        { id: 'during', title: 'A changed war goal — authored summary', text: 'The 1863 proclamation made emancipation an official Union war goal in designated areas in rebellion. Black soldiers served the Union and helped pursue freedom. The proclamation did not end slavery everywhere at once.', attribution: 'Summary of National Archives, The Emancipation Proclamation', url: proclamationUrl },
        { id: 'after', title: 'Abolition — authored summary', text: 'The Thirteenth Amendment abolished slavery nationwide in 1865, with an exception for punishment after conviction of a crime. It did not guarantee land, equal treatment, or voting rights by itself.', attribution: 'Summary of National Archives, Thirteenth Amendment', url: amendmentUrl },
      ],
      events: [
        { id: 'forced-work', title: 'Slavery remains legal in southern states', year: 1860, detail: 'Millions are denied control over their labor and families.', sourceId: 'before' },
        { id: 'war-goal', title: 'Union policy includes emancipation', year: 1863, detail: 'The proclamation changes a war goal but has limits.', sourceId: 'during' },
        { id: 'nationwide-abolition', title: 'A constitutional end to slavery', year: 1865, detail: 'The amendment applies nationwide, with a punishment exception.', sourceId: 'after' },
      ], correctOrder: ['forced-work', 'war-goal', 'nationwide-abolition'],
      explain: { prompt: 'Which explanation includes both change and a limit?', choices: [
        { id: 'change-limit', text: 'Slavery was abolished nationwide, but equal treatment did not immediately follow.' },
        { id: 'nothing', text: 'The legal status of slavery did not change during this period.' },
        { id: 'all-equal', text: 'Every person gained land and equal treatment as soon as slavery ended.' },
      ], correctChoiceId: 'change-limit', explanation: 'Ending slavery changed people’s legal status and possibilities. Other barriers and unequal conditions continued.' },
    } },
    coach: { intro: [
      { speaker: 'guide', text: 'These dates mark a large change in freedom. Let’s also notice what the final document did not settle.', pose: 'think' },
      { speaker: 'kid', text: 'I’ll order the evidence and explain both a change and a continuing need.' },
    ], reactions: {
      retry: { text: 'Find the year and compare the legal condition at that point. Which change had happened by then?', pose: 'think' },
      milestone: { text: 'The sequence shows a major legal change. Read the limits before explaining its effects.', pose: 'talk' },
      complete: { text: 'You explained a lasting change without overlooking the inequalities that continued.', pose: 'cheer' },
    } },
    worked: { title: 'Evaluate a before-and-after claim', steps: [
      'Test the claim “Nothing changed.” The notes show that slavery was abolished nationwide, so that claim misses a major change.',
      'Test the claim “Every problem ended.” The notes show continuing racism and unequal treatment, so that claim goes too far.',
      'Write a careful conclusion: abolition greatly changed legal freedom, while people still had to pursue equal rights and rebuild daily life.',
    ] },
    questions: [
      { card: 1, prompt: 'Why did a rise in factory orders not mean every northern family prospered?', correct: 'Families could still face shortages and lose workers to military service.', wrong: ['Orders guaranteed every household the same income.', 'No northern family sent anyone to the military.', 'Factories made daily needs disappear.'], explanation: 'Different groups experienced economic changes differently, even within the same region.' },
      { card: 1, prompt: 'How did people escaping slavery change the southern labor system during the war?', correct: 'They reduced slaveholders’ control over their labor.', wrong: ['They strengthened every slaveholder’s control.', 'They made all plantation work voluntary before the war.', 'They guaranteed plantation owners larger profits.'], explanation: 'Seeking freedom was people’s own action and weakened the system of forced labor.' },
      { card: 1, prompt: 'Which pair best explains a wartime economic change in the South?', correct: 'Damaged railroads disrupted deliveries and reduced access to supplies.', wrong: ['New laws made every farm equally wealthy.', 'The blockade increased unrestricted sea trade.', 'Every family gained extra workers.'], explanation: 'Damage and blockade interrupted production and transport, affecting both armies and families.' },
      { card: 1, type: 'true-false', prompt: 'Wartime textile production could be affected by disruptions in cotton supplies.', correct: 'True', wrong: ['False'], explanation: 'Textile mills relied on cotton, so interruptions in that supply affected production.' },
      { card: 2, prompt: 'Which change most directly altered the legal status of slavery across the whole United States?', correct: 'The Thirteenth Amendment in 1865.', wrong: ['A new order for uniforms.', 'One damaged railroad.', 'One family moving to a new house.'], explanation: 'The amendment ended slavery nationwide, with an exception for punishment after conviction of a crime.' },
      { card: 2, prompt: 'How did Union victory change the attempt to create a separate Confederate nation?', correct: 'The United States was preserved as one nation.', wrong: ['The Confederacy gained lasting independence.', 'Every state became its own country.', 'The national government permanently ended.'], explanation: 'The Union’s victory prevented Confederate independence and preserved the United States.' },
      { card: 2, prompt: 'Which statement accurately describes the change from 1860 to 1865?', correct: 'Slavery went from legal in southern states to abolished nationwide with a punishment exception.', wrong: ['Slavery became legal in every northern state.', 'Nothing changed in slavery’s legal status.', 'The 1865 amendment gave every family land.'], explanation: 'The amendment made a nationwide legal change, but it did not settle every economic or social need.' },
      { card: 2, prompt: 'Why is legal freedom different from immediate equality?', correct: 'People could be free from slavery and still face unfair treatment and barriers.', wrong: ['Ending slavery guaranteed everyone equal wealth.', 'Legal freedom means slavery continues unchanged.', 'Equal treatment requires no action or enforcement.'], explanation: 'Abolition expanded freedom, but racism, access to rights, and economic conditions still needed to change.' },
      { card: 3, prompt: 'What does Clara Barton’s wartime work show?', correct: 'Women could organize supplies and care for soldiers in public service.', wrong: ['All women avoided work outside the home.', 'Women had no role in supporting people during the war.', 'Gathering medical supplies was unrelated to people’s needs.'], explanation: 'Barton gathered supplies and helped wounded soldiers, showing a significant public role.' },
      { card: 3, prompt: 'How did Sojourner Truth contribute during the war?', correct: 'She recruited Black men for the Union and advocated for rights.', wrong: ['She defended the expansion of slavery.', 'She ended every barrier to equality by herself.', 'She argued that public action never mattered.'], explanation: 'Truth connected wartime participation with continued work for African American rights.' },
      { card: 3, prompt: 'Which example shows continuity across the war years?', correct: 'Families continued to need safety, food, and connections with one another.', wrong: ['The Thirteenth Amendment changed the Constitution.', 'The Union added emancipation as a war goal.', 'Women took on some new wartime responsibilities.'], explanation: 'Continuity means something that continues. Basic family needs remained through the changes.' },
      { card: 3, type: 'true-false', prompt: 'Soldiers’ needs always ended as soon as fighting stopped.', correct: 'False', wrong: ['True'], explanation: 'Some soldiers returned with lasting injuries and families still faced the work of rebuilding daily life.' },
      { card: 3, prompt: 'Which conclusion includes both change and continuity?', correct: 'New opportunities grew, while racism and the need for fair treatment continued.', wrong: ['No one’s life changed at all.', 'All inequality ended in 1865.', 'The war changed only the names of places.'], explanation: 'People experienced major changes in freedom and roles, alongside continuing inequalities and daily needs.' },
    ],
  }),
  historyLesson({
    id: 'social-studies-u04-l06', title: 'Evidence from a Divided Nation', indicatorCode: '4.4.E',
    intro: 'Two sources can discuss the same conflict from very different positions. What do their purposes help us understand?',
    cards: [
      {
        title: 'Read the secession convention’s purpose',
        text: 'A perspective is a person’s or group’s way of viewing an issue. Authored summary of South Carolina’s secession declaration, December 1860: the convention defended slavery and objected to northern resistance to returning freedom seekers. It argued that these disagreements justified leaving the United States. The document reveals the leaders’ desire to protect slavery and their political power. It speaks for the convention, not every South Carolinian. Enslaved people did not choose those delegates or share equal power in making that declaration.',
        example: 'Source label: South Carolina secession convention, 1860; a public document explaining and defending secession. This lesson uses a summary, not a quotation or an invented witness account.',
        tip: 'Ask who made a source, when, and for what purpose before using it as evidence.',
      },
      {
        title: 'Read Douglass’s purpose',
        text: 'Authored summary of Frederick Douglass’s 1863 recruitment work, described by the Library of Congress: Douglass urged Black men to serve in Union forces. He believed their participation could advance freedom and citizenship. He also pressed Lincoln to address unequal pay and treatment of Black soldiers. Douglass had escaped slavery and was an abolitionist based in the North. His purpose differed from the secession convention’s purpose. He wanted to dismantle slavery and widen rights, while the convention had defended slavery and slaveholders’ power.',
        example: 'Source label: Library of Congress account of Douglass’s 1863 recruitment and meetings with Lincoln. It is a later historical explanation of his actions and perspective, not Douglass speaking through Pip.',
        tip: 'A later historian’s summary is a secondary source. A document made in the period can be a primary source.',
      },
      {
        title: 'Build a supported comparison',
        text: 'Both sources connect government power with slavery, but they seek opposite changes. The convention wanted protection for a system that forced people to work. Douglass sought freedom and citizenship for people denied them. That contrast helps explain economic, political, and social divisions. Economic divisions concerned control of labor. Political divisions concerned government and rights. Social divisions concerned people’s status and treatment. These sources do not show every person’s opinion. Use a specific claim about these authors, and seek more sources before making claims about whole populations.',
        example: 'Supported claim: “The convention defended slavery, while Douglass connected Union service with freedom and citizenship.” Unsupported claim: “Every person in either region thought exactly like these authors.”',
        tip: 'A strong comparison explains the difference and points to a detail from each source.',
      },
    ],
    activity: { type: 'history-evidence-board', config: {
      title: 'Compare two purposes', prompt: 'Build each source’s argument from the supplied details. Then choose a comparison that both sources support.',
      sources: [
        { id: 'convention', title: 'Secession convention, 1860 — authored summary', text: 'South Carolina’s convention defended slavery and criticized northern resistance to returning freedom seekers. It used these complaints to justify secession. Its purpose was to defend the convention’s decision and the interests of slavery.', attribution: 'Summary of South Carolina’s December 24, 1860 declaration; Yale Avalon Project transcript', url: secessionUrl },
        { id: 'douglass', title: 'Douglass’s wartime aims, 1863 — authored summary', text: 'Douglass urged Black men to serve the Union as a step toward freedom and citizenship. He also challenged unequal treatment and pay. His goal included ending slavery and securing fair treatment, not simply increasing an army’s size.', attribution: 'Summary of Library of Congress, Lincoln and Frederick Douglass', url: douglassUrl },
      ],
      headings: [{ id: 'protect-slavery', label: 'The convention’s purpose' }, { id: 'expand-freedom', label: 'Douglass’s purpose' }],
      cards: [
        { id: 'return-seekers', text: 'Objects to resistance to returning people who escaped slavery.', sourceId: 'convention', targetId: 'protect-slavery' },
        { id: 'justify-secession', text: 'Uses slavery disputes to justify leaving the Union.', sourceId: 'convention', targetId: 'protect-slavery' },
        { id: 'citizenship', text: 'Connects Black military participation with freedom and citizenship.', sourceId: 'douglass', targetId: 'expand-freedom' },
        { id: 'fair-pay', text: 'Challenges unequal pay and treatment of Black soldiers.', sourceId: 'douglass', targetId: 'expand-freedom' },
      ],
      explain: { prompt: 'Which comparison explains the division between these sources?', choices: [
        { id: 'different-rights', text: 'The convention defended slavery’s power; Douglass sought freedom and equal citizenship.' },
        { id: 'same-rights', text: 'Both sources wanted the same people to remain enslaved.' },
        { id: 'all-people', text: 'The two sources prove that every northerner and southerner shared one opinion.' },
      ], correctChoiceId: 'different-rights', explanation: 'Details from both sources support opposing purposes about slavery, government power, and people’s rights.' },
    } },
    coach: { intro: [
      { speaker: 'guide', text: 'These sources are evidence of different purposes. Let’s support a comparison with a detail from each.', pose: 'think' },
      { speaker: 'kid', text: 'I’ll connect the details to each purpose without assuming everyone in a region agreed.' },
    ], reactions: {
      retry: { text: 'Check the source’s goal. Does the detail defend slavery or seek freedom and fair treatment?', pose: 'think' },
      milestone: { text: 'Each argument now has evidence. Explain the difference between the goals, using both sides of the board.', pose: 'talk' },
      complete: { text: 'You supported a comparison of wartime divisions with details from two distinct perspectives.', pose: 'cheer' },
    } },
    worked: { title: 'Use two sources without overclaiming', steps: [
      'Name each source: a convention’s 1860 declaration and a historical account of Douglass’s 1863 actions.',
      'Select one detail each: the convention defended returning freedom seekers; Douglass demanded fair treatment for Black soldiers.',
      'Explain the contrast: one defended slavery’s power and the other sought wider freedom and rights. These sources do not represent every person.',
    ] },
    questions: [
      { card: 1, prompt: 'What was the secession declaration’s purpose in the source summary?', correct: 'To explain and defend the convention’s decision to leave the Union.', wrong: ['To report every South Carolinian’s equal vote.', 'To ask for the immediate end of slavery.', 'To recruit Black soldiers for Union service.'], explanation: 'The convention used its complaints about slavery disputes to justify secession.' },
      { card: 1, prompt: 'Which detail supports the claim that the convention defended slavery?', correct: 'It objected to resistance to returning freedom seekers.', wrong: ['It asked that all enslaved people receive equal wages.', 'It demanded citizenship for every Black soldier.', 'It praised abolitionists for ending forced labor.'], explanation: 'Demanding the return of people who escaped slavery supported slaveholders’ control.' },
      { card: 1, prompt: 'Why can the declaration not stand for every South Carolinian’s perspective?', correct: 'The convention did not give enslaved people equal participation or power.', wrong: ['It included a vote from every person in the state.', 'No other perspective could exist at that time.', 'It was a modern survey of all households.'], explanation: 'The declaration represents the convention’s position, and many people lacked political power in its creation.' },
      { card: 1, type: 'true-false', prompt: 'The lesson’s account of the declaration is a summary rather than a direct quotation.', correct: 'True', wrong: ['False'], explanation: 'The source label identifies an authored summary. The wording is not presented as the convention’s exact words.' },
      { card: 2, prompt: 'Why did Douglass encourage Black military service in the source summary?', correct: 'He connected service with the struggle for freedom and citizenship.', wrong: ['He wanted slavery protected permanently.', 'He believed Black soldiers should have fewer rights.', 'He wanted South Carolina to secede.'], explanation: 'Douglass saw participation in the Union effort as part of gaining freedom and citizenship.' },
      { card: 2, prompt: 'What does Douglass’s challenge to unequal pay show?', correct: 'Supporting Union service did not mean accepting unfair treatment.', wrong: ['He thought every soldier was already treated equally.', 'He wanted soldiers to lose pay.', 'He no longer cared about rights.'], explanation: 'He encouraged participation while pressing leaders to address discrimination.' },
      { card: 2, prompt: 'How does Douglass’s purpose differ from the convention’s purpose?', correct: 'He sought to end slavery and widen rights; the convention defended slavery.', wrong: ['Both sought slavery’s expansion.', 'He wanted to prevent Black citizenship.', 'Both sought exactly the same change.'], explanation: 'The summaries present opposing goals concerning slavery, power, and rights.' },
      { card: 2, prompt: 'Why is the Library of Congress account described as a secondary source?', correct: 'It is a later historical explanation of Douglass’s actions.', wrong: ['Pip wrote it during the Civil War.', 'It is a vote taken by the secession convention.', 'All information in a secondary source must be invented.'], explanation: 'A secondary source explains the past later. It can use evidence from the period.' },
      { card: 3, prompt: 'Which comparison uses evidence from both sources?', correct: 'The convention defended slavery, while Douglass linked Union service to freedom and citizenship.', wrong: ['Both sources describe the same wish to preserve slavery.', 'Neither source concerns government or rights.', 'All people in the country agreed with both sources.'], explanation: 'Each part of the comparison is supported by a different source’s stated purpose and actions.' },
      { card: 3, prompt: 'What economic division is connected to the two sources?', correct: 'Whether people’s labor would remain controlled through slavery.', wrong: ['Which bird should guide a lesson.', 'Whether all people lived in identical houses.', 'Whether source labels should include a date.'], explanation: 'Slavery controlled people’s work and the wealth produced by it, connecting the conflict to economic power.' },
      { card: 3, prompt: 'Which issue in the comparison is political?', correct: 'How government power would protect or deny people’s rights.', wrong: ['The color of the paper used for a document.', 'How loudly a source is read aloud.', 'The size of a historian’s desk.'], explanation: 'Political divisions involve government, laws, and rights.' },
      { card: 3, type: 'true-false', prompt: 'Two sources are enough to prove that everyone in two large regions held the same views.', correct: 'False', wrong: ['True'], explanation: 'The evidence supports claims about these perspectives. Whole populations contained many views and require more evidence.' },
      { card: 3, prompt: 'How could a historian strengthen a claim about views across many communities?', correct: 'Seek more sources from people in different positions and places.', wrong: ['Repeat one source and call it everyone’s view.', 'Remove the authors’ names and dates.', 'Ignore sources that show different experiences.'], explanation: 'A wider range of sources helps test whether a broader claim is supported.' },
    ],
  }),
];
