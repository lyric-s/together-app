/**
 * @file VolunteerPreviousActivity.tsx
 * @description Displays volunteer's completed/past missions in a responsive grid layout.
 *              Features tab switching between "History" and "Upcoming" views with platform-specific 
 *              positioning (top switch on web, bottom switch on mobile). Handles empty state for no past missions.
 */


import React from 'react';
import {
  View,
  Text,
  FlatList,
  Platform,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';

import MissionVolunteerCard from '@/components/MissionVolunteerCard';
import SwitchButton from '@/components/SwitchButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/styles/pages/VolunteerActivityStyle'

const CARD_WIDTH = 400;

/* ---------------- MOCK DATA ---------------- */

const PAST_MISSIONS: ArrayLike<any>  = [
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
  {
    id: 'p1',
    mission_title: 'Collecte de vêtements',
    association_name: 'Emmaüs',
    date: new Date(),
    number_of_volunteers: 10,
    number_max_volunteers: 10,
    category_label: 'Social',
    category_color: 'orange',
    favorite: false,
    image: null,
  },
];

/* ---------------- COMPONENT ---------------- */

export default function VolunteerPreviousActivity() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';

  const numColumns = Math.max(1, Math.floor(width / CARD_WIDTH));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* SWITCH TOP (WEB) */}
        {isWeb && (
          <SwitchButton
            variant="activity"
            value="Historique"
            onChange={(tab) => {
              if (tab === 'A venir') {
                router.push('/(main)/library/upcoming/volunteer_upcoming_activity'as RelativePathString );
              }
            }}
            style={styles.switchTop}
          />
        )}

        <Text style={styles.sectionTitle}>Historique des missions</Text>

        {PAST_MISSIONS.length === 0 ? (
          <Text style={styles.emptyText}>
            Aucune mission terminée.
          </Text>
        ) : (
          <FlatList
            data={PAST_MISSIONS}
            key={numColumns}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <MissionVolunteerCard
                {...item}
                onPressMission={() => router.push('/mission_details' as RelativePathString)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        )}
      </View>

      {/* SWITCH BOTTOM (MOBILE) */}
      {!isWeb && (
        <View style={styles.switchBottom}>
          <SwitchButton
            variant="activity"
            value="Historique"
            onChange={(tab) => {
              if (tab === 'A venir') {
                router.push('/(main)/library/upcoming/volunteer_upcoming_activity' as RelativePathString);
              }
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
