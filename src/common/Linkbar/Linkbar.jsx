import styled from '@emotion/styled';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const CustomLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  font-weight: ${({ isCurrent }) => isCurrent && '800'};
  font-size: ${({ isCurrent }) => isCurrent && '1.2rem'};
`;

export function Linkbar() {
  const location = useLocation();
  const basePath = location.pathname.split('/')[1];

  const isCurrent = (link) => {
    return link === basePath;
  };
  console.log('iscurrent fixture', isCurrent('fixture'));
  return (
    <LinkbarContainer>
      <LinkbarWrapper>
        <LinkGroup id="button-group-left">
          <CustomLink to="/fixture" isCurrent={isCurrent('fixture')}>
            Fixture
          </CustomLink>
          <CustomLink
            to="/predictions/edit"
            isCurrent={isCurrent('predictions')}
          >
            Mis Predicciones
          </CustomLink>
          <CustomLink to="/scores" isCurrent={isCurrent('scores')}>
            Tabla de Puntajes
          </CustomLink>
          <CustomLink to="/groups" isCurrent={isCurrent('groups')}>
            Gestionar grupos
          </CustomLink>
        </LinkGroup>
      </LinkbarWrapper>
    </LinkbarContainer>
  );
}
