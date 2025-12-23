import { astro } from 'iztro';

const result = astro.bySolar('2000-01-01', 0, '男', true);
console.log('Result type:', typeof result);
console.log('Keys:', Object.keys(result));
console.log('Has palaces property?', 'palaces' in result);
console.log('Has palace property?', 'palace' in result);
if ('palaces' in result) {
    console.log('palaces is array?', Array.isArray(result.palaces));
}
// Try to see if there is a method to get palaces
if (typeof result.palace === 'function') {
    console.log('result.palace() returns:', result.palace());
}
