import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../common/AuthProvider';
import { UserMiniAvatar } from '../../common/UserMiniAvatar/UserMiniAvatar';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import { ListElement } from '../../common/Lists/ListElement';
import { GroupScoresForm } from './GroupScoresForm';
import { getUserGroups } from '../../api/groups';
import { Spinner } from '../../common/Spinner/Spinner';
import useCleanupController from '../../hooks/useCleanupController';

function Scores() {
  const [scores, setScores] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [userGroupList, setUserGroupList] = useState([]);
  const [signal, cleanup, handleCancel] = useCleanupController();

  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    if (user === userContext.user.name) return navigate('/profile/');
    return navigate(`/profile/${user}`);
  };

  const loadUserGroups = () => {
    setIsLoading(true);
    getUserGroups(signal)
      .then(({ data }) => {
        setUserGroupList(data);
      })
      .catch(err => handleCancel(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadUserGroups();
    return cleanup;
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <CardContainer>
      <CardWrapper border="none" fullWidth>
        <Text size="2.5rem" weight="500" align="center">
          PUNTAJES
        </Text>
        {userGroupList.length === 0 ? (
          <Text>No estás en ningún grupo</Text>
        ) : (
          <GroupScoresForm
            setScores={setScores}
            userGroupList={userGroupList}
          />
        )}
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
