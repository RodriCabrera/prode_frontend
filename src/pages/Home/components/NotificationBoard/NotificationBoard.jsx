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
    // YES GROUPS - NO PREDICTIONS:
    if (loadingCheck.predictions && isEmpty(predictions)) {
      return <NoPredictionNotification />;
    }

    return <Spinner />;
  }

  if (!isEmpty(predictions) && loadingCheck.predictions) return null;
  // <CardContainer id="next-5-card-container">
  /* TODO: manejar estilos más elegantemente? Otro styled component distinto para esto? */
  /* <CardWrapper
          style={{ flexGrow: 1, maxWidth: '100%', width: 'initial' }}
        >
          <h1>Otros contenidos para la página de inicio?</h1>
        </CardWrapper> */
  // </CardContainer>

  return (
    <CardContainer>
      <CardWrapper width="100%" isMobile border="none">
        {renderBoards()}
      </CardWrapper>
    </CardContainer>
  );
}

export default NotificationBoard;
