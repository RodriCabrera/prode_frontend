import React from "react";
import { Route, Routes } from "react-router-dom";
import { useFlags } from "flagsmith/react";

import Profile from "../pages/Profile/Profile";
import ProfileEdit from "../pages/Profile/ProfileEdit/ProfileEdit";
import OwnProfile from "../pages/Profile/ProfileEdit/OwnProfile";

function ProfileRoutes() {
  const flags = useFlags(["new_profile_edit_ui"]);
  return (
    <Routes>
      <Route
        path=""
        element={
          flags.new_profile_edit_ui.enabled ? <OwnProfile /> : <ProfileEdit />
        }
      />
      <Route path="/:name" element={<Profile />} />
    </Routes>
  );
}

export default ProfileRoutes;
