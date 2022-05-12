import styled from '@emotion/styled';
import React from 'react';
import './spinner.css';

// TODO Reemplazar por uno que se adapte mejor.

const SpinnerWrapper = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin: auto;
`;

const SpinnerBall = styled.div`
  width: ${(props) => props.size * 0.08}px;
  height: ${(props) => props.size * 0.08}px;
  position: absolute;
  background: #fff;
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
  :nth-child(1) {
    animation-delay: 0s;
    top: ${(props) => props.size * 0.46}px;
    left: ${(props) => props.size * 0.82}px;
  }
  :nth-child(2) {
    animation-delay: -0.1s;
    top: ${(props) => props.size * 0.27}px;
    left: ${(props) => props.size * 0.77}px;
  }
  :nth-child(3) {
    animation-delay: -0.2s;
    top: ${(props) => props.size * 0.14}px;
    left: ${(props) => props.size * 0.65}px;
  }
  :nth-child(4) {
    animation-delay: -0.3s;
    top: ${(props) => props.size * 0.09}px;
    left: ${(props) => props.size * 0.46}px;
  }
  :nth-child(5) {
    animation-delay: -0.4s;
    top: ${(props) => props.size * 0.14}px;
    left: ${(props) => props.size * 0.27}px;
  }
  :nth-child(6) {
    animation-delay: -0.5s;
    top: ${(props) => props.size * 0.27}px;
    left: ${(props) => props.size * 0.14}px;
  }
  :nth-child(7) {
    animation-delay: -0.6s;
    top: ${(props) => props.size * 0.46}px;
    left: ${(props) => props.size * 0.09}px;
  }
  :nth-child(8) {
    animation-delay: -0.7s;
    top: ${(props) => props.size * 0.65}px;
    left: ${(props) => props.size * 0.14}px;
  }
  :nth-child(9) {
    animation-delay: -0.8s;
    top: ${(props) => props.size * 0.78}px;
    left: ${(props) => props.size * 0.28}px;
  }
  :nth-child(10) {
    animation-delay: -0.9s;
    top: ${(props) => props.size * 0.82}px;
    left: ${(props) => props.size * 0.46}px;
  }
  :nth-child(11) {
    animation-delay: -1s;
    top: ${(props) => props.size * 0.78}px;
    left: ${(props) => props.size * 0.65}px;
  }
  :nth-child(12) {
    animation-delay: -1.1s;
    top: ${(props) => props.size * 0.65}px;
    left: ${(props) => props.size * 0.78}px;
  }
`;

export function Spinner({ size = 80 }) {
  return (
    <SpinnerWrapper size={size}>
      <div className="lds-default">
        <SpinnerBall size={size} />
        <SpinnerBall size={size} />
        <SpinnerBall size={size} />
        <SpinnerBall size={size} />
        <SpinnerBall size={size} />
        <SpinnerBall size={size} />
        <SpinnerBall size={size} />
        <SpinnerBall size={size} />
        <SpinnerBall size={size} />
        <SpinnerBall size={size} />
        <SpinnerBall size={size} />
        <SpinnerBall size={size} />
      </div>
    </SpinnerWrapper>
  );
}
