import { useState, useEffect } from 'react';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import ScoreList from './components/ScoreList';
import GroupScoreSelector from './components/GroupScoreSelector';
import { getUserGroups } from '../../api/groups';
import { Spinner } from '../../common/Spinner/Spinner';
import useCleanupController from '../../hooks/useCleanupController';

function Scores() {
  const [scores, setScores] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [userGroupList, setUserGroupList] = useState([]);
  const [signal, cleanup, handleCancel] = useCleanupController();

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
      <CardWrapper border="none">
        <Text size="2.5rem" weight="500" align="center">
          PUNTAJES
        </Text>
        {userGroupList.length === 0 ? (
          <Text>No estás en ningún grupo</Text>
        ) : (
          <GroupScoreSelector 
            userGroupList={userGroupList}
            setScores={setScores}
          />
        )}
        <ScoreList scores={scores} />
      </CardWrapper>
    </CardContainer>
  );
}

export default Scores;
