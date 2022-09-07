import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { UserMiniAvatar } from '../../../../../common/UserMiniAvatar/UserMiniAvatar';
import { ListElement } from '../../../../../common/Lists/ListElement';
import { AuthContext } from '../../../../../common/AuthProvider';
import { useIsMobile } from '../../../../../hooks/useIsMobile';

const ScoreListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: ${({ isMobile }) => isMobile ? '0.4rem' : '1rem'};
  margin: ${({ isMobile }) => isMobile ? 0 : 'auto'};
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
  const isMobile = useIsMobile()

  const handleUserClick = (user) => {
    if (user === userContext.user.name) return navigate('/profile/');
    return navigate(`/profile/${user}`);
  };
  return (
    <ScoreListWrapper isMobile={isMobile}>
      {scores?.data.scores.map((score, index) => {
        return (
          <ScoreItem key={score.user}>
            <ListElement
              key={score.user}
              onClick={() => handleUserClick(score.user)}
              avatar={<UserMiniAvatar avatar={score.avatar} name={score.user} />}
            >
                <div>{`${index+1}. ${score.user}`}</div>
            </ListElement>
          <div>{score.score}</div>
          </ScoreItem>
        );
      })}
    </ScoreListWrapper>
  );
}
