const fs = require('fs');

let soccerData = fs.readFileSync('./src/lib/soccer-data.ts', 'utf8');

// 1. Invert Massimo and Owen numbers
// Change Massimo to #16 and add DNP note
soccerData = soccerData.replace(
  `    id: 'p-sheinin',
    number: 8,
    name: 'Massimo Sheinin',`,
  `    id: 'p-sheinin',
    number: 16,
    name: 'Massimo Sheinin',`
);

soccerData = soccerData.replace(
  `recruitmentNotes: 'Elected Student Council Leader. Metronomic tempo setter, elite vision and college soccer prospect.'`,
  `recruitmentNotes: 'Elected Student Council Leader. Metronomic tempo setter, elite vision and college soccer prospect. (Did not play in season opener vs. Haverford / DNP).'`
);

// Change Owen Bonchev to #8
soccerData = soccerData.replace(
  `    id: 'p-bonchev',
    number: 16,
    name: 'Owen Bonchev',
    classYear: 'Sophomore',
    gradYear: 2029,
    position: 'CAM',`,
  `    id: 'p-bonchev',
    number: 8,
    name: 'Owen Bonchev',
    classYear: 'Sophomore',
    gradYear: 2029,
    position: 'CM',
    secondaryPosition: 'CAM',`
);

soccerData = soccerData.replace(
  `recruitmentNotes: 'Creative attacking midfielder with quick footwork.'`,
  `recruitmentNotes: 'Starting #8 left central midfielder in 4-4-2 diamond midfield. Creative playmaker with elite vision and tight-space passing.'`
);

// 2. In formations, replace Sheinin with Bonchev for #8
soccerData = soccerData.replaceAll("playerName: 'Sheinin'", "playerName: 'Bonchev'");
soccerData = soccerData.replace(
  "interior mezzalas #8 Massimo Sheinin and Captain #14 Rayyaan Mohiuddin",
  "interior mezzalas #8 Owen Bonchev and Captain #14 Rayyaan Mohiuddin"
);

// 3. In set pieces and match events, replace #8 Massimo Sheinin with #8 Owen Bonchev
soccerData = soccerData.replaceAll("'Massimo Sheinin'", "'Owen Bonchev'");
soccerData = soccerData.replaceAll("#8 Massimo Sheinin", "#8 Owen Bonchev");

fs.writeFileSync('./src/lib/soccer-data.ts', soccerData, 'utf8');
console.log('Successfully updated soccer-data.ts: #8 is Owen Bonchev, Massimo is #16 / DNP');
