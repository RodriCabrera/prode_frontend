import { withCredentials } from './instances';

export const getAllPredictions = (signal) => {
  return withCredentials.get('/predictions', { signal });
};

export const createPredictions = (predictions) => {
  return withCredentials.post('/predictions', predictions);
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

export const getPredictions = (userGroupId = '', stage = '', signal) => {
  return withCredentials.get(
    `/predictions?userGroupId=${userGroupId}&stage=${stage}`,
    { signal }
  );
};

export const getPredictionCompletePercentage = (userGroupId = '', signal) => {
  return withCredentials.get(
    `/predictions/percentage?userGroupId=${userGroupId}`,
    { signal }
  );
};

export const getFirstStagePredictionsByGroup = (
  userGroupId = '',
  groupLeter = '',
  signal
) => {
  return withCredentials.get(
    `/predictions?userGroupId=${userGroupId}&group=${groupLeter}`,
    { signal }
  );
};

export const getOtherUserPredictionsByGroup = (userId, userGroupId, signal) => {
  return withCredentials.get(
    `/predictions/profile/${userId}?userGroupId=${userGroupId}`,
    { signal }
  );
};

export const getRandomUnpredictedMatch = (signal) => {
  return withCredentials.get('/predictions/random-missing', { signal });
};
