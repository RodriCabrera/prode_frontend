import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../AuthProvider";
import { Linkbar } from "../Linkbar/Linkbar";
import { Tooltip } from "../Tooltip/Tooltip";
import { useIsMobile } from "hooks/useIsMobile";
import { UserMiniAvatar } from "../UserMiniAvatar/UserMiniAvatar";
import Modal from "../Modal/Modal";
import useToggleModal from "hooks/useToggleModal";

import {
  ButtonGroup,
  LogoContainer,
  NavbarContainer,
  NavbarWrapper,
} from "./Navbar.styles";
import { Button, CardTitle, Text } from "../common.styles";

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

  const { t, i18n } = useTranslation();
  const isCurrentLang = (lang) => lang === i18n.language;
  const { showModal, toggleModal } = useToggleModal();

  const isMobile = useIsMobile();

  const handleLogout = () => {
    userContext.logout();
    toggleModal();
  };
  return (
    <>
      <Modal show={showModal} toggle={toggleModal}>
        <CardTitle>{t("areYouSure")}</CardTitle>
        <Button type="button" onClick={handleLogout}>
          {t("exit")}
        </Button>
      </Modal>
      <NavbarContainer id="navbar-container">
        <NavbarWrapper id="navbar-wrapper">
          <ButtonGroup
            id="navbar-btn-group-left"
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
          <ButtonGroup
            id="navbar-btn-group-right"
            padding="0 10px 0 0"
            gap=".3rem"
          >
            {userContext.user ? (
              <>
                <Text
                  color={isCurrentLang("en") ? "orange" : "gray"}
                  onClick={() => i18n.changeLanguage("en")}
                  style={{ cursor: "pointer" }}
                >
                  ENG
                </Text>
                <Text color="gray">|</Text>
                <Text
                  color={isCurrentLang("es") ? "orange" : "gray"}
                  onClick={() => i18n.changeLanguage("es")}
                  style={{ cursor: "pointer" }}
                >
                  ESP
                </Text>
                <NavLink onClick={() => navigate("/profile")}>
                  <Tooltip text={userContext.user.name} position="top">
                    <UserMiniAvatar
                      avatar={userContext.user.avatar}
                      isSmall
                      onClick={() => navigate("/profile")}
                    />
                  </Tooltip>
                </NavLink>
                <NavLink onClick={toggleModal}>{t("exit")}</NavLink>
              </>
            ) : (
              <>
                <Link to="/auth">Login</Link>
                <Link to="/auth/register">{t("register")}</Link>
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
