import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getGroupScores } from "api/groups";
import { GroupSelector } from "../../../Predictions/components/GroupSelector";
import { useGetUserGroupsData } from "hooks/useGetUserGroupsData";
import ScoreList from "../ScoresByGroup/components/ScoreList";
import { BallLoader } from "common/Spinner/BallLoader";
import { getPredictions, getExtraPredictions } from "api/predictions";
import { Info } from "common/Info/Info";
import { isEmpty } from "lodash";
import { Spinner } from "common/Spinner/Spinner";
import Graphs from "./components/Graphs";
import MatchNavigator from "../MatchNavigator";
import useCleanupController from "hooks/useCleanupController";
import { calculateExtraPredictionsScores } from "../../scoresPageHelpers";

import {
  CardContainer,
  CardWrapper,
  Text,
} from "../../../../common/common.styles";
import { Link } from "react-router-dom";

export default function ScoresByGroup() {
  const [scores, setScores] = useState({});
  const [extraPredictions, setExtraPredictions] = useState({});
  const [predictions, setPredictions] = useState([]);
  const [checked, setChecked] = useState({
    scores: false,
    predictions: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [signal, cleanup, handleCancel] = useCleanupController();
  const { t } = useTranslation();
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
    getExtraPredictions(selectedUserGroup.id, false, signal)
      .then(
        (res) => res?.data && setExtraPredictions(res.data.extraPredictions)
      )
      .catch((err) => handleCancel(err));
  };

  useEffect(() => {
    if (!selectedUserGroup) return;
    setIsLoading(true);
    setExtraPredictions({});
    setChecked({ scores: false, predictions: false, rules: false });
    getGroupData();
    return cleanup;
  }, [selectedUserGroup]);

  useEffect(() => {
    if (!checked.scores || !extraPredictions || isEmpty(extraPredictions))
      return;
    setScores((prevScores) => ({
      ...prevScores,
      scores: calculateExtraPredictionsScores(
        selectedUserGroup,
        extraPredictions,
        prevScores
      ),
    }));
  }, [extraPredictions, checked.scores]);

  useEffect(() => {
    if (!checked.predictions || !checked.scores) return;
    setIsLoading(false);
  }, [checked.predictions, checked.scores]);

  return (
    <CardContainer>
      <CardWrapper border="none" isMobile={true}>
        <Text size="2.5rem" weight="500" align="center">
          {t("scores").toUpperCase()}
        </Text>
        {!isLoading && userGroupList.length > 0 && (
          <Info>{t("scoresAutomatically")}</Info>
        )}
        {isLoadingUserGroupsData && <Spinner />}
        {!isLoadingUserGroupsData && userGroupList.length === 0 && (
          <Text size="1.5rem" align="center" margin="1rem">
            {t("noGroups")}
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
            {selectedUserGroup.extraPredictions?.length > 0 && (
              <Text align="right">
                <Link to={`/scores/${selectedUserGroup.name}/extra`}>
                  {`${t("extraPredictions")} >`}
                </Link>
              </Text>
            )}
            <ScoreList scores={scores} />
            {predictions.length > 0 && (
              <MatchNavigator>
                <Graphs
                  predictions={predictions}
                  groupData={selectedUserGroup}
                />
              </MatchNavigator>
            )}
          </>
        )}
      </CardWrapper>
    </CardContainer>
  );
}
