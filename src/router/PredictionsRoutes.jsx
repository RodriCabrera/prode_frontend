import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LaterPredictions from '../pages/Predictions/Stages/LaterPredictions';
import BannerList from '../pages/Predictions/BannerList';
import Predictions from '../pages/Predictions/Predictions';
import FirstStage from '../pages/Predictions/Stages/FirstStage';

function PredictionsRoutes() {
  return (
    <Routes>
      <Route path="" element={<Predictions />}>
        <Route index element={<BannerList />} />
        <Route path="first-stage" element={<FirstStage />} />
        <Route path="later-stages/:stage" element={<LaterPredictions />} />
      </Route>
    </Routes>
  );
}

export default PredictionsRoutes;
