/* eslint-disable no-extend-native */
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
  return data;
};

export const formatPredictionsToDisplay = (predictionsRaw) => {
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

// eslint-disable-next-line func-names
Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};
export const numberToGroupLetter = (number) => {
  if (number === undefined) {
    return null;
  }
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  return letters[number.mod(8)];
};
export const groupNumberMod = (number) => {
  if (number === undefined) {
    return null;
  }
  return number.mod(8);
};

export const getErrorMessageForMatch = (errors, matchId) => {
  const error = errors.find((err) => (err.id === matchId ? err : null));
  return error ? error.message : null;
};

export const checkPredictionResult = (
  stageData,
  groupNumber,
  matchId,
  homeOrAway,
  predictionAway,
  predictionHome
) => {
  const matchData = stageData.find((match) => match.id === matchId);
  const teamResult = matchData[`${homeOrAway}Score`];

  function getScoreStatus() {
    const resultAway = matchData.awayScore;
    const resultHome = matchData.homeScore;
    if (predictionAway === resultAway && predictionHome === resultHome) {
      return 'full';
    }
    if (
      (predictionAway > predictionHome && resultAway > resultHome) ||
      (predictionAway < predictionHome && resultAway < resultHome) ||
      (predictionAway === predictionHome && resultAway === resultHome)
    ) {
      return 'half';
    }
    return 'none';
  }

  const teamPrediction =
    homeOrAway === 'home' ? predictionHome : predictionAway;

  if (teamResult === null || teamPrediction === undefined) {
    return 'silver';
  }
  if (getScoreStatus() === 'full') {
    return 'lightgreen';
  }
  if (getScoreStatus() === 'half') {
    return '#FFFF66';
  }

  return 'tomato';
};
