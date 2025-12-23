import { astro } from 'iztro';

const result = astro.bySolar('2000-01-01', 0, '男', true);
const p = result.palaces[0];
console.log('Palace keys:', Object.keys(p));
console.log('majorStars is array?', Array.isArray(p.majorStars));
if (p.majorStars.length > 0) {
    console.log('Star keys:', Object.keys(p.majorStars[0]));
}
console.log('decadal keys:', Object.keys(p.decadal));
