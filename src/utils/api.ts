import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: "https://polar-reef-73313-c2c5d8b9a403.herokuapp.com/api/v1",
});

// Add a request interceptor to include the auth token in all requests
api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
      config.headers['Authorization'] = `${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
