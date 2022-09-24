import styled from '@emotion/styled';
import { useState } from 'react';
import { Text } from '../common.styles';

const TooltipWrapper = styled.div``;
const TooltipBubble = styled.div`
  position: absolute;
  top: ${({ position }) => {
    if (position === 'bottom') {
      return '30px';
    }
    return '0px';
  }};
  right: 30px;
  background-color: gray;
  padding: 6px;
  border-radius: 10px;
  display: ${({ show }) => !show && 'none'};
`;

export function Tooltip({ children, text, position }) {
  const [show, setShow] = useState(false);

  return (
    <TooltipWrapper
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <TooltipBubble show={show} position={position}>
        <Text>{text}</Text>
      </TooltipBubble>
      {children}
    </TooltipWrapper>
  );
}
