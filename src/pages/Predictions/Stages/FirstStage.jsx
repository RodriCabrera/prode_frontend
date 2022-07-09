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
import { Text } from '../../../common/common.styles';
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
  groups: 'GRUPOS',
  16: 'OCTAVOS',
  8: 'CUARTOS',
  semis: 'SEMIFINALES',
  final: 'FINAL',
  3: 'TERCER PUESTO',
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

  const getPhaseFixture = () => {
    if (STAGE_NAMES[phase] !== STAGE_NAMES.groups)
      return getFixture('', STAGE_NAMES[phase]);
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
    if (STAGE_NAMES[phase] === STAGE_NAMES.groups) {
      const groupLeter = numberToGroupLetter(groupNumber);
      return getFirstStagePredictionsByGroup(selectedUserGroup?.id, groupLeter);
    }
    return getPredictions(selectedUserGroup?.id, STAGE_NAMES[phase]);
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

  if (isLoading) return <Spinner />;

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
          {STAGE_NAMES[phase] === STAGE_NAMES.groups ? (
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
          ) : (
            <PredictionForm
              resultsMode={resultsMode}
              handleSubmit={!resultsMode && handleSubmit}
              stageData={stageData}
              errorMessages={errorMessages}
              values={values}
              handleChange={handleChange}
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
