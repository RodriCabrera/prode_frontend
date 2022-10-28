import { api } from "./instances";

export const getFixture = (groupId = "", stageId = "", signal) => {
  return api.get(`/fifa/fixture?groupId=${groupId}&stageId=${stageId}`, {
    signal,
  });
};

export const getFixtureByStageId = (stageId = "", signal) => {
  return api.get(`/fifa/fixture?stageId=${stageId}`, { signal });
};

export const getGroupStage = (signal) => {
  return api.get("/fifa/fixture/groups", { signal });
};

export const getFixtureStatus = (signal) => {
  return api.get("/fifa/fixture-status", { signal });
};

export const getNextMatches = (quantity = "", signal) => {
  return api.get(`/fifa/next-matches?quantity=${quantity}`, {
    signal,
  });
};
