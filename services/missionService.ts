/**
 * @file missionService.ts (MOCK)
 * @description Service bouchonné pour tester l'UI sans backend.
 */

import { Mission } from '@/models/mission.model';

export interface MissionFilters {
  search?: string;
  category_ids?: number[]; // Liste d'IDs (ex: [1, 5])
  country?: string;
  zip_code?: string;
  date_available?: Date | string; // Date ou chaîne ISO
  show_full?: boolean; // Par défaut true
}

const MOCK_MISSIONS: Mission[] = [
  {
    id_mission: 1,
    name: 'Animation dans un centre',
    date_start: '2024-12-24T14:00:00',
    date_end: '2024-12-24T18:00:00',
    skills: 'Animation, Patience',
    description: 'Animation de Noël pour les résidents. Venez partager un moment convivial.',
    capacity_min: 5,
    capacity_max: 10,
    volunteers_enrolled: 3,
    available_slots: 7,
    is_full: false,
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    
    id_location: 1, id_categ: 1, id_asso: 52,

    association: { 
      id_user: 99, id_asso: 52, name: 'Centre La Roseraie', 
      company_name: 'La Roseraie', rna_code: 'W123456', 
      address: '10 rue des Fleurs', zip_code: '69000', country: 'France', phone_number: '0400000000',
      description: "Association d'aide aux personnes âgées.",
      verification_status: 'VERIFIED',
      active_missions_count: 5,
      finished_missions_count: 20
    },
    location: { 
      id_location: 1, country: 'France', zip_code: '69000', address: '1 rue de la Paix',
      lat: 45.76, longitude: 4.83 
    },
    category: { 
      id_categ: 1, label: 'Social'
    },
  },
  {
    id_mission: 2,
    name: 'Promenade de chiens',
    date_start: '2027-12-25T10:00:00',
    date_end: '2027-12-25T12:00:00',
    skills: 'Amour des animaux',
    description: 'Sortie des chiens du refuge.',
    capacity_min: 2,
    capacity_max: 5,
    volunteers_enrolled: 5,
    available_slots: 0,
    is_full: true,
    image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    
    id_location: 2, id_categ: 2, id_asso: 53,

    association: { 
      id_user: 100, id_asso: 53, name: 'SPA Bordeaux', 
      company_name: 'SPA', rna_code: 'W987654',
      address: '10 avenue des chiens', zip_code: '33000', country: 'France',
      phone_number: '0500000000', description: 'Refuge animalier',
      verification_status: 'VERIFIED',
      active_missions_count: 2,
      finished_missions_count: 50
    },
    location: { 
      id_location: 2, country: 'France', zip_code: '33000', address: '10 avenue des chiens',
      lat: 44.83, longitude: -0.57
    },
    category: { 
      id_categ: 2, label: 'Environnement'
    },
  },
  // Duplication pour avoir plus de contenu
  {
    id_mission: 3,
    name: 'Collecte alimentaire',
    date_start: '2025-06-10T09:00:00',
    date_end: '2025-06-10T17:00:00',
    skills: 'Organisation, Force physique',
    description: 'Aide à la banque alimentaire locale.',
    capacity_min: 10,
    capacity_max: 20,
    volunteers_enrolled: 5,
    available_slots: 15,
    is_full: false,
    image_url: 'https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?q=80&w=2070&auto=format&fit=crop',
    
    id_location: 3, id_categ: 3, id_asso: 54,

    association: { 
      id_user: 101, id_asso: 54, name: 'Banque Alimentaire', 
      company_name: 'BA', rna_code: 'W111222',
      address: 'Zone Industrielle', zip_code: '75000', country: 'France',
      phone_number: '0100000000', description: 'Aide alimentaire',
      verification_status: 'VERIFIED',
      active_missions_count: 10,
      finished_missions_count: 100
    },
    location: { 
      id_location: 3, country: 'France', zip_code: '75000', address: 'Paris Centre',
      lat: 48.85, longitude: 2.35
    },
    category: { 
      id_categ: 3, label: 'Santé'
    },
  }
];

export const missionService = {

  getAll: async (filters?: any): Promise<Mission[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Simulation simple de filtre (optionnel pour le mock)
    let results = MOCK_MISSIONS;
    if (filters?.search) {
        const lowerSearch = filters.search.toLowerCase();
        results = results.filter(m => m.name.toLowerCase().includes(lowerSearch));
    }
    return results;
  },

  getById: async (id: number): Promise<Mission> => {
    // Note: j'ai renommé getById en getOne pour matcher votre interface réelle
    console.log(`🔍 Service Mock: Recherche ID ${id} (Type: ${typeof id})`); 
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mission = MOCK_MISSIONS.find(m => m.id_mission === id);
    
    if (!mission) {
      console.error(`❌ Mission ID ${id} non trouvée dans le Mock.`);
      throw new Error("Mission introuvable (Mock)");
    }
    
    return mission;
  },
};