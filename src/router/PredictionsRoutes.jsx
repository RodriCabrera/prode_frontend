import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LaterPredictions from '../pages/Predictions/Stages/LaterPredictions';
import BannerList from '../pages/Predictions/BannerList';
import Predictions from '../pages/Predictions/Predictions';
import PredictionResults from '../pages/Predictions/PredictionResults';
import EditPredictions from '../pages/Predictions/EditPredictions';
import FirstStage from '../pages/Predictions/Stages/FirstStage';

function PredictionsRoutes() {
  return (
    <Routes>
      <Route path="" element={<Predictions />}>
        <Route path="results" element={<PredictionResults />}>
          <Route index element={<BannerList />} />
          <Route path="first-stage" element={<FirstStage resultsMode />} />
          <Route
            path="later-stages/:stage"
            element={<LaterPredictions resultsMode />}
          />
        </Route>
        <Route path="edit" element={<EditPredictions />}>
          <Route index element={<BannerList editMode />} />
          <Route path="first-stage" element={<FirstStage />} />
          <Route path="later-stages/:stage" element={<LaterPredictions />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default PredictionsRoutes;
