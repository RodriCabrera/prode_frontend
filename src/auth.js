import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

let AuthContext = createContext(null);

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  useEffect(() => {
    if (user) return;
    axios.get("http://localhost:8080/auth");
    // 401 si no hay usuario, sino info del user.
    // si es 401, redirigir al login/register,
    // sino setear el user.
  }, []);

  let value = { user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
