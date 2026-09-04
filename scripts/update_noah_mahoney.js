const fs = require('fs');

// --- 1. Update soccer-data.ts ---
let sd = fs.readFileSync('./src/lib/soccer-data.ts', 'utf8');

// A. Update Noah Eldessouky: number 3 -> 12
sd = sd.replace(
  `    id: 'p-eldessouky',
    number: 3,
    name: 'Noah Eldessouky',`,
  `    id: 'p-eldessouky',
    number: 12,
    name: 'Noah Eldessouky',`
);

// B. Jackson Shavel: number 12 -> 4 (since Noah is 12)
sd = sd.replace(
  `    id: 'p-shavel',
    number: 12,
    name: 'Jackson Shavel',`,
  `    id: 'p-shavel',
    number: 4,
    name: 'Jackson Shavel',`
);

// C. Remove Connor Mahoney completely from PEDDIE_ROSTER_2026_2027
// Match p-mahoney block
const mahoneyBlockRegex = /  {\s*id:\s*'p-mahoney'[\s\S]*?recruitmentNotes:[\s\S]*?},\n/;
sd = sd.replace(mahoneyBlockRegex, '');

// D. Replace Mahoney with Nicholas Chen (#17) in Formations
// In 4-3-3:
sd = sd.replace(
  `{ position: 'LB', playerNumber: 3, playerName: 'Eldessouky (C)', xPct: 15, yPct: 74, role: 'Inverted Wingback (Captain)' },`,
  `{ position: 'LB', playerNumber: 12, playerName: 'Eldessouky (C)', xPct: 15, yPct: 74, role: 'Inverted Wingback (Captain)' },`
);
sd = sd.replace(
  `{ position: 'RB', playerNumber: 2, playerName: 'Mahoney', xPct: 85, yPct: 74, role: 'Overlapping Fullback' },`,
  `{ position: 'RB', playerNumber: 17, playerName: 'Chen', xPct: 85, yPct: 74, role: 'Overlapping Fullback' },`
);

// In 4-2-3-1:
sd = sd.replace(
  `{ position: 'LB', playerNumber: 3, playerName: 'Eldessouky (C)', xPct: 16, yPct: 75, role: 'Fullback (Captain)' },`,
  `{ position: 'LB', playerNumber: 12, playerName: 'Eldessouky (C)', xPct: 16, yPct: 75, role: 'Fullback (Captain)' },`
);
sd = sd.replace(
  `{ position: 'RB', playerNumber: 2, playerName: 'Mahoney', xPct: 84, yPct: 75, role: 'Fullback' },`,
  `{ position: 'RB', playerNumber: 17, playerName: 'Chen', xPct: 84, yPct: 75, role: 'Fullback' },`
);

// In 3-5-2:
sd = sd.replace(
  `{ position: 'LB', playerNumber: 3, playerName: 'Eldessouky (C)', xPct: 12, yPct: 52, role: 'Left Wing-Back (Captain)' },`,
  `{ position: 'LB', playerNumber: 12, playerName: 'Eldessouky (C)', xPct: 12, yPct: 52, role: 'Left Wing-Back (Captain)' },`
);
sd = sd.replace(
  `{ position: 'RB', playerNumber: 2, playerName: 'Mahoney', xPct: 88, yPct: 52, role: 'Right Wing-Back' },`,
  `{ position: 'RB', playerNumber: 17, playerName: 'Chen', xPct: 88, yPct: 52, role: 'Right Wing-Back' },`
);

// In 4-4-2:
sd = sd.replace(
  `{ position: 'LB', playerNumber: 3, playerName: 'Eldessouky (C)', xPct: 16, yPct: 76, role: 'Attacking Left Fullback (Captain)' },`,
  `{ position: 'LB', playerNumber: 12, playerName: 'Eldessouky (C)', xPct: 16, yPct: 76, role: 'Attacking Left Fullback (Captain)' },`
);
sd = sd.replace(
  `{ position: 'RB', playerNumber: 2, playerName: 'Mahoney', xPct: 84, yPct: 76, role: 'Right Fullback' },`,
  `{ position: 'RB', playerNumber: 17, playerName: 'Chen', xPct: 84, yPct: 76, role: 'Right Fullback' },`
);

// Descriptions
sd = sd.replace(
  '(Captain #3 Noah Eldessouky, #2 Connor Mahoney)',
  '(Captain #12 Noah Eldessouky, #17 Nicholas Chen)'
);
sd = sd.replace(
  'Captain Noah Eldessouky (#3) and Connor Mahoney (#2)',
  'Captain Noah Eldessouky (#12) and Nicholas Chen (#17)'
);

// In MATCH_EVENTS_LIVE_BLAIR
sd = sd.replace(
  `{ id: 'ev-10', minute: 73, second: 40, team: 'Peddie', playerNumber: 3, playerName: 'Noah Eldessouky'`,
  `{ id: 'ev-10', minute: 73, second: 40, team: 'Peddie', playerNumber: 12, playerName: 'Noah Eldessouky'`
);

// Set piece playbook
sd = sd.replaceAll('Eldessouky (#3)', 'Eldessouky (#12)');

fs.writeFileSync('./src/lib/soccer-data.ts', sd, 'utf8');
console.log('soccer-data.ts updated!');

// --- 2. Update page.tsx ---
let hp = fs.readFileSync('./src/app/page.tsx', 'utf8');
hp = hp.replaceAll('Noah Eldessouky (#3)', 'Noah Eldessouky (#12)');
fs.writeFileSync('./src/app/page.tsx', hp, 'utf8');
console.log('page.tsx updated!');

// --- 3. Update call-sheet/page.tsx ---
let cs = fs.readFileSync('./src/app/dashboard/call-sheet/page.tsx', 'utf8');
cs = cs.replaceAll('#3 Noah Eldessouky (C)', '#12 Noah Eldessouky (C)');
cs = cs.replaceAll('#12 Jackson Shavel (CM)', '#4 Jackson Shavel (CM)');
fs.writeFileSync('./src/app/dashboard/call-sheet/page.tsx', cs, 'utf8');
console.log('call-sheet/page.tsx updated!');

// --- 4. Update tactics/page.tsx ---
let tp = fs.readFileSync('./src/app/dashboard/tactics/page.tsx', 'utf8');
tp = tp.replaceAll('#3 Noah Eldessouky (LB)', '#12 Noah Eldessouky (LB)');
fs.writeFileSync('./src/app/dashboard/tactics/page.tsx', tp, 'utf8');
console.log('tactics/page.tsx updated!');
