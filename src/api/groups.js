import { withCredentials } from './instances';

export const createGroup = (groupName, signal) => {
  return withCredentials.post('/group/create', groupName, { signal });
};

export const joinGroup = (groupName, signal) => {
  return withCredentials.post(`/group/join?groupName=${groupName}`, { signal });
};

export const leaveGroup = (groupName, signal) => {
  return withCredentials.post(`/group/leave?groupName=${groupName}`, { signal });
};

export const getGroupScores = (groupName, signal) => {
  return withCredentials.get(`/group/score?groupName=${groupName}`, { signal });
};

export const getUserGroups = (signal) => {
  return withCredentials.get('/group', { signal });
};

export const getGroupData = (groupName, signal) => {
  return withCredentials.get(`/group/?groupName=${groupName}`, { signal });
};

export const getGroupRules = (groupName, signal) => {
  return withCredentials.get(`/group/rules?groupName=${groupName}`, { signal });
};
