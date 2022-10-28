import { useContext } from "react";
import styled from "@emotion/styled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import useToggleModal from "../../hooks/useToggleModal";
import { Linkbar } from "../Linkbar/Linkbar";
import Modal from "../Modal/Modal";
import { UserMiniAvatar } from "../UserMiniAvatar/UserMiniAvatar";
import {
  NavbarWrapper,
  ButtonGroup,
  NavbarContainer,
  LogoContainer,
} from "./Navbar.styles";
import { Button, CardTitle, Text } from "../common.styles";
import { Tooltip } from "../Tooltip/Tooltip";
import { useIsMobile } from "../../hooks/useIsMobile";

const NavLink = styled.button`
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
const SubLogo = styled(Text)`
  letter-spacing: -2px;
`;

function Navbar() {
  const { pathname } = useLocation();
  if (pathname === "/auth") return;

  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { showModal, toggleModal } = useToggleModal();

  const isMobile = useIsMobile();

  const handleLogout = () => {
    userContext.logout();
    toggleModal();
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
            onClick={() => navigate("/")}
            padding=".5rem 16px"
          >
            <LogoContainer>
              <Text weight="800" color="tomato" size="2rem">
                Chumbazo
              </Text>
              <SubLogo weight="100">prode</SubLogo>
            </LogoContainer>
          </ButtonGroup>
          <ButtonGroup id="button-group-right" padding="1rem">
            {userContext.user ? (
              <>
                <NavLink onClick={() => navigate("/profile")}>
                  <Tooltip text={userContext.user.name} position="top">
                    <UserMiniAvatar
                      avatar={userContext.user.avatar}
                      isSmall
                      onClick={() => navigate("/profile")}
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
