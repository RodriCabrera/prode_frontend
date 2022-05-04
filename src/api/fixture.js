import axios from 'axios';
import config from '../Constants';

// eslint-disable-next-line import/prefer-default-export
export const getFixture = (groupId, stageId) => {
  return axios.get(
    `${config.API_URL}
    /fifa/fixture?groupId=${groupId || ''}&stageId=${stageId || ''}`
  );
};

export const getGroupStage = () => {
  return axios.get(`${config.API_URL}/fifa/groups`);
};
