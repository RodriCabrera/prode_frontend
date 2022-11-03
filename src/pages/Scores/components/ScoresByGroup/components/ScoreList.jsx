import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { AuthContext } from "common/AuthProvider";
import { ListElement } from "common/Lists/ListElement";
import { useIsMobile } from "hooks/useIsMobile";
import { UserMiniAvatar } from "common/UserMiniAvatar/UserMiniAvatar";

const ScoreListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: ${({ isMobile }) => (isMobile ? "0.4rem" : "1rem")};
  margin: ${({ isMobile }) => (isMobile ? 0 : "auto")};
  max-width: 100%;
`;

const ScoreItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  flex-grow: 1;
  width: 100%;
`;

export default function ScoreList({ scores }) {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const renderPostion = (index) => {
    if (scores.scores.filter((score) => score.score !== 0).length === 0) {
      return "";
    }

    // TODO : Qué pasa si dos usuarios o más tienen el mismo puntaje?
    if (index > 2) return `${index + 1}.`;
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "";
  };

  const handleUserClick = (user) => {
    if (user === userContext.user.name) return navigate("/profile/");
    return navigate(`/profile/${user}`);
  };
  return (
    <ScoreListWrapper isMobile={isMobile}>
      {scores?.scores.map((score, index) => {
        return (
          <ScoreItem key={score.user}>
            <ListElement
              key={score.user}
              onClick={() => handleUserClick(score.user)}
              avatar={
                <UserMiniAvatar avatar={score.avatar} name={score.user} />
              }
            >
              <div>{`${renderPostion(index)} ${score.user}`}</div>
            </ListElement>
            <div>{score.score}</div>
          </ScoreItem>
        );
      })}
    </ScoreListWrapper>
  );
}
