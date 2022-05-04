import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AuthContext } from '../AuthProvider';
import { NavbarWrapper, ButtonGroup } from './Navbar.styles';
import config from '../../Constants';

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
    axios
      .post(`${config.API_URL}/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        navigate('/login');
      })
      .finally(() => {
        userContext.user = null;
      });
  };

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
            <Link to="/register">Register</Link>
          </>
        )}
      </ButtonGroup>
    </NavbarWrapper>
  );
}

export default Navbar;
