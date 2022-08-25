import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserMiniAvatar } from '../../../common/UserMiniAvatar/UserMiniAvatar';
import { ListElement } from '../../../common/Lists/ListElement';
import { AuthContext } from '../../../common/AuthProvider';

export default function ScoreList({ scores }) {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    if (user === userContext.user.name) return navigate('/profile/');
    return navigate(`/profile/${user}`);
  };
  return scores?.data.scores.map((score) => {
    return (
      <ListElement
        key={score.user}
        onClick={() => handleUserClick(score.user)}
        avatar={<UserMiniAvatar avatar={score.avatar} name={score.user} />}>
        <p key={score.user}>{`${score.user} : ${score.score}`}</p>
      </ListElement>
    );
  });
}
