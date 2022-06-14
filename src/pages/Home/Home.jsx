import styled from '@emotion/styled';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../common/AuthProvider';
import Countdown from './components/Countdown';
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

  useEffect(() => {
    if (!userContext.user) {
      navigate('/auth');
    }
  }, [userContext]);

  return (
    <PageWrapper>
      {/* <Row> */}
      {/* <Keypad /> */}
      {/* </Row> */}
      <Countdown />
      <Row>
        <NotificationBoard id="notification-board" />
      </Row>
    </PageWrapper>
  );
}

export default Home;
