import React from 'react';
import { Banner, BannerTitle, MiProdeContainer } from './MiProde.styles';

function MiProde() {
  return (
    <MiProdeContainer id="mi-prode-container">
      <BannerTitle>
        Mirá las predicciones que ya hiciste y tu puntaje hasta el momento
      </BannerTitle>
      <Banner>
        <div>
          <BannerTitle>GRUPOS</BannerTitle>
          <p>Ver/Editar</p>
        </div>
        <p>30pts</p>
      </Banner>
      <Banner>
        <div>
          <BannerTitle>OCTAVOS</BannerTitle>
          <p>Ver/Editar</p>
        </div>
        <p>30pts</p>
      </Banner>
      <Banner>
        <div>
          <BannerTitle>CUARTOS</BannerTitle>
          <p>Ver/Editar</p>
        </div>
        <p>30pts</p>
      </Banner>
      <Banner>
        <div>
          <BannerTitle>SEMIFINALES</BannerTitle>
          <p>Ver/Editar</p>
        </div>
        <p>30pts</p>
      </Banner>
      <Banner>
        <div>
          <BannerTitle>FINAL</BannerTitle>
          <p>Ver/Editar</p>
        </div>
        <p>30pts</p>
      </Banner>
    </MiProdeContainer>
  );
}

export default MiProde;
