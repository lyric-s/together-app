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

const MOCK_COMPLETED_MISSIONS = [
  {
    id: '1',
    mission_title: 'Collecte alimentaire',
    association_name: 'Croix Rouge',
    date: new Date('2024-11-12'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },
  {
    id: '2',
    mission_title: 'Distribution de vêtements',
    association_name: 'Croix Rouge',
    date: new Date('2024-10-02'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },
  {
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },
  {
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },{
    id: '3',
    mission_title: 'Aide aux sans-abris',
    association_name: 'Croix Rouge',
    date: new Date('2024-09-18'),
    image: require('@/assets/images/volunteering_img.jpg'),
  },
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
                    key={mission.id}
                    mission_title={mission.mission_title}
                    association_name={mission.association_name}
                    date={mission.date}
                    image={mission.image}
                    onPressDetail={() =>
                    router.push('/mission_details_assos' as RelativePathString) // TODO
                    }
                />
                ))}
            </View>
            )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
