import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getFixtureByStageId } from '../../../api/fixture';
import { createPredictions, getPredictions } from '../../../api/predictions';
import { Spinner } from '../../../common/Spinner/Spinner';
import { getStageId } from '../../Fixture/fixturePageHelpers';
import { PredictionForm } from '../PredictionForm';
import { References } from '../../../common/References';
import {
  formatPredictionsToDisplay,
  formatPredictionsToPost,
} from '../predictionsPageUtils';

function LaterPredictions() {
  const { stage } = useParams();
  const [stageData, setStageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedUserGroup } = useOutletContext();
  const [errorMessages, setErrorMessages] = useState([]);
  const { values, handleChange, resetForm } = useFormik({
    initialValues: {},
  });
  const { mode } = useOutletContext();
  const resultsMode = mode === 'results';

  useEffect(() => {
    setIsLoading(true);
    getFixtureByStageId(getStageId(stage))
      .then((res) => {
        setStageData(res.data.fixture);
      })
      .catch((err) => toast.error(err.response.data.error))
      .finally(() => setIsLoading(false));
  }, []);

  const updatePredictions = () => {
    setIsLoading(true);
    getPredictions(selectedUserGroup.id, getStageId(stage))
      .then((res) => {
        resetForm({ values: formatPredictionsToDisplay(res.data) || {} });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (stageData.length > 0) {
      updatePredictions();
    }
  }, [stageData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.promise(
      createPredictions(formatPredictionsToPost(values, selectedUserGroup.id))
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

  if (isLoading) return <Spinner />;
  return (
    <>
      <Link to="..">Volver a selección de fases</Link>
      {resultsMode && (
        <References
          green="Acertaste resultado"
          red="Acertaste ganador"
          yellow="No suma"
          gray="No evaluado"
        />
      )}
      <PredictionForm
        resultsMode={resultsMode}
        handleSubmit={!resultsMode && handleSubmit}
        stageData={stageData}
        errorMessages={errorMessages}
        values={values}
        handleChange={handleChange}
      />
    </>
  );
}

export default LaterPredictions;
