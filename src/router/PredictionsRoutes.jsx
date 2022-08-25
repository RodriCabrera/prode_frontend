import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BannerList from '../pages/Predictions/BannerList';
import PredictionsPage from '../pages/Predictions/PredictionsPage';
import PredictionManager from '../pages/Predictions/PredictionManager/PredictionManager';

function PredictionsRoutes() {
  return (
    <Routes>
      <Route path="" element={<PredictionsPage />}>
        <Route index element={<BannerList />} />
        <Route path="/:phase" element={<PredictionManager />} />
      </Route>
    </Routes>
  );
}

export default PredictionsRoutes;
