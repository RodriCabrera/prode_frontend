import React from 'react';
import { Banner, BannerTitle } from './Predictions.styles';

function BannerList() {
  return (
    <div>
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
    </div>
  );
}

export default BannerList;
