import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from '../common/AuthProvider';
import '../index.css';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home/Home';
import Groups from '../pages/Groups/Groups';
import Scores from '../pages/Scores/Scores';
import GroupPage from '../pages/GroupPage/GroupPage';
import Fixture from '../pages/Fixture/Fixture';
import App from '../App';
import AuthRoutes from './AuthRoutes';
import PredictionsRoutes from './PredictionRoutes';

function Router() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="groups" element={<Groups />} />
              <Route path="groups/:name" element={<GroupPage />} />
              <Route path="predictions/*" element={<PredictionsRoutes />} />
              <Route path="fixture" element={<Fixture />} />
              <Route path="scores" element={<Scores />} />
              <Route path="auth/*" element={<AuthRoutes />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default Router;
