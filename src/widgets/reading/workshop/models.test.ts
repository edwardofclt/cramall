import { expect,test } from 'vitest';
import { experiences } from './experiences';
import { readingSources } from './sources';
import { walkthroughs } from './walkthroughs';
import { readingWorkshopActivities,readingWorkshopSpeechText } from '../../../content/reading/workshopActivities';
import { rainRecords } from './WeatherSurface';
import { validReadingPlan } from './rehearsal-desk';

test('every immutable experience has an independently authored reachable complete route and complete verbatim evidence',()=>{
 expect(Object.keys(experiences)).toHaveLength(12);
 for(const path of walkthroughs) {
  const experience=experiences[path.activity];expect(experience.phases).toHaveLength(path.phases.length);
  experience.phases.forEach((phase,i)=>{
   expect(phase.valid(path.phases[i],path.phases),`${path.activity}: ${phase.title}`).toBe(true);
   expect(phase.valid({},path.phases),`${path.activity}: ${phase.title} rejects a blank draft`).toBe(false);
   expect(new Set(phase.fields.map(f=>f.id)).size).toBe(phase.fields.length);
   for(const field of phase.fields)for(const option of field.options)if(option.quote)expect(readingSources[path.activity].text,`${path.activity}: ${option.quote}`).toContain(option.quote);
  });
 }
});

test('exact manifest placements and source-only speech have no answer-key or next-stage runtime dependency',()=>{
 const ids=['reading-u01-l02-c2','reading-u02-l03-c3','reading-u07-l02-c3','reading-u08-l01-c3','reading-u08-l02-c3','reading-u09-l02-c3','reading-u10-l01-c3','reading-u10-l03-c3','reading-u11-l01-c3','reading-u11-l03-c3','reading-u11-l04-c3','reading-u11-l05-c3'];
 expect(readingWorkshopActivities.map(a=>a.cardId)).toEqual(ids);
 for(const activity of readingWorkshopActivities){
  expect(activity.cardId.startsWith(activity.lessonId)).toBe(true);
  expect(activity.coach.intro.map(line=>line.speaker)).toEqual(['guide','kid']);
  expect(readingWorkshopSpeechText(activity.config)).toEqual([readingSources[activity.config.activity].title,readingSources[activity.config.activity].text]);
 }
});

test('all supplied rain measurements are exact and source prose agrees with map/table backing data',()=>{
 expect(rainRecords).toEqual([{time:'8 a.m.',west:0.3,east:0.0},{time:'noon',west:0.9,east:0.4}]);
 for(const row of rainRecords)expect(readingSources['connect-weather-report'].text).toContain(`at ${row.time}, West ${row.west.toFixed(1)} and East ${row.east.toFixed(1)}`);
});

test('multiple reading interpretations are supported, but unsupported loudness is not',()=>{
 for(const tone of ['uncertainty','surprise'])expect(validReadingPlan({line:'question',clue:'question',emphasis:'found',pause:'inside',tone})).toBe(true);
 expect(validReadingPlan({line:'excited',clue:'excited',emphasis:'it',pause:'end',tone:'excitement'})).toBe(true);
 for(const tone of ['relief','gentle'])expect(validReadingPlan({line:'relief',clue:'relief',emphasis:'last',pause:'end',tone})).toBe(true);
 expect(validReadingPlan({line:'relief',clue:'relief',emphasis:'last',pause:'end',tone:'loud'})).toBe(false);
});
