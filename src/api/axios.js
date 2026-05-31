import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
});

// REQUEST Interceptor: 
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_session_token");
    if (token) {
      // Header mein 'Bearer <token>' format standard hai
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE Interceptor: 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("admin_session_token");
      localStorage.removeItem("isAdmin");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default api;