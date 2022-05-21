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
      <Banner onClick={() => navigate('later-stages/16round')}>
        <div>
          <BannerTitle>OCTAVOS</BannerTitle>
          <p>Ver/Editar</p>
        </div>
        <p>pts</p>
      </Banner>
      <Banner onClick={() => navigate('later-stages/8round')}>
        <div>
          <BannerTitle>CUARTOS</BannerTitle>
          <p>Ver/Editar</p>
        </div>
        <p>pts</p>
      </Banner>
      <Banner onClick={() => navigate('later-stages/semis')}>
        <div>
          <BannerTitle>SEMIFINALES</BannerTitle>
          <p>Ver/Editar</p>
        </div>
        <p>pts</p>
      </Banner>
      <Banner onClick={() => navigate('later-stages/final')}>
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
