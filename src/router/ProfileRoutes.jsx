import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import ProfileEdit from "../pages/Profile/ProfileEdit/ProfileEdit";

function ProfileRoutes() {
  return (
    <Routes>
      <Route path="" element={<ProfileEdit />} />
      <Route path="/:name" element={<Profile />} />
    </Routes>
  );
}

export default ProfileRoutes;
