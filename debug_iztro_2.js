import { astro } from 'iztro';

const result = astro.bySolar('2000-01-01', 0, '男', true);
console.log('palaces type:', typeof result.palaces);
console.log('is palaces array?', Array.isArray(result.palaces));
console.log('horoscope type:', typeof result.horoscope);

if (typeof result.horoscope === 'function') {
    const h = result.horoscope();
    console.log('horoscope() result keys:', Object.keys(h));
} else {
    console.log('horoscope keys:', Object.keys(result.horoscope));
}
