let scores = [5, 6, 8, 9, 2, 10, 3, 7, 4, 1];
let players = [
  "Jugador 5",
  "Jugador 6",
  "Jugador 8",
  "Jugador 9",
  "Jugador 2",
  "Jugador 10",
  "Jugador 3",
  "Jugador 7",
  "Jugador 4",
  "Jugador 1",
];

function evalPerformance(scores, players) {
  const outstandingScores = scores.filter((score) => score > 7);
  const outstandingPlayers = outstandingScores.map(
    (score) => players[scores.indexOf(score)]
  );
  const regularScores = scores.filter(
    (score) => !outstandingScores.includes(score)
  );
  const regularPlayers = regularScores.map(
    (score) => players[scores.indexOf(score)]
  );

  return {
    outstandingScores,
    outstandingPlayers,
    regularScores,
    regularPlayers,
  };
}

const result = evalPerformance(scores, players);
console.log(result);
