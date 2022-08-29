import React, { useState, useEffect } from 'react';
import Leader from './Leader';
import { getUserGroups } from '../../../../api/groups';
import useCleanupController from '../../../../hooks/useCleanupController';
import { CardTitle, CardWrapper } from '../../../../common/common.styles';
import { useIsMobile } from '../../../../hooks/useIsMobile';

function LeaderBoard() {
  const [userGroups, setUserGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const isMobile = useIsMobile();

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

  if (userGroups?.length === 0) return;

  return (
    <CardWrapper isMobile={isMobile} border={isMobile ? 'none' : undefined}>
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
    </CardWrapper>
  );
}

export default LeaderBoard;
