import React from "react";
import { Route, Routes } from "react-router-dom";
import ChangePassword from "../pages/Auth/ChangePassword";
import ConfirmationEmail from "../pages/Auth/ConfirmationEmail";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import LandingPage from "../pages/Auth/LandingPage/LandingPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import VerifiedEmail from "../pages/Auth/VerifiedEmail";

function AuthRoutes() {
  return (
    <Routes>
      <Route element={<LandingPage />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="account-created" element={<ConfirmationEmail />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="change-password/:token" element={<ChangePassword />} />
        <Route path="verified" element={<VerifiedEmail />} />
      </Route>
    </Routes>
  );
}

export default AuthRoutes;
