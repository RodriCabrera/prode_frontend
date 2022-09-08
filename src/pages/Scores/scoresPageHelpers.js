export const getCountByResultType = (predictions, groupScoring) => {
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
