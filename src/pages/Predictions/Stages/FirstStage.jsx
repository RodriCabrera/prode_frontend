/* eslint-disable react/jsx-no-useless-fragment */
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getFixture, getGroupStage } from '../../../api/fixture';
import {
  createPredictions,
  getPredictions,
  getFirstStagePredictionsByGroup,
} from '../../../api/predictions';
import {
  CardContainer,
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
import { usePrompt } from '../../../hooks/routerPrompt';

const STAGE_NAMES = {
  GRUPOS: 'GRUPOS',
  OCTAVOS: 'OCTAVOS',
  CUARTOS: 'CUARTOS',
  SEMIS: 'SEMIFINAL',
  FINAL: 'FINAL',
  TERCER_PUESTO: 'TERCER PUESTO',
};

function FirstStage() {
  const [isLoading, setIsLoading] = useState(false);
  const [stageData, setStageData] = useState([]); // Toda la data de la fase seleccionada para este userGroup
  const { selectedUserGroup, mode } = useOutletContext();
  const resultsMode = mode === 'results';
  const [groupNumber, setGroupNumber] = useState(0); // 0 - A, 1 - B, etc.
  const [errorMessages, setErrorMessages] = useState([]);
  const { values, handleChange, resetForm, dirty } = useFormik({
    initialValues: {},
  });
  const { phase } = useParams();

  usePrompt('Continuar? Hay modificaciones sin guardar', dirty);

  const getStageName = () => {
    switch (phase) {
      case '16':
        return STAGE_NAMES.OCTAVOS;
      case '8':
        return STAGE_NAMES.CUARTOS;
      case 'semis':
        return STAGE_NAMES.SEMIS;
      case 'final':
        return STAGE_NAMES.FINAL;
      case '3':
        return STAGE_NAMES.TERCER_PUESTO;
      case 'groups':
      default:
        return STAGE_NAMES.GRUPOS;
    }
  };
  const getPhaseFixture = () => {
    if (getStageName() !== STAGE_NAMES.GRUPOS)
      return getFixture('', getStageName());
    return getGroupStage();
  };

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
    if (stageData.length > 0) {
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

  const handleNextGroup = () => {
    setGroupNumber((prevState) => prevState + 1);
  };

  const handlePrevGroup = () => {
    setGroupNumber((prevState) => prevState - 1);
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
          red="Acertaste ganador"
          yellow="No suma"
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
              handleSubmit={!resultsMode && handleSubmit}
              stageData={stageData}
              errorMessages={errorMessages}
              handleNextGroup={handleNextGroup}
              handlePrevGroup={handlePrevGroup}
              values={values}
              handleChange={!resultsMode && handleChange}
              groupPhase
            />
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

export default FirstStage;
