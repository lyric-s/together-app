import api from './api';
import { AxiosError } from 'axios';
import { Volunteer,} from '@/models/volunteer.model';
import { Admin, AdminCreate, AdminUpdate } from '@/models/admin.model';

/**
 * Normalize and rethrow API errors as user-friendly Error instances.
 *
 * Processes the provided error; if it is an AxiosError, extracts a backend message
 * from `response.data.detail`, `response.data.message`, or `error.message` (falling
 * back to a default French message), logs that message to the console, and throws
 * a new Error with the message. For non-Axios errors, throws a generic French
 * connection error.
 *
 * @param error - The thrown error to normalize and rethrow
 * @throws An Error containing the extracted backend message for Axios errors, or a generic connection error for other error types
 */
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
    try {
      const response = await api.get('/admin/me');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update MY profile
  // PATCH /admin/{adminId}
  updateProfile: async (adminId: number, data: AdminUpdate) => {
    try {
      const response = await api.patch(`/admin/${adminId}`, data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * List all volunteers (Paginate)
   * GET /volunteers/
   */
  getAllVolunteers: async (offset = 0, limit = 100): Promise<Volunteer[]> => {
      try {
      const { data } = await api.get<Volunteer[]>('/volunteers/', {
          params: { offset, limit }
      });
      return data;
      } catch (error) {
      handleApiError(error);
      }
  }
};