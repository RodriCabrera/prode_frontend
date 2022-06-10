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
import PredictionForm from '../PredictionForm';
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
  const { values, handleChange, resetForm } = useFormik({
    initialValues: {},
  });

  useEffect(() => {
    setIsLoading(true);
    getGroupStage() // Con la data de esta llamada armo las tablas.
      .then((res) => setFirstStageData(res.data.fixture))
      .finally(() => setIsLoading(false));
  }, []);

  const updatePredictions = () => {
    setIsLoading(true);
    const groupLeter = numberToGroupLetter(groupNumber);
    getFirstStagePredictionsByGroup(groupLeter, selectedGroup.id)
      .then((res) => {
        resetForm({ values: formatPredictionsToDisplay(res.data) });
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
      {/* // TODO: Mejorar estilo y sintaxis de las referencias: */}

      {resultsMode ? (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <div style={{ backgroundColor: 'lightgreen', color: 'black' }}>
              Full: acertaste resultado
            </div>
            <div style={{ backgroundColor: '#FFFF66', color: 'black' }}>
              Half: acertaste ganador
            </div>
            <div style={{ backgroundColor: 'tomato', color: 'black' }}>
              No suma
            </div>
            <div style={{ backgroundColor: 'silver', color: 'black' }}>
              Sin predicción
            </div>
          </div>
          <PredictionForm
            resultsMode
            groupNumber={groupNumber}
            stageData={firstStageData}
            handleNextGroup={handleNextGroup}
            handlePrevGroup={handlePrevGroup}
            values={values}
          />
        </>
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
