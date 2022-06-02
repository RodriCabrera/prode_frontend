import { isEmpty } from 'lodash';

export const formatPredictionsToPost = (predictionsRaw, userGroupId) => {
  //   const predictionsRawExample = {
  //     '400128082-away': 1,
  //     '400128082-home': 2,
  //     '400235448-away': 1,
  //     '400235448-home': 0,
  //     '400235449-away': 3,
  //     '400235449-home': 6,
  //     '400235450-away': 4,
  //     '400235450-home': 3,
  //     '400235451-away': 2,
  //     '400235451-home': 2,
  //     '400235452-away': 1,
  //     '400235452-home': 0,
  //   };

  //   const predictionDataShape = {
  //     multiple: true,
  //     groupId,
  //     predictions: [
  //       {
  //         groupId,
  //         prediction: {
  //           matchId: String,
  //           homeScore: Number,
  //           awayScore: Number,
  //         },
  //       },
  //     ],
  //   };
  if (isEmpty(predictionsRaw)) return null;

  const predictionKeys = Object.keys(predictionsRaw);

  const predictionsBatch = predictionKeys
    .map((key) => {
      let homeScore;
      let awayScore;
      const matchId = key.split('-')[0];
      const homeOrAway = key.split('-')[1];

      if (homeOrAway === 'home') {
        homeScore = predictionsRaw[key];
        awayScore = predictionsRaw[`${matchId}-away`];
      } else if (homeOrAway === 'away') {
        homeScore = predictionsRaw[`${matchId}-home`];
        awayScore = predictionsRaw[key];
      }
      return {
        matchId,
        homeScore,
        awayScore,
        userGroupId,
      };
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.matchId === value.matchId)
    );

  const data = { multiple: true, userGroupId, prediction: predictionsBatch };
  console.log('Batch de prediciones a postear:', data);
  return data;
};

export const formatPredictionsToDisplay = (predictionsRaw) => {
  console.log('formatPredictionsToDisplay', predictionsRaw);
  if (isEmpty(predictionsRaw)) return null;

  const data = predictionsRaw.map((prediction) => {
    const { matchId } = prediction;

    return {
      [`${matchId}-away`]: prediction.awayScore,
      [`${matchId}-home`]: prediction.homeScore,
    };
  });

  return Object.assign({}, ...data);
};

// TODO: Debe haber una mejor forma que el switch para esta funcion:
// TODO: Dejo una propuesta
export const numberToGroupLetter = (number) => {
  let groupLetter;
  // const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  // return letters[number % 8];
  switch (number) {
    case 0:
      groupLetter = 'A';
      break;
    case 1:
      groupLetter = 'B';
      break;
    case 2:
      groupLetter = 'C';
      break;
    case 3:
      groupLetter = 'D';
      break;
    case 4:
      groupLetter = 'E';
      break;
    case 5:
      groupLetter = 'F';
      break;
    case 6:
      groupLetter = 'G';
      break;
    case 7:
      groupLetter = 'H';
      break;
    default:
      break;
  }
  return groupLetter;
};

export const getErrorMessageForMatch = (errors, matchId) => {
  const error = errors.find((err) => (err.id === matchId ? err : null));
  return error ? error.message : null;
};
