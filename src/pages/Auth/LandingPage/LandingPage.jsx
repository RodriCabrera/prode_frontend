import React from 'react';

import { LandingPageContainer } from './LandingPage.styles';
import LandingPageMain from './LandingPageMain';
import LandingPageInfo from './LandingPageInfo';

const LandingPage = () => {
  return (
    <LandingPageContainer id="landing-page-container">
      <LandingPageMain />
      <LandingPageInfo />
    </LandingPageContainer>
  );
};

export default LandingPage;
