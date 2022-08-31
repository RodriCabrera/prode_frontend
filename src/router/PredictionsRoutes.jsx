import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PredictionsPage from '../pages/Predictions/PredictionsPage';
import PredictionManager from '../pages/Predictions/PredictionManager/PredictionManager';
import NewPredictionManager from '../pages/Predictions/PredictionManager/NewPredictionManager';
import BannerList from '../pages/Predictions/BannerList/BannerList';

function PredictionsRoutes() {
  return (
    <Routes>
      <Route path="" element={<PredictionsPage />}>
        <Route index element={<BannerList />} />
        <Route path="/:phase" element={<NewPredictionManager />} />
      </Route>
    </Routes>
  );
}

export default PredictionsRoutes;
