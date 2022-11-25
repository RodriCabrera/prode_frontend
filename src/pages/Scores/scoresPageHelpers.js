export const getCountByResultType = (predictions, groupScoring, t) => {
  if (predictions.length < 1) return [];
  const result = {
    perfect: {
      name: t("resultExact"),
      ammount: 0,
      color: "green",
      type: "FULL",
    },
    winner: {
      name: t("resultWinner"),
      ammount: 0,
      color: "gold",
      type: "WINNER",
    },
    lost: {
      name: t("resultNone"),
      ammount: 0,
      color: "tomato",
      type: "NONE",
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

function getMatchList(data) {
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
}

export const filterPredictionsForFixture = (fixture, predictions) => {
  const matches = getMatchList(fixture);
  const matchIds = matches.map((m) => m.id);
  return predictions.filter((prediction) =>
    matchIds.includes(prediction.matchId)
  );
};

export const groupUsersByResultType = (predictions, type, groupData) => {
  const targetScore = groupData.rules.scoring[type];
  const targetUsers = predictions
    .filter((prediction) => prediction.score === targetScore)
    .map((p) => p.userId);
  return groupData.members.filter((user) => targetUsers.includes(user.id));
};

function standarizeDateString(datestring) {
  return new Date(datestring).toLocaleDateString("en-en");
}

function groupPredictionsByDate(fixture, predictions) {
  const matches = getMatchList(fixture);
  const predictionsByDate = {};
  matches.forEach((match) => {
    let date = standarizeDateString(match.date);
    const matchPredictions = predictions.filter(
      (prediction) => prediction.matchId === match.id
    );
    if (matchPredictions.length > 0) {
      if (predictionsByDate[date]) {
        predictionsByDate[date].push(...matchPredictions);
      } else {
        predictionsByDate[date] = matchPredictions;
      }
    }
  });
  return predictionsByDate;
}

export const calcPointsScoredByDate = (fixture, predictions) => {
  const predictionsByDate = groupPredictionsByDate(fixture, predictions);
  const result = [];
  for (let [key, value] of Object.entries(predictionsByDate)) {
    let newObj = {};
    newObj[key] = value.reduce((acc, curr) => (acc += curr.score), 0);
    result.push(newObj);
  }
  return result;
};

export const calcScoreProgressByDate = (fixture, predictions, groupData) => {
  const predictionsByDate = groupPredictionsByDate(fixture, predictions);
  const result = [];
  const memberAcc = groupData.members.map((member) => ({
    ...member,
    score: 0,
  }));
  for (let [key, value] of Object.entries(predictionsByDate)) {
    let newObj = { date: key };
    for (let member of memberAcc) {
      newObj[member.name] = value
        .filter((prediction) => prediction.userId === member.id)
        .reduce((acc, curr) => (acc += curr.score), member.score);
      member.score = newObj[member.name];
    }
    result.push(newObj);
  }
  return result;
};

export const pairUsernameWithAvatar = (members) => {
  const result = {};
  members.forEach((member) => (result[member.name] = member.avatar));
  return result;
};
