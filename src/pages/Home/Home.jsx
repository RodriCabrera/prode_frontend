import styled from '@emotion/styled';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../common/AuthProvider';
import Countdown from './components/Countdown';
import LeaderBoard from './components/LeaderBoard';

// TODO : Ver si esta nos sirve para hacer las tablas:
// https://react-table.tanstack.com/docs/quick-start

/*
  Jamboard con diseño:
  https://jamboard.google.com/d/1RjaVVilMR1_6Na-FjjAT0aM5Y5_-YOayeoVAMX9BzQo/viewer
  */

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
`;

function Home() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContext.user) {
      navigate('/login');
    }
  }, [userContext]);

  return (
    <PageWrapper>
      <Row>
        {/* <Keypad /> */}
        <LeaderBoard />
      </Row>
      <Countdown />
    </PageWrapper>
  );
}

export default Home;
