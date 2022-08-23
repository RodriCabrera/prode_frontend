import { withoutCredentials } from './instances';

export const getFixture = (groupId = '', stageId = '', signal) => {
  return withoutCredentials.get(
    `/fifa/fixture?groupId=${groupId}&stageId=${stageId}`,
    { signal }
  );
};
export const getFixtureByStageId = (stageId = '', signal) => {
  return withoutCredentials.get(`/fifa/fixture?stageId=${stageId}`, { signal });
};

export const getGroupStage = (signal) => {
  return withoutCredentials.get('/fifa/fixture/groups', { signal });
};

export const getFixtureStatus = (signal) => {
  return withoutCredentials.get('/fifa/fixture-status', { signal });
};
