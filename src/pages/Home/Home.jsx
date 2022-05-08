import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../common/AuthProvider';
import { PageWrapper } from '../../common/common.styles';
import Countdown from './components/Countdown';
import Keypad from './components/Keypad';
import LeaderBoard from './components/LeaderBoard';

function Home() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContext.user) {
      navigate('/login');
    }
  }, [userContext]);

  // TODO : Ver si esta nos sirve para hacer las tablas:
  // https://react-table.tanstack.com/docs/quick-start

  /*
  Jamboard con diseño:
  https://jamboard.google.com/d/1RjaVVilMR1_6Na-FjjAT0aM5Y5_-YOayeoVAMX9BzQo/viewer
  */

  return (
    <PageWrapper>
      <Keypad />
      <LeaderBoard />
      <div>
        <h3>Tabla proximos partidos o Coundtown para inicio mundial</h3>
        <Countdown />
      </div>
    </PageWrapper>
  );
}

export default Home;
