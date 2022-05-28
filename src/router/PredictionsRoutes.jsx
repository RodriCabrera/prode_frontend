import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LaterPredictions from '../pages/Predictions/Stages/LaterStagesPredictions';
import BannerList from '../pages/Predictions/BannerList';
import Predictions from '../pages/Predictions/Predictions';
import PredictionResults from '../pages/Predictions/PredictionResults';
import EditPredictions from '../pages/Predictions/EditPredictions';
import { FirstStageEdit } from '../pages/Predictions/Stages/FirstStage/FirstStageEdit';
import FirstStageResults from '../pages/Predictions/Stages/FirstStage/FirstStageResults';

function PredictionsRoutes() {
  return (
    <Routes>
      <Route path="" element={<Predictions />}>
        <Route path="results" element={<PredictionResults />}>
          <Route index element={<BannerList />} />
          <Route path="first-stage" element={<FirstStageResults />} />
        </Route>
        <Route path="edit" element={<EditPredictions />}>
          <Route index element={<BannerList />} />
          <Route path="first-stage" element={<FirstStageEdit />} />
          <Route path="later-stages/:stage" element={<LaterPredictions />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default PredictionsRoutes;
