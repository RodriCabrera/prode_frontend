import React, { useCallback, useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import {
  CardContainer,
  CardTitle,
  CardWrapper,
  Text,
} from '../../../common/common.styles';
import { References } from '../../../common/References';
import {
  groupNumberMod,
  numberToGroupLetter,
  debounce,
} from '../predictionsPageUtils';
import { getStageName, STAGE_NAMES } from './PredictionManagerUtils';
import { useGetStageData } from './hooks/useGetStageData';
import useCleanupController from '../../../hooks/useCleanupController';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { BallLoader } from '../../../common/Spinner/BallLoader';
import { FormWrapper } from '../Predictions.styles';
import PredictionForm from '../PredictionForm/PredictionForm';
import GroupSwitchButtons from '../PredictionForm/GroupSwitchButtons';

export default function PredictionManager() {
  const { mode } = useOutletContext();
  const resultsMode = mode === 'results';
  const { selectedUserGroup } = useOutletContext();
  const { stageData, isStageDataLoading } = useGetStageData();
  const [groupNumber, setGroupNumber] = useState(0);
  const [targetGroupNumber, setTargetGroupNumber] = useState(groupNumber);
  const [hasChangedGroup, setChangedGroup] = useState(false);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const { phase } = useParams();
  const isMobile = useIsMobile();

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
          border={isMobile ? 'none' : null}
          style={{ height: '400px' }}
        >
          <BallLoader />
        </CardWrapper>
      </CardContainer>
    );
  const isGroups = () => getStageName(phase) === STAGE_NAMES.GRUPOS;
  return (
    <>
      <Link to="..">Volver a selección de fases</Link>

      {selectedUserGroup ? (
        <>
          {isGroups() && (
            <>
              {' '}
              <CardTitle marginBottom="0">
                Grupo {numberToGroupLetter(groupNumberMod(targetGroupNumber))}
              </CardTitle>
              {resultsMode && selectedUserGroup && (
                <References
                  green="Acertaste resultado"
                  red="No suma"
                  yellow="Acertaste ganador"
                  gray="No evaluado"
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
          NO ELEGISTE NINGUN GRUPO
        </Text>
      )}
    </>
  );
}
