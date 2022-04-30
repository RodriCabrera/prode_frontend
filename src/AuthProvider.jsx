import axios from 'axios';
import propTypes from 'prop-types';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (user) return;
    // va a devolver 401 si no hay usuario, sino info del user.
    // si es 401, redirigir al login/register,
    // sino setear el user.
    axios
      .get('http://localhost:8080/auth', { withCredentials: true })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/login');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, isLoading]);

  return (
    <AuthContext.Provider
      value={useMemo(() => {
        return { user, isLoading };
        // eslint-disable-next-line prettier/prettier
      }, [user, isLoading])}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
