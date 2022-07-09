import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getGroupStage } from '../../../api/fixture';
import {
  createPredictions,
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

function FirstStage() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstStageData, setFirstStageData] = useState([]); // Toda la data de la fase de grupos para este userGroup
  const { selectedUserGroup, mode } = useOutletContext();
  const resultsMode = mode === 'results';
  const [groupNumber, setGroupNumber] = useState(0); // 0 - A, 1 - B, etc.
  const [errorMessages, setErrorMessages] = useState([]);
  const { values, handleChange, resetForm, dirty } = useFormik({
    initialValues: {},
  });

  usePrompt('Continuar? Hay modificaciones sin guardar', dirty);

  useEffect(() => {
    if (selectedUserGroup) {
      setIsLoading(true);
      getGroupStage() // TODO: Se debería traer el fixture de 1 grupo. No toda la fase.
        // getFixture(selectedUserGroup.id, 'GRUPOS') // ? Algo así? pero devuelve []
        .then((res) => {
          setFirstStageData(res.data.fixture);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedUserGroup]);

  const updatePredictions = () => {
    setIsLoading(true);
    const groupLeter = numberToGroupLetter(groupNumber);
    getFirstStagePredictionsByGroup(selectedUserGroup?.id, groupLeter)
      .then((res) => {
        resetForm({ values: formatPredictionsToDisplay(res.data) || {} });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (firstStageData.length > 0) {
      updatePredictions();
    }
  }, [firstStageData, groupNumber, selectedUserGroup]);

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
        <PredictionForm
          groupNumber={groupNumber}
          handleSubmit={!resultsMode ? handleSubmit : undefined}
          stageData={firstStageData}
          errorMessages={errorMessages}
          handleNextGroup={handleNextGroup}
          handlePrevGroup={handlePrevGroup}
          values={values}
          handleChange={!resultsMode ? handleChange : undefined}
          groupPhase
        />
      ) : (
        <Text size="1.5rem" weight="800" align="center" color="tomato">
          NO ELEGISTE NINGUN GRUPO
        </Text>
      )}
    </>
  );
}

export default FirstStage;
