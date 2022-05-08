import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup, NavbarWrapper } from '../Navbar/Navbar.styles';

const LinkGroup = styled(ButtonGroup)`
  justify-content: space-around;
  align-items: center;
  max-width: 50%;
`;

const LinkbarWrapper = styled(NavbarWrapper)`
  justify-content: center;
`;

export function Linkbar() {
  return (
    <LinkbarWrapper>
      <LinkGroup id="button-group-left">
        <Link to="/proximos-partidos">Proximos Partidos</Link>
        <Link to="/mis-predicciones">Mis Predicciones</Link>
        <Link to="/scores">Tabla de Puntajes</Link>
        <Link to="/prodes">Gestionar Prodes</Link>
      </LinkGroup>
    </LinkbarWrapper>
  );
}
