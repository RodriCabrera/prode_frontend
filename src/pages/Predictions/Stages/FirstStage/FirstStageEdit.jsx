import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGroupStage } from '../../../../api/fixture';
import { Spinner } from '../../../../common/Spinner/Spinner';
import FirstStagePredictionsForm from './FirstStagePredictionsForm';

export function FirstStageEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstStageData, setFirstStageData] = useState([]); // Toda la data de la fase de grupos para este userGroup

  useEffect(() => {
    setIsLoading(true);
    getGroupStage() // Con la data de esta llamada armo las tablas.
      .then((res) => setFirstStageData(res.data.fixture))
      .finally(() => setIsLoading(false));
  }, []);
  if (isLoading) return <Spinner />;
  return (
    <>
      <Link to="..">Volver a selección de fases</Link>
      <FirstStagePredictionsForm firstStageData={firstStageData} />
    </>
  );
}
