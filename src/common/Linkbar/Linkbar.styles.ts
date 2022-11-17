import styled from "@emotion/styled";

import { Text } from "../common.styles";
import { ButtonGroup, NavbarWrapper } from "../Navbar/Navbar.styles";

interface Props {
  isMobile?: boolean;
  isCurrent?: boolean;
}
export const LinkbarContainer = styled.div<Props>`
  width: 100%;
  display: flex;
  justify-content: center;
  position: ${({ isMobile }) => (isMobile ? "fixed" : "sticky")};
  top: ${({ isMobile }) => (isMobile ? "auto" : "0")};
  bottom: ${({ isMobile }) => (isMobile ? "0" : "auto")};
  z-index: 99998;
  /* background-color: #23272a; */
  background-color: #000;
  border-bottom: 1px solid #303030;
`;

export const LinkbarWrapper = styled(NavbarWrapper)`
  width: 100%;
  max-width: 700px;
  justify-content: center;
  height: 48px;
`;

export const LinkGroup = styled(ButtonGroup)<Props>`
  justify-content: space-around;
  align-items: center;
  padding: 0;
  gap: 35px;
`;

export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 0.1rem;
  border-bottom: ${({ isCurrent, isMobile }: Props) =>
    isCurrent && !isMobile && "1px solid white"};
`;

export const CustomLink = styled(Text)`
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  padding: 0.7rem 0.9rem;
  border-radius: 4px;
  user-select: none;
  :hover {
    background-color: #303030;
  }
`;
