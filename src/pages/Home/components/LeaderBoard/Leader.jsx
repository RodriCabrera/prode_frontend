/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { GiPodiumWinner } from 'react-icons/gi';
import { getGroupScores } from '../../../../api/groups';
import { AuthContext } from '../../../../common/AuthProvider';
import { ListElement } from '../../../../common/Lists/ListElement';
import { UserMiniAvatar } from '../../../../common/UserMiniAvatar/UserMiniAvatar';
import useCleanupController from '../../../../hooks/useCleanupController';
import { Text } from '../../../../common/common.styles';

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
  &: hover {
    padding-right: 70%;
  }
  &:after {
    margin-top: 0.5rem;
  }
`;

function Leader({ groupName, isUnique }) {
  const [leaders, setLeaders] = useState(isUnique ? [{}, {}, {}] : [{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getGroupScores(groupName, signal)
      .then((res) => {
        const groupLeaders = res.data.scores;
        setLeaders(isUnique ? groupLeaders.slice(0, 3) : [groupLeaders[0]]);
      })
      .catch((err) => handleCancel(err))
      .finally(() => setIsLoading(false));
    return cleanup;
  }, [groupName, isUnique]);

  const handleProfileNavigate = (username) => {
    if (username === userContext.user.name) return navigate('/profile');
    return navigate(`/profile/${username}`);
  };

  return (
    <div>
      <UserGroupTitle
        withBottomBorder
        onClick={() => navigate(`/groups/${groupName}`)}
      >
        🏆 {groupName}
      </UserGroupTitle>
      {leaders.map((leader, index) => (
        <LeaderElement key={`${groupName}-${index}`}>
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