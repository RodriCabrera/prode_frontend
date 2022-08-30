import styled from '@emotion/styled';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../common/AuthProvider';
import { Button } from '../../common/common.styles';
import LeaderBoard from './components//LeaderBoard/LeaderBoard';
import NotificationBoard from './components/NotificationBoard/NotificationBoard';
import QuickPrediction from './components/QuickPredictions/QuickPrediction';
import ShortFixture from './components/ShortFixture';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1100px;
  width: 100%;
`;
const Column = styled.div`
  gap: 2rem;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Row = styled.div`
  gap: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;

function Home() {
  const [openSection, setOpenSection] = useState('fixture');
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let subscribed = true;

    if (!userContext.user && subscribed) {
      navigate('/auth');
    }
    return () => (subscribed = false);
  }, [userContext]);

  return (
    <PageWrapper>
      <NotificationBoard id="notification-board" />
      <Row>
        <Column>
          <Button
            tertiary={openSection === 'fixture'}
            width="334px"
            onClick={() => setOpenSection('fixture')}
          >
            Próximos partidos
          </Button>
          {openSection === 'fixture' && <ShortFixture />}
        </Column>
        <Column>
          <Button
            tertiary={openSection === 'leaders'}
            width="334px"
            onClick={() => setOpenSection('leaders')}
          >
            Punteros de grupo
          </Button>
          {openSection === 'leaders' && <LeaderBoard />}
        </Column>
        <Column>
          <Button
            tertiary={openSection === 'quick'}
            width="334px"
            onClick={() => setOpenSection('quick')}
          >
            Predicción al paso
          </Button>
          {openSection === 'quick' && <QuickPrediction />}
        </Column>
      </Row>
    </PageWrapper>
  );
}

export default Home;
