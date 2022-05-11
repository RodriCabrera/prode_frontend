import axios from 'axios';
import config from '../Constants';

export const withCredentials = axios.create({
  withCredentials: true,
  baseURL: config.API_URL,
});
