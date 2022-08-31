import React, { useState, useMemo, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { getPredictions } from '../../../api/predictions';
import { BallLoader } from '../../../common/Spinner/BallLoader';
import useCleanupController from '../../../hooks/useCleanupController';
import { getStageName } from '../PredictionManager/PredictionManagerUtils';
import { debounce } from '../predictionsPageUtils';

export default function NewPredictionForm({ fixture, hasChangedGroup }) {
  const { selectedUserGroup } = useOutletContext();
  const [predictions, setPredictions] = useState({});
  const [signal, cleanup, handleCancel] = useCleanupController();
  const [isLoading, setIsLoading] = useState(hasChangedGroup);
  const { phase } = useParams();

  useEffect(() => {
    if (!fixture) return;
    setIsLoading(true)
    getPredictions(
          selectedUserGroup?.id,
          fixture.id ? undefined : getStageName(phase),
          fixture.id || undefined,
          signal
        )
          .then((res) => setPredictions(res.data))
          .finally(() => setIsLoading(false))
          .catch((err) => handleCancel(err) ? setIsLoading(true) : console.log(err));
    return cleanup;
  }, [fixture]);

//   useEffect(() => {
//     null
//   }, [predictions]);

  return isLoading || hasChangedGroup ? <BallLoader /> : <div>NewPredictionForm</div>;
}
