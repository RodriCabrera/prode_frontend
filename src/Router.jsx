import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Router;
