import api from './api';

// Types basés sur vos modèles Python (UserCreate, User)
export interface UserCreate {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id_user: number;
  username: string;
  email: string;
}

import { storageService } from './storageService';

export const authService = {
  // Corresponds to @router.post("/token")
  login: async (username: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await api.post('/auth/token', formData.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const { access_token, refresh_token } = response.data;
    await storageService.saveTokens(access_token, refresh_token);
    return response.data;
  },

  // Corresponds to @router.post("/refresh")
  refresh: async () => {
    const refreshToken = await storageService.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    const response = await api.post('/auth/refresh', { refresh_token: refreshToken });
    const { access_token } = response.data;
    await storageService.saveTokens(access_token, refreshToken);
    return access_token;
  }
};