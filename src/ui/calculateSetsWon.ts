export const calculateSetsWon = (scores: number[]): number => {
  let setsWon = 0;
  let team1Score = 0;
  let team2Score = 0;

  for (let i = 0; i < scores.length; i++) {
    if (scores[i] === 1) {
      team1Score++;
    } else if (scores[i] === 2) {
      team2Score++;
    }

    if (
      (team1Score >= 25 || team2Score >= 25) &&
      Math.abs(team1Score - team2Score) >= 2
    ) {
      if (team1Score > team2Score) {
        setsWon++;
        team1Score = 0;
        team2Score = 0;
      } else {
        setsWon++;
        team1Score = 0;
        team2Score = 0;
      }
    }
  }

  return setsWon;
};
