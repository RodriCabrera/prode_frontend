import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Text } from '../../../common/common.styles';
import { keyframes } from '@emotion/react';
import { LandingPageWrapper, LeftPlaceholder } from './LandingPage.styles';

const LandingPage = () => {
  return (
    <LandingPageWrapper id="landing-page-wrapper">
      <LeftPlaceholder>
        <Text size="4rem">Chumbazo</Text>
      </LeftPlaceholder>
      <Outlet />
    </LandingPageWrapper>
  );
};

export default LandingPage;
