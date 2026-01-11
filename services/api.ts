import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { storageService } from './storageService';
import Constants from 'expo-constants';

// 1. Extract the host's IP dynamically via Expo
// debuggerHost looks like "192.168.1.15:8081"
const debuggerHost = Constants.expoConfig?.hostUri || Constants.experienceUrl || '';
const localhost = debuggerHost.split(':')[0] || 'localhost';

// 2. Définition of URL
// If you are in ‘production’ (published app), use the URL of your actual server.
// Otherwise, construct the URL using your PC's IP address.

if (__DEV__ && !localhost) {
  console.warn('Could not determine localhost IP, falling back to "localhost"');
}

const BASE_URL = __DEV__ 
  ? `http://${localhost}:8000`
  : 'https://together-api.out-online.net';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Token interceptor
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await storageService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Automatic token expiry management (Refresh)
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (!originalRequest) {
      return Promise.reject(error);
    }
    if (originalRequest.url?.includes('/auth/refresh')) {
        await storageService.clear();
        return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // We import dynamically to avoid import loops
        const { authService } = require('./authService');
        console.log("🔄 Tentative de rafraîchissement du token...");
        const newToken = await authService.refresh();
        if (!originalRequest.headers) {
          originalRequest.headers = {} as any;
        }
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        console.log("✅ Token rafraîchi avec succès, on relance la requête.");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Échec du refresh token, déconnexion forcée.");
        await storageService.clear(); // If the refresh fail, we deconnect
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;