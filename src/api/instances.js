import axios from 'axios';
import config from '../Constants';

export const withCredentials = axios.create({
  withCredentials: true,
  baseURL: config.API_URL,
});

export const withoutCredentials = axios.create({ baseURL: config.API_URL });

export const isCancel = (err) => {
  return axios.isCancel(err);
};

export const pexelsAuth = axios.create({
  // eslint-disable-next-line no-undef
  headers: { 'Authorization:': process.env.REACT_APP_PEXELS_API_KEY },
});
