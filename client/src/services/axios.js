import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
});

instance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = localStorage.getItem('parkingAppToken') || '';
    return config;
  },
  (error) => {
    // Add logic for handling request errors
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Add logic for modifying the response
    return response;
  },
  (error) => {
    // Add logic for handling response errors
    return Promise.reject(error);
  }
);

export default instance;
