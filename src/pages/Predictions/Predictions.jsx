import React from 'react';
import { Banner, BannerTitle, MiProdeContainer } from './Predictions.styles';

function Predictions() {
  return (
    <MiProdeContainer id="mi-prode-container">
      <BannerTitle>Mirá las predicciones que ya hiciste:</BannerTitle>
      <Banner>
        <div>
          <BannerTitle>GRUPOS</BannerTitle>
          <p>Ver/Editar</p>
        </div>
        <p>pts</p>
      </Banner>
      <Banner>
        <div>
          <BannerTitle>OCTAVOS</BannerTitle>
          <p>Ver/Editar</p>
        </div>
        <p>pts</p>
      </Banner>
      <Banner>
        <div>
          <BannerTitle>CUARTOS</BannerTitle>
          <p>Ver/Editar</p>
        </div>
        <p>pts</p>
      </Banner>
      <Banner>
        <div>
          <BannerTitle>SEMIFINALES</BannerTitle>
          <p>Ver/Editar</p>
        </div>
        <p>pts</p>
      </Banner>
      <Banner>
        <div>
          <BannerTitle>FINAL</BannerTitle>
          <p>Ver/Editar</p>
        </div>
        <p>pts</p>
      </Banner>
    </MiProdeContainer>
  );
}

export default Predictions;
