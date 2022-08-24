import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { getPhaseFixture } from '../PredictionManagerUtils';
import useCleanupController from '../../../../hooks/useCleanupController';

export const useGetStageData = () => {
  const [stageData, setStageData] = useState([]); // Toda la data de la fase seleccionada para este userGroup
  const { selectedUserGroup } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const { phase } = useParams();
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    if (selectedUserGroup) {
      setIsLoading(true);
      getPhaseFixture(phase, signal)
        .then((res) => {
          setStageData(res.data.fixture);
        })
        .catch(err => handleCancel(err))
        .finally(() => setIsLoading(false));
    }
    return cleanup;
  }, [selectedUserGroup, phase]);

  return {stageData, isStageDataLoading: isLoading};
}