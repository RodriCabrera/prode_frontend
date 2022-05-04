import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../common/AuthProvider';
import { PageWrapper } from '../common/common.styles';

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

  // TODO: Pensar el diseño de la pagina:
  /*
    Que va a haber en el Home?
    Empieza de una a completar predicciones?
  */
  return (
    <PageWrapper>
      <h1>Home</h1>
    </PageWrapper>
  );
}

export default Home;
