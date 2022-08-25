import styled from '@emotion/styled';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFixtureByStageId } from '../../api/fixture';
import { AuthContext } from '../../common/AuthProvider';
import { CardTitle, CardWrapper } from '../../common/common.styles';
import { FixtureTable } from '../FixturePage/components/FixtureTable';
import LeaderBoard from './components//LeaderBoard/LeaderBoard';
import Countdown from './components/Countdown';
import { HomeGroups } from './components/HomeGroups';
import NotificationBoard from './components/NotificationBoard/NotificationBoard';
import QuickPrediction from './components/QuickPredictions/QuickPrediction';
import useCleanupController from '../../hooks/useCleanupController';
import { useIsMobile } from '../../hooks/useIsMobile';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1100px;
  width: 100%;
`;

const Row = styled.div`
  gap: 2rem;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
`;

function Home() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [fixtureShortData, setFixtureShortData] = useState([]);
  const [showFixture, setShowFixture] = useState(false);
  const isMobile = useIsMobile();
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    setShowFixture(false);
    getFixtureByStageId('GRUPOS', signal)
      .then((res) => {
        setFixtureShortData(
          res.data.fixture
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .splice(0, 5)
        );
        setShowFixture(true);
      })
      .catch((err) => handleCancel(err))
      .finally(() => {});
    return cleanup;
  }, []);

  useEffect(() => {
    let subscribed = true;

    if (!userContext.user && subscribed) {
      navigate('/auth');
    }
    return () => (subscribed = false);
  }, [userContext]);

  return (
    <PageWrapper>
      <Countdown />
      <Row>
        <HomeGroups />
        <CardWrapper border={isMobile ? 'none' : undefined} isMobile={isMobile}>
          <NotificationBoard id="notification-board" />
          {showFixture && (
            <div>
              <CardTitle>Próximos partidos:</CardTitle>
              <FixtureTable
                id="next-5-card-container"
                data={fixtureShortData}
                isCompact
                fullWidth
              />
            </div>
          )}
        </CardWrapper>
        <CardWrapper
          isMobile={isMobile}
          border={isMobile ? 'none' : undefined}>
          <LeaderBoard />
        </CardWrapper>
        <QuickPrediction />
      </Row>
    </PageWrapper>
  );
}

export default Home;
