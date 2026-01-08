import api from './api';
import { AxiosError } from 'axios';
import { Admin, AdminCreate, AdminUpdate } from '@/models/admin.model';

// --- Error handling helper ---
function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    // Attempts to retrieve the error message from the backend (FastAPI/Django/Node)
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "Une erreur inconnue est survenue.";
    
    console.error("API Error:", message);
    throw new Error(message);
  }
  throw new Error("Erreur inattendue de connexion.");
}

// --- Service ---

export const adminService = {
  // Retrieve MY profile
  // GET /admin/me
  getMe: async (): Promise<Admin> => {
    const response = await api.get('/admin/me');
    return response.data;
  },

  // Update MY profile
  // PATCH /admin/{adminId}
  updateProfile: async (adminId: number, data: AdminUpdate) => {
    const response = await api.patch(`/admin/${adminId}`, data);
    return response.data;
  }
};