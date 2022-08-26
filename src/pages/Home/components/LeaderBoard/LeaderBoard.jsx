import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import Leader from './Leader';
import { getUserGroups } from '../../../../api/groups';
import useCleanupController from '../../../../hooks/useCleanupController';
import { CardTitle } from '../../../../common/common.styles';
const LeaderBoardWrapper = styled.div`
  /* width: 100%; */
`;

function LeaderBoard() {
  const [userGroups, setUserGroups] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    setIsLoading(true);
    getUserGroups(signal)
      .then((res) => {
        setUserGroups(res?.data?.slice(0, 5));
      })
      .catch((err) => handleCancel(err))
      .finally(() => setIsLoading(false));
    return cleanup;
  }, []);

  return (
    <LeaderBoardWrapper id="leaderboard-wrapper">
      <CardTitle>
        {userGroups?.length > 1 ? 'Punteros por grupo' : 'Puntero del grupo'}
      </CardTitle>
      {isLoading || !userGroups ? (
        <div>Loading leaderboard...</div>
      ) : (
        userGroups.map((group) => (
          <Leader
            key={group.name}
            groupName={group.name}
            isUnique={userGroups.length < 2}
          />
        ))
      )}
    </LeaderBoardWrapper>
  );
}

export default LeaderBoard;
