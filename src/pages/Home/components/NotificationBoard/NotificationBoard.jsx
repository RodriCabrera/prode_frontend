import React, { useEffect, useState } from 'react';
import { getPredictionCount } from '../../../../api/predictions';
import { CardContainer, CardWrapper } from '../../../../common/common.styles';
import { Spinner } from '../../../../common/Spinner/Spinner';
import { NoPredictionNotification } from './NoPredictionNotification';
import useCleanupController from '../../../../hooks/useCleanupController';
import { NoGroupNotification } from './NoGroupNotification';
import { useGetUserGroupsData } from '../../../../hooks/useGetUserGroupsData';

function NotificationBoard() {
  const [hasPredictions, setHasPredictions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const { userGroupList, isLoadingUserGroupsData } = useGetUserGroupsData();

  useEffect(() => {
    setIsLoading(true);
    getPredictionCount(signal)
      .then((res) => res.data?.userPredictions > 0 && setHasPredictions(true))
      .catch((err) => handleCancel(err))
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, []);
  if (isLoading) return null;

  function renderBoards() {
    // NO GROUP - NO PREDICTIONS:
    if (!isLoadingUserGroupsData && userGroupList.length === 0) {
      return <NoGroupNotification />;
    }
    // YES GROUPS - NO PREDICTIONS:
    else if (!isLoading && !hasPredictions) {
      return <NoPredictionNotification />;
    } else return null;
  }

  // YES GROUP - YES PREDICTION:
  if (hasPredictions && !isLoading) return null;

  return (
    <CardContainer>
      <CardWrapper width="100%" isMobile border="none">
        {renderBoards()}
      </CardWrapper>
    </CardContainer>
  );
}

export default NotificationBoard;
