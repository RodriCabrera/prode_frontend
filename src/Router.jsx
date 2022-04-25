import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>PRODE HOME</p>} />
        <Route path="/login" element={<p>LOGIN</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
