import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>PRODE HOME</p>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
