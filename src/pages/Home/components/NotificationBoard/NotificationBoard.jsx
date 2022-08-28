import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { getPredictionCount } from '../../../../api/predictions';
import { CardContainer, CardWrapper } from '../../../../common/common.styles';
import { Spinner } from '../../../../common/Spinner/Spinner';
import { NoPredictionNotification } from './NoPredictionNotification';
import useCleanupController from '../../../../hooks/useCleanupController';

function NotificationBoard() {
  const [hasPredictions, setHasPredictions] = useState(false);
  // const [loadingCheck, setloadingCheck] = useState({
  //   predictions: false,
  //   fixture: false,
  // });
  const [isLoading, setIsLoading] = useState(true)
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    setIsLoading(true);
    getPredictionCount(signal)
      .then((res) => res.data?.userPredictions > 0 && setHasPredictions(true))
      .catch((err) => handleCancel(err))
      .finally(() => {
        setIsLoading(false)
      });
    return cleanup;
  }, []);

  function renderBoards() {
    // TODO: Implementar esta situación
    // NO GROUP - NO PREDICTIONS:
    // <NoGroupNotification />;
    // YES GROUPS - NO PREDICTIONS:
    if (!isLoading && !hasPredictions) {
      return <NoPredictionNotification />;
    }

    return <Spinner />;
  }

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
