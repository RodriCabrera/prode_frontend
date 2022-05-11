import React from 'react';
import { CardContainer, CardTitle, CardWrapper } from '../common/common.styles';

// Otras propuestas para la imagen:
// https://thumbs.gfycat.com/FeistyScalyIsabellineshrike-size_restricted.gif
// https://www.infobae.com/new-resizer/qE2b2Pf1DWM0oMCd40WjKxmpHBw=/1200x900/filters:format(webp):quality(85)//arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/REPXU476HFEXVGXYQKXWEQ5EOU.jpg
// https://secure.static.goal.com/941000/941022_gallery.jpg

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
