import styled from '@emotion/styled';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Text } from '../common.styles';
import { ButtonGroup, NavbarWrapper } from '../Navbar/Navbar.styles';

const LinkbarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const LinkbarWrapper = styled(NavbarWrapper)`
  width: 100%;
  max-width: 700px;
  justify-content: center;
`;

const LinkGroup = styled(ButtonGroup)`
  justify-content: space-around;
  align-items: center;
  padding: 0;
`;

const CustomLink = styled(Text)`
  text-decoration: none;
  text-align: center;
  font-weight: ${({ isCurrent }) => isCurrent && '800'};
  font-size: ${({ isCurrent }) => isCurrent && '1.2rem'};
`;

export function Linkbar() {
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
    <LinkbarContainer>
      <LinkbarWrapper>
        <LinkGroup id="button-group-left">
          <CustomLink
            onClick={() => handleLinkClick('/fixture')}
            isCurrent={isCurrent('fixture')}
          >
            Fixture
          </CustomLink>
          <CustomLink
            onClick={() => handleLinkClick('/predictions/edit')}
            isCurrent={isCurrent('predictions')}
          >
            Mis Predicciones
          </CustomLink>
          <CustomLink
            onClick={() => handleLinkClick('/scores')}
            isCurrent={isCurrent('scores')}
          >
            Tabla de Puntajes
          </CustomLink>
          <CustomLink
            onClick={() => handleLinkClick('/groups')}
            isCurrent={isCurrent('groups')}
          >
            Gestionar grupos
          </CustomLink>
        </LinkGroup>
      </LinkbarWrapper>
    </LinkbarContainer>
  );
}
