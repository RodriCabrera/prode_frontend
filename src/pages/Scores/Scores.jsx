import { useState } from 'react';
import { CardContainer, CardWrapper, Text } from '../../common/common.styles';
import ScoreList from './components/ScoreList';
import GroupScoreSelector from './components/GroupScoreSelector';
import { useGetUserGroupsData } from '../../hooks/useGetUserGroupsData';
import { BallLoader } from '../../common/Spinner/BallLoader';
import { isEmpty } from 'lodash';
import { Spinner } from '../../common/Spinner/Spinner';

function Scores() {
  const [scores, setScores] = useState(undefined);
  const [isLoadingScores, setIsLoadingScores] = useState(false);

  const { userGroupList, selectedUserGroup, isLoadingUserGroupsData } =
    useGetUserGroupsData();

  return (
    <CardContainer>
      <CardWrapper border="none" isMobile={true}>
        <Text size="2.5rem" weight="500" align="center">
          PUNTAJES
        </Text>
        {isLoadingUserGroupsData && <Spinner />}
        {!isLoadingUserGroupsData && userGroupList.length === 0 && (
          <Text>No estás en ningún grupo</Text>
        )}
        {!isLoadingUserGroupsData && userGroupList.length > 0 && (
          <GroupScoreSelector
            userGroupList={userGroupList}
            setScores={setScores}
            setIsLoadingScores={setIsLoadingScores}
          />
        )}

        {(selectedUserGroup && isEmpty(scores)) || isLoadingScores ? (
          <BallLoader />
        ) : (
          <ScoreList scores={scores} />
        )}
      </CardWrapper>
    </CardContainer>
  );
}

export default Scores;
