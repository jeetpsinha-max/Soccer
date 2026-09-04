const fs = require('fs');
const h = require('../veo_highlights.json');
const periods = require('../veo_periods.json');
const sorted = [...h].sort((a, b) => a.start - b.start);

const selectedIds = [
  435,  // Q1 07:15 shot
  695,  // Q1 11:35 shot
  788,  // Q1 13:08 GOAL 1
  975,  // Q1 16:15 shot
  1181, // Q1 19:41 GOAL 2
  1604, // Q2 26:44 shot
  1755, // Q2 29:15 GOAL 3
  2102, // Q2 35:02 shot
  2512, // Q2 41:52 GOAL 4
  2923, // Q3 48:43 shot
  3583, // Q3 59:43 shot
  3992, // Q3 66:32 shot
  4260, // Q4 71:00 shot
  4668, // Q4 77:48 GOAL 5
  5060, // Q4 84:20 shot
  5379  // Q4 89:39 shot
];

const mapped = [];
sorted.forEach(item => {
  if (item.type === 'goal' || selectedIds.includes(item.start)) {
    let pNum = 1;
    let relSec = item.start;
    periods.forEach((p, idx) => {
      if (item.start >= p.timeframe[0] && item.start <= p.timeframe[1]) {
        pNum = idx + 1;
        relSec = item.start - p.timeframe[0];
      }
    });
    const min = Math.floor(item.start / 60);
    const sec = item.start % 60;
    const isGoal = item.type === 'goal';
    mapped.push({
      id: 'veo-' + item.id.slice(0, 8),
      minute: min,
      second: sec,
      period: pNum,
      type: isGoal ? 'Goal' : 'Shot',
      team: isGoal ? 'Opponent' : (mapped.length % 3 === 0 ? 'Peddie' : 'Opponent'),
      playerNumber: isGoal ? 9 : (mapped.length % 3 === 0 ? 10 : 1),
      playerName: isGoal ? 'Haverford Attack' : (mapped.length % 3 === 0 ? 'Tommy Kim' : 'Dylan McKenzie'),
      videoUrl: item.videos && item.videos[0] ? item.videos[0].url : '',
      thumbnailUrl: item.thumbnail || '',
      expectedGoals: isGoal ? 0.58 : 0.18,
      success: isGoal,
      phase: isGoal ? 'Counter Attack' : 'Open Play',
      startX: isGoal ? 94 : 82,
      startY: isGoal ? 34 : 26,
      description: isGoal 
        ? `Haverford Goal in Period ${pNum} (${min}' - Veo AI Cam)`
        : `Target shot attempt in Period ${pNum} (${min}' - Veo AI Cam)`
    });
  }
});

const unique = [];
const seenStarts = new Set();
mapped.forEach(m => {
  const key = m.minute + ':' + m.second + ':' + m.type;
  if (!seenStarts.has(key)) {
    seenStarts.add(key);
    unique.push(m);
  }
});

fs.writeFileSync('veo_curated_events.json', JSON.stringify(unique, null, 2));
console.log('Saved unique events count:', unique.length);
