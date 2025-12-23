import { astro } from 'iztro';

const result = astro.bySolar('2000-01-01', 0, '男', true);
const palace = result.palaces[0];

if (palace.majorStars.length > 0) {
    const star = palace.majorStars[0];
    console.log('Star Keys:', Object.keys(star));
    console.log('Star Name:', star.name);
    console.log('Star Brightness:', star.brightness);
    console.log('Star Mutagen:', star.mutagen);
    // Check for any description fields?
}
