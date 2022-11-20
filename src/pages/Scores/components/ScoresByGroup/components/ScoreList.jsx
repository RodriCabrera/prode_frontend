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

  const renderPosition = (score) => {
    // Case: All in 0:
    if (scores.scores.filter((score) => score.score !== 0).length === 0) {
      return "";
    }
    const sortedList = scores.scores.sort((a, b) => a.value - b.value); // sortedList : []

    // goldScore, silverScore & bronzeScore type number.
    const goldScore = sortedList?.[0].score;

    const silverScore = sortedList
      ?.filter((s) => s.score !== goldScore)
      .sort((a, b) => a.value - b.value)[0].score;

    const bronzeScore = sortedList
      ?.filter((s) => s.score !== goldScore)
      ?.filter((s) => s.score !== silverScore)
      .sort((a, b) => a.value - b.value)[0].score;

    if (score === goldScore) return "🥇";
    if (score === silverScore) return "🥈";
    if (score === bronzeScore) return "🥉";
    return "";
  };

  const handleUserClick = (user) => {
    if (user === userContext.user.name) return navigate("/profile/");
    return navigate(`/profile/${user}`);
  };
  return (
    <ScoreListWrapper isMobile={isMobile}>
      {scores?.scores.map((score) => {
        return (
          <ScoreItem key={score.user}>
            <ListElement
              key={score.user}
              onClick={() => handleUserClick(score.user)}
              avatar={
                <UserMiniAvatar avatar={score.avatar} name={score.user} />
              }
            >
              <div>{`${renderPosition(score.score)} ${score.user}`}</div>
            </ListElement>
            <div>{score.score}</div>
          </ScoreItem>
        );
      })}
    </ScoreListWrapper>
  );
}
