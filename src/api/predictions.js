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
export const getPredictionsByGroup = (groupId) => {
  return withCredentials.get(`/predictions?userGroupId=${groupId}`);
};

export const getPredictionsByStage = (stageId) => {
  return withCredentials.get(`/predictions/history?stageId=${stageId}`);
};
