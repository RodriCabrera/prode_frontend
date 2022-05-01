import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import Spinner from '../Spinner/Spinner';
import { NavbarWrapper, ButtonGroup } from './Navbar.styles';

function Navbar() {
  const userContext = useContext(AuthContext);

  // <div>Logged in: {userContext.user?.user.name}</div>;
  return (
    <NavbarWrapper id="navbar-wrapper">
      {userContext.isLoading ? (
        <Spinner id="spinner" />
      ) : (
        <>
          <ButtonGroup>prode الحمار</ButtonGroup>
          <ButtonGroup>{!userContext.user && <p>no user</p>}</ButtonGroup>
        </>
      )}
    </NavbarWrapper>
  );
}

export default Navbar;
