import { ProfileData } from '@/types/ProfileUser';
import api from './api';

// Types basés sur tes modèles VolunteerPublic et MissionPublic
export interface VolunteerProfile {
  id_volunteer: number;
  id_user: number;
  name: string;
  phone?: string;
  birthdate?: string;
  // ... ajoute les autres champs de ton modèle VolunteerPublic
}

export interface Mission {
  id_mission: number;
  title: string;
  description: string;
  date_mission: string;
  // ... ajoute les autres champs de ton modèle MissionPublic
}

export const volunteerService = {
  // 1. Récupérer MON profil (utilisé dans le Splash ou le Profil)
  // GET /volunteers/me
  getMe: async (): Promise<VolunteerProfile> => {
    const response = await api.get('/volunteers/me');
    return response.data;
  },

  // 2. Récupérer MES missions (Inscrites/Approuvées)
  // GET /volunteers/me/missions
  getMyMissions: async (dateFilter?: string): Promise<Mission[]> => {
    // dateFilter peut être "today" ou "YYYY-MM-DD"
    const params = dateFilter ? { target_date: dateFilter } : {};
    const response = await api.get('/volunteers/me/missions', { params });
    return response.data;
  },

  // 3. Gestion des FAVORIS
  // GET /volunteers/me/favorites
  getFavorites: async (): Promise<Mission[]> => {
    const response = await api.get('/volunteers/me/favorites');
    return response.data;
  },

  // POST /volunteers/me/favorites/{id}
  addFavorite: async (missionId: number) => {
    await api.post(`/volunteers/me/favorites/${missionId}`);
  },

  // DELETE /volunteers/me/favorites/{id}
  removeFavorite: async (missionId: number) => {
    await api.delete(`/volunteers/me/favorites/${missionId}`);
  },

  // 4. Postuler à une mission (Engagement)
  // POST /volunteers/me/missions/{id}/apply
  applyToMission: async (missionId: number, message?: string) => {
    // Le backend attend "message" en paramètre de requête ou body selon ta config FastAPI
    // Ici, d'après ton Python, c'est un query param ou optionnel
    await api.post(`/volunteers/me/missions/${missionId}/apply`, null, {
      params: { message }
    });
  },

  // DELETE /volunteers/me/missions/{id}/application (Retirer sa candidature)
  withdrawApplication: async (missionId: number) => {
    await api.delete(`/volunteers/me/missions/${missionId}/application`);
  },

  // 5. Mettre à jour mon profil
  // PATCH /volunteers/{id}
  updateProfile: async (volunteerId: number, data: Partial<ProfileData>) => {
    const response = await api.patch(`/volunteers/${volunteerId}`, data);
    return response.data;
  }
};