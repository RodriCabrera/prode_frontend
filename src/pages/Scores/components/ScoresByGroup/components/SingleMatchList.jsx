import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../../../common/AuthProvider";
import { ListElement } from "../../../../../common/Lists/ListElement";
import { UserMiniAvatar } from "../../../../../common/UserMiniAvatar/UserMiniAvatar";
import { useIsMobile } from "../../../../../hooks/useIsMobile";

import { CardWrapper, CardTitle } from "../../../../../common/common.styles";

const ListContainer = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  width: 100%;
  justify-content: center;
  align-items: stretch;
  flex-wrap: nowrap;
  gap: ${({ isMobile }) => (isMobile ? "0.25rem" : "0.75rem")};
  margin: 1rem;
`;

const UserListContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export default function SingleMatchList({ data, userAvatars, scoring }) {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userContext = useContext(AuthContext);

  const handleProfileNavigate = (username) => {
    if (username === userContext.user.name) return navigate("/profile");
    return navigate(`/profile/${username}`);
  };

  const groupedUsers = [
    {
      name: t("resultExact"),
      users: Object.entries(data)
        .filter(([key, value]) => value === scoring.FULL && key)
        .map(([key]) => key),
      color: "green",
    },
    {
      name: t("resultWinner"),
      users: Object.entries(data)
        .filter(([key, value]) => value === scoring.WINNER && key)
        .map(([key]) => key),
      color: "gold",
    },
    {
      name: t("resultNone"),
      users: Object.entries(data)
        .filter(([key, value]) => value === scoring.NONE && key)
        .map(([key]) => key),
      color: "tomato",
    },
  ];
  return (
    <ListContainer isMobile={isMobile}>
      {groupedUsers.map((group) => {
        if (group.users.length > 0)
          return (
            <CardWrapper isMobile key={group.name} border={isMobile && "none"}>
              <CardTitle marginBottom={isMobile && "0"}>
                <span
                  style={{ color: group.color, textDecoration: "underline" }}
                >
                  {group.name}
                </span>
              </CardTitle>
              <UserListContainer>
                {group.users.map((user) => {
                  return (
                    <ListElement
                      key={user}
                      avatar={<UserMiniAvatar avatar={userAvatars[user]} />}
                      onClick={() => handleProfileNavigate(user)}
                    >
                      {user}
                    </ListElement>
                  );
                })}
              </UserListContainer>
            </CardWrapper>
          );
      })}
    </ListContainer>
  );
}
