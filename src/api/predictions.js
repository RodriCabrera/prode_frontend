import { withCredentials } from './instances';

export const getAllPredictions = () => {
  return withCredentials.get('/predictions');
};

export const createPredictions = (predictions) => {
  return withCredentials.get('/predictions', predictions);
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
export const getPredictions = (groupId) => {
  return withCredentials.get(`/predictions?groupId=${groupId}`);
};
