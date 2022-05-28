import { withoutCredentials } from './instances';

export const getFixture = (groupId = '', stageId = '') => {
  return withoutCredentials.get(
    `/fifa/fixture?groupId=${groupId}&stageId=${stageId}`
  );
};

export const getGroupStage = () => {
  return withoutCredentials.get('/fifa/fixture/groups');
};
