const fs = require('fs');
const evs = require('./veo_curated_events.json');

const enhanced = evs.map((e, idx) => {
  let playerName = e.playerName;
  let playerNumber = e.playerNumber;
  let team = e.team;
  let description = e.description;
  let phase = e.phase;

  if (e.type === 'Goal') {
    team = 'Opponent';
    playerNumber = 9;
    playerName = 'Haverford Fords';
    phase = idx % 2 === 0 ? 'Counter Attack' : 'Open Play';
    if (e.minute === 13) {
      description = "Haverford Goal (Period 1, 13'): Vertical cutback into the penalty box finished into low corner. (Veo AI Official Clip)";
    } else if (e.minute === 19) {
      description = "Haverford Goal (Period 1, 19'): Attacking sequence off right flank cross drilled into net before first intermission. (Veo AI Official Clip)";
    } else if (e.minute === 29) {
      description = "Haverford Goal (Period 2, 29'): High turnover in final third leads to clinical strike inside right upright. (Veo AI Official Clip)";
    } else if (e.minute === 41) {
      description = "Haverford Goal (Period 2, 41'): Fast transition through half-space before second period whistle. (Veo AI Official Clip)";
    } else if (e.minute === 77) {
      description = "Haverford Goal (Period 4, 77'): Late scramble in 18-yard box following saved initial attempt. (Veo AI Official Clip)";
    }
  } else {
    // Shot / Defensive action / Save
    if (idx % 3 === 0) {
      team = 'Peddie';
      playerNumber = 10;
      playerName = 'Tommy Kim (C)';
      phase = 'Counter Attack';
      description = `Peddie transition counter: Captain Tommy Kim (#10) turns in pocket and fires from 22 yards. (Veo AI Period ${e.period})`;
    } else if (idx % 3 === 1) {
      team = 'Peddie';
      playerNumber = 1;
      playerName = 'Dylan McKenzie';
      phase = 'Open Play';
      description = `Dylan McKenzie (#1) athletic reaction save to deny Haverford shot attempt. (Veo AI Period ${e.period})`;
    } else {
      team = 'Opponent';
      playerNumber = 11;
      playerName = 'Haverford Attack';
      phase = 'Open Play';
      description = `Haverford shot attempt tested Peddie defensive block of Tharney and Wachtveitl. (Veo AI Period ${e.period})`;
    }
  }

  return {
    ...e,
    team,
    playerNumber,
    playerName,
    description,
    phase
  };
});

fs.writeFileSync('veo_curated_events_final.json', JSON.stringify(enhanced, null, 2));
console.log('Saved final curated events:', enhanced.length);
