import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { getPhaseFixture } from '../PredictionManagerUtils';

export const useGetStageData = () => {
  const [stageData, setStageData] = useState([]); // Toda la data de la fase seleccionada para este userGroup
  const { selectedUserGroup } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const { phase } = useParams();

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

  return {stageData, isStageDataLoading: isLoading};
}