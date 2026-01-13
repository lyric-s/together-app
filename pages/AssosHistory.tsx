/**
 * @file AssosHistory.tsx
 * @description Association history page – list of completed missions (web).
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';

import MissionAdminAssosCard from '@/components/MissionAdminAssosCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from '@/styles/pages/AssosHistoryStyle'
import { Mission } from '@/models/mission.model';

export const MOCK_COMPLETED_MISSIONS: Mission[] = [
  {
    id_mission: 1,
    name: "Distribution repas d'hiver",
    date_start: "2025-12-01",
    date_end: "2025-12-31",
    skills: "logistique, cuisine, accueil",
    description: "Distribution quotidienne de repas chauds aux personnes sans-abri pendant la période hivernale.",
    capacity_min: 5,
    capacity_max: 20,
    id_location: 1,
    id_categ: 1,
    id_asso: 1,
    location: undefined,
    category: undefined,
    association: {
      id_asso: 1,
      id_user: 101,
      name: "Croix Rouge Française",
      address: "10 Rue de la République",
      country: "France",
      phone_number: "+33123456789",
      zip_code: "75001",
      rna_code: "W751234567",
      company_name: "Croix Rouge",
      description: "Aide humanitaire et sociale d'urgence.",
      user: undefined
    }
  },
  {
    id_mission: 2,
    name: "Collecte vestimentaire",
    date_start: "2025-11-15",
    date_end: "2025-12-15",
    skills: "tri, logistique, transport",
    description: "Collecte et tri de vêtements chauds pour redistribution aux plus démunis.",
    capacity_min: 8,
    capacity_max: 15,
    id_location: 2,
    id_categ: 2,
    id_asso: 2,
    location: undefined,
    category: undefined,
    association: {
      id_asso: 2,
      id_user: 102,
      name: "Secours Populaire Français",
      address: "28 Rue de la Solidarité",
      country: "France",
      phone_number: "+33198765432",
      zip_code: "75010",
      rna_code: "W752345678",
      company_name: "Secours Populaire",
      description: "Aide aux populations vulnérables.",
      user: undefined
    }
  },
  {
    id_mission: 3,
    name: "Ateliers insertion",
    date_start: "2025-10-01",
    date_end: "2026-03-31",
    skills: "animation, coaching, administratif",
    description: "Accompagnement vers l'insertion professionnelle et sociale des personnes en précarité.",
    capacity_min: 3,
    capacity_max: 10,
    id_location: 3,
    id_categ: 3,
    id_asso: 3,
    location: undefined,
    category: undefined,
    association: {
      id_asso: 3,
      id_user: 103,
      name: "Emmaüs France",
      address: "5 Avenue de l'Égalité",
      country: "France",
      phone_number: "+33145678901",
      zip_code: "75020",
      rna_code: "W753456789",
      company_name: "Emmaüs",
      description: "Réinsertion sociale et recyclage solidaire.",
      user: undefined
    }
  },
  {
    id_mission: 4,
    name: "Aide scolaire",
    date_start: "2025-09-01",
    date_end: "2026-06-30",
    skills: "pédagogie, patience, mathématiques",
    description: "Soutien scolaire hebdomadaire pour enfants de familles monoparentales ou en difficulté.",
    capacity_min: 4,
    capacity_max: 12,
    image_url: "/images/aide-scolaire.jpg",
    id_location: 4,
    id_categ: 4,
    id_asso: 4,
    location: undefined,
    category: undefined,
    association: {
      id_asso: 4,
      id_user: 104,
      name: "Restos du Cœur",
      address: "15 Boulevard de la Fraternité",
      country: "France",
      phone_number: "+33156789012",
      zip_code: "75011",
      rna_code: "W754567890",
      company_name: "Les Restos du Cœur",
      description: "Distribution de repas aux personnes démunies.",
      user: undefined
    }
  }
];

/**
 * @file AssosHistory.tsx
 * @description Displays the list of completed missions for an association in a scrollable view.
 *              Renders either an empty state message when no missions are completed or a set of
 *              MissionAdminAssosCard components built from MOCK_COMPLETED_MISSIONS. Provides navigation
 *              to the mission detail screen for each completed mission.
 */
export default function AssosHistory() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* TITLE */}
        <Text style={styles.title}>Les missions terminées</Text>

        {/* CONTENT */}
        <ScrollView>
            {MOCK_COMPLETED_MISSIONS.length === 0 ? (
            <Text style={styles.emptyText}>
                Aucune mission terminée pour le moment.
            </Text>
            ) : (
            <View style={styles.cardsContainer}>
                {MOCK_COMPLETED_MISSIONS.map((mission) => (
                <MissionAdminAssosCard
                    mission={mission}
                />
                ))}
            </View>
            )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
