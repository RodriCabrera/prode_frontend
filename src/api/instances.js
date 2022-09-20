import axios from 'axios';
import config from '../Constants';

const getToken = () => {
  const ls = localStorage.getItem('token')
  if(ls) return ls
  return ''
}
// axios.interceptors.request.use((config) => {
//   const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzI4YjM1NzlmNmY2MzAxODMwZGQyOWEiLCJuYW1lIjoiU2FudGlhZ3VpdG8iLCJlbWFpbCI6InNhbnRpYWdvLnJ1YmlvQGVhbS5lZHUuYXIiLCJwYXNzd29yZCI6IiQyYSQxMCRpdHJPeGphY20vQ0NRaUlmQ3B0MUxPZi4veENrL3NxYVUyQ3YuYUxHd05sY3RMYnJzSEdkRyIsInZlcmlmaWVkIjp0cnVlLCJfX3YiOjAsImlhdCI6MTY2MzcwODc3MiwiZXhwIjoxNjY2MzAwNzcyfQ.FIaKme4QPNHriG_J1Kfh2wVIfhU6R_EOisB-z70mIu4';
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config
// })

export const api = axios.create({
  baseURL: config.API_URL,
});

api.interceptors.request.use(req => {
  const accessToken = getToken()
  if (accessToken) {
    req.headers['Authorization'] = `Bearer ${getToken()}`
  }
  return req
})


export const isCancel = (err) => {
  return axios.isCancel(err);
};

