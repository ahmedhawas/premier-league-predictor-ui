import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Add a request interceptor to include the auth token in all requests
api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
