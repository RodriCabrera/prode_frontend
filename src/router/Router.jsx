import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "../App";
import AuthProvider from "../common/AuthProvider";
import AuthRoutes from "./AuthRoutes";
import Fixture from "../pages/FixturePage/FixturePage";
import GroupPage from "../pages/GroupPage/GroupPage";
import Groups from "../pages/Groups/Groups";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound";
import PredictionsRoutes from "./PredictionsRoutes";
import ProfileRoutes from "./ProfileRoutes";
import ScoresPage from "../pages/Scores/ScoresPage";
import ExtraPredictionsResults from "../pages/Scores/components/ExtraPredictionsResults/ExtraPredictionsResults";

import "../index.css";

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="auth/*" element={<AuthRoutes />} />
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="groups" element={<Groups />} />
            <Route path="groups/:name" element={<GroupPage />} />
            <Route path="predictions/*" element={<PredictionsRoutes />} />
            <Route path="fixture" element={<Fixture />} />
            <Route path="scores" element={<ScoresPage />} />
            <Route
              path="scores/:name/extra"
              element={<ExtraPredictionsResults />}
            />
            <Route path="profile/*" element={<ProfileRoutes />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Router;
