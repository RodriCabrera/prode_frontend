import { api } from './instances';

export const getProfile = (name = null, signal) => {
  if (!name) return api.get('/user/profile');
  return api.get(`/user/profile/${name}`, { signal });
};
export const getAvatars = (signal) => {
  return api.get('/user/avatars', { signal });
};
export const editProfile = (data, signal) => {
  return api.post('/user/edit', data, { signal });
};
