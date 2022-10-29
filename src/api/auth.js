import { api } from "./instances";

export const getAuth = (signal) => {
  return api.get("/auth", signal);
};

export const createUser = (userData) => {
  return api.post("/auth/email/create", userData);
};

export const loginUser = (userData) => {
  return api.post("/auth/email", userData);
};

export const logoutUser = () => {
  return api.post("/auth/logout");
};

export const forgotPassword = (email) => {
  return api.post("/auth/new-password", email);
};

export const changePassword = (password, token) => {
  return api.post("/auth/change-password", password, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
