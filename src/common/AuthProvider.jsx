import React, { createContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner/Spinner';
import config from '../Constants';

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
      .get(`${config.API_URL}/auth`, { withCredentials: true })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/login');
          // TODO Esto no permite ir a '/register', porque no está logueado.
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
      }, [user, isLoading])}
    >
      {isLoading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
