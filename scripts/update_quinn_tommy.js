const fs = require('fs');

// --- 1. Update soccer-data.ts ---
let sd = fs.readFileSync('./src/lib/soccer-data.ts', 'utf8');

// Update Tommy Kim from number: 10 to number: 28
sd = sd.replace(
  `    id: 'p-kim-t',
    number: 10,
    name: 'Tommy Kim',`,
  `    id: 'p-kim-t',
    number: 28,
    name: 'Tommy Kim',`
);

// Update Quinn Wachtveitl from number: 4 to number: 10
sd = sd.replace(
  `    id: 'p-wachtveitl',
    number: 4,
    name: 'Quinn Wachtveitl',`,
  `    id: 'p-wachtveitl',
    number: 10,
    name: 'Quinn Wachtveitl',`
);

// Formations updates:
// In 4-3-3:
sd = sd.replace(
  `{ position: 'CB', playerNumber: 4, playerName: 'Wachtveitl', xPct: 62, yPct: 78, role: 'Ball-Playing Stopper' },`,
  `{ position: 'CB', playerNumber: 10, playerName: 'Wachtveitl', xPct: 62, yPct: 78, role: 'Ball-Playing Stopper' },`
);
sd = sd.replace(
  `{ position: 'CAM', playerNumber: 10, playerName: 'Kim T (C)', xPct: 66, yPct: 42, role: 'Advanced Free 10 (Captain)' },`,
  `{ position: 'CAM', playerNumber: 28, playerName: 'Kim T (C)', xPct: 66, yPct: 42, role: 'Advanced Free 10 (Captain)' },`
);

// In 4-2-3-1:
sd = sd.replace(
  `{ position: 'CB', playerNumber: 4, playerName: 'Wachtveitl', xPct: 62, yPct: 80, role: 'Center Back' },`,
  `{ position: 'CB', playerNumber: 10, playerName: 'Wachtveitl', xPct: 62, yPct: 80, role: 'Center Back' },`
);
sd = sd.replace(
  `{ position: 'CAM', playerNumber: 10, playerName: 'Kim T (C)', xPct: 50, yPct: 38, role: 'Central Playmaker (Captain)' },`,
  `{ position: 'CAM', playerNumber: 28, playerName: 'Kim T (C)', xPct: 50, yPct: 38, role: 'Central Playmaker (Captain)' },`
);

// In 3-5-2:
sd = sd.replace(
  `{ position: 'CB', playerNumber: 4, playerName: 'Wachtveitl', xPct: 50, yPct: 80, role: 'Sweeper / Libero' },`,
  `{ position: 'CB', playerNumber: 10, playerName: 'Wachtveitl', xPct: 50, yPct: 80, role: 'Sweeper / Libero' },`
);
sd = sd.replace(
  `{ position: 'CAM', playerNumber: 10, playerName: 'Kim T (C)', xPct: 66, yPct: 44, role: 'Attacking Midfielder (Captain)' },`,
  `{ position: 'CAM', playerNumber: 28, playerName: 'Kim T (C)', xPct: 66, yPct: 44, role: 'Attacking Midfielder (Captain)' },`
);

// In 4-4-2:
sd = sd.replace(
  `{ position: 'CB', playerNumber: 4, playerName: 'Wachtveitl', xPct: 62, yPct: 80, role: 'Covering Center Back' },`,
  `{ position: 'CB', playerNumber: 10, playerName: 'Wachtveitl', xPct: 62, yPct: 80, role: 'Covering Center Back' },`
);
sd = sd.replace(
  `{ position: 'CAM', playerNumber: 10, playerName: 'Kim T (C)', xPct: 50, yPct: 34, role: 'Diamond Tip Playmaker (Captain)' },`,
  `{ position: 'CAM', playerNumber: 28, playerName: 'Kim T (C)', xPct: 50, yPct: 34, role: 'Diamond Tip Playmaker (Captain)' },`
);

// Description strings
sd = sd.replaceAll('Captain #10 Tommy Kim', 'Captain #28 Tommy Kim');
sd = sd.replaceAll('Captain Tommy Kim (#10)', 'Captain Tommy Kim (#28)');
sd = sd.replaceAll('Captain Tommy Kim (#10)', 'Captain Tommy Kim (#28)');

