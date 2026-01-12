import api from './api';
import { AxiosError } from 'axios';
import { Volunteer, VolunteerCreate, VolunteerUpdate } from '@/models/volunteer.model';
import { Mission } from '@/models/mission.model';
import { UserCreate } from '@/models/user.model';

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
export const volunteerService = {

  /**
   * Create a new volunteer account
   * POST /volunteers/
   */
  register: async (userIn: UserCreate, volunteerIn: VolunteerCreate): Promise<Volunteer> => {
    try {
      const { data } = await api.post<Volunteer>('/volunteers/', {
        user_in: userIn,
        volunteer_in: volunteerIn,
      });
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
  /**
   * Retrieve MY profile
   * GET /volunteers/me
   */
  getMe: async (): Promise<Volunteer> => {
    try {
      const { data } = await api.get<Volunteer>('/volunteers/me');
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Update MY profile
   * PATCH /volunteers/${volunteerId}
   */
  updateMe: async (volunteerId: number, payload: VolunteerUpdate): Promise<Volunteer> => {
    try {
      const { data } = await api.patch<Volunteer>(`/volunteers/${volunteerId}`, payload);
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Delete MY account
   * DELETE /volunteers/${volunteerId}
   */
  deleteProfile: async (volunteerId: number): Promise<void> => {
    try {
      await api.delete(`/volunteers/${volunteerId}`);
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Retrieve MY assignments (Approved/Active)
   * Optionally filtered by date (‘today’ or YYYY-MM-DD)
   * GET /volunteers/me/missions
   */
  getMyMissions: async (targetDate?: string): Promise<Mission[]> => {
    try {
      // dateFilter format: "YYYY-MM-DD"
      const params = targetDate ? { target_date: targetDate } : undefined;
      const { data } = await api.get<Mission[]>('/volunteers/me/missions', { params });
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // --- FAVOURITES MANAGEMENT ---

  /**
   * Retrieve my favourite assignments
   * GET /volunteers/me/favorites
   */
  getFavorites: async (): Promise<Mission[]> => {
    try {
      const { data } = await api.get<Mission[]>('/volunteers/me/favorites');
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Add a mission to favourites
   * POST /volunteers/me/favorites/${missionId}
   */
  addFavorite: async (missionId: number): Promise<void> => {
    try {
      await api.post(`/volunteers/me/favorites/${missionId}`);
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Remove a mission from favourites
   * DELETE /volunteers/me/favorites/${missionId}
   */
  removeFavorite: async (missionId: number): Promise<void> => {
    try {
      await api.delete(`/volunteers/me/favorites/${missionId}`);
    } catch (error) {
      handleApiError(error);
    }
  },

  // --- Application Management ---

  /**
   * Apply for an assignment
   * POST /volunteers/me/missions/${missionId}/apply
   */
  applyToMission: async (missionId: number, message?: string): Promise<void> => {
    try {
      await api.post(
        `/volunteers/me/missions/${missionId}/apply`,
        { message }
      );
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Withdraw from a mission
   * DELETE /volunteers/me/missions/${missionId}/application
   */
  withdrawApplication: async (missionId: number): Promise<void> => {
    try {
      await api.delete(`/volunteers/me/missions/${missionId}/application`);
    } catch (error) {
      handleApiError(error);
    }
  },

};