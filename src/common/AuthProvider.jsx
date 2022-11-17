import { createContext, useEffect, useMemo, useState } from "react";
import propTypes from "prop-types";

import { getAuth, logoutUser } from "../api/auth";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "./Loading/Loading";
import useCleanupController from "../hooks/useCleanupController";

export const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signal, cleanup, handleCancel] = useCleanupController();

  const navigate = useNavigate();
  const location = useLocation();

  const clearUser = () => {
    setUser(null);
  };

  const updateAuth = () => {
    setIsLoading(true);
    getAuth(signal)
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((err) => {
        if (location.pathname.includes("change-password")) return;
        navigate("/auth");
        handleCancel(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    clearUser();
    logoutUser().finally(() => {
      localStorage.removeItem("token");
      navigate("/");
    });
  };

  useEffect(() => {
    if (!user) {
      // navigate('auth');
      updateAuth();
    }
    return cleanup();
  }, []);

  return (
    <AuthContext.Provider
      value={useMemo(() => {
        return { user, isLoading, updateAuth, logout };
      }, [user, isLoading, updateAuth])}
    >
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};
