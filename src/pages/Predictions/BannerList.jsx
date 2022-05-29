import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '../../common/common.styles';
import {
  Banner,
  BannerContainer,
  BannerLeft,
  BannerTitle,
} from './Predictions.styles';

function BannerList() {
  const navigate = useNavigate();

  const setDisabledField = (disablingDate, enablingDate) => {
    const today = new Date();
    const endDate = new Date(disablingDate);
    const startDate = new Date(enablingDate);
    return today > endDate || today < startDate;
  };
  // TODO: Revisar fechas dee habilitacion de predicciones. Y formato para pasar horas.
  return (
    <BannerContainer>
      <Text align="center" size="2rem" weight="700">
        FASES
      </Text>
      <Banner
        disabled={setDisabledField('2022-11-20', '2022-01-01')}
        onClick={() => navigate('first-stage')}
      >
        <BannerLeft>
          <BannerTitle>GRUPOS</BannerTitle>
          <p>Ver/Editar</p>
        </BannerLeft>
      </Banner>
      <Banner
        disabled={setDisabledField('2022-13-02', '2022-12-02')}
        onClick={() => navigate('later-stages/16round')}
      >
        <BannerLeft>
          <BannerTitle>OCTAVOS</BannerTitle>
          <p>Ver/Editar</p>
        </BannerLeft>
      </Banner>
      <Banner
        disabled={setDisabledField('2022-12-08', '2022-12-02')}
        onClick={() => navigate('later-stages/8round')}
      >
        <BannerLeft>
          <BannerTitle>CUARTOS</BannerTitle>
          <p>Ver/Editar</p>
        </BannerLeft>
      </Banner>
      <Banner
        disabled={setDisabledField('2022-12-12', '2022-12-02')}
        onClick={() => navigate('later-stages/semis')}
      >
        <BannerLeft>
          <BannerTitle>SEMIFINALES</BannerTitle>
          <p>Ver/Editar</p>
        </BannerLeft>
      </Banner>
      <Banner
        disabled={setDisabledField('2022-12-16', '2022-12-02')}
        onClick={() => navigate('later-stages/final')}
      >
        <BannerLeft>
          <BannerTitle>FINAL</BannerTitle>
          <p>Ver/Editar</p>
        </BannerLeft>
      </Banner>
    </BannerContainer>
  );
}

export default BannerList;
