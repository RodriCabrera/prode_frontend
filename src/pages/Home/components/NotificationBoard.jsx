import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFixtureByStageId } from '../../../api/fixture';
import { getUserGroups } from '../../../api/groups';
import { getPredictions } from '../../../api/predictions';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import {
  CardContainer,
  CardTitle,
  CardWrapper,
  Text,
} from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';
import { FixtureTable } from '../../Fixture/FixtureTable';

function NotificationBoard() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [fixtureShortData, setFixtureShortData] = useState([]);

  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  useEffect(() => {
    setIsLoading(true);
    getUserGroups()
      .then((res) => setGroups(res.data))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!isEmpty(groups)) {
      getPredictions()
        .then((res) => setPredictions(res.data))
        .finally(() => setIsLoading(false));
    }
  }, [groups]);

  useEffect(() => {
    setIsLoading(true);
    getFixtureByStageId('GRUPOS')
      .then((res) => {
        setFixtureShortData(
          res.data.fixture
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .splice(0, 5)
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  const renderBoards = () => {
    // CONDITIONAL BOARD RENDERING ACCORDING TO USER STATUS:
    if (isLoading) return <Spinner />;
    // IF USER IS IN NO GROUPS:
    if (isEmpty(groups)) {
      return (
        <Text weight="500" align="center">
          Empezá por crear o unirte a un grupo: <Link to="/groups">Aca</Link>
        </Text>
      );
    }
    // IF USER IS IN GROUPS BUT HAS NO PREDICTIONS:
    if (!isEmpty(groups) && isEmpty(predictions))
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
  if (!isEmpty(predictions))
    return (
      <CardContainer id="next-5-card-container">
        <CardWrapper
          border="none"
          align="center"
          justify="center"
          fullWidth={isMobile}
        >
          <CardTitle id="next-5-title">Próximos partidos:</CardTitle>
          <FixtureTable
            id="next-5-card-container"
            data={fixtureShortData}
            isCompact
          />
        </CardWrapper>
        {/* TODO: manejar estilos más elegantemente? Otro styled component distinto para esto? */}
        <CardWrapper
          style={{ flexGrow: 1, maxWidth: '100%', width: 'initial' }}
        >
          <h1>Otros contenidos para la página de inicio?</h1>
        </CardWrapper>
      </CardContainer>
    );
  return (
    <CardContainer>
      <CardWrapper fullWidth>{renderBoards()}</CardWrapper>
    </CardContainer>
  );
}

export default NotificationBoard;
