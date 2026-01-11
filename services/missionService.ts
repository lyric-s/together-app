/**
 * @file missionService.ts (MOCK)
 * @description Service bouchonné pour tester l'UI sans backend.
 */

import { Mission, MissionCreate, MissionUpdate } from '@/models/mission.model';
import { Colors } from '@/constants/colors';

// CES DONNÉES DOIVENT CORRESPONDRE À CELLES DE HOMEGUEST
const MOCK_MISSIONS: Mission[] = [
  {
    id_mission: 1, // <--- ID IMPORTANT
    name: 'Animation dans un centre',
    date_start: '2024-12-24T14:00:00',
    date_end: '2024-12-24T18:00:00',
    skills: 'Animation, Patience',
    description: 'Animation de Noël pour les résidents. Venez partager un moment convivial.',
    capacity_min: 5,
    capacity_max: 10,
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    
    id_location: 1, id_categ: 1, id_asso: 52,

    association: { 
      id_user: 99, id_asso: 52, name: 'Centre La Roseraie', 
      company_name: 'La Roseraie', rna_code: 'W123456', 
      address: 'rien', zip_code: 'rien', country: 'rien', phone_number: '',
        description: "Association d'aide aux personnes âgées."
    },
    location: { 
      id_location: 1, country: 'France', zip_code: '69000', address: '1 rue de la Paix'
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
      image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
      
      id_location: 2, id_categ: 2, id_asso: 53,

      association: { 
        id_user: 100, id_asso: 53, name: 'SPA Bordeaux', 
        company_name: 'SPA', rna_code: 'W987654',
        address: 'rien', zip_code: 'rien', country: 'rien',
        phone_number: 'rien', description: '' 
      },
      location: { 
        id_location: 2, country: 'France', zip_code: '33000', address: '10 avenue des chiens' 
      },
      category: { 
        id_categ: 2, label: 'Animaux' 
      },
  },
  {
    id_mission: 3,
      name: 'Promenade de chiens',
      date_start: '2027-12-25T10:00:00',
      date_end: '2027-12-25T12:00:00',
      skills: 'Amour des animaux',
      description: 'Sortie des chiens du refuge.',
      capacity_min: 2,
      capacity_max: 5,
      image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
      
      id_location: 2, id_categ: 2, id_asso: 53,

      association: { 
        id_user: 100, id_asso: 53, name: 'SPA Bordeaux', 
        company_name: 'SPA', rna_code: 'W987654',
        address: 'rien', zip_code: 'rien', country: 'rien',
        phone_number: 'rien', description: '' 
      },
      location: { 
        id_location: 2, country: 'France', zip_code: '33000', address: '10 avenue des chiens' 
      },
      category: { 
        id_categ: 2, label: 'Animaux' 
      },
  },
  {
    id_mission: 4,
      name: 'Promenade de chiens',
      date_start: '2027-12-25T10:00:00',
      date_end: '2027-12-25T12:00:00',
      skills: 'Amour des animaux',
      description: 'Sortie des chiens du refuge.',
      capacity_min: 2,
      capacity_max: 5,
      image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
      
      id_location: 2, id_categ: 2, id_asso: 53,

      association: { 
        id_user: 100, id_asso: 53, name: 'SPA Bordeaux', 
        company_name: 'SPA', rna_code: 'W987654',
        address: 'rien', zip_code: 'rien', country: 'rien',
        phone_number: 'rien', description: '' 
      },
      location: { 
        id_location: 2, country: 'France', zip_code: '33000', address: '10 avenue des chiens' 
      },
      category: { 
        id_categ: 2, label: 'Animaux' 
      },
  }
];

export const missionService = {

  getAll: async (): Promise<Mission[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_MISSIONS;
  },

  getById: async (id: number): Promise<Mission> => {
    console.log(`🔍 Service Mock: Recherche ID ${id} (Type: ${typeof id})`); // Debug
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // On compare les IDs
    const mission = MOCK_MISSIONS.find(m => m.id_mission === id);
    
    if (!mission) {
      console.error(`❌ Mission ID ${id} non trouvée dans le Mock.`);
      throw new Error("Mission introuvable (Mock)");
    }
    
    return mission;
  },

  // Les autres méthodes factices
  create: async (data: any) => MOCK_MISSIONS[0],
  update: async (id: number, data: any) => MOCK_MISSIONS[0],
  delete: async (id: number) => {},
  getMyMissions: async () => MOCK_MISSIONS,
};