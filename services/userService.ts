import api from './api';

export interface UserCreate {
  username: string;
  email: string;
  password: string;
}

export const userService = {
  // Corresponds to your Python function: create_user
  register: async (userData: UserCreate) => {
    const response = await api.post('/users/', userData);
    return response.data;
  },

  // Corresponds to your Python function: get_user (version 'me')
  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  //  Corresponds to your Python function: update_user
  updateProfile: async (userId: number, data: any) => {
    const response = await api.patch(`/users/${userId}`, data);
    return response.data;
  }
};