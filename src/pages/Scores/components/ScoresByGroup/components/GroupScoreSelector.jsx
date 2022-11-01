import React, { useState, useEffect } from "react";

import useCleanupController from "../../../../../hooks/useCleanupController";
import { GroupSelector } from "../../../../Predictions/components/GroupSelector";
import { getGroupScores } from "../../../../../api/groups";

export default function GroupScoreSelector({
  userGroupList,
  setScores,
  setIsLoadingScores,
}) {
  const [userGroup, setUserGroup] = useState(userGroupList[0]);
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    getGroupScores(userGroup?.name, signal)
      .then((res) => {
        setScores(res);
      })
      .then(() => {
        setIsLoadingScores(false);
      })
      .catch((err) => handleCancel(err));
    return cleanup;
  }, [userGroup]);

  const handleGroupSelect = (group) => {
    if (group.id === userGroup.id) return;
    setIsLoadingScores(true);
    setUserGroup(group);
  };

  return (
    <GroupSelector
      selectedUserGroup={userGroup}
      userGroupList={userGroupList}
      handleGroupSelect={handleGroupSelect}
    />
  );
}
