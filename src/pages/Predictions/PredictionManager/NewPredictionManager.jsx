// import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import {
//   createPredictions,
//   getPredictions,
//   getFirstStagePredictionsByGroup,
// } from '../../../api/predictions';
import {
  // Button,
  CardContainer,
  CardTitle,
  CardWrapper,
  Text,
} from '../../../common/common.styles';
// import { PredictionForm } from '../PredictionForm/PredictionForm';
import { References } from '../../../common/References';
import {
  // formatPredictionsToDisplay,
  // formatPredictionsToPost,
  groupNumberMod,
  numberToGroupLetter,
  debounce,
} from '../predictionsPageUtils';
// import { usePrompt } from '../../../hooks/usePrompt';
// import useToggleModal from '../../../hooks/useToggleModal';
// import Modal from '../../../common/Modal/Modal';
import { getStageName, STAGE_NAMES } from './PredictionManagerUtils';
// import { useSwitchGroupNumber } from './hooks/useSwitchGroupNumber';
import { useGetStageData } from './hooks/useGetStageData';
import useCleanupController from '../../../hooks/useCleanupController';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { BallLoader } from '../../../common/Spinner/BallLoader';
// import GroupSwitchButtons from '../PredictionForm/GroupSwitchButtons';
import { FormWrapper } from '../Predictions.styles';
import NewPredictionForm from '../PredictionForm/NewPredictionForm';
import NewGroupSwitchButtons from '../PredictionForm/NewGroupSwitchButtons';

function NewPredictionManager() {
  // const [isLoading, setIsLoading] = useState(false);
  const { mode } = useOutletContext();
  const resultsMode = mode === 'results';
  // const [errorMessages, setErrorMessages] = useState([]);
  const { selectedUserGroup } = useOutletContext();
  // const { showModal, toggleModal } = useToggleModal();
  // const { groupNumber, switchGroupNumber } = useSwitchGroupNumber();
  const { stageData, isStageDataLoading } = useGetStageData();
  const [groupNumber, setGroupNumber] = useState(0);
  const [targetGroupNumber, setTargetGroupNumber] = useState(groupNumber);
  const [hasChangedGroup, setChangedGroup] = useState(false);
  // const { values, handleChange, resetForm, dirty } = useFormik({
  //   initialValues: {},
  // });
  const [signal, cleanup, handleCancel] = useCleanupController();
  const { phase } = useParams();
  const isMobile = useIsMobile();

  // usePrompt('Continuar? Hay modificaciones sin guardar', dirty);

  // const updatePredictionsByStage = () => {
  //   if (getStageName(phase) !== STAGE_NAMES.GRUPOS)
  //     return getPredictions(selectedUserGroup?.id, getStageName(phase), undefined, signal);
  //   const groupLeter = numberToGroupLetter(groupNumber);
  //   return getFirstStagePredictionsByGroup(
  //     selectedUserGroup?.id,
  //     groupLeter,
  //     signal
  //   );
  // };

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

  // const updatePredictions = () => {
  //   setIsLoading(true);
  //   resetForm({});
  //   updatePredictionsByStage()
  //     .then((res) => {
  //       resetForm({ values: formatPredictionsToDisplay(res.data) || {} });
  //     })
  //     .catch((err) => handleCancel(err))
  //     .finally(() => setIsLoading(false));
  // };

  // useEffect(() => {
  //   updatePredictions();
  //   return cleanup;
  // }, [stageData]);

  // useMemo(() => {
  //   if (stageData?.length > 0) updatePredictions();
  // }, [groupNumber, selectedUserGroup]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   toast.promise(
  //     createPredictions(formatPredictionsToPost(values, selectedUserGroup?.id))
  //       .then((res) => {
  //         setErrorMessages(res.data.errors);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //         updatePredictions();
  //       }),
  //     {
  //       pending: 'Enviando predicciones...',
  //       success: 'Predicciones enviadas con éxito',
  //       error: {
  //         render({ data }) {
  //           return data.response.data.error;
  //         },
  //       },
  //     }
  //   );
  // };

  // const handleGroupSwitch = (value) => {
  //   if (dirty) {
  //     toggleModal();
  //   } else {
  //     switchGroupNumber(value);
  //   }
  // };

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
            <CardTitle>
              Grupo {numberToGroupLetter(groupNumberMod(targetGroupNumber))}
            </CardTitle>
          )}
          <NewPredictionForm
            fixture={
              isGroups() ? stageData[groupNumberMod(groupNumber)] : stageData
            }
            hasChangedGroup={hasChangedGroup}
          />
          {isGroups() && (
            <FormWrapper>
              <NewGroupSwitchButtons setNewGroupNumber={setTargetGroupNumber} />
            </FormWrapper>
          )}
        </>
      ) : (
        <Text size="1.5rem" weight="800" align="center" color="tomato">
          NO ELEGISTE NINGUN GRUPO
        </Text>
      )}
      {resultsMode && selectedUserGroup && (
        <References
          green="Acertaste resultado"
          red="No suma"
          yellow="Acertaste ganador"
          gray="No evaluado"
        />
      )}
      {/* <Modal show={showModal} toggle={toggleModal}>
        <CardTitle>Continuar sin enviar predicciones?</CardTitle>
        <Button
          type="button"
          onClick={() => {
            toggleModal();
            switchGroupNumber(groupNumber);
          }}
        >
          Continuar
        </Button>
      </Modal> */}
    </>
  );
}

export default NewPredictionManager;
