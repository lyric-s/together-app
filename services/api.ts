import axios from 'axios';
import { storageService } from './storageService';
import Constants from 'expo-constants';

// 1. Extract the host's IP dynamically via Expo
// debuggerHost looks like "192.168.1.15:8081"
const debuggerHost = Constants.expoConfig?.hostUri || Constants.experienceUrl || '';
const localhost = debuggerHost.split(':')[0];

// 2. Définition of URL
// If you are in ‘production’ (published app), use the URL of your actual server.
// Otherwise, construct the URL using your PC's IP address.
const BASE_URL = __DEV__ 
  ? `http://${localhost}:8000`  // Votre backend Python tourne sur le port 8000
  : 'http://together-api-staging.out-online.net/docs'; // URL de production (ex: Heroku, AWS)

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token interceptor
api.interceptors.request.use(async (config) => {
  const token = await storageService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatic token expiry management (Refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If the error is 401 (Expired) and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // We import dynamically to avoid import loops
        const { authService } = require('./authService');
        const newToken = await authService.refresh();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        await storageService.clear(); // If the refresh fail, we deconnect
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;