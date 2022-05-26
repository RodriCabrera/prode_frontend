import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FirstStagePredictions from '../pages/Predictions/Stages/FirstStagePredictionsForm';
import LaterPredictions from '../pages/Predictions/Stages/LaterStagesPredictions';
import BannerList from '../pages/Predictions/BannerList';
import Predictions from '../pages/Predictions/Predictions';
import PredictionResults from '../pages/Predictions/PredictionResults';
import EditPredictions from '../pages/Predictions/EditPredictions';

function PredictionsRoutes() {
  return (
    <Routes>
      <Route path="" element={<Predictions />}>
        <Route path="results" element={<PredictionResults />} />
        <Route path="edit" element={<EditPredictions />}>
          <Route index element={<BannerList />} />
          <Route path="first-stage" element={<FirstStagePredictions />} />
          <Route path="later-stages/:stage" element={<LaterPredictions />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default PredictionsRoutes;
