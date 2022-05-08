import React from 'react';
import { CardContainer, CardTitle, CardWrapper } from '../common/common.styles';

function NotFound() {
  return (
    <CardContainer id="not-found-card-container">
      <CardWrapper id="not-found-card-wrapper">
        <CardTitle>Page Not Found</CardTitle>
        <img
          src="https://s.yimg.com/ny/api/res/1.2/hmEbbDdWarr6tl4ELhOnRA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ4MA--/https://s.yimg.com/uu/api/res/1.2/2Sk5CLJ0_XAbc249XM1qcQ--~B/aD00NTA7dz02MDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en-us/aniin.com/4199093a7066d2cfd444069bdb431bab"
          alt="mess not found"
        />
      </CardWrapper>
    </CardContainer>
  );
}

export default NotFound;
