import axios from 'axios';
import config from '../Constants';

export const createGroup = (groupName) => {
  return axios.post(`${config.API_URL}/group/create`, groupName, {
    withCredentials: true,
  });
};

export const joinGroup = (groupName) => {
  return axios.post(`${config.API_URL}/group/join`, groupName, {
    withCredentials: true,
  });
};

export const getGroupScores = (groupName) => {
  return axios.get(`${config.API_URL}/group/score`, groupName, {
    withCredentials: true,
  });
};
