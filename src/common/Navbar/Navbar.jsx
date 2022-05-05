import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AuthContext } from '../AuthProvider';
import { NavbarWrapper, ButtonGroup } from './Navbar.styles';
import { logoutUser } from '../../api/auth';

const NavLink = styled.button`
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

function Navbar() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        navigate('/login');
      })
      .finally(() => {
        userContext.user = null;
      });
  };
  // TODO: Pensar que botones va a ver el usuario una vez que este logueado.
  /*
    Ideas de botones:
    * Predicciones ya cargadas o por cargar.
      * Como se van a ver? Tenemos filtros por fecha? por grupo? por pais?...
    * Integrantes del grupo.
    * Predicciones de los integrantes del grupo? Suma ver eso o da para copiarse?
    * Perfil del usuario?
    
    Los resultados de los partidos se deberian ver en la misma tabla que se ven
    las predicciones del usuario.
  */
  return (
    <NavbarWrapper id="navbar-wrapper">
      <ButtonGroup id="button-group-left" onClick={() => navigate('/')}>
        prode الحمار
      </ButtonGroup>
      <ButtonGroup id="button-group-right">
        {userContext.user ? (
          <>
            <span>{userContext.user.email?.split('@')[0]}</span>
            <NavLink onClick={handleLogout}>Salir</NavLink>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </ButtonGroup>
    </NavbarWrapper>
  );
}

export default Navbar;
