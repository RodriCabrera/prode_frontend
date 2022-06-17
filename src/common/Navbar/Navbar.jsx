import { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { logoutUser } from '../../api/auth';
import { Linkbar } from '../Linkbar/Linkbar';
import Modal from '../Modal/Modal';
import { UserMiniAvatar } from '../UserMiniAvatar/UserMiniAvatar';
import {
  NavbarWrapper,
  ButtonGroup,
  NavbarContainer,
  LogoContainer,
  LogoMain,
  LogoSub,
} from './Navbar.styles';

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

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((showing) => !showing);
  };

  const handleLogout = () => {
    toggleModal();
    logoutUser()
      .then(() => {
        navigate('/auth');
      })
      .finally(() => {
        userContext.user = null;
      });
  };

  return (
    <>
      <Modal show={showModal}>
        <div>Are you sure you want to log out?</div>
        <button type="button" onClick={handleLogout}>
          Log out
        </button>
      </Modal>
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
                <NavLink onClick={toggleModal}>Salir</NavLink>
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
    </>
  );
}

export default Navbar;
