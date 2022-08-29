import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(
    circle at left top,
    rgba(71, 128, 77, 0.7) -20%,
    rgba(2, 8, 2, 1) 70%
  );
`;
export const LandingPageWrapper = styled.div`
  position: relative;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 100vh;
  width: 100%;
  max-width: 1100px;
`;
export const LeftPlaceholder = styled.div`
  position: relative;
  max-width: 600px;
`;

export const spin = keyframes`
  from {
	background: linear-gradient(
    20deg,
    rgba(31, 36, 33, 0.95) 0%,
    rgba(31, 36, 33, 0.95) 15%,
    rgba(100, 100, 79, 1) 80%,
    rgba(90, 90, 79, 1) 85%,
    rgba(70, 74, 79, 1) 100%,
  )
  }
  to {
	background: linear-gradient(
    0deg,
    rgba(31, 36, 33, 0.95) 0%,
    rgba(31, 36, 33, 0.95) 15%,
    rgba(100, 100, 79, 1) 80%,
    rgba(90, 90, 79, 1) 85%,
    rgba(70, 74, 79, 1) 100%,
  )
  }
`;
export const VideoBg = styled.video`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
`;
