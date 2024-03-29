import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ToggleSwitch from "../../common/ToggleSwitch/ToggleSwitch";
import { PredictionsPageWrapper } from "./Predictions.styles";
import { GroupSelector } from "./components/GroupSelector";
import { Spinner } from "../../common/Spinner/Spinner";
import { useGetUserGroupsData } from "../../hooks/useGetUserGroupsData";
import { Info } from "../../common/Info/Info";

import { Text } from "../../common/common.styles";

function PredictionsPage() {
  const [mode, setMode] = useState("edit");

  const {
    isLoadingUserGroupsData,
    userGroupList,
    selectedUserGroup,
    handleGroupSelect,
    isNew,
  } = useGetUserGroupsData();

  const { t } = useTranslation();

  const predictionModes = {
    left: {
      display: t("results").toUpperCase(),
      name: "results",
      color: "orange",
    },
    right: {
      display: t("predict").toUpperCase(),
      name: "edit",
      color: "salmon",
    },
  };

  return (
    <PredictionsPageWrapper id="mi-prode-container">
      <Text size="2.5rem" weight="500" align="center">
        {t("predictions").toUpperCase()}
      </Text>
      {userGroupList.length === 0 && (
        <>
          {isLoadingUserGroupsData && <Spinner />}
          {!isLoadingUserGroupsData && (
            <Text size="1.5rem" align="center" margin="1rem">
              {t("noGroups")}
            </Text>
          )}
        </>
      )}

      {userGroupList.length > 1 && (
        <GroupSelector
          isLoading={isLoadingUserGroupsData}
          selectedUserGroup={selectedUserGroup}
          userGroupList={userGroupList}
          handleGroupSelect={handleGroupSelect}
        />
      )}

      {userGroupList.length > 0 && (
        <>
          {selectedUserGroup.extraPredictions?.length > 0 && (
            <Info>
              {t("extraPredictionsWarning")}
              <Link to={`/groups/${selectedUserGroup.name}?extra=true`}>
                {t("here")}
              </Link>
            </Info>
          )}
          <ToggleSwitch mode={mode} setMode={setMode} modes={predictionModes} />
          <Outlet context={{ mode, selectedUserGroup, setMode, isNew }} />
        </>
      )}
    </PredictionsPageWrapper>
  );
}

export default PredictionsPage;
