import React from "react";
import { CardContainer, CardTitle, CardWrapper } from "../common/common.styles";

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
          src="https://thumbs.gfycat.com/FeistyScalyIsabellineshrike-size_restricted.gif"
          alt="mess not found"
        />
      </CardWrapper>
    </CardContainer>
  );
}

export default NotFound;
