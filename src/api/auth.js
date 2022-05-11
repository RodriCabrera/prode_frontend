import { withCredentials, withoutCredentials } from './instances';

export const createUser = (userData) => {
  return withCredentials.post(`/auth/email/create`, userData);
};

export const loginUser = (userData) => {
  return withCredentials.post(`/auth/email`, userData);
};

export const logoutUser = () => {
  return withCredentials.post(`/auth/logout`);
};

export const forgotPassword = (email) => {
  return withoutCredentials.post(`/auth/new-password`, email);
};

export const changePassword = (password) => {
  return withCredentials.post(`/auth/change-password`, password);
};
