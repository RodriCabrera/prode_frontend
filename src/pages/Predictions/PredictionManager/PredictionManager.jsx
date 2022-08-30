import { useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createPredictions,
  getPredictions,
  getFirstStagePredictionsByGroup,
} from '../../../api/predictions';
import {
  Button,
  CardContainer,
  CardTitle,
  CardWrapper,
  Text,
} from '../../../common/common.styles';
import { PredictionForm } from '../PredictionForm/PredictionForm';
import { References } from '../../../common/References';
import {
  formatPredictionsToDisplay,
  formatPredictionsToPost,
  groupNumberMod,
  numberToGroupLetter,
} from '../predictionsPageUtils';
import { usePrompt } from '../../../hooks/usePrompt';
import useToggleModal from '../../../hooks/useToggleModal';
import Modal from '../../../common/Modal/Modal';
import { getStageName, STAGE_NAMES } from './PredictionManagerUtils';
import { useSwitchGroupNumber } from './hooks/useSwitchGroupNumber';
import { useGetStageData } from './hooks/useGetStageData';
import useCleanupController from '../../../hooks/useCleanupController';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { BallLoader } from '../../../common/Spinner/BallLoader';
import GroupSwitchButtons from '../PredictionForm/GroupSwitchButtons';
import { FormWrapper } from '../Predictions.styles';

function PredictionManager() {
  const [isLoading, setIsLoading] = useState(false);
  const { mode } = useOutletContext();
  const resultsMode = mode === 'results';
  const [errorMessages, setErrorMessages] = useState([]);
  const { selectedUserGroup } = useOutletContext();
  const { showModal, toggleModal } = useToggleModal();
  const { groupNumber, switchGroupNumber } = useSwitchGroupNumber();
  const { stageData } = useGetStageData();
  const { values, handleChange, resetForm, dirty } = useFormik({
    initialValues: {},
  });
  const [signal, cleanup, handleCancel] = useCleanupController();
  const { phase } = useParams();
  const isMobile = useIsMobile();

  usePrompt('Continuar? Hay modificaciones sin guardar', dirty);

  const updatePredictionsByStage = () => {
    if (getStageName(phase) !== STAGE_NAMES.GRUPOS)
      return getPredictions(selectedUserGroup?.id, getStageName(phase), signal);
    const groupLeter = numberToGroupLetter(groupNumber);
    return getFirstStagePredictionsByGroup(
      selectedUserGroup?.id,
      groupLeter,
      signal
    );
  };

  const updatePredictions = () => {
    setIsLoading(true);
    resetForm({});
    updatePredictionsByStage()
      .then((res) => {
        resetForm({ values: formatPredictionsToDisplay(res.data) || {} });
      })
      .catch((err) => handleCancel(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    updatePredictions();
    return cleanup;
  }, [stageData]);

  useMemo(() => {
    if (stageData?.length > 0) updatePredictions();
  }, [groupNumber, selectedUserGroup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.promise(
      createPredictions(formatPredictionsToPost(values, selectedUserGroup?.id))
        .then((res) => {
          setErrorMessages(res.data.errors);
        })
        .finally(() => {
          setIsLoading(false);
          updatePredictions();
        }),
      {
        pending: 'Enviando predicciones...',
        success: 'Predicciones enviadas con éxito',
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  const handleGroupSwitch = (value) => {
    if (dirty) {
      toggleModal();
    } else {
      switchGroupNumber(value);
    }
  };

  if (isLoading)
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

  return (
    <>
      <Link to="..">Volver a selección de fases</Link>

      {selectedUserGroup ? (
        <>
          {getStageName(phase) !== STAGE_NAMES.GRUPOS ? (
            // Form para NO fase grupos:
            <PredictionForm
              dirty={dirty}
              resultsMode={resultsMode}
              handleSubmit={!resultsMode && handleSubmit}
              stageData={stageData}
              errorMessages={errorMessages}
              values={values}
              handleChange={handleChange}
            />
          ) : (
            // Form para fase de grupos:
            <>
              <PredictionForm
                dirty={dirty}
                groupNumber={groupNumber}
                handleSubmit={!resultsMode ? handleSubmit : undefined}
                stageData={stageData}
                errorMessages={errorMessages}
                values={values}
                handleChange={!resultsMode ? handleChange : undefined}
              />
              <FormWrapper>
                <GroupSwitchButtons
                  handlePrevGroup={() => handleGroupSwitch(-1)}
                  handleNextGroup={() => handleGroupSwitch(1)}
                  prevGroupName={
                    stageData[groupNumberMod(groupNumber - 1)]?.name
                  }
                  nextGroupName={
                    stageData[groupNumberMod(groupNumber + 1)]?.name
                  }
                />
              </FormWrapper>
            </>
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
      <Modal show={showModal} toggle={toggleModal}>
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
      </Modal>
    </>
  );
}

export default PredictionManager;
