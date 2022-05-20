import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BannerTitle, MiProdeContainer } from './Predictions.styles';

function Predictions() {
  // TODO Desactivar banners según las fechas.
  return (
    <MiProdeContainer id="mi-prode-container">
      <BannerTitle>Predicciones:</BannerTitle>
      <Link to="/predictions/results">RESULTADOS</Link>
      <Link to="/predictions/edit">PREDECIR</Link>
      <Outlet />
    </MiProdeContainer>
  );
}

export default Predictions;
