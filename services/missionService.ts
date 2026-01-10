import api from './api';
import { Mission, MissionCreate, MissionUpdate } from '@/models/mission.model';
import { handleApiError } from '@/services/apiErrorHandler';

export const missionService = {

  // GET /missions/
  getAll: async (): Promise<Mission[]> => {
    try {
      const { data } = await api.get<Mission[]>('/missions/');
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // GET /missions/{id}
  getById: async (id: number): Promise<Mission> => {
    try {
      const { data } = await api.get<Mission>(`/missions/${id}`);
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
};