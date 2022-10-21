import styled from "@emotion/styled";
import { ReactNode } from "react";
import { FiInfo } from "react-icons/fi";
import { Text } from "../common.styles";

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
interface IInfoProps {
  children: ReactNode;
}
export const Info = ({ children }: IInfoProps) => {
  return (
    <InfoContainer>
      <FiInfo style={{ color: "yellow" }} />
      <Text color="yellow" size=".8rem">
        {children}
      </Text>
    </InfoContainer>
  );
};
