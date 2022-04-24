import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

let AuthContext = createContext(null);

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  useEffect(() => {
    if (user) return;

    axios.get("http://localhost:8080/auth");
  }, []);

  let signin = (newUser, callback) => {};

  let signout = (callback) => {};

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
