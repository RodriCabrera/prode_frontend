import { useLocation, useNavigate } from "react-router-dom";
import { GiPodiumWinner } from "react-icons/gi";
import { FaListUl } from "react-icons/fa";
import { BiFootball } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { useTranslation } from "react-i18next";

import {
  CustomLink,
  LinkbarContainer,
  LinkbarWrapper,
  LinkGroup,
  LinkWrapper,
} from "./Linkbar.styles";

interface ILinkbarProps {
  isMobile: boolean;
}

export function Linkbar({ isMobile }: ILinkbarProps) {
  const location = useLocation();
  const basePath = location.pathname.split("/")[1];
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isCurrent = (link: string) => {
    return link === basePath;
  };
  const handleLinkClick = (path: string) => {
    return navigate(path);
  };

  return (
    <LinkbarContainer isMobile={isMobile} id="linkbar-container">
      <LinkbarWrapper>
        <LinkGroup>
          <LinkWrapper
            onClick={() => handleLinkClick("/fixture")}
            isCurrent={isCurrent("fixture")}
          >
            {isMobile ? (
              <BiFootball
                size="2rem"
                color={isCurrent("fixture") ? "pink" : ""}
              />
            ) : (
              <CustomLink>Fixture</CustomLink>
            )}
          </LinkWrapper>
          <LinkWrapper
            onClick={() => handleLinkClick("/predictions")}
            isCurrent={isCurrent("predictions")}
          >
            {isMobile ? (
              <FaListUl
                size="2rem"
                color={isCurrent("predictions") ? "pink" : ""}
              />
            ) : (
              <CustomLink>{t("predictions")}</CustomLink>
            )}
          </LinkWrapper>

          <LinkWrapper
            onClick={() => handleLinkClick("/scores")}
            isCurrent={isCurrent("scores")}
          >
            {isMobile ? (
              <GiPodiumWinner
                size="2rem"
                color={isCurrent("scores") ? "pink" : ""}
              />
            ) : (
              <CustomLink>{t("scores")}</CustomLink>
            )}
          </LinkWrapper>
          <LinkWrapper
            onClick={() => handleLinkClick("/groups")}
            isCurrent={isCurrent("groups")}
          >
            {isMobile ? (
              <HiUserGroup
                size="2rem"
                color={isCurrent("groups") ? "pink" : ""}
              />
            ) : (
              <CustomLink>{t("groups")}</CustomLink>
            )}
          </LinkWrapper>
        </LinkGroup>
      </LinkbarWrapper>
    </LinkbarContainer>
  );
}
