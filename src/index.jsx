import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import AuthProvider from './common/AuthProvider';
import './index.css';
import ChangePassword from './pages/Auth/ChangePassword';
import ConfirmationEmail from './pages/Auth/ConfirmationEmail';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import VerifiedEmail from './pages/Auth/VerifiedEmail';
import NotFound from './pages/NotFound';
import Home from './pages/Home/Home';
import Predictions from './pages/Predictions/Predictions';
import Groups from './pages/Groups/Groups';
import Scores from './pages/Scores/Scores';
import GroupPage from './pages/GroupPage/GroupPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="groups" element={<Groups />} />
            <Route path="groups/:name" element={<GroupPage />} />
            <Route path="predictions" element={<Predictions />} />
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
  </React.StrictMode>
);
