import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const sendRequest = async (endpoint, body, headers) => {
  try {
    const { data } = await api.post(endpoint, body, headers);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export default api;
