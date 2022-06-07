import { withCredentials } from './instances';

export const getProfile = (name = null) => {
  return withCredentials.get(`/user/profile/${name}`);
};
export const getAvatars = () => {
  return withCredentials.get('/user/avatars');
};
export const editProfile = (data) => {
  return withCredentials.post('/user/edit', data);
};