// In MATCH_EVENTS_VEO_HAVERFORD, Tommy Kim events playerNumber: 10 -> 28
sd = sd.replaceAll(
  `    "playerNumber": 10,\n    "playerName": "Tommy Kim (C)",`,
  `    "playerNumber": 28,\n    "playerName": "Tommy Kim (C)",`
);

// In MATCH_EVENTS_LIVE_BLAIR
sd = sd.replace(
  `{ id: 'ev-5', minute: 28, second: 10, team: 'Peddie', playerNumber: 4, playerName: 'Quinn Wachtveitl'`,
  `{ id: 'ev-5', minute: 28, second: 10, team: 'Peddie', playerNumber: 10, playerName: 'Quinn Wachtveitl'`
);
sd = sd.replace(
  `{ id: 'ev-7', minute: 35, second: 0, team: 'Peddie', playerNumber: 4, playerName: 'Quinn Wachtveitl'`,
  `{ id: 'ev-7', minute: 35, second: 0, team: 'Peddie', playerNumber: 10, playerName: 'Quinn Wachtveitl'`
);
sd = sd.replace(
  `{ id: 'ev-11', minute: 74, second: 0, team: 'Peddie', playerNumber: 10, playerName: 'Tommy Kim'`,
  `{ id: 'ev-11', minute: 74, second: 0, team: 'Peddie', playerNumber: 28, playerName: 'Tommy Kim'`
);

// Set piece playbook
sd = sd.replaceAll('Quinn Wachtveitl (#4)', 'Quinn Wachtveitl (#10)');
sd = sd.replaceAll('Wachtveitl (#4)', 'Wachtveitl (#10)');
sd = sd.replaceAll('#4 Quinn Wachtveitl', '#10 Quinn Wachtveitl');
sd = sd.replaceAll('Tommy Kim (#10)', 'Tommy Kim (#28)');
sd = sd.replaceAll("taker: '#10 Tommy Kim'", "taker: '#28 Tommy Kim'");

fs.writeFileSync('./src/lib/soccer-data.ts', sd, 'utf8');
console.log('soccer-data.ts updated!');

// --- 2. Update soccer-agents.ts ---
let sa = fs.readFileSync('./src/lib/agents/soccer-agents.ts', 'utf8');
sa = sa.replace(
  `ourPlayer: '#4 Quinn Wachtveitl (CB)',`,
  `ourPlayer: '#10 Quinn Wachtveitl (CB)',`
);
sa = sa.replace(
  `ourPlayer: '#10 Tommy Kim (CAM/ST)',`,
  `ourPlayer: '#28 Tommy Kim (CAM/ST)',`
);
fs.writeFileSync('./src/lib/agents/soccer-agents.ts', sa, 'utf8');
console.log('soccer-agents.ts updated!');

// --- 3. Update page.tsx ---
let hp = fs.readFileSync('./src/app/page.tsx', 'utf8');
hp = hp.replaceAll('Tommy Kim (#10)', 'Tommy Kim (#28)');
fs.writeFileSync('./src/app/page.tsx', hp, 'utf8');
console.log('src/app/page.tsx updated!');

// --- 4. Update tactics/page.tsx ---
let tp = fs.readFileSync('./src/app/dashboard/tactics/page.tsx', 'utf8');
tp = tp.replaceAll('#10 Tommy Kim (CAM)', '#28 Tommy Kim (CAM)');
fs.writeFileSync('./src/app/dashboard/tactics/page.tsx', tp, 'utf8');
console.log('tactics/page.tsx updated!');

// --- 5. Update call-sheet/page.tsx ---
let cs = fs.readFileSync('./src/app/dashboard/call-sheet/page.tsx', 'utf8');
cs = cs.replaceAll('#4 Quinn Wachtveitl', '#10 Quinn Wachtveitl');
cs = cs.replaceAll('#10 Tommy Kim (CAM)', '#28 Tommy Kim (CAM)');
fs.writeFileSync('./src/app/dashboard/call-sheet/page.tsx', cs, 'utf8');
console.log('call-sheet/page.tsx updated!');
