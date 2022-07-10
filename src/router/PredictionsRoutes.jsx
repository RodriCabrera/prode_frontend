import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BannerList from '../pages/Predictions/BannerList';
import Predictions from '../pages/Predictions/Predictions';
import FirstStage from '../pages/Predictions/Stages/FirstStage';

function PredictionsRoutes() {
  return (
    <Routes>
      <Route path="" element={<Predictions />}>
        <Route index element={<BannerList />} />
        <Route path="/:phase" element={<FirstStage />} />
      </Route>
    </Routes>
  );
}

export default PredictionsRoutes;
