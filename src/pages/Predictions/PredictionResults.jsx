import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { getAllPredictions } from '../../api/predictions';
import { Text } from '../../common/common.styles';
import { Spinner } from '../../common/Spinner/Spinner';

function PredictionResults() {
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getAllPredictions()
      .then((res) => setPredictions(res.data))
      .finally(() => setIsLoading(false));
  }, []);
  if (isLoading) return <Spinner />;
  if (isEmpty(predictions)) return <Text>Aún no hiciste predicciones</Text>;

  return <div>PredictionResults</div>;
}

export default PredictionResults;
