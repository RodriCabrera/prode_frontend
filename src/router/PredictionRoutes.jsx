import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GroupPredictions from '../pages/Predictions/Stages/GroupPredictions';
import BannerList from '../pages/Predictions/BannerList';
import Predictions from '../pages/Predictions/Predictions';

function PredictionRoutes() {
  return (
    <Routes>
      <Route path="" element={<Predictions />}>
        <Route path="results" element={<p>RESULTADOS</p>} />
        <Route path="edit" element={<BannerList />}>
          <Route path="first-stage" element={<GroupPredictions />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default PredictionRoutes;
