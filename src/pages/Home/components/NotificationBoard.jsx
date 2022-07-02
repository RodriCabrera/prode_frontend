import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { getFixtureByStageId } from '../../../api/fixture';
import { getUserGroups } from '../../../api/groups';
import { getPredictions } from '../../../api/predictions';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import {
  CardContainer,
  CardTitle,
  CardWrapper,
} from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';
import { FixtureTable } from '../../Fixture/FixtureTable';
import { NoGroupNotification } from './NoGroupNotification';
import { NoPredictionNotification } from './NoPredictionNotification';

function NotificationBoard() {
  const [groups, setGroups] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [fixtureShortData, setFixtureShortData] = useState([]);
  const [loadingCheck, setloadingCheck] = useState({
    groups: false,
    predictions: false,
    fixture: false,
  });

  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  useEffect(() => {
    getUserGroups()
      .then((res) => setGroups(res.data))
      .finally(() => {
        setloadingCheck({ ...loadingCheck, groups: true });
      });
  }, []);

  useEffect(() => {
    if (!isEmpty(groups)) {
      getPredictions()
        .then((res) => setPredictions(res.data))
        .finally(() => {
          setloadingCheck({ ...loadingCheck, predictions: true });
        });
    }
  }, [groups]);

  useEffect(() => {
    getFixtureByStageId('GRUPOS')
      .then((res) => {
        setFixtureShortData(
          res.data.fixture
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .splice(0, 5)
        );
      })
      .finally(() => {
        setloadingCheck({ ...loadingCheck, fixture: true });
      });
  }, []);

  function renderBoards() {
    // NO GROUPS (NO PREDICTIONS):
    if (loadingCheck.groups && isEmpty(groups)) {
      return <NoGroupNotification />;
    }

    // YES GROUPS - NO PREDICTIONS:
    if (
      loadingCheck.groups &&
      loadingCheck.predictions &&
      isEmpty(predictions)
    ) {
      return <NoPredictionNotification />;
    }

    return <Spinner />;
  }

  if (!isEmpty(predictions) && loadingCheck.predictions)
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
