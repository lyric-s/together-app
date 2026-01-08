import api from './api';
import { Admin, AdminCreate, AdminUpdate } from '@/models/admin.model';
import { handleApiError } from './apiErrorHandler';

// --- Service ---

export const adminService = {
  // Retrieve MY profile
  // GET /admin/me
  getMe: async (): Promise<Admin> => {
    try {
      const response = await api.get<Admin>('/admin/me');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update MY profile
  // PATCH /admin/{adminId}
  updateProfile: async (adminId: number, data: AdminUpdate) => {
    try {
      const response = await api.patch<Admin>(`/admin/${adminId}`, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
};