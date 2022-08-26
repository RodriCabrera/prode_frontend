import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { getPredictions } from '../../../../api/predictions';
import { CardContainer, CardWrapper } from '../../../../common/common.styles';
import { Spinner } from '../../../../common/Spinner/Spinner';
import { NoPredictionNotification } from './NoPredictionNotification';
import useCleanupController from '../../../../hooks/useCleanupController';

function NotificationBoard() {
  const [predictions, setPredictions] = useState([]);
  const [loadingCheck, setloadingCheck] = useState({
    predictions: false,
    fixture: false,
  });
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    getPredictions(undefined, undefined, signal)
      .then((res) => setPredictions(res.data))
      .catch((err) => handleCancel(err))
      .finally(() => {
        setloadingCheck({ ...loadingCheck, predictions: true });
      });
    return cleanup;
  }, []);

  function renderBoards() {
    // TODO: Implementar esta situación
    // NO GROUP - NO PREDICTIONS:
    // <NoGroupNotification />;
    // YES GROUPS - NO PREDICTIONS:
    if (loadingCheck.predictions && isEmpty(predictions)) {
      return <NoPredictionNotification />;
    }

    return <Spinner />;
  }

  if (!isEmpty(predictions) && loadingCheck.predictions) return null;

  return (
    <CardContainer>
      <CardWrapper width="100%" isMobile border="none">
        {renderBoards()}
      </CardWrapper>
    </CardContainer>
  );
}

export default NotificationBoard;
