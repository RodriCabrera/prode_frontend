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
  return (
    <BannerContainer>
      <Text align="center" size="2rem" weight="700">
        FASES
      </Text>
      <Banner onClick={() => navigate('first-stage')}>
        <BannerLeft>
          <BannerTitle>GRUPOS</BannerTitle>
          <p>Ver/Editar</p>
        </BannerLeft>
      </Banner>
      <Banner disabled onClick={() => navigate('later-stages/16round')}>
        <BannerLeft>
          <BannerTitle>OCTAVOS</BannerTitle>
          <p>Ver/Editar</p>
        </BannerLeft>
      </Banner>
      <Banner disabled onClick={() => navigate('later-stages/8round')}>
        <BannerLeft>
          <BannerTitle>CUARTOS</BannerTitle>
          <p>Ver/Editar</p>
        </BannerLeft>
      </Banner>
      <Banner disabled onClick={() => navigate('later-stages/semis')}>
        <BannerLeft>
          <BannerTitle>SEMIFINALES</BannerTitle>
          <p>Ver/Editar</p>
        </BannerLeft>
      </Banner>
      <Banner disabled onClick={() => navigate('later-stages/final')}>
        <BannerLeft>
          <BannerTitle>FINAL</BannerTitle>
          <p>Ver/Editar</p>
        </BannerLeft>
      </Banner>
    </BannerContainer>
  );
}

export default BannerList;
