import { api } from "./instances";

export const createGroup = (groupName, signal) => {
  return api.post("/group/create", groupName, { signal });
};

export const joinGroup = (groupName, signal) => {
  return api.post(`/group/join?groupName=${groupName}`, { signal });
};

export const leaveGroup = (groupName, signal) => {
  return api.post(`/group/leave?groupName=${groupName}`, { signal });
};

export const deleteGroup = (groupId, signal) => {
  return api.delete(`/group/delete?userGroupId=${groupId}`, { signal });
};

export const getGroupScores = (groupName, signal) => {
  return api.get(`/group/score?groupName=${groupName}`, { signal });
};

export const getUserGroups = (signal) => {
  return api.get("/group", { signal });
};

export const getGroupData = (groupName, signal) => {
  return api.get(`/group/?groupName=${groupName}`, { signal });
};

export const getGroupRules = (groupName, signal) => {
  return api.get(`/group/rules?groupName=${groupName}`, { signal });
};
