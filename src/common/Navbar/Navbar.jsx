import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';
import { AuthContext } from '../AuthProvider';
import { NavbarWrapper, ButtonGroup } from './Navbar.styles';
import config from '../../Constants';
import { Button } from '../common.styles';

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
            <span>
              {userContext.user?.user.name ||
                userContext.user?.user.name.split('@')[0]}
            </span>
            <Button padding="3px" onClick={handleLogout}>
              <IoMdLogOut size="1.5rem" />
            </Button>
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
