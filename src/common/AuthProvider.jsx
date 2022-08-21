import React, { createContext, useEffect, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import { getAuth } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading/Loading';

export const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const checkAuth = () => {
    getAuth()
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch(() => {
        setUser(null);
        navigate('/auth');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (user) return;
    checkAuth();
  }, [user, isLoading]);

  return (
    <AuthContext.Provider
      value={useMemo(() => {
        return { user, isLoading, checkAuth };
      }, [user, isLoading, checkAuth])}>
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
