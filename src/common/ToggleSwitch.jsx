import styled from '@emotion/styled/macro';
import React, { useState } from 'react';

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: salmon;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

function ToggleSwitch({ mode }) {
  const handleChange = () => {
    mode.setMode(mode.mode === 'resultados' ? 'predecir' : 'resultados');
  };

  return (
    <div>
      <CheckBoxWrapper>
        <CheckBox
          id="checkbox"
          type="checkbox"
          onChange={handleChange}
          value={mode.mode}
        />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
    </div>
  );
}

export default ToggleSwitch;
