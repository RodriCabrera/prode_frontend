import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Banner, BannerTitle } from './Predictions.styles';

function BannerList() {
  const navigate = useNavigate();
  return (
    <div>
      <Banner onClick={() => navigate('first-stage')}>
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
