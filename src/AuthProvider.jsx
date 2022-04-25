import axios from 'axios';
import propTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (user) return;
    axios.get('http://localhost:8080/auth');
    // 401 si no hay usuario, sino info del user.
    // si es 401, redirigir al login/register,
    // sino setear el user.
  }, [user]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
export default AuthProvider;

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
