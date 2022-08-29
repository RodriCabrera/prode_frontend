import styled from '@emotion/styled';
import React from 'react';
import { Text } from '../../../common/common.styles';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { LandingPageWrapper } from './LandingPage.styles';

const LandingPageTeams = () => {
  const isMobile = useIsMobile();
  return (
    <LandingPageWrapper id="landing-page-teams-wrapper">
      <Text size={isMobile ? '3rem' : '4rem'} weight="800">
        Podés crear varios grupos con distintas reglas.
      </Text>
    </LandingPageWrapper>
  );
};

export default LandingPageTeams;
