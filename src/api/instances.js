import axios from "axios";
import config from "../Constants";
import i18n from "../i18n";

const getToken = () => {
  const ls = localStorage.getItem("token");
  if (ls) return ls;
  return "";
};

export const api = axios.create({
  baseURL: config.API_URL,
});

api.interceptors.request.use((req) => {
  const accessToken = getToken();
  if (accessToken) {
    req.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  req.headers["Preferred-language"] = i18n.language;
  return req;
});

export const isCancel = (err) => {
  return axios.isCancel(err);
};
