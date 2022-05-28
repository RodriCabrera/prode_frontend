import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChangePassword from '../pages/Auth/ChangePassword';
import ConfirmationEmail from '../pages/Auth/ConfirmationEmail';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import VerifiedEmail from '../pages/Auth/VerifiedEmail';

function AuthRoutes() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="account-created" element={<ConfirmationEmail />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="verified" element={<VerifiedEmail />} />
    </Routes>
  );
}

export default AuthRoutes;
