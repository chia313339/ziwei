import { astro } from 'iztro';

const result = astro.bySolar('1990-01-01', 0, '男', true);
const palace = result.palaces[0];

console.log('--- Palace Keys ---');
console.log(Object.keys(palace));

console.log('--- Checking Specific Star Arrays ---');
if (palace.changsheng12) {
    console.log('changsheng12:', palace.changsheng12);
}
if (palace.yearStars) {
    console.log('yearStars:', palace.yearStars); // Check generic year stars
}
if (palace.doctor12) {
    console.log('doctor12 (Boschi):', palace.doctor12);
}
if (palace.jiangqian12) {
    console.log('jiangqian12:', palace.jiangqian12); 
}
if (palace.suiqian12) {
    console.log('suiqian12:', palace.suiqian12);
}

// Check other potential arrays for Xun Kong (旬空)
console.log('--- Adjective Stars ---');
console.log(palace.adjectiveStars.map(s => s.name));

console.log('--- Checking for specific stars ---');
// Iterate all keys to find where '旬空' might be hiding if not in above
for (const key in palace) {
    if (Array.isArray(palace[key])) {
        const found = palace[key].find(item => item.name === '旬空' || item === '旬空');
        if (found) console.log(`Found 旬空 in ${key}`);
    }
}
