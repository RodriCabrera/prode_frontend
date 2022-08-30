import React from 'react';
import { Text } from '../../../common/common.styles';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { LPInfoContainer, LPInfoWrapper } from './LandingPage.styles';

const LandingPageInfo = () => {
  const isMobile = useIsMobile();
  return (
    <LPInfoContainer id="lp-info-container">
      <LPInfoWrapper>
        <Text size={isMobile ? '3rem' : '4rem'} weight="800">
          Podés juegar en distintos grupos.
        </Text>
        <Text size={isMobile ? '1rem' : '1.5rem'} weight="600" color="tomato">
          ⚽️ Creá un grupo y enviá invitaciones a quien quieras.
        </Text>
        <Text size={isMobile ? '.8rem' : '1.2rem'} weight="600">
          Al crear un grupo podés elegir el sistema de puntajes por partido
          acertado.
        </Text>
        <Text size={isMobile ? '.8rem' : '1.2rem'} weight="600">
          Definí el tiempo límite para predecir
        </Text>
        <Text size={isMobile ? '1rem' : '1.5rem'} weight="600" color="tomato">
          ⚽️ Unite a un grupo existente con 1 solo click.
        </Text>
        <Text size={isMobile ? '.8rem' : '1.2rem'} weight="600">
          Una vez que empiecen a jugarse los partidos vas a poder ver cuantos
          puntos sumaste!
        </Text>
      </LPInfoWrapper>
    </LPInfoContainer>
  );
};

export default LandingPageInfo;
