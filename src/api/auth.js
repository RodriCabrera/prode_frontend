import axios from 'axios';
import config from '../Constants';

const withCredentials = axios.create({
  withCredentials: true,
  baseURL: config.API_URL,
});

export const createUser = (userData) => {
  return axios.post(`${config.API_URL}/auth/email/create`, userData, {
    withCredentials: true,
  });
};

// * PASANDO LOS REQUESTS A LA NUEVA INSTANCE:
export const loginUser = (userData) => {
  return withCredentials.post(`/auth/email`, userData);
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
