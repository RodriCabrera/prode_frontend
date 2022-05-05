import axios from 'axios';
import config from '../Constants';

export const createUser = (userData) => {
  return axios.post(`${config.API_URL}/auth/email/create`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${config.API_URL}/auth/email`, userData, {
    withCredentials: true,
  });
};

export const logoutUser = () => {
  return axios.post(
    `${config.API_URL}/auth/logout`,
    {},
    { withCredentials: true }
  );
};
