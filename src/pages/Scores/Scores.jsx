import { useState } from "react";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

import { BallLoader } from "../../common/Spinner/BallLoader";
import { CardContainer, CardWrapper, Text } from "../../common/common.styles";
import { Spinner } from "../../common/Spinner/Spinner";
import { useGetUserGroupsData } from "../../hooks/useGetUserGroupsData";
import GroupScoreSelector from "./components/GroupScoreSelector";
import ScoreList from "./components/ScoreList";

function Scores() {
  const [scores, setScores] = useState(undefined);
  const [isLoadingScores, setIsLoadingScores] = useState(false);
  const { t } = useTranslation();

  const { userGroupList, selectedUserGroup, isLoadingUserGroupsData } =
    useGetUserGroupsData();

  return (
    <CardContainer>
      <CardWrapper border="none" isMobile={true}>
        <Text size="2.5rem" weight="500" align="center">
          {t("scores").toUpperCase()}
        </Text>
        {isLoadingUserGroupsData && <Spinner />}
        {!isLoadingUserGroupsData && userGroupList.length === 0 && (
          <Text size="1.5rem" align="center" margin="1rem">
            {t("noGroups")}
          </Text>
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
