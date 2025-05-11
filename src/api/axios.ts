import axios from 'axios';

const API_PORT = 8084;

const api = axios.create({
  // baseURL: `http://localhost:${API_PORT}`,
  baseURL: `http://192.168.1.35:8084`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ This line is critical
export default api;
