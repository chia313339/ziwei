
import { astro } from 'iztro';

const result = astro.bySolar('2025-12-24', 0, '男', true);
console.log('Chinese Date:', result.chineseDate);
console.log('Full Result Keys:', Object.keys(result));
