import React, { createContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import Spinner from './Spinner/Spinner';
import config from '../Constants';

export const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) return;

    axios
      .get(`${config.API_URL}/auth`, { withCredentials: true })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
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
