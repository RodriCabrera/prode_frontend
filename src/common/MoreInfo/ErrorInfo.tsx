import React, { useState } from "react";
import { MdOutlineInfo } from "react-icons/md";
import styled from "@emotion/styled";

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
    content: "";
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

interface ITooltipProps {
  show: boolean;
}
const Tooltip = styled.span<ITooltipProps>`
  position: absolute;
  width: 0;
  height: 0;
  top: -7px;
  left: 50%;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition: opacity 0.5s, visibility 0.2s;
`;
interface Props {
  info: string;
  color: string;
}

function ErrorInfo({ info, color = "red" }: Props) {
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
      <MdOutlineInfo size={20} color={color} />
      <Tooltip show={show}>
        <ToolTipBox>{info}</ToolTipBox>
      </Tooltip>
    </InfoButton>
  );
}

export default ErrorInfo;
