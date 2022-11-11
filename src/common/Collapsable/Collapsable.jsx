import { useState } from "react";
import styled from "@emotion/styled";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

import { Text } from "../common.styles";

const CollapsableButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  padding: 0.5rem;
  font-size: 1.8rem;
  text-transform: uppercase;
  cursor: pointer;
  &:after {
    width: 100%;
    border-bottom: 1px white;
  }
`;

export function Collapsable({ children, name }) {
  const [isSelected, setSelected] = useState(false);
  const handleSelection = () => {
    setSelected((prevState) => !prevState);
  };
  return (
    <>
      <CollapsableButton onClick={handleSelection}>
        <Text>{name}</Text>
        {isSelected ? <HiChevronUp /> : <HiChevronDown />}
      </CollapsableButton>
      {isSelected && children}
    </>
  );
}
