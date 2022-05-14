import { withCredentials } from './instances';

export const createGroup = (groupName) => {
  return withCredentials.post('/group/create', groupName);
};

export const joinGroup = (groupName) => {
  return withCredentials.post(`/group/join?groupName=${groupName}`);
};

export const leaveGroup = (groupName) => {
  return withCredentials.post(`/group/leave?groupName=${groupName}`);
};

export const getGroupScores = (groupName) => {
  return withCredentials.get(`/group/score?groupName=${groupName}`);
};

export const getUserGroups = () => {
  return withCredentials.get('/group');
};

export const getGroupData = (groupName) => {
  return withCredentials.get(`/group/?groupName=${groupName}`);
};
