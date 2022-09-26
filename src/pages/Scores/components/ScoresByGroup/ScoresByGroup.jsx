import React, { useState, useEffect } from "react";
import {
  CardContainer,
  CardWrapper,
  Text,
} from "../../../../common/common.styles";
import ScoreList from "../ScoresByGroup/components/ScoreList";
import { GroupSelector } from "../../../Predictions/components/GroupSelector";
import { useGetUserGroupsData } from "../../../../hooks/useGetUserGroupsData";
import { getGroupScores } from "../../../../api/groups";

import { getPredictions } from "../../../../api/predictions";
import { BallLoader } from "../../../../common/Spinner/BallLoader";
import { isEmpty } from "lodash";
import { Spinner } from "../../../../common/Spinner/Spinner";
import useCleanupController from "../../../../hooks/useCleanupController";
import { Info } from "../../../../common/Info/Info";

export default function ScoresByGroup() {
  const [scores, setScores] = useState({});
  const [predictions, setPredictions] = useState([]);
  const [checked, setChecked] = useState({
    scores: false,
    predictions: false,
  });
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
        setScores(res.data);
        setChecked((prevState) => ({ ...prevState, scores: true }));
      })
      .catch((err) => handleCancel(err));
    getPredictions(selectedUserGroup?.id, undefined, undefined, false, signal)
      .then((res) => {
        setPredictions(res.data);
        setChecked((prevState) => ({ ...prevState, predictions: true }));
      })
      .catch((err) => handleCancel(err));
  };

  useEffect(() => {
    if (!selectedUserGroup) return;
    setIsLoading(true);
    setChecked({ scores: false, predictions: false, rules: false });
    getGroupData();
    return cleanup;
  }, [selectedUserGroup]);

  useEffect(() => {
    if (!checked.predictions || !checked.scores) return;
    setIsLoading(false);
  }, [checked.predictions, checked.scores]);

  return (
    <CardContainer>
      <CardWrapper border="none" isMobile={true}>
        <Text size="2.5rem" weight="500" align="center">
          PUNTAJES
        </Text>
        {!isLoading && userGroupList.length > 0 && (
          <Info>
            Los puntajes se calculan automáticamente según el sistema de
            puntajes
            {userGroupList.length === 1 ? " del grupo" : " de cada grupo grupo"}
            .
          </Info>
        )}
        {isLoadingUserGroupsData && <Spinner />}
        {!isLoadingUserGroupsData && userGroupList.length === 0 && (
          <Text size="1.5rem" align="center" margin="1rem">
            No perteneces a ningún grupo
          </Text>
        )}
        {!isLoadingUserGroupsData && userGroupList.length > 0 && (
          <GroupSelector
            selectedUserGroup={selectedUserGroup}
            userGroupList={userGroupList}
            handleGroupSelect={handleGroupSelect}
          />
        )}

        {(selectedUserGroup && isEmpty(scores)) ||
        isLoading ||
        !scores.scores ? (
          userGroupList.length > 0 && <BallLoader />
        ) : (
          <>
            <ScoreList scores={scores} />
            {/* <MatchNavigator>
              <Graphs predictions={predictions} groupData={selectedUserGroup} />
            </MatchNavigator> */}
          </>
        )}
      </CardWrapper>
    </CardContainer>
  );
}
