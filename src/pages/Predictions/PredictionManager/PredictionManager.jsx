import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
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
import { Spinner } from '../../../common/Spinner/Spinner';
import { PredictionForm } from '../PredictionForm';
import { References } from '../../../common/References';
import {
  formatPredictionsToDisplay,
  formatPredictionsToPost,
  numberToGroupLetter,
} from '../predictionsPageUtils';
import { usePrompt } from '../../../hooks/usePrompt';
import useToggleModal from '../../../hooks/useToggleModal';
import Modal from '../../../common/Modal/Modal';
import {
  getPhaseFixture,
  getStageName,
  STAGE_NAMES,
} from './PredictionManagerUtils';
import { useSwitchGroupNumber } from './hooks/useSwitchGroupNumber';

function PredictionManager() {
  const [isLoading, setIsLoading] = useState(false);
  const [stageData, setStageData] = useState([]); // Toda la data de la fase seleccionada para este userGroup
  const { selectedUserGroup, mode } = useOutletContext();
  const resultsMode = mode === 'results';
  const [errorMessages, setErrorMessages] = useState([]);
  const { values, handleChange, resetForm, dirty } = useFormik({
    initialValues: {},
  });

  const { phase } = useParams();
  const { showModal, toggleModal } = useToggleModal();
  const { groupNumber, switchGroupNumber } = useSwitchGroupNumber();

  usePrompt('Continuar? Hay modificaciones sin guardar', dirty);

  useEffect(() => {
    if (selectedUserGroup) {
      setIsLoading(true);
      getPhaseFixture()
        .then((res) => {
          setStageData(res.data.fixture);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedUserGroup, phase]);

  const updatePredictionsByStage = () => {
    if (getStageName() !== STAGE_NAMES.GRUPOS)
      return getPredictions(selectedUserGroup?.id, getStageName());
    const groupLeter = numberToGroupLetter(groupNumber);
    return getFirstStagePredictionsByGroup(selectedUserGroup?.id, groupLeter);
  };

  const updatePredictions = () => {
    setIsLoading(true);
    updatePredictionsByStage()
      .then((res) => {
        resetForm({ values: formatPredictionsToDisplay(res.data) || {} });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (stageData?.length > 0) {
      updatePredictions();
    }
  }, [stageData, groupNumber, selectedUserGroup]);

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
      switchGroupNumber(value);
      toggleModal();
    } else {
      switchGroupNumber(value);
    }
  };

  if (isLoading)
    return (
      <CardContainer>
        <CardWrapper style={{ height: '400px' }}>
          <Spinner />
        </CardWrapper>
      </CardContainer>
    );

  return (
    <>
      <Link to="..">Volver a selección de fases</Link>
      {resultsMode && selectedUserGroup && (
        <References
          green="Acertaste resultado"
          red="No suma"
          yellow="Acertaste ganador"
          gray="No evaluado"
        />
      )}
      {selectedUserGroup ? (
        <>
          {getStageName() !== STAGE_NAMES.GRUPOS ? (
            <PredictionForm
              resultsMode={resultsMode}
              handleSubmit={!resultsMode && handleSubmit}
              stageData={stageData}
              errorMessages={errorMessages}
              values={values}
              handleChange={handleChange}
            />
          ) : (
            <PredictionForm
              groupNumber={groupNumber}
              handleSubmit={!resultsMode ? handleSubmit : undefined}
              stageData={stageData}
              errorMessages={errorMessages}
              handleNextGroup={() => handleGroupSwitch(1)}
              handlePrevGroup={() => handleGroupSwitch(-1)}
              values={values}
              handleChange={!resultsMode ? handleChange : undefined}
              groupPhase
            />
          )}
        </>
      ) : (
        <Text size="1.5rem" weight="800" align="center" color="tomato">
          NO ELEGISTE NINGUN GRUPO
        </Text>
      )}
      <Modal show={showModal} toggle={toggleModal}>
        <CardTitle>Continuar sin enviar predicciones?</CardTitle>
        <Button
          type="button"
          onClick={() => {
            toggleModal();
            switchGroupNumber(groupNumber);
          }}>
          Continuar
        </Button>
      </Modal>
    </>
  );
}

export default PredictionManager;
