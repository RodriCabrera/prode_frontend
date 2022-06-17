import { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
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
  SidebarContainer,
} from './Navbar.styles';
import { Button, CardTitle } from '../common.styles';
import Sidebar from './Sidebar';

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
  const [width, setWidth] = useState(window.innerWidth);
  const [showAside, setShowAside] = useState(false);

  const handleWindowSizeChange = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

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
  console.log('SHOWMENU', showAside);
  const switchShowAside = () => {
    setShowAside((showing) => !showing);
  };
  return (
    <>
      <Modal show={showModal}>
        <CardTitle>¿Estás seguro?</CardTitle>
        <Button type="button" onClick={handleLogout}>
          Salir
        </Button>
      </Modal>
      <Sidebar showAside={showAside} close={switchShowAside} />
      <NavbarContainer id="navbar-container">
        <NavbarWrapper id="navbar-wrapper">
          <ButtonGroup id="button-group-left">
            {isMobile && <HiMenu size="2.2rem" onClick={switchShowAside} />}
            <LogoContainer onClick={() => navigate('/')}>
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
        {userContext.user && <Linkbar />}
      </NavbarContainer>
    </>
  );
}

export default Navbar;
