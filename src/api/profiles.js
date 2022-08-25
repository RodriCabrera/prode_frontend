import { withCredentials } from './instances';

export const getProfile = (name = null, signal) => {
  if (!name) return withCredentials.get('/user/profile');
  return withCredentials.get(`/user/profile/${name}`, { signal });
};
export const getAvatars = (signal) => {
  return withCredentials.get('/user/avatars', { signal });
};
export const editProfile = (data, signal) => {
  return withCredentials.post('/user/edit', data, { signal });
};
