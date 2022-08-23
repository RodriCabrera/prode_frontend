import styled from '@emotion/styled';
import { Text } from '../common.styles';
import { ButtonGroup, NavbarWrapper } from '../Navbar/Navbar.styles';
export const LinkbarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: ${({ isMobile }) => (isMobile ? 'fixed' : 'sticky')};
  top: ${({ isMobile }) => (isMobile ? 'auto' : '0')};
  bottom: ${({ isMobile }) => (isMobile ? '0' : 'auto')};
  z-index: 99998;
  background-color: #23272a;
  border-bottom: 1px solid #303030;
`;
export const LinkbarWrapper = styled(NavbarWrapper)`
  width: 100%;
  max-width: 700px;
  justify-content: center;
  /* padding: 1rem; */
`;

export const LinkGroup = styled(ButtonGroup)`
  justify-content: space-around;
  align-items: center;
  padding: 0;
`;
export const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 0.1rem;
  border-bottom: ${({ isCurrent, isMobile }) =>
    isCurrent && !isMobile && '1px solid white'};
`;
export const CustomLink = styled(Text)`
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  padding: 0.7rem 0.9rem;
  /* margin: 0.2rem; */
  border-radius: 4px;
  :hover {
    background-color: #303030;
  }
`;
