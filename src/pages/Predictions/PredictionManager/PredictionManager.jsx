import React, { useCallback, useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getStageName, STAGE_NAMES } from "./PredictionManagerUtils";
import { useGetStageData } from "./hooks/useGetStageData";
import useCleanupController from "../../../hooks/useCleanupController";
import { useIsMobile } from "../../../hooks/useIsMobile";
import {
  groupNumberMod,
  numberToGroupLetter,
  debounce,
} from "../predictionsPageUtils";

import { References } from "../../../common/References";
import { BallLoader } from "../../../common/Spinner/BallLoader";
import { FormWrapper } from "../Predictions.styles";
import PredictionForm from "../PredictionForm/PredictionForm";
import GroupSwitchButtons from "../PredictionForm/GroupSwitchButtons";
import { Info } from "../../../common/Info/Info";
import {
  CardContainer,
  CardTitle,
  CardWrapper,
  Text,
} from "../../../common/common.styles";

export default function PredictionManager() {
  const { mode } = useOutletContext();
  const resultsMode = mode === "results";
  const { selectedUserGroup } = useOutletContext();
  const { stageData, isStageDataLoading } = useGetStageData();
  const [groupNumber, setGroupNumber] = useState(0);
  const [targetGroupNumber, setTargetGroupNumber] = useState(groupNumber);
  const [hasChangedGroup, setChangedGroup] = useState(false);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [signal, cleanup, handleCancel] = useCleanupController();
  const { phase } = useParams();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  useEffect(() => {
    setChangedGroup(true);
    setNewGroup();
    return cleanup;
  }, [targetGroupNumber]);

  const debounceAction = debounce((newVal) => {
    setGroupNumber(newVal);
    setChangedGroup(false);
  }, 500);

  const newGroupCb = useCallback((newVal) => debounceAction(newVal), []);

  const setNewGroup = () => {
    newGroupCb(targetGroupNumber);
  };

  if (isStageDataLoading)
    return (
      <CardContainer>
        <CardWrapper
          isMobile={isMobile}
          border={isMobile ? "none" : null}
          style={{ height: "400px" }}
        >
          <BallLoader />
        </CardWrapper>
      </CardContainer>
    );

  const isGroups = () => getStageName(phase) === STAGE_NAMES.GRUPOS;

  return (
    <>
      <Link to="..">{t('goBackStage')}</Link>

      {selectedUserGroup ? (
        <>
          {isGroups() && (
            <>
              {" "}
              <CardTitle marginBottom="0">
                {t('groups').replace('s', '')} {numberToGroupLetter(groupNumberMod(targetGroupNumber))}
              </CardTitle>
              {resultsMode && (
                <Info>
                  {t('switchToPredict')}
                </Info>
              )}
              {resultsMode && selectedUserGroup && (
                <References
                  green={t('resultReferences.green')}
                  red={t('resultReferences.red')}
                  yellow={t('resultReferences.yellow')}
                  gray={t('resultReferences.gray')}
                />
              )}
            </>
          )}
          <PredictionForm
            fixture={
              isGroups() ? stageData[groupNumberMod(groupNumber)] : stageData
            }
            hasChangedGroup={hasChangedGroup}
          />
          {isGroups() && (
            <FormWrapper>
              <GroupSwitchButtons setNewGroupNumber={setTargetGroupNumber} />
            </FormWrapper>
          )}
        </>
      ) : (
        <Text size="1.5rem" weight="800" align="center" color="tomato">
          {t('selectGroup').replace(':', '').toUpperCase()}
        </Text>
      )}
    </>
  );
}
