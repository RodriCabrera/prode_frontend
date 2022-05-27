import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserGroups } from '../../../api/groups';
import { getPredictions } from '../../../api/predictions';
import {
  CardContainer,
  CardWrapper,
  Text,
} from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';

function NotificationBoard() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getUserGroups()
      .then((res) => setGroups(res))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPredictions()
      .then((res) => setPredictions(res))
      .finally(() => setIsLoading(false));
  }, []);

  const renderBoards = () => {
    // CONDITIONAL BOARD RENDERING ACCORDING TO USER STATUS
    if (isLoading) return <Spinner />;
    // IF USER IS IN NO GROUPS:
    if (isEmpty(groups.data)) {
      return (
        <Text weight="500" align="center">
          Empezá por crear o unirte a un grupo: <Link to="/groups">Aca</Link>
        </Text>
      );
    }
    // IF USER IS IN GROUPS:
    if (isEmpty(predictions.data))
      return (
        <>
          <Text>Aún no hiciste ninguna predicción.</Text>
          <Text>
            {' '}
            Hacelo desde{' '}
            <Link to="/predictions/edit?mode=edit">esta sección</Link>
          </Text>
        </>
      );
    return '';
  };
  if (!isEmpty(predictions.data)) return undefined;
  return (
    <CardContainer>
      <CardWrapper fullWidth>{renderBoards()}</CardWrapper>
    </CardContainer>
  );
}

export default NotificationBoard;
