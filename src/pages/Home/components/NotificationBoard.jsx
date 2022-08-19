import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { getPredictions } from '../../../api/predictions';
import { CardContainer, CardWrapper } from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';
import { NoPredictionNotification } from './NoPredictionNotification';

function NotificationBoard() {
  const [predictions, setPredictions] = useState([]);
  const [loadingCheck, setloadingCheck] = useState({
    predictions: false,
    fixture: false,
  });

  useEffect(() => {
    getPredictions()
      .then((res) => setPredictions(res.data))
      .finally(() => {
        setloadingCheck({ ...loadingCheck, predictions: true });
      });
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
      <CardWrapper fullWidth>{renderBoards()}</CardWrapper>
    </CardContainer>
  );
}

export default NotificationBoard;
