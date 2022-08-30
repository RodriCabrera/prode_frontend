import React, { useState, useEffect } from 'react';
import Leader from './Leader';
import { getUserGroups } from '../../../../api/groups';
import useCleanupController from '../../../../hooks/useCleanupController';
import { CardTitle, CardWrapper } from '../../../../common/common.styles';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import { BallLoader } from '../../../../common/Spinner/BallLoader';

const LeaderBoard = () => {
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

  return (
    <CardWrapper
      width="290px"
      border={isMobile ? 'none' : undefined}
      minHeight="300px"
    >
      <CardTitle>Ranking de usuarios</CardTitle>
      {isLoading || !userGroups ? (
        <BallLoader />
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
};

export default LeaderBoard;
