import axios from 'axios';
import config from '../Constants';

export const createUser = (userData) => {
  return axios.post(`${config.API_URL}/auth/email/create`, userData, {
    withCredentials: true,
  });
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

export const forgotPassword = (email) => {
  return axios.post(`${config.API_URL}/auth/new-password`, email);
};

export const changePassword = (password) => {
  return axios.post(`${config.API_URL}/auth/change-password`, password, {
    withCredentials: true,
  });
};
