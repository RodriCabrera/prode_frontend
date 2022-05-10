import axios from 'axios';
import config from '../Constants';

export const createGroup = (groupName) => {
  return axios.post(`${config.API_URL}/group/create`, groupName, {
    withCredentials: true,
  });
};
