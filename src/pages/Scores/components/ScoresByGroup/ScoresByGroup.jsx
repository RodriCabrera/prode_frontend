import React, { useState, useEffect } from 'react';
import {
  CardContainer,
  CardWrapper,
  Text,
} from '../../../../common/common.styles';
import ScoreList from '../ScoresByGroup/components/ScoreList';
import { GroupSelector } from '../../../Predictions/components/GroupSelector';
import { useGetUserGroupsData } from '../../../../hooks/useGetUserGroupsData';
import { getGroupScores } from '../../../../api/groups';
import { getPredictions } from '../../../../api/predictions';
import useCleanupController from '../../../../hooks/useCleanupController';
import { BallLoader } from '../../../../common/Spinner/BallLoader';
import { isEmpty } from 'lodash';
import { Spinner } from '../../../../common/Spinner/Spinner';

export default function ScoresByGroup() {
  const [scores, setScores] = useState(undefined);
  const [predictions, setPredictions] = useState(undefined);
  const [checked, setChecked] = useState({scores: false, predictions: false});
  const [isLoading, setIsLoading] = useState(false);
  const [signal, cleanup, handleCancel] = useCleanupController();

  const {
    userGroupList,
    selectedUserGroup,
    isLoadingUserGroupsData,
    handleGroupSelect,
  } = useGetUserGroupsData();

  const getGroupData = () => {
    getGroupScores(selectedUserGroup?.name, signal)
      .then((res) => {
        setScores(res);
        setChecked((prevState) => ({...prevState, scores: true}))
      })
      .catch((err) => handleCancel(err));
    getPredictions(selectedUserGroup?.id, undefined, undefined, false, signal)
      .then((res) => {
        setPredictions(res);
        setChecked((prevState) => ({...prevState, predictions: true}))
      })
      .catch((err) => handleCancel(err));
  };

  useEffect(() => {
    if (!selectedUserGroup) return;
    setIsLoading(true);
    setChecked({scores: false, predictions: false})
    getGroupData();
    return cleanup;
  }, [selectedUserGroup]);

  useEffect(() => {
    if (!checked.predictions || !checked.scores) return
    setIsLoading(false)
  }, [checked.predictions, checked.scores])

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
          <GroupSelector
            selectedUserGroup={selectedUserGroup}
            userGroupList={userGroupList}
            handleGroupSelect={handleGroupSelect}
          />
        )}

        {(selectedUserGroup && isEmpty(scores)) || isLoading ? (
          <BallLoader />
        ) : (
          <ScoreList scores={scores} />
        )}
      </CardWrapper>
    </CardContainer>
  );
}
