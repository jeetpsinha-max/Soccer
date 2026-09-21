const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '../src/lib/soccer-data.ts');
let content = fs.readFileSync(target, 'utf8');

// Replace unescaped 6'3" or similar height patterns
content = content.replace(/6'3"/g, '6-foot-3');
content = content.replace(/6'2"/g, '6-foot-2');
content = content.replace(/6'1"/g, '6-foot-1');
content = content.replace(/6'0"/g, '6-foot-0');
content = content.replace(/6'4"/g, '6-foot-4');
content = content.replace(/5'11"/g, '5-foot-11');
content = content.replace(/5'10"/g, '5-foot-10');

fs.writeFileSync(target, content, 'utf8');
console.log('Replaced height strings');
