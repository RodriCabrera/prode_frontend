import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Leader from './Leader';
import { getUserGroups } from '../../../../api/groups';
import useCleanupController from '../../../../hooks/useCleanupController';
import { CardTitle, CardWrapper, Text } from '../../../../common/common.styles';
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
      ) : userGroups.length > 0 ? (
        userGroups.map((group) => (
          <Leader
            key={group.name}
            groupName={group.name}
            isUnique={userGroups.length < 2}
          />
        ))
      ) : (
        <>
          <Text weight="600" size="1rem" color='gray' align="center" margin="1rem">
            No perteneces a ningún grupo
          </Text>
          <Text align="center" margin="1rem 0">
            Puedes encontrar o crear uno desde <Link to="/groups/">esta sección</Link>
          </Text>
        </>
      )}
    </CardWrapper>
  );
};

export default LeaderBoard;
