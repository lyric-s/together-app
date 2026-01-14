import api from './api';
import { Mission, MissionPublic } from '@/models/mission.model';
import { handleApiError } from '@/services/apiErrorHandler';

/**
 * @file missionService.ts
 * @description Service for public mission-related API calls.
 */

export const missionService = {

  /**
   * Retrieve all public missions.
   * GET /missions/
   * @returns {Promise<Mission[]>} A promise that resolves to an array of missions.
   */
  getAll: async (): Promise<Mission[]> => {
    try {
      const { data } = await api.get<Mission[]>('/missions/');
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Retrieve a single mission by its ID.
   * GET /missions/{id}
   * @param {number} id - The ID of the mission to retrieve.
   * @returns {Promise<MissionPublic>} A promise that resolves to a single mission object.
   */
  getById: async (id: number): Promise<MissionPublic> => {
    try {
      const { data } = await api.get<MissionPublic>(`/missions/${id}`);
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },
  
};