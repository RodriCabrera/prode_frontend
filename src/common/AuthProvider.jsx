import React, { createContext, useEffect, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import { Spinner } from './Spinner/Spinner';
import { getAuth } from '../api/auth';

export const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    console.log('checkAuth');
    getAuth()
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  console.log('USER STATE IN AUTH PROVIDER', user);

  useEffect(() => {
    if (user) return;
    checkAuth();
  }, [user, isLoading]);

  return (
    <AuthContext.Provider
      value={useMemo(() => {
        return { user, isLoading, checkAuth };
      }, [user, isLoading, checkAuth])}
    >
      {isLoading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
