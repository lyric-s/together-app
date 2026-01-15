import api from './api';
import { Mission } from '@/models/mission.model';

// Interface pour les filtres de recherche
export interface MissionFilters {
  search?: string;
  category_ids?: number[]; // Liste d'IDs (ex: [1, 5])
  country?: string;
  zip_code?: string;
  date_available?: Date | string; // Date ou chaîne ISO
  show_full?: boolean; // Par défaut true
}

/**
 * Fonction utilitaire pour adapter la réponse API au modèle Frontend.
 * L'API renvoie 'categories' (tableau), mais le modèle Front utilise souvent
 * 'category' (singulier) pour l'affichage principal des cartes.
 */
const mapApiToMission = (data: any): Mission => {
  // On prend la première catégorie pour l'affichage principal
  const firstCategory = (data.categories && data.categories.length > 0) 
    ? data.categories[0] 
    : undefined;

  return {
    ...data,
    // On mappe manuellement pour que votre UI existante fonctionne
    category: firstCategory,
    id_categ: firstCategory ? firstCategory.id_category : 0,
    
    // On s'assure que les champs calculés sont bien présents (au cas où)
    volunteers_enrolled: data.volunteers_enrolled || 0,
    available_slots: data.available_slots || 0,
    is_full: data.is_full ?? false,
  };
};

export const missionService = {
  
  /**
   * Récupère toutes les missions publiques avec filtres optionnels.
   * Endpoint: GET /missions
   */
  getAll: async (filters: MissionFilters = {}): Promise<Mission[]> => {
    // Construction des paramètres de requête
    const params: any = {};

    if (filters.search) params.search = filters.search;
    if (filters.country) params.country = filters.country;
    if (filters.zip_code) params.zip_code = filters.zip_code;
    
    // Gestion de la date (conversion en ISO string simple YYYY-MM-DD si c'est un objet Date)
    if (filters.date_available) {
      if (filters.date_available instanceof Date) {
        params.date_available = filters.date_available.toISOString().split('T')[0];
      } else {
        params.date_available = filters.date_available;
      }
    }

    // Gestion du booléen show_full
    if (filters.show_full !== undefined) {
      params.show_full = filters.show_full;
    }

    // Gestion du tableau de catégories : conversion en string "1,5"
    if (filters.category_ids && filters.category_ids.length > 0) {
      params.category_ids = filters.category_ids.join(',');
    }

    try {
      const response = await api.get<any[]>('/missions', { params });
      // Transformation de chaque élément du tableau
      return response.data.map(mapApiToMission);
    } catch (error) {
      console.error("Erreur lors de la récupération des missions:", error);
      throw error;
    }
  },

  /**
   * Récupère les détails d'une mission spécifique.
   * Endpoint: GET /missions/{id}
   */
  getById: async (missionId: number): Promise<Mission> => {
    try {
      const response = await api.get<any>(`/missions/${missionId}`);
      // Transformation de l'objet unique
      return mapApiToMission(response.data);
    } catch (error) {
      console.error(`Erreur lors de la récupération de la mission ${missionId}:`, error);
      throw error;
    }
  }
};