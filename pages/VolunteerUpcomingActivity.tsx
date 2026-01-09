/**
 * @file VolunteerUpcomingActivity.tsx
 * @description Displays volunteer's upcoming missions and favorite missions in a responsive grid layout.
 *              Features tab switching between "Upcoming" and "History" views, with platform-specific UI 
 *              (top switch on web, bottom switch on mobile). Uses mock data with infinite scroll capability.
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

const UPCOMING_MISSIONS: ArrayLike<any>  = [
  {
    id: '1',
    mission_title: 'Distribution de repas',
    association_name: 'Croix Rouge',
    date: new Date(),
    number_of_volunteers: 5,
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

const FAVORITE_MISSIONS: ArrayLike<any>  = [];

/* ---------------- COMPONENT ---------------- */

export default function VolunteerUpcomingActivity() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';

  const numColumns = Math.max(1, Math.floor(width / CARD_WIDTH));

  const renderMission = ({ item }: any) => (
    <MissionVolunteerCard
      {...item}
      onPressMission={() => router.push('/mission_details' as RelativePathString)}
      onPressFavorite={() => {}}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* SWITCH (TOP ON WEB) */}
        {isWeb && (
          <SwitchButton
            variant="activity"
            value="A venir"
            onChange={(tab) => {
              if (tab === 'Historique') {
                router.push('(main)/library/history/volunteer_previous_activity' as RelativePathString);
              }
            }}
            style={styles.switchTop}
          />
        )}

        {/* --------- UPCOMING MISSIONS --------- */}
        <Text style={styles.sectionTitle}>Missions à venir</Text>

        {UPCOMING_MISSIONS.length === 0 ? (
          <Text style={styles.emptyText}>
            Aucune mission à venir pour le moment.
          </Text>
        ) : (
          <FlatList
            data={UPCOMING_MISSIONS}
            key={numColumns}
            numColumns={numColumns}
            renderItem={renderMission}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        )}

        {/* --------- FAVORITES --------- */}
        <Text style={styles.sectionTitle}>Missions favorites</Text>

        {FAVORITE_MISSIONS.length === 0 ? (
          <Text style={styles.emptyText}>
            Aucune mission favorite.
          </Text>
        ) : (
          <FlatList
            data={FAVORITE_MISSIONS}
            key={`fav-${numColumns}`}
            numColumns={numColumns}
            renderItem={renderMission}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        )}
      </View>

      {/* SWITCH (BOTTOM ON MOBILE) */}
      {!isWeb && (
        <View style={styles.switchBottom}>
          <SwitchButton
            variant="activity"
            value="A venir"
            onChange={(tab) => {
              if (tab === 'Historique') {
                router.push('(main)/library/history/volunteer_previous_activity' as RelativePathString);              }
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
