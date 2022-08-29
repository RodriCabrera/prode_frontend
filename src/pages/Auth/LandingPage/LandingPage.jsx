import React from 'react';

import { LandingPageContainer } from './LandingPage.styles';
import LandingPageMain from './LandingPageMain';
import LandingPageTeams from './LandingPageTeams';

const LandingPage = () => {
  return (
    <LandingPageContainer id="landing-page-container">
      <LandingPageMain />
      <LandingPageTeams />
    </LandingPageContainer>
  );
};

export default LandingPage;
