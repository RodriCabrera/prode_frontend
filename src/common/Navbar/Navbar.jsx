import { useContext, useEffect, useState } from 'react';
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
import { Button, CardTitle } from '../common.styles';

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
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowSizeChange = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

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
        <CardTitle>¿Estás seguro?</CardTitle>
        <Button type="button" onClick={handleLogout}>
          Salir
        </Button>
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
                  <UserMiniAvatar
                    avatar={userContext.user.avatar}
                    isSmall
                    onClick={() => navigate('/profile')}
                  />
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
      </NavbarContainer>
      {userContext.user && <Linkbar isMobile={isMobile} />}
    </>
  );
}

export default Navbar;
