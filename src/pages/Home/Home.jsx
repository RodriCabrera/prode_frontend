import styled from '@emotion/styled';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFixtureByStageId } from '../../api/fixture';
import { AuthContext } from '../../common/AuthProvider';
import { CardTitle, CardWrapper } from '../../common/common.styles';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { FixtureTable } from '../Fixture/FixtureTable';
import Countdown from './components/Countdown';
import { HomeGroups } from './components/HomeGroups';
import NotificationBoard from './components/NotificationBoard';

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
  align-items: center;
`;

function Home() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [fixtureShortData, setFixtureShortData] = useState([]);
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  useEffect(() => {
    getFixtureByStageId('GRUPOS')
      .then((res) => {
        setFixtureShortData(
          res.data.fixture
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .splice(0, 5)
        );
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    if (!userContext.user) {
      navigate('/auth');
    }
  }, [userContext]);

  return (
    <PageWrapper>
      <Countdown />
      <Row>
        <HomeGroups />
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
            fullWidth
          />
          <NotificationBoard id="notification-board" />
        </CardWrapper>
      </Row>
    </PageWrapper>
  );
}

export default Home;
