import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../common/AuthProvider';
import { UserMiniAvatar } from '../../common/UserMiniAvatar/UserMiniAvatar';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import { ListElement } from '../../common/Lists/ListElement';
import { GroupScoresForm } from './GroupScoresForm';

function Scores() {
  const [scores, setScores] = useState(undefined);
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    if (user === userContext.user.name) return navigate('/profile/');
    return navigate(`/profile/${user}`);
  };

  return (
    <CardContainer>
      <CardWrapper fullWidth>
        <Text size="2rem" align="center">
          Ver puntajes
        </Text>
        <GroupScoresForm setScores={setScores} />
        {scores?.data.scores.map((score) => {
          return (
            <ListElement
              key={score.user}
              onClick={() => handleUserClick(score.user)}
              avatar={
                <UserMiniAvatar avatar={score.avatar} name={score.user} />
              }
            >
              <p key={score.user}>{`${score.user} : ${score.score}`}</p>
            </ListElement>
          );
        })}
      </CardWrapper>
    </CardContainer>
  );
}

export default Scores;
