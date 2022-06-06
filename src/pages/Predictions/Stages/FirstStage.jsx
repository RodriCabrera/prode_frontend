import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getGroupStage } from '../../../api/fixture';
import { createPredictions, getPredictions } from '../../../api/predictions';
import { Spinner } from '../../../common/Spinner/Spinner';
import PredictionForm from '../PredictionForm';
import {
  formatPredictionsToDisplay,
  formatPredictionsToPost,
} from '../predictionsPageUtils';

function FirstStage({ resultsMode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [firstStageData, setFirstStageData] = useState([]); // Toda la data de la fase de grupos para este userGroup
  const [selectedGroup] = useOutletContext();
  const [groupNumber, setGroupNumber] = useState(0); // 0 - A, 1 - B, etc.
  const [errorMessages, setErrorMessages] = useState([]);
  const { values, handleChange, resetForm } = useFormik({
    initialValues: {},
  });

  useEffect(() => {
    setIsLoading(true);
    getGroupStage() // Con la data de esta llamada armo las tablas.
      .then((res) => setFirstStageData(res.data.fixture))
      .finally(() => setIsLoading(false));
  }, []);

  const updatePredictions = (stageName) => {
    setIsLoading(true);
    getPredictions(selectedGroup.id, stageName)
      .then((res) => {
        resetForm({ values: formatPredictionsToDisplay(res.data) });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (firstStageData.length > 0) {
      updatePredictions('GRUPOS');
    }
  }, [firstStageData]);

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
          updatePredictions('GRUPOS');
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
    updatePredictions('GRUPOS');
  };

  const handlePrevGroup = () => {
    setGroupNumber((prevState) => prevState - 1);
    updatePredictions('GRUPOS');
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Link to="..">Volver a selección de fases</Link>
      {resultsMode ? (
        <PredictionForm
          resultsMode
          groupNumber={groupNumber}
          stageData={firstStageData}
          handleNextGroup={handleNextGroup}
          handlePrevGroup={handlePrevGroup}
          values={values}
        />
      ) : (
        <PredictionForm
          groupNumber={groupNumber}
          handleSubmit={handleSubmit}
          stageData={firstStageData}
          errorMessages={errorMessages}
          handleNextGroup={handleNextGroup}
          handlePrevGroup={handlePrevGroup}
          values={values}
          handleChange={handleChange}
        />
      )}
    </>
  );
}

export default FirstStage;
