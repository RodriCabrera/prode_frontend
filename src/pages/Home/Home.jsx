import styled from '@emotion/styled';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../common/AuthProvider';
import { CardWrapper } from '../../common/common.styles';
import LeaderBoard from './components//LeaderBoard/LeaderBoard';
import Countdown from './components/Countdown';
import { HomeGroups } from './components/HomeGroups';
import NotificationBoard from './components/NotificationBoard/NotificationBoard';
import QuickPrediction from './components/QuickPredictions/QuickPrediction';
import { useIsMobile } from '../../hooks/useIsMobile';
import ShortFixture from './components/ShortFixture';

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
  const isMobile = useIsMobile();

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
      <NotificationBoard id="notification-board" />
      <Row>
        <HomeGroups />
        <CardWrapper border={isMobile ? 'none' : undefined} isMobile={isMobile}>
          <ShortFixture />
        </CardWrapper>
        <CardWrapper isMobile={isMobile} border={isMobile ? 'none' : undefined}>
          <LeaderBoard />
        </CardWrapper>
        <QuickPrediction />
      </Row>
    </PageWrapper>
  );
}

export default Home;
