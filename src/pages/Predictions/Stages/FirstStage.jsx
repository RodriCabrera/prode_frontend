import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getGroupStage } from '../../../api/fixture';
import {
  createPredictions,
  getFirstStagePredictionsByGroup,
} from '../../../api/predictions';
import { Spinner } from '../../../common/Spinner/Spinner';
import { PredictionForm } from '../PredictionForm';
import { PredictionReferences } from '../PredictionReferences';
import {
  formatPredictionsToDisplay,
  formatPredictionsToPost,
  numberToGroupLetter,
} from '../predictionsPageUtils';

function FirstStage({ resultsMode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [firstStageData, setFirstStageData] = useState([]); // Toda la data de la fase de grupos para este userGroup
  const [selectedGroup] = useOutletContext();
  const [groupNumber, setGroupNumber] = useState(0); // 0 - A, 1 - B, etc.
  const [errorMessages, setErrorMessages] = useState([]);
  const { values, handleChange, resetForm, dirty } = useFormik({
    initialValues: {},
  });
  console.log('DIRTY', dirty); // TODO: Modal '¿Estás seguro de que quieres salir sin guardar?'
  useEffect(() => {
    setIsLoading(true);
    getGroupStage() // TODO: Se debería traer el fixture de 1 grupo. No toda la fase.
      // getFixture(selectedGroup.id, 'GRUPOS') // ? Algo así, pero devuelve []
      .then((res) => {
        setFirstStageData(res.data.fixture);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const updatePredictions = () => {
    setIsLoading(true);
    const groupLeter = numberToGroupLetter(groupNumber);
    getFirstStagePredictionsByGroup(selectedGroup.id, groupLeter)
      .then((res) => {
        resetForm({ values: formatPredictionsToDisplay(res.data) || {} });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (firstStageData.length > 0) {
      updatePredictions();
    }
  }, [firstStageData, groupNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.promise(
      createPredictions(formatPredictionsToPost(values, selectedGroup.id))
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
      {resultsMode && <PredictionReferences />}
      <PredictionForm
        resultsMode={resultsMode}
        groupNumber={groupNumber}
        handleSubmit={!resultsMode && handleSubmit}
        stageData={firstStageData}
        errorMessages={errorMessages}
        handleNextGroup={handleNextGroup}
        handlePrevGroup={handlePrevGroup}
        values={values}
        handleChange={!resultsMode && handleChange}
        groupPhase
      />
    </>
  );
}

export default FirstStage;
