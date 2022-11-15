/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { GiPodiumWinner } from "react-icons/gi";

import { getGroupScores } from "../../../../api/groups";
import { AuthContext } from "../../../../common/AuthProvider";
import { ListElement } from "../../../../common/Lists/ListElement";
import { UserMiniAvatar } from "../../../../common/UserMiniAvatar/UserMiniAvatar";
import useCleanupController from "../../../../hooks/useCleanupController";

import { Text } from "../../../../common/common.styles";
import { t } from "i18next";

const LeaderElement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  padding: 0.5rem;
  width: 100%;
`;

const UserGroupTitle = styled(Text)`
  cursor: pointer;
  margin: 0;
  padding-right: 0%;
  &:hover {
    padding-right: 20%;
  }
  &:after {
    margin-top: 0.5rem;
  }
`;

function Leader({ group, isUnique }) {
  const [leaders, setLeaders] = useState(isUnique ? [{}, {}, {}] : [{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [groupScores, setGroupScores] = useState([]);

  const [signal, cleanup, handleCancel] = useCleanupController();
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { name } = group;

  useEffect(() => {
    setIsLoading(true);
    getGroupScores(name, signal)
      .then((res) => {
        const groupLeaders = res.data.scores;
        setGroupScores(res.data);
        setLeaders(isUnique ? groupLeaders.slice(0, 3) : [groupLeaders[0]]);
      })
      .catch((err) => handleCancel(err))
      .finally(() => setIsLoading(false));
    return cleanup;
  }, [name, isUnique]);

  const handleProfileNavigate = (username) => {
    if (username === userContext.user.name) return navigate("/profile");
    return navigate(`/profile/${username}`);
  };

  const allSameScore = () =>
    !groupScores.scores.some(
      (userScore) => userScore.score !== groupScores?.scores?.[0]?.score
    );

  if (group.members.length === 1) return null;

  return (
    <div>
      <UserGroupTitle
        withBottomBorder
        onClick={() => navigate(`/groups/${name}`)}
      >
        🏆 {name}
      </UserGroupTitle>
      {allSameScore && (
        <Text margin="10px 0" color="gray">
          {t("allSameScore")} {groupScores?.scores?.[0]?.score} pts.
        </Text>
      )}
      {!allSameScore &&
        leaders.map((leader, index) => (
          <LeaderElement key={`${name}-${index}`}>
            {isUnique && <span>{index + 1}.</span>}
            {isLoading ? (
              <ListElement avatar={<GiPodiumWinner size="1.5rem" />}>
                <p>. . .</p>
              </ListElement>
            ) : (
              <ListElement
                onClick={() => handleProfileNavigate(leader.user)}
                avatar={
                  <UserMiniAvatar avatar={leader.avatar} name={leader.user} />
                }
              >
                <p>{leader.user}</p>
              </ListElement>
            )}
          </LeaderElement>
        ))}
    </div>
  );
}

export default Leader;
