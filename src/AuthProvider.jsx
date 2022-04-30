import axios from 'axios';
import propTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) return;
    // va a devolver 401 si no hay usuario, sino info del user.
    // si es 401, redirigir al login/register,
    // sino setear el user.
    axios
      .get('http://localhost:8080/auth')
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/login');
        }
      });
  }, [user]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
export default AuthProvider;

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
