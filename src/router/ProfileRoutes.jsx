import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from '../pages/Profile/Profile';
import ProfileEdit from '../pages/Profile/ProfileEdit';
import ProfilePredictions from '../pages/Profile/ProfilePredictions';

function ProfileRoutes() {
  return (
    <Routes>
      <Route path="" element={<ProfileEdit />} />
      <Route>
        <Route path="/:name" element={<Profile />} />
        <Route path="/:id/:group" element={<ProfilePredictions />} />
      </Route>
    </Routes>
  );
}

export default ProfileRoutes;
