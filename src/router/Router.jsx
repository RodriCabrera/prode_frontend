import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from '../common/AuthProvider';
import '../index.css';
import ChangePassword from '../pages/Auth/ChangePassword';
import ConfirmationEmail from '../pages/Auth/ConfirmationEmail';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import VerifiedEmail from '../pages/Auth/VerifiedEmail';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home/Home';
import Groups from '../pages/Groups/Groups';
import Scores from '../pages/Scores/Scores';
import GroupPage from '../pages/GroupPage/GroupPage';
import Fixture from '../pages/Fixture/Fixture';
import App from '../App';
import PredictionRoutes from './PredictionRoutes';

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
              <Route path="predictions/*" element={<PredictionRoutes />} />
              <Route path="fixture" element={<Fixture />} />
              <Route path="scores" element={<Scores />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="account-created" element={<ConfirmationEmail />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="verified" element={<VerifiedEmail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default Router;
