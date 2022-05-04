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

    -->(después) Un panel para crear un grupo o sumarse a uno con un código?
    --> Tarjetas para cada grupo con su puntaje 
    //    con un botón Predicciones (para editar) y otro Tabla de puntajes?
    --> Próximos partidos: partidos de la próxima fecha?
    --> Fixture completo abajo? O un link al mismo?
  */
  return (
    <PageWrapper>
      <h1>Home</h1>
    </PageWrapper>
  );
}

export default Home;
