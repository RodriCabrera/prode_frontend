import { withCredentials } from './instances';

export const getAllPredictions = () => {
  return withCredentials.get('/predictions');
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

export const getPredictions = (userGroupId = '', stage = '') => {
  return withCredentials.get(
    `/predictions?userGroupId=${userGroupId}&stage=${stage}`
  );
};

export const getFirstStagePredictionsByGroup = (group) => {
  return withCredentials.get(`/predictions?group=${group}`);
};

export const getOtherUserPredictionsByGroup = (userId, userGroupId) => {
  return withCredentials.get(
    `/predictions/profile/${userId}?userGroupId=${userGroupId}`
  );
};
