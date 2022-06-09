import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AuthContext } from '../AuthProvider';
import {
  NavbarWrapper,
  ButtonGroup,
  NavbarContainer,
  LogoContainer,
  LogoMain,
  LogoSub,
} from './Navbar.styles';
import { logoutUser } from '../../api/auth';
import { Linkbar } from '../Linkbar/Linkbar';

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
        navigate('/auth');
      })
      .finally(() => {
        userContext.user = null;
      });
  };

  return (
    <NavbarContainer id="navbar-container">
      <NavbarWrapper id="navbar-wrapper">
        <ButtonGroup id="button-group-left" onClick={() => navigate('/')}>
          <LogoContainer>
            <LogoMain>Prode </LogoMain>
            <LogoSub>الحمار</LogoSub>
          </LogoContainer>
        </ButtonGroup>
        <ButtonGroup id="button-group-right">
          {userContext.user ? (
            <>
              <NavLink onClick={() => navigate('/profile')}>
                {userContext.user.name}
              </NavLink>
              <NavLink onClick={handleLogout}>Salir</NavLink>
            </>
          ) : (
            <>
              <Link to="/auth">Login</Link>
              <Link to="/auth/register">Registrarse</Link>
            </>
          )}
        </ButtonGroup>
      </NavbarWrapper>
      {userContext.user && <Linkbar />}
    </NavbarContainer>
  );
}

export default Navbar;
