import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { NavbarWrapper, ButtonGroup } from './Navbar.styles';
import config from '../../Constants';

function Navbar() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    axios.post(`${config.API_URL}/auth/logout`).then(() => {
      // TODO: Revisar => no se esta deslogueando.
      navigate('/login');
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
            <p>{userContext.user?.user.name}</p>
            <button type="button" onClick={handleClick}>
              Logout
            </button>
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
