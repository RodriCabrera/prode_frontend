import React, { useState } from 'react';
import styled from '@emotion/styled';

const InfoButton = styled.span`
  cursor: default;
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  padding: 0.2rem;
  text-align: center;
`;

const ToolTipBox = styled.span`
  position: relative;
  display: inline-block;
  text-align: center;
  min-width: 90px;
  padding: 0.2rem;
  background-color: black;
  text-overflow: ellipsis;
  font-size: 0.9rem;
  border-radius: 5px;
  color: white;
  transform: translateY(-100%) translateX(-50%);
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 46%;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 7px solid black;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  width: 0;
  height: 0;
  top: -7px;
  left: 50%;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? '0.8' : '0')};
  transition: opacity 0.5s, visibility 0.2s;
`;

function ErrorInfo({ info, color = 'red' }) {
  if (!info) return null;
  const [show, setShow] = useState(false);
  const toggleTempShow = () => {
    if (show) return;
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };
  return (
    <InfoButton
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={toggleTempShow}
    >
      <span className="material-symbols-outlined" style={{ color }}>
        info
      </span>
      <Tooltip show={show}>
        <ToolTipBox>{info}</ToolTipBox>
      </Tooltip>
    </InfoButton>
  );
}

export default ErrorInfo;
