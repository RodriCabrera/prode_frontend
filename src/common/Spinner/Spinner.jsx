import styled from '@emotion/styled';
import React from 'react';
import './spinner.css';

// TODO Reemplazar por uno que se adapte mejor.

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export function Spinner() {
  return (
    <SpinnerWrapper>
      <div className="lds-default">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </SpinnerWrapper>
  );
}
