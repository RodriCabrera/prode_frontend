import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useTranslation } from "react-i18next";

import { BallLoader } from "common/Spinner/BallLoader";
import { getRandomUnpredictedMatch } from "api/predictions";
import MiniForm from "./MiniForm";
import useCleanupController from "hooks/useCleanupController";

import { CardContainer, CardWrapper, Text } from "common/common.styles";
import { GroupInfo, GroupAvatar } from "./quickPredictions.styles";

export default function QuickPrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [matchData, setMatchData] = useState({});
  const [groupData, setGroupData] = useState({});
  const [noMatchsOrGroups, setMissingData] = useState(false);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getMatchData = () => {
    setIsLoading(true);
    setMatchData({});
    setGroupData({});
    getRandomUnpredictedMatch(signal)
      .then((res) => {
        if (res.status === 204) {
          setMissingData(true);
        } else {
          setMatchData(res.data.match);
          setGroupData(res.data.group);
        }
      })
      .catch((err) => handleCancel(err) || setMissingData(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getMatchData();
    return cleanup;
  }, []);

  return (
    <CardContainer>
      <CardWrapper width="300px" minHeight="200px">
        <Text size="1.5rem" align="center">
          {t("quickPredictions")}
        </Text>
        {isLoading ? (
          <BallLoader />
        ) : (
          <>
            {groupData.name && (
              <GroupInfo>
                <GroupAvatar
                  onClick={() => navigate(`/groups/${groupData.name}`)}
                >
                  <HiOutlineUserGroup size="1.4rem" />
                </GroupAvatar>
                <Text>{groupData.name}</Text>
              </GroupInfo>
            )}
            {matchData.id && (
              <MiniForm
                matchData={matchData}
                groupData={groupData}
                afterSubmit={getMatchData}
                setIsLoading={setIsLoading}
              />
            )}
          </>
        )}
        {!isLoading && noMatchsOrGroups && (
          <Text align="center" weight="600" color="gray" margin="2rem 0">
            {t("noPredictions")}
          </Text>
        )}
      </CardWrapper>
    </CardContainer>
  );
}
