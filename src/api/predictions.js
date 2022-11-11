import { api } from "./instances";

export const getAllPredictions = (signal) => {
  return api.get("/predictions", { signal });
};

export const createPredictions = (predictions) => {
  return api.post("/predictions", predictions);
};
/*
* createPredictions recibe:
* SIMPLE
body {
 groupId: String,
 prediction: {
   matchId: String,
   homeScore: Number,
  awayScore: Number
  }
} 
*MULTIPLE:
body {
  multiple: “true”,
  predictions: [
     lista de objetos como el de arriba
    ]
}
*/

export const createExtraPredictions = (userGroupId, predictions, signal) => {
  return api.post(
    `/predictions/extra?userGroupId=${userGroupId}`,
    predictions,
    { signal }
  );
};

export const getExtraPredictions = (userGroupId, own, signal) => {
  return api.get(`/predictions/extra?userGroupId=${userGroupId}&own=${own}`, {
    signal,
  });
};

export const getPredictions = (
  userGroupId = "",
  stage = "",
  group = "",
  own = "true",
  signal
) => {
  return api.get(
    `/predictions?userGroupId=${userGroupId}&stage=${stage}&group=${group}&own=${own}`,
    { signal }
  );
};

export const getPredictionCount = (signal) => {
  return api.get("/predictions/length", { signal });
};

export const getPredictionCompletePercentage = (userGroupId = "", signal) => {
  return api.get(`/predictions/percentage?userGroupId=${userGroupId}`, {
    signal,
  });
};

export const getFirstStagePredictionsByGroup = (
  userGroupId = "",
  groupLeter = "",
  signal
) => {
  return api.get(
    `/predictions?userGroupId=${userGroupId}&group=${groupLeter}`,
    { signal }
  );
};

export const getOtherUserPredictionsByGroup = (userId, userGroupId, signal) => {
  return api.get(`/predictions/profile/${userId}?userGroupId=${userGroupId}`, {
    signal,
  });
};

export const getRandomUnpredictedMatch = (signal) => {
  return api.get("/predictions/random-missing", { signal });
};
