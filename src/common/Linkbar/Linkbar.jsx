import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup, NavbarWrapper } from '../Navbar/Navbar.styles';

const LinkGroup = styled(ButtonGroup)`
  justify-content: space-around;
  align-items: center;
  width: 50%;
`;

const LinkbarWrapper = styled(NavbarWrapper)`
  justify-content: center;
`;

export function Linkbar() {
  return (
    <LinkbarWrapper>
      <LinkGroup id="button-group-left">
        <Link to="/">Proximos Partidos</Link>
        <Link to="/">Mi Prode</Link>
        <Link to="/">Tabla de Puntajes</Link>
        <Link to="/">Gestionar Grupos</Link>
      </LinkGroup>
    </LinkbarWrapper>
  );
}
