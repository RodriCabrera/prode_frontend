import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '../../common/common.styles';
import { BannerTitle, MiProdeContainer } from './Predictions.styles';

function Predictions() {
  return (
    <MiProdeContainer id="mi-prode-container">
      <BannerTitle>Predicciones:</BannerTitle>
      <Button>
        <Link to="/predictions/results">RESULTADOS</Link>
      </Button>
      <Button>
        <Link to="/predictions/edit">PREDECIR</Link>
      </Button>
      <Outlet />
    </MiProdeContainer>
  );
}

export default Predictions;
