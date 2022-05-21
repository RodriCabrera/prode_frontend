import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FirstStagePredictions from '../pages/Predictions/Stages/FirstStagePredictions';
import BannerList from '../pages/Predictions/BannerList';
import Predictions from '../pages/Predictions/Predictions';
import PredictionResults from '../pages/Predictions/PredictionResults';
import EditPredictions from '../pages/Predictions/EditPredictions';

function PredictionRoutes() {
  return (
    <Routes>
      <Route path="" element={<Predictions />}>
        <Route path="results" element={<PredictionResults />} />
        <Route path="edit" element={<EditPredictions />}>
          <Route index element={<BannerList />} />
          <Route path="first-stage" element={<FirstStagePredictions />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default PredictionRoutes;
