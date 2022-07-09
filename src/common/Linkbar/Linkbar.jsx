import styled from '@emotion/styled';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GiPodiumWinner } from 'react-icons/gi';
import { FaListUl } from 'react-icons/fa';
import { BiFootball } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';
import { Text } from '../common.styles';
import { ButtonGroup, NavbarWrapper } from '../Navbar/Navbar.styles';
// primary: 'tomato',
// lighty: '#97A9B4',
// greyple: '#99AAB5',
// dark: '#2C2F33',
// notblack: '#23272A',
const LinkbarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: ${({ isMobile }) => (isMobile ? 'fixed' : 'sticky')};
  top: ${({ isMobile }) => (isMobile ? 'auto' : '80px')};
  bottom: ${({ isMobile }) => (isMobile ? '0' : 'auto')};
  z-index: 99998;
  background-color: #23272a;
`;
const LinkbarWrapper = styled(NavbarWrapper)`
  width: 100%;
  max-width: 700px;
  justify-content: center;
  padding: 1rem;
`;

const LinkGroup = styled(ButtonGroup)`
  justify-content: space-around;
  align-items: center;
  padding: 0;
`;
const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  gap: 8px;
`;
const CustomLink = styled(Text)`
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  font-weight: ${({ isCurrent }) => isCurrent && '800'};
`;

export function Linkbar({ isMobile }) {
  const location = useLocation();
  const basePath = location.pathname.split('/')[1];
  const navigate = useNavigate();

  const isCurrent = (link) => {
    return link === basePath;
  };
  const handleLinkClick = (path) => {
    return navigate(path);
  };

  return (
    <LinkbarContainer isMobile={isMobile} id="linkbar-container">
      <LinkbarWrapper>
        <LinkGroup id="button-group-left">
          <LinkWrapper onClick={() => handleLinkClick('/fixture')}>
            {isMobile ? (
              <BiFootball
                size="2rem"
                color={isCurrent('fixture') ? 'pink' : ''}
              />
            ) : (
              <CustomLink isCurrent={isCurrent('fixture')}>Fixture</CustomLink>
            )}
          </LinkWrapper>
          <LinkWrapper onClick={() => handleLinkClick('/predictions')}>
            {isMobile ? (
              <FaListUl
                size="2rem"
                color={isCurrent('predictions') ? 'pink' : ''}
              />
            ) : (
              <CustomLink isCurrent={isCurrent('predictions')}>
                Predicciones
              </CustomLink>
            )}
          </LinkWrapper>

          <LinkWrapper onClick={() => handleLinkClick('/scores')}>
            {isMobile ? (
              <GiPodiumWinner
                size="2rem"
                color={isCurrent('scores') ? 'pink' : ''}
              />
            ) : (
              <CustomLink isCurrent={isCurrent('scores')}>Puntajes</CustomLink>
            )}
          </LinkWrapper>
          <LinkWrapper onClick={() => handleLinkClick('/groups')}>
            {isMobile ? (
              <HiUserGroup
                size="2rem"
                color={isCurrent('groups') ? 'pink' : ''}
              />
            ) : (
              <CustomLink isCurrent={isCurrent('groups')}>Grupos</CustomLink>
            )}
          </LinkWrapper>
        </LinkGroup>
      </LinkbarWrapper>
    </LinkbarContainer>
  );
}
