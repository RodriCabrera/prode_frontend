import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from './AuthProvider';
import Router from './Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
