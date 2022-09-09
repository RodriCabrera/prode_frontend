export const getCountByResultType = (predictions, groupScoring) => {
  if (predictions.length < 1) return [];
  const result = {
    perfect: {
      name: 'exacto',
      ammount: 0,
      color: 'green',
    },
    winner: {
      name: 'ganador',
      ammount: 0,
      color: 'gold',
    },
    lost: {
      name: 'no suma',
      ammount: 0,
      color: 'tomato',
    },
  };
  predictions.forEach((prediction) => {
    if (prediction.score === groupScoring.NONE) return result.lost.ammount++;
    if (prediction.score === groupScoring.WINNER)
      return result.winner.ammount++;
    if (prediction.score === groupScoring.FULL) return result.perfect.ammount++;
  });
  return [result.perfect, result.winner, result.lost];
};

export const getMatchList = (data) => {
  if (data.length < 1) return [];
  if (data[0]?.home) return data;
  return data
    .map((item) => {
      if (item.groups) {
        return item.groups.map((group) => group.matches).flat();
      }
      return item.matches;
    })
    .flat();
};

export const filterPredictionsForFixture = (predictions, matches) => {
  const matchIds = matches.map((m) => m.id);
  return predictions.filter((prediction) =>
    matchIds.includes(prediction.matchId)
  );
};
