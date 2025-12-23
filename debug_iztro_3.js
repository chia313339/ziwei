import { astro } from 'iztro';

const result = astro.bySolar('2000-01-01', 0, '男', true);
console.log('solarDate:', result.solarDate);
console.log('lunarDate:', result.lunarDate);
console.log('gender:', result.gender);
console.log('fiveElementsClass:', result.fiveElementsClass);
console.log('soul (MingZhu):', result.soul);
console.log('body (ShenZhu):', result.body);

// Check if they are strings or objects with toString
console.log('solarDate type:', typeof result.solarDate);
