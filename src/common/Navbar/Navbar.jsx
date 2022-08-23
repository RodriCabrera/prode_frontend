import { useContext } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { logoutUser } from '../../api/auth';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useToggleModal from '../../hooks/useToggleModal';
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
import { Tooltip } from '../Tooltip/Tooltip';

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

  const { showModal, toggleModal } = useToggleModal();

  const { width } = useWindowDimensions();

  const isMobile = width <= 768;

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
      <Modal show={showModal} toggle={toggleModal}>
        <CardTitle>¿Estás seguro?</CardTitle>
        <Button type="button" onClick={handleLogout}>
          Salir
        </Button>
      </Modal>
      <NavbarContainer id="navbar-container">
        <NavbarWrapper id="navbar-wrapper">
          <ButtonGroup
            id="button-group-left"
            onClick={() => navigate('/')}
            padding=".5rem 2rem">
            <LogoContainer>
              <LogoMain>Prode </LogoMain>
              <LogoSub>الحمار</LogoSub>
            </LogoContainer>
          </ButtonGroup>
          <ButtonGroup id="button-group-right" padding="1rem">
            {userContext.user ? (
              <>
                <NavLink onClick={() => navigate('/profile')}>
                  <Tooltip text={userContext.user.name} position="top">
                    <UserMiniAvatar
                      avatar={userContext.user.avatar}
                      isSmall
                      onClick={() => navigate('/profile')}
                    />
                  </Tooltip>
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
