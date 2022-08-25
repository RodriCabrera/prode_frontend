import React, { useState, useEffect } from 'react';
import useCleanupController from '../../../hooks/useCleanupController';
import { GroupSelector } from '../../Predictions/components/GroupSelector';
import { getGroupScores } from '../../../api/groups';

export default function GroupScoreSelector({ userGroupList, setScores }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userGroup, setUserGroup] = useState(userGroupList[0]);
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    getGroupScores(userGroup.name, signal)
      .then((res) => {
        setScores(res);
      })
      .then(() => setIsLoading(false))
      .catch((err) => handleCancel(err) || setIsLoading(false))
    return cleanup;
  }, [userGroup])

  const handleGroupSelect = (group) => {
    setIsLoading(true);
    setUserGroup(group);
  };

  return (
    <GroupSelector
      isLoading={isLoading}
      selectedUserGroup={userGroup}
      userGroupList={userGroupList}
      handleGroupSelect={handleGroupSelect}
    />
  );
}
