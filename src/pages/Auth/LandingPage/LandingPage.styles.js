import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const LandingPageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  background-color: #23272a;
  justify-content: space-around;
  align-items: center;
`;
export const LeftPlaceholder = styled.div`
  height: 500px;
  background-color: tomato;
  width: 700px;
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
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: linear-gradient(
    -40deg,
    rgba(31, 36, 33, 0.1) 0%,
    rgba(31, 36, 33, 0.95) 35%,
    rgba(100, 100, 79, 1) 80%,
    rgba(90, 90, 79, 1) 85%,
    rgba(70, 74, 79, 1) 100%
  );
  transition: all 5s;
  animation: ${spin} 8s infinite alternate;
`;
